import type { ReactNode } from "react";
import { Flex, Card, Body, Caption, Title, Detail, Badge } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type EventVariant = "info" | "primary" | "success" | "warning";

const getCurrentMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const monthIndex = now.getMonth();
  const today = now.getDate();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  // Sunday = 0 → grid column 1; CSS Grid columns are 1-indexed
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

const GridCell = ({ children }: { children: ReactNode }) => (
  <Card borderRadius="sm" padding="sm">
    <Body text={String(children)} />
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
  event?: { label: string; variant: "info" | "primary" | "success" | "warning" };
  gridColumn?: string;
}) => (
  <Card
    borderRadius="sm"
    gridColumn={gridColumn}
    highlight={isToday ? { position: "top", color: "primary" } : undefined}
    minHeight="80px"
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
    <>
      <ShowPage
        title="Grid"
        description={
          <>
            Grid global props enable two-dimensional layouts with CSS Grid. Pair{" "}
            <code>display=&quot;grid&quot;</code> with template, placement, and
            alignment props. Open CSS values (like{" "}
            <code>repeat(7, 1fr)</code>) are supported as dynamic strings, while
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
          <Title size={4} text="Common Layouts" />
          <Card padding="md">
            <Caption marginBottom="sm" text="Three equal columns" />
            <Card
              display="grid"
              gap="sm"
              gridTemplateColumns="repeat(3, 1fr)"
              marginBottom="md"
              width="100%"
            >
              <GridCell>A</GridCell>
              <GridCell>B</GridCell>
              <GridCell>C</GridCell>
            </Card>
            <Flex align="baseline" gap="xs" marginBottom="xs">
              <Caption text="Rails" />
              <ExampleCodeCard
                id="grid-3col-rails"
                text='display: "grid", grid_template_columns: "repeat(3, 1fr)", gap: "sm"'
              />
            </Flex>
            <Flex align="baseline" gap="xs">
              <Caption text="React" />
              <ExampleCodeCard
                id="grid-3col-react"
                text='display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="sm"'
              />
            </Flex>
          </Card>

          <Card padding="md">
            <Caption marginBottom="sm" text="Fixed header row + flexible content" />
            <Card
              display="grid"
              gap="sm"
              gridTemplateColumns="1fr"
              gridTemplateRows="59px 1fr"
              height="200px"
              marginBottom="md"
            >
              <GridCell>Header</GridCell>
              <GridCell>Content</GridCell>
            </Card>
            <Flex align="baseline" gap="xs" marginBottom="xs">
              <Caption text="Rails" />
              <ExampleCodeCard
                id="grid-rows-rails"
                text='display: "grid", grid_template_rows: "59px 1fr"'
              />
            </Flex>
            <Flex align="baseline" gap="xs">
              <Caption text="React" />
              <ExampleCodeCard
                id="grid-rows-react"
                text='display="grid" gridTemplateRows="59px 1fr"'
              />
            </Flex>
          </Card>

          <Card padding="md">
            <Caption marginBottom="sm" text="Spanning columns" />
            <Card
              display="grid"
              gap="sm"
              gridTemplateColumns="repeat(4, 1fr)"
              marginBottom="md"
            >
              <Card borderRadius="sm" gridColumn="1 / 3" padding="sm">
                <Body text="Spans 2 cols" />
              </Card>
              <GridCell>3</GridCell>
              <GridCell>4</GridCell>
            </Card>
            <Flex align="baseline" gap="xs" marginBottom="xs">
              <Caption text="Rails" />
              <ExampleCodeCard
                id="grid-span-rails"
                text='grid_column: "1 / 3"'
              />
            </Flex>
            <Flex align="baseline" gap="xs">
              <Caption text="React" />
              <ExampleCodeCard
                id="grid-span-react"
                text='gridColumn="1 / 3"'
              />
            </Flex>
          </Card>

          <PropsExamplesTable
            headers={[
              "Prop",
              "Type",
              "Values",
              "Rails Example",
              "React Example",
            ]}
            rows={[
              [
                "gridTemplateColumns",
                <ExampleCodeCard copyIcon={false} text="string" />,
                "Any CSS track list",
                <ExampleCodeCard
                  id="gtc-rails"
                  text='grid_template_columns: "repeat(3, 1fr)"'
                />,
                <ExampleCodeCard
                  id="gtc-react"
                  text='gridTemplateColumns="repeat(3, 1fr)"'
                />,
              ],
              [
                "gridTemplateRows",
                <ExampleCodeCard copyIcon={false} text="string" />,
                "Any CSS track list",
                <ExampleCodeCard
                  id="gtr-rails"
                  text='grid_template_rows: "59px 341px"'
                />,
                <ExampleCodeCard
                  id="gtr-react"
                  text='gridTemplateRows="59px 341px"'
                />,
              ],
              [
                "gridTemplateAreas",
                <ExampleCodeCard copyIcon={false} text="string" />,
                "Named area template",
                <ExampleCodeCard
                  id="gta-rails"
                  text={`grid_template_areas: "'header header' 'sidebar main'"`}
                />,
                <ExampleCodeCard
                  id="gta-react"
                  text={`gridTemplateAreas="'header header' 'sidebar main'"`}
                />,
              ],
              [
                "gridColumn",
                <ExampleCodeCard copyIcon={false} text="string" />,
                "Line / span values",
                <ExampleCodeCard id="gc-rails" text='grid_column: "1 / 3"' />,
                <ExampleCodeCard id="gc-react" text='gridColumn="1 / 3"' />,
              ],
              [
                "gridRow",
                <ExampleCodeCard copyIcon={false} text="string" />,
                "Line / span values",
                <ExampleCodeCard id="gr-rails" text='grid_row: "2"' />,
                <ExampleCodeCard id="gr-react" text='gridRow="2"' />,
              ],
              [
                "gridArea",
                <ExampleCodeCard copyIcon={false} text="string" />,
                "Named area or shorthand",
                <ExampleCodeCard id="ga-rails" text='grid_area: "header"' />,
                <ExampleCodeCard id="ga-react" text='gridArea="header"' />,
              ],
              [
                "gridAutoColumns",
                <ExampleCodeCard copyIcon={false} text="string" />,
                "Any CSS track size",
                <ExampleCodeCard
                  id="gac-rails"
                  text='grid_auto_columns: "minmax(100px, 1fr)"'
                />,
                <ExampleCodeCard
                  id="gac-react"
                  text='gridAutoColumns="minmax(100px, 1fr)"'
                />,
              ],
              [
                "gridAutoRows",
                <ExampleCodeCard copyIcon={false} text="string" />,
                "Any CSS track size",
                <ExampleCodeCard id="gar-rails" text='grid_auto_rows: "auto"' />,
                <ExampleCodeCard id="gar-react" text='gridAutoRows="auto"' />,
              ],
              [
                "gridAutoFlow",
                <ExampleCodeCard copyIcon={false} text="enum | responsive" />,
                "row, column, dense, rowDense, columnDense",
                <ExampleCodeCard id="gaf-rails" text='grid_auto_flow: "column"' />,
                <ExampleCodeCard id="gaf-react" text='gridAutoFlow="column"' />,
              ],
              [
                "justifyItems",
                <ExampleCodeCard copyIcon={false} text="enum | responsive" />,
                "start, end, center, stretch",
                <ExampleCodeCard id="ji-rails" text='justify_items: "center"' />,
                <ExampleCodeCard id="ji-react" text='justifyItems="center"' />,
              ],
              [
                "alignItems",
                <ExampleCodeCard copyIcon={false} text="enum | responsive" />,
                "Existing Flex/Grid align values",
                <ExampleCodeCard id="ai-rails" text='align_items: "center"' />,
                <ExampleCodeCard id="ai-react" text='alignItems="center"' />,
              ],
              [
                "gap / rowGap / columnGap",
                <ExampleCodeCard copyIcon={false} text="spacing | responsive" />,
                "none, xxs, xs, sm, md, lg, xl",
                <ExampleCodeCard id="gap-rails" text='gap: "md"' />,
                <ExampleCodeCard id="gap-react" text='gap="md"' />,
              ],
            ]}
          />

          <Card>
            <Caption text="Responsiveness" />
            <Body text="Enum Grid props like gridAutoFlow and justifyItems support responsive values using the existing breakpoint pattern. Dynamic string props (templates and placement) accept any valid CSS Grid value as an inline style." />
            <Body
              marginY="md"
              text="Responsive values are defined using an object with screen size keys and an optional default:"
            />
            <Flex align="baseline" gap="xs" marginBottom="sm">
              <Caption text="Rails" />
              <Body>
                <ExampleCodeCard
                  id="grid-responsive-rails"
                  text={`justify_items: { xs: "start", md: "center", default: "stretch" }`}
                />
              </Body>
            </Flex>
            <Flex align="baseline" gap="xs">
              <Caption text="React" />
              <Body>
                <ExampleCodeCard
                  id="grid-responsive-react"
                  text={`justifyItems={{ xs: "start", md: "center", default: "stretch" }}`}
                />
              </Body>
            </Flex>
          </Card>

          <Card padding="md" width="100%">
            <Title marginBottom="xs" size={4} text="Monthly calendar" />
            <Body marginBottom="md">
              A full month layout built only with Grid global props:{" "}
              <code>display=&quot;grid&quot;</code>,{" "}
              <code>gridTemplateColumns=&quot;repeat(7, 1fr)&quot;</code>,{" "}
              <code>gap</code>, a header that spans the full width via{" "}
              <code>gridColumn=&quot;1 / -1&quot;</code>, and the first day of
              the month offset with{" "}
              <code>gridColumn=&quot;{month.startColumn}&quot;</code> (
              {month.name} starts on {weekdayName}). The calendar always
              reflects the current month and highlights today.
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
    </>
  );
};

export default GridGlobalProps;
