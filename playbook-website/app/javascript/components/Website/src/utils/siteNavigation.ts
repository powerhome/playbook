export const PROD_ORIGIN = "https://playbook.powerapp.cloud"
export const STAGING_ORIGIN = "https://staging.playbook.powerapp.cloud"
const PROD_HOST = "playbook.powerapp.cloud"
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

export const showPlaygroundVpnRequired = () => {
  window.dispatchEvent(new CustomEvent(PLAYGROUND_VPN_REQUIRED_EVENT))
}

/** Best-effort check: staging is internal and usually unreachable off VPN. */
export const isStagingReachable = async (): Promise<boolean> => {
  if (isStagingHost() || !isProductionHost()) return true

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
 * Only used from the production host.
 */
export const goToStaging = async (url: string) => {
  if (isStagingHost()) {
    window.location.assign(url)
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

  const reachable = await isStagingReachable()
  if (!reachable) {
    showPlaygroundVpnRequired()
    return
  }

  window.location.assign(url)
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
