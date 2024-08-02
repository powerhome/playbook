(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app~application"],{

/***/ "./app/javascript/components/Website/index.tsx":
/*!*****************************************************!*\
  !*** ./app/javascript/components/Website/index.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_layouts_LayoutRight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/layouts/LayoutRight */ "./app/javascript/components/Website/src/layouts/LayoutRight.tsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "../node_modules/react-router-dom/dist/index.js");
var _jsxFileName = "/Users/carloslima/Documents/Projects/playbook/playbook-website/app/javascript/components/Website/index.tsx";



function App() {
  var _useLoaderData = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["useLoaderData"])(),
    kits = _useLoaderData.kits,
    dark = _useLoaderData.dark;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, kits.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_src_layouts_LayoutRight__WEBPACK_IMPORTED_MODULE_1__["default"], {
    dark: dark,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 27
    }
  }));
}
/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./app/javascript/components/Website/src/components/CategoryTitle/index.tsx":
/*!**********************************************************************************!*\
  !*** ./app/javascript/components/Website/src/components/CategoryTitle/index.tsx ***!
  \**********************************************************************************/
/*! exports provided: CategoryTitle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryTitle", function() { return CategoryTitle; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utilities_website_sidebar_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../utilities/website_sidebar_helper */ "./app/javascript/utilities/website_sidebar_helper.ts");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.scss */ "./app/javascript/components/Website/src/components/CategoryTitle/styles.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/carloslima/Documents/Projects/playbook/playbook-website/app/javascript/components/Website/src/components/CategoryTitle/index.tsx",
  _this = undefined;




var CategoryTitle = function CategoryTitle(_ref) {
  var name = _ref.name;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    align: "center",
    className: "category-title",
    gap: "xs",
    marginBottom: "md",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    size: {
      xs: 3,
      sm: 2,
      md: 2,
      lg: 2,
      xl: 2
    },
    tag: "h1",
    text: Object(_utilities_website_sidebar_helper__WEBPACK_IMPORTED_MODULE_2__["linkFormat"])(name),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    className: "icon mobile",
    icon: "circle-arrow-right",
    size: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    className: "icon desktop",
    icon: "circle-arrow-right",
    size: "xl",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 7
    }
  }));
};

/***/ }),

/***/ "./app/javascript/components/Website/src/components/CategoryTitle/styles.scss":
/*!************************************************************************************!*\
  !*** ./app/javascript/components/Website/src/components/CategoryTitle/styles.scss ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./app/javascript/components/Website/src/components/DarkModeToggle.jsx":
/*!*****************************************************************************!*\
  !*** ./app/javascript/components/Website/src/components/DarkModeToggle.jsx ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/carloslima/Documents/Projects/playbook/playbook-website/app/javascript/components/Website/src/components/DarkModeToggle.jsx",
  _this = undefined;
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



var DarkModeToggle = function DarkModeToggle(_ref) {
  var initMode = _ref.initMode;
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(initMode ? JSON.parse(initMode) : false),
    _useState2 = _slicedToArray(_useState, 2),
    darkMode = _useState2[0],
    toggleDarkMode = _useState2[1];
  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    toggleLoading = _useState4[1];
  var toggleHook = function toggleHook() {
    toggleLoading(true);
    toggleDarkMode(!darkMode);
    window.location = !darkMode ? '/enable_dark_mode' : '/disable_dark_mode';
  };
  var iconClickHandler = function iconClickHandler() {
    toggleHook();
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    spacing: "between",
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 5
    }
  }, loading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    color: darkMode ? 'lighter' : '',
    dark: !darkMode,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    className: "toggle-icon",
    dark: true,
    fixedWidth: true,
    icon: "spinner",
    marginRight: "xs",
    pulse: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 13
    }
  }))) : null, !loading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    onClick: iconClickHandler,
    style: {
      cursor: 'pointer'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    color: darkMode ? '' : 'lighter',
    dark: darkMode,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    className: "toggle-icon",
    dark: true,
    fixedWidth: true,
    icon: "moon",
    marginRight: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 15
    }
  })))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Toggle"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    checked: darkMode,
    onChange: toggleHook,
    type: "checkbox",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 11
    }
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (DarkModeToggle);

/***/ }),

/***/ "./app/javascript/components/Website/src/components/Hero/index.tsx":
/*!*************************************************************************!*\
  !*** ./app/javascript/components/Website/src/components/Hero/index.tsx ***!
  \*************************************************************************/
