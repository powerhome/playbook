/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'

import {
  Body,
  Icon,
} from '../'

type ContactProps = {
  contactType?: 'cell' | 'home' | 'work' | 'email',
  className?: String | Array<String>,
  dark?: Boolean,
  contactValue: String,
}

const kitClasses = ({}: ContactProps) => {
  let classname = 'pb_contact_kit'
  return classname
}

const Contact = ({
  contactType,
  className,
  dark=false,
  contactValue,
}: ContactProps) => {

  const css = classnames(kitClasses({contactType}), className)

  const formatPhoneNumber = (phoneNumberString, contactType) => {
    if (contactType == "email") {
      return phoneNumberString
    } else {
      let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
      let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
      if (match) {
        let intlCode = (match[1] ? '+1 ' : '')
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
      }
      return null
    }
  }

  const contactTypeIcon = (function(contactType) {
    switch(contactType) {
      case 'cell':
        return 'mobile';
      case 'home':
        return 'phone';
      case 'work':
        return 'phone-office';
      case 'email':
        return 'envelope';
      default:
        return 'phone';
    }
  })(contactType)

  return (
    <div className={css}>
      <Body dark={dark} color="light" >
        <Icon icon={contactTypeIcon} fixedWidth="true" />
        {` ${formatPhoneNumber(contactValue, contactType)}`}
      </Body>
    </div>
  )
}

export default Contact
