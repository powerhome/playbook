import { useLoaderData, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
  Flex,
  Background,
  Title,
  Layout,
  Card,
  IconCircle,
  Body,
  Icon,
} from "playbook-ui";
import HeaderImage from "../../../../../images/getting-started.svg";

const GettingStarted = () => {
  const loaderData = useLoaderData() as any;
  const { getting_started_content, getting_started } = loaderData;

  //------- remove once legacy website is gone --------------
  let contentWithoutFrontmatter =
    getting_started_content?.replace(/^---[\s\S]*?---\n/, "") || "";
  contentWithoutFrontmatter = contentWithoutFrontmatter.replace(
    /<div>\s*<%=[\s\S]*?%>\s*<\/div>/g,
    ""
  );
  //------- remove once legacy website is gone --------------

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
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
        paddingX={{ xs: "sm", sm: "sm", md: "sm", lg: "sm", default: "none" }}
        paddingY="md"
        backgroundColor="white"
        maxWidth="lg"
      >
        <Title text="Getting Started" tag="h1" size={1} />
        <div className="markdown-content">
          <ReactMarkdown>{contentWithoutFrontmatter}</ReactMarkdown>
        </div>

        {/* Render card grid of sub-pages */}
        {getting_started?.pages && getting_started.pages.length > 0 && (
          <Layout layout="collection" marginY="xl" paddingBottom="xl">
            <Layout.Body>
              {getting_started.pages.map((page: any) => {
                const icon = page.frontmatter?.icon || "files";
                const description = page.frontmatter?.description || "";
                // Convert legacy URL to beta URL
                const betaUrl = page.url.replace(
                  "guides/getting_started/",
                  "/beta/guides/getting_started/"
                );

                return (
                  <Link
                    key={page.page_id}
                    to={betaUrl}
                    className="display_flex align_items_stretch"
                  >
                    <Card padding="none" hover={{ shadow: "deep" }} flex={1}>
                      <Background>
                        <Flex justify="center" padding="xl">
                          <IconCircle icon={icon} variant="royal" />
                        </Flex>
                      </Background>
                      <Flex justify="between" align="center" padding="sm">
                        <Title size={4} color="link" text={page.title} />
                        <Title size={4} color="link">
                          <Icon icon="arrow-right-long" />
                        </Title>
                      </Flex>
                      <Body
                        text={description}
                        truncate="4"
                        color="light"
                        marginX="sm"
                        marginBottom="sm"
                      />
                    </Card>
                  </Link>
                );
              })}
            </Layout.Body>
          </Layout>
        )}
      </Background>
    </Flex>
  );
};

export default GettingStarted;
