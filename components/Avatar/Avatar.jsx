/* @flow */

import React from 'react'
import classnames from 'classnames/bind'

import {OverlayTrigger, Popover} from 'react-bootstrap'

import styles from './styles.scss'

export type AvatarSize = "smaller" | "small" | "base" | "large" | "larger"

type Props = {
  alt: string,
  disableLink: boolean,
  showPopover: boolean,
  size: "smaller" | "small" | "base" | "large" | "larger",
  thumb: string,
  url: string,
  onError: () => void,
}

/**
 * Avatar renders a user avatar thumbnail image. Upon click, it opens the orinal
 * image on a new tab.
 *
 * @param {string} alt the text to display when hovering over the image.
 * @param {bool} disableLink whether to disable the anchor link
 * @param {bool} showPopover whether to show the popover image on hover
 * @param {string} size the pre-defined avatar size.
 * @param {string} thumb the avatar thumbnail image URL.
 * @param {string} url the avatar original image URL.
 * @returns {ReactElement} JSX.
 */
export default class Avatar extends React.Component<Props> {
  static defaultProps = {
    alt: 'Avatar Image',
    size: 'base',
    showPopover: true,
  }
  props: Props
  render() {
    const {
      alt,
      disableLink,
      showPopover,
      size,
      thumb,
      url,
      onError,
    } = this.props
    const imgCSS = [
      "avatar",
      styles[`avatar-${size}`],
    ]
    const popover = (
      <Popover>
        <img
            className={classnames(imgCSS)}
            src={url}
        />
      </Popover>
    )
    const image = (
      <img alt={alt}
          className={classnames(imgCSS, styles[`avatar-${size}-thumb`])}
          onError={onError}
          src={thumb}
      />
    )
    const imgThumb = (
      <If condition={disableLink}>
        {image}
      <Else/>
        <a href={disableLink ? "javascript:void(0)" : url}
            style={{maxHeight: 56}}
            target="_blank"
        >
          {image}
        </a>
      </If>
    )
    if(showPopover) {
      return (
        <OverlayTrigger
            overlay={popover}
            placement="right"
            trigger={['hover']}
        >
          {imgThumb}
        </OverlayTrigger>
      )
    } else {
      return imgThumb
    }
  }
}
