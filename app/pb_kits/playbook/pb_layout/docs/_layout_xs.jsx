import React from "react"

import {
  Layout,
} from "../.."

function LayoutXs() {
  return (
    <Layout position="left" size="xs" collapse="sm">
      <Sidebar>{`Side`}</Sidebar>
      <Body>{`Body`}</Body>
    </Layout>
  )
}

export default LayoutXs;
