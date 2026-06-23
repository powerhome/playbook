import type { ElementType } from "react";
import { Body, Card, Caption, Flex, Title } from "playbook-ui";

import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import HeaderWithIcon from "../../Templates/Subcomponents/HeaderWithIcon";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import ValueCardWithTooltip from "../../Templates/Subcomponents/ValueCardWithTooltip";

type BorderValue =
  | "none"
  | "default"
  | "active"
  | "default_thick"
  | "default_thicker"
  | "active_thick"
  | "active_thicker";

type BorderPropExample = {
  label: string;
  railsProp: string;
  reactProp: string;
};

const borderValues: { name: BorderValue; description: string }[] = [
  { name: "none", description: "no border" },
  { name: "default", description: "1px default" },
  { name: "active", description: "1px active" },
  { name: "default_thick", description: "2px default" },
  { name: "default_thicker", description: "4px default" },
  { name: "active_thick", description: "2px active" },
  { name: "active_thicker", description: "4px active" },
];

const borderProps: BorderPropExample[] = [
  { label: "Border", railsProp: "border", reactProp: "border" },
  { label: "Border Top", railsProp: "border_top", reactProp: "borderTop" },
  { label: "Border Bottom", railsProp: "border_bottom", reactProp: "borderBottom" },
  { label: "Border Left", railsProp: "border_left", reactProp: "borderLeft" },
  { label: "Border Right", railsProp: "border_right", reactProp: "borderRight" },
  { label: "Border X", railsProp: "border_x", reactProp: "borderX" },
  { label: "Border Y", railsProp: "border_y", reactProp: "borderY" },
];

const BorderCard = Card as ElementType;

const ValuesCards = () => (
  <Flex gap="xs" wrap>
    {borderValues.map(({ name, description }) => (
      <ValueCardWithTooltip
        key={name}
        text={name}
        tooltipText={description}
      />
    ))}
  </Flex>
);

const VariantExample = ({ value }: { value: BorderValue }) => (
  <Flex align="center" flexDirection="column" gap="xs">
    <BorderCard
      alignItems="center"
      background="white"
      border={value}
      borderRadius="md"
      display="flex"
      justifyContent="center"
      minHeight="96px"
      padding="sm"
      width="180px"
    >
      <Body text={value} />
    </BorderCard>
    <Caption size="xs" text={value} />
  </Flex>
);

const DirectionalExample = ({
  label,
  props,
}: {
  label: string;
  props: Record<string, BorderValue>;
}) => (
  <Flex align="center" flexDirection="column" gap="xs">
    <BorderCard
      background="white"
      borderNone
      borderRadius="none"
      minHeight="96px"
      padding="sm"
      {...props}
    >
      <Body text={label} />
    </BorderCard>
    <Caption size="xs" text={label} />
  </Flex>
);

const VisualGuideCard = () => (
  <Flex flexDirection="column" gap="lg" width="100%">
    <Flex flexDirection="column" gap="sm">
      <Title size={4} text="Border Values" />
      <Flex gap="sm" wrap>
        {borderValues.map(({ name }) => (
          <VariantExample key={name} value={name} />
        ))}
      </Flex>
    </Flex>
    <Flex flexDirection="column" gap="sm">
      <Title size={4} text="Directional Border Props" />
      <Flex gap="xl" wrap>
        <DirectionalExample label="Top" props={{ borderTop: "default" }} />
        <DirectionalExample label="Bottom" props={{ borderBottom: "default_thick" }} />
        <DirectionalExample label="Left" props={{ borderLeft: "default_thicker" }} />
        <DirectionalExample label="Right" props={{ borderRight: "active" }} />
        <DirectionalExample label="X Axis" props={{ borderX: "active_thick" }} />
        <DirectionalExample label="Y Axis" props={{ borderY: "active_thicker" }} />
      </Flex>
    </Flex>
  </Flex>
);

const BorderGlobalProps = () => {
  return (
    <>
      <ShowPage
        title="Border"
        description={
          <>
            The Border prop applies specific border styles to any kit.
            Use it to add or remove full borders, or apply borders to a specific
            side or axis.
            For more information on border controls, refer to the{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/border"
              target="_blank"
            >
              MDN document found here.
            </a>
          </>
        }
        VisualGuideCard={<VisualGuideCard />}
      >
        <PropsExamplesTable
          headers={[
            "Border Prop",
            "Type",
            <HeaderWithIcon />,
            "Rails Example",
            "React Example",
          ]}
          rows={borderProps.map(({ label, railsProp, reactProp }) => [
            label,
            <ExampleCodeCard copyIcon={false} text="union" />,
            <ValuesCards />,
            <ExampleCodeCard
              id={`${railsProp}-rails`}
              text={`${railsProp}: "active"`}
            />,
            <ExampleCodeCard
              id={`${reactProp}-react`}
              text={`${reactProp}="active"`}
            />,
          ])}
        />
      </ShowPage>
    </>
  );
};

export default BorderGlobalProps;
