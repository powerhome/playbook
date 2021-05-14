import React from 'react'

import Layout from '../_layout'

import Body from '../../pb_body/_body'

const LayoutColor = (props) => {
  return (
    <div>
      <Layout
          collapse="md"
          position="left"
          size="sm"
          {...props}
      >
        <Layout.Side>
          {'Light'}
        </Layout.Side>
        <Layout.Body>
          {'Body'}
        </Layout.Body>
      </Layout>

      <br />
      <br />

      <Layout
          collapse="md"
          position="left"
          size="sm"
          variant="dark"
          {...props}
      >
        <Layout.Side>
          <Body
              dark
              text="Dark"
              {...props}
          />
        </Layout.Side>
        <Layout.Body>
          {'Body'}
        </Layout.Body>
      </Layout>

      <br />
      <br />

      <Layout
          collapse="md"
          position="left"
          size="sm"
          variant="gradient"
          {...props}
      >
        <Layout.Side>
          <Body
              dark
              text="Gradient"
              {...props}
          />
        </Layout.Side>
        <Layout.Body>
          {'Body'}
        </Layout.Body>
      </Layout>
    </div>
  )
}

export default LayoutColor
