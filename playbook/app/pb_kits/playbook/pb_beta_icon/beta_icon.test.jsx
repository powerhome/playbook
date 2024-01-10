import React from 'react'
import { render, screen, cleanup } from '../utilities/test-utils'

import BetaIcon from './_beta_icon'

const testId = "icon-kit"

describe("Icon Kit", () => {
    test("renders Icon classname", () => {
        render(
            <BetaIcon
                data={{ testid: testId }}
                fixedWidth
                icon="user"
      />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("fa-user pb_icon_kit fa-fw far")
    })

    test("renders rotate prop", () => {[
        "90", "180", "270"].forEach((rotateProp)=> {
        render(
            <BetaIcon
                data={{ testid: testId }}
                fixedWidth
                icon="user"
                rotation={rotateProp}
      />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass(`fa-user pb_icon_kit fa-fw fa-rotate-${rotateProp} far`)

        cleanup()
    })
})

    test("renders flip prop", () => {
        render(
            <BetaIcon
                data={{ testid: testId }}
                fixedWidth
                flip="horizontal"
                icon="user"
      />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("fa-user pb_icon_kit fa-fw fa-flip-horizontal far")
    })


    test("renders spinning icon", () => {
        render(
            <BetaIcon
                data={{ testid: testId }}
                fixedWidth
                icon="spinner"
                spin
      />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("fa-spinner pb_icon_kit fa-fw fa-spin far")
    })

    test("renders pull icon", () => {
        render(
            <BetaIcon
                data={{ testid: testId }}
                fixedWidth
                icon="arrow-left"
                pull="left"
      />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("fa-arrow-left pb_icon_kit fa-fw fa-pull-left far")
    })

    test("renders pull icon", () => {
        render(
            <BetaIcon
                data={{ testid: testId }}
                fixedWidth
                icon="arrow-left"
                pull="left"
      />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("fa-arrow-left pb_icon_kit fa-fw fa-pull-left far")
    })

    test("renders border around icon", () => {
        render(
            <BetaIcon
                border
                data={{ testid: testId }}
                fixedWidth
                icon="user"
      />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("fa-user pb_icon_kit fa-border fa-fw far")
    })

    test("renders size prop", () => {
        ["lg",
        "sm",
        "xs",
        "1x",
        "2x",
        "3x",
        "4x",
        "5x",
        "6x",
        "7x",
        "8x",
        "9x",
        "10x"].forEach(
            (sizeProp) => {
            render(
                <BetaIcon
                    data={{ testid: testId }}
                    icon="user"
                    size={sizeProp}
          />
            )

            const kit = screen.getByTestId(testId)
            expect(kit).toHaveClass(`pb_icon_kit fa-user fa-fw fa-${sizeProp} far`)

            cleanup()
        })
    })

    test("renders fontStyle prop", () => {
        render(
            <BetaIcon
                data={{ testid: testId }}
                fixedWidth
                fontStyle="fas"
                icon="user"
      />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("fa-user pb_icon_kit fa-fw fas")
    })

})
