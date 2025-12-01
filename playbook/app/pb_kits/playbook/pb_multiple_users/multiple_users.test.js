import React from 'react'
import { render, screen } from '../utilities/test-utils'

import MultipleUsers from './_multiple_users'

const testId = 'multipleUserId'

const MultipleUsersTest = () => {
  return (
      <>
          <MultipleUsers
              aria={{ label: testId }}
              className={'custom-class'}
              data={{ testid: testId }}
              users={[
                {
                  name: 'Patrick Welch',
                  imageUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
                },
                {
                  name: 'Lucille Sanchez',
                  imageUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
                },
              ]}
          />
      </>
  )
}

test('it loads the given images urls', () => {
    render(<MultipleUsersTest/>)

    const image1 = screen.getByAltText('Patrick Welch')
    const image2 = screen.getByAltText('Lucille Sanchez')

    expect(image1).toHaveAttribute('src', 'https://randomuser.me/api/portraits/men/9.jpg')
    expect(image2).toHaveAttribute('src', 'https://randomuser.me/api/portraits/women/6.jpg')
})

test('should render custom class and data', () => {
    render(<MultipleUsersTest/>)

    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('custom-class')
})

test('should render aria-label', () => {
  render(<MultipleUsersTest />)

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveAttribute('aria-label', testId)
})

test('should render withTooltip prop', () => {
  render(
      <MultipleUsers
          data-testid={testId}
          users={[
            {
              name: 'Patrick Welch',
              imageUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
              tooltip: "Patrick Welch - Online"
            },
            {
              name: 'Lucille Sanchez',
              imageUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
              tooltip: "Lucille Sanchez - Offline"
            },
          ]}
          withTooltip
      />
  )

  const kit = screen.getByTestId(testId)
  const childWithTooltip = kit.querySelector('.pb_tooltip_kit')
  expect(childWithTooltip).not.toBeNull()
})