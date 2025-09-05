import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const BorderRadius = () => {
  return (
    <>
      <ShowPage
        pageType="tokens"
        title="Border Radius"
        description="Border Radius tokens define the curvature of element corners, supporting rounded shapes from subtle to fully circular."
      >
        <PropsExamplesTable
          headers={["Token", "Value", "SASS Example"]}
          rows={[
            [
              "$border_rad_lightest",
              "1px",
              <ExampleCodeCard
                id="border-rad-lightest"
                text="border-radius: $border_rad_lightest;"
              />
            ],
            [
              "$border_rad_lighter",
              "2px",
              <ExampleCodeCard
                id="border-rad-lighter"
                text="border-radius: $border_rad_lighter;"
              />
            ],
            [
              "$border_rad_light",
              "4px",
              <ExampleCodeCard
                id="border-rad-light"
                text="border-radius: $border_rad_light;"
              />
            ],
            [
              "$border_rad_normal",
              "0",
              <ExampleCodeCard
                id="border-rad-normal"
                text="border-radius: $border_rad_normal;"
              />
            ],
            [
              "$border_rad_heavy",
              "5px",
              <ExampleCodeCard
                id="border-rad-heavy"
                text="border-radius: $border_rad_heavy;"
              />
            ],
            [
              "$border_rad_heavier",
              "6px",
              <ExampleCodeCard
                id="border-rad-heavier"
                text="border-radius: $border_rad_heavier;"
              />
            ],
            [
              "$border_rad_heaviest",
              "7px",
              <ExampleCodeCard
                id="border-rad-heaviest"
                text="border-radius: $border_rad_heaviest;"
              />
            ],
            [
              "$border_rad_mega",
              "1000px",
              <ExampleCodeCard
                id="border-rad-mega"
                text="border-radius: $border_rad_mega;"
              />
            ],
            [
              "$border_rad_xs",
              "4px",
              <ExampleCodeCard
                id="border-rad-xs"
                text="border-radius: $border_rad_xs;"
              />
            ],
            [
              "$border_rad_sm",
              "4px",
              <ExampleCodeCard
                id="border-rad-sm"
                text="border-radius: $border_rad_sm;"
              />
            ],
            [
              "$border_rad_md",
              "6px",
              <ExampleCodeCard
                id="border-rad-md"
                text="border-radius: $border_rad_md;"
              />
            ],
            [
              "$border_rad_lg",
              "8px",
              <ExampleCodeCard
                id="border-rad-lg"
                text="border-radius: $border_rad_lg;"
              />
            ],
            [
              "$border_rad_lightest",
              "1px",
              <ExampleCodeCard
                id="border-rad-lightest"
                text="border-radius: $border_rad_lightest;"
              />
            ],
            [
              "$border_rad_xl",
              "16px",
              <ExampleCodeCard
                id="border-rad-xl"
                text="border-radius: $border_rad_xl;"
              />
            ],
            [
              "$border_rad_rounded",
              "1000px",
              <ExampleCodeCard
                id="border-rad-rounded"
                text="border-radius: $border_rad_rounded;"
              />
            ],
            [
              "$border_rad_none",
              "0",
              <ExampleCodeCard
                id="border-rad-none"
                text="border-radius: $border_rad_none;"
              />
            ],
          ]}
        >

        </PropsExamplesTable>
      </ShowPage>
    </>
  )
}

export default BorderRadius;