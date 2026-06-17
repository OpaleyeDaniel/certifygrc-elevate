import { useState } from "react";
import { Link2, Twitter, Linkedin, Facebook, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  url?: string;
  variant?: "default" | "hero";
}

export default function BlogShareBar({ title, url, variant = "default" }: Props) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url ?? (typeof window !== "undefined" ? window.location.href : "");
  const encoded = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const links = [
    {
      label: "Share on LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
      color: "#0077b5",
    },
    {
      label: "Share on X",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`,
      color: "#1da1f2",
    },
    {
      label: "Share on Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      color: "#1877f2",
    },
  ];

  const isHero = variant === "hero";

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className={cn(
        "text-xs font-semibold uppercase tracking-widest mr-1",
        isHero ? "text-white/50" : "text-muted-foreground",
      )}>
        Share
      </span>
      {links.map(({ label, icon: Icon, href, color }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200 hover:scale-110",
            isHero
              ? "border-white/20 bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              : "border-white/[0.08] text-muted-foreground hover:border-primary/30",
          )}
          style={{ "--c": color } as React.CSSProperties}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = color; (e.currentTarget as HTMLAnchorElement).style.borderColor = `${color}50`; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = ""; (e.currentTarget as HTMLAnchorElement).style.borderColor = ""; }}
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "gap-1.5 rounded-lg text-xs",
          isHero && "border-white/25 bg-white/10 text-white/80 hover:bg-white/20 hover:text-white",
        )}
        onClick={copyLink}
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Link2 className="w-3.5 h-3.5" />}
        {copied ? "Copied!" : "Copy link"}
      </Button>
    </div>
  );
}
