import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { GlobalProps, globalProps } from '../utilities/globalProps'

import Avatar from '../pb_avatar/_avatar'
import Body from '../pb_body/_body'
import Title from '../pb_title/_title'
import Caption from '../pb_caption/_caption'
import Detail from '../pb_detail/_detail'

type UserProps = {
  align?: "left" | "center" | "right",
  aria?: {[key: string]: string},
  avatar?: boolean,
  avatarUrl?: string,
  bold?: boolean,
  className?: string,
  dark?: boolean,
  data?: {[key: string]: string},
  avatarGrayscale?: boolean,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  name?: string,
  nameStyle?: "title" | "body" | "caption" | "detail"
  orientation?: "horizontal" | "vertical",
  size?: "sm" | "md" | "lg",
  subtitle?: string | Array<Node> | Node,
  territory?: string,
  title?: string,
  titleStyle?: "title" | "body" | "caption" | "detail",
} & GlobalProps

const User = (props: UserProps): React.ReactElement => {
  const {
    align = 'left',
    aria = {},
    avatar = false,
    avatarUrl,
    bold = true,
    className,
    dark = false,
    data = {},
    avatarGrayscale = false,
    htmlOptions = {},
    id,
    name,
    nameStyle = 'title',
    orientation = 'horizontal',
    size = 'sm',
    subtitle,
    territory = '',
    title = '',
    titleStyle = 'body',
  } = props

  const dataProps: {[key: string]: string} = buildDataProps(data)
  const ariaProps: {[key: string]: string} = buildAriaProps(aria)
  const htmlProps = buildHtmlProps(htmlOptions)

  const classes = classnames(
    buildCss('pb_user_kit', align, orientation, size),
    globalProps(props),
    className
  )

  const avatarPresent = avatar || avatarUrl
  const titleText = territory === '' ? title : `${territory} • ${title}`

  const renderNameComponent = () => {
    switch (nameStyle) {
      case "title":
        return (
          <Title
              bold={bold}
              dark={dark}
              size={size === "lg" ? 3 : 4}
              text={name}
          />
        );
      case "body":
        return (
          <Body
              dark={dark}
              text={name}
          />
        );
      case "caption":
        return (
          <Caption
              dark={dark}
              size={size === "sm" ? "xs" : size}
              text={name}
          />
        );
      case "detail":
        return (
          <Detail
              dark={dark}
              text={name}
          />
        );
      default:
        return null;
    }
  };

  const renderTitleComponent = () => {
    switch (titleStyle) {
      case "body":
        return (
          <Body
              color="light"
              dark={dark}
              text={titleText}
              variant={null}
          />
        );
      case "caption":
        return (
          <Caption
              dark={dark}
              size={size === "sm" ? "xs" : size}
              text={titleText}
          />
        );
      case "detail":
        return (
          <Detail
              dark={dark}
              text={titleText}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      { avatarPresent &&
        <Avatar
            grayscale={avatarGrayscale}
            imageUrl={avatarUrl}
            name={name}
            size={size}
            status={null}
        />
      }
      <div className="content_wrapper">
        {renderNameComponent()}
        {renderTitleComponent()}
        { typeof(subtitle) === 'string' &&
          <Body
              color="light"
              dark={dark}
              text={subtitle}
              variant={null}
          />
        }
        { typeof(subtitle) !== 'string' &&
          <>
            {subtitle}
          </>
        }
      </div>
    </div>
  )
}

export default User
