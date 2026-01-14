import { Caption, Flex } from "playbook-ui";

interface RightSideNavProps {
  examples: any[];
}

const RightSideNav = ({ examples }: RightSideNavProps) => {
  return (
    <Flex
      display={{ xs: "none", sm: "none", md: "none", lg: "none", xl: "flex" }}
      flexDirection="column"
      marginLeft="lg"
      width="206px"
      shrink
    >
      {examples &&
        examples.map((example: any, index: number) => (
          <Caption size="xs" text={example.title} key={index} />
        ))}
    </Flex>
  );
};

export default RightSideNav;
