import { Image, Flex, Card, Body } from "playbook-ui";

import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import HeaderWithIcon from "../../Templates/Subcomponents/HeaderWithIcon";
import ValueCardWithTooltip from "../../Templates/Subcomponents/ValueCardWithTooltip";
import * as DisplayImages from './DisplayImages'

type PositionKey = keyof typeof DisplayImages;

const Position = () => {
  const VisualGuideExample = ({ position, positionSvg }: { position: any, positionSvg: PositionKey }) => {
    return (
      <>
        <Flex orientation="column" alignItems="center" gap="xs">
          <Card
            className="visual_guide_card_position"
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding="xxs"
          >
            <img
              alt={`Display example of ${position}`}
              src={DisplayImages[positionSvg]}
            />
          </Card>
          <Body text={position} />
        </Flex>
      </>
    )
  }

  const PositionCard = () => {
      return (
        <Flex gap="xs">
          <VisualGuideExample position="Static" positionSvg="staticSvg" />
          <VisualGuideExample position="Relative" positionSvg="relative" />
          <VisualGuideExample position="Absolute" positionSvg="absolute" />
          <VisualGuideExample position="Fixed" positionSvg="fixed" />
          <VisualGuideExample position="Sticky" positionSvg="sticky" />
        </Flex>
      );
  };

  const PositionValues = [
    "relative",
    "absolute",
    "fixed",
    "sticky",
    "static",
  ];

  const SpacingValues = [
    { name: "0"},
    { name: "xxs", value: "4px" },
    { name: "xs", value: "8px" },
    { name: "sm", value: "16px" },
    { name: "md", value: "24px" },
    { name: "lg", value: "32px" },
    { name: "xl", value: "40px" },
  ];

  const PositionValuesCards = () => {
    return (
      <Flex gap="xs" wrap>
        {PositionValues.map((value) => (
          <ExampleCodeCard text={value} copyIcon={false} />
        ))}
      </Flex>
    );
  };

  const SpacingValuesCards = () => {
    return (
      <Flex gap="xs" wrap>
        {SpacingValues.map((spacing) => (
          <ValueCardWithTooltip
            key={spacing.name}
            text={spacing.name}
            tooltipText={spacing.value}
          />
        ))}
      </Flex>
    );
  };

  return (
    <ShowPage
      title="Position"
      description={
        <>
          The Position prop controls how an element is placed on a page and
          how it interacts with other elements within the viewport or layout.
          For more information on Position prop controls, refer to the{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/position"
            target="_blank"
          >
            MDN document found here.
          </a>
        </>
      }
      VisualGuideCard={PositionCard()}
    >
      <PropsExamplesTable
        headers={[
          "Prop",
          "Type",
          <HeaderWithIcon />,
          "Rails Example",
          "React Example",
        ]}
        rows={[
          [
            "Position",
            <ExampleCodeCard text="union" copyIcon={false} />,
            <PositionValuesCards />,
            <ExampleCodeCard id="position-rails" text="position: 'absolute'" />,
            <ExampleCodeCard id="position-react" text="position= 'absolute" />,
          ],
          [
            "Top",
            <ExampleCodeCard text="union" copyIcon={false} />,
            <SpacingValuesCards />,
            <ExampleCodeCard
              id="top-rails"
              text="top: 'sm'"
            />,
            <ExampleCodeCard
              id="top-react"
              text="top= 'sm'"
            />,
          ],
          [
            "Bottom",
            <ExampleCodeCard text="union" copyIcon={false} />,
            <SpacingValuesCards />,
            <ExampleCodeCard
              id="bottom-rails"
              text="bottom: 'sm'"
            />,
            <ExampleCodeCard
              id="bottom-react"
              text="bottom= 'sm'"
            />,
          ],
          [
            "Left",
            <ExampleCodeCard text="union" copyIcon={false} />,
            <SpacingValuesCards />,
            <ExampleCodeCard
              id="left-rails"
              text="left: 'sm'"
            />,
            <ExampleCodeCard
              id="left-react"
              text="left= 'sm'"
            />,
          ],
          [
            "Right",
            <ExampleCodeCard text="union" copyIcon={false} />,
            <SpacingValuesCards />,
            <ExampleCodeCard
              id="right-rails"
              text="right: 'sm'"
            />,
            <ExampleCodeCard
              id="right-react"
              text="right= 'sm'"
            />,
          ],
        ]}
      />
    </ShowPage>
  );
};

export default Position;
