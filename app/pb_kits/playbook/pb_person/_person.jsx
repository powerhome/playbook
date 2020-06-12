/* @flow */

import React from 'react'
import classnames from 'classnames'
import { spacing } from '../utilities/spacing.js'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

import { Body, Title } from '../'

type PersonProps = {
  aria?: object,
  className?: String | Array<String>,
  data?: object,
  firstName: String,
  id?: String,
  lastName: String,
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
  const classes = classnames(buildCss('pb_person_kit'), className, spacing(props))

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
