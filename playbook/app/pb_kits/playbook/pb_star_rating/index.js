import PbEnhancedElement from "../pb_enhanced_element"

const STAR_RATING_WRAPPER_SELECTOR = "[data-pb-star-rating-wrapper]"
const STAR_RATING_SELECTOR = "[data-pb-star-rating]"
const STAR_RATING_INPUT_DATA_SELECTOR = "[data-pb-star-rating-input]"

export default class PbStarRating extends PbEnhancedElement {
  static get selector() {
    return STAR_RATING_WRAPPER_SELECTOR
  }

  connect() {
    this.addEventListeners()
    this.handleFormReset()
    this.setDefaultValue()
  }

  addEventListeners() {
    this.element.querySelectorAll(STAR_RATING_SELECTOR).forEach(star => {
      star.addEventListener("click", (event) => {
        const clickedStarId = event.currentTarget.id
        this.updateStarColors(clickedStarId)
        this.updateHiddenInputValue(clickedStarId)
        this.clearFormValidation()
      })

      star.addEventListener("mouseenter", (event) => {
        const hoveredStarId = event.currentTarget.id
        this.updateStarHoverColors(hoveredStarId)
      })

      star.addEventListener("mouseleave", () => {
        this.removeStarHoverColors()
      })

      star.addEventListener("keydown", (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          this.handleStarClick(star.id)
        }

        const stars = Array.from(this.element.querySelectorAll("[role='radio']"))
        const index = stars.indexOf(star)

        if (event.key === "ArrowRight" && stars[index + 1]) {
          event.preventDefault()
          stars[index + 1].focus()
        }

        if (event.key === "ArrowLeft" && stars[index - 1]) {
          event.preventDefault()
          stars[index - 1].focus()
        }
      })

      const label = this.element.querySelector("[id$='_label']")
      if (label) {
        label.addEventListener("click", () => {
          const firstStar = this.element.querySelector("[role='radio']")
          firstStar?.focus()
        })
      }
    })
  }

  handleStarClick(starId) {
    this.updateStarColors(starId)
    this.updateHiddenInputValue(starId)
  }

  updateStarColors(clickedStarId) {
    const allStars = this.element.querySelectorAll(STAR_RATING_SELECTOR)

    allStars.forEach(star => {
      const icon = star.querySelector(".interactive-star-icon")
      const isChecked = star.id <= clickedStarId

      star.setAttribute("aria-checked", isChecked.toString())

      if (icon) {
        if (isChecked) {
          if (star.classList.contains("yellow_star")) {
            icon.classList.add("yellow-star-selected")
          } else if (star.classList.contains("primary_star_light")) {
            icon.classList.add("primary-star-selected")
          } else if (star.classList.contains("primary_star_dark")) {
            icon.classList.add("primary-star-selected")
          } else if (star.classList.contains("subtle_star_light")) {
            icon.classList.add("subtle-star-selected")
          } else if (star.classList.contains("subtle_star_dark")) {
            icon.classList.add("subtle-star-selected")
          } else {
            icon.classList.add("yellow-star-selected")
          }
        } else {
          icon.classList.remove("yellow-star-selected", "primary-star-selected", "subtle-star-selected")
        }
        icon.classList.remove("star-hovered")
      }
    })
  }

  updateHiddenInputValue(value) {
    const hiddenInput = this.element.querySelector(STAR_RATING_INPUT_DATA_SELECTOR)
    if (hiddenInput) {
      hiddenInput.value = value
    }
  }

  updateStarHoverColors(hoveredStarId) {
    const allStars = this.element.querySelectorAll(STAR_RATING_SELECTOR)
  
    allStars.forEach(star => {
      const starId = star.id
      const icon = star.querySelector(".interactive-star-icon")
  
      if (icon) {
        if (starId <= hoveredStarId) {
          if (!icon.classList.contains("yellow-star-selected") && 
              !icon.classList.contains("primary-star-selected") && 
              !icon.classList.contains("subtle-star-selected")) {
            icon.classList.add("star-hovered")
          }
        } else {
          icon.classList.remove("star-hovered")
        }
      }
    })
  }


  removeStarHoverColors() {
    const allStars = this.element.querySelectorAll(STAR_RATING_SELECTOR)
  
    allStars.forEach(star => {
      const icon = star.querySelector(".interactive-star-icon")
      if (icon) {
        if (!icon.classList.contains("yellow-star-selected") &&
            !icon.classList.contains("primary-star-selected") &&
            !icon.classList.contains("subtle-star-selected")) {
          icon.classList.remove("star-hovered")
        }
      }
    })
  }

  isStarSelected() {
    return this.element.querySelectorAll(".yellow-star-selected, .primary-star-selected, .subtle-star-selected").length > 0
  }

  handleFormReset() {
    const form = this.element.closest("form")
    if (form) {
      form.addEventListener("reset", () => {
        this.element.querySelector(STAR_RATING_INPUT_DATA_SELECTOR)?.setAttribute("value","")
        this.resetStarRatingValues()
      })
    }
  }

  resetStarRatingValues() {
    const allStars = this.element.querySelectorAll(STAR_RATING_SELECTOR)
    allStars.forEach(star => {
      const icon = star.querySelector(".interactive-star-icon")
      if (icon) {
        icon.classList.remove("yellow-star-selected", "primary-star-selected", "subtle-star-selected")
      }
    })
  }

  clearFormValidation() {
    const hiddenInput = this.element.querySelector(STAR_RATING_INPUT_DATA_SELECTOR)
    if (hiddenInput.checkValidity()) {
      const errorLabelElement = this.element.querySelector(".pb_body_kit_negative")
      if (errorLabelElement) {
        errorLabelElement.remove()
      }
    }
  }

  setDefaultValue() {
    const hiddenInput = this.element.querySelector(STAR_RATING_INPUT_DATA_SELECTOR)
    const defaultValue = hiddenInput.value

    if (defaultValue) {
      this.updateStarColors(defaultValue)
    }
  }
}
