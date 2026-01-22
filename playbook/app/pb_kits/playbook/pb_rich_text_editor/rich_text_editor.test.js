import React from 'react'
import { render, screen, fireEvent, waitFor, within } from '../utilities/test-utils'
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import RichTextEditor from './_rich_text_editor'

const testId = 'richtext-input1',
  kitClass = 'pb_rich_text_editor_kit'

test('returns namespaced class name', () => {
  render(
    <RichTextEditor data={{ testid: testId }} />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(kitClass)
})

test('returns "Simple" namespaced class name via prop', () => {
  render(
    <RichTextEditor
        data={{ testid: testId }}
        simple
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} simple`)
})

test('returns "Focus" namespaced class name via prop', () => {
  render(
    <RichTextEditor
        data={{ testid: testId }}
        focus
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} focus-editor-targets`)
})

test('returns "Sticky" namespaced class name via prop', () => {
  render(
    <RichTextEditor
        data={{ testid: testId }}
        sticky
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} sticky`)
})

test('returns "Dark" class name', () => {
  render(
    <RichTextEditor
        dark
        data={{ testid: testId }}
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} dark`)
})

// TipTap testing
const TestAdvancedEditor = ({ toolbarOnFocus = false, ...props }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Test content</p>',
  })

  if (!editor) return null

  return (
    <RichTextEditor
        advancedEditor={editor}
        data={{ testid: testId }}
        toolbarOnFocus={toolbarOnFocus}
        {...props}
    >
      <EditorContent editor={editor} />
    </RichTextEditor>
  )
}

describe('Advanced TipTap Editor works as expected', () => {
  test('renders advanced editor with toolbar', () => {
    render(<TestAdvancedEditor />)

    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(kitClass)

    // Check for advanced container
    const advancedContainer = kit.querySelector('.pb_rich_text_editor_advanced_container')
    expect(advancedContainer).toBeInTheDocument()

    // Check for toolbar
    const toolbar = kit.querySelector('.toolbar')
    expect(toolbar).toBeInTheDocument()
  })

  test('renders advanced editor without toolbar when advancedEditorToolbar is false', () => {
    render(<TestAdvancedEditor advancedEditorToolbar={false} />)

    const kit = screen.getByTestId(testId)
    const toolbar = kit.querySelector('.toolbar')
    expect(toolbar).not.toBeInTheDocument()
  })

  test('shows/hides toolbar on focus when focus is enabled', async () => {
    render(<TestAdvancedEditor focus />)

    const kit = screen.getByTestId(testId)

    // Initially toolbar should be hidden
    let toolbar = kit.querySelector('.toolbar')
    expect(toolbar).not.toBeInTheDocument()

    const editorElement = kit.querySelector('.ProseMirror')
    // Focus the editor
    fireEvent.focus(editorElement)

    // Toolbar should now be visible
    await waitFor(() => {
      toolbar = kit.querySelector('.toolbar')
      expect(toolbar).toBeInTheDocument()
    })
  })


  test('supports simple prop with advanced editor', () => {
    render(<TestAdvancedEditor simple />)

    const kit = screen.getByTestId(testId)
    const toolbar = kit.querySelector('.toolbar')
    expect(toolbar).toBeInTheDocument()
    const toolbarDropdown = kit.querySelector('.editor_dropdown_button')
    expect(toolbarDropdown).not.toBeInTheDocument()
    expect(kit).toHaveClass(`${kitClass} simple`)
  })

    test('supports sticky prop with advanced editor', () => {
    render(<TestAdvancedEditor sticky />)

    const kit = screen.getByTestId(testId)
    const stickyToolbar = kit.querySelector('.pb_rich_text_editor_tiptap_toolbar_sticky')
    expect(stickyToolbar).toBeInTheDocument()
    expect(kit).toHaveClass(`${kitClass} sticky`)
  })

  test('applies aria-label when provided', () => {
    const ariaLabel = 'Rich Text Editor'
    render(<TestAdvancedEditor aria={{ label: ariaLabel }} />)

    const kit = screen.getByTestId(testId)
    expect(kit).toHaveAttribute('aria-label', ariaLabel)
  })

  test('supports inline prop with advanced editor', () => {
    render(<TestAdvancedEditor inline />)

    const kit = screen.getByTestId(testId)
    const toolbar = kit.querySelector('.toolbar')
    expect(toolbar).toBeInTheDocument()
    expect(kit).toHaveClass(`${kitClass} inline`)
  })

  test('renders required indicator asterisk when requiredIndicator is true', () => {
    render(
      <RichTextEditor
          data={{ testid: testId }}
          label="Label"
          requiredIndicator
      />
    )

    const kit = screen.getByTestId(testId)
    const label = within(kit).getByText(/Label/)

    expect(label).toBeInTheDocument()
    expect(kit).toHaveTextContent('*')
  })

describe('TipTap Editor Functionality', () => {
  test('can type and update content', async () => {
    render(<TestAdvancedEditor />)

    const kit = screen.getByTestId(testId)
    const editorContent = kit.querySelector('.ProseMirror')

    // Focus and type in the editor
    fireEvent.focus(editorContent)
    fireEvent.input(editorContent, {
      target: { textContent: 'New content' }
    })

    await waitFor(() => {
      expect(editorContent).toHaveTextContent('New content')
    })
  })
})
})
