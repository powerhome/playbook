/* eslint-disable no-console */
import React from 'react'
import { render, screen } from '../utilities/test-utils'

import DatePicker from './_date_picker'

jest.setSystemTime(new Date('01/01/2020'));
const DEFAULT_DATE = new Date()

const formatDate = (date) => {
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = (date.getDate()).toString().padStart(2, "0")
  const year = date.getFullYear()

  return `${month}/${day}/${year}`
}

Date.prototype.formatDate = function () {
  return formatDate(this)
}

describe('DatePicker Kit', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  test('renders DatePicker input field', () => {
    const testId = 'datepicker-kit'
    render(
      <DatePicker
          data={{ testid: testId }}
          defaultDate={DEFAULT_DATE}
          pickerId="date-picker"
      />
    )

    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('pb_date_picker_kit mb_sm')
  })
})
