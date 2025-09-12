/* eslint-disable react/no-multi-comp */

import React from 'react'
import { get } from '../utilities/object'

import classnames from 'classnames'

import { buildAriaProps, buildDataProps, buildHtmlProps } from '../utilities/props'
import { GlobalProps, globalProps, globalInlineProps } from '../utilities/globalProps'
import type { ProductColors, CategoryColors, BackgroundColors, StatusColors } from '../types/colors'

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
  dragId?: string,
  draggableItem?: boolean,
  dragHandle?: boolean,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  highlight?: {
    position?: "side" | "right_side" | "top",
    color?: string,
  },
  id?: string,
  length?: number,
  padding?: string,
  selected?: boolean,
  tag?: "div" | "section" | "footer" | "header" | "article" | "aside" | "main" | "nav",
} & GlobalProps

type CardHeaderProps = {
  headerColor?: BackgroundColors | ProductColors | CategoryColors | StatusColors | "none",
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
  const headerColorCSS = `pb_card_header_kit_${headerColor}`
  const headerStripedCSS = headerColorStriped ? `pb_card_header_kit_${headerColor}_striped` : ''

  const headerCSS = classnames(
    'pb_card_header_kit',
    headerColorCSS,
    headerStripedCSS
  )

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
  const bodySpacing = globalProps(props)

  return (
    <div className={classnames('pb_card_body_kit', bodySpacing, className)}>
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
    dragId,
    dragHandle = true,
    draggableItem = false,
    highlight = {},
    htmlOptions = {},
    selected = false,
    tag = 'div',
  } = props
  const borderCSS = borderNone == true ? 'pb_card_kit_border_none' : ''
  const selectedCSS = selected == true ? 'pb_card_kit_selected' : ''
  const backgroundCSS = background == 'none' ? '' : `pb_card_kit_background_${background}`
  const borderRadiusCSS = borderRadius !== 'md' ? `pb_card_kit_border_radius_${borderRadius}` : ''
  const highlightPositionCSS = highlight.position ? `pb_card_kit_highlight_${highlight.position}` : ''
  const highlightColorCSS = highlight.color ? `pb_card_kit_highlight_${highlight.color}` : ''

  const cardCss = classnames(
    'pb_card_kit', // Base class
    selectedCSS,
    borderCSS,
    borderRadiusCSS,
    backgroundCSS,
    highlightPositionCSS,
    highlightColorCSS
  )
  const ariaProps: {[key: string]: string} = buildAriaProps(aria)
  const dataProps: {[key: string]: string} = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions);

  // coerce to array
  const cardChildren = React.Children.toArray(children)
  const dynamicInlineProps = globalInlineProps(props);
  const { style: htmlStyle = {}, ...restHtmlProps } = htmlProps as { style?: React.CSSProperties };
  const mergedStyles: React.CSSProperties = { ...htmlStyle, ...dynamicInlineProps };


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
        <Draggable.Item dragId={dragId}
            key={dragId}
        >
        <Tag
            {...ariaProps}
            {...dataProps}
            className={classnames(cardCss, globalProps(props), className)}
            {...restHtmlProps}
            style={mergedStyles}
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
                <div style={{width: '100%'}}>
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
              className={classnames(cardCss, globalProps(props), className)}
              {...restHtmlProps}
              style={mergedStyles}
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
