import { Flex, Background, Title, Detail } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import HeaderWithIcon from "../../Templates/Subcomponents/HeaderWithIcon";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import ValueCardWithTooltip from "../../Templates/Subcomponents/ValueCardWithTooltip";

const Height = () => {
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
          className="height-global"
          width="100%"
      >
        <Flex justify="between" orientation="row">
          {Object.keys(SIZES).map((size: string) => (
            <Background
                backgroundColor="primary"
                className="visual_guide_card_height_content"
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
                        top: '50%',
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
        title="Height"
        description={
          <>
            The Height prop sets the vertical size of an element. It defines
            how tall a component should be, either with fixed units or 
            relative values like percentages. This can be useful for enforcing
            consistent layouts or aligning elements within a design.
            For more information on Height prop controls, refer to the{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/height"
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
            "Height",
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
              <ExampleCodeCard id="height-auto-rails" text="height: 'auto'" />,
              <ExampleCodeCard id="height-auto-react" text="height='auto'" />,
            ],
            [
              "320px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="xs" tooltipText="320px"/></Flex>,
              <ExampleCodeCard id="height-xs-rails" text="height: 'xs'" />,
              <ExampleCodeCard id="height-xs-react" text="height='xs'" />,
            ],
            [
              "480px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="sm" tooltipText="480px"/></Flex>,
              <ExampleCodeCard id="height-sm-rails" text="height: 'sm'" />,
              <ExampleCodeCard id="height-sm-react" text="height='sm'" />,
            ],
            [
              "768px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="md" tooltipText="768px"/></Flex>,
              <ExampleCodeCard id="height-md-rails" text="height: 'md'" />,
              <ExampleCodeCard id="height-md-react" text="height='md'" />,
            ],
            [
              "1024px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="lg" tooltipText="1024px"/></Flex>,
              <ExampleCodeCard id="height-lg-rails" text="height: 'lg'" />,
              <ExampleCodeCard id="height-lg-react" text="height='lg'" />,
            ],
            [
              "1280px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="xl" tooltipText="1280px"/></Flex>,
              <ExampleCodeCard id="height-xl-rails" text="height: 'xl'" />,
              <ExampleCodeCard id="height-xl-react" text="height='xl'" />,
            ],
            [
              "1440px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="xxl" tooltipText="1440px"/></Flex>,
              <ExampleCodeCard id="height-xxl-rails" text="height: 'xxl'" />,
              <ExampleCodeCard id="height-xxl-react" text="height='xxl'" />,
            ],
            [
              "1920px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="xxxl" tooltipText="1920px"/></Flex>,
              <ExampleCodeCard id="height-xxxl-rails" text="height: 'xxxl'" />,
              <ExampleCodeCard id="height-xxxl-react" text="height='xxxl'" />,
            ],
          ]}
        />
      </ShowPage>
    </>
  );

};

export default Height;