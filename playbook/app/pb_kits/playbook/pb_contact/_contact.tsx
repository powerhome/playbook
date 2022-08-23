import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Body from '../pb_body/_body'
import Caption from '../pb_caption/_caption'
import Icon from '../pb_icon/_icon'

const contactTypeMap: { [key: string]: string; } = {
  'cell': 'mobile',
  'email': 'envelope',
  'home': 'phone',
  'work': 'phone-office',
  'work-cell': 'phone-laptop',
  'wrong-phone': 'phone-slash',
  'extension': 'phone-plus',
}

const formatContact = (contactString: string, contactType: string) => {
  if (contactType == 'email') return contactString

  const cleaned = contactString.replace(/\D/g, '')
  const phoneNumber = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)

  if(contactType == 'extension') {
    return cleaned.match(/^\d{4}$/)
  }

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
  aria?: { [key: string]: string; },
  className?: string | string[],
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
        {
          contactDetail &&
          <Caption
              size="xs"
              tag="span"
              text={contactDetail}
          />
        }
      </Body>
    </div>
  )
}

export default Contact