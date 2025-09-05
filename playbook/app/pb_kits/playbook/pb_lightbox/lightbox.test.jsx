import React from 'react'
import { cleanup, fireEvent, render, screen } from '../utilities/test-utils'

import { Lightbox } from 'playbook-ui'

const testId = 'customId',
  kitClass = 'pb_lightbox_kit',
  TEST_PHOTOS = [
    'https://images.unsplash.com/photo-1638727228877-d2a79ab75e68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2668&q=80',
    'https://images.unsplash.com/photo-1526657782461-9fe13402a841?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1984&q=80',
    'https://images.unsplash.com/photo-1523057530100-383d7fbc77a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80',
  ]

test('Kit renders', () => {
  render(
    <Lightbox
        className="customClass"
        data={{ testid: testId }}
        icon="close"
        id="test1"
        initialPhoto={1}
        onClose={() => {}}
        photos={TEST_PHOTOS}
    />
  )
  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} customClass`)
  expect(kit).toBeInTheDocument()
  cleanup()
})

test('Shows selected images', () => {
  render(
    <Lightbox
        data={{ testid: testId }}
        icon="close"
        id="test1"
        initialPhoto={1}
        onClose={() => {}}
        photos={TEST_PHOTOS}
    />
  )
  const kit = screen.getByTestId(testId)
  const slide = kit.getElementsByClassName('Slide')[0]
  const image = slide.getElementsByTagName('img')[0]
  expect(image).toHaveAttribute('src', TEST_PHOTOS[1])

  const thumbnails = kit.getElementsByClassName('Thumbnail')

  fireEvent(
    thumbnails[2],
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )

  expect(image).toHaveAttribute('src', TEST_PHOTOS[2])

  fireEvent(
    thumbnails[0],
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )

  expect(image).toHaveAttribute('src', TEST_PHOTOS[0])
  cleanup()
})

test('Closes on escape key', async () => {
  const mockClose = jest.fn()

  render(
    <Lightbox
        data={{ testid: testId }}
        icon="close"
        id="test1"
        initialPhoto={0}
        onClose={mockClose}
        photos={TEST_PHOTOS}
    />
  )

  fireEvent.keyDown(
    global.window,
    {
      bubbles: true,
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27
    }
  )

  expect(mockClose).toHaveBeenCalled()
  cleanup()
})

test('Closes on close button', async () => {
  const mockClose = jest.fn()

  render(
    <Lightbox
        data={{ testid: testId }}
        icon="close"
        id="test1"
        initialPhoto={0}
        onClose={mockClose}
        photos={TEST_PHOTOS}
    />
  )

  const kit = screen.getByTestId(testId)
  const closeIcon = kit.querySelector('.pb_button_kit.pb_button_link.pb_button_inline.pb_button_enabled')

  fireEvent(
    closeIcon,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )

  expect(mockClose).toHaveBeenCalled()
  cleanup()
})
