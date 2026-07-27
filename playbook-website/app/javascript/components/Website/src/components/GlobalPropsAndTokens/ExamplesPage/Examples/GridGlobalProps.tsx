import type { ReactNode } from "react";
import { Flex, Card, Body, Caption, Title, Detail, Badge } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import ResponsivenessSection from "../../Templates/Subcomponents/ResponsivenessSection";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type EventVariant = "info" | "primary" | "success" | "warning";

const getCurrentMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const monthIndex = now.getMonth();
  const today = now.getDate();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startColumn = new Date(year, monthIndex, 1).getDay() + 1;
  const name = now.toLocaleString("en-US", { month: "long", year: "numeric" });

  const eventDays = [
    Math.min(3, daysInMonth),
    Math.min(10, daysInMonth),
    today,
    Math.min(daysInMonth - 2, daysInMonth),
  ].filter((day, index, days) => days.indexOf(day) === index);

  const variants: EventVariant[] = ["info", "primary", "success", "warning"];
  const labels = ["Design sync", "Sprint review", "Today", "Release"];

  const events = eventDays.map((day, index) => ({
    day,
    label: day === today ? "Today" : labels[index] ?? "Event",
    variant: (day === today ? "success" : variants[index] ?? "info") as EventVariant,
  }));

  return { name, startColumn, daysInMonth, today, events };
};

const MiniCell = ({ children }: { children: ReactNode }) => (
  <Card borderRadius="xs" padding="xs">
    <Body text={String(children)} />
  </Card>
);

const TemplateDemo = ({
  columns,
  count = 6,
}: {
  columns: string;
  count?: number;
}) => (
  <Card
    display="grid"
    gap="xs"
    gridTemplateColumns={columns}
    padding="xs"
    width="200px"
  >
    {Array.from({ length: count }, (_, i) => (
      <MiniCell key={i}>{i + 1}</MiniCell>
    ))}
  </Card>
);

const RowsDemo = ({ rows }: { rows: string }) => (
  <Card
    display="grid"
    gap="xs"
    gridTemplateColumns="1fr"
    gridTemplateRows={rows}
    height="120px"
    padding="xs"
    width="200px"
  >
    <MiniCell>1</MiniCell>
    <MiniCell>2</MiniCell>
  </Card>
);

const AutoFlowDemo = ({ flow }: { flow: "row" | "column" }) => (
  <Card
    display="grid"
    gap="xs"
    gridAutoFlow={flow}
    gridTemplateColumns={flow === "row" ? "repeat(3, 1fr)" : "repeat(2, 1fr)"}
    gridTemplateRows={flow === "column" ? "repeat(2, 1fr)" : undefined}
    padding="xs"
    width="200px"
  >
    {[1, 2, 3, 4].map((n) => (
      <MiniCell key={n}>{n}</MiniCell>
    ))}
  </Card>
);

const DayCell = ({
  day,
  isToday,
  event,
  gridColumn,
}: {
  day: number;
  isToday?: boolean;
  event?: { label: string; variant: EventVariant };
  gridColumn?: string;
}) => (
  <Card
    borderRadius="sm"
    gridColumn={gridColumn}
    highlight={isToday ? { position: "top", color: "primary" } : undefined}
    minHeight="72px"
    padding="xs"
  >
    <Detail bold color={isToday ? "link" : "light"} text={String(day)} />
    {event && (
      <Badge marginTop="xxs" text={event.label} variant={event.variant} />
    )}
  </Card>
);

const MonthlyCalendar = () => {
  const month = getCurrentMonth();
  const eventByDay = Object.fromEntries(
    month.events.map((event) => [event.day, event])
  );

  return (
    <Card
      display="grid"
      gap="xs"
      gridTemplateColumns="repeat(7, 1fr)"
      padding="md"
      width="100%"
    >
      <Card
        borderNone
        gridColumn="1 / -1"
        paddingBottom="xs"
        paddingX="none"
        paddingTop="none"
      >
        <Flex align="center" justify="between">
          <Title size={4} text={month.name} />
          <Caption text="gridTemplateColumns + gridColumn" />
        </Flex>
      </Card>

      {WEEKDAYS.map((day) => (
        <Caption key={day} text={day} textAlign="center" />
      ))}

      {Array.from({ length: month.daysInMonth }, (_, index) => {
        const day = index + 1;
        return (
          <DayCell
            key={day}
            day={day}
            event={eventByDay[day]}
            gridColumn={day === 1 ? String(month.startColumn) : undefined}
            isToday={day === month.today}
          />
        );
      })}
    </Card>
  );
};

