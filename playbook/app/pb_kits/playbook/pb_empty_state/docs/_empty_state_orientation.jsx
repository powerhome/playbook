import React from 'react'
import { EmptyState, Flex } from 'playbook-ui'

const EmptyStateOrientation = (props) => (
  <Flex align="center">
    <EmptyState
        {...props}
        alignment="center"
        description="Body text goes into detail with possible steps for user to take"
        header="Title Explains"
        image="https://component.gallery/static/8d36eaa25b6dcb026685101ebc379022/Empty%20state%20icon..svg"
        orientation="horizontal"
        primaryButton="Next Action"
        size="lg"
    />
  </Flex>
)

export default EmptyStateOrientation
