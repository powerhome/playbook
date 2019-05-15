import React from 'react'
import TimePicker from './TimePicker'

import { select, boolean, number } from '@storybook/addon-knobs'

export default function TimePickerStory(stories) {
  stories.add('TimePicker',
    () => {
      const props = {
        clock: select('clock', [12, 24], 12),
        disabled: boolean('disabled', false),
        minHour: number('minHour', 0, { range: true, min: 0, max: 24, step: 1}),
        maxHour: number('maxHour', 24, { range: true, min: 0, max: 24, step: 1}),
        onChange: () => {},
        defaultValue: '',
      }
      return (
        <TimePicker {...props}/>
      )
    }
  )
}
