/* @flow */
import React from 'react'
import classnames from 'classnames'
import Title from '../pb_title/_title.jsx'
import Icon from '../pb_icon/_icon.jsx'
import Avatar from '../pb_avatar/_avatar.jsx'
import { globalProps } from '../utilities/globalProps.js'

type FormPillProps = {
  className?: string,
  id?: string,
  text: string,
  name: string,
  onClick?: EventHandler,
  avatar?: Boolean,
  avatarUrl?: string,
}
const FormPill = (props: FormPillProps) => {
  const { className, text, name, onClick = () => {}, avatarUrl } = props
  const css = classnames(
    [`pb_form_pill_kit_${'primary'}`, className],
    globalProps(props)
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
