/* @flow */
import React from 'react'
import classnames from 'classnames'
import Title from '../pb_title/_title.jsx'
import Icon from '../pb_icon/_icon.jsx'
import Avatar from '../pb_avatar/_avatar'
import { globalProps } from '../utilities/globalProps'

type FormPillProps = {
  className?: string,
  id?: string,
  text: string,
  name: string,
  onClick?: EventHandler,
  avatar?: boolean,
  avatarUrl?: string,
  size?: string,
  textTransform?: "none" | "lowercase",
  closeProps?: {
    onClick?: EventHandler,
    onMouseDown?: EventHandler,
    onTouchEnd?: EventHandler,
  },
}
const FormPill = (props: FormPillProps) => {
  const {
    className,
    text,
    name,
    onClick = () => {},
    avatarUrl,
    closeProps = {},
    size = '',
    textTransform = 'none',
  } = props
  const css = classnames(
    `pb_form_pill_kit_${'primary'}`,
    globalProps(props),
    className,
    size === 'small' ? 'small' : null,
    textTransform,
  )
  return (
    <div className={css}>
      <If condition={name}>
        <Avatar
            imageUrl={avatarUrl}
            name={name}
            size="xs"
        />
        <Title
            className="pb_form_pill_text"
            size={4}
            text={name}
        />
      </If>
      <If condition={text}>
        <Title
            className="pb_form_pill_tag"
            size={4}
            text={text}
        />
      </If>
      <div
          className="pb_form_pill_close"
          onClick={onClick}
          {...closeProps}
      >
        <Icon
            fixedWidth
            icon="times"
        />
      </div>
    </div>
  )
}
export default FormPill
