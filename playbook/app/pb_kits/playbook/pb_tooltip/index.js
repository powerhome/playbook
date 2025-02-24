import PbEnhancedElement from '../pb_enhanced_element'
import {
  createPopperLite as createPopper,
  flip,
  offset,
  preventOverflow,
} from '@popperjs/core'

const TOOLTIP_OFFSET = [0, 20]
const TOOLTIP_TIMEOUT = 250
const SAFE_ZONE_TIMEOUT = 100  // Adjust as needed

export default class PbTooltip extends PbEnhancedElement {
  static get selector() {
    return '[data-pb-tooltip-kit]'
  }

  connect() {
    this.triggerElements.forEach((trigger) => {
      const method = this.triggerMethod
      const interactionEnabled = this.tooltipInteraction

      if (method === 'click') {
        trigger.addEventListener('click', () => {
          this.showTooltip(trigger)
        })
      } else {
        trigger.addEventListener('mouseenter', () => {
          this.mouseenterTimeout = setTimeout(() => {
            this.showTooltip(trigger)
            if (interactionEnabled) {
              this.checkCloseTooltip(trigger)
            }
          }, TOOLTIP_TIMEOUT)
        })

        trigger.addEventListener('mouseleave', () => {
          if (interactionEnabled) {
            this.scheduleHideTooltip()
          } else {
            this.hideTooltip()
          }
        })

        if (interactionEnabled) {
          this.tooltip.addEventListener('mouseenter', () => {
            clearTimeout(this.hideTimeout)
          })

          this.tooltip.addEventListener('mouseleave', () => {
            this.scheduleHideTooltip()
          })
        }
      }
    })
  }

  scheduleHideTooltip() {
    this.hideTimeout = setTimeout(() => {
      this.hideTooltip()
    }, SAFE_ZONE_TIMEOUT)
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
  
    // Ensure tooltip is visible
    this.tooltip.style.opacity = '1'
    this.tooltip.style.visibility = 'visible'
    this.tooltip.style.pointerEvents = 'auto'
  
    // Recreate Popper instance
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
    if (!this.tooltip) return
  
    this.tooltip.classList.add('fade_out')
  
    setTimeout(() => {
      if (!this.popper) return
  
      // Destroy Popper instance
      this.popper.destroy()
      this.popper = null
  
      // Remove 'show' class and cleanup styles
      this.tooltip.classList.remove('show')
      this.tooltip.classList.remove('fade_out')
  
      // Hide tooltip but keep it in the DOM
      this.tooltip.style.opacity = '0'
      this.tooltip.style.visibility = 'hidden'
      this.tooltip.style.pointerEvents = 'none'
  
      // Reset Popper's inline styles
      this.tooltip.style.position = ''
      this.tooltip.style.top = ''
      this.tooltip.style.left = ''
      this.tooltip.style.transform = ''
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

  get tooltipInteraction() {
    return this.element.dataset.pbTooltipInteraction === 'true'
  }
}
