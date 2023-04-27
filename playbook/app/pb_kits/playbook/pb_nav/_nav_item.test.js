import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Nav from './_nav'
import NavItem from './_item'

const navTestId = 'nav'
const itemTestId = 'item'
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

test('should have a right icon', () => {
    render(<NavDefault iconRight="angle-down" />)
    const kit = screen.getByTestId(itemTestId)
    expect(kit).toContainHTML('<i class="pb_icon_kit far fa-fw fa-angle-down pb_nav_list_item_icon_right" />')
})

test('should have a left icon', () => {
    render(<NavDefault iconLeft="users-class" />)
    const kit = screen.getByTestId(itemTestId)
    expect(kit).toContainHTML('<i class="pb_icon_kit far fa-fw fa-users-class pb_nav_list_item_icon_left" />')
})