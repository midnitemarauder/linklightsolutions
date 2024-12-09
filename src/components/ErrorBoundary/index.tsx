import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-8 max-w-lg w-full border border-red-500/20">
            <div className="flex items-center justify-center mb-6">
              <AlertTriangle className="h-12 w-12 text-red-500 animate-pulse" />
            </div>
            <h1 className="text-xl font-semibold text-white text-center mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-400 text-center mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors duration-200"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}