/* @flow */

import React from 'react'
import classnames from 'classnames'
import DateTime from '../pb_kit/dateTime.js'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Body from '../pb_body/_body'
import Caption from '../pb_caption/_caption'
import Flex from '../pb_flex/_flex'
import Icon from '../pb_icon/_icon'
import Title from '../pb_title/_title'

type LabelValueProps = {
  active?: boolean,
  aria?: object,
  className?: string,
  dark?: boolean,
  data?: object,
  date?: date,
  id?: string,
  label: string,
  value?: string,
  variant?: "default" | "details",
  icon?: string,
  description?: string,
  title?: string,
}

const dateString = (value: DateTime) => {
  const month = value.toMonthNum()
  const day = value.toDay()

  return ` · ${month}/${day}`
}

const LabelValue = (props: LabelValueProps) => {
  const {
    active = false,
    aria = {},
    className,
    dark = false,
    data = {},
    date,
    description,
    icon,
    id,
    label,
    title,
    value,
    variant = 'default',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const formattedDate = new DateTime({ value: date })
  const variantClass = variant === 'details' ? 'details' : ''
  const classes = classnames(buildCss('pb_label_value_kit', variantClass), globalProps(props), className)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        description={description}
        icon={icon}
        id={id}
        title={title}
    >
      <Caption
          dark={dark}
          text={label}
      />
      <If condition={variant === 'details'}>
        <Flex
            inline
            vertical="center"
        >
          <If condition={icon}>
            <Body
                color="light"
                dark={dark}
                marginRight="xs"
            >
              <Icon
                  dark={dark}
                  fixedWidth
                  icon={icon}
              />
            </Body>
          </If>
          <If condition={description}>
            <Body
                color="light"
                dark={dark}
                marginRight="xs"
                text={description}
            />
          </If>
          <Choose>
            <When condition={active === true}>
              <Flex
                  inline
                  vertical="center"
              >
                <If condition={title}>
                  <Title
                      dark={dark}
                      size={4}
                      text={title}
                      variant="link"
                  />
                </If>
                <If condition={date}>
                  <Title
                      dark={dark}
                      marginLeft="xs"
                      size={4}
                      text={' ' + dateString(formattedDate)}
                      variant="link"
                  />
                </If>
              </Flex>
            </When>
            <Otherwise>
              <If condition={title}>
                <Title
                    dark={dark}
                    size={4}
                    text={title}
                />
              </If>
              <If condition={date}>
                <Title
                    dark={dark}
                    marginLeft="xs"
                    size={4}
                    text={' ' + dateString(formattedDate)}
                />
              </If>
            </Otherwise>
          </Choose>
        </Flex>
        <Else />
        <Body
            dark={dark}
            text={value}
        />
      </If>
    </div>
  )
}

export default LabelValue
