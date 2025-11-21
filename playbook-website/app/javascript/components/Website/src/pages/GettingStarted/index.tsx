import { useLoaderData } from "react-router-dom"
import ReactMarkdown from 'react-markdown'
import { Hero } from "../../components/Hero"
import { PageContainer } from "../../components/PageContainer"

const GettingStarted = () => {
  const loaderData = useLoaderData() as any
  const { getting_started_content } = loaderData

  return (
    <>
      <Hero 
        title="Getting Started" 
        description="Learn how to use Playbook in your projects"
      />
      
      <PageContainer>
        <div className="markdown-content">
          <ReactMarkdown>{getting_started_content || ''}</ReactMarkdown>
        </div>
      </PageContainer>
    </>
  )
}

export default GettingStarted
