import React from 'react'
import LoadingInline from '../_loading_inline'

const LoadingInlineVariant = (props) => {
  return (
    <div>
      <LoadingInline 
          text=" Dotted Spinner" 
          variant="dotted" 
          {...props}
      />

      <br />
  
      <LoadingInline
          text=" Solid Spinner"
          variant="solid"
          {...props}
      />
    </div>
  )
}

export default LoadingInlineVariant