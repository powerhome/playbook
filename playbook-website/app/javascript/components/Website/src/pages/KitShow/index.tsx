import { useLoaderData, useParams } from "react-router-dom"
import { Body, Flex, Title, Card, Button, Caption } from "playbook-ui"
import { useState, useMemo } from "react"
import ReactMarkdown from 'react-markdown'

import { PageContainer } from "../../components/PageContainer"
import { linkFormat } from "../../../../../utilities/website_sidebar_helper"
import LiveExample from "../../components/LiveExamples/LiveExampleReact"

const KitShow = () => {
  const { name } = useParams()
  const loaderData = useLoaderData() as any
  const { examples, kit_description } = loaderData
  // Prepare example props for advanced_table examples
  const exampleProps = useMemo(() => {
    const isAdvancedTable = loaderData?.kit === "advanced_table"
    if (!isAdvancedTable) return {}
    
    return {
      // Provide datasets to examples under expected variable names
      MOCK_DATA: loaderData.table_data || [],
      MOCK_DATA_WITH_ID: loaderData.table_data_with_id || [],
      MOCK_DATA_NO_SUBROWS: loaderData.table_data_no_subrows || [],
      PAGINATION_MOCK_DATA: loaderData.table_data_pagination || [],
      INFINITE_SCROLL_MOCK_DATA: loaderData.table_data_infinite_scroll || [],
    }
  }, [loaderData])


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
      <PageContainer>
        <Title 
          text={`${linkFormat(name)}`}
          size={1}
          marginBottom={kit_description ? undefined : "md"}
        />
        {kit_description && kit_description !== "" && (
          <Body marginTop="sm" marginBottom="md">
            <ReactMarkdown>{kit_description}</ReactMarkdown>
          </Body>
        )}

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
                    exampleProps={exampleProps}
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