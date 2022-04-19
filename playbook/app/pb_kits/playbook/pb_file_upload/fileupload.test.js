import React from 'react'
import { render, screen } from '../utilities/test-utils'

import FileUpload from './_file_upload'

const testid = 'fileupload-test'

test('returns namespaced class name', () => {
  render(
    <FileUpload
        data={{ testid: testid }}
    />
  )

  const kit = screen.getByTestId(testid)
  expect(kit).toHaveClass('pb_file_upload_kit')
})

test('shows default drag text', () => {
  render(
    <FileUpload
        data={{ testid: testid }}
    />
  )

  const kit = screen.getByTestId(testid)
  expect(kit).toHaveTextContent('Choose a file or drag it here')
})

test('shows type-specific drag text', () => {
  render(
    <FileUpload
        accept={['image/svg+xml']}
        data={{ testid: testid }}
    />
  )

  const kit = screen.getByTestId(testid)
  expect(kit).toHaveTextContent('Choose a file or drag it here. The accepted file types are: svg+xml')
})
