import React from "react";
import GlobalPropPage from "../../Templates/GlobalPropPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import HeaderWithIcon from "../../Templates/Subcomponents/HeaderWithIcon";
import { Image, Flex, FlexItem } from "playbook-ui";

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

  const SpacingTypes = ["xxs", "xs", "sm", "md", "lg", "xl", "none", "auto", "initial", "inherit"];
  const TypesCards = () => {
    return (
      <Flex gap="xs" wrap>
        {SpacingTypes.map((type) => (
          <ExampleCodeCard key={type} text={type} copyIcon={false} />
        ))}
      </Flex>
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
              <ExampleCodeCard id="margin-left-rails" text="margin_left: 'sm'" />,
              <ExampleCodeCard id="margin-left-react" text="marginLeft= 'sm'" />,
            ],
            [
              "Margin Right",
              <ExampleCodeCard text="union" copyIcon={false} />,
              <TypesCards />,
              <ExampleCodeCard id="margin-right-rails" text="margin_right: 'sm'" />,
              <ExampleCodeCard id="margin-right-react" text="marginRight= 'sm'" />,
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
              <ExampleCodeCard id="margin-bottom-rails" text="margin_bottom: 'sm'" />,
              <ExampleCodeCard id="margin-bottom-react" text="marginBottom= 'sm'" />,
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
      </GlobalPropPage>
    </>
  );
};

export default Margin;