/*! exports provided: Hero */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hero", function() { return Hero; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _images_pb_hero_mobile_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../images/pb-hero-mobile.svg */ "./app/javascript/images/pb-hero-mobile.svg");
/* harmony import */ var _images_pb_hero_mobile_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_images_pb_hero_mobile_svg__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_pb_hero_desktop_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../images/pb-hero-desktop.svg */ "./app/javascript/images/pb-hero-desktop.svg");
/* harmony import */ var _images_pb_hero_desktop_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_images_pb_hero_desktop_svg__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles.scss */ "./app/javascript/components/Website/src/components/Hero/styles.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "/Users/carloslima/Documents/Projects/playbook/playbook-website/app/javascript/components/Website/src/components/Hero/index.tsx";





function Hero(_ref) {
  var title = _ref.title,
    description = _ref.description;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Background"], {
    alt: "background with blue colors fading to darker blue",
    className: "hero",
    marginBottom: "lg",
    marginX: {
      lg: "sm",
      xl: "sm"
    },
    padding: "xl",
    paddingTop: {
      xs: "lg"
    },
    paddingBottom: {
      xs: "sm"
    },
    backgroundSize: {
      xs: "contain",
      sm: "1320px 245px"
    },
    backgroundPosition: {
      "default": "right bottom",
      xs: "center top",
      sm: "right bottom",
      md: "right bottom"
    },
    backgroundColor: "dark",
    backgroundRepeat: "no-repeat",
    imageUrl: {
      "default": _images_pb_hero_desktop_svg__WEBPACK_IMPORTED_MODULE_3___default.a,
      xs: _images_pb_hero_mobile_svg__WEBPACK_IMPORTED_MODULE_2___default.a,
      sm: _images_pb_hero_desktop_svg__WEBPACK_IMPORTED_MODULE_3___default.a,
      md: _images_pb_hero_desktop_svg__WEBPACK_IMPORTED_MODULE_3___default.a
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    size: {
      xs: 3,
      sm: 3,
      md: 2,
      lg: 2,
      xl: 2
    },
    paddingTop: {
      xs: "none",
      sm: "xl",
      md: "none"
    },
    paddingBottom: {
      xs: "none",
      "default": "sm"
    },
    text: title,
    marginBottom: {
      xs: "none",
      md: "xs"
    },
    dark: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    className: "hero-description",
    maxWidth: "sm",
    lineHeight: "loose",
    dark: true,
    text: description,
    truncate: "4",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 7
    }
  }));
}

/***/ }),

/***/ "./app/javascript/components/Website/src/components/Hero/styles.scss":
/*!***************************************************************************!*\
  !*** ./app/javascript/components/Website/src/components/Hero/styles.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./app/javascript/components/Website/src/components/KitCard/index.tsx":
/*!****************************************************************************!*\
  !*** ./app/javascript/components/Website/src/components/KitCard/index.tsx ***!
  \****************************************************************************/
/*! exports provided: KitCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KitCard", function() { return KitCard; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utilities_website_sidebar_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../utilities/website_sidebar_helper */ "./app/javascript/utilities/website_sidebar_helper.ts");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.scss */ "./app/javascript/components/Website/src/components/KitCard/styles.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/carloslima/Documents/Projects/playbook/playbook-website/app/javascript/components/Website/src/components/KitCard/index.tsx",
  _this = undefined;




var KitCard = function KitCard(_ref) {
  var description = _ref.description,
    name = _ref.name,
    platform = _ref.platform;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    className: "kit-card",
    paddingX: {
      xs: "sm",
      sm: "md",
      md: "md",
      lg: "md",
      xl: "md"
    },
    paddingTop: {
      xs: "xxs",
      "default": "md"
    },
    paddingBottom: {
      xs: "xxs",
      "default": "md"
    },
    borderRadius: "lg",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "/kits/".concat(name, "/").concat(platform),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    align: "center",
    className: "kit-card-header",
    justify: "between",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    text: Object(_utilities_website_sidebar_helper__WEBPACK_IMPORTED_MODULE_2__["linkFormat"])(name),
    size: 4,
    truncate: "1",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    className: "icon mobile",
    fixedWidth: true,
    icon: "angle-right",
    size: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    className: "icon desktop",
    fixedWidth: true,
    icon: "angle-right",
    size: "2x",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 11
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    className: "kit-card-description",
    color: "light",
    truncate: "2",
    text: description,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 9
    }
  })));
};

/***/ }),

/***/ "./app/javascript/components/Website/src/components/KitCard/styles.scss":
/*!******************************************************************************!*\
  !*** ./app/javascript/components/Website/src/components/KitCard/styles.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./app/javascript/components/Website/src/components/KitFilter/ReactSVG.tsx":
/*!*********************************************************************************!*\
  !*** ./app/javascript/components/Website/src/components/KitFilter/ReactSVG.tsx ***!
  \*********************************************************************************/
/*! exports provided: ReactSVG */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactSVG", function() { return ReactSVG; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/carloslima/Documents/Projects/playbook/playbook-website/app/javascript/components/Website/src/components/KitFilter/ReactSVG.tsx",
  _this = undefined;

