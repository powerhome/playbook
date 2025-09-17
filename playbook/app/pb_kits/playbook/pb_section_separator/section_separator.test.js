import React from 'react'
import { render, screen } from '../utilities/test-utils'

import SectionSeparator from './_section_separator'

const testId = "section-separator-kit"

describe("Section Separator Kit", () => {
    test("renders basic section separator with default props", () => {
        render(
            <SectionSeparator
                data={{ testid: testId }}
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_section_separator_kit pb_section_separator_card pb_section_separator_horizontal pb_section_separator_solid pb_section_separator_color_default")
    })

    test("renders with text prop", () => {
        const text = "Section Title"
        render(
            <SectionSeparator
                data={{ testid: testId }}
                text={text}
            />
        )

        const kit = screen.getByTestId(testId)
        const textElement = screen.getByText(text)
        
        expect(kit).toHaveClass("pb_section_separator_kit")
        expect(textElement).toBeInTheDocument()
    })

    test("renders with children", () => {
        const childText = "Custom Content"
        render(
            <SectionSeparator
                data={{ testid: testId }}
            >
                <span>{childText}</span>
            </SectionSeparator>
        )

        const kit = screen.getByTestId(testId)
        const childElement = screen.getByText(childText)
        
        expect(kit).toHaveClass("pb_section_separator_kit")
        expect(childElement).toBeInTheDocument()
    })

    test("renders vertical orientation", () => {
        render(
            <SectionSeparator
                data={{ testid: testId }}
                orientation="vertical"
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_section_separator_kit pb_section_separator_card pb_section_separator_vertical pb_section_separator_solid pb_section_separator_color_default")
    })

    test("renders background variant", () => {
        render(
            <SectionSeparator
                data={{ testid: testId }}
                variant="background"
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_section_separator_kit pb_section_separator_background pb_section_separator_horizontal pb_section_separator_solid pb_section_separator_color_default")
    })

    test("renders dashed line style", () => {
        render(
            <SectionSeparator
                data={{ testid: testId }}
                lineStyle="dashed"
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_section_separator_kit pb_section_separator_card pb_section_separator_horizontal pb_section_separator_dashed pb_section_separator_color_default")
    })

    test("renders primary color", () => {
        render(
            <SectionSeparator
                color="primary"
                data={{ testid: testId }}
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_section_separator_kit pb_section_separator_card pb_section_separator_horizontal pb_section_separator_solid pb_section_separator_color_primary")
    })

    test("renders dark mode", () => {
        render(
            <SectionSeparator
                dark
                data={{ testid: testId }}
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_section_separator_kit pb_section_separator_card pb_section_separator_horizontal pb_section_separator_solid pb_section_separator_color_default")
    })

    test("renders with custom className", () => {
        const customClass = "custom-class"
        render(
            <SectionSeparator
                className={customClass}
                data={{ testid: testId }}
            />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_section_separator_kit pb_section_separator_card pb_section_separator_horizontal pb_section_separator_solid pb_section_separator_color_default custom-class")
    })

    test("renders vertical with children", () => {
        const childText = "Vertical Content"
        render(
            <SectionSeparator
                data={{ testid: testId }}
                orientation="vertical"
            >
                <span>{childText}</span>
            </SectionSeparator>
        )

        const kit = screen.getByTestId(testId)
        const childElement = screen.getByText(childText)
        
        expect(kit).toHaveClass("pb_section_separator_kit pb_section_separator_card pb_section_separator_vertical pb_section_separator_solid pb_section_separator_color_default")
        expect(childElement).toBeInTheDocument()
    })

    test("renders all props combined", () => {
        const text = "Combined Props"
        render(
            <SectionSeparator
                color="primary"
                dark
                data={{ testid: testId }}
                lineStyle="dashed"
                orientation="vertical"
                variant="background"
            >
                <span>{text}</span>
            </SectionSeparator>
        )

        const kit = screen.getByTestId(testId)
        const childElement = screen.getByText(text)
        
        expect(kit).toHaveClass("pb_section_separator_kit pb_section_separator_background pb_section_separator_vertical pb_section_separator_dashed pb_section_separator_color_primary")
        expect(childElement).toBeInTheDocument()
    })
})
