import * as bibtexParse from "bibtex-parse-js";

export interface BibEntry {
  type: string;
  key: string;
  fields: Record<string, string>;
}

export function processCitations(markdown: string): { content: string; entries: BibEntry[] } {
  const bibFence = /```bibtex\n([\s\S]*?)```/i.exec(markdown);
  const rawBib = bibFence ? bibFence[1] : "";

  let entries: BibEntry[] = [];
  if (rawBib) {
    try {
      const parsed = (bibtexParse as any).toJSON(rawBib);
      entries = parsed.map((e: any) => ({
        type: e.entryType,
        key: e.citationKey,
        fields: Object.fromEntries(Object.entries(e.entryTags || {}).map(([k, v]) => [k.toLowerCase(), String(v)])),
      }));
    } catch (e) {
      entries = [];
    }
  }

  let content = markdown.replace(bibFence ? bibFence[0] : "", "").trim();

  if (entries.length === 0) {
    return { content, entries };
  }

  const keyOrder: string[] = [];
  const keyToIndex: Record<string, number> = {};

  content = content.replace(/\[\@([^\]]+)\]/g, (_match, keysStr) => {
    const keys = keysStr.split(/[,;\s]+/).map((k: string) => k.trim()).filter(Boolean);
    const anchors: string[] = [];

    for (const k of keys) {
      if (!(k in keyToIndex)) {
        keyOrder.push(k);
        keyToIndex[k] = keyOrder.length; // 1-based
      }
      const idx = keyToIndex[k];
      anchors.push(`<a href="#ref-${k}" class="text-primary">[${idx}]</a>`);
    }

    return anchors.join(" ");
  });

  const refs: string[] = [];
  for (let i = 0; i < keyOrder.length; i++) {
    const k = keyOrder[i];
    const entry = entries.find((e) => e.key === k);
    if (!entry) continue;
    const authors = entry.fields.author ?? "";
    const title = entry.fields.title ?? entry.key;
    const yearRaw = entry.fields.year ?? "";
    const url = entry.fields.url ?? entry.fields.paperurl ?? entry.fields.doi ?? "";

    function formatAuthorsAPA(aRaw: string) {
      if (!aRaw) return "";
      const parts = aRaw.split(/\s+and\s+/i).map((s) => s.trim()).filter(Boolean);
      const fmt = parts.map((p) => {
        if (p.includes(",")) {
          // Format: Last, First Middle
          const [last, rest] = p.split(",").map((x) => x.trim());
          const initials = (rest || "").split(/\s+/).filter(Boolean).map((n) => n[0] + ".").join(" ");
          return `${last}, ${initials}`;
        }
        // Format: First Middle Last
        const tokens = p.split(/\s+/).filter(Boolean);
        if (tokens.length === 1) return tokens[0];
        const last = tokens[tokens.length - 1];
        const initials = tokens.slice(0, -1).map((n) => n[0] + ".").join(" ");
        return `${last}, ${initials}`;
      });

      if (fmt.length === 1) return fmt[0];
      if (fmt.length === 2) return `${fmt[0]} & ${fmt[1]}`;
      return `${fmt.slice(0, -1).join(", ")}, & ${fmt.slice(-1)}`;
    }

    const authorsFormatted = formatAuthorsAPA(authors);

    // Container (journal, booktitle, publisher, institution)
    const container = entry.fields.journal ?? entry.fields.booktitle ?? entry.fields.institution ?? entry.fields.publisher ?? "";
    const volume = entry.fields.volume ?? "";
    const number = entry.fields.number ?? entry.fields.issue ?? "";
    const pages = entry.fields.pages ?? "";

    let containerParts: string[] = [];
    if (container) containerParts.push(container);
    if (volume) containerParts.push(number ? `${volume}(${number})` : `${volume}`);
    if (pages) containerParts.push(pages);
    const containerStr = containerParts.length > 0 ? `${containerParts.join(", ")}.` : "";

    const titleStr = title ? `${title}.` : "";
    const yearStr = yearRaw ? `(${yearRaw}).` : "";
    const urlStr = url ? (url.startsWith("http") ? url : `https://doi.org/${url}`) : "";

    const refLine = `${authorsFormatted} ${yearStr} ${titleStr} ${containerStr}${urlStr ? ` ${urlStr}` : ""}`.trim();

    refs.push(`<div id="ref-${entry.key}"><strong>[${i + 1}]</strong> ${refLine}</div>`);
  }

  if (refs.length > 0) {
    content += `\n\n## References\n\n` + refs.join("\n\n");
  }

  return { content, entries };
}
