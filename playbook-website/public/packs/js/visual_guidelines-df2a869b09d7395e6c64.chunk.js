(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["visual_guidelines"],{

/***/ "../node_modules/classnames/index.js":
/*!*******************************************!*\
  !*** ../node_modules/classnames/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
  'use strict';

  var hasOwn = {}.hasOwnProperty;
  var nativeCodeString = '[native code]';
  function classNames() {
    var classes = [];
    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;
      var argType = typeof arg;
      if (argType === 'string' || argType === 'number') {
        classes.push(arg);
      } else if (Array.isArray(arg)) {
        if (arg.length) {
          var inner = classNames.apply(null, arg);
          if (inner) {
            classes.push(inner);
          }
        }
      } else if (argType === 'object') {
        if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
          classes.push(arg.toString());
          continue;
        }
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
    return classes.join(' ');
  }
  if ( true && module.exports) {
    classNames.default = classNames;
    module.exports = classNames;
  } else if (true) {
    // register as 'classnames', consistent with npm package name
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return classNames;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})();

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/Colors/Example.tsx":
/*!***********************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/Colors/Example.tsx ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types */ "./app/javascript/components/VisualGuidelines/types.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/VisualGuidelines/Colors/Example.tsx",
  _this = undefined;
/* eslint-disable flowtype/no-types-missing-file-annotation */
// React Pure component - do not use state!





var Example = function Example(_ref) {
  var colors = _ref.colors,
    title = _ref.title;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Title"], {
    size: "4",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 5
    }
  }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "pb--utlities-color",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 5
    }
  }, colors.map(function (_ref2) {
    var dark = _ref2.dark,
      name = _ref2.name,
      variable = _ref2.variable;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        dark: dark
      }),
      key: name,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18,
        columnNumber: 9
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pb--color_".concat(variable),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22,
        columnNumber: 11
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Body"], {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        dark: dark,
        name: 'name'
      }),
      tag: "p",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23,
        columnNumber: 11
      }
    }, name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Body"], {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        dark: dark,
        "var": 'var'
      }),
      tag: "p",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 11
      }
    }, "$".concat(variable)));
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (Example);

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/Colors/StatusExample.tsx":
/*!*****************************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/Colors/StatusExample.tsx ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types */ "./app/javascript/components/VisualGuidelines/types.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/VisualGuidelines/Colors/StatusExample.tsx",
  _this = undefined;
/* eslint-disable flowtype/no-types-missing-file-annotation */
// React Pure component - do not use state!





var StatusExample = function StatusExample(_ref) {
  var statusColors = _ref.statusColors,
    subtleColors = _ref.subtleColors,
    title = _ref.title;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Title"], {
    size: "4",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 5
    }
  }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Card"], {
    className: "pb--utilities-card",
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "pb--utlities-color pb--utilities-status-1",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 7
    }
  }, statusColors.map(function (_ref2) {
    var dark = _ref2.dark,
      name = _ref2.name,
      variable = _ref2.variable;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        dark: dark
      }),
      key: name,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pb--color_".concat(variable),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27,
        columnNumber: 13
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Body"], {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        dark: dark,
        name: 'name'
      }),
      tag: "p",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28,
        columnNumber: 13
      }
    }, name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Body"], {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        dark: dark,
        "var": 'var'
      }),
      tag: "p",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 13
      }
    }, "$".concat(variable)));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pb--utilities-seperator",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["SectionSeparator"], {
    text: "Subtle Variations",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 9
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "pb--utlities-color pb--utilities-status-2",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 7
    }
  }, subtleColors.map(function (_ref3) {
    var dark = _ref3.dark,
      name = _ref3.name,
      variable = _ref3.variable;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        dark: dark
      }),
      key: name,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pb--color_".concat(variable),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54,
        columnNumber: 13
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Body"], {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        dark: dark,
        name: 'name'
      }),
      tag: "p",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 13
      }
    }, name.split('Subtle')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Body"], {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        dark: dark,
        name: 'name'
      }),
      tag: "p",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61,
        columnNumber: 13
      }
    }, 'Subtle'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Body"], {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        dark: dark,
        "var": 'var'
      }),
      tag: "p",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67,
        columnNumber: 13
      }
    }, "$".concat(variable)));
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (StatusExample);

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/Colors/index.tsx":
/*!*********************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/Colors/index.tsx ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Example__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Example */ "./app/javascript/components/VisualGuidelines/Colors/Example.tsx");
/* harmony import */ var _StatusExample__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StatusExample */ "./app/javascript/components/VisualGuidelines/Colors/StatusExample.tsx");
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./variables */ "./app/javascript/components/VisualGuidelines/Colors/variables.ts");
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/VisualGuidelines/Colors/index.tsx",
  _this = undefined;
/* eslint-disable flowtype/no-types-missing-file-annotation */

// React Pure component - do not use state!





