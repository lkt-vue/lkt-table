import { defineComponent as fe, computed as s, ref as A, shallowReactive as zt, watch as F, watchEffect as _t, onMounted as xt, onBeforeUnmount as Da, reactive as Pt, provide as la, h as X, useId as Ia, inject as ht, getCurrentInstance as Ba, onUnmounted as Ta, onUpdated as Aa, cloneVNode as Ea, resolveComponent as Se, createBlock as $, createElementBlock as w, unref as b, openBlock as v, mergeProps as K, withCtx as P, createTextVNode as tt, toDisplayString as at, Fragment as G, useSlots as oa, normalizeClass as W, createCommentVNode as E, createElementVNode as ce, createVNode as be, resolveDynamicComponent as he, renderSlot as O, renderList as ye, mergeDefaults as Va, nextTick as Tt, normalizeProps as Ne, withDirectives as Ue, vShow as je, createSlots as Ra } from "vue";
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
}, Ge = Symbol("carousel"), za = (t) => {
  const o = zt([]), i = (l) => {
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
function Ha(t) {
  return t.length === 0 ? 0 : t.reduce((i, l) => i + l, 0) / t.length;
}
function Qt({ slides: t, position: o, toShow: i }) {
  const l = [], n = o === "before", a = n ? -i : 0, y = n ? 0 : i;
  if (t.length <= 0)
    return l;
  for (let k = a; k < y; k++) {
    const r = {
      index: n ? k : k + t.length,
      isClone: !0,
      position: o,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${o}-${k}`
    }, S = t[(k % t.length + t.length) % t.length].vnode, I = Ea(S, r);
    I.el = null, l.push(I);
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
function Ga(t, o) {
  return Object.keys(t).filter((i) => !o.includes(i)).reduce((i, l) => (i[l] = t[l], i), {});
}
function xa(t) {
  const { isVertical: o, isReversed: i, dragged: l, effectiveSlideSize: n } = t, a = o ? l.y : l.x;
  if (a === 0)
    return 0;
  const y = Math.round(a / n);
  return i ? y : -y;
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
  function a(...y) {
    if (i)
      return;
    i = !0;
    const k = () => {
      n = requestAnimationFrame((T) => {
        T - l > o ? (l = T, t(...y), i = !1) : k();
      });
    };
    k();
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
    const t = ht(Ge);
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
    const a = za(i), y = a.getSlides(), k = s(() => y.length), T = A(null), r = A(null), S = A(0), I = s(() => Object.assign(Object.assign(Object.assign({}, z), Ga(t, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, z.i18n), t.i18n) })), d = zt(Object.assign({}, I.value)), m = A((n = t.modelValue) !== null && n !== void 0 ? n : 0), V = A(m.value);
    F(m, (u) => V.value = u);
    const L = A(0), xe = s(() => Math.ceil((k.value - 1) / 2)), oe = s(() => k.value - 1), ie = s(() => 0);
    let J = null, c = null, D = null;
    const re = s(() => S.value + d.gap), U = s(() => {
      const u = d.dir || "ltr";
      return u in Rt ? Rt[u] : u;
    }), ae = s(() => ["rtl", "btt"].includes(U.value)), _ = s(() => ["ttb", "btt"].includes(U.value)), ne = s(() => d.itemsToShow === "auto"), H = s(() => _.value ? "height" : "width");
    function Me() {
      var u;
      if (!Ve.value)
        return;
      const g = (I.value.breakpointMode === "carousel" ? (u = T.value) === null || u === void 0 ? void 0 : u.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, C = Object.keys(t.breakpoints || {}).map((N) => Number(N)).sort((N, Y) => +Y - +N), B = {};
      C.some((N) => g >= N ? (Object.assign(B, t.breakpoints[N]), B.i18n && Object.assign(B.i18n, I.value.i18n, t.breakpoints[N].i18n), !0) : !1), Object.assign(d, I.value, B);
    }
    const Ae = Ut(() => {
      Me(), pe(), ue();
    }), Xe = zt(/* @__PURE__ */ new Set()), Q = A([]);
    function Lt({ widthMultiplier: u, heightMultiplier: g }) {
      Q.value = y.map((C) => {
        var B;
        const N = (B = C.exposed) === null || B === void 0 ? void 0 : B.getBoundingRect();
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
      const B = ((C = r.value) === null || C === void 0 ? void 0 : C.getBoundingClientRect()) || { width: 0, height: 0 };
      Oe.value = {
        width: B.width * u,
        height: B.height * g
      };
    }
    function ue() {
      if (!r.value)
        return;
      const u = Ya(Xe);
      if (Ce(u), Lt(u), ne.value)
        S.value = Ha(Q.value.map((g) => g[H.value]));
      else {
        const g = Number(d.itemsToShow), C = (g - 1) * d.gap;
        S.value = (Oe.value[H.value] - C) / g;
      }
    }
    function pe() {
      !d.wrapAround && k.value > 0 && (m.value = Be({
        val: m.value,
        max: oe.value,
        min: ie.value
      })), ne.value || (d.itemsToShow = Be({
        val: Number(d.itemsToShow),
        max: k.value,
        min: 1
      }));
    }
    const nt = s(() => typeof t.ignoreAnimations == "string" ? t.ignoreAnimations.split(",") : Array.isArray(t.ignoreAnimations) ? t.ignoreAnimations : t.ignoreAnimations ? !1 : []);
    _t(() => pe()), _t(() => {
      ue();
    });
    let Ee;
    const kt = (u) => {
      const g = u.target;
      if (!(!(g != null && g.contains(T.value)) || Array.isArray(nt.value) && nt.value.includes(u.animationName)) && (Xe.add(g), !Ee)) {
        const C = () => {
          Ee = requestAnimationFrame(() => {
            ue(), C();
          });
        };
        C();
      }
    }, St = (u) => {
      const g = u.target;
      g && Xe.delete(g), Ee && Xe.size === 0 && (cancelAnimationFrame(Ee), ue());
    }, Ve = A(!1);
    typeof document < "u" && _t(() => {
      Ve.value && nt.value !== !1 ? (document.addEventListener("animationstart", kt), document.addEventListener("animationend", St)) : (document.removeEventListener("animationstart", kt), document.removeEventListener("animationend", St));
    }), xt(() => {
      Ve.value = !0, Me(), Ct(), T.value && (D = new ResizeObserver(Ae), D.observe(T.value)), i("init");
    }), Da(() => {
      Ve.value = !1, a.cleanup(), c && clearTimeout(c), Ee && cancelAnimationFrame(Ee), J && clearInterval(J), D && (D.disconnect(), D = null), typeof document < "u" && Re(), T.value && (T.value.removeEventListener("transitionend", ue), T.value.removeEventListener("animationiteration", ue));
    });
    let we = !1;
    const me = { x: 0, y: 0 }, se = Pt({ x: 0, y: 0 }), $e = A(!1), lt = A(!1), Nt = () => {
      $e.value = !0;
    }, ot = () => {
      $e.value = !1;
    }, it = Ut((u) => {
      if (!u.ctrlKey)
        switch (u.key) {
          case "ArrowLeft":
          case "ArrowUp":
            _.value === u.key.endsWith("Up") && (ae.value ? De(!0) : We(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            _.value === u.key.endsWith("Down") && (ae.value ? We(!0) : De(!0));
            break;
        }
    }, 200), ge = () => {
      document.addEventListener("keydown", it);
    }, Re = () => {
      document.removeEventListener("keydown", it);
    };
    function Z(u) {
      const g = u.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(g) || q.value || (we = u.type === "touchstart", !we && (u.preventDefault(), u.button !== 0)))
        return;
      me.x = "touches" in u ? u.touches[0].clientX : u.clientX, me.y = "touches" in u ? u.touches[0].clientY : u.clientY;
      const C = we ? "touchmove" : "mousemove", B = we ? "touchend" : "mouseup";
      document.addEventListener(C, rt, { passive: !1 }), document.addEventListener(B, Ye, { passive: !0 });
    }
    const rt = Ut((u) => {
      lt.value = !0;
      const g = "touches" in u ? u.touches[0].clientX : u.clientX, C = "touches" in u ? u.touches[0].clientY : u.clientY;
      se.x = g - me.x, se.y = C - me.y;
      const B = xa({
        isVertical: _.value,
        isReversed: ae.value,
        dragged: se,
        effectiveSlideSize: re.value
      });
      V.value = d.wrapAround ? m.value + B : Be({
        val: m.value + B,
        max: oe.value,
        min: ie.value
      }), i("drag", { deltaX: se.x, deltaY: se.y });
    });
    function Ye() {
      if (rt.cancel(), V.value !== m.value && !we) {
        const C = (B) => {
          B.preventDefault(), window.removeEventListener("click", C);
        };
        window.addEventListener("click", C);
      }
      Le(V.value), se.x = 0, se.y = 0, lt.value = !1;
      const u = we ? "touchmove" : "mousemove", g = we ? "touchend" : "mouseup";
      document.removeEventListener(u, rt), document.removeEventListener(g, Ye);
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
    function Le(u, g = !1) {
      if (!g && q.value)
        return;
      let C = u, B = u;
      L.value = m.value, d.wrapAround ? B = fa({
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
        slidesCount: k.value
      }), ut(), q.value = !0, m.value = C, B !== C && st.pause(), i("update:modelValue", B), c = setTimeout(() => {
        d.wrapAround && B !== C && (st.resume(), m.value = B, i("loop", {
          currentSlideIndex: m.value,
          slidingToIndex: u
        })), i("slide-end", {
          currentSlideIndex: m.value,
          prevSlideIndex: L.value,
          slidesCount: k.value
        }), q.value = !1, Ke();
      }, d.transition);
    }
    function De(u = !1) {
      Le(m.value + d.itemsToScroll, u);
    }
    function We(u = !1) {
      Le(m.value - d.itemsToScroll, u);
    }
    function _e() {
      Me(), pe(), ue(), Ke();
    }
    F(() => [I.value, t.breakpoints], () => Me(), { deep: !0 }), F(() => t.autoplay, () => Ke());
    const st = F(() => t.modelValue, (u) => {
      u !== m.value && Le(Number(u), !0);
    });
    i("before-init");
    const Pe = s(() => {
      if (!d.wrapAround)
        return { before: 0, after: 0 };
      if (ne.value)
        return { before: y.length, after: y.length };
      const u = Number(d.itemsToShow), g = Math.ceil(u + (d.itemsToScroll - 1)), C = g - V.value, B = g - (k.value - (V.value + 1));
      return {
        before: Math.max(0, C),
        after: Math.max(0, B)
      };
    }), le = s(() => Pe.value.before ? ne.value ? Q.value.slice(-1 * Pe.value.before).reduce((u, g) => u + g[H.value] + d.gap, 0) * -1 : Pe.value.before * re.value * -1 : 0), dt = s(() => {
      var u;
      if (ne.value) {
        const g = (m.value % y.length + y.length) % y.length;
        return Ht({
          slideSize: (u = Q.value[g]) === null || u === void 0 ? void 0 : u[H.value],
          viewportSize: Oe.value[H.value],
          align: d.snapAlign
        });
      }
      return Ht({
        align: d.snapAlign,
        itemsToShow: +d.itemsToShow
      });
    }), Je = s(() => {
      let u = 0;
      if (ne.value) {
        if (m.value < 0 ? u = Q.value.slice(m.value).reduce((g, C) => g + C[H.value] + d.gap, 0) * -1 : u = Q.value.slice(0, m.value).reduce((g, C) => g + C[H.value] + d.gap, 0), u -= dt.value, !d.wrapAround) {
          const g = Q.value.reduce((C, B) => C + B[H.value] + d.gap, 0) - Oe.value[H.value] - d.gap;
          u = Be({
            val: u,
            max: g,
            min: 0
          });
        }
      } else {
        let g = m.value - dt.value;
        d.wrapAround || (g = Be({
          val: g,
          max: k.value - +d.itemsToShow,
          min: 0
        })), u = g * re.value;
      }
      return u * (ae.value ? 1 : -1);
    }), wt = s(() => {
      var u, g;
      if (!ne.value) {
        const N = m.value - dt.value;
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
        let N = 0, Y = 0 - Pe.value.before;
        const x = Math.abs(Je.value + le.value);
        for (; N <= x; ) {
          const ee = (Y % y.length + y.length) % y.length;
          N += ((u = Q.value[ee]) === null || u === void 0 ? void 0 : u[H.value]) + d.gap, Y++;
        }
        C = Y - 1;
      }
      let B = 0;
      {
        let N = C, Y = 0;
        for (N < 0 ? Y = Q.value.slice(0, N).reduce((x, ee) => x + ee[H.value] + d.gap, 0) - Math.abs(Je.value + le.value) : Y = Q.value.slice(0, N).reduce((x, ee) => x + ee[H.value] + d.gap, 0) - Math.abs(Je.value); Y < Oe.value[H.value]; ) {
          const x = (N % y.length + y.length) % y.length;
          Y += ((g = Q.value[x]) === null || g === void 0 ? void 0 : g[H.value]) + d.gap, N++;
        }
        B = N - 1;
      }
      return {
        min: Math.floor(C),
        max: Math.ceil(B)
      };
    }), Mt = s(() => {
      if (d.slideEffect === "fade")
        return;
      const u = _.value ? "Y" : "X", g = _.value ? se.y : se.x;
      let C = Je.value + g;
      if (!d.wrapAround && d.preventExcessiveDragging) {
        let B = 0;
        ne.value ? B = Q.value.reduce((x, ee) => x + ee[H.value], 0) : B = (k.value - Number(d.itemsToShow)) * re.value;
        const N = ae.value ? 0 : -1 * B, Y = ae.value ? B : 0;
        C = Be({
          val: C,
          min: N,
          max: Y
        });
      }
      return `translate${u}(${C}px)`;
    }), Ot = s(() => ({
      "--vc-transition-duration": q.value ? Vt(d.transition, "ms") : void 0,
      "--vc-slide-gap": Vt(d.gap),
      "--vc-carousel-height": Vt(d.height),
      "--vc-cloned-offset": Vt(le.value)
    })), Dt = { slideTo: Le, next: De, prev: We }, ct = Pt({
      activeSlide: V,
      config: d,
      currentSlide: m,
      isSliding: q,
      isVertical: _,
      maxSlide: oe,
      minSlide: ie,
      nav: Dt,
      normalizedDir: U,
      slideRegistry: a,
      slideSize: S,
      slides: y,
      slidesCount: k,
      viewport: r,
      visibleRange: wt
    });
    la(Ge, ct);
    const Fe = Pt({
      config: d,
      currentSlide: m,
      maxSlide: oe,
      middleSlide: xe,
      minSlide: ie,
      slideSize: S,
      slidesCount: k
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
      var u;
      const g = o.default || o.slides, C = (g == null ? void 0 : g(Fe)) || [], { before: B, after: N } = Pe.value, Y = Qt({
        slides: y,
        position: "before",
        toShow: B
      }), x = Qt({
        slides: y,
        position: "after",
        toShow: N
      }), ee = [...Y, ...C, ...x];
      if (!d.enabled || !ee.length)
        return X("section", {
          ref: T,
          class: ["carousel", "is-disabled"]
        }, ee);
      const vt = ((u = o.addons) === null || u === void 0 ? void 0 : u.call(o, Fe)) || [], Qe = X("ol", {
        class: "carousel__track",
        style: { transform: Mt.value },
        onMousedownCapture: d.mouseDrag ? Z : null,
        onTouchstartPassiveCapture: d.touchDrag ? Z : null
      }, ee), ft = X("div", { class: "carousel__viewport", ref: r }, Qe);
      return X("section", {
        ref: T,
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
    const o = ht(Ge, null);
    return () => {
      const i = t.name;
      if (!i || !ta(i))
        return;
      const l = en[i], n = X("path", { d: l }), a = (o == null ? void 0 : o.config.i18n[ea(i)]) || t.title, y = X("title", a);
      return X("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": a
      }, [y, n]);
    };
  }
}), an = fe({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(t, { slots: o, attrs: i }) {
    const l = ht(Ge);
    if (!l)
      return () => "";
    const { next: n, prev: a } = o, y = () => ({
      btt: "arrowDown",
      ltr: "arrowLeft",
      rtl: "arrowRight",
      ttb: "arrowUp"
    })[l.normalizedDir], k = () => ({
      btt: "arrowUp",
      ltr: "arrowRight",
      rtl: "arrowLeft",
      ttb: "arrowDown"
    })[l.normalizedDir], T = s(() => !l.config.wrapAround && l.currentSlide <= l.minSlide), r = s(() => !l.config.wrapAround && l.currentSlide >= l.maxSlide);
    return () => {
      const { i18n: S } = l.config, I = X("button", Object.assign(Object.assign({ type: "button", disabled: T.value, "aria-label": S.ariaPreviousSlide, title: S.ariaPreviousSlide, onClick: l.nav.prev }, i), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": T.value },
        i.class
      ] }), (a == null ? void 0 : a()) || X(aa, { name: y() })), d = X("button", Object.assign(Object.assign({ type: "button", disabled: r.value, "aria-label": S.ariaNextSlide, title: S.ariaNextSlide, onClick: l.nav.next }, i), { class: [
        "carousel__next",
        { "carousel__next--disabled": r.value },
        i.class
      ] }), (n == null ? void 0 : n()) || X(aa, { name: k() }));
      return [I, d];
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
    const o = ht(Ge);
    if (!o)
      return () => "";
    const i = s(() => o.config.itemsToShow), l = s(() => Ht({
      align: o.config.snapAlign,
      itemsToShow: i.value
    })), n = s(() => t.paginateByItemsToShow && i.value > 1), a = s(() => Math.ceil((o.activeSlide - l.value) / i.value)), y = s(() => Math.ceil(o.slidesCount / i.value)), k = (T) => fa(n.value ? {
      val: a.value,
      max: y.value - 1,
      min: 0
    } : {
      val: o.activeSlide,
      max: o.maxSlide,
      min: o.minSlide
    }) === T;
    return () => {
      var T, r;
      const S = [];
      for (let I = n.value ? 0 : o.minSlide; I <= (n.value ? y.value - 1 : o.maxSlide); I++) {
        const d = va(o.config.i18n[n.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: I + 1
        }), m = k(I), V = X("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": m
          },
          "aria-label": d,
          "aria-pressed": m,
          "aria-controls": (r = (T = o.slides[I]) === null || T === void 0 ? void 0 : T.exposed) === null || r === void 0 ? void 0 : r.id,
          title: d,
          disabled: t.disableOnClick,
          onClick: () => o.nav.slideTo(n.value ? Math.floor(I * +o.config.itemsToShow + l.value) : I)
        }), L = X("li", { class: "carousel__pagination-item", key: I }, V);
        S.push(L);
      }
      return X("ol", { class: "carousel__pagination" }, S);
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
    const n = ht(Ge);
    if (la(Ge, void 0), !n)
      return () => "";
    const a = A(t.index), y = (V) => {
      a.value = V;
    }, k = Ba(), T = () => {
      const V = k.vnode.el;
      return V ? V.getBoundingClientRect() : { width: 0, height: 0 };
    };
    l({
      id: t.id,
      setIndex: y,
      getBoundingRect: T
    });
    const r = s(() => a.value === n.activeSlide), S = s(() => a.value === n.activeSlide - 1), I = s(() => a.value === n.activeSlide + 1), d = s(() => a.value >= n.visibleRange.min && a.value <= n.visibleRange.max), m = s(() => {
      if (n.config.itemsToShow === "auto")
        return;
      const V = n.config.itemsToShow, L = n.config.gap > 0 && V > 1 ? `calc(${100 / V}% - ${n.config.gap * (V - 1) / V}px)` : `${100 / V}%`;
      return n.isVertical ? { height: L } : { width: L };
    });
    return n.slideRegistry.registerSlide(k, t.index), Ta(() => {
      n.slideRegistry.unregisterSlide(k);
    }), t.isClone && (xt(() => {
      Zt(k.vnode);
    }), Aa(() => {
      Zt(k.vnode);
    })), () => {
      var V, L;
      return n.config.enabled ? X("li", {
        style: [o.style, Object.assign({}, m.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": t.isClone,
          "carousel__slide--visible": d.value,
          "carousel__slide--active": r.value,
          "carousel__slide--prev": S.value,
          "carousel__slide--next": I.value,
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
        isPrev: S.value,
        isNext: I.value,
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
}, Gt = /* @__PURE__ */ fe({
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
    F(() => l.modelValue, (r) => {
      n.value = r;
    }), F(n, (r) => {
      i("update:modelValue", r);
    });
    const a = s(() => ({ ...l.column.slotData, item: n.value })), y = s(() => {
      var r, S, I, d;
      if ((r = l.column.field) != null && r.modalData && typeof ((S = l.column.field) == null ? void 0 : S.modalData) == "object")
        for (let m in l.column.field.modalData)
          if (typeof ((I = l.column.field) == null ? void 0 : I.modalData[m]) == "string" && l.column.field.modalData[m].startsWith("prop:")) {
            let V = l.column.field.modalData[m].substring(5);
            n.value[V];
          } else
            l.column.field.modalData[m];
      return (d = l.column.field) == null ? void 0 : d.modalData;
    }), k = s(() => typeof l.column.field == "string" && l.column.field.startsWith("prop:") ? Na(l.column.field, n.value) : l.column.field), T = s(() => {
      var r, S, I, d;
      return l.column.type === At.Field ? !((S = (r = l.column) == null ? void 0 : r.field) != null && S.label) && (l.column.ensureFieldLabel || [
        Jt.Switch,
        Jt.Check
      ].includes((I = l.column.field) == null ? void 0 : I.type)) ? l.column.label : (d = l.column.field) == null ? void 0 : d.label : "";
    });
    return (r, S) => {
      const I = Se("lkt-anchor"), d = Se("lkt-button"), m = Se("lkt-field");
      return r.column.type === b(At).Anchor ? (v(), $(I, K({ key: 0 }, r.column.anchor, { prop: n.value }), {
        default: P(() => [
          tt(at(b(yt)(r.column, n.value, r.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : r.column.type === b(At).Button ? (v(), $(d, K({ key: 1 }, r.column.button, { prop: n.value }), {
        default: P(() => [
          tt(at(b(yt)(r.column, n.value, r.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : r.column.type === b(At).Field ? (v(), $(m, K({
        key: 2,
        modelValue: n.value[r.column.key],
        "onUpdate:modelValue": S[0] || (S[0] = (V) => n.value[r.column.key] = V)
      }, {
        ...k.value,
        readMode: !r.hasInlineEditPerm || k.value.readMode,
        slotData: a.value,
        label: T.value,
        modalData: y.value,
        prop: n.value
      }), null, 16, ["modelValue"])) : (v(), w(G, { key: 3 }, [
        tt(at(b(yt)(r.column, n.value, r.i, r.columns)), 1)
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
    let y = typeof n.rowDisplayType == "function" ? n.rowDisplayType(a.value, n.i) : n.rowDisplayType;
    y || (y = ke.Auto);
    const k = [ke.Auto, ke.PreferCustomItem].includes(y), T = [ke.Auto, ke.PreferItem].includes(y), r = (c) => l("click", c), S = s(() => {
      let c = [], D = typeof n.disabledDrag == "function" ? n.disabledDrag(a.value) : oe.value === !0;
      return !D && n.sortable && n.isDraggable ? c.push("handle") : D && c.push("disabled"), c.join(" ");
    }), I = s(() => ve.navButtonSlot !== ""), d = s(() => ve.navButtonSlot), m = () => {
      l("item-up", n.i);
    }, V = () => {
      l("item-down", n.i);
    }, L = () => {
      l("item-drop", n.i);
    };
    F(() => n.modelValue, (c) => a.value = c), F(a, (c) => {
      l("update:modelValue", c);
    }, { deep: !0 });
    const xe = s(() => typeof n.renderDrag == "function" ? n.renderDrag(a.value) : n.renderDrag === !0), oe = s(() => typeof n.disabledDrag == "function" ? n.disabledDrag(a.value) : n.disabledDrag === !0), ie = s(() => S.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), J = s(() => {
      let c = [];
      return k && c.push("type-custom-item"), T && c.push("type-item"), typeof n.itemContainerClass == "function" ? c.push(n.itemContainerClass(a.value, n.i)) : n.itemContainerClass !== "" && c.push(n.itemContainerClass), c.join(" ");
    });
    return (c, D) => {
      const re = Se("lkt-button");
      return v(), w("tr", {
        "data-i": c.i,
        "data-draggable": c.isDraggable,
        class: W(J.value)
      }, [
        c.sortable && c.editModeEnabled && xe.value ? (v(), w("td", {
          key: 0,
          "data-role": ie.value,
          class: W(S.value),
          "data-i": c.i
        }, D[2] || (D[2] = [
          ce("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]), 10, cn)) : E("", !0),
        c.addNavigation && c.editModeEnabled ? (v(), w("td", vn, [
          ce("div", fn, [
            be(re, {
              palette: "table-nav",
              disabled: c.i === 0,
              onClick: m
            }, {
              default: P(() => [
                I.value ? (v(), $(he(d.value), {
                  key: 0,
                  direction: "up"
                })) : (v(), w("i", pn))
              ]),
              _: 1
            }, 8, ["disabled"]),
            be(re, {
              palette: "table-nav",
              disabled: c.latestRow,
              onClick: V
            }, {
              default: P(() => [
                I.value ? (v(), $(he(d.value), {
                  key: 0,
                  direction: "down"
                })) : (v(), w("i", mn))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : E("", !0),
        b(k) && b(i)[`item-${c.i}`] ? (v(), w("td", {
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
        ], 8, gn)) : b(T) && b(i).item ? (v(), w("td", {
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
        ], 8, yn)) : (v(!0), w(G, { key: 4 }, ye(c.visibleColumns, (U) => (v(), w(G, null, [
          b(rn)(U, c.emptyColumns, a.value) ? (v(), w("td", {
            key: "td" + c.i,
            "data-column": U.key,
            colspan: b(Xt)(U, a.value),
            title: b(yt)(U, a.value, c.i, c.visibleColumns),
            class: W(b(ma)(U)),
            onClick: D[1] || (D[1] = (ae) => r(ae))
          }, [
            c.$slots[U.key] && b(pa)(U, a.value) ? O(c.$slots, U.key, {
              key: 0,
              value: a.value[U.key],
              item: a.value,
              column: U,
              i: c.i
            }) : a.value ? (v(), $(Gt, {
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
    var r;
    const i = o, l = t, n = s(() => ve.createButtonSlot !== ""), a = s(() => ve.createButtonSlot), y = {
      ...(r = l.config) == null ? void 0 : r.modalData,
      beforeClose: (S) => {
        "itemCreated" in S && S.itemCreated === !0 && i("append", S.item);
      }
    }, k = {
      ...l.config
    };
    k.modalData = y;
    const T = () => {
      var S;
      if (!((S = l.config) != null && S.modal)) {
        i("click");
        return;
      }
    };
    return (S, I) => {
      const d = Se("lkt-button");
      return v(), $(d, K(k, {
        disabled: S.disabled,
        onClick: T
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
    const i = o, l = t, n = s(() => on(l.column, l.amountOfColumns, l.items)), a = s(() => l.column.sortable === !0), y = s(() => a.value && l.sortBy === l.column.key ? l.sortDirection : ""), k = s(() => ra(l.column.label)), T = s(() => a.value && l.sortBy === l.column.key ? l.sortDirection === qe.Asc ? Te.defaultTableSortAscIcon : l.sortDirection === qe.Desc ? Te.defaultTableSortDescIcon : "" : ""), r = () => i("click", l.column);
    return (S, I) => (v(), w("th", {
      "data-column": S.column.key,
      "data-sortable": a.value,
      "data-sort": y.value,
      colspan: n.value,
      title: k.value,
      class: W(b(ma)(S.column)),
      onClick: r
    }, [
      ce("div", null, [
        tt(at(k.value) + " ", 1),
        T.value ? (v(), w("i", {
          key: 0,
          class: W(T.value)
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
    const l = i, n = oa(), a = t, y = A(typeof a.sorter == "function" ? a.sorter : ln), k = A(un(a.columns)), T = A(qe.Asc), r = A(a.modelValue), S = A(null), I = A(a.columns), d = A((Yt = a.paginator) == null ? void 0 : Yt.modelValue), m = A(a.loading), V = A(!1), L = A(a.perms), xe = A(null), oe = A(null), ie = A(null), J = A({}), c = A(new Pa({ items: r.value }, a.dataStateConfig)), D = A(a.editMode), re = A(0), U = A(null), ae = A(((Kt = a.carousel) == null ? void 0 : Kt.currentSlide) || 0), _ = A(ze(a.saveButton, Te.defaultSaveButton)), ne = A(ze(a.createButton, Te.defaultCreateButton)), H = A(ze(a.editModeButton, Te.defaultEditModeButton)), Me = A(ze(a.groupButton, Te.defaultGroupButton));
    F(() => a.saveButton, (e) => _.value = ze(a.saveButton, Te.defaultSaveButton)), F(() => a.createButton, (e) => ne.value = ze(a.createButton, Te.defaultCreateButton)), F(() => a.editModeButton, (e) => H.value = ze(a.editModeButton, Te.defaultEditModeButton));
    const Ae = A(!1);
    F(m, (e) => l("update:loading", e)), F(d, (e) => l("page", e));
    const Xe = (e) => {
      L.value = e;
    }, Q = (e) => {
      var p;
      if (Array.isArray(e.data)) {
        let M = e.data;
        typeof ((p = a.events) == null ? void 0 : p.parseResults) == "function" && (M = a.events.parseResults(M)), r.value = [...r.value, ...M];
      }
      m.value = !1, V.value = !0, c.value.store({ items: r.value }).turnStoredIntoOriginal(), Ae.value = !1, Tt(() => {
        me.value, l("read-response", e);
      });
    }, Lt = () => Tt(() => {
      var e;
      (!a.paginator || ![Et.LoadMore, Et.Infinite].includes((e = a.paginator) == null ? void 0 : e.type)) && r.value.splice(0, r.value.length), m.value = !0;
    }), Oe = () => {
      xe.value.doRefresh();
    }, Ce = $a(12), ue = s(() => {
      if (!a.hideEmptyColumns) return [];
      let e = [];
      return I.value.forEach((p) => {
        let M = p.key, j = !1;
        r.value.forEach((te) => {
          if (typeof te.checkEmpty == "function")
            return te.checkEmpty(te);
          te[M] && (j = !0);
        }), j || e.push(M);
      }), e;
    }), pe = s(() => I.value.filter((e) => !e.hidden)), nt = s(() => I.value.filter((e) => e.isForRowKey)), Ee = s(() => I.value.map((e) => e.key)), kt = s(() => {
      let e = [];
      for (let p in n) Ee.value.indexOf(p) !== -1 && e.push(p);
      return e;
    }), St = s(() => {
      let e = [];
      for (let p in n) p.indexOf("slide-") !== -1 && e.push(p);
      return e;
    }), Ve = s(() => {
      var e;
      return a.hiddenSave || m.value || !((e = _.value) != null && e.resource || _.value.type) ? !1 : D.value && Ae.value ? !0 : D.value;
    }), we = s(() => pt.value && r.value.length >= a.requiredItemsForTopCreate || De.value ? !0 : Ve.value || D.value && ge.value), me = s(() => {
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
    }), lt = s(() => a.titleTag === "" ? "h2" : a.titleTag), Nt = s(() => a.wrapContentTag === "" ? "div" : a.wrapContentTag), ot = s(() => ra(a.title)), it = s(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }), ge = s(() => L.value.includes(Ie.Create)), Re = s(() => L.value.includes("read")), Z = s(() => L.value.includes(Ie.Update)), rt = s(() => L.value.includes(Ie.Edit)), Ye = s(() => L.value.includes(Ie.InlineEdit)), Ct = s(() => L.value.includes(Ie.ModalCreate)), ut = s(() => L.value.includes(Ie.InlineCreate)), Ke = s(() => L.value.includes(Ie.InlineCreateEver)), q = s(() => L.value.includes(Ie.Drop)), Le = s(() => L.value.includes(Ie.SwitchEditMode)), De = s(() => !Le.value || !Z.value && !q.value || !Z.value && q.value ? !1 : !m.value), We = s(() => {
      var e;
      return (typeof ((e = a.paginator) == null ? void 0 : e.type) < "u" && [Et.LoadMore, Et.Infinite].includes(a.paginator.type) || !m.value) && r.value.length > 0;
    }), _e = s(() => I.value.find((e) => e.isForAccordionHeader)), st = (e, p) => typeof a.customItemSlotName == "function" ? a.customItemSlotName(e, p) : "", Pe = (e) => {
      let p = e.target;
      if (typeof p.dataset.column > "u")
        do
          p = p.parentNode;
        while (typeof p.dataset.column > "u" && p.tagName !== "TABLE" && p.tagName !== "body");
      if (p.tagName === "TD" && (p = p.parentNode, p = p.dataset.i, typeof p < "u"))
        return r.value[p];
    }, le = () => {
      re.value = Ua();
    }, dt = (e) => r.value[e], Je = (e) => {
      var p;
      return (p = S.value) == null ? void 0 : p.querySelector(`[data-i="${e}"]`);
    }, wt = (e) => {
      e && e.sortable && (r.value = r.value.sort((p, M) => y.value(p, M, e, T.value)), T.value = T.value === qe.Asc ? qe.Desc : qe.Asc, k.value = e.key, le(), l("sort", [k.value, T.value]));
    }, Mt = (e) => {
      l("click", e);
    }, Ot = (e) => {
      var M, j, te, de, Bt, gt, h, f;
      let p = parseInt((de = (te = (j = (M = e == null ? void 0 : e.originalEvent) == null ? void 0 : M.toElement) == null ? void 0 : j.closest("tr")) == null ? void 0 : te.dataset) == null ? void 0 : de.i);
      return !(typeof ((Bt = a.drag) == null ? void 0 : Bt.isValid) == "function" && !((gt = a.drag) != null && gt.isValid(r.value[p])) || typeof ((h = a.drag) == null ? void 0 : h.isValid) == "boolean" && !((f = a.drag) != null && f.isValid));
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
            r.value.push(e);
            return;
          }
        }
        r.value.push({});
      } else
        l("click-create");
    }, Fe = (e) => {
      r.value.push(e);
    }, u = () => m.value = !0, g = () => m.value = !1, C = (e, p) => {
      var M, j, te;
      if (!((M = _.value) != null && M.type && [
        Ft.Split,
        Ft.SplitEver,
        Ft.SplitLazy
      ].includes((j = _.value) == null ? void 0 : j.type))) {
        if (l("before-save"), (te = _.value) != null && te.resource && (m.value = !1, !p.success)) {
          l("error", p.httpStatus);
          return;
        }
        c.value.turnStoredIntoOriginal(), Ae.value = !1, l("save", p);
      }
    }, B = (e, p, M) => {
      if (M >= e.length) {
        let j = M - e.length + 1;
        for (; j--; ) e.push(void 0);
      }
      return e.splice(M, 0, e.splice(p, 1)[0]), e;
    }, N = (e) => {
      B(r.value, e, e - 1), le();
    }, Y = (e) => {
      B(r.value, e, e + 1), le();
    }, x = (e) => {
      r.value.splice(e, 1), le();
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
          r.value.splice(M, 0, r.value.splice(p, 1)[0]), le(), l("drag-end", r.value[M]);
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
    }, ft = s(() => typeof a.createEnabledValidator == "function" ? a.createEnabledValidator({ items: r.value }) : !0), pt = s(() => a.createButton === !1 ? !1 : Ke.value || ge.value && D.value || ut.value && D.value || Ct.value && D.value), ga = s(() => [He.Ol, He.Ul].includes(a.type)), mt = (e, p) => typeof a.itemDisplayChecker == "function" ? a.itemDisplayChecker(e, p) : !0, It = (e, p) => typeof a.itemContainerClass == "function" ? a.itemContainerClass(e, p) : a.itemContainerClass, ya = (e, p) => _e.value ? e[_e.value.key] : "", Ze = s(() => typeof a.itemSlotComponent == "function" ? a.itemSlotComponent() : a.itemSlotComponent), $t = s(() => typeof a.itemSlotData == "function" ? a.itemSlotData() : a.itemSlotData);
    xt(() => {
      var e;
      a.initialSorting && wt(sn(a.columns, k.value)), c.value.store({ items: r.value }).turnStoredIntoOriginal(), Ae.value = !1, (e = a.drag) != null && e.enabled && Tt(() => {
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
    }), F(() => a.perms, (e) => L.value = e), F(L, (e) => l("update:perms", e)), F(D, (e) => {
      l("update:editMode", e);
    }), F(() => a.editMode, (e) => D.value = e), F(() => a.columns, (e) => I.value = e, { deep: !0 }), F(() => a.modelValue, (e) => {
      r.value = e;
    }, { deep: !0 }), F(r, (e) => {
      c.value.increment({ items: e }), Ae.value = c.value.changed(), l("update:modelValue", e);
    }, { deep: !0 }), o({
      getItemByEvent: Pe,
      getItemByIndex: dt,
      getRowByIndex: Je,
      doRefresh: Oe,
      doRemoveIndex: (e) => {
        r.value.splice(e, 1), le();
      },
      getHtml: () => oe.value,
      reRender: le,
      turnStoredIntoOriginal: () => {
        c.value.turnStoredIntoOriginal(), Tt(() => {
          le();
        });
      }
    });
    const ba = s(() => typeof ve.defaultEmptySlot < "u"), ha = s(() => ve.defaultEmptySlot), ka = s(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled ? !1 : typeof a.drag.canRender > "u" ? !0 : a.drag.canRender), Sa = s(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled || typeof a.drag.isDisabled > "u" ? !1 : a.drag.isDisabled), Ca = s(() => typeof a.header == "object" && Object.keys(a.header).length > 0);
    return (e, p) => {
      const M = Se("lkt-header"), j = Se("lkt-button"), te = Se("lkt-accordion"), de = Se("lkt-loader"), Bt = Se("lkt-paginator");
      return v(), w("section", {
        ref_key: "element",
        ref: oe,
        class: "lkt-table-page",
        id: "lkt-table-page-" + b(Ce)
      }, [
        Ca.value ? (v(), $(M, Ne(K({ key: 0 }, e.header)), null, 16)) : ot.value || b(n).title ? (v(), w("header", {
          key: 1,
          class: W(e.headerClass)
        }, [
          ot.value ? (v(), $(he(lt.value), { key: 0 }, {
            default: P(() => [
              e.titleIcon ? (v(), w("i", {
                key: 0,
                class: W(e.titleIcon)
              }, null, 2)) : E("", !0),
              tt(" " + at(ot.value), 1)
            ]),
            _: 1
          })) : E("", !0),
          b(n).title ? O(e.$slots, "title", { key: 1 }) : E("", !0)
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
                        "onUpdate:checked": p[0] || (p[0] = (h) => D.value = h)
                      }), null, 16, ["checked"]), [
                        [je, De.value]
                      ])
                    ]),
                    b(n)["prev-buttons-ever"] ? O(e.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: Z.value,
                      canDrop: q.value,
                      perms: e.perms
                    }) : E("", !0),
                    b(n)["prev-buttons"] ? O(e.$slots, "prev-buttons", {
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
                      split: P(({ doClose: h, doRootClick: f }) => [
                        O(e.$slots, "button-save-split", {
                          doClose: h,
                          doRootClick: f,
                          dataState: c.value,
                          onButtonLoading: u,
                          onButtonLoaded: g
                        })
                      ]),
                      default: P(() => [
                        b(n)["button-save"] ? O(e.$slots, "button-save", {
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
                    pt.value && r.value.length >= e.requiredItemsForTopCreate ? (v(), $(jt, {
                      key: 2,
                      config: ne.value,
                      disabled: !ft.value,
                      onClick: ct,
                      onAppend: Fe
                    }, null, 8, ["config", "disabled"])) : E("", !0)
                  ]),
                  _: 3
                }, 16)) : E("", !0),
                b(n)["prev-buttons-ever"] ? O(e.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: Z.value,
                  canDrop: q.value,
                  perms: e.perms
                }) : E("", !0),
                b(n)["prev-buttons"] ? O(e.$slots, "prev-buttons", {
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
                  split: P(({ doClose: h, doRootClick: f }) => [
                    O(e.$slots, "button-save-split", {
                      doClose: h,
                      doRootClick: f,
                      dataState: c.value,
                      onButtonLoading: u,
                      onButtonLoaded: g
                    })
                  ]),
                  default: P(() => [
                    b(n)["button-save"] ? O(e.$slots, "button-save", {
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
                pt.value && r.value.length >= e.requiredItemsForTopCreate ? (v(), $(jt, {
                  key: 3,
                  config: ne.value,
                  disabled: !ft.value,
                  onClick: ct,
                  onAppend: Fe
                }, null, 8, ["config", "disabled"])) : E("", !0),
                ce("div", In, [
                  Ue(be(j, K(H.value, {
                    checked: D.value,
                    "onUpdate:checked": p[1] || (p[1] = (h) => D.value = h)
                  }), null, 16, ["checked"]), [
                    [je, De.value]
                  ])
                ])
              ], 512), [
                [je, we.value]
              ]),
              b(n).buttons ? (v(), w("div", Bn, [
                O(e.$slots, "buttons")
              ])) : E("", !0),
              V.value && b(n).filters ? (v(), w("div", Tn, [
                O(e.$slots, "filters", {
                  items: r.value,
                  isLoading: m.value
                })
              ])) : E("", !0),
              Ue(ce("div", An, [
                e.type === b(He).Table ? (v(), w("table", En, [
                  e.hideTableHeader ? E("", !0) : (v(), w("thead", Vn, [
                    ce("tr", null, [
                      it.value && D.value ? (v(), w("th", Rn)) : E("", !0),
                      e.addNavigation && D.value ? (v(), w("th", Ln)) : E("", !0),
                      (v(!0), w(G, null, ye(pe.value, (h) => (v(), w(G, null, [
                        ue.value.indexOf(h.key) === -1 ? (v(), $(Sn, {
                          key: 0,
                          column: h,
                          "sort-by": k.value,
                          "sort-direction": T.value,
                          "amount-of-columns": e.columns.length,
                          items: r.value,
                          onClick: (f) => wt(h)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : E("", !0)
                      ], 64))), 256))
                    ])
                  ])),
                  ce("tbody", {
                    ref_key: "tableBody",
                    ref: S,
                    id: "lkt-table-body-" + b(Ce),
                    class: W(e.itemsContainerClass)
                  }, [
                    (v(!0), w(G, null, ye(r.value, (h, f) => Ue((v(), $(hn, {
                      modelValue: r.value[f],
                      "onUpdate:modelValue": (R) => r.value[f] = R,
                      key: Qe(h, f),
                      i: f,
                      "is-draggable": Dt(h),
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
                      "is-loading": m.value,
                      "item-container-class": e.itemContainerClass,
                      onClick: Mt,
                      onItemUp: N,
                      onItemDown: Y,
                      onItemDrop: x
                    }, Ra({ _: 2 }, [
                      b(n)[`item-${f}`] ? {
                        name: `item-${f}`,
                        fn: P((R) => [
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
                      } : b(n).item ? {
                        name: "item",
                        fn: P((R) => [
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
                      ye(kt.value, (R) => ({
                        name: R,
                        fn: P((et) => [
                          O(e.$slots, R, Ne({
                            [e.slotItemVar || ""]: et.item,
                            value: et.value,
                            column: et.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class"])), [
                      [je, mt(r.value[f], f)]
                    ])), 128))
                  ], 10, Nn)
                ])) : e.type === b(He).Item ? (v(), w("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: S,
                  id: "lkt-table-body-" + b(Ce),
                  class: W(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), w(G, null, ye(r.value, (h, f) => (v(), w(G, {
                    key: Qe(h, f)
                  }, [
                    !e.skipTableItemsContainer && mt(h, f) ? (v(), w("div", {
                      key: 0,
                      class: W(["lkt-table-item", It(h, f)]),
                      "data-i": f
                    }, [
                      Ze.value ? (v(), $(he(Ze.value), K({
                        key: 0,
                        ref_for: !0
                      }, {
                        item: h,
                        index: f,
                        editing: D.value,
                        perms: L.value,
                        data: $t.value,
                        events: e.itemSlotEvents
                      }), null, 16)) : O(e.$slots, "item", Ne({
                        key: 1,
                        [e.slotItemVar || ""]: h,
                        index: f,
                        editing: D.value,
                        canCreate: ge.value,
                        canRead: Re.value,
                        canUpdate: Z.value,
                        canDrop: q.value,
                        isLoading: m.value,
                        doDrop: () => x(f)
                      }))
                    ], 10, On)) : mt(h, f) ? O(e.$slots, "item", Ne({
                      key: 1,
                      class: It(h, f),
                      dataI: f,
                      [e.slotItemVar || ""]: h,
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
                ], 10, Mn)) : e.type === b(He).Accordion ? (v(), w("div", {
                  key: 2,
                  ref_key: "tableBody",
                  ref: S,
                  id: "lkt-table-body-" + b(Ce),
                  class: W(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), w(G, null, ye(r.value, (h, f) => (v(), w(G, null, [
                    [b(ke).Auto, b(ke).PreferCustomItem].includes(e.rowDisplayType) && b(n)[st(h, f)] ? O(e.$slots, st(h, f), {
                      key: 0,
                      item: h,
                      index: f,
                      editing: D.value,
                      isLoading: m.value
                    }) : [b(ke).Auto, b(ke).PreferCustomItem].includes(e.rowDisplayType) && b(n)[`item-${f}`] ? O(e.$slots, `item-${f}`, {
                      key: 1,
                      item: h,
                      index: f,
                      editing: D.value,
                      isLoading: m.value
                    }) : (v(), w(G, { key: 2 }, [
                      mt(h, f) ? (v(), $(te, K({
                        class: ["lkt-table-item", It(h, f)],
                        "data-i": f,
                        key: Qe(h, f)
                      }, { ref_for: !0 }, {
                        ...e.accordion,
                        title: ya(h)
                      }), {
                        header: P(() => [
                          be(Gt, {
                            modelValue: r.value[f],
                            "onUpdate:modelValue": (R) => r.value[f] = R,
                            i: f,
                            column: _e.value,
                            columns: pe.value,
                            "edit-mode-enabled": D.value,
                            "has-inline-edit-perm": Ye.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])
                        ]),
                        default: P(() => [
                          (v(!0), w(G, null, ye(pe.value, (R) => {
                            var et, Wt;
                            return v(), w(G, null, [
                              R.key !== ((et = _e.value) == null ? void 0 : et.key) && e.$slots[R.key] && b(pa)(R, r.value[f]) ? O(e.$slots, R.key, {
                                key: 0,
                                value: r.value[f][R.key],
                                item: r.value[f],
                                column: R,
                                i: f
                              }) : (v(), w(G, { key: 1 }, [
                                R.key !== ((Wt = _e.value) == null ? void 0 : Wt.key) ? (v(), $(Gt, {
                                  key: 0,
                                  modelValue: r.value[f],
                                  "onUpdate:modelValue": (wa) => r.value[f] = wa,
                                  i: f,
                                  column: R,
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
                    (v(!0), w(G, null, ye(r.value, (h, f) => (v(), w(G, {
                      key: Qe(h, f)
                    }, [
                      mt(h, f) ? (v(), w("li", {
                        key: 0,
                        class: W(["lkt-table-item", It(h, f)]),
                        "data-i": f
                      }, [
                        Ze.value ? (v(), $(he(Ze.value), K({
                          key: 0,
                          ref_for: !0
                        }, {
                          item: h,
                          index: f,
                          editing: D.value,
                          perms: L.value,
                          data: $t.value,
                          events: e.itemSlotEvents
                        }), null, 16)) : O(e.$slots, "item", Ne({
                          key: 1,
                          [e.slotItemVar || ""]: h,
                          index: f,
                          editing: D.value,
                          canCreate: ge.value,
                          canRead: Re.value,
                          canUpdate: Z.value,
                          canDrop: q.value,
                          isLoading: m.value,
                          doDrop: () => x(f)
                        }))
                      ], 10, _n)) : E("", !0)
                    ], 64))), 128))
                  ]),
                  _: 3
                }, 8, ["class"])) : e.type === b(He).Carousel ? (v(), w("div", {
                  key: 4,
                  ref_key: "tableBody",
                  ref: S,
                  id: "lkt-table-body-" + b(Ce),
                  class: W(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  be(b(Za), K({
                    modelValue: ae.value,
                    "onUpdate:modelValue": p[2] || (p[2] = (h) => ae.value = h)
                  }, e.carousel, {
                    "wrap-around": ((gt = e.carousel) == null ? void 0 : gt.infinite) === !0
                  }), {
                    addons: P(() => [
                      be(b(an)),
                      be(b(nn))
                    ]),
                    default: P(() => [
                      (v(!0), w(G, null, ye(St.value, (h, f) => (v(), $(b(na), {
                        key: h,
                        index: f
                      }, {
                        default: P(() => [
                          ce("div", Fn, [
                            O(e.$slots, h)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (v(!0), w(G, null, ye(r.value, (h, f) => (v(), $(b(na), {
                        key: e.slide,
                        index: f
                      }, {
                        default: P(() => [
                          ce("div", Un, [
                            Ze.value ? (v(), $(he(Ze.value), K({
                              key: 0,
                              ref_for: !0
                            }, {
                              item: h,
                              index: f,
                              editing: D.value,
                              perms: L.value,
                              data: $t.value,
                              events: e.itemSlotEvents
                            }), null, 16)) : O(e.$slots, "item", Ne({
                              key: 1,
                              [e.slotItemVar || ""]: h,
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
                [je, We.value]
              ]),
              !m.value && r.value.length === 0 ? (v(), w("div", jn, [
                b(n).empty ? O(e.$slots, "empty", { key: 0 }) : ba.value ? (v(), $(he(ha.value), {
                  key: 1,
                  message: e.noResultsText
                }, null, 8, ["message"])) : e.noResultsText ? (v(), w(G, { key: 2 }, [
                  tt(at(e.noResultsText), 1)
                ], 64)) : E("", !0)
              ])) : E("", !0),
              m.value ? (v(), $(de, { key: 3 })) : E("", !0),
              pt.value || b(n).bottomButtons ? (v(), w("div", zn, [
                pt.value && r.value.length >= e.requiredItemsForBottomCreate ? (v(), $(jt, {
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
                ref: xe
              }, e.paginator, {
                modelValue: d.value,
                "onUpdate:modelValue": p[3] || (p[3] = (h) => d.value = h),
                onLoading: Lt,
                onPerms: Xe,
                onResponse: Q
              }), null, 16, ["modelValue"])) : E("", !0),
              b(n)["web-element-actions"] ? O(e.$slots, "web-element-actions", { key: 6 }) : E("", !0)
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
