import { Caption, Flex, colors } from "playbook-ui";
import { useState, useEffect, useRef } from "react";
import { useDarkMode } from "../../../contexts/DarkModeContext";
import "./styles.scss";

interface Section {
  title: string;
  examples: string[];
}

interface RightSideNavProps {
  examples: any[];
  sections?: Section[];
}

const RightSideNav = ({ examples, sections }: RightSideNavProps) => {
  const [activeId, setActiveId] = useState<string>("");
  const navItemsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const isManualScrollRef = useRef(false);
  const { darkMode } = useDarkMode();

  // Scroll active nav item into view if the nav is too long to fit the page
  useEffect(() => {
    if (activeId && navItemsRef.current[activeId] && !isManualScrollRef.current) {
      navItemsRef.current[activeId]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeId]);

  // Keep the active state aligned with scroll position and force the last
  // example active when the page reaches the bottom.
  useEffect(() => {
    const scrollContainer = document.querySelector(
      ".pb--page--content--main"
    ) as HTMLElement | null;

    const updateActiveId = () => {
      if (isManualScrollRef.current || examples.length === 0) return;

      const viewportHeight = scrollContainer?.clientHeight ?? window.innerHeight;
      const scrollTop = scrollContainer?.scrollTop ?? window.scrollY;
      const scrollHeight =
        scrollContainer?.scrollHeight ?? document.documentElement.scrollHeight;
      const scrolledToBottom =
        scrollTop + viewportHeight >= scrollHeight - 8;

      if (scrolledToBottom) {
        const lastExampleId = examples[examples.length - 1]?.example_key;

        if (lastExampleId) {
          setActiveId((currentActiveId) =>
            currentActiveId === lastExampleId ? currentActiveId : lastExampleId
          );
        }

        return;
      }

      const containerTop = scrollContainer?.getBoundingClientRect().top ?? 0;
      const activationLine = containerTop + viewportHeight * 0.2;
      let nextActiveId = examples[0]?.example_key ?? "";

      for (let i = 0; i < examples.length; i++) {
        const element = document.getElementById(examples[i].example_key);
        if (!element) continue;

        const rect = element.getBoundingClientRect();

        if (rect.top <= activationLine) {
          nextActiveId = examples[i].example_key;
        } else {
          break;
        }
      }

      if (nextActiveId) {
        setActiveId((currentActiveId) =>
          currentActiveId === nextActiveId ? currentActiveId : nextActiveId
        );
      }
    };

    updateActiveId();

    const scrollTarget = scrollContainer ?? window;

    scrollTarget.addEventListener("scroll", updateActiveId, { passive: true });
    window.addEventListener("resize", updateActiveId);

    return () => {
      scrollTarget.removeEventListener("scroll", updateActiveId);
      window.removeEventListener("resize", updateActiveId);
    };
  }, [examples]);

  const handleClick = (id: string) => {
    isManualScrollRef.current = true;
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // Reset the flag after scroll completes
    setTimeout(() => {
      isManualScrollRef.current = false;
    }, 1000);
  };

  // Render nav items organized by sections or show all if no sections
  const renderNavItems = () => {
    if (sections && sections.length > 0) {
      return sections.map((section) => {
        const sectionExamples = examples.filter((example) =>
          section.examples.includes(example.example_key)
        );

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
            {sectionExamples.map((example: any) => (
              <div
                key={example.example_key}
                ref={(el) => (navItemsRef.current[example.example_key] = el)}
                onClick={() => handleClick(example.example_key)}
                className="category-nav-item"
                style={{
                  borderLeft: `3px solid ${
                    activeId === example.example_key ? colors.primary : colors.border_light
                  }`
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
    } else {
      // No sections, render all examples without section headers
      return examples.map((example: any) => (
        <div
          key={example.example_key}
          ref={(el) => (navItemsRef.current[example.example_key] = el)}
          onClick={() => handleClick(example.example_key)}
          className="category-nav-item"
          style={{
            borderLeft: `3px solid ${
              activeId === example.example_key ? colors.primary : colors.border_light
            }`
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
    }
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
      {examples && renderNavItems()}
    </Flex>
  );
};

export default RightSideNav;
