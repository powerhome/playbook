import React, { useLayoutEffect, useRef, useState } from "react";
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

const STACK_HYSTERESIS_PX = 32;
const STACK_FIT_BUFFER_PX = 8;

const ToolbarSeparator = (): React.ReactElement => (
  <div className="toolbar_separator">
    <SectionSeparator orientation="vertical" />
  </div>
);

const childrenWidth = (element: HTMLElement): number =>
  Array.from(element.children).reduce(
    (sum, child) => sum + (child as HTMLElement).offsetWidth,
    0
  );

// Stack when format + tools (+ more) no longer fit beside undo/redo.
const toolsNeedStack = (root: HTMLElement | null): boolean => {
  if (!root) return false;

  const format = root.querySelector<HTMLElement>(".toolbar_group_format");
  const tools = root.querySelector<HTMLElement>(".toolbar_group_tools");
  if (!format || !tools) return false;

  const more = root.querySelector<HTMLElement>(".toolbar_group_more");
  const history = root.querySelector<HTMLElement>(".toolbar_history");
  const { paddingLeft, paddingRight } = window.getComputedStyle(root);
  const rightReserve = Math.max(history?.offsetWidth ?? 0, parseFloat(paddingRight) || 0);
  const available = root.clientWidth - (parseFloat(paddingLeft) || 0) - rightReserve;
  const needed =
    childrenWidth(format) +
    childrenWidth(tools) +
    (more ? childrenWidth(more) : 0) +
    STACK_FIT_BUFFER_PX;

  return needed > available;
};

const nextStacked = (
  stacked: boolean,
  stackedAtWidth: number,
  needsStack: boolean,
  width: number
): { stacked: boolean, stackedAtWidth: number } => {
  if (needsStack) {
    return {
      stacked: true,
      stackedAtWidth: stacked ? Math.min(stackedAtWidth, width) : width,
    };
  }

  if (stacked && width > stackedAtWidth + STACK_HYSTERESIS_PX) {
    return { stacked: false, stackedAtWidth };
  }

  return { stacked, stackedAtWidth };
};

const EditorToolbar = ({ editor, extensions, simple, sticky }: any): React.ReactElement => {
  const toolbarInnerRef = useRef<HTMLDivElement>(null);
  const stackedAtWidthRef = useRef(0);
  const [toolsStacked, setToolsStacked] = useState(false);

  useLayoutEffect(() => {
    if (simple) return;

    const root = toolbarInnerRef.current;
    if (!root) return;

    const toolbar = root.closest(".toolbar");

    const sync = () => {
      const width = toolbar?.clientWidth ?? root.clientWidth;
      const needsStack = toolsNeedStack(root);

      setToolsStacked((stacked) => {
        const next = nextStacked(stacked, stackedAtWidthRef.current, needsStack, width);
        stackedAtWidthRef.current = next.stackedAtWidth;
        return next.stacked;
      });
    };

    sync();
    const rafId = requestAnimationFrame(sync);

    if (typeof ResizeObserver === "undefined") {
      return () => cancelAnimationFrame(rafId);
    }

    const observer = new ResizeObserver(sync);
    observer.observe(toolbar || root);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [extensions, simple]);

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

  const toolbarClassName = [
    "toolbar",
    toolsStacked && "toolbar_tools_stacked",
    sticky && "pb_rich_text_editor_tiptap_toolbar_sticky",
  ].filter(Boolean).join(" ");

  return (
    <Background
        backgroundColor="white"
        className={toolbarClassName}
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
          <div
              className="toolbar_inner"
              ref={toolbarInnerRef}
          >
            <Flex
                align="center"
                className="toolbar_controls"
                wrap
            >
              <div className="toolbar_group toolbar_group_format">
                <ToolbarDropdown editor={editor}/>
              </div>
              <div className="toolbar_group toolbar_group_tools">
                <ToolbarSeparator />
                <ToolbarFormatItems editor={editor} />
                <ToolbarSeparator />
                <ToolbarNodes editor={editor} />
              </div>
              {
                extensions && (
                  <div className="toolbar_group toolbar_group_more">
                    <ToolbarSeparator />
                    <MoreExtensionsDropdown extensions={extensions}/>
                  </div>
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
