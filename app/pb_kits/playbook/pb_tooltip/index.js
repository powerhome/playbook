import PbEnhancedElement from '../pb_enhanced_element'
import Popper from 'popper.js'

const POPOVER_OFFSET_Y = '0,0'

export default class PbTooltip extends PbEnhancedElement {
  static get selector() {
    return '[data-pb-tooltip-kit]'
  }

  connect() {
    this.popper = new Popper(this.triggerElement, this.tooltip, {
      placement: this.position,
      modifiers: {
        offset: {
          offset: POPOVER_OFFSET_Y,
        },
        arrow: {
          element: `#${this.tooltipId}-arrow`,
        },
      },
    })

    this.triggerElement.addEventListener('mouseover', () => {
      event.preventDefault()
      event.stopPropagation()

      setTimeout(() => {
        this.popper.scheduleUpdate()
        this.toggleTooltip()
      }, 0)

      // if(target.closest(`#${this.tooltipId}`) == document.querySelector(`${this.tooltipId}`)) {
      //   console.log("mouseout target is:" + target);
      // } else {
      //   setTimeout(() => {
      //     this.popper.scheduleUpdate()
      //     this.hideTooltip()
      //   }, 0)
      // }
    })

    this.triggerElement.addEventListener('mouseout', ({ target }) => {
      event.preventDefault()
      event.stopPropagation()
      // console.log("mouseout target is:" + target);
      if (target.closest(`#${this.tooltipId}`) == document.querySelector(`#${this.tooltipId}`)) {
        // console.log("mouseout target is:" + target);
        this.popper.scheduleUpdate()
      } else {
        setTimeout(() => {
          this.popper.scheduleUpdate()
          this.hideTooltip()
        }, 0)
      }
    })
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

  // checkHover() {
  //   this.triggerElement.addEventListener('mouseenter', () => {
  //     this.toggleTooltip()
  //   })

  //   this.triggerElement.addEventListener('mouseout', () => {
  //     this.hideTooltip()
  //   })
  // }

  // checkHover()
}
