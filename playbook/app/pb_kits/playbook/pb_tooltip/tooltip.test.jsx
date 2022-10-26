import React from "react";
import { cleanup, render, screen, fireEvent, waitFor } from "../utilities/test-utils";
import { Button, Tooltip } from "..";

function TooltipTest() {
  const text = "this is a text",
    placement = "top",
    triggerText = "hover me",
    zIndex = "10";

  return (
    <Tooltip
        data={{ testid: "primary-test" }}
        placement={placement}
        text={text}
        zIndex={zIndex}
    >
      <Button text={triggerText} />
    </Tooltip>
  );
}

test("renders the component", () => {
  render(<TooltipTest />);

  const kit = screen.getByTestId("primary-test");
  expect(kit).toBeInTheDocument();
  expect(kit).toHaveClass("pb_tooltip_kit");

  cleanup();
});

test("opens on mouseenter", async () => {
  render(<TooltipTest />);

  fireEvent.mouseEnter(screen.getByRole("tooltip_trigger"));
  await waitFor(() => {
    expect(screen.queryByRole("tooltip")).toBeInTheDocument();
    cleanup();
  })
});

test("closes on mouseleave", async () => {
  render(<TooltipTest />);

  fireEvent.mouseEnter(screen.getByRole("tooltip_trigger"));
  fireEvent.mouseLeave(screen.getByRole("tooltip_trigger"));

  await waitFor(() => {
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    cleanup();
  })
});
