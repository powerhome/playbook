import PbEnhancedElement from '../pb_enhanced_element'
import Popper from 'popper.js'

const POPOVER_OFFSET_Y = '0,8'

export default class PbPopover extends PbEnhancedElement {
  static get selector() {
    return '[data-pb-popover-kit]'
  }

  connect() {
    this.popper = new Popper(this.triggerElement, this.tooltip, {
      placement: this.position,
      modifiers: {
        offset: {
          offset: this.offset === 'true' ? POPOVER_OFFSET_Y : '0,0',
        },
      },
    })

    this.triggerElement.addEventListener('click', () => {
      this.tooltip.classList.toggle('show')
      this.popper.scheduleUpdate()
    })
  }

  get triggerElement() {
    return this._triggerElement = (this._triggerElement || document.querySelector(`#${this.triggerElementId}`))
  }

  get tooltip() {
    return this._tooltip = (this._tooltip || this.element.querySelector(`#${this.tooltipId}`))
  }

  get position() {
    return this.element.dataset.pbPopoverPosition
  }

  get triggerElementId() {
    return this.element.dataset.pbPopoverTriggerElementId
  }

  get tooltipId() {
    return this.element.dataset.pbPopoverTooltipId
  }

  get offset() {
    return this.element.dataset.pbPopoverOffset
  }
}
