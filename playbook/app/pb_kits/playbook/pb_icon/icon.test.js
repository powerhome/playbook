import React from 'react'
import { render, screen, cleanup } from '../utilities/test-utils'

import Icon from './_icon'

const testId = "icon-kit"

describe("Icon Kit", () => {
    beforeEach(() => {
        delete window.PB_ICON_FA_FALLBACKS
        delete window.PB_ICON_FA_FALLBACK_DEBUG
    })

    test("renders Icon classname", () => {
        render(
            <Icon
                data={{ testid: testId }}
                fixedWidth
                icon="user"
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_custom_icon svg-inline--fa svg_fw")
    })

    test("renders rotate prop", () => {[
        "90", "180", "270"].forEach((rotateProp)=> {
        render(
            <Icon
                data={{ testid: testId }}
                fixedWidth
                icon="user"
                rotation={rotateProp}
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass(`pb_custom_icon svg-inline--fa rotate_${rotateProp} svg_fw`)

        cleanup()
    })
})

    test("renders flip prop", () => {
        render(
            <Icon
                data={{ testid: testId }}
                fixedWidth
                flip="horizontal"
                icon="user"
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_custom_icon svg-inline--fa flip_horizontal svg_fw")
    })


    test("renders spinning icon", () => {
        render(
            <Icon
                data={{ testid: testId }}
                fixedWidth
                icon="spinner"
                spin
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_custom_icon svg-inline--fa spin svg_fw")
    })

    test("renders pull icon", () => {
        render(
            <Icon
                data={{ testid: testId }}
                fixedWidth
                icon="arrow-left"
                pull="left"
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_custom_icon svg-inline--fa svg_fw pull_left")
    })

    test("renders pull icon", () => {
        render(
            <Icon
                data={{ testid: testId }}
                fixedWidth
                icon="arrow-left"
                pull="left"
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_custom_icon svg-inline--fa svg_fw pull_left")
    })

    test("renders border around icon", () => {
        render(
            <Icon
                border
                data={{ testid: testId }}
                fixedWidth
                icon="user"
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_custom_icon svg-inline--fa svg_border svg_fw")
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
                <Icon
                    data={{ testid: testId }}
                    icon="user"
                    size={sizeProp}
                />
            )
    
            const kit = screen.getByTestId(testId)
            expect(kit).toHaveClass(`pb_custom_icon svg-inline--fa svg_${sizeProp} svg_fw`)

            cleanup()
        }) 
    })

    test("renders fontStyle prop", () => {
        render(
            <Icon
                data={{ testid: testId }}
                fixedWidth
                fontStyle="fas"
                icon="user"
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_custom_icon svg-inline--fa svg_fw")
    })

    test("renders with color prop", () => {
        render(
            <Icon
                color="primary"
                data={{ testid: testId }}
                icon="user"
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("color_primary")
    })

    test("marks Font Awesome fallback icons for runtime auditing", () => {
        render(
            <Icon
                data={{ testid: testId }}
                icon="not-a-playbook-icon"
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveAttribute("data-pb-icon-fa-fallback", "true")
        expect(kit).toHaveAttribute("data-pb-icon-fa-fallback-icon", "not-a-playbook-icon")
        expect(window.PB_ICON_FA_FALLBACKS.icons["not-a-playbook-icon"]).toEqual(1)
        expect(window.PB_ICON_FA_FALLBACKS.entries).toContainEqual({
            icon: "not-a-playbook-icon",
            fontStyle: "far",
        })
    })

    test("groups duplicate Font Awesome fallback icons in the runtime collection", () => {
        render(
            <>
                <Icon icon="repeated-fallback-icon" />
                <Icon icon="repeated-fallback-icon" />
            </>
        )

        expect(window.PB_ICON_FA_FALLBACKS.icons["repeated-fallback-icon"]).toEqual(2)
    })

    test("emits a Font Awesome fallback event with the icon name and count", () => {
        const fallbackListener = jest.fn()
        window.addEventListener("pb:icon-fa-fallback", fallbackListener)

        render(<Icon icon="event-fallback-icon" />)

        expect(fallbackListener).toHaveBeenCalledWith(expect.objectContaining({
            detail: {
                icon: "event-fallback-icon",
                fontStyle: "far",
                count: 1,
            },
        }))

        window.removeEventListener("pb:icon-fa-fallback", fallbackListener)
    })

})
