import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Nav from './_nav'
import NavItem from './_item'

const navTestId = 'nav'
const navDisabledTestId = 'nav-disabled'
const itemDisabledTestId = 'item-disabled'
const itemTestId = 'item'
const activeTestBorderlessId = 'activeborderless'
const activeTestBorderId = 'active'
const navClassName = 'custom-class-name-nav'
const itemClassName = 'custom-class-name-item'
const navTitle = 'Menu'
const itemTitle = 'Photos'
const itemImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/0/00/Apple_News_icon_%28macOS%29.png'

const NavDefault = (props) => {
    return (
        <Nav
            aria={{ label: navTestId }}
            className={navClassName}
            data={{ testid: navTestId }}
            title={navTitle}
        >
            <NavItem
                aria={{ label: itemTestId }}
                className={itemClassName}
                data={{ testid: itemTestId }}
                imageUrl={itemImageUrl}
                link="#"
                text={itemTitle}
                {...props}
            />
            <NavItem
                link="#"
                text="Music"
            />
            <NavItem
                active
                data={{ testid: activeTestBorderId }}
                link="#"
                text="Video"
            />
            <NavItem
                active
                data={{ testid: activeTestBorderlessId }}
                highlighted_border={false}
                link="#"
                text="Video"
            />
            <NavItem
                link="#"
                text="Files"
            />
        </Nav>
    )
}

test('should pass data prop', () => {
    render(<NavDefault />)
    const kit = screen.getByTestId(itemTestId)
    expect(kit).toBeInTheDocument()
})

test('should pass className prop', () => {
    render(<NavDefault />)
    const kit = screen.getByTestId(itemTestId)
    expect(kit).toHaveClass(itemClassName)
})

test('should pass aria prop', () => {
    render(<NavDefault />)
    const kit = screen.getByTestId(itemTestId)
    expect(kit).toHaveAttribute('aria-label', itemTestId)
})

test('should render title', () => {
    render(<NavDefault />)
    const kit = screen.getByText(itemTitle)
    expect(kit).toBeInTheDocument()
})

test('should have a left border', () => {
    render(<NavDefault iconRight="angle-down" />)
    const kit = screen.getByTestId(activeTestBorderId)
    expect(kit).toContainHTML('pb_nav_list_kit_item_active')
})

test('should not have a left border', () => {
    render(<NavDefault iconRight="angle-down" />)
    const kit = screen.getByTestId(activeTestBorderlessId)
    expect(kit).toContainHTML('pb_nav_list_kit_item_active_highlighted_border_none')
})

test('should have a right icon', () => {
    render(<NavDefault iconRight="angle-down" />)
    const kit = screen.getByTestId(itemTestId)
    const icon = kit.querySelector(".pb_custom_icon.pb_nav_list_item_icon_right")
    expect(icon).toBeInTheDocument()
})

test('should have a left icon', () => {
    render(<NavDefault iconLeft="angle-up" />)
    const kit = screen.getByTestId(itemTestId)
    const icon = kit.querySelector(".pb_custom_icon.pb_nav_list_item_icon_left")
    expect(icon).toBeInTheDocument()
})

test('should apply disabled class when disabled', () => {
    [
     "default",
     "subtle",
     "bold"
    ].forEach((variant) => {
        render(
            <Nav
                aria={{ label: navDisabledTestId }}
                className={navClassName}
                data={{ testid: navDisabledTestId }}
                orientation="horizontal"
                variant={variant}
            >
            <NavItem
                aria={{ label: `${itemDisabledTestId}-${variant}` }}
                className={itemClassName}
                data={{ testid: `${itemDisabledTestId}-${variant}` }}
                disabled
                link="#"
                text="Files"
            />
           </Nav>
        )
        const kit = screen.getByTestId(`${itemDisabledTestId}-${variant}`)
        expect(kit).toHaveClass('pb_nav_item_disabled')
    })
})

test('should set aria-disabled when disabled', () => {
    [
        "default",
        "subtle",
        "bold"
    ].forEach((variant) => {
        render(
            <Nav
                aria={{ label: navDisabledTestId }}
                className={navClassName}
                data={{ testid: navDisabledTestId }}
                orientation="horizontal"
                variant={variant}
            >
            <NavItem
                aria={{ label: `${itemDisabledTestId}-${variant}` }}
                className={itemClassName}
                data={{ testid: `${itemDisabledTestId}-${variant}` }}
                disabled
                link="#"
                text="Files"
            />
           </Nav>
        )
        const item = screen.getByTestId(`${itemDisabledTestId}-${variant}`)
        expect(item).toHaveAttribute('aria-disabled', 'true')
    })
})

test('should set tabIndex to -1 when disabled', () => {
    [
        "default",
        "subtle",
        "bold"
    ].forEach((variant) => {
        render(
            <Nav
                aria={{ label: navDisabledTestId }}
                className={navClassName}
                data={{ testid: navDisabledTestId }}
                orientation="horizontal"
                variant={variant}
            >
            <NavItem
                aria={{ label: `${itemDisabledTestId}-${variant}` }}
                className={itemClassName}
                data={{ testid: `${itemDisabledTestId}-${variant}` }}
                disabled
                link="#"
                text="Files"
            />
           </Nav>
        )
        const kit = screen.getByTestId(`${itemDisabledTestId}-${variant}`)
        expect(kit).toHaveAttribute('tabIndex', '-1')
    })
})

test('should prevent onClick when disabled', () => {
    const handleClick = jest.fn()
    render(
        <NavItem
            data={{ testid: 'disabled-click-item' }}
            disabled
            link="#"
            onClick={handleClick}
            text="Disabled Item"
        />
    )
    const kit = screen.getByTestId('disabled-click-item')
    kit.click()
    expect(handleClick).not.toHaveBeenCalled()
})
