import React, { useEffect } from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { deprecatedProps, globalProps, GlobalProps } from '../utilities/globalProps'

import datePickerHelper from './date_picker_helper'
import Icon from '../pb_icon/_icon'
import Caption from '../pb_caption/_caption'
import Body from '../pb_body/_body'

type DatePickerProps = {
  allowInput?: boolean,
  aria?: { [key: string]: string },
  className?: string,
  dark?: boolean,
  data?: { [key: string]: string },
  defaultDate?: string,
  disableDate?: number[],
  disableInput?: boolean,
  disableRange?: number[],
  disableWeekdays?: number[],
  enableTime?: boolean,
  error?: string,
  format?: string,
  hideIcon?: boolean,
  hideLabel?: boolean,
  id?: string,
  inLine?: boolean,
  inputAria?: { [key: string]: string },
  inputData?: { [key: string]: string },
  inputOnChange?: (e: React.FormEvent<HTMLInputElement>) => void,
  inputValue?: string,
  label?: string,
  maxDate: string,
  minDate: string,
  name: string,
  pickerId?: string,
  placeholder?: string,
  positionElement?: HTMLElement | null,
  scrollContainer?: string,
  selectionType?: "month" | "week"| "quickpick",
  showTimezone?: boolean,
  staticPosition: boolean,
  thisRangesEndToday?: boolean,
  timeFormat?: string,
  type?: string,
  yearRange?: number[],
} & GlobalProps

const DatePicker = (props: DatePickerProps): React.ReactElement => {
  if (props.plugins) deprecatedProps('Date Picker', ['plugins'])

  const {
    allowInput = false,
    aria = {},
    className,
    dark = false,
    data = {},
    defaultDate = '',
    disableDate = null,
    disableInput,
    disableRange = null,
    disableWeekdays = null,
    enableTime = false,
    error,
    format = 'm/d/Y',
    hideIcon = false,
    hideLabel = false,
    id,
    inLine = false,
    inputAria = {},
    inputData = {},
    inputOnChange,
    inputValue,
    label = 'Date Picker',
    maxDate,
    minDate,
    mode = 'single',
    name,
    onChange = () => { void 0 },
    onClose,
    pickerId,
    placeholder = 'Select Date',
    plugins = false,
    position,
    positionElement,
    scrollContainer,
    selectionType = '',
    showTimezone = false,
    staticPosition = true,
    thisRangesEndToday = false,
    yearRange = [1900, 2100],
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const inputAriaProps = buildAriaProps(inputAria)
  const inputDataProps = buildDataProps(inputData)

useEffect(() => {
  datePickerHelper({
    allowInput,
    defaultDate,
    disableDate,
    disableRange,
    disableWeekdays,
    enableTime,
    format,
    hideIcon,
    inLine,
    maxDate,
    minDate,
    mode,
    onChange,
    onClose,
    pickerId,
    plugins,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    position,
    positionElement,
    selectionType,
    showTimezone,
    staticPosition,
    thisRangesEndToday,
    yearRange,
    required: false,
  }, scrollContainer)
})
  const filteredProps = {...props}
  delete filteredProps?.position

  const classes = classnames(
    buildCss('pb_date_picker_kit'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    globalProps(filteredProps),
    error ? 'error' : null,
    className
  )
  const iconWrapperClass = () => {
    let base = 'cal_icon_wrapper'
    if (dark) {
      base += ' dark'
    }
    if (hideLabel) {
      base += ' no_label_shift'
    }
    if (error) {
      base += ' error'
    }
    return base
  }


  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <div
          {...inputAriaProps}
          {...inputDataProps}
          className="input_wrapper"
      >

        <Caption
            className="pb_date_picker_kit_label"
            text={hideLabel ? null : label}
        />
          <>
            <div className="date_picker_input_wrapper">
              <input
                  autoComplete="off"
                  className="date_picker_input"
                  disabled={disableInput}
                  id={pickerId}
                  name={name}
                  onChange={inputOnChange}
                  placeholder={placeholder}
                  value={inputValue}
              />

              {error &&
                  <Body
                      status="negative"
                      text={error}
                      variant={null}
                  />
              }
            </div>

            {!hideIcon &&
              <div
                  className={iconWrapperClass()}
                  id={`cal-icon-${pickerId}`}
              >
                <Icon
                    className="cal_icon"
                    icon="calendar-alt"
                />
              </div>
            }

            {hideIcon && inLine ?
              <div>
                <div
                    className={iconWrapperClass()}
                    id={`${pickerId}-icon-plus`}
                >
                  <Icon
                      className="date-picker-plus-icon"
                      icon="plus"
                  />
                </div>
                <div
                    className={iconWrapperClass()}
                    id={`${pickerId}-angle-down`}
                >
                  <Icon
                      className="angle_down_icon"
                      icon="angle-down"
                  />
                </div>
              </div>
              : null
            }
          </>
      </div>
    </div>
  )
}
export default DatePicker
