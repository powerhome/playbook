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
- `PLAYBOOK_MCP_ALLOWLIST` must be set to LibreChat / DW egress IPs (comma-separated). An empty allowlist refuses boot in production.
- Prefer setting `PLAYBOOK_MCP_TRUSTED_PROXIES` to ingress CIDRs so client IP uses `ActionDispatch` trusted-proxy rules (not raw leftmost `X-Forwarded-For`).

### Controls

- Rate limiting (`PLAYBOOK_MCP_RATE_LIMIT_MAX`, `PLAYBOOK_MCP_RATE_LIMIT_WINDOW`) — per process; pair with allowlisting.
- Input size caps (`PLAYBOOK_MCP_MAX_PROPS_BYTES`).
- Kit names resolved only through Playbook `KitResolver` + `dist/ai` schema validation.
- HTML `children` allowed only for composition kits (`table`, `card`, etc.) and sanitized with a SafeList (no scripts / event handlers).
- Chart `options` are scrubbed of Highcharts HTML/JS sinks (`useHTML`, `*formatter`, etc.).
- Generated MCP-UI documents set a Content-Security-Policy; chart peers are self-hosted under `/assets/vendor` (run `bin/vendor_chart_peers`), not third-party CDNs at runtime.
- Static assets are path-allowlisted under gem `dist/` / `fonts/` + vendored chart peers, with permissive CORS (`Access-Control-Allow-Origin: *`) so opaque-origin sandboxed iframes can load web fonts.
- Optional shared secret: `PLAYBOOK_MCP_SHARED_SECRET` requires LibreChat custom header `X-Playbook-Mcp-Key`.
- Transport is streamable-http only (deprecated standalone SSE is not used).

Report MCP service issues the same way as design-system vulnerabilities (GitHub issue), and include the service version from `GET /health` when possible.
