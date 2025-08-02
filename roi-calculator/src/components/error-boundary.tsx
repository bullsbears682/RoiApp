'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Copy } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleCopyError = () => {
    const errorText = `
Error: ${this.state.error?.message || 'Unknown error'}
Stack: ${this.state.error?.stack || 'No stack trace'}
Component Stack: ${this.state.errorInfo?.componentStack || 'No component stack'}
User Agent: ${navigator.userAgent}
URL: ${window.location.href}
Timestamp: ${new Date().toISOString()}
    `.trim();

    if (navigator.clipboard) {
      navigator.clipboard.writeText(errorText);
      alert('Error details copied to clipboard!');
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = errorText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('Error details copied to clipboard!');
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} retry={this.handleRetry} />;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <CardTitle className="text-red-800">Application Error</CardTitle>
              </div>
              <CardDescription>
                Something went wrong. Here are the error details for debugging:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Error Message */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">Error Message:</h4>
                <p className="text-red-700 font-mono text-sm break-words">
                  {this.state.error?.message || 'Unknown error occurred'}
                </p>
              </div>

              {/* Error Stack (Mobile Friendly) */}
              {this.state.error?.stack && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Stack Trace:</h4>
                  <pre className="text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap break-words">
                    {this.state.error.stack}
                  </pre>
                </div>
              )}

              {/* Component Stack */}
              {this.state.errorInfo?.componentStack && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Component Stack:</h4>
                  <pre className="text-xs text-blue-700 overflow-x-auto whitespace-pre-wrap break-words">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              )}

              {/* Browser Info */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Browser Info:</h4>
                <p className="text-yellow-700 text-sm break-words">
                  <strong>User Agent:</strong> {navigator.userAgent}
                </p>
                <p className="text-yellow-700 text-sm break-words">
                  <strong>URL:</strong> {window.location.href}
                </p>
                <p className="text-yellow-700 text-sm">
                  <strong>Timestamp:</strong> {new Date().toISOString()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={this.handleRetry} className="flex-1">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button variant="outline" onClick={this.handleCopyError} className="flex-1">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Error Details
                </Button>
                <Button variant="outline" onClick={() => window.location.reload()} className="flex-1">
                  Reload Page
                </Button>
              </div>

              {/* Help Text */}
              <div className="text-sm text-gray-600 text-center">
                <p>If this error persists, please copy the error details and report the issue.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: React.ErrorInfo) => {
    console.error('Error caught by hook:', error, errorInfo);
    
    // Show error in a user-friendly way
    const errorMessage = `
Error: ${error.message}
Stack: ${error.stack}
User Agent: ${navigator.userAgent}
URL: ${window.location.href}
Timestamp: ${new Date().toISOString()}
    `.trim();

    // You could send this to an error reporting service
    console.error('Detailed error info:', errorMessage);
  };
}