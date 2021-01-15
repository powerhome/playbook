/* This file provides the base for tests */

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

/*
  We can complicate this wrapper as needed.
  https://testing-library.com/docs/react-testing-library/setup
*/
// eslint-disable-next-line react/prop-types
const TestApp = ({ children }) => {
  return (
    <>
      { children }
    </>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: TestApp, ...options })

export * from '@testing-library/react'
export { customRender as render }

export const renderKit = (Kit, props = {}, newProps = {}) => {
  const kitProps = { ...props, ...newProps }
  render(<Kit {...kitProps} />)
}
