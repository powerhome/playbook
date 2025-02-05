import React from 'react'
import { Emptystate } from 'playbook-ui'

const EmptystateDefault = (props) => (
  <div>
    <Emptystate
        {...props}
        description="This is a description!"
        header="This is a title header"
        image="https://component.gallery/static/8d36eaa25b6dcb026685101ebc379022/Empty%20state%20icon..svg"
        linkButton="Link"
        orientation="horizontal"
        primaryButton="Primary"
        size="lg"
    />
  </div>
)

export default EmptystateDefault
