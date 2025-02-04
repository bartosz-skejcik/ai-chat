import { useState } from "react";
import Link from "next/link";
import { memo } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./code-block";
import { Button } from "@/components/ui/button";

const ThinkBlock = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg p-2 my-2">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="text-sm font-semibold"
      >
        {isOpen ? "Hide Thought" : "Show Thought"}
      </Button>
      {isOpen && <div className="mt-2 text-sm text-gray-700">{children}</div>}
    </div>
  );
};

// Preprocess markdown to replace `<think>...</think>` with a custom syntax
const preprocessMarkdown = (markdown: string) => {
  return markdown.replace(
    /<think>([\s\S]*?)<\/think>/g,
    (_, content) => `\n\n:::think\n${content}\n:::\n\n`,
  );
};

const components: Partial<Components> = {
  code: CodeBlock,
  pre: ({ children }) => <>{children}</>,
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-outside ml-4" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="py-1" {...props}>
      {children}
    </li>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-decimal list-outside ml-4" {...props}>
      {children}
    </ul>
  ),
  strong: ({ children, ...props }) => (
    <span className="font-semibold" {...props}>
      {children}
    </span>
  ),
  a: ({ children, ...props }) => (
    // @ts-expect-error adsf
    <Link
      className="text-blue-500 hover:underline"
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      {children}
    </Link>
  ),
  div: ({ className, children }) => {
    if (className === "think") {
      return <ThinkBlock>{children}</ThinkBlock>;
    }
    return <div className={className}>{children}</div>;
  },
};

const remarkPlugins = [remarkGfm];

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  const processedMarkdown = preprocessMarkdown(children);

  return (
    <ReactMarkdown remarkPlugins={remarkPlugins} components={components}>
      {processedMarkdown}
    </ReactMarkdown>
  );
};

export const Markdown = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);
