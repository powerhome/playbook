import React from "react";
import { render, screen, fireEvent } from "../utilities/test-utils";
import { Button, PbReactPopover } from "playbook-ui";
import {
  resolveDialogFloatingPortalHost,
  resolvePortaledKitHost,
  targetIsInsidePortaledFloatingKit,
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
    const floating = document.createElement("div");
    floating.setAttribute("data-pb-dialog-floating-root", "true");
    const inner = document.createElement("div");
    pop.appendChild(floating);
    pop.appendChild(inner);
    document.body.appendChild(pop);

    expect(resolveDialogFloatingPortalHost(inner)).toBe(floating);
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
});