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

const kitClasses = ({}: ContactProps) => {
  let classname = 'pb_contact_kit'
  return classname
}

const Contact = ({
  contactType,
  className,
  dark=false,
  contactValue,
  contactDetail="",
}: ContactProps) => {

  const formatDetail = (contactDetail) => {
    if (contactDetail !== undefined) {
      return (
        <Caption size="xs" text={contactDetail} tag="span" />
      );
    } else {
      return contactDetail
    }
  }

  const css = classnames(kitClasses({contactType}), className)

  const formatContact = (contactString, contactType) => {
    if (contactType == "email") {
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
    switch(contactType) {
      case 'cell':
        return 'mobile';
      case 'home':
        return 'phone';
      case 'work':
        return 'phone-office';
      case 'email':
        return 'envelope';
      case 'wrong number' :
        return 'slash-phone';
      default:
        return 'phone';
    }
  })(contactType)


  return (
    <div className={css}>
      <Body dark={dark} color="light" tag="span" className="pb_contact_kit" >
        <Icon icon={contactTypeIcon} fixedWidth="true" />
        {` ${formatContact(contactValue, contactType)} `}{formatDetail(contactDetail)}
      </Body>
    </div>
  )
}

export default Contact
