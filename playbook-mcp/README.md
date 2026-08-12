# playbook-mcp

Hosted MCP-UI render server for Playbook. Renders kits server-side via `pb_rails` and returns `ui://` HTML resources for LibreChat and other MCP-UI hosts.

Consumers do **not** need a Playbook install. CSS/JS/fonts are self-served from this service’s `/assets` (gem `dist/` + `fonts/`) with **permissive CORS** (`Access-Control-Allow-Origin: *`) so sandboxed MCP-UI iframes with opaque origin can load web fonts. Icons are inlined as SVG from `@powerhome/playbook-icons` (configured via `icon_path` / `icon_alias_path`; vendored into the image at `vendor/playbook-icons/`) — not Font Awesome webfonts. Charts load one self-contained IIFE (`bin/vendor_chart_peers` → `/assets/vendor/playbook-charts.js`) — no importmap / jsDelivr `/+esm`.

When `PLAYBOOK_MCP_ASSET_BASE_URL` is an absolute origin, render tools return MCP-UI **`external_url`** pointing at ephemeral `/ui/:id` HTML (TTL ~15m). That keeps large inline-SVG dashboards out of the tool-result payload so hosts like LibreChat do not truncate mid-document. Without an absolute base (local smoke), tools fall back to `rawHtml`.

`RenderStore` is **process-local memory**, so deploy **`replicas: 1`** until a shared store (Redis/Memcached) exists. Sticky sessions cannot fix this: LibreChat calls `/mcp` and the browser iframe loads `/ui/:id` as a different client.

Transport is **streamable-http** only (MCP 2025-03-26) — not deprecated standalone SSE.

## Tools

| Tool | Purpose |
|------|---------|
| `list_kits` | Discover rails-renderable kits from `dist/ai` |
| `list_icons` | Discover valid kebab-case icon ids (`chart-line`, `users`, …) |
| `get_kit_schema` | Kit schema + slim playground (conditionals, hints, structureModes) |
| `render_kit` | Validate + render one kit → MCP-UI HTML |
| `render_layout` | Compose multiple kits into one HTML document |
| `render_chart` | Interactive Highcharts kit (`pb_bar_graph`, etc.) |

Kit ids are **snake_case** (`table`, `button`, `pb_bar_graph`). Props use **camelCase** as in `playbook/dist/ai` schemas; the server converts to Ruby snake_case for `pb_rails`.

HTML `children` are only accepted for composition kits (`table`, `card`, …) and are sanitized before render.

## Local setup

```bash
cd playbook-mcp
bin/setup          # bundle + vendor chart peers
bundle exec puma -C config/puma.rb
```

- Health: `http://localhost:3099/health`
- MCP (Streamable HTTP): `http://localhost:3099/mcp`
- Assets: `http://localhost:3099/assets/playbook.css`

Smoke / tests:

```bash
bundle exec ruby bin/smoke
bundle exec rspec
```

## Example: render_kit (table)

```json
{
  "kit": "table",
  "props": { "size": "sm", "striped": true },
  "children": "<thead><tr><th>Name</th><th>Qty</th></tr></thead><tbody><tr><td>Widgets</td><td>3</td></tr></tbody>"
}
```

## LibreChat

See [docs/LIBRECHAT_VERIFICATION.md](docs/LIBRECHAT_VERIFICATION.md) and [docs/SPEC_REVIEW_RESPONSE.md](docs/SPEC_REVIEW_RESPONSE.md).

| Field | Value |
|-------|--------|
| Transport | **Streamable HTTPS** (streamable-http) |
| URL (local) | `http://localhost:3099/mcp` |
| Auth | None, or `X-Playbook-Mcp-Key` if shared secret set |

**Phase 0 gate:** Button styles **and** table JS (or chart) working inside the real LibreChat sandboxed iframe — not only ActionView HTML in isolation.

v1 does not depend on UI Actions (LibreChat already supports intent/tool/prompt; we simply do not emit them).

## Review / PR environment URL

On Milano PR deploy, the website review host is typically:

```text
https://playbook-pr-<N>.powerapp.cloud
```

`playbook-mcp` is deployed alongside it with a derived host:

```text
https://mcp-pr<N>.playbook.wc.beta.gm.powerapp.cloud/mcp
```

Example: if the PR stack is `https://playbook-pr-42.powerapp.cloud`, point LibreChat at:

```text
https://mcp-pr42.playbook.wc.beta.gm.powerapp.cloud/mcp
```

Health check: `https://mcp-pr<N>.playbook.wc.beta.gm.powerapp.cloud/health`  
(Website Milano URL is `https://pr<N>.playbook...` — that host is the docs site, not MCP.)

Review stacks set `PLAYBOOK_MCP_ALLOWLIST=*` because **PR hosts are VPN-only** at the network edge — the allowlist is defense-in-depth inside that perimeter, not the primary control. Staging/production must use real client allowlists (and are not VPN-gated the same way).

## Ops / security

| Env | Default | Meaning |
|-----|---------|---------|
| `PLAYBOOK_MCP_ALLOWLIST` | empty (dev allow-all) | **Required in production** — LibreChat/server egress IPs for `/mcp` (`/assets` + `/ui` are exempt for browser iframes) |
| `PLAYBOOK_MCP_TRUSTED_PROXIES` | unset | Ingress CIDRs for correct `remote_ip` |
| `PLAYBOOK_MCP_SHARED_SECRET` | unset | If set, require `X-Playbook-Mcp-Key` on `/mcp` |
| `PLAYBOOK_MCP_RATE_LIMIT_MAX` | `60` | Max MCP requests per window per IP |
| `PLAYBOOK_MCP_RATE_LIMIT_WINDOW` | `60` | Window seconds |
| `PLAYBOOK_MCP_MAX_PROPS_BYTES` | `65536` | Max props+children JSON/HTML bytes |
| `PLAYBOOK_MCP_ASSET_BASE_URL` | relative `/assets` | Absolute origin for iframe assets + `/ui/:id` external_url |
| `PLAYBOOK_MCP_RENDER_TTL_SECONDS` | `900` | Ephemeral `/ui/:id` HTML lifetime |
| `PLAYBOOK_MCP_RENDER_MAX_ENTRIES` | `256` | Max in-memory rendered documents |
| `SECRET_KEY_BASE` | dev default only | **Required in production** (boot fails if missing) |
| `PORT` | `3099` | Puma port |

Puma runs with `workers 0` because streamable-http session state is in-memory. Deploy `replicas: 1` while `RenderStore` is process-local (see above).

Deploy manifests live under `config/deploy/`. Image build:

```bash
docker build -f playbook-mcp/Dockerfile -t playbook-mcp .
```

## Decisions

- **Ruby / `pb_rails` base** — server HTML already exists; Ruby `mcp_ui_server` wraps `ui://` resources.
- **Self-served assets** — CSS/JS from gem `dist/` + vendored chart peers under `/assets/vendor`.
- **Validation** — hard-enforces `playbook/dist/ai` schemas + slim playground conditionals; sanitizes children and chart options.
