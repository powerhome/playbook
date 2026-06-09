import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const TextAlign = () => {
  return (
    <>
      <ShowPage
        pageType="tokens"
        title="Text Align"
        description="Text-Align tokens control the horizontal alignment of inline content. Values map directly to CSS text-align properties."
      >
        <PropsExamplesTable
          headers={["Tokens", "Value", "SASS Example"]}
          rows={[
            ["$text_align_start", "start", <ExampleCodeCard id="text-align-start" text="text-align: $text_align_start;" />],
            ["$text_align_end", "end", <ExampleCodeCard id="text-align-end" text="text-align: $text_align_end;" />],
            ["$text_align_left", "left", <ExampleCodeCard id="text-align-left" text="text-align: $text_align_left;" />],
            ["$text_align_right", "right", <ExampleCodeCard id="text-align-right" text="text-align: $text_align_right;" />],
            ["$text_align_center", "center", <ExampleCodeCard id="text-align-center" text="text-align: $text_align_center;" />],
            ["$text_align_justify", "justify", <ExampleCodeCard id="text-align-justify" text="text-align: $text_align_justify;" />],
            ["$text_align_justify_all", "justify-all", <ExampleCodeCard id="text-align-justify_all" text="text-align: $text_align_justify-all;" />],
            ["$text_align_match_parent", "match-parent", <ExampleCodeCard id="text-align-match_parent" text="text-align: $text_align_match_parent;" />],
          ]}
        />
      </ShowPage>
    </>
  );
};

export default TextAlign;
