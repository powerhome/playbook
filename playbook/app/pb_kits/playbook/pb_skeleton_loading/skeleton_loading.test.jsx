import React from 'react'
import { render, screen } from '@testing-library/react'
import { ensureAccessible } from '../utilities/test-utils'
import SkeletonLoading from '../../pb_skeleton_loading/_skeleton_loading'

/* See these resources for more testing info:
  - https://github.com/testing-library/jest-dom#usage for useage and examples
  - https://jestjs.io/docs/en/using-matchers
*/

describe('SkeletonLoading', () => {
  const defaultProps = {
    data: { testid: 'skeleton-loading' }
  }

  it('should be accessible', async () => {
    ensureAccessible(SkeletonLoading, defaultProps)
  })

  it('renders with default props', () => {
    const { container } = render(<SkeletonLoading {...defaultProps} />)
    const skeleton = screen.getByTestId('skeleton-loading')
    
    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveClass('pb_skeleton_loading')
    expect(container.querySelectorAll('div[class*="border_radius_"]')).toHaveLength(1)
  })

  it('renders multiple skeleton items based on stack prop', () => {
    const props = {
      ...defaultProps,
      stack: 3
    }
    const { container } = render(<SkeletonLoading {...props} />)
    
    expect(container.querySelectorAll('div[class*="border_radius_"]')).toHaveLength(3)
  })

  it('applies custom styles correctly', () => {
    const props = {
      ...defaultProps,
      height: '24px',
      width: '50%',
      borderRadius: 'lg',
      color: 'light',
      dark: true
    }
    const { container } = render(<SkeletonLoading {...props} />)
    const skeletonItem = container.querySelector('div[class*="border_radius_"]')

    expect(skeletonItem).toHaveClass('border_radius_lg')
    expect(skeletonItem).toHaveClass('dark')
  })

  it('applies gap class to items after first one', () => {
    const props = {
      ...defaultProps,
      stack: 3,
      gap: 'md'
    }
    const { container } = render(<SkeletonLoading {...props} />)
    const skeletonItems = container.querySelectorAll('div[class*="border_radius_"]')
    
    expect(skeletonItems[0]).not.toHaveClass('gap_md')
    expect(skeletonItems[1]).toHaveClass('gap_md')
    expect(skeletonItems[2]).toHaveClass('gap_md')
  })

  it('handles no gap properly', () => {
    const props = {
      ...defaultProps,
      stack: 2,
      gap: 'none'
    }
    const { container } = render(<SkeletonLoading {...props} />)
    const skeletonItems = container.querySelectorAll('div[class*="border_radius_"]')
    
    expect(skeletonItems[0]).not.toHaveClass('gap_none')
    expect(skeletonItems[1]).not.toHaveClass('gap_none')
  })
})