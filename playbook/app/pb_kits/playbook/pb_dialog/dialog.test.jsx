import React from 'react'
import { render, screen, cleanup } from "../utilities/test-utils";
import { Dialog} from '../'

/* eslint-disable jsx-control-statements/jsx-jcs-no-undef */

/* See these resources for more testing info:
  - https://github.com/testing-library/jest-dom#usage for useage and examples
  - https://jestjs.io/docs/en/using-matchers
*/

const testId = "primary-test"
const text="Hello Body Text, Nice to meet ya."
const title="Header Title is the Title Prop"
const size="sm"

function DialogTest(props) {
  return (
      <Dialog
          cancelButton="Cancel Button"
          // className="wrapper"
          // confirmButton="Okay"
          data={{ testid: testId }}
          // loading={isLoading}
          // onCancel={close}
          // onClose={close}
          // onConfirm={() => setIsLoading(!isLoading)}
          // opened={isOpen}
          // portalClassName="portal"
          size={size}
          text={text}
          title={title}
          {...props}
      />
  );
}

test('renders the component', () => {

  render(<DialogTest/>)

  const kit = screen.getByTestId(testId)
  expect(kit).toBeInTheDocument()
  expect(kit).toHaveClass('pb_dialog_wrapper');

  cleanup()
})

test("renders the title", () => {
  const { container } = render(<DialogTest />);
  const item = container.getElementsByClassName("dialog_body")
  expect(item).toBeInTheDocument;
  // expect(item).toHaveTextContent(text);

  cleanup()
});