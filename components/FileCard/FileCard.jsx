/* @flow */

import React, { Component } from 'react'
import classnames from 'classnames'

import Icon from '../Icon/Icon'
import Panel from '../Panel/Panel'
import Text from '../Text/Text'

import { Popover, OverlayTrigger } from 'react-bootstrap'

import styles from './styles.scss'

type FileType = 'file-excel' | 'file-pdf' | 'file-word' | 'file-image' | 'file-powerpoint' | 'file-video' | 'file-text' | 'file-zip' | 'file-code' | 'file-sound' | 'file'

type Props = {
  className: string,
  description: string,
  displayName: string,
  downloadUrl: string,
  layout: string,
  openNewTab: boolean,
  type: FileType,
  hasProtection: boolean,
  hasAccess: boolean,
  children: Array<Component>
}

export default class FileCard extends React.Component<Props> {
  static defaultProps = {
    className: '',
    layout: 'vertical',
    openNewTab: false,
    type: 'file',
    hasProtection: false,
    hasAccess: true,
  }
  props: Props

  renderIcon() {
    const {
      downloadUrl,
      openNewTab,
      displayName,
      type,
      hasAccess,
    } = this.props
    const IconComponent = (
      <Icon
          className={styles[`icon-large`]}
          label=''
          name={`${type}`}
          size='lg'
          title={displayName}
      />
    )
    return (
      <If condition={downloadUrl && hasAccess}>
        <a
            href={downloadUrl}
            target={openNewTab ? '_blank' : '_parent'}
        >
          {IconComponent}
        </a>
      <Else/>
        {IconComponent}
      </If>
    )
  }

  renderDisplayName() {
    const {
      displayName,
      downloadUrl,
      openNewTab
    } = this.props
    const DisplayNameComponent = (
      <Text
          bold='true'
          color={'ink-light'}
      >{displayName}</Text>
    )
    return (
      <h5 className='m-0'>
        <If condition={downloadUrl}>
          <a
              href={downloadUrl}
              target={openNewTab ? '_blank' : '_parent'}
          >
            {DisplayNameComponent}
          </a>
        <Else/>
          {DisplayNameComponent}
        </If>
      </h5>
    )
  }

  renderDescription() {
    const {
      description
    } = this.props
    return (
      <p className='m-0'>
        <Text color={'ink-lighter'}>{description}</Text>
      </p>
    )
  }

  renderLockIcon() {
    const { hasAccess, hasProtection } = this.props
    const lock = hasAccess ? 'unlock' : 'lock'

    if (!hasProtection) {
      return null
    }

    const popoverPrivacy = (
      <Popover id="privacy-protected">
        {'Privacy Protected'}
      </Popover>
    );

    if (hasAccess) {
      return (
        <div>
          <Icon
              name={lock}
              size={'lg'}
          />
        </div>
      )
    } else {
      return (
        <OverlayTrigger
            overlay={popoverPrivacy}
            placement="top"
            trigger={['hover', 'focus']}
        >
          <div>
            <Icon
                name={lock}
                size={'lg'}
            />
          </div>
        </OverlayTrigger>
      )
    }

  }

  render() {
    const {
      className,
      description,
      displayName,
      layout,
      children
    } = this.props
    const css = [
      className,
      styles['file-card'],
      styles[`layout-${layout}`],
    ]
    return (
      <Panel bodyClass={'p-0'}>
        <div className={classnames(css)}>
          <div className={styles['lock']}>
            {this.renderLockIcon()}
          </div>
          <div className={styles['file-type-box']}>
            {this.renderIcon()}
          </div>
          <div className={styles['file-content-box']}>
            <If condition={displayName}>{this.renderDisplayName()}</If>
            <If condition={description}>{this.renderDescription()}</If>
            <If condition={children}>{children}</If>
          </div>
        </div>
      </Panel>
    )
  }
}
