import React from "react";
import { Body, Caption, Card, Flex } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const OverflowGlobalProps = () => {

  const VisualGuideExample = ({ overflow }: { overflow: string }) => {
    const exampleText = "The quick brown fox jumps over 17 lazy dogs. Jumpy wizards vex bold knights with perplexing glyphs and arcane spells. Sphinxes drive quizzical zebras through foggy backyards near exotic jungles.";
    
    const formatOverflow = (value: string) => {
      return value.replace("_", " ").split(" ").map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(" ");
    };

    return (
      <Flex orientation="column" alignItems="center" gap="xs">
        <Card
            borderRadius="none"
            className="visual_guide_card_overflow"
            padding="none"
        >
          <Card 
              background="light" 
              borderRadius="none"
              className="visual_guide_card_overflow_content"
              overflow={overflow}
              padding="xs"
          >
            <Body text={exampleText} />
          </Card>
        </Card>
        <Caption size="xs" 
            text={formatOverflow(overflow)}
        />
      </Flex>
    )
  }

  const OverflowCard = () => {
      return (
        <Flex gap="sm" wrap>
          <VisualGuideExample overflow="visible" />
          <VisualGuideExample overflow="hidden" />
          <VisualGuideExample overflow="scroll" />
          <VisualGuideExample overflow="auto" />
        </Flex>
      );
  };

  const values = [
    "visible",
    "hidden",
    "scroll",
    "auto",
  ];

  const ValuesCards = () => {
    return (
      <Flex gap="xs" wrap>
        {values.map((value) => (
          <ExampleCodeCard key={value} text={value} copyIcon={false} />
        ))}
      </Flex>
    );
  };
    
  return (
    <>
      <ShowPage
        title="Overflow"
        description={
          <>
            The Overflow prop controls how content is handled when it exceeds the boundaries of its container. It maps to the CSS overflow property and supports values like visible, hidden, scroll, or auto. For more information on Overflow prop controls, refer{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/overflow"
              target="_blank"
            >
              MDN document found here.
            </a>
          </>
        }
        VisualGuideCard={OverflowCard()}
      >
        <PropsExamplesTable
          headers={["Overflow", "Type", "Values", "Rails Example", "React Example"]}
          rows={[
            [
              "Overflow",
              <ExampleCodeCard text="union" copyIcon={false} />,
              <ValuesCards />,
              <ExampleCodeCard
                id="overflow-rails"
                text='overflow: "hidden"'
              />,
              <ExampleCodeCard
                id="overflow-react"
                text='overflow="hidden"'
              />,
            ],
            [
              "Overflow X",
              <ExampleCodeCard text="union" copyIcon={false} />,
              <ValuesCards />,
              <ExampleCodeCard
                id="overflow-x-rails"
                text='overflow_x: "hidden"'
              />,
              <ExampleCodeCard
                id="overflow-x-react"
                text='overflowX="hidden"'
              />,
            ],
            [
              "Overflow Y",
              <ExampleCodeCard text="union" copyIcon={false} />,
              <ValuesCards />,
              <ExampleCodeCard
                id="overflow-y-rails"
                text='overflow_y: "hidden"'
              />,
              <ExampleCodeCard
                id="overflow-y-react"
                text='overflowY="hidden"'
              />,
            ],
          ]}
        />
      </ShowPage>
    </>
  )
}

export default OverflowGlobalProps;
