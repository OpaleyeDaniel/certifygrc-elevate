import { cn } from "@/lib/utils";
import { FRAMEWORK_MARQUEE_IMAGES } from "@/constants/frameworkMarqueeImages";

type Props = {
  className?: string;
  reverse?: boolean;
};

/**
 * Infinite horizontal scroll using only the 10 framework badge assets in `/public/framework-marquee/`.
 */
export default function FrameworkImageMarquee({ className, reverse }: Props) {
  const doubled = [...FRAMEWORK_MARQUEE_IMAGES, ...FRAMEWORK_MARQUEE_IMAGES];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />

      <div
        className={cn(
          "flex w-max gap-6 md:gap-10 py-3 md:py-4 motion-reduce:animate-none",
          reverse ? "motion-safe:animate-marquee-stream-reverse" : "motion-safe:animate-marquee-stream",
        )}
      >
        {doubled.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="shrink-0 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm px-5 py-4 md:px-7 md:py-5 shadow-lg shadow-primary/5 ring-1 ring-white/5"
          >
            <img
              src={src}
              alt=""
              className="h-16 sm:h-20 md:h-28 w-auto max-w-[min(100vw-4rem,260px)] object-contain"
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
