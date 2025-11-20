import React from 'react'
import EmptyState from '../_empty_state'
import Flex from '../../pb_flex/_flex'

const EmptyStateAlignment = (props) => (
  <Flex align="center"
      spacing="evenly"
  >
      <EmptyState
          {...props}
          alignment="left"
          description="Body text goes into detail with possible steps for user to take"
          header="Title Explains"
          image="default"
          primaryButton="Next Action"
          size="md"
      />
      <EmptyState
          {...props}
          alignment="center"
          description="Body text goes into detail with possible steps for user to take"
          header="Title Explains"
          image="default"
          primaryButton="Next Action"
          size="md"
      />
      <EmptyState
          {...props}
          alignment="right"
          description="Body text goes into detail with possible steps for user to take"
          header="Title Explains"
          image="default"
          primaryButton="Next Action"
          size="md"
      />
  </Flex>
)

export default EmptyStateAlignment
