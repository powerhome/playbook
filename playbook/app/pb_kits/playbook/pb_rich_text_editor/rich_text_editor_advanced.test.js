import React from "react"
import { render } from "../utilities/test-utils"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"

import RichTextEditor from "./_rich_text_editor"

const kitClass = "pb_rich_text_editor_advanced_container"

const EditorTest = props => {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: "",
  })

  return (
    <RichTextEditor advancedEditor={editor} {...props}>
      <EditorContent editor={editor} />
    </RichTextEditor>
  )
}

test("returns namespaced class name", () => {
  const { container } = render(<EditorTest />)

  expect(container.getElementsByClassName(kitClass).length).toBeGreaterThan(0)
})

test("returns toolbar class name", () => {
  const { container } = render(<EditorTest />)

  expect(
    container.getElementsByClassName(`${kitClass} toolbar-active`).length
  ).toBeGreaterThan(0)
})

test("doesn't returns toolbar class name", () => {
  const { container } = render(<EditorTest advancedEditorToolbar={false} />)

  expect(
    container.getElementsByClassName(`${kitClass} toolbar-active`).length
  ).toBe(0)
})
