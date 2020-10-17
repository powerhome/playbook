import React from 'react'
import { Card, Layout } from '../../'

const LayoutCollection = () => {
  return (
    <div>
      <Layout
          layout="collection"
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
