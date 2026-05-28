import React from "react";
import {
  Flex,
  Card,
  Checkbox,
  SectionSeparator,
  Badge,
  Caption,
} from "playbook-ui";

const LettuceCheckboxCard = () => {
  return (
    <Flex
      className="lettuce_checkbox component_example"
      cursor="pointer"
      hover={{ scale: "sm" }}
    >
      <Card borderNone borderRadius="xl" shadow="deepest">
        <Flex justify="between">
          <Caption size="xs" text="Select at least 1" />
          <Badge text="Required" rounded variant="primary" />
        </Flex>
        <Flex orientation="column" align="stretch">
          <Checkbox
            paddingY="xs"
            tabIndex={0}
            text="Spring Mix"
            hover={{ background: "active_light" }}
          />
          <SectionSeparator />
          <Checkbox
            paddingY="xs"
            checked
            tabIndex={1}
            text="Chopped Romaine"
            hover={{ background: "active_light" }}
          />
          <SectionSeparator />
          <Checkbox
            paddingY="xs"
            tabIndex={2}
            text="Curly Kale"
            hover={{ background: "active_light" }}
          />
        </Flex>
      </Card>
    </Flex>
  );
};

export default LettuceCheckboxCard;
