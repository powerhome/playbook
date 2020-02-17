import Popper from 'popper.js'

const POPOVER_OFFSET_Y = {
  offset: {
    offset: '0, 8',
  },
}

class PbPopover {
  constructor(
    triggerElement = '#triggerElement',
    tooltip = '#tooltip',
    placement = 'left',
    offset = false,
  ) {
    this.triggerElement = triggerElement
    this.tooltip = tooltip
    this.placement = placement
    this.offset = offset
    this.setupPopper()
  }

  //getters
  get referenceElement() {
    return document.querySelector(this.triggerElement)
  }
  get popoverTooltip() {
    return document.querySelector(this.tooltip)
  }

  attachEvents() {
    this.referenceElement.addEventListener('click', () => {
      this.popoverTooltip.classList.toggle('show')
      this.popper.scheduleUpdate()
    })
  }

  setupPopper() {
    this.popper = new Popper(this.referenceElement, this.popoverTooltip, {
      placement: this.placement,
      modifiers: this.offset ? POPOVER_OFFSET_Y : {},
    })

    this.attachEvents()
  }
}

export default PbPopover
