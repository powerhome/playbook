import React from 'react'
import { Card, Layout } from '../../'

const LayoutCollection = (props) => {
  return (
    <div>
      <Layout
          layout="collection"
          {...props}
      >
        <Layout.Body>
          <Card>{'Card content'}</Card>
          <Card>{'Card content'}</Card>
          <Card>{'Card content'}</Card>
          <Card>{'Card content'}</Card>
          <Card>{'Card content'}</Card>
          <Card>{'Card content'}</Card>
          <Card>{'Card content'}</Card>
          <Card>{'Card content'}</Card>
          <Card>{'Card content'}</Card>
          <Card>{'Card content'}</Card>
        </Layout.Body>
      </Layout>
    </div>
  )
}

export default LayoutCollection
