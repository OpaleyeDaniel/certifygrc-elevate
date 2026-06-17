import type { PremiumCardProps } from "@/components/ui/PremiumCard";
import { PremiumCard } from "@/components/ui/PremiumCard";

type AnimatedCardProps = PremiumCardProps & {
  index?: number;
  surface?: "premium" | "featured" | "none";
};

/** @deprecated Use PremiumCard directly — kept for backward compatibility */
export default function AnimatedCard({
  surface = "premium",
  featured,
  ...props
}: AnimatedCardProps) {
  return (
    <PremiumCard
      featured={featured ?? surface === "featured"}
      {...props}
    />
  );
}

export { PremiumCardGrid } from "@/components/ui/PremiumCard";
