/* eslint-disable react/no-multi-comp */

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

test("Should have outerPadding class", () => {
  const kit = renderKit(Table, props, { outerPadding: "sm" })
  expect(kit).toHaveClass("pb_table table-sm table-responsive-collapse table-card outer_padding_space_sm table-collapse-sm")
})

test("when headerStyle is default", () => {
  const kit = renderKit(Table, props)
  expect(kit).toHaveClass("pb_table table-sm table-responsive-collapse table-card table-collapse-sm")
  expect(kit).not.toHaveClass("header-borderless")
  expect(kit).not.toHaveClass("header-floating")
})

test("when headerStyle is borderless", () => {
  const kit = renderKit(Table, props, { headerStyle: "borderless" })
  expect(kit).toHaveClass("pb_table table-sm table-responsive-collapse table-card header-borderless table-collapse-sm")
})

test("when headerStyle is floating", () => {
  const kit = renderKit(Table, props, { headerStyle: "floating" })
  expect(kit).toHaveClass("pb_table table-sm table-responsive-collapse table-card header-floating table-collapse-sm")
})

test("renders withFilter variant with Card wrapper", () => {
  const { container } = render(
    <Table
        data={{testid: "table-with-filter"}}
        filterContent={<div>{"Mock Filter"}</div>}
        title="Test Table"
        variant="withFilter"
    >
      <Table.Head>
        <Table.Row>
          <Table.Header>{"Column 1"}</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{"Value 1"}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )

  const card = container.querySelector('.pb_card_kit')
  expect(card).toBeInTheDocument()
  const filter = container.querySelector('.pb_filter_kit')
  expect(filter).toBeInTheDocument()
})

test("renders title when provided with withFilter variant", () => {
  render(
    <Table
        filterContent={<div>{"Mock Filter"}</div>}
        title="Test Title"
        variant="withFilter"
    >
      <Table.Head>
        <Table.Row>
          <Table.Header>{"Column 1"}</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{"Value 1"}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )

  expect(screen.getByText("Test Title")).toBeInTheDocument()
})

test("renders filter component in withFilter variant", () => {
  const { container } = render(
    <Table
        filterContent={<div data-testid="test-filter">{"Filter inputs"}</div>}
        variant="withFilter"
    >
      <Table.Head>
        <Table.Row>
          <Table.Header>{"Column 1"}</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{"Value 1"}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )

  const filter = container.querySelector('.pb_filter_kit')
  expect(filter).toBeInTheDocument()
})

test("renders SectionSeparator between filter and table in withFilter variant", () => {
  const { container } = render(
    <Table
        filterContent={<div>{"Filter content"}</div>}
        variant="withFilter"
    >
      <Table.Head>
        <Table.Row>
          <Table.Header>{"Column 1"}</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{"Value 1"}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )

  const separator = container.querySelector('.pb_section_separator_kit')
  expect(separator).toBeInTheDocument()
})

test("does not render title when not provided with withFilter variant", () => {
  const { container } = render(
    <Table
        filterContent={<div>{"Filter content"}</div>}
        variant="withFilter"
    >
      <Table.Head>
        <Table.Row>
          <Table.Header>{"Column 1"}</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{"Value 1"}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )

  const title = container.querySelector('.pb_title_kit')
  expect(title).not.toBeInTheDocument()
})

test("renders default variant without Card wrapper", () => {
  render(
    <Table
        data={{testid: "default-table"}}
        variant="default"
    >
      <Table.Head>
        <Table.Row>
          <Table.Header>{"Column 1"}</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{"Value 1"}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )

  const table = screen.getByTestId("default-table")
  expect(table).toBeInTheDocument()
  expect(table.closest('.pb_card_kit')).not.toBeInTheDocument()
})

test("renders withFilter variant with cardProps and titleProps", () => {
   const { container } = render(
    <Table
        cardProps={{ margin: "lg" }}
        data={{testid: "with-filter-table-props"}}
        title="Filter Table"
        titleProps={{ paddingLeft: "lg" }}
        variant="withFilter"
    >
      <Table.Head>
        <Table.Row>
          <Table.Header>{"Column 1"}</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{"Value 1"}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )

  const table = screen.getByTestId("with-filter-table-props")
  expect(table).toBeInTheDocument()
  const card = container.querySelector('.pb_card_kit')
  expect(card).toBeInTheDocument()
  expect(card).toHaveClass("m_lg")

  const title = container.querySelector('.pb_title_kit')
  expect(title).toBeInTheDocument()
  expect(title).toHaveClass("pl_lg")
})
