import PbEnhancedElement from "../pb_enhanced_element";

const STAR_RATING_SELECTOR = "[data-pb-star-rating]";
const STAR_RATING_INPUT_ID = "star-rating-input"; // ID of your hidden input field

export default class PbStarRating extends PbEnhancedElement {
  static get selector() {
    return STAR_RATING_SELECTOR;
  }

  connect() {
    this.element.addEventListener("click", (event) => {
      const clickedStarId = event.currentTarget.id;
      this.updateStarColors(clickedStarId);
      this.updateHiddenInputValue(clickedStarId);
    });
  }

  updateStarColors(clickedStarId) {
    // Get all star elements
    const allStars = document.querySelectorAll(STAR_RATING_SELECTOR);

    allStars.forEach(star => {
      const starId = star.id;
      const icon = star.querySelector(".interactive-star-icon");

      if (icon) {
        if (starId <= clickedStarId) {
          icon.classList.add("selected-star-color");
        } else {
          icon.classList.remove("selected-star-color");
        }
      }
    });
  }

  updateHiddenInputValue(value) {
    const hiddenInput = document.getElementById(STAR_RATING_INPUT_ID);
    if (hiddenInput) {
      hiddenInput.value = value;
    }
  }
}

