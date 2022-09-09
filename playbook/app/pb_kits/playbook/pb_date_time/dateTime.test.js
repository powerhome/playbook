import React from 'react'
import { render, screen } from '../utilities/test-utils'

import DateTime from './_date_time'

const TEST_DATE = '01/01/2020 00:00:000 GMT-0500'
jest.setSystemTime(new Date(TEST_DATE));
const testId = 'datetime-kit'

const realDate = Date

beforeEach(() => {
  global.Date.now = jest.fn(() => new Date(TEST_DATE).getTime());
})

afterEach(() => {
  global.Date = realDate;
})

describe('DateTime Kit', () => {
  test('renders DatePicker className', () => {
    render(
      <DateTime
          data={{ testid: testId }}
          datetime={new Date(Date.now())}
          showDayOfWeek
          showIcon
      />
    )

    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('pb_date_time_md')
  })
  test('renders DatePicker text left', () => {
    render(
      <DateTime
          data={{ testid: testId }}
          datetime={new Date(Date.now())}
          showDayOfWeek
          showIcon
      />
    )

    const kit = screen.getByTestId(testId)
    const text = kit.querySelector('.pb_date_kit_left')
    expect(text.textContent).toEqual('Wed • Jan 1')
  })
  test('renders DatePicker text right', () => {
    render(
      <DateTime
          data={{ testid: testId }}
          datetime={new Date(Date.now())}
          showDayOfWeek
          showIcon
      />
    )

    const kit = screen.getByTestId(testId)
    const text = kit.querySelector('.pb_time_kit_md.ml_sm')
    const clock = kit.querySelector('.pb_icon_kit.far.fa-fw.fa-clock')

    expect(clock).toBeInTheDocument()
    expect(text.textContent).toEqual(' 12:00a EST')
  })
  test('renders DatePicker text right no icon', () => {
    render(
      <DateTime
          data={{ testid: testId }}
          datetime={new Date(Date.now())}
          showDayOfWeek
      />
    )

    const kit = screen.getByTestId(testId)
    const clock = kit.querySelector('.pb_icon_kit.far.fa-fw.fa-clock')

    expect(clock).toBeNull()
  })
  test('renders DatePicker text right timezone', () => {
    render(
      <DateTime
          data={{ testid: testId }}
          datetime={new Date(Date.now())}
          showDayOfWeek
          timeZone="Asia/Tokyo"
      />
    )

    const kit = screen.getByTestId(testId)
    const text = kit.querySelector('.pb_time_kit_md.ml_sm')

    expect(text.textContent).toEqual('2:00p JST')
  })
  test('renders DatePicker size', () => {
    render(
      <DateTime
          data={{ testid: testId }}
          datetime={new Date(Date.now())}
          showDayOfWeek
          size="sm"
      />
    )

    const kit = screen.getByTestId(testId)
    const rightSide = kit.querySelector('.pb_time_kit_sm.ml_sm')

    expect(kit).toHaveClass('pb_date_time_sm')
    expect(rightSide).toBeInTheDocument()
  })
})
