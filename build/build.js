import { defineComponent as le, computed as s, ref as S, shallowReactive as Pt, watch as F, watchEffect as Lt, onMounted as jt, onBeforeUnmount as wa, reactive as _t, provide as aa, h as X, useId as Ba, inject as ut, getCurrentInstance as Da, onUnmounted as Ia, onUpdated as Ta, cloneVNode as Ea, resolveComponent as Se, createBlock as $, createElementBlock as h, unref as T, openBlock as v, normalizeProps as Re, mergeProps as fe, withCtx as j, createTextVNode as lt, toDisplayString as ze, Fragment as x, withModifiers as la, createCommentVNode as A, resolveDynamicComponent as Ae, useSlots as na, normalizeClass as Q, createElementVNode as Z, createVNode as Ee, renderSlot as H, renderList as ue, withDirectives as tt, vShow as at, mergeDefaults as Aa, nextTick as yt, createSlots as Kt } from "vue";
import { __ as Va } from "lkt-i18n";
import { SortDirection as je, Column as oa, extractPropValue as Ra, ColumnType as kt, prepareResourceData as ia, TableRowType as Ze, extractI18nValue as ra, LktSettings as ke, ensureButtonConfig as Ve, TablePermission as De, PaginatorType as St, TableType as et, getDefaultValues as Na, Table as Ma, ButtonType as $t } from "lkt-vue-kernel";
import { Column as pn, createColumn as mn } from "lkt-vue-kernel";
import { replaceAll as ua, generateRandomString as La } from "lkt-string-tools";
import { DataState as _a } from "lkt-data-state";
import $a from "sortablejs";
import { time as Oa } from "lkt-date-tools";
/**
 * Vue 3 Carousel 0.14.0
 * (c) 2025
 * @license MIT
 */