var Colors = function Colors() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    marginBottom: "lg",
    size: 1,
    tag: "h1",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 5
    }
  }, 'Colors'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Example__WEBPACK_IMPORTED_MODULE_2__["default"], {
    colors: _variables__WEBPACK_IMPORTED_MODULE_4__["TEXT_COLORS"],
    title: "Text Colors",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Example__WEBPACK_IMPORTED_MODULE_2__["default"], {
    colors: _variables__WEBPACK_IMPORTED_MODULE_4__["BACKGROUND"],
    title: "Backgrounds",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Example__WEBPACK_IMPORTED_MODULE_2__["default"], {
    colors: _variables__WEBPACK_IMPORTED_MODULE_4__["CARDS"],
    title: "Cards",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_StatusExample__WEBPACK_IMPORTED_MODULE_3__["default"], {
    statusColors: _variables__WEBPACK_IMPORTED_MODULE_4__["STATUS"],
    subtleColors: _variables__WEBPACK_IMPORTED_MODULE_4__["STATUS_SUBTLE"],
    title: "Status",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Example__WEBPACK_IMPORTED_MODULE_2__["default"], {
    colors: _variables__WEBPACK_IMPORTED_MODULE_4__["DATA"],
    title: "Data",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Example__WEBPACK_IMPORTED_MODULE_2__["default"], {
    colors: _variables__WEBPACK_IMPORTED_MODULE_4__["ACTIONS"],
    title: "Actions",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Example__WEBPACK_IMPORTED_MODULE_2__["default"], {
    colors: _variables__WEBPACK_IMPORTED_MODULE_4__["ACTIVE"],
    title: "Active",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Example__WEBPACK_IMPORTED_MODULE_2__["default"], {
    colors: _variables__WEBPACK_IMPORTED_MODULE_4__["BORDER"],
    title: "Border",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Example__WEBPACK_IMPORTED_MODULE_2__["default"], {
    colors: _variables__WEBPACK_IMPORTED_MODULE_4__["SHADOW"],
    title: "Shadow",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Example__WEBPACK_IMPORTED_MODULE_2__["default"], {
    colors: _variables__WEBPACK_IMPORTED_MODULE_4__["PRODUCTS"],
    title: "Product Colors",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Example__WEBPACK_IMPORTED_MODULE_2__["default"], {
    colors: _variables__WEBPACK_IMPORTED_MODULE_4__["CATEGORY"],
    title: "Category Colors",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 5
    }
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (Colors);

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/Colors/variables.ts":
/*!************************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/Colors/variables.ts ***!
  \************************************************************************/
/*! exports provided: TEXT_COLORS, BACKGROUND, CARDS, STATUS, STATUS_SUBTLE, DATA, ACTIONS, ACTIVE, BORDER, SHADOW, PRODUCTS, CATEGORY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXT_COLORS", function() { return TEXT_COLORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BACKGROUND", function() { return BACKGROUND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CARDS", function() { return CARDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS", function() { return STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_SUBTLE", function() { return STATUS_SUBTLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATA", function() { return DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTIONS", function() { return ACTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTIVE", function() { return ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BORDER", function() { return BORDER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHADOW", function() { return SHADOW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PRODUCTS", function() { return PRODUCTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CATEGORY", function() { return CATEGORY; });
var TEXT_COLORS = [{
  name: 'Default',
  variable: 'text_lt_default'
}, {
  name: 'Light',
  variable: 'text_lt_light'
}, {
  name: 'Lighter',
  variable: 'text_lt_lighter'
}, {
  name: 'Default Dk',
  variable: 'text_dk_default',
  dark: true
}, {
  name: 'Light Dk',
  variable: 'text_dk_light',
  dark: true
}, {
  name: 'Lighter Dk',
  variable: 'text_dk_lighter',
  dark: true
}];
var BACKGROUND = [{
  name: "Bg Light",
  variable: "bg_light"
}, {
  name: "Bg Dark",
  variable: "bg_dark"
}, {
  name: "Bg Gradient",
  variable: "bg_gradient"
}];
var CARDS = [{
  name: "Card Light",
  variable: "card_light"
}, {
  name: "Card Dark",
  variable: "card_dark",
  dark: true
}];
var STATUS = [{
  name: "Success",
  variable: "success"
}, {
  name: "Warning",
  variable: "warning"
}, {
  name: "Error",
  variable: "error"
}, {
  name: "Info",
  variable: "info"
}, {
  name: "Neutral",
  variable: "neutral"
}];
var STATUS_SUBTLE = [{
  name: "Success Subtle",
  variable: "success_subtle"
}, {
  name: "Warning Subtle",
  variable: "warning_subtle"
}, {
  name: "Error Subtle",
  variable: "error_subtle"
}, {
  name: "Info Subtle",
  variable: "info_subtle"
}, {
  name: "Neutral Subtle",
  variable: "neutral_subtle"
}];
var DATA = [{
  name: "Data 1",
  variable: "data_1"
}, {
  name: "Data 2",
  variable: "data_2"
}, {
  name: "Data 3",
  variable: "data_3"
}, {
  name: "Data 4",
  variable: "data_4"
}, {
  name: "Data 5",
  variable: "data_5"
}, {
  name: "Data 6",
  variable: "data_6"
}, {
  name: "Data 7",
  variable: "data_7"
}, {
  name: "Data 8",
  variable: "data_8"
}];
var ACTIONS = [{
  name: "Primary",
  variable: "primary_action"
}];
var ACTIVE = [{
  name: "Active Light",
  variable: "active_light"
}, {
  name: "Active Dark",
  variable: "active_dark",
  dark: true
}];
var BORDER = [{
  name: "Border Light",
  variable: "border_light"
}, {
  name: "Border Dark",
  variable: "border_dark",
  dark: true
}];
var SHADOW = [{
  name: "Shadow",
  variable: "shadow"
}];
var PRODUCTS = [{
  name: "Product 1 Background",
  variable: "product_1_background"
}, {
  name: "Product 1 Highlight",
  variable: "product_1_highlight"
}, {
  name: "Product 2 Background",
  variable: "product_2_background"
}, {
  name: "Product 2 Highlight",
  variable: "product_2_highlight"
}, {
  name: "Product 3 Background",
  variable: "product_3_background"
}, {
  name: "Product 3 Highlight",
  variable: "product_3_highlight"
}, {
  name: "Product 4 Background",
  variable: "product_4_background"
}, {
  name: "Product 4 Highlight",
  variable: "product_4_highlight"
}, {
  name: "Product 5 Background",
  variable: "product_5_background"
}, {
  name: "Product 5 Highlight",
  variable: "product_5_highlight"
}, {
  name: "Product 6 Background",
  variable: "product_6_background"
}, {
  name: "Product 6 Highlight",
  variable: "product_6_highlight"
}, {
  name: "Product 7 Background",
  variable: "product_7_background"
}, {
  name: "Product 7 Highlight",
  variable: "product_7_highlight"
}, {
  name: "Product 8 Background",
  variable: "product_8_background"
}, {
  name: "Product 8 Highlight",
  variable: "product_8_highlight"
}, {
  name: "Product 9 Background",
  variable: "product_9_background"
}, {
  name: "Product 9 Highlight",
  variable: "product_9_highlight"
}, {
  name: "Product 10 Background",
  variable: "product_10_background"
}, {
  name: "Product 10 Highlight",
  variable: "product_10_highlight"
}];
var CATEGORY = [{
  name: "Category 1",
  variable: "category_1"
}, {
  name: "Category 2",
  variable: "category_2"
}, {
  name: "Category 3",
  variable: "category_3"
}, {
  name: "Category 4",
  variable: "category_4"
}, {
  name: "Category 5",
  variable: "category_5"
}, {
  name: "Category 6",
  variable: "category_6"
}, {
  name: "Category 7",
  variable: "category_7"
}, {
  name: "Category 8",
  variable: "category_8"
}, {
  name: "Category 9",
  variable: "category_9"
}, {
  name: "Category 10",
  variable: "category_10"
}, {
  name: "Category 11",
  variable: "category_11"
}, {
  name: "Category 12",
  variable: "category_12"
}, {
  name: "Category 13",
  variable: "category_13"
}, {
  name: "Category 14",
  variable: "category_14"
}, {
  name: "Category 15",
  variable: "category_15"
}, {
  name: "Category 16",
  variable: "category_16"
}, {
  name: "Category 17",
  variable: "category_17"
}, {
  name: "Category 18",
  variable: "category_18"
}, {
  name: "Category 19",
  variable: "category_19"
}, {
  name: "Category 20",
  variable: "category_20"
}, {
  name: "Category 21",
  variable: "category_21"
}];

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/Examples/BorderRadius.tsx":
/*!******************************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/Examples/BorderRadius.tsx ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Templates_Example__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Templates/Example */ "./app/javascript/components/VisualGuidelines/Templates/Example.tsx");
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/VisualGuidelines/Examples/BorderRadius.tsx",
  _this = undefined;



var TOKENS = {
  'Rounded': '$border_radius_rounded',
  'Extra Large': '$border_radius_xl',
  'Large': '$border_radius_lg',
  'Medium': '$border_radius_md',
  'Small': '$border_radius_sm',
  'Extra Small': '$border_radius_xs',
  'None': '$border_radius_none'
};
var DATASET = [{
  name: 'Rounded',
  "class": 'border_radius_rounded'
}, {
  name: 'Extra Large',
  "class": 'border_radius_xl'
}, {
  name: 'Large',
  "class": 'border_radius_lg'
}, {
  name: 'Medium',
  "class": 'border_radius_md'
}, {
  name: 'Small',
  "class": 'border_radius_sm'
}, {
  name: 'Extra Small',
  "class": 'border_radius_xs'
}, {
  name: 'None',
  "class": 'border_radius_none'
}];
var BorderRadius = function BorderRadius(_ref) {
  var tokensExample = _ref.tokensExample;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    size: 1,
    text: "Border Radius",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    marginBottom: "lg",
    marginTop: "xs",
    text: "We have very specific settings for border radius to keep the interface looking consistent and clean. If you ever need to access these to build new things here are examples for how to do that.",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Templates_Example__WEBPACK_IMPORTED_MODULE_2__["default"], {
    example: tokensExample,
    tokens: TOKENS,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    align: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    orientation: "row",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 7
    }
  }, DATASET.map(function (data) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "border_radius_container",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: data["class"],
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 13
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
      marginTop: "xs",
      size: 4,
      tag: "h4",
      text: data.name,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 56,
        columnNumber: 13
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
      size: "xs",
      text: "$".concat(data["class"]),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 13
      }
    }));
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (BorderRadius);

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/Examples/Cursor.tsx":
/*!************************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/Examples/Cursor.tsx ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Templates_Example__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Templates/Example */ "./app/javascript/components/VisualGuidelines/Templates/Example.tsx");
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/VisualGuidelines/Examples/Cursor.tsx",
  _this = undefined;



var CURSOR = ["auto", "default", "none", "contextMenu", "help", "pointer", "progress", "wait", "cell", "crosshair", "text", "verticalText", "alias", "copy", "move", "noDrop", "notAllowed", "grab", "grabbing", "eResize", "nResize", "neResize", "nwResize", "sResize", "seResize", "swResize", "wResize", "ewResize", "nsResize", "neswResize", "nwseResize", "colResize", "rowResize", "allScroll", "zoomIn", "zoomOut"];
var Cursor = function Cursor(_ref) {
  var example = _ref.example;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Templates_Example__WEBPACK_IMPORTED_MODULE_2__["default"], {
    example: example,
    globalProps: {
      cursor: CURSOR
    },
    title: "Cursor",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    marginTop: "md",
    padding: "none",
    rounded: true,
    shadow: "deeper",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Body, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    marginBottom: "xs",
    text: "Visual Guide",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    text: "Hover over any card below to display its cursor.",
    marginBottom: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    gap: "xxs",
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 11
    }
  }, CURSOR.map(function (cursor, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
      borderRadius: "none",
      padding: "xs",
      cursor: cursor,
      key: i,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 38,
        columnNumber: 22
      }
    }, cursor);
  }))))));
};
/* harmony default export */ __webpack_exports__["default"] = (Cursor);

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/Examples/Display.tsx":
/*!*************************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/Examples/Display.tsx ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Templates_Example__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Templates/Example */ "./app/javascript/components/VisualGuidelines/Templates/Example.tsx");
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/VisualGuidelines/Examples/Display.tsx",
  _this = undefined;



