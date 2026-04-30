import React from 'react'
import { render, screen, cleanup } from '../utilities/test-utils'

import Icon from './_icon'
import { resetPlaybookIconResolverCache } from '../utilities/icons/playbookIconResolver'

const testId = "icon-kit"
const originalPBIcons = window.PB_ICONS
const originalGetComputedStyle = window.getComputedStyle

const mockPlaybookIconsStyles = () => {
    window.getComputedStyle = jest.fn((element, pseudoElement) => {
        if (pseudoElement === "::before" && element?.className?.includes("playbook-user")) {
            return {
                getPropertyValue: (property) => {
                    if (property === "content") return '" "'
                    if (property === "mask-image" || property === "-webkit-mask-image") return "url(mock-user)"
                    return ""
                },
            }
        }

        if (pseudoElement === "::before" && element?.className?.includes("playbook-house")) {
            return {
                getPropertyValue: (property) => {
                    if (property === "content") return '" "'
                    if (property === "mask-image" || property === "-webkit-mask-image") return "url(mock-house)"
                    return ""
                },
            }
        }

        return originalGetComputedStyle(element, pseudoElement)
    })
}

describe("Icon Kit", () => {
    afterEach(() => {
        window.PB_ICONS = originalPBIcons
        window.getComputedStyle = originalGetComputedStyle
        resetPlaybookIconResolverCache()
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

    test("renders playbook string icons without window.PB_ICONS", () => {
        window.PB_ICONS = {}
        mockPlaybookIconsStyles()

        render(
            <Icon
                data={{ testid: testId }}
                fixedWidth
                icon="user"
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit.tagName.toLowerCase()).toBe("i")
        expect(kit).toHaveClass("pb_custom_icon svg-inline--fa svg_fw pb_playbook_icon playbook-user")
    })

    test("resolves aliased playbook icons without window.PB_ICONS", () => {
        window.PB_ICONS = {}
        mockPlaybookIconsStyles()

        render(
            <Icon
                data={{ testid: testId }}
                fixedWidth
                icon="home"
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit.tagName.toLowerCase()).toBe("i")
        expect(kit).toHaveClass("pb_custom_icon svg-inline--fa svg_fw pb_playbook_icon playbook-house")
    })

})
