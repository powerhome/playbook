// Rails TipTap: dynamic import() from esm.sh (no import map — avoids 2nd map ignored by Firefox vs Vite/host).
// Idempotent: data-pb-rte-initialized / data-pb-rte-pending.

const RTE_TIPTAP_VERSION = "2.8.0";
const RTE_TIPTAP_ESM = (pkg) => `https://esm.sh/${pkg}@${RTE_TIPTAP_VERSION}`;

async function initPlaybookRichTextEditorRails(container) {
  if (!container || container.dataset.pbRteInitialized || container.dataset.pbRtePending) return;
  container.dataset.pbRtePending = "true";

  const inputId = container.dataset.inputId;
  let initialHtml = container.dataset.initialHtml || "<p></p>";
  if (initialHtml && !initialHtml.trim().startsWith("<")) {
    initialHtml = "<p>" + initialHtml + "</p>";
  }
  const containerId = container.id;
  const hiddenInput = document.getElementById(inputId);
  const editorNode = document.getElementById(`${containerId}-editor`);
  const toolbar = document.getElementById(`${containerId}-toolbar`);
  const rteSimple = container.dataset.rteSimple === "true";
  const markdownSupport = container.dataset.markdownSupport === "true";
  const blockTooltipId = `${containerId}-toolbar-block-tooltip`;
  const iconTemplatesRoot = rteSimple
    ? null
    : document.getElementById(`${containerId}-block-icon-templates`);

  if (!editorNode || !hiddenInput || !toolbar) {
    delete container.dataset.pbRtePending;
    return;
  }

  function syncToHiddenInput(editor) {
    if (editor && hiddenInput) {
      hiddenInput.value = editor.getHTML();
    }
  }

  try {
    const { Editor } = await import(RTE_TIPTAP_ESM("@tiptap/core"));
    const { default: StarterKit } = await import(RTE_TIPTAP_ESM("@tiptap/starter-kit"));
    const { default: Link } = await import(RTE_TIPTAP_ESM("@tiptap/extension-link"));
    const markdownPattern = /(^|\n)\s{0,3}(#{1,6}\s|[-+*]\s|\d+[.)]\s|>\s|```)|\*\*[^*]+\*\*|__[^_]+__|\[[^\]]+\]\([^)]+\)/m;
    let markdownToHtml;

    if (markdownSupport) {
      Promise.all([
        import("https://esm.sh/prosemirror-markdown@1.13.2"),
        import("https://esm.sh/prosemirror-model@1.25.0"),
      ]).then(([{ defaultMarkdownParser }, { DOMSerializer }]) => {
        markdownToHtml = (text) => {
          const documentNode = defaultMarkdownParser.parse(text);
          if (!documentNode) return null;

          const wrapper = document.createElement("div");
          const serializer = DOMSerializer.fromSchema(documentNode.type.schema);
          wrapper.appendChild(serializer.serializeFragment(documentNode.content));
          wrapper.querySelectorAll("[data-tight]").forEach((node) => node.removeAttribute("data-tight"));
          return wrapper.innerHTML;
        };
      }).catch(() => undefined);
    }

    const editor = new Editor({
      element: editorNode,
      extensions: [
        StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
        Link.configure({ openOnClick: false, HTMLAttributes: { target: "_blank", rel: "noopener" } }),
      ],
      content: initialHtml,
      editable: true,
      onUpdate: ({ editor: ed }) => syncToHiddenInput(ed),
    });

    if (markdownSupport) {
      editorNode.addEventListener("paste", (event) => {
        const text = event.clipboardData?.getData("text/plain");
        if (!text || !markdownPattern.test(text) || !markdownToHtml) return;

        let html;
        try {
          html = markdownToHtml(text);
        } catch (_error) {
          return;
        }
        if (!html) return;

        event.preventDefault();
        editor.chain().focus().insertContent(html).run();
      }, true);
    }

    syncToHiddenInput(editor);

    const actionToChain = {
      bold: "toggleBold",
      italic: "toggleItalic",
      strike: "toggleStrike",
      codeBlock: "toggleCodeBlock",
    };

    const getCurrentBlockValue = () => {
      let value = "paragraph";
      if (editor.isActive("heading", { level: 1 })) value = "heading-1";
      else if (editor.isActive("heading", { level: 2 })) value = "heading-2";
      else if (editor.isActive("heading", { level: 3 })) value = "heading-3";
      else if (editor.isActive("bulletList")) value = "bulletList";
      else if (editor.isActive("orderedList")) value = "orderedList";
      else if (editor.isActive("blockquote")) value = "blockquote";
      return value;
    };

    const syncBlockTrigger = () => {
      if (rteSimple) return;
      const current = getCurrentBlockValue();
      const triggerRoot = toolbar.querySelector("[data-rte-block-trigger]");
      let tpl =
        iconTemplatesRoot &&
        [...iconTemplatesRoot.children].find(
          (el) => el.getAttribute("data-block-template-for") === current
        );
      if (!tpl && iconTemplatesRoot) {
        tpl = [...iconTemplatesRoot.children].find(
          (el) => el.getAttribute("data-block-template-for") === "paragraph"
        );
      }
      if (triggerRoot && tpl) {
        const iconWrap = triggerRoot.querySelector(".rte-block-style-trigger-icon");
        const labelEl = triggerRoot.querySelector(".rte-block-style-trigger-label");
        if (iconWrap) iconWrap.innerHTML = tpl.innerHTML;
        if (labelEl) labelEl.textContent = tpl.getAttribute("data-label") || "";
      }
      const tooltip = document.getElementById(blockTooltipId);
      if (tooltip) {
        tooltip.querySelectorAll("a.pb_nav_list_item_link").forEach((a) => {
          const href = a.getAttribute("href") || "";
          const v = href.startsWith("#") ? href.slice(1) : "";
          a.classList.toggle("is-active", v === current);
        });
      }
    };

    const applyBlockType = (value) => {
      let { selection } = editor.state;

      if ((value === "bulletList" || value === "orderedList") && !selection.empty) {
        if (selection.$from.nodeBefore?.type.name === "hardBreak") {
          const selectedSize = selection.to - selection.from;
          const breakPosition = selection.from - 1;

          editor.chain()
            .deleteRange({ from: breakPosition, to: selection.from })
            .setTextSelection(breakPosition)
            .splitBlock()
            .run();

          const from = editor.state.selection.from;
          editor.commands.setTextSelection({ from, to: from + selectedSize });
          selection = editor.state.selection;
        }

        const { $from, $to } = selection;
        let { from, to } = selection;

        if (
          $from.depth > 0 &&
          $from.parent.isTextblock &&
          $from.parentOffset === $from.parent.content.size
        ) {
          const nextBlockStart = $from.after($from.depth) + 1;
          if (nextBlockStart < to) from = nextBlockStart;
        }

        if (
          $to.depth > 0 &&
          $to.parent.isTextblock &&
          $to.parentOffset === 0
        ) {
          const previousBlockEnd = $to.before($to.depth) - 1;
          if (previousBlockEnd > from) to = previousBlockEnd;
        }

        if (from !== selection.from || to !== selection.to) {
          editor.commands.setTextSelection({ from, to });
        }
      }

      const chain = editor.chain().focus();
      if (value === "paragraph") chain.setParagraph().run();
      else if (value === "heading-1") chain.toggleHeading({ level: 1 }).run();
      else if (value === "heading-2") chain.toggleHeading({ level: 2 }).run();
      else if (value === "heading-3") chain.toggleHeading({ level: 3 }).run();
      else if (value === "bulletList") chain.toggleBulletList().run();
      else if (value === "orderedList") chain.toggleOrderedList().run();
      else if (value === "blockquote") chain.toggleBlockquote().run();
    };

    const updateActiveStates = () => {
      syncBlockTrigger();
      toolbar.querySelectorAll("button[data-action]").forEach((btn) => {
        const action = btn.dataset.action;
        let active = false;
        if (action === "bold") active = editor.isActive("bold");
        else if (action === "italic") active = editor.isActive("italic");
        else if (action === "strike") active = editor.isActive("strike");
        else if (action === "codeBlock") active = editor.isActive("codeBlock");
        else if (action === "link") active = editor.isActive("link");
        btn.classList.toggle("is-active", active);
      });
      toolbar.querySelectorAll("button[data-action='undo']").forEach((btn) => {
        btn.disabled = !editor.can().undo();
      });
      toolbar.querySelectorAll("button[data-action='redo']").forEach((btn) => {
        btn.disabled = !editor.can().redo();
      });
    };

    if (!rteSimple) {
      const blockStyleTooltip = document.getElementById(blockTooltipId);
      if (blockStyleTooltip) {
        blockStyleTooltip.addEventListener("click", (e) => {
          const a = e.target.closest("a[href^='#']");
          if (!a || !blockStyleTooltip.contains(a)) return;
          e.preventDefault();
          const href = a.getAttribute("href") || "";
          const v = href.startsWith("#") ? href.slice(1) : "";
          if (!v) return;
          applyBlockType(v);
          updateActiveStates();
        });
      }
    }

    toolbar.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-action]");
      if (!btn) return;
      e.preventDefault();
      const action = btn.dataset.action;

      if (action === "undo") {
        editor.chain().focus().undo().run();
      } else if (action === "redo") {
        editor.chain().focus().redo().run();
      } else if (action === "link") {
        const previousUrl = editor.getAttributes("link").href || "";
        const url = window.prompt("URL", previousUrl);
        if (url === null) return;
        if (url === "") {
          editor.chain().focus().extendMarkRange("link").unsetLink().run();
        } else {
          editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }
      } else {
        const chainMethod = actionToChain[action];
        if (chainMethod && typeof editor.chain().focus()[chainMethod] === "function") {
          editor.chain().focus()[chainMethod]().run();
        }
      }
      updateActiveStates();
    });

    editor.on("selectionUpdate", updateActiveStates);
    editor.on("transaction", updateActiveStates);
    updateActiveStates();

    container.dataset.pbRteInitialized = "true";
  } finally {
    delete container.dataset.pbRtePending;
  }
}

function mountAllPlaybookRichTextEditorRails() {
  document.querySelectorAll("[data-pb-rte-tiptap]").forEach((el) => {
    void initPlaybookRichTextEditorRails(el);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountAllPlaybookRichTextEditorRails);
} else {
  mountAllPlaybookRichTextEditorRails();
}

document.addEventListener("turbo:load", mountAllPlaybookRichTextEditorRails);

export { initPlaybookRichTextEditorRails, mountAllPlaybookRichTextEditorRails };
