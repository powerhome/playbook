import React from 'react'
import { render, screen } from '../../test-utils'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

// Test kits that support htmlOptions
const testKits = [Body, Button, Card, Title, Flex, Link, Badge]

describe('htmlOptions global prop', () => {
  describe('applies HTML attributes to DOM elements', () => {
    testKits.forEach((Kit) => {
      const kitName = Kit.displayName || Kit.name || 'Kit'
      
      test(`applies string attributes to ${kitName}`, () => {
        const testId = `html-options-${kitName.toLowerCase()}-string`
        render(
          <Kit
              data={{ testid: testId }}
              htmlOptions={{
                'data-test-custom': 'custom-value',
                'data-foo': 'bar',
                title: 'Tooltip text',
                lang: 'en'
              }}
              text="Test"
          />
        )
        const element = screen.getByTestId(testId)
        
        expect(element).toHaveAttribute('data-test-custom', 'custom-value')
        expect(element).toHaveAttribute('data-foo', 'bar')
        expect(element).toHaveAttribute('title', 'Tooltip text')
        expect(element).toHaveAttribute('lang', 'en')
      })

      test(`applies numeric attributes to ${kitName}`, () => {
        const testId = `html-options-${kitName.toLowerCase()}-numeric`
        // Note: Button, Link, and Badge have their own tabIndex prop that overrides htmlOptions
        const htmlOpts = ['Button', 'Link', 'Badge'].includes(kitName)
          ? {
              'data-number': 42,
              'data-zero': 0,
              'data-index': 5
            }
          : {
              tabIndex: 0,
              'data-number': 42,
              'data-zero': 0
            }
        
        render(
          <Kit
              data={{ testid: testId }}
              htmlOptions={htmlOpts}
              text="Test"
          />
        )
        const element = screen.getByTestId(testId)
        
        if (!['Button', 'Link', 'Badge'].includes(kitName)) {
          expect(element).toHaveAttribute('tabIndex', '0')
        }
        expect(element).toHaveAttribute('data-number', '42')
        expect(element).toHaveAttribute('data-zero', '0')
        if (['Button', 'Link', 'Badge'].includes(kitName)) {
          expect(element).toHaveAttribute('data-index', '5')
        }
      })

      test(`applies boolean attributes to ${kitName}`, () => {
        const testId = `html-options-${kitName.toLowerCase()}-boolean`
        render(
          <Kit
              data={{ testid: testId }}
              htmlOptions={{
                hidden: true,
                contentEditable: false,
                'data-enabled': true
              }}
              text="Test"
          />
        )
        const element = screen.getByTestId(testId)
        
        expect(element).toHaveAttribute('hidden')
        expect(element).toHaveAttribute('contentEditable', 'false')
        expect(element).toHaveAttribute('data-enabled', 'true')
      })
    })
  })

  describe('handles empty and undefined htmlOptions', () => {
    testKits.forEach((Kit) => {
      const kitName = Kit.displayName || Kit.name || 'Kit'
      
      test(`${kitName} handles empty htmlOptions object`, () => {
        const testId = `html-options-${kitName.toLowerCase()}-empty`
        render(
          <Kit
              data={{ testid: testId }}
              htmlOptions={{}}
              text="Test"
          />
        )
        const element = screen.getByTestId(testId)
        
        // Should render without errors
        expect(element).toBeInTheDocument()
      })

      test(`${kitName} handles undefined htmlOptions`, () => {
        const testId = `html-options-${kitName.toLowerCase()}-undefined`
        render(
          <Kit
              data={{ testid: testId }}
              text="Test"
          />
        )
        const element = screen.getByTestId(testId)
        
        // Should render without errors
        expect(element).toBeInTheDocument()
      })
    })
  })

  describe('interacts with other props', () => {
    test('htmlOptions overrides aria props when spread after', () => {
      const testId = 'html-options-aria-conflict'
      render(
        <Body
            aria={{ label: 'Aria label' }}
            data={{ testid: testId }}
            htmlOptions={{ 'aria-label': 'HTML options label' }}
            text="Test"
        />
      )
      const element = screen.getByTestId(testId)
      
      // htmlOptions is spread after ariaProps, so it overrides aria prop values
      // Kit spread order: {...ariaProps}, {...dataProps}, {...htmlProps}
      expect(element).toHaveAttribute('aria-label', 'HTML options label')
    })

    test('htmlOptions overrides data props when spread after', () => {
      const testId = 'html-options-data-conflict'
      render(
        <Body
            data={{ testid: testId, custom: 'data-value' }}
            htmlOptions={{ 'data-custom': 'html-options-value' }}
            text="Test"
        />
      )
      const element = screen.getByTestId(testId)
      
      // htmlOptions is spread after dataProps, so it overrides data prop values
      // Kit spread order: {...ariaProps}, {...dataProps}, {...htmlProps}
      expect(element).toHaveAttribute('data-testid', testId)
      expect(element).toHaveAttribute('data-custom', 'html-options-value')
    })

    test('className prop overrides htmlOptions className', () => {
      const testId = 'html-options-classname-conflict'
      render(
        <Body
            className="custom-class"
            data={{ testid: testId }}
            htmlOptions={{ className: 'html-options-class' }}
            text="Test"
        />
      )
      const element = screen.getByTestId(testId)
      
      // className prop is merged into classes before htmlProps spread
      // htmlOptions className would override, but className prop is set explicitly after htmlProps
      // Kit sets: className={classes} after spreading htmlProps
      expect(element).toHaveClass('custom-class')
      // htmlOptions className is overridden by the explicit className prop
    })

    test('id prop overrides htmlOptions id when set explicitly', () => {
      const testId = 'html-options-id-conflict'
      render(
        <Body
            data={{ testid: testId }}
            htmlOptions={{ id: 'html-options-id' }}
            id="prop-id"
            text="Test"
        />
      )
      const element = screen.getByTestId(testId)
      
      // id prop is set explicitly after htmlProps spread, so it overrides htmlOptions id
      // Kit sets: id={id} after spreading htmlProps
      expect(element).toHaveAttribute('id', 'prop-id')
    })
  })

  describe('handles function values', () => {
    test('htmlOptions can contain function values', () => {
      const testId = 'html-options-function'
      const onClickHandler = jest.fn()
      
      render(
        <Body
            data={{ testid: testId }}
            htmlOptions={{ onClick: onClickHandler }}
            text="Test"
        />
      )
      const element = screen.getByTestId(testId)
      
      // Function should be attached to element
      expect(element.onclick).toBeDefined()
      
      // Can trigger the handler
      element.click()
      expect(onClickHandler).toHaveBeenCalledTimes(1)
    })

    test('htmlOptions can contain multiple event handlers', () => {
      const testId = 'html-options-multiple-handlers'
      const onClick = jest.fn()
      const onDoubleClick = jest.fn()
      
      render(
        <Body
            data={{ testid: testId }}
            htmlOptions={{
              onClick,
              onDoubleClick
            }}
            text="Test"
        />
      )
      const element = screen.getByTestId(testId)
      
      // Verify handlers are attached by checking they can be called
      element.click()
      expect(onClick).toHaveBeenCalledTimes(1)
      
      element.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }))
      expect(onDoubleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('handles special HTML attributes', () => {
    test('applies data-* attributes correctly', () => {
      const testId = 'html-options-data-attributes'
      render(
        <Body
            data={{ testid: testId }}
            htmlOptions={{
              'data-cy': 'test-element',
              'data-analytics': 'track-me',
              'data-value': '123'
            }}
            text="Test"
        />
      )
      const element = screen.getByTestId(testId)
      
      expect(element).toHaveAttribute('data-cy', 'test-element')
      // Note: data prop's data-testid takes precedence over htmlOptions' data-testid
      expect(element).toHaveAttribute('data-analytics', 'track-me')
      expect(element).toHaveAttribute('data-value', '123')
    })

    test('applies aria-* attributes correctly', () => {
      const testId = 'html-options-aria-attributes'
      render(
        <Body
            data={{ testid: testId }}
            htmlOptions={{
              'aria-describedby': 'description-id',
              'aria-labelledby': 'label-id',
              'aria-live': 'polite',
              'aria-atomic': 'true'
            }}
            text="Test"
        />
      )
      const element = screen.getByTestId(testId)
      
      expect(element).toHaveAttribute('aria-describedby', 'description-id')
      expect(element).toHaveAttribute('aria-labelledby', 'label-id')
      expect(element).toHaveAttribute('aria-live', 'polite')
      expect(element).toHaveAttribute('aria-atomic', 'true')
    })

    test('applies standard HTML attributes correctly', () => {
      const testId = 'html-options-standard-attributes'
      render(
        <Body
            data={{ testid: testId }}
            htmlOptions={{
              role: 'button',
              dir: 'rtl',
              spellCheck: true,
              translate: 'no',
              draggable: false
            }}
            text="Test"
        />
      )
      const element = screen.getByTestId(testId)
      
      expect(element).toHaveAttribute('role', 'button')
      expect(element).toHaveAttribute('dir', 'rtl')
      expect(element).toHaveAttribute('spellCheck', 'true')
      expect(element).toHaveAttribute('translate', 'no')
      expect(element).toHaveAttribute('draggable', 'false')
    })
  })

  describe('handles complex htmlOptions objects', () => {
    test('applies multiple attributes of different types', () => {
      const testId = 'html-options-complex'
      const onClick = jest.fn()
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      
      render(
        <Body
            data={{ testid: testId }}
            htmlOptions={{
              // String attributes
              'data-test': 'value',
              title: 'Tooltip',
              // Numeric attributes (using data-* since tabIndex might be overridden)
              'data-count': 10,
              'data-index': 5,
              // Boolean attributes (avoiding contentEditable to prevent React warning)
              hidden: false,
              // Function attributes
              onClick,
              // Aria attributes
              'aria-label': 'Complex element',
              // Standard HTML attributes
              role: 'region',
              lang: 'fr'
            }}
            text="Test"
        />
      )
      const element = screen.getByTestId(testId)
      
      // Verify all attributes are applied
      expect(element).toHaveAttribute('data-test', 'value')
      expect(element).toHaveAttribute('title', 'Tooltip')
      expect(element).toHaveAttribute('data-count', '10')
      expect(element).toHaveAttribute('data-index', '5')
      expect(element).toHaveAttribute('aria-label', 'Complex element')
      expect(element).toHaveAttribute('role', 'region')
      expect(element).toHaveAttribute('lang', 'fr')
      
      // Verify function is attached
      element.click()
      expect(onClick).toHaveBeenCalledTimes(1)
      
      consoleSpy.mockRestore()
    })
  })

  describe('works with different kit types', () => {
    test('works with Button kit', () => {
      const testId = 'html-options-button'
      render(
        <Button
            data={{ testid: testId }}
            htmlOptions={{
              'data-button-custom': 'button-value',
              type: 'button'
            }}
            text="Click me"
        />
      )
      const element = screen.getByTestId(testId)
      
      expect(element).toHaveAttribute('data-button-custom', 'button-value')
      expect(element).toHaveAttribute('type', 'button')
    })

    test('works with Link kit', () => {
      const testId = 'html-options-link'
      render(
        <Link
            data={{ testid: testId }}
            href="#"
            htmlOptions={{
              'data-link-custom': 'link-value',
              'data-extra': 'extra-value'
            }}
            target="_blank"
            text="Link text"
        />
      )
      const element = screen.getByTestId(testId)
      
      expect(element).toHaveAttribute('data-link-custom', 'link-value')
      expect(element).toHaveAttribute('data-extra', 'extra-value')
      // Note: target and rel are set by Link's own props, not htmlOptions
      expect(element).toHaveAttribute('target', '_blank')
    })

    test('works with Card kit', () => {
      const testId = 'html-options-card'
      render(
        <Card
            data={{ testid: testId }}
            htmlOptions={{
              'data-card-custom': 'card-value',
              role: 'article'
            }}
        >
          {"Card content"}
        </Card>
      )
      const element = screen.getByTestId(testId)
      
      expect(element).toHaveAttribute('data-card-custom', 'card-value')
      expect(element).toHaveAttribute('role', 'article')
    })

    test('works with Flex kit', () => {
      const testId = 'html-options-flex'
      render(
        <Flex
            data={{ testid: testId }}
            htmlOptions={{
              'data-flex-custom': 'flex-value',
              'data-layout': 'container'
            }}
        >
          {"Flex content"}
        </Flex>
      )
      const element = screen.getByTestId(testId)
      
      expect(element).toHaveAttribute('data-flex-custom', 'flex-value')
      expect(element).toHaveAttribute('data-layout', 'container')
    })
  })

  describe('edge cases', () => {
    test('handles null values in htmlOptions', () => {
      const testId = 'html-options-null-values'
      render(
        <Body
            data={{ testid: testId }}
            htmlOptions={{
              'data-valid': 'value',
              'data-null': null,
              'data-undefined': undefined
            }}
            text="Test"
        />
      )
      const element = screen.getByTestId(testId)
      
      // Valid attribute should be present
      expect(element).toHaveAttribute('data-valid', 'value')
      // Null/undefined values might be converted to strings or omitted
      // This tests the actual behavior
      expect(element).toBeInTheDocument()
    })

    test('handles very long attribute values', () => {
      const testId = 'html-options-long-values'
      const longValue = 'a'.repeat(1000)
      
      render(
        <Body
            data={{ testid: testId }}
            htmlOptions={{
              'data-long': longValue,
              title: longValue
            }}
            text="Test"
        />
      )
      const element = screen.getByTestId(testId)
      
      expect(element).toHaveAttribute('data-long', longValue)
      expect(element).toHaveAttribute('title', longValue)
    })

    test('handles special characters in attribute values', () => {
      const testId = 'html-options-special-chars'
      render(
        <Body
            data={{ testid: testId }}
            htmlOptions={{
              'data-special': 'value with spaces & symbols!@#$%',
              title: 'Tooltip with "quotes" and \'apostrophes\''
            }}
            text="Test"
        />
      )
      const element = screen.getByTestId(testId)
      
      expect(element).toHaveAttribute('data-special', 'value with spaces & symbols!@#$%')
      expect(element).toHaveAttribute('title', 'Tooltip with "quotes" and \'apostrophes\'')
    })
  })
})
