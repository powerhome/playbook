import React from "react";
import FlexItem from "../../pb_flex/_flex_item";
import EditorButton from "./EditorButton";

const ToolbarHistoryItems = ({editor}:any) => {

const toolbarHistoryItems = [
    {
        classname: `toolbar_button ${editor.isActive ? 'active' : ''}`,
        icon: "undo",
        text: "Undo",
        onclick: () => editor.chain().focus().undo().run(),
        disable: !editor.can().chain().focus().undo().run()
    },
    {
        classname: `toolbar_button ${editor.isActive ? 'active' : ''}`,
        icon: "redo",
        text: "Redo",
        onclick: () => editor.chain().focus().redo().run(),
        disable: !editor.can().chain().focus().redo().run()
    },
];

    return (
    <>
    <FlexItem displayFlex>
          {toolbarHistoryItems.map(
            ({ command, classname, disabledCommand, icon, text }:any, index:any) => (
              <EditorButton
                classname={classname}
                onclick={command}
                disable={disabledCommand}
                icon={icon}
                key={index}
                text={text}
              />
            )
          )}
        </FlexItem>
    </>
    )
}

export default ToolbarHistoryItems