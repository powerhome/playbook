import PbEnhancedElement from '../pb_enhanced_element'
import { createPopper, Instance, Placement } from '@popperjs/core'

const POPOVER_OFFSET_Y = [0, 20]

export default class PbPopover extends PbEnhancedElement {
  popper: Instance
  _triggerElement: HTMLElement
  _tooltip: HTMLElement
  element: HTMLElement
  static get selector() {
    return '[data-pb-popover-kit]'
  }

  moveTooltip() {
    let container: HTMLElement | null;

    if (this.appendTo === "parent") {
      container = this.element.parentElement;
    } else if (this.appendTo) {
      container = document.querySelector(this.appendTo);
    }

    (container || document.body).appendChild(this.tooltip);
  }

  connect() {
    this.moveTooltip()
    this.popper = createPopper (this.triggerElement, this.tooltip, {
      placement: this.position as Placement,
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

    this.triggerElement.addEventListener('click', (event: Event) => {
      event.preventDefault()
      event.stopPropagation()

      if (!this.tooltip.classList.contains('show')) {
        this.checkCloseTooltip()
      }

      setTimeout(() => {
        this.toggleTooltip()
        this.popper.update()
      }, 0)
    })
  }

  checkCloseTooltip() {
    document.querySelector('body').addEventListener('click', ({ target } ) => {
      const isTooltipElement = (target as HTMLElement).closest(`#${this.tooltipId}`) !== null
      const isTriggerElement = (target as HTMLElement).closest(`#${this.triggerElementId}`) !== null

      switch (this.closeOnClick) {
      case 'any':
        if (isTooltipElement || !isTooltipElement && !isTriggerElement) {
          this.hideTooltip()
        }
        break
      case 'outside':
        if (!isTooltipElement && !isTriggerElement) {
          this.hideTooltip()
        }
        break
      case 'inside':
        if (isTooltipElement) {
          this.hideTooltip()
        }
        break
      }
    }, true)
  }

  hideTooltip() {
    this.tooltip.classList.remove('show')
    this.tooltip.classList.add('hide')
  }

  toggleTooltip() {
    this.tooltip.classList.toggle('show')
    this.tooltip.classList.toggle('hide')
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

  get appendTo() {
    return this.element.dataset.pbPopoverAppendTo;
  }
}
