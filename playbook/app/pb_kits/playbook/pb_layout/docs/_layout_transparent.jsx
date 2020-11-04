import React from 'react'
import { Layout } from '../../'

const LayoutTransparent = () => {
  return (
    <div>
      <Layout
          collapse="sm"
          position="left"
          size="xs"
          transparent
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

export default LayoutTransparent
