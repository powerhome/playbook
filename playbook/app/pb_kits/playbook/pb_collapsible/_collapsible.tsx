import React, { useEffect } from 'react'
import classnames from 'classnames'
import  useCollapsible from './useCollapsible'

import { globalProps } from '../utilities/globalProps'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'

import CollapsibleContent from './child_kits/CollapsibleContent'
import CollapsibleMain from './child_kits/CollapsibleMain'
import CollapsibleContext from './context'
import { IconSizes } from "../pb_icon/_icon"
import CollapsibleIcon from './child_kits/CollapsibleIcon'


type CollapsibleProps = {
  children?: React.ReactElement | [] | any,
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
}

const Collapsible = ({
  aria = {},
  className,
  children = [],
  collapsed = true,
  data = {},
  htmlOptions = {},
  icon,
  iconColor = 'default',
  iconSize,
  onIconClick,
  onClick,
  id,
  ...props
}: CollapsibleProps): React.ReactElement => {
  const [isCollapsed, toggle, setIsCollapsed] = useCollapsible(collapsed)

  useEffect(()=> {
   setIsCollapsed(collapsed)
  },[collapsed])

  const CollapsibleParent = React.Children.toArray(children) as React.ReactElement[]

  if (CollapsibleParent.length !== 2) {
    throw new Error('Collapsible requires <CollapsibleMain> and <CollapsibleContent> to function properly.')
  }
  const FirstChild = CollapsibleParent[0]
  const SecondChild = CollapsibleParent[1]

  const Main = FirstChild.type === CollapsibleMain ? FirstChild : null
  const Content = SecondChild.type === CollapsibleContent ? SecondChild : null


  const { children: mainChildren = null, ...mainProps } = Main ? Main.props : {}
  const { children: contentChildren = null, ...contentProps } = Content ? Content.props : {}
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss('pb_collapsible_kit'),
    globalProps(props),
    className
  )
  return (
    <CollapsibleContext.Provider value={{ collapsed: isCollapsed, toggle, icon, iconSize, iconColor, onIconClick, onClick }}>
      <div
          {...ariaProps}
          {...dataProps}
          {...htmlProps}
          className={classes}
          id={id}
      >
        {Main ? (
          <CollapsibleMain {...mainProps}>
            {mainChildren}
          </CollapsibleMain>
        ) : (
          FirstChild
        )}

        {Content && (
          <CollapsibleContent {...contentProps}>
            {contentChildren}
          </CollapsibleContent>
        )}
      </div>
    </CollapsibleContext.Provider>
  )
}

Collapsible.Main = CollapsibleMain
Collapsible.Content = CollapsibleContent
Collapsible.Icon = CollapsibleIcon

export default Collapsible
