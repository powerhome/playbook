/* @flow */

import classnames from 'classnames'
import React, { useState } from 'react'
import { globalProps } from '../utilities/globalProps.js'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import CollapsibleContent from './child_kits/CollapsibleContent'
import CollapsibleMain from './child_kits/CollapsibleMain'

export const CollapsibleContext = React.createContext({})

type CollapsibleProps = {
  children: React.ChildrenArray<React.Element<typeof Main | Content>>,
  aria?: object,
  className?: string,
  collapsed?: boolean,
  data?: object,
  id?: string,
  padding?: string,
}

const useCollapsible = (initial = false) => {
  const [collapsed, setCollapsed] = useState(initial)

  return [
    collapsed,
    () => setCollapsed((t) => !t),
  ]
}

const Collapsible = ({
  aria = {},
  className,
  children = [],
  collapsed = false,
  data = {},
  id,
  padding = 'md',
  ...props
}: CollapsibleProps) => {
  const [isCollapsed, collapse] = useCollapsible(collapsed)
  const Main = React.Children.toArray(children).find((child) => child.type === CollapsibleMain)
  const Content = React.Children.toArray(children).find((child) => child.type === CollapsibleContent)
  const { children: mainChildren, ...mainProps } = Main.props
  const { children: contentChildren, ...contentProps } = Content.props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_collapsible'),
    className,
    globalProps(props, { padding })
  )

  return (
    <CollapsibleContext.Provider value={{ collapsed: isCollapsed, collapse }}>
      <div
          {...ariaProps}
          {...dataProps}
          className={classes}
          id={id}
      >
        <CollapsibleMain {...mainProps}>
          {mainChildren}
        </CollapsibleMain>

        <CollapsibleContent {...contentProps}>
          {contentChildren}
        </CollapsibleContent>
      </div>
    </CollapsibleContext.Provider>
  )
}

Collapsible.Main = CollapsibleMain
Collapsible.Content = CollapsibleContent

export default Collapsible
