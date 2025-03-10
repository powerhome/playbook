import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";

import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'

import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

const RichTextEditorToolbarDisabled = (props) => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text],
    content:
      "Add your text here. You can format your text, add links, quotes, and bullets.",
  });
  if (!editor) {
    return null;
  }

  return (
    <div>
      <RichTextEditor 
          advancedEditor={editor} 
          advancedEditorToolbar={false}
          {...props}
      >
        <EditorContent editor={editor} />
      </RichTextEditor>
    </div>
  );
};

export default RichTextEditorToolbarDisabled;
