(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["adonis"] = factory(require("react"));
	else
		root["adonis"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
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
	exports.ThemeProvider = exports.withTheme = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _adonis = __webpack_require__(1);

	var _adonis2 = _interopRequireDefault(_adonis);

	var _domElements = __webpack_require__(19);

	var _domElements2 = _interopRequireDefault(_domElements);

	var _baseStyles = __webpack_require__(20);

	var _baseStyles2 = _interopRequireDefault(_baseStyles);

	var _withTheme = __webpack_require__(21);

	var _withTheme2 = _interopRequireDefault(_withTheme);

	var _themeProvider = __webpack_require__(22);

	var _themeProvider2 = _interopRequireDefault(_themeProvider);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (options) {
	  var adonis = new _adonis2.default(options);

	  // adonis()
	  var factory = function factory(target) {
	    if (target instanceof _baseStyles2.default) {
	      var _ret = function () {
	        // adonis(BaseStyles).div(styles, variations, name)
	        var baseStyles = target;
	        var factory = {};
	        _domElements2.default.forEach(function (domElement) {
	          factory[domElement] = function (styles, variations, name) {
	            if (typeof variations === 'string') {
	              name = variations;
	              variations = undefined;
	            }

	            return adonis.createComponent(domElement, {
	              styles: styles, variations: variations, name: name, baseStyles: baseStyles
	            });
	          };
	        });
	        return {
	          v: factory
	        };
	      }();

	      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    } else {
	      // adonis(Component)(styles, variations, name)
	      // adonis(AdonisComponent)(styles, variations, name)
	      return function (styles, variations, name) {
	        if (typeof variations === 'string') {
	          name = variations;
	          variations = undefined;
	        }

	        return adonis.createComponent(target, {
	          styles: styles, variations: variations, name: name
	        });
	      };
	    }
	  };

	  // adonis.div(styles, variations, name)
	  _domElements2.default.forEach(function (domElement) {
	    factory[domElement] = function (styles, variations, name) {
	      if (typeof variations === 'string') {
	        name = variations;
	        variations = undefined;
	      }

	      return adonis.createComponent(domElement, {
	        styles: styles, variations: variations, name: name
	      });
	    };
	  });

	  // adonis.css(styles, variations, name)
	  factory.css = function (styles, variations, name) {
	    if (typeof variations === 'string') {
	      name = variations;
	      variations = undefined;
	    }

	    return new _baseStyles2.default(adonis, { styles: styles, variations: variations, name: name || 'baseStyles' });
	  };

	  // Proxy some methods
	  ['renderToStatic'].forEach(function (prop) {
	    factory[prop] = adonis[prop].bind(adonis);
	  });

	  return factory;
	};

	exports.withTheme = _withTheme2.default;
	exports.ThemeProvider = _themeProvider2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _stylesBuffer = __webpack_require__(3);

	var _stylesBuffer2 = _interopRequireDefault(_stylesBuffer);

	var _componentFactory = __webpack_require__(4);

	var _componentFactory2 = _interopRequireDefault(_componentFactory);

	var _utils = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var production = typeof process !== 'undefined' && process.env.NODE_ENV === 'production';

	var Adonis = function () {
	  /**
	   * @param  {Object} [options]
	   * @param  {Boolean|String} [options.injection = true] If `true`, styles will be injected on render,
	   *                                              if `false`, they will not be injected. If set to
	   *                                              `pre`, styles are injected before rendering.
	   * @param {Boolean} [options.minified = false] Should the resulting CSS be minified?
	   * @param {Boolean} [options.autoPrefix = true] Should adonis automatically add vendor prefixes to
	   *                                       CSS properties when necessary?
	   * @param {String} [options.selectorPrefix = ''] The selector prepended to all CSS rules
	   * @param {String} [options.hashSeparator = '~'] The string that is used to separate element names
	   *                                         from their hashes
	   * @param {String} [options.nameSeparator = '__'] The string that is used to separate multiple
	   *                                        styled elements
	   * @param {String} [options.variationSeparator = '--'] The string that is used to separate element
	   *                                             identifiers from variation identifiers
	   * @param {DOMElement} [options.styleNode] The <style> node that the CSS should be appended to
	   * @param {String} [options.injectionMode] `fast` injects the css using a browser-backed stylesheet
	   *                                         while `debug` injects it using text nodes, which makes
	   *                                         the styles debuggable and editable in the browser.
	   *                                         Default is `fast` for production, `debug` otherwise.
	   * @param {Boolean} [options.hashedStyles = false] When set to true, adonis expects string hashes
	   *                                        instead of style objects. This is useful when you are
	   *                                        using external CSS files and don't want your production
	   *                                        code to be full of style objects
	   */
	  function Adonis(options) {
	    _classCallCheck(this, Adonis);

	    this._options = (0, _utils.defaults)(options, {
	      injection: true,
	      minified: false,
	      autoPrefix: true,
	      selectorPrefix: '',
	      hashSeparator: '~',
	      nameSeparator: '__',
	      variationSeparator: '--',
	      styleNode: null,
	      injectionMode: production ? 'fast' : 'debug',
	      hashedStyles: false
	    });
	    this._stylesBuffer = new _stylesBuffer2.default(this);
	    this._componentFactory = new _componentFactory2.default(this, this._options);
	  }

	  /**
	   * Creates an adonis component for the given target
	   * @param  {String|React.Component|AdonisComponent} target
	   * @param  {Object} options
	   * @return {AdonisComponent}
	   */


	  _createClass(Adonis, [{
	    key: 'createComponent',
	    value: function createComponent(target, options) {
	      return this._componentFactory.createComponent(target, options);
	    }

	    /**
	     * Renders the styles created in `renderFn` to a string and returns it
	     * @param  {Function} renderFn
	     * @return {String}
	     */

	  }, {
	    key: 'renderToStatic',
	    value: function renderToStatic(renderFn) {
	      this._stylesBuffer.disableInjection();

	      var html = renderFn();

	      var output = this._stylesBuffer.flushToString();
	      this._stylesBuffer.enableInjection();

	      return { css: { content: output }, html: html };
	    }

	    /**
	     * Returns the styles buffer
	     * @return {StylesBuffer}
	     */

	  }, {
	    key: 'getStylesBuffer',
	    value: function getStylesBuffer() {
	      return this._stylesBuffer;
	    }

	    /**
	     * Returns all options for this adonis instance
	     * @return {Object}
	     */

	  }, {
	    key: 'getOptions',
	    value: function getOptions() {
	      return this._options;
	    }
	  }]);

	  return Adonis;
	}();

	exports.default = Adonis;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var StylesBuffer = function () {
	  function StylesBuffer(adonis) {
	    _classCallCheck(this, StylesBuffer);

	    this._adonis = adonis;
	    this._injectionEnabled = true;
	    this._buffer = [];
	    this._styleNode = this._findStyleNode();
	    this._sheet = this._findSheet();
	  }

	  /**
	   * Finds the Stylesheet for our style node
	   * @return {CSSStyleSheet}
	   * @private
	   */


	  _createClass(StylesBuffer, [{
	    key: '_findSheet',
	    value: function _findSheet() {
	      if (!this._styleNode) return;

	      if (this._styleNode.sheet) {
	        return this._styleNode.sheet;
	      }

	      // Find stylesheet
	      var _document = document,
	          styleSheets = _document.styleSheets;

	      for (var i = 0; i < styleSheets.length; i++) {
	        var styleSheet = styleSheets[i];
	        if (styleSheet.ownerNode === this._styleNode) {
	          return styleSheet;
	        }
	      }
	    }

	    /**
	     * Finds the style node
	     * @return {DOMElement}
	     * @private
	     */

	  }, {
	    key: '_findStyleNode',
	    value: function _findStyleNode() {
	      var _adonis$getOptions = this._adonis.getOptions(),
	          styleNode = _adonis$getOptions.styleNode;

	      if (styleNode) {
	        return styleNode;
	      }

	      if (typeof document === 'undefined') return null;

	      styleNode = document.createElement('style');
	      styleNode.setAttribute('data-adonis', true);
	      document.head.appendChild(styleNode);
	      return styleNode;
	    }

	    /**
	     * Buffers the given array of css rulesets
	     * @param  {String[]} rulesets
	     */

	  }, {
	    key: 'bufferRulesets',
	    value: function bufferRulesets(rulesets) {
	      Array.prototype.push.apply(this._buffer, rulesets);
	    }

	    /**
	     * Disables the injection
	     */

	  }, {
	    key: 'disableInjection',
	    value: function disableInjection() {
	      this._injectionEnabled = false;
	    }

	    /**
	     * Enables the injection
	     */

	  }, {
	    key: 'enableInjection',
	    value: function enableInjection() {
	      this._injectionEnabled = true;
	    }

	    /**
	     * Flushes the buffered CSS to a string and returns it
	     * @return {String}
	     */

	  }, {
	    key: 'flushToString',
	    value: function flushToString() {
	      var _adonis$getOptions2 = this._adonis.getOptions(),
	          minified = _adonis$getOptions2.minified;

	      var content = this._buffer.join(minified ? '' : '\n\n');
	      this._buffer = [];
	      return content;
	    }

	    /**
	     * Injects the css rules using CSSStyleSheet#insertRule
	     * @private
	     */

	  }, {
	    key: '_injectFast',
	    value: function _injectFast() {
	      var _this = this;

	      this._buffer.forEach(function (rule) {
	        _this._sheet.insertRule(rule, _this._sheet.cssRules.length);
	      });
	    }

	    /**
	     * Injects the css rules by appending text nodes to the style node
	     * @private
	     */

	  }, {
	    key: '_injectDebug',
	    value: function _injectDebug() {
	      var css = this.flushToString();

	      var _adonis$getOptions3 = this._adonis.getOptions(),
	          minified = _adonis$getOptions3.minified;

	      var hasContent = this._styleNode.innerHTML.length > 0;
	      this._styleNode.appendChild(document.createTextNode((minified || !hasContent ? '' : '\n\n') + css));
	    }

	    /**
	     * Flushes the buffered css rules to the style node
	     */

	  }, {
	    key: 'flushToStyleTag',
	    value: function flushToStyleTag() {
	      if (!this._injectionEnabled) return;

	      var _adonis$getOptions4 = this._adonis.getOptions(),
	          injectionMode = _adonis$getOptions4.injectionMode;

	      if (injectionMode === 'fast' && this._sheet.insertRule) {
	        this._injectFast();
	      } else if (injectionMode === 'debug') {
	        this._injectDebug();
	      } else {
	        throw new Error('Unknown CSS injection mode: `' + injectionMode + '`');
	      }

	      this._buffer = [];
	    }
	  }]);

	  return StylesBuffer;
	}();

	exports.default = StylesBuffer;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _utils = __webpack_require__(6);

	var _baseAdonisComponent = __webpack_require__(7);

	var _baseAdonisComponent2 = _interopRequireDefault(_baseAdonisComponent);

	var _styles = __webpack_require__(8);

	var _styles2 = _interopRequireDefault(_styles);

	var _stylesManager = __webpack_require__(9);

	var _stylesManager2 = _interopRequireDefault(_stylesManager);

	var _preinjectionStylesManager = __webpack_require__(18);

	var _preinjectionStylesManager2 = _interopRequireDefault(_preinjectionStylesManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ComponentFactory = function () {
	  function ComponentFactory(adonis, options) {
	    _classCallCheck(this, ComponentFactory);

	    this._adonis = adonis;
	    this._options = options;
	  }

	  /**
	   * Returns a string name for the given target
	   * @param  {String|Object} target
	   * @return {String}
	   * @private
	   */


	  _createClass(ComponentFactory, [{
	    key: '_getName',
	    value: function _getName(target) {
	      if (typeof target === 'string') return target;
	      if (target.name) return target.name;
	      return 'adonis';
	    }

	    /**
	     * Returns the given target's styles. This function gets the styles recursively, meaning that
	     * if the target has another target, it returns its styles as well.
	     * @param  {ReactComponent|BaseAdonisComponent} target
	     * @return {Styles[]}
	     * @private
	     */

	  }, {
	    key: '_getTargetStyles',
	    value: function _getTargetStyles(target) {
	      var styles = [target.adonisStyles, target.adonisBaseStyles];

	      // Target has another target, get its styles
	      if (target.adonisTarget && typeof target.adonisTarget === 'string') {
	        styles.push(this._getTargetStyles(target.adonisTarget));
	      }

	      // Target has a RootElement that inherits styles
	      if (target.RootElement) {
	        styles.push(this._getTargetStyles(target.RootElement));
	      }

	      return (0, _utils.flatten)(styles).filter(function (s) {
	        return s;
	      });
	    }

	    /**
	     * Creates an adonis component for the given target
	     * @param  {String|React.Component|AdonisComponent} target
	     * @param  {Object} options
	     * @return {AdonisComponent}
	     */

	  }, {
	    key: 'createComponent',
	    value: function createComponent(target, options) {
	      var adonis = this._adonis;
	      var name = options.name;

	      if (!name) name = this._getName(target);

	      var isTag = typeof target === 'string';
	      var isAdonisComponent = target.prototype instanceof _baseAdonisComponent2.default;
	      var isComponent = !isAdonisComponent && target.prototype instanceof _react.Component;

	      var styles = options.styles,
	          variations = options.variations,
	          baseStyles = options.baseStyles;

	      var stylesObject = new _styles2.default(adonis, { styles: styles, variations: variations, name: name });

	      var allStyles = void 0,
	          stylesManager = void 0;

	      var _adonis$getOptions = adonis.getOptions(),
	          injection = _adonis$getOptions.injection,
	          theme = _adonis$getOptions.theme,
	          hashedStyles = _adonis$getOptions.hashedStyles;

	      if (injection === 'pre' && !hashedStyles) {
	        var targetStyles = this._getTargetStyles(target);
	        allStyles = targetStyles.concat([baseStyles, stylesObject]).filter(function (s) {
	          return s;
	        });
	        stylesManager = new _preinjectionStylesManager2.default(adonis, allStyles, theme);

	        var stylesBuffer = adonis.getStylesBuffer();
	        stylesBuffer.bufferRulesets(stylesManager.generateCSS());
	        stylesBuffer.flushToStyleTag();
	      }

	      var AdonisComponent = function (_BaseAdonisComponent) {
	        _inherits(AdonisComponent, _BaseAdonisComponent);

	        function AdonisComponent() {
	          var _ref;

	          _classCallCheck(this, AdonisComponent);

	          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	          }

	          var _this = _possibleConstructorReturn(this, (_ref = AdonisComponent.__proto__ || Object.getPrototypeOf(AdonisComponent)).call.apply(_ref, [this].concat(args)));

	          var activeVariations = _this._getActiveVariations();
	          allStyles = [baseStyles, stylesObject, _this.props.styles].filter(function (s) {
	            return s;
	          });
	          stylesManager = new _stylesManager2.default(adonis, allStyles, activeVariations, _this.context.theme);
	          _this._adonis = adonis;
	          return _this;
	        }

	        /**
	         * Returns a shallow clone of this component's props
	         * @return {Object}
	         * @private
	         */


	        _createClass(AdonisComponent, [{
	          key: '_cloneProps',
	          value: function _cloneProps() {
	            var _this2 = this;

	            var elementProps = {};
	            Object.keys(this.props).forEach(function (prop) {
	              elementProps[prop] = _this2.props[prop];
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
	            var _this3 = this;

	            var variations = options.variations;

	            return Object.keys(variations || {}).filter(function (variation) {
	              return !!_this3.props[variation];
	            }).sort();
	          }

	          /**
	           * Builds the class name for this component
	           * @return {String}
	           * @private
	           */

	        }, {
	          key: '_buildClassName',
	          value: function _buildClassName() {
	            var passedClassName = this.props.className;

	            // We can pass additional class names to components

	            var classNames = [];
	            classNames.push(passedClassName);

	            // Generate a class name for this component
	            classNames.push(stylesManager.getClassName());

	            return { className: classNames.filter(function (c) {
	                return c;
	              }).join(' ') };
	          }

	          /**
	           * Checks if CSS injection for this component is required
	           * @private
	           */

	        }, {
	          key: '_shouldInjectCSS',
	          value: function _shouldInjectCSS() {
	            if (!injection || hashedStyles) return false;

	            // Injection is only needed if the rendered child is a real tag
	            return isTag || isComponent && !isAdonisComponent;
	          }

	          /**
	           * Renders this component
	           * @return {React.Element}
	           */

	        }, {
	          key: 'render',
	          value: function render() {
	            var elementProps = this._cloneProps();

	            var _buildClassName2 = this._buildClassName(),
	                className = _buildClassName2.className;

	            var stylesBuffer = this._adonis.getStylesBuffer();
	            if (this._shouldInjectCSS()) {
	              stylesBuffer.bufferRulesets(stylesManager.generateCSS());

	              if (injection === true && !hashedStyles) {
	                stylesBuffer.flushToStyleTag();
	              }
	            }

	            // If an available variation is passed in as a property, we add the styles to the class and
	            // remove the prop from the props we pass to our target element
	            if (isTag) {
	              var _variations = options.variations;

	              Object.keys(_variations || {}).forEach(function (variation) {
	                delete elementProps[variation];
	              });
	            }

	            // We only need to pass the class name to tags, not to components
	            if (isTag) {
	              elementProps.className = className;
	            } else {
	              elementProps.styles = stylesObject;
	            }

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
	      }(_baseAdonisComponent2.default);

	      AdonisComponent.contextTypes = _baseAdonisComponent2.default.contextTypes;
	      AdonisComponent.adonisTarget = target;
	      AdonisComponent.adonisStyles = stylesObject;
	      AdonisComponent.adonisBaseStyles = baseStyles;

	      return AdonisComponent;
	    }
	  }]);

	  return ComponentFactory;
	}();

	exports.default = ComponentFactory;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Assigns own enumerable properties of source object(s) to the destination
	 * object for all destination properties that resolve to undefined. Once a
	 * property is set, additional values of the same property are ignored.
	 * @param  {Object} object
	 * @param  {Object} ...sources
	 * @return {Object}
	 */
	var defaults = exports.defaults = function defaults(object) {
	  for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    sources[_key - 1] = arguments[_key];
	  }

	  // Shallow clone
	  var newObject = {};
	  for (var key in object) {
	    newObject[key] = object[key];
	  }

	  // Clone sources
	  for (var i = 0; i < sources.length; i++) {
	    var source = sources[i];
	    for (var _key2 in source) {
	      if (typeof newObject[_key2] === 'undefined') {
	        newObject[_key2] = source[_key2];
	      }
	    }
	  }

	  return newObject;
	};

	/**
	 * JS Implementation of MurmurHash2
	 *
	 * @author Gary Court <gary.court@gmail.com>
	 * @see http://github.com/garycourt/murmurhash-js
	 * @author Austin Appleby <aappleby@gmail.com>
	 * @see http://sites.google.com/site/murmurhash/
	 *
	 * @param {Object}
	 * @return {String} Base 36 encoded hash result
	 */
	var hashObject = exports.hashObject = function hashObject(object) {
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
	};

	/**
	 * Returns a flattened version of the given array
	 * @param  {Array} arr
	 * @return {Array}
	 */
	var flatten = exports.flatten = function flatten(arr) {
	  return arr.reduce(function (acc, val) {
	    return acc.concat(Array.isArray(val) ? flatten(val) : val);
	  }, []);
	};

	/**
	 * Returns a copy of the given object, removing all properties that point to functions`
	 * @param  {Object} obj
	 * @return {Object}
	 */
	var toStaticStyles = exports.toStaticStyles = function toStaticStyles(obj) {
	  var newObject = {};
	  for (var key in obj) {
	    var value = obj[key];
	    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	      newObject[key] = toStaticStyles(value);
	    } else if (typeof value !== 'function') {
	      newObject[key] = value;
	    }
	  }
	  return newObject;
	};

	/**
	 * Deep merges the given target and source
	 * @param  {Object} target
	 * @param  {Object} source
	 * @return {Object}
	 */
	var deepMerge = exports.deepMerge = function deepMerge(target, source) {
	  var destination = {};

	  for (var key in target) {
	    destination[key] = target[key];
	  }

	  for (var _key3 in source) {
	    if (_typeof(source[_key3]) === 'object' && target[_key3]) {
	      destination[_key3] = deepMerge(target[_key3], source[_key3]);
	    } else {
	      destination[_key3] = source[_key3];
	    }
	  }
	  return destination;
	};

	/**
	 * Deep merges the given objects
	 * @param  {Object[]} arr
	 * @return {Object}
	 */
	var deepMergeAll = exports.deepMergeAll = function deepMergeAll(arr) {
	  return arr.reduce(function (prev, next) {
	    return deepMerge(prev, next);
	  });
	};

	/**
	 * Walks through the given object, if it finds a function, it calls it with the given `theme`
	 * object and places the result at the same key
	 * @param  {Object} object
	 * @param  {Object} theme
	 * @return {Object}
	 */
	var resolveStylesObject = exports.resolveStylesObject = function resolveStylesObject(object, theme) {
	  var resolved = {};
	  for (var key in object) {
	    var value = object[key];
	    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	      resolved[key] = resolveStylesObject(value, theme);
	    } else if (typeof value === 'function') {
	      if (!theme) {
	        throw new Error('Trying to resolve a dynamic property without a `theme` given.');
	      }
	      resolved[key] = value(theme);
	    } else {
	      resolved[key] = value;
	    }
	  }
	  return resolved;
	};

	/**
	 * Returns all possible combinations for the given set of objects
	 * @param  {*[]} set
	 * @return {*[]}
	 */
	var findAllCombinations = exports.findAllCombinations = function findAllCombinations(set) {
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
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

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

	exports.default = BaseAdonisComponent;

	BaseAdonisComponent.contextTypes = {
	  theme: _react.PropTypes.object
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Styles = function () {
	  function Styles(adonis, options) {
	    _classCallCheck(this, Styles);

	    this._adonis = adonis;
	    this._options = options;

	    var _adonis$getOptions = this._adonis.getOptions(),
	        hashedStyles = _adonis$getOptions.hashedStyles;

	    if (hashedStyles && typeof this._options.styles !== 'string') {
	      throw new Error('Passing style objects with `hashedStyles` set to true is invalid.');
	    }
	    this._hash = hashedStyles ? this._options.styles : (0, _utils.hashObject)(this._options.styles);
	    this._variationHashes = this._hashVariations();
	  }

	  /**
	   * Generates hashes for all existing variations
	   * @return {Object}
	   * @private
	   */


	  _createClass(Styles, [{
	    key: '_hashVariations',
	    value: function _hashVariations() {
	      var hashes = {};

	      var _adonis$getOptions2 = this._adonis.getOptions(),
	          hashedStyles = _adonis$getOptions2.hashedStyles;

	      var variations = this._options.variations;

	      for (var variation in variations) {
	        var variationStyles = variations[variation];
	        hashes[variation] = hashedStyles ? variationStyles : (0, _utils.hashObject)(variationStyles);
	      }
	      return hashes;
	    }

	    /**
	     * Returns an identifier for the given active variations
	     * @param  {String[]} variations
	     * @return {String}
	     */

	  }, {
	    key: 'getIdentifierForVariations',
	    value: function getIdentifierForVariations(variations) {
	      var _this = this;

	      var name = this._options.name;

	      var _adonis$getOptions3 = this._adonis.getOptions(),
	          hashSeparator = _adonis$getOptions3.hashSeparator,
	          variationSeparator = _adonis$getOptions3.variationSeparator;

	      var identifier = '' + name + hashSeparator + this._hash;
	      variations.sort().forEach(function (variation) {
	        var hash = _this._variationHashes[variation];
	        if (!hash) return;
	        identifier += '' + variationSeparator + variation + hashSeparator + hash;
	      });
	      return identifier;
	    }

	    /**
	     * Returns the styles object
	     * @return {Object}
	     */

	  }, {
	    key: 'getStyles',
	    value: function getStyles() {
	      return this._options.styles;
	    }

	    /**
	     * Returns the styles for the given variations
	     * @param  {String[]} variations
	     * @return {Object[]}
	     */

	  }, {
	    key: 'getVariationStyles',
	    value: function getVariationStyles(variations) {
	      var allVariations = this._options.variations;

	      return variations.map(function (variation) {
	        return allVariations[variation];
	      });
	    }

	    /**
	     * Returns all available variations
	     * @return {String[]}
	     */

	  }, {
	    key: 'getVariations',
	    value: function getVariations() {
	      return Object.keys(this._options.variations || {});
	    }
	  }]);

	  return Styles;
	}();

	exports.default = Styles;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(6);

	var _ruleset = __webpack_require__(10);

	var _ruleset2 = _interopRequireDefault(_ruleset);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var StylesManager = function () {
	  function StylesManager(adonis, styles, activeVariations, theme) {
	    _classCallCheck(this, StylesManager);

	    this._adonis = adonis;
	    this._styles = styles;
	    this._theme = theme;
	    this._activeVariations = activeVariations;
	    this._className = this._generateClassName(this._activeVariations);
	    this._baseSelector = '.' + this._className;
	    this._rulesets = this._generateRulesets();
	  }

	  /**
	   * Generates the CSS of all rulesets
	   * @return {String[]}
	   */


	  _createClass(StylesManager, [{
	    key: 'generateCSS',
	    value: function generateCSS() {
	      return this._rulesets.map(function (ruleset) {
	        return ruleset.toCSS();
	      }).filter(function (r) {
	        return r;
	      });
	    }

	    /**
	     * Returns the deeply merged styles object
	     * @param {String[]} activeVariations = []
	     * @return {Object}
	     * @private
	     */

	  }, {
	    key: '_getCombinedStyles',
	    value: function _getCombinedStyles() {
	      var activeVariations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	      var allStyles = (0, _utils.flatten)(this._styles.map(function (s) {
	        return [s.getStyles(), s.getVariationStyles(activeVariations)];
	      }));

	      return (0, _utils.deepMergeAll)(allStyles);
	    }

	    /**
	     * Generates the class name
	     * @param {String[]} activeVariations = []
	     * @return {String}
	     * @private
	     */

	  }, {
	    key: '_generateClassName',
	    value: function _generateClassName() {
	      var activeVariations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	      var _adonis$getOptions = this._adonis.getOptions(),
	          nameSeparator = _adonis$getOptions.nameSeparator,
	          selectorPrefix = _adonis$getOptions.selectorPrefix;

	      return selectorPrefix + this._styles.map(function (style) {
	        return style.getIdentifierForVariations(activeVariations);
	      }).join(nameSeparator);
	    }

	    /**
	     * Generates the rulesets and sub rulesets
	     * @return {Ruleset[]}
	     * @private
	     */

	  }, {
	    key: '_generateRulesets',
	    value: function _generateRulesets() {
	      var defaultRuleset = new _ruleset2.default(this._adonis, this._baseSelector, this._getCombinedStyles(this._activeVariations), {
	        theme: this._theme
	      });
	      return (0, _utils.flatten)([defaultRuleset, defaultRuleset.getSubRulesets()]);
	    }

	    /**
	     * Returns the class name
	     * @return {String}
	     */

	  }, {
	    key: 'getClassName',
	    value: function getClassName() {
	      return this._className;
	    }
	  }]);

	  return StylesManager;
	}();

	exports.default = StylesManager;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(6);

	var _declaration = __webpack_require__(11);

	var _declaration2 = _interopRequireDefault(_declaration);

	var _extensions = __webpack_require__(13);

	var _extensions2 = _interopRequireDefault(_extensions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Ruleset = function () {
	  function Ruleset(adonis, selector, styles, options) {
	    _classCallCheck(this, Ruleset);

	    this._options = options;

	    this._adonis = adonis;
	    this._selector = selector;
	    this._styles = styles;
	    this._resolvedStyles = (0, _utils.resolveStylesObject)(this._styles, this._options.theme);

	    var _adonis$getOptions = this._adonis.getOptions(),
	        hashedStyles = _adonis$getOptions.hashedStyles;

	    this._hash = hashedStyles ? this._styles : (0, _utils.hashObject)(this._styles);

	    var _parseStyles2 = this._parseStyles(),
	        subRulesets = _parseStyles2.subRulesets,
	        declarations = _parseStyles2.declarations;

	    this._subRulesets = subRulesets;
	    this._declarations = declarations;
	  }

	  /**
	   * If any registered extension resolves the given key to a sub ruleset, this method
	   * returns the new Ruleset
	   * @param  {String} key
	   * @param  {String|Object} value
	   * @return {Ruleset}
	   * @private
	   */


	  _createClass(Ruleset, [{
	    key: '_getSubRuleset',
	    value: function _getSubRuleset(key, value) {
	      var _this = this;

	      var _adonis$getOptions2 = this._adonis.getOptions(),
	          minified = _adonis$getOptions2.minified;

	      var subRuleset = null;
	      var generateSubRuleset = function generateSubRuleset(newSelector, parentSelector) {
	        var options = (0, _utils.deepMerge)(_this._options, {
	          parentSelector: parentSelector
	        });
	        subRuleset = new Ruleset(_this._adonis, newSelector, value, options);
	      };

	      for (var i = 0; i < _extensions2.default.length; i++) {
	        var extension = _extensions2.default[i];
	        extension(key, this._selector, generateSubRuleset, minified);
	        if (subRuleset) return subRuleset;
	      }
	    }

	    /**
	     * Parses this ruleset's styles object and returns the parsed declarations and sub rulesets
	     * @return {Object}
	     * @private
	     */

	  }, {
	    key: '_parseStyles',
	    value: function _parseStyles() {
	      var subRulesets = [];
	      var declarations = [];
	      for (var key in this._resolvedStyles) {
	        var value = this._resolvedStyles[key];
	        var subRuleset = this._getSubRuleset(key, value);
	        if (subRuleset) {
	          subRulesets.push(subRuleset, subRuleset.getSubRulesets());
	        } else {
	          declarations.push(new _declaration2.default(this._adonis, key, value));
	        }
	      }
	      return { subRulesets: subRulesets, declarations: declarations };
	    }

	    /**
	     * Returns the CSS string for this ruleset
	     * @return {String}
	     */

	  }, {
	    key: 'toCSS',
	    value: function toCSS() {
	      var _adonis$getOptions3 = this._adonis.getOptions(),
	          minified = _adonis$getOptions3.minified;

	      if (this._declarations.length === 0) return null;

	      var css = '';
	      var indentation = '';
	      if (this._options.parentSelector) {
	        css += this._options.parentSelector + (minified ? '{' : ' {\n');
	        indentation = '  ';
	      }

	      css += indentation + this._selector + (minified ? '{' : ' {\n');
	      this._declarations.forEach(function (rule) {
	        css += indentation + rule.toCSS() + (minified ? '' : '\n');
	      });
	      css += indentation + '}';

	      if (this._options.parentSelector) {
	        css += minified ? '}' : '\n}';
	      }
	      return css;
	    }

	    /**
	     * Returns this ruleset's sub rulesets
	     * @return {Ruleset[]}
	     */

	  }, {
	    key: 'getSubRulesets',
	    value: function getSubRulesets() {
	      return this._subRulesets;
	    }
	  }]);

	  return Ruleset;
	}();

	exports.default = Ruleset;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _cssPrefixes = __webpack_require__(12);

	var _cssPrefixes2 = _interopRequireDefault(_cssPrefixes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Declaration = function () {
	  function Declaration(adonis, key, value) {
	    _classCallCheck(this, Declaration);

	    this._adonis = adonis;
	    this.key = key;
	    this.value = value;
	    this.cssKey = this.key.replace(/([A-Z])/g, function (g) {
	      return '-' + g[0].toLowerCase();
	    });
	  }

	  /**
	   * If this declaration's key requires vendor prefixes, this function returns an array of [key, value]
	   * pairs with prefixed keys.
	   * @return {Array[]}
	   * @private
	   */


	  _createClass(Declaration, [{
	    key: '_getAutoPrefixedKeyPairs',
	    value: function _getAutoPrefixedKeyPairs() {
	      var _this = this;

	      var prefixes = _cssPrefixes2.default[this.key];
	      var keyPairs = [];
	      if (prefixes) {
	        prefixes.forEach(function (prefix) {
	          keyPairs.push(['-' + prefix + '-' + _this.cssKey, _this.value]);
	        });
	      }
	      return keyPairs;
	    }

	    /**
	     * Returns the CSS string for this declaration
	     * @return {String}
	     */

	  }, {
	    key: 'toCSS',
	    value: function toCSS() {
	      var _adonis$getOptions = this._adonis.getOptions(),
	          minified = _adonis$getOptions.minified,
	          autoPrefix = _adonis$getOptions.autoPrefix;

	      var keyPairs = [[this.cssKey, this.value]];
	      if (autoPrefix) {
	        keyPairs = keyPairs.concat(this._getAutoPrefixedKeyPairs());
	      }

	      return keyPairs.map(function (_ref) {
	        var _ref2 = _slicedToArray(_ref, 2),
	            key = _ref2[0],
	            value = _ref2[1];

	        return '' + (minified ? '' : '  ') + key + ':' + (minified ? '' : ' ') + value + ';';
	      }).join(minified ? '' : '\n');
	    }
	  }]);

	  return Declaration;
	}();

	exports.default = Declaration;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var wk = 'webkit';
	var mz = 'moz';
	var ms = 'ms';
	exports.default = {
	  appearance: [wk, mz],
	  userSelect: [wk, mz, ms],
	  textEmphasisPosition: [wk],
	  textEmphasis: [wk],
	  textEmphasisStyle: [wk],
	  textEmphasisColor: [wk],
	  boxDecorationBreak: [wk],
	  clipPath: [wk],
	  maskImage: [wk],
	  maskMode: [wk],
	  maskRepeat: [wk],
	  maskPosition: [wk],
	  maskClip: [wk],
	  maskOrigin: [wk],
	  maskSize: [wk],
	  maskComposite: [wk],
	  mask: [wk],
	  maskBorderSource: [wk],
	  maskBorderMode: [wk],
	  maskBorderSlice: [wk],
	  maskBorderWidth: [wk],
	  maskBorderOutset: [wk],
	  maskBorderRepeat: [wk],
	  maskBorder: [wk],
	  maskType: [wk],
	  textDecorationStyle: [wk],
	  textDecorationSkip: [wk],
	  textDecorationLine: [wk],
	  textDecorationColor: [wk],
	  filter: [wk],
	  fontFeatureSettings: [wk],
	  breakAfter: [wk, mz, ms],
	  breakBefore: [wk, mz, ms],
	  breakInside: [wk, mz, ms],
	  columnCount: [wk, mz],
	  columnFill: [wk, mz],
	  columnGap: [wk, mz],
	  columnRule: [wk, mz],
	  columnRuleColor: [wk, mz],
	  columnRuleStyle: [wk, mz],
	  columnRuleWidth: [wk, mz],
	  columns: [wk, mz],
	  columnSpan: [wk, mz],
	  columnWidth: [wk, mz],
	  flex: [wk],
	  flexBasis: [wk],
	  flexDirection: [wk],
	  flexGrow: [wk],
	  flexFlow: [wk],
	  flexShrink: [wk],
	  flexWrap: [wk],
	  alignContent: [wk],
	  alignItems: [wk],
	  alignSelf: [wk],
	  justifyContent: [wk],
	  order: [wk],
	  transform: [wk],
	  transformOrigin: [wk],
	  transformOriginX: [wk],
	  transformOriginY: [wk],
	  backfaceVisibility: [wk],
	  perspective: [wk],
	  perspectiveOrigin: [wk],
	  transformStyle: [wk],
	  transformOriginZ: [wk],
	  animation: [wk],
	  animationDelay: [wk],
	  animationDirection: [wk],
	  animationFillMode: [wk],
	  animationDuration: [wk],
	  animationIterationCount: [wk],
	  animationName: [wk],
	  animationPlayState: [wk],
	  animationTimingFunction: [wk],
	  backdropFilter: [wk],
	  fontKerning: [wk],
	  scrollSnapType: [wk, ms],
	  scrollSnapPointsX: [wk, ms],
	  scrollSnapPointsY: [wk, ms],
	  scrollSnapDestination: [wk, ms],
	  scrollSnapCoordinate: [wk, ms],
	  shapeImageThreshold: [wk],
	  shapeImageMargin: [wk],
	  shapeImageOutside: [wk],
	  hyphens: [wk, mz, ms],
	  flowInto: [wk, ms],
	  flowFrom: [wk, ms],
	  regionFragment: [wk, ms],
	  textAlignLast: [mz],
	  tabSize: [mz],
	  wrapFlow: [ms],
	  wrapThrough: [ms],
	  wrapMargin: [ms],
	  gridTemplateColumns: [ms],
	  gridTemplateRows: [ms],
	  gridTemplateAreas: [ms],
	  gridTemplate: [ms],
	  gridAutoColumns: [ms],
	  gridAutoRows: [ms],
	  gridAutoFlow: [ms],
	  grid: [ms],
	  gridRowStart: [ms],
	  gridColumnStart: [ms],
	  gridRowEnd: [ms],
	  gridRow: [ms],
	  gridColumn: [ms],
	  gridColumnEnd: [ms],
	  gridColumnGap: [ms],
	  gridRowGap: [ms],
	  gridArea: [ms],
	  gridGap: [ms],
	  textSizeAdjust: [wk, ms],
	  transitionDelay: [wk],
	  transitionDuration: [wk],
	  transitionProperty: [wk],
	  transitionTimingFunction: [wk]
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _immediateChildSelectorExtension = __webpack_require__(14);

	var _immediateChildSelectorExtension2 = _interopRequireDefault(_immediateChildSelectorExtension);

	var _selfSelectorExtension = __webpack_require__(15);

	var _selfSelectorExtension2 = _interopRequireDefault(_selfSelectorExtension);

	var _pseudoClassesExtension = __webpack_require__(16);

	var _pseudoClassesExtension2 = _interopRequireDefault(_pseudoClassesExtension);

	var _mediaQueryExtension = __webpack_require__(17);

	var _mediaQueryExtension2 = _interopRequireDefault(_mediaQueryExtension);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = [_immediateChildSelectorExtension2.default, _selfSelectorExtension2.default, _pseudoClassesExtension2.default, _mediaQueryExtension2.default];

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * Creates a sub ruleset every time an immediate child selector (e.g. '> h1') is found
	 */
	exports.default = function (selector, baseSelector, generateSubRuleset, minified) {
	  selector = selector.trim();
	  if (selector[0] !== '>') {
	    return null;
	  }
	  selector = selector.slice(1).trim();
	  var newSelector = baseSelector;
	  if (!minified) newSelector += ' ';
	  newSelector += '>';
	  if (!minified) newSelector += ' ';
	  newSelector += selector;

	  return generateSubRuleset(newSelector);
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * Creates a sub ruleset every time a self selector (e.g. '& h1, h2, h3') is found
	 */
	exports.default = function (selector, baseSelector, generateSubRuleset, minified) {
	  selector = selector.trim();
	  if (selector[0] !== '&') {
	    return null;
	  }

	  var extendingSelector = !selector.match(/^&\s+/); // `&.foo` (extending) vs. `& .foo` (non extending)
	  selector = selector.replace(/^&/, ''); // `& h1, h2, h3` => ` h1, h2, h3`

	  var newSelector = selector.split(',').map(function (s) {
	    return s.trim();
	  }) // h1, h2, h3 => [h1, h2, h3]
	  .map(function (s, i) {
	    return '' + baseSelector + (i === 0 && extendingSelector ? '' : ' ') + s;
	  }) // [h1, h2, h3] => [.base h1, .base h2, .base h3]
	  .join(', '); // [.base h1, .base h2, .base h3] => `.base h1, .base h2, .base h3`
	  return generateSubRuleset(newSelector);
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * Creates a sub ruleset every time an pseudo class (e.g. ':last-child') is found
	 */
	exports.default = function (selector, baseSelector, generateSubRuleset, minified) {
	  selector = selector.trim();
	  if (selector[0] !== ':') {
	    return null;
	  }

	  var newSelector = baseSelector + selector;
	  return generateSubRuleset(newSelector);
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * Creates a sub ruleset every time a media query is found
	 */
	exports.default = function (selector, baseSelector, generateSubRuleset, minified) {
	  selector = selector.trim();
	  if (selector[0] !== '@') {
	    return null;
	  }

	  return generateSubRuleset(baseSelector, selector);
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(6);

	var _ruleset = __webpack_require__(10);

	var _ruleset2 = _interopRequireDefault(_ruleset);

	var _stylesManager = __webpack_require__(9);

	var _stylesManager2 = _interopRequireDefault(_stylesManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * The PreinjectionStylesManager is similar to StylesManager, except that it creates styles for
	 * every possible combination of active variations
	 */
	var PreinjectionStylesManager = function (_StylesManager) {
	  _inherits(PreinjectionStylesManager, _StylesManager);

	  function PreinjectionStylesManager(adonis, styles, theme) {
	    _classCallCheck(this, PreinjectionStylesManager);

	    return _possibleConstructorReturn(this, (PreinjectionStylesManager.__proto__ || Object.getPrototypeOf(PreinjectionStylesManager)).call(this, adonis, styles, [], theme));
	  }

	  /**
	   * Generates rulesets for all possible variation combinations
	   * @return {Ruleset[]}
	   * @private
	   */


	  _createClass(PreinjectionStylesManager, [{
	    key: '_generateVariationRulesets',
	    value: function _generateVariationRulesets() {
	      var _this2 = this;

	      var allVariations = (0, _utils.flatten)(this._styles.map(function (s) {
	        return s.getVariations();
	      }));
	      var allCombinations = (0, _utils.findAllCombinations)(allVariations);

	      return allCombinations.map(function (variations) {
	        var className = _this2._generateClassName(variations);
	        var selector = '.' + className;
	        return new _ruleset2.default(_this2._adonis, selector, _this2._getCombinedStyles(variations), {
	          theme: _this2._theme
	        });
	      });
	    }

	    /**
	     * Generates the rulesets and sub rulesets
	     * @return {Ruleset[]}
	     * @private
	     */

	  }, {
	    key: '_generateRulesets',
	    value: function _generateRulesets() {
	      var defaultRuleset = new _ruleset2.default(this._adonis, this._baseSelector, this._getCombinedStyles(), {
	        theme: this._theme
	      });
	      var rulesets = [defaultRuleset, defaultRuleset.getSubRulesets()];
	      rulesets.push(this._generateVariationRulesets());
	      return (0, _utils.flatten)(rulesets);
	    }
	  }]);

	  return PreinjectionStylesManager;
	}(_stylesManager2.default);

	exports.default = PreinjectionStylesManager;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', 'circle', 'clipPath', 'defs', 'ellipse', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _styles = __webpack_require__(8);

	var _styles2 = _interopRequireDefault(_styles);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BaseStyles = function (_Styles) {
	  _inherits(BaseStyles, _Styles);

	  function BaseStyles() {
	    _classCallCheck(this, BaseStyles);

	    return _possibleConstructorReturn(this, (BaseStyles.__proto__ || Object.getPrototypeOf(BaseStyles)).apply(this, arguments));
	  }

	  return BaseStyles;
	}(_styles2.default);

	exports.default = BaseStyles;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	exports.default = function (ThemableComponent) {
	  var ComponentWithTheme = function (_React$Component) {
	    _inherits(ComponentWithTheme, _React$Component);

	    function ComponentWithTheme() {
	      _classCallCheck(this, ComponentWithTheme);

	      return _possibleConstructorReturn(this, (ComponentWithTheme.__proto__ || Object.getPrototypeOf(ComponentWithTheme)).apply(this, arguments));
	    }

	    _createClass(ComponentWithTheme, [{
	      key: '_cloneProps',

	      /**
	       * Returns a shallow clone of this component's props
	       * @return {Object}
	       * @private
	       */
	      value: function _cloneProps() {
	        var _this2 = this;

	        var elementProps = {};
	        Object.keys(this.props).forEach(function (prop) {
	          elementProps[prop] = _this2.props[prop];
	        });
	        return elementProps;
	      }

	      /**
	       * Renders the component
	       * @return {React.Element|React.Component}
	       */

	    }, {
	      key: 'render',
	      value: function render() {
	        var elementProps = this._cloneProps();

	        var innerRef = elementProps.innerRef;

	        if (innerRef) {
	          elementProps.ref = innerRef;
	        }
	        delete elementProps.innerRef;

	        return _react2.default.createElement(ThemableComponent, elementProps);
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

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

/***/ }
/******/ ])
});
;