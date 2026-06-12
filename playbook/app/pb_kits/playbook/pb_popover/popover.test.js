import React from "react";
import { render, screen, fireEvent } from "../utilities/test-utils";
import { Button, PbReactPopover } from "playbook-ui";
import {
  resolveDialogFloatingPortalHost,
  resolvePortaledKitHost,
  isPortaledFloatingKitInteraction,
  matchesPortaledMenuPointerDown,
  portaledFloatingOwnerMenusAtPoint,
  recordPortaledMenuPointerDown,
  portaledFloatingKitAtPoint,
  targetIsInsidePortaledFloatingKit,
  resolvePortaledFloatingZIndex,
  PB_PORTALED_FLOATING_Z_INDEX_MAX,
} from "../utilities/floatingPortalHosts";

const testId = "popover-kit";

//Test default popover
const PopoverTest = () => {
  const [mockState, setMockState] = React.useState(false)
  const togglePopover = () => {
    setMockState(!mockState)
  }

  const popoverReference = (
    <Button onClick={togglePopover}
        text="Click Me"
    />
  );
  return (
      <PbReactPopover
          offset
          reference={popoverReference}
          show={mockState}
      >
        {"Click Anywhere"}
      </PbReactPopover>
  )
};
//Test popover with z-index
const PopoverTestZIndex = () => {
  const [mockState, setMockState] = React.useState(false)
  const togglePopover = () => {
    setMockState(!mockState)
  }

  const popoverReference = (
    <Button onClick={togglePopover}
        text="Click Me"
    />
  );
  return (
      <PbReactPopover
          offset
          reference={popoverReference}
          show={mockState}
          zIndex={3}
      >
        {"Click Anywhere"}
      </PbReactPopover>
  )
};

//Test popover with max-height and max-width
const PopoverTestHeight = () => {
  const [mockState, setMockState] = React.useState(false)
  const togglePopover = () => {
    setMockState(!mockState)
  }

  const popoverReference = (
    <Button onClick={togglePopover}
        text="Click Me"
    />
  );
  return (
      <PbReactPopover
          maxHeight="150px"
          maxWidth="240px"
          offset
          reference={popoverReference}
          show={mockState}
      >
        {"Click Anywhere"}
      </PbReactPopover>
  )
};

//Test Popover with click to close 'anywhere'
const PopoverTestClicktoClose = () => {
  const [mockState, setMockState] = React.useState(false)
  const togglePopover = () => {
    setMockState(!mockState)
  }
  const handleShouldClosePopover = (shouldClosePopover) => {
    setMockState(!shouldClosePopover)
  }

  const popoverReference = (
    <Button onClick={togglePopover}
        text="Click Me"
    />
  );
  return (
      <PbReactPopover
          closeOnClick="any"
          offset
          reference={popoverReference}
          shouldClosePopover={handleShouldClosePopover}
          show={mockState}
      >
        {"Click Anywhere"}
      </PbReactPopover>
  )
};

//Test Popover with click to close 'inside'
const PopoverTestClicktoClose2 = () => {
  const [mockState, setMockState] = React.useState(false)
  const togglePopover = () => {
    setMockState(!mockState)
  }
  const handleShouldClosePopover = (shouldClosePopover) => {
    setMockState(!shouldClosePopover)
  }

  const popoverReference = (
    <Button onClick={togglePopover}
        text="Click Me"
    />
  );
  return (
      <PbReactPopover
          closeOnClick="inside"
          offset
          reference={popoverReference}
          shouldClosePopover={handleShouldClosePopover}
          show={mockState}
      >
        {"Click Inside"}
      </PbReactPopover>
  )
};

