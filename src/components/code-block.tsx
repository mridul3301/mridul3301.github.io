import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, Terminal } from "lucide-react";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Language map — languages that need aliasing to a Prism-supported language
// ---------------------------------------------------------------------------
const languageMap: Record<string, string> = {
  pddl: "lisp",
  terminal: "terminal",
};

// ---------------------------------------------------------------------------
// PDDL keyword overrides for the Prism theme
// ---------------------------------------------------------------------------
const pddlKeywords = [
  "define", "domain", "problem", ":requirements", ":types", ":predicates",
  ":action", ":parameters", ":precondition", ":effect", ":functions",
  ":constants", ":objects", ":init", ":goal", ":metric", ":constraints",
  ":derived", ":duration", ":condition", ":durative-action",
  "and", "or", "not", "when", "forall", "exists", "imply",
  "assign", "increase", "decrease", "scale-up", "scale-down",
  "at", "start", "end", "over", "all",
  "sometime", "always", "sometime-after", "sometime-before",
  "at-most-once", "preference", "is-violated",
  "either", "object",
];

const pddlStyleOverrides = {
  'keyword': {
    color: '#c678dd',
    fontWeight: 600 as const,
  },
  'string': {
    color: '#98c379',
  },
  'comment': {
    color: '#5c6370',
    fontStyle: 'italic' as const,
  },
  'punctuation': {
    color: '#abb2bf',
  },
  'builtin': {
    color: '#e5c07b',
  },
  'function': {
    color: '#61afef',
  },
};

// ---------------------------------------------------------------------------
// Terminal code block config
// ---------------------------------------------------------------------------
const terminalLabel = "terminal";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Normalise the language string from the className react-markdown passes. */
function extractLanguage(className?: string): string {
  if (!className) return "";
  // className looks like "language-pddl"
  const match = className.match(/language-(\w+)/);
  return match ? match[1].toLowerCase() : "";
}

function isTerminalBlock(lang: string): boolean {
  return lang === terminalLabel;
}

function getHighlightLanguage(lang: string): string {
  return languageMap[lang] ?? lang;
}

// ---------------------------------------------------------------------------
// Theme merging helper
// ---------------------------------------------------------------------------
// function buildPddlTheme() {
//   const base = { ...oneDark };
//   if (!base.styles) base.styles = [];
//   // Prepend PDDL overrides so they take precedence
//   base.styles = [...base.styles];
//   return base;
// }

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="absolute right-3 top-3 z-10 rounded-md p-1.5 text-muted-foreground/60 opacity-0 transition-all duration-200 hover:bg-white hover:text-muted-foreground group-hover:opacity-100"
      aria-label="Copy code"
    >
      {copied ? <Check className="size-4 text-green-400" /> : <Copy className="size-4" />}
    </button>
  );
}