const sa = ["viewport", "carousel"], wt = {
  "bottom-to-top": "btt",
  "left-to-right": "ltr",
  "right-to-left": "rtl",
  "top-to-bottom": "ttb"
}, da = [
  "ltr",
  "left-to-right",
  "rtl",
  "right-to-left",
  "ttb",
  "top-to-bottom",
  "btt",
  "bottom-to-top"
], Pa = {
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
}, ca = ["slide", "fade"], va = [
  "center",
  "start",
  "end",
  "center-even",
  "center-odd"
], U = {
  autoplay: 0,
  breakpointMode: sa[0],
  breakpoints: void 0,
  dir: da[0],
  enabled: !0,
  gap: 0,
  height: "auto",
  i18n: Pa,
  ignoreAnimations: !1,
  itemsToScroll: 1,
  itemsToShow: 1,
  modelValue: 0,
  mouseDrag: !0,
  pauseAutoplayOnHover: !1,
  preventExcessiveDragging: !1,
  slideEffect: ca[0],
  snapAlign: va[0],
  touchDrag: !0,
  transition: 300,
  wrapAround: !1
}, He = Symbol("carousel"), Fa = (e) => {
  const i = Pt([]), r = (n) => {
    n !== void 0 ? i.slice(n).forEach((l, a) => {
      var f;
      (f = l.exposed) === null || f === void 0 || f.setIndex(n + a);
    }) : i.forEach((l, a) => {
      var f;
      (f = l.exposed) === null || f === void 0 || f.setIndex(a);
    });
  };
  return {
    cleanup: () => {
      i.splice(0, i.length);
    },
    getSlides: () => i,
    registerSlide: (n, l) => {
      if (!n || n.props.isClone)
        return;
      const a = l ?? i.length;
      i.splice(a, 0, n), r(a), e("slide-registered", { slide: n, index: a });
    },
    unregisterSlide: (n) => {
      const l = i.indexOf(n);
      l !== -1 && (e("slide-unregistered", { slide: n, index: l }), i.splice(l, 1), r(l));
    }
  };
};
function Ua(e) {
  return e.length === 0 ? 0 : e.reduce((r, n) => r + n, 0) / e.length;
}
function Wt({ slides: e, position: i, toShow: r }) {
  const n = [], l = i === "before", a = l ? -r : 0, f = l ? 0 : r;
  if (e.length <= 0)
    return n;
  for (let g = a; g < f; g++) {
    const C = {
      index: l ? g : g + e.length,
      isClone: !0,
      position: i,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${i}-${g}`
    }, o = e[(g % e.length + e.length) % e.length].vnode, B = Ea(o, C);
    B.el = null, n.push(B);
  }
  return n;
}
const ja = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function xt(e) {
  if (!e.el || !(e.el instanceof Element))
    return;
  const i = e.el.querySelectorAll(ja);
  for (const r of i)
    r instanceof HTMLElement && !r.hasAttribute("disabled") && r.getAttribute("aria-hidden") !== "true" && r.setAttribute("tabindex", "-1");
}
function za(e, i) {
  return Object.keys(e).filter((r) => !i.includes(r)).reduce((r, n) => (r[n] = e[n], r), {});
}
function Ha(e) {
  const { isVertical: i, isReversed: r, dragged: n, effectiveSlideSize: l } = e, a = i ? n.y : n.x;
  if (a === 0)
    return 0;
  const f = Math.round(a / l);
  return r ? f : -f;
}
function Ie({ val: e, max: i, min: r }) {
  return i < r ? e : Math.min(Math.max(e, isNaN(r) ? e : r), isNaN(i) ? e : i);
}
function qa(e) {
  const { transform: i } = window.getComputedStyle(e);
  return i.split(/[(,)]/).slice(1, -1).map((r) => parseFloat(r));
}
function Ga(e) {
  let i = 1, r = 1;
  return e.forEach((n) => {
    const l = qa(n);
    l.length === 6 && (i /= l[0], r /= l[3]);
  }), { widthMultiplier: i, heightMultiplier: r };
}
function Xa(e, i) {
  switch (e) {
    case "start":
      return 0;
    case "center":
    case "center-odd":
      return (i - 1) / 2;
    case "center-even":
      return (i - 2) / 2;
    case "end":
      return i - 1;
    default:
      return 0;
  }
}
function Ya(e, i, r) {
  switch (e) {
    case "start":
      return 0;
    case "center":
    case "center-odd":
      return (r - i) / 2;
    case "center-even":
      return r / 2 - i;
    case "end":
      return r - i;
    default:
      return 0;
  }
}
function Ft({ slideSize: e, viewportSize: i, align: r, itemsToShow: n }) {
  return n !== void 0 ? Xa(r, n) : e !== void 0 && i !== void 0 ? Ya(r, e, i) : 0;
}
function fa(e = "", i = {}) {
  return Object.entries(i).reduce((r, [n, l]) => r.replace(`{${n}}`, String(l)), e);
}
function pa({ val: e, max: i, min: r = 0 }) {
  const n = i - r + 1;
  return ((e - r) % n + n) % n + r;
}
function Ot(e, i = 0) {
  let r = !1, n = 0, l = null;
  function a(...f) {
    if (r)
      return;
    r = !0;
    const g = () => {
      l = requestAnimationFrame((m) => {
        m - n > i ? (n = m, e(...f), r = !1) : g();
      });
    };
    g();
  }
  return a.cancel = () => {
    l && (cancelAnimationFrame(l), l = null, r = !1);
  }, a;
}
function Ct(e, i = "px") {
  if (!(e == null || e === ""))
    return typeof e == "number" || parseFloat(e).toString() === e ? `${e}${i}` : e;
}
const Ka = le({
  name: "CarouselAria",
  setup() {
    const e = ut(He);
    return e ? () => X("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, fa(e.config.i18n.itemXofY, {
      currentSlide: e.currentSlide + 1,
      slidesCount: e.slidesCount
    })) : () => "";
  }
}), Wa = {
  // time to auto advance slides in ms
  autoplay: {
    default: U.autoplay,
    type: Number
  },
  // an object to store breakpoints
  breakpoints: {
    default: U.breakpoints,
    type: Object
  },
  // controls the breakpoint mode relative to the carousel container or the viewport
  breakpointMode: {
    default: U.breakpointMode,
    validator(e) {
      return sa.includes(e);
    }
  },
  // enable/disable the carousel component
  enabled: {
    default: U.enabled,
    type: Boolean
  },
  // control the gap between slides
  gap: {
    default: U.gap,
    type: Number
  },
  // control the gap between slides
  height: {
    default: U.height,
    type: [Number, String]
  },
  ignoreAnimations: {
    default: !1,
    type: [Array, Boolean, String]
  },
  // count of items to be scrolled
  itemsToScroll: {
    default: U.itemsToScroll,
    type: Number
  },
  // count of items to showed per view
  itemsToShow: {
    default: U.itemsToShow,
    type: [Number, String]
  },
  // aria-labels and additional text labels
  i18n: {
    default: U.i18n,
    type: Object
  },
  // slide number number of initial slide
  modelValue: {
    default: void 0,
    type: Number
  },
  // toggle mouse dragging.
  mouseDrag: {
    default: U.mouseDrag,
    type: Boolean
  },
  // toggle mouse dragging.
  touchDrag: {
    default: U.touchDrag,
    type: Boolean
  },
  pauseAutoplayOnHover: {
    default: U.pauseAutoplayOnHover,
    type: Boolean
  },
  preventExcessiveDragging: {
    default: !1,
    type: Boolean,
    validator(e, i) {
      return e && i.wrapAround && console.warn('[vue3-carousel warn]: "preventExcessiveDragging" cannot be used with wrapAround. The setting will be ignored.'), !0;
    }
  },
  // control snap position alignment
  snapAlign: {
    default: U.snapAlign,
    validator(e) {
      return va.includes(e);
    }
  },
  slideEffect: {
    type: String,
    default: U.slideEffect,
    validator(e) {
      return ca.includes(e);
    }
  },
  // sliding transition time in ms
  transition: {
    default: U.transition,
    type: Number
  },
  // control the gap between slides
  dir: {
    type: String,
    default: U.dir,
    validator(e, i) {
      if (!da.includes(e))
        return !1;
      const r = e in wt ? wt[e] : e;
      return ["ttb", "btt"].includes(r) && (!i.height || i.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${e}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: U.wrapAround,
    type: Boolean
  }
}, xa = le({
  name: "VueCarousel",
  props: Wa,
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
  setup(e, { slots: i, emit: r, expose: n }) {
    var l;
    const a = Fa(r), f = a.getSlides(), g = s(() => f.length), m = S(null), C = S(null), o = S(0), B = s(() => Object.assign(Object.assign(Object.assign({}, U), za(e, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, U.i18n), e.i18n) })), c = Pt(Object.assign({}, B.value)), k = S((l = e.modelValue) !== null && l !== void 0 ? l : 0), D = S(k.value);
    F(k, (d) => D.value = d);
    const E = S(0), Ce = s(() => Math.ceil((g.value - 1) / 2)), _ = s(() => g.value - 1), ee = s(() => 0);
    let q = null, Ne = null, ne = null;
    const K = s(() => o.value + c.gap), u = s(() => {
      const d = c.dir || "ltr";
      return d in wt ? wt[d] : d;
    }), O = s(() => ["rtl", "btt"].includes(u.value)), J = s(() => ["ttb", "btt"].includes(u.value)), P = s(() => c.itemsToShow === "auto"), N = s(() => J.value ? "height" : "width");
    function we() {
      var d;
      if (!Ge.value)
        return;
      const b = (B.value.breakpointMode === "carousel" ? (d = m.value) === null || d === void 0 ? void 0 : d.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, y = Object.keys(e.breakpoints || {}).map((R) => Number(R)).sort((R, G) => +G - +R), w = {};
      y.some((R) => b >= R ? (Object.assign(w, e.breakpoints[R]), w.i18n && Object.assign(w.i18n, B.value.i18n, e.breakpoints[R].i18n), !0) : !1), Object.assign(c, B.value, w);
    }
    const st = Ot(() => {
      we(), se(), pe();
    }), Me = Pt(/* @__PURE__ */ new Set()), z = S([]);
    function Bt({ widthMultiplier: d, heightMultiplier: b }) {
      z.value = f.map((y) => {
        var w;
        const R = (w = y.exposed) === null || w === void 0 ? void 0 : w.getBoundingRect();
        return {
          width: R.width * d,
          height: R.height * b
        };
      });
    }
    const Le = S({
      width: 0,
      height: 0
    });
    function Dt({ widthMultiplier: d, heightMultiplier: b }) {
      var y;
      const w = ((y = C.value) === null || y === void 0 ? void 0 : y.getBoundingClientRect()) || { width: 0, height: 0 };
      Le.value = {
        width: w.width * d,
        height: w.height * b
      };
    }
    function pe() {
      if (!C.value)
        return;
      const d = Ga(Me);
      if (Dt(d), Bt(d), P.value)
        o.value = Ua(z.value.map((b) => b[N.value]));
      else {
        const b = Number(c.itemsToShow), y = (b - 1) * c.gap;
        o.value = (Le.value[N.value] - y) / b;
      }
    }
    function se() {
      !c.wrapAround && g.value > 0 && (k.value = Ie({
        val: k.value,
        max: _.value,
        min: ee.value
      })), P.value || (c.itemsToShow = Ie({
        val: Number(c.itemsToShow),
        max: g.value,
        min: 1
      }));
    }
    const _e = s(() => typeof e.ignoreAnimations == "string" ? e.ignoreAnimations.split(",") : Array.isArray(e.ignoreAnimations) ? e.ignoreAnimations : e.ignoreAnimations ? !1 : []);
    Lt(() => se()), Lt(() => {
      pe();
    });
    let de;
    const qe = (d) => {
      const b = d.target;
      if (!(!(b != null && b.contains(m.value)) || Array.isArray(_e.value) && _e.value.includes(d.animationName)) && (Me.add(b), !de)) {
        const y = () => {
          de = requestAnimationFrame(() => {
            pe(), y();
          });
        };
        y();
      }
    }, dt = (d) => {
      const b = d.target;
      b && Me.delete(b), de && Me.size === 0 && (cancelAnimationFrame(de), pe());
    }, Ge = S(!1);
    typeof document < "u" && Lt(() => {
      Ge.value && _e.value !== !1 ? (document.addEventListener("animationstart", qe), document.addEventListener("animationend", dt)) : (document.removeEventListener("animationstart", qe), document.removeEventListener("animationend", dt));
    }), jt(() => {
      Ge.value = !0, we(), ge(), m.value && (ne = new ResizeObserver(st), ne.observe(m.value)), r("init");
    }), wa(() => {
      Ge.value = !1, a.cleanup(), Ne && clearTimeout(Ne), de && cancelAnimationFrame(de), q && clearInterval(q), ne && (ne.disconnect(), ne = null), typeof document < "u" && vt(), m.value && (m.value.removeEventListener("transitionend", pe), m.value.removeEventListener("animationiteration", pe));
    });
    let me = !1;
    const Xe = { x: 0, y: 0 }, ie = _t({ x: 0, y: 0 }), Ye = S(!1), Ke = S(!1), It = () => {
      Ye.value = !0;
    }, ot = () => {
      Ye.value = !1;
    }, ct = Ot((d) => {
      if (!d.ctrlKey)
        switch (d.key) {
          case "ArrowLeft":
          case "ArrowUp":
            J.value === d.key.endsWith("Up") && (O.value ? Pe(!0) : Fe(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            J.value === d.key.endsWith("Down") && (O.value ? Fe(!0) : Pe(!0));
            break;
        }
    }, 200), Tt = () => {
      document.addEventListener("keydown", ct);
    }, vt = () => {
      document.removeEventListener("keydown", ct);
    };
    function ft(d) {
      const b = d.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(b) || be.value || (me = d.type === "touchstart", !me && (d.preventDefault(), d.button !== 0)))
        return;
      Xe.x = "touches" in d ? d.touches[0].clientX : d.clientX, Xe.y = "touches" in d ? d.touches[0].clientY : d.clientY;
      const y = me ? "touchmove" : "mousemove", w = me ? "touchend" : "mouseup";
      document.addEventListener(y, $e, { passive: !1 }), document.addEventListener(w, We, { passive: !0 });
    }
    const $e = Ot((d) => {
      Ke.value = !0;
      const b = "touches" in d ? d.touches[0].clientX : d.clientX, y = "touches" in d ? d.touches[0].clientY : d.clientY;
      ie.x = b - Xe.x, ie.y = y - Xe.y;
      const w = Ha({
        isVertical: J.value,
        isReversed: O.value,
        dragged: ie,
        effectiveSlideSize: K.value
      });
      D.value = c.wrapAround ? k.value + w : Ie({
        val: k.value + w,
        max: _.value,
        min: ee.value
      }), r("drag", { deltaX: ie.x, deltaY: ie.y });
    });
    function We() {
      if ($e.cancel(), D.value !== k.value && !me) {
        const y = (w) => {
          w.preventDefault(), window.removeEventListener("click", y);
        };
        window.addEventListener("click", y);
      }
      Be(D.value), ie.x = 0, ie.y = 0, Ke.value = !1;
      const d = me ? "touchmove" : "mousemove", b = me ? "touchend" : "mouseup";
      document.removeEventListener(d, $e), document.removeEventListener(b, We);
    }
    function ge() {
      !c.autoplay || c.autoplay <= 0 || (q = setInterval(() => {
        c.pauseAutoplayOnHover && Ye.value || Pe();
      }, c.autoplay));
    }
    function Oe() {
      q && (clearInterval(q), q = null);
    }
    function ce() {
      Oe(), ge();
    }
    const be = S(!1);
    function Be(d, b = !1) {
      if (!b && be.value)
        return;
      let y = d, w = d;
      E.value = k.value, c.wrapAround ? w = pa({
        val: y,
        max: _.value,
        min: ee.value
      }) : y = Ie({
        val: y,
        max: _.value,
        min: ee.value
      }), r("slide-start", {
        slidingToIndex: d,
        currentSlideIndex: k.value,
        prevSlideIndex: E.value,
        slidesCount: g.value
      }), Oe(), be.value = !0, k.value = y, w !== y && he.pause(), r("update:modelValue", w), Ne = setTimeout(() => {
        c.wrapAround && w !== y && (he.resume(), k.value = w, r("loop", {
          currentSlideIndex: k.value,
          slidingToIndex: d
        })), r("slide-end", {
          currentSlideIndex: k.value,
          prevSlideIndex: E.value,
          slidesCount: g.value
        }), be.value = !1, ce();
      }, c.transition);
    }
    function Pe(d = !1) {
      Be(k.value + c.itemsToScroll, d);
    }
    function Fe(d = !1) {
      Be(k.value - c.itemsToScroll, d);
    }
    function pt() {
      we(), se(), pe(), ce();
    }
    F(() => [B.value, e.breakpoints], () => we(), { deep: !0 }), F(() => e.autoplay, () => ce());
    const he = F(() => e.modelValue, (d) => {
      d !== k.value && Be(Number(d), !0);
    });
    r("before-init");
    const Ue = s(() => {
      if (!c.wrapAround)
        return { before: 0, after: 0 };
      if (P.value)
        return { before: f.length, after: f.length };
      const d = Number(c.itemsToShow), b = Math.ceil(d + (c.itemsToScroll - 1)), y = b - D.value, w = b - (g.value - (D.value + 1));
      return {
        before: Math.max(0, y),
        after: Math.max(0, w)
      };
    }), xe = s(() => Ue.value.before ? P.value ? z.value.slice(-1 * Ue.value.before).reduce((d, b) => d + b[N.value] + c.gap, 0) * -1 : Ue.value.before * K.value * -1 : 0), it = s(() => {
      var d;
      if (P.value) {
        const b = (k.value % f.length + f.length) % f.length;
        return Ft({
          slideSize: (d = z.value[b]) === null || d === void 0 ? void 0 : d[N.value],
          viewportSize: Le.value[N.value],
          align: c.snapAlign
        });
      }
      return Ft({
        align: c.snapAlign,
        itemsToShow: +c.itemsToShow
      });
    }), Je = s(() => {
      let d = 0;
      if (P.value) {
        if (k.value < 0 ? d = z.value.slice(k.value).reduce((b, y) => b + y[N.value] + c.gap, 0) * -1 : d = z.value.slice(0, k.value).reduce((b, y) => b + y[N.value] + c.gap, 0), d -= it.value, !c.wrapAround) {
          const b = z.value.reduce((y, w) => y + w[N.value] + c.gap, 0) - Le.value[N.value] - c.gap;
          d = Ie({
            val: d,
            max: b,
            min: 0
          });
        }
      } else {
        let b = k.value - it.value;
        c.wrapAround || (b = Ie({
          val: b,
          max: g.value - +c.itemsToShow,
          min: 0
        })), d = b * K.value;
      }
      return d * (O.value ? 1 : -1);
    }), ve = s(() => {
      var d, b;
      if (!P.value) {
        const R = k.value - it.value;
        return c.wrapAround ? {
          min: Math.floor(R),
          max: Math.ceil(R + Number(c.itemsToShow) - 1)
        } : {
          min: Math.floor(Ie({
            val: R,
            max: g.value - Number(c.itemsToShow),
            min: 0
          })),
          max: Math.ceil(Ie({
            val: R + Number(c.itemsToShow) - 1,
            max: g.value - 1,
            min: 0
          }))
        };
      }
      let y = 0;
      {
        let R = 0, G = 0 - Ue.value.before;
        const te = Math.abs(Je.value + xe.value);
        for (; R <= te; ) {
          const oe = (G % f.length + f.length) % f.length;
          R += ((d = z.value[oe]) === null || d === void 0 ? void 0 : d[N.value]) + c.gap, G++;
        }
        y = G - 1;
      }
      let w = 0;
      {
        let R = y, G = 0;
        for (R < 0 ? G = z.value.slice(0, R).reduce((te, oe) => te + oe[N.value] + c.gap, 0) - Math.abs(Je.value + xe.value) : G = z.value.slice(0, R).reduce((te, oe) => te + oe[N.value] + c.gap, 0) - Math.abs(Je.value); G < Le.value[N.value]; ) {
          const te = (R % f.length + f.length) % f.length;
          G += ((b = z.value[te]) === null || b === void 0 ? void 0 : b[N.value]) + c.gap, R++;
        }
        w = R - 1;
      }
      return {
        min: Math.floor(y),
        max: Math.ceil(w)
      };
    }), Et = s(() => {
      if (c.slideEffect === "fade")
        return;
      const d = J.value ? "Y" : "X", b = J.value ? ie.y : ie.x;
      let y = Je.value + b;
      if (!c.wrapAround && c.preventExcessiveDragging) {
        let w = 0;
        P.value ? w = z.value.reduce((te, oe) => te + oe[N.value], 0) : w = (g.value - Number(c.itemsToShow)) * K.value;
        const R = O.value ? 0 : -1 * w, G = O.value ? w : 0;
        y = Ie({
          val: y,
          min: R,
          max: G
        });
      }
      return `translate${d}(${y}px)`;
    }), At = s(() => ({
      "--vc-transition-duration": be.value ? Ct(c.transition, "ms") : void 0,
      "--vc-slide-gap": Ct(c.gap),
      "--vc-carousel-height": Ct(c.height),
      "--vc-cloned-offset": Ct(xe.value)
    })), rt = { slideTo: Be, next: Pe, prev: Fe }, mt = _t({
      activeSlide: D,
      config: c,
      currentSlide: k,
      isSliding: be,
      isVertical: J,
      maxSlide: _,
      minSlide: ee,
      nav: rt,
      normalizedDir: u,
      slideRegistry: a,
      slideSize: o,
      slides: f,
      slidesCount: g,
      viewport: C,
      visibleRange: ve
    });
    aa(He, mt);
    const Qe = _t({
      config: c,
      currentSlide: k,
      maxSlide: _,
      middleSlide: Ce,
      minSlide: ee,
      slideSize: o,
      slidesCount: g
    });
    return n({
      data: Qe,
      nav: rt,
      next: Pe,
      prev: Fe,
      restartCarousel: pt,
      slideTo: Be,
      updateBreakpointsConfig: we,
      updateSlideSize: pe,
      updateSlidesData: se
    }), () => {
      var d;
      const b = i.default || i.slides, y = (b == null ? void 0 : b(Qe)) || [], { before: w, after: R } = Ue.value, G = Wt({
        slides: f,
        position: "before",
        toShow: w
      }), te = Wt({
        slides: f,
        position: "after",
        toShow: R
      }), oe = [...G, ...y, ...te];
      if (!c.enabled || !oe.length)
        return X("section", {
          ref: m,
          class: ["carousel", "is-disabled"]
        }, oe);
      const gt = ((d = i.addons) === null || d === void 0 ? void 0 : d.call(i, Qe)) || [], Vt = X("ol", {
        class: "carousel__track",
        style: { transform: Et.value },
        onMousedownCapture: c.mouseDrag ? ft : null,
        onTouchstartPassiveCapture: c.touchDrag ? ft : null
      }, oe), Rt = X("div", { class: "carousel__viewport", ref: C }, Vt);
      return X("section", {
        ref: m,
        class: [
          "carousel",
          `is-${u.value}`,
          `is-effect-${c.slideEffect}`,
          {
            "is-vertical": J.value,
            "is-sliding": be.value,
            "is-dragging": Ke.value,
            "is-hover": Ye.value
          }
        ],
        dir: u.value,
        style: At.value,
        "aria-label": c.i18n.ariaGallery,
        tabindex: "0",
        onFocus: Tt,
        onBlur: vt,
        onMouseenter: It,
        onMouseleave: ot
      }, [Rt, gt, X(Ka)]);
    };
  }
});
var Ut;
(function(e) {
  e.arrowDown = "arrowDown", e.arrowLeft = "arrowLeft", e.arrowRight = "arrowRight", e.arrowUp = "arrowUp";
})(Ut || (Ut = {}));
const Jt = (e) => `icon${e.charAt(0).toUpperCase() + e.slice(1)}`, Ja = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function Qa(e) {
  return e in Ut;
}
const Qt = (e) => e && Qa(e), Zt = le({
  props: {
    name: {
      type: String,
      required: !0,
      validator: Qt
    },
    title: {
      type: String,
      default: (e) => e.name ? U.i18n[Jt(e.name)] : ""
    }
  },
  setup(e) {
    const i = ut(He, null);
    return () => {
      const r = e.name;
      if (!r || !Qt(r))
        return;
      const n = Ja[r], l = X("path", { d: n }), a = (i == null ? void 0 : i.config.i18n[Jt(r)]) || e.title, f = X("title", a);
      return X("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": a
      }, [f, l]);
    };
  }
}), Za = le({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(e, { slots: i, attrs: r }) {
    const n = ut(He);
    if (!n)
      return () => "";
    const { next: l, prev: a } = i, f = () => ({
      btt: "arrowDown",
      ltr: "arrowLeft",
      rtl: "arrowRight",
      ttb: "arrowUp"
    })[n.normalizedDir], g = () => ({
      btt: "arrowUp",
      ltr: "arrowRight",
      rtl: "arrowLeft",
      ttb: "arrowDown"
    })[n.normalizedDir], m = s(() => !n.config.wrapAround && n.currentSlide <= n.minSlide), C = s(() => !n.config.wrapAround && n.currentSlide >= n.maxSlide);
    return () => {
      const { i18n: o } = n.config, B = X("button", Object.assign(Object.assign({ type: "button", disabled: m.value, "aria-label": o.ariaPreviousSlide, title: o.ariaPreviousSlide, onClick: n.nav.prev }, r), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": m.value },
        r.class
      ] }), (a == null ? void 0 : a()) || X(Zt, { name: f() })), c = X("button", Object.assign(Object.assign({ type: "button", disabled: C.value, "aria-label": o.ariaNextSlide, title: o.ariaNextSlide, onClick: n.nav.next }, r), { class: [
        "carousel__next",
        { "carousel__next--disabled": C.value },
        r.class
      ] }), (l == null ? void 0 : l()) || X(Zt, { name: g() }));
      return [B, c];
    };
  }
}), el = le({
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
    const i = ut(He);
    if (!i)
      return () => "";
    const r = s(() => i.config.itemsToShow), n = s(() => Ft({
      align: i.config.snapAlign,
      itemsToShow: r.value
    })), l = s(() => e.paginateByItemsToShow && r.value > 1), a = s(() => Math.ceil((i.activeSlide - n.value) / r.value)), f = s(() => Math.ceil(i.slidesCount / r.value)), g = (m) => pa(l.value ? {
      val: a.value,
      max: f.value - 1,
      min: 0
    } : {
      val: i.activeSlide,
      max: i.maxSlide,
      min: i.minSlide
    }) === m;
    return () => {
      var m, C;
      const o = [];
      for (let B = l.value ? 0 : i.minSlide; B <= (l.value ? f.value - 1 : i.maxSlide); B++) {
        const c = fa(i.config.i18n[l.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: B + 1
        }), k = g(B), D = X("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": k
          },
          "aria-label": c,
          "aria-pressed": k,
          "aria-controls": (C = (m = i.slides[B]) === null || m === void 0 ? void 0 : m.exposed) === null || C === void 0 ? void 0 : C.id,
          title: c,
          disabled: e.disableOnClick,
          onClick: () => i.nav.slideTo(l.value ? Math.floor(B * +i.config.itemsToShow + n.value) : B)
        }), E = X("li", { class: "carousel__pagination-item", key: B }, D);
        o.push(E);
      }
      return X("ol", { class: "carousel__pagination" }, o);
    };
  }
}), ea = le({
  name: "CarouselSlide",
  props: {
    id: {
      type: String,
      default: (e) => e.isClone ? void 0 : Ba()
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
  setup(e, { attrs: i, slots: r, expose: n }) {
    const l = ut(He);
    if (aa(He, void 0), !l)
      return () => "";
    const a = S(e.index), f = (D) => {
      a.value = D;
    }, g = Da(), m = () => {
      const D = g.vnode.el;
      return D ? D.getBoundingClientRect() : { width: 0, height: 0 };
    };
    n({
      id: e.id,
      setIndex: f,
      getBoundingRect: m
    });
    const C = s(() => a.value === l.activeSlide), o = s(() => a.value === l.activeSlide - 1), B = s(() => a.value === l.activeSlide + 1), c = s(() => a.value >= l.visibleRange.min && a.value <= l.visibleRange.max), k = s(() => {
      if (l.config.itemsToShow === "auto")
        return;
      const D = l.config.itemsToShow, E = l.config.gap > 0 && D > 1 ? `calc(${100 / D}% - ${l.config.gap * (D - 1) / D}px)` : `${100 / D}%`;
      return l.isVertical ? { height: E } : { width: E };
    });
    return l.slideRegistry.registerSlide(g, e.index), Ia(() => {
      l.slideRegistry.unregisterSlide(g);
    }), e.isClone && (jt(() => {
      xt(g.vnode);
    }), Ta(() => {
      xt(g.vnode);
    })), () => {
      var D, E;
      return l.config.enabled ? X("li", {
        style: [i.style, Object.assign({}, k.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": e.isClone,
          "carousel__slide--visible": c.value,
          "carousel__slide--active": C.value,
          "carousel__slide--prev": o.value,
          "carousel__slide--next": B.value,
          "carousel__slide--sliding": l.isSliding
        },
        onFocusin: () => {
          l.viewport && (l.viewport.scrollLeft = 0), l.nav.slideTo(a.value);
        },
        id: e.isClone ? void 0 : e.id,
        "aria-hidden": e.isClone || void 0
      }, (E = r.default) === null || E === void 0 ? void 0 : E.call(r, {
        currentIndex: a.value,
        isActive: C.value,
        isClone: e.isClone,
        isPrev: o.value,
        isNext: B.value,
        isSliding: l.isSliding,
        isVisible: c.value
      })) : (D = r.default) === null || D === void 0 ? void 0 : D.call(r);
    };
  }
}), tl = (e, i, r, n) => {
  if (!r) return 0;
  let l = String(e[r.key]).toLowerCase(), a = String(i[r.key]).toLowerCase();
  if (n === je.Asc) {
    if (l > a) return 1;
    if (a > l) return -1;
  } else {
    if (l > a) return -1;
    if (a > l) return 1;
  }
  return 0;
}, nt = (e, i, r, n = []) => {
  if (e.extractTitleFromColumn) {
    let l = n.find((a) => a.key === e.extractTitleFromColumn);
    if (l)
      return nt(l, i, r, n);
  }
  if (e.formatter && typeof e.formatter == "function") {
    let l = e.formatter(i[e.key], i, e, r);
    return l.startsWith("__:") ? Va(l.substring(3)) : l;
  }
  return i[e.key];
}, al = (e, i, r) => {
  if (!e.colspan) return -1;
  let n = i;
  return r.forEach((l) => {
    let a = zt(e, l);
    a > 0 && a < n && (n = a);
  }), n;
}, zt = (e, i) => e.colspan === !1 ? !1 : typeof e.colspan == "function" ? e.colspan(i) : e.colspan, ll = (e, i) => typeof e.preferSlot > "u" ? !0 : e.preferSlot === !1 ? !1 : typeof e.preferSlot == "function" ? e.preferSlot(i) : !0, nl = (e, i, r) => {
  if (typeof e != "object" || !e.key || i.indexOf(e.key) > -1) return !1;
  let n = zt(e, r);
  return typeof e.colspan > "u" ? !0 : (typeof e.colspan < "u" && (typeof e.colspan == "function" ? n = parseInt(e.colspan(r)) : n = parseInt(e.colspan)), n > 0);
}, ol = (e = []) => {
  if (e.length > 0) {
    for (let i = 0; i < e.length; ++i)
      if (e[i].sortable) return e[i].key;
  }
  return "";
}, il = (e, i) => {
  if (e.length > 0) {
    for (let r = 0; r < e.length; ++r)
      if (e[r].key === i) return e[r];
  }
  return null;
}, ma = (e) => e.type ? `is-${e.type}` : "", ga = /* @__PURE__ */ le({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new oa() },
    columns: { default: () => [] },
    i: { default: 0 },
    editModeEnabled: { type: Boolean, default: !1 },
    hasInlineEditPerm: { type: Boolean, default: !1 }
  },
  emits: [
    "update:modelValue"
  ],
  setup(e, { emit: i }) {
    const r = i, n = e, l = S(n.modelValue), a = S(l.value[n.column.key]), f = S(null);
    F(a, (o) => {
      const B = JSON.parse(JSON.stringify(l.value));
      B[n.column.key] = o, r("update:modelValue", B);
    }), F(() => n.modelValue, (o) => {
      l.value = o, a.value = l.value[n.column.key];
    });
    const g = s(() => ({ ...n.column.slotData, item: l.value })), m = s(() => {
      var o, B, c, k;
      if ((o = n.column.field) != null && o.modalData && typeof ((B = n.column.field) == null ? void 0 : B.modalData) == "object")
        for (let D in n.column.field.modalData)
          if (typeof ((c = n.column.field) == null ? void 0 : c.modalData[D]) == "string" && n.column.field.modalData[D].startsWith("prop:")) {
            let E = n.column.field.modalData[D].substring(5);
            l.value[E];
          } else
            n.column.field.modalData[D];
      return (k = n.column.field) == null ? void 0 : k.modalData;
    }), C = s(() => typeof n.column.field == "string" && n.column.field.startsWith("prop:") ? Ra(n.column.field, l.value) : n.column.field);
    return (o, B) => {
      var E, Ce, _, ee;
      const c = Se("lkt-anchor"), k = Se("lkt-button"), D = Se("lkt-field");
      return o.column.type === T(kt).Anchor ? (v(), $(c, Re(fe({ key: 0 }, o.column.anchor)), {
        default: j(() => [
          lt(ze(T(nt)(o.column, l.value, o.i)), 1)
        ]),
        _: 1
      }, 16)) : o.column.type === T(kt).Button ? (v(), $(k, fe({ key: 1 }, o.column.button, { prop: l.value }), {
        default: j(() => [
          lt(ze(T(nt)(o.column, l.value, o.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : o.column.type === T(kt).Field && o.hasInlineEditPerm ? (v(), $(D, fe({ key: 2 }, C.value, {
        "read-mode": !o.column.editable || !o.editModeEnabled,
        ref: (q) => f.value = q,
        "slot-data": g.value,
        label: ((E = o.column.field) == null ? void 0 : E.type) === "switch" || ((Ce = o.column.field) == null ? void 0 : Ce.type) === "check" ? o.column.label : "",
        "modal-data": m.value,
        prop: l.value,
        modelValue: a.value,
        "onUpdate:modelValue": B[0] || (B[0] = (q) => a.value = q)
      }), null, 16, ["read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : o.column.type === T(kt).Field ? (v(), $(D, fe({ key: 3 }, C.value, {
        "read-mode": "",
        ref: (q) => f.value = q,
        "slot-data": g.value,
        label: ((_ = o.column.field) == null ? void 0 : _.type) === "switch" || ((ee = o.column.field) == null ? void 0 : ee.type) === "check" ? o.column.label : "",
        "modal-data": m.value,
        prop: l.value,
        "model-value": a.value
      }), null, 16, ["slot-data", "label", "modal-data", "prop", "model-value"])) : (v(), h(x, { key: 4 }, [
        lt(ze(T(nt)(o.column, l.value, o.i, o.columns)), 1)
      ], 64));
    };
  }
}), Te = class Te {
};
Te.navButtonSlot = "", Te.dropButtonSlot = "", Te.editButtonSlot = "", Te.createButtonSlot = "", Te.defaultEmptySlot = void 0, Te.defaultSaveIcon = "", Te.defaultNoResultsMessage = "No results";
let Y = Te;
const rl = /* @__PURE__ */ le({
  __name: "DropButtonComponent",
  props: {
    config: {},
    item: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: [
    "click"
  ],
  setup(e, { emit: i }) {
    const r = i, n = e, l = s(() => Y.dropButtonSlot !== ""), a = s(() => Y.dropButtonSlot), f = s(() => ia(n.config.resourceData, n.item));
    return (g, m) => {
      const C = Se("lkt-button");
      return v(), $(C, fe({ palette: "table-delete" }, n.config, {
        disabled: g.disabled,
        "resource-data": f.value,
        onClick: m[0] || (m[0] = la((o) => r("click", o), ["prevent", "stop"]))
      }), {
        default: j(() => [
          l.value ? (v(), $(Ae(a.value), { key: 0 })) : A("", !0)
        ]),
        _: 1
      }, 16, ["disabled", "resource-data"]);
    };
  }
}), ul = /* @__PURE__ */ le({
  __name: "EditButtonComponent",
  props: {
    config: {},
    item: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: [
    "click"
  ],
  setup(e, { emit: i }) {
    const r = i, n = e, l = s(() => Y.editButtonSlot !== ""), a = s(() => Y.editButtonSlot), f = s(() => ia(n.config.resourceData, n.item));
    return (g, m) => {
      const C = Se("lkt-button");
      return v(), $(C, fe({ palette: "table-edit" }, n.config, {
        disabled: g.disabled,
        "resource-data": f.value,
        onClick: m[0] || (m[0] = la((o) => r("click"), ["prevent", "stop"]))
      }), {
        default: j(() => [
          l.value ? (v(), $(Ae(a.value), { key: 0 })) : A("", !0)
        ]),
        _: 1
      }, 16, ["disabled", "resource-data"]);
    };
  }
}), sl = ["data-i", "data-draggable"], dl = ["data-role", "data-i"], cl = {
  key: 1,
  class: "lkt-table-nav-cell"
}, vl = { class: "lkt-table-nav-container" }, fl = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, pl = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, ml = ["colspan"], gl = ["colspan"], bl = ["data-column", "colspan", "title"], hl = {
  key: 6,
  class: "lkt-table-col-drop"
}, yl = {
  key: 7,
  class: "lkt-table-col-edit"
}, kl = /* @__PURE__ */ le({
  __name: "LktTableRow",
  props: {
    modelValue: { default: () => ({}) },
    editButton: {},
    dropButton: {},
    isDraggable: { type: Boolean, default: !0 },
    sortable: { type: Boolean, default: !0 },
    displayHiddenColumnsIndicator: { type: Boolean, default: !1 },
    hiddenIsVisible: { type: Boolean, default: !1 },
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
    rowDisplayType: { type: [Number, Function], default: Ze.Auto },
    renderDrag: { type: [Boolean, Function], default: !0 },
    disabledDrag: { type: [Boolean, Function], default: !0 },
    itemContainerClass: { type: [String, Function], default: "" }
  },
  emits: [
    "update:modelValue",
    "click",
    "show",
    "item-up",
    "item-down",
    "item-drop"
  ],
  setup(e, { emit: i }) {
    var K;
    const r = na(), n = i, l = e, a = S(l.modelValue);
    let f = typeof l.rowDisplayType == "function" ? l.rowDisplayType(a.value, l.i) : l.rowDisplayType;
    f || (f = Ze.Auto);
    const g = [Ze.Auto, Ze.PreferCustomItem].includes(f), m = [Ze.Auto, Ze.PreferItem].includes(f), C = S((K = l.editButton.anchor) == null ? void 0 : K.to);
    for (let u in a.value) C.value = ua(C.value, ":" + u, a.value[u]);
    const o = (u) => n("click", u), B = (u, O) => {
      n("show", u, O);
    }, c = s(() => {
      let u = [], O = !1;
      return typeof l.disabledDrag == "function" ? O = l.disabledDrag(a.value) : O = q.value === !0, !O && l.sortable && l.isDraggable ? u.push("handle") : O && u.push("disabled"), u.join(" ");
    }), k = s(() => Y.navButtonSlot !== ""), D = s(() => Y.navButtonSlot), E = () => {
      n("item-up", l.i);
    }, Ce = () => {
      n("item-down", l.i);
    }, _ = () => {
      n("item-drop", l.i);
    };
    F(() => l.modelValue, (u) => a.value = u), F(a, (u) => {
      n("update:modelValue", u);
    }, { deep: !0 });
    const ee = s(() => typeof l.renderDrag == "function" ? l.renderDrag(a.value) : l.renderDrag === !0), q = s(() => typeof l.disabledDrag == "function" ? l.disabledDrag(a.value) : l.disabledDrag === !0), Ne = s(() => c.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), ne = s(() => {
      let u = [];
      return g && u.push("type-custom-item"), m && u.push("type-item"), typeof l.itemContainerClass == "function" ? u.push(l.itemContainerClass(a.value)) : l.itemContainerClass !== "" && u.push(l.itemContainerClass), u.join(" ");
    });
    return (u, O) => {
      const J = Se("lkt-button");
      return v(), h("tr", {
        "data-i": u.i,
        "data-draggable": u.isDraggable,
        class: Q(ne.value)
      }, [
        u.sortable && u.editModeEnabled && ee.value ? (v(), h("td", {
          key: 0,
          "data-role": Ne.value,
          class: Q(c.value),
          "data-i": u.i
        }, O[3] || (O[3] = [
          Z("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]), 10, dl)) : A("", !0),
        u.addNavigation && u.editModeEnabled ? (v(), h("td", cl, [
          Z("div", vl, [
            Ee(J, {
              palette: "table-nav",
              disabled: u.i === 0,
              onClick: E
            }, {
              default: j(() => [
                k.value ? (v(), $(Ae(D.value), {
                  key: 0,
                  direction: "up"
                })) : (v(), h("i", fl))
              ]),
              _: 1
            }, 8, ["disabled"]),
            Ee(J, {
              palette: "table-nav",
              disabled: u.latestRow,
              onClick: Ce
            }, {
              default: j(() => [
                k.value ? (v(), $(Ae(D.value), {
                  key: 0,
                  direction: "down"
                })) : (v(), h("i", pl))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : A("", !0),
        u.displayHiddenColumnsIndicator ? (v(), h("td", {
          key: 2,
          onClick: O[0] || (O[0] = (P) => B(P, u.i)),
          "data-role": "show-more",
          class: Q(u.hiddenIsVisible ? "state-open" : "")
        }, null, 2)) : A("", !0),
        T(g) && T(r)[`item-${u.i}`] ? (v(), h("td", {
          key: "td" + u.i,
          colspan: u.visibleColumns.length
        }, [
          H(u.$slots, `item-${u.i}`, {
            item: a.value,
            index: u.i,
            editing: u.editModeEnabled,
            canCreate: u.canCreate,
            canRead: u.canRead,
            canUpdate: u.canEdit,
            canDrop: u.canDrop,
            isLoading: u.isLoading,
            doDrop: () => _()
          })
        ], 8, ml)) : T(m) && T(r).item ? (v(), h("td", {
          key: "td" + u.i,
          colspan: u.visibleColumns.length
        }, [
          H(u.$slots, "item", {
            item: a.value,
            index: u.i,
            editing: u.editModeEnabled,
            canCreate: u.canCreate,
            canRead: u.canRead,
            canUpdate: u.canEdit,
            canDrop: u.canDrop,
            isLoading: u.isLoading,
            doDrop: () => _()
          })
        ], 8, gl)) : (v(!0), h(x, { key: 5 }, ue(u.visibleColumns, (P) => (v(), h(x, null, [
          T(nl)(P, u.emptyColumns, a.value) ? (v(), h("td", {
            key: "td" + u.i,
            "data-column": P.key,
            colspan: T(zt)(P, a.value),
            title: T(nt)(P, a.value, u.i, u.visibleColumns),
            class: Q(T(ma)(P)),
            onClick: O[2] || (O[2] = (N) => o(N))
          }, [
            u.$slots[P.key] && T(ll)(P, a.value) ? H(u.$slots, P.key, {
              key: 0,
              value: a.value[P.key],
              item: a.value,
              column: P,
              i: u.i
            }) : a.value ? (v(), $(ga, {
              key: 1,
              modelValue: a.value,
              "onUpdate:modelValue": O[1] || (O[1] = (N) => a.value = N),
              column: P,
              columns: u.visibleColumns,
              "edit-mode-enabled": u.editModeEnabled,
              "has-inline-edit-perm": u.hasInlineEditPerm,
              i: u.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : A("", !0)
          ], 10, bl)) : A("", !0)
        ], 64))), 256)),
        u.canDrop && u.editModeEnabled ? (v(), h("td", hl, [
          Ee(rl, {
            config: u.dropButton,
            item: a.value,
            onClick: _
          }, null, 8, ["config", "item"])
        ])) : A("", !0),
        u.canEdit && u.editModeEnabled ? (v(), h("td", yl, [
          Ee(ul, {
            config: u.editButton,
            item: a.value
          }, null, 8, ["config", "item"])
        ])) : A("", !0)
      ], 10, sl);
    };
  }
}), Sl = { "data-role": "hidden-row" }, Cl = ["colspan"], wl = ["data-column"], Bl = ["data-i"], Dl = ["data-column", "title"], Il = /* @__PURE__ */ le({
  __name: "LktHiddenRow",
  props: {
    modelValue: { default: () => ({}) },
    isDraggable: { type: Boolean, default: !0 },
    sortable: { type: Boolean, default: !0 },
    hiddenIsVisible: { type: Boolean, default: !1 },
    i: { default: 0 },
    hiddenColumnsColSpan: { default: 0 },
    visibleColumns: { default: () => [] },
    hiddenColumns: { default: () => [] },
    emptyColumns: { default: () => [] },
    editModeEnabled: { type: Boolean, default: !1 },
    hasInlineEditPerm: { type: Boolean, default: !1 }
  },
  emits: [
    "update:modelValue",
    "click"
  ],
  setup(e, { emit: i }) {
    const r = i, n = e, l = S(n.modelValue), a = (f) => r("click", f);
    return F(() => n.modelValue, (f) => l.value = f), F(l, () => r("update:modelValue", l.value)), (f, g) => tt((v(), h("tr", Sl, [
      Z("td", { colspan: f.hiddenColumnsColSpan }, [
        Z("table", null, [
          Z("tr", null, [
            (v(!0), h(x, null, ue(f.hiddenColumns, (m) => (v(), h("th", {
              "data-column": m.key
            }, [
              Z("div", null, ze(m.label), 1)
            ], 8, wl))), 256))
          ]),
          Z("tr", { "data-i": f.i }, [
            (v(!0), h(x, null, ue(f.hiddenColumns, (m, C) => (v(), h("td", {
              "data-column": m.key,
              title: T(nt)(m, l.value, C, f.hiddenColumns),
              onClick: g[1] || (g[1] = (o) => a(o))
            }, [
              f.$slots[m.key] ? H(f.$slots, m.key, {
                key: 0,
                value: l.value[m.key],
                item: l.value,
                column: m,
                i: C
              }) : (v(), $(ga, {
                key: 1,
                column: m,
                columns: f.hiddenColumns,
                modelValue: l.value,
                "onUpdate:modelValue": g[0] || (g[0] = (o) => l.value = o),
                i: C,
                "edit-mode-enabled": f.editModeEnabled,
                "has-inline-edit-perm": f.hasInlineEditPerm
              }, null, 8, ["column", "columns", "modelValue", "i", "edit-mode-enabled", "has-inline-edit-perm"]))
            ], 8, Dl))), 256))
          ], 8, Bl)
        ])
      ], 8, Cl)
    ], 512)), [
      [at, f.hiddenIsVisible]
    ]);
  }
}), ta = /* @__PURE__ */ le({
  __name: "CreateButton",
  props: {
    config: { default: void 0 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: [
    "click",
    "append"
  ],
  setup(e, { emit: i }) {
    var C;
    const r = i, n = e, l = s(() => Y.createButtonSlot !== ""), a = s(() => Y.createButtonSlot), f = {
      ...(C = n.config) == null ? void 0 : C.modalData,
      beforeClose: (o) => {
        "itemCreated" in o && o.itemCreated === !0 && r("append", o.item);
      }
    }, g = {
      ...n.config
    };
    g.modalData = f;
    const m = () => {
      var o;
      if (!((o = n.config) != null && o.modal)) {
        r("click");
        return;
      }
    };
    return (o, B) => {
      const c = Se("lkt-button");
      return v(), $(c, fe(g, {
        disabled: o.disabled,
        onClick: m
      }), {
        default: j(() => [
          l.value ? (v(), $(Ae(a.value), { key: 0 })) : A("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), Tl = ["data-column", "data-sortable", "data-sort", "colspan", "title"], El = /* @__PURE__ */ le({
  __name: "TableHeader",
  props: {
    column: { default: () => new oa() },
    sortBy: { default: "" },
    sortDirection: { default: "" },
    amountOfColumns: { default: 0 },
    items: { default: () => [] }
  },
  emits: [
    "click"
  ],
  setup(e, { emit: i }) {
    const r = i, n = e, l = s(() => al(n.column, n.amountOfColumns, n.items)), a = s(() => n.column.sortable === !0), f = s(() => a.value && n.sortBy === n.column.key ? n.sortDirection : ""), g = s(() => ra(n.column.label)), m = s(() => a.value && n.sortBy === n.column.key ? n.sortDirection === je.Asc ? ke.defaultTableSortAscIcon : n.sortDirection === je.Desc ? ke.defaultTableSortDescIcon : "" : ""), C = () => r("click", n.column);
    return (o, B) => (v(), h("th", {
      "data-column": o.column.key,
      "data-sortable": a.value,
      "data-sort": f.value,
      colspan: l.value,
      title: g.value,
      class: Q(T(ma)(o.column)),
      onClick: C
    }, [
      Z("div", null, [
        lt(ze(g.value) + " ", 1),
        m.value ? (v(), h("i", {
          key: 0,
          class: Q(m.value)
        }, null, 2)) : A("", !0)
      ])
    ], 10, Tl));
  }
}), Al = ["id"], Vl = { class: "lkt-table-page-buttons" }, Rl = { class: "switch-edition-mode" }, Nl = {
  key: 0,
  class: "lkt-table-page-buttons"
}, Ml = {
  key: 1,
  class: "lkt-table-page-filters"
}, Ll = { class: "lkt-table" }, _l = { key: 0 }, $l = { key: 0 }, Ol = {
  key: 0,
  "data-role": "drag-indicator"
}, Pl = { key: 1 }, Fl = { key: 2 }, Ul = {
  key: 3,
  class: "lkt-table-col-drop"
}, jl = {
  key: 4,
  class: "lkt-table-col-edit"
}, zl = ["id"], Hl = ["id"], ql = ["data-i"], Gl = ["data-i"], Xl = ["id"], Yl = { class: "lkt-carousel-slide" }, Kl = { class: "lkt-carousel-slide" }, Wl = {
  key: 2,
  class: "lkt-table-empty"
}, xl = {
  key: 4,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, Jl = /* @__PURE__ */ le({
  __name: "LktTable",
  props: /* @__PURE__ */ Aa({
    modelValue: {},
    type: {},
    columns: {},
    noResultsText: {},
    hideEmptyColumns: { type: Boolean },
    hideTableHeader: { type: Boolean },
    itemDisplayChecker: { type: Function },
    rowDisplayType: { type: [Number, Function] },
    slotItemVar: {},
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
    header: {},
    title: {},
    titleTag: {},
    titleIcon: {},
    headerClass: {},
    editModeButton: {},
    saveButton: {},
    createButton: {},
    dropButton: {},
    editButton: {},
    hiddenSave: { type: Boolean },
    requiredItemsForTopCreate: {},
    requiredItemsForBottomCreate: {},
    addNavigation: { type: Boolean },
    newValueGenerator: { type: Function },
    wrapContentTag: {},
    wrapContentClass: {},
    itemsContainerClass: {},
    itemContainerClass: { type: [String, Function] },
    createEnabledValidator: { type: Function }
  }, Na(Ma)),
  emits: [
    "update:modelValue",
    "update:perms",
    "update:loading",
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
  setup(e, { expose: i, emit: r }) {
    var Xt, Yt;
    const n = r, l = na(), a = e, f = {}, g = S(typeof a.sorter == "function" ? a.sorter : tl), m = S(ol(a.columns)), C = S(je.Asc), o = S(a.modelValue), B = S(f), c = S(null), k = S(a.columns), D = S((Xt = a.paginator) == null ? void 0 : Xt.modelValue), E = S(a.loading), Ce = S(!1), _ = S(a.perms), ee = S(null), q = S(null), Ne = S(null), ne = S({}), K = S(new _a({ items: o.value }, a.dataStateConfig)), u = S(a.editMode), O = S(0), J = S(null), P = S(((Yt = a.carousel) == null ? void 0 : Yt.currentSlide) || 0), N = S(Ve(a.saveButton, ke.defaultSaveButton)), we = S(Ve(a.createButton, ke.defaultCreateButton)), st = S(Ve(a.editModeButton, ke.defaultEditModeButton)), Me = S(Ve(a.dropButton, ke.defaultDropButton));
    F(() => a.saveButton, (t) => N.value = Ve(a.saveButton, ke.defaultSaveButton)), F(() => a.createButton, (t) => we.value = Ve(a.createButton, ke.defaultCreateButton)), F(() => a.editModeButton, (t) => st.value = Ve(a.editModeButton, ke.defaultEditModeButton)), F(() => a.dropButton, (t) => Me.value = Ve(a.dropButton, ke.defaultDropButton));
    const z = S(!1);
    F(E, (t) => n("update:loading", t)), F(D, (t) => n("page", t));
    const Bt = (t) => {
      _.value = t;
    }, Le = (t) => {
      var p;
      Array.isArray(t.data) && ((!a.paginator || ![St.LoadMore, St.Infinite].includes((p = a.paginator) == null ? void 0 : p.type)) && o.value.splice(0, o.value.length), o.value = [...o.value, ...t.data]), E.value = !1, Ce.value = !0, K.value.store({ items: o.value }).turnStoredIntoOriginal(), z.value = !1, yt(() => {
        ve(), ot.value, n("read-response", t);
      });
    }, Dt = () => yt(() => E.value = !0), pe = () => {
      ee.value.doRefresh();
    }, se = La(12), _e = s(() => {
      if (!a.hideEmptyColumns) return [];
      let t = [];
      return k.value.forEach((p) => {
        let L = p.key, W = !1;
        o.value.forEach((ae) => {
          if (typeof ae.checkEmpty == "function")
            return ae.checkEmpty(ae);
          ae[L] && (W = !0);
        }), W || t.push(L);
      }), t;
    }), de = s(() => k.value.filter((t) => !t.hidden)), qe = s(() => k.value.filter((t) => t.hidden)), dt = s(() => {
      let t = de.value.length + 1;
      return a.sortable && ++t, t;
    }), Ge = s(() => k.value.filter((t) => t.isForRowKey)), me = s(() => qe.value.length > 0 && !a.sortable), Xe = s(() => k.value.map((t) => t.key)), ie = s(() => {
      let t = [];
      for (let p in l) Xe.value.indexOf(p) !== -1 && t.push(p);
      return t;
    }), Ye = s(() => {
      let t = [];
      for (let p in l) p.indexOf("slide-") !== -1 && t.push(p);
      return t;
    }), Ke = s(() => {
      var t;
      return a.hiddenSave || E.value || !((t = N.value) != null && t.resource || N.value.type) ? !1 : u.value && z.value ? !0 : u.value;
    }), It = s(() => ht.value && o.value.length >= a.requiredItemsForTopCreate || xe.value ? !0 : Ke.value || u.value && ge.value), ot = s(() => {
      var t, p;
      return O.value, typeof ((t = N.value) == null ? void 0 : t.disabled) == "function" ? N.value.disabled({
        value: o.value,
        dataState: K.value
      }) : typeof ((p = N.value) == null ? void 0 : p.disabled) == "boolean" ? N.value.disabled : !z.value;
    }), ct = s(() => o.value.length), Tt = s(() => {
      var t;
      return {
        items: o.value,
        ...(t = N.value) == null ? void 0 : t.resourceData
      };
    }), vt = s(() => a.titleTag === "" ? "h2" : a.titleTag), ft = s(() => a.wrapContentTag === "" ? "div" : a.wrapContentTag), $e = s(() => ra(a.title)), We = s(() => {
      var t;
      return (t = a.drag) == null ? void 0 : t.enabled;
    }), ge = s(() => _.value.includes(De.Create)), Oe = s(() => _.value.includes("read")), ce = s(() => _.value.includes(De.Update)), be = s(() => _.value.includes(De.Edit)), Be = s(() => _.value.includes(De.InlineEdit)), Pe = s(() => _.value.includes(De.ModalCreate)), Fe = s(() => _.value.includes(De.InlineCreate)), pt = s(() => _.value.includes(De.InlineCreateEver)), he = s(() => _.value.includes(De.Drop)), Ue = s(() => _.value.includes(De.SwitchEditMode)), xe = s(() => !Ue.value || !ce.value && !he.value || !ce.value && he.value ? !1 : !E.value), it = s(() => {
      var t;
      return (typeof ((t = a.paginator) == null ? void 0 : t.type) < "u" && [St.LoadMore, St.Infinite].includes(a.paginator.type) || !E.value) && o.value.length > 0;
    }), Je = (t) => {
      let p = t.target;
      if (typeof p.dataset.column > "u")
        do
          p = p.parentNode;
        while (typeof p.dataset.column > "u" && p.tagName !== "TABLE" && p.tagName !== "body");
      if (p.tagName === "TD" && (p = p.parentNode, p = p.dataset.i, typeof p < "u"))
        return o.value[p];
    }, ve = () => {
      O.value = Oa();
    }, Et = (t) => o.value[t], At = (t) => {
      var p;
      return (p = c.value) == null ? void 0 : p.querySelector(`[data-i="${t}"]`);
    }, rt = (t) => B.value["tr_" + t] === !0, mt = (t) => {
      t && t.sortable && (o.value = o.value.sort((p, L) => g.value(p, L, t, C.value)), C.value = C.value === je.Asc ? je.Desc : je.Asc, m.value = t.key, ve(), n("sort", [m.value, C.value]));
    }, Qe = (t) => {
      n("click", t);
    }, d = (t, p) => {
      let L = "tr_" + p;
      B.value[L] = typeof B.value[L] > "u" ? !0 : !B.value[L];
    }, b = (t) => {
      var L, W, ae, re, V, I, M, ye;
      let p = parseInt((re = (ae = (W = (L = t == null ? void 0 : t.originalEvent) == null ? void 0 : L.toElement) == null ? void 0 : W.closest("tr")) == null ? void 0 : ae.dataset) == null ? void 0 : re.i);
      return !(typeof ((V = a.drag) == null ? void 0 : V.isValid) == "function" && !((I = a.drag) != null && I.isValid(o.value[p])) || typeof ((M = a.drag) == null ? void 0 : M.isValid) == "boolean" && !((ye = a.drag) != null && ye.isValid));
    }, y = (t) => {
      var p, L;
      return typeof ((p = a.drag) == null ? void 0 : p.isDraggable) == "function" ? (L = a.drag) == null ? void 0 : L.isDraggable(t) : !0;
    }, w = () => {
      if (ge.value) {
        n("click-create");
        return;
      }
      if (Fe.value || pt.value) {
        if (typeof a.newValueGenerator == "function") {
          let t = a.newValueGenerator();
          if (typeof t == "object" || a.type !== et.Table) {
            o.value.push(t);
            return;
          }
        }
        o.value.push({});
      } else
        n("click-create");
    }, R = (t) => {
      o.value.push(t);
    }, G = () => E.value = !0, te = () => E.value = !1, oe = (t, p) => {
      var L, W, ae;
      if (!((L = N.value) != null && L.type && [
        $t.Split,
        $t.SplitEver,
        $t.SplitLazy
      ].includes((W = N.value) == null ? void 0 : W.type))) {
        if (n("before-save"), (ae = N.value) != null && ae.resource && (E.value = !1, !p.success)) {
          n("error", p.httpStatus);
          return;
        }
        K.value.turnStoredIntoOriginal(), z.value = !1, n("save", p);
      }
    }, gt = (t, p, L) => {
      if (L >= t.length) {
        let W = L - t.length + 1;
        for (; W--; ) t.push(void 0);
      }
      return t.splice(L, 0, t.splice(p, 1)[0]), t;
    }, Vt = (t) => {
      gt(o.value, t, t - 1), ve();
    }, Rt = (t) => {
      gt(o.value, t, t + 1), ve();
    }, bt = (t) => {
      o.value.splice(t, 1), ve();
    }, ba = () => {
      var t;
      ne.value && typeof ((t = ne.value) == null ? void 0 : t.destroy) == "function" && (ne.value.destroy(), ne.value = {});
    }, Ht = () => {
      J.value || (J.value = document.getElementById("lkt-table-body-" + se)), ne.value = new $a(J.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(t) {
          let p = t.oldIndex, L = t.newIndex;
          o.value.splice(L, 0, o.value.splice(p, 1)[0]), ve(), n("drag-end", o.value[L]);
        },
        onMove: function(t, p) {
          return b(t);
        }
      });
    }, Nt = (t, p, L = !1) => {
      let W = [O.value, se, "row", p];
      return L && W.push("hidden"), Ge.value.forEach((ae) => {
        let re = String(t[ae.key]).toLowerCase();
        re.length > 50 && (re = re.substring(0, 50)), re = ua(re, " ", "-"), W.push(re);
      }), W.join("-");
    }, qt = s(() => typeof a.createEnabledValidator == "function" ? a.createEnabledValidator({ items: o.value }) : !0), ht = s(() => pt.value || ge.value && u.value || Fe.value && u.value || Pe.value && u.value), ha = s(() => [et.Ol, et.Ul].includes(a.type)), Mt = (t, p) => typeof a.itemDisplayChecker == "function" ? a.itemDisplayChecker(t) : !0, Gt = (t) => typeof a.itemContainerClass == "function" ? a.itemContainerClass(t) : a.itemContainerClass;
    jt(() => {
      var t;
      a.initialSorting && mt(il(a.columns, m.value)), K.value.store({ items: o.value }).turnStoredIntoOriginal(), z.value = !1, (t = a.drag) != null && t.enabled && yt(() => {
        Ht();
      });
    }), F(() => {
      var t;
      return (t = a.drag) == null ? void 0 : t.enabled;
    }, (t) => {
      t ? Ht() : ba();
    }), F(() => a.perms, (t) => _.value = t), F(_, (t) => n("update:perms", t)), F(() => a.editMode, (t) => u.value = t), F(() => a.columns, (t) => k.value = t, { deep: !0 }), F(() => a.modelValue, (t) => {
      o.value = t;
    }, { deep: !0 }), F(o, (t) => {
      K.value.increment({ items: t }), z.value = K.value.changed(), n("update:modelValue", t);
    }, { deep: !0 }), i({
      getItemByEvent: Je,
      getItemByIndex: Et,
      getRowByIndex: At,
      doRefresh: pe,
      doRemoveIndex: (t) => {
        o.value.splice(t, 1), ve();
      },
      getHtml: () => q.value,
      reRender: ve,
      turnStoredIntoOriginal: () => {
        K.value.turnStoredIntoOriginal(), yt(() => {
          ve();
        });
      }
    });
    const ya = s(() => typeof Y.defaultEmptySlot < "u"), ka = s(() => Y.defaultEmptySlot), Sa = s(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled ? !1 : typeof a.drag.canRender > "u" ? !0 : a.drag.canRender), Ca = s(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled || typeof a.drag.isDisabled > "u" ? !1 : a.drag.isDisabled);
    return (t, p) => {
      const L = Se("lkt-button"), W = Se("lkt-loader"), ae = Se("lkt-paginator");
      return v(), h("section", {
        ref_key: "element",
        ref: q,
        class: "lkt-table-page",
        id: "lkt-table-page-" + T(se)
      }, [
        $e.value || T(l).title ? (v(), h("header", {
          key: 0,
          class: Q(t.headerClass)
        }, [
          $e.value ? (v(), $(Ae(vt.value), { key: 0 }, {
            default: j(() => [
              t.titleIcon ? (v(), h("i", {
                key: 0,
                class: Q(t.titleIcon)
              }, null, 2)) : A("", !0),
              lt(" " + ze($e.value), 1)
            ]),
            _: 1
          })) : A("", !0),
          T(l).title ? H(t.$slots, "title", { key: 1 }) : A("", !0)
        ], 2)) : A("", !0),
        (v(), $(Ae(ft.value), {
          class: Q(["lkt-table-page-content-wrapper", t.wrapContentClass])
        }, {
          default: j(() => {
            var re;
            return [
              tt(Z("div", Vl, [
                tt(Ee(L, fe({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: Ne
                }, {
                  ...N.value,
                  disabled: ot.value,
                  resourceData: Tt.value
                }, {
                  onLoading: G,
                  onLoaded: te,
                  onClick: oe
                }), {
                  split: j(({ doClose: V, doRootClick: I }) => [
                    H(t.$slots, "button-save-split", {
                      doClose: V,
                      doRootClick: I,
                      dataState: K.value,
                      onButtonLoading: G,
                      onButtonLoaded: te
                    })
                  ]),
                  default: j(() => [
                    T(l)["button-save"] ? H(t.$slots, "button-save", {
                      key: 0,
                      items: o.value,
                      editMode: t.editMode,
                      canUpdate: !ot.value
                    }) : A("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [at, Ke.value]
                ]),
                ht.value && o.value.length >= t.requiredItemsForTopCreate ? (v(), $(ta, {
                  key: 0,
                  config: we.value,
                  disabled: !qt.value,
                  onClick: w,
                  onAppend: R
                }, null, 8, ["config", "disabled"])) : A("", !0),
                Z("div", Rl, [
                  tt(Ee(L, fe(st.value, {
                    checked: u.value,
                    "onUpdate:checked": p[0] || (p[0] = (V) => u.value = V)
                  }), null, 16, ["checked"]), [
                    [at, xe.value]
                  ])
                ])
              ], 512), [
                [at, It.value]
              ]),
              T(l).buttons ? (v(), h("div", Nl, [
                H(t.$slots, "buttons")
              ])) : A("", !0),
              Ce.value && T(l).filters ? (v(), h("div", Ml, [
                H(t.$slots, "filters", {
                  items: o.value,
                  isLoading: E.value
                })
              ])) : A("", !0),
              tt(Z("div", Ll, [
                t.type === T(et).Table ? (v(), h("table", _l, [
                  t.hideTableHeader ? A("", !0) : (v(), h("thead", $l, [
                    Z("tr", null, [
                      We.value && u.value ? (v(), h("th", Ol)) : A("", !0),
                      t.addNavigation && u.value ? (v(), h("th", Pl)) : A("", !0),
                      me.value ? (v(), h("th", Fl)) : A("", !0),
                      (v(!0), h(x, null, ue(de.value, (V) => (v(), h(x, null, [
                        _e.value.indexOf(V.key) === -1 ? (v(), $(El, {
                          key: 0,
                          column: V,
                          "sort-by": m.value,
                          "sort-direction": C.value,
                          "amount-of-columns": t.columns.length,
                          items: o.value,
                          onClick: (I) => mt(V)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : A("", !0)
                      ], 64))), 256)),
                      he.value && u.value ? (v(), h("th", Ul)) : A("", !0),
                      be.value && ce.value && u.value ? (v(), h("th", jl)) : A("", !0)
                    ])
                  ])),
                  Z("tbody", {
                    ref_key: "tableBody",
                    ref: c,
                    id: "lkt-table-body-" + T(se),
                    class: Q(t.itemsContainerClass)
                  }, [
                    (v(!0), h(x, null, ue(o.value, (V, I) => tt((v(), $(kl, {
                      modelValue: o.value[I],
                      "onUpdate:modelValue": (M) => o.value[I] = M,
                      key: Nt(V, I),
                      i: I,
                      "drop-button": Me.value,
                      "edit-button": t.editButton,
                      "display-hidden-columns-indicator": me.value,
                      "is-draggable": y(V),
                      sortable: We.value,
                      "visible-columns": de.value,
                      "empty-columns": _e.value,
                      "add-navigation": t.addNavigation,
                      "hidden-is-visible": rt(I),
                      "latest-row": I + 1 === ct.value,
                      "can-drop": he.value && u.value,
                      "can-edit": be.value && ce.value && u.value,
                      "can-read": Oe.value,
                      "can-create": ge.value,
                      "edit-mode-enabled": u.value,
                      "has-inline-edit-perm": Be.value,
                      "row-display-type": t.rowDisplayType,
                      "render-drag": Sa.value,
                      "disabled-drag": Ca.value,
                      "is-loading": E.value,
                      "item-container-class": t.itemContainerClass,
                      onClick: Qe,
                      onShow: d,
                      onItemUp: Vt,
                      onItemDown: Rt,
                      onItemDrop: bt
                    }, Kt({ _: 2 }, [
                      T(l)[`item-${I}`] ? {
                        name: `item-${I}`,
                        fn: j((M) => [
                          H(t.$slots, `item-${I}`, Re({
                            [t.slotItemVar || ""]: M.item,
                            index: I,
                            editing: M.editing,
                            canCreate: M.canCreate,
                            canRead: M.canRead,
                            canUpdate: M.canUpdate,
                            canDrop: M.canDrop,
                            isLoading: M.isLoading,
                            doDrop: M.doDrop
                          }))
                        ]),
                        key: "0"
                      } : T(l).item ? {
                        name: "item",
                        fn: j((M) => [
                          H(t.$slots, "item", Re({
                            [t.slotItemVar || ""]: M.item,
                            index: I,
                            editing: M.editing,
                            canCreate: M.canCreate,
                            canRead: M.canRead,
                            canUpdate: M.canUpdate,
                            canDrop: M.canDrop,
                            isLoading: M.isLoading,
                            doDrop: M.doDrop
                          }))
                        ]),
                        key: "1"
                      } : void 0,
                      ue(ie.value, (M) => ({
                        name: M,
                        fn: j((ye) => [
                          H(t.$slots, M, Re({
                            [t.slotItemVar || ""]: ye.item,
                            value: ye.value,
                            column: ye.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "drop-button", "edit-button", "display-hidden-columns-indicator", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "hidden-is-visible", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class"])), [
                      [at, Mt(o.value[I])]
                    ])), 128)),
                    qe.value.length > 0 ? (v(!0), h(x, { key: 0 }, ue(o.value, (V, I) => (v(), $(Il, {
                      modelValue: o.value[I],
                      "onUpdate:modelValue": (M) => o.value[I] = M,
                      key: Nt(V, I, !0),
                      i: I,
                      "hidden-columns": qe.value,
                      "hidden-columns-col-span": dt.value,
                      "is-draggable": y(V),
                      sortable: We.value,
                      "visible-columns": de.value,
                      "empty-columns": _e.value,
                      "hidden-is-visible": rt(I),
                      "edit-mode-enabled": u.value,
                      "has-inline-edit-perm": Be.value,
                      onClick: Qe,
                      onShow: d
                    }, Kt({ _: 2 }, [
                      ue(ie.value, (M) => ({
                        name: M,
                        fn: j((ye) => [
                          H(t.$slots, M, Re({
                            [t.slotItemVar || ""]: ye.item,
                            value: ye.value,
                            column: ye.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "hidden-columns", "hidden-columns-col-span", "is-draggable", "sortable", "visible-columns", "empty-columns", "hidden-is-visible", "edit-mode-enabled", "has-inline-edit-perm"]))), 128)) : A("", !0)
                  ], 10, zl)
                ])) : t.type === T(et).Item ? (v(), h("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: c,
                  id: "lkt-table-body-" + T(se),
                  class: Q(["lkt-table-items-container", t.itemsContainerClass])
                }, [
                  (v(!0), h(x, null, ue(o.value, (V, I) => (v(), h(x, null, [
                    Mt(V) ? (v(), h("div", {
                      class: Q(["lkt-table-item", Gt(V)]),
                      "data-i": I,
                      key: Nt(V, I)
                    }, [
                      H(t.$slots, "item", Re({
                        [t.slotItemVar || ""]: V,
                        index: I,
                        editing: u.value,
                        canCreate: ge.value,
                        canRead: Oe.value,
                        canUpdate: ce.value,
                        canDrop: he.value,
                        isLoading: E.value,
                        doDrop: () => bt(I)
                      }))
                    ], 10, ql)) : A("", !0)
                  ], 64))), 256))
                ], 10, Hl)) : ha.value ? (v(), $(Ae(t.type), {
                  key: 2,
                  class: Q(["lkt-table-items-container", t.itemsContainerClass])
                }, {
                  default: j(() => [
                    (v(!0), h(x, null, ue(o.value, (V, I) => (v(), h(x, null, [
                      Mt(V) ? (v(), h("li", {
                        key: 0,
                        class: Q(["lkt-table-item", Gt(V)]),
                        "data-i": I
                      }, [
                        H(t.$slots, "item", Re({
                          [t.slotItemVar || ""]: V,
                          index: I,
                          editing: u.value,
                          canCreate: ge.value,
                          canRead: Oe.value,
                          canUpdate: ce.value,
                          canDrop: he.value,
                          isLoading: E.value,
                          doDrop: () => bt(I)
                        }))
                      ], 10, Gl)) : A("", !0)
                    ], 64))), 256))
                  ]),
                  _: 3
                }, 8, ["class"])) : t.type === T(et).Carousel ? (v(), h("div", {
                  key: 3,
                  ref_key: "tableBody",
                  ref: c,
                  id: "lkt-table-body-" + T(se),
                  class: Q(["lkt-table-items-container", t.itemsContainerClass])
                }, [
                  Ee(T(xa), fe({
                    modelValue: P.value,
                    "onUpdate:modelValue": p[1] || (p[1] = (V) => P.value = V)
                  }, t.carousel, {
                    "wrap-around": ((re = t.carousel) == null ? void 0 : re.infinite) === !0
                  }), {
                    addons: j(() => [
                      Ee(T(Za)),
                      Ee(T(el))
                    ]),
                    default: j(() => [
                      (v(!0), h(x, null, ue(Ye.value, (V, I) => (v(), $(T(ea), {
                        key: V,
                        index: I
                      }, {
                        default: j(() => [
                          Z("div", Yl, [
                            H(t.$slots, V)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (v(!0), h(x, null, ue(o.value, (V, I) => (v(), $(T(ea), {
                        key: t.slide,
                        index: I
                      }, {
                        default: j(() => [
                          Z("div", Kl, [
                            H(t.$slots, "item", Re({
                              [t.slotItemVar || ""]: V,
                              index: I,
                              editing: u.value,
                              canCreate: ge.value,
                              canRead: Oe.value,
                              canUpdate: ce.value,
                              canDrop: he.value,
                              isLoading: E.value,
                              doDrop: () => bt(I)
                            }))
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128))
                    ]),
                    _: 3
                  }, 16, ["modelValue", "wrap-around"])
                ], 10, Xl)) : A("", !0)
              ], 512), [
                [at, it.value]
              ]),
              !E.value && o.value.length === 0 ? (v(), h("div", Wl, [
                T(l).empty ? H(t.$slots, "empty", { key: 0 }) : ya.value ? (v(), $(Ae(ka.value), {
                  key: 1,
                  message: t.noResultsText
                }, null, 8, ["message"])) : t.noResultsText ? (v(), h(x, { key: 2 }, [
                  lt(ze(t.noResultsText), 1)
                ], 64)) : A("", !0)
              ])) : A("", !0),
              E.value ? (v(), $(W, { key: 3 })) : A("", !0),
              ht.value || T(l).bottomButtons ? (v(), h("div", xl, [
                ht.value && o.value.length >= t.requiredItemsForBottomCreate ? (v(), $(ta, {
                  key: 0,
                  config: we.value,
                  disabled: !qt.value,
                  onClick: w,
                  onAppend: R
                }, null, 8, ["config", "disabled"])) : A("", !0),
                H(t.$slots, "bottom-buttons")
              ])) : A("", !0),
              t.paginator && Object.keys(t.paginator).length > 0 ? (v(), $(ae, fe({
                key: 5,
                ref_key: "paginatorRef",
                ref: ee
              }, t.paginator, {
                modelValue: D.value,
                "onUpdate:modelValue": p[2] || (p[2] = (V) => D.value = V),
                onLoading: Dt,
                onPerms: Bt,
                onResponse: Le
              }), null, 16, ["modelValue"])) : A("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, Al);
    };
  }
}), on = {
  install: (e) => {
    e.component("lkt-table") === void 0 && e.component("lkt-table", Jl);
  }
}, rn = (e) => (Y.navButtonSlot = e, !0), un = (e) => (Y.dropButtonSlot = e, !0), sn = (e) => (Y.createButtonSlot = e, !0), dn = (e) => {
  Y.defaultEmptySlot = e;
}, cn = (e) => {
  Y.defaultSaveIcon = e;
};
export {
  pn as Column,
  mn as createColumn,
  on as default,
  sn as setTableCreateButtonSlot,
  un as setTableDropButtonSlot,
  dn as setTableEmptySlot,
  rn as setTableNavButtonSlot,
  cn as setTableSaveIcon
};
