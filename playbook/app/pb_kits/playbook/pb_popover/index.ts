import PbEnhancedElement from '../pb_enhanced_element'
import { createPopper, Instance, Placement } from '@popperjs/core'
import {
  subscribeFloatingKitReposition,
  targetIsInsidePortaledFloatingKit,
} from '../utilities/floatingPortalHosts'

const POPOVER_OFFSET_Y = [0, 20]

export default class PbPopover extends PbEnhancedElement {
  popper: Instance
  _triggerElement: HTMLElement
  _tooltip: HTMLElement
  element: HTMLElement
  _unsubscribeFloatingReposition: (() => void) | null = null
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

    this._unsubscribeFloatingReposition = subscribeFloatingKitReposition(
      () => {
        if (this.tooltip?.classList.contains('show')) {
          void this.popper?.update()
        }
      },
    )

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

  disconnect(): void {
    this._unsubscribeFloatingReposition?.()
    this._unsubscribeFloatingReposition = null
    this.popper?.destroy()
  }

  checkCloseTooltip() {
    document.querySelector('body').addEventListener('click', ({ target } ) => {
      const t = target as HTMLElement
      const isTooltipElement = t.closest(`#${this.tooltipId}`) !== null
      const isTriggerElement = t.closest(`#${this.triggerElementId}`) !== null
      const isPortaledKit = targetIsInsidePortaledFloatingKit(t)

      switch (this.closeOnClick) {
      case 'any':
        if (isPortaledKit) return
        if (isTooltipElement || !isTooltipElement && !isTriggerElement) {
          this.hideTooltip()
        }
        break
      case 'outside':
        if (!isTooltipElement && !isTriggerElement && !isPortaledKit) {
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
