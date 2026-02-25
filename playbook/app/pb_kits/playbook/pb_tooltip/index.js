import PbEnhancedElement from '../pb_enhanced_element'
import { computePosition, offset, flip, shift, arrow, autoUpdate } from '@floating-ui/dom'

const TOOLTIP_OFFSET = 20
const TOOLTIP_TIMEOUT = 250
const SAFE_ZONE_MARGIN = 1

export default class PbTooltip extends PbEnhancedElement {
  static get selector() {
    return '[data-pb-tooltip-kit]'
  }

  connect() {
    this.triggerHandlers = new Map()
    
    if (this.tooltipInteraction) {
      this.mouseMoveHandler = (e) => {
        this.lastMouseX = e.clientX
        this.lastMouseY = e.clientY
      }
      document.addEventListener('mousemove', this.mouseMoveHandler)
    }
    
    this.triggerElements.forEach((trigger) => {
      const method = this.effectiveTriggerMethod
      const interactionEnabled = this.tooltipInteraction

      if (method === 'click') {
        const clickHandler = (e) => {
          if (this.useClickToOpen) {
            e.preventDefault()
            if (this.isTooltipVisible()) {
              this.hideTooltip()
            } else {
              this.showTooltip(trigger)
            }
          } else {
            this.showTooltip(trigger)
          }
        }
        trigger.addEventListener('click', clickHandler)
        this.triggerHandlers.set(trigger, { click: clickHandler })
      } else {
        if (!this.useClickToOpen) {
          const mouseenterHandler = () => {
            clearSafeZoneListener(this)
            clearTimeout(this.mouseleaveTimeout)
            this.currentTrigger = trigger
            const delayOpen = this.delayOpen ? parseInt(this.delayOpen) : TOOLTIP_TIMEOUT
            this.mouseenterTimeout = setTimeout(() => {
              this.showTooltip(trigger)
              if (interactionEnabled) {
                this.checkCloseTooltip(trigger)
              }
            }, delayOpen)
          }

          const mouseleaveHandler = () => {
            clearTimeout(this.mouseenterTimeout)
            if (this.delayClose) {
              const delayClose = parseInt(this.delayClose)
              this.mouseleaveTimeout = setTimeout(() => {
                if (interactionEnabled) {
                  this.attachSafeZoneListener()
                } else {
                  this.hideTooltip()
                }
              }, delayClose)
            } else {
              if (interactionEnabled) {
                this.attachSafeZoneListener()
              } else {
                this.hideTooltip()
              }
            }
          }

          trigger.addEventListener('mouseenter', mouseenterHandler)
          trigger.addEventListener('mouseleave', mouseleaveHandler)
          this.triggerHandlers.set(trigger, { mouseenter: mouseenterHandler, mouseleave: mouseleaveHandler })

          if (interactionEnabled) {
            if (!this.tooltipMouseenterHandler) {
              this.tooltipMouseenterHandler = () => {
                clearSafeZoneListener(this)
              }
              this.tooltipMouseleaveHandler = () => {
                this.attachSafeZoneListener()
              }
              this.tooltip.addEventListener('mouseenter', this.tooltipMouseenterHandler)
              this.tooltip.addEventListener('mouseleave', this.tooltipMouseleaveHandler)
            }
          }
        }
      }
    })
  }

  disconnect() {
    // Clean up timers
    clearTimeout(this.mouseenterTimeout)
    clearTimeout(this.mouseleaveTimeout)
    clearTimeout(this.autoHideTimeout)
    clearSafeZoneListener(this)

    // Clean up autoUpdate
    if (this.cleanup) {
      this.cleanup()
      this.cleanup = null
    }

    // Clean up document mousemove listener
    if (this.mouseMoveHandler) {
      document.removeEventListener('mousemove', this.mouseMoveHandler)
    }

    // Clean up trigger element listeners
    this.triggerHandlers.forEach((handlers, trigger) => {
      Object.entries(handlers).forEach(([event, handler]) => {
        trigger.removeEventListener(event, handler)
      })
    })
    this.triggerHandlers.clear()

    // Clean up tooltip listeners
    if (this.tooltipMouseenterHandler) {
      this.tooltip.removeEventListener('mouseenter', this.tooltipMouseenterHandler)
      this.tooltip.removeEventListener('mouseleave', this.tooltipMouseleaveHandler)
    }
  }

  isTooltipVisible() {
    return this.tooltip && this.tooltip.classList.contains('show')
  }

