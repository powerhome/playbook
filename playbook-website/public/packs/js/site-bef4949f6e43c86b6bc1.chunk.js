(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["site"],{

/***/ "./app/javascript/packs/site.js":
/*!**************************************!*\
  !*** ./app/javascript/packs/site.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('#code-wrapper').forEach(function (wrapper) {
    var openToggleOpened = wrapper.querySelector('#toggle-open-opened');
    var openToggleClosed = wrapper.querySelector('#toggle-open-closed');
    var codeDrawer = wrapper.querySelector('.pb--codeCopy');
    var toggleLambda = function toggleLambda(element) {
      if (element.style.display === 'none') {
        element.style.display = 'block';
        openToggleClosed.style.display = 'none';
        openToggleOpened.style.display = 'flex';
      } else {
        element.style.display = 'none';
        openToggleClosed.style.display = 'flex';
        openToggleOpened.style.display = 'none';
      }
    };
    openToggleOpened.addEventListener('click', function () {
      return toggleLambda(codeDrawer);
    });
    openToggleClosed.addEventListener('click', function () {
      return toggleLambda(codeDrawer);
    });
  });
  if (true) {
    __webpack_require__(/*! ../utilities/accessibility */ "./app/javascript/utilities/accessibility.js").runAxe();
  }
});

/***/ }),

/***/ "./app/javascript/utilities/accessibility.js":
/*!***************************************************!*\
  !*** ./app/javascript/utilities/accessibility.js ***!
  \***************************************************/
/*! exports provided: runAxe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runAxe", function() { return runAxe; });
/* harmony import */ var axe_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axe-core */ "../node_modules/axe-core/axe.js");
/* harmony import */ var axe_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axe_core__WEBPACK_IMPORTED_MODULE_0__);
/* eslint-disable no-console */


var runAxe = function runAxe() {
  var include = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.pb--kit-example';
  var ignore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['.pb--kit-example :first-child'];
  axe_core__WEBPACK_IMPORTED_MODULE_0___default.a.run({
    include: [include],
    exclude: [ignore]
  }).then(function (results) {
    if (results.violations.length) {
      console.warn('🚨 [axe-core] Accessibility issues found. See below for a list:');
      console.dir(results.violations);
    } else {
      console.log('[axe-core] Yay! 🎉 No accessibility violations were found!');
    }
  })["catch"](function (err) {
    console.info('Accessibility Check:', err.message);
  });
};

/***/ })

},[["./app/javascript/packs/site.js","runtime","vendors~app~application~main_sidebar~samples~site~visual_guidelines","vendors~site"]]]);
//# sourceMappingURL=site-bef4949f6e43c86b6bc1.chunk.js.map