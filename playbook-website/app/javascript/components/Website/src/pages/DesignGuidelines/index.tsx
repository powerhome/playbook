import { useLoaderData, Link } from "react-router-dom"
import { MarkdownContent } from "../../components/MarkdownContent"
import { Flex, Background, Title, Layout, Card, IconCircle, Body, Icon } from "playbook-ui"
import HeaderImage from "../../../../../images/getting-started.svg"

const DesignGuidelines = () => {
  const loaderData = useLoaderData() as any
  const { design_guidelines_content, design_guidelines } = loaderData

  let contentWithoutFrontmatter = design_guidelines_content?.replace(/^---[\s\S]*?---\n/, '') || ''
  contentWithoutFrontmatter = contentWithoutFrontmatter.replace(/<div>\s*<%=[\s\S]*?%>\s*<\/div>/g, '')

  return (
    <Background
      flexDirection="column"
      backgroundColor="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Background
        imageUrl={HeaderImage}
        width="100%"
        display={{ xs: "none", sm: "none", md: "none" }}
        minHeight="250px"
        backgroundColor="dark"
        backgroundSize="contain"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      />
      <Background
        paddingX={{ xs: "sm", sm: "sm", md:"sm", lg: "sm", default:"none" }}
        paddingY="md"
        backgroundColor="white"
        maxWidth="lg"
      >
        <Title size={1} text="Design Guidelines" marginBottom="sm" />
        <div className="markdown-content">
          <MarkdownContent>{contentWithoutFrontmatter}</MarkdownContent>
        </div>
        
        {/* Render card grid of sub-pages */}
        {design_guidelines?.pages && design_guidelines.pages.length > 0 && (
          <Layout layout="collection" marginY="xl" paddingBottom="xl">
            <Layout.Body>
              {design_guidelines.pages.map((page: any) => {
                const icon = page.frontmatter?.icon || 'files'
                const description = page.frontmatter?.description || ''
                const betaUrl = `/${page.url}`
                
                return (
                  <Link 
                    key={page.page_id} 
                    to={betaUrl}
                  >
                    <Card padding="none" hover={{ shadow: "deep" }} flex={1} minHeight="300px">
                      <Background backgroundColor="light">
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
                )
              })}
            </Layout.Body>
          </Layout>
        )}
      </Background>
    </Background>
  )
}

export default DesignGuidelines
