import React from 'react'
import { render, screen } from '../utilities/test-utils'

import ProgressPills from './_progress_pills'

const testId = 'progressPills'
const className = 'custom-class-name'
const ariaLabel = '2 out of 3 steps complete'
const title = 'Status:'
const value = 'Orientation'

const ProgressPillsDefault = () => {
    return (
        <ProgressPills
            active={2}
            aria={{ label: ariaLabel }}
            className={className}
            data={{ testid: testId }}
            steps={3}
            title={title}
            value={value}
        />
    )
}

const ProgressPillsFullWidth = () => {
    return (
        <ProgressPills
            active={2}
            aria={{ label: ariaLabel }}
            data={{ testid: testId }}
            fullWidthPill
            steps={3}
            title={title}
            value={value}
        />
    )
}

test('should pass data prop', () => {
    render(<ProgressPillsDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toBeInTheDocument()
})

test('should pass className prop', () => {
    render(<ProgressPillsDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(className)
})

test('should pass aria prop', () => {
    render(<ProgressPillsDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveAttribute('aria-label', ariaLabel)
})

test('should render title', () => {
    render(<ProgressPillsDefault />)
    const kit = screen.getByText(title)
    expect(kit).toBeInTheDocument()
})

test('should render value', () => {
    render(<ProgressPillsDefault />)
    const kit = screen.getByText(value)
    expect(kit).toBeInTheDocument()
})

test('should apply fullWidthPill styling when fullWidthPill prop is true', () => {
    render(<ProgressPillsFullWidth />)
    const container = screen.getByTestId(testId)
    const pillElements = container.querySelectorAll('.full_width_pill')
  
    expect(pillElements.length).toBeGreaterThan(0)
    pillElements.forEach((pill) => {
        expect(pill).toHaveClass('full_width_pill')
    })
})
