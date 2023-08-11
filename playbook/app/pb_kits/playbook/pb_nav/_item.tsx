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
  fontWeight?: "bold" | "regular",
  children?: React.ReactNode[] | React.ReactNode,
  className?: string,
  collapsible?: boolean,
  data?: object,
  dark?: boolean,
  fontSize?: "normal" | "small",
  iconLeft?: string,
  iconRight?: string | string[],
  onIconRightClick?: () => void,
  onIconLeftClick?: () => void,
  id?: string,
  imageUrl?: string,
  link?: string,
  onClick?: () => void,
  target?: '_blank' | '_self' | '_parent' | '_top',
  text: string,
  collapsibleTrail?: boolean,
  collapsed?: boolean
} & GlobalProps

const NavItem = (props: NavItemProps) => {
  const {
    active = false,
    aria = {},
    fontWeight = "regular",
    children,
    className,
    collapsible,
    data = {},
    dark = false,
    fontSize = "normal",
    iconLeft,
    iconRight,
    onIconRightClick,
    onIconLeftClick,
    id,
    imageUrl,
    link,
    onClick = () => { },
    target = '_self',
    text = '',
    collapsibleTrail,
    collapsed
  } = props

  const Tag = link ? 'a' : 'div'
  const activeClass = active === true ? 'active' : ''
  const collapsibleTrailClass = collapsible && collapsibleTrail ? 'collapsible_trail' : ''
  const fontSizeClass = fontSize === 'small' ? "font_size_small" : "font_size_normal"
  const fontWeightClass = fontWeight === 'bold' ? "font_bold" : "font_regular"
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_nav_list_kit_item', activeClass), 
                  collapsible ? buildCss('pb_collapsible_nav_item', activeClass, collapsibleTrailClass) : '', 
                  fontSizeClass,
                  fontWeightClass,
                  globalProps(props), 
                  className)


  const handleIconClick = (e:any) => {
    if (onIconLeftClick) {
    e.stopPropagation();
    onIconLeftClick()
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
            collapsed={collapsed}
            onIconClick={onIconRightClick}
            onClick={onClick}
          >
          <Collapsible.Main dark={dark}>
          <Tag
          className="pb_nav_list_item_link_collapsible"
          href={link}
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
