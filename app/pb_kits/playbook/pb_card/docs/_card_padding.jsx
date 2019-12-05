import React from 'react'
import { Card } from '../../'

function CardPadding() {
  return (
    <div>
      <Card padding='none'>{'Card content'}</Card>
      <br />
      <Card padding='xs'>{'Card content'}</Card>
      <br />
      <Card padding='sm'>{'Card content'}</Card>
      <br />
      <Card padding='md'>{'Card content'}</Card>
      <br />
      <Card padding='lg'>{'Card content'}</Card>
      <br />
      <Card padding='xl'>{'Card content'}</Card>
      <br />
    </div>
  )
}

export default CardPadding
