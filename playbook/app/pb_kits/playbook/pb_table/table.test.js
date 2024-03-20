import React from "react";
import { ensureAccessible, renderKit, render, screen } from "../utilities/test-utils"

import Table from "./_table"

const DivsTable = () => {
  return (
    <>
      <Table 
          data={{testid: "table"}}
          size="sm" 
          tag="div"
      >
        <Table.Head tag="div">
          <Table.Row tag="div">
            <Table.Header tag="div">{"Column 1"}</Table.Header>
            <Table.Header tag="div">{"Column 2"}</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body tag="div">
          <Table.Row tag="div">
            <Table.Cell tag="div">{"Value 1"}</Table.Cell>
            <Table.Cell tag="div">{"Value 2"}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
};

const TableTagTable = () => {
  return (
    <>
      <Table 
          data={{testid: "table"}}
          size="sm" 
      >
        <Table.Head>
          <Table.Row>
            <Table.Header>{"Column 1"}</Table.Header>
            <Table.Header>{"Column 2"}</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{"Value 1"}</Table.Cell>
            <Table.Cell>{"Value 2"}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
};


const props = {
  data: { testid: "table" },
  sticky: false
}

it("should be accessible", async () => {
  ensureAccessible(Table, props)
})

test("when sticky is true", () => {
  const kit = renderKit(Table, props, { sticky: true })
  expect(kit).toHaveClass("pb_table table-sm table-responsive-collapse table-card sticky-header table-collapse-sm")
})

test("when striped is true", () => {
  const kit = renderKit(Table, props, { striped: true })
  expect(kit).toHaveClass("pb_table table-sm table-responsive-collapse table-card striped table-collapse-sm")
})

test("Renders Table.Head subkit for Div Table", () => {
  render (<DivsTable/>)

  const kit = screen.getByTestId("table")
  const head = kit.querySelector(".pb_table_thead")
  expect(head).toBeInTheDocument()
  expect(head.tagName).toBe("DIV")
})

test("Renders Table.Header subkit for Div Table", () => {
  render (<DivsTable/>)

  const kit = screen.getByTestId("table")
  const head = kit.querySelector(".pb_table_th")
  expect(head).toBeInTheDocument()
  expect(head.tagName).toBe("DIV")
})

test("Renders Table.Body subkit for Div Table", () => {
  render (<DivsTable/>)

  const kit = screen.getByTestId("table")
  const head = kit.querySelector(".pb_table_tbody")
  expect(head).toBeInTheDocument()
  expect(head.tagName).toBe("DIV")
})

test("Renders Table.Row subkit for Div Table", () => {
  render (<DivsTable/>)

  const kit = screen.getByTestId("table")
  const head = kit.querySelector(".pb_table_tr")
  expect(head).toBeInTheDocument()
  expect(head.tagName).toBe("DIV")
})

test("Renders Table.Cell subkit for Div Table", () => {
  render (<DivsTable/>)

  const kit = screen.getByTestId("table")
  const head = kit.querySelector(".pb_table_td")
  expect(head).toBeInTheDocument()
  expect(head.tagName).toBe("DIV")
})

test("Renders Table.Head subkit for HTML Table elements Table", () => {
  render (<TableTagTable/>)

  const kit = screen.getByTestId("table")
  const head = kit.querySelector(".pb_table_thead")
  expect(head).toBeInTheDocument()
  expect(head.tagName).toBe("THEAD")
})

test("Renders Table.Header subkit for HTML Table elements Table", () => {
  render (<TableTagTable/>)

  const kit = screen.getByTestId("table")
  const head = kit.querySelector(".pb_table_th")
  expect(head).toBeInTheDocument()
  expect(head.tagName).toBe("TH")
})

test("Renders Table.Body subkit for HTML Table elements Table", () => {
  render (<TableTagTable/>)

  const kit = screen.getByTestId("table")
  const head = kit.querySelector(".pb_table_tbody")
  expect(head).toBeInTheDocument()
  expect(head.tagName).toBe("TBODY")
})

test("Renders Table.Row subkit for HTML Table elements Table", () => {
  render (<TableTagTable/>)

  const kit = screen.getByTestId("table")
  const head = kit.querySelector(".pb_table_tr")
  expect(head).toBeInTheDocument()
  expect(head.tagName).toBe("TR")
})

test("Renders Table.Cell subkit for HTML Table elements Table", () => {
  render (<TableTagTable/>)

  const kit = screen.getByTestId("table")
  const head = kit.querySelector(".pb_table_td")
  expect(head).toBeInTheDocument()
  expect(head.tagName).toBe("TD")
})
