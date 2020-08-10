// @flow

import React from 'react'
import classnames from 'classnames'
import type { InputCallback } from '../types'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

import { globalProps } from '../utilities/globalProps.js'

type Props = {
  aria?: object,
  checked?: boolean,
  children?: React.Node,
  className?: string,
  data?: object,
  id?: string,
  name?: string,
  onChange?: InputCallback<HTMLInputElement>,
  size?: "sm" | "md",
  value?: string,
}

const Toggle = ({
  aria = {},
  checked = false,
  children,
  className,
  data = {},
  id,
  name,
  onChange = () => {},
  size = 'md',
  value,
  ...props
}: Props) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const css = classnames(
    buildCss('pb_toggle_kit',
      size,
      {
        on: checked,
        off: !checked,
      }
    ), className)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classnames(css, globalProps(props))}
        id={id}
    >
      <label className="pb_toggle_wrapper">
        <If condition={children}>
          {children}
          <Else />
          <input
              {...props}
              defaultChecked={checked}
              name={name}
              onChange={onChange}
              type="checkbox"
              value={value}
          />
        </If>
        <div className="pb_toggle_control" />
      </label>
    </div>
  )
}

export default Toggle
