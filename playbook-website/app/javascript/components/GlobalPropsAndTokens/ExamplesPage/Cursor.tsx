import { Flex, Image } from "playbook-ui";
import ShowPage from "../Templates/ShowPage";
import PropsExamplesTable from "../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../Templates/Subcomponents/ExampleCodeCard";

const Cursor = () => {
  const VisualGuideCard = () => {

    const images = Array.from({ length: 36 })
    return (
      <Flex width="100%" gap="sm" wrap>
        {images.map((_, index) => (
        <Image
          key={index}
          alt={`placeholder image ${index + 1}`}
          size="lg"
          url={`https://unsplash.it/500/400/?image=634`}
        />
      ))}
      </Flex>
    );
  };

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
