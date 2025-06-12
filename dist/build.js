import { defineComponent as fe, computed as u, ref as A, shallowReactive as zt, watch as F, watchEffect as _t, onMounted as Gt, onBeforeUnmount as Da, reactive as Pt, provide as la, h as X, useId as Ia, inject as ht, getCurrentInstance as Ba, onUnmounted as Ta, onUpdated as Aa, cloneVNode as Ea, resolveComponent as Se, createBlock as $, createElementBlock as I, unref as h, openBlock as v, mergeProps as K, withCtx as P, createTextVNode as tt, toDisplayString as at, Fragment as x, useSlots as oa, normalizeClass as W, createCommentVNode as E, createElementVNode as ce, createVNode as be, resolveDynamicComponent as he, renderSlot as O, renderList as ye, mergeDefaults as Va, nextTick as Tt, normalizeProps as Ne, withDirectives as Ue, vShow as je, createSlots as Ra } from "vue";
import { __ as La } from "lkt-i18n";
import { SortDirection as qe, Column as ia, extractPropValue as Na, ColumnType as At, FieldType as Jt, TableRowType as ke, extractI18nValue as ra, LktSettings as Te, ensureButtonConfig as ze, TablePermission as Ie, PaginatorType as Et, TableType as He, getDefaultValues as Ma, Table as Oa, ButtonType as Ft } from "lkt-vue-kernel";
import { Column as nl, createColumn as ll } from "lkt-vue-kernel";
import { generateRandomString as $a, replaceAll as _a } from "lkt-string-tools";
import { DataState as Pa } from "lkt-data-state";
import Fa from "sortablejs";
import { time as Ua } from "lkt-date-tools";
/**
 * Vue 3 Carousel 0.14.0
 * (c) 2025
 * @license MIT
 */
