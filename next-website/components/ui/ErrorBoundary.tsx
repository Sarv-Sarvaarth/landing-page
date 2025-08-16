"use client";

import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md mx-auto p-6">
            <div className="flex justify-center">
              <AlertTriangle className="w-16 h-16 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Something went wrong</h2>
            <p className="text-gray-600">
              We apologize for the inconvenience. Please try refreshing the page or contact us if the problem persists.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-ngo-blue hover:bg-ngo-blue-light"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
