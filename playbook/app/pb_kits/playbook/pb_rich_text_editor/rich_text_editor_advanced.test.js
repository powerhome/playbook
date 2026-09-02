import React from "react";
import { fireEvent, render, waitFor } from "../utilities/test-utils";
import { Editor } from "@tiptap/core";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { defaultMarkdownParser } from "prosemirror-markdown";
import { DOMSerializer } from "prosemirror-model";

import RichTextEditor from "./_rich_text_editor";
import { normalizeListSelection } from "./TipTap/listSelection";
import { createMarkdownToHTML, handleMarkdownPaste } from "./TipTap/markdownPaste";

const kitClass = "pb_rich_text_editor_advanced_container";
const markdownToHTML = createMarkdownToHTML(defaultMarkdownParser, DOMSerializer);

const EditorTest = (props) => {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: "",
  });

  return (
    <RichTextEditor 
        advancedEditor={editor} 
        {...props}
    >
      <EditorContent editor={editor} />
    </RichTextEditor>
  );
};

test("returns namespaced class name", () => {
  const { container } = render(<EditorTest />);

  expect(container.getElementsByClassName(kitClass).length).toBeGreaterThan(0);
});

test("returns toolbar class name", () => {
  const { container } = render(<EditorTest />);

  expect(
    container.getElementsByClassName(`${kitClass} toolbar-active`).length
  ).toBeGreaterThan(0);
});

test("doesn't returns toolbar class name", () => {
  const { container } = render(<EditorTest advancedEditorToolbar={false} />);

  expect(
    container.getElementsByClassName(`${kitClass} toolbar-active`).length
  ).toBe(0);
});

describe("TipTap list selection", () => {
  const content = "<h2>How should it work?</h2><p>First paragraph</p><p>Second paragraph</p>";

  test.each([
    ["bulletList", "ul"],
    ["orderedList", "ol"],
  ])("excludes a heading touched only at its end boundary from a %s", (listType, tag) => {
    const editor = new Editor({ extensions: [StarterKit], content });
    const headingEnd = editor.state.doc.child(0).nodeSize - 1;
    const paragraphEnd = headingEnd + editor.state.doc.child(1).nodeSize;

    editor.commands.setTextSelection({ from: headingEnd, to: paragraphEnd });
    normalizeListSelection(editor);
    if (listType === "bulletList") editor.chain().toggleBulletList().run();
    else editor.chain().toggleOrderedList().run();

    expect(editor.getHTML()).toBe(
      `<h2>How should it work?</h2><${tag}><li><p>First paragraph</p></li></${tag}><p>Second paragraph</p>`
    );

    editor.destroy();
  });

  test("excludes a paragraph touched only at its start boundary", () => {
    const editor = new Editor({ extensions: [StarterKit], content });
    const firstParagraphStart = editor.state.doc.child(0).nodeSize + 1;
    const secondParagraphStart =
      editor.state.doc.child(0).nodeSize + editor.state.doc.child(1).nodeSize + 1;

    editor.commands.setTextSelection({ from: firstParagraphStart, to: secondParagraphStart });
    normalizeListSelection(editor);
    editor.chain().toggleBulletList().run();

    expect(editor.getHTML()).toBe(
      "<h2>How should it work?</h2><ul><li><p>First paragraph</p></li></ul><p>Second paragraph</p>"
    );

    editor.destroy();
  });

  test("separates a pasted heading and body joined by a hard break", () => {
    const editor = new Editor({
      extensions: [StarterKit],
      content: "<p><strong>How should it work?</strong><br>Keep React and Rails visible.</p>",
    });
    const hardBreakEnd = editor.state.doc.child(0).child(1).nodeSize +
      editor.state.doc.child(0).child(0).nodeSize + 1;
    const paragraphEnd = editor.state.doc.child(0).nodeSize - 1;

    editor.commands.setTextSelection({ from: hardBreakEnd, to: paragraphEnd });
    normalizeListSelection(editor);
    editor.chain().toggleBulletList().run();

    expect(editor.getHTML()).toBe(
      "<p><strong>How should it work?</strong></p><ul><li><p>Keep React and Rails visible.</p></li></ul>"
    );

    editor.destroy();
  });
});

