export const PROD_ORIGIN = "https://playbook.powerapp.cloud"
export const STAGING_ORIGIN = "https://staging.playbook.powerapp.cloud"
const PROD_HOST = "playbook.powerapp.cloud"
const STAGING_HOST = "staging.playbook.powerapp.cloud"
/** Query param so a staging navigation does not reuse a cached off-VPN 404. */
export const STAGING_CACHE_BUST_PARAM = "_pb"
export const STAGING_REACHABLE_PATH = "/playground_reachable"

const normalizePath = (path: string) => (path.startsWith("/") ? path : `/${path}`)

const isPlaygroundPath = (path: string) => {
  const normalized = normalizePath(path)
  return normalized === "/playground" || normalized.startsWith("/playground?")
}

/**
 * New cache key for this staging URL. A browser stores a 404 against the exact
 * URL, and a refresh replays it; `_pb` stays on the URL so that refresh does
 * not fall back onto the poisoned key.
 */
export const withStagingCacheBust = (url: string) => {
  const parsed = new URL(
    url,
    typeof window !== "undefined" ? window.location.origin : PROD_ORIGIN
  )
  parsed.searchParams.set(STAGING_CACHE_BUST_PARAM, String(Date.now()))
  return parsed.toString()
}

export const isStagingHost = () =>
  typeof window !== "undefined" && window.location.hostname === STAGING_HOST

/**
 * True when staging answers. `cache: "no-store"` skips a stored 404, and a
 * network failure (VPN off) rejects instead of navigating into a cacheable error.
 */
export const stagingIsReachable = async () => {
  const url = isStagingHost()
    ? STAGING_REACHABLE_PATH
    : `${STAGING_ORIGIN}${STAGING_REACHABLE_PATH}`
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), 5000)

  try {
    const response = await fetch(url, {
      cache: "no-store",
      credentials: "omit",
      mode: "cors",
      signal: controller.signal,
    })
    return response.ok
  } catch {
    return false
  } finally {
    window.clearTimeout(timeoutId)
  }
}

/** True only on deployed prod — not localhost, review apps, or staging. */
export const isProductionHost = () =>
  typeof window !== "undefined" && window.location.hostname === PROD_HOST

/** Absolute href when leaving the current host; otherwise the relative path. */
export const siteHref = (path: string) => {
  const normalized = normalizePath(path)

  // Prod → staging for Playground only. Local / review keep same-host paths.
  if (isPlaygroundPath(normalized) && isProductionHost()) {
    return `${STAGING_ORIGIN}${normalized}`
  }

  // Staging → prod for everything except Playground.
  if (!isPlaygroundPath(normalized) && isStagingHost()) {
    return `${PROD_ORIGIN}${normalized}`
  }

  return normalized
}

export const PLAYGROUND_VPN_WARNING_EVENT = "pb-playground-vpn-warning"

export type PlaygroundVpnWarningDetail = {
  destinationUrl: string
}

export const showPlaygroundVpnWarning = (destinationUrl: string) => {
  window.dispatchEvent(
    new CustomEvent<PlaygroundVpnWarningDetail>(PLAYGROUND_VPN_WARNING_EVENT, {
      detail: { destinationUrl },
    })
  )
}

/**
 * Redirect to a staging URL. On production, staging is only reachable on the
 * company VPN, and reachability can't be reliably detected client-side — so
 * rather than navigate straight there, this warns the user up front and lets
 * PlaygroundVpnWarningDialog perform the actual navigation once they confirm.
 */
export const goToStaging = (url: string) => {
  if (isStagingHost()) {
    window.location.assign(withStagingCacheBust(url))
    return
  }

  // Local / review: never bounce to deployed staging.
  if (!isProductionHost()) {
    const path = url.startsWith(STAGING_ORIGIN)
      ? url.slice(STAGING_ORIGIN.length) || "/playground"
      : url
    window.location.assign(path)
    return
  }

  showPlaygroundVpnWarning(url)
}

/**
 * SPA navigate on the same host; full-page redirect when crossing staging ↔ prod
 * (Playground lives on staging; everything else on prod). Local/review stay same-host.
 */
export const navigateSite = (navigate: (to: string) => void, path: string) => {
  if (!path) return

  const href = siteHref(path)
  if (href.startsWith(STAGING_ORIGIN)) {
    void goToStaging(href)
    return
  }
  if (href.startsWith("http")) {
    window.location.assign(href)
    return
  }

  navigate(href)
}

/**
 * Kit-doc Playground tab lives on staging in production only.
 * Docs/Props live on prod when leaving staging. Local/review stay same-host.
 */
export const kitShowTabHref = (tab: string, pathname: string) => {
  const path = pathname || window.location.pathname

  if (tab === "playground") {
    if (!isProductionHost() && !isStagingHost()) {
      const params = new URLSearchParams(window.location.search)
      params.set("tab", "playground")
      return `${path}?${params.toString()}`
    }
    return `${STAGING_ORIGIN}${path}?tab=playground`
  }

  const params = new URLSearchParams()
  if (tab === "props") params.set("tab", "props")
  const qs = params.toString()
  const withQs = `${path}${qs ? `?${qs}` : ""}`

  if (!isProductionHost() && !isStagingHost()) {
    return withQs
  }

  return `${PROD_ORIGIN}${withQs}`
}
