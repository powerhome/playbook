import React from 'react'
import { Card, Layout } from '../../'

const LayoutContent = () => {
  return (
    <div>
      <Layout layout="content">
        <Layout.Header>
          <Card>
            {'Header'}
          </Card>
        </Layout.Header>
        <Layout.Side>
          <Card>
            {'Sidebar'}
            <br />
            {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis, risus a fringilla luctus, sapien eros sodales ex, quis molestie est nulla non turpis. Vestibulum aliquet at ipsum eget posuere. Morbi sed laoreet erat. Sed commodo posuere lectus, at porta nulla ornare a. Suspendisse quam est, sollicitudin ut enim sit amet, commodo placerat enim. Donec laoreet metus ac mauris pellentesque mattis.'}
          </Card>
        </Layout.Side>
        <Layout.Body>
          <Card>
            {'Body'}
            <br />
            {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis, risus a fringilla luctus, sapien eros sodales ex, quis molestie est nulla non turpis. Vestibulum aliquet at ipsum eget posuere. Morbi sed laoreet erat. Sed commodo posuere lectus, at porta nulla ornare a. Suspendisse quam est, sollicitudin ut enim sit amet, commodo placerat enim. Donec laoreet metus ac mauris pellentesque mattis. Pellentesque luctus vel mauris non aliquam. Mauris hendrerit mattis porttitor. Curabitur vehicula justo non ex consectetur commodo. Quisque posuere aliquet quam. Maecenas malesuada magna mauris, ac tempor metus euismod at.'}
            <br />
            {'Cras ornare fermentum magna mollis efficitur. Sed vitae nulla vel purus ultrices mollis. Maecenas id nulla id libero faucibus feugiat quis sit amet turpis. In commodo pellentesque risus at fringilla. Integer non interdum leo, non commodo ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mi augue, dignissim at orci vel, egestas aliquam mi. Proin finibus aliquet tempor. Integer cursus, ex quis gravida rhoncus, nisi elit viverra ipsum, non efficitur est ex ac tortor. Praesent vitae odio massa.'}
          </Card>
        </Layout.Body>
        <Layout.Footer>
          <Card>
            {'Footer'}
          </Card>
        </Layout.Footer>
      </Layout>
    </div>
  )
}

export default LayoutContent
