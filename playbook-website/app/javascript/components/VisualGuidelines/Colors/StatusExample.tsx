/* eslint-disable flowtype/no-types-missing-file-annotation */
// React Pure component - do not use state!

import React from 'react'
import cn from 'classnames'

import { Body, Card, SectionSeparator, Title } from 'playbook-ui'
import { StatusExample as StatusExampleType } from '../types'

const StatusExample = ({
  statusColors,
  subtleColors,
  title,
}: StatusExampleType): React.ReactElement => (
  <React.Fragment>
    <Title size="4">{ title }</Title>
    <Card
        className="pb--utilities-card"
        padding="none"
    >
      <ul className="pb--utlities-color pb--utilities-status-1">
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
      <div className="pb--utilities-seperator">
        <SectionSeparator
            text="Subtle Variations"
        />
      </div>
      <ul className="pb--utlities-color pb--utilities-status-2">
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
              {name.split('Subtle')}
            </Body>
            <Body
                className={cn({ dark, name: 'name' })}
                tag="p"
            >
              {'Subtle'}
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
