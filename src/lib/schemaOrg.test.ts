import { describe, it, expect } from "vitest";
import {
  createOrganizationSchema,
  createWebSiteSchema,
  createSoftwareApplicationSchema,
  createFAQSchema,
  createBreadcrumbSchema,
  createServiceSchema,
  createBlogPostingSchema,
  createCompetitorComparisonSchema,
} from "./schemaOrg";
import { HOMEPAGE_FAQS } from "@/components/home/FAQSection";

describe("Schema.org JSON-LD generators", () => {
  it("generates valid Organization schema", () => {
    const org = createOrganizationSchema();
    expect(org["@type"]).toBe("Organization");
    expect(org.name).toBe("CertifyGRC");
    expect(org.url).toBe("https://certifygrc.com");
    expect(org.logo).toContain("certifygrc-logo.png");
    expect(org.sameAs.length).toBeGreaterThan(0);
  });

  it("generates valid WebSite schema with SearchAction", () => {
    const site = createWebSiteSchema();
    expect(site["@type"]).toBe("WebSite");
    expect(site.url).toBe("https://certifygrc.com");
    expect(site.potentialAction["@type"]).toBe("SearchAction");
    expect(site.potentialAction.target.urlTemplate).toContain("search_term_string");
  });

  it("generates valid SoftwareApplication schema with competitor similarity", () => {
    const app = createSoftwareApplicationSchema();
    expect(app["@type"]).toBe("SoftwareApplication");
    expect(app.name).toContain("CertifyGRC");
    expect(app.applicationCategory).toBe("SecurityApplication");
    expect(app.applicationSubCategory).toBe("Compliance Automation Software");
    expect(app.aggregateRating["@type"]).toBe("AggregateRating");
    expect(app.aggregateRating.ratingValue).toBe("4.9");
    expect(app.offers["@type"]).toBe("Offer");
    expect(app.offers.price).toBe("0");
    expect(Array.isArray(app.featureList)).toBe(true);
    expect(app.featureList.length).toBeGreaterThan(5);
    expect(Array.isArray(app.knowsAbout)).toBe(true);
    expect(Array.isArray(app.isSimilarTo)).toBe(true);
    expect(app.isSimilarTo.some((c: { name: string }) => c.name === "OneTrust")).toBe(true);
    expect(app.isSimilarTo.some((c: { name: string }) => c.name === "Hyperproof")).toBe(true);
    expect(app.isSimilarTo.some((c: { name: string }) => c.name === "Secureframe")).toBe(true);
    expect(app.isSimilarTo.some((c: { name: string }) => c.name === "Vanta")).toBe(true);
    expect(app.isSimilarTo.some((c: { name: string }) => c.name === "Drata")).toBe(true);
  });

  it("generates valid FAQPage schema from FAQs", () => {
    const faqSchema = createFAQSchema(HOMEPAGE_FAQS);
    expect(faqSchema["@type"]).toBe("FAQPage");
    expect(Array.isArray(faqSchema.mainEntity)).toBe(true);
    expect(faqSchema.mainEntity.length).toBe(HOMEPAGE_FAQS.length);
    expect(faqSchema.mainEntity[0]["@type"]).toBe("Question");
    expect(faqSchema.mainEntity[0].acceptedAnswer["@type"]).toBe("Answer");
  });

  it("generates valid BreadcrumbList schema", () => {
    const breadcrumbs = createBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Software", url: "/software" },
    ]);
    expect(breadcrumbs["@type"]).toBe("BreadcrumbList");
    expect(breadcrumbs.itemListElement.length).toBe(2);
    expect(breadcrumbs.itemListElement[0].position).toBe(1);
    expect(breadcrumbs.itemListElement[0].item).toBe("https://certifygrc.com/");
    expect(breadcrumbs.itemListElement[1].position).toBe(2);
    expect(breadcrumbs.itemListElement[1].item).toBe("https://certifygrc.com/software");
  });

  it("generates valid Service schema", () => {
    const service = createServiceSchema({
      name: "Compliance Advisory",
      description: "GRC advisory",
      serviceType: "Advisory",
      url: "/consulting",
    });
    expect(service["@type"]).toBe("Service");
    expect(service.name).toBe("Compliance Advisory");
    expect(service.provider.name).toBe("CertifyGRC");
    expect(service.url).toBe("https://certifygrc.com/consulting");
  });

  it("generates valid BlogPosting schema", () => {
    const post = createBlogPostingSchema({
      headline: "NIST CSF 2.0 Guide",
      description: "How to implement NIST CSF 2.0",
      url: "/blog/how-to-implement-nist-csf-2-0",
      datePublished: "2026-08-21T00:00:00Z",
      authorName: "Security Specialist",
    });
    expect(post["@type"]).toBe("BlogPosting");
    expect(post.headline).toBe("NIST CSF 2.0 Guide");
    expect(post.author["@type"]).toBe("Person");
    expect(post.author.name).toBe("Security Specialist");
    expect(post.publisher.name).toBe("CertifyGRC");
  });

  it("generates valid CompetitorComparison schema", () => {
    const comp = createCompetitorComparisonSchema({
      name: "CertifyGRC vs Vanta",
      description: "Comparison guide",
      url: "/compare/vanta-alternative",
      comparedTo: ["Vanta", "Drata"],
    });
    expect(comp["@type"]).toBe("WebPage");
    expect(comp.name).toBe("CertifyGRC vs Vanta");
    expect(comp.mainEntity["@type"]).toBe("SoftwareApplication");
    expect(comp.mainEntity.isSimilarTo.length).toBe(2);
    expect(comp.mainEntity.isSimilarTo[0].name).toBe("Vanta");
  });
});
