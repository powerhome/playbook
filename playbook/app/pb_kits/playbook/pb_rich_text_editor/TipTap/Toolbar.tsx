import React from "react";
import Background from "../../pb_background/_background";
import Flex from "../../pb_flex/_flex";
import FlexItem from "../../pb_flex/_flex_item";
import SectionSeparator from "../../pb_section_separator/_section_separator";

import  EditorButton  from "./EditorButton";
import ToolbarDropdown from "./ToolbarDropdown";


export type ToolbarItemProps = {
  icon?: string;
  text?: string;
  classname?: string;
  onclick?: () => {}
}



const EditorToolbar = ({ editor}:any) => {
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
    <Background backgroundColor="white" className="toolbar">
      <Flex flex="0" justify="between" paddingX="md" paddingY="xxs" wrap>
        <FlexItem className="toolbar_block" displayFlex>
          <ToolbarDropdown editor={editor}/>
          <SectionSeparator orientation="vertical" />
            {toolbaritems && toolbaritems.map(
              ({ icon, text, classname, onclick}:ToolbarItemProps, index:number) => (
                <EditorButton
                  classname={classname}
                  icon={icon}
                  key={index}
                  text={text}
                  onclick={onclick}
                />
              )
            )}
            <SectionSeparator orientation="vertical" />
            {toolbarNodesItems.map(({ onclick, icon, text, isActive }:any, index:number) => (
              <EditorButton
                classname={`toolbar_button ${isActive ? 'is-active' : ''}`}
                onclick={onclick}
                icon={icon}
                key={index}
                text={text}
              />
            ))}
        </FlexItem>
      </Flex>
      <SectionSeparator />
    </Background>
  );
};

export default EditorToolbar