describe("TipTap Markdown paste", () => {
  const createClipboardData = (text, html = "") => ({
    files: [],
    getData: (format) => {
      if (format === "text/plain") return text;
      if (format === "text/html") return html;
      return "";
    },
    types: html ? ["text/plain", "text/html"] : ["text/plain"],
  });

  const createPasteEvent = (text, html = "") => {
    const event = new Event("paste", { bubbles: true, cancelable: true });
    Object.defineProperty(event, "clipboardData", {
      value: createClipboardData(text, html),
    });
    return event;
  };

  test("converts common Markdown blocks and inline formatting to HTML", () => {
    const markdown = [
      "## How should it work?",
      "",
      "Keep **React** and [Rails](https://example.com) visible.",
      "",
      "- React Playground",
      "- Rails Playground",
    ].join("\n");

    expect(markdownToHTML(markdown)).toBe(
      '<h2>How should it work?</h2><p>Keep <strong>React</strong> and <a href="https://example.com">Rails</a> visible.</p><ul><li><p>React Playground</p></li><li><p>Rails Playground</p></li></ul>'
    );
  });

  test("leaves ordinary plain text to TipTap's default paste handling", () => {
    expect(markdownToHTML("Keep React and Rails visible.")).toBeNull();
  });

  test("does not treat intraword underscores as Markdown", () => {
    expect(markdownToHTML("foo_bar_baz")).toBeNull();
  });

  test.each(["*Italic*", "_Italic_"])(
    "converts italic-only Markdown using %s delimiters",
    (markdown) => {
      expect(markdownToHTML(markdown)).toBe("<p><em>Italic</em></p>");
    }
  );

  test("is disabled by default", () => {
    const addEventListener = jest.spyOn(HTMLElement.prototype, "addEventListener");

    render(<EditorTest />);

    const markdownListeners = addEventListener.mock.calls.filter(
      (call, index) => {
        const [eventName, , capture] = call;
        const eventTarget = addEventListener.mock.instances[index];
        return eventName === "paste" &&
          capture === true &&
          eventTarget.classList?.contains("ProseMirror");
      }
    );

    expect(markdownListeners).toHaveLength(0);
    addEventListener.mockRestore();
  });

  test("formats Markdown when markdownSupport is enabled", async () => {
    const addEventListener = jest.spyOn(HTMLElement.prototype, "addEventListener");
    const { container } = render(
      <EditorTest
          markdownSupport={{
            parser: defaultMarkdownParser,
            serializer: DOMSerializer,
          }}
      />
    );
    const editorElement = container.querySelector(".ProseMirror");

    await waitFor(() => {
      const markdownListeners = addEventListener.mock.calls.filter(
        (call, index) => {
          const [eventName, , capture] = call;
          const eventTarget = addEventListener.mock.instances[index];
          return eventName === "paste" &&
            capture === true &&
            eventTarget.classList?.contains("ProseMirror");
        }
      );
      expect(markdownListeners).toHaveLength(1);
    });

    fireEvent.paste(editorElement, { clipboardData: createClipboardData("**Markdown**") });

    await waitFor(() => expect(editorElement.innerHTML).toContain("<strong>Markdown</strong>"));
    addEventListener.mockRestore();
  });

  test("stops TipTap's paste handler after converting Markdown", () => {
    const pasteEvent = createPasteEvent("**Markdown**");
    const stopImmediatePropagation = jest.spyOn(pasteEvent, "stopImmediatePropagation");
    const insertHTML = jest.fn();

    expect(handleMarkdownPaste(pasteEvent, insertHTML, markdownToHTML)).toBe(true);
    expect(pasteEvent.defaultPrevented).toBe(true);
    expect(stopImmediatePropagation).toHaveBeenCalled();
    expect(insertHTML).toHaveBeenCalledWith("<p><strong>Markdown</strong></p>");
  });

  test("converts manually copied Markdown wrapped in clipboard HTML", () => {
    const pasteEvent = createPasteEvent(
      "**Markdown**",
      "<div><span>**Markdown**</span></div>"
    );
    const stopImmediatePropagation = jest.spyOn(pasteEvent, "stopImmediatePropagation");
    const insertHTML = jest.fn();

    expect(handleMarkdownPaste(pasteEvent, insertHTML, markdownToHTML)).toBe(true);
    expect(stopImmediatePropagation).toHaveBeenCalled();
    expect(insertHTML).toHaveBeenCalledWith("<p><strong>Markdown</strong></p>");
  });

  test("converts a partial selection copied from a Markdown source block", () => {
    const pasteEvent = createPasteEvent(
      "*selected Markdown*",
      "<pre><code>*selected Markdown*</code></pre>"
    );
    const stopImmediatePropagation = jest.spyOn(pasteEvent, "stopImmediatePropagation");
    const insertHTML = jest.fn();

    expect(handleMarkdownPaste(pasteEvent, insertHTML, markdownToHTML)).toBe(true);
    expect(stopImmediatePropagation).toHaveBeenCalled();
    expect(insertHTML).toHaveBeenCalledWith("<p><em>selected Markdown</em></p>");
  });

  test("leaves spreadsheet HTML paste handling to TipTap", () => {
    const pasteEvent = createPasteEvent(
      "1. Q1",
      "<table><tbody><tr><td>1. Q1</td></tr></tbody></table>"
    );
    const stopImmediatePropagation = jest.spyOn(pasteEvent, "stopImmediatePropagation");
    const insertHTML = jest.fn();

    expect(handleMarkdownPaste(pasteEvent, insertHTML, markdownToHTML)).toBe(false);
    expect(stopImmediatePropagation).not.toHaveBeenCalled();
    expect(insertHTML).not.toHaveBeenCalled();
  });

  test("leaves rich HTML paste handling to TipTap", async () => {
    const { container } = render(
      <EditorTest
          markdownSupport={{
            parser: defaultMarkdownParser,
            serializer: DOMSerializer,
          }}
      />
    );
    const editorElement = container.querySelector(".ProseMirror");
    const pasteEvent = createPasteEvent(
      "**Markdown**",
      "<p><strong>Rendered HTML</strong></p>"
    );
    const stopImmediatePropagation = jest.spyOn(pasteEvent, "stopImmediatePropagation");

    fireEvent(editorElement, pasteEvent);

    await waitFor(() => expect(editorElement.innerHTML).toContain("<strong>Rendered HTML</strong>"));
    expect(stopImmediatePropagation).not.toHaveBeenCalled();
    stopImmediatePropagation.mockRestore();
  });
});
