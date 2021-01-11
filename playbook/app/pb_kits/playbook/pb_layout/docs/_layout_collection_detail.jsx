import React from 'react'
import { Card, Layout, Nav, NavItem } from '../../'
const Cards = ({ n }) => {
  const cards = []
  for (let i = 0; i < n; ++i) {
    cards.push(<Card>{'Card content'}</Card>)
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
