import React from 'react'
import { fireEvent, render, screen, waitForElementToBeRemoved } from '../utilities/test-utils'

import { Lightbox } from '../'

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
        iconSize="3x"
        id="test1"
        initialPhoto={1}
        onClose={() => {}}
        photos={TEST_PHOTOS}
    />
  )
  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} customClass`)
  expect(kit).toBeInTheDocument()
})

test('Shows selected images', () => {
  render(
    <Lightbox
        data={{ testid: testId }}
        icon="close"
        iconSize="3x"
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
})

test('Closes on escape key', async () => {
  render(
    <Lightbox
        data={{ testid: testId }}
        icon="close"
        iconSize="3x"
        id="test1"
        initialPhoto={0}
        onClose={() => {}}
        photos={TEST_PHOTOS}
    />
  )

  const kit = screen.getByTestId(testId)

  fireEvent(
    document.body,
    new KeyboardEvent('keydown', {
      keyCode: 27, //escape
    })
  )

  waitForElementToBeRemoved(kit)
    .then(() => expect(kit).not.toBeInTheDocument())
})

test('Closes on close button', () => {
  render(
    <Lightbox
        data={{ testid: testId }}
        icon="close"
        iconSize="3x"
        id="test1"
        initialPhoto={0}
        onClose={() => {}}
        photos={TEST_PHOTOS}
    />
  )

  const kit = screen.getByTestId(testId)
  const closeIcon = kit.getElementsByClassName('close-icon')[0]

  fireEvent(
    closeIcon,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )

  waitForElementToBeRemoved(kit)
    .then(() => expect(kit).not.toBeInTheDocument())
})
