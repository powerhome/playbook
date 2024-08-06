(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app"],{

/***/ "../playbook/dist/playbook.css":
/*!*************************************!*\
  !*** ../playbook/dist/playbook.css ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./app/javascript/components/App.jsx":
/*!*******************************************!*\
  !*** ./app/javascript/components/App.jsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "../node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _MainSidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MainSidebar */ "./app/javascript/components/MainSidebar/index.tsx");
/* harmony import */ var playbook_ui_dist_playbook_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! playbook-ui/dist/playbook.css */ "../playbook/dist/playbook.css");
/* harmony import */ var playbook_ui_dist_playbook_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(playbook_ui_dist_playbook_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var playbook_ui_dist_playbook_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! playbook-ui/dist/playbook.js */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui_dist_playbook_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(playbook_ui_dist_playbook_js__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/App.jsx";
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}





function App() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
    _useState2 = _slicedToArray(_useState, 2),
    kits = _useState2[0],
    setKits = _useState2[1];
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    // Fetch JSON data from the server
    fetch("/kits/test").then(function (response) {
      return response.json();
    }).then(function (data) {
      setKits(data);
    });
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MainSidebar__WEBPACK_IMPORTED_MODULE_2__["default"], {
    kits: kits,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 5
    }
  });
}
/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./app/javascript/packs/app.js":
/*!*************************************!*\
  !*** ./app/javascript/packs/app.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "../node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/App */ "./app/javascript/components/App.jsx");
/* harmony import */ var _fortawesome_fontawesome_pro_js_fontawesome_min_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/fontawesome-pro/js/fontawesome.min.js */ "../node_modules/@fortawesome/fontawesome-pro/js/fontawesome.min.js");
/* harmony import */ var _fortawesome_fontawesome_pro_js_fontawesome_min_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_pro_js_fontawesome_min_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _fortawesome_fontawesome_pro_js_regular_min_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/fontawesome-pro/js/regular.min.js */ "../node_modules/@fortawesome/fontawesome-pro/js/regular.min.js");
/* harmony import */ var _fortawesome_fontawesome_pro_js_regular_min_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_pro_js_regular_min_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var playbook_ui_dist_playbook_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! playbook-ui/dist/playbook.css */ "../playbook/dist/playbook.css");
/* harmony import */ var playbook_ui_dist_playbook_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(playbook_ui_dist_playbook_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var playbook_ui_dist_playbook_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! playbook-ui/dist/playbook.js */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui_dist_playbook_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(playbook_ui_dist_playbook_js__WEBPACK_IMPORTED_MODULE_6__);
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/packs/app.js";








var rootElement = document.getElementById("root");
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["StrictMode"], {
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 13,
    columnNumber: 3
  }
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_App__WEBPACK_IMPORTED_MODULE_2__["default"], {
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }
})), rootElement);

/***/ })

},[["./app/javascript/packs/app.js","runtime","vendors~app~application~main_sidebar~samples~site~visual_guidelines","vendors~app~application~main_sidebar~samples~visual_guidelines","vendors~app~application","vendors~app","app~application~main_sidebar~samples~visual_guidelines","app~application~main_sidebar"]]]);
//# sourceMappingURL=app-380e4f85f454d523b23a.chunk.js.map