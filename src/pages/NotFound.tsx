import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedGridBackground from "@/components/visual/AnimatedGridBackground";
import SEO from "@/components/seo/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <SEO
        title="404 — Page Not Found | CertifyGRC"
        description="The page you requested could not be found."
        noIndex={true}
      />
      <AnimatedGridBackground variant="section" fadeEdges />

      {/* Soft primary glow */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full blur-[100px] opacity-[0.1]"
        style={{ background: "radial-gradient(ellipse, hsl(var(--primary)) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative z-10 container-narrow text-center space-y-6">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20 mx-auto">
          <span className="text-2xl font-bold text-primary">404</span>
        </div>
        <h1 className="font-display text-display-lg font-bold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild size="lg" className="glow-primary">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
