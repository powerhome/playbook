import React from 'react'
import Layout from '../_layout.jsx'
import Sidebar from '../_sidebar.jsx'
import Body from '../_body.jsx'

const LayoutXs = () => {
  return (
    <Layout
        collapse="sm"
        position="left"
        size="xs"
    >
      <Sidebar>{'Side'}</Sidebar>
      <Body>{'Body'}</Body>
    </Layout>
  )
}

export default LayoutXs
