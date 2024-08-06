(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app"],{

/***/ "./app/javascript/components/App.jsx":
/*!*******************************************!*\
  !*** ./app/javascript/components/App.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ../node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/jasper.furniss/playbook/playbook-website/app/javascript/components/App.jsx: Identifier 'kits' has already been declared. (8:2)\n\n   6 |\n   7 | function App({\n>  8 |   kits,\n     |   ^\n   9 |   kit\n  10 | }) {\n  11 |   const [kits, setKits] = useState([])\n    at instantiate (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:67:32)\n    at constructor (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:364:12)\n    at FlowParserMixin.raise (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:3363:19)\n    at FlowScopeHandler.checkRedeclarationInScope (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:1587:19)\n    at FlowScopeHandler.declareName (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:1570:14)\n    at FlowScopeHandler.declareName (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:1657:11)\n    at FlowParserMixin.declareNameFromIdentifier (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10767:16)\n    at FlowParserMixin.checkIdentifier (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10763:12)\n    at FlowParserMixin.checkLVal (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10697:12)\n    at FlowParserMixin.checkLVal (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10732:14)\n    at FlowParserMixin.checkLVal (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:10732:14)\n    at FlowParserMixin.checkParams (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:12338:12)\n    at FlowParserMixin.checkParams (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:6074:18)\n    at FlowParserMixin.<anonymous> (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:12311:14)\n    at FlowParserMixin.parseBlockOrModuleBlockBody (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:13586:23)\n    at FlowParserMixin.parseBlockBody (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:13561:10)\n    at FlowParserMixin.parseBlock (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:13549:10)\n    at FlowParserMixin.parseFunctionBody (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:12298:24)\n    at FlowParserMixin.parseFunctionBody (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:5282:18)\n    at FlowParserMixin.parseFunctionBodyAndFinish (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:12282:10)\n    at FlowParserMixin.parseFunctionBodyAndFinish (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:5291:18)\n    at /Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:13712:12\n    at FlowParserMixin.withSmartMixTopicForbiddingContext (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:12628:14)\n    at FlowParserMixin.parseFunction (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:13711:10)\n    at FlowParserMixin.parseFunctionStatement (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:13342:17)\n    at FlowParserMixin.parseStatementContent (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:12996:21)\n    at FlowParserMixin.parseStatementLike (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:12963:17)\n    at FlowParserMixin.parseStatementLike (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:5307:24)\n    at FlowParserMixin.parseModuleItem (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:12944:17)\n    at FlowParserMixin.parseBlockOrModuleBlockBody (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:13569:36)\n    at FlowParserMixin.parseBlockBody (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:13561:10)\n    at FlowParserMixin.parseProgram (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:12853:10)\n    at FlowParserMixin.parseTopLevel (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:12843:25)\n    at FlowParserMixin.parseTopLevel (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:6172:28)\n    at FlowParserMixin.parse (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:14751:10)\n    at parse (/Users/jasper.furniss/playbook/node_modules/@babel/parser/lib/index.js:14793:38)\n    at parser (/Users/jasper.furniss/playbook/node_modules/@babel/core/lib/parser/index.js:41:34)\n    at parser.next (<anonymous>)\n    at normalizeFile (/Users/jasper.furniss/playbook/node_modules/@babel/core/lib/transformation/normalize-file.js:65:38)\n    at normalizeFile.next (<anonymous>)\n    at run (/Users/jasper.furniss/playbook/node_modules/@babel/core/lib/transformation/index.js:21:50)\n    at run.next (<anonymous>)\n    at transform (/Users/jasper.furniss/playbook/node_modules/@babel/core/lib/transform.js:22:41)\n    at transform.next (<anonymous>)\n    at step (/Users/jasper.furniss/playbook/node_modules/gensync/index.js:261:32)\n    at /Users/jasper.furniss/playbook/node_modules/gensync/index.js:273:13\n    at async.call.result.err.err (/Users/jasper.furniss/playbook/node_modules/gensync/index.js:223:11)\n    at /Users/jasper.furniss/playbook/node_modules/gensync/index.js:189:28\n    at /Users/jasper.furniss/playbook/node_modules/@babel/core/lib/gensync-utils/async.js:68:7\n    at /Users/jasper.furniss/playbook/node_modules/gensync/index.js:113:33");

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
//# sourceMappingURL=app-ea60454038f8dab1c5f3.chunk.js.map