var ReactSVG = function ReactSVG(_ref) {
  var active = _ref.active;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
    width: "17",
    height: "16",
    viewBox: "0 0 17 16",
    fill: "red",
    xmlns: "http://www.w3.org/2000/svg",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M1.76504 16H9.72023C9.72023 16 7.95577 11.9925 8.40428 8.31407C8.85295 4.63563 11.7538 2.96072 13.3987 2.78131C15.0434 2.60175 15.9407 3.6187 15.9407 3.6187L16.2997 3.08033C16.2997 3.08033 13.937 0.687786 10.9463 0.957048C7.95561 1.22616 5.89214 3.19993 4.60624 5.59247C3.32019 7.98516 2.57252 9.65977 2.0642 12.1719C1.55588 14.6841 1.76504 16 1.76504 16Z",
    fill: "#0056CF",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M0.179405 11.9924L1.73456 12.112L1.4653 13.667L0 13.4876L0.179405 11.9924Z",
    fill: "#0056CF",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M2.63231 8.70271L3.05108 7.53642L1.67532 6.99805L1.22681 8.25404L2.63231 8.70271Z",
    fill: "#0056CF",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M4.57561 4.69519L5.38309 3.73835L4.3364 3.05048L3.49902 3.97741L4.57561 4.69519Z",
    fill: "#0056CF",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M6.69922 0.986926L7.417 1.85421L8.40388 1.28593L7.68611 0.478455L6.69922 0.986926Z",
    fill: "#0056CF",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M10.198 0L10.3774 0.867436L11.6036 0.837532L11.4839 0.0599554L10.198 0Z",
    fill: "#0056CF",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M14.3546 0.927002L14.3247 1.46522L15.1621 1.91373L15.3415 1.64463L14.3546 0.927002Z",
    fill: "#0056CF",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M14.1753 3.22998V3.6785L14.9828 3.7682V3.40923L14.1753 3.22998Z",
    fill: "#0056CF",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M11.6028 3.6184L11.9915 4.33602L12.5598 3.88751L12.4402 3.40894L11.6028 3.6184Z",
    fill: "#0056CF",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M10.3764 4.5459L10.9745 5.44308L10.6156 6.071L9.74829 5.11417L10.3764 4.5459Z",
    fill: "#0056CF",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M9.18061 7.02789L8.79175 7.80547L9.80853 8.67291L10.0477 7.68587L9.18061 7.02789Z",
    fill: "#0056CF",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M8.76268 9.74921L8.70288 10.7959L9.95888 11.3343L9.89908 10.3472L8.76268 9.74921Z",
    fill: "#0056CF",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M9.12085 13.4579L9.42002 14.5346L11.0049 14.6243L10.4366 13.4579H9.12085Z",
    fill: "#0056CF",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 7
    }
  }));
};

/***/ }),

/***/ "./app/javascript/components/Website/src/components/KitFilter/index.tsx":
/*!******************************************************************************!*\
  !*** ./app/javascript/components/Website/src/components/KitFilter/index.tsx ***!
  \******************************************************************************/
