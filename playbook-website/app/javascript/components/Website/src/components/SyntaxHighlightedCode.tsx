import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export type SyntaxLanguage = "jsx" | "tsx" | "markup" | "ruby" | "swift";

type SyntaxHighlightedCodeProps = {
  code: string;
  language: SyntaxLanguage;
  className?: string;
};

export const SyntaxHighlightedCode = ({
  code,
  language,
  className,
}: SyntaxHighlightedCodeProps) => (
  <div
    className={className}
    style={{
      overflow: "auto",
      borderRadius: 6,
      fontSize: 13,
      lineHeight: 1.5,
    }}
  >
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      PreTag="div"
      customStyle={{
        margin: 0,
        padding: "16px 20px",
        borderRadius: 6,
      }}
      codeTagProps={{
        style: {
          fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
        },
      }}
    >
      {code}
    </SyntaxHighlighter>
  </div>
);
