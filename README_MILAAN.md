# MILAAN --- Market Integration for All Artisans

**Tagline:** *Har Haath Ka Hunar, Har Bazaar Tak*\
**Team:** UNION\
**Team members:** Tanisha Parida (Frontend Developer), Anish (Backend
Developer)

## 1. Project Overview

MILAAN is a proposed AI-powered digital ecosystem that helps Indian
artisans present, price, and sell their crafts to a wider market. It
aims to reduce barriers caused by language, limited digital skills, low
market visibility, and dependence on intermediaries.

The platform is designed to connect artisans with individual customers,
retailers, brands, and institutional buyers. It combines simple voice-
and image-led onboarding with AI-assisted product cataloguing,
translation, price guidance, and market discovery.

> **Project status:** This README describes the proposed solution and an
> implementation plan. It does not claim that every feature or external
> integration is already implemented.

## 2. Problem Statement

Artisans may struggle to create online listings, translate product
information, estimate fair prices, discover relevant buyers, and
communicate the cultural context of handmade products. MILAAN aims to
make digital market access more accessible while helping artisans retain
more value from their work.

## 3. Goals

-   Make onboarding accessible through voice and images.
-   Help create multilingual product listings and catalogues.
-   Provide explainable price guidance.
-   Improve product discovery for customers and institutional buyers.
-   Highlight craft identity and provenance evidence.
-   Support growth from local to wider markets.

## 4. Key Features

### Voice- and Image-Led Onboarding

An artisan can provide a product photo and a spoken or written
description. The planned workflow collects product details and asks the
artisan to confirm uncertain information.

### AI-Assisted Listings and Translation

Generate draft titles, descriptions, tags, and translations. The artisan
should review and approve generated content before publishing.

### Fair-Price Guidance

Estimate a suggested price using inputs such as material cost, labour
time, complexity, and available market comparisons. Show assumptions and
let the artisan override the suggestion.

### Market and Trend Discovery

Recommend relevant customer segments, seasonal opportunities, and
possible buyer matches. Recommendations are guidance, not guaranteed
sales forecasts.

### Craft Identity and Provenance

Product profiles can record the artisan's story, craft tradition,
materials, and supporting provenance evidence. Do not label a product as
verified or authenticated unless a real verification process exists.

### Buyer and Institutional Discovery

The planned marketplace can support discovery by customers, retailers,
brands, and bulk buyers. Integrations with ONDC, GeM, UPI, GI, ODOP, or
PM Vishwakarma require separate eligibility checks, partner access, and
implementation.

## 5. Proposed Architecture

This is a logical design, not a claim about an already deployed
production system.

``` text
Artisan / Buyer Web Interface
            |
            v
         Backend API
            |
     +------+------------------+
     |          |              |
     v          v              v
User/Profile  Product        AI Service
Management    Catalogue      - image assistance
              Management     - speech/text processing
                             - translation
                             - price guidance
            |
            v
     Database / Media Storage
            |
            v
    Search & Recommendations
            |
            v
      Buyer Discovery / Orders
```

### Suggested technology choices

These are options to confirm during implementation, not verified
dependencies.

  -----------------------------------------------------------------------
  Layer                   Suggested option        Responsibility
  ----------------------- ----------------------- -----------------------
  Frontend                React, HTML, CSS,       Responsive artisan and
                          JavaScript              buyer interface

  Backend                 Java with Spring Boot,  APIs and business logic
                          or another agreed       
                          framework               

  Database                PostgreSQL or MongoDB   User, product, listing,
                                                  and order records

  AI service              Python and suitable     Speech, translation,
                          model/API integrations  image assistance,
                                                  recommendations

  Media storage           Local storage for       Product photos
                          development; object     
                          storage for deployment  

  Version control         Git and GitHub          Team collaboration
  -----------------------------------------------------------------------

Choose one backend framework and one database before implementation.

## 6. Suggested Repository Structure

``` text
milaan/
├── frontend/              # Web interface
├── backend/               # REST API and business logic
├── ai-service/            # Optional AI service
├── docs/                  # Architecture, API notes, screenshots
├── .env.example           # Required environment variable names
├── .gitignore
└── README.md
```

Adapt this structure to the actual repository; do not add empty services
just to match the example.

## 7. Setup Instructions

The exact commands depend on the stack and files in your repository.

### Prerequisites

Install the tools used by your implementation:

-   Git
-   Node.js and npm, if the frontend uses a Node-based toolchain
-   Java JDK and Maven/Gradle, if using Spring Boot
-   A supported database
-   Python and pip, only if a Python AI service is used

Check installations:

``` bash
git --version
node --version
npm --version
java -version
python --version
```

Skip checks for tools not used by your project.

### Step 1: Clone the repository

``` bash
git clone <YOUR_REPOSITORY_URL>
cd milaan
```

Replace the placeholder with your repository URL.

### Step 2: Configure environment variables

Create local environment files based on `.env.example`, if present.
Example variable names:

``` env
DATABASE_URL=
DATABASE_USERNAME=
DATABASE_PASSWORD=
AI_PROVIDER_API_KEY=
BACKEND_BASE_URL=
```

