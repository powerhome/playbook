import React from 'react'
import { SectionSeparator } from 'playbook-ui'

const SectionSeparatorColor = (props) => {
  return (
    <div>
      <SectionSeparator
          text="Default Color"
          {...props}
      />
       <SectionSeparator
           color="$primary"
           text="Color"
           {...props}
      />
      <SectionSeparator
          color="$primary"
          lineStyle='dashed'
          text="Dashed Color"
          {...props}

        />
    </div>
  )
}

export default SectionSeparatorColor

