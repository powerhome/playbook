import React from "react";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const Display = () => {
  return (
    <>
      <ShowPage
        title="Display"
        description="Display tokens define how an element is rendered within the layout. Values align with standard CSS display properties and offer consistent layout behavior across components."
      >
        <PropsExamplesTable
          headers={["Tokens", "Value", "SASS Example"]}
          rows={[
            [
              "$display_inline",
              "inline",
              <ExampleCodeCard
                id="display-inline"
                text="display: $display_inline;"
              />,
            ],
            [
              "$display_block",
              "block",
              <ExampleCodeCard
                id="display-block"
                text="display: $display_block;"
              />,
            ],
            [
              "$display_inline_block",
              "inline-block",
              <ExampleCodeCard
                id="display-inline-block"
                text="display: $display_inline_block;"
              />,
            ],
            [
              "$display_flex",
              "flex",
              <ExampleCodeCard
                id="display-flex"
                text="display: $display_flex;"
              />,
            ],
            [
              "$display_none",
              "none",
              <ExampleCodeCard
                id="display-none"
                text="display: $display_none;"
              />,
            ],
            [
              "$display_inline_flex",
              "inline-flex",
              <ExampleCodeCard
                id="display-inline-flex"
                text="display: $display_inline_flex;"
              />,
            ],
            [
              "$display_grid",
              "grid",
              <ExampleCodeCard
                id="display-grid"
                text="display: $display_grid;"
              />,
            ],
          ]}
        />
      </ShowPage>
    </>
  );
};

export default Display;
