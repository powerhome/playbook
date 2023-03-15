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

const NavDefault = () => {
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

test('should pass nav data prop', () => {
    render(<NavDefault />)
    const kit = screen.getByTestId(navTestId)
    expect(kit).toBeInTheDocument()
})

test('should pass nav className prop', () => {
    render(<NavDefault />)
    const kit = screen.getByTestId(navTestId)
    expect(kit).toHaveClass(navClassName)
})

test('should pass nav aria prop', () => {
    render(<NavDefault />)
    const kit = screen.getByTestId(navTestId)
    expect(kit).toHaveAttribute('aria-label', navTestId)
})

test('should pass nav item data prop', () => {
    render(<NavDefault />)
    const kit = screen.getByTestId(itemTestId)
    expect(kit).toBeInTheDocument()
})

test('should pass nav item className prop', () => {
    render(<NavDefault />)
    const kit = screen.getByTestId(itemTestId)
    expect(kit).toHaveClass(itemClassName)
})

test('should pass nav item aria prop', () => {
    render(<NavDefault />)
    const kit = screen.getByTestId(itemTestId)
    expect(kit).toHaveAttribute('aria-label', itemTestId)
})

test('should render nav title', () => {
    render(<NavDefault />)
    const kit = screen.getByText(navTitle)
    expect(kit).toBeInTheDocument()
})

test('should render nav item title', () => {
    render(<NavDefault />)
    const kit = screen.getByText(itemTitle)
    expect(kit).toBeInTheDocument()
})