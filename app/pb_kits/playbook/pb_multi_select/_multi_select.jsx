/* @flow */
import React from 'react'
import classnames from 'classnames'
import Title from '../pb_title/_title.jsx'
import Icon from '../pb_icon/_icon.jsx'
import Avatar from '../pb_avatar/_avatar.jsx'

type MultiSelectProps = {

className?: String,
id?: String,
text: String,
name: String,
avatar?: Boolean,
avatarUrl?: String,
}
const MultiSelect = ({
  className,
  text,
  name,
  avatar = false,
  avatarUrl,
}: MultiSelectProps) => {
  const css = classnames([
`pb_multi_select_kit_${'primary'}`,
className,
  ])
  return (

    <div className={css}>

      <If condition={avatar || avatarUrl}>
        <Avatar
            imageUrl={avatarUrl}
            name={name}
            size="xs"
        />
      </If>

      <If condition={name}>
        <Title
            className="pb_multi_select_text"
            size={4}
            text={name}
        />
      </If>
      <If condition={text}>
        <Title
            className="pb_multi_select_tag"
            size={4}
            text={text}
        />
      </If>
      <div className="pb_multi_select_text">
        <Icon
            fixedWidth
            icon="times"
        />
        <div className="content_wrapper">
          <Title
              size={4}
          />

        </div>
      </div>
    </div>

  )
}
export default MultiSelect
