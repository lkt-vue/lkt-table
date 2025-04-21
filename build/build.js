import { defineComponent as re, computed as s, ref as k, shallowReactive as jt, watch as F, watchEffect as Ot, onMounted as qt, onBeforeUnmount as Ba, reactive as _t, provide as la, h as K, useId as Da, inject as ft, getCurrentInstance as Ia, onUnmounted as Ta, onUpdated as Ea, cloneVNode as Aa, resolveComponent as Se, createBlock as $, createElementBlock as y, unref as C, openBlock as c, normalizeProps as $e, mergeProps as ie, withCtx as j, createTextVNode as lt, toDisplayString as Ge, Fragment as x, withModifiers as na, createCommentVNode as B, resolveDynamicComponent as Ae, useSlots as oa, normalizeClass as ae, createElementVNode as ee, createVNode as pe, renderSlot as U, renderList as de, withDirectives as Oe, vShow as _e, mergeDefaults as Va, nextTick as St, createSlots as Jt } from "vue";
import { __ as Ra } from "lkt-i18n";
import { SortDirection as qe, Column as ia, extractPropValue as Ma, ColumnType as Ct, prepareResourceData as ra, TableRowType as tt, extractI18nValue as ua, LktSettings as fe, ensureButtonConfig as De, TablePermission as Ie, PaginatorType as wt, TableType as at, getDefaultValues as Na, Table as La, ButtonType as Pt } from "lkt-vue-kernel";
import { Column as gn, createColumn as bn } from "lkt-vue-kernel";
import { replaceAll as sa, generateRandomString as $a } from "lkt-string-tools";
import { DataState as Oa } from "lkt-data-state";
import _a from "sortablejs";
import { time as Pa } from "lkt-date-tools";
/**
 * Vue 3 Carousel 0.14.0
 * (c) 2025
 * @license MIT
 */
