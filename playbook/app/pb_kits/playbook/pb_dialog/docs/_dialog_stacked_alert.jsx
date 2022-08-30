/* eslint-disable react/jsx-handler-names */
import React, { useState } from "react"
import { Button, Dialog, Flex,
  //  FlexItem, SectionSeparator 
  } from "../.."

const useDialog = (visible = false) => {
  const [opened, setOpened] = useState(visible)
  const toggle = () => setOpened(!opened)
  return [opened, toggle]
}

const DialogStackedAlert = () => {
  const [defaultAlertOpened, toggleDefaultAlert] = useDialog()
  const [cautionAlertOpened, toggleCautionAlert] = useDialog()
  const [deleteAlertOpened, toggleDeleteAlert] = useDialog()
  // const [singleButtonOpen, toggleSingleButtonOpen] = useDialog()
  // const [stackedButtonOpen, toggleStackedButtonOpen] = useDialog()
  // const [singleLinkButtonOpen, toggleSingleLinkButtonOpen] = useDialog()
  // const [twoLinkButtonOpen, toggleTwoLinkButtonOpen] = useDialog()


  const dialogs = [
    {
      size: 'sm',
      status: "default",
      text: "Text explaining why there is an alert",
      title: "Are you sure?",
      toggle: toggleDefaultAlert,
      visible: defaultAlertOpened,
      buttonOneText:"Yes, Action",
      buttonTwoText: "No, Cancel"
    },
    {
      size: 'sm',
      status: "caution",
      text: "This is the action you will be taking",
      title: "Are you sure?",
      toggle: toggleCautionAlert,
      visible: cautionAlertOpened,
      buttonOneText:"Yes, Action",
      buttonTwoText: "No, Cancel"
    },
    {
      size: 'sm',
      status: "delete",
      text: "You are about to delete ...",
      title: "Delete",
      toggle: toggleDeleteAlert,
      visible: deleteAlertOpened,
      buttonOneText:"Yes, Delete",
      buttonTwoText: "No, Cancel"
    },
    // {
    //   size: 'sm',
    //   status: "info",
    //   text: "Text explaining why there is an alert",
    //   title: "Are you sure?",
    //   toggle: toggleSingleButtonOpen,
    //   visible: singleButtonOpen,
    //   confirmedButton:"Ok, Thanks",
    // },
    // {
    //   size: 'sm',
    //   status: "error",
    //   text: "Text explaining the error",
    //   title: "Error Message",
    //   confirmedButton:"Yes, Action",
    //   cancelledButton: "Ok, Cancel",
    //   toggle: toggleStackedButtonOpen,
    //   visible: stackedButtonOpen,
    // },
    // {
    //   size: 'sm',
    //   status: "caution",
    //   text: "This is the action you will be taking",
    //   title: "Are you sure?",
    //   toggle: toggleSingleLinkButtonOpen,
    //   visible: singleLinkButtonOpen,
    //   linkConfirmedButton:"Ok, Thanks!"
    // },
    // {
    //   size: 'sm',
    //   status: "success",
    //   text: "Text explaining what is successful",
    //   title: "Success",
    //   toggle: toggleTwoLinkButtonOpen,
    //   visible: twoLinkButtonOpen,
    //   linkConfirmedButton:"Ok",
    //   linkCancelledButton: "Cancel"
    // }
  ]

  return (
    <div>
    <Flex>
      <Button
          marginRight="md"
          onClick={toggleDefaultAlert}
      >
        {"Default Status"}
      </Button>
      <Button
          marginRight="md"
          onClick={toggleCautionAlert}
      >
        {"Caution Status"}
      </Button>
      <Button
          marginRight="md"
          onClick={toggleDeleteAlert}
      >
        {"Delete Status"}
      </Button>
      {/* <Button
          marginRight="md"
          onClick={toggleSingleButtonOpen}
      >
        {"1 Button Information Status"}
      </Button>
      <Button
          marginRight="md"
          onClick={toggleStackedButtonOpen}
      >
        {"2 Button Error Status"}
      </Button> */}
      {/* <Button
          marginRight="md"
          onClick={toggleSingleLinkButtonOpen}
      >
        {"1 Link Button Caution"}
      </Button>
      <Button
          marginRight="md"
          onClick={toggleTwoLinkButtonOpen}
      >
        {"2 Link Button Success"}
      </Button> */}
    </Flex>
    <Flex>
      {dialogs.map((dialog) => (
        <Dialog
            alertStyle={dialog.alertStyle}
            key={dialog.status}
            onClose={dialog.toggle}
            opened={dialog.visible}
            size={dialog.size}
            status={dialog.status}
            text={dialog.text}
            title={dialog.title}
        >
        <Dialog.Footer
            padding="sm"
            paddingBottom = "none"
            paddingX="md"
        >
          <Button
              fullWidth
              onClick={dialog.toggle}
          >
            {dialog.buttonOneText}
          </Button>
        </Dialog.Footer>
        <Dialog.Footer
            padding="sm"
            paddingBottom = "md"
            paddingX="md"
        >
          <Button
              fullWidth
              onClick={dialog.toggle}
              variant="secondary"
          >
            {dialog.buttonTwoText}
          </Button>
        </Dialog.Footer>
        {/* <If condition={dialog.cancelledButton || dialog.confirmedButton}>
          <Dialog.Footer>
            <Button
                fullWidth
                onClick={dialog.toggle}
            >
              {dialog.confirmedButton}
            </Button>
          </Dialog.Footer>
          <If condition={dialog.cancelledButton}>
            <Dialog.Footer paddingTop="none">
              <Button
                  fullWidth
                  onClick={dialog.toggle}
                  variant="secondary"
              >
                {dialog.cancelledButton}
              </Button>
            </Dialog.Footer>
          </If>
        </If>
        <If condition={dialog.linkCancelledButton || dialog.linkConfirmedButton} >
            <SectionSeparator />
            <Flex
                inline="flex-container"
                vertical="stretch"
            >
              <FlexItem flex={1} >
                <Button
                    fullWidth
                    onClick={dialog.toggle}
                    variant="link"
                >
                  {dialog.linkConfirmedButton}
                </Button>
              </FlexItem>
              <If condition={dialog.linkCancelledButton}>
                <SectionSeparator orientation="vertical"/>
                <FlexItem flex={1}>
                  <Button
                      fullWidth
                      onClick={dialog.toggle}
                      variant="link"
                  >
                    {dialog.linkCancelledButton}
                  </Button>
                </FlexItem>
              </If>
            </Flex>
        </If> */}
        </Dialog>
      ))}
    </Flex>
  </div>
  )
}

export default DialogStackedAlert
