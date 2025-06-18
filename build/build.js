import { defineComponent as fe, computed as u, ref as A, shallowReactive as Ht, watch as P, watchEffect as Ft, onMounted as Yt, onBeforeUnmount as Da, reactive as Pt, provide as la, h as K, useId as Ia, inject as St, getCurrentInstance as Ba, onUnmounted as Ta, onUpdated as Aa, cloneVNode as Ea, resolveComponent as Se, createBlock as M, createElementBlock as w, unref as h, openBlock as v, mergeProps as Y, withCtx as _, createTextVNode as Ge, toDisplayString as Xe, Fragment as G, useSlots as oa, normalizeClass as x, createCommentVNode as V, createElementVNode as ce, createVNode as be, resolveDynamicComponent as he, renderSlot as $, renderList as ye, mergeDefaults as Va, nextTick as Et, normalizeProps as Ne, withDirectives as Ue, vShow as je, createSlots as Ra } from "vue";
import { __ as La } from "lkt-i18n";
import { ColumnType as lt, FieldType as qe, MultipleOptionsDisplay as Na, SortDirection as Ye, Column as ia, extractPropValue as Ma, TableRowType as ke, extractI18nValue as ra, LktSettings as Te, ensureButtonConfig as ze, TablePermission as Ie, PaginatorType as Vt, TableType as He, getDefaultValues as Oa, Table as $a, ButtonType as Ut } from "lkt-vue-kernel";
import { Column as ll, createColumn as ol } from "lkt-vue-kernel";
import { generateRandomString as _a, replaceAll as Fa } from "lkt-string-tools";
import { DataState as Pa } from "lkt-data-state";
import Ua from "sortablejs";
import { time as ja } from "lkt-date-tools";
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
], za = {
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
  i18n: za,
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
}, Ke = Symbol("carousel"), Ha = (t) => {
  const o = Ht([]), i = (l) => {
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
function qa(t) {
  return t.length === 0 ? 0 : t.reduce((i, l) => i + l, 0) / t.length;
}
function Qt({ slides: t, position: o, toShow: i }) {
  const l = [], n = o === "before", a = n ? -i : 0, b = n ? 0 : i;
  if (t.length <= 0)
    return l;
  for (let k = a; k < b; k++) {
    const s = {
      index: n ? k : k + t.length,
      isClone: !0,
      position: o,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${o}-${k}`
    }, c = t[(k % t.length + t.length) % t.length].vnode, B = Ea(c, s);
    B.el = null, l.push(B);
  }
  return l;
}
const Ga = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function Zt(t) {
  if (!t.el || !(t.el instanceof Element))
    return;
  const o = t.el.querySelectorAll(Ga);
  for (const i of o)
    i instanceof HTMLElement && !i.hasAttribute("disabled") && i.getAttribute("aria-hidden") !== "true" && i.setAttribute("tabindex", "-1");
}
function Xa(t, o) {
  return Object.keys(t).filter((i) => !o.includes(i)).reduce((i, l) => (i[l] = t[l], i), {});
}
function Ya(t) {
  const { isVertical: o, isReversed: i, dragged: l, effectiveSlideSize: n } = t, a = o ? l.y : l.x;
  if (a === 0)
    return 0;
  const b = Math.round(a / n);
  return i ? b : -b;
}
function Be({ val: t, max: o, min: i }) {
  return o < i ? t : Math.min(Math.max(t, isNaN(i) ? t : i), isNaN(o) ? t : o);
}
function Ka(t) {
  const { transform: o } = window.getComputedStyle(t);
  return o.split(/[(,)]/).slice(1, -1).map((i) => parseFloat(i));
}
function Wa(t) {
  let o = 1, i = 1;
  return t.forEach((l) => {
    const n = Ka(l);
    n.length === 6 && (o /= n[0], i /= n[3]);
  }), { widthMultiplier: o, heightMultiplier: i };
}
function xa(t, o) {
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
function Ja(t, o, i) {
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
function qt({ slideSize: t, viewportSize: o, align: i, itemsToShow: l }) {
  return l !== void 0 ? xa(i, l) : t !== void 0 && o !== void 0 ? Ja(i, t, o) : 0;
}
function va(t = "", o = {}) {
  return Object.entries(o).reduce((i, [l, n]) => i.replace(`{${l}}`, String(n)), t);
}
function fa({ val: t, max: o, min: i = 0 }) {
  const l = o - i + 1;
  return ((t - i) % l + l) % l + i;
}
function jt(t, o = 0) {
  let i = !1, l = 0, n = null;
  function a(...b) {
    if (i)
      return;
    i = !0;
    const k = () => {
      n = requestAnimationFrame((D) => {
        D - l > o ? (l = D, t(...b), i = !1) : k();
      });
    };
    k();
  }
  return a.cancel = () => {
    n && (cancelAnimationFrame(n), n = null, i = !1);
  }, a;
}
function Rt(t, o = "px") {
  if (!(t == null || t === ""))
    return typeof t == "number" || parseFloat(t).toString() === t ? `${t}${o}` : t;
}
const Qa = fe({
  name: "CarouselAria",
  setup() {
    const t = St(Ke);
    return t ? () => K("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, va(t.config.i18n.itemXofY, {
      currentSlide: t.currentSlide + 1,
      slidesCount: t.slidesCount
    })) : () => "";
  }
}), Za = {
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
}, en = fe({
  name: "VueCarousel",
  props: Za,
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
    const a = Ha(i), b = a.getSlides(), k = u(() => b.length), D = A(null), s = A(null), c = A(0), B = u(() => Object.assign(Object.assign(Object.assign({}, z), Xa(t, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, z.i18n), t.i18n) })), d = Ht(Object.assign({}, B.value)), g = A((n = t.modelValue) !== null && n !== void 0 ? n : 0), R = A(g.value);
    P(g, (r) => R.value = r);
    const E = A(0), We = u(() => Math.ceil((k.value - 1) / 2)), oe = u(() => k.value - 1), ie = u(() => 0);
    let J = null, f = null, I = null;
    const re = u(() => c.value + d.gap), U = u(() => {
      const r = d.dir || "ltr";
      return r in Lt ? Lt[r] : r;
    }), ae = u(() => ["rtl", "btt"].includes(U.value)), F = u(() => ["ttb", "btt"].includes(U.value)), ne = u(() => d.itemsToShow === "auto"), H = u(() => F.value ? "height" : "width");
    function Me() {
      var r;
      if (!Ve.value)
        return;
      const y = (B.value.breakpointMode === "carousel" ? (r = D.value) === null || r === void 0 ? void 0 : r.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, C = Object.keys(t.breakpoints || {}).map((N) => Number(N)).sort((N, W) => +W - +N), T = {};
      C.some((N) => y >= N ? (Object.assign(T, t.breakpoints[N]), T.i18n && Object.assign(T.i18n, B.value.i18n, t.breakpoints[N].i18n), !0) : !1), Object.assign(d, B.value, T);
    }
    const Ae = jt(() => {
      Me(), pe(), ue();
    }), xe = Ht(/* @__PURE__ */ new Set()), Q = A([]);
    function Nt({ widthMultiplier: r, heightMultiplier: y }) {
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
      const r = Wa(xe);
      if (Ce(r), Nt(r), ne.value)
        c.value = qa(Q.value.map((y) => y[H.value]));
      else {
        const y = Number(d.itemsToShow), C = (y - 1) * d.gap;
        c.value = (Oe.value[H.value] - C) / y;
      }
    }
    function pe() {
      !d.wrapAround && k.value > 0 && (g.value = Be({
        val: g.value,
        max: oe.value,
        min: ie.value
      })), ne.value || (d.itemsToShow = Be({
        val: Number(d.itemsToShow),
        max: k.value,
        min: 1
      }));
    }
    const it = u(() => typeof t.ignoreAnimations == "string" ? t.ignoreAnimations.split(",") : Array.isArray(t.ignoreAnimations) ? t.ignoreAnimations : t.ignoreAnimations ? !1 : []);
    Ft(() => pe()), Ft(() => {
      ue();
    });
    let Ee;
    const Ct = (r) => {
      const y = r.target;
      if (!(!(y != null && y.contains(D.value)) || Array.isArray(it.value) && it.value.includes(r.animationName)) && (xe.add(y), !Ee)) {
        const C = () => {
          Ee = requestAnimationFrame(() => {
            ue(), C();
          });
        };
        C();
      }
    }, wt = (r) => {
      const y = r.target;
      y && xe.delete(y), Ee && xe.size === 0 && (cancelAnimationFrame(Ee), ue());
    }, Ve = A(!1);
    typeof document < "u" && Ft(() => {
      Ve.value && it.value !== !1 ? (document.addEventListener("animationstart", Ct), document.addEventListener("animationend", wt)) : (document.removeEventListener("animationstart", Ct), document.removeEventListener("animationend", wt));
    }), Yt(() => {
      Ve.value = !0, Me(), Dt(), D.value && (I = new ResizeObserver(Ae), I.observe(D.value)), i("init");
    }), Da(() => {
      Ve.value = !1, a.cleanup(), f && clearTimeout(f), Ee && cancelAnimationFrame(Ee), J && clearInterval(J), I && (I.disconnect(), I = null), typeof document < "u" && Re(), D.value && (D.value.removeEventListener("transitionend", ue), D.value.removeEventListener("animationiteration", ue));
    });
    let we = !1;
    const me = { x: 0, y: 0 }, se = Pt({ x: 0, y: 0 }), $e = A(!1), rt = A(!1), Mt = () => {
      $e.value = !0;
    }, ut = () => {
      $e.value = !1;
    }, st = jt((r) => {
      if (!r.ctrlKey)
        switch (r.key) {
          case "ArrowLeft":
          case "ArrowUp":
            F.value === r.key.endsWith("Up") && (ae.value ? De(!0) : Ze(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            F.value === r.key.endsWith("Down") && (ae.value ? Ze(!0) : De(!0));
            break;
        }
    }, 200), ge = () => {
      document.addEventListener("keydown", st);
    }, Re = () => {
      document.removeEventListener("keydown", st);
    };
    function Z(r) {
      const y = r.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(y) || q.value || (we = r.type === "touchstart", !we && (r.preventDefault(), r.button !== 0)))
        return;
      me.x = "touches" in r ? r.touches[0].clientX : r.clientX, me.y = "touches" in r ? r.touches[0].clientY : r.clientY;
      const C = we ? "touchmove" : "mousemove", T = we ? "touchend" : "mouseup";
      document.addEventListener(C, dt, { passive: !1 }), document.addEventListener(T, Je, { passive: !0 });
    }
    const dt = jt((r) => {
      rt.value = !0;
      const y = "touches" in r ? r.touches[0].clientX : r.clientX, C = "touches" in r ? r.touches[0].clientY : r.clientY;
      se.x = y - me.x, se.y = C - me.y;
      const T = Ya({
        isVertical: F.value,
        isReversed: ae.value,
        dragged: se,
        effectiveSlideSize: re.value
      });
      R.value = d.wrapAround ? g.value + T : Be({
        val: g.value + T,
        max: oe.value,
        min: ie.value
      }), i("drag", { deltaX: se.x, deltaY: se.y });
    });
    function Je() {
      if (dt.cancel(), R.value !== g.value && !we) {
        const C = (T) => {
          T.preventDefault(), window.removeEventListener("click", C);
        };
        window.addEventListener("click", C);
      }
      Le(R.value), se.x = 0, se.y = 0, rt.value = !1;
      const r = we ? "touchmove" : "mousemove", y = we ? "touchend" : "mouseup";
      document.removeEventListener(r, dt), document.removeEventListener(y, Je);
    }
    function Dt() {
      !d.autoplay || d.autoplay <= 0 || (J = setInterval(() => {
        d.pauseAutoplayOnHover && $e.value || De();
      }, d.autoplay));
    }
    function ct() {
      J && (clearInterval(J), J = null);
    }
    function Qe() {
      ct(), Dt();
    }
    const q = A(!1);
    function Le(r, y = !1) {
      if (!y && q.value)
        return;
      let C = r, T = r;
      E.value = g.value, d.wrapAround ? T = fa({
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
        prevSlideIndex: E.value,
        slidesCount: k.value
      }), ct(), q.value = !0, g.value = C, T !== C && vt.pause(), i("update:modelValue", T), f = setTimeout(() => {
        d.wrapAround && T !== C && (vt.resume(), g.value = T, i("loop", {
          currentSlideIndex: g.value,
          slidingToIndex: r
        })), i("slide-end", {
          currentSlideIndex: g.value,
          prevSlideIndex: E.value,
          slidesCount: k.value
        }), q.value = !1, Qe();
      }, d.transition);
    }
    function De(r = !1) {
      Le(g.value + d.itemsToScroll, r);
    }
    function Ze(r = !1) {
      Le(g.value - d.itemsToScroll, r);
    }
    function _e() {
      Me(), pe(), ue(), Qe();
    }
    P(() => [B.value, t.breakpoints], () => Me(), { deep: !0 }), P(() => t.autoplay, () => Qe());
    const vt = P(() => t.modelValue, (r) => {
      r !== g.value && Le(Number(r), !0);
    });
    i("before-init");
    const Fe = u(() => {
      if (!d.wrapAround)
        return { before: 0, after: 0 };
      if (ne.value)
        return { before: b.length, after: b.length };
      const r = Number(d.itemsToShow), y = Math.ceil(r + (d.itemsToScroll - 1)), C = y - R.value, T = y - (k.value - (R.value + 1));
      return {
        before: Math.max(0, C),
        after: Math.max(0, T)
      };
    }), le = u(() => Fe.value.before ? ne.value ? Q.value.slice(-1 * Fe.value.before).reduce((r, y) => r + y[H.value] + d.gap, 0) * -1 : Fe.value.before * re.value * -1 : 0), ft = u(() => {
      var r;
      if (ne.value) {
        const y = (g.value % b.length + b.length) % b.length;
        return qt({
          slideSize: (r = Q.value[y]) === null || r === void 0 ? void 0 : r[H.value],
          viewportSize: Oe.value[H.value],
          align: d.snapAlign
        });
      }
      return qt({
        align: d.snapAlign,
        itemsToShow: +d.itemsToShow
      });
    }), et = u(() => {
      let r = 0;
      if (ne.value) {
        if (g.value < 0 ? r = Q.value.slice(g.value).reduce((y, C) => y + C[H.value] + d.gap, 0) * -1 : r = Q.value.slice(0, g.value).reduce((y, C) => y + C[H.value] + d.gap, 0), r -= ft.value, !d.wrapAround) {
          const y = Q.value.reduce((C, T) => C + T[H.value] + d.gap, 0) - Oe.value[H.value] - d.gap;
          r = Be({
            val: r,
            max: y,
            min: 0
          });
        }
      } else {
        let y = g.value - ft.value;
        d.wrapAround || (y = Be({
          val: y,
          max: k.value - +d.itemsToShow,
          min: 0
        })), r = y * re.value;
      }
      return r * (ae.value ? 1 : -1);
    }), It = u(() => {
      var r, y;
      if (!ne.value) {
        const N = g.value - ft.value;
        return d.wrapAround ? {
          min: Math.floor(N),
          max: Math.ceil(N + Number(d.itemsToShow) - 1)
        } : {
          min: Math.floor(Be({
            val: N,
            max: k.value - Number(d.itemsToShow),
            min: 0
          })),
          max: Math.ceil(Be({
            val: N + Number(d.itemsToShow) - 1,
            max: k.value - 1,
            min: 0
          }))
        };
      }
      let C = 0;
      {
        let N = 0, W = 0 - Fe.value.before;
        const X = Math.abs(et.value + le.value);
        for (; N <= X; ) {
          const ee = (W % b.length + b.length) % b.length;
          N += ((r = Q.value[ee]) === null || r === void 0 ? void 0 : r[H.value]) + d.gap, W++;
        }
        C = W - 1;
      }
      let T = 0;
      {
        let N = C, W = 0;
        for (N < 0 ? W = Q.value.slice(0, N).reduce((X, ee) => X + ee[H.value] + d.gap, 0) - Math.abs(et.value + le.value) : W = Q.value.slice(0, N).reduce((X, ee) => X + ee[H.value] + d.gap, 0) - Math.abs(et.value); W < Oe.value[H.value]; ) {
          const X = (N % b.length + b.length) % b.length;
          W += ((y = Q.value[X]) === null || y === void 0 ? void 0 : y[H.value]) + d.gap, N++;
        }
        T = N - 1;
      }
      return {
        min: Math.floor(C),
        max: Math.ceil(T)
      };
    }), Ot = u(() => {
      if (d.slideEffect === "fade")
        return;
      const r = F.value ? "Y" : "X", y = F.value ? se.y : se.x;
      let C = et.value + y;
      if (!d.wrapAround && d.preventExcessiveDragging) {
        let T = 0;
        ne.value ? T = Q.value.reduce((X, ee) => X + ee[H.value], 0) : T = (k.value - Number(d.itemsToShow)) * re.value;
        const N = ae.value ? 0 : -1 * T, W = ae.value ? T : 0;
        C = Be({
          val: C,
          min: N,
          max: W
        });
      }
      return `translate${r}(${C}px)`;
    }), $t = u(() => ({
      "--vc-transition-duration": q.value ? Rt(d.transition, "ms") : void 0,
      "--vc-slide-gap": Rt(d.gap),
      "--vc-carousel-height": Rt(d.height),
      "--vc-cloned-offset": Rt(le.value)
    })), Bt = { slideTo: Le, next: De, prev: Ze }, pt = Pt({
      activeSlide: R,
      config: d,
      currentSlide: g,
      isSliding: q,
      isVertical: F,
      maxSlide: oe,
      minSlide: ie,
      nav: Bt,
      normalizedDir: U,
      slideRegistry: a,
      slideSize: c,
      slides: b,
      slidesCount: k,
      viewport: s,
      visibleRange: It
    });
    la(Ke, pt);
    const Pe = Pt({
      config: d,
      currentSlide: g,
      maxSlide: oe,
      middleSlide: We,
      minSlide: ie,
      slideSize: c,
      slidesCount: k
    });
    return l({
      data: Pe,
      nav: Bt,
      next: De,
      prev: Ze,
      restartCarousel: _e,
      slideTo: Le,
      updateBreakpointsConfig: Me,
      updateSlideSize: ue,
      updateSlidesData: pe
    }), () => {
      var r;
      const y = o.default || o.slides, C = (y == null ? void 0 : y(Pe)) || [], { before: T, after: N } = Fe.value, W = Qt({
        slides: b,
        position: "before",
        toShow: T
      }), X = Qt({
        slides: b,
        position: "after",
        toShow: N
      }), ee = [...W, ...C, ...X];
      if (!d.enabled || !ee.length)
        return K("section", {
          ref: D,
          class: ["carousel", "is-disabled"]
        }, ee);
      const mt = ((r = o.addons) === null || r === void 0 ? void 0 : r.call(o, Pe)) || [], tt = K("ol", {
        class: "carousel__track",
        style: { transform: Ot.value },
        onMousedownCapture: d.mouseDrag ? Z : null,
        onTouchstartPassiveCapture: d.touchDrag ? Z : null
      }, ee), gt = K("div", { class: "carousel__viewport", ref: s }, tt);
      return K("section", {
        ref: D,
        class: [
          "carousel",
          `is-${U.value}`,
          `is-effect-${d.slideEffect}`,
          {
            "is-vertical": F.value,
            "is-sliding": q.value,
            "is-dragging": rt.value,
            "is-hover": $e.value
          }
        ],
        dir: U.value,
        style: $t.value,
        "aria-label": d.i18n.ariaGallery,
        tabindex: "0",
        onFocus: ge,
        onBlur: Re,
        onMouseenter: Mt,
        onMouseleave: ut
      }, [gt, mt, K(Qa)]);
    };
  }
});
var Gt;
(function(t) {
  t.arrowDown = "arrowDown", t.arrowLeft = "arrowLeft", t.arrowRight = "arrowRight", t.arrowUp = "arrowUp";
})(Gt || (Gt = {}));
const ea = (t) => `icon${t.charAt(0).toUpperCase() + t.slice(1)}`, tn = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function an(t) {
  return t in Gt;
}
const ta = (t) => t && an(t), aa = fe({
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
    const o = St(Ke, null);
    return () => {
      const i = t.name;
      if (!i || !ta(i))
        return;
      const l = tn[i], n = K("path", { d: l }), a = (o == null ? void 0 : o.config.i18n[ea(i)]) || t.title, b = K("title", a);
      return K("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": a
      }, [b, n]);
    };
  }
}), nn = fe({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(t, { slots: o, attrs: i }) {
    const l = St(Ke);
    if (!l)
      return () => "";
    const { next: n, prev: a } = o, b = () => ({
      btt: "arrowDown",
      ltr: "arrowLeft",
      rtl: "arrowRight",
      ttb: "arrowUp"
    })[l.normalizedDir], k = () => ({
      btt: "arrowUp",
      ltr: "arrowRight",
      rtl: "arrowLeft",
      ttb: "arrowDown"
    })[l.normalizedDir], D = u(() => !l.config.wrapAround && l.currentSlide <= l.minSlide), s = u(() => !l.config.wrapAround && l.currentSlide >= l.maxSlide);
    return () => {
      const { i18n: c } = l.config, B = K("button", Object.assign(Object.assign({ type: "button", disabled: D.value, "aria-label": c.ariaPreviousSlide, title: c.ariaPreviousSlide, onClick: l.nav.prev }, i), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": D.value },
        i.class
      ] }), (a == null ? void 0 : a()) || K(aa, { name: b() })), d = K("button", Object.assign(Object.assign({ type: "button", disabled: s.value, "aria-label": c.ariaNextSlide, title: c.ariaNextSlide, onClick: l.nav.next }, i), { class: [
        "carousel__next",
        { "carousel__next--disabled": s.value },
        i.class
      ] }), (n == null ? void 0 : n()) || K(aa, { name: k() }));
      return [B, d];
    };
  }
}), ln = fe({
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
    const o = St(Ke);
    if (!o)
      return () => "";
    const i = u(() => o.config.itemsToShow), l = u(() => qt({
      align: o.config.snapAlign,
      itemsToShow: i.value
    })), n = u(() => t.paginateByItemsToShow && i.value > 1), a = u(() => Math.ceil((o.activeSlide - l.value) / i.value)), b = u(() => Math.ceil(o.slidesCount / i.value)), k = (D) => fa(n.value ? {
      val: a.value,
      max: b.value - 1,
      min: 0
    } : {
      val: o.activeSlide,
      max: o.maxSlide,
      min: o.minSlide
    }) === D;
    return () => {
      var D, s;
      const c = [];
      for (let B = n.value ? 0 : o.minSlide; B <= (n.value ? b.value - 1 : o.maxSlide); B++) {
        const d = va(o.config.i18n[n.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: B + 1
        }), g = k(B), R = K("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": g
          },
          "aria-label": d,
          "aria-pressed": g,
          "aria-controls": (s = (D = o.slides[B]) === null || D === void 0 ? void 0 : D.exposed) === null || s === void 0 ? void 0 : s.id,
          title: d,
          disabled: t.disableOnClick,
          onClick: () => o.nav.slideTo(n.value ? Math.floor(B * +o.config.itemsToShow + l.value) : B)
        }), E = K("li", { class: "carousel__pagination-item", key: B }, R);
        c.push(E);
      }
      return K("ol", { class: "carousel__pagination" }, c);
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
    const n = St(Ke);
    if (la(Ke, void 0), !n)
      return () => "";
    const a = A(t.index), b = (R) => {
      a.value = R;
    }, k = Ba(), D = () => {
      const R = k.vnode.el;
      return R ? R.getBoundingClientRect() : { width: 0, height: 0 };
    };
    l({
      id: t.id,
      setIndex: b,
      getBoundingRect: D
    });
    const s = u(() => a.value === n.activeSlide), c = u(() => a.value === n.activeSlide - 1), B = u(() => a.value === n.activeSlide + 1), d = u(() => a.value >= n.visibleRange.min && a.value <= n.visibleRange.max), g = u(() => {
      if (n.config.itemsToShow === "auto")
        return;
      const R = n.config.itemsToShow, E = n.config.gap > 0 && R > 1 ? `calc(${100 / R}% - ${n.config.gap * (R - 1) / R}px)` : `${100 / R}%`;
      return n.isVertical ? { height: E } : { width: E };
    });
    return n.slideRegistry.registerSlide(k, t.index), Ta(() => {
      n.slideRegistry.unregisterSlide(k);
    }), t.isClone && (Yt(() => {
      Zt(k.vnode);
    }), Aa(() => {
      Zt(k.vnode);
    })), () => {
      var R, E;
      return n.config.enabled ? K("li", {
        style: [o.style, Object.assign({}, g.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": t.isClone,
          "carousel__slide--visible": d.value,
          "carousel__slide--active": s.value,
          "carousel__slide--prev": c.value,
          "carousel__slide--next": B.value,
          "carousel__slide--sliding": n.isSliding
        },
        onFocusin: () => {
          n.viewport && (n.viewport.scrollLeft = 0), n.nav.slideTo(a.value);
        },
        id: t.isClone ? void 0 : t.id,
        "aria-hidden": t.isClone || void 0
      }, (E = i.default) === null || E === void 0 ? void 0 : E.call(i, {
        currentIndex: a.value,
        isActive: s.value,
        isClone: t.isClone,
        isPrev: c.value,
        isNext: B.value,
        isSliding: n.isSliding,
        isVisible: d.value
      })) : (R = i.default) === null || R === void 0 ? void 0 : R.call(i);
    };
  }
}), on = (t, o, i, l) => {
  var b, k, D, s, c;
  if (!i) return 0;
  let n, a;
  if (i.type === lt.Field ? [qe.Number, qe.Range].includes((b = i.field) == null ? void 0 : b.type) ? (n = parseFloat(t[i.key]), a = parseFloat(o[i.key])) : [qe.Date, qe.Date].includes((k = i.field) == null ? void 0 : k.type) ? (n = t[i.key], a = o[i.key]) : ((D = i.field) == null ? void 0 : D.type) === qe.Select && ((s = i.field) != null && s.multiple) && ((c = i.field) == null ? void 0 : c.multipleDisplay) === Na.Count ? (n = t[i.key].length, a = o[i.key].length) : (n = String(t[i.key]).toLowerCase(), a = String(o[i.key]).toLowerCase()) : (n = String(t[i.key]).toLowerCase(), a = String(o[i.key]).toLowerCase()), l === Ye.Asc) {
    if (n > a) return 1;
    if (a > n) return -1;
  } else {
    if (n > a) return -1;
    if (a > n) return 1;
  }
  return 0;
}, ot = (t, o, i, l = []) => {
  if (t.extractTitleFromColumn) {
    let n = l.find((a) => a.key === t.extractTitleFromColumn);
    if (n)
      return ot(n, o, i, l);
  }
  if (t.formatter && typeof t.formatter == "function") {
    let n = t.formatter(o[t.key], o, t, i);
    return n.startsWith("__:") ? La(n.substring(3)) : n;
  }
  return o[t.key];
}, rn = (t, o, i) => {
  if (!t.colspan) return -1;
  let l = o;
  return i.forEach((n) => {
    let a = Kt(t, n);
    a > 0 && a < l && (l = a);
  }), l;
}, Kt = (t, o) => t.colspan === !1 ? !1 : typeof t.colspan == "function" ? t.colspan(o) : t.colspan, pa = (t, o) => typeof t.preferSlot > "u" ? !0 : t.preferSlot === !1 ? !1 : typeof t.preferSlot == "function" ? t.preferSlot(o) : !0, un = (t, o, i) => {
  if (typeof t != "object" || !t.key || o.indexOf(t.key) > -1) return !1;
  let l = Kt(t, i);
  return typeof t.colspan > "u" ? !0 : (typeof t.colspan < "u" && (typeof t.colspan == "function" ? l = parseInt(t.colspan(i)) : l = parseInt(t.colspan)), l > 0);
}, sn = (t = []) => {
  if (t.length > 0) {
    for (let o = 0; o < t.length; ++o)
      if (t[o].sortable) return t[o].key;
  }
  return "";
}, dn = (t, o) => {
  if (t.length > 0) {
    for (let i = 0; i < t.length; ++i)
      if (t[i].key === o) return t[i];
  }
  return null;
}, ma = (t) => {
  let o = [];
  return t.class && o.push(t.class), t.type && o.push(`is-${t.type}`), o.join(" ");
}, Xt = /* @__PURE__ */ fe({
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
    "update:modelValue",
    "inline-drop"
  ],
  setup(t, { emit: o }) {
    const i = o, l = t, n = A(l.modelValue);
    P(() => l.modelValue, (c) => {
      n.value = c;
    }), P(n, (c) => {
      i("update:modelValue", c);
    });
    const a = () => {
      i("inline-drop");
    }, b = u(() => ({ ...l.column.slotData, item: n.value })), k = u(() => {
      var c, B, d, g;
      if ((c = l.column.field) != null && c.modalData && typeof ((B = l.column.field) == null ? void 0 : B.modalData) == "object")
        for (let R in l.column.field.modalData)
          if (typeof ((d = l.column.field) == null ? void 0 : d.modalData[R]) == "string" && l.column.field.modalData[R].startsWith("prop:")) {
            let E = l.column.field.modalData[R].substring(5);
            n.value[E];
          } else
            l.column.field.modalData[R];
      return (g = l.column.field) == null ? void 0 : g.modalData;
    }), D = u(() => typeof l.column.field == "string" && l.column.field.startsWith("prop:") ? Ma(l.column.field, n.value) : l.column.field), s = u(() => {
      var c, B, d, g;
      return l.column.type === lt.Field ? !((B = (c = l.column) == null ? void 0 : c.field) != null && B.label) && (l.column.ensureFieldLabel || [
        qe.Switch,
        qe.Check
      ].includes((d = l.column.field) == null ? void 0 : d.type)) ? l.column.label : (g = l.column.field) == null ? void 0 : g.label : "";
    });
    return (c, B) => {
      const d = Se("lkt-anchor"), g = Se("lkt-button"), R = Se("lkt-field");
      return c.column.type === h(lt).Anchor ? (v(), M(d, Y({ key: 0 }, c.column.anchor, { prop: n.value }), {
        default: _(() => [
          Ge(Xe(h(ot)(c.column, n.value, c.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : c.column.type === h(lt).Button ? (v(), M(g, Y({ key: 1 }, c.column.button, { prop: n.value }), {
        default: _(() => [
          Ge(Xe(h(ot)(c.column, n.value, c.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : c.column.type === h(lt).Field ? (v(), M(R, Y({
        key: 2,
        modelValue: n.value[c.column.key],
        "onUpdate:modelValue": B[0] || (B[0] = (E) => n.value[c.column.key] = E)
      }, {
        ...D.value,
        readMode: !c.hasInlineEditPerm || D.value.readMode,
        slotData: b.value,
        label: s.value,
        modalData: k.value,
        prop: n.value
      }), null, 16, ["modelValue"])) : c.column.type === h(lt).InlineDrop ? (v(), M(g, Y({ key: 3 }, c.column.button, {
        prop: n.value,
        onClick: a
      }), {
        default: _(() => [
          Ge(Xe(h(ot)(c.column, n.value, c.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : (v(), w(G, { key: 4 }, [
        Ge(Xe(h(ot)(c.column, n.value, c.i, c.columns)), 1)
      ], 64));
    };
  }
}), kt = class kt {
};
kt.navButtonSlot = "", kt.createButtonSlot = "", kt.defaultEmptySlot = void 0;
let ve = kt;
const cn = ["data-i", "data-draggable"], vn = ["data-role", "data-i"], fn = {
  key: 1,
  class: "lkt-table-nav-cell"
}, pn = { class: "lkt-table-nav-container" }, mn = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, gn = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, yn = ["colspan"], bn = ["colspan"], hn = ["data-column", "colspan", "title"], kn = /* @__PURE__ */ fe({
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
    const k = [ke.Auto, ke.PreferCustomItem].includes(b), D = [ke.Auto, ke.PreferItem].includes(b), s = (f) => l("click", f), c = u(() => {
      let f = [], I = typeof n.disabledDrag == "function" ? n.disabledDrag(a.value) : oe.value === !0;
      return !I && n.sortable && n.isDraggable ? f.push("handle") : I && f.push("disabled"), f.join(" ");
    }), B = u(() => ve.navButtonSlot !== ""), d = u(() => ve.navButtonSlot), g = () => {
      l("item-up", n.i);
    }, R = () => {
      l("item-down", n.i);
    }, E = () => {
      l("item-drop", n.i);
    };
    P(() => n.modelValue, (f) => a.value = f), P(a, (f) => {
      l("update:modelValue", f);
    }, { deep: !0 });
    const We = u(() => typeof n.renderDrag == "function" ? n.renderDrag(a.value) : n.renderDrag === !0), oe = u(() => typeof n.disabledDrag == "function" ? n.disabledDrag(a.value) : n.disabledDrag === !0), ie = u(() => c.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), J = u(() => {
      let f = [];
      return k && f.push("type-custom-item"), D && f.push("type-item"), typeof n.itemContainerClass == "function" ? f.push(n.itemContainerClass(a.value, n.i)) : n.itemContainerClass !== "" && f.push(n.itemContainerClass), f.join(" ");
    });
    return (f, I) => {
      const re = Se("lkt-button");
      return v(), w("tr", {
        "data-i": f.i,
        "data-draggable": f.isDraggable,
        class: x(J.value)
      }, [
        f.sortable && f.editModeEnabled && We.value ? (v(), w("td", {
          key: 0,
          "data-role": ie.value,
          class: x(c.value),
          "data-i": f.i
        }, I[2] || (I[2] = [
          ce("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]), 10, vn)) : V("", !0),
        f.addNavigation && f.editModeEnabled ? (v(), w("td", fn, [
          ce("div", pn, [
            be(re, {
              palette: "table-nav",
              disabled: f.i === 0,
              onClick: g
            }, {
              default: _(() => [
                B.value ? (v(), M(he(d.value), {
                  key: 0,
                  direction: "up"
                })) : (v(), w("i", mn))
              ]),
              _: 1
            }, 8, ["disabled"]),
            be(re, {
              palette: "table-nav",
              disabled: f.latestRow,
              onClick: R
            }, {
              default: _(() => [
                B.value ? (v(), M(he(d.value), {
                  key: 0,
                  direction: "down"
                })) : (v(), w("i", gn))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : V("", !0),
        h(k) && h(i)[`item-${f.i}`] ? (v(), w("td", {
          key: "td" + f.i,
          colspan: f.visibleColumns.length
        }, [
          $(f.$slots, `item-${f.i}`, {
            item: a.value,
            index: f.i,
            editing: f.editModeEnabled,
            canCreate: f.canCreate,
            canRead: f.canRead,
            canUpdate: f.canEdit,
            canDrop: f.canDrop,
            isLoading: f.isLoading,
            doDrop: () => E()
          })
        ], 8, yn)) : h(D) && h(i).item ? (v(), w("td", {
          key: "td" + f.i,
          colspan: f.visibleColumns.length
        }, [
          $(f.$slots, "item", {
            item: a.value,
            index: f.i,
            editing: f.editModeEnabled,
            canCreate: f.canCreate,
            canRead: f.canRead,
            canUpdate: f.canEdit,
            canDrop: f.canDrop,
            isLoading: f.isLoading,
            doDrop: () => E()
          })
        ], 8, bn)) : (v(!0), w(G, { key: 4 }, ye(f.visibleColumns, (U) => (v(), w(G, null, [
          h(un)(U, f.emptyColumns, a.value) ? (v(), w("td", {
            key: "td" + f.i,
            "data-column": U.key,
            colspan: h(Kt)(U, a.value),
            title: h(ot)(U, a.value, f.i, f.visibleColumns),
            class: x(h(ma)(U)),
            onClick: I[1] || (I[1] = (ae) => s(ae))
          }, [
            f.$slots[U.key] && h(pa)(U, a.value) ? $(f.$slots, U.key, {
              key: 0,
              value: a.value[U.key],
              item: a.value,
              column: U,
              i: f.i
            }) : a.value ? (v(), M(Xt, {
              key: 1,
              modelValue: a.value,
              "onUpdate:modelValue": I[0] || (I[0] = (ae) => a.value = ae),
              column: U,
              columns: f.visibleColumns,
              "edit-mode-enabled": f.editModeEnabled,
              "has-inline-edit-perm": f.hasInlineEditPerm,
              i: f.i,
              onInlineDrop: E
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : V("", !0)
          ], 10, hn)) : V("", !0)
        ], 64))), 256))
      ], 10, cn);
    };
  }
}), zt = /* @__PURE__ */ fe({
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
      beforeClose: (c) => {
        "itemCreated" in c && c.itemCreated === !0 && i("append", c.item);
      }
    }, k = {
      ...l.config
    };
    k.modalData = b;
    const D = () => {
      var c;
      if (!((c = l.config) != null && c.modal)) {
        i("click");
        return;
      }
    };
    return (c, B) => {
      const d = Se("lkt-button");
      return v(), M(d, Y(k, {
        disabled: c.disabled,
        onClick: D
      }), {
        default: _(() => [
          n.value ? (v(), M(he(a.value), { key: 0 })) : V("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), Sn = ["data-column", "data-sortable", "data-sort", "colspan", "title"], Cn = /* @__PURE__ */ fe({
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
    const i = o, l = t, n = u(() => rn(l.column, l.amountOfColumns, l.items)), a = u(() => l.column.sortable === !0), b = u(() => a.value && l.sortBy === l.column.key ? l.sortDirection : ""), k = u(() => ra(l.column.label)), D = u(() => a.value && l.sortBy === l.column.key ? l.sortDirection === Ye.Asc ? Te.defaultTableSortAscIcon : l.sortDirection === Ye.Desc ? Te.defaultTableSortDescIcon : "" : ""), s = () => i("click", l.column);
    return (c, B) => (v(), w("th", {
      "data-column": c.column.key,
      "data-sortable": a.value,
      "data-sort": b.value,
      colspan: n.value,
      title: k.value,
      class: x(h(ma)(c.column)),
      onClick: s
    }, [
      ce("div", null, [
        Ge(Xe(k.value) + " ", 1),
        D.value ? (v(), w("i", {
          key: 0,
          class: x(D.value)
        }, null, 2)) : V("", !0)
      ])
    ], 10, Sn));
  }
}), wn = ["id"], Dn = { class: "lkt-table-page-buttons" }, In = { class: "switch-edition-mode" }, Bn = { class: "switch-edition-mode" }, Tn = {
  key: 0,
  class: "lkt-table-page-buttons"
}, An = {
  key: 1,
  class: "lkt-table-page-filters"
}, En = { class: "lkt-table" }, Vn = { key: 0 }, Rn = { key: 0 }, Ln = {
  key: 0,
  "data-role": "drag-indicator"
}, Nn = { key: 1 }, Mn = ["id"], On = ["id"], $n = ["data-i"], _n = ["id"], Fn = ["data-i"], Pn = ["id"], Un = { class: "lkt-carousel-slide" }, jn = { class: "lkt-carousel-slide" }, zn = {
  key: 2,
  class: "lkt-table-empty"
}, Hn = {
  key: 4,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, qn = /* @__PURE__ */ fe({
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
  }, Oa($a)),
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
    var Wt, xt;
    const l = i, n = oa(), a = t, b = A(typeof a.sorter == "function" ? a.sorter : on), k = A(sn(a.columns)), D = A(Ye.Asc), s = A(a.modelValue), c = A(null), B = A(a.columns), d = A((Wt = a.paginator) == null ? void 0 : Wt.modelValue), g = A(a.loading), R = A(!1), E = A(a.perms), We = A(null), oe = A(null), ie = A(null), J = A({}), f = A(new Pa({ items: s.value }, a.dataStateConfig)), I = A(a.editMode), re = A(0), U = A(null), ae = A(((xt = a.carousel) == null ? void 0 : xt.currentSlide) || 0), F = A(ze(a.saveButton, Te.defaultSaveButton)), ne = A(ze(a.createButton, Te.defaultCreateButton)), H = A(ze(a.editModeButton, Te.defaultEditModeButton)), Me = A(ze(a.groupButton, Te.defaultGroupButton));
    P(() => a.saveButton, (e) => F.value = ze(a.saveButton, Te.defaultSaveButton)), P(() => a.createButton, (e) => ne.value = ze(a.createButton, Te.defaultCreateButton)), P(() => a.editModeButton, (e) => H.value = ze(a.editModeButton, Te.defaultEditModeButton));
    const Ae = A(!1);
    P(g, (e) => l("update:loading", e)), P(d, (e) => l("page", e));
    const xe = (e) => {
      E.value = e;
    }, Q = (e) => {
      var m;
      if (Array.isArray(e.data)) {
        let O = e.data;
        typeof ((m = a.events) == null ? void 0 : m.parseResults) == "function" && (O = a.events.parseResults(O)), s.value = [...s.value, ...O];
      }
      g.value = !1, R.value = !0, f.value.store({ items: s.value }).turnStoredIntoOriginal(), Ae.value = !1, Et(() => {
        me.value, l("read-response", e);
      });
    }, Nt = () => Et(() => {
      var e;
      (!a.paginator || ![Vt.LoadMore, Vt.Infinite].includes((e = a.paginator) == null ? void 0 : e.type)) && s.value.splice(0, s.value.length), g.value = !0;
    }), Oe = () => {
      We.value.doRefresh();
    }, Ce = _a(12), ue = u(() => {
      if (!a.hideEmptyColumns) return [];
      let e = [];
      return B.value.forEach((m) => {
        let O = m.key, j = !1;
        s.value.forEach((te) => {
          if (typeof te.checkEmpty == "function")
            return te.checkEmpty(te);
          te[O] && (j = !0);
        }), j || e.push(O);
      }), e;
    }), pe = u(() => B.value.filter((e) => !e.hidden)), it = u(() => B.value.filter((e) => e.isForRowKey)), Ee = u(() => B.value.map((e) => e.key)), Ct = u(() => {
      let e = [];
      for (let m in n) Ee.value.indexOf(m) !== -1 && e.push(m);
      return e;
    }), wt = u(() => {
      let e = [];
      for (let m in n) m.indexOf("slide-") !== -1 && e.push(m);
      return e;
    }), Ve = u(() => {
      var e;
      return a.hiddenSave || g.value || !((e = F.value) != null && e.resource || F.value.type) ? !1 : I.value && Ae.value ? !0 : I.value;
    }), we = u(() => yt.value && s.value.length >= a.requiredItemsForTopCreate || De.value ? !0 : Ve.value || I.value && ge.value), me = u(() => {
      var e, m;
      return re.value, typeof ((e = F.value) == null ? void 0 : e.disabled) == "function" ? F.value.disabled({
        value: s.value,
        dataState: f.value
      }) : typeof ((m = F.value) == null ? void 0 : m.disabled) == "boolean" ? F.value.disabled : !Ae.value;
    }), se = u(() => s.value.length), $e = u(() => {
      var e;
      return {
        items: s.value,
        ...(e = F.value) == null ? void 0 : e.resourceData
      };
    }), rt = u(() => a.titleTag === "" ? "h2" : a.titleTag), Mt = u(() => a.wrapContentTag === "" ? "div" : a.wrapContentTag), ut = u(() => ra(a.title)), st = u(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }), ge = u(() => E.value.includes(Ie.Create)), Re = u(() => E.value.includes("read")), Z = u(() => E.value.includes(Ie.Update)), dt = u(() => E.value.includes(Ie.Edit)), Je = u(() => E.value.includes(Ie.InlineEdit)), Dt = u(() => E.value.includes(Ie.ModalCreate)), ct = u(() => E.value.includes(Ie.InlineCreate)), Qe = u(() => E.value.includes(Ie.InlineCreateEver)), q = u(() => E.value.includes(Ie.Drop)), Le = u(() => E.value.includes(Ie.SwitchEditMode)), De = u(() => !Le.value || !Z.value && !q.value || !Z.value && q.value ? !1 : !g.value), Ze = u(() => {
      var e;
      return (typeof ((e = a.paginator) == null ? void 0 : e.type) < "u" && [Vt.LoadMore, Vt.Infinite].includes(a.paginator.type) || !g.value) && s.value.length > 0;
    }), _e = u(() => B.value.find((e) => e.isForAccordionHeader)), vt = (e, m) => typeof a.customItemSlotName == "function" ? a.customItemSlotName(e, m) : "", Fe = (e) => {
      let m = e.target;
      if (typeof m.dataset.column > "u")
        do
          m = m.parentNode;
        while (typeof m.dataset.column > "u" && m.tagName !== "TABLE" && m.tagName !== "body");
      if (m.tagName === "TD" && (m = m.parentNode, m = m.dataset.i, typeof m < "u"))
        return s.value[m];
    }, le = () => {
      re.value = ja();
    }, ft = (e) => s.value[e], et = (e) => {
      var m;
      return (m = c.value) == null ? void 0 : m.querySelector(`[data-i="${e}"]`);
    }, It = (e) => {
      e && e.sortable && (e.key === k.value && (D.value = D.value === Ye.Asc ? Ye.Desc : Ye.Asc), k.value = e.key, s.value = s.value.sort((m, O) => b.value(m, O, e, D.value)), le(), l("sort", {
        sortBy: k.value,
        sortDirection: D.value
      }));
    }, Ot = (e) => {
      l("click", e);
    }, $t = (e) => {
      var O, j, te, de, At, ht, S, p;
      let m = parseInt((de = (te = (j = (O = e == null ? void 0 : e.originalEvent) == null ? void 0 : O.toElement) == null ? void 0 : j.closest("tr")) == null ? void 0 : te.dataset) == null ? void 0 : de.i);
      return !(typeof ((At = a.drag) == null ? void 0 : At.isValid) == "function" && !((ht = a.drag) != null && ht.isValid(s.value[m])) || typeof ((S = a.drag) == null ? void 0 : S.isValid) == "boolean" && !((p = a.drag) != null && p.isValid));
    }, Bt = (e) => {
      var m, O;
      return typeof ((m = a.drag) == null ? void 0 : m.isDraggable) == "function" ? (O = a.drag) == null ? void 0 : O.isDraggable(e) : !0;
    }, pt = () => {
      if (ge.value) {
        l("click-create");
        return;
      }
      if (ct.value || Qe.value) {
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
    }, Pe = (e) => {
      s.value.push(e);
    }, r = () => g.value = !0, y = () => g.value = !1, C = (e, m) => {
      var O, j, te;
      if (!((O = F.value) != null && O.type && [
        Ut.Split,
        Ut.SplitEver,
        Ut.SplitLazy
      ].includes((j = F.value) == null ? void 0 : j.type))) {
        if (l("before-save"), (te = F.value) != null && te.resource && (g.value = !1, !m.success)) {
          l("error", m.httpStatus);
          return;
        }
        f.value.turnStoredIntoOriginal(), Ae.value = !1, l("save", m);
      }
    }, T = (e, m, O) => {
      if (O >= e.length) {
        let j = O - e.length + 1;
        for (; j--; ) e.push(void 0);
      }
      return e.splice(O, 0, e.splice(m, 1)[0]), e;
    }, N = (e) => {
      T(s.value, e, e - 1), le();
    }, W = (e) => {
      T(s.value, e, e + 1), le();
    }, X = (e) => {
      s.value.splice(e, 1), le();
    }, ee = () => {
      var e;
      J.value && typeof ((e = J.value) == null ? void 0 : e.destroy) == "function" && (J.value.destroy(), J.value = {});
    }, mt = () => {
      U.value || (U.value = document.getElementById("lkt-table-body-" + Ce)), J.value = new Ua(U.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let m = e.oldIndex, O = e.newIndex;
          s.value.splice(O, 0, s.value.splice(m, 1)[0]), le(), l("drag-end", s.value[O]);
        },
        onMove: function(e, m) {
          return $t(e);
        }
      });
    }, tt = (e, m, O = !1) => {
      let j = [re.value, Ce, "row", m];
      return O && j.push("hidden"), it.value.forEach((te) => {
        let de = String(e[te.key]).toLowerCase();
        de.length > 50 && (de = de.substring(0, 50)), de = Fa(de, " ", "-"), j.push(de);
      }), j.join("-");
    }, gt = u(() => typeof a.createEnabledValidator == "function" ? a.createEnabledValidator({ items: s.value }) : !0), yt = u(() => a.createButton === !1 ? !1 : Qe.value || ge.value && I.value || ct.value && I.value || Dt.value && I.value), ga = u(() => [He.Ol, He.Ul].includes(a.type)), bt = (e, m) => typeof a.itemDisplayChecker == "function" ? a.itemDisplayChecker(e, m) : !0, Tt = (e, m) => typeof a.itemContainerClass == "function" ? a.itemContainerClass(e, m) : a.itemContainerClass, ya = (e, m) => _e.value ? e[_e.value.key] : "", at = u(() => typeof a.itemSlotComponent == "function" ? a.itemSlotComponent() : a.itemSlotComponent), _t = u(() => typeof a.itemSlotData == "function" ? a.itemSlotData() : a.itemSlotData);
    Yt(() => {
      var e;
      a.initialSorting && It(dn(a.columns, k.value)), f.value.store({ items: s.value }).turnStoredIntoOriginal(), Ae.value = !1, (e = a.drag) != null && e.enabled && Et(() => {
        mt();
      });
    }), P(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }, (e) => {
      e ? mt() : ee();
    }), P(() => a.type, (e) => {
      var m;
      (m = a.drag) != null && m.enabled ? mt() : ee();
    }), P(() => a.perms, (e) => E.value = e), P(E, (e) => l("update:perms", e)), P(I, (e) => {
      l("update:editMode", e);
    }), P(() => a.editMode, (e) => I.value = e), P(() => a.columns, (e) => B.value = e, { deep: !0 }), P(() => a.modelValue, (e) => {
      s.value = e;
    }, { deep: !0 }), P(s, (e) => {
      f.value.increment({ items: e }), Ae.value = f.value.changed(), l("update:modelValue", e);
    }, { deep: !0 }), o({
      getItemByEvent: Fe,
      getItemByIndex: ft,
      getRowByIndex: et,
      doRefresh: Oe,
      doRemoveIndex: (e) => {
        s.value.splice(e, 1), le();
      },
      getHtml: () => oe.value,
      reRender: le,
      turnStoredIntoOriginal: () => {
        f.value.turnStoredIntoOriginal(), Et(() => {
          le();
        });
      }
    });
    const ba = u(() => typeof ve.defaultEmptySlot < "u"), ha = u(() => ve.defaultEmptySlot), ka = u(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled ? !1 : typeof a.drag.canRender > "u" ? !0 : a.drag.canRender), Sa = u(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled || typeof a.drag.isDisabled > "u" ? !1 : a.drag.isDisabled), Ca = u(() => typeof a.header == "object" && Object.keys(a.header).length > 0);
    return (e, m) => {
      const O = Se("lkt-header"), j = Se("lkt-button"), te = Se("lkt-accordion"), de = Se("lkt-loader"), At = Se("lkt-paginator");
      return v(), w("section", {
        ref_key: "element",
        ref: oe,
        class: "lkt-table-page",
        id: "lkt-table-page-" + h(Ce)
      }, [
        Ca.value ? (v(), M(O, Ne(Y({ key: 0 }, e.header)), null, 16)) : ut.value || h(n).title ? (v(), w("header", {
          key: 1,
          class: x(e.headerClass)
        }, [
          ut.value ? (v(), M(he(rt.value), { key: 0 }, {
            default: _(() => [
              e.titleIcon ? (v(), w("i", {
                key: 0,
                class: x(e.titleIcon)
              }, null, 2)) : V("", !0),
              Ge(" " + Xe(ut.value), 1)
            ]),
            _: 1
          })) : V("", !0),
          h(n).title ? $(e.$slots, "title", { key: 1 }) : V("", !0)
        ], 2)) : V("", !0),
        (v(), M(he(Mt.value), {
          class: x(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: _(() => {
            var ht;
            return [
              Ue(ce("div", Dn, [
                e.groupButton !== !1 ? (v(), M(j, Y({
                  key: 0,
                  ref: "groupButton"
                }, Me.value, { class: "lkt-item-crud-group-button" }), {
                  split: _(() => [
                    ce("div", In, [
                      Ue(be(j, Y(H.value, {
                        checked: I.value,
                        "onUpdate:checked": m[0] || (m[0] = (S) => I.value = S)
                      }), null, 16, ["checked"]), [
                        [je, De.value]
                      ])
                    ]),
                    h(n)["prev-buttons-ever"] ? $(e.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: Z.value,
                      canDrop: q.value,
                      perms: e.perms
                    }) : V("", !0),
                    h(n)["prev-buttons"] ? $(e.$slots, "prev-buttons", {
                      key: 1,
                      canUpdate: Z.value,
                      canDrop: q.value,
                      perms: e.perms
                    }) : V("", !0),
                    Ue(be(j, Y({
                      class: "lkt-table--save-button",
                      ref_key: "saveButtonRef",
                      ref: ie
                    }, {
                      ...F.value,
                      disabled: me.value,
                      resourceData: $e.value
                    }, {
                      onLoading: r,
                      onLoaded: y,
                      onClick: C
                    }), {
                      split: _(({ doClose: S, doRootClick: p }) => [
                        $(e.$slots, "button-save-split", {
                          doClose: S,
                          doRootClick: p,
                          dataState: f.value,
                          onButtonLoading: r,
                          onButtonLoaded: y
                        })
                      ]),
                      default: _(() => [
                        h(n)["button-save"] ? $(e.$slots, "button-save", {
                          key: 0,
                          items: s.value,
                          editMode: e.editMode,
                          canUpdate: !me.value
                        }) : V("", !0)
                      ]),
                      _: 3
                    }, 16), [
                      [je, Ve.value]
                    ]),
                    yt.value && s.value.length >= e.requiredItemsForTopCreate ? (v(), M(zt, {
                      key: 2,
                      config: ne.value,
                      disabled: !gt.value,
                      onClick: pt,
                      onAppend: Pe
                    }, null, 8, ["config", "disabled"])) : V("", !0)
                  ]),
                  _: 3
                }, 16)) : V("", !0),
                h(n)["prev-buttons-ever"] ? $(e.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: Z.value,
                  canDrop: q.value,
                  perms: e.perms
                }) : V("", !0),
                h(n)["prev-buttons"] ? $(e.$slots, "prev-buttons", {
                  key: 2,
                  canUpdate: Z.value,
                  canDrop: q.value,
                  perms: e.perms
                }) : V("", !0),
                Ue(be(j, Y({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: ie
                }, {
                  ...F.value,
                  disabled: me.value,
                  resourceData: $e.value
                }, {
                  onLoading: r,
                  onLoaded: y,
                  onClick: C
                }), {
                  split: _(({ doClose: S, doRootClick: p }) => [
                    $(e.$slots, "button-save-split", {
                      doClose: S,
                      doRootClick: p,
                      dataState: f.value,
                      onButtonLoading: r,
                      onButtonLoaded: y
                    })
                  ]),
                  default: _(() => [
                    h(n)["button-save"] ? $(e.$slots, "button-save", {
                      key: 0,
                      items: s.value,
                      editMode: e.editMode,
                      canUpdate: !me.value
                    }) : V("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [je, Ve.value]
                ]),
                yt.value && s.value.length >= e.requiredItemsForTopCreate ? (v(), M(zt, {
                  key: 3,
                  config: ne.value,
                  disabled: !gt.value,
                  onClick: pt,
                  onAppend: Pe
                }, null, 8, ["config", "disabled"])) : V("", !0),
                ce("div", Bn, [
                  Ue(be(j, Y(H.value, {
                    checked: I.value,
                    "onUpdate:checked": m[1] || (m[1] = (S) => I.value = S)
                  }), null, 16, ["checked"]), [
                    [je, De.value]
                  ])
                ])
              ], 512), [
                [je, we.value]
              ]),
              h(n).buttons ? (v(), w("div", Tn, [
                $(e.$slots, "buttons")
              ])) : V("", !0),
              R.value && h(n).filters ? (v(), w("div", An, [
                $(e.$slots, "filters", {
                  items: s.value,
                  isLoading: g.value
                })
              ])) : V("", !0),
              Ue(ce("div", En, [
                e.type === h(He).Table ? (v(), w("table", Vn, [
                  e.hideTableHeader ? V("", !0) : (v(), w("thead", Rn, [
                    ce("tr", null, [
                      st.value && I.value ? (v(), w("th", Ln)) : V("", !0),
                      e.addNavigation && I.value ? (v(), w("th", Nn)) : V("", !0),
                      (v(!0), w(G, null, ye(pe.value, (S) => (v(), w(G, null, [
                        ue.value.indexOf(S.key) === -1 ? (v(), M(Cn, {
                          key: 0,
                          column: S,
                          "sort-by": k.value,
                          "sort-direction": D.value,
                          "amount-of-columns": e.columns.length,
                          items: s.value,
                          onClick: (p) => It(S)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : V("", !0)
                      ], 64))), 256))
                    ])
                  ])),
                  ce("tbody", {
                    ref_key: "tableBody",
                    ref: c,
                    id: "lkt-table-body-" + h(Ce),
                    class: x(e.itemsContainerClass)
                  }, [
                    (v(!0), w(G, null, ye(s.value, (S, p) => Ue((v(), M(kn, {
                      modelValue: s.value[p],
                      "onUpdate:modelValue": (L) => s.value[p] = L,
                      key: tt(S, p),
                      i: p,
                      "is-draggable": Bt(S),
                      sortable: st.value,
                      "visible-columns": pe.value,
                      "empty-columns": ue.value,
                      "add-navigation": e.addNavigation,
                      "latest-row": p + 1 === se.value,
                      "can-drop": q.value && I.value,
                      "can-edit": dt.value && Z.value && I.value,
                      "can-read": Re.value,
                      "can-create": ge.value,
                      "edit-mode-enabled": I.value,
                      "has-inline-edit-perm": Je.value,
                      "row-display-type": e.rowDisplayType,
                      "render-drag": ka.value,
                      "disabled-drag": Sa.value,
                      "is-loading": g.value,
                      "item-container-class": e.itemContainerClass,
                      onClick: Ot,
                      onItemUp: N,
                      onItemDown: W,
                      onItemDrop: X
                    }, Ra({ _: 2 }, [
                      h(n)[`item-${p}`] ? {
                        name: `item-${p}`,
                        fn: _((L) => [
                          $(e.$slots, `item-${p}`, Ne({
                            [e.slotItemVar || ""]: L.item,
                            index: p,
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
                        fn: _((L) => [
                          $(e.$slots, "item", Ne({
                            [e.slotItemVar || ""]: L.item,
                            index: p,
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
                      ye(Ct.value, (L) => ({
                        name: L,
                        fn: _((nt) => [
                          $(e.$slots, L, Ne({
                            [e.slotItemVar || ""]: nt.item,
                            value: nt.value,
                            column: nt.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class"])), [
                      [je, bt(s.value[p], p)]
                    ])), 128))
                  ], 10, Mn)
                ])) : e.type === h(He).Item ? (v(), w("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: c,
                  id: "lkt-table-body-" + h(Ce),
                  class: x(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), w(G, null, ye(s.value, (S, p) => (v(), w(G, {
                    key: tt(S, p)
                  }, [
                    !e.skipTableItemsContainer && bt(S, p) ? (v(), w("div", {
                      key: 0,
                      class: x(["lkt-table-item", Tt(S, p)]),
                      "data-i": p
                    }, [
                      at.value ? (v(), M(he(at.value), Y({
                        key: 0,
                        ref_for: !0
                      }, {
                        item: S,
                        index: p,
                        editing: I.value,
                        perms: E.value,
                        data: _t.value,
                        events: e.itemSlotEvents
                      }), null, 16)) : $(e.$slots, "item", Ne({
                        key: 1,
                        [e.slotItemVar || ""]: S,
                        index: p,
                        editing: I.value,
                        canCreate: ge.value,
                        canRead: Re.value,
                        canUpdate: Z.value,
                        canDrop: q.value,
                        isLoading: g.value,
                        doDrop: () => X(p)
                      }))
                    ], 10, $n)) : bt(S, p) ? $(e.$slots, "item", Ne({
                      key: 1,
                      class: Tt(S, p),
                      dataI: p,
                      [e.slotItemVar || ""]: S,
                      index: p,
                      editing: I.value,
                      canCreate: ge.value,
                      canRead: Re.value,
                      canUpdate: Z.value,
                      canDrop: q.value,
                      isLoading: g.value,
                      doDrop: () => X(p)
                    })) : V("", !0)
                  ], 64))), 128))
                ], 10, On)) : e.type === h(He).Accordion ? (v(), w("div", {
                  key: 2,
                  ref_key: "tableBody",
                  ref: c,
                  id: "lkt-table-body-" + h(Ce),
                  class: x(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), w(G, null, ye(s.value, (S, p) => (v(), w(G, null, [
                    [h(ke).Auto, h(ke).PreferCustomItem].includes(e.rowDisplayType) && h(n)[vt(S, p)] ? $(e.$slots, vt(S, p), {
                      key: 0,
                      item: S,
                      index: p,
                      editing: I.value,
                      isLoading: g.value
                    }) : [h(ke).Auto, h(ke).PreferCustomItem].includes(e.rowDisplayType) && h(n)[`item-${p}`] ? $(e.$slots, `item-${p}`, {
                      key: 1,
                      item: S,
                      index: p,
                      editing: I.value,
                      isLoading: g.value
                    }) : (v(), w(G, { key: 2 }, [
                      bt(S, p) ? (v(), M(te, Y({
                        class: ["lkt-table-item", Tt(S, p)],
                        "data-i": p,
                        key: tt(S, p)
                      }, { ref_for: !0 }, {
                        ...e.accordion,
                        title: ya(S)
                      }), {
                        header: _(() => [
                          be(Xt, {
                            modelValue: s.value[p],
                            "onUpdate:modelValue": (L) => s.value[p] = L,
                            i: p,
                            column: _e.value,
                            columns: pe.value,
                            "edit-mode-enabled": I.value,
                            "has-inline-edit-perm": Je.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])
                        ]),
                        default: _(() => [
                          (v(!0), w(G, null, ye(pe.value, (L) => {
                            var nt, Jt;
                            return v(), w(G, null, [
                              L.key !== ((nt = _e.value) == null ? void 0 : nt.key) && e.$slots[L.key] && h(pa)(L, s.value[p]) ? $(e.$slots, L.key, {
                                key: 0,
                                value: s.value[p][L.key],
                                item: s.value[p],
                                column: L,
                                i: p
                              }) : (v(), w(G, { key: 1 }, [
                                L.key !== ((Jt = _e.value) == null ? void 0 : Jt.key) ? (v(), M(Xt, {
                                  key: 0,
                                  modelValue: s.value[p],
                                  "onUpdate:modelValue": (wa) => s.value[p] = wa,
                                  i: p,
                                  column: L,
                                  columns: pe.value,
                                  "edit-mode-enabled": I.value,
                                  "has-inline-edit-perm": Je.value
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])) : V("", !0)
                              ], 64))
                            ], 64);
                          }), 256))
                        ]),
                        _: 2
                      }, 1040, ["class", "data-i"])) : V("", !0)
                    ], 64))
                  ], 64))), 256))
                ], 10, _n)) : ga.value ? (v(), M(he(e.type), {
                  key: 3,
                  class: x(["lkt-table-items-container", e.itemsContainerClass])
                }, {
                  default: _(() => [
                    (v(!0), w(G, null, ye(s.value, (S, p) => (v(), w(G, {
                      key: tt(S, p)
                    }, [
                      bt(S, p) ? (v(), w("li", {
                        key: 0,
                        class: x(["lkt-table-item", Tt(S, p)]),
                        "data-i": p
                      }, [
                        at.value ? (v(), M(he(at.value), Y({
                          key: 0,
                          ref_for: !0
                        }, {
                          item: S,
                          index: p,
                          editing: I.value,
                          perms: E.value,
                          data: _t.value,
                          events: e.itemSlotEvents
                        }), null, 16)) : $(e.$slots, "item", Ne({
                          key: 1,
                          [e.slotItemVar || ""]: S,
                          index: p,
                          editing: I.value,
                          canCreate: ge.value,
                          canRead: Re.value,
                          canUpdate: Z.value,
                          canDrop: q.value,
                          isLoading: g.value,
                          doDrop: () => X(p)
                        }))
                      ], 10, Fn)) : V("", !0)
                    ], 64))), 128))
                  ]),
                  _: 3
                }, 8, ["class"])) : e.type === h(He).Carousel ? (v(), w("div", {
                  key: 4,
                  ref_key: "tableBody",
                  ref: c,
                  id: "lkt-table-body-" + h(Ce),
                  class: x(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  be(h(en), Y({
                    modelValue: ae.value,
                    "onUpdate:modelValue": m[2] || (m[2] = (S) => ae.value = S)
                  }, e.carousel, {
                    "wrap-around": ((ht = e.carousel) == null ? void 0 : ht.infinite) === !0
                  }), {
                    addons: _(() => [
                      be(h(nn)),
                      be(h(ln))
                    ]),
                    default: _(() => [
                      (v(!0), w(G, null, ye(wt.value, (S, p) => (v(), M(h(na), {
                        key: S,
                        index: p
                      }, {
                        default: _(() => [
                          ce("div", Un, [
                            $(e.$slots, S)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (v(!0), w(G, null, ye(s.value, (S, p) => (v(), M(h(na), {
                        key: e.slide,
                        index: p
                      }, {
                        default: _(() => [
                          ce("div", jn, [
                            at.value ? (v(), M(he(at.value), Y({
                              key: 0,
                              ref_for: !0
                            }, {
                              item: S,
                              index: p,
                              editing: I.value,
                              perms: E.value,
                              data: _t.value,
                              events: e.itemSlotEvents
                            }), null, 16)) : $(e.$slots, "item", Ne({
                              key: 1,
                              [e.slotItemVar || ""]: S,
                              index: p,
                              editing: I.value,
                              canCreate: ge.value,
                              canRead: Re.value,
                              canUpdate: Z.value,
                              canDrop: q.value,
                              isLoading: g.value,
                              doDrop: () => X(p)
                            }))
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128))
                    ]),
                    _: 3
                  }, 16, ["modelValue", "wrap-around"])
                ], 10, Pn)) : V("", !0)
              ], 512), [
                [je, Ze.value]
              ]),
              !g.value && s.value.length === 0 ? (v(), w("div", zn, [
                h(n).empty ? $(e.$slots, "empty", { key: 0 }) : ba.value ? (v(), M(he(ha.value), {
                  key: 1,
                  message: e.noResultsText
                }, null, 8, ["message"])) : e.noResultsText ? (v(), w(G, { key: 2 }, [
                  Ge(Xe(e.noResultsText), 1)
                ], 64)) : V("", !0)
              ])) : V("", !0),
              g.value ? (v(), M(de, { key: 3 })) : V("", !0),
              yt.value || h(n).bottomButtons ? (v(), w("div", Hn, [
                yt.value && s.value.length >= e.requiredItemsForBottomCreate ? (v(), M(zt, {
                  key: 0,
                  config: ne.value,
                  disabled: !gt.value,
                  onClick: pt,
                  onAppend: Pe
                }, null, 8, ["config", "disabled"])) : V("", !0),
                $(e.$slots, "bottom-buttons")
              ])) : V("", !0),
              e.paginator && Object.keys(e.paginator).length > 0 ? (v(), M(At, Y({
                key: 5,
                ref_key: "paginatorRef",
                ref: We
              }, e.paginator, {
                modelValue: d.value,
                "onUpdate:modelValue": m[3] || (m[3] = (S) => d.value = S),
                onLoading: Nt,
                onPerms: xe,
                onResponse: Q
              }), null, 16, ["modelValue"])) : V("", !0),
              h(n)["web-element-actions"] ? $(e.$slots, "web-element-actions", { key: 6 }) : V("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, wn);
    };
  }
}), Qn = {
  install: (t) => {
    t.component("lkt-table") === void 0 && t.component("lkt-table", qn);
  }
}, Zn = (t) => (ve.navButtonSlot = t, !0), el = (t) => (ve.createButtonSlot = t, !0), tl = (t) => {
  ve.defaultEmptySlot = t;
};
export {
  ll as Column,
  ol as createColumn,
  Qn as default,
  on as defaultTableSorter,
  el as setTableCreateButtonSlot,
  tl as setTableEmptySlot,
  Zn as setTableNavButtonSlot
};
