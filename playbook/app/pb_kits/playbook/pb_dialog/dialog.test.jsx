import React, {useState} from 'react'
import { render, cleanup, waitFor, fireEvent, screen } from "../utilities/test-utils";
import { Dialog, Button } from 'playbook-ui'

const text="Hello Body Text, Nice to meet ya."
const title="Header Title is the Title Prop"
const size="sm"
const confirmButton="Okay"
const cancelButton="Cancel Button"

function DialogTest({ props }) {
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
          loading={isLoading}
          onCancel={close}
          onClose={close}
          onConfirm={() => setIsLoading(!isLoading)}
          opened={isOpen}
          placement="right"
          portalClassName="portal"
          size={size}
          text={text}
          title={title}
          {...props}
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

test("renders the full height version", async () => {

  const { queryByText } = render(<DialogTest fullHeight />);

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

test("renders the right placement dialog", async () => {

  const { queryByText } = render(<DialogTest />);

  fireEvent.click(queryByText('Open Dialog'));

  await waitFor(() => expect(queryByText("Header Title is the Title Prop")));

  cleanup()
});

test('renders loading dialog with disabled buttons', async () => {

  const { queryByText } = render(<DialogTest />);

  fireEvent.click(queryByText('Open Dialog'));

  await waitFor(() => expect(queryByText("Okay")).toHaveTextContent(confirmButton));
  await waitFor(() => expect(queryByText("Cancel Button")).toHaveTextContent(cancelButton));

  fireEvent.click(queryByText('Okay'));

  const loadingIconDiv = document.querySelector('.loading-icon');
  expect(loadingIconDiv).toBeInTheDocument();

  const cancelBtn = screen.getByRole('button', { name: cancelButton });
  expect(cancelBtn).toBeDisabled();

  cleanup()
})

test('renders dialog without close button when closeable is false', async () => {

  const { queryByText, container } = render(<DialogTest closeable={false} />);

  fireEvent.click(queryByText('Open Dialog'));

  await waitFor(() => expect(queryByText("Header Title is the Title Prop")));

  const closeBtn = container.querySelector('.pb_dialog_close_icon');
  expect(closeBtn).not.toBeInTheDocument();

  cleanup()
})
