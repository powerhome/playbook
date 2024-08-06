(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app~application~main_sidebar"],{

/***/ "./app/javascript/components/KitSearch.jsx":
/*!*************************************************!*\
  !*** ./app/javascript/components/KitSearch.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/KitSearch.jsx",
  _this = undefined;


var KitSearch = function KitSearch(_ref) {
  var classname = _ref.classname,
    id = _ref.id,
    kits = _ref.kits;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (id === 'desktop-kit-search') {
      window.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.key === 'k') {
          var kitSearch = document.querySelector('#desktop-kit-search #react-select-2-input');
          kitSearch === document.activeElement ? kitSearch.blur() : kitSearch.focus();
        }
      });
    }
  }, [id]);
  var handleChange = function handleChange(selection) {
    if (selection) {
      window.location = selection.value;
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Typeahead"], {
    className: classname,
    dark: document.cookie.split('; ').includes('dark_mode=true'),
    id: id,
    onChange: handleChange,
    options: kits,
    placeholder: "Search...",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 7
    }
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (KitSearch);

/***/ }),

/***/ "./app/javascript/components/MainSidebar/MenuData/GuidelinesNavItems.ts":
/*!******************************************************************************!*\
  !*** ./app/javascript/components/MainSidebar/MenuData/GuidelinesNavItems.ts ***!
  \******************************************************************************/
/*! exports provided: VisualGuidelinesItems */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisualGuidelinesItems", function() { return VisualGuidelinesItems; });
var VisualGuidelinesItems = [{
  name: "Colors",
  link: "/visual_guidelines/colors"
}, {
  name: "Max Width",
  link: "/visual_guidelines/max_width"
}, {
  name: "Position",
  link: "/visual_guidelines/position"
}, {
  name: "Z-Index",
  link: "/visual_guidelines/z_index"
}, {
  name: "Line Height",
  link: "/visual_guidelines/line_height"
}, {
  name: "Number Spacing",
  link: "/visual_guidelines/number_spacing"
}, {
  name: "Shadows",
  link: "/visual_guidelines/shadows"
}, {
  name: "Spacing",
  link: "/visual_guidelines/spacing"
}, {
  name: "Border Radius",
  link: "/visual_guidelines/border_radius"
}, {
  name: "Typography",
  link: "/visual_guidelines/typography"
}, {
  name: "Display",
  link: "/visual_guidelines/display"
}, {
  name: "Cursor",
  link: "/visual_guidelines/cursor"
}, {
  name: "Flex Box",
  link: "/visual_guidelines/flex_box"
}, {
  name: "Hover",
  link: "/visual_guidelines/hover"
}, {
  name: "Text Align",
  link: "/visual_guidelines/text_align"
}, {
  name: "Overflow",
  link: "/visual_guidelines/overflow"
}];

/***/ }),

/***/ "./app/javascript/components/MainSidebar/MenuData/GuildesNavItems.ts":
/*!***************************************************************************!*\
  !*** ./app/javascript/components/MainSidebar/MenuData/GuildesNavItems.ts ***!
  \***************************************************************************/
/*! exports provided: GuidesNavItems */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuidesNavItems", function() { return GuidesNavItems; });
var GuidesNavItems = [{
  name: "HTML & CSS Setup",
  link: "/guides/getting_started/HTML_&_CSS"
}, {
  name: "Ruby & React Setup",
  link: "/guides/getting_started/rails_&_react_setup"
}, {
  name: "React Setup",
  link: "/guides/getting_started/react_setup"
}, {
  name: "Ruby on Rails Setup",
  link: "/guides/getting_started/ruby_on_rails_setup"
}];

/***/ }),

/***/ "./app/javascript/components/MainSidebar/MenuData/SidebarNavItems.ts":
/*!***************************************************************************!*\
  !*** ./app/javascript/components/MainSidebar/MenuData/SidebarNavItems.ts ***!
  \***************************************************************************/
