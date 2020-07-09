import React from 'react'
import { Caption, Card, Image, Layout, Nav, NavItem } from '../../../../pb_kits/playbook'

const CollectionDetail = () => (
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
        <Card padding="none">
          <Card.Header>
            <Caption
                dark
                text="Caption"
            />
          </Card.Header>
          <Card.Body>
            <Image url="https://unsplash.it/500/400/?image=634" />
          </Card.Body>
        </Card>
      </Layout.Body>

    </Layout>

  </div>
)

export default CollectionDetail
