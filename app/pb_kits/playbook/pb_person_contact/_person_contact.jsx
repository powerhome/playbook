/* @flow */

import React from 'react'
import classnames from 'classnames'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

import { systemProps } from '../utilities/systemProps.js'

import { Caption, Contact, Person } from '../'

type ContactItem = {
  contactType: String,
  contactValue: String,
  contactDetail: String,
}

type PersonContactProps = {
  aria?: object,
  className?: String | Array<String>,
  dark?: Boolean,
  data?: object,
  firstName: String,
  id?: String,
  lastName: String,
  contacts?: Array<ContactItem>,
}

const PersonContact = (props: PersonContactProps) => {
  const {
    aria = {},
    className,
    contacts = [],
    data = {},
    firstName,
    id,
    lastName,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_person_contact_kit'), className, systemProps(props))

  const wrongContacts = () => (
    contacts.filter((contactObject) => (
      contactObject.contactType === 'wrong-phone'
    ))
  )

  const validContacts = () => (
    contacts.filter((contactObject) => (
      contactObject.contactType !== 'wrong-phone'
    ))
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <Person
          firstName={firstName}
          lastName={lastName}
      />
      {validContacts().map((contactObject, index) => (
        <Contact
            contactDetail={contactObject.contactDetail}
            contactType={contactObject.contactType}
            contactValue={contactObject.contactValue}
            key={index}
        />
            ))}
      {wrongContacts().map((contactObject, index) => (
        <>
          <Caption
              className="wrong_numbers"
              text="wrong number"
          />
          <Contact
              contactType={contactObject.contactType}
              contactValue={contactObject.contactValue}
              key={index}
          />
        </>
          ))}
    </div>
  )
}

export default PersonContact
