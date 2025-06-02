import { defineComponent as pe, computed as u, ref as A, shallowReactive as jt, watch as F, watchEffect as $t, onMounted as Gt, onBeforeUnmount as Da, reactive as _t, provide as na, h as X, useId as Ia, inject as ht, getCurrentInstance as Ta, onUnmounted as Ba, onUpdated as Aa, cloneVNode as Ea, resolveComponent as Se, createBlock as O, createElementBlock as D, unref as h, openBlock as v, mergeProps as K, withCtx as P, createTextVNode as et, toDisplayString as tt, Fragment as G, useSlots as oa, normalizeClass as W, createCommentVNode as L, createElementVNode as ve, createVNode as he, resolveDynamicComponent as Ae, renderSlot as M, renderList as be, mergeDefaults as Va, nextTick as At, normalizeProps as Me, withDirectives as je, vShow as ze, createSlots as La } from "vue";
import { __ as Na } from "lkt-i18n";
import { SortDirection as Ge, Column as ia, extractPropValue as Ra, ColumnType as gt, FieldType as Jt, TableRowType as ke, extractI18nValue as ra, LktSettings as Be, ensureButtonConfig as He, TablePermission as Ie, PaginatorType as Et, TableType as qe, getDefaultValues as Ma, Table as Oa, ButtonType as Pt } from "lkt-vue-kernel";
import { Column as an, createColumn as ln } from "lkt-vue-kernel";
import { generateRandomString as $a, replaceAll as _a } from "lkt-string-tools";
import { DataState as Pa } from "lkt-data-state";
import Fa from "sortablejs";
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
}, xe = Symbol("carousel"), za = (t) => {
  const o = jt([]), i = (n) => {
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
  for (let k = a; k < b; k++) {
    const d = {
      index: l ? k : k + t.length,
      isClone: !0,
      position: o,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${o}-${k}`
    }, I = t[(k % t.length + t.length) % t.length].vnode, m = Ea(I, d);
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
function xa(t) {
  const { isVertical: o, isReversed: i, dragged: n, effectiveSlideSize: l } = t, a = o ? n.y : n.x;
  if (a === 0)
    return 0;
  const b = Math.round(a / l);
  return i ? b : -b;
}
function Te({ val: t, max: o, min: i }) {
  return o < i ? t : Math.min(Math.max(t, isNaN(i) ? t : i), isNaN(o) ? t : o);
}
function Xa(t) {
  const { transform: o } = window.getComputedStyle(t);
  return o.split(/[(,)]/).slice(1, -1).map((i) => parseFloat(i));
}
function Ya(t) {
  let o = 1, i = 1;
  return t.forEach((n) => {
    const l = Xa(n);
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
function zt({ slideSize: t, viewportSize: o, align: i, itemsToShow: n }) {
  return n !== void 0 ? Ka(i, n) : t !== void 0 && o !== void 0 ? Wa(i, t, o) : 0;
}
function va(t = "", o = {}) {
  return Object.entries(o).reduce((i, [n, l]) => i.replace(`{${n}}`, String(l)), t);
}
function fa({ val: t, max: o, min: i = 0 }) {
  const n = o - i + 1;
  return ((t - i) % n + n) % n + i;
}
function Ft(t, o = 0) {
  let i = !1, n = 0, l = null;
  function a(...b) {
    if (i)
      return;
    i = !0;
    const k = () => {
      l = requestAnimationFrame((T) => {
        T - n > o ? (n = T, t(...b), i = !1) : k();
      });
    };
    k();
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
    const t = ht(xe);
    return t ? () => X("div", {
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
    const a = za(i), b = a.getSlides(), k = u(() => b.length), T = A(null), d = A(null), I = A(0), m = u(() => Object.assign(Object.assign(Object.assign({}, z), Ga(t, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, z.i18n), t.i18n) })), s = jt(Object.assign({}, m.value)), g = A((l = t.modelValue) !== null && l !== void 0 ? l : 0), V = A(g.value);
    F(g, (r) => V.value = r);
    const E = A(0), J = u(() => Math.ceil((k.value - 1) / 2)), ie = u(() => k.value - 1), re = u(() => 0);
    let Q = null, c = null, w = null;
    const ue = u(() => I.value + s.gap), U = u(() => {
      const r = s.dir || "ltr";
      return r in Lt ? Lt[r] : r;
    }), le = u(() => ["rtl", "btt"].includes(U.value)), _ = u(() => ["ttb", "btt"].includes(U.value)), ne = u(() => s.itemsToShow === "auto"), H = u(() => _.value ? "height" : "width");
    function Oe() {
      var r;
      if (!Le.value)
        return;
      const y = (m.value.breakpointMode === "carousel" ? (r = T.value) === null || r === void 0 ? void 0 : r.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, C = Object.keys(t.breakpoints || {}).map((R) => Number(R)).sort((R, Y) => +Y - +R), B = {};
      C.some((R) => y >= R ? (Object.assign(B, t.breakpoints[R]), B.i18n && Object.assign(B.i18n, m.value.i18n, t.breakpoints[R].i18n), !0) : !1), Object.assign(s, m.value, B);
    }
    const Ee = Ft(() => {
      Oe(), me(), se();
    }), Xe = jt(/* @__PURE__ */ new Set()), Z = A([]);
    function Nt({ widthMultiplier: r, heightMultiplier: y }) {
      Z.value = b.map((C) => {
        var B;
        const R = (B = C.exposed) === null || B === void 0 ? void 0 : B.getBoundingRect();
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
    function Ce({ widthMultiplier: r, heightMultiplier: y }) {
      var C;
      const B = ((C = d.value) === null || C === void 0 ? void 0 : C.getBoundingClientRect()) || { width: 0, height: 0 };
      $e.value = {
        width: B.width * r,
        height: B.height * y
      };
    }
    function se() {
      if (!d.value)
        return;
      const r = Ya(Xe);
      if (Ce(r), Nt(r), ne.value)
        I.value = Ha(Z.value.map((y) => y[H.value]));
      else {
        const y = Number(s.itemsToShow), C = (y - 1) * s.gap;
        I.value = ($e.value[H.value] - C) / y;
      }
    }
    function me() {
      !s.wrapAround && k.value > 0 && (g.value = Te({
        val: g.value,
        max: ie.value,
        min: re.value
      })), ne.value || (s.itemsToShow = Te({
        val: Number(s.itemsToShow),
        max: k.value,
        min: 1
      }));
    }
    const at = u(() => typeof t.ignoreAnimations == "string" ? t.ignoreAnimations.split(",") : Array.isArray(t.ignoreAnimations) ? t.ignoreAnimations : t.ignoreAnimations ? !1 : []);
    $t(() => me()), $t(() => {
      se();
    });
    let Ve;
    const kt = (r) => {
      const y = r.target;
      if (!(!(y != null && y.contains(T.value)) || Array.isArray(at.value) && at.value.includes(r.animationName)) && (Xe.add(y), !Ve)) {
        const C = () => {
          Ve = requestAnimationFrame(() => {
            se(), C();
          });
        };
        C();
      }
    }, St = (r) => {
      const y = r.target;
      y && Xe.delete(y), Ve && Xe.size === 0 && (cancelAnimationFrame(Ve), se());
    }, Le = A(!1);
    typeof document < "u" && $t(() => {
      Le.value && at.value !== !1 ? (document.addEventListener("animationstart", kt), document.addEventListener("animationend", St)) : (document.removeEventListener("animationstart", kt), document.removeEventListener("animationend", St));
    }), Gt(() => {
      Le.value = !0, Oe(), Ct(), T.value && (w = new ResizeObserver(Ee), w.observe(T.value)), i("init");
    }), Da(() => {
      Le.value = !1, a.cleanup(), c && clearTimeout(c), Ve && cancelAnimationFrame(Ve), Q && clearInterval(Q), w && (w.disconnect(), w = null), typeof document < "u" && Ne(), T.value && (T.value.removeEventListener("transitionend", se), T.value.removeEventListener("animationiteration", se));
    });
    let we = !1;
    const ge = { x: 0, y: 0 }, de = _t({ x: 0, y: 0 }), _e = A(!1), lt = A(!1), Rt = () => {
      _e.value = !0;
    }, nt = () => {
      _e.value = !1;
    }, ot = Ft((r) => {
      if (!r.ctrlKey)
        switch (r.key) {
          case "ArrowLeft":
          case "ArrowUp":
            _.value === r.key.endsWith("Up") && (le.value ? De(!0) : We(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            _.value === r.key.endsWith("Down") && (le.value ? We(!0) : De(!0));
            break;
        }
    }, 200), ye = () => {
      document.addEventListener("keydown", ot);
    }, Ne = () => {
      document.removeEventListener("keydown", ot);
    };
    function ee(r) {
      const y = r.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(y) || q.value || (we = r.type === "touchstart", !we && (r.preventDefault(), r.button !== 0)))
        return;
      ge.x = "touches" in r ? r.touches[0].clientX : r.clientX, ge.y = "touches" in r ? r.touches[0].clientY : r.clientY;
      const C = we ? "touchmove" : "mousemove", B = we ? "touchend" : "mouseup";
      document.addEventListener(C, it, { passive: !1 }), document.addEventListener(B, Ye, { passive: !0 });
    }
    const it = Ft((r) => {
      lt.value = !0;
      const y = "touches" in r ? r.touches[0].clientX : r.clientX, C = "touches" in r ? r.touches[0].clientY : r.clientY;
      de.x = y - ge.x, de.y = C - ge.y;
      const B = xa({
        isVertical: _.value,
        isReversed: le.value,
        dragged: de,
        effectiveSlideSize: ue.value
      });
      V.value = s.wrapAround ? g.value + B : Te({
        val: g.value + B,
        max: ie.value,
        min: re.value
      }), i("drag", { deltaX: de.x, deltaY: de.y });
    });
    function Ye() {
      if (it.cancel(), V.value !== g.value && !we) {
        const C = (B) => {
          B.preventDefault(), window.removeEventListener("click", C);
        };
        window.addEventListener("click", C);
      }
      Re(V.value), de.x = 0, de.y = 0, lt.value = !1;
      const r = we ? "touchmove" : "mousemove", y = we ? "touchend" : "mouseup";
      document.removeEventListener(r, it), document.removeEventListener(y, Ye);
    }
    function Ct() {
      !s.autoplay || s.autoplay <= 0 || (Q = setInterval(() => {
        s.pauseAutoplayOnHover && _e.value || De();
      }, s.autoplay));
    }
    function rt() {
      Q && (clearInterval(Q), Q = null);
    }
    function Ke() {
      rt(), Ct();
    }
    const q = A(!1);
    function Re(r, y = !1) {
      if (!y && q.value)
        return;
      let C = r, B = r;
      E.value = g.value, s.wrapAround ? B = fa({
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
        slidesCount: k.value
      }), rt(), q.value = !0, g.value = C, B !== C && ut.pause(), i("update:modelValue", B), c = setTimeout(() => {
        s.wrapAround && B !== C && (ut.resume(), g.value = B, i("loop", {
          currentSlideIndex: g.value,
          slidingToIndex: r
        })), i("slide-end", {
          currentSlideIndex: g.value,
          prevSlideIndex: E.value,
          slidesCount: k.value
        }), q.value = !1, Ke();
      }, s.transition);
    }
    function De(r = !1) {
      Re(g.value + s.itemsToScroll, r);
    }
    function We(r = !1) {
      Re(g.value - s.itemsToScroll, r);
    }
    function Pe() {
      Oe(), me(), se(), Ke();
    }
    F(() => [m.value, t.breakpoints], () => Oe(), { deep: !0 }), F(() => t.autoplay, () => Ke());
    const ut = F(() => t.modelValue, (r) => {
      r !== g.value && Re(Number(r), !0);
    });
    i("before-init");
    const Fe = u(() => {
      if (!s.wrapAround)
        return { before: 0, after: 0 };
      if (ne.value)
        return { before: b.length, after: b.length };
      const r = Number(s.itemsToShow), y = Math.ceil(r + (s.itemsToScroll - 1)), C = y - V.value, B = y - (k.value - (V.value + 1));
      return {
        before: Math.max(0, C),
        after: Math.max(0, B)
      };
    }), oe = u(() => Fe.value.before ? ne.value ? Z.value.slice(-1 * Fe.value.before).reduce((r, y) => r + y[H.value] + s.gap, 0) * -1 : Fe.value.before * ue.value * -1 : 0), st = u(() => {
      var r;
      if (ne.value) {
        const y = (g.value % b.length + b.length) % b.length;
        return zt({
          slideSize: (r = Z.value[y]) === null || r === void 0 ? void 0 : r[H.value],
          viewportSize: $e.value[H.value],
          align: s.snapAlign
        });
      }
      return zt({
        align: s.snapAlign,
        itemsToShow: +s.itemsToShow
      });
    }), Je = u(() => {
      let r = 0;
      if (ne.value) {
        if (g.value < 0 ? r = Z.value.slice(g.value).reduce((y, C) => y + C[H.value] + s.gap, 0) * -1 : r = Z.value.slice(0, g.value).reduce((y, C) => y + C[H.value] + s.gap, 0), r -= st.value, !s.wrapAround) {
          const y = Z.value.reduce((C, B) => C + B[H.value] + s.gap, 0) - $e.value[H.value] - s.gap;
          r = Te({
            val: r,
            max: y,
            min: 0
          });
        }
      } else {
        let y = g.value - st.value;
        s.wrapAround || (y = Te({
          val: y,
          max: k.value - +s.itemsToShow,
          min: 0
        })), r = y * ue.value;
      }
      return r * (le.value ? 1 : -1);
    }), wt = u(() => {
      var r, y;
      if (!ne.value) {
        const R = g.value - st.value;
        return s.wrapAround ? {
          min: Math.floor(R),
          max: Math.ceil(R + Number(s.itemsToShow) - 1)
        } : {
          min: Math.floor(Te({
            val: R,
            max: k.value - Number(s.itemsToShow),
            min: 0
          })),
          max: Math.ceil(Te({
            val: R + Number(s.itemsToShow) - 1,
            max: k.value - 1,
            min: 0
          }))
        };
      }
      let C = 0;
      {
        let R = 0, Y = 0 - Fe.value.before;
        const x = Math.abs(Je.value + oe.value);
        for (; R <= x; ) {
          const te = (Y % b.length + b.length) % b.length;
          R += ((r = Z.value[te]) === null || r === void 0 ? void 0 : r[H.value]) + s.gap, Y++;
        }
        C = Y - 1;
      }
      let B = 0;
      {
        let R = C, Y = 0;
        for (R < 0 ? Y = Z.value.slice(0, R).reduce((x, te) => x + te[H.value] + s.gap, 0) - Math.abs(Je.value + oe.value) : Y = Z.value.slice(0, R).reduce((x, te) => x + te[H.value] + s.gap, 0) - Math.abs(Je.value); Y < $e.value[H.value]; ) {
          const x = (R % b.length + b.length) % b.length;
          Y += ((y = Z.value[x]) === null || y === void 0 ? void 0 : y[H.value]) + s.gap, R++;
        }
        B = R - 1;
      }
      return {
        min: Math.floor(C),
        max: Math.ceil(B)
      };
    }), Mt = u(() => {
      if (s.slideEffect === "fade")
        return;
      const r = _.value ? "Y" : "X", y = _.value ? de.y : de.x;
      let C = Je.value + y;
      if (!s.wrapAround && s.preventExcessiveDragging) {
        let B = 0;
        ne.value ? B = Z.value.reduce((x, te) => x + te[H.value], 0) : B = (k.value - Number(s.itemsToShow)) * ue.value;
        const R = le.value ? 0 : -1 * B, Y = le.value ? B : 0;
        C = Te({
          val: C,
          min: R,
          max: Y
        });
      }
      return `translate${r}(${C}px)`;
    }), Ot = u(() => ({
      "--vc-transition-duration": q.value ? Vt(s.transition, "ms") : void 0,
      "--vc-slide-gap": Vt(s.gap),
      "--vc-carousel-height": Vt(s.height),
      "--vc-cloned-offset": Vt(oe.value)
    })), Dt = { slideTo: Re, next: De, prev: We }, dt = _t({
      activeSlide: V,
      config: s,
      currentSlide: g,
      isSliding: q,
      isVertical: _,
      maxSlide: ie,
      minSlide: re,
      nav: Dt,
      normalizedDir: U,
      slideRegistry: a,
      slideSize: I,
      slides: b,
      slidesCount: k,
      viewport: d,
      visibleRange: wt
    });
    na(xe, dt);
    const Ue = _t({
      config: s,
      currentSlide: g,
      maxSlide: ie,
      middleSlide: J,
      minSlide: re,
      slideSize: I,
      slidesCount: k
    });
    return n({
      data: Ue,
      nav: Dt,
      next: De,
      prev: We,
      restartCarousel: Pe,
      slideTo: Re,
      updateBreakpointsConfig: Oe,
      updateSlideSize: se,
      updateSlidesData: me
    }), () => {
      var r;
      const y = o.default || o.slides, C = (y == null ? void 0 : y(Ue)) || [], { before: B, after: R } = Fe.value, Y = Qt({
        slides: b,
        position: "before",
        toShow: B
      }), x = Qt({
        slides: b,
        position: "after",
        toShow: R
      }), te = [...Y, ...C, ...x];
      if (!s.enabled || !te.length)
        return X("section", {
          ref: T,
          class: ["carousel", "is-disabled"]
        }, te);
      const ct = ((r = o.addons) === null || r === void 0 ? void 0 : r.call(o, Ue)) || [], Qe = X("ol", {
        class: "carousel__track",
        style: { transform: Mt.value },
        onMousedownCapture: s.mouseDrag ? ee : null,
        onTouchstartPassiveCapture: s.touchDrag ? ee : null
      }, te), vt = X("div", { class: "carousel__viewport", ref: d }, Qe);
      return X("section", {
        ref: T,
        class: [
          "carousel",
          `is-${U.value}`,
          `is-effect-${s.slideEffect}`,
          {
            "is-vertical": _.value,
            "is-sliding": q.value,
            "is-dragging": lt.value,
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
        onMouseleave: nt
      }, [vt, ct, X(Ja)]);
    };
  }
});
var Ht;
(function(t) {
  t.arrowDown = "arrowDown", t.arrowLeft = "arrowLeft", t.arrowRight = "arrowRight", t.arrowUp = "arrowUp";
})(Ht || (Ht = {}));
const ea = (t) => `icon${t.charAt(0).toUpperCase() + t.slice(1)}`, el = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function tl(t) {
  return t in Ht;
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
    const o = ht(xe, null);
    return () => {
      const i = t.name;
      if (!i || !ta(i))
        return;
      const n = el[i], l = X("path", { d: n }), a = (o == null ? void 0 : o.config.i18n[ea(i)]) || t.title, b = X("title", a);
      return X("svg", {
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
    const n = ht(xe);
    if (!n)
      return () => "";
    const { next: l, prev: a } = o, b = () => ({
      btt: "arrowDown",
      ltr: "arrowLeft",
      rtl: "arrowRight",
      ttb: "arrowUp"
    })[n.normalizedDir], k = () => ({
      btt: "arrowUp",
      ltr: "arrowRight",
      rtl: "arrowLeft",
      ttb: "arrowDown"
    })[n.normalizedDir], T = u(() => !n.config.wrapAround && n.currentSlide <= n.minSlide), d = u(() => !n.config.wrapAround && n.currentSlide >= n.maxSlide);
    return () => {
      const { i18n: I } = n.config, m = X("button", Object.assign(Object.assign({ type: "button", disabled: T.value, "aria-label": I.ariaPreviousSlide, title: I.ariaPreviousSlide, onClick: n.nav.prev }, i), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": T.value },
        i.class
      ] }), (a == null ? void 0 : a()) || X(aa, { name: b() })), s = X("button", Object.assign(Object.assign({ type: "button", disabled: d.value, "aria-label": I.ariaNextSlide, title: I.ariaNextSlide, onClick: n.nav.next }, i), { class: [
        "carousel__next",
        { "carousel__next--disabled": d.value },
        i.class
      ] }), (l == null ? void 0 : l()) || X(aa, { name: k() }));
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
    const o = ht(xe);
    if (!o)
      return () => "";
    const i = u(() => o.config.itemsToShow), n = u(() => zt({
      align: o.config.snapAlign,
      itemsToShow: i.value
    })), l = u(() => t.paginateByItemsToShow && i.value > 1), a = u(() => Math.ceil((o.activeSlide - n.value) / i.value)), b = u(() => Math.ceil(o.slidesCount / i.value)), k = (T) => fa(l.value ? {
      val: a.value,
      max: b.value - 1,
      min: 0
    } : {
      val: o.activeSlide,
      max: o.maxSlide,
      min: o.minSlide
    }) === T;
    return () => {
      var T, d;
      const I = [];
      for (let m = l.value ? 0 : o.minSlide; m <= (l.value ? b.value - 1 : o.maxSlide); m++) {
        const s = va(o.config.i18n[l.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: m + 1
        }), g = k(m), V = X("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": g
          },
          "aria-label": s,
          "aria-pressed": g,
          "aria-controls": (d = (T = o.slides[m]) === null || T === void 0 ? void 0 : T.exposed) === null || d === void 0 ? void 0 : d.id,
          title: s,
          disabled: t.disableOnClick,
          onClick: () => o.nav.slideTo(l.value ? Math.floor(m * +o.config.itemsToShow + n.value) : m)
        }), E = X("li", { class: "carousel__pagination-item", key: m }, V);
        I.push(E);
      }
      return X("ol", { class: "carousel__pagination" }, I);
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
    const l = ht(xe);
    if (na(xe, void 0), !l)
      return () => "";
    const a = A(t.index), b = (V) => {
      a.value = V;
    }, k = Ta(), T = () => {
      const V = k.vnode.el;
      return V ? V.getBoundingClientRect() : { width: 0, height: 0 };
    };
    n({
      id: t.id,
      setIndex: b,
      getBoundingRect: T
    });
    const d = u(() => a.value === l.activeSlide), I = u(() => a.value === l.activeSlide - 1), m = u(() => a.value === l.activeSlide + 1), s = u(() => a.value >= l.visibleRange.min && a.value <= l.visibleRange.max), g = u(() => {
      if (l.config.itemsToShow === "auto")
        return;
      const V = l.config.itemsToShow, E = l.config.gap > 0 && V > 1 ? `calc(${100 / V}% - ${l.config.gap * (V - 1) / V}px)` : `${100 / V}%`;
      return l.isVertical ? { height: E } : { width: E };
    });
    return l.slideRegistry.registerSlide(k, t.index), Ba(() => {
      l.slideRegistry.unregisterSlide(k);
    }), t.isClone && (Gt(() => {
      Zt(k.vnode);
    }), Aa(() => {
      Zt(k.vnode);
    })), () => {
      var V, E;
      return l.config.enabled ? X("li", {
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
}, yt = (t, o, i, n = []) => {
  if (t.extractTitleFromColumn) {
    let l = n.find((a) => a.key === t.extractTitleFromColumn);
    if (l)
      return yt(l, o, i, n);
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
}, qt = /* @__PURE__ */ pe({
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
    F(a, (m) => {
      const s = JSON.parse(JSON.stringify(l.value));
      s[n.column.key] = m, i("update:modelValue", s);
    }), F(() => n.modelValue, (m) => {
      l.value = m, a.value = l.value[n.column.key];
    });
    const k = u(() => ({ ...n.column.slotData, item: l.value })), T = u(() => {
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
      return n.column.type === gt.Field ? !((s = (m = n.column) == null ? void 0 : m.field) != null && s.label) && (n.column.ensureFieldLabel || [
        Jt.Switch,
        Jt.Check
      ].includes((g = n.column.field) == null ? void 0 : g.type)) ? n.column.label : (V = n.column.field) == null ? void 0 : V.label : "";
    });
    return (m, s) => {
      const g = Se("lkt-anchor"), V = Se("lkt-button"), E = Se("lkt-field");
      return m.column.type === h(gt).Anchor ? (v(), O(g, K({ key: 0 }, m.column.anchor, { prop: l.value }), {
        default: P(() => [
          et(tt(h(yt)(m.column, l.value, m.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : m.column.type === h(gt).Button ? (v(), O(V, K({ key: 1 }, m.column.button, { prop: l.value }), {
        default: P(() => [
          et(tt(h(yt)(m.column, l.value, m.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : m.column.type === h(gt).Field && m.hasInlineEditPerm ? (v(), O(E, K({ key: 2 }, d.value, {
        "read-mode": !m.column.editable || !m.editModeEnabled,
        ref: (J) => b.value = J,
        "slot-data": k.value,
        label: I.value,
        "modal-data": T.value,
        prop: l.value,
        modelValue: a.value,
        "onUpdate:modelValue": s[0] || (s[0] = (J) => a.value = J)
      }), null, 16, ["read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : m.column.type === h(gt).Field ? (v(), O(E, K({ key: 3 }, d.value, {
        "read-mode": "",
        ref: (J) => b.value = J,
        "slot-data": k.value,
        label: I.value,
        "modal-data": T.value,
        prop: l.value,
        "model-value": a.value
      }), null, 16, ["slot-data", "label", "modal-data", "prop", "model-value"])) : (v(), D(G, { key: 4 }, [
        et(tt(h(yt)(m.column, l.value, m.i, m.columns)), 1)
      ], 64));
    };
  }
}), bt = class bt {
};
bt.navButtonSlot = "", bt.createButtonSlot = "", bt.defaultEmptySlot = void 0;
let fe = bt;
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
    rowDisplayType: { type: [Number, Function], default: ke.Auto },
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
    b || (b = ke.Auto);
    const k = [ke.Auto, ke.PreferCustomItem].includes(b), T = [ke.Auto, ke.PreferItem].includes(b), d = (c) => n("click", c), I = u(() => {
      let c = [], w = !1;
      return typeof l.disabledDrag == "function" ? w = l.disabledDrag(a.value) : w = ie.value === !0, !w && l.sortable && l.isDraggable ? c.push("handle") : w && c.push("disabled"), c.join(" ");
    }), m = u(() => fe.navButtonSlot !== ""), s = u(() => fe.navButtonSlot), g = () => {
      n("item-up", l.i);
    }, V = () => {
      n("item-down", l.i);
    }, E = () => {
      n("item-drop", l.i);
    };
    F(() => l.modelValue, (c) => a.value = c), F(a, (c) => {
      n("update:modelValue", c);
    }, { deep: !0 });
    const J = u(() => typeof l.renderDrag == "function" ? l.renderDrag(a.value) : l.renderDrag === !0), ie = u(() => typeof l.disabledDrag == "function" ? l.disabledDrag(a.value) : l.disabledDrag === !0), re = u(() => I.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), Q = u(() => {
      let c = [];
      return k && c.push("type-custom-item"), T && c.push("type-item"), typeof l.itemContainerClass == "function" ? c.push(l.itemContainerClass(a.value, l.i)) : l.itemContainerClass !== "" && c.push(l.itemContainerClass), c.join(" ");
    });
    return (c, w) => {
      const ue = Se("lkt-button");
      return v(), D("tr", {
        "data-i": c.i,
        "data-draggable": c.isDraggable,
        class: W(Q.value)
      }, [
        c.sortable && c.editModeEnabled && J.value ? (v(), D("td", {
          key: 0,
          "data-role": re.value,
          class: W(I.value),
          "data-i": c.i
        }, w[2] || (w[2] = [
          ve("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]), 10, dl)) : L("", !0),
        c.addNavigation && c.editModeEnabled ? (v(), D("td", cl, [
          ve("div", vl, [
            he(ue, {
              palette: "table-nav",
              disabled: c.i === 0,
              onClick: g
            }, {
              default: P(() => [
                m.value ? (v(), O(Ae(s.value), {
                  key: 0,
                  direction: "up"
                })) : (v(), D("i", fl))
              ]),
              _: 1
            }, 8, ["disabled"]),
            he(ue, {
              palette: "table-nav",
              disabled: c.latestRow,
              onClick: V
            }, {
              default: P(() => [
                m.value ? (v(), O(Ae(s.value), {
                  key: 0,
                  direction: "down"
                })) : (v(), D("i", pl))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : L("", !0),
        h(k) && h(i)[`item-${c.i}`] ? (v(), D("td", {
          key: "td" + c.i,
          colspan: c.visibleColumns.length
        }, [
          M(c.$slots, `item-${c.i}`, {
            item: a.value,
            index: c.i,
            editing: c.editModeEnabled,
            canCreate: c.canCreate,
            canRead: c.canRead,
            canUpdate: c.canEdit,
            canDrop: c.canDrop,
            isLoading: c.isLoading,
            doDrop: () => E()
          })
        ], 8, ml)) : h(T) && h(i).item ? (v(), D("td", {
          key: "td" + c.i,
          colspan: c.visibleColumns.length
        }, [
          M(c.$slots, "item", {
            item: a.value,
            index: c.i,
            editing: c.editModeEnabled,
            canCreate: c.canCreate,
            canRead: c.canRead,
            canUpdate: c.canEdit,
            canDrop: c.canDrop,
            isLoading: c.isLoading,
            doDrop: () => E()
          })
        ], 8, gl)) : (v(!0), D(G, { key: 4 }, be(c.visibleColumns, (U) => (v(), D(G, null, [
          h(il)(U, c.emptyColumns, a.value) ? (v(), D("td", {
            key: "td" + c.i,
            "data-column": U.key,
            colspan: h(xt)(U, a.value),
            title: h(yt)(U, a.value, c.i, c.visibleColumns),
            class: W(h(ma)(U)),
            onClick: w[1] || (w[1] = (le) => d(le))
          }, [
            c.$slots[U.key] && h(pa)(U, a.value) ? M(c.$slots, U.key, {
              key: 0,
              value: a.value[U.key],
              item: a.value,
              column: U,
              i: c.i
            }) : a.value ? (v(), O(qt, {
              key: 1,
              modelValue: a.value,
              "onUpdate:modelValue": w[0] || (w[0] = (le) => a.value = le),
              column: U,
              columns: c.visibleColumns,
              "edit-mode-enabled": c.editModeEnabled,
              "has-inline-edit-perm": c.hasInlineEditPerm,
              i: c.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : L("", !0)
          ], 10, yl)) : L("", !0)
        ], 64))), 256))
      ], 10, sl);
    };
  }
}), Ut = /* @__PURE__ */ pe({
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
    }, k = {
      ...n.config
    };
    k.modalData = b;
    const T = () => {
      var I;
      if (!((I = n.config) != null && I.modal)) {
        i("click");
        return;
      }
    };
    return (I, m) => {
      const s = Se("lkt-button");
      return v(), O(s, K(k, {
        disabled: I.disabled,
        onClick: T
      }), {
        default: P(() => [
          l.value ? (v(), O(Ae(a.value), { key: 0 })) : L("", !0)
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
    const i = o, n = t, l = u(() => ol(n.column, n.amountOfColumns, n.items)), a = u(() => n.column.sortable === !0), b = u(() => a.value && n.sortBy === n.column.key ? n.sortDirection : ""), k = u(() => ra(n.column.label)), T = u(() => a.value && n.sortBy === n.column.key ? n.sortDirection === Ge.Asc ? Be.defaultTableSortAscIcon : n.sortDirection === Ge.Desc ? Be.defaultTableSortDescIcon : "" : ""), d = () => i("click", n.column);
    return (I, m) => (v(), D("th", {
      "data-column": I.column.key,
      "data-sortable": a.value,
      "data-sort": b.value,
      colspan: l.value,
      title: k.value,
      class: W(h(ma)(I.column)),
      onClick: d
    }, [
      ve("div", null, [
        et(tt(k.value) + " ", 1),
        T.value ? (v(), D("i", {
          key: 0,
          class: W(T.value)
        }, null, 2)) : L("", !0)
      ])
    ], 10, hl));
  }
}), Sl = ["id"], Cl = { class: "lkt-table-page-buttons" }, wl = { class: "switch-edition-mode" }, Dl = { class: "switch-edition-mode" }, Il = {
  key: 0,
  class: "lkt-table-page-buttons"
}, Tl = {
  key: 1,
  class: "lkt-table-page-filters"
}, Bl = { class: "lkt-table" }, Al = { key: 0 }, El = { key: 0 }, Vl = {
  key: 0,
  "data-role": "drag-indicator"
}, Ll = { key: 1 }, Nl = ["id"], Rl = ["id"], Ml = ["data-i"], Ol = ["id"], $l = ["data-i"], _l = ["id"], Pl = { class: "lkt-carousel-slide" }, Fl = { class: "lkt-carousel-slide" }, Ul = {
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
    itemSlotComponent: { type: [String, Function] },
    itemSlotData: { type: [Object, Function] },
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
    const n = i, l = oa(), a = t, b = A(typeof a.sorter == "function" ? a.sorter : nl), k = A(rl(a.columns)), T = A(Ge.Asc), d = A(a.modelValue), I = A(null), m = A(a.columns), s = A((Yt = a.paginator) == null ? void 0 : Yt.modelValue), g = A(a.loading), V = A(!1), E = A(a.perms), J = A(null), ie = A(null), re = A(null), Q = A({}), c = A(new Pa({ items: d.value }, a.dataStateConfig)), w = A(a.editMode), ue = A(0), U = A(null), le = A(((Kt = a.carousel) == null ? void 0 : Kt.currentSlide) || 0), _ = A(He(a.saveButton, Be.defaultSaveButton)), ne = A(He(a.createButton, Be.defaultCreateButton)), H = A(He(a.editModeButton, Be.defaultEditModeButton)), Oe = A(He(a.groupButton, Be.defaultGroupButton));
    F(() => a.saveButton, (e) => _.value = He(a.saveButton, Be.defaultSaveButton)), F(() => a.createButton, (e) => ne.value = He(a.createButton, Be.defaultCreateButton)), F(() => a.editModeButton, (e) => H.value = He(a.editModeButton, Be.defaultEditModeButton));
    const Ee = A(!1);
    F(g, (e) => n("update:loading", e)), F(s, (e) => n("page", e));
    const Xe = (e) => {
      E.value = e;
    }, Z = (e) => {
      var p;
      Array.isArray(e.data) && ((!a.paginator || ![Et.LoadMore, Et.Infinite].includes((p = a.paginator) == null ? void 0 : p.type)) && d.value.splice(0, d.value.length), d.value = [...d.value, ...e.data]), g.value = !1, V.value = !0, c.value.store({ items: d.value }).turnStoredIntoOriginal(), Ee.value = !1, At(() => {
        oe(), ge.value, n("read-response", e);
      });
    }, Nt = () => At(() => g.value = !0), $e = () => {
      J.value.doRefresh();
    }, Ce = $a(12), se = u(() => {
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
    }), me = u(() => m.value.filter((e) => !e.hidden)), at = u(() => m.value.filter((e) => e.isForRowKey)), Ve = u(() => m.value.map((e) => e.key)), kt = u(() => {
      let e = [];
      for (let p in l) Ve.value.indexOf(p) !== -1 && e.push(p);
      return e;
    }), St = u(() => {
      let e = [];
      for (let p in l) p.indexOf("slide-") !== -1 && e.push(p);
      return e;
    }), Le = u(() => {
      var e;
      return a.hiddenSave || g.value || !((e = _.value) != null && e.resource || _.value.type) ? !1 : w.value && Ee.value ? !0 : w.value;
    }), we = u(() => ft.value && d.value.length >= a.requiredItemsForTopCreate || De.value ? !0 : Le.value || w.value && ye.value), ge = u(() => {
      var e, p;
      return ue.value, typeof ((e = _.value) == null ? void 0 : e.disabled) == "function" ? _.value.disabled({
        value: d.value,
        dataState: c.value
      }) : typeof ((p = _.value) == null ? void 0 : p.disabled) == "boolean" ? _.value.disabled : !Ee.value;
    }), de = u(() => d.value.length), _e = u(() => {
      var e;
      return {
        items: d.value,
        ...(e = _.value) == null ? void 0 : e.resourceData
      };
    }), lt = u(() => a.titleTag === "" ? "h2" : a.titleTag), Rt = u(() => a.wrapContentTag === "" ? "div" : a.wrapContentTag), nt = u(() => ra(a.title)), ot = u(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }), ye = u(() => E.value.includes(Ie.Create)), Ne = u(() => E.value.includes("read")), ee = u(() => E.value.includes(Ie.Update)), it = u(() => E.value.includes(Ie.Edit)), Ye = u(() => E.value.includes(Ie.InlineEdit)), Ct = u(() => E.value.includes(Ie.ModalCreate)), rt = u(() => E.value.includes(Ie.InlineCreate)), Ke = u(() => E.value.includes(Ie.InlineCreateEver)), q = u(() => E.value.includes(Ie.Drop)), Re = u(() => E.value.includes(Ie.SwitchEditMode)), De = u(() => !Re.value || !ee.value && !q.value || !ee.value && q.value ? !1 : !g.value), We = u(() => {
      var e;
      return (typeof ((e = a.paginator) == null ? void 0 : e.type) < "u" && [Et.LoadMore, Et.Infinite].includes(a.paginator.type) || !g.value) && d.value.length > 0;
    }), Pe = u(() => m.value.find((e) => e.isForAccordionHeader)), ut = (e, p) => typeof a.customItemSlotName == "function" ? a.customItemSlotName(e, p) : "", Fe = (e) => {
      let p = e.target;
      if (typeof p.dataset.column > "u")
        do
          p = p.parentNode;
        while (typeof p.dataset.column > "u" && p.tagName !== "TABLE" && p.tagName !== "body");
      if (p.tagName === "TD" && (p = p.parentNode, p = p.dataset.i, typeof p < "u"))
        return d.value[p];
    }, oe = () => {
      ue.value = Ua();
    }, st = (e) => d.value[e], Je = (e) => {
      var p;
      return (p = I.value) == null ? void 0 : p.querySelector(`[data-i="${e}"]`);
    }, wt = (e) => {
      e && e.sortable && (d.value = d.value.sort((p, $) => b.value(p, $, e, T.value)), T.value = T.value === Ge.Asc ? Ge.Desc : Ge.Asc, k.value = e.key, oe(), n("sort", [k.value, T.value]));
    }, Mt = (e) => {
      n("click", e);
    }, Ot = (e) => {
      var $, j, ae, ce, Bt, mt, S, f;
      let p = parseInt((ce = (ae = (j = ($ = e == null ? void 0 : e.originalEvent) == null ? void 0 : $.toElement) == null ? void 0 : j.closest("tr")) == null ? void 0 : ae.dataset) == null ? void 0 : ce.i);
      return !(typeof ((Bt = a.drag) == null ? void 0 : Bt.isValid) == "function" && !((mt = a.drag) != null && mt.isValid(d.value[p])) || typeof ((S = a.drag) == null ? void 0 : S.isValid) == "boolean" && !((f = a.drag) != null && f.isValid));
    }, Dt = (e) => {
      var p, $;
      return typeof ((p = a.drag) == null ? void 0 : p.isDraggable) == "function" ? ($ = a.drag) == null ? void 0 : $.isDraggable(e) : !0;
    }, dt = () => {
      if (ye.value) {
        n("click-create");
        return;
      }
      if (rt.value || Ke.value) {
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
        c.value.turnStoredIntoOriginal(), Ee.value = !1, n("save", p);
      }
    }, B = (e, p, $) => {
      if ($ >= e.length) {
        let j = $ - e.length + 1;
        for (; j--; ) e.push(void 0);
      }
      return e.splice($, 0, e.splice(p, 1)[0]), e;
    }, R = (e) => {
      B(d.value, e, e - 1), oe();
    }, Y = (e) => {
      B(d.value, e, e + 1), oe();
    }, x = (e) => {
      d.value.splice(e, 1), oe();
    }, te = () => {
      var e;
      Q.value && typeof ((e = Q.value) == null ? void 0 : e.destroy) == "function" && (Q.value.destroy(), Q.value = {});
    }, ct = () => {
      U.value || (U.value = document.getElementById("lkt-table-body-" + Ce)), Q.value = new Fa(U.value, {
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
      let j = [ue.value, Ce, "row", p];
      return $ && j.push("hidden"), at.value.forEach((ae) => {
        let ce = String(e[ae.key]).toLowerCase();
        ce.length > 50 && (ce = ce.substring(0, 50)), ce = _a(ce, " ", "-"), j.push(ce);
      }), j.join("-");
    }, vt = u(() => typeof a.createEnabledValidator == "function" ? a.createEnabledValidator({ items: d.value }) : !0), ft = u(() => Ke.value || ye.value && w.value || rt.value && w.value || Ct.value && w.value), ga = u(() => [qe.Ol, qe.Ul].includes(a.type)), pt = (e, p) => typeof a.itemDisplayChecker == "function" ? a.itemDisplayChecker(e, p) : !0, It = (e, p) => typeof a.itemContainerClass == "function" ? a.itemContainerClass(e, p) : a.itemContainerClass, ya = (e, p) => Pe.value ? e[Pe.value.key] : "", Tt = u(() => typeof a.itemSlotComponent == "function" ? a.itemSlotComponent() : a.itemSlotComponent), Xt = u(() => typeof a.itemSlotData == "function" ? a.itemSlotData() : a.itemSlotData);
    Gt(() => {
      var e;
      a.initialSorting && wt(ul(a.columns, k.value)), c.value.store({ items: d.value }).turnStoredIntoOriginal(), Ee.value = !1, (e = a.drag) != null && e.enabled && At(() => {
        ct();
      });
    }), F(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }, (e) => {
      e ? ct() : te();
    }), F(() => a.type, (e) => {
      var p;
      (p = a.drag) != null && p.enabled ? ct() : te();
    }), F(() => a.perms, (e) => E.value = e), F(E, (e) => n("update:perms", e)), F(w, (e) => {
      n("update:editMode", e);
    }), F(() => a.editMode, (e) => w.value = e), F(() => a.columns, (e) => m.value = e, { deep: !0 }), F(() => a.modelValue, (e) => {
      d.value = e;
    }, { deep: !0 }), F(d, (e) => {
      c.value.increment({ items: e }), Ee.value = c.value.changed(), n("update:modelValue", e);
    }, { deep: !0 }), o({
      getItemByEvent: Fe,
      getItemByIndex: st,
      getRowByIndex: Je,
      doRefresh: $e,
      doRemoveIndex: (e) => {
        d.value.splice(e, 1), oe();
      },
      getHtml: () => ie.value,
      reRender: oe,
      turnStoredIntoOriginal: () => {
        c.value.turnStoredIntoOriginal(), At(() => {
          oe();
        });
      }
    });
    const ba = u(() => typeof fe.defaultEmptySlot < "u"), ha = u(() => fe.defaultEmptySlot), ka = u(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled ? !1 : typeof a.drag.canRender > "u" ? !0 : a.drag.canRender), Sa = u(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled || typeof a.drag.isDisabled > "u" ? !1 : a.drag.isDisabled), Ca = u(() => typeof a.header == "object" && Object.keys(a.header).length > 0);
    return (e, p) => {
      const $ = Se("lkt-header"), j = Se("lkt-button"), ae = Se("lkt-accordion"), ce = Se("lkt-loader"), Bt = Se("lkt-paginator");
      return v(), D("section", {
        ref_key: "element",
        ref: ie,
        class: "lkt-table-page",
        id: "lkt-table-page-" + h(Ce)
      }, [
        Ca.value ? (v(), O($, Me(K({ key: 0 }, e.header)), null, 16)) : nt.value || h(l).title ? (v(), D("header", {
          key: 1,
          class: W(e.headerClass)
        }, [
          nt.value ? (v(), O(Ae(lt.value), { key: 0 }, {
            default: P(() => [
              e.titleIcon ? (v(), D("i", {
                key: 0,
                class: W(e.titleIcon)
              }, null, 2)) : L("", !0),
              et(" " + tt(nt.value), 1)
            ]),
            _: 1
          })) : L("", !0),
          h(l).title ? M(e.$slots, "title", { key: 1 }) : L("", !0)
        ], 2)) : L("", !0),
        (v(), O(Ae(Rt.value), {
          class: W(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: P(() => {
            var mt;
            return [
              je(ve("div", Cl, [
                e.groupButton !== !1 ? (v(), O(j, K({
                  key: 0,
                  ref: "groupButton"
                }, Oe.value, { class: "lkt-item-crud-group-button" }), {
                  split: P(() => [
                    ve("div", wl, [
                      je(he(j, K(H.value, {
                        checked: w.value,
                        "onUpdate:checked": p[0] || (p[0] = (S) => w.value = S)
                      }), null, 16, ["checked"]), [
                        [ze, De.value]
                      ])
                    ]),
                    h(l)["prev-buttons-ever"] ? M(e.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: ee.value,
                      canDrop: q.value,
                      perms: e.perms
                    }) : L("", !0),
                    h(l)["prev-buttons"] ? M(e.$slots, "prev-buttons", {
                      key: 1,
                      canUpdate: ee.value,
                      canDrop: q.value,
                      perms: e.perms
                    }) : L("", !0),
                    je(he(j, K({
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
                      split: P(({ doClose: S, doRootClick: f }) => [
                        M(e.$slots, "button-save-split", {
                          doClose: S,
                          doRootClick: f,
                          dataState: c.value,
                          onButtonLoading: r,
                          onButtonLoaded: y
                        })
                      ]),
                      default: P(() => [
                        h(l)["button-save"] ? M(e.$slots, "button-save", {
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
                    ft.value && d.value.length >= e.requiredItemsForTopCreate ? (v(), O(Ut, {
                      key: 2,
                      config: ne.value,
                      disabled: !vt.value,
                      onClick: dt,
                      onAppend: Ue
                    }, null, 8, ["config", "disabled"])) : L("", !0)
                  ]),
                  _: 3
                }, 16)) : L("", !0),
                h(l)["prev-buttons-ever"] ? M(e.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: ee.value,
                  canDrop: q.value,
                  perms: e.perms
                }) : L("", !0),
                h(l)["prev-buttons"] ? M(e.$slots, "prev-buttons", {
                  key: 2,
                  canUpdate: ee.value,
                  canDrop: q.value,
                  perms: e.perms
                }) : L("", !0),
                je(he(j, K({
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
                  split: P(({ doClose: S, doRootClick: f }) => [
                    M(e.$slots, "button-save-split", {
                      doClose: S,
                      doRootClick: f,
                      dataState: c.value,
                      onButtonLoading: r,
                      onButtonLoaded: y
                    })
                  ]),
                  default: P(() => [
                    h(l)["button-save"] ? M(e.$slots, "button-save", {
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
                ft.value && d.value.length >= e.requiredItemsForTopCreate ? (v(), O(Ut, {
                  key: 3,
                  config: ne.value,
                  disabled: !vt.value,
                  onClick: dt,
                  onAppend: Ue
                }, null, 8, ["config", "disabled"])) : L("", !0),
                ve("div", Dl, [
                  je(he(j, K(H.value, {
                    checked: w.value,
                    "onUpdate:checked": p[1] || (p[1] = (S) => w.value = S)
                  }), null, 16, ["checked"]), [
                    [ze, De.value]
                  ])
                ])
              ], 512), [
                [ze, we.value]
              ]),
              h(l).buttons ? (v(), D("div", Il, [
                M(e.$slots, "buttons")
              ])) : L("", !0),
              V.value && h(l).filters ? (v(), D("div", Tl, [
                M(e.$slots, "filters", {
                  items: d.value,
                  isLoading: g.value
                })
              ])) : L("", !0),
              je(ve("div", Bl, [
                e.type === h(qe).Table ? (v(), D("table", Al, [
                  e.hideTableHeader ? L("", !0) : (v(), D("thead", El, [
                    ve("tr", null, [
                      ot.value && w.value ? (v(), D("th", Vl)) : L("", !0),
                      e.addNavigation && w.value ? (v(), D("th", Ll)) : L("", !0),
                      (v(!0), D(G, null, be(me.value, (S) => (v(), D(G, null, [
                        se.value.indexOf(S.key) === -1 ? (v(), O(kl, {
                          key: 0,
                          column: S,
                          "sort-by": k.value,
                          "sort-direction": T.value,
                          "amount-of-columns": e.columns.length,
                          items: d.value,
                          onClick: (f) => wt(S)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : L("", !0)
                      ], 64))), 256))
                    ])
                  ])),
                  ve("tbody", {
                    ref_key: "tableBody",
                    ref: I,
                    id: "lkt-table-body-" + h(Ce),
                    class: W(e.itemsContainerClass)
                  }, [
                    (v(!0), D(G, null, be(d.value, (S, f) => je((v(), O(bl, {
                      modelValue: d.value[f],
                      "onUpdate:modelValue": (N) => d.value[f] = N,
                      key: Qe(S, f),
                      i: f,
                      "is-draggable": Dt(S),
                      sortable: ot.value,
                      "visible-columns": me.value,
                      "empty-columns": se.value,
                      "add-navigation": e.addNavigation,
                      "latest-row": f + 1 === de.value,
                      "can-drop": q.value && w.value,
                      "can-edit": it.value && ee.value && w.value,
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
                      onItemDown: Y,
                      onItemDrop: x
                    }, La({ _: 2 }, [
                      h(l)[`item-${f}`] ? {
                        name: `item-${f}`,
                        fn: P((N) => [
                          M(e.$slots, `item-${f}`, Me({
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
                        fn: P((N) => [
                          M(e.$slots, "item", Me({
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
                      be(kt.value, (N) => ({
                        name: N,
                        fn: P((Ze) => [
                          M(e.$slots, N, Me({
                            [e.slotItemVar || ""]: Ze.item,
                            value: Ze.value,
                            column: Ze.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class"])), [
                      [ze, pt(d.value[f], f)]
                    ])), 128))
                  ], 10, Nl)
                ])) : e.type === h(qe).Item ? (v(), D("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: I,
                  id: "lkt-table-body-" + h(Ce),
                  class: W(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), D(G, null, be(d.value, (S, f) => (v(), D(G, {
                    key: Qe(S, f)
                  }, [
                    !e.skipTableItemsContainer && pt(S, f) ? (v(), D("div", {
                      key: 0,
                      class: W(["lkt-table-item", It(S, f)]),
                      "data-i": f
                    }, [
                      Tt.value ? (v(), O(Ae(Tt.value), K({
                        key: 0,
                        ref_for: !0
                      }, {
                        item: S,
                        index: f,
                        editing: w.value,
                        perms: E.value,
                        data: Xt.value
                      }), null, 16)) : M(e.$slots, "item", Me({
                        key: 1,
                        [e.slotItemVar || ""]: S,
                        index: f,
                        editing: w.value,
                        canCreate: ye.value,
                        canRead: Ne.value,
                        canUpdate: ee.value,
                        canDrop: q.value,
                        isLoading: g.value,
                        doDrop: () => x(f)
                      }))
                    ], 10, Ml)) : pt(S, f) ? M(e.$slots, "item", Me({
                      key: 1,
                      class: It(S, f),
                      dataI: f,
                      [e.slotItemVar || ""]: S,
                      index: f,
                      editing: w.value,
                      canCreate: ye.value,
                      canRead: Ne.value,
                      canUpdate: ee.value,
                      canDrop: q.value,
                      isLoading: g.value,
                      doDrop: () => x(f)
                    })) : L("", !0)
                  ], 64))), 128))
                ], 10, Rl)) : e.type === h(qe).Accordion ? (v(), D("div", {
                  key: 2,
                  ref_key: "tableBody",
                  ref: I,
                  id: "lkt-table-body-" + h(Ce),
                  class: W(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), D(G, null, be(d.value, (S, f) => (v(), D(G, null, [
                    [h(ke).Auto, h(ke).PreferCustomItem].includes(e.rowDisplayType) && h(l)[ut(S, f)] ? M(e.$slots, ut(S, f), {
                      key: 0,
                      item: S,
                      index: f,
                      editing: w.value,
                      isLoading: g.value
                    }) : [h(ke).Auto, h(ke).PreferCustomItem].includes(e.rowDisplayType) && h(l)[`item-${f}`] ? M(e.$slots, `item-${f}`, {
                      key: 1,
                      item: S,
                      index: f,
                      editing: w.value,
                      isLoading: g.value
                    }) : (v(), D(G, { key: 2 }, [
                      pt(S, f) ? (v(), O(ae, K({
                        class: ["lkt-table-item", It(S, f)],
                        "data-i": f,
                        key: Qe(S, f),
                        ref_for: !0
                      }, {
                        ...e.accordion,
                        title: ya(S)
                      }), {
                        header: P(() => [
                          he(qt, {
                            modelValue: d.value[f],
                            "onUpdate:modelValue": (N) => d.value[f] = N,
                            i: f,
                            column: Pe.value,
                            columns: me.value,
                            "edit-mode-enabled": w.value,
                            "has-inline-edit-perm": Ye.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])
                        ]),
                        default: P(() => [
                          (v(!0), D(G, null, be(me.value, (N) => {
                            var Ze, Wt;
                            return v(), D(G, null, [
                              N.key !== ((Ze = Pe.value) == null ? void 0 : Ze.key) && e.$slots[N.key] && h(pa)(N, d.value[f]) ? M(e.$slots, N.key, {
                                key: 0,
                                value: d.value[f][N.key],
                                item: d.value[f],
                                column: N,
                                i: f
                              }) : (v(), D(G, { key: 1 }, [
                                N.key !== ((Wt = Pe.value) == null ? void 0 : Wt.key) ? (v(), O(qt, {
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
                ], 10, Ol)) : ga.value ? (v(), O(Ae(e.type), {
                  key: 3,
                  class: W(["lkt-table-items-container", e.itemsContainerClass])
                }, {
                  default: P(() => [
                    (v(!0), D(G, null, be(d.value, (S, f) => (v(), D(G, {
                      key: Qe(S, f)
                    }, [
                      pt(S, f) ? (v(), D("li", {
                        key: 0,
                        class: W(["lkt-table-item", It(S, f)]),
                        "data-i": f
                      }, [
                        M(e.$slots, "item", Me({
                          [e.slotItemVar || ""]: S,
                          index: f,
                          editing: w.value,
                          canCreate: ye.value,
                          canRead: Ne.value,
                          canUpdate: ee.value,
                          canDrop: q.value,
                          isLoading: g.value,
                          doDrop: () => x(f)
                        }))
                      ], 10, $l)) : L("", !0)
                    ], 64))), 128))
                  ]),
                  _: 3
                }, 8, ["class"])) : e.type === h(qe).Carousel ? (v(), D("div", {
                  key: 4,
                  ref_key: "tableBody",
                  ref: I,
                  id: "lkt-table-body-" + h(Ce),
                  class: W(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  he(h(Za), K({
                    modelValue: le.value,
                    "onUpdate:modelValue": p[2] || (p[2] = (S) => le.value = S)
                  }, e.carousel, {
                    "wrap-around": ((mt = e.carousel) == null ? void 0 : mt.infinite) === !0
                  }), {
                    addons: P(() => [
                      he(h(al)),
                      he(h(ll))
                    ]),
                    default: P(() => [
                      (v(!0), D(G, null, be(St.value, (S, f) => (v(), O(h(la), {
                        key: S,
                        index: f
                      }, {
                        default: P(() => [
                          ve("div", Pl, [
                            M(e.$slots, S)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (v(!0), D(G, null, be(d.value, (S, f) => (v(), O(h(la), {
                        key: e.slide,
                        index: f
                      }, {
                        default: P(() => [
                          ve("div", Fl, [
                            Tt.value ? (v(), O(Ae(Tt.value), K({
                              key: 0,
                              ref_for: !0
                            }, {
                              item: S,
                              index: f,
                              editing: w.value,
                              perms: E.value,
                              data: Xt.value
                            }), null, 16)) : M(e.$slots, "item", Me({
                              key: 1,
                              [e.slotItemVar || ""]: S,
                              index: f,
                              editing: w.value,
                              canCreate: ye.value,
                              canRead: Ne.value,
                              canUpdate: ee.value,
                              canDrop: q.value,
                              isLoading: g.value,
                              doDrop: () => x(f)
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
              !g.value && d.value.length === 0 ? (v(), D("div", Ul, [
                h(l).empty ? M(e.$slots, "empty", { key: 0 }) : ba.value ? (v(), O(Ae(ha.value), {
                  key: 1,
                  message: e.noResultsText
                }, null, 8, ["message"])) : e.noResultsText ? (v(), D(G, { key: 2 }, [
                  et(tt(e.noResultsText), 1)
                ], 64)) : L("", !0)
              ])) : L("", !0),
              g.value ? (v(), O(ce, { key: 3 })) : L("", !0),
              ft.value || h(l).bottomButtons ? (v(), D("div", jl, [
                ft.value && d.value.length >= e.requiredItemsForBottomCreate ? (v(), O(Ut, {
                  key: 0,
                  config: ne.value,
                  disabled: !vt.value,
                  onClick: dt,
                  onAppend: Ue
                }, null, 8, ["config", "disabled"])) : L("", !0),
                M(e.$slots, "bottom-buttons")
              ])) : L("", !0),
              e.paginator && Object.keys(e.paginator).length > 0 ? (v(), O(Bt, K({
                key: 5,
                ref_key: "paginatorRef",
                ref: J
              }, e.paginator, {
                modelValue: s.value,
                "onUpdate:modelValue": p[3] || (p[3] = (S) => s.value = S),
                onLoading: Nt,
                onPerms: Xe,
                onResponse: Z
              }), null, 16, ["modelValue"])) : L("", !0),
              h(l)["web-element-actions"] ? M(e.$slots, "web-element-actions", { key: 6 }) : L("", !0)
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
