import { defineComponent as pe, computed as u, ref as E, shallowReactive as Ht, watch as U, watchEffect as Pt, onMounted as Yt, onBeforeUnmount as Da, reactive as Ut, provide as la, h as K, useId as Ia, inject as St, getCurrentInstance as Ba, onUnmounted as Ta, onUpdated as Ea, cloneVNode as Aa, resolveComponent as Ce, createBlock as M, createElementBlock as w, unref as h, openBlock as f, mergeProps as X, withCtx as F, createTextVNode as Ke, toDisplayString as We, normalizeProps as he, Fragment as G, useSlots as oa, normalizeClass as J, createCommentVNode as R, createElementVNode as ce, createVNode as ke, resolveDynamicComponent as ve, guardReactiveProps as Va, renderSlot as $, renderList as be, mergeDefaults as Ra, nextTick as Vt, withDirectives as ze, vShow as He, createSlots as La } from "vue";
import { __ as Na } from "lkt-i18n";
import { ColumnType as Ae, FieldType as Xe, MultipleOptionsDisplay as Ma, SortDirection as Je, Column as ia, extractPropValue as Oa, TableRowType as Se, extractI18nValue as ra, LktSettings as Ee, ensureButtonConfig as qe, TablePermission as Be, PaginatorType as Rt, TableType as Ge, getDefaultValues as $a, Table as Fa, ButtonType as _t } from "lkt-vue-kernel";
import { Column as il, createColumn as rl } from "lkt-vue-kernel";
import { generateRandomString as Pa, replaceAll as Ua } from "lkt-string-tools";
import { DataState as _a } from "lkt-data-state";
import ja from "sortablejs";
import { time as za } from "lkt-date-tools";
/**
 * Vue 3 Carousel 0.14.0
 * (c) 2025
 * @license MIT
 */
