import { NavLink, useLoaderData, useParams } from "react-router-dom"
import { Body, Flex, Title, Card, Button, SectionSeparator } from "playbook-ui"
import { useState } from "react"

import { Hero } from "../../components/Hero"
import { PageContainer } from "../../components/PageContainer"
import { linkFormat } from "../../../../../utilities/website_sidebar_helper"

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

console.log(examples)
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
          text={`${linkFormat(name)} Component`}
          size={2}
          marginBottom="md"
        />

        {/* Render Examples */}
        {examples && examples.length > 0 ? (
          <div>
            {examples.map((example: any) => (
              <Card 
                key={example.example_key} 
                marginBottom="lg"
                padding="none"
              >
                <div style={{ padding: '16px' }}>
                  <Title 
                    text={example.title}
                    size={4}
                    marginBottom="sm"
                  />
                </div>

                {/* Code Section, needs design, just rendering for now */}
                <SectionSeparator />
                <div style={{ padding: '16px 16px 0 16px' }}>
                  <Flex justify="between" align="center" marginBottom="sm">
                    <Body text="Code Example" />
                    <Flex>
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
                  </Flex>
                  
                  {visibleCode[example.example_key] && (
                    <div style={{ marginBottom: '16px' }}>
                      <pre style={{ 
                        background: '#f5f5f5', 
                        padding: '16px', 
                        borderRadius: '4px',
                        overflow: 'auto',
                        fontSize: '14px',
                        lineHeight: '1.4'
                      }}>
                        <code>{example.source}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
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