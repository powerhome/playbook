import React from "react";
import { render, screen, act } from "../utilities/test-utils";
import PhoneNumberInput from "./_phone_number_input";

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
