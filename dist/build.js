import { defineComponent as we, computed as r, ref as D, shallowReactive as la, watch as q, watchEffect as Zt, onMounted as ua, onBeforeUnmount as Za, reactive as _t, provide as Ba, h as Z, inject as Et, getCurrentInstance as _a, onUnmounted as el, onUpdated as tl, useId as al, cloneVNode as ll, resolveComponent as ce, unref as m, openBlock as s, createBlock as R, mergeProps as K, withCtx as H, createTextVNode as _e, toDisplayString as et, normalizeProps as me, createElementBlock as h, normalizeClass as Y, Fragment as P, renderList as de, useSlots as Ea, createElementVNode as ge, createCommentVNode as A, createVNode as Ce, resolveDynamicComponent as ye, renderSlot as O, guardReactiveProps as Aa, nextTick as jt, withDirectives as Je, vShow as Qe, createSlots as nl, normalizeStyle as ka, mergeDefaults as il } from "vue";
import { __ as ol } from "lkt-i18n";
import { ColumnType as Ae, FieldType as Ze, MultipleOptionsDisplay as ul, SortDirection as tt, Column as xa, extractPropValue as rl, TableRowType as xe, extractI18nValue as na, LktSettings as Ee, ensureButtonConfig as ze, TablePermission as Le, PaginatorType as Be, TableType as Me, getDefaultValues as sl, Table as dl, ButtonType as ea } from "lkt-vue-kernel";
import { Column as Fn, createColumn as Un } from "lkt-vue-kernel";
import { generateRandomString as cl, replaceAll as vl } from "lkt-string-tools";
import { DataState as fl } from "lkt-data-state";
import ml from "sortablejs";
import { date as gl, findOldestAndNewestDateInObjects as yl, time as pl } from "lkt-date-tools";
/**
 * Vue 3 Carousel 0.14.0
 * (c) 2025
 * @license MIT
 */
