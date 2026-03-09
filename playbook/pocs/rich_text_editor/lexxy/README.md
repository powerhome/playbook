# Lexxy POC / Evaluation

**Lexxy** is the new rich text editor for Rails Action Text from 37signals, built on [Lexical](https://lexical.dev/). It is intended as a drop-in replacement for Trix.

## Standalone HTML POC (CDN)

Lexxy can run **without Rails** using the official CDN approach. A static POC is included:

- **Playbook website**: [Open Lexxy POC](/pocs/rich_text_editor/lexxy/) (when the site is running)
- **Local (this repo)**: Open `index.html` in a browser, or run a local server (ESM may require HTTP):
  ```bash
  npx serve lexxy
  # or: python3 -m http.server 8080 --directory lexxy
  ```

The POC loads Lexxy from esm.sh + unpkg, uses the `<lexxy-editor>` custom element as a form control, and disables attachments (no backend). Submit shows the HTML that Rails would receive.

## Quick evaluation

| Aspect | Notes |
|--------|--------|
| **Rails-friendly** | Yes. No React in Rails; drop-in for `rich_text_area`. |
| **Maintainer** | 37signals (same as Trix); built as the intended successor. |
| **Status** | **Beta** (as of 2025). Check [releases](https://github.com/basecamp/lexxy/releases) for current state. |
| **Storage** | Action Text compatible (HTML/blobs). Different internal model (Lexical) than TipTap/ProseMirror. |
| **Feature parity** | Image galleries still in progress for full Action Text compatibility. |

## Optional: Rails POC steps

To try Lexxy in a Rails app:

1. **Create or use a Rails app with Action Text**

   ```bash
   rails new myapp
   cd myapp
   rails action_text:install
   ```

2. **Add Lexxy**

   In `Gemfile`:

   ```ruby
   gem 'lexxy', '~> 0.1.26.beta'   # check latest version
   ```

   Then:

   ```bash
   bundle install
   ```

3. **Use in a form**

   Lexxy typically overrides the default Action Text editor, so existing:

   ```erb
   <%= form.rich_text_area :content %>
   ```

   may automatically use Lexxy once the gem and assets are set up. See [Lexxy Installation](https://basecamp.github.io/lexxy/installation.html) and [Usage](https://basecamp.github.io/lexxy/usage.html) for exact steps and configuration.

4. **Disable Lexxy if you need Trix side-by-side**

   In `config/application.rb` (or env-specific config), you can disable the automatic override and keep Trix for some forms if needed (see Lexxy docs).

## Recommendation

- **Short term**: Prefer **TipTap (vanilla JS)** or **Quill** for a Rails-friendly, non-React RTE that we can ship now.
- **Later**: Re-evaluate Lexxy when it reaches a **stable** release and full Action Text feature parity (e.g. image galleries). It could become the long-term Rails-native option.

## Links

- [Lexxy docs](https://basecamp.github.io/lexxy)
- [Lexxy GitHub](https://github.com/basecamp/lexxy)
- [Installation](https://basecamp.github.io/lexxy/installation.html)
- [Configuration](https://basecamp.github.io/lexxy/configuration.html)
