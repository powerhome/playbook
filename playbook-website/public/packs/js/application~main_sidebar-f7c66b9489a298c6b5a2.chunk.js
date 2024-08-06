(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["application~main_sidebar"],{

/***/ "./app/javascript/components/MainSidebar/NestedNavItems.tsx":
/*!******************************************************************!*\
  !*** ./app/javascript/components/MainSidebar/NestedNavItems.tsx ***!
  \******************************************************************/
/*! exports provided: renderNavItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderNavItem", function() { return renderNavItem; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utilities_website_sidebar_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utilities/website_sidebar_helper */ "./app/javascript/utilities/website_sidebar_helper.ts");
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/MainSidebar/NestedNavItems.tsx",
  _this = undefined;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var currentURL = window.location.pathname + window.location.search;
var renderNavItem = function renderNavItem(link, i, collapsibles, category, type, dark, kit, isActive, setIsActive) {
  var _collapsibles$i = _slicedToArray(collapsibles[i], 1),
    collapsed = _collapsibles$i[0];
  //set up custom toggling
  var handleMainClick = function handleMainClick(index, categoryKey) {
    collapsibles.forEach(function (_ref, idx) {
      var _ref2 = _slicedToArray(_ref, 3),
        setCollapsed = _ref2[2];
      setIsActive(function () {
        var newIsActive = {};
        newIsActive["".concat(categoryKey, "-").concat(index)] = true;
        return newIsActive;
      });
      if (idx === index) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    });
    //return true at end to disable default collapsible behavior
    return true;
  };

  //click on nested items
  var handleSubItemClick = function handleSubItemClick(i, sublink) {
    setIsActive(function () {
      var newIsActive = {};
      newIsActive["".concat(sublink, "-").concat(i)] = true;
      return newIsActive;
    });
  };

  //click on non-collapsible navitem click
  var handleNonCollapseLinkClick = function handleNonCollapseLinkClick(link) {
    setIsActive(function () {
      var newIsActive = {};
      newIsActive[link] = true;
      return newIsActive;
    });
  };
  var generateLink = function generateLink(categoryKey, sublink, type) {
    if (sublink) {
      var _link = "/kits/".concat(sublink, "/").concat(type);
      return currentURL === _link ? "" : _link;
    } else {
      var _link2 = "/kit_category/".concat(categoryKey, "?type=").concat(type);
      return currentURL === _link2 ? "" : _link2;
    }
  };
  if (typeof link === "object") {
    //useState for handling collapsed state
    var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      toggleNav = _useState2[0],
      setToggleNav = _useState2[1];
    //useEffect to handle toggle to consolidate logic
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
      setToggleNav(isActiveCategory || hasActiveSublink ? false : collapsed);
    }, [collapsed]);

    //click event for right icon
    var handleIconClick = function handleIconClick(index) {
      collapsibles.forEach(function (_ref3, idx) {
        var _ref4 = _slicedToArray(_ref3, 2);
        if (idx === index) {
          toggleNav === true ? setToggleNav(false) : setToggleNav(true);
        }
      });
    };
    var categoryKey = Object.keys(link)[0];
    var sublinks = link[categoryKey];
    var isActiveCategory = isActive[i] ? true : Object.keys(isActive).length === 0 ? category === categoryKey : false;
    var calculateIsActiveCategory = function calculateIsActiveCategory(i, categoryKey, sublink) {
      if (sublink) {
        return isActive["".concat(sublink, "-").concat(i)] ? true : Object.keys(isActive).length === 0 ? kit === sublink : false;
      } else {
        return isActive["".concat(categoryKey, "-").concat(i)] ? true : Object.keys(isActive).length === 0 ? category === categoryKey : false;
      }
    };
    var hasActiveSublink = link[Object.keys(link)[0]].some(function (sublink) {
      return sublink === kit;
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
      active: calculateIsActiveCategory(i, categoryKey, null),
      collapsed: toggleNav,
      collapsible: true,
      collapsibleTrail: true,
      cursor: "pointer",
      dark: dark,
      fontSize: "small",
      iconRight: ["plus", "minus"],
      key: "".concat(categoryKey, "-").concat(i),
      link: generateLink(categoryKey, null, type),
      marginBottom: "none",
      marginTop: "xxs",
      onClick: function onClick() {
        return handleMainClick(i, categoryKey);
      },
      onIconRightClick: function onIconRightClick() {
        return handleIconClick(i);
      },
      paddingY: "xxs",
      text: Object(_utilities_website_sidebar_helper__WEBPACK_IMPORTED_MODULE_2__["linkFormat"])(categoryKey),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 111,
        columnNumber: 7
      }
    }, sublinks.map(function (sublink, j) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
        active: calculateIsActiveCategory(j, null, sublink),
        cursor: "pointer",
        dark: dark,
        fontSize: "small",
        key: "".concat(sublink, "-").concat(j),
        link: generateLink(categoryKey, sublink, type),
        marginY: "none",
        onClick: function onClick() {
          return handleSubItemClick(j, sublink);
        },
        paddingY: "xxs",
        text: Object(_utilities_website_sidebar_helper__WEBPACK_IMPORTED_MODULE_2__["linkFormat"])(sublink),
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 130,
          columnNumber: 11
        }
      });
    }));
  } else {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
      active: isActive[link] ? true : Object.keys(isActive).length === 0 ? kit === link : false,
      cursor: "pointer",
      dark: dark,
      fontSize: "small",
      key: "".concat(link, "-").concat(i),
      link: generateLink(null, link, type),
      marginBottom: "none",
      marginTop: "xxs",
      onClick: function onClick() {
        return handleNonCollapseLinkClick(link);
      },
      text: Object(_utilities_website_sidebar_helper__WEBPACK_IMPORTED_MODULE_2__["linkFormat"])(link),
      paddingY: "xxs",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 147,
        columnNumber: 7
      }
    });
  }
};

