/**
 * Rails TipTap editor bootstrap (import map + dynamic imports).
 * Idempotent per container via data-pb-rte-initialized / data-pb-rte-pending.
 *
 * Dynamic loads use global importShim from es-module-shims (see rich_text_editor.html.erb): Firefox
 * does not apply a second native import map when the host page already has one; import() would fail.
 */
/* global importShim */

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
    const importTipTap = typeof importShim === "function" ? importShim : (u) => import(u);

    const { Editor } = await importTipTap("@tiptap/core");
    const { default: StarterKit } = await importTipTap("@tiptap/starter-kit");
    const { default: Link } = await importTipTap("@tiptap/extension-link");

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
