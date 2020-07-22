/* @flow */

import React from 'react'
import classnames from 'classnames'
import DateTime from '../pb_kit/dateTime.js'
import { buildAriaProps, buildDataProps } from '../utilities/props'
import { Body, Caption, Flex, Icon, Title } from '../'
import { spacing } from '../utilities/spacing.js'

type LabelValueProps = {
  aria?: object,
  className?: String,
  dark?: Boolean,
  data?: object,
  id?: String,
  label: String,
  value?: String,
  variant?: "default" | "details",
  icon?: String,
  description?: String,
  title?: String,
  date?: Date,
  active?: Boolean
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
  const themeStyle = dark === true ? '_dark' : ''
  const css = classnames(
    ['pb_label_value_kit' + themeStyle, className],
    spacing(props)
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={css}
        dark={dark}
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
                      variant="primary"
                  />
                </If>
                <If condition={date}>
                  <Title
                      dark={dark}
                      marginLeft="xs"
                      size={4}
                      text={' ' + dateString(formattedDate)}
                      variant="primary"
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
