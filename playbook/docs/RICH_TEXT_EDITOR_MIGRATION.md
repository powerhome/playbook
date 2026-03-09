# Rich Text Editor Migration: Trix → Rails-Friendly Alternatives

## Summary

Playbook’s Rails Rich Text Editor currently uses **Trix** (via `react-trix`), which is buggy and hard to maintain. We want a **Rails-friendly** RTE that:

- Works **without** React in the Rails kit (no “React-rendered Rails”).
- Pairs cleanly with **Tiptap** on the React side (shared format/behavior where possible).
- Fits Playbook patterns: theming, forms, Turbo, Stimulus-style JS.

This doc captures requirements, options, recommendation, and POC locations.

---

## Current State

- **Rails kit**: `pb_rails("rich_text_editor", ...)` → renders React component `RichTextEditor` which wraps either **Trix** (default) or **TipTap** (when `advancedEditor` is passed).
- **Trix**: Used for the non-advanced path; copy/paste, formatting, and integration issues.
- **TipTap**: Used in React via `useEditor` + `EditorContent`; advanced variant only.
- **Storage**: Action Text / Trix-style HTML in a hidden input; React TipTap can output HTML or JSON.

---

## Requirements

### Must-have (today + near-term)

| Area | Requirement |
|------|-------------|
| **Rails usage** | Usable without React: init on `<textarea>` or `<div contenteditable>` from ERB; works with Rails form builders and server-rendered views. |
| **Client stack** | Minimal framework assumptions; Stimulus or vanilla JS is acceptable. |
| **Formatting** | Bold, italic, lists, headings, links. |
| **Output** | Clear strategy for storage and rendering (HTML and/or JSON). |
| **Theming** | Toolbar/editor styleable with Playbook tokens; no iframe or hard-to-style encapsulation. |
| **Safety** | Sanitization path for HTML; XSS-safe rendering. |

### Nice-to-have / future

- Mentions / @tagging, emojis, slash commands.
- Embeds: images, files, GIFs; tables; code blocks.
- Email-safe HTML vs in-app only.
- Same document format as React TipTap for cross-stack consistency.

---

## Options Evaluated

### 1. TipTap (Vanilla JS) — **Recommended**

