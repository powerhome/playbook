import React from "react";
import { Flex, Card, Body, Caption } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import * as DisplayImages from './DisplayImages'
const DisplayGlobalProps = () => {

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
    default: { label: "default" , minWidth: "", maxWidth: "", descrption: "Default is used as the final fallback and is not tied to a specific screen szie." },
};

  return (
    <>
    <ShowPage
      pageType="global_props"
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
            "string",
            value,
            <ExampleCodeCard text={`display:"${value}"`} />,
            <ExampleCodeCard text={`display="${value}"`} />
          ])
        }
      />

<Card>
    <Caption text="Responsiveness"/>
    <Body text="This global support responsive values using a breakpoint-based syntax that allows you to define different property values at different screen sizes. This makes it easy to create adaptive layouts without writing custom media queries."/>
    <Body marginY="md"text="Responsive values are defined using an object with screen size keys and corresponding property values. You can optionally include a default value that acts as a fallback when no breakpoint-specific value is matched. It looks like this:"/>
    <Flex align="baseline" gap="xs">
        <Caption text="Rails"/>
        <Body>
             <ExampleCodeCard id="display-rails" text={`display:"${values.join(' ')}"`} />
        </Body>
    </Flex>
    <Flex align="baseline" gap="xs">
        <Caption text="React"/>
        <Body  >
            <ExampleCodeCard id="display-react" text={`display="${values.join(' ')}"`} />
        </Body>
    </Flex>
    <Body marginY="md"text="The supported screen size keys are:"/>
      <PropsExamplesTable
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
