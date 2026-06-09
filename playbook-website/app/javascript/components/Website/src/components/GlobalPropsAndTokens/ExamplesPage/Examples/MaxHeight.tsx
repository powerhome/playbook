import { Flex, Background, Title, Detail } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import HeaderWithIcon from "../../Templates/Subcomponents/HeaderWithIcon";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import ValueCardWithTooltip from "../../Templates/Subcomponents/ValueCardWithTooltip";

const MaxHeight = () => {
  const SIZES: { [size: string]: string } = {
    'auto': 'auto',
    'xs': '320px',
    'sm': '480px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    'xxl': '1440px',
    'xxxl': '1920px',
  }

  const VisualGuideCard = () => {
    return (
      <Background
          className="max-height-global"
          overflow="auto"
          width="100%"
      >
        <Flex justify="between" orientation="row">
          {Object.keys(SIZES).map((size: string) => (
            <Background
                backgroundColor="primary"
                className="visual_guide_card_max_height_content"
                height={size}
                key={size}
                minHeight={size}
            >
              <Flex 
                  alignItems="center"
                  htmlOptions={size !== "auto" ? {
                    style: {
                      position: 'relative',
                      height: '100%'
                    }
                  } : {}}
                  justifyContent="center" 
                  marginY={size == "auto" ? "sm" : "none" }
              >
                <Flex
                  alignItems="center"
                  htmlOptions={size !== "auto" ? {
                    style: {
                      position: 'absolute',
                      top: ['md', 'lg', 'xl', 'xxl', 'xxxl'].includes(size) ? '269px' : '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }
                  } : {}}
                  justifyContent="center"
                  orientation="column"
                >
                  <Title
                      dark
                      size={4}
                  >
                    {size.toUpperCase()}
                  </Title>
                  <Detail
                      color="lighter"
                      dark
                      fontSize="xs"
                  >
                    {SIZES[size]}
                  </Detail>
                </Flex>
              </Flex>
            </Background>
          ))}
        </Flex>
      </Background>
    );
  };

  return (
    <>
      <ShowPage
        title="Max Height"
        description={
          <>
            The Max Height prop sets the maximum vertical size an element can 
            reach. It prevents elements from stretching beyond a set limit, which
            is especially useful for scrollable area, modals, or media containers.
            For more information on Max Height prop controls, refer to the{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/max-height"
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
            "Max Height",
            "Type",
            <HeaderWithIcon />,
            "Rails Example",
            "React Example",
          ]}
          rows={[
            [
              "Auto",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ExampleCodeCard text="auto" copyIcon={false} /></Flex>,
              <ExampleCodeCard id="max-height-auto-rails" text='max_height: "auto"' />,
              <ExampleCodeCard id="max-height-auto-react" text='maxHeight="auto"' />,
            ],
            [
              "320px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="xs" tooltipText="320px"/></Flex>,
              <ExampleCodeCard id="max-height-xs-rails" text='max_height: "xs"' />,
              <ExampleCodeCard id="max-height-xs-react" text='maxHeight="xs"' />,
            ],
            [
              "480px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="sm" tooltipText="480px"/></Flex>,
              <ExampleCodeCard id="max-height-sm-rails" text='max_height: "sm"' />,
              <ExampleCodeCard id="max-height-sm-react" text='maxHeight="sm"' />,
            ],
            [
              "768px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="md" tooltipText="768px"/></Flex>,
              <ExampleCodeCard id="max-height-md-rails" text='max_height: "md"' />,
              <ExampleCodeCard id="max-height-md-react" text='maxHeight="md"' />,
            ],
            [
              "1024px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="lg" tooltipText="1024px"/></Flex>,
              <ExampleCodeCard id="max-height-lg-rails" text='max_height: "lg"' />,
              <ExampleCodeCard id="max-height-lg-react" text='maxHeight="lg"' />,
            ],
            [
              "1280px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="xl" tooltipText="1280px"/></Flex>,
              <ExampleCodeCard id="max-height-xl-rails" text='max_height: "xl"' />,
              <ExampleCodeCard id="max-height-xl-react" text='maxHeight="xl"' />,
            ],
            [
              "1440px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="xxl" tooltipText="1440px"/></Flex>,
              <ExampleCodeCard id="max-height-xxl-rails" text='max_height: "xxl"' />,
              <ExampleCodeCard id="max-height-xxl-react" text='maxHeight="xxl"' />,
            ],
            [
              "1920px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="xxxl" tooltipText="1920px"/></Flex>,
              <ExampleCodeCard id="max-height-xxxl-rails" text='max_height: "xxxl"' />,
              <ExampleCodeCard id="max-height-xxxl-react" text='maxHeight="xxxl"' />,
            ],
          ]}
        />
      </ShowPage>
    </>
  );

};

export default MaxHeight;