/*! exports provided: SideBarNavItems */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SideBarNavItems", function() { return SideBarNavItems; });
var SideBarNavItems = [{
  name: "What's New",
  key: "top-nav-item-1",
  link: "/changelog",
  children: false,
  leftIcon: "sparkles"
}, {
  name: "Getting Started",
  key: "top-nav-item-2",
  link: "/guides/getting_started",
  children: true,
  leftIcon: "flag"
}, {
  name: "Components",
  key: "top-nav-item-3",
  link: "/kits",
  children: true,
  leftIcon: "grid-2"
}, {
  name: "Tokens & Guidelines",
  key: "top-nav-item-4",
  link: "/visual_guidelines",
  children: true,
  leftIcon: "shapes"
}, {
  name: "UI Samples",
  key: "top-nav-item-5",
  link: "/samples",
  children: true,
  leftIcon: "vial"
}, {
  name: "Playground",
  key: "top-nav-item-6",
  link: "/kit_playground_rails",
  children: false,
  leftIcon: "laptop-code"
}];

/***/ }),

/***/ "./app/javascript/components/MainSidebar/NavComponents/KitsNavComponent.tsx":
/*!**********************************************************************************!*\
  !*** ./app/javascript/components/MainSidebar/NavComponents/KitsNavComponent.tsx ***!
  \**********************************************************************************/
/*! exports provided: kitsType, KitsNavItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kitsType", function() { return kitsType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KitsNavItem", function() { return KitsNavItem; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utilities_website_sidebar_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utilities/website_sidebar_helper */ "./app/javascript/utilities/website_sidebar_helper.ts");
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/MainSidebar/NavComponents/KitsNavComponent.tsx",
  _this = undefined;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var currentURL = window.location.pathname + window.location.search;
var kitsType = function kitsType(type) {
  if (type === null || type === undefined) {
    return "rails";
  } else {
    return type;
  }
};
var KitsNavItem = function KitsNavItem(_ref) {
  var link = _ref.link,
    kitIndex = _ref.kitIndex,
    collapsibles = _ref.collapsibles,
    category = _ref.category,
    type = _ref.type,
    dark = _ref.dark,
    kit = _ref.kit,
    isActive = _ref.isActive,
    setIsActive = _ref.setIsActive,
    updateTopLevelNav = _ref.updateTopLevelNav,
    parentIndex = _ref.parentIndex;
  var _collapsibles$kitInde = _slicedToArray(collapsibles[kitIndex], 1),
    collapsed = _collapsibles$kitInde[0];
  //set up custom toggling
  var handleMainClick = function handleMainClick(index, categoryKey) {
    collapsibles.forEach(function (_ref2, idx) {
      var _ref3 = _slicedToArray(_ref2, 3),
        setCollapsed = _ref3[2];
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
      updateTopLevelNav(parentIndex);
    });
    //return true at end to disable default collapsible behavior
    return true;
  };

  //make sure kits nav will stay toggled open when nested item is clicked
  var updateKitsNav = function updateKitsNav(index) {
    collapsibles.forEach(function (collapsible, i) {
      var _collapsible = _slicedToArray(collapsible, 3),
        setCollapsed = _collapsible[2];
      if (i !== index) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    });
  };

  //click on nested items
  var handleSubItemClick = function handleSubItemClick(subLinkIndex, sublink, Index) {
    setIsActive(function () {
      var newIsActive = {};
      newIsActive["".concat(sublink, "-").concat(subLinkIndex)] = true;
      return newIsActive;
    });
    updateTopLevelNav(parentIndex);
    updateKitsNav(Index);
  };

  //click on non-collapsible navitem click
  var handleNonCollapseLinkClick = function handleNonCollapseLinkClick(link) {
    setIsActive(function () {
      var newIsActive = {};
      newIsActive[link] = true;
      return newIsActive;
    });
    updateTopLevelNav(parentIndex);
  };
  var generateLink = function generateLink(categoryKey, sublink, type) {
    if (sublink) {
      var _link = "/kits/".concat(sublink, "/").concat(kitsType(type));
      return currentURL === _link ? "" : _link;
    } else {
      var _link2 = "/kit_category/".concat(categoryKey, "?type=").concat(kitsType(type));
      return currentURL === _link2 ? "" : _link2;
    }
  };
  if (typeof link === "object") {
    var categoryKey = Object.keys(link)[0];
    var sublinks = link[categoryKey];
    var isActiveCategory = isActive[kitIndex] ? true : Object.keys(isActive).length === 0 ? category === categoryKey : false;
    var hasActiveSublink = link[Object.keys(link)[0]].some(function (sublink) {
      return sublink === kit;
    });

    //useState for handling collapsed state
    var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(isActiveCategory || hasActiveSublink ? false : true),
      _useState2 = _slicedToArray(_useState, 2),
      toggleNav = _useState2[0],
      setToggleNav = _useState2[1];
    //useEffect to handle toggle to consolidate logic
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
      // isActive will always be empty on first render due to rails navigation. Once we move to React router, this code will not be needed
      if (Object.keys(isActive).length === 0) {
        setToggleNav(isActiveCategory || hasActiveSublink ? false : collapsed);
      } else {
        setToggleNav(collapsed);
      }
    }, [collapsed, isActive]);

    //click event for right icon
    var handleIconClick = function handleIconClick(index) {
      collapsibles.forEach(function (_ref4, idx) {
        var _ref5 = _slicedToArray(_ref4, 2);
        if (idx === index) {
          toggleNav === true ? setToggleNav(false) : setToggleNav(true);
        }
      });
    };
    var calculateIsActiveCategory = function calculateIsActiveCategory(i, categoryKey, sublink) {
      if (sublink) {
        return isActive["".concat(sublink, "-").concat(i)] ? true : Object.keys(isActive).length === 0 ? kit === sublink : false;
      } else {
        return isActive["".concat(categoryKey, "-").concat(i)] ? true : Object.keys(isActive).length === 0 ? category === categoryKey : false;
      }
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
      active: calculateIsActiveCategory(kitIndex, categoryKey, null),
      collapsed: toggleNav,
      collapsible: true,
      collapsibleTrail: true,
      cursor: "pointer",
      dark: dark,
      fontSize: "small",
      iconRight: ["plus", "minus"],
      key: "".concat(categoryKey, "-").concat(kitIndex),
      link: generateLink(categoryKey, null, type),
      marginBottom: "none",
      marginTop: "xxs",
      onClick: function onClick() {
        return handleMainClick(kitIndex, categoryKey);
      },
      onIconRightClick: function onIconRightClick() {
        return handleIconClick(kitIndex);
      },
      paddingY: "xxs",
      text: Object(_utilities_website_sidebar_helper__WEBPACK_IMPORTED_MODULE_2__["linkFormat"])(categoryKey),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 144,
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
          return handleSubItemClick(j, sublink, kitIndex);
        },
        paddingY: "xxs",
        text: Object(_utilities_website_sidebar_helper__WEBPACK_IMPORTED_MODULE_2__["linkFormat"])(sublink),
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 163,
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
      key: "".concat(link, "-").concat(kitIndex),
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
        lineNumber: 180,
        columnNumber: 7
      }
    });
  }
};

