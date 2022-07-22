/* @flow */

import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Body from '../pb_body/_body'
import Caption from '../pb_caption/_caption'
import Icon from '../pb_icon/_icon'

const contactTypeMap = {
  'cell': 'mobile',
  'email': 'envelope',
  'home': 'phone',
  'work': 'phone-office',
  'work-cell': 'phone-laptop',
  'wrong-phone': 'phone-slash',
  'extension': 'phone-plus',
}

const formatContact = (contactString, contactType) => {
  if (contactType == 'email') return contactString
  const cleaned = contactString.replace(/\D/g, '')
  if(contactType == 'extension') {
    return cleaned.match(/^\d{4}$/)
  }
  if (contactType !== 'email') {
    const phoneNumber = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
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
  className?: string | array<string>,
  contactDetail?: string,
  contactType?: string,
  contactValue: string,
  data?: object,
  id?: string,
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
  const classes = classnames(
    buildCss('pb_contact_kit'),
    globalProps(props),
    className
  )
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
