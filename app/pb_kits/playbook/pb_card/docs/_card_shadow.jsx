import React from 'react'
import { Card } from '../../'

const CardShadow = () => {
  return (
    <div>
      <Card shadow='none'>{'Card content'}</Card>
      <br />
      <Card shadow='shallow'>{'Card content'}</Card>
      <br />
      <Card shadow='default'>{'Card content'}</Card>
      <br />
      <Card shadow='deep'>{'Card content'}</Card>
      <br />
      <Card shadow='deeper'>{'Card content'}</Card>
      <br />
      <Card shadow='deepest'>{'Card content'}</Card>
      <br />
    </div>
  )
}

export default CardShadow