Use the exact names expected by your code. Keep real credentials out of
Git and add local `.env` files to `.gitignore`.

### Step 3: Start the database

Start your chosen database, create a development database/user, and
configure the backend connection. Apply schema migrations if the project
includes them.

### Step 4: Start the frontend

If `frontend/` contains a `package.json`:

``` bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by the development server. Follow the
project's `package.json` scripts if the command differs.

### Step 5: Start the backend

For a Maven-based Spring Boot project:

``` bash
cd backend
./mvnw spring-boot:run
```

On Windows, use `mvnw.cmd spring-boot:run`. If there is no Maven
wrapper, use the project's documented Maven/Gradle command.

### Step 6: Start the optional AI service

If `ai-service/` is a Python service and contains `requirements.txt`:

``` bash
cd ai-service
python -m venv .venv
pip install -r requirements.txt
```

Activate the virtual environment before installing dependencies. Start
the service using the actual entry point in the repository, for example
`python app.py`; `app.py` is only an example.

## 8. Implementation Details

### Frontend --- Tanisha Parida

-   Build responsive screens for onboarding, product creation, catalogue
    management, and buyer browsing.
-   Add form validation, loading states, error messages, and accessible
    controls.
-   Support image upload and voice-input interactions where supported.
-   Show AI output as editable suggestions.
-   Make language choice and artisan approval explicit.

### Backend --- Anish

-   Define API routes and request/response schemas.
-   Implement user profiles, product records, catalogue management, and
    role-based access.
-   Validate uploaded files and user input.
-   Persist data using the selected database.
-   Keep AI credentials on the server, not in frontend code.
-   Add logging, error handling, and authorization checks.

### AI and Data Workflow

1.  Receive a product image and optional voice/text description.
2.  Validate the input and store the image securely.
3.  Extract or collect product attributes and ask the artisan to correct
    uncertain fields.
4.  Generate draft descriptions, tags, and translations.
5.  Calculate price guidance from transparent inputs and available
    reference data.
6.  Save the artisan-approved listing.
7.  Index the listing for search and buyer recommendations.

Do not treat model-generated details, prices, provenance, or demand
predictions as verified facts without supporting evidence.

### Example API Routes

These routes are planning examples; implement only those supported by
the code.

  Method    Example route              Purpose
  --------- -------------------------- ---------------------------
  `POST`    `/api/auth/register`       Register a user
  `POST`    `/api/auth/login`          Authenticate a user
  `GET`     `/api/products`            Browse or search products
  `POST`    `/api/products`            Create a product listing
  `GET`     `/api/products/{id}`       Retrieve listing details
  `PATCH`   `/api/products/{id}`       Update a listing
  `POST`    `/api/ai/listing-draft`    Request a listing draft
  `POST`    `/api/ai/price-guidance`   Request price guidance

Protect private routes, validate inputs, limit upload size/type, and
rate-limit costly AI endpoints.

## 9. Privacy, Security, and Responsible AI

-   Collect only the information needed to provide the service.
-   Obtain consent before recording or processing voice input.
-   Explain how photos, audio, profile information, and generated
    content are used.
-   Never commit secrets, tokens, or production data to the repository.
-   Restrict access to private profile and order information.
-   Validate uploaded files and use secure storage.
-   Let artisans review and edit generated descriptions and
    translations.
-   Show the assumptions behind price suggestions.
-   Do not claim government, marketplace, GI, or authenticity
    verification without an actual authorized process.

## 10. Testing Plan

Test these areas before a demo or release:

-   Registration, login, and role-based access.
-   Product creation, editing, search, and image upload.
-   Missing, invalid, or oversized input.
-   AI-service timeouts, missing credentials, and malformed responses.
-   Price guidance with missing or unrealistic values.
-   Translation review and approval.
-   Responsive layout and keyboard accessibility.
-   Authorization boundaries and protection of sensitive data.

Use demo data during development and protect any real personal
information.

## 11. Roadmap

1.  **MVP:** Artisan profiles, product listings, image upload, and buyer
    catalogue.
2.  **AI assistance:** Listing drafts, translation, and guided product
    attributes.
3.  **Pricing support:** Transparent cost inputs and
    market-reference-based suggestions.
4.  **Discovery:** Search, filters, and buyer recommendations.
5.  **Trust and scale:** Provenance evidence, bulk-buyer workflows,
    analytics, and evaluated external integrations.

## 12. Team

-   **Tanisha Parida --- Frontend Developer:** User interface,
    responsive design, and accessible artisan/buyer workflows.
-   **Anish --- Backend Developer:** APIs, server-side logic, database
    integration, and core system functionality.

## 13. Contributing

1.  Create a feature branch.
2.  Keep changes focused and document new environment variables.
3.  Run relevant tests and verify the main user flow.
4.  Do not commit secrets or real user data.
5.  Open a pull request with a summary and testing notes.

## 14. License and Acknowledgements

Add a license before publicly distributing the source code. Acknowledge
third-party models, APIs, datasets, fonts, and libraries, and comply
with their terms.

MILAAN aims to support artisan livelihoods and traditional craft
visibility through more accessible digital market participation.
