(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["adonis"] = factory(require("react"));
	else
		root["adonis"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.hashObject = exports.ThemeProvider = exports.withTheme = exports.preRenderCSS = exports.StyleSheetServer = exports.StyleSheetTestUtils = exports.StyleSheet = exports.css = exports.defaultExport = undefined;

	var _exports = __webpack_require__(1);

	var _exports2 = _interopRequireDefault(_exports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _buildExports = (0, _exports2.default)({
	  noInjection: ("true"),
	  noObjectStyles: (undefined)
	}),
	    defaultExport = _buildExports.defaultExport,
	    css = _buildExports.css,
	    StyleSheet = _buildExports.StyleSheet,
	    StyleSheetTestUtils = _buildExports.StyleSheetTestUtils,
	    StyleSheetServer = _buildExports.StyleSheetServer,
	    preRenderCSS = _buildExports.preRenderCSS,
	    withTheme = _buildExports.withTheme,
	    ThemeProvider = _buildExports.ThemeProvider,
	    hashObject = _buildExports.hashObject;

	exports.default = defaultExport;
	exports.defaultExport = defaultExport;
	exports.css = css;
	exports.StyleSheet = StyleSheet;
	exports.StyleSheetTestUtils = StyleSheetTestUtils;
	exports.StyleSheetServer = StyleSheetServer;
	exports.preRenderCSS = preRenderCSS;
	exports.withTheme = withTheme;
	exports.ThemeProvider = ThemeProvider;
	exports.hashObject = hashObject;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _themeProvider = __webpack_require__(2);

	var _themeProvider2 = _interopRequireDefault(_themeProvider);

	var _withTheme = __webpack_require__(4);

	var _withTheme2 = _interopRequireDefault(_withTheme);

	var _prerenderCss = __webpack_require__(5);

	var _prerenderCss2 = _interopRequireDefault(_prerenderCss);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  var StyleSheet = void 0,
	      css = void 0,
	      StyleSheetServer = void 0,
	      StyleSheetTestUtils = void 0;

	  //

	  var adonis = __webpack_require__(6)(options, { StyleSheet: StyleSheet, StyleSheetTestUtils: StyleSheetTestUtils, css: css });

	  return {
	    defaultExport: adonis,
	    StyleSheet: StyleSheet,
	    StyleSheetServer: StyleSheetServer,
	    StyleSheetTestUtils: StyleSheetTestUtils,
	    css: css,
	    ThemeProvider: _themeProvider2.default,
	    preRenderCSS: (0, _prerenderCss2.default)(adonis, options, StyleSheetServer),
	    withTheme: _withTheme2.default
	  };
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ThemeProvider = function (_Component) {
	  _inherits(ThemeProvider, _Component);

	  function ThemeProvider() {
	    _classCallCheck(this, ThemeProvider);

	    return _possibleConstructorReturn(this, (ThemeProvider.__proto__ || Object.getPrototypeOf(ThemeProvider)).apply(this, arguments));
	  }

	  _createClass(ThemeProvider, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      var context = {};
	      for (var prop in this.context) {
	        context[prop] = this.context;
	      }
	      context.theme = this.props.theme;
	      return context;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (!this.props.children) {
	        return null;
	      }
	      return _react2.default.Children.only(this.props.children);
	    }
	  }]);

	  return ThemeProvider;
	}(_react.Component);

	exports.default = ThemeProvider;


	ThemeProvider.childContextTypes = {
	  theme: _react.PropTypes.object.isRequired
	};

	ThemeProvider.contextTypes = {
	  theme: _react.PropTypes.object
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	exports.default = function (Component) {
	  var ComponentWithTheme = function (_React$Component) {
	    _inherits(ComponentWithTheme, _React$Component);

	    function ComponentWithTheme() {
	      _classCallCheck(this, ComponentWithTheme);

	      return _possibleConstructorReturn(this, (ComponentWithTheme.__proto__ || Object.getPrototypeOf(ComponentWithTheme)).apply(this, arguments));
	    }

	    _createClass(ComponentWithTheme, [{
	      key: 'render',
	      value: function render() {
	        return _react2.default.createElement(Component, this.props);
	      }
	    }]);

	    return ComponentWithTheme;
	  }(_react2.default.Component);

	  ComponentWithTheme.contextTypes = {
	    theme: _react2.default.PropTypes.object
	  };

	  return ComponentWithTheme;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (adonis, options, StyleSheetServer) {
	  return function (theme, renderFunction) {
	    if (!StyleSheetServer && options.noObjectStyles) {
	      throw new Error("adonis can't pre-render CSS if `noObjectStyles` is set to `true`.");
	    }

	    if (typeof renderFunction === 'undefined') {
	      renderFunction = theme;
	      theme = null;
	    }

	    adonis.enablePreRenderInjection(theme);

	    var _StyleSheetServer$ren = StyleSheetServer.renderStatic(function () {
	      renderFunction();
	      adonis.disablePreRenderInjection();
	    }),
	        css = _StyleSheetServer$ren.css;

	    return css;
	  };
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _domElements = __webpack_require__(7);

	var _domElements2 = _interopRequireDefault(_domElements);

	var _adonisComponent = __webpack_require__(8);

	var _baseStyles = __webpack_require__(12);

	var _baseStyles2 = _interopRequireDefault(_baseStyles);

	var _utils = __webpack_require__(10);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function () {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var _ref = arguments[1];
	  var StyleSheetTestUtils = _ref.StyleSheetTestUtils,
	      css = _ref.css,
	      StyleSheet = _ref.StyleSheet;

	  options = _utils2.default.defaults(options, {
	    noInjection: false,
	    noObjectStyles: false
	  });

	  var adonis = function adonis(base) {
	    if (base instanceof _baseStyles2.default) {
	      var _ret = function () {
	        var factory = {};
	        _domElements2.default.forEach(function (tagName) {
	          factory[tagName] = function (styles, variations, name) {
	            if ((typeof variations === 'undefined' ? 'undefined' : _typeof(variations)) !== 'object') {
	              name = variations;
	              variations = undefined;
	            }
	            return (0, _adonisComponent.create)(adonis, tagName, styles, variations, base, name);
	          };
	        });
	        return {
	          v: factory
	        };
	      }();

	      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    }

	    return function (styles, variations, name) {
	      if ((typeof variations === 'undefined' ? 'undefined' : _typeof(variations)) !== 'object') {
	        name = variations;
	        variations = undefined;
	      }
	      return (0, _adonisComponent.create)(adonis, base, styles, variations, name);
	    };
	  };

	  _domElements2.default.forEach(function (tagName) {
	    adonis[tagName] = function (styles, variations, name) {
	      if ((typeof variations === 'undefined' ? 'undefined' : _typeof(variations)) !== 'object') {
	        name = variations;
	        variations = undefined;
	      }
	      return (0, _adonisComponent.create)(adonis, tagName, styles, variations, name);
	    };
	  });

	  adonis.css = function (styles, variations, name) {
	    if ((typeof variations === 'undefined' ? 'undefined' : _typeof(variations)) !== 'object') {
	      name = variations;
	      variations = undefined;
	    }
	    return new _baseStyles2.default(styles, variations, name);
	  };

	  adonis.enablePreRenderInjection = function (theme) {
	    adonis.preRenderInjection = true;
	    adonis.preRenderTheme = theme;
	  };

	  adonis.disablePreRenderInjection = function () {
	    adonis.preRenderInjection = true;
	  };

	  adonis.disableInjection = function () {
	    StyleSheetTestUtils.suppressStyleInjection();
	  };

	  if (options.noInjection && !options.noObjectStyles) {
	    adonis.disableInjection();
	  }

	  adonis.preRenderTheme = null;
	  adonis.preRenderInjection = false;

	  adonis.aphrodite = {
	    StyleSheet: StyleSheet,
	    css: css
	  };
	  adonis.Utils = _utils2.default;

	  return adonis;
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', 'circle', 'clipPath', 'defs', 'ellipse', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.create = create;

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _styles = __webpack_require__(9);

	var _styles2 = _interopRequireDefault(_styles);

	var _stylesManager = __webpack_require__(11);

	var _stylesManager2 = _interopRequireDefault(_stylesManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BaseAdonisComponent = function (_Component) {
	  _inherits(BaseAdonisComponent, _Component);

	  function BaseAdonisComponent() {
	    _classCallCheck(this, BaseAdonisComponent);

	    return _possibleConstructorReturn(this, (BaseAdonisComponent.__proto__ || Object.getPrototypeOf(BaseAdonisComponent)).apply(this, arguments));
	  }

	  return BaseAdonisComponent;
	}(_react.Component);

	BaseAdonisComponent.contextTypes = {
	  theme: _react.PropTypes.object
	};

	var getTargetStyles = function getTargetStyles(target) {
	  var styles = [target._adonisStyles, target._adonisBaseStyles];

	  // Adonis target styled adonis target
	  if (target._adonisTarget && typeof target._adonisTarget !== 'string') {
	    styles = styles.concat(getTargetStyles(target._adonisTarget));
	  }

	  // Adonis target styled a react component
	  if (target.RootElement) {
	    styles = styles.concat(getTargetStyles(target.RootElement));
	  }

	  // React component extends a react component with root element
	  var proto = Object.getPrototypeOf(target);
	  if (proto) {
	    styles = styles.concat(getTargetStyles(proto));
	  }
	  return styles.filter(function (style) {
	    return !!style;
	  });
	};

	function create(adonis, target, stylesObject) {
	  var variations = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	  var baseStylesObject = arguments[4];
	  var name = arguments[5];

	  if ((typeof baseStylesObject === 'undefined' ? 'undefined' : _typeof(baseStylesObject)) !== 'object') {
	    name = baseStylesObject;
	    baseStylesObject = undefined;
	  }

	  var isTag = typeof target === 'string';
	  var isAdonisComponent = target.prototype instanceof BaseAdonisComponent;
	  var isComponent = !isAdonisComponent && target.prototype instanceof _react.Component;

	  var styles = new _styles2.default(adonis, target, stylesObject, variations, name);
	  var baseStyles = baseStylesObject && new _styles2.default(adonis, 'baseStyles', baseStylesObject.styles, baseStylesObject.variations, name);

	  var targetStyles = [];
	  if (adonis.preRenderInjection) {
	    if (isComponent) {
	      if (target.RootElement) {
	        targetStyles = getTargetStyles(target);
	      } else {
	        console.log('Warning: Trying to pre-render CSS for React Component styled via adonis(Component).');
	        console.log('         Due to the way that styles are inherited in aphrodite, it\'s possible that');
	        console.log('         the rendered CSS is incomplete.');
	      }
	    } else {
	      targetStyles = getTargetStyles(target);
	    }
	  }

	  var allStyles = [baseStyles].concat(targetStyles).concat([styles]).filter(function (s) {
	    return !!s;
	  });

	  var stylesManager = new _stylesManager2.default(adonis, allStyles);
	  if (adonis.preRenderInjection) {
	    stylesManager.createStyleSheets(adonis.preRenderTheme);
	  } else {
	    stylesManager.createStyleSheetsIfPossible();
	  }

	  if (adonis.preRenderInjection) {
	    stylesManager.prepareVariations(Object.keys(variations));
	  }

	  var AdonisComponent = function (_BaseAdonisComponent) {
	    _inherits(AdonisComponent, _BaseAdonisComponent);

	    function AdonisComponent() {
	      _classCallCheck(this, AdonisComponent);

	      return _possibleConstructorReturn(this, (AdonisComponent.__proto__ || Object.getPrototypeOf(AdonisComponent)).apply(this, arguments));
	    }

	    _createClass(AdonisComponent, [{
	      key: '_cloneProps',

	      /**
	       * Returns a shallow clone of this component's props
	       * @return {Object}
	       * @private
	       */
	      value: function _cloneProps() {
	        var _this3 = this;

	        var elementProps = {};
	        Object.keys(this.props).forEach(function (prop) {
	          elementProps[prop] = _this3.props[prop];
	        });
	        return elementProps;
	      }

	      /**
	       * Returns an array containing the active variations for this component
	       * @return {String[]}
	       * @private
	       */

	    }, {
	      key: '_getActiveVariations',
	      value: function _getActiveVariations() {
	        var _this4 = this;

	        return Object.keys(variations).filter(function (variation) {
	          return !!_this4.props[variation];
	        });
	      }

	      /**
	       * Renders the component
	       * @return {React.Element|React.Component}
	       */

	    }, {
	      key: 'render',
	      value: function render() {
	        stylesManager.createStyleSheets(this.context.theme);

	        var activeVariations = this._getActiveVariations();
	        var elementProps = this._cloneProps();

	        // If an available variation is passed in as a property, we add the styles to the class and
	        // remove the prop from the props we pass to our target element
	        Object.keys(variations).forEach(function (variation) {
	          delete elementProps[variation];
	        });

	        // Apply and pass styles

	        var _stylesManager$getCla = stylesManager.getClassName(activeVariations, this.props.styles),
	            aphroStyles = _stylesManager$getCla.styles,
	            className = _stylesManager$getCla.className;

	        elementProps.className = className;
	        elementProps.styles = aphroStyles;

	        // Pass ref
	        var _props = this.props,
	            children = _props.children,
	            innerRef = _props.innerRef;

	        if (innerRef) {
	          if (isComponent || isTag) {
	            elementProps.ref = innerRef;
	          } else if (isAdonisComponent) {
	            elementProps.innerRef = innerRef;
	          }
	        }

	        // We don't want to pass invalid props to tags
	        if (isTag) {
	          delete elementProps.styles;
	          delete elementProps.innerRef;
	        }

	        return _react2.default.createElement(target, elementProps, children);
	      }
	    }]);

	    return AdonisComponent;
	  }(BaseAdonisComponent);

	  AdonisComponent.contextTypes = BaseAdonisComponent.contextTypes;
	  AdonisComponent._adonisTarget = target;
	  AdonisComponent._adonisStyles = styles;
	  AdonisComponent._adonisBaseStyles = baseStyles;

	  return AdonisComponent;
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(10);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Styles = function () {
	  function Styles(adonis, target, stylesObject) {
	    var variationsObject = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	    var name = arguments[4];

	    _classCallCheck(this, Styles);

	    this._adonis = adonis;
	    this._target = target;
	    this._stylesObject = stylesObject;
	    this._variationsObject = variationsObject;
	    this._defaultStyleName = name || _utils2.default.generateStyleNameForTarget(target);

	    this._createCombinedStylesObject();
	  }

	  /**
	   * Creates an object containing both the default style and the variations
	   * @private
	   */


	  _createClass(Styles, [{
	    key: '_createCombinedStylesObject',
	    value: function _createCombinedStylesObject() {
	      this._combinedStyles = _defineProperty({}, this._defaultStyleName, this._stylesObject);

	      for (var prop in this._variationsObject) {
	        this._combinedStyles[prop] = this._variationsObject[prop];
	      }

	      this._needsProcessing = _utils2.default.objectHasFunctions(this._combinedStyles);
	    }

	    /**
	     * Walks through the combined object and calls every function it finds,
	     * passing the theme
	     * @param  {Object} theme
	     * @private
	     */

	  }, {
	    key: '_processStyles',
	    value: function _processStyles(theme) {
	      var processObject = function processObject(obj) {
	        var serializeFunctions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	        var newObject = {};

	        for (var prop in obj) {
	          var value = obj[prop];
	          var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	          if (valueType === 'object') {
	            newObject[prop] = processObject(value, serializeFunctions);
	          } else if (valueType === 'function') {
	            if (!serializeFunctions) {
	              newObject[prop] = value(theme);
	            } else {
	              newObject[prop] = value.toString();
	            }
	          } else {
	            newObject[prop] = value;
	          }
	        }

	        return newObject;
	      };
	      this._staticProcessedStyles = processObject(this._combinedStyles, true);
	      this._processedStyles = processObject(this._combinedStyles);
	    }

	    /**
	     * Takes the aphrodite stylesheet objects and fixes their names so that the hash calculation
	     * does not incorporate any variable styles. This allows us to render multiple themes into
	     * external CSS files without having to re-compile the JavaScript (since changed theme values
	     * would also affect the class names)
	     * @private
	     */

	  }, {
	    key: '_fixStylesheetNames',
	    value: function _fixStylesheetNames() {
	      for (var key in this._styleSheet) {
	        var style = this._styleSheet[key];

	        var _style$_name$split = style._name.split('_'),
	            _style$_name$split2 = _slicedToArray(_style$_name$split, 1),
	            name = _style$_name$split2[0];

	        // Important: use `_staticProcessedStyles` instead of `_processedStyles`, since they don't
	        // include theme values


	        var newHash = _utils2.default.hashObject(this._staticProcessedStyles[key]);
	        style._name = name + '_' + newHash;
	      }
	    }

	    /**
	     * Injects the stylesheet after it has been processed
	     * @param  {Object} theme
	     * @private
	     */

	  }, {
	    key: 'createStyleSheet',
	    value: function createStyleSheet(theme) {
	      if (!this._styleSheet) {
	        if (this._needsProcessing && theme) {
	          this._processStyles(theme);
	        }

	        this._styleSheet = this._adonis.aphrodite.StyleSheet.create(this._processedStyles || this._combinedStyles);
	        if (this._needsProcessing) {
	          this._fixStylesheetNames();
	        }
	      }
	    }

	    /**
	     * Checks if the stylesheet can be injected before the first render has been called
	     * @return {Boolean}
	     */

	  }, {
	    key: 'canInjectBeforeRender',
	    value: function canInjectBeforeRender() {
	      return !this._needsProcessing;
	    }

	    /**
	     * Returns the default style sheet
	     * @return {Object}
	     */

	  }, {
	    key: 'getDefaultStylesheet',
	    value: function getDefaultStylesheet() {
	      return this._styleSheet[this._defaultStyleName];
	    }

	    /**
	     * Returns the stylesheet for the given variation
	     * @param  {String} variation
	     * @return {Object}
	     */

	  }, {
	    key: 'getVariationStylesheet',
	    value: function getVariationStylesheet(variation) {
	      return this._styleSheet[variation];
	    }
	  }]);

	  return Styles;
	}();

	exports.default = Styles;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var Utils = {
	  /**
	   * Generates a random string
	   * @param  {Number} length = 10
	   * @return {String}
	   */
	  generateClassName: function generateClassName() {
	    var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

	    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	    var className = '';
	    for (var i = 0; i < length; i++) {
	      className += chars[Math.floor(Math.random() * chars.length)];
	    }
	    return className;
	  },


	  /**
	   * Generates a name for the given target (tag name, class name or random string)
	   * @param  {Object} target
	   * @return {String}
	   */
	  generateStyleNameForTarget: function generateStyleNameForTarget(target) {
	    if (typeof target === 'string') {
	      return target;
	    } else {
	      return target.name ? target.name : Utils.generateClassName();
	    }
	  },


	  /**
	   * Checks if the given object has any functions deep inside of it
	   * @param  {Object} obj
	   * @return {Boolean}
	   */
	  objectHasFunctions: function objectHasFunctions(obj) {
	    for (var prop in obj) {
	      var value = obj[prop];
	      var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	      if (valueType === 'object') {
	        if (Utils.objectHasFunctions(value)) {
	          return true;
	        }
	      } else if (valueType === 'function') {
	        return true;
	      }
	    }
	    return false;
	  },


	  /**
	   * Assigns own enumerable properties of source object(s) to the destination
	   * object for all destination properties that resolve to undefined. Once a
	   * property is set, additional values of the same property are ignored.
	   * @param  {Object} object
	   * @param  {Object} ...sources
	   * @return {Object}
	   */
	  defaults: function defaults(object) {
	    // Shallow clone
	    var newObject = {};
	    for (var key in object) {
	      newObject[key] = object[key];
	    }

	    // Clone sources

	    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      sources[_key - 1] = arguments[_key];
	    }

	    for (var i = 0; i < sources.length; i++) {
	      var source = sources[i];
	      for (var _key2 in source) {
	        if (typeof newObject[_key2] === 'undefined') {
	          newObject[_key2] = source[_key2];
	        }
	      }
	    }

	    return newObject;
	  },


	  /**
	   * Assigns own enumerable properties of source object(s) to the destination
	   * object for all destination properties and their properties that resolve to
	   * undefined. Once a property is set, additional value sof the same property
	   * are ignored.
	   * @param  {Object} object
	   * @param  {Object} ...sources
	   * @return {Object}
	   */
	  deepDefaults: function deepDefaults(object) {
	    // Shallow clone
	    var newObject = {};
	    for (var key in object) {
	      newObject[key] = object[key];
	    }

	    // Clone sources

	    for (var _len2 = arguments.length, sources = Array(_len2 > 1 ? _len2 - 1 : 0), _key3 = 1; _key3 < _len2; _key3++) {
	      sources[_key3 - 1] = arguments[_key3];
	    }

	    for (var i = 0; i < sources.length; i++) {
	      var source = sources[i];
	      for (var _key4 in source) {
	        if (Utils.isExtendable(newObject[_key4]) && Utils.isExtendable(source[_key4])) {
	          newObject[_key4] = Utils.deepDefaults(newObject[_key4], source[_key4]);
	        } else if (typeof newObject[_key4] === 'undefined') {
	          newObject[_key4] = source[_key4];
	        }
	      }
	    }

	    return newObject;
	  },


	  /**
	   * Assigns own enumerable properties of source object(s) to the destination
	   * object. Subsequent sources overwrite property assignments of previous
	   * sources.
	   * @param {Object} object
	   * @param {Object} ...sources
	   * @return {Object}
	   */
	  extend: function extend(object) {
	    // Shallow clone
	    var newObject = {};
	    for (var key in object) {
	      newObject[key] = object[key];
	    }

	    // Extend sources

	    for (var _len3 = arguments.length, sources = Array(_len3 > 1 ? _len3 - 1 : 0), _key5 = 1; _key5 < _len3; _key5++) {
	      sources[_key5 - 1] = arguments[_key5];
	    }

	    for (var i = 0; i < sources.length; i++) {
	      var source = sources[i];
	      for (var _key6 in source) {
	        newObject[_key6] = source[_key6];
	      }
	    }

	    return newObject;
	  },


	  /**
	   * Checks if this value is extendable / can have keys
	   * @param  {*}  val
	   * @return {Boolean}
	   */
	  isExtendable: function isExtendable(val) {
	    return typeof val !== 'undefined' && val !== null && ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' || typeof val === 'function');
	  },


	  /**
	   * JS Implementation of MurmurHash2
	   *
	   * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
	   * @see http://github.com/garycourt/murmurhash-js
	   * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
	   * @see http://sites.google.com/site/murmurhash/
	   *
	   * @param {Object}
	   * @return {String} Base 36 encoded hash result
	   */
	  hashObject: function hashObject(object) {
	    var str = JSON.stringify(object);
	    var l = str.length;
	    var h = l;
	    var i = 0;
	    var k = void 0;

	    while (l >= 4) {
	      k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;

	      k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	      k ^= k >>> 24;
	      k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);

	      h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;

	      l -= 4;
	      ++i;
	    }

	    /* eslint-disable no-fallthrough */ // forgive existing code
	    switch (l) {
	      case 3:
	        h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
	      case 2:
	        h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
	      case 1:
	        h ^= str.charCodeAt(i) & 0xff;
	        h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	    }
	    /* eslint-enable no-fallthrough */

	    h ^= h >>> 13;
	    h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	    h ^= h >>> 15;

	    return (h >>> 0).toString(36);
	  }
	};

	exports.default = Utils;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var StylesManager = function () {
	  function StylesManager(adonis, styles) {
	    _classCallCheck(this, StylesManager);

	    this._adonis = adonis;
	    this._styles = styles.filter(function (style) {
	      return !!style;
	    });

	    this._variationCombinations = {};
	  }

	  _createClass(StylesManager, [{
	    key: 'createStyleSheets',
	    value: function createStyleSheets(theme) {
	      this._styles.forEach(function (style) {
	        return style.createStyleSheet(theme);
	      });
	    }
	  }, {
	    key: 'createStyleSheetsIfPossible',
	    value: function createStyleSheetsIfPossible() {
	      this._styles.forEach(function (style) {
	        return style.canInjectBeforeRender() && style.createStyleSheet();
	      });
	    }
	  }, {
	    key: '_getPossibleCombinations',
	    value: function _getPossibleCombinations(set) {
	      return function acc(xs, set) {
	        var x = xs[0];

	        if (typeof x === 'undefined') {
	          return set;
	        }

	        for (var i = 0, l = set.length; i < l; ++i) {
	          set.push(set[i].concat(x));
	        }
	        return acc(xs.slice(1), set);
	      }(set, [[]]).slice(1);
	    }
	  }, {
	    key: 'prepareVariations',
	    value: function prepareVariations(variations) {
	      var _this = this;

	      var possibleCombinations = this._getPossibleCombinations(variations);

	      // Default
	      this.getClassName([]);

	      possibleCombinations.forEach(function (variations) {
	        variations = variations.sort();
	        _this._variationCombinations[variations.join(',')] = _this.getClassName(variations);
	      });
	    }

	    /**
	     * Returns the class name for the given variations and additional styles
	     * @param  {String[]} variations
	     * @param  {Object[]} additionalStyles
	     * @return {Object}
	     */

	  }, {
	    key: 'getClassName',
	    value: function getClassName(variations, additionalStyles) {
	      var aphroStyles = [];

	      this._styles.forEach(function (styles) {
	        if (!styles) return;

	        aphroStyles.push(styles.getDefaultStylesheet());
	        variations.sort().forEach(function (variation) {
	          aphroStyles.push(styles.getVariationStylesheet(variation));
	        });
	      });

	      if (additionalStyles) {
	        aphroStyles = aphroStyles.concat(additionalStyles);
	      }

	      return { styles: aphroStyles, className: this._adonis.aphrodite.css.apply(null, aphroStyles) };
	    }
	  }]);

	  return StylesManager;
	}();

	exports.default = StylesManager;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BaseStyles = function BaseStyles(styles) {
	  var variations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  _classCallCheck(this, BaseStyles);

	  this.styles = styles;
	  this.variations = variations;
	};

	exports.default = BaseStyles;

/***/ }
/******/ ])
});
;