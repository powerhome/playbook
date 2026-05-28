import { useEffect, useState } from "react";
import {
  Body,
  Flex,
  Card,
  Button,
  Caption,
  Title,
  EmptyState,
  Icon,
  Tooltip,
} from "playbook-ui";
import { MarkdownContent } from "../../../components/MarkdownContent";
import LiveExample from "../../../components/LiveExamples/LiveExampleReact";
import LiveExampleRails from "../../../components/LiveExamples/LiveExampleRails";
import { SyntaxHighlightedCode } from "../../../components/SyntaxHighlightedCode";
import { usePlatform } from "../../../contexts/PlatformContext";
import RightSideNav, { type KitDocSection } from "../RightSideNav";
import { useDarkMode } from "../../../contexts/DarkModeContext";
import { formatReactSnippet } from "./formatReactSnippet";
import {
  anchorIdFromLocationHash,
  scrollToAnchor,
  setLocationHash,
  urlForAnchor,
} from "../anchors";

interface DocsTabProps {
  examples: any[];
  exampleProps: any;
  name?: string;
  sections?: KitDocSection[];
}

export const DocsTab = ({ examples, exampleProps, sections }: DocsTabProps) => {
  const { platform } = usePlatform();
  const codeLanguage: "erb" | "swift" | "tsx" =
    platform === "rails" ? "erb" : platform === "swift" ? "swift" : "tsx";
  const { darkMode } = useDarkMode();
  const [visibleCode, setVisibleCode] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [copyState, setCopyState] = useState<{ [key: string]: boolean }>({});
  const [linkCopyState, setLinkCopyState] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    if (!examples?.length) return;

    const scrollToHash = (behavior: ScrollBehavior = "smooth") => {
      const anchorId = anchorIdFromLocationHash();
      if (!anchorId) return;

      const delays = [0, 50, 250, 500];
      const timeoutIds = delays.map((delay) =>
        window.setTimeout(() => {
          scrollToAnchor(anchorId, behavior);
        }, delay),
      );

      return () => {
        timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      };
    };

    const cancelInitialScroll = scrollToHash("auto");

    const handleHashNavigation = () => scrollToHash();

    window.addEventListener("hashchange", handleHashNavigation);
    window.addEventListener("popstate", handleHashNavigation);

    return () => {
      cancelInitialScroll?.();
      window.removeEventListener("hashchange", handleHashNavigation);
      window.removeEventListener("popstate", handleHashNavigation);
    };
  }, [examples, platform, sections]);

  const getDisplayCode = (source: string) =>
    platform === "react"
      ? formatReactSnippet(source ?? "", darkMode)
      : (source ?? "");

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

  const copyExampleLink = async (exampleKey: string) => {
    const url = urlForAnchor(exampleKey);
    setLocationHash(exampleKey);

    try {
      await navigator.clipboard.writeText(url);
      setLinkCopyState((prev) => ({ ...prev, [exampleKey]: true }));
      setTimeout(() => {
        setLinkCopyState((prev) => ({ ...prev, [exampleKey]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy example link:", err);
    }
  };

  const handleExampleLinkKeyDown = (
    event: React.KeyboardEvent,
    exampleKey: string,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    copyExampleLink(exampleKey);
  };

  // Helper function to render an example card
  const renderExampleCard = (example: any) => {
    const displayCode = getDisplayCode(example.source);

    return (
      <div
        id={example.example_key}
        key={example.example_key}
        style={{
          boxSizing: "border-box",
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
        }}
      >
        <Card
          marginBottom="lg"
          padding="none"
          width="100%"
          dark={darkMode}
          htmlOptions={{
            style: {
              boxSizing: "border-box",
              maxWidth: "100%",
              minWidth: 0,
            },
          }}
        >
          <Flex alignItems="center" gap="xxs" margin="md">
            <Caption text={example.title} color="lighter" dark={darkMode} />
            <Tooltip
              delay={{ close: 1000 }}
              forceOpenTooltip={linkCopyState[example.example_key]}
              placement="top"
              showTooltip={false}
              text={
                linkCopyState[example.example_key] ? "Copied!" : "Copy link"
              }
            >
              <Flex
                alignItems="center"
                cursor="pointer"
                htmlOptions={{
                  "aria-label": `Copy link to ${example.title}`,
                  onClick: () => copyExampleLink(example.example_key),
                  onKeyDown: (event: React.KeyboardEvent) =>
                    handleExampleLinkKeyDown(event, example.example_key),
                  role: "button",
                  tabIndex: 0,
                }}
                inline="flex"
              >
                <Icon
                  aria={{ hidden: true }}
                  hover={{ color: "primary" }}
                  color="lighter"
                  icon="link"
                  size="xs"
                />
              </Flex>
            </Tooltip>
          </Flex>
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
                    platform === "rails"
                      ? example.highlighted_source
                      : undefined
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
            style={{
              boxSizing: "border-box",
              width: "100%",
              maxWidth: "100%",
              minWidth: 0,
            }}
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
      );
    }
    return null;
  };
  return (
    <Flex
      align="stretch"
      minWidth={0}
      width="100%"
      htmlOptions={{
        style: {
          boxSizing: "border-box",
          maxWidth: "100%",
          minWidth: 0,
        },
      }}
    >
      {/*
        Keep horizontal overflow clipping on the examples column only. `overflow-x: hidden` on an
        ancestor of `position: sticky` breaks sticking to the main scrollport (see RightSideNav).
      */}
      <Flex
        flexDirection="column"
        flex={1}
        minWidth={0}
        width="100%"
        htmlOptions={{
          style: {
            boxSizing: "border-box",
            maxWidth: "100%",
            minWidth: 0,
            overflowX: "hidden",
          },
        }}
      >
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
