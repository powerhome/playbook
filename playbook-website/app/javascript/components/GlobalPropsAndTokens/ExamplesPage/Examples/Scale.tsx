import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const Scale = () => {
  return (
    <>
      <ShowPage
        pageType="tokens"
        title="Scale"
        description="Scale tokens apply transformation scaling to enlarge or shrink elements. Commonly used for interactive effects like hover and tap feedback."
      >
        <PropsExamplesTable
          headers={["Token", "Value", "SASS Example"]}
          rows={[
            [
              "$scale_sm",
              "scale(1.05)",
              <ExampleCodeCard
                id="scale-sm"
                text="scale: $scale_sm;"
              />
            ],
            [
              "$scale_md",
              "scale(1.1)",
              <ExampleCodeCard
                id="scale-md"
                text="scale: $scale_md;"
              />
            ],
            [
              "$scale_lg",
              "scale(1.15)",
              <ExampleCodeCard
                id="scale-lg"
                text="scale: $scale_lg;"
              />
            ],
          ]}
        >

        </PropsExamplesTable>
      </ShowPage>
    </>
  )
}

export default Scale;