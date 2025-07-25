import React from "react";
import GlobalPropPage from "../../Templates/GlobalPropPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Partials/ExampleCodeCard";
import { Image, Flex } from "playbook-ui";

const Margin = () => {
  const VisualGuideCard = () => {
    return (
      <Flex gap="sm" wrap>
        <Image
          alt="picture of a misty forest"
          size="lg"
          url="https://unsplash.it/500/400/?image=634"
        />
        <Image
          alt="picture of a misty forest"
          size="lg"
          url="https://unsplash.it/500/400/?image=634"
        />
        <Image
          alt="picture of a misty forest"
          size="lg"
          url="https://unsplash.it/500/400/?image=634"
        />
        <Image
          alt="picture of a misty forest"
          size="lg"
          url="https://unsplash.it/500/400/?image=634"
        />
        <Image
          alt="picture of a misty forest"
          size="lg"
          url="https://unsplash.it/500/400/?image=634"
        />
      </Flex>
    );
  };

  // const HeaderWithIcon = () => {
  //   return (
  //     <>
  //      <Tooltip
  //         placement='top'
  //         text="Hover over the Values to see their specific value."
  //         zIndex={10}
  //     ><Icon name="circle-info" /></Tooltip>
  //       <Caption>HTML Options</Caption>
  //     </>
  //   );
  // };

  return (
    <>
      <GlobalPropPage
        title="Margin"
        description="The Margin prop allows for native HTML attributes and inline styles to be applied to the root element of a component. This helps create small, flexible customizations without modifying or extending the component's core API. It's especially useful when you need to apply minor visual overrides, add accessibility attributes, or adding native HTML attributes like custom identifiers."
        VisualGuideCard={VisualGuideCard()}
      >
        <PropsExamplesTable
          headers={["Example", "Rails Example", "React Example"]}
          rows={[
            [
              "Title HTML attribute",
              <ExampleCodeCard
                id="html-attribute-rails"
                text="html_options:{ title: 'I’m the tooltip for title' }"
              />,
              <ExampleCodeCard
                id="html-attribute-react"
                text="htmlOptions= {{ style: { width: '123px' } }}"
              />,
            ],
            [
              "Width Style",
              <ExampleCodeCard
                id="width-style-rails"
                text="html_options:{ style: { width: '123px' } }"
              />,
              <ExampleCodeCard
                id="width-style-react"
                text="htmlOptions= {{ style: { width: '123px' } }}"
              />,
            ],
            [
              "ID and Color Style",
              <ExampleCodeCard
                id="id-color-rails"
                text="html_options:{ id: 'text', style: { color: 'blue' } }"
              />,
              <ExampleCodeCard
                id="id-color-react"
                text="htmlOptions= {{ id: 'text', style: { color: 'blue' } }}"
              />,
            ],
          ]}
        />
      </GlobalPropPage>
    </>
  );
};

export default Margin;