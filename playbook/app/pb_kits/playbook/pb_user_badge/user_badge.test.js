import React from 'react'
import { render, screen } from '../utilities/test-utils'

import UserBadge from './_user_badge'

const testId = 'userBadge'
const className = 'custom-class-name'

const UserBadgeDefault = (props) => (
    <>
        <UserBadge
            aria={{ label: testId }}
            className={className}
            data={{ testid: testId }}
            id={testId}
            {...props}
        />
    </>
)

test('should pass data prop', () => {
    render(<UserBadgeDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toBeInTheDocument()
})

test('should pass className prop', () => {
    render(<UserBadgeDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(className)
})

test('should pass aria prop', () => {
    render(<UserBadgeDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveAttribute('aria-label', testId)
})

test('should pass id prop', () => {
    render(<UserBadgeDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveProperty('id', testId)
})

test('should be million-dollar badge by default', () => {
    render(<UserBadgeDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toContainHTML('<circle cx="121.5" cy="121.5" r="121.5" />')
})

test('should pass badge prop', () => {
    render(<UserBadgeDefault badge="veteran" />)
    const kit = screen.getByTestId(testId)
    expect(kit).not.toContainHTML('<circle cx="121.5" cy="121.5" r="121.5" />')
})

test('should be md size by default', () => {
    render(<UserBadgeDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('pb_user_badge_kit_md')
})

test('should pass size prop', () => {
    render(<UserBadgeDefault size="sm" />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('pb_user_badge_kit_sm')
})
