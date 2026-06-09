import { useLoaderData, useParams } from "react-router-dom";
import { Body, Card, Detail, Flex, FlexItem, Icon, Nav, NavItem, SectionSeparator, Title } from "playbook-ui";
import { useState, useMemo } from "react";
import { useDarkMode } from "../../contexts/DarkModeContext";

import { MarkdownContent } from "../../components/MarkdownContent";
import { usePlatform } from "../../contexts/PlatformContext";
import { linkFormat } from "../../../../../utilities/website_sidebar_helper";
import { DocsTab } from "./Tabs/DocsTab";
import { PropsTab } from "./Tabs/PropsTab";
// import { BuildingBlocksTab } from "./Tabs/BuildingBlocksTab";
// import { ReferencesTab } from "./Tabs/ReferencesTab";
import { PlaygroundTab } from "./Tabs/PlaygroundTab";

const KitShow = () => {
  const { name } = useParams();
  const { platform } = usePlatform();
  const loaderData = useLoaderData() as any;
  const {
    examples,
    kit_description,
    kit_sections,
    available_props,
    kits_with_status,
    kit_schema,
    global_props_schema,
    playground_config,
  } = loaderData;
  const { darkMode, setDarkMode } = useDarkMode();
  const currentKit = loaderData.kit || name || "";

  // Find the kit entry (by name or parent) and extract platform status.
  const kitMeta = useMemo(() => {
    if (!kits_with_status || !currentKit) return null;
    for (const categoryObj of kits_with_status) {
      const components: any[] = Object.values(categoryObj)[0] as any[];
      const match = components?.find(
        (c: any) => c.name === currentKit || c.parent === currentKit
      );
      if (match) return match;
    }
    return null;
  }, [kits_with_status, currentKit]);

  const kitStatus = useMemo(() => {
    if (!kitMeta) return null;
    const { platforms_status, status } = kitMeta;
    return (platforms_status && platforms_status[platform]) || status || null;
  }, [kitMeta, platform]);

  const kitPlatformSpecificStatus = useMemo(() => {
    if (!kitMeta) return false;
    const { platforms_status, status } = kitMeta;
    return platforms_status && platforms_status[platform] && platforms_status[platform] !== status;
  }, [kitMeta, platform]);

  const platformLabel = platform === "rails" ? "Rails" : platform === "swift" ? "Swift" : "React";

  const statusWarningMessage = useMemo(() => {
    if (!kitStatus) return "";
    const componentName = kitPlatformSpecificStatus
      ? `${platformLabel} side of the ${linkFormat(currentKit)} kit`
      : `${linkFormat(currentKit)} kit`;
    if (kitStatus === "beta") {
      return kitPlatformSpecificStatus
        ? `The ${componentName} is functional and supported, but may still be undergoing changes. Use with caution.`
        : "Functional and supported, but may still be undergoing changes. Use with caution.";
    }
    return kitPlatformSpecificStatus
      ? `Please avoid using the ${componentName}. This will be removed in future versions.`
      : "Please avoid using. This component is deprecated and will be removed in future versions.";
  }, [kitStatus, kitPlatformSpecificStatus, platformLabel, currentKit]);

  // Prepare example props for advanced_table examples
  const exampleProps = useMemo(() => {
    const isAdvancedTable = currentKit === "advanced_table";
    if (!isAdvancedTable) return {};

    return {
      // Provide datasets to examples under expected variable names
      MOCK_DATA: loaderData.table_data || [],
      MOCK_DATA_WITH_ID: loaderData.table_data_with_id || [],
      MOCK_DATA_NO_SUBROWS: loaderData.table_data_no_subrows || [],
      PAGINATION_MOCK_DATA: loaderData.table_data_pagination || [],
      INFINITE_SCROLL_MOCK_DATA: loaderData.table_data_infinite_scroll || [],
      MOCK_DATA_INLINE_LOADING: loaderData.table_data_inline_loading || [],
      MOCK_DATA_INLINE_LOADING_EMPTY_CHILDREN: loaderData.table_data_inline_loading_empty_children || [],
    };
  }, [loaderData]);

  // TODO: Remove this allowlist once playground is ready for all kits
  const PLAYGROUND_ENABLED_KITS = [
    "advanced_table",
    "avatar",
    "background",
    "badge",
    "body",
    "bread_crumbs",
    "button",
    "button_toolbar",
    "caption",
    "card",
    "checkbox",
    "circle_icon_button",
    "collapsible",
    "contact",
    "copy_button",
    "currency",
    "dashboard_value",
    "date",
    "date_picker",
    "date_range_inline",
    "date_range_stacked",
    "date_stacked",
    "date_time",
    "date_time_stacked",
    "date_year_stacked",
    "detail",
    "dialog",
    "distribution_bar",
    "draggable",
    "dropdown",
    "empty_state",
    "file_upload",
    "filter",
    "fixed_confirmation_toast",
    "flex",
    "link",
    "title",
    "title_detail",
    "title_count",
  ];

  const [activeTab, setActiveTab] = useState<string>("docs");
  const showPlayground = platform !== "rails" && PLAYGROUND_ENABLED_KITS.includes(currentKit);
  const displayTab =
    activeTab === "playground" && !showPlayground ? "docs" : activeTab;

  const handleTabChange = (tab: string) => {
    if (tab === "playground") {
      setDarkMode(false);
    }

    setActiveTab(tab);
  };

  const showStatusBadge = kitStatus === "beta" || kitStatus === "deprecated";

  return (
    <>
      <div className={`pb--kit-show ${currentKit}-kit`}>
        <Flex
          align="stretch"
          minWidth={0}
          orientation="column"
          width="100%"
          paddingTop="lg"
        >
          {/* Title row with inline status badge */}
          <Flex orientation="row" alignItems="center" marginBottom={kit_description ? undefined : "md"}>
            <Title
              text={`${linkFormat(name)}`}
              size={1}
              dark={darkMode}
            />
            {showStatusBadge && (
              <Card
                background={kitStatus === "beta" ? "product_9_background" : "product_5_highlight"}
                marginX="xs"
                padding="xxs"
                borderNone
              >
                <Detail
                  bold
                  color="default"
                  dark
                  paddingX="xxs"
                  text={kitStatus === "beta" ? "Beta" : "Deprecated"}
                />
              </Card>
            )}
          </Flex>

          {kit_description && kit_description !== "" && (
            <Body marginTop="sm" marginBottom="md" dark={darkMode}>
              <MarkdownContent>{kit_description}</MarkdownContent>
            </Body>
          )}

          {/* Status warning card */}
          {showStatusBadge && (
            <Card
              background={kitStatus === "beta" ? "warning_subtle" : "error_subtle"}
              highlight={{ position: "side", color: kitStatus === "beta" ? "warning" : "product_5_highlight", shadow: "deep" }}
              marginBottom="md"
              padding="sm"
            >
              <Flex align="center">
                <FlexItem paddingRight="xs">
                  <Icon
                    icon={kitStatus === "beta" ? "info-circle" : "warning"}
                    fixedWidth
                    color={kitStatus === "beta" ? "warning" : "product_5_highlight"}
                  />
                </FlexItem>
                <FlexItem>
                  <Title
                    text={kitStatus === "beta" ? "Beta" : "Deprecated"}
                    tag="h4"
                    size={4}
                    paddingBottom="xxs"
                    dark={darkMode}
                  />
                  <Body text={statusWarningMessage} dark={darkMode} />
                </FlexItem>
              </Flex>
            </Card>
          )}

          {/* Navigation Tabs */}
          <Nav orientation="horizontal" dark={darkMode} marginBottom="none">
            <NavItem
              text="Docs"
              active={displayTab === "docs"}
              onClick={() => handleTabChange("docs")}
              dark={darkMode}
            />
            <NavItem
              text="Props"
              active={displayTab === "props"}
              onClick={() => handleTabChange("props")}
              dark={darkMode}
            />
            {/* TODO: Add playground back in when we have final designs */}
            {showPlayground && (
              <NavItem
                text="Playground"
                active={displayTab === "playground"}
                onClick={() => handleTabChange("playground")}
                dark={darkMode}
              />
            )}

            {/* Building Blocks and References tabs, commented out until building blocks and references are implemented */}
            {/* <NavItem
            text="Building Blocks"
            active={activeTab === "building-blocks"}
            onClick={() => setActiveTab("building-blocks")}
          />
          <NavItem
            text="References"
            active={activeTab === "references"}
            onClick={() => setActiveTab("references")}
          /> */}
          </Nav>
        </Flex>
      </div>
      <SectionSeparator marginTop="none" marginBottom="lg" dark={darkMode} />

      <div className="kit-show-wrapper">
        <Flex align="stretch" minWidth={0} orientation="column" marginBottom="lg" width="100%">
          {/* Playground Tab Content (React-only for now; hidden on Rails) */}
          {/* TODO: Add playground back in when we have final designs */}
          {showPlayground && displayTab === "playground" && (
            <PlaygroundTab
              kitSchema={kit_schema}
              globalPropsSchema={global_props_schema}
              kitName={currentKit}
              defaultExample={examples?.[0]}
              playgroundConfig={playground_config}
            />
          )}

          {/* Docs Tab Content */}
          {displayTab === "docs" && (
            <DocsTab
              examples={examples}
              exampleProps={exampleProps}
              name={name}
              sections={kit_sections}
            />
          )}

          {/* Props Tab Content */}
          {displayTab === "props" && <PropsTab availableProps={available_props} platform={platform} />}
        </Flex>
      </div>
    </>
  );
};

export default KitShow;
