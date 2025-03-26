import { defineComponent as le, computed as u, ref as S, shallowReactive as Pt, watch as U, watchEffect as Lt, onMounted as jt, onBeforeUnmount as Ca, reactive as _t, provide as ta, h as Y, useId as wa, inject as st, getCurrentInstance as Ba, onUnmounted as Da, onUpdated as Ia, cloneVNode as Ta, resolveComponent as ke, createBlock as O, createElementBlock as h, unref as D, openBlock as v, normalizeProps as Re, mergeProps as ve, withCtx as z, createTextVNode as nt, toDisplayString as je, Fragment as x, withModifiers as aa, createCommentVNode as V, resolveDynamicComponent as Ee, useSlots as la, normalizeClass as oe, createElementVNode as Q, createVNode as Te, renderSlot as q, renderList as ue, withDirectives as at, vShow as lt, mergeDefaults as Ea, nextTick as yt, createSlots as Yt } from "vue";
import { __ as Aa } from "lkt-i18n";
import { SortDirection as Fe, Column as na, extractPropValue as Va, ColumnType as kt, prepareResourceData as oa, TableRowType as et, extractI18nValue as ia, LktSettings as ye, ensureButtonConfig as Ae, TablePermission as Be, PaginatorType as St, TableType as tt, getDefaultValues as Ra, Table as Na, ButtonType as $t } from "lkt-vue-kernel";
import { Column as vn, createColumn as fn } from "lkt-vue-kernel";
import { replaceAll as ra, generateRandomString as Ma } from "lkt-string-tools";
import { DataState as La } from "lkt-data-state";
import _a from "sortablejs";
import { time as Ve } from "lkt-date-tools";
/**
 * Vue 3 Carousel 0.14.0
 * (c) 2025
 * @license MIT
 */
