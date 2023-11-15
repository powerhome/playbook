import React from "react"
import { render, screen } from "../utilities/test-utils"

import FileUpload from "./_file_upload"

const testid = "fileupload-test"

test("returns namespaced class name", () => {
  render(<FileUpload data={{ testid: testid }} />)

  const kit = screen.getByTestId(testid)
  expect(kit).toHaveClass("pb_file_upload_kit")
})

test("shows default drag text", () => {
  render(<FileUpload data={{ testid: testid }} />)

  const kit = screen.getByTestId(testid)
  expect(kit).toHaveTextContent("Choose a file or drag it here")
})

test("displays max file size text", () => {
  render(<FileUpload data={{ testid: testid }} maxSize={1e6} />)

  const kit = screen.getByTestId(testid)
  expect(kit).toHaveTextContent(
    "Choose a file or drag it here. Max file size is 1 MB."
  )
})

test("displays custom message", () => {
  render(
    <FileUpload customMessage={"Hello world!"} data={{ testid: testid }} />
  )

  const kit = screen.getByTestId(testid)
  expect(kit).toHaveTextContent("Hello world!")
})
