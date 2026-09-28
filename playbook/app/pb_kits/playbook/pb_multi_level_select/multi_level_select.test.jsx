import React from 'react'
import { render, screen, fireEvent } from '../utilities/test-utils'

import { MultiLevelSelect } from 'playbook-ui'
import PbMultiLevelSelect from './index'
import {
  addCheckedAndParentProperty,
  cloneTree,
  filterFormattedDataById,
  findByFilter,
  getAncestorsOfUnchecked,
  getCheckedItems,
  getDefaultCheckedItems,
  getExpandedItems,
  modifyRecursive,
  modifyValue,
  recursiveCheckParent,
  selectedItemsFromTree,
} from './tree_helpers'

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

  test('should use default placeholder when none is passed', () => {
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          id="mls-placeholder-default"
          treeData={treeData}
      />
    )
    expect(
      screen.getByPlaceholderText('Start typing...')
    ).toBeInTheDocument()
  })

  test('should use custom placeholder when passed', () => {
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          id="mls-placeholder-custom"
          placeholder="Choose items…"
          treeData={treeData}
      />
    )
    expect(
      screen.getByPlaceholderText('Choose items…')
    ).toBeInTheDocument()
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

  test('should format the selected input display with hierarchy context', () => {
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          formatSelectedDisplay={(item, { path }) =>
            path.map(({ label }) => label).join(' / ')
          }
          treeData={treeData}
          variant="single"
      />
    )
    const kit = screen.getByTestId(testId)
    const input = kit.querySelector('#multiselect_input')
    fireEvent.click(input)
    fireEvent.click(kit.querySelector('#people1'))

    expect(input.value).toBe('Power Home Remodeling / People')
  })

  test('should format the selected input display from selectedIds', () => {
    render(
      <MultiLevelSelect
          data={{ testid: testId }}
          formatSelectedDisplay={(item, { ancestors }) => {
            const parent = ancestors[ancestors.length - 1]
            return `${parent.label}: ${item.label}`
          }}
          selectedIds={['talent1']}
          treeData={treeData}
          variant="single"
      />
    )
    const kit = screen.getByTestId(testId)
    const input = kit.querySelector('#multiselect_input')

    expect(input.value).toBe('People: Talent Acquisition')
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

const helperTree = [
  {
    id: 'parent',
    label: 'Parent',
    children: [
      { id: 'child-a', label: 'Child A' },
      { id: 'child-b', label: 'Child B' },
    ],
  },
]

describe('MultiLevelSelect tree_helpers', () => {
  describe('addCheckedAndParentProperty', () => {
    test('adds parent_id, depth, and checks selected ids', () => {
      const formatted = addCheckedAndParentProperty(cloneTree(helperTree), ['child-a'])
      expect(formatted[0].parent_id).toBeNull()
      expect(formatted[0].depth).toBe(0)
      expect(formatted[0].children[0].parent_id).toBe('parent')
      expect(formatted[0].children[0].checked).toBe(true)
      expect(formatted[0].children[1].checked).toBe(false)
    })

    test('matches selected ids when selected_ids are numbers and tree ids are strings', () => {
      const numericTree = [
        {
          id: '101',
          label: 'Parent',
          children: [{ id: '102', label: 'Child' }],
        },
      ]
      const formatted = addCheckedAndParentProperty(cloneTree(numericTree), [102])
      expect(formatted[0].children[0].checked).toBe(true)
      expect(formatted[0].checked).toBe(false)
    })

    test('matches selected ids when selected_ids are strings and tree ids are numbers', () => {
      const numericTree = [
        {
          id: 101,
          label: 'Parent',
          children: [{ id: 102, label: 'Child' }],
        },
      ]
      const formatted = addCheckedAndParentProperty(cloneTree(numericTree), ['102'])
      expect(formatted[0].children[0].checked).toBe(true)
      expect(formatted[0].checked).toBe(false)
    })

    test('cascades checked state to children in default multi mode', () => {
      const formatted = addCheckedAndParentProperty(cloneTree(helperTree), ['parent'])
      expect(formatted[0].checked).toBe(true)
      expect(formatted[0].children[0].checked).toBe(true)
      expect(formatted[0].children[1].checked).toBe(true)
    })

    test('does not cascade when returnAllSelected is true', () => {
      const formatted = addCheckedAndParentProperty(cloneTree(helperTree), ['parent'], {
        returnAllSelected: true,
      })
      expect(formatted[0].checked).toBe(true)
      expect(formatted[0].children[0].checked).toBe(false)
    })

    test('disables children when parent is disabled', () => {
      const disabledTree = [
        {
          id: 'parent',
          label: 'Parent',
          disabled: true,
          children: [{ id: 'child-a', label: 'Child A' }],
        },
      ]
      const formatted = addCheckedAndParentProperty(cloneTree(disabledTree), [])
      expect(formatted[0].disabled).toBe(true)
      expect(formatted[0].children[0].disabled).toBe(true)
    })
  })

  describe('check cascade', () => {
    test('checking a child checks the parent when all siblings are checked', () => {
      let formatted = addCheckedAndParentProperty(cloneTree(helperTree), ['child-a'])
      const childB = filterFormattedDataById(formatted, 'child-b')[0]
      formatted = modifyValue('child-b', cloneTree(formatted), true)
      formatted = recursiveCheckParent(childB, formatted)
      expect(filterFormattedDataById(formatted, 'parent')[0].checked).toBe(true)
    })

    test('unchecking a child unchecks ancestors', () => {
      let formatted = addCheckedAndParentProperty(cloneTree(helperTree), ['parent'])
      const childA = filterFormattedDataById(formatted, 'child-a')[0]
      formatted = modifyValue('child-a', cloneTree(formatted), false)
      formatted = getAncestorsOfUnchecked(formatted, childA)
      expect(filterFormattedDataById(formatted, 'parent')[0].checked).toBe(false)
    })
  })

  describe('getDefaultCheckedItems', () => {
    test('returns the parent when all selectable children are checked', () => {
      const formatted = addCheckedAndParentProperty(cloneTree(helperTree), ['parent'])
      const selected = getDefaultCheckedItems(formatted)
      expect(selected.map((item) => item.id)).toEqual(['parent'])
    })

    test('returns only checked children when the parent is not fully checked', () => {
      const formatted = addCheckedAndParentProperty(cloneTree(helperTree), ['child-a'])
      const selected = getDefaultCheckedItems(formatted)
      expect(selected.map((item) => item.id)).toEqual(['child-a'])
    })
  })

  describe('getCheckedItems', () => {
    test('returns every checked node', () => {
      const formatted = addCheckedAndParentProperty(cloneTree(helperTree), ['parent'])
      const selected = getCheckedItems(formatted)
      expect(selected.map((item) => item.id)).toEqual([
        'parent',
        'child-a',
        'child-b',
      ])
    })
  })

  describe('findByFilter', () => {
    test('matches nested labels case-insensitively', () => {
      const formatted = addCheckedAndParentProperty(cloneTree(helperTree), [])
      const matches = findByFilter(formatted, 'child a')
      expect(matches.map((item) => item.id)).toEqual(['child-a'])
    })
  })

  describe('getExpandedItems', () => {
    test('includes ancestors of selected ids when showCheckedChildren is true', () => {
      const expanded = getExpandedItems(helperTree, ['child-a'], true)
      expect(expanded).toContain('parent')
      expect(expanded).toContain('child-a')
    })

    test('honors expanded: true even when showCheckedChildren is false', () => {
      const withExpanded = [
        { id: 'parent', label: 'Parent', expanded: true, children: [] },
      ]
      const expanded = getExpandedItems(withExpanded, [], false)
      expect(expanded).toEqual(['parent'])
    })
  })

  describe('modifyRecursive', () => {
    test('unchecks every non-disabled node', () => {
      const formatted = addCheckedAndParentProperty(cloneTree(helperTree), ['parent'])
      modifyRecursive(formatted, false)
      expect(getCheckedItems(formatted)).toEqual([])
    })
  })

  describe('selectedItemsFromTree', () => {
    test('uses default checked items for multi', () => {
      const formatted = addCheckedAndParentProperty(cloneTree(helperTree), ['parent'])
      const selected = selectedItemsFromTree(formatted, {
        returnAllSelected: false,
        variant: 'multi',
      })
      expect(selected.map((item) => item.id)).toEqual(['parent'])
    })

    test('uses the single selected item for single variant', () => {
      const formatted = addCheckedAndParentProperty(cloneTree(helperTree), ['child-a'], {
        variant: 'single',
      })
      const item = filterFormattedDataById(formatted, 'child-a')
      const selected = selectedItemsFromTree(formatted, {
        returnAllSelected: false,
        variant: 'single',
        singleSelectedItem: { item },
      })
      expect(selected.map((entry) => entry.id)).toEqual(['child-a'])
    })
  })
})

const kitHtml = ({
  treeData = helperTree,
  selectedIds = [],
  returnAllSelected = false,
  variant = 'multi',
  name = 'location',
} = {}) => `
  <div
    class="pb_multi_level_select"
    data-pb-multi-level-select="true"
    data-tree-data='${JSON.stringify(treeData)}'
    data-selected-ids='${JSON.stringify(selectedIds)}'
    data-return-all-selected="${returnAllSelected}"
    data-variant="${variant}"
    data-name="${name}"
    data-input-display="pills"
    data-placeholder="Start typing..."
    data-show-checked-children="true"
    id="mls-test"
  >
    <div class="wrapper" data-pb-mls-wrapper>
      <div class="input_wrapper" data-pb-mls-input-wrapper>
        <div class="input_inner_container" data-pb-mls-inner>
          <input data-pb-mls-search id="mls-test_input" type="text" />
        </div>
        <div data-pb-mls-arrow-down id="arrow_down_mls-test"></div>
        <div data-pb-mls-arrow-up id="arrow_up_mls-test" style="display: none;"></div>
      </div>
      <div class="dropdown_menu close" data-pb-mls-menu></div>
    </div>
    <template data-pb-mls-template="checkbox-row">
      <div>
        <li class="dropdown_item">
          <div class="dropdown_item_checkbox_row">
            <div data-pb-mls-toggle-slot></div>
            <div class="pb_checkbox_kit_off">
              <input type="checkbox" />
              <span class="pb_checkbox_label"><span class="pb_body_kit">Label</span></span>
            </div>
          </div>
          <div data-pb-mls-nested></div>
        </li>
      </div>
    </template>
    <template data-pb-mls-template="radio-row">
      <div>
        <li class="dropdown_item">
          <div class="dropdown_item_checkbox_row">
            <div data-pb-mls-toggle-slot></div>
            <div class="pb_radio_kit">
              <input type="radio" name="mls_radio" />
              <span class="pb_body_kit">Label</span>
            </div>
          </div>
          <div data-pb-mls-nested></div>
        </li>
      </div>
    </template>
    <template data-pb-mls-template="hide-radio-row">
      <div>
        <li class="dropdown_item">
          <div class="dropdown_item_checkbox_row">
            <div data-pb-mls-toggle-slot></div>
            <div class="pb_body_kit">Label</div>
          </div>
          <div data-pb-mls-nested></div>
        </li>
      </div>
    </template>
    <template data-pb-mls-template="chevron-down">
      <div class="pb_circle_icon_button_kit"></div>
    </template>
    <template data-pb-mls-template="chevron-right">
      <div class="pb_circle_icon_button_kit"></div>
    </template>
    <template data-pb-mls-template="pill">
      <div class="pb_form_pill_kit">
        <span class="pb_form_pill_tag">Label</span>
        <span class="pb_form_pill_close"></span>
      </div>
    </template>
  </div>
`

const hiddenIds = (root) =>
  [...root.querySelectorAll('input[type="hidden"][data-pb-mls-hidden]')].map(
    (input) => input.value
  )

const eventIds = (event) => (event.detail.value || []).map((item) => item.id)

const mountKit = (options) => {
  document.body.innerHTML = kitHtml(options)
  const element = document.querySelector('[data-pb-multi-level-select]')
  const events = []
  element.addEventListener('pb-multi-level-select-change', (event) => {
    events.push({
      ids: eventIds(event),
      hiddenIds: hiddenIds(element),
    })
  })
  const kit = new PbMultiLevelSelect(element)
  kit.connect()
  return { element, events, kit }
}

describe('PbMultiLevelSelect Rails enhanced element', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    delete window['clearMultiLevelSelect_mls-test']
  })

  test('does not fire during connect, including when selected_ids hydrate hidden inputs', () => {
    const { events, element } = mountKit({ selectedIds: ['child-a'] })

    expect(events).toHaveLength(0)
    expect(hiddenIds(element)).toEqual(['child-a'])
  })

  test('fires once per checkbox selection and matches hidden inputs', () => {
    const { events, element, kit } = mountKit()

    kit.handledropdownItemClick('child-a', true)

    expect(events).toHaveLength(1)
    expect(events[0].ids).toEqual(['child-a'])
    expect(events[0].hiddenIds).toEqual(['child-a'])
    expect(hiddenIds(element)).toEqual(['child-a'])
  })

  test('fires once for parent selection with the collapsed selected set', () => {
    const { events, element, kit } = mountKit()

    kit.handledropdownItemClick('parent', true)

    expect(events).toHaveLength(1)
    expect(events[0].ids).toEqual(['parent'])
    expect(events[0].hiddenIds).toEqual(['parent'])
    expect(hiddenIds(element)).toEqual(['parent'])
  })

  test('fires once for parent deselection', () => {
    const { events, kit } = mountKit({ selectedIds: ['parent'] })

    kit.handledropdownItemClick('parent', false)

    expect(events).toHaveLength(1)
    expect(events[0].ids).toEqual([])
    expect(events[0].hiddenIds).toEqual([])
  })

  test('returnAllSelected parent selection includes every checked id in both event and hiddens', () => {
    const { events, element, kit } = mountKit({ returnAllSelected: true })

    kit.handledropdownItemClick('parent', true)

    expect(events).toHaveLength(1)
    expect(events[0].ids).toEqual(['parent', 'child-a', 'child-b'])
    expect(events[0].hiddenIds).toEqual(['parent', 'child-a', 'child-b'])
    expect(hiddenIds(element)).toEqual(['parent', 'child-a', 'child-b'])
  })

  test('fires once for pill removal and matches hidden inputs', () => {
    const { events, element, kit } = mountKit({ selectedIds: ['child-a'] })

    kit.handlePillClose({ stopPropagation() {} }, 'child-a')

    expect(events).toHaveLength(1)
    expect(events[0].ids).toEqual([])
    expect(events[0].hiddenIds).toEqual([])
    expect(hiddenIds(element)).toEqual([])
  })

  test('expand/collapse does not fire a change event', () => {
    const { events, kit } = mountKit()

    kit.handleToggleClick('parent')

    expect(events).toHaveLength(0)
  })

  test('does not build option DOM during connect', () => {
    const { element } = mountKit()

    expect(element.querySelectorAll('.dropdown_item')).toHaveLength(0)
  })

  test('builds option DOM on first open', () => {
    const { element, kit } = mountKit()

    kit.openDropdown()

    expect(element.querySelectorAll('.dropdown_item').length).toBeGreaterThan(0)
  })
})
