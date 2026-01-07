import React from 'react'
import { render, screen, SCREEN_SIZES } from '../../test-utils'
import Body from '../../../pb_body/_body'

const TEST_SUBJECT = 'body'

/**
 * Test that a global prop generates correct classnames
 *
 * @param {string} propName - The name of the global prop (e.g., 'display', 'flex')
 * @param {Array} validValues - Array of valid values to test
 * @param {Function} classnamePattern - Function that generates expected classname from value
 *   Example: (v) => `display_${v}`
 * @param {Function} responsivePattern - Optional function for responsive classnames
 *   When provided, tests responsive breakpoints (xs, sm, md, lg, xl)
 *   Example: (size, v) => `display_${size}_${v}`
 * @param {React.Component} TestComponent - Optional component to test (defaults to Body)
 *
 * @example
 * testGlobalProp(
 *   'display',
 *   ['block', 'inline', 'flex'],
 *   (v) => `display_${v}`
 * )
 */
export const testGlobalProp = (propName, validValues, classnamePattern, responsivePattern = null, TestComponent = Body) => {
  test('Global Props: returns proper class name', () => {
    validValues.forEach((value) => {
      // Test direct prop value
      const testId = `${TEST_SUBJECT}-${value}`
      render(
        <TestComponent
            {...{ [propName]: value }}
            data={{ testid: testId }}
            text="Hi"
        />
      )
      const kit = screen.getByTestId(testId)
      const expectedClassname = classnamePattern(value)
      expect(kit).toHaveClass(expectedClassname)

      // Test responsive breakpoints if pattern provided
      if (responsivePattern) {
        SCREEN_SIZES.forEach((size) => {
          const responsiveTestId = `${TEST_SUBJECT}-${value}-${size}`
          render(
            <TestComponent
                {...{ [propName]: { [size]: value } }}
                data={{ testid: responsiveTestId }}
                text="Hi"
            />
          )
          const responsiveKit = screen.getByTestId(responsiveTestId)
          const expectedResponsiveClassname = responsivePattern(size, value)
          expect(responsiveKit).toHaveClass(expectedResponsiveClassname)
        })
      }
    })
  })
}

/**
 * Test that a global prop with default key and responsive breakpoints generates correct classnames
 *
 * @param {string} propName - The name of the global prop (e.g., 'display', 'flex')
 * @param {Object} responsiveValues - Object with 'default' and responsive breakpoint keys
 *   Example: { default: "spaceAround", xs: "center", sm: "spaceAround", md: "center" }
 * @param {Function} classnamePattern - Function that generates expected classname from default value
 *   Example: (v) => `align_content_${camelToSnakeCase(v)}`
 * @param {Function} responsivePattern - Function for responsive classnames
 *   Example: (size, v) => `align_content_${size}_${camelToSnakeCase(v)}`
 * @param {React.Component} TestComponent - Optional component to test (defaults to Body)
 *
 * @example
 * testGlobalPropWithDefault(
 *   'alignContent',
 *   { default: "spaceAround", xs: "center", sm: "spaceAround", md: "center" },
 *   (v) => `align_content_${camelToSnakeCase(v)}`,
 *   (size, v) => `align_content_${size}_${camelToSnakeCase(v)}`
 * )
 */
export const testGlobalPropWithDefault = (propName, responsiveValues, classnamePattern, responsivePattern, TestComponent = Body) => {
  test('Global Props: returns proper class name with default key', () => {
    const testId = `${TEST_SUBJECT}-default-responsive`
    render(
      <TestComponent
          {...{ [propName]: responsiveValues }}
          data={{ testid: testId }}
          text="Hi"
      />
    )
    const kit = screen.getByTestId(testId)

    // Should have base class for default value
    const expectedDefaultClassname = classnamePattern(responsiveValues.default)
    expect(kit).toHaveClass(expectedDefaultClassname)

    // Should have responsive classes for screen sizes
    Object.keys(responsiveValues).forEach((size) => {
      if (size !== 'default') {
        const expectedResponsiveClassname = responsivePattern(size, responsiveValues[size])
        expect(kit).toHaveClass(expectedResponsiveClassname)
      }
    })
  })
}

