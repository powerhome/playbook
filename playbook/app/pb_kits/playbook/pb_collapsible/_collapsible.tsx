import React, { useEffect, ReactElement } from 'react'
import classnames from 'classnames'
import  useCollapsible from './useCollapsible'

import { globalProps, globalInlineProps, GlobalProps } from '../utilities/globalProps'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'

import CollapsibleContent from './child_kits/CollapsibleContent'
import CollapsibleMain from './child_kits/CollapsibleMain'
import CollapsibleContext from './context'
import { IconSizes } from "../pb_icon/_icon"
import CollapsibleIcon from './child_kits/CollapsibleIcon'

type CollapsibleMainProps = {
  children: React.ReactNode
}

type CollapsibleContentProps = {
  children: React.ReactNode
}

type CollapsibleProps = {
  children?: [ReactElement<CollapsibleMainProps>, ReactElement<CollapsibleContentProps>],
  aria?: {[key: string]: string},
  className?: string,
  collapsed?: boolean,
  data?: {[key: string]: string},
  icon?: string | string[],
  iconColor?: 'default' | 'light' | 'lighter' | 'link' | 'error' | 'success',
  iconSize?: IconSizes,
  onIconClick?: ()=> void,
  onClick?: ()=> void,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'tr' | 'th' | 'td' | 'thead' | 'col',
}

const Collapsible = ({
  aria = {},
  className,
  children,
  collapsed = true,
  data = {},
  htmlOptions = {},
  icon,
  iconColor = 'default',
  iconSize,
  onIconClick,
  onClick,
  id,
  tag = 'div',
  ...props
}: CollapsibleProps & GlobalProps): React.ReactElement => {
  const [isCollapsed, toggle, setIsCollapsed] = useCollapsible(collapsed)

  useEffect(()=> {
   setIsCollapsed(collapsed)
  },[collapsed])

  if (children.length !== 2) {
    throw new Error('Collapsible requires <CollapsibleMain> and <CollapsibleContent> to function properly.')
  }

  const FirstChild = children[0]

  const Main = FirstChild.type === CollapsibleMain ? FirstChild : null
  const Content = children[1]


  const { children: mainChildren = null, ...mainProps } = Main ? Main.props : {}
  const { children: contentChildren, ...contentProps } = Content.props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss('pb_collapsible_kit'),
    globalProps(props),
    className
  )
  const dynamicInlineProps = globalInlineProps(props)

  const Tag: React.ReactElement | any = `${tag}`;

  return (
    <CollapsibleContext.Provider value={{ collapsed: isCollapsed, toggle, icon, iconSize, iconColor, onIconClick, onClick }}>
      <Tag
          {...ariaProps}
          {...dataProps}
          {...htmlProps}
          className={classes}
          id={id}
          style={dynamicInlineProps}
      >
        {Main ? (
          <CollapsibleMain {...mainProps}>
            {mainChildren}
          </CollapsibleMain>
        ) : (
          FirstChild
        )}
          <CollapsibleContent {...contentProps}>
            {contentChildren}
          </CollapsibleContent>
      </Tag>
    </CollapsibleContext.Provider>
  )
}

Collapsible.Main = CollapsibleMain
Collapsible.Content = CollapsibleContent
Collapsible.Icon = CollapsibleIcon

export default Collapsible
