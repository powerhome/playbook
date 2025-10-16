import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import { Title } from "playbook-ui";
import { spacing_none, spacing_xxs, spacing_xs, spacing_sm, spacing_md, spacing_lg, spacing_xl } from "./SpacingImages";

const Spacing = () => {
  return (
    <>
      <ShowPage
        pageType="tokens"
        title="Spacing"
        description="Spacing tokens are predefined values that represent spacing sizes and are used by margin, padding, and other global props. They also help maintain visual consistency by eliminating arbitrary values, and offer predictable, themeable spacing that can be managed across layouts and breakpoints."
      >
        <PropsExamplesTable
          firstColumnBold={false}
          headers={["Example", "Token", "Value", "SASS Example"]}
          rows={[
            [
              <img src={spacing_none} alt="Spacing none example" />,
              <Title size={4}>none</Title>,
              "0px",
              <ExampleCodeCard
                id="spacing-none"
                text="gap: none;"
              />,
            ],
            [
              <img src={spacing_xxs} alt="Spacing xxs example" />,
              <Title size={4}>$space_xxs</Title>,
              "4px",
              <ExampleCodeCard
                id="spacing-xxs"
                text="gap: $space_xxs;"
              />,
            ],
            [
              <img src={spacing_xs} alt="Spacing xs example" />,
              <Title size={4}>$space_xs</Title>,
              "8px",
              <ExampleCodeCard
                id="spacing-xs"
                text="gap: $space_xs;"
              />,
            ],
            [
              <img src={spacing_sm} alt="Spacing sm example" />,
              <Title size={4}>$space_sm</Title>,
              "16px",
              <ExampleCodeCard
                id="spacing-sm"
                text="gap: $space_sm;"
              />,
            ],
            [
              <img src={spacing_md} alt="Spacing md example" />,
              <Title size={4}>$space_md</Title>,
              "24px",
              <ExampleCodeCard
                id="spacing-md"
                text="gap: $space_md;"
              />,
            ],
            [
              <img src={spacing_lg} alt="Spacing lg example" />,
              <Title size={4}>$space_lg</Title>,
              "32px",
              <ExampleCodeCard
                id="spacing-lg"
                text="gap: $space_lg;"
              />,
            ],
            [
              <img src={spacing_xl} alt="Spacing xl example" />,
              <Title size={4}>$space_xl</Title>,
              "40px",
              <ExampleCodeCard
                id="spacing-xl"
                text="gap: $space_xl;"
              />,
            ],
          ]}
        />
      </ShowPage>
    </>
  );
};

export default Spacing;
