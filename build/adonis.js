(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Adonis"] = factory(require("react"));
	else
		root["Adonis"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__) {
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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ThemeProvider = exports.withTheme = undefined;

	var _adonis = __webpack_require__(1);

	var _adonis2 = _interopRequireDefault(_adonis);

	var _domElements = __webpack_require__(28);

	var _domElements2 = _interopRequireDefault(_domElements);

	var _baseStyles = __webpack_require__(29);

	var _baseStyles2 = _interopRequireDefault(_baseStyles);

	var _withTheme = __webpack_require__(30);

	var _withTheme2 = _interopRequireDefault(_withTheme);

	var _themeProvider = __webpack_require__(31);

	var _themeProvider2 = _interopRequireDefault(_themeProvider);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (options) {
	  var adonis = new _adonis2.default(options);

	  // adonis()
	  var factory = function factory(target) {
	    if (target instanceof _baseStyles2.default) {
	      // adonis(BaseStyles).div(styles, variations, name)
	      var baseStyles = target;
	      var _factory = {};
	      _domElements2.default.forEach(function (domElement) {
	        _factory[domElement] = function (styles, variations, name) {
	          if (typeof variations === 'string') {
	            name = variations;
	            variations = undefined;
	          }

	          return adonis.createComponent(domElement, {
	            styles: styles, variations: variations, name: name, baseStyles: baseStyles
	          });
	        };
	      });
	      return _factory;
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

	  // adonis.global(css, force = false)
	  factory.global = function (css) {
	    var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	    var _adonis$getOptions = adonis.getOptions(),
	        injection = _adonis$getOptions.injection,
	        theme = _adonis$getOptions.theme;

	    if (!injection && !force) return;

	    if (typeof css === 'function') {
	      css = css(theme);
	    }

	    var stylesBuffer = adonis.getStylesBuffer();
	    stylesBuffer.bufferCSS(css);
	    stylesBuffer.flushToStyleTag(force);
	  };

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _stylesBuffer = __webpack_require__(3);

	var _stylesBuffer2 = _interopRequireDefault(_stylesBuffer);

	var _componentFactory = __webpack_require__(5);

	var _componentFactory2 = _interopRequireDefault(_componentFactory);

	var _utils = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var production = typeof process !== 'undefined' && process.env.NODE_ENV === 'production';

	var Adonis = function () {
	  /**
	   * @param  {Object} [options]
	   * @param  {Boolean|String} [options.injection = true] If `true`, styles will be injected on render,
	   *                                              if `false`, they will not be injected. If set to
	   *                                              `pre`, styles are injected before rendering.
	   * @param {Boolean} [options.batchInjection = true] Should CSS injections be batched?
	   * @param {Boolean} [options.minified = false] Should the resulting CSS be minified?
	   * @param {Boolean} [options.autoPrefix = true] Should adonis automatically add vendor prefixes to
	   *                                       CSS properties when necessary?
	   * @param {String} [options.cssSelectorPrefix = ''] The selector prepended to all CSS rules
	   * @param {String} [options.classNamePrefix = ''] The string prepended to all class names
	   * @param {String} [options.hashSeparator = '-'] The string that is used to separate element names
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
	      batchInjection: true,
	      minified: false,
	      autoPrefix: true,
	      cssSelectorPrefix: '',
	      classNamePrefix: '',
	      hashSeparator: '-',
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

	      var output = this._stylesBuffer.flushToString(true);
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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

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
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var StylesBuffer = function () {
	  function StylesBuffer(adonis) {
	    _classCallCheck(this, StylesBuffer);

	    this._adonis = adonis;
	    this._injectionEnabled = true;
	    this._bufferedSelectors = {};
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
	  }, {
	    key: 'bufferCSS',
	    value: function bufferCSS(css) {
	      this._buffer.push(css);
	    }

	    /**
	     * Buffers the given array of css rulesets
	     * @param  {String[][]} rulesets
	     */

	  }, {
	    key: 'bufferRulesets',
	    value: function bufferRulesets(rulesets) {
	      var _this = this;

	      rulesets.forEach(function (_ref) {
	        var _ref2 = _slicedToArray(_ref, 2),
	            selector = _ref2[0],
	            css = _ref2[1];

	        _this._bufferedSelectors[selector] = true;
	      });
	      Array.prototype.push.apply(this._buffer, rulesets.map(function (_ref3) {
	        var _ref4 = _slicedToArray(_ref3, 2),
	            css = _ref4[1];

	        return css;
	      }));
	    }

	    /**
	     * Checks if the given selector has been buffered already
	     * @param  {String}  selector
	     * @return {Boolean}
	     */

	  }, {
	    key: 'isSelectorBuffered',
	    value: function isSelectorBuffered(selector) {
	      return this._bufferedSelectors[selector];
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
	     * @param {Boolean} clearBufferedSelectors = false
	     * @return {String}
	     */

	  }, {
	    key: 'flushToString',
	    value: function flushToString() {
	      var clearBufferedSelectors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      var _adonis$getOptions2 = this._adonis.getOptions(),
	          minified = _adonis$getOptions2.minified;

	      var content = this._buffer.join(minified ? '' : '\n\n');
	      this._buffer = [];
	      if (clearBufferedSelectors) {
	        this._bufferedSelectors = {};
	      }
	      return content;
	    }

	    /**
	     * Injects the css rules using CSSStyleSheet#insertRule
	     * @private
	     */

	  }, {
	    key: '_injectFast',
	    value: function _injectFast() {
	      var _this2 = this;

	      this._buffer.forEach(function (rule) {
	        _this2._sheet.insertRule(rule, _this2._sheet.cssRules.length);
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
	      if (!css) return;

	      var _adonis$getOptions3 = this._adonis.getOptions(),
	          minified = _adonis$getOptions3.minified;

	      var hasContent = this._styleNode.innerHTML.length > 0;
	      this._styleNode.appendChild(document.createTextNode((minified || !hasContent ? '' : '\n\n') + css));
	    }

	    /**
	     * Actually flushes the css rules to the style node
	     * @private
	     */

	  }, {
	    key: '_flushToStyleTag',
	    value: function _flushToStyleTag() {
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

	    /**
	     * Schedules the injection of css rules into the style node
	     */

	  }, {
	    key: 'flushToStyleTag',
	    value: function flushToStyleTag() {
	      var _this3 = this;

	      if (!this._injectionEnabled) return;

	      var _adonis$getOptions5 = this._adonis.getOptions(),
	          batchInjection = _adonis$getOptions5.batchInjection;

	      if (!this._nextTick && batchInjection) {
	        this._nextTick = (0, _utils.requestAnimationFrame)(function () {
	          _this3._nextTick = null;
	          _this3._flushToStyleTag();
	        });
	      } else if (!batchInjection) {
	        this._flushToStyleTag();
	      }
	    }
	  }]);

	  return StylesBuffer;
	}();

	exports.default = StylesBuffer;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

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
	  }, {});
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

	/**
	 * Polyfill for window.requestAnimationFrame
	 * @return {Function}
	 */
	var requestAnimationFrame = exports.requestAnimationFrame = function () {
	  var lastAF = 0;
	  var root = typeof global === 'undefined' ? window : global;
	  var rAF = root.requestAnimationFrame;

	  var vendors = ['ms', 'moz', 'webkit', 'o'];
	  for (var x = 0; x < vendors.length && !rAF; ++x) {
	    rAF = root[vendors[x] + 'RequestAnimationFrame'];
	  }

	  if (!rAF && typeof root !== 'undefined' && root.setImmediate) {
	    rAF = root.setImmediate;
	  }

	  // we need to bind it to root, else we will get an illegal invocation errors
	  if (rAF) {
	    rAF = rAF.bind(root);
	  }

	  if (!rAF) {
	    rAF = function rAF(callback) {
	      var currTime = new Date().getTime();
	      var timeToCall = Math.max(0, 16 - (currTime - lastAF));
	      var id = setTimeout(function () {
	        callback(currTime + timeToCall);
	      }, timeToCall);
	      lastAF = currTime + timeToCall;
	      return id;
	    };
	  }

	  return rAF;
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _utils = __webpack_require__(4);

	var _baseAdonisComponent = __webpack_require__(7);

	var _baseAdonisComponent2 = _interopRequireDefault(_baseAdonisComponent);

	var _styles = __webpack_require__(17);

	var _styles2 = _interopRequireDefault(_styles);

	var _stylesManager = __webpack_require__(18);

	var _stylesManager2 = _interopRequireDefault(_stylesManager);

	var _preinjectionStylesManager = __webpack_require__(27);

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
	    value: function _getTargetStyles(target, name) {
	      var styles = [target.adonisBaseStyles, target.adonisStyles];

	      // Target has another target, get its styles
	      if (target.adonisTarget) {
	        styles.unshift(this._getTargetStyles(target.adonisTarget));
	      }

	      // Target has a RootElement that inherits styles
	      if (target.RootElement) {
	        styles.unshift(this._getTargetStyles(target.RootElement));
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

	      variations = variations || {};
	      var stylesObject = new _styles2.default(adonis, { styles: styles, variations: variations, name: name });

	      var _adonis$getOptions = adonis.getOptions(),
	          injection = _adonis$getOptions.injection,
	          theme = _adonis$getOptions.theme,
	          hashedStyles = _adonis$getOptions.hashedStyles;

	      if (injection === 'pre' && !hashedStyles) {
	        var targetStyles = this._getTargetStyles(target, name);
	        var allStyles = void 0,
	            stylesManager = void 0;
	        allStyles = targetStyles.concat([baseStyles, stylesObject]).filter(function (s) {
	          return s;
	        });
	        stylesManager = new _preinjectionStylesManager2.default(adonis, allStyles, theme);

	        stylesManager.bufferRulesets();
	        var stylesBuffer = adonis.getStylesBuffer();
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

	          _this._updateStylesManager();
	          _this._adonis = adonis;
	          return _this;
	        }

	        _createClass(AdonisComponent, [{
	          key: '_updateStylesManager',


	          /**
	           * Updates the styles manager for the given props
	           * @param  {Object} props
	           * @private
	           */
	          value: function _updateStylesManager() {
	            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

	            this._allStyles = [baseStyles, stylesObject].concat(props.styles || []).filter(function (s) {
	              return s;
	            });

	            var activeVariations = this._getActiveVariationsFromProps(props);
	            this._stylesManager = new _stylesManager2.default(adonis, this._allStyles, activeVariations, this.context.theme);
	          }

	          /**
	           * Invoked before a mounted component receives new props
	           * @param  {Object} props
	           */

	        }, {
	          key: 'componentWillReceiveProps',
	          value: function componentWillReceiveProps(props) {
	            var _this2 = this;

	            var stylesChanged = props.styles !== this.props.styles;

	            var variationsChanged = false;
	            var allVariations = (0, _utils.flatten)(this._allStyles.map(function (s) {
	              return s.getVariations();
	            }));

	            allVariations.forEach(function (variation) {
	              if (props[variation] !== _this2.props[variation]) {
	                variationsChanged = true;
	              }
	            });

	            if (stylesChanged || variationsChanged) {
	              this._updateStylesManager(props);
	            }
	          }

	          /**
	           * Returns a shallow clone of this component's props
	           * @return {Object}
	           * @private
	           */

	        }, {
	          key: '_cloneProps',
	          value: function _cloneProps() {
	            var _this3 = this;

	            var elementProps = {};
	            Object.keys(this.props).forEach(function (prop) {
	              elementProps[prop] = _this3.props[prop];
	            });
	            return elementProps;
	          }

	          /**
	           * Returns an array containing the active variations for this component from the given props
	           * @param {Object} props
	           * @return {String[]}
	           * @private
	           */

	        }, {
	          key: '_getActiveVariationsFromProps',
	          value: function _getActiveVariationsFromProps() {
	            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

	            var variationsSet = {};
	            this._allStyles.forEach(function (s) {
	              return s.getVariations().forEach(function (variation) {
	                return variationsSet[variation] = true;
	              });
	            });

	            return Object.keys(variationsSet).filter(function (p) {
	              return props[p] === true;
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
	            var generatedClassName = this._stylesManager.getClassName();
	            classNames.push(generatedClassName);

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
	              this._stylesManager.bufferRulesets();

	              if (injection === true && !hashedStyles) {
	                stylesBuffer.flushToStyleTag();
	              }
	            }

	            // If an available variation is passed in as a property, we add the styles to the class and
	            // remove the prop from the props we pass to our target element
	            if (isTag) {
	              var _variations = options.variations;

	              if (_variations) {
	                Object.keys(_variations).forEach(function (variation) {
	                  delete elementProps[variation];
	                });
	              }

	              // Remove variations passed from parent
	              if (this.props._activeParentVariations) {
	                this.props._activeParentVariations.forEach(function (variation) {
	                  delete elementProps[variation];
	                });
	              }

	              // Remove variations from base styles
	              if (baseStyles) {
	                baseStyles.getVariations().forEach(function (variation) {
	                  delete elementProps[variation];
	                });
	              }
	            }

	            // We only need to pass the class name to tags, not to components
	            if (isTag) {
	              elementProps.className = className;
	            } else {
	              elementProps.styles = (0, _utils.flatten)([stylesObject].concat(this.props.styles || []));
	              elementProps._activeParentVariations = Object.keys(variations || {}).concat(this.props._activeParentVariations || []);
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
	              delete elementProps._activeParentVariations;
	            }

	            return _react2.default.createElement(target, elementProps, children);
	          }
	        }], [{
	          key: 'name',
	          get: function get() {
	            return name;
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

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(6);

	var _propTypes = __webpack_require__(8);

	var _propTypes2 = _interopRequireDefault(_propTypes);

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

	exports.default = BaseAdonisComponent;

	BaseAdonisComponent.contextTypes = {
	  theme: _propTypes2.default.object
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (process.env.NODE_ENV !== 'production') {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(9)(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(16)();
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(10);
	var invariant = __webpack_require__(11);
	var warning = __webpack_require__(12);
	var assign = __webpack_require__(13);

	var ReactPropTypesSecret = __webpack_require__(14);
	var checkPropTypes = __webpack_require__(15);

	module.exports = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if (process.env.NODE_ENV !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          invariant(
	            false,
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            warning(
	              false,
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `%s` prop on `%s`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
	              propFullName,
	              componentName
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        warning(
	          false,
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received %s at index %s.',
	          getPostfixForTypeWarning(checker),
	          i
	        );
	        return emptyFunction.thatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (process.env.NODE_ENV !== 'production') {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(10);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	if (process.env.NODE_ENV !== 'production') {
	  var invariant = __webpack_require__(11);
	  var warning = __webpack_require__(12);
	  var ReactPropTypesSecret = __webpack_require__(14);
	  var loggedTypeFailures = {};
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (process.env.NODE_ENV !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
	        }
	      }
	    }
	  }
	}

	module.exports = checkPropTypes;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(10);
	var invariant = __webpack_require__(11);
	var ReactPropTypesSecret = __webpack_require__(14);

	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    invariant(
	      false,
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim
	  };

	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Styles = function () {
	  function Styles(adonis, options) {
	    _classCallCheck(this, Styles);

	    this._adonis = adonis;
	    this._options = (0, _utils.defaults)(options, {
	      variations: [],
	      styles: {},
	      name: 'Unnamed'
	    });

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

	      if (!variations) return allVariations;

	      return variations.map(function (variation) {
	        return allVariations[variation];
	      }).filter(function (v) {
	        return v;
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

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(4);

	var _ruleset = __webpack_require__(19);

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
	     * Buffers the rulesets that have not been buffered yet
	     */

	  }, {
	    key: 'bufferRulesets',
	    value: function bufferRulesets() {
	      var stylesBuffer = this._adonis.getStylesBuffer();
	      var rulesets = this._rulesets.filter(function (ruleset) {
	        return !stylesBuffer.isSelectorBuffered(ruleset.getSelector()) && ruleset.hasDeclarations();
	      }).map(function (ruleset) {
	        return [ruleset.getSelector(), ruleset.toCSS()];
	      });
	      stylesBuffer.bufferRulesets(rulesets);
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
	          classNamePrefix = _adonis$getOptions.classNamePrefix;

	      return classNamePrefix + this._styles.map(function (style) {
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

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(4);

	var _declaration = __webpack_require__(20);

	var _declaration2 = _interopRequireDefault(_declaration);

	var _extensions = __webpack_require__(22);

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
	      var parentSelector = this._options.parentSelector;

	      var _adonis$getOptions3 = this._adonis.getOptions(),
	          minified = _adonis$getOptions3.minified,
	          cssSelectorPrefix = _adonis$getOptions3.cssSelectorPrefix;

	      if (this._declarations.length === 0) return null;

	      var parentIsAtRule = parentSelector && parentSelector.match(/^@/);

	      var css = '';
	      var indentation = '';
	      if (parentSelector) {
	        if (cssSelectorPrefix && !parentIsAtRule) {
	          css += cssSelectorPrefix;
	        }
	        css += parentSelector + (minified ? '{' : ' {\n');
	        indentation = '  ';
	      } else {
	        css += cssSelectorPrefix;
	      }

	      var selector = '';
	      if (cssSelectorPrefix && parentIsAtRule) {
	        selector += cssSelectorPrefix;
	      }
	      selector += this._selector;

	      css += indentation + selector + (minified ? '{' : ' {\n');
	      this._declarations.forEach(function (rule) {
	        css += indentation + rule.toCSS() + (minified ? '' : '\n');
	      });
	      css += indentation + '}';

	      if (parentSelector) {
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

	    /**
	     * Checks if this ruleset has declarations
	     * @return {Boolean}
	     */

	  }, {
	    key: 'hasDeclarations',
	    value: function hasDeclarations() {
	      return this._declarations.length !== 0;
	    }

	    /**
	     * Returns the selector
	     * @return {String}
	     */

	  }, {
	    key: 'getSelector',
	    value: function getSelector() {
	      return this._selector;
	    }
	  }]);

	  return Ruleset;
	}();

	exports.default = Ruleset;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _cssPrefixes = __webpack_require__(21);

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

/***/ }),
/* 21 */
/***/ (function(module, exports) {

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

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _immediateChildSelectorExtension = __webpack_require__(23);

	var _immediateChildSelectorExtension2 = _interopRequireDefault(_immediateChildSelectorExtension);

	var _selfSelectorExtension = __webpack_require__(24);

	var _selfSelectorExtension2 = _interopRequireDefault(_selfSelectorExtension);

	var _pseudoClassesExtension = __webpack_require__(25);

	var _pseudoClassesExtension2 = _interopRequireDefault(_pseudoClassesExtension);

	var _mediaQueryExtension = __webpack_require__(26);

	var _mediaQueryExtension2 = _interopRequireDefault(_mediaQueryExtension);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = [_immediateChildSelectorExtension2.default, _selfSelectorExtension2.default, _pseudoClassesExtension2.default, _mediaQueryExtension2.default];

/***/ }),
/* 23 */
/***/ (function(module, exports) {

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

/***/ }),
/* 24 */
/***/ (function(module, exports) {

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

/***/ }),
/* 25 */
/***/ (function(module, exports) {

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

/***/ }),
/* 26 */
/***/ (function(module, exports) {

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

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(4);

	var _ruleset = __webpack_require__(19);

	var _ruleset2 = _interopRequireDefault(_ruleset);

	var _stylesManager = __webpack_require__(18);

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
	        var ruleset = new _ruleset2.default(_this2._adonis, selector, _this2._getCombinedStyles(variations), {
	          theme: _this2._theme
	        });
	        return [ruleset, ruleset.getSubRulesets()];
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

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', 'circle', 'clipPath', 'defs', 'ellipse', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _styles = __webpack_require__(17);

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

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(8);

	var _propTypes2 = _interopRequireDefault(_propTypes);

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
	    theme: _propTypes2.default.object
	  };

	  return ComponentWithTheme;
	};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(8);

	var _propTypes2 = _interopRequireDefault(_propTypes);

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
	  theme: _propTypes2.default.object.isRequired
	};

	ThemeProvider.contextTypes = {
	  theme: _propTypes2.default.object
	};

/***/ })
/******/ ])
});
;