import PbEnhancedElement from '../pb_enhanced_element'

const NAV_SELECTOR = '[data-pb-nav-tab]'
const NAV_ITEM_SELECTOR = '[data-pb-tab-target]'

export default class PbNav extends PbEnhancedElement {
    static get selector() {
        return NAV_SELECTOR
    }

    connect() {
        this.hideAndAddEventListeners()
    }

    hideAndAddEventListeners() {
        const navItems = this.element.querySelectorAll(NAV_ITEM_SELECTOR)
        navItems.forEach((navItem) => {
            if (!navItem.className.includes('active')) {
                this.changeContentDisplay(navItem.dataset.pbTabTarget, 'none')
            }

            navItem.addEventListener('click', event => this.handleNavItemClick(event))
        })
    }

    handleNavItemClick(event) {
        event.preventDefault()
        const navItem = event.target.closest(NAV_ITEM_SELECTOR)
        this.changeContentDisplay(navItem.dataset.pbTabTarget, 'block')

        const navItems = this.element.querySelectorAll(NAV_ITEM_SELECTOR)
        navItems.forEach((navItemSelected) => {
            if (navItem !== navItemSelected) {
                this.changeContentDisplay(navItemSelected.dataset.pbTabTarget, 'none')
            }
        })
    }

    changeContentDisplay(contentId, display) {
        const content = document.getElementById(contentId)
        content.style.display = display
    }
}
