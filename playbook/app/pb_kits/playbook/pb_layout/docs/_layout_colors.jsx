import React from 'react'
import { Body, Layout } from '../../'

const LayoutColor = () => {
  return (
    <div>
      <Layout
          collapse="md"
          position="left"
          size="sm"
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
      >
        <Layout.Side>
          <Body
              dark
              text="Dark"
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
      >
        <Layout.Side>
          <Body
              dark
              text="Gradient"
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