//Test Popover with click to close 'outside'
const PopoverTestClicktoClose3 = () => {
  const [mockState, setMockState] = React.useState(false)
  const togglePopover = () => {
    setMockState(!mockState)
  }
  const handleShouldClosePopover = (shouldClosePopover) => {
    setMockState(!shouldClosePopover)
  }

  const popoverReference = (
    <Button onClick={togglePopover}
        text="Click Me"
    />
  );
  return (
      <PbReactPopover
          closeOnClick="outside"
          offset
          reference={popoverReference}
          shouldClosePopover={handleShouldClosePopover}
          show={mockState}
      >
        {"Click Outside"}
      </PbReactPopover>
  )
};

//Test Popover with appendTo="parent"
const PopoverTestAppendToParent = () => {
  const [mockState, setMockState] = React.useState(false)
  const togglePopover = () => {
    setMockState(!mockState)
  }

  const popoverReference = (
    <Button onClick={togglePopover}
        text="Click Me"
    />
  );
  return (
    <div data-testid="parent-container"
        id="parent-container"
    >
      <PbReactPopover
          appendTo="parent"
          offset
          reference={popoverReference}
          show={mockState}
      >
        {"Appended to parent"}
      </PbReactPopover>
    </div>
  )
};

//Test Popover with appendTo CSS selector
const PopoverTestAppendToSelector = () => {
  const [mockState, setMockState] = React.useState(false)
  const togglePopover = () => {
    setMockState(!mockState)
  }

  const popoverReference = (
    <Button onClick={togglePopover}
        text="Click Me"
    />
  );
  return (
    <div data-testid="custom-container"
        id="custom-container"
    >
      <PbReactPopover
          appendTo="#custom-container"
          offset
          reference={popoverReference}
          show={mockState}
      >
        {"Appended to custom container"}
      </PbReactPopover>
    </div>
  )
};


  test("renders Popover", () => {
    render(<PopoverTest data={{ testid: testId}}/>)
    const btn = screen.getByText(/click me/i)
    fireEvent.click(btn);
    const kit = screen.getByText("Click Anywhere");
    expect(kit).toBeInTheDocument();
  });

  test("renders Popover with z index", () => {
    render(<PopoverTestZIndex data={{ testid: testId}}/>)
    const btn = screen.getByText(/click me/i)
    fireEvent.click(btn);
    const label = screen.getByText("Click Anywhere");
    const kit = label.closest(".pb_popover_body");
    expect(kit).not.toBeNull();
    expect(kit).toHaveClass("pb_popover_body", "z_index_3");
  });

  test("renders Popover with max height and max width", () => {
    render(<PopoverTestHeight data={{ testid: testId}}/>)
    const btn = screen.getByText(/click me/i)
    fireEvent.click(btn);
    const label = screen.getByText("Click Anywhere");
    const body = label.closest(".pb_popover_body");
    const scrollRegion = label.closest(".pb_popover_scroll_region");
    expect(body).not.toBeNull();
    expect(body).toHaveClass("pb_popover_body", "p_sm");
    expect(scrollRegion).not.toBeNull();
    expect(scrollRegion).toHaveClass("pb_popover_scroll_region", "overflow_handling");
  });

  test("closes Popover on click anywhere", async () => {
    render(<PopoverTestClicktoClose data={{ testid: testId}}/>)
    const btn = screen.getByText(/click me/i)
    fireEvent.click(btn);
    const kit = screen.getByText("Click Anywhere");
    expect(kit).toBeInTheDocument();
    fireEvent.click(document.body);

    expect(kit).not.toBeInTheDocument;
  });

  test("closes Popover on click inside", async () => {
    render(<PopoverTestClicktoClose2 data={{ testid: testId}}/>)
    const btn = screen.getByText(/click me/i)
    fireEvent.click(btn);
    const kit = screen.getByText("Click Inside");
    expect(kit).toBeInTheDocument();
    fireEvent.click(kit);

    expect(kit).not.toBeInTheDocument;
  });

  test("closes Popover on click outside", async () => {
    render(<PopoverTestClicktoClose3 data={{ testid: testId}}/>)
    const btn = screen.getByText(/click me/i)
    fireEvent.click(btn);
    const kit = screen.getByText("Click Outside");
    expect(kit).toBeInTheDocument();
    fireEvent.click(kit);
    expect(kit).toBeInTheDocument();
    fireEvent.click(btn);

    expect(kit).not.toBeInTheDocument;
  });

  test("renders Popover with appendTo parent", () => {
    render(<PopoverTestAppendToParent data={{ testid: testId}}/>)
    const btn = screen.getByText(/click me/i)
    fireEvent.click(btn);
    const kit = screen.getByText("Appended to parent");
    expect(kit).toBeInTheDocument();
    
    // Check that the popover is rendered inside the parent container
    const parentContainer = screen.getByTestId("parent-container");
    expect(parentContainer).toContainElement(kit);
  });

  test("renders Popover with appendTo CSS selector", () => {
    render(<PopoverTestAppendToSelector data={{ testid: testId}}/>)
    const btn = screen.getByText(/click me/i)
    fireEvent.click(btn);
    const kit = screen.getByText("Appended to custom container");
    expect(kit).toBeInTheDocument();
    
    // Check that the popover is rendered inside the custom container
    const customContainer = screen.getByTestId("custom-container");
    expect(customContainer).toContainElement(kit);
  });

