import { ensureAccessible, renderKit } from '../utilities/test-utils'
import { DateTimeStacked } from '../'

/* eslint-disable jsx-control-statements/jsx-jcs-no-undef */

const props = {
  data: { testid: 'datetimestacked' },
  datetime: new Date('Wed Mar 31 2021 12:00:00 GMT-0500'),
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
  expect(kit).toHaveTextContent(/Mar311:00pEDT/i)
})

test('renders time in timezone', () => {
  props.timeZone = 'Asia/Tokyo'
  const kit = renderKit(DateTimeStacked, props)
  expect(kit).toHaveTextContent(/Mar312:00aJST/i)
})

test('renders time in timezone', () => {
  props.timeZone = 'America/Denver'
  const kit = renderKit(DateTimeStacked, props)
  expect(kit).toHaveTextContent(/Mar3111:00aMDT/i)
})
