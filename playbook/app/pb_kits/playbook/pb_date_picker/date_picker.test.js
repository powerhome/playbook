/* eslint-disable no-console */
import React from "react"
import { fireEvent, render, screen, waitFor, within } from "../utilities/test-utils"

import DatePicker from "./_date_picker"
import DateTime from "../pb_kit/dateTime.ts"
import { getTimezoneText } from "./plugins/timeSelect"

jest.setSystemTime(new Date("01/01/2020"))
const DEFAULT_DATE = new Date()

const formatDate = (date) => {
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  const year = date.getFullYear()

  return `${month}/${day}/${year}`
}

Date.prototype.formatDate = function () {
  return formatDate(this)
}

describe("DatePicker Kit", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {})
  })

  test("renders DatePicker input field", () => {
    const testId = "datepicker-kit"
    render(
      <DatePicker data={{ testid: testId }}
          defaultDate={DEFAULT_DATE}
          pickerId="date-picker"
      />
    )

    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass("pb_date_picker_kit mb_sm")
  })

  test("shows DatePicker date format m/d/Y", async () => {
    const testId = "datepicker-date"
    render(
      <DatePicker
          data={{ testid: testId }}
          defaultDate={DEFAULT_DATE}
          format="m/d/Y"
          pickerId="date-picker-date"
      />
    )

    const kit = screen.getByTestId(testId)

    const input = within(kit).getByPlaceholderText("Select Date")
    expect(input).toBeInTheDocument()

    await waitFor(() => {
      expect(input).toHaveValue("01/01/2020")
    })
  })

  test("shows DatePicker time caption text", async () => {
    const testId = "datepicker-time-caption"
    render(
      <DatePicker
          data={{ testid: testId }}
          defaultDate={DEFAULT_DATE}
          enableTime
          pickerId="date-picker-time-caption"
      />
    )

    const kit = screen.getByTestId(testId)
    const input = within(kit).getByPlaceholderText("Select Date")

    fireEvent(
      input,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    )
    await waitFor(() => {
      const caption = within(kit).getByText("Select Time")
      expect(caption).toBeInTheDocument()
    })
  })

  test("shows DatePicker timezone text", async () => {
    const testId = "datepicker-timezone"
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
    const input = within(kit).getByPlaceholderText("Select Date")
    const defaultTimezoneText = getTimezoneText(DEFAULT_DATE)

    fireEvent(
      input,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    )
    await waitFor(() => {
      const timezoneText = within(kit).getByText(defaultTimezoneText)
      expect(timezoneText).toBeInTheDocument()
    })
  })

  test("shows DatePicker meridiem toggle", async () => {
    const testId = "datepicker-meridiem"
    render(
      <DatePicker
          data={{ testid: testId }}
          defaultDate={DEFAULT_DATE}
          enableTime
          pickerId="date-picker-meridiem"
      />
    )

    const kit = screen.getByTestId(testId)
    const input = within(kit).getByPlaceholderText("Select Date")

    fireEvent(
      input,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    )
    const meridiemToggleAM = within(kit).getByLabelText("AM")
    const meridiemTogglePM = within(kit).getByLabelText("PM")
    await waitFor(() => {
      expect(meridiemToggleAM).toBeInTheDocument()
      expect(meridiemTogglePM).toBeInTheDocument()
    })

    fireEvent(
      meridiemToggleAM,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    )
    await waitFor(() => {
      expect(input).toHaveValue("01/01/2020 at 12:00 AM")
    })

    fireEvent(
      meridiemTogglePM,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    )
    await waitFor(() => {
      expect(input).toHaveValue("01/01/2020 at 12:00 PM")
    })
  })

  test("shows DatePicker QuickPick dropdown and adds correct date to input", async () => {
    const testId = "datepicker-quick-pick"
    render(
      <DatePicker
          allowInput
          data={{ testid: testId }}
          mode="range"
          pickerId="date-picker-quick-pick"
          placeholder="mm/dd/yyyy to mm/dd/yyyy"
          selectionType="quickpick"
      />
    )

    const kit = screen.getByTestId(testId)
    const input = within(kit).getByPlaceholderText("mm/dd/yyyy to mm/dd/yyyy")

    fireEvent(
      input,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    )
    const today = within(kit).getByText("Today")
    const thisYear = within(kit).getByText("This year")
    await waitFor(() => {
      expect(today).toBeInTheDocument()
      expect(thisYear).toBeInTheDocument()
    })

    fireEvent(
      thisYear,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    )

    await waitFor(() => {
      expect(input).toHaveValue(
        DateTime.getYearStartDate(new Date()).formatDate() +
          " to " +
          DateTime.getYearEndDate(new Date()).formatDate()
      )
    })
  })

  test("shows DatePicker QuickPick ranges ending today", async () => {
    const testId = "datepicker-quick-pick-ends-today"
    render(
      <DatePicker
          allowInput
          data={{ testid: testId }}
          mode="range"
          pickerId="date-picker-quick-pick"
          placeholder="mm/dd/yyyy to mm/dd/yyyy"
          selectionType="quickpick"
          thisRangesEndToday
      />
    )

    const kit = screen.getByTestId(testId)
    const input = within(kit).getByPlaceholderText("mm/dd/yyyy to mm/dd/yyyy")

    fireEvent(
      input,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    )

    const thisYear = within(kit).getByText("This year")

    fireEvent(
      thisYear,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    )

    await waitFor(() => {
      expect(input).toHaveValue(
        DateTime.getYearStartDate(new Date()).formatDate() + " to " + new Date().formatDate()
      )
    })
  })

  test("renders required indicator asterisk when requiredIndicator is true", () => {
    const testId = "datepicker-required-indicator"

    render(
      <DatePicker
          data={{ testid: testId }}
          label="Required Date"
          pickerId="date-picker-required-indicator"
          requiredIndicator
      />
    )

    const kit = screen.getByTestId(testId)
    const label = within(kit).getByText(/Required Date/)
    expect(label).toBeInTheDocument()
    expect(kit).toHaveTextContent("*")
  })

  test("does not render required indicator asterisk when requiredIndicator is false", () => {
    const testId = "datepicker-no-required-indicator"

    render(
      <DatePicker
          data={{ testid: testId }}
          label="Optional Date"
          pickerId="date-picker-no-required-indicator"
      />
    )

    const kit = screen.getByTestId(testId)
    const label = within(kit).getByText(/Optional Date/)
    expect(label).toBeInTheDocument()
    expect(kit).not.toHaveTextContent("*")
  })

  test("displays defaultDate when it is later than maxDate", async () => {
    const testId = "datepicker-out-of-range-after"
    const futureDateString = "01/15/2020"
    const maxDateString = "01/10/2020"

    render(
      <DatePicker
          data={{ testid: testId }}
          defaultDate={futureDateString}
          format="m/d/Y"
          maxDate={maxDateString}
          pickerId="date-picker-out-of-range-after"
      />
    )

    const kit = screen.getByTestId(testId)
    const input = within(kit).getByPlaceholderText("Select Date")

    await waitFor(
      () => {
        expect(input).toHaveValue("01/15/2020")
      },
      { timeout: 5000 }
    )
  })
})
