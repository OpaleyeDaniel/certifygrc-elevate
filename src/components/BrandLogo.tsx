import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const LOGO_SRC = "/certifygrc-logo.png";

type BrandLogoProps = {
  className?: string;
  size?: "sm" | "md";
  /** Wrap in a home link */
  linked?: boolean;
};

export function BrandLogo({ className, size = "md", linked = false }: BrandLogoProps) {
  const heightClass = size === "sm" ? "h-5" : "h-6";
  const maxWidthClass = size === "sm" ? "max-w-[118px]" : "max-w-[132px]";

  const inner = (
    <img
      src={LOGO_SRC}
      alt="CertifyGRC"
      className={cn(
        "w-auto object-contain object-left bg-transparent transition-opacity duration-300",
        heightClass,
        maxWidthClass,
        className,
      )}
      loading="eager"
      draggable={false}
    />
  );

  if (linked) {
    return (
      <Link to="/" className="group inline-flex hover:opacity-90">
        {inner}
      </Link>
    );
  }

  return inner;
}
