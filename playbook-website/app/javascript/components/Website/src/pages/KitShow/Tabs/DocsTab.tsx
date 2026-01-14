import { useState } from "react";
import { Body, Flex, Card, Button, Caption, Title } from "playbook-ui";
import ReactMarkdown from "react-markdown";
import LiveExample from "../../../components/LiveExamples/LiveExampleReact";
import RightSideNav from "../RightSideNav";

interface Section {
  title: string;
  examples: string[];
}

interface DocsTabProps {
  examples: any[];
  exampleProps: any;
  name?: string;
  sections?: Section[];
}

export const DocsTab = ({
  examples,
  exampleProps,
  name,
  sections,
}: DocsTabProps) => {
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

  // Helper function to render an example card
  const renderExampleCard = (example: any) => (
    <Card
      key={example.example_key}
      marginBottom="lg"
      padding="none"
      width="100%"
      id={example.example_key}
    >
      <Caption text={example.title} margin="md" />
      <LiveExample code={example.source} exampleProps={exampleProps} />
      {example.description && example.description !== "" && (
        <Body margin="md">
          <ReactMarkdown>{example.description}</ReactMarkdown>
        </Body>
      )}
      {/* Code Section */}
      <>
        <Flex justify="end" align="center" marginBottom="sm">
          <Button
            text={copyState[example.example_key] ? "Copied!" : "Copy Code"}
            variant="link"
            size="sm"
            icon="copy"
            onClick={() => copyCode(example.source, example.example_key)}
            marginRight="sm"
          />
          <Button
            text={visibleCode[example.example_key] ? "Hide Code" : "Show Code"}
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
  );

  // Organize examples by sections or show all if no sections
  const renderExamples = () => {
    if (sections && sections.length > 0) {
      // Render examples organized by sections
      return sections.map((section) => {
        const sectionExamples = examples.filter((example) =>
          section.examples.includes(example.example_key)
        );

        if (sectionExamples.length === 0) return null;

        return (
          <div
            key={section.title}
            id={section.title.toLowerCase().replace(/\s+/g, "-")}
          >
            <Title
              color="light"
              text={section.title}
              size={3}
              bold={false}
              marginBottom="md"
              marginTop="lg"
            />
            {sectionExamples.map(renderExampleCard)}
          </div>
        );
      });
    } else {
      // No sections, render all examples without section headers
      return examples.map(renderExampleCard);
    }
  };

  return (
    <Flex>
      <Flex flexDirection="column" flex={1} minWidth={0} overflow="auto">
        {examples && examples.length > 0 ? (
          <>{renderExamples()}</>
        ) : (
          <Card padding="md">
            <Body text={`No examples found for ${name} component.`} />
          </Card>
        )}
      </Flex>
      <RightSideNav examples={examples} sections={sections} />
    </Flex>
  );
};
