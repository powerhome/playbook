import React from 'react'
import EmptyState from '../_empty_state'
import Flex from '../../pb_flex/_flex'

const EmptyStateOrientation = (props) => (
  <Flex align="center"
      orientation="column"
  >
    <EmptyState
        {...props}
        alignment="left"
        description="Body text goes into detail with possible steps for user to take"
        header="Title Explains"
        image="default"
        orientation="horizontal"
        primaryButton="Next Action"
        size="lg"
    />
  </Flex>
)

export default EmptyStateOrientation
