import React from 'react'
import classnames from 'classnames'

import { globalProps } from '../utilities/globalProps'
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps
} from '../utilities/props'

import Body from '../pb_body/_body'
import Title from '../pb_title/_title'

type PersonProps = {
  aria?: { [key: string]: string },
  className?: string | string[],
  data?: { [key: string]: string },
  firstName: string,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  lastName: string,
}

const Person = (props: PersonProps): React.ReactElement => {
  const {
    aria = {},
    className,
    data = {},
    htmlOptions = {},
    firstName,
    id,
    lastName } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss('pb_person_kit'),
    globalProps(props),
    className
  )

  const hasAllEmptyProps = [firstName, lastName].every(field => field === undefined || field === null || field === '')

  if (hasAllEmptyProps) {
    return (
      <>
        —
      </>
    )
  }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      <Body
          className="pb_person_first"
          tag="span"
      >
        {firstName ?? ''}
      </Body>
      {lastName && 
        <Title
            className="pb_person_first"
            size={4}
            text={lastName ? ` ${lastName}` : ''}
        />
      }
    </div>
  )
}

export default Person
