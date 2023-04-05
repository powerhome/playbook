import React, { useEffect, useState} from 'react'
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
    pickerId,
    placeholder = 'Select Date',
    plugins = false,
    position,
    positionElement,
    scrollContainer,
    selectionType = '',
    showTimezone = false,
    staticPosition = true,
    yearRange = [1900, 2100],
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const inputAriaProps = buildAriaProps(inputAria)
  const inputDataProps = buildDataProps(inputData)

  useEffect(() => {
    // {selectionType !== "quickpick" && 
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
        pickerId,
        plugins,
        position,
        positionElement,
        selectionType,
        showTimezone,
        staticPosition,
        yearRange,
        required: false,
      }, scrollContainer)
    // }
  })

  const classes = classnames(
    buildCss('pb_date_picker_kit'),
    globalProps(props),
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

  // const formatDateToday = (date: Date) => {
  //   const d = date.getDate();
  //   const m = date.getMonth() + 1;
  //   const y = date.getFullYear();
  //   return (m <= 9 ? '0' + m : m) + "/" + (d <= 9 ? '0' + d : d) + "/" + y
  // }

  // const formatDateYesterday = (date: Date) => {
  //   const d = date.getDate() - 1;
  //   const m = date.getMonth() + 1;
  //   const y = date.getFullYear();
  //   return (m <= 9 ? '0' + m : m) + "/" + (d <= 9 ? '0' + d : d) + "/" + y
  // }

  // const newDate = new Date();

  // const dateRanges = 
  // [
  //   {
  //     label: "Today",
  //     startDate: formatDateToday(newDate),
  //     endDate: formatDateToday(newDate),
  //   },
  //   {
  //     label: "Yesterday",
  //     startDate: formatDateYesterday(newDate),
  //     endDate: formatDateYesterday(newDate),
  //   },
  // ]

  // //-----QuickPick Variant-------//
  // const [showPopover, setShowPopover] = useState(false)
  // const [quickInputValue, setQuickInputValue] = useState('')
  
  // const handleTogglePopover = () => {
  //   setShowPopover(true)
  // }
  // const handleQuickPickClose = (shouldClosePopover: boolean) => {
  //   setShowPopover(!shouldClosePopover)
  // }
  
  // const handleUpdateFirstInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
  //   setQuickInputValue(target.value)
  // }
  
  // const handleNavClick = (start: string, end: string) => {
  //   console.log(start + " → " + end)
  //   setQuickInputValue(start + " → " + end)
  //   setShowPopover(false)
  // }

  // const QuickPickInput = () => {
  //   return (
  //     <div className="date_picker_input_wrapper">
  //         <> 
  //           <div className="date_picker_input_wrapper">
  //             <input
  //                 autoComplete="off"
  //                 className="date_picker_input"
  //                 disabled={disableInput}
  //                 id={pickerId}
  //                 name={"quick-pick-text-input"}
  //                 onChange={handleUpdateFirstInput}
  //                 onClick={handleTogglePopover}
  //                 placeholder={"mm/dd/yyyy → mm/dd/yyyy"}
  //                 value={quickInputValue}
  //             />

  //             {error && 
  //                 <Body
  //                     status="negative"
  //                     text={error}
  //                     variant={null}
  //                 />
  //             }
  //           </div>
        
  //           {!hideIcon && 
  //             <div
  //                 className={iconWrapperClass()}
  //                 id={`cal-icon-${pickerId}`}
  //             >
  //               <Icon
  //                   className="cal_icon"
  //                   icon="calendar-alt"
  //               />
  //             </div>
  //           }

  //           {hideIcon && inLine ?
  //             <div>
  //               <div
  //                   className={iconWrapperClass()}
  //                   id={`${pickerId}-icon-plus`}
  //               >
  //                 <Icon
  //                     className="date-picker-plus-icon"
  //                     icon="plus"
  //                 />
  //               </div>
  //               <div
  //                   className={iconWrapperClass()}
  //                   id={`${pickerId}-angle-down`}
  //               >
  //                 <Icon
  //                     className="angle_down_icon"
  //                     icon="angle-down"
  //                 />
  //               </div>
  //             </div>
  //             : null
  //           }
  //         </>
  //     </div>
  //   )
  // }
  // const popOverRef: React.ReactElement = (
  //   <QuickPickInput/>
  // )

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
          className="input_wrapper">

        <Caption
            className="pb_date_picker_kit_label"
            text={hideLabel ? null : label}
        />

        {/* {selectionType === "quickpick" ? null : */}
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
        {/* } */}
        {/* QuickPick Variant */}
        {/* {selectionType === "quickpick" &&
          <PbReactPopover
              closeOnClick="outside"
              cursor="pointer"
              id="quickpickPopOver"
              padding="none"
              placement="bottom-start"
              reference={popOverRef}
              shouldClosePopover={handleQuickPickClose}
              show={showPopover}
          >
            <Nav variant="subtle">
              {dateRanges.map((dateRange, index) => {
                return (
                  <NavItem
                      data={ 
                        {startdate: dateRange.startDate,
                          enddate: dateRange.endDate
                        }
                      }
                      key={index}
                      onClick={() => handleNavClick(dateRange.startDate, dateRange.endDate)}
                      text={dateRange.label}
                  />
                )
              })}
            </Nav>
          </PbReactPopover>
        } */}
      </div>
    </div>
  )
}
export default DatePicker