/*! exports provided: KitFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KitFilter", function() { return KitFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ReactSVG__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReactSVG */ "./app/javascript/components/Website/src/components/KitFilter/ReactSVG.tsx");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.scss */ "./app/javascript/components/Website/src/components/KitFilter/styles.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/carloslima/Documents/Projects/playbook/playbook-website/app/javascript/components/Website/src/components/KitFilter/index.tsx",
  _this = undefined;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var icons = {
  rails: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
    width: "17",
    height: "16",
    viewBox: "0 0 17 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M1.76504 16H9.72023C9.72023 16 7.95577 11.9925 8.40428 8.31407C8.85295 4.63563 11.7538 2.96072 13.3987 2.78131C15.0434 2.60175 15.9407 3.6187 15.9407 3.6187L16.2997 3.08033C16.2997 3.08033 13.937 0.687786 10.9463 0.957048C7.95561 1.22616 5.89214 3.19993 4.60624 5.59247C3.32019 7.98516 2.57252 9.65977 2.0642 12.1719C1.55588 14.6841 1.76504 16 1.76504 16Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M0.179405 11.9924L1.73456 12.112L1.4653 13.667L0 13.4876L0.179405 11.9924Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M2.63231 8.70271L3.05108 7.53642L1.67532 6.99805L1.22681 8.25404L2.63231 8.70271Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M4.57561 4.69519L5.38309 3.73835L4.3364 3.05048L3.49902 3.97741L4.57561 4.69519Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M6.69922 0.986926L7.417 1.85421L8.40388 1.28593L7.68611 0.478455L6.69922 0.986926Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M10.198 0L10.3774 0.867436L11.6036 0.837532L11.4839 0.0599554L10.198 0Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M14.3546 0.927002L14.3247 1.46522L15.1621 1.91373L15.3415 1.64463L14.3546 0.927002Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M14.1753 3.22998V3.6785L14.9828 3.7682V3.40923L14.1753 3.22998Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M11.6028 3.6184L11.9915 4.33602L12.5598 3.88751L12.4402 3.40894L11.6028 3.6184Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M10.3764 4.5459L10.9745 5.44308L10.6156 6.071L9.74829 5.11417L10.3764 4.5459Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M9.18061 7.02789L8.79175 7.80547L9.80853 8.67291L10.0477 7.68587L9.18061 7.02789Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M8.76268 9.74921L8.70288 10.7959L9.95888 11.3343L9.89908 10.3472L8.76268 9.74921Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M9.12085 13.4579L9.42002 14.5346L11.0049 14.6243L10.4366 13.4579H9.12085Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 7
    }
  })),
  react: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
    width: "17",
    height: "16",
    viewBox: "0 0 17 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M1.76504 16H9.72023C9.72023 16 7.95577 11.9925 8.40428 8.31407C8.85295 4.63563 11.7538 2.96072 13.3987 2.78131C15.0434 2.60175 15.9407 3.6187 15.9407 3.6187L16.2997 3.08033C16.2997 3.08033 13.937 0.687786 10.9463 0.957048C7.95561 1.22616 5.89214 3.19993 4.60624 5.59247C3.32019 7.98516 2.57252 9.65977 2.0642 12.1719C1.55588 14.6841 1.76504 16 1.76504 16Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M0.179405 11.9924L1.73456 12.112L1.4653 13.667L0 13.4876L0.179405 11.9924Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M2.63231 8.70271L3.05108 7.53642L1.67532 6.99805L1.22681 8.25404L2.63231 8.70271Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M4.57561 4.69519L5.38309 3.73835L4.3364 3.05048L3.49902 3.97741L4.57561 4.69519Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M6.69922 0.986926L7.417 1.85421L8.40388 1.28593L7.68611 0.478455L6.69922 0.986926Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M10.198 0L10.3774 0.867436L11.6036 0.837532L11.4839 0.0599554L10.198 0Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M14.3546 0.927002L14.3247 1.46522L15.1621 1.91373L15.3415 1.64463L14.3546 0.927002Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M14.1753 3.22998V3.6785L14.9828 3.7682V3.40923L14.1753 3.22998Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M11.6028 3.6184L11.9915 4.33602L12.5598 3.88751L12.4402 3.40894L11.6028 3.6184Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M10.3764 4.5459L10.9745 5.44308L10.6156 6.071L9.74829 5.11417L10.3764 4.5459Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M9.18061 7.02789L8.79175 7.80547L9.80853 8.67291L10.0477 7.68587L9.18061 7.02789Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M8.76268 9.74921L8.70288 10.7959L9.95888 11.3343L9.89908 10.3472L8.76268 9.74921Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M9.12085 13.4579L9.42002 14.5346L11.0049 14.6243L10.4366 13.4579H9.12085Z",
    fill: "#0056CF",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 7
    }
  })),
  swift: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
    width: "18",
    height: "16",
    viewBox: "0 0 18 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g", {
    "clip-path": "url(#clip0_3811_47487)",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M16.4652 11.2567C16.5072 11.1727 16.5072 11.0887 16.5492 11.0053C17.5572 7.05667 15.1626 2.43667 11.0466 0.000671387C12.3479 1.63134 13.1346 3.722 13.1346 5.99734C13.1346 6.68534 13.0626 7.356 12.9259 8.00334L12.9372 7.94C12.8792 8.2 12.8072 8.42534 12.7172 8.64134L12.7272 8.614C12.5939 8.54 12.4839 8.47067 12.3779 8.396L12.3906 8.404C9.21924 6.30467 6.45657 4.02067 3.95657 1.478L3.94924 1.47067C5.57457 3.872 7.25924 5.97067 9.09724 7.92267L9.07324 7.89667C6.3259 6.13667 3.93857 4.31134 1.7139 2.30934L1.76457 2.354C2.08057 2.87667 2.41257 3.32934 2.78057 3.74934L2.77124 3.738C4.97124 6.68667 7.43124 9.25267 10.1706 11.4887L10.2486 11.55C8.10657 12.8533 5.1239 12.9367 2.09924 11.55C1.29724 11.17 0.608572 10.75 -0.0307617 10.268L-9.50545e-05 10.29C1.3479 12.388 3.25324 14.024 5.50724 15.0093L5.58724 15.0407C6.7159 15.6 8.04524 15.928 9.45124 15.928C10.8572 15.928 12.1866 15.6007 13.3672 15.018L13.3152 15.0413H13.3579C13.4552 14.998 13.5386 14.9413 13.6099 14.8733H13.6092C14.6172 14.3693 16.5919 13.8247 17.6839 15.922C17.9772 16.51 18.5232 13.78 16.4659 11.2593L16.4652 11.2567Z",
    fill: "#C1CDD6",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 9
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("defs", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("clipPath", {
    id: "clip0_3811_47487",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", {
    width: "18",
    height: "16",
    fill: "white",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 11
    }
  }))))
};
var KitFilter = function KitFilter(_ref) {
  var kits = _ref.kits,
    setFilteredKits = _ref.setFilteredKits,
    setPlatform = _ref.setPlatform;
  console.log('kits', kits);
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
    _useState2 = _slicedToArray(_useState, 2),
    search = _useState2[0],
    setSearch = _useState2[1];
  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('react'),
    _useState4 = _slicedToArray(_useState3, 2),
    platform = _useState4[0],
    setSelectedPlatform = _useState4[1];
  var handleOnChange = function handleOnChange(_ref2) {
    var target = _ref2.target;
    var value = target.value;
    setSearch(value);
  };
  var selectPlatform = function selectPlatform(platform) {
    setPlatform(platform);
    setSelectedPlatform(platform);
    var filteredKits = searchKit(kits, search, platform);
    console.log('platform', filteredKits);
    setFilteredKits(filteredKits);
  };
  var searchKit = function searchKit(kitList, search, platform) {
    var kits = JSON.parse(JSON.stringify(kitList));
    return kits.filter(function (kit) {
      if (kit.components) {
        kit.components = kit.components.filter(function (component) {
          return component.platforms.includes(platform) && component.name && component.name.toLowerCase().includes(search.toLowerCase());
        });
        return kit.components.length > 0;
      } else if (!kit.components && kit.name) {
        return kit.platforms.includes(platform) && kit.name && kit.name.toLowerCase().includes(search.toLowerCase());
      }
      return false;
    });
  };
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var timer = setTimeout(function () {
      var filteredKits = searchKit(kits, search, platform);
      console.log('useEffect', filteredKits);
      setFilteredKits(filteredKits);
    }, 200);
    return function () {
      return clearTimeout(timer);
    };
  }, [search]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Nav"], {
    link: "#",
    orientation: "horizontal",
    paddingBottom: "lg",
    variant: "subtle",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    active: platform === 'react',
    link: "#",
    onClick: function onClick() {
      return selectPlatform('react');
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    align: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 125,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    color: "link",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 126,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    customIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ReactSVG__WEBPACK_IMPORTED_MODULE_2__["ReactSVG"], {
      active: platform === 'react',
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 128,
        columnNumber: 29
      }
    }),
    paddingRight: "xs",
    size: "lg",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 127,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "pb_nav_list_item_text",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 133,
      columnNumber: 13
    }
  }, "React"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    active: platform === 'rails',
    iconLeft: "rails",
    link: "#",
    onClick: function onClick() {
      return selectPlatform('rails');
    },
    text: "Rails",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 136,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    active: platform === 'swift',
    iconLeft: "swift",
    link: "#",
    onClick: function onClick() {
      return selectPlatform('swift');
    },
    text: "Swift",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 143,
      columnNumber: 9
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["TextInput"], {
    addOn: {
      icon: 'search',
      alignment: 'left',
      border: false
    },
    className: "kit-filter",
    name: "search",
    maxWidth: "sm",
    onChange: handleOnChange,
    placeholder: "Filter Components by Name",
    value: search,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 152,
      columnNumber: 7
    }
  }));
};

