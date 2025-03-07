import React from 'react'
import { EmptyState } from 'playbook-ui'

const EmptyStateDefault = (props) => (
  <div>
    <EmptyState
        {...props}
        alignment="center"
        description="Body text goes into detail with possible steps for user to take"
        header="Title Explains"
        image="https://component.gallery/static/8d36eaa25b6dcb026685101ebc379022/Empty%20state%20icon..svg"
        linkButton="Alt Action"
        orientation="vertical"
        primaryButton="Next Action"
        size="sm"
    />
  </div>
)

export default EmptyStateDefault
