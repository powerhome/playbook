import React from 'react'

import { render, screen } from '../utilities/test-utils'
import { GradientOverlay } from '../'

const testId = "gradient-overlay"
const children = "This is the Gradient Overlay children"

test('should pass data prop', () => {
    const props = {
        children,
        data: { testid: testId }
    }

    render(<GradientOverlay {...props} />)
    const kit = screen.getByTestId(testId)
    expect(kit).toBeInTheDocument()
})

test("should pass className prop", () => {
    const className = "custom-class-name"
    const props = {
        className,
        children,
        data: { testid: testId },
    }

    render(<GradientOverlay {...props} />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(className)
})

test('should pass aria prop', () => {
    const props = {
        aria: { label: testId },
        children,
        data: { testid: testId },
    }

    render(<GradientOverlay {...props} />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveAttribute('aria-label', testId)
})

test('should pass id prop', () => {
    const props = {
        children,
        data: { testid: testId },
        id: testId
    }

    render(<GradientOverlay {...props} />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveAttribute('id', testId)
})

test('should render children', () => {
    const props = {
        children,
        data: { testid: testId }
    }

    render(<GradientOverlay {...props} />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveTextContent(props.children)
})
