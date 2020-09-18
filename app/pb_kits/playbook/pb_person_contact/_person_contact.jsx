/* @flow */

import React from 'react'
import classnames from 'classnames'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

import { globalProps } from '../utilities/globalProps.js'

import { Caption, Contact, Person } from '../'

type ContactItem = {
  contactType: string,
  contactValue: string,
  contactDetail: string,
}

type PersonContactProps = {
  aria?: object,
  className?: string | array<string>,
  dark?: boolean,
  data?: object,
  firstName: string,
  id?: string,
  lastName: string,
  contacts?: array<ContactItem>,
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
  const classes = classnames(
    buildCss('pb_person_contact_kit'),
    globalProps(props),
    className
  )

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
            key={`valid-contact-${index}`}
        />
      ))}
      {wrongContacts().map((contactObject, index) => (
        <div key={`wrong-contact-caption-wrapper-${index}`}>
          <Caption
              className="wrong_numbers"
              key={`wrong-contact-caption-${index}`}
              text="wrong number"
          />
          <Contact
              contactType={contactObject.contactType}
              contactValue={contactObject.contactValue}
              key={`wrong-contact-${index}`}
          />
        </div>
      ))}
    </div>
  )
}

export default PersonContact
