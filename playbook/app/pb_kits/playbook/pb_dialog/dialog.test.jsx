import React, {useState} from 'react'
import { render, cleanup, waitFor, fireEvent, screen } from "../utilities/test-utils";
import { Dialog, Button } from 'playbook-ui'
import {
  isNativeSelectMenuInteraction,
  resolveDialogFloatingPortalHost,
  resolvePortaledKitHost,
} from "../utilities/floatingPortalHosts"

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

test('renders scroll region and floating root for portaled inputs (Typeahead, etc.)', async () => {
  const { queryByText } = render(<DialogTest />)

  fireEvent.click(queryByText('Open Dialog'))

  await waitFor(() =>
    expect(queryByText("Header Title is the Title Prop")).toBeInTheDocument(),
  )

  expect(document.querySelector('.pb_dialog_scroll_region')).toBeInTheDocument()
  expect(
    document.querySelector('[data-pb-dialog-floating-root="true"]'),
  ).toBeInTheDocument()

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

describe('Dialog floating portal host (portaled kits)', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  test('resolveDialogFloatingPortalHost returns null outside dialog, modal, or popover', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    expect(resolveDialogFloatingPortalHost(div)).toBeNull()
  })

  test('resolveDialogFloatingPortalHost returns floating root inside native dialog', () => {
    const dialog = document.createElement('dialog')
    const scroll = document.createElement('div')
    scroll.className = 'pb_dialog_scroll_region'
    const floating = document.createElement('div')
    floating.setAttribute('data-pb-dialog-floating-root', 'true')
    const inner = document.createElement('div')
    dialog.appendChild(scroll)
    dialog.appendChild(floating)
    dialog.appendChild(inner)
    document.body.appendChild(dialog)

    expect(resolveDialogFloatingPortalHost(inner)).toBe(floating)
  })

  test('resolveDialogFloatingPortalHost falls back to dialog when floating root missing', () => {
    const dialog = document.createElement('dialog')
    const inner = document.createElement('div')
    dialog.appendChild(inner)
    document.body.appendChild(dialog)

    expect(resolveDialogFloatingPortalHost(inner)).toBe(dialog)
  })

  test('resolveDialogFloatingPortalHost returns floating root inside .pb_dialog', () => {
    const shell = document.createElement('div')
    shell.className = 'pb_dialog'
    const floating = document.createElement('div')
    floating.setAttribute('data-pb-dialog-floating-root', 'true')
    const inner = document.createElement('div')
    shell.appendChild(floating)
    shell.appendChild(inner)
    document.body.appendChild(shell)

    expect(resolveDialogFloatingPortalHost(inner)).toBe(floating)
  })

  test('resolvePortaledKitHost uses dialog floating root when inside dialog', () => {
    const dialog = document.createElement('dialog')
    const floating = document.createElement('div')
    floating.setAttribute('data-pb-dialog-floating-root', 'true')
    const kit = document.createElement('div')
    dialog.appendChild(floating)
    dialog.appendChild(kit)
    document.body.appendChild(dialog)

    expect(resolvePortaledKitHost(kit, null)).toBe(floating)
  })

  test('resolvePortaledKitHost uses context target when host not in tree', () => {
    const host = document.createElement('div')
    const kit = document.createElement('div')
    document.body.appendChild(kit)

    expect(resolvePortaledKitHost(kit, host)).toBe(host)
  })
})

describe('isNativeSelectMenuInteraction', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  test('returns true when mousedown target is a select inside the dialog', () => {
    const dialog = document.createElement('dialog')
    const select = document.createElement('select')
    dialog.appendChild(select)
    document.body.appendChild(dialog)

    expect(isNativeSelectMenuInteraction(dialog, select)).toBe(true)
  })

  test('returns true when a select inside the dialog is focused (Firefox OS menu pick)', () => {
    const dialog = document.createElement('dialog')
    const select = document.createElement('select')
    dialog.appendChild(select)
    document.body.appendChild(dialog)
    select.focus()

    expect(isNativeSelectMenuInteraction(dialog, dialog)).toBe(true)
  })

  test('returns false when the select is outside the dialog', () => {
    const dialog = document.createElement('dialog')
    const select = document.createElement('select')
    document.body.appendChild(dialog)
    document.body.appendChild(select)

    expect(isNativeSelectMenuInteraction(dialog, select)).toBe(false)
  })
})
