/* @flow */

import React, { Component } from 'react'
import classnames from 'classnames'
import { ChromePicker } from 'react-color'
import { OverlayTrigger, Popover } from 'react-bootstrap'

import styles from './colorPickerInput.scss'

type Props = {
  className: string,
  color: string,
  disableAlpha: boolean,
  onChange: () => mixed,
}

export default class ColorPickerInput extends Component<Props> {
  static defaultProps = {
    color: '',
    disableAlpha: true,
    onChange: function() {},
  }

  state = {
    showPicker: false,
  }

  props: Props

  handleOnInputFocus = () => {
    this.setState({
      showPicker: true,
    })
  }

  handleOnInputBlur = () => {
    this.setState({
      showPicker: false,
    })
  }

  handleOnChange = (e) => {
    this.props.onChange(e.target.value)
  }

  render() {
    const {
      className,
      color,
      disableAlpha,
      onChange,
    } = this.props

    const css = classnames([
      className,
      styles['color-picker-input'],
    ])

    const cancelFocus = (e) => {
      if(e.target.tagName === "INPUT") {
        setTimeout(() => {
          this.setState({showPicker: true})
        }, 100)
      }
    }

    const popover = (
      <Popover
          className={styles.popover}
          placement="bottom"
      >
        <div onClick={cancelFocus}>
          <ChromePicker
              color={color}
              disableAlpha={disableAlpha}
              onChange={onChange}
          />
        </div>
      </Popover>
    )

    return (
      <div
          className={css}
      >
      <If condition={this.state.showPicker}>
        {popover}
      </If>
      <input
          onBlur={this.handleOnInputBlur}
          onChange={this.handleOnChange}
          onFocus={this.handleOnInputFocus}
          type="text"
          value={color.hex || color}
      />
      </div>
    )
  }
}