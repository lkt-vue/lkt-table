import { defineComponent as ae, computed as u, ref as C, shallowReactive as Pt, watch as H, watchEffect as Rt, onMounted as jt, onBeforeUnmount as wa, reactive as $t, provide as ta, h as X, useId as Ca, inject as ut, getCurrentInstance as Da, onUnmounted as Ba, onUpdated as Ia, cloneVNode as Ta, resolveComponent as ve, createBlock as $, createElementBlock as h, unref as B, openBlock as d, normalizeProps as Ee, mergeProps as fe, withCtx as F, createTextVNode as Ae, toDisplayString as Pe, Fragment as x, withModifiers as aa, createCommentVNode as A, resolveDynamicComponent as Ie, useSlots as la, normalizeClass as re, createElementVNode as J, createVNode as Be, renderSlot as z, renderList as ie, withDirectives as it, vShow as rt, mergeDefaults as Ea, nextTick as bt, createSlots as Xt } from "vue";
import { __ as Aa } from "lkt-i18n";
import { SortDirection as Oe, Column as na, ColumnType as yt, prepareResourceData as oa, TableRowType as Ze, extractI18nValue as ia, LktSettings as tt, ensureButtonConfig as ht, TablePermission as we, PaginatorType as kt, TableType as et, getDefaultValues as Va, Table as Na, ButtonType as Lt } from "lkt-vue-kernel";
import { Column as sn, createColumn as dn } from "lkt-vue-kernel";
import { replaceAll as ra, generateRandomString as _a } from "lkt-string-tools";
import { DataState as Ma } from "lkt-data-state";
import Ra from "sortablejs";
import { time as Le } from "lkt-date-tools";
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
], P = {
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
}, Fe = Symbol("carousel"), La = (e) => {
  const o = Pt([]), i = (n) => {
    n !== void 0 ? o.slice(n).forEach((l, a) => {
      var v;
      (v = l.exposed) === null || v === void 0 || v.setIndex(n + a);
    }) : o.forEach((l, a) => {
      var v;
      (v = l.exposed) === null || v === void 0 || v.setIndex(a);
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
      const a = l ?? o.length;
      o.splice(a, 0, n), i(a), e("slide-registered", { slide: n, index: a });
    },
    unregisterSlide: (n) => {
      const l = o.indexOf(n);
      l !== -1 && (e("slide-unregistered", { slide: n, index: l }), o.splice(l, 1), i(l));
    }
  };
};
function Oa(e) {
  return e.length === 0 ? 0 : e.reduce((i, n) => i + n, 0) / e.length;
}
function Yt({ slides: e, position: o, toShow: i }) {
  const n = [], l = o === "before", a = l ? -i : 0, v = l ? 0 : i;
  if (e.length <= 0)
    return n;
  for (let b = a; b < v; b++) {
    const m = {
      index: l ? b : b + e.length,
      isClone: !0,
      position: o,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${o}-${b}`
    }, r = e[(b % e.length + e.length) % e.length].vnode, T = Ta(r, m);
    T.el = null, n.push(T);
  }
  return n;
}
const Pa = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function Kt(e) {
  if (!e.el || !(e.el instanceof Element))
    return;
  const o = e.el.querySelectorAll(Pa);
  for (const i of o)
    i instanceof HTMLElement && !i.hasAttribute("disabled") && i.getAttribute("aria-hidden") !== "true" && i.setAttribute("tabindex", "-1");
}
function Fa(e, o) {
  return Object.keys(e).filter((i) => !o.includes(i)).reduce((i, n) => (i[n] = e[n], i), {});
}
function Ua(e) {
  const { isVertical: o, isReversed: i, dragged: n, effectiveSlideSize: l } = e, a = o ? n.y : n.x;
  if (a === 0)
    return 0;
  const v = Math.round(a / l);
  return i ? v : -v;
}
function Ce({ val: e, max: o, min: i }) {
  return o < i ? e : Math.min(Math.max(e, isNaN(i) ? e : i), isNaN(o) ? e : o);
}
function ja(e) {
  const { transform: o } = window.getComputedStyle(e);
  return o.split(/[(,)]/).slice(1, -1).map((i) => parseFloat(i));
}
function za(e) {
  let o = 1, i = 1;
  return e.forEach((n) => {
    const l = ja(n);
    l.length === 6 && (o /= l[0], i /= l[3]);
  }), { widthMultiplier: o, heightMultiplier: i };
}
function Ha(e, o) {
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
function xa(e, o, i) {
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
function Ft({ slideSize: e, viewportSize: o, align: i, itemsToShow: n }) {
  return n !== void 0 ? Ha(i, n) : e !== void 0 && o !== void 0 ? xa(i, e, o) : 0;
}
function va(e = "", o = {}) {
  return Object.entries(o).reduce((i, [n, l]) => i.replace(`{${n}}`, String(l)), e);
}
function fa({ val: e, max: o, min: i = 0 }) {
  const n = o - i + 1;
  return ((e - i) % n + n) % n + i;
}
function Ot(e, o = 0) {
  let i = !1, n = 0, l = null;
  function a(...v) {
    if (i)
      return;
    i = !0;
    const b = () => {
      l = requestAnimationFrame((g) => {
        g - n > o ? (n = g, e(...v), i = !1) : b();
      });
    };
    b();
  }
  return a.cancel = () => {
    l && (cancelAnimationFrame(l), l = null, i = !1);
  }, a;
}
function St(e, o = "px") {
  if (!(e == null || e === ""))
    return typeof e == "number" || parseFloat(e).toString() === e ? `${e}${o}` : e;
}
const qa = ae({
  name: "CarouselAria",
  setup() {
    const e = ut(Fe);
    return e ? () => X("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, va(e.config.i18n.itemXofY, {
      currentSlide: e.currentSlide + 1,
      slidesCount: e.slidesCount
    })) : () => "";
  }
}), Ga = {
  // time to auto advance slides in ms
  autoplay: {
    default: P.autoplay,
    type: Number
  },
  // an object to store breakpoints
  breakpoints: {
    default: P.breakpoints,
    type: Object
  },
  // controls the breakpoint mode relative to the carousel container or the viewport
  breakpointMode: {
    default: P.breakpointMode,
    validator(e) {
      return ua.includes(e);
    }
  },
  // enable/disable the carousel component
  enabled: {
    default: P.enabled,
    type: Boolean
  },
  // control the gap between slides
  gap: {
    default: P.gap,
    type: Number
  },
  // control the gap between slides
  height: {
    default: P.height,
    type: [Number, String]
  },
  ignoreAnimations: {
    default: !1,
    type: [Array, Boolean, String]
  },
  // count of items to be scrolled
  itemsToScroll: {
    default: P.itemsToScroll,
    type: Number
  },
  // count of items to showed per view
  itemsToShow: {
    default: P.itemsToShow,
    type: [Number, String]
  },
  // aria-labels and additional text labels
  i18n: {
    default: P.i18n,
    type: Object
  },
  // slide number number of initial slide
  modelValue: {
    default: void 0,
    type: Number
  },
  // toggle mouse dragging.
  mouseDrag: {
    default: P.mouseDrag,
    type: Boolean
  },
  // toggle mouse dragging.
  touchDrag: {
    default: P.touchDrag,
    type: Boolean
  },
  pauseAutoplayOnHover: {
    default: P.pauseAutoplayOnHover,
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
    default: P.snapAlign,
    validator(e) {
      return ca.includes(e);
    }
  },
  slideEffect: {
    type: String,
    default: P.slideEffect,
    validator(e) {
      return da.includes(e);
    }
  },
  // sliding transition time in ms
  transition: {
    default: P.transition,
    type: Number
  },
  // control the gap between slides
  dir: {
    type: String,
    default: P.dir,
    validator(e, o) {
      if (!sa.includes(e))
        return !1;
      const i = e in wt ? wt[e] : e;
      return ["ttb", "btt"].includes(i) && (!o.height || o.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${e}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: P.wrapAround,
    type: Boolean
  }
}, Xa = ae({
  name: "VueCarousel",
  props: Ga,
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
    const a = La(i), v = a.getSlides(), b = u(() => v.length), g = C(null), m = C(null), r = C(0), T = u(() => Object.assign(Object.assign(Object.assign({}, P), Fa(e, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, P.i18n), e.i18n) })), c = Pt(Object.assign({}, T.value)), S = C((l = e.modelValue) !== null && l !== void 0 ? l : 0), E = C(S.value);
    H(S, (s) => E.value = s);
    const V = C(0), he = u(() => Math.ceil((b.value - 1) / 2)), O = u(() => b.value - 1), q = u(() => 0);
    let ne = null, Ve = null, Z = null;
    const f = u(() => r.value + c.gap), k = u(() => {
      const s = c.dir || "ltr";
      return s in wt ? wt[s] : s;
    }), U = u(() => ["rtl", "btt"].includes(k.value)), L = u(() => ["ttb", "btt"].includes(k.value)), Q = u(() => c.itemsToShow === "auto"), R = u(() => L.value ? "height" : "width");
    function Te() {
      var s;
      if (!ze.value)
        return;
      const y = (T.value.breakpointMode === "carousel" ? (s = g.value) === null || s === void 0 ? void 0 : s.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, w = Object.keys(e.breakpoints || {}).map((N) => Number(N)).sort((N, G) => +G - +N), D = {};
      w.some((N) => y >= N ? (Object.assign(D, e.breakpoints[N]), D.i18n && Object.assign(D.i18n, T.value.i18n, e.breakpoints[N].i18n), !0) : !1), Object.assign(c, T.value, D);
    }
    const Ct = Ot(() => {
      Te(), ue(), me();
    }), Ue = Pt(/* @__PURE__ */ new Set()), j = C([]);
    function Dt({ widthMultiplier: s, heightMultiplier: y }) {
      j.value = v.map((w) => {
        var D;
        const N = (D = w.exposed) === null || D === void 0 ? void 0 : D.getBoundingRect();
        return {
          width: N.width * s,
          height: N.height * y
        };
      });
    }
    const Ne = C({
      width: 0,
      height: 0
    });
    function Bt({ widthMultiplier: s, heightMultiplier: y }) {
      var w;
      const D = ((w = m.value) === null || w === void 0 ? void 0 : w.getBoundingClientRect()) || { width: 0, height: 0 };
      Ne.value = {
        width: D.width * s,
        height: D.height * y
      };
    }
    function me() {
      if (!m.value)
        return;
      const s = za(Ue);
      if (Bt(s), Dt(s), Q.value)
        r.value = Oa(j.value.map((y) => y[R.value]));
      else {
        const y = Number(c.itemsToShow), w = (y - 1) * c.gap;
        r.value = (Ne.value[R.value] - w) / y;
      }
    }
    function ue() {
      !c.wrapAround && b.value > 0 && (S.value = Ce({
        val: S.value,
        max: O.value,
        min: q.value
      })), Q.value || (c.itemsToShow = Ce({
        val: Number(c.itemsToShow),
        max: b.value,
        min: 1
      }));
    }
    const _e = u(() => typeof e.ignoreAnimations == "string" ? e.ignoreAnimations.split(",") : Array.isArray(e.ignoreAnimations) ? e.ignoreAnimations : e.ignoreAnimations ? !1 : []);
    Rt(() => ue()), Rt(() => {
      me();
    });
    let se;
    const je = (s) => {
      const y = s.target;
      if (!(!(y != null && y.contains(g.value)) || Array.isArray(_e.value) && _e.value.includes(s.animationName)) && (Ue.add(y), !se)) {
        const w = () => {
          se = requestAnimationFrame(() => {
            me(), w();
          });
        };
        w();
      }
    }, st = (s) => {
      const y = s.target;
      y && Ue.delete(y), se && Ue.size === 0 && (cancelAnimationFrame(se), me());
    }, ze = C(!1);
    typeof document < "u" && Rt(() => {
      ze.value && _e.value !== !1 ? (document.addEventListener("animationstart", je), document.addEventListener("animationend", st)) : (document.removeEventListener("animationstart", je), document.removeEventListener("animationend", st));
    }), jt(() => {
      ze.value = !0, Te(), ke(), g.value && (Z = new ResizeObserver(Ct), Z.observe(g.value)), i("init");
    }), wa(() => {
      ze.value = !1, a.cleanup(), Ve && clearTimeout(Ve), se && cancelAnimationFrame(se), ne && clearInterval(ne), Z && (Z.disconnect(), Z = null), typeof document < "u" && ct(), g.value && (g.value.removeEventListener("transitionend", me), g.value.removeEventListener("animationiteration", me));
    });
    let pe = !1;
    const He = { x: 0, y: 0 }, oe = $t({ x: 0, y: 0 }), xe = C(!1), qe = C(!1), It = () => {
      xe.value = !0;
    }, lt = () => {
      xe.value = !1;
    }, dt = Ot((s) => {
      if (!s.ctrlKey)
        switch (s.key) {
          case "ArrowLeft":
          case "ArrowUp":
            L.value === s.key.endsWith("Up") && (U.value ? Re(!0) : Ye(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            L.value === s.key.endsWith("Down") && (U.value ? Ye(!0) : Re(!0));
            break;
        }
    }, 200), Tt = () => {
      document.addEventListener("keydown", dt);
    }, ct = () => {
      document.removeEventListener("keydown", dt);
    };
    function vt(s) {
      const y = s.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(y) || ge.value || (pe = s.type === "touchstart", !pe && (s.preventDefault(), s.button !== 0)))
        return;
      He.x = "touches" in s ? s.touches[0].clientX : s.clientX, He.y = "touches" in s ? s.touches[0].clientY : s.clientY;
      const w = pe ? "touchmove" : "mousemove", D = pe ? "touchend" : "mouseup";
      document.addEventListener(w, Me, { passive: !1 }), document.addEventListener(D, Ge, { passive: !0 });
    }
    const Me = Ot((s) => {
      qe.value = !0;
      const y = "touches" in s ? s.touches[0].clientX : s.clientX, w = "touches" in s ? s.touches[0].clientY : s.clientY;
      oe.x = y - He.x, oe.y = w - He.y;
      const D = Ua({
        isVertical: L.value,
        isReversed: U.value,
        dragged: oe,
        effectiveSlideSize: f.value
      });
      E.value = c.wrapAround ? S.value + D : Ce({
        val: S.value + D,
        max: O.value,
        min: q.value
      }), i("drag", { deltaX: oe.x, deltaY: oe.y });
    });
    function Ge() {
      if (Me.cancel(), E.value !== S.value && !pe) {
        const w = (D) => {
          D.preventDefault(), window.removeEventListener("click", w);
        };
        window.addEventListener("click", w);
      }
      Se(E.value), oe.x = 0, oe.y = 0, qe.value = !1;
      const s = pe ? "touchmove" : "mousemove", y = pe ? "touchend" : "mouseup";
      document.removeEventListener(s, Me), document.removeEventListener(y, Ge);
    }
    function ke() {
      !c.autoplay || c.autoplay <= 0 || (ne = setInterval(() => {
        c.pauseAutoplayOnHover && xe.value || Re();
      }, c.autoplay));
    }
    function Xe() {
      ne && (clearInterval(ne), ne = null);
    }
    function de() {
      Xe(), ke();
    }
    const ge = C(!1);
    function Se(s, y = !1) {
      if (!y && ge.value)
        return;
      let w = s, D = s;
      V.value = S.value, c.wrapAround ? D = fa({
        val: w,
        max: O.value,
        min: q.value
      }) : w = Ce({
        val: w,
        max: O.value,
        min: q.value
      }), i("slide-start", {
        slidingToIndex: s,
        currentSlideIndex: S.value,
        prevSlideIndex: V.value,
        slidesCount: b.value
      }), Xe(), ge.value = !0, S.value = w, D !== w && be.pause(), i("update:modelValue", D), Ve = setTimeout(() => {
        c.wrapAround && D !== w && (be.resume(), S.value = D, i("loop", {
          currentSlideIndex: S.value,
          slidingToIndex: s
        })), i("slide-end", {
          currentSlideIndex: S.value,
          prevSlideIndex: V.value,
          slidesCount: b.value
        }), ge.value = !1, de();
      }, c.transition);
    }
    function Re(s = !1) {
      Se(S.value + c.itemsToScroll, s);
    }
    function Ye(s = !1) {
      Se(S.value - c.itemsToScroll, s);
    }
    function ft() {
      Te(), ue(), me(), de();
    }
    H(() => [T.value, e.breakpoints], () => Te(), { deep: !0 }), H(() => e.autoplay, () => de());
    const be = H(() => e.modelValue, (s) => {
      s !== S.value && Se(Number(s), !0);
    });
    i("before-init");
    const $e = u(() => {
      if (!c.wrapAround)
        return { before: 0, after: 0 };
      if (Q.value)
        return { before: v.length, after: v.length };
      const s = Number(c.itemsToShow), y = Math.ceil(s + (c.itemsToScroll - 1)), w = y - E.value, D = y - (b.value - (E.value + 1));
      return {
        before: Math.max(0, w),
        after: Math.max(0, D)
      };
    }), Ke = u(() => $e.value.before ? Q.value ? j.value.slice(-1 * $e.value.before).reduce((s, y) => s + y[R.value] + c.gap, 0) * -1 : $e.value.before * f.value * -1 : 0), nt = u(() => {
      var s;
      if (Q.value) {
        const y = (S.value % v.length + v.length) % v.length;
        return Ft({
          slideSize: (s = j.value[y]) === null || s === void 0 ? void 0 : s[R.value],
          viewportSize: Ne.value[R.value],
          align: c.snapAlign
        });
      }
      return Ft({
        align: c.snapAlign,
        itemsToShow: +c.itemsToShow
      });
    }), We = u(() => {
      let s = 0;
      if (Q.value) {
        if (S.value < 0 ? s = j.value.slice(S.value).reduce((y, w) => y + w[R.value] + c.gap, 0) * -1 : s = j.value.slice(0, S.value).reduce((y, w) => y + w[R.value] + c.gap, 0), s -= nt.value, !c.wrapAround) {
          const y = j.value.reduce((w, D) => w + D[R.value] + c.gap, 0) - Ne.value[R.value] - c.gap;
          s = Ce({
            val: s,
            max: y,
            min: 0
          });
        }
      } else {
        let y = S.value - nt.value;
        c.wrapAround || (y = Ce({
          val: y,
          max: b.value - +c.itemsToShow,
          min: 0
        })), s = y * f.value;
      }
      return s * (U.value ? 1 : -1);
    }), Et = u(() => {
      var s, y;
      if (!Q.value) {
        const N = S.value - nt.value;
        return c.wrapAround ? {
          min: Math.floor(N),
          max: Math.ceil(N + Number(c.itemsToShow) - 1)
        } : {
          min: Math.floor(Ce({
            val: N,
            max: b.value - Number(c.itemsToShow),
            min: 0
          })),
          max: Math.ceil(Ce({
            val: N + Number(c.itemsToShow) - 1,
            max: b.value - 1,
            min: 0
          }))
        };
      }
      let w = 0;
      {
        let N = 0, G = 0 - $e.value.before;
        const le = Math.abs(We.value + Ke.value);
        for (; N <= le; ) {
          const ee = (G % v.length + v.length) % v.length;
          N += ((s = j.value[ee]) === null || s === void 0 ? void 0 : s[R.value]) + c.gap, G++;
        }
        w = G - 1;
      }
      let D = 0;
      {
        let N = w, G = 0;
        for (N < 0 ? G = j.value.slice(0, N).reduce((le, ee) => le + ee[R.value] + c.gap, 0) - Math.abs(We.value + Ke.value) : G = j.value.slice(0, N).reduce((le, ee) => le + ee[R.value] + c.gap, 0) - Math.abs(We.value); G < Ne.value[R.value]; ) {
          const le = (N % v.length + v.length) % v.length;
          G += ((y = j.value[le]) === null || y === void 0 ? void 0 : y[R.value]) + c.gap, N++;
        }
        D = N - 1;
      }
      return {
        min: Math.floor(w),
        max: Math.ceil(D)
      };
    }), At = u(() => {
      if (c.slideEffect === "fade")
        return;
      const s = L.value ? "Y" : "X", y = L.value ? oe.y : oe.x;
      let w = We.value + y;
      if (!c.wrapAround && c.preventExcessiveDragging) {
        let D = 0;
        Q.value ? D = j.value.reduce((le, ee) => le + ee[R.value], 0) : D = (b.value - Number(c.itemsToShow)) * f.value;
        const N = U.value ? 0 : -1 * D, G = U.value ? D : 0;
        w = Ce({
          val: w,
          min: N,
          max: G
        });
      }
      return `translate${s}(${w}px)`;
    }), mt = u(() => ({
      "--vc-transition-duration": ge.value ? St(c.transition, "ms") : void 0,
      "--vc-slide-gap": St(c.gap),
      "--vc-carousel-height": St(c.height),
      "--vc-cloned-offset": St(Ke.value)
    })), ot = { slideTo: Se, next: Re, prev: Ye }, pt = $t({
      activeSlide: E,
      config: c,
      currentSlide: S,
      isSliding: ge,
      isVertical: L,
      maxSlide: O,
      minSlide: q,
      nav: ot,
      normalizedDir: k,
      slideRegistry: a,
      slideSize: r,
      slides: v,
      slidesCount: b,
      viewport: m,
      visibleRange: Et
    });
    ta(Fe, pt);
    const Je = $t({
      config: c,
      currentSlide: S,
      maxSlide: O,
      middleSlide: he,
      minSlide: q,
      slideSize: r,
      slidesCount: b
    });
    return n({
      data: Je,
      nav: ot,
      next: Re,
      prev: Ye,
      restartCarousel: ft,
      slideTo: Se,
      updateBreakpointsConfig: Te,
      updateSlideSize: me,
      updateSlidesData: ue
    }), () => {
      var s;
      const y = o.default || o.slides, w = (y == null ? void 0 : y(Je)) || [], { before: D, after: N } = $e.value, G = Yt({
        slides: v,
        position: "before",
        toShow: D
      }), le = Yt({
        slides: v,
        position: "after",
        toShow: N
      }), ee = [...G, ...w, ...le];
      if (!c.enabled || !ee.length)
        return X("section", {
          ref: g,
          class: ["carousel", "is-disabled"]
        }, ee);
      const Vt = ((s = o.addons) === null || s === void 0 ? void 0 : s.call(o, Je)) || [], Nt = X("ol", {
        class: "carousel__track",
        style: { transform: At.value },
        onMousedownCapture: c.mouseDrag ? vt : null,
        onTouchstartPassiveCapture: c.touchDrag ? vt : null
      }, ee), Qe = X("div", { class: "carousel__viewport", ref: m }, Nt);
      return X("section", {
        ref: g,
        class: [
          "carousel",
          `is-${k.value}`,
          `is-effect-${c.slideEffect}`,
          {
            "is-vertical": L.value,
            "is-sliding": ge.value,
            "is-dragging": qe.value,
            "is-hover": xe.value
          }
        ],
        dir: k.value,
        style: mt.value,
        "aria-label": c.i18n.ariaGallery,
        tabindex: "0",
        onFocus: Tt,
        onBlur: ct,
        onMouseenter: It,
        onMouseleave: lt
      }, [Qe, Vt, X(qa)]);
    };
  }
});
var Ut;
(function(e) {
  e.arrowDown = "arrowDown", e.arrowLeft = "arrowLeft", e.arrowRight = "arrowRight", e.arrowUp = "arrowUp";
})(Ut || (Ut = {}));
const Wt = (e) => `icon${e.charAt(0).toUpperCase() + e.slice(1)}`, Ya = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function Ka(e) {
  return e in Ut;
}
const Jt = (e) => e && Ka(e), Qt = ae({
  props: {
    name: {
      type: String,
      required: !0,
      validator: Jt
    },
    title: {
      type: String,
      default: (e) => e.name ? P.i18n[Wt(e.name)] : ""
    }
  },
  setup(e) {
    const o = ut(Fe, null);
    return () => {
      const i = e.name;
      if (!i || !Jt(i))
        return;
      const n = Ya[i], l = X("path", { d: n }), a = (o == null ? void 0 : o.config.i18n[Wt(i)]) || e.title, v = X("title", a);
      return X("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": a
      }, [v, l]);
    };
  }
}), Wa = ae({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(e, { slots: o, attrs: i }) {
    const n = ut(Fe);
    if (!n)
      return () => "";
    const { next: l, prev: a } = o, v = () => ({
      btt: "arrowDown",
      ltr: "arrowLeft",
      rtl: "arrowRight",
      ttb: "arrowUp"
    })[n.normalizedDir], b = () => ({
      btt: "arrowUp",
      ltr: "arrowRight",
      rtl: "arrowLeft",
      ttb: "arrowDown"
    })[n.normalizedDir], g = u(() => !n.config.wrapAround && n.currentSlide <= n.minSlide), m = u(() => !n.config.wrapAround && n.currentSlide >= n.maxSlide);
    return () => {
      const { i18n: r } = n.config, T = X("button", Object.assign(Object.assign({ type: "button", disabled: g.value, "aria-label": r.ariaPreviousSlide, title: r.ariaPreviousSlide, onClick: n.nav.prev }, i), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": g.value },
        i.class
      ] }), (a == null ? void 0 : a()) || X(Qt, { name: v() })), c = X("button", Object.assign(Object.assign({ type: "button", disabled: m.value, "aria-label": r.ariaNextSlide, title: r.ariaNextSlide, onClick: n.nav.next }, i), { class: [
        "carousel__next",
        { "carousel__next--disabled": m.value },
        i.class
      ] }), (l == null ? void 0 : l()) || X(Qt, { name: b() }));
      return [T, c];
    };
  }
}), Ja = ae({
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
    const o = ut(Fe);
    if (!o)
      return () => "";
    const i = u(() => o.config.itemsToShow), n = u(() => Ft({
      align: o.config.snapAlign,
      itemsToShow: i.value
    })), l = u(() => e.paginateByItemsToShow && i.value > 1), a = u(() => Math.ceil((o.activeSlide - n.value) / i.value)), v = u(() => Math.ceil(o.slidesCount / i.value)), b = (g) => fa(l.value ? {
      val: a.value,
      max: v.value - 1,
      min: 0
    } : {
      val: o.activeSlide,
      max: o.maxSlide,
      min: o.minSlide
    }) === g;
    return () => {
      var g, m;
      const r = [];
      for (let T = l.value ? 0 : o.minSlide; T <= (l.value ? v.value - 1 : o.maxSlide); T++) {
        const c = va(o.config.i18n[l.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: T + 1
        }), S = b(T), E = X("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": S
          },
          "aria-label": c,
          "aria-pressed": S,
          "aria-controls": (m = (g = o.slides[T]) === null || g === void 0 ? void 0 : g.exposed) === null || m === void 0 ? void 0 : m.id,
          title: c,
          disabled: e.disableOnClick,
          onClick: () => o.nav.slideTo(l.value ? Math.floor(T * +o.config.itemsToShow + n.value) : T)
        }), V = X("li", { class: "carousel__pagination-item", key: T }, E);
        r.push(V);
      }
      return X("ol", { class: "carousel__pagination" }, r);
    };
  }
}), Zt = ae({
  name: "CarouselSlide",
  props: {
    id: {
      type: String,
      default: (e) => e.isClone ? void 0 : Ca()
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
    const l = ut(Fe);
    if (ta(Fe, void 0), !l)
      return () => "";
    const a = C(e.index), v = (E) => {
      a.value = E;
    }, b = Da(), g = () => {
      const E = b.vnode.el;
      return E ? E.getBoundingClientRect() : { width: 0, height: 0 };
    };
    n({
      id: e.id,
      setIndex: v,
      getBoundingRect: g
    });
    const m = u(() => a.value === l.activeSlide), r = u(() => a.value === l.activeSlide - 1), T = u(() => a.value === l.activeSlide + 1), c = u(() => a.value >= l.visibleRange.min && a.value <= l.visibleRange.max), S = u(() => {
      if (l.config.itemsToShow === "auto")
        return;
      const E = l.config.itemsToShow, V = l.config.gap > 0 && E > 1 ? `calc(${100 / E}% - ${l.config.gap * (E - 1) / E}px)` : `${100 / E}%`;
      return l.isVertical ? { height: V } : { width: V };
    });
    return l.slideRegistry.registerSlide(b, e.index), Ba(() => {
      l.slideRegistry.unregisterSlide(b);
    }), e.isClone && (jt(() => {
      Kt(b.vnode);
    }), Ia(() => {
      Kt(b.vnode);
    })), () => {
      var E, V;
      return l.config.enabled ? X("li", {
        style: [o.style, Object.assign({}, S.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": e.isClone,
          "carousel__slide--visible": c.value,
          "carousel__slide--active": m.value,
          "carousel__slide--prev": r.value,
          "carousel__slide--next": T.value,
          "carousel__slide--sliding": l.isSliding
        },
        onFocusin: () => {
          l.viewport && (l.viewport.scrollLeft = 0), l.nav.slideTo(a.value);
        },
        id: e.isClone ? void 0 : e.id,
        "aria-hidden": e.isClone || void 0
      }, (V = i.default) === null || V === void 0 ? void 0 : V.call(i, {
        currentIndex: a.value,
        isActive: m.value,
        isClone: e.isClone,
        isPrev: r.value,
        isNext: T.value,
        isSliding: l.isSliding,
        isVisible: c.value
      })) : (E = i.default) === null || E === void 0 ? void 0 : E.call(i);
    };
  }
}), Qa = (e, o, i, n) => {
  if (!i) return 0;
  let l = String(e[i.key]).toLowerCase(), a = String(o[i.key]).toLowerCase();
  if (n === Oe.Asc) {
    if (l > a) return 1;
    if (a > l) return -1;
  } else {
    if (l > a) return -1;
    if (a > l) return 1;
  }
  return 0;
}, at = (e, o, i, n = []) => {
  if (e.extractTitleFromColumn) {
    let l = n.find((a) => a.key === e.extractTitleFromColumn);
    if (l)
      return at(l, o, i, n);
  }
  if (e.formatter && typeof e.formatter == "function") {
    let l = e.formatter(o[e.key], o, e, i);
    return l.startsWith("__:") ? Aa(l.substring(3)) : l;
  }
  return o[e.key];
}, Za = (e, o, i) => {
  if (!e.colspan) return -1;
  let n = o;
  return i.forEach((l) => {
    let a = zt(e, l);
    a > 0 && a < n && (n = a);
  }), n;
}, zt = (e, o) => e.colspan === !1 ? !1 : typeof e.colspan == "function" ? e.colspan(o) : e.colspan, el = (e, o) => typeof e.preferSlot > "u" ? !0 : e.preferSlot === !1 ? !1 : typeof e.preferSlot == "function" ? e.preferSlot(o) : !0, tl = (e, o, i) => {
  if (typeof e != "object" || !e.key || o.indexOf(e.key) > -1) return !1;
  let n = zt(e, i);
  return typeof e.colspan > "u" ? !0 : (typeof e.colspan < "u" && (typeof e.colspan == "function" ? n = parseInt(e.colspan(i)) : n = parseInt(e.colspan)), n > 0);
}, al = (e = []) => {
  if (e.length > 0) {
    for (let o = 0; o < e.length; ++o)
      if (e[o].sortable) return e[o].key;
  }
  return "";
}, ll = (e, o) => {
  if (e.length > 0) {
    for (let i = 0; i < e.length; ++i)
      if (e[i].key === o) return e[i];
  }
  return null;
}, ma = (e) => e.type ? `is-${e.type}` : "", pa = /* @__PURE__ */ ae({
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
  setup(e, { emit: o }) {
    const i = o, n = e, l = C(n.modelValue), a = C(l.value[n.column.key]), v = C(null);
    H(a, (m) => {
      const r = JSON.parse(JSON.stringify(l.value));
      r[n.column.key] = m, i("update:modelValue", r);
    }), H(() => n.modelValue, (m) => {
      l.value = m, a.value = l.value[n.column.key];
    });
    const b = u(() => ({ ...n.column.slotData, item: l.value })), g = u(() => {
      var m, r, T, c;
      if ((m = n.column.field) != null && m.modalData && typeof ((r = n.column.field) == null ? void 0 : r.modalData) == "object")
        for (let S in n.column.field.modalData)
          if (typeof ((T = n.column.field) == null ? void 0 : T.modalData[S]) == "string" && n.column.field.modalData[S].startsWith("prop:")) {
            let E = n.column.field.modalData[S].substring(5);
            l.value[E];
          } else
            n.column.field.modalData[S];
      return (c = n.column.field) == null ? void 0 : c.modalData;
    });
    return (m, r) => {
      var E, V, he, O;
      const T = ve("lkt-anchor"), c = ve("lkt-button"), S = ve("lkt-field");
      return m.column.type === B(yt).Anchor ? (d(), $(T, Ee(fe({ key: 0 }, m.column.anchor)), {
        default: F(() => [
          Ae(Pe(B(at)(m.column, l.value, m.i)), 1)
        ]),
        _: 1
      }, 16)) : m.column.type === B(yt).Button ? (d(), $(c, fe({ key: 1 }, m.column.button, { prop: l.value }), {
        default: F(() => [
          Ae(Pe(B(at)(m.column, l.value, m.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : m.column.type === B(yt).Field && m.hasInlineEditPerm ? (d(), $(S, fe({ key: 2 }, m.column.field, {
        "read-mode": !m.column.editable || !m.editModeEnabled,
        ref: (q) => v.value = q,
        "slot-data": b.value,
        label: ((E = m.column.field) == null ? void 0 : E.type) === "switch" || ((V = m.column.field) == null ? void 0 : V.type) === "check" ? m.column.label : "",
        "modal-data": g.value,
        prop: l.value,
        modelValue: a.value,
        "onUpdate:modelValue": r[0] || (r[0] = (q) => a.value = q)
      }), null, 16, ["read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : m.column.type === B(yt).Field ? (d(), $(S, fe({ key: 3 }, m.column.field, {
        "read-mode": "",
        ref: (q) => v.value = q,
        "slot-data": b.value,
        label: ((he = m.column.field) == null ? void 0 : he.type) === "switch" || ((O = m.column.field) == null ? void 0 : O.type) === "check" ? m.column.label : "",
        "modal-data": g.value,
        prop: l.value,
        "model-value": a.value
      }), null, 16, ["slot-data", "label", "modal-data", "prop", "model-value"])) : (d(), h(x, { key: 4 }, [
        Ae(Pe(B(at)(m.column, l.value, m.i, m.columns)), 1)
      ], 64));
    };
  }
}), De = class De {
};
De.navButtonSlot = "", De.dropButtonSlot = "", De.editButtonSlot = "", De.createButtonSlot = "", De.defaultEmptySlot = void 0, De.defaultSaveIcon = "", De.defaultNoResultsMessage = "No results";
let Y = De;
const nl = /* @__PURE__ */ ae({
  __name: "DropButtonComponent",
  props: {
    config: {},
    item: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: [
    "click"
  ],
  setup(e, { emit: o }) {
    const i = o, n = e, l = u(() => Y.dropButtonSlot !== ""), a = u(() => Y.dropButtonSlot), v = u(() => oa(n.config.resourceData, n.item));
    return (b, g) => {
      const m = ve("lkt-button");
      return d(), $(m, fe({ palette: "table-delete" }, n.config, {
        disabled: b.disabled,
        "resource-data": v.value,
        onClick: g[0] || (g[0] = aa((r) => i("click", r), ["prevent", "stop"]))
      }), {
        default: F(() => [
          l.value ? (d(), $(Ie(a.value), { key: 0 })) : A("", !0)
        ]),
        _: 1
      }, 16, ["disabled", "resource-data"]);
    };
  }
}), ol = /* @__PURE__ */ ae({
  __name: "EditButtonComponent",
  props: {
    config: {},
    item: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: [
    "click"
  ],
  setup(e, { emit: o }) {
    const i = o, n = e, l = u(() => Y.editButtonSlot !== ""), a = u(() => Y.editButtonSlot), v = u(() => oa(n.config.resourceData, n.item));
    return (b, g) => {
      const m = ve("lkt-button");
      return d(), $(m, fe({ palette: "table-edit" }, n.config, {
        disabled: b.disabled,
        "resource-data": v.value,
        onClick: g[0] || (g[0] = aa((r) => i("click"), ["prevent", "stop"]))
      }), {
        default: F(() => [
          l.value ? (d(), $(Ie(a.value), { key: 0 })) : A("", !0)
        ]),
        _: 1
      }, 16, ["disabled", "resource-data"]);
    };
  }
}), il = ["data-i", "data-draggable"], rl = ["data-i"], ul = {
  key: 1,
  "data-role": "invalid-drag-indicator"
}, sl = {
  key: 2,
  class: "lkt-table-nav-cell"
}, dl = { class: "lkt-table-nav-container" }, cl = ["colspan"], vl = ["colspan"], fl = ["data-column", "colspan", "title"], ml = {
  key: 7,
  class: "lkt-table-col-drop"
}, pl = {
  key: 8,
  class: "lkt-table-col-edit"
}, gl = /* @__PURE__ */ ae({
  __name: "LktTableRow",
  props: {
    modelValue: { default: () => ({}) },
    editButton: {},
    dropButton: {},
    isDraggable: { type: Boolean, default: !0 },
    sortable: { type: Boolean, default: !0 },
    displayHiddenColumnsIndicator: { type: Boolean, default: !1 },
    hiddenIsVisible: { type: Boolean, default: !1 },
    addNavigation: { type: Boolean, default: !1 },
    latestRow: { type: Boolean, default: !1 },
    canDrop: { type: Boolean, default: !1 },
    canEdit: { type: Boolean, default: !1 },
    editModeEnabled: { type: Boolean, default: !1 },
    hasInlineEditPerm: { type: Boolean },
    i: { default: 0 },
    visibleColumns: { default: () => [] },
    emptyColumns: { default: () => [] },
    rowDisplayType: { type: [Number, Function], default: Ze.Auto },
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
  setup(e, { emit: o }) {
    var Z;
    const i = la(), n = o, l = e, a = C(l.modelValue);
    let v = typeof l.rowDisplayType == "function" ? l.rowDisplayType(a.value, l.i) : l.rowDisplayType;
    v || (v = Ze.Auto);
    const b = [Ze.Auto, Ze.PreferCustomItem].includes(v), g = [Ze.Auto, Ze.PreferItem].includes(v), m = C((Z = l.editButton.anchor) == null ? void 0 : Z.to);
    for (let f in a.value) m.value = ra(m.value, ":" + f, a.value[f]);
    const r = (f) => n("click", f), T = (f, k) => {
      n("show", f, k);
    }, c = u(() => {
      let f = [], k = !1;
      return typeof l.disabledDrag == "function" ? k = l.disabledDrag(a.value) : k = Ve.value === !0, !k && l.sortable && l.isDraggable ? f.push("handle") : k && f.push("disabled"), f.join(" ");
    }), S = u(() => Y.navButtonSlot !== ""), E = u(() => Y.navButtonSlot), V = () => {
      n("item-up", l.i);
    }, he = () => {
      n("item-down", l.i);
    }, O = () => {
      n("item-drop", l.i);
    }, q = () => {
    };
    H(() => l.modelValue, (f) => a.value = f), H(a, (f) => {
      n("update:modelValue", f);
    }, { deep: !0 });
    const ne = u(() => typeof l.renderDrag == "function" ? l.renderDrag(a.value) : l.renderDrag === !0), Ve = u(() => typeof l.disabledDrag == "function" ? l.disabledDrag(a.value) : l.disabledDrag === !0);
    return (f, k) => {
      const U = ve("lkt-button");
      return d(), h("tr", {
        "data-i": f.i,
        "data-draggable": f.isDraggable,
        class: re({ "type-custom-item": B(b), "type-item": B(g) })
      }, [
        f.sortable && f.isDraggable && f.editModeEnabled && ne.value ? (d(), h("td", {
          key: 0,
          "data-role": "drag-indicator",
          class: re(c.value),
          "data-i": f.i
        }, null, 10, rl)) : f.sortable && f.editModeEnabled && ne.value ? (d(), h("td", ul)) : A("", !0),
        f.addNavigation && f.editModeEnabled ? (d(), h("td", sl, [
          J("div", dl, [
            Be(U, {
              palette: "table-nav",
              disabled: f.i === 0,
              onClick: V
            }, {
              default: F(() => [
                S.value ? (d(), $(Ie(E.value), {
                  key: 0,
                  direction: "up"
                })) : (d(), h(x, { key: 1 }, [
                  k[3] || (k[3] = J("i", { class: "" }, null, -1)),
                  k[4] || (k[4] = Ae(" UP "))
                ], 64))
              ]),
              _: 1
            }, 8, ["disabled"]),
            Be(U, {
              palette: "table-nav",
              disabled: f.latestRow,
              onClick: he
            }, {
              default: F(() => [
                S.value ? (d(), $(Ie(E.value), {
                  key: 0,
                  direction: "down"
                })) : (d(), h(x, { key: 1 }, [
                  k[5] || (k[5] = J("i", { class: "" }, null, -1)),
                  k[6] || (k[6] = Ae(" DOWN "))
                ], 64))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : A("", !0),
        f.displayHiddenColumnsIndicator ? (d(), h("td", {
          key: 3,
          onClick: k[0] || (k[0] = (L) => T(L, f.i)),
          "data-role": "show-more",
          class: re(f.hiddenIsVisible ? "state-open" : "")
        }, null, 2)) : A("", !0),
        B(b) && B(i)[`item-${f.i}`] ? (d(), h("td", {
          key: "td" + f.i,
          colspan: f.visibleColumns.length
        }, [
          z(f.$slots, `item-${f.i}`, {
            item: a.value,
            index: f.i
          })
        ], 8, cl)) : B(g) && B(i).item ? (d(), h("td", {
          key: "td" + f.i,
          colspan: f.visibleColumns.length
        }, [
          z(f.$slots, "item", {
            item: a.value,
            index: f.i
          })
        ], 8, vl)) : (d(!0), h(x, { key: 6 }, ie(f.visibleColumns, (L) => (d(), h(x, null, [
          B(tl)(L, f.emptyColumns, a.value) ? (d(), h("td", {
            key: "td" + f.i,
            "data-column": L.key,
            colspan: B(zt)(L, a.value),
            title: B(at)(L, a.value, f.i, f.visibleColumns),
            class: re(B(ma)(L)),
            onClick: k[2] || (k[2] = (Q) => r(Q))
          }, [
            f.$slots[L.key] && B(el)(L, a.value) ? z(f.$slots, L.key, {
              key: 0,
              value: a.value[L.key],
              item: a.value,
              column: L,
              i: f.i
            }) : a.value ? (d(), $(pa, {
              key: 1,
              modelValue: a.value,
              "onUpdate:modelValue": k[1] || (k[1] = (Q) => a.value = Q),
              column: L,
              columns: f.visibleColumns,
              "edit-mode-enabled": f.editModeEnabled,
              "has-inline-edit-perm": f.hasInlineEditPerm,
              i: f.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : A("", !0)
          ], 10, fl)) : A("", !0)
        ], 64))), 256)),
        f.canDrop && f.editModeEnabled ? (d(), h("td", ml, [
          Be(nl, {
            config: f.dropButton,
            item: a.value,
            onClick: O
          }, null, 8, ["config", "item"])
        ])) : A("", !0),
        f.canEdit && f.editModeEnabled ? (d(), h("td", pl, [
          Be(ol, {
            config: f.editButton,
            item: a.value,
            onClick: q
          }, null, 8, ["config", "item"])
        ])) : A("", !0)
      ], 10, il);
    };
  }
}), bl = { "data-role": "hidden-row" }, yl = ["colspan"], hl = ["data-column"], kl = ["data-i"], Sl = ["data-column", "title"], wl = /* @__PURE__ */ ae({
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
  setup(e, { emit: o }) {
    const i = o, n = e, l = C(n.modelValue), a = (v) => i("click", v);
    return H(() => n.modelValue, (v) => l.value = v), H(l, () => i("update:modelValue", l.value)), (v, b) => it((d(), h("tr", bl, [
      J("td", { colspan: v.hiddenColumnsColSpan }, [
        J("table", null, [
          J("tr", null, [
            (d(!0), h(x, null, ie(v.hiddenColumns, (g) => (d(), h("th", {
              "data-column": g.key
            }, [
              J("div", null, Pe(g.label), 1)
            ], 8, hl))), 256))
          ]),
          J("tr", { "data-i": v.i }, [
            (d(!0), h(x, null, ie(v.hiddenColumns, (g, m) => (d(), h("td", {
              "data-column": g.key,
              title: B(at)(g, l.value, m, v.hiddenColumns),
              onClick: b[1] || (b[1] = (r) => a(r))
            }, [
              v.$slots[g.key] ? z(v.$slots, g.key, {
                key: 0,
                value: l.value[g.key],
                item: l.value,
                column: g,
                i: m
              }) : (d(), $(pa, {
                key: 1,
                column: g,
                columns: v.hiddenColumns,
                modelValue: l.value,
                "onUpdate:modelValue": b[0] || (b[0] = (r) => l.value = r),
                i: m,
                "edit-mode-enabled": v.editModeEnabled,
                "has-inline-edit-perm": v.hasInlineEditPerm
              }, null, 8, ["column", "columns", "modelValue", "i", "edit-mode-enabled", "has-inline-edit-perm"]))
            ], 8, Sl))), 256))
          ], 8, kl)
        ])
      ], 8, yl)
    ], 512)), [
      [rt, v.hiddenIsVisible]
    ]);
  }
}), ea = /* @__PURE__ */ ae({
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
    var m;
    const i = o, n = e, l = u(() => Y.createButtonSlot !== ""), a = u(() => Y.createButtonSlot), v = {
      ...(m = n.config) == null ? void 0 : m.modalData,
      beforeClose: (r) => {
        "itemCreated" in r && r.itemCreated === !0 && i("append", r.item);
      }
    }, b = {
      ...n.config
    };
    b.modalData = v;
    const g = () => {
      var r;
      if (!((r = n.config) != null && r.modal)) {
        i("click");
        return;
      }
    };
    return (r, T) => {
      const c = ve("lkt-button");
      return d(), $(c, fe(b, {
        disabled: r.disabled,
        onClick: g
      }), {
        default: F(() => [
          l.value ? (d(), $(Ie(a.value), { key: 0 })) : A("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), Cl = ["data-column", "data-sortable", "data-sort", "colspan", "title"], Dl = /* @__PURE__ */ ae({
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
  setup(e, { emit: o }) {
    const i = o, n = e, l = u(() => Za(n.column, n.amountOfColumns, n.items)), a = u(() => n.column.sortable === !0), v = u(() => a.value && n.sortBy === n.column.key ? n.sortDirection : ""), b = u(() => ia(n.column.label)), g = u(() => a.value && n.sortBy === n.column.key ? n.sortDirection === Oe.Asc ? tt.defaultTableSortAscIcon : n.sortDirection === Oe.Desc ? tt.defaultTableSortDescIcon : "" : ""), m = () => i("click", n.column);
    return (r, T) => (d(), h("th", {
      "data-column": r.column.key,
      "data-sortable": a.value,
      "data-sort": v.value,
      colspan: l.value,
      title: b.value,
      class: re(B(ma)(r.column)),
      onClick: m
    }, [
      J("div", null, [
        Ae(Pe(b.value) + " ", 1),
        g.value ? (d(), h("i", {
          key: 0,
          class: re(g.value)
        }, null, 2)) : A("", !0)
      ])
    ], 10, Cl));
  }
}), Bl = ["id"], Il = {
  key: 0,
  class: "lkt-table-page-buttons"
}, Tl = { class: "switch-edition-mode" }, El = {
  key: 1,
  class: "lkt-table-page-buttons"
}, Al = {
  key: 2,
  class: "lkt-table-page-filters"
}, Vl = { class: "lkt-table" }, Nl = { key: 0 }, _l = {
  key: 0,
  "data-role": "drag-indicator"
}, Ml = { key: 1 }, Rl = { key: 2 }, $l = {
  key: 3,
  class: "lkt-table-col-drop"
}, Ll = {
  key: 4,
  class: "lkt-table-col-edit"
}, Ol = ["id"], Pl = ["id"], Fl = ["data-i"], Ul = ["data-i"], jl = ["id"], zl = { class: "lkt-carousel-slide" }, Hl = { class: "lkt-carousel-slide" }, xl = {
  key: 3,
  class: "lkt-table-empty"
}, ql = {
  key: 5,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, Gl = /* @__PURE__ */ ae({
  __name: "LktTable",
  props: /* @__PURE__ */ Ea({
    modelValue: {},
    type: {},
    columns: {},
    noResultsText: {},
    hideEmptyColumns: { type: Boolean },
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
  }, Va(Na)),
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
  setup(e, { expose: o, emit: i }) {
    var qt, Gt;
    const n = i, l = la(), a = e, v = {}, b = C(typeof a.sorter == "function" ? a.sorter : Qa), g = C(al(a.columns)), m = C(Oe.Asc), r = C(a.modelValue), T = C(v), c = C(null), S = C(a.columns), E = C((qt = a.paginator) == null ? void 0 : qt.modelValue), V = C(a.loading), he = C(!1), O = C(a.perms), q = C(null), ne = C(null), Ve = C(null), Z = C({}), f = C(new Ma({ items: r.value }, a.dataStateConfig)), k = C(a.editMode), U = C(0), L = C(null), Q = C(((Gt = a.carousel) == null ? void 0 : Gt.currentSlide) || 0), R = C(ht(a.saveButton, tt.defaultSaveButton)), Te = C(ht(a.createButton, tt.defaultCreateButton)), Ct = C(ht(a.editModeButton, tt.defaultEditModeButton)), Ue = C(ht(a.dropButton, tt.defaultDropButton)), j = C(!1);
    H(V, (t) => n("update:loading", t)), H(E, (t) => n("page", t));
    const Dt = (t) => {
      O.value = t;
    }, Ne = (t) => {
      var p;
      Array.isArray(t.data) && ((!a.paginator || ![kt.LoadMore, kt.Infinite].includes((p = a.paginator) == null ? void 0 : p.type)) && r.value.splice(0, r.value.length), r.value = [...r.value, ...t.data]), V.value = !1, he.value = !0, f.value.store({ items: r.value }).turnStoredIntoOriginal(), j.value = !1, bt(() => {
        U.value = Le(), lt.value, n("read-response", t);
      });
    }, Bt = () => bt(() => V.value = !0), me = () => {
      q.value.doRefresh();
    }, ue = _a(12), _e = u(() => {
      if (!a.hideEmptyColumns) return [];
      let t = [];
      return S.value.forEach((p) => {
        let M = p.key, K = !1;
        r.value.forEach((te) => {
          if (typeof te.checkEmpty == "function")
            return te.checkEmpty(te);
          te[M] && (K = !0);
        }), K || t.push(M);
      }), t;
    }), se = u(() => S.value.filter((t) => !t.hidden)), je = u(() => S.value.filter((t) => t.hidden)), st = u(() => {
      let t = se.value.length + 1;
      return a.sortable && ++t, t;
    }), ze = u(() => S.value.filter((t) => t.isForRowKey)), pe = u(() => je.value.length > 0 && !a.sortable), He = u(() => S.value.map((t) => t.key)), oe = u(() => {
      let t = [];
      for (let p in l) He.value.indexOf(p) !== -1 && t.push(p);
      return t;
    }), xe = u(() => {
      let t = [];
      for (let p in l) p.indexOf("slide-") !== -1 && t.push(p);
      return t;
    }), qe = u(() => {
      var t;
      return a.hiddenSave || V.value || !((t = R.value) != null && t.resource || R.value.type) ? !1 : k.value && j.value ? !0 : k.value;
    }), It = u(() => gt.value && r.value.length >= a.requiredItemsForTopCreate || Ke.value ? !0 : qe.value || k.value && ke.value), lt = u(() => {
      var t, p;
      return U.value, typeof ((t = R.value) == null ? void 0 : t.disabled) == "function" ? R.value.disabled({
        value: r.value,
        dataState: f.value
      }) : typeof ((p = R.value) == null ? void 0 : p.disabled) == "boolean" ? R.value.disabled : !j.value;
    }), dt = u(() => r.value.length), Tt = u(() => {
      var t;
      return {
        items: r.value,
        ...(t = R.value) == null ? void 0 : t.resourceData
      };
    }), ct = u(() => a.titleTag === "" ? "h2" : a.titleTag), vt = u(() => a.wrapContentTag === "" ? "div" : a.wrapContentTag), Me = u(() => ia(a.title)), Ge = u(() => {
      var t;
      return (t = a.drag) == null ? void 0 : t.enabled;
    }), ke = u(() => O.value.includes(we.Create)), Xe = u(() => O.value.includes("read")), de = u(() => O.value.includes(we.Update)), ge = u(() => O.value.includes(we.Edit)), Se = u(() => O.value.includes(we.InlineEdit)), Re = u(() => O.value.includes(we.ModalCreate)), Ye = u(() => O.value.includes(we.InlineCreate)), ft = u(() => O.value.includes(we.InlineCreateEver)), be = u(() => O.value.includes(we.Drop)), $e = u(() => O.value.includes(we.SwitchEditMode)), Ke = u(() => !$e.value || !de.value && !be.value || !de.value && be.value ? !1 : !V.value), nt = u(() => {
      var t;
      return (typeof ((t = a.paginator) == null ? void 0 : t.type) < "u" && [kt.LoadMore, kt.Infinite].includes(a.paginator.type) || !V.value) && r.value.length > 0;
    }), We = (t) => {
      let p = t.target;
      if (typeof p.dataset.column > "u")
        do
          p = p.parentNode;
        while (typeof p.dataset.column > "u" && p.tagName !== "TABLE" && p.tagName !== "body");
      if (p.tagName === "TD" && (p = p.parentNode, p = p.dataset.i, typeof p < "u"))
        return r.value[p];
    }, Et = (t) => r.value[t], At = (t) => {
      var p;
      return (p = c.value) == null ? void 0 : p.querySelector(`[data-i="${t}"]`);
    }, mt = (t) => T.value["tr_" + t] === !0, ot = (t) => {
      t && t.sortable && (r.value = r.value.sort((p, M) => b.value(p, M, t, m.value)), m.value = m.value === Oe.Asc ? Oe.Desc : Oe.Asc, g.value = t.key, U.value = Le(), n("sort", [g.value, m.value]));
    }, pt = (t) => {
      n("click", t);
    }, Je = (t, p) => {
      let M = "tr_" + p;
      T.value[M] = typeof T.value[M] > "u" ? !0 : !T.value[M];
    }, s = (t) => {
      var M, K, te, ce, _, I, W, ye;
      let p = parseInt((ce = (te = (K = (M = t == null ? void 0 : t.originalEvent) == null ? void 0 : M.toElement) == null ? void 0 : K.closest("tr")) == null ? void 0 : te.dataset) == null ? void 0 : ce.i);
      return !(typeof ((_ = a.drag) == null ? void 0 : _.isValid) == "function" && !((I = a.drag) != null && I.isValid(r.value[p])) || typeof ((W = a.drag) == null ? void 0 : W.isValid) == "boolean" && !((ye = a.drag) != null && ye.isValid));
    }, y = (t) => {
      var p, M;
      return typeof ((p = a.drag) == null ? void 0 : p.isDraggable) == "function" ? (M = a.drag) == null ? void 0 : M.isDraggable(t) : !0;
    }, w = () => {
      if (ke.value) {
        n("click-create");
        return;
      }
      if (ft.value)
        n("click-create");
      else {
        if (typeof a.newValueGenerator == "function") {
          let t = a.newValueGenerator();
          if (typeof t == "object" || a.type !== et.Table) {
            r.value.push(t);
            return;
          }
        }
        r.value.push({});
      }
    }, D = (t) => {
      r.value.push(t);
    }, N = () => V.value = !0, G = () => V.value = !1, le = (t, p) => {
      var M, K, te;
      if (!((M = R.value) != null && M.type && [
        Lt.Split,
        Lt.SplitEver,
        Lt.SplitLazy
      ].includes((K = R.value) == null ? void 0 : K.type))) {
        if (n("before-save"), (te = R.value) != null && te.resource && (V.value = !1, !p.success)) {
          n("error", p.httpStatus);
          return;
        }
        f.value.turnStoredIntoOriginal(), j.value = !1, n("save", p);
      }
    }, ee = (t, p, M) => {
      if (M >= t.length) {
        let K = M - t.length + 1;
        for (; K--; ) t.push(void 0);
      }
      return t.splice(M, 0, t.splice(p, 1)[0]), t;
    }, Vt = (t) => {
      ee(r.value, t, t - 1), U.value = Le();
    }, Nt = (t) => {
      ee(r.value, t, t + 1), U.value = Le();
    }, Qe = (t) => {
      r.value.splice(t, 1), U.value = Le();
    }, ga = () => {
      var t;
      Z.value && typeof ((t = Z.value) == null ? void 0 : t.destroy) == "function" && (Z.value.destroy(), Z.value = {});
    }, Ht = () => {
      L.value || (L.value = document.getElementById("lkt-table-body-" + ue)), Z.value = new Ra(L.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(t) {
          let p = t.oldIndex, M = t.newIndex;
          r.value.splice(M, 0, r.value.splice(p, 1)[0]), U.value = Le(), n("drag-end", r.value[M]);
        },
        onMove: function(t, p) {
          return s(t);
        }
      });
    }, _t = (t, p, M = !1) => {
      let K = [U.value, ue, "row", p];
      return M && K.push("hidden"), ze.value.forEach((te) => {
        let ce = String(t[te.key]).toLowerCase();
        ce.length > 50 && (ce = ce.substring(0, 50)), ce = ra(ce, " ", "-"), K.push(ce);
      }), K.join("-");
    }, xt = u(() => typeof a.createEnabledValidator == "function" ? a.createEnabledValidator({ items: r.value }) : !0), gt = u(() => ft.value || ke.value && k.value || Ye.value && k.value || Re.value && k.value), ba = u(() => [et.Ol, et.Ul].includes(a.type)), Mt = (t, p) => typeof a.itemDisplayChecker == "function" ? a.itemDisplayChecker(t) : !0;
    jt(() => {
      var t;
      a.initialSorting && ot(ll(a.columns, g.value)), f.value.store({ items: r.value }).turnStoredIntoOriginal(), j.value = !1, (t = a.drag) != null && t.enabled && bt(() => {
        Ht();
      });
    }), H(() => {
      var t;
      return (t = a.drag) == null ? void 0 : t.enabled;
    }, (t) => {
      t ? Ht() : ga();
    }), H(() => a.perms, (t) => O.value = t), H(O, (t) => n("update:perms", t)), H(() => a.editMode, (t) => k.value = t), H(() => a.columns, (t) => S.value = t, { deep: !0 }), H(() => a.modelValue, (t) => r.value = t, { deep: !0 }), H(r, (t) => {
      f.value.increment({ items: t }), j.value = f.value.changed(), n("update:modelValue", t);
    }, { deep: !0 }), o({
      getItemByEvent: We,
      getItemByIndex: Et,
      getRowByIndex: At,
      doRefresh: me,
      getHtml: () => ne.value,
      turnStoredIntoOriginal: () => {
        f.value.turnStoredIntoOriginal(), bt(() => {
          U.value = Le();
        });
      }
    });
    const ya = u(() => typeof Y.defaultEmptySlot < "u"), ha = u(() => Y.defaultEmptySlot), ka = u(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled ? !1 : typeof a.drag.canRender > "u" ? !0 : a.drag.canRender), Sa = u(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled || typeof a.drag.isDisabled > "u" ? !1 : a.drag.isDisabled);
    return (t, p) => {
      const M = ve("lkt-button"), K = ve("lkt-field"), te = ve("lkt-loader"), ce = ve("lkt-paginator");
      return d(), h("section", {
        ref_key: "element",
        ref: ne,
        class: "lkt-table-page",
        id: "lkt-table-page-" + B(ue)
      }, [
        Me.value || B(l).title ? (d(), h("header", {
          key: 0,
          class: re(t.headerClass)
        }, [
          Me.value ? (d(), $(Ie(ct.value), { key: 0 }, {
            default: F(() => [
              t.titleIcon ? (d(), h("i", {
                key: 0,
                class: re(t.titleIcon)
              }, null, 2)) : A("", !0),
              Ae(" " + Pe(Me.value), 1)
            ]),
            _: 1
          })) : A("", !0),
          B(l).title ? z(t.$slots, "title", { key: 1 }) : A("", !0)
        ], 2)) : A("", !0),
        (d(), $(Ie(vt.value), {
          class: re(["lkt-table-page-content-wrapper", t.wrapContentClass])
        }, {
          default: F(() => [
            It.value ? (d(), h("div", Il, [
              it(Be(M, fe({
                class: "lkt-table--save-button",
                ref_key: "saveButtonRef",
                ref: Ve
              }, R.value, {
                disabled: lt.value,
                "modal-data": Tt.value,
                onLoading: N,
                onLoaded: G,
                onClick: le
              }), {
                split: F(({ doClose: _, doRootClick: I }) => [
                  z(t.$slots, "button-save-split", {
                    doClose: _,
                    doRootClick: I,
                    dataState: f.value,
                    onButtonLoading: N,
                    onButtonLoaded: G
                  })
                ]),
                default: F(() => [
                  B(l)["button-save"] ? z(t.$slots, "button-save", {
                    key: 0,
                    items: r.value,
                    editMode: t.editMode,
                    canUpdate: !lt.value
                  }) : A("", !0)
                ]),
                _: 3
              }, 16, ["disabled", "modal-data"]), [
                [rt, qe.value]
              ]),
              gt.value && r.value.length >= t.requiredItemsForTopCreate ? (d(), $(ea, {
                key: 0,
                config: Te.value,
                disabled: !xt.value,
                onClick: w,
                onAppend: D
              }, null, 8, ["config", "disabled"])) : A("", !0),
              J("div", Tl, [
                it(Be(K, fe(Ct.value, {
                  modelValue: k.value,
                  "onUpdate:modelValue": p[0] || (p[0] = (_) => k.value = _)
                }), null, 16, ["modelValue"]), [
                  [rt, Ke.value]
                ])
              ])
            ])) : A("", !0),
            B(l).buttons ? (d(), h("div", El, [
              z(t.$slots, "buttons")
            ])) : A("", !0),
            he.value && B(l).filters ? (d(), h("div", Al, [
              z(t.$slots, "filters", {
                items: r.value,
                isLoading: V.value
              })
            ])) : A("", !0),
            it(J("div", Vl, [
              t.type === B(et).Table ? (d(), h("table", Nl, [
                J("thead", null, [
                  J("tr", null, [
                    Ge.value && k.value ? (d(), h("th", _l)) : A("", !0),
                    t.addNavigation && k.value ? (d(), h("th", Ml)) : A("", !0),
                    pe.value ? (d(), h("th", Rl)) : A("", !0),
                    (d(!0), h(x, null, ie(se.value, (_) => (d(), h(x, null, [
                      _e.value.indexOf(_.key) === -1 ? (d(), $(Dl, {
                        key: 0,
                        column: _,
                        "sort-by": g.value,
                        "sort-direction": m.value,
                        "amount-of-columns": t.columns.length,
                        items: r.value,
                        onClick: (I) => ot(_)
                      }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : A("", !0)
                    ], 64))), 256)),
                    be.value && k.value ? (d(), h("th", $l)) : A("", !0),
                    ge.value && de.value && k.value ? (d(), h("th", Ll)) : A("", !0)
                  ])
                ]),
                J("tbody", {
                  ref_key: "tableBody",
                  ref: c,
                  id: "lkt-table-body-" + B(ue)
                }, [
                  (d(!0), h(x, null, ie(r.value, (_, I) => it((d(), $(gl, {
                    modelValue: r.value[I],
                    "onUpdate:modelValue": (W) => r.value[I] = W,
                    key: _t(_, I),
                    i: I,
                    "drop-button": Ue.value,
                    "edit-button": t.editButton,
                    "display-hidden-columns-indicator": pe.value,
                    "is-draggable": y(_),
                    sortable: Ge.value,
                    "visible-columns": se.value,
                    "empty-columns": _e.value,
                    "add-navigation": t.addNavigation,
                    "hidden-is-visible": mt(I),
                    "latest-row": I + 1 === dt.value,
                    "can-drop": be.value && k.value,
                    "can-edit": ge.value && de.value && k.value,
                    "edit-mode-enabled": k.value,
                    "has-inline-edit-perm": Se.value,
                    "row-display-type": t.rowDisplayType,
                    "render-drag": ka.value,
                    "disabled-drag": Sa.value,
                    onClick: pt,
                    onShow: Je,
                    onItemUp: Vt,
                    onItemDown: Nt,
                    onItemDrop: Qe
                  }, Xt({ _: 2 }, [
                    B(l)[`item-${I}`] ? {
                      name: `item-${I}`,
                      fn: F((W) => [
                        z(t.$slots, `item-${I}`, Ee({
                          [t.slotItemVar || ""]: W.item,
                          index: I
                        }))
                      ]),
                      key: "0"
                    } : B(l).item ? {
                      name: "item",
                      fn: F((W) => [
                        z(t.$slots, "item", Ee({
                          [t.slotItemVar || ""]: W.item,
                          index: I
                        }))
                      ]),
                      key: "1"
                    } : void 0,
                    ie(oe.value, (W) => ({
                      name: W,
                      fn: F((ye) => [
                        z(t.$slots, W, Ee({
                          [t.slotItemVar || ""]: ye.item,
                          value: ye.value,
                          column: ye.column
                        }))
                      ])
                    }))
                  ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "drop-button", "edit-button", "display-hidden-columns-indicator", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "hidden-is-visible", "latest-row", "can-drop", "can-edit", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag"])), [
                    [rt, Mt(r.value[I])]
                  ])), 128)),
                  je.value.length > 0 ? (d(!0), h(x, { key: 0 }, ie(r.value, (_, I) => (d(), $(wl, {
                    modelValue: r.value[I],
                    "onUpdate:modelValue": (W) => r.value[I] = W,
                    key: _t(_, I, !0),
                    i: I,
                    "hidden-columns": je.value,
                    "hidden-columns-col-span": st.value,
                    "is-draggable": y(_),
                    sortable: Ge.value,
                    "visible-columns": se.value,
                    "empty-columns": _e.value,
                    "hidden-is-visible": mt(I),
                    "edit-mode-enabled": k.value,
                    "has-inline-edit-perm": Se.value,
                    onClick: pt,
                    onShow: Je
                  }, Xt({ _: 2 }, [
                    ie(oe.value, (W) => ({
                      name: W,
                      fn: F((ye) => [
                        z(t.$slots, W, Ee({
                          [t.slotItemVar || ""]: ye.item,
                          value: ye.value,
                          column: ye.column
                        }))
                      ])
                    }))
                  ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "hidden-columns", "hidden-columns-col-span", "is-draggable", "sortable", "visible-columns", "empty-columns", "hidden-is-visible", "edit-mode-enabled", "has-inline-edit-perm"]))), 128)) : A("", !0)
                ], 8, Ol)
              ])) : t.type === B(et).Item ? (d(), h("div", {
                key: 1,
                ref_key: "tableBody",
                ref: c,
                id: "lkt-table-body-" + B(ue),
                class: re(["lkt-table-items-container", t.itemsContainerClass])
              }, [
                (d(!0), h(x, null, ie(r.value, (_, I) => (d(), h(x, null, [
                  Mt(_) ? (d(), h("div", {
                    class: "lkt-table-item",
                    "data-i": I,
                    key: _t(_, I)
                  }, [
                    z(t.$slots, "item", Ee({
                      [t.slotItemVar || ""]: _,
                      index: I,
                      editing: k.value,
                      canCreate: ke.value,
                      canRead: Xe.value,
                      canUpdate: de.value,
                      canDrop: be.value,
                      isLoading: V.value,
                      doDrop: () => Qe(I)
                    }))
                  ], 8, Fl)) : A("", !0)
                ], 64))), 256))
              ], 10, Pl)) : ba.value ? (d(), $(Ie(t.type), {
                key: 2,
                class: re(["lkt-table-items-container", t.itemsContainerClass])
              }, {
                default: F(() => [
                  (d(!0), h(x, null, ie(r.value, (_, I) => (d(), h(x, null, [
                    Mt(_) ? (d(), h("li", {
                      key: 0,
                      class: "lkt-table-item",
                      "data-i": I
                    }, [
                      z(t.$slots, "item", Ee({
                        [t.slotItemVar || ""]: _,
                        index: I,
                        editing: k.value,
                        canCreate: ke.value,
                        canRead: Xe.value,
                        canUpdate: de.value,
                        canDrop: be.value,
                        isLoading: V.value,
                        doDrop: () => Qe(I)
                      }))
                    ], 8, Ul)) : A("", !0)
                  ], 64))), 256))
                ]),
                _: 3
              }, 8, ["class"])) : t.type === B(et).Carousel ? (d(), h("div", {
                key: 3,
                ref_key: "tableBody",
                ref: c,
                id: "lkt-table-body-" + B(ue),
                class: re(["lkt-table-items-container", t.itemsContainerClass])
              }, [
                Be(B(Xa), fe({
                  modelValue: Q.value,
                  "onUpdate:modelValue": p[1] || (p[1] = (_) => Q.value = _)
                }, t.carousel), {
                  addons: F(() => [
                    Be(B(Wa)),
                    Be(B(Ja))
                  ]),
                  default: F(() => [
                    (d(!0), h(x, null, ie(xe.value, (_, I) => (d(), $(B(Zt), {
                      key: _,
                      index: I
                    }, {
                      default: F(() => [
                        J("div", zl, [
                          z(t.$slots, _)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["index"]))), 128)),
                    (d(!0), h(x, null, ie(r.value, (_, I) => (d(), $(B(Zt), {
                      key: t.slide,
                      index: I
                    }, {
                      default: F(() => [
                        J("div", Hl, [
                          z(t.$slots, "item", Ee({
                            [t.slotItemVar || ""]: _,
                            index: I,
                            editing: k.value,
                            canCreate: ke.value,
                            canRead: Xe.value,
                            canUpdate: de.value,
                            canDrop: be.value,
                            isLoading: V.value,
                            doDrop: () => Qe(I)
                          }))
                        ])
                      ]),
                      _: 2
                    }, 1032, ["index"]))), 128))
                  ]),
                  _: 3
                }, 16, ["modelValue"])
              ], 10, jl)) : A("", !0)
            ], 512), [
              [rt, nt.value]
            ]),
            !V.value && r.value.length === 0 ? (d(), h("div", xl, [
              B(l).empty ? z(t.$slots, "empty", { key: 0 }) : ya.value ? (d(), $(Ie(ha.value), {
                key: 1,
                message: t.noResultsText
              }, null, 8, ["message"])) : t.noResultsText ? (d(), h(x, { key: 2 }, [
                Ae(Pe(t.noResultsText), 1)
              ], 64)) : A("", !0)
            ])) : A("", !0),
            V.value ? (d(), $(te, { key: 4 })) : A("", !0),
            gt.value || B(l).bottomButtons ? (d(), h("div", ql, [
              gt.value && r.value.length >= t.requiredItemsForBottomCreate ? (d(), $(ea, {
                key: 0,
                config: Te.value,
                disabled: !xt.value,
                onClick: w,
                onAppend: D
              }, null, 8, ["config", "disabled"])) : A("", !0),
              z(t.$slots, "bottom-buttons")
            ])) : A("", !0),
            t.paginator && Object.keys(t.paginator).length > 0 ? (d(), $(ce, fe({
              key: 6,
              ref_key: "paginatorRef",
              ref: q
            }, t.paginator, {
              modelValue: E.value,
              "onUpdate:modelValue": p[2] || (p[2] = (_) => E.value = _),
              onLoading: Bt,
              onPerms: Dt,
              onResponse: Ne
            }), null, 16, ["modelValue"])) : A("", !0)
          ]),
          _: 3
        }, 8, ["class"]))
      ], 8, Bl);
    };
  }
}), en = {
  install: (e) => {
    e.component("lkt-table") === void 0 && e.component("lkt-table", Gl);
  }
}, tn = (e) => (Y.navButtonSlot = e, !0), an = (e) => (Y.dropButtonSlot = e, !0), ln = (e) => (Y.createButtonSlot = e, !0), nn = (e) => {
  Y.defaultEmptySlot = e;
}, on = (e) => {
  Y.defaultSaveIcon = e;
};
export {
  sn as Column,
  dn as createColumn,
  en as default,
  ln as setTableCreateButtonSlot,
  an as setTableDropButtonSlot,
  nn as setTableEmptySlot,
  tn as setTableNavButtonSlot,
  on as setTableSaveIcon
};
