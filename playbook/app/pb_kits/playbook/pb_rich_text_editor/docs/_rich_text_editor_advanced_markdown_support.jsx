import React from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { defaultMarkdownParser } from 'prosemirror-markdown'
import { DOMSerializer } from 'prosemirror-model'

const RichTextEditorAdvancedMarkdownSupport = (props) => {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: 'Paste Markdown here to preserve headings, emphasis, links, lists, quotes, and code blocks.',
  })

  if (!editor) return null

  return (
    <RichTextEditor
        advancedEditor={editor}
        markdownSupport={{
          parser: defaultMarkdownParser,
          serializer: DOMSerializer,
        }}
        {...props}
    >
      <EditorContent editor={editor} />
    </RichTextEditor>
  )
}

export default RichTextEditorAdvancedMarkdownSupport
