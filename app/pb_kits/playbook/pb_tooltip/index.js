import PbEnhancedElement from '../pb_enhanced_element'
import Popper from 'popper.js'

const TOOLTIP_OFFSET = '0,0'
const TOOLTIP_TIMEOUT = 250

export default class PbTooltip extends PbEnhancedElement {
  static get selector() {
    return '[data-pb-tooltip-kit]'
  }

  connect() {
    this.popper = new Popper(this.triggerElement, this.tooltip, {
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
        if (event.toElement.closest(`#${this.tooltipId}`) !== this.tooltip) {
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

  get triggerElement() {
    return this._triggerElement = (this._triggerElement || document.querySelector(`#${this.triggerElementId}`))
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
}
