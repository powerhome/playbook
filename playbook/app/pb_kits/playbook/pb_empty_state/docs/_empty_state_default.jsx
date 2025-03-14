import React from 'react'
import { EmptyState, Flex } from 'playbook-ui'

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
