import { Flex, Background, Title, Detail } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import HeaderWithIcon from "../../Templates/Subcomponents/HeaderWithIcon";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import ValueCardWithTooltip from "../../Templates/Subcomponents/ValueCardWithTooltip";

const MinWidth = () => {
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
            className="min-width-global"
            minWidth="xxs"
            overflow="auto"
        >
          {Object.keys(SIZES).map((size: string) => (
            <Background
                backgroundColor="gradient"
                key={size}
                marginBottom="xs"
                minWidth={size}
                padding="xs"
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
        title="Min Width"
        description={
          <>
            The Min Width prop defines the smallest allowed width of a
            component which prevents it from shrinking beyond a specific
            size. It's useful for preserving readability and supporting
            layouts with responsive behavior without forcing fixed widths.
            For more information on Min Width prop controls, refer to the{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/min-width"
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
            "Min Width",
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
              <ExampleCodeCard id="min-width-xs-rails" text='min_width: "xs"' />,
              <ExampleCodeCard id="min-width-xs-react" text='minWidth="xs"' />,
            ],
            [
              "540px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="sm" tooltipText="540px"/></Flex>,
              <ExampleCodeCard id="min-width-sm-rails" text='min_width: "sm"' />,
              <ExampleCodeCard id="min-width-sm-react" text='minWidth="sm"' />,
            ],
            [
              "720px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="md" tooltipText="720px"/></Flex>,
              <ExampleCodeCard id="min-width-md-rails" text='min_width: "md"' />,
              <ExampleCodeCard id="min-width-md-react" text='minWidth="md"' />,
            ],
            [
              "960px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="lg" tooltipText="360px"/></Flex>,
              <ExampleCodeCard id="min-width-lg-rails" text='min_width: "lg"' />,
              <ExampleCodeCard id="min-width-lg-react" text='minWidth="lg"' />,
            ],
            [
              "1140px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="xl" tooltipText="1140px"/></Flex>,
              <ExampleCodeCard id="min-width-xl-rails" text='min_width: "xl"' />,
              <ExampleCodeCard id="min-width-xl-react" text='minWidth="xl"' />,
            ],
            [
              "1320px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="xxl" tooltipText="1320px"/></Flex>,
              <ExampleCodeCard id="min-width-xxl-rails" text='min_width: "xxl"' />,
              <ExampleCodeCard id="min-width-xxl-react" text='minWidth="xxl"' />,
            ],
            [
              "100%",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ExampleCodeCard text="100%" copyIcon={false} /></Flex>,
              <ExampleCodeCard id="min-width-100-rails" text='min_width: "100%"' />,
              <ExampleCodeCard id="min-width-100-react" text='minWidth="100%"' />,
            ],
          ]}
        />
      </ShowPage>
    </>
  );

};

export default MinWidth;