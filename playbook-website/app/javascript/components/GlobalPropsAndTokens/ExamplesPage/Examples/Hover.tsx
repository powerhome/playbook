import { Flex, Card } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const Hover = () => {
  const shadowValues = ["deep", "deeper", "deepest"];
  const scaleValues = ["sm", "md", "lg"];

  const ValuesCards = ({ values }: { values: string[] }) => (
    <Flex gap="xs" wrap>
      {values.map((value) => (
        <ExampleCodeCard key={value} text={value} copyIcon={false} />
      ))}
    </Flex>
  );

  const VisualGuideExample = ({ text, hoverProp }: any) => {
    return (
      <>
        <Card
          className="visual_guide_card_hover"
          display="flex"
          alignItems="center"
          justifyContent="center"
          hover={hoverProp}
          background="light"
        >
          {text}
        </Card>
      </>
    );
  };

  const VisualGuideCard = () => {
    return (
      <Flex gap="sm" wrap>
        <VisualGuideExample text="Color" hoverProp={{ color: "red" }} />
        <VisualGuideExample
          text="Background"
          hoverProp={{ background: "slate" }}
        />
        <VisualGuideExample text="Shadow" hoverProp={{ shadow: "deep" }} />
        <VisualGuideExample text="Scale" hoverProp={{ scale: "md" }} />
        <VisualGuideExample
          text="Visibility"
          hoverProp={{ visibility: "false" }}
        />
        <VisualGuideExample
          text="Underline"
          hoverProp={{ underline: "true" }}
        />
      </Flex>
    );
  };

  return (
    <ShowPage
      title="Hover"
      description={
        <>
          The Hover prop allows components to visually respond to pointer
          interactions. It enables hover-based changes like increased shadow,
          scale transformations, or underlining, helping indicate interactivity
          and improving user feedback. For more information on Hover prop
          controls, refer to the{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/:hover"
            target="_blank"
          >
            MDN document found here.
          </a>
        </>
      }
      VisualGuideCard={VisualGuideCard()}
    >
      <PropsExamplesTable
        headers={["Hover", "Type", "Values", "Rails Example", "React Example"]}
        rows={[
          [
            "Color",
            <ExampleCodeCard text="string" copyIcon={false} />,
            <ExampleCodeCard text="${color}" copyIcon={false} />,
            <ExampleCodeCard
              id="hover-color-rails"
              text="hover: {color: 'red'}"
            />,
            <ExampleCodeCard
              id="hover-color-react"
              text="hover= {{color:'red'}}"
            />,
          ],
          [
            "Background",
            <ExampleCodeCard text="string" copyIcon={false} />,
            <ExampleCodeCard text="${background}" copyIcon={false} />,
            <ExampleCodeCard
              id="hover-background-rails"
              text="hover: {background: 'slate'}"
            />,
            <ExampleCodeCard
              id="hover-background-react"
              text="hover= {{background:'slate'}}"
            />,
          ],
          [
            "Shadow",
            <ExampleCodeCard text="union" copyIcon={false} />,
            <ValuesCards values={shadowValues} />,
            <ExampleCodeCard
              id="hover-shadow-rails"
              text="hover: {shadow: 'deep'}"
            />,
            <ExampleCodeCard
              id="hover-shadow-react"
              text="hover= {{shadow:'deep'}}"
            />,
          ],
          [
            "Scale",
            <ExampleCodeCard text="union" copyIcon={false} />,
            <ValuesCards values={scaleValues} />,
            <ExampleCodeCard
              id="hover-scale-rails"
              text="hover: {scale: 'md'}"
            />,
            <ExampleCodeCard
              id="hover-scale-react"
              text="hover= {{scale:'md'}}"
            />,
          ],
          [
            "Visibility",
            <ExampleCodeCard text="boolean" copyIcon={false} />,
            <ValuesCards values={["true", "false"]} />,
            <ExampleCodeCard
              id="hover-visibility-rails"
              text="hover: {visibility: 'true'}"
            />,
            <ExampleCodeCard
              id="hover-visibility-react"
              text="hover= {{visibility:'true'}}"
            />,
          ],
          [
            "Underline",
            <ExampleCodeCard text="boolean" copyIcon={false} />,
            <ValuesCards values={["true", "false"]} />,
            <ExampleCodeCard
              id="hover-underline-rails"
              text="hover: {underline: 'true'}"
            />,
            <ExampleCodeCard
              id="hover-underline-react"
              text="hover= {{underline:'true'}}"
            />,
          ],
        ]}
      />
    </ShowPage>
  );
};

export default Hover;
