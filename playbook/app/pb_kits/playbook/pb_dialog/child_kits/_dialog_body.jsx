/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../../utilities/props'
import { globalProps } from '../../utilities/globalProps'

// Body component
const DialogBody = (props: DialogBodyProps) => {
  const { children, padding = 'md', className } = props
  const bodyCSS = buildCss('dialog_body')
  const bodySpacing = globalProps(props, { padding })

  return (
    <div className={classnames(bodyCSS, bodySpacing, className)}>
      {children}
    </div>
  )
}

export default DialogBody