/***/ }),

/***/ "./app/javascript/components/Website/src/components/KitFilter/styles.scss":
/*!********************************************************************************!*\
  !*** ./app/javascript/components/Website/src/components/KitFilter/styles.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./app/javascript/components/Website/src/components/KitGrid/index.tsx":
/*!****************************************************************************!*\
  !*** ./app/javascript/components/Website/src/components/KitGrid/index.tsx ***!
  \****************************************************************************/
/*! exports provided: KitGrid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KitGrid", function() { return KitGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.scss */ "./app/javascript/components/Website/src/components/KitGrid/styles.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/Users/carloslima/Documents/Projects/playbook/playbook-website/app/javascript/components/Website/src/components/KitGrid/index.tsx",
  _this = undefined;



var KitGrid = function KitGrid(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Layout"], {
    layout: "collection",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Layout"].Body, {
    className: "kit-container",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 7
    }
  }, children));
};

/***/ }),

/***/ "./app/javascript/components/Website/src/components/KitGrid/styles.scss":
/*!******************************************************************************!*\
  !*** ./app/javascript/components/Website/src/components/KitGrid/styles.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./app/javascript/components/Website/src/components/PageContainer/index.tsx":
/*!**********************************************************************************!*\
  !*** ./app/javascript/components/Website/src/components/PageContainer/index.tsx ***!
  \**********************************************************************************/
