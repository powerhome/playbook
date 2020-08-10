/* @flow */

import React from 'react'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps.js'
import { Body, Caption, Icon } from '../'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

const contactTypeMap = {
  'cell': 'mobile',
  'email': 'envelope',
  'home': 'phone',
  'work': 'phone-office',
  'work-cell': 'phone-laptop',
  'wrong-phone': 'phone-slash',
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
  aria?: object,
  className?: String | array<String>,
  contactDetail?: String,
  contactType?: String,
  contactValue: String,
  data?: object,
  id?: String,
}

const Contact = (props: ContactProps) => {
  const {
    aria = {},
    className,
    contactDetail,
    contactType,
    contactValue,
    data = {},
    id } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_contact_kit'), className, globalProps(props))

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <Body
          className="pb_contact_kit"
          color="light"
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
