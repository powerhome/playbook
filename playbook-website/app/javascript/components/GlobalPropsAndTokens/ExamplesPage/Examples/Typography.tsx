import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import { Title, Body } from "playbook-ui";

const Typography = () => {
  return (
    <>
      <ShowPage
        pageType="tokens"
        title="Typography"
        description="Typography tokens set global text styles including font family, size, weight, and line height. They are used across all text based components to ensure consistent readability and rhythm."
      >
        <PropsExamplesTable
          headers={["Font Family", "Value", "SASS Example"]}
          rows={[
            [
              "$font_family_base",
              '“Power Centra”, “Helvetica Neue”, Helvetica, Arial, sans_serif',
              <ExampleCodeCard
                id="font-family-base"
                text="font-family: $font_family_base;"
              />,
            ],
          ]}
        />
        <PropsExamplesTable
          firstColumnBold={false}
          headers={[<div style={{ width: 175 }}>Example</div>, "Font Size Tokens", "Value", "SASS Example"]}
          rows={[
            [
              <Body className="text_jumbo">Example</Body>,
              <Title size={4}>$font_jumbo</Title>,
              "36px",
              <ExampleCodeCard
                id="font-jumbo"
                text="font-size: $font_jumbo;"
              />,
            ],
            [
              <Body className="text_largest">Example</Body>,
              <Title size={4}>$font_largest</Title>,
              "32px",
              <ExampleCodeCard
                id="font-largest"
                text="font-size: $font_largest;"
              />,
            ],
            [
              <Body className="text_larger">Example</Body>,
              <Title size={4}>$font_larger</Title>,
              "27px",
              <ExampleCodeCard
                id="font-larger"
                text="font-size: $font_larger;"
              />,
            ],
            [
              <Body className="text_large">Example</Body>,
              <Title size={4}>$font_large</Title>,
              "20px",
              <ExampleCodeCard
                id="font-large"
                text="font-size: $font_large;"
              />,
            ],
            [
              <Body>Example</Body>,
              <Title size={4}>$font_base</Title>,
              "15.5px",
              <ExampleCodeCard
                id="font-base"
                text="font-size: $font_base;"
              />,
            ],
            [
              <Body className="text_default">Example</Body>,
              <Title size={4}>$font_default</Title>,
              "$font_base",
              <ExampleCodeCard
                id="font-default"
                text="font-size: $font_default;"
              />,
            ],
            [
              <Body className="text_normal">Example</Body>,
              <Title size={4}>$font_normal</Title>,
              "$font_base",
              <ExampleCodeCard
                id="font-normal"
                text="font-size: $font_normal;"
              />,
            ],
            [
              <Body className="text_medium">Example</Body>,
              <Title size={4}>$font_medium</Title>,
              "$font_base",
              <ExampleCodeCard
                id="font-medium"
                text="font-size: $font_medium;"
              />,
            ],
            [
              <Body className="text_small">Example</Body>,
              <Title size={4}>$font_small</Title>,
              "14px",
              <ExampleCodeCard
                id="font-small"
                text="font-size: $font_small;"
              />,
            ],
            [
              <Body className="text_smaller">Example</Body>,
              <Title size={4}>$font_smaller</Title>,
              "12px",
              <ExampleCodeCard
                id="font-smaller"
                text="font-size: $font_smaller;"
              />,
            ],
            [
              <Body className="text_smallest">Example</Body>,
              <Title size={4}>$font_smallest</Title>,
              "11px",
              <ExampleCodeCard
                id="font-smallest"
                text="font-size: $font_smallest;"
              />,
            ],
          ]}
        />
        <PropsExamplesTable
          firstColumnBold={false}
          headers={[<div style={{ width: 175 }}>Example</div>, "Headings Tokens", "Value", "SASS Example"]}
          rows={[
            [
              <Title size={1}>Heading</Title>,
              <Title size={4}>$heading_1</Title>,
              "44px",
              <ExampleCodeCard
                id="heading-1"
                text="font-size: $heading_1;"
              />,
            ],
            [
              <Title size={2}>Heading</Title>,
              <Title size={4}>$heading_2</Title>,
              "32px",
              <ExampleCodeCard
                id="heading-2"
                text="font-size: $heading_2;"
              />,
            ],
            [
              <Title size={3}>Heading</Title>,
              <Title size={4}>$heading_3</Title>,
              "$font_larger",
              <ExampleCodeCard
                id="heading-3"
                text="font-size: $heading_3;"
              />,
            ],
            [
              <Title size={4}>Heading</Title>,
              <Title size={4}>$heading_4</Title>,
              "$font_base",
              <ExampleCodeCard
                id="heading-4"
                text="font-size: $heading_4;"
              />,
            ],
          ]}
        />
        <PropsExamplesTable
          firstColumnBold={false}
          headers={[<div style={{ width: 175 }}>Example</div>, "Font Weight Tokens", "Value", "SASS Example"]}
          rows={[
            [
              <Title size={4}>Example</Title>,
              <Title size={4}>$bold</Title>,
              "700",
              <ExampleCodeCard
                id="font-bold"
                text="font-weight: $bold;"
              />,
            ],
            [
              <Body>Example</Body>,
              <Title size={4}>$regular</Title>,
              "400",
              <ExampleCodeCard
                id="font-regular"
                text="font-weight: $regular;"
              />,
            ],
            [
              <Title size={4} bold={false}>Example</Title>,
              <Title size={4}>$light</Title>,
              "300",
              <ExampleCodeCard
                id="font-light"
                text="font-weight: $light;"
              />,
            ],
          ]}
        />
        <PropsExamplesTable
          headers={["Other Token/Mixin", "Value", "SASS Example"]}
          rows={[
            [
              "$pb_link_colors",
              <>
                <div>default: $primary_action,</div>
                <div>body: $text_lt_default,</div>
                <div>muted: $text_lt_light,</div>
                <div>destructive: $error,</div>
              </>,
              <ExampleCodeCard
                id="link-colors"
                text="color: map-get($pb_link_colors, default);"
              />,
            ],
            [
              "$pb_link_hover_colors",
              <>
                <div>default: $text_lt_default,</div>
                <div>body: $primary_action,</div>
                <div>muted: $text_lt_default,</div>
                <div>destructive: $text_lt_default,</div>
              </>,
              <ExampleCodeCard
                id="link-hover-colors"
                text="color: map-get($pb_link_hover_colors, body);"
              />,
            ],
            [
              "$pb_dark_link_colors",
              <>
                <div>default: $active_dark,</div>
                <div>body: $text_dk_default,</div>
                <div>muted: $text_dk_light,</div>
                <div>destructive: $error_dark,</div>
              </>,
              <ExampleCodeCard
                id="dark-link-colors"
                text="color: map-get($pb_dark_link_colors, muted);"
              />,
            ],
            [
              "$pb_dark_link_hover_colors",
              <>
                <div>default: $text_dk_default,</div>
                <div>body: $active_dark,</div>
                <div>muted: $text_dk_default,</div>
                <div>destructive: $text_dk_default,</div>
              </>,
              <ExampleCodeCard
                id="dark-link-hover-colors"
                text="color: map-get($pb_dark_link_hover_colors, destructive);"
              />,
            ],
            [
              "pb_link",
              'color: $primary_action',
              <>
                <ExampleCodeCard
                  id="link-1"
                  text=".class-name { @include pb_link(); }"
                />
                <ExampleCodeCard
                  id="link-2"
                  text=".class-name { @include pb_link($error); }"
                />
                <ExampleCodeCard
                  id="link-3"
                  text=".class-name { @include pb_link(map-get( $pb_link_colors, muted)); }"
                />
              </>,
            ],
          ]}
        />
      </ShowPage>
    </>
  );
};

export default Typography;
