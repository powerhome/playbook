import React from "react"
import { Button, Detail, Icon, Flex, Tooltip } from "playbook-ui"
import { UnstyledOpenInCodeSandboxButton } from "@codesandbox/sandpack-react"
import CodeSandboxIcon from "../../assets/CodeSandboxIcon"
export const Buttons = ({
  isExpanded,
  setIsExpanded,
  hasCopied,
  showCopyTooltip,
  handleCopy,
}) => {
  return (
    <Flex>
      <Tooltip
        placement='top'
        text={isExpanded ? "Hide Code" : "Show Code"}
        zIndex={10}
      >
        <Button
          margin='xs'
          variant='rounded'
          onClick={() => setIsExpanded(!isExpanded)}
          tabIndex={0}
        >
          <Detail color='default'>
            <Icon icon='arrows-from-line' />
          </Detail>
        </Button>
      </Tooltip>
      <Tooltip
        placement='top'
        text={hasCopied ? "Copied!" : "Copy Code"}
        zIndex={10}
        showTooltip={showCopyTooltip}
        delay={{
          close: hasCopied ? 3000 : 0,
        }}
      >
        <Button margin='xs' variant='rounded' onClick={handleCopy} tabIndex={0}>
          <Detail color='default'>
            <Icon icon='copy' />
          </Detail>
        </Button>
      </Tooltip>

      <Tooltip
        placement='top'
        text={"Open in Sandbox"}
        position='fixed'
        zIndex={10}
      >
        <UnstyledOpenInCodeSandboxButton className='pb_button_kit_rounded_inline_enabled rounded m_xs'>
          <Detail>
            <Icon customIcon={CodeSandboxIcon()} />
          </Detail>
        </UnstyledOpenInCodeSandboxButton>
      </Tooltip>
    </Flex>
  )
}
