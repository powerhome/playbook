import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export type SyntaxLanguage =
  | "jsx"
  | "tsx"
  | "markup"
  | "erb"
  | "ruby"
  | "swift";

type SyntaxHighlightedCodeProps = {
  code: string;
  language: SyntaxLanguage;
  className?: string;
  rougeHtml?: string | null;
};

export const SyntaxHighlightedCode = ({
  code,
  language,
  className,
  rougeHtml,
}: SyntaxHighlightedCodeProps) => {
  if (rougeHtml && rougeHtml.length > 0) {
    return (
      <div
        className={className}
        style={{
          overflow: "auto",
          borderRadius: 6,
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        <div className="pb--codeCopy">
          <pre
            className="highlight"
            style={{
              margin: 0,
              padding: "16px 20px",
              borderRadius: 6,
              fontFamily:
                'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
            }}
            dangerouslySetInnerHTML={{ __html: rougeHtml }}
          />
        </div>
      </div>
    );
  }

  return (
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
};
