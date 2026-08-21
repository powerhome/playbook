# LibreChat / MCP-UI verification checklist

Playbook MCP exposes **streamable-http** (MCP 2025-03-26) at `/mcp` — not the deprecated standalone SSE transport. Assets are self-served at `/assets/*` with permissive CORS (including fonts).

## Connect

| Field | Value |
|-------|--------|
| Transport | **Streamable HTTPS** (streamable-http) |
| MCP Server URL | Local: `http://localhost:3099/mcp`. PR review: `https://mcp-pr<N>.playbook.wc.beta.gm.powerapp.cloud/mcp` (sibling of website `https://pr<N>.playbook...`). |
| Auth | None, or custom header `X-Playbook-Mcp-Key` if `PLAYBOOK_MCP_SHARED_SECRET` is set |

## Phase 0 exit criteria (architecture risks)

Kill **both** unknowns before expanding the tool surface:

1. **ActionView-outside-request** — `render_kit` for Button returns on-brand HTML via `pb_rails`.
2. **Iframe-JS hydration** — one JS-interactive kit works **inside a real LibreChat MCP-UI iframe** (`srcdoc` / `@mcp-ui/client`, sandbox with `allow-popups` as LibreChat configures it):
   - **Preferred:** Table with `data-pb-table-wrapper` + `playbook-rails.js` (responsive/collapse).
   - **Or:** Chart (`pb_bar_graph`) with vendored peers + chart bindings mounting Highcharts.

Hand-served assets are fine for this gate; the mount chain (`playbook-rails.js` → React → Highcharts for charts) inside that sandbox is the architecture-threatening unknown.

Local helper: `bundle exec ruby bin/smoke` asserts hydration hooks; LibreChat confirms the iframe.

## Must pass (v1)

1. Host completes MCP `initialize` against `/mcp` (streamable-http).
2. `tools/list` includes `list_kits`, `get_kit_schema`, `render_kit`, `render_layout`, `render_chart`.
3. Button renders on-brand in the sandboxed iframe (`playbook.css`).
4. Table renders; **responsive/collapse JS runs in-iframe** (no UI Actions).
5. Chart returns mount markup; with `bin/vendor_chart_peers` IIFE, Highcharts paints in-iframe.
6. **Fonts:** Proxima / Power Centra (or configured face) load from `/assets/fonts/...` — not system fallback. Asset responses must include `Access-Control-Allow-Origin: *` (opaque iframe `Origin: null`).
7. Document height: no clipping. Every rendered document loads `/assets/playbook-mcp-resize.js`, which posts `ui-size-change` (`@mcp-ui/client` cannot measure opaque-origin srcdoc). Charts also reserve mount + `options.chart.height` (default 400px); ResizeObserver re-reports after Highcharts paints.
8. Icons: KPI `icon_stat_value` glyphs visible (not empty circles). Prefer `list_icons` for valid kebab-case names. With absolute `PLAYBOOK_MCP_ASSET_BASE_URL`, renders use `external_url` → `/ui/:id` so large inline-SVG HTML is not truncated in the tool result.


8. `render_layout` → **one** HTML document per call (multiple `ui://` resources become a carousel — wrong for dashboards).

## UI Actions (known — skip discovery)

LibreChat already handles **intent**, **tool**, and **prompt** action types (converted to chat messages via `handleUIAction`); other types are ignored (the ⚠️ in the mcp-ui host table).

- **v1 tools must not depend on UI Actions.**
- Table filter/collapse and chart interactivity are **pure in-iframe JS**.
- Optional 10-minute check: DW `hello-ui.mjs` prompt-action button — confirm host converts prompt actions; Playbook tools still do not emit them.

## Security checks before shared use

- Production **requires** `PLAYBOOK_MCP_ALLOWLIST` and `SECRET_KEY_BASE`.
- Set `PLAYBOOK_MCP_TRUSTED_PROXIES` to ingress CIDRs.
- Optional: `PLAYBOOK_MCP_SHARED_SECRET` + LibreChat custom header `X-Playbook-Mcp-Key`.
- Rate limit + props size caps.
- Chart IIFE built (`bin/vendor_chart_peers`) — no runtime esm.sh / jsDelivr `/+esm` / importmap.
