import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

import Icon from '../pb_icon/_icon'
import Image from '../pb_image/_image'
import Collapsible from '../pb_collapsible/_collapsible'

type NavItemProps = {
  active?: boolean,
  aria?: { [key: string]: string },
  boldText?: boolean,
  emphasized?: boolean,
  children?: React.ReactNode[] | React.ReactNode,
  className?: string,
  collapsible?: boolean,
  collapsibleClick?: () => void,
  data?: object,
  iconLeft?: string,
  iconRight?: string | string[],
  iconRightClick?: () => void,
  iconLeftClick?: () => void,
  id?: string,
  imageUrl?: string,
  link?: string,
  onClick?: React.MouseEventHandler<HTMLElement>,
  target?: '_blank' | '_self' | '_parent' | '_top',
  text: string,
  tierIndicator?: boolean,
  toggleCollapsed?: any
} & GlobalProps

const NavItem = (props: NavItemProps) => {
  const {
    active = false,
    aria = {},
    boldText,
    emphasized,
    children,
    className,
    collapsible,
    collapsibleClick,
    data = {},
    iconLeft,
    iconRight,
    iconRightClick,
    iconLeftClick,
    id,
    imageUrl,
    link,
    onClick = () => { },
    target = '_self',
    text = '',
    tierIndicator,
    toggleCollapsed
  } = props

  const Tag = link ? 'a' : 'div'
  const activeClass = active === true ? 'active' : ''
  const tierIndicatorClass = collapsible && tierIndicator ? 'tier_indicator' : ''
  const boldTextClass = collapsible && boldText ? 'bold_text' : ''
  const emphasizedClass = collapsible && emphasized ? 'emphasized' : ''
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_nav_list_kit_item', activeClass), 
                  collapsible ? buildCss('pb_collapsible_nav_item', activeClass, tierIndicatorClass, boldTextClass, emphasizedClass) : '', 
                  globalProps(props), 
                  className)


  const handleIconClick = (e:any) => {
    if (iconLeftClick) {
    e.stopPropagation();
    iconLeftClick()
    }
  }

  return (
    <li
      {...ariaProps}
      {...dataProps}
      className={classes}
      id={id}
    >
      {
        collapsible ? (
          <Collapsible icon={iconRight ? iconRight : ['plus','minus']} 
            iconSize="xs" 
            id={id}
            collapsed={toggleCollapsed}
            onIconClick={iconRightClick}
            onClick={collapsibleClick}
          >
          <Collapsible.Main>
          <Tag
          className="pb_nav_list_item_link_collapsible"
          href={link}
          onClick={onClick}
          target={target}
        >
          {imageUrl &&
            <div
              className="pb_nav_list_item_icon_section_collapsible"
              key={imageUrl}
              onClick={(e)=>handleIconClick(e)}
            >
              <Image
                className="pb_nav_img_wrapper"
                url={imageUrl}
              />
            </div>
          }
  
          {iconLeft &&
            <div
              className="pb_nav_list_item_icon_section_collapsible"
              key={iconLeft}
              onClick={(e)=>handleIconClick(e)}
            >
              <Icon
                className="pb_nav_list_item_icon_left_collapsible"
                fixedWidth
                icon={iconLeft}
              />
            </div>
          }
           <span className="pb_nav_list_item_text_collapsible">
            {text}
          </span>
        </Tag>
        </Collapsible.Main>
        <Collapsible.Content>
        {children}
        </Collapsible.Content>
        </Collapsible>
        ) : (
        <Tag
          className="pb_nav_list_item_link"
          href={link}
          onClick={onClick}
          target={target}
        >
          {imageUrl &&
            <div
              className="pb_nav_list_item_icon_section"
              key={imageUrl}
            >
              <Image
                className="pb_nav_img_wrapper"
                url={imageUrl}
              />
            </div>
          }
  
          {iconLeft &&
            <div
              className="pb_nav_list_item_icon_section"
              key={iconLeft}
            >
              <Icon
                className="pb_nav_list_item_icon_left"
                fixedWidth
                icon={iconLeft}
              />
            </div>
          }
  
          <span className="pb_nav_list_item_text">
            {text || children}
          </span>
  
          {iconRight &&
            <div
              className="pb_nav_list_item_icon_section"
              key={iconRight as string}
            >
              <Icon
                className="pb_nav_list_item_icon_right"
                fixedWidth
                icon={iconRight as string}
              />
            </div>
          }
        </Tag>
        )
      }
    </li>
  )
}

export default NavItem
