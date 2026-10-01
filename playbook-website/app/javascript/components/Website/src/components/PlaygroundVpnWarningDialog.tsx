import { useLayoutEffect, useRef, useState } from "react"
import { Dialog } from "playbook-ui"
import {
  PLAYGROUND_VPN_WARNING_EVENT,
  STAGING_ORIGIN,
  stagingIsReachable,
  withStagingCacheBust,
} from "../utils/siteNavigation"
import type { PlaygroundVpnWarningDetail } from "../utils/siteNavigation"

/**
 * Shown before any redirect to staging (Playground lives there and is VPN-only).
 * Confirm checks that staging answers before navigating. A failed document load
 * is cached by the browser and keeps showing a 404 after the VPN reconnects.
 */
const VPN_HINT =
  "Access to Playground is only available on the Power VPN. Make sure you are on the VPN to access the Playground."
const VPN_UNREACHABLE =
  "Playground still isn't reachable. Connect to the Power VPN, then try again."

const PlaygroundVpnWarningDialog = () => {
  const [opened, setOpened] = useState(false)
  const [checking, setChecking] = useState(false)
  const [unreachable, setUnreachable] = useState(false)
  const checkingRef = useRef(false)
  const [destinationUrl, setDestinationUrl] = useState(
    `${STAGING_ORIGIN}/playground`
  )

  // useLayoutEffect, not useEffect: React runs every component's layout
  // effects (bottom-up, in tree order) before any component's passive
  // effects run. Playground/KitShow dispatch this event from their own
  // useEffect on mount — with a passive effect here, this dialog (a later
  // sibling of the routed content) could still be waiting for its listener
  // to attach when that fires, silently dropping the very first dispatch.
  useLayoutEffect(() => {
    const open = (event: Event) => {
      const detail = (event as CustomEvent<PlaygroundVpnWarningDetail>).detail
      setDestinationUrl(detail?.destinationUrl || `${STAGING_ORIGIN}/playground`)
      checkingRef.current = false
      setChecking(false)
      setUnreachable(false)
      setOpened(true)
    }
    window.addEventListener(PLAYGROUND_VPN_WARNING_EVENT, open)
    return () => window.removeEventListener(PLAYGROUND_VPN_WARNING_EVENT, open)
  }, [])

  const goBack = () => {
    checkingRef.current = false
    setChecking(false)
    setUnreachable(false)
    setOpened(false)
  }

  const tryAgain = async () => {
    if (checkingRef.current) return
    checkingRef.current = true
    setChecking(true)
    const reachable = await stagingIsReachable()
    // Escape / the header close control calls goBack while this is in flight
    // and clears the ref. Confirm stays disabled, but that close path does not.
    if (!checkingRef.current) return
    if (!reachable) {
      checkingRef.current = false
      setChecking(false)
      setUnreachable(true)
      return
    }

    // Unique URL so a 404 cached for the bare staging path is not replayed.
    window.location.assign(withStagingCacheBust(destinationUrl))
  }

  return (
    <Dialog
      cancelButton="Cancel"
      confirmButton="Enter Playground"
      loading={checking}
      onCancel={goBack}
      onClose={goBack}
      onConfirm={tryAgain}
      opened={opened}
      size="md"
      text={unreachable ? VPN_UNREACHABLE : VPN_HINT}
      title="VPN Required"
    />
  )
}

export default PlaygroundVpnWarningDialog
