import React from 'react'
import { render, screen } from '../utilities/test-utils'
import LoadingInline from './_loading_inline'

const testId = "loadingInline"

test('should render custom class and data', () => {
    render(
        <LoadingInline
            className='custom-class'
            data={{ testid: testId }}
        />
    )

    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('custom-class')
})

test('should render id', () => {
    render(
        <LoadingInline
            data={{ testid: testId }}
            id={testId}
        />
    )

    const kit = screen.getByTestId(testId)
    expect(kit).toHaveProperty('id', testId)
})

test('should render aria-label', () => {
    render(
        <LoadingInline
            aria={{ label: testId }}
            data={{ testid: testId }}
        />
    )

    const kit = screen.getByTestId(testId)
    expect(kit).toHaveAttribute('aria-label', testId)
})


test('displays custom text content', () => {
    render(
        <LoadingInline
            aria={{ label: testId }}
            data={{ testid: testId }}
            text=' Saving'
        />
    )
  
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveTextContent('Saving')
})
