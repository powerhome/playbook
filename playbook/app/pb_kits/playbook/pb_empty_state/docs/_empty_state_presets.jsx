import React from 'react'
import EmptyState from '../_empty_state'
import Flex from '../../pb_flex/_flex'

const EmptyStatePresets = (props) => (
  <Flex align="start"
      gap="xl"
      orientation="column"
  >
    <EmptyState
        {...props}
        description="This error was unexpected. Please try again in a moment."
        header="Something went wrong"
        image="this_is_fine"
        primaryButton="Back to home"
    />
    <EmptyState
        {...props}
        description="We could not load this resource. Check the URL or try again later."
        header="We are not sure what happened"
        image="travolta_lost"
        linkButton="Contact support"
    />
  </Flex>
)

export default EmptyStatePresets
