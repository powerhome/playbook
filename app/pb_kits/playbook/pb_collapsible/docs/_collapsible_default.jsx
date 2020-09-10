import React from 'react'
import { Collapsible } from '../..'

const CollapsibleDefault = () => (
  <div>
    <Collapsible>
      <Collapsible.Main>
        {'Main Section'}
      </Collapsible.Main>
      <Collapsible.Content>
        {'Content Section'}
      </Collapsible.Content>
    </Collapsible>
  </div>
)

export default CollapsibleDefault
