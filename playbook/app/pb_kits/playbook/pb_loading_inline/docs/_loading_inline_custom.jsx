import React from 'react'

import LoadingInline from '../_loading_inline'

const LoadingInlineCustom = (props) => {
  return (
    <div>
      <LoadingInline
          text=' Saving'
          {...props}
      />
      <LoadingInline
          align="center"
          text=' Saving'      
          {...props}
      />
      <LoadingInline
          align="right"
          text=' Saving'
          {...props}
      />
    </div>
  )
}

export default LoadingInlineCustom
