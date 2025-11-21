import { useLoaderData } from "react-router-dom"
import ReactMarkdown from 'react-markdown'
import { Hero } from "../../components/Hero"
import { PageContainer } from "../../components/PageContainer"

const DesignGuidelines = () => {
  const loaderData = useLoaderData() as any
  const { design_guidelines_content } = loaderData

  return (
    <>
      <Hero 
        title="Design Guidelines" 
        description="Best practices for using Playbook's design system"
      />
      
      <PageContainer>
        <div className="markdown-content">
          <ReactMarkdown>{design_guidelines_content || ''}</ReactMarkdown>
        </div>
      </PageContainer>
    </>
  )
}

export default DesignGuidelines
