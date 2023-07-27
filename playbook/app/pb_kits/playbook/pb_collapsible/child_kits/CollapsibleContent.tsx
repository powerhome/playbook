import classnames from 'classnames'
import React, { useContext } from 'react'
import { buildCss } from '../../utilities/props'
import { globalProps } from '../../utilities/globalProps'

import CollapsibleContext from '../context'

export type CollapsibleContentProps = {
  children?: React.ReactNode[] | React.ReactNode | string,
  className?: string,
  padding?: string,
}

const CollapsibleContent = ({
  children,
  className,
  padding = 'md',
  ...props
}: CollapsibleContentProps) => {
  const context: {[key: string]: boolean | string} = useContext(CollapsibleContext)
  const contentCSS = buildCss('pb_collapsible_content_kit')
  const contentSpacing = globalProps(props, { padding })

  return (
    <div data-collapsible-content="true" className={classnames(contentCSS, contentSpacing, "toggle-content", context.collapsed ? "" : "is-visible", className)}>
      {children}
    </div>
  )
}

export default CollapsibleContent
