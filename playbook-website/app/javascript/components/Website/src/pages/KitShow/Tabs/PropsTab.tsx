import { useState } from "react";
import { Body, Card, Flex, Nav, NavItem, SectionSeparator } from "playbook-ui";
import KitProps from "../../../components/AvailableProps/kitProps";
import GlobalProps from "../../../components/AvailableProps/globalProps";
import GlobalEventProps from "../../../components/AvailableProps/globalEventProps";
import globalPropsValues from "../../../components/AvailableProps/globalPropsValues";
import globalEventPropsValues from "../../../components/AvailableProps/globalEventPropsValues";
import {
  filterKitPropsForPropsTab,
  PropsTabId,
  shouldShowGlobalEventPropsTab,
} from "../../../components/AvailableProps/propsTabHelpers";
import { useDarkMode } from "../../../contexts/DarkModeContext";
import { formatPropNameForPlatform } from "../../../helpers/platform";

interface PropsTabProps {
  availableProps?: string;
  platform?: string;
}

export const PropsTab = ({ availableProps, platform = "react" }: PropsTabProps) => {
  const [activeTab, setActiveTab] = useState<PropsTabId>("kit");
  const { darkMode } = useDarkMode();

  if (!availableProps) {
    return (
      <Card padding="md">
        <Body text="No props available for this kit." />
      </Card>
    );
  }

  const schema = JSON.parse(availableProps);
  const props = schema.props && typeof schema.props === "object" ? schema.props : schema;
  const globalPropsNames = globalPropsValues.map((prop) => prop.prop);
  const globalEventPropsNames = globalEventPropsValues.map((prop) => prop.prop);
  const showGlobalEventPropsTab = shouldShowGlobalEventPropsTab(schema, platform);

  const filteredKitProps = filterKitPropsForPropsTab(
    props,
    globalPropsNames,
    globalEventPropsNames,
    platform,
    showGlobalEventPropsTab
  );

  const kitProps: Record<string, any> = {};
  for (const propName in filteredKitProps) {
    kitProps[formatPropNameForPlatform(propName, platform)] = filteredKitProps[propName];
  }

  const resolvedTab =
    activeTab === "globalEvent" && !showGlobalEventPropsTab ? "kit" : activeTab;

  return (
    <Flex width="100%">
      <Card padding="none" width="100%" dark={darkMode}>
        <Card.Body padding="sm">
          <Nav orientation="horizontal" variant="subtle" dark={darkMode}>
            <NavItem
              text="Kit Props"
              active={resolvedTab === "kit"}
              onClick={() => setActiveTab("kit")}
              cursor="pointer"
              dark={darkMode}
            />
            <NavItem
              text="Global Props"
              active={resolvedTab === "global"}
              onClick={() => setActiveTab("global")}
              cursor="pointer"
              dark={darkMode}
            />
            {showGlobalEventPropsTab && (
              <NavItem
                text="Global Event Props"
                active={resolvedTab === "globalEvent"}
                onClick={() => setActiveTab("globalEvent")}
                cursor="pointer"
                dark={darkMode}
              />
            )}
          </Nav>
        </Card.Body>
        <SectionSeparator dark={darkMode} />
        {resolvedTab === "kit" && (
          <KitProps kitPropsValues={kitProps} darkMode={darkMode} platform={platform} />
        )}
        {resolvedTab === "global" && (
          <GlobalProps darkMode={darkMode} platform={platform} />
        )}
        {resolvedTab === "globalEvent" && showGlobalEventPropsTab && (
          <GlobalEventProps darkMode={darkMode} platform={platform} />
        )}
      </Card>
    </Flex>
  );
};
