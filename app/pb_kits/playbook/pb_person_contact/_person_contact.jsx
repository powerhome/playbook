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
  people?: Array<{firstName: String, lastName: String}>,
  contacts?: Array<{contactType: String, contactValue: String, contactDetail: String}>,
}

const contactsArray = ({contacts=[]}: PersonContactProps) => {
  return contacts.map((contactObject, index) => {
    return (
      <Contact
        contactType={contactObject.contactType}
        contactValue={contactObject.contactValue}
        contactDetail={contactObject.contactDetail}
      />
    );
  })
}

const peopleArray = ({people=[]}: PersonContactProps) => {
  return people.map((personObject, index) => {
    return (
      <Person
        firstName={personObject.firstName}
        lastName={personObject.lastName}
      />
    );
  })
}

const PersonContact = ({
  className,
  dark=false,
  people,
  contacts,
}: PersonContactProps) => {

  const contactKits = contactsArray({contacts})
  const personKits = peopleArray({people})

  return (
    <div className={classnames('pb_person_contact_kit', className)}>
      {personKits}
      {contactKits}
    </div>
  )
}

export default PersonContact
