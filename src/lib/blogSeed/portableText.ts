/** Helpers to build Portable Text blocks for seed blog content */

type Span = { _type: "span"; _key: string; text: string; marks: string[] };
type Block = {
  _type: "block";
  _key: string;
  style: string;
  markDefs: unknown[];
  children: Span[];
};

let keyCounter = 0;
function key(prefix: string) {
  keyCounter += 1;
  return `${prefix}-${keyCounter}`;
}

export function ptHeading(level: 2 | 3 | 4, text: string): Block {
  return {
    _type: "block",
    _key: key(`h${level}`),
    style: `h${level}`,
    markDefs: [],
    children: [{ _type: "span", _key: key("s"), text, marks: [] }],
  };
}

export function ptParagraph(text: string): Block {
  return {
    _type: "block",
    _key: key("p"),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key("s"), text, marks: [] }],
  };
}

export function ptQuote(text: string): Block {
  return {
    _type: "block",
    _key: key("q"),
    style: "blockquote",
    markDefs: [],
    children: [{ _type: "span", _key: key("s"), text, marks: [] }],
  };
}

export function ptBulletList(items: string[]): Block[] {
  return items.map((text) => ({
    _type: "block",
    _key: key("li"),
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [{ _type: "span", _key: key("s"), text, marks: [] }],
  })) as Block[];
}

export function ptCallout(type: "info" | "warning" | "tip", title: string, body: string) {
  return {
    _type: "callout",
    _key: key("callout"),
    type,
    title,
    body,
  };
}

export function buildArticleBody(sections: Array<{
  heading?: string;
  headingLevel?: 2 | 3;
  paragraphs: string[];
  bullets?: string[];
  quote?: string;
  callout?: { type: "info" | "warning" | "tip"; title: string; body: string };
}>): unknown[] {
  const blocks: unknown[] = [];
  for (const section of sections) {
    if (section.heading) {
      blocks.push(ptHeading(section.headingLevel ?? 2, section.heading));
    }
    section.paragraphs.forEach((p) => blocks.push(ptParagraph(p)));
    if (section.bullets?.length) blocks.push(...ptBulletList(section.bullets));
    if (section.quote) blocks.push(ptQuote(section.quote));
    if (section.callout) blocks.push(ptCallout(section.callout.type, section.callout.title, section.callout.body));
  }
  return blocks;
}
