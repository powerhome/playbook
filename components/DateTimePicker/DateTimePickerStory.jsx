import React from "react"
import DateTimePicker from "./DateTimePicker"

import { select, boolean, number } from "@storybook/addon-knobs"

import styles from './story-styles.scss'

export default function DateTimePickerStory(stories) {
  stories.add("DateTimePicker",
    () => {
      const props = {
        datePickerProps: {
          labelText: "Date",
          disabled: boolean("datePickerProps.disabled", false),
          timeFormat: ""
        },
        timePickerProps: {
          clock: select("timePickerProps.clock", [12, 24], 12),
          disabled: boolean("timePickerProps.disabled", false),
          minHour: number('timePickerProps.minHour', 0, { range: true, min: 0, max: 24, step: 1}),
          maxHour: number('timePickerProps.maxHour', 24, { range: true, min: 0, max: 24, step: 1}),
        },
        onChange: () => {},
        className: styles.root,
      }
      return (
        <DateTimePicker {...props}/>
      )
    }
  )
}
