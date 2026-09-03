import { useLayoutEffect, useState } from "react"
import { Dialog } from "playbook-ui"
import {
  PLAYGROUND_VPN_WARNING_EVENT,
  STAGING_ORIGIN,
} from "../utils/siteNavigation"
import type { PlaygroundVpnWarningDetail } from "../utils/siteNavigation"

/**
 * Shown before any redirect to staging (Playground lives there and is VPN-only).
 * Staging reachability can't be reliably detected client-side, so this warns
 * up front instead of silently sending the user to a page that may fail —
 * "Try again" performs the redirect, "Go back" just closes the dialog.
 */
const PlaygroundVpnWarningDialog = () => {
  const [opened, setOpened] = useState(false)
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
      setOpened(true)
    }
    window.addEventListener(PLAYGROUND_VPN_WARNING_EVENT, open)
    return () => window.removeEventListener(PLAYGROUND_VPN_WARNING_EVENT, open)
  }, [])

  const goBack = () => setOpened(false)

  const tryAgain = () => {
    setOpened(false)
    window.location.assign(destinationUrl)
  }

  return (
    <Dialog
      cancelButton="Go back"
      confirmButton="Try again"
      onCancel={goBack}
      onClose={goBack}
      onConfirm={tryAgain}
      opened={opened}
      size="sm"
      text={'Access to Playground requires the company VPN. If you\'re not connected, sign in to VPN and click "Try again." If you don\'t have VPN access, click "Go back."'}
      title="VPN required for Playground"
    />
  )
}

export default PlaygroundVpnWarningDialog
