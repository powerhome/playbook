
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

describe('icon-only button', () => {
    test('adds pb_button_icon_only class when icon is provided without text', () => {
        render(
            <Button
                data={{ testid: 'icon-only-test' }}
                icon="plus"
            />
        )

        const kit = screen.getByTestId('icon-only-test')
        expect(kit).toHaveClass('pb_button_icon_only')
    })

    test('does not add pb_button_icon_only class when text is provided', () => {
        render(
            <Button
                data={{ testid: 'icon-with-text-test' }}
                icon="plus"
                text="Click me"
            />
        )

        const kit = screen.getByTestId('icon-with-text-test')
        expect(kit).not.toHaveClass('pb_button_icon_only')
    })

    test('does not add pb_button_icon_only class when children are provided', () => {
        render(
            <Button
                data={{ testid: 'icon-with-children-test' }}
                icon="plus"
            >
                Click me
            </Button>
        )

        const kit = screen.getByTestId('icon-with-children-test')
        expect(kit).not.toHaveClass('pb_button_icon_only')
    })

    test('does not add pb_button_icon_only class when variant is reaction', () => {
        render(
            <Button
                data={{ testid: 'reaction-icon-test' }}
                icon="plus"
                variant="reaction"
            />
        )

        const kit = screen.getByTestId('reaction-icon-test')
        expect(kit).not.toHaveClass('pb_button_icon_only')
    })

    test('adds pb_button_icon_only class with different variants', () => {
        const variants = ['primary', 'secondary', 'link', 'danger']
        
        variants.forEach(variant => {
            const { unmount } = render(
                <Button
                    data={{ testid: `icon-only-${variant}-test` }}
                    icon="plus"
                    variant={variant}
                />
            )

            const kit = screen.getByTestId(`icon-only-${variant}-test`)
            expect(kit).toHaveClass('pb_button_icon_only')
            unmount()
        })
    })

    test('adds pb_button_icon_only class with loading state', () => {
        render(
            <Button
                data={{ testid: 'icon-only-loading-test' }}
                icon="plus"
                loading
            />
        )

        const kit = screen.getByTestId('icon-only-loading-test')
        expect(kit).toHaveClass('pb_button_icon_only')
        expect(kit).toHaveClass('pb_button_loading')
    })

    test('adds pb_button_icon_only class with size variants', () => {
        const sizes = ['sm', 'md', 'lg']
        
        sizes.forEach(size => {
            const { unmount } = render(
                <Button
                    data={{ testid: `icon-only-${size}-test` }}
                    icon="plus"
                    size={size}
                />
            )

            const kit = screen.getByTestId(`icon-only-${size}-test`)
            expect(kit).toHaveClass('pb_button_icon_only')
            expect(kit).toHaveClass(`pb_button_size_${size}`)
            unmount()
        })
    })
})
