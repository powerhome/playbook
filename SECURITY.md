# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability within the design system or its hosted services, please open a GitHub issue with your specific concern. All security vulnerabilities will be promptly addressed.

## Supported Versions

Only the latest version of the design system is supported.
For the latest version, go [here](https://github.com/powerhome/playbook/blob/master/playbook/lib/playbook/version.rb#L5).

## Updates and Upgrades

It is important to regularly update and upgrade the design system to ensure that it is up-to-date with the latest security patches.

## Hosted service: playbook-mcp

`playbook-mcp` is a network-reachable MCP-UI render server. It is in scope for this security policy in addition to the `playbook_ui` library.

### Production requirements (fail closed)

- `SECRET_KEY_BASE` must be set (no committed default in production).
- `PLAYBOOK_MCP_KEYS` must be set: one `consumer:key` pair per calling system (comma-separated). Production refuses to boot without it.

### Controls

- Network exposure is enforced by the Ingress, not in-app. `playbook-mcp` has its own Traefik-only Ingress on PAC's default VPN-scoped entrypoints (no `https-public`, no source-range whitelist), separate from the website's public production Ingress. There is no application IP allowlist.
- Rate limiting (`PLAYBOOK_MCP_RATE_LIMIT_MAX`, `PLAYBOOK_MCP_RATE_LIMIT_WINDOW`) — per consumer key, per process.
- Input size caps (`PLAYBOOK_MCP_MAX_PROPS_BYTES`).
- Kit names resolved only through Playbook `KitResolver` + `dist/ai` schema validation.
- HTML `children` allowed only for composition kits (`table`, `card`, etc.) and sanitized with a SafeList (no scripts / event handlers).
- Chart `options` are scrubbed of Highcharts HTML/JS sinks (`useHTML`, `*formatter`, `events`, etc.).
- Chart click follow-ups are **declarative** `uiAction` templates (`prompt` / `tool` / `intent`) posted via `postMessage`. User-supplied Highcharts event functions are not accepted.
- Generated MCP-UI documents set a Content-Security-Policy; chart peers are self-hosted under `/assets/vendor` (run `bin/vendor_chart_peers`), not third-party CDNs at runtime.
- Static assets are path-allowlisted under gem `dist/` / `fonts/` + vendored chart peers, with permissive CORS (`Access-Control-Allow-Origin: *`) so opaque-origin sandboxed iframes can load web fonts.
- Per-consumer shared secrets: every `/mcp` request must send a configured key in `X-Playbook-Mcp-Key` (compared in constant time). Each consumer has its own key, so one can be rotated or revoked without breaking the others.
- Transport is streamable-http only (deprecated standalone SSE is not used).

### Data that passes through

Callers send chart series, table contents, and other kit props/children. The server only renders them: it reads no Power data, changes nothing outside the request, and persists nothing beyond short-lived renders in process memory. Tool props and children are never logged.

### Rendered UI links (`/ui/:id`)

Browser iframes cannot send the consumer key, so `/ui/:id` is reachable by whoever holds the link. It is protected by:

- 144-bit random ids and a 15-minute expiry (`PLAYBOOK_MCP_RENDER_TTL_SECONDS`). LibreChat stores these links in conversations, including shared ones, which is why the expiry is short.
- `Referrer-Policy: no-referrer` and `Cache-Control: private, no-store`.
- Ids are masked in request logs (`/ui/[FILTERED]`).

### When this model stops being enough

Shared secrets are sufficient only while the server stays a stateless renderer on the VPN. Switch to NitroID OAuth (MCP authorization spec, as the Nexus MCP gateway does) before exposing it to the internet, adding a tool that reads Power data, persisting anything for a user, or acting on a user's behalf.

### Consumers and keys

| Consumer | Holder |
|----------|--------|
| `librechat` | NIP (configured centrally in LibreChat; end users never see the key) |
| `dw_agent` | Data-warehouse agent owners |

Staging/production keys live in sops-encrypted `playbook-mcp/config/deploy/<env>/secrets.yaml` (`consumerKeys`). To rotate or revoke a consumer, change or remove only its entry and redeploy.

Report MCP service issues the same way as design-system vulnerabilities (GitHub issue), and include the service version from `GET /health` when possible.
