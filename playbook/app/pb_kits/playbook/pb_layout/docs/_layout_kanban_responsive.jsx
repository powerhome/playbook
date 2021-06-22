import React from 'react'

import Layout from '../_layout'

import Card from '../../pb_card/_card'
import Caption from '../../pb_caption/_caption'

const LayoutKanbanResponsive = (props) => {
  return (
    <div>
      <Layout
          layout="kanban"
          responsive
          {...props}
      >
        <Layout.Body>
          <Caption>{'Queue'}</Caption>
          <Card>{'Card content'}</Card>
          <Card>{'Card content'}</Card>
          <Card>{'Card content'}</Card>
        </Layout.Body>
        <Layout.Body>
          <Caption>{'In Progress'}</Caption>
          <Card>{'Card content'}</Card>
          <Card>{'Card content'}</Card>
          <Card>{'Card content'}</Card>
        </Layout.Body>
        <Layout.Body>
          <Caption>{'Validation'}</Caption>
          <Card>{'Card content'}</Card>
          <Card>{'Card content'}</Card>
          <Card>{'Card content'}</Card>
        </Layout.Body>
        <Layout.Body>
          <Caption>{'Done'}</Caption>
          <Card>{'Card content'}</Card>
          <Card>{'Card content'}</Card>
          <Card>{'Card content'}</Card>
        </Layout.Body>
        <Layout.Body>
          <Caption>{'Another Column'}</Caption>
          <Card>{'Card content'}</Card>
          <Card>{'Card content'}</Card>
          <Card>{'Card content'}</Card>
        </Layout.Body>
      </Layout>
    </div>
  )
}

export default LayoutKanbanResponsive
