import { Flex, Image, Caption } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import ResponsivenessSection from "../../Templates/Subcomponents/ResponsivenessSection";
import * as JustifyContentImages from './FlexBoxJustifyImages/JustifyContent';
import * as JustifySelfImages from './FlexBoxJustifyImages/JustifySelf';

const FlexBoxJustifyGlobalProps = () => {

  const ResponsiveExamples = () => {
    return (
      <>
        <Flex alignItems="center" gap="sm">
          <Caption text="Rails" />
          <ExampleCodeCard
            id="responsive-justify-flex-rails"
            text='justify_content: { xs: "center", sm: "center", md: "start", lg: "start", xl: "start", default: "start" }'
          />
        </Flex>
        <Flex alignItems="center" gap="sm">
          <Caption text="React" />
          <ExampleCodeCard
            id="responsive-justify-flex-react"
            text='justifyContent= {{ xs: "center", sm: "center", md: "start", lg: "start", xl: "start", default: "start" }}'
          />
        </Flex>
      </>
    );
  };

  return (
    <>
      <ShowPage
        isFlex
        title="Justify (Flex Box)"
        description={
          <>
            Justify props control horizontal alignment of content in a flex or grid container. It supports values like start, center, end, or space-between, affecting how content is spaced along the main axis. For more information on Justify prop controls, refer to the {" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content"
              target="_blank"
            >
              MDN document found here.
            </a>
          </>
        }
      >
        <PropsExamplesTable
          headers={["Justify Content", "Example", "Rails Example", "React Example"]}
          rows={[
            [
              "Start",
              <Image url={JustifyContentImages.justifyContent_start} alt="Justify Content Start" />,
              <ExampleCodeCard id="justify-content-rails-1" text='justify_content: "start"' />,
              <ExampleCodeCard id="justify-content-react-1" text='justifyContent="start"' />,
            ],
            [
              "Center",
              <Image url={JustifyContentImages.justifyContent_center} alt="Justify Content Center" />,
              <ExampleCodeCard id="justify-content-rails-2" text='justify_content: "center"' />,
              <ExampleCodeCard id="justify-content-react-2" text='justifyContent="center"' />,
            ],
            [
              "End",
              <Image url={JustifyContentImages.justifyContent_end} alt="Justify Content End" />,
              <ExampleCodeCard id="justify-content-rails-3" text='justify_content: "end"' />,
              <ExampleCodeCard id="justify-content-react-3" text='justifyContent="end"' />,
            ],
            [
              "Space Between",
              <Image url={JustifyContentImages.justifyContent_between} alt="Justify Content Space Between" />,
              <ExampleCodeCard id="justify-content-rails-4" text='justify_content: "space_between"' />,
              <ExampleCodeCard id="justify-content-react-4" text='justifyContent="spaceBetween"' />,
            ],
            [
              "Space Around",
              <Image url={JustifyContentImages.justifyContent_around} alt="Justify Content Space Around" />,
              <ExampleCodeCard id="justify-content-rails-5" text='justify_content: "space_around"' />,
              <ExampleCodeCard id="justify-content-react-5" text='justifyContent="spaceAround"' />,
            ],
            [
              "Space Evenly",
              <Image url={JustifyContentImages.justifyContent_evenly} alt="Justify Content Space Evenly" />,
              <ExampleCodeCard id="justify-content-rails-6" text='justify_content: "space_evenly"' />,
              <ExampleCodeCard id="justify-content-react-6" text='justifyContent="spaceEvenly"' />,
            ],
          ]}
        />

        <PropsExamplesTable
          headers={["Justify Self", "Example", "Rails Example", "React Example"]}
          rows={[
            [
              "Start",
              <Image url={JustifySelfImages.justifySelf_start} alt="Justify Self Start" />,
              <ExampleCodeCard id="justify-self-rails-1" text='justify_self: "start"' />,
              <ExampleCodeCard id="justify-self-react-1" text='justifySelf="start"' />,
            ],
            [
              "Center",
              <Image url={JustifySelfImages.justifySelf_center} alt="Justify Self Center" />,
              <ExampleCodeCard id="justify-self-rails-2" text='justify_self: "center"' />,
              <ExampleCodeCard id="justify-self-react-2" text='justifySelf="center"' />,
            ],
            [
              "End",
              <Image url={JustifySelfImages.justifySelf_end} alt="Justify Self End" />,
              <ExampleCodeCard id="justify-self-rails-3" text='justify_self: "end"' />,
              <ExampleCodeCard id="justify-self-react-3" text='justifySelf="end"' />,
            ],
            [
              "Stretch",
              <Image url={JustifySelfImages.justifySelf_stretch} alt="Justify Self Stretch" />,
              <ExampleCodeCard id="justify-self-rails-4" text='justify_self: "stretch"' />,
              <ExampleCodeCard id="justify-self-react-4" text='justifySelf="stretch"' />,
            ],
            [
              "Auto",
              <Image url={JustifySelfImages.justifySelf_auto} alt="Justify Self Auto" />,
              <ExampleCodeCard id="justify-self-rails-5" text='justify_self: "auto"' />,
              <ExampleCodeCard id="justify-self-react-5" text='justifySelf="auto"' />,
            ],
          ]}
        />

        <ResponsivenessSection exampleSection={<ResponsiveExamples />}>
          <PropsExamplesTable
            firstColumnBold={false}
            headers={["Breakpoints", "Value", "Description"]}
            rows={[["xs", "max-width: 575px", "Extra small screens"], ["sm", "min-width: 576px, max-width: 767px", "Small screens"], ["md", "min-width: 768px, max-width: 991px", "Medium screens"], ["lg", "min-width: 992px, max-width: 1199px", "Large screens"], ["xl", "min-width: 1200px", "Extra large screens"], ["default", "All sizes", "Default is used as a final fallback and is not tied to a specific screen size."]]}
          />
        </ResponsivenessSection>
      </ShowPage>
    </>
  );
};

export default FlexBoxJustifyGlobalProps;


