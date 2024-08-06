(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app"],{

/***/ "./app/javascript/components/App.jsx":
/*!*******************************************!*\
  !*** ./app/javascript/components/App.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ../node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/jasper.furniss/playbook/playbook-website/app/javascript/components/App.jsx: Unexpected token (17:2)\n\n  15 |         search_list= {search_list()}\n  16 |         samples={SAMPLES}\n> 17 |   );\n     |   ^\n  18 | }\n  19 |\n  20 | export default App;\n    at instantiate (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:67:32)\n    at constructor (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:364:12)\n    at FlowParserMixin.raise (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:3363:19)\n    at FlowParserMixin.unexpected (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:3396:16)\n    at FlowParserMixin.jsxParseIdentifier (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:7017:12)\n    at FlowParserMixin.jsxParseNamespacedName (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:7025:23)\n    at FlowParserMixin.jsxParseAttribute (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:7111:22)\n    at FlowParserMixin.jsxParseOpeningElementAfterName (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:7127:28)\n    at FlowParserMixin.jsxParseOpeningElementAt (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:7122:17)\n    at FlowParserMixin.jsxParseElementAt (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:7148:33)\n    at FlowParserMixin.jsxParseElement (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:7218:17)\n    at FlowParserMixin.parseExprAtom (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:7231:19)\n    at FlowParserMixin.parseExprSubscripts (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:11182:23)\n    at FlowParserMixin.parseUpdate (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:11164:21)\n    at FlowParserMixin.parseMaybeUnary (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:11138:23)\n    at FlowParserMixin.parseMaybeUnaryOrPrivate (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10967:61)\n    at FlowParserMixin.parseExprOps (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10973:23)\n    at FlowParserMixin.parseMaybeConditional (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10948:23)\n    at FlowParserMixin.parseMaybeAssign (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10906:21)\n    at /Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:5965:39\n    at FlowParserMixin.tryParse (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:3766:20)\n    at FlowParserMixin.parseMaybeAssign (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:5965:18)\n    at /Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10874:39\n    at FlowParserMixin.allowInAnd (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:12651:12)\n    at FlowParserMixin.parseMaybeAssignAllowIn (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10874:17)\n    at FlowParserMixin.parseParenAndDistinguishExpression (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:11828:28)\n    at FlowParserMixin.parseParenAndDistinguishExpression (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:6077:18)\n    at FlowParserMixin.parseExprAtom (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:11457:23)\n    at FlowParserMixin.parseExprAtom (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:7236:20)\n    at FlowParserMixin.parseExprSubscripts (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:11182:23)\n    at FlowParserMixin.parseUpdate (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:11164:21)\n    at FlowParserMixin.parseMaybeUnary (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:11138:23)\n    at FlowParserMixin.parseMaybeUnaryOrPrivate (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10967:61)\n    at FlowParserMixin.parseExprOps (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10973:23)\n    at FlowParserMixin.parseMaybeConditional (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10948:23)\n    at FlowParserMixin.parseMaybeAssign (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10906:21)\n    at FlowParserMixin.parseMaybeAssign (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:6028:18)\n    at FlowParserMixin.parseExpressionBase (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10856:23)\n    at /Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10851:39\n    at FlowParserMixin.allowInAnd (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:12646:16)\n    at FlowParserMixin.parseExpression (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10851:17)\n    at FlowParserMixin.parseReturnStatement (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:13364:28)\n    at FlowParserMixin.parseStatementContent (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:13003:21)\n    at FlowParserMixin.parseStatementLike (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:12963:17)\n    at FlowParserMixin.parseStatementLike (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:5307:24)\n    at FlowParserMixin.parseStatementListItem (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:12948:17)\n    at FlowParserMixin.parseBlockOrModuleBlockBody (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:13569:61)\n    at FlowParserMixin.parseBlockBody (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:13561:10)\n    at FlowParserMixin.parseBlock (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:13549:10)\n    at FlowParserMixin.parseFunctionBody (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:12298:24)");

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
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/packs/app.js";




var rootElement = document.getElementById("root");
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["StrictMode"], {
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 9,
    columnNumber: 3
  }
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_App__WEBPACK_IMPORTED_MODULE_2___default.a, {
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 10,
    columnNumber: 5
  }
})), rootElement);

/***/ })

},[["./app/javascript/packs/app.js","runtime","vendors~app~application~main_sidebar~samples~visual_guidelines"]]]);
//# sourceMappingURL=app-9ae57d5c216b7da20ada.chunk.js.map