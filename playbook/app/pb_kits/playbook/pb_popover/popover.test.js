import React from "react";
import { render, screen, fireEvent } from "../utilities/test-utils";
import { Button, PbReactPopover } from "playbook-ui";

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
    const kit = screen.getByText("Click Anywhere");
    expect(kit).toHaveClass("pb_popover_body z_index_3");
  });

  test("renders Popover with max height and max width", () => {
    render(<PopoverTestHeight data={{ testid: testId}}/>)
    const btn = screen.getByText(/click me/i)
    fireEvent.click(btn);
    const kit = screen.getByText("Click Anywhere");
    expect(kit).toHaveClass("pb_popover_body p_sm overflow_handling");
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