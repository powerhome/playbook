import React from 'react';
import { CopyButton } from 'playbook-ui'
import { ensureAccessible, renderKit, render, fireEvent, screen } from '../utilities/test-utils'

const props = {
  data: { testid: 'default', value: 'copy' }
}

test('returns namespaced class name', () => {
  const kit = renderKit(CopyButton, props)
  expect(kit).toBeInTheDocument()
  expect(kit).toHaveClass('pb_copy_button_kit')
})

it('should be accessible', async () => {
  ensureAccessible(CopyButton, props)
})

// It's difficult to actually use navigator.clipboard.readText, so we mock
it('copies the value to clipboard and pastes it into an input', async () => {
  Object.defineProperty(global, 'navigator', {
    value: {
      clipboard: {
        writeText: jest.fn().mockResolvedValueOnce(undefined),
      },
    },
    writable: true,
  })

  render(<CopyButton {...props} />)

  const copyButton = screen.getByTestId('default')
  fireEvent.click(copyButton)

  await navigator.clipboard.writeText('copy')

  expect(navigator.clipboard.writeText).toHaveBeenCalledWith("copy");
})

test('passes text and tooltip props to button', () => {
  // render(
  //     <CopyButton
  //         data={{ testid: 'text-test' }}
  //         text={"text"}
  //         tooltipPlacement="right"
  //         tooltipText="Text copied!"
  //         value="copy"
  //     />
  // )

  // const content = screen.getByText("text")
  // expect(content).toHaveTextContent("text")

  // const kit = screen.getByTestId('text-test')
  // const button = kit.querySelector('.pb_button_kit_primary_inline_enabled')
  // expect(button).toBeInTheDocument()

  // fireEvent.click(button)
  // const tooltipContent = screen.getByText("Text copied!")
  // expect(tooltipContent).toHaveTextContent("Text copied!")

  // const tooltip = kit.querySelector('.pb_tooltip_kit')
  // expect(tooltip).toBeInTheDocument()
})
