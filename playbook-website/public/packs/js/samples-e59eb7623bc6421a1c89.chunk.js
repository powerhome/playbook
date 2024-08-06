(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["samples"],{

/***/ "./app/javascript/packs/samples.js":
/*!*****************************************!*\
  !*** ./app/javascript/packs/samples.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webpacker_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpacker-react */ "../node_modules/webpacker-react/index.js");
/* harmony import */ var webpacker_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpacker_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _views_samples_analytics_dashboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../views/samples/analytics_dashboard */ "./app/views/samples/analytics_dashboard/index.jsx");
/* harmony import */ var _views_samples_crm_client_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../views/samples/crm_client_list */ "./app/views/samples/crm_client_list/index.jsx");
/* harmony import */ var _views_samples_conference_statistics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../views/samples/conference_statistics */ "./app/views/samples/conference_statistics/index.jsx");
/* harmony import */ var _views_samples_news_magazine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../views/samples/news_magazine */ "./app/views/samples/news_magazine/index.jsx");
/* harmony import */ var _views_samples_trending_repositories__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../views/samples/trending_repositories */ "./app/views/samples/trending_repositories/index.jsx");
/* harmony import */ var _views_samples_crowdsourced_posts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../views/samples/crowdsourced_posts */ "./app/views/samples/crowdsourced_posts/index.jsx");
/* harmony import */ var _views_samples_card_dashboard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../views/samples/card_dashboard */ "./app/views/samples/card_dashboard/index.jsx");
/* harmony import */ var _views_samples_music_app__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../views/samples/music_app */ "./app/views/samples/music_app/index.jsx");


// Please rearrange/alphabaetize after Sample Generator appends new imports
// Sample Imports








webpacker_react__WEBPACK_IMPORTED_MODULE_0___default.a.setup({
  AnalyticsDashboard: _views_samples_analytics_dashboard__WEBPACK_IMPORTED_MODULE_1__["default"],
  CardDashboard: _views_samples_card_dashboard__WEBPACK_IMPORTED_MODULE_7__["default"],
  ConferenceStatistics: _views_samples_conference_statistics__WEBPACK_IMPORTED_MODULE_3__["default"],
  CrmClientList: _views_samples_crm_client_list__WEBPACK_IMPORTED_MODULE_2__["default"],
  CrowdsourcedPosts: _views_samples_crowdsourced_posts__WEBPACK_IMPORTED_MODULE_6__["default"],
  NewsMagazine: _views_samples_news_magazine__WEBPACK_IMPORTED_MODULE_4__["default"],
  MusicApp: _views_samples_music_app__WEBPACK_IMPORTED_MODULE_8__["default"],
  TrendingRepositories: _views_samples_trending_repositories__WEBPACK_IMPORTED_MODULE_5__["default"]
});

/***/ }),

/***/ "./app/views/samples/analytics_dashboard/index.jsx":
/*!*********************************************************!*\
  !*** ./app/views/samples/analytics_dashboard/index.jsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/views/samples/analytics_dashboard/index.jsx",
  _this = undefined;


var chartData = [{
  name: 'Installation',
  data: [154175]
}, {
  name: 'Manufacturing',
  data: [40434]
}, {
  name: 'Sales & Distribution',
  data: [39387]
}, {
  name: 'Project Development',
  data: [34227]
}, {
  name: 'Other',
  data: [18111]
}];
var chartData2 = [{
  name: 'Installation',
  data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
}, {
  name: 'Manufacturing',
  data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
}, {
  name: 'Sales & Distribution',
  data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
}, {
  name: 'Project Development',
  data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
}, {
  name: 'Other',
  data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
}];
var AnalyticsDashboard = function AnalyticsDashboard() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pb_layout_kit_size_xl_left_light full layout_left_collapse_md",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "layout_sidebar",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["User"], {
    align: "left",
    avatarUrl: "https://s3-hq-f5.powerhrg.com/nitro-production/avatars/55553/badge/business-technology-jonathan-zazula.jpg?AWSAccessKeyId=IWSW00NEQHMEYQTLZ7E9&Signature=S0EN3l5sfIr7yk442Q2MeledXGc%3D&Expires=3161514974",
    name: "Jon Zazula",
    orientation: "horizontal",
    size: "md",
    title: "User Experience Designer",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
    style: {
      height: '1px',
      border: 'none',
      color: '#e4e8f0',
      backgroundColor: '#e4e8f0',
      margin: '15px'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Nav"], {
    variant: "subtle",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    iconLeft: "city",
    link: "#",
    text: "City",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    iconLeft: "user-friends",
    link: "#",
    text: "People",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    active: true,
    iconLeft: "user-tie",
    link: "#",
    text: "Growth Dashboard",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    iconLeft: "clock",
    link: "#",
    text: "History",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    iconLeft: "clipboard",
    link: "#",
    text: "Memos",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    iconLeft: "phone",
    link: "#",
    text: "Contacts",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 11
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "layout_body",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["BarGraph"], {
    axisTitle: "Number of Employees",
    chartData: chartData,
    id: "bar-test",
    pointStart: 2012,
    subTitle: "Source: thesolarfoundation.com",
    title: "Solar Employment Growth by Sector, 2010-2016",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["LineGraph"], {
    axisTitle: "Number of Employees",
    chartData: chartData2,
    id: "line-test",
    pointStart: 1,
    subTitle: "Source: thesolarfoundation.com",
    title: "Solar Employment Growth by Sector, 2010-2016",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 9
    }
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (AnalyticsDashboard);

/***/ }),

/***/ "./app/views/samples/card_dashboard/index.jsx":
/*!****************************************************!*\
  !*** ./app/views/samples/card_dashboard/index.jsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/views/samples/card_dashboard/index.jsx",
  _this = undefined;
/* eslint-disable no-prototype-builtins */
/* eslint react/prop-types: 0 */




////////////////////////////////////////////////////
//
// Props for the components
//
////////////////////////////////////////////////////

var pipelineData = {
  title: 'Pipeline Chart',
  chartData: [{
    label: 'Add to Cart',
    percent: 100.0,
    value: 2577
  }, {
    label: 'Shopping Cart',
    percent: 79.0,
    value: 2023
  }, {
    label: 'Payment Methods',
    percent: 59.0,
    value: 1567
  }, {
    label: 'Delivery Methods',
    percent: 56.0,
    value: 1252
  }, {
    label: 'Confirm',
    percent: 49.0,
    value: 1182
  }, {
    label: 'Delivery',
    percent: 46.0,
    value: 1098
  }]
};
var ticketData = {
  gridData: [{
    icon: 'ticket-alt',
    variant: 'green',
    size: 'lg',
    text: 'Tickets (YTD)',
    value: '1426.0'
  }, {
    icon: 'times-square',
    variant: 'red',
    size: 'lg',
    text: 'Overdue',
    value: '25.0'
  }, {
    icon: 'tasks',
    variant: 'teal',
    size: 'lg',
    text: 'Closed Without Action (YTD)',
    value: '97.0'
  }, {
    icon: 'exclamation-triangle',
    variant: 'yellow',
    size: 'lg',
    text: 'Escalated (YTD)',
    value: '896.0'
  }]
};
var totalRevenue = {
  title: 'Total Revenue',
  data: [{
    name: 'Total Sales',
    value: 80
  }],
  legendData: [{
    value: '1000',
    label: 'Target'
  }, {
    value: '224',
    label: 'Last Week'
  }, {
    value: '965',
    label: 'Last Month'
  }]
};
var salesReport = {
  title: 'Total Revenue',
  legendData: [{
    value: '1000',
    label: 'Target'
  }, {
    value: '543',
    label: 'Last Week'
  }],
  data: [{
    name: 'Sales Report',
    data: [343, 135, 665, 903, 571, 191, 173, 520, 917]
  }]
};
var clientData = {
  title: 'Client Data',
  data: [{
    title: 'New Clients',
    value: 35,
    percent: 11.0,
    status: 'negative'
  }, {
    title: 'Returning Clients',
    value: 8,
    percent: 5.0,
    status: 'positive'
  }, {
    title: 'VIP Clients',
    value: 1,
    percent: 11.0,
    status: 'negative'
  }, {
    title: 'Orders on Clients',
    value: 1.44,
    percent: 5.0,
    status: 'positive'
  }, {
    title: 'Bounce on Clients',
    value: 30.77,
    unit: '%',
    percent: 5.0,
    status: 'positive'
  }, {
    title: 'Days Between Orders',
    value: 3,
    percent: 0.0,
    unit: 'days'
  }, {
    title: 'New Orders',
    value: 26,
    percent: 11.0,
    status: 'negative'
  }, {
    title: 'Confirmed Orders',
    value: 15,
    percent: 11.0,
    status: 'negative'
  }]
};

////////////////////////////////////////////////////
//
// Components
//
////////////////////////////////////////////////////

