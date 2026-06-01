import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const LineHeight = () => {
  return (
    <>
      <ShowPage
        pageType="tokens"
        title="Line Height"
        description="Line-Height tokens set the vertical spacing between lines of text. These values help maintain visual rhythm and improve text readability across different font sizes and components."
      >
        <PropsExamplesTable
          headers={["Token", "Value", "SASS Example"]}
          rows={[
            [
              "$lh_tightest",
              "1",
              <ExampleCodeCard
                id="lh-tightest"
                text="line-height: $lh_tightest;"
              />
            ],
            [
              "$lh_tighter",
              "1.2",
              <ExampleCodeCard
                id="lh-tighter"
                text="line-height: $lh_tighter;"
              />
            ],
            [
              "$lh_tight",
              "1.4",
              <ExampleCodeCard
                id="lh-tight"
                text="line-height: $lh_tight;"
              />
            ],
            [
              "$lh_normal",
              "1.5",
              <ExampleCodeCard
                id="lh-normal"
                text="line-height: $lh_normal;"
              />
            ],
            [
              "$lh_loose",
              "1.6",
              <ExampleCodeCard
                id="lh-loose"
                text="line-height: $lh_loose;"
              />
            ],
            [
              "$lh_looser",
              "1.8",
              <ExampleCodeCard
                id="lh-looser"
                text="line-height: $lh_looser;"
              />
            ],
            [
              "$lh_loosest",
              "2",
              <ExampleCodeCard
                id="lh-loosest"
                text="line-height: $lh_loosest;"
              />
            ],
          ]}
        >

        </PropsExamplesTable>
      </ShowPage>
    </>
  )
}

export default LineHeight;