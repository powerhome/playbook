
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

describe('type and htmlType', () => {
    test('defaults to pb_button_inline and html type button', () => {
        render(
            <Button
                data={{ testid: 'default-type' }}
                text="Save"
            />
        )

        const kit = screen.getByTestId('default-type')
        expect(kit).toHaveClass('pb_button_kit pb_button_primary pb_button_inline pb_button_enabled')
        expect(kit).not.toHaveClass('pb_button_block')
        expect(kit).toHaveAttribute('type', 'button')
    })

    test('type="inline" adds pb_button_inline without changing the html type', () => {
        render(
            <Button
                data={{ testid: 'inline-type' }}
                type="inline"
            />
        )

        const kit = screen.getByTestId('inline-type')
        expect(kit).toHaveClass('pb_button_inline')
        expect(kit).toHaveAttribute('type', 'button')
    })

    test('type={null} omits the layout class', () => {
        render(
            <Button
                data={{ testid: 'null-type' }}
                type={null}
            />
        )

        const kit = screen.getByTestId('null-type')
        expect(kit).not.toHaveClass('pb_button_inline')
        expect(kit).toHaveAttribute('type', 'button')
    })

    test('legacy and undocumented type strings still generate pb_button_${type}', () => {
        const { unmount } = render(
            <Button
                data={{ testid: 'legacy-link' }}
                type="link"
            />
        )

        const linkType = screen.getByTestId('legacy-link')
        expect(linkType).toHaveClass('pb_button_primary')
        expect(linkType).toHaveClass('pb_button_link')
        expect(linkType).toHaveAttribute('type', 'button')
        unmount()

        render(
            <Button
                data={{ testid: 'legacy-submit' }}
                type="submit"
            />
        )

        const submitType = screen.getByTestId('legacy-submit')
        expect(submitType).toHaveClass('pb_button_submit')
        expect(submitType).toHaveAttribute('type', 'button')
    })

    test('fullWidth keeps pb_button_inline and adds pb_button_block', () => {
        render(
            <Button
                data={{ testid: 'full-width-type' }}
                fullWidth
            />
        )

        const kit = screen.getByTestId('full-width-type')
        expect(kit).toHaveClass('pb_button_inline')
        expect(kit).toHaveClass('pb_button_block')
    })

    test('htmlType sets the attribute on standard and reaction buttons', () => {
        const { unmount } = render(
            <Button
                data={{ testid: 'html-submit' }}
                htmlType="submit"
            />
        )

        expect(screen.getByTestId('html-submit')).toHaveAttribute('type', 'submit')
        unmount()

        render(
            <Button
                data={{ testid: 'html-reset' }}
                htmlType="reset"
                variant="reaction"
            />
        )

        const kit = screen.getByTestId('html-reset')
        expect(kit).toHaveAttribute('type', 'reset')
        expect(kit).toHaveClass('pb_button_reaction')
        expect(kit).toHaveClass('pb_button_inline')
    })

    test('htmlType is omitted when link renders an anchor', () => {
        render(
            <Button
                data={{ testid: 'html-link' }}
                htmlType="submit"
                link="https://example.com"
            />
        )

        const kit = screen.getByTestId('html-link')
        expect(kit.tagName).toBe('A')
        expect(kit).toHaveAttribute('href', 'https://example.com')
        expect(kit).not.toHaveAttribute('type')
        expect(kit).toHaveClass('pb_button_inline')
    })

    test('htmlType overrides htmlOptions.type', () => {
        render(
            <Button
                data={{ testid: 'html-override' }}
                htmlOptions={{ type: 'submit' }}
                htmlType="reset"
            />
        )

        expect(screen.getByTestId('html-override')).toHaveAttribute('type', 'reset')
    })

    test('loading, disabled, and variant classes stay independent of type', () => {
        render(
            <Button
                data={{ testid: 'type-states' }}
                disabled
                loading
                type="inline"
                variant="danger"
            />
        )

        const kit = screen.getByTestId('type-states')
        expect(kit).toHaveClass('pb_button_danger')
        expect(kit).toHaveClass('pb_button_inline')
        expect(kit).toHaveClass('pb_button_disabled')
        expect(kit).toHaveClass('pb_button_loading')
        expect(kit).toBeDisabled()
        expect(kit).toHaveAttribute('type', 'button')
    })
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
