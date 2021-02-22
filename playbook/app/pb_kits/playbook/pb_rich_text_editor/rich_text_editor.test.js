import React from 'react'
import { render, screen } from '../utilities/test-utils'

import RichTextEditor from './_rich_text_editor'

const testId = 'richtext-input1',
  kitClass = 'pb_rich_text_editor_kit'

test('returns namespaced class name', () => {
  render(
    <RichTextEditor data={{ testid: testId }} />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(kitClass)
})

test('returns "Simple" namespaced class name via prop', () => {
  render(
    <RichTextEditor
        data={{ testid: testId }}
        simple
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} simple`)
})

test('returns "Focus" namespaced class name via prop', () => {
  render(
    <RichTextEditor
        data={{ testid: testId }}
        focus
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} focus-editor-targets`)
})

test('returns "Sticky" namespaced class name via prop', () => {
  render(
    <RichTextEditor
        data={{ testid: testId }}
        sticky
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} sticky`)
})

test('returns "Dark" class name', () => {
  render(
    <RichTextEditor
        dark
        data={{ testid: testId }}
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} dark`)
})
