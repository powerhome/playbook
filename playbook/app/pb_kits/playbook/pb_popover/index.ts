import PbEnhancedElement from '../pb_enhanced_element'
import { createPopper, Instance, Placement } from '@popperjs/core'
import {
  isPortaledFloatingKitInteraction,
  subscribeFloatingKitReposition,
} from '../utilities/floatingPortalHosts'

const POPOVER_OFFSET_Y = [0, 20]

export default class PbPopover extends PbEnhancedElement {
  popper: Instance
  _triggerElement: HTMLElement
  _tooltip: HTMLElement
  element: HTMLElement
  _unsubscribeFloatingReposition: (() => void) | null = null
  _closeOnClickHandler: ((event: MouseEvent) => void) | null = null
  _closeOnClickTarget: HTMLElement | null = null
  _triggerClickHandler: ((event: Event) => void) | null = null
  _connected = false
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

    this._triggerClickHandler = (event: Event) => {
      event.preventDefault()
      event.stopPropagation()

      setTimeout(() => {
        if (!this._connected) return

        this.toggleTooltip()
        this.popper.update()
      }, 0)
    }
    this.triggerElement.addEventListener('click', this._triggerClickHandler)
    if (this.tooltip.classList.contains('show')) this.checkCloseTooltip()
    this._connected = true
  }

  disconnect(): void {
    this._connected = false
    this._unsubscribeFloatingReposition?.()
    this._unsubscribeFloatingReposition = null
    this.stopCloseTooltipCheck()
    if (this._triggerClickHandler) {
      this.triggerElement.removeEventListener('click', this._triggerClickHandler)
      this._triggerClickHandler = null
    }
    this.popper?.destroy()
    if (this.tooltip) {
      const replacement = this.element.querySelector(`#${this.tooltipId}`)
      if (replacement && replacement !== this.tooltip) this.tooltip.remove()
      else this.element.appendChild(this.tooltip)
    }
  }

  checkCloseTooltip() {
    this._closeOnClickHandler = (event: MouseEvent) => {
      const t = event.target
      const isTooltipElement =
        event.target instanceof Element &&
        event.target.closest(`#${this.tooltipId}`) !== null
      const isTriggerElement =
        event.target instanceof Element &&
        event.target.closest(`#${this.triggerElementId}`) !== null
      const isPortaledKit = isPortaledFloatingKitInteraction(
        t,
        this.tooltipId,
        event.clientX,
        event.clientY,
      )

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
    }
    this._closeOnClickTarget = document.querySelector('body')
    this._closeOnClickTarget.addEventListener('click', this._closeOnClickHandler, true)
  }

  stopCloseTooltipCheck() {
    if (!this._closeOnClickHandler) return

    this._closeOnClickTarget.removeEventListener('click', this._closeOnClickHandler, true)
    this._closeOnClickHandler = null
    this._closeOnClickTarget = null
  }

  hideTooltip() {
    this.stopCloseTooltipCheck()
    if (!this.tooltip.classList.contains('show')) return

    this.tooltip.classList.remove('show')
    this.tooltip.classList.add('hide')
    this.dispatchToggle(false)
  }

  toggleTooltip() {
    this.tooltip.classList.toggle('show')
    this.tooltip.classList.toggle('hide')

    const open = this.tooltip.classList.contains('show')
    if (open) this.checkCloseTooltip()
    else this.stopCloseTooltipCheck()
    this.dispatchToggle(open)
  }

  dispatchToggle(open: boolean) {
    this.element.dispatchEvent(new CustomEvent(open ? 'pb:popover:open' : 'pb:popover:close', { bubbles: true }))
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
