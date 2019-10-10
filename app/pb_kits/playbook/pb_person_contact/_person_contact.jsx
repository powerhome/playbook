/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'

import {
  Person,
  Contact,
} from '../'

type PersonContactProps = {
  className?: String | Array<String>,
  dark?: Boolean,
  firstName: String,
  lastName: String,
  contacts?: Array<{contact_type: String, value: String}>,
}

const contactsArray = ({contacts=[]}: PersonContactProps) => {
  return contacts.map((anObjectMapped, index) => {
    return (
      <Contact
        contactType={anObjectMapped.contact_type}
        value={anObjectMapped.value}
      />
    );
  })
}

const PersonContact = ({
  className,
  dark=false,
  firstName,
  lastName,
  contacts,
}: PersonContactProps) => {

  const contactKits = contactsArray({contacts})

  return (
    <div className={classnames('pb_person_contact_kit', className)}>
      <Person firstName={firstName} lastName={lastName} />
      {contactKits}
    </div>
  )
}

export default PersonContact
