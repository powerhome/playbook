import { Flex, Image, Caption } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import ResponsivenessSection from "../../Templates/Subcomponents/ResponsivenessSection";
import * as AlignContentImages from './FlexBoxAlignImages/AlignContent';
import * as AlignItemsImages from './FlexBoxAlignImages/AlignItems';
import * as AlignSelfImages from './FlexBoxAlignImages/AlignSelf';



const FlexBoxAlignGlobalProps = () => {

    const ResponsiveExamples = () => {
    return (
      <>
        <Flex alignItems="center" gap="sm">
          <Caption text="Rails" />
          <ExampleCodeCard
            id="responsive-align-flex-rails"
            text="align_content: { xs: 'center', sm: 'center', md: 'start', lg: 'start', xl: 'start', default: 'start' }"
          />
        </Flex>
        <Flex alignItems="center" gap="sm">
          <Caption text="React" />
          <ExampleCodeCard
            id="responsive-align-flex-react"
            text="alignContent= {{ xs: 'center', sm: 'center', md: 'start', lg: 'start', xl: 'start', default: 'start' }}"
          />
        </Flex>
      </>
    );
  };

  return (
    <>
      <ShowPage
        isFlex
        title="Align (Flex Box)"
        description={
          <>
            Align props control cross-axis alignment in flex and grid layouts.
            It supports alignment of content, items, and individual elements
            using properties like align-items, align-content, and align-self.
            For more information on Align prop controls, refer to the{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/align-items"
              target="_blank"
            >
              MDN document found here.
            </a>
          </>
        }
      >
        <PropsExamplesTable
          headers={["Align Content", "Example", "Rails Example", "React Example"]}
          rows={[
            [
                "Start",
                <Image url={AlignContentImages.alignContent_start} alt="Align Content Start" />,
                <ExampleCodeCard id="align-content-rails-1" text='align_content: "start"' />,
                <ExampleCodeCard id="align-content-react-1" text='alignContent="start"' />,
            ],
            [
                "Center",
                <Image url={AlignContentImages.alignContent_center} alt="Align Content Center" />,
                <ExampleCodeCard id="align-content-rails-2" text='align_content: "center"' />,
                <ExampleCodeCard id="align-content-react-2" text='alignContent="center"' />,
            ],
            [
                "End",
                <Image url={AlignContentImages.alignContent_end} alt="Align Content End" />,
                <ExampleCodeCard id="align-content-rails-3" text='align_content: "end"' />,
                <ExampleCodeCard id="align-content-react-3" text='alignContent="end"' />,
            ],
            [
                "Space Between",
                <Image url={AlignContentImages.alignContent_between} alt="Align Content Space Between" />,
                <ExampleCodeCard id="align-content-rails-4" text='align_content: "space_between"' />,
                <ExampleCodeCard id="align-content-react-4" text='alignContent="spaceBetween"' />,
            ],
            [
                "Space Around",
                <Image url={AlignContentImages.alignContent_around} alt="Align Content Space Around" />,
                <ExampleCodeCard id="align-content-rails-5" text='align_content: "space_around"' />,
                <ExampleCodeCard id="align-content-react-5" text='alignContent="spaceAround"' />,
            ],
            [
                "Space Evenly",
                <Image url={AlignContentImages.alignContent_evenly} alt="Align Content Space Evenly" />,
                <ExampleCodeCard id="align-content-rails-6" text='align_content: "space_evenly"' />,
                <ExampleCodeCard id="align-content-react-6" text='alignContent="spaceEvenly"' />,
            ]
          ]}
        />
        <PropsExamplesTable
          headers={["Align Items", "Example", "Rails Example", "React Example"]}
          rows={[
            [
                "Start",
                <Image url={AlignItemsImages.alignItems_start} alt="Align Items Start" />,
                <ExampleCodeCard id="align-items-rails-1" text='align_items: "start"' />,
                <ExampleCodeCard id="align-items-react-1" text='alignItems="start"' />,
            ],
            [
                "Center",
                <Image url={AlignItemsImages.alignItems_center} alt="Align Items Center" />,
                <ExampleCodeCard id="align-items-rails-2" text='align_items: "center"' />,
                <ExampleCodeCard id="align-items-react-2" text='alignItems="center"' />,
            ],
            [
                "End",
                <Image url={AlignItemsImages.alignItems_end} alt="Align Items End" />,
                <ExampleCodeCard id="align-items-rails-3" text='align_items: "end"' />,
                <ExampleCodeCard id="align-items-react-3" text='alignItems="end"' />,
            ],
            [
                "Flex Start",
                <Image url={AlignItemsImages.alignItems_flex_start} alt="Align Items Flex Start" />,
                <ExampleCodeCard id="align-items-rails-4" text='align_items: "flex_start"' />,
                <ExampleCodeCard id="align-items-react-4" text='alignItems="flexStart"' />,
            ],
            [
                "Flex End",
                <Image url={AlignItemsImages.alignItems_flex_end} alt="Align Items Flex End" />,
                <ExampleCodeCard id="align-items-rails-5" text='align_items: "flex_end"' />,
                <ExampleCodeCard id="align-items-react-5" text='alignItems="flexEnd"' />,
            ],
            [
                "Stretch",
                <Image url={AlignItemsImages.alignItems_stretch} alt="Align Items Stretch" />,
                <ExampleCodeCard id="align-items-rails-6" text='align_items: "stretch"' />,
                <ExampleCodeCard id="align-items-react-6" text='alignItems="stretch"' />,
            ],
            [
                "Baseline",
                <Image url={AlignItemsImages.alignItems_baseline} alt="Align Items Baseline" />,
                <ExampleCodeCard id="align-items-rails-7" text='align_items: "baseline"' />,
                <ExampleCodeCard id="align-items-react-7" text='alignItems="baseline"' />,
            ]
          ]}
        />
        <PropsExamplesTable
          headers={["Align Self", "Example", "Rails Example", "React Example"]}
          rows={[
            [
                "Start",
                <Image url={AlignSelfImages.alignSelf_start} alt="Align Self Start" />,
                <ExampleCodeCard id="align-self-rails-1" text='align_self: "start"' />,
                <ExampleCodeCard id="align-self-react-1" text='alignSelf="start"' />,
            ],
            [
                "Center",
                <Image url={AlignSelfImages.alignSelf_center} alt="Align Self Center" />,
                <ExampleCodeCard id="align-self-rails-2" text='align_self: "center"' />,
                <ExampleCodeCard id="align-self-react-2" text='alignSelf="center"' />,
            ],
            [
                "End",
                <Image url={AlignSelfImages.alignSelf_end} alt="Align Self End" />,
                <ExampleCodeCard id="align-self-rails-3" text='align_self: "end"' />,
                <ExampleCodeCard id="align-self-react-3" text='alignSelf="end"' />,
            ],
            [
                "Auto",
                <Image url={AlignSelfImages.alignSelf_auto} alt="Align Self Auto" />,
                <ExampleCodeCard id="align-self-rails-4" text='align_self: "auto"' />,
                <ExampleCodeCard id="align-self-react-4" text='alignSelf="auto"' />,
            ],
            [
                "Stretch",
                <Image url={AlignSelfImages.alignSelf_stretch} alt="Align Self Stretch" />,
                <ExampleCodeCard id="align-self-rails-6" text='align_self: "stretch"' />,
                <ExampleCodeCard id="align-self-react-6" text='alignSelf="stretch"' />,
            ],
            [
                "Baseline",
                <Image url={AlignSelfImages.alignSelf_baseline} alt="Align Self Baseline" />,
                <ExampleCodeCard id="align-self-rails-7" text='align_self: "baseline"' />,
                <ExampleCodeCard id="align-self-react-7" text='alignSelf="baseline"' />,
            ]
          ]}
        />
        <ResponsivenessSection exampleSection={<ResponsiveExamples />}>
          <PropsExamplesTable
            firstColumnBold={false}
            headers={["Breakpoints", "Value", "Description"]}
            rows={[
              ["xs", "max-width: 575px", "Extra small screens"],
              ["sm", "min-width: 576px, max-width: 767px", "Small screens"],
              ["md", "min-width: 768px, max-width: 991px", "Medium screens"],
              ["lg", "min-width: 992px, max-width: 1199px", "Large screens"],
              ["xl", "min-width: 1200px", "Extra large screens"],
              [
                "default",
                "All sizes",
                "Default is used as a final fallback and is not tied to a specific screen size.",
              ],
            ]}
          />
        </ResponsivenessSection>
      </ShowPage>
    </>
  );
};
export default FlexBoxAlignGlobalProps;
