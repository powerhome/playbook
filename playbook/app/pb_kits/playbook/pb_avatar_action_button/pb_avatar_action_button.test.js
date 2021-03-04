import React from 'react'
import { render, screen } from '../utilities/test-utils'

import AvatarActionButton from './_avatar_action_button'

const imageUrl = 'https://randomuser.me/api/portraits/women/8.jpg',
  testId = 'scarden',
  name = 'Sophia Carden',
  imageAlt = 'Sophia Carden Profile'

test('loads the given image url and name', () => {
  render(
    <AvatarActionButton
        data={{ testid: testId }}
        imageAlt={imageAlt}
        imageUrl={imageUrl}
        name={name}
    />
  )

  const kit      = screen.getByTestId(testId)
  const image    = screen.getByAltText(imageAlt)

  expect(kit).toHaveClass('pb_avatar_action_button_kit_add_bottom_left_md')
  expect(image).toHaveAttribute('data-src', imageUrl)
  expect(image).toHaveAttribute('src', imageUrl)
  expect(image).toHaveAttribute('alt', imageAlt)
})
