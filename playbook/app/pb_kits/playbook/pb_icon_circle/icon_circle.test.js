import React from 'react'
import { render, screen, cleanup } from '../utilities/test-utils'

import IconCircle from './_icon_circle'

const testId = "icon-circle-kit"

describe("IconCircle Kit", () => {
    test("renders classname", () => {
        render(
            <IconCircle
                data={{ testid: testId }}
                icon="user"
                size="md"
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_icon_circle_kit_size_md_default")
    })

    test("renders icon", () => {
        render(
            <IconCircle
                data={{ testid: testId }}
                icon="user"
                size="md"
            />
        )

        const kit = screen.getByTestId(testId)
        const icon = kit.querySelector('.pb_icon_kit')
        expect(icon).toBeInTheDocument()
    })

    test("renders emoji", () => {
        render(
            <IconCircle
                data={{ testid: testId }}
                icon="&#128525;"
                size="md"
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveTextContent("😍")
    })

    test('displays color variants', () => {
        [
          "default",
          "royal",
          "blue",
          "purple",
          "teal",
          "red",
          "yellow",
          "green"
        ].forEach((colorVariant) => {
          render(
            <IconCircle
                data={{ testid: testId }}
                icon="rocket"
                size="sm"
                variant={colorVariant}
            />
          )
          const kit = screen.getByTestId(testId)
          expect(kit).toHaveClass(`pb_icon_circle_kit_size_sm_${colorVariant}`)
      
          cleanup()
        })
      })

      test('displays size as expected', () => {
        [
          "xxs",
          "xs",
          "sm",
          "md",
          "lg",
          "xl"
        ].forEach((sizeVariant) => {
          render(
            <IconCircle
                data={{ testid: testId }}
                icon="rocket"
                size={sizeVariant}
            />
          )
          const kit = screen.getByTestId(testId)
          expect(kit).toHaveClass(`pb_icon_circle_kit_size_${sizeVariant}_default`)
      
          cleanup()
        })
      })

})