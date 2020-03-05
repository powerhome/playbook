/* @flow */
import React from 'react'
import { Body, Title } from '../'

type TitleCountProps = {
  className?: String,
  data?: String,
  id?: String,
  title?: String,
  count?: Number,
  size?: String
}

const TitleCount = ({
  className = 'pb_title_count_kit',
  data,
  count,
  id,
  title,
  size,
}: TitleCountProps) => (
  <div
      className={className}
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

export default TitleCount
