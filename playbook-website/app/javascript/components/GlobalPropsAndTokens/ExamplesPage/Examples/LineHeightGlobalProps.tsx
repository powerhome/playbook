import React from "react";
import { Flex, Card, Body } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const LineHeightGlobalProps = () => {

    const VisualGuideExample = ({ text, lineHeight }: any) => {
        return (
      <>
        <Flex orientation="column" alignItems="center" gap="xs">
            <Card
              className="visual_guide_card_line_height"
              display="flex"
              alignItems="center"
              justifyContent="center"   
              padding="xs" 
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


    const values = [
      "tightest",
      "tighter",
      "tight",
      "normal",
      "loose",
      "looser",
      "loosest",
    ];
    

  return (
    <>
      <ShowPage
        title="Line Height"
        description="Line-Height tokens set the vertical spacing between lines of text. These values help maintain visual rhythm and improve text readability across different font sizes and components."
        VisualGuideCard={LineHeightCard()}
      >
        <PropsExamplesTable
          headers={[
            "Display",
            "Type",
            "Values",
            "Rails Example",
            "React Example",
          ]}
            rows={
              values.map((value) => [
                value,
                <ExampleCodeCard text="string" copyIcon={false} />,
                <ExampleCodeCard text={value} copyIcon={false} />,
                <ExampleCodeCard text={`display:"${value}"`} />,
                <ExampleCodeCard text={`display="${value}"`} />
              ])
            }
        />
      </ShowPage>
    </>
  )
}

export default LineHeightGlobalProps;
