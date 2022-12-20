import classnames from 'classnames'
import React, { useContext, useState } from 'react'
import AnimateHeight from 'react-animate-height'
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
  const [contentSpacing, setContentSpacing] = useState(globalProps(props, {}));

  const insertPadding = () => {
    if (!context.collapsed) {
      setContentSpacing(globalProps(props, { padding }))
    }
  }

  const removePadding = () => {
    if (context.collapsed) {
      setContentSpacing(globalProps(props, {}))
    }
  }

  return (
    <div className={classnames(contentCSS, className, contentSpacing)}>
      <AnimateHeight
          duration={300}
          height={context.collapsed ? 0 : 'auto'}
          id="bottom-section"
          onAnimationStart={insertPadding}
          onAnimationEnd={removePadding}
      >
        {children}
      </AnimateHeight>
    </div>
  )
}

export default CollapsibleContent
