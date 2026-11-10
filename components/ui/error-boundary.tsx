"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { RotateCcw } from "lucide-react";

type ErrorBoundaryProps = { children: ReactNode; fallback?: ReactNode };
type ErrorBoundaryState = { hasError: boolean };

export class AppErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("SONORA component error:", error, info.componentStack);
  }

  private reset = () => this.setState({ hasError: false });

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="error-screen" role="alert">
          <p className="eyebrow">SIGNAL LOST</p>
          <h1>That sound slipped away.</h1>
          <p className="error-copy">This part of the page hit an unexpected error.</p>
          <button className="button button-secondary" type="button" onClick={this.reset}>
            <RotateCcw size={15} /> Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