const ua = ["viewport", "carousel"], Nt = {
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
], Ha = {
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
  i18n: Ha,
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
}, Qe = Symbol("carousel"), qa = (t) => {
  const i = Ht([]), o = (l) => {
    l !== void 0 ? i.slice(l).forEach((n, a) => {
      var y;
      (y = n.exposed) === null || y === void 0 || y.setIndex(l + a);
    }) : i.forEach((n, a) => {
      var y;
      (y = n.exposed) === null || y === void 0 || y.setIndex(a);
    });
  };
  return {
    cleanup: () => {
      i.splice(0, i.length);
    },
    getSlides: () => i,
    registerSlide: (l, n) => {
      if (!l || l.props.isClone)
        return;
      const a = n ?? i.length;
      i.splice(a, 0, l), o(a), t("slide-registered", { slide: l, index: a });
    },
    unregisterSlide: (l) => {
      const n = i.indexOf(l);
      n !== -1 && (t("slide-unregistered", { slide: l, index: n }), i.splice(n, 1), o(n));
    }
  };
};
function Ga(t) {
  return t.length === 0 ? 0 : t.reduce((o, l) => o + l, 0) / t.length;
}
function Zt({ slides: t, position: i, toShow: o }) {
  const l = [], n = i === "before", a = n ? -o : 0, y = n ? 0 : o;
  if (t.length <= 0)
    return l;
  for (let k = a; k < y; k++) {
    const s = {
      index: n ? k : k + t.length,
      isClone: !0,
      position: i,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${i}-${k}`
    }, v = t[(k % t.length + t.length) % t.length].vnode, B = Aa(v, s);
    B.el = null, l.push(B);
  }
  return l;
}
const Xa = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function xt(t) {
  if (!t.el || !(t.el instanceof Element))
    return;
  const i = t.el.querySelectorAll(Xa);
  for (const o of i)
    o instanceof HTMLElement && !o.hasAttribute("disabled") && o.getAttribute("aria-hidden") !== "true" && o.setAttribute("tabindex", "-1");
}
function Ya(t, i) {
  return Object.keys(t).filter((o) => !i.includes(o)).reduce((o, l) => (o[l] = t[l], o), {});
}
function Ka(t) {
  const { isVertical: i, isReversed: o, dragged: l, effectiveSlideSize: n } = t, a = i ? l.y : l.x;
  if (a === 0)
    return 0;
  const y = Math.round(a / n);
  return o ? y : -y;
}
function Te({ val: t, max: i, min: o }) {
  return i < o ? t : Math.min(Math.max(t, isNaN(o) ? t : o), isNaN(i) ? t : i);
}
function Wa(t) {
  const { transform: i } = window.getComputedStyle(t);
  return i.split(/[(,)]/).slice(1, -1).map((o) => parseFloat(o));
}
function Ja(t) {
  let i = 1, o = 1;
  return t.forEach((l) => {
    const n = Wa(l);
    n.length === 6 && (i /= n[0], o /= n[3]);
  }), { widthMultiplier: i, heightMultiplier: o };
}
function Qa(t, i) {
  switch (t) {
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
function Za(t, i, o) {
  switch (t) {
    case "start":
      return 0;
    case "center":
    case "center-odd":
      return (o - i) / 2;
    case "center-even":
      return o / 2 - i;
    case "end":
      return o - i;
    default:
      return 0;
  }
}
function qt({ slideSize: t, viewportSize: i, align: o, itemsToShow: l }) {
  return l !== void 0 ? Qa(o, l) : t !== void 0 && i !== void 0 ? Za(o, t, i) : 0;
}
function va(t = "", i = {}) {
  return Object.entries(i).reduce((o, [l, n]) => o.replace(`{${l}}`, String(n)), t);
}
function fa({ val: t, max: i, min: o = 0 }) {
  const l = i - o + 1;
  return ((t - o) % l + l) % l + o;
}
function jt(t, i = 0) {
  let o = !1, l = 0, n = null;
  function a(...y) {
    if (o)
      return;
    o = !0;
    const k = () => {
      n = requestAnimationFrame((D) => {
        D - l > i ? (l = D, t(...y), o = !1) : k();
      });
    };
    k();
  }
  return a.cancel = () => {
    n && (cancelAnimationFrame(n), n = null, o = !1);
  }, a;
}
function Lt(t, i = "px") {
  if (!(t == null || t === ""))
    return typeof t == "number" || parseFloat(t).toString() === t ? `${t}${i}` : t;
}
const xa = pe({
  name: "CarouselAria",
  setup() {
    const t = St(Qe);
    return t ? () => K("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, va(t.config.i18n.itemXofY, {
      currentSlide: t.currentSlide + 1,
      slidesCount: t.slidesCount
    })) : () => "";
  }
}), en = {
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
    validator(t, i) {
      return t && i.wrapAround && console.warn('[vue3-carousel warn]: "preventExcessiveDragging" cannot be used with wrapAround. The setting will be ignored.'), !0;
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
    validator(t, i) {
      if (!sa.includes(t))
        return !1;
      const o = t in Nt ? Nt[t] : t;
      return ["ttb", "btt"].includes(o) && (!i.height || i.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${t}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: z.wrapAround,
    type: Boolean
  }
}, tn = pe({
  name: "VueCarousel",
  props: en,
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
  setup(t, { slots: i, emit: o, expose: l }) {
    var n;
    const a = qa(o), y = a.getSlides(), k = u(() => y.length), D = E(null), s = E(null), v = E(0), B = u(() => Object.assign(Object.assign(Object.assign({}, z), Ya(t, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, z.i18n), t.i18n) })), c = Ht(Object.assign({}, B.value)), g = E((n = t.modelValue) !== null && n !== void 0 ? n : 0), V = E(g.value);
    U(g, (r) => V.value = r);
    const A = E(0), Ze = u(() => Math.ceil((k.value - 1) / 2)), oe = u(() => k.value - 1), ie = u(() => 0);
    let Q = null, d = null, I = null;
    const re = u(() => v.value + c.gap), _ = u(() => {
      const r = c.dir || "ltr";
      return r in Nt ? Nt[r] : r;
    }), ae = u(() => ["rtl", "btt"].includes(_.value)), P = u(() => ["ttb", "btt"].includes(_.value)), ne = u(() => c.itemsToShow === "auto"), H = u(() => P.value ? "height" : "width");
    function Oe() {
      var r;
      if (!Le.value)
        return;
      const b = (B.value.breakpointMode === "carousel" ? (r = D.value) === null || r === void 0 ? void 0 : r.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, C = Object.keys(t.breakpoints || {}).map((N) => Number(N)).sort((N, W) => +W - +N), T = {};
      C.some((N) => b >= N ? (Object.assign(T, t.breakpoints[N]), T.i18n && Object.assign(T.i18n, B.value.i18n, t.breakpoints[N].i18n), !0) : !1), Object.assign(c, B.value, T);
    }
    const Ve = jt(() => {
      Oe(), me(), ue();
    }), xe = Ht(/* @__PURE__ */ new Set()), Z = E([]);
    function Mt({ widthMultiplier: r, heightMultiplier: b }) {
      Z.value = y.map((C) => {
        var T;
        const N = (T = C.exposed) === null || T === void 0 ? void 0 : T.getBoundingRect();
        return {
          width: N.width * r,
          height: N.height * b
        };
      });
    }
    const $e = E({
      width: 0,
      height: 0
    });
    function we({ widthMultiplier: r, heightMultiplier: b }) {
      var C;
      const T = ((C = s.value) === null || C === void 0 ? void 0 : C.getBoundingClientRect()) || { width: 0, height: 0 };
      $e.value = {
        width: T.width * r,
        height: T.height * b
      };
    }
    function ue() {
      if (!s.value)
        return;
      const r = Ja(xe);
      if (we(r), Mt(r), ne.value)
        v.value = Ga(Z.value.map((b) => b[H.value]));
      else {
        const b = Number(c.itemsToShow), C = (b - 1) * c.gap;
        v.value = ($e.value[H.value] - C) / b;
      }
    }
    function me() {
      !c.wrapAround && k.value > 0 && (g.value = Te({
        val: g.value,
        max: oe.value,
        min: ie.value
      })), ne.value || (c.itemsToShow = Te({
        val: Number(c.itemsToShow),
        max: k.value,
        min: 1
      }));
    }
    const it = u(() => typeof t.ignoreAnimations == "string" ? t.ignoreAnimations.split(",") : Array.isArray(t.ignoreAnimations) ? t.ignoreAnimations : t.ignoreAnimations ? !1 : []);
    Pt(() => me()), Pt(() => {
      ue();
    });
    let Re;
    const Ct = (r) => {
      const b = r.target;
      if (!(!(b != null && b.contains(D.value)) || Array.isArray(it.value) && it.value.includes(r.animationName)) && (xe.add(b), !Re)) {
        const C = () => {
          Re = requestAnimationFrame(() => {
            ue(), C();
          });
        };
        C();
      }
    }, wt = (r) => {
      const b = r.target;
      b && xe.delete(b), Re && xe.size === 0 && (cancelAnimationFrame(Re), ue());
    }, Le = E(!1);
    typeof document < "u" && Pt(() => {
      Le.value && it.value !== !1 ? (document.addEventListener("animationstart", Ct), document.addEventListener("animationend", wt)) : (document.removeEventListener("animationstart", Ct), document.removeEventListener("animationend", wt));
    }), Yt(() => {
      Le.value = !0, Oe(), Dt(), D.value && (I = new ResizeObserver(Ve), I.observe(D.value)), o("init");
    }), Da(() => {
      Le.value = !1, a.cleanup(), d && clearTimeout(d), Re && cancelAnimationFrame(Re), Q && clearInterval(Q), I && (I.disconnect(), I = null), typeof document < "u" && Ne(), D.value && (D.value.removeEventListener("transitionend", ue), D.value.removeEventListener("animationiteration", ue));
    });
    let De = !1;
    const ge = { x: 0, y: 0 }, se = Ut({ x: 0, y: 0 }), Fe = E(!1), rt = E(!1), Ot = () => {
      Fe.value = !0;
    }, ut = () => {
      Fe.value = !1;
    }, st = jt((r) => {
      if (!r.ctrlKey)
        switch (r.key) {
          case "ArrowLeft":
          case "ArrowUp":
            P.value === r.key.endsWith("Up") && (ae.value ? Ie(!0) : at(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            P.value === r.key.endsWith("Down") && (ae.value ? at(!0) : Ie(!0));
            break;
        }
    }, 200), ye = () => {
      document.addEventListener("keydown", st);
    }, Ne = () => {
      document.removeEventListener("keydown", st);
    };
    function x(r) {
      const b = r.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(b) || q.value || (De = r.type === "touchstart", !De && (r.preventDefault(), r.button !== 0)))
        return;
      ge.x = "touches" in r ? r.touches[0].clientX : r.clientX, ge.y = "touches" in r ? r.touches[0].clientY : r.clientY;
      const C = De ? "touchmove" : "mousemove", T = De ? "touchend" : "mouseup";
      document.addEventListener(C, dt, { passive: !1 }), document.addEventListener(T, et, { passive: !0 });
    }
    const dt = jt((r) => {
      rt.value = !0;
      const b = "touches" in r ? r.touches[0].clientX : r.clientX, C = "touches" in r ? r.touches[0].clientY : r.clientY;
      se.x = b - ge.x, se.y = C - ge.y;
      const T = Ka({
        isVertical: P.value,
        isReversed: ae.value,
        dragged: se,
        effectiveSlideSize: re.value
      });
      V.value = c.wrapAround ? g.value + T : Te({
        val: g.value + T,
        max: oe.value,
        min: ie.value
      }), o("drag", { deltaX: se.x, deltaY: se.y });
    });
    function et() {
      if (dt.cancel(), V.value !== g.value && !De) {
        const C = (T) => {
          T.preventDefault(), window.removeEventListener("click", C);
        };
        window.addEventListener("click", C);
      }
      Me(V.value), se.x = 0, se.y = 0, rt.value = !1;
      const r = De ? "touchmove" : "mousemove", b = De ? "touchend" : "mouseup";
      document.removeEventListener(r, dt), document.removeEventListener(b, et);
    }
    function Dt() {
      !c.autoplay || c.autoplay <= 0 || (Q = setInterval(() => {
        c.pauseAutoplayOnHover && Fe.value || Ie();
      }, c.autoplay));
    }
    function ct() {
      Q && (clearInterval(Q), Q = null);
    }
    function tt() {
      ct(), Dt();
    }
    const q = E(!1);
    function Me(r, b = !1) {
      if (!b && q.value)
        return;
      let C = r, T = r;
      A.value = g.value, c.wrapAround ? T = fa({
        val: C,
        max: oe.value,
        min: ie.value
      }) : C = Te({
        val: C,
        max: oe.value,
        min: ie.value
      }), o("slide-start", {
        slidingToIndex: r,
        currentSlideIndex: g.value,
        prevSlideIndex: A.value,
        slidesCount: k.value
      }), ct(), q.value = !0, g.value = C, T !== C && vt.pause(), o("update:modelValue", T), d = setTimeout(() => {
        c.wrapAround && T !== C && (vt.resume(), g.value = T, o("loop", {
          currentSlideIndex: g.value,
          slidingToIndex: r
        })), o("slide-end", {
          currentSlideIndex: g.value,
          prevSlideIndex: A.value,
          slidesCount: k.value
        }), q.value = !1, tt();
      }, c.transition);
    }
    function Ie(r = !1) {
      Me(g.value + c.itemsToScroll, r);
    }
    function at(r = !1) {
      Me(g.value - c.itemsToScroll, r);
    }
    function Pe() {
      Oe(), me(), ue(), tt();
    }
    U(() => [B.value, t.breakpoints], () => Oe(), { deep: !0 }), U(() => t.autoplay, () => tt());
    const vt = U(() => t.modelValue, (r) => {
      r !== g.value && Me(Number(r), !0);
    });
    o("before-init");
    const Ue = u(() => {
      if (!c.wrapAround)
        return { before: 0, after: 0 };
      if (ne.value)
        return { before: y.length, after: y.length };
      const r = Number(c.itemsToShow), b = Math.ceil(r + (c.itemsToScroll - 1)), C = b - V.value, T = b - (k.value - (V.value + 1));
      return {
        before: Math.max(0, C),
        after: Math.max(0, T)
      };
    }), le = u(() => Ue.value.before ? ne.value ? Z.value.slice(-1 * Ue.value.before).reduce((r, b) => r + b[H.value] + c.gap, 0) * -1 : Ue.value.before * re.value * -1 : 0), ft = u(() => {
      var r;
      if (ne.value) {
        const b = (g.value % y.length + y.length) % y.length;
        return qt({
          slideSize: (r = Z.value[b]) === null || r === void 0 ? void 0 : r[H.value],
          viewportSize: $e.value[H.value],
          align: c.snapAlign
        });
      }
      return qt({
        align: c.snapAlign,
        itemsToShow: +c.itemsToShow
      });
    }), nt = u(() => {
      let r = 0;
      if (ne.value) {
        if (g.value < 0 ? r = Z.value.slice(g.value).reduce((b, C) => b + C[H.value] + c.gap, 0) * -1 : r = Z.value.slice(0, g.value).reduce((b, C) => b + C[H.value] + c.gap, 0), r -= ft.value, !c.wrapAround) {
          const b = Z.value.reduce((C, T) => C + T[H.value] + c.gap, 0) - $e.value[H.value] - c.gap;
          r = Te({
            val: r,
            max: b,
            min: 0
          });
        }
      } else {
        let b = g.value - ft.value;
        c.wrapAround || (b = Te({
          val: b,
          max: k.value - +c.itemsToShow,
          min: 0
        })), r = b * re.value;
      }
      return r * (ae.value ? 1 : -1);
    }), It = u(() => {
      var r, b;
      if (!ne.value) {
        const N = g.value - ft.value;
        return c.wrapAround ? {
          min: Math.floor(N),
          max: Math.ceil(N + Number(c.itemsToShow) - 1)
        } : {
          min: Math.floor(Te({
            val: N,
            max: k.value - Number(c.itemsToShow),
            min: 0
          })),
          max: Math.ceil(Te({
            val: N + Number(c.itemsToShow) - 1,
            max: k.value - 1,
            min: 0
          }))
        };
      }
      let C = 0;
      {
        let N = 0, W = 0 - Ue.value.before;
        const Y = Math.abs(nt.value + le.value);
        for (; N <= Y; ) {
          const ee = (W % y.length + y.length) % y.length;
          N += ((r = Z.value[ee]) === null || r === void 0 ? void 0 : r[H.value]) + c.gap, W++;
        }
        C = W - 1;
      }
      let T = 0;
      {
        let N = C, W = 0;
        for (N < 0 ? W = Z.value.slice(0, N).reduce((Y, ee) => Y + ee[H.value] + c.gap, 0) - Math.abs(nt.value + le.value) : W = Z.value.slice(0, N).reduce((Y, ee) => Y + ee[H.value] + c.gap, 0) - Math.abs(nt.value); W < $e.value[H.value]; ) {
          const Y = (N % y.length + y.length) % y.length;
          W += ((b = Z.value[Y]) === null || b === void 0 ? void 0 : b[H.value]) + c.gap, N++;
        }
        T = N - 1;
      }
      return {
        min: Math.floor(C),
        max: Math.ceil(T)
      };
    }), $t = u(() => {
      if (c.slideEffect === "fade")
        return;
      const r = P.value ? "Y" : "X", b = P.value ? se.y : se.x;
      let C = nt.value + b;
      if (!c.wrapAround && c.preventExcessiveDragging) {
        let T = 0;
        ne.value ? T = Z.value.reduce((Y, ee) => Y + ee[H.value], 0) : T = (k.value - Number(c.itemsToShow)) * re.value;
        const N = ae.value ? 0 : -1 * T, W = ae.value ? T : 0;
        C = Te({
          val: C,
          min: N,
          max: W
        });
      }
      return `translate${r}(${C}px)`;
    }), Ft = u(() => ({
      "--vc-transition-duration": q.value ? Lt(c.transition, "ms") : void 0,
      "--vc-slide-gap": Lt(c.gap),
      "--vc-carousel-height": Lt(c.height),
      "--vc-cloned-offset": Lt(le.value)
    })), Bt = { slideTo: Me, next: Ie, prev: at }, pt = Ut({
      activeSlide: V,
      config: c,
      currentSlide: g,
      isSliding: q,
      isVertical: P,
      maxSlide: oe,
      minSlide: ie,
      nav: Bt,
      normalizedDir: _,
      slideRegistry: a,
      slideSize: v,
      slides: y,
      slidesCount: k,
      viewport: s,
      visibleRange: It
    });
    la(Qe, pt);
    const _e = Ut({
      config: c,
      currentSlide: g,
      maxSlide: oe,
      middleSlide: Ze,
      minSlide: ie,
      slideSize: v,
      slidesCount: k
    });
    return l({
      data: _e,
      nav: Bt,
      next: Ie,
      prev: at,
      restartCarousel: Pe,
      slideTo: Me,
      updateBreakpointsConfig: Oe,
      updateSlideSize: ue,
      updateSlidesData: me
    }), () => {
      var r;
      const b = i.default || i.slides, C = (b == null ? void 0 : b(_e)) || [], { before: T, after: N } = Ue.value, W = Zt({
        slides: y,
        position: "before",
        toShow: T
      }), Y = Zt({
        slides: y,
        position: "after",
        toShow: N
      }), ee = [...W, ...C, ...Y];
      if (!c.enabled || !ee.length)
        return K("section", {
          ref: D,
          class: ["carousel", "is-disabled"]
        }, ee);
      const mt = ((r = i.addons) === null || r === void 0 ? void 0 : r.call(i, _e)) || [], lt = K("ol", {
        class: "carousel__track",
        style: { transform: $t.value },
        onMousedownCapture: c.mouseDrag ? x : null,
        onTouchstartPassiveCapture: c.touchDrag ? x : null
      }, ee), gt = K("div", { class: "carousel__viewport", ref: s }, lt);
      return K("section", {
        ref: D,
        class: [
          "carousel",
          `is-${_.value}`,
          `is-effect-${c.slideEffect}`,
          {
            "is-vertical": P.value,
            "is-sliding": q.value,
            "is-dragging": rt.value,
            "is-hover": Fe.value
          }
        ],
        dir: _.value,
        style: Ft.value,
        "aria-label": c.i18n.ariaGallery,
        tabindex: "0",
        onFocus: ye,
        onBlur: Ne,
        onMouseenter: Ot,
        onMouseleave: ut
      }, [gt, mt, K(xa)]);
    };
  }
});
var Gt;
(function(t) {
  t.arrowDown = "arrowDown", t.arrowLeft = "arrowLeft", t.arrowRight = "arrowRight", t.arrowUp = "arrowUp";
})(Gt || (Gt = {}));
const ea = (t) => `icon${t.charAt(0).toUpperCase() + t.slice(1)}`, an = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function nn(t) {
  return t in Gt;
}
const ta = (t) => t && nn(t), aa = pe({
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
    const i = St(Qe, null);
    return () => {
      const o = t.name;
      if (!o || !ta(o))
        return;
      const l = an[o], n = K("path", { d: l }), a = (i == null ? void 0 : i.config.i18n[ea(o)]) || t.title, y = K("title", a);
      return K("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": a
      }, [y, n]);
    };
  }
}), ln = pe({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(t, { slots: i, attrs: o }) {
    const l = St(Qe);
    if (!l)
      return () => "";
    const { next: n, prev: a } = i, y = () => ({
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
      const { i18n: v } = l.config, B = K("button", Object.assign(Object.assign({ type: "button", disabled: D.value, "aria-label": v.ariaPreviousSlide, title: v.ariaPreviousSlide, onClick: l.nav.prev }, o), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": D.value },
        o.class
      ] }), (a == null ? void 0 : a()) || K(aa, { name: y() })), c = K("button", Object.assign(Object.assign({ type: "button", disabled: s.value, "aria-label": v.ariaNextSlide, title: v.ariaNextSlide, onClick: l.nav.next }, o), { class: [
        "carousel__next",
        { "carousel__next--disabled": s.value },
        o.class
      ] }), (n == null ? void 0 : n()) || K(aa, { name: k() }));
      return [B, c];
    };
  }
}), on = pe({
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
    const i = St(Qe);
    if (!i)
      return () => "";
    const o = u(() => i.config.itemsToShow), l = u(() => qt({
      align: i.config.snapAlign,
      itemsToShow: o.value
    })), n = u(() => t.paginateByItemsToShow && o.value > 1), a = u(() => Math.ceil((i.activeSlide - l.value) / o.value)), y = u(() => Math.ceil(i.slidesCount / o.value)), k = (D) => fa(n.value ? {
      val: a.value,
      max: y.value - 1,
      min: 0
    } : {
      val: i.activeSlide,
      max: i.maxSlide,
      min: i.minSlide
    }) === D;
    return () => {
      var D, s;
      const v = [];
      for (let B = n.value ? 0 : i.minSlide; B <= (n.value ? y.value - 1 : i.maxSlide); B++) {
        const c = va(i.config.i18n[n.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: B + 1
        }), g = k(B), V = K("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": g
          },
          "aria-label": c,
          "aria-pressed": g,
          "aria-controls": (s = (D = i.slides[B]) === null || D === void 0 ? void 0 : D.exposed) === null || s === void 0 ? void 0 : s.id,
          title: c,
          disabled: t.disableOnClick,
          onClick: () => i.nav.slideTo(n.value ? Math.floor(B * +i.config.itemsToShow + l.value) : B)
        }), A = K("li", { class: "carousel__pagination-item", key: B }, V);
        v.push(A);
      }
      return K("ol", { class: "carousel__pagination" }, v);
    };
  }
}), na = pe({
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
  setup(t, { attrs: i, slots: o, expose: l }) {
    const n = St(Qe);
    if (la(Qe, void 0), !n)
      return () => "";
    const a = E(t.index), y = (V) => {
      a.value = V;
    }, k = Ba(), D = () => {
      const V = k.vnode.el;
      return V ? V.getBoundingClientRect() : { width: 0, height: 0 };
    };
    l({
      id: t.id,
      setIndex: y,
      getBoundingRect: D
    });
    const s = u(() => a.value === n.activeSlide), v = u(() => a.value === n.activeSlide - 1), B = u(() => a.value === n.activeSlide + 1), c = u(() => a.value >= n.visibleRange.min && a.value <= n.visibleRange.max), g = u(() => {
      if (n.config.itemsToShow === "auto")
        return;
      const V = n.config.itemsToShow, A = n.config.gap > 0 && V > 1 ? `calc(${100 / V}% - ${n.config.gap * (V - 1) / V}px)` : `${100 / V}%`;
      return n.isVertical ? { height: A } : { width: A };
    });
    return n.slideRegistry.registerSlide(k, t.index), Ta(() => {
      n.slideRegistry.unregisterSlide(k);
    }), t.isClone && (Yt(() => {
      xt(k.vnode);
    }), Ea(() => {
      xt(k.vnode);
    })), () => {
      var V, A;
      return n.config.enabled ? K("li", {
        style: [i.style, Object.assign({}, g.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": t.isClone,
          "carousel__slide--visible": c.value,
          "carousel__slide--active": s.value,
          "carousel__slide--prev": v.value,
          "carousel__slide--next": B.value,
          "carousel__slide--sliding": n.isSliding
        },
        onFocusin: () => {
          n.viewport && (n.viewport.scrollLeft = 0), n.nav.slideTo(a.value);
        },
        id: t.isClone ? void 0 : t.id,
        "aria-hidden": t.isClone || void 0
      }, (A = o.default) === null || A === void 0 ? void 0 : A.call(o, {
        currentIndex: a.value,
        isActive: s.value,
        isClone: t.isClone,
        isPrev: v.value,
        isNext: B.value,
        isSliding: n.isSliding,
        isVisible: c.value
      })) : (V = o.default) === null || V === void 0 ? void 0 : V.call(o);
    };
  }
}), rn = (t, i, o, l) => {
  var y, k, D, s, v;
  if (!o) return 0;
  let n, a;
  if (o.type === Ae.Field ? [Xe.Number, Xe.Range].includes((y = o.field) == null ? void 0 : y.type) ? (n = parseFloat(t[o.key]), a = parseFloat(i[o.key])) : [Xe.Date, Xe.Date].includes((k = o.field) == null ? void 0 : k.type) ? (n = t[o.key], a = i[o.key]) : ((D = o.field) == null ? void 0 : D.type) === Xe.Select && ((s = o.field) != null && s.multiple) && ((v = o.field) == null ? void 0 : v.multipleDisplay) === Ma.Count ? (n = t[o.key].length, a = i[o.key].length) : (n = String(t[o.key]).toLowerCase(), a = String(i[o.key]).toLowerCase()) : (n = String(t[o.key]).toLowerCase(), a = String(i[o.key]).toLowerCase()), l === Je.Asc) {
    if (n > a) return 1;
    if (a > n) return -1;
  } else {
    if (n > a) return -1;
    if (a > n) return 1;
  }
  return 0;
}, Ye = (t, i, o, l = []) => {
  if (t.extractTitleFromColumn) {
    let a = l.find((y) => y.key === t.extractTitleFromColumn);
    if (a)
      return Ye(a, i, o, l);
  }
  let n = t.type === Ae.ColumnIndex ? o : i[t.key];
  if (t.formatter && typeof t.formatter == "function") {
    let a = t.formatter(n, i, t, o);
    return typeof a == "string" && a.startsWith("__:") ? Na(a.substring(3)) : a;
  }
  return n;
}, un = (t, i, o) => {
  if (!t.colspan) return -1;
  let l = i;
  return o.forEach((n) => {
    let a = Kt(t, n);
    a > 0 && a < l && (l = a);
  }), l;
}, Kt = (t, i) => t.colspan === !1 ? !1 : typeof t.colspan == "function" ? t.colspan(i) : t.colspan, pa = (t, i) => typeof t.preferSlot > "u" ? !0 : t.preferSlot === !1 ? !1 : typeof t.preferSlot == "function" ? t.preferSlot(i) : !0, sn = (t, i, o) => {
  if (typeof t != "object" || !t.key && [Ae.Field].includes(t.type) || i.indexOf(t.key) > -1) return !1;
  let l = Kt(t, o);
  return typeof t.colspan > "u" ? !0 : (typeof t.colspan < "u" && (typeof t.colspan == "function" ? l = parseInt(t.colspan(o)) : l = parseInt(t.colspan)), l > 0);
}, dn = (t = []) => {
  if (t.length > 0) {
    for (let i = 0; i < t.length; ++i)
      if (t[i].sortable) return t[i].key;
  }
  return "";
}, cn = (t, i) => {
  if (t.length > 0) {
    for (let o = 0; o < t.length; ++o)
      if (t[o].key === i) return t[o];
  }
  return null;
}, ma = (t) => {
  let i = [];
  return t.class && i.push(t.class), t.type && i.push(`is-${t.type}`), i.join(" ");
}, Xt = /* @__PURE__ */ pe({
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
  setup(t, { emit: i }) {
    const o = i, l = t, n = E(l.modelValue);
    U(() => l.modelValue, (v) => {
      n.value = v;
    }), U(n, (v) => {
      o("update:modelValue", v);
    });
    const a = () => {
      o("inline-drop");
    }, y = u(() => ({ ...l.column.slotData, item: n.value })), k = u(() => {
      var v, B, c, g;
      if ((v = l.column.field) != null && v.modalData && typeof ((B = l.column.field) == null ? void 0 : B.modalData) == "object")
        for (let V in l.column.field.modalData)
          if (typeof ((c = l.column.field) == null ? void 0 : c.modalData[V]) == "string" && l.column.field.modalData[V].startsWith("prop:")) {
            let A = l.column.field.modalData[V].substring(5);
            n.value[A];
          } else
            l.column.field.modalData[V];
      return (g = l.column.field) == null ? void 0 : g.modalData;
    }), D = u(() => typeof l.column.field == "string" && l.column.field.startsWith("prop:") ? Oa(l.column.field, n.value) : l.column.field), s = u(() => {
      var v, B, c, g;
      return l.column.type === Ae.Field ? !((B = (v = l.column) == null ? void 0 : v.field) != null && B.label) && (l.column.ensureFieldLabel || [
        Xe.Switch,
        Xe.Check
      ].includes((c = l.column.field) == null ? void 0 : c.type)) ? l.column.label : (g = l.column.field) == null ? void 0 : g.label : "";
    });
    return (v, B) => {
      const c = Ce("lkt-anchor"), g = Ce("lkt-button"), V = Ce("lkt-field");
      return v.column.type === h(Ae).Anchor ? (f(), M(c, X({ key: 0 }, v.column.anchor, { prop: n.value }), {
        default: F(() => [
          Ke(We(h(Ye)(v.column, n.value, v.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : v.column.type === h(Ae).Button ? (f(), M(g, X({ key: 1 }, v.column.button, { prop: n.value }), {
        default: F(() => [
          Ke(We(h(Ye)(v.column, n.value, v.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : v.column.type === h(Ae).Field ? (f(), M(V, X({
        key: 2,
        modelValue: n.value[v.column.key],
        "onUpdate:modelValue": B[0] || (B[0] = (A) => n.value[v.column.key] = A)
      }, {
        ...D.value,
        readMode: !v.hasInlineEditPerm || D.value.readMode,
        slotData: y.value,
        label: s.value,
        modalData: k.value,
        prop: n.value
      }), null, 16, ["modelValue"])) : v.column.type === h(Ae).InlineDrop ? (f(), M(g, X({ key: 3 }, v.column.button, {
        prop: n.value,
        onClick: a
      }), {
        default: F(() => [
          Ke(We(h(Ye)(v.column, n.value, v.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : v.column.type === h(Ae).ColumnIndex && v.column.field ? (f(), M(V, he(X({ key: 4 }, {
        ...D.value,
        modelValue: h(Ye)(v.column, n.value, v.i, v.columns),
        readMode: !0,
        slotData: y.value,
        label: s.value,
        modalData: k.value,
        prop: n.value
      })), null, 16)) : (f(), w(G, { key: 5 }, [
        Ke(We(h(Ye)(v.column, n.value, v.i, v.columns)), 1)
      ], 64));
    };
  }
}), kt = class kt {
};
kt.navButtonSlot = "", kt.createButtonSlot = "", kt.defaultEmptySlot = void 0;
let fe = kt;
const vn = ["data-i", "data-draggable"], fn = ["data-role", "data-i"], pn = {
  key: 1,
  class: "lkt-table-nav-cell"
}, mn = { class: "lkt-table-nav-container" }, gn = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, yn = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, bn = ["colspan"], hn = ["colspan"], kn = ["colspan"], Sn = ["data-column", "colspan", "title"], Cn = /* @__PURE__ */ pe({
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
    itemContainerClass: { type: [String, Function], default: "" },
    itemSlotComponent: {},
    itemSlotData: {},
    itemSlotEvents: {},
    permissions: { default: () => [] }
  },
  emits: [
    "update:modelValue",
    "click",
    "item-up",
    "item-down",
    "item-drop"
  ],
  setup(t, { emit: i }) {
    const o = oa(), l = i, n = t, a = E(n.modelValue);
    let y = typeof n.rowDisplayType == "function" ? n.rowDisplayType(a.value, n.i) : n.rowDisplayType;
    y || (y = Se.Auto);
    const k = [Se.Auto, Se.PreferCustomItem].includes(y), D = [Se.Auto, Se.PreferItem].includes(y), s = (d) => l("click", d), v = u(() => {
      let d = [], I = typeof n.disabledDrag == "function" ? n.disabledDrag(a.value) : oe.value === !0;
      return !I && n.sortable && n.isDraggable ? d.push("handle") : I && d.push("disabled"), d.join(" ");
    }), B = u(() => fe.navButtonSlot !== ""), c = u(() => fe.navButtonSlot), g = () => {
      l("item-up", n.i);
    }, V = () => {
      l("item-down", n.i);
    }, A = () => {
      l("item-drop", n.i);
    };
    U(() => n.modelValue, (d) => a.value = d), U(a, (d) => {
      l("update:modelValue", d);
    }, { deep: !0 });
    const Ze = u(() => typeof n.renderDrag == "function" ? n.renderDrag(a.value) : n.renderDrag === !0), oe = u(() => typeof n.disabledDrag == "function" ? n.disabledDrag(a.value) : n.disabledDrag === !0), ie = u(() => v.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), Q = u(() => {
      let d = [];
      return k && d.push("type-custom-item"), D && d.push("type-item"), typeof n.itemContainerClass == "function" ? d.push(n.itemContainerClass(a.value, n.i)) : n.itemContainerClass !== "" && d.push(n.itemContainerClass), d.join(" ");
    });
    return (d, I) => {
      const re = Ce("lkt-button");
      return f(), w("tr", {
        "data-i": d.i,
        "data-draggable": d.isDraggable,
        class: J(Q.value)
      }, [
        d.sortable && d.editModeEnabled && Ze.value ? (f(), w("td", {
          key: 0,
          "data-role": ie.value,
          class: J(v.value),
          "data-i": d.i
        }, I[2] || (I[2] = [
          ce("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]), 10, fn)) : R("", !0),
        d.addNavigation && d.editModeEnabled ? (f(), w("td", pn, [
          ce("div", mn, [
            ke(re, {
              palette: "table-nav",
              disabled: d.i === 0,
              onClick: g
            }, {
              default: F(() => [
                B.value ? (f(), M(ve(c.value), {
                  key: 0,
                  direction: "up"
                })) : (f(), w("i", gn))
              ]),
              _: 1
            }, 8, ["disabled"]),
            ke(re, {
              palette: "table-nav",
              disabled: d.latestRow,
              onClick: V
            }, {
              default: F(() => [
                B.value ? (f(), M(ve(c.value), {
                  key: 0,
                  direction: "down"
                })) : (f(), w("i", yn))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : R("", !0),
        d.itemSlotComponent ? (f(), w("td", {
          key: "td" + d.i,
          colspan: d.visibleColumns.length
        }, [
          (f(), M(ve(d.itemSlotComponent), he(Va({
            item: a.value,
            index: d.i,
            editing: d.editModeEnabled,
            perms: d.permissions,
            data: d.itemSlotData,
            events: d.itemSlotEvents
          })), null, 16))
        ], 8, bn)) : h(k) && h(o)[`item-${d.i}`] ? (f(), w("td", {
          key: "td" + d.i,
          colspan: d.visibleColumns.length
        }, [
          $(d.$slots, `item-${d.i}`, {
            item: a.value,
            index: d.i,
            editing: d.editModeEnabled,
            canCreate: d.canCreate,
            canRead: d.canRead,
            canUpdate: d.canEdit,
            canDrop: d.canDrop,
            isLoading: d.isLoading,
            doDrop: () => A()
          })
        ], 8, hn)) : h(D) && h(o).item ? (f(), w("td", {
          key: "td" + d.i,
          colspan: d.visibleColumns.length
        }, [
          $(d.$slots, "item", {
            item: a.value,
            index: d.i,
            editing: d.editModeEnabled,
            canCreate: d.canCreate,
            canRead: d.canRead,
            canUpdate: d.canEdit,
            canDrop: d.canDrop,
            isLoading: d.isLoading,
            doDrop: () => A()
          })
        ], 8, kn)) : (f(!0), w(G, { key: 5 }, be(d.visibleColumns, (_) => (f(), w(G, null, [
          h(sn)(_, d.emptyColumns, a.value) ? (f(), w("td", {
            key: "td" + d.i,
            "data-column": _.key,
            colspan: h(Kt)(_, a.value),
            title: h(Ye)(_, a.value, d.i, d.visibleColumns),
            class: J(h(ma)(_)),
            onClick: I[1] || (I[1] = (ae) => s(ae))
          }, [
            d.$slots[_.key] && h(pa)(_, a.value) ? $(d.$slots, _.key, {
              key: 0,
              value: a.value[_.key],
              item: a.value,
              column: _,
              i: d.i
            }) : a.value ? (f(), M(Xt, {
              key: 1,
              modelValue: a.value,
              "onUpdate:modelValue": I[0] || (I[0] = (ae) => a.value = ae),
              column: _,
              columns: d.visibleColumns,
              "edit-mode-enabled": d.editModeEnabled,
              "has-inline-edit-perm": d.hasInlineEditPerm,
              i: d.i,
              onInlineDrop: A
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : R("", !0)
          ], 10, Sn)) : R("", !0)
        ], 64))), 256))
      ], 10, vn);
    };
  }
}), zt = /* @__PURE__ */ pe({
  __name: "CreateButton",
  props: {
    config: { default: void 0 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: [
    "click",
    "append"
  ],
  setup(t, { emit: i }) {
    var s;
    const o = i, l = t, n = u(() => fe.createButtonSlot !== ""), a = u(() => fe.createButtonSlot), y = {
      ...(s = l.config) == null ? void 0 : s.modalData,
      beforeClose: (v) => {
        "itemCreated" in v && v.itemCreated === !0 && o("append", v.item);
      }
    }, k = {
      ...l.config
    };
    k.modalData = y;
    const D = () => {
      var v;
      if (!((v = l.config) != null && v.modal)) {
        o("click");
        return;
      }
    };
    return (v, B) => {
      const c = Ce("lkt-button");
      return f(), M(c, X(k, {
        disabled: v.disabled,
        onClick: D
      }), {
        default: F(() => [
          n.value ? (f(), M(ve(a.value), { key: 0 })) : R("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), wn = ["data-column", "data-sortable", "data-sort", "colspan", "title"], Dn = /* @__PURE__ */ pe({
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
  setup(t, { emit: i }) {
    const o = i, l = t, n = u(() => un(l.column, l.amountOfColumns, l.items)), a = u(() => l.column.sortable === !0), y = u(() => a.value && l.sortBy === l.column.key ? l.sortDirection : ""), k = u(() => ra(l.column.label)), D = u(() => a.value && l.sortBy === l.column.key ? l.sortDirection === Je.Asc ? Ee.defaultTableSortAscIcon : l.sortDirection === Je.Desc ? Ee.defaultTableSortDescIcon : "" : ""), s = () => o("click", l.column);
    return (v, B) => (f(), w("th", {
      "data-column": v.column.key,
      "data-sortable": a.value,
      "data-sort": y.value,
      colspan: n.value,
      title: k.value,
      class: J(h(ma)(v.column)),
      onClick: s
    }, [
      ce("div", null, [
        Ke(We(k.value) + " ", 1),
        D.value ? (f(), w("i", {
          key: 0,
          class: J(D.value)
        }, null, 2)) : R("", !0)
      ])
    ], 10, wn));
  }
}), In = ["id"], Bn = { class: "lkt-table-page-buttons" }, Tn = { class: "switch-edition-mode" }, En = { class: "switch-edition-mode" }, An = {
  key: 0,
  class: "lkt-table-page-buttons"
}, Vn = {
  key: 1,
  class: "lkt-table-page-filters"
}, Rn = { class: "lkt-table" }, Ln = { key: 0 }, Nn = { key: 0 }, Mn = {
  key: 0,
  "data-role": "drag-indicator"
}, On = { key: 1 }, $n = ["id"], Fn = ["id"], Pn = ["data-i"], Un = ["id"], _n = ["data-i"], jn = ["id"], zn = { class: "lkt-carousel-slide" }, Hn = { class: "lkt-carousel-slide" }, qn = {
  key: 2,
  class: "lkt-table-empty"
}, Gn = {
  key: 4,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, Xn = /* @__PURE__ */ pe({
  __name: "LktTable",
  props: /* @__PURE__ */ Ra({
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
  }, $a(Fa)),
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
  setup(t, { expose: i, emit: o }) {
    var Wt, Jt;
    const l = o, n = oa(), a = t, y = E(typeof a.sorter == "function" ? a.sorter : rn), k = E(dn(a.columns)), D = E(Je.Asc), s = E(a.modelValue), v = E(null), B = E(a.columns), c = E((Wt = a.paginator) == null ? void 0 : Wt.modelValue), g = E(a.loading), V = E(!1), A = E(a.perms), Ze = E(null), oe = E(null), ie = E(null), Q = E({}), d = E(new _a({ items: s.value }, a.dataStateConfig)), I = E(a.editMode), re = E(0), _ = E(null), ae = E(((Jt = a.carousel) == null ? void 0 : Jt.currentSlide) || 0), P = E(qe(a.saveButton, Ee.defaultSaveButton)), ne = E(qe(a.createButton, Ee.defaultCreateButton)), H = E(qe(a.editModeButton, Ee.defaultEditModeButton)), Oe = E(qe(a.groupButton, Ee.defaultGroupButton));
    U(() => a.saveButton, (e) => P.value = qe(a.saveButton, Ee.defaultSaveButton)), U(() => a.createButton, (e) => ne.value = qe(a.createButton, Ee.defaultCreateButton)), U(() => a.editModeButton, (e) => H.value = qe(a.editModeButton, Ee.defaultEditModeButton));
    const Ve = E(!1);
    U(g, (e) => l("update:loading", e)), U(c, (e) => l("page", e));
    const xe = (e) => {
      A.value = e;
    }, Z = (e) => {
      var m;
      if (Array.isArray(e.data)) {
        let O = e.data;
        typeof ((m = a.events) == null ? void 0 : m.parseResults) == "function" && (O = a.events.parseResults(O)), s.value = [...s.value, ...O];
      }
      g.value = !1, V.value = !0, d.value.store({ items: s.value }).turnStoredIntoOriginal(), Ve.value = !1, Vt(() => {
        ge.value, l("read-response", e);
      });
    }, Mt = () => Vt(() => {
      var e;
      (!a.paginator || ![Rt.LoadMore, Rt.Infinite].includes((e = a.paginator) == null ? void 0 : e.type)) && s.value.splice(0, s.value.length), g.value = !0;
    }), $e = () => {
      Ze.value.doRefresh();
    }, we = Pa(12), ue = u(() => {
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
    }), me = u(() => B.value.filter((e) => !e.hidden)), it = u(() => B.value.filter((e) => e.isForRowKey)), Re = u(() => B.value.map((e) => e.key)), Ct = u(() => {
      let e = [];
      for (let m in n) Re.value.indexOf(m) !== -1 && e.push(m);
      return e;
    }), wt = u(() => {
      let e = [];
      for (let m in n) m.indexOf("slide-") !== -1 && e.push(m);
      return e;
    }), Le = u(() => {
      var e;
      return a.hiddenSave || g.value || !((e = P.value) != null && e.resource || P.value.type) ? !1 : I.value && Ve.value ? !0 : I.value;
    }), De = u(() => yt.value && s.value.length >= a.requiredItemsForTopCreate || Ie.value ? !0 : Le.value || I.value && ye.value), ge = u(() => {
      var e, m;
      return re.value, typeof ((e = P.value) == null ? void 0 : e.disabled) == "function" ? P.value.disabled({
        value: s.value,
        dataState: d.value
      }) : typeof ((m = P.value) == null ? void 0 : m.disabled) == "boolean" ? P.value.disabled : !Ve.value;
    }), se = u(() => s.value.length), Fe = u(() => {
      var e;
      return {
        items: s.value,
        ...(e = P.value) == null ? void 0 : e.resourceData
      };
    }), rt = u(() => a.titleTag === "" ? "h2" : a.titleTag), Ot = u(() => a.wrapContentTag === "" ? "div" : a.wrapContentTag), ut = u(() => ra(a.title)), st = u(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }), ye = u(() => A.value.includes(Be.Create)), Ne = u(() => A.value.includes("read")), x = u(() => A.value.includes(Be.Update)), dt = u(() => A.value.includes(Be.Edit)), et = u(() => A.value.includes(Be.InlineEdit)), Dt = u(() => A.value.includes(Be.ModalCreate)), ct = u(() => A.value.includes(Be.InlineCreate)), tt = u(() => A.value.includes(Be.InlineCreateEver)), q = u(() => A.value.includes(Be.Drop)), Me = u(() => A.value.includes(Be.SwitchEditMode)), Ie = u(() => !Me.value || !x.value && !q.value || !x.value && q.value ? !1 : !g.value), at = u(() => {
      var e;
      return (typeof ((e = a.paginator) == null ? void 0 : e.type) < "u" && [Rt.LoadMore, Rt.Infinite].includes(a.paginator.type) || !g.value) && s.value.length > 0;
    }), Pe = u(() => B.value.find((e) => e.isForAccordionHeader)), vt = (e, m) => typeof a.customItemSlotName == "function" ? a.customItemSlotName(e, m) : "", Ue = (e) => {
      let m = e.target;
      if (typeof m.dataset.column > "u")
        do
          m = m.parentNode;
        while (typeof m.dataset.column > "u" && m.tagName !== "TABLE" && m.tagName !== "body");
      if (m.tagName === "TD" && (m = m.parentNode, m = m.dataset.i, typeof m < "u"))
        return s.value[m];
    }, le = () => {
      re.value = za();
    }, ft = (e) => s.value[e], nt = (e) => {
      var m;
      return (m = v.value) == null ? void 0 : m.querySelector(`[data-i="${e}"]`);
    }, It = (e) => {
      e && e.sortable && (e.key === k.value && (D.value = D.value === Je.Asc ? Je.Desc : Je.Asc), k.value = e.key, s.value = s.value.sort((m, O) => y.value(m, O, e, D.value)), le(), l("sort", {
        sortBy: k.value,
        sortDirection: D.value
      }));
    }, $t = (e) => {
      l("click", e);
    }, Ft = (e) => {
      var O, j, te, de, At, ht, S, p;
      let m = parseInt((de = (te = (j = (O = e == null ? void 0 : e.originalEvent) == null ? void 0 : O.toElement) == null ? void 0 : j.closest("tr")) == null ? void 0 : te.dataset) == null ? void 0 : de.i);
      return !(typeof ((At = a.drag) == null ? void 0 : At.isValid) == "function" && !((ht = a.drag) != null && ht.isValid(s.value[m])) || typeof ((S = a.drag) == null ? void 0 : S.isValid) == "boolean" && !((p = a.drag) != null && p.isValid));
    }, Bt = (e) => {
      var m, O;
      return typeof ((m = a.drag) == null ? void 0 : m.isDraggable) == "function" ? (O = a.drag) == null ? void 0 : O.isDraggable(e) : !0;
    }, pt = () => {
      if (ye.value) {
        l("click-create");
        return;
      }
      if (ct.value || tt.value) {
        if (typeof a.newValueGenerator == "function") {
          let e = a.newValueGenerator();
          if (typeof e == "object" || a.type !== Ge.Table) {
            s.value.push(e);
            return;
          }
        }
        s.value.push({});
      } else
        l("click-create");
    }, _e = (e) => {
      s.value.push(e);
    }, r = () => g.value = !0, b = () => g.value = !1, C = (e, m) => {
      var O, j, te;
      if (!((O = P.value) != null && O.type && [
        _t.Split,
        _t.SplitEver,
        _t.SplitLazy
      ].includes((j = P.value) == null ? void 0 : j.type))) {
        if (l("before-save"), (te = P.value) != null && te.resource && (g.value = !1, !m.success)) {
          l("error", m.httpStatus);
          return;
        }
        d.value.turnStoredIntoOriginal(), Ve.value = !1, l("save", m);
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
    }, Y = (e) => {
      s.value.splice(e, 1), le();
    }, ee = () => {
      var e;
      Q.value && typeof ((e = Q.value) == null ? void 0 : e.destroy) == "function" && (Q.value.destroy(), Q.value = {});
    }, mt = () => {
      _.value || (_.value = document.getElementById("lkt-table-body-" + we)), Q.value = new ja(_.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let m = e.oldIndex, O = e.newIndex;
          s.value.splice(O, 0, s.value.splice(m, 1)[0]), le(), l("drag-end", s.value[O]);
        },
        onMove: function(e, m) {
          return Ft(e);
        }
      });
    }, lt = (e, m, O = !1) => {
      let j = [re.value, we, "row", m];
      return O && j.push("hidden"), it.value.forEach((te) => {
        let de = String(e[te.key]).toLowerCase();
        de.length > 50 && (de = de.substring(0, 50)), de = Ua(de, " ", "-"), j.push(de);
      }), j.join("-");
    }, gt = u(() => typeof a.createEnabledValidator == "function" ? a.createEnabledValidator({ items: s.value }) : !0), yt = u(() => a.createButton === !1 ? !1 : tt.value || ye.value && I.value || ct.value && I.value || Dt.value && I.value), ga = u(() => [Ge.Ol, Ge.Ul].includes(a.type)), bt = (e, m) => typeof a.itemDisplayChecker == "function" ? a.itemDisplayChecker(e, m) : !0, Tt = (e, m) => typeof a.itemContainerClass == "function" ? a.itemContainerClass(e, m) : a.itemContainerClass, ya = (e, m) => Pe.value ? e[Pe.value.key] : "", je = u(() => typeof a.itemSlotComponent == "function" ? a.itemSlotComponent() : a.itemSlotComponent), Et = u(() => typeof a.itemSlotData == "function" ? a.itemSlotData() : a.itemSlotData);
    Yt(() => {
      var e;
      a.initialSorting && It(cn(a.columns, k.value)), d.value.store({ items: s.value }).turnStoredIntoOriginal(), Ve.value = !1, (e = a.drag) != null && e.enabled && Vt(() => {
        mt();
      });
    }), U(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }, (e) => {
      e ? mt() : ee();
    }), U(() => a.type, (e) => {
      var m;
      (m = a.drag) != null && m.enabled ? mt() : ee();
    }), U(() => a.perms, (e) => A.value = e), U(A, (e) => l("update:perms", e)), U(I, (e) => {
      l("update:editMode", e);
    }), U(() => a.editMode, (e) => I.value = e), U(() => a.columns, (e) => B.value = e, { deep: !0 }), U(() => a.modelValue, (e) => {
      s.value = e;
    }, { deep: !0 }), U(s, (e) => {
      d.value.increment({ items: e }), Ve.value = d.value.changed(), l("update:modelValue", e);
    }, { deep: !0 }), i({
      getItemByEvent: Ue,
      getItemByIndex: ft,
      getRowByIndex: nt,
      doRefresh: $e,
      doRemoveIndex: (e) => {
        s.value.splice(e, 1), le();
      },
      getHtml: () => oe.value,
      reRender: le,
      turnStoredIntoOriginal: () => {
        d.value.turnStoredIntoOriginal(), Vt(() => {
          le();
        });
      }
    });
    const ba = u(() => typeof fe.defaultEmptySlot < "u"), ha = u(() => fe.defaultEmptySlot), ka = u(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled ? !1 : typeof a.drag.canRender > "u" ? !0 : a.drag.canRender), Sa = u(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled || typeof a.drag.isDisabled > "u" ? !1 : a.drag.isDisabled), Ca = u(() => typeof a.header == "object" && Object.keys(a.header).length > 0);
    return (e, m) => {
      const O = Ce("lkt-header"), j = Ce("lkt-button"), te = Ce("lkt-accordion"), de = Ce("lkt-loader"), At = Ce("lkt-paginator");
      return f(), w("section", {
        ref_key: "element",
        ref: oe,
        class: "lkt-table-page",
        id: "lkt-table-page-" + h(we)
      }, [
        Ca.value ? (f(), M(O, he(X({ key: 0 }, e.header)), null, 16)) : ut.value || h(n).title ? (f(), w("header", {
          key: 1,
          class: J(e.headerClass)
        }, [
          ut.value ? (f(), M(ve(rt.value), { key: 0 }, {
            default: F(() => [
              e.titleIcon ? (f(), w("i", {
                key: 0,
                class: J(e.titleIcon)
              }, null, 2)) : R("", !0),
              Ke(" " + We(ut.value), 1)
            ]),
            _: 1
          })) : R("", !0),
          h(n).title ? $(e.$slots, "title", { key: 1 }) : R("", !0)
        ], 2)) : R("", !0),
        (f(), M(ve(Ot.value), {
          class: J(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: F(() => {
            var ht;
            return [
              ze(ce("div", Bn, [
                e.groupButton !== !1 ? (f(), M(j, X({
                  key: 0,
                  ref: "groupButton"
                }, Oe.value, { class: "lkt-item-crud-group-button" }), {
                  split: F(() => [
                    ce("div", Tn, [
                      ze(ke(j, X(H.value, {
                        checked: I.value,
                        "onUpdate:checked": m[0] || (m[0] = (S) => I.value = S)
                      }), null, 16, ["checked"]), [
                        [He, Ie.value]
                      ])
                    ]),
                    h(n)["prev-buttons-ever"] ? $(e.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: x.value,
                      canDrop: q.value,
                      perms: e.perms
                    }) : R("", !0),
                    h(n)["prev-buttons"] ? $(e.$slots, "prev-buttons", {
                      key: 1,
                      canUpdate: x.value,
                      canDrop: q.value,
                      perms: e.perms
                    }) : R("", !0),
                    ze(ke(j, X({
                      class: "lkt-table--save-button",
                      ref_key: "saveButtonRef",
                      ref: ie
                    }, {
                      ...P.value,
                      disabled: ge.value,
                      resourceData: Fe.value
                    }, {
                      onLoading: r,
                      onLoaded: b,
                      onClick: C
                    }), {
                      split: F(({ doClose: S, doRootClick: p }) => [
                        $(e.$slots, "button-save-split", {
                          doClose: S,
                          doRootClick: p,
                          dataState: d.value,
                          onButtonLoading: r,
                          onButtonLoaded: b
                        })
                      ]),
                      default: F(() => [
                        h(n)["button-save"] ? $(e.$slots, "button-save", {
                          key: 0,
                          items: s.value,
                          editMode: e.editMode,
                          canUpdate: !ge.value
                        }) : R("", !0)
                      ]),
                      _: 3
                    }, 16), [
                      [He, Le.value]
                    ]),
                    yt.value && s.value.length >= e.requiredItemsForTopCreate ? (f(), M(zt, {
                      key: 2,
                      config: ne.value,
                      disabled: !gt.value,
                      onClick: pt,
                      onAppend: _e
                    }, null, 8, ["config", "disabled"])) : R("", !0)
                  ]),
                  _: 3
                }, 16)) : R("", !0),
                h(n)["prev-buttons-ever"] ? $(e.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: x.value,
                  canDrop: q.value,
                  perms: e.perms
                }) : R("", !0),
                h(n)["prev-buttons"] ? $(e.$slots, "prev-buttons", {
                  key: 2,
                  canUpdate: x.value,
                  canDrop: q.value,
                  perms: e.perms
                }) : R("", !0),
                ze(ke(j, X({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: ie
                }, {
                  ...P.value,
                  disabled: ge.value,
                  resourceData: Fe.value
                }, {
                  onLoading: r,
                  onLoaded: b,
                  onClick: C
                }), {
                  split: F(({ doClose: S, doRootClick: p }) => [
                    $(e.$slots, "button-save-split", {
                      doClose: S,
                      doRootClick: p,
                      dataState: d.value,
                      onButtonLoading: r,
                      onButtonLoaded: b
                    })
                  ]),
                  default: F(() => [
                    h(n)["button-save"] ? $(e.$slots, "button-save", {
                      key: 0,
                      items: s.value,
                      editMode: e.editMode,
                      canUpdate: !ge.value
                    }) : R("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [He, Le.value]
                ]),
                yt.value && s.value.length >= e.requiredItemsForTopCreate ? (f(), M(zt, {
                  key: 3,
                  config: ne.value,
                  disabled: !gt.value,
                  onClick: pt,
                  onAppend: _e
                }, null, 8, ["config", "disabled"])) : R("", !0),
                ce("div", En, [
                  ze(ke(j, X(H.value, {
                    checked: I.value,
                    "onUpdate:checked": m[1] || (m[1] = (S) => I.value = S)
                  }), null, 16, ["checked"]), [
                    [He, Ie.value]
                  ])
                ])
              ], 512), [
                [He, De.value]
              ]),
              h(n).buttons ? (f(), w("div", An, [
                $(e.$slots, "buttons")
              ])) : R("", !0),
              V.value && h(n).filters ? (f(), w("div", Vn, [
                $(e.$slots, "filters", {
                  items: s.value,
                  isLoading: g.value
                })
              ])) : R("", !0),
              ze(ce("div", Rn, [
                e.type === h(Ge).Table ? (f(), w("table", Ln, [
                  e.hideTableHeader ? R("", !0) : (f(), w("thead", Nn, [
                    ce("tr", null, [
                      st.value && I.value ? (f(), w("th", Mn)) : R("", !0),
                      e.addNavigation && I.value ? (f(), w("th", On)) : R("", !0),
                      (f(!0), w(G, null, be(me.value, (S) => (f(), w(G, null, [
                        ue.value.indexOf(S.key) === -1 ? (f(), M(Dn, {
                          key: 0,
                          column: S,
                          "sort-by": k.value,
                          "sort-direction": D.value,
                          "amount-of-columns": e.columns.length,
                          items: s.value,
                          onClick: (p) => It(S)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : R("", !0)
                      ], 64))), 256))
                    ])
                  ])),
                  ce("tbody", {
                    ref_key: "tableBody",
                    ref: v,
                    id: "lkt-table-body-" + h(we),
                    class: J(e.itemsContainerClass)
                  }, [
                    (f(!0), w(G, null, be(s.value, (S, p) => ze((f(), M(Cn, {
                      modelValue: s.value[p],
                      "onUpdate:modelValue": (L) => s.value[p] = L,
                      key: lt(S, p),
                      i: p,
                      "is-draggable": Bt(S),
                      sortable: st.value,
                      "visible-columns": me.value,
                      "empty-columns": ue.value,
                      "add-navigation": e.addNavigation,
                      "latest-row": p + 1 === se.value,
                      "can-drop": q.value && I.value,
                      "can-edit": dt.value && x.value && I.value,
                      "can-read": Ne.value,
                      "can-create": ye.value,
                      "edit-mode-enabled": I.value,
                      "has-inline-edit-perm": et.value,
                      "row-display-type": e.rowDisplayType,
                      "render-drag": ka.value,
                      "disabled-drag": Sa.value,
                      "is-loading": g.value,
                      "item-container-class": e.itemContainerClass,
                      "item-slot-component": je.value,
                      "item-slot-data": Et.value,
                      "item-slot-events": e.itemSlotEvents,
                      permissions: A.value,
                      onClick: $t,
                      onItemUp: N,
                      onItemDown: W,
                      onItemDrop: Y
                    }, La({ _: 2 }, [
                      h(n)[`item-${p}`] ? {
                        name: `item-${p}`,
                        fn: F((L) => [
                          $(e.$slots, `item-${p}`, he({
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
                        fn: F((L) => [
                          $(e.$slots, "item", he({
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
                      be(Ct.value, (L) => ({
                        name: L,
                        fn: F((ot) => [
                          $(e.$slots, L, he({
                            [e.slotItemVar || ""]: ot.item,
                            value: ot.value,
                            column: ot.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class", "item-slot-component", "item-slot-data", "item-slot-events", "permissions"])), [
                      [He, bt(s.value[p], p)]
                    ])), 128))
                  ], 10, $n)
                ])) : e.type === h(Ge).Item ? (f(), w("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + h(we),
                  class: J(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (f(!0), w(G, null, be(s.value, (S, p) => (f(), w(G, {
                    key: lt(S, p)
                  }, [
                    !e.skipTableItemsContainer && bt(S, p) ? (f(), w("div", {
                      key: 0,
                      class: J(["lkt-table-item", Tt(S, p)]),
                      "data-i": p
                    }, [
                      je.value ? (f(), M(ve(je.value), X({
                        key: 0,
                        ref_for: !0
                      }, {
                        item: S,
                        index: p,
                        editing: I.value,
                        perms: A.value,
                        data: Et.value,
                        events: e.itemSlotEvents
                      }), null, 16)) : $(e.$slots, "item", he({
                        key: 1,
                        [e.slotItemVar || ""]: S,
                        index: p,
                        editing: I.value,
                        canCreate: ye.value,
                        canRead: Ne.value,
                        canUpdate: x.value,
                        canDrop: q.value,
                        isLoading: g.value,
                        doDrop: () => Y(p)
                      }))
                    ], 10, Pn)) : bt(S, p) ? $(e.$slots, "item", he({
                      key: 1,
                      class: Tt(S, p),
                      dataI: p,
                      [e.slotItemVar || ""]: S,
                      index: p,
                      editing: I.value,
                      canCreate: ye.value,
                      canRead: Ne.value,
                      canUpdate: x.value,
                      canDrop: q.value,
                      isLoading: g.value,
                      doDrop: () => Y(p)
                    })) : R("", !0)
                  ], 64))), 128))
                ], 10, Fn)) : e.type === h(Ge).Accordion ? (f(), w("div", {
                  key: 2,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + h(we),
                  class: J(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (f(!0), w(G, null, be(s.value, (S, p) => (f(), w(G, null, [
                    [h(Se).Auto, h(Se).PreferCustomItem].includes(e.rowDisplayType) && h(n)[vt(S, p)] ? $(e.$slots, vt(S, p), {
                      key: 0,
                      item: S,
                      index: p,
                      editing: I.value,
                      isLoading: g.value
                    }) : [h(Se).Auto, h(Se).PreferCustomItem].includes(e.rowDisplayType) && h(n)[`item-${p}`] ? $(e.$slots, `item-${p}`, {
                      key: 1,
                      item: S,
                      index: p,
                      editing: I.value,
                      isLoading: g.value
                    }) : (f(), w(G, { key: 2 }, [
                      bt(S, p) ? (f(), M(te, X({
                        class: ["lkt-table-item", Tt(S, p)],
                        "data-i": p,
                        key: lt(S, p)
                      }, { ref_for: !0 }, {
                        ...e.accordion,
                        title: ya(S)
                      }), {
                        header: F(() => [
                          ke(Xt, {
                            modelValue: s.value[p],
                            "onUpdate:modelValue": (L) => s.value[p] = L,
                            i: p,
                            column: Pe.value,
                            columns: me.value,
                            "edit-mode-enabled": I.value,
                            "has-inline-edit-perm": et.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])
                        ]),
                        default: F(() => [
                          (f(!0), w(G, null, be(me.value, (L) => {
                            var ot, Qt;
                            return f(), w(G, null, [
                              L.key !== ((ot = Pe.value) == null ? void 0 : ot.key) && e.$slots[L.key] && h(pa)(L, s.value[p]) ? $(e.$slots, L.key, {
                                key: 0,
                                value: s.value[p][L.key],
                                item: s.value[p],
                                column: L,
                                i: p
                              }) : (f(), w(G, { key: 1 }, [
                                L.key !== ((Qt = Pe.value) == null ? void 0 : Qt.key) ? (f(), M(Xt, {
                                  key: 0,
                                  modelValue: s.value[p],
                                  "onUpdate:modelValue": (wa) => s.value[p] = wa,
                                  i: p,
                                  column: L,
                                  columns: me.value,
                                  "edit-mode-enabled": I.value,
                                  "has-inline-edit-perm": et.value
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])) : R("", !0)
                              ], 64))
                            ], 64);
                          }), 256))
                        ]),
                        _: 2
                      }, 1040, ["class", "data-i"])) : R("", !0)
                    ], 64))
                  ], 64))), 256))
                ], 10, Un)) : ga.value ? (f(), M(ve(e.type), {
                  key: 3,
                  class: J(["lkt-table-items-container", e.itemsContainerClass])
                }, {
                  default: F(() => [
                    (f(!0), w(G, null, be(s.value, (S, p) => (f(), w(G, {
                      key: lt(S, p)
                    }, [
                      bt(S, p) ? (f(), w("li", {
                        key: 0,
                        class: J(["lkt-table-item", Tt(S, p)]),
                        "data-i": p
                      }, [
                        je.value ? (f(), M(ve(je.value), X({
                          key: 0,
                          ref_for: !0
                        }, {
                          item: S,
                          index: p,
                          editing: I.value,
                          perms: A.value,
                          data: Et.value,
                          events: e.itemSlotEvents
                        }), null, 16)) : $(e.$slots, "item", he({
                          key: 1,
                          [e.slotItemVar || ""]: S,
                          index: p,
                          editing: I.value,
                          canCreate: ye.value,
                          canRead: Ne.value,
                          canUpdate: x.value,
                          canDrop: q.value,
                          isLoading: g.value,
                          doDrop: () => Y(p)
                        }))
                      ], 10, _n)) : R("", !0)
                    ], 64))), 128))
                  ]),
                  _: 3
                }, 8, ["class"])) : e.type === h(Ge).Carousel ? (f(), w("div", {
                  key: 4,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + h(we),
                  class: J(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  ke(h(tn), X({
                    modelValue: ae.value,
                    "onUpdate:modelValue": m[2] || (m[2] = (S) => ae.value = S)
                  }, e.carousel, {
                    "wrap-around": ((ht = e.carousel) == null ? void 0 : ht.infinite) === !0
                  }), {
                    addons: F(() => [
                      ke(h(ln)),
                      ke(h(on))
                    ]),
                    default: F(() => [
                      (f(!0), w(G, null, be(wt.value, (S, p) => (f(), M(h(na), {
                        key: S,
                        index: p
                      }, {
                        default: F(() => [
                          ce("div", zn, [
                            $(e.$slots, S)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (f(!0), w(G, null, be(s.value, (S, p) => (f(), M(h(na), {
                        key: e.slide,
                        index: p
                      }, {
                        default: F(() => [
                          ce("div", Hn, [
                            je.value ? (f(), M(ve(je.value), X({
                              key: 0,
                              ref_for: !0
                            }, {
                              item: S,
                              index: p,
                              editing: I.value,
                              perms: A.value,
                              data: Et.value,
                              events: e.itemSlotEvents
                            }), null, 16)) : $(e.$slots, "item", he({
                              key: 1,
                              [e.slotItemVar || ""]: S,
                              index: p,
                              editing: I.value,
                              canCreate: ye.value,
                              canRead: Ne.value,
                              canUpdate: x.value,
                              canDrop: q.value,
                              isLoading: g.value,
                              doDrop: () => Y(p)
                            }))
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128))
                    ]),
                    _: 3
                  }, 16, ["modelValue", "wrap-around"])
                ], 10, jn)) : R("", !0)
              ], 512), [
                [He, at.value]
              ]),
              !g.value && s.value.length === 0 ? (f(), w("div", qn, [
                h(n).empty ? $(e.$slots, "empty", { key: 0 }) : ba.value ? (f(), M(ve(ha.value), {
                  key: 1,
                  message: e.noResultsText
                }, null, 8, ["message"])) : e.noResultsText ? (f(), w(G, { key: 2 }, [
                  Ke(We(e.noResultsText), 1)
                ], 64)) : R("", !0)
              ])) : R("", !0),
              g.value ? (f(), M(de, { key: 3 })) : R("", !0),
              yt.value || h(n).bottomButtons ? (f(), w("div", Gn, [
                yt.value && s.value.length >= e.requiredItemsForBottomCreate ? (f(), M(zt, {
                  key: 0,
                  config: ne.value,
                  disabled: !gt.value,
                  onClick: pt,
                  onAppend: _e
                }, null, 8, ["config", "disabled"])) : R("", !0),
                $(e.$slots, "bottom-buttons")
              ])) : R("", !0),
              e.paginator && Object.keys(e.paginator).length > 0 ? (f(), M(At, X({
                key: 5,
                ref_key: "paginatorRef",
                ref: Ze
              }, e.paginator, {
                modelValue: c.value,
                "onUpdate:modelValue": m[3] || (m[3] = (S) => c.value = S),
                onLoading: Mt,
                onPerms: xe,
                onResponse: Z
              }), null, 16, ["modelValue"])) : R("", !0),
              h(n)["web-element-actions"] ? $(e.$slots, "web-element-actions", { key: 6 }) : R("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, In);
    };
  }
}), el = {
  install: (t) => {
    t.component("lkt-table") === void 0 && t.component("lkt-table", Xn);
  }
}, tl = (t) => (fe.navButtonSlot = t, !0), al = (t) => (fe.createButtonSlot = t, !0), nl = (t) => {
  fe.defaultEmptySlot = t;
};
export {
  il as Column,
  rl as createColumn,
  el as default,
  rn as defaultTableSorter,
  al as setTableCreateButtonSlot,
  nl as setTableEmptySlot,
  tl as setTableNavButtonSlot
};
