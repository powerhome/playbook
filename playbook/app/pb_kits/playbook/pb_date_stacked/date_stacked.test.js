import React from 'react'
import { render, screen } from '../utilities/test-utils'

import DateStacked from './_date_stacked'

const TEST_DATE = "01/01/2020 00:00:000 GMT-0500";
jest.setSystemTime(new Date(TEST_DATE));
const futureDate = new Date(
  new Date().getFullYear() - 4,
  new Date().getMonth(),
  new Date().getDate(),
  new Date().getHours(),
  new Date().getMinutes()
);

const testId = "datestacked-kit";

describe("DateStacked Kit", () => {
    test("renders DateStacked className", () => {
        render(
            <DateStacked
                align="left"
                data={{ testid: testId }}
                date={new Date()}
                size="sm"      
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_date_stacked_kit_left_sm")
    })

    test("renders top text", () => {
        render(
            <DateStacked
                align="left"
                data={{ testid: testId }}
                date={new Date()}
                size="sm"      
            />
        )

        const kit = screen.getByTestId(testId)
        const text = kit.querySelector(".pb_caption_kit_md")
        expect(text.textContent).toEqual("JAN")
    })

    test("renders bottom text", () => {
        render(
            <DateStacked
                align="left"
                data={{ testid: testId }}
                date={new Date()}
                size="sm"      
            />
        )

        const kit = screen.getByTestId(testId)
        const text = kit.querySelector(".pb_title_kit.pb_title_4")
        expect(text.textContent).toEqual("1")
    })

    test("renders correct size", () => {
        render(
            <DateStacked
                align="left"
                data={{ testid: testId }}
                date={new Date()}
                size="md"      
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_date_stacked_kit_left_md")
    })

    test("renders year when non-current year", () => {
        render(
            <DateStacked
                align="left"
                data={{ testid: testId }}
                date={futureDate}
                size="sm"      
            />
        )

        const kit = screen.getByTestId(testId)
        const text = kit.querySelector(".pb_caption_kit_xs")
        expect(text.textContent).toEqual("2016")
    })

    test("renders correct className when order reversed", () => {
        render(
            <DateStacked
                align="left"
                data={{ testid: testId }}
                date={futureDate}
                reverse
                size="sm"      
            />
        )
        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_date_stacked_kit_left_sm_reverse")
    })

    test("renders bold prop", () => {
        render(
            <DateStacked
                align="left"
                bold
                data={{ testid: testId }}
                date={futureDate}
                size="md"      
            />
        )

        const kit = screen.getByTestId(testId)
        const text = kit.querySelector(".pb_title_kit.pb_title_4")
        expect(text).toBeInTheDocument()
    })

    test("renders center alignment prop", () => {
        render(
            <DateStacked
                align="center"
                data={{ testid: testId }}
                date={futureDate}
                size="md"      
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_date_stacked_kit_center_md")
    })

    test("renders right alignment prop", () => {
        render(
            <DateStacked
                align="right"
                data={{ testid: testId }}
                date={futureDate}
                size="md"      
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_date_stacked_kit_right_md")
    })


})