const da = ["viewport", "carousel"], Dt = {
  "bottom-to-top": "btt",
  "left-to-right": "ltr",
  "right-to-left": "rtl",
  "top-to-bottom": "ttb"
}, ca = [
  "ltr",
  "left-to-right",
  "rtl",
  "right-to-left",
  "ttb",
  "top-to-bottom",
  "btt",
  "bottom-to-top"
], Ua = {
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
}, va = ["slide", "fade"], fa = [
  "center",
  "start",
  "end",
  "center-even",
  "center-odd"
], z = {
  autoplay: 0,
  breakpointMode: da[0],
  breakpoints: void 0,
  dir: ca[0],
  enabled: !0,
  gap: 0,
  height: "auto",
  i18n: Ua,
  ignoreAnimations: !1,
  itemsToScroll: 1,
  itemsToShow: 1,
  modelValue: 0,
  mouseDrag: !0,
  pauseAutoplayOnHover: !1,
  preventExcessiveDragging: !1,
  slideEffect: va[0],
  snapAlign: fa[0],
  touchDrag: !0,
  transition: 300,
  wrapAround: !1
}, Xe = Symbol("carousel"), Fa = (e) => {
  const i = jt([]), r = (n) => {
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
function ja(e) {
  return e.length === 0 ? 0 : e.reduce((r, n) => r + n, 0) / e.length;
}
function Qt({ slides: e, position: i, toShow: r }) {
  const n = [], l = i === "before", a = l ? -r : 0, f = l ? 0 : r;
  if (e.length <= 0)
    return n;
  for (let g = a; g < f; g++) {
    const D = {
      index: l ? g : g + e.length,
      isClone: !0,
      position: i,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${i}-${g}`
    }, o = e[(g % e.length + e.length) % e.length].vnode, T = Aa(o, D);
    T.el = null, n.push(T);
  }
  return n;
}
const za = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function Zt(e) {
  if (!e.el || !(e.el instanceof Element))
    return;
  const i = e.el.querySelectorAll(za);
  for (const r of i)
    r instanceof HTMLElement && !r.hasAttribute("disabled") && r.getAttribute("aria-hidden") !== "true" && r.setAttribute("tabindex", "-1");
}
function Ha(e, i) {
  return Object.keys(e).filter((r) => !i.includes(r)).reduce((r, n) => (r[n] = e[n], r), {});
}
function qa(e) {
  const { isVertical: i, isReversed: r, dragged: n, effectiveSlideSize: l } = e, a = i ? n.y : n.x;
  if (a === 0)
    return 0;
  const f = Math.round(a / l);
  return r ? f : -f;
}
function Te({ val: e, max: i, min: r }) {
  return i < r ? e : Math.min(Math.max(e, isNaN(r) ? e : r), isNaN(i) ? e : i);
}
function Ga(e) {
  const { transform: i } = window.getComputedStyle(e);
  return i.split(/[(,)]/).slice(1, -1).map((r) => parseFloat(r));
}
function Xa(e) {
  let i = 1, r = 1;
  return e.forEach((n) => {
    const l = Ga(n);
    l.length === 6 && (i /= l[0], r /= l[3]);
  }), { widthMultiplier: i, heightMultiplier: r };
}
function Ya(e, i) {
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
function Ka(e, i, r) {
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
function zt({ slideSize: e, viewportSize: i, align: r, itemsToShow: n }) {
  return n !== void 0 ? Ya(r, n) : e !== void 0 && i !== void 0 ? Ka(r, e, i) : 0;
}
function pa(e = "", i = {}) {
  return Object.entries(i).reduce((r, [n, l]) => r.replace(`{${n}}`, String(l)), e);
}
function ma({ val: e, max: i, min: r = 0 }) {
  const n = i - r + 1;
  return ((e - r) % n + n) % n + r;
}
function Ut(e, i = 0) {
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
function Bt(e, i = "px") {
  if (!(e == null || e === ""))
    return typeof e == "number" || parseFloat(e).toString() === e ? `${e}${i}` : e;
}
const Wa = re({
  name: "CarouselAria",
  setup() {
    const e = ft(Xe);
    return e ? () => K("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, pa(e.config.i18n.itemXofY, {
      currentSlide: e.currentSlide + 1,
      slidesCount: e.slidesCount
    })) : () => "";
  }
}), Ja = {
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
    validator(e) {
      return da.includes(e);
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
    validator(e, i) {
      return e && i.wrapAround && console.warn('[vue3-carousel warn]: "preventExcessiveDragging" cannot be used with wrapAround. The setting will be ignored.'), !0;
    }
  },
  // control snap position alignment
  snapAlign: {
    default: z.snapAlign,
    validator(e) {
      return fa.includes(e);
    }
  },
  slideEffect: {
    type: String,
    default: z.slideEffect,
    validator(e) {
      return va.includes(e);
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
    validator(e, i) {
      if (!ca.includes(e))
        return !1;
      const r = e in Dt ? Dt[e] : e;
      return ["ttb", "btt"].includes(r) && (!i.height || i.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${e}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: z.wrapAround,
    type: Boolean
  }
}, Qa = re({
  name: "VueCarousel",
  props: Ja,
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
    const a = Fa(r), f = a.getSlides(), g = s(() => f.length), m = k(null), D = k(null), o = k(0), T = s(() => Object.assign(Object.assign(Object.assign({}, z), Ha(e, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, z.i18n), e.i18n) })), v = jt(Object.assign({}, T.value)), S = k((l = e.modelValue) !== null && l !== void 0 ? l : 0), E = k(S.value);
    F(S, (d) => E.value = d);
    const V = k(0), Ce = s(() => Math.ceil((g.value - 1) / 2)), O = s(() => g.value - 1), le = s(() => 0);
    let G = null, Ve = null, ue = null;
    const X = s(() => o.value + v.gap), u = s(() => {
      const d = v.dir || "ltr";
      return d in Dt ? Dt[d] : d;
    }), _ = s(() => ["rtl", "btt"].includes(u.value)), te = s(() => ["ttb", "btt"].includes(u.value)), P = s(() => v.itemsToShow === "auto"), M = s(() => te.value ? "height" : "width");
    function me() {
      var d;
      if (!We.value)
        return;
      const b = (T.value.breakpointMode === "carousel" ? (d = m.value) === null || d === void 0 ? void 0 : d.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, h = Object.keys(e.breakpoints || {}).map((R) => Number(R)).sort((R, q) => +q - +R), I = {};
      h.some((R) => b >= R ? (Object.assign(I, e.breakpoints[R]), I.i18n && Object.assign(I.i18n, T.value.i18n, e.breakpoints[R].i18n), !0) : !1), Object.assign(v, T.value, I);
    }
    const ot = Ut(() => {
      me(), Ye(), ge();
    }), Pe = jt(/* @__PURE__ */ new Set()), ne = k([]);
    function Re({ widthMultiplier: d, heightMultiplier: b }) {
      ne.value = f.map((h) => {
        var I;
        const R = (I = h.exposed) === null || I === void 0 ? void 0 : I.getBoundingRect();
        return {
          width: R.width * d,
          height: R.height * b
        };
      });
    }
    const Ue = k({
      width: 0,
      height: 0
    });
    function It({ widthMultiplier: d, heightMultiplier: b }) {
      var h;
      const I = ((h = D.value) === null || h === void 0 ? void 0 : h.getBoundingClientRect()) || { width: 0, height: 0 };
      Ue.value = {
        width: I.width * d,
        height: I.height * b
      };
    }
    function ge() {
      if (!D.value)
        return;
      const d = Xa(Pe);
      if (It(d), Re(d), P.value)
        o.value = ja(ne.value.map((b) => b[M.value]));
      else {
        const b = Number(v.itemsToShow), h = (b - 1) * v.gap;
        o.value = (Ue.value[M.value] - h) / b;
      }
    }
    function Ye() {
      !v.wrapAround && g.value > 0 && (S.value = Te({
        val: S.value,
        max: O.value,
        min: le.value
      })), P.value || (v.itemsToShow = Te({
        val: Number(v.itemsToShow),
        max: g.value,
        min: 1
      }));
    }
    const be = s(() => typeof e.ignoreAnimations == "string" ? e.ignoreAnimations.split(",") : Array.isArray(e.ignoreAnimations) ? e.ignoreAnimations : e.ignoreAnimations ? !1 : []);
    Ot(() => Ye()), Ot(() => {
      ge();
    });
    let ye;
    const Fe = (d) => {
      const b = d.target;
      if (!(!(b != null && b.contains(m.value)) || Array.isArray(be.value) && be.value.includes(d.animationName)) && (Pe.add(b), !ye)) {
        const h = () => {
          ye = requestAnimationFrame(() => {
            ge(), h();
          });
        };
        h();
      }
    }, Ke = (d) => {
      const b = d.target;
      b && Pe.delete(b), ye && Pe.size === 0 && (cancelAnimationFrame(ye), ge());
    }, We = k(!1);
    typeof document < "u" && Ot(() => {
      We.value && be.value !== !1 ? (document.addEventListener("animationstart", Fe), document.addEventListener("animationend", Ke)) : (document.removeEventListener("animationstart", Fe), document.removeEventListener("animationend", Ke));
    }), qt(() => {
      We.value = !0, me(), Qe(), m.value && (ue = new ResizeObserver(ot), ue.observe(m.value)), r("init");
    }), Ba(() => {
      We.value = !1, a.cleanup(), Ve && clearTimeout(Ve), ye && cancelAnimationFrame(ye), G && clearInterval(G), ue && (ue.disconnect(), ue = null), typeof document < "u" && ut(), m.value && (m.value.removeEventListener("transitionend", ge), m.value.removeEventListener("animationiteration", ge));
    });
    let we = !1;
    const je = { x: 0, y: 0 }, ce = _t({ x: 0, y: 0 }), ze = k(!1), it = k(!1), rt = () => {
      ze.value = !0;
    }, Tt = () => {
      ze.value = !1;
    }, Me = Ut((d) => {
      if (!d.ctrlKey)
        switch (d.key) {
          case "ArrowLeft":
          case "ArrowUp":
            te.value === d.key.endsWith("Up") && (_.value ? Le(!0) : Ze(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            te.value === d.key.endsWith("Down") && (_.value ? Ze(!0) : Le(!0));
            break;
        }
    }, 200), Et = () => {
      document.addEventListener("keydown", Me);
    }, ut = () => {
      document.removeEventListener("keydown", Me);
    };
    function pt(d) {
      const b = d.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(b) || H.value || (we = d.type === "touchstart", !we && (d.preventDefault(), d.button !== 0)))
        return;
      je.x = "touches" in d ? d.touches[0].clientX : d.clientX, je.y = "touches" in d ? d.touches[0].clientY : d.clientY;
      const h = we ? "touchmove" : "mousemove", I = we ? "touchend" : "mouseup";
      document.addEventListener(h, st, { passive: !1 }), document.addEventListener(I, Je, { passive: !0 });
    }
    const st = Ut((d) => {
      it.value = !0;
      const b = "touches" in d ? d.touches[0].clientX : d.clientX, h = "touches" in d ? d.touches[0].clientY : d.clientY;
      ce.x = b - je.x, ce.y = h - je.y;
      const I = qa({
        isVertical: te.value,
        isReversed: _.value,
        dragged: ce,
        effectiveSlideSize: X.value
      });
      E.value = v.wrapAround ? S.value + I : Te({
        val: S.value + I,
        max: O.value,
        min: le.value
      }), r("drag", { deltaX: ce.x, deltaY: ce.y });
    });
    function Je() {
      if (st.cancel(), E.value !== S.value && !we) {
        const h = (I) => {
          I.preventDefault(), window.removeEventListener("click", h);
        };
        window.addEventListener("click", h);
      }
      Be(E.value), ce.x = 0, ce.y = 0, it.value = !1;
      const d = we ? "touchmove" : "mousemove", b = we ? "touchend" : "mouseup";
      document.removeEventListener(d, st), document.removeEventListener(b, Je);
    }
    function Qe() {
      !v.autoplay || v.autoplay <= 0 || (G = setInterval(() => {
        v.pauseAutoplayOnHover && ze.value || Le();
      }, v.autoplay));
    }
    function he() {
      G && (clearInterval(G), G = null);
    }
    function Ne() {
      he(), Qe();
    }
    const H = k(!1);
    function Be(d, b = !1) {
      if (!b && H.value)
        return;
      let h = d, I = d;
      V.value = S.value, v.wrapAround ? I = ma({
        val: h,
        max: O.value,
        min: le.value
      }) : h = Te({
        val: h,
        max: O.value,
        min: le.value
      }), r("slide-start", {
        slidingToIndex: d,
        currentSlideIndex: S.value,
        prevSlideIndex: V.value,
        slidesCount: g.value
      }), he(), H.value = !0, S.value = h, I !== h && dt.pause(), r("update:modelValue", I), Ve = setTimeout(() => {
        v.wrapAround && I !== h && (dt.resume(), S.value = I, r("loop", {
          currentSlideIndex: S.value,
          slidingToIndex: d
        })), r("slide-end", {
          currentSlideIndex: S.value,
          prevSlideIndex: V.value,
          slidesCount: g.value
        }), H.value = !1, Ne();
      }, v.transition);
    }
    function Le(d = !1) {
      Be(S.value + v.itemsToScroll, d);
    }
    function Ze(d = !1) {
      Be(S.value - v.itemsToScroll, d);
    }
    function mt() {
      me(), Ye(), ge(), Ne();
    }
    F(() => [T.value, e.breakpoints], () => me(), { deep: !0 }), F(() => e.autoplay, () => Ne());
    const dt = F(() => e.modelValue, (d) => {
      d !== S.value && Be(Number(d), !0);
    });
    r("before-init");
    const Y = s(() => {
      if (!v.wrapAround)
        return { before: 0, after: 0 };
      if (P.value)
        return { before: f.length, after: f.length };
      const d = Number(v.itemsToShow), b = Math.ceil(d + (v.itemsToScroll - 1)), h = b - E.value, I = b - (g.value - (E.value + 1));
      return {
        before: Math.max(0, h),
        after: Math.max(0, I)
      };
    }), ct = s(() => Y.value.before ? P.value ? ne.value.slice(-1 * Y.value.before).reduce((d, b) => d + b[M.value] + v.gap, 0) * -1 : Y.value.before * X.value * -1 : 0), He = s(() => {
      var d;
      if (P.value) {
        const b = (S.value % f.length + f.length) % f.length;
        return zt({
          slideSize: (d = ne.value[b]) === null || d === void 0 ? void 0 : d[M.value],
          viewportSize: Ue.value[M.value],
          align: v.snapAlign
        });
      }
      return zt({
        align: v.snapAlign,
        itemsToShow: +v.itemsToShow
      });
    }), xe = s(() => {
      let d = 0;
      if (P.value) {
        if (S.value < 0 ? d = ne.value.slice(S.value).reduce((b, h) => b + h[M.value] + v.gap, 0) * -1 : d = ne.value.slice(0, S.value).reduce((b, h) => b + h[M.value] + v.gap, 0), d -= He.value, !v.wrapAround) {
          const b = ne.value.reduce((h, I) => h + I[M.value] + v.gap, 0) - Ue.value[M.value] - v.gap;
          d = Te({
            val: d,
            max: b,
            min: 0
          });
        }
      } else {
        let b = S.value - He.value;
        v.wrapAround || (b = Te({
          val: b,
          max: g.value - +v.itemsToShow,
          min: 0
        })), d = b * X.value;
      }
      return d * (_.value ? 1 : -1);
    }), At = s(() => {
      var d, b;
      if (!P.value) {
        const R = S.value - He.value;
        return v.wrapAround ? {
          min: Math.floor(R),
          max: Math.ceil(R + Number(v.itemsToShow) - 1)
        } : {
          min: Math.floor(Te({
            val: R,
            max: g.value - Number(v.itemsToShow),
            min: 0
          })),
          max: Math.ceil(Te({
            val: R + Number(v.itemsToShow) - 1,
            max: g.value - 1,
            min: 0
          }))
        };
      }
      let h = 0;
      {
        let R = 0, q = 0 - Y.value.before;
        const J = Math.abs(xe.value + ct.value);
        for (; R <= J; ) {
          const Q = (q % f.length + f.length) % f.length;
          R += ((d = ne.value[Q]) === null || d === void 0 ? void 0 : d[M.value]) + v.gap, q++;
        }
        h = q - 1;
      }
      let I = 0;
      {
        let R = h, q = 0;
        for (R < 0 ? q = ne.value.slice(0, R).reduce((J, Q) => J + Q[M.value] + v.gap, 0) - Math.abs(xe.value + ct.value) : q = ne.value.slice(0, R).reduce((J, Q) => J + Q[M.value] + v.gap, 0) - Math.abs(xe.value); q < Ue.value[M.value]; ) {
          const J = (R % f.length + f.length) % f.length;
          q += ((b = ne.value[J]) === null || b === void 0 ? void 0 : b[M.value]) + v.gap, R++;
        }
        I = R - 1;
      }
      return {
        min: Math.floor(h),
        max: Math.ceil(I)
      };
    }), ve = s(() => {
      if (v.slideEffect === "fade")
        return;
      const d = te.value ? "Y" : "X", b = te.value ? ce.y : ce.x;
      let h = xe.value + b;
      if (!v.wrapAround && v.preventExcessiveDragging) {
        let I = 0;
        P.value ? I = ne.value.reduce((J, Q) => J + Q[M.value], 0) : I = (g.value - Number(v.itemsToShow)) * X.value;
        const R = _.value ? 0 : -1 * I, q = _.value ? I : 0;
        h = Te({
          val: h,
          min: R,
          max: q
        });
      }
      return `translate${d}(${h}px)`;
    }), Vt = s(() => ({
      "--vc-transition-duration": H.value ? Bt(v.transition, "ms") : void 0,
      "--vc-slide-gap": Bt(v.gap),
      "--vc-carousel-height": Bt(v.height),
      "--vc-cloned-offset": Bt(ct.value)
    })), gt = { slideTo: Be, next: Le, prev: Ze }, bt = _t({
      activeSlide: E,
      config: v,
      currentSlide: S,
      isSliding: H,
      isVertical: te,
      maxSlide: O,
      minSlide: le,
      nav: gt,
      normalizedDir: u,
      slideRegistry: a,
      slideSize: o,
      slides: f,
      slidesCount: g,
      viewport: D,
      visibleRange: At
    });
    la(Xe, bt);
    const et = _t({
      config: v,
      currentSlide: S,
      maxSlide: O,
      middleSlide: Ce,
      minSlide: le,
      slideSize: o,
      slidesCount: g
    });
    return n({
      data: et,
      nav: gt,
      next: Le,
      prev: Ze,
      restartCarousel: mt,
      slideTo: Be,
      updateBreakpointsConfig: me,
      updateSlideSize: ge,
      updateSlidesData: Ye
    }), () => {
      var d;
      const b = i.default || i.slides, h = (b == null ? void 0 : b(et)) || [], { before: I, after: R } = Y.value, q = Qt({
        slides: f,
        position: "before",
        toShow: I
      }), J = Qt({
        slides: f,
        position: "after",
        toShow: R
      }), Q = [...q, ...h, ...J];
      if (!v.enabled || !Q.length)
        return K("section", {
          ref: m,
          class: ["carousel", "is-disabled"]
        }, Q);
      const yt = ((d = i.addons) === null || d === void 0 ? void 0 : d.call(i, et)) || [], ht = K("ol", {
        class: "carousel__track",
        style: { transform: ve.value },
        onMousedownCapture: v.mouseDrag ? pt : null,
        onTouchstartPassiveCapture: v.touchDrag ? pt : null
      }, Q), Rt = K("div", { class: "carousel__viewport", ref: D }, ht);
      return K("section", {
        ref: m,
        class: [
          "carousel",
          `is-${u.value}`,
          `is-effect-${v.slideEffect}`,
          {
            "is-vertical": te.value,
            "is-sliding": H.value,
            "is-dragging": it.value,
            "is-hover": ze.value
          }
        ],
        dir: u.value,
        style: Vt.value,
        "aria-label": v.i18n.ariaGallery,
        tabindex: "0",
        onFocus: Et,
        onBlur: ut,
        onMouseenter: rt,
        onMouseleave: Tt
      }, [Rt, yt, K(Wa)]);
    };
  }
});
var Ht;
(function(e) {
  e.arrowDown = "arrowDown", e.arrowLeft = "arrowLeft", e.arrowRight = "arrowRight", e.arrowUp = "arrowUp";
})(Ht || (Ht = {}));
const xt = (e) => `icon${e.charAt(0).toUpperCase() + e.slice(1)}`, Za = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function xa(e) {
  return e in Ht;
}
const ea = (e) => e && xa(e), ta = re({
  props: {
    name: {
      type: String,
      required: !0,
      validator: ea
    },
    title: {
      type: String,
      default: (e) => e.name ? z.i18n[xt(e.name)] : ""
    }
  },
  setup(e) {
    const i = ft(Xe, null);
    return () => {
      const r = e.name;
      if (!r || !ea(r))
        return;
      const n = Za[r], l = K("path", { d: n }), a = (i == null ? void 0 : i.config.i18n[xt(r)]) || e.title, f = K("title", a);
      return K("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": a
      }, [f, l]);
    };
  }
}), el = re({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(e, { slots: i, attrs: r }) {
    const n = ft(Xe);
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
    })[n.normalizedDir], m = s(() => !n.config.wrapAround && n.currentSlide <= n.minSlide), D = s(() => !n.config.wrapAround && n.currentSlide >= n.maxSlide);
    return () => {
      const { i18n: o } = n.config, T = K("button", Object.assign(Object.assign({ type: "button", disabled: m.value, "aria-label": o.ariaPreviousSlide, title: o.ariaPreviousSlide, onClick: n.nav.prev }, r), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": m.value },
        r.class
      ] }), (a == null ? void 0 : a()) || K(ta, { name: f() })), v = K("button", Object.assign(Object.assign({ type: "button", disabled: D.value, "aria-label": o.ariaNextSlide, title: o.ariaNextSlide, onClick: n.nav.next }, r), { class: [
        "carousel__next",
        { "carousel__next--disabled": D.value },
        r.class
      ] }), (l == null ? void 0 : l()) || K(ta, { name: g() }));
      return [T, v];
    };
  }
}), tl = re({
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
    const i = ft(Xe);
    if (!i)
      return () => "";
    const r = s(() => i.config.itemsToShow), n = s(() => zt({
      align: i.config.snapAlign,
      itemsToShow: r.value
    })), l = s(() => e.paginateByItemsToShow && r.value > 1), a = s(() => Math.ceil((i.activeSlide - n.value) / r.value)), f = s(() => Math.ceil(i.slidesCount / r.value)), g = (m) => ma(l.value ? {
      val: a.value,
      max: f.value - 1,
      min: 0
    } : {
      val: i.activeSlide,
      max: i.maxSlide,
      min: i.minSlide
    }) === m;
    return () => {
      var m, D;
      const o = [];
      for (let T = l.value ? 0 : i.minSlide; T <= (l.value ? f.value - 1 : i.maxSlide); T++) {
        const v = pa(i.config.i18n[l.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: T + 1
        }), S = g(T), E = K("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": S
          },
          "aria-label": v,
          "aria-pressed": S,
          "aria-controls": (D = (m = i.slides[T]) === null || m === void 0 ? void 0 : m.exposed) === null || D === void 0 ? void 0 : D.id,
          title: v,
          disabled: e.disableOnClick,
          onClick: () => i.nav.slideTo(l.value ? Math.floor(T * +i.config.itemsToShow + n.value) : T)
        }), V = K("li", { class: "carousel__pagination-item", key: T }, E);
        o.push(V);
      }
      return K("ol", { class: "carousel__pagination" }, o);
    };
  }
}), aa = re({
  name: "CarouselSlide",
  props: {
    id: {
      type: String,
      default: (e) => e.isClone ? void 0 : Da()
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
    const l = ft(Xe);
    if (la(Xe, void 0), !l)
      return () => "";
    const a = k(e.index), f = (E) => {
      a.value = E;
    }, g = Ia(), m = () => {
      const E = g.vnode.el;
      return E ? E.getBoundingClientRect() : { width: 0, height: 0 };
    };
    n({
      id: e.id,
      setIndex: f,
      getBoundingRect: m
    });
    const D = s(() => a.value === l.activeSlide), o = s(() => a.value === l.activeSlide - 1), T = s(() => a.value === l.activeSlide + 1), v = s(() => a.value >= l.visibleRange.min && a.value <= l.visibleRange.max), S = s(() => {
      if (l.config.itemsToShow === "auto")
        return;
      const E = l.config.itemsToShow, V = l.config.gap > 0 && E > 1 ? `calc(${100 / E}% - ${l.config.gap * (E - 1) / E}px)` : `${100 / E}%`;
      return l.isVertical ? { height: V } : { width: V };
    });
    return l.slideRegistry.registerSlide(g, e.index), Ta(() => {
      l.slideRegistry.unregisterSlide(g);
    }), e.isClone && (qt(() => {
      Zt(g.vnode);
    }), Ea(() => {
      Zt(g.vnode);
    })), () => {
      var E, V;
      return l.config.enabled ? K("li", {
        style: [i.style, Object.assign({}, S.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": e.isClone,
          "carousel__slide--visible": v.value,
          "carousel__slide--active": D.value,
          "carousel__slide--prev": o.value,
          "carousel__slide--next": T.value,
          "carousel__slide--sliding": l.isSliding
        },
        onFocusin: () => {
          l.viewport && (l.viewport.scrollLeft = 0), l.nav.slideTo(a.value);
        },
        id: e.isClone ? void 0 : e.id,
        "aria-hidden": e.isClone || void 0
      }, (V = r.default) === null || V === void 0 ? void 0 : V.call(r, {
        currentIndex: a.value,
        isActive: D.value,
        isClone: e.isClone,
        isPrev: o.value,
        isNext: T.value,
        isSliding: l.isSliding,
        isVisible: v.value
      })) : (E = r.default) === null || E === void 0 ? void 0 : E.call(r);
    };
  }
}), al = (e, i, r, n) => {
  if (!r) return 0;
  let l = String(e[r.key]).toLowerCase(), a = String(i[r.key]).toLowerCase();
  if (n === qe.Asc) {
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
    return l.startsWith("__:") ? Ra(l.substring(3)) : l;
  }
  return i[e.key];
}, ll = (e, i, r) => {
  if (!e.colspan) return -1;
  let n = i;
  return r.forEach((l) => {
    let a = Gt(e, l);
    a > 0 && a < n && (n = a);
  }), n;
}, Gt = (e, i) => e.colspan === !1 ? !1 : typeof e.colspan == "function" ? e.colspan(i) : e.colspan, nl = (e, i) => typeof e.preferSlot > "u" ? !0 : e.preferSlot === !1 ? !1 : typeof e.preferSlot == "function" ? e.preferSlot(i) : !0, ol = (e, i, r) => {
  if (typeof e != "object" || !e.key || i.indexOf(e.key) > -1) return !1;
  let n = Gt(e, r);
  return typeof e.colspan > "u" ? !0 : (typeof e.colspan < "u" && (typeof e.colspan == "function" ? n = parseInt(e.colspan(r)) : n = parseInt(e.colspan)), n > 0);
}, il = (e = []) => {
  if (e.length > 0) {
    for (let i = 0; i < e.length; ++i)
      if (e[i].sortable) return e[i].key;
  }
  return "";
}, rl = (e, i) => {
  if (e.length > 0) {
    for (let r = 0; r < e.length; ++r)
      if (e[r].key === i) return e[r];
  }
  return null;
}, ga = (e) => e.type ? `is-${e.type}` : "", ba = /* @__PURE__ */ re({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new ia() },
    columns: { default: () => [] },
    i: { default: 0 },
    editModeEnabled: { type: Boolean, default: !1 },
    hasInlineEditPerm: { type: Boolean, default: !1 }
  },
  emits: [
    "update:modelValue"
  ],
  setup(e, { emit: i }) {
    const r = i, n = e, l = k(n.modelValue), a = k(l.value[n.column.key]), f = k(null);
    F(a, (o) => {
      const T = JSON.parse(JSON.stringify(l.value));
      T[n.column.key] = o, r("update:modelValue", T);
    }), F(() => n.modelValue, (o) => {
      l.value = o, a.value = l.value[n.column.key];
    });
    const g = s(() => ({ ...n.column.slotData, item: l.value })), m = s(() => {
      var o, T, v, S;
      if ((o = n.column.field) != null && o.modalData && typeof ((T = n.column.field) == null ? void 0 : T.modalData) == "object")
        for (let E in n.column.field.modalData)
          if (typeof ((v = n.column.field) == null ? void 0 : v.modalData[E]) == "string" && n.column.field.modalData[E].startsWith("prop:")) {
            let V = n.column.field.modalData[E].substring(5);
            l.value[V];
          } else
            n.column.field.modalData[E];
      return (S = n.column.field) == null ? void 0 : S.modalData;
    }), D = s(() => typeof n.column.field == "string" && n.column.field.startsWith("prop:") ? Ma(n.column.field, l.value) : n.column.field);
    return (o, T) => {
      var V, Ce, O, le;
      const v = Se("lkt-anchor"), S = Se("lkt-button"), E = Se("lkt-field");
      return o.column.type === C(Ct).Anchor ? (c(), $(v, $e(ie({ key: 0 }, o.column.anchor)), {
        default: j(() => [
          lt(Ge(C(nt)(o.column, l.value, o.i)), 1)
        ]),
        _: 1
      }, 16)) : o.column.type === C(Ct).Button ? (c(), $(S, ie({ key: 1 }, o.column.button, { prop: l.value }), {
        default: j(() => [
          lt(Ge(C(nt)(o.column, l.value, o.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : o.column.type === C(Ct).Field && o.hasInlineEditPerm ? (c(), $(E, ie({ key: 2 }, D.value, {
        "read-mode": !o.column.editable || !o.editModeEnabled,
        ref: (G) => f.value = G,
        "slot-data": g.value,
        label: ((V = o.column.field) == null ? void 0 : V.type) === "switch" || ((Ce = o.column.field) == null ? void 0 : Ce.type) === "check" ? o.column.label : "",
        "modal-data": m.value,
        prop: l.value,
        modelValue: a.value,
        "onUpdate:modelValue": T[0] || (T[0] = (G) => a.value = G)
      }), null, 16, ["read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : o.column.type === C(Ct).Field ? (c(), $(E, ie({ key: 3 }, D.value, {
        "read-mode": "",
        ref: (G) => f.value = G,
        "slot-data": g.value,
        label: ((O = o.column.field) == null ? void 0 : O.type) === "switch" || ((le = o.column.field) == null ? void 0 : le.type) === "check" ? o.column.label : "",
        "modal-data": m.value,
        prop: l.value,
        "model-value": a.value
      }), null, 16, ["slot-data", "label", "modal-data", "prop", "model-value"])) : (c(), y(x, { key: 4 }, [
        lt(Ge(C(nt)(o.column, l.value, o.i, o.columns)), 1)
      ], 64));
    };
  }
}), Ee = class Ee {
};
Ee.navButtonSlot = "", Ee.dropButtonSlot = "", Ee.editButtonSlot = "", Ee.createButtonSlot = "", Ee.defaultEmptySlot = void 0, Ee.defaultSaveIcon = "", Ee.defaultNoResultsMessage = "No results";
let W = Ee;
const ul = /* @__PURE__ */ re({
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
    const r = i, n = e, l = s(() => W.dropButtonSlot !== ""), a = s(() => W.dropButtonSlot), f = s(() => ra(n.config.resourceData, n.item));
    return (g, m) => {
      const D = Se("lkt-button");
      return c(), $(D, ie({ palette: "table-delete" }, n.config, {
        disabled: g.disabled,
        "resource-data": f.value,
        onClick: m[0] || (m[0] = na((o) => r("click", o), ["prevent", "stop"]))
      }), {
        default: j(() => [
          l.value ? (c(), $(Ae(a.value), { key: 0 })) : B("", !0)
        ]),
        _: 1
      }, 16, ["disabled", "resource-data"]);
    };
  }
}), sl = /* @__PURE__ */ re({
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
    const r = i, n = e, l = s(() => W.editButtonSlot !== ""), a = s(() => W.editButtonSlot), f = s(() => ra(n.config.resourceData, n.item));
    return (g, m) => {
      const D = Se("lkt-button");
      return c(), $(D, ie({ palette: "table-edit" }, n.config, {
        disabled: g.disabled,
        "resource-data": f.value,
        onClick: m[0] || (m[0] = na((o) => r("click"), ["prevent", "stop"]))
      }), {
        default: j(() => [
          l.value ? (c(), $(Ae(a.value), { key: 0 })) : B("", !0)
        ]),
        _: 1
      }, 16, ["disabled", "resource-data"]);
    };
  }
}), dl = ["data-i", "data-draggable"], cl = ["data-role", "data-i"], vl = {
  key: 1,
  class: "lkt-table-nav-cell"
}, fl = { class: "lkt-table-nav-container" }, pl = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, ml = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, gl = ["colspan"], bl = ["colspan"], yl = ["data-column", "colspan", "title"], hl = {
  key: 6,
  class: "lkt-table-col-drop"
}, kl = {
  key: 7,
  class: "lkt-table-col-edit"
}, Sl = /* @__PURE__ */ re({
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
    rowDisplayType: { type: [Number, Function], default: tt.Auto },
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
    var X;
    const r = oa(), n = i, l = e, a = k(l.modelValue);
    let f = typeof l.rowDisplayType == "function" ? l.rowDisplayType(a.value, l.i) : l.rowDisplayType;
    f || (f = tt.Auto);
    const g = [tt.Auto, tt.PreferCustomItem].includes(f), m = [tt.Auto, tt.PreferItem].includes(f), D = k((X = l.editButton.anchor) == null ? void 0 : X.to);
    for (let u in a.value) D.value = sa(D.value, ":" + u, a.value[u]);
    const o = (u) => n("click", u), T = (u, _) => {
      n("show", u, _);
    }, v = s(() => {
      let u = [], _ = !1;
      return typeof l.disabledDrag == "function" ? _ = l.disabledDrag(a.value) : _ = G.value === !0, !_ && l.sortable && l.isDraggable ? u.push("handle") : _ && u.push("disabled"), u.join(" ");
    }), S = s(() => W.navButtonSlot !== ""), E = s(() => W.navButtonSlot), V = () => {
      n("item-up", l.i);
    }, Ce = () => {
      n("item-down", l.i);
    }, O = () => {
      n("item-drop", l.i);
    };
    F(() => l.modelValue, (u) => a.value = u), F(a, (u) => {
      n("update:modelValue", u);
    }, { deep: !0 });
    const le = s(() => typeof l.renderDrag == "function" ? l.renderDrag(a.value) : l.renderDrag === !0), G = s(() => typeof l.disabledDrag == "function" ? l.disabledDrag(a.value) : l.disabledDrag === !0), Ve = s(() => v.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), ue = s(() => {
      let u = [];
      return g && u.push("type-custom-item"), m && u.push("type-item"), typeof l.itemContainerClass == "function" ? u.push(l.itemContainerClass(a.value, l.i)) : l.itemContainerClass !== "" && u.push(l.itemContainerClass), u.join(" ");
    });
    return (u, _) => {
      const te = Se("lkt-button");
      return c(), y("tr", {
        "data-i": u.i,
        "data-draggable": u.isDraggable,
        class: ae(ue.value)
      }, [
        u.sortable && u.editModeEnabled && le.value ? (c(), y("td", {
          key: 0,
          "data-role": Ve.value,
          class: ae(v.value),
          "data-i": u.i
        }, _[3] || (_[3] = [
          ee("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]), 10, cl)) : B("", !0),
        u.addNavigation && u.editModeEnabled ? (c(), y("td", vl, [
          ee("div", fl, [
            pe(te, {
              palette: "table-nav",
              disabled: u.i === 0,
              onClick: V
            }, {
              default: j(() => [
                S.value ? (c(), $(Ae(E.value), {
                  key: 0,
                  direction: "up"
                })) : (c(), y("i", pl))
              ]),
              _: 1
            }, 8, ["disabled"]),
            pe(te, {
              palette: "table-nav",
              disabled: u.latestRow,
              onClick: Ce
            }, {
              default: j(() => [
                S.value ? (c(), $(Ae(E.value), {
                  key: 0,
                  direction: "down"
                })) : (c(), y("i", ml))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : B("", !0),
        u.displayHiddenColumnsIndicator ? (c(), y("td", {
          key: 2,
          onClick: _[0] || (_[0] = (P) => T(P, u.i)),
          "data-role": "show-more",
          class: ae(u.hiddenIsVisible ? "state-open" : "")
        }, null, 2)) : B("", !0),
        C(g) && C(r)[`item-${u.i}`] ? (c(), y("td", {
          key: "td" + u.i,
          colspan: u.visibleColumns.length
        }, [
          U(u.$slots, `item-${u.i}`, {
            item: a.value,
            index: u.i,
            editing: u.editModeEnabled,
            canCreate: u.canCreate,
            canRead: u.canRead,
            canUpdate: u.canEdit,
            canDrop: u.canDrop,
            isLoading: u.isLoading,
            doDrop: () => O()
          })
        ], 8, gl)) : C(m) && C(r).item ? (c(), y("td", {
          key: "td" + u.i,
          colspan: u.visibleColumns.length
        }, [
          U(u.$slots, "item", {
            item: a.value,
            index: u.i,
            editing: u.editModeEnabled,
            canCreate: u.canCreate,
            canRead: u.canRead,
            canUpdate: u.canEdit,
            canDrop: u.canDrop,
            isLoading: u.isLoading,
            doDrop: () => O()
          })
        ], 8, bl)) : (c(!0), y(x, { key: 5 }, de(u.visibleColumns, (P) => (c(), y(x, null, [
          C(ol)(P, u.emptyColumns, a.value) ? (c(), y("td", {
            key: "td" + u.i,
            "data-column": P.key,
            colspan: C(Gt)(P, a.value),
            title: C(nt)(P, a.value, u.i, u.visibleColumns),
            class: ae(C(ga)(P)),
            onClick: _[2] || (_[2] = (M) => o(M))
          }, [
            u.$slots[P.key] && C(nl)(P, a.value) ? U(u.$slots, P.key, {
              key: 0,
              value: a.value[P.key],
              item: a.value,
              column: P,
              i: u.i
            }) : a.value ? (c(), $(ba, {
              key: 1,
              modelValue: a.value,
              "onUpdate:modelValue": _[1] || (_[1] = (M) => a.value = M),
              column: P,
              columns: u.visibleColumns,
              "edit-mode-enabled": u.editModeEnabled,
              "has-inline-edit-perm": u.hasInlineEditPerm,
              i: u.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : B("", !0)
          ], 10, yl)) : B("", !0)
        ], 64))), 256)),
        u.canDrop && u.editModeEnabled ? (c(), y("td", hl, [
          pe(ul, {
            config: u.dropButton,
            item: a.value,
            onClick: O
          }, null, 8, ["config", "item"])
        ])) : B("", !0),
        u.canEdit && u.editModeEnabled ? (c(), y("td", kl, [
          pe(sl, {
            config: u.editButton,
            item: a.value
          }, null, 8, ["config", "item"])
        ])) : B("", !0)
      ], 10, dl);
    };
  }
}), Cl = { "data-role": "hidden-row" }, wl = ["colspan"], Bl = ["data-column"], Dl = ["data-i"], Il = ["data-column", "title"], Tl = /* @__PURE__ */ re({
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
    const r = i, n = e, l = k(n.modelValue), a = (f) => r("click", f);
    return F(() => n.modelValue, (f) => l.value = f), F(l, () => r("update:modelValue", l.value)), (f, g) => Oe((c(), y("tr", Cl, [
      ee("td", { colspan: f.hiddenColumnsColSpan }, [
        ee("table", null, [
          ee("tr", null, [
            (c(!0), y(x, null, de(f.hiddenColumns, (m) => (c(), y("th", {
              "data-column": m.key
            }, [
              ee("div", null, Ge(m.label), 1)
            ], 8, Bl))), 256))
          ]),
          ee("tr", { "data-i": f.i }, [
            (c(!0), y(x, null, de(f.hiddenColumns, (m, D) => (c(), y("td", {
              "data-column": m.key,
              title: C(nt)(m, l.value, D, f.hiddenColumns),
              onClick: g[1] || (g[1] = (o) => a(o))
            }, [
              f.$slots[m.key] ? U(f.$slots, m.key, {
                key: 0,
                value: l.value[m.key],
                item: l.value,
                column: m,
                i: D
              }) : (c(), $(ba, {
                key: 1,
                column: m,
                columns: f.hiddenColumns,
                modelValue: l.value,
                "onUpdate:modelValue": g[0] || (g[0] = (o) => l.value = o),
                i: D,
                "edit-mode-enabled": f.editModeEnabled,
                "has-inline-edit-perm": f.hasInlineEditPerm
              }, null, 8, ["column", "columns", "modelValue", "i", "edit-mode-enabled", "has-inline-edit-perm"]))
            ], 8, Il))), 256))
          ], 8, Dl)
        ])
      ], 8, wl)
    ], 512)), [
      [_e, f.hiddenIsVisible]
    ]);
  }
}), Ft = /* @__PURE__ */ re({
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
    var D;
    const r = i, n = e, l = s(() => W.createButtonSlot !== ""), a = s(() => W.createButtonSlot), f = {
      ...(D = n.config) == null ? void 0 : D.modalData,
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
    return (o, T) => {
      const v = Se("lkt-button");
      return c(), $(v, ie(g, {
        disabled: o.disabled,
        onClick: m
      }), {
        default: j(() => [
          l.value ? (c(), $(Ae(a.value), { key: 0 })) : B("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), El = ["data-column", "data-sortable", "data-sort", "colspan", "title"], Al = /* @__PURE__ */ re({
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
  setup(e, { emit: i }) {
    const r = i, n = e, l = s(() => ll(n.column, n.amountOfColumns, n.items)), a = s(() => n.column.sortable === !0), f = s(() => a.value && n.sortBy === n.column.key ? n.sortDirection : ""), g = s(() => ua(n.column.label)), m = s(() => a.value && n.sortBy === n.column.key ? n.sortDirection === qe.Asc ? fe.defaultTableSortAscIcon : n.sortDirection === qe.Desc ? fe.defaultTableSortDescIcon : "" : ""), D = () => r("click", n.column);
    return (o, T) => (c(), y("th", {
      "data-column": o.column.key,
      "data-sortable": a.value,
      "data-sort": f.value,
      colspan: l.value,
      title: g.value,
      class: ae(C(ga)(o.column)),
      onClick: D
    }, [
      ee("div", null, [
        lt(Ge(g.value) + " ", 1),
        m.value ? (c(), y("i", {
          key: 0,
          class: ae(m.value)
        }, null, 2)) : B("", !0)
      ])
    ], 10, El));
  }
}), Vl = ["id"], Rl = { class: "lkt-table-page-buttons" }, Ml = { class: "switch-edition-mode" }, Nl = { class: "switch-edition-mode" }, Ll = {
  key: 0,
  class: "lkt-table-page-buttons"
}, $l = {
  key: 1,
  class: "lkt-table-page-filters"
}, Ol = { class: "lkt-table" }, _l = { key: 0 }, Pl = { key: 0 }, Ul = {
  key: 0,
  "data-role": "drag-indicator"
}, Fl = { key: 1 }, jl = { key: 2 }, zl = {
  key: 3,
  class: "lkt-table-col-drop"
}, Hl = {
  key: 4,
  class: "lkt-table-col-edit"
}, ql = ["id"], Gl = ["id"], Xl = ["data-i"], Yl = ["data-i"], Kl = ["id"], Wl = { class: "lkt-carousel-slide" }, Jl = { class: "lkt-carousel-slide" }, Ql = {
  key: 2,
  class: "lkt-table-empty"
}, Zl = {
  key: 4,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, xl = /* @__PURE__ */ re({
  __name: "LktTable",
  props: /* @__PURE__ */ Va({
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
    groupButton: { type: [Object, Boolean] },
    requiredItemsForTopCreate: {},
    requiredItemsForBottomCreate: {},
    addNavigation: { type: Boolean },
    newValueGenerator: { type: Function },
    wrapContentTag: {},
    wrapContentClass: {},
    itemsContainerClass: {},
    itemContainerClass: { type: [String, Function] },
    createEnabledValidator: { type: Function }
  }, Na(La)),
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
  setup(e, { expose: i, emit: r }) {
    var Kt, Wt;
    const n = r, l = oa(), a = e, f = {}, g = k(typeof a.sorter == "function" ? a.sorter : al), m = k(il(a.columns)), D = k(qe.Asc), o = k(a.modelValue), T = k(f), v = k(null), S = k(a.columns), E = k((Kt = a.paginator) == null ? void 0 : Kt.modelValue), V = k(a.loading), Ce = k(!1), O = k(a.perms), le = k(null), G = k(null), Ve = k(null), ue = k({}), X = k(new Oa({ items: o.value }, a.dataStateConfig)), u = k(a.editMode), _ = k(0), te = k(null), P = k(((Wt = a.carousel) == null ? void 0 : Wt.currentSlide) || 0), M = k(De(a.saveButton, fe.defaultSaveButton)), me = k(De(a.createButton, fe.defaultCreateButton)), ot = k(De(a.editModeButton, fe.defaultEditModeButton)), Pe = k(De(a.dropButton, fe.defaultDropButton)), ne = k(De(a.groupButton, fe.defaultGroupButton));
    F(() => a.saveButton, (t) => M.value = De(a.saveButton, fe.defaultSaveButton)), F(() => a.createButton, (t) => me.value = De(a.createButton, fe.defaultCreateButton)), F(() => a.editModeButton, (t) => ot.value = De(a.editModeButton, fe.defaultEditModeButton)), F(() => a.dropButton, (t) => Pe.value = De(a.dropButton, fe.defaultDropButton));
    const Re = k(!1);
    F(V, (t) => n("update:loading", t)), F(E, (t) => n("page", t));
    const Ue = (t) => {
      O.value = t;
    }, It = (t) => {
      var p;
      Array.isArray(t.data) && ((!a.paginator || ![wt.LoadMore, wt.Infinite].includes((p = a.paginator) == null ? void 0 : p.type)) && o.value.splice(0, o.value.length), o.value = [...o.value, ...t.data]), V.value = !1, Ce.value = !0, X.value.store({ items: o.value }).turnStoredIntoOriginal(), Re.value = !1, St(() => {
        ve(), Me.value, n("read-response", t);
      });
    }, ge = () => St(() => V.value = !0), Ye = () => {
      le.value.doRefresh();
    }, be = $a(12), ye = s(() => {
      if (!a.hideEmptyColumns) return [];
      let t = [];
      return S.value.forEach((p) => {
        let N = p.key, Z = !1;
        o.value.forEach((oe) => {
          if (typeof oe.checkEmpty == "function")
            return oe.checkEmpty(oe);
          oe[N] && (Z = !0);
        }), Z || t.push(N);
      }), t;
    }), Fe = s(() => S.value.filter((t) => !t.hidden)), Ke = s(() => S.value.filter((t) => t.hidden)), We = s(() => {
      let t = Fe.value.length + 1;
      return a.sortable && ++t, t;
    }), we = s(() => S.value.filter((t) => t.isForRowKey)), je = s(() => Ke.value.length > 0 && !a.sortable), ce = s(() => S.value.map((t) => t.key)), ze = s(() => {
      let t = [];
      for (let p in l) ce.value.indexOf(p) !== -1 && t.push(p);
      return t;
    }), it = s(() => {
      let t = [];
      for (let p in l) p.indexOf("slide-") !== -1 && t.push(p);
      return t;
    }), rt = s(() => {
      var t;
      return a.hiddenSave || V.value || !((t = M.value) != null && t.resource || M.value.type) ? !1 : u.value && Re.value ? !0 : u.value;
    }), Tt = s(() => vt.value && o.value.length >= a.requiredItemsForTopCreate || He.value ? !0 : rt.value || u.value && he.value), Me = s(() => {
      var t, p;
      return _.value, typeof ((t = M.value) == null ? void 0 : t.disabled) == "function" ? M.value.disabled({
        value: o.value,
        dataState: X.value
      }) : typeof ((p = M.value) == null ? void 0 : p.disabled) == "boolean" ? M.value.disabled : !Re.value;
    }), Et = s(() => o.value.length), ut = s(() => {
      var t;
      return {
        items: o.value,
        ...(t = M.value) == null ? void 0 : t.resourceData
      };
    }), pt = s(() => a.titleTag === "" ? "h2" : a.titleTag), st = s(() => a.wrapContentTag === "" ? "div" : a.wrapContentTag), Je = s(() => ua(a.title)), Qe = s(() => {
      var t;
      return (t = a.drag) == null ? void 0 : t.enabled;
    }), he = s(() => O.value.includes(Ie.Create)), Ne = s(() => O.value.includes("read")), H = s(() => O.value.includes(Ie.Update)), Be = s(() => O.value.includes(Ie.Edit)), Le = s(() => O.value.includes(Ie.InlineEdit)), Ze = s(() => O.value.includes(Ie.ModalCreate)), mt = s(() => O.value.includes(Ie.InlineCreate)), dt = s(() => O.value.includes(Ie.InlineCreateEver)), Y = s(() => O.value.includes(Ie.Drop)), ct = s(() => O.value.includes(Ie.SwitchEditMode)), He = s(() => !ct.value || !H.value && !Y.value || !H.value && Y.value ? !1 : !V.value), xe = s(() => {
      var t;
      return (typeof ((t = a.paginator) == null ? void 0 : t.type) < "u" && [wt.LoadMore, wt.Infinite].includes(a.paginator.type) || !V.value) && o.value.length > 0;
    }), At = (t) => {
      let p = t.target;
      if (typeof p.dataset.column > "u")
        do
          p = p.parentNode;
        while (typeof p.dataset.column > "u" && p.tagName !== "TABLE" && p.tagName !== "body");
      if (p.tagName === "TD" && (p = p.parentNode, p = p.dataset.i, typeof p < "u"))
        return o.value[p];
    }, ve = () => {
      _.value = Pa();
    }, Vt = (t) => o.value[t], gt = (t) => {
      var p;
      return (p = v.value) == null ? void 0 : p.querySelector(`[data-i="${t}"]`);
    }, bt = (t) => T.value["tr_" + t] === !0, et = (t) => {
      t && t.sortable && (o.value = o.value.sort((p, N) => g.value(p, N, t, D.value)), D.value = D.value === qe.Asc ? qe.Desc : qe.Asc, m.value = t.key, ve(), n("sort", [m.value, D.value]));
    }, d = (t) => {
      n("click", t);
    }, b = (t, p) => {
      let N = "tr_" + p;
      T.value[N] = typeof T.value[N] > "u" ? !0 : !T.value[N];
    }, h = (t) => {
      var N, Z, oe, se, A, w, L, ke;
      let p = parseInt((se = (oe = (Z = (N = t == null ? void 0 : t.originalEvent) == null ? void 0 : N.toElement) == null ? void 0 : Z.closest("tr")) == null ? void 0 : oe.dataset) == null ? void 0 : se.i);
      return !(typeof ((A = a.drag) == null ? void 0 : A.isValid) == "function" && !((w = a.drag) != null && w.isValid(o.value[p])) || typeof ((L = a.drag) == null ? void 0 : L.isValid) == "boolean" && !((ke = a.drag) != null && ke.isValid));
    }, I = (t) => {
      var p, N;
      return typeof ((p = a.drag) == null ? void 0 : p.isDraggable) == "function" ? (N = a.drag) == null ? void 0 : N.isDraggable(t) : !0;
    }, R = () => {
      if (he.value) {
        n("click-create");
        return;
      }
      if (mt.value || dt.value) {
        if (typeof a.newValueGenerator == "function") {
          let t = a.newValueGenerator();
          if (typeof t == "object" || a.type !== at.Table) {
            o.value.push(t);
            return;
          }
        }
        o.value.push({});
      } else
        n("click-create");
    }, q = (t) => {
      o.value.push(t);
    }, J = () => V.value = !0, Q = () => V.value = !1, yt = (t, p) => {
      var N, Z, oe;
      if (!((N = M.value) != null && N.type && [
        Pt.Split,
        Pt.SplitEver,
        Pt.SplitLazy
      ].includes((Z = M.value) == null ? void 0 : Z.type))) {
        if (n("before-save"), (oe = M.value) != null && oe.resource && (V.value = !1, !p.success)) {
          n("error", p.httpStatus);
          return;
        }
        X.value.turnStoredIntoOriginal(), Re.value = !1, n("save", p);
      }
    }, ht = (t, p, N) => {
      if (N >= t.length) {
        let Z = N - t.length + 1;
        for (; Z--; ) t.push(void 0);
      }
      return t.splice(N, 0, t.splice(p, 1)[0]), t;
    }, Rt = (t) => {
      ht(o.value, t, t - 1), ve();
    }, ya = (t) => {
      ht(o.value, t, t + 1), ve();
    }, kt = (t) => {
      o.value.splice(t, 1), ve();
    }, Xt = () => {
      var t;
      ue.value && typeof ((t = ue.value) == null ? void 0 : t.destroy) == "function" && (ue.value.destroy(), ue.value = {});
    }, Mt = () => {
      te.value || (te.value = document.getElementById("lkt-table-body-" + be)), ue.value = new _a(te.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(t) {
          let p = t.oldIndex, N = t.newIndex;
          o.value.splice(N, 0, o.value.splice(p, 1)[0]), ve(), n("drag-end", o.value[N]);
        },
        onMove: function(t, p) {
          return h(t);
        }
      });
    }, Nt = (t, p, N = !1) => {
      let Z = [_.value, be, "row", p];
      return N && Z.push("hidden"), we.value.forEach((oe) => {
        let se = String(t[oe.key]).toLowerCase();
        se.length > 50 && (se = se.substring(0, 50)), se = sa(se, " ", "-"), Z.push(se);
      }), Z.join("-");
    }, Lt = s(() => typeof a.createEnabledValidator == "function" ? a.createEnabledValidator({ items: o.value }) : !0), vt = s(() => dt.value || he.value && u.value || mt.value && u.value || Ze.value && u.value), ha = s(() => [at.Ol, at.Ul].includes(a.type)), $t = (t, p) => typeof a.itemDisplayChecker == "function" ? a.itemDisplayChecker(t) : !0, Yt = (t, p) => typeof a.itemContainerClass == "function" ? a.itemContainerClass(t, p) : a.itemContainerClass;
    qt(() => {
      var t;
      a.initialSorting && et(rl(a.columns, m.value)), X.value.store({ items: o.value }).turnStoredIntoOriginal(), Re.value = !1, (t = a.drag) != null && t.enabled && St(() => {
        Mt();
      });
    }), F(() => {
      var t;
      return (t = a.drag) == null ? void 0 : t.enabled;
    }, (t) => {
      t ? Mt() : Xt();
    }), F(() => a.type, (t) => {
      var p;
      (p = a.drag) != null && p.enabled ? Mt() : Xt();
    }), F(() => a.perms, (t) => O.value = t), F(O, (t) => n("update:perms", t)), F(u, (t) => {
      n("update:editMode", t);
    }), F(() => a.editMode, (t) => u.value = t), F(() => a.columns, (t) => S.value = t, { deep: !0 }), F(() => a.modelValue, (t) => {
      o.value = t;
    }, { deep: !0 }), F(o, (t) => {
      X.value.increment({ items: t }), Re.value = X.value.changed(), n("update:modelValue", t);
    }, { deep: !0 }), i({
      getItemByEvent: At,
      getItemByIndex: Vt,
      getRowByIndex: gt,
      doRefresh: Ye,
      doRemoveIndex: (t) => {
        o.value.splice(t, 1), ve();
      },
      getHtml: () => G.value,
      reRender: ve,
      turnStoredIntoOriginal: () => {
        X.value.turnStoredIntoOriginal(), St(() => {
          ve();
        });
      }
    });
    const ka = s(() => typeof W.defaultEmptySlot < "u"), Sa = s(() => W.defaultEmptySlot), Ca = s(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled ? !1 : typeof a.drag.canRender > "u" ? !0 : a.drag.canRender), wa = s(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled || typeof a.drag.isDisabled > "u" ? !1 : a.drag.isDisabled);
    return (t, p) => {
      const N = Se("lkt-button"), Z = Se("lkt-loader"), oe = Se("lkt-paginator");
      return c(), y("section", {
        ref_key: "element",
        ref: G,
        class: "lkt-table-page",
        id: "lkt-table-page-" + C(be)
      }, [
        Je.value || C(l).title ? (c(), y("header", {
          key: 0,
          class: ae(t.headerClass)
        }, [
          Je.value ? (c(), $(Ae(pt.value), { key: 0 }, {
            default: j(() => [
              t.titleIcon ? (c(), y("i", {
                key: 0,
                class: ae(t.titleIcon)
              }, null, 2)) : B("", !0),
              lt(" " + Ge(Je.value), 1)
            ]),
            _: 1
          })) : B("", !0),
          C(l).title ? U(t.$slots, "title", { key: 1 }) : B("", !0)
        ], 2)) : B("", !0),
        (c(), $(Ae(st.value), {
          class: ae(["lkt-table-page-content-wrapper", t.wrapContentClass])
        }, {
          default: j(() => {
            var se;
            return [
              Oe(ee("div", Rl, [
                t.groupButton !== !1 ? (c(), $(N, ie({
                  key: 0,
                  ref: "groupButton"
                }, ne.value, { class: "lkt-item-crud-group-button" }), {
                  split: j(() => [
                    ee("div", Ml, [
                      Oe(pe(N, ie(ot.value, {
                        checked: u.value,
                        "onUpdate:checked": p[0] || (p[0] = (A) => u.value = A)
                      }), null, 16, ["checked"]), [
                        [_e, He.value]
                      ])
                    ]),
                    C(l)["prev-buttons-ever"] ? U(t.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: H.value,
                      canDrop: Y.value,
                      perms: t.perms
                    }) : B("", !0),
                    C(l)["prev-buttons"] ? U(t.$slots, "prev-buttons", {
                      key: 1,
                      canUpdate: H.value,
                      canDrop: Y.value,
                      perms: t.perms
                    }) : B("", !0),
                    Oe(pe(N, ie({
                      class: "lkt-table--save-button",
                      ref_key: "saveButtonRef",
                      ref: Ve
                    }, {
                      ...M.value,
                      disabled: Me.value,
                      resourceData: ut.value
                    }, {
                      onLoading: J,
                      onLoaded: Q,
                      onClick: yt
                    }), {
                      split: j(({ doClose: A, doRootClick: w }) => [
                        U(t.$slots, "button-save-split", {
                          doClose: A,
                          doRootClick: w,
                          dataState: X.value,
                          onButtonLoading: J,
                          onButtonLoaded: Q
                        })
                      ]),
                      default: j(() => [
                        C(l)["button-save"] ? U(t.$slots, "button-save", {
                          key: 0,
                          items: o.value,
                          editMode: t.editMode,
                          canUpdate: !Me.value
                        }) : B("", !0)
                      ]),
                      _: 3
                    }, 16), [
                      [_e, rt.value]
                    ]),
                    vt.value && o.value.length >= t.requiredItemsForTopCreate ? (c(), $(Ft, {
                      key: 2,
                      config: me.value,
                      disabled: !Lt.value,
                      onClick: R,
                      onAppend: q
                    }, null, 8, ["config", "disabled"])) : B("", !0)
                  ]),
                  _: 3
                }, 16)) : B("", !0),
                C(l)["prev-buttons-ever"] ? U(t.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: H.value,
                  canDrop: Y.value,
                  perms: t.perms
                }) : B("", !0),
                C(l)["prev-buttons"] ? U(t.$slots, "prev-buttons", {
                  key: 2,
                  canUpdate: H.value,
                  canDrop: Y.value,
                  perms: t.perms
                }) : B("", !0),
                Oe(pe(N, ie({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: Ve
                }, {
                  ...M.value,
                  disabled: Me.value,
                  resourceData: ut.value
                }, {
                  onLoading: J,
                  onLoaded: Q,
                  onClick: yt
                }), {
                  split: j(({ doClose: A, doRootClick: w }) => [
                    U(t.$slots, "button-save-split", {
                      doClose: A,
                      doRootClick: w,
                      dataState: X.value,
                      onButtonLoading: J,
                      onButtonLoaded: Q
                    })
                  ]),
                  default: j(() => [
                    C(l)["button-save"] ? U(t.$slots, "button-save", {
                      key: 0,
                      items: o.value,
                      editMode: t.editMode,
                      canUpdate: !Me.value
                    }) : B("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [_e, rt.value]
                ]),
                vt.value && o.value.length >= t.requiredItemsForTopCreate ? (c(), $(Ft, {
                  key: 3,
                  config: me.value,
                  disabled: !Lt.value,
                  onClick: R,
                  onAppend: q
                }, null, 8, ["config", "disabled"])) : B("", !0),
                ee("div", Nl, [
                  Oe(pe(N, ie(ot.value, {
                    checked: u.value,
                    "onUpdate:checked": p[1] || (p[1] = (A) => u.value = A)
                  }), null, 16, ["checked"]), [
                    [_e, He.value]
                  ])
                ])
              ], 512), [
                [_e, Tt.value]
              ]),
              C(l).buttons ? (c(), y("div", Ll, [
                U(t.$slots, "buttons")
              ])) : B("", !0),
              Ce.value && C(l).filters ? (c(), y("div", $l, [
                U(t.$slots, "filters", {
                  items: o.value,
                  isLoading: V.value
                })
              ])) : B("", !0),
              Oe(ee("div", Ol, [
                t.type === C(at).Table ? (c(), y("table", _l, [
                  t.hideTableHeader ? B("", !0) : (c(), y("thead", Pl, [
                    ee("tr", null, [
                      Qe.value && u.value ? (c(), y("th", Ul)) : B("", !0),
                      t.addNavigation && u.value ? (c(), y("th", Fl)) : B("", !0),
                      je.value ? (c(), y("th", jl)) : B("", !0),
                      (c(!0), y(x, null, de(Fe.value, (A) => (c(), y(x, null, [
                        ye.value.indexOf(A.key) === -1 ? (c(), $(Al, {
                          key: 0,
                          column: A,
                          "sort-by": m.value,
                          "sort-direction": D.value,
                          "amount-of-columns": t.columns.length,
                          items: o.value,
                          onClick: (w) => et(A)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : B("", !0)
                      ], 64))), 256)),
                      Y.value && u.value ? (c(), y("th", zl)) : B("", !0),
                      Be.value && H.value && u.value ? (c(), y("th", Hl)) : B("", !0)
                    ])
                  ])),
                  ee("tbody", {
                    ref_key: "tableBody",
                    ref: v,
                    id: "lkt-table-body-" + C(be),
                    class: ae(t.itemsContainerClass)
                  }, [
                    (c(!0), y(x, null, de(o.value, (A, w) => Oe((c(), $(Sl, {
                      modelValue: o.value[w],
                      "onUpdate:modelValue": (L) => o.value[w] = L,
                      key: Nt(A, w),
                      i: w,
                      "drop-button": Pe.value,
                      "edit-button": t.editButton,
                      "display-hidden-columns-indicator": je.value,
                      "is-draggable": I(A),
                      sortable: Qe.value,
                      "visible-columns": Fe.value,
                      "empty-columns": ye.value,
                      "add-navigation": t.addNavigation,
                      "hidden-is-visible": bt(w),
                      "latest-row": w + 1 === Et.value,
                      "can-drop": Y.value && u.value,
                      "can-edit": Be.value && H.value && u.value,
                      "can-read": Ne.value,
                      "can-create": he.value,
                      "edit-mode-enabled": u.value,
                      "has-inline-edit-perm": Le.value,
                      "row-display-type": t.rowDisplayType,
                      "render-drag": Ca.value,
                      "disabled-drag": wa.value,
                      "is-loading": V.value,
                      "item-container-class": t.itemContainerClass,
                      onClick: d,
                      onShow: b,
                      onItemUp: Rt,
                      onItemDown: ya,
                      onItemDrop: kt
                    }, Jt({ _: 2 }, [
                      C(l)[`item-${w}`] ? {
                        name: `item-${w}`,
                        fn: j((L) => [
                          U(t.$slots, `item-${w}`, $e({
                            [t.slotItemVar || ""]: L.item,
                            index: w,
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
                      } : C(l).item ? {
                        name: "item",
                        fn: j((L) => [
                          U(t.$slots, "item", $e({
                            [t.slotItemVar || ""]: L.item,
                            index: w,
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
                      de(ze.value, (L) => ({
                        name: L,
                        fn: j((ke) => [
                          U(t.$slots, L, $e({
                            [t.slotItemVar || ""]: ke.item,
                            value: ke.value,
                            column: ke.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "drop-button", "edit-button", "display-hidden-columns-indicator", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "hidden-is-visible", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class"])), [
                      [_e, $t(o.value[w])]
                    ])), 128)),
                    Ke.value.length > 0 ? (c(!0), y(x, { key: 0 }, de(o.value, (A, w) => (c(), $(Tl, {
                      modelValue: o.value[w],
                      "onUpdate:modelValue": (L) => o.value[w] = L,
                      key: Nt(A, w, !0),
                      i: w,
                      "hidden-columns": Ke.value,
                      "hidden-columns-col-span": We.value,
                      "is-draggable": I(A),
                      sortable: Qe.value,
                      "visible-columns": Fe.value,
                      "empty-columns": ye.value,
                      "hidden-is-visible": bt(w),
                      "edit-mode-enabled": u.value,
                      "has-inline-edit-perm": Le.value,
                      onClick: d,
                      onShow: b
                    }, Jt({ _: 2 }, [
                      de(ze.value, (L) => ({
                        name: L,
                        fn: j((ke) => [
                          U(t.$slots, L, $e({
                            [t.slotItemVar || ""]: ke.item,
                            value: ke.value,
                            column: ke.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "hidden-columns", "hidden-columns-col-span", "is-draggable", "sortable", "visible-columns", "empty-columns", "hidden-is-visible", "edit-mode-enabled", "has-inline-edit-perm"]))), 128)) : B("", !0)
                  ], 10, ql)
                ])) : t.type === C(at).Item ? (c(), y("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + C(be),
                  class: ae(["lkt-table-items-container", t.itemsContainerClass])
                }, [
                  (c(!0), y(x, null, de(o.value, (A, w) => (c(), y(x, null, [
                    $t(A) ? (c(), y("div", {
                      class: ae(["lkt-table-item", Yt(A, w)]),
                      "data-i": w,
                      key: Nt(A, w)
                    }, [
                      U(t.$slots, "item", $e({
                        [t.slotItemVar || ""]: A,
                        index: w,
                        editing: u.value,
                        canCreate: he.value,
                        canRead: Ne.value,
                        canUpdate: H.value,
                        canDrop: Y.value,
                        isLoading: V.value,
                        doDrop: () => kt(w)
                      }))
                    ], 10, Xl)) : B("", !0)
                  ], 64))), 256))
                ], 10, Gl)) : ha.value ? (c(), $(Ae(t.type), {
                  key: 2,
                  class: ae(["lkt-table-items-container", t.itemsContainerClass])
                }, {
                  default: j(() => [
                    (c(!0), y(x, null, de(o.value, (A, w) => (c(), y(x, null, [
                      $t(A) ? (c(), y("li", {
                        key: 0,
                        class: ae(["lkt-table-item", Yt(A, w)]),
                        "data-i": w
                      }, [
                        U(t.$slots, "item", $e({
                          [t.slotItemVar || ""]: A,
                          index: w,
                          editing: u.value,
                          canCreate: he.value,
                          canRead: Ne.value,
                          canUpdate: H.value,
                          canDrop: Y.value,
                          isLoading: V.value,
                          doDrop: () => kt(w)
                        }))
                      ], 10, Yl)) : B("", !0)
                    ], 64))), 256))
                  ]),
                  _: 3
                }, 8, ["class"])) : t.type === C(at).Carousel ? (c(), y("div", {
                  key: 3,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + C(be),
                  class: ae(["lkt-table-items-container", t.itemsContainerClass])
                }, [
                  pe(C(Qa), ie({
                    modelValue: P.value,
                    "onUpdate:modelValue": p[2] || (p[2] = (A) => P.value = A)
                  }, t.carousel, {
                    "wrap-around": ((se = t.carousel) == null ? void 0 : se.infinite) === !0
                  }), {
                    addons: j(() => [
                      pe(C(el)),
                      pe(C(tl))
                    ]),
                    default: j(() => [
                      (c(!0), y(x, null, de(it.value, (A, w) => (c(), $(C(aa), {
                        key: A,
                        index: w
                      }, {
                        default: j(() => [
                          ee("div", Wl, [
                            U(t.$slots, A)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (c(!0), y(x, null, de(o.value, (A, w) => (c(), $(C(aa), {
                        key: t.slide,
                        index: w
                      }, {
                        default: j(() => [
                          ee("div", Jl, [
                            U(t.$slots, "item", $e({
                              [t.slotItemVar || ""]: A,
                              index: w,
                              editing: u.value,
                              canCreate: he.value,
                              canRead: Ne.value,
                              canUpdate: H.value,
                              canDrop: Y.value,
                              isLoading: V.value,
                              doDrop: () => kt(w)
                            }))
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128))
                    ]),
                    _: 3
                  }, 16, ["modelValue", "wrap-around"])
                ], 10, Kl)) : B("", !0)
              ], 512), [
                [_e, xe.value]
              ]),
              !V.value && o.value.length === 0 ? (c(), y("div", Ql, [
                C(l).empty ? U(t.$slots, "empty", { key: 0 }) : ka.value ? (c(), $(Ae(Sa.value), {
                  key: 1,
                  message: t.noResultsText
                }, null, 8, ["message"])) : t.noResultsText ? (c(), y(x, { key: 2 }, [
                  lt(Ge(t.noResultsText), 1)
                ], 64)) : B("", !0)
              ])) : B("", !0),
              V.value ? (c(), $(Z, { key: 3 })) : B("", !0),
              vt.value || C(l).bottomButtons ? (c(), y("div", Zl, [
                vt.value && o.value.length >= t.requiredItemsForBottomCreate ? (c(), $(Ft, {
                  key: 0,
                  config: me.value,
                  disabled: !Lt.value,
                  onClick: R,
                  onAppend: q
                }, null, 8, ["config", "disabled"])) : B("", !0),
                U(t.$slots, "bottom-buttons")
              ])) : B("", !0),
              t.paginator && Object.keys(t.paginator).length > 0 ? (c(), $(oe, ie({
                key: 5,
                ref_key: "paginatorRef",
                ref: le
              }, t.paginator, {
                modelValue: E.value,
                "onUpdate:modelValue": p[3] || (p[3] = (A) => E.value = A),
                onLoading: ge,
                onPerms: Ue,
                onResponse: It
              }), null, 16, ["modelValue"])) : B("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, Vl);
    };
  }
}), un = {
  install: (e) => {
    e.component("lkt-table") === void 0 && e.component("lkt-table", xl);
  }
}, sn = (e) => (W.navButtonSlot = e, !0), dn = (e) => (W.dropButtonSlot = e, !0), cn = (e) => (W.createButtonSlot = e, !0), vn = (e) => {
  W.defaultEmptySlot = e;
}, fn = (e) => {
  W.defaultSaveIcon = e;
};
export {
  gn as Column,
  bn as createColumn,
  un as default,
  cn as setTableCreateButtonSlot,
  dn as setTableDropButtonSlot,
  vn as setTableEmptySlot,
  sn as setTableNavButtonSlot,
  fn as setTableSaveIcon
};