const GridGlobalProps = () => {
  const month = getCurrentMonth();
  const weekdayName = WEEKDAYS[month.startColumn - 1];

  return (
    <ShowPage
      title="Grid"
      description={
        <>
          Grid global props enable two-dimensional layouts with CSS Grid. Pair{" "}
          <code>display=&quot;grid&quot;</code> with template, placement, and
          alignment props. Open CSS values (like{" "}
          <code>repeat(3, 1fr)</code>) are supported as dynamic strings, while
          common alignment props use Playbook&apos;s class-based responsive
          pattern. For more information, see the{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout"
            target="_blank"
            rel="noreferrer"
          >
            MDN CSS Grid documentation
          </a>
          .
        </>
      }
    >
      <Flex gap="md" orientation="column">
        <PropsExamplesTable
          headers={[
            "Template Columns",
            "Example",
            "Rails Example",
            "React Example",
          ]}
          rows={[
            [
              "Two equal columns",
              <TemplateDemo columns="repeat(2, 1fr)" count={4} />,
              <ExampleCodeCard
                id="gtc-2-rails"
                text='grid_template_columns: "repeat(2, 1fr)"'
              />,
              <ExampleCodeCard
                id="gtc-2-react"
                text='gridTemplateColumns="repeat(2, 1fr)"'
              />,
            ],
            [
              "Three equal columns",
              <TemplateDemo columns="repeat(3, 1fr)" />,
              <ExampleCodeCard
                id="gtc-3-rails"
                text='grid_template_columns: "repeat(3, 1fr)"'
              />,
              <ExampleCodeCard
                id="gtc-3-react"
                text='gridTemplateColumns="repeat(3, 1fr)"'
              />,
            ],
            [
              "Sidebar + main",
              <TemplateDemo columns="120px 1fr" count={2} />,
              <ExampleCodeCard
                id="gtc-sidebar-rails"
                text='grid_template_columns: "120px 1fr"'
              />,
              <ExampleCodeCard
                id="gtc-sidebar-react"
                text='gridTemplateColumns="120px 1fr"'
              />,
            ],
            [
              "Auto-fit cards",
              <TemplateDemo
                columns="repeat(auto-fit, minmax(60px, 1fr))"
                count={4}
              />,
              <ExampleCodeCard
                id="gtc-autofit-rails"
                text='grid_template_columns: "repeat(auto-fit, minmax(60px, 1fr))"'
              />,
              <ExampleCodeCard
                id="gtc-autofit-react"
                text='gridTemplateColumns="repeat(auto-fit, minmax(60px, 1fr))"'
              />,
            ],
          ]}
        />

        <PropsExamplesTable
          headers={[
            "Template Rows",
            "Example",
            "Rails Example",
            "React Example",
          ]}
          rows={[
            [
              "Fixed + flexible",
              <RowsDemo rows="40px 1fr" />,
              <ExampleCodeCard
                id="gtr-fixed-rails"
                text='grid_template_rows: "40px 1fr"'
              />,
              <ExampleCodeCard
                id="gtr-fixed-react"
                text='gridTemplateRows="40px 1fr"'
              />,
            ],
            [
              "Equal rows",
              <RowsDemo rows="1fr 1fr" />,
              <ExampleCodeCard
                id="gtr-equal-rails"
                text='grid_template_rows: "1fr 1fr"'
              />,
              <ExampleCodeCard
                id="gtr-equal-react"
                text='gridTemplateRows="1fr 1fr"'
              />,
            ],
          ]}
        />

        <PropsExamplesTable
          headers={[
            "Auto Flow",
            "Example",
            "Rails Example",
            "React Example",
          ]}
          rows={[
            [
              "Row",
              <AutoFlowDemo flow="row" />,
              <ExampleCodeCard id="gaf-row-rails" text='grid_auto_flow: "row"' />,
              <ExampleCodeCard id="gaf-row-react" text='gridAutoFlow="row"' />,
            ],
            [
              "Column",
              <AutoFlowDemo flow="column" />,
              <ExampleCodeCard
                id="gaf-column-rails"
                text='grid_auto_flow: "column"'
              />,
              <ExampleCodeCard
                id="gaf-column-react"
                text='gridAutoFlow="column"'
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
                  id="grid-responsive-rails"
                  text={`grid_auto_flow: { xs: "row", md: "column", default: "row" }`}
                />
              </Flex>
              <Flex alignItems="center" gap="sm">
                <Caption text="React" />
                <ExampleCodeCard
                  id="grid-responsive-react"
                  text={`gridAutoFlow={{ xs: "row", md: "column", default: "row" }}`}
                />
              </Flex>
            </>
          }
        >
          <Body>
            Enum props like <code>gridAutoFlow</code> and{" "}
            <code>justifyItems</code> support responsive breakpoint objects.
            Dynamic string props (<code>gridTemplateColumns</code>, placement,
            etc.) accept any valid CSS Grid value as an inline style.
          </Body>
        </ResponsivenessSection>

        <Card padding="md" width="100%">
          <Title marginBottom="xs" size={4} text="Monthly calendar" />
          <Body marginBottom="md">
            A fuller layout using{" "}
            <code>gridTemplateColumns=&quot;repeat(7, 1fr)&quot;</code>,{" "}
            <code>gap</code>, a full-width header via{" "}
            <code>gridColumn=&quot;1 / -1&quot;</code>, and day 1 offset with{" "}
            <code>gridColumn=&quot;{month.startColumn}&quot;</code> (
            {month.name} starts on {weekdayName}).
          </Body>
          <MonthlyCalendar />
          <Flex
            align="baseline"
            flexDirection="column"
            gap="xs"
            marginTop="md"
          >
            <Flex align="baseline" gap="xs" wrap>
              <Caption text="Rails" />
              <ExampleCodeCard
                id="grid-calendar-rails"
                text='display: "grid", grid_template_columns: "repeat(7, 1fr)", gap: "xs"'
              />
            </Flex>
            <Flex align="baseline" gap="xs" wrap>
              <Caption text="React" />
              <ExampleCodeCard
                id="grid-calendar-react"
                text='display="grid" gridTemplateColumns="repeat(7, 1fr)" gap="xs"'
              />
            </Flex>
            <Flex align="baseline" gap="xs" wrap>
              <Caption text="Offset first day" />
              <ExampleCodeCard
                id="grid-calendar-offset-react"
                text={`gridColumn="${month.startColumn}"`}
              />
            </Flex>
            <Flex align="baseline" gap="xs" wrap>
              <Caption text="Full-width header" />
              <ExampleCodeCard
                id="grid-calendar-span-react"
                text='gridColumn="1 / -1"'
              />
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </ShowPage>
  );
};

export default GridGlobalProps;