const ua = ["viewport", "carousel"], wt = {
  "bottom-to-top": "btt",
  "left-to-right": "ltr",
  "right-to-left": "rtl",
  "top-to-bottom": "ttb"
}, sa = [
  "ltr",
  "left-to-right",
  "rtl",
  "right-to-left",
  "ttb",
  "top-to-bottom",
  "btt",
  "bottom-to-top"
], $a = {
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
}, da = ["slide", "fade"], ca = [
  "center",
  "start",
  "end",
  "center-even",
  "center-odd"
], j = {
  autoplay: 0,
  breakpointMode: ua[0],
  breakpoints: void 0,
  dir: sa[0],
  enabled: !0,
  gap: 0,
  height: "auto",
  i18n: $a,
  ignoreAnimations: !1,
  itemsToScroll: 1,
  itemsToShow: 1,
  modelValue: 0,
  mouseDrag: !0,
  pauseAutoplayOnHover: !1,
  preventExcessiveDragging: !1,
  slideEffect: da[0],
  snapAlign: ca[0],
  touchDrag: !0,
  transition: 300,
  wrapAround: !1
}, ze = Symbol("carousel"), Oa = (e) => {
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
function Pa(e) {
  return e.length === 0 ? 0 : e.reduce((r, n) => r + n, 0) / e.length;
}
function Kt({ slides: e, position: i, toShow: r }) {
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
    }, o = e[(g % e.length + e.length) % e.length].vnode, I = Ta(o, C);
    I.el = null, n.push(I);
  }
  return n;
}
const Ua = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function Wt(e) {
  if (!e.el || !(e.el instanceof Element))
    return;
  const i = e.el.querySelectorAll(Ua);
  for (const r of i)
    r instanceof HTMLElement && !r.hasAttribute("disabled") && r.getAttribute("aria-hidden") !== "true" && r.setAttribute("tabindex", "-1");
}
function Fa(e, i) {
  return Object.keys(e).filter((r) => !i.includes(r)).reduce((r, n) => (r[n] = e[n], r), {});
}
function ja(e) {
  const { isVertical: i, isReversed: r, dragged: n, effectiveSlideSize: l } = e, a = i ? n.y : n.x;
  if (a === 0)
    return 0;
  const f = Math.round(a / l);
  return r ? f : -f;
}
function De({ val: e, max: i, min: r }) {
  return i < r ? e : Math.min(Math.max(e, isNaN(r) ? e : r), isNaN(i) ? e : i);
}
function za(e) {
  const { transform: i } = window.getComputedStyle(e);
  return i.split(/[(,)]/).slice(1, -1).map((r) => parseFloat(r));
}
function Ha(e) {
  let i = 1, r = 1;
  return e.forEach((n) => {
    const l = za(n);
    l.length === 6 && (i /= l[0], r /= l[3]);
  }), { widthMultiplier: i, heightMultiplier: r };
}
function qa(e, i) {
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
function Ga(e, i, r) {
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
function Ut({ slideSize: e, viewportSize: i, align: r, itemsToShow: n }) {
  return n !== void 0 ? qa(r, n) : e !== void 0 && i !== void 0 ? Ga(r, e, i) : 0;
}
function va(e = "", i = {}) {
  return Object.entries(i).reduce((r, [n, l]) => r.replace(`{${n}}`, String(l)), e);
}
function fa({ val: e, max: i, min: r = 0 }) {
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
const Xa = le({
  name: "CarouselAria",
  setup() {
    const e = st(ze);
    return e ? () => Y("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, va(e.config.i18n.itemXofY, {
      currentSlide: e.currentSlide + 1,
      slidesCount: e.slidesCount
    })) : () => "";
  }
}), Ya = {
  // time to auto advance slides in ms
  autoplay: {
    default: j.autoplay,
    type: Number
  },
  // an object to store breakpoints
  breakpoints: {
    default: j.breakpoints,
    type: Object
  },
  // controls the breakpoint mode relative to the carousel container or the viewport
  breakpointMode: {
    default: j.breakpointMode,
    validator(e) {
      return ua.includes(e);
    }
  },
  // enable/disable the carousel component
  enabled: {
    default: j.enabled,
    type: Boolean
  },
  // control the gap between slides
  gap: {
    default: j.gap,
    type: Number
  },
  // control the gap between slides
  height: {
    default: j.height,
    type: [Number, String]
  },
  ignoreAnimations: {
    default: !1,
    type: [Array, Boolean, String]
  },
  // count of items to be scrolled
  itemsToScroll: {
    default: j.itemsToScroll,
    type: Number
  },
  // count of items to showed per view
  itemsToShow: {
    default: j.itemsToShow,
    type: [Number, String]
  },
  // aria-labels and additional text labels
  i18n: {
    default: j.i18n,
    type: Object
  },
  // slide number number of initial slide
  modelValue: {
    default: void 0,
    type: Number
  },
  // toggle mouse dragging.
  mouseDrag: {
    default: j.mouseDrag,
    type: Boolean
  },
  // toggle mouse dragging.
  touchDrag: {
    default: j.touchDrag,
    type: Boolean
  },
  pauseAutoplayOnHover: {
    default: j.pauseAutoplayOnHover,
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
    default: j.snapAlign,
    validator(e) {
      return ca.includes(e);
    }
  },
  slideEffect: {
    type: String,
    default: j.slideEffect,
    validator(e) {
      return da.includes(e);
    }
  },
  // sliding transition time in ms
  transition: {
    default: j.transition,
    type: Number
  },
  // control the gap between slides
  dir: {
    type: String,
    default: j.dir,
    validator(e, i) {
      if (!sa.includes(e))
        return !1;
      const r = e in wt ? wt[e] : e;
      return ["ttb", "btt"].includes(r) && (!i.height || i.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${e}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: j.wrapAround,
    type: Boolean
  }
}, Ka = le({
  name: "VueCarousel",
  props: Ya,
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
    const a = Oa(r), f = a.getSlides(), g = u(() => f.length), m = S(null), C = S(null), o = S(0), I = u(() => Object.assign(Object.assign(Object.assign({}, j), Fa(e, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, j.i18n), e.i18n) })), c = Pt(Object.assign({}, I.value)), k = S((l = e.modelValue) !== null && l !== void 0 ? l : 0), T = S(k.value);
    U(k, (s) => T.value = s);
    const A = S(0), Se = u(() => Math.ceil((g.value - 1) / 2)), $ = u(() => g.value - 1), Z = u(() => 0);
    let G = null, Ne = null, ee = null;
    const d = u(() => o.value + c.gap), w = u(() => {
      const s = c.dir || "ltr";
      return s in wt ? wt[s] : s;
    }), F = u(() => ["rtl", "btt"].includes(w.value)), P = u(() => ["ttb", "btt"].includes(w.value)), J = u(() => c.itemsToShow === "auto"), _ = u(() => P.value ? "height" : "width");
    function Ce() {
      var s;
      if (!qe.value)
        return;
      const b = (I.value.breakpointMode === "carousel" ? (s = m.value) === null || s === void 0 ? void 0 : s.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, y = Object.keys(e.breakpoints || {}).map((R) => Number(R)).sort((R, X) => +X - +R), B = {};
      y.some((R) => b >= R ? (Object.assign(B, e.breakpoints[R]), B.i18n && Object.assign(B.i18n, I.value.i18n, e.breakpoints[R].i18n), !0) : !1), Object.assign(c, I.value, B);
    }
    const dt = Ot(() => {
      Ce(), se(), fe();
    }), Me = Pt(/* @__PURE__ */ new Set()), H = S([]);
    function Bt({ widthMultiplier: s, heightMultiplier: b }) {
      H.value = f.map((y) => {
        var B;
        const R = (B = y.exposed) === null || B === void 0 ? void 0 : B.getBoundingRect();
        return {
          width: R.width * s,
          height: R.height * b
        };
      });
    }
    const Le = S({
      width: 0,
      height: 0
    });
    function Dt({ widthMultiplier: s, heightMultiplier: b }) {
      var y;
      const B = ((y = C.value) === null || y === void 0 ? void 0 : y.getBoundingClientRect()) || { width: 0, height: 0 };
      Le.value = {
        width: B.width * s,
        height: B.height * b
      };
    }
    function fe() {
      if (!C.value)
        return;
      const s = Ha(Me);
      if (Dt(s), Bt(s), J.value)
        o.value = Pa(H.value.map((b) => b[_.value]));
      else {
        const b = Number(c.itemsToShow), y = (b - 1) * c.gap;
        o.value = (Le.value[_.value] - y) / b;
      }
    }
    function se() {
      !c.wrapAround && g.value > 0 && (k.value = De({
        val: k.value,
        max: $.value,
        min: Z.value
      })), J.value || (c.itemsToShow = De({
        val: Number(c.itemsToShow),
        max: g.value,
        min: 1
      }));
    }
    const _e = u(() => typeof e.ignoreAnimations == "string" ? e.ignoreAnimations.split(",") : Array.isArray(e.ignoreAnimations) ? e.ignoreAnimations : e.ignoreAnimations ? !1 : []);
    Lt(() => se()), Lt(() => {
      fe();
    });
    let de;
    const He = (s) => {
      const b = s.target;
      if (!(!(b != null && b.contains(m.value)) || Array.isArray(_e.value) && _e.value.includes(s.animationName)) && (Me.add(b), !de)) {
        const y = () => {
          de = requestAnimationFrame(() => {
            fe(), y();
          });
        };
        y();
      }
    }, ct = (s) => {
      const b = s.target;
      b && Me.delete(b), de && Me.size === 0 && (cancelAnimationFrame(de), fe());
    }, qe = S(!1);
    typeof document < "u" && Lt(() => {
      qe.value && _e.value !== !1 ? (document.addEventListener("animationstart", He), document.addEventListener("animationend", ct)) : (document.removeEventListener("animationstart", He), document.removeEventListener("animationend", ct));
    }), jt(() => {
      qe.value = !0, Ce(), me(), m.value && (ee = new ResizeObserver(dt), ee.observe(m.value)), r("init");
    }), Ca(() => {
      qe.value = !1, a.cleanup(), Ne && clearTimeout(Ne), de && cancelAnimationFrame(de), G && clearInterval(G), ee && (ee.disconnect(), ee = null), typeof document < "u" && ft(), m.value && (m.value.removeEventListener("transitionend", fe), m.value.removeEventListener("animationiteration", fe));
    });
    let pe = !1;
    const Ge = { x: 0, y: 0 }, ie = _t({ x: 0, y: 0 }), Xe = S(!1), Ye = S(!1), It = () => {
      Xe.value = !0;
    }, it = () => {
      Xe.value = !1;
    }, vt = Ot((s) => {
      if (!s.ctrlKey)
        switch (s.key) {
          case "ArrowLeft":
          case "ArrowUp":
            P.value === s.key.endsWith("Up") && (F.value ? Pe(!0) : We(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            P.value === s.key.endsWith("Down") && (F.value ? We(!0) : Pe(!0));
            break;
        }
    }, 200), Tt = () => {
      document.addEventListener("keydown", vt);
    }, ft = () => {
      document.removeEventListener("keydown", vt);
    };
    function pt(s) {
      const b = s.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(b) || ge.value || (pe = s.type === "touchstart", !pe && (s.preventDefault(), s.button !== 0)))
        return;
      Ge.x = "touches" in s ? s.touches[0].clientX : s.clientX, Ge.y = "touches" in s ? s.touches[0].clientY : s.clientY;
      const y = pe ? "touchmove" : "mousemove", B = pe ? "touchend" : "mouseup";
      document.addEventListener(y, $e, { passive: !1 }), document.addEventListener(B, Ke, { passive: !0 });
    }
    const $e = Ot((s) => {
      Ye.value = !0;
      const b = "touches" in s ? s.touches[0].clientX : s.clientX, y = "touches" in s ? s.touches[0].clientY : s.clientY;
      ie.x = b - Ge.x, ie.y = y - Ge.y;
      const B = ja({
        isVertical: P.value,
        isReversed: F.value,
        dragged: ie,
        effectiveSlideSize: d.value
      });
      T.value = c.wrapAround ? k.value + B : De({
        val: k.value + B,
        max: $.value,
        min: Z.value
      }), r("drag", { deltaX: ie.x, deltaY: ie.y });
    });
    function Ke() {
      if ($e.cancel(), T.value !== k.value && !pe) {
        const y = (B) => {
          B.preventDefault(), window.removeEventListener("click", y);
        };
        window.addEventListener("click", y);
      }
      we(T.value), ie.x = 0, ie.y = 0, Ye.value = !1;
      const s = pe ? "touchmove" : "mousemove", b = pe ? "touchend" : "mouseup";
      document.removeEventListener(s, $e), document.removeEventListener(b, Ke);
    }
    function me() {
      !c.autoplay || c.autoplay <= 0 || (G = setInterval(() => {
        c.pauseAutoplayOnHover && Xe.value || Pe();
      }, c.autoplay));
    }
    function Oe() {
      G && (clearInterval(G), G = null);
    }
    function ce() {
      Oe(), me();
    }
    const ge = S(!1);
    function we(s, b = !1) {
      if (!b && ge.value)
        return;
      let y = s, B = s;
      A.value = k.value, c.wrapAround ? B = fa({
        val: y,
        max: $.value,
        min: Z.value
      }) : y = De({
        val: y,
        max: $.value,
        min: Z.value
      }), r("slide-start", {
        slidingToIndex: s,
        currentSlideIndex: k.value,
        prevSlideIndex: A.value,
        slidesCount: g.value
      }), Oe(), ge.value = !0, k.value = y, B !== y && be.pause(), r("update:modelValue", B), Ne = setTimeout(() => {
        c.wrapAround && B !== y && (be.resume(), k.value = B, r("loop", {
          currentSlideIndex: k.value,
          slidingToIndex: s
        })), r("slide-end", {
          currentSlideIndex: k.value,
          prevSlideIndex: A.value,
          slidesCount: g.value
        }), ge.value = !1, ce();
      }, c.transition);
    }
    function Pe(s = !1) {
      we(k.value + c.itemsToScroll, s);
    }
    function We(s = !1) {
      we(k.value - c.itemsToScroll, s);
    }
    function mt() {
      Ce(), se(), fe(), ce();
    }
    U(() => [I.value, e.breakpoints], () => Ce(), { deep: !0 }), U(() => e.autoplay, () => ce());
    const be = U(() => e.modelValue, (s) => {
      s !== k.value && we(Number(s), !0);
    });
    r("before-init");
    const Ue = u(() => {
      if (!c.wrapAround)
        return { before: 0, after: 0 };
      if (J.value)
        return { before: f.length, after: f.length };
      const s = Number(c.itemsToShow), b = Math.ceil(s + (c.itemsToScroll - 1)), y = b - T.value, B = b - (g.value - (T.value + 1));
      return {
        before: Math.max(0, y),
        after: Math.max(0, B)
      };
    }), xe = u(() => Ue.value.before ? J.value ? H.value.slice(-1 * Ue.value.before).reduce((s, b) => s + b[_.value] + c.gap, 0) * -1 : Ue.value.before * d.value * -1 : 0), rt = u(() => {
      var s;
      if (J.value) {
        const b = (k.value % f.length + f.length) % f.length;
        return Ut({
          slideSize: (s = H.value[b]) === null || s === void 0 ? void 0 : s[_.value],
          viewportSize: Le.value[_.value],
          align: c.snapAlign
        });
      }
      return Ut({
        align: c.snapAlign,
        itemsToShow: +c.itemsToShow
      });
    }), Je = u(() => {
      let s = 0;
      if (J.value) {
        if (k.value < 0 ? s = H.value.slice(k.value).reduce((b, y) => b + y[_.value] + c.gap, 0) * -1 : s = H.value.slice(0, k.value).reduce((b, y) => b + y[_.value] + c.gap, 0), s -= rt.value, !c.wrapAround) {
          const b = H.value.reduce((y, B) => y + B[_.value] + c.gap, 0) - Le.value[_.value] - c.gap;
          s = De({
            val: s,
            max: b,
            min: 0
          });
        }
      } else {
        let b = k.value - rt.value;
        c.wrapAround || (b = De({
          val: b,
          max: g.value - +c.itemsToShow,
          min: 0
        })), s = b * d.value;
      }
      return s * (F.value ? 1 : -1);
    }), Et = u(() => {
      var s, b;
      if (!J.value) {
        const R = k.value - rt.value;
        return c.wrapAround ? {
          min: Math.floor(R),
          max: Math.ceil(R + Number(c.itemsToShow) - 1)
        } : {
          min: Math.floor(De({
            val: R,
            max: g.value - Number(c.itemsToShow),
            min: 0
          })),
          max: Math.ceil(De({
            val: R + Number(c.itemsToShow) - 1,
            max: g.value - 1,
            min: 0
          }))
        };
      }
      let y = 0;
      {
        let R = 0, X = 0 - Ue.value.before;
        const ne = Math.abs(Je.value + xe.value);
        for (; R <= ne; ) {
          const te = (X % f.length + f.length) % f.length;
          R += ((s = H.value[te]) === null || s === void 0 ? void 0 : s[_.value]) + c.gap, X++;
        }
        y = X - 1;
      }
      let B = 0;
      {
        let R = y, X = 0;
        for (R < 0 ? X = H.value.slice(0, R).reduce((ne, te) => ne + te[_.value] + c.gap, 0) - Math.abs(Je.value + xe.value) : X = H.value.slice(0, R).reduce((ne, te) => ne + te[_.value] + c.gap, 0) - Math.abs(Je.value); X < Le.value[_.value]; ) {
          const ne = (R % f.length + f.length) % f.length;
          X += ((b = H.value[ne]) === null || b === void 0 ? void 0 : b[_.value]) + c.gap, R++;
        }
        B = R - 1;
      }
      return {
        min: Math.floor(y),
        max: Math.ceil(B)
      };
    }), At = u(() => {
      if (c.slideEffect === "fade")
        return;
      const s = P.value ? "Y" : "X", b = P.value ? ie.y : ie.x;
      let y = Je.value + b;
      if (!c.wrapAround && c.preventExcessiveDragging) {
        let B = 0;
        J.value ? B = H.value.reduce((ne, te) => ne + te[_.value], 0) : B = (g.value - Number(c.itemsToShow)) * d.value;
        const R = F.value ? 0 : -1 * B, X = F.value ? B : 0;
        y = De({
          val: y,
          min: R,
          max: X
        });
      }
      return `translate${s}(${y}px)`;
    }), gt = u(() => ({
      "--vc-transition-duration": ge.value ? Ct(c.transition, "ms") : void 0,
      "--vc-slide-gap": Ct(c.gap),
      "--vc-carousel-height": Ct(c.height),
      "--vc-cloned-offset": Ct(xe.value)
    })), ut = { slideTo: we, next: Pe, prev: We }, bt = _t({
      activeSlide: T,
      config: c,
      currentSlide: k,
      isSliding: ge,
      isVertical: P,
      maxSlide: $,
      minSlide: Z,
      nav: ut,
      normalizedDir: w,
      slideRegistry: a,
      slideSize: o,
      slides: f,
      slidesCount: g,
      viewport: C,
      visibleRange: Et
    });
    ta(ze, bt);
    const Qe = _t({
      config: c,
      currentSlide: k,
      maxSlide: $,
      middleSlide: Se,
      minSlide: Z,
      slideSize: o,
      slidesCount: g
    });
    return n({
      data: Qe,
      nav: ut,
      next: Pe,
      prev: We,
      restartCarousel: mt,
      slideTo: we,
      updateBreakpointsConfig: Ce,
      updateSlideSize: fe,
      updateSlidesData: se
    }), () => {
      var s;
      const b = i.default || i.slides, y = (b == null ? void 0 : b(Qe)) || [], { before: B, after: R } = Ue.value, X = Kt({
        slides: f,
        position: "before",
        toShow: B
      }), ne = Kt({
        slides: f,
        position: "after",
        toShow: R
      }), te = [...X, ...y, ...ne];
      if (!c.enabled || !te.length)
        return Y("section", {
          ref: m,
          class: ["carousel", "is-disabled"]
        }, te);
      const Vt = ((s = i.addons) === null || s === void 0 ? void 0 : s.call(i, Qe)) || [], Rt = Y("ol", {
        class: "carousel__track",
        style: { transform: At.value },
        onMousedownCapture: c.mouseDrag ? pt : null,
        onTouchstartPassiveCapture: c.touchDrag ? pt : null
      }, te), Ze = Y("div", { class: "carousel__viewport", ref: C }, Rt);
      return Y("section", {
        ref: m,
        class: [
          "carousel",
          `is-${w.value}`,
          `is-effect-${c.slideEffect}`,
          {
            "is-vertical": P.value,
            "is-sliding": ge.value,
            "is-dragging": Ye.value,
            "is-hover": Xe.value
          }
        ],
        dir: w.value,
        style: gt.value,
        "aria-label": c.i18n.ariaGallery,
        tabindex: "0",
        onFocus: Tt,
        onBlur: ft,
        onMouseenter: It,
        onMouseleave: it
      }, [Ze, Vt, Y(Xa)]);
    };
  }
});
var Ft;
(function(e) {
  e.arrowDown = "arrowDown", e.arrowLeft = "arrowLeft", e.arrowRight = "arrowRight", e.arrowUp = "arrowUp";
})(Ft || (Ft = {}));
const xt = (e) => `icon${e.charAt(0).toUpperCase() + e.slice(1)}`, Wa = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function xa(e) {
  return e in Ft;
}
const Jt = (e) => e && xa(e), Qt = le({
  props: {
    name: {
      type: String,
      required: !0,
      validator: Jt
    },
    title: {
      type: String,
      default: (e) => e.name ? j.i18n[xt(e.name)] : ""
    }
  },
  setup(e) {
    const i = st(ze, null);
    return () => {
      const r = e.name;
      if (!r || !Jt(r))
        return;
      const n = Wa[r], l = Y("path", { d: n }), a = (i == null ? void 0 : i.config.i18n[xt(r)]) || e.title, f = Y("title", a);
      return Y("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": a
      }, [f, l]);
    };
  }
}), Ja = le({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(e, { slots: i, attrs: r }) {
    const n = st(ze);
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
    })[n.normalizedDir], m = u(() => !n.config.wrapAround && n.currentSlide <= n.minSlide), C = u(() => !n.config.wrapAround && n.currentSlide >= n.maxSlide);
    return () => {
      const { i18n: o } = n.config, I = Y("button", Object.assign(Object.assign({ type: "button", disabled: m.value, "aria-label": o.ariaPreviousSlide, title: o.ariaPreviousSlide, onClick: n.nav.prev }, r), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": m.value },
        r.class
      ] }), (a == null ? void 0 : a()) || Y(Qt, { name: f() })), c = Y("button", Object.assign(Object.assign({ type: "button", disabled: C.value, "aria-label": o.ariaNextSlide, title: o.ariaNextSlide, onClick: n.nav.next }, r), { class: [
        "carousel__next",
        { "carousel__next--disabled": C.value },
        r.class
      ] }), (l == null ? void 0 : l()) || Y(Qt, { name: g() }));
      return [I, c];
    };
  }
}), Qa = le({
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
    const i = st(ze);
    if (!i)
      return () => "";
    const r = u(() => i.config.itemsToShow), n = u(() => Ut({
      align: i.config.snapAlign,
      itemsToShow: r.value
    })), l = u(() => e.paginateByItemsToShow && r.value > 1), a = u(() => Math.ceil((i.activeSlide - n.value) / r.value)), f = u(() => Math.ceil(i.slidesCount / r.value)), g = (m) => fa(l.value ? {
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
      for (let I = l.value ? 0 : i.minSlide; I <= (l.value ? f.value - 1 : i.maxSlide); I++) {
        const c = va(i.config.i18n[l.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: I + 1
        }), k = g(I), T = Y("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": k
          },
          "aria-label": c,
          "aria-pressed": k,
          "aria-controls": (C = (m = i.slides[I]) === null || m === void 0 ? void 0 : m.exposed) === null || C === void 0 ? void 0 : C.id,
          title: c,
          disabled: e.disableOnClick,
          onClick: () => i.nav.slideTo(l.value ? Math.floor(I * +i.config.itemsToShow + n.value) : I)
        }), A = Y("li", { class: "carousel__pagination-item", key: I }, T);
        o.push(A);
      }
      return Y("ol", { class: "carousel__pagination" }, o);
    };
  }
}), Zt = le({
  name: "CarouselSlide",
  props: {
    id: {
      type: String,
      default: (e) => e.isClone ? void 0 : wa()
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
    const l = st(ze);
    if (ta(ze, void 0), !l)
      return () => "";
    const a = S(e.index), f = (T) => {
      a.value = T;
    }, g = Ba(), m = () => {
      const T = g.vnode.el;
      return T ? T.getBoundingClientRect() : { width: 0, height: 0 };
    };
    n({
      id: e.id,
      setIndex: f,
      getBoundingRect: m
    });
    const C = u(() => a.value === l.activeSlide), o = u(() => a.value === l.activeSlide - 1), I = u(() => a.value === l.activeSlide + 1), c = u(() => a.value >= l.visibleRange.min && a.value <= l.visibleRange.max), k = u(() => {
      if (l.config.itemsToShow === "auto")
        return;
      const T = l.config.itemsToShow, A = l.config.gap > 0 && T > 1 ? `calc(${100 / T}% - ${l.config.gap * (T - 1) / T}px)` : `${100 / T}%`;
      return l.isVertical ? { height: A } : { width: A };
    });
    return l.slideRegistry.registerSlide(g, e.index), Da(() => {
      l.slideRegistry.unregisterSlide(g);
    }), e.isClone && (jt(() => {
      Wt(g.vnode);
    }), Ia(() => {
      Wt(g.vnode);
    })), () => {
      var T, A;
      return l.config.enabled ? Y("li", {
        style: [i.style, Object.assign({}, k.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": e.isClone,
          "carousel__slide--visible": c.value,
          "carousel__slide--active": C.value,
          "carousel__slide--prev": o.value,
          "carousel__slide--next": I.value,
          "carousel__slide--sliding": l.isSliding
        },
        onFocusin: () => {
          l.viewport && (l.viewport.scrollLeft = 0), l.nav.slideTo(a.value);
        },
        id: e.isClone ? void 0 : e.id,
        "aria-hidden": e.isClone || void 0
      }, (A = r.default) === null || A === void 0 ? void 0 : A.call(r, {
        currentIndex: a.value,
        isActive: C.value,
        isClone: e.isClone,
        isPrev: o.value,
        isNext: I.value,
        isSliding: l.isSliding,
        isVisible: c.value
      })) : (T = r.default) === null || T === void 0 ? void 0 : T.call(r);
    };
  }
}), Za = (e, i, r, n) => {
  if (!r) return 0;
  let l = String(e[r.key]).toLowerCase(), a = String(i[r.key]).toLowerCase();
  if (n === Fe.Asc) {
    if (l > a) return 1;
    if (a > l) return -1;
  } else {
    if (l > a) return -1;
    if (a > l) return 1;
  }
  return 0;
}, ot = (e, i, r, n = []) => {
  if (e.extractTitleFromColumn) {
    let l = n.find((a) => a.key === e.extractTitleFromColumn);
    if (l)
      return ot(l, i, r, n);
  }
  if (e.formatter && typeof e.formatter == "function") {
    let l = e.formatter(i[e.key], i, e, r);
    return l.startsWith("__:") ? Aa(l.substring(3)) : l;
  }
  return i[e.key];
}, el = (e, i, r) => {
  if (!e.colspan) return -1;
  let n = i;
  return r.forEach((l) => {
    let a = zt(e, l);
    a > 0 && a < n && (n = a);
  }), n;
}, zt = (e, i) => e.colspan === !1 ? !1 : typeof e.colspan == "function" ? e.colspan(i) : e.colspan, tl = (e, i) => typeof e.preferSlot > "u" ? !0 : e.preferSlot === !1 ? !1 : typeof e.preferSlot == "function" ? e.preferSlot(i) : !0, al = (e, i, r) => {
  if (typeof e != "object" || !e.key || i.indexOf(e.key) > -1) return !1;
  let n = zt(e, r);
  return typeof e.colspan > "u" ? !0 : (typeof e.colspan < "u" && (typeof e.colspan == "function" ? n = parseInt(e.colspan(r)) : n = parseInt(e.colspan)), n > 0);
}, ll = (e = []) => {
  if (e.length > 0) {
    for (let i = 0; i < e.length; ++i)
      if (e[i].sortable) return e[i].key;
  }
  return "";
}, nl = (e, i) => {
  if (e.length > 0) {
    for (let r = 0; r < e.length; ++r)
      if (e[r].key === i) return e[r];
  }
  return null;
}, pa = (e) => e.type ? `is-${e.type}` : "", ma = /* @__PURE__ */ le({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new na() },
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
    U(a, (o) => {
      const I = JSON.parse(JSON.stringify(l.value));
      I[n.column.key] = o, r("update:modelValue", I);
    }), U(() => n.modelValue, (o) => {
      l.value = o, a.value = l.value[n.column.key];
    });
    const g = u(() => ({ ...n.column.slotData, item: l.value })), m = u(() => {
      var o, I, c, k;
      if ((o = n.column.field) != null && o.modalData && typeof ((I = n.column.field) == null ? void 0 : I.modalData) == "object")
        for (let T in n.column.field.modalData)
          if (typeof ((c = n.column.field) == null ? void 0 : c.modalData[T]) == "string" && n.column.field.modalData[T].startsWith("prop:")) {
            let A = n.column.field.modalData[T].substring(5);
            l.value[A];
          } else
            n.column.field.modalData[T];
      return (k = n.column.field) == null ? void 0 : k.modalData;
    }), C = u(() => typeof n.column.field == "string" && n.column.field.startsWith("prop:") ? Va(n.column.field, l.value) : n.column.field);
    return (o, I) => {
      var A, Se, $, Z;
      const c = ke("lkt-anchor"), k = ke("lkt-button"), T = ke("lkt-field");
      return o.column.type === D(kt).Anchor ? (v(), O(c, Re(ve({ key: 0 }, o.column.anchor)), {
        default: z(() => [
          nt(je(D(ot)(o.column, l.value, o.i)), 1)
        ]),
        _: 1
      }, 16)) : o.column.type === D(kt).Button ? (v(), O(k, ve({ key: 1 }, o.column.button, { prop: l.value }), {
        default: z(() => [
          nt(je(D(ot)(o.column, l.value, o.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : o.column.type === D(kt).Field && o.hasInlineEditPerm ? (v(), O(T, ve({ key: 2 }, C.value, {
        "read-mode": !o.column.editable || !o.editModeEnabled,
        ref: (G) => f.value = G,
        "slot-data": g.value,
        label: ((A = o.column.field) == null ? void 0 : A.type) === "switch" || ((Se = o.column.field) == null ? void 0 : Se.type) === "check" ? o.column.label : "",
        "modal-data": m.value,
        prop: l.value,
        modelValue: a.value,
        "onUpdate:modelValue": I[0] || (I[0] = (G) => a.value = G)
      }), null, 16, ["read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : o.column.type === D(kt).Field ? (v(), O(T, ve({ key: 3 }, C.value, {
        "read-mode": "",
        ref: (G) => f.value = G,
        "slot-data": g.value,
        label: (($ = o.column.field) == null ? void 0 : $.type) === "switch" || ((Z = o.column.field) == null ? void 0 : Z.type) === "check" ? o.column.label : "",
        "modal-data": m.value,
        prop: l.value,
        "model-value": a.value
      }), null, 16, ["slot-data", "label", "modal-data", "prop", "model-value"])) : (v(), h(x, { key: 4 }, [
        nt(je(D(ot)(o.column, l.value, o.i, o.columns)), 1)
      ], 64));
    };
  }
}), Ie = class Ie {
};
Ie.navButtonSlot = "", Ie.dropButtonSlot = "", Ie.editButtonSlot = "", Ie.createButtonSlot = "", Ie.defaultEmptySlot = void 0, Ie.defaultSaveIcon = "", Ie.defaultNoResultsMessage = "No results";
let K = Ie;
const ol = /* @__PURE__ */ le({
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
    const r = i, n = e, l = u(() => K.dropButtonSlot !== ""), a = u(() => K.dropButtonSlot), f = u(() => oa(n.config.resourceData, n.item));
    return (g, m) => {
      const C = ke("lkt-button");
      return v(), O(C, ve({ palette: "table-delete" }, n.config, {
        disabled: g.disabled,
        "resource-data": f.value,
        onClick: m[0] || (m[0] = aa((o) => r("click", o), ["prevent", "stop"]))
      }), {
        default: z(() => [
          l.value ? (v(), O(Ee(a.value), { key: 0 })) : V("", !0)
        ]),
        _: 1
      }, 16, ["disabled", "resource-data"]);
    };
  }
}), il = /* @__PURE__ */ le({
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
    const r = i, n = e, l = u(() => K.editButtonSlot !== ""), a = u(() => K.editButtonSlot), f = u(() => oa(n.config.resourceData, n.item));
    return (g, m) => {
      const C = ke("lkt-button");
      return v(), O(C, ve({ palette: "table-edit" }, n.config, {
        disabled: g.disabled,
        "resource-data": f.value,
        onClick: m[0] || (m[0] = aa((o) => r("click"), ["prevent", "stop"]))
      }), {
        default: z(() => [
          l.value ? (v(), O(Ee(a.value), { key: 0 })) : V("", !0)
        ]),
        _: 1
      }, 16, ["disabled", "resource-data"]);
    };
  }
}), rl = ["data-i", "data-draggable"], ul = ["data-role", "data-i"], sl = {
  key: 1,
  class: "lkt-table-nav-cell"
}, dl = { class: "lkt-table-nav-container" }, cl = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, vl = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, fl = ["colspan"], pl = ["colspan"], ml = ["data-column", "colspan", "title"], gl = {
  key: 6,
  class: "lkt-table-col-drop"
}, bl = {
  key: 7,
  class: "lkt-table-col-edit"
}, hl = /* @__PURE__ */ le({
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
    rowDisplayType: { type: [Number, Function], default: et.Auto },
    renderDrag: { type: [Boolean, Function], default: !0 },
    disabledDrag: { type: [Boolean, Function], default: !0 }
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
    var ee;
    const r = la(), n = i, l = e, a = S(l.modelValue);
    let f = typeof l.rowDisplayType == "function" ? l.rowDisplayType(a.value, l.i) : l.rowDisplayType;
    f || (f = et.Auto);
    const g = [et.Auto, et.PreferCustomItem].includes(f), m = [et.Auto, et.PreferItem].includes(f), C = S((ee = l.editButton.anchor) == null ? void 0 : ee.to);
    for (let d in a.value) C.value = ra(C.value, ":" + d, a.value[d]);
    const o = (d) => n("click", d), I = (d, w) => {
      n("show", d, w);
    }, c = u(() => {
      let d = [], w = !1;
      return typeof l.disabledDrag == "function" ? w = l.disabledDrag(a.value) : w = G.value === !0, !w && l.sortable && l.isDraggable ? d.push("handle") : w && d.push("disabled"), d.join(" ");
    }), k = u(() => K.navButtonSlot !== ""), T = u(() => K.navButtonSlot), A = () => {
      n("item-up", l.i);
    }, Se = () => {
      n("item-down", l.i);
    }, $ = () => {
      n("item-drop", l.i);
    };
    U(() => l.modelValue, (d) => a.value = d), U(a, (d) => {
      n("update:modelValue", d);
    }, { deep: !0 });
    const Z = u(() => typeof l.renderDrag == "function" ? l.renderDrag(a.value) : l.renderDrag === !0), G = u(() => typeof l.disabledDrag == "function" ? l.disabledDrag(a.value) : l.disabledDrag === !0), Ne = u(() => c.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator");
    return (d, w) => {
      const F = ke("lkt-button");
      return v(), h("tr", {
        "data-i": d.i,
        "data-draggable": d.isDraggable,
        class: oe({ "type-custom-item": D(g), "type-item": D(m) })
      }, [
        d.sortable && d.editModeEnabled && Z.value ? (v(), h("td", {
          key: 0,
          "data-role": Ne.value,
          class: oe(c.value),
          "data-i": d.i
        }, w[3] || (w[3] = [
          Q("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]), 10, ul)) : V("", !0),
        d.addNavigation && d.editModeEnabled ? (v(), h("td", sl, [
          Q("div", dl, [
            Te(F, {
              palette: "table-nav",
              disabled: d.i === 0,
              onClick: A
            }, {
              default: z(() => [
                k.value ? (v(), O(Ee(T.value), {
                  key: 0,
                  direction: "up"
                })) : (v(), h("i", cl))
              ]),
              _: 1
            }, 8, ["disabled"]),
            Te(F, {
              palette: "table-nav",
              disabled: d.latestRow,
              onClick: Se
            }, {
              default: z(() => [
                k.value ? (v(), O(Ee(T.value), {
                  key: 0,
                  direction: "down"
                })) : (v(), h("i", vl))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : V("", !0),
        d.displayHiddenColumnsIndicator ? (v(), h("td", {
          key: 2,
          onClick: w[0] || (w[0] = (P) => I(P, d.i)),
          "data-role": "show-more",
          class: oe(d.hiddenIsVisible ? "state-open" : "")
        }, null, 2)) : V("", !0),
        D(g) && D(r)[`item-${d.i}`] ? (v(), h("td", {
          key: "td" + d.i,
          colspan: d.visibleColumns.length
        }, [
          q(d.$slots, `item-${d.i}`, {
            item: a.value,
            index: d.i,
            editing: d.editModeEnabled,
            canCreate: d.canCreate,
            canRead: d.canRead,
            canUpdate: d.canEdit,
            canDrop: d.canDrop,
            isLoading: d.isLoading,
            doDrop: () => $()
          })
        ], 8, fl)) : D(m) && D(r).item ? (v(), h("td", {
          key: "td" + d.i,
          colspan: d.visibleColumns.length
        }, [
          q(d.$slots, "item", {
            item: a.value,
            index: d.i,
            editing: d.editModeEnabled,
            canCreate: d.canCreate,
            canRead: d.canRead,
            canUpdate: d.canEdit,
            canDrop: d.canDrop,
            isLoading: d.isLoading,
            doDrop: () => $()
          })
        ], 8, pl)) : (v(!0), h(x, { key: 5 }, ue(d.visibleColumns, (P) => (v(), h(x, null, [
          D(al)(P, d.emptyColumns, a.value) ? (v(), h("td", {
            key: "td" + d.i,
            "data-column": P.key,
            colspan: D(zt)(P, a.value),
            title: D(ot)(P, a.value, d.i, d.visibleColumns),
            class: oe(D(pa)(P)),
            onClick: w[2] || (w[2] = (J) => o(J))
          }, [
            d.$slots[P.key] && D(tl)(P, a.value) ? q(d.$slots, P.key, {
              key: 0,
              value: a.value[P.key],
              item: a.value,
              column: P,
              i: d.i
            }) : a.value ? (v(), O(ma, {
              key: 1,
              modelValue: a.value,
              "onUpdate:modelValue": w[1] || (w[1] = (J) => a.value = J),
              column: P,
              columns: d.visibleColumns,
              "edit-mode-enabled": d.editModeEnabled,
              "has-inline-edit-perm": d.hasInlineEditPerm,
              i: d.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : V("", !0)
          ], 10, ml)) : V("", !0)
        ], 64))), 256)),
        d.canDrop && d.editModeEnabled ? (v(), h("td", gl, [
          Te(ol, {
            config: d.dropButton,
            item: a.value,
            onClick: $
          }, null, 8, ["config", "item"])
        ])) : V("", !0),
        d.canEdit && d.editModeEnabled ? (v(), h("td", bl, [
          Te(il, {
            config: d.editButton,
            item: a.value
          }, null, 8, ["config", "item"])
        ])) : V("", !0)
      ], 10, rl);
    };
  }
}), yl = { "data-role": "hidden-row" }, kl = ["colspan"], Sl = ["data-column"], Cl = ["data-i"], wl = ["data-column", "title"], Bl = /* @__PURE__ */ le({
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
    return U(() => n.modelValue, (f) => l.value = f), U(l, () => r("update:modelValue", l.value)), (f, g) => at((v(), h("tr", yl, [
      Q("td", { colspan: f.hiddenColumnsColSpan }, [
        Q("table", null, [
          Q("tr", null, [
            (v(!0), h(x, null, ue(f.hiddenColumns, (m) => (v(), h("th", {
              "data-column": m.key
            }, [
              Q("div", null, je(m.label), 1)
            ], 8, Sl))), 256))
          ]),
          Q("tr", { "data-i": f.i }, [
            (v(!0), h(x, null, ue(f.hiddenColumns, (m, C) => (v(), h("td", {
              "data-column": m.key,
              title: D(ot)(m, l.value, C, f.hiddenColumns),
              onClick: g[1] || (g[1] = (o) => a(o))
            }, [
              f.$slots[m.key] ? q(f.$slots, m.key, {
                key: 0,
                value: l.value[m.key],
                item: l.value,
                column: m,
                i: C
              }) : (v(), O(ma, {
                key: 1,
                column: m,
                columns: f.hiddenColumns,
                modelValue: l.value,
                "onUpdate:modelValue": g[0] || (g[0] = (o) => l.value = o),
                i: C,
                "edit-mode-enabled": f.editModeEnabled,
                "has-inline-edit-perm": f.hasInlineEditPerm
              }, null, 8, ["column", "columns", "modelValue", "i", "edit-mode-enabled", "has-inline-edit-perm"]))
            ], 8, wl))), 256))
          ], 8, Cl)
        ])
      ], 8, kl)
    ], 512)), [
      [lt, f.hiddenIsVisible]
    ]);
  }
}), ea = /* @__PURE__ */ le({
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
    const r = i, n = e, l = u(() => K.createButtonSlot !== ""), a = u(() => K.createButtonSlot), f = {
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
    return (o, I) => {
      const c = ke("lkt-button");
      return v(), O(c, ve(g, {
        disabled: o.disabled,
        onClick: m
      }), {
        default: z(() => [
          l.value ? (v(), O(Ee(a.value), { key: 0 })) : V("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), Dl = ["data-column", "data-sortable", "data-sort", "colspan", "title"], Il = /* @__PURE__ */ le({
  __name: "TableHeader",
  props: {
    column: { default: () => new na() },
    sortBy: { default: "" },
    sortDirection: { default: "" },
    amountOfColumns: { default: 0 },
    items: { default: () => [] }
  },
  emits: [
    "click"
  ],
  setup(e, { emit: i }) {
    const r = i, n = e, l = u(() => el(n.column, n.amountOfColumns, n.items)), a = u(() => n.column.sortable === !0), f = u(() => a.value && n.sortBy === n.column.key ? n.sortDirection : ""), g = u(() => ia(n.column.label)), m = u(() => a.value && n.sortBy === n.column.key ? n.sortDirection === Fe.Asc ? ye.defaultTableSortAscIcon : n.sortDirection === Fe.Desc ? ye.defaultTableSortDescIcon : "" : ""), C = () => r("click", n.column);
    return (o, I) => (v(), h("th", {
      "data-column": o.column.key,
      "data-sortable": a.value,
      "data-sort": f.value,
      colspan: l.value,
      title: g.value,
      class: oe(D(pa)(o.column)),
      onClick: C
    }, [
      Q("div", null, [
        nt(je(g.value) + " ", 1),
        m.value ? (v(), h("i", {
          key: 0,
          class: oe(m.value)
        }, null, 2)) : V("", !0)
      ])
    ], 10, Dl));
  }
}), Tl = ["id"], El = { class: "lkt-table-page-buttons" }, Al = { class: "switch-edition-mode" }, Vl = {
  key: 0,
  class: "lkt-table-page-buttons"
}, Rl = {
  key: 1,
  class: "lkt-table-page-filters"
}, Nl = { class: "lkt-table" }, Ml = { key: 0 }, Ll = { key: 0 }, _l = {
  key: 0,
  "data-role": "drag-indicator"
}, $l = { key: 1 }, Ol = { key: 2 }, Pl = {
  key: 3,
  class: "lkt-table-col-drop"
}, Ul = {
  key: 4,
  class: "lkt-table-col-edit"
}, Fl = ["id"], jl = ["id"], zl = ["data-i"], Hl = ["data-i"], ql = ["id"], Gl = { class: "lkt-carousel-slide" }, Xl = { class: "lkt-carousel-slide" }, Yl = {
  key: 2,
  class: "lkt-table-empty"
}, Kl = {
  key: 4,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, Wl = /* @__PURE__ */ le({
  __name: "LktTable",
  props: /* @__PURE__ */ Ea({
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
    createEnabledValidator: { type: Function }
  }, Ra(Na)),
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
    var Gt, Xt;
    const n = r, l = la(), a = e, f = {}, g = S(typeof a.sorter == "function" ? a.sorter : Za), m = S(ll(a.columns)), C = S(Fe.Asc), o = S(a.modelValue), I = S(f), c = S(null), k = S(a.columns), T = S((Gt = a.paginator) == null ? void 0 : Gt.modelValue), A = S(a.loading), Se = S(!1), $ = S(a.perms), Z = S(null), G = S(null), Ne = S(null), ee = S({}), d = S(new La({ items: o.value }, a.dataStateConfig)), w = S(a.editMode), F = S(0), P = S(null), J = S(((Xt = a.carousel) == null ? void 0 : Xt.currentSlide) || 0), _ = S(Ae(a.saveButton, ye.defaultSaveButton)), Ce = S(Ae(a.createButton, ye.defaultCreateButton)), dt = S(Ae(a.editModeButton, ye.defaultEditModeButton)), Me = S(Ae(a.dropButton, ye.defaultDropButton));
    U(() => a.saveButton, (t) => _.value = Ae(a.saveButton, ye.defaultSaveButton)), U(() => a.createButton, (t) => Ce.value = Ae(a.createButton, ye.defaultCreateButton)), U(() => a.editModeButton, (t) => dt.value = Ae(a.editModeButton, ye.defaultEditModeButton)), U(() => a.dropButton, (t) => Me.value = Ae(a.dropButton, ye.defaultDropButton));
    const H = S(!1);
    U(A, (t) => n("update:loading", t)), U(T, (t) => n("page", t));
    const Bt = (t) => {
      $.value = t;
    }, Le = (t) => {
      var p;
      Array.isArray(t.data) && ((!a.paginator || ![St.LoadMore, St.Infinite].includes((p = a.paginator) == null ? void 0 : p.type)) && o.value.splice(0, o.value.length), o.value = [...o.value, ...t.data]), A.value = !1, Se.value = !0, d.value.store({ items: o.value }).turnStoredIntoOriginal(), H.value = !1, yt(() => {
        F.value = Ve(), it.value, n("read-response", t);
      });
    }, Dt = () => yt(() => A.value = !0), fe = () => {
      Z.value.doRefresh();
    }, se = Ma(12), _e = u(() => {
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
    }), de = u(() => k.value.filter((t) => !t.hidden)), He = u(() => k.value.filter((t) => t.hidden)), ct = u(() => {
      let t = de.value.length + 1;
      return a.sortable && ++t, t;
    }), qe = u(() => k.value.filter((t) => t.isForRowKey)), pe = u(() => He.value.length > 0 && !a.sortable), Ge = u(() => k.value.map((t) => t.key)), ie = u(() => {
      let t = [];
      for (let p in l) Ge.value.indexOf(p) !== -1 && t.push(p);
      return t;
    }), Xe = u(() => {
      let t = [];
      for (let p in l) p.indexOf("slide-") !== -1 && t.push(p);
      return t;
    }), Ye = u(() => {
      var t;
      return a.hiddenSave || A.value || !((t = _.value) != null && t.resource || _.value.type) ? !1 : w.value && H.value ? !0 : w.value;
    }), It = u(() => ht.value && o.value.length >= a.requiredItemsForTopCreate || xe.value ? !0 : Ye.value || w.value && me.value), it = u(() => {
      var t, p;
      return F.value, typeof ((t = _.value) == null ? void 0 : t.disabled) == "function" ? _.value.disabled({
        value: o.value,
        dataState: d.value
      }) : typeof ((p = _.value) == null ? void 0 : p.disabled) == "boolean" ? _.value.disabled : !H.value;
    }), vt = u(() => o.value.length), Tt = u(() => {
      var t;
      return {
        items: o.value,
        ...(t = _.value) == null ? void 0 : t.resourceData
      };
    }), ft = u(() => a.titleTag === "" ? "h2" : a.titleTag), pt = u(() => a.wrapContentTag === "" ? "div" : a.wrapContentTag), $e = u(() => ia(a.title)), Ke = u(() => {
      var t;
      return (t = a.drag) == null ? void 0 : t.enabled;
    }), me = u(() => $.value.includes(Be.Create)), Oe = u(() => $.value.includes("read")), ce = u(() => $.value.includes(Be.Update)), ge = u(() => $.value.includes(Be.Edit)), we = u(() => $.value.includes(Be.InlineEdit)), Pe = u(() => $.value.includes(Be.ModalCreate)), We = u(() => $.value.includes(Be.InlineCreate)), mt = u(() => $.value.includes(Be.InlineCreateEver)), be = u(() => $.value.includes(Be.Drop)), Ue = u(() => $.value.includes(Be.SwitchEditMode)), xe = u(() => !Ue.value || !ce.value && !be.value || !ce.value && be.value ? !1 : !A.value), rt = u(() => {
      var t;
      return (typeof ((t = a.paginator) == null ? void 0 : t.type) < "u" && [St.LoadMore, St.Infinite].includes(a.paginator.type) || !A.value) && o.value.length > 0;
    }), Je = (t) => {
      let p = t.target;
      if (typeof p.dataset.column > "u")
        do
          p = p.parentNode;
        while (typeof p.dataset.column > "u" && p.tagName !== "TABLE" && p.tagName !== "body");
      if (p.tagName === "TD" && (p = p.parentNode, p = p.dataset.i, typeof p < "u"))
        return o.value[p];
    }, Et = (t) => o.value[t], At = (t) => {
      var p;
      return (p = c.value) == null ? void 0 : p.querySelector(`[data-i="${t}"]`);
    }, gt = (t) => I.value["tr_" + t] === !0, ut = (t) => {
      t && t.sortable && (o.value = o.value.sort((p, L) => g.value(p, L, t, C.value)), C.value = C.value === Fe.Asc ? Fe.Desc : Fe.Asc, m.value = t.key, F.value = Ve(), n("sort", [m.value, C.value]));
    }, bt = (t) => {
      n("click", t);
    }, Qe = (t, p) => {
      let L = "tr_" + p;
      I.value[L] = typeof I.value[L] > "u" ? !0 : !I.value[L];
    }, s = (t) => {
      var L, W, ae, re, N, E, M, he;
      let p = parseInt((re = (ae = (W = (L = t == null ? void 0 : t.originalEvent) == null ? void 0 : L.toElement) == null ? void 0 : W.closest("tr")) == null ? void 0 : ae.dataset) == null ? void 0 : re.i);
      return !(typeof ((N = a.drag) == null ? void 0 : N.isValid) == "function" && !((E = a.drag) != null && E.isValid(o.value[p])) || typeof ((M = a.drag) == null ? void 0 : M.isValid) == "boolean" && !((he = a.drag) != null && he.isValid));
    }, b = (t) => {
      var p, L;
      return typeof ((p = a.drag) == null ? void 0 : p.isDraggable) == "function" ? (L = a.drag) == null ? void 0 : L.isDraggable(t) : !0;
    }, y = () => {
      if (me.value) {
        n("click-create");
        return;
      }
      if (mt.value)
        n("click-create");
      else {
        if (typeof a.newValueGenerator == "function") {
          let t = a.newValueGenerator();
          if (typeof t == "object" || a.type !== tt.Table) {
            o.value.push(t);
            return;
          }
        }
        o.value.push({});
      }
    }, B = (t) => {
      o.value.push(t);
    }, R = () => A.value = !0, X = () => A.value = !1, ne = (t, p) => {
      var L, W, ae;
      if (!((L = _.value) != null && L.type && [
        $t.Split,
        $t.SplitEver,
        $t.SplitLazy
      ].includes((W = _.value) == null ? void 0 : W.type))) {
        if (n("before-save"), (ae = _.value) != null && ae.resource && (A.value = !1, !p.success)) {
          n("error", p.httpStatus);
          return;
        }
        d.value.turnStoredIntoOriginal(), H.value = !1, n("save", p);
      }
    }, te = (t, p, L) => {
      if (L >= t.length) {
        let W = L - t.length + 1;
        for (; W--; ) t.push(void 0);
      }
      return t.splice(L, 0, t.splice(p, 1)[0]), t;
    }, Vt = (t) => {
      te(o.value, t, t - 1), F.value = Ve();
    }, Rt = (t) => {
      te(o.value, t, t + 1), F.value = Ve();
    }, Ze = (t) => {
      o.value.splice(t, 1), F.value = Ve();
    }, ga = () => {
      var t;
      ee.value && typeof ((t = ee.value) == null ? void 0 : t.destroy) == "function" && (ee.value.destroy(), ee.value = {});
    }, Ht = () => {
      P.value || (P.value = document.getElementById("lkt-table-body-" + se)), ee.value = new _a(P.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(t) {
          let p = t.oldIndex, L = t.newIndex;
          o.value.splice(L, 0, o.value.splice(p, 1)[0]), F.value = Ve(), n("drag-end", o.value[L]);
        },
        onMove: function(t, p) {
          return s(t);
        }
      });
    }, Nt = (t, p, L = !1) => {
      let W = [F.value, se, "row", p];
      return L && W.push("hidden"), qe.value.forEach((ae) => {
        let re = String(t[ae.key]).toLowerCase();
        re.length > 50 && (re = re.substring(0, 50)), re = ra(re, " ", "-"), W.push(re);
      }), W.join("-");
    }, qt = u(() => typeof a.createEnabledValidator == "function" ? a.createEnabledValidator({ items: o.value }) : !0), ht = u(() => mt.value || me.value && w.value || We.value && w.value || Pe.value && w.value), ba = u(() => [tt.Ol, tt.Ul].includes(a.type)), Mt = (t, p) => typeof a.itemDisplayChecker == "function" ? a.itemDisplayChecker(t) : !0;
    jt(() => {
      var t;
      a.initialSorting && ut(nl(a.columns, m.value)), d.value.store({ items: o.value }).turnStoredIntoOriginal(), H.value = !1, (t = a.drag) != null && t.enabled && yt(() => {
        Ht();
      });
    }), U(() => {
      var t;
      return (t = a.drag) == null ? void 0 : t.enabled;
    }, (t) => {
      t ? Ht() : ga();
    }), U(() => a.perms, (t) => $.value = t), U($, (t) => n("update:perms", t)), U(() => a.editMode, (t) => w.value = t), U(() => a.columns, (t) => k.value = t, { deep: !0 }), U(() => a.modelValue, (t) => {
      o.value = t;
    }, { deep: !0 }), U(o, (t) => {
      d.value.increment({ items: t }), H.value = d.value.changed(), n("update:modelValue", t);
    }, { deep: !0 }), i({
      getItemByEvent: Je,
      getItemByIndex: Et,
      getRowByIndex: At,
      doRefresh: fe,
      doRemoveIndex: (t) => {
        o.value.splice(t, 1), F.value = Ve();
      },
      getHtml: () => G.value,
      turnStoredIntoOriginal: () => {
        d.value.turnStoredIntoOriginal(), yt(() => {
          F.value = Ve();
        });
      }
    });
    const ha = u(() => typeof K.defaultEmptySlot < "u"), ya = u(() => K.defaultEmptySlot), ka = u(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled ? !1 : typeof a.drag.canRender > "u" ? !0 : a.drag.canRender), Sa = u(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled || typeof a.drag.isDisabled > "u" ? !1 : a.drag.isDisabled);
    return (t, p) => {
      const L = ke("lkt-button"), W = ke("lkt-loader"), ae = ke("lkt-paginator");
      return v(), h("section", {
        ref_key: "element",
        ref: G,
        class: "lkt-table-page",
        id: "lkt-table-page-" + D(se)
      }, [
        $e.value || D(l).title ? (v(), h("header", {
          key: 0,
          class: oe(t.headerClass)
        }, [
          $e.value ? (v(), O(Ee(ft.value), { key: 0 }, {
            default: z(() => [
              t.titleIcon ? (v(), h("i", {
                key: 0,
                class: oe(t.titleIcon)
              }, null, 2)) : V("", !0),
              nt(" " + je($e.value), 1)
            ]),
            _: 1
          })) : V("", !0),
          D(l).title ? q(t.$slots, "title", { key: 1 }) : V("", !0)
        ], 2)) : V("", !0),
        (v(), O(Ee(pt.value), {
          class: oe(["lkt-table-page-content-wrapper", t.wrapContentClass])
        }, {
          default: z(() => {
            var re;
            return [
              at(Q("div", El, [
                at(Te(L, ve({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: Ne
                }, {
                  ..._.value,
                  disabled: it.value,
                  resourceData: Tt.value
                }, {
                  onLoading: R,
                  onLoaded: X,
                  onClick: ne
                }), {
                  split: z(({ doClose: N, doRootClick: E }) => [
                    q(t.$slots, "button-save-split", {
                      doClose: N,
                      doRootClick: E,
                      dataState: d.value,
                      onButtonLoading: R,
                      onButtonLoaded: X
                    })
                  ]),
                  default: z(() => [
                    D(l)["button-save"] ? q(t.$slots, "button-save", {
                      key: 0,
                      items: o.value,
                      editMode: t.editMode,
                      canUpdate: !it.value
                    }) : V("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [lt, Ye.value]
                ]),
                ht.value && o.value.length >= t.requiredItemsForTopCreate ? (v(), O(ea, {
                  key: 0,
                  config: Ce.value,
                  disabled: !qt.value,
                  onClick: y,
                  onAppend: B
                }, null, 8, ["config", "disabled"])) : V("", !0),
                Q("div", Al, [
                  at(Te(L, ve(dt.value, {
                    checked: w.value,
                    "onUpdate:checked": p[0] || (p[0] = (N) => w.value = N)
                  }), null, 16, ["checked"]), [
                    [lt, xe.value]
                  ])
                ])
              ], 512), [
                [lt, It.value]
              ]),
              D(l).buttons ? (v(), h("div", Vl, [
                q(t.$slots, "buttons")
              ])) : V("", !0),
              Se.value && D(l).filters ? (v(), h("div", Rl, [
                q(t.$slots, "filters", {
                  items: o.value,
                  isLoading: A.value
                })
              ])) : V("", !0),
              at(Q("div", Nl, [
                t.type === D(tt).Table ? (v(), h("table", Ml, [
                  t.hideTableHeader ? V("", !0) : (v(), h("thead", Ll, [
                    Q("tr", null, [
                      Ke.value && w.value ? (v(), h("th", _l)) : V("", !0),
                      t.addNavigation && w.value ? (v(), h("th", $l)) : V("", !0),
                      pe.value ? (v(), h("th", Ol)) : V("", !0),
                      (v(!0), h(x, null, ue(de.value, (N) => (v(), h(x, null, [
                        _e.value.indexOf(N.key) === -1 ? (v(), O(Il, {
                          key: 0,
                          column: N,
                          "sort-by": m.value,
                          "sort-direction": C.value,
                          "amount-of-columns": t.columns.length,
                          items: o.value,
                          onClick: (E) => ut(N)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : V("", !0)
                      ], 64))), 256)),
                      be.value && w.value ? (v(), h("th", Pl)) : V("", !0),
                      ge.value && ce.value && w.value ? (v(), h("th", Ul)) : V("", !0)
                    ])
                  ])),
                  Q("tbody", {
                    ref_key: "tableBody",
                    ref: c,
                    id: "lkt-table-body-" + D(se),
                    class: oe(t.itemsContainerClass)
                  }, [
                    (v(!0), h(x, null, ue(o.value, (N, E) => at((v(), O(hl, {
                      modelValue: o.value[E],
                      "onUpdate:modelValue": (M) => o.value[E] = M,
                      key: Nt(N, E),
                      i: E,
                      "drop-button": Me.value,
                      "edit-button": t.editButton,
                      "display-hidden-columns-indicator": pe.value,
                      "is-draggable": b(N),
                      sortable: Ke.value,
                      "visible-columns": de.value,
                      "empty-columns": _e.value,
                      "add-navigation": t.addNavigation,
                      "hidden-is-visible": gt(E),
                      "latest-row": E + 1 === vt.value,
                      "can-drop": be.value && w.value,
                      "can-edit": ge.value && ce.value && w.value,
                      "can-read": Oe.value,
                      "can-create": me.value,
                      "edit-mode-enabled": w.value,
                      "has-inline-edit-perm": we.value,
                      "row-display-type": t.rowDisplayType,
                      "render-drag": ka.value,
                      "disabled-drag": Sa.value,
                      "is-loading": A.value,
                      onClick: bt,
                      onShow: Qe,
                      onItemUp: Vt,
                      onItemDown: Rt,
                      onItemDrop: Ze
                    }, Yt({ _: 2 }, [
                      D(l)[`item-${E}`] ? {
                        name: `item-${E}`,
                        fn: z((M) => [
                          q(t.$slots, `item-${E}`, Re({
                            [t.slotItemVar || ""]: M.item,
                            index: E,
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
                      } : D(l).item ? {
                        name: "item",
                        fn: z((M) => [
                          q(t.$slots, "item", Re({
                            [t.slotItemVar || ""]: M.item,
                            index: E,
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
                        fn: z((he) => [
                          q(t.$slots, M, Re({
                            [t.slotItemVar || ""]: he.item,
                            value: he.value,
                            column: he.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "drop-button", "edit-button", "display-hidden-columns-indicator", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "hidden-is-visible", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading"])), [
                      [lt, Mt(o.value[E])]
                    ])), 128)),
                    He.value.length > 0 ? (v(!0), h(x, { key: 0 }, ue(o.value, (N, E) => (v(), O(Bl, {
                      modelValue: o.value[E],
                      "onUpdate:modelValue": (M) => o.value[E] = M,
                      key: Nt(N, E, !0),
                      i: E,
                      "hidden-columns": He.value,
                      "hidden-columns-col-span": ct.value,
                      "is-draggable": b(N),
                      sortable: Ke.value,
                      "visible-columns": de.value,
                      "empty-columns": _e.value,
                      "hidden-is-visible": gt(E),
                      "edit-mode-enabled": w.value,
                      "has-inline-edit-perm": we.value,
                      onClick: bt,
                      onShow: Qe
                    }, Yt({ _: 2 }, [
                      ue(ie.value, (M) => ({
                        name: M,
                        fn: z((he) => [
                          q(t.$slots, M, Re({
                            [t.slotItemVar || ""]: he.item,
                            value: he.value,
                            column: he.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "hidden-columns", "hidden-columns-col-span", "is-draggable", "sortable", "visible-columns", "empty-columns", "hidden-is-visible", "edit-mode-enabled", "has-inline-edit-perm"]))), 128)) : V("", !0)
                  ], 10, Fl)
                ])) : t.type === D(tt).Item ? (v(), h("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: c,
                  id: "lkt-table-body-" + D(se),
                  class: oe(["lkt-table-items-container", t.itemsContainerClass])
                }, [
                  (v(!0), h(x, null, ue(o.value, (N, E) => (v(), h(x, null, [
                    Mt(N) ? (v(), h("div", {
                      class: "lkt-table-item",
                      "data-i": E,
                      key: Nt(N, E)
                    }, [
                      q(t.$slots, "item", Re({
                        [t.slotItemVar || ""]: N,
                        index: E,
                        editing: w.value,
                        canCreate: me.value,
                        canRead: Oe.value,
                        canUpdate: ce.value,
                        canDrop: be.value,
                        isLoading: A.value,
                        doDrop: () => Ze(E)
                      }))
                    ], 8, zl)) : V("", !0)
                  ], 64))), 256))
                ], 10, jl)) : ba.value ? (v(), O(Ee(t.type), {
                  key: 2,
                  class: oe(["lkt-table-items-container", t.itemsContainerClass])
                }, {
                  default: z(() => [
                    (v(!0), h(x, null, ue(o.value, (N, E) => (v(), h(x, null, [
                      Mt(N) ? (v(), h("li", {
                        key: 0,
                        class: "lkt-table-item",
                        "data-i": E
                      }, [
                        q(t.$slots, "item", Re({
                          [t.slotItemVar || ""]: N,
                          index: E,
                          editing: w.value,
                          canCreate: me.value,
                          canRead: Oe.value,
                          canUpdate: ce.value,
                          canDrop: be.value,
                          isLoading: A.value,
                          doDrop: () => Ze(E)
                        }))
                      ], 8, Hl)) : V("", !0)
                    ], 64))), 256))
                  ]),
                  _: 3
                }, 8, ["class"])) : t.type === D(tt).Carousel ? (v(), h("div", {
                  key: 3,
                  ref_key: "tableBody",
                  ref: c,
                  id: "lkt-table-body-" + D(se),
                  class: oe(["lkt-table-items-container", t.itemsContainerClass])
                }, [
                  Te(D(Ka), ve({
                    modelValue: J.value,
                    "onUpdate:modelValue": p[1] || (p[1] = (N) => J.value = N)
                  }, t.carousel, {
                    "wrap-around": ((re = t.carousel) == null ? void 0 : re.infinite) === !0
                  }), {
                    addons: z(() => [
                      Te(D(Ja)),
                      Te(D(Qa))
                    ]),
                    default: z(() => [
                      (v(!0), h(x, null, ue(Xe.value, (N, E) => (v(), O(D(Zt), {
                        key: N,
                        index: E
                      }, {
                        default: z(() => [
                          Q("div", Gl, [
                            q(t.$slots, N)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (v(!0), h(x, null, ue(o.value, (N, E) => (v(), O(D(Zt), {
                        key: t.slide,
                        index: E
                      }, {
                        default: z(() => [
                          Q("div", Xl, [
                            q(t.$slots, "item", Re({
                              [t.slotItemVar || ""]: N,
                              index: E,
                              editing: w.value,
                              canCreate: me.value,
                              canRead: Oe.value,
                              canUpdate: ce.value,
                              canDrop: be.value,
                              isLoading: A.value,
                              doDrop: () => Ze(E)
                            }))
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128))
                    ]),
                    _: 3
                  }, 16, ["modelValue", "wrap-around"])
                ], 10, ql)) : V("", !0)
              ], 512), [
                [lt, rt.value]
              ]),
              !A.value && o.value.length === 0 ? (v(), h("div", Yl, [
                D(l).empty ? q(t.$slots, "empty", { key: 0 }) : ha.value ? (v(), O(Ee(ya.value), {
                  key: 1,
                  message: t.noResultsText
                }, null, 8, ["message"])) : t.noResultsText ? (v(), h(x, { key: 2 }, [
                  nt(je(t.noResultsText), 1)
                ], 64)) : V("", !0)
              ])) : V("", !0),
              A.value ? (v(), O(W, { key: 3 })) : V("", !0),
              ht.value || D(l).bottomButtons ? (v(), h("div", Kl, [
                ht.value && o.value.length >= t.requiredItemsForBottomCreate ? (v(), O(ea, {
                  key: 0,
                  config: Ce.value,
                  disabled: !qt.value,
                  onClick: y,
                  onAppend: B
                }, null, 8, ["config", "disabled"])) : V("", !0),
                q(t.$slots, "bottom-buttons")
              ])) : V("", !0),
              t.paginator && Object.keys(t.paginator).length > 0 ? (v(), O(ae, ve({
                key: 5,
                ref_key: "paginatorRef",
                ref: Z
              }, t.paginator, {
                modelValue: T.value,
                "onUpdate:modelValue": p[2] || (p[2] = (N) => T.value = N),
                onLoading: Dt,
                onPerms: Bt,
                onResponse: Le
              }), null, 16, ["modelValue"])) : V("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, Tl);
    };
  }
}), ln = {
  install: (e) => {
    e.component("lkt-table") === void 0 && e.component("lkt-table", Wl);
  }
}, nn = (e) => (K.navButtonSlot = e, !0), on = (e) => (K.dropButtonSlot = e, !0), rn = (e) => (K.createButtonSlot = e, !0), un = (e) => {
  K.defaultEmptySlot = e;
}, sn = (e) => {
  K.defaultSaveIcon = e;
};
export {
  vn as Column,
  fn as createColumn,
  ln as default,
  rn as setTableCreateButtonSlot,
  on as setTableDropButtonSlot,
  un as setTableEmptySlot,
  nn as setTableNavButtonSlot,
  sn as setTableSaveIcon
};