var screenSizeProps = {
  display: ['xs', 'sm', 'md', 'lg', 'xl']
};
var UTILITY_CLASSES = [{
  size: 'xs',
  media: '@media screen and (max-width: 575px)',
  "class": '.display_xs_hidden',
  properties: 'display: hidden !important'
}, {
  size: 'sm',
  media: '@media screen and (max-width: 576px)',
  "class": '.display_sm_block',
  properties: 'display: block !important'
}, {
  size: 'md',
  media: '@media screen and (max-width: 768px)',
  "class": '.display_md_inline_block',
  properties: 'display: inline-block !important'
}, {
  size: 'lg',
  media: '@media screen and (max-width: 992px)',
  "class": '.display_lg_inline',
  properties: 'display: inline !important'
}, {
  size: 'xl',
  media: '@media screen and (max-width: 1200px)',
  "class": '.display_xl_flex',
  properties: 'display: flex !important'
}];
var DISPLAY_VALUES = ['inline', 'flex', 'inline_flex', 'inline_block', 'block', 'none'];
var Display = function Display(_ref) {
  var example = _ref.example;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Templates_Example__WEBPACK_IMPORTED_MODULE_2__["default"], {
    example: example,
    globalProps: {
      display: DISPLAY_VALUES
    },
    screenSizes: screenSizeProps,
    title: "Display",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    size: 4,
    text: "Utility Classes",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    text: "Just want the raw classes? We got you. All of our global props are simple CSS utilities available through classes.",
    marginBottom: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    text: "Visual Guide",
    marginBottom: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Table"], {
    shadow: "deep",
    size: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 11
    }
  }, 'Screen Size'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 11
    }
  }, '@Media Screen'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 11
    }
  }, 'Class'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 11
    }
  }, 'Properties'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 7
    }
  }, UTILITY_CLASSES.map(function (utilityClass) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 13
      }
    }, utilityClass.size), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 65,
        columnNumber: 13
      }
    }, utilityClass.media), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 68,
        columnNumber: 13
      }
    }, utilityClass["class"]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 71,
        columnNumber: 13
      }
    }, utilityClass.properties));
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (Display);

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/Examples/FlexBox.tsx":
/*!*************************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/Examples/FlexBox.tsx ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Templates_Example__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Templates/Example */ "./app/javascript/components/VisualGuidelines/Templates/Example.tsx");
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/VisualGuidelines/Examples/FlexBox.tsx",
  _this = undefined;



var SCREEN_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];
var PROPS = {
  flexDirection: ['row', 'column', 'rowReverse', 'columnReverse'],
  flexWrap: ['wrap', 'nowrap', 'wrapReverse'],
  justifyContent: ['start', 'end', 'center', 'spaceBetween', 'spaceAround', 'spaceEvenly'],
  justifySelf: ['start', 'end', 'center', 'auto', 'stretch'],
  alignItems: ['flexStart', 'flexEnd', 'start', 'end', 'center', 'stretch', 'baseline'],
  alignContent: ['start', 'end', 'center', 'spaceBetween', 'spaceAround', 'spaceEvenly'],
  alignSelf: ['start', 'end', 'center', 'auto', 'stretch', 'baseline'],
  flex: ['none', 'initial', 'auto', '1'],
  flexGrow: ['0', '1'],
  flexShrink: ['0', '1'],
  order: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'none']
};
var TABLE_HEADERS = ['Props', 'Screen Sizes', 'Values'];
var buildPillElement = function buildPillElement(value, propName) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Pill"], {
    key: "".concat(propName, "-").concat(value),
    text: value,
    textTransform: "none",
    variant: "warning",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 3
    }
  });
};
var FlexBox = function FlexBox(_ref) {
  var example = _ref.example;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Templates_Example__WEBPACK_IMPORTED_MODULE_2__["default"], {
    example: example,
    customChildren: true,
    title: "Flex Box",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Table"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 9
    }
  }, TABLE_HEADERS.map(function (header, idx) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
      key: "".concat(header, "-").concat(idx),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41,
        columnNumber: 13
      }
    }, header);
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 7
    }
  }, Object.keys(PROPS).map(function (propName, idx) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
      key: "".concat(propName, "-").concat(idx),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 47,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 48,
        columnNumber: 13
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Pill"], {
      text: propName,
      textTransform: "none",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 15
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54,
        columnNumber: 13
      }
    }, SCREEN_SIZES.map(function (value) {
      return buildPillElement(value, propName);
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59,
        columnNumber: 13
      }
    }, PROPS[propName].map(function (value) {
      return buildPillElement(value, propName);
    })));
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (FlexBox);

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/Examples/Hover.tsx":
/*!***********************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/Examples/Hover.tsx ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Templates_Example__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Templates/Example */ "./app/javascript/components/VisualGuidelines/Templates/Example.tsx");
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/VisualGuidelines/Examples/Hover.tsx",
  _this = undefined;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var shadowArr = ['deep', 'deeper', 'deepest'];
var scaleObj = {
  'sm': '@1.05',
  'md': '@1.10',
  'lg': '@1.15'
};
var Hover = function Hover(_ref) {
  var example = _ref.example;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    marginBottom: "sm",
    size: 1,
    tag: "h1",
    text: "Hover",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    paddingBottom: "xxs",
    text: "Adding our hover prop is useful for easily customizing UI for kit interactions.",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    link: "https://codesandbox.io/s/playbook-global-hover-prop-example-forked-mhssmm?file=/src/App.js",
    newWindow: true,
    padding: "none",
    tabIndex: 0,
    variant: "link",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    variant: "link",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 7
    }
  }, 'See this prop in action in our sample UI', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    fixedWidth: true,
    icon: "angle-right",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 9
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    marginBottom: "xs",
    marginTop: "md",
    size: 4,
    tag: "h4",
    text: "Global Props",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    marginBottom: "md",
    text: "Available in every kit. These are added globally as they are most flexible when developing.",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Templates_Example__WEBPACK_IMPORTED_MODULE_2__["default"], {
    customChildren: true,
    example: example,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    paddingBottom: "sm",
    vertical: "stretch",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Body, {
    marginRight: "xl",
    paddingRight: "xl",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    marginBottom: "sm",
    text: "Props",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Pill"], {
    text: "hover",
    textTransform: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 11
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    marginBottom: "xs",
    marginLeft: "xl",
    marginTop: "md",
    orientation: "vertical",
    paddingLeft: "xl",
    variant: "card",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Table"], {
    container: false,
    dataTable: true,
    marginTop: "sm",
    marginX: "sm",
    size: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 15
    }
  }, 'options'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 15
    }
  }, 'values'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Pill"], {
    text: "background",
    textTransform: "none",
    variant: "warning",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 17
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Pill"], {
    text: "${color}",
    textTransform: "none",
    variant: "warning",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 17
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 121,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Pill"], {
    text: "shadow",
    textTransform: "none",
    variant: "warning",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 122,
      columnNumber: 17
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 128,
      columnNumber: 15
    }
  }, shadowArr.map(function (value) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Pill"], {
      key: value,
      text: value,
      textTransform: "none",
      variant: "warning",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 131,
        columnNumber: 21
      }
    });
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Pill"], {
    text: "scale",
    textTransform: "none",
    variant: "warning",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 143,
      columnNumber: 17
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 149,
      columnNumber: 15
    }
  }, Object.entries(scaleObj).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 1),
      key = _ref3[0];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Pill"], {
      key: key,
      text: key,
      textTransform: "none",
      variant: "warning",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 152,
        columnNumber: 21
      }
    });
  }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    marginTop: "md",
    shadow: "deep",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 167,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "column",
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 171,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    paddingBottom: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 175,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    text: "Visual Guide",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 176,
      columnNumber: 11
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 180,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    text: "Hover over any card below to view hover property.",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 181,
      columnNumber: 11
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    paddingY: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 185,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    gap: "sm",
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 186,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    hover: {
      background: 'success_subtle'
    },
    padding: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 190,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    text: "background color*",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 194,
      columnNumber: 15
    }
  })), shadowArr.map(function (value) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
      hover: {
        shadow: value
      },
      key: value,
      padding: "xs",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 200,
        columnNumber: 17
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
      text: "shadow ".concat(value),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 205,
        columnNumber: 19
      }
    }));
  }), Object.entries(scaleObj).map(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
      key = _ref5[0],
      value = _ref5[1];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
      hover: {
        scale: key
      },
      key: key,
      padding: "xs",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 213,
        columnNumber: 17
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
      align: "center",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 218,
        columnNumber: 19
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
      paddingRight: "xxs",
      text: "scale ".concat(key),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 219,
        columnNumber: 21
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
      size: "xs",
      text: value,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 223,
        columnNumber: 21
      }
    })));
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 233,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    size: "xs",
    text: "*background accepts any color token",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 234,
      columnNumber: 11
    }
  })))));
};
/* harmony default export */ __webpack_exports__["default"] = (Hover);

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/Examples/LineHeight.tsx":
/*!****************************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/Examples/LineHeight.tsx ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Templates_Example__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Templates/Example */ "./app/javascript/components/VisualGuidelines/Templates/Example.tsx");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/VisualGuidelines/Examples/LineHeight.tsx",
  _this = undefined;
