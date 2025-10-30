import { Flex, Background, Title, Detail, Example } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import HeaderWithIcon from "../../Templates/Subcomponents/HeaderWithIcon";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import ValueCardWithTooltip from "../../Templates/Subcomponents/ValueCardWithTooltip";

const Width = () => {
  const SIZES: { [size: string]: string } = {
    '0%': '0px',
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
          className="width-global"
          minWidth="xxs"
          overflow="auto"
      >
        {Object.keys(SIZES).map((size: string) => (
          <Background
              backgroundColor="gradient"
              key={size}
              marginBottom="xs"
              minWidth={size}
              width={size}
              paddingTop="xs"
              paddingBottom="xs"
          >
            <Flex>
              {size == "0%" ? (
                <Title
                  color="light"
                  size={4}
                  flex={1}
                  marginLeft="xs"
                  marginRight="xs"
                >
                  {size.toUpperCase()}
                </Title>
              ) :
              (
                <Title
                  dark
                  size={4}
                  flex={1}
                  marginLeft="xs"
                >
                  {size.toUpperCase()}
                </Title>
              )}
              <Detail
                flex={0}
                color="lighter"
                marginRight="xs"
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
        title="Width"
        description={
          <>
            The Width prop sets the horizontal size of a
            component. It's helpful for creating fixed or
            proportional layous and ensures components fit
            their intended spaces. For more information
            on Width prop controls, refer to the{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/width"
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
              "0%",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ExampleCodeCard text="0%" copyIcon={false} /></Flex>,
              <ExampleCodeCard id="width-0-rails" text='width: "0"' />,
              <ExampleCodeCard id="width-0-react" text='width="0"' />,
            ],
            [
              "360px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="xs" tooltipText="360px"/></Flex>,
              <ExampleCodeCard id="width-xs-rails" text='width: "xs"' />,
              <ExampleCodeCard id="width-xs-react" text='width="xs"' />,
            ],
            [
              "540px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="sm" tooltipText="540px"/></Flex>,
              <ExampleCodeCard id="width-sm-rails" text='width: "sm"' />,
              <ExampleCodeCard id="width-sm-react" text='width="sm"' />,
            ],
            [
              "720px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="md" tooltipText="720px"/></Flex>,
              <ExampleCodeCard id="width-md-rails" text='width: "md"' />,
              <ExampleCodeCard id="width-md-react" text='width="md"' />,
            ],
            [
              "960px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="lg" tooltipText="360px"/></Flex>,
              <ExampleCodeCard id="width-lg-rails" text='width: "lg"' />,
              <ExampleCodeCard id="width-lg-react" text='width="lg"' />,
            ],
            [
              "1140px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="xl" tooltipText="1140px"/></Flex>,
              <ExampleCodeCard id="width-xl-rails" text='width: "xl"' />,
              <ExampleCodeCard id="width-xl-react" text='width="xl"' />,
            ],
            [
              "1320px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="xxl" tooltipText="1320px"/></Flex>,
              <ExampleCodeCard id="width-xxl-rails" text='width: "xxl"' />,
              <ExampleCodeCard id="width-xxl-react" text='width="xxl"' />,
            ],
            [
              "100%",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ExampleCodeCard text="100%" copyIcon={false} /></Flex>,
              <ExampleCodeCard id="width-100-rails" text='width: "100%"' />,
              <ExampleCodeCard id="width-100-react" text='width="100%"' />,
            ],
          ]}
        />
      </ShowPage>
    </>
  );

};

export default Width;