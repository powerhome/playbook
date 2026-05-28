import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const ZIndex = () => {
  return (
    <>
      <ShowPage
        pageType="tokens"
        title="Z-Index"
        description="Z-Index tokens manage the stacking order of elements along the z-axis, often used for overlays and layered UI components."
      >
        <PropsExamplesTable
          headers={["Token", "Value", "SASS Example"]}
          rows={[
            [
              "$z_1",
              "100",
              <ExampleCodeCard
                id="z-index-1"
                text="z-index: $z_1;"
              />
            ],
            [
              "$z_2",
              "200",
              <ExampleCodeCard
                id="z-index-2"
                text="z-index: $z_2;"
              />
            ],
            [
              "$z_3",
              "300",
              <ExampleCodeCard
                id="z-index-3"
                text="z-index: $z_3;"
              />
            ],
            [
              "$z_4",
              "400",
              <ExampleCodeCard
                id="z-index-4"
                text="z-index: $z_4;"
              />
            ],
            [
              "$z_5",
              "500",
              <ExampleCodeCard
                id="z-index-5"
                text="z-index: $z_5;"
              />
            ],
            [
              "$z_6",
              "600",
              <ExampleCodeCard
                id="z-index-6"
                text="z-index: $z_6;"
              />
            ],
            [
              "$z_7",
              "700",
              <ExampleCodeCard
                id="z-index-7"
                text="z-index: $z_7;"
              />
            ],
            [
              "$z_8",
              "800",
              <ExampleCodeCard
                id="z-index-8"
                text="z-index: $z_8;"
              />
            ],
            [
              "$z_9",
              "900",
              <ExampleCodeCard
                id="z-index-9"
                text="z-index: $z_9;"
              />
            ],
            [
              "$z_10",
              "1000",
              <ExampleCodeCard
                id="z-index-10"
                text="z-index: $z_10;"
              />
            ],
            [
              "max",
              "999999",
              <ExampleCodeCard
                id="z-index-max"
                text="z-index: $z_max;"
              />
            ],
            [
              "header",
              "1000",
              <ExampleCodeCard
                id="z-index-header"
                text='z-index: z_index_for("header");'
              />
            ],
            [
              "default",
              "0",
              <ExampleCodeCard
                id="z-index-default"
                text='z-index: z_index_for("default");'
              />
            ],
          ]}
        >

        </PropsExamplesTable>
      </ShowPage>
    </>
  )
}

export default ZIndex;