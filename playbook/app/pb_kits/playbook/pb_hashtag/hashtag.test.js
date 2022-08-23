import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Hashtag from './_hashtag'

// it should accept the test, type and url props///

const text = "470297";
 const type = "project";
const url = "https://google.com"
const typeMap = {
  home: 'H#',
  project: 'P#',
  appointment: 'A#',
  default: '#',
}
const { container } = render(<Hashtag />)
container.querySelector(".pb_hashtag_kit")

test('passes type, text, and url props to hashtag', () => {
  render(
    <>
      <Hashtag
          data={{ testid: 'primary-test' }}
          text={text}
          type={type}
          url={url}
      />
    </>
  )

  const kit = screen.getByTestId('primary-test')
  // const kithref = screen.getByTestId('primary-test')
  const content  = screen.getByText(typeMap[type] + text)
  expect(kit).toHaveClass("pb_hashtag_kit")
  expect(content).toHaveTextContent(typeMap[type] + text)
  // expect(container).toBeInTheDocument(url)
  expect(content).toHaveAttribute('href',url)
})

// if newWindow = true is passed in as a prop, then the anchor tag should have attribute target=_blank, otherwise target=_self

// const windowProp=true
// test('target attriubte to change depending on newWindow prop', () => {
//   render(
//     <>
//       <Hashtag
//           data={{ testid: 'primary-test' }}
//           newWindow={windowProp}
//           text={text}
//       />
//     </>
//   )
//   // const kit = screen.getByTestId('primary-test')
//   const content  = screen.getByText(text)
//   // const kithref = screen.getByTestId('primary-test')
//   // const content  = screen.getByText(text, {selector: 'span'})
//   // expect(kit).toHaveClass("pb_hashtag_kit")
//   expect(content).toHaveAttribute('target', "_self")
//   // expect(container).toBeInTheDocument(url)
//   // // expect(innerDiv).toHaveAttribute('href',url)
// })
