import React from 'react'
import { render, screen } from '../utilities/test-utils'

import IconValue from './_icon_value'

const testId = "iconvalue-kit";

describe("IconValue Kit", () => {
    test("renders IconValue classname", () => {
        render(
            <IconValue
                data={{ testid: testId }}
                icon="clipboard"
                text="33-123456"
      />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_icon_value_kit_left")
    })

    test("renders icon", () => {
        render(
            <IconValue
                data={{ testid: testId }}
                icon="clipboard"
                text="33-123456"
      />
        )

        const kit = screen.getByTestId(testId)
        const icon = kit.querySelector(".fa-clipboard.pb_icon_kit.fa-fw")
        expect(icon).toBeInTheDocument()
    })

    test("renders value", () => {
        render(
            <IconValue
                data={{ testid: testId }}
                icon="clipboard"
                text="33-123456"
      />
        )

        const kit = screen.getByTestId(testId)
        const value = kit.querySelector(".pb_body_kit_light")
        expect(value.textContent).toEqual("33-123456")
    })

    test("aligns content center", () => {
        render(
            <IconValue
                align="center"
                data={{ testid: testId }}
                icon="clipboard"
                text="33-123456"
      />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_icon_value_kit_center")
    })

    test("aligns content right", () => {
        render(
            <IconValue
                align="right"
                data={{ testid: testId }}
                icon="clipboard"
                text="33-123456"
      />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_icon_value_kit_right")
    })
})