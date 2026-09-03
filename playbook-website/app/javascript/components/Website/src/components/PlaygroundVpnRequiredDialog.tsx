import { useEffect, useState } from "react"
import { Dialog } from "playbook-ui"
import {
  PLAYGROUND_VPN_REQUIRED_EVENT,
  STAGING_ORIGIN,
  goToStaging,
  type PlaygroundVpnRequiredDetail,
} from "../utils/siteNavigation"

/**
 * Shown when a Playground redirect to staging fails because staging is unreachable
 * (almost always: user is not on VPN).
 */
const PlaygroundVpnRequiredDialog = () => {
  const [opened, setOpened] = useState(false)
  const [destinationUrl, setDestinationUrl] = useState(
    `${STAGING_ORIGIN}/playground`
  )

  useEffect(() => {
    const open = (event: Event) => {
      const detail = (event as CustomEvent<PlaygroundVpnRequiredDetail>).detail
      setDestinationUrl(detail?.destinationUrl || `${STAGING_ORIGIN}/playground`)
      setOpened(true)
    }
    window.addEventListener(PLAYGROUND_VPN_REQUIRED_EVENT, open)
    return () => window.removeEventListener(PLAYGROUND_VPN_REQUIRED_EVENT, open)
  }, [])

  const close = () => setOpened(false)

  const retry = () => {
    close()
    void goToStaging(destinationUrl)
  }

  return (
    <Dialog
      cancelButton="Close"
      confirmButton="Try again"
      onCancel={close}
      onClose={close}
      onConfirm={retry}
      opened={opened}
      size="sm"
      text="Playground runs on our staging site, which is only reachable on the company VPN. Connect to VPN, then try again."
      title="VPN required for Playground"
    />
  )
}

export default PlaygroundVpnRequiredDialog
