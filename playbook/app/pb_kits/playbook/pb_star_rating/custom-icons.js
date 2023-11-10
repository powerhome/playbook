/* eslint-disable */
(function () {
  'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
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

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var _WINDOW = {};
  var _DOCUMENT = {};

  try {
    if (typeof window !== 'undefined') _WINDOW = window;
    if (typeof document !== 'undefined') _DOCUMENT = document;
  } catch (e) {}

  var _ref = _WINDOW.navigator || {},
      _ref$userAgent = _ref.userAgent,
      userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;
  var WINDOW = _WINDOW;
  var DOCUMENT = _DOCUMENT;
  var IS_BROWSER = !!WINDOW.document;
  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

  var _familyProxy, _familyProxy2, _familyProxy3, _familyProxy4, _familyProxy5;

  var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
  var PRODUCTION = function () {
    try {
      return "production" === 'production';
    } catch (e) {
      return false;
    }
  }();
  var FAMILY_CLASSIC = 'classic';
  var FAMILY_SHARP = 'sharp';
  var FAMILIES = [FAMILY_CLASSIC, FAMILY_SHARP];

  function familyProxy(obj) {
    // Defaults to the classic family if family is not available
    return new Proxy(obj, {
      get: function get(target, prop) {
        return prop in target ? target[prop] : target[FAMILY_CLASSIC];
      }
    });
  }
  var PREFIX_TO_STYLE = familyProxy((_familyProxy = {}, _defineProperty(_familyProxy, FAMILY_CLASSIC, {
    'fa': 'solid',
    'fas': 'solid',
    'fa-solid': 'solid',
    'far': 'regular',
    'fa-regular': 'regular',
    'fal': 'light',
    'fa-light': 'light',
    'fat': 'thin',
    'fa-thin': 'thin',
    'fad': 'duotone',
    'fa-duotone': 'duotone',
    'fab': 'brands',
    'fa-brands': 'brands',
    'fak': 'kit',
    'fa-kit': 'kit'
  }), _defineProperty(_familyProxy, FAMILY_SHARP, {
    'fa': 'solid',
    'fass': 'solid',
    'fa-solid': 'solid',
    'fasr': 'regular',
    'fa-regular': 'regular',
    'fasl': 'light',
    'fa-light': 'light'
  }), _familyProxy));
  var STYLE_TO_PREFIX = familyProxy((_familyProxy2 = {}, _defineProperty(_familyProxy2, FAMILY_CLASSIC, {
    'solid': 'fas',
    'regular': 'far',
    'light': 'fal',
    'thin': 'fat',
    'duotone': 'fad',
    'brands': 'fab',
    'kit': 'fak'
  }), _defineProperty(_familyProxy2, FAMILY_SHARP, {
    'solid': 'fass',
    'regular': 'fasr',
    'light': 'fasl'
  }), _familyProxy2));
  var PREFIX_TO_LONG_STYLE = familyProxy((_familyProxy3 = {}, _defineProperty(_familyProxy3, FAMILY_CLASSIC, {
    'fab': 'fa-brands',
    'fad': 'fa-duotone',
    'fak': 'fa-kit',
    'fal': 'fa-light',
    'far': 'fa-regular',
    'fas': 'fa-solid',
    'fat': 'fa-thin'
  }), _defineProperty(_familyProxy3, FAMILY_SHARP, {
    'fass': 'fa-solid',
    'fasr': 'fa-regular',
    'fasl': 'fa-light'
  }), _familyProxy3));
  var LONG_STYLE_TO_PREFIX = familyProxy((_familyProxy4 = {}, _defineProperty(_familyProxy4, FAMILY_CLASSIC, {
    'fa-brands': 'fab',
    'fa-duotone': 'fad',
    'fa-kit': 'fak',
    'fa-light': 'fal',
    'fa-regular': 'far',
    'fa-solid': 'fas',
    'fa-thin': 'fat'
  }), _defineProperty(_familyProxy4, FAMILY_SHARP, {
    'fa-solid': 'fass',
    'fa-regular': 'fasr',
    'fa-light': 'fasl'
  }), _familyProxy4));
  var FONT_WEIGHT_TO_PREFIX = familyProxy((_familyProxy5 = {}, _defineProperty(_familyProxy5, FAMILY_CLASSIC, {
    '900': 'fas',
    '400': 'far',
    'normal': 'far',
    '300': 'fal',
    '100': 'fat'
  }), _defineProperty(_familyProxy5, FAMILY_SHARP, {
    '900': 'fass',
    '400': 'fasr',
    '300': 'fasl'
  }), _familyProxy5));
  var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  var DUOTONE_CLASSES = {
    GROUP: 'duotone-group',
    SWAP_OPACITY: 'swap-opacity',
    PRIMARY: 'primary',
    SECONDARY: 'secondary'
  };
  var prefixes = new Set();
  Object.keys(STYLE_TO_PREFIX[FAMILY_CLASSIC]).map(prefixes.add.bind(prefixes));
  Object.keys(STYLE_TO_PREFIX[FAMILY_SHARP]).map(prefixes.add.bind(prefixes));
  var RESERVED_CLASSES = [].concat(FAMILIES, _toConsumableArray(prefixes), ['2xs', 'xs', 'sm', 'lg', 'xl', '2xl', 'beat', 'border', 'fade', 'beat-fade', 'bounce', 'flip-both', 'flip-horizontal', 'flip-vertical', 'flip', 'fw', 'inverse', 'layers-counter', 'layers-text', 'layers', 'li', 'pull-left', 'pull-right', 'pulse', 'rotate-180', 'rotate-270', 'rotate-90', 'rotate-by', 'shake', 'spin-pulse', 'spin-reverse', 'spin', 'stack-1x', 'stack-2x', 'stack', 'ul', DUOTONE_CLASSES.GROUP, DUOTONE_CLASSES.SWAP_OPACITY, DUOTONE_CLASSES.PRIMARY, DUOTONE_CLASSES.SECONDARY]).concat(oneToTen.map(function (n) {
    return "".concat(n, "x");
  })).concat(oneToTwenty.map(function (n) {
    return "w-".concat(n);
  }));

  function bunker(fn) {
    try {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      fn.apply(void 0, args);
    } catch (e) {
      if (!PRODUCTION) {
        throw e;
      }
    }
  }

  var w = WINDOW || {};
  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
  var namespace = w[NAMESPACE_IDENTIFIER];

  function normalizeIcons(icons) {
    return Object.keys(icons).reduce(function (acc, iconName) {
      var icon = icons[iconName];
      var expanded = !!icon.icon;

      if (expanded) {
        acc[icon.iconName] = icon.icon;
      } else {
        acc[iconName] = icon;
      }

      return acc;
    }, {});
  }

  function defineIcons(prefix, icons) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _params$skipHooks = params.skipHooks,
        skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
    var normalized = normalizeIcons(icons);

    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
      namespace.hooks.addPack(prefix, normalizeIcons(icons));
    } else {
      namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), normalized);
    }
    /**
     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
     * for `fas` so we'll ease the upgrade process for our users by automatically defining
     * this as well.
     */


    if (prefix === 'fas') {
      defineIcons('fa', icons);
    }
  }

  var icons = {

    "greensky": [1707,512,[],"e002","M0 232.703v-.719c0-72.107 58.553-131.159 138.634-131.159 47.6 0 76.313 12.313 103.89 34.778l-36.643 42.394c-20.401-16.306-38.534-25.721-69.133-25.721-42.306 0-75.927 35.859-75.927 78.98v.728c0 46.377 33.239 80.428 80.085 80.428 21.155 0 40.038-5.074 54.772-15.221v-36.226H140.11l7.641-48.186h104.217v110.137c-27.205 22.094-64.602 40.214-112.952 40.214C56.662 363.13 0 307.7 0 232.703zm271.752-65.118l57.42-3v39.137c11.466-33.202 38.623-44.202 72.622-42.751l-8.024 57.605h-3.022c-38.157 0-61.575 22.099-61.575 68.476v71.736h-57.421V167.585zm540.92.916l57.422-3.916v27.538c13.22-16.297 30.222-31.156 59.308-31.156 43.446 0 68.755 27.534 68.755 72.102v125.715h-57.426V250.456c0-26.082-12.833-39.49-34.748-39.49-21.91 0-35.889 13.408-35.889 39.49v108.328h-57.421V168.501zm197.248 155.42l34.194-39.875c23.679 19.026 48.48 31.09 78.544 31.09 23.67 0 37.947-9.143 37.947-24.14v-.729c0-14.265-9.02-21.58-52.988-32.554-52.975-13.166-87.173-27.431-87.173-78.266v-.728c0-46.453 38.329-77.171 92.062-77.171 38.324 0 71.019 11.706 97.697 32.554l-30.054 42.415c-23.307-15.72-46.227-25.23-68.397-25.23-22.166 0-33.822 9.876-33.822 22.31v.732c0 16.824 11.274 22.309 56.746 33.648 53.361 13.533 83.425 32.184 83.425 76.801v.733c0 50.839-39.833 79.364-96.575 79.364-39.838 0-80.039-13.528-111.606-40.955zm557.438-159.336h59.68l-77.818 198.912c-15.488 39.499-33.533 67.48-67.913 67.48-20.778 0-36.261-5.074-50.995-13.404l17.397-40.196c7.232 5.847 17.435 8.817 26.422 7.946 13.677-1.327 16.536-16.025 21.444-25.81l-77.198-189.685-71.783 71.205 79.704 117.752h-65.729l-52.89-79.342-20.024 20.29v59.052h-57.417V106.1l57.417-4.551V235.24l67.247-70.655h122.168l46.082 132.244 44.206-132.244zM596.879 266.4c0 4.35-.377 9.42-.75 14.489H468.676l5.51-34.417h66.785c-3.394-24.64-18.51-41.303-42.687-41.303-23.28 0-38.58 15.627-43.48 39.713h-.032s-4.508 19.776.447 36.007c5.662 25.001 23.8 38.047 49.49 38.047 19.265 0 33.24-5.797 49.105-19.928l32.872 27.896c-18.897 22.47-46.092 36.225-82.735 36.225-60.816 0-105.772-40.937-105.772-100.355v-.72c0-55.434 41.18-101.083 100.105-101.083 67.619 0 98.595 50.352 98.595 105.43zm203.984 0c0 4.35-.382 9.42-.764 14.489H672.656l5.509-34.417h66.786c-3.404-24.64-18.51-41.303-42.688-41.303-23.279 0-38.58 15.627-43.48 39.713h-.032s-4.508 19.776.447 36.007c5.662 25.001 23.8 38.047 49.491 38.047 19.26 0 33.24-5.797 49.105-19.928l32.871 27.896c-18.892 22.47-46.096 36.225-82.735 36.225-60.82 0-105.772-40.937-105.772-100.355v-.72c0-55.434 41.175-101.083 100.105-101.083 67.62 0 98.6 50.352 98.6 105.43zm826.175-136.022h-271.88C1355.158 58.368 1416.025 0 1491.1 0c75.084 0 135.938 58.369 135.938 130.378zm50.059 64.334c3.725 0 5.714-1.911 5.714-4.569v-.174c0-3.073-2.254-4.65-5.896-4.65h-7.194v9.393h7.376zm-14.753-15.857h14.837c4.507 0 7.972 1.25 10.31 3.493 1.82 1.746 2.775 4.158 2.775 6.994v.165c0 5.15-2.938 8.397-7.19 9.893l8.15 11.482h-8.588l-7.106-10.321h-5.811v10.321h-7.377v-32.027zm40.676 16.738v-.171c0-15.262-11.879-27.589-27.67-27.589-15.865 0-27.832 12.498-27.832 27.76v.166c0 15.267 11.879 27.584 27.66 27.584 15.875 0 27.842-12.498 27.842-27.75zm-27.67-31.083a31.16 31.16 0 0131.317 31.203c0 17.25-13.882 31.548-31.489 31.548a31.148 31.148 0 01-31.297-31.208c0-17.244 13.877-31.543 31.47-31.543z"],
    "nitro": [640,512,[],"e001","M480.162 0L383.87 222.074 373.495 0H213.982L113.475 232.183c42.797 22.5 87.538 42.393 133.577 59.024h.324l9.402-21.849.324 25.436c73.273 25.762 150.112 44.35 229.869 57.393h.324L640 .327H480.162V0zM237.65 309.794c-47.66-19.892-91.752-42.067-129.361-65.546L0 493.714h159.514l79.432-183.268c-.648-.326-.972-.652-1.297-.652zm236.353 71.416c-73.597-14.348-148.49-36.523-216.9-63.59l1.297 175.768h166.97l48.633-112.178z"],
    "powergon": [410,512,[],"e000","M204.793 5.541c0-4.114 4.142-6.657 7.574-5.058l.914.541 193.141 140.777c1.593 1.15 2.671 2.89 3.039 4.815l.139 1.471v143.064c0 2.002-.76 3.913-2.083 5.333l-1.32 1.14L204.792 444.4v62.074c0 4.1-4.142 6.643-7.574 5.043l-.914-.54L3.164 370.212c-1.593-1.15-2.662-2.881-3.026-4.81L0 363.928v-143.05c0-2.013.76-3.926 2.075-5.354l1.089-.975L204.793 67.63V5.541zm72.44 166.383c-11.097-14.673-29.663-20.07-55.233-16.076l-3.888.669-67.639 12.717c-.452.086-.89.403-1.186.834-.188.307-.301.64-.326.963l.03.476 2.754 13.062v176.366l-2.755 14.083c-.098.504 0 .993.297 1.324.198.21.452.345.738.385l.448-.011 46.467-8.718c.636-.13 1.192-.663 1.43-1.305l.124-.666V297.74l19.603-3.682c27.584-5.193 47.47-17.896 59.122-37.748 8.65-14.74 10.857-30.526 11.273-40.506l.082-3.902-.094-4.14c-.447-9.793-2.69-24.517-11.247-35.837zm-58.867 32.511c15.832-2.975 20.095 4.529 21.243 10.777l.268 1.918.145 2.541.01 1.35c0 13.08-6.281 21.023-19.172 24.191l-2.494.538-19.872 3.74v-41.315l19.872-3.74z"]

  };
  var prefixes$1 = [null    ,'fak',
    ,'fa-kit'

  ];
  bunker(function () {
    var _iterator = _createForOfIteratorHelper(prefixes$1),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var prefix = _step.value;
        if (!prefix) continue;
        defineIcons(prefix, icons);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });

}());
