# Spec review response (Data Warehouse)

Incorporates feedback on the Playbook MCP-UI Render Server work spec.

1. **Phase 0 must kill iframe-JS risk** — Adopted. Phase 0 exit criteria = Button **and** one JS-interactive kit (table collapse/responsive or chart) verified inside a **real LibreChat iframe**. `bin/smoke` asserts `data-pb-table-wrapper` + `playbook-rails.js` (+ chart mount hooks). Manual LibreChat step is the gate.
2. **Permissive CORS for fonts** — Adopted. `/assets/*` sends `Access-Control-Allow-Origin: *`, `CORP: cross-origin`, font-friendly methods/headers, plus `OPTIONS` preflight. Serves `fonts/` from gem paths when present. Spec/docs call out opaque-origin (`Origin: null`) sandbox case.
3. **streamable-http, not SSE** — Adopted. Server mounts `MCP::Server::Transports::StreamableHTTPTransport` at `/mcp` only. Docs/README say streamable-http; deprecated standalone SSE is not used.
4. **UI Actions already known** — Adopted. Verification doc records LibreChat intent/tool/prompt support and “other types ignored.” Phase 2 discovery reframed as optional 10-minute check with DW `hello-ui.mjs`. v1 still does not emit UI Actions.
5. **No 100vh / fixed heights** — Document wrapper uses content-sized body padding only; smoke fails on `100vh`.
6. **Version-stamp assets** — Asset URLs append `?v=<Playbook::VERSION>`; responses set gem-version-aware `ETag`.
7. **render_layout = one document** — Unchanged / confirmed correct for LibreChat (avoids carousel).
8. **Shared-secret header later** — Optional now: `PLAYBOOK_MCP_SHARED_SECRET` → require `X-Playbook-Mcp-Key` (LibreChat custom headers).
