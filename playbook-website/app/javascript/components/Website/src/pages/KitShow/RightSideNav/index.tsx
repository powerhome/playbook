import { Caption, Flex, colors } from "playbook-ui";
import { useState, useEffect, useRef } from "react";
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

  // Scroll active nav item into view if the nav is too long to fit the page
  useEffect(() => {
    if (activeId && navItemsRef.current[activeId] && !isManualScrollRef.current) {
      navItemsRef.current[activeId]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeId]);

  // Set up IntersectionObserver to track which example is in view to render 'active' state
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
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

    // Observe all example elements to know which is in view
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
          />
        </div>
      ));
    }
  };

  return (
    <Flex
      display={{ xs: "none", sm: "none", md: "none", lg: "none", xl: "flex" }}
      flexDirection="column"
      paddingLeft="lg"
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
