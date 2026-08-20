import React from "react";
import { render, screen, act, within, waitFor, fireEvent } from "../utilities/test-utils";
import intlTelInput from "intl-tel-input/build/js/intlTelInputWithUtils.js";
import PhoneNumberInput from "./_phone_number_input";
import PbPhoneNumberInput from "./index";

jest.mock("intl-tel-input/build/js/intlTelInputWithUtils.js", () => {
  const actual = jest.requireActual("intl-tel-input/build/js/intlTelInputWithUtils.js")
  const actualDefault = actual.default || actual
  const fn = jest.fn((input, options) => {
    const instance = actualDefault(input, options)
    jest.spyOn(instance, "destroy")
    jest.spyOn(instance, "getSelectedCountryData")
    jest.spyOn(instance, "getValidationError")
    jest.spyOn(instance, "isValidNumber")
    return instance
  })
  if (typeof actualDefault.getCountryData === "function") {
    fn.getCountryData = actualDefault.getCountryData.bind(actualDefault)
  }
  return { __esModule: true, default: fn }
})

const testId = "phoneNumberInput";

test("should be disabled", () => {
    const props = {
        disabled: true,
        id: testId,
    };

    render(<PhoneNumberInput {...props} />);
    const kit = screen.getByRole("textbox");
    expect(kit).toBeDisabled();
});

test("should be enabled by default", () => {
    const props = {
        id: testId,
    };

    render(<PhoneNumberInput {...props} />);
    const kit = screen.getByRole("textbox");
    expect(kit).not.toBeDisabled();
});

test("should have label", () => {
    const label = "Phone Number";
    const props = {
        id: testId,
        label,
    };

    render(<PhoneNumberInput {...props} />);
    const kit = screen.getByText(label);
    expect(kit).toBeInTheDocument();
});

test("should pass data prop", () => {
    const props = {
        data: { testid: testId },
        id: testId,
    };

    render(<PhoneNumberInput {...props} />);
    const kit = screen.getByTestId(testId);
    expect(kit).toBeInTheDocument();
});

test("should pass className prop", () => {
    const className = "custom-class-name";
    const props = {
        className,
        data: { testid: testId },
        id: testId,
    };

    render(<PhoneNumberInput {...props} />);
    const kit = screen.getByTestId(testId);
    expect(kit).toHaveClass(className);
});

test("should pass value prop", () => {
    const value = "1234567890";
    const props = {
        id: testId,
        value,
    };

    render(<PhoneNumberInput {...props} />);
    const kit = screen.getByRole("textbox");
    expect(kit).toHaveDisplayValue(value);
});

//TODO: test required field presence
test("should pass required prop", () => {
    const props = {
        id: testId,
    };

    render(
        <PhoneNumberInput
            required
            {...props}
        />
    );
    const kit = screen.getByRole("textbox");
    expect(kit).toHaveAttribute("required");
});

test("should have error attribute when invalid", () => {
  const props = {
      id: testId,
      error: "Something isn't right here."
  };

  render(
      <PhoneNumberInput
          {...props}
      />
  );
  const kit = screen.getByRole("textbox");
  expect(kit).toHaveAttribute("error");
});

test("should trigger callback", () => {
  const handleOnValidate = jest.fn((valid) => valid)

  const props = {
      id: testId,
      onValidate: handleOnValidate
  };

  render(
      <PhoneNumberInput
          {...props}
      />
  );

  expect(handleOnValidate).toBeCalledWith(true)
});

test("should format phone number as '555-555-5555' with formatAsYouType and 'us' country", () => {
    const props = {
        initialCountry: 'us',
        formatAsYouType: true,
        id: testId,
    };

    render(<PhoneNumberInput {...props} />);

    const input = screen.getByRole("textbox");
    
    act(() => {
        input.value = "5555555555";
        input.dispatchEvent(new Event('input', { bubbles: true }));
    });

    expect(input.value).toBe("555-555-5555");
});

test("should pass countrySearch prop to component", () => {
    window.intlTelInput = jest.fn(() => ({
      getSelectedCountryData: jest.fn(() => ({})),
      isValidNumber: jest.fn(() => true),
      getValidationError: jest.fn(() => 0),
    }));
    
    const props = {
      id: testId,
      countrySearch: true,
      data: { testid: 'phone-input-with-search' }
    };
  
    render(<PhoneNumberInput {...props} />);

    const wrapper = screen.getByTestId('phone-input-with-search');
    expect(wrapper).toBeInTheDocument();
});

