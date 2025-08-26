import { Flex } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const Hover = () => {

    const shadowValues = ["deep", "deeper", "deepest"];
    const ShadowValuesCard = () => (
      <Flex gap="xs" wrap>
        {shadowValues.map((value) => (
          <ExampleCodeCard key={value} text={value} copyIcon={false} />
        ))}
      </Flex>
    );


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
    >
      <PropsExamplesTable
        headers={["Hover", "Type", "Values", "Rails Example", "React Example"]}
        rows={[
          [
            "Color",
            <ExampleCodeCard text="string" copyIcon={false} />,
            <ExampleCodeCard text="${color}" copyIcon={false} />,
            <ExampleCodeCard id="hover-color-rails" text="hover: {color: 'red'}" />,
            <ExampleCodeCard id="hover-color-react" text="hover= {{color:'red'}}" />,
          ],
                    [
            "Background",
            <ExampleCodeCard text="string" copyIcon={false} />,
            <ExampleCodeCard text="${background}" copyIcon={false} />,
            <ExampleCodeCard id="hover-background-rails" text="hover: {background: 'slate'}" />,
            <ExampleCodeCard id="hover-background-react" text="hover= {{background:'slate'}}" />,
          ],
          [
            "Shadow",
            <ExampleCodeCard text="union" copyIcon={false} />,
            <ShadowValuesCard />,
            <ExampleCodeCard id="hover-shadow-rails" text="hover: {shadow: 'deep'}" />,
            <ExampleCodeCard id="hover-shadow-react" text="hover= {{shadow:'deep'}}" />,
          ],

        ]}
      />
    </ShowPage>
  );
};

export default Hover;