/***/ }),

/***/ "./app/javascript/components/MainSidebar/NavComponents/OtherNavComponent.tsx":
/*!***********************************************************************************!*\
  !*** ./app/javascript/components/MainSidebar/NavComponents/OtherNavComponent.tsx ***!
  \***********************************************************************************/
/*! exports provided: OtherNavItems */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OtherNavItems", function() { return OtherNavItems; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _MenuData_GuidelinesNavItems__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../MenuData/GuidelinesNavItems */ "./app/javascript/components/MainSidebar/MenuData/GuidelinesNavItems.ts");
/* harmony import */ var _MenuData_GuildesNavItems__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../MenuData/GuildesNavItems */ "./app/javascript/components/MainSidebar/MenuData/GuildesNavItems.ts");
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/MainSidebar/NavComponents/OtherNavComponent.tsx",
  _this = undefined;




var OtherNavItems = function OtherNavItems(_ref) {
  var name = _ref.name,
    currentURL = _ref.currentURL,
    dark = _ref.dark,
    samples = _ref.samples,
    setIsActive = _ref.setIsActive,
    isActive = _ref.isActive,
    updateTopLevelNav = _ref.updateTopLevelNav,
    parentIndex = _ref.parentIndex;
  //transform text from samples yml
  var transformMenuTitle = function transformMenuTitle(link) {
    if (name === "UI Samples") {
      var words = link.split("_").map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
      return words.join(" ");
    } else {
      return link.name;
    }
  };
  var samplesMenu = [];

  //Get samples pages from Samples yml file
  for (var _key in samples) {
    if (samples.hasOwnProperty(_key)) {
      samples[_key].forEach(function (item) {
        return samplesMenu.push(item);
      });
    }
  }
  var menuItems = [];

  //conditionally render navitems depending on name
  if (name === "Tokens & Guidelines") {
    menuItems = _MenuData_GuidelinesNavItems__WEBPACK_IMPORTED_MODULE_2__["VisualGuidelinesItems"];
  } else if (name === "UI Samples" && samples) {
    menuItems = samplesMenu;
  } else if (name === "Getting Started") {
    menuItems = _MenuData_GuildesNavItems__WEBPACK_IMPORTED_MODULE_3__["GuidesNavItems"];
  }
  var handleItemClick = function handleItemClick(link, i) {
    var key = name === "UI Samples" ? "".concat(link, "-").concat(i) : "".concat(link.link, "-").concat(i);
    setIsActive(function () {
      var newIsActive = {};
      newIsActive[key] = true;
      return newIsActive;
    });
    updateTopLevelNav(parentIndex);
  };
  var activeForItems = function activeForItems(link, i) {
    var key = name === "UI Samples" ? "".concat(link, "-").concat(i) : "".concat(link.link, "-").concat(i);
    return isActive[key] ? true : Object.keys(isActive).length === 0 ? name === "UI Samples" ? "/samples/".concat(link) === currentURL : link.link === currentURL : null;
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, menuItems.map(function (link, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
      active: activeForItems(link, i),
      cursor: "pointer",
      dark: dark,
      fontSize: "small",
      key: name === "UI Samples" ? "".concat(link, "-").concat(i) : "".concat(link.link, "-").concat(i),
      link: name === "UI Samples" ? "/samples/".concat(link) : link.link,
      marginBottom: "none",
      marginTop: "xxs",
      onClick: function onClick() {
        return handleItemClick(link, i);
      },
      paddingY: "xxs",
      text: transformMenuTitle(link),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 71,
        columnNumber: 9
      }
    });
  }));
};

