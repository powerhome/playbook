import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Avatar from './_avatar'

const imageUrl = 'https://randomuser.me/api/portraits/men/44.jpg',
  testId = 'tjohnson',
  name = 'Terry Johnson',
  imageAlt = 'Terry Johnson Standing'

test('loads the given image url and name', () => {
  render(
    <Avatar
        data={{ testid: testId }}
        imageAlt={imageAlt}
        imageUrl={imageUrl}
        name={name}
    />
  )

  const kit      = screen.getByTestId(testId)
  const image    = screen.getByAltText(imageAlt)
  const initials = name.split(/\s/)[0].substr(0, 1) + name.split(/\s/)[1].substr(0, 1)

  expect(kit).toHaveClass('pb_avatar_kit_size_md')
  expect(kit).toHaveAttribute('data-initials', initials)
  expect(image).toHaveAttribute('data-src', imageUrl)
  expect(image).toHaveAttribute('src', imageUrl)
  expect(image).toHaveAttribute('alt', imageAlt)
})
