import { Flex, Card, Body } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";

const LineHeight = () => {

     const VisualGuideExample = ({ text, lineHeight }: any) => {
        return (
      <>
        <Flex orientation="column" alignItems="center" gap="xs">
            <Card
              className="visual_guide_card_line_height"
              display="flex"
              alignItems="center"
              justifyContent="center"    
            >
              <Body text={text} lineHeight={lineHeight} />
            </Card>
            <Body text={lineHeight}  />
        </Flex>
      </>
      )
     }

    const LineHeightCard = () => {
        return (
          <Flex gap="sm" wrap>
            <VisualGuideExample text="The quick brown fox jumps over 17 lazy dogs." lineHeight="tightest" />
            <VisualGuideExample text="The quick brown fox jumps over 17 lazy dogs." lineHeight="tighter" />
            <VisualGuideExample text="The quick brown fox jumps over 17 lazy dogs." lineHeight="tight" />
            <VisualGuideExample text="The quick brown fox jumps over 17 lazy dogs." lineHeight="normal" />
            <VisualGuideExample text="The quick brown fox jumps over 17 lazy dogs." lineHeight="loose" />
            <VisualGuideExample text="The quick brown fox jumps over 17 lazy dogs." lineHeight="looser" />
            <VisualGuideExample text="The quick brown fox jumps over 17 lazy dogs." lineHeight="loosest" />
          </Flex>
        );
    };

    
  return (
    <>
      <ShowPage
        title="Line Height"
        description="Line Height tokens control the line height of text elements. Values align with standard CSS line-height properties."
        VisualGuideCard={LineHeightCard()}
      >
      </ShowPage>
    </>
  );
};

export default LineHeight;
