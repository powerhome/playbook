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

  //getters
  get popoverTriggerElement() {
    return document.querySelector(this.triggerElement)
  }
  get popoverTooltip() {
    return document.querySelector(this.tooltip)
  }
  get popoverPlacement() {
    return this.placement
  }
  get popoverOffset() {
    return this.offset
  }

  attachEvents() {
    this.popoverTriggerElement.addEventListener('click', () => {
      this.popoverTooltip.classList.toggle('show')
    })
  }

  setupPopper() {
    createPopper(this.popoverTriggerElement, this.popoverTooltip, {
      placement: this.popoverPlacement,
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
