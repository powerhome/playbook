import React from 'react'
import classnames from 'classnames'

import moment from 'moment'

import styles from './styles.scss'

type Props = {
  className: string,
  clock: 24 | 12,
  disabled: boolean | "disabled",
  multiGroup: boolean,
  labelInside: boolean,
  defaultValue: string | Object,
  onChange: () => mixed,
  required: boolean,
  minHour: number,
  maxHour: number,
}

export default class TimePicker extends React.Component<Props> {

  static defaultProps = {
    clock: 12,
    disabled: false,
    multiGroup: true,
    labelInside: true,
    defaultValue: moment().hour(0).minute(0),
    minHour: 0,
    maxHour: 24,
    onChange: () => {},
  }

  state = {
    hour: '',
    minute: '',
  }

  componentWillMount() {
    const {defaultValue} = this.props
    const t = moment(defaultValue)
    const hour = t.format('HH')
    const minute = t.format('mm')
    if(t.isValid()) {
      this.setState({
        hour,
        minute,
      })
      this.handleTimeChange(hour, minute)
    }
  }

  props: Props

  handleTimeChange(hour, minute) {
    if (hour == '' && minute == '') {
      this.props.onChange('')
    } else {
      this.props.onChange(`${hour}:${minute}`)
    }
  }

  handleOnHourChange = (e) => {
    const hour = e.target.value
    let minute = this.state.minute
    if (hour != '' && minute == '') {
      minute = '00'
    } else if (hour == '') {
      minute = ''
    }
    this.setState({hour, minute})
    this.handleTimeChange(hour, minute)
  }

  handleOnMinutesChange = (e) => {
    let minute = e.target.value
    const hour = this.state.hour
    if (hour != '' && minute == '') {
      minute = '00'
    }
    this.setState({minute})
    this.handleTimeChange(hour, minute)
  }

  renderHoursSelect() {
    let options;
    const { minHour, maxHour } = this.props
    options = [<option key="ts-hr-option-no"/>]

    for(let i = minHour; i < maxHour; ++i) {
      const h = moment().hour(i)
      options.push(
        <option
            key={`ts-hr-option-${i}`}
            value={h.format('HH')}
        >
          <Choose>
            <When condition={this.props.clock == 12}>
              {h.format('ha')}
            </When>
            <Otherwise>
              {h.format('HH')}
            </Otherwise>
          </Choose>
        </option>
      )
    }

    let props = {
      className: "form-control",
      onChange: this.handleOnHourChange,
      value: this.state.hour,
    }

    if(this.props.required) props.required = "required"
    if(this.props.disabled) props.disabled = "disabled"

    return (
      <select
          {...props}
      >
        {options}
      </select>
    )
  }

  renderMinsSelect() {
    let minutes = [<option key="ts-min-option-no"/>]
    for(let i = 0; i < 60; ++i) {
      const m = moment().minutes(i)
      const padMins = m.format('mm')
      minutes.push(
        <option
            key={`ts-min-option-${i}`}
            value={padMins}
        >
          {`:${padMins}`}
        </option>)
    }

    let props = {
      className: "form-control",
      onChange: this.handleOnMinutesChange,
      value: this.state.minute,
      disabled: this.state.hour == ''
    }
    if(this.props.required) props.required = "required"
    if(this.props.disabled) props.disabled = "disabled"

    return (
      <select
          {...props}
      >
        {minutes}
      </select>
    )
  }

  render() {
    const {
      className,
      multiGroup,
      labelInside,
      required
    } = this.props;

    const wrapperCSS = [
      multiGroup ? "multi-input-group" : "form-group",
      className,
      styles.timePicker,
    ]

    const itemCSS = [
      "multi-input-group-item",
      labelInside ? "label-inside" : null
    ]

    return (
      <div className={classnames(wrapperCSS)}>
        <If condition={multiGroup}>
          <div className={classnames(itemCSS)}>
            <label>
              <If condition={required}>{`* `}</If>
              {`Hour`}
            </label>
            {this.renderHoursSelect()}
          </div>
          <div className={classnames(itemCSS)}>
            <label>
              <If condition={required}>{`* `}</If>
              {`Minutes`}
            </label>
            {this.renderMinsSelect()}
          </div>
        <Else/>
          <div className="col-md-6">
            <div className="form-group">
              <label>
                <If condition={required}>{`* `}</If>
                {`Hour`}
              </label>
              {this.renderHoursSelect()}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>
                <If condition={required}>{`* `}</If>
                {`Minutes`}
              </label>
              {this.renderMinsSelect()}
            </div>
          </div>
        </If>
      </div>
    )
  }
}