/* eslint-disable flowtype/no-types-missing-file-annotation */




var HEIGHTS = ['tightest', 'tighter', 'tight', 'normal', 'loose', 'looser', 'loosest'];
var TOKENS = {
  '$lh_tightest': 'tightest',
  '$lh_tighter': 'tighter',
  '$lh_tight': 'tight',
  '$lh_normal': 'normal',
  '$lh_loose': 'loose',
  '$lh_looser': 'looser',
  '$lh_loosest': 'loosest'
};
var LineHeightDescription = function LineHeightDescription() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "Odds are you might want to build or expand upon the text patterns we have provided. If so below is a good reference of the tokens that are available for you and your typography needs. For articles we recommend pairing a \"medium\" width with \"loose\" line height. See our ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://playbook.powerapp.cloud/kits/body/react",
    target: "_blank",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 274
    }
  }, "Body Kit"), " for an example.");
};
var LineHeight = function LineHeight(_ref) {
  var example = _ref.example,
    tokensExample = _ref.tokensExample;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Templates_Example__WEBPACK_IMPORTED_MODULE_1__["default"], {
    description: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LineHeightDescription, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 21
      }
    }),
    example: example,
    globalProps: {
      lineHeight: HEIGHTS
    },
    title: "Line Height",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Templates_Example__WEBPACK_IMPORTED_MODULE_1__["default"], {
    example: tokensExample,
    tokens: TOKENS,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Layout"], {
    layout: "collection",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Layout"].Body, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 9
    }
  }, Object.keys(TOKENS).map(function (token) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Card"], {
      borderNone: true,
      key: "token-example-".concat(token),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Title"], {
      lineHeight: TOKENS[token],
      text: "The quick brown fox jumps over the lazy dog",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54,
        columnNumber: 13
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Caption"], {
      size: "xs",
      text: token,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 13
      }
    }));
  })))));
};
/* harmony default export */ __webpack_exports__["default"] = (LineHeight);

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/Examples/MaxWidth.tsx":
/*!**************************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/Examples/MaxWidth.tsx ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Templates_Example__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Templates/Example */ "./app/javascript/components/VisualGuidelines/Templates/Example.tsx");
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/VisualGuidelines/Examples/MaxWidth.tsx",
  _this = undefined;
/* eslint-disable flowtype/no-types-missing-file-annotation */




var SIZES = ['xs', 'sm', 'md', 'lg', 'xl']; //TODO: investigate using types

var MaxWidthDescription = function MaxWidthDescription() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "When building your interface it is common to add max width to specific kits so the interface looks good at all sizes. For articles we recommend pairing a \"medium\" width with \"loose\" line height. See our ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://playbook.powerapp.cloud/kits/body/react",
    target: "_blank",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 208
    }
  }, "Body Kit"), " for an example. We've made it easy to add max with ANY kit through our global props. See below:");
};
var MaxWidth = function MaxWidth(_ref) {
  var example = _ref.example;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Templates_Example__WEBPACK_IMPORTED_MODULE_2__["default"], {
    description: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MaxWidthDescription, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22,
        columnNumber: 20
      }
    }),
    example: example,
    globalProps: {
      maxWidth: SIZES
    },
    title: "Max Width",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 3
    }
  }, SIZES.map(function (size) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Background"], {
      backgroundColor: "gradient",
      key: size,
      marginBottom: "xs",
      maxWidth: size,
      padding: "xs",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 7
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
      dark: true,
      size: 4,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 37,
        columnNumber: 9
      }
    }, size.toUpperCase()));
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (MaxWidth);

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/Examples/NumberSpacing.tsx":
/*!*******************************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/Examples/NumberSpacing.tsx ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Templates_Example__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Templates/Example */ "./app/javascript/components/VisualGuidelines/Templates/Example.tsx");
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/VisualGuidelines/Examples/NumberSpacing.tsx",
  _this = undefined;
/* eslint-disable flowtype/no-types-missing-file-annotation */




var NUMBERS = ['$1,231,123,123.00', '$7,444,112,512.00'];
var NumberSpacing = function NumberSpacing(_ref) {
  var example = _ref.example;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Templates_Example__WEBPACK_IMPORTED_MODULE_2__["default"], {
    description: "When dealing with numbers it can be helpful to controll the way the font handles number spacing. A font like proxima nova is an open type face that enables us to use tabular spacing for example. This alligns the numbers equally to make those numbers in a table easier to compare. This is avaliable in EVERY kit as a global prop. See example:",
    example: example,
    globalProps: {
      numberSpacing: ['tabular']
    },
    title: "Number Spacing",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Table"], {
    size: "md",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 11
    }
  }, 'Normal'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 11
    }
  }, 'Tabular'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 7
    }
  }, NUMBERS.map(function (number) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
      key: number,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 32,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 33,
        columnNumber: 13
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
      text: number,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 15
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 38,
        columnNumber: 13
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
      numberSpacing: "tabular",
      text: number,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 15
      }
    })));
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (NumberSpacing);

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/Examples/Overflow.tsx":
/*!**************************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/Examples/Overflow.tsx ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Templates_Example__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Templates/Example */ "./app/javascript/components/VisualGuidelines/Templates/Example.tsx");
/* harmony import */ var _Templates_SpacingProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Templates/SpacingProps */ "./app/javascript/components/VisualGuidelines/Templates/SpacingProps.tsx");
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/VisualGuidelines/Examples/Overflow.tsx",
  _this = undefined;



