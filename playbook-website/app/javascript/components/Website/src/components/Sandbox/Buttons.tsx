import React from "react"
import { Button, Detail, Icon, Flex, Tooltip } from "playbook-ui"
import CodeSandboxIcon from "../../assets/CodeSandboxIcon"
import "./styles.scss"
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
          className='rounded'
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
        <Button margin='xs' className='rounded' onClick={handleCopy} tabIndex={0}>
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
      </Tooltip>
    </Flex>
  )
}
