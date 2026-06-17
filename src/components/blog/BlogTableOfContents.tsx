import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { headingId, type TocEntry } from "@/lib/blogUtils";
import { List } from "lucide-react";

interface Props {
  entries: TocEntry[];
}

export default function BlogTableOfContents({ entries }: Props) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (!entries.length) return;
    const observer = new IntersectionObserver(
      (obs) => {
        obs.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    entries.forEach((e) => {
      const el = document.getElementById(headingId(e.id));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [entries]);

  if (!entries.length) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-28">
      <div className="rounded-2xl p-5" style={{ background: "linear-gradient(145deg, hsl(220,42%,9%), hsl(220,42%,7%))", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-2 mb-4">
          <List className="w-4 h-4 text-primary" />
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Contents</p>
        </div>
        <ul className="space-y-1">
          {entries.map((entry) => (
            <li key={entry.id}>
              <a
                href={`#${headingId(entry.id)}`}
                className={cn(
                  "block text-sm leading-snug py-1 transition-all duration-150",
                  entry.level === 3 && "pl-4",
                  entry.level === 4 && "pl-7",
                  active === headingId(entry.id)
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground",
                )}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(headingId(entry.id))?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                {entry.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