var OVERFLOW = ["visible", "hidden", "scroll", "auto"];
var PROPNAMES = ['overflow', 'overflowX', 'overflowY'];
var TOKENS = {
  '$visible': 'visible',
  '$hidden': 'hidden',
  '$scroll': 'scroll',
  '$auto': 'auto'
};
var Overflow = function Overflow(_ref) {
  var example = _ref.example,
    tokensExample = _ref.tokensExample;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Templates_Example__WEBPACK_IMPORTED_MODULE_1__["default"], {
    description: "The Overflow prop allows you to specify if and how a container's contents are visible when they exceed (i.e., overflow) the container's borders.",
    example: example,
    title: "Overflow",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Templates_SpacingProps__WEBPACK_IMPORTED_MODULE_2__["default"], {
    propValues: OVERFLOW,
    propNames: PROPNAMES,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 5
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Templates_Example__WEBPACK_IMPORTED_MODULE_1__["default"], {
    example: tokensExample,
    tokens: TOKENS,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 5
    }
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (Overflow);

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/Examples/Position.tsx":
/*!**************************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/Examples/Position.tsx ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Templates_Example__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Templates/Example */ "./app/javascript/components/VisualGuidelines/Templates/Example.tsx");
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/VisualGuidelines/Examples/Position.tsx",
  _this = undefined;


var POSITION = ["relative", "absolute", "fixed", "sticky", "static"];
var TOKENS = {
  '$relative': 'relative',
  '$absolute': 'absolute',
  '$fixed': 'fixed',
  '$sticky': 'sticky',
  '$static': 'static'
};
var Position = function Position(_ref) {
  var example = _ref.example,
    tokensExample = _ref.tokensExample;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Templates_Example__WEBPACK_IMPORTED_MODULE_1__["default"], {
    description: "Specifying position can be useful for customizing page elements and layouts. The examples below demonstrate how you can apply (or override) position:",
    example: example,
    globalProps: {
      position: POSITION
    },
    title: "Position",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Templates_Example__WEBPACK_IMPORTED_MODULE_1__["default"], {
    example: tokensExample,
    tokens: TOKENS,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 5
    }
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (Position);

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/Examples/Shadows.tsx":
/*!*************************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/Examples/Shadows.tsx ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Templates_Example__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Templates/Example */ "./app/javascript/components/VisualGuidelines/Templates/Example.tsx");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/VisualGuidelines/Examples/Shadows.tsx",
  _this = undefined;



var SHADOW_VALUES = ["none", "deep", "deeper", "deepest"];
var TOKENS = {
  "$shadow_deep": "value: 0 4px 10px 0 rgb(60 106 172 / 16%)",
  "$shadow_deeper": "value: 0 12px 28px 0 rgb(60 106 172 / 18%)",
  "$shadow_deepest": "value: 0 30px 38px 4px rgb(60 106 172 / 20%), 0 2px 14px 4px rgb(60 106 172 / 10%)"
};
var Shadows = function Shadows(_ref) {
  var example = _ref.example,
    tokensExample = _ref.tokensExample;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Templates_Example__WEBPACK_IMPORTED_MODULE_1__["default"], {
    description: "Shadows are a nice way of showing depth. Modals, buttons, & popovers are examples of items that need to have a shadow to indicate their position relative to others. Our global props and tokens help you expand those to the other custom elements you build using playbook.",
    example: example,
    globalProps: {
      shadow: SHADOW_VALUES
    },
    title: "Shadows",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Templates_Example__WEBPACK_IMPORTED_MODULE_1__["default"], {
    example: tokensExample,
    tokens: TOKENS,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "shadow-wrapper",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 5
    }
  }, Object.keys(TOKENS).map(function (token, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Card"], {
      key: "token-example-".concat(token),
      marginX: "sm",
      marginY: "xl",
      padding: "none",
      shadow: SHADOW_VALUES[index + 1],
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Flex"], {
      align: "center",
      key: "token-example-".concat(token),
      shadow: TOKENS[token],
      spacing: "between",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42,
        columnNumber: 13
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Flex"], {
      align: "center",
      justfyContent: "center",
      wrap: true,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 48,
        columnNumber: 15
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["CircleIconButton"], {
      icon: "copy",
      paddingRight: "sm",
      variant: "link",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53,
        columnNumber: 17
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 17
      }
    }, token)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Flex"], {
      justify: "end",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 60,
        columnNumber: 15
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_2__["Caption"], {
      paddingRight: "xs",
      size: "xs",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61,
        columnNumber: 17
      }
    }, TOKENS[token]))));
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (Shadows);

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/Examples/Spacing.tsx":
/*!*************************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/Examples/Spacing.tsx ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Templates_Example__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Templates/Example */ "./app/javascript/components/VisualGuidelines/Templates/Example.tsx");
/* harmony import */ var _Templates_SpacingProps__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Templates/SpacingProps */ "./app/javascript/components/VisualGuidelines/Templates/SpacingProps.tsx");
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/VisualGuidelines/Examples/Spacing.tsx",
  _this = undefined;
/* eslint-disable flowtype/no-types-missing-file-annotation */





var PROPVALUES = ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'auto', 'initial', 'inherit'];
var PROPNAMES = ['margin', 'marginLeft', 'marginBottom', 'marginRight', 'marginTop', 'marginX', 'marginY', 'padding', 'paddingBottom', 'paddingTop', 'paddingLeft', 'paddingRight', 'paddingX', 'paddingY'];
var TOKENS = {
  'XX Small': 'space_xxs',
  'X Small': 'space_xs',
  'Small': 'space_sm',
  'Medium': 'space_md',
  'Large': 'space_lg',
  'X Large': 'space_xl'
};
var screenSizeProps = {
  display: ['xs', 'sm', 'md', 'lg', 'xl', 'default']
};
var Spacing = function Spacing(_ref) {
  var example = _ref.example,
    tokensExample = _ref.tokensExample;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Templates_Example__WEBPACK_IMPORTED_MODULE_2__["default"], {
    description: "Used for building Kits: Spacing is sized by 8px which serves as the starting point and base that all spacing options follow."
    // codesandboxExample
    ,
    example: example,
    screenSizes: screenSizeProps,
    title: "Spacing",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Templates_SpacingProps__WEBPACK_IMPORTED_MODULE_3__["default"], {
    propValues: PROPVALUES,
    propNames: PROPNAMES,
    screenSizes: screenSizeProps,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 7
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Templates_Example__WEBPACK_IMPORTED_MODULE_2__["default"], {
    example: tokensExample,
    tokens: TOKENS,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    justify: "evenly",
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 7
    }
  }, Object.keys(TOKENS).map(function (token) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
      key: token,
      orientation: "column",
      align: "center",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67,
        columnNumber: 13
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pb--tokens-spacing-token-example",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 68,
        columnNumber: 15
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pb--spacing_".concat(TOKENS[token]),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 69,
        columnNumber: 17
      }
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
      alignSelf: "center",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 72,
        columnNumber: 13
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
      text: token,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 73,
        columnNumber: 15
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
      alignSelf: "center",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 75,
        columnNumber: 13
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
      size: "xs",
      text: "$".concat(TOKENS[token]),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 76,
        columnNumber: 15
      }
    })));
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (Spacing);

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/Examples/TYPOGRAPHY_DATA.ts":
/*!********************************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/Examples/TYPOGRAPHY_DATA.ts ***!
  \********************************************************************************/
/*! exports provided: HEADINGSIZE, HEADINGS, TEXTDATA, SPACINGDATA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEADINGSIZE", function() { return HEADINGSIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEADINGS", function() { return HEADINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXTDATA", function() { return TEXTDATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPACINGDATA", function() { return SPACINGDATA; });
//data for headings
var HEADINGSIZE = ["48px", "34px", "28px", "16px"];
var HEADINGS = {
  $heading_1: "Heading 1",
  $heading_2: "Heading 2",
  $heading_3: "Heading 3",
  $heading_4: "Heading 4"
};

//data for text sizes
var TEXTDATA = [{
  name: "Text Jumbo",
  "class": "text_jumbo",
  text: "$text_jumbo",
  size: "36px"
}, {
  name: "Text Largest",
  "class": "text_largest",
  text: "$text_largest",
  size: "32px"
}, {
  name: "Text Larger",
  "class": "text_larger",
  text: "$text_larger",
  size: "28px"
}, {
  name: "Text Large",
  "class": "text_large",
  text: "$text_large",
  size: "20px"
}, {
  name: "Text Base",
  "class": "text_base",
  text: "$text_base",
  size: "16px"
}, {
  name: "Text Small",
  "class": "text_small",
  text: "$text_small",
  size: "14px"
}, {
  name: "Text Smaller",
  "class": "text_smaller",
  text: "$text_smaller",
  size: "12px"
}, {
  name: "Text Smallest",
  "class": "text_smallest",
  text: "$text_smallest",
  size: "11px"
}];

//Data for letter spacing
var SPACINGDATA = [{
  name: "Tightest",
  "class": "ls_tightest",
  text: "$lspace_tightest",
  value: "-0.1em"
}, {
  name: "Tighter",
  "class": "ls_tighter",
  text: "$lspace_tighter",
  value: "-0.07em"
}, {
  name: "Tight",
  "class": "ls_tight",
  text: "$lspace_tight",
  value: "-0.03em"
}, {
  name: "Normal",
  "class": "ls_normal",
  text: "$lspace_normal",
  value: "0"
}, {
  name: "Loose",
  "class": "ls_loos",
  text: "$lspace_loose",
  value: "0.03em"
}, {
  name: "Looser",
  "class": "ls_looser",
  text: "$lspace_looser",
  value: "0.07em"
}, {
  name: "Loosest",
  "class": "ls_loosest",
  text: "$lspace_loosest",
  value: "0.1em"
}, {
  name: "Super Loosest",
  "class": "ls_super_loosest",
  text: "$lspace_super_loosest",
  value: "0.2em"
}];

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/Examples/TextAlign.tsx":
/*!***************************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/Examples/TextAlign.tsx ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Templates_Example__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Templates/Example */ "./app/javascript/components/VisualGuidelines/Templates/Example.tsx");
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/VisualGuidelines/Examples/TextAlign.tsx",
  _this = undefined;
/* eslint-disable flowtype/no-types-missing-file-annotation */



