import { Flex, Background, Title, Detail } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import HeaderWithIcon from "../../Templates/Subcomponents/HeaderWithIcon";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import ValueCardWithTooltip from "../../Templates/Subcomponents/ValueCardWithTooltip";

const MinHeight = () => {
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
          className="min-height-global"
          overflow="auto"
          width="100%"
      >
        <Flex justify="between" orientation="row">
          {Object.keys(SIZES).map((size: string) => (
            <Background
                backgroundColor="primary"
                className="visual_guide_card_min_height_content"
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
        title="Min Height"
        description={
          <>
            The Min Height prop sets the minimum vertical space an element can 
            occupy. It ensures that an element never shrinks below a defined height, 
            which helps preserve layout integrity and readability across responsive
            designs. For more information on Min Height prop controls, refer to the{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/min-height"
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
            "Min Height",
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
              <ExampleCodeCard id="min-height-auto-rails" text="min_height: 'auto'" />,
              <ExampleCodeCard id="min-height-auto-react" text="minHeight='auto'" />,
            ],
            [
              "320px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="xs" tooltipText="320px"/></Flex>,
              <ExampleCodeCard id="min-height-xs-rails" text="min_height: 'xs'" />,
              <ExampleCodeCard id="min-height-xs-react" text="minHeight='xs'" />,
            ],
            [
              "480px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="sm" tooltipText="480px"/></Flex>,
              <ExampleCodeCard id="min-height-sm-rails" text="min_height: 'sm'" />,
              <ExampleCodeCard id="min-height-sm-react" text="minHeight='sm'" />,
            ],
            [
              "768px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="md" tooltipText="768px"/></Flex>,
              <ExampleCodeCard id="min-height-md-rails" text="min_height: 'md'" />,
              <ExampleCodeCard id="min-height-md-react" text="minHeight='md'" />,
            ],
            [
              "1024px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="lg" tooltipText="1024px"/></Flex>,
              <ExampleCodeCard id="min-height-lg-rails" text="min_height: 'lg'" />,
              <ExampleCodeCard id="min-height-lg-react" text="minHeight='lg'" />,
            ],
            [
              "1280px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="xl" tooltipText="1280px"/></Flex>,
              <ExampleCodeCard id="min-height-xl-rails" text="min_height: 'xl'" />,
              <ExampleCodeCard id="min-height-xl-react" text="minHeight='xl'" />,
            ],
            [
              "1440px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="xxl" tooltipText="1440px"/></Flex>,
              <ExampleCodeCard id="min-height-xxl-rails" text="min_height: 'xxl'" />,
              <ExampleCodeCard id="min-height-xxl-react" text="minHeight='xxl'" />,
            ],
            [
              "1920px",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <Flex gap="xs" wrap><ValueCardWithTooltip text="xxxl" tooltipText="1920px"/></Flex>,
              <ExampleCodeCard id="min-height-xxxl-rails" text="min_height: 'xxxl'" />,
              <ExampleCodeCard id="min-height-xxxl-react" text="minHeight='xxxl'" />,
            ],
          ]}
        />
      </ShowPage>
    </>
  );

};

export default MinHeight;