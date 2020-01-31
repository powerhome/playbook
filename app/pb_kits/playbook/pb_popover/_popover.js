import { createPopper } from '@popperjs/core'

class Popover {
  constructor(
    triggerElement = '#triggerElement',
    tooltip = '#tooltip',
    placement = 'left',
    offset = ''
  ) {
    this.triggerElement = triggerElement
    this.tooltip = tooltip
    this.placement = placement
    this.offset = offset
    this.setupPopper()
  }

  bodyClick = (event) => {
    const { target } = event

    if (target === this.popoverTriggerElement) return

    this.popoverTooltip.classList.remove('show')
    this.popoverTooltip.classList.add('hide')
    document.body.removeEventListener('click', this.bodyClick, false)
  }

  attachEvents() {
    this.popoverTriggerElement.addEventListener('click', (event) => {
      this.popoverTooltip.classList.toggle('show')
      this.popper.update()

      event.stopPropagation()
      document.body.addEventListener('click', this.bodyClick, false)
    })
  }

  setupPopper() {
    this.popoverTriggerElement = document.querySelector(this.triggerElement)
    this.popoverTooltip = document.querySelector(this.tooltip)

    this.popper = createPopper(this.popoverTriggerElement, this.popoverTooltip, {
      placement: this.placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: this.offset,
          },
        },
      ],
    })

    this.attachEvents()
  }
}

export default Popover
