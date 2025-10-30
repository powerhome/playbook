import { Flex, Card, Caption } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import HeaderWithIcon from "../../Templates/Subcomponents/HeaderWithIcon";
import ValueCardWithTooltip from "../../Templates/Subcomponents/ValueCardWithTooltip";

const BorderRadiusGlobalProps = () => {
  const borderRadiusOptions = [
    { value: "none", label: "None" },
    { value: "xs", label: "Extra Small" },
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
    { value: "xl", label: "Extra Large" },
    { value: "rounded", label: "Rounded" },
  ];

  const DisplayCard = () => {
    return (
      <Flex gap="sm" width="100%" wrap>
        {borderRadiusOptions.map((option) => (
          <Flex key={option.value} flexDirection="column" align="center" gap="xs">
            <Card 
              background="light"
              borderRadius={option.value as any}
              className="visual_guide_card_border_radius"
              padding="xs" 
              selected
            />
            <Caption size="xs">{option.label}</Caption>
          </Flex>
        ))}
      </Flex>
    );
  };

const values = [
  { name: "none", value: "0px" },
  { name: "xs", value: "4px" },
  { name: "sm", value: "4px" },
  { name: "md", value: "6px" },
  { name: "lg", value: "8px" },
  { name: "xl", value: "16px" },
  { name: "rounded", value: "1000px" },
];

  const TypesCards = () => {
    return (
      <Flex gap="xs" wrap>
        {values.map((value) => (
          <ValueCardWithTooltip
            key={value.name}
            text={value.name}
            tooltipText={value.value}
          />
        ))}
      </Flex>
    );
  }

  return (
    <>
    <ShowPage
      title="Border Radius"
      description={
        <>
        The Border Radius prop controls the curvature of an element’s corners, allowing you to create sharp, rounded, or fully circular shapes. It helps define the visual softness or sharpness of UI components like buttons, cards, and containers. Border Radius can be adjusted using preset token values to maintain consistency across the design system. For more information on Border Radius prop controls, refer to the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius" target="_blank">MDN document found here</a>.
        </>
      }
      VisualGuideCard={DisplayCard()}
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
            "Border Radius",
            <ExampleCodeCard text="union" copyIcon={false} />,
            <TypesCards />,
            <ExampleCodeCard
              id="border-radius-rails"
              text="border_radius: 'sm'"
            />,
            <ExampleCodeCard
              id="border-radius-react"
              text="borderRadius='sm'"
            />,
          ]
        ]}
      />


    </ShowPage>
    </>
  );
};

export default BorderRadiusGlobalProps;
