import type { VercelRequest, VercelResponse } from '@vercel/node';

// ── Rate-limit store (in-memory; resets on cold start — fine for a prototype) ──

const hits = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 10;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_BODY_BYTES = 1_048_576; // 1 MB

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

interface ListingResult {
  title: string;
  description: string;
  tags: string[];
  materials: string;
  suggestedPriceINR: number;
  priceReasoning: string;
}

function stripCodeFences(text: string): string {
  return text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
}

function validateListing(obj: unknown): obj is ListingResult {
  if (typeof obj !== 'object' || obj === null) return false;
  const o = obj as Record<string, unknown>;
  return (
    typeof o.title === 'string' &&
    o.title.length > 0 &&
    typeof o.description === 'string' &&
    Array.isArray(o.tags) &&
    typeof o.materials === 'string' &&
    typeof o.suggestedPriceINR === 'number' &&
    o.suggestedPriceINR > 0 &&
    typeof o.priceReasoning === 'string'
  );
}

// ── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Size guard — Vercel parses the body for us, but we check the
  // content-length header as an early gate.
  const cl = parseInt(req.headers['content-length'] || '0', 10);
  if (cl > MAX_BODY_BYTES) {
    return res.status(413).json({ error: 'Request body exceeds 1 MB limit' });
  }

  // Rate limit
  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({
      error: 'Too many requests. Try again in an hour.',
    });
  }

  // Key check - supports Gemini or Groq
  const apiKey = process.env.GEMINI_API_KEY;
  const groqKey = process.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY || '';

  // Parse body
  const { transcript, language, imageBase64 } = req.body as {
    transcript?: string;
    language?: string;
    imageBase64?: string;
  };

  if (!transcript || typeof transcript !== 'string' || transcript.trim().length < 3) {
    return res.status(400).json({ error: 'transcript is required (min 3 chars)' });
  }

  // Build the prompt
  const systemPrompt = `You are a craft listing assistant for MILAAN, a platform connecting Indian artisans with buyers. An artisan has described their handmade craft in their own words. Generate a product listing.

Return ONLY a JSON object with these exact fields:
{
  "title": "short product title (max 80 chars)",
  "description": "2-3 sentence description of the craft for buyers",
  "tags": ["array", "of", "relevant", "tags"],
  "materials": "materials used, comma-separated",
  "suggestedPriceINR": 0,
  "priceReasoning": "brief explanation of how the price was estimated"
}

Guidelines:
- Use the artisan's own description to infer materials, hours, and craft type.
- Suggest a fair price in INR based on materials + labor (₹150-300/hr for skilled crafts).
- Be accurate and honest — do not invent details the artisan didn't mention.
- Return ONLY the JSON. No markdown, no explanation.`;

  const userMessage = `Language: ${language || 'unknown'}
Artisan's description: "${transcript.trim()}"`;

  // If Gemini is available, try Gemini first
  if (apiKey && apiKey !== 'your-gemini-api-key-here') {
    try {
      const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [
        { text: userMessage },
      ];

      if (imageBase64 && typeof imageBase64 === 'string' && imageBase64.length > 100) {
        let mimeType = 'image/jpeg';
        let data = imageBase64;
        if (imageBase64.startsWith('data:')) {
          const match = imageBase64.match(/^data:(image\/\w+);base64,(.+)$/);
          if (match) {
            mimeType = match[1];
            data = match[2];
          }
        }
        parts.push({
          inlineData: { mimeType, data },
        });
      }

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const geminiRes = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 600,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (geminiRes.ok) {
        const geminiData = (await geminiRes.json()) as {
          candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
        };
        const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (rawText) {
          const cleaned = stripCodeFences(rawText);
          const parsed = JSON.parse(cleaned);
          if (validateListing(parsed)) {
            return res.status(200).json(parsed);
          }
        }
      }
    } catch (err) {
      console.warn('Gemini attempt failed, falling back to Groq:', err);
    }
  }

  // Fallback to Groq AI
  if (groqKey) {
    try {
      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${groqKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'qwen/qwen3.8-27b',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.3,
        }),
      });

      if (groqRes.ok) {
        const groqData = (await groqRes.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const content = groqData.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          if (validateListing(parsed)) {
            return res.status(200).json(parsed);
          }
        }
      }
    } catch (err) {
      console.warn('Groq generation error:', err);
    }
  }

  return res.status(503).json({
    error: 'AI service unavailable',
    offline: true,
  });
}
