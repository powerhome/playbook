import { useEffect, useState } from "react"
import { Dialog } from "playbook-ui"
import {
  PLAYGROUND_VPN_REQUIRED_EVENT,
  STAGING_ORIGIN,
  goToStaging,
} from "../utils/siteNavigation"

/**
 * Shown when a Playground redirect to staging fails because staging is unreachable
 * (almost always: user is not on VPN).
 */
const PlaygroundVpnRequiredDialog = () => {
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    const open = () => setOpened(true)
    window.addEventListener(PLAYGROUND_VPN_REQUIRED_EVENT, open)
    return () => window.removeEventListener(PLAYGROUND_VPN_REQUIRED_EVENT, open)
  }, [])

  const close = () => setOpened(false)

  const retry = () => {
    close()
    void goToStaging(`${STAGING_ORIGIN}/playground`)
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
