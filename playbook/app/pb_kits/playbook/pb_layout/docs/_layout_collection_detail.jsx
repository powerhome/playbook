import React from 'react'
import { Card, Layout, Nav, NavItem } from '../../'
const Cards = ({ n }) => {
  const cards = []
  for (let i = 0; i < n; ++i) {
    cards.push(<Card>{'Card content'}</Card>)
  }
  return (cards)
}

const LayoutCollectionDetail = () => {
  return (
    <div>
      <Layout
          layout="collection_detail"
      >
        <Card padding="none">
          {
            <Nav
                link="#"
                marginTop="sm"
                orientation="vertical"
                title="Menu"
            >
              <NavItem
                  link="#"
                  text="Photos"
              />
              <NavItem
                  link="#"
                  text="Music"
              />
              <NavItem
                  active
                  link="#"
                  text="Video"
              />
              <NavItem
                  link="#"
                  text="Files"
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
