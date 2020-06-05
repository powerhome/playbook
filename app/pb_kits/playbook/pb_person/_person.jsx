/* @flow */

import React from 'react'
import classnames from 'classnames'
import { spacing } from '../utilities/spacing.js'

import { Body, Title } from '../'

type PersonProps = {
  className?: String | Array<String>,
  dark?: Boolean,
  firstName: String,
  lastName: String,
}

const Person = (props: PersonProps) => {
  const { className, dark = false, firstName, lastName } = props
  return (
    <div className={classnames('pb_person_kit', className, spacing(props))}>
      <Body
          className="pb_person_first"
          dark={dark}
          tag="span"
      >
        {firstName}
      </Body>
      <Title
          className="pb_person_first"
          dark={dark}
          size={4}
          text={` ${lastName}`}
      />
    </div>
  )
}

export default Person
