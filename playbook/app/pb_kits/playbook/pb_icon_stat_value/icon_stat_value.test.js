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
        expect(kit).toHaveClass("pb_icon_stat_value_kit_horizontal_sm_default")
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
        const icon = kit.querySelector(".fa-lightbulb-on.pb_icon_kit.fa-fw")
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
        const value = kit.querySelector(".pb_title_kit_size_3")
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
    
            const kit = screen.getByTestId(testId)
            expect(kit).toHaveClass(`pb_icon_stat_value_kit_horizontal_${sizeProp}_default`)

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
        "green"].forEach(
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
            expect(kit).toHaveClass(`pb_icon_stat_value_kit_horizontal_sm_${colorProp}`)

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
            expect(kit).toHaveClass("pb_icon_stat_value_kit_vertical_sm_default")
    })

})