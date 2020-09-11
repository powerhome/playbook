import React from 'react'
import { Collapsible } from '../..'

const CollapsibleDefault = () => (
  <div>
    <Collapsible>
      <Collapsible.Main>
        <div>{'Main Section TEST'}</div>
      </Collapsible.Main>
      <Collapsible.Content>
        <div>{'Content Section'}</div>
      </Collapsible.Content>
    </Collapsible>
  </div>
)

export default CollapsibleDefault
