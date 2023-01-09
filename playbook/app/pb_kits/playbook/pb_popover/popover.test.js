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

  test("renders Popover with z index", async () => {
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
          zIndex={3}
      >
        {"A Popover"}
      </PbReactPopover>
    );

    await fireEvent.click(screen.getByText(/click me/i));
    expect(screen.getByText("A Popover")).toHaveClass("pb_popover_body z_index_3");
  });

  test("renders Popover with max height and max width", async () => {
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
          maxHeight="150px"
          maxWidth="240px"
          offset
          placement="top"
          reference={popoverReference}
          show={useStateMock}
      >
        {"A Popover"}
      </PbReactPopover>
    );

    await fireEvent.click(screen.getByText(/click me/i));
    expect(screen.getByText("A Popover")).toHaveClass("pb_popover_body max_width_240px overflow_handling");
  });

});
