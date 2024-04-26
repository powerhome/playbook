import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Source from './_source'

const testId = 'source'
const className = 'custom-class-name'

const SourceDefault = (props) => (
    <>
        <Source
            aria={{ label: testId }}
            className={className}
            data={{ testid: testId }}
            source="BJ's Johnston-208"
            type='retail'
            {...props}
        />
    </>
)

test('should pass data prop', () => {
    render(<SourceDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toBeInTheDocument()
})

test('should pass className prop', () => {
    render(<SourceDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(className)
})

test('should pass aria prop', () => {
    render(<SourceDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveAttribute('aria-label', testId)
})

test('should pass type prop', () => {
    render(<SourceDefault />)
    const kit = screen.getByText('Retail')
    expect(kit).toBeInTheDocument()
})

test('should pass source prop', () => {
    render(<SourceDefault />)
    const kit = screen.getByText("BJ's Johnston-208")
    expect(kit).toBeInTheDocument()
})

test('should not hide icon by default', () => {
    render(<SourceDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit.querySelector('.pb_icon_circle_kit_size_sm_default')).toBeTruthy()
})

test('should hide icon', () => {
    render(<SourceDefault hideIcon />)
    const kit = screen.getByTestId(testId)
    expect(kit.querySelector('.pb_icon_circle_kit_size_sm_default')).toBeFalsy()
})

test('should pass user prop', () => {
    const user = {
        name: 'Anna Black',
        userId: '48582',
    }
    
    render(
        <SourceDefault
            type='user'
            user={user}
        />
    )

    let kit = screen.getByText(user.name)
    expect(kit).toBeInTheDocument()

    kit = screen.getByText(user.userId)
    expect(kit).toBeInTheDocument()
})
