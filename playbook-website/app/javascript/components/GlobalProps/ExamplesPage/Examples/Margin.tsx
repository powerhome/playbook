import React from "react";
import { Image, Flex, Caption } from "playbook-ui";

import GlobalPropPage from "../../Templates/GlobalPropPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ResponsivenessSection from "../../Templates/Subcomponents/ResponsivenessSection";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import HeaderWithIcon from "../../Templates/Subcomponents/HeaderWithIcon";
import ValueCardWithTooltip from "../../Templates/Subcomponents/ValueCardWithTooltip";

import { SpacingValues } from "../../Data/SpacingValues";

const Margin = () => {
  const VisualGuideCard = () => {
    return (
      <Flex width="100%" justify="between" wrap>
        <Image
          alt="picture of a misty forest"
          size="lg"
          url="https://unsplash.it/500/400/?image=634"
        />
        <Image
          alt="picture of a misty forest"
          size="lg"
          url="https://unsplash.it/500/400/?image=634"
        />
        <Image
          alt="picture of a misty forest"
          size="lg"
          url="https://unsplash.it/500/400/?image=634"
        />
        <Image
          alt="picture of a misty forest"
          size="lg"
          url="https://unsplash.it/500/400/?image=634"
        />
        <Image
          alt="picture of a misty forest"
          size="lg"
          url="https://unsplash.it/500/400/?image=634"
        />
      </Flex>
    );
  };

  const TypesCards = () => {
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
            id="responsive-rails"
            text="margin_bottom: { xs: 'xxs', sm: 'xs', md: 'sm', lg: 'md', xl: 'lg', default: 'xl' }"
          />
        </Flex>
        <Flex alignItems="center" gap="sm">
          <Caption text="React" />
          <ExampleCodeCard
            id="responsive-react"
            text="marginBottom= {{ xs: 'xxs', sm: 'xs', md: 'sm', lg: 'md', xl: 'lg', default: 'xl' }}"
          />
        </Flex>
      </>
    );
  };
  return (
    <>
      <GlobalPropPage
        title="Margin"
        description={
          <>
            The Margin prop adds space outside of a component’s outer edge,
            creating spacing between it and neighboring elements. While useful
            for helping to create layout spacing, margin should be used
            selectively. Overlapping margins, collapsing behavior, and
            inconsistent stacking can introduce unintended visual issues,
            particularly for responsive or nested layouts. For more information
            on Margin prop controls, refer to the{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/margin"
              target="_blank"
            >
              MDN document found here.
            </a>
          </>
        }
        VisualGuideCard={VisualGuideCard()}
      >
        <PropsExamplesTable
          headers={[
            "Margin",
            "Type",
            <HeaderWithIcon />,
            "Rails Example",
            "React Example",
          ]}
          rows={[
            [
              "Margin",
              <ExampleCodeCard text="union" copyIcon={false} />,
              <TypesCards />,
              <ExampleCodeCard id="margin-rails" text="margin: 'sm'" />,
              <ExampleCodeCard id="margin-react" text="margin= 'sm'" />,
            ],
            [
              "Margin Left",
              <ExampleCodeCard text="union" copyIcon={false} />,
              <TypesCards />,
              <ExampleCodeCard
                id="margin-left-rails"
                text="margin_left: 'sm'"
              />,
              <ExampleCodeCard
                id="margin-left-react"
                text="marginLeft= 'sm'"
              />,
            ],
            [
              "Margin Right",
              <ExampleCodeCard text="union" copyIcon={false} />,
              <TypesCards />,
              <ExampleCodeCard
                id="margin-right-rails"
                text="margin_right: 'sm'"
              />,
              <ExampleCodeCard
                id="margin-right-react"
                text="marginRight= 'sm'"
              />,
            ],
            [
              "Margin Top",
              <ExampleCodeCard text="union" copyIcon={false} />,
              <TypesCards />,
              <ExampleCodeCard id="margin-top-rails" text="margin_top: 'sm'" />,
              <ExampleCodeCard id="margin-top-react" text="marginTop= 'sm'" />,
            ],
            [
              "Margin Bottom",
              <ExampleCodeCard text="union" copyIcon={false} />,
              <TypesCards />,
              <ExampleCodeCard
                id="margin-bottom-rails"
                text="margin_bottom: 'sm'"
              />,
              <ExampleCodeCard
                id="margin-bottom-react"
                text="marginBottom= 'sm'"
              />,
            ],
            [
              "Margin X",
              <ExampleCodeCard text="union" copyIcon={false} />,
              <TypesCards />,
              <ExampleCodeCard id="margin-x-rails" text="margin_x: 'sm'" />,
              <ExampleCodeCard id="margin-x-react" text="marginX= 'sm'" />,
            ],
            [
              "Margin Y",
              <ExampleCodeCard text="union" copyIcon={false} />,
              <TypesCards />,
              <ExampleCodeCard id="margin-y-rails" text="margin_y: 'sm'" />,
              <ExampleCodeCard id="margin-y-react" text="marginY= 'sm'" />,
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
      </GlobalPropPage>
    </>
  );
};

export default Margin;
