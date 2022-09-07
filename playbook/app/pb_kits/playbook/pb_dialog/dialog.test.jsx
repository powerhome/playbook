import React, {useState} from 'react'
import { render, cleanup, waitFor, fireEvent } from "../utilities/test-utils";
import { Dialog, Button } from '../'

const testId = "primary-test"
const text="Hello Body Text, Nice to meet ya."
const title="Header Title is the Title Prop"
const size="sm"
const confirmButton="Okay"
const cancelButton="Cancel Button"

function DialogTest() {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)
  const [isLoading, setIsLoading] = useState(false)
  return (
    <>
      <Button onClick={open}>{'Open Dialog'}</Button>
      <Dialog
          cancelButton={cancelButton}
          className="wrapper"
          confirmButton={confirmButton}
          data={{ testid: testId }}
          loading={isLoading}
          onCancel={close}
          onClose={close}
          onConfirm={() => setIsLoading(!isLoading)}
          opened={isOpen}
          portalClassName="portal"
          size={size}
          text={text}
          title={title}
      />
    </>
  );
}

test('renders the component when clicked', async () => {

  const { queryByText } = render(<DialogTest />);

  fireEvent.click(queryByText('Open Dialog'));

  await waitFor(() => expect(queryByText("Header Title is the Title Prop")).toBeInTheDocument());

  cleanup()
})

test("renders the title and body text", async () => {

  const { queryByText } = render(<DialogTest />);

  fireEvent.click(queryByText('Open Dialog'));

  await waitFor(() => expect(queryByText("Header Title is the Title Prop")).toHaveTextContent(title));

  await waitFor(() => expect(queryByText("Hello Body Text, Nice to meet ya.")).toHaveTextContent(text));

  cleanup()
});

test("renders the title and body text", async () => {

  const { queryByText } = render(<DialogTest />);

  fireEvent.click(queryByText('Open Dialog'));

  await waitFor(() => expect(queryByText("Header Title is the Title Prop")).toHaveTextContent(title));

  await waitFor(() => expect(queryByText("Hello Body Text, Nice to meet ya.")).toHaveTextContent(text));

  cleanup()
});

test("renders the buttons", async () => {

  const { queryByText } = render(<DialogTest />);

  fireEvent.click(queryByText('Open Dialog'));

  await waitFor(() => expect(queryByText("Okay")).toHaveTextContent(confirmButton));

  await waitFor(() => expect(queryByText("Cancel Button")).toHaveTextContent(cancelButton));

  cleanup()
});