test("renders required indicator asterisk when requiredIndicator is true", () => {
    const props = {
        data: { testid: testId },
        id: testId,
        label: "Required Phone Number",
        requiredIndicator: true,
    };

    render(<PhoneNumberInput {...props} />);

    const kit = screen.getByTestId(testId);
    const label = within(kit).getByText(/Required Phone Number/);
    expect(label).toBeInTheDocument();
    expect(kit).toHaveTextContent("*");
});

test("does not render required indicator asterisk when requiredIndicator is false", () => {
    const props = {
        data: { testid: testId },
        id: testId,
        label: "Phone Number",
    };

    render(<PhoneNumberInput {...props} />);

    const kit = screen.getByTestId(testId);
    const label = within(kit).getByText(/Phone Number/);
    expect(label).toBeInTheDocument();
    expect(kit).not.toHaveTextContent("*");
});

test("has no intl-tel example placeholder by default (showPlaceholder false)", async () => {
    const props = {
        id: testId,
        initialCountry: "us",
    };
    render(<PhoneNumberInput {...props} />);
    const input = screen.getByRole("textbox");
    await waitFor(() => {
        expect(input.closest(".iti")).toBeTruthy();
    });
    expect(!input.getAttribute("placeholder") || input.getAttribute("placeholder") === "").toBe(true);
});

test("optionally shows example placeholder when showPlaceholder is true; hides on focus and returns on blur if empty", async () => {
    const props = {
        id: testId,
        initialCountry: "us",
        showPlaceholder: true,
    };
    render(<PhoneNumberInput {...props} />);
    const input = screen.getByRole("textbox");

    await waitFor(() => {
        expect(input.closest(".iti")).toBeTruthy();
    });
    await waitFor(() => {
        expect((input.getAttribute("placeholder") || "").length).toBeGreaterThan(0);
    });

    const whenIdle = input.getAttribute("placeholder");

    act(() => {
        fireEvent.focus(input);
    });
    expect(input.getAttribute("placeholder") || "").toBe("");

    act(() => {
        fireEvent.blur(input);
    });
    expect(input.getAttribute("placeholder")).toBe(whenIdle);
});

test("restores latest placeholder on blur after country change", async () => {
    const props = {
        id: testId,
        initialCountry: "us",
        showPlaceholder: true,
    };

    render(<PhoneNumberInput {...props} />);
    const input = screen.getByRole("textbox");

    await waitFor(() => {
        expect(input.closest(".iti")).toBeTruthy();
    });

    // Simulate focus behavior
    act(() => {
        fireEvent.focus(input);
    });
    expect(input.getAttribute("placeholder") || "").toBe("");

    // Simulate library updating placeholder due to country change while focused.
    input.setAttribute("placeholder", "+93 123 456 7890");
    act(() => {
        input.dispatchEvent(new Event("countrychange", { bubbles: true }));
    });

    // Blur should restore the latest country placeholder.
    act(() => {
        fireEvent.blur(input);
    });
    await waitFor(() => {
        expect(input.getAttribute("placeholder")).toBe("+93 123 456 7890");
    });
});

