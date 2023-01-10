import React from "react";
import { render, screen, fireEvent } from "../utilities/test-utils";
import { Button, PbReactPopover } from "..";

const testId = "popover-kit";

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
}

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
}



  test("renders Popover and Popover classname", () => {
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
    expect(kit).toHaveClass("pb_popover_body max_width_240px overflow_handling"); 
  });

  // test("closes Popover on click anywhere", () => {
  //   render(<PopoverTest data={{ testid: testId}}/>)
  //   const btn = screen.getByText(/click me/i)
  //   fireEvent.click(btn);
  //   const kit = screen.getByText("Click Anywhere");
  //   expect(kit).toBeInTheDocument(); 
  //   await fireEvent.click(kit);
  //   await waitFor(() => {
  //       expect(screen.getByText("Click Anywhere")).not.toBeInTheDocument()
  // })
  // });