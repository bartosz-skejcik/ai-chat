"use client";

import { useState, useEffect, ReactNode } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as theme } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children?: ReactNode;
}

export function CodeBlock({
  inline,
  className,
  children,
  ...props
}: CodeBlockProps) {
  const [output] = useState<string | null>(null);
  const [tab] = useState<"code" | "run">("code");
  const [isInline, setIsInline] = useState(inline);

  const match = /language-(\w+)/.exec(className || "");
  const language = match?.[1];

  useEffect(() => {
    if (!language) {
      setIsInline(true);
    } else {
      setIsInline(false);
    }
  }, [language]);

  if (isInline) {
    return (
      <code
        className={`${className} text-sm bg-zinc-100 dark:bg-zinc-800 py-0.5 px-1 rounded-md`}
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <div className="not-prose flex flex-col">
      {tab === "code" && (
        <div className="siema text-sm w-full overflow-x-auto dark:bg-zinc-900 px-2 border border-zinc-200 dark:border-zinc-700 rounded-xl dark:text-zinc-50 text-zinc-900">
          {language ? (
            <SyntaxHighlighter
              language={language}
              style={theme}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <pre {...props}>
              <code className="whitespace-pre-wrap break-words">
                {children}
              </code>
            </pre>
          )}
        </div>
      )}

      {tab === "run" && output && (
        <div className="text-sm w-full overflow-x-auto bg-zinc-800 dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-700 border-t-0 rounded-b-xl text-zinc-50">
          <code>{output}</code>
        </div>
      )}
    </div>
  );
}
