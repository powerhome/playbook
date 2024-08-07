import PbEnhancedElement from "../pb_enhanced_element";

const STAR_RATING_SELECTOR = "[data-pb-star-rating]";
const STAR_RATING_INPUT_ID = "star-rating-input";

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

    document.querySelectorAll(STAR_RATING_SELECTOR).forEach(star => {
      star.addEventListener("mouseenter", (event) => {
        const hoveredStarId = event.currentTarget.id
        this.updateStarHoverColors(hoveredStarId);
      })

      star.addEventListener("mouseleave", () => {
        this.removeStarHoverColors();
      })
    })
  }

  updateStarColors(clickedStarId) {
    const allStars = document.querySelectorAll(STAR_RATING_SELECTOR);

    allStars.forEach(star => {
      const starId = star.id;
      const icon = star.querySelector(".interactive-star-icon");

      if (icon) {
        if (starId <= clickedStarId) {
          if (star.classList.contains("yellow_star")) {
            icon.classList.add("yellow-star-selected");
          } else if (star.classList.contains("primary_star_light")) {
            icon.classList.add("primary-star-selected");
          } else if (star.classList.contains("primary_star_dark")) {
            icon.classList.add("primary-star-selected");
          } else if (star.classList.contains("subtle_star_light")) {
            icon.classList.add("subtle-star-selected");
          } else if (star.classList.contains("subtle_star_dark")) {
            icon.classList.add("subtle-star-selected");
          } else {
            icon.classList.add("yellow-star-selected");
          }
        } else {
          icon.classList.remove("yellow-star-selected", "primary-star-selected", "subtle-star-selected");
        }
        icon.classList.remove("star-hovered");
      }
    });
  }

  updateHiddenInputValue(value) {
    const hiddenInput = document.getElementById(STAR_RATING_INPUT_ID);
    if (hiddenInput) {
      hiddenInput.value = value;
    }
  }

  updateStarHoverColors(hoveredStarId) {
    const allStars = document.querySelectorAll(STAR_RATING_SELECTOR);
  
    allStars.forEach(star => {
      const starId = star.id;
      const icon = star.querySelector(".interactive-star-icon");
  
      if (icon) {
        if (starId <= hoveredStarId) {
          if (!icon.classList.contains("yellow-star-selected") && 
              !icon.classList.contains("primary-star-selected") && 
              !icon.classList.contains("subtle-star-selected")) {
            icon.classList.add("star-hovered");
          }
        } else {
          icon.classList.remove("star-hovered");
        }
      }
    });
  }


  removeStarHoverColors() {
    const allStars = document.querySelectorAll(STAR_RATING_SELECTOR);
  
    allStars.forEach(star => {
      const icon = star.querySelector(".interactive-star-icon");
      if (icon) {
        if (!icon.classList.contains("yellow-star-selected") &&
            !icon.classList.contains("primary-star-selected") &&
            !icon.classList.contains("subtle-star-selected")) {
          icon.classList.remove("star-hovered");
        }
      }
    });
  }

  isStarSelected() {
    return document.querySelectorAll(".yellow-star-selected, .primary-star-selected, .subtle-star-selected").length > 0;
  }
}
