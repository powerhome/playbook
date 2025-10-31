import { Flex, Card, Body } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const ShadowsGlobalProps = () => {

  const VisualGuideExample = ({ shadow, label }: { shadow: string, label: string }) => {
    return (
      <Card
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="xl"
        background="white"
        shadow={shadow}
      >
        <Body text={label} />
      </Card>
    )
  }

  const VisualGuideCard = () => {
    return (
      <Flex gap="sm" wrap justify="around" width="100%">
        <VisualGuideExample shadow="none" label="None" />
        <VisualGuideExample shadow="deep" label="Deep" />
        <VisualGuideExample shadow="deeper" label="Deeper" />
        <VisualGuideExample shadow="deepest" label="Deepest" />
      </Flex>
    );
  };

  return (
    <>
      <ShowPage
        title="Shadow"
        description={
          <>
            The Shadow prop applies depth effects using box shadows. It can be used to elevate components visually, highlight interaction states, or distinguish overlapping layers like modals and cards. For more information on Shadow prop controls, refer to the{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow"
              target="_blank"
            >
              MDN document found here.
            </a>
          </>
        }
        VisualGuideCard={<VisualGuideCard />}
      >
        <PropsExamplesTable
          headers={["Shadow", "Type", "Value", "Rails Example", "React Example"]}
          rows={[
            [
              "None",
              <ExampleCodeCard copyIcon={false} id="shadow-type-1" text="union" />,
              <ExampleCodeCard copyIcon={false} id="shadow-value-1" text="0 0 0 0 transparent" />,
              <ExampleCodeCard id="shadow-rails-1" text='shadow: "none"' />,
              <ExampleCodeCard id="shadow-react-1" text='shadow="none"' />,
            ],
            [
              "Deep",
              <ExampleCodeCard copyIcon={false} id="shadow-type-2" text="union" />,
              <ExampleCodeCard copyIcon={false} id="shadow-value-2" text="0 4px 10px 0 rgba($shadow, 0.16)" />,
              <ExampleCodeCard id="shadow-rails-2" text='shadow: "deep"' />,
              <ExampleCodeCard id="shadow-react-2" text='shadow="deep"' />,
            ],
            [
              "Deeper",
              <ExampleCodeCard copyIcon={false} id="shadow-type-3" text="union" />,
              <ExampleCodeCard copyIcon={false} id="shadow-value-3" text="0 12px 28px 0 rgba($shadow, 0.18)" />,
              <ExampleCodeCard id="shadow-rails-3" text='shadow: "deeper"' />,
              <ExampleCodeCard id="shadow-react-3" text='shadow="deeper"' />,
            ],
            [
              "Deepest",
              <ExampleCodeCard copyIcon={false} id="shadow-type-4" text="union" />,
              <>
                <ExampleCodeCard copyIcon={false} id="shadow-value-4" text="0 30px 38px 4px $shadow," />
                <ExampleCodeCard copyIcon={false} id="shadow-value-4" text="0 2px 14px 4px rgba($shadow, 0.1)" />
              </>,
              <ExampleCodeCard id="shadow-rails-4" text='shadow: "deepest"' />,
              <ExampleCodeCard id="shadow-react-4" text='shadow="deepest"' />,
            ],
          ]}
        />
      </ShowPage>
    </>
  );
};

export default ShadowsGlobalProps;
