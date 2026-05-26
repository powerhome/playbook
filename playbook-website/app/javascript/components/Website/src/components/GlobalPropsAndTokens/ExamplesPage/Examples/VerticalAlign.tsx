import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const VerticalAlign = () => {
  return (
    <>
      <ShowPage
        pageType="tokens"
        title="Vertical Align"
        description="Vertical-Align tokens control the vertical alignment of inline or table-cell elements. Values align with standard CSS vertical-align properties."
      >
        <PropsExamplesTable
          headers={["Tokens", "Value", "SASS Example"]}
          rows={[
            [
              "$vertical_align_baseline",
              "baseline",
              <ExampleCodeCard
                id="vertical-align-baseline"
                text="vertical-align: $vertical_align_baseline;"
              />,
            ],
            [
              "$vertical_align_sub",
              "sub",
              <ExampleCodeCard
                id="vertical-align-sub"
                text="vertical-align: $vertical_align_sub;"
              />,
            ],
            [
              "$vertical_align_super",
              "super",
              <ExampleCodeCard
                id="vertical-align-super"
                text="vertical-align: $vertical_align_super;"
              />,
            ],
            [
              "$vertical_align_text_top",
              "text-top",
              <ExampleCodeCard
                id="vertical-align-text_top"
                text="vertical-align: $vertical_align_text_top;"
              />,
            ],
            [
              "$vertical_align_text_bottom",
              "text-bottom",
              <ExampleCodeCard
                id="vertical-align-text_bottom"
                text="vertical-align: $vertical_align_text_bottom;"
              />,
            ],
            [
              "$vertical_align_middle",
              "middle",
              <ExampleCodeCard
                id="vertical-align-middle"
                text="vertical-align: $vertical_align_middle;"
              />,
            ],
            [
              "$vertical_align_top",
              "top",
              <ExampleCodeCard
                id="vertical-align-top"
                text="vertical-align: $vertical_align_top;"
              />,
            ],
            [
              "$vertical_align_bottom",
              "bottom",
              <ExampleCodeCard
                id="vertical-align-bottom"
                text="vertical-align: $vertical_align_bottom;"
              />,
            ],
          ]}
        />
      </ShowPage>
    </>
  );
};

export default VerticalAlign;
