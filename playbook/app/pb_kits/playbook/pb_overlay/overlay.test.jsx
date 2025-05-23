import React from 'react'

import { render, screen } from '../utilities/test-utils'
import { Overlay } from 'playbook-ui'

const testId = "overlay"
const children = "This is the Overlay children"

test('should pass data prop', () => {
    const props = {
        children,
        data: { testid: testId }
    }

    render(<Overlay {...props} />)
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

    render(<Overlay {...props} />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(className)
})

test('should pass aria prop', () => {
    const props = {
        aria: { label: testId },
        children,
        data: { testid: testId },
    }

    render(<Overlay {...props} />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveAttribute('aria-label', testId)
})

test('should pass id prop', () => {
    const props = {
        children,
        data: { testid: testId },
        id: testId
    }

    render(<Overlay {...props} />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveAttribute('id', testId)
})

test('should render children', () => {
    const props = {
        children,
        data: { testid: testId }
    }

    render(<Overlay {...props} />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveTextContent(props.children)
})

test('should add overlay-hide-scrollbar class when scrollBarNone is true', () => {
    const props = {
      children,
      data: { testid: testId },
      scrollBarNone: true
    }

    render(<Overlay {...props} />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('overlay-hide-scrollbar')
})

test('should have no_gradient class if gradient prop is false', () => {
    const props = {
        children,
        data: { testid: testId },
        id: testId,
        gradient: false
    }

    render(<Overlay {...props} />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('no_gradient')
})

test('should not have no_gradient class if gradient is not passed', () => {
    const props = {
        children,
        data: { testid: testId },
        id: testId
    }

    render(<Overlay {...props} />)
    const kit = screen.getByTestId(testId)
    expect(kit).not.toHaveClass('no_gradient')
})

test('should have the correct opacity class if opacity prop is passed', () => {
    const props = {
        children,
        data: { testid: testId },
        id: testId,
        opacity: "opacity_5"
    }

    render(<Overlay {...props} />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('opacity_5')
})
