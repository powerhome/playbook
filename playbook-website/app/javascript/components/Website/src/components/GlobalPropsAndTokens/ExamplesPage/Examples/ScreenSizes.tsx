import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const ScreenSizes = () => {
  return (
    <>
      <ShowPage
        pageType="tokens"
        title="Screen Sizes"
        description="Screen Size tokens define responsive breakpoints used in media queries. Tokens represent common device widths, enabling adaptive layout changes across screen sizes."
      >
        <PropsExamplesTable
          headers={["Tokens", "Value", "SASS Example"]}
          rows={[
            [
              "$screen-xs-min",
              "575px",
              <ExampleCodeCard
                id="screen-xs-min"
                text={`@media screen and (min-width: $screen-xs-min) {
                  padding: 16px;
                }`}
              />,
            ],
            [
              "$screen-xs-max",
              "$screen-xs-min - 1",
              <ExampleCodeCard
                id="screen-xs-max"
                text={`@media screen and (max-width: $screen-xs-max) {
                  padding: 16px;
                }`}
              />,
            ],
            [
              "$screen-sm-min",
              "576px",
              <ExampleCodeCard
                id="screen-sm-min"
                text={`@media screen and (min-width: $screen-sm-min) {
                  padding: 24px;
                }`}
              />,
            ],
            [
              "$screen-sm-max",
              "$screen-sm-min - 1",
              <ExampleCodeCard
                id="screen-sm-max"
                text={`@media screen and (max-width: $screen-sm-max) {
                  padding: 24px;
                }`}
              />,
            ],
            [
              "$screen-md-min",
              "768px",
              <ExampleCodeCard
                id="screen-md-min"
                text={`@media screen and (min-width: $screen-md-min) {
                  padding: 32px;
                }`}
              />,
            ],
            [
              "$screen-md-max",
              "$screen-md-min - 1",
              <ExampleCodeCard
                id="screen-md-max"
                text={`@media screen and (max-width: $screen-md-max) {
                  padding: 32px;
                }`}
              />,
            ],
            [
              "$screen-lg-min",
              "992px",
              <ExampleCodeCard
                id="screen-lg-min"
                text={`@media screen and (min-width: $screen-lg-min) {
                  padding:40px;
                }`}
              />,
            ],
            [
              "$screen-lg-max",
              "$screen-lg-min - 1",
              <ExampleCodeCard
                id="screen-lg-max"
                text={`@media screen and (max-width: $screen-lg-max) {
                  padding: 40px;
                }`}
              />,
            ],
            [
              "$screen-xl-min",
              "1200px",
              <ExampleCodeCard
                id="screen-xl-min"
                text={`@media screen and (min-width: $screen-xl-min) {
                  min-height: 64px;
                }`}
              />,
            ],
            [
              "$screen-xl-max",
              "$screen-xl-min - 1",
              <ExampleCodeCard
                id="screen-xl-max"
                text={`@media screen and (max-width: $screen-xl-max) {
                  padding: 64px;
                }`}
              />,
            ],
          ]}
        />
      </ShowPage>
    </>
  );
};

export default ScreenSizes;
