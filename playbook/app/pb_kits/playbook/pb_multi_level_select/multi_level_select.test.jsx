import React from 'react'
import { render, screen } from '../utilities/test-utils'

import { MultiLevelSelect } from '../'

const treeData = {
  label: 'search me',
  value: 'searchme',
  children: [
    {
      label: 'search me too',
      value: 'searchmetoo',
      children: [
        {
          label: 'No one can get me',
          value: 'anonymous',
        },
      ],
    },
  ],
}

const testId = "multiselect-test"
test('should render custom class', () => {
  render(
      <MultiLevelSelect
          className='custom-class'
          data={{ testid: testId}}
          treeData={treeData}
      /> 
  ) 

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('custom-class')
})

