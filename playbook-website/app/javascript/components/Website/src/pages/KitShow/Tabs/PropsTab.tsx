import { Body, Card, Flex } from "playbook-ui";
import KitProps from "../../../../../AvailableProps/kitProps";
import GlobalProps from "../../../../../AvailableProps/globalProps";
import { useState } from "react";
import { Nav, NavItem, SectionSeparator } from "playbook-ui";
import globalPropsValues from "../../../../../AvailableProps/globalPropsValues";

interface PropsTabProps {
  availableProps?: string;
}

export const PropsTab = ({ availableProps }: PropsTabProps) => {
  const [showKitTab, setShowKitTab] = useState(true);

  if (!availableProps) {
    return (
      <Card padding="md">
        <Body text="No props available for this kit." />
      </Card>
    );
  }

  // Parse the schema JSON
  const schema = JSON.parse(availableProps);
  
  // Extract props from our kit.schema.json format
  // Schema structure: { $schema, name, description, platforms, props: {...}, globalProps, usage }
  const props = schema.props && typeof schema.props === 'object' ? schema.props : schema;
  
  // Get global prop names to filter them out
  const globalPropsNames = globalPropsValues.map((prop: { prop: string }) => prop.prop);

  // Filter out global props, keeping only kit-specific props
  const kitProps: Record<string, any> = {};
  for (const propName in props) {
    if (!globalPropsNames.includes(propName)) {
      kitProps[propName] = props[propName];
    }
  }

  return (
    <Flex paddingX="xl" width="100%">
      <Card padding="none" width="100%">
        <Card.Body padding="sm">
          <Nav orientation="horizontal" variant="subtle">
            <NavItem
              text="Kit Props"
              active={showKitTab}
              onClick={() => setShowKitTab(true)}
              cursor="pointer"
            />
            <NavItem
              text="Global Props"
              active={!showKitTab}
              onClick={() => setShowKitTab(false)}
              cursor="pointer"
            />
          </Nav>
        </Card.Body>
        <SectionSeparator />
        {showKitTab && <KitProps kitPropsValues={kitProps} darkMode={false} />}
        {!showKitTab && <GlobalProps darkMode={false} />}
      </Card>
    </Flex>
  );
};
