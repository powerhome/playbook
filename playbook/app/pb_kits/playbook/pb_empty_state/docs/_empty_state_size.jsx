import React from 'react'
import EmptyState from '../_empty_state'
import Flex from '../../pb_flex/_flex'

const EmptyStateSize = (props) => (
  <Flex align="center"
      spacing="evenly"
  >
      <EmptyState
          {...props}
          alignment="center"
          description="Body text goes into detail with possible steps for user to take"
          header="Title Explains"
          image="default"
          linkButton="Alt Action"
          onLinkButtonClick={() => alert("link button clicked!")}
          onPrimaryButtonClick={() => alert("primary button clicked!")}
          primaryButton="Next Action"
          size="sm"
      />
      <EmptyState
          {...props}
          alignment="center"
          description="Body text goes into detail with possible steps for user to take"
          header="Title Explains"
          image="default"
          linkButton="Alt Action"
          onLinkButtonClick={() => alert("link button clicked!")}
          onPrimaryButtonClick={() => alert("primary button clicked!")}
          primaryButton="Next Action"
          size="lg"
      />
  </Flex>
)

export default EmptyStateSize
