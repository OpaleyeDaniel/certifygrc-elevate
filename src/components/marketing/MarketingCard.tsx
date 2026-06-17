import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PremiumCard, PremiumCardGrid } from "@/components/ui/PremiumCard";

interface MarketingCardProps {
  icon?: LucideIcon;
  iconClassName?: string;
  title: string;
  description: string;
  href?: string;
  variant?: "default" | "featured" | "compact" | "horizontal";
  delay?: number;
  className?: string;
  children?: React.ReactNode;
}

export default function MarketingCard({
  icon: Icon,
  iconClassName,
  title,
  description,
  href,
  variant = "default",
  className,
  children,
}: MarketingCardProps) {
  const isHorizontal = variant === "horizontal";
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";

  return (
    <PremiumCard
      to={href}
      featured={isFeatured}
      padding={isCompact ? "sm" : isHorizontal ? "md" : "md"}
      className={className}
      contentClassName={cn(isHorizontal && "flex flex-row items-start gap-5")}
    >
      {Icon && (
        <div
          className={cn(
            "flex items-center justify-center rounded-xl shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5",
            isHorizontal ? "w-10 h-10" : "w-11 h-11 mb-4",
            isCompact && "w-9 h-9 mb-3",
            isFeatured
              ? "bg-gradient-to-br from-primary/15 to-accent/10"
              : "bg-gradient-to-br from-primary/10 to-accent/5",
            iconClassName,
          )}
        >
          <Icon
            className={cn(
              "text-primary transition-colors duration-300",
              isHorizontal || isCompact ? "w-4 h-4" : "w-5 h-5",
            )}
            strokeWidth={1.8}
          />
        </div>
      )}

      <div className={cn(isHorizontal && "flex-1 min-w-0")}>
        <h3
          className={cn(
            "font-display font-semibold text-foreground leading-snug",
            isCompact ? "text-sm mb-1" : "text-base mb-2",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-muted-foreground leading-relaxed",
            isCompact ? "text-xs" : "text-sm",
          )}
        >
          {description}
        </p>
        {children}
      </div>
    </PremiumCard>
  );
}

export { PremiumCardGrid as MarketingCardGrid };
