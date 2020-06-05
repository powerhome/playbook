/* @flow */
import React from 'react'
import { Body, Title } from '../'
import classnames from 'classnames'
import { spacing } from '../utilities/spacing.js'

type TitleCountProps = {
  className?: String,
  data?: String,
  id?: String,
  title?: String,
  count?: Number,
  size?: String,
}

const TitleCount = (props: TitleCountProps) => {
  const {
    className = 'pb_title_count_kit',
    data,
    count,
    id,
    title,
    size,
  } = props
  return (
    <div
        className={classnames(className, spacing(props))}
        data={data}
        id={id}
    >
      <Title
          className="pb_title_count_text"
          size={size == 'lg' ? 3 : 4}
          text={title}
      />
      <Body
          color="light"
          text={`${count}`}
      />
    </div>
  )
}

export default TitleCount
