(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react_sidebar"],{

/***/ "./app/javascript/components/Sidebar/index.tsx":
/*!*****************************************************!*\
  !*** ./app/javascript/components/Sidebar/index.tsx ***!
  \*****************************************************/
/*! exports provided: MENU_ITEMS, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_ITEMS", function() { return MENU_ITEMS; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/Sidebar/index.tsx",
  _this = undefined;


var MENU_ITEMS = ["Colors", "Max Width", "Position", "Z-Index", "Line Height", "Number Spacing", "Shadows", "Spacing", "Border Radius", "Typography", "Display", "Cursor", "Flex Box", "Hover", "Text Align", "Overflow"];
var Sidebar = function Sidebar() {
  var regex = /(?:(?:[^/]*\/){2})(.*)/;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Nav"], {
    variant: "subtle",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 5
    }
  }, MENU_ITEMS.map(function (item) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
      active: item.toLowerCase().replace(/[\sA-Z-]+/g, function (match) {
        return " ".replace(/[\s-]/g, '_');
      }) == window.location.pathname.match(regex)[1],
      link: "/visual_guidelines/".concat(item.toLowerCase().replace(/[\sA-Z-]+/g, function (match) {
        return " ".replace(/[\s-]/g, '_');
      })),
      text: item,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 17
      }
    });
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (Sidebar);

/***/ }),

/***/ "./app/javascript/packs/react_sidebar.js":
/*!***********************************************!*\
  !*** ./app/javascript/packs/react_sidebar.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webpacker_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpacker-react */ "../node_modules/webpacker-react/index.js");
/* harmony import */ var webpacker_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpacker_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Sidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Sidebar */ "./app/javascript/components/Sidebar/index.tsx");


webpacker_react__WEBPACK_IMPORTED_MODULE_0___default.a.setup({
  Sidebar: _components_Sidebar__WEBPACK_IMPORTED_MODULE_1__["default"]
});

/***/ })

},[["./app/javascript/packs/react_sidebar.js","runtime","vendors~application~main_sidebar~react_sidebar~samples~site~visual_guidelines","vendors~application~main_sidebar~react_sidebar~samples~visual_guidelines","application~main_sidebar~react_sidebar~samples~visual_guidelines"]]]);
//# sourceMappingURL=react_sidebar-649967e3119c3c0a31cd.chunk.js.map