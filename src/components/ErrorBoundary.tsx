import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-vat text-bone flex flex-col items-center justify-center gap-4 p-8 text-center font-body">
          <h1 className="font-display text-2xl text-madder">
            Something went wrong
          </h1>
          <p className="text-sm text-bone/80 max-w-md leading-relaxed">
            The vault doors jammed unexpectedly. Reload the page to re-enter Milaan.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary h-11 text-sm"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
