import PbEnhancedElement from '../pb_enhanced_element'
import Popper from 'popper.js'

const TOOLTIP_OFFSET = '0,0'
const TOOLTIP_TIMEOUT = 250

export default class PbTooltip extends PbEnhancedElement {
  static get selector() {
    return '[data-pb-tooltip-kit]'
  }

  connect() {
    this.popper = new Popper(this.triggerElements, this.tooltip, {
      placement: this.position,
      modifiers: {
        offset: {
          offset: TOOLTIP_OFFSET,
        },
        arrow: {
          element: `#${this.tooltipId}-arrow`,
        },
      },
      onUpdate: (p) => {
        p.instance.popper.classList.toggle('flipped', p.flipped)
      },
    })

    this.tooltip.addEventListener('mouseleave', () => {
      this.hideTooltip()
    })

    this.triggerElement.addEventListener('mouseenter', () => {
      this.mouseenterTimeout = setTimeout(() => {
        this.popper.scheduleUpdate()
        this.showTooltip()
      }, TOOLTIP_TIMEOUT)

      this.triggerElement.addEventListener('mouseleave', (event) => {
        clearTimeout(this.mouseenterTimeout)
        if (event.target.closest(`#${this.tooltipId}`) !== this.tooltip) {
          setTimeout(() => {
            this.hideTooltip()
          }, 0)
        }
      }, { once: true })
    })
  }

  showTooltip() {
    this.tooltip.classList.add('show')
  }

  hideTooltip() {
    this.tooltip.classList.remove('show')
  }

  toggleTooltip() {
    this.tooltip.classList.toggle('show')
  }

  get triggerElements() {
    let triggerEl

    if (this.triggerElementId) {
      triggerEl = document.querySelector(`#${this.triggerElementId}`)
    } else if (this.triggerElementsClass) {
      triggerEl = document.querySelectorAll(`#${this.triggerElementsClass}`)
    }

    return this._triggerElements = (this._triggerElements || triggerEl)
  }

  get tooltip() {
    return this._tooltip = (this._tooltip || this.element.querySelector(`#${this.tooltipId}`))
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

  get triggerElementsClass() {
    return this.element.dataset.pbTooltipTriggerClass
  }
}
