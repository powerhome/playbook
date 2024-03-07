import React from "react";
import FlexItem from "../../pb_flex/_flex_item";
import EditorButton from "./EditorButton";
import { ToolbarTypes } from "./EditorTypes";

const ToolbarHistoryItems = ({editor}: any): React.ReactElement => {

const toolbarHistoryItems = [
    {
        classname: `toolbar_button`,
        icon: "undo",
        text: "Undo",
        onclick: () => editor.chain().focus().undo().run(),
        disable: !editor.can().chain().focus().undo().run()
    },
    {
        classname: `toolbar_button`,
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
            ({ onclick, classname, disable, icon, text }: ToolbarTypes, index: number) => (
              <EditorButton
                  classname={classname}
                  disable={disable}
                  icon={icon}
                  key={index}
                  onclick={onclick}
                  text={text}
              />
            )
          )}
        </FlexItem>
    </>
    )
}

export default ToolbarHistoryItems