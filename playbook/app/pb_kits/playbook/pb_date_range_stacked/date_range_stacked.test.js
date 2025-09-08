import React from 'react'
import { render, screen } from '../utilities/test-utils'

import DateRangeStacked from './_date_range_stacked'

jest.useFakeTimers()
const testId = "daterangestacked-kit";

describe("DateRangeStacked Kit", () => {
    test("renders DateRangeStacked className", () => {
        render(
            <DateRangeStacked
                data={{ testid: testId }}
                endDate={new Date('20 Mar 2020')}
                startDate={new Date('18 Jun 2019')}
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_date_range_stacked")
    })

    test("renders DateRangeStacked start date container", () => {
        render(
            <DateRangeStacked
                data={{ testid: testId }}
                endDate={new Date('20 Mar 2020')}
                startDate={new Date('18 Jun 2019')}
            />
        )

        const kit = screen.getByTestId(testId)
        const text = kit.querySelector('.pb_date_year_stacked_right')
        expect(text).toBeInTheDocument()
    })

    test("renders DateRangeStacked end date container", () => {
        render(
            <DateRangeStacked
                data={{ testid: testId }}
                endDate={new Date('20 Mar 2020')}
                startDate={new Date('18 Jun 2019')}
            />
        )

        const kit = screen.getByTestId(testId)
        const text = kit.querySelector('.pb_date_year_stacked_left')
        expect(text).toBeInTheDocument()
    })

    test("renders arrow icon", () => {
        render(
            <DateRangeStacked
                data={{ testid: testId }}
                endDate={new Date('20 Mar 2020')}
                startDate={new Date('18 Jun 2019')}
            />
        )

        const kit = screen.getByTestId(testId)
        const arrowicon = kit.querySelector('.pb_custom_icon')
        expect(arrowicon).toBeInTheDocument()
    })


    test("renders DateRangeInline start date", () => {
        render(
            <DateRangeStacked
                data={{ testid: testId }}
                endDate={new Date('20 Mar 2020')}
                startDate={new Date('18 Jun 2019')}
            />

        )

        const kit = screen.getByTestId(testId)
        const text = kit.querySelector('.pb_date_year_stacked_right>.pb_title_kit.pb_title_4')
        expect(text.textContent).toEqual("18 JUN")
    })

    test("renders DateRangeInline start date year", () => {
        render(
            <DateRangeStacked
                data={{ testid: testId }}
                endDate={new Date('20 Mar 2020')}
                startDate={new Date('18 Jun 2019')}
            />

        )

        const kit = screen.getByTestId(testId)
        const text = kit.querySelector(".pb_date_year_stacked_right>.pb_body_kit_light")
        expect(text.textContent).toEqual("2019")
    })

    test("renders DateRangeInline end date", () => {
        render(
            <DateRangeStacked
                data={{ testid: testId }}
                endDate={new Date('20 Mar 2020')}
                startDate={new Date('18 Jun 2019')}
            />

        )

        const kit = screen.getByTestId(testId)
        const text = kit.querySelector('.pb_date_year_stacked_left>.pb_title_kit.pb_title_4')
        expect(text.textContent).toEqual("20 MAR")
    })

    test("renders DateRangeInline end date year", () => {
        render(
            <DateRangeStacked
                data={{ testid: testId }}
                endDate={new Date('20 Mar 2020')}
                startDate={new Date('18 Jun 2019')}
            />

        )

        const kit = screen.getByTestId(testId)
        const text = kit.querySelector(".pb_date_year_stacked_left>.pb_body_kit_light")
        expect(text.textContent).toEqual("2020")
    })


})