var PROPVALUES = ['left', 'right', 'center', 'justify', 'justify-all', 'start', 'end', 'match-parent', 'initial', 'inherit'];
var screenSizeProps = {
  display: ['xs', 'sm', 'md', 'lg', 'xl']
};
var TextAlign = function TextAlign(_ref) {
  var example = _ref.example;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Templates_Example__WEBPACK_IMPORTED_MODULE_1__["default"], {
    example: example,
    globalProps: {
      textAlign: PROPVALUES
    },
    screenSizes: screenSizeProps,
    title: "Text Align",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 5
    }
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (TextAlign);

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/Examples/Typography.tsx":
/*!****************************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/Examples/Typography.tsx ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TYPOGRAPHY_DATA__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TYPOGRAPHY_DATA */ "./app/javascript/components/VisualGuidelines/Examples/TYPOGRAPHY_DATA.ts");
/* harmony import */ var _Templates_Example__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Templates/Example */ "./app/javascript/components/VisualGuidelines/Templates/Example.tsx");
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/VisualGuidelines/Examples/Typography.tsx",
  _this = undefined;




var Typography = function Typography(_ref) {
  var example = _ref.example,
    tokensExample = _ref.tokensExample;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Templates_Example__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: "Typography",
    description: "Odds are, you might want to build or expand upon the text patterns we have provided. Below are the tokens that are available for you and your typography needs.",
    example: example,
    customChildren: true,
    tokens: _TYPOGRAPHY_DATA__WEBPACK_IMPORTED_MODULE_2__["HEADINGS"],
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    margin: "md",
    text: "Headings",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    alignItems: "end",
    paddingBottom: "lg",
    paddingLeft: "md",
    paddingTop: "md",
    columnGap: "lg",
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 7
    }
  }, Object.keys(_TYPOGRAPHY_DATA__WEBPACK_IMPORTED_MODULE_2__["HEADINGS"]).map(function (heading, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
      orientation: "column",
      justifyContent: "between",
      key: "token-example-".concat(heading),
      alignItems: "center",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 43,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
      Typography: _TYPOGRAPHY_DATA__WEBPACK_IMPORTED_MODULE_2__["HEADINGS"][heading],
      text: _TYPOGRAPHY_DATA__WEBPACK_IMPORTED_MODULE_2__["HEADINGS"][heading],
      size: _TYPOGRAPHY_DATA__WEBPACK_IMPORTED_MODULE_2__["HEADINGS"][heading],
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 13
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
      size: "xs",
      text: _TYPOGRAPHY_DATA__WEBPACK_IMPORTED_MODULE_2__["HEADINGSIZE"][i],
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54,
        columnNumber: 13
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
      size: "xs",
      text: heading,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 13
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["CircleIconButton"], {
      icon: "copy",
      paddingRight: "sm",
      variant: "link",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 56,
        columnNumber: 13
      }
    }));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    marginTop: "xl",
    marginLeft: "md",
    text: "Text Size",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    alignItems: "end",
    paddingBottom: "lg",
    paddingLeft: "md",
    paddingTop: "md",
    columnGap: "lg",
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 7
    }
  }, _TYPOGRAPHY_DATA__WEBPACK_IMPORTED_MODULE_2__["TEXTDATA"].map(function (data) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
      orientation: "column",
      justifyContent: "between",
      key: "token-example-".concat(data.name),
      alignItems: "center",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 72,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: data["class"],
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 78,
        columnNumber: 13
      }
    }, data.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
      size: "xs",
      text: data.size,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 79,
        columnNumber: 13
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
      size: "xs",
      text: data.text,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 80,
        columnNumber: 13
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["CircleIconButton"], {
      icon: "copy",
      paddingRight: "sm",
      variant: "link",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 81,
        columnNumber: 13
      }
    }));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    marginTop: "xl",
    marginLeft: "md",
    text: "Letter Spacing",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    alignItems: "end",
    paddingBottom: "lg",
    paddingLeft: "md",
    paddingTop: "md",
    columnGap: "lg",
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 7
    }
  }, _TYPOGRAPHY_DATA__WEBPACK_IMPORTED_MODULE_2__["SPACINGDATA"].map(function (data) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
      orientation: "column",
      justifyContent: "between",
      key: "token-example-".concat(data.name),
      alignItems: "center",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 97,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: data["class"],
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 103,
        columnNumber: 13
      }
    }, data.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
      size: "xs",
      text: data.value,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 104,
        columnNumber: 13
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
      size: "xs",
      text: data.text,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 105,
        columnNumber: 13
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["CircleIconButton"], {
      icon: "copy",
      paddingRight: "sm",
      variant: "link",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 106,
        columnNumber: 13
      }
    }));
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (Typography);

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/Examples/ZIndex.tsx":
/*!************************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/Examples/ZIndex.tsx ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Templates_Example__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Templates/Example */ "./app/javascript/components/VisualGuidelines/Templates/Example.tsx");
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/VisualGuidelines/Examples/ZIndex.tsx",
  _this = undefined;



var ZINDEX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var TOKENS = {
  '$z_1': 100,
  '$z_2': 200,
  '$z_3': 300,
  '$z_4': 400,
  '$z_5': 500,
  '$z_6': 600,
  '$z_7': 700,
  '$z_8': 800,
  '$z_9': 900,
  '$z_10': 1000
};
var screenSizeProps = {
  display: ['xs', 'sm', 'md', 'lg', 'xl']
};
var UTILITY_CLASSES = [{
  size: 'xs',
  media: '@media screen and (max-width: $screen-xs-min)',
  "class": '.z_index_xs_{1-10}',
  properties: 'z_index: {100-1000} !important'
}, {
  size: 'sm',
  media: '@media screen and (max-width: $screen-sm-min)',
  "class": '.z_index_sm_{1-10}',
  properties: 'z_index: {100-1000} !important'
}, {
  size: 'md',
  media: '@media screen and (max-width: $screen-md-min)',
  "class": '.z_index_md_{1-10}',
  properties: 'z_index: {100-1000} !important'
}, {
  size: 'lg',
  media: '@media screen and (max-width: $screen-lg-min)',
  "class": '.z_index_lg_{1-10}',
  properties: 'z_index: {100-1000} !important'
}, {
  size: 'xl',
  media: '@media screen and (max-width: $screen-xl-min)',
  "class": '.z_index_xl_{1-10}',
  properties: 'z_index: {100-1000} !important'
}];
var globalPropsDescription = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, 'Available in every kit. These are added globally as they are most flexible when developing. *Screen sizes are optional.', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 42,
    columnNumber: 5
  }
}, 'NOTE: For best results, specify a position using the "position" global prop in conjunction with any "zIndex" prop calls.'));
var tokensDescription = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, 'Make your own styles using Playbook tokens to keep your site consistent.', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 49,
    columnNumber: 5
  }
}, 'NOTE: For best results, specify a position value using "position" tokens in conjunction with any "zIndex" style calls.'));
var ZIndex = function ZIndex(_ref) {
  var example = _ref.example,
    tokensExample = _ref.tokensExample;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Templates_Example__WEBPACK_IMPORTED_MODULE_2__["default"], {
    description: "If you're using Position, you might also find it useful to specify a z-index. We have multiple ways to use z-index, take a look at the examples below:",
    example: example,
    globalProps: {
      zIndex: ZINDEX
    },
    globalPropsDescription: globalPropsDescription,
    screenSizes: screenSizeProps,
    title: "Z-Index",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    marginTop: "sm",
    size: 4,
    text: "Utility Classes",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    text: "Just want the raw classes? We got you. All of our global props are simple CSS utilities available through classes.",
    marginBottom: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    text: "Visual Guide",
    marginBottom: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Table"], {
    shadow: "deep",
    size: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 11
    }
  }, 'Screen Size'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 11
    }
  }, '@Media Screen'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 11
    }
  }, 'Class'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 11
    }
  }, 'Properties'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 7
    }
  }, UTILITY_CLASSES.map(function (utilityClass) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 93,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 94,
        columnNumber: 13
      }
    }, utilityClass.size), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 97,
        columnNumber: 13
      }
    }, utilityClass.media), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 100,
        columnNumber: 13
      }
    }, utilityClass["class"]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 103,
        columnNumber: 13
      }
    }, utilityClass.properties));
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Templates_Example__WEBPACK_IMPORTED_MODULE_2__["default"], {
    example: tokensExample,
    tokens: TOKENS,
    tokensDescription: tokensDescription,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "zindex-wrapper",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 7
    }
  }, Object.keys(TOKENS).map(function (token) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
      className: "zIndex",
      key: "token-example-".concat(token),
      shadow: "deeper",
      zIndex: TOKENS[token] / 100,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 118,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 124,
        columnNumber: 13
      }
    }, token), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
      size: "md",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 125,
        columnNumber: 13
      }
    }, "value: ".concat(TOKENS[token])));
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (ZIndex);

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/Templates/Example.tsx":
/*!**************************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/Templates/Example.tsx ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PropsValues__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PropsValues */ "./app/javascript/components/VisualGuidelines/Templates/PropsValues.tsx");
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/VisualGuidelines/Templates/Example.tsx",
  _this = undefined;