function TerminalBlock({ code, className }: { code: string; className?: string }) {
  // First, detect explicit tags like <name>...</name>, <command>...</command>, <output>...</output>
  const tagRe = /<([a-zA-Z]+)>([\s\S]*?)<\/\1>/g;

  const tokens: Array<{ type: string; text: string }> = [];
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(code)) !== null) {
    if (m.index > lastIndex) {
      tokens.push({ type: "raw", text: code.slice(lastIndex, m.index) });
    }
    tokens.push({ type: m[1].toLowerCase(), text: m[2] });
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < code.length) tokens.push({ type: "raw", text: code.slice(lastIndex) });

  // helpers for fallback parsing of raw text (preserve previous behavior)
  const fullPromptRe = /^([\w.\-@:/~]+\$)\s*(.*)$/m; // e.g. user@host:~$ command
  const dollarRe = /^\$\s*(.*)$/m; // $ command
  const arrowRe = /^>\s*(.*)$/m; // > command (no prompt)

  const fontFamily = "Menlo, Monaco, 'SFMono-Regular', 'Segoe UI Mono', 'Roboto Mono', ui-monospace, monospace";

  // Render tokens into rows
  const rows: React.ReactNode[] = [];
  let keyCounter = 0;

  const pushOutputLines = (text: string) => {
    const lines = text.replace(/\n$/, "").split('\n');
    for (const ln of lines) {
      if (ln.trim() === "") continue;
      rows.push(
        <div key={keyCounter++} className="whitespace-pre-wrap break-words text-[0.95rem] leading-6" style={{ color: '#cbd5e1', fontFamily }}>
          {ln}
        </div>
      );
    }
  };

  const pushCommandRow = (prompt: string, cmd: string, cmdColor = '#cdd6f4') => {
    rows.push(
      <div key={keyCounter++} className="whitespace-pre-wrap break-words text-[0.95rem] leading-6" style={{ fontFamily }}>
        <span className="font-medium text-green-400">{prompt}</span>
        {cmd ? <span style={{ color: cmdColor }}> {cmd}</span> : null}
      </div>
    );
  };

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.type === 'name') {
      // If next token is command, render together
      const next = tokens[i + 1];
      if (next && next.type === 'command') {
        pushCommandRow(t.text.trim(), next.text.trim());
        i += 1; // consume next
      } else {
        // name alone — treat as prompt attached to following raw line if available
        const following = tokens[i + 1];
        if (following && following.type === 'raw') {
          const text = following.text.replace(/\n$/, '');
          const firstLine = text.split('\n')[0] || '';
          // consume first line from following.raw
          pushCommandRow(t.text.trim(), firstLine.trim());
          // remove the first line from following.text
          tokens[i + 1].text = text.split('\n').slice(1).join('\n');
        } else {
          // lonely name — just render as prompt with empty command
          pushCommandRow(t.text.trim(), '');
        }
      }
      continue;
    }

    if (t.type === 'command') {
      pushCommandRow('$', t.text.trim());
      continue;
    }

    if (t.type === 'output') {
      pushOutputLines(t.text);
      continue;
    }

    // raw fallback: parse by lines and reuse old heuristics
    const raw = t.text.replace(/\n$/, '');
    const rawLines = raw.split('\n');
    for (let j = 0; j < rawLines.length; j++) {
      const ln = rawLines[j];
      if (!ln || ln.trim() === '') continue;
      const mFull = ln.match(fullPromptRe);
      const mDollar = ln.match(dollarRe);
      const mArrow = ln.match(arrowRe);
      if (mFull) {
        const prompt = mFull[1];
        const cmd = mFull[2] || (rawLines[j + 1] || '');
        // if cmd was on next line, skip it
        if (!mFull[2] && rawLines[j + 1]) j += 1;
        pushCommandRow(prompt, cmd.trim());
        continue;
      }
      if (mDollar) {
        pushCommandRow('$', mDollar[1].trim());
        continue;
      }
      if (mArrow) {
        pushCommandRow('$', mArrow[1].trim());
        continue;
      }
      // otherwise output
      pushOutputLines(ln);
    }
  }

  return (
    <div className={`group relative my-6 overflow-hidden rounded-xl border border-border/60 bg-[#0b0c0f] shadow-lg ${className ?? ""}`}>
      <CopyButton code={code} />

      {/* traffic lights */}
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: 'transparent' }}>
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-3 text-xs font-medium text-white/40">Terminal</span>
      </div>

      <div className="overflow-x-auto px-4 pb-4 pt-1">
        <div className="flex flex-col gap-0.5">{rows}</div>
      </div>
    </div>
  );
}

function PddlBlock({ code, className }: { code: string; className?: string }) {
  return (
    <div className={`group relative my-6 ${className ?? ""}`}>
      <CopyButton code={code} />
      <SyntaxHighlighter
        codeTagProps={{ style: { background: "transparent", padding: 0 } }}
        language="lisp"
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: "0.75rem",
          padding: "1.25rem 1rem",
          fontSize: "0.875rem",
          lineHeight: 1.6,
          border: "1px solid var(--border)",
          background: "#0b0c0f",
        }}
        showLineNumbers={false}
        wrapLines
        lineNumberStyle={{ minWidth: "2.5em", opacity: 0.4 }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

function DefaultCodeBlock({ code, language, className }: { code: string; language: string; className?: string }) {
  const prismLang = getHighlightLanguage(language);
  const canHighlight = SyntaxHighlighter.supportedLanguages.includes(prismLang) || prismLang !== "";

  if (!canHighlight || !language) {
    return (
      <div className={`group relative my-6 ${className ?? ""}`}>
        <CopyButton code={code} />
        <pre className="overflow-x-auto rounded-xl border border-border bg-secondary p-4 text-sm leading-relaxed text-foreground">
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div className={`group relative my-6 ${className ?? ""}`}>
      <CopyButton code={code} />
      <SyntaxHighlighter
        language={prismLang}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: "0.75rem",
          padding: "1.25rem 1rem",
          fontSize: "0.875rem",
          lineHeight: 1.6,
          border: "1px solid var(--border)",
        }}
        showLineNumbers={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component — use as the `code` / `pre` override in ReactMarkdown
// ---------------------------------------------------------------------------

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  /** If `inline` is true, render as inline <code> — no syntax highlighting. */
  inline?: boolean;
  [key: string]: any;
}

export function CodeBlock({ children, className, inline, ...props }: CodeBlockProps) {
  const code = String(children).replace(/\n$/, "");
  const language = extractLanguage(className);

  // Inline code — preserve ReactMarkdown's props/className so default CSS applies.
  if (inline) {
    return (
      <code className={className} {...props}>
        {code}
      </code>
    );
  }

  // Terminal block
  if (isTerminalBlock(language)) {
    return <TerminalBlock code={code} className={className} />;
  }

  // PDDL block (use lisp highlighting with better styling)
  if (language === "pddl") {
    return <PddlBlock code={code} className={className} />;
  }

  // Everything else
  return <DefaultCodeBlock code={code} language={language} className={className} />;
}