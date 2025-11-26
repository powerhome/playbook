import { NavLink, useLoaderData, useParams } from "react-router-dom"
import { Body, Flex, Title, Card, Button, Caption } from "playbook-ui"
import { useState } from "react"
import ReactMarkdown from 'react-markdown'

import { Hero } from "../../components/Hero"
import { PageContainer } from "../../components/PageContainer"
import { linkFormat } from "../../../../../utilities/website_sidebar_helper"
import LiveExample from "../../components/LiveExamples/LiveExampleReact"

const KitShow = () => {
  const { name, platform } = useParams()
  const loaderData = useLoaderData() as any
  const { kits, examples } = loaderData

  // Find which category this kit belongs to
  const kitCategory = kits?.find((category: { components: any[] }) => 
    category.components?.some(component => component.name === name)
  )

  const [visibleCode, setVisibleCode] = useState<{ [key: string]: boolean }>({})
  const [copyState, setCopyState] = useState<{ [key: string]: boolean }>({})

  const toggleCode = (exampleKey: string) => {
    setVisibleCode(prev => ({
      ...prev,
      [exampleKey]: !prev[exampleKey]
    }))
  }

  const copyCode = async (code: string, exampleKey: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopyState(prev => ({ ...prev, [exampleKey]: true }))
      setTimeout(() => {
        setCopyState(prev => ({ ...prev, [exampleKey]: false }))
      }, 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <>
      <Hero 
        title={`${linkFormat(name)} (${platform})`} 
        description={`Documentation for the ${linkFormat(name)} component`}
      />
      
      <PageContainer>
        <Flex align="center" className="category-breadcrumb" marginBottom="md">
          <NavLink to="/beta/kits">
            <Body className="previous-route" color="link"><b>Components</b></Body>
          </NavLink>
          <Body marginX="xxs" text="/" />
          {kitCategory && (
            <>
              <NavLink to={`/beta/kit_category/${kitCategory.category}`}>
                <Body className="previous-route" color="link">
                  <b>{linkFormat(kitCategory.category)}</b>
                </Body>
              </NavLink>
              <Body marginX="xxs" text="/" />
            </>
          )}
          <Body><b>{linkFormat(name)}</b></Body>
        </Flex>

        <Title 
          text={`${linkFormat(name)}`}
          size={2}
          marginBottom="md"
        />

        {/* Render Examples via react-live */}
        {examples && examples.length > 0 ? (
          <>
            {examples.map((example: any) => (
              <Card 
                key={example.example_key} 
                marginBottom="lg"
                padding="none"
              >
                  <Caption 
                    text={example.title}
                    margin="md"
                  />
                  <LiveExample
                    code={example.source}
                  />
                  {
                    example.description && example.description !== "" && (
                      <Body
                        margin="md"
                      >
                        <ReactMarkdown>{example.description}</ReactMarkdown>
                        </Body>
                    )
                  }
                {/* Code Section, needs design, just rendering for now */}
                <>
                  <Flex justify="end" align="center" marginBottom="sm">
                      <Button
                        text={copyState[example.example_key] ? "Copied!" : "Copy Code"}
                        variant="link"
                        size="sm"
                        icon="copy"
                        onClick={() => copyCode(example.source, example.example_key)}
                        marginRight="sm"
                      />
                      <Button
                        text={visibleCode[example.example_key] ? "Hide Code" : "Show Code"}
                        variant="link"
                        size="sm"
                        icon="code"
                        onClick={() => toggleCode(example.example_key)}
                      />
                  </Flex>
                  
                  {visibleCode[example.example_key] && (
                    <Card borderNone width="100%">
                      <pre className="highlight">
                        <code>{example.source}</code>
                      </pre>
                    </Card>
                  )}
                </>
              </Card>
            ))}
          </>
        ) : (
          <Card padding="md">
            <Body text={`No examples found for ${name} component.`} />
          </Card>
        )}
      </PageContainer>
    </>
  )
}

export default KitShow