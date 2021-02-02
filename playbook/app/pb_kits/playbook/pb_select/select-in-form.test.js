import React, { useState } from 'react'
import { render, screen } from '../utilities/test-utils'
import userEvent from '@testing-library/user-event'

import Select from './_select'

const testId = 'select1'

const SelectInForm = () => {
  const [ showError, setShowError ] = useState(false)

  return (
    <div>
      <Select
          data={{ testid: testId }}
          error={showError ? 'Error' : null}
          label="Favorite Food"
          name="food"
          options={[]}
      />
      <button onClick={() => setShowError(!showError)} />
    </div>
  )
}

test('does not break when error is toggled', () => {
  render(<SelectInForm />)

  const button = screen.getByRole('button')
  userEvent.click(button)

  throw 'I was expeting the click to break the test but it\'s not breaking'
})