describe("Popover portaled kit portal host", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("resolveDialogFloatingPortalHost returns floating root inside popover tooltip", () => {
    const pop = document.createElement("div");
    pop.className = "pb_popover_tooltip";
    const body = document.createElement("div");
    body.className = "pb_popover_body";
    const floating = document.createElement("div");
    floating.setAttribute("data-pb-dialog-floating-root", "true");
    const inner = document.createElement("div");
    body.appendChild(floating);
    body.appendChild(inner);
    pop.appendChild(body);
    document.body.appendChild(pop);

    expect(resolveDialogFloatingPortalHost(inner)).toBe(floating);
  });

  test("resolveDialogFloatingPortalHost ignores nested dialog floating roots", () => {
    const outerDialog = document.createElement("dialog");
    outerDialog.id = "bulk-update-dialog";
    const scroll = document.createElement("div");
    scroll.className = "pb_dialog_scroll_region";
    const nestedDialog = document.createElement("dialog");
    nestedDialog.setAttribute("data-confirmation-modal", "true");
    const nestedScroll = document.createElement("div");
    nestedScroll.className = "pb_dialog_scroll_region";
    const nestedFloating = document.createElement("div");
    nestedFloating.className = "pb_dialog_floating_root";
    nestedFloating.setAttribute("data-pb-dialog-floating-root", "true");
    nestedDialog.appendChild(nestedScroll);
    nestedDialog.appendChild(nestedFloating);
    const kit = document.createElement("div");
    kit.className = "pb_multi_level_select";
    scroll.appendChild(nestedDialog);
    scroll.appendChild(kit);
    const outerFloating = document.createElement("div");
    outerFloating.className = "pb_dialog_floating_root";
    outerFloating.setAttribute("data-pb-dialog-floating-root", "true");
    outerFloating.setAttribute("data-pb-floating-owner", "bulk-update-dialog");
    outerDialog.appendChild(scroll);
    outerDialog.appendChild(outerFloating);
    document.body.appendChild(outerDialog);

    expect(resolveDialogFloatingPortalHost(kit)).toBe(outerFloating);
    expect(resolvePortaledKitHost(kit, null)).toBe(outerFloating);
  });

  test("resolvePortaledKitHost uses document.body when kit is in popover tooltip", () => {
    const pop = document.createElement("div");
    pop.className = "pb_popover_tooltip show";
    const kit = document.createElement("div");
    pop.appendChild(kit);
    document.body.appendChild(pop);

    expect(resolvePortaledKitHost(kit, null)).toBe(document.body);
  });

  test("targetIsInsidePortaledFloatingKit is scoped to owner id", () => {
    const portalA = document.createElement("div");
    portalA.className = "typeahead-kit-select__menu-portal";
    portalA.setAttribute("data-pb-floating-owner", "filter-a");
    const optionA = document.createElement("div");
    portalA.appendChild(optionA);

    const portalB = document.createElement("div");
    portalB.className = "typeahead-kit-select__menu-portal";
    portalB.setAttribute("data-pb-floating-owner", "filter-b");
    document.body.appendChild(portalA);
    document.body.appendChild(portalB);

    expect(targetIsInsidePortaledFloatingKit(optionA, "filter-a")).toBe(true);
    expect(targetIsInsidePortaledFloatingKit(optionA, "filter-b")).toBe(false);
    expect(targetIsInsidePortaledFloatingKit(document.createElement("button"), "filter-a")).toBe(
      false,
    );
  });

  test("isPortaledFloatingKitInteraction falls back to point hit-test when available", () => {
    const portal = document.createElement("div");
    portal.className = "pb_time_picker_floating_shell";
    portal.setAttribute("data-pb-floating-owner", "filter-a");
    const option = document.createElement("div");
    option.className = "time_dropdown_option";
    portal.appendChild(option);
    document.body.appendChild(portal);

    expect(isPortaledFloatingKitInteraction(option, "filter-a")).toBe(true);
    expect(isPortaledFloatingKitInteraction(option, "filter-b")).toBe(false);

    const elementsFromPoint = jest
      .spyOn(document, "elementsFromPoint")
      .mockReturnValue([option]);

    expect(isPortaledFloatingKitInteraction(document.body, "filter-a", 10, 20)).toBe(
      true,
    );
    expect(portaledFloatingKitAtPoint(10, 20, "filter-b")).toBe(false);

    elementsFromPoint.mockRestore();
  });

  test("portaledFloatingOwnerMenusAtPoint hit-tests owned menu bounding rects", () => {
    const shell = document.createElement("div");
    shell.className = "pb_time_picker_floating_shell";
    shell.setAttribute("data-pb-floating-owner", "filter-a");
    const dropdown = document.createElement("div");
    dropdown.className = "time_dropdown";
    shell.appendChild(dropdown);
    document.body.appendChild(shell);

    dropdown.getBoundingClientRect = () => ({
      left: 5,
      top: 10,
      right: 65,
      bottom: 210,
      width: 60,
      height: 200,
      x: 5,
      y: 10,
      toJSON: () => ({}),
    });

    const elementsFromPoint = jest
      .spyOn(document, "elementsFromPoint")
      .mockReturnValue([document.body]);

    expect(portaledFloatingOwnerMenusAtPoint(30, 100, "filter-a")).toBe(true);
    expect(portaledFloatingOwnerMenusAtPoint(30, 100, "filter-b")).toBe(false);
    expect(isPortaledFloatingKitInteraction(document.body, "filter-a", 30, 100)).toBe(
      true,
    );

    elementsFromPoint.mockRestore();
  });

  test("isPortaledFloatingKitInteraction matches portaled menu mousedown before click", () => {
    recordPortaledMenuPointerDown("filter-a", 30, 100);

    expect(matchesPortaledMenuPointerDown("filter-a", 30, 100)).toBe(true);
    expect(matchesPortaledMenuPointerDown("filter-b", 30, 100)).toBe(false);
    expect(isPortaledFloatingKitInteraction(document.body, "filter-a", 30, 100)).toBe(
      true,
    );
  });

  test("resolvePortaledFloatingZIndex caps all portaled hosts below 10010", () => {
    expect(resolvePortaledFloatingZIndex(document.body, "100100")).toBe(
      String(PB_PORTALED_FLOATING_Z_INDEX_MAX),
    );
    expect(resolvePortaledFloatingZIndex(document.body, "1002")).toBe("1002");

    const dialogHost = document.createElement("div");
    expect(resolvePortaledFloatingZIndex(dialogHost, "100100")).toBe(
      String(PB_PORTALED_FLOATING_Z_INDEX_MAX),
    );
    expect(resolvePortaledFloatingZIndex(dialogHost, "1005")).toBe("1005");
  });
});