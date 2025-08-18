import React from 'react'
import { LoadingInline } from 'playbook-ui'

const LoadingInlineVariant = (props) => {
  return (
    <div>
      <LoadingInline 
          text="Solid Loading" 
          variant="solid" 
          {...props}
      />
      <br />
      <LoadingInline 
          text="Dotted Loading" 
          variant="dotted" 
          {...props}
      />
    </div>
  )
}

export default LoadingInlineVariant