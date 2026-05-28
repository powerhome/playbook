import { Caption, Card, Flex } from "playbook-ui";

import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ResponsivenessSection from "../../Templates/Subcomponents/ResponsivenessSection";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import HeaderWithIcon from "../../Templates/Subcomponents/HeaderWithIcon";
import ValueCardWithTooltip from "../../Templates/Subcomponents/ValueCardWithTooltip";
import { SpacingValues } from "../../Data/SpacingValues";
import * as PaddingImages from './PaddingImages';

const Padding = () => {

  type PaddingKey = keyof typeof PaddingImages;

  const formatText = (value: string) => {
    return value.replace(/[-_]/g, " ").split(" ").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
  };

  const VisualGuideExample = ({ padding }: { padding: PaddingKey }) => {
    return (
      <>
        <Flex orientation="column" alignItems="center" gap="sm">
          <Card
            className="visual_guide_card_padding"
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding="xs"
          >
            <img
              alt={`Padding example of ${padding}`}
              src={PaddingImages[padding]}
            />
          </Card>
          <Caption size="xs" text={formatText(padding)} />
        </Flex>
      </>
    )
  }

  const PaddingCard = () => {
    return (
      <Flex gap="sm" wrap>
        <VisualGuideExample padding="padding" />
        <VisualGuideExample padding="padding_left" />
        <VisualGuideExample padding="padding_right" />
        <VisualGuideExample padding="padding_top" />
        <VisualGuideExample padding="padding_bottom" />
        <VisualGuideExample padding="padding_x" />
        <VisualGuideExample padding="padding_y" />
      </Flex>
    );
  };

  const ValuesCards = () => {
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

  const ResponsiveExamples = () => {
    return (
      <>
        <Flex alignItems="center" gap="sm">
          <Caption text="Rails" />
          <ExampleCodeCard
            id="padding-responsive-rails"
            text='padding_bottom: { xs: "xxs", sm: "xs", md: "sm", lg: "md", xl: "lg", default: "xl" }'
          />
        </Flex>
        <Flex alignItems="center" gap="sm">
          <Caption text="React" />
          <ExampleCodeCard
            id="padding-responsive-react"
            text='paddingBottom={{ xs: "xxs", sm: "xs", md: "sm", lg: "md", xl: "lg", default: "xl" }}'
          />
        </Flex>
      </>
    );
  };
  return (
    <>
      <ShowPage
        title="Padding"
        description={
          <>
            The Padding prop adds visual spacing between the edge of a component
            and its content. Padding is the preferred way to control spacing and
            helps to define spacing around content for better readability, 
            accessibility and visual comfort.
            <br />
            <br />
            As a general note, unlike margin, padding makes spacing behavior more
            predictable and prevents more layout issues. It's a more reliable 
            means for adjusting layout or spacing of content within a component.
            For more information on Padding prop controls, refer to the{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/padding"
              target="_blank"
            >
              MDN document found here.
            </a>
          </>
        }
        VisualGuideCard={PaddingCard()}
      >
        <PropsExamplesTable
          headers={[
            "Padding",
            "Type",
            <HeaderWithIcon />,
            "Rails Example",
            "React Example",
          ]}
          rows={[
            [
              "Padding",
              <ExampleCodeCard text="union" copyIcon={false} />,
              <ValuesCards />,
              <ExampleCodeCard id="padding-rails" text='padding: "sm"' />,
              <ExampleCodeCard id="padding-react" text='padding="sm"' />,
            ],
            [
              "Padding Left",
              <ExampleCodeCard text="union" copyIcon={false} />,
              <ValuesCards />,
              <ExampleCodeCard
                id="padding-left-rails"
                text='padding_left: "sm"'
              />,
              <ExampleCodeCard
                id="padding-left-react"
                text='paddingLeft="sm"'
              />,
            ],
            [
              "Padding Right",
              <ExampleCodeCard text="union" copyIcon={false} />,
              <ValuesCards />,
              <ExampleCodeCard
                id="padding-right-rails"
                text='padding_right: "sm"'
              />,
              <ExampleCodeCard
                id="padding-right-react"
                text='paddingRight="sm"'
              />,
            ],
            [
              "Padding Top",
              <ExampleCodeCard text="union" copyIcon={false} />,
              <ValuesCards />,
              <ExampleCodeCard id="padding-top-rails" text='padding_top: "sm"' />,
              <ExampleCodeCard id="padding-top-react" text='paddingTop="sm"' />,
            ],
            [
              "Padding Bottom",
              <ExampleCodeCard text="union" copyIcon={false} />,
              <ValuesCards />,
              <ExampleCodeCard
                id="padding-bottom-rails"
                text='padding_bottom: "sm"'
              />,
              <ExampleCodeCard
                id="padding-bottom-react"
                text='paddingBottom="sm"'
              />,
            ],
            [
              "Padding X",
              <ExampleCodeCard text="union" copyIcon={false} />,
              <ValuesCards />,
              <ExampleCodeCard id="padding-x-rails" text='padding_x: "sm"' />,
              <ExampleCodeCard id="padding-x-react" text='paddingX="sm"' />,
            ],
            [
              "Padding Y",
              <ExampleCodeCard text="union" copyIcon={false} />,
              <ValuesCards />,
              <ExampleCodeCard id="padding-y-rails" text='padding_y: "sm"' />,
              <ExampleCodeCard id="padding-y-react" text='paddingY="sm"' />,
            ],
          ]}
        />
        <ResponsivenessSection
          exampleSection={<ResponsiveExamples />}
        >
          <PropsExamplesTable
            firstColumnBold={false}
            headers={[
              "Breakpoints",
              "Value",
              "Description",
            ]}
            rows={[
              [
                "xs",
                "max-width: 575px",
                "Extra small screens"
              ],
              [
                "sm",
                "min-width: 576px, max-width: 767px",
                "Small screens"
              ],
              [
                "md",
                "min-width: 768px, max-width: 991px",
                "Medium screens"
              ],
              [
                "lg",
                "min-width: 992px, max-width: 1199px",
                "Large screens"
              ],
              [
                "xl",
                "min-width: 1200px",
                "Extra large screens"
              ],
              [
                "default",
                "All sizes",
                "Default is used as a final fallback and is not tied to a specific screen size."
              ]
            ]}
          />
        </ResponsivenessSection>
      </ShowPage>
    </>
  );
};

export default Padding;
