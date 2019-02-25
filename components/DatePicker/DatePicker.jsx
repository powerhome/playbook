import React from 'react'
import classnames from 'classnames'
import Icon from '../Icon/Icon'
import {
  FormControl,
  ControlLabel,
  FormGroup,
  InputGroup,
  HelpBlock,
} from 'react-bootstrap'

import moment from 'moment'
require('moment-timezone')

import Datetime from 'react-datetime'

import style from './styles.scss'

export type Props = {
  className: string,
  errorMessage?: ?string,
  inputProps: Object<{ type: "text" }>,
  isValidDate: () => boolean,
  labelInside: boolean,
  labelText: string,
  multiInput: boolean,
  onChange: (any) => void,
  dateFormat: string,
  timeFormat: string,
  closeOnSelect: boolean,
  timeZone: string,
  required: boolean,
  floatAbove: boolean,
  value: string,
};

export default class DatePicker extends React.Component<Props> {

  static defaultProps = {
    className: "",
    errorMessage: null,
    inputProps: {
      type: "text",
    },
    onChange: function() {},
    labelInside: true,
    multiInput: false,
    dateFormat: "MM/DD/YYYY",
    closeOnSelect: true,
    timeZone: null,
  }

  state = {
    valid: true,
  }
  props: Props

  fieldFormat = () => {
    const { timeFormat, dateFormat } = this.props
    return timeFormat && timeFormat !== "" ? "YYYY-MM-DDTHH:mm:00Z" : dateFormat
  }

  handleOnChange = (dateTime) => {
    const { timeZone, onChange } = this.props

    if(dateTime.isValid()) {
      this.setState({ valid: true })
      const date = timeZone ? moment.tz(dateTime) : dateTime
      onChange(date.format(this.fieldFormat()))
    } else {
      this.setState({ valid: false })
      onChange("")
    }
  }

  renderInput = (inputProps, openCalendar) => {
    const {
      labelText,
      required,
      labelInside,
      errorMessage,
      multiInput,
    } = this.props

    return (
      <FormGroup
          className={classnames({ 'label-inside': labelInside })}
          validationState={!this.state.valid || errorMessage ? 'error' : undefined}
      >
        <ControlLabel>
          <If condition={required}>{`* `}</If>
          {labelText}
        </ControlLabel>
        <InputGroup>
          <FormControl {...inputProps}/>
          <span
              className={classnames('input-group-addon', { multi: multiInput })}
              onClick={openCalendar}
          >
            <Icon name="calendar"/>
          </span>
        </InputGroup>
        <If condition={errorMessage}>
          <HelpBlock>{errorMessage}</HelpBlock>
        </If>
      </FormGroup>
    )
  }

  dateTimeProps = () => {
    const {
      className,
      dateFormat,
      timeFormat,
      closeOnSelect,
      timeZone,
      required,
      multiInput,
      floatAbove,
      ...props
    } = this.props

    const inputProps = this.props.inputProps
    if (required) inputProps.required = "required"

    return {
      className: classnames(
        className, "react-datetime",
         { 'multi-input-group-item': multiInput, [style.above]: floatAbove }
      ),
      closeOnSelect,
      dateFormat,
      inputProps,
      onChange: this.handleOnChange,
      renderInput: this.renderInput,
      timeFormat,
      timeZone,
      value: this.formattedValue(),
      ...props,
    }
  }

  formattedValue = () => {
    const { value } = this.props
    if (!value) {
      return ''
    }
    return moment(value).format(this.fieldFormat())
  }

  render() {
    return (
      <Datetime {...this.dateTimeProps()}/>
    )
  }
}
