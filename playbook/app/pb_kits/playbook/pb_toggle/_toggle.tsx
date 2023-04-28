import React from 'react'
import classnames from 'classnames'
import type { InputCallback } from '../types'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

import { globalProps } from '../utilities/globalProps'

type Props = {
  aria?: { [key: string]: string },
  checked?: boolean,
  children?: React.ReactNode | React.ReactNode[],
  className?: string,
  data?: { [key: string]: string },
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
  onChange = () => { },
  size = 'sm',
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
    ))

  return (
    <div
      {...ariaProps}
      {...dataProps}
      className={classnames(css, globalProps(props), className)}
      id={id}
    >
      <label className="pb_toggle_wrapper">
        {children && children}

        {!children &&
          <input
            {...props}
            defaultChecked={checked}
            name={name}
            onChange={onChange}
            type="checkbox"
            value={value}
          />
        }
        <div className="pb_toggle_control" />
      </label>
    </div>
  )
}

export default Toggle
