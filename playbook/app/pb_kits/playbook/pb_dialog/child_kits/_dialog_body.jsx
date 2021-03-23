

import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../../utilities/props'
import { globalProps } from '../../utilities/globalProps.js'

// Body component
const DialogBody = (props: DialogBodyProps) => {
  const { children, padding = 'sm', className } = props
  const bodyCSS = buildCss('dialog_body')
  const bodySpacing = globalProps(props, { padding })

  return (
    <div className={classnames(bodyCSS, bodySpacing, className)}>
      {children}
    </div>
  )
}

export default DialogBody
