import React from 'react'

import Layout from '../_layout'

import Card from '../../pb_card/_card'
import Nav from '../../pb_nav/_nav'
import NavItem from '../../pb_nav/_item'

const Cards = ({ n }) => {
  const cards = []
  for (let i = 0; i < n; ++i) {
    cards.push(<Card key={i}>{'Card content'}</Card>)
  }
  return (cards)
}

const LayoutCollectionDetail = (props) => {
  return (
    <div>
      <Layout
          layout="collection_detail"
          {...props}
      >
        <Card padding="none">
          {
            <Nav
                link="#"
                marginTop="sm"
                orientation="vertical"
                title="Menu"
                {...props}
            >
              <NavItem
                  link="#"
                  text="Photos"
                  {...props}
              />
              <NavItem
                  link="#"
                  text="Music"
                  {...props}
              />
              <NavItem
                  active
                  link="#"
                  text="Video"
                  {...props}
              />
              <NavItem
                  link="#"
                  text="Files"
                  {...props}
              />
            </Nav>
        }
        </Card>

        <Layout.Body>
          <Cards n={16} />
        </Layout.Body>
      </Layout>
    </div>
  )
}

export default LayoutCollectionDetail
