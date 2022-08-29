/* eslint-disable no-console */
import React from 'react'
import { fireEvent, render, screen, waitFor, within } from '../utilities/test-utils'

import DatePicker from './_date_picker'
import { getTimezoneText } from './plugins/timeSelect'



jest.setSystemTime(new Date('01/01/2020'));
const DEFAULT_DATE = new Date()


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
    expect(kit).toHaveClass('pb_date_picker_kit')
  })

  test('shows DatePicker date format m/d/Y', async () => {
    const testId = 'datepicker-date'
    render(
      <DatePicker
          data={{ testid: testId }}
          defaultDate={DEFAULT_DATE}
          format="m/d/Y"
          pickerId="date-picker-date"
      />
    )

    const kit = screen.getByTestId(testId)


    const input = within(kit).getByPlaceholderText('Select Date')
    expect(input).toBeInTheDocument()

    await waitFor(() => {
      expect(input).toHaveValue('01/01/2020')
    })
  })

  test('shows DatePicker time caption text', async () => {
    const testId = 'datepicker-time-caption'
    render(
      <DatePicker
          data={{ testid: testId }}
          defaultDate={DEFAULT_DATE}
          enableTime
          pickerId="date-picker-time-caption"
      />
    )

    const kit = screen.getByTestId(testId)
    const input = within(kit).getByPlaceholderText('Select Date')

    fireEvent(
      input,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )
    await waitFor(() => {
      const caption = within(kit).getByText('Select Time')
      expect(caption).toBeInTheDocument()
    })
  })

  test('shows DatePicker timezone text', async () => {
    const testId = 'datepicker-timezone'
    render(
      <DatePicker
          data={{ testid: testId }}
          defaultDate={DEFAULT_DATE}
          enableTime
          pickerId="date-picker-timezone"
          showTimezone
      />
    )

    const kit = screen.getByTestId(testId)
    const input = within(kit).getByPlaceholderText('Select Date')
    const defaultTimezoneText = getTimezoneText(DEFAULT_DATE)

    fireEvent(
      input,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )
    await waitFor(() => {
      const timezoneText = within(kit).getByText(defaultTimezoneText)
      expect(timezoneText).toBeInTheDocument()
    })
  })

  test('shows DatePicker meridiem toggle', async () => {
    const testId = 'datepicker-meridiem'
    render(
      <DatePicker
          data={{ testid: testId }}
          defaultDate={DEFAULT_DATE}
          enableTime
          pickerId="date-picker-meridiem"
      />
    )

    const kit = screen.getByTestId(testId)
    const input = within(kit).getByPlaceholderText('Select Date')

    fireEvent(
      input,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )
    const meridiemToggleAM = within(kit).getByLabelText('AM')
    const meridiemTogglePM = within(kit).getByLabelText('PM')
    await waitFor(() => {
      expect(meridiemToggleAM).toBeInTheDocument()
      expect(meridiemTogglePM).toBeInTheDocument()
    })

    fireEvent(
      meridiemToggleAM,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )
    await waitFor(() => {
      expect(input).toHaveValue('01/01/2020 at 12:00 AM')
    })

    fireEvent(
      meridiemTogglePM,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )
    await waitFor(() => {
      expect(input).toHaveValue('01/01/2020 at 12:00 PM')
    })
  })
})