/*! exports provided: PageContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageContainer", function() { return PageContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/carloslima/Documents/Projects/playbook/playbook-website/app/javascript/components/Website/src/components/PageContainer/index.tsx",
  _this = undefined;


var PageContainer = function PageContainer(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    align: "stretch",
    gap: "lg",
    maxWidth: "xxl",
    marginX: "auto",
    orientation: "column",
    paddingX: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 5
    }
  }, children);
};

/***/ }),

/***/ "./app/javascript/components/Website/src/hooks/loaders.ts":
/*!****************************************************************!*\
  !*** ./app/javascript/components/Website/src/hooks/loaders.ts ***!
  \****************************************************************/
/*! exports provided: ComponentsLoader, CategoryLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentsLoader", function() { return ComponentsLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryLoader", function() { return CategoryLoader; });
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router-dom */ "../node_modules/react-router-dom/dist/index.js");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var sortByName = function sortByName(a, b) {
  return a.name.localeCompare(b.name);
};
var ComponentsLoader = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var response, data, sortComponentsByName;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return fetch("/beta/kits.json");
        case 2:
          response = _context.sent;
          _context.next = 5;
          return response.json();
        case 5:
          data = _context.sent;
          sortComponentsByName = function sortComponentsByName(kitCategory) {
            kitCategory.components.sort(sortByName);
          };
          data.kits.sort(sortByName).forEach(sortComponentsByName);
          return _context.abrupt("return", data);
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function ComponentsLoader() {
    return _ref.apply(this, arguments);
  };
}();
var CategoryLoader = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref2) {
    var params, response, _yield$response$json, kits, filteredData;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          params = _ref2.params;
          _context2.next = 3;
          return fetch("/beta/kits.json");
        case 3:
          response = _context2.sent;
          _context2.next = 6;
          return response.json();
        case 6:
          _yield$response$json = _context2.sent;
          kits = _yield$response$json.kits;
          filteredData = kits.filter(function (kit) {
            return kit.name === params.name;
          })[0];
          filteredData.components.sort(sortByName);
          return _context2.abrupt("return", filteredData);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function CategoryLoader(_x) {
    return _ref3.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./app/javascript/components/Website/src/layouts/LayoutRight.tsx":
/*!***********************************************************************!*\
  !*** ./app/javascript/components/Website/src/layouts/LayoutRight.tsx ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LayoutRight; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "../node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _components_DarkModeToggle_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/DarkModeToggle.jsx */ "./app/javascript/components/Website/src/components/DarkModeToggle.jsx");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/carloslima/Documents/Projects/playbook/playbook-website/app/javascript/components/Website/src/layouts/LayoutRight.tsx";




function LayoutRight(_ref) {
  var dark = _ref.dark;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_3__["Background"], {
    backgroundColor: dark ? "dark" : "white",
    className: "pb--page--content--main",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_3__["Flex"], {
    spacing: "between",
    vertical: "center",
    display: {
      xs: "none",
      sm: "none",
      md: "none",
      "default": "none",
      lg: "flex"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    text: "Back to Legacy View",
    variant: "link",
    icon: "circle-left",
    tag: "h1",
    marginY: "xs",
    paddingLeft: "none",
    marginBottom: "none",
    paddingBottom: "none",
    link: "/kits",
    marginLeft: "md",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_3__["FlexItem"], {
    marginRight: "md",
    className: "pb--page--dark-mode-toggle-desktop",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_DarkModeToggle_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
    initMode: dark,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 11
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Outlet"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 7
    }
  }));
}

/***/ }),

/***/ "./app/javascript/components/Website/src/pages/CategoryShow/index.tsx":
/*!****************************************************************************!*\
  !*** ./app/javascript/components/Website/src/pages/CategoryShow/index.tsx ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CategoryShow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "../node_modules/react-router-dom/dist/index.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_KitCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/KitCard */ "./app/javascript/components/Website/src/components/KitCard/index.tsx");
/* harmony import */ var _components_KitFilter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/KitFilter */ "./app/javascript/components/Website/src/components/KitFilter/index.tsx");
/* harmony import */ var _components_KitGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/KitGrid */ "./app/javascript/components/Website/src/components/KitGrid/index.tsx");
/* harmony import */ var _components_Hero__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Hero */ "./app/javascript/components/Website/src/components/Hero/index.tsx");
/* harmony import */ var _components_PageContainer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/PageContainer */ "./app/javascript/components/Website/src/components/PageContainer/index.tsx");
/* harmony import */ var _utilities_website_sidebar_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../utilities/website_sidebar_helper */ "./app/javascript/utilities/website_sidebar_helper.ts");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./styles.scss */ "./app/javascript/components/Website/src/pages/CategoryShow/styles.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_9__);
var _jsxFileName = "/Users/carloslima/Documents/Projects/playbook/playbook-website/app/javascript/components/Website/src/pages/CategoryShow/index.tsx";
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










