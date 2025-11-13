import React from 'react'
import EmptyState from '../_empty_state'
import Flex from '../../pb_flex/_flex'

const EmptyStateDefault = (props) => (
  <Flex align="center"
      orientation="column"
  >
    <EmptyState
        {...props}
        description="Body text goes into detail with possible steps for user to take"
        header="Title Explains"
        image="default"
    />
  </Flex>
)

export default EmptyStateDefault
