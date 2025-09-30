import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Body from '../pb_body/_body'
import Caption from '../pb_caption/_caption'
import Icon from '../pb_icon/_icon'
import { getAllIcons } from "../utilities/icons/allicons"

const contactTypeMap: { [key: string]: string } = {
  'cell': 'mobile',
  'email': 'envelope',
  'extension': 'phone-plus',
  'home': 'phone',
  'work': 'phone-office',
  'work-cell': 'phone-laptop',
  'wrong-phone': 'phone-slash',
  'international': 'globe',
}

const envelopeIcon = getAllIcons()["envelope"].icon as unknown as { [key: string]: SVGElement }

const formatContact = (contactString: string, contactType: string) => {
  if (contactType === 'email') return contactString

  // International phone numbers are unformatted
  if (contactType === 'international') return contactString
  
  // Format US numbers
  const cleaned = contactString.replace(/\D/g, '')
  const phoneNumber = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)

  if (contactType === 'extension') {
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
  aria?: { [key: string]: string }
  className?: string | string[]
  contactDetail?: string
  contactType?: string
  contactValue: string
  data?: { [key: string]: string }
  dark?: boolean
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) }
  id?: string
}

const Contact = (props: ContactProps): React.ReactElement => {
  const {
    aria = {},
    className,
    contactDetail,
    contactType,
    contactValue,
    data = {},
    dark = false,
    htmlOptions = {},
    id,
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss('pb_contact_kit'),
    globalProps(props),
    className
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      <Body
          className="pb_contact_kit"
          color={"light"} 
          dark={dark}
          tag="span"
      >
          {contactType === 'email' ? (
            <Icon 
                className="svg-inline--fa envelope"
                customIcon={envelopeIcon} 
                dark={dark} 
                fixedWidth 
            />
          ) : (
            <Icon
                dark={dark}
                fixedWidth
                icon={contactTypeMap[contactType] || 'phone'}
            />
          )}
        {` ${formatContact(contactValue, contactType)} `}
        {contactDetail && (
          <Caption
              dark={dark}
              size="xs"
              tag="span"
              text={contactDetail}
          />
        )}
      </Body>
    </div>
  )
}

export default Contact
