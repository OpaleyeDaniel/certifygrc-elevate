import React, { Component, type ReactNode } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[ErrorBoundary] Uncaught component error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6">
          <div
            className="max-w-md w-full rounded-2xl p-8 text-center"
            style={{
              background: "linear-gradient(145deg, hsl(220,42%,9%), hsl(220,42%,7%))",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)",
            }}
          >
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <h2 className="font-display font-bold text-xl text-white mb-2">
              {this.props.fallbackTitle ?? "Something went wrong"}
            </h2>
            <p className="text-white/60 text-sm mb-6 leading-relaxed">
              {this.props.fallbackMessage ??
                "An unexpected issue occurred while rendering this section. Please try again or return to the previous page."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-white/20 text-white hover:bg-white/10"
                onClick={this.handleReset}
              >
                <RotateCcw className="w-4 h-4" /> Try Again
              </Button>
              <Button
                asChild
                size="sm"
                className="gap-2 bg-primary hover:bg-primary/90 text-white font-semibold"
              >
                <a href="/blog">
                  <Home className="w-4 h-4" /> Back to Blog
                </a>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
