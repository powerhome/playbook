/* eslint-disable flowtype/no-types-missing-file-annotation */
// React Pure component - do not use state!

import React from 'react'
import cn from 'classnames'

import { Background, Body, Card, SectionSeparator, Title } from 'playbook-ui'
import { StatusExample as StatusExampleType } from '../types'

const StatusExample = ({
  statusColors,
  subtleColors,
  title,
}: StatusExampleType): React.ReactElement => (
  <React.Fragment>
    <Title size="4">{ title }</Title>
    <Card
        padding="md"
    >
      <ul className="pb--utlities-color">
        {statusColors.map(({ dark, name, variable }) => (
          <li
              className={cn({ dark })}
              key={name}
          >
            <div className={`pb--color_${variable}`} />
            <Body
                className={cn({ dark, name: 'name' })}
                tag="p"
            >
              {name}
            </Body>
            <Body
                className={cn({ dark, var: 'var' })}
                tag="p"
            >
              {`$${variable}`}
            </Body>
          </li>
        ))}
      </ul>
      <SectionSeparator
          text="Subtle Variations"
      />
      <ul className="pb--utlities-color">
        {subtleColors.map(({ dark, name, variable }) => (
          <li
              className={cn({ dark })}
              key={name}
          >
            <div className={`pb--color_${variable}`} />
            <Body
                className={cn({ dark, name: 'name' })}
                tag="p"
            >
              {name}
            </Body>
            <Body
                className={cn({ dark, var: 'var' })}
                tag="p"
            >
              {`$${variable}`}
            </Body>
          </li>
        ))}
      </ul>
    </Card>
  </React.Fragment>
)

export default StatusExample