/* eslint-disable react/no-danger */
/* eslint-disable flowtype/no-types-missing-file-annotation */




var Example = function Example(_ref) {
  var children = _ref.children,
    customChildren = _ref.customChildren,
    description = _ref.description,
    _ref$example = _ref.example,
    example = _ref$example === void 0 ? '' : _ref$example,
    globalProps = _ref.globalProps,
    _ref$globalPropsDescr = _ref.globalPropsDescription,
    globalPropsDescription = _ref$globalPropsDescr === void 0 ? '' : _ref$globalPropsDescr,
    screenSizes = _ref.screenSizes,
    title = _ref.title,
    tokens = _ref.tokens,
    _ref$tokensDescriptio = _ref.tokensDescription,
    tokensDescription = _ref$tokensDescriptio === void 0 ? '' : _ref$tokensDescriptio;
  var parser = new DOMParser(),
    parsedExample = parser.parseFromString(example, 'text/html'),
    exampleHtml = parsedExample.body.innerHTML,
    defaultGlobalPropsDescription = screenSizes ? 'Available in every kit. These are added globally as they are most flexible when developing. *Screen sizes are optional.' : 'Available in every kit. These are added globally as they are most flexible when developing.',
    defaultTokensDescription = 'Make your own styles using Playbook tokens to keep your site consistent.';
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: title === null || title === void 0 ? void 0 : title.replace(/\s+/g, ''),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 5
    }
  }, title && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    marginBottom: "xs",
    size: 1,
    tag: "h1",
    text: title,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 9
    }
  }), description && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    marginBottom: "lg",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 9
    }
  }, description), globalProps && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    marginBottom: "xs",
    marginTop: "sm",
    size: 4,
    tag: "h4",
    text: "Global Props",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    marginBottom: "lg",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 11
    }
  }, globalPropsDescription && globalPropsDescription, !globalPropsDescription && defaultGlobalPropsDescription)), tokens && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    marginBottom: "xs",
    marginTop: "lg",
    size: 4,
    tag: "h4",
    text: "Tokens",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    marginBottom: "lg",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 11
    }
  }, tokensDescription && tokensDescription, !tokensDescription && defaultTokensDescription)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    padding: "none",
    rounded: true,
    shadow: "deeper",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 7
    }
  }, children && !customChildren && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Body, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    marginBottom: "xs",
    text: "Visual Guide",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 15
    }
  }), children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    alignItems: "center",
    variant: "card",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 13
    }
  })), children && customChildren && children, globalProps && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PropsValues__WEBPACK_IMPORTED_MODULE_2__["default"], {
    globalProps: globalProps,
    screenSizes: screenSizes,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    background: "dark",
    className: "border_radius_flat",
    dark: true,
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 125,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    marginLeft: "md",
    paddingBottom: "none",
    paddingTop: "md",
    text: "EXAMPLE IN USE",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 131,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pb--codeCopy",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 137,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre", {
    className: "highlight pt_sm codeSnippetGuidelines",
    style: {
      margin: '0px'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 138,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    dangerouslySetInnerHTML: {
      __html: exampleHtml
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 15
    }
  }))))));
};
/* harmony default export */ __webpack_exports__["default"] = (Example);

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/Templates/PropsValues.tsx":
/*!******************************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/Templates/PropsValues.tsx ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/VisualGuidelines/Templates/PropsValues.tsx",
  _this = undefined;
/* eslint-disable flowtype/no-types-missing-file-annotation */
// React Pure component - do not use state!

// This template has sections Props, Values, and Example In Use space.
// This template does not have a Visual Guide section.



var PropsValues = function PropsValues(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    inline: "flex-container",
    justifyContent: "spaceBetween",
    orientation: "row",
    vertical: "stretch",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 5
    }
  }, Object.keys(props.globalProps).map(function (propKey) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
      key: propKey,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 24,
        columnNumber: 9
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
      flex: 1,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 25,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Body, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26,
        columnNumber: 13
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
      marginBottom: "sm",
      text: "Props",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27,
        columnNumber: 15
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Pill"], {
      text: propKey,
      textTransform: "none",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 31,
        columnNumber: 15
      }
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
      marginBottom: "md",
      marginTop: "md",
      orientation: "vertical",
      variant: "card",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 37,
        columnNumber: 11
      }
    }), props.screenSizes && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
      flex: 1,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 15
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Body, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 46,
        columnNumber: 17
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
      marginBottom: "sm",
      text: "Screen Size",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 47,
        columnNumber: 19
      }
    }), Object.values(props.screenSizes)[0].map(function (propValue) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Pill"], {
        key: "".concat(propKey, "-").concat(propValue),
        text: propValue,
        textTransform: "none",
        variant: "warning",
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52,
          columnNumber: 21
        }
      });
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
      marginBottom: "md",
      marginTop: "md",
      orientation: "vertical",
      variant: "card",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61,
        columnNumber: 15
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
      flex: 1,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 69,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Body, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 70,
        columnNumber: 13
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
      marginBottom: "sm",
      text: "Values",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 71,
        columnNumber: 15
      }
    }), Object.values(props.globalProps)[0].map(function (propValue) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Pill"], {
        key: "".concat(propKey, "-").concat(propValue),
        text: propValue,
        textTransform: "none",
        variant: "warning",
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76,
          columnNumber: 17
        }
      });
    }))));
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (PropsValues);

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/Templates/SpacingProps.tsx":
/*!*******************************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/Templates/SpacingProps.tsx ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/VisualGuidelines/Templates/SpacingProps.tsx",
  _this = undefined;
/* eslint-disable flowtype/no-types-missing-file-annotation */
// React Pure component - do not use state!

// This template is specifically for props section of the Spacing example.
// All other examples use PropsValues.tsx
// This template does not have a Visual Guide section.



