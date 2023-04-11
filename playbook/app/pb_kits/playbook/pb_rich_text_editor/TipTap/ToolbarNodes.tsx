import React, {useCallback} from "react";
import EditorButton from "./EditorButton";
import { ToolbarTypes } from "./EditorTypes";

const ToolbarNodes = ({editor}:any) => {

// eslint-disable-next-line react-hooks/rules-of-hooks
const setLink = useCallback(() => {
  const previousUrl = editor.getAttributes("link").href;
  const url = window.prompt("URL", previousUrl);

  // cancelled
  if (url === null) {
    return;
  }

  // empty
  if (url === "") {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();

    return;
  }

  // update link
  editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
}, [editor]);

const toolbarNodesItems = [
        {
          onclick: () => editor.chain().focus().toggleCodeBlock().run(),
          icon: "code",
          isActive: editor.isActive("codeBlock"),
          text: "Codeblock",
        },
        {
          onclick: setLink,
          icon: "link",
          isActive: editor.isActive("link"),
          text: "Link",
        },
      ];

return (
    <>
        {toolbarNodesItems.map(({ onclick, icon, text, isActive }:ToolbarTypes, index:number) => (
            <EditorButton
            classname={`toolbar_button ${isActive ? 'is-active' : ''}`}
            onclick={onclick}
            icon={icon}
            key={index}
            text={text}
            />
        ))}
   </>
    )
}


export default ToolbarNodes