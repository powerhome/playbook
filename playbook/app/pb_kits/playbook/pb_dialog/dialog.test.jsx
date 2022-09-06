import React from 'react'
import { render, screen, cleanup } from "../utilities/test-utils";
import { Dialog } from '../'

/* eslint-disable jsx-control-statements/jsx-jcs-no-undef */

/* See these resources for more testing info:
  - https://github.com/testing-library/jest-dom#usage for useage and examples
  - https://jestjs.io/docs/en/using-matchers
*/

const testId = "primary-test"

function DialogTest(props) {
  return (
      <Dialog
          cancelButton="Cancel Button"
          // className="wrapper"
          // confirmButton="Okay"
          data={{ testid: testId }}
          loading={isLoading}
          onCancel={close}
          onClose={close}
          onConfirm={() => setIsLoading(!isLoading)}
          opened={isOpen}
          portalClassName="portal"
          size="sm"
          text="Hello Body Text, Nice to meet ya."
          title="Header Title is the Title Prop"
          {...props}
      />
  );
}

test('Kit renders Dialog', () => {

  render(<DialogTest/>)

  const kit = screen.getByTestId(testId)
  expect(kit).toBeInTheDocument()

  cleanup()
})
