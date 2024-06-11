/* eslint-disable react/no-multi-comp */

import React from 'react'
import { get } from 'lodash'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { GlobalProps, globalProps } from '../utilities/globalProps'
import type { ProductColors, CategoryColors, BackgroundColors } from '../types/colors'

import Icon from '../pb_icon/_icon'
import Flex from '../pb_flex/_flex'
import Draggable from '../pb_draggable/_draggable'

type CardPropTypes = {
  aria?: {[key: string]: string},
  background?: BackgroundColors | ProductColors | "none",
  borderNone?: boolean,
  borderRadius?: "xs" | "sm" | "md" | "lg" | "xl" | "none" | "rounded",
  children: React.ReactChild[] | React.ReactChild | number,
  className?: string,
  data?: {[key: string]: string},
  draggableItem?: boolean,
  dragHandle?: boolean,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  highlight?: {
    position?: "side" | "top",
    color?: string,
  },
  id?: string,
  length?: number,
  padding?: string,
  selected?: boolean,
  tag?: "div" | "section" | "footer" | "header" | "article" | "aside" | "main" | "nav",
} & GlobalProps

type CardHeaderProps = {
  headerColor?: BackgroundColors | ProductColors | CategoryColors | "none",
  headerColorStriped?: boolean,
  children: React.ReactChild[] | React.ReactChild,
  className?: string,
  padding?: string,
} & GlobalProps

type CardBodyProps = {
  children: React.ReactChild[] | React.ReactChild | string,
  className?: string,
  padding?: string,
} & GlobalProps

// Header component
const Header = (props: CardHeaderProps) => {
  const { children, className, headerColor = 'category_1', headerColorStriped = false } = props
  const headerCSS = buildCss('pb_card_header_kit', `${headerColor}`, headerColorStriped ? 'striped' : '')

  const headerSpacing = globalProps(props)

  return (
    <div className={classnames(headerCSS, headerSpacing, className)}>
      {children}
    </div>
  )
}


// Body component
const Body = (props: CardBodyProps) => {
  const { children, className } = props
  const bodyCSS = buildCss('pb_card_body_kit')
  const bodySpacing = globalProps(props)

  return (
    <div className={classnames(bodyCSS, bodySpacing, className)}>
      {children}
    </div>
  )
}

const Card = (props: CardPropTypes): React.ReactElement => {
  const {
    aria = {},
    background = 'none',
    borderNone = false,
    borderRadius = 'md',
    children,
    className,
    data = {},
    dragHandle = false,
    draggableItem = false,
    highlight = {},
    htmlOptions = {},
    id,
    selected = false,
    tag = 'div',
  } = props
  const borderCSS = borderNone == true ? 'border_none' : ''
  const selectedCSS = selected == true ? 'selected' : 'deselected'
  const backgroundCSS = background == 'none' ? '' : `background_${background}`
  const cardCss = buildCss('pb_card_kit', selectedCSS, borderCSS, `border_radius_${borderRadius}`, backgroundCSS, {
    [`highlight_${highlight.position}`]: highlight.position,
    [`highlight_${highlight.color}`]: highlight.color,
  })
  const ariaProps: {[key: string]: string} = buildAriaProps(aria)
  const dataProps: {[key: string]: string} = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions);

  // coerce to array
  const cardChildren = React.Children.toArray(children)

  const subComponentTags = (tagName: string) => {
    return cardChildren.filter((c: string) => (
      get(c, 'type.displayName') === tagName
    )).map((child, i) => {
      if(React.isValidElement(child)) {
      return React.cloneElement(child, { key: `${tagName.toLowerCase()}-${i}` })
      }
    })
  }

  const nonHeaderChildren = cardChildren.filter((child: Node) => (get(child, 'type.displayName') !== 'Header'))

  const tagOptions = ['div', 'section', 'footer', 'header', 'article', 'aside', 'main', 'nav']
  const Tag = tagOptions.includes(tag) ? tag : 'div'

  return (
    <>
    {
      draggableItem ? (
        <Draggable.Item id={id} 
            key={id}
        >
        <Tag
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classnames(cardCss, globalProps(props), className)}
        >
          {subComponentTags('Header')}
          {
            dragHandle ? (
              <Flex>
                <span className="card_draggable_handle">
                  <Icon 
                      icon="grip-dots-vertical"
                      paddingRight="xs"
                      verticalAlign="middle"
                  />
                </span>
                <div>
                  {nonHeaderChildren}
                </div>
              </Flex>
              ) : (
                nonHeaderChildren
              )
          }
        </Tag>
        </Draggable.Item>
        ) : (
          <Tag
              {...ariaProps}
              {...dataProps}
              {...htmlProps}
              className={classnames(cardCss, globalProps(props), className)}
            >
              {subComponentTags('Header')}
              {nonHeaderChildren}
            </Tag>
              )
      }
    </>
  )
}

Card.Header = Header
Card.Body = Body

export default Card
