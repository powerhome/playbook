/* @flow */

import React from 'react'
import classnames from 'classnames'
import Icon from '../Icon/Icon'

import styles from './milestones_item.scss'

type Props = {
  className: string,
  name: string,
  status: string,
  background: string,
}


const statusToIconName = (status: string): string => {
  if (status == 'done') { return 'check' }
  if (status == 'started') { return 'dot-circle' }
  return 'dot-circle'
}

export default class MilestoneItem extends React.Component<Props> {
  static defaultProps = {
    className: "",
    background: "light"
  }
  props: Props
  render() {
    const {
      className,
      name,
      status,
      background,
    } = this.props
    const css = [
      className,
      styles[`milestone-item`],
      styles[`background-${background}`],
      styles[`status-${status}`],
    ]
    return <li className={classnames(css)}>
      <Icon name={statusToIconName(status)} className={styles[`icon`]}/>
      <span className={styles[`milestone-item-label`]}>{name}</span>
      </li>
  }
}
