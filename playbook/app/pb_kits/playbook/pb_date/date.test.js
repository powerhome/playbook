import React from 'react'
import { render, screen } from '../utilities/test-utils'
import PbDate from './_date'
import DateTime from '../pb_kit/dateTime'

// Mock DateTime utility functions
jest.mock('../pb_kit/dateTime', () => ({
  toWeekday: jest.fn(),
  toMonth: jest.fn(),
  toDay: jest.fn(),
  toYear: jest.fn(),
}))

// Set test date
const TEST_DATE = new Date('2025-08-19T10:30:00Z') // Monday, August 19, 2025
const CURRENT_YEAR = new Date().getFullYear()

describe('PbDate Kit', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks()

    // Set up default mock returns
    DateTime.toWeekday.mockReturnValue('Monday')
    DateTime.toMonth.mockReturnValue('August')
    DateTime.toDay.mockReturnValue('19')
    DateTime.toYear.mockReturnValue(2025)

    // Mock console.error to avoid noise in tests
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    console.error.mockRestore()
  })

  // Default Props
  describe('Default Props', () => {
    test('renders with minimal required props', () => {
      const testId = 'pb-date-default'
      render(
        <PbDate
            data={{ testid: testId }}
            value={TEST_DATE}
        />
      )

      const kit = screen.getByTestId(testId)
      expect(kit).toBeInTheDocument()
      expect(kit).toHaveClass('pb_date_kit_left')
    })

    test('displays date in default format without day of week', () => {
      // Mock current year to test hiding logic
      DateTime.toYear.mockReturnValue(CURRENT_YEAR)

      const testId = 'pb-date-format'
      render(
        <PbDate
            data={{ testid: testId }}
            value={TEST_DATE}
        />
      )

      const kit = screen.getByTestId(testId)
      expect(kit).toHaveTextContent('August 19')
      expect(kit).not.toHaveTextContent('Monday')
      expect(kit).not.toHaveTextContent(`, ${CURRENT_YEAR}`)
    })

    test('applies default CSS classes', () => {
      const testId = 'pb-date-css'
      render(
        <PbDate
            data={{ testid: testId }}
            value={TEST_DATE}
        />
      )

      const kit = screen.getByTestId(testId)
      expect(kit).toHaveClass('pb_date_kit_left')
    })
  })

  // Prop Variations
  describe('Prop Variations', () => {
    test('renders with showDayOfWeek enabled', () => {
      const testId = 'pb-date-weekday'
      render(
        <PbDate
            data={{ testid: testId }}
            showDayOfWeek
            value={TEST_DATE}
        />
      )

      const kit = screen.getByTestId(testId)
      expect(kit).toHaveTextContent('Monday')
      expect(kit).toHaveTextContent('•')
      expect(kit).toHaveTextContent('August 19')
    })

    test('renders with showCurrentYear enabled', () => {
      const testId = 'pb-date-current-year'
      render(
        <PbDate
            data={{ testid: testId }}
            showCurrentYear
            value={TEST_DATE}
        />
      )

      const kit = screen.getByTestId(testId)
      expect(kit).toHaveTextContent(', 2025')
    })

    test('renders with showIcon enabled for medium size', () => {
      const testId = 'pb-date-icon-md'
      render(
        <PbDate
            data={{ testid: testId }}
            showIcon
            size="md"
            value={TEST_DATE}
        />
      )

      const kit = screen.getByTestId(testId)
      const iconContainer = kit.querySelector('.pb_icon_kit_container')
      expect(iconContainer).toBeInTheDocument()
    })

    test('renders with showIcon enabled for small size', () => {
      const testId = 'pb-date-icon-sm'
      render(
        <PbDate
            data={{ testid: testId }}
            showIcon
            size="sm"
            value={TEST_DATE}
        />
      )

      const kit = screen.getByTestId(testId)
      const iconContainer = kit.querySelector('.pb_icon_kit_container')
      expect(iconContainer).toBeInTheDocument()
    })

    test('renders different sizes correctly', () => {
      const sizes = ['sm', 'md', 'lg']

      sizes.forEach(size => {
        const testId = `pb-date-size-${size}`
        render(
          <PbDate
              data={{ testid: testId }}
              size={size}
              value={TEST_DATE}
          />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toBeInTheDocument()

        expect(kit).toHaveTextContent('August 19')
      })
    })

    test('renders different alignments correctly', () => {
      const alignments = ['left', 'center', 'right']

      alignments.forEach(alignment => {
        const testId = `pb-date-align-${alignment}`
        render(
          <PbDate
              alignment={alignment}
              data={{ testid: testId }}
              value={TEST_DATE}
          />
        )

        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass(`pb_date_kit_${alignment}`)
      })
    })

    test('renders in dark mode', () => {
      const testId = 'pb-date-dark'
      render(
        <PbDate
            dark
            data={{ testid: testId }}
            value={TEST_DATE}
        />
      )

      const kit = screen.getByTestId(testId)
      expect(kit).toBeInTheDocument()
    })

    test('renders in unstyled mode', () => {
      const testId = 'pb-date-unstyled'
      render(
        <PbDate
            data={{ testid: testId }}
            showDayOfWeek
            showIcon
            unstyled
            value={TEST_DATE}
        />
      )

      const kit = screen.getByTestId(testId)
      expect(kit).toHaveTextContent('Monday')
      expect(kit).toHaveTextContent('•')
      expect(kit).toHaveTextContent('August 19')

      expect(kit.querySelector('.pb_title_kit')).not.toBeInTheDocument()
      expect(kit.querySelector('.pb_caption_kit')).not.toBeInTheDocument()
    })

    test('applies custom className', () => {
      const testId = 'pb-date-custom-class'
      const customClass = 'my-custom-date-class'

      render(
        <PbDate
            className={customClass}
            data={{ testid: testId }}
            value={TEST_DATE}
        />
      )

      const kit = screen.getByTestId(testId)
      expect(kit).toHaveClass(customClass)
    })

    test('applies custom id', () => {
      const customId = 'my-custom-date-id'

      render(
        <PbDate
            id={customId}
            value={TEST_DATE}
        />
      )

      const kit = document.getElementById(customId)
      expect(kit).toBeInTheDocument()
      expect(kit).toHaveAttribute('id', customId)
    })
  })

  // Year Display
  describe('Year Display Logic', () => {
    test('hides current year by default', () => {
      DateTime.toYear.mockReturnValue(CURRENT_YEAR)

      const testId = 'pb-date-current-year-hidden'
      render(
        <PbDate
            data={{ testid: testId }}
            value={TEST_DATE}
        />
      )

      const kit = screen.getByTestId(testId)
      expect(kit).not.toHaveTextContent(`, ${CURRENT_YEAR}`)
    })

    test('shows current year when showCurrentYear is true', () => {
      DateTime.toYear.mockReturnValue(CURRENT_YEAR)

      const testId = 'pb-date-force-current-year'
      render(
        <PbDate
            data={{ testid: testId }}
            showCurrentYear
            value={TEST_DATE}
        />
      )

      const kit = screen.getByTestId(testId)
      expect(kit).toHaveTextContent(`, ${CURRENT_YEAR}`)
    })

    test('shows non-current year automatically', () => {
      const pastYear = CURRENT_YEAR - 1
      DateTime.toYear.mockReturnValue(pastYear)

      const testId = 'pb-date-past-year'
      render(
        <PbDate
            data={{ testid: testId }}
            value={TEST_DATE}
        />
      )

      const kit = screen.getByTestId(testId)
      expect(kit).toHaveTextContent(`, ${pastYear}`)
    })

    test('shows future year automatically', () => {
      const futureYear = CURRENT_YEAR + 1
      DateTime.toYear.mockReturnValue(futureYear)

      const testId = 'pb-date-future-year'
      render(
        <PbDate
            data={{ testid: testId }}
            value={TEST_DATE}
        />
      )

      const kit = screen.getByTestId(testId)
      expect(kit).toHaveTextContent(`, ${futureYear}`)
    })
  })

  // Edge Cases
  describe('Edge Cases', () => {
    test('handles leap year date', () => {
      const leapYearDate = new Date('2024-02-29T12:00:00Z')
      DateTime.toMonth.mockReturnValue('February')
      DateTime.toDay.mockReturnValue('29')
      DateTime.toYear.mockReturnValue(2024)
      DateTime.toWeekday.mockReturnValue('Thursday')

      const testId = 'pb-date-leap-year'
      render(
        <PbDate
            data={{ testid: testId }}
            value={leapYearDate}
        />
      )

      const kit = screen.getByTestId(testId)
      expect(kit).toHaveTextContent('February 29')
    })

    test('handles beginning of year', () => {
      const newYearDate = new Date('2023-01-01T00:00:00Z')
      DateTime.toMonth.mockReturnValue('January')
      DateTime.toDay.mockReturnValue('1')
      DateTime.toYear.mockReturnValue(2023)
      DateTime.toWeekday.mockReturnValue('Sunday')

      const testId = 'pb-date-new-year'
      render(
        <PbDate
            data={{ testid: testId }}
            value={newYearDate}
        />
      )

      const kit = screen.getByTestId(testId)
      expect(kit).toHaveTextContent('January 1')
    })

    test('handles end of year', () => {
      const endYearDate = new Date('2023-12-31T23:59:59Z')
      DateTime.toMonth.mockReturnValue('December')
      DateTime.toDay.mockReturnValue('31')
      DateTime.toYear.mockReturnValue(2023)
      DateTime.toWeekday.mockReturnValue('Sunday')

      const testId = 'pb-date-end-year'
      render(
        <PbDate
            data={{ testid: testId }}
            value={endYearDate}
        />
      )

      const kit = screen.getByTestId(testId)
      expect(kit).toHaveTextContent('December 31')
    })

    test('handles very old date', () => {
      const oldDate = new Date('1900-01-01T00:00:00Z')
      DateTime.toMonth.mockReturnValue('January')
      DateTime.toDay.mockReturnValue('1')
      DateTime.toYear.mockReturnValue(1900)
      DateTime.toWeekday.mockReturnValue('Monday')

      const testId = 'pb-date-old'
      render(
        <PbDate
            data={{ testid: testId }}
            value={oldDate}
        />
      )

      const kit = screen.getByTestId(testId)
      expect(kit).toHaveTextContent('January 1')
      expect(kit).toHaveTextContent(', 1900')
    })

    test('handles far future date', () => {
      const futureDate = new Date('2099-12-31T23:59:59Z')
      DateTime.toMonth.mockReturnValue('December')
      DateTime.toDay.mockReturnValue('31')
      DateTime.toYear.mockReturnValue(2099)
      DateTime.toWeekday.mockReturnValue('Friday')

      const testId = 'pb-date-future'
      render(
        <PbDate
            data={{ testid: testId }}
            value={futureDate}
        />
      )

      const kit = screen.getByTestId(testId)
      expect(kit).toHaveTextContent('December 31')
      expect(kit).toHaveTextContent(', 2099')
    })
  })

  // Accessibility and HTML
  describe('Accessibility and HTML Attributes', () => {
    test('applies aria attributes correctly', () => {
      const testId = 'pb-date-aria'
      const ariaLabel = 'Custom date label'

      render(
        <PbDate
            aria={{ label: ariaLabel }}
            data={{ testid: testId }}
            value={TEST_DATE}
        />
      )

      const kit = screen.getByTestId(testId)
      expect(kit).toHaveAttribute('aria-label', ariaLabel)
    })

    test('applies data attributes correctly', () => {
      const testId = 'pb-date-data'
      const customData = 'custom-value'

      render(
        <PbDate
            data={{ testid: testId, custom: customData }}
            value={TEST_DATE}
        />
      )

      const kit = screen.getByTestId(testId)
      expect(kit).toHaveAttribute('data-custom', customData)
    })

    test('applies HTML options correctly', () => {
      const testId = 'pb-date-html'
      const title = 'Custom title'

      render(
        <PbDate
            data={{ testid: testId }}
            htmlOptions={{ title }}
            value={TEST_DATE}
        />
      )

      const kit = screen.getByTestId(testId)
      expect(kit).toHaveAttribute('title', title)
    })
  })

  // Componenet Integration
  describe('Component Integration', () => {
    test('calls DateTime utility functions correctly', () => {
      render(
        <PbDate value={TEST_DATE} />
      )

      expect(DateTime.toWeekday).toHaveBeenCalledWith(TEST_DATE)
      expect(DateTime.toMonth).toHaveBeenCalledWith(TEST_DATE)
      expect(DateTime.toDay).toHaveBeenCalledWith(TEST_DATE)
      expect(DateTime.toYear).toHaveBeenCalledWith(TEST_DATE)
    })

    test('renders all components together correctly', () => {
      const testId = 'pb-date-full-featured'
      render(
        <PbDate
            alignment="center"
            data={{ testid: testId }}
            showDayOfWeek
            showIcon
            size="lg"
            value={TEST_DATE}
        />
      )

      const kit = screen.getByTestId(testId)
      expect(kit).toHaveClass('pb_date_kit_center')
      expect(kit).toHaveTextContent('Monday')
      expect(kit).toHaveTextContent('•')
      expect(kit).toHaveTextContent('August 19')

      const iconContainer = kit.querySelector('.pb_icon_kit_container')
      expect(iconContainer).toBeInTheDocument()
    })
  })
})