function CategoryShow() {
  var _this = this;
  var _useLoaderData = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useLoaderData"])(),
    components = _useLoaderData.components,
    name = _useLoaderData.name,
    description = _useLoaderData.description;
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(components),
    _useState2 = _slicedToArray(_useState, 2),
    kitsToShow = _useState2[0],
    setKitsToShow = _useState2[1];
  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('react'),
    _useState4 = _slicedToArray(_useState3, 2),
    platform = _useState4[0],
    setPlatform = _useState4[1];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Hero__WEBPACK_IMPORTED_MODULE_6__["Hero"], {
    description: description,
    title: Object(_utilities_website_sidebar_helper__WEBPACK_IMPORTED_MODULE_8__["linkFormat"])(name),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Flex"], {
    align: "center",
    orientation: "column",
    paddingBottom: "lg",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_KitFilter__WEBPACK_IMPORTED_MODULE_4__["KitFilter"], {
    kits: components,
    setFilteredKits: setKitsToShow,
    setPlatform: setPlatform,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 9
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageContainer__WEBPACK_IMPORTED_MODULE_7__["PageContainer"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Flex"], {
    align: "center",
    className: "category-breadcrumb",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], {
    to: "/beta/kits",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Body"], {
    className: "previous-route",
    color: "light",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 13
    }
  }, "Components")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
    className: "category-breadcrumb-icon",
    icon: "angle-right",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Body"], {
    text: Object(_utilities_website_sidebar_helper__WEBPACK_IMPORTED_MODULE_8__["linkFormat"])(name),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 11
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_KitGrid__WEBPACK_IMPORTED_MODULE_5__["KitGrid"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 9
    }
  }, !kitsToShow.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Body"], {
    text: "No Results, Try Again",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 13
    }
  }), kitsToShow.map(function (_ref, index) {
    var description = _ref.description,
      name = _ref.name;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_KitCard__WEBPACK_IMPORTED_MODULE_3__["KitCard"], {
      description: description,
      name: name,
      key: "category-".concat(name, "-").concat(index),
      platform: platform,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 13
      }
    });
  }))));
}

/***/ }),

/***/ "./app/javascript/components/Website/src/pages/CategoryShow/styles.scss":
/*!******************************************************************************!*\
  !*** ./app/javascript/components/Website/src/pages/CategoryShow/styles.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./app/javascript/components/Website/src/pages/ComponentList.tsx":
/*!***********************************************************************!*\
  !*** ./app/javascript/components/Website/src/pages/ComponentList.tsx ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ComponentList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "../node_modules/react-router-dom/dist/index.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_KitCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/KitCard */ "./app/javascript/components/Website/src/components/KitCard/index.tsx");
/* harmony import */ var _components_KitFilter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/KitFilter */ "./app/javascript/components/Website/src/components/KitFilter/index.tsx");
/* harmony import */ var _components_Hero__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Hero */ "./app/javascript/components/Website/src/components/Hero/index.tsx");
/* harmony import */ var _components_KitGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/KitGrid */ "./app/javascript/components/Website/src/components/KitGrid/index.tsx");
/* harmony import */ var _components_PageContainer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/PageContainer */ "./app/javascript/components/Website/src/components/PageContainer/index.tsx");
/* harmony import */ var _components_CategoryTitle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/CategoryTitle */ "./app/javascript/components/Website/src/components/CategoryTitle/index.tsx");
var _jsxFileName = "/Users/carloslima/Documents/Projects/playbook/playbook-website/app/javascript/components/Website/src/pages/ComponentList.tsx";
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var description = "Components are the reusable building blocks of our design system. Each component meets a specific interaction or UI need, and has been specifically created to work together to create patterns and intuitive user experiences.";
function ComponentList() {
  var _this = this;
  var outlet = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useOutlet"])();
  var _useLoaderData = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useLoaderData"])(),
    kits = _useLoaderData.kits;
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(kits),
    _useState2 = _slicedToArray(_useState, 2),
    kitsToShow = _useState2[0],
    setKitsToShow = _useState2[1];
  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('react'),
    _useState4 = _slicedToArray(_useState3, 2),
    platform = _useState4[0],
    setPlatform = _useState4[1];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, !outlet && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Hero__WEBPACK_IMPORTED_MODULE_5__["Hero"], {
    description: description,
    title: "Components",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Flex"], {
    align: "center",
    orientation: "column",
    paddingBottom: "lg",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_KitFilter__WEBPACK_IMPORTED_MODULE_4__["KitFilter"], {
    kits: kits,
    setFilteredKits: setKitsToShow,
    setPlatform: setPlatform,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 13
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageContainer__WEBPACK_IMPORTED_MODULE_7__["PageContainer"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 11
    }
  }, !kitsToShow.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Body"], {
    text: "No Results, Try Again",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 15
    }
  }), kitsToShow.map(function (_ref, index) {
    var name = _ref.name,
      components = _ref.components;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
      className: "category mb_xl",
      key: "".concat(name, "-").concat(index),
      id: name,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 46,
        columnNumber: 15
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], {
      to: "/beta/kit_category/".concat(name),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51,
        columnNumber: 17
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_CategoryTitle__WEBPACK_IMPORTED_MODULE_8__["CategoryTitle"], {
      name: name,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52,
        columnNumber: 19
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_KitGrid__WEBPACK_IMPORTED_MODULE_6__["KitGrid"], {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54,
        columnNumber: 17
      }
    }, components.map(function (_ref2, index) {
      var name = _ref2.name,
        description = _ref2.description;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_KitCard__WEBPACK_IMPORTED_MODULE_3__["KitCard"], {
        description: description,
        name: name,
        key: "".concat(name, "-").concat(index),
        platform: platform,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 56,
          columnNumber: 21
        }
      });
    })));
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Outlet"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 7
    }
  }));
}

