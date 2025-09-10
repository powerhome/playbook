import { Flex, Background, Title, Detail, Example } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import HeaderWithIcon from "../../Templates/Subcomponents/HeaderWithIcon";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import ValueCardWithTooltip from "../../Templates/Subcomponents/ValueCardWithTooltip";

const MaxWidth = () => {
  const SIZES: { [size: string]: string } = {
    'xs': '360px',
    'sm': '540px',
    'md': '720px',
    'lg': '960px',
    'xl': '1140px',
    'xxl': '1320px ',
    '100%': '100%',
  }

  const VisualGuideCard = () => {
    return (
      <Background
          className="max-width-global"
          minWidth="xxs"
          overflow="auto"
      >
        {Object.keys(SIZES).map((size: string) => (
          <Background
              backgroundColor="gradient"
              key={size}
              marginBottom="xs"
              maxWidth={size}
              padding="xs"
              width="xxl"
          >
            <Flex>
              <Title
                dark
                size={4}
                flex={1}
                htmlOptions={{style: {minWidth:"30px"}}}
              >
                {size.toUpperCase()}
              </Title>
              <Detail
                flex={0}
                color="lighter"
              >
                {SIZES[size]}
              </Detail>
            </Flex>
          </Background>
        ))}
      </Background>
    );
  };

  return (
    <>
      <ShowPage
        title="Max Width"
        description={
          <>
            The Max Width prop defines the largest allowed width of a
            component which prevents it from stretching beyond a specific
            size. It's useful for preserving readability and supporting
            layouts that change across breakpoints. For more information
            on Max Width prop controls, refer to the{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/max-width"
              target="_blank"
            >
              MDN document found here.
            </a>
          </>
        }
        VisualGuideCard={VisualGuideCard()}
      >
        <PropsExamplesTable
          headers={[
            "Max Width",
            "Type",
            <HeaderWithIcon />,
            "Rails Example",
            "React Example",
          ]}
          rows={[
            [
              "360px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="xs" tooltipText="360px"/></Flex>,
              <ExampleCodeCard id="max-width-rails" text="max_width: 'xs'" />,
              <ExampleCodeCard id="max-width-react" text="maxWidth= 'xs'" />,
            ],
            [
              "540px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="sm" tooltipText="540px"/></Flex>,
              <ExampleCodeCard id="max-width-rails" text="max_width: 'sm'" />,
              <ExampleCodeCard id="max-width-react" text="maxWidth= 'sm'" />,
            ],
            [
              "720px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="md" tooltipText="720px"/></Flex>,
              <ExampleCodeCard id="max-width-rails" text="max_width: 'md" />,
              <ExampleCodeCard id="max-width-react" text="maxWidth= 'md'" />,
            ],
            [
              "960px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="lg" tooltipText="360px"/></Flex>,
              <ExampleCodeCard id="max-width-rails" text="max_width: 'lg'" />,
              <ExampleCodeCard id="max-width-react" text="maxWidth= 'lg'" />,
            ],
            [
              "1140px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="xl" tooltipText="1140px"/></Flex>,
              <ExampleCodeCard id="max-width-rails" text="max_width: 'xl'" />,
              <ExampleCodeCard id="max-width-react" text="maxWidth= 'xl'" />,
            ],
            [
              "1320px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="xxl" tooltipText="1320px"/></Flex>,
              <ExampleCodeCard id="max-width-rails" text="max_width: 'xxl'" />,
              <ExampleCodeCard id="max-width-react" text="maxWidth= 'xxl'" />,
            ],
            [
              "100%",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ExampleCodeCard text="100%" copyIcon={false} /></Flex>,
              <ExampleCodeCard id="max-width-rails" text="max_width: '100%'" />,
              <ExampleCodeCard id="max-width-react" text="maxWidth= '100%'" />,
            ],
          ]}
        />
      </ShowPage>
    </>
  );

};

export default MaxWidth;