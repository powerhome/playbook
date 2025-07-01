import PbEnhancedElement from '../pb_enhanced_element'
import { computePosition, offset, flip, shift, autoUpdate, Placement } from '@floating-ui/dom'

const POPOVER_OFFSET_Y = [0, 20]

export default class PbPopover extends PbEnhancedElement {
  _triggerElement: HTMLElement
  _tooltip: HTMLElement
  cleanupAutoUpdate: () => void
  element: HTMLElement
  static get selector() {
    return '[data-pb-popover-kit]'
  }

  moveTooltip() {
    let container: HTMLElement | null = document.querySelector('body');

    if (this.appendTo === "parent") {
      container = this.element.parentElement && this.element.parentElement
    } else if (this.appendTo) {
      container = document.querySelector(this.appendTo)
    }

    container.appendChild(this.tooltip);
  }

  connect() {
    if (!this.triggerElement || !this.tooltip) {
      console.warn('Popover requires both trigger and tooltip elements to be defined.')
      return
    }
    this.moveTooltip()

    // Initial position
    this.updatePosition()

    // Update position (i.e., scroll or resize)
    this.cleanupAutoUpdate = autoUpdate(
      this.triggerElement,
      this.tooltip,
      () => this.updatePosition()
    )

    this.triggerElement.addEventListener('click', (event: Event) => {
      event.preventDefault()
      event.stopPropagation()

      if (!this.tooltip.classList.contains('show')) {
        this.checkCloseTooltip()
      }

      setTimeout(() => {
        this.toggleTooltip()
        this.updatePosition()
      }, 0)
    })
  }

  updatePosition() {
    computePosition(this.triggerElement, this.tooltip, {
      placement: this.position as Placement,
      strategy: 'fixed',
      middleware: [
        offset(() => {
          const [ crossAxis, mainAxis ] = this.offset
          return { mainAxis, crossAxis }
        }),
        flip(),
        shift(),
      ],
    }).then(({ x, y }) => {
      Object.assign(this.tooltip.style, {
        left: `${x}px`,
        top: `${y}px`,
        position: 'fixed',
      })
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
