(function(global2, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("lkt-tools"), require("vue")) : typeof define === "function" && define.amd ? define(["exports", "lkt-tools", "vue"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.LktTable = {}, global2.lktTools, global2.Vue));
})(this, function(exports2, lktTools, vue) {
  "use strict";
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  function getAugmentedNamespace(n) {
    var f = n.default;
    if (typeof f == "function") {
      var a = function() {
        return f.apply(this, arguments);
      };
      a.prototype = f.prototype;
    } else
      a = {};
    Object.defineProperty(a, "__esModule", { value: true });
    Object.keys(n).forEach(function(k) {
      var d = Object.getOwnPropertyDescriptor(n, k);
      Object.defineProperty(a, k, d.get ? d : {
        enumerable: true,
        get: function() {
          return n[k];
        }
      });
    });
    return a;
  }
  var vuedraggable_umd = { exports: {} };
  /**!
   * Sortable 1.10.2
   * @author	RubaXa   <trash@rubaxa.org>
   * @author	owenm    <owen23355@gmail.com>
   * @license MIT
   */
  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof = function(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof(obj);
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _extends() {
    _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys.forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    }
    return target;
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null)
      return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0)
          continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key))
          continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++)
        arr2[i] = arr[i];
      return arr2;
    }
  }
  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]")
      return Array.from(iter);
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }
  var version = "1.10.2";
  function userAgent(pattern) {
    if (typeof window !== "undefined" && window.navigator) {
      return !!/* @__PURE__ */ navigator.userAgent.match(pattern);
    }
  }
  var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
  var Edge = userAgent(/Edge/i);
  var FireFox = userAgent(/firefox/i);
  var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
  var IOS = userAgent(/iP(ad|od|hone)/i);
  var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);
  var captureMode = {
    capture: false,
    passive: false
  };
  function on(el, event, fn) {
    el.addEventListener(event, fn, !IE11OrLess && captureMode);
  }
  function off(el, event, fn) {
    el.removeEventListener(event, fn, !IE11OrLess && captureMode);
  }
  function matches(el, selector) {
    if (!selector)
      return;
    selector[0] === ">" && (selector = selector.substring(1));
    if (el) {
      try {
        if (el.matches) {
          return el.matches(selector);
        } else if (el.msMatchesSelector) {
          return el.msMatchesSelector(selector);
        } else if (el.webkitMatchesSelector) {
          return el.webkitMatchesSelector(selector);
        }
      } catch (_) {
        return false;
      }
    }
    return false;
  }
  function getParentOrHost(el) {
    return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
  }
  function closest(el, selector, ctx, includeCTX) {
    if (el) {
      ctx = ctx || document;
      do {
        if (selector != null && (selector[0] === ">" ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
          return el;
        }
        if (el === ctx)
          break;
      } while (el = getParentOrHost(el));
    }
    return null;
  }
  var R_SPACE = /\s+/g;
  function toggleClass(el, name, state) {
    if (el && name) {
      if (el.classList) {
        el.classList[state ? "add" : "remove"](name);
      } else {
        var className = (" " + el.className + " ").replace(R_SPACE, " ").replace(" " + name + " ", " ");
        el.className = (className + (state ? " " + name : "")).replace(R_SPACE, " ");
      }
    }
  }
  function css(el, prop, val) {
    var style = el && el.style;
    if (style) {
      if (val === void 0) {
        if (document.defaultView && document.defaultView.getComputedStyle) {
          val = document.defaultView.getComputedStyle(el, "");
        } else if (el.currentStyle) {
          val = el.currentStyle;
        }
        return prop === void 0 ? val : val[prop];
      } else {
        if (!(prop in style) && prop.indexOf("webkit") === -1) {
          prop = "-webkit-" + prop;
        }
        style[prop] = val + (typeof val === "string" ? "" : "px");
      }
    }
  }
  function matrix(el, selfOnly) {
    var appliedTransforms = "";
    if (typeof el === "string") {
      appliedTransforms = el;
    } else {
      do {
        var transform = css(el, "transform");
        if (transform && transform !== "none") {
          appliedTransforms = transform + " " + appliedTransforms;
        }
      } while (!selfOnly && (el = el.parentNode));
    }
    var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
    return matrixFn && new matrixFn(appliedTransforms);
  }
  function find(ctx, tagName, iterator) {
    if (ctx) {
      var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;
      if (iterator) {
        for (; i < n; i++) {
          iterator(list[i], i);
        }
      }
      return list;
    }
    return [];
  }
  function getWindowScrollingElement() {
    var scrollingElement = document.scrollingElement;
    if (scrollingElement) {
      return scrollingElement;
    } else {
      return document.documentElement;
    }
  }
  function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
    if (!el.getBoundingClientRect && el !== window)
      return;
    var elRect, top, left, bottom, right, height, width;
    if (el !== window && el !== getWindowScrollingElement()) {
      elRect = el.getBoundingClientRect();
      top = elRect.top;
      left = elRect.left;
      bottom = elRect.bottom;
      right = elRect.right;
      height = elRect.height;
      width = elRect.width;
    } else {
      top = 0;
      left = 0;
      bottom = window.innerHeight;
      right = window.innerWidth;
      height = window.innerHeight;
      width = window.innerWidth;
    }
    if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
      container = container || el.parentNode;
      if (!IE11OrLess) {
        do {
          if (container && container.getBoundingClientRect && (css(container, "transform") !== "none" || relativeToNonStaticParent && css(container, "position") !== "static")) {
            var containerRect = container.getBoundingClientRect();
            top -= containerRect.top + parseInt(css(container, "border-top-width"));
            left -= containerRect.left + parseInt(css(container, "border-left-width"));
            bottom = top + elRect.height;
            right = left + elRect.width;
            break;
          }
        } while (container = container.parentNode);
      }
    }
    if (undoScale && el !== window) {
      var elMatrix = matrix(container || el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d;
      if (elMatrix) {
        top /= scaleY;
        left /= scaleX;
        width /= scaleX;
        height /= scaleY;
        bottom = top + height;
        right = left + width;
      }
    }
    return {
      top,
      left,
      bottom,
      right,
      width,
      height
    };
  }
  function isScrolledPast(el, elSide, parentSide) {
    var parent = getParentAutoScrollElement(el, true), elSideVal = getRect(el)[elSide];
    while (parent) {
      var parentSideVal = getRect(parent)[parentSide], visible = void 0;
      if (parentSide === "top" || parentSide === "left") {
        visible = elSideVal >= parentSideVal;
      } else {
        visible = elSideVal <= parentSideVal;
      }
      if (!visible)
        return parent;
      if (parent === getWindowScrollingElement())
        break;
      parent = getParentAutoScrollElement(parent, false);
    }
    return false;
  }
  function getChild(el, childNum, options) {
    var currentChild = 0, i = 0, children = el.children;
    while (i < children.length) {
      if (children[i].style.display !== "none" && children[i] !== Sortable.ghost && children[i] !== Sortable.dragged && closest(children[i], options.draggable, el, false)) {
        if (currentChild === childNum) {
          return children[i];
        }
        currentChild++;
      }
      i++;
    }
    return null;
  }
  function lastChild(el, selector) {
    var last = el.lastElementChild;
    while (last && (last === Sortable.ghost || css(last, "display") === "none" || selector && !matches(last, selector))) {
      last = last.previousElementSibling;
    }
    return last || null;
  }
  function index(el, selector) {
    var index2 = 0;
    if (!el || !el.parentNode) {
      return -1;
    }
    while (el = el.previousElementSibling) {
      if (el.nodeName.toUpperCase() !== "TEMPLATE" && el !== Sortable.clone && (!selector || matches(el, selector))) {
        index2++;
      }
    }
    return index2;
  }
  function getRelativeScrollOffset(el) {
    var offsetLeft = 0, offsetTop = 0, winScroller = getWindowScrollingElement();
    if (el) {
      do {
        var elMatrix = matrix(el), scaleX = elMatrix.a, scaleY = elMatrix.d;
        offsetLeft += el.scrollLeft * scaleX;
        offsetTop += el.scrollTop * scaleY;
      } while (el !== winScroller && (el = el.parentNode));
    }
    return [offsetLeft, offsetTop];
  }
  function indexOfObject(arr, obj) {
    for (var i in arr) {
      if (!arr.hasOwnProperty(i))
        continue;
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === arr[i][key])
          return Number(i);
      }
    }
    return -1;
  }
  function getParentAutoScrollElement(el, includeSelf) {
    if (!el || !el.getBoundingClientRect)
      return getWindowScrollingElement();
    var elem = el;
    var gotSelf = false;
    do {
      if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
        var elemCSS = css(elem);
        if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == "auto" || elemCSS.overflowX == "scroll") || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == "auto" || elemCSS.overflowY == "scroll")) {
          if (!elem.getBoundingClientRect || elem === document.body)
            return getWindowScrollingElement();
          if (gotSelf || includeSelf)
            return elem;
          gotSelf = true;
        }
      }
    } while (elem = elem.parentNode);
    return getWindowScrollingElement();
  }
  function extend(dst, src) {
    if (dst && src) {
      for (var key in src) {
        if (src.hasOwnProperty(key)) {
          dst[key] = src[key];
        }
      }
    }
    return dst;
  }
  function isRectEqual(rect1, rect2) {
    return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
  }
  var _throttleTimeout;
  function throttle(callback, ms) {
    return function() {
      if (!_throttleTimeout) {
        var args = arguments, _this = this;
        if (args.length === 1) {
          callback.call(_this, args[0]);
        } else {
          callback.apply(_this, args);
        }
        _throttleTimeout = setTimeout(function() {
          _throttleTimeout = void 0;
        }, ms);
      }
    };
  }
  function cancelThrottle() {
    clearTimeout(_throttleTimeout);
    _throttleTimeout = void 0;
  }
  function scrollBy(el, x, y) {
    el.scrollLeft += x;
    el.scrollTop += y;
  }
  function clone(el) {
    var Polymer = window.Polymer;
    var $ = window.jQuery || window.Zepto;
    if (Polymer && Polymer.dom) {
      return Polymer.dom(el).cloneNode(true);
    } else if ($) {
      return $(el).clone(true)[0];
    } else {
      return el.cloneNode(true);
    }
  }
  function setRect(el, rect) {
    css(el, "position", "absolute");
    css(el, "top", rect.top);
    css(el, "left", rect.left);
    css(el, "width", rect.width);
    css(el, "height", rect.height);
  }
  function unsetRect(el) {
    css(el, "position", "");
    css(el, "top", "");
    css(el, "left", "");
    css(el, "width", "");
    css(el, "height", "");
  }
  var expando = "Sortable" + new Date().getTime();
  function AnimationStateManager() {
    var animationStates = [], animationCallbackId;
    return {
      captureAnimationState: function captureAnimationState() {
        animationStates = [];
        if (!this.options.animation)
          return;
        var children = [].slice.call(this.el.children);
        children.forEach(function(child) {
          if (css(child, "display") === "none" || child === Sortable.ghost)
            return;
          animationStates.push({
            target: child,
            rect: getRect(child)
          });
          var fromRect = _objectSpread({}, animationStates[animationStates.length - 1].rect);
          if (child.thisAnimationDuration) {
            var childMatrix = matrix(child, true);
            if (childMatrix) {
              fromRect.top -= childMatrix.f;
              fromRect.left -= childMatrix.e;
            }
          }
          child.fromRect = fromRect;
        });
      },
      addAnimationState: function addAnimationState(state) {
        animationStates.push(state);
      },
      removeAnimationState: function removeAnimationState(target) {
        animationStates.splice(indexOfObject(animationStates, {
          target
        }), 1);
      },
      animateAll: function animateAll(callback) {
        var _this = this;
        if (!this.options.animation) {
          clearTimeout(animationCallbackId);
          if (typeof callback === "function")
            callback();
          return;
        }
        var animating = false, animationTime = 0;
        animationStates.forEach(function(state) {
          var time = 0, target = state.target, fromRect = target.fromRect, toRect = getRect(target), prevFromRect = target.prevFromRect, prevToRect = target.prevToRect, animatingRect = state.rect, targetMatrix = matrix(target, true);
          if (targetMatrix) {
            toRect.top -= targetMatrix.f;
            toRect.left -= targetMatrix.e;
          }
          target.toRect = toRect;
          if (target.thisAnimationDuration) {
            if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
              time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
            }
          }
          if (!isRectEqual(toRect, fromRect)) {
            target.prevFromRect = fromRect;
            target.prevToRect = toRect;
            if (!time) {
              time = _this.options.animation;
            }
            _this.animate(target, animatingRect, toRect, time);
          }
          if (time) {
            animating = true;
            animationTime = Math.max(animationTime, time);
            clearTimeout(target.animationResetTimer);
            target.animationResetTimer = setTimeout(function() {
              target.animationTime = 0;
              target.prevFromRect = null;
              target.fromRect = null;
              target.prevToRect = null;
              target.thisAnimationDuration = null;
            }, time);
            target.thisAnimationDuration = time;
          }
        });
        clearTimeout(animationCallbackId);
        if (!animating) {
          if (typeof callback === "function")
            callback();
        } else {
          animationCallbackId = setTimeout(function() {
            if (typeof callback === "function")
              callback();
          }, animationTime);
        }
        animationStates = [];
      },
      animate: function animate(target, currentRect, toRect, duration) {
        if (duration) {
          css(target, "transition", "");
          css(target, "transform", "");
          var elMatrix = matrix(this.el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d, translateX = (currentRect.left - toRect.left) / (scaleX || 1), translateY = (currentRect.top - toRect.top) / (scaleY || 1);
          target.animatingX = !!translateX;
          target.animatingY = !!translateY;
          css(target, "transform", "translate3d(" + translateX + "px," + translateY + "px,0)");
          repaint(target);
          css(target, "transition", "transform " + duration + "ms" + (this.options.easing ? " " + this.options.easing : ""));
          css(target, "transform", "translate3d(0,0,0)");
          typeof target.animated === "number" && clearTimeout(target.animated);
          target.animated = setTimeout(function() {
            css(target, "transition", "");
            css(target, "transform", "");
            target.animated = false;
            target.animatingX = false;
            target.animatingY = false;
          }, duration);
        }
      }
    };
  }
  function repaint(target) {
    return target.offsetWidth;
  }
  function calculateRealTime(animatingRect, fromRect, toRect, options) {
    return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
  }
  var plugins = [];
  var defaults = {
    initializeByDefault: true
  };
  var PluginManager = {
    mount: function mount(plugin) {
      for (var option in defaults) {
        if (defaults.hasOwnProperty(option) && !(option in plugin)) {
          plugin[option] = defaults[option];
        }
      }
      plugins.push(plugin);
    },
    pluginEvent: function pluginEvent2(eventName, sortable, evt) {
      var _this = this;
      this.eventCanceled = false;
      evt.cancel = function() {
        _this.eventCanceled = true;
      };
      var eventNameGlobal = eventName + "Global";
      plugins.forEach(function(plugin) {
        if (!sortable[plugin.pluginName])
          return;
        if (sortable[plugin.pluginName][eventNameGlobal]) {
          sortable[plugin.pluginName][eventNameGlobal](_objectSpread({
            sortable
          }, evt));
        }
        if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
          sortable[plugin.pluginName][eventName](_objectSpread({
            sortable
          }, evt));
        }
      });
    },
    initializePlugins: function initializePlugins(sortable, el, defaults2, options) {
      plugins.forEach(function(plugin) {
        var pluginName = plugin.pluginName;
        if (!sortable.options[pluginName] && !plugin.initializeByDefault)
          return;
        var initialized = new plugin(sortable, el, sortable.options);
        initialized.sortable = sortable;
        initialized.options = sortable.options;
        sortable[pluginName] = initialized;
        _extends(defaults2, initialized.defaults);
      });
      for (var option in sortable.options) {
        if (!sortable.options.hasOwnProperty(option))
          continue;
        var modified = this.modifyOption(sortable, option, sortable.options[option]);
        if (typeof modified !== "undefined") {
          sortable.options[option] = modified;
        }
      }
    },
    getEventProperties: function getEventProperties(name, sortable) {
      var eventProperties = {};
      plugins.forEach(function(plugin) {
        if (typeof plugin.eventProperties !== "function")
          return;
        _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
      });
      return eventProperties;
    },
    modifyOption: function modifyOption(sortable, name, value) {
      var modifiedValue;
      plugins.forEach(function(plugin) {
        if (!sortable[plugin.pluginName])
          return;
        if (plugin.optionListeners && typeof plugin.optionListeners[name] === "function") {
          modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
        }
      });
      return modifiedValue;
    }
  };
  function dispatchEvent(_ref) {
    var sortable = _ref.sortable, rootEl2 = _ref.rootEl, name = _ref.name, targetEl = _ref.targetEl, cloneEl2 = _ref.cloneEl, toEl = _ref.toEl, fromEl = _ref.fromEl, oldIndex2 = _ref.oldIndex, newIndex2 = _ref.newIndex, oldDraggableIndex2 = _ref.oldDraggableIndex, newDraggableIndex2 = _ref.newDraggableIndex, originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, extraEventProperties = _ref.extraEventProperties;
    sortable = sortable || rootEl2 && rootEl2[expando];
    if (!sortable)
      return;
    var evt, options = sortable.options, onName = "on" + name.charAt(0).toUpperCase() + name.substr(1);
    if (window.CustomEvent && !IE11OrLess && !Edge) {
      evt = new CustomEvent(name, {
        bubbles: true,
        cancelable: true
      });
    } else {
      evt = document.createEvent("Event");
      evt.initEvent(name, true, true);
    }
    evt.to = toEl || rootEl2;
    evt.from = fromEl || rootEl2;
    evt.item = targetEl || rootEl2;
    evt.clone = cloneEl2;
    evt.oldIndex = oldIndex2;
    evt.newIndex = newIndex2;
    evt.oldDraggableIndex = oldDraggableIndex2;
    evt.newDraggableIndex = newDraggableIndex2;
    evt.originalEvent = originalEvent;
    evt.pullMode = putSortable2 ? putSortable2.lastPutMode : void 0;
    var allEventProperties = _objectSpread({}, extraEventProperties, PluginManager.getEventProperties(name, sortable));
    for (var option in allEventProperties) {
      evt[option] = allEventProperties[option];
    }
    if (rootEl2) {
      rootEl2.dispatchEvent(evt);
    }
    if (options[onName]) {
      options[onName].call(sortable, evt);
    }
  }
  var pluginEvent = function pluginEvent2(eventName, sortable) {
    var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, originalEvent = _ref.evt, data = _objectWithoutProperties(_ref, ["evt"]);
    PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread({
      dragEl,
      parentEl,
      ghostEl,
      rootEl,
      nextEl,
      lastDownEl,
      cloneEl,
      cloneHidden,
      dragStarted: moved,
      putSortable,
      activeSortable: Sortable.active,
      originalEvent,
      oldIndex,
      oldDraggableIndex,
      newIndex,
      newDraggableIndex,
      hideGhostForTarget: _hideGhostForTarget,
      unhideGhostForTarget: _unhideGhostForTarget,
      cloneNowHidden: function cloneNowHidden() {
        cloneHidden = true;
      },
      cloneNowShown: function cloneNowShown() {
        cloneHidden = false;
      },
      dispatchSortableEvent: function dispatchSortableEvent(name) {
        _dispatchEvent({
          sortable,
          name,
          originalEvent
        });
      }
    }, data));
  };
  function _dispatchEvent(info) {
    dispatchEvent(_objectSpread({
      putSortable,
      cloneEl,
      targetEl: dragEl,
      rootEl,
      oldIndex,
      oldDraggableIndex,
      newIndex,
      newDraggableIndex
    }, info));
  }
  var dragEl, parentEl, ghostEl, rootEl, nextEl, lastDownEl, cloneEl, cloneHidden, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, activeGroup, putSortable, awaitingDragStarted = false, ignoreNextClick = false, sortables = [], tapEvt, touchEvt, lastDx, lastDy, tapDistanceLeft, tapDistanceTop, moved, lastTarget, lastDirection, pastFirstInvertThresh = false, isCircumstantialInvert = false, targetMoveDistance, ghostRelativeParent, ghostRelativeParentInitialScroll = [], _silent = false, savedInputChecked = [];
  var documentExists = typeof document !== "undefined", PositionGhostAbsolutely = IOS, CSSFloatProperty = Edge || IE11OrLess ? "cssFloat" : "float", supportDraggable = documentExists && !ChromeForAndroid && !IOS && "draggable" in document.createElement("div"), supportCssPointerEvents = function() {
    if (!documentExists)
      return;
    if (IE11OrLess) {
      return false;
    }
    var el = document.createElement("x");
    el.style.cssText = "pointer-events:auto";
    return el.style.pointerEvents === "auto";
  }(), _detectDirection = function _detectDirection2(el, options) {
    var elCSS = css(el), elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth), child1 = getChild(el, 0, options), child2 = getChild(el, 1, options), firstChildCSS = child1 && css(child1), secondChildCSS = child2 && css(child2), firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width, secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;
    if (elCSS.display === "flex") {
      return elCSS.flexDirection === "column" || elCSS.flexDirection === "column-reverse" ? "vertical" : "horizontal";
    }
    if (elCSS.display === "grid") {
      return elCSS.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
    }
    if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== "none") {
      var touchingSideChild2 = firstChildCSS["float"] === "left" ? "left" : "right";
      return child2 && (secondChildCSS.clear === "both" || secondChildCSS.clear === touchingSideChild2) ? "vertical" : "horizontal";
    }
    return child1 && (firstChildCSS.display === "block" || firstChildCSS.display === "flex" || firstChildCSS.display === "table" || firstChildCSS.display === "grid" || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === "none" || child2 && elCSS[CSSFloatProperty] === "none" && firstChildWidth + secondChildWidth > elWidth) ? "vertical" : "horizontal";
  }, _dragElInRowColumn = function _dragElInRowColumn2(dragRect, targetRect, vertical) {
    var dragElS1Opp = vertical ? dragRect.left : dragRect.top, dragElS2Opp = vertical ? dragRect.right : dragRect.bottom, dragElOppLength = vertical ? dragRect.width : dragRect.height, targetS1Opp = vertical ? targetRect.left : targetRect.top, targetS2Opp = vertical ? targetRect.right : targetRect.bottom, targetOppLength = vertical ? targetRect.width : targetRect.height;
    return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
  }, _detectNearestEmptySortable = function _detectNearestEmptySortable2(x, y) {
    var ret;
    sortables.some(function(sortable) {
      if (lastChild(sortable))
        return;
      var rect = getRect(sortable), threshold = sortable[expando].options.emptyInsertThreshold, insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold, insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;
      if (threshold && insideHorizontally && insideVertically) {
        return ret = sortable;
      }
    });
    return ret;
  }, _prepareGroup = function _prepareGroup2(options) {
    function toFn(value, pull) {
      return function(to, from, dragEl2, evt) {
        var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;
        if (value == null && (pull || sameGroup)) {
          return true;
        } else if (value == null || value === false) {
          return false;
        } else if (pull && value === "clone") {
          return value;
        } else if (typeof value === "function") {
          return toFn(value(to, from, dragEl2, evt), pull)(to, from, dragEl2, evt);
        } else {
          var otherGroup = (pull ? to : from).options.group.name;
          return value === true || typeof value === "string" && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
        }
      };
    }
    var group = {};
    var originalGroup = options.group;
    if (!originalGroup || _typeof(originalGroup) != "object") {
      originalGroup = {
        name: originalGroup
      };
    }
    group.name = originalGroup.name;
    group.checkPull = toFn(originalGroup.pull, true);
    group.checkPut = toFn(originalGroup.put);
    group.revertClone = originalGroup.revertClone;
    options.group = group;
  }, _hideGhostForTarget = function _hideGhostForTarget2() {
    if (!supportCssPointerEvents && ghostEl) {
      css(ghostEl, "display", "none");
    }
  }, _unhideGhostForTarget = function _unhideGhostForTarget2() {
    if (!supportCssPointerEvents && ghostEl) {
      css(ghostEl, "display", "");
    }
  };
  if (documentExists) {
    document.addEventListener("click", function(evt) {
      if (ignoreNextClick) {
        evt.preventDefault();
        evt.stopPropagation && evt.stopPropagation();
        evt.stopImmediatePropagation && evt.stopImmediatePropagation();
        ignoreNextClick = false;
        return false;
      }
    }, true);
  }
  var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent2(evt) {
    if (dragEl) {
      evt = evt.touches ? evt.touches[0] : evt;
      var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);
      if (nearest) {
        var event = {};
        for (var i in evt) {
          if (evt.hasOwnProperty(i)) {
            event[i] = evt[i];
          }
        }
        event.target = event.rootEl = nearest;
        event.preventDefault = void 0;
        event.stopPropagation = void 0;
        nearest[expando]._onDragOver(event);
      }
    }
  };
  var _checkOutsideTargetEl = function _checkOutsideTargetEl2(evt) {
    if (dragEl) {
      dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
    }
  };
  function Sortable(el, options) {
    if (!(el && el.nodeType && el.nodeType === 1)) {
      throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
    }
    this.el = el;
    this.options = options = _extends({}, options);
    el[expando] = this;
    var defaults2 = {
      group: null,
      sort: true,
      disabled: false,
      store: null,
      handle: null,
      draggable: /^[uo]l$/i.test(el.nodeName) ? ">li" : ">*",
      swapThreshold: 1,
      invertSwap: false,
      invertedSwapThreshold: null,
      removeCloneOnHide: true,
      direction: function direction() {
        return _detectDirection(el, this.options);
      },
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag",
      ignore: "a, img",
      filter: null,
      preventOnFilter: true,
      animation: 0,
      easing: null,
      setData: function setData(dataTransfer, dragEl2) {
        dataTransfer.setData("Text", dragEl2.textContent);
      },
      dropBubble: false,
      dragoverBubble: false,
      dataIdAttr: "data-id",
      delay: 0,
      delayOnTouchOnly: false,
      touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
      forceFallback: false,
      fallbackClass: "sortable-fallback",
      fallbackOnBody: false,
      fallbackTolerance: 0,
      fallbackOffset: {
        x: 0,
        y: 0
      },
      supportPointer: Sortable.supportPointer !== false && "PointerEvent" in window,
      emptyInsertThreshold: 5
    };
    PluginManager.initializePlugins(this, el, defaults2);
    for (var name in defaults2) {
      !(name in options) && (options[name] = defaults2[name]);
    }
    _prepareGroup(options);
    for (var fn in this) {
      if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
        this[fn] = this[fn].bind(this);
      }
    }
    this.nativeDraggable = options.forceFallback ? false : supportDraggable;
    if (this.nativeDraggable) {
      this.options.touchStartThreshold = 1;
    }
    if (options.supportPointer) {
      on(el, "pointerdown", this._onTapStart);
    } else {
      on(el, "mousedown", this._onTapStart);
      on(el, "touchstart", this._onTapStart);
    }
    if (this.nativeDraggable) {
      on(el, "dragover", this);
      on(el, "dragenter", this);
    }
    sortables.push(this.el);
    options.store && options.store.get && this.sort(options.store.get(this) || []);
    _extends(this, AnimationStateManager());
  }
  Sortable.prototype = {
    constructor: Sortable,
    _isOutsideThisEl: function _isOutsideThisEl(target) {
      if (!this.el.contains(target) && target !== this.el) {
        lastTarget = null;
      }
    },
    _getDirection: function _getDirection(evt, target) {
      return typeof this.options.direction === "function" ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
    },
    _onTapStart: function _onTapStart(evt) {
      if (!evt.cancelable)
        return;
      var _this = this, el = this.el, options = this.options, preventOnFilter = options.preventOnFilter, type = evt.type, touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === "touch" && evt, target = (touch || evt).target, originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target, filter = options.filter;
      _saveInputCheckedState(el);
      if (dragEl) {
        return;
      }
      if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
        return;
      }
      if (originalTarget.isContentEditable) {
        return;
      }
      target = closest(target, options.draggable, el, false);
      if (target && target.animated) {
        return;
      }
      if (lastDownEl === target) {
        return;
      }
      oldIndex = index(target);
      oldDraggableIndex = index(target, options.draggable);
      if (typeof filter === "function") {
        if (filter.call(this, evt, target, this)) {
          _dispatchEvent({
            sortable: _this,
            rootEl: originalTarget,
            name: "filter",
            targetEl: target,
            toEl: el,
            fromEl: el
          });
          pluginEvent("filter", _this, {
            evt
          });
          preventOnFilter && evt.cancelable && evt.preventDefault();
          return;
        }
      } else if (filter) {
        filter = filter.split(",").some(function(criteria) {
          criteria = closest(originalTarget, criteria.trim(), el, false);
          if (criteria) {
            _dispatchEvent({
              sortable: _this,
              rootEl: criteria,
              name: "filter",
              targetEl: target,
              fromEl: el,
              toEl: el
            });
            pluginEvent("filter", _this, {
              evt
            });
            return true;
          }
        });
        if (filter) {
          preventOnFilter && evt.cancelable && evt.preventDefault();
          return;
        }
      }
      if (options.handle && !closest(originalTarget, options.handle, el, false)) {
        return;
      }
      this._prepareDragStart(evt, touch, target);
    },
    _prepareDragStart: function _prepareDragStart(evt, touch, target) {
      var _this = this, el = _this.el, options = _this.options, ownerDocument = el.ownerDocument, dragStartFn;
      if (target && !dragEl && target.parentNode === el) {
        var dragRect = getRect(target);
        rootEl = el;
        dragEl = target;
        parentEl = dragEl.parentNode;
        nextEl = dragEl.nextSibling;
        lastDownEl = target;
        activeGroup = options.group;
        Sortable.dragged = dragEl;
        tapEvt = {
          target: dragEl,
          clientX: (touch || evt).clientX,
          clientY: (touch || evt).clientY
        };
        tapDistanceLeft = tapEvt.clientX - dragRect.left;
        tapDistanceTop = tapEvt.clientY - dragRect.top;
        this._lastX = (touch || evt).clientX;
        this._lastY = (touch || evt).clientY;
        dragEl.style["will-change"] = "all";
        dragStartFn = function dragStartFn2() {
          pluginEvent("delayEnded", _this, {
            evt
          });
          if (Sortable.eventCanceled) {
            _this._onDrop();
            return;
          }
          _this._disableDelayedDragEvents();
          if (!FireFox && _this.nativeDraggable) {
            dragEl.draggable = true;
          }
          _this._triggerDragStart(evt, touch);
          _dispatchEvent({
            sortable: _this,
            name: "choose",
            originalEvent: evt
          });
          toggleClass(dragEl, options.chosenClass, true);
        };
        options.ignore.split(",").forEach(function(criteria) {
          find(dragEl, criteria.trim(), _disableDraggable);
        });
        on(ownerDocument, "dragover", nearestEmptyInsertDetectEvent);
        on(ownerDocument, "mousemove", nearestEmptyInsertDetectEvent);
        on(ownerDocument, "touchmove", nearestEmptyInsertDetectEvent);
        on(ownerDocument, "mouseup", _this._onDrop);
        on(ownerDocument, "touchend", _this._onDrop);
        on(ownerDocument, "touchcancel", _this._onDrop);
        if (FireFox && this.nativeDraggable) {
          this.options.touchStartThreshold = 4;
          dragEl.draggable = true;
        }
        pluginEvent("delayStart", this, {
          evt
        });
        if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
          if (Sortable.eventCanceled) {
            this._onDrop();
            return;
          }
          on(ownerDocument, "mouseup", _this._disableDelayedDrag);
          on(ownerDocument, "touchend", _this._disableDelayedDrag);
          on(ownerDocument, "touchcancel", _this._disableDelayedDrag);
          on(ownerDocument, "mousemove", _this._delayedDragTouchMoveHandler);
          on(ownerDocument, "touchmove", _this._delayedDragTouchMoveHandler);
          options.supportPointer && on(ownerDocument, "pointermove", _this._delayedDragTouchMoveHandler);
          _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
        } else {
          dragStartFn();
        }
      }
    },
    _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(e) {
      var touch = e.touches ? e.touches[0] : e;
      if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
        this._disableDelayedDrag();
      }
    },
    _disableDelayedDrag: function _disableDelayedDrag() {
      dragEl && _disableDraggable(dragEl);
      clearTimeout(this._dragStartTimer);
      this._disableDelayedDragEvents();
    },
    _disableDelayedDragEvents: function _disableDelayedDragEvents() {
      var ownerDocument = this.el.ownerDocument;
      off(ownerDocument, "mouseup", this._disableDelayedDrag);
      off(ownerDocument, "touchend", this._disableDelayedDrag);
      off(ownerDocument, "touchcancel", this._disableDelayedDrag);
      off(ownerDocument, "mousemove", this._delayedDragTouchMoveHandler);
      off(ownerDocument, "touchmove", this._delayedDragTouchMoveHandler);
      off(ownerDocument, "pointermove", this._delayedDragTouchMoveHandler);
    },
    _triggerDragStart: function _triggerDragStart(evt, touch) {
      touch = touch || evt.pointerType == "touch" && evt;
      if (!this.nativeDraggable || touch) {
        if (this.options.supportPointer) {
          on(document, "pointermove", this._onTouchMove);
        } else if (touch) {
          on(document, "touchmove", this._onTouchMove);
        } else {
          on(document, "mousemove", this._onTouchMove);
        }
      } else {
        on(dragEl, "dragend", this);
        on(rootEl, "dragstart", this._onDragStart);
      }
      try {
        if (document.selection) {
          _nextTick(function() {
            document.selection.empty();
          });
        } else {
          window.getSelection().removeAllRanges();
        }
      } catch (err) {
      }
    },
    _dragStarted: function _dragStarted(fallback, evt) {
      awaitingDragStarted = false;
      if (rootEl && dragEl) {
        pluginEvent("dragStarted", this, {
          evt
        });
        if (this.nativeDraggable) {
          on(document, "dragover", _checkOutsideTargetEl);
        }
        var options = this.options;
        !fallback && toggleClass(dragEl, options.dragClass, false);
        toggleClass(dragEl, options.ghostClass, true);
        Sortable.active = this;
        fallback && this._appendGhost();
        _dispatchEvent({
          sortable: this,
          name: "start",
          originalEvent: evt
        });
      } else {
        this._nulling();
      }
    },
    _emulateDragOver: function _emulateDragOver() {
      if (touchEvt) {
        this._lastX = touchEvt.clientX;
        this._lastY = touchEvt.clientY;
        _hideGhostForTarget();
        var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        var parent = target;
        while (target && target.shadowRoot) {
          target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
          if (target === parent)
            break;
          parent = target;
        }
        dragEl.parentNode[expando]._isOutsideThisEl(target);
        if (parent) {
          do {
            if (parent[expando]) {
              var inserted = void 0;
              inserted = parent[expando]._onDragOver({
                clientX: touchEvt.clientX,
                clientY: touchEvt.clientY,
                target,
                rootEl: parent
              });
              if (inserted && !this.options.dragoverBubble) {
                break;
              }
            }
            target = parent;
          } while (parent = parent.parentNode);
        }
        _unhideGhostForTarget();
      }
    },
    _onTouchMove: function _onTouchMove(evt) {
      if (tapEvt) {
        var options = this.options, fallbackTolerance = options.fallbackTolerance, fallbackOffset = options.fallbackOffset, touch = evt.touches ? evt.touches[0] : evt, ghostMatrix = ghostEl && matrix(ghostEl, true), scaleX = ghostEl && ghostMatrix && ghostMatrix.a, scaleY = ghostEl && ghostMatrix && ghostMatrix.d, relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent), dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1), dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1);
        if (!Sortable.active && !awaitingDragStarted) {
          if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
            return;
          }
          this._onDragStart(evt, true);
        }
        if (ghostEl) {
          if (ghostMatrix) {
            ghostMatrix.e += dx - (lastDx || 0);
            ghostMatrix.f += dy - (lastDy || 0);
          } else {
            ghostMatrix = {
              a: 1,
              b: 0,
              c: 0,
              d: 1,
              e: dx,
              f: dy
            };
          }
          var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
          css(ghostEl, "webkitTransform", cssMatrix);
          css(ghostEl, "mozTransform", cssMatrix);
          css(ghostEl, "msTransform", cssMatrix);
          css(ghostEl, "transform", cssMatrix);
          lastDx = dx;
          lastDy = dy;
          touchEvt = touch;
        }
        evt.cancelable && evt.preventDefault();
      }
    },
    _appendGhost: function _appendGhost() {
      if (!ghostEl) {
        var container = this.options.fallbackOnBody ? document.body : rootEl, rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container), options = this.options;
        if (PositionGhostAbsolutely) {
          ghostRelativeParent = container;
          while (css(ghostRelativeParent, "position") === "static" && css(ghostRelativeParent, "transform") === "none" && ghostRelativeParent !== document) {
            ghostRelativeParent = ghostRelativeParent.parentNode;
          }
          if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
            if (ghostRelativeParent === document)
              ghostRelativeParent = getWindowScrollingElement();
            rect.top += ghostRelativeParent.scrollTop;
            rect.left += ghostRelativeParent.scrollLeft;
          } else {
            ghostRelativeParent = getWindowScrollingElement();
          }
          ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
        }
        ghostEl = dragEl.cloneNode(true);
        toggleClass(ghostEl, options.ghostClass, false);
        toggleClass(ghostEl, options.fallbackClass, true);
        toggleClass(ghostEl, options.dragClass, true);
        css(ghostEl, "transition", "");
        css(ghostEl, "transform", "");
        css(ghostEl, "box-sizing", "border-box");
        css(ghostEl, "margin", 0);
        css(ghostEl, "top", rect.top);
        css(ghostEl, "left", rect.left);
        css(ghostEl, "width", rect.width);
        css(ghostEl, "height", rect.height);
        css(ghostEl, "opacity", "0.8");
        css(ghostEl, "position", PositionGhostAbsolutely ? "absolute" : "fixed");
        css(ghostEl, "zIndex", "100000");
        css(ghostEl, "pointerEvents", "none");
        Sortable.ghost = ghostEl;
        container.appendChild(ghostEl);
        css(ghostEl, "transform-origin", tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + "% " + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + "%");
      }
    },
    _onDragStart: function _onDragStart(evt, fallback) {
      var _this = this;
      var dataTransfer = evt.dataTransfer;
      var options = _this.options;
      pluginEvent("dragStart", this, {
        evt
      });
      if (Sortable.eventCanceled) {
        this._onDrop();
        return;
      }
      pluginEvent("setupClone", this);
      if (!Sortable.eventCanceled) {
        cloneEl = clone(dragEl);
        cloneEl.draggable = false;
        cloneEl.style["will-change"] = "";
        this._hideClone();
        toggleClass(cloneEl, this.options.chosenClass, false);
        Sortable.clone = cloneEl;
      }
      _this.cloneId = _nextTick(function() {
        pluginEvent("clone", _this);
        if (Sortable.eventCanceled)
          return;
        if (!_this.options.removeCloneOnHide) {
          rootEl.insertBefore(cloneEl, dragEl);
        }
        _this._hideClone();
        _dispatchEvent({
          sortable: _this,
          name: "clone"
        });
      });
      !fallback && toggleClass(dragEl, options.dragClass, true);
      if (fallback) {
        ignoreNextClick = true;
        _this._loopId = setInterval(_this._emulateDragOver, 50);
      } else {
        off(document, "mouseup", _this._onDrop);
        off(document, "touchend", _this._onDrop);
        off(document, "touchcancel", _this._onDrop);
        if (dataTransfer) {
          dataTransfer.effectAllowed = "move";
          options.setData && options.setData.call(_this, dataTransfer, dragEl);
        }
        on(document, "drop", _this);
        css(dragEl, "transform", "translateZ(0)");
      }
      awaitingDragStarted = true;
      _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
      on(document, "selectstart", _this);
      moved = true;
      if (Safari) {
        css(document.body, "user-select", "none");
      }
    },
    _onDragOver: function _onDragOver(evt) {
      var el = this.el, target = evt.target, dragRect, targetRect, revert, options = this.options, group = options.group, activeSortable = Sortable.active, isOwner = activeGroup === group, canSort = options.sort, fromSortable = putSortable || activeSortable, vertical, _this = this, completedFired = false;
      if (_silent)
        return;
      function dragOverEvent(name, extra) {
        pluginEvent(name, _this, _objectSpread({
          evt,
          isOwner,
          axis: vertical ? "vertical" : "horizontal",
          revert,
          dragRect,
          targetRect,
          canSort,
          fromSortable,
          target,
          completed,
          onMove: function onMove(target2, after2) {
            return _onMove(rootEl, el, dragEl, dragRect, target2, getRect(target2), evt, after2);
          },
          changed
        }, extra));
      }
      function capture() {
        dragOverEvent("dragOverAnimationCapture");
        _this.captureAnimationState();
        if (_this !== fromSortable) {
          fromSortable.captureAnimationState();
        }
      }
      function completed(insertion) {
        dragOverEvent("dragOverCompleted", {
          insertion
        });
        if (insertion) {
          if (isOwner) {
            activeSortable._hideClone();
          } else {
            activeSortable._showClone(_this);
          }
          if (_this !== fromSortable) {
            toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
            toggleClass(dragEl, options.ghostClass, true);
          }
          if (putSortable !== _this && _this !== Sortable.active) {
            putSortable = _this;
          } else if (_this === Sortable.active && putSortable) {
            putSortable = null;
          }
          if (fromSortable === _this) {
            _this._ignoreWhileAnimating = target;
          }
          _this.animateAll(function() {
            dragOverEvent("dragOverAnimationComplete");
            _this._ignoreWhileAnimating = null;
          });
          if (_this !== fromSortable) {
            fromSortable.animateAll();
            fromSortable._ignoreWhileAnimating = null;
          }
        }
        if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
          lastTarget = null;
        }
        if (!options.dragoverBubble && !evt.rootEl && target !== document) {
          dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
          !insertion && nearestEmptyInsertDetectEvent(evt);
        }
        !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
        return completedFired = true;
      }
      function changed() {
        newIndex = index(dragEl);
        newDraggableIndex = index(dragEl, options.draggable);
        _dispatchEvent({
          sortable: _this,
          name: "change",
          toEl: el,
          newIndex,
          newDraggableIndex,
          originalEvent: evt
        });
      }
      if (evt.preventDefault !== void 0) {
        evt.cancelable && evt.preventDefault();
      }
      target = closest(target, options.draggable, el, true);
      dragOverEvent("dragOver");
      if (Sortable.eventCanceled)
        return completedFired;
      if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
        return completed(false);
      }
      ignoreNextClick = false;
      if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = !rootEl.contains(dragEl)) : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
        vertical = this._getDirection(evt, target) === "vertical";
        dragRect = getRect(dragEl);
        dragOverEvent("dragOverValid");
        if (Sortable.eventCanceled)
          return completedFired;
        if (revert) {
          parentEl = rootEl;
          capture();
          this._hideClone();
          dragOverEvent("revert");
          if (!Sortable.eventCanceled) {
            if (nextEl) {
              rootEl.insertBefore(dragEl, nextEl);
            } else {
              rootEl.appendChild(dragEl);
            }
          }
          return completed(true);
        }
        var elLastChild = lastChild(el, options.draggable);
        if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
          if (elLastChild === dragEl) {
            return completed(false);
          }
          if (elLastChild && el === evt.target) {
            target = elLastChild;
          }
          if (target) {
            targetRect = getRect(target);
          }
          if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
            capture();
            el.appendChild(dragEl);
            parentEl = el;
            changed();
            return completed(true);
          }
        } else if (target.parentNode === el) {
          targetRect = getRect(target);
          var direction = 0, targetBeforeFirstSwap, differentLevel = dragEl.parentNode !== el, differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical), side1 = vertical ? "top" : "left", scrolledPastTop = isScrolledPast(target, "top", "top") || isScrolledPast(dragEl, "top", "top"), scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;
          if (lastTarget !== target) {
            targetBeforeFirstSwap = targetRect[side1];
            pastFirstInvertThresh = false;
            isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
          }
          direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
          var sibling;
          if (direction !== 0) {
            var dragIndex = index(dragEl);
            do {
              dragIndex -= direction;
              sibling = parentEl.children[dragIndex];
            } while (sibling && (css(sibling, "display") === "none" || sibling === ghostEl));
          }
          if (direction === 0 || sibling === target) {
            return completed(false);
          }
          lastTarget = target;
          lastDirection = direction;
          var nextSibling = target.nextElementSibling, after = false;
          after = direction === 1;
          var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);
          if (moveVector !== false) {
            if (moveVector === 1 || moveVector === -1) {
              after = moveVector === 1;
            }
            _silent = true;
            setTimeout(_unsilent, 30);
            capture();
            if (after && !nextSibling) {
              el.appendChild(dragEl);
            } else {
              target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
            }
            if (scrolledPastTop) {
              scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
            }
            parentEl = dragEl.parentNode;
            if (targetBeforeFirstSwap !== void 0 && !isCircumstantialInvert) {
              targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
            }
            changed();
            return completed(true);
          }
        }
        if (el.contains(dragEl)) {
          return completed(false);
        }
      }
      return false;
    },
    _ignoreWhileAnimating: null,
    _offMoveEvents: function _offMoveEvents() {
      off(document, "mousemove", this._onTouchMove);
      off(document, "touchmove", this._onTouchMove);
      off(document, "pointermove", this._onTouchMove);
      off(document, "dragover", nearestEmptyInsertDetectEvent);
      off(document, "mousemove", nearestEmptyInsertDetectEvent);
      off(document, "touchmove", nearestEmptyInsertDetectEvent);
    },
    _offUpEvents: function _offUpEvents() {
      var ownerDocument = this.el.ownerDocument;
      off(ownerDocument, "mouseup", this._onDrop);
      off(ownerDocument, "touchend", this._onDrop);
      off(ownerDocument, "pointerup", this._onDrop);
      off(ownerDocument, "touchcancel", this._onDrop);
      off(document, "selectstart", this);
    },
    _onDrop: function _onDrop(evt) {
      var el = this.el, options = this.options;
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      pluginEvent("drop", this, {
        evt
      });
      parentEl = dragEl && dragEl.parentNode;
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      if (Sortable.eventCanceled) {
        this._nulling();
        return;
      }
      awaitingDragStarted = false;
      isCircumstantialInvert = false;
      pastFirstInvertThresh = false;
      clearInterval(this._loopId);
      clearTimeout(this._dragStartTimer);
      _cancelNextTick(this.cloneId);
      _cancelNextTick(this._dragStartId);
      if (this.nativeDraggable) {
        off(document, "drop", this);
        off(el, "dragstart", this._onDragStart);
      }
      this._offMoveEvents();
      this._offUpEvents();
      if (Safari) {
        css(document.body, "user-select", "");
      }
      css(dragEl, "transform", "");
      if (evt) {
        if (moved) {
          evt.cancelable && evt.preventDefault();
          !options.dropBubble && evt.stopPropagation();
        }
        ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);
        if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== "clone") {
          cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
        }
        if (dragEl) {
          if (this.nativeDraggable) {
            off(dragEl, "dragend", this);
          }
          _disableDraggable(dragEl);
          dragEl.style["will-change"] = "";
          if (moved && !awaitingDragStarted) {
            toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
          }
          toggleClass(dragEl, this.options.chosenClass, false);
          _dispatchEvent({
            sortable: this,
            name: "unchoose",
            toEl: parentEl,
            newIndex: null,
            newDraggableIndex: null,
            originalEvent: evt
          });
          if (rootEl !== parentEl) {
            if (newIndex >= 0) {
              _dispatchEvent({
                rootEl: parentEl,
                name: "add",
                toEl: parentEl,
                fromEl: rootEl,
                originalEvent: evt
              });
              _dispatchEvent({
                sortable: this,
                name: "remove",
                toEl: parentEl,
                originalEvent: evt
              });
              _dispatchEvent({
                rootEl: parentEl,
                name: "sort",
                toEl: parentEl,
                fromEl: rootEl,
                originalEvent: evt
              });
              _dispatchEvent({
                sortable: this,
                name: "sort",
                toEl: parentEl,
                originalEvent: evt
              });
            }
            putSortable && putSortable.save();
          } else {
            if (newIndex !== oldIndex) {
              if (newIndex >= 0) {
                _dispatchEvent({
                  sortable: this,
                  name: "update",
                  toEl: parentEl,
                  originalEvent: evt
                });
                _dispatchEvent({
                  sortable: this,
                  name: "sort",
                  toEl: parentEl,
                  originalEvent: evt
                });
              }
            }
          }
          if (Sortable.active) {
            if (newIndex == null || newIndex === -1) {
              newIndex = oldIndex;
              newDraggableIndex = oldDraggableIndex;
            }
            _dispatchEvent({
              sortable: this,
              name: "end",
              toEl: parentEl,
              originalEvent: evt
            });
            this.save();
          }
        }
      }
      this._nulling();
    },
    _nulling: function _nulling() {
      pluginEvent("nulling", this);
      rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
      savedInputChecked.forEach(function(el) {
        el.checked = true;
      });
      savedInputChecked.length = lastDx = lastDy = 0;
    },
    handleEvent: function handleEvent(evt) {
      switch (evt.type) {
        case "drop":
        case "dragend":
          this._onDrop(evt);
          break;
        case "dragenter":
        case "dragover":
          if (dragEl) {
            this._onDragOver(evt);
            _globalDragOver(evt);
          }
          break;
        case "selectstart":
          evt.preventDefault();
          break;
      }
    },
    toArray: function toArray() {
      var order = [], el, children = this.el.children, i = 0, n = children.length, options = this.options;
      for (; i < n; i++) {
        el = children[i];
        if (closest(el, options.draggable, this.el, false)) {
          order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
        }
      }
      return order;
    },
    sort: function sort(order) {
      var items = {}, rootEl2 = this.el;
      this.toArray().forEach(function(id, i) {
        var el = rootEl2.children[i];
        if (closest(el, this.options.draggable, rootEl2, false)) {
          items[id] = el;
        }
      }, this);
      order.forEach(function(id) {
        if (items[id]) {
          rootEl2.removeChild(items[id]);
          rootEl2.appendChild(items[id]);
        }
      });
    },
    save: function save() {
      var store = this.options.store;
      store && store.set && store.set(this);
    },
    closest: function closest$1(el, selector) {
      return closest(el, selector || this.options.draggable, this.el, false);
    },
    option: function option(name, value) {
      var options = this.options;
      if (value === void 0) {
        return options[name];
      } else {
        var modifiedValue = PluginManager.modifyOption(this, name, value);
        if (typeof modifiedValue !== "undefined") {
          options[name] = modifiedValue;
        } else {
          options[name] = value;
        }
        if (name === "group") {
          _prepareGroup(options);
        }
      }
    },
    destroy: function destroy() {
      pluginEvent("destroy", this);
      var el = this.el;
      el[expando] = null;
      off(el, "mousedown", this._onTapStart);
      off(el, "touchstart", this._onTapStart);
      off(el, "pointerdown", this._onTapStart);
      if (this.nativeDraggable) {
        off(el, "dragover", this);
        off(el, "dragenter", this);
      }
      Array.prototype.forEach.call(el.querySelectorAll("[draggable]"), function(el2) {
        el2.removeAttribute("draggable");
      });
      this._onDrop();
      this._disableDelayedDragEvents();
      sortables.splice(sortables.indexOf(this.el), 1);
      this.el = el = null;
    },
    _hideClone: function _hideClone() {
      if (!cloneHidden) {
        pluginEvent("hideClone", this);
        if (Sortable.eventCanceled)
          return;
        css(cloneEl, "display", "none");
        if (this.options.removeCloneOnHide && cloneEl.parentNode) {
          cloneEl.parentNode.removeChild(cloneEl);
        }
        cloneHidden = true;
      }
    },
    _showClone: function _showClone(putSortable2) {
      if (putSortable2.lastPutMode !== "clone") {
        this._hideClone();
        return;
      }
      if (cloneHidden) {
        pluginEvent("showClone", this);
        if (Sortable.eventCanceled)
          return;
        if (rootEl.contains(dragEl) && !this.options.group.revertClone) {
          rootEl.insertBefore(cloneEl, dragEl);
        } else if (nextEl) {
          rootEl.insertBefore(cloneEl, nextEl);
        } else {
          rootEl.appendChild(cloneEl);
        }
        if (this.options.group.revertClone) {
          this.animate(dragEl, cloneEl);
        }
        css(cloneEl, "display", "");
        cloneHidden = false;
      }
    }
  };
  function _globalDragOver(evt) {
    if (evt.dataTransfer) {
      evt.dataTransfer.dropEffect = "move";
    }
    evt.cancelable && evt.preventDefault();
  }
  function _onMove(fromEl, toEl, dragEl2, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
    var evt, sortable = fromEl[expando], onMoveFn = sortable.options.onMove, retVal;
    if (window.CustomEvent && !IE11OrLess && !Edge) {
      evt = new CustomEvent("move", {
        bubbles: true,
        cancelable: true
      });
    } else {
      evt = document.createEvent("Event");
      evt.initEvent("move", true, true);
    }
    evt.to = toEl;
    evt.from = fromEl;
    evt.dragged = dragEl2;
    evt.draggedRect = dragRect;
    evt.related = targetEl || toEl;
    evt.relatedRect = targetRect || getRect(toEl);
    evt.willInsertAfter = willInsertAfter;
    evt.originalEvent = originalEvent;
    fromEl.dispatchEvent(evt);
    if (onMoveFn) {
      retVal = onMoveFn.call(sortable, evt, originalEvent);
    }
    return retVal;
  }
  function _disableDraggable(el) {
    el.draggable = false;
  }
  function _unsilent() {
    _silent = false;
  }
  function _ghostIsLast(evt, vertical, sortable) {
    var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
    var spacer = 10;
    return vertical ? evt.clientX > rect.right + spacer || evt.clientX <= rect.right && evt.clientY > rect.bottom && evt.clientX >= rect.left : evt.clientX > rect.right && evt.clientY > rect.top || evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer;
  }
  function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
    var mouseOnAxis = vertical ? evt.clientY : evt.clientX, targetLength = vertical ? targetRect.height : targetRect.width, targetS1 = vertical ? targetRect.top : targetRect.left, targetS2 = vertical ? targetRect.bottom : targetRect.right, invert = false;
    if (!invertSwap) {
      if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
        if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
          pastFirstInvertThresh = true;
        }
        if (!pastFirstInvertThresh) {
          if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance : mouseOnAxis > targetS2 - targetMoveDistance) {
            return -lastDirection;
          }
        } else {
          invert = true;
        }
      } else {
        if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
          return _getInsertDirection(target);
        }
      }
    }
    invert = invert || invertSwap;
    if (invert) {
      if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
        return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
      }
    }
    return 0;
  }
  function _getInsertDirection(target) {
    if (index(dragEl) < index(target)) {
      return 1;
    } else {
      return -1;
    }
  }
  function _generateId(el) {
    var str = el.tagName + el.className + el.src + el.href + el.textContent, i = str.length, sum = 0;
    while (i--) {
      sum += str.charCodeAt(i);
    }
    return sum.toString(36);
  }
  function _saveInputCheckedState(root) {
    savedInputChecked.length = 0;
    var inputs = root.getElementsByTagName("input");
    var idx = inputs.length;
    while (idx--) {
      var el = inputs[idx];
      el.checked && savedInputChecked.push(el);
    }
  }
  function _nextTick(fn) {
    return setTimeout(fn, 0);
  }
  function _cancelNextTick(id) {
    return clearTimeout(id);
  }
  if (documentExists) {
    on(document, "touchmove", function(evt) {
      if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
        evt.preventDefault();
      }
    });
  }
  Sortable.utils = {
    on,
    off,
    css,
    find,
    is: function is(el, selector) {
      return !!closest(el, selector, el, false);
    },
    extend,
    throttle,
    closest,
    toggleClass,
    clone,
    index,
    nextTick: _nextTick,
    cancelNextTick: _cancelNextTick,
    detectDirection: _detectDirection,
    getChild
  };
  Sortable.get = function(element) {
    return element[expando];
  };
  Sortable.mount = function() {
    for (var _len = arguments.length, plugins2 = new Array(_len), _key = 0; _key < _len; _key++) {
      plugins2[_key] = arguments[_key];
    }
    if (plugins2[0].constructor === Array)
      plugins2 = plugins2[0];
    plugins2.forEach(function(plugin) {
      if (!plugin.prototype || !plugin.prototype.constructor) {
        throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
      }
      if (plugin.utils)
        Sortable.utils = _objectSpread({}, Sortable.utils, plugin.utils);
      PluginManager.mount(plugin);
    });
  };
  Sortable.create = function(el, options) {
    return new Sortable(el, options);
  };
  Sortable.version = version;
  var autoScrolls = [], scrollEl, scrollRootEl, scrolling = false, lastAutoScrollX, lastAutoScrollY, touchEvt$1, pointerElemChangedInterval;
  function AutoScrollPlugin() {
    function AutoScroll() {
      this.defaults = {
        scroll: true,
        scrollSensitivity: 30,
        scrollSpeed: 10,
        bubbleScroll: true
      };
      for (var fn in this) {
        if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
          this[fn] = this[fn].bind(this);
        }
      }
    }
    AutoScroll.prototype = {
      dragStarted: function dragStarted2(_ref) {
        var originalEvent = _ref.originalEvent;
        if (this.sortable.nativeDraggable) {
          on(document, "dragover", this._handleAutoScroll);
        } else {
          if (this.options.supportPointer) {
            on(document, "pointermove", this._handleFallbackAutoScroll);
          } else if (originalEvent.touches) {
            on(document, "touchmove", this._handleFallbackAutoScroll);
          } else {
            on(document, "mousemove", this._handleFallbackAutoScroll);
          }
        }
      },
      dragOverCompleted: function dragOverCompleted(_ref2) {
        var originalEvent = _ref2.originalEvent;
        if (!this.options.dragOverBubble && !originalEvent.rootEl) {
          this._handleAutoScroll(originalEvent);
        }
      },
      drop: function drop2() {
        if (this.sortable.nativeDraggable) {
          off(document, "dragover", this._handleAutoScroll);
        } else {
          off(document, "pointermove", this._handleFallbackAutoScroll);
          off(document, "touchmove", this._handleFallbackAutoScroll);
          off(document, "mousemove", this._handleFallbackAutoScroll);
        }
        clearPointerElemChangedInterval();
        clearAutoScrolls();
        cancelThrottle();
      },
      nulling: function nulling() {
        touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
        autoScrolls.length = 0;
      },
      _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
        this._handleAutoScroll(evt, true);
      },
      _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
        var _this = this;
        var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, elem = document.elementFromPoint(x, y);
        touchEvt$1 = evt;
        if (fallback || Edge || IE11OrLess || Safari) {
          autoScroll(evt, this.options, elem, fallback);
          var ogElemScroller = getParentAutoScrollElement(elem, true);
          if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
            pointerElemChangedInterval && clearPointerElemChangedInterval();
            pointerElemChangedInterval = setInterval(function() {
              var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);
              if (newElem !== ogElemScroller) {
                ogElemScroller = newElem;
                clearAutoScrolls();
              }
              autoScroll(evt, _this.options, newElem, fallback);
            }, 10);
            lastAutoScrollX = x;
            lastAutoScrollY = y;
          }
        } else {
          if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
            clearAutoScrolls();
            return;
          }
          autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
        }
      }
    };
    return _extends(AutoScroll, {
      pluginName: "scroll",
      initializeByDefault: true
    });
  }
  function clearAutoScrolls() {
    autoScrolls.forEach(function(autoScroll2) {
      clearInterval(autoScroll2.pid);
    });
    autoScrolls = [];
  }
  function clearPointerElemChangedInterval() {
    clearInterval(pointerElemChangedInterval);
  }
  var autoScroll = throttle(function(evt, options, rootEl2, isFallback) {
    if (!options.scroll)
      return;
    var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, sens = options.scrollSensitivity, speed = options.scrollSpeed, winScroller = getWindowScrollingElement();
    var scrollThisInstance = false, scrollCustomFn;
    if (scrollRootEl !== rootEl2) {
      scrollRootEl = rootEl2;
      clearAutoScrolls();
      scrollEl = options.scroll;
      scrollCustomFn = options.scrollFn;
      if (scrollEl === true) {
        scrollEl = getParentAutoScrollElement(rootEl2, true);
      }
    }
    var layersOut = 0;
    var currentParent = scrollEl;
    do {
      var el = currentParent, rect = getRect(el), top = rect.top, bottom = rect.bottom, left = rect.left, right = rect.right, width = rect.width, height = rect.height, canScrollX = void 0, canScrollY = void 0, scrollWidth = el.scrollWidth, scrollHeight = el.scrollHeight, elCSS = css(el), scrollPosX = el.scrollLeft, scrollPosY = el.scrollTop;
      if (el === winScroller) {
        canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll" || elCSS.overflowX === "visible");
        canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll" || elCSS.overflowY === "visible");
      } else {
        canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll");
        canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll");
      }
      var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
      var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);
      if (!autoScrolls[layersOut]) {
        for (var i = 0; i <= layersOut; i++) {
          if (!autoScrolls[i]) {
            autoScrolls[i] = {};
          }
        }
      }
      if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
        autoScrolls[layersOut].el = el;
        autoScrolls[layersOut].vx = vx;
        autoScrolls[layersOut].vy = vy;
        clearInterval(autoScrolls[layersOut].pid);
        if (vx != 0 || vy != 0) {
          scrollThisInstance = true;
          autoScrolls[layersOut].pid = setInterval(function() {
            if (isFallback && this.layer === 0) {
              Sortable.active._onTouchMove(touchEvt$1);
            }
            var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
            var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;
            if (typeof scrollCustomFn === "function") {
              if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== "continue") {
                return;
              }
            }
            scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
          }.bind({
            layer: layersOut
          }), 24);
        }
      }
      layersOut++;
    } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));
    scrolling = scrollThisInstance;
  }, 30);
  var drop = function drop2(_ref) {
    var originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, dragEl2 = _ref.dragEl, activeSortable = _ref.activeSortable, dispatchSortableEvent = _ref.dispatchSortableEvent, hideGhostForTarget = _ref.hideGhostForTarget, unhideGhostForTarget = _ref.unhideGhostForTarget;
    if (!originalEvent)
      return;
    var toSortable = putSortable2 || activeSortable;
    hideGhostForTarget();
    var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
    var target = document.elementFromPoint(touch.clientX, touch.clientY);
    unhideGhostForTarget();
    if (toSortable && !toSortable.el.contains(target)) {
      dispatchSortableEvent("spill");
      this.onSpill({
        dragEl: dragEl2,
        putSortable: putSortable2
      });
    }
  };
  function Revert() {
  }
  Revert.prototype = {
    startIndex: null,
    dragStart: function dragStart(_ref2) {
      var oldDraggableIndex2 = _ref2.oldDraggableIndex;
      this.startIndex = oldDraggableIndex2;
    },
    onSpill: function onSpill(_ref3) {
      var dragEl2 = _ref3.dragEl, putSortable2 = _ref3.putSortable;
      this.sortable.captureAnimationState();
      if (putSortable2) {
        putSortable2.captureAnimationState();
      }
      var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);
      if (nextSibling) {
        this.sortable.el.insertBefore(dragEl2, nextSibling);
      } else {
        this.sortable.el.appendChild(dragEl2);
      }
      this.sortable.animateAll();
      if (putSortable2) {
        putSortable2.animateAll();
      }
    },
    drop
  };
  _extends(Revert, {
    pluginName: "revertOnSpill"
  });
  function Remove() {
  }
  Remove.prototype = {
    onSpill: function onSpill(_ref4) {
      var dragEl2 = _ref4.dragEl, putSortable2 = _ref4.putSortable;
      var parentSortable = putSortable2 || this.sortable;
      parentSortable.captureAnimationState();
      dragEl2.parentNode && dragEl2.parentNode.removeChild(dragEl2);
      parentSortable.animateAll();
    },
    drop
  };
  _extends(Remove, {
    pluginName: "removeOnSpill"
  });
  var lastSwapEl;
  function SwapPlugin() {
    function Swap() {
      this.defaults = {
        swapClass: "sortable-swap-highlight"
      };
    }
    Swap.prototype = {
      dragStart: function dragStart(_ref) {
        var dragEl2 = _ref.dragEl;
        lastSwapEl = dragEl2;
      },
      dragOverValid: function dragOverValid(_ref2) {
        var completed = _ref2.completed, target = _ref2.target, onMove = _ref2.onMove, activeSortable = _ref2.activeSortable, changed = _ref2.changed, cancel = _ref2.cancel;
        if (!activeSortable.options.swap)
          return;
        var el = this.sortable.el, options = this.options;
        if (target && target !== el) {
          var prevSwapEl = lastSwapEl;
          if (onMove(target) !== false) {
            toggleClass(target, options.swapClass, true);
            lastSwapEl = target;
          } else {
            lastSwapEl = null;
          }
          if (prevSwapEl && prevSwapEl !== lastSwapEl) {
            toggleClass(prevSwapEl, options.swapClass, false);
          }
        }
        changed();
        completed(true);
        cancel();
      },
      drop: function drop2(_ref3) {
        var activeSortable = _ref3.activeSortable, putSortable2 = _ref3.putSortable, dragEl2 = _ref3.dragEl;
        var toSortable = putSortable2 || this.sortable;
        var options = this.options;
        lastSwapEl && toggleClass(lastSwapEl, options.swapClass, false);
        if (lastSwapEl && (options.swap || putSortable2 && putSortable2.options.swap)) {
          if (dragEl2 !== lastSwapEl) {
            toSortable.captureAnimationState();
            if (toSortable !== activeSortable)
              activeSortable.captureAnimationState();
            swapNodes(dragEl2, lastSwapEl);
            toSortable.animateAll();
            if (toSortable !== activeSortable)
              activeSortable.animateAll();
          }
        }
      },
      nulling: function nulling() {
        lastSwapEl = null;
      }
    };
    return _extends(Swap, {
      pluginName: "swap",
      eventProperties: function eventProperties() {
        return {
          swapItem: lastSwapEl
        };
      }
    });
  }
  function swapNodes(n1, n2) {
    var p1 = n1.parentNode, p2 = n2.parentNode, i1, i2;
    if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1))
      return;
    i1 = index(n1);
    i2 = index(n2);
    if (p1.isEqualNode(p2) && i1 < i2) {
      i2++;
    }
    p1.insertBefore(n2, p1.children[i1]);
    p2.insertBefore(n1, p2.children[i2]);
  }
  var multiDragElements = [], multiDragClones = [], lastMultiDragSelect, multiDragSortable, initialFolding = false, folding = false, dragStarted = false, dragEl$1, clonesFromRect, clonesHidden;
  function MultiDragPlugin() {
    function MultiDrag(sortable) {
      for (var fn in this) {
        if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
          this[fn] = this[fn].bind(this);
        }
      }
      if (sortable.options.supportPointer) {
        on(document, "pointerup", this._deselectMultiDrag);
      } else {
        on(document, "mouseup", this._deselectMultiDrag);
        on(document, "touchend", this._deselectMultiDrag);
      }
      on(document, "keydown", this._checkKeyDown);
      on(document, "keyup", this._checkKeyUp);
      this.defaults = {
        selectedClass: "sortable-selected",
        multiDragKey: null,
        setData: function setData(dataTransfer, dragEl2) {
          var data = "";
          if (multiDragElements.length && multiDragSortable === sortable) {
            multiDragElements.forEach(function(multiDragElement, i) {
              data += (!i ? "" : ", ") + multiDragElement.textContent;
            });
          } else {
            data = dragEl2.textContent;
          }
          dataTransfer.setData("Text", data);
        }
      };
    }
    MultiDrag.prototype = {
      multiDragKeyDown: false,
      isMultiDrag: false,
      delayStartGlobal: function delayStartGlobal(_ref) {
        var dragged = _ref.dragEl;
        dragEl$1 = dragged;
      },
      delayEnded: function delayEnded() {
        this.isMultiDrag = ~multiDragElements.indexOf(dragEl$1);
      },
      setupClone: function setupClone(_ref2) {
        var sortable = _ref2.sortable, cancel = _ref2.cancel;
        if (!this.isMultiDrag)
          return;
        for (var i = 0; i < multiDragElements.length; i++) {
          multiDragClones.push(clone(multiDragElements[i]));
          multiDragClones[i].sortableIndex = multiDragElements[i].sortableIndex;
          multiDragClones[i].draggable = false;
          multiDragClones[i].style["will-change"] = "";
          toggleClass(multiDragClones[i], this.options.selectedClass, false);
          multiDragElements[i] === dragEl$1 && toggleClass(multiDragClones[i], this.options.chosenClass, false);
        }
        sortable._hideClone();
        cancel();
      },
      clone: function clone2(_ref3) {
        var sortable = _ref3.sortable, rootEl2 = _ref3.rootEl, dispatchSortableEvent = _ref3.dispatchSortableEvent, cancel = _ref3.cancel;
        if (!this.isMultiDrag)
          return;
        if (!this.options.removeCloneOnHide) {
          if (multiDragElements.length && multiDragSortable === sortable) {
            insertMultiDragClones(true, rootEl2);
            dispatchSortableEvent("clone");
            cancel();
          }
        }
      },
      showClone: function showClone(_ref4) {
        var cloneNowShown = _ref4.cloneNowShown, rootEl2 = _ref4.rootEl, cancel = _ref4.cancel;
        if (!this.isMultiDrag)
          return;
        insertMultiDragClones(false, rootEl2);
        multiDragClones.forEach(function(clone2) {
          css(clone2, "display", "");
        });
        cloneNowShown();
        clonesHidden = false;
        cancel();
      },
      hideClone: function hideClone(_ref5) {
        var _this = this;
        _ref5.sortable;
        var cloneNowHidden = _ref5.cloneNowHidden, cancel = _ref5.cancel;
        if (!this.isMultiDrag)
          return;
        multiDragClones.forEach(function(clone2) {
          css(clone2, "display", "none");
          if (_this.options.removeCloneOnHide && clone2.parentNode) {
            clone2.parentNode.removeChild(clone2);
          }
        });
        cloneNowHidden();
        clonesHidden = true;
        cancel();
      },
      dragStartGlobal: function dragStartGlobal(_ref6) {
        _ref6.sortable;
        if (!this.isMultiDrag && multiDragSortable) {
          multiDragSortable.multiDrag._deselectMultiDrag();
        }
        multiDragElements.forEach(function(multiDragElement) {
          multiDragElement.sortableIndex = index(multiDragElement);
        });
        multiDragElements = multiDragElements.sort(function(a, b) {
          return a.sortableIndex - b.sortableIndex;
        });
        dragStarted = true;
      },
      dragStarted: function dragStarted2(_ref7) {
        var _this2 = this;
        var sortable = _ref7.sortable;
        if (!this.isMultiDrag)
          return;
        if (this.options.sort) {
          sortable.captureAnimationState();
          if (this.options.animation) {
            multiDragElements.forEach(function(multiDragElement) {
              if (multiDragElement === dragEl$1)
                return;
              css(multiDragElement, "position", "absolute");
            });
            var dragRect = getRect(dragEl$1, false, true, true);
            multiDragElements.forEach(function(multiDragElement) {
              if (multiDragElement === dragEl$1)
                return;
              setRect(multiDragElement, dragRect);
            });
            folding = true;
            initialFolding = true;
          }
        }
        sortable.animateAll(function() {
          folding = false;
          initialFolding = false;
          if (_this2.options.animation) {
            multiDragElements.forEach(function(multiDragElement) {
              unsetRect(multiDragElement);
            });
          }
          if (_this2.options.sort) {
            removeMultiDragElements();
          }
        });
      },
      dragOver: function dragOver(_ref8) {
        var target = _ref8.target, completed = _ref8.completed, cancel = _ref8.cancel;
        if (folding && ~multiDragElements.indexOf(target)) {
          completed(false);
          cancel();
        }
      },
      revert: function revert(_ref9) {
        var fromSortable = _ref9.fromSortable, rootEl2 = _ref9.rootEl, sortable = _ref9.sortable, dragRect = _ref9.dragRect;
        if (multiDragElements.length > 1) {
          multiDragElements.forEach(function(multiDragElement) {
            sortable.addAnimationState({
              target: multiDragElement,
              rect: folding ? getRect(multiDragElement) : dragRect
            });
            unsetRect(multiDragElement);
            multiDragElement.fromRect = dragRect;
            fromSortable.removeAnimationState(multiDragElement);
          });
          folding = false;
          insertMultiDragElements(!this.options.removeCloneOnHide, rootEl2);
        }
      },
      dragOverCompleted: function dragOverCompleted(_ref10) {
        var sortable = _ref10.sortable, isOwner = _ref10.isOwner, insertion = _ref10.insertion, activeSortable = _ref10.activeSortable, parentEl2 = _ref10.parentEl, putSortable2 = _ref10.putSortable;
        var options = this.options;
        if (insertion) {
          if (isOwner) {
            activeSortable._hideClone();
          }
          initialFolding = false;
          if (options.animation && multiDragElements.length > 1 && (folding || !isOwner && !activeSortable.options.sort && !putSortable2)) {
            var dragRectAbsolute = getRect(dragEl$1, false, true, true);
            multiDragElements.forEach(function(multiDragElement) {
              if (multiDragElement === dragEl$1)
                return;
              setRect(multiDragElement, dragRectAbsolute);
              parentEl2.appendChild(multiDragElement);
            });
            folding = true;
          }
          if (!isOwner) {
            if (!folding) {
              removeMultiDragElements();
            }
            if (multiDragElements.length > 1) {
              var clonesHiddenBefore = clonesHidden;
              activeSortable._showClone(sortable);
              if (activeSortable.options.animation && !clonesHidden && clonesHiddenBefore) {
                multiDragClones.forEach(function(clone2) {
                  activeSortable.addAnimationState({
                    target: clone2,
                    rect: clonesFromRect
                  });
                  clone2.fromRect = clonesFromRect;
                  clone2.thisAnimationDuration = null;
                });
              }
            } else {
              activeSortable._showClone(sortable);
            }
          }
        }
      },
      dragOverAnimationCapture: function dragOverAnimationCapture(_ref11) {
        var dragRect = _ref11.dragRect, isOwner = _ref11.isOwner, activeSortable = _ref11.activeSortable;
        multiDragElements.forEach(function(multiDragElement) {
          multiDragElement.thisAnimationDuration = null;
        });
        if (activeSortable.options.animation && !isOwner && activeSortable.multiDrag.isMultiDrag) {
          clonesFromRect = _extends({}, dragRect);
          var dragMatrix = matrix(dragEl$1, true);
          clonesFromRect.top -= dragMatrix.f;
          clonesFromRect.left -= dragMatrix.e;
        }
      },
      dragOverAnimationComplete: function dragOverAnimationComplete() {
        if (folding) {
          folding = false;
          removeMultiDragElements();
        }
      },
      drop: function drop2(_ref12) {
        var evt = _ref12.originalEvent, rootEl2 = _ref12.rootEl, parentEl2 = _ref12.parentEl, sortable = _ref12.sortable, dispatchSortableEvent = _ref12.dispatchSortableEvent, oldIndex2 = _ref12.oldIndex, putSortable2 = _ref12.putSortable;
        var toSortable = putSortable2 || this.sortable;
        if (!evt)
          return;
        var options = this.options, children = parentEl2.children;
        if (!dragStarted) {
          if (options.multiDragKey && !this.multiDragKeyDown) {
            this._deselectMultiDrag();
          }
          toggleClass(dragEl$1, options.selectedClass, !~multiDragElements.indexOf(dragEl$1));
          if (!~multiDragElements.indexOf(dragEl$1)) {
            multiDragElements.push(dragEl$1);
            dispatchEvent({
              sortable,
              rootEl: rootEl2,
              name: "select",
              targetEl: dragEl$1,
              originalEvt: evt
            });
            if (evt.shiftKey && lastMultiDragSelect && sortable.el.contains(lastMultiDragSelect)) {
              var lastIndex = index(lastMultiDragSelect), currentIndex = index(dragEl$1);
              if (~lastIndex && ~currentIndex && lastIndex !== currentIndex) {
                var n, i;
                if (currentIndex > lastIndex) {
                  i = lastIndex;
                  n = currentIndex;
                } else {
                  i = currentIndex;
                  n = lastIndex + 1;
                }
                for (; i < n; i++) {
                  if (~multiDragElements.indexOf(children[i]))
                    continue;
                  toggleClass(children[i], options.selectedClass, true);
                  multiDragElements.push(children[i]);
                  dispatchEvent({
                    sortable,
                    rootEl: rootEl2,
                    name: "select",
                    targetEl: children[i],
                    originalEvt: evt
                  });
                }
              }
            } else {
              lastMultiDragSelect = dragEl$1;
            }
            multiDragSortable = toSortable;
          } else {
            multiDragElements.splice(multiDragElements.indexOf(dragEl$1), 1);
            lastMultiDragSelect = null;
            dispatchEvent({
              sortable,
              rootEl: rootEl2,
              name: "deselect",
              targetEl: dragEl$1,
              originalEvt: evt
            });
          }
        }
        if (dragStarted && this.isMultiDrag) {
          if ((parentEl2[expando].options.sort || parentEl2 !== rootEl2) && multiDragElements.length > 1) {
            var dragRect = getRect(dragEl$1), multiDragIndex = index(dragEl$1, ":not(." + this.options.selectedClass + ")");
            if (!initialFolding && options.animation)
              dragEl$1.thisAnimationDuration = null;
            toSortable.captureAnimationState();
            if (!initialFolding) {
              if (options.animation) {
                dragEl$1.fromRect = dragRect;
                multiDragElements.forEach(function(multiDragElement) {
                  multiDragElement.thisAnimationDuration = null;
                  if (multiDragElement !== dragEl$1) {
                    var rect = folding ? getRect(multiDragElement) : dragRect;
                    multiDragElement.fromRect = rect;
                    toSortable.addAnimationState({
                      target: multiDragElement,
                      rect
                    });
                  }
                });
              }
              removeMultiDragElements();
              multiDragElements.forEach(function(multiDragElement) {
                if (children[multiDragIndex]) {
                  parentEl2.insertBefore(multiDragElement, children[multiDragIndex]);
                } else {
                  parentEl2.appendChild(multiDragElement);
                }
                multiDragIndex++;
              });
              if (oldIndex2 === index(dragEl$1)) {
                var update = false;
                multiDragElements.forEach(function(multiDragElement) {
                  if (multiDragElement.sortableIndex !== index(multiDragElement)) {
                    update = true;
                    return;
                  }
                });
                if (update) {
                  dispatchSortableEvent("update");
                }
              }
            }
            multiDragElements.forEach(function(multiDragElement) {
              unsetRect(multiDragElement);
            });
            toSortable.animateAll();
          }
          multiDragSortable = toSortable;
        }
        if (rootEl2 === parentEl2 || putSortable2 && putSortable2.lastPutMode !== "clone") {
          multiDragClones.forEach(function(clone2) {
            clone2.parentNode && clone2.parentNode.removeChild(clone2);
          });
        }
      },
      nullingGlobal: function nullingGlobal() {
        this.isMultiDrag = dragStarted = false;
        multiDragClones.length = 0;
      },
      destroyGlobal: function destroyGlobal() {
        this._deselectMultiDrag();
        off(document, "pointerup", this._deselectMultiDrag);
        off(document, "mouseup", this._deselectMultiDrag);
        off(document, "touchend", this._deselectMultiDrag);
        off(document, "keydown", this._checkKeyDown);
        off(document, "keyup", this._checkKeyUp);
      },
      _deselectMultiDrag: function _deselectMultiDrag(evt) {
        if (typeof dragStarted !== "undefined" && dragStarted)
          return;
        if (multiDragSortable !== this.sortable)
          return;
        if (evt && closest(evt.target, this.options.draggable, this.sortable.el, false))
          return;
        if (evt && evt.button !== 0)
          return;
        while (multiDragElements.length) {
          var el = multiDragElements[0];
          toggleClass(el, this.options.selectedClass, false);
          multiDragElements.shift();
          dispatchEvent({
            sortable: this.sortable,
            rootEl: this.sortable.el,
            name: "deselect",
            targetEl: el,
            originalEvt: evt
          });
        }
      },
      _checkKeyDown: function _checkKeyDown(evt) {
        if (evt.key === this.options.multiDragKey) {
          this.multiDragKeyDown = true;
        }
      },
      _checkKeyUp: function _checkKeyUp(evt) {
        if (evt.key === this.options.multiDragKey) {
          this.multiDragKeyDown = false;
        }
      }
    };
    return _extends(MultiDrag, {
      pluginName: "multiDrag",
      utils: {
        select: function select(el) {
          var sortable = el.parentNode[expando];
          if (!sortable || !sortable.options.multiDrag || ~multiDragElements.indexOf(el))
            return;
          if (multiDragSortable && multiDragSortable !== sortable) {
            multiDragSortable.multiDrag._deselectMultiDrag();
            multiDragSortable = sortable;
          }
          toggleClass(el, sortable.options.selectedClass, true);
          multiDragElements.push(el);
        },
        deselect: function deselect(el) {
          var sortable = el.parentNode[expando], index2 = multiDragElements.indexOf(el);
          if (!sortable || !sortable.options.multiDrag || !~index2)
            return;
          toggleClass(el, sortable.options.selectedClass, false);
          multiDragElements.splice(index2, 1);
        }
      },
      eventProperties: function eventProperties() {
        var _this3 = this;
        var oldIndicies = [], newIndicies = [];
        multiDragElements.forEach(function(multiDragElement) {
          oldIndicies.push({
            multiDragElement,
            index: multiDragElement.sortableIndex
          });
          var newIndex2;
          if (folding && multiDragElement !== dragEl$1) {
            newIndex2 = -1;
          } else if (folding) {
            newIndex2 = index(multiDragElement, ":not(." + _this3.options.selectedClass + ")");
          } else {
            newIndex2 = index(multiDragElement);
          }
          newIndicies.push({
            multiDragElement,
            index: newIndex2
          });
        });
        return {
          items: _toConsumableArray(multiDragElements),
          clones: [].concat(multiDragClones),
          oldIndicies,
          newIndicies
        };
      },
      optionListeners: {
        multiDragKey: function multiDragKey(key) {
          key = key.toLowerCase();
          if (key === "ctrl") {
            key = "Control";
          } else if (key.length > 1) {
            key = key.charAt(0).toUpperCase() + key.substr(1);
          }
          return key;
        }
      }
    });
  }
  function insertMultiDragElements(clonesInserted, rootEl2) {
    multiDragElements.forEach(function(multiDragElement, i) {
      var target = rootEl2.children[multiDragElement.sortableIndex + (clonesInserted ? Number(i) : 0)];
      if (target) {
        rootEl2.insertBefore(multiDragElement, target);
      } else {
        rootEl2.appendChild(multiDragElement);
      }
    });
  }
  function insertMultiDragClones(elementsInserted, rootEl2) {
    multiDragClones.forEach(function(clone2, i) {
      var target = rootEl2.children[clone2.sortableIndex + (elementsInserted ? Number(i) : 0)];
      if (target) {
        rootEl2.insertBefore(clone2, target);
      } else {
        rootEl2.appendChild(clone2);
      }
    });
  }
  function removeMultiDragElements() {
    multiDragElements.forEach(function(multiDragElement) {
      if (multiDragElement === dragEl$1)
        return;
      multiDragElement.parentNode && multiDragElement.parentNode.removeChild(multiDragElement);
    });
  }
  Sortable.mount(new AutoScrollPlugin());
  Sortable.mount(Remove, Revert);
  const sortable_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Sortable,
    MultiDrag: MultiDragPlugin,
    Sortable,
    Swap: SwapPlugin
  }, Symbol.toStringTag, { value: "Module" }));
  const require$$0 = /* @__PURE__ */ getAugmentedNamespace(sortable_esm);
  (function(module2, exports3) {
    (function webpackUniversalModuleDefinition(root, factory) {
      module2.exports = factory(require$$0);
    })(typeof self !== "undefined" ? self : commonjsGlobal, function(__WEBPACK_EXTERNAL_MODULE_a352__) {
      return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
          if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
          }
          var module3 = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
          };
          modules[moduleId].call(module3.exports, module3, module3.exports, __webpack_require__);
          module3.l = true;
          return module3.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.d = function(exports4, name, getter) {
          if (!__webpack_require__.o(exports4, name)) {
            Object.defineProperty(exports4, name, { enumerable: true, get: getter });
          }
        };
        __webpack_require__.r = function(exports4) {
          if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            Object.defineProperty(exports4, Symbol.toStringTag, { value: "Module" });
          }
          Object.defineProperty(exports4, "__esModule", { value: true });
        };
        __webpack_require__.t = function(value, mode) {
          if (mode & 1)
            value = __webpack_require__(value);
          if (mode & 8)
            return value;
          if (mode & 4 && typeof value === "object" && value && value.__esModule)
            return value;
          var ns = /* @__PURE__ */ Object.create(null);
          __webpack_require__.r(ns);
          Object.defineProperty(ns, "default", { enumerable: true, value });
          if (mode & 2 && typeof value != "string")
            for (var key in value)
              __webpack_require__.d(ns, key, function(key2) {
                return value[key2];
              }.bind(null, key));
          return ns;
        };
        __webpack_require__.n = function(module3) {
          var getter = module3 && module3.__esModule ? function getDefault() {
            return module3["default"];
          } : function getModuleExports() {
            return module3;
          };
          __webpack_require__.d(getter, "a", getter);
          return getter;
        };
        __webpack_require__.o = function(object, property) {
          return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = "fb15");
      }({
        "01f9": function(module3, exports4, __webpack_require__) {
          var LIBRARY = __webpack_require__("2d00");
          var $export = __webpack_require__("5ca1");
          var redefine = __webpack_require__("2aba");
          var hide = __webpack_require__("32e9");
          var Iterators = __webpack_require__("84f2");
          var $iterCreate = __webpack_require__("41a0");
          var setToStringTag = __webpack_require__("7f20");
          var getPrototypeOf = __webpack_require__("38fd");
          var ITERATOR = __webpack_require__("2b4c")("iterator");
          var BUGGY = !([].keys && "next" in [].keys());
          var FF_ITERATOR = "@@iterator";
          var KEYS = "keys";
          var VALUES = "values";
          var returnThis = function() {
            return this;
          };
          module3.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
            $iterCreate(Constructor, NAME, next);
            var getMethod = function(kind) {
              if (!BUGGY && kind in proto)
                return proto[kind];
              switch (kind) {
                case KEYS:
                  return function keys() {
                    return new Constructor(this, kind);
                  };
                case VALUES:
                  return function values() {
                    return new Constructor(this, kind);
                  };
              }
              return function entries() {
                return new Constructor(this, kind);
              };
            };
            var TAG = NAME + " Iterator";
            var DEF_VALUES = DEFAULT == VALUES;
            var VALUES_BUG = false;
            var proto = Base.prototype;
            var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
            var $default = $native || getMethod(DEFAULT);
            var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod("entries") : void 0;
            var $anyNative = NAME == "Array" ? proto.entries || $native : $native;
            var methods, key, IteratorPrototype;
            if ($anyNative) {
              IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
              if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
                setToStringTag(IteratorPrototype, TAG, true);
                if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != "function")
                  hide(IteratorPrototype, ITERATOR, returnThis);
              }
            }
            if (DEF_VALUES && $native && $native.name !== VALUES) {
              VALUES_BUG = true;
              $default = function values() {
                return $native.call(this);
              };
            }
            if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
              hide(proto, ITERATOR, $default);
            }
            Iterators[NAME] = $default;
            Iterators[TAG] = returnThis;
            if (DEFAULT) {
              methods = {
                values: DEF_VALUES ? $default : getMethod(VALUES),
                keys: IS_SET ? $default : getMethod(KEYS),
                entries: $entries
              };
              if (FORCED)
                for (key in methods) {
                  if (!(key in proto))
                    redefine(proto, key, methods[key]);
                }
              else
                $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
            }
            return methods;
          };
        },
        "02f4": function(module3, exports4, __webpack_require__) {
          var toInteger = __webpack_require__("4588");
          var defined = __webpack_require__("be13");
          module3.exports = function(TO_STRING) {
            return function(that, pos) {
              var s = String(defined(that));
              var i = toInteger(pos);
              var l = s.length;
              var a, b;
              if (i < 0 || i >= l)
                return TO_STRING ? "" : void 0;
              a = s.charCodeAt(i);
              return a < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 55296 << 10) + (b - 56320) + 65536;
            };
          };
        },
        "0390": function(module3, exports4, __webpack_require__) {
          var at = __webpack_require__("02f4")(true);
          module3.exports = function(S, index2, unicode) {
            return index2 + (unicode ? at(S, index2).length : 1);
          };
        },
        "0bfb": function(module3, exports4, __webpack_require__) {
          var anObject = __webpack_require__("cb7c");
          module3.exports = function() {
            var that = anObject(this);
            var result = "";
            if (that.global)
              result += "g";
            if (that.ignoreCase)
              result += "i";
            if (that.multiline)
              result += "m";
            if (that.unicode)
              result += "u";
            if (that.sticky)
              result += "y";
            return result;
          };
        },
        "0d58": function(module3, exports4, __webpack_require__) {
          var $keys = __webpack_require__("ce10");
          var enumBugKeys = __webpack_require__("e11e");
          module3.exports = Object.keys || function keys(O) {
            return $keys(O, enumBugKeys);
          };
        },
        "1495": function(module3, exports4, __webpack_require__) {
          var dP = __webpack_require__("86cc");
          var anObject = __webpack_require__("cb7c");
          var getKeys = __webpack_require__("0d58");
          module3.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
            anObject(O);
            var keys = getKeys(Properties);
            var length = keys.length;
            var i = 0;
            var P;
            while (length > i)
              dP.f(O, P = keys[i++], Properties[P]);
            return O;
          };
        },
        "214f": function(module3, exports4, __webpack_require__) {
          __webpack_require__("b0c5");
          var redefine = __webpack_require__("2aba");
          var hide = __webpack_require__("32e9");
          var fails = __webpack_require__("79e5");
          var defined = __webpack_require__("be13");
          var wks = __webpack_require__("2b4c");
          var regexpExec = __webpack_require__("520a");
          var SPECIES = wks("species");
          var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function() {
            var re = /./;
            re.exec = function() {
              var result = [];
              result.groups = { a: "7" };
              return result;
            };
            return "".replace(re, "$<a>") !== "7";
          });
          var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = function() {
            var re = /(?:)/;
            var originalExec = re.exec;
            re.exec = function() {
              return originalExec.apply(this, arguments);
            };
            var result = "ab".split(re);
            return result.length === 2 && result[0] === "a" && result[1] === "b";
          }();
          module3.exports = function(KEY, length, exec) {
            var SYMBOL = wks(KEY);
            var DELEGATES_TO_SYMBOL = !fails(function() {
              var O = {};
              O[SYMBOL] = function() {
                return 7;
              };
              return ""[KEY](O) != 7;
            });
            var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function() {
              var execCalled = false;
              var re = /a/;
              re.exec = function() {
                execCalled = true;
                return null;
              };
              if (KEY === "split") {
                re.constructor = {};
                re.constructor[SPECIES] = function() {
                  return re;
                };
              }
              re[SYMBOL]("");
              return !execCalled;
            }) : void 0;
            if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === "replace" && !REPLACE_SUPPORTS_NAMED_GROUPS || KEY === "split" && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
              var nativeRegExpMethod = /./[SYMBOL];
              var fns = exec(defined, SYMBOL, ""[KEY], function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
                if (regexp.exec === regexpExec) {
                  if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
                    return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
                  }
                  return { done: true, value: nativeMethod.call(str, regexp, arg2) };
                }
                return { done: false };
              });
              var strfn = fns[0];
              var rxfn = fns[1];
              redefine(String.prototype, KEY, strfn);
              hide(RegExp.prototype, SYMBOL, length == 2 ? function(string, arg) {
                return rxfn.call(string, this, arg);
              } : function(string) {
                return rxfn.call(string, this);
              });
            }
          };
        },
        "230e": function(module3, exports4, __webpack_require__) {
          var isObject = __webpack_require__("d3f4");
          var document2 = __webpack_require__("7726").document;
          var is = isObject(document2) && isObject(document2.createElement);
          module3.exports = function(it) {
            return is ? document2.createElement(it) : {};
          };
        },
        "23c6": function(module3, exports4, __webpack_require__) {
          var cof = __webpack_require__("2d95");
          var TAG = __webpack_require__("2b4c")("toStringTag");
          var ARG = cof(function() {
            return arguments;
          }()) == "Arguments";
          var tryGet = function(it, key) {
            try {
              return it[key];
            } catch (e) {
            }
          };
          module3.exports = function(it) {
            var O, T, B;
            return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (T = tryGet(O = Object(it), TAG)) == "string" ? T : ARG ? cof(O) : (B = cof(O)) == "Object" && typeof O.callee == "function" ? "Arguments" : B;
          };
        },
        "2621": function(module3, exports4) {
          exports4.f = Object.getOwnPropertySymbols;
        },
        "2aba": function(module3, exports4, __webpack_require__) {
          var global2 = __webpack_require__("7726");
          var hide = __webpack_require__("32e9");
          var has = __webpack_require__("69a8");
          var SRC = __webpack_require__("ca5a")("src");
          var $toString = __webpack_require__("fa5b");
          var TO_STRING = "toString";
          var TPL = ("" + $toString).split(TO_STRING);
          __webpack_require__("8378").inspectSource = function(it) {
            return $toString.call(it);
          };
          (module3.exports = function(O, key, val, safe) {
            var isFunction = typeof val == "function";
            if (isFunction)
              has(val, "name") || hide(val, "name", key);
            if (O[key] === val)
              return;
            if (isFunction)
              has(val, SRC) || hide(val, SRC, O[key] ? "" + O[key] : TPL.join(String(key)));
            if (O === global2) {
              O[key] = val;
            } else if (!safe) {
              delete O[key];
              hide(O, key, val);
            } else if (O[key]) {
              O[key] = val;
            } else {
              hide(O, key, val);
            }
          })(Function.prototype, TO_STRING, function toString() {
            return typeof this == "function" && this[SRC] || $toString.call(this);
          });
        },
        "2aeb": function(module3, exports4, __webpack_require__) {
          var anObject = __webpack_require__("cb7c");
          var dPs = __webpack_require__("1495");
          var enumBugKeys = __webpack_require__("e11e");
          var IE_PROTO = __webpack_require__("613b")("IE_PROTO");
          var Empty = function() {
          };
          var PROTOTYPE = "prototype";
          var createDict = function() {
            var iframe = __webpack_require__("230e")("iframe");
            var i = enumBugKeys.length;
            var lt = "<";
            var gt = ">";
            var iframeDocument;
            iframe.style.display = "none";
            __webpack_require__("fab2").appendChild(iframe);
            iframe.src = "javascript:";
            iframeDocument = iframe.contentWindow.document;
            iframeDocument.open();
            iframeDocument.write(lt + "script" + gt + "document.F=Object" + lt + "/script" + gt);
            iframeDocument.close();
            createDict = iframeDocument.F;
            while (i--)
              delete createDict[PROTOTYPE][enumBugKeys[i]];
            return createDict();
          };
          module3.exports = Object.create || function create(O, Properties) {
            var result;
            if (O !== null) {
              Empty[PROTOTYPE] = anObject(O);
              result = new Empty();
              Empty[PROTOTYPE] = null;
              result[IE_PROTO] = O;
            } else
              result = createDict();
            return Properties === void 0 ? result : dPs(result, Properties);
          };
        },
        "2b4c": function(module3, exports4, __webpack_require__) {
          var store = __webpack_require__("5537")("wks");
          var uid = __webpack_require__("ca5a");
          var Symbol2 = __webpack_require__("7726").Symbol;
          var USE_SYMBOL = typeof Symbol2 == "function";
          var $exports = module3.exports = function(name) {
            return store[name] || (store[name] = USE_SYMBOL && Symbol2[name] || (USE_SYMBOL ? Symbol2 : uid)("Symbol." + name));
          };
          $exports.store = store;
        },
        "2d00": function(module3, exports4) {
          module3.exports = false;
        },
        "2d95": function(module3, exports4) {
          var toString = {}.toString;
          module3.exports = function(it) {
            return toString.call(it).slice(8, -1);
          };
        },
        "2fdb": function(module3, exports4, __webpack_require__) {
          var $export = __webpack_require__("5ca1");
          var context = __webpack_require__("d2c8");
          var INCLUDES = "includes";
          $export($export.P + $export.F * __webpack_require__("5147")(INCLUDES), "String", {
            includes: function includes(searchString) {
              return !!~context(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : void 0);
            }
          });
        },
        "32e9": function(module3, exports4, __webpack_require__) {
          var dP = __webpack_require__("86cc");
          var createDesc = __webpack_require__("4630");
          module3.exports = __webpack_require__("9e1e") ? function(object, key, value) {
            return dP.f(object, key, createDesc(1, value));
          } : function(object, key, value) {
            object[key] = value;
            return object;
          };
        },
        "38fd": function(module3, exports4, __webpack_require__) {
          var has = __webpack_require__("69a8");
          var toObject = __webpack_require__("4bf8");
          var IE_PROTO = __webpack_require__("613b")("IE_PROTO");
          var ObjectProto = Object.prototype;
          module3.exports = Object.getPrototypeOf || function(O) {
            O = toObject(O);
            if (has(O, IE_PROTO))
              return O[IE_PROTO];
            if (typeof O.constructor == "function" && O instanceof O.constructor) {
              return O.constructor.prototype;
            }
            return O instanceof Object ? ObjectProto : null;
          };
        },
        "41a0": function(module3, exports4, __webpack_require__) {
          var create = __webpack_require__("2aeb");
          var descriptor = __webpack_require__("4630");
          var setToStringTag = __webpack_require__("7f20");
          var IteratorPrototype = {};
          __webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")("iterator"), function() {
            return this;
          });
          module3.exports = function(Constructor, NAME, next) {
            Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
            setToStringTag(Constructor, NAME + " Iterator");
          };
        },
        "456d": function(module3, exports4, __webpack_require__) {
          var toObject = __webpack_require__("4bf8");
          var $keys = __webpack_require__("0d58");
          __webpack_require__("5eda")("keys", function() {
            return function keys(it) {
              return $keys(toObject(it));
            };
          });
        },
        "4588": function(module3, exports4) {
          var ceil = Math.ceil;
          var floor = Math.floor;
          module3.exports = function(it) {
            return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
          };
        },
        "4630": function(module3, exports4) {
          module3.exports = function(bitmap, value) {
            return {
              enumerable: !(bitmap & 1),
              configurable: !(bitmap & 2),
              writable: !(bitmap & 4),
              value
            };
          };
        },
        "4bf8": function(module3, exports4, __webpack_require__) {
          var defined = __webpack_require__("be13");
          module3.exports = function(it) {
            return Object(defined(it));
          };
        },
        "5147": function(module3, exports4, __webpack_require__) {
          var MATCH = __webpack_require__("2b4c")("match");
          module3.exports = function(KEY) {
            var re = /./;
            try {
              "/./"[KEY](re);
            } catch (e) {
              try {
                re[MATCH] = false;
                return !"/./"[KEY](re);
              } catch (f) {
              }
            }
            return true;
          };
        },
        "520a": function(module3, exports4, __webpack_require__) {
          var regexpFlags = __webpack_require__("0bfb");
          var nativeExec = RegExp.prototype.exec;
          var nativeReplace = String.prototype.replace;
          var patchedExec = nativeExec;
          var LAST_INDEX = "lastIndex";
          var UPDATES_LAST_INDEX_WRONG = function() {
            var re1 = /a/, re2 = /b*/g;
            nativeExec.call(re1, "a");
            nativeExec.call(re2, "a");
            return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
          }();
          var NPCG_INCLUDED = /()??/.exec("")[1] !== void 0;
          var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;
          if (PATCH) {
            patchedExec = function exec(str) {
              var re = this;
              var lastIndex, reCopy, match, i;
              if (NPCG_INCLUDED) {
                reCopy = new RegExp("^" + re.source + "$(?!\\s)", regexpFlags.call(re));
              }
              if (UPDATES_LAST_INDEX_WRONG)
                lastIndex = re[LAST_INDEX];
              match = nativeExec.call(re, str);
              if (UPDATES_LAST_INDEX_WRONG && match) {
                re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
              }
              if (NPCG_INCLUDED && match && match.length > 1) {
                nativeReplace.call(match[0], reCopy, function() {
                  for (i = 1; i < arguments.length - 2; i++) {
                    if (arguments[i] === void 0)
                      match[i] = void 0;
                  }
                });
              }
              return match;
            };
          }
          module3.exports = patchedExec;
        },
        "52a7": function(module3, exports4) {
          exports4.f = {}.propertyIsEnumerable;
        },
        "5537": function(module3, exports4, __webpack_require__) {
          var core = __webpack_require__("8378");
          var global2 = __webpack_require__("7726");
          var SHARED = "__core-js_shared__";
          var store = global2[SHARED] || (global2[SHARED] = {});
          (module3.exports = function(key, value) {
            return store[key] || (store[key] = value !== void 0 ? value : {});
          })("versions", []).push({
            version: core.version,
            mode: __webpack_require__("2d00") ? "pure" : "global",
            copyright: "\xA9 2019 Denis Pushkarev (zloirock.ru)"
          });
        },
        "5ca1": function(module3, exports4, __webpack_require__) {
          var global2 = __webpack_require__("7726");
          var core = __webpack_require__("8378");
          var hide = __webpack_require__("32e9");
          var redefine = __webpack_require__("2aba");
          var ctx = __webpack_require__("9b43");
          var PROTOTYPE = "prototype";
          var $export = function(type, name, source) {
            var IS_FORCED = type & $export.F;
            var IS_GLOBAL = type & $export.G;
            var IS_STATIC = type & $export.S;
            var IS_PROTO = type & $export.P;
            var IS_BIND = type & $export.B;
            var target = IS_GLOBAL ? global2 : IS_STATIC ? global2[name] || (global2[name] = {}) : (global2[name] || {})[PROTOTYPE];
            var exports5 = IS_GLOBAL ? core : core[name] || (core[name] = {});
            var expProto = exports5[PROTOTYPE] || (exports5[PROTOTYPE] = {});
            var key, own, out, exp;
            if (IS_GLOBAL)
              source = name;
            for (key in source) {
              own = !IS_FORCED && target && target[key] !== void 0;
              out = (own ? target : source)[key];
              exp = IS_BIND && own ? ctx(out, global2) : IS_PROTO && typeof out == "function" ? ctx(Function.call, out) : out;
              if (target)
                redefine(target, key, out, type & $export.U);
              if (exports5[key] != out)
                hide(exports5, key, exp);
              if (IS_PROTO && expProto[key] != out)
                expProto[key] = out;
            }
          };
          global2.core = core;
          $export.F = 1;
          $export.G = 2;
          $export.S = 4;
          $export.P = 8;
          $export.B = 16;
          $export.W = 32;
          $export.U = 64;
          $export.R = 128;
          module3.exports = $export;
        },
        "5eda": function(module3, exports4, __webpack_require__) {
          var $export = __webpack_require__("5ca1");
          var core = __webpack_require__("8378");
          var fails = __webpack_require__("79e5");
          module3.exports = function(KEY, exec) {
            var fn = (core.Object || {})[KEY] || Object[KEY];
            var exp = {};
            exp[KEY] = exec(fn);
            $export($export.S + $export.F * fails(function() {
              fn(1);
            }), "Object", exp);
          };
        },
        "5f1b": function(module3, exports4, __webpack_require__) {
          var classof = __webpack_require__("23c6");
          var builtinExec = RegExp.prototype.exec;
          module3.exports = function(R, S) {
            var exec = R.exec;
            if (typeof exec === "function") {
              var result = exec.call(R, S);
              if (typeof result !== "object") {
                throw new TypeError("RegExp exec method returned something other than an Object or null");
              }
              return result;
            }
            if (classof(R) !== "RegExp") {
              throw new TypeError("RegExp#exec called on incompatible receiver");
            }
            return builtinExec.call(R, S);
          };
        },
        "613b": function(module3, exports4, __webpack_require__) {
          var shared = __webpack_require__("5537")("keys");
          var uid = __webpack_require__("ca5a");
          module3.exports = function(key) {
            return shared[key] || (shared[key] = uid(key));
          };
        },
        "626a": function(module3, exports4, __webpack_require__) {
          var cof = __webpack_require__("2d95");
          module3.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
            return cof(it) == "String" ? it.split("") : Object(it);
          };
        },
        "6762": function(module3, exports4, __webpack_require__) {
          var $export = __webpack_require__("5ca1");
          var $includes = __webpack_require__("c366")(true);
          $export($export.P, "Array", {
            includes: function includes(el) {
              return $includes(this, el, arguments.length > 1 ? arguments[1] : void 0);
            }
          });
          __webpack_require__("9c6c")("includes");
        },
        "6821": function(module3, exports4, __webpack_require__) {
          var IObject = __webpack_require__("626a");
          var defined = __webpack_require__("be13");
          module3.exports = function(it) {
            return IObject(defined(it));
          };
        },
        "69a8": function(module3, exports4) {
          var hasOwnProperty = {}.hasOwnProperty;
          module3.exports = function(it, key) {
            return hasOwnProperty.call(it, key);
          };
        },
        "6a99": function(module3, exports4, __webpack_require__) {
          var isObject = __webpack_require__("d3f4");
          module3.exports = function(it, S) {
            if (!isObject(it))
              return it;
            var fn, val;
            if (S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it)))
              return val;
            if (typeof (fn = it.valueOf) == "function" && !isObject(val = fn.call(it)))
              return val;
            if (!S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it)))
              return val;
            throw TypeError("Can't convert object to primitive value");
          };
        },
        "7333": function(module3, exports4, __webpack_require__) {
          var getKeys = __webpack_require__("0d58");
          var gOPS = __webpack_require__("2621");
          var pIE = __webpack_require__("52a7");
          var toObject = __webpack_require__("4bf8");
          var IObject = __webpack_require__("626a");
          var $assign = Object.assign;
          module3.exports = !$assign || __webpack_require__("79e5")(function() {
            var A = {};
            var B = {};
            var S = Symbol();
            var K = "abcdefghijklmnopqrst";
            A[S] = 7;
            K.split("").forEach(function(k) {
              B[k] = k;
            });
            return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join("") != K;
          }) ? function assign(target, source) {
            var T = toObject(target);
            var aLen = arguments.length;
            var index2 = 1;
            var getSymbols = gOPS.f;
            var isEnum = pIE.f;
            while (aLen > index2) {
              var S = IObject(arguments[index2++]);
              var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
              var length = keys.length;
              var j = 0;
              var key;
              while (length > j)
                if (isEnum.call(S, key = keys[j++]))
                  T[key] = S[key];
            }
            return T;
          } : $assign;
        },
        "7726": function(module3, exports4) {
          var global2 = module3.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
          if (typeof __g == "number")
            __g = global2;
        },
        "77f1": function(module3, exports4, __webpack_require__) {
          var toInteger = __webpack_require__("4588");
          var max = Math.max;
          var min = Math.min;
          module3.exports = function(index2, length) {
            index2 = toInteger(index2);
            return index2 < 0 ? max(index2 + length, 0) : min(index2, length);
          };
        },
        "79e5": function(module3, exports4) {
          module3.exports = function(exec) {
            try {
              return !!exec();
            } catch (e) {
              return true;
            }
          };
        },
        "7f20": function(module3, exports4, __webpack_require__) {
          var def = __webpack_require__("86cc").f;
          var has = __webpack_require__("69a8");
          var TAG = __webpack_require__("2b4c")("toStringTag");
          module3.exports = function(it, tag, stat) {
            if (it && !has(it = stat ? it : it.prototype, TAG))
              def(it, TAG, { configurable: true, value: tag });
          };
        },
        "8378": function(module3, exports4) {
          var core = module3.exports = { version: "2.6.5" };
          if (typeof __e == "number")
            __e = core;
        },
        "84f2": function(module3, exports4) {
          module3.exports = {};
        },
        "86cc": function(module3, exports4, __webpack_require__) {
          var anObject = __webpack_require__("cb7c");
          var IE8_DOM_DEFINE = __webpack_require__("c69a");
          var toPrimitive = __webpack_require__("6a99");
          var dP = Object.defineProperty;
          exports4.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
            anObject(O);
            P = toPrimitive(P, true);
            anObject(Attributes);
            if (IE8_DOM_DEFINE)
              try {
                return dP(O, P, Attributes);
              } catch (e) {
              }
            if ("get" in Attributes || "set" in Attributes)
              throw TypeError("Accessors not supported!");
            if ("value" in Attributes)
              O[P] = Attributes.value;
            return O;
          };
        },
        "9b43": function(module3, exports4, __webpack_require__) {
          var aFunction = __webpack_require__("d8e8");
          module3.exports = function(fn, that, length) {
            aFunction(fn);
            if (that === void 0)
              return fn;
            switch (length) {
              case 1:
                return function(a) {
                  return fn.call(that, a);
                };
              case 2:
                return function(a, b) {
                  return fn.call(that, a, b);
                };
              case 3:
                return function(a, b, c) {
                  return fn.call(that, a, b, c);
                };
            }
            return function() {
              return fn.apply(that, arguments);
            };
          };
        },
        "9c6c": function(module3, exports4, __webpack_require__) {
          var UNSCOPABLES = __webpack_require__("2b4c")("unscopables");
          var ArrayProto = Array.prototype;
          if (ArrayProto[UNSCOPABLES] == void 0)
            __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
          module3.exports = function(key) {
            ArrayProto[UNSCOPABLES][key] = true;
          };
        },
        "9def": function(module3, exports4, __webpack_require__) {
          var toInteger = __webpack_require__("4588");
          var min = Math.min;
          module3.exports = function(it) {
            return it > 0 ? min(toInteger(it), 9007199254740991) : 0;
          };
        },
        "9e1e": function(module3, exports4, __webpack_require__) {
          module3.exports = !__webpack_require__("79e5")(function() {
            return Object.defineProperty({}, "a", { get: function() {
              return 7;
            } }).a != 7;
          });
        },
        "a352": function(module3, exports4) {
          module3.exports = __WEBPACK_EXTERNAL_MODULE_a352__;
        },
        "a481": function(module3, exports4, __webpack_require__) {
          var anObject = __webpack_require__("cb7c");
          var toObject = __webpack_require__("4bf8");
          var toLength = __webpack_require__("9def");
          var toInteger = __webpack_require__("4588");
          var advanceStringIndex = __webpack_require__("0390");
          var regExpExec = __webpack_require__("5f1b");
          var max = Math.max;
          var min = Math.min;
          var floor = Math.floor;
          var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
          var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;
          var maybeToString = function(it) {
            return it === void 0 ? it : String(it);
          };
          __webpack_require__("214f")("replace", 2, function(defined, REPLACE, $replace, maybeCallNative) {
            return [
              function replace(searchValue, replaceValue) {
                var O = defined(this);
                var fn = searchValue == void 0 ? void 0 : searchValue[REPLACE];
                return fn !== void 0 ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
              },
              function(regexp, replaceValue) {
                var res = maybeCallNative($replace, regexp, this, replaceValue);
                if (res.done)
                  return res.value;
                var rx = anObject(regexp);
                var S = String(this);
                var functionalReplace = typeof replaceValue === "function";
                if (!functionalReplace)
                  replaceValue = String(replaceValue);
                var global2 = rx.global;
                if (global2) {
                  var fullUnicode = rx.unicode;
                  rx.lastIndex = 0;
                }
                var results = [];
                while (true) {
                  var result = regExpExec(rx, S);
                  if (result === null)
                    break;
                  results.push(result);
                  if (!global2)
                    break;
                  var matchStr = String(result[0]);
                  if (matchStr === "")
                    rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
                }
                var accumulatedResult = "";
                var nextSourcePosition = 0;
                for (var i = 0; i < results.length; i++) {
                  result = results[i];
                  var matched = String(result[0]);
                  var position = max(min(toInteger(result.index), S.length), 0);
                  var captures = [];
                  for (var j = 1; j < result.length; j++)
                    captures.push(maybeToString(result[j]));
                  var namedCaptures = result.groups;
                  if (functionalReplace) {
                    var replacerArgs = [matched].concat(captures, position, S);
                    if (namedCaptures !== void 0)
                      replacerArgs.push(namedCaptures);
                    var replacement = String(replaceValue.apply(void 0, replacerArgs));
                  } else {
                    replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
                  }
                  if (position >= nextSourcePosition) {
                    accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
                    nextSourcePosition = position + matched.length;
                  }
                }
                return accumulatedResult + S.slice(nextSourcePosition);
              }
            ];
            function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
              var tailPos = position + matched.length;
              var m = captures.length;
              var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
              if (namedCaptures !== void 0) {
                namedCaptures = toObject(namedCaptures);
                symbols = SUBSTITUTION_SYMBOLS;
              }
              return $replace.call(replacement, symbols, function(match, ch) {
                var capture;
                switch (ch.charAt(0)) {
                  case "$":
                    return "$";
                  case "&":
                    return matched;
                  case "`":
                    return str.slice(0, position);
                  case "'":
                    return str.slice(tailPos);
                  case "<":
                    capture = namedCaptures[ch.slice(1, -1)];
                    break;
                  default:
                    var n = +ch;
                    if (n === 0)
                      return match;
                    if (n > m) {
                      var f = floor(n / 10);
                      if (f === 0)
                        return match;
                      if (f <= m)
                        return captures[f - 1] === void 0 ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
                      return match;
                    }
                    capture = captures[n - 1];
                }
                return capture === void 0 ? "" : capture;
              });
            }
          });
        },
        "aae3": function(module3, exports4, __webpack_require__) {
          var isObject = __webpack_require__("d3f4");
          var cof = __webpack_require__("2d95");
          var MATCH = __webpack_require__("2b4c")("match");
          module3.exports = function(it) {
            var isRegExp;
            return isObject(it) && ((isRegExp = it[MATCH]) !== void 0 ? !!isRegExp : cof(it) == "RegExp");
          };
        },
        "ac6a": function(module3, exports4, __webpack_require__) {
          var $iterators = __webpack_require__("cadf");
          var getKeys = __webpack_require__("0d58");
          var redefine = __webpack_require__("2aba");
          var global2 = __webpack_require__("7726");
          var hide = __webpack_require__("32e9");
          var Iterators = __webpack_require__("84f2");
          var wks = __webpack_require__("2b4c");
          var ITERATOR = wks("iterator");
          var TO_STRING_TAG = wks("toStringTag");
          var ArrayValues = Iterators.Array;
          var DOMIterables = {
            CSSRuleList: true,
            CSSStyleDeclaration: false,
            CSSValueList: false,
            ClientRectList: false,
            DOMRectList: false,
            DOMStringList: false,
            DOMTokenList: true,
            DataTransferItemList: false,
            FileList: false,
            HTMLAllCollection: false,
            HTMLCollection: false,
            HTMLFormElement: false,
            HTMLSelectElement: false,
            MediaList: true,
            MimeTypeArray: false,
            NamedNodeMap: false,
            NodeList: true,
            PaintRequestList: false,
            Plugin: false,
            PluginArray: false,
            SVGLengthList: false,
            SVGNumberList: false,
            SVGPathSegList: false,
            SVGPointList: false,
            SVGStringList: false,
            SVGTransformList: false,
            SourceBufferList: false,
            StyleSheetList: true,
            TextTrackCueList: false,
            TextTrackList: false,
            TouchList: false
          };
          for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
            var NAME = collections[i];
            var explicit = DOMIterables[NAME];
            var Collection = global2[NAME];
            var proto = Collection && Collection.prototype;
            var key;
            if (proto) {
              if (!proto[ITERATOR])
                hide(proto, ITERATOR, ArrayValues);
              if (!proto[TO_STRING_TAG])
                hide(proto, TO_STRING_TAG, NAME);
              Iterators[NAME] = ArrayValues;
              if (explicit) {
                for (key in $iterators)
                  if (!proto[key])
                    redefine(proto, key, $iterators[key], true);
              }
            }
          }
        },
        "b0c5": function(module3, exports4, __webpack_require__) {
          var regexpExec = __webpack_require__("520a");
          __webpack_require__("5ca1")({
            target: "RegExp",
            proto: true,
            forced: regexpExec !== /./.exec
          }, {
            exec: regexpExec
          });
        },
        "be13": function(module3, exports4) {
          module3.exports = function(it) {
            if (it == void 0)
              throw TypeError("Can't call method on  " + it);
            return it;
          };
        },
        "c366": function(module3, exports4, __webpack_require__) {
          var toIObject = __webpack_require__("6821");
          var toLength = __webpack_require__("9def");
          var toAbsoluteIndex = __webpack_require__("77f1");
          module3.exports = function(IS_INCLUDES) {
            return function($this, el, fromIndex) {
              var O = toIObject($this);
              var length = toLength(O.length);
              var index2 = toAbsoluteIndex(fromIndex, length);
              var value;
              if (IS_INCLUDES && el != el)
                while (length > index2) {
                  value = O[index2++];
                  if (value != value)
                    return true;
                }
              else
                for (; length > index2; index2++)
                  if (IS_INCLUDES || index2 in O) {
                    if (O[index2] === el)
                      return IS_INCLUDES || index2 || 0;
                  }
              return !IS_INCLUDES && -1;
            };
          };
        },
        "c649": function(module3, __webpack_exports__, __webpack_require__) {
          (function(global2) {
            __webpack_require__.d(__webpack_exports__, "c", function() {
              return insertNodeAt;
            });
            __webpack_require__.d(__webpack_exports__, "a", function() {
              return camelize;
            });
            __webpack_require__.d(__webpack_exports__, "b", function() {
              return console;
            });
            __webpack_require__.d(__webpack_exports__, "d", function() {
              return removeNode;
            });
            __webpack_require__("a481");
            function getConsole() {
              if (typeof window !== "undefined") {
                return window.console;
              }
              return global2.console;
            }
            var console = getConsole();
            function cached(fn) {
              var cache = /* @__PURE__ */ Object.create(null);
              return function cachedFn(str) {
                var hit = cache[str];
                return hit || (cache[str] = fn(str));
              };
            }
            var regex = /-(\w)/g;
            var camelize = cached(function(str) {
              return str.replace(regex, function(_, c) {
                return c ? c.toUpperCase() : "";
              });
            });
            function removeNode(node) {
              if (node.parentElement !== null) {
                node.parentElement.removeChild(node);
              }
            }
            function insertNodeAt(fatherNode, node, position) {
              var refNode = position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling;
              fatherNode.insertBefore(node, refNode);
            }
          }).call(this, __webpack_require__("c8ba"));
        },
        "c69a": function(module3, exports4, __webpack_require__) {
          module3.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function() {
            return Object.defineProperty(__webpack_require__("230e")("div"), "a", { get: function() {
              return 7;
            } }).a != 7;
          });
        },
        "c8ba": function(module3, exports4) {
          var g;
          g = function() {
            return this;
          }();
          try {
            g = g || new Function("return this")();
          } catch (e) {
            if (typeof window === "object")
              g = window;
          }
          module3.exports = g;
        },
        "ca5a": function(module3, exports4) {
          var id = 0;
          var px = Math.random();
          module3.exports = function(key) {
            return "Symbol(".concat(key === void 0 ? "" : key, ")_", (++id + px).toString(36));
          };
        },
        "cadf": function(module3, exports4, __webpack_require__) {
          var addToUnscopables = __webpack_require__("9c6c");
          var step = __webpack_require__("d53b");
          var Iterators = __webpack_require__("84f2");
          var toIObject = __webpack_require__("6821");
          module3.exports = __webpack_require__("01f9")(Array, "Array", function(iterated, kind) {
            this._t = toIObject(iterated);
            this._i = 0;
            this._k = kind;
          }, function() {
            var O = this._t;
            var kind = this._k;
            var index2 = this._i++;
            if (!O || index2 >= O.length) {
              this._t = void 0;
              return step(1);
            }
            if (kind == "keys")
              return step(0, index2);
            if (kind == "values")
              return step(0, O[index2]);
            return step(0, [index2, O[index2]]);
          }, "values");
          Iterators.Arguments = Iterators.Array;
          addToUnscopables("keys");
          addToUnscopables("values");
          addToUnscopables("entries");
        },
        "cb7c": function(module3, exports4, __webpack_require__) {
          var isObject = __webpack_require__("d3f4");
          module3.exports = function(it) {
            if (!isObject(it))
              throw TypeError(it + " is not an object!");
            return it;
          };
        },
        "ce10": function(module3, exports4, __webpack_require__) {
          var has = __webpack_require__("69a8");
          var toIObject = __webpack_require__("6821");
          var arrayIndexOf = __webpack_require__("c366")(false);
          var IE_PROTO = __webpack_require__("613b")("IE_PROTO");
          module3.exports = function(object, names) {
            var O = toIObject(object);
            var i = 0;
            var result = [];
            var key;
            for (key in O)
              if (key != IE_PROTO)
                has(O, key) && result.push(key);
            while (names.length > i)
              if (has(O, key = names[i++])) {
                ~arrayIndexOf(result, key) || result.push(key);
              }
            return result;
          };
        },
        "d2c8": function(module3, exports4, __webpack_require__) {
          var isRegExp = __webpack_require__("aae3");
          var defined = __webpack_require__("be13");
          module3.exports = function(that, searchString, NAME) {
            if (isRegExp(searchString))
              throw TypeError("String#" + NAME + " doesn't accept regex!");
            return String(defined(that));
          };
        },
        "d3f4": function(module3, exports4) {
          module3.exports = function(it) {
            return typeof it === "object" ? it !== null : typeof it === "function";
          };
        },
        "d53b": function(module3, exports4) {
          module3.exports = function(done, value) {
            return { value, done: !!done };
          };
        },
        "d8e8": function(module3, exports4) {
          module3.exports = function(it) {
            if (typeof it != "function")
              throw TypeError(it + " is not a function!");
            return it;
          };
        },
        "e11e": function(module3, exports4) {
          module3.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
        },
        "f559": function(module3, exports4, __webpack_require__) {
          var $export = __webpack_require__("5ca1");
          var toLength = __webpack_require__("9def");
          var context = __webpack_require__("d2c8");
          var STARTS_WITH = "startsWith";
          var $startsWith = ""[STARTS_WITH];
          $export($export.P + $export.F * __webpack_require__("5147")(STARTS_WITH), "String", {
            startsWith: function startsWith(searchString) {
              var that = context(this, searchString, STARTS_WITH);
              var index2 = toLength(Math.min(arguments.length > 1 ? arguments[1] : void 0, that.length));
              var search = String(searchString);
              return $startsWith ? $startsWith.call(that, search, index2) : that.slice(index2, index2 + search.length) === search;
            }
          });
        },
        "f6fd": function(module3, exports4) {
          (function(document2) {
            var currentScript = "currentScript", scripts = document2.getElementsByTagName("script");
            if (!(currentScript in document2)) {
              Object.defineProperty(document2, currentScript, {
                get: function() {
                  try {
                    throw new Error();
                  } catch (err) {
                    var i, res = (/.*at [^\(]*\((.*):.+:.+\)$/ig.exec(err.stack) || [false])[1];
                    for (i in scripts) {
                      if (scripts[i].src == res || scripts[i].readyState == "interactive") {
                        return scripts[i];
                      }
                    }
                    return null;
                  }
                }
              });
            }
          })(document);
        },
        "f751": function(module3, exports4, __webpack_require__) {
          var $export = __webpack_require__("5ca1");
          $export($export.S + $export.F, "Object", { assign: __webpack_require__("7333") });
        },
        "fa5b": function(module3, exports4, __webpack_require__) {
          module3.exports = __webpack_require__("5537")("native-function-to-string", Function.toString);
        },
        "fab2": function(module3, exports4, __webpack_require__) {
          var document2 = __webpack_require__("7726").document;
          module3.exports = document2 && document2.documentElement;
        },
        "fb15": function(module3, __webpack_exports__, __webpack_require__) {
          __webpack_require__.r(__webpack_exports__);
          if (typeof window !== "undefined") {
            {
              __webpack_require__("f6fd");
            }
            var setPublicPath_i;
            if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
              __webpack_require__.p = setPublicPath_i[1];
            }
          }
          __webpack_require__("f751");
          __webpack_require__("f559");
          __webpack_require__("ac6a");
          __webpack_require__("cadf");
          __webpack_require__("456d");
          function _arrayWithHoles(arr) {
            if (Array.isArray(arr))
              return arr;
          }
          function _iterableToArrayLimit(arr, i) {
            if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
              return;
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = void 0;
            try {
              for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i && _arr.length === i)
                  break;
              }
            } catch (err) {
              _d = true;
              _e = err;
            } finally {
              try {
                if (!_n && _i["return"] != null)
                  _i["return"]();
              } finally {
                if (_d)
                  throw _e;
              }
            }
            return _arr;
          }
          function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length)
              len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          }
          function _unsupportedIterableToArray(o, minLen) {
            if (!o)
              return;
            if (typeof o === "string")
              return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor)
              n = o.constructor.name;
            if (n === "Map" || n === "Set")
              return Array.from(o);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
              return _arrayLikeToArray(o, minLen);
          }
          function _nonIterableRest() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          function _slicedToArray(arr, i) {
            return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
          }
          __webpack_require__("6762");
          __webpack_require__("2fdb");
          function _arrayWithoutHoles2(arr) {
            if (Array.isArray(arr))
              return _arrayLikeToArray(arr);
          }
          function _iterableToArray2(iter) {
            if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
              return Array.from(iter);
          }
          function _nonIterableSpread2() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          function _toConsumableArray2(arr) {
            return _arrayWithoutHoles2(arr) || _iterableToArray2(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread2();
          }
          var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_ = __webpack_require__("a352");
          var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default = /* @__PURE__ */ __webpack_require__.n(external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_);
          var helper = __webpack_require__("c649");
          function buildAttribute(object, propName, value) {
            if (value === void 0) {
              return object;
            }
            object = object || {};
            object[propName] = value;
            return object;
          }
          function computeVmIndex(vnodes, element) {
            return vnodes.map(function(elt) {
              return elt.elm;
            }).indexOf(element);
          }
          function _computeIndexes(slots, children, isTransition, footerOffset) {
            if (!slots) {
              return [];
            }
            var elmFromNodes = slots.map(function(elt) {
              return elt.elm;
            });
            var footerIndex = children.length - footerOffset;
            var rawIndexes = _toConsumableArray2(children).map(function(elt, idx) {
              return idx >= footerIndex ? elmFromNodes.length : elmFromNodes.indexOf(elt);
            });
            return isTransition ? rawIndexes.filter(function(ind) {
              return ind !== -1;
            }) : rawIndexes;
          }
          function emit(evtName, evtData) {
            var _this = this;
            this.$nextTick(function() {
              return _this.$emit(evtName.toLowerCase(), evtData);
            });
          }
          function delegateAndEmit(evtName) {
            var _this2 = this;
            return function(evtData) {
              if (_this2.realList !== null) {
                _this2["onDrag" + evtName](evtData);
              }
              emit.call(_this2, evtName, evtData);
            };
          }
          function isTransitionName(name) {
            return ["transition-group", "TransitionGroup"].includes(name);
          }
          function vuedraggable_isTransition(slots) {
            if (!slots || slots.length !== 1) {
              return false;
            }
            var _slots = _slicedToArray(slots, 1), componentOptions = _slots[0].componentOptions;
            if (!componentOptions) {
              return false;
            }
            return isTransitionName(componentOptions.tag);
          }
          function getSlot(slot, scopedSlot, key) {
            return slot[key] || (scopedSlot[key] ? scopedSlot[key]() : void 0);
          }
          function computeChildrenAndOffsets(children, slot, scopedSlot) {
            var headerOffset = 0;
            var footerOffset = 0;
            var header = getSlot(slot, scopedSlot, "header");
            if (header) {
              headerOffset = header.length;
              children = children ? [].concat(_toConsumableArray2(header), _toConsumableArray2(children)) : _toConsumableArray2(header);
            }
            var footer = getSlot(slot, scopedSlot, "footer");
            if (footer) {
              footerOffset = footer.length;
              children = children ? [].concat(_toConsumableArray2(children), _toConsumableArray2(footer)) : _toConsumableArray2(footer);
            }
            return {
              children,
              headerOffset,
              footerOffset
            };
          }
          function getComponentAttributes($attrs, componentData) {
            var attributes = null;
            var update = function update2(name, value) {
              attributes = buildAttribute(attributes, name, value);
            };
            var attrs = Object.keys($attrs).filter(function(key) {
              return key === "id" || key.startsWith("data-");
            }).reduce(function(res, key) {
              res[key] = $attrs[key];
              return res;
            }, {});
            update("attrs", attrs);
            if (!componentData) {
              return attributes;
            }
            var on2 = componentData.on, props2 = componentData.props, componentDataAttrs = componentData.attrs;
            update("on", on2);
            update("props", props2);
            Object.assign(attributes.attrs, componentDataAttrs);
            return attributes;
          }
          var eventsListened = ["Start", "Add", "Remove", "Update", "End"];
          var eventsToEmit = ["Choose", "Unchoose", "Sort", "Filter", "Clone"];
          var readonlyProperties = ["Move"].concat(eventsListened, eventsToEmit).map(function(evt) {
            return "on" + evt;
          });
          var draggingElement = null;
          var props = {
            options: Object,
            list: {
              type: Array,
              required: false,
              default: null
            },
            value: {
              type: Array,
              required: false,
              default: null
            },
            noTransitionOnDrag: {
              type: Boolean,
              default: false
            },
            clone: {
              type: Function,
              default: function _default(original) {
                return original;
              }
            },
            element: {
              type: String,
              default: "div"
            },
            tag: {
              type: String,
              default: null
            },
            move: {
              type: Function,
              default: null
            },
            componentData: {
              type: Object,
              required: false,
              default: null
            }
          };
          var draggableComponent = {
            name: "draggable",
            inheritAttrs: false,
            props,
            data: function data() {
              return {
                transitionMode: false,
                noneFunctionalComponentMode: false
              };
            },
            render: function render(h) {
              var slots = this.$slots.default;
              this.transitionMode = vuedraggable_isTransition(slots);
              var _computeChildrenAndOf = computeChildrenAndOffsets(slots, this.$slots, this.$scopedSlots), children = _computeChildrenAndOf.children, headerOffset = _computeChildrenAndOf.headerOffset, footerOffset = _computeChildrenAndOf.footerOffset;
              this.headerOffset = headerOffset;
              this.footerOffset = footerOffset;
              var attributes = getComponentAttributes(this.$attrs, this.componentData);
              return h(this.getTag(), attributes, children);
            },
            created: function created() {
              if (this.list !== null && this.value !== null) {
                helper["b"].error("Value and list props are mutually exclusive! Please set one or another.");
              }
              if (this.element !== "div") {
                helper["b"].warn("Element props is deprecated please use tag props instead. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#element-props");
              }
              if (this.options !== void 0) {
                helper["b"].warn("Options props is deprecated, add sortable options directly as vue.draggable item, or use v-bind. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#options-props");
              }
            },
            mounted: function mounted() {
              var _this3 = this;
              this.noneFunctionalComponentMode = this.getTag().toLowerCase() !== this.$el.nodeName.toLowerCase() && !this.getIsFunctional();
              if (this.noneFunctionalComponentMode && this.transitionMode) {
                throw new Error("Transition-group inside component is not supported. Please alter tag value or remove transition-group. Current tag value: ".concat(this.getTag()));
              }
              var optionsAdded = {};
              eventsListened.forEach(function(elt) {
                optionsAdded["on" + elt] = delegateAndEmit.call(_this3, elt);
              });
              eventsToEmit.forEach(function(elt) {
                optionsAdded["on" + elt] = emit.bind(_this3, elt);
              });
              var attributes = Object.keys(this.$attrs).reduce(function(res, key) {
                res[Object(helper["a"])(key)] = _this3.$attrs[key];
                return res;
              }, {});
              var options = Object.assign({}, this.options, attributes, optionsAdded, {
                onMove: function onMove(evt, originalEvent) {
                  return _this3.onDragMove(evt, originalEvent);
                }
              });
              !("draggable" in options) && (options.draggable = ">*");
              this._sortable = new external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default.a(this.rootContainer, options);
              this.computeIndexes();
            },
            beforeDestroy: function beforeDestroy() {
              if (this._sortable !== void 0)
                this._sortable.destroy();
            },
            computed: {
              rootContainer: function rootContainer() {
                return this.transitionMode ? this.$el.children[0] : this.$el;
              },
              realList: function realList() {
                return this.list ? this.list : this.value;
              }
            },
            watch: {
              options: {
                handler: function handler(newOptionValue) {
                  this.updateOptions(newOptionValue);
                },
                deep: true
              },
              $attrs: {
                handler: function handler(newOptionValue) {
                  this.updateOptions(newOptionValue);
                },
                deep: true
              },
              realList: function realList() {
                this.computeIndexes();
              }
            },
            methods: {
              getIsFunctional: function getIsFunctional() {
                var fnOptions = this._vnode.fnOptions;
                return fnOptions && fnOptions.functional;
              },
              getTag: function getTag() {
                return this.tag || this.element;
              },
              updateOptions: function updateOptions(newOptionValue) {
                for (var property in newOptionValue) {
                  var value = Object(helper["a"])(property);
                  if (readonlyProperties.indexOf(value) === -1) {
                    this._sortable.option(value, newOptionValue[property]);
                  }
                }
              },
              getChildrenNodes: function getChildrenNodes() {
                if (this.noneFunctionalComponentMode) {
                  return this.$children[0].$slots.default;
                }
                var rawNodes = this.$slots.default;
                return this.transitionMode ? rawNodes[0].child.$slots.default : rawNodes;
              },
              computeIndexes: function computeIndexes() {
                var _this4 = this;
                this.$nextTick(function() {
                  _this4.visibleIndexes = _computeIndexes(_this4.getChildrenNodes(), _this4.rootContainer.children, _this4.transitionMode, _this4.footerOffset);
                });
              },
              getUnderlyingVm: function getUnderlyingVm(htmlElt) {
                var index2 = computeVmIndex(this.getChildrenNodes() || [], htmlElt);
                if (index2 === -1) {
                  return null;
                }
                var element = this.realList[index2];
                return {
                  index: index2,
                  element
                };
              },
              getUnderlyingPotencialDraggableComponent: function getUnderlyingPotencialDraggableComponent(_ref) {
                var vue2 = _ref.__vue__;
                if (!vue2 || !vue2.$options || !isTransitionName(vue2.$options._componentTag)) {
                  if (!("realList" in vue2) && vue2.$children.length === 1 && "realList" in vue2.$children[0])
                    return vue2.$children[0];
                  return vue2;
                }
                return vue2.$parent;
              },
              emitChanges: function emitChanges(evt) {
                var _this5 = this;
                this.$nextTick(function() {
                  _this5.$emit("change", evt);
                });
              },
              alterList: function alterList(onList) {
                if (this.list) {
                  onList(this.list);
                  return;
                }
                var newList = _toConsumableArray2(this.value);
                onList(newList);
                this.$emit("input", newList);
              },
              spliceList: function spliceList() {
                var _arguments = arguments;
                var spliceList2 = function spliceList3(list) {
                  return list.splice.apply(list, _toConsumableArray2(_arguments));
                };
                this.alterList(spliceList2);
              },
              updatePosition: function updatePosition(oldIndex2, newIndex2) {
                var updatePosition2 = function updatePosition3(list) {
                  return list.splice(newIndex2, 0, list.splice(oldIndex2, 1)[0]);
                };
                this.alterList(updatePosition2);
              },
              getRelatedContextFromMoveEvent: function getRelatedContextFromMoveEvent(_ref2) {
                var to = _ref2.to, related = _ref2.related;
                var component = this.getUnderlyingPotencialDraggableComponent(to);
                if (!component) {
                  return {
                    component
                  };
                }
                var list = component.realList;
                var context = {
                  list,
                  component
                };
                if (to !== related && list && component.getUnderlyingVm) {
                  var destination = component.getUnderlyingVm(related);
                  if (destination) {
                    return Object.assign(destination, context);
                  }
                }
                return context;
              },
              getVmIndex: function getVmIndex(domIndex) {
                var indexes = this.visibleIndexes;
                var numberIndexes = indexes.length;
                return domIndex > numberIndexes - 1 ? numberIndexes : indexes[domIndex];
              },
              getComponent: function getComponent() {
                return this.$slots.default[0].componentInstance;
              },
              resetTransitionData: function resetTransitionData(index2) {
                if (!this.noTransitionOnDrag || !this.transitionMode) {
                  return;
                }
                var nodes = this.getChildrenNodes();
                nodes[index2].data = null;
                var transitionContainer = this.getComponent();
                transitionContainer.children = [];
                transitionContainer.kept = void 0;
              },
              onDragStart: function onDragStart(evt) {
                this.context = this.getUnderlyingVm(evt.item);
                evt.item._underlying_vm_ = this.clone(this.context.element);
                draggingElement = evt.item;
              },
              onDragAdd: function onDragAdd(evt) {
                var element = evt.item._underlying_vm_;
                if (element === void 0) {
                  return;
                }
                Object(helper["d"])(evt.item);
                var newIndex2 = this.getVmIndex(evt.newIndex);
                this.spliceList(newIndex2, 0, element);
                this.computeIndexes();
                var added = {
                  element,
                  newIndex: newIndex2
                };
                this.emitChanges({
                  added
                });
              },
              onDragRemove: function onDragRemove(evt) {
                Object(helper["c"])(this.rootContainer, evt.item, evt.oldIndex);
                if (evt.pullMode === "clone") {
                  Object(helper["d"])(evt.clone);
                  return;
                }
                var oldIndex2 = this.context.index;
                this.spliceList(oldIndex2, 1);
                var removed = {
                  element: this.context.element,
                  oldIndex: oldIndex2
                };
                this.resetTransitionData(oldIndex2);
                this.emitChanges({
                  removed
                });
              },
              onDragUpdate: function onDragUpdate(evt) {
                Object(helper["d"])(evt.item);
                Object(helper["c"])(evt.from, evt.item, evt.oldIndex);
                var oldIndex2 = this.context.index;
                var newIndex2 = this.getVmIndex(evt.newIndex);
                this.updatePosition(oldIndex2, newIndex2);
                var moved2 = {
                  element: this.context.element,
                  oldIndex: oldIndex2,
                  newIndex: newIndex2
                };
                this.emitChanges({
                  moved: moved2
                });
              },
              updateProperty: function updateProperty(evt, propertyName) {
                evt.hasOwnProperty(propertyName) && (evt[propertyName] += this.headerOffset);
              },
              computeFutureIndex: function computeFutureIndex(relatedContext, evt) {
                if (!relatedContext.element) {
                  return 0;
                }
                var domChildren = _toConsumableArray2(evt.to.children).filter(function(el) {
                  return el.style["display"] !== "none";
                });
                var currentDOMIndex = domChildren.indexOf(evt.related);
                var currentIndex = relatedContext.component.getVmIndex(currentDOMIndex);
                var draggedInList = domChildren.indexOf(draggingElement) !== -1;
                return draggedInList || !evt.willInsertAfter ? currentIndex : currentIndex + 1;
              },
              onDragMove: function onDragMove(evt, originalEvent) {
                var onMove = this.move;
                if (!onMove || !this.realList) {
                  return true;
                }
                var relatedContext = this.getRelatedContextFromMoveEvent(evt);
                var draggedContext = this.context;
                var futureIndex = this.computeFutureIndex(relatedContext, evt);
                Object.assign(draggedContext, {
                  futureIndex
                });
                var sendEvt = Object.assign({}, evt, {
                  relatedContext,
                  draggedContext
                });
                return onMove(sendEvt, originalEvent);
              },
              onDragEnd: function onDragEnd() {
                this.computeIndexes();
                draggingElement = null;
              }
            }
          };
          if (typeof window !== "undefined" && "Vue" in window) {
            window.Vue.component("draggable", draggableComponent);
          }
          var vuedraggable = draggableComponent;
          __webpack_exports__["default"] = vuedraggable;
        }
      })["default"];
    });
  })(vuedraggable_umd);
  const draggable = /* @__PURE__ */ getDefaultExportFromCjs(vuedraggable_umd.exports);
  class LktTableColumn {
    constructor(key = "", label = "") {
      this.key = key;
      this.label = label;
      this.sortable = true;
      this.hidden = false;
      this.formatter = void 0;
      this.checkEmpty = void 0;
    }
    setIsSortable(status = true) {
      this.sortable = status;
      return this;
    }
    setIsHidden(status = true) {
      this.hidden = status;
      return this;
    }
    setFormatter(formatter = void 0) {
      this.formatter = formatter;
      return this;
    }
    setEmptyChecker(checker = void 0) {
      this.checkEmpty = checker;
      return this;
    }
  }
  const createLktTableColumn = (key, label, formatter = void 0, sortable = true, hidden = false) => {
    return new LktTableColumn(key, label).setIsSortable(sortable).setIsHidden(hidden).setFormatter(formatter);
  };
  const defaultTableSorter = (a, b, c, sortDirection) => {
    if (!c) {
      return 0;
    }
    let A = a[c.key], B = b[c.key];
    if (sortDirection === "asc") {
      if (A > B) {
        return 1;
      }
      if (B > A) {
        return -1;
      }
    } else {
      if (A > B) {
        return -1;
      }
      if (B > A) {
        return 1;
      }
    }
    return 0;
  };
  const getColumnDisplayContent = (column, item, i) => {
    if (lktTools.isFunction(column.formatter)) {
      return column.formatter(item[column.key], item, column, i);
    }
    return item[column.key];
  };
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$1 = {
    name: "LktTableRow",
    props: {
      isDraggable: {
        type: Boolean,
        default: true
      },
      i: {
        type: [Number, Boolean],
        default: 0
      },
      HiddenColumnsColSpan: {
        type: Number,
        default: 0
      },
      visibleColumns: {
        type: Array,
        default: () => []
      },
      hiddenColumns: {
        type: Array,
        default: () => []
      },
      emptyColumns: {
        type: Array,
        default: () => []
      },
      hiddenIsVisible: {
        type: Boolean,
        default: false
      },
      item: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    methods: {
      getColumnDisplayContent,
      getVerticalColSpan(column) {
        if (!column.colspan) {
          return false;
        }
        let max = this.columns.length;
        this.Items.forEach((item) => {
          let i = this.getHorizontalColSpan(column, item);
          if (i > 0 && i < max) {
            max = i;
          }
        });
        return max;
      },
      getHorizontalColSpan(column, item) {
        if (!column.colspan) {
          return false;
        }
        if (typeof column.colspan === "function") {
          return column.colspan(item);
        }
        return column.colspan;
      }
    }
  };
  const _hoisted_1$1 = ["data-i", "data-handle-drag"];
  const _hoisted_2$1 = {
    key: 0,
    "data-role": "drag-indicator"
  };
  const _hoisted_3$1 = {
    key: 1,
    "data-role": "invalid-drag-indicator"
  };
  const _hoisted_4$1 = ["onClick", "data-column", "colspan", "title"];
  const _hoisted_5$1 = {
    key: 0,
    "data-role": "hidden-row"
  };
  const _hoisted_6$1 = ["colspan"];
  const _hoisted_7$1 = ["data-column"];
  const _hoisted_8$1 = ["data-i"];
  const _hoisted_9$1 = ["onClick", "data-column", "title"];
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createElementVNode("tr", {
        "data-i": $props.i,
        "data-handle-drag": $props.isDraggable
      }, [
        $props.isDraggable ? (vue.openBlock(), vue.createElementBlock("td", _hoisted_2$1)) : (vue.openBlock(), vue.createElementBlock("td", _hoisted_3$1)),
        $props.hiddenColumns.length > 0 ? (vue.openBlock(), vue.createElementBlock("td", {
          key: 2,
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("show", { $event, i: $props.i })),
          "data-role": "show-more",
          class: vue.normalizeClass($props.hiddenIsVisible ? "state-open" : "")
        }, null, 2)) : vue.createCommentVNode("", true),
        _ctx.column && _ctx.column.key && $props.emptyColumns.indexOf(_ctx.column.key) === -1 && (!_ctx.column.colspan || $options.getHorizontalColSpan(_ctx.column, $props.item) > 0) ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 3 }, vue.renderList($props.visibleColumns, (column) => {
          return vue.openBlock(), vue.createElementBlock("td", {
            onClick: ($event) => _ctx.$emit("click", { $event, item: $props.item, column }),
            "data-column": column.key,
            colspan: $options.getHorizontalColSpan(column, $props.item),
            title: column.formatter ? column.formatter($props.item[column.key], $props.item, column, $props.i) : $props.item[column.key]
          }, [
            !!_ctx.$slots[column.key] ? vue.renderSlot(_ctx.$slots, column.key, {
              key: 0,
              value: $props.item[column.key],
              item: $props.item,
              column,
              i: $props.i
            }) : $props.item ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
              vue.createTextVNode(vue.toDisplayString($options.getColumnDisplayContent(column, $props.item, $props.i)), 1)
            ], 64)) : vue.createCommentVNode("", true)
          ], 8, _hoisted_4$1);
        }), 256)) : vue.createCommentVNode("", true)
      ], 8, _hoisted_1$1),
      $props.hiddenColumns.length > 0 ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("tr", _hoisted_5$1, [
        vue.createElementVNode("td", { colspan: $props.hiddenColumns }, [
          vue.createElementVNode("table", null, [
            vue.createElementVNode("tr", null, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.hiddenColumns, (column) => {
                return vue.openBlock(), vue.createElementBlock("th", {
                  "data-column": column.key
                }, [
                  vue.createElementVNode("div", null, vue.toDisplayString(column.label), 1)
                ], 8, _hoisted_7$1);
              }), 256))
            ]),
            vue.createElementVNode("tr", { "data-i": $props.i }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.hiddenColumns, (column, i) => {
                return vue.openBlock(), vue.createElementBlock("td", {
                  onClick: ($event) => _ctx.$emit("click", { $event, item: $props.item, column }),
                  "data-column": column.key,
                  title: column.formatter ? column.formatter($props.item[column.key], $props.item, column, i) : $props.item[column.key]
                }, [
                  !!_ctx.$slots[column.key] ? vue.renderSlot(_ctx.$slots, column.key, {
                    key: 0,
                    value: $props.item[column.key],
                    item: $props.item,
                    column,
                    i
                  }) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                    vue.createTextVNode(vue.toDisplayString($options.getColumnDisplayContent(column, $props.item, i)), 1)
                  ], 64))
                ], 8, _hoisted_9$1);
              }), 256))
            ], 8, _hoisted_8$1)
          ])
        ], 8, _hoisted_6$1)
      ], 512)), [
        [vue.vShow, $props.hiddenIsVisible]
      ]) : vue.createCommentVNode("", true)
    ], 64);
  }
  const LktTableRow = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
  const _sfc_main = vue.defineComponent({
    name: "LktTable",
    components: { LktTableRow, draggable },
    props: {
      value: { type: Array, default() {
        return [];
      } },
      columns: { type: Array, default() {
        return [];
      } },
      sorter: { type: Function },
      sortable: { type: Boolean, default: false },
      hideEmptyColumns: { type: Boolean, default: false },
      draggableChecker: { type: Function, default: (item) => true },
      checkValidDrag: { type: Function, default: (evt) => true }
    },
    emits: ["input", "sort"],
    data() {
      let Sorter = lktTools.isFunction(this.sorter) ? this.sorter : defaultTableSorter;
      return {
        Sorter,
        SortBy: "",
        SortDirection: "asc",
        Items: this.value,
        Items2: [1, 2, 3],
        Hidden: {},
        drag: false,
        dragGroup: lktTools.generateRandomString(16),
        ready: false,
        input: "",
        uniqueId: lktTools.generateRandomString(12)
      };
    },
    computed: {
      hasData() {
        return this.Items.length > 0;
      },
      emptyColumns() {
        if (!this.hideEmptyColumns) {
          return [];
        }
        let r = [];
        this.columns.forEach((column) => {
          let key = column.key;
          let ok = false;
          this.Items.forEach((item) => {
            if (lktTools.isFunction(item.checkEmpty)) {
              return item.checkEmpty(item);
            }
            if (item[key]) {
              ok = true;
            }
          });
          if (!ok) {
            r.push(key);
          }
        });
        return r;
      },
      VisibleColumns() {
        return this.columns.filter((c) => c.hidden !== true);
      },
      HiddenColumns() {
        return this.columns.filter((c) => c.hidden === true);
      },
      HiddenColumnsColSpan() {
        let r = this.VisibleColumns.length + 1;
        if (this.sortable) {
          ++r;
        }
        return r;
      }
    },
    watch: {},
    methods: {
      getItemByEvent(e) {
        let t = e.target;
        if (lktTools.isUndefined(t.dataset.column)) {
          do {
            t = t.parentNode;
          } while (lktTools.isUndefined(t.dataset.column) && t.tagName !== "TABLE" && t.tagName !== "body");
        }
        if (t.tagName === "TD") {
          t = t.parentNode;
          t = t.dataset.i;
          if (!lktTools.isUndefined(t)) {
            return this.Items[t];
          }
        }
        return void 0;
      },
      getVerticalColSpan(column) {
        if (!column.colspan) {
          return false;
        }
        let max = this.columns.length;
        this.Items.forEach((item) => {
          let i = this.getHorizontalColSpan(column, item);
          if (i > 0 && i < max) {
            max = i;
          }
        });
        return max;
      },
      getHorizontalColSpan(column, item) {
        if (!column.colspan) {
          return false;
        }
        if (typeof column.colspan === "function") {
          return column.colspan(item);
        }
        return column.colspan;
      },
      sort(column) {
        if (column.sortable === true) {
          this.Items = this.Items.sort((a, b) => {
            return this.Sorter(a, b, column, this.SortDirection);
          });
          this.SortDirection = this.SortDirection === "asc" ? "desc" : "asc";
          this.SortBy = column.key;
          this.$emit("sort", [this.SortBy, this.SortDirection]);
        }
      },
      click(e, item, column) {
        this.$emit("click", {
          event: e,
          item,
          column
        });
      },
      show(e, i) {
        let k = "tr_" + i;
        this.Hidden[k] = lktTools.isUndefined(this.Hidden[k]) ? true : !this.Hidden[k];
      }
    },
    mounted() {
    }
  });
  const _hoisted_1 = /* @__PURE__ */ vue.createElementVNode("h1", null, "Table", -1);
  const _hoisted_2 = /* @__PURE__ */ vue.createElementVNode("li", null, "list start", -1);
  const _hoisted_3 = /* @__PURE__ */ vue.createElementVNode("li", null, "list finish", -1);
  const _hoisted_4 = ["data-sortable"];
  const _hoisted_5 = {
    key: 0,
    "data-role": "drag-indicator"
  };
  const _hoisted_6 = { key: 1 };
  const _hoisted_7 = ["data-column", "data-sortable", "data-sort", "colspan", "title"];
  const _hoisted_8 = { key: 1 };
  const _hoisted_9 = {
    key: 1,
    "data-lkt": "empty-table"
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_lkt_table_row = vue.resolveComponent("lkt-table-row");
    const _component_draggable = vue.resolveComponent("draggable");
    const _component_LktTableRow = vue.resolveComponent("LktTableRow");
    return vue.openBlock(), vue.createElementBlock("div", null, [
      _hoisted_1,
      vue.withDirectives(vue.createElementVNode("input", {
        type: "text",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.input = $event)
      }, null, 512), [
        [vue.vModelText, _ctx.input]
      ]),
      vue.createElementVNode("ul", null, [
        _hoisted_2,
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.value, (item, i) => {
          return vue.openBlock(), vue.createElementBlock("li", {
            key: _ctx.uniqueId + "_" + i
          }, vue.toDisplayString(item), 1);
        }), 128)),
        _hoisted_3
      ]),
      _ctx.hasData ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 0,
        "data-lkt": "table",
        "data-sortable": _ctx.sortable
      }, [
        vue.createElementVNode("table", null, [
          vue.createElementVNode("thead", null, [
            vue.createElementVNode("tr", null, [
              _ctx.sortable ? (vue.openBlock(), vue.createElementBlock("th", _hoisted_5)) : vue.createCommentVNode("", true),
              _ctx.HiddenColumns.length > 0 ? (vue.openBlock(), vue.createElementBlock("th", _hoisted_6)) : vue.createCommentVNode("", true),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.VisibleColumns, (column) => {
                return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
                  _ctx.emptyColumns.indexOf(column.key) === -1 ? (vue.openBlock(), vue.createElementBlock("th", {
                    key: 0,
                    "data-column": column.key,
                    "data-sortable": column.sortable === true,
                    "data-sort": column.sortable === true && _ctx.SortBy === column.key ? _ctx.SortDirection : "",
                    colspan: _ctx.getVerticalColSpan(column),
                    title: column.label
                  }, [
                    vue.createElementVNode("div", null, vue.toDisplayString(column.label), 1)
                  ], 8, _hoisted_7)) : vue.createCommentVNode("", true)
                ], 64);
              }), 256))
            ])
          ]),
          _ctx.sortable ? (vue.openBlock(), vue.createBlock(_component_draggable, {
            key: 0,
            modelValue: _ctx.Items,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.Items = $event),
            group: _ctx.dragGroup,
            onStart: _cache[2] || (_cache[2] = ($event) => _ctx.drag = true),
            onEnd: _cache[3] || (_cache[3] = ($event) => _ctx.drag = false),
            tag: "tbody",
            "data-lkt": "sortable-table",
            handle: "[data-handle-drag]",
            move: _ctx.checkValidDrag
          }, {
            default: vue.withCtx(() => [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.Items, (item, i) => {
                return vue.openBlock(), vue.createBlock(_component_lkt_table_row, {
                  i,
                  item,
                  "hidden-columns": _ctx.HiddenColumns,
                  "is-draggable": _ctx.draggableChecker ? _ctx.draggableChecker(item) : true,
                  "visible-columns": _ctx.VisibleColumns,
                  "empty-columns": _ctx.emptyColumns,
                  "hidden-is-visible": _ctx.Hidden["tr_" + i] === true
                }, null, 8, ["i", "item", "hidden-columns", "is-draggable", "visible-columns", "empty-columns", "hidden-is-visible"]);
              }), 256))
            ]),
            _: 1
          }, 8, ["modelValue", "group", "move"])) : (vue.openBlock(), vue.createElementBlock("tbody", _hoisted_8, [
            vue.createElementVNode("tr", null, [
              vue.createElementVNode("td", null, vue.toDisplayString(_ctx.Items), 1)
            ]),
            vue.createElementVNode("tr", null, [
              vue.createElementVNode("td", null, vue.toDisplayString(_ctx.Items2), 1)
            ]),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.Items2, (item, i) => {
              return vue.openBlock(), vue.createElementBlock("tr", {
                key: _ctx.uniqueId + "_" + i
              }, [
                vue.createElementVNode("td", null, vue.toDisplayString(item), 1)
              ]);
            }), 128)),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.Items, (item, i) => {
              return vue.openBlock(), vue.createBlock(_component_LktTableRow, {
                i,
                item,
                "hidden-columns": _ctx.HiddenColumns,
                "is-draggable": _ctx.draggableChecker ? _ctx.draggableChecker(item) : true,
                "visible-columns": _ctx.VisibleColumns,
                "empty-columns": _ctx.emptyColumns,
                "hidden-is-visible": _ctx.Hidden["tr_" + i] === true
              }, null, 8, ["i", "item", "hidden-columns", "is-draggable", "visible-columns", "empty-columns", "hidden-is-visible"]);
            }), 256))
          ]))
        ])
      ], 8, _hoisted_4)) : !!_ctx.$slots["no-items"] ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9, [
        vue.renderSlot(_ctx.$slots, "no-items")
      ])) : vue.createCommentVNode("", true)
    ]);
  }
  const table = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
  const LktTable = {
    install: (app, options) => {
      app.component("LktTable", table);
    }
  };
  exports2.createLktTableColumn = createLktTableColumn;
  exports2.default = LktTable;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
