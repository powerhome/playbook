import React from 'react'
import { Card, Layout, Title, User } from '../../'

const LayoutMasonry = (props) => {
  return (
    <div>
      <Layout
          layout="masonry"
          {...props}
      >
        <Layout.Body>
          <Card>
            <Title
                size={4}
                tag="h4"
                text="Title 4"
            />
            <Title
                size={2}
                tag="h2"
                text="Title 2"
            />
          </Card>
          <Card>{'Card content'}</Card>
          <Card>
            <User
                align="center"
                avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
                name="Anna Black"
                orientation="vertical"
                size="lg"
                title="Remodeling Consultant"
            />
          </Card>
          <Card>{'Card content'}</Card>
          <Card>
            <Title
                size={4}
                tag="h4"
                text="Title 4"
            />
            <Title
                size={2}
                tag="h2"
                text="Title 2"
            />
            <Title
                size={3}
                tag="h3"
                text="Title 3"
            />
          </Card>
          <Card>{'Card content'}</Card>
          <Card>
            <Title
                size={4}
                tag="h4"
                text="Title 4"
            />
            <Title
                size={2}
                tag="h2"
                text="Title 2"
            />
          </Card>
          <Card>{'Card content'}</Card>
          <Card>
            <User
                align="center"
                avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
                name="Anna Black"
                orientation="vertical"
                size="lg"
                title="Remodeling Consultant"
            />
          </Card>
          <Card>{'Card content'}</Card>
          <Card>
            <Title
                size={4}
                tag="h4"
                text="Title 4"
            />
            <Title
                size={2}
                tag="h2"
                text="Title 2"
            />
            <Title
                size={3}
                tag="h3"
                text="Title 3"
            />
            <Title
                size={1}
                tag="h1"
                text="Title 1"
            />
          </Card>
          <Card>{'Card content'}</Card>
          <Card>
            <Title
                size={1}
                tag="h1"
                text="Title 1"
            />
            <Title
                size={2}
                tag="h2"
                text="Title 2"
            />
            <Title
                size={3}
                tag="h3"
                text="Title 3"
            />
            <Title
                size={4}
                tag="h4"
                text="Title 4"
            />
          </Card>
        </Layout.Body>
      </Layout>
    </div>
  )
}

export default LayoutMasonry
