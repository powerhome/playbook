import React from 'react'
import { Layout } from '../../'

const LayoutTransparent = (props) => {
  return (
    <div>
      <Layout
          collapse="sm"
          position="left"
          size="xs"
          transparent
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

export default LayoutTransparent