describe("PbPhoneNumberInput enhanced element", () => {
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

  const lastIti = () => intlTelInput.mock.results[intlTelInput.mock.results.length - 1].value

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
      input: element.querySelector("input[type='tel']"),
      kit,
      textInputKit: element.querySelector(".pb_text_input_kit"),
    }
  }

  beforeEach(() => {
    intlTelInput.mockClear()
  })

  afterEach(() => {
    document.body.innerHTML = ""
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
    const { element, input } = mountKit()
    lastIti().getValidationError.mockReturnValue(2)

    input.value = "12"
    input.dispatchEvent(new Event("blur"))

    expect(element.querySelector(".pb_body_kit_negative").textContent).toBe(
      "Invalid United States phone number (too short)"
    )
    expect(element.querySelector(".pb_text_input_kit")).toHaveClass("error")
  })

  test("sets aria-invalid and aria-describedby when a validation error is shown", () => {
    const { element, input } = mountKit()
    lastIti().getValidationError.mockReturnValue(2)

    input.value = "12"
    input.dispatchEvent(new Event("blur"))

    const errorEl = element.querySelector(".pb_body_kit_negative")
    expect(errorEl).toHaveAttribute("id", "phone-error")
    expect(input).toHaveAttribute("aria-invalid", "true")
    expect(input).toHaveAttribute("aria-describedby", "phone-error")
  })

  test("clears aria-invalid and aria-describedby when the error is removed", () => {
    const { element, input } = mountKit()
    lastIti().getValidationError.mockReturnValue(2)

    input.value = "12"
    input.dispatchEvent(new Event("blur"))
    expect(input).toHaveAttribute("aria-invalid", "true")

    lastIti().getValidationError.mockReturnValue(0)
    input.value = "5555555555"
    input.dispatchEvent(new Event("blur"))

    expect(element.querySelector(".pb_body_kit_negative")).toBeNull()
    expect(input).toHaveAttribute("aria-invalid", "false")
    expect(input).not.toHaveAttribute("aria-describedby")
  })

  test("sets data-pb-phone-validation-error when required field is invalid", () => {
    const { element, input } = mountKit({ required: true }, "required")
    lastIti().getValidationError.mockReturnValue(2)

    input.value = "12"
    input.dispatchEvent(new Event("blur"))

    expect(element).toHaveAttribute("data-pb-phone-validation-error", "true")
    expect(input.validationMessage).toBe("Invalid United States phone number (too short)")
  })

  test("clears error when Default sets the value empty without an input event", async () => {
    const { element, input } = mountKit({ required: false })
    lastIti().getValidationError.mockReturnValue(2)

    input.value = "12"
    input.dispatchEvent(new Event("blur"))
    expect(element.querySelector(".pb_body_kit_negative")).toBeTruthy()
    expect(input.validity.customError).toBe(true)

    input.value = ""
    await Promise.resolve()

    expect(element.querySelector(".pb_body_kit_negative")).toBeNull()
    expect(element.querySelector(".pb_text_input_kit")).not.toHaveClass("error")
    expect(input.validity.customError).toBe(false)
  })

  test("clears stale error UI when the value is reset to empty", () => {
    const { element, input } = mountKit({ required: true }, "required")
    lastIti().getValidationError.mockReturnValue(2)

    input.value = "12"
    input.dispatchEvent(new Event("blur"))
    expect(element.querySelector(".pb_body_kit_negative")).toBeTruthy()
    expect(input.validationMessage).toBe("Invalid United States phone number (too short)")

    input.value = ""
    input.dispatchEvent(new Event("input"))

    expect(element.querySelector(".pb_body_kit_negative")).toBeNull()
    expect(element.querySelector(".pb_text_input_kit")).not.toHaveClass("error")
    expect(input.validity.customError).toBe(false)
  })

  test("shows missing phone number on submit after the value was cleared", () => {
    const { element, input } = mountKit({ required: true, name: "phone" }, "required")
    lastIti().getValidationError.mockReturnValue(2)

    input.value = "12"
    input.dispatchEvent(new Event("blur"))

    input.value = ""
    input.removeAttribute("name")
    input.dispatchEvent(new Event("input"))

    input.dispatchEvent(new Event("invalid", { bubbles: true }))

    expect(element.querySelector(".pb_body_kit_negative").textContent).toBe("Missing phone number")
    expect(element.querySelector(".pb_text_input_kit")).toHaveClass("error")
  })

  test("hides example placeholder on focus and restores it on blur when empty", () => {
    const { input } = mountKit({ showPlaceholder: true })

    expect((input.getAttribute("placeholder") || "").length).toBeGreaterThan(0)
    const whenIdle = input.getAttribute("placeholder")

    input.dispatchEvent(new Event("focus"))
    expect(input.getAttribute("placeholder")).toBe("")

    input.dispatchEvent(new Event("blur"))
    expect(input.getAttribute("placeholder")).toBe(whenIdle)
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

    expect(JSON.parse(input.getAttribute("data-phone-number")).number.replace(/\D/g, "")).toBe("5555555555")
  })

  test("unformats data-phone-number when formatAsYouType is true", () => {
    const { input } = mountKit({ formatAsYouType: true })

    input.value = "555-555-5555"
    input.dispatchEvent(new Event("input"))

    expect(JSON.parse(input.getAttribute("data-phone-number")).number).toBe("5555555555")
  })

  test("destroys intl-tel-input on disconnect", () => {
    const { kit } = mountKit()
    const iti = lastIti()
    kit.disconnect()
    expect(iti.destroy).toHaveBeenCalled()
  })
})
