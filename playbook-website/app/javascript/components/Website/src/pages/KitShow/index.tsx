import { useLoaderData, useParams } from "react-router-dom";
import { Body, Title, Nav, NavItem, Flex, SectionSeparator } from "playbook-ui";
import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";

import { PageContainer } from "../../components/PageContainer";
import { linkFormat } from "../../../../../utilities/website_sidebar_helper";
import { DocsTab } from "./Tabs/DocsTab";
import { PropsTab } from "./Tabs/PropsTab";
import { BuildingBlocksTab } from "./Tabs/BuildingBlocksTab";
import { ReferencesTab } from "./Tabs/ReferencesTab";

const KitShow = () => {
  const { name } = useParams();
  const loaderData = useLoaderData() as any;
  const { examples, kit_description, kit_sections, available_props } = loaderData;

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
    };
  }, [loaderData]);

  const [activeTab, setActiveTab] = useState<string>("docs");

  return (
    <>
      <PageContainer>
        <Title
          text={`${linkFormat(name)}`}
          size={1}
          marginBottom={kit_description ? undefined : "md"}
          paddingX="xl"
        />
        {kit_description && kit_description !== "" && (
          <Flex paddingX="xl">
            <Flex flex={1} minWidth={0}>
              <Body marginTop="sm" marginBottom="md">
                <ReactMarkdown>{kit_description}</ReactMarkdown>
              </Body>
            </Flex>
            <Flex
              display={{ xs: "none", sm: "none", md: "none", lg: "none", xl: "flex" }}
              shrink
              htmlOptions={{ style: { width: "206px"} }}
            />
          </Flex>
        )}

        {/* Navigation Tabs */}
        <Nav orientation="horizontal" paddingX="xl">
          <NavItem
            text="Docs"
            active={activeTab === "docs"}
            onClick={() => setActiveTab("docs")}
          />
          <NavItem
            text="Props"
            active={activeTab === "props"}
            onClick={() => setActiveTab("props")}
          />
          <NavItem
            text="Building Blocks"
            active={activeTab === "building-blocks"}
            onClick={() => setActiveTab("building-blocks")}
          />
          <NavItem
            text="References"
            active={activeTab === "references"}
            onClick={() => setActiveTab("references")}
          />
        </Nav>
        <SectionSeparator marginBottom="lg" />
        {/* Docs Tab Content */}
        {activeTab === "docs" && (
          <DocsTab
            examples={examples}
            exampleProps={exampleProps}
            name={name}
            sections={kit_sections}
          />
        )}

        {/* Props Tab Content */}
        {activeTab === "props" && <PropsTab availableProps={available_props} />}

        {/* Building Blocks Tab Content */}
        {activeTab === "building-blocks" && <BuildingBlocksTab />}

        {/* References Tab Content */}
        {activeTab === "references" && <ReferencesTab />}
      </PageContainer>
    </>
  );
};

export default KitShow;
