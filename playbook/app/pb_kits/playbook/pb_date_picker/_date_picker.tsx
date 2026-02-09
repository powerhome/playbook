import React, { useEffect } from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { deprecatedProps, globalProps, GlobalProps } from '../utilities/globalProps'
import { getAllIcons } from "../utilities/icons/allicons"
import { camelToSnakeCase } from '../utilities/text'

import datePickerHelper from './date_picker_helper'
import Icon from '../pb_icon/_icon'
import Caption from '../pb_caption/_caption'
import Body from '../pb_body/_body'
import colors from "../tokens/exports/_colors.module.scss"

type DatePickerProps = {
  allowInput?: boolean,
  aria?: { [key: string]: string },
  className?: string,
  customQuickPickDates: { override: boolean, dates: any[] },
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
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  initializeOnce?: boolean,
  inLine?: boolean,
  inputAria?: { [key: string]: string },
  inputData?: { [key: string]: string },
  inputOnChange?: (e: React.FormEvent<HTMLInputElement>) => void,
  inputValue?: string,
  label?: string,
  maxDate: string,
  minDate: string,
  name: string,
  pickerId: string,
  placeholder?: string,
  positionElement?: HTMLElement | null,
  requiredIndicator?: boolean
  scrollContainer?: string,
  selectionType?: "month" | "week"| "quickpick",
  showTimezone?: boolean,
  staticPosition: boolean,
  thisRangesEndToday?: boolean,
  timeFormat?: string,
  type?: string,
  yearRange?: number[],
  controlsStartId?: string,
    controlsEndId?: string,
    syncStartWith?: string,
    syncEndWith?: string,
} & GlobalProps

const DatePicker = (props: DatePickerProps): React.ReactElement => {
  if (props.plugins) deprecatedProps()

  const {
    allowInput = false,
    aria = {},
    className,
    customQuickPickDates,
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
    htmlOptions = {},
    id,
    initializeOnce = false,
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
    requiredIndicator,
    scrollContainer,
    selectionType = '',
    showTimezone = false,
    staticPosition = true,
    thisRangesEndToday = false,
    yearRange = [1900, 2100],
    controlsStartId,
    controlsEndId,
    syncStartWith,
    syncEndWith,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const inputAriaProps = buildAriaProps(inputAria)
  const inputDataProps = buildDataProps(inputData)

  // Convert cursor prop to CSS-style format to apply to input tag below
  const getCursorStyle = (cursor?: string): string => {
    // If input is disabled, always use 'not-allowed'
    if (disableInput) return 'not-allowed'

    // If cursor prop is provided, convert it to styling format
    if (cursor) {
      return camelToSnakeCase(cursor).replace(/_/g, '-')
    }

    // Default to 'pointer'
    return 'pointer'
  }

  useEffect(() => {
    datePickerHelper({
      allowInput,
      customQuickPickDates,
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
      controlsStartId,
      controlsEndId,
      syncStartWith,
      syncEndWith,
      required: false,
    }, scrollContainer)
  }, initializeOnce ? [] : undefined)

  const filteredProps = {...props}
  if (filteredProps.marginBottom === undefined) {
    filteredProps.marginBottom = "sm"
  }
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

  const angleDown = getAllIcons()["angleDown"].icon as unknown as { [key: string]: SVGElement }

  const errorId = error ? `${pickerId}-error` : undefined

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      <div
          {...inputAriaProps}
          {...inputDataProps}
          className="input_wrapper"
      >

        {!hideLabel && (
           <label htmlFor={pickerId}>
            {requiredIndicator ? (
              <Caption className="pb_date_picker_kit_label">
                {label} <span style={{ color: `${colors.error}` }}>*</span>
              </Caption>
            ) : (
              <Caption className="pb_date_picker_kit_label"
                  text={label}
              />
            )}
          </label>
        )}
          <>
            <div className="date_picker_input_wrapper">
              <input
                  aria-describedby={errorId}
                  aria-invalid={!!error}
                  autoComplete="off"
                  className="date_picker_input"
                  disabled={disableInput}
                  id={pickerId}
                  name={name}
                  onChange={inputOnChange}
                  placeholder={placeholder}
                  style={{ cursor: getCursorStyle(filteredProps.cursor) }}
                  value={inputValue}
              />

              {error &&
                  <Body
                      aria={{ atomic: "true", live: "polite" }}
                      htmlOptions={{ role: "alert" }}
                      id={errorId}
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
                    className={`${iconWrapperClass()} date-picker-inline-icon-plus`}
                    id={`${pickerId}-icon-plus`}
                >
                  <Icon
                      className="date-picker-plus-icon"
                      icon="plus"
                  />
                </div>
                <div
                    className={`${iconWrapperClass()} date-picker-inline-angle-down`}
                    id={`${pickerId}-angle-down`}
                >
                  <Icon
                      className="angle_down_icon svg-inline--fa"
                      customIcon={angleDown}
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
