import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor, type SanityImageAsset } from "@/lib/sanity";
import { headingId } from "@/lib/blogUtils";
import { AlertCircle, Info, Lightbulb, AlertTriangle } from "lucide-react";

const CALLOUT_STYLES: Record<string, { icon: typeof Info; bg: string; border: string; text: string; iconColor: string }> = {
  info: {
    icon: Info,
    bg: "bg-[hsl(221,45%,12%)]",
    border: "border-blue-500/30",
    text: "text-blue-200/90",
    iconColor: "text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-[hsl(35,30%,11%)]",
    border: "border-amber-500/30",
    text: "text-amber-200/90",
    iconColor: "text-amber-400",
  },
  tip: {
    icon: Lightbulb,
    bg: "bg-[hsl(150,25%,10%)]",
    border: "border-emerald-500/30",
    text: "text-emerald-200/90",
    iconColor: "text-emerald-400",
  },
  danger: {
    icon: AlertCircle,
    bg: "bg-[hsl(0,30%,11%)]",
    border: "border-red-500/30",
    text: "text-red-200/90",
    iconColor: "text-red-400",
  },
};

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImageAsset & { alt?: string; caption?: string } }) => {
      const src = urlFor(value).width(1200).auto("format").url();
      return (
        <figure className="my-8">
          <img
            src={src}
            alt={value.alt ?? ""}
            className="rounded-xl w-full border border-border/40"
            loading="lazy"
            decoding="async"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-xs text-muted-foreground">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
    codeBlock: ({ value }: { value: { language?: string; code?: string; filename?: string } }) => (
      <div className="my-6 rounded-xl overflow-hidden border border-border/40">
        {value.filename && (
          <div className="bg-zinc-800 px-4 py-2 text-xs font-mono text-zinc-400 border-b border-zinc-700">
            {value.filename}
          </div>
        )}
        <pre className="bg-zinc-900 p-5 overflow-x-auto">
          <code className={`text-sm font-mono text-zinc-100 language-${value.language ?? "text"}`}>
            {value.code}
          </code>
        </pre>
      </div>
    ),
    callout: ({ value }: { value: { type?: string; title?: string; body?: string } }) => {
      const style = CALLOUT_STYLES[value.type ?? "info"];
      const Icon = style.icon;
      return (
        <div className={`my-6 flex gap-3 rounded-xl border p-4 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] ${style.bg} ${style.border}`}>
          <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${style.iconColor}`} />
          <div>
            {value.title && <p className={`font-semibold text-sm mb-1 ${style.text}`}>{value.title}</p>}
            {value.body && <p className={`text-sm leading-relaxed ${style.text}`}>{value.body}</p>}
          </div>
        </div>
      );
    },
  },
  block: {
    h2: ({ value, children }) => (
      <h2 id={headingId(value._key)} className="scroll-mt-24 font-display font-bold text-2xl md:text-3xl text-foreground mt-12 mb-5">
        {children}
      </h2>
    ),
    h3: ({ value, children }) => (
      <h3 id={headingId(value._key)} className="scroll-mt-24 font-display font-semibold text-xl md:text-2xl text-foreground mt-8 mb-4">
        {children}
      </h3>
    ),
    h4: ({ value, children }) => (
      <h4 id={headingId(value._key)} className="scroll-mt-24 font-display font-semibold text-lg text-foreground mt-6 mb-3">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 pl-5 border-l-4 border-primary/40 italic text-muted-foreground text-lg leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded-md bg-muted text-sm font-mono text-primary border border-border/40">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-5 space-y-2 list-disc pl-6 text-foreground/85">{children}</ul>,
    number: ({ children }) => <ol className="my-5 space-y-2 list-decimal pl-6 text-foreground/85">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
};

interface Props { body: unknown[] }

export default function BlogPortableText({ body }: Props) {
  return (
    <div className="prose prose-lg prose-zinc max-w-none [&_p]:text-foreground/85 [&_p]:leading-relaxed [&_p]:mb-5">
      <PortableText value={body as Parameters<typeof PortableText>[0]["value"]} components={components} />
    </div>
  );
}
