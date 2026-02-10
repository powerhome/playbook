import React from 'react'
import { render, screen, fireEvent } from '../utilities/test-utils'

import { MultiLevelSelect } from 'playbook-ui'

const treeData = [
  {
    label: 'Power Home Remodeling',
    value: 'powerHomeRemodeling',
    id: 'powerhome1',
    expanded: true,
    children: [
      {
        label: 'People',
        value: 'people',
        id: 'people1',
        children: [
          {
            label: 'Talent Acquisition',
            value: 'talentAcquisition',
            id: 'talent1',
          },
          {
            label: 'Business Affairs',
            value: 'businessAffairs',
            id: 'business1',
          },
        ],
      },
      {
        label: 'Contact Center',
        value: 'contactCenter',
        id: 'contact1',
      },
    ],
  },
]

const treeDataWithDisabledOptions = [
  {
    label: 'Power Home Remodeling',
    value: 'powerHomeRemodeling',
    id: 'powerhome1',
    expanded: true,
    children: [
      {
        label: 'People',
        value: 'people',
        id: 'people1',
        disabled: true,
      },
      {
        label: 'Contact Center',
        value: 'contactCenter',
        id: 'contact1',
      },
    ],
  },
]

const treeDataWithDisabledParent = [
  {
    label: 'Power Home Remodeling',
    value: 'powerHomeRemodeling',
    id: 'powerhome1',
    expanded: true,
    disabled: true,
    children: [
      {
        label: 'People',
        value: 'people',
        id: 'people1',
      },
      {
        label: 'Contact Center',
        value: 'contactCenter',
        id: 'contact1',
      },
    ],
  },
]

const testId = "multiselect-test"

describe('MultiLevelSelect', () => {
  test('should render custom class', () => {
    render(
      <MultiLevelSelect
          className='custom-class'
          data={{ testid: testId }}
          treeData={treeData}
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('custom-class')
  })

  test('should render with default multi variant', () => {
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          treeData={treeData}
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('pb_multi_level_select')
  })

  test('should render label when provided', () => {
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          label="Select Location"
          treeData={treeData}
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveTextContent('Select Location')
  })

  test('should render error message when provided', () => {
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          error="Please select an option"
          treeData={treeData}
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveTextContent('Please select an option')
    expect(kit).toHaveClass('error')
  })

  test('should disable input when disabled prop is true', () => {
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          disabled
          treeData={treeData}
      />
    )
    const kit = screen.getByTestId(testId)
    const input = kit.querySelector('#multiselect_input')
    expect(input).toBeDisabled()
  })

  test("should render label with asterisk when requiredIndicator is true", () => {
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          label="Select Location"
          requiredIndicator
          treeData={treeData}
      />
    )
    const kit = screen.getByTestId(testId)
    const label = kit.querySelector("label")
    expect(label).toHaveTextContent("Select Location")
    expect(label).toHaveTextContent("*")
  })

  test("should render label without asterisk when requiredIndicator is false", () => {
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          label="Select Location"
          requiredIndicator={false}
          treeData={treeData}
      />
    )
    const kit = screen.getByTestId(testId)
    const label = kit.querySelector("label")
    expect(label).toHaveTextContent("Select Location")
    expect(label).not.toHaveTextContent("*")
  })
})

describe('MultiLevelSelect multi variant', () => {
  test('should render checkboxes for multi variant', () => {
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          treeData={treeData}
          variant="multi"
      />
    )
    const kit = screen.getByTestId(testId)
    const input = kit.querySelector('#multiselect_input')
    fireEvent.click(input)

    const checkboxes = kit.querySelectorAll('input[type="checkbox"]')
    expect(checkboxes.length).toBeGreaterThan(0)
  })

  test('should call onSelect when checkbox is clicked', () => {
    const mockOnSelect = jest.fn()
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          onSelect={mockOnSelect}
          treeData={treeData}
          variant="multi"
      />
    )
    const kit = screen.getByTestId(testId)
    const input = kit.querySelector('#multiselect_input')
    fireEvent.click(input)

    const checkbox = kit.querySelector('input[type="checkbox"]')
    fireEvent.click(checkbox)

    expect(mockOnSelect).toHaveBeenCalled()
  })

  test('should render disabled checkbox inputs for disabled options', () => {
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          id="multi-disabled-test"
          treeData={treeDataWithDisabledOptions}
          variant="multi"
      />
    )
    const kit = screen.getByTestId(testId)
    const input = kit.querySelector('#multi-disabled-test_input')
    fireEvent.click(input)

    const disabledCheckbox = kit.querySelector('input[type="checkbox"][disabled]')
    expect(disabledCheckbox).toBeInTheDocument()
  })
})

