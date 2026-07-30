import type { ReactNode } from "react";
import { Flex, Card, Body, Caption } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const MiniCell = ({
  children,
  gridColumn,
  gridRow,
  gridArea,
}: {
  children: ReactNode;
  gridColumn?: string;
  gridRow?: string;
  gridArea?: string;
}) => (
  <Card
    borderRadius="xs"
    gridArea={gridArea}
    gridColumn={gridColumn}
    gridRow={gridRow}
    padding="xs"
  >
    <Body text={String(children)} />
  </Card>
);

const GridPlacementGlobalProps = () => {
  return (
    <ShowPage
      isGrid
      title="Placement"
      description={
        <>
          Placement props position items within a Grid container using line
          numbers, spans, or named areas. Use{" "}
          <code>gridColumn</code>, <code>gridRow</code>, and{" "}
          <code>gridArea</code> for full CSS Grid placement control. For more
          information, see the{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column"
            target="_blank"
            rel="noreferrer"
          >
            MDN grid-column documentation
          </a>
          .
        </>
      }
    >
      <Flex gap="md" orientation="column">
        <PropsExamplesTable
          headers={[
            "Grid Column",
            "Example",
            "Rails Example",
            "React Example",
          ]}
          rows={[
            [
              "Span 2 columns",
              <Card
                display="grid"
                gap="xs"
                gridTemplateColumns="repeat(4, 1fr)"
                padding="xs"
                width="220px"
              >
                <MiniCell gridColumn="1 / 3">A</MiniCell>
                <MiniCell>B</MiniCell>
                <MiniCell>C</MiniCell>
              </Card>,
              <ExampleCodeCard id="gc-span-rails" text='grid_column: "1 / 3"' />,
              <ExampleCodeCard id="gc-span-react" text='gridColumn="1 / 3"' />,
            ],
            [
              "Span with keyword",
              <Card
                display="grid"
                gap="xs"
                gridTemplateColumns="repeat(4, 1fr)"
                padding="xs"
                width="220px"
              >
                <MiniCell gridColumn="span 3">Wide</MiniCell>
                <MiniCell>4</MiniCell>
              </Card>,
              <ExampleCodeCard
                id="gc-span-kw-rails"
                text='grid_column: "span 3"'
              />,
              <ExampleCodeCard
                id="gc-span-kw-react"
                text='gridColumn="span 3"'
              />,
            ],
            [
              "Full width",
              <Card
                display="grid"
                gap="xs"
                gridTemplateColumns="repeat(3, 1fr)"
                padding="xs"
                width="220px"
              >
                <MiniCell gridColumn="1 / -1">Header</MiniCell>
                <MiniCell>1</MiniCell>
                <MiniCell>2</MiniCell>
                <MiniCell>3</MiniCell>
              </Card>,
              <ExampleCodeCard
                id="gc-full-rails"
                text='grid_column: "1 / -1"'
              />,
              <ExampleCodeCard
                id="gc-full-react"
                text='gridColumn="1 / -1"'
              />,
            ],
          ]}
        />

        <PropsExamplesTable
          headers={["Grid Row", "Example", "Rails Example", "React Example"]}
          rows={[
            [
              "Span 2 rows",
              <Card
                display="grid"
                gap="xs"
                gridTemplateColumns="repeat(2, 1fr)"
                gridTemplateRows="repeat(2, 40px)"
                padding="xs"
                width="180px"
              >
                <MiniCell gridRow="1 / 3">Tall</MiniCell>
                <MiniCell>B</MiniCell>
                <MiniCell>C</MiniCell>
              </Card>,
              <ExampleCodeCard id="gr-span-rails" text='grid_row: "1 / 3"' />,
              <ExampleCodeCard id="gr-span-react" text='gridRow="1 / 3"' />,
            ],
          ]}
        />

        <PropsExamplesTable
          headers={["Grid Area", "Example", "Rails Example", "React Example"]}
          rows={[
            [
              "Named areas",
              <Card
                display="grid"
                gap="xs"
                gridTemplateAreas="'header header' 'sidebar main'"
                gridTemplateColumns="70px 1fr"
                gridTemplateRows="36px 60px"
                padding="xs"
                width="220px"
              >
                <MiniCell gridArea="header">Header</MiniCell>
                <MiniCell gridArea="sidebar">Side</MiniCell>
                <MiniCell gridArea="main">Main</MiniCell>
              </Card>,
              <ExampleCodeCard id="ga-rails" text='grid_area: "header"' />,
              <ExampleCodeCard id="ga-react" text='gridArea="header"' />,
            ],
          ]}
        />

        <Card>
          <Caption text="Tip" />
          <Body>
            Pair <code>gridTemplateAreas</code> on the container with{" "}
            <code>gridArea</code> on children for readable page layouts. Line-based{" "}
            <code>gridColumn</code> / <code>gridRow</code> values are ideal for
            spanning and offsets (like calendar day placement).
          </Body>
        </Card>
      </Flex>
    </ShowPage>
  );
};

export default GridPlacementGlobalProps;
