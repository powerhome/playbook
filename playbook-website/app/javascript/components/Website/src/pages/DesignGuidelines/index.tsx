import { useLoaderData, Link } from "react-router-dom"
import ReactMarkdown from 'react-markdown'
import { Flex, FlexItem, Background, Title, SectionSeparator, Layout, Card, IconCircle, Body, Icon } from "playbook-ui"

const DesignGuidelines = () => {
  const loaderData = useLoaderData() as any
  const { design_guidelines_content, design_guidelines } = loaderData

  //------- remove once legacy webasite is gone --------------
  let contentWithoutFrontmatter = design_guidelines_content?.replace(/^---[\s\S]*?---\n/, '') || ''
  contentWithoutFrontmatter = contentWithoutFrontmatter.replace(/<div>\s*<%=[\s\S]*?%>\s*<\/div>/g, '')
  //------- remove once legacy webasite is gone --------------

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
            <Title text="Design Guidelines" tag="h1" size={1} />
            <SectionSeparator flexGrow={1} />
            <div className="markdown-content">
              <ReactMarkdown>{contentWithoutFrontmatter}</ReactMarkdown>
            </div>
            
            {/* Render card grid of sub-pages */}
            {design_guidelines?.pages && design_guidelines.pages.length > 0 && (
              <Layout layout="collection" marginY="xl" paddingBottom="xl">
                <Layout.Body>
                  {design_guidelines.pages.map((page: any) => {
                    const icon = page.frontmatter?.icon || 'files'
                    const description = page.frontmatter?.description || ''
                    // Convert legacy URL to beta URL
                    const betaUrl = page.url.replace('guides/design_guidelines/', '/beta/guides/design_guidelines/')
                    
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
                    )
                  })}
                </Layout.Body>
              </Layout>
            )}
          </Background>
        </Background>
      </FlexItem>
    </Flex>
  )
}

export default DesignGuidelines