/***/ }),

/***/ "./app/javascript/components/MainSidebar/index.tsx":
/*!*********************************************************!*\
  !*** ./app/javascript/components/MainSidebar/index.tsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _NestedNavItems__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NestedNavItems */ "./app/javascript/components/MainSidebar/NestedNavItems.tsx");
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/MainSidebar/index.tsx",
  _this = undefined;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var MainSidebar = function MainSidebar(_ref) {
  var dark = _ref.dark,
    type = _ref.type,
    category = _ref.category,
    kit = _ref.kit,
    kits = _ref.kits;
  //active state for navItems(will be dedundant once routing moved to react router)
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({}),
    _useState2 = _slicedToArray(_useState, 2),
    isActive = _useState2[0],
    setIsActive = _useState2[1];

  //hook into collapsible logic for all nested nav items
  var collapsibles = kits.map(function () {
    return Object(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["useCollapsible"])();
  });

  //hook into collapsible logic for top level item
  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isTopLevelCollapsed = _useState4[0],
    setIsTopLevelCollapsed = _useState4[1];
  var currentURL = window.location.pathname + window.location.search;
  var componentsLink = currentURL === "/kits".concat(type ? "?type=".concat(type) : "") ? "" : "/kits".concat(type ? "?type=".concat(type) : "");

  //set up toggling for top level item
  var handleComponentsClick = function handleComponentsClick(item) {
    setIsActive(function () {
      var newIsActive = {};
      newIsActive[item] = true;
      return newIsActive;
    });

    //return true at end to disable default collapsible behavior
    return true;
  };

  //right icon click for top level item
  var handleComponentsIconClick = function handleComponentsIconClick() {
    isTopLevelCollapsed === true ? setIsTopLevelCollapsed(false) : setIsTopLevelCollapsed(true);
  };
  var activeTopLevel = function activeTopLevel() {
    return isActive["top-nav-item"] ? true : Object.keys(isActive).length === 0 ? currentURL === "/kits".concat(type ? "?type=".concat(type) : "") : false;
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Nav"], {
    dark: dark,
    variant: "bold",
    paddingTop: "xxs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    active: activeTopLevel(),
    collapsed: isTopLevelCollapsed,
    collapsible: true,
    collapsibleTrail: true,
    cursor: "pointer",
    dark: dark,
    fontSize: "small",
    fontWeight: "bolder",
    iconRight: ["plus", "minus"],
    key: "top-nav-item",
    link: componentsLink,
    marginY: "none",
    onClick: function onClick() {
      return handleComponentsClick("top-nav-item");
    },
    onIconRightClick: handleComponentsIconClick,
    paddingY: "xxs",
    text: "Components",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 7
    }
  }, kits.map(function (link, i) {
    return Object(_NestedNavItems__WEBPACK_IMPORTED_MODULE_2__["renderNavItem"])(link, i, collapsibles, category, type, dark, kit, isActive, setIsActive);
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (MainSidebar);

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
  var replaceUnderscore = linkTitle.replace(/_/g, ' ').split(' ').map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
  return replaceUnderscore;
};

/***/ })

}]);
//# sourceMappingURL=application~main_sidebar-f7c66b9489a298c6b5a2.chunk.js.map