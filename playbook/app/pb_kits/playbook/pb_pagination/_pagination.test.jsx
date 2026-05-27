import React from 'react'
import { ensureAccessible, renderKit, render, fireEvent, screen } from '../utilities/test-utils'
import Pagination from './_pagination'

const defaultProps = {
  data: { testid: 'pagination-test' },
  total: 10,
  current: 1,
  range: 5,
}

describe('Pagination Component', () => {
  test('returns namespaced class name', () => {
    const kit = renderKit(Pagination, defaultProps)
    expect(kit).toBeInTheDocument()
    expect(kit).toHaveClass('pb_paginate')
  })

  it("should be accessible", async () => {
    ensureAccessible(Pagination, defaultProps)
  })

  test('renders with default props', () => {
    render(<Pagination {...defaultProps} />)
    
    const pagination = screen.getByTestId('pagination-test')
    expect(pagination).toBeInTheDocument()
    expect(pagination).toHaveClass('pb_paginate')
  })

  test('renders pagination buttons correctly', () => {
    render(<Pagination {...defaultProps} />)
    
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    
    // Check for navigation arrows by looking for the li elements with specific classes
    const leftArrow = document.querySelector('.pagination-left')
    const rightArrow = document.querySelector('.pagination-right')
    expect(leftArrow).toBeInTheDocument()
    expect(rightArrow).toBeInTheDocument()
  })

  test('highlights current page as active', () => {
    render(<Pagination {...defaultProps}
        current={3} 
           />)
    
    const activePage = screen.getByText('3')
    expect(activePage).toHaveClass('active')
  })

  test('calls onChange when page is clicked', () => {
    const mockOnChange = jest.fn()
    render(<Pagination {...defaultProps} 
        onChange={mockOnChange}
           />)
    
    const pageButton = screen.getByText('3')
    fireEvent.click(pageButton)
    
    expect(mockOnChange).toHaveBeenCalledWith(3)
  })

  test('disables left arrow on first page', () => {
    render(<Pagination {...defaultProps}
        current={1}
           />)
    
    const leftArrow = document.querySelector('.pagination-left')
    expect(leftArrow).toHaveClass('disabled')
  })

  test('disables right arrow on last page', () => {
    render(<Pagination {...defaultProps}
        current={10}
           />)
    
    const rightArrow = document.querySelector('.pagination-right')
    expect(rightArrow).toHaveClass('disabled')
  })

  test('does not render when total is 1 or less', () => {
    const { container } = render(<Pagination {...defaultProps} 
        total={1}
                                 />)
    
    expect(container.firstChild).toBeNull()
  })

  test('renders with custom className', () => {
    render(<Pagination {...defaultProps}
        className="custom-class" 
           />)
    
    const pagination = screen.getByTestId('pagination-test')
    expect(pagination).toHaveClass('custom-class')
  })

  test('renders with custom id', () => {
    render(<Pagination {...defaultProps}
        id="custom-id" 
           />)
    
    const pagination = screen.getByTestId('pagination-test')
    expect(pagination).toHaveAttribute('id', 'custom-id')
  })

  test('renders with custom range', () => {
    render(<Pagination {...defaultProps}
        range={3} 
           />)
    
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('9')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  test('handles large number of pages correctly', () => {
    render(<Pagination {...defaultProps}
        current={50}
        range={5}
        total={100}
           />)

    const pagination = screen.getByTestId('pagination-test')
    expect(pagination).toBeInTheDocument()
    expect(pagination).toHaveClass('pb_paginate')

    
    expect(screen.getByText('48')).toBeInTheDocument()
    expect(screen.getByText('49')).toBeInTheDocument()
    expect(screen.getByText('50')).toBeInTheDocument()
    expect(screen.getByText('51')).toBeInTheDocument()
    expect(screen.getByText('52')).toBeInTheDocument()
  })

  test('syncs with external current prop changes', () => {
    const { rerender } = render(<Pagination {...defaultProps} 
        current={1}
                                />)
    
    expect(screen.getByText('1')).toHaveClass('active')
    
    rerender(<Pagination {...defaultProps} 
        current={3} 
             />)
    
    expect(screen.getByText('3')).toHaveClass('active')
    expect(screen.getByText('1')).not.toHaveClass('active')
  })

  test('validates current prop is within valid range', () => {
    const { rerender } = render(<Pagination {...defaultProps} 
        current={1} 
                                />)
    
    rerender(<Pagination {...defaultProps} 
        current={0} 
            />)
    
    expect(screen.getByText('1')).toHaveClass('active')
    
    rerender(<Pagination {...defaultProps} 
        current={15}
             />)
    
    expect(screen.getByText('1')).toHaveClass('active')
  })

  test('handles htmlOptions props', () => {
    const htmlOptions = { 'data-test': 'test-value' }
    render(<Pagination {...defaultProps}
        htmlOptions={htmlOptions}
           />)
    
    const pagination = screen.getByTestId('pagination-test')
    expect(pagination).toHaveAttribute('data-test', 'test-value')
  })

  test('renders first and last page buttons when range is small', () => {
    render(<Pagination {...defaultProps}
        current={10}
        range={3}
        total={20}
           />)
    
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('20')).toBeInTheDocument()
    
    expect(screen.getByText('9')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('11')).toBeInTheDocument()
  })

  test('renders second and second-to-last page buttons when needed', () => {
    render(<Pagination {...defaultProps} 
        current={10}
        range={3}
        total={20}
           />)
    
    expect(screen.getByText('2')).toBeInTheDocument()
    
    expect(screen.getByText('19')).toBeInTheDocument()
  })
}) 

describe('Pagination Mobile View', () => {
  let originalInnerWidth

  beforeEach(() => {
    // Store original value
    originalInnerWidth = window.innerWidth
    
    // Mock window.innerWidth for mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 767
    })
  })

  afterEach(() => {
    // Restore original value
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth
    })
  })

  test('renders mobile layout on small screens', () => {
    render(<Pagination {...defaultProps} />)
    
    const mobilePagination = document.querySelector('.pb_pagination_mobile')
    expect(mobilePagination).toBeInTheDocument()
  })

  test('renders Prev and Next buttons in mobile view', () => {
    render(<Pagination {...defaultProps} />)
    
    expect(screen.getByText('Prev')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })

  test('displays current page and total in dropdown trigger', () => {
    render(<Pagination {...defaultProps} 
        current={3}
        total={10}
           />)
    
    expect(screen.getByText('3', { exact: false })).toBeInTheDocument()
    expect(screen.getByText(/of 10/)).toBeInTheDocument()
  })

  test('opens dropdown when trigger is clicked', () => {
    render(<Pagination {...defaultProps} />)
    
    const dropdownTrigger = document.querySelector('.pagination-dropdown-trigger')
    expect(dropdownTrigger).toBeInTheDocument()
    
    let dropdownMenu = document.querySelector('.pagination-dropdown-menu')
    expect(dropdownMenu).not.toBeInTheDocument()
    
    fireEvent.click(dropdownTrigger)
    
    dropdownMenu = document.querySelector('.pagination-dropdown-menu')
    expect(dropdownMenu).toBeInTheDocument()
  })

  test('displays all page options in dropdown', () => {
    render(<Pagination {...defaultProps} 
        total={5}
           />)
    
    const dropdownTrigger = document.querySelector('.pagination-dropdown-trigger')
    fireEvent.click(dropdownTrigger)
    
    expect(screen.getByText('Page 1')).toBeInTheDocument()
    expect(screen.getByText('Page 2')).toBeInTheDocument()
    expect(screen.getByText('Page 3')).toBeInTheDocument()
    expect(screen.getByText('Page 4')).toBeInTheDocument()
    expect(screen.getByText('Page 5')).toBeInTheDocument()
  })

  test('highlights current page in dropdown', () => {
    render(<Pagination {...defaultProps} 
        current={3}
        total={5}
           />)
    
    const dropdownTrigger = document.querySelector('.pagination-dropdown-trigger')
    fireEvent.click(dropdownTrigger)
    
    const activePage = screen.getByText('Page 3').parentElement
    expect(activePage).toHaveClass('active')
  })

  test('changes page when dropdown option is clicked', () => {
    const mockOnChange = jest.fn()
    render(<Pagination {...defaultProps} 
        onChange={mockOnChange}
        total={5}
           />)
    
    const dropdownTrigger = document.querySelector('.pagination-dropdown-trigger')
    fireEvent.click(dropdownTrigger)
    
    const page3Option = screen.getByText('Page 3')
    fireEvent.click(page3Option)
    
    expect(mockOnChange).toHaveBeenCalledWith(3)
  })

  test('closes dropdown after selecting a page', () => {
    render(<Pagination {...defaultProps} 
        total={5}
           />)
    
    const dropdownTrigger = document.querySelector('.pagination-dropdown-trigger')
    fireEvent.click(dropdownTrigger)
    
    let dropdownMenu = document.querySelector('.pagination-dropdown-menu')
    expect(dropdownMenu).toBeInTheDocument()
    
    const page3Option = screen.getByText('Page 3')
    fireEvent.click(page3Option)
    
    dropdownMenu = document.querySelector('.pagination-dropdown-menu')
    expect(dropdownMenu).not.toBeInTheDocument()
  })

  test('Prev button navigates to previous page', () => {
    const mockOnChange = jest.fn()
    render(<Pagination {...defaultProps} 
        current={3}
        onChange={mockOnChange}
           />)
    
    const prevButton = document.querySelector('.pagination-left')
    fireEvent.click(prevButton)
    
    expect(mockOnChange).toHaveBeenCalledWith(2)
  })

  test('Next button navigates to next page', () => {
    const mockOnChange = jest.fn()
    render(<Pagination {...defaultProps} 
        current={3}
        onChange={mockOnChange}
           />)
    
    const nextButton = document.querySelector('.pagination-right')
    fireEvent.click(nextButton)
    
    expect(mockOnChange).toHaveBeenCalledWith(4)
  })

  test('disables Prev button on first page', () => {
    render(<Pagination {...defaultProps} 
        current={1}
           />)
    
    const prevButton = document.querySelector('.pagination-left')
    expect(prevButton).toHaveClass('disabled')
  })

  test('disables Next button on last page', () => {
    render(<Pagination {...defaultProps} 
        current={10}
           />)
    
    const nextButton = document.querySelector('.pagination-right')
    expect(nextButton).toHaveClass('disabled')
  })

})
