import { Flex, Card, SelectableCard } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const Dark = () => {
  const VisualGuideCard = () => {
    return (
      <>
        <Flex marginBottom="sm" gap="sm" width="100%">
          <Card width="100%"> Light Card</Card>
          <Card width="100%" dark>
            {" "}
            Dark Card
          </Card>
        </Flex>
        <Flex gap="sm" width="100%">
          <Card width="100%">
            <SelectableCard
              checked={true}
              icon
              inputId="selectedWithIcon"
              name="selectedWithIcon"
              value="selectedWithIcon"
            >
              {"Selectable Card"}
            </SelectableCard>
          </Card>
          <Card width="100%" dark>
            <SelectableCard
              checked={true}
              dark
              icon
              inputId="selectedWithIcon"
              name="selectedWithIcon"
              value="selectedWithIcon"
            >
              {"Selectable Card"}
            </SelectableCard>
          </Card>
        </Flex>
      </>
    );
  };

  return (
    <ShowPage
      title="Dark"
      description={
        <>
          The Dark prop enables components to render in dark mode by applying
          dark theme styles. It’s used to support low-light environments or user
          preferences and ensures components remain legible and visually
          consistent in dark UIs.
        </>
      }
      VisualGuideCard={<VisualGuideCard />}
    >
      <PropsExamplesTable
        headers={["Dark", "Values", "Rails Example", "React Example"]}
        rows={[
          [
            "Dark",
            <ExampleCodeCard text="dark" copyIcon={false} />,
            <ExampleCodeCard
              id="dark-rails"
              text="<% pb_rails('card', props: { dark: true, }) do %> Card Content <% end %>"
            />,
            <ExampleCodeCard
              id="dark-react"
              text="<Card dark> Card Content </Card>"
            />,
          ],
        ]}
      />
    </ShowPage>
  );
};

export default Dark;
