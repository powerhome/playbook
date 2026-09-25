import React from "react";
import Background from "../../pb_background/_background";
import Flex from "../../pb_flex/_flex";
import SectionSeparator from "../../pb_section_separator/_section_separator";

import EditorButton  from "./EditorButton";
import ToolbarDropdown from "./ToolbarDropdown";
import ToolbarFormatItems from "./ToolbarFormatItems";
import ToolbarNodes from "./ToolbarNodes";
import { ToolbarTypes } from "./EditorTypes";
import ToolbarHistoryItems from "./ToolbarHistory";
import MoreExtensionsDropdown from "./MoreExtensionsDropdown";

const ToolbarSeparator = (): React.ReactElement => (
  <div className="toolbar_separator">
    <SectionSeparator orientation="vertical" />
  </div>
);

const EditorToolbar = ({ editor, extensions, simple, sticky }: any): React.ReactElement => {
  const simpleToolbaritems = [
    {
        icon: "bold",
        text: "Bold",
        classname:`toolbar_button ${editor.isActive('bold') ? 'is-active' : ''}`,
        onclick:()=>editor.chain().focus().toggleBold().run(),
    },
    {
        icon: "italic",
        text: "Italic",
        classname:`toolbar_button ${editor.isActive('italic') ? 'is-active' : ''}`,
        onclick:() => editor.chain().focus().toggleItalic().run(),
    },
  ]

  return (
    <Background backgroundColor="white"
        className={`toolbar ${sticky ? 'pb_rich_text_editor_tiptap_toolbar_sticky' : ''}`}
        
    >
      {
        simple ? (
          <div className="toolbar_inner">
            <Flex
                align="center"
                className="toolbar_controls"
                wrap
            >
              {simpleToolbaritems && simpleToolbaritems.map(
                ({ icon, text, classname, onclick}: ToolbarTypes, index: number) => (
                  <EditorButton
                      classname={classname}
                      icon={icon}
                      key={index}
                      onclick={onclick}
                      text={text}
                  />
                )
              )}
            </Flex>
            <div className="toolbar_history">
              <ToolbarHistoryItems editor={editor} />
            </div>
          </div>
        ) : (
          <div className="toolbar_inner">
            <Flex
                align="center"
                className="toolbar_controls"
                wrap
            >
              <ToolbarDropdown editor={editor}/>
              <ToolbarSeparator />
              <ToolbarFormatItems editor={editor} />
              <ToolbarSeparator />
              <ToolbarNodes editor={editor} />
              {
                extensions && (
                  <>
                    <ToolbarSeparator />
                    <MoreExtensionsDropdown extensions={extensions}/>
                  </>
                )
              }
            </Flex>
            <div className="toolbar_history">
              <ToolbarHistoryItems editor={editor} />
            </div>
          </div>
        )
      }
    </Background>
  );
};

export default EditorToolbar