const Va = ["viewport", "carousel"], qt = {
  "bottom-to-top": "btt",
  "left-to-right": "ltr",
  "right-to-left": "rtl",
  "top-to-bottom": "ttb"
}, Ra = [
  "ltr",
  "left-to-right",
  "rtl",
  "right-to-left",
  "ttb",
  "top-to-bottom",
  "btt",
  "bottom-to-top"
], bl = {
  ariaGallery: "Gallery",
  ariaNavigateToPage: "Navigate to page {slideNumber}",
  ariaNavigateToSlide: "Navigate to slide {slideNumber}",
  ariaNextSlide: "Navigate to next slide",
  ariaPreviousSlide: "Navigate to previous slide",
  iconArrowDown: "Arrow pointing downwards",
  iconArrowLeft: "Arrow pointing to the left",
  iconArrowRight: "Arrow pointing to the right",
  iconArrowUp: "Arrow pointing upwards",
  itemXofY: "Item {currentSlide} of {slidesCount}"
}, La = ["slide", "fade"], Ma = [
  "center",
  "start",
  "end",
  "center-even",
  "center-odd"
], X = {
  autoplay: 0,
  breakpointMode: Va[0],
  breakpoints: void 0,
  dir: Ra[0],
  enabled: !0,
  gap: 0,
  height: "auto",
  i18n: bl,
  ignoreAnimations: !1,
  itemsToScroll: 1,
  itemsToShow: 1,
  modelValue: 0,
  mouseDrag: !0,
  pauseAutoplayOnHover: !1,
  preventExcessiveDragging: !1,
  slideEffect: La[0],
  snapAlign: Ma[0],
  touchDrag: !0,
  transition: 300,
  wrapAround: !1
}, at = Symbol("carousel"), hl = (e) => {
  const o = la([]), i = (n) => {
    n !== void 0 ? o.slice(n).forEach((l, t) => {
      var p;
      (p = l.exposed) === null || p === void 0 || p.setIndex(n + t);
    }) : o.forEach((l, t) => {
      var p;
      (p = l.exposed) === null || p === void 0 || p.setIndex(t);
    });
  };
  return {
    cleanup: () => {
      o.splice(0, o.length);
    },
    getSlides: () => o,
    registerSlide: (n, l) => {
      if (!n || n.props.isClone)
        return;
      const t = l ?? o.length;
      o.splice(t, 0, n), i(t), e("slide-registered", { slide: n, index: t });
    },
    unregisterSlide: (n) => {
      const l = o.indexOf(n);
      l !== -1 && (e("slide-unregistered", { slide: n, index: l }), o.splice(l, 1), i(l));
    }
  };
};
function kl(e) {
  return e.length === 0 ? 0 : e.reduce((i, n) => i + n, 0) / e.length;
}
function Ca({ slides: e, position: o, toShow: i }) {
  const n = [], l = o === "before", t = l ? -i : 0, p = l ? 0 : i;
  if (e.length <= 0)
    return n;
  for (let k = t; k < p; k++) {
    const d = {
      index: l ? k : k + e.length,
      isClone: !0,
      position: o,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${o}-${k}`
    }, S = e[(k % e.length + e.length) % e.length].vnode, B = ll(S, d);
    B.el = null, n.push(B);
  }
  return n;
}
const Cl = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function Sa(e) {
  if (!e.el || !(e.el instanceof Element))
    return;
  const o = e.el.querySelectorAll(Cl);
  for (const i of o)
    i instanceof HTMLElement && !i.hasAttribute("disabled") && i.getAttribute("aria-hidden") !== "true" && i.setAttribute("tabindex", "-1");
}
function Sl(e, o) {
  return Object.keys(e).filter((i) => !o.includes(i)).reduce((i, n) => (i[n] = e[n], i), {});
}
function wl(e) {
  const { isVertical: o, isReversed: i, dragged: n, effectiveSlideSize: l } = e, t = o ? n.y : n.x;
  if (t === 0)
    return 0;
  const p = Math.round(t / l);
  return i ? p : -p;
}
function Ne({ val: e, max: o, min: i }) {
  return o < i ? e : Math.min(Math.max(e, isNaN(i) ? e : i), isNaN(o) ? e : o);
}
function Dl(e) {
  const { transform: o } = window.getComputedStyle(e);
  return o.split(/[(,)]/).slice(1, -1).map((i) => parseFloat(i));
}
function Il(e) {
  let o = 1, i = 1;
  return e.forEach((n) => {
    const l = Dl(n);
    l.length === 6 && (o /= l[0], i /= l[3]);
  }), { widthMultiplier: o, heightMultiplier: i };
}
function Tl(e, o) {
  switch (e) {
    case "start":
      return 0;
    case "center":
    case "center-odd":
      return (o - 1) / 2;
    case "center-even":
      return (o - 2) / 2;
    case "end":
      return o - 1;
    default:
      return 0;
  }
}
function Bl(e, o, i) {
  switch (e) {
    case "start":
      return 0;
    case "center":
    case "center-odd":
      return (i - o) / 2;
    case "center-even":
      return i / 2 - o;
    case "end":
      return i - o;
    default:
      return 0;
  }
}
function ia({ slideSize: e, viewportSize: o, align: i, itemsToShow: n }) {
  return n !== void 0 ? Tl(i, n) : e !== void 0 && o !== void 0 ? Bl(i, e, o) : 0;
}
function Na(e = "", o = {}) {
  return Object.entries(o).reduce((i, [n, l]) => i.replace(`{${n}}`, String(l)), e);
}
function Oa({ val: e, max: o, min: i = 0 }) {
  const n = o - i + 1;
  return ((e - i) % n + n) % n + i;
}
function ta(e, o = 0) {
  let i = !1, n = 0, l = null;
  function t(...p) {
    if (i)
      return;
    i = !0;
    const k = () => {
      l = requestAnimationFrame((I) => {
        I - n > o ? (n = I, e(...p), i = !1) : k();
      });
    };
    k();
  }
  return t.cancel = () => {
    l && (cancelAnimationFrame(l), l = null, i = !1);
  }, t;
}
function zt(e, o = "px") {
  if (!(e == null || e === ""))
    return typeof e == "number" || parseFloat(e).toString() === e ? `${e}${o}` : e;
}
const El = we({
  name: "CarouselAria",
  setup() {
    const e = Et(at);
    return e ? () => Z("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, Na(e.config.i18n.itemXofY, {
      currentSlide: e.currentSlide + 1,
      slidesCount: e.slidesCount
    })) : () => "";
  }
}), Al = {
  // time to auto advance slides in ms
  autoplay: {
    default: X.autoplay,
    type: Number
  },
  // an object to store breakpoints
  breakpoints: {
    default: X.breakpoints,
    type: Object
  },
  // controls the breakpoint mode relative to the carousel container or the viewport
  breakpointMode: {
    default: X.breakpointMode,
    validator(e) {
      return Va.includes(e);
    }
  },
  // enable/disable the carousel component
  enabled: {
    default: X.enabled,
    type: Boolean
  },
  // control the gap between slides
  gap: {
    default: X.gap,
    type: Number
  },
  // control the gap between slides
  height: {
    default: X.height,
    type: [Number, String]
  },
  ignoreAnimations: {
    default: !1,
    type: [Array, Boolean, String]
  },
  // count of items to be scrolled
  itemsToScroll: {
    default: X.itemsToScroll,
    type: Number
  },
  // count of items to showed per view
  itemsToShow: {
    default: X.itemsToShow,
    type: [Number, String]
  },
  // aria-labels and additional text labels
  i18n: {
    default: X.i18n,
    type: Object
  },
  // slide number number of initial slide
  modelValue: {
    default: void 0,
    type: Number
  },
  // toggle mouse dragging.
  mouseDrag: {
    default: X.mouseDrag,
    type: Boolean
  },
  // toggle mouse dragging.
  touchDrag: {
    default: X.touchDrag,
    type: Boolean
  },
  pauseAutoplayOnHover: {
    default: X.pauseAutoplayOnHover,
    type: Boolean
  },
  preventExcessiveDragging: {
    default: !1,
    type: Boolean,
    validator(e, o) {
      return e && o.wrapAround && console.warn('[vue3-carousel warn]: "preventExcessiveDragging" cannot be used with wrapAround. The setting will be ignored.'), !0;
    }
  },
  // control snap position alignment
  snapAlign: {
    default: X.snapAlign,
    validator(e) {
      return Ma.includes(e);
    }
  },
  slideEffect: {
    type: String,
    default: X.slideEffect,
    validator(e) {
      return La.includes(e);
    }
  },
  // sliding transition time in ms
  transition: {
    default: X.transition,
    type: Number
  },
  // control the gap between slides
  dir: {
    type: String,
    default: X.dir,
    validator(e, o) {
      if (!Ra.includes(e))
        return !1;
      const i = e in qt ? qt[e] : e;
      return ["ttb", "btt"].includes(i) && (!o.height || o.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${e}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: X.wrapAround,
    type: Boolean
  }
}, xl = we({
  name: "VueCarousel",
  props: Al,
  emits: [
    "before-init",
    "drag",
    "init",
    "loop",
    "slide-end",
    "slide-registered",
    "slide-start",
    "slide-unregistered",
    "update:modelValue"
  ],
  setup(e, { slots: o, emit: i, expose: n }) {
    var l;
    const t = hl(i), p = t.getSlides(), k = r(() => p.length), I = D(null), d = D(null), S = D(0), B = r(() => Object.assign(Object.assign(Object.assign({}, X), Sl(e, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, X.i18n), e.i18n) })), v = la(Object.assign({}, B.value)), E = D((l = e.modelValue) !== null && l !== void 0 ? l : 0), C = D(E.value);
    q(E, (c) => C.value = c);
    const $ = D(0), F = r(() => Math.ceil((k.value - 1) / 2)), pe = r(() => k.value - 1), be = r(() => 0);
    let he = null, ke = null, J = null;
    const g = r(() => S.value + v.gap), U = r(() => {
      const c = v.dir || "ltr";
      return c in qt ? qt[c] : c;
    }), ue = r(() => ["rtl", "btt"].includes(U.value)), w = r(() => ["ttb", "btt"].includes(U.value)), G = r(() => v.itemsToShow === "auto"), W = r(() => w.value ? "height" : "width");
    function $e() {
      var c;
      if (!nt.value)
        return;
      const y = (B.value.breakpointMode === "carousel" ? (c = I.value) === null || c === void 0 ? void 0 : c.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, T = Object.keys(e.breakpoints || {}).map((N) => Number(N)).sort((N, ae) => +ae - +N), x = {};
      T.some((N) => y >= N ? (Object.assign(x, e.breakpoints[N]), x.i18n && Object.assign(x.i18n, B.value.i18n, e.breakpoints[N].i18n), !0) : !1), Object.assign(v, B.value, x);
    }
    const At = ta(() => {
      $e(), lt(), ve();
    }), Ve = la(/* @__PURE__ */ new Set()), _ = D([]);
    function le({ widthMultiplier: c, heightMultiplier: y }) {
      _.value = p.map((T) => {
        var x;
        const N = (x = T.exposed) === null || x === void 0 ? void 0 : x.getBoundingRect();
        return {
          width: N.width * c,
          height: N.height * y
        };
      });
    }
    const De = D({
      width: 0,
      height: 0
    });
    function xt({ widthMultiplier: c, heightMultiplier: y }) {
      var T;
      const x = ((T = d.value) === null || T === void 0 ? void 0 : T.getBoundingClientRect()) || { width: 0, height: 0 };
      De.value = {
        width: x.width * c,
        height: x.height * y
      };
    }
    function ve() {
      if (!d.value)
        return;
      const c = Il(Ve);
      if (xt(c), le(c), G.value)
        S.value = kl(_.value.map((y) => y[W.value]));
      else {
        const y = Number(v.itemsToShow), T = (y - 1) * v.gap;
        S.value = (De.value[W.value] - T) / y;
      }
    }
    function lt() {
      !v.wrapAround && k.value > 0 && (E.value = Ne({
        val: E.value,
        max: pe.value,
        min: be.value
      })), G.value || (v.itemsToShow = Ne({
        val: Number(v.itemsToShow),
        max: k.value,
        min: 1
      }));
    }
    const Ie = r(() => typeof e.ignoreAnimations == "string" ? e.ignoreAnimations.split(",") : Array.isArray(e.ignoreAnimations) ? e.ignoreAnimations : e.ignoreAnimations ? !1 : []);
    Zt(() => lt()), Zt(() => {
      ve();
    });
    let Fe;
    const Vt = (c) => {
      const y = c.target;
      if (!(!(y != null && y.contains(I.value)) || Array.isArray(Ie.value) && Ie.value.includes(c.animationName)) && (Ve.add(y), !Fe)) {
        const T = () => {
          Fe = requestAnimationFrame(() => {
            ve(), T();
          });
        };
        T();
      }
    }, Rt = (c) => {
      const y = c.target;
      y && Ve.delete(y), Fe && Ve.size === 0 && (cancelAnimationFrame(Fe), ve());
    }, nt = D(!1);
    typeof document < "u" && Zt(() => {
      nt.value && Ie.value !== !1 ? (document.addEventListener("animationstart", Vt), document.addEventListener("animationend", Rt)) : (document.removeEventListener("animationstart", Vt), document.removeEventListener("animationend", Rt));
    }), ua(() => {
      nt.value = !0, $e(), Nt(), I.value && (J = new ResizeObserver(At), J.observe(I.value)), i("init");
    }), Za(() => {
      nt.value = !1, t.cleanup(), ke && clearTimeout(ke), Fe && cancelAnimationFrame(Fe), he && clearInterval(he), J && (J.disconnect(), J = null), typeof document < "u" && Ue(), I.value && (I.value.removeEventListener("transitionend", ve), I.value.removeEventListener("animationiteration", ve));
    });
    let ee = !1;
    const Ge = { x: 0, y: 0 }, ne = _t({ x: 0, y: 0 }), it = D(!1), yt = D(!1), Kt = () => {
      it.value = !0;
    }, Xt = () => {
      it.value = !1;
    }, ot = ta((c) => {
      if (!c.ctrlKey)
        switch (c.key) {
          case "ArrowLeft":
          case "ArrowUp":
            w.value === c.key.endsWith("Up") && (ue.value ? Q(!0) : dt(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            w.value === c.key.endsWith("Down") && (ue.value ? dt(!0) : Q(!0));
            break;
        }
    }, 200), Yt = () => {
      document.addEventListener("keydown", ot);
    }, Ue = () => {
      document.removeEventListener("keydown", ot);
    };
    function Lt(c) {
      const y = c.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(y) || te.value || (ee = c.type === "touchstart", !ee && (c.preventDefault(), c.button !== 0)))
        return;
      Ge.x = "touches" in c ? c.touches[0].clientX : c.clientX, Ge.y = "touches" in c ? c.touches[0].clientY : c.clientY;
      const T = ee ? "touchmove" : "mousemove", x = ee ? "touchend" : "mouseup";
      document.addEventListener(T, ut, { passive: !1 }), document.addEventListener(x, Mt, { passive: !0 });
    }
    const ut = ta((c) => {
      yt.value = !0;
      const y = "touches" in c ? c.touches[0].clientX : c.clientX, T = "touches" in c ? c.touches[0].clientY : c.clientY;
      ne.x = y - Ge.x, ne.y = T - Ge.y;
      const x = wl({
        isVertical: w.value,
        isReversed: ue.value,
        dragged: ne,
        effectiveSlideSize: g.value
      });
      C.value = v.wrapAround ? E.value + x : Ne({
        val: E.value + x,
        max: pe.value,
        min: be.value
      }), i("drag", { deltaX: ne.x, deltaY: ne.y });
    });
    function Mt() {
      if (ut.cancel(), C.value !== E.value && !ee) {
        const T = (x) => {
          x.preventDefault(), window.removeEventListener("click", T);
        };
        window.addEventListener("click", T);
      }
      fe(C.value), ne.x = 0, ne.y = 0, yt.value = !1;
      const c = ee ? "touchmove" : "mousemove", y = ee ? "touchend" : "mouseup";
      document.removeEventListener(c, ut), document.removeEventListener(y, Mt);
    }
    function Nt() {
      !v.autoplay || v.autoplay <= 0 || (he = setInterval(() => {
        v.pauseAutoplayOnHover && it.value || Q();
      }, v.autoplay));
    }
    function rt() {
      he && (clearInterval(he), he = null);
    }
    function st() {
      rt(), Nt();
    }
    const te = D(!1);
    function fe(c, y = !1) {
      if (!y && te.value)
        return;
      let T = c, x = c;
      $.value = E.value, v.wrapAround ? x = Oa({
        val: T,
        max: pe.value,
        min: be.value
      }) : T = Ne({
        val: T,
        max: pe.value,
        min: be.value
      }), i("slide-start", {
        slidingToIndex: c,
        currentSlideIndex: E.value,
        prevSlideIndex: $.value,
        slidesCount: k.value
      }), rt(), te.value = !0, E.value = T, x !== T && bt.pause(), i("update:modelValue", x), ke = setTimeout(() => {
        v.wrapAround && x !== T && (bt.resume(), E.value = x, i("loop", {
          currentSlideIndex: E.value,
          slidingToIndex: c
        })), i("slide-end", {
          currentSlideIndex: E.value,
          prevSlideIndex: $.value,
          slidesCount: k.value
        }), te.value = !1, st();
      }, v.transition);
    }
    function Q(c = !1) {
      fe(E.value + v.itemsToScroll, c);
    }
    function dt(c = !1) {
      fe(E.value - v.itemsToScroll, c);
    }
    function pt() {
      $e(), lt(), ve(), st();
    }
    q(() => [B.value, e.breakpoints], () => $e(), { deep: !0 }), q(() => e.autoplay, () => st());
    const bt = q(() => e.modelValue, (c) => {
      c !== E.value && fe(Number(c), !0);
    });
    i("before-init");
    const Re = r(() => {
      if (!v.wrapAround)
        return { before: 0, after: 0 };
      if (G.value)
        return { before: p.length, after: p.length };
      const c = Number(v.itemsToShow), y = Math.ceil(c + (v.itemsToScroll - 1)), T = y - C.value, x = y - (k.value - (C.value + 1));
      return {
        before: Math.max(0, T),
        after: Math.max(0, x)
      };
    }), He = r(() => Re.value.before ? G.value ? _.value.slice(-1 * Re.value.before).reduce((c, y) => c + y[W.value] + v.gap, 0) * -1 : Re.value.before * g.value * -1 : 0), ie = r(() => {
      var c;
      if (G.value) {
        const y = (E.value % p.length + p.length) % p.length;
        return ia({
          slideSize: (c = _.value[y]) === null || c === void 0 ? void 0 : c[W.value],
          viewportSize: De.value[W.value],
          align: v.snapAlign
        });
      }
      return ia({
        align: v.snapAlign,
        itemsToShow: +v.itemsToShow
      });
    }), ct = r(() => {
      let c = 0;
      if (G.value) {
        if (E.value < 0 ? c = _.value.slice(E.value).reduce((y, T) => y + T[W.value] + v.gap, 0) * -1 : c = _.value.slice(0, E.value).reduce((y, T) => y + T[W.value] + v.gap, 0), c -= ie.value, !v.wrapAround) {
          const y = _.value.reduce((T, x) => T + x[W.value] + v.gap, 0) - De.value[W.value] - v.gap;
          c = Ne({
            val: c,
            max: y,
            min: 0
          });
        }
      } else {
        let y = E.value - ie.value;
        v.wrapAround || (y = Ne({
          val: y,
          max: k.value - +v.itemsToShow,
          min: 0
        })), c = y * g.value;
      }
      return c * (ue.value ? 1 : -1);
    }), ht = r(() => {
      var c, y;
      if (!G.value) {
        const N = E.value - ie.value;
        return v.wrapAround ? {
          min: Math.floor(N),
          max: Math.ceil(N + Number(v.itemsToShow) - 1)
        } : {
          min: Math.floor(Ne({
            val: N,
            max: k.value - Number(v.itemsToShow),
            min: 0
          })),
          max: Math.ceil(Ne({
            val: N + Number(v.itemsToShow) - 1,
            max: k.value - 1,
            min: 0
          }))
        };
      }
      let T = 0;
      {
        let N = 0, ae = 0 - Re.value.before;
        const re = Math.abs(ct.value + He.value);
        for (; N <= re; ) {
          const se = (ae % p.length + p.length) % p.length;
          N += ((c = _.value[se]) === null || c === void 0 ? void 0 : c[W.value]) + v.gap, ae++;
        }
        T = ae - 1;
      }
      let x = 0;
      {
        let N = T, ae = 0;
        for (N < 0 ? ae = _.value.slice(0, N).reduce((re, se) => re + se[W.value] + v.gap, 0) - Math.abs(ct.value + He.value) : ae = _.value.slice(0, N).reduce((re, se) => re + se[W.value] + v.gap, 0) - Math.abs(ct.value); ae < De.value[W.value]; ) {
          const re = (N % p.length + p.length) % p.length;
          ae += ((y = _.value[re]) === null || y === void 0 ? void 0 : y[W.value]) + v.gap, N++;
        }
        x = N - 1;
      }
      return {
        min: Math.floor(T),
        max: Math.ceil(x)
      };
    }), Wt = r(() => {
      if (v.slideEffect === "fade")
        return;
      const c = w.value ? "Y" : "X", y = w.value ? ne.y : ne.x;
      let T = ct.value + y;
      if (!v.wrapAround && v.preventExcessiveDragging) {
        let x = 0;
        G.value ? x = _.value.reduce((re, se) => re + se[W.value], 0) : x = (k.value - Number(v.itemsToShow)) * g.value;
        const N = ue.value ? 0 : -1 * x, ae = ue.value ? x : 0;
        T = Ne({
          val: T,
          min: N,
          max: ae
        });
      }
      return `translate${c}(${T}px)`;
    }), qe = r(() => ({
      "--vc-transition-duration": te.value ? zt(v.transition, "ms") : void 0,
      "--vc-slide-gap": zt(v.gap),
      "--vc-carousel-height": zt(v.height),
      "--vc-cloned-offset": zt(He.value)
    })), vt = { slideTo: fe, next: Q, prev: dt }, Ot = _t({
      activeSlide: C,
      config: v,
      currentSlide: E,
      isSliding: te,
      isVertical: w,
      maxSlide: pe,
      minSlide: be,
      nav: vt,
      normalizedDir: U,
      slideRegistry: t,
      slideSize: S,
      slides: p,
      slidesCount: k,
      viewport: d,
      visibleRange: ht
    });
    Ba(at, Ot);
    const ft = _t({
      config: v,
      currentSlide: E,
      maxSlide: pe,
      middleSlide: F,
      minSlide: be,
      slideSize: S,
      slidesCount: k
    });
    return n({
      data: ft,
      nav: vt,
      next: Q,
      prev: dt,
      restartCarousel: pt,
      slideTo: fe,
      updateBreakpointsConfig: $e,
      updateSlideSize: ve,
      updateSlidesData: lt
    }), () => {
      var c;
      const y = o.default || o.slides, T = (y == null ? void 0 : y(ft)) || [], { before: x, after: N } = Re.value, ae = Ca({
        slides: p,
        position: "before",
        toShow: x
      }), re = Ca({
        slides: p,
        position: "after",
        toShow: N
      }), se = [...ae, ...T, ...re];
      if (!v.enabled || !se.length)
        return Z("section", {
          ref: I,
          class: ["carousel", "is-disabled"]
        }, se);
      const Ke = ((c = o.addons) === null || c === void 0 ? void 0 : c.call(o, ft)) || [], Xe = Z("ol", {
        class: "carousel__track",
        style: { transform: Wt.value },
        onMousedownCapture: v.mouseDrag ? Lt : null,
        onTouchstartPassiveCapture: v.touchDrag ? Lt : null
      }, se), mt = Z("div", { class: "carousel__viewport", ref: d }, Xe);
      return Z("section", {
        ref: I,
        class: [
          "carousel",
          `is-${U.value}`,
          `is-effect-${v.slideEffect}`,
          {
            "is-vertical": w.value,
            "is-sliding": te.value,
            "is-dragging": yt.value,
            "is-hover": it.value
          }
        ],
        dir: U.value,
        style: qe.value,
        "aria-label": v.i18n.ariaGallery,
        tabindex: "0",
        onFocus: Yt,
        onBlur: Ue,
        onMouseenter: Kt,
        onMouseleave: Xt
      }, [mt, Ke, Z(El)]);
    };
  }
});
var oa;
(function(e) {
  e.arrowDown = "arrowDown", e.arrowLeft = "arrowLeft", e.arrowRight = "arrowRight", e.arrowUp = "arrowUp";
})(oa || (oa = {}));
const wa = (e) => `icon${e.charAt(0).toUpperCase() + e.slice(1)}`, Vl = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function Rl(e) {
  return e in oa;
}
const Da = (e) => e && Rl(e), Ia = we({
  props: {
    name: {
      type: String,
      required: !0,
      validator: Da
    },
    title: {
      type: String,
      default: (e) => e.name ? X.i18n[wa(e.name)] : ""
    }
  },
  setup(e) {
    const o = Et(at, null);
    return () => {
      const i = e.name;
      if (!i || !Da(i))
        return;
      const n = Vl[i], l = Z("path", { d: n }), t = (o == null ? void 0 : o.config.i18n[wa(i)]) || e.title, p = Z("title", t);
      return Z("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": t
      }, [p, l]);
    };
  }
}), Ll = we({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(e, { slots: o, attrs: i }) {
    const n = Et(at);
    if (!n)
      return () => "";
    const { next: l, prev: t } = o, p = () => ({
      btt: "arrowDown",
      ltr: "arrowLeft",
      rtl: "arrowRight",
      ttb: "arrowUp"
    })[n.normalizedDir], k = () => ({
      btt: "arrowUp",
      ltr: "arrowRight",
      rtl: "arrowLeft",
      ttb: "arrowDown"
    })[n.normalizedDir], I = r(() => !n.config.wrapAround && n.currentSlide <= n.minSlide), d = r(() => !n.config.wrapAround && n.currentSlide >= n.maxSlide);
    return () => {
      const { i18n: S } = n.config, B = Z("button", Object.assign(Object.assign({ type: "button", disabled: I.value, "aria-label": S.ariaPreviousSlide, title: S.ariaPreviousSlide, onClick: n.nav.prev }, i), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": I.value },
        i.class
      ] }), (t == null ? void 0 : t()) || Z(Ia, { name: p() })), v = Z("button", Object.assign(Object.assign({ type: "button", disabled: d.value, "aria-label": S.ariaNextSlide, title: S.ariaNextSlide, onClick: n.nav.next }, i), { class: [
        "carousel__next",
        { "carousel__next--disabled": d.value },
        i.class
      ] }), (l == null ? void 0 : l()) || Z(Ia, { name: k() }));
      return [B, v];
    };
  }
}), Ml = we({
  name: "CarouselPagination",
  props: {
    disableOnClick: {
      type: Boolean
    },
    paginateByItemsToShow: {
      type: Boolean
    }
  },
  setup(e) {
    const o = Et(at);
    if (!o)
      return () => "";
    const i = r(() => o.config.itemsToShow), n = r(() => ia({
      align: o.config.snapAlign,
      itemsToShow: i.value
    })), l = r(() => e.paginateByItemsToShow && i.value > 1), t = r(() => Math.ceil((o.activeSlide - n.value) / i.value)), p = r(() => Math.ceil(o.slidesCount / i.value)), k = (I) => Oa(l.value ? {
      val: t.value,
      max: p.value - 1,
      min: 0
    } : {
      val: o.activeSlide,
      max: o.maxSlide,
      min: o.minSlide
    }) === I;
    return () => {
      var I, d;
      const S = [];
      for (let B = l.value ? 0 : o.minSlide; B <= (l.value ? p.value - 1 : o.maxSlide); B++) {
        const v = Na(o.config.i18n[l.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: B + 1
        }), E = k(B), C = Z("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": E
          },
          "aria-label": v,
          "aria-pressed": E,
          "aria-controls": (d = (I = o.slides[B]) === null || I === void 0 ? void 0 : I.exposed) === null || d === void 0 ? void 0 : d.id,
          title: v,
          disabled: e.disableOnClick,
          onClick: () => o.nav.slideTo(l.value ? Math.floor(B * +o.config.itemsToShow + n.value) : B)
        }), $ = Z("li", { class: "carousel__pagination-item", key: B }, C);
        S.push($);
      }
      return Z("ol", { class: "carousel__pagination" }, S);
    };
  }
}), Ta = we({
  name: "CarouselSlide",
  props: {
    id: {
      type: String,
      default: (e) => e.isClone ? void 0 : al()
    },
    index: {
      type: Number,
      default: void 0
    },
    isClone: {
      type: Boolean,
      default: !1
    },
    position: {
      type: String,
      default: void 0
    }
  },
  setup(e, { attrs: o, slots: i, expose: n }) {
    const l = Et(at);
    if (Ba(at, void 0), !l)
      return () => "";
    const t = D(e.index), p = (C) => {
      t.value = C;
    }, k = _a(), I = () => {
      const C = k.vnode.el;
      return C ? C.getBoundingClientRect() : { width: 0, height: 0 };
    };
    n({
      id: e.id,
      setIndex: p,
      getBoundingRect: I
    });
    const d = r(() => t.value === l.activeSlide), S = r(() => t.value === l.activeSlide - 1), B = r(() => t.value === l.activeSlide + 1), v = r(() => t.value >= l.visibleRange.min && t.value <= l.visibleRange.max), E = r(() => {
      if (l.config.itemsToShow === "auto")
        return;
      const C = l.config.itemsToShow, $ = l.config.gap > 0 && C > 1 ? `calc(${100 / C}% - ${l.config.gap * (C - 1) / C}px)` : `${100 / C}%`;
      return l.isVertical ? { height: $ } : { width: $ };
    });
    return l.slideRegistry.registerSlide(k, e.index), el(() => {
      l.slideRegistry.unregisterSlide(k);
    }), e.isClone && (ua(() => {
      Sa(k.vnode);
    }), tl(() => {
      Sa(k.vnode);
    })), () => {
      var C, $;
      return l.config.enabled ? Z("li", {
        style: [o.style, Object.assign({}, E.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": e.isClone,
          "carousel__slide--visible": v.value,
          "carousel__slide--active": d.value,
          "carousel__slide--prev": S.value,
          "carousel__slide--next": B.value,
          "carousel__slide--sliding": l.isSliding
        },
        onFocusin: () => {
          l.viewport && (l.viewport.scrollLeft = 0), l.nav.slideTo(t.value);
        },
        id: e.isClone ? void 0 : e.id,
        "aria-hidden": e.isClone || void 0
      }, ($ = i.default) === null || $ === void 0 ? void 0 : $.call(i, {
        currentIndex: t.value,
        isActive: d.value,
        isClone: e.isClone,
        isPrev: S.value,
        isNext: B.value,
        isSliding: l.isSliding,
        isVisible: v.value
      })) : (C = i.default) === null || C === void 0 ? void 0 : C.call(i);
    };
  }
}), Nl = (e, o, i, n) => {
  var p, k, I, d, S;
  if (!i) return 0;
  let l, t;
  if (i.type === Ae.Field ? [Ze.Number, Ze.Range].includes((p = i.field) == null ? void 0 : p.type) ? (l = parseFloat(e[i.key]), t = parseFloat(o[i.key])) : [Ze.Date, Ze.Date].includes((k = i.field) == null ? void 0 : k.type) ? (l = e[i.key], t = o[i.key]) : ((I = i.field) == null ? void 0 : I.type) === Ze.Select && ((d = i.field) != null && d.multiple) && ((S = i.field) == null ? void 0 : S.multipleDisplay) === ul.Count ? (l = e[i.key].length, t = o[i.key].length) : (l = String(e[i.key]).toLowerCase(), t = String(o[i.key]).toLowerCase()) : (l = String(e[i.key]).toLowerCase(), t = String(o[i.key]).toLowerCase()), n === tt.Asc) {
    if (l > t) return 1;
    if (t > l) return -1;
  } else {
    if (l > t) return -1;
    if (t > l) return 1;
  }
  return 0;
}, Oe = (e, o, i, n = []) => {
  if (e.extractTitleFromColumn) {
    let t = n.find((p) => p.key === e.extractTitleFromColumn);
    if (t)
      return Oe(t, o, i, n);
  }
  let l = e.type === Ae.ColumnIndex ? i : o[e.key];
  if (e.formatter && typeof e.formatter == "function") {
    let t = e.formatter(l, o, e, i);
    return typeof t == "string" && t.startsWith("__:") ? ol(t.substring(3)) : t;
  }
  return l;
}, Ol = (e, o, i) => {
  if (!e.colspan) return -1;
  let n = o;
  return i.forEach((l) => {
    let t = It(e, l);
    t > 0 && t < n && (n = t);
  }), n;
}, It = (e, o) => e.colspan === !1 ? !1 : typeof e.colspan == "function" ? e.colspan(o) : e.colspan, Gt = (e, o) => typeof e.preferSlot > "u" ? !0 : e.preferSlot === !1 ? !1 : typeof e.preferSlot == "function" ? e.preferSlot(o) : !0, aa = (e, o, i) => {
  if (typeof e != "object" || !e.key && [Ae.Field].includes(e.type) || o.indexOf(e.key) > -1) return !1;
  let n = It(e, i);
  return typeof e.colspan > "u" ? !0 : (typeof e.colspan < "u" && (typeof e.colspan == "function" ? n = parseInt(e.colspan(i)) : n = parseInt(e.colspan)), n > 0);
}, $l = (e = []) => {
  if (e.length > 0) {
    for (let o = 0; o < e.length; ++o)
      if (e[o].sortable) return e[o].key;
  }
  return "";
}, Fl = (e, o) => {
  if (e.length > 0) {
    for (let i = 0; i < e.length; ++i)
      if (e[i].key === o) return e[i];
  }
  return null;
}, Ht = (e) => {
  let o = [];
  return e.class && o.push(e.class), e.type && o.push(`is-${e.type}`), o.join(" ");
}, Tt = /* @__PURE__ */ we({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new xa() },
    columns: { default: () => [] },
    i: { default: 0 },
    editModeEnabled: { type: Boolean, default: !1 },
    hasInlineEditPerm: { type: Boolean, default: !1 },
    tableType: {}
  },
  emits: [
    "update:modelValue",
    "inline-drop"
  ],
  setup(e, { emit: o }) {
    const i = o, n = e, l = D(n.modelValue);
    q(() => n.modelValue, (S) => {
      l.value = S;
    }), q(l, (S) => {
      i("update:modelValue", S);
    });
    const t = () => {
      i("inline-drop");
    }, p = r(() => ({ ...n.column.slotData, item: l.value })), k = r(() => {
      var S, B, v, E;
      if ((S = n.column.field) != null && S.modalData && typeof ((B = n.column.field) == null ? void 0 : B.modalData) == "object")
        for (let C in n.column.field.modalData)
          if (typeof ((v = n.column.field) == null ? void 0 : v.modalData[C]) == "string" && n.column.field.modalData[C].startsWith("prop:")) {
            let $ = n.column.field.modalData[C].substring(5);
            l.value[$];
          } else
            n.column.field.modalData[C];
      return (E = n.column.field) == null ? void 0 : E.modalData;
    }), I = r(() => typeof n.column.field == "string" && n.column.field.startsWith("prop:") ? rl(n.column.field, l.value) : n.column.field), d = r(() => {
      var S, B, v, E;
      return n.column.type === Ae.Field ? !((B = (S = n.column) == null ? void 0 : S.field) != null && B.label) && (n.column.ensureFieldLabel || [
        Ze.Switch,
        Ze.Check
      ].includes((v = n.column.field) == null ? void 0 : v.type)) ? n.column.label : (E = n.column.field) == null ? void 0 : E.label : "";
    });
    return (S, B) => {
      const v = ce("lkt-anchor"), E = ce("lkt-button"), C = ce("lkt-field"), $ = ce("lkt-polymorphic-element");
      return e.column.type === m(Ae).Anchor ? (s(), R(v, K({ key: 0 }, e.column.anchor, { prop: l.value }), {
        default: H(() => [
          _e(et(m(Oe)(e.column, l.value, e.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : e.column.type === m(Ae).Button ? (s(), R(E, K({ key: 1 }, e.column.button, { prop: l.value }), {
        default: H(() => [
          _e(et(m(Oe)(e.column, l.value, e.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : e.column.type === m(Ae).Field ? (s(), R(C, K({
        key: 2,
        modelValue: l.value[e.column.key],
        "onUpdate:modelValue": B[0] || (B[0] = (F) => l.value[e.column.key] = F)
      }, {
        ...I.value,
        readMode: !e.hasInlineEditPerm || I.value.readMode,
        slotData: p.value,
        label: d.value,
        modalData: k.value,
        prop: l.value
      }), null, 16, ["modelValue"])) : e.column.type === m(Ae).InlineDrop ? (s(), R(E, K({ key: 3 }, e.column.button, {
        prop: l.value,
        onClick: t
      }), {
        default: H(() => [
          _e(et(m(Oe)(e.column, l.value, e.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : e.column.type === m(Ae).ColumnIndex && e.column.field ? (s(), R(C, me(K({ key: 4 }, {
        ...I.value,
        modelValue: m(Oe)(e.column, l.value, e.i, e.columns),
        readMode: !0,
        slotData: p.value,
        label: d.value,
        modalData: k.value,
        prop: l.value
      })), null, 16)) : e.column.type === m(Ae).Content && Array.isArray(e.column.content) ? (s(), h("div", {
        key: 5,
        class: Y(["lkt-content-container", e.column.class])
      }, [
        (s(!0), h(P, null, de(e.column.content, (F) => (s(), h(P, null, [
          typeof F == "function" ? (s(), R($, K({
            key: 0,
            ref_for: !0
          }, F({ item: l.value, index: e.i })), null, 16)) : (s(), R($, K({
            key: 1,
            ref_for: !0
          }, F), null, 16))
        ], 64))), 256))
      ], 2)) : (s(), h(P, { key: 6 }, [
        _e(et(m(Oe)(e.column, l.value, e.i, e.columns)), 1)
      ], 64));
    };
  }
}), Bt = class Bt {
};
Bt.navButtonSlot = "", Bt.createButtonSlot = "", Bt.defaultEmptySlot = void 0;
let Se = Bt;
const Ul = ["data-i", "data-draggable"], Pl = ["data-role", "data-i"], jl = {
  key: 1,
  class: "lkt-table-nav-cell"
}, zl = { class: "lkt-table-nav-container" }, Gl = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, Hl = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, ql = ["data-column", "colspan", "title"], Kl = ["colspan"], Xl = ["colspan"], Yl = ["colspan"], Wl = ["data-column", "colspan", "title"], Jl = ["data-column", "colspan", "title"], Ql = /* @__PURE__ */ we({
  __name: "LktTableRow",
  props: {
    modelValue: { default: () => ({}) },
    isDraggable: { type: Boolean, default: !0 },
    sortable: { type: Boolean, default: !0 },
    isLoading: { type: Boolean },
    addNavigation: { type: Boolean, default: !1 },
    latestRow: { type: Boolean, default: !1 },
    canDrop: { type: Boolean, default: !1 },
    canEdit: { type: Boolean, default: !1 },
    canCreate: { type: Boolean },
    canRead: { type: Boolean },
    editModeEnabled: { type: Boolean, default: !1 },
    hasInlineEditPerm: { type: Boolean },
    i: { default: 0 },
    visibleColumns: { default: () => [] },
    emptyColumns: { default: () => [] },
    rowDisplayType: { type: [Number, Function], default: xe.Auto },
    renderDrag: { type: [Boolean, Function], default: !0 },
    disabledDrag: { type: [Boolean, Function], default: !0 },
    itemContainerClass: { type: [String, Function], default: "" },
    itemSlotComponent: {},
    itemSlotData: {},
    itemSlotEvents: {},
    permissions: { default: () => [] }
  },
  emits: [
    "update:modelValue",
    "click",
    "item-up",
    "item-down",
    "item-drop"
  ],
  setup(e, { emit: o }) {
    const i = Ea(), n = o, l = e, t = D(l.modelValue);
    let p = typeof l.rowDisplayType == "function" ? l.rowDisplayType(t.value, l.i) : l.rowDisplayType;
    p || (p = xe.Auto);
    const k = [xe.Auto, xe.PreferCustomItem].includes(p), I = [xe.Auto, xe.PreferItem].includes(p), d = (g) => n("click", g), S = r(() => {
      let g = [], U = typeof l.disabledDrag == "function" ? l.disabledDrag(t.value) : pe.value === !0;
      return !U && l.sortable && l.isDraggable ? g.push("handle") : U && g.push("disabled"), g.join(" ");
    }), B = r(() => Se.navButtonSlot !== ""), v = r(() => Se.navButtonSlot), E = () => {
      n("item-up", l.i);
    }, C = () => {
      n("item-down", l.i);
    }, $ = () => {
      n("item-drop", l.i);
    };
    q(() => l.modelValue, (g) => t.value = g), q(t, (g) => {
      n("update:modelValue", g);
    }, { deep: !0 });
    const F = r(() => typeof l.renderDrag == "function" ? l.renderDrag(t.value) : l.renderDrag === !0), pe = r(() => typeof l.disabledDrag == "function" ? l.disabledDrag(t.value) : l.disabledDrag === !0), be = r(() => S.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), he = r(() => {
      let g = [];
      return k && g.push("type-custom-item"), I && g.push("type-item"), typeof l.itemContainerClass == "function" ? g.push(l.itemContainerClass(t.value, l.i)) : l.itemContainerClass !== "" && g.push(l.itemContainerClass), g.join(" ");
    }), ke = r(() => l.visibleColumns.filter((g) => g.includeBeforeItemSlot)), J = r(() => l.visibleColumns.filter((g) => g.includeAfterItemSlot));
    return (g, U) => {
      const ue = ce("lkt-button");
      return s(), h("tr", {
        "data-i": e.i,
        "data-draggable": e.isDraggable,
        class: Y(he.value)
      }, [
        e.sortable && e.editModeEnabled && F.value ? (s(), h("td", {
          key: 0,
          "data-role": be.value,
          class: Y(S.value),
          "data-i": e.i
        }, [...U[6] || (U[6] = [
          ge("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ])], 10, Pl)) : A("", !0),
        e.addNavigation && e.editModeEnabled ? (s(), h("td", jl, [
          ge("div", zl, [
            Ce(ue, {
              palette: "table-nav",
              disabled: e.i === 0,
              onClick: E
            }, {
              default: H(() => [
                B.value ? (s(), R(ye(v.value), {
                  key: 0,
                  direction: "up"
                })) : (s(), h("i", Gl))
              ]),
              _: 1
            }, 8, ["disabled"]),
            Ce(ue, {
              palette: "table-nav",
              disabled: e.latestRow,
              onClick: C
            }, {
              default: H(() => [
                B.value ? (s(), R(ye(v.value), {
                  key: 0,
                  direction: "down"
                })) : (s(), h("i", Hl))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : A("", !0),
        e.itemSlotComponent || m(k) && m(i)[`item-${e.i}`] || m(I) && m(i).item ? (s(), h(P, { key: 2 }, [
          (s(!0), h(P, null, de(ke.value, (w) => (s(), h(P, null, [
            m(aa)(w, e.emptyColumns, t.value) ? (s(), h("td", {
              key: "td" + e.i,
              "data-column": w.key,
              colspan: m(It)(w, t.value),
              title: m(Oe)(w, t.value, e.i, e.visibleColumns),
              class: Y(m(Ht)(w)),
              onClick: U[1] || (U[1] = (G) => d(G))
            }, [
              g.$slots[w.key] && m(Gt)(w, t.value) ? O(g.$slots, w.key, {
                key: 0,
                value: t.value[w.key],
                item: t.value,
                column: w,
                i: e.i,
                index: e.i,
                editing: e.editModeEnabled,
                canCreate: e.canCreate,
                canRead: e.canRead,
                canUpdate: e.canEdit,
                canDrop: e.canDrop,
                isLoading: e.isLoading,
                doDrop: () => $()
              }) : t.value ? (s(), R(Tt, {
                key: 1,
                modelValue: t.value,
                "onUpdate:modelValue": U[0] || (U[0] = (G) => t.value = G),
                column: w,
                columns: e.visibleColumns,
                "edit-mode-enabled": e.editModeEnabled,
                "has-inline-edit-perm": e.hasInlineEditPerm,
                i: e.i,
                onInlineDrop: $
              }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : A("", !0)
            ], 10, ql)) : A("", !0)
          ], 64))), 256)),
          e.itemSlotComponent ? (s(), h("td", {
            key: "td" + e.i,
            colspan: e.visibleColumns.length
          }, [
            (s(), R(ye(e.itemSlotComponent), me(Aa({
              item: t.value,
              index: e.i,
              editing: e.editModeEnabled,
              perms: e.permissions,
              data: e.itemSlotData,
              events: e.itemSlotEvents
            })), null, 16))
          ], 8, Kl)) : m(k) && m(i)[`item-${e.i}`] ? (s(), h("td", {
            key: "td" + e.i,
            colspan: e.visibleColumns.length
          }, [
            O(g.$slots, `item-${e.i}`, {
              item: t.value,
              index: e.i,
              editing: e.editModeEnabled,
              canCreate: e.canCreate,
              canRead: e.canRead,
              canUpdate: e.canEdit,
              canDrop: e.canDrop,
              isLoading: e.isLoading,
              doDrop: () => $()
            })
          ], 8, Xl)) : m(I) && m(i).item ? (s(), h("td", {
            key: "td" + e.i,
            colspan: e.visibleColumns.length
          }, [
            O(g.$slots, "item", {
              item: t.value,
              index: e.i,
              editing: e.editModeEnabled,
              canCreate: e.canCreate,
              canRead: e.canRead,
              canUpdate: e.canEdit,
              canDrop: e.canDrop,
              isLoading: e.isLoading,
              doDrop: () => $()
            })
          ], 8, Yl)) : A("", !0),
          (s(!0), h(P, null, de(J.value, (w) => (s(), h(P, null, [
            m(aa)(w, e.emptyColumns, t.value) ? (s(), h("td", {
              key: "td" + e.i,
              "data-column": w.key,
              colspan: m(It)(w, t.value),
              title: m(Oe)(w, t.value, e.i, e.visibleColumns),
              class: Y(m(Ht)(w)),
              onClick: U[3] || (U[3] = (G) => d(G))
            }, [
              g.$slots[w.key] && m(Gt)(w, t.value) ? O(g.$slots, w.key, {
                key: 0,
                value: t.value[w.key],
                item: t.value,
                column: w,
                i: e.i,
                index: e.i,
                editing: e.editModeEnabled,
                canCreate: e.canCreate,
                canRead: e.canRead,
                canUpdate: e.canEdit,
                canDrop: e.canDrop,
                isLoading: e.isLoading,
                doDrop: () => $()
              }) : t.value ? (s(), R(Tt, {
                key: 1,
                modelValue: t.value,
                "onUpdate:modelValue": U[2] || (U[2] = (G) => t.value = G),
                column: w,
                columns: e.visibleColumns,
                "edit-mode-enabled": e.editModeEnabled,
                "has-inline-edit-perm": e.hasInlineEditPerm,
                i: e.i,
                onInlineDrop: $
              }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : A("", !0)
            ], 10, Wl)) : A("", !0)
          ], 64))), 256))
        ], 64)) : (s(!0), h(P, { key: 3 }, de(e.visibleColumns, (w) => (s(), h(P, null, [
          m(aa)(w, e.emptyColumns, t.value) ? (s(), h("td", {
            key: "td" + e.i,
            "data-column": w.key,
            colspan: m(It)(w, t.value),
            title: m(Oe)(w, t.value, e.i, e.visibleColumns),
            class: Y(m(Ht)(w)),
            onClick: U[5] || (U[5] = (G) => d(G))
          }, [
            g.$slots[w.key] && m(Gt)(w, t.value) ? O(g.$slots, w.key, {
              key: 0,
              value: t.value[w.key],
              item: t.value,
              column: w,
              i: e.i,
              index: e.i,
              editing: e.editModeEnabled,
              canCreate: e.canCreate,
              canRead: e.canRead,
              canUpdate: e.canEdit,
              canDrop: e.canDrop,
              isLoading: e.isLoading,
              doDrop: () => $()
            }) : t.value ? (s(), R(Tt, {
              key: 1,
              modelValue: t.value,
              "onUpdate:modelValue": U[4] || (U[4] = (G) => t.value = G),
              column: w,
              columns: e.visibleColumns,
              "edit-mode-enabled": e.editModeEnabled,
              "has-inline-edit-perm": e.hasInlineEditPerm,
              i: e.i,
              onInlineDrop: $
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : A("", !0)
          ], 10, Jl)) : A("", !0)
        ], 64))), 256))
      ], 10, Ul);
    };
  }
}), Dt = /* @__PURE__ */ we({
  __name: "CreateButton",
  props: {
    config: { default: void 0 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: [
    "click",
    "append"
  ],
  setup(e, { emit: o }) {
    var d;
    const i = o, n = e, l = r(() => Se.createButtonSlot !== ""), t = r(() => Se.createButtonSlot), p = {
      ...(d = n.config) == null ? void 0 : d.modalData,
      beforeClose: (S) => {
        "itemCreated" in S && S.itemCreated === !0 && i("append", S.item);
      }
    }, k = {
      ...n.config
    };
    k.modalData = p;
    const I = () => {
      var S;
      if (!((S = n.config) != null && S.modal)) {
        i("click");
        return;
      }
    };
    return (S, B) => {
      const v = ce("lkt-button");
      return s(), R(v, K(k, {
        disabled: e.disabled,
        onClick: I
      }), {
        default: H(() => [
          l.value ? (s(), R(ye(t.value), { key: 0 })) : A("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), Zl = ["data-column", "data-sortable", "data-sort", "colspan", "title"], _l = /* @__PURE__ */ we({
  __name: "TableHeader",
  props: {
    column: { default: () => new xa() },
    sortBy: { default: "" },
    sortDirection: { default: "" },
    amountOfColumns: { default: 0 },
    items: { default: () => [] }
  },
  emits: [
    "click"
  ],
  setup(e, { emit: o }) {
    const i = o, n = e, l = r(() => Ol(n.column, n.amountOfColumns, n.items)), t = r(() => n.column.sortable === !0), p = r(() => t.value && n.sortBy === n.column.key ? n.sortDirection : ""), k = r(() => na(n.column.label)), I = r(() => t.value && n.sortBy === n.column.key ? n.sortDirection === tt.Asc ? Ee.defaultTableSortAscIcon : n.sortDirection === tt.Desc ? Ee.defaultTableSortDescIcon : "" : ""), d = () => i("click", n.column);
    return (S, B) => (s(), h("th", {
      "data-column": e.column.key,
      "data-sortable": t.value,
      "data-sort": p.value,
      colspan: l.value,
      title: k.value,
      class: Y(m(Ht)(e.column)),
      onClick: d
    }, [
      ge("div", null, [
        _e(et(k.value) + " ", 1),
        I.value ? (s(), h("i", {
          key: 0,
          class: Y(I.value)
        }, null, 2)) : A("", !0)
      ])
    ], 10, Zl));
  }
}), en = ["id"], tn = { class: "lkt-table-page-buttons" }, an = { class: "switch-edition-mode" }, ln = { class: "switch-edition-mode" }, nn = {
  key: 0,
  class: "lkt-table-page-buttons"
}, on = {
  key: 1,
  class: "lkt-table-page-filters"
}, un = { class: "lkt-table" }, rn = { key: 0 }, sn = { key: 0 }, dn = {
  key: 0,
  "data-role": "drag-indicator"
}, cn = { key: 1 }, vn = ["id"], fn = ["id"], mn = ["data-i"], gn = ["data-i"], yn = ["id"], pn = ["data-i"], bn = ["id"], hn = { class: "lkt-carousel-slide" }, kn = { class: "lkt-carousel-slide" }, Cn = ["id"], Sn = {
  key: 3,
  class: "lkt-table-empty"
}, wn = {
  key: 5,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, Dn = /* @__PURE__ */ we({
  __name: "LktTable",
  props: /* @__PURE__ */ il({
    modelValue: {},
    type: {},
    columns: {},
    noResults: {},
    noResultsText: {},
    hideEmptyColumns: { type: Boolean },
    hideTableHeader: { type: Boolean },
    itemDisplayChecker: { type: Function },
    customItemSlotName: { type: Function },
    rowDisplayType: { type: [Number, Function] },
    slotItemVar: {},
    itemSlotComponent: { type: [String, Function] },
    itemSlotData: { type: [Object, Function] },
    itemSlotEvents: { type: [Object, Function] },
    loading: { type: Boolean },
    page: {},
    perms: {},
    editMode: { type: Boolean },
    dataStateConfig: {},
    sortable: { type: Boolean },
    sorter: { type: Function },
    initialSorting: { type: Boolean },
    drag: {},
    paginator: {},
    carousel: {},
    calendar: {},
    calendarGroups: {},
    accordion: {},
    accordionList: {},
    header: {},
    title: {},
    titleTag: {},
    titleIcon: {},
    headerClass: {},
    editModeButton: { type: [Boolean, Object] },
    saveButton: { type: [Boolean, Object] },
    createButton: { type: [Boolean, Object] },
    hiddenSave: { type: Boolean },
    groupButton: { type: [Object, Boolean] },
    requiredItemsForTopCreate: {},
    requiredItemsForBottomCreate: {},
    addNavigation: { type: Boolean },
    newValueGenerator: { type: Function },
    wrapContentTag: {},
    wrapContentClass: {},
    itemsContainerClass: {},
    itemContainerClass: { type: [String, Function] },
    itemContainerStyle: { type: [String, Function] },
    skipTableItemsContainer: { type: Boolean },
    createEnabledValidator: { type: Function },
    switchableTypes: {},
    switchableTypesButtons: {},
    useItemSlot: { type: [Boolean, Function] },
    filtersForm: {},
    events: {}
  }, sl(dl)),
  emits: [
    "update:modelValue",
    "update:perms",
    "update:loading",
    "update:editMode",
    "sort",
    "click",
    "save",
    "error",
    "before-save",
    "read-response",
    "click-create",
    "page",
    "drag-end"
  ],
  setup(e, { expose: o, emit: i }) {
    var pa, ba;
    const n = i, l = Ea(), t = e, p = D(typeof t.sorter == "function" ? t.sorter : Nl), k = D($l(t.columns)), I = D(tt.Asc), d = D(t.modelValue), S = D(null), B = D(t.columns), v = D([]), E = D((pa = t.paginator) == null ? void 0 : pa.modelValue), C = D(t.loading), $ = D(!1), F = D(t.perms), pe = D(null), be = D(null), he = D(null), ke = D({}), J = D(new fl({ items: d.value }, t.dataStateConfig)), g = D(t.editMode), U = D(0), ue = D(null), w = D(t.type), G = D(((ba = t.carousel) == null ? void 0 : ba.currentSlide) || 0), W = D(void 0), $e = D(void 0), At = D(void 0), Ve = D({
      ...typeof t.paginator.resourceData == "object" ? t.paginator.resourceData : {}
    }), _ = D({
      ...typeof t.paginator.resourceData == "object" ? t.paginator.resourceData : {}
    }), le = D(ze(t.saveButton, Ee.defaultSaveButton)), De = D(ze(t.createButton, Ee.defaultCreateButton)), xt = D(ze(t.createButton, Ee.defaultInlineCreateButton)), ve = D(ze(t.editModeButton, Ee.defaultEditModeButton)), lt = D(ze(t.groupButton, Ee.defaultGroupButton));
    q(() => t.saveButton, (a) => le.value = ze(t.saveButton, Ee.defaultSaveButton)), q(() => t.createButton, (a) => De.value = ze(t.createButton, Ee.defaultCreateButton)), q(() => t.editModeButton, (a) => ve.value = ze(t.editModeButton, Ee.defaultEditModeButton));
    const Ie = D(!1);
    q(C, (a) => n("update:loading", a)), q(E, (a) => n("page", a));
    const Fe = (a) => {
      F.value = a;
    }, Vt = (a) => {
      var u, V;
      if (Array.isArray(a.data)) {
        let M = a.data;
        if (typeof ((u = t.events) == null ? void 0 : u.parseResults) == "function" && (M = t.events.parseResults(M)), d.value = [...d.value, ...M], [Be.TimelineAsc, Be.TimelineDesc, Be.TimelineAscDesc].includes((V = t.paginator) == null ? void 0 : V.type)) {
          const j = yl(d.value, t.paginator.dateKey);
          W.value = j.oldest, $e.value = j.newest;
        }
      }
      C.value = !1, $.value = !0, J.value.store({ items: d.value }).turnStoredIntoOriginal(), Ie.value = !1, jt(() => {
        Ue.value, n("read-response", a);
      });
    }, Rt = () => jt(() => {
      var M;
      const a = t.paginator, u = a == null ? void 0 : a.type;
      let V = !0;
      u && ([Be.LoadMore, Be.Infinite].includes(u) || [Be.TimelineDesc, Be.TimelineAsc, Be.TimelineAscDesc].includes(u) && ((M = t.paginator.timeline) != null && M.accumulative)) && (V = !1), V && d.value.splice(0, d.value.length), C.value = !0;
    }), nt = () => {
      pe.value.doRefresh();
    }, ee = cl(12), Ge = r(() => {
      if (!t.hideEmptyColumns) return [];
      let a = [];
      return B.value.forEach((u) => {
        let V = u.key, M = !1;
        d.value.forEach((j) => {
          if (typeof j.checkEmpty == "function")
            return j.checkEmpty(j);
          j[V] && (M = !0);
        }), M || a.push(V);
      }), a;
    }), ne = r(() => B.value.filter((a) => !a.hidden)), it = r(() => B.value.filter((a) => a.isForRowKey)), yt = r(() => B.value.map((a) => a.key)), Kt = r(() => {
      let a = [];
      for (let u in l) yt.value.indexOf(u) !== -1 && a.push(u);
      return a;
    }), Xt = r(() => {
      let a = [];
      for (let u in l) u.indexOf("slide-") !== -1 && a.push(u);
      return a;
    }), ot = r(() => {
      var a;
      return t.hiddenSave || C.value || !((a = le.value) != null && a.resource || le.value.type) ? !1 : g.value && Ie.value ? !0 : g.value;
    }), Yt = r(() => St.value && d.value.length >= t.requiredItemsForTopCreate || ht.value ? !0 : ot.value || g.value && te.value), Ue = r(() => {
      var a, u;
      return U.value, typeof ((a = le.value) == null ? void 0 : a.disabled) == "function" ? le.value.disabled({
        value: d.value,
        dataState: J.value
      }) : typeof ((u = le.value) == null ? void 0 : u.disabled) == "boolean" ? le.value.disabled : !Ie.value;
    }), Lt = r(() => d.value.length), ut = r(() => {
      var a;
      return {
        items: d.value,
        ...(a = le.value) == null ? void 0 : a.resourceData
      };
    }), Mt = r(() => t.titleTag === "" ? "h2" : t.titleTag), Nt = r(() => t.wrapContentTag === "" ? "div" : t.wrapContentTag), rt = r(() => na(t.title)), st = r(() => {
      var a;
      return (a = t.drag) == null ? void 0 : a.enabled;
    }), te = r(() => F.value.includes(Le.Create)), fe = r(() => F.value.includes("read")), Q = r(() => F.value.includes(Le.Update)), dt = r(() => F.value.includes(Le.Edit)), pt = r(() => F.value.includes(Le.InlineEdit)), bt = r(() => F.value.includes(Le.ModalCreate)), Re = r(() => F.value.includes(Le.InlineCreate)), He = r(() => F.value.includes(Le.InlineCreateEver)), ie = r(() => F.value.includes(Le.Drop)), ct = r(() => F.value.includes(Le.SwitchEditMode)), ht = r(() => !ct.value || !Q.value && !ie.value || !Q.value && ie.value ? !1 : !C.value), Wt = r(() => {
      var a;
      return (typeof ((a = t.paginator) == null ? void 0 : a.type) < "u" && [Be.LoadMore, Be.Infinite].includes(t.paginator.type) || !C.value) && d.value.length > 0;
    }), qe = r(() => B.value.find((a) => a.isForAccordionHeader)), vt = r(() => B.value.find((a) => a.isCalendarDate)), Ot = r(() => B.value.find((a) => a.isCalendarGroup)), ft = (a, u) => typeof t.customItemSlotName == "function" ? t.customItemSlotName(a, u) : "", c = (a) => {
      let u = a.target;
      if (typeof u.dataset.column > "u")
        do
          u = u.parentNode;
        while (typeof u.dataset.column > "u" && u.tagName !== "TABLE" && u.tagName !== "body");
      if (u.tagName === "TD" && (u = u.parentNode, u = u.dataset.i, typeof u < "u"))
        return d.value[u];
    }, y = () => {
      U.value = pl();
    }, T = (a) => d.value[a], x = (a) => {
      var u;
      return (u = S.value) == null ? void 0 : u.querySelector(`[data-i="${a}"]`);
    }, N = (a) => {
      a && a.sortable && (a.key === k.value && (I.value = I.value === tt.Asc ? tt.Desc : tt.Asc), k.value = a.key, d.value = d.value.sort((u, V) => p.value(u, V, a, I.value)), y(), n("sort", {
        sortBy: k.value,
        sortDirection: I.value
      }));
    }, ae = (a) => {
      n("click", a);
    }, re = (a) => {
      var V, M, j, z, Pe, je, We, oe;
      let u = parseInt((z = (j = (M = (V = a == null ? void 0 : a.originalEvent) == null ? void 0 : V.toElement) == null ? void 0 : M.closest("tr")) == null ? void 0 : j.dataset) == null ? void 0 : z.i);
      return !(typeof ((Pe = t.drag) == null ? void 0 : Pe.isValid) == "function" && !((je = t.drag) != null && je.isValid(d.value[u])) || typeof ((We = t.drag) == null ? void 0 : We.isValid) == "boolean" && !((oe = t.drag) != null && oe.isValid));
    }, se = (a) => {
      var u, V;
      return typeof ((u = t.drag) == null ? void 0 : u.isDraggable) == "function" ? (V = t.drag) == null ? void 0 : V.isDraggable(a) : !0;
    }, Ke = () => {
      if (te.value) {
        n("click-create");
        return;
      }
      if (Re.value || He.value) {
        if (typeof t.newValueGenerator == "function") {
          let a = t.newValueGenerator();
          if (typeof a == "object" || Te.value !== Me.Table) {
            d.value.push(a);
            return;
          }
        }
        d.value.push({});
      } else
        n("click-create");
    }, Xe = (a) => {
      d.value.push(a);
    }, mt = () => C.value = !0, $t = () => C.value = !1, ra = (a, u) => {
      var V, M, j;
      if (!((V = le.value) != null && V.type && [
        ea.Split,
        ea.SplitEver,
        ea.SplitLazy
      ].includes((M = le.value) == null ? void 0 : M.type))) {
        if (n("before-save"), (j = le.value) != null && j.resource && (C.value = !1, !u.success)) {
          n("error", u.httpStatus);
          return;
        }
        J.value.turnStoredIntoOriginal(), Ie.value = !1, n("save", u);
      }
    }, sa = (a, u, V) => {
      if (V >= a.length) {
        let M = V - a.length + 1;
        for (; M--; ) a.push(void 0);
      }
      return a.splice(V, 0, a.splice(u, 1)[0]), a;
    }, $a = (a) => {
      sa(d.value, a, a - 1), y();
    }, Fa = (a) => {
      sa(d.value, a, a + 1), y();
    }, kt = (a) => {
      d.value.splice(a, 1), y();
    }, da = () => {
      var a;
      ke.value && typeof ((a = ke.value) == null ? void 0 : a.destroy) == "function" && (ke.value.destroy(), ke.value = {});
    }, Jt = () => {
      ue.value || (ue.value = document.getElementById("lkt-table-body-" + ee)), ke.value = new ml(ue.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(a) {
          let u = a.oldIndex, V = a.newIndex;
          d.value.splice(V, 0, d.value.splice(u, 1)[0]), y(), n("drag-end", d.value[V]);
        },
        onMove: function(a, u) {
          return re(a);
        }
      });
    }, Ft = (a, u, V = !1) => {
      let M = [U.value, ee, "row", u];
      return V && M.push("hidden"), it.value.forEach((j) => {
        let z = String(a[j.key]).toLowerCase();
        z.length > 50 && (z = z.substring(0, 50)), z = vl(z, " ", "-"), M.push(z);
      }), M.join("-");
    }, Ct = r(() => typeof t.createEnabledValidator == "function" ? t.createEnabledValidator({ items: d.value }) : !0), St = r(() => t.createButton === !1 ? !1 : He.value || te.value && g.value || Re.value && g.value || bt.value && g.value), ca = r(() => t.createButton === !1 ? !1 : He.value || Re.value && g.value || bt.value && g.value), Ua = r(() => [Me.Ol, Me.Ul].includes(Te.value)), wt = (a, u) => typeof t.itemDisplayChecker == "function" ? t.itemDisplayChecker(a, u) : !0, Ut = (a, u) => typeof t.itemContainerClass == "function" ? t.itemContainerClass(a, u) : t.itemContainerClass, va = (a, u) => typeof t.itemContainerStyle == "function" ? t.itemContainerStyle(a, u) : t.itemContainerStyle, Pa = (a, u) => qe.value ? a[qe.value.key] : "", Ye = r(() => typeof t.itemSlotComponent == "function" ? t.itemSlotComponent() : t.itemSlotComponent), Pt = r(() => typeof t.itemSlotData == "function" ? t.itemSlotData() : t.itemSlotData);
    ua(() => {
      var a;
      t.initialSorting && N(Fl(t.columns, k.value)), J.value.store({ items: d.value }).turnStoredIntoOriginal(), Ie.value = !1, (a = t.drag) != null && a.enabled && jt(() => {
        Jt();
      });
    }), q(() => {
      var a;
      return (a = t.drag) == null ? void 0 : a.enabled;
    }, (a) => {
      a ? Jt() : da();
    }), q(() => t.type, (a) => {
      var u;
      (u = t.drag) != null && u.enabled ? Jt() : da();
    }), q(() => t.perms, (a) => F.value = a), q(F, (a) => n("update:perms", a)), q(g, (a) => {
      n("update:editMode", a);
    }), q(() => t.editMode, (a) => g.value = a), q(() => t.columns, (a) => B.value = a, { deep: !0 }), q(() => t.modelValue, (a) => {
      d.value = a;
    }, { deep: !0 }), q(d, (a) => {
      J.value.increment({ items: a }), Ie.value = J.value.changed(), n("update:modelValue", a);
    }, { deep: !0 }), o({
      getItemByEvent: c,
      getItemByIndex: T,
      getRowByIndex: x,
      doRefresh: nt,
      doRemoveIndex: (a) => {
        v.value[a] === !0 && (v.value[a] = !1), d.value.splice(a, 1), y();
      },
      getHtml: () => be.value,
      reRender: y,
      turnStoredIntoOriginal: () => {
        J.value.turnStoredIntoOriginal(), jt(() => {
          y();
        });
      }
    });
    const Qt = r(() => typeof Se.defaultEmptySlot < "u"), fa = r(() => Se.defaultEmptySlot), ma = r(() => {
      if (typeof t.noResults != "object") return;
      let a = {
        ...t.noResults
      };
      return a.text && (a.text = na(a.text)), a;
    }), ja = r(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled ? !1 : typeof t.drag.canRender > "u" ? !0 : t.drag.canRender), za = r(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled || typeof t.drag.isDisabled > "u" ? !1 : t.drag.isDisabled), Ga = r(() => typeof t.header == "object" && Object.keys(t.header).length > 0), Ha = r(() => typeof t.filtersForm == "object" && Object.keys(t.filtersForm).length > 0), Te = r(() => Array.isArray(t.switchableTypes) && t.switchableTypes.length > 0 ? w.value : t.type), qa = r(() => Array.isArray(t.switchableTypes) ? t.switchableTypes.length > 0 ? t.switchableTypes.includes(t.type) ? t.switchableTypes : [
      t.type,
      ...t.switchableTypes
    ] : [] : []), Ka = r(() => {
      let a = [];
      return qa.value.forEach((u) => {
        let V = t.switchableTypesButtons[u];
        a.push({
          ...V,
          class: [V.class, u === Te.value ? "is-current" : ""].join(" "),
          events: {
            click: (M) => {
              var j, z;
              w.value = u, typeof ((j = t.switchableTypesButtons[u].events) == null ? void 0 : j.click) == "function" && t.switchableTypesButtons[u].events.click(M), typeof ((z = t.events) == null ? void 0 : z.viewChanged) == "function" && t.events.viewChanged(u);
            }
          }
        });
      }), a;
    }), Xa = r(() => {
      var a, u;
      return {
        ...t.header,
        topEndButtons: [
          ...typeof ((a = t.header) == null ? void 0 : a.topEndButtons) > "u" ? [] : (u = t.header) == null ? void 0 : u.topEndButtons,
          ...Ka.value
        ]
      };
    }), ga = (a, u) => typeof t.useItemSlot == "function" ? t.useItemSlot({ item: a, index: u }) === !0 : t.useItemSlot, Ya = r(() => {
      if (Te.value !== Me.Calendar || !vt.value || typeof vt.value > "u") return [];
      let a = [], u = [];
      return d.value.forEach((V) => {
        var We;
        let M = V[vt.value.key], j = gl("Y-m-d H:i:s", M), z;
        (We = Ot.value) != null && We.key && (z = V[Ot.value.key]);
        const Pe = [j, z].join("-");
        let je = -1;
        if (u.includes(Pe))
          je = u.findIndex((oe) => oe === Pe);
        else {
          let oe = {};
          z && t.calendarGroups && typeof t.calendarGroups[z] == "object" && (oe = t.calendarGroups[z]);
          let b = `lkt-calendar-group--${z}`;
          oe.class ? oe.class = [
            oe.class,
            b
          ].join(" ") : oe.class = b, je = u.length, u.push(Pe), a.push({
            date: M,
            data: {
              items: []
            },
            dot: {
              ...oe
            }
          });
        }
        a[je].data.items.push(V);
      }), a;
    }), Wa = {
      dayPicked: ((a) => {
        var u;
        typeof ((u = t.calendar.events) == null ? void 0 : u.dayPicked) == "function" && t.calendar.events.dayPicked(a);
      }),
      visibleMonthChanged: ((a) => {
        var u;
        typeof ((u = t.calendar.events) == null ? void 0 : u.visibleMonthChanged) == "function" && t.calendar.events.visibleMonthChanged(a), At.value = a.visibleDate;
      })
    };
    let ya = null;
    q(Ve, () => {
      clearTimeout(ya), ya = setTimeout(() => {
        _.value = {
          ..._.value,
          ...Ve.value
        };
      }, 400);
    }, { deep: !0 });
    const Ja = (a, u, V) => {
      var M;
      a && ((M = t.accordionList) != null && M.limitOpened) && v.value.forEach((j, z) => {
        j && z !== u && (v.value[z] = !1);
      });
    };
    return (a, u) => {
      const V = ce("lkt-header"), M = ce("lkt-button"), j = ce("lkt-form"), z = ce("lkt-accordion"), Pe = ce("lkt-calendar"), je = ce("lkt-loader"), We = ce("lkt-paginator");
      return s(), h("section", {
        ref_key: "element",
        ref: be,
        class: "lkt-table-page",
        id: "lkt-table-page-" + m(ee)
      }, [
        Ga.value ? (s(), R(V, me(K({ key: 0 }, Xa.value)), null, 16)) : rt.value || m(l).title ? (s(), h("header", {
          key: 1,
          class: Y(e.headerClass)
        }, [
          rt.value ? (s(), R(ye(Mt.value), { key: 0 }, {
            default: H(() => [
              e.titleIcon ? (s(), h("i", {
                key: 0,
                class: Y(e.titleIcon)
              }, null, 2)) : A("", !0),
              _e(" " + et(rt.value), 1)
            ]),
            _: 1
          })) : A("", !0),
          m(l).title ? O(a.$slots, "title", { key: 1 }) : A("", !0)
        ], 2)) : A("", !0),
        (s(), R(ye(Nt.value), {
          class: Y(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: H(() => {
            var oe;
            return [
              Je(ge("div", tn, [
                e.groupButton !== !1 ? (s(), R(M, K({
                  key: 0,
                  ref: "groupButton"
                }, lt.value, { class: "lkt-item-crud-group-button" }), {
                  split: H(() => [
                    ge("div", an, [
                      Je(Ce(M, K(ve.value, {
                        checked: g.value,
                        "onUpdate:checked": u[0] || (u[0] = (b) => g.value = b)
                      }), null, 16, ["checked"]), [
                        [Qe, ht.value]
                      ])
                    ]),
                    m(l)["prev-buttons-ever"] ? O(a.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: Q.value,
                      canDrop: ie.value,
                      perms: e.perms
                    }) : A("", !0),
                    m(l)["prev-buttons"] ? O(a.$slots, "prev-buttons", {
                      key: 1,
                      canUpdate: Q.value,
                      canDrop: ie.value,
                      perms: e.perms
                    }) : A("", !0),
                    Je(Ce(M, K({
                      class: "lkt-table--save-button",
                      ref_key: "saveButtonRef",
                      ref: he
                    }, {
                      ...le.value,
                      disabled: Ue.value,
                      resourceData: ut.value
                    }, {
                      onLoading: mt,
                      onLoaded: $t,
                      onClick: ra
                    }), {
                      split: H(({ doClose: b, doRootClick: f }) => [
                        O(a.$slots, "button-save-split", {
                          doClose: b,
                          doRootClick: f,
                          dataState: J.value,
                          onButtonLoading: mt,
                          onButtonLoaded: $t
                        })
                      ]),
                      default: H(() => [
                        m(l)["button-save"] ? O(a.$slots, "button-save", {
                          key: 0,
                          items: d.value,
                          editMode: e.editMode,
                          canUpdate: !Ue.value
                        }) : A("", !0)
                      ]),
                      _: 3
                    }, 16), [
                      [Qe, ot.value]
                    ]),
                    St.value && d.value.length >= e.requiredItemsForTopCreate ? (s(), R(Dt, {
                      key: 2,
                      config: De.value,
                      disabled: !Ct.value,
                      onClick: Ke,
                      onAppend: Xe
                    }, null, 8, ["config", "disabled"])) : A("", !0)
                  ]),
                  _: 3
                }, 16)) : A("", !0),
                m(l)["prev-buttons-ever"] ? O(a.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: Q.value,
                  canDrop: ie.value,
                  perms: e.perms
                }) : A("", !0),
                m(l)["prev-buttons"] ? O(a.$slots, "prev-buttons", {
                  key: 2,
                  canUpdate: Q.value,
                  canDrop: ie.value,
                  perms: e.perms
                }) : A("", !0),
                Je(Ce(M, K({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: he
                }, {
                  ...le.value,
                  disabled: Ue.value,
                  resourceData: ut.value
                }, {
                  onLoading: mt,
                  onLoaded: $t,
                  onClick: ra
                }), {
                  split: H(({ doClose: b, doRootClick: f }) => [
                    O(a.$slots, "button-save-split", {
                      doClose: b,
                      doRootClick: f,
                      dataState: J.value,
                      onButtonLoading: mt,
                      onButtonLoaded: $t
                    })
                  ]),
                  default: H(() => [
                    m(l)["button-save"] ? O(a.$slots, "button-save", {
                      key: 0,
                      items: d.value,
                      editMode: e.editMode,
                      canUpdate: !Ue.value
                    }) : A("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [Qe, ot.value]
                ]),
                ca.value && d.value.length >= e.requiredItemsForTopCreate ? (s(), R(Dt, {
                  key: 3,
                  config: xt.value,
                  disabled: !Ct.value,
                  onClick: Ke,
                  onAppend: Xe
                }, null, 8, ["config", "disabled"])) : St.value && d.value.length >= e.requiredItemsForTopCreate ? (s(), R(Dt, {
                  key: 4,
                  config: De.value,
                  disabled: !Ct.value,
                  onClick: Ke,
                  onAppend: Xe
                }, null, 8, ["config", "disabled"])) : A("", !0),
                ge("div", ln, [
                  Je(Ce(M, K(ve.value, {
                    checked: g.value,
                    "onUpdate:checked": u[1] || (u[1] = (b) => g.value = b)
                  }), null, 16, ["checked"]), [
                    [Qe, ht.value]
                  ])
                ])
              ], 512), [
                [Qe, Yt.value]
              ]),
              m(l).buttons ? (s(), h("div", nn, [
                O(a.$slots, "buttons")
              ])) : A("", !0),
              $.value && m(l).filters ? (s(), h("div", on, [
                O(a.$slots, "filters", {
                  items: d.value,
                  isLoading: C.value
                })
              ])) : A("", !0),
              Ha.value ? (s(), R(j, K({
                key: 2,
                modelValue: Ve.value,
                "onUpdate:modelValue": u[2] || (u[2] = (b) => Ve.value = b),
                editing: g.value,
                "onUpdate:editing": u[3] || (u[3] = (b) => g.value = b),
                perms: F.value,
                "onUpdate:perms": u[4] || (u[4] = (b) => F.value = b)
              }, {
                form: e.filtersForm
              }), null, 16, ["modelValue", "editing", "perms"])) : A("", !0),
              Je(ge("div", un, [
                Te.value === m(Me).Table ? (s(), h("table", rn, [
                  e.hideTableHeader ? A("", !0) : (s(), h("thead", sn, [
                    ge("tr", null, [
                      st.value && g.value ? (s(), h("th", dn)) : A("", !0),
                      e.addNavigation && g.value ? (s(), h("th", cn)) : A("", !0),
                      (s(!0), h(P, null, de(ne.value, (b) => (s(), h(P, null, [
                        Ge.value.indexOf(b.key) === -1 ? (s(), R(_l, {
                          key: 0,
                          column: b,
                          "sort-by": k.value,
                          "sort-direction": I.value,
                          "amount-of-columns": e.columns.length,
                          items: d.value,
                          onClick: (f) => N(b)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : A("", !0)
                      ], 64))), 256))
                    ])
                  ])),
                  ge("tbody", {
                    ref_key: "tableBody",
                    ref: S,
                    id: "lkt-table-body-" + m(ee),
                    class: Y(e.itemsContainerClass)
                  }, [
                    (s(!0), h(P, null, de(d.value, (b, f) => Je((s(), R(Ql, {
                      modelValue: d.value[f],
                      "onUpdate:modelValue": (L) => d.value[f] = L,
                      key: Ft(b, f),
                      i: f,
                      "is-draggable": se(b),
                      sortable: st.value,
                      "visible-columns": ne.value,
                      "empty-columns": Ge.value,
                      "add-navigation": e.addNavigation,
                      "latest-row": f + 1 === Lt.value,
                      "can-drop": ie.value && g.value,
                      "can-edit": dt.value && Q.value && g.value,
                      "can-read": fe.value,
                      "can-create": te.value,
                      "edit-mode-enabled": g.value,
                      "has-inline-edit-perm": pt.value,
                      "row-display-type": e.rowDisplayType,
                      "render-drag": ja.value,
                      "disabled-drag": za.value,
                      "is-loading": C.value,
                      "item-container-class": e.itemContainerClass,
                      "item-slot-component": Ye.value,
                      "item-slot-data": Pt.value,
                      "item-slot-events": e.itemSlotEvents,
                      permissions: F.value,
                      onClick: ae,
                      onItemUp: $a,
                      onItemDown: Fa,
                      onItemDrop: kt
                    }, nl({ _: 2 }, [
                      m(l)[`item-${f}`] && ga(a.row, f) ? {
                        name: `item-${f}`,
                        fn: H((L) => [
                          O(a.$slots, `item-${f}`, me({
                            [e.slotItemVar || ""]: L.item,
                            index: f,
                            editing: L.editing,
                            canCreate: L.canCreate,
                            canRead: L.canRead,
                            canUpdate: L.canUpdate,
                            canDrop: L.canDrop,
                            isLoading: L.isLoading,
                            doDrop: L.doDrop
                          }))
                        ]),
                        key: "0"
                      } : m(l).item && ga(a.row, f) ? {
                        name: "item",
                        fn: H((L) => [
                          O(a.$slots, "item", me({
                            [e.slotItemVar || ""]: L.item,
                            index: f,
                            editing: L.editing,
                            canCreate: L.canCreate,
                            canRead: L.canRead,
                            canUpdate: L.canUpdate,
                            canDrop: L.canDrop,
                            isLoading: L.isLoading,
                            doDrop: L.doDrop
                          }))
                        ]),
                        key: "1"
                      } : void 0,
                      de(Kt.value, (L) => ({
                        name: L,
                        fn: H((gt) => [
                          O(a.$slots, L, me({
                            [e.slotItemVar || ""]: gt.item,
                            value: gt.value,
                            column: gt.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class", "item-slot-component", "item-slot-data", "item-slot-events", "permissions"])), [
                      [Qe, wt(d.value[f], f)]
                    ])), 128))
                  ], 10, vn)
                ])) : Te.value === m(Me).Item ? (s(), h("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: S,
                  id: "lkt-table-body-" + m(ee),
                  class: Y(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (s(!0), h(P, null, de(d.value, (b, f) => (s(), h(P, {
                    key: Ft(b, f)
                  }, [
                    !e.skipTableItemsContainer && wt(b, f) ? (s(), h("div", {
                      key: 0,
                      class: Y(["lkt-table-item", Ut(b, f)]),
                      style: ka(va(b, f)),
                      "data-i": f
                    }, [
                      e.sortable && g.value ? (s(), h("div", {
                        key: 0,
                        class: "handle",
                        "data-i": f
                      }, [...u[7] || (u[7] = [
                        ge("i", { class: "lkt-icn-drag-indicator" }, null, -1)
                      ])], 8, gn)) : A("", !0),
                      Ye.value ? (s(), R(ye(Ye.value), K({
                        key: 1,
                        ref_for: !0
                      }, {
                        item: b,
                        index: f,
                        editing: g.value,
                        perms: F.value,
                        data: Pt.value,
                        events: e.itemSlotEvents
                      }), null, 16)) : O(a.$slots, "item", me({
                        key: 2,
                        [e.slotItemVar || ""]: b,
                        index: f,
                        editing: g.value,
                        canCreate: te.value,
                        canRead: fe.value,
                        canUpdate: Q.value,
                        canDrop: ie.value,
                        isLoading: C.value,
                        doDrop: () => kt(f)
                      }))
                    ], 14, mn)) : wt(b, f) ? O(a.$slots, "item", me({
                      key: 1,
                      class: Ut(b, f),
                      dataI: f,
                      [e.slotItemVar || ""]: b,
                      index: f,
                      editing: g.value,
                      canCreate: te.value,
                      canRead: fe.value,
                      canUpdate: Q.value,
                      canDrop: ie.value,
                      isLoading: C.value,
                      doDrop: () => kt(f)
                    })) : A("", !0)
                  ], 64))), 128))
                ], 10, fn)) : Te.value === m(Me).Accordion ? (s(), h("div", {
                  key: 2,
                  ref_key: "tableBody",
                  ref: S,
                  id: "lkt-table-body-" + m(ee),
                  class: Y(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (s(!0), h(P, null, de(d.value, (b, f) => (s(), h(P, null, [
                    [m(xe).Auto, m(xe).PreferCustomItem].includes(e.rowDisplayType) && m(l)[ft(b, f)] ? O(a.$slots, ft(b, f), {
                      key: 0,
                      item: b,
                      index: f,
                      editing: g.value,
                      isLoading: C.value
                    }) : [m(xe).Auto, m(xe).PreferCustomItem].includes(e.rowDisplayType) && m(l)[`item-${f}`] ? O(a.$slots, `item-${f}`, {
                      key: 1,
                      item: b,
                      index: f,
                      editing: g.value,
                      isLoading: C.value
                    }) : (s(), h(P, { key: 2 }, [
                      wt(b, f) ? (s(), R(z, K({
                        modelValue: v.value[f],
                        "onUpdate:modelValue": (L) => v.value[f] = L,
                        class: ["lkt-table-item", Ut(b, f)],
                        "data-i": f,
                        key: Ft(b, f)
                      }, { ref_for: !0 }, {
                        ...e.accordion,
                        title: Pa(b)
                      }, {
                        "onUpdate:modelValue": (L) => Ja(L, f)
                      }), {
                        header: H(() => [
                          Ce(Tt, {
                            modelValue: d.value[f],
                            "onUpdate:modelValue": (L) => d.value[f] = L,
                            i: f,
                            column: qe.value,
                            columns: ne.value,
                            "edit-mode-enabled": g.value,
                            "has-inline-edit-perm": pt.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])
                        ]),
                        default: H(() => [
                          (s(!0), h(P, null, de(ne.value, (L) => {
                            var gt, ha;
                            return s(), h(P, null, [
                              L.key !== ((gt = qe.value) == null ? void 0 : gt.key) && a.$slots[L.key] && m(Gt)(L, d.value[f]) ? O(a.$slots, L.key, {
                                key: 0,
                                value: d.value[f][L.key],
                                item: d.value[f],
                                column: L,
                                i: f
                              }) : (s(), h(P, { key: 1 }, [
                                L.key !== ((ha = qe.value) == null ? void 0 : ha.key) ? (s(), R(Tt, {
                                  key: 0,
                                  modelValue: d.value[f],
                                  "onUpdate:modelValue": (Qa) => d.value[f] = Qa,
                                  i: f,
                                  column: L,
                                  columns: ne.value,
                                  "edit-mode-enabled": g.value,
                                  "has-inline-edit-perm": pt.value
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])) : A("", !0)
                              ], 64))
                            ], 64);
                          }), 256))
                        ]),
                        _: 2
                      }, 1040, ["modelValue", "onUpdate:modelValue", "class", "data-i"])) : A("", !0)
                    ], 64))
                  ], 64))), 256))
                ], 10, yn)) : Ua.value ? (s(), R(ye(Te.value), {
                  key: 3,
                  class: Y(["lkt-table-items-container", e.itemsContainerClass])
                }, {
                  default: H(() => [
                    (s(!0), h(P, null, de(d.value, (b, f) => (s(), h(P, {
                      key: Ft(b, f)
                    }, [
                      wt(b, f) ? (s(), h("li", {
                        key: 0,
                        class: Y(["lkt-table-item", Ut(b, f)]),
                        "data-i": f,
                        style: ka(va(b, f))
                      }, [
                        Ye.value ? (s(), R(ye(Ye.value), K({
                          key: 0,
                          ref_for: !0
                        }, {
                          item: b,
                          index: f,
                          editing: g.value,
                          perms: F.value,
                          data: Pt.value,
                          events: e.itemSlotEvents
                        }), null, 16)) : O(a.$slots, "item", me({
                          key: 1,
                          [e.slotItemVar || ""]: b,
                          index: f,
                          editing: g.value,
                          canCreate: te.value,
                          canRead: fe.value,
                          canUpdate: Q.value,
                          canDrop: ie.value,
                          isLoading: C.value,
                          doDrop: () => kt(f)
                        }))
                      ], 14, pn)) : A("", !0)
                    ], 64))), 128))
                  ]),
                  _: 3
                }, 8, ["class"])) : Te.value === m(Me).Carousel ? (s(), h("div", {
                  key: 4,
                  ref_key: "tableBody",
                  ref: S,
                  id: "lkt-table-body-" + m(ee),
                  class: Y(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  Ce(m(xl), K({
                    modelValue: G.value,
                    "onUpdate:modelValue": u[5] || (u[5] = (b) => G.value = b)
                  }, e.carousel, {
                    "wrap-around": ((oe = e.carousel) == null ? void 0 : oe.infinite) === !0
                  }), {
                    addons: H(() => [
                      Ce(m(Ll)),
                      Ce(m(Ml))
                    ]),
                    default: H(() => [
                      (s(!0), h(P, null, de(Xt.value, (b, f) => (s(), R(m(Ta), {
                        key: b,
                        index: f
                      }, {
                        default: H(() => [
                          ge("div", hn, [
                            O(a.$slots, b)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (s(!0), h(P, null, de(d.value, (b, f) => (s(), R(m(Ta), {
                        key: a.slide,
                        index: f
                      }, {
                        default: H(() => [
                          ge("div", kn, [
                            Ye.value ? (s(), R(ye(Ye.value), K({
                              key: 0,
                              ref_for: !0
                            }, {
                              item: b,
                              index: f,
                              editing: g.value,
                              perms: F.value,
                              data: Pt.value,
                              events: e.itemSlotEvents
                            }), null, 16)) : O(a.$slots, "item", me({
                              key: 1,
                              [e.slotItemVar || ""]: b,
                              index: f,
                              editing: g.value,
                              canCreate: te.value,
                              canRead: fe.value,
                              canUpdate: Q.value,
                              canDrop: ie.value,
                              isLoading: C.value,
                              doDrop: () => kt(f)
                            }))
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128))
                    ]),
                    _: 3
                  }, 16, ["modelValue", "wrap-around"])
                ], 10, bn)) : Te.value === m(Me).Calendar ? (s(), h("div", {
                  key: 5,
                  ref_key: "tableBody",
                  ref: S,
                  id: "lkt-table-body-" + m(ee),
                  class: Y(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  Ce(Pe, me(Aa({
                    ...e.calendar,
                    items: Ya.value,
                    events: Wa
                  })), null, 16)
                ], 10, Cn)) : A("", !0)
              ], 512), [
                [Qe, Wt.value]
              ]),
              !C.value && d.value.length === 0 && (m(l).empty || Qt.value || e.noResultsText) ? (s(), h("div", Sn, [
                m(l).empty ? O(a.$slots, "empty", { key: 0 }) : Qt.value && typeof ma.value == "object" ? (s(), R(ye(fa.value), me(K({ key: 1 }, ma.value)), null, 16)) : Qt.value ? (s(), R(ye(fa.value), {
                  key: 2,
                  message: e.noResultsText
                }, null, 8, ["message"])) : e.noResultsText ? (s(), h(P, { key: 3 }, [
                  _e(et(e.noResultsText), 1)
                ], 64)) : A("", !0)
              ])) : A("", !0),
              C.value ? (s(), R(je, { key: 4 })) : A("", !0),
              St.value || m(l).bottomButtons ? (s(), h("div", wn, [
                ca.value && d.value.length >= e.requiredItemsForBottomCreate ? (s(), R(Dt, {
                  key: 0,
                  config: xt.value,
                  disabled: !Ct.value,
                  onClick: Ke,
                  onAppend: Xe
                }, null, 8, ["config", "disabled"])) : St.value && d.value.length >= e.requiredItemsForBottomCreate ? (s(), R(Dt, {
                  key: 1,
                  config: De.value,
                  disabled: !Ct.value,
                  onClick: Ke,
                  onAppend: Xe
                }, null, 8, ["config", "disabled"])) : A("", !0),
                O(a.$slots, "bottom-buttons")
              ])) : A("", !0),
              e.paginator && Object.keys(e.paginator).length > 0 ? (s(), R(We, K({
                key: 6,
                ref_key: "paginatorRef",
                ref: pe
              }, {
                ...e.paginator,
                resourceData: _.value,
                timelineOldestDate: W.value,
                timelineNewestDate: $e.value,
                timelineVisibleDate: At.value
              }, {
                modelValue: E.value,
                "onUpdate:modelValue": u[6] || (u[6] = (b) => E.value = b),
                onLoading: Rt,
                onPerms: Fe,
                onResponse: Vt
              }), null, 16, ["modelValue"])) : A("", !0),
              m(l)["web-element-actions"] ? O(a.$slots, "web-element-actions", { key: 7 }) : A("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, en);
    };
  }
}), Rn = {
  install: (e) => {
    e.component("lkt-table") === void 0 && e.component("lkt-table", Dn);
  }
}, Ln = (e) => (Se.navButtonSlot = e, !0), Mn = (e) => (Se.createButtonSlot = e, !0), Nn = (e) => {
  Se.defaultEmptySlot = e;
};
export {
  Fn as Column,
  Un as createColumn,
  Rn as default,
  Nl as defaultTableSorter,
  Mn as setTableCreateButtonSlot,
  Nn as setTableEmptySlot,
  Ln as setTableNavButtonSlot
};
