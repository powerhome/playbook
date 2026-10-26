import { useState } from "react";
import { Body, Button, Card, Flex, Title, Table, Pill, LabelPill, OnlineStatus, Source, StatChange } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const OnClick = () => {
  const clickableDemoHtmlOptions = {
    style: { userSelect: "none" as const },
  };

  const clickablePointerHtmlOptions = {
    style: { cursor: "pointer" as const, userSelect: "none" as const },
  };

  const InteractiveExample = ({
    children,
    count,
    label,
    reset,
  }: {
    children: React.ReactNode,
    count: number,
    label: string,
    reset: () => void,
  }) => {
    return (
      <Flex flexDirection="column" gap="xs" width="100%">
        {children}
        <Body color="light" text={`${label}: ${count} click${count === 1 ? "" : "s"}`} />
        <Button
            onClick={reset}
            size="sm"
            text="Reset"
            variant="secondary"
        />
      </Flex>
    );
  };

  const VisualGuideCard = () => {
    const [bodyClicks, setBodyClicks] = useState(0);
    const [cardClicks, setCardClicks] = useState(0);
    const [flexClicks, setFlexClicks] = useState(0);
    const [titleClicks, setTitleClicks] = useState(0);
    const [labelPillClicks, setLabelPillClicks] = useState(0);
    const [pillClicks, setPillClicks] = useState(0);
    const [onlineStatusClicks, setOnlineStatusClicks] = useState(0);
    const [sourceClicks, setSourceClicks] = useState(0);
    const [statChangeClicks, setStatChangeClicks] = useState(0);
    const [buttonClicks, setButtonClicks] = useState(0);

    return (
      <Flex gap="sm" wrap width="100%">
        <Card padding="md" width="sm">
          <Title size={4} text="Body" />
          <InteractiveExample
              count={bodyClicks}
              label="Body"
              reset={() => setBodyClicks(0)}
          >
            <Body
                cursor="pointer"
                htmlOptions={{
                  ...clickableDemoHtmlOptions,
                  role: "button",
                  tabIndex: 0,
                }}
                onClick={() => setBodyClicks((prev: number) => prev + 1)}
                text="Click this Body example"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Card" />
          <InteractiveExample
              count={cardClicks}
              label="Card"
              reset={() => setCardClicks(0)}
          >
            <Card
                cursor="pointer"
                htmlOptions={clickableDemoHtmlOptions}
                onClick={() => setCardClicks((prev: number) => prev + 1)}
                padding="sm"
            >
              {"Click this Card example"}
            </Card>
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Flex" />
          <InteractiveExample
              count={flexClicks}
              label="Flex"
              reset={() => setFlexClicks(0)}
          >
            <Flex
                alignItems="center"
                background="light"
                borderRadius="sm"
                cursor="pointer"
                gap="xs"
                htmlOptions={clickableDemoHtmlOptions}
                onClick={() => setFlexClicks((prev: number) => prev + 1)}
                padding="sm"
            >
              <Body text="Click this Flex example" />
            </Flex>
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Title" />
          <InteractiveExample
              count={titleClicks}
              label="Title"
              reset={() => setTitleClicks(0)}
          >
            <Title
                cursor="pointer"
                htmlOptions={{
                  ...clickableDemoHtmlOptions,
                  role: "button",
                  tabIndex: 0,
                }}
                onClick={() => setTitleClicks((prev: number) => prev + 1)}
                size={4}
                text="Click this Title example"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Label Pill" />
          <InteractiveExample
              count={labelPillClicks}
              label="Label Pill"
              reset={() => setLabelPillClicks(0)}
          >
            <LabelPill
                htmlOptions={clickablePointerHtmlOptions}
                label="Queue"
                onClick={() => setLabelPillClicks((prev: number) => prev + 1)}
                pillValue="4"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Pill" />
          <InteractiveExample
              count={pillClicks}
              label="Pill"
              reset={() => setPillClicks(0)}
          >
            <Pill
                cursor="pointer"
                htmlOptions={clickableDemoHtmlOptions}
                onClick={() => setPillClicks((prev: number) => prev + 1)}
                text="Click this Pill example"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Online Status" />
          <InteractiveExample
              count={onlineStatusClicks}
              label="Online Status"
              reset={() => setOnlineStatusClicks(0)}
          >
            <OnlineStatus
                cursor="pointer"
                htmlOptions={clickableDemoHtmlOptions}
                onClick={() => setOnlineStatusClicks((prev: number) => prev + 1)}
                size="lg"
                status="online"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Source" />
          <InteractiveExample
              count={sourceClicks}
              label="Source"
              reset={() => setSourceClicks(0)}
          >
            <Source
                htmlOptions={clickablePointerHtmlOptions}
                onClick={() => setSourceClicks((prev: number) => prev + 1)}
                source="Click this Source example"
                type="retail"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Stat Change" />
          <InteractiveExample
              count={statChangeClicks}
              label="Stat Change"
              reset={() => setStatChangeClicks(0)}
          >
            <StatChange
                change="increase"
                htmlOptions={clickablePointerHtmlOptions}
                onClick={() => setStatChangeClicks((prev: number) => prev + 1)}
                value="12.4"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Button (kit-specific)" />
          <InteractiveExample
              count={buttonClicks}
              label="Button"
              reset={() => setButtonClicks(0)}
          >
            <Button
                onClick={() => setButtonClicks((prev: number) => prev + 1)}
                text="Uses kit-specific onClick"
            />
          </InteractiveExample>
        </Card>
      </Flex>
    );
  };

  return (
    <ShowPage
      pageType="global_event_props"
      title="onClick"
      description={
        <>
          <code>onClick</code> is a Global Event Prop for React kits that opt
          into <code>GlobalEventProps</code>. It attaches a mouse event handler
          to the kit&apos;s root element and is separate from the class-based
          Global Props system. Rails kits do not support it — event handlers are
          JavaScript callbacks, so they belong in React rather than server-rendered
          props.
        </>
      }
      descriptionSecondary={
        <>
          Kits that already define their own <code>onClick</code> keep that
          kit-specific API and behavior. Use{" "}
          <code>cursor=&quot;pointer&quot;</code> and, when needed,{" "}
          <code>htmlOptions</code> for accessibility attributes like{" "}
          <code>role</code> and <code>tabIndex</code>.
        </>
      }
      VisualGuideCard={VisualGuideCard()}
    >
      <PropsExamplesTable
        headers={["Supported Kit", "Type", "React Example", "Notes"]}
        rows={[
          [
            "Body",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-body-react"
              text={`<Body onClick={() => alert("clicked")} text="Clickable body" />`}
            />,
            "Attached to the root Body element.",
          ],
          [
            "Card",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-card-react"
              text={`<Card onClick={() => alert("clicked")} cursor="pointer">Content</Card>`}
            />,
            "Attached to the root Card tag.",
          ],
          [
            "Flex",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-flex-react"
              text={`<Flex onClick={() => alert("clicked")} cursor="pointer">...</Flex>`}
            />,
            "Attached to the root Flex div.",
          ],
          [
            "Title",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-title-react"
              text={`<Title onClick={() => alert("clicked")} cursor="pointer" text="Clickable title" />`}
            />,
            "Attached to the root Title tag.",
          ],
          [
            "Label Pill",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-label-pill-react"
              text={`<LabelPill label="Queue" onClick={() => alert("clicked")} pillValue="4" />`}
            />,
            "Attached to the root Label Pill element.",
          ],
          [
            "Pill",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-pill-react"
              text={`<Pill cursor="pointer" onClick={() => alert("clicked")} text="Clickable pill" />`}
            />,
            "Attached to the root Pill element.",
          ],
          [
            "Online Status",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-online-status-react"
              text={`<OnlineStatus cursor="pointer" onClick={() => alert("clicked")} status="online" />`}
            />,
            "Attached to the root Online Status element.",
          ],
          [
            "Source",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-source-react"
              text={`<Source onClick={() => alert("clicked")} source="Retail" type="retail" />`}
            />,
            "Attached to the root Source element.",
          ],
          [
            "Stat Change",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-stat-change-react"
              text={`<StatChange change="increase" onClick={() => alert("clicked")} value="12.4" />`}
            />,
            "Attached to the root element when value is set.",
          ],
        ]}
      />

      <Card padding="md">
        <Title size={3} text="Precedence with htmlOptions" />
        <Body marginBottom="sm">
          When both are provided, the first-class <code>onClick</code> wins.
          If you omit the first-class prop, <code>htmlOptions.onClick</code>{" "}
          continues to work as before.
        </Body>
      </Card>

      <Card padding="md">
        <Title size={3} text="Kits with kit-specific onClick" />
        <Body marginBottom="sm">
          These kits already expose <code>onClick</code> with their own typing
          and target element. Global Event Props does not change them.
        </Body>
        <Table size="sm">
          <Table.Head>
            <Table.Row>
              <Table.Header>{"Kit"}</Table.Header>
              <Table.Header>{"Signature / Target"}</Table.Header>
              <Table.Header>{"Notes"}</Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{"Button"}</Table.Cell>
              <Table.Cell>{"Mouse event on <button> only"}</Table.Cell>
              <Table.Cell>{"Not attached when Button renders as a link."}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{"CircleIconButton"}</Table.Cell>
              <Table.Cell>{"Mouse event on inner Button"}</Table.Cell>
              <Table.Cell>{"htmlOptions apply to the wrapper; onClick belongs to the inner Button."}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{"FormPill"}</Table.Cell>
              <Table.Cell>{"Mouse event on close icon only"}</Table.Cell>
              <Table.Cell>{"The pill body is not the click target."}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{"Nav / Nav.Item"}</Table.Cell>
              <Table.Cell>{"() => void on title / item"}</Table.Cell>
              <Table.Cell>{"Targets navigation controls, not a generic root click."}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{"StarRating"}</Table.Cell>
              <Table.Cell>{"(value: number) => void on stars"}</Table.Cell>
              <Table.Cell>{"Different signature from a mouse event handler."}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{"Collapsible"}</Table.Cell>
              <Table.Cell>{"() => void via main area"}</Table.Cell>
              <Table.Cell>{"Participates in toggle behavior."}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card>

      <PropsExamplesTable
        headers={["Conflict Case", "Result", "Reason"]}
        rows={[
          [
            "Supported kit + htmlOptions.onClick",
            "First-class onClick wins",
            "globalEventProps is spread after htmlOptions.",
          ],
          [
            "Kit-specific onClick + htmlOptions.onClick",
            "Kit-specific behavior stays",
            "Existing implementations remain unchanged.",
          ],
          [
            "Nested clickable kits",
            "Both can fire",
            "Normal React event bubbling applies unless stopped.",
          ],
        ]}
      />
    </ShowPage>
  );
};

export default OnClick;
