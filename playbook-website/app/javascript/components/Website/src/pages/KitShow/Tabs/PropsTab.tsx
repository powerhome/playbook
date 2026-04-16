import { Body, Card, Flex } from "playbook-ui";
import KitProps from "../../../../../AvailableProps/kitProps";
import GlobalProps from "../../../../../AvailableProps/globalProps";
import { useState } from "react";
import { Nav, NavItem, SectionSeparator } from "playbook-ui";
import globalPropsValues from "../../../../../AvailableProps/globalPropsValues";

interface PropsTabProps {
  availableProps?: string;
  platform?: "react" | "rails";
}

export const PropsTab = ({ availableProps, platform = "react" }: PropsTabProps) => {
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

  // Filter out global props and filter by platform
  const kitProps: Record<string, any> = {};
  for (const propName in props) {
    const prop = props[propName];
    const isGlobalProp = globalPropsNames.includes(propName);
    const platforms = prop.platforms || [];
    const isForPlatform = platforms.length === 0 || platforms.includes(platform);
    
    if (!isGlobalProp && isForPlatform) {
      kitProps[propName] = prop;
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
