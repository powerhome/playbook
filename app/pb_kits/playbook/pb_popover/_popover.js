import { createPopper } from '@popperjs/core'

class Popover {
  constructor(
    button = '#button',
    tooltip = '#tooltip',
    placement = 'left',
    offset = ''
  ) {
    this.button = button
    this.tooltip = tooltip
    this.placement = placement
    this.offset = offset
    this.setupPopper()
  }

  //getters
  get popoverButton() {
    return document.querySelector(this.button)
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
    this.popoverButton.addEventListener('click', () => {
      this.popoverTooltip.classList.toggle('show')
    })
  }

  setupPopper() {
    createPopper(this.popoverButton, this.popoverTooltip, {
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
