import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const Position = () => {
  return (
    <>
      <ShowPage
        pageType="tokens"
        title="Position"
        description="Position tokens control how an element is placed within its parent or the viewport. Most values align with CSS position properties; $offscreen is a custom utility for visually hiding elements."
      >
        <PropsExamplesTable
          headers={["Token", "Value", "SASS Example"]}
          rows={[
            [
              "$relative",
              "relative",
              <ExampleCodeCard
                id="position-relative"
                text="position: $relative;"
              />
            ],
            [
              "$absolute",
              "absolute",
              <ExampleCodeCard
                id="position-absolute"
                text="position: $absolute;"
              />
            ],
            [
              "$fixed",
              "fixed",
              <ExampleCodeCard
                id="position-fixed"
                text="position: $fixed;"
              />
            ],
            [
              "$sticky",
              "sticky",
              <ExampleCodeCard
                id="position-sticky"
                text="position: $sticky;"
              />
            ],
            [
              "$static",
              "static",
              <ExampleCodeCard
                id="position-static"
                text="position: $static;"
              />
            ],
            [
              "$offscreen",
              "-9999px",
              <ExampleCodeCard
                id="position-offscreen"
                text="left: $offscreen;"
              />
            ],
          ]}
        >

        </PropsExamplesTable>
      </ShowPage>
    </>
  )
}

export default Position;