describe('MultiLevelSelect single variant', () => {
  test('should render radio buttons for single variant', () => {
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          treeData={treeData}
          variant="single"
      />
    )
    const kit = screen.getByTestId(testId)
    const input = kit.querySelector('#multiselect_input')
    fireEvent.click(input)

    const radios = kit.querySelectorAll('input[type="radio"]')
    expect(radios.length).toBeGreaterThan(0)
  })

  test('should render disabled radio inputs for disabled options', () => {
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          id="single-disabled-test"
          treeData={treeDataWithDisabledOptions}
          variant="single"
      />
    )
    const kit = screen.getByTestId(testId)
    const input = kit.querySelector('#single-disabled-test_input')
    fireEvent.click(input)

    const disabledRadio = kit.querySelector('input[type="radio"][disabled]')
    expect(disabledRadio).toBeInTheDocument()
  })

  test('disabled options cannot be selected', () => {
    const mockOnSelect = jest.fn()
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          id="single-disabled-click-test"
          onSelect={mockOnSelect}
          treeData={treeDataWithDisabledOptions}
          variant="single"
      />
    )
    const kit = screen.getByTestId(testId)
    const input = kit.querySelector('#single-disabled-click-test_input')
    fireEvent.click(input)

    const disabledRadio = kit.querySelector('input[type="radio"][disabled]')
    fireEvent.click(disabledRadio)

    expect(mockOnSelect).not.toHaveBeenCalled()
  })

  test('enabled options can be selected', () => {
    const mockOnSelect = jest.fn()
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          id="single-enabled-click-test"
          onSelect={mockOnSelect}
          treeData={treeDataWithDisabledOptions}
          variant="single"
      />
    )
    const kit = screen.getByTestId(testId)
    const input = kit.querySelector('#single-enabled-click-test_input')
    fireEvent.click(input)

    const enabledRadio = kit.querySelector('input[type="radio"]:not([disabled])')
    fireEvent.click(enabledRadio)

    expect(mockOnSelect).toHaveBeenCalled()
  })

  test('should close dropdown after selection', () => {
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          treeData={treeDataWithDisabledOptions}
          variant="single"
      />
    )
    const kit = screen.getByTestId(testId)
    const input = kit.querySelector('#multiselect_input')
    fireEvent.click(input)

    const enabledRadio = kit.querySelector('input[type="radio"]:not([disabled])')
    fireEvent.click(enabledRadio)

    const dropdownClosed = kit.querySelector('.dropdown_menu.close')
    expect(dropdownClosed).toBeInTheDocument()
  })

  test('should update input value after selection', () => {
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          treeData={treeDataWithDisabledOptions}
          variant="single"
      />
    )
    const kit = screen.getByTestId(testId)
    const input = kit.querySelector('#multiselect_input')
    fireEvent.click(input)

    const enabledRadio = kit.querySelector('input[type="radio"]:not([disabled])')
    fireEvent.click(enabledRadio)

    expect(input.value).toBe('Power Home Remodeling')
  })
})

describe('MultiLevelSelect disabled parent behavior', () => {
  test('children of disabled parent should also be disabled in single variant', () => {
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          treeData={treeDataWithDisabledParent}
          variant="single"
      />
    )
    const kit = screen.getByTestId(testId)
    const input = kit.querySelector('#multiselect_input')
    fireEvent.click(input)

    const radios = kit.querySelectorAll('input[type="radio"]')
    radios.forEach(radio => {
      expect(radio).toBeDisabled()
    })
  })

  test('children of disabled parent should also be disabled in multi variant', () => {
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          treeData={treeDataWithDisabledParent}
          variant="multi"
      />
    )
    const kit = screen.getByTestId(testId)
    const input = kit.querySelector('#multiselect_input')
    fireEvent.click(input)

    const checkboxes = kit.querySelectorAll('input[type="checkbox"]')
    checkboxes.forEach(checkbox => {
      expect(checkbox).toBeDisabled()
    })
  })
})

describe('MultiLevelSelect onChange callback', () => {
  test('should call onChange when selection changes in multi variant', () => {
    const mockOnChange = jest.fn()
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          onChange={mockOnChange}
          treeData={treeData}
          variant="multi"
      />
    )
    const kit = screen.getByTestId(testId)
    const input = kit.querySelector('#multiselect_input')
    fireEvent.click(input)

    const checkbox = kit.querySelector('input[type="checkbox"]')
    fireEvent.click(checkbox)

    expect(mockOnChange).toHaveBeenCalled()
  })

  test('should call onChange when selection changes in single variant', () => {
    const mockOnChange = jest.fn()
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          onChange={mockOnChange}
          treeData={treeDataWithDisabledOptions}
          variant="single"
      />
    )
    const kit = screen.getByTestId(testId)
    const input = kit.querySelector('#multiselect_input')
    fireEvent.click(input)

    const enabledRadio = kit.querySelector('input[type="radio"]:not([disabled])')
    fireEvent.click(enabledRadio)

    expect(mockOnChange).toHaveBeenCalled()
  })
})

describe('MultiLevelSelect inputName prop', () => {
  test('should use inputName for radio button name attribute', () => {
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          inputName="location_select"
          treeData={treeData}
          variant="single"
      />
    )
    const kit = screen.getByTestId(testId)
    const input = kit.querySelector('#multiselect_input')
    fireEvent.click(input)

    const radio = kit.querySelector('input[type="radio"]')
    expect(radio).toHaveAttribute('name', 'location_select')
  })
})
