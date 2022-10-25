/* @flow */

import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { GlobalProps, globalProps } from '../utilities/globalProps'

import Avatar from '../pb_avatar/_avatar'
import Body from '../pb_body/_body'
import Title from '../pb_title/_title'

type UserProps = {
  align?: "left" | "center" | "right",
  aria?: {[key: string]: string},
  avatar?: boolean,
  avatarUrl?: string,
  className?: string,
  dark?: boolean,
  data?: {[key: string]: string},
  id?: string,
  name?: string,
  orientation?: "horiztonal" | "vertical",
  size?: "sm" | "md" | "lg",
  subtitle?: string | Array<Node> | Node,
  territory?: string,
  title?: string,
} & GlobalProps

const User = (props: UserProps) => {
  const {
    align = 'left',
    aria = {},
    avatar = false,
    avatarUrl,
    className,
    dark = false,
    data = {},
    id,
    name,
    orientation = 'horizontal',
    size = 'sm',
    subtitle,
    territory = '',
    title = '',
  } = props

  const dataProps: {[key: string]: string} = buildDataProps(data)
  const ariaProps: {[key: string]: string} = buildAriaProps(aria)

  const classes = classnames(
    buildCss('pb_user_kit', align, orientation, size),
    globalProps(props),
    className,
  )

  const avatarPresent = avatar || avatarUrl

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      { avatarPresent &&
        <Avatar
            imageUrl={avatarUrl}
            name={name}
            size={size}
            status={null}
        />
      }
      <div className="content_wrapper">
        <Title
            dark={dark}
            size={size == 'lg' ? 3 : 4}
            text={name}
        />
        <Body
            color="light"
            dark={dark}
            variant={null}
        >
          {territory === '' ? title : `${territory} • ${title}`}
        </Body>
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
