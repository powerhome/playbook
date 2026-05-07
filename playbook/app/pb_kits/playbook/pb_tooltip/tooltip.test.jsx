import React from "react";
import { cleanup, render, screen, fireEvent, waitFor } from "../utilities/test-utils";
import { Button, Tooltip } from "playbook-ui";

jest.mock("@floating-ui/react", () => {
  const actual = jest.requireActual("@floating-ui/react")

  return {
    ...actual,
    useFloating: jest.fn(actual.useFloating),
  }
})

const { useFloating } = require("@floating-ui/react")

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
    const tooltip = screen.queryByRole("tooltip");

    expect(tooltip).toBeInTheDocument();
    expect(tooltip?.closest("[data-floating-ui-portal]")).toBeInTheDocument();
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

test("closes on mouseleave", async () => {
  render(
    <Tooltip
        className={"Hello World"}
        data={{ testid: "className-test" }}
    />
  );

  const kit = screen.getByTestId("className-test");
  expect(kit).toHaveClass("Hello World");

  cleanup();
});

test("has default position absolute", async () => {
  render(<TooltipTest />);

  fireEvent.mouseEnter(screen.getByRole("tooltip_trigger"));
  await waitFor(() => {
    expect(screen.queryByRole("tooltip")).toHaveStyle({"position": "absolute"});
    expect(screen.queryByRole("tooltip")).not.toHaveStyle({"z-index": "0"});
    cleanup();
  })

  cleanup();
});

test("has position fixed", async () => {
  render(
    <Tooltip
        data={{ testid: "fixed-position-test" }}
        position="fixed"
    />
  );

  fireEvent.mouseEnter(screen.getByRole("tooltip_trigger"));
  await waitFor(() => {
    expect(screen.queryByRole("tooltip")).toHaveStyle({"position": "fixed"});
    cleanup();
  })

  cleanup();
});

test("display tooltip with showTooltip set to true", async () => {
  render(
    <Tooltip
        data={{ testid: "fixed-position-test" }}
        showTooltip
    />
  );

  fireEvent.mouseEnter(screen.getByRole("tooltip_trigger"));
  await waitFor(() => {
    expect(screen.queryByRole("tooltip")).toBeInTheDocument();
    cleanup();
  })

  cleanup();
});

test("doesn't display tooltip with showTooltip set to false", async () => {
  render(
    <Tooltip
        data={{ testid: "fixed-position-test" }}
        showTooltip={false}
    />
  );

  fireEvent.mouseEnter(screen.getByRole("tooltip_trigger"));
  await waitFor(() => {
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    cleanup();
  })

  cleanup();
});

test("keeps the arrow visible when placement flips left with center offset", async () => {
  const actual = jest.requireActual("@floating-ui/react")

  useFloating.mockImplementationOnce((options) => {
    const result = actual.useFloating(options)

    return {
      ...result,
      middlewareData: {
        ...result.middlewareData,
        arrow: {
          centerOffset: 12,
          x: 6,
          y: 10,
        },
      },
      open: true,
      placement: "left",
      x: 20,
      y: 30,
    }
  })

  render(
    <Tooltip
        data={{ testid: "left-placement-arrow-test" }}
        forceOpenTooltip
        placement="left"
        text="left placement"
        zIndex="10"
    >
      <Button text="hover me" />
    </Tooltip>
  )

  const tooltip = await screen.findByRole("tooltip")
  const arrow = tooltip.querySelector(".arrow_bg")

  expect(tooltip).toHaveAttribute("data-placement", "left")
  expect(arrow).toBeInTheDocument()
  expect(arrow).not.toHaveStyle({ opacity: "0" })
})