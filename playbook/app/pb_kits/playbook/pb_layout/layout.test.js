import React from "react"
import { render, cleanup } from "../utilities/test-utils"
import { Layout, Card } from "playbook-ui"

function LayoutTest(props) {
  return (
    <Layout {...props}>
      <Layout.Side>{"Light"}</Layout.Side>
      <Layout.Body>{"Body"}</Layout.Body>
    </Layout>
  )
}

test("render all color variants", () => {
  const testValues = [undefined, "light", "dark", "gradient"]
  testValues.forEach((variant) => {
    const { getByTestId } = render(
      <LayoutTest data={{ testid: `test-${variant}` }}
          variant={variant}
      />
    )
    expect(getByTestId(`test-${variant}`)).toHaveClass(
      `pb_layout_kit_sidebar_size_md_left_${
        variant == undefined ? "light" : variant
      }`
    )

    cleanup()
  })
})

test("render transparent class", () => {
  const id = "transparent"

  const { getByTestId } = render(
    <LayoutTest data={{ testid: `test-${id}` }}
        variant={id}
    />
  )
  expect(getByTestId(`test-${id}`)).toHaveClass(
    `pb_layout_kit_sidebar_size_md_left_${id}`
  )

  cleanup()
})

test("render all sizes variants", () => {
  const testValues = ["xs", "sm", "md", "lg", "xl"]
  testValues.forEach((size) => {
    const { getByTestId } = render(
      <LayoutTest data={{ testid: `test-${size}` }}
          size={size}
      />
    )
    expect(getByTestId(`test-${size}`)).toHaveClass(
      `pb_layout_kit_sidebar_size_${size}_left_light`
    )

    cleanup()
  })
})

test("render all layout variants", () => {
  const testValues = [
    {
      layout: "collection",
      expected: "pb_layout_kit_collection",
    },
    {
      layout: "collection_detail",
      expected: "pb_layout_kit_collection_detail",
    },
    {
      layout: "content",
      expected: "pb_layout_kit_content",
    },
    {
      layout: "kanban",
      expected: "pb_layout_kit_kanban",
    },
    {
      layout: "masonry",
      expected: "pb_layout_kit_masonry",
    },
    {
      layout: "bracket",
      expected: "pb_layout_kit_bracket",
    },
  ]

  testValues.forEach(({ layout, expected }) => {
    const { getByTestId } = render(
      <Layout data={{ testid: `test-${layout}` }}
          layout={layout}
      >
        <Layout.Body>
          <Card>{"Card content"}</Card>
        </Layout.Body>
      </Layout>
    )

    expect(getByTestId(`test-${layout}`)).toHaveClass(expected)
    cleanup()
  })
})
