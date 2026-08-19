import { useState } from "react";
import { Body, Button, Card, Flex, Title, Table } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const OnClick = () => {
  const ClickableBody = Body as any;
  const ClickableCard = Card as any;
  const ClickableFlex = Flex as any;
  const ClickableTitle = Title as any;

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
    const [buttonClicks, setButtonClicks] = useState(0);

    return (
      <Flex gap="sm" wrap width="100%">
        <Card padding="md" width="sm">
          <Title size={4} text="Body (POC)" />
          <InteractiveExample
              count={bodyClicks}
              label="Body"
              reset={() => setBodyClicks(0)}
          >
            <ClickableBody
                cursor="pointer"
                htmlOptions={{ role: "button", tabIndex: 0 }}
                onClick={() => setBodyClicks((prev: number) => prev + 1)}
                text="Click this Body example"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Card (POC)" />
          <InteractiveExample
              count={cardClicks}
              label="Card"
              reset={() => setCardClicks(0)}
          >
            <ClickableCard
                cursor="pointer"
                onClick={() => setCardClicks((prev: number) => prev + 1)}
                padding="sm"
            >
              {"Click this Card example"}
            </ClickableCard>
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Flex (POC)" />
          <InteractiveExample
              count={flexClicks}
              label="Flex"
              reset={() => setFlexClicks(0)}
          >
            <ClickableFlex
                alignItems="center"
                background="light"
                borderRadius="sm"
                cursor="pointer"
                gap="xs"
                onClick={() => setFlexClicks((prev: number) => prev + 1)}
                padding="sm"
            >
              <Body text="Click this Flex example" />
            </ClickableFlex>
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Title (POC)" />
          <InteractiveExample
              count={titleClicks}
              label="Title"
              reset={() => setTitleClicks(0)}
          >
            <ClickableTitle
                cursor="pointer"
                htmlOptions={{ role: "button", tabIndex: 0 }}
                onClick={() => setTitleClicks((prev: number) => prev + 1)}
                size={4}
                text="Click this Title example"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Button (existing API)" />
          <InteractiveExample
              count={buttonClicks}
              label="Button"
              reset={() => setButtonClicks(0)}
          >
            <Button
                onClick={() => setButtonClicks((prev: number) => prev + 1)}
                text="Button API stays the same"
            />
          </InteractiveExample>
        </Card>
      </Flex>
    );
  };

  return (
    <ShowPage
      title="onClick"
      description={
        <>
          This page documents a React-only proof of concept for exposing{" "}
          <code>onClick</code> as a first-class global prop on kits that do not
          already define their own <code>onClick</code> behavior. It is not part
          of the existing class-based Global Props pipeline, and Rails remains
          out of scope.
        </>
      }
      descriptionSecondary={
        <>
          The goal is consistency for simple presentational kits with a clear
          root element, while preserving kit-specific click behavior where it
          already exists. Existing kits with their own <code>onClick</code> may
          differ in typing, target element, and behavior.
        </>
      }
      VisualGuideCard={VisualGuideCard()}
    >
      <PropsExamplesTable
        headers={["POC Kit", "Type", "React Example", "Notes"]}
        rows={[
          [
            "Body",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-body-react"
              text={`<Body onClick={() => alert("clicked")} text="Clickable body" />`}
            />,
            "Attached to the root Body element in the POC.",
          ],
          [
            "Card",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-card-react"
              text={`<Card onClick={() => alert("clicked")} cursor="pointer">Content</Card>`}
            />,
            "Attached to the root Card tag in the POC.",
          ],
          [
            "Flex",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-flex-react"
              text={`<Flex onClick={() => alert("clicked")} cursor="pointer">...</Flex>`}
            />,
            "Attached to the root Flex div in the POC.",
          ],
          [
            "Title",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-title-react"
              text={`<Title onClick={() => alert("clicked")} cursor="pointer" text="Clickable title" />`}
            />,
            "Attached to the root Title tag in the POC.",
          ],
        ]}
      />

      <Card padding="md">
        <Title size={3} text="Current POC Scope" />
        <Body>
          Only <strong>Body</strong>, <strong>Card</strong>, <strong>Flex</strong>,
          {" "}and <strong>Title</strong> were updated in this branch. This page
          intentionally documents the proof of concept rather than implying a
          full repo-wide rollout.
        </Body>
      </Card>

      <Card padding="md">
        <Title size={3} text="Differences From Existing Kit-Specific onClick" />
        <Table size="sm">
          <Table.Head>
            <Table.Row>
              <Table.Header>{"Kit"}</Table.Header>
              <Table.Header>{"Signature / Target"}</Table.Header>
              <Table.Header>{"Difference"}</Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{"Button"}</Table.Cell>
              <Table.Cell>{"Mouse event on <button> only"}</Table.Cell>
              <Table.Cell>{"When Button renders a link, its kit-specific onClick is not attached to the <a> path."}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{"CircleIconButton"}</Table.Cell>
              <Table.Cell>{"Mouse event on inner Button"}</Table.Cell>
              <Table.Cell>{"htmlOptions live on the wrapper, but the kit-specific onClick belongs to the inner Button."}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{"FormPill"}</Table.Cell>
              <Table.Cell>{"Mouse event on close icon only"}</Table.Cell>
              <Table.Cell>{"The pill body is not the click target."}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{"Nav"}</Table.Cell>
              <Table.Cell>{"() => void on title link only"}</Table.Cell>
              <Table.Cell>{"The nav root itself is not the click target."}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{"Nav.Item"}</Table.Cell>
              <Table.Cell>{"() => void on item / collapsible behavior"}</Table.Cell>
              <Table.Cell>{"Disabled state and collapsible behavior change how clicks are handled."}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{"StarRating"}</Table.Cell>
              <Table.Cell>{"(value: number) => void on stars"}</Table.Cell>
              <Table.Cell>{"This is the key typing conflict that prevents putting onClick into the shared CSS GlobalProps type."}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{"Collapsible"}</Table.Cell>
              <Table.Cell>{"() => void via context-driven main area"}</Table.Cell>
              <Table.Cell>{"Its click logic participates in toggle behavior rather than acting like a simple root DOM click."}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{"ButtonToolbar"}</Table.Cell>
              <Table.Cell>{"Typed publicly, not currently wired"}</Table.Cell>
              <Table.Cell>{"This prop exists in the API but is not attached to the root today."}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card>

      <PropsExamplesTable
        headers={["Conflict Case", "Result", "Reason"]}
        rows={[
          [
            "POC kit + htmlOptions.onClick",
            "First-class onClick wins",
            "The helper is spread after htmlOptions.",
          ],
          [
            "Kit-specific onClick + htmlOptions.onClick",
            "Kit-specific behavior stays",
            "Existing implementations remain unchanged.",
          ],
          [
            "Nested clickable kits",
            "Both can fire",
            "Normal React event bubbling still applies unless propagation is stopped.",
          ],
        ]}
      />

      <Card padding="md">
        <Title size={3} text="Recommendation" />
        <Body>
          If Playbook moves forward with a first-class global <code>onClick</code>,
          it should be a React-only helper applied selectively to kits with a
          clear root element. Kits that already define their own click behavior
          should keep their existing APIs and semantics.
        </Body>
      </Card>
    </ShowPage>
  );
};

export default OnClick;
