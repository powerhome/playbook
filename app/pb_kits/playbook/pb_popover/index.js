import PbEnhancedElement from '../pb_enhanced_element'
import { createPopper } from '@popperjs/core'

const POPOVER_OFFSET_Y = [0, 20]

export default class PbPopover extends PbEnhancedElement {
  static get selector() {
    return '[data-pb-popover-kit]'
  }

  connect() {
    this.popper = createPopper(this.triggerElement, this.tooltip, {
      placement: this.position,
      strategy: 'fixed',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: this.offset,
          },
        },
      ],
    })

    this.triggerElement.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopPropagation()

      if (!this.tooltip.classList.contains('show')) {
        this.checkCloseTooltip()
      }

      setTimeout(() => {
        // this.popper.scheduleUpdate()
        this.tooltip.classList.toggle('show')
      }, 0)
    })
  }

  checkCloseTooltip() {
    document.querySelector('body').addEventListener('click', ({ target }) => {
      const isTriggerElement = target.closest(`#${this.triggerElementId}`) !== null
      const isTooltipElement = target.closest(`#${this.tooltipId}`) !== null

      switch (this.closeOnClick) {
      case 'any':
        this.hideTooltip()
        break
      case 'outside':
        if (isTooltipElement) {
          this.checkCloseTooltip()
        } else {
          this.hideTooltip()
        }
        break
      case 'inside':
        if (isTooltipElement || isTriggerElement) {
          this.hideTooltip()
        } else {
          this.checkCloseTooltip()
        }
        break
      }
    }, { once: true })
  }

  hideTooltip() {
    this.tooltip.classList.remove('show')
  }

  toggleTooltip() {
    this.tooltip.classList.toggle('show')
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
    return this.element.dataset.pbPopoverOffset === 'true' ? POPOVER_OFFSET_Y : [0, 0]
  }

  get closeOnClick() {
    return this.element.dataset.pbPopoverCloseOnClick
  }
}
