import { useLoaderData } from "react-router-dom";
import { MarkdownContent } from "../../components/MarkdownContent";
import {
  Flex,
  Background,
  Title,
} from "playbook-ui";
import HeaderImage from "../../../../../images/getting-started.svg";
import NotFound from "../NotFound";

const GuidePage = () => {
  const loaderData = useLoaderData() as any;
  const { guide_page_content } = loaderData;

  // Extract frontmatter and content
  let contentWithoutFrontmatter =
    guide_page_content?.replace(/^---[\s\S]*?---\n/, "") || "";

  if (!guide_page_content) {
    return <NotFound />;
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