/***/ }),

/***/ "./app/javascript/components/MainSidebar/TopLevelNavItems.tsx":
/*!********************************************************************!*\
  !*** ./app/javascript/components/MainSidebar/TopLevelNavItems.tsx ***!
  \********************************************************************/
/*! exports provided: TopLevelNavItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopLevelNavItem", function() { return TopLevelNavItem; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _NavComponents_KitsNavComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NavComponents/KitsNavComponent */ "./app/javascript/components/MainSidebar/NavComponents/KitsNavComponent.tsx");
/* harmony import */ var _MenuData_SidebarNavItems__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MenuData/SidebarNavItems */ "./app/javascript/components/MainSidebar/MenuData/SidebarNavItems.ts");
/* harmony import */ var _NavComponents_OtherNavComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NavComponents/OtherNavComponent */ "./app/javascript/components/MainSidebar/NavComponents/OtherNavComponent.tsx");
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/MainSidebar/TopLevelNavItems.tsx",
  _this = undefined;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var currentURL = window.location.pathname + window.location.search;
var TopLevelNavItem = function TopLevelNavItem(_ref) {
  var dark = _ref.dark,
    type = _ref.type,
    isActive = _ref.isActive,
    setIsActive = _ref.setIsActive,
    kits = _ref.kits,
    kit = _ref.kit,
    category = _ref.category,
    collapsibles = _ref.collapsibles,
    samples = _ref.samples;
  //hook into collapsible logic for top level item
  var topLevelCollapsibles = _MenuData_SidebarNavItems__WEBPACK_IMPORTED_MODULE_3__["SideBarNavItems"].map(function () {
    return Object(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["useCollapsible"])();
  });

  //logic to make it so no navigation if already on that page(prevent unneeded rerenders)
  var TopLevelLink = function TopLevelLink(link) {
    if (link === "/kits") {
      return currentURL === "/kits".concat(Object(_NavComponents_KitsNavComponent__WEBPACK_IMPORTED_MODULE_2__["kitsType"])(type) ? "?type=".concat(Object(_NavComponents_KitsNavComponent__WEBPACK_IMPORTED_MODULE_2__["kitsType"])(type)) : "") ? "" : "/kits".concat(Object(_NavComponents_KitsNavComponent__WEBPACK_IMPORTED_MODULE_2__["kitsType"])(type) ? "?type=".concat(Object(_NavComponents_KitsNavComponent__WEBPACK_IMPORTED_MODULE_2__["kitsType"])(type)) : "");
    } else {
      return currentURL === link ? "" : link;
    }
  };

  //set up toggling for top level item
  var handleComponentsClick = function handleComponentsClick(item, index) {
    topLevelCollapsibles.forEach(function (_ref2, idx) {
      var _ref3 = _slicedToArray(_ref2, 3),
        setCollapsed = _ref3[2];
      setIsActive(function () {
        var newIsActive = {};
        newIsActive[item] = true;
        return newIsActive;
      });
      if (idx === index) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    });
    //return true at end to disable default collapsible behavior
    // return true;
  };

  //NOTE: All toggle and active state logic should be replaced with state once website moves to react router
  var activeTopLevel = function activeTopLevel(key, link) {
    var kitsLink = link === "/kits" ? "/kits".concat(Object(_NavComponents_KitsNavComponent__WEBPACK_IMPORTED_MODULE_2__["kitsType"])(type) ? "?type=".concat(Object(_NavComponents_KitsNavComponent__WEBPACK_IMPORTED_MODULE_2__["kitsType"])(type)) : "") : link;
    return isActive[key] ? true : Object.keys(isActive).length === 0 ? currentURL === kitsLink || currentURL === link : false;
  };

  // if url starts with /visual_guidelines or /kits, then relevant collapsible nav to be toggled open on first render
  var currentPage = currentURL.match(/^(\/[^/]+)\/[^/]+/);
  var kitsPage = currentURL.match(/^\/([^/?#]+)/);
  // if url starts with /kit, then relevant collapsible nav to be toggled open on first render
  var kitCategoryPage = currentURL.match(/^\/([^/]{3})/);
  // if url matches /guides, than relevant collapsible nav to be toggled open on first render
  var guidesPage = currentURL.split("/").slice(0, 3).join("/");

  //extract render logic out of return for better performance
  var renderTopItems = function renderTopItems(name, key, children, leftIcon, link, i) {
    var _topLevelCollapsibles = _slicedToArray(topLevelCollapsibles[i], 1),
      collapsed = _topLevelCollapsibles[0];

    //is link for navitem equal to current url? Logic will be redundant once website moves to react
    var onCurrentPage = function onCurrentPage() {
      var categoryMatch = currentPage && (currentPage[1] === link || kitCategoryPage && "/".concat(kitCategoryPage[1]) === link.substring(0, link.length - 1)) || kitsPage && kitsPage[0] === link;
      var guidesMatch = guidesPage === link;
      return categoryMatch || guidesMatch ? true : false;
    };

    //use state to handle toggle logic to make sure both main click and right icon click works as expected
    var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(onCurrentPage() ? false : true),
      _useState2 = _slicedToArray(_useState, 2),
      toggleTopNav = _useState2[0],
      setToggleTopNav = _useState2[1];

    //on first render, active item should be toggled open, after that custom toggling logic to run
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
      //isActive will always be empty on first render due to rails navigation. Once we move to React router, this code will not be needed
      if (Object.keys(isActive).length === 0) {
        setToggleTopNav(onCurrentPage() ? false : true);
      } else {
        setToggleTopNav(collapsed);
      }
    }, [collapsed, isActive]);

    //right icon click for top level item
    var handleComponentsIconClick = function handleComponentsIconClick(i) {
      topLevelCollapsibles.forEach(function (_ref4, idx) {
        var _ref5 = _slicedToArray(_ref4, 2),
          toggle = _ref5[1];
        if (idx === i) {
          toggleTopNav === true ? setToggleTopNav(false) : setToggleTopNav(true);
        }
      });
    };

    //callback function so top level nav item stays toggled opwn if child is clicked
    var updateTopLevelNav = function updateTopLevelNav(index) {
      topLevelCollapsibles.forEach(function (collapsible, i) {
        var _collapsible = _slicedToArray(collapsible, 3),
          setCollapsed = _collapsible[2];
        if (i !== index) {
          setCollapsed(true);
        } else {
          setCollapsed(false);
        }
      });
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
      active: activeTopLevel(key, link),
      collapsed: children && toggleTopNav,
      collapsible: children,
      collapsibleTrail: children,
      cursor: "pointer",
      dark: dark,
      fontSize: "small",
      fontWeight: "bolder",
      iconLeft: leftIcon,
      iconRight: children && ["plus", "minus"],
      key: key,
      link: TopLevelLink(link),
      marginY: "none",
      onClick: function onClick() {
        return handleComponentsClick(key, i);
      },
      onIconRightClick: children && function () {
        return handleComponentsIconClick(i);
      },
      paddingY: "xxs",
      target: name === "Playground" ? "_blank" : "_self",
      text: name,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 133,
        columnNumber: 7
      }
    }, children && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, name === "Components" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, kits.map(function (link, index) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NavComponents_KitsNavComponent__WEBPACK_IMPORTED_MODULE_2__["KitsNavItem"], {
        link: link,
        kitIndex: index,
        collapsibles: collapsibles,
        category: category,
        type: type,
        dark: dark,
        kit: kit,
        isActive: isActive,
        setIsActive: setIsActive,
        updateTopLevelNav: updateTopLevelNav,
        parentIndex: i,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 158,
          columnNumber: 19
        }
      });
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NavComponents_OtherNavComponent__WEBPACK_IMPORTED_MODULE_4__["OtherNavItems"], {
      name: name,
      currentURL: currentURL,
      dark: dark,
      samples: samples,
      setIsActive: setIsActive,
      isActive: isActive,
      updateTopLevelNav: updateTopLevelNav,
      parentIndex: i,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 174,
        columnNumber: 15
      }
    })));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, _MenuData_SidebarNavItems__WEBPACK_IMPORTED_MODULE_3__["SideBarNavItems"].map(function (_ref6, i) {
    var name = _ref6.name,
      key = _ref6.key,
      children = _ref6.children,
      leftIcon = _ref6.leftIcon,
      link = _ref6.link;
    return renderTopItems(name, key, children, leftIcon, link, i);
  }));
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
/* harmony import */ var _TopLevelNavItems__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TopLevelNavItems */ "./app/javascript/components/MainSidebar/TopLevelNavItems.tsx");
/* harmony import */ var _images_pb_logo_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../images/pb-logo.svg */ "./app/javascript/images/pb-logo.svg");
/* harmony import */ var _images_pb_logo_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_images_pb_logo_svg__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _KitSearch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../KitSearch */ "./app/javascript/components/KitSearch.jsx");
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/javascript/components/MainSidebar/index.tsx",
  _this = undefined;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



