import React from "react";
import { render, screen, fireEvent } from "../utilities/test-utils";
import { Button, PbReactPopover } from "..";

const testId = "popover-kit";

describe("Popover Kit", () => {
  test("renders Popover and Popover classname", async () => {
    const setStateMock = jest.fn();
    const useStateMock = (useState) => [useState, setStateMock];
    jest.spyOn(React, "useState").mockImplementationOnce(useStateMock);
    const popoverReference = (
      <Button onClick={setStateMock(!useStateMock)} 
          text="Click Me"
       />
    );

  render(
      <PbReactPopover
          data={{ testid: testId }}
          offset
          placement="top"
          reference={popoverReference}
          show={useStateMock}
      >
        {"A Popover"}
      </PbReactPopover>
    );

    await fireEvent.click(screen.getByText(/click me/i));
    const kit = screen.getByTestId(testId);
    expect(screen.getByText("A Popover")).toBeInTheDocument();
    expect(kit).toHaveClass("pb_popover_kit");
  });

});
