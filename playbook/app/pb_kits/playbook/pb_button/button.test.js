
import React from 'react'
import { appendAlert, fireEvent, render, screen, waitFor } from '../utilities/test-utils'

import Button from './_button'

// Primary Test Variables
const htmlType = 'submit',
    text = 'Button Text',
    value = '1234'

test('passes type, text, and value props to button', () => {
    render(
        <Button
            data={{ testid: 'primary-test' }}
            htmlType={htmlType}
            text={text}
            value={value}
        />
    )

    const kit = screen.getByTestId('primary-test')
    const content = screen.getByText(text)

    expect(kit).toHaveClass('pb_button_kit pb_button_primary pb_button_inline pb_button_enabled')
    expect(kit).toHaveAttribute('type', htmlType)
    expect(kit).toHaveAttribute('value', value)
    expect(content).toHaveTextContent(text)
})

// Link Test Variables
const link = 'https://www.google.com'

test('adds link to button', () => {
    render(
        <Button
            data={{ testid: 'link-test' }}
            link={link}
        />
    )

    const kit = screen.getByTestId('link-test')

    expect(kit).toHaveAttribute('href', link)
})

test('button with secondary variant', () => {
    render(
        <Button
            data={{ testid: 'variant-test' }}
            variant="secondary"
        />
    )

    const kit = screen.getByTestId('variant-test')

    expect(kit).toHaveClass('pb_button_kit pb_button_secondary pb_button_inline pb_button_enabled')
    expect(kit).toHaveAttribute('type', 'button')
})

test('disable prop', () => {
    render(
        <Button
            data={{ testid: 'disable-test' }}
            disabled
        />
    )

    const kit = screen.getByTestId('disable-test')

    expect(kit).toBeDisabled()
})

test('click event', async () => {
    render(
        <Button
            data={{ testid: 'click-test' }}
            onClick={() => appendAlert('clicked button!')}
        />
    )

    const kit = screen.getByTestId('click-test')

    fireEvent.click(kit)

    await waitFor(() => screen.getByText('clicked button!'))

    expect(screen.getByText('clicked button!')).toBeInTheDocument()
})

test('size prop', () => {
    render(
        <Button
            data={{ testid: 'size-test' }}
            size="sm"
        />
    )

    const kit = screen.getByTestId('size-test')

    expect(kit).toHaveClass('pb_button_kit pb_button_primary pb_button_inline pb_button_enabled pb_button_size_sm')
})

test('should render target prop', () => {
    render(
        <Button
            data={{ testid: 'variant-test' }}
            link="https://google.com"
            target="_parent"
            variant="secondary"
        />
    )

    const kit = screen.getByTestId('variant-test')
    expect(kit).toHaveAttribute('target', '_parent')
    expect(kit).toHaveAttribute('rel', 'noreferrer')
})

test('should render child target prop', () => {
    render(
        <Button
            data={{ testid: 'variant-test' }}
            link="https://google.com"
            newWindow
            target="child"
            variant="secondary"
        />
    )

    const kit = screen.getByTestId('variant-test')
    expect(kit).toHaveAttribute('target', 'child')
    expect(kit).not.toHaveAttribute('rel')
})
