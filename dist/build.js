import { defineComponent as fe, computed as s, ref as A, shallowReactive as Ht, watch as P, watchEffect as Ft, onMounted as Xt, onBeforeUnmount as Da, reactive as Pt, provide as la, h as X, useId as Ia, inject as St, getCurrentInstance as Ba, onUnmounted as Ta, onUpdated as Aa, cloneVNode as Ea, resolveComponent as Se, createBlock as $, createElementBlock as w, unref as k, openBlock as v, mergeProps as K, withCtx as F, createTextVNode as at, toDisplayString as nt, Fragment as G, useSlots as oa, normalizeClass as W, createCommentVNode as E, createElementVNode as ce, createVNode as be, resolveDynamicComponent as he, renderSlot as O, renderList as ye, mergeDefaults as Va, nextTick as Et, normalizeProps as Ne, withDirectives as Ue, vShow as je, createSlots as Ra } from "vue";
import { __ as La } from "lkt-i18n";
import { ColumnType as bt, FieldType as qe, MultipleOptionsDisplay as Na, SortDirection as Ge, Column as ia, extractPropValue as Ma, TableRowType as ke, extractI18nValue as ra, LktSettings as Te, ensureButtonConfig as ze, TablePermission as Ie, PaginatorType as Vt, TableType as He, getDefaultValues as Oa, Table as $a, ButtonType as Ut } from "lkt-vue-kernel";
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
}, xe = Symbol("carousel"), Ha = (t) => {
  const o = Ht([]), i = (l) => {
    l !== void 0 ? o.slice(l).forEach((n, a) => {
      var y;
      (y = n.exposed) === null || y === void 0 || y.setIndex(l + a);
    }) : o.forEach((n, a) => {
      var y;
      (y = n.exposed) === null || y === void 0 || y.setIndex(a);
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
  const l = [], n = o === "before", a = n ? -i : 0, y = n ? 0 : i;
  if (t.length <= 0)
    return l;
  for (let b = a; b < y; b++) {
    const r = {
      index: n ? b : b + t.length,
      isClone: !0,
      position: o,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${o}-${b}`
    }, h = t[(b % t.length + t.length) % t.length].vnode, B = Ea(h, r);
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
function xa(t, o) {
  return Object.keys(t).filter((i) => !o.includes(i)).reduce((i, l) => (i[l] = t[l], i), {});
}
function Xa(t) {
  const { isVertical: o, isReversed: i, dragged: l, effectiveSlideSize: n } = t, a = o ? l.y : l.x;
  if (a === 0)
    return 0;
  const y = Math.round(a / n);
  return i ? y : -y;
}
function Be({ val: t, max: o, min: i }) {
  return o < i ? t : Math.min(Math.max(t, isNaN(i) ? t : i), isNaN(o) ? t : o);
}
function Ya(t) {
  const { transform: o } = window.getComputedStyle(t);
  return o.split(/[(,)]/).slice(1, -1).map((i) => parseFloat(i));
}
function Ka(t) {
  let o = 1, i = 1;
  return t.forEach((l) => {
    const n = Ya(l);
    n.length === 6 && (o /= n[0], i /= n[3]);
  }), { widthMultiplier: o, heightMultiplier: i };
}
function Wa(t, o) {
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
  return l !== void 0 ? Wa(i, l) : t !== void 0 && o !== void 0 ? Ja(i, t, o) : 0;
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
  function a(...y) {
    if (i)
      return;
    i = !0;
    const b = () => {
      n = requestAnimationFrame((I) => {
        I - l > o ? (l = I, t(...y), i = !1) : b();
      });
    };
    b();
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
    const t = St(xe);
    return t ? () => X("div", {
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
    const a = Ha(i), y = a.getSlides(), b = s(() => y.length), I = A(null), r = A(null), h = A(0), B = s(() => Object.assign(Object.assign(Object.assign({}, z), xa(t, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, z.i18n), t.i18n) })), d = Ht(Object.assign({}, B.value)), m = A((n = t.modelValue) !== null && n !== void 0 ? n : 0), V = A(m.value);
    P(m, (u) => V.value = u);
    const L = A(0), Xe = s(() => Math.ceil((b.value - 1) / 2)), oe = s(() => b.value - 1), ie = s(() => 0);
    let J = null, c = null, D = null;
    const re = s(() => h.value + d.gap), U = s(() => {
      const u = d.dir || "ltr";
      return u in Lt ? Lt[u] : u;
    }), ae = s(() => ["rtl", "btt"].includes(U.value)), _ = s(() => ["ttb", "btt"].includes(U.value)), ne = s(() => d.itemsToShow === "auto"), H = s(() => _.value ? "height" : "width");
    function Me() {
      var u;
      if (!Ve.value)
        return;
      const g = (B.value.breakpointMode === "carousel" ? (u = I.value) === null || u === void 0 ? void 0 : u.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, C = Object.keys(t.breakpoints || {}).map((N) => Number(N)).sort((N, Y) => +Y - +N), T = {};
      C.some((N) => g >= N ? (Object.assign(T, t.breakpoints[N]), T.i18n && Object.assign(T.i18n, B.value.i18n, t.breakpoints[N].i18n), !0) : !1), Object.assign(d, B.value, T);
    }
    const Ae = jt(() => {
      Me(), pe(), ue();
    }), Ye = Ht(/* @__PURE__ */ new Set()), Q = A([]);
    function Nt({ widthMultiplier: u, heightMultiplier: g }) {
      Q.value = y.map((C) => {
        var T;
        const N = (T = C.exposed) === null || T === void 0 ? void 0 : T.getBoundingRect();
        return {
          width: N.width * u,
          height: N.height * g
        };
      });
    }
    const Oe = A({
      width: 0,
      height: 0
    });
    function Ce({ widthMultiplier: u, heightMultiplier: g }) {
      var C;
      const T = ((C = r.value) === null || C === void 0 ? void 0 : C.getBoundingClientRect()) || { width: 0, height: 0 };
      Oe.value = {
        width: T.width * u,
        height: T.height * g
      };
    }
    function ue() {
      if (!r.value)
        return;
      const u = Ka(Ye);
      if (Ce(u), Nt(u), ne.value)
        h.value = qa(Q.value.map((g) => g[H.value]));
      else {
        const g = Number(d.itemsToShow), C = (g - 1) * d.gap;
        h.value = (Oe.value[H.value] - C) / g;
      }
    }
    function pe() {
      !d.wrapAround && b.value > 0 && (m.value = Be({
        val: m.value,
        max: oe.value,
        min: ie.value
      })), ne.value || (d.itemsToShow = Be({
        val: Number(d.itemsToShow),
        max: b.value,
        min: 1
      }));
    }
    const lt = s(() => typeof t.ignoreAnimations == "string" ? t.ignoreAnimations.split(",") : Array.isArray(t.ignoreAnimations) ? t.ignoreAnimations : t.ignoreAnimations ? !1 : []);
    Ft(() => pe()), Ft(() => {
      ue();
    });
    let Ee;
    const Ct = (u) => {
      const g = u.target;
      if (!(!(g != null && g.contains(I.value)) || Array.isArray(lt.value) && lt.value.includes(u.animationName)) && (Ye.add(g), !Ee)) {
        const C = () => {
          Ee = requestAnimationFrame(() => {
            ue(), C();
          });
        };
        C();
      }
    }, wt = (u) => {
      const g = u.target;
      g && Ye.delete(g), Ee && Ye.size === 0 && (cancelAnimationFrame(Ee), ue());
    }, Ve = A(!1);
    typeof document < "u" && Ft(() => {
      Ve.value && lt.value !== !1 ? (document.addEventListener("animationstart", Ct), document.addEventListener("animationend", wt)) : (document.removeEventListener("animationstart", Ct), document.removeEventListener("animationend", wt));
    }), Xt(() => {
      Ve.value = !0, Me(), Dt(), I.value && (D = new ResizeObserver(Ae), D.observe(I.value)), i("init");
    }), Da(() => {
      Ve.value = !1, a.cleanup(), c && clearTimeout(c), Ee && cancelAnimationFrame(Ee), J && clearInterval(J), D && (D.disconnect(), D = null), typeof document < "u" && Re(), I.value && (I.value.removeEventListener("transitionend", ue), I.value.removeEventListener("animationiteration", ue));
    });
    let we = !1;
    const me = { x: 0, y: 0 }, se = Pt({ x: 0, y: 0 }), $e = A(!1), ot = A(!1), Mt = () => {
      $e.value = !0;
    }, it = () => {
      $e.value = !1;
    }, rt = jt((u) => {
      if (!u.ctrlKey)
        switch (u.key) {
          case "ArrowLeft":
          case "ArrowUp":
            _.value === u.key.endsWith("Up") && (ae.value ? De(!0) : Je(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            _.value === u.key.endsWith("Down") && (ae.value ? Je(!0) : De(!0));
            break;
        }
    }, 200), ge = () => {
      document.addEventListener("keydown", rt);
    }, Re = () => {
      document.removeEventListener("keydown", rt);
    };
    function Z(u) {
      const g = u.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(g) || q.value || (we = u.type === "touchstart", !we && (u.preventDefault(), u.button !== 0)))
        return;
      me.x = "touches" in u ? u.touches[0].clientX : u.clientX, me.y = "touches" in u ? u.touches[0].clientY : u.clientY;
      const C = we ? "touchmove" : "mousemove", T = we ? "touchend" : "mouseup";
      document.addEventListener(C, ut, { passive: !1 }), document.addEventListener(T, Ke, { passive: !0 });
    }
    const ut = jt((u) => {
      ot.value = !0;
      const g = "touches" in u ? u.touches[0].clientX : u.clientX, C = "touches" in u ? u.touches[0].clientY : u.clientY;
      se.x = g - me.x, se.y = C - me.y;
      const T = Xa({
        isVertical: _.value,
        isReversed: ae.value,
        dragged: se,
        effectiveSlideSize: re.value
      });
      V.value = d.wrapAround ? m.value + T : Be({
        val: m.value + T,
        max: oe.value,
        min: ie.value
      }), i("drag", { deltaX: se.x, deltaY: se.y });
    });
    function Ke() {
      if (ut.cancel(), V.value !== m.value && !we) {
        const C = (T) => {
          T.preventDefault(), window.removeEventListener("click", C);
        };
        window.addEventListener("click", C);
      }
      Le(V.value), se.x = 0, se.y = 0, ot.value = !1;
      const u = we ? "touchmove" : "mousemove", g = we ? "touchend" : "mouseup";
      document.removeEventListener(u, ut), document.removeEventListener(g, Ke);
    }
    function Dt() {
      !d.autoplay || d.autoplay <= 0 || (J = setInterval(() => {
        d.pauseAutoplayOnHover && $e.value || De();
      }, d.autoplay));
    }
    function st() {
      J && (clearInterval(J), J = null);
    }
    function We() {
      st(), Dt();
    }
    const q = A(!1);
    function Le(u, g = !1) {
      if (!g && q.value)
        return;
      let C = u, T = u;
      L.value = m.value, d.wrapAround ? T = fa({
        val: C,
        max: oe.value,
        min: ie.value
      }) : C = Be({
        val: C,
        max: oe.value,
        min: ie.value
      }), i("slide-start", {
        slidingToIndex: u,
        currentSlideIndex: m.value,
        prevSlideIndex: L.value,
        slidesCount: b.value
      }), st(), q.value = !0, m.value = C, T !== C && dt.pause(), i("update:modelValue", T), c = setTimeout(() => {
        d.wrapAround && T !== C && (dt.resume(), m.value = T, i("loop", {
          currentSlideIndex: m.value,
          slidingToIndex: u
        })), i("slide-end", {
          currentSlideIndex: m.value,
          prevSlideIndex: L.value,
          slidesCount: b.value
        }), q.value = !1, We();
      }, d.transition);
    }
    function De(u = !1) {
      Le(m.value + d.itemsToScroll, u);
    }
    function Je(u = !1) {
      Le(m.value - d.itemsToScroll, u);
    }
    function _e() {
      Me(), pe(), ue(), We();
    }
    P(() => [B.value, t.breakpoints], () => Me(), { deep: !0 }), P(() => t.autoplay, () => We());
    const dt = P(() => t.modelValue, (u) => {
      u !== m.value && Le(Number(u), !0);
    });
    i("before-init");
    const Fe = s(() => {
      if (!d.wrapAround)
        return { before: 0, after: 0 };
      if (ne.value)
        return { before: y.length, after: y.length };
      const u = Number(d.itemsToShow), g = Math.ceil(u + (d.itemsToScroll - 1)), C = g - V.value, T = g - (b.value - (V.value + 1));
      return {
        before: Math.max(0, C),
        after: Math.max(0, T)
      };
    }), le = s(() => Fe.value.before ? ne.value ? Q.value.slice(-1 * Fe.value.before).reduce((u, g) => u + g[H.value] + d.gap, 0) * -1 : Fe.value.before * re.value * -1 : 0), ct = s(() => {
      var u;
      if (ne.value) {
        const g = (m.value % y.length + y.length) % y.length;
        return qt({
          slideSize: (u = Q.value[g]) === null || u === void 0 ? void 0 : u[H.value],
          viewportSize: Oe.value[H.value],
          align: d.snapAlign
        });
      }
      return qt({
        align: d.snapAlign,
        itemsToShow: +d.itemsToShow
      });
    }), Qe = s(() => {
      let u = 0;
      if (ne.value) {
        if (m.value < 0 ? u = Q.value.slice(m.value).reduce((g, C) => g + C[H.value] + d.gap, 0) * -1 : u = Q.value.slice(0, m.value).reduce((g, C) => g + C[H.value] + d.gap, 0), u -= ct.value, !d.wrapAround) {
          const g = Q.value.reduce((C, T) => C + T[H.value] + d.gap, 0) - Oe.value[H.value] - d.gap;
          u = Be({
            val: u,
            max: g,
            min: 0
          });
        }
      } else {
        let g = m.value - ct.value;
        d.wrapAround || (g = Be({
          val: g,
          max: b.value - +d.itemsToShow,
          min: 0
        })), u = g * re.value;
      }
      return u * (ae.value ? 1 : -1);
    }), It = s(() => {
      var u, g;
      if (!ne.value) {
        const N = m.value - ct.value;
        return d.wrapAround ? {
          min: Math.floor(N),
          max: Math.ceil(N + Number(d.itemsToShow) - 1)
        } : {
          min: Math.floor(Be({
            val: N,
            max: b.value - Number(d.itemsToShow),
            min: 0
          })),
          max: Math.ceil(Be({
            val: N + Number(d.itemsToShow) - 1,
            max: b.value - 1,
            min: 0
          }))
        };
      }
      let C = 0;
      {
        let N = 0, Y = 0 - Fe.value.before;
        const x = Math.abs(Qe.value + le.value);
        for (; N <= x; ) {
          const ee = (Y % y.length + y.length) % y.length;
          N += ((u = Q.value[ee]) === null || u === void 0 ? void 0 : u[H.value]) + d.gap, Y++;
        }
        C = Y - 1;
      }
      let T = 0;
      {
        let N = C, Y = 0;
        for (N < 0 ? Y = Q.value.slice(0, N).reduce((x, ee) => x + ee[H.value] + d.gap, 0) - Math.abs(Qe.value + le.value) : Y = Q.value.slice(0, N).reduce((x, ee) => x + ee[H.value] + d.gap, 0) - Math.abs(Qe.value); Y < Oe.value[H.value]; ) {
          const x = (N % y.length + y.length) % y.length;
          Y += ((g = Q.value[x]) === null || g === void 0 ? void 0 : g[H.value]) + d.gap, N++;
        }
        T = N - 1;
      }
      return {
        min: Math.floor(C),
        max: Math.ceil(T)
      };
    }), Ot = s(() => {
      if (d.slideEffect === "fade")
        return;
      const u = _.value ? "Y" : "X", g = _.value ? se.y : se.x;
      let C = Qe.value + g;
      if (!d.wrapAround && d.preventExcessiveDragging) {
        let T = 0;
        ne.value ? T = Q.value.reduce((x, ee) => x + ee[H.value], 0) : T = (b.value - Number(d.itemsToShow)) * re.value;
        const N = ae.value ? 0 : -1 * T, Y = ae.value ? T : 0;
        C = Be({
          val: C,
          min: N,
          max: Y
        });
      }
      return `translate${u}(${C}px)`;
    }), $t = s(() => ({
      "--vc-transition-duration": q.value ? Rt(d.transition, "ms") : void 0,
      "--vc-slide-gap": Rt(d.gap),
      "--vc-carousel-height": Rt(d.height),
      "--vc-cloned-offset": Rt(le.value)
    })), Bt = { slideTo: Le, next: De, prev: Je }, vt = Pt({
      activeSlide: V,
      config: d,
      currentSlide: m,
      isSliding: q,
      isVertical: _,
      maxSlide: oe,
      minSlide: ie,
      nav: Bt,
      normalizedDir: U,
      slideRegistry: a,
      slideSize: h,
      slides: y,
      slidesCount: b,
      viewport: r,
      visibleRange: It
    });
    la(xe, vt);
    const Pe = Pt({
      config: d,
      currentSlide: m,
      maxSlide: oe,
      middleSlide: Xe,
      minSlide: ie,
      slideSize: h,
      slidesCount: b
    });
    return l({
      data: Pe,
      nav: Bt,
      next: De,
      prev: Je,
      restartCarousel: _e,
      slideTo: Le,
      updateBreakpointsConfig: Me,
      updateSlideSize: ue,
      updateSlidesData: pe
    }), () => {
      var u;
      const g = o.default || o.slides, C = (g == null ? void 0 : g(Pe)) || [], { before: T, after: N } = Fe.value, Y = Qt({
        slides: y,
        position: "before",
        toShow: T
      }), x = Qt({
        slides: y,
        position: "after",
        toShow: N
      }), ee = [...Y, ...C, ...x];
      if (!d.enabled || !ee.length)
        return X("section", {
          ref: I,
          class: ["carousel", "is-disabled"]
        }, ee);
      const ft = ((u = o.addons) === null || u === void 0 ? void 0 : u.call(o, Pe)) || [], Ze = X("ol", {
        class: "carousel__track",
        style: { transform: Ot.value },
        onMousedownCapture: d.mouseDrag ? Z : null,
        onTouchstartPassiveCapture: d.touchDrag ? Z : null
      }, ee), pt = X("div", { class: "carousel__viewport", ref: r }, Ze);
      return X("section", {
        ref: I,
        class: [
          "carousel",
          `is-${U.value}`,
          `is-effect-${d.slideEffect}`,
          {
            "is-vertical": _.value,
            "is-sliding": q.value,
            "is-dragging": ot.value,
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
        onMouseleave: it
      }, [pt, ft, X(Qa)]);
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
    const o = St(xe, null);
    return () => {
      const i = t.name;
      if (!i || !ta(i))
        return;
      const l = tn[i], n = X("path", { d: l }), a = (o == null ? void 0 : o.config.i18n[ea(i)]) || t.title, y = X("title", a);
      return X("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": a
      }, [y, n]);
    };
  }
}), nn = fe({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(t, { slots: o, attrs: i }) {
    const l = St(xe);
    if (!l)
      return () => "";
    const { next: n, prev: a } = o, y = () => ({
      btt: "arrowDown",
      ltr: "arrowLeft",
      rtl: "arrowRight",
      ttb: "arrowUp"
    })[l.normalizedDir], b = () => ({
      btt: "arrowUp",
      ltr: "arrowRight",
      rtl: "arrowLeft",
      ttb: "arrowDown"
    })[l.normalizedDir], I = s(() => !l.config.wrapAround && l.currentSlide <= l.minSlide), r = s(() => !l.config.wrapAround && l.currentSlide >= l.maxSlide);
    return () => {
      const { i18n: h } = l.config, B = X("button", Object.assign(Object.assign({ type: "button", disabled: I.value, "aria-label": h.ariaPreviousSlide, title: h.ariaPreviousSlide, onClick: l.nav.prev }, i), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": I.value },
        i.class
      ] }), (a == null ? void 0 : a()) || X(aa, { name: y() })), d = X("button", Object.assign(Object.assign({ type: "button", disabled: r.value, "aria-label": h.ariaNextSlide, title: h.ariaNextSlide, onClick: l.nav.next }, i), { class: [
        "carousel__next",
        { "carousel__next--disabled": r.value },
        i.class
      ] }), (n == null ? void 0 : n()) || X(aa, { name: b() }));
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
    const o = St(xe);
    if (!o)
      return () => "";
    const i = s(() => o.config.itemsToShow), l = s(() => qt({
      align: o.config.snapAlign,
      itemsToShow: i.value
    })), n = s(() => t.paginateByItemsToShow && i.value > 1), a = s(() => Math.ceil((o.activeSlide - l.value) / i.value)), y = s(() => Math.ceil(o.slidesCount / i.value)), b = (I) => fa(n.value ? {
      val: a.value,
      max: y.value - 1,
      min: 0
    } : {
      val: o.activeSlide,
      max: o.maxSlide,
      min: o.minSlide
    }) === I;
    return () => {
      var I, r;
      const h = [];
      for (let B = n.value ? 0 : o.minSlide; B <= (n.value ? y.value - 1 : o.maxSlide); B++) {
        const d = va(o.config.i18n[n.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: B + 1
        }), m = b(B), V = X("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": m
          },
          "aria-label": d,
          "aria-pressed": m,
          "aria-controls": (r = (I = o.slides[B]) === null || I === void 0 ? void 0 : I.exposed) === null || r === void 0 ? void 0 : r.id,
          title: d,
          disabled: t.disableOnClick,
          onClick: () => o.nav.slideTo(n.value ? Math.floor(B * +o.config.itemsToShow + l.value) : B)
        }), L = X("li", { class: "carousel__pagination-item", key: B }, V);
        h.push(L);
      }
      return X("ol", { class: "carousel__pagination" }, h);
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
    const n = St(xe);
    if (la(xe, void 0), !n)
      return () => "";
    const a = A(t.index), y = (V) => {
      a.value = V;
    }, b = Ba(), I = () => {
      const V = b.vnode.el;
      return V ? V.getBoundingClientRect() : { width: 0, height: 0 };
    };
    l({
      id: t.id,
      setIndex: y,
      getBoundingRect: I
    });
    const r = s(() => a.value === n.activeSlide), h = s(() => a.value === n.activeSlide - 1), B = s(() => a.value === n.activeSlide + 1), d = s(() => a.value >= n.visibleRange.min && a.value <= n.visibleRange.max), m = s(() => {
      if (n.config.itemsToShow === "auto")
        return;
      const V = n.config.itemsToShow, L = n.config.gap > 0 && V > 1 ? `calc(${100 / V}% - ${n.config.gap * (V - 1) / V}px)` : `${100 / V}%`;
      return n.isVertical ? { height: L } : { width: L };
    });
    return n.slideRegistry.registerSlide(b, t.index), Ta(() => {
      n.slideRegistry.unregisterSlide(b);
    }), t.isClone && (Xt(() => {
      Zt(b.vnode);
    }), Aa(() => {
      Zt(b.vnode);
    })), () => {
      var V, L;
      return n.config.enabled ? X("li", {
        style: [o.style, Object.assign({}, m.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": t.isClone,
          "carousel__slide--visible": d.value,
          "carousel__slide--active": r.value,
          "carousel__slide--prev": h.value,
          "carousel__slide--next": B.value,
          "carousel__slide--sliding": n.isSliding
        },
        onFocusin: () => {
          n.viewport && (n.viewport.scrollLeft = 0), n.nav.slideTo(a.value);
        },
        id: t.isClone ? void 0 : t.id,
        "aria-hidden": t.isClone || void 0
      }, (L = i.default) === null || L === void 0 ? void 0 : L.call(i, {
        currentIndex: a.value,
        isActive: r.value,
        isClone: t.isClone,
        isPrev: h.value,
        isNext: B.value,
        isSliding: n.isSliding,
        isVisible: d.value
      })) : (V = i.default) === null || V === void 0 ? void 0 : V.call(i);
    };
  }
}), on = (t, o, i, l) => {
  var y, b, I, r, h;
  if (!i) return 0;
  let n, a;
  if (i.type === bt.Field ? [qe.Number, qe.Range].includes((y = i.field) == null ? void 0 : y.type) ? (n = parseFloat(t[i.key]), a = parseFloat(o[i.key])) : [qe.Date, qe.Date].includes((b = i.field) == null ? void 0 : b.type) ? (n = t[i.key], a = o[i.key]) : ((I = i.field) == null ? void 0 : I.type) === qe.Select && ((r = i.field) != null && r.multiple) && ((h = i.field) == null ? void 0 : h.multipleDisplay) === Na.Count ? (n = t[i.key].length, a = o[i.key].length) : (n = String(t[i.key]).toLowerCase(), a = String(o[i.key]).toLowerCase()) : (n = String(t[i.key]).toLowerCase(), a = String(o[i.key]).toLowerCase()), l === Ge.Asc) {
    if (n > a) return 1;
    if (a > n) return -1;
  } else {
    if (n > a) return -1;
    if (a > n) return 1;
  }
  return 0;
}, ht = (t, o, i, l = []) => {
  if (t.extractTitleFromColumn) {
    let n = l.find((a) => a.key === t.extractTitleFromColumn);
    if (n)
      return ht(n, o, i, l);
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
    let a = Yt(t, n);
    a > 0 && a < l && (l = a);
  }), l;
}, Yt = (t, o) => t.colspan === !1 ? !1 : typeof t.colspan == "function" ? t.colspan(o) : t.colspan, pa = (t, o) => typeof t.preferSlot > "u" ? !0 : t.preferSlot === !1 ? !1 : typeof t.preferSlot == "function" ? t.preferSlot(o) : !0, un = (t, o, i) => {
  if (typeof t != "object" || !t.key || o.indexOf(t.key) > -1) return !1;
  let l = Yt(t, i);
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
    const i = o, l = t, n = A(l.modelValue);
    P(() => l.modelValue, (r) => {
      n.value = r;
    }), P(n, (r) => {
      i("update:modelValue", r);
    });
    const a = s(() => ({ ...l.column.slotData, item: n.value })), y = s(() => {
      var r, h, B, d;
      if ((r = l.column.field) != null && r.modalData && typeof ((h = l.column.field) == null ? void 0 : h.modalData) == "object")
        for (let m in l.column.field.modalData)
          if (typeof ((B = l.column.field) == null ? void 0 : B.modalData[m]) == "string" && l.column.field.modalData[m].startsWith("prop:")) {
            let V = l.column.field.modalData[m].substring(5);
            n.value[V];
          } else
            l.column.field.modalData[m];
      return (d = l.column.field) == null ? void 0 : d.modalData;
    }), b = s(() => typeof l.column.field == "string" && l.column.field.startsWith("prop:") ? Ma(l.column.field, n.value) : l.column.field), I = s(() => {
      var r, h, B, d;
      return l.column.type === bt.Field ? !((h = (r = l.column) == null ? void 0 : r.field) != null && h.label) && (l.column.ensureFieldLabel || [
        qe.Switch,
        qe.Check
      ].includes((B = l.column.field) == null ? void 0 : B.type)) ? l.column.label : (d = l.column.field) == null ? void 0 : d.label : "";
    });
    return (r, h) => {
      const B = Se("lkt-anchor"), d = Se("lkt-button"), m = Se("lkt-field");
      return r.column.type === k(bt).Anchor ? (v(), $(B, K({ key: 0 }, r.column.anchor, { prop: n.value }), {
        default: F(() => [
          at(nt(k(ht)(r.column, n.value, r.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : r.column.type === k(bt).Button ? (v(), $(d, K({ key: 1 }, r.column.button, { prop: n.value }), {
        default: F(() => [
          at(nt(k(ht)(r.column, n.value, r.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : r.column.type === k(bt).Field ? (v(), $(m, K({
        key: 2,
        modelValue: n.value[r.column.key],
        "onUpdate:modelValue": h[0] || (h[0] = (V) => n.value[r.column.key] = V)
      }, {
        ...b.value,
        readMode: !r.hasInlineEditPerm || b.value.readMode,
        slotData: a.value,
        label: I.value,
        modalData: y.value,
        prop: n.value
      }), null, 16, ["modelValue"])) : (v(), w(G, { key: 3 }, [
        at(nt(k(ht)(r.column, n.value, r.i, r.columns)), 1)
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
    let y = typeof n.rowDisplayType == "function" ? n.rowDisplayType(a.value, n.i) : n.rowDisplayType;
    y || (y = ke.Auto);
    const b = [ke.Auto, ke.PreferCustomItem].includes(y), I = [ke.Auto, ke.PreferItem].includes(y), r = (c) => l("click", c), h = s(() => {
      let c = [], D = typeof n.disabledDrag == "function" ? n.disabledDrag(a.value) : oe.value === !0;
      return !D && n.sortable && n.isDraggable ? c.push("handle") : D && c.push("disabled"), c.join(" ");
    }), B = s(() => ve.navButtonSlot !== ""), d = s(() => ve.navButtonSlot), m = () => {
      l("item-up", n.i);
    }, V = () => {
      l("item-down", n.i);
    }, L = () => {
      l("item-drop", n.i);
    };
    P(() => n.modelValue, (c) => a.value = c), P(a, (c) => {
      l("update:modelValue", c);
    }, { deep: !0 });
    const Xe = s(() => typeof n.renderDrag == "function" ? n.renderDrag(a.value) : n.renderDrag === !0), oe = s(() => typeof n.disabledDrag == "function" ? n.disabledDrag(a.value) : n.disabledDrag === !0), ie = s(() => h.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), J = s(() => {
      let c = [];
      return b && c.push("type-custom-item"), I && c.push("type-item"), typeof n.itemContainerClass == "function" ? c.push(n.itemContainerClass(a.value, n.i)) : n.itemContainerClass !== "" && c.push(n.itemContainerClass), c.join(" ");
    });
    return (c, D) => {
      const re = Se("lkt-button");
      return v(), w("tr", {
        "data-i": c.i,
        "data-draggable": c.isDraggable,
        class: W(J.value)
      }, [
        c.sortable && c.editModeEnabled && Xe.value ? (v(), w("td", {
          key: 0,
          "data-role": ie.value,
          class: W(h.value),
          "data-i": c.i
        }, D[2] || (D[2] = [
          ce("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]), 10, vn)) : E("", !0),
        c.addNavigation && c.editModeEnabled ? (v(), w("td", fn, [
          ce("div", pn, [
            be(re, {
              palette: "table-nav",
              disabled: c.i === 0,
              onClick: m
            }, {
              default: F(() => [
                B.value ? (v(), $(he(d.value), {
                  key: 0,
                  direction: "up"
                })) : (v(), w("i", mn))
              ]),
              _: 1
            }, 8, ["disabled"]),
            be(re, {
              palette: "table-nav",
              disabled: c.latestRow,
              onClick: V
            }, {
              default: F(() => [
                B.value ? (v(), $(he(d.value), {
                  key: 0,
                  direction: "down"
                })) : (v(), w("i", gn))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : E("", !0),
        k(b) && k(i)[`item-${c.i}`] ? (v(), w("td", {
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
            doDrop: () => L()
          })
        ], 8, yn)) : k(I) && k(i).item ? (v(), w("td", {
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
            doDrop: () => L()
          })
        ], 8, bn)) : (v(!0), w(G, { key: 4 }, ye(c.visibleColumns, (U) => (v(), w(G, null, [
          k(un)(U, c.emptyColumns, a.value) ? (v(), w("td", {
            key: "td" + c.i,
            "data-column": U.key,
            colspan: k(Yt)(U, a.value),
            title: k(ht)(U, a.value, c.i, c.visibleColumns),
            class: W(k(ma)(U)),
            onClick: D[1] || (D[1] = (ae) => r(ae))
          }, [
            c.$slots[U.key] && k(pa)(U, a.value) ? O(c.$slots, U.key, {
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
          ], 10, hn)) : E("", !0)
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
    var r;
    const i = o, l = t, n = s(() => ve.createButtonSlot !== ""), a = s(() => ve.createButtonSlot), y = {
      ...(r = l.config) == null ? void 0 : r.modalData,
      beforeClose: (h) => {
        "itemCreated" in h && h.itemCreated === !0 && i("append", h.item);
      }
    }, b = {
      ...l.config
    };
    b.modalData = y;
    const I = () => {
      var h;
      if (!((h = l.config) != null && h.modal)) {
        i("click");
        return;
      }
    };
    return (h, B) => {
      const d = Se("lkt-button");
      return v(), $(d, K(b, {
        disabled: h.disabled,
        onClick: I
      }), {
        default: F(() => [
          n.value ? (v(), $(he(a.value), { key: 0 })) : E("", !0)
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
    const i = o, l = t, n = s(() => rn(l.column, l.amountOfColumns, l.items)), a = s(() => l.column.sortable === !0), y = s(() => a.value && l.sortBy === l.column.key ? l.sortDirection : ""), b = s(() => ra(l.column.label)), I = s(() => a.value && l.sortBy === l.column.key ? l.sortDirection === Ge.Asc ? Te.defaultTableSortAscIcon : l.sortDirection === Ge.Desc ? Te.defaultTableSortDescIcon : "" : ""), r = () => i("click", l.column);
    return (h, B) => (v(), w("th", {
      "data-column": h.column.key,
      "data-sortable": a.value,
      "data-sort": y.value,
      colspan: n.value,
      title: b.value,
      class: W(k(ma)(h.column)),
      onClick: r
    }, [
      ce("div", null, [
        at(nt(b.value) + " ", 1),
        I.value ? (v(), w("i", {
          key: 0,
          class: W(I.value)
        }, null, 2)) : E("", !0)
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
    var Kt, Wt;
    const l = i, n = oa(), a = t, y = A(typeof a.sorter == "function" ? a.sorter : on), b = A(sn(a.columns)), I = A(Ge.Asc), r = A(a.modelValue), h = A(null), B = A(a.columns), d = A((Kt = a.paginator) == null ? void 0 : Kt.modelValue), m = A(a.loading), V = A(!1), L = A(a.perms), Xe = A(null), oe = A(null), ie = A(null), J = A({}), c = A(new Pa({ items: r.value }, a.dataStateConfig)), D = A(a.editMode), re = A(0), U = A(null), ae = A(((Wt = a.carousel) == null ? void 0 : Wt.currentSlide) || 0), _ = A(ze(a.saveButton, Te.defaultSaveButton)), ne = A(ze(a.createButton, Te.defaultCreateButton)), H = A(ze(a.editModeButton, Te.defaultEditModeButton)), Me = A(ze(a.groupButton, Te.defaultGroupButton));
    P(() => a.saveButton, (e) => _.value = ze(a.saveButton, Te.defaultSaveButton)), P(() => a.createButton, (e) => ne.value = ze(a.createButton, Te.defaultCreateButton)), P(() => a.editModeButton, (e) => H.value = ze(a.editModeButton, Te.defaultEditModeButton));
    const Ae = A(!1);
    P(m, (e) => l("update:loading", e)), P(d, (e) => l("page", e));
    const Ye = (e) => {
      L.value = e;
    }, Q = (e) => {
      var p;
      if (Array.isArray(e.data)) {
        let M = e.data;
        typeof ((p = a.events) == null ? void 0 : p.parseResults) == "function" && (M = a.events.parseResults(M)), r.value = [...r.value, ...M];
      }
      m.value = !1, V.value = !0, c.value.store({ items: r.value }).turnStoredIntoOriginal(), Ae.value = !1, Et(() => {
        me.value, l("read-response", e);
      });
    }, Nt = () => Et(() => {
      var e;
      (!a.paginator || ![Vt.LoadMore, Vt.Infinite].includes((e = a.paginator) == null ? void 0 : e.type)) && r.value.splice(0, r.value.length), m.value = !0;
    }), Oe = () => {
      Xe.value.doRefresh();
    }, Ce = _a(12), ue = s(() => {
      if (!a.hideEmptyColumns) return [];
      let e = [];
      return B.value.forEach((p) => {
        let M = p.key, j = !1;
        r.value.forEach((te) => {
          if (typeof te.checkEmpty == "function")
            return te.checkEmpty(te);
          te[M] && (j = !0);
        }), j || e.push(M);
      }), e;
    }), pe = s(() => B.value.filter((e) => !e.hidden)), lt = s(() => B.value.filter((e) => e.isForRowKey)), Ee = s(() => B.value.map((e) => e.key)), Ct = s(() => {
      let e = [];
      for (let p in n) Ee.value.indexOf(p) !== -1 && e.push(p);
      return e;
    }), wt = s(() => {
      let e = [];
      for (let p in n) p.indexOf("slide-") !== -1 && e.push(p);
      return e;
    }), Ve = s(() => {
      var e;
      return a.hiddenSave || m.value || !((e = _.value) != null && e.resource || _.value.type) ? !1 : D.value && Ae.value ? !0 : D.value;
    }), we = s(() => mt.value && r.value.length >= a.requiredItemsForTopCreate || De.value ? !0 : Ve.value || D.value && ge.value), me = s(() => {
      var e, p;
      return re.value, typeof ((e = _.value) == null ? void 0 : e.disabled) == "function" ? _.value.disabled({
        value: r.value,
        dataState: c.value
      }) : typeof ((p = _.value) == null ? void 0 : p.disabled) == "boolean" ? _.value.disabled : !Ae.value;
    }), se = s(() => r.value.length), $e = s(() => {
      var e;
      return {
        items: r.value,
        ...(e = _.value) == null ? void 0 : e.resourceData
      };
    }), ot = s(() => a.titleTag === "" ? "h2" : a.titleTag), Mt = s(() => a.wrapContentTag === "" ? "div" : a.wrapContentTag), it = s(() => ra(a.title)), rt = s(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }), ge = s(() => L.value.includes(Ie.Create)), Re = s(() => L.value.includes("read")), Z = s(() => L.value.includes(Ie.Update)), ut = s(() => L.value.includes(Ie.Edit)), Ke = s(() => L.value.includes(Ie.InlineEdit)), Dt = s(() => L.value.includes(Ie.ModalCreate)), st = s(() => L.value.includes(Ie.InlineCreate)), We = s(() => L.value.includes(Ie.InlineCreateEver)), q = s(() => L.value.includes(Ie.Drop)), Le = s(() => L.value.includes(Ie.SwitchEditMode)), De = s(() => !Le.value || !Z.value && !q.value || !Z.value && q.value ? !1 : !m.value), Je = s(() => {
      var e;
      return (typeof ((e = a.paginator) == null ? void 0 : e.type) < "u" && [Vt.LoadMore, Vt.Infinite].includes(a.paginator.type) || !m.value) && r.value.length > 0;
    }), _e = s(() => B.value.find((e) => e.isForAccordionHeader)), dt = (e, p) => typeof a.customItemSlotName == "function" ? a.customItemSlotName(e, p) : "", Fe = (e) => {
      let p = e.target;
      if (typeof p.dataset.column > "u")
        do
          p = p.parentNode;
        while (typeof p.dataset.column > "u" && p.tagName !== "TABLE" && p.tagName !== "body");
      if (p.tagName === "TD" && (p = p.parentNode, p = p.dataset.i, typeof p < "u"))
        return r.value[p];
    }, le = () => {
      re.value = ja();
    }, ct = (e) => r.value[e], Qe = (e) => {
      var p;
      return (p = h.value) == null ? void 0 : p.querySelector(`[data-i="${e}"]`);
    }, It = (e) => {
      e && e.sortable && (e.key === b.value && (I.value = I.value === Ge.Asc ? Ge.Desc : Ge.Asc), b.value = e.key, r.value = r.value.sort((p, M) => y.value(p, M, e, I.value)), le(), l("sort", {
        sortBy: b.value,
        sortDirection: I.value
      }));
    }, Ot = (e) => {
      l("click", e);
    }, $t = (e) => {
      var M, j, te, de, At, yt, S, f;
      let p = parseInt((de = (te = (j = (M = e == null ? void 0 : e.originalEvent) == null ? void 0 : M.toElement) == null ? void 0 : j.closest("tr")) == null ? void 0 : te.dataset) == null ? void 0 : de.i);
      return !(typeof ((At = a.drag) == null ? void 0 : At.isValid) == "function" && !((yt = a.drag) != null && yt.isValid(r.value[p])) || typeof ((S = a.drag) == null ? void 0 : S.isValid) == "boolean" && !((f = a.drag) != null && f.isValid));
    }, Bt = (e) => {
      var p, M;
      return typeof ((p = a.drag) == null ? void 0 : p.isDraggable) == "function" ? (M = a.drag) == null ? void 0 : M.isDraggable(e) : !0;
    }, vt = () => {
      if (ge.value) {
        l("click-create");
        return;
      }
      if (st.value || We.value) {
        if (typeof a.newValueGenerator == "function") {
          let e = a.newValueGenerator();
          if (typeof e == "object" || a.type !== He.Table) {
            r.value.push(e);
            return;
          }
        }
        r.value.push({});
      } else
        l("click-create");
    }, Pe = (e) => {
      r.value.push(e);
    }, u = () => m.value = !0, g = () => m.value = !1, C = (e, p) => {
      var M, j, te;
      if (!((M = _.value) != null && M.type && [
        Ut.Split,
        Ut.SplitEver,
        Ut.SplitLazy
      ].includes((j = _.value) == null ? void 0 : j.type))) {
        if (l("before-save"), (te = _.value) != null && te.resource && (m.value = !1, !p.success)) {
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
      T(r.value, e, e - 1), le();
    }, Y = (e) => {
      T(r.value, e, e + 1), le();
    }, x = (e) => {
      r.value.splice(e, 1), le();
    }, ee = () => {
      var e;
      J.value && typeof ((e = J.value) == null ? void 0 : e.destroy) == "function" && (J.value.destroy(), J.value = {});
    }, ft = () => {
      U.value || (U.value = document.getElementById("lkt-table-body-" + Ce)), J.value = new Ua(U.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let p = e.oldIndex, M = e.newIndex;
          r.value.splice(M, 0, r.value.splice(p, 1)[0]), le(), l("drag-end", r.value[M]);
        },
        onMove: function(e, p) {
          return $t(e);
        }
      });
    }, Ze = (e, p, M = !1) => {
      let j = [re.value, Ce, "row", p];
      return M && j.push("hidden"), lt.value.forEach((te) => {
        let de = String(e[te.key]).toLowerCase();
        de.length > 50 && (de = de.substring(0, 50)), de = Fa(de, " ", "-"), j.push(de);
      }), j.join("-");
    }, pt = s(() => typeof a.createEnabledValidator == "function" ? a.createEnabledValidator({ items: r.value }) : !0), mt = s(() => a.createButton === !1 ? !1 : We.value || ge.value && D.value || st.value && D.value || Dt.value && D.value), ga = s(() => [He.Ol, He.Ul].includes(a.type)), gt = (e, p) => typeof a.itemDisplayChecker == "function" ? a.itemDisplayChecker(e, p) : !0, Tt = (e, p) => typeof a.itemContainerClass == "function" ? a.itemContainerClass(e, p) : a.itemContainerClass, ya = (e, p) => _e.value ? e[_e.value.key] : "", et = s(() => typeof a.itemSlotComponent == "function" ? a.itemSlotComponent() : a.itemSlotComponent), _t = s(() => typeof a.itemSlotData == "function" ? a.itemSlotData() : a.itemSlotData);
    Xt(() => {
      var e;
      a.initialSorting && It(dn(a.columns, b.value)), c.value.store({ items: r.value }).turnStoredIntoOriginal(), Ae.value = !1, (e = a.drag) != null && e.enabled && Et(() => {
        ft();
      });
    }), P(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }, (e) => {
      e ? ft() : ee();
    }), P(() => a.type, (e) => {
      var p;
      (p = a.drag) != null && p.enabled ? ft() : ee();
    }), P(() => a.perms, (e) => L.value = e), P(L, (e) => l("update:perms", e)), P(D, (e) => {
      l("update:editMode", e);
    }), P(() => a.editMode, (e) => D.value = e), P(() => a.columns, (e) => B.value = e, { deep: !0 }), P(() => a.modelValue, (e) => {
      r.value = e;
    }, { deep: !0 }), P(r, (e) => {
      c.value.increment({ items: e }), Ae.value = c.value.changed(), l("update:modelValue", e);
    }, { deep: !0 }), o({
      getItemByEvent: Fe,
      getItemByIndex: ct,
      getRowByIndex: Qe,
      doRefresh: Oe,
      doRemoveIndex: (e) => {
        r.value.splice(e, 1), le();
      },
      getHtml: () => oe.value,
      reRender: le,
      turnStoredIntoOriginal: () => {
        c.value.turnStoredIntoOriginal(), Et(() => {
          le();
        });
      }
    });
    const ba = s(() => typeof ve.defaultEmptySlot < "u"), ha = s(() => ve.defaultEmptySlot), ka = s(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled ? !1 : typeof a.drag.canRender > "u" ? !0 : a.drag.canRender), Sa = s(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled || typeof a.drag.isDisabled > "u" ? !1 : a.drag.isDisabled), Ca = s(() => typeof a.header == "object" && Object.keys(a.header).length > 0);
    return (e, p) => {
      const M = Se("lkt-header"), j = Se("lkt-button"), te = Se("lkt-accordion"), de = Se("lkt-loader"), At = Se("lkt-paginator");
      return v(), w("section", {
        ref_key: "element",
        ref: oe,
        class: "lkt-table-page",
        id: "lkt-table-page-" + k(Ce)
      }, [
        Ca.value ? (v(), $(M, Ne(K({ key: 0 }, e.header)), null, 16)) : it.value || k(n).title ? (v(), w("header", {
          key: 1,
          class: W(e.headerClass)
        }, [
          it.value ? (v(), $(he(ot.value), { key: 0 }, {
            default: F(() => [
              e.titleIcon ? (v(), w("i", {
                key: 0,
                class: W(e.titleIcon)
              }, null, 2)) : E("", !0),
              at(" " + nt(it.value), 1)
            ]),
            _: 1
          })) : E("", !0),
          k(n).title ? O(e.$slots, "title", { key: 1 }) : E("", !0)
        ], 2)) : E("", !0),
        (v(), $(he(Mt.value), {
          class: W(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: F(() => {
            var yt;
            return [
              Ue(ce("div", Dn, [
                e.groupButton !== !1 ? (v(), $(j, K({
                  key: 0,
                  ref: "groupButton"
                }, Me.value, { class: "lkt-item-crud-group-button" }), {
                  split: F(() => [
                    ce("div", In, [
                      Ue(be(j, K(H.value, {
                        checked: D.value,
                        "onUpdate:checked": p[0] || (p[0] = (S) => D.value = S)
                      }), null, 16, ["checked"]), [
                        [je, De.value]
                      ])
                    ]),
                    k(n)["prev-buttons-ever"] ? O(e.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: Z.value,
                      canDrop: q.value,
                      perms: e.perms
                    }) : E("", !0),
                    k(n)["prev-buttons"] ? O(e.$slots, "prev-buttons", {
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
                      onLoading: u,
                      onLoaded: g,
                      onClick: C
                    }), {
                      split: F(({ doClose: S, doRootClick: f }) => [
                        O(e.$slots, "button-save-split", {
                          doClose: S,
                          doRootClick: f,
                          dataState: c.value,
                          onButtonLoading: u,
                          onButtonLoaded: g
                        })
                      ]),
                      default: F(() => [
                        k(n)["button-save"] ? O(e.$slots, "button-save", {
                          key: 0,
                          items: r.value,
                          editMode: e.editMode,
                          canUpdate: !me.value
                        }) : E("", !0)
                      ]),
                      _: 3
                    }, 16), [
                      [je, Ve.value]
                    ]),
                    mt.value && r.value.length >= e.requiredItemsForTopCreate ? (v(), $(zt, {
                      key: 2,
                      config: ne.value,
                      disabled: !pt.value,
                      onClick: vt,
                      onAppend: Pe
                    }, null, 8, ["config", "disabled"])) : E("", !0)
                  ]),
                  _: 3
                }, 16)) : E("", !0),
                k(n)["prev-buttons-ever"] ? O(e.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: Z.value,
                  canDrop: q.value,
                  perms: e.perms
                }) : E("", !0),
                k(n)["prev-buttons"] ? O(e.$slots, "prev-buttons", {
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
                  onLoading: u,
                  onLoaded: g,
                  onClick: C
                }), {
                  split: F(({ doClose: S, doRootClick: f }) => [
                    O(e.$slots, "button-save-split", {
                      doClose: S,
                      doRootClick: f,
                      dataState: c.value,
                      onButtonLoading: u,
                      onButtonLoaded: g
                    })
                  ]),
                  default: F(() => [
                    k(n)["button-save"] ? O(e.$slots, "button-save", {
                      key: 0,
                      items: r.value,
                      editMode: e.editMode,
                      canUpdate: !me.value
                    }) : E("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [je, Ve.value]
                ]),
                mt.value && r.value.length >= e.requiredItemsForTopCreate ? (v(), $(zt, {
                  key: 3,
                  config: ne.value,
                  disabled: !pt.value,
                  onClick: vt,
                  onAppend: Pe
                }, null, 8, ["config", "disabled"])) : E("", !0),
                ce("div", Bn, [
                  Ue(be(j, K(H.value, {
                    checked: D.value,
                    "onUpdate:checked": p[1] || (p[1] = (S) => D.value = S)
                  }), null, 16, ["checked"]), [
                    [je, De.value]
                  ])
                ])
              ], 512), [
                [je, we.value]
              ]),
              k(n).buttons ? (v(), w("div", Tn, [
                O(e.$slots, "buttons")
              ])) : E("", !0),
              V.value && k(n).filters ? (v(), w("div", An, [
                O(e.$slots, "filters", {
                  items: r.value,
                  isLoading: m.value
                })
              ])) : E("", !0),
              Ue(ce("div", En, [
                e.type === k(He).Table ? (v(), w("table", Vn, [
                  e.hideTableHeader ? E("", !0) : (v(), w("thead", Rn, [
                    ce("tr", null, [
                      rt.value && D.value ? (v(), w("th", Ln)) : E("", !0),
                      e.addNavigation && D.value ? (v(), w("th", Nn)) : E("", !0),
                      (v(!0), w(G, null, ye(pe.value, (S) => (v(), w(G, null, [
                        ue.value.indexOf(S.key) === -1 ? (v(), $(Cn, {
                          key: 0,
                          column: S,
                          "sort-by": b.value,
                          "sort-direction": I.value,
                          "amount-of-columns": e.columns.length,
                          items: r.value,
                          onClick: (f) => It(S)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : E("", !0)
                      ], 64))), 256))
                    ])
                  ])),
                  ce("tbody", {
                    ref_key: "tableBody",
                    ref: h,
                    id: "lkt-table-body-" + k(Ce),
                    class: W(e.itemsContainerClass)
                  }, [
                    (v(!0), w(G, null, ye(r.value, (S, f) => Ue((v(), $(kn, {
                      modelValue: r.value[f],
                      "onUpdate:modelValue": (R) => r.value[f] = R,
                      key: Ze(S, f),
                      i: f,
                      "is-draggable": Bt(S),
                      sortable: rt.value,
                      "visible-columns": pe.value,
                      "empty-columns": ue.value,
                      "add-navigation": e.addNavigation,
                      "latest-row": f + 1 === se.value,
                      "can-drop": q.value && D.value,
                      "can-edit": ut.value && Z.value && D.value,
                      "can-read": Re.value,
                      "can-create": ge.value,
                      "edit-mode-enabled": D.value,
                      "has-inline-edit-perm": Ke.value,
                      "row-display-type": e.rowDisplayType,
                      "render-drag": ka.value,
                      "disabled-drag": Sa.value,
                      "is-loading": m.value,
                      "item-container-class": e.itemContainerClass,
                      onClick: Ot,
                      onItemUp: N,
                      onItemDown: Y,
                      onItemDrop: x
                    }, Ra({ _: 2 }, [
                      k(n)[`item-${f}`] ? {
                        name: `item-${f}`,
                        fn: F((R) => [
                          O(e.$slots, `item-${f}`, Ne({
                            [e.slotItemVar || ""]: R.item,
                            index: f,
                            editing: R.editing,
                            canCreate: R.canCreate,
                            canRead: R.canRead,
                            canUpdate: R.canUpdate,
                            canDrop: R.canDrop,
                            isLoading: R.isLoading,
                            doDrop: R.doDrop
                          }))
                        ]),
                        key: "0"
                      } : k(n).item ? {
                        name: "item",
                        fn: F((R) => [
                          O(e.$slots, "item", Ne({
                            [e.slotItemVar || ""]: R.item,
                            index: f,
                            editing: R.editing,
                            canCreate: R.canCreate,
                            canRead: R.canRead,
                            canUpdate: R.canUpdate,
                            canDrop: R.canDrop,
                            isLoading: R.isLoading,
                            doDrop: R.doDrop
                          }))
                        ]),
                        key: "1"
                      } : void 0,
                      ye(Ct.value, (R) => ({
                        name: R,
                        fn: F((tt) => [
                          O(e.$slots, R, Ne({
                            [e.slotItemVar || ""]: tt.item,
                            value: tt.value,
                            column: tt.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class"])), [
                      [je, gt(r.value[f], f)]
                    ])), 128))
                  ], 10, Mn)
                ])) : e.type === k(He).Item ? (v(), w("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: h,
                  id: "lkt-table-body-" + k(Ce),
                  class: W(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), w(G, null, ye(r.value, (S, f) => (v(), w(G, {
                    key: Ze(S, f)
                  }, [
                    !e.skipTableItemsContainer && gt(S, f) ? (v(), w("div", {
                      key: 0,
                      class: W(["lkt-table-item", Tt(S, f)]),
                      "data-i": f
                    }, [
                      et.value ? (v(), $(he(et.value), K({
                        key: 0,
                        ref_for: !0
                      }, {
                        item: S,
                        index: f,
                        editing: D.value,
                        perms: L.value,
                        data: _t.value,
                        events: e.itemSlotEvents
                      }), null, 16)) : O(e.$slots, "item", Ne({
                        key: 1,
                        [e.slotItemVar || ""]: S,
                        index: f,
                        editing: D.value,
                        canCreate: ge.value,
                        canRead: Re.value,
                        canUpdate: Z.value,
                        canDrop: q.value,
                        isLoading: m.value,
                        doDrop: () => x(f)
                      }))
                    ], 10, $n)) : gt(S, f) ? O(e.$slots, "item", Ne({
                      key: 1,
                      class: Tt(S, f),
                      dataI: f,
                      [e.slotItemVar || ""]: S,
                      index: f,
                      editing: D.value,
                      canCreate: ge.value,
                      canRead: Re.value,
                      canUpdate: Z.value,
                      canDrop: q.value,
                      isLoading: m.value,
                      doDrop: () => x(f)
                    })) : E("", !0)
                  ], 64))), 128))
                ], 10, On)) : e.type === k(He).Accordion ? (v(), w("div", {
                  key: 2,
                  ref_key: "tableBody",
                  ref: h,
                  id: "lkt-table-body-" + k(Ce),
                  class: W(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), w(G, null, ye(r.value, (S, f) => (v(), w(G, null, [
                    [k(ke).Auto, k(ke).PreferCustomItem].includes(e.rowDisplayType) && k(n)[dt(S, f)] ? O(e.$slots, dt(S, f), {
                      key: 0,
                      item: S,
                      index: f,
                      editing: D.value,
                      isLoading: m.value
                    }) : [k(ke).Auto, k(ke).PreferCustomItem].includes(e.rowDisplayType) && k(n)[`item-${f}`] ? O(e.$slots, `item-${f}`, {
                      key: 1,
                      item: S,
                      index: f,
                      editing: D.value,
                      isLoading: m.value
                    }) : (v(), w(G, { key: 2 }, [
                      gt(S, f) ? (v(), $(te, K({
                        class: ["lkt-table-item", Tt(S, f)],
                        "data-i": f,
                        key: Ze(S, f)
                      }, { ref_for: !0 }, {
                        ...e.accordion,
                        title: ya(S)
                      }), {
                        header: F(() => [
                          be(xt, {
                            modelValue: r.value[f],
                            "onUpdate:modelValue": (R) => r.value[f] = R,
                            i: f,
                            column: _e.value,
                            columns: pe.value,
                            "edit-mode-enabled": D.value,
                            "has-inline-edit-perm": Ke.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])
                        ]),
                        default: F(() => [
                          (v(!0), w(G, null, ye(pe.value, (R) => {
                            var tt, Jt;
                            return v(), w(G, null, [
                              R.key !== ((tt = _e.value) == null ? void 0 : tt.key) && e.$slots[R.key] && k(pa)(R, r.value[f]) ? O(e.$slots, R.key, {
                                key: 0,
                                value: r.value[f][R.key],
                                item: r.value[f],
                                column: R,
                                i: f
                              }) : (v(), w(G, { key: 1 }, [
                                R.key !== ((Jt = _e.value) == null ? void 0 : Jt.key) ? (v(), $(xt, {
                                  key: 0,
                                  modelValue: r.value[f],
                                  "onUpdate:modelValue": (wa) => r.value[f] = wa,
                                  i: f,
                                  column: R,
                                  columns: pe.value,
                                  "edit-mode-enabled": D.value,
                                  "has-inline-edit-perm": Ke.value
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])) : E("", !0)
                              ], 64))
                            ], 64);
                          }), 256))
                        ]),
                        _: 2
                      }, 1040, ["class", "data-i"])) : E("", !0)
                    ], 64))
                  ], 64))), 256))
                ], 10, _n)) : ga.value ? (v(), $(he(e.type), {
                  key: 3,
                  class: W(["lkt-table-items-container", e.itemsContainerClass])
                }, {
                  default: F(() => [
                    (v(!0), w(G, null, ye(r.value, (S, f) => (v(), w(G, {
                      key: Ze(S, f)
                    }, [
                      gt(S, f) ? (v(), w("li", {
                        key: 0,
                        class: W(["lkt-table-item", Tt(S, f)]),
                        "data-i": f
                      }, [
                        et.value ? (v(), $(he(et.value), K({
                          key: 0,
                          ref_for: !0
                        }, {
                          item: S,
                          index: f,
                          editing: D.value,
                          perms: L.value,
                          data: _t.value,
                          events: e.itemSlotEvents
                        }), null, 16)) : O(e.$slots, "item", Ne({
                          key: 1,
                          [e.slotItemVar || ""]: S,
                          index: f,
                          editing: D.value,
                          canCreate: ge.value,
                          canRead: Re.value,
                          canUpdate: Z.value,
                          canDrop: q.value,
                          isLoading: m.value,
                          doDrop: () => x(f)
                        }))
                      ], 10, Fn)) : E("", !0)
                    ], 64))), 128))
                  ]),
                  _: 3
                }, 8, ["class"])) : e.type === k(He).Carousel ? (v(), w("div", {
                  key: 4,
                  ref_key: "tableBody",
                  ref: h,
                  id: "lkt-table-body-" + k(Ce),
                  class: W(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  be(k(en), K({
                    modelValue: ae.value,
                    "onUpdate:modelValue": p[2] || (p[2] = (S) => ae.value = S)
                  }, e.carousel, {
                    "wrap-around": ((yt = e.carousel) == null ? void 0 : yt.infinite) === !0
                  }), {
                    addons: F(() => [
                      be(k(nn)),
                      be(k(ln))
                    ]),
                    default: F(() => [
                      (v(!0), w(G, null, ye(wt.value, (S, f) => (v(), $(k(na), {
                        key: S,
                        index: f
                      }, {
                        default: F(() => [
                          ce("div", Un, [
                            O(e.$slots, S)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (v(!0), w(G, null, ye(r.value, (S, f) => (v(), $(k(na), {
                        key: e.slide,
                        index: f
                      }, {
                        default: F(() => [
                          ce("div", jn, [
                            et.value ? (v(), $(he(et.value), K({
                              key: 0,
                              ref_for: !0
                            }, {
                              item: S,
                              index: f,
                              editing: D.value,
                              perms: L.value,
                              data: _t.value,
                              events: e.itemSlotEvents
                            }), null, 16)) : O(e.$slots, "item", Ne({
                              key: 1,
                              [e.slotItemVar || ""]: S,
                              index: f,
                              editing: D.value,
                              canCreate: ge.value,
                              canRead: Re.value,
                              canUpdate: Z.value,
                              canDrop: q.value,
                              isLoading: m.value,
                              doDrop: () => x(f)
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
                [je, Je.value]
              ]),
              !m.value && r.value.length === 0 ? (v(), w("div", zn, [
                k(n).empty ? O(e.$slots, "empty", { key: 0 }) : ba.value ? (v(), $(he(ha.value), {
                  key: 1,
                  message: e.noResultsText
                }, null, 8, ["message"])) : e.noResultsText ? (v(), w(G, { key: 2 }, [
                  at(nt(e.noResultsText), 1)
                ], 64)) : E("", !0)
              ])) : E("", !0),
              m.value ? (v(), $(de, { key: 3 })) : E("", !0),
              mt.value || k(n).bottomButtons ? (v(), w("div", Hn, [
                mt.value && r.value.length >= e.requiredItemsForBottomCreate ? (v(), $(zt, {
                  key: 0,
                  config: ne.value,
                  disabled: !pt.value,
                  onClick: vt,
                  onAppend: Pe
                }, null, 8, ["config", "disabled"])) : E("", !0),
                O(e.$slots, "bottom-buttons")
              ])) : E("", !0),
              e.paginator && Object.keys(e.paginator).length > 0 ? (v(), $(At, K({
                key: 5,
                ref_key: "paginatorRef",
                ref: Xe
              }, e.paginator, {
                modelValue: d.value,
                "onUpdate:modelValue": p[3] || (p[3] = (S) => d.value = S),
                onLoading: Nt,
                onPerms: Ye,
                onResponse: Q
              }), null, 16, ["modelValue"])) : E("", !0),
              k(n)["web-element-actions"] ? O(e.$slots, "web-element-actions", { key: 6 }) : E("", !0)
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
