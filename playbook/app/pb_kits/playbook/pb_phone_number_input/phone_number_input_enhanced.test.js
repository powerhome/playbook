import intlTelInput from "intl-tel-input/build/js/intlTelInputWithUtils.js"
import PbPhoneNumberInput from "./index"

jest.mock("intl-tel-input/build/js/intlTelInputWithUtils.js", () => {
  const itiInstance = {
    destroy: jest.fn(),
    getSelectedCountryData: jest.fn(() => ({
      dialCode: "1",
      iso2: "us",
      name: "United States",
    })),
    getValidationError: jest.fn(() => 0),
    isValidNumber: jest.fn(() => true),
  }
  const fn = jest.fn((input, options) => {
    if (options.autoPlaceholder === "polite") {
      input.setAttribute("placeholder", "+1 201-555-0123")
    }
    return itiInstance
  })
  fn.getCountryData = jest.fn(() => [{ iso2: "us", name: "United States (US)" }])
  fn._instance = itiInstance
  return { __esModule: true, default: fn }
})

const defaultConfig = {
  countrySearch: false,
  dark: false,
  disabled: false,
  error: "",
  excludeCountries: [],
  formatAsYouType: false,
  hiddenInputs: false,
  initialCountry: "us",
  name: "phone",
  onlyCountries: [],
  preferredCountries: [],
  required: false,
  showPlaceholder: false,
  strictMode: false,
}

const mountKit = (config = {}, inputAttrs = "") => {
  const mergedConfig = { ...defaultConfig, ...config }
  document.body.innerHTML = `
    <div class="pb_phone_number_input"
         data-pb-phone-number-input="true"
         data-pb-phone-number-input-config='${JSON.stringify(mergedConfig)}'>
      <div class="pb_text_input_kit mb_sm">
        <div class="text_input_wrapper" data-pb-validation-container="true">
          <input class="text_input" type="tel" id="phone" name="${mergedConfig.name}" ${inputAttrs} />
        </div>
      </div>
    </div>
  `
  const element = document.querySelector("[data-pb-phone-number-input]")
  const kit = new PbPhoneNumberInput(element)
  kit.connect()
  return {
    element,
    input: element.querySelector("input"),
    kit,
    textInputKit: element.querySelector(".pb_text_input_kit"),
  }
}

describe("PbPhoneNumberInput enhanced element", () => {
  afterEach(() => {
    document.body.innerHTML = ""
    intlTelInput.mockClear()
    intlTelInput._instance.getValidationError.mockReturnValue(0)
    intlTelInput._instance.isValidNumber.mockReturnValue(true)
    intlTelInput._instance.getSelectedCountryData.mockReturnValue({
      dialCode: "1",
      iso2: "us",
      name: "United States",
    })
  })

  test("initializes intl-tel-input with kit options", () => {
    const { input } = mountKit({
      countrySearch: true,
      formatAsYouType: true,
      initialCountry: "br",
      onlyCountries: ["br", "us"],
      preferredCountries: ["br"],
      strictMode: true,
    })

    expect(intlTelInput).toHaveBeenCalledWith(input, expect.objectContaining({
      allowDropdown: true,
      autoPlaceholder: "off",
      countrySearch: true,
      excludeCountries: [],
      formatAsYouType: true,
      initialCountry: "br",
      onlyCountries: ["br", "us"],
      countryOrder: ["br"],
      separateDialCode: true,
      strictMode: true,
    }))
  })

  test("passes hiddenInput names when hiddenInputs is true", () => {
    mountKit({ hiddenInputs: true, name: "mobile" })

    const options = intlTelInput.mock.calls[0][1]
    expect(options.hiddenInput()).toEqual({
      country: "mobile_country_code",
      phone: "mobile_full",
    })
  })

  test("does not pass hiddenInput when hiddenInputs is false", () => {
    mountKit({ hiddenInputs: false })

    const options = intlTelInput.mock.calls[0][1]
    expect(options.hiddenInput).toBeNull()
  })

  test("shows formatted error on blur when the number is too short", () => {
    intlTelInput._instance.getValidationError.mockReturnValue(2)
    const { element, input } = mountKit()

    input.value = "12"
    input.dispatchEvent(new Event("blur"))

    expect(element.querySelector(".pb_body_kit_negative").textContent).toBe(
      "Invalid United States phone number (too short)"
    )
    expect(element.querySelector(".pb_text_input_kit")).toHaveClass("error")
  })

  test("sets data-pb-phone-validation-error when required field is invalid", () => {
    intlTelInput._instance.getValidationError.mockReturnValue(2)
    const { element, input } = mountKit({ required: true }, "required")

    input.value = "12"
    input.dispatchEvent(new Event("blur"))

    expect(element).toHaveAttribute("data-pb-phone-validation-error", "true")
    expect(input.validationMessage).toBe("Invalid United States phone number (too short)")
  })

  test("hides example placeholder on focus and restores it on blur when empty", () => {
    const { input } = mountKit({ showPlaceholder: true })

    expect(input.getAttribute("placeholder")).toBe("+1 201-555-0123")

    input.dispatchEvent(new Event("focus"))
    expect(input.getAttribute("placeholder")).toBe("")

    input.dispatchEvent(new Event("blur"))
    expect(input.getAttribute("placeholder")).toBe("+1 201-555-0123")
  })

  test("toggles dropdown_open on the text input kit", () => {
    const { input, textInputKit } = mountKit()

    input.dispatchEvent(new Event("open:countrydropdown"))
    expect(textInputKit).toHaveClass("dropdown_open")

    input.dispatchEvent(new Event("close:countrydropdown"))
    expect(textInputKit).not.toHaveClass("dropdown_open")
  })

  test("writes data-phone-number on the input", () => {
    const { input } = mountKit()

    input.value = "5555555555"
    input.dispatchEvent(new Event("input"))

    expect(JSON.parse(input.getAttribute("data-phone-number"))).toEqual({
      dialCode: "1",
      iso2: "us",
      name: "United States",
      number: "5555555555",
    })
  })

  test("unformats data-phone-number when formatAsYouType is true", () => {
    const { input } = mountKit({ formatAsYouType: true })

    input.value = "555-555-5555"
    input.dispatchEvent(new Event("input"))

    expect(JSON.parse(input.getAttribute("data-phone-number")).number).toBe("5555555555")
  })

  test("destroys intl-tel-input on disconnect", () => {
    const { kit } = mountKit()
    kit.disconnect()
    expect(intlTelInput._instance.destroy).toHaveBeenCalled()
  })
})
