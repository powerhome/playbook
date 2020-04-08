/* @flow */
import React from 'react'
import classnames from 'classnames'
import Title from '../pb_title/_title.jsx'
import Icon from '../pb_icon/_icon.jsx'
import Avatar from '../pb_avatar/_avatar.jsx'

type FormPillProps = {

className?: String,
id?: String,
text: String,
name: String,
onClick?: EventHandler,
avatar?: Boolean,
avatarUrl?: String,
}
const FormPill = ({
  className,
  text,
  name,
  onClick = () => {},
  avatarUrl,
}: FormPillProps) => {
  const css = classnames([
    `pb_form_pill_kit_${'primary'}`,
    className,
  ])
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
