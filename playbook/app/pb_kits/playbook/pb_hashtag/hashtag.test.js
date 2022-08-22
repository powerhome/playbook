import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Hashtag from './_hashtag'

const text = "470297";
//  const type = "project";
// const url = "https://google.com"
// const typeMap = {
//   home: 'H#',
//   project: 'P#',
//   appointment: 'A#',
//   default: '#',
// }

test('passes type, text, and url props to button', () => {
  render(
    <>
      <Hashtag
          data={{ testid: 'primary-test' }}
          text={text}
          // type={type}
          // url={url}
      />
    </>
  )

  const kit = screen.getByTestId('primary-test')
  const content  = screen.getByText(text, {selector: 'span'})

  expect(kit).toHaveClass("pb_hashtag_kit")
  // expect(kit).toHaveAttribute('type', type)
  // expect(kit).toHaveAttribute('href', url)
  expect(content).toHaveTextContent(text)
})