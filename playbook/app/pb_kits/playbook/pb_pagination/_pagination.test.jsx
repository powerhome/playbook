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