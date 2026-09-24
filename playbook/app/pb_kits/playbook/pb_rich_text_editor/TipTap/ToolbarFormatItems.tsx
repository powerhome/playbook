import React, {useCallback} from "react";
import EditorButton from "./EditorButton";
import { ToolbarTypes } from "./EditorTypes";

const ToolbarFormatItems = ({editor}: any): React.ReactElement => {
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

  const toolbarFormatItems = [
    {
      icon: "bold",
      text: "Bold",
      classname: `toolbar_button ${editor.isActive("bold") ? "is-active" : ""}`,
      onclick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      icon: "italic",
      text: "Italic",
      classname: `toolbar_button ${editor.isActive("italic") ? "is-active" : ""}`,
      onclick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: "strikethrough",
      text: "Strikethrough",
      classname: `toolbar_button ${editor.isActive("strike") ? "is-active" : ""}`,
      onclick: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      icon: "link",
      text: "Link",
      classname: `toolbar_button ${editor.isActive("link") ? "is-active" : ""}`,
      onclick: setLink,
    },
    {
      icon: "code",
      text: "Codeblock",
      classname: `toolbar_button ${editor.isActive("codeBlock") ? "is-active" : ""}`,
      onclick: () => editor.chain().focus().toggleCodeBlock().run(),
    },
  ];

  return (
    <>
      {toolbarFormatItems.map(({ icon, text, classname, onclick }: ToolbarTypes, index: number) => (
        <EditorButton
            classname={classname}
            icon={icon}
            key={index}
            onclick={onclick}
            text={text}
        />
      ))}
    </>
  );
};

export default ToolbarFormatItems;
