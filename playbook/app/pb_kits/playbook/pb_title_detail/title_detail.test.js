import React from 'react'
import { render, screen } from '../utilities/test-utils'

import TitleDetail from './_title_detail'

const testId = 'titleDetail'
const className = 'custom-class-name'
const detail = 'Commits data and history'
const title = 'Email Notifications'

const TitleDetailDefault = (props) => (
    <>
        <TitleDetail
            aria={{ label: testId }}
            className={className}
            data={{ testid: testId }}
            detail={detail}
            id={testId}
            title={title}
            {...props}
        />
    </>
)

test('should pass data prop', () => {
    render(<TitleDetailDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toBeInTheDocument()
})

test('should pass className prop', () => {
    render(<TitleDetailDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(className)
})

test('should pass aria prop', () => {
    render(<TitleDetailDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveAttribute('aria-label', testId)
})

test('should pass id prop', () => {
    render(<TitleDetailDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveProperty('id', testId)
})

test('should have left align by default', () => {
    render(<TitleDetailDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('pb_title_detail_kit_left')
})

test('should pass align prop', () => {
    render(<TitleDetailDefault align="right" />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('pb_title_detail_kit_right')
})

test('should render detail', () => {
    render(<TitleDetailDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveTextContent(detail)
})

test('should render title', () => {
    render(<TitleDetailDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveTextContent(title)
})
