import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Image from './_image'

const alt = 'picture of misty forest',
  size = null,
  testId = 'avatar',
  url = 'https://unsplash.it/500/400/?image=634'

test('loads the given image url', () => {
  render(
    <Image
        alt={alt}
        data={{ testid: testId }}
        size={size}
        url={url}
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveAttribute('alt', alt)
  expect(kit).toHaveClass('pb_image_kit lazyload blur_up')
})
