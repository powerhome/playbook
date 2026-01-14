import { Caption, Flex } from "playbook-ui";

interface Section {
  title: string;
  examples: string[];
}

interface RightSideNavProps {
  examples: any[];
  sections?: Section[];
}

const RightSideNav = ({ examples, sections }: RightSideNavProps) => {
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
          <div key={section.title}>
            <div onClick={() => handleClick(sectionId)}>
              <Caption cursor="pointer" text={section.title} marginY="xs" />
            </div>
            {sectionExamples.map((example: any) => (
              <div
                key={example.example_key}
                onClick={() => handleClick(example.example_key)}
              >
                <Caption
                  size="xs"
                  text={example.title}
                  marginLeft="xs"
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
      htmlOptions={{ style: { width: "206px" } }}
      shrink
    >
      {examples && renderNavItems()}
    </Flex>
  );
};

export default RightSideNav;
