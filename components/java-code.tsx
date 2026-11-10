const KEYWORDS = new Set([
  "int",
  "double",
  "boolean",
  "char",
  "String",
  "void",
  "class",
  "final",
  "if",
  "else",
  "switch",
  "case",
  "break",
  "default",
  "while",
  "do",
  "for",
  "new",
  "return",
  "true",
  "false",
  "import",
  "Scanner",
  "System",
]);

const TOKEN =
  /\/\/.*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])'|\b[A-Za-z_][A-Za-z0-9_]*\b|\d+(?:\.\d+)?|\s+|./g;

export function JavaCode({ code }: { code: string }) {
  const parts = Array.from(code.matchAll(TOKEN), (match) => match[0]);

  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-[oklch(0.965_0.012_88)] px-4 py-3 font-mono text-[13px] leading-6 text-foreground">
      <code>
        {parts.map((token, index) => {
          let className = "";
          if (token.startsWith("//")) {
            className = "text-muted-foreground italic";
          } else if (token.startsWith('"') || token.startsWith("'")) {
            className = "text-[oklch(0.46_0.09_45)]";
          } else if (KEYWORDS.has(token)) {
            className = "text-primary";
          } else if (/^\d/.test(token)) {
            className = "text-[oklch(0.46_0.08_70)]";
          }

          return (
            <span key={`${index}-${token}`} className={className}>
              {token}
            </span>
          );
        })}
      </code>
    </pre>
  );
}

export function RichText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);

  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code
            key={index}
            className="rounded bg-muted px-1 py-0.5 font-mono text-[0.92em]"
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}
