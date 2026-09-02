export const PROD_ORIGIN = "https://playbook.powerapp.cloud"
export const STAGING_ORIGIN = "https://staging.playbook.powerapp.cloud"
const STAGING_HOST = "staging.playbook.powerapp.cloud"

const normalizePath = (path: string) => (path.startsWith("/") ? path : `/${path}`)

const isPlaygroundPath = (path: string) => {
  const normalized = normalizePath(path)
  return normalized === "/playground" || normalized.startsWith("/playground?")
}

export const isStagingHost = () =>
  typeof window !== "undefined" && window.location.hostname === STAGING_HOST

/** Absolute href when leaving the current host; otherwise the relative path. */
export const siteHref = (path: string) => {
  const normalized = normalizePath(path)
  const onStaging = isStagingHost()

  if (isPlaygroundPath(normalized) && !onStaging) {
    return `${STAGING_ORIGIN}${normalized}`
  }

  if (!isPlaygroundPath(normalized) && onStaging) {
    return `${PROD_ORIGIN}${normalized}`
  }

  return normalized
}

/**
 * SPA navigate on the same host; full-page redirect when crossing staging ↔ prod
 * (Playground lives on staging; everything else on prod).
 */
export const navigateSite = (navigate: (to: string) => void, path: string) => {
  if (!path) return

  const href = siteHref(path)
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
    return `${STAGING_ORIGIN}${path}?tab=playground`
  }

  const params = new URLSearchParams()
  if (tab === "props") params.set("tab", "props")
  const qs = params.toString()
  return `${PROD_ORIGIN}${path}${qs ? `?${qs}` : ""}`
}
