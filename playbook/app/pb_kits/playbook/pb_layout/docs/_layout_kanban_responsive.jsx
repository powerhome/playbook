import React from 'react'
import { Caption, Card, Layout } from '../../'

const LayoutKanbanResponsive = () => {
  return (
    <div>
      <Layout
          layout="kanban"
          responsive
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
