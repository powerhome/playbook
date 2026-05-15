import { Caption, Flex, colors } from "playbook-ui";
import { useState, useEffect, useRef, useMemo } from "react";
import { useDarkMode } from "../../../contexts/DarkModeContext";
import "./styles.scss";

/** Matches `DocsTab` / kit YAML `sections` entries. */
export interface KitDocSection {
  title: string;
  examples: string[];
}

/** Fields this nav reads from each docs example (see `DocsTab.tsx`). */
export interface KitDocExample {
  example_key: string;
  title: string;
}

interface RightSideNavProps {
  examples: KitDocExample[];
  sections?: KitDocSection[];
}

/** Pixel tolerance so "scrolled to bottom" still counts with rounding and scrollbars. */
const SCROLL_END_SLOP_PX = 24;

/** Active item follows headings that cross this line (ratio of main scrollport height from its top). */
const ACTIVATION_LINE_VIEWPORT_RATIO = 0.2;

function examplesForSection(
  examples: KitDocExample[],
  section: KitDocSection,
): KitDocExample[] {
  return examples.filter((ex) => section.examples.includes(ex.example_key));
}

// Main scroll column for the website shell (`website_new.scss` / `LayoutRight`).
const MAIN_CONTENT_SCROLL_SELECTOR = ".pb--page--content--main";

/**
 * Same vertical order as `DocsTab` `renderExamples`: walk sections in order, append each
 * section's examples in `examples` array order. Raw `examples` alone is not reliable when
 * sections reorder rows vs the kit's default list.
 */
function examplesInDocsTabOrder(
  examples: KitDocExample[],
  sections: KitDocSection[] | undefined,
): KitDocExample[] {
  if (!sections?.length) {
    return examples;
  }

  const ordered: KitDocExample[] = [];
  for (const section of sections) {
    ordered.push(...examplesForSection(examples, section));
  }

  return ordered.length > 0 ? ordered : examples;
}

const RightSideNav = ({ examples, sections }: RightSideNavProps) => {
  const [activeId, setActiveId] = useState<string>("");
  const navItemsRef = useRef<Record<string, HTMLDivElement | null>>({});
  const isManualScrollRef = useRef<boolean>(false);
  const { darkMode } = useDarkMode();

  const examplesInDocumentOrder = useMemo(
    () => examplesInDocsTabOrder(examples, sections),
    [examples, sections],
  );

  // Scroll active nav item into view if the nav is too long to fit the page
  useEffect(() => {
    if (activeId && navItemsRef.current[activeId] && !isManualScrollRef.current) {
      navItemsRef.current[activeId]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeId]);

  // Scroll-spy listens on the main content column (not `window`); class matches `LayoutRight`.
  useEffect(() => {
    const scrollContainer = document.querySelector<HTMLElement>(
      MAIN_CONTENT_SCROLL_SELECTOR,
    );

    const updateActiveId = () => {
      if (isManualScrollRef.current || examplesInDocumentOrder.length === 0) {
        return;
      }

      const viewportHeight = scrollContainer?.clientHeight ?? window.innerHeight;
      const scrollTop = scrollContainer?.scrollTop ?? window.scrollY;
      const scrollHeight =
        scrollContainer?.scrollHeight ?? document.documentElement.scrollHeight;
      const scrolledToBottom =
        scrollTop + viewportHeight >= scrollHeight - SCROLL_END_SLOP_PX;

      if (scrolledToBottom) {
        const lastExampleId =
          examplesInDocumentOrder[examplesInDocumentOrder.length - 1]?.example_key;

        if (lastExampleId) {
          setActiveId((current) =>
            current === lastExampleId ? current : lastExampleId,
          );
        }
        return;
      }

      const containerTop = scrollContainer?.getBoundingClientRect().top ?? 0;
      const activationLine =
        containerTop + viewportHeight * ACTIVATION_LINE_VIEWPORT_RATIO;
      let nextActiveId = examplesInDocumentOrder[0]?.example_key ?? "";

      for (const ex of examplesInDocumentOrder) {
        const element = document.getElementById(ex.example_key);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (rect.top <= activationLine) {
          nextActiveId = ex.example_key;
        } else {
          break;
        }
      }

      if (nextActiveId) {
        setActiveId((current) => (current === nextActiveId ? current : nextActiveId));
      }
    };

    updateActiveId();

    const scrollTarget: HTMLElement | Window = scrollContainer ?? window;
    scrollTarget.addEventListener("scroll", updateActiveId, { passive: true });
    window.addEventListener("resize", updateActiveId);

    return () => {
      scrollTarget.removeEventListener("scroll", updateActiveId);
      window.removeEventListener("resize", updateActiveId);
    };
  }, [examplesInDocumentOrder]);

  const handleClick = (id: string) => {
    isManualScrollRef.current = true;
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setTimeout(() => {
      isManualScrollRef.current = false;
    }, 1000);
  };

  const renderNavItems = () => {
    if (sections && sections.length > 0) {
      return sections.map((section) => {
        const sectionExamples = examplesForSection(examples, section);

        if (sectionExamples.length === 0) return null;

        const sectionId = section.title.toLowerCase().replace(/\s+/g, "-");

        return (
          <div key={section.title} style={{ marginBottom: "16px", width: "100%" }}>
            <div onClick={() => handleClick(sectionId)}>
              <Caption
                cursor="pointer"
                text={section.title}
                marginBottom="xxs"
                dark={darkMode}
              />
            </div>
            {sectionExamples.map((example) => (
              <div
                key={example.example_key}
                ref={(el) => {
                  navItemsRef.current[example.example_key] = el;
                }}
                onClick={() => handleClick(example.example_key)}
                className="category-nav-item"
                style={{
                  borderLeft: `3px solid ${
                    activeId === example.example_key ? colors.primary : colors.border_light
                  }`,
                }}
              >
                <Caption
                  size="xs"
                  text={example.title}
                  color={activeId === example.example_key ? "link" : "light"}
                  cursor="pointer"
                  dark={darkMode}
                  htmlOptions={{
                    style: {
                      paddingTop: "2px",
                      paddingBottom: "2px",
                    },
                  }}
                />
              </div>
            ))}
          </div>
        );
      });
    }

    return examples.map((example) => (
      <div
        key={example.example_key}
        ref={(el) => {
          navItemsRef.current[example.example_key] = el;
        }}
        onClick={() => handleClick(example.example_key)}
        className="category-nav-item"
        style={{
          borderLeft: `3px solid ${
            activeId === example.example_key ? colors.primary : colors.border_light
          }`,
        }}
      >
        <Caption
          size="xs"
          text={example.title}
          color={activeId === example.example_key ? "link" : "light"}
          cursor="pointer"
          dark={darkMode}
          htmlOptions={{
            style: {
              paddingTop: "2px",
              paddingBottom: "2px",
            },
          }}
        />
      </div>
    ));
  };

  return (
    <Flex
      display={{ xs: "none", sm: "none", md: "none", lg: "none", xl: "flex" }}
      flexDirection="column"
      marginLeft="xl"
      position="sticky"
      alignSelf="flex-start"
      htmlOptions={{
        style: {
          width: "206px",
          top: "20px",
          maxHeight: "calc(100vh - 120px)",
          overflowY: "auto",
        },
      }}
      shrink
    >
      {examples.length > 0 ? renderNavItems() : null}
    </Flex>
  );
};

export default RightSideNav;
