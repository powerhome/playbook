import React from 'react'
import { render, screen } from '../utilities/test-utils'

import { Lightbox } from '../'

const testId = 'customId',
  kitClass = 'pb_lightbox_kit'

test('Lightbox Test', () => {
  render(
    <Lightbox
        className="customClass"
        data={{ testid: testId }}
        icon="close"
        iconSize="3x"
        id="test1"
        initialPhoto="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        onClose={() => {}}
        photos={[
        'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      ]}
    />
  )
  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} customClass`)
  expect(kit).toBeInTheDocument()
})
