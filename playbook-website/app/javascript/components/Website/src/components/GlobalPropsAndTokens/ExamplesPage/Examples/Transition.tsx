import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const Transition = () => {
  return (
    <>
      <ShowPage
        pageType="tokens"
        title="Transition"
        description="Transition tokens define animation timing and easing values used in motion design. Applied to properties like opacity, color, or scale to create smooth interactions."
      >
        <PropsExamplesTable
          headers={["Token", "Value", "SASS Example"]}
          rows={[
            [
              "$transition_default",
              "0.3s",
              <ExampleCodeCard
                id="transition-default"
                text="transition: opacity $transition_default $ease;"
              />,
            ],
            [
              "$transition_short",
              "0.15s",
              <ExampleCodeCard
                id="transition-short"
                text="transition: opacity $transition_short $ease;"
              />,
            ],
            [
              "$transition_cubic",
              "0.2s cubic-bezier(0.95, 0.05, 0.795, 0.035)",
              <ExampleCodeCard
                id="transition-cubic"
                text="transition: opacity $transition_cubic $ease;"
              />,
            ],
          ]}
        />
      </ShowPage>
    </>
  );
};

export default Transition;
