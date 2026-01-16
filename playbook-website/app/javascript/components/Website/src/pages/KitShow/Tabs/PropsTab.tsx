import { Body, Card, Flex } from "playbook-ui";
import KitProps from "../../../../../AvailableProps/kitProps";
import GlobalProps from "../../../../../AvailableProps/globalProps";
import { useState } from "react";
import { Nav, NavItem, SectionSeparator } from "playbook-ui";
import GlobalPropsValues from "../../../../../AvailableProps/globalPropsValues";

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

  const props = JSON.parse(availableProps);
  const globalPropsNames = GlobalPropsValues.map((prop) => prop.prop);

  // Remove global props from kit props
  for (const propName in props) {
    if (globalPropsNames.includes(propName)) {
      delete props[propName];
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
        {showKitTab && <KitProps kitPropsValues={props} darkMode={false} />}
        {!showKitTab && <GlobalProps darkMode={false} />}
      </Card>
    </Flex>
  );
};
