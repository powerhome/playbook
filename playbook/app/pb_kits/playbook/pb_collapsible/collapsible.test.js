import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Collapsible from './_collapsible'

beforeEach(() => {
  // Silences error logs within the test suite.
  jest.spyOn(console, 'error')
  // eslint-disable-next-line
  console.error.mockImplementation(() => {})
})

afterEach(() => {
  // eslint-disable-next-line
  console.error.mockRestore()
})

const testId = 'collapsible1',
  kitClass = 'pb_collapsible_kit'

test('throws error if incorrect # of children', () => {
  expect(() => {
    render(
      <Collapsible />
    )
  }).toThrow()
})

test('returns namespaced additional_class class name', () => {
  render(
    <Collapsible
        className="additional_class"
        data={{ testid: testId }}
    >
      <Collapsible.Main>
        <div>{'Main Section'}</div>
      </Collapsible.Main>
      <Collapsible.Content>
        <div>
          {
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel erat sed purus hendrerit viverra. Duis et vestibulum metus. Sed consequat ut ante non vehicula. Etiam nunc massa, pharetra vel quam id, posuere rhoncus quam. Quisque imperdiet arcu enim, nec aliquet justo auctor eget. Curabitur in metus nec nunc rhoncus faucibus vitae ac elit. Nulla facilisi. Vestibulum quis pretium nulla. Nulla ut accumsan velit. Duis varius urna sed sem tempor, sit amet fermentum nibh auctor. Praesent lorem arcu, egestas non ante quis, placerat pellentesque lectus.Vestibulum lacinia ipsum quis venenatis tristique. Vivamus suscipit, libero eu fringilla egestas, orci urna commodo arcu, vel gravida turpis ipsum molestie nibh. Donec cursus eu ante sagittis ultrices. Phasellus id sagittis risus. Mauris dapibus neque faucibus, tempor ligula vel, cursus ante. Donec faucibus gravida porta. Nullam egestas est quis aliquam feugiat. Sed eget metus diam. Cras eget placerat libero.'
          }
        </div>
      </Collapsible.Content>
    </Collapsible>
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} additional_class`)
})

test('html structure is correct', () => {
  const { container } = render(
    <Collapsible
        className="additional_class"
        data={{ testid: testId }}
        iconColor='lighter'
        iconSize="lg"
    >
      <Collapsible.Main>
        <div>{'Main Section'}</div>
      </Collapsible.Main>
      <Collapsible.Content>
        <div>
          {
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel erat sed purus hendrerit viverra. Duis et vestibulum metus. Sed consequat ut ante non vehicula. Etiam nunc massa, pharetra vel quam id, posuere rhoncus quam. Quisque imperdiet arcu enim, nec aliquet justo auctor eget. Curabitur in metus nec nunc rhoncus faucibus vitae ac elit. Nulla facilisi. Vestibulum quis pretium nulla. Nulla ut accumsan velit. Duis varius urna sed sem tempor, sit amet fermentum nibh auctor. Praesent lorem arcu, egestas non ante quis, placerat pellentesque lectus.Vestibulum lacinia ipsum quis venenatis tristique. Vivamus suscipit, libero eu fringilla egestas, orci urna commodo arcu, vel gravida turpis ipsum molestie nibh. Donec cursus eu ante sagittis ultrices. Phasellus id sagittis risus. Mauris dapibus neque faucibus, tempor ligula vel, cursus ante. Donec faucibus gravida porta. Nullam egestas est quis aliquam feugiat. Sed eget metus diam. Cras eget placerat libero.'
          }
        </div>
      </Collapsible.Content>
    </Collapsible>
  )

  expect(container).toMatchSnapshot()
})

const clickCollapsibleMain = () => {
  screen.getByText('Main Section').click()
}

test('calls onClick once per click', () => {
  const handleClick = jest.fn()
  render(
    <Collapsible onClick={handleClick}>
      <Collapsible.Main>
        <div>{'Main Section'}</div>
      </Collapsible.Main>
      <Collapsible.Content>
        <div>{'Content'}</div>
      </Collapsible.Content>
    </Collapsible>
  )

  clickCollapsibleMain()

  expect(handleClick).toHaveBeenCalledTimes(1)
})

test('toggles by default when onClick is omitted', () => {
  const { container } = render(
    <Collapsible>
      <Collapsible.Main>
        <div>{'Main Section'}</div>
      </Collapsible.Main>
      <Collapsible.Content>
        <div>{'Content'}</div>
      </Collapsible.Content>
    </Collapsible>
  )

  expect(container.querySelector('[aria-label="chevron-down icon"]')).toBeInTheDocument()

  clickCollapsibleMain()

  expect(container.querySelector('[aria-label="chevron-up icon"]')).toBeInTheDocument()
})

test('toggles when onClick does not return true', () => {
  const handleClick = jest.fn()
  const { container } = render(
    <Collapsible onClick={handleClick}>
      <Collapsible.Main>
        <div>{'Main Section'}</div>
      </Collapsible.Main>
      <Collapsible.Content>
        <div>{'Content'}</div>
      </Collapsible.Content>
    </Collapsible>
  )

  clickCollapsibleMain()

  expect(handleClick).toHaveBeenCalledTimes(1)
  expect(container.querySelector('[aria-label="chevron-up icon"]')).toBeInTheDocument()
})

test('does not toggle when onClick returns true', () => {
  const handleClick = jest.fn(() => true)
  const { container } = render(
    <Collapsible onClick={handleClick}>
      <Collapsible.Main>
        <div>{'Main Section'}</div>
      </Collapsible.Main>
      <Collapsible.Content>
        <div>{'Content'}</div>
      </Collapsible.Content>
    </Collapsible>
  )

  clickCollapsibleMain()

  expect(handleClick).toHaveBeenCalledTimes(1)
  expect(container.querySelector('[aria-label="chevron-down icon"]')).toBeInTheDocument()
  expect(container.querySelector('[aria-label="chevron-up icon"]')).not.toBeInTheDocument()
})
