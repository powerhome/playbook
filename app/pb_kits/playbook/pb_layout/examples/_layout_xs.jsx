import React from "react"
import Layout from "../_layout.jsx"
import Sidebar from "../_sidebar.jsx"
import Body from "../_body.jsx"

function LayoutXS() {
  return (
    <Layout position="left" size="xs" collapse="sm">
      <Sidebar>{`Side`}</Sidebar>
      <Body>{`Body`}</Body>
    </Layout>
  )
}

export default LayoutXS;
