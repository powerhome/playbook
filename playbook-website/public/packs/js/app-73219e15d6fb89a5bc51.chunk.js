(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app"],{

/***/ "./app/javascript/components/App.jsx":
/*!*******************************************!*\
  !*** ./app/javascript/components/App.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ../node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/jasper.furniss/playbook/playbook-website/app/javascript/components/App.jsx: Support for the experimental syntax 'decorators' isn't currently enabled (20:13):\n\n  18 |   return (\n  19 |     <MainSidebar\n> 20 |       kits={@kits}\n     |             ^\n  21 |     />\n  22 |   )\n  23 | }\n\nAdd @babel/plugin-proposal-decorators (https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-decorators) to the 'plugins' section of your Babel config to enable transformation.\nIf you want to leave it as-is, add @babel/plugin-syntax-decorators (https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-decorators) to the 'plugins' section to enable parsing.\n    at instantiate (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:67:32)\n    at constructor (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:364:12)\n    at FlowParserMixin.raise (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:3363:19)\n    at FlowParserMixin.expectOnePlugin (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:3412:18)\n    at FlowParserMixin.parseDecorator (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:13160:10)\n    at FlowParserMixin.parseDecorators (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:13141:28)\n    at FlowParserMixin.parseExprAtom (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:11480:27)\n    at FlowParserMixin.parseExprAtom (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:7236:20)\n    at FlowParserMixin.parseExprSubscripts (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:11182:23)\n    at FlowParserMixin.parseUpdate (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:11164:21)\n    at FlowParserMixin.parseMaybeUnary (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:11138:23)\n    at FlowParserMixin.parseMaybeUnaryOrPrivate (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10967:61)\n    at FlowParserMixin.parseExprOps (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10973:23)\n    at FlowParserMixin.parseMaybeConditional (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10948:23)\n    at FlowParserMixin.parseMaybeAssign (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10906:21)\n    at FlowParserMixin.parseMaybeAssign (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:6028:18)\n    at FlowParserMixin.parseExpressionBase (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10856:23)\n    at /Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10851:39\n    at FlowParserMixin.allowInAnd (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:12651:12)\n    at FlowParserMixin.parseExpression (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10851:17)\n    at FlowParserMixin.jsxParseExpressionContainer (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:7090:31)\n    at FlowParserMixin.jsxParseAttributeValue (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:7055:21)\n    at FlowParserMixin.jsxParseAttribute (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:7112:38)\n    at FlowParserMixin.jsxParseOpeningElementAfterName (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:7127:28)\n    at FlowParserMixin.jsxParseOpeningElementAt (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:7122:17)\n    at FlowParserMixin.jsxParseElementAt (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:7148:33)\n    at FlowParserMixin.jsxParseElement (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:7218:17)\n    at FlowParserMixin.parseExprAtom (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:7231:19)\n    at FlowParserMixin.parseExprSubscripts (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:11182:23)\n    at FlowParserMixin.parseUpdate (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:11164:21)\n    at FlowParserMixin.parseMaybeUnary (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:11138:23)\n    at FlowParserMixin.parseMaybeUnaryOrPrivate (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10967:61)\n    at FlowParserMixin.parseExprOps (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10973:23)\n    at FlowParserMixin.parseMaybeConditional (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10948:23)\n    at FlowParserMixin.parseMaybeAssign (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10906:21)\n    at /Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:5965:39\n    at FlowParserMixin.tryParse (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:3766:20)\n    at FlowParserMixin.parseMaybeAssign (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:5965:18)\n    at /Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10874:39\n    at FlowParserMixin.allowInAnd (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:12651:12)\n    at FlowParserMixin.parseMaybeAssignAllowIn (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10874:17)\n    at FlowParserMixin.parseParenAndDistinguishExpression (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:11828:28)\n    at FlowParserMixin.parseParenAndDistinguishExpression (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:6077:18)\n    at FlowParserMixin.parseExprAtom (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:11457:23)\n    at FlowParserMixin.parseExprAtom (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:7236:20)\n    at FlowParserMixin.parseExprSubscripts (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:11182:23)\n    at FlowParserMixin.parseUpdate (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:11164:21)\n    at FlowParserMixin.parseMaybeUnary (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:11138:23)\n    at FlowParserMixin.parseMaybeUnaryOrPrivate (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10967:61)\n    at FlowParserMixin.parseExprOps (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10973:23)");

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
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_App__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fortawesome_fontawesome_pro_js_fontawesome_min_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/fontawesome-pro/js/fontawesome.min.js */ "../node_modules/@fortawesome/fontawesome-pro/js/fontawesome.min.js");
/* harmony import */ var _fortawesome_fontawesome_pro_js_fontawesome_min_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_pro_js_fontawesome_min_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _fortawesome_fontawesome_pro_js_regular_min_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/fontawesome-pro/js/regular.min.js */ "../node_modules/@fortawesome/fontawesome-pro/js/regular.min.js");
/* harmony import */ var _fortawesome_fontawesome_pro_js_regular_min_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_pro_js_regular_min_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _site_styles_main_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../site_styles/main.scss */ "./app/javascript/site_styles/main.scss");
/* harmony import */ var _site_styles_main_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_site_styles_main_scss__WEBPACK_IMPORTED_MODULE_5__);
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/packs/app.js";







var rootElement = document.getElementById("root");
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["StrictMode"], {
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 12,
    columnNumber: 3
  }
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_App__WEBPACK_IMPORTED_MODULE_2___default.a, {
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 13,
    columnNumber: 5
  }
})), rootElement);

/***/ })

},[["./app/javascript/packs/app.js","runtime","vendors~app~application~main_sidebar~samples~visual_guidelines","vendors~app~application","app~application"]]]);
//# sourceMappingURL=app-73219e15d6fb89a5bc51.chunk.js.map