var FulfillmentChart = function FulfillmentChart(_ref) {
  var chartData = _ref.chartData,
    title = _ref.title;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    borderNone: true,
    margin: "sm",
    padding: "none",
    shadow: "deeper",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    spacing: "between",
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    padding: "sm",
    size: "4",
    text: title,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["CircleIconButton"], {
    icon: "ellipsis-h",
    variant: "link",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 7
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 5
    }
  }), chartData.map(function (row, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
      key: i,
      padding: "sm",
      spacing: "between",
      vertical: "center",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 118,
        columnNumber: 7
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
      fixedSize: "100px",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 124,
        columnNumber: 9
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
      size: "xs",
      text: row.label,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 126,
        columnNumber: 11
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
      grow: true,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 131,
        columnNumber: 9
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
      spacing: "around",
      vertical: "center",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 132,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["ProgressSimple"], {
      percent: row.percent,
      width: "100px",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 136,
        columnNumber: 13
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
      fixedSize: "50px",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 140,
        columnNumber: 13
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
      marginX: "xs",
      size: "xs",
      text: "".concat(row.percent, "%"),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 141,
        columnNumber: 15
      }
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 149,
        columnNumber: 9
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
      vertical: "right",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 150,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
      text: "".concat(row.value),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 151,
        columnNumber: 13
      }
    }))));
  }));
};
var GridRowFill = function GridRowFill(_ref2) {
  var data = _ref2.data;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Body, {
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 163,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    horizontal: "center",
    spacing: "evenly",
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 164,
      columnNumber: 5
    }
  }, data.map(function (line, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
      fixedSize: "215px",
      key: "grid-row-item-".concat(line.icon, "-").concat(i),
      margin: "md",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 171,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconStatValue"], Object.assign({}, line, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 176,
        columnNumber: 13
      }
    })));
  })));
};
var IconGrid = function IconGrid(_ref3) {
  var gridData = _ref3.gridData;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    borderNone: true,
    margin: "sm",
    padding: "none",
    shadow: "deeper",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 186,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(GridRowFill, {
    data: gridData.slice(0, 2),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 192,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(GridRowFill, {
    data: gridData.slice(2),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 193,
      columnNumber: 5
    }
  }));
};
var Legend = function Legend(_ref4) {
  var name = _ref4.name,
    data = _ref4.data;
  name = name.toLowerCase().replace(/\s/g, '-');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    className: "flex-container",
    horizontal: "center",
    margin: "xs",
    spacing: "between",
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 200,
      columnNumber: 5
    }
  }, data.map(function (point, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
      key: "legend-".concat(name, "-").concat(i),
      marginX: "sm",
      marginY: "sm",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 209,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Currency"], {
      amount: point.value,
      emphasized: true,
      label: point.label,
      marginBottom: "md",
      size: "md",
      symbol: "$",
      variant: "light",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 214,
        columnNumber: 13
      }
    }));
  }));
};
var GaugeLegend = function GaugeLegend(_ref5) {
  var title = _ref5.title,
    data = _ref5.data,
    legendData = _ref5.legendData;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    borderNone: true,
    margin: "sm",
    padding: "none",
    shadow: "deeper",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 232,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    spacing: "between",
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 238,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    padding: "sm",
    size: "4",
    text: title,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 242,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["CircleIconButton"], {
    icon: "ellipsis-h",
    variant: "link",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 247,
      columnNumber: 7
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 253,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Body, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 254,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    horizontal: "center",
    orientation: "column",
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 255,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Gauge"], {
    chartData: data,
    fullCircle: true,
    id: "full-circle",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 260,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    text: "Total Sales made Today",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 265,
      columnNumber: 9
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 269,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Body, {
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 271,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Legend, {
    data: legendData,
    name: title,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 272,
      columnNumber: 7
    }
  })));
};
var BarGraphLegend = function BarGraphLegend(_ref6) {
  var title = _ref6.title,
    data = _ref6.data,
    legendData = _ref6.legendData;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    borderNone: true,
    margin: "sm",
    padding: "none",
    shadow: "deeper",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 281,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    spacing: "between",
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 287,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    padding: "sm",
    size: "4",
    text: title,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 291,
      columnNumber: 7
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["CircleIconButton"], {
    icon: "ellipsis-h",
    variant: "link",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 296,
      columnNumber: 7
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 302,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Body, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 303,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["BarGraph"], {
    chartData: data,
    height: "75%",
    id: "bar-default",
    xAxisCategories: [],
    yAxisCategories: "0",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 304,
      columnNumber: 7
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 312,
      columnNumber: 5
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Legend, {
    data: legendData,
    name: title,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 313,
      columnNumber: 5
    }
  }));
};
var GridBlock = function GridBlock(_ref7) {
  var data = _ref7.data;
  var unit = data.hasOwnProperty('unit') ? "".concat(data.unit) : '';
  var status = data.hasOwnProperty('status') ? data.status === 'positive' ? '+' : '-' : '';
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "column",
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 326,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    marginY: "md",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 330,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 333,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    color: "light",
    text: data.title,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 334,
      columnNumber: 11
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 339,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 340,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 341,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    size: "3",
    tag: "h3",
    text: "".concat(data.value, " ").concat(unit),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 342,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 348,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    marginLeft: "xs",
    status: data.status,
    text: "".concat(status).concat(data.percent, "%"),
    value: data.percent,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 349,
      columnNumber: 15
    }
  }))))));
};
var NumberGrid = function NumberGrid(_ref8) {
  var data = _ref8.data;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    borderNone: true,
    margin: "sm",
    shadow: "deeper",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 365,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Layout"], {
    layout: "collection",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 370,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Layout"].Body, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 371,
      columnNumber: 9
    }
  }, data.map(function (block, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(GridBlock, {
      data: block,
      key: i,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 375,
        columnNumber: 13
      }
    });
  }))));
};

////////////////////////////////////////////////////
//
// Layout
//
////////////////////////////////////////////////////

