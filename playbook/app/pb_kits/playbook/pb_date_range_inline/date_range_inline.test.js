import React from 'react'
import { render, screen } from '../utilities/test-utils'

import DateRangeInline from './_date_range_inline'

jest.useFakeTimers()
const testId = "daterangeinline-kit";

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
        const arrow = kit.querySelector('.pb_custom_icon')
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
        const calendar = kit.querySelector('.pb_custom_icon')
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

    test("renders DateRangeInline with year when showCurrentYear is true", () => {
        const currentYear = new Date().getFullYear()
        render(
            <DateRangeInline
                data={{ testid: testId }}
                endDate={new Date((`15 Aug ${currentYear}`))}
                showCurrentYear
                size="xs"
                startDate={new Date(`15 Jan ${currentYear}`)}
            />
        )

        const kit = screen.getByTestId(testId)
        const text = kit.querySelector('.pb_caption_kit_md:first-child')
        expect(text.textContent).toEqual(` Jan 15, ${currentYear} `)
    })
    

})