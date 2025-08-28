import { NavLink, useLoaderData, useParams } from "react-router-dom"
import { Body, Flex, Title } from "playbook-ui"

import { Hero } from "../../components/Hero"
import { PageContainer } from "../../components/PageContainer"
import { linkFormat } from "../../../../../utilities/website_sidebar_helper"

const KitShow = () => {
  const { name, platform } = useParams()
  const { kits } = useLoaderData() as { kits: Array<{ category: string; components: Array<{ name: string }> }> }

  // Find which category this kit belongs to
  const kitCategory = kits?.find((category: { components: any[] }) => 
    category.components?.some(component => component.name === name)
  )

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
        
        <p>Kit show page for <strong>{name}</strong> in <strong>{platform}</strong> mode.</p>
        <p>This page will be built out later with examples, props, and documentation. This is a scaffold only.</p>
      </PageContainer>
    </>
  )
}

export default KitShow