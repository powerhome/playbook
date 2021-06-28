import React from 'react'

import Layout from '../_layout'

const LayoutSizes = (props) => {
  return (
    <div>
      <Layout
          collapse="xs"
          position="left"
          size="xs"
          {...props}
      >
        <Layout.Side>
          {'Side'}
        </Layout.Side>
        <Layout.Body>
          {'Body'}
        </Layout.Body>
      </Layout>

      <br />
      <br />

      <Layout
          collapse="xs"
          position="left"
          size="sm"
          {...props}
      >
        <Layout.Side>
          {'Side'}
        </Layout.Side>
        <Layout.Body>
          {'Body'}
        </Layout.Body>
      </Layout>

      <br />
      <br />

      <Layout
          collapse="xs"
          position="left"
          size="md"
          {...props}
      >
        <Layout.Side>
          {'Side'}
        </Layout.Side>
        <Layout.Body>
          {'Body'}
        </Layout.Body>
      </Layout>

      <br />
      <br />

      <Layout
          collapse="xs"
          position="left"
          size="lg"
          {...props}
      >
        <Layout.Side>
          {'Side'}
        </Layout.Side>
        <Layout.Body>
          {'Body'}
        </Layout.Body>
      </Layout>

      <br />
      <br />

      <Layout
          collapse="xs"
          position="left"
          size="xl"
          {...props}
      >
        <Layout.Side>
          {'Side'}
        </Layout.Side>
        <Layout.Body>
          {'Body'}
        </Layout.Body>
      </Layout>
    </div>
  )
}

export default LayoutSizes
