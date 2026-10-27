import type { ReactNode } from "react";

function renderList(lines: string[]): ReactNode {
  return (
    <ul className="my-5 space-y-2 pl-1">
      {lines.map((line, index) => (
        <li key={index} className="flex gap-2.5 text-[15px] leading-relaxed text-muted-foreground">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
          <span>{line.replace(/^[-•]\s*/, "")}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Lightweight renderer for the small formatting subset supported by the editor.
 * Text is rendered as text nodes — never as HTML — so admin input cannot inject
 * scripts into public pages.
 */
export default function RichText({
  blocks,
  className = "",
}: {
  blocks: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith("### ")) {
          return (
            <h3
              key={index}
              className="mt-8 mb-3 text-lg font-semibold tracking-tight text-foreground"
            >
              {trimmed.slice(4)}
            </h3>
          );
        }

        if (trimmed.startsWith("## ")) {
          return (
            <h2
              key={index}
              className="mt-10 mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
            >
              {trimmed.slice(3)}
            </h2>
          );
        }

        if (trimmed.startsWith("> ")) {
          return (
            <blockquote
              key={index}
              className="my-6 border-l-2 border-amber-500 pl-5 text-lg font-medium italic leading-relaxed text-foreground"
            >
              {trimmed.slice(2)}
            </blockquote>
          );
        }

        const lines = trimmed.split("\n").map((line) => line.trim());
        if (lines.every((line) => /^[-•]\s+/.test(line))) {
          return <div key={index}>{renderList(lines)}</div>;
        }

        return (
          <p
            key={index}
            className="my-4 text-[15px] leading-[1.85] text-muted-foreground sm:text-base"
          >
            {lines.map((line, lineIndex) => (
              <span key={lineIndex}>
                {line}
                {lineIndex < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
