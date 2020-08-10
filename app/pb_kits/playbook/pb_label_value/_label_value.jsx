/* @flow */

import React from 'react'
import classnames from 'classnames'
import DateTime from '../pb_kit/dateTime.js'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import { Body, Caption, Flex, Icon, Title } from '../'

type LabelValueProps = {
  active?: Boolean,
  aria?: object,
  className?: String,
  data?: object,
  date?: Date,
  description?: String,
  icon?: String,
  id?: String,
  label: String,
  title?: String,
  value?: String,
  variant?: "default" | "details",
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
  const classes = classnames(buildCss('pb_label_value_kit', variantClass), className,
    globalProps(props))

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
                marginRight="xs"
            >
              <Icon
                  fixedWidth
                  icon={icon}
              />
            </Body>
          </If>
          <If condition={description}>
            <Body
                color="light"
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
                      size={4}
                      text={title}
                      variant="link"
                  />
                </If>
                <If condition={date}>
                  <Title
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
                    size={4}
                    text={title}
                />
              </If>
              <If condition={date}>
                <Title
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
            text={value}
        />
      </If>
    </div>
  )
}

export default LabelValue
