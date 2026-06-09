import { Body, Caption, Card, Flex, Title } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import ResponsivenessSection from "../../Templates/Subcomponents/ResponsivenessSection";

const VerticalAlignGlobalProps = () => {

  const formatVerticalAlign = (value: string) => {
    return value.replace("_", " ").split(" ").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
  };

  const VisualGuideExample = ({ verticalAlign }: { verticalAlign: string }) => {
    const visualGuideCardHeights = ['25px', '50px', '100px'];
    
    return (
      <div className="visual_guide_card_vertical_align_wrapper">
        <Card
            className="visual_guide_card_vertical_align"
            padding="xs"
        >
          <Card 
              background="light" 
              borderNone
              borderRadius="none"
              className="visual_guide_card_vertical_align_content"
              display="inline_block"
              padding="none"
              verticalAlign={verticalAlign}
          >
            <Title 
                display="inline_block"
                text={formatVerticalAlign(verticalAlign)}  
                verticalAlign={verticalAlign} 
            />
            <Body 
                display="inline_block" 
                marginLeft="xs"
                text="Example Copy" 
                verticalAlign={verticalAlign} 
            />
            {visualGuideCardHeights.map((height) => (
              <Card
                  background="product_1_highlight"
                  display="inline_block"
                  htmlOptions={{style: {height: height, width: "55px"}}}
                  key={height}
                  marginLeft={verticalAlign === "text_bottom" ? "none" : "xs"}
                  padding="xs"
                  verticalAlign={verticalAlign}
              />
            ))}
          </Card>
        </Card>
        <Caption marginTop="xs" size="xs" text={formatVerticalAlign(verticalAlign)} />
      </div>
    )
  }

  const VerticalAlignCard = () => {
      return (
        <Flex gap="sm" wrap>
          <VisualGuideExample verticalAlign="top" />
          <VisualGuideExample verticalAlign="bottom" />
          <VisualGuideExample verticalAlign="middle" />
          <VisualGuideExample verticalAlign="baseline" />
          <VisualGuideExample verticalAlign="sub" />
          <VisualGuideExample verticalAlign="super" />
          <VisualGuideExample verticalAlign="text_top" />
          <VisualGuideExample verticalAlign="text_bottom" />
        </Flex>
      );
  };

  const values = [
    "baseline",
    "sub",
    "super",
    "text-top",
    "text-bottom",
    "middle",
    "top",
    "bottom",
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
  
  const ResponsiveExamples = () => {
    return (
      <>
        <Flex alignItems="center" gap="sm">
          <Caption text="Rails" />
          <ExampleCodeCard
            id="vertical-align-responsive-rails"
            text='vertical_align: { xs: "baseline", sm: "baseline", md: "top", lg: "top", xl: "top", default: "top" }'
          />
        </Flex>
        <Flex alignItems="center" gap="sm">
          <Caption text="React" />
          <ExampleCodeCard
            id="vertical-align-responsive-react"
            text='verticalAlign={{ xs: "baseline", sm: "baseline", md: "top", lg: "top", xl: "top", default: "top" }}'
          />
        </Flex>
      </>
    );
  };

  return (
    <>
      <ShowPage
        title="Vertical Align"
        description={
          <>
            The Vertical Align prop controls how inline or table-cell elements are positioned vertically relative to surrounding content. It does not move the element in the overall page layout, but rather adjusts where the element "sits" on its line. It's most useful for aligning content like text, images, icons, or inline blocks within a line of content or inside a table-cell. For more information on Vertical Align prop controls, refer to the {" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align"
              target="_blank"
            >
              MDN document found here.
            </a>
          </>
        }
        VisualGuideCard={VerticalAlignCard()}
      >
      <PropsExamplesTable
        headers={["Text Align", "Type", "Values", "Rails Example", "React Example"]}
        rows={[
          [
            "Vertical Align",
            <ExampleCodeCard text="union" copyIcon={false} />,
            <ValuesCards />,
            <ExampleCodeCard
              id="vertical-align-rails"
              text='vertical_align: "baseline"'
            />,
            <ExampleCodeCard
              id="vertical-align-react"
              text='verticalAlign="baseline"'
            />,
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
  )
}

export default VerticalAlignGlobalProps;
