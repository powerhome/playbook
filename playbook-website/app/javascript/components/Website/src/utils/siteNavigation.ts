export const PROD_ORIGIN = "https://playbook.powerapp.cloud"
export const STAGING_ORIGIN = "https://staging.playbook.powerapp.cloud"
const STAGING_HOST = "staging.playbook.powerapp.cloud"
const STAGING_CHECK_TIMEOUT_MS = 3500

export const PLAYGROUND_VPN_REQUIRED_EVENT = "pb-playground-vpn-required"

const normalizePath = (path: string) => (path.startsWith("/") ? path : `/${path}`)

const isPlaygroundPath = (path: string) => {
  const normalized = normalizePath(path)
  return normalized === "/playground" || normalized.startsWith("/playground?")
}

export const isStagingHost = () =>
  typeof window !== "undefined" && window.location.hostname === STAGING_HOST

export const isLocalHost = () => {
  if (typeof window === "undefined") return false
  const host = window.location.hostname
  return host === "localhost" || host === "127.0.0.1"
}

/** Absolute href when leaving the current host; otherwise the relative path. */
export const siteHref = (path: string) => {
  const normalized = normalizePath(path)

  // Local/dev: keep playground on this host so VPN is not required.
  if (isLocalHost()) return normalized

  const onStaging = isStagingHost()

  if (isPlaygroundPath(normalized) && !onStaging) {
    return `${STAGING_ORIGIN}${normalized}`
  }

  if (!isPlaygroundPath(normalized) && onStaging) {
    return `${PROD_ORIGIN}${normalized}`
  }

  return normalized
}

export const showPlaygroundVpnRequired = () => {
  window.dispatchEvent(new CustomEvent(PLAYGROUND_VPN_REQUIRED_EVENT))
}

/** Best-effort check: staging is internal and usually unreachable off VPN. */
export const isStagingReachable = async (): Promise<boolean> => {
  if (isStagingHost() || isLocalHost()) return true

  const controller = new AbortController()
  const timeoutId = window.setTimeout(
    () => controller.abort(),
    STAGING_CHECK_TIMEOUT_MS
  )

  try {
    await fetch(`${STAGING_ORIGIN}/favicon.ico?_=${Date.now()}`, {
      cache: "no-store",
      mode: "no-cors",
      signal: controller.signal,
    })
    return true
  } catch {
    return false
  } finally {
    window.clearTimeout(timeoutId)
  }
}

/**
 * Redirect to a staging URL after confirming staging is reachable.
 * Shows a VPN dialog instead of sending users to a failed browser load.
 */
export const goToStaging = async (url: string) => {
  if (isStagingHost()) {
    window.location.assign(url)
    return
  }

  if (isLocalHost()) {
    const path = url.startsWith(STAGING_ORIGIN)
      ? url.slice(STAGING_ORIGIN.length) || "/playground"
      : url
    window.location.assign(path)
    return
  }

  const reachable = await isStagingReachable()
  if (!reachable) {
    showPlaygroundVpnRequired()
    return
  }

  window.location.assign(url)
}

/**
 * SPA navigate on the same host; full-page redirect when crossing staging ↔ prod
 * (Playground lives on staging; everything else on prod).
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

/** Kit-doc Playground tab lives on staging; Docs/Props live on prod. */
export const kitShowTabHref = (tab: string, pathname: string) => {
  const path = pathname || window.location.pathname
  if (tab === "playground") {
    if (isLocalHost()) {
      const params = new URLSearchParams(window.location.search)
      params.set("tab", "playground")
      return `${path}?${params.toString()}`
    }
    return `${STAGING_ORIGIN}${path}?tab=playground`
  }

  const params = new URLSearchParams()
  if (tab === "props") params.set("tab", "props")
  const qs = params.toString()

  if (isLocalHost()) {
    return `${path}${qs ? `?${qs}` : ""}`
  }

  return `${PROD_ORIGIN}${path}${qs ? `?${qs}` : ""}`
}
