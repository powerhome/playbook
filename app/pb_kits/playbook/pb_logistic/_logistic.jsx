/* @flow */

import React from 'react'
import classnames from 'classnames'
import DateTime from '../pb_kit/dateTime.js'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { Body, Caption, Icon, Title } from '../'
import { spacing } from '../utilities/spacing.js'

const dateString = (value: DateTime) => {
  const month = value.toMonthNum()
  const day = value.toDay()

  return ` · ${month}/${day}`
}

type LogisticProps = {
  aria?: object,
  className?: String,
  dark?: Boolean,
  data?: object,
  date: String,
  id?: String,
  link?: String,
  projectName?: String,
  projectNumber?: Number,
}

const Logistic = (props: LogisticProps) => {
  const { aria = {},
    className,
    dark = false,
    data = {},
    date,
    id,
    link,
    projectName,
    projectNumber } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const formattedDate = new DateTime({ value: date })
  const classes = classnames(buildCss('pb_logistic_kit', { dark: dark }), className, spacing(props))

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <Body color="light">
        <Caption text="Project" />
        <Icon
            fixedWidth
            icon="home"
        />

        {` ${projectNumber}`}

        <Choose>
          <When condition={link}>
            <a
                className="pb_logistic_kit_links"
                href={link}
            >
              <Choose>
                <When condition={date}>
                  <Title
                      size={4}
                      tag="span"
                      text={' ' + projectName + dateString(formattedDate)}
                  />
                </When>
                <Otherwise>
                  <Title
                      size={4}
                      tag="span"
                      text={' ' + projectName}
                  />
                </Otherwise>
              </Choose>
            </a>
          </When>
          <Otherwise>
            <Choose>
              <When condition={date}>
                <Title
                    dark={dark}
                    size={4}
                    tag="span"
                    text={' ' + projectName + dateString(formattedDate)}
                />
              </When>
              <Otherwise>
                <Title
                    dark={dark}
                    size={4}
                    tag="span"
                    text={' ' + projectName}
                />
              </Otherwise>
            </Choose>
          </Otherwise>
        </Choose>
      </Body>
    </div>
  )
}

export default Logistic
