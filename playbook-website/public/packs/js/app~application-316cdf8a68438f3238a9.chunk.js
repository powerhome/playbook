(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app~application"],{

/***/ "./app/javascript/components/App.tsx":
/*!*******************************************!*\
  !*** ./app/javascript/components/App.tsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "../node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _MainSidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MainSidebar */ "./app/javascript/components/MainSidebar/index.tsx");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/App.tsx";
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




function App() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
    _useState2 = _slicedToArray(_useState, 2),
    kits = _useState2[0],
    setKits = _useState2[1];
  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
    _useState4 = _slicedToArray(_useState3, 2),
    dark = _useState4[0],
    setDark = _useState4[1];
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    // Fetch JSON data from the server
    fetch("/beta/kits.json").then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
      setKits(data.kits); // Set 'kits' to the 'kits' property of 'data'
      setDark(data.dark_mode);
    })["catch"](function (error) {
      console.log(error);
    });
  }, []);
  return kits.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_3__["Layout"], {
    className: "pb--page--content",
    dark: dark,
    collapse: "md",
    position: "left",
    size: "lg",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_3__["Layout"].Side, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MainSidebar__WEBPACK_IMPORTED_MODULE_2__["default"], {
    kits: kits,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 11
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_3__["Layout"].Body, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pb--page--content--main ".concat(dark),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_3__["Flex"], {
    gap: "md",
    justify: "center",
    wrap: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_3__["Background"], {
    backgroundColor: "success",
    padding: "xl",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_3__["Background"], {
    backgroundColor: "success_secondary",
    padding: "xl",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_3__["Background"], {
    alt: "colorful background",
    backgroundSize: {
      xs: "sm",
      sm: "md",
      md: "xxl"
    },
    backgroundPosition: {
      xs: "center top",
      sm: "left top",
      md: "right top"
    },
    backgroundRepeat: {
      xs: "no-repeat",
      sm: "repeat-x",
      md: "repeat-y"
    },
    backgroundColor: {
      xs: "success",
      sm: "success_secondary",
      md: "primary"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 15
    }
  })))));
}
/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./app/javascript/site_styles/main.scss":
/*!**********************************************!*\
  !*** ./app/javascript/site_styles/main.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=app~application-316cdf8a68438f3238a9.chunk.js.map