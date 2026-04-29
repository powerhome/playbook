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

  // Set up IntersectionObserver to track which example is in view to render 'active' state.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScrollRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-10% 0px -80% 0px",
        threshold: 0,
      }
    );

    examples.forEach((example) => {
      const element = document.getElementById(example.example_key);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
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

  // Near the bottom of the page, relax the activation line so the final examples
  // can still become active even if their top never reaches the usual observer zone.
  useEffect(() => {
    const handleScroll = () => {
      if (isManualScrollRef.current || examples.length === 0) return;

      const distanceFromBottom =
        document.documentElement.scrollHeight -
        (window.innerHeight + window.scrollY);
      const nearBottomRange = Math.min(window.innerHeight * 0.75, 500);

      if (distanceFromBottom > nearBottomRange) return;

      const progressToBottom = Math.max(
        0,
        Math.min(1, (nearBottomRange - distanceFromBottom) / nearBottomRange)
      );
      const activationLine =
        window.innerHeight * (0.2 + progressToBottom * 0.55);

      for (let i = examples.length - 1; i >= 0; i--) {
        const element = document.getElementById(examples[i].example_key);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const hasReachedActivationLine =
          rect.top <= activationLine && rect.bottom > 0;

        if (hasReachedActivationLine) {
          setActiveId((currentActiveId) =>
            currentActiveId === examples[i].example_key
              ? currentActiveId
              : examples[i].example_key
          );
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [examples]);

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
