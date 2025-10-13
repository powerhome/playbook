import React from "react";
import { Flex, Card, Body, Caption } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import * as DisplayImages from './DisplayImages'
const DisplayGlobalProps = () => {

  type DisplayKey = keyof typeof DisplayImages;

  const VisualGuideExample = ({ display }: { display: DisplayKey }) => {
    return (
      <>
        <Flex orientation="column" alignItems="center" gap="xs">
          <Card
            className="visual_guide_card_display"
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding="xs"
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

  const values = [
    "block",
    "inline",
    "inlineBlock",
    "none",
    "flex",
    "inlineFlex",
    "grid",
  ];

const sizes = {
    xs: { label: "xs", minWidth: "", maxWidth: "575px", descrption: "Extra small screens" },
    sm: { label: "sm", minWidth: "576px", maxWidth: "767px", descrption: "Small screens" },
    md: { label: "md", minWidth: "768px", maxWidth: "991px", descrption: "Medium screens" },
    lg: { label: "lg", minWidth: "992px", maxWidth: "1199px", descrption: "Large screens" },
    xl: { label: "xl", minWidth: "1200px", maxWidth: "", descrption: "Extra large screens" },
    default: { label: "default" , minWidth: "", maxWidth: "", descrption: "Default is used as the final fallback and is not tied to a specific screen size." },
};

  return (
    <>
    <ShowPage
      title="Display"
      description="Display tokens define how an element is rendered within the layout. Values align with standard CSS display properties and offer consistent layout behavior across components."
      VisualGuideCard={DisplayCard()}
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

<Card>
    <Caption text="Responsiveness"/>
    <Body text="This global prop supports responsive values using a breakpoint-based syntax that allows you to define different property values at different screen sizes. This makes it easy to create adaptive layouts without writing custom media queries."/>
    <Body marginY="md"text="Responsive values are defined using an object with screen size keys and corresponding property values. You can optionally include a default value that acts as a fallback when no breakpoint-specific value is matched. It looks like this:"/>
    <Flex align="baseline" gap="xs" marginBottom="sm">
        <Caption text="Rails"/>
        <Body>
             <ExampleCodeCard id="display-rails" text={`display:{ xs: "flex", sm: "flex", md: "flex", lg: "block", xl: "block", default: "block" }`} />
        </Body>
    </Flex>
    <Flex align="baseline" gap="xs">
        <Caption text="React"/>
        <Body  >
            <ExampleCodeCard id="display-react" text={`display={{ xs: "flex", sm: "flex", md: "flex", lg: "block", xl: "block", default: “block” }}`} />
        </Body>
    </Flex>
    <Body marginY="md"text="The supported screen size keys are:"/>
      <PropsExamplesTable
        firstColumnBold={false}
        headers={[
        "Breakpoints",
        "Value",
        "Description",
        ]}
        rows={
          Object.values(sizes).map((size: { label: string; minWidth?: string; maxWidth?: string; descrption: string }) => [
            size.label,
            [
            size.minWidth ? `min-width: ${size.minWidth}` : null,
            size.maxWidth ? `max-width: ${size.maxWidth}` : null,
            ].filter(Boolean).join(", "),
            size.descrption,
          ])
        }
      />
      </Card>
    </ShowPage>
    </>
  );
};

export default DisplayGlobalProps;
