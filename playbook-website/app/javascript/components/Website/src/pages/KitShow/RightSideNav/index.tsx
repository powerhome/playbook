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
  // Render nav items organized by sections or show all if no sections
  const renderNavItems = () => {
    if (sections && sections.length > 0) {
      return sections.map((section) => {
        const sectionExamples = examples.filter((example) =>
          section.examples.includes(example.example_key)
        );

        if (sectionExamples.length === 0) return null;

        return (
          <div key={section.title}>
            <Caption
              text={section.title}
              marginBottom="xs"
              marginTop="sm"
              tag="h3"
            />
            {sectionExamples.map((example: any) => (
              <Caption
                size="xs"
                text={example.title}
                key={example.example_key}
                marginLeft="sm"
                color="light"
              />
            ))}
          </div>
        );
      });
    } else {
      // No sections, render all examples without section headers
      return examples.map((example: any) => (
        <Caption size="xs" text={example.title} key={example.example_key} />
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
