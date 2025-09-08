import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const Opacity = () => {
  return (
    <>
      <ShowPage
        pageType="tokens"
        title="Opacity"
        description="Opacity tokens control the transparency of elements. Commonly used for visual states like disabled, hover, or layering effects."
      >
        <PropsExamplesTable
          headers={["Tokens", "Value", "SASS Example"]}
          rows={[
            ["$opacity_1", ".1", <ExampleCodeCard id="opacity-1" text="opacity: $opacity_1;" />],
            ["$opacity_2", ".2", <ExampleCodeCard id="opacity-2" text="opacity: $opacity_2;" />],
            ["$opacity_3", ".3", <ExampleCodeCard id="opacity-3" text="opacity: $opacity_3;" />],
            ["$opacity_4", ".4", <ExampleCodeCard id="opacity-4" text="opacity: $opacity_4;" />],
            ["$opacity_5", ".5", <ExampleCodeCard id="opacity-5" text="opacity: $opacity_5;" />],
            ["$opacity_6", ".6", <ExampleCodeCard id="opacity-6" text="opacity: $opacity_6;" />],
            ["$opacity_7", ".7", <ExampleCodeCard id="opacity-7" text="opacity: $opacity_7;" />],
            ["$opacity_8", ".8", <ExampleCodeCard id="opacity-8" text="opacity: $opacity_8;" />],
            ["$opacity_9", ".9", <ExampleCodeCard id="opacity-9" text="opacity: $opacity_9;" />],
            ["$opacity_10", "1", <ExampleCodeCard id="opacity-10" text="opacity: $opacity_10;" />],
          ]}
        />
      </ShowPage>
    </>
  );
};

export default Opacity;
