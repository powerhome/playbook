import React from 'react'
import { EmptyState, Flex } from 'playbook-ui'

const EmptyStateAlignment = (props) => (
  <Flex align="center"
      spacing="evenly"
  >
      <EmptyState
          {...props}
          alignment="left"
          description="Body text goes into detail with possible steps for user to take"
          header="Title Explains"
          image="https://component.gallery/static/8d36eaa25b6dcb026685101ebc379022/Empty%20state%20icon..svg"
          primaryButton="Next Action"
          size="md"
      />
      <EmptyState
          {...props}
          alignment="center"
          description="Body text goes into detail with possible steps for user to take"
          header="Title Explains"
          image="https://component.gallery/static/8d36eaa25b6dcb026685101ebc379022/Empty%20state%20icon..svg"
          primaryButton="Next Action"
          size="md"
      />
      <EmptyState
          {...props}
          alignment="right"
          description="Body text goes into detail with possible steps for user to take"
          header="Title Explains"
          image="https://component.gallery/static/8d36eaa25b6dcb026685101ebc379022/Empty%20state%20icon..svg"
          primaryButton="Next Action"
          size="md"
      />
  </Flex>
)

export default EmptyStateAlignment