// remove flex from here and use the stylesheet
var CardDashboard = function CardDashboard() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "main-dashboard-content",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 398,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FulfillmentChart, Object.assign({}, pipelineData, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 400,
      columnNumber: 7
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(IconGrid, Object.assign({}, ticketData, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 402,
      columnNumber: 7
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(BarGraphLegend, Object.assign({}, salesReport, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 404,
      columnNumber: 7
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NumberGrid, Object.assign({}, clientData, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 406,
      columnNumber: 7
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(GaugeLegend, Object.assign({}, totalRevenue, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 408,
      columnNumber: 7
    }
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (CardDashboard);

/***/ }),

/***/ "./app/views/samples/conference_statistics/index.jsx":
/*!***********************************************************!*\
  !*** ./app/views/samples/conference_statistics/index.jsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/views/samples/conference_statistics/index.jsx",
  _this = undefined;


var data = [{
  name: '2020 | SF',
  data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
}, {
  name: '2020 | TOR',
  data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
}, {
  name: '2019 | AMS',
  data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
}, {
  name: '2018 | SF',
  data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
}, {
  name: '2017 | LA',
  data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
}];
var totalRegistered = [{
  name: 'Registrations',
  data: [1475, 524, 1344, 780, 200, 900]
}];
var newAttendees = [{
  name: 'Registrations',
  data: [1475, 524, 1344, 780, 200, 900]
}];
var repeatingAttendees = [{
  name: 'Registrations',
  data: [1475, 524, 1344, 780, 200, 900]
}];
var graphicDesigners = [{
  name: 'Registrations',
  data: [1475, 524, 1344, 780, 200, 900]
}];
var uxUi = [{
  name: 'Registrations',
  data: [1475, 524, 1344, 780, 200, 900]
}];
var productDesigners = [{
  name: 'Registrations',
  data: [1475, 524, 1344, 780, 200, 900]
}];
var ConferenceStatistics = function ConferenceStatistics() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Layout"], {
    collapse: "xs",
    position: "left",
    size: "lg",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Layout"].Side, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "column",
    padding: "md",
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    size: 3,
    tag: "h3",
    text: "Design Expo",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 13
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    color: "light",
    text: "Annual Conference*",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 13
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "column",
    padding: "md",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    paddingBottom: "sm",
    size: 4,
    tag: "h4",
    text: "Regions",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 13
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    inline: true,
    orientation: "column",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Checkbox"], {
    checked: true,
    name: "NorthAmerica",
    paddingBottom: "sm",
    paddingLeft: "sm",
    text: "North America",
    value: "NorthAmerica",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Checkbox"], {
    checked: true,
    name: "Europe",
    paddingBottom: "sm",
    paddingLeft: "sm",
    text: "Europe",
    value: "Europe",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 13
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    paddingY: "sm",
    size: 4,
    tag: "h4",
    text: "Total Registered",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Table"], {
    paddingBottom: "xs",
    size: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 118,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 119,
      columnNumber: 17
    }
  }, 'Conference'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 17
    }
  }, 'Total #'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 123,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 124,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 125,
      columnNumber: 17
    }
  }, '2020 | SF'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 126,
      columnNumber: 17
    }
  }, '2,391')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 128,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 129,
      columnNumber: 17
    }
  }, '2020 | TOR'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 130,
      columnNumber: 17
    }
  }, '3,829')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 132,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 133,
      columnNumber: 17
    }
  }, '2019 | AMS'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 134,
      columnNumber: 17
    }
  }, '2,047')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 136,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 137,
      columnNumber: 17
    }
  }, '2018 | SF'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 138,
      columnNumber: 17
    }
  }, '1,824')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 140,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141,
      columnNumber: 17
    }
  }, '2017 | LA'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 17
    }
  }, '719')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 144,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 145,
      columnNumber: 17
    }
  }, '2017 | LDN'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 146,
      columnNumber: 17
    }
  }, '491')))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    size: "xs",
    text: "*This dashboard includes the last six conferences",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 150,
      columnNumber: 11
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Layout"].Body, {
    padding: "xl",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 157,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    paddingBottom: "lg",
    size: 3,
    tag: "h3",
    text: "Registration Dashboard",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 160,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    className: "bg_light",
    spacing: "between",
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 166,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    fixedSize: "50%",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 171,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 174,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    paddingBottom: "md",
    spacing: "around",
    vertical: "bottom",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 176,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 182,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "column",
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 183,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 187,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    size: "xs",
    text: "2020 | SF",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 188,
      columnNumber: 23
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 193,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    text: "Total Registered",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 194,
      columnNumber: 23
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 198,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    size: 2,
    tag: "h2",
    text: "2,391",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 199,
      columnNumber: 23
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    orientation: "vertical",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 208,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 212,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "column",
    paddingTop: "sm",
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 213,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 218,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    text: "Graphic",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 219,
      columnNumber: 23
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 223,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    size: 3,
    tag: "h3",
    text: "353",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 224,
      columnNumber: 23
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 235,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "column",
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 236,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 240,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    text: "UX/UI",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 241,
      columnNumber: 23
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 245,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    size: 3,
    tag: "h3",
    text: "254",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 246,
      columnNumber: 23
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 257,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "column",
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 258,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 262,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    text: "Product",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 263,
      columnNumber: 23
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 267,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    size: 3,
    tag: "h3",
    text: "194",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 268,
      columnNumber: 23
    }
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 278,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    paddingTop: "sm",
    spacing: "around",
    vertical: "bottom",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 280,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 286,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "column",
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 287,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 291,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    size: "xs",
    text: "2020 | TOR",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 292,
      columnNumber: 23
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 297,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    text: "Total Registered",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 298,
      columnNumber: 23
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 302,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    size: 2,
    tag: "h2",
    text: "3,829",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 303,
      columnNumber: 23
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    orientation: "vertical",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 312,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 316,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "column",
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 317,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 321,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    text: "Graphic",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 322,
      columnNumber: 23
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 326,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    size: 3,
    tag: "h3",
    text: "937",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 327,
      columnNumber: 23
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 338,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "column",
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 339,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 343,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    text: "UX/UI",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 344,
      columnNumber: 23
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 348,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    size: 3,
    tag: "h3",
    text: "721",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 349,
      columnNumber: 23
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 360,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "column",
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 361,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 365,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    text: "Product",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 366,
      columnNumber: 23
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 370,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    size: 3,
    tag: "h3",
    text: "628",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 371,
      columnNumber: 23
    }
  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "column",
    paddingBottom: "md",
    vertical: "right",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 382,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 387,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    onClick: function onClick() {
      return alert('button clicked!');
    },
    text: "View full breakdown",
    variant: "link",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 388,
      columnNumber: 17
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 396,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["LineGraph"], {
    axisTitle: "Total Registration",
    chartData: data,
    height: "80%",
    id: "line-registration",
    legend: true,
    title: "Running Total",
    xAxisCategories: ['7 wks away', '6 wks away', '5 wks away', '4 wks away', '3 wks away', '2 wks away', '1 wk away', 'Start of Event'],
    yAxisMin: 0,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 397,
      columnNumber: 15
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    fixedSize: "40%",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 409,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 410,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["BarGraph"], {
    axisTitle: "Total Registered",
    chartData: totalRegistered,
    height: "30%",
    id: "total-attendees",
    xAxisCategories: ['\'17 LDN', '\'17 LA', '\'18 SF', '\'19 AMS', '\'20 TOR', '\'20 SF'],
    yAxisMin: 0,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 411,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["BarGraph"], {
    axisTitle: "New Attendees",
    chartData: newAttendees,
    height: "30%",
    id: "new-attendees",
    xAxisCategories: ['\'17 LDN', '\'17 LA', '\'18 SF', '\'19 AMS', '\'20 TOR', '\'20 SF'],
    yAxisMin: 0,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 419,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["BarGraph"], {
    axisTitle: "New Attendees",
    chartData: newAttendees,
    height: "30%",
    id: "new-attendees",
    xAxisCategories: ['\'17 LDN', '\'17 LA', '\'18 SF', '\'19 AMS', '\'20 TOR', '\'20 SF'],
    yAxisMin: 0,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 427,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["BarGraph"], {
    axisTitle: "Repeating Attendees",
    chartData: repeatingAttendees,
    height: "30%",
    id: "repeating-attendees",
    xAxisCategories: ['\'17 LDN', '\'17 LA', '\'18 SF', '\'19 AMS', '\'20 TOR', '\'20 SF'],
    yAxisMin: 0,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 435,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["BarGraph"], {
    axisTitle: "Graphic Designers",
    chartData: graphicDesigners,
    height: "30%",
    id: "graphic-designers",
    xAxisCategories: ['\'17 LDN', '\'17 LA', '\'18 SF', '\'19 AMS', '\'20 TOR', '\'20 SF'],
    yAxisMin: 0,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 443,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["BarGraph"], {
    axisTitle: "UX/UI",
    chartData: uxUi,
    height: "30%",
    id: "ux-ui",
    xAxisCategories: ['\'17 LDN', '\'17 LA', '\'18 SF', '\'19 AMS', '\'20 TOR', '\'20 SF'],
    yAxisMin: 0,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 451,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["BarGraph"], {
    axisTitle: "Product Designers",
    chartData: productDesigners,
    height: "30%",
    id: "product-designers",
    xAxisCategories: ['\'17 LDN', '\'17 LA', '\'18 SF', '\'19 AMS', '\'20 TOR', '\'20 SF'],
    yAxisMin: 0,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 459,
      columnNumber: 15
    }
  })))))));
};
/* harmony default export */ __webpack_exports__["default"] = (ConferenceStatistics);

/***/ }),

/***/ "./app/views/samples/crm_client_list/index.jsx":
/*!*****************************************************!*\
  !*** ./app/views/samples/crm_client_list/index.jsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/views/samples/crm_client_list/index.jsx",
  _this = undefined;


var CrmClientList = function CrmClientList() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    className: "bg_light",
    paddingTop: "md",
    paddingX: "md",
    spacing: "between",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    size: 3,
    tag: "h3",
    text: "Prospective Clients",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 9
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    onClick: function onClick() {
      return alert('button clicked!');
    },
    text: "Add Client",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 9
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Filter"], {
    filters: {
      'Start Date': 'Apr 19, 2020',
      'End Date': 'Apr 20, 2020'
    },
    marginTop: "md",
    marginX: "md",
    results: 0,
    sortOptions: {
      dateCreated: 'Date Created',
      // eslint-disable-next-line
      assignee: 'Assignee',
      // eslint-disable-next-line
      contact: 'Contact',
      // eslint-disable-next-line
      inquirySource: 'Inquiry Source'
    },
    sortValue: [{
      name: 'dateCreated',
      dir: 'asc'
    }],
    template: "single",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "row",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["TextInput"], {
    aria: {
      label: 'hello'
    },
    data: {
      say: 'hi',
      yell: 'go'
    },
    id: "unique-id",
    label: "Start Date",
    paddingRight: "md",
    placeholder: "Enter first name",
    value: "Apr 19, 2020",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["TextInput"], {
    aria: {
      label: 'hello'
    },
    data: {
      say: 'hi',
      yell: 'go'
    },
    id: "unique-id",
    label: "End Date",
    placeholder: "Enter first name",
    value: "Apr 20, 2020",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 9
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    spacing: "between",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    text: "Apply",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    text: "Clear",
    variant: "secondary",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 9
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "row",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Table"], {
    margin: "md",
    size: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80,
      columnNumber: 13
    }
  }, 'Contact'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 13
    }
  }, 'Date Created'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 13
    }
  }, 'Inquiry Source'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 13
    }
  }, 'Lead Status'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 13
    }
  }, 'Quote'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 13
    }
  }, 'Assignee'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 13
    }
  }, 'Actions'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["PersonContact"], {
    contacts: [{
      contactType: 'cell',
      contactValue: '3832919348'
    }, {
      contactType: 'email',
      contactValue: 'jesse.cortez@gmail.com'
    }],
    firstName: "Jesse",
    lastName: "Cortez",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Date"], {
    size: "xs",
    value: "2020-04-20T04:20:00.000Z",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    text: "Email",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    size: "xs",
    text: "hello@companyname.com",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["ProgressPills"], {
    active: 0,
    steps: 4,
    title: "Status:",
    value: "Not Started",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 121,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 128,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Currency"], {
    amount: "729.63",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 129,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 131,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    text: "Unassigned",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 132,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 134,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["CircleIconButton"], {
    icon: "ellipsis-h",
    variant: "secondary",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 135,
      columnNumber: 15
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["PersonContact"], {
    contacts: [{
      contactType: 'cell',
      contactValue: '8313455824'
    }, {
      contactType: 'email',
      contactValue: 'billbuch@yahoo.com'
    }],
    firstName: "Bill",
    lastName: "Buchanan",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 143,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 158,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Date"], {
    size: "xs",
    value: "2020-04-20T04:20:00.000Z",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 159,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 164,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    text: "Social Media",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 165,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    size: "xs",
    text: "Facebook",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 166,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 171,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["ProgressPills"], {
    active: 3,
    steps: 4,
    title: "Status:",
    value: "Negotiation",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 172,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 179,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Currency"], {
    amount: "534.40",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 180,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 182,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["User"], {
    align: "left",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Anna Black",
    orientation: "horizontal",
    title: "Project Coordinator",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 183,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 191,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["CircleIconButton"], {
    icon: "ellipsis-h",
    variant: "secondary",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 192,
      columnNumber: 15
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 198,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 199,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["PersonContact"], {
    contacts: [{
      contactType: 'cell',
      contactValue: '1582430782'
    }, {
      contactType: 'email',
      contactValue: 'effieguzman@comcast.net'
    }],
    firstName: "Effie",
    lastName: "Guzman",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 200,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 215,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Date"], {
    size: "xs",
    value: "2020-04-20T04:20:00.000Z",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 216,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 221,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    text: "Online Quote",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 222,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    size: "xs",
    text: "Landing Page",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 223,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 228,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["ProgressPills"], {
    active: 4,
    steps: 4,
    title: "Status:",
    value: "Contract",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 229,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 236,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Currency"], {
    amount: "392.26",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 237,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 239,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["User"], {
    align: "left",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Anna Black",
    orientation: "horizontal",
    title: "Project Coordinator",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 240,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 248,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["CircleIconButton"], {
    icon: "ellipsis-h",
    variant: "secondary",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 249,
      columnNumber: 15
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 255,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 256,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["PersonContact"], {
    contacts: [{
      contactType: 'cell',
      contactValue: '3859275970'
    }, {
      contactType: 'email',
      contactValue: 'rodneyboone@gmail.com'
    }],
    firstName: "Rodney",
    lastName: "Boone",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 257,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 272,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Date"], {
    size: "xs",
    value: "2020-04-20T04:20:00.000Z",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 273,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 278,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    text: "Internal",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 279,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    size: "xs",
    text: "Referral",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 280,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 285,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["ProgressPills"], {
    active: 4,
    steps: 4,
    title: "Status:",
    value: "Contract",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 286,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 293,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Currency"], {
    amount: "342.86",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 294,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 296,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["User"], {
    align: "left",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Anna Black",
    orientation: "horizontal",
    title: "Project Coordinator",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 297,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 305,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["CircleIconButton"], {
    icon: "ellipsis-h",
    variant: "secondary",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 306,
      columnNumber: 15
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 312,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 313,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["PersonContact"], {
    contacts: [{
      contactType: 'cell',
      contactValue: '2849186943'
    }, {
      contactType: 'email',
      contactValue: 'barbaramaxwell4@yahoo.com'
    }],
    firstName: "Barbara",
    lastName: "Maxwell",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 314,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 329,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Date"], {
    size: "xs",
    value: "2020-04-20T04:20:00.000Z",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 330,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 335,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    text: "Online Quote",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 336,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    size: "xs",
    text: "Main Website",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 337,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 342,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["ProgressPills"], {
    active: 3,
    steps: 4,
    title: "Status:",
    value: "Negotiation",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 343,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 350,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Currency"], {
    amount: "145.01",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 351,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 353,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["User"], {
    align: "left",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Anna Black",
    orientation: "horizontal",
    title: "Project Coordinator",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 354,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 362,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["CircleIconButton"], {
    icon: "ellipsis-h",
    variant: "secondary",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 363,
      columnNumber: 15
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 369,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 370,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["PersonContact"], {
    contacts: [{
      contactType: 'cell',
      contactValue: '6884927492'
    }, {
      contactType: 'email',
      contactValue: 'ellen.thornton@gmail.com'
    }],
    firstName: "Ellen",
    lastName: "Thornton",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 371,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 386,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Date"], {
    size: "xs",
    value: "2020-04-20T04:20:00.000Z",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 387,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 392,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    text: "Social Media",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 393,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    size: "xs",
    text: "Instagram",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 394,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 399,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["ProgressPills"], {
    active: 3,
    steps: 4,
    title: "Status:",
    value: "Negotiation",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 400,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 407,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Currency"], {
    amount: "25.27",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 408,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 410,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["User"], {
    align: "left",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Anna Black",
    orientation: "horizontal",
    title: "Project Coordinator",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 411,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 419,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["CircleIconButton"], {
    icon: "ellipsis-h",
    variant: "secondary",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 420,
      columnNumber: 15
    }
  })))))));
};
/* harmony default export */ __webpack_exports__["default"] = (CrmClientList);

/***/ }),

/***/ "./app/views/samples/crowdsourced_posts/index.jsx":
/*!********************************************************!*\
  !*** ./app/views/samples/crowdsourced_posts/index.jsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/views/samples/crowdsourced_posts/index.jsx",
  _this = undefined;


var trendingStories = [{
  headerColor: 'category_1',
  headerText: 'Finance',
  imageUrl: 'https://p-a6fbdk.t4.n0.cdn.getcloudapp.com/items/jkuYZ6rB/readit_image_1.png',
  cardText: 'IRS will allow employers to match their employees\' student loan...',
  icon: 'dollar-sign',
  variant: 'green',
  subReadit: 'r/PersonalFinance and more'
}, {
  headerColor: 'category_2',
  headerText: 'World News',
  imageUrl: 'https://p-a6fbdk.t4.n0.cdn.getcloudapp.com/items/wbuK75AO/readit_image_2.png',
  cardText: 'Hong Kong democrat Ted Hui confirms he will go into exile...',
  icon: 'globe',
  variant: 'yellow',
  subReadit: 'r/WorldNews and more'
}, {
  headerColor: 'category_3',
  headerText: 'Space',
  imageUrl: 'https://p-a6fbdk.t4.n0.cdn.getcloudapp.com/items/geuooly9/readit_image_3.png',
  cardText: 'Relaxing Inside the Space Station\'s Window to the World...',
  icon: 'space-shuttle',
  variant: 'blue',
  subReadit: 'r/Space and more'
}, {
  headerColor: 'category_4',
  headerText: 'Tech',
  imageUrl: 'https://p-a6fbdk.t4.n0.cdn.getcloudapp.com/items/WnulJpwd/readit_image_4.png',
  cardText: 'MIT programmed AI that can design its own robots...',
  icon: 'microchip',
  variant: 'royal',
  subReadit: 'r/Technology and more'
}];
var communities = [{
  subReadit: 'r/Fishing',
  variant: 'teal',
  icon: 'fish'
}, {
  subReadit: 'r/Outdoors',
  variant: 'green',
  icon: 'trees'
}, {
  subReadit: 'r/MostBeautiful',
  variant: 'yellow',
  icon: 'sun'
}, {
  subReadit: 'r/Camping',
  variant: 'red',
  icon: 'campfire'
}, {
  subReadit: 'r/Homestead',
  variant: 'blue',
  icon: 'farm'
}];
var trendingCommunities = [{
  subReadit: 'r/Food',
  variant: 'blue',
  icon: 'utensils',
  members: '1,239,257 members'
}, {
  subReadit: 'r/Gaming',
  variant: 'red',
  icon: 'gamepad',
  members: '4,125,270 members'
}, {
  subReadit: 'r/aww',
  variant: 'yellow',
  icon: 'paw',
  members: '2,037,816 members'
}, {
  subReadit: 'r/Movies',
  variant: 'royal',
  icon: 'camera-movie',
  members: '1,392,777 members'
}, {
  subReadit: 'r/GraphicDesign',
  variant: 'purple',
  icon: 'pencil-paintbrush',
  members: '28,270 members'
}];
var CrowdsourcedPosts = function CrowdsourcedPosts() {
  window.addEventListener('DOMContentLoaded', function () {
    var desktopOnly = document.querySelectorAll('.desktop-only');
    var mobileOnly = document.querySelectorAll('.mobile-only');
    var textInput = document.querySelector('.text-input-flex-item');
    var trendingImages = document.querySelectorAll('.trending-image');
    var postImageDesktop = document.querySelector('.post-image-desktop');
    var postImageMobile = document.querySelector('.post-image-mobile');
    var bodyContainer = document.querySelector('.body-container');
    var viewSize = function viewSize() {
      if (window.innerWidth < 1385) {
        desktopOnly.forEach(function (element) {
          return element.style.display = 'none';
        });
        mobileOnly.forEach(function (element) {
          return element.style.display = '';
        });
        bodyContainer.style.flexBasis = '';
        textInput.style.flexBasis = '60%';
        bodyContainer.style.marginRight = '8px';
        bodyContainer.style.marginLeft = '8px';
        postImageMobile.style.width = '100%';
      } else {
        mobileOnly.forEach(function (element) {
          return element.style.display = 'none';
        });
        desktopOnly.forEach(function (element) {
          return element.style.display = '';
        });
        bodyContainer.style.flexBasis = '65%';
        postImageDesktop.style.width = '75%';
        postImageDesktop.style.display = 'block';
        postImageDesktop.style.margin = 'auto';
      }
      trendingImages.forEach(function (element) {
        return element.style.width = '100%';
      });
    };
    viewSize();
    window.addEventListener('resize', function () {
      return viewSize();
    });
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Background"], {
    backgroundColor: "white",
    paddingLeft: "md",
    paddingY: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    classname: "flex-container",
    spacing: "between",
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 125,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 126,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 127,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconCircle"], {
    icon: "robot",
    size: "md",
    variant: "royal",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 128,
      columnNumber: 17
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 134,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    className: "desktop-only",
    marginLeft: "xs",
    size: 2,
    text: "readit",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 135,
      columnNumber: 17
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    className: "text-input-flex-item",
    fixedSize: "30%",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 144,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["TextInput"], {
    marginTop: "sm",
    placeholder: "Search",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 148,
      columnNumber: 13
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 153,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    className: "desktop-only",
    marginRight: "sm",
    text: "Log In",
    variant: "secondary",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 154,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    className: "desktop-only",
    marginRight: "sm",
    text: "Sign Up",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 160,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    marginRight: "md",
    padding: "none",
    variant: "link",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 165,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    icon: "user",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 170,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    icon: "caret-down",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 171,
      columnNumber: 15
    }
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    horizontal: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 178,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    className: "body-container",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 179,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    paddingBottom: "xs",
    paddingTop: "sm",
    text: "Trending Today",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 181,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Layout"], {
    header: true,
    layout: "collection",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 186,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Layout"].Body, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 190,
      columnNumber: 13
    }
  }, trendingStories.map(function (story) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
      key: story.headerText,
      padding: "none",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 192,
        columnNumber: 17
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Header, {
      headerColor: story.headerColor,
      padding: "sm",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 196,
        columnNumber: 19
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
      dark: true,
      text: story.headerText,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 200,
        columnNumber: 21
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Body, {
      padding: "none",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 205,
        columnNumber: 19
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Image"], {
      className: "trending-image",
      url: story.imageUrl,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 206,
        columnNumber: 21
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
      padding: "xs",
      paddingY: "none",
      text: story.cardText,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 210,
        columnNumber: 21
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
      classname: "flex-container",
      padding: "xs",
      vertical: "center",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 215,
        columnNumber: 21
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 220,
        columnNumber: 23
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconCircle"], {
      icon: story.icon,
      size: "xs",
      variant: story.variant,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 221,
        columnNumber: 25
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
      marginLeft: "xs",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 227,
        columnNumber: 23
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
      size: "xs",
      text: story.subReadit,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 228,
        columnNumber: 25
      }
    })))));
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    paddingBottom: "xs",
    paddingTop: "sm",
    text: "Popular Posts",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 242,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mobile-only",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 248,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 250,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Nav"], {
    className: "mobile-only",
    orientation: "vertical",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 251,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    active: true,
    iconLeft: "rocket",
    link: "#",
    text: "Best",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 255,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    iconLeft: "fire",
    link: "#",
    text: "Hot",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 261,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    iconLeft: "star",
    link: "#",
    text: "New",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 266,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    iconLeft: "chart-line",
    link: "#",
    text: "Top",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 271,
      columnNumber: 17
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    marginTop: "sm",
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 280,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 284,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    padding: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 285,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 288,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconCircle"], {
    icon: "lightbulb-on",
    size: "xs",
    variant: "yellow",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 289,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    marginLeft: "xs",
    size: 4,
    text: "r/LifeProTips",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 294,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    color: "light",
    marginLeft: "xs",
    text: "\u2022 Posted by u/xhuljanomuca",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 299,
      columnNumber: 21
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    paddingTop: "xs",
    text: "LPT: If you ever need a program you want for free (for example a video/photo editor) don\u2019t search \\ for \u201Cfree,\u201D search for \u201Copen source\u201D to avoid limited trial versions, adverts and malware",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 305,
      columnNumber: 19
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Pill"], {
    marginTop: "sm",
    text: "Computers",
    variant: "primary",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 310,
      columnNumber: 19
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    paddingTop: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 315,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "comment-alt",
    text: "1.4k Comments",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 316,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "share",
    marginLeft: "sm",
    text: "Share",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 320,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "folder-plus",
    marginLeft: "sm",
    text: "Save",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 325,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "ellipsis-h",
    marginLeft: "sm",
    text: "",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 330,
      columnNumber: 21
    }
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    marginTop: "sm",
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 341,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 345,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    fixedSize: "100%",
    padding: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 346,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 350,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconCircle"], {
    icon: "camera",
    size: "xs",
    variant: "blue",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 351,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    marginLeft: "xs",
    size: 4,
    text: "r/Pics",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 356,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    color: "light",
    marginLeft: "xs",
    text: "\u2022 Posted by u/stephenmckeon",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 361,
      columnNumber: 21
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 367,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    paddingBottom: "sm",
    paddingTop: "xs",
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 368,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 373,
      columnNumber: 23
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    text: "Foggy morning.",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 374,
      columnNumber: 25
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    marginLeft: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 376,
      columnNumber: 23
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Pill"], {
    text: "OC",
    variant: "success",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 377,
      columnNumber: 25
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Image"], {
    className: "post-image-mobile",
    url: "https://p-a6fbdk.t4.n0.cdn.getcloudapp.com/items/d5uPEJbY/readit_image_5.png",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 384,
      columnNumber: 19
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    paddingTop: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 388,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "comment-alt",
    text: "1.4k Comments",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 389,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "share",
    marginLeft: "sm",
    text: "Share",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 393,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "folder-plus",
    marginLeft: "sm",
    text: "Save",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 398,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "ellipsis-h",
    marginLeft: "sm",
    text: "",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 403,
      columnNumber: 21
    }
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    marginTop: "sm",
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 414,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 418,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    padding: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 419,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 422,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconCircle"], {
    icon: "browser",
    size: "xs",
    variant: "purple",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 423,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    marginLeft: "xs",
    size: 4,
    text: "r/WebDesign",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 428,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    color: "light",
    marginLeft: "xs",
    text: "\u2022 Posted by u/creativebloq",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 433,
      columnNumber: 21
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    paddingRight: "md",
    paddingTop: "xs",
    size: "4",
    text: "Use white space!",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 439,
      columnNumber: 19
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    paddingTop: "sm",
    text: "It seems to be the hardest concept for developers to grasp: the biggest benefit to having the proper amount of \\ white space is giving the user a break. Breaks are important for processing information, especially when there's \\ a fair amount to process. It's why we have paragraphs and sentences instead of just a single, long block of running text.",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 445,
      columnNumber: 19
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    paddingTop: "sm",
    text: "The key is to ensure that white space has a relationship with other objects on the page, including the other space. \\ If you have a single column of white space, make sure there's another single column of white space around to balance it.",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 451,
      columnNumber: 19
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    color: "light",
    paddingTop: "sm",
    text: "For vertical space, just use fractions of the body font size. I tend to keep things simple and use a scale of .25, \\ but there are several other scales that you can use.",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 456,
      columnNumber: 19
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    color: "light",
    paddingTop: "sm",
    text: "For example, if the body font size is 16px(1em): 4, 8, 12, 16, 20, 24, 28, 32, 40, 48. \\ This allows for choosing font sizes by simply moving up and down the scale as I want larger or smaller type...",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 462,
      columnNumber: 19
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    paddingTop: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 468,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "comment-alt",
    text: "1.4k Comments",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 469,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "share",
    marginLeft: "sm",
    text: "Share",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 473,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "folder-plus",
    marginLeft: "sm",
    text: "Save",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 478,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "ellipsis-h",
    marginLeft: "sm",
    text: "",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 483,
      columnNumber: 21
    }
  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "desktop-only",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 494,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Layout"], {
    position: "right",
    size: "xl",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 495,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Layout"].Body, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 499,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 501,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    spacing: "between",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 502,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 503,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 504,
      columnNumber: 23
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Nav"], {
    orientation: "horizontal",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 505,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    active: true,
    iconLeft: "rocket",
    link: "#",
    text: "Best",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 506,
      columnNumber: 27
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    iconLeft: "fire",
    link: "#",
    text: "Hot",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 512,
      columnNumber: 27
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    iconLeft: "star",
    link: "#",
    text: "New",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 517,
      columnNumber: 27
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    iconLeft: "chart-line",
    link: "#",
    text: "Top",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 522,
      columnNumber: 27
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    marginTop: "xs",
    variant: "link",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 528,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    icon: "ellipsis-h",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 532,
      columnNumber: 27
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 536,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    marginTop: "xs",
    paddingRight: "md",
    variant: "link",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 537,
      columnNumber: 23
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    icon: "th-large",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 542,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    icon: "caret-down",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 543,
      columnNumber: 25
    }
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    marginTop: "sm",
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 550,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 554,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    marginLeft: "sm",
    marginTop: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 555,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    icon: "arrow-alt-up",
    marginLeft: "none",
    size: "1x",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 559,
      columnNumber: 23
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    margin: "xs",
    marginLeft: "none",
    size: 4,
    text: "66.2k",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 564,
      columnNumber: 23
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    icon: "arrow-alt-down",
    marginLeft: "none",
    size: "1x",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 570,
      columnNumber: 23
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    paddingX: "xs",
    paddingY: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 576,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 580,
      columnNumber: 23
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconCircle"], {
    icon: "lightbulb-on",
    size: "xs",
    variant: "yellow",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 581,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    marginLeft: "xs",
    size: 4,
    text: "r/LifeProTips",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 586,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    color: "light",
    marginLeft: "xs",
    text: "\u2022 Posted by u/xhuljanomuca 1 month ago",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 591,
      columnNumber: 25
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    paddingRight: "md",
    paddingTop: "xs",
    text: "LPT: If you ever need a program you want for free (for example a video/photo editor) don\u2019t search \\ for \u201Cfree,\u201D search for \u201Copen source\u201D to avoid limited trial versions, adverts and malware",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 597,
      columnNumber: 23
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Pill"], {
    marginTop: "sm",
    text: "Computers",
    variant: "primary",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 603,
      columnNumber: 23
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    paddingTop: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 608,
      columnNumber: 23
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "comment-alt",
    text: "1.4k Comments",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 609,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "share",
    marginLeft: "sm",
    text: "Share",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 613,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "folder-plus",
    marginLeft: "sm",
    text: "Save",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 618,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "ellipsis-h",
    marginLeft: "sm",
    text: "",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 623,
      columnNumber: 25
    }
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    marginTop: "sm",
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 634,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 638,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    marginLeft: "sm",
    marginTop: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 639,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    icon: "arrow-alt-up",
    marginLeft: "none",
    size: "1x",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 643,
      columnNumber: 23
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    margin: "xs",
    marginLeft: "none",
    size: 4,
    text: "8297",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 648,
      columnNumber: 23
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    icon: "arrow-alt-down",
    marginLeft: "none",
    size: "1x",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 654,
      columnNumber: 23
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    fixedSize: "85%",
    paddingX: "xs",
    paddingY: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 660,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 665,
      columnNumber: 23
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconCircle"], {
    icon: "camera",
    size: "xs",
    variant: "blue",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 666,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    marginLeft: "xs",
    size: 4,
    text: "r/Pics",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 671,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    color: "light",
    marginLeft: "xs",
    text: "\u2022 Posted by u/stephenmckeon 13 hours ago",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 676,
      columnNumber: 25
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 682,
      columnNumber: 23
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    paddingTop: "xs",
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 683,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 687,
      columnNumber: 27
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    text: "Foggy morning.",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 688,
      columnNumber: 29
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    marginLeft: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 690,
      columnNumber: 27
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Pill"], {
    text: "OC",
    variant: "success",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 691,
      columnNumber: 29
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    marginTop: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 698,
      columnNumber: 23
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Image"], {
    className: "post-image-desktop",
    url: "https://p-a6fbdk.t4.n0.cdn.getcloudapp.com/items/d5uPEJbY/readit_image_5.png",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 699,
      columnNumber: 25
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    paddingTop: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 704,
      columnNumber: 23
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "comment-alt",
    text: "1.4k Comments",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 705,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "share",
    marginLeft: "sm",
    text: "Share",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 709,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "folder-plus",
    marginLeft: "sm",
    text: "Save",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 714,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "ellipsis-h",
    marginLeft: "sm",
    text: "",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 719,
      columnNumber: 25
    }
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    marginTop: "sm",
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 730,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 734,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    marginLeft: "sm",
    marginTop: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 735,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    icon: "arrow-alt-up",
    marginLeft: "none",
    size: "1x",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 739,
      columnNumber: 23
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    margin: "xs",
    marginLeft: "none",
    size: 4,
    text: "467",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 744,
      columnNumber: 23
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    icon: "arrow-alt-down",
    marginLeft: "none",
    size: "1x",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 750,
      columnNumber: 23
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    paddingLeft: "xs",
    paddingRight: "xl",
    paddingY: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 756,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 761,
      columnNumber: 23
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconCircle"], {
    icon: "browser",
    size: "xs",
    variant: "purple",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 762,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    marginLeft: "xs",
    size: 4,
    text: "r/WebDesign",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 767,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    color: "light",
    marginLeft: "xs",
    text: "\u2022 Posted by u/creativebloq 1 week ago",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 772,
      columnNumber: 25
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    paddingRight: "md",
    paddingTop: "xs",
    size: "4",
    text: "Use white space!",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 778,
      columnNumber: 23
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    paddingTop: "sm",
    text: "It seems to be the hardest concept for developers to grasp: the biggest benefit to having the proper amount of \\ white space is giving the user a break. Breaks are important for processing information, especially when there's \\ a fair amount to process. It's why we have paragraphs and sentences instead of just a single, long block of running text.",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 784,
      columnNumber: 23
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    paddingTop: "sm",
    text: "The key is to ensure that white space has a relationship with other objects on the page, including the other space. \\ If you have a single column of white space, make sure there's another single column of white space around to balance it.",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 790,
      columnNumber: 23
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    color: "light",
    paddingTop: "sm",
    text: "For vertical space, just use fractions of the body font size. I tend to keep things simple and use a scale of .25, \\ but there are several other scales that you can use.",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 795,
      columnNumber: 23
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    color: "light",
    paddingTop: "sm",
    text: "For example, if the body font size is 16px(1em): 4, 8, 12, 16, 20, 24, 28, 32, 40, 48. \\ This allows for choosing font sizes by simply moving up and down the scale as I want larger or smaller type...",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 801,
      columnNumber: 23
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    paddingTop: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 807,
      columnNumber: 23
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "comment-alt",
    text: "1.4k Comments",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 808,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "share",
    marginLeft: "sm",
    text: "Share",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 812,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "folder-plus",
    marginLeft: "sm",
    text: "Save",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 817,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "ellipsis-h",
    marginLeft: "sm",
    text: "",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 822,
      columnNumber: 25
    }
  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Background"], {
    backgroundColor: "light",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 834,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Layout"].Side, {
    marginLeft: "md",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 835,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    header: true,
    padding: "none",
    shadow: "deeper",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 837,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Header, {
    headerColor: "category_1",
    padding: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 842,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 846,
      columnNumber: 23
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    dark: true,
    padding: "xs",
    paddingRight: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 847,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    icon: "tree-large",
    size: "4x",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 852,
      columnNumber: 27
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    dark: true,
    margin: "xs",
    marginRight: "xs",
    text: "Outdoor communities \u2014 they're really out there",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 857,
      columnNumber: 25
    }
  }))), communities.map(function (community) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
      padding: "xs",
      paddingLeft: "sm",
      vertical: "center",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 868,
        columnNumber: 25
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 873,
        columnNumber: 27
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconCircle"], {
      icon: community.icon,
      size: "sm",
      variant: community.variant,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 874,
        columnNumber: 29
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 880,
        columnNumber: 27
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
      marginLeft: "xs",
      size: 4,
      text: community.subReadit,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 881,
        columnNumber: 29
      }
    }))), community !== communities[communities.length - 1] ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 889,
        columnNumber: 27
      }
    }) : null);
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Layout"].Body, {
    paddingX: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 894,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    fullWidth: true,
    marginTop: "xs",
    text: "VIEW ALL",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 895,
      columnNumber: 23
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    paddingY: "sm",
    spacing: "between",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 900,
      columnNumber: 23
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Badge"], {
    padding: "xs",
    text: "Top",
    variant: "neutral",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 904,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Badge"], {
    padding: "xs",
    text: "Near You",
    variant: "neutral",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 909,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Badge"], {
    padding: "xs",
    text: "Aww",
    variant: "neutral",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 914,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Badge"], {
    padding: "xs",
    text: "Fitness",
    variant: "neutral",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 919,
      columnNumber: 25
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    marginTop: "sm",
    padding: "xs",
    shadow: "deeper",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 929,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    margin: "xs",
    spacing: "between",
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 934,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 939,
      columnNumber: 23
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    icon: "shield-alt",
    marginRight: "sm",
    size: "2x",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 940,
      columnNumber: 25
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 946,
      columnNumber: 23
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    size: 4,
    text: "Readit Premium",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 947,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    size: "xs",
    text: "The best Readit experience, with monthly Coins",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 951,
      columnNumber: 25
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 956,
      columnNumber: 23
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    paddingX: "sm",
    text: "TRY NOW",
    variant: "secondary",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 957,
      columnNumber: 25
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    marginTop: "sm",
    padding: "sm",
    shadow: "deeper",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 967,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    padding: "xs",
    size: 4,
    text: "Trending Communities",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 972,
      columnNumber: 21
    }
  }), trendingCommunities.map(function (community) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
      key: community.subReadit,
      marginY: "xs",
      spacing: "between",
      vertical: "center",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 979,
        columnNumber: 23
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 985,
        columnNumber: 25
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 986,
        columnNumber: 27
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 987,
        columnNumber: 29
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconCircle"], {
      icon: community.icon,
      size: "sm",
      variant: community.variant,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 988,
        columnNumber: 31
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 994,
        columnNumber: 29
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
      marginLeft: "xs",
      size: 4,
      text: community.subReadit,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 995,
        columnNumber: 31
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
      color: "light",
      marginLeft: "xs",
      text: community.members,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1000,
        columnNumber: 31
      }
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1008,
        columnNumber: 25
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      text: "Join",
      variant: "secondary",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1009,
        columnNumber: 27
      }
    })));
  })))))))));
};
/* harmony default export */ __webpack_exports__["default"] = (CrowdsourcedPosts);

/***/ }),

