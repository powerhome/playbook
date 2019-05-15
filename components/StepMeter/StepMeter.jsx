/* @flow */

import React from 'react'
import { map } from 'lodash'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import classnames from 'classnames'

import Icon from '../Icon/Icon'
import styles from './step_meter.scss'

type States = 'done' | 'started' | 'none'

type Step = {|
  id: number,
  name: string,
  state: States,
|}

type Props = {
  className: string,
  steps: Array<Step>,
  type: string,
}

const StepMeter = ({
  steps,
  type,
  className
}: Props) => {
  const classes = [
    className,
    styles['step-meter'],
    styles[`type-${type}`],
  ]
  return (
    <ul className={classnames(classes)}>
      {
        map(steps, (step, idx) => (
          <Choose>
            <When condition={type == 'simple'}>
              <OverlayTrigger
                  key={idx}
                  overlay={<Tooltip id={`tooltip-step.name`}>{step.name}</Tooltip>}
                  placement="bottom"
                  trigger={['hover', 'focus']}
              >
                <li
                    className={`text-uppercase ${styles[step.state]}`}
                />
              </OverlayTrigger>
            </When>
            <Otherwise>
              <li
                  className={`text-uppercase ${styles[step.state]}`}
                  key={idx}
              >
                <If condition={step.state == 'done'}>
                  <Icon
                      label=""
                      name="check"
                  />
                </If>
                <span>
                  {step.name}
                </span>
              </li>
            </Otherwise>
          </Choose>
        ))
      }
    </ul>
  )
}

export default StepMeter
