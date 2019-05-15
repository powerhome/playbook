import React from "react"
import classnames from "classnames"
import moment from "moment"

import DatePicker from "../DatePicker/DatePicker"
import TimePicker from "../TimePicker/TimePicker"

import styles from './styles.scss'

type Props = {
  className: string,
  datePickerProps: Object<{
    disabled: boolean | "disabled",
    dateFormat: string,
    timeFormat: string,
  }>,
  defaultValue: string | Object,
  onChange: () => mixed,
  timePickerProps: Object<{
    clock: 12 | 24,
    disabled: boolean | "disabled",
    multiGroup: boolean,
    labelInside: boolean,
  }>
}

export default class DateTimePicker extends React.Component<Props> {

  static defaultProps = {
    className: "",
    datePickerProps: {
      disabled: false,
      dateFormat: "MM/DD/YYYY",
      timeFormat: "",
    },
    defaultValue: null,
    timePickerProps: {
      clock: 12,
      disabled: false,
      multiGroup: true,
      labelInside: true,
    }
  }

  state = {
    date: null,
    time: null,
  }

  props: Props

  formatDateTime = (date, time) => (
    `${date.format(this.props.datePickerProps.dateFormat || "MM/DD/YYYY")} ${time}`
  )

  handleOnDateChanged = (date) => {
    const {time} = this.state
    this.setState({date})
    if(!time) return
    this.props.onChange(this.formatDateTime(date, time))
  }

  handleOnTimeChanged = (time) => {
    const {date} = this.state
    this.setState({time})
    if(!date) return
    this.props.onChange(this.formatDateTime(date, time))
  }

  render() {
    const {
      className,
      datePickerProps,
      defaultValue,
      timePickerProps,
    } = this.props

    const defaultDate = moment(defaultValue)
    let defaultDateValue
    if (defaultValue) {
      defaultDateValue = defaultDate.isValid() ? defaultDate.format(datePickerProps.dateFormat || "MM/DD/YYYY") : null
    }

    const css = [
      className,
      styles.dateTimePicker,
    ]

    return (
      <div className={classnames(css)}>
        <div className="multi-input-group full form-group">
          <DatePicker
              defaultValue={defaultDateValue}
              multiInput
              onChange={this.handleOnDateChanged}
              {...datePickerProps}
          />
          <div className="form-group multi-input-group-item">
            <TimePicker
                defaultValue={defaultValue}
                onChange={this.handleOnTimeChanged}
                {...timePickerProps}
            />
          </div>
        </div>
      </div>
    )
  }
}