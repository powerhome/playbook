/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'

import {
  Body,
  Caption,
  Icon,
} from '../'

type ContactProps = {
  contactType?: 'cell' | 'home' | 'work' | 'email' | 'wrong number',
  className?: String | Array<String>,
  dark?: Boolean,
  contactValue: String,
  contactDetail?: String,
}

const Contact = ({
  contactType,
  className,
  dark=false,
  contactValue,
  contactDetail='',
}: ContactProps) => {
  const formatDetail = (contactDetail) => {
    if (contactDetail !== undefined) {
      return (
        <Caption
            size="xs"
            tag="span"
            text={contactDetail}
        />
      )
    } else {
      return contactDetail
    }
  }

  const css = classnames('pb_contact_kit', className)

  const formatContact = (contactString, contactType) => {
    if (contactType == 'email') {
      return contactString
    } else {
      const cleaned = contactString.replace(/\D/g, '')
      const phoneNumber = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
      if (phoneNumber) {
        let intlCode = (phoneNumber[1] ? '+1 ' : '')
        return [intlCode, '(', phoneNumber[2], ') ', phoneNumber[3], '-', phoneNumber[4]].join('')
      }
      return null
    }
  }

  const contactTypeIcon = (function(contactType) {
    switch (contactType) {
    case 'cell':
      return 'mobile'
    case 'home':
      return 'phone'
    case 'work':
      return 'phone-office'
    case 'email':
      return 'envelope'
    case 'wrong number' :
      return 'slash-phone'
    default:
      return 'phone'
    }
  })(contactType)

  return (
    <div className={css}>
      <Body
          className="pb_contact_kit"
          color="light"
          dark={dark}
          tag="span"
      >
        <Icon
            fixedWidth="true"
            icon={contactTypeIcon}
        />
        {` ${formatContact(contactValue, contactType)} `}
        {formatDetail(contactDetail)}
      </Body>
    </div>
  )
}

export default Contact
