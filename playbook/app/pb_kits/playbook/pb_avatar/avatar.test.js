import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { Avatar } from '../'

const imageUrl = 'https://randomuser.me/api/portraits/men/44.jpg',
testId = 'tjohnson',
name = 'Terry Johnson'

test('test avatar', () => {
  render(
    <Avatar
        data={{testid: testId}}
        imageUrl={imageUrl}
        name={name}
    />
  )

  const element = screen.getByAltText(name)

  expect(element).toHaveAttribute('data-src', imageUrl)
  expect(element).toHaveAttribute('src', imageUrl)
})
