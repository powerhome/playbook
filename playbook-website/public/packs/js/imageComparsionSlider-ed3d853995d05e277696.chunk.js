(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["imageComparsionSlider"],{

/***/ "./app/javascript/packs/imageComparsionSlider.js":
/*!*******************************************************!*\
  !*** ./app/javascript/packs/imageComparsionSlider.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var solutionsContainer = document.querySelector('.solutionsContainer');
    var secondSolutionsCard = document.querySelector('.secondSolutionsCard');
    var verticalBar = document.querySelector('.vertical-bar');
    var solutionsContainerRect = solutionsContainer.getBoundingClientRect();
    var solutionsContainerMid = solutionsContainerRect.width / 2;
    secondSolutionsCard.style.transform = "translateX(".concat(solutionsContainerMid, "px) translateY(0)");
    secondSolutionsCard.style.transition = 'none';
    var isDragging = false;
    var setIsDragging = function setIsDragging(_boolean) {
      return isDragging = _boolean;
    };
    var dragVerticalBar = function dragVerticalBar(e) {
      if (!isDragging) return;
      var solutionsContainerRectResponsive = solutionsContainer.getBoundingClientRect();
      var xTranslate = e.clientX - solutionsContainerRectResponsive.left;
      if (xTranslate >= solutionsContainerRectResponsive.width - 5) {
        xTranslate = solutionsContainerRectResponsive.width - 5;
      } else if (xTranslate <= 5) {
        xTranslate = 5;
      }
      secondSolutionsCard.style.transform = "translateY(0px) translateX(".concat(xTranslate, "px)");
    };
    verticalBar.addEventListener('mousedown', function () {
      setIsDragging(true);
    });
    document.addEventListener('mouseup', function () {
      setIsDragging(false);
    });
    solutionsContainer.addEventListener('mousemove', function (e) {
      dragVerticalBar(e);
    });

    // Touchscreens
    verticalBar.addEventListener('touchstart', function () {
      setIsDragging(true);
    });
    document.addEventListener('touchend', function () {
      setIsDragging(false);
    });
    solutionsContainer.addEventListener('touchmove', function (e) {
      var touchEventData = e.touches[0];
      dragVerticalBar(touchEventData);
    });
  });
})();

/***/ })

},[["./app/javascript/packs/imageComparsionSlider.js","runtime"]]]);
//# sourceMappingURL=imageComparsionSlider-ed3d853995d05e277696.chunk.js.map