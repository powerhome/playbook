import { useState } from "react";
import { Body, Flex, Card, Button, Caption, Title, EmptyState } from "playbook-ui";
import { MarkdownContent } from "../../../components/MarkdownContent";
import LiveExample from "../../../components/LiveExamples/LiveExampleReact";
import LiveExampleRails from "../../../components/LiveExamples/LiveExampleRails";
import { SyntaxHighlightedCode } from "../../../components/SyntaxHighlightedCode";
import { usePlatform } from "../../../contexts/PlatformContext";
import RightSideNav, { type KitDocSection } from "../RightSideNav";
import { useDarkMode } from "../../../contexts/DarkModeContext";
import { formatReactSnippet } from "./formatReactSnippet";

interface DocsTabProps {
  examples: any[];
  exampleProps: any;
  name?: string;
  sections?: KitDocSection[];
}

export const DocsTab = ({
  examples,
  exampleProps,
  sections,
}: DocsTabProps) => {
  const { platform } = usePlatform();
  const codeLanguage: "erb" | "swift" | "tsx" =
    platform === "rails" ? "erb" : platform === "swift" ? "swift" : "tsx";
  const { darkMode } = useDarkMode();
  const [visibleCode, setVisibleCode] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [copyState, setCopyState] = useState<{ [key: string]: boolean }>({});

  const getDisplayCode = (source: string) =>
    platform === "react" ? formatReactSnippet(source ?? "", darkMode) : source ?? "";

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
  const renderExampleCard = (example: any) => {
    const displayCode = getDisplayCode(example.source);

    return (
      <div
        id={example.example_key}
        key={example.example_key}
        style={{ width: "100%" }}
      >
      <Card marginBottom="lg" padding="none" width="100%" dark={darkMode}>
        <Caption text={example.title} color="lighter" margin="md" dark={darkMode} />
        {platform === "rails" ? (
          <LiveExampleRails html={example.rendered ?? ""} />
        ) : (
          <LiveExample code={example.source} exampleProps={exampleProps} />
        )}
        {example.description && example.description !== "" && (
          <Body margin="md" dark={darkMode}>
            <MarkdownContent>{example.description}</MarkdownContent>
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
              onClick={() => copyCode(displayCode, example.example_key)}
              marginRight="sm"
              dark={darkMode}
            />
            <Button
              text={
                visibleCode[example.example_key] ? "Hide Code" : "Show Code"
              }
              variant="link"
              size="sm"
              icon="code"
              onClick={() => toggleCode(example.example_key)}
              dark={darkMode}
            />
          </Flex>

          {visibleCode[example.example_key] && (
            <Card borderNone width="100%" dark={darkMode}>
              <SyntaxHighlightedCode
                code={displayCode}
                language={codeLanguage}
                rougeHtml={
                  platform === "rails" ? example.highlighted_source : undefined
                }
              />
            </Card>
          )}
        </>
      </Card>
      </div>
    );
  };
  // Organize examples by sections or show all if no sections
  const renderExamples = () => {
    if (sections && sections.length > 0) {
      // Render examples organized by sections
      return sections.map((section) => {
        const sectionExamples = examples.filter((example) =>
          section.examples.includes(example.example_key),
        );

        if (sectionExamples.length === 0) return null;

        return (
          <div
            key={section.title}
            id={section.title.toLowerCase().replace(/\s+/g, "-")}
            style={{ width: "100%" }}
          >
            <Title
              color="light"
              text={section.title}
              size={3}
              bold={false}
              marginBottom="md"
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

  const emptyMessage = () => {
    if (examples && examples.length === 0) {
      return (
        <Flex justify="center" width="100%">
          <EmptyState
            header="No Docs Found"
            description={`This component is not available in ${platform.toUpperCase()}, please refer to ${platform === "rails" ? "REACT" : "RAILS"} documentation for more information.`}
            image="default"
            size="lg"
          />
        </Flex>
      )
    }
    return null;
  }
  return (
    <Flex
      paddingRight={{ xs: "xl", sm: "xl", md: "xl", lg: "xl", xl: "md" }}
      paddingLeft="xl"
    >
      <Flex flexDirection="column" flex={1} minWidth={0} overflow="auto">
        {examples && examples.length > 0 ? (
          <>{renderExamples()}</>
        ) : (
          emptyMessage()
        )}
      </Flex>
      <RightSideNav examples={examples} sections={sections} />
    </Flex>
  );
};
