import React, { useState } from "react"

import {
  Body,
  Button,
  Dialog,
  Flex,
  IconCircle,
  Title
} from "../../"

const DialogAlert = () => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  return (
    <>
      <Button onClick={open}>{"Open a Default Alert"}</Button>
      <Dialog
          borderRadius="xl"
          onClose={close}
          opened={isOpen}
          size="sm"
      >
        <Dialog.Body>
          <Flex
              align="center"
              orientation="column"
          >
            <IconCircle
                icon="exclamation-circle"
                marginY="xs"
                size="lg"
            />
            <Title
                marginY="sm"
                size={3}
            >
                  {"Are you sure?"}
            </Title>
            <Body
                marginY="xs"
                text="Text explaining why this alert happened"
            />
          </Flex>
        </Dialog.Body>
        <Dialog.Footer>
          <Button
              onClick={close}
              variant="secondary"
          >
            {"No, Cancel"}
          </Button>
          <Button
              onClick={close}
          >
            {"Yes, Do things"}
          </Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

export default DialogAlert
