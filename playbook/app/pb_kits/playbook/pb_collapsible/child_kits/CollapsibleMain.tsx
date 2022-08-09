
import classnames from 'classnames'
import React, { useContext } from 'react'
import { buildCss } from '../../utilities/props'
import { globalProps } from '../../utilities/globalProps'

import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'
import CollapsibleContext from '../context'

type CollapsibleMainProps = {
  children: React.ReactNode[] | React.ReactNode,
  className?: string,
  padding?: string,
  cursor?: string
}

type IconProps = {
  collapsed: boolean | (()=> void)
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
  cursor = 'pointer',
  padding = 'md',

  ...props
}: CollapsibleMainProps) => {
  const context: {[key: string]: (()=> void)} | boolean = useContext(CollapsibleContext)
  const mainCSS = buildCss('pb_collapsible_main_kit')
  const mainSpacing = globalProps(props, { cursor, padding })

  return (
    <div className={classnames(mainCSS, className, mainSpacing)}>
      <div onClick={() => context.collapse()}>
        <Flex
            spacing="between"
            vertical="center"
        >
          <FlexItem>{children}</FlexItem>
          <FlexItem><Icon collapsed={context.collapsed}/></FlexItem>
        </Flex>
      </div>
    </div>
  )
}

export default CollapsibleMain
