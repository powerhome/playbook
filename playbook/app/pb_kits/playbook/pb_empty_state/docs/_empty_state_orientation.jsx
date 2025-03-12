import React from 'react'
import { EmptyState, Flex } from 'playbook-ui'

const EmptyStateOrientation = (props) => (
  <Flex align="center">
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
