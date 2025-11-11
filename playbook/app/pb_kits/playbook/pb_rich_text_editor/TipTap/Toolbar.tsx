import React from "react";
import Background from "../../pb_background/_background";
import Flex from "../../pb_flex/_flex";
import FlexItem from "../../pb_flex/_flex_item";
import SectionSeparator from "../../pb_section_separator/_section_separator";

import  EditorButton  from "./EditorButton";
import ToolbarDropdown from "./ToolbarDropdown";
import ToolbarNodes from "./ToolbarNodes";
import { ToolbarTypes } from "./EditorTypes";
import ToolbarHistoryItems from "./ToolbarHistory";
import MoreExtensionsDropdown from "./MoreExtensionsDropdown";

const EditorToolbar = ({ editor, extensions, simple, sticky }: any): React.ReactElement => {
  const toolbaritems = [
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
    {
        icon: "strikethrough",
        text: "Strikethrough",
        classname:`toolbar_button ${editor.isActive('strike') ? 'is-active' : ''}`,
        onclick:() => editor.chain().focus().toggleStrike().run(),
    },
  ]

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
      <Flex flex="0"
          justify="between"
          paddingX="sm"
          paddingY="xxs"
      >
        {
          simple ? (
            <>
              <Flex className="toolbar_block">
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
            </>
          ) : (
            <>
        <FlexItem className="toolbar_block"
            displayFlex
        >
          <ToolbarDropdown editor={editor}/>
          <SectionSeparator orientation="vertical" />
            {toolbaritems && toolbaritems.map(
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
            <SectionSeparator orientation="vertical" />
            <ToolbarNodes editor={editor} />
            {
              extensions && extensions.length > 0 && (
                <>
                  <MoreExtensionsDropdown extensions={extensions}/>
                </>
              )
            }
        </FlexItem>
        <ToolbarHistoryItems editor={editor} />
        </>
          )
        }
       
      </Flex>
    </Background>
  );
};

export default EditorToolbar