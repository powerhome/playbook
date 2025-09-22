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

const NavDefault = (props = []) => {
    return (
        <Nav
            aria={{ label: navTestId }}
            className={navClassName}
            data={{ testid: navTestId }}
            title={navTitle}
            {...props}
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

test('should pass data prop', () => {
    render(<NavDefault />)
    const kit = screen.getByTestId(navTestId)
    expect(kit).toBeInTheDocument()
})

test('should pass className prop', () => {
    render(<NavDefault />)
    const kit = screen.getByTestId(navTestId)
    expect(kit).toHaveClass(navClassName)
})

test('should pass aria prop', () => {
    render(<NavDefault />)
    const kit = screen.getByTestId(navTestId)
    expect(kit).toHaveAttribute('aria-label', navTestId)
})

test('should render nav title', () => {
    render(<NavDefault />)
    const kit = screen.getByText(navTitle)
    expect(kit).toBeInTheDocument()
})

test('should not be borderless by default', () => {
    render(<NavDefault />)
    const kit = screen.getByTestId(navTestId)
    expect(kit).toHaveClass('pb_nav_list_normal_vertical_highlight')
})

test('should be borderless', () => {
    render(<NavDefault borderless />)
    const kit = screen.getByTestId(navTestId)
    expect(kit).toHaveClass('pb_nav_list_normal_vertical_highlight_borderless')
})

test('should highlight by default', () => {
    render(<NavDefault />)
    const kit = screen.getByTestId(navTestId)
    expect(kit).toHaveClass('pb_nav_list_normal_vertical_highlight')
})

test('should not highlight', () => {
    render(<NavDefault highlight={false} />)
    const kit = screen.getByTestId(navTestId)
    expect(kit).toHaveClass('pb_nav_list_normal_vertical')
})

test('should have vertical orientation by default', () => {
    render(<NavDefault />)
    const kit = screen.getByTestId(navTestId)
    expect(kit).toHaveClass('pb_nav_list_normal_vertical_highlight')
})

test('should change orientation', () => {
    render(<NavDefault orientation='horizontal' />)
    const kit = screen.getByTestId(navTestId)
    expect(kit).toHaveClass('pb_nav_list_normal_horizontal_highlight')
})

test('should have normal variant by default', () => {
    render(<NavDefault />)
    const kit = screen.getByTestId(navTestId)
    expect(kit).toHaveClass('pb_nav_list_normal_vertical_highlight')
})

test('should change variant', () => {
    render(<NavDefault variant='subtle' />)
    const kit = screen.getByTestId(navTestId)
    expect(kit).toHaveClass('pb_nav_list_subtle_vertical_highlight')
})

test('extendedUnderline should work as expected', () => {
    render(
        <NavDefault extendedUnderline 
            orientation="horizontal" 
        />
    )
    const kit = screen.getByTestId(navTestId)
    expect(kit).toHaveClass('pb_nav_extended_underline')
})

test('extendedUnderline should not be applied when orientation is vertical', () => {
    render(<NavDefault extendedUnderline />)
    const kit = screen.getByTestId(navTestId)
    expect(kit).not.toHaveClass('pb_nav_extended_underline')
})
