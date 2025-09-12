import PbEnhancedElement from '../pb_enhanced_element'
import { createPopper, Instance, Placement, Options } from '@popperjs/core'

const POPOVER_OFFSET_Y = [0, 20]

export default class PbPopover extends PbEnhancedElement {
  popper!: Instance
  _triggerElement!: HTMLElement | null
  _tooltip!: HTMLElement | null
  element!: HTMLElement

  private _onDocClick!: (e: MouseEvent) => void
  private _docListenerAttached = false
  private _baseModifiers: Options['modifiers'] = []
  private _isShown = false

  static get selector() {
    return '[data-pb-popover-kit]'
  }

  connect() {
    // Resolve elements once with fast APIs
    this._triggerElement = document.getElementById(this.triggerElementId) as HTMLElement | null
    this._tooltip = (this.element.querySelector(`#${this.tooltipId}`) as HTMLElement | null)

    if (!this.triggerElement || !this.tooltip) {
      console.warn('Popover requires both trigger and tooltip elements to be defined.')
      return
    }

    this.moveTooltipOnce()

    // Prepare Popper with event listeners disabled by default
    this._baseModifiers = [
      { name: 'offset', options: { offset: this.offset } },
      { name: 'eventListeners', enabled: false },
    ]

    this.popper = createPopper(this.triggerElement, this.tooltip, {
      placement: (this.position as Placement) || 'bottom',
      strategy: 'fixed',
      modifiers: this._baseModifiers,
    })

    // Bind handlers once
    this._onDocClick = this.handleDocumentClick.bind(this)
    this.triggerElement.addEventListener('click', this.handleTriggerClick, { passive: true })
    // Attach a single delegated doc listener per instance
    document.addEventListener('click', this._onDocClick, true)
    this._docListenerAttached = true
  }

  disconnect() {
    if (this._docListenerAttached) {
      document.removeEventListener('click', this._onDocClick, true)
      this._docListenerAttached = false
    }
    if (this.triggerElement) {
      this.triggerElement.removeEventListener('click', this.handleTriggerClick as any)
    }
    if (this.popper) this.popper.destroy()
  }

  // --- event handlers ---

  private handleTriggerClick = (event: Event) => {
    event.preventDefault()
    event.stopPropagation()

    // toggle with a microtask to let layout settle
    Promise.resolve().then(() => {
      if (this._isShown) {
        this.hideTooltip()
      } else {
        this.showTooltip()
      }
    })
  }

  private handleDocumentClick(e: MouseEvent) {
    if (!this.tooltip || !this.triggerElement) return

    const target = e.target as HTMLElement | null
    const insideTooltip = !!target && !!target.closest(`#${this.tooltipId}`)
    const insideTrigger = !!target && !!target.closest(`#${this.triggerElementId}`)

    switch (this.closeOnClick) {
      case 'any':
        if (insideTooltip || (!insideTooltip && !insideTrigger)) this.hideTooltip()
        break
      case 'outside':
        if (!insideTooltip && !insideTrigger) this.hideTooltip()
        break
      case 'inside':
        if (insideTooltip) this.hideTooltip()
        break
      default:
        // no auto-close
        break
    }
  }

  // --- show/hide ---

  showTooltip() {
    if (!this.tooltip) return
    this.tooltip.classList.add('show')
    this.tooltip.classList.remove('hide')
    this._isShown = true
    this.setEventListenersEnabled(true)
    // force immediate position calc (faster than awaiting .update())
    this.popper.forceUpdate()
  }

  hideTooltip() {
    if (!this.tooltip) return
    this.tooltip.classList.remove('show')
    this.tooltip.classList.add('hide')
    this._isShown = false
    this.setEventListenersEnabled(false)
  }

  // --- helpers ---

  private moveTooltipOnce() {
    const appendTo = this.appendTo
    let container: HTMLElement = document.body

    if (appendTo === 'parent' && this.element.parentElement) {
      container = this.element.parentElement
    } else if (appendTo && appendTo !== 'parent') {
      const el = document.querySelector(appendTo)
      if (el instanceof HTMLElement) container = el
    }

    if (this.tooltip && this.tooltip.parentElement !== container) {
      container.appendChild(this.tooltip)
    }
  }

  private setEventListenersEnabled(enabled: boolean) {
    // Toggle Popper's scroll/resize listeners only when visible (perf win)
    const mods = (this._baseModifiers || []).map((m) =>
      m.name === 'eventListeners' ? { ...m, enabled } : m
    )
    this.popper.setOptions((opts) => ({ ...opts, modifiers: mods }))
  }

  // --- getters ---

  get triggerElement() {
    return this._triggerElement
  }

  get tooltip() {
    return this._tooltip
  }

  get position() {
    return this.element.dataset.pbPopoverPosition || 'bottom'
  }

  get triggerElementId() {
    return this.element.dataset.pbPopoverTriggerElementId as string
  }

  get tooltipId() {
    return this.element.dataset.pbPopoverTooltipId as string
  }

  get offset(): [number, number] {
    return this.element.dataset.pbPopoverOffset === 'true' ? POPOVER_OFFSET_Y : [0, 0]
  }

  get closeOnClick(): 'any' | 'outside' | 'inside' | undefined {
    return this.element.dataset.pbPopoverCloseOnClick as any
  }

  get appendTo() {
    return this.element.dataset.pbPopoverAppendTo
  }
}
