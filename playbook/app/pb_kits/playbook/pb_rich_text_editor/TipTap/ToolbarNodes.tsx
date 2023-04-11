import React from "react";
import EditorButton from "./EditorButton";
import { ToolbarTypes } from "./EditorTypes";

const ToolbarNodes = ({editor}:any) => {

const toolbarNodesItems = [
        {
          onclick: () => editor.chain().focus().toggleCodeBlock().run(),
          icon: "code",
          isActive: editor.isActive("codeBlock"),
          text: "Codeblock",
        },
        {
          onclick: () => editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run(),
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