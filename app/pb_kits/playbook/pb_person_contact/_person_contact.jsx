/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'



import {
  Person,
  Body,
  Contact,
} from '../'

type PersonContactProps = {
  className?: String | Array<String>,
  dark?: Boolean,
  firstName: String,
  lastName: String,
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
