/* eslint-disable flowtype/no-types-missing-file-annotation */
// React Pure component - do not use state!

import React from 'react'
import cn from 'classnames'

import { Body, Title } from 'playbook-ui'
import { Example as ExampleType } from '../types'

const Example = ({
  colors,
  title,
}: ExampleType): React.ReactElement => (
  <React.Fragment>
    <Title size="4">{ title }</Title>
    <ul className="pb--utlities-color">
      {colors.map(({ dark, name, variable }) => (
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
  </React.Fragment>
)

export default Example