  attachSafeZoneListener() {
    clearSafeZoneListener(this)
    this.safeZoneHandler = (e) => {
      if (!this.currentTrigger) return
      const triggerRect = this.currentTrigger.getBoundingClientRect()
      const tooltipRect = this.tooltip.getBoundingClientRect()
      const safeRect = getSafeZone(triggerRect, tooltipRect, this.position, SAFE_ZONE_MARGIN)
      if (!isPointInsideRect(e.clientX, e.clientY, safeRect)) {
        this.hideTooltip()
        clearSafeZoneListener(this)
      }
    }
    document.addEventListener('mousemove', this.safeZoneHandler)
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

    clearSafeZoneListener(this)

    this.tooltip.style.opacity = '1'
    this.tooltip.style.visibility = 'visible'
    this.tooltip.style.pointerEvents = 'auto'

    if (this.cleanup) {
      this.cleanup()
    }

    const arrowElement = document.querySelector(`#${this.tooltipId}-arrow`)

    this.cleanup = autoUpdate(trigger, this.tooltip, () => {
      computePosition(trigger, this.tooltip, {
        placement: this.position,
        strategy: 'fixed',
        middleware: [
          offset({ mainAxis: TOOLTIP_OFFSET, crossAxis: 0 }),
          flip(),
          shift(),
          arrow({ element: arrowElement })
        ],
      }).then(({ x, y, placement, middlewareData }) => {
        Object.assign(this.tooltip.style, {
          left: `${x}px`,
          top: `${y}px`,
          position: 'fixed'
        })
        this.tooltip.setAttribute('data-popper-placement', placement)
        if (arrowElement && middlewareData.arrow) {
          const { x: arrowX, y: arrowY } = middlewareData.arrow
          Object.assign(arrowElement.style, {
            left: arrowX != null ? `${arrowX}px` : '',
            top: arrowY != null ? `${arrowY}px` : '',
            position: 'absolute'
          })
        }
      })
    })

    this.tooltip.classList.add('show')

    if (this.effectiveTriggerMethod === 'click' && !this.useClickToOpen) {
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
      if (this.cleanup) {
        this.cleanup()
        this.cleanup = null
      }
      this.tooltip.classList.remove('show')
      this.tooltip.classList.remove('fade_out')
      this.tooltip.style.opacity = '0'
      this.tooltip.style.visibility = 'hidden'
      this.tooltip.style.pointerEvents = 'none'
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
    } else if (this.triggerElementSelector) {
      const selectorIsId = this.triggerElementSelector.indexOf('#') > -1
      triggerEl = selectorIsId
        ? document.querySelector(this.triggerElementSelector)
        : document.querySelectorAll(this.triggerElementSelector)
    } else {
      triggerEl = this.element
    }
    if (!triggerEl) {
      console.error('Tooltip Kit: No valid trigger element found!')
      return []
    }
    if (triggerEl.length === undefined) {
      triggerEl = [triggerEl]
    }
    return triggerEl
  }

  get tooltip() {
    return (this._tooltip = this._tooltip || this.element.querySelector(`#${this.tooltipId}`))
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

  get useClickToOpen() {
    return this.element.dataset.pbTooltipUseClickToOpen === 'true'
  }

  get effectiveTriggerMethod() {
    return this.useClickToOpen ? 'click' : this.triggerMethod
  }

  get tooltipInteraction() {
    return this.element.dataset.pbTooltipInteraction === 'true'
  }
  
  get delayOpen() {
    return this.element.dataset.pbTooltipDelayOpen
  }
  
  get delayClose() {
    return this.element.dataset.pbTooltipDelayClose
  }
}

function clearSafeZoneListener(context) {
  if (context.safeZoneHandler) {
    document.removeEventListener('mousemove', context.safeZoneHandler)
    context.safeZoneHandler = null
  }
}

function getSafeZone(triggerRect, tooltipRect, placement, margin) {
  let safeRect = {}
  if (placement.startsWith('top')) {
    safeRect.left = triggerRect.left - margin
    safeRect.right = triggerRect.right + margin
    safeRect.top = tooltipRect.bottom - margin
    safeRect.bottom = triggerRect.top + margin
  } else if (placement.startsWith('bottom')) {
    safeRect.left = triggerRect.left - margin
    safeRect.right = triggerRect.right + margin
    safeRect.top = triggerRect.bottom - margin
    safeRect.bottom = tooltipRect.top + margin
  } else if (placement.startsWith('left')) {
    safeRect.top = triggerRect.top - margin
    safeRect.bottom = triggerRect.bottom + margin
    safeRect.left = tooltipRect.right - margin
    safeRect.right = triggerRect.left + margin
  } else if (placement.startsWith('right')) {
    safeRect.top = triggerRect.top - margin
    safeRect.bottom = triggerRect.bottom + margin
    safeRect.left = triggerRect.right - margin
    safeRect.right = tooltipRect.left + margin
  } else {
    safeRect = {
      left: triggerRect.left - margin,
      right: triggerRect.right + margin,
      top: triggerRect.top - margin,
      bottom: triggerRect.bottom + margin,
    }
  }
  return safeRect
}

function isPointInsideRect(x, y, rect) {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
}
