/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'

import { Contact, Person } from '../'

type ContactItem = {
  contactType: String,
  contactValue: String,
  contactDetail: String,
}

type PersonContactProps = {
  className?: String | Array<String>,
  dark?: Boolean,
  firstName: String,
  lastName: String,
  contacts?: Array<ContactItem>,
}

const PersonContact = ({
  className,
  firstName,
  lastName,
  contacts,
}: PersonContactProps) => (
  <div className={classnames('pb_person_contact_kit', className)}>
    <Person
        firstName={firstName}
        lastName={lastName}
    />
    {contacts.map((contactObject, index) => (
      <Contact
          contactDetail={contactObject.contactDetail}
          contactType={contactObject.contactType}
          contactValue={contactObject.contactValue}
          key={index}
      />
    ))}
  </div>
)

export default PersonContact
