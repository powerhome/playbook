import { useState } from "react";
import { Body, Flex, Card, Button, Caption } from "playbook-ui";
import ReactMarkdown from "react-markdown";
import LiveExample from "../../../components/LiveExamples/LiveExampleReact";

interface DocsTabProps {
  examples: any[];
  exampleProps: any;
  name?: string;
}

export const DocsTab = ({ examples, exampleProps, name }: DocsTabProps) => {
  const [visibleCode, setVisibleCode] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [copyState, setCopyState] = useState<{ [key: string]: boolean }>({});

  const toggleCode = (exampleKey: string) => {
    setVisibleCode((prev) => ({
      ...prev,
      [exampleKey]: !prev[exampleKey],
    }));
  };

  const copyCode = async (code: string, exampleKey: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState((prev) => ({ ...prev, [exampleKey]: true }));
      setTimeout(() => {
        setCopyState((prev) => ({ ...prev, [exampleKey]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <>
      {examples && examples.length > 0 ? (
        <>
          {examples.map((example: any) => (
            <Card
              key={example.example_key}
              marginBottom="lg"
              padding="none"
            >
              <Caption text={example.title} margin="md" />
              <LiveExample
                code={example.source}
                exampleProps={exampleProps}
              />
              {example.description && example.description !== "" && (
                <Body margin="md">
                  <ReactMarkdown>{example.description}</ReactMarkdown>
                </Body>
              )}
              {/* Code Section */}
              <>
                <Flex justify="end" align="center" marginBottom="sm">
                  <Button
                    text={
                      copyState[example.example_key]
                        ? "Copied!"
                        : "Copy Code"
                    }
                    variant="link"
                    size="sm"
                    icon="copy"
                    onClick={() =>
                      copyCode(example.source, example.example_key)
                    }
                    marginRight="sm"
                  />
                  <Button
                    text={
                      visibleCode[example.example_key]
                        ? "Hide Code"
                        : "Show Code"
                    }
                    variant="link"
                    size="sm"
                    icon="code"
                    onClick={() => toggleCode(example.example_key)}
                  />
                </Flex>

                {visibleCode[example.example_key] && (
                  <Card borderNone width="100%">
                    <pre className="highlight">
                      <code>{example.source}</code>
                    </pre>
                  </Card>
                )}
              </>
            </Card>
          ))}
        </>
      ) : (
        <Card padding="md">
          <Body text={`No examples found for ${name} component.`} />
        </Card>
      )}
    </>
  );
};
