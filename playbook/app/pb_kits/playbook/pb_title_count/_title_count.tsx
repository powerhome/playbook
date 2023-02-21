/* @flow */

import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Body from '../pb_body/_body'
import Title from '../pb_title/_title'

type TitleCountProps = {
  align: "center" | "left" | "right",
  aria?: { [key: string]: string },
  className?: string,
  count?: number,
  dark?: boolean,
  data?: { [key: string]: string },
  id?: string,
  title?: string,
  size?: "lg" | "sm",
};

const TitleCount = (props: TitleCountProps): React.ReactElement => {
  const {
    align = 'left',
    aria = {},
    className,
    dark = false,
    data = {},
    count,
    id,
    title,
    size = 'sm' } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const css = classnames(
    buildCss('pb_title_count_kit', align, size),
    globalProps(props),
    className
  )

  const formatCount = count.toLocaleString()

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={css}
        id={id}
    >
      <Title
          className={title !== undefined ? 'pb_title_count_text' : ''}
          dark={dark}
          size={size === 'lg' ? 3 : 4}
          text={title}
      />

      <Body
          color="light"
          dark={dark}
      >
        {count &&
          formatCount
        }
      </Body>

    </div>
  )
}

export default TitleCount