var SpacingProps = function SpacingProps(_ref) {
  var propNames = _ref.propNames,
    propValues = _ref.propValues,
    screenSizes = _ref.screenSizes;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    inline: "flex-container",
    justifyContent: "center",
    orientation: "row",
    vertical: "stretch",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    flex: 1,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Body, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    marginBottom: "sm",
    text: "Props",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 11
    }
  }), propNames.map(function (prop) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Pill"], {
      key: prop,
      text: prop,
      marginRight: "xs",
      textTransform: "none",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 13
      }
    });
  }))), screenSizes ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    marginBottom: "md",
    marginTop: "md",
    orientation: "vertical",
    variant: "card",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    flex: 1,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Body, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    marginBottom: "sm",
    text: "Screen Size",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 15
    }
  }), Object.values(screenSizes)[0].map(function (value) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Pill"], {
      key: value,
      text: value,
      marginRight: "xs",
      textTransform: "none",
      variant: "warning",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 17
      }
    });
  })))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    marginBottom: "md",
    marginTop: "md",
    orientation: "vertical",
    variant: "card",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    flex: 1,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Body, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    marginBottom: "sm",
    text: "Values",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 11
    }
  }), propValues.map(function (value) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Pill"], {
      key: value,
      text: value,
      marginRight: "xs",
      textTransform: "none",
      variant: "warning",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 80,
        columnNumber: 13
      }
    });
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (SpacingProps);

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/index.tsx":
/*!**************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/index.tsx ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VisualGuidelines_Colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VisualGuidelines/Colors */ "./app/javascript/components/VisualGuidelines/Colors/index.tsx");
/* harmony import */ var _VisualGuidelines_Examples_MaxWidth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../VisualGuidelines/Examples/MaxWidth */ "./app/javascript/components/VisualGuidelines/Examples/MaxWidth.tsx");
/* harmony import */ var _VisualGuidelines_Examples_ZIndex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../VisualGuidelines/Examples/ZIndex */ "./app/javascript/components/VisualGuidelines/Examples/ZIndex.tsx");
/* harmony import */ var _VisualGuidelines_Examples_LineHeight__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../VisualGuidelines/Examples/LineHeight */ "./app/javascript/components/VisualGuidelines/Examples/LineHeight.tsx");
/* harmony import */ var _VisualGuidelines_Examples_NumberSpacing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../VisualGuidelines/Examples/NumberSpacing */ "./app/javascript/components/VisualGuidelines/Examples/NumberSpacing.tsx");
/* harmony import */ var _VisualGuidelines_Examples_Shadows__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../VisualGuidelines/Examples/Shadows */ "./app/javascript/components/VisualGuidelines/Examples/Shadows.tsx");
/* harmony import */ var _VisualGuidelines_Examples_Spacing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../VisualGuidelines/Examples/Spacing */ "./app/javascript/components/VisualGuidelines/Examples/Spacing.tsx");
/* harmony import */ var _VisualGuidelines_Examples_BorderRadius__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../VisualGuidelines/Examples/BorderRadius */ "./app/javascript/components/VisualGuidelines/Examples/BorderRadius.tsx");
/* harmony import */ var _VisualGuidelines_Examples_Typography__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../VisualGuidelines/Examples/Typography */ "./app/javascript/components/VisualGuidelines/Examples/Typography.tsx");
/* harmony import */ var _VisualGuidelines_Examples_Display__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../VisualGuidelines/Examples/Display */ "./app/javascript/components/VisualGuidelines/Examples/Display.tsx");
/* harmony import */ var _VisualGuidelines_Examples_Cursor__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../VisualGuidelines/Examples/Cursor */ "./app/javascript/components/VisualGuidelines/Examples/Cursor.tsx");
/* harmony import */ var _VisualGuidelines_Examples_FlexBox__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../VisualGuidelines/Examples/FlexBox */ "./app/javascript/components/VisualGuidelines/Examples/FlexBox.tsx");
/* harmony import */ var _VisualGuidelines_Examples_Position__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../VisualGuidelines/Examples/Position */ "./app/javascript/components/VisualGuidelines/Examples/Position.tsx");
/* harmony import */ var _VisualGuidelines_Examples_Hover__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../VisualGuidelines/Examples/Hover */ "./app/javascript/components/VisualGuidelines/Examples/Hover.tsx");
/* harmony import */ var _VisualGuidelines_Examples_TextAlign__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../VisualGuidelines/Examples/TextAlign */ "./app/javascript/components/VisualGuidelines/Examples/TextAlign.tsx");
/* harmony import */ var _Examples_Overflow__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Examples/Overflow */ "./app/javascript/components/VisualGuidelines/Examples/Overflow.tsx");
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/VisualGuidelines/index.tsx",
  _this = undefined;
/* eslint-disable flowtype/no-types-missing-file-annotation */

// React Pure component - do not use state!

















var VisualGuidelines = function VisualGuidelines(_ref) {
  var examples = _ref.examples;
  var urlPath = window.location.pathname;
  var regex = /(?:(?:[^/]*\/){2})(.*)/;
  var result = urlPath.match(regex)[1];
  function getComponent(result) {
    switch (result) {
      case "colors":
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_VisualGuidelines_Colors__WEBPACK_IMPORTED_MODULE_1__["default"], {
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 36,
            columnNumber: 16
          }
        });
      case "max_width":
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_VisualGuidelines_Examples_MaxWidth__WEBPACK_IMPORTED_MODULE_2__["default"], {
          example: examples.width_jsx,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 38,
            columnNumber: 16
          }
        });
      case "z_index":
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_VisualGuidelines_Examples_ZIndex__WEBPACK_IMPORTED_MODULE_3__["default"], {
          example: examples.z_index_jsx,
          tokensExample: examples.z_index_token,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 40,
            columnNumber: 16
          }
        });
      case "line_height":
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_VisualGuidelines_Examples_LineHeight__WEBPACK_IMPORTED_MODULE_4__["default"], {
          example: examples.line_height_code_jsx,
          tokensExample: examples.line_height_jsx,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 44,
            columnNumber: 16
          }
        });
      case "number_spacing":
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_VisualGuidelines_Examples_NumberSpacing__WEBPACK_IMPORTED_MODULE_5__["default"], {
          example: examples.number_spacing_jsx,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 48,
            columnNumber: 16
          }
        });
      case "shadows":
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_VisualGuidelines_Examples_Shadows__WEBPACK_IMPORTED_MODULE_6__["default"], {
          example: examples.shadow_in_use_jsx,
          tokensExample: examples.shadow_erb,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 50,
            columnNumber: 16
          }
        });
      case "spacing":
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_VisualGuidelines_Examples_Spacing__WEBPACK_IMPORTED_MODULE_7__["default"], {
          example: examples.spacing_global_props_jsx,
          tokensExample: examples.spacing_tokens_jsx,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 54,
            columnNumber: 16
          }
        });
      case "typography":
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_VisualGuidelines_Examples_Typography__WEBPACK_IMPORTED_MODULE_9__["default"], {
          example: examples.typography_tokens,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 59,
            columnNumber: 16
          }
        });
      case "border_radius":
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_VisualGuidelines_Examples_BorderRadius__WEBPACK_IMPORTED_MODULE_8__["default"], {
          tokensExample: examples.border_radius_tokens,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 61,
            columnNumber: 16
          }
        });
      case "display":
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_VisualGuidelines_Examples_Display__WEBPACK_IMPORTED_MODULE_10__["default"], {
          example: examples.display_in_use_jsx,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 63,
            columnNumber: 16
          }
        });
      case "cursor":
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_VisualGuidelines_Examples_Cursor__WEBPACK_IMPORTED_MODULE_11__["default"], {
          example: examples.cursor_jsx,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 65,
            columnNumber: 16
          }
        });
      case "flex_box":
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_VisualGuidelines_Examples_FlexBox__WEBPACK_IMPORTED_MODULE_12__["default"], {
          example: examples.justify_self_jsx,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 67,
            columnNumber: 16
          }
        });
      case "position":
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_VisualGuidelines_Examples_Position__WEBPACK_IMPORTED_MODULE_13__["default"], {
          example: examples.position_jsx,
          tokensExample: examples.position_token,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 69,
            columnNumber: 16
          }
        });
      case "hover":
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_VisualGuidelines_Examples_Hover__WEBPACK_IMPORTED_MODULE_14__["default"], {
          example: examples.hover_jsx,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 73,
            columnNumber: 16
          }
        });
      case "text_align":
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_VisualGuidelines_Examples_TextAlign__WEBPACK_IMPORTED_MODULE_15__["default"], {
          example: examples.text_align_jsx,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 75,
            columnNumber: 16
          }
        });
      case "overflow":
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Examples_Overflow__WEBPACK_IMPORTED_MODULE_16__["default"], {
          example: examples.overflow_jsx,
          tokensExample: examples.overflow_token,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 77,
            columnNumber: 18
          }
        });
      default:
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_VisualGuidelines_Colors__WEBPACK_IMPORTED_MODULE_1__["default"], {
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 82,
            columnNumber: 16
          }
        });
    }
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "visual_guidelines_individual",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 10
    }
  }, getComponent(result));
};
/* harmony default export */ __webpack_exports__["default"] = (VisualGuidelines);

/***/ }),

/***/ "./app/javascript/components/VisualGuidelines/types.ts":
/*!*************************************************************!*\
  !*** ./app/javascript/components/VisualGuidelines/types.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./app/javascript/packs/visual_guidelines.js":
/*!***************************************************!*\
  !*** ./app/javascript/packs/visual_guidelines.js ***!
  \***************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webpacker_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpacker-react */ "../node_modules/webpacker-react/index.js");
/* harmony import */ var webpacker_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpacker_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_VisualGuidelines__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/VisualGuidelines */ "./app/javascript/components/VisualGuidelines/index.tsx");


webpacker_react__WEBPACK_IMPORTED_MODULE_0___default.a.setup({
  VisualGuidelines: _components_VisualGuidelines__WEBPACK_IMPORTED_MODULE_1__["default"]
});

/***/ })

},[["./app/javascript/packs/visual_guidelines.js","runtime","vendors~application~main_sidebar~react_sidebar~samples~site~visual_guidelines","vendors~application~main_sidebar~react_sidebar~samples~visual_guidelines","application~main_sidebar~react_sidebar~samples~visual_guidelines"]]]);
//# sourceMappingURL=visual_guidelines-df2a869b09d7395e6c64.chunk.js.map