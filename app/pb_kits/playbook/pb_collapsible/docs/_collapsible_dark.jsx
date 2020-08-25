import React from 'react'
import { Collapsible } from '../../'
import { Card } from '../'

const CollapsibleDark = () => (
  <div>
    <Collapsible dark />
    <Card dark>{'Card Content'}</Card>
  </div>
)

export default CollapsibleDark
