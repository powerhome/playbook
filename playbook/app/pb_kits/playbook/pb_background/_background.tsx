import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { GlobalProps, globalProps } from '../utilities/globalProps'

type BackgroundProps = {
  alt?: string,
  aria?: {[key: string]: string},
  backgroundColor?: 'gradient' | 'dark' | 'light' | 'white' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'primary' | 'category_1' | 'category_2' | 'category_3' | 'category_4' | 'category_5' | 'category_6' | 'category_7' | 'category_8' | 'category_9' | 'category_10' | 'category_11' | 'category_12' | 'category_13' | 'category_14' | 'category_15' | 'category_16' | 'category_17' | 'category_18' | 'category_19' | 'category_20' | 'category_21' | 'data_1' | 'data_2' | 'data_3' | 'data_4' | 'data_5' | 'data_6' | 'data_7' | 'data_8' | 'text_lt_default' | 'text_lt_light' | 'text_lt_lighter' | 'text_dk_default' | 'text_dk_light' | 'text_dk_lighter' | 'bg_light' | 'bg_dark' | 'bg_gradient' | 'card_light' | 'card_dark' | 'primary_action' | 'active_light' | 'active_dark' | 'border_light' | 'border_dark' | 'shadow' | 'windows' | 'siding' | 'doors' | 'solar' | 'roofing' | 'gutters',
  backgroundRepeat?: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat' | 'space' | 'round' | 'initial' | 'inherit',
  backgroundSize?: 'auto' | 'cover' | 'contain',
  children?: React.ReactChild[] | React.ReactNode,
  className?: string,
  customColor?: string,
  data?: {[key: string]: string},
  id?: string,
  imageUrl?: string,
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div',
  transition?: 'fade' | 'blur' | 'scale',
} & GlobalProps

const Background = (props: BackgroundProps) => {
  const {
    alt = '',
    aria = {},
    backgroundColor = 'light',
    backgroundRepeat = 'initial',
    backgroundSize = 'cover',
    children,
    className,
    customColor,
    data = {},
    id,
    imageUrl = '',
    tag = 'div',
    transition = '',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundRepeat: `${backgroundRepeat}`,
    backgroundSize: `${backgroundSize}`,
  }
  const getBackgroundColor = customColor ? 'pb_background_custom_color' : `pb_background_color_${backgroundColor}`
  const classes = classnames(buildCss('pb_background_kit'), 'lazyload', backgroundStyle, transition, globalProps(props), getBackgroundColor, className)


  const Tag: React.ReactElement | any = `${tag}`

  const displayReturn = () => {
    if (imageUrl)
      return (
        <Tag
            alt={alt}
            style={backgroundStyle}
            {...ariaProps}
            {...dataProps}
            className={classes}
            id={id}
        >
          { children }
        </Tag>
      )
    else
      return (
        <Tag
            {...ariaProps}
            {...dataProps}
            className={classes}
            id={id}
            style={customColor ? { backgroundColor: customColor } : null}
        >
          { children }
        </Tag>
      )
  }

  return (
    <>
      { displayReturn() }
    </>
  )
}

export default Background
