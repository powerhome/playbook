import React from "react";
import { render, screen } from "../utilities/test-utils";

import Textarea from "./_textarea";

const testId = "textarea-kit";

describe("TextArea Kit", () => {
  test("Expects to have correct classname", () => {
    render(
      <Textarea
          data={{ testid: testId }}
          label="Label"
      />
    );

    const kit = screen.getByTestId(testId);
    expect(kit).toHaveClass("pb_textarea_kit");
  });

  test("should render aria-label", () => {
    render(
      <Textarea
          aria={{ label: testId }}
          data={{ testid: testId }}
      />
    );

    const kit = screen.getByTestId(testId);
    expect(kit).toHaveAttribute("aria-label", testId);
  });

  test("Row and disable props", () => {
    render(
      <Textarea
          aria={{ label: testId }}
          data={{ testid: testId }}
          disabled={false}
          rows={7}
      />
    );

    const kit = screen.getByTestId(testId);
    const textarea = kit.querySelector("textarea");

    expect(textarea.rows).toBe(7);
    expect(textarea.disabled).toBe(false);
  });
});
