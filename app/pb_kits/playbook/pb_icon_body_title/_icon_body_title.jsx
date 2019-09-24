/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import Title from "../pb_title/_title.jsx"
import Body from "../pb_body/_body.jsx"
import Icon from "../pb_icon/_icon.jsx"
import classnames from 'classnames'

type IconBodyTitleProps = {
  body?: String,
  className?: String | Array<String>,
  data?: String,
  icon?: String,
  id?: String,
  title?: String,
  link?: String,
}

const IconBodyTitle = ({ body, className, data, icon, id, title, link }: IconBodyTitleProps) => {
  const titleContent = !!link ? (<a href={link}>{title}</a>) : title 
  return (
    <div className={classnames(`pb_icon_body_title_kit_${icon}`, className)} id={id} data={data}>
      <Icon icon={icon} className="pb_icon_body_title_kit_icon" />
      <If condition={!!body}>
        <Body color="light" text={body} className="pb_icon_body_title_kit_body"></Body>
      </If>
      <Title text={titleContent} tag="h4" size={4} className="pb_icon_body_title_kit_title" />
    </div>
  )
}

export default IconBodyTitle
