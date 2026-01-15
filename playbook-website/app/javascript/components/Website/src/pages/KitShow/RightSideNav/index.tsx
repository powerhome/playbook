import { Caption, Flex, colors, spacing } from "playbook-ui";
import { useState, useEffect } from "react";

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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
          <div key={section.title} style={{ marginBottom: "16px" }}>
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
                onClick={() => handleClick(example.example_key)}
                style={{
                  borderLeft: `3px solid ${
                    activeId === example.example_key ? colors.primary : colors.border_light
                  }`,
                  paddingLeft: spacing.space_xs,
                }}
              >
                <Caption
                  size="xs"
                  text={example.title}
                  color="light"
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
          onClick={() => handleClick(example.example_key)}
          style={{
            borderLeft: `3px solid ${
              activeId === example.example_key ? colors.primary : colors.border_light
            }`,
            paddingLeft: spacing.space_xs,
          }}
        >
          <Caption size="xs" text={example.title} cursor="pointer" />
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
