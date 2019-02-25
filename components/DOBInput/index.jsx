import React from "react"
import moment from "moment"
import classnames from "classnames"
import { DatePicker, Props as DatePickerProps } from "../"

import styles from "./styles.scss"

export type Props = {
  ...DatePickerProps,
  preventMinor: boolean,
}

const eighteenYearsAgo = moment().subtract(18, "years")
const isNotMinor = (currentDate, selectedDate) =>
  currentDate.isBefore(eighteenYearsAgo)

const DOBInput = ({ className, preventMinor, isValidDate, viewDate, ...props }) => {
  className = classnames(className, styles.dob)

  if (preventMinor) {
    props.viewDate = viewDate || eighteenYearsAgo
    props.isValidDate = isValidDate || isNotMinor
  }

  return (
    <DatePicker {...props} className={className} />
  )
}

DOBInput.defaultProps = {
  value: "",
  preventMinor: false,
}

export default DOBInput