/***/ "./app/views/samples/music_app/index.jsx":
/*!***********************************************!*\
  !*** ./app/views/samples/music_app/index.jsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
var _excluded = ["icon"];
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/views/samples/music_app/index.jsx",
  _this = undefined;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }


var yourLibraryLinks = ['Made For You', 'Recently Played', 'Liked Songs', 'Albums', 'Artists', 'Podcasts'];
var playlists = ['podcasts', 'THENX', 'Adrenaline Workout', 'New Music Friday', 'RetroWave / Outrun', 'Tiki Torch'];
var randomImageUrl = function randomImageUrl(id) {
  return "https://picsum.photos/id/".concat(id, "/175");
};
var playlistCardSubtext = 'A daily show for anyone who works a regular job and wants to start an income-earning pr...';
var playlistCardTitles = ['Side Hustle School', 'The Devslopes Podcast with Mark Wahlbeck', 'Borrasca', 'Philosophize This!', 'How I Built This With Guy Raz'];
var SmallIconPadded = function SmallIconPadded(_ref) {
  var icon = _ref.icon,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], Object.assign({
    dark: true,
    icon: icon,
    marginX: "sm"
  }, rest, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 3
    }
  }));
};
var BottomRightIcon = function BottomRightIcon(_ref2) {
  var icon = _ref2.icon;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    dark: true,
    paddingRight: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    dark: true,
    icon: icon,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 5
    }
  }));
};
var MusicApp = function MusicApp() {
  window.addEventListener('DOMContentLoaded', function () {
    var fullHeightElems = document.querySelectorAll('.fullHeight');
    fullHeightElems.forEach(function (elem) {
      return elem.style.height = '100%';
    });
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Background"], {
    backgroundColor: "dark",
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "column",
    vertical: "stretch",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    grow: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Layout"], {
    collapse: "lg",
    dark: true,
    position: "left",
    size: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Layout"].Side, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    className: "fullHeight",
    orientation: "column",
    spacing: "between",
    vertical: "stretch",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    paddingRight: "sm",
    spacing: "between",
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Table"], {
    container: false,
    dark: true,
    disableHover: true,
    marginTop: "md",
    responsive: "none",
    size: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 23
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["TableRow"], {
    dark: true,
    sideHighlightColor: "category_2",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 27
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    dark: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    dark: true,
    icon: "home",
    marginRight: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 31
    }
  }), 'Home'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 27
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    dark: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    dark: true,
    icon: "music",
    marginRight: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 31
    }
  }), 'Browse'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 27
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    dark: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    dark: true,
    icon: "radio",
    marginRight: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 31
    }
  }), 'Radio')))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 121,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    paddingLeft: "lg",
    paddingTop: "lg",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 122,
      columnNumber: 21
    }
  }, 'Your Library'), yourLibraryLinks.map(function (linkText, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
      color: "lighter",
      dark: true,
      key: index,
      padding: "none",
      paddingBottom: "xs",
      paddingLeft: "lg",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 130,
        columnNumber: 25
      }
    }, linkText);
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 143,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    paddingLeft: "lg",
    paddingTop: "lg",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 144,
      columnNumber: 21
    }
  }, 'Playlists'), playlists.map(function (linkText, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
      color: "lighter",
      dark: true,
      key: index,
      padding: "none",
      paddingBottom: "xs",
      paddingLeft: "lg",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 152,
        columnNumber: 25
      }
    }, linkText);
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    grow: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 166,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 167,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    dark: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 168,
      columnNumber: 19
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    dark: true,
    paddingY: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 169,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    dark: true,
    icon: "plus-circle",
    marginLeft: "lg",
    marginRight: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 173,
      columnNumber: 21
    }
  }), 'New Playlist'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    dark: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 181,
      columnNumber: 19
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Layout"].Body, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 186,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    className: "fullHeight",
    orientation: "column",
    vertical: "stretch",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 187,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    dark: true,
    paddingLeft: "lg",
    paddingY: "xs",
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 193,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    color: "lighter",
    dark: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 199,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    dark: true,
    icon: "chevron-left",
    marginX: "lg",
    padding: "none",
    size: "1x",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 203,
      columnNumber: 21
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    dark: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 211,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    dark: true,
    icon: "chevron-right",
    marginRight: "lg",
    padding: "none",
    size: "1x",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 212,
      columnNumber: 21
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["TextInput"], {
    dark: true,
    placeholder: "Search",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 221,
      columnNumber: 19
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    grow: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 226,
      columnNumber: 19
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["User"], {
    align: "left",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    dark: true,
    name: "Maria Illescas",
    orientation: "horizontal",
    paddingRight: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 228,
      columnNumber: 19
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    dark: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 236,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    dark: true,
    icon: "chevron-down",
    marginRight: "sm",
    padding: "none",
    size: "1x",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 237,
      columnNumber: 21
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    grow: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 247,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    dark: true,
    padding: "none",
    paddingBottom: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 249,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    marginX: "lg",
    orientation: "column",
    paddingTop: "lg",
    paddingX: "xl",
    vertical: "stretch",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 254,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    dark: true,
    marginBottom: "sm",
    size: 1,
    text: "Home",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 261,
      columnNumber: 23
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    dark: true,
    size: 4,
    text: "Your top podcasts",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 268,
      columnNumber: 23
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    dark: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 273,
      columnNumber: 23
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    paddingTop: "sm",
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 274,
      columnNumber: 23
    }
  }, playlistCardTitles.map(function (title, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
      fixedSize: "175px",
      key: i,
      paddingRight: "sm",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 280,
        columnNumber: 29
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Image"], {
      url: randomImageUrl(Math.floor(1000 * Math.random())),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 285,
        columnNumber: 31
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
      dark: true,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 286,
        columnNumber: 31
      }
    }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
      dark: true,
      size: "xs",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 287,
        columnNumber: 31
      }
    }, playlistCardSubtext));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    spacing: "between",
    vertical: "bottom",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 298,
      columnNumber: 23
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 302,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    dark: true,
    paddingTop: "sm",
    size: 4,
    text: "Made for you",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 303,
      columnNumber: 27
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    dark: true,
    size: "xs",
    text: "Get better recommendations the more you listen.",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 309,
      columnNumber: 27
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 315,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    paddingBottom: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 316,
      columnNumber: 27
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    color: "lighter",
    dark: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 317,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    dark: true,
    icon: "chevron-left",
    marginRight: "sm",
    padding: "none",
    size: "1x",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 321,
      columnNumber: 31
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    dark: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 329,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    dark: true,
    icon: "chevron-right",
    padding: "none",
    size: "1x",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 330,
      columnNumber: 31
    }
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    dark: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 340,
      columnNumber: 23
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    paddingTop: "sm",
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 341,
      columnNumber: 23
    }
  }, _toConsumableArray(Array(6)).map(function (_, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
      fixedSize: "175px",
      key: i,
      paddingRight: "sm",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 347,
        columnNumber: 29
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Image"], {
      url: randomImageUrl(Math.floor(1000 * Math.random())),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 352,
        columnNumber: 31
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
      dark: true,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 353,
        columnNumber: 31
      }
    }, "Daily Mix ".concat(i + 1)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
      dark: true,
      size: "xs",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 354,
        columnNumber: 31
      }
    }, playlistCardSubtext));
  }))))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Background"], {
    backgroundColor: "dark",
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 373,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    horizontal: "center",
    padding: "xs",
    vertical: "stretch",
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 377,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    fixedSize: "22%",
    grow: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 383,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 387,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Image"], {
    marginLeft: "xs",
    url: randomImageUrl(Math.floor(1000 * Math.random())),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 390,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    dark: true,
    paddingLeft: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 394,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    dark: true,
    size: 4,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 398,
      columnNumber: 19
    }
  }, 'Change Will Come', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    dark: true,
    icon: "heart",
    marginLeft: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 403,
      columnNumber: 21
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    dark: true,
    size: "xs",
    text: "Cut Snake",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 409,
      columnNumber: 19
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    fixedSize: "56%",
    grow: true,
    marginTop: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 418,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    horizontal: "center",
    orientation: "column",
    vertical: "stretch",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 423,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    dark: true,
    marginBottom: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 428,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    horizontal: "center",
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 432,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SmallIconPadded, {
    icon: "random",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 436,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SmallIconPadded, {
    icon: "step-backward",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 437,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SmallIconPadded, {
    icon: "play-circle",
    size: "2x",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 438,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SmallIconPadded, {
    icon: "step-forward",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 442,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SmallIconPadded, {
    icon: "repeat",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 443,
      columnNumber: 21
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    horizontal: "center",
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 446,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    dark: true,
    marginRight: "sm",
    text: "2:00",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 450,
      columnNumber: 19
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    grow: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 455,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["ProgressSimple"], {
    muted: true,
    percent: 20,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 456,
      columnNumber: 21
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    dark: true,
    marginLeft: "sm",
    text: "10:00",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 461,
      columnNumber: 19
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    fixedSize: "22%",
    grow: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 470,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    className: "fullHeight",
    horizontal: "right",
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 474,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(BottomRightIcon, {
    icon: "list-music",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 479,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(BottomRightIcon, {
    icon: "computer-speaker",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 480,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(BottomRightIcon, {
    icon: "volume",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 481,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    fixedSize: "100px",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 482,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["ProgressSimple"], {
    muted: true,
    paddingRight: "md",
    percent: 30,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 483,
      columnNumber: 19
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(BottomRightIcon, {
    icon: "expand-alt",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 489,
      columnNumber: 17
    }
  })))))));
};
/* harmony default export */ __webpack_exports__["default"] = (MusicApp);