const ua = ["viewport", "carousel"], Rt = {
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
  const o = zt([]), i = (l) => {
    l !== void 0 ? o.slice(l).forEach((n, a) => {
      var b;
      (b = n.exposed) === null || b === void 0 || b.setIndex(l + a);
    }) : o.forEach((n, a) => {
      var b;
      (b = n.exposed) === null || b === void 0 || b.setIndex(a);
    });
  };
  return {
    cleanup: () => {
      o.splice(0, o.length);
    },
    getSlides: () => o,
    registerSlide: (l, n) => {
      if (!l || l.props.isClone)
        return;
      const a = n ?? o.length;
      o.splice(a, 0, l), i(a), t("slide-registered", { slide: l, index: a });
    },
    unregisterSlide: (l) => {
      const n = o.indexOf(l);
      n !== -1 && (t("slide-unregistered", { slide: l, index: n }), o.splice(n, 1), i(n));
    }
  };
};
function Ha(t) {
  return t.length === 0 ? 0 : t.reduce((i, l) => i + l, 0) / t.length;
}
function Qt({ slides: t, position: o, toShow: i }) {
  const l = [], n = o === "before", a = n ? -i : 0, b = n ? 0 : i;
  if (t.length <= 0)
    return l;
  for (let S = a; S < b; S++) {
    const s = {
      index: n ? S : S + t.length,
      isClone: !0,
      position: o,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${o}-${S}`
    }, m = t[(S % t.length + t.length) % t.length].vnode, w = Ea(m, s);
    w.el = null, l.push(w);
  }
  return l;
}
const qa = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function Zt(t) {
  if (!t.el || !(t.el instanceof Element))
    return;
  const o = t.el.querySelectorAll(qa);
  for (const i of o)
    i instanceof HTMLElement && !i.hasAttribute("disabled") && i.getAttribute("aria-hidden") !== "true" && i.setAttribute("tabindex", "-1");
}
function xa(t, o) {
  return Object.keys(t).filter((i) => !o.includes(i)).reduce((i, l) => (i[l] = t[l], i), {});
}
function Ga(t) {
  const { isVertical: o, isReversed: i, dragged: l, effectiveSlideSize: n } = t, a = o ? l.y : l.x;
  if (a === 0)
    return 0;
  const b = Math.round(a / n);
  return i ? b : -b;
}
function Be({ val: t, max: o, min: i }) {
  return o < i ? t : Math.min(Math.max(t, isNaN(i) ? t : i), isNaN(o) ? t : o);
}
function Xa(t) {
  const { transform: o } = window.getComputedStyle(t);
  return o.split(/[(,)]/).slice(1, -1).map((i) => parseFloat(i));
}
function Ya(t) {
  let o = 1, i = 1;
  return t.forEach((l) => {
    const n = Xa(l);
    n.length === 6 && (o /= n[0], i /= n[3]);
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
function Ht({ slideSize: t, viewportSize: o, align: i, itemsToShow: l }) {
  return l !== void 0 ? Ka(i, l) : t !== void 0 && o !== void 0 ? Wa(i, t, o) : 0;
}
function va(t = "", o = {}) {
  return Object.entries(o).reduce((i, [l, n]) => i.replace(`{${l}}`, String(n)), t);
}
function fa({ val: t, max: o, min: i = 0 }) {
  const l = o - i + 1;
  return ((t - i) % l + l) % l + i;
}
function Ut(t, o = 0) {
  let i = !1, l = 0, n = null;
  function a(...b) {
    if (i)
      return;
    i = !0;
    const S = () => {
      n = requestAnimationFrame((B) => {
        B - l > o ? (l = B, t(...b), i = !1) : S();
      });
    };
    S();
  }
  return a.cancel = () => {
    n && (cancelAnimationFrame(n), n = null, i = !1);
  }, a;
}
function Vt(t, o = "px") {
  if (!(t == null || t === ""))
    return typeof t == "number" || parseFloat(t).toString() === t ? `${t}${o}` : t;
}
const Ja = fe({
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
      const i = t in Rt ? Rt[t] : t;
      return ["ttb", "btt"].includes(i) && (!o.height || o.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${t}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: z.wrapAround,
    type: Boolean
  }
}, Za = fe({
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
  setup(t, { slots: o, emit: i, expose: l }) {
    var n;
    const a = za(i), b = a.getSlides(), S = u(() => b.length), B = A(null), s = A(null), m = A(0), w = u(() => Object.assign(Object.assign(Object.assign({}, z), xa(t, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, z.i18n), t.i18n) })), d = zt(Object.assign({}, w.value)), g = A((n = t.modelValue) !== null && n !== void 0 ? n : 0), V = A(g.value);
    F(g, (r) => V.value = r);
    const R = A(0), Ge = u(() => Math.ceil((S.value - 1) / 2)), oe = u(() => S.value - 1), ie = u(() => 0);
    let J = null, c = null, D = null;
    const re = u(() => m.value + d.gap), U = u(() => {
      const r = d.dir || "ltr";
      return r in Rt ? Rt[r] : r;
    }), ae = u(() => ["rtl", "btt"].includes(U.value)), _ = u(() => ["ttb", "btt"].includes(U.value)), ne = u(() => d.itemsToShow === "auto"), H = u(() => _.value ? "height" : "width");
    function Me() {
      var r;
      if (!Ve.value)
        return;
      const y = (w.value.breakpointMode === "carousel" ? (r = B.value) === null || r === void 0 ? void 0 : r.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, C = Object.keys(t.breakpoints || {}).map((N) => Number(N)).sort((N, Y) => +Y - +N), T = {};
      C.some((N) => y >= N ? (Object.assign(T, t.breakpoints[N]), T.i18n && Object.assign(T.i18n, w.value.i18n, t.breakpoints[N].i18n), !0) : !1), Object.assign(d, w.value, T);
    }
    const Ae = Ut(() => {
      Me(), pe(), ue();
    }), Xe = zt(/* @__PURE__ */ new Set()), Q = A([]);
    function Lt({ widthMultiplier: r, heightMultiplier: y }) {
      Q.value = b.map((C) => {
        var T;
        const N = (T = C.exposed) === null || T === void 0 ? void 0 : T.getBoundingRect();
        return {
          width: N.width * r,
          height: N.height * y
        };
      });
    }
    const Oe = A({
      width: 0,
      height: 0
    });
    function Ce({ widthMultiplier: r, heightMultiplier: y }) {
      var C;
      const T = ((C = s.value) === null || C === void 0 ? void 0 : C.getBoundingClientRect()) || { width: 0, height: 0 };
      Oe.value = {
        width: T.width * r,
        height: T.height * y
      };
    }
    function ue() {
      if (!s.value)
        return;
      const r = Ya(Xe);
      if (Ce(r), Lt(r), ne.value)
        m.value = Ha(Q.value.map((y) => y[H.value]));
      else {
        const y = Number(d.itemsToShow), C = (y - 1) * d.gap;
        m.value = (Oe.value[H.value] - C) / y;
      }
    }
    function pe() {
      !d.wrapAround && S.value > 0 && (g.value = Be({
        val: g.value,
        max: oe.value,
        min: ie.value
      })), ne.value || (d.itemsToShow = Be({
        val: Number(d.itemsToShow),
        max: S.value,
        min: 1
      }));
    }
    const nt = u(() => typeof t.ignoreAnimations == "string" ? t.ignoreAnimations.split(",") : Array.isArray(t.ignoreAnimations) ? t.ignoreAnimations : t.ignoreAnimations ? !1 : []);
    _t(() => pe()), _t(() => {
      ue();
    });
    let Ee;
    const kt = (r) => {
      const y = r.target;
      if (!(!(y != null && y.contains(B.value)) || Array.isArray(nt.value) && nt.value.includes(r.animationName)) && (Xe.add(y), !Ee)) {
        const C = () => {
          Ee = requestAnimationFrame(() => {
            ue(), C();
          });
        };
        C();
      }
    }, St = (r) => {
      const y = r.target;
      y && Xe.delete(y), Ee && Xe.size === 0 && (cancelAnimationFrame(Ee), ue());
    }, Ve = A(!1);
    typeof document < "u" && _t(() => {
      Ve.value && nt.value !== !1 ? (document.addEventListener("animationstart", kt), document.addEventListener("animationend", St)) : (document.removeEventListener("animationstart", kt), document.removeEventListener("animationend", St));
    }), Gt(() => {
      Ve.value = !0, Me(), Ct(), B.value && (D = new ResizeObserver(Ae), D.observe(B.value)), i("init");
    }), Da(() => {
      Ve.value = !1, a.cleanup(), c && clearTimeout(c), Ee && cancelAnimationFrame(Ee), J && clearInterval(J), D && (D.disconnect(), D = null), typeof document < "u" && Re(), B.value && (B.value.removeEventListener("transitionend", ue), B.value.removeEventListener("animationiteration", ue));
    });
    let we = !1;
    const me = { x: 0, y: 0 }, se = Pt({ x: 0, y: 0 }), $e = A(!1), lt = A(!1), Nt = () => {
      $e.value = !0;
    }, ot = () => {
      $e.value = !1;
    }, it = Ut((r) => {
      if (!r.ctrlKey)
        switch (r.key) {
          case "ArrowLeft":
          case "ArrowUp":
            _.value === r.key.endsWith("Up") && (ae.value ? De(!0) : We(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            _.value === r.key.endsWith("Down") && (ae.value ? We(!0) : De(!0));
            break;
        }
    }, 200), ge = () => {
      document.addEventListener("keydown", it);
    }, Re = () => {
      document.removeEventListener("keydown", it);
    };
    function Z(r) {
      const y = r.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(y) || q.value || (we = r.type === "touchstart", !we && (r.preventDefault(), r.button !== 0)))
        return;
      me.x = "touches" in r ? r.touches[0].clientX : r.clientX, me.y = "touches" in r ? r.touches[0].clientY : r.clientY;
      const C = we ? "touchmove" : "mousemove", T = we ? "touchend" : "mouseup";
      document.addEventListener(C, rt, { passive: !1 }), document.addEventListener(T, Ye, { passive: !0 });
    }
    const rt = Ut((r) => {
      lt.value = !0;
      const y = "touches" in r ? r.touches[0].clientX : r.clientX, C = "touches" in r ? r.touches[0].clientY : r.clientY;
      se.x = y - me.x, se.y = C - me.y;
      const T = Ga({
        isVertical: _.value,
        isReversed: ae.value,
        dragged: se,
        effectiveSlideSize: re.value
      });
      V.value = d.wrapAround ? g.value + T : Be({
        val: g.value + T,
        max: oe.value,
        min: ie.value
      }), i("drag", { deltaX: se.x, deltaY: se.y });
    });
    function Ye() {
      if (rt.cancel(), V.value !== g.value && !we) {
        const C = (T) => {
          T.preventDefault(), window.removeEventListener("click", C);
        };
        window.addEventListener("click", C);
      }
      Le(V.value), se.x = 0, se.y = 0, lt.value = !1;
      const r = we ? "touchmove" : "mousemove", y = we ? "touchend" : "mouseup";
      document.removeEventListener(r, rt), document.removeEventListener(y, Ye);
    }
    function Ct() {
      !d.autoplay || d.autoplay <= 0 || (J = setInterval(() => {
        d.pauseAutoplayOnHover && $e.value || De();
      }, d.autoplay));
    }
    function ut() {
      J && (clearInterval(J), J = null);
    }
    function Ke() {
      ut(), Ct();
    }
    const q = A(!1);
    function Le(r, y = !1) {
      if (!y && q.value)
        return;
      let C = r, T = r;
      R.value = g.value, d.wrapAround ? T = fa({
        val: C,
        max: oe.value,
        min: ie.value
      }) : C = Be({
        val: C,
        max: oe.value,
        min: ie.value
      }), i("slide-start", {
        slidingToIndex: r,
        currentSlideIndex: g.value,
        prevSlideIndex: R.value,
        slidesCount: S.value
      }), ut(), q.value = !0, g.value = C, T !== C && st.pause(), i("update:modelValue", T), c = setTimeout(() => {
        d.wrapAround && T !== C && (st.resume(), g.value = T, i("loop", {
          currentSlideIndex: g.value,
          slidingToIndex: r
        })), i("slide-end", {
          currentSlideIndex: g.value,
          prevSlideIndex: R.value,
          slidesCount: S.value
        }), q.value = !1, Ke();
      }, d.transition);
    }
    function De(r = !1) {
      Le(g.value + d.itemsToScroll, r);
    }
    function We(r = !1) {
      Le(g.value - d.itemsToScroll, r);
    }
    function _e() {
      Me(), pe(), ue(), Ke();
    }
    F(() => [w.value, t.breakpoints], () => Me(), { deep: !0 }), F(() => t.autoplay, () => Ke());
    const st = F(() => t.modelValue, (r) => {
      r !== g.value && Le(Number(r), !0);
    });
    i("before-init");
    const Pe = u(() => {
      if (!d.wrapAround)
        return { before: 0, after: 0 };
      if (ne.value)
        return { before: b.length, after: b.length };
      const r = Number(d.itemsToShow), y = Math.ceil(r + (d.itemsToScroll - 1)), C = y - V.value, T = y - (S.value - (V.value + 1));
      return {
        before: Math.max(0, C),
        after: Math.max(0, T)
      };
    }), le = u(() => Pe.value.before ? ne.value ? Q.value.slice(-1 * Pe.value.before).reduce((r, y) => r + y[H.value] + d.gap, 0) * -1 : Pe.value.before * re.value * -1 : 0), dt = u(() => {
      var r;
      if (ne.value) {
        const y = (g.value % b.length + b.length) % b.length;
        return Ht({
          slideSize: (r = Q.value[y]) === null || r === void 0 ? void 0 : r[H.value],
          viewportSize: Oe.value[H.value],
          align: d.snapAlign
        });
      }
      return Ht({
        align: d.snapAlign,
        itemsToShow: +d.itemsToShow
      });
    }), Je = u(() => {
      let r = 0;
      if (ne.value) {
        if (g.value < 0 ? r = Q.value.slice(g.value).reduce((y, C) => y + C[H.value] + d.gap, 0) * -1 : r = Q.value.slice(0, g.value).reduce((y, C) => y + C[H.value] + d.gap, 0), r -= dt.value, !d.wrapAround) {
          const y = Q.value.reduce((C, T) => C + T[H.value] + d.gap, 0) - Oe.value[H.value] - d.gap;
          r = Be({
            val: r,
            max: y,
            min: 0
          });
        }
      } else {
        let y = g.value - dt.value;
        d.wrapAround || (y = Be({
          val: y,
          max: S.value - +d.itemsToShow,
          min: 0
        })), r = y * re.value;
      }
      return r * (ae.value ? 1 : -1);
    }), wt = u(() => {
      var r, y;
      if (!ne.value) {
        const N = g.value - dt.value;
        return d.wrapAround ? {
          min: Math.floor(N),
          max: Math.ceil(N + Number(d.itemsToShow) - 1)
        } : {
          min: Math.floor(Be({
            val: N,
            max: S.value - Number(d.itemsToShow),
            min: 0
          })),
          max: Math.ceil(Be({
            val: N + Number(d.itemsToShow) - 1,
            max: S.value - 1,
            min: 0
          }))
        };
      }
      let C = 0;
      {
        let N = 0, Y = 0 - Pe.value.before;
        const G = Math.abs(Je.value + le.value);
        for (; N <= G; ) {
          const ee = (Y % b.length + b.length) % b.length;
          N += ((r = Q.value[ee]) === null || r === void 0 ? void 0 : r[H.value]) + d.gap, Y++;
        }
        C = Y - 1;
      }
      let T = 0;
      {
        let N = C, Y = 0;
        for (N < 0 ? Y = Q.value.slice(0, N).reduce((G, ee) => G + ee[H.value] + d.gap, 0) - Math.abs(Je.value + le.value) : Y = Q.value.slice(0, N).reduce((G, ee) => G + ee[H.value] + d.gap, 0) - Math.abs(Je.value); Y < Oe.value[H.value]; ) {
          const G = (N % b.length + b.length) % b.length;
          Y += ((y = Q.value[G]) === null || y === void 0 ? void 0 : y[H.value]) + d.gap, N++;
        }
        T = N - 1;
      }
      return {
        min: Math.floor(C),
        max: Math.ceil(T)
      };
    }), Mt = u(() => {
      if (d.slideEffect === "fade")
        return;
      const r = _.value ? "Y" : "X", y = _.value ? se.y : se.x;
      let C = Je.value + y;
      if (!d.wrapAround && d.preventExcessiveDragging) {
        let T = 0;
        ne.value ? T = Q.value.reduce((G, ee) => G + ee[H.value], 0) : T = (S.value - Number(d.itemsToShow)) * re.value;
        const N = ae.value ? 0 : -1 * T, Y = ae.value ? T : 0;
        C = Be({
          val: C,
          min: N,
          max: Y
        });
      }
      return `translate${r}(${C}px)`;
    }), Ot = u(() => ({
      "--vc-transition-duration": q.value ? Vt(d.transition, "ms") : void 0,
      "--vc-slide-gap": Vt(d.gap),
      "--vc-carousel-height": Vt(d.height),
      "--vc-cloned-offset": Vt(le.value)
    })), Dt = { slideTo: Le, next: De, prev: We }, ct = Pt({
      activeSlide: V,
      config: d,
      currentSlide: g,
      isSliding: q,
      isVertical: _,
      maxSlide: oe,
      minSlide: ie,
      nav: Dt,
      normalizedDir: U,
      slideRegistry: a,
      slideSize: m,
      slides: b,
      slidesCount: S,
      viewport: s,
      visibleRange: wt
    });
    la(xe, ct);
    const Fe = Pt({
      config: d,
      currentSlide: g,
      maxSlide: oe,
      middleSlide: Ge,
      minSlide: ie,
      slideSize: m,
      slidesCount: S
    });
    return l({
      data: Fe,
      nav: Dt,
      next: De,
      prev: We,
      restartCarousel: _e,
      slideTo: Le,
      updateBreakpointsConfig: Me,
      updateSlideSize: ue,
      updateSlidesData: pe
    }), () => {
      var r;
      const y = o.default || o.slides, C = (y == null ? void 0 : y(Fe)) || [], { before: T, after: N } = Pe.value, Y = Qt({
        slides: b,
        position: "before",
        toShow: T
      }), G = Qt({
        slides: b,
        position: "after",
        toShow: N
      }), ee = [...Y, ...C, ...G];
      if (!d.enabled || !ee.length)
        return X("section", {
          ref: B,
          class: ["carousel", "is-disabled"]
        }, ee);
      const vt = ((r = o.addons) === null || r === void 0 ? void 0 : r.call(o, Fe)) || [], Qe = X("ol", {
        class: "carousel__track",
        style: { transform: Mt.value },
        onMousedownCapture: d.mouseDrag ? Z : null,
        onTouchstartPassiveCapture: d.touchDrag ? Z : null
      }, ee), ft = X("div", { class: "carousel__viewport", ref: s }, Qe);
      return X("section", {
        ref: B,
        class: [
          "carousel",
          `is-${U.value}`,
          `is-effect-${d.slideEffect}`,
          {
            "is-vertical": _.value,
            "is-sliding": q.value,
            "is-dragging": lt.value,
            "is-hover": $e.value
          }
        ],
        dir: U.value,
        style: Ot.value,
        "aria-label": d.i18n.ariaGallery,
        tabindex: "0",
        onFocus: ge,
        onBlur: Re,
        onMouseenter: Nt,
        onMouseleave: ot
      }, [ft, vt, X(Ja)]);
    };
  }
});
var qt;
(function(t) {
  t.arrowDown = "arrowDown", t.arrowLeft = "arrowLeft", t.arrowRight = "arrowRight", t.arrowUp = "arrowUp";
})(qt || (qt = {}));
const ea = (t) => `icon${t.charAt(0).toUpperCase() + t.slice(1)}`, en = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function tn(t) {
  return t in qt;
}
const ta = (t) => t && tn(t), aa = fe({
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
      const l = en[i], n = X("path", { d: l }), a = (o == null ? void 0 : o.config.i18n[ea(i)]) || t.title, b = X("title", a);
      return X("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": a
      }, [b, n]);
    };
  }
}), an = fe({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(t, { slots: o, attrs: i }) {
    const l = ht(xe);
    if (!l)
      return () => "";
    const { next: n, prev: a } = o, b = () => ({
      btt: "arrowDown",
      ltr: "arrowLeft",
      rtl: "arrowRight",
      ttb: "arrowUp"
    })[l.normalizedDir], S = () => ({
      btt: "arrowUp",
      ltr: "arrowRight",
      rtl: "arrowLeft",
      ttb: "arrowDown"
    })[l.normalizedDir], B = u(() => !l.config.wrapAround && l.currentSlide <= l.minSlide), s = u(() => !l.config.wrapAround && l.currentSlide >= l.maxSlide);
    return () => {
      const { i18n: m } = l.config, w = X("button", Object.assign(Object.assign({ type: "button", disabled: B.value, "aria-label": m.ariaPreviousSlide, title: m.ariaPreviousSlide, onClick: l.nav.prev }, i), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": B.value },
        i.class
      ] }), (a == null ? void 0 : a()) || X(aa, { name: b() })), d = X("button", Object.assign(Object.assign({ type: "button", disabled: s.value, "aria-label": m.ariaNextSlide, title: m.ariaNextSlide, onClick: l.nav.next }, i), { class: [
        "carousel__next",
        { "carousel__next--disabled": s.value },
        i.class
      ] }), (n == null ? void 0 : n()) || X(aa, { name: S() }));
      return [w, d];
    };
  }
}), nn = fe({
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
    const i = u(() => o.config.itemsToShow), l = u(() => Ht({
      align: o.config.snapAlign,
      itemsToShow: i.value
    })), n = u(() => t.paginateByItemsToShow && i.value > 1), a = u(() => Math.ceil((o.activeSlide - l.value) / i.value)), b = u(() => Math.ceil(o.slidesCount / i.value)), S = (B) => fa(n.value ? {
      val: a.value,
      max: b.value - 1,
      min: 0
    } : {
      val: o.activeSlide,
      max: o.maxSlide,
      min: o.minSlide
    }) === B;
    return () => {
      var B, s;
      const m = [];
      for (let w = n.value ? 0 : o.minSlide; w <= (n.value ? b.value - 1 : o.maxSlide); w++) {
        const d = va(o.config.i18n[n.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: w + 1
        }), g = S(w), V = X("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": g
          },
          "aria-label": d,
          "aria-pressed": g,
          "aria-controls": (s = (B = o.slides[w]) === null || B === void 0 ? void 0 : B.exposed) === null || s === void 0 ? void 0 : s.id,
          title: d,
          disabled: t.disableOnClick,
          onClick: () => o.nav.slideTo(n.value ? Math.floor(w * +o.config.itemsToShow + l.value) : w)
        }), R = X("li", { class: "carousel__pagination-item", key: w }, V);
        m.push(R);
      }
      return X("ol", { class: "carousel__pagination" }, m);
    };
  }
}), na = fe({
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
  setup(t, { attrs: o, slots: i, expose: l }) {
    const n = ht(xe);
    if (la(xe, void 0), !n)
      return () => "";
    const a = A(t.index), b = (V) => {
      a.value = V;
    }, S = Ba(), B = () => {
      const V = S.vnode.el;
      return V ? V.getBoundingClientRect() : { width: 0, height: 0 };
    };
    l({
      id: t.id,
      setIndex: b,
      getBoundingRect: B
    });
    const s = u(() => a.value === n.activeSlide), m = u(() => a.value === n.activeSlide - 1), w = u(() => a.value === n.activeSlide + 1), d = u(() => a.value >= n.visibleRange.min && a.value <= n.visibleRange.max), g = u(() => {
      if (n.config.itemsToShow === "auto")
        return;
      const V = n.config.itemsToShow, R = n.config.gap > 0 && V > 1 ? `calc(${100 / V}% - ${n.config.gap * (V - 1) / V}px)` : `${100 / V}%`;
      return n.isVertical ? { height: R } : { width: R };
    });
    return n.slideRegistry.registerSlide(S, t.index), Ta(() => {
      n.slideRegistry.unregisterSlide(S);
    }), t.isClone && (Gt(() => {
      Zt(S.vnode);
    }), Aa(() => {
      Zt(S.vnode);
    })), () => {
      var V, R;
      return n.config.enabled ? X("li", {
        style: [o.style, Object.assign({}, g.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": t.isClone,
          "carousel__slide--visible": d.value,
          "carousel__slide--active": s.value,
          "carousel__slide--prev": m.value,
          "carousel__slide--next": w.value,
          "carousel__slide--sliding": n.isSliding
        },
        onFocusin: () => {
          n.viewport && (n.viewport.scrollLeft = 0), n.nav.slideTo(a.value);
        },
        id: t.isClone ? void 0 : t.id,
        "aria-hidden": t.isClone || void 0
      }, (R = i.default) === null || R === void 0 ? void 0 : R.call(i, {
        currentIndex: a.value,
        isActive: s.value,
        isClone: t.isClone,
        isPrev: m.value,
        isNext: w.value,
        isSliding: n.isSliding,
        isVisible: d.value
      })) : (V = i.default) === null || V === void 0 ? void 0 : V.call(i);
    };
  }
}), ln = (t, o, i, l) => {
  if (!i) return 0;
  let n = String(t[i.key]).toLowerCase(), a = String(o[i.key]).toLowerCase();
  if (l === qe.Asc) {
    if (n > a) return 1;
    if (a > n) return -1;
  } else {
    if (n > a) return -1;
    if (a > n) return 1;
  }
  return 0;
}, yt = (t, o, i, l = []) => {
  if (t.extractTitleFromColumn) {
    let n = l.find((a) => a.key === t.extractTitleFromColumn);
    if (n)
      return yt(n, o, i, l);
  }
  if (t.formatter && typeof t.formatter == "function") {
    let n = t.formatter(o[t.key], o, t, i);
    return n.startsWith("__:") ? La(n.substring(3)) : n;
  }
  return o[t.key];
}, on = (t, o, i) => {
  if (!t.colspan) return -1;
  let l = o;
  return i.forEach((n) => {
    let a = Xt(t, n);
    a > 0 && a < l && (l = a);
  }), l;
}, Xt = (t, o) => t.colspan === !1 ? !1 : typeof t.colspan == "function" ? t.colspan(o) : t.colspan, pa = (t, o) => typeof t.preferSlot > "u" ? !0 : t.preferSlot === !1 ? !1 : typeof t.preferSlot == "function" ? t.preferSlot(o) : !0, rn = (t, o, i) => {
  if (typeof t != "object" || !t.key || o.indexOf(t.key) > -1) return !1;
  let l = Xt(t, i);
  return typeof t.colspan > "u" ? !0 : (typeof t.colspan < "u" && (typeof t.colspan == "function" ? l = parseInt(t.colspan(i)) : l = parseInt(t.colspan)), l > 0);
}, un = (t = []) => {
  if (t.length > 0) {
    for (let o = 0; o < t.length; ++o)
      if (t[o].sortable) return t[o].key;
  }
  return "";
}, sn = (t, o) => {
  if (t.length > 0) {
    for (let i = 0; i < t.length; ++i)
      if (t[i].key === o) return t[i];
  }
  return null;
}, ma = (t) => {
  let o = [];
  return t.class && o.push(t.class), t.type && o.push(`is-${t.type}`), o.join(" ");
}, xt = /* @__PURE__ */ fe({
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
    const i = o, l = t, n = A(l.modelValue), a = A(n.value[l.column.key]);
    F(a, (m) => {
      const w = JSON.parse(JSON.stringify(n.value));
      w[l.column.key] = m, i("update:modelValue", w);
    }), F(() => l.modelValue, (m) => {
      n.value = m, a.value = n.value[l.column.key];
    });
    const b = u(() => ({ ...l.column.slotData, item: n.value })), S = u(() => {
      var m, w, d, g;
      if ((m = l.column.field) != null && m.modalData && typeof ((w = l.column.field) == null ? void 0 : w.modalData) == "object")
        for (let V in l.column.field.modalData)
          if (typeof ((d = l.column.field) == null ? void 0 : d.modalData[V]) == "string" && l.column.field.modalData[V].startsWith("prop:")) {
            let R = l.column.field.modalData[V].substring(5);
            n.value[R];
          } else
            l.column.field.modalData[V];
      return (g = l.column.field) == null ? void 0 : g.modalData;
    }), B = u(() => typeof l.column.field == "string" && l.column.field.startsWith("prop:") ? Na(l.column.field, n.value) : l.column.field), s = u(() => {
      var m, w, d, g;
      return l.column.type === At.Field ? !((w = (m = l.column) == null ? void 0 : m.field) != null && w.label) && (l.column.ensureFieldLabel || [
        Jt.Switch,
        Jt.Check
      ].includes((d = l.column.field) == null ? void 0 : d.type)) ? l.column.label : (g = l.column.field) == null ? void 0 : g.label : "";
    });
    return (m, w) => {
      const d = Se("lkt-anchor"), g = Se("lkt-button"), V = Se("lkt-field");
      return m.column.type === h(At).Anchor ? (v(), $(d, K({ key: 0 }, m.column.anchor, { prop: n.value }), {
        default: P(() => [
          tt(at(h(yt)(m.column, n.value, m.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : m.column.type === h(At).Button ? (v(), $(g, K({ key: 1 }, m.column.button, { prop: n.value }), {
        default: P(() => [
          tt(at(h(yt)(m.column, n.value, m.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : m.column.type === h(At).Field ? (v(), $(V, K({
        key: 2,
        modelValue: a.value,
        "onUpdate:modelValue": w[0] || (w[0] = (R) => a.value = R)
      }, {
        ...B.value,
        readMode: !m.hasInlineEditPerm || B.value.readMode,
        slotData: b.value,
        label: s.value,
        modalData: S.value,
        prop: n.value
      }), null, 16, ["modelValue"])) : (v(), I(x, { key: 3 }, [
        tt(at(h(yt)(m.column, n.value, m.i, m.columns)), 1)
      ], 64));
    };
  }
}), bt = class bt {
};
bt.navButtonSlot = "", bt.createButtonSlot = "", bt.defaultEmptySlot = void 0;
let ve = bt;
const dn = ["data-i", "data-draggable"], cn = ["data-role", "data-i"], vn = {
  key: 1,
  class: "lkt-table-nav-cell"
}, fn = { class: "lkt-table-nav-container" }, pn = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, mn = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, gn = ["colspan"], yn = ["colspan"], bn = ["data-column", "colspan", "title"], hn = /* @__PURE__ */ fe({
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
    const i = oa(), l = o, n = t, a = A(n.modelValue);
    let b = typeof n.rowDisplayType == "function" ? n.rowDisplayType(a.value, n.i) : n.rowDisplayType;
    b || (b = ke.Auto);
    const S = [ke.Auto, ke.PreferCustomItem].includes(b), B = [ke.Auto, ke.PreferItem].includes(b), s = (c) => l("click", c), m = u(() => {
      let c = [], D = !1;
      return typeof n.disabledDrag == "function" ? D = n.disabledDrag(a.value) : D = oe.value === !0, !D && n.sortable && n.isDraggable ? c.push("handle") : D && c.push("disabled"), c.join(" ");
    }), w = u(() => ve.navButtonSlot !== ""), d = u(() => ve.navButtonSlot), g = () => {
      l("item-up", n.i);
    }, V = () => {
      l("item-down", n.i);
    }, R = () => {
      l("item-drop", n.i);
    };
    F(() => n.modelValue, (c) => a.value = c), F(a, (c) => {
      l("update:modelValue", c);
    }, { deep: !0 });
    const Ge = u(() => typeof n.renderDrag == "function" ? n.renderDrag(a.value) : n.renderDrag === !0), oe = u(() => typeof n.disabledDrag == "function" ? n.disabledDrag(a.value) : n.disabledDrag === !0), ie = u(() => m.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), J = u(() => {
      let c = [];
      return S && c.push("type-custom-item"), B && c.push("type-item"), typeof n.itemContainerClass == "function" ? c.push(n.itemContainerClass(a.value, n.i)) : n.itemContainerClass !== "" && c.push(n.itemContainerClass), c.join(" ");
    });
    return (c, D) => {
      const re = Se("lkt-button");
      return v(), I("tr", {
        "data-i": c.i,
        "data-draggable": c.isDraggable,
        class: W(J.value)
      }, [
        c.sortable && c.editModeEnabled && Ge.value ? (v(), I("td", {
          key: 0,
          "data-role": ie.value,
          class: W(m.value),
          "data-i": c.i
        }, D[2] || (D[2] = [
          ce("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]), 10, cn)) : E("", !0),
        c.addNavigation && c.editModeEnabled ? (v(), I("td", vn, [
          ce("div", fn, [
            be(re, {
              palette: "table-nav",
              disabled: c.i === 0,
              onClick: g
            }, {
              default: P(() => [
                w.value ? (v(), $(he(d.value), {
                  key: 0,
                  direction: "up"
                })) : (v(), I("i", pn))
              ]),
              _: 1
            }, 8, ["disabled"]),
            be(re, {
              palette: "table-nav",
              disabled: c.latestRow,
              onClick: V
            }, {
              default: P(() => [
                w.value ? (v(), $(he(d.value), {
                  key: 0,
                  direction: "down"
                })) : (v(), I("i", mn))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : E("", !0),
        h(S) && h(i)[`item-${c.i}`] ? (v(), I("td", {
          key: "td" + c.i,
          colspan: c.visibleColumns.length
        }, [
          O(c.$slots, `item-${c.i}`, {
            item: a.value,
            index: c.i,
            editing: c.editModeEnabled,
            canCreate: c.canCreate,
            canRead: c.canRead,
            canUpdate: c.canEdit,
            canDrop: c.canDrop,
            isLoading: c.isLoading,
            doDrop: () => R()
          })
        ], 8, gn)) : h(B) && h(i).item ? (v(), I("td", {
          key: "td" + c.i,
          colspan: c.visibleColumns.length
        }, [
          O(c.$slots, "item", {
            item: a.value,
            index: c.i,
            editing: c.editModeEnabled,
            canCreate: c.canCreate,
            canRead: c.canRead,
            canUpdate: c.canEdit,
            canDrop: c.canDrop,
            isLoading: c.isLoading,
            doDrop: () => R()
          })
        ], 8, yn)) : (v(!0), I(x, { key: 4 }, ye(c.visibleColumns, (U) => (v(), I(x, null, [
          h(rn)(U, c.emptyColumns, a.value) ? (v(), I("td", {
            key: "td" + c.i,
            "data-column": U.key,
            colspan: h(Xt)(U, a.value),
            title: h(yt)(U, a.value, c.i, c.visibleColumns),
            class: W(h(ma)(U)),
            onClick: D[1] || (D[1] = (ae) => s(ae))
          }, [
            c.$slots[U.key] && h(pa)(U, a.value) ? O(c.$slots, U.key, {
              key: 0,
              value: a.value[U.key],
              item: a.value,
              column: U,
              i: c.i
            }) : a.value ? (v(), $(xt, {
              key: 1,
              modelValue: a.value,
              "onUpdate:modelValue": D[0] || (D[0] = (ae) => a.value = ae),
              column: U,
              columns: c.visibleColumns,
              "edit-mode-enabled": c.editModeEnabled,
              "has-inline-edit-perm": c.hasInlineEditPerm,
              i: c.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : E("", !0)
          ], 10, bn)) : E("", !0)
        ], 64))), 256))
      ], 10, dn);
    };
  }
}), jt = /* @__PURE__ */ fe({
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
    var s;
    const i = o, l = t, n = u(() => ve.createButtonSlot !== ""), a = u(() => ve.createButtonSlot), b = {
      ...(s = l.config) == null ? void 0 : s.modalData,
      beforeClose: (m) => {
        "itemCreated" in m && m.itemCreated === !0 && i("append", m.item);
      }
    }, S = {
      ...l.config
    };
    S.modalData = b;
    const B = () => {
      var m;
      if (!((m = l.config) != null && m.modal)) {
        i("click");
        return;
      }
    };
    return (m, w) => {
      const d = Se("lkt-button");
      return v(), $(d, K(S, {
        disabled: m.disabled,
        onClick: B
      }), {
        default: P(() => [
          n.value ? (v(), $(he(a.value), { key: 0 })) : E("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), kn = ["data-column", "data-sortable", "data-sort", "colspan", "title"], Sn = /* @__PURE__ */ fe({
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
    const i = o, l = t, n = u(() => on(l.column, l.amountOfColumns, l.items)), a = u(() => l.column.sortable === !0), b = u(() => a.value && l.sortBy === l.column.key ? l.sortDirection : ""), S = u(() => ra(l.column.label)), B = u(() => a.value && l.sortBy === l.column.key ? l.sortDirection === qe.Asc ? Te.defaultTableSortAscIcon : l.sortDirection === qe.Desc ? Te.defaultTableSortDescIcon : "" : ""), s = () => i("click", l.column);
    return (m, w) => (v(), I("th", {
      "data-column": m.column.key,
      "data-sortable": a.value,
      "data-sort": b.value,
      colspan: n.value,
      title: S.value,
      class: W(h(ma)(m.column)),
      onClick: s
    }, [
      ce("div", null, [
        tt(at(S.value) + " ", 1),
        B.value ? (v(), I("i", {
          key: 0,
          class: W(B.value)
        }, null, 2)) : E("", !0)
      ])
    ], 10, kn));
  }
}), Cn = ["id"], wn = { class: "lkt-table-page-buttons" }, Dn = { class: "switch-edition-mode" }, In = { class: "switch-edition-mode" }, Bn = {
  key: 0,
  class: "lkt-table-page-buttons"
}, Tn = {
  key: 1,
  class: "lkt-table-page-filters"
}, An = { class: "lkt-table" }, En = { key: 0 }, Vn = { key: 0 }, Rn = {
  key: 0,
  "data-role": "drag-indicator"
}, Ln = { key: 1 }, Nn = ["id"], Mn = ["id"], On = ["data-i"], $n = ["id"], _n = ["data-i"], Pn = ["id"], Fn = { class: "lkt-carousel-slide" }, Un = { class: "lkt-carousel-slide" }, jn = {
  key: 2,
  class: "lkt-table-empty"
}, zn = {
  key: 4,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, Hn = /* @__PURE__ */ fe({
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
    createEnabledValidator: { type: Function },
    events: {}
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
    const l = i, n = oa(), a = t, b = A(typeof a.sorter == "function" ? a.sorter : ln), S = A(un(a.columns)), B = A(qe.Asc), s = A(a.modelValue), m = A(null), w = A(a.columns), d = A((Yt = a.paginator) == null ? void 0 : Yt.modelValue), g = A(a.loading), V = A(!1), R = A(a.perms), Ge = A(null), oe = A(null), ie = A(null), J = A({}), c = A(new Pa({ items: s.value }, a.dataStateConfig)), D = A(a.editMode), re = A(0), U = A(null), ae = A(((Kt = a.carousel) == null ? void 0 : Kt.currentSlide) || 0), _ = A(ze(a.saveButton, Te.defaultSaveButton)), ne = A(ze(a.createButton, Te.defaultCreateButton)), H = A(ze(a.editModeButton, Te.defaultEditModeButton)), Me = A(ze(a.groupButton, Te.defaultGroupButton));
    F(() => a.saveButton, (e) => _.value = ze(a.saveButton, Te.defaultSaveButton)), F(() => a.createButton, (e) => ne.value = ze(a.createButton, Te.defaultCreateButton)), F(() => a.editModeButton, (e) => H.value = ze(a.editModeButton, Te.defaultEditModeButton));
    const Ae = A(!1);
    F(g, (e) => l("update:loading", e)), F(d, (e) => l("page", e));
    const Xe = (e) => {
      R.value = e;
    }, Q = (e) => {
      var p;
      if (Array.isArray(e.data)) {
        let M = e.data;
        typeof ((p = a.events) == null ? void 0 : p.parseResults) == "function" && (M = a.events.parseResults(M)), s.value = [...s.value, ...M];
      }
      g.value = !1, V.value = !0, c.value.store({ items: s.value }).turnStoredIntoOriginal(), Ae.value = !1, Tt(() => {
        me.value, l("read-response", e);
      });
    }, Lt = () => Tt(() => {
      var e;
      (!a.paginator || ![Et.LoadMore, Et.Infinite].includes((e = a.paginator) == null ? void 0 : e.type)) && s.value.splice(0, s.value.length), g.value = !0;
    }), Oe = () => {
      Ge.value.doRefresh();
    }, Ce = $a(12), ue = u(() => {
      if (!a.hideEmptyColumns) return [];
      let e = [];
      return w.value.forEach((p) => {
        let M = p.key, j = !1;
        s.value.forEach((te) => {
          if (typeof te.checkEmpty == "function")
            return te.checkEmpty(te);
          te[M] && (j = !0);
        }), j || e.push(M);
      }), e;
    }), pe = u(() => w.value.filter((e) => !e.hidden)), nt = u(() => w.value.filter((e) => e.isForRowKey)), Ee = u(() => w.value.map((e) => e.key)), kt = u(() => {
      let e = [];
      for (let p in n) Ee.value.indexOf(p) !== -1 && e.push(p);
      return e;
    }), St = u(() => {
      let e = [];
      for (let p in n) p.indexOf("slide-") !== -1 && e.push(p);
      return e;
    }), Ve = u(() => {
      var e;
      return a.hiddenSave || g.value || !((e = _.value) != null && e.resource || _.value.type) ? !1 : D.value && Ae.value ? !0 : D.value;
    }), we = u(() => pt.value && s.value.length >= a.requiredItemsForTopCreate || De.value ? !0 : Ve.value || D.value && ge.value), me = u(() => {
      var e, p;
      return re.value, typeof ((e = _.value) == null ? void 0 : e.disabled) == "function" ? _.value.disabled({
        value: s.value,
        dataState: c.value
      }) : typeof ((p = _.value) == null ? void 0 : p.disabled) == "boolean" ? _.value.disabled : !Ae.value;
    }), se = u(() => s.value.length), $e = u(() => {
      var e;
      return {
        items: s.value,
        ...(e = _.value) == null ? void 0 : e.resourceData
      };
    }), lt = u(() => a.titleTag === "" ? "h2" : a.titleTag), Nt = u(() => a.wrapContentTag === "" ? "div" : a.wrapContentTag), ot = u(() => ra(a.title)), it = u(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }), ge = u(() => R.value.includes(Ie.Create)), Re = u(() => R.value.includes("read")), Z = u(() => R.value.includes(Ie.Update)), rt = u(() => R.value.includes(Ie.Edit)), Ye = u(() => R.value.includes(Ie.InlineEdit)), Ct = u(() => R.value.includes(Ie.ModalCreate)), ut = u(() => R.value.includes(Ie.InlineCreate)), Ke = u(() => R.value.includes(Ie.InlineCreateEver)), q = u(() => R.value.includes(Ie.Drop)), Le = u(() => R.value.includes(Ie.SwitchEditMode)), De = u(() => !Le.value || !Z.value && !q.value || !Z.value && q.value ? !1 : !g.value), We = u(() => {
      var e;
      return (typeof ((e = a.paginator) == null ? void 0 : e.type) < "u" && [Et.LoadMore, Et.Infinite].includes(a.paginator.type) || !g.value) && s.value.length > 0;
    }), _e = u(() => w.value.find((e) => e.isForAccordionHeader)), st = (e, p) => typeof a.customItemSlotName == "function" ? a.customItemSlotName(e, p) : "", Pe = (e) => {
      let p = e.target;
      if (typeof p.dataset.column > "u")
        do
          p = p.parentNode;
        while (typeof p.dataset.column > "u" && p.tagName !== "TABLE" && p.tagName !== "body");
      if (p.tagName === "TD" && (p = p.parentNode, p = p.dataset.i, typeof p < "u"))
        return s.value[p];
    }, le = () => {
      re.value = Ua();
    }, dt = (e) => s.value[e], Je = (e) => {
      var p;
      return (p = m.value) == null ? void 0 : p.querySelector(`[data-i="${e}"]`);
    }, wt = (e) => {
      e && e.sortable && (s.value = s.value.sort((p, M) => b.value(p, M, e, B.value)), B.value = B.value === qe.Asc ? qe.Desc : qe.Asc, S.value = e.key, le(), l("sort", [S.value, B.value]));
    }, Mt = (e) => {
      l("click", e);
    }, Ot = (e) => {
      var M, j, te, de, Bt, gt, k, f;
      let p = parseInt((de = (te = (j = (M = e == null ? void 0 : e.originalEvent) == null ? void 0 : M.toElement) == null ? void 0 : j.closest("tr")) == null ? void 0 : te.dataset) == null ? void 0 : de.i);
      return !(typeof ((Bt = a.drag) == null ? void 0 : Bt.isValid) == "function" && !((gt = a.drag) != null && gt.isValid(s.value[p])) || typeof ((k = a.drag) == null ? void 0 : k.isValid) == "boolean" && !((f = a.drag) != null && f.isValid));
    }, Dt = (e) => {
      var p, M;
      return typeof ((p = a.drag) == null ? void 0 : p.isDraggable) == "function" ? (M = a.drag) == null ? void 0 : M.isDraggable(e) : !0;
    }, ct = () => {
      if (ge.value) {
        l("click-create");
        return;
      }
      if (ut.value || Ke.value) {
        if (typeof a.newValueGenerator == "function") {
          let e = a.newValueGenerator();
          if (typeof e == "object" || a.type !== He.Table) {
            s.value.push(e);
            return;
          }
        }
        s.value.push({});
      } else
        l("click-create");
    }, Fe = (e) => {
      s.value.push(e);
    }, r = () => g.value = !0, y = () => g.value = !1, C = (e, p) => {
      var M, j, te;
      if (!((M = _.value) != null && M.type && [
        Ft.Split,
        Ft.SplitEver,
        Ft.SplitLazy
      ].includes((j = _.value) == null ? void 0 : j.type))) {
        if (l("before-save"), (te = _.value) != null && te.resource && (g.value = !1, !p.success)) {
          l("error", p.httpStatus);
          return;
        }
        c.value.turnStoredIntoOriginal(), Ae.value = !1, l("save", p);
      }
    }, T = (e, p, M) => {
      if (M >= e.length) {
        let j = M - e.length + 1;
        for (; j--; ) e.push(void 0);
      }
      return e.splice(M, 0, e.splice(p, 1)[0]), e;
    }, N = (e) => {
      T(s.value, e, e - 1), le();
    }, Y = (e) => {
      T(s.value, e, e + 1), le();
    }, G = (e) => {
      s.value.splice(e, 1), le();
    }, ee = () => {
      var e;
      J.value && typeof ((e = J.value) == null ? void 0 : e.destroy) == "function" && (J.value.destroy(), J.value = {});
    }, vt = () => {
      U.value || (U.value = document.getElementById("lkt-table-body-" + Ce)), J.value = new Fa(U.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let p = e.oldIndex, M = e.newIndex;
          s.value.splice(M, 0, s.value.splice(p, 1)[0]), le(), l("drag-end", s.value[M]);
        },
        onMove: function(e, p) {
          return Ot(e);
        }
      });
    }, Qe = (e, p, M = !1) => {
      let j = [re.value, Ce, "row", p];
      return M && j.push("hidden"), nt.value.forEach((te) => {
        let de = String(e[te.key]).toLowerCase();
        de.length > 50 && (de = de.substring(0, 50)), de = _a(de, " ", "-"), j.push(de);
      }), j.join("-");
    }, ft = u(() => typeof a.createEnabledValidator == "function" ? a.createEnabledValidator({ items: s.value }) : !0), pt = u(() => a.createButton === !1 ? !1 : Ke.value || ge.value && D.value || ut.value && D.value || Ct.value && D.value), ga = u(() => [He.Ol, He.Ul].includes(a.type)), mt = (e, p) => typeof a.itemDisplayChecker == "function" ? a.itemDisplayChecker(e, p) : !0, It = (e, p) => typeof a.itemContainerClass == "function" ? a.itemContainerClass(e, p) : a.itemContainerClass, ya = (e, p) => _e.value ? e[_e.value.key] : "", Ze = u(() => typeof a.itemSlotComponent == "function" ? a.itemSlotComponent() : a.itemSlotComponent), $t = u(() => typeof a.itemSlotData == "function" ? a.itemSlotData() : a.itemSlotData);
    Gt(() => {
      var e;
      a.initialSorting && wt(sn(a.columns, S.value)), c.value.store({ items: s.value }).turnStoredIntoOriginal(), Ae.value = !1, (e = a.drag) != null && e.enabled && Tt(() => {
        vt();
      });
    }), F(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }, (e) => {
      e ? vt() : ee();
    }), F(() => a.type, (e) => {
      var p;
      (p = a.drag) != null && p.enabled ? vt() : ee();
    }), F(() => a.perms, (e) => R.value = e), F(R, (e) => l("update:perms", e)), F(D, (e) => {
      l("update:editMode", e);
    }), F(() => a.editMode, (e) => D.value = e), F(() => a.columns, (e) => w.value = e, { deep: !0 }), F(() => a.modelValue, (e) => {
      s.value = e;
    }, { deep: !0 }), F(s, (e) => {
      c.value.increment({ items: e }), Ae.value = c.value.changed(), l("update:modelValue", e);
    }, { deep: !0 }), o({
      getItemByEvent: Pe,
      getItemByIndex: dt,
      getRowByIndex: Je,
      doRefresh: Oe,
      doRemoveIndex: (e) => {
        s.value.splice(e, 1), le();
      },
      getHtml: () => oe.value,
      reRender: le,
      turnStoredIntoOriginal: () => {
        c.value.turnStoredIntoOriginal(), Tt(() => {
          le();
        });
      }
    });
    const ba = u(() => typeof ve.defaultEmptySlot < "u"), ha = u(() => ve.defaultEmptySlot), ka = u(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled ? !1 : typeof a.drag.canRender > "u" ? !0 : a.drag.canRender), Sa = u(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled || typeof a.drag.isDisabled > "u" ? !1 : a.drag.isDisabled), Ca = u(() => typeof a.header == "object" && Object.keys(a.header).length > 0);
    return (e, p) => {
      const M = Se("lkt-header"), j = Se("lkt-button"), te = Se("lkt-accordion"), de = Se("lkt-loader"), Bt = Se("lkt-paginator");
      return v(), I("section", {
        ref_key: "element",
        ref: oe,
        class: "lkt-table-page",
        id: "lkt-table-page-" + h(Ce)
      }, [
        Ca.value ? (v(), $(M, Ne(K({ key: 0 }, e.header)), null, 16)) : ot.value || h(n).title ? (v(), I("header", {
          key: 1,
          class: W(e.headerClass)
        }, [
          ot.value ? (v(), $(he(lt.value), { key: 0 }, {
            default: P(() => [
              e.titleIcon ? (v(), I("i", {
                key: 0,
                class: W(e.titleIcon)
              }, null, 2)) : E("", !0),
              tt(" " + at(ot.value), 1)
            ]),
            _: 1
          })) : E("", !0),
          h(n).title ? O(e.$slots, "title", { key: 1 }) : E("", !0)
        ], 2)) : E("", !0),
        (v(), $(he(Nt.value), {
          class: W(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: P(() => {
            var gt;
            return [
              Ue(ce("div", wn, [
                e.groupButton !== !1 ? (v(), $(j, K({
                  key: 0,
                  ref: "groupButton"
                }, Me.value, { class: "lkt-item-crud-group-button" }), {
                  split: P(() => [
                    ce("div", Dn, [
                      Ue(be(j, K(H.value, {
                        checked: D.value,
                        "onUpdate:checked": p[0] || (p[0] = (k) => D.value = k)
                      }), null, 16, ["checked"]), [
                        [je, De.value]
                      ])
                    ]),
                    h(n)["prev-buttons-ever"] ? O(e.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: Z.value,
                      canDrop: q.value,
                      perms: e.perms
                    }) : E("", !0),
                    h(n)["prev-buttons"] ? O(e.$slots, "prev-buttons", {
                      key: 1,
                      canUpdate: Z.value,
                      canDrop: q.value,
                      perms: e.perms
                    }) : E("", !0),
                    Ue(be(j, K({
                      class: "lkt-table--save-button",
                      ref_key: "saveButtonRef",
                      ref: ie
                    }, {
                      ..._.value,
                      disabled: me.value,
                      resourceData: $e.value
                    }, {
                      onLoading: r,
                      onLoaded: y,
                      onClick: C
                    }), {
                      split: P(({ doClose: k, doRootClick: f }) => [
                        O(e.$slots, "button-save-split", {
                          doClose: k,
                          doRootClick: f,
                          dataState: c.value,
                          onButtonLoading: r,
                          onButtonLoaded: y
                        })
                      ]),
                      default: P(() => [
                        h(n)["button-save"] ? O(e.$slots, "button-save", {
                          key: 0,
                          items: s.value,
                          editMode: e.editMode,
                          canUpdate: !me.value
                        }) : E("", !0)
                      ]),
                      _: 3
                    }, 16), [
                      [je, Ve.value]
                    ]),
                    pt.value && s.value.length >= e.requiredItemsForTopCreate ? (v(), $(jt, {
                      key: 2,
                      config: ne.value,
                      disabled: !ft.value,
                      onClick: ct,
                      onAppend: Fe
                    }, null, 8, ["config", "disabled"])) : E("", !0)
                  ]),
                  _: 3
                }, 16)) : E("", !0),
                h(n)["prev-buttons-ever"] ? O(e.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: Z.value,
                  canDrop: q.value,
                  perms: e.perms
                }) : E("", !0),
                h(n)["prev-buttons"] ? O(e.$slots, "prev-buttons", {
                  key: 2,
                  canUpdate: Z.value,
                  canDrop: q.value,
                  perms: e.perms
                }) : E("", !0),
                Ue(be(j, K({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: ie
                }, {
                  ..._.value,
                  disabled: me.value,
                  resourceData: $e.value
                }, {
                  onLoading: r,
                  onLoaded: y,
                  onClick: C
                }), {
                  split: P(({ doClose: k, doRootClick: f }) => [
                    O(e.$slots, "button-save-split", {
                      doClose: k,
                      doRootClick: f,
                      dataState: c.value,
                      onButtonLoading: r,
                      onButtonLoaded: y
                    })
                  ]),
                  default: P(() => [
                    h(n)["button-save"] ? O(e.$slots, "button-save", {
                      key: 0,
                      items: s.value,
                      editMode: e.editMode,
                      canUpdate: !me.value
                    }) : E("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [je, Ve.value]
                ]),
                pt.value && s.value.length >= e.requiredItemsForTopCreate ? (v(), $(jt, {
                  key: 3,
                  config: ne.value,
                  disabled: !ft.value,
                  onClick: ct,
                  onAppend: Fe
                }, null, 8, ["config", "disabled"])) : E("", !0),
                ce("div", In, [
                  Ue(be(j, K(H.value, {
                    checked: D.value,
                    "onUpdate:checked": p[1] || (p[1] = (k) => D.value = k)
                  }), null, 16, ["checked"]), [
                    [je, De.value]
                  ])
                ])
              ], 512), [
                [je, we.value]
              ]),
              h(n).buttons ? (v(), I("div", Bn, [
                O(e.$slots, "buttons")
              ])) : E("", !0),
              V.value && h(n).filters ? (v(), I("div", Tn, [
                O(e.$slots, "filters", {
                  items: s.value,
                  isLoading: g.value
                })
              ])) : E("", !0),
              Ue(ce("div", An, [
                e.type === h(He).Table ? (v(), I("table", En, [
                  e.hideTableHeader ? E("", !0) : (v(), I("thead", Vn, [
                    ce("tr", null, [
                      it.value && D.value ? (v(), I("th", Rn)) : E("", !0),
                      e.addNavigation && D.value ? (v(), I("th", Ln)) : E("", !0),
                      (v(!0), I(x, null, ye(pe.value, (k) => (v(), I(x, null, [
                        ue.value.indexOf(k.key) === -1 ? (v(), $(Sn, {
                          key: 0,
                          column: k,
                          "sort-by": S.value,
                          "sort-direction": B.value,
                          "amount-of-columns": e.columns.length,
                          items: s.value,
                          onClick: (f) => wt(k)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : E("", !0)
                      ], 64))), 256))
                    ])
                  ])),
                  ce("tbody", {
                    ref_key: "tableBody",
                    ref: m,
                    id: "lkt-table-body-" + h(Ce),
                    class: W(e.itemsContainerClass)
                  }, [
                    (v(!0), I(x, null, ye(s.value, (k, f) => Ue((v(), $(hn, {
                      modelValue: s.value[f],
                      "onUpdate:modelValue": (L) => s.value[f] = L,
                      key: Qe(k, f),
                      i: f,
                      "is-draggable": Dt(k),
                      sortable: it.value,
                      "visible-columns": pe.value,
                      "empty-columns": ue.value,
                      "add-navigation": e.addNavigation,
                      "latest-row": f + 1 === se.value,
                      "can-drop": q.value && D.value,
                      "can-edit": rt.value && Z.value && D.value,
                      "can-read": Re.value,
                      "can-create": ge.value,
                      "edit-mode-enabled": D.value,
                      "has-inline-edit-perm": Ye.value,
                      "row-display-type": e.rowDisplayType,
                      "render-drag": ka.value,
                      "disabled-drag": Sa.value,
                      "is-loading": g.value,
                      "item-container-class": e.itemContainerClass,
                      onClick: Mt,
                      onItemUp: N,
                      onItemDown: Y,
                      onItemDrop: G
                    }, Ra({ _: 2 }, [
                      h(n)[`item-${f}`] ? {
                        name: `item-${f}`,
                        fn: P((L) => [
                          O(e.$slots, `item-${f}`, Ne({
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
                      } : h(n).item ? {
                        name: "item",
                        fn: P((L) => [
                          O(e.$slots, "item", Ne({
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
                      ye(kt.value, (L) => ({
                        name: L,
                        fn: P((et) => [
                          O(e.$slots, L, Ne({
                            [e.slotItemVar || ""]: et.item,
                            value: et.value,
                            column: et.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class"])), [
                      [je, mt(s.value[f], f)]
                    ])), 128))
                  ], 10, Nn)
                ])) : e.type === h(He).Item ? (v(), I("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: m,
                  id: "lkt-table-body-" + h(Ce),
                  class: W(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), I(x, null, ye(s.value, (k, f) => (v(), I(x, {
                    key: Qe(k, f)
                  }, [
                    !e.skipTableItemsContainer && mt(k, f) ? (v(), I("div", {
                      key: 0,
                      class: W(["lkt-table-item", It(k, f)]),
                      "data-i": f
                    }, [
                      Ze.value ? (v(), $(he(Ze.value), K({
                        key: 0,
                        ref_for: !0
                      }, {
                        item: k,
                        index: f,
                        editing: D.value,
                        perms: R.value,
                        data: $t.value,
                        events: e.itemSlotEvents
                      }), null, 16)) : O(e.$slots, "item", Ne({
                        key: 1,
                        [e.slotItemVar || ""]: k,
                        index: f,
                        editing: D.value,
                        canCreate: ge.value,
                        canRead: Re.value,
                        canUpdate: Z.value,
                        canDrop: q.value,
                        isLoading: g.value,
                        doDrop: () => G(f)
                      }))
                    ], 10, On)) : mt(k, f) ? O(e.$slots, "item", Ne({
                      key: 1,
                      class: It(k, f),
                      dataI: f,
                      [e.slotItemVar || ""]: k,
                      index: f,
                      editing: D.value,
                      canCreate: ge.value,
                      canRead: Re.value,
                      canUpdate: Z.value,
                      canDrop: q.value,
                      isLoading: g.value,
                      doDrop: () => G(f)
                    })) : E("", !0)
                  ], 64))), 128))
                ], 10, Mn)) : e.type === h(He).Accordion ? (v(), I("div", {
                  key: 2,
                  ref_key: "tableBody",
                  ref: m,
                  id: "lkt-table-body-" + h(Ce),
                  class: W(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), I(x, null, ye(s.value, (k, f) => (v(), I(x, null, [
                    [h(ke).Auto, h(ke).PreferCustomItem].includes(e.rowDisplayType) && h(n)[st(k, f)] ? O(e.$slots, st(k, f), {
                      key: 0,
                      item: k,
                      index: f,
                      editing: D.value,
                      isLoading: g.value
                    }) : [h(ke).Auto, h(ke).PreferCustomItem].includes(e.rowDisplayType) && h(n)[`item-${f}`] ? O(e.$slots, `item-${f}`, {
                      key: 1,
                      item: k,
                      index: f,
                      editing: D.value,
                      isLoading: g.value
                    }) : (v(), I(x, { key: 2 }, [
                      mt(k, f) ? (v(), $(te, K({
                        class: ["lkt-table-item", It(k, f)],
                        "data-i": f,
                        key: Qe(k, f)
                      }, { ref_for: !0 }, {
                        ...e.accordion,
                        title: ya(k)
                      }), {
                        header: P(() => [
                          be(xt, {
                            modelValue: s.value[f],
                            "onUpdate:modelValue": (L) => s.value[f] = L,
                            i: f,
                            column: _e.value,
                            columns: pe.value,
                            "edit-mode-enabled": D.value,
                            "has-inline-edit-perm": Ye.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])
                        ]),
                        default: P(() => [
                          (v(!0), I(x, null, ye(pe.value, (L) => {
                            var et, Wt;
                            return v(), I(x, null, [
                              L.key !== ((et = _e.value) == null ? void 0 : et.key) && e.$slots[L.key] && h(pa)(L, s.value[f]) ? O(e.$slots, L.key, {
                                key: 0,
                                value: s.value[f][L.key],
                                item: s.value[f],
                                column: L,
                                i: f
                              }) : (v(), I(x, { key: 1 }, [
                                L.key !== ((Wt = _e.value) == null ? void 0 : Wt.key) ? (v(), $(xt, {
                                  key: 0,
                                  modelValue: s.value[f],
                                  "onUpdate:modelValue": (wa) => s.value[f] = wa,
                                  i: f,
                                  column: L,
                                  columns: pe.value,
                                  "edit-mode-enabled": D.value,
                                  "has-inline-edit-perm": Ye.value
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])) : E("", !0)
                              ], 64))
                            ], 64);
                          }), 256))
                        ]),
                        _: 2
                      }, 1040, ["class", "data-i"])) : E("", !0)
                    ], 64))
                  ], 64))), 256))
                ], 10, $n)) : ga.value ? (v(), $(he(e.type), {
                  key: 3,
                  class: W(["lkt-table-items-container", e.itemsContainerClass])
                }, {
                  default: P(() => [
                    (v(!0), I(x, null, ye(s.value, (k, f) => (v(), I(x, {
                      key: Qe(k, f)
                    }, [
                      mt(k, f) ? (v(), I("li", {
                        key: 0,
                        class: W(["lkt-table-item", It(k, f)]),
                        "data-i": f
                      }, [
                        Ze.value ? (v(), $(he(Ze.value), K({
                          key: 0,
                          ref_for: !0
                        }, {
                          item: k,
                          index: f,
                          editing: D.value,
                          perms: R.value,
                          data: $t.value,
                          events: e.itemSlotEvents
                        }), null, 16)) : O(e.$slots, "item", Ne({
                          key: 1,
                          [e.slotItemVar || ""]: k,
                          index: f,
                          editing: D.value,
                          canCreate: ge.value,
                          canRead: Re.value,
                          canUpdate: Z.value,
                          canDrop: q.value,
                          isLoading: g.value,
                          doDrop: () => G(f)
                        }))
                      ], 10, _n)) : E("", !0)
                    ], 64))), 128))
                  ]),
                  _: 3
                }, 8, ["class"])) : e.type === h(He).Carousel ? (v(), I("div", {
                  key: 4,
                  ref_key: "tableBody",
                  ref: m,
                  id: "lkt-table-body-" + h(Ce),
                  class: W(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  be(h(Za), K({
                    modelValue: ae.value,
                    "onUpdate:modelValue": p[2] || (p[2] = (k) => ae.value = k)
                  }, e.carousel, {
                    "wrap-around": ((gt = e.carousel) == null ? void 0 : gt.infinite) === !0
                  }), {
                    addons: P(() => [
                      be(h(an)),
                      be(h(nn))
                    ]),
                    default: P(() => [
                      (v(!0), I(x, null, ye(St.value, (k, f) => (v(), $(h(na), {
                        key: k,
                        index: f
                      }, {
                        default: P(() => [
                          ce("div", Fn, [
                            O(e.$slots, k)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (v(!0), I(x, null, ye(s.value, (k, f) => (v(), $(h(na), {
                        key: e.slide,
                        index: f
                      }, {
                        default: P(() => [
                          ce("div", Un, [
                            Ze.value ? (v(), $(he(Ze.value), K({
                              key: 0,
                              ref_for: !0
                            }, {
                              item: k,
                              index: f,
                              editing: D.value,
                              perms: R.value,
                              data: $t.value,
                              events: e.itemSlotEvents
                            }), null, 16)) : O(e.$slots, "item", Ne({
                              key: 1,
                              [e.slotItemVar || ""]: k,
                              index: f,
                              editing: D.value,
                              canCreate: ge.value,
                              canRead: Re.value,
                              canUpdate: Z.value,
                              canDrop: q.value,
                              isLoading: g.value,
                              doDrop: () => G(f)
                            }))
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128))
                    ]),
                    _: 3
                  }, 16, ["modelValue", "wrap-around"])
                ], 10, Pn)) : E("", !0)
              ], 512), [
                [je, We.value]
              ]),
              !g.value && s.value.length === 0 ? (v(), I("div", jn, [
                h(n).empty ? O(e.$slots, "empty", { key: 0 }) : ba.value ? (v(), $(he(ha.value), {
                  key: 1,
                  message: e.noResultsText
                }, null, 8, ["message"])) : e.noResultsText ? (v(), I(x, { key: 2 }, [
                  tt(at(e.noResultsText), 1)
                ], 64)) : E("", !0)
              ])) : E("", !0),
              g.value ? (v(), $(de, { key: 3 })) : E("", !0),
              pt.value || h(n).bottomButtons ? (v(), I("div", zn, [
                pt.value && s.value.length >= e.requiredItemsForBottomCreate ? (v(), $(jt, {
                  key: 0,
                  config: ne.value,
                  disabled: !ft.value,
                  onClick: ct,
                  onAppend: Fe
                }, null, 8, ["config", "disabled"])) : E("", !0),
                O(e.$slots, "bottom-buttons")
              ])) : E("", !0),
              e.paginator && Object.keys(e.paginator).length > 0 ? (v(), $(Bt, K({
                key: 5,
                ref_key: "paginatorRef",
                ref: Ge
              }, e.paginator, {
                modelValue: d.value,
                "onUpdate:modelValue": p[3] || (p[3] = (k) => d.value = k),
                onLoading: Lt,
                onPerms: Xe,
                onResponse: Q
              }), null, 16, ["modelValue"])) : E("", !0),
              h(n)["web-element-actions"] ? O(e.$slots, "web-element-actions", { key: 6 }) : E("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, Cn);
    };
  }
}), Jn = {
  install: (t) => {
    t.component("lkt-table") === void 0 && t.component("lkt-table", Hn);
  }
}, Qn = (t) => (ve.navButtonSlot = t, !0), Zn = (t) => (ve.createButtonSlot = t, !0), el = (t) => {
  ve.defaultEmptySlot = t;
};
export {
  nl as Column,
  ll as createColumn,
  Jn as default,
  Zn as setTableCreateButtonSlot,
  el as setTableEmptySlot,
  Qn as setTableNavButtonSlot
};
