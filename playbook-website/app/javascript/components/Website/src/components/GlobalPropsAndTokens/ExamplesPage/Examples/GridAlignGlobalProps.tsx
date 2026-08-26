import { Flex, Card, Body, Caption } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import ResponsivenessSection from "../../Templates/Subcomponents/ResponsivenessSection";

const JustifyItemsDemo = ({
  justifyItems,
}: {
  justifyItems: "start" | "center" | "end" | "stretch";
}) => (
  <Card
    display="grid"
    gap="xs"
    gridTemplateColumns="repeat(3, 1fr)"
    justifyItems={justifyItems}
    padding="xs"
    width="220px"
  >
    {["A", "B", "C"].map((label) => (
      <Card
        key={label}
        borderRadius="xs"
        padding="xs"
        width={justifyItems === "stretch" ? undefined : "28px"}
      >
        <Body text={label} />
      </Card>
    ))}
  </Card>
);

const AlignItemsDemo = ({
  alignItems,
}: {
  alignItems: "start" | "center" | "end" | "stretch";
}) => (
  <Card
    alignItems={alignItems}
    display="grid"
    gap="xs"
    gridTemplateColumns="repeat(3, 1fr)"
    height="90px"
    padding="xs"
    width="220px"
  >
    {["1", "2", "3"].map((label) => (
      <Card
        key={label}
        borderRadius="xs"
        height={alignItems === "stretch" ? undefined : "28px"}
        padding="xs"
      >
        <Body text={label} />
      </Card>
    ))}
  </Card>
);

const GridAlignGlobalProps = () => {
  return (
    <ShowPage
      isGrid
      title="Align"
      description={
        <>
          Align props control how grid items sit inside their cells.{" "}
          <code>justifyItems</code> aligns on the inline axis;{" "}
          <code>alignItems</code> aligns on the block axis (shared with Flex
          Box). For more information, see the{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items"
            target="_blank"
            rel="noreferrer"
          >
            MDN justify-items documentation
          </a>
          .
        </>
      }
    >
      <Flex gap="md" orientation="column">
        <PropsExamplesTable
          headers={[
            "Justify Items",
            "Example",
            "Rails Example",
            "React Example",
          ]}
          rows={[
            [
              "Start",
              <JustifyItemsDemo justifyItems="start" />,
              <ExampleCodeCard id="ji-start-rails" text='justify_items: "start"' />,
              <ExampleCodeCard id="ji-start-react" text='justifyItems="start"' />,
            ],
            [
              "Center",
              <JustifyItemsDemo justifyItems="center" />,
              <ExampleCodeCard
                id="ji-center-rails"
                text='justify_items: "center"'
              />,
              <ExampleCodeCard
                id="ji-center-react"
                text='justifyItems="center"'
              />,
            ],
            [
              "End",
              <JustifyItemsDemo justifyItems="end" />,
              <ExampleCodeCard id="ji-end-rails" text='justify_items: "end"' />,
              <ExampleCodeCard id="ji-end-react" text='justifyItems="end"' />,
            ],
            [
              "Stretch",
              <JustifyItemsDemo justifyItems="stretch" />,
              <ExampleCodeCard
                id="ji-stretch-rails"
                text='justify_items: "stretch"'
              />,
              <ExampleCodeCard
                id="ji-stretch-react"
                text='justifyItems="stretch"'
              />,
            ],
          ]}
        />

        <PropsExamplesTable
          headers={[
            "Align Items",
            "Example",
            "Rails Example",
            "React Example",
          ]}
          rows={[
            [
              "Start",
              <AlignItemsDemo alignItems="start" />,
              <ExampleCodeCard id="ai-start-rails" text='align_items: "start"' />,
              <ExampleCodeCard id="ai-start-react" text='alignItems="start"' />,
            ],
            [
              "Center",
              <AlignItemsDemo alignItems="center" />,
              <ExampleCodeCard
                id="ai-center-rails"
                text='align_items: "center"'
              />,
              <ExampleCodeCard
                id="ai-center-react"
                text='alignItems="center"'
              />,
            ],
            [
              "End",
              <AlignItemsDemo alignItems="end" />,
              <ExampleCodeCard id="ai-end-rails" text='align_items: "end"' />,
              <ExampleCodeCard id="ai-end-react" text='alignItems="end"' />,
            ],
            [
              "Stretch",
              <AlignItemsDemo alignItems="stretch" />,
              <ExampleCodeCard
                id="ai-stretch-rails"
                text='align_items: "stretch"'
              />,
              <ExampleCodeCard
                id="ai-stretch-react"
                text='alignItems="stretch"'
              />,
            ],
          ]}
        />

        <ResponsivenessSection
          exampleSection={
            <>
              <Flex alignItems="center" gap="sm">
                <Caption text="Rails" />
                <ExampleCodeCard
                  id="grid-align-responsive-rails"
                  text={`justify_items: { xs: "start", md: "center", default: "stretch" }`}
                />
              </Flex>
              <Flex alignItems="center" gap="sm">
                <Caption text="React" />
                <ExampleCodeCard
                  id="grid-align-responsive-react"
                  text={`justifyItems={{ xs: "start", md: "center", default: "stretch" }}`}
                />
              </Flex>
            </>
          }
        />
      </Flex>
    </ShowPage>
  );
};

export default GridAlignGlobalProps;
