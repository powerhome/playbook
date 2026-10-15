import {
  dateHasExplicitTime,
  endOfDay,
  parseQuickPickDateOnly,
  setQuickPickDateOnPicker,
  startOfDay,
  stringHasExplicitTime,
} from "./quickpickDateSync"

describe("quickpickDateSync", () => {
  describe("stringHasExplicitTime", () => {
    it("returns false for date-only m/d/Y strings", () => {
      expect(stringHasExplicitTime("10/15/2026")).toBe(false)
    })

    it("returns true when a time is present", () => {
      expect(stringHasExplicitTime("10/15/2026 2:30 PM")).toBe(true)
      expect(stringHasExplicitTime("2026-10-15T14:30:00")).toBe(true)
    })
  })

  describe("dateHasExplicitTime", () => {
    it("treats midnight and end-of-day as non-explicit", () => {
      expect(dateHasExplicitTime(startOfDay(new Date(2026, 9, 15)))).toBe(false)
      expect(dateHasExplicitTime(endOfDay(new Date(2026, 9, 15)))).toBe(false)
    })

    it("treats other times as explicit", () => {
      expect(dateHasExplicitTime(new Date(2026, 9, 15, 14, 30))).toBe(true)
    })
  })

  describe("setQuickPickDateOnPicker", () => {
    it("uses m/d/Y for date-only pickers", () => {
      const setDate = jest.fn()
      setQuickPickDateOnPicker(
        { setDate, config: { enableTime: false } },
        "10/15/2026",
        "start",
      )
      expect(setDate).toHaveBeenCalledWith("10/15/2026", true, "m/d/Y")
    })

    it("applies start of day and end of day when enableTime and date-only", () => {
      const startSetDate = jest.fn()
      const endSetDate = jest.fn()

      setQuickPickDateOnPicker(
        { setDate: startSetDate, config: { enableTime: true } },
        "10/15/2026",
        "start",
      )
      setQuickPickDateOnPicker(
        { setDate: endSetDate, config: { enableTime: true } },
        "10/15/2026",
        "end",
      )

      const startDate = startSetDate.mock.calls[0][0] as Date
      const endDate = endSetDate.mock.calls[0][0] as Date
      expect(startDate.getHours()).toBe(0)
      expect(startDate.getMinutes()).toBe(0)
      expect(startDate.getSeconds()).toBe(0)
      expect(endDate.getHours()).toBe(23)
      expect(endDate.getMinutes()).toBe(59)
      expect(endDate.getSeconds()).toBe(59)
      expect(startSetDate.mock.calls[0][2]).toBeUndefined()
      expect(endSetDate.mock.calls[0][2]).toBeUndefined()
    })

    it("preserves explicitly configured times", () => {
      const setDate = jest.fn()
      setQuickPickDateOnPicker(
        { setDate, config: { enableTime: true } },
        "10/15/2026 2:30 PM",
        "end",
      )
      expect(setDate).toHaveBeenCalledWith("10/15/2026 2:30 PM", true)
    })

    it("parses date-only m/d/Y locally", () => {
      expect(parseQuickPickDateOnly("10/15/2026")).toEqual(new Date(2026, 9, 15))
    })
  })
})
