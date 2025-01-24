import PbEnhancedElement from '../pb_enhanced_element'
import {
  createPopperLite as createPopper,
  flip,
  offset,
  preventOverflow,
} from '@popperjs/core'

const TOOLTIP_OFFSET = [0, 20]
const TOOLTIP_TIMEOUT = 250

export default class PbTooltip extends PbEnhancedElement {
  static get selector() {
    return '[data-pb-tooltip-kit]'
  }

  connect() {
    this.triggerElements.forEach((trigger) => {
      const method = this.triggerMethod

      if (method === 'click') {
        trigger.addEventListener('click', () => {
          this.showTooltip(trigger)
        })
      } else {
        trigger.addEventListener('mouseenter', () => {
          this.mouseenterTimeout = setTimeout(() => {
            this.showTooltip(trigger)
            this.checkCloseTooltip(trigger)
          }, TOOLTIP_TIMEOUT)

          trigger.addEventListener('mouseleave', () => {
            clearTimeout(this.mouseenterTimeout)
            setTimeout(() => {
              this.hideTooltip()
            }, 0)
          }, { once: true })
        })

        this.tooltip.addEventListener('mouseenter', () => {
          clearTimeout(this.mouseenterTimeout)
        })
        this.tooltip.addEventListener('mouseleave', () => {
          this.hideTooltip()
        })
      }
    })
  }

  checkCloseTooltip(trigger) {
    document.querySelector('body').addEventListener('click', ({ target }) => {
      const isTooltip = target.closest(`#${this.tooltipId}`) === this.tooltip
      const isTrigger = target.closest(this.triggerElementSelector) === trigger
      if (isTrigger || isTooltip) {
        this.checkCloseTooltip(trigger)
      } else {
        this.hideTooltip()
      }
    }, { once: true })
  }

  showTooltip(trigger) {
    if (this.shouldShowTooltip === 'false') return

    this.popper = createPopper(trigger, this.tooltip, {
      placement: this.position,
      strategy: 'fixed',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: TOOLTIP_OFFSET,
          },
        },
        {
          name: 'arrow',
          options: {
            element: document.querySelector(`#${this.tooltipId}-arrow`),
          },
        },
        offset,
        preventOverflow,
        flip,
      ],
    })
    this.tooltip.classList.add('show')

    if (this.triggerMethod === 'click') {
      clearTimeout(this.autoHideTimeout)
      this.autoHideTimeout = setTimeout(() => {
        this.hideTooltip()
      }, 1000)
    }
  }

  hideTooltip() {
    this.tooltip.classList.add('fade_out')
    setTimeout(() => {
      if (!this.popper) return
      this.popper.destroy()
      this.tooltip.classList.remove('show')
      this.tooltip.classList.remove('fade_out')
    }, TOOLTIP_TIMEOUT)
  }

  get triggerElements() {
    let triggerEl

    if (this.triggerElementId) {
      triggerEl = document.querySelector(`#${this.triggerElementId}`)
    } else {
      const selectorIsId = this.triggerElementSelector.indexOf('#') > -1
      triggerEl = selectorIsId
        ? document.querySelector(`${this.triggerElementSelector}`)
        : document.querySelectorAll(`${this.triggerElementSelector}`)
    }

    if (!triggerEl) {
      console.error('Tooltip Kit: an invalid or unavailable DOM reference was provided!')
      return []
    }

    if (!triggerEl.length) triggerEl = [triggerEl]
    return (this._triggerElements = this._triggerElements || triggerEl)
  }

  get tooltip() {
    return (this._tooltip =
      this._tooltip || this.element.querySelector(`#${this.tooltipId}`))
  }

  get position() {
    return this.element.dataset.pbTooltipPosition
  }

  get triggerElementId() {
    return this.element.dataset.pbTooltipTriggerElementId
  }

  get tooltipId() {
    return this.element.dataset.pbTooltipTooltipId
  }

  get triggerElementSelector() {
    return this.element.dataset.pbTooltipTriggerElementSelector
  }

  get shouldShowTooltip() {
    return this.element.dataset.pbTooltipShowTooltip
  }

  get triggerMethod() {
    return this.element.dataset.pbTooltipTriggerMethod || 'hover'
  }
}
