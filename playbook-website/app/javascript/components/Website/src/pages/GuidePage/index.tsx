import { useLoaderData } from "react-router-dom";
import { MarkdownContent } from "../../components/MarkdownContent";
import {
  Flex,
  FlexItem,
  Background,
  Title,
  Body,
} from "playbook-ui";
import HeaderImage from "../../../../../images/getting-started.svg";

const GuidePage = () => {
  const loaderData = useLoaderData() as any;
  const { guide_page_content } = loaderData;

  // Extract frontmatter and content
  let contentWithoutFrontmatter =
    guide_page_content?.replace(/^---[\s\S]*?---\n/, "") || "";

  if (!guide_page_content) {
    return (
      <Flex orientation="column" align="center">
        <FlexItem className="minw0 w100">
          <Background
            display="flex"
            justifyContent="center"
            className="markdown w100"
            backgroundColor="white"
            paddingX="sm"
            paddingY="md"
          >
            <Background maxWidth="md" backgroundColor="white">
              <Body text="Page content not found" />
            </Background>
          </Background>
        </FlexItem>
      </Flex>
    );
  }

  return (
    <Flex orientation="column" align="center">
      <Background
        imageUrl={HeaderImage}
        width="100%"
        display={{ xs: "none", sm: "none", md: "none" }}
        height="250px"
        backgroundColor="dark"
        backgroundSize="contain"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      />
      <Background
        display="flex"
        justifyContent="center"
        className="markdown w100"
        backgroundColor="white"
        paddingX="sm"
        paddingY="md"
      >
        <Background maxWidth="md" backgroundColor="white">
          <Title text={loaderData.title} size={1} />
          <div className="markdown-content">
            <MarkdownContent>{contentWithoutFrontmatter}</MarkdownContent>
          </div>
        </Background>
      </Background>
    </Flex>
  );
};

export default GuidePage;
