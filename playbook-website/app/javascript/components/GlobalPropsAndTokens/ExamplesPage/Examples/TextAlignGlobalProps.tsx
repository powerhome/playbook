import { Flex, Card, Body, Caption } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import ResponsivenessSection from "../../Templates/Subcomponents/ResponsivenessSection";

const TextAlign = () => {

    const VisualGuideExample = ({ text, textAlign }: any) => {
        return (
      <>
        <Flex orientation="column" alignItems="center" gap="xs">
            <Card
              className="visual_guide_card_text_align"
              alignItems="center"
              justifyContent="center"
              padding="sm"
              background="light"
              textAlign={textAlign}
            >
              {text}
            </Card>
            <Body text={textAlign} />
        </Flex>
      </>
      )
     }

    const TextAlignCard = () => {
        return (
          <Flex gap="sm">
            <VisualGuideExample text="The quick brown fox jumps over 17 lazy dogs." textAlign="left" />
            <VisualGuideExample text="The quick brown fox jumps over 17 lazy dogs." textAlign="right" />
            <VisualGuideExample text="The quick brown fox jumps over 17 lazy dogs." textAlign="center" />
            <VisualGuideExample text="The quick brown fox jumps over 17 lazy dogs." textAlign="justify" />
            <VisualGuideExample text="The quick brown fox jumps over 17 lazy dogs." textAlign="start" />
            <VisualGuideExample text="The quick brown fox jumps over 17 lazy dogs." textAlign="end" />
          </Flex>
        );
    };


    const values = [
      "left",
      "right",
      "center",
      "justify",
      "justify-all",
      "start",
      "end",
      "match-parent",
      "initial",
      "inherit",
    ];

    const ValuesCards = () => {
      return (
        <Flex gap="xs" wrap>
          {values.map((value) => (
            <ExampleCodeCard text={value} copyIcon={false} />
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
              text="text_align: { xs: 'justify', sm: 'justify', md: 'left', lg: 'left', xl: 'left', default: 'left' }"
            />
          </Flex>
          <Flex alignItems="center" gap="sm">
            <Caption text="React" />
            <ExampleCodeCard
              id="responsive-react"
              text="textAlign= {{ xs: 'justify', sm: 'justify', md: 'left', lg: 'left', xl: 'left', default: 'left' }}"
            />
          </Flex>
        </>
      );
    };


  return (
    <>
      <ShowPage
        title="Text Align"
        description={
          <>
            The Text Align prop controls the horizontal alignment of inline-level
            content within a block-level container. It can affect the alignment
            of text, inline elements, inline-blocks, and images. Text Align is
            commonly used to align text to the left, right, center, or justify it
            across the full width of a container. For more information on Text
            Align prop controls, refer to the{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-align"
              target="_blank"
            >
              MDN document found here.
            </a>
          </>
        }
        VisualGuideCard={TextAlignCard()}
      >
        <PropsExamplesTable
          headers={[
            "Text Align",
            "Type",
            "Values",
            "Rails Example",
            "React Example",
          ]}
            rows={
              [
                [
                  "Text Align",
                  <ExampleCodeCard text="union" copyIcon={false} />,
                  <ValuesCards />,
                  <ExampleCodeCard id="text-align-rails" text='text_align: "right"' />,
                  <ExampleCodeCard id="text-align-react" text='textAlign="right"' />
                ]
              ]
            }
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

export default TextAlign;
