import type { ReactNode } from "react";
import { Flex, Card, Body, Caption } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import ResponsivenessSection from "../../Templates/Subcomponents/ResponsivenessSection";

const MiniCell = ({ children }: { children: ReactNode }) => (
  <Card borderRadius="xs" padding="xs">
    <Body text={String(children)} />
  </Card>
);

const GapDemo = ({
  gap,
  columnGap,
  rowGap,
}: {
  gap?: string;
  columnGap?: string;
  rowGap?: string;
}) => (
  <Card
    columnGap={columnGap}
    display="grid"
    gap={gap}
    gridTemplateColumns="repeat(3, 1fr)"
    padding="xs"
    rowGap={rowGap}
    width="200px"
  >
    {[1, 2, 3, 4, 5, 6].map((n) => (
      <MiniCell key={n}>{n}</MiniCell>
    ))}
  </Card>
);

const GridGapGlobalProps = () => {
  return (
    <ShowPage
      isGrid
      title="Gap"
      description={
        <>
          Gap props set spacing between grid tracks. Use <code>gap</code> for
          both axes, or <code>rowGap</code> / <code>columnGap</code>{" "}
          independently. These are the same global spacing props used by Flex
          Box and work with <code>display=&quot;grid&quot;</code>. For more
          information, see the{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/gap"
            target="_blank"
            rel="noreferrer"
          >
            MDN gap documentation
          </a>
          .
        </>
      }
    >
      <Flex gap="md" orientation="column">
        <PropsExamplesTable
          headers={["Gap", "Example", "Rails Example", "React Example"]}
          rows={[
            [
              "None",
              <GapDemo gap="none" />,
              <ExampleCodeCard id="grid-gap-none-rails" text='gap: "none"' />,
              <ExampleCodeCard id="grid-gap-none-react" text='gap="none"' />,
            ],
            [
              "XS",
              <GapDemo gap="xs" />,
              <ExampleCodeCard id="grid-gap-xs-rails" text='gap: "xs"' />,
              <ExampleCodeCard id="grid-gap-xs-react" text='gap="xs"' />,
            ],
            [
              "SM",
              <GapDemo gap="sm" />,
              <ExampleCodeCard id="grid-gap-sm-rails" text='gap: "sm"' />,
              <ExampleCodeCard id="grid-gap-sm-react" text='gap="sm"' />,
            ],
            [
              "MD",
              <GapDemo gap="md" />,
              <ExampleCodeCard id="grid-gap-md-rails" text='gap: "md"' />,
              <ExampleCodeCard id="grid-gap-md-react" text='gap="md"' />,
            ],
            [
              "LG",
              <GapDemo gap="lg" />,
              <ExampleCodeCard id="grid-gap-lg-rails" text='gap: "lg"' />,
              <ExampleCodeCard id="grid-gap-lg-react" text='gap="lg"' />,
            ],
          ]}
        />

        <PropsExamplesTable
          headers={[
            "Axis Gaps",
            "Example",
            "Rails Example",
            "React Example",
          ]}
          rows={[
            [
              "Column gap",
              <GapDemo columnGap="md" rowGap="none" />,
              <ExampleCodeCard
                id="grid-col-gap-rails"
                text='column_gap: "md"'
              />,
              <ExampleCodeCard
                id="grid-col-gap-react"
                text='columnGap="md"'
              />,
            ],
            [
              "Row gap",
              <GapDemo columnGap="none" rowGap="md" />,
              <ExampleCodeCard id="grid-row-gap-rails" text='row_gap: "md"' />,
              <ExampleCodeCard id="grid-row-gap-react" text='rowGap="md"' />,
            ],
          ]}
        />

        <ResponsivenessSection
          exampleSection={
            <>
              <Flex alignItems="center" gap="sm">
                <Caption text="Rails" />
                <ExampleCodeCard
                  id="grid-gap-responsive-rails"
                  text={`gap: { xs: "xs", md: "md", default: "sm" }`}
                />
              </Flex>
              <Flex alignItems="center" gap="sm">
                <Caption text="React" />
                <ExampleCodeCard
                  id="grid-gap-responsive-react"
                  text={`gap={{ xs: "xs", md: "md", default: "sm" }}`}
                />
              </Flex>
            </>
          }
        />
      </Flex>
    </ShowPage>
  );
};

export default GridGapGlobalProps;
