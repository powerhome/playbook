/* @flow */

import React from 'react'
import classnames from 'classnames'

import { globalProps } from '../utilities/globalProps'
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

import Body from '../pb_body/_body'
import Title from '../pb_title/_title'

type PersonProps = {
  aria?: object,
  className?: string | array<string>,
  data?: object,
  firstName: string,
  id?: string,
  lastName: string,
}

const Person = (props: PersonProps) => {
  const {
    aria = {},
    className,
    data = {},
    firstName,
    id,
    lastName } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_person_kit'),
    globalProps(props),
    className
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <Body
          className="pb_person_first"
          tag="span"
      >
        {firstName}
      </Body>
      <If condition={lastName}>
        <Title
            className="pb_person_first"
            size={4}
            text={` ${lastName}`}
        />
      </If>
    </div>
  )
}

export default Person
