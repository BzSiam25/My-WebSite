import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 rounded-md bg-destructive/10 text-destructive border border-destructive/20 m-4 flex flex-col items-center justify-center min-h-[200px]">
            <h2 className="text-lg font-semibold mb-2">
              Something went wrong.
            </h2>
            <p className="text-sm opacity-80">
              An unexpected error occurred in this section.
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
