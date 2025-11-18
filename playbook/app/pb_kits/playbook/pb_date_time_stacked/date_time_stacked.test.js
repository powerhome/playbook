import { ensureAccessible, renderKit } from '../utilities/test-utils'
import { DateTimeStacked } from 'playbook-ui'

const currentDate = new Date()

const datetime = new Date('Wed Mar 31 2021 12:00:00 GMT-0500'),
  monthName = datetime.toLocaleString('en-US', { month: 'short' }),
  day = datetime.getDate(),
  fullYear = datetime.getFullYear(),
  optionalYear = currentDate.getFullYear() !== fullYear ? fullYear : ''

const monthDayYear = `${monthName}${day}${optionalYear}`

const props = {
  data: { testid: 'datetimestacked' },
  datetime,
}

test('Kit renders date time', () => {
  const kit = renderKit(DateTimeStacked, props)
  expect(kit).toBeInTheDocument()
})

it('Should be accessible', async () => {
  ensureAccessible(DateTimeStacked, props)
})

test('renders time in default timezone', () => {
  const kit = renderKit(DateTimeStacked, props)
  expect(kit).toHaveTextContent(`${monthDayYear}1:00pEDT`)
})

test('renders time in timezone', () => {
  props.timeZone = 'Asia/Tokyo'
  const kit = renderKit(DateTimeStacked, props)
  expect(kit).toHaveTextContent(`${monthDayYear}2:00aGMT+9`)
})

test('renders time in timezone', () => {
  props.timeZone = 'America/Denver'
  const kit = renderKit(DateTimeStacked, props)
  expect(kit).toHaveTextContent(`${monthDayYear}11:00aMDT`)
})

test('renders current year when showCurrentYear is true', () => {
  const currentYearDate = new Date()
  const currentYear = currentYearDate.getFullYear()
  
  const kit = renderKit(DateTimeStacked, {
    data: { testid: 'datetimestacked-current-year' },
    datetime: currentYearDate,
    dark: false,
    showCurrentYear: true,
  })
  expect(kit).toHaveTextContent(currentYear.toString())
})

test('hides current year by default', () => {
  const currentYearDate = new Date()
  const currentYear = currentYearDate.getFullYear()
  
  const kit = renderKit(DateTimeStacked, {
    data: { testid: 'datetimestacked-hide-year' },
    datetime: currentYearDate,
    dark: false,
  })
 
  const yearElement = kit.querySelector('.pb_caption_kit_xs')

  if (yearElement) {
    expect(yearElement.textContent).not.toBe(currentYear.toString())
  } else {

    expect(yearElement).toBeNull()
  }
})
