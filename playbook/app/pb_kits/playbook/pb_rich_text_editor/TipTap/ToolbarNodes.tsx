import React from "react";
import EditorButton from "./EditorButton";
import { normalizeListSelection } from "./listSelection";

const ToolbarNodes = ({editor}: any): React.ReactElement => {
  const toolbarNodesItems = [
        {
          onclick: () => {
            normalizeListSelection(editor)
            editor.chain().focus().toggleOrderedList().run()
          },
          icon: "list-ol",
          isActive: editor.isActive("orderedList"),
          text: "Ordered List",
        },
        {
          onclick: () => {
            normalizeListSelection(editor)
            editor.chain().focus().toggleBulletList().run()
          },
          icon: "list",
          isActive: editor.isActive("bulletList"),
          text: "Bullet List",
        },
        {
          onclick: () => editor.chain().focus().liftListItem("listItem").run(),
          icon: "outdent",
          isActive: false,
          text: "Outdent",
          disable: !editor.can().chain().focus().liftListItem("listItem").run(),
        },
        {
          onclick: () => editor.chain().focus().sinkListItem("listItem").run(),
          icon: "indent",
          isActive: false,
          text: "Indent",
          disable: !editor.can().chain().focus().sinkListItem("listItem").run(),
        },
      ];

return (
    <>
        {toolbarNodesItems.map(({ onclick, icon, text, isActive, disable }, index) => (
            <EditorButton
                classname={`toolbar_button ${isActive ? 'is-active' : ''}`}
                disable={disable}
                icon={icon}
                key={index}
                onclick={onclick}
                text={text}
            />
        ))}
   </>
    )
}


export default ToolbarNodes
