import React from 'react'

import Layout from '../_layout'

import Card from '../../pb_card/_card'

const LayoutCollection = (props) => {
  return (
    <div>
      <Layout
          layout="collection"
          {...props}
      >
        <Layout.Body columnGap='sm'
            rowGap="xs"
        >
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
