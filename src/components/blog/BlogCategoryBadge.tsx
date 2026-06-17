import { cn } from "@/lib/utils";
import { categoryColor } from "@/lib/blogUtils";
import type { SanityCategory } from "@/lib/sanity";
import { Link } from "react-router-dom";

interface Props {
  category: SanityCategory;
  asLink?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export default function BlogCategoryBadge({ category, asLink = false, size = "md", className }: Props) {
  const color = categoryColor(category.color);
  const classes = cn(
    "inline-flex items-center font-semibold rounded-full whitespace-nowrap transition-all duration-200",
    size === "sm" ? "px-2.5 py-0.5 text-[11px] tracking-wide" : "px-3 py-1 text-xs tracking-wide",
    asLink && "hover:opacity-80 cursor-pointer",
    className,
  );
  const style = {
    background: `${color}18`,
    color,
    border: `1px solid ${color}35`,
  };

  if (asLink) {
    return (
      <Link to={`/blog/category/${category.slug}`} className={classes} style={style}>
        {category.title}
      </Link>
    );
  }
  return <span className={classes} style={style}>{category.title}</span>;
}
