/* This file provides the base for tests */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Accessbility
import { axe, toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

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
  return screen.getByTestId(kitProps.data.testid)
}

export const ensureAccessible = async (Kit, props = {}, newProps = {}) => {
  const kitProps = { ...props, ...newProps }
  const render = () => <Kit {...kitProps} />
  const html = render()
  expect(await axe(html)).toHaveNoViolations()
}

export const appendAlert = (message) => {
  const alertNode = document.createElement('div')
  alertNode.innerHTML = message
  document.querySelector('body').appendChild(alertNode)
}
