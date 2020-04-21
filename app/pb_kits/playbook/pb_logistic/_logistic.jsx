/* @flow */

import React from 'react'
import classnames from 'classnames'
import DateTime from '../pb_kit/dateTime.js'
import { Body, Caption, Icon, Title } from '../'

const dateString = (value: DateTime) => {
  const month = value.toMonthNum()
  const day = value.toDay()

  return ` · ${month}/${day}`
}

type LogisticProps = {
  dark?: Boolean,
  date: String,
  link?: String,
  projectName: String,
  projectNumber: Number,
}

const Logistic = ({
  dark = false,
  date,
  link,
  projectName,
  projectNumber,
}: LogisticProps) => {
  const formattedDate = new DateTime({ value: date })

  return (
    <div
        className={classnames('pb_logistic_kit')}
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
