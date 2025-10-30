import React from "react";
import { Body, Card, Flex  } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const Truncate = () => {

  const VisualGuideExample = ({ truncate }: { truncate: string }) => {
    const exampleText = "The quick brown fox jumps over 17 lazy dogs. Jumpy wizards vex bold knights with perplexing glyphs.";
    
    return (
      <Flex orientation="column" alignItems="center" gap="xs">
        <Card
            background="light" 
            borderRadius="none"
            className="visual_guide_card_truncate"
            overflow="hidden"
            padding="xs"
        >
          <Body text={exampleText}
              truncate={truncate} 
          />
        </Card>
        <Body fontSize="xs" text={truncate} />
      </Flex>
    )
  }

  const TruncateCard = () => {
      return (
        <Flex gap="sm" wrap>
          <VisualGuideExample truncate="None" />
          <VisualGuideExample truncate="1" />
          <VisualGuideExample truncate="2" />
          <VisualGuideExample truncate="3" />
          <VisualGuideExample truncate="4" />
          <VisualGuideExample truncate="5" />
        </Flex>
      );
  };

  const values = [
    "none",
    "1",
    "2",
    "3",
    "4",
    "5",
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
        title="Truncate"
        description="The Truncate prop shortens overflowing text with an ellipsis, preventing layout breakage when space is limited. It's commonly used for labels, buttons, and titles where full text may not fit."
        VisualGuideCard={TruncateCard()}
      >
        <PropsExamplesTable
          headers={["Truncate", "Type", "Values", "Rails Example", "React Example"]}
          rows={[
            [
              "Truncate",
              <ExampleCodeCard text="union" copyIcon={false} />,
              <ValuesCards />,
              <ExampleCodeCard
                id="truncate-rails"
                text='truncate: "2"'
              />,
              <ExampleCodeCard
                id="truncate-react"
                text='truncate="2"'
              />,
            ],
          ]}
        />
      </ShowPage>
    </>
  )
}

export default Truncate;
