(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main_sidebar"],{

/***/ "./app/javascript/packs/main_sidebar.js":
/*!**********************************************!*\
  !*** ./app/javascript/packs/main_sidebar.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webpacker_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpacker-react */ "../node_modules/webpacker-react/index.js");
/* harmony import */ var webpacker_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpacker_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_MainSidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/MainSidebar */ "./app/javascript/components/MainSidebar/index.tsx");


webpacker_react__WEBPACK_IMPORTED_MODULE_0___default.a.registerComponents({
  MainSidebar: _components_MainSidebar__WEBPACK_IMPORTED_MODULE_1__["default"]
});

/***/ }),

/***/ "./app/javascript/utilities/website_sidebar_helper.ts":
/*!************************************************************!*\
  !*** ./app/javascript/utilities/website_sidebar_helper.ts ***!
  \************************************************************/
/*! exports provided: linkFormat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linkFormat", function() { return linkFormat; });
var linkFormat = function linkFormat(item) {
  var linkTitle = Array.isArray(item) ? item[0] : item;
  var formattedTitle = linkTitle.replace(/_/g, ' ') // replaces underscore
  .replace(/\b(?:and)\b/g, '&') // replaces "and" with "&"
  .replace(/\b\w/g, function (match) {
    return match.toUpperCase();
  });
  return formattedTitle;
};

/***/ })

},[["./app/javascript/packs/main_sidebar.js","runtime","vendors~app~application~main_sidebar~samples~site~visual_guidelines","vendors~app~application~main_sidebar~samples~visual_guidelines","vendors~application~main_sidebar~samples~visual_guidelines","app~application~main_sidebar~samples~visual_guidelines","application~main_sidebar"]]]);
//# sourceMappingURL=main_sidebar-443b08b07e406bc17cb1.chunk.js.map