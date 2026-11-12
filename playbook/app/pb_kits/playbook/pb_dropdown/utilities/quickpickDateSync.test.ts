import { setQuickPickDateOnPicker } from './quickpickDateSync'

describe('Quickpick DatePicker synchronization', () => {
  test('date-only pickers retain their formatted string submission', () => {
    const picker = { config: { enableTime: false }, setDate: jest.fn() }
    setQuickPickDateOnPicker(picker, '10/21/2026', 'end')
    expect(picker.setDate).toHaveBeenCalledWith('10/21/2026', true, 'm/d/Y')
  })

  test.each([
    ['start', 0, 0],
    ['end', 23, 59],
  ] as const)('timed pickers use the %s boundary for date-only values', (bound, hours, minutes) => {
    const picker = { config: { enableTime: true }, setDate: jest.fn() }
    setQuickPickDateOnPicker(picker, '10/21/2026', bound)
    expect(picker.setDate).toHaveBeenCalledWith(new Date(2026, 9, 21, hours, minutes), true)
  })

  test('explicit custom times are preserved for the end boundary', () => {
    const picker = { config: { enableTime: true }, setDate: jest.fn() }
    setQuickPickDateOnPicker(picker, '10/21/2026 2:30 PM', 'end')
    expect(picker.setDate).toHaveBeenCalledWith(new Date(2026, 9, 21, 14, 30), true)
  })
})
