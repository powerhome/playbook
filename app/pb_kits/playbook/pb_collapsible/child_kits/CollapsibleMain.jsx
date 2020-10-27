/* @flow */

import classnames from 'classnames'
import { Flex, FlexItem } from '../../'
import React, { useContext } from 'react'
import { buildCss } from '../../utilities/props'
import { globalProps } from '../../utilities/globalProps.js'
import { CollapsibleContext } from '../_collapsible.jsx'

type CollapsibleMainProps = {
  children: array<React.ReactNode> | React.ReactNode,
  className?: string,
  padding?: string,
}

type IconProps = {
  collapsed: boolean
}

const Icon = ({ collapsed }: IconProps) => {
  const direction = collapsed ? 'down' : 'up'

  return (
    <div
        key={direction}
        style={{ verticalAlign: 'middle' }}
    >
      <i className={`far fa-chevron-${direction} fa-fw`} />
    </div>
  )
}

const CollapsibleMain = ({
  children,
  className,
  padding = 'md',
  ...props
}: CollapsibleMainProps) => {
  const context = useContext(CollapsibleContext)
  const mainCSS = buildCss('pb_collapsible_main_kit')
  const mainSpacing = globalProps(props, { padding })

  return (
    <div className={classnames(mainCSS, className, mainSpacing)}>
      <div onClick={() => context.collapse()}>
        <Flex
            spacing="between"
            vertical="center"
        >
          <FlexItem>{children}</FlexItem>
          <FlexItem><Icon collapsed={context.collapsed} /></FlexItem>
        </Flex>
      </div>
    </div>
  )
}

export default CollapsibleMain
