import React from 'react'
import { cleanup, render, screen } from '../utilities/test-utils'

import IconStatValue from './_icon_stat_value'

const testId = "iconstatvalue-kit"

describe("IconStatValue Kit", () => {
    test("renders IconStatValue classname", () => {
        render(
            <IconStatValue
                data={{ testid: testId }}
                icon="lightbulb-on"
                text="Electric"
                unit="kw"
                value={64.18}
      />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_icon_stat_value_kit_horizontal")
    })

    test("renders icon", () => {
        render(
            <IconStatValue
                data={{ testid: testId }}
                icon="lightbulb-on"
                text="Electric"
                unit="kw"
                value={64.18}
      />
        )

        const kit = screen.getByTestId(testId)
        const icon = kit.querySelector(".pb_custom_icon")
        expect(icon).toBeInTheDocument()
    })

    test("renders text", () => {
        render(
            <IconStatValue
                data={{ testid: testId }}
                icon="lightbulb-on"
                text="Electric"
                unit="kw"
                value={64.18}
      />
        )

        const kit = screen.getByTestId(testId)
        const text = kit.querySelector(".pb_caption_kit_md")
        expect(text.textContent).toEqual("Electric")
    })

    test("renders unit", () => {
        render(
            <IconStatValue
                data={{ testid: testId }}
                icon="lightbulb-on"
                text="Electric"
                unit="kw"
                value={64.18}
      />
        )

        const kit = screen.getByTestId(testId)
        const unit = kit.querySelector(".pb_body_kit")
        expect(unit.textContent).toEqual("kw")
    })

    test("renders value", () => {
        render(
            <IconStatValue
                data={{ testid: testId }}
                icon="lightbulb-on"
                text="Electric"
                unit="kw"
                value={64.18}
      />
        )

        const kit = screen.getByTestId(testId)
        const value = kit.querySelector(".pb_title_kit.pb_title_3")
        expect(value.textContent).toEqual("64.18")
    })

    test("renders size prop", () => {
        ["sm", 
        "md", 
        "lg"].forEach((sizeProp) => {
            render(
                <IconStatValue
                    data={{ testid: testId }}
                    icon="lightbulb-on"
                    size={sizeProp}
                    text="Electric"
                    unit="kw"
                    value={64.18}
          />
            )
            const size = sizeProp === "sm" ? "3" : sizeProp === "md" ? "2" : "1"
            const kit = screen.getByTestId(testId)
            const title = kit.querySelector(".pb_title_kit")
            expect(title).toHaveClass(`pb_title_${size}`)

            cleanup()
        })
    })

    test("renders color prop", () => {
        ["default",
        "royal",
        "blue",
        "purple",
        "teal",
        "red",
        "yellow",
        "green",
        "lighter"].forEach(
            (colorProp) => {
            render(
                <IconStatValue
                    data={{ testid: testId }}
                    icon="lightbulb-on"
                    text="Electric"
                    unit="kw"
                    value={64.18}
                    variant={colorProp}
          />
            )

            const kit = screen.getByTestId(testId)
            const iconCircle = kit.querySelector(`.pb_icon_circle_kit_size_sm_${colorProp}`)
            expect(iconCircle).toBeInTheDocument()

            cleanup()
        }) 
    })

    test("renders vertical prop", () => {
            render(
                <IconStatValue
                    data={{ testid: testId }}
                    icon="lightbulb-on"
                    orientation="vertical"
                    text="Electric"
                    unit="kw"
                    value={64.18}
          />
            )
    
            const kit = screen.getByTestId(testId)
            expect(kit).toHaveClass("pb_icon_stat_value_kit_vertical")
    })

})