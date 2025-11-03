import { Flex, Card, Title, Caption } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import ResponsivenessSection from "../../Templates/Subcomponents/ResponsivenessSection";
import ValueCardWithTooltip from "../../Templates/Subcomponents/ValueCardWithTooltip";

const ZIndex = () => {
    const values = [
      { name: "1", value: "100"},
      { name: "2", value: "200" },
      { name: "3", value: "300" },
      { name: "4", value: "400" },
      { name: "5", value: "500" },
      { name: "6", value: "600" },
      { name: "7", value: "700" },
      { name: "8", value: "800"},
      { name: "9", value: "900"},
      { name: "10", value: "1000"},
      { name: "max", value: "999999"},
    ];

    const cardIndexes = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "max"]

    const ZIndexCard = () => {
        return (
          <Flex maxWidth="100%" wrap>
            <Card
              borderRadius="none"
              padding="xl"
              background="light"
              zIndex="1"
            >
              <Title bold={false}
                     size={2}
                     tag='h2'
                     text="1"
              />
            </Card>
            {cardIndexes.map((index) => (
              <Card
                borderRadius="none"
                shadow="deeper"
                padding="xl"
                background="light"
                zIndex={index}
                htmlOptions={{style: {wordWrap: "normal"}}}
              >
                <Title bold={false}
                       size={2}
                       tag='h2'
                       text={index}
                />
              </Card>
            ))}
          </Flex>
        );
    };

    const ValuesCards = () => {
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
    };

    const ResponsiveExamples = () => {
      return (
        <>
          <Flex alignItems="center" gap="sm">
            <Caption text="Rails" />
            <ExampleCodeCard
              id="responsive-rails"
              text='z_index: { xs: "1", sm: "2", md: "3", lg: "4", xl: "5", default: "6" }'
            />
          </Flex>
          <Flex alignItems="center" gap="sm">
            <Caption text="React" />
            <ExampleCodeCard
              id="responsive-react"
              text='zIndex={{ xs: "1", sm: "2", md: "3", lg: "4", xl: "5", default: "6" }}'
            />
          </Flex>
        </>
      );
    };


  return (
    <>
      <ShowPage
        title="Z-Index"
        description={
          <>
            The Z-Index prop controls the stack order of components along the z-axis,
            determining which elements appear in front of or behind others. It is
            commonly used for overlays, modals, tooltips, and other layered UI elements.
            When used improperly, z-index can lead to stacking conflicts or unpredictable
            visual results, particularly for deeply nested layouts. For more information
            on Z-Index prop controls, refer to the{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/z-index"
              target="_blank"
            >
              MDN document found here.
            </a>
          </>
        }
        VisualGuideCard={ZIndexCard()}
      >
        <PropsExamplesTable
          headers={[
            "Z-Index",
            "Type",
            "Values",
            "Rails Example",
            "React Example",
          ]}
            rows={
              [
                [
                  "Z-Index",
                  <ExampleCodeCard text="union" copyIcon={false} />,
                  <ValuesCards />,
                  <ExampleCodeCard id="z-index-rails" text='z_index: "5"' />,
                  <ExampleCodeCard id="z-index-react" text='zIndex="5"' />
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

export default ZIndex;
