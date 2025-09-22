import React from "react";
import { Flex, Card, Body } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import * as DisplayImages from './DisplayImages'

const Display = () => {

  console.log(DisplayImages)

  type DisplayKey = keyof typeof DisplayImages;

  const VisualGuideExample = ({ display }: { display: DisplayKey }) => {
    return (
      <>
        <Flex orientation="column" alignItems="center" gap="xs">
          <Card
            className="visual_guide_card_line_height"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <img
              alt={`Display example of ${display}`}
              src={DisplayImages[display]}
            />
          </Card>
          <Body text={display} />
        </Flex>
      </>
    )
  }

  const DisplayCard = () => {
    return (
      <Flex gap="sm" wrap>
        <VisualGuideExample display="block" />
        <VisualGuideExample display="inline" />
        <VisualGuideExample display="inlineBlock" />
        <VisualGuideExample display="none" />
        <VisualGuideExample display="flex" />
        <VisualGuideExample display="inlineFlex" />
        <VisualGuideExample display="grid" />
      </Flex>
    );
  };

  return (
    <>
      <ShowPage
        pageType="tokens"
        title="Display"
        description="Display tokens define how an element is rendered within the layout. Values align with standard CSS display properties and offer consistent layout behavior across components."
        VisualGuideCard={DisplayCard()}
      >
        <PropsExamplesTable
          headers={["Tokens", "Value", "SASS Example"]}
          rows={[
            [
              "$display_inline",
              "inline",
              <ExampleCodeCard
                id="display-inline"
                text="display: $display_inline;"
              />,
            ],
            [
              "$display_block",
              "block",
              <ExampleCodeCard
                id="display-block"
                text="display: $display_block;"
              />,
            ],
            [
              "$display_inline_block",
              "inline-block",
              <ExampleCodeCard
                id="display-inline-block"
                text="display: $display_inline_block;"
              />,
            ],
            [
              "$display_flex",
              "flex",
              <ExampleCodeCard
                id="display-flex"
                text="display: $display_flex;"
              />,
            ],
            [
              "$display_none",
              "none",
              <ExampleCodeCard
                id="display-none"
                text="display: $display_none;"
              />,
            ],
            [
              "$display_inline_flex",
              "inline-flex",
              <ExampleCodeCard
                id="display-inline-flex"
                text="display: $display_inline_flex;"
              />,
            ],
            [
              "$display_grid",
              "grid",
              <ExampleCodeCard
                id="display-grid"
                text="display: $display_grid;"
              />,
            ],
          ]}
        />
      </ShowPage>
    </>
  );
};

export default Display;
