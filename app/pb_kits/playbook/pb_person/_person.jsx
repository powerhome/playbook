/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'

import {
  Body,
  Title,
} from '../'

type PersonProps = {
  className?: String | Array<String>,
  dark?: Boolean,
  firstName: String,
  lastName: String,
}

const Person = ({
  className,
  dark=false,
  firstName,
  lastName,
}: PersonProps) => {

  return (
    <div className={classnames('pb_person_kit', className)}>
      <Body
          className="pb_person_first"
          dark={dark}
          tag="span"
      >
        {`${firstName}`}
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
