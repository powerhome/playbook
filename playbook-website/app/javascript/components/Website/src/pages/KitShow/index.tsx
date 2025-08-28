import { NavLink, useLoaderData, useParams } from "react-router-dom"
import { Body, Flex, Icon, Title } from "playbook-ui"

import { Hero } from "../../components/Hero"
import { PageContainer } from "../../components/PageContainer"
import { linkFormat } from "../../../../../utilities/website_sidebar_helper"

const KitShow = () => {
  const { name, platform } = useParams()
  const { kits } = useLoaderData()

  // Find which category this kit belongs to
  const kitCategory = kits?.find(category => 
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
            <Body className="previous-route" color="light">Components</Body>
          </NavLink>
          <Icon className="category-breadcrumb-icon" icon="angle-right" />
          {kitCategory && (
            <>
              <NavLink to={`/beta/kit_category/${kitCategory.category}`}>
                <Body className="previous-route" color="light">
                  {linkFormat(kitCategory.category)}
                </Body>
              </NavLink>
              <Icon className="category-breadcrumb-icon" icon="angle-right" />
            </>
          )}
          <Body text={linkFormat(name)} />
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