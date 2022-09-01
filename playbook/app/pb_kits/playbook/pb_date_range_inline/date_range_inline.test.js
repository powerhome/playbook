import React from 'react'
import { render, screen } from '../utilities/test-utils'

import DateRangeInline from './_date_range_inline'

const TEST_DATE = "01/01/2020 00:00:000 GMT-0500";
jest.setSystemTime(new Date(TEST_DATE));
const testId = "daterangeinline-kit";
const realDate = Date;

beforeEach(() => {
  global.Date.now = jest.fn(() => new Date(TEST_DATE));
});

afterEach(() => {
  global.Date = realDate;
});

describe("DateRangeInline Kit", () => {
    test("renders DateRangeInline className", () => {
        render(
            <DateRangeInline
                data={{ testid: testId }}
                endDate={new Date('20 Mar 2015')}
                size="xs"
                startDate={new Date('18 Jun 2013')}
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_date_range_inline_kit_left")
    })

    test("renders DateRangeInline text left", () => {
        render(
            <DateRangeInline
                data={{ testid: testId }}
                endDate={new Date('20 Mar 2015')}
                size="xs"
                startDate={new Date('18 Jun 2013')}
            />
        )

        const kit = screen.getByTestId(testId)
        const text = kit.querySelector('.pb_caption_kit_md:first-child')
        expect(text.textContent).toEqual(" Jun 18, 2013 ")
    })

    test("renders DateRangeInline text right", () => {
        render(
            <DateRangeInline
                data={{ testid: testId }}
                endDate={new Date('20 Mar 2015')}
                size="xs"
                startDate={new Date('18 Jun 2013')}
            />
        )

        const kit = screen.getByTestId(testId)
        const text = kit.querySelector('.pb_caption_kit_md:last-child')
        expect(text.textContent).toEqual(" Mar 20, 2015 ")
    })

    test("renders DateRangeInline arrow icon center", () => {
        render(
            <DateRangeInline
                data={{ testid: testId }}
                endDate={new Date('20 Mar 2015')}
                size="xs"
                startDate={new Date('18 Jun 2013')}
            />
        )

        const kit = screen.getByTestId(testId)
        const arrow = kit.querySelector('.pb_icon_kit.fa-fw.fa-long-arrow-right')
        expect(arrow).toBeInTheDocument()
    })

    test("renders DateRangeInline className if size sm", () => {
        render(
            <DateRangeInline
                data={{ testid: testId }}
                endDate={new Date('20 Mar 2015')}
                size="sm"
                startDate={new Date('18 Jun 2013')}
            />
        )

        const kit = screen.getByTestId(testId)
        const innerKit = kit.querySelector('.pb_body_kit')
        expect(innerKit).toBeInTheDocument()
    })

    test("renders DateRangeInline calender icon left", () => {
        render(
            <DateRangeInline
                data={{ testid: testId }}
                endDate={new Date('20 Mar 2015')}
                icon
                size="xs"
                startDate={new Date('18 Jun 2013')}
            />
        )

        const kit = screen.getByTestId(testId)
        const calendar = kit.querySelector('.pb_icon_kit.fa-fw.fa-calendar-alt')
        expect(calendar).toBeInTheDocument()
    })

    test("renders DateRangeInline without year", () => {
        render(
            <DateRangeInline
                data={{ testid: testId }}
                endDate={new Date((`15 Aug ${new Date().getFullYear()}`))}
                size="xs"
                startDate={new Date(`15 Jan ${new Date().getFullYear()}`)}
            />
        )

        const kit = screen.getByTestId(testId)
        const text = kit.querySelector('.pb_caption_kit_md:first-child')
        expect(text.textContent).toEqual(" Jan 15 ")
    })

})