import React from 'react'
import { render, screen } from '../utilities/test-utils'

import MultipleUsers from './_multiple_users'

test('it loads the given images urls', () => {
    render(
      <MultipleUsers
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
    )
    const image1 = screen.getByAltText('Patrick Welch')
    const image2 = screen.getByAltText('Lucille Sanchez')

    expect(image1).toHaveAttribute('src', 'https://randomuser.me/api/portraits/men/9.jpg')
    expect(image2).toHaveAttribute('src', 'https://randomuser.me/api/portraits/women/6.jpg')
})