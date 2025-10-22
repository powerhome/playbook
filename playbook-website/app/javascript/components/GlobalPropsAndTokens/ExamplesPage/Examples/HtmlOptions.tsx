import React from "react";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import { Card, Flex, Body } from "playbook-ui";

const HtmlOptions = () => {
  const VisualGuideCard = () => {
    return (
      <Flex width="100%" gap="sm" flexDirection="column">
        <Card
          padding="md"
          dark
          background="product_1_background"
          borderNone
          htmlOptions={{
            title: "I'm the tooltip for title",
            style: { width: "fit-content", background: "#0056CF" },
          }}
        >
          {"Hover me for ‘title’ HTML attribute tooltip."}
        </Card>
        <Body paddingLeft="md">
          {`htmlOptions={{`}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;{`title: "I'm the tooltip for title",`}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;{`style: { width: 'fit-content', background: '#0056CF' }`}
          <br />
          {`}}`}
        </Body>
      </Flex>
    );
  };

  return (
    <>
      <ShowPage
        title="HTML Options"
        description="The HTML Options prop allows for native HTML attributes and inline styles to be applied to the root element of a component. This helps create small, flexible customizations without modifying or extending the component's core API. It's especially useful when you need to apply minor visual overrides, add accessibility attributes, or adding native HTML attributes like custom identifiers."
        descriptionSecondary="While powerful, this prop should be used with care. It is not meant to replace design tokens, standard component variants, or layout tools. Instead, think of it as a surgical way to add precision control where needed to keep more consistency with implementing Playbook."
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
                text="htmlOptions= {{ title: 'I’m the tooltip for title' } }}"
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
      </ShowPage>
    </>
  );
};

export default HtmlOptions;
