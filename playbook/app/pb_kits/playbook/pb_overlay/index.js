import PbEnhancedElement from '../pb_enhanced_element'

const OVERLAY_SELECTOR = '[data-pb-overlay]'
const OVERLAY_SCROLL_ELEMENT = '[data-overlay-scroll-element]'
const PREVIOUS_OVERLAY_CLASSNAME = '[data-previous-overlay-classname]'
const SUBSEQUENT_OVERLAY_CLASSNAME = '[data-subsequent-overlay-classname]'

export default class PbOverlay extends PbEnhancedElement {
    static get selector() {
        return OVERLAY_SELECTOR
    }

    get target() {
        return this.element.querySelector(OVERLAY_SCROLL_ELEMENT).children[0]
    }

    connect() {
        this.handleOverlayDynamic()
    }

    handleOverlayDynamic() {
        const isOverlayDynamic = this.element.dataset?.overlayDynamic

        if (isOverlayDynamic) {
            const previousOverlayElement = this.element.querySelector(PREVIOUS_OVERLAY_CLASSNAME)
            const previousOverlayClassname = previousOverlayElement?.dataset?.previousOverlayClassname
            const subsequentOverlayElement = this.element.querySelector(SUBSEQUENT_OVERLAY_CLASSNAME)
            const subsequentOverlayClassname = subsequentOverlayElement?.dataset?.subsequentOverlayClassname

            const handleScrollChange = (target) => {
                const { scrollLeft, scrollWidth, clientWidth } = target
                const isScrollAtStart = scrollLeft === 0
                const isScrollAtEnd = scrollLeft + clientWidth >= scrollWidth - 1
        
                if (isScrollAtStart) {
                    previousOverlayElement.classList.remove(previousOverlayClassname)
                } else {
                    previousOverlayElement.classList.add(previousOverlayClassname)
                }
        
                if (isScrollAtEnd) {
                    subsequentOverlayElement.classList.remove(subsequentOverlayClassname)
                } else {
                    subsequentOverlayElement.classList.add(subsequentOverlayClassname)
                }
            }

            this.target.addEventListener('scroll', (event) => {
                handleScrollChange(event.target)
            })

            handleScrollChange(this.target)
        }
    }

    disconnect() {
        if (this.element.dataset?.overlayDynamic) {
            this.target.removeEventListener('scroll')
        }
    }
}
