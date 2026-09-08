import { describe, it, expect } from "vitest";
import {
  getPostSlug,
  getPostCoverUrl,
  getAuthorPhotoUrl,
  getCategorySlug,
  getTagSlug,
  getAuthorSlug,
  formatPostDate,
  relativeDate,
  extractToc,
  plainText,
  headingId,
  categoryColor,
} from "./blogUtils";
import type { SanityPost } from "./sanity";

describe("blogUtils", () => {
  const mockPost: SanityPost = {
    _id: "post-123",
    _createdAt: "2026-03-01T10:00:00Z",
    title: "NIST CSF 2.0 Current vs Target Profile",
    slug: { current: "nist-csf-2-0-current-vs-target-profile" },
    excerpt: "Learn the difference between NIST CSF 2.0 Current and Target Profiles.",
    publishedAt: "2026-03-05T12:00:00Z",
    readTime: 6,
    coverImage: {
      _type: "image",
      asset: {
        _ref: "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg",
        _type: "reference",
      },
    },
    author: {
      _id: "author-1",
      name: "Mercy Daniel",
      slug: { current: "mercy-daniel" },
      role: "Lead Compliance Specialist",
    },
    categories: [
      {
        _id: "cat-1",
        title: "NIST CSF 2.0",
        slug: { current: "nist-csf-2-0" },
        color: "#305CDE",
      },
    ],
  };

  it("extracts slug correctly whether string or object", () => {
    expect(getPostSlug(mockPost)).toBe("nist-csf-2-0-current-vs-target-profile");
    expect(getPostSlug({ ...mockPost, slug: "custom-slug" as unknown as { current: string } })).toBe("custom-slug");
  });

  it("generates cover URL when asset is defined", () => {
    const url = getPostCoverUrl(mockPost);
    expect(url).toBeTruthy();
    expect(url).toContain("cdn.sanity.io");
  });

  it("returns null when cover image is absent", () => {
    expect(getPostCoverUrl({ ...mockPost, coverImage: undefined })).toBeNull();
  });

  it("extracts category, tag, and author slugs safely", () => {
    expect(getCategorySlug(mockPost.categories![0])).toBe("nist-csf-2-0");
    expect(getCategorySlug({ slug: "direct-slug" })).toBe("direct-slug");
    expect(getTagSlug({ slug: "grc-audit" })).toBe("grc-audit");
    expect(getAuthorSlug(mockPost.author)).toBe("mercy-daniel");
    expect(getAuthorSlug(undefined)).toBe("");
  });

  it("formats dates gracefully without throwing errors on invalid inputs", () => {
    expect(formatPostDate("2026-03-05T12:00:00Z")).toContain("2026");
    expect(formatPostDate("invalid-date")).toBe("");
    expect(formatPostDate(undefined)).toBe("");
  });

  it("calculates relative dates safely", () => {
    expect(relativeDate("2026-01-01T00:00:00Z")).toBeTruthy();
    expect(relativeDate("invalid-date")).toBe("");
    expect(relativeDate(undefined)).toBe("");
  });

  it("extracts TOC entries from PortableText blocks", () => {
    const body = [
      {
        _type: "block",
        style: "h2",
        _key: "k1",
        children: [{ text: "Understanding Current Profiles" }],
      },
      {
        _type: "block",
        style: "normal",
        _key: "k2",
        children: [{ text: "Paragraph text here..." }],
      },
      {
        _type: "block",
        style: "h3",
        _key: "k3",
        children: [{ text: "Target Profile Steps" }],
      },
    ];

    const toc = extractToc(body);
    expect(toc).toHaveLength(2);
    expect(toc[0].text).toBe("Understanding Current Profiles");
    expect(toc[0].level).toBe(2);
    expect(toc[1].text).toBe("Target Profile Steps");
    expect(toc[1].level).toBe(3);
  });

  it("handles empty or non-array body for extractToc safely", () => {
    expect(extractToc([])).toEqual([]);
    expect(extractToc(null as unknown as unknown[])).toEqual([]);
  });

  it("generates heading id correctly", () => {
    expect(headingId("sec1")).toBe("heading-sec1");
  });

  it("provides fallback category color", () => {
    expect(categoryColor("#ff0000")).toBe("#ff0000");
    expect(categoryColor(undefined)).toBe("#305CDE");
  });
});
