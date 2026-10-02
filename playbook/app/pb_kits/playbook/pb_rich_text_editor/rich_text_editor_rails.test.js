import {
  extensionActionFromHref,
  loadOptionalExtensions,
  parseExtensions,
  runToolbarAction,
  syncToHiddenInput,
} from "./rich_text_editor_rails";

const createEditor = () => {
  const chain = {};
  [
    "extendMarkRange",
    "focus",
    "redo",
    "run",
    "setHorizontalRule",
    "setImage",
    "setLink",
    "setTextAlign",
    "toggleUnderline",
    "undo",
    "unsetLink",
  ].forEach((method) => {
    chain[method] = jest.fn(() => chain);
  });

  return {
    chain: jest.fn(() => chain),
    chainCommands: chain,
    getAttributes: jest.fn(() => ({ href: "https://previous.example" })),
    getHTML: jest.fn(() => '<p style="text-align: center"><u>Text</u></p><hr><img src="https://example.com/image.png">'),
  };
};

describe("Rails RichTextEditor extensions", () => {
  test.each([
    ["#underline", { action: "underline" }],
    ["#textAlign-center", { action: "textAlign", alignment: "center" }],
    ["#horizontalRule", { action: "horizontalRule" }],
    ["#image", { action: "image" }],
    ["#table", null],
  ])("maps the dropdown item %s to its owned action", (href, action) => {
    expect(extensionActionFromHref(href)).toEqual(action);
  });

  test("parses only Playbook-owned extension names", () => {
    expect(parseExtensions('["underline","table","underline","image"]')).toEqual(["underline", "image"]);
    expect(parseExtensions("not json")).toEqual([]);
  });

  test("does not load optional packages by default", async () => {
    const importer = jest.fn();

    expect(await loadOptionalExtensions([], importer)).toEqual([]);
    expect(importer).not.toHaveBeenCalled();
  });

  test("loads only extensions that StarterKit does not provide", async () => {
    const configuredTextAlign = { name: "configuredTextAlign" };
    const modules = {
      "@tiptap/extension-image": { default: { name: "image" } },
      "@tiptap/extension-text-align": {
        default: {
          configure: jest.fn(() => configuredTextAlign),
        },
      },
      "@tiptap/extension-underline": { default: { name: "underline" } },
    };
    const importer = jest.fn((name) => Promise.resolve(modules[name]));

    const extensions = await loadOptionalExtensions(
      ["underline", "text_align", "horizontal_rule", "image"],
      importer
    );

    expect(importer).toHaveBeenCalledTimes(3);
    expect(importer).not.toHaveBeenCalledWith("@tiptap/extension-horizontal-rule");
    expect(modules["@tiptap/extension-text-align"].default.configure)
      .toHaveBeenCalledWith({ types: ["heading", "paragraph"] });
    expect(extensions).toEqual([
      modules["@tiptap/extension-underline"].default,
      configuredTextAlign,
      modules["@tiptap/extension-image"].default,
    ]);
  });

  test("keeps submitted HTML from enabled schemas intact", () => {
    const editor = createEditor();
    const hiddenInput = document.createElement("input");

    syncToHiddenInput(editor, hiddenInput);

    expect(hiddenInput.value).toBe(
      '<p style="text-align: center"><u>Text</u></p><hr><img src="https://example.com/image.png">'
    );
  });

  test("overwrites the seeded hidden input value once the editor mounts", () => {
    const editor = createEditor();
    const hiddenInput = document.createElement("input");
    hiddenInput.value = "<p>Saved body</p>";

    syncToHiddenInput(editor, hiddenInput);

    expect(hiddenInput.value).toBe(editor.getHTML());
  });

  test("leaves the seeded hidden input value alone when the editor never loads", () => {
    const hiddenInput = document.createElement("input");
    hiddenInput.value = "<p>Saved body</p>";

    syncToHiddenInput(undefined, hiddenInput);

    expect(hiddenInput.value).toBe("<p>Saved body</p>");
  });

  test.each([
    ["underline", "toggleUnderline", undefined],
    ["textAlign", "setTextAlign", { alignment: "justify" }],
    ["horizontalRule", "setHorizontalRule", undefined],
  ])("runs the %s toolbar action", (action, command, options) => {
    const editor = createEditor();

    runToolbarAction(editor, action, options);

    if (options?.alignment) {
      expect(editor.chainCommands[command]).toHaveBeenCalledWith(options.alignment);
    } else {
      expect(editor.chainCommands[command]).toHaveBeenCalled();
    }
    expect(editor.chainCommands.run).toHaveBeenCalled();
  });

  test("inserts an image from its URL prompt", () => {
    const editor = createEditor();
    const prompt = jest.fn(() => "https://example.com/image.png");

    runToolbarAction(editor, "image", { prompt });

    expect(prompt).toHaveBeenCalledWith("Image URL");
    expect(editor.chainCommands.setImage).toHaveBeenCalledWith({ src: "https://example.com/image.png" });
  });

  test.each([null, ""])("does not insert an image when the prompt returns %p", (url) => {
    const editor = createEditor();

    runToolbarAction(editor, "image", { prompt: () => url });

    expect(editor.chainCommands.setImage).not.toHaveBeenCalled();
  });

  test("updates a link from its URL prompt", () => {
    const editor = createEditor();
    const prompt = jest.fn(() => "https://example.com");

    runToolbarAction(editor, "link", { prompt });

    expect(prompt).toHaveBeenCalledWith("URL", "https://previous.example");
    expect(editor.chainCommands.setLink).toHaveBeenCalledWith({ href: "https://example.com" });
  });

  test("removes a link when its prompt is cleared", () => {
    const editor = createEditor();

    runToolbarAction(editor, "link", { prompt: () => "" });

    expect(editor.chainCommands.unsetLink).toHaveBeenCalled();
  });

  test("leaves a link unchanged when its prompt is cancelled", () => {
    const editor = createEditor();

    runToolbarAction(editor, "link", { prompt: () => null });

    expect(editor.chainCommands.setLink).not.toHaveBeenCalled();
    expect(editor.chainCommands.unsetLink).not.toHaveBeenCalled();
  });
});
