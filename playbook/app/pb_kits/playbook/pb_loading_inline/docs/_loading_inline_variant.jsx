import React from 'react'
import { LoadingInline } from 'playbook-ui'

const LoadingInlineVariant = (props) => {
  return (
    <div>

  
      <LoadingInline 
          text="Dotted Loading" 
          variant="dotted" 
          {...props}
      />
      <br />
      
      <LoadingInline
          text="Solid Loading"
          variant="solid"
          {...props}
      />
    </div>
  )
}

export default LoadingInlineVariant