// @ts-ignore


var MainSidebar = function MainSidebar(_ref) {
  var dark = _ref.dark,
    type = _ref.type,
    category = _ref.category,
    kit = _ref.kit,
    kits = _ref.kits,
    PBversion = _ref.PBversion,
    search_list = _ref.search_list,
    samples = _ref.samples;
  //active state for navItems(will be redundant once routing moved to react router)
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({}),
    _useState2 = _slicedToArray(_useState, 2),
    isActive = _useState2[0],
    setIsActive = _useState2[1];

  //hook into collapsible logic for all components nested nav items
  var collapsibles = kits.map(function () {
    return Object(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["useCollapsible"])();
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "row",
    spacing: "between",
    align: "center",
    marginTop: "lg",
    marginX: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "/",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Image"], {
    alt: "Playbook logo",
    url: _images_pb_logo_svg__WEBPACK_IMPORTED_MODULE_3___default.a,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 11
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Badge"], {
    text: PBversion,
    dark: dark,
    variant: "success",
    rounded: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 9
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "column",
    align: "stretch",
    marginBottom: "xxs",
    marginTop: "md",
    marginX: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_KitSearch__WEBPACK_IMPORTED_MODULE_4__["default"], {
    classname: "desktop-kit-search",
    id: "desktop-kit-search",
    kits: search_list,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 9
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Nav"], {
    dark: dark,
    variant: "bold",
    paddingTop: "xxs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TopLevelNavItems__WEBPACK_IMPORTED_MODULE_2__["TopLevelNavItem"], {
    dark: dark,
    type: type,
    isActive: isActive,
    setIsActive: setIsActive,
    kits: kits,
    kit: kit,
    category: category,
    collapsibles: collapsibles,
    samples: samples,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 9
    }
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (MainSidebar);

/***/ }),

/***/ "./app/javascript/images/pb-logo.svg":
/*!*******************************************!*\
  !*** ./app/javascript/images/pb-logo.svg ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "media/images/pb-logo-7c6d08a9717b9aeec0c40f3e68eb80fd.svg";

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
//# sourceMappingURL=app~application~main_sidebar-87bf57fad404564ceaf3.chunk.js.map