/***/ }),

/***/ "./app/views/samples/news_magazine/index.jsx":
/*!***************************************************!*\
  !*** ./app/views/samples/news_magazine/index.jsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/views/samples/news_magazine/index.jsx",
  _this = undefined;


var NewsMagazine = function NewsMagazine() {
  window.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[class*="pb_image_kit"]').forEach(function (element) {
      element.style.width = '100%';
      element.style.height = '200px';
    });
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Layout"], {
    layout: "collection_detail",
    padding: "lg",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    padding: "md",
    size: "lg",
    text: "News Stories",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Nav"], {
    link: "#",
    marginTop: "sm",
    orientation: "vertical",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    link: "#",
    text: "All News",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    link: "#",
    text: "Top Stories",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    active: true,
    link: "#",
    text: "National",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Nav"], {
    variant: "subtle",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    active: true,
    link: "#",
    text: "All",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    link: "#",
    text: "Planet Money",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    link: "#",
    text: "Books",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    link: "#",
    text: "Books, News, and Features",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    link: "#",
    text: "Science",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    link: "#",
    text: "Politics",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    link: "#",
    text: "National Security",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    link: "#",
    text: "Environment",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    link: "#",
    text: "Shots - Health News",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    link: "#",
    text: "Analysis",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 17
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    link: "#",
    text: "Files",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 15
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Layout"].Body, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Header, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    dark: true,
    text: "Planet Money",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Body, {
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Image"], {
    url: "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1266&q=80",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    paddingLeft: "sm",
    paddingTop: "sm",
    size: 4,
    tag: "h4",
    text: "Where\u2019d the Money Go, and Other Questions",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    paddingY: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "row",
    paddingBottom: "sm",
    paddingX: "sm",
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    paddingRight: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "share-alt",
    text: "391",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 121,
      columnNumber: 21
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    paddingRight: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 126,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "eye",
    text: "2,039",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 127,
      columnNumber: 21
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 132,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "comments",
    text: "89",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 133,
      columnNumber: 21
    }
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 143,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Header, {
    headerColor: "category_2",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 144,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    dark: true,
    text: "World",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 145,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Body, {
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 150,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Image"], {
    url: "https://images.unsplash.com/photo-1500202352583-7b2fc394ed15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 151,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    paddingLeft: "sm",
    paddingTop: "sm",
    size: 4,
    tag: "h4",
    text: "U.K. Willing To Admit 3 Million If China Adopts Security Law",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 152,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    paddingY: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 159,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "row",
    paddingBottom: "sm",
    paddingX: "sm",
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 160,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    paddingRight: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 166,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "share-alt",
    text: "304",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 167,
      columnNumber: 21
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    paddingRight: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 172,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "eye",
    text: "5,032",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 173,
      columnNumber: 21
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 178,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "comments",
    text: "102",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 179,
      columnNumber: 21
    }
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 189,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Header, {
    headerColor: "category_3",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 190,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    dark: true,
    text: "Books",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 191,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Body, {
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 196,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Image"], {
    url: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 197,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    paddingLeft: "sm",
    paddingTop: "sm",
    size: 4,
    tag: "h4",
    text: "Opinion: Harry Potter's Magic Fades When His Creator Tweets",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 198,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    paddingY: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 205,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "row",
    paddingBottom: "sm",
    paddingX: "sm",
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 206,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    paddingRight: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 212,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "share-alt",
    text: "201",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 213,
      columnNumber: 21
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    paddingRight: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 218,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "eye",
    text: "890",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 219,
      columnNumber: 21
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 224,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "comments",
    text: "2",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 225,
      columnNumber: 21
    }
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 235,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Header, {
    headerColor: "category_4",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 236,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    dark: true,
    text: "National",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 237,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Body, {
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 242,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Image"], {
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 243,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    paddingTop: "sm",
    paddingX: "sm",
    size: 4,
    tag: "h4",
    text: "1st U.S. Woman To Walk In Space Dives To Deepest Point In Ocean",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 244,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    paddingY: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 251,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "row",
    paddingBottom: "sm",
    paddingX: "sm",
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 252,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    paddingRight: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 258,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "share-alt",
    text: "245",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 259,
      columnNumber: 21
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    paddingRight: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 264,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "eye",
    text: "10,302",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 265,
      columnNumber: 21
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 270,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "comments",
    text: "89",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 271,
      columnNumber: 21
    }
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 281,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Header, {
    headerColor: "category_5",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 282,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    dark: true,
    text: "Books, News, and Features",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 283,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Body, {
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 288,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Image"], {
    url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 289,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    paddingLeft: "sm",
    paddingTop: "sm",
    size: 4,
    tag: "h4",
    text: "Publishers Sue Internet Archive For Mass Copyright Infringement",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 290,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    paddingY: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 297,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "row",
    paddingBottom: "sm",
    paddingX: "sm",
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 298,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    paddingRight: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 304,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "share-alt",
    text: "84",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 305,
      columnNumber: 21
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    paddingRight: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 310,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "eye",
    text: "5,592",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 311,
      columnNumber: 21
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 316,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "comments",
    text: "104",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 317,
      columnNumber: 21
    }
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 327,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Header, {
    headerColor: "category_6",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 328,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Caption"], {
    dark: true,
    text: "Science",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 329,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"].Body, {
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 334,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Image"], {
    url: "https://images.unsplash.com/photo-1558677949-260173506bbf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 335,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    paddingLeft: "sm",
    paddingTop: "sm",
    size: 4,
    tag: "h4",
    text: "New Book Argues Migration Isn\u2019t A Crisis \u2014 It\u2019s The Solution",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 336,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    paddingY: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 343,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "row",
    paddingBottom: "sm",
    paddingX: "sm",
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 344,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    paddingRight: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 350,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "share-alt",
    text: "54",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 351,
      columnNumber: 21
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    paddingRight: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 356,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "eye",
    text: "3,982",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 357,
      columnNumber: 21
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 362,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "comments",
    text: "12",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 363,
      columnNumber: 21
    }
  }))))))));
};
/* harmony default export */ __webpack_exports__["default"] = (NewsMagazine);

