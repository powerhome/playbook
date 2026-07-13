  import type { KeyboardEvent, MouseEvent } from 'react'
import { SelectableCardIcon, Tooltip, usePBCopy } from 'playbook-ui'

type IconCardProps = {
  iconName: string,
}

const IconCard = ({ iconName }: IconCardProps) => {
  const [copied, copyToClipboard] = usePBCopy({ value: iconName, timeout: 1500 })

  const handleCopy = (event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
    const selection = window.getSelection()?.toString()
    if (selection) return

    event.preventDefault()
    copyToClipboard()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleCopy(event)
    }
  }

  return (
    <Tooltip
      delay={{ close: 1000 }}
      forceOpenTooltip={copied}
      placement="top"
      showTooltip={false}
      text="Icon copied"
    >
      <SelectableCardIcon
        className="icon-card"
        cursor="pointer"
        htmlOptions={{
          'aria-label': `Copy ${iconName} to clipboard`,
          onClick: handleCopy,
          onKeyDown: handleKeyDown,
          role: 'button',
          style: { userSelect: 'text' },
          tabIndex: 0,
        }}
        icon={iconName}
        onChange={() => {}}
        titleText={iconName}
      />
    </Tooltip>
  )
}

export default IconCard
