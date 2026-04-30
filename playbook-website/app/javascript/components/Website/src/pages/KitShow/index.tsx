import { useLoaderData, useParams } from "react-router-dom";
import { Body, Title, Nav, NavItem, Flex, SectionSeparator } from "playbook-ui";
import { useState, useMemo } from "react";
import { useDarkMode } from "../../contexts/DarkModeContext";

import { PageContainer } from "../../components/PageContainer";
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
    kit_schema,
    global_props_schema,
    playground_config,
  } = loaderData;
  const { darkMode, setDarkMode } = useDarkMode();
  // Prepare example props for advanced_table examples
  const exampleProps = useMemo(() => {
    const isAdvancedTable = loaderData?.kit === "advanced_table";
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

  const [activeTab, setActiveTab] = useState<string>("docs");
  const showPlayground = platform !== "rails";
  const displayTab =
    activeTab === "playground" && !showPlayground ? "docs" : activeTab;

  const handleTabChange = (tab: string) => {
    if (tab === "playground") {
      setDarkMode(false);
    }

    setActiveTab(tab);
  };

  return (
    <>
      <PageContainer>
        <Title
          text={`${linkFormat(name)}`}
          size={1}
          marginBottom={kit_description ? undefined : "md"}
          paddingX="xl"
          dark={darkMode}
        />
        {kit_description && kit_description !== "" && (
          <Flex paddingX="xl">
            <Flex flex={1} minWidth={0}>
              <Body marginTop="sm" marginBottom="md" dark={darkMode}>
                <MarkdownContent>{kit_description}</MarkdownContent>
              </Body>
            </Flex>
            <Flex
              display={{ xs: "none", sm: "none", md: "none", lg: "none", xl: "flex" }}
              shrink
              htmlOptions={{ style: { width: "228px"} }}
            />
          </Flex>
        )}

        {/* Navigation Tabs */}
        <Nav orientation="horizontal" paddingX="xl" dark={darkMode}>
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
        <SectionSeparator marginBottom="lg" dark={darkMode} />

        {/* Playground Tab Content (React-only for now; hidden on Rails) */}
        {showPlayground && displayTab === "playground" && (
          <PlaygroundTab
            kitSchema={kit_schema}
            globalPropsSchema={global_props_schema}
            kitName={loaderData.kit || name || ""}
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

        {/* Building Blocks Tab Content, commented out until building blocks are implemented */}
        {/* {activeTab === "building-blocks" && <BuildingBlocksTab />} */}

        {/* References Tab Content, commented out until references are implemented */}
        {/* {activeTab === "references" && <ReferencesTab />} */}
      </PageContainer>
    </>
  );
};

export default KitShow;
