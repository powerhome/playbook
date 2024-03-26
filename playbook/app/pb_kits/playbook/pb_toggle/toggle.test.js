import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Toggle from './_toggle'

const testId = 'toggle'
const className = 'custom-class-name'

const ToggleDefault = (props) => (
    <>
        <Toggle
            aria={{ label: testId }}
            className={className}
            data={{ testid: testId }}
            id={testId}
            {...props}
        />
    </>
)

test('should pass data prop', () => {
    render(<ToggleDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toBeInTheDocument()
})

test('should pass className prop', () => {
    render(<ToggleDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(className)
})

test('should pass aria prop', () => {
    render(<ToggleDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveAttribute('aria-label', testId)
})

test('should pass id prop', () => {
    render(<ToggleDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveProperty('id', testId)
})

test('should not be checked by default', () => {
    render(<ToggleDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('pb_toggle_kit_sm_off')
})

test('should pass checked prop', () => {
    render(<ToggleDefault checked />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('pb_toggle_kit_sm_on')
})

test('should have sm size by default', () => {
    render(<ToggleDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('pb_toggle_kit_sm_off')
})

test('should pass disabled prop', () => {
    render(<ToggleDefault disabled />)
    const kit = screen.getByTestId(testId)
    const input = kit.querySelector('input')
    expect(input).toHaveAttribute('disabled')
})  

test('should pass size prop', () => {
    render(<ToggleDefault size='md' />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('pb_toggle_kit_md_off')
})
