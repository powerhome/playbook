/* @flow */

import React from 'react'
import classnames from 'classnames'
import { spacing } from '../utilities/spacing.js'
import { Body, Caption, Icon } from '../'

const contactTypeMap = {
  'cell': 'mobile',
  'home': 'phone',
  'work': 'phone-office',
  'work-cell': 'phone-laptop',
  'email': 'envelope',
  'wrong number': 'slash-phone',
}

const formatContact = (contactString, contactType) => {
  if (contactType == 'email') {
    return contactString
  }
  const cleaned = contactString.replace(/\D/g, '')
  const phoneNumber = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
  if (phoneNumber) {
    const intlCode = phoneNumber[1] ? '+1 ' : ''
    return [
      intlCode,
      '(',
      phoneNumber[2],
      ') ',
      phoneNumber[3],
      '-',
      phoneNumber[4],
    ].join('')
  }
  return null
}

type ContactProps = {
  contactType?: "cell" | "home" | "work" | "email" | "wrong number",
  className?: String | Array<String>,
  dark?: Boolean,
  contactValue: String,
  contactDetail?: String,
}

const Contact = (props: ContactProps) => {
  const {
    contactType,
    className,
    dark = false,
    contactValue,
    contactDetail = '',
  } = props

  return (
    <div className={classnames('pb_contact_kit', className, spacing(props))}>
      <Body
          className="pb_contact_kit"
          color="light"
          dark={dark}
          tag="span"
      >
        <Icon
            fixedWidth
            icon={contactTypeMap[contactType] || 'phone'}
        />
        {` ${formatContact(contactValue, contactType)} `}
        <If condition={contactDetail}>
          <Caption
              size="xs"
              tag="span"
              text={contactDetail}
          />
        </If>
      </Body>
    </div>
  )
}

export default Contact