- **What**: Same TipTap core used in React, but initialized with **vanilla JS** (`Editor` from `@tiptap/core`) on a DOM element. No React in the Rails path.
- **Rails integration**: ERB renders a container div; a small JS entry (Stimulus controller or script) creates the editor and syncs content to a hidden input.
- **Docs**: [TipTap Vanilla JS](https://tiptap.dev/docs/editor/getting-started/install/vanilla-javascript).

**Pros**

- Same engine and output as React TipTap (HTML/JSON); one format for Rails and React.
- No React in Rails: no hydration, no React-specific bundling for the kit.
- Extensible (same extensions as React); tables, code blocks, etc. when needed.
- Actively maintained; good docs and ecosystem.
- Theming via CSS on ProseMirror output (semantic HTML).

**Cons**

- Requires a JS build (Vite/Webpack) for `@tiptap/*` in the Rails app or in Playbook’s asset pipeline.
- Need to build toolbar and sync logic (hidden input, form submit) ourselves or via a thin wrapper.

**POC**: `playbook/pocs/rich_text_editor/tiptap_vanilla/`

---

### 2. Quill — **Strong fallback**

- **What**: Mature, framework-agnostic WYSIWYG editor; init on a DOM element with modules (toolbar, clipboard, history, keyboard).
- **Rails integration**: Stimulus controller inits Quill, syncs to hidden input (e.g. `quill.root.innerHTML` or Delta JSON).
- **Docs**: [Quill](https://quilljs.com/), [GitHub](https://github.com/quilljs/quill).

**Pros**

- No React; works with plain JS + Stimulus.
- Widely used; stable; BSD-3-Clause.
- Not in an iframe; themeable with CSS (Snow / Bubble or custom).
- Fits “Rails-friendly” and “no React in Rails” requirement.

**Cons**

- Different model than TipTap (Delta/HTML); React TipTap and Quill don’t share one format without conversion.
- Not ideal for very complex structure (e.g. nested tables) vs ProseMirror-based editors.

**POC**: `playbook/pocs/rich_text_editor/quill/`

---

### 3. Lexxy (37signals) — **Watch / future**

- **What**: New rich text editor for Action Text, from 37signals; Lexical-based, drop-in for `form.rich_text_area`.
- **Docs**: [Lexxy](https://basecamp.github.io/lexxy), [GitHub](https://github.com/basecamp/lexxy).

**Pros**

- Built as the intended Trix successor for Rails/Action Text.
- Drop-in with Action Text; no React in Rails.
- Markdown, code highlighting, mentions-style prompts, PDF/video preview, etc.

**Cons**

- **Still in beta**; may be too early for Playbook’s maintenance bar.
- Lexical ≠ TipTap/ProseMirror; different storage model than React TipTap.
- Image galleries not yet at parity with Action Text.

**Recommendation**: Re-evaluate when Lexxy reaches a stable release and feature parity; optional POC in a real Rails app.

**POC**: `playbook/pocs/rich_text_editor/lexxy/` (evaluation notes + optional Rails steps).

---

## Recommendation

| Priority | Option | Rationale |
|----------|--------|-----------|
| **1st** | **TipTap (Vanilla JS)** | Aligns Rails with React (same editor core and output); no React in Rails; extensible and maintainable. |
| **2nd** | **Quill** | Solid fallback if TipTap vanilla integration or bundling is a blocker; proven and Rails-friendly. |
| **3rd** | **Lexxy** | Revisit when stable; good long-term Rails/Action Text story but beta risk today. |

### Suggested pilot (TipTap vanilla)

1. **Scope**
   - One Playbook-compatible “Rails” variant: ERB container + Stimulus (or small vanilla script) that inits TipTap and syncs to a hidden input.
   - Toolbar: bold, italic, lists, headings, links (match current Trix feature set).
   - Output: HTML (and optionally JSON) for storage and sanitization.

2. **Testing**
   - Copy/paste from Word/Google Docs and plain text.
   - Formatting (bold, lists, links) and round-trip (save → reload).
   - Attachments/embeds if in scope.
   - XSS: sanitize HTML on server; verify in tests.

3. **Follow-up**
   - Deprecate Trix in the kit and switch default to TipTap vanilla (or new kit name).
   - Document storage format (HTML vs JSON) and sanitization for consumers.
   - Optional: shared TipTap config/schema for React and Rails for format alignment.

---

## POCs in This Repo

| POC | Path | How to run |
|-----|------|------------|
| **TipTap Vanilla** | `playbook/pocs/rich_text_editor/tiptap_vanilla/` | Open `index.html` in browser (CDN) or use local server. |
| **Quill** | `playbook/pocs/rich_text_editor/quill/` | Open `index.html` in browser (CDN). |
| **Lexxy** | `playbook/pocs/rich_text_editor/lexxy/` | Evaluation notes + optional Rails app steps. |

See **`playbook/pocs/rich_text_editor/README.md`** for setup and “Rails integration” notes for each POC.

---

## Acceptance Criteria (from ticket)

- [x] At least 3 viable options identified and evaluated (TipTap vanilla, Quill, Lexxy).
- [x] Clear recommendation (TipTap vanilla) + fallback (Quill).
- [x] POCs added for top options; follow-up work outlined above.

---

## References

- [TipTap Vanilla JS](https://tiptap.dev/docs/editor/getting-started/install/vanilla-javascript)
- [TipTap Persistence](https://tiptap.dev/docs/editor/core-concepts/persistence)
- [Quill](https://quilljs.com/)
- [Lexxy](https://basecamp.github.io/lexxy)
- Playbook: `playbook/app/pb_kits/playbook/pb_rich_text_editor/` (current Trix + TipTap React implementation)
