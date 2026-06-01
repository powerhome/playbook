import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const Overflow = () => {
  return (
    <>
      <ShowPage
        pageType="tokens"
        title="Overflow"
        description="Overflow tokens manage how content behaves when it exceeds its container bounds. Aligns with standard CSS overflow properties like hidden, scroll, and auto."
      >
        <PropsExamplesTable
          headers={["Token", "Value", "SASS Example"]}
          rows={[
            [
              "$visible",
              "visible",
              <ExampleCodeCard
                id="overflow-visible"
                text="overflow: $visible;"
              />
            ],
            [
              "$hidden",
              "hidden",
              <ExampleCodeCard
                id="overflow-hidden"
                text="overflow: $hidden;"
              />
            ],
            [
              "$scroll",
              "scroll",
              <ExampleCodeCard
                id="overflow-scroll"
                text="overflow: $scroll;"
              />
            ],
            [
              "$auto",
              "auto",
              <ExampleCodeCard
                id="overflow-auto"
                text="overflow: $auto;"
              />
            ],
          ]}
        >

        </PropsExamplesTable>
      </ShowPage>
    </>
  )
}

export default Overflow;