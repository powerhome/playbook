import React from 'react'
import Card from '../_card.jsx'

const CardLight = (props) => {
  return (
    <div>
      <Card {...props} container="sm">{'Container Small'}</Card>
      <Card {...props} container="md">{'Container Medium'}</Card>
      <Card {...props} container="lg">{'Container Large'}</Card>
      <Card {...props} container="xl">{'Container Extra Large'}</Card>
    </div>
  )
}

export default CardLight