/***/ }),

/***/ "./app/javascript/components/Website/src/pages/ComponentShow.tsx":
/*!***********************************************************************!*\
  !*** ./app/javascript/components/Website/src/pages/ComponentShow.tsx ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ComponentShow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/carloslima/Documents/Projects/playbook/playbook-website/app/javascript/components/Website/src/pages/ComponentShow.tsx";


function ComponentShow() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    paddingTop: {
      xs: "md",
      sm: "md",
      md: "md",
      "default": "none"
    },
    text: "Component Show Page",
    size: "2",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 5
    }
  });
}

/***/ }),

/***/ "./app/javascript/images/pb-hero-desktop.svg":
/*!***************************************************!*\
  !*** ./app/javascript/images/pb-hero-desktop.svg ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "media/images/pb-hero-desktop-5a9fcb37de0c0aa2cb3bbacecf418224.svg";

/***/ }),

/***/ "./app/javascript/images/pb-hero-mobile.svg":
/*!**************************************************!*\
  !*** ./app/javascript/images/pb-hero-mobile.svg ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "media/images/pb-hero-mobile-f103a685af562beac0b85fb8a208b7c7.svg";

/***/ }),

/***/ "./app/javascript/packs/app.js":
/*!*************************************!*\
  !*** ./app/javascript/packs/app.js ***!
  \*************************************/
/*! exports provided: Website */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Website", function() { return Website; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "../node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _components_Website__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Website */ "./app/javascript/components/Website/index.tsx");
/* harmony import */ var _components_Website_src_pages_ComponentList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Website/src/pages/ComponentList */ "./app/javascript/components/Website/src/pages/ComponentList.tsx");
/* harmony import */ var _components_Website_src_pages_ComponentShow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Website/src/pages/ComponentShow */ "./app/javascript/components/Website/src/pages/ComponentShow.tsx");
/* harmony import */ var _components_Website_src_pages_CategoryShow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Website/src/pages/CategoryShow */ "./app/javascript/components/Website/src/pages/CategoryShow/index.tsx");
/* harmony import */ var _components_Website_src_hooks_loaders__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Website/src/hooks/loaders */ "./app/javascript/components/Website/src/hooks/loaders.ts");
var _jsxFileName = "/Users/carloslima/Documents/Projects/playbook/playbook-website/app/javascript/packs/app.js",
  _this = undefined;







var router = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["createBrowserRouter"])(Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["createRoutesFromElements"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
  element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Website__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 18
    }
  }),
  loader: _components_Website_src_hooks_loaders__WEBPACK_IMPORTED_MODULE_6__["ComponentsLoader"],
  path: "/beta",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 18,
    columnNumber: 5
  }
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
  element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Website_src_pages_ComponentList__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 20
    }
  }),
  loader: _components_Website_src_hooks_loaders__WEBPACK_IMPORTED_MODULE_6__["ComponentsLoader"],
  path: "kits",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 23,
    columnNumber: 7
  }
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
  element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Website_src_pages_ComponentShow__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 22
    }
  }),
  path: ":name",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 28,
    columnNumber: 9
  }
}), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
  element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Navigate"], {
    to: "react",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 22
    }
  }),
  path: ":name",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 32,
    columnNumber: 9
  }
})), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
  element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Website_src_pages_CategoryShow__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 20
    }
  }),
  loader: _components_Website_src_hooks_loaders__WEBPACK_IMPORTED_MODULE_6__["CategoryLoader"],
  path: "kit_category/:name",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 37,
    columnNumber: 7
  }
}))));
var Website = function Website() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["RouterProvider"], {
    router: router,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 30
    }
  });
};

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

}]);
//# sourceMappingURL=app~application-9125501b9e948173b13b.chunk.js.map