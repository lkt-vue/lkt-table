import { defineComponent as pe, computed as u, ref as A, shallowReactive as zt, watch as P, watchEffect as _t, onMounted as Xt, onBeforeUnmount as Da, reactive as Ft, provide as na, h as Y, useId as Ia, inject as kt, getCurrentInstance as Ba, onUnmounted as Ta, onUpdated as Aa, cloneVNode as Ea, resolveComponent as Ce, createBlock as M, createElementBlock as D, unref as h, openBlock as c, mergeProps as x, withCtx as F, createTextVNode as tt, toDisplayString as at, Fragment as G, useSlots as oa, normalizeClass as W, createCommentVNode as L, createElementVNode as ve, createVNode as he, resolveDynamicComponent as ke, renderSlot as O, renderList as be, mergeDefaults as Va, nextTick as At, normalizeProps as Me, withDirectives as je, vShow as ze, createSlots as La } from "vue";
import { __ as Na } from "lkt-i18n";
import { SortDirection as Ge, Column as ia, extractPropValue as Ra, ColumnType as yt, FieldType as Jt, TableRowType as Se, extractI18nValue as ra, LktSettings as Ae, ensureButtonConfig as He, TablePermission as Be, PaginatorType as Et, TableType as qe, getDefaultValues as Ma, Table as Oa, ButtonType as Pt } from "lkt-vue-kernel";
import { Column as an, createColumn as ln } from "lkt-vue-kernel";
import { generateRandomString as $a, replaceAll as _a } from "lkt-string-tools";
import { DataState as Fa } from "lkt-data-state";
import Pa from "sortablejs";
import { time as Ua } from "lkt-date-tools";
/**
 * Vue 3 Carousel 0.14.0
 * (c) 2025
 * @license MIT
 */
const ua = ["viewport", "carousel"], Lt = {
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
], ja = {
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
], z = {
  autoplay: 0,
  breakpointMode: ua[0],
  breakpoints: void 0,
  dir: sa[0],
  enabled: !0,
  gap: 0,
  height: "auto",
  i18n: ja,
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
}, Xe = Symbol("carousel"), za = (t) => {
  const o = zt([]), i = (n) => {
    n !== void 0 ? o.slice(n).forEach((l, a) => {
      var b;
      (b = l.exposed) === null || b === void 0 || b.setIndex(n + a);
    }) : o.forEach((l, a) => {
      var b;
      (b = l.exposed) === null || b === void 0 || b.setIndex(a);
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
      o.splice(a, 0, n), i(a), t("slide-registered", { slide: n, index: a });
    },
    unregisterSlide: (n) => {
      const l = o.indexOf(n);
      l !== -1 && (t("slide-unregistered", { slide: n, index: l }), o.splice(l, 1), i(l));
    }
  };
};
function Ha(t) {
  return t.length === 0 ? 0 : t.reduce((i, n) => i + n, 0) / t.length;
}
function Qt({ slides: t, position: o, toShow: i }) {
  const n = [], l = o === "before", a = l ? -i : 0, b = l ? 0 : i;
  if (t.length <= 0)
    return n;
  for (let S = a; S < b; S++) {
    const d = {
      index: l ? S : S + t.length,
      isClone: !0,
      position: o,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${o}-${S}`
    }, I = t[(S % t.length + t.length) % t.length].vnode, m = Ea(I, d);
    m.el = null, n.push(m);
  }
  return n;
}
const qa = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function Zt(t) {
  if (!t.el || !(t.el instanceof Element))
    return;
  const o = t.el.querySelectorAll(qa);
  for (const i of o)
    i instanceof HTMLElement && !i.hasAttribute("disabled") && i.getAttribute("aria-hidden") !== "true" && i.setAttribute("tabindex", "-1");
}
function Ga(t, o) {
  return Object.keys(t).filter((i) => !o.includes(i)).reduce((i, n) => (i[n] = t[n], i), {});
}
function Xa(t) {
  const { isVertical: o, isReversed: i, dragged: n, effectiveSlideSize: l } = t, a = o ? n.y : n.x;
  if (a === 0)
    return 0;
  const b = Math.round(a / l);
  return i ? b : -b;
}
function Te({ val: t, max: o, min: i }) {
  return o < i ? t : Math.min(Math.max(t, isNaN(i) ? t : i), isNaN(o) ? t : o);
}
function xa(t) {
  const { transform: o } = window.getComputedStyle(t);
  return o.split(/[(,)]/).slice(1, -1).map((i) => parseFloat(i));
}
function Ya(t) {
  let o = 1, i = 1;
  return t.forEach((n) => {
    const l = xa(n);
    l.length === 6 && (o /= l[0], i /= l[3]);
  }), { widthMultiplier: o, heightMultiplier: i };
}
function Ka(t, o) {
  switch (t) {
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
function Wa(t, o, i) {
  switch (t) {
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
function Ht({ slideSize: t, viewportSize: o, align: i, itemsToShow: n }) {
  return n !== void 0 ? Ka(i, n) : t !== void 0 && o !== void 0 ? Wa(i, t, o) : 0;
}
function va(t = "", o = {}) {
  return Object.entries(o).reduce((i, [n, l]) => i.replace(`{${n}}`, String(l)), t);
}
function fa({ val: t, max: o, min: i = 0 }) {
  const n = o - i + 1;
  return ((t - i) % n + n) % n + i;
}
function Ut(t, o = 0) {
  let i = !1, n = 0, l = null;
  function a(...b) {
    if (i)
      return;
    i = !0;
    const S = () => {
      l = requestAnimationFrame((B) => {
        B - n > o ? (n = B, t(...b), i = !1) : S();
      });
    };
    S();
  }
  return a.cancel = () => {
    l && (cancelAnimationFrame(l), l = null, i = !1);
  }, a;
}
function Vt(t, o = "px") {
  if (!(t == null || t === ""))
    return typeof t == "number" || parseFloat(t).toString() === t ? `${t}${o}` : t;
}
const Ja = pe({
  name: "CarouselAria",
  setup() {
    const t = kt(Xe);
    return t ? () => Y("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, va(t.config.i18n.itemXofY, {
      currentSlide: t.currentSlide + 1,
      slidesCount: t.slidesCount
    })) : () => "";
  }
}), Qa = {
  // time to auto advance slides in ms
  autoplay: {
    default: z.autoplay,
    type: Number
  },
  // an object to store breakpoints
  breakpoints: {
    default: z.breakpoints,
    type: Object
  },
  // controls the breakpoint mode relative to the carousel container or the viewport
  breakpointMode: {
    default: z.breakpointMode,
    validator(t) {
      return ua.includes(t);
    }
  },
  // enable/disable the carousel component
  enabled: {
    default: z.enabled,
    type: Boolean
  },
  // control the gap between slides
  gap: {
    default: z.gap,
    type: Number
  },
  // control the gap between slides
  height: {
    default: z.height,
    type: [Number, String]
  },
  ignoreAnimations: {
    default: !1,
    type: [Array, Boolean, String]
  },
  // count of items to be scrolled
  itemsToScroll: {
    default: z.itemsToScroll,
    type: Number
  },
  // count of items to showed per view
  itemsToShow: {
    default: z.itemsToShow,
    type: [Number, String]
  },
  // aria-labels and additional text labels
  i18n: {
    default: z.i18n,
    type: Object
  },
  // slide number number of initial slide
  modelValue: {
    default: void 0,
    type: Number
  },
  // toggle mouse dragging.
  mouseDrag: {
    default: z.mouseDrag,
    type: Boolean
  },
  // toggle mouse dragging.
  touchDrag: {
    default: z.touchDrag,
    type: Boolean
  },
  pauseAutoplayOnHover: {
    default: z.pauseAutoplayOnHover,
    type: Boolean
  },
  preventExcessiveDragging: {
    default: !1,
    type: Boolean,
    validator(t, o) {
      return t && o.wrapAround && console.warn('[vue3-carousel warn]: "preventExcessiveDragging" cannot be used with wrapAround. The setting will be ignored.'), !0;
    }
  },
  // control snap position alignment
  snapAlign: {
    default: z.snapAlign,
    validator(t) {
      return ca.includes(t);
    }
  },
  slideEffect: {
    type: String,
    default: z.slideEffect,
    validator(t) {
      return da.includes(t);
    }
  },
  // sliding transition time in ms
  transition: {
    default: z.transition,
    type: Number
  },
  // control the gap between slides
  dir: {
    type: String,
    default: z.dir,
    validator(t, o) {
      if (!sa.includes(t))
        return !1;
      const i = t in Lt ? Lt[t] : t;
      return ["ttb", "btt"].includes(i) && (!o.height || o.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${t}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: z.wrapAround,
    type: Boolean
  }
}, Za = pe({
  name: "VueCarousel",
  props: Qa,
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
  setup(t, { slots: o, emit: i, expose: n }) {
    var l;
    const a = za(i), b = a.getSlides(), S = u(() => b.length), B = A(null), d = A(null), I = A(0), m = u(() => Object.assign(Object.assign(Object.assign({}, z), Ga(t, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, z.i18n), t.i18n) })), s = zt(Object.assign({}, m.value)), g = A((l = t.modelValue) !== null && l !== void 0 ? l : 0), V = A(g.value);
    P(g, (r) => V.value = r);
    const E = A(0), J = u(() => Math.ceil((S.value - 1) / 2)), ie = u(() => S.value - 1), re = u(() => 0);
    let Q = null, v = null, w = null;
    const ue = u(() => I.value + s.gap), U = u(() => {
      const r = s.dir || "ltr";
      return r in Lt ? Lt[r] : r;
    }), le = u(() => ["rtl", "btt"].includes(U.value)), _ = u(() => ["ttb", "btt"].includes(U.value)), ne = u(() => s.itemsToShow === "auto"), H = u(() => _.value ? "height" : "width");
    function Oe() {
      var r;
      if (!Le.value)
        return;
      const y = (m.value.breakpointMode === "carousel" ? (r = B.value) === null || r === void 0 ? void 0 : r.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, C = Object.keys(t.breakpoints || {}).map((R) => Number(R)).sort((R, K) => +K - +R), T = {};
      C.some((R) => y >= R ? (Object.assign(T, t.breakpoints[R]), T.i18n && Object.assign(T.i18n, m.value.i18n, t.breakpoints[R].i18n), !0) : !1), Object.assign(s, m.value, T);
    }
    const Ee = Ut(() => {
      Oe(), me(), se();
    }), xe = zt(/* @__PURE__ */ new Set()), Z = A([]);
    function Nt({ widthMultiplier: r, heightMultiplier: y }) {
      Z.value = b.map((C) => {
        var T;
        const R = (T = C.exposed) === null || T === void 0 ? void 0 : T.getBoundingRect();
        return {
          width: R.width * r,
          height: R.height * y
        };
      });
    }
    const $e = A({
      width: 0,
      height: 0
    });
    function we({ widthMultiplier: r, heightMultiplier: y }) {
      var C;
      const T = ((C = d.value) === null || C === void 0 ? void 0 : C.getBoundingClientRect()) || { width: 0, height: 0 };
      $e.value = {
        width: T.width * r,
        height: T.height * y
      };
    }
    function se() {
      if (!d.value)
        return;
      const r = Ya(xe);
      if (we(r), Nt(r), ne.value)
        I.value = Ha(Z.value.map((y) => y[H.value]));
      else {
        const y = Number(s.itemsToShow), C = (y - 1) * s.gap;
        I.value = ($e.value[H.value] - C) / y;
      }
    }
    function me() {
      !s.wrapAround && S.value > 0 && (g.value = Te({
        val: g.value,
        max: ie.value,
        min: re.value
      })), ne.value || (s.itemsToShow = Te({
        val: Number(s.itemsToShow),
        max: S.value,
        min: 1
      }));
    }
    const lt = u(() => typeof t.ignoreAnimations == "string" ? t.ignoreAnimations.split(",") : Array.isArray(t.ignoreAnimations) ? t.ignoreAnimations : t.ignoreAnimations ? !1 : []);
    _t(() => me()), _t(() => {
      se();
    });
    let Ve;
    const St = (r) => {
      const y = r.target;
      if (!(!(y != null && y.contains(B.value)) || Array.isArray(lt.value) && lt.value.includes(r.animationName)) && (xe.add(y), !Ve)) {
        const C = () => {
          Ve = requestAnimationFrame(() => {
            se(), C();
          });
        };
        C();
      }
    }, Ct = (r) => {
      const y = r.target;
      y && xe.delete(y), Ve && xe.size === 0 && (cancelAnimationFrame(Ve), se());
    }, Le = A(!1);
    typeof document < "u" && _t(() => {
      Le.value && lt.value !== !1 ? (document.addEventListener("animationstart", St), document.addEventListener("animationend", Ct)) : (document.removeEventListener("animationstart", St), document.removeEventListener("animationend", Ct));
    }), Xt(() => {
      Le.value = !0, Oe(), wt(), B.value && (w = new ResizeObserver(Ee), w.observe(B.value)), i("init");
    }), Da(() => {
      Le.value = !1, a.cleanup(), v && clearTimeout(v), Ve && cancelAnimationFrame(Ve), Q && clearInterval(Q), w && (w.disconnect(), w = null), typeof document < "u" && Ne(), B.value && (B.value.removeEventListener("transitionend", se), B.value.removeEventListener("animationiteration", se));
    });
    let De = !1;
    const ge = { x: 0, y: 0 }, de = Ft({ x: 0, y: 0 }), _e = A(!1), nt = A(!1), Rt = () => {
      _e.value = !0;
    }, ot = () => {
      _e.value = !1;
    }, it = Ut((r) => {
      if (!r.ctrlKey)
        switch (r.key) {
          case "ArrowLeft":
          case "ArrowUp":
            _.value === r.key.endsWith("Up") && (le.value ? Ie(!0) : We(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            _.value === r.key.endsWith("Down") && (le.value ? We(!0) : Ie(!0));
            break;
        }
    }, 200), ye = () => {
      document.addEventListener("keydown", it);
    }, Ne = () => {
      document.removeEventListener("keydown", it);
    };
    function ee(r) {
      const y = r.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(y) || q.value || (De = r.type === "touchstart", !De && (r.preventDefault(), r.button !== 0)))
        return;
      ge.x = "touches" in r ? r.touches[0].clientX : r.clientX, ge.y = "touches" in r ? r.touches[0].clientY : r.clientY;
      const C = De ? "touchmove" : "mousemove", T = De ? "touchend" : "mouseup";
      document.addEventListener(C, rt, { passive: !1 }), document.addEventListener(T, Ye, { passive: !0 });
    }
    const rt = Ut((r) => {
      nt.value = !0;
      const y = "touches" in r ? r.touches[0].clientX : r.clientX, C = "touches" in r ? r.touches[0].clientY : r.clientY;
      de.x = y - ge.x, de.y = C - ge.y;
      const T = Xa({
        isVertical: _.value,
        isReversed: le.value,
        dragged: de,
        effectiveSlideSize: ue.value
      });
      V.value = s.wrapAround ? g.value + T : Te({
        val: g.value + T,
        max: ie.value,
        min: re.value
      }), i("drag", { deltaX: de.x, deltaY: de.y });
    });
    function Ye() {
      if (rt.cancel(), V.value !== g.value && !De) {
        const C = (T) => {
          T.preventDefault(), window.removeEventListener("click", C);
        };
        window.addEventListener("click", C);
      }
      Re(V.value), de.x = 0, de.y = 0, nt.value = !1;
      const r = De ? "touchmove" : "mousemove", y = De ? "touchend" : "mouseup";
      document.removeEventListener(r, rt), document.removeEventListener(y, Ye);
    }
    function wt() {
      !s.autoplay || s.autoplay <= 0 || (Q = setInterval(() => {
        s.pauseAutoplayOnHover && _e.value || Ie();
      }, s.autoplay));
    }
    function ut() {
      Q && (clearInterval(Q), Q = null);
    }
    function Ke() {
      ut(), wt();
    }
    const q = A(!1);
    function Re(r, y = !1) {
      if (!y && q.value)
        return;
      let C = r, T = r;
      E.value = g.value, s.wrapAround ? T = fa({
        val: C,
        max: ie.value,
        min: re.value
      }) : C = Te({
        val: C,
        max: ie.value,
        min: re.value
      }), i("slide-start", {
        slidingToIndex: r,
        currentSlideIndex: g.value,
        prevSlideIndex: E.value,
        slidesCount: S.value
      }), ut(), q.value = !0, g.value = C, T !== C && st.pause(), i("update:modelValue", T), v = setTimeout(() => {
        s.wrapAround && T !== C && (st.resume(), g.value = T, i("loop", {
          currentSlideIndex: g.value,
          slidingToIndex: r
        })), i("slide-end", {
          currentSlideIndex: g.value,
          prevSlideIndex: E.value,
          slidesCount: S.value
        }), q.value = !1, Ke();
      }, s.transition);
    }
    function Ie(r = !1) {
      Re(g.value + s.itemsToScroll, r);
    }
    function We(r = !1) {
      Re(g.value - s.itemsToScroll, r);
    }
    function Fe() {
      Oe(), me(), se(), Ke();
    }
    P(() => [m.value, t.breakpoints], () => Oe(), { deep: !0 }), P(() => t.autoplay, () => Ke());
    const st = P(() => t.modelValue, (r) => {
      r !== g.value && Re(Number(r), !0);
    });
    i("before-init");
    const Pe = u(() => {
      if (!s.wrapAround)
        return { before: 0, after: 0 };
      if (ne.value)
        return { before: b.length, after: b.length };
      const r = Number(s.itemsToShow), y = Math.ceil(r + (s.itemsToScroll - 1)), C = y - V.value, T = y - (S.value - (V.value + 1));
      return {
        before: Math.max(0, C),
        after: Math.max(0, T)
      };
    }), oe = u(() => Pe.value.before ? ne.value ? Z.value.slice(-1 * Pe.value.before).reduce((r, y) => r + y[H.value] + s.gap, 0) * -1 : Pe.value.before * ue.value * -1 : 0), dt = u(() => {
      var r;
      if (ne.value) {
        const y = (g.value % b.length + b.length) % b.length;
        return Ht({
          slideSize: (r = Z.value[y]) === null || r === void 0 ? void 0 : r[H.value],
          viewportSize: $e.value[H.value],
          align: s.snapAlign
        });
      }
      return Ht({
        align: s.snapAlign,
        itemsToShow: +s.itemsToShow
      });
    }), Je = u(() => {
      let r = 0;
      if (ne.value) {
        if (g.value < 0 ? r = Z.value.slice(g.value).reduce((y, C) => y + C[H.value] + s.gap, 0) * -1 : r = Z.value.slice(0, g.value).reduce((y, C) => y + C[H.value] + s.gap, 0), r -= dt.value, !s.wrapAround) {
          const y = Z.value.reduce((C, T) => C + T[H.value] + s.gap, 0) - $e.value[H.value] - s.gap;
          r = Te({
            val: r,
            max: y,
            min: 0
          });
        }
      } else {
        let y = g.value - dt.value;
        s.wrapAround || (y = Te({
          val: y,
          max: S.value - +s.itemsToShow,
          min: 0
        })), r = y * ue.value;
      }
      return r * (le.value ? 1 : -1);
    }), Dt = u(() => {
      var r, y;
      if (!ne.value) {
        const R = g.value - dt.value;
        return s.wrapAround ? {
          min: Math.floor(R),
          max: Math.ceil(R + Number(s.itemsToShow) - 1)
        } : {
          min: Math.floor(Te({
            val: R,
            max: S.value - Number(s.itemsToShow),
            min: 0
          })),
          max: Math.ceil(Te({
            val: R + Number(s.itemsToShow) - 1,
            max: S.value - 1,
            min: 0
          }))
        };
      }
      let C = 0;
      {
        let R = 0, K = 0 - Pe.value.before;
        const X = Math.abs(Je.value + oe.value);
        for (; R <= X; ) {
          const te = (K % b.length + b.length) % b.length;
          R += ((r = Z.value[te]) === null || r === void 0 ? void 0 : r[H.value]) + s.gap, K++;
        }
        C = K - 1;
      }
      let T = 0;
      {
        let R = C, K = 0;
        for (R < 0 ? K = Z.value.slice(0, R).reduce((X, te) => X + te[H.value] + s.gap, 0) - Math.abs(Je.value + oe.value) : K = Z.value.slice(0, R).reduce((X, te) => X + te[H.value] + s.gap, 0) - Math.abs(Je.value); K < $e.value[H.value]; ) {
          const X = (R % b.length + b.length) % b.length;
          K += ((y = Z.value[X]) === null || y === void 0 ? void 0 : y[H.value]) + s.gap, R++;
        }
        T = R - 1;
      }
      return {
        min: Math.floor(C),
        max: Math.ceil(T)
      };
    }), Mt = u(() => {
      if (s.slideEffect === "fade")
        return;
      const r = _.value ? "Y" : "X", y = _.value ? de.y : de.x;
      let C = Je.value + y;
      if (!s.wrapAround && s.preventExcessiveDragging) {
        let T = 0;
        ne.value ? T = Z.value.reduce((X, te) => X + te[H.value], 0) : T = (S.value - Number(s.itemsToShow)) * ue.value;
        const R = le.value ? 0 : -1 * T, K = le.value ? T : 0;
        C = Te({
          val: C,
          min: R,
          max: K
        });
      }
      return `translate${r}(${C}px)`;
    }), Ot = u(() => ({
      "--vc-transition-duration": q.value ? Vt(s.transition, "ms") : void 0,
      "--vc-slide-gap": Vt(s.gap),
      "--vc-carousel-height": Vt(s.height),
      "--vc-cloned-offset": Vt(oe.value)
    })), It = { slideTo: Re, next: Ie, prev: We }, ct = Ft({
      activeSlide: V,
      config: s,
      currentSlide: g,
      isSliding: q,
      isVertical: _,
      maxSlide: ie,
      minSlide: re,
      nav: It,
      normalizedDir: U,
      slideRegistry: a,
      slideSize: I,
      slides: b,
      slidesCount: S,
      viewport: d,
      visibleRange: Dt
    });
    na(Xe, ct);
    const Ue = Ft({
      config: s,
      currentSlide: g,
      maxSlide: ie,
      middleSlide: J,
      minSlide: re,
      slideSize: I,
      slidesCount: S
    });
    return n({
      data: Ue,
      nav: It,
      next: Ie,
      prev: We,
      restartCarousel: Fe,
      slideTo: Re,
      updateBreakpointsConfig: Oe,
      updateSlideSize: se,
      updateSlidesData: me
    }), () => {
      var r;
      const y = o.default || o.slides, C = (y == null ? void 0 : y(Ue)) || [], { before: T, after: R } = Pe.value, K = Qt({
        slides: b,
        position: "before",
        toShow: T
      }), X = Qt({
        slides: b,
        position: "after",
        toShow: R
      }), te = [...K, ...C, ...X];
      if (!s.enabled || !te.length)
        return Y("section", {
          ref: B,
          class: ["carousel", "is-disabled"]
        }, te);
      const vt = ((r = o.addons) === null || r === void 0 ? void 0 : r.call(o, Ue)) || [], Qe = Y("ol", {
        class: "carousel__track",
        style: { transform: Mt.value },
        onMousedownCapture: s.mouseDrag ? ee : null,
        onTouchstartPassiveCapture: s.touchDrag ? ee : null
      }, te), ft = Y("div", { class: "carousel__viewport", ref: d }, Qe);
      return Y("section", {
        ref: B,
        class: [
          "carousel",
          `is-${U.value}`,
          `is-effect-${s.slideEffect}`,
          {
            "is-vertical": _.value,
            "is-sliding": q.value,
            "is-dragging": nt.value,
            "is-hover": _e.value
          }
        ],
        dir: U.value,
        style: Ot.value,
        "aria-label": s.i18n.ariaGallery,
        tabindex: "0",
        onFocus: ye,
        onBlur: Ne,
        onMouseenter: Rt,
        onMouseleave: ot
      }, [ft, vt, Y(Ja)]);
    };
  }
});
var qt;
(function(t) {
  t.arrowDown = "arrowDown", t.arrowLeft = "arrowLeft", t.arrowRight = "arrowRight", t.arrowUp = "arrowUp";
})(qt || (qt = {}));
const ea = (t) => `icon${t.charAt(0).toUpperCase() + t.slice(1)}`, el = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function tl(t) {
  return t in qt;
}
const ta = (t) => t && tl(t), aa = pe({
  props: {
    name: {
      type: String,
      required: !0,
      validator: ta
    },
    title: {
      type: String,
      default: (t) => t.name ? z.i18n[ea(t.name)] : ""
    }
  },
  setup(t) {
    const o = kt(Xe, null);
    return () => {
      const i = t.name;
      if (!i || !ta(i))
        return;
      const n = el[i], l = Y("path", { d: n }), a = (o == null ? void 0 : o.config.i18n[ea(i)]) || t.title, b = Y("title", a);
      return Y("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": a
      }, [b, l]);
    };
  }
}), al = pe({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(t, { slots: o, attrs: i }) {
    const n = kt(Xe);
    if (!n)
      return () => "";
    const { next: l, prev: a } = o, b = () => ({
      btt: "arrowDown",
      ltr: "arrowLeft",
      rtl: "arrowRight",
      ttb: "arrowUp"
    })[n.normalizedDir], S = () => ({
      btt: "arrowUp",
      ltr: "arrowRight",
      rtl: "arrowLeft",
      ttb: "arrowDown"
    })[n.normalizedDir], B = u(() => !n.config.wrapAround && n.currentSlide <= n.minSlide), d = u(() => !n.config.wrapAround && n.currentSlide >= n.maxSlide);
    return () => {
      const { i18n: I } = n.config, m = Y("button", Object.assign(Object.assign({ type: "button", disabled: B.value, "aria-label": I.ariaPreviousSlide, title: I.ariaPreviousSlide, onClick: n.nav.prev }, i), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": B.value },
        i.class
      ] }), (a == null ? void 0 : a()) || Y(aa, { name: b() })), s = Y("button", Object.assign(Object.assign({ type: "button", disabled: d.value, "aria-label": I.ariaNextSlide, title: I.ariaNextSlide, onClick: n.nav.next }, i), { class: [
        "carousel__next",
        { "carousel__next--disabled": d.value },
        i.class
      ] }), (l == null ? void 0 : l()) || Y(aa, { name: S() }));
      return [m, s];
    };
  }
}), ll = pe({
  name: "CarouselPagination",
  props: {
    disableOnClick: {
      type: Boolean
    },
    paginateByItemsToShow: {
      type: Boolean
    }
  },
  setup(t) {
    const o = kt(Xe);
    if (!o)
      return () => "";
    const i = u(() => o.config.itemsToShow), n = u(() => Ht({
      align: o.config.snapAlign,
      itemsToShow: i.value
    })), l = u(() => t.paginateByItemsToShow && i.value > 1), a = u(() => Math.ceil((o.activeSlide - n.value) / i.value)), b = u(() => Math.ceil(o.slidesCount / i.value)), S = (B) => fa(l.value ? {
      val: a.value,
      max: b.value - 1,
      min: 0
    } : {
      val: o.activeSlide,
      max: o.maxSlide,
      min: o.minSlide
    }) === B;
    return () => {
      var B, d;
      const I = [];
      for (let m = l.value ? 0 : o.minSlide; m <= (l.value ? b.value - 1 : o.maxSlide); m++) {
        const s = va(o.config.i18n[l.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: m + 1
        }), g = S(m), V = Y("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": g
          },
          "aria-label": s,
          "aria-pressed": g,
          "aria-controls": (d = (B = o.slides[m]) === null || B === void 0 ? void 0 : B.exposed) === null || d === void 0 ? void 0 : d.id,
          title: s,
          disabled: t.disableOnClick,
          onClick: () => o.nav.slideTo(l.value ? Math.floor(m * +o.config.itemsToShow + n.value) : m)
        }), E = Y("li", { class: "carousel__pagination-item", key: m }, V);
        I.push(E);
      }
      return Y("ol", { class: "carousel__pagination" }, I);
    };
  }
}), la = pe({
  name: "CarouselSlide",
  props: {
    id: {
      type: String,
      default: (t) => t.isClone ? void 0 : Ia()
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
  setup(t, { attrs: o, slots: i, expose: n }) {
    const l = kt(Xe);
    if (na(Xe, void 0), !l)
      return () => "";
    const a = A(t.index), b = (V) => {
      a.value = V;
    }, S = Ba(), B = () => {
      const V = S.vnode.el;
      return V ? V.getBoundingClientRect() : { width: 0, height: 0 };
    };
    n({
      id: t.id,
      setIndex: b,
      getBoundingRect: B
    });
    const d = u(() => a.value === l.activeSlide), I = u(() => a.value === l.activeSlide - 1), m = u(() => a.value === l.activeSlide + 1), s = u(() => a.value >= l.visibleRange.min && a.value <= l.visibleRange.max), g = u(() => {
      if (l.config.itemsToShow === "auto")
        return;
      const V = l.config.itemsToShow, E = l.config.gap > 0 && V > 1 ? `calc(${100 / V}% - ${l.config.gap * (V - 1) / V}px)` : `${100 / V}%`;
      return l.isVertical ? { height: E } : { width: E };
    });
    return l.slideRegistry.registerSlide(S, t.index), Ta(() => {
      l.slideRegistry.unregisterSlide(S);
    }), t.isClone && (Xt(() => {
      Zt(S.vnode);
    }), Aa(() => {
      Zt(S.vnode);
    })), () => {
      var V, E;
      return l.config.enabled ? Y("li", {
        style: [o.style, Object.assign({}, g.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": t.isClone,
          "carousel__slide--visible": s.value,
          "carousel__slide--active": d.value,
          "carousel__slide--prev": I.value,
          "carousel__slide--next": m.value,
          "carousel__slide--sliding": l.isSliding
        },
        onFocusin: () => {
          l.viewport && (l.viewport.scrollLeft = 0), l.nav.slideTo(a.value);
        },
        id: t.isClone ? void 0 : t.id,
        "aria-hidden": t.isClone || void 0
      }, (E = i.default) === null || E === void 0 ? void 0 : E.call(i, {
        currentIndex: a.value,
        isActive: d.value,
        isClone: t.isClone,
        isPrev: I.value,
        isNext: m.value,
        isSliding: l.isSliding,
        isVisible: s.value
      })) : (V = i.default) === null || V === void 0 ? void 0 : V.call(i);
    };
  }
}), nl = (t, o, i, n) => {
  if (!i) return 0;
  let l = String(t[i.key]).toLowerCase(), a = String(o[i.key]).toLowerCase();
  if (n === Ge.Asc) {
    if (l > a) return 1;
    if (a > l) return -1;
  } else {
    if (l > a) return -1;
    if (a > l) return 1;
  }
  return 0;
}, bt = (t, o, i, n = []) => {
  if (t.extractTitleFromColumn) {
    let l = n.find((a) => a.key === t.extractTitleFromColumn);
    if (l)
      return bt(l, o, i, n);
  }
  if (t.formatter && typeof t.formatter == "function") {
    let l = t.formatter(o[t.key], o, t, i);
    return l.startsWith("__:") ? Na(l.substring(3)) : l;
  }
  return o[t.key];
}, ol = (t, o, i) => {
  if (!t.colspan) return -1;
  let n = o;
  return i.forEach((l) => {
    let a = xt(t, l);
    a > 0 && a < n && (n = a);
  }), n;
}, xt = (t, o) => t.colspan === !1 ? !1 : typeof t.colspan == "function" ? t.colspan(o) : t.colspan, pa = (t, o) => typeof t.preferSlot > "u" ? !0 : t.preferSlot === !1 ? !1 : typeof t.preferSlot == "function" ? t.preferSlot(o) : !0, il = (t, o, i) => {
  if (typeof t != "object" || !t.key || o.indexOf(t.key) > -1) return !1;
  let n = xt(t, i);
  return typeof t.colspan > "u" ? !0 : (typeof t.colspan < "u" && (typeof t.colspan == "function" ? n = parseInt(t.colspan(i)) : n = parseInt(t.colspan)), n > 0);
}, rl = (t = []) => {
  if (t.length > 0) {
    for (let o = 0; o < t.length; ++o)
      if (t[o].sortable) return t[o].key;
  }
  return "";
}, ul = (t, o) => {
  if (t.length > 0) {
    for (let i = 0; i < t.length; ++i)
      if (t[i].key === o) return t[i];
  }
  return null;
}, ma = (t) => {
  let o = [];
  return t.class && o.push(t.class), t.type && o.push(`is-${t.type}`), o.join(" ");
}, Gt = /* @__PURE__ */ pe({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new ia() },
    columns: { default: () => [] },
    i: { default: 0 },
    editModeEnabled: { type: Boolean, default: !1 },
    hasInlineEditPerm: { type: Boolean, default: !1 },
    tableType: {}
  },
  emits: [
    "update:modelValue"
  ],
  setup(t, { emit: o }) {
    const i = o, n = t, l = A(n.modelValue), a = A(l.value[n.column.key]), b = A(null);
    P(a, (m) => {
      const s = JSON.parse(JSON.stringify(l.value));
      s[n.column.key] = m, i("update:modelValue", s);
    }), P(() => n.modelValue, (m) => {
      l.value = m, a.value = l.value[n.column.key];
    });
    const S = u(() => ({ ...n.column.slotData, item: l.value })), B = u(() => {
      var m, s, g, V;
      if ((m = n.column.field) != null && m.modalData && typeof ((s = n.column.field) == null ? void 0 : s.modalData) == "object")
        for (let E in n.column.field.modalData)
          if (typeof ((g = n.column.field) == null ? void 0 : g.modalData[E]) == "string" && n.column.field.modalData[E].startsWith("prop:")) {
            let J = n.column.field.modalData[E].substring(5);
            l.value[J];
          } else
            n.column.field.modalData[E];
      return (V = n.column.field) == null ? void 0 : V.modalData;
    }), d = u(() => typeof n.column.field == "string" && n.column.field.startsWith("prop:") ? Ra(n.column.field, l.value) : n.column.field), I = u(() => {
      var m, s, g, V;
      return n.column.type === yt.Field ? !((s = (m = n.column) == null ? void 0 : m.field) != null && s.label) && (n.column.ensureFieldLabel || [
        Jt.Switch,
        Jt.Check
      ].includes((g = n.column.field) == null ? void 0 : g.type)) ? n.column.label : (V = n.column.field) == null ? void 0 : V.label : "";
    });
    return (m, s) => {
      const g = Ce("lkt-anchor"), V = Ce("lkt-button"), E = Ce("lkt-field");
      return m.column.type === h(yt).Anchor ? (c(), M(g, x({ key: 0 }, m.column.anchor, { prop: l.value }), {
        default: F(() => [
          tt(at(h(bt)(m.column, l.value, m.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : m.column.type === h(yt).Button ? (c(), M(V, x({ key: 1 }, m.column.button, { prop: l.value }), {
        default: F(() => [
          tt(at(h(bt)(m.column, l.value, m.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : m.column.type === h(yt).Field && m.hasInlineEditPerm ? (c(), M(E, x({ key: 2 }, d.value, {
        "read-mode": !m.column.editable || !m.editModeEnabled,
        ref: (J) => b.value = J,
        "slot-data": S.value,
        label: I.value,
        "modal-data": B.value,
        prop: l.value,
        modelValue: a.value,
        "onUpdate:modelValue": s[0] || (s[0] = (J) => a.value = J)
      }), null, 16, ["read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : m.column.type === h(yt).Field ? (c(), M(E, x({ key: 3 }, d.value, {
        "read-mode": "",
        ref: (J) => b.value = J,
        "slot-data": S.value,
        label: I.value,
        "modal-data": B.value,
        prop: l.value,
        "model-value": a.value
      }), null, 16, ["slot-data", "label", "modal-data", "prop", "model-value"])) : (c(), D(G, { key: 4 }, [
        tt(at(h(bt)(m.column, l.value, m.i, m.columns)), 1)
      ], 64));
    };
  }
}), ht = class ht {
};
ht.navButtonSlot = "", ht.createButtonSlot = "", ht.defaultEmptySlot = void 0;
let fe = ht;
const sl = ["data-i", "data-draggable"], dl = ["data-role", "data-i"], cl = {
  key: 1,
  class: "lkt-table-nav-cell"
}, vl = { class: "lkt-table-nav-container" }, fl = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, pl = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, ml = ["colspan"], gl = ["colspan"], yl = ["data-column", "colspan", "title"], bl = /* @__PURE__ */ pe({
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
    rowDisplayType: { type: [Number, Function], default: Se.Auto },
    renderDrag: { type: [Boolean, Function], default: !0 },
    disabledDrag: { type: [Boolean, Function], default: !0 },
    itemContainerClass: { type: [String, Function], default: "" }
  },
  emits: [
    "update:modelValue",
    "click",
    "item-up",
    "item-down",
    "item-drop"
  ],
  setup(t, { emit: o }) {
    const i = oa(), n = o, l = t, a = A(l.modelValue);
    let b = typeof l.rowDisplayType == "function" ? l.rowDisplayType(a.value, l.i) : l.rowDisplayType;
    b || (b = Se.Auto);
    const S = [Se.Auto, Se.PreferCustomItem].includes(b), B = [Se.Auto, Se.PreferItem].includes(b), d = (v) => n("click", v), I = u(() => {
      let v = [], w = !1;
      return typeof l.disabledDrag == "function" ? w = l.disabledDrag(a.value) : w = ie.value === !0, !w && l.sortable && l.isDraggable ? v.push("handle") : w && v.push("disabled"), v.join(" ");
    }), m = u(() => fe.navButtonSlot !== ""), s = u(() => fe.navButtonSlot), g = () => {
      n("item-up", l.i);
    }, V = () => {
      n("item-down", l.i);
    }, E = () => {
      n("item-drop", l.i);
    };
    P(() => l.modelValue, (v) => a.value = v), P(a, (v) => {
      n("update:modelValue", v);
    }, { deep: !0 });
    const J = u(() => typeof l.renderDrag == "function" ? l.renderDrag(a.value) : l.renderDrag === !0), ie = u(() => typeof l.disabledDrag == "function" ? l.disabledDrag(a.value) : l.disabledDrag === !0), re = u(() => I.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), Q = u(() => {
      let v = [];
      return S && v.push("type-custom-item"), B && v.push("type-item"), typeof l.itemContainerClass == "function" ? v.push(l.itemContainerClass(a.value, l.i)) : l.itemContainerClass !== "" && v.push(l.itemContainerClass), v.join(" ");
    });
    return (v, w) => {
      const ue = Ce("lkt-button");
      return c(), D("tr", {
        "data-i": v.i,
        "data-draggable": v.isDraggable,
        class: W(Q.value)
      }, [
        v.sortable && v.editModeEnabled && J.value ? (c(), D("td", {
          key: 0,
          "data-role": re.value,
          class: W(I.value),
          "data-i": v.i
        }, w[2] || (w[2] = [
          ve("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]), 10, dl)) : L("", !0),
        v.addNavigation && v.editModeEnabled ? (c(), D("td", cl, [
          ve("div", vl, [
            he(ue, {
              palette: "table-nav",
              disabled: v.i === 0,
              onClick: g
            }, {
              default: F(() => [
                m.value ? (c(), M(ke(s.value), {
                  key: 0,
                  direction: "up"
                })) : (c(), D("i", fl))
              ]),
              _: 1
            }, 8, ["disabled"]),
            he(ue, {
              palette: "table-nav",
              disabled: v.latestRow,
              onClick: V
            }, {
              default: F(() => [
                m.value ? (c(), M(ke(s.value), {
                  key: 0,
                  direction: "down"
                })) : (c(), D("i", pl))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : L("", !0),
        h(S) && h(i)[`item-${v.i}`] ? (c(), D("td", {
          key: "td" + v.i,
          colspan: v.visibleColumns.length
        }, [
          O(v.$slots, `item-${v.i}`, {
            item: a.value,
            index: v.i,
            editing: v.editModeEnabled,
            canCreate: v.canCreate,
            canRead: v.canRead,
            canUpdate: v.canEdit,
            canDrop: v.canDrop,
            isLoading: v.isLoading,
            doDrop: () => E()
          })
        ], 8, ml)) : h(B) && h(i).item ? (c(), D("td", {
          key: "td" + v.i,
          colspan: v.visibleColumns.length
        }, [
          O(v.$slots, "item", {
            item: a.value,
            index: v.i,
            editing: v.editModeEnabled,
            canCreate: v.canCreate,
            canRead: v.canRead,
            canUpdate: v.canEdit,
            canDrop: v.canDrop,
            isLoading: v.isLoading,
            doDrop: () => E()
          })
        ], 8, gl)) : (c(!0), D(G, { key: 4 }, be(v.visibleColumns, (U) => (c(), D(G, null, [
          h(il)(U, v.emptyColumns, a.value) ? (c(), D("td", {
            key: "td" + v.i,
            "data-column": U.key,
            colspan: h(xt)(U, a.value),
            title: h(bt)(U, a.value, v.i, v.visibleColumns),
            class: W(h(ma)(U)),
            onClick: w[1] || (w[1] = (le) => d(le))
          }, [
            v.$slots[U.key] && h(pa)(U, a.value) ? O(v.$slots, U.key, {
              key: 0,
              value: a.value[U.key],
              item: a.value,
              column: U,
              i: v.i
            }) : a.value ? (c(), M(Gt, {
              key: 1,
              modelValue: a.value,
              "onUpdate:modelValue": w[0] || (w[0] = (le) => a.value = le),
              column: U,
              columns: v.visibleColumns,
              "edit-mode-enabled": v.editModeEnabled,
              "has-inline-edit-perm": v.hasInlineEditPerm,
              i: v.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : L("", !0)
          ], 10, yl)) : L("", !0)
        ], 64))), 256))
      ], 10, sl);
    };
  }
}), jt = /* @__PURE__ */ pe({
  __name: "CreateButton",
  props: {
    config: { default: void 0 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: [
    "click",
    "append"
  ],
  setup(t, { emit: o }) {
    var d;
    const i = o, n = t, l = u(() => fe.createButtonSlot !== ""), a = u(() => fe.createButtonSlot), b = {
      ...(d = n.config) == null ? void 0 : d.modalData,
      beforeClose: (I) => {
        "itemCreated" in I && I.itemCreated === !0 && i("append", I.item);
      }
    }, S = {
      ...n.config
    };
    S.modalData = b;
    const B = () => {
      var I;
      if (!((I = n.config) != null && I.modal)) {
        i("click");
        return;
      }
    };
    return (I, m) => {
      const s = Ce("lkt-button");
      return c(), M(s, x(S, {
        disabled: I.disabled,
        onClick: B
      }), {
        default: F(() => [
          l.value ? (c(), M(ke(a.value), { key: 0 })) : L("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), hl = ["data-column", "data-sortable", "data-sort", "colspan", "title"], kl = /* @__PURE__ */ pe({
  __name: "TableHeader",
  props: {
    column: { default: () => new ia() },
    sortBy: { default: "" },
    sortDirection: { default: "" },
    amountOfColumns: { default: 0 },
    items: { default: () => [] }
  },
  emits: [
    "click"
  ],
  setup(t, { emit: o }) {
    const i = o, n = t, l = u(() => ol(n.column, n.amountOfColumns, n.items)), a = u(() => n.column.sortable === !0), b = u(() => a.value && n.sortBy === n.column.key ? n.sortDirection : ""), S = u(() => ra(n.column.label)), B = u(() => a.value && n.sortBy === n.column.key ? n.sortDirection === Ge.Asc ? Ae.defaultTableSortAscIcon : n.sortDirection === Ge.Desc ? Ae.defaultTableSortDescIcon : "" : ""), d = () => i("click", n.column);
    return (I, m) => (c(), D("th", {
      "data-column": I.column.key,
      "data-sortable": a.value,
      "data-sort": b.value,
      colspan: l.value,
      title: S.value,
      class: W(h(ma)(I.column)),
      onClick: d
    }, [
      ve("div", null, [
        tt(at(S.value) + " ", 1),
        B.value ? (c(), D("i", {
          key: 0,
          class: W(B.value)
        }, null, 2)) : L("", !0)
      ])
    ], 10, hl));
  }
}), Sl = ["id"], Cl = { class: "lkt-table-page-buttons" }, wl = { class: "switch-edition-mode" }, Dl = { class: "switch-edition-mode" }, Il = {
  key: 0,
  class: "lkt-table-page-buttons"
}, Bl = {
  key: 1,
  class: "lkt-table-page-filters"
}, Tl = { class: "lkt-table" }, Al = { key: 0 }, El = { key: 0 }, Vl = {
  key: 0,
  "data-role": "drag-indicator"
}, Ll = { key: 1 }, Nl = ["id"], Rl = ["id"], Ml = ["data-i"], Ol = ["id"], $l = ["data-i"], _l = ["id"], Fl = { class: "lkt-carousel-slide" }, Pl = { class: "lkt-carousel-slide" }, Ul = {
  key: 2,
  class: "lkt-table-empty"
}, jl = {
  key: 4,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, zl = /* @__PURE__ */ pe({
  __name: "LktTable",
  props: /* @__PURE__ */ Va({
    modelValue: {},
    type: {},
    columns: {},
    noResultsText: {},
    hideEmptyColumns: { type: Boolean },
    hideTableHeader: { type: Boolean },
    itemDisplayChecker: { type: Function },
    customItemSlotName: { type: Function },
    rowDisplayType: { type: [Number, Function] },
    slotItemVar: {},
    itemSlotComponent: { type: [String, Function, Object] },
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
    accordion: {},
    header: {},
    title: {},
    titleTag: {},
    titleIcon: {},
    headerClass: {},
    editModeButton: {},
    saveButton: {},
    createButton: {},
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
    skipTableItemsContainer: { type: Boolean },
    createEnabledValidator: { type: Function }
  }, Ma(Oa)),
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
  setup(t, { expose: o, emit: i }) {
    var Yt, Kt;
    const n = i, l = oa(), a = t, b = A(typeof a.sorter == "function" ? a.sorter : nl), S = A(rl(a.columns)), B = A(Ge.Asc), d = A(a.modelValue), I = A(null), m = A(a.columns), s = A((Yt = a.paginator) == null ? void 0 : Yt.modelValue), g = A(a.loading), V = A(!1), E = A(a.perms), J = A(null), ie = A(null), re = A(null), Q = A({}), v = A(new Fa({ items: d.value }, a.dataStateConfig)), w = A(a.editMode), ue = A(0), U = A(null), le = A(((Kt = a.carousel) == null ? void 0 : Kt.currentSlide) || 0), _ = A(He(a.saveButton, Ae.defaultSaveButton)), ne = A(He(a.createButton, Ae.defaultCreateButton)), H = A(He(a.editModeButton, Ae.defaultEditModeButton)), Oe = A(He(a.groupButton, Ae.defaultGroupButton));
    P(() => a.saveButton, (e) => _.value = He(a.saveButton, Ae.defaultSaveButton)), P(() => a.createButton, (e) => ne.value = He(a.createButton, Ae.defaultCreateButton)), P(() => a.editModeButton, (e) => H.value = He(a.editModeButton, Ae.defaultEditModeButton));
    const Ee = A(!1);
    P(g, (e) => n("update:loading", e)), P(s, (e) => n("page", e));
    const xe = (e) => {
      E.value = e;
    }, Z = (e) => {
      var p;
      Array.isArray(e.data) && ((!a.paginator || ![Et.LoadMore, Et.Infinite].includes((p = a.paginator) == null ? void 0 : p.type)) && d.value.splice(0, d.value.length), d.value = [...d.value, ...e.data]), g.value = !1, V.value = !0, v.value.store({ items: d.value }).turnStoredIntoOriginal(), Ee.value = !1, At(() => {
        oe(), ge.value, n("read-response", e);
      });
    }, Nt = () => At(() => g.value = !0), $e = () => {
      J.value.doRefresh();
    }, we = $a(12), se = u(() => {
      if (!a.hideEmptyColumns) return [];
      let e = [];
      return m.value.forEach((p) => {
        let $ = p.key, j = !1;
        d.value.forEach((ae) => {
          if (typeof ae.checkEmpty == "function")
            return ae.checkEmpty(ae);
          ae[$] && (j = !0);
        }), j || e.push($);
      }), e;
    }), me = u(() => m.value.filter((e) => !e.hidden)), lt = u(() => m.value.filter((e) => e.isForRowKey)), Ve = u(() => m.value.map((e) => e.key)), St = u(() => {
      let e = [];
      for (let p in l) Ve.value.indexOf(p) !== -1 && e.push(p);
      return e;
    }), Ct = u(() => {
      let e = [];
      for (let p in l) p.indexOf("slide-") !== -1 && e.push(p);
      return e;
    }), Le = u(() => {
      var e;
      return a.hiddenSave || g.value || !((e = _.value) != null && e.resource || _.value.type) ? !1 : w.value && Ee.value ? !0 : w.value;
    }), De = u(() => pt.value && d.value.length >= a.requiredItemsForTopCreate || Ie.value ? !0 : Le.value || w.value && ye.value), ge = u(() => {
      var e, p;
      return ue.value, typeof ((e = _.value) == null ? void 0 : e.disabled) == "function" ? _.value.disabled({
        value: d.value,
        dataState: v.value
      }) : typeof ((p = _.value) == null ? void 0 : p.disabled) == "boolean" ? _.value.disabled : !Ee.value;
    }), de = u(() => d.value.length), _e = u(() => {
      var e;
      return {
        items: d.value,
        ...(e = _.value) == null ? void 0 : e.resourceData
      };
    }), nt = u(() => a.titleTag === "" ? "h2" : a.titleTag), Rt = u(() => a.wrapContentTag === "" ? "div" : a.wrapContentTag), ot = u(() => ra(a.title)), it = u(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }), ye = u(() => E.value.includes(Be.Create)), Ne = u(() => E.value.includes("read")), ee = u(() => E.value.includes(Be.Update)), rt = u(() => E.value.includes(Be.Edit)), Ye = u(() => E.value.includes(Be.InlineEdit)), wt = u(() => E.value.includes(Be.ModalCreate)), ut = u(() => E.value.includes(Be.InlineCreate)), Ke = u(() => E.value.includes(Be.InlineCreateEver)), q = u(() => E.value.includes(Be.Drop)), Re = u(() => E.value.includes(Be.SwitchEditMode)), Ie = u(() => !Re.value || !ee.value && !q.value || !ee.value && q.value ? !1 : !g.value), We = u(() => {
      var e;
      return (typeof ((e = a.paginator) == null ? void 0 : e.type) < "u" && [Et.LoadMore, Et.Infinite].includes(a.paginator.type) || !g.value) && d.value.length > 0;
    }), Fe = u(() => m.value.find((e) => e.isForAccordionHeader)), st = (e, p) => typeof a.customItemSlotName == "function" ? a.customItemSlotName(e, p) : "", Pe = (e) => {
      let p = e.target;
      if (typeof p.dataset.column > "u")
        do
          p = p.parentNode;
        while (typeof p.dataset.column > "u" && p.tagName !== "TABLE" && p.tagName !== "body");
      if (p.tagName === "TD" && (p = p.parentNode, p = p.dataset.i, typeof p < "u"))
        return d.value[p];
    }, oe = () => {
      ue.value = Ua();
    }, dt = (e) => d.value[e], Je = (e) => {
      var p;
      return (p = I.value) == null ? void 0 : p.querySelector(`[data-i="${e}"]`);
    }, Dt = (e) => {
      e && e.sortable && (d.value = d.value.sort((p, $) => b.value(p, $, e, B.value)), B.value = B.value === Ge.Asc ? Ge.Desc : Ge.Asc, S.value = e.key, oe(), n("sort", [S.value, B.value]));
    }, Mt = (e) => {
      n("click", e);
    }, Ot = (e) => {
      var $, j, ae, ce, Tt, gt, k, f;
      let p = parseInt((ce = (ae = (j = ($ = e == null ? void 0 : e.originalEvent) == null ? void 0 : $.toElement) == null ? void 0 : j.closest("tr")) == null ? void 0 : ae.dataset) == null ? void 0 : ce.i);
      return !(typeof ((Tt = a.drag) == null ? void 0 : Tt.isValid) == "function" && !((gt = a.drag) != null && gt.isValid(d.value[p])) || typeof ((k = a.drag) == null ? void 0 : k.isValid) == "boolean" && !((f = a.drag) != null && f.isValid));
    }, It = (e) => {
      var p, $;
      return typeof ((p = a.drag) == null ? void 0 : p.isDraggable) == "function" ? ($ = a.drag) == null ? void 0 : $.isDraggable(e) : !0;
    }, ct = () => {
      if (ye.value) {
        n("click-create");
        return;
      }
      if (ut.value || Ke.value) {
        if (typeof a.newValueGenerator == "function") {
          let e = a.newValueGenerator();
          if (typeof e == "object" || a.type !== qe.Table) {
            d.value.push(e);
            return;
          }
        }
        d.value.push({});
      } else
        n("click-create");
    }, Ue = (e) => {
      d.value.push(e);
    }, r = () => g.value = !0, y = () => g.value = !1, C = (e, p) => {
      var $, j, ae;
      if (!(($ = _.value) != null && $.type && [
        Pt.Split,
        Pt.SplitEver,
        Pt.SplitLazy
      ].includes((j = _.value) == null ? void 0 : j.type))) {
        if (n("before-save"), (ae = _.value) != null && ae.resource && (g.value = !1, !p.success)) {
          n("error", p.httpStatus);
          return;
        }
        v.value.turnStoredIntoOriginal(), Ee.value = !1, n("save", p);
      }
    }, T = (e, p, $) => {
      if ($ >= e.length) {
        let j = $ - e.length + 1;
        for (; j--; ) e.push(void 0);
      }
      return e.splice($, 0, e.splice(p, 1)[0]), e;
    }, R = (e) => {
      T(d.value, e, e - 1), oe();
    }, K = (e) => {
      T(d.value, e, e + 1), oe();
    }, X = (e) => {
      d.value.splice(e, 1), oe();
    }, te = () => {
      var e;
      Q.value && typeof ((e = Q.value) == null ? void 0 : e.destroy) == "function" && (Q.value.destroy(), Q.value = {});
    }, vt = () => {
      U.value || (U.value = document.getElementById("lkt-table-body-" + we)), Q.value = new Pa(U.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let p = e.oldIndex, $ = e.newIndex;
          d.value.splice($, 0, d.value.splice(p, 1)[0]), oe(), n("drag-end", d.value[$]);
        },
        onMove: function(e, p) {
          return Ot(e);
        }
      });
    }, Qe = (e, p, $ = !1) => {
      let j = [ue.value, we, "row", p];
      return $ && j.push("hidden"), lt.value.forEach((ae) => {
        let ce = String(e[ae.key]).toLowerCase();
        ce.length > 50 && (ce = ce.substring(0, 50)), ce = _a(ce, " ", "-"), j.push(ce);
      }), j.join("-");
    }, ft = u(() => typeof a.createEnabledValidator == "function" ? a.createEnabledValidator({ items: d.value }) : !0), pt = u(() => a.createButton === !1 ? !1 : Ke.value || ye.value && w.value || ut.value && w.value || wt.value && w.value), ga = u(() => [qe.Ol, qe.Ul].includes(a.type)), mt = (e, p) => typeof a.itemDisplayChecker == "function" ? a.itemDisplayChecker(e, p) : !0, Bt = (e, p) => typeof a.itemContainerClass == "function" ? a.itemContainerClass(e, p) : a.itemContainerClass, ya = (e, p) => Fe.value ? e[Fe.value.key] : "", Ze = u(() => typeof a.itemSlotComponent == "function" ? a.itemSlotComponent() : a.itemSlotComponent), $t = u(() => typeof a.itemSlotData == "function" ? a.itemSlotData() : a.itemSlotData);
    Xt(() => {
      var e;
      a.initialSorting && Dt(ul(a.columns, S.value)), v.value.store({ items: d.value }).turnStoredIntoOriginal(), Ee.value = !1, (e = a.drag) != null && e.enabled && At(() => {
        vt();
      });
    }), P(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }, (e) => {
      e ? vt() : te();
    }), P(() => a.type, (e) => {
      var p;
      (p = a.drag) != null && p.enabled ? vt() : te();
    }), P(() => a.perms, (e) => E.value = e), P(E, (e) => n("update:perms", e)), P(w, (e) => {
      n("update:editMode", e);
    }), P(() => a.editMode, (e) => w.value = e), P(() => a.columns, (e) => m.value = e, { deep: !0 }), P(() => a.modelValue, (e) => {
      d.value = e;
    }, { deep: !0 }), P(d, (e) => {
      v.value.increment({ items: e }), Ee.value = v.value.changed(), n("update:modelValue", e);
    }, { deep: !0 }), o({
      getItemByEvent: Pe,
      getItemByIndex: dt,
      getRowByIndex: Je,
      doRefresh: $e,
      doRemoveIndex: (e) => {
        d.value.splice(e, 1), oe();
      },
      getHtml: () => ie.value,
      reRender: oe,
      turnStoredIntoOriginal: () => {
        v.value.turnStoredIntoOriginal(), At(() => {
          oe();
        });
      }
    });
    const ba = u(() => typeof fe.defaultEmptySlot < "u"), ha = u(() => fe.defaultEmptySlot), ka = u(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled ? !1 : typeof a.drag.canRender > "u" ? !0 : a.drag.canRender), Sa = u(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled || typeof a.drag.isDisabled > "u" ? !1 : a.drag.isDisabled), Ca = u(() => typeof a.header == "object" && Object.keys(a.header).length > 0);
    return (e, p) => {
      const $ = Ce("lkt-header"), j = Ce("lkt-button"), ae = Ce("lkt-accordion"), ce = Ce("lkt-loader"), Tt = Ce("lkt-paginator");
      return c(), D("section", {
        ref_key: "element",
        ref: ie,
        class: "lkt-table-page",
        id: "lkt-table-page-" + h(we)
      }, [
        Ca.value ? (c(), M($, Me(x({ key: 0 }, e.header)), null, 16)) : ot.value || h(l).title ? (c(), D("header", {
          key: 1,
          class: W(e.headerClass)
        }, [
          ot.value ? (c(), M(ke(nt.value), { key: 0 }, {
            default: F(() => [
              e.titleIcon ? (c(), D("i", {
                key: 0,
                class: W(e.titleIcon)
              }, null, 2)) : L("", !0),
              tt(" " + at(ot.value), 1)
            ]),
            _: 1
          })) : L("", !0),
          h(l).title ? O(e.$slots, "title", { key: 1 }) : L("", !0)
        ], 2)) : L("", !0),
        (c(), M(ke(Rt.value), {
          class: W(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: F(() => {
            var gt;
            return [
              je(ve("div", Cl, [
                e.groupButton !== !1 ? (c(), M(j, x({
                  key: 0,
                  ref: "groupButton"
                }, Oe.value, { class: "lkt-item-crud-group-button" }), {
                  split: F(() => [
                    ve("div", wl, [
                      je(he(j, x(H.value, {
                        checked: w.value,
                        "onUpdate:checked": p[0] || (p[0] = (k) => w.value = k)
                      }), null, 16, ["checked"]), [
                        [ze, Ie.value]
                      ])
                    ]),
                    h(l)["prev-buttons-ever"] ? O(e.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: ee.value,
                      canDrop: q.value,
                      perms: e.perms
                    }) : L("", !0),
                    h(l)["prev-buttons"] ? O(e.$slots, "prev-buttons", {
                      key: 1,
                      canUpdate: ee.value,
                      canDrop: q.value,
                      perms: e.perms
                    }) : L("", !0),
                    je(he(j, x({
                      class: "lkt-table--save-button",
                      ref_key: "saveButtonRef",
                      ref: re
                    }, {
                      ..._.value,
                      disabled: ge.value,
                      resourceData: _e.value
                    }, {
                      onLoading: r,
                      onLoaded: y,
                      onClick: C
                    }), {
                      split: F(({ doClose: k, doRootClick: f }) => [
                        O(e.$slots, "button-save-split", {
                          doClose: k,
                          doRootClick: f,
                          dataState: v.value,
                          onButtonLoading: r,
                          onButtonLoaded: y
                        })
                      ]),
                      default: F(() => [
                        h(l)["button-save"] ? O(e.$slots, "button-save", {
                          key: 0,
                          items: d.value,
                          editMode: e.editMode,
                          canUpdate: !ge.value
                        }) : L("", !0)
                      ]),
                      _: 3
                    }, 16), [
                      [ze, Le.value]
                    ]),
                    pt.value && d.value.length >= e.requiredItemsForTopCreate ? (c(), M(jt, {
                      key: 2,
                      config: ne.value,
                      disabled: !ft.value,
                      onClick: ct,
                      onAppend: Ue
                    }, null, 8, ["config", "disabled"])) : L("", !0)
                  ]),
                  _: 3
                }, 16)) : L("", !0),
                h(l)["prev-buttons-ever"] ? O(e.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: ee.value,
                  canDrop: q.value,
                  perms: e.perms
                }) : L("", !0),
                h(l)["prev-buttons"] ? O(e.$slots, "prev-buttons", {
                  key: 2,
                  canUpdate: ee.value,
                  canDrop: q.value,
                  perms: e.perms
                }) : L("", !0),
                je(he(j, x({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: re
                }, {
                  ..._.value,
                  disabled: ge.value,
                  resourceData: _e.value
                }, {
                  onLoading: r,
                  onLoaded: y,
                  onClick: C
                }), {
                  split: F(({ doClose: k, doRootClick: f }) => [
                    O(e.$slots, "button-save-split", {
                      doClose: k,
                      doRootClick: f,
                      dataState: v.value,
                      onButtonLoading: r,
                      onButtonLoaded: y
                    })
                  ]),
                  default: F(() => [
                    h(l)["button-save"] ? O(e.$slots, "button-save", {
                      key: 0,
                      items: d.value,
                      editMode: e.editMode,
                      canUpdate: !ge.value
                    }) : L("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [ze, Le.value]
                ]),
                pt.value && d.value.length >= e.requiredItemsForTopCreate ? (c(), M(jt, {
                  key: 3,
                  config: ne.value,
                  disabled: !ft.value,
                  onClick: ct,
                  onAppend: Ue
                }, null, 8, ["config", "disabled"])) : L("", !0),
                ve("div", Dl, [
                  je(he(j, x(H.value, {
                    checked: w.value,
                    "onUpdate:checked": p[1] || (p[1] = (k) => w.value = k)
                  }), null, 16, ["checked"]), [
                    [ze, Ie.value]
                  ])
                ])
              ], 512), [
                [ze, De.value]
              ]),
              h(l).buttons ? (c(), D("div", Il, [
                O(e.$slots, "buttons")
              ])) : L("", !0),
              V.value && h(l).filters ? (c(), D("div", Bl, [
                O(e.$slots, "filters", {
                  items: d.value,
                  isLoading: g.value
                })
              ])) : L("", !0),
              je(ve("div", Tl, [
                e.type === h(qe).Table ? (c(), D("table", Al, [
                  e.hideTableHeader ? L("", !0) : (c(), D("thead", El, [
                    ve("tr", null, [
                      it.value && w.value ? (c(), D("th", Vl)) : L("", !0),
                      e.addNavigation && w.value ? (c(), D("th", Ll)) : L("", !0),
                      (c(!0), D(G, null, be(me.value, (k) => (c(), D(G, null, [
                        se.value.indexOf(k.key) === -1 ? (c(), M(kl, {
                          key: 0,
                          column: k,
                          "sort-by": S.value,
                          "sort-direction": B.value,
                          "amount-of-columns": e.columns.length,
                          items: d.value,
                          onClick: (f) => Dt(k)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : L("", !0)
                      ], 64))), 256))
                    ])
                  ])),
                  ve("tbody", {
                    ref_key: "tableBody",
                    ref: I,
                    id: "lkt-table-body-" + h(we),
                    class: W(e.itemsContainerClass)
                  }, [
                    (c(!0), D(G, null, be(d.value, (k, f) => je((c(), M(bl, {
                      modelValue: d.value[f],
                      "onUpdate:modelValue": (N) => d.value[f] = N,
                      key: Qe(k, f),
                      i: f,
                      "is-draggable": It(k),
                      sortable: it.value,
                      "visible-columns": me.value,
                      "empty-columns": se.value,
                      "add-navigation": e.addNavigation,
                      "latest-row": f + 1 === de.value,
                      "can-drop": q.value && w.value,
                      "can-edit": rt.value && ee.value && w.value,
                      "can-read": Ne.value,
                      "can-create": ye.value,
                      "edit-mode-enabled": w.value,
                      "has-inline-edit-perm": Ye.value,
                      "row-display-type": e.rowDisplayType,
                      "render-drag": ka.value,
                      "disabled-drag": Sa.value,
                      "is-loading": g.value,
                      "item-container-class": e.itemContainerClass,
                      onClick: Mt,
                      onItemUp: R,
                      onItemDown: K,
                      onItemDrop: X
                    }, La({ _: 2 }, [
                      h(l)[`item-${f}`] ? {
                        name: `item-${f}`,
                        fn: F((N) => [
                          O(e.$slots, `item-${f}`, Me({
                            [e.slotItemVar || ""]: N.item,
                            index: f,
                            editing: N.editing,
                            canCreate: N.canCreate,
                            canRead: N.canRead,
                            canUpdate: N.canUpdate,
                            canDrop: N.canDrop,
                            isLoading: N.isLoading,
                            doDrop: N.doDrop
                          }))
                        ]),
                        key: "0"
                      } : h(l).item ? {
                        name: "item",
                        fn: F((N) => [
                          O(e.$slots, "item", Me({
                            [e.slotItemVar || ""]: N.item,
                            index: f,
                            editing: N.editing,
                            canCreate: N.canCreate,
                            canRead: N.canRead,
                            canUpdate: N.canUpdate,
                            canDrop: N.canDrop,
                            isLoading: N.isLoading,
                            doDrop: N.doDrop
                          }))
                        ]),
                        key: "1"
                      } : void 0,
                      be(St.value, (N) => ({
                        name: N,
                        fn: F((et) => [
                          O(e.$slots, N, Me({
                            [e.slotItemVar || ""]: et.item,
                            value: et.value,
                            column: et.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class"])), [
                      [ze, mt(d.value[f], f)]
                    ])), 128))
                  ], 10, Nl)
                ])) : e.type === h(qe).Item ? (c(), D("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: I,
                  id: "lkt-table-body-" + h(we),
                  class: W(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (c(!0), D(G, null, be(d.value, (k, f) => (c(), D(G, {
                    key: Qe(k, f)
                  }, [
                    !e.skipTableItemsContainer && mt(k, f) ? (c(), D("div", {
                      key: 0,
                      class: W(["lkt-table-item", Bt(k, f)]),
                      "data-i": f
                    }, [
                      Ze.value ? (c(), M(ke(Ze.value), x({
                        key: 0,
                        ref_for: !0
                      }, {
                        item: k,
                        index: f,
                        editing: w.value,
                        perms: E.value,
                        data: $t.value,
                        events: e.itemSlotEvents
                      }), null, 16)) : O(e.$slots, "item", Me({
                        key: 1,
                        [e.slotItemVar || ""]: k,
                        index: f,
                        editing: w.value,
                        canCreate: ye.value,
                        canRead: Ne.value,
                        canUpdate: ee.value,
                        canDrop: q.value,
                        isLoading: g.value,
                        doDrop: () => X(f)
                      }))
                    ], 10, Ml)) : mt(k, f) ? O(e.$slots, "item", Me({
                      key: 1,
                      class: Bt(k, f),
                      dataI: f,
                      [e.slotItemVar || ""]: k,
                      index: f,
                      editing: w.value,
                      canCreate: ye.value,
                      canRead: Ne.value,
                      canUpdate: ee.value,
                      canDrop: q.value,
                      isLoading: g.value,
                      doDrop: () => X(f)
                    })) : L("", !0)
                  ], 64))), 128))
                ], 10, Rl)) : e.type === h(qe).Accordion ? (c(), D("div", {
                  key: 2,
                  ref_key: "tableBody",
                  ref: I,
                  id: "lkt-table-body-" + h(we),
                  class: W(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (c(!0), D(G, null, be(d.value, (k, f) => (c(), D(G, null, [
                    [h(Se).Auto, h(Se).PreferCustomItem].includes(e.rowDisplayType) && h(l)[st(k, f)] ? O(e.$slots, st(k, f), {
                      key: 0,
                      item: k,
                      index: f,
                      editing: w.value,
                      isLoading: g.value
                    }) : [h(Se).Auto, h(Se).PreferCustomItem].includes(e.rowDisplayType) && h(l)[`item-${f}`] ? O(e.$slots, `item-${f}`, {
                      key: 1,
                      item: k,
                      index: f,
                      editing: w.value,
                      isLoading: g.value
                    }) : (c(), D(G, { key: 2 }, [
                      mt(k, f) ? (c(), M(ae, x({
                        class: ["lkt-table-item", Bt(k, f)],
                        "data-i": f,
                        key: Qe(k, f)
                      }, { ref_for: !0 }, {
                        ...e.accordion,
                        title: ya(k)
                      }), {
                        header: F(() => [
                          he(Gt, {
                            modelValue: d.value[f],
                            "onUpdate:modelValue": (N) => d.value[f] = N,
                            i: f,
                            column: Fe.value,
                            columns: me.value,
                            "edit-mode-enabled": w.value,
                            "has-inline-edit-perm": Ye.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])
                        ]),
                        default: F(() => [
                          (c(!0), D(G, null, be(me.value, (N) => {
                            var et, Wt;
                            return c(), D(G, null, [
                              N.key !== ((et = Fe.value) == null ? void 0 : et.key) && e.$slots[N.key] && h(pa)(N, d.value[f]) ? O(e.$slots, N.key, {
                                key: 0,
                                value: d.value[f][N.key],
                                item: d.value[f],
                                column: N,
                                i: f
                              }) : (c(), D(G, { key: 1 }, [
                                N.key !== ((Wt = Fe.value) == null ? void 0 : Wt.key) ? (c(), M(Gt, {
                                  key: 0,
                                  modelValue: d.value[f],
                                  "onUpdate:modelValue": (wa) => d.value[f] = wa,
                                  i: f,
                                  column: N,
                                  columns: me.value,
                                  "edit-mode-enabled": w.value,
                                  "has-inline-edit-perm": Ye.value
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])) : L("", !0)
                              ], 64))
                            ], 64);
                          }), 256))
                        ]),
                        _: 2
                      }, 1040, ["class", "data-i"])) : L("", !0)
                    ], 64))
                  ], 64))), 256))
                ], 10, Ol)) : ga.value ? (c(), M(ke(e.type), {
                  key: 3,
                  class: W(["lkt-table-items-container", e.itemsContainerClass])
                }, {
                  default: F(() => [
                    (c(!0), D(G, null, be(d.value, (k, f) => (c(), D(G, {
                      key: Qe(k, f)
                    }, [
                      mt(k, f) ? (c(), D("li", {
                        key: 0,
                        class: W(["lkt-table-item", Bt(k, f)]),
                        "data-i": f
                      }, [
                        Ze.value ? (c(), M(ke(Ze.value), x({
                          key: 0,
                          ref_for: !0
                        }, {
                          item: k,
                          index: f,
                          editing: w.value,
                          perms: E.value,
                          data: $t.value,
                          events: e.itemSlotEvents
                        }), null, 16)) : O(e.$slots, "item", Me({
                          key: 1,
                          [e.slotItemVar || ""]: k,
                          index: f,
                          editing: w.value,
                          canCreate: ye.value,
                          canRead: Ne.value,
                          canUpdate: ee.value,
                          canDrop: q.value,
                          isLoading: g.value,
                          doDrop: () => X(f)
                        }))
                      ], 10, $l)) : L("", !0)
                    ], 64))), 128))
                  ]),
                  _: 3
                }, 8, ["class"])) : e.type === h(qe).Carousel ? (c(), D("div", {
                  key: 4,
                  ref_key: "tableBody",
                  ref: I,
                  id: "lkt-table-body-" + h(we),
                  class: W(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  he(h(Za), x({
                    modelValue: le.value,
                    "onUpdate:modelValue": p[2] || (p[2] = (k) => le.value = k)
                  }, e.carousel, {
                    "wrap-around": ((gt = e.carousel) == null ? void 0 : gt.infinite) === !0
                  }), {
                    addons: F(() => [
                      he(h(al)),
                      he(h(ll))
                    ]),
                    default: F(() => [
                      (c(!0), D(G, null, be(Ct.value, (k, f) => (c(), M(h(la), {
                        key: k,
                        index: f
                      }, {
                        default: F(() => [
                          ve("div", Fl, [
                            O(e.$slots, k)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (c(!0), D(G, null, be(d.value, (k, f) => (c(), M(h(la), {
                        key: e.slide,
                        index: f
                      }, {
                        default: F(() => [
                          ve("div", Pl, [
                            Ze.value ? (c(), M(ke(Ze.value), x({
                              key: 0,
                              ref_for: !0
                            }, {
                              item: k,
                              index: f,
                              editing: w.value,
                              perms: E.value,
                              data: $t.value,
                              events: e.itemSlotEvents
                            }), null, 16)) : O(e.$slots, "item", Me({
                              key: 1,
                              [e.slotItemVar || ""]: k,
                              index: f,
                              editing: w.value,
                              canCreate: ye.value,
                              canRead: Ne.value,
                              canUpdate: ee.value,
                              canDrop: q.value,
                              isLoading: g.value,
                              doDrop: () => X(f)
                            }))
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128))
                    ]),
                    _: 3
                  }, 16, ["modelValue", "wrap-around"])
                ], 10, _l)) : L("", !0)
              ], 512), [
                [ze, We.value]
              ]),
              !g.value && d.value.length === 0 ? (c(), D("div", Ul, [
                h(l).empty ? O(e.$slots, "empty", { key: 0 }) : ba.value ? (c(), M(ke(ha.value), {
                  key: 1,
                  message: e.noResultsText
                }, null, 8, ["message"])) : e.noResultsText ? (c(), D(G, { key: 2 }, [
                  tt(at(e.noResultsText), 1)
                ], 64)) : L("", !0)
              ])) : L("", !0),
              g.value ? (c(), M(ce, { key: 3 })) : L("", !0),
              pt.value || h(l).bottomButtons ? (c(), D("div", jl, [
                pt.value && d.value.length >= e.requiredItemsForBottomCreate ? (c(), M(jt, {
                  key: 0,
                  config: ne.value,
                  disabled: !ft.value,
                  onClick: ct,
                  onAppend: Ue
                }, null, 8, ["config", "disabled"])) : L("", !0),
                O(e.$slots, "bottom-buttons")
              ])) : L("", !0),
              e.paginator && Object.keys(e.paginator).length > 0 ? (c(), M(Tt, x({
                key: 5,
                ref_key: "paginatorRef",
                ref: J
              }, e.paginator, {
                modelValue: s.value,
                "onUpdate:modelValue": p[3] || (p[3] = (k) => s.value = k),
                onLoading: Nt,
                onPerms: xe,
                onResponse: Z
              }), null, 16, ["modelValue"])) : L("", !0),
              h(l)["web-element-actions"] ? O(e.$slots, "web-element-actions", { key: 6 }) : L("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, Sl);
    };
  }
}), Wl = {
  install: (t) => {
    t.component("lkt-table") === void 0 && t.component("lkt-table", zl);
  }
}, Jl = (t) => (fe.navButtonSlot = t, !0), Ql = (t) => (fe.createButtonSlot = t, !0), Zl = (t) => {
  fe.defaultEmptySlot = t;
};
export {
  an as Column,
  ln as createColumn,
  Wl as default,
  Ql as setTableCreateButtonSlot,
  Zl as setTableEmptySlot,
  Jl as setTableNavButtonSlot
};
