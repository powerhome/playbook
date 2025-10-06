import { Flex, Card, Body } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import * as CursorImages from "./CursorImages"

console.log(CursorImages);

const Cursor = () => {
  const values = [
    "auto",
    "default",
    "none",
    "contextMenu",
    "help",
    "pointer",
    "progress",
    "wait",
    "cell",
    "crosshair",
    "text",
    "verticalText",
    "alias",
    "copy",
    "move",
    "noDrop",
    "notAllowed",
    "grab",
    "grabbing",
    "eResize",
    "nResize",
    "neResize",
    "nwResize",
    "sResize",
    "seResize",
    "swResize",
    "wResize",
    "ewResize",
    "nsResize",
    "neswResize",
    "nwseResize",
    "colResize",
    "rowResize",
    "allScroll",
    "zoomIn",
    "zoomOut",
  ];


  const VisualGuideCard = () => {
    const cursorPairs = values.map(name => [name, (CursorImages as Record<string, string>)[name]]);

    return (
      <Flex width="100%" gap="sm" wrap>
        {cursorPairs.map(([name, image]) => (
          <Card
            key={name}
            className="visual_guide_card_hover"
            display="flex"
            alignItems="center"
            justifyContent="center"
            background="light"
          >
            <img src={image} alt={`${name} cursor example`} />
            <Body text={name} />
          </Card>
        ))}
      </Flex>
    );
  };

  const ValuesCards = () => {
    return (
      <Flex gap="xs" wrap>
        {values.map((value) => (
          <ExampleCodeCard key={value} text={value} copyIcon={false} />
        ))}
      </Flex>
    );
  };

  return (
    <>
      <ShowPage
        title="Cursor"
        description={
          <>
            The Cursor prop controls the appearance of the mouse pointer when it
            hovers over an element. It’s used to indicate the expected
            interaction—such as showing a pointer for clickable elements or a
            not-allowed cursor for disabled ones. This helps guide user behavior
            and reinforces component states. For more information on Cursor prop
            controls, refer to the{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/cursor"
              target="_blank"
            >
              MDN document found here.
            </a>
          </>
        }
        VisualGuideCard={VisualGuideCard()}
      >
        <PropsExamplesTable
          headers={[
            "Cursor",
            "Type",
            "Values",
            "Rails Example",
            "React Example",
          ]}
          rows={[
            [
              "Cursor",
              <ExampleCodeCard text="union" copyIcon={false} />,
              <ValuesCards />,
              <ExampleCodeCard id="cursor-rails" text="cursor:'notAllowed'" />,
              <ExampleCodeCard id="cursor-react" text="cursor='notAllowed'" />,
            ],
          ]}
        />
      </ShowPage>
    </>
  );
};

export default Cursor;
