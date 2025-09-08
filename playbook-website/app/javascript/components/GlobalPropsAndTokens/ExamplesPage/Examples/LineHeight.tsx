import React from "react";
import { Flex, Card, Body } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const LineHeight = () => {

    const VisualGuideExample = ({ text, lineHeight }: any) => {
        return (
      <>
        <Flex orientation="column" alignItems="center" gap="xs">
            <Card
              className="visual_guide_card_line_height"
              display="flex"
              alignItems="center"
              justifyContent="center"    
            >
              <Body text={text} lineHeight={lineHeight} />
            </Card>
            <Body text={lineHeight}  />
        </Flex>
      </>
      )
     }

    const LineHeightCard = () => {
        return (
          <Flex gap="sm" wrap>
            <VisualGuideExample text="The quick brown fox jumps over 17 lazy dogs." lineHeight="tightest" />
            <VisualGuideExample text="The quick brown fox jumps over 17 lazy dogs." lineHeight="tighter" />
            <VisualGuideExample text="The quick brown fox jumps over 17 lazy dogs." lineHeight="tight" />
            <VisualGuideExample text="The quick brown fox jumps over 17 lazy dogs." lineHeight="normal" />
            <VisualGuideExample text="The quick brown fox jumps over 17 lazy dogs." lineHeight="loose" />
            <VisualGuideExample text="The quick brown fox jumps over 17 lazy dogs." lineHeight="looser" />
            <VisualGuideExample text="The quick brown fox jumps over 17 lazy dogs." lineHeight="loosest" />
          </Flex>
        );
    };
  return (
    <>
      <ShowPage
        pageType="tokens"
        title="Line Height"
        description="Line-Height tokens set the vertical spacing between lines of text. These values help maintain visual rhythm and improve text readability across different font sizes and components."
        VisualGuideCard={LineHeightCard()}
      >
        <PropsExamplesTable
          headers={["Token", "Value", "SASS Example"]}
          rows={[
            [
              "$lh_tightest",
              "1",
              <ExampleCodeCard
                id="lh-tightest"
                text="line-height: $lh_tightest;"
              />
            ],
            [
              "$lh_tighter",
              "1.2",
              <ExampleCodeCard
                id="lh-tighter"
                text="line-height: $lh_tighter;"
              />
            ],
            [
              "$lh_tight",
              "1.4",
              <ExampleCodeCard
                id="lh-tight"
                text="line-height: $lh_tight;"
              />
            ],
            [
              "$lh_normal",
              "1.5",
              <ExampleCodeCard
                id="lh-normal"
                text="line-height: $lh_normal;"
              />
            ],
            [
              "$lh_loose",
              "1.6",
              <ExampleCodeCard
                id="lh-loose"
                text="line-height: $lh_loose;"
              />
            ],
            [
              "$lh_looser",
              "1.8",
              <ExampleCodeCard
                id="lh-looser"
                text="line-height: $lh_looser;"
              />
            ],
            [
              "$lh_loosest",
              "2",
              <ExampleCodeCard
                id="lh-loosest"
                text="line-height: $lh_loosest;"
              />
            ],
          ]}
        >

        </PropsExamplesTable>
      </ShowPage>
    </>
  )
}

export default LineHeight;
