import React from 'react'
import classnames from 'classnames'
import type { InputCallback } from '../types'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps,
} from '../utilities/props'

import { GlobalProps, globalProps } from '../utilities/globalProps'

type Props = {
  aria?: { [key: string]: string },
  checked?: boolean,
  children?: React.ReactNode | React.ReactNode[],
  className?: string,
  data?: { [key: string]: string },
  disabled?: boolean,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  name?: string,
  onChange?: InputCallback<HTMLInputElement>,
  size?: "sm" | "md",
  tabIndex?: number,
  value?: string,
} & GlobalProps

const Toggle = ({
  aria = {},
  checked = false,
  children,
  className,
  data = {},
  disabled = false,
  id,
  htmlOptions = {},
  name,
  onChange = (): void => {
  // Function body here
  },
  size = 'sm',
  tabIndex,
  value,
  ...props
}: Props): React.ReactElement => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
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
        {...htmlProps}
        className={classnames(css, globalProps(props), className)}
        id={id}
    >
      <label className="pb_toggle_wrapper">
        {children && children}

        {!children &&
          <input
              {...props}
              defaultChecked={checked}
              disabled={disabled}
              name={name}
              onChange={onChange}
              tabIndex={tabIndex}
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
