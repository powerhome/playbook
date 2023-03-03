import React from 'react'
import { render, screen } from '../utilities/test-utils'

import { MultiLevelSelect } from '../'

const treeData = {
  label: 'search me',
  value: 'searchme',
  id:'default1',
  children: [
    {
      label: 'search me too',
      value: 'searchmetoo',
      id:'default2',
      children: [
        {
          label: 'No one can get me',
          value: 'anonymous',
          id:'default2',
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
          onSelect={()=> console.log("hello")}
          treeData={treeData}
      /> 
  ) 

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('custom-class')
})

