
import React from 'react'
import { appendAlert, fireEvent, render, screen, waitFor } from '../utilities/test-utils'

import CircleIconButton from './_circle_icon_button'

test('default test', () => {
  render(
    <CircleIconButton
        data={{ testid: 'default-test' }}
        icon="plus"
    />
  )

  const kit = screen.getByTestId('default-test')

  expect(kit).toHaveClass('pb_circle_icon_button_kit')
})

// test('click event', async () => {
//   render(
//     <CircleIconButton
//         data={{ testid: 'click-test' }}
//         onClick={() => appendAlert('clicked button!')}
//     />
//   )

//   const kit = screen.getByTestId('click-test')

//   fireEvent.click(kit)

//   await waitFor(() => screen.getByText('clicked button!'))

//   expect(screen.getByText('clicked button!')).toBeInTheDocument()
// })
