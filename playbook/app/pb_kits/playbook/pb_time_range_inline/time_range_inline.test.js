import React from 'react'
import { render, screen } from '../utilities/test-utils'

import TimeRangeInline from './_time_range_inline'

const testId = 'timeRangeInline'
const className = 'custom-class-name'

const TimeRangeInlineDefault = (props) => (
    <>
        <TimeRangeInline
            aria={{ label: testId }}
            className={className}
            data={{ testid: testId }}
            endTime="2012-08-02T17:49:29Z"
            icon="true"
            id={testId}
            size="sm"
            startTime="2012-08-02T15:49:29Z"
            timezone="true"
            {...props}
        />
    </>
)

test('should pass data prop', () => {
    render(<TimeRangeInlineDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toBeInTheDocument()
})

test('should pass className prop', () => {
    render(<TimeRangeInlineDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(className)
})

test('should pass aria prop', () => {
    render(<TimeRangeInlineDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveAttribute('aria-label', testId)
})

test('should pass id prop', () => {
    render(<TimeRangeInlineDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveProperty('id', testId)
})

test('should have left alignment by default', () => {
    render(<TimeRangeInlineDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('pb_time_range_inline_kit_left')
})

test('should pass alignment prop', () => {
    render(<TimeRangeInlineDefault alignment="right" />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('pb_time_range_inline_kit_right')
})

test('should have icon', () => {
    render(<TimeRangeInlineDefault />)
    const kit = screen.getByTestId(testId)
    const icon = kit.querySelector('.pb_time_range_inline_icon')
    expect(icon).toBeInTheDocument()
})

test('should have timezone', () => {
    render(<TimeRangeInlineDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit.querySelector('.pb_time_range_inline_timezone')).toBeInTheDocument()
})

test('should render startTime', () => {
    render(<TimeRangeInlineDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveTextContent('11:49a')
})

test('should render endTime', () => {
    render(<TimeRangeInlineDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveTextContent('1:49p')
})