/***/ }),

/***/ "./app/views/samples/trending_repositories/index.jsx":
/*!***********************************************************!*\
  !*** ./app/views/samples/trending_repositories/index.jsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! playbook-ui */ "../playbook/dist/playbook.js");
/* harmony import */ var playbook_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(playbook_ui__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/jasper.furniss/playbook/playbook-website/app/views/samples/trending_repositories/index.jsx",
  _this = undefined;


var TrendingRepositories = function TrendingRepositories() {
  window.addEventListener('DOMContentLoaded', function () {
    var mobileView = document.querySelector('.nav-bar-header-mobile');
    var desktopView = document.querySelector('.nav-bar-header-desktop');
    var cardBody = document.querySelector('.card_body_marg');
    var viewSize = function viewSize() {
      if (window.innerWidth < 415) {
        mobileView.style.display = 'block';
        desktopView.style.display = 'none';
        cardBody.style.cssText = 'margin:8px!important;';
      } else {
        mobileView.style.display = 'none';
        desktopView.style.display = 'block';
        cardBody.style.cssText = 'margin:40px!important;';
      }
    };
    viewSize();
    window.addEventListener('resize', function () {
      viewSize();
    });
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "nav-bar-header-desktop",
    style: {
      display: 'none'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Background"], {
    backgroundColor: "white",
    paddingBottom: "none",
    paddingTop: "md",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    paddingLeft: "xl",
    paddingRight: "md",
    spacing: "between",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Nav"], {
    link: "#",
    marginLeft: "sm",
    orientation: "horizontal",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    link: "#",
    text: "Explore",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    link: "#",
    text: "Topics",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    active: true,
    link: "#",
    text: "Trending",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    link: "#",
    text: "Collections",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    link: "#",
    text: "Events",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    link: "#",
    text: "Sponsors",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 17
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    marginRight: "lg",
    onClick: function onClick() {
      return alert('button clicked!');
    },
    text: "Get email updates",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 15
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 9
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "nav-bar-header-mobile",
    style: {
      display: 'none'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Background"], {
    backgroundColor: "white",
    paddingBottom: "none",
    paddingTop: "md",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    paddingLeft: "lg",
    paddingRight: "md",
    spacing: "between",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Nav"], {
    link: "#",
    marginLeft: "none",
    orientation: "horizontal",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    link: "#",
    text: "Explore",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 17
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    active: true,
    link: "#",
    text: "Trending",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 17
    }
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 122,
      columnNumber: 9
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "trending-section",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 125,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "column",
    padding: "xl",
    vertical: "center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 126,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 131,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    size: 1,
    tag: "h1",
    text: "Trending",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 132,
      columnNumber: 13
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 138,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    color: "light",
    text: "See what the kodemonkey community is most excited about today.",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 139,
      columnNumber: 13
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 145,
      columnNumber: 9
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cards-body",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 149,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Background"], {
    backgroundColor: "white",
    padding: "sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 150,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    className: "card_body_marg",
    margin: "xl",
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 154,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Background"], {
    backgroundColor: "light",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 159,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    spacing: "between",
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 163,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 167,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Nav"], {
    link: "#",
    orientation: "horizontal",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 168,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    active: true,
    link: "#",
    text: "Repositories",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 172,
      columnNumber: 21
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
    link: "#",
    text: "Developers",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 177,
      columnNumber: 21
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "p_sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 184,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 185,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    horizontal: "right",
    spacing: "evenly",
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 186,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    paddingRight: "lg",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 191,
      columnNumber: 23
    }
  }, 'Spoken Language: ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    size: 4,
    tag: "span",
    text: "Any ",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 195,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 200,
      columnNumber: 25
    }
  }, "\u25BE")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    paddingRight: "lg",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 202,
      columnNumber: 23
    }
  }, 'Language: ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    size: 4,
    tag: "span",
    text: "Any ",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 206,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 211,
      columnNumber: 25
    }
  }, "\u25BE")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    padding: "none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 213,
      columnNumber: 23
    }
  }, 'Date Range: ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Title"], {
    size: 4,
    tag: "span",
    text: "Today ",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 217,
      columnNumber: 25
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 222,
      columnNumber: 25
    }
  }, "\u25BE"))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 229,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "p_sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 230,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "column",
    vertical: "stretch",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 231,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    spacing: "between",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 235,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 238,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 239,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    fixedWidth: true,
    icon: "book",
    paddingRight: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 240,
      columnNumber: 23
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 245,
      columnNumber: 23
    }
  }, 'themsaid / ibis'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 248,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    icon: "star",
    text: "Star",
    variant: "secondary",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 249,
      columnNumber: 21
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    paddingBottom: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 256,
      columnNumber: 17
    }
  }, 'A PHP tool that helps you write eBooks in markdown and convert to PDF.'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    spacing: "between",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 262,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 265,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 266,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 267,
      columnNumber: 23
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 270,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Legend"], {
    color: "data_1",
    paddingRight: "xs",
    text: "HTML",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 271,
      columnNumber: 27
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 277,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "star",
    paddingRight: "sm",
    text: "2,278",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 278,
      columnNumber: 27
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 284,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "bezier-curve",
    paddingRight: "sm",
    text: "1,366",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 285,
      columnNumber: 27
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 291,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 292,
      columnNumber: 27
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 293,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    color: "light",
    paddingRight: "sm",
    text: "Built by",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 294,
      columnNumber: 31
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 300,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["MultipleUsers"], {
    users: [{
      name: 'Patrick Welch',
      imageUrl: 'https://randomuser.me/api/portraits/men/9.jpg'
    }, {
      name: 'Lucille Sanchez',
      imageUrl: 'https://randomuser.me/api/portraits/women/6.jpg'
    }, {
      name: 'Beverly Reyes',
      imageUrl: 'https://randomuser.me/api/portraits/women/74.jpg'
    }, {
      name: 'Keith Craig',
      imageUrl: 'https://randomuser.me/api/portraits/men/40.jpg'
    }, {
      name: 'Alicia Cooper',
      imageUrl: 'https://randomuser.me/api/portraits/women/46.jpg'
    }],
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 301,
      columnNumber: 31
    }
  }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 331,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "star",
    text: "402 stars today",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 332,
      columnNumber: 21
    }
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 340,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "p_sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 341,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "column",
    vertical: "stretch",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 342,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    spacing: "between",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 346,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 349,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 350,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    fixedWidth: true,
    icon: "book",
    paddingRight: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 351,
      columnNumber: 23
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 356,
      columnNumber: 23
    }
  }, 'l1ving / youtube-dl'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 359,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    icon: "star",
    text: "Star",
    variant: "secondary",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 360,
      columnNumber: 21
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    paddingBottom: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 367,
      columnNumber: 17
    }
  }, 'A fork of youtube-dl, for archival purposes.'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    spacing: "between",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 373,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 376,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 377,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 378,
      columnNumber: 23
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 381,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Legend"], {
    color: "data_2",
    paddingRight: "xs",
    text: "Python",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 382,
      columnNumber: 27
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 388,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "star",
    paddingRight: "sm",
    text: "2,278",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 389,
      columnNumber: 27
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 395,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "bezier-curve",
    paddingRight: "sm",
    text: "1,366",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 396,
      columnNumber: 27
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 402,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 403,
      columnNumber: 27
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 404,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    color: "light",
    paddingRight: "sm",
    text: "Built by",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 405,
      columnNumber: 31
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 411,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["MultipleUsers"], {
    users: [{
      name: 'Patrick Welch',
      imageUrl: 'https://randomuser.me/api/portraits/men/12.jpg'
    }, {
      name: 'Lucille Sanchez',
      imageUrl: 'https://randomuser.me/api/portraits/women/15.jpg'
    }, {
      name: 'Beverly Reyes',
      imageUrl: 'https://randomuser.me/api/portraits/women/17.jpg'
    }, {
      name: 'Keith Craig',
      imageUrl: 'https://randomuser.me/api/portraits/men/18.jpg'
    }, {
      name: 'Alicia Cooper',
      imageUrl: 'https://randomuser.me/api/portraits/women/19.jpg'
    }],
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 412,
      columnNumber: 31
    }
  }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 442,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "star",
    text: "172 stars today",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 443,
      columnNumber: 21
    }
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 451,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "p_sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 452,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "column",
    vertical: "stretch",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 453,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    spacing: "between",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 457,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 460,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 461,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    fixedWidth: true,
    icon: "book",
    paddingRight: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 462,
      columnNumber: 23
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 467,
      columnNumber: 23
    }
  }, 'apache / incubator-nuttx'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 470,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    icon: "star",
    text: "Star",
    variant: "secondary",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 471,
      columnNumber: 21
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    paddingBottom: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 478,
      columnNumber: 17
    }
  }, 'Apache NuttX is a mature, real-time embedded operating system (RTOS).'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    spacing: "between",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 484,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 487,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 488,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 489,
      columnNumber: 23
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 492,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Legend"], {
    color: "data_3",
    paddingRight: "xs",
    text: "C",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 493,
      columnNumber: 27
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 499,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "star",
    paddingRight: "sm",
    text: "2,278",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 500,
      columnNumber: 27
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 506,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "bezier-curve",
    paddingRight: "sm",
    text: "1,366",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 507,
      columnNumber: 27
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 513,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 514,
      columnNumber: 27
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 515,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    color: "light",
    paddingRight: "sm",
    text: "Built by",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 516,
      columnNumber: 31
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 522,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["MultipleUsers"], {
    users: [{
      name: 'Patrick Welch',
      imageUrl: 'https://randomuser.me/api/portraits/men/20.jpg'
    }, {
      name: 'Lucille Sanchez',
      imageUrl: 'https://randomuser.me/api/portraits/women/22.jpg'
    }, {
      name: 'Beverly Reyes',
      imageUrl: 'https://randomuser.me/api/portraits/women/23.jpg'
    }, {
      name: 'Keith Craig',
      imageUrl: 'https://randomuser.me/api/portraits/men/24.jpg'
    }, {
      name: 'Alicia Cooper',
      imageUrl: 'https://randomuser.me/api/portraits/women/29.jpg'
    }],
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 523,
      columnNumber: 31
    }
  }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 553,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "star",
    text: "302 stars today",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 554,
      columnNumber: 21
    }
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["SectionSeparator"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 562,
      columnNumber: 13
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "p_sm",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 563,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    orientation: "column",
    vertical: "stretch",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 564,
      columnNumber: 15
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    spacing: "between",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 568,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 571,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 572,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    fixedWidth: true,
    icon: "book",
    paddingRight: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 573,
      columnNumber: 23
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 578,
      columnNumber: 23
    }
  }, 'jofpin / trape'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 581,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    icon: "star",
    text: "Star",
    variant: "secondary",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 582,
      columnNumber: 21
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    paddingBottom: "xs",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 589,
      columnNumber: 17
    }
  }, 'Learning to scrape using the trape tool.'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    spacing: "between",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 595,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 598,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 599,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    wrap: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 600,
      columnNumber: 23
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 603,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Legend"], {
    color: "data_2",
    paddingRight: "xs",
    text: "Python",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 604,
      columnNumber: 27
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 610,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "star",
    paddingRight: "sm",
    text: "2,278",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 611,
      columnNumber: 27
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 617,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "bezier-curve",
    paddingRight: "sm",
    text: "1,366",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 618,
      columnNumber: 27
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 624,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Flex"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 625,
      columnNumber: 27
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 626,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["Body"], {
    color: "light",
    paddingRight: "sm",
    text: "Built by",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 627,
      columnNumber: 31
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 633,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["MultipleUsers"], {
    users: [{
      name: 'Patrick Welch',
      imageUrl: 'https://randomuser.me/api/portraits/men/30.jpg'
    }, {
      name: 'Lucille Sanchez',
      imageUrl: 'https://randomuser.me/api/portraits/women/31.jpg'
    }, {
      name: 'Beverly Reyes',
      imageUrl: 'https://randomuser.me/api/portraits/women/32.jpg'
    }, {
      name: 'Keith Craig',
      imageUrl: 'https://randomuser.me/api/portraits/men/33.jpg'
    }, {
      name: 'Alicia Cooper',
      imageUrl: 'https://randomuser.me/api/portraits/women/34.jpg'
    }],
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 634,
      columnNumber: 31
    }
  }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["FlexItem"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 664,
      columnNumber: 19
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(playbook_ui__WEBPACK_IMPORTED_MODULE_1__["IconValue"], {
    icon: "star",
    text: "789 stars today",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 665,
      columnNumber: 21
    }
  })))))))));
};
/* harmony default export */ __webpack_exports__["default"] = (TrendingRepositories);

/***/ })

},[["./app/javascript/packs/samples.js","runtime","vendors~app~application~main_sidebar~samples~site~visual_guidelines","vendors~app~application~main_sidebar~samples~visual_guidelines","app~application~main_sidebar~samples~visual_guidelines"]]]);
//# sourceMappingURL=samples-e59eb7623bc6421a1c89.chunk.js.map