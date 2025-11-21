import { useLoaderData } from "react-router-dom"
import ReactMarkdown from 'react-markdown'
import { Flex, FlexItem, Background, SectionSeparator, Body } from "playbook-ui"

const GuidePage = () => {
  const loaderData = useLoaderData() as any
  const { guide_page_content } = loaderData

  // Extract frontmatter and content
  let contentWithoutFrontmatter = guide_page_content?.replace(/^---[\s\S]*?---\n/, '') || ''

  // Debug: Log to see what we're getting
  console.log('Guide page content:', guide_page_content)
  console.log('Content without frontmatter:', contentWithoutFrontmatter)

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
    )
  }

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
            <SectionSeparator flexGrow={1} />
            <div className="markdown-content">
              <ReactMarkdown>{contentWithoutFrontmatter}</ReactMarkdown>
            </div>
          </Background>
        </Background>
      </FlexItem>
    </Flex>
  )
}

export default GuidePage
