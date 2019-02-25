/* @flow */

import React from 'react'
import classnames from 'classnames'
import { isEmpty, map } from 'lodash'

import styles from './monogram_avatar.scss'

import Avatar from '../Avatar/Avatar'
import type AvatarSize from '../Avatar/Avatar'

type Props = {
  border: boolean,
  className: string,
  personName: string,
  size: AvatarSize,
  url: string,
}

type State = {
  showInitials: boolean
}

const initials = function(name: string): string {
  if (!name) {
    return <i className="fa fa-user" />
  }
  return map(name.split(/\s/), name => name[0]).join('').substring(0,2)
}

class MonogramAvatar extends React.Component<Props, State> {
  static defaultProps = {
    border: true,
    size: 'base'
  }
  constructor(props: Props) {
    super(props)
    this.state = { showInitials: false }
  }

  state: State

  componentWillReceiveProps(nextProps) {
    this.setState({ showInitials: isEmpty(nextProps.url) })
  }

  props: Props

  handleImageLoadError = () => {
    this.setState({ showInitials: true })
  }

  render() {
    const {
      url,
      className,
      personName,
      size,
      border,
    } = this.props

    const classes = [
      className,
      styles['monogram-avatar'],
      (this.state.showInitials ? styles['initials'] : null),
      (border ? styles['with-border'] : null),
    ]

    return (
      <div className={classnames(classes, styles[`monogram-avatar-${size}`])}>
        <Choose>
          <When condition={!this.state.showInitials}>
            <Avatar
                alt={personName}
                disableLink
                onError={this.handleImageLoadError}
                showPopover={false}
                size={size}
                thumb={url}
            />
          </When>
          <Otherwise>
            <p>{initials(personName)}</p>
          </Otherwise>
        </Choose>
      </div>
    )
  }
}

export default MonogramAvatar
