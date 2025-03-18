import { defineComponent as ae, computed as u, ref as C, shallowReactive as Ft, watch as H, watchEffect as $t, onMounted as zt, onBeforeUnmount as Ca, reactive as Lt, provide as aa, h as Y, useId as Da, inject as st, getCurrentInstance as Ba, onUnmounted as Ia, onUpdated as Ta, cloneVNode as Ea, resolveComponent as ve, createBlock as $, createElementBlock as k, unref as B, openBlock as d, normalizeProps as Te, mergeProps as fe, withCtx as F, createTextVNode as Ee, toDisplayString as Pe, Fragment as x, withModifiers as la, createCommentVNode as A, resolveDynamicComponent as Be, useSlots as na, normalizeClass as re, createElementVNode as q, createVNode as De, renderSlot as z, renderList as ie, withDirectives as rt, vShow as ut, mergeDefaults as Aa, nextTick as yt, createSlots as Yt } from "vue";
import { __ as Va } from "lkt-i18n";
import { SortDirection as Oe, Column as oa, ColumnType as ht, prepareResourceData as ia, TableRowType as Ze, extractI18nValue as ra, LktSettings as tt, ensureButtonConfig as kt, TablePermission as Se, PaginatorType as St, TableType as et, getDefaultValues as Na, Table as Ma, ButtonType as Ot } from "lkt-vue-kernel";
import { Column as dn, createColumn as cn } from "lkt-vue-kernel";
import { replaceAll as ua, generateRandomString as _a } from "lkt-string-tools";
import { DataState as Ra } from "lkt-data-state";
import $a from "sortablejs";
import { time as Le } from "lkt-date-tools";
/**
 * Vue 3 Carousel 0.14.0
 * (c) 2025
 * @license MIT
 */
const sa = ["viewport", "carousel"], Ct = {
  "bottom-to-top": "btt",
  "left-to-right": "ltr",
  "right-to-left": "rtl",
  "top-to-bottom": "ttb"
}, da = [
  "ltr",
  "left-to-right",
  "rtl",
  "right-to-left",
  "ttb",
  "top-to-bottom",
  "btt",
  "bottom-to-top"
], La = {
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
}, ca = ["slide", "fade"], va = [
  "center",
  "start",
  "end",
  "center-even",
  "center-odd"
], P = {
  autoplay: 0,
  breakpointMode: sa[0],
  breakpoints: void 0,
  dir: da[0],
  enabled: !0,
  gap: 0,
  height: "auto",
  i18n: La,
  ignoreAnimations: !1,
  itemsToScroll: 1,
  itemsToShow: 1,
  modelValue: 0,
  mouseDrag: !0,
  pauseAutoplayOnHover: !1,
  preventExcessiveDragging: !1,
  slideEffect: ca[0],
  snapAlign: va[0],
  touchDrag: !0,
  transition: 300,
  wrapAround: !1
}, Fe = Symbol("carousel"), Oa = (e) => {
  const o = Ft([]), i = (n) => {
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
function Pa(e) {
  return e.length === 0 ? 0 : e.reduce((i, n) => i + n, 0) / e.length;
}
function Kt({ slides: e, position: o, toShow: i }) {
  const n = [], l = o === "before", a = l ? -i : 0, v = l ? 0 : i;
  if (e.length <= 0)
    return n;
  for (let b = a; b < v; b++) {
    const p = {
      index: l ? b : b + e.length,
      isClone: !0,
      position: o,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${o}-${b}`
    }, r = e[(b % e.length + e.length) % e.length].vnode, T = Ea(r, p);
    T.el = null, n.push(T);
  }
  return n;
}
const Fa = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function Wt(e) {
  if (!e.el || !(e.el instanceof Element))
    return;
  const o = e.el.querySelectorAll(Fa);
  for (const i of o)
    i instanceof HTMLElement && !i.hasAttribute("disabled") && i.getAttribute("aria-hidden") !== "true" && i.setAttribute("tabindex", "-1");
}
function Ua(e, o) {
  return Object.keys(e).filter((i) => !o.includes(i)).reduce((i, n) => (i[n] = e[n], i), {});
}
function ja(e) {
  const { isVertical: o, isReversed: i, dragged: n, effectiveSlideSize: l } = e, a = o ? n.y : n.x;
  if (a === 0)
    return 0;
  const v = Math.round(a / l);
  return i ? v : -v;
}
function we({ val: e, max: o, min: i }) {
  return o < i ? e : Math.min(Math.max(e, isNaN(i) ? e : i), isNaN(o) ? e : o);
}
function za(e) {
  const { transform: o } = window.getComputedStyle(e);
  return o.split(/[(,)]/).slice(1, -1).map((i) => parseFloat(i));
}
function Ha(e) {
  let o = 1, i = 1;
  return e.forEach((n) => {
    const l = za(n);
    l.length === 6 && (o /= l[0], i /= l[3]);
  }), { widthMultiplier: o, heightMultiplier: i };
}
function xa(e, o) {
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
function qa(e, o, i) {
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
function Ut({ slideSize: e, viewportSize: o, align: i, itemsToShow: n }) {
  return n !== void 0 ? xa(i, n) : e !== void 0 && o !== void 0 ? qa(i, e, o) : 0;
}
function fa(e = "", o = {}) {
  return Object.entries(o).reduce((i, [n, l]) => i.replace(`{${n}}`, String(l)), e);
}
function pa({ val: e, max: o, min: i = 0 }) {
  const n = o - i + 1;
  return ((e - i) % n + n) % n + i;
}
function Pt(e, o = 0) {
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
function wt(e, o = "px") {
  if (!(e == null || e === ""))
    return typeof e == "number" || parseFloat(e).toString() === e ? `${e}${o}` : e;
}
const Ga = ae({
  name: "CarouselAria",
  setup() {
    const e = st(Fe);
    return e ? () => Y("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, fa(e.config.i18n.itemXofY, {
      currentSlide: e.currentSlide + 1,
      slidesCount: e.slidesCount
    })) : () => "";
  }
}), Xa = {
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
      return sa.includes(e);
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
      return va.includes(e);
    }
  },
  slideEffect: {
    type: String,
    default: P.slideEffect,
    validator(e) {
      return ca.includes(e);
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
      if (!da.includes(e))
        return !1;
      const i = e in Ct ? Ct[e] : e;
      return ["ttb", "btt"].includes(i) && (!o.height || o.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${e}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: P.wrapAround,
    type: Boolean
  }
}, Ya = ae({
  name: "VueCarousel",
  props: Xa,
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
    const a = Oa(i), v = a.getSlides(), b = u(() => v.length), g = C(null), p = C(null), r = C(0), T = u(() => Object.assign(Object.assign(Object.assign({}, P), Ua(e, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, P.i18n), e.i18n) })), c = Ft(Object.assign({}, T.value)), S = C((l = e.modelValue) !== null && l !== void 0 ? l : 0), E = C(S.value);
    H(S, (s) => E.value = s);
    const V = C(0), ye = u(() => Math.ceil((b.value - 1) / 2)), O = u(() => b.value - 1), G = u(() => 0);
    let ne = null, Ae = null, Z = null;
    const f = u(() => r.value + c.gap), h = u(() => {
      const s = c.dir || "ltr";
      return s in Ct ? Ct[s] : s;
    }), U = u(() => ["rtl", "btt"].includes(h.value)), L = u(() => ["ttb", "btt"].includes(h.value)), Q = u(() => c.itemsToShow === "auto"), R = u(() => L.value ? "height" : "width");
    function Ie() {
      var s;
      if (!ze.value)
        return;
      const y = (T.value.breakpointMode === "carousel" ? (s = g.value) === null || s === void 0 ? void 0 : s.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, w = Object.keys(e.breakpoints || {}).map((N) => Number(N)).sort((N, X) => +X - +N), D = {};
      w.some((N) => y >= N ? (Object.assign(D, e.breakpoints[N]), D.i18n && Object.assign(D.i18n, T.value.i18n, e.breakpoints[N].i18n), !0) : !1), Object.assign(c, T.value, D);
    }
    const Dt = Pt(() => {
      Ie(), ue(), pe();
    }), Ue = Ft(/* @__PURE__ */ new Set()), j = C([]);
    function Bt({ widthMultiplier: s, heightMultiplier: y }) {
      j.value = v.map((w) => {
        var D;
        const N = (D = w.exposed) === null || D === void 0 ? void 0 : D.getBoundingRect();
        return {
          width: N.width * s,
          height: N.height * y
        };
      });
    }
    const Ve = C({
      width: 0,
      height: 0
    });
    function It({ widthMultiplier: s, heightMultiplier: y }) {
      var w;
      const D = ((w = p.value) === null || w === void 0 ? void 0 : w.getBoundingClientRect()) || { width: 0, height: 0 };
      Ve.value = {
        width: D.width * s,
        height: D.height * y
      };
    }
    function pe() {
      if (!p.value)
        return;
      const s = Ha(Ue);
      if (It(s), Bt(s), Q.value)
        r.value = Pa(j.value.map((y) => y[R.value]));
      else {
        const y = Number(c.itemsToShow), w = (y - 1) * c.gap;
        r.value = (Ve.value[R.value] - w) / y;
      }
    }
    function ue() {
      !c.wrapAround && b.value > 0 && (S.value = we({
        val: S.value,
        max: O.value,
        min: G.value
      })), Q.value || (c.itemsToShow = we({
        val: Number(c.itemsToShow),
        max: b.value,
        min: 1
      }));
    }
    const Ne = u(() => typeof e.ignoreAnimations == "string" ? e.ignoreAnimations.split(",") : Array.isArray(e.ignoreAnimations) ? e.ignoreAnimations : e.ignoreAnimations ? !1 : []);
    $t(() => ue()), $t(() => {
      pe();
    });
    let se;
    const je = (s) => {
      const y = s.target;
      if (!(!(y != null && y.contains(g.value)) || Array.isArray(Ne.value) && Ne.value.includes(s.animationName)) && (Ue.add(y), !se)) {
        const w = () => {
          se = requestAnimationFrame(() => {
            pe(), w();
          });
        };
        w();
      }
    }, dt = (s) => {
      const y = s.target;
      y && Ue.delete(y), se && Ue.size === 0 && (cancelAnimationFrame(se), pe());
    }, ze = C(!1);
    typeof document < "u" && $t(() => {
      ze.value && Ne.value !== !1 ? (document.addEventListener("animationstart", je), document.addEventListener("animationend", dt)) : (document.removeEventListener("animationstart", je), document.removeEventListener("animationend", dt));
    }), zt(() => {
      ze.value = !0, Ie(), he(), g.value && (Z = new ResizeObserver(Dt), Z.observe(g.value)), i("init");
    }), Ca(() => {
      ze.value = !1, a.cleanup(), Ae && clearTimeout(Ae), se && cancelAnimationFrame(se), ne && clearInterval(ne), Z && (Z.disconnect(), Z = null), typeof document < "u" && vt(), g.value && (g.value.removeEventListener("transitionend", pe), g.value.removeEventListener("animationiteration", pe));
    });
    let me = !1;
    const He = { x: 0, y: 0 }, oe = Lt({ x: 0, y: 0 }), xe = C(!1), qe = C(!1), Tt = () => {
      xe.value = !0;
    }, lt = () => {
      xe.value = !1;
    }, ct = Pt((s) => {
      if (!s.ctrlKey)
        switch (s.key) {
          case "ArrowLeft":
          case "ArrowUp":
            L.value === s.key.endsWith("Up") && (U.value ? _e(!0) : Ye(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            L.value === s.key.endsWith("Down") && (U.value ? Ye(!0) : _e(!0));
            break;
        }
    }, 200), Et = () => {
      document.addEventListener("keydown", ct);
    }, vt = () => {
      document.removeEventListener("keydown", ct);
    };
    function ft(s) {
      const y = s.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(y) || ge.value || (me = s.type === "touchstart", !me && (s.preventDefault(), s.button !== 0)))
        return;
      He.x = "touches" in s ? s.touches[0].clientX : s.clientX, He.y = "touches" in s ? s.touches[0].clientY : s.clientY;
      const w = me ? "touchmove" : "mousemove", D = me ? "touchend" : "mouseup";
      document.addEventListener(w, Me, { passive: !1 }), document.addEventListener(D, Ge, { passive: !0 });
    }
    const Me = Pt((s) => {
      qe.value = !0;
      const y = "touches" in s ? s.touches[0].clientX : s.clientX, w = "touches" in s ? s.touches[0].clientY : s.clientY;
      oe.x = y - He.x, oe.y = w - He.y;
      const D = ja({
        isVertical: L.value,
        isReversed: U.value,
        dragged: oe,
        effectiveSlideSize: f.value
      });
      E.value = c.wrapAround ? S.value + D : we({
        val: S.value + D,
        max: O.value,
        min: G.value
      }), i("drag", { deltaX: oe.x, deltaY: oe.y });
    });
    function Ge() {
      if (Me.cancel(), E.value !== S.value && !me) {
        const w = (D) => {
          D.preventDefault(), window.removeEventListener("click", w);
        };
        window.addEventListener("click", w);
      }
      ke(E.value), oe.x = 0, oe.y = 0, qe.value = !1;
      const s = me ? "touchmove" : "mousemove", y = me ? "touchend" : "mouseup";
      document.removeEventListener(s, Me), document.removeEventListener(y, Ge);
    }
    function he() {
      !c.autoplay || c.autoplay <= 0 || (ne = setInterval(() => {
        c.pauseAutoplayOnHover && xe.value || _e();
      }, c.autoplay));
    }
    function Xe() {
      ne && (clearInterval(ne), ne = null);
    }
    function de() {
      Xe(), he();
    }
    const ge = C(!1);
    function ke(s, y = !1) {
      if (!y && ge.value)
        return;
      let w = s, D = s;
      V.value = S.value, c.wrapAround ? D = pa({
        val: w,
        max: O.value,
        min: G.value
      }) : w = we({
        val: w,
        max: O.value,
        min: G.value
      }), i("slide-start", {
        slidingToIndex: s,
        currentSlideIndex: S.value,
        prevSlideIndex: V.value,
        slidesCount: b.value
      }), Xe(), ge.value = !0, S.value = w, D !== w && be.pause(), i("update:modelValue", D), Ae = setTimeout(() => {
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
    function _e(s = !1) {
      ke(S.value + c.itemsToScroll, s);
    }
    function Ye(s = !1) {
      ke(S.value - c.itemsToScroll, s);
    }
    function pt() {
      Ie(), ue(), pe(), de();
    }
    H(() => [T.value, e.breakpoints], () => Ie(), { deep: !0 }), H(() => e.autoplay, () => de());
    const be = H(() => e.modelValue, (s) => {
      s !== S.value && ke(Number(s), !0);
    });
    i("before-init");
    const Re = u(() => {
      if (!c.wrapAround)
        return { before: 0, after: 0 };
      if (Q.value)
        return { before: v.length, after: v.length };
      const s = Number(c.itemsToShow), y = Math.ceil(s + (c.itemsToScroll - 1)), w = y - E.value, D = y - (b.value - (E.value + 1));
      return {
        before: Math.max(0, w),
        after: Math.max(0, D)
      };
    }), Ke = u(() => Re.value.before ? Q.value ? j.value.slice(-1 * Re.value.before).reduce((s, y) => s + y[R.value] + c.gap, 0) * -1 : Re.value.before * f.value * -1 : 0), nt = u(() => {
      var s;
      if (Q.value) {
        const y = (S.value % v.length + v.length) % v.length;
        return Ut({
          slideSize: (s = j.value[y]) === null || s === void 0 ? void 0 : s[R.value],
          viewportSize: Ve.value[R.value],
          align: c.snapAlign
        });
      }
      return Ut({
        align: c.snapAlign,
        itemsToShow: +c.itemsToShow
      });
    }), We = u(() => {
      let s = 0;
      if (Q.value) {
        if (S.value < 0 ? s = j.value.slice(S.value).reduce((y, w) => y + w[R.value] + c.gap, 0) * -1 : s = j.value.slice(0, S.value).reduce((y, w) => y + w[R.value] + c.gap, 0), s -= nt.value, !c.wrapAround) {
          const y = j.value.reduce((w, D) => w + D[R.value] + c.gap, 0) - Ve.value[R.value] - c.gap;
          s = we({
            val: s,
            max: y,
            min: 0
          });
        }
      } else {
        let y = S.value - nt.value;
        c.wrapAround || (y = we({
          val: y,
          max: b.value - +c.itemsToShow,
          min: 0
        })), s = y * f.value;
      }
      return s * (U.value ? 1 : -1);
    }), At = u(() => {
      var s, y;
      if (!Q.value) {
        const N = S.value - nt.value;
        return c.wrapAround ? {
          min: Math.floor(N),
          max: Math.ceil(N + Number(c.itemsToShow) - 1)
        } : {
          min: Math.floor(we({
            val: N,
            max: b.value - Number(c.itemsToShow),
            min: 0
          })),
          max: Math.ceil(we({
            val: N + Number(c.itemsToShow) - 1,
            max: b.value - 1,
            min: 0
          }))
        };
      }
      let w = 0;
      {
        let N = 0, X = 0 - Re.value.before;
        const le = Math.abs(We.value + Ke.value);
        for (; N <= le; ) {
          const ee = (X % v.length + v.length) % v.length;
          N += ((s = j.value[ee]) === null || s === void 0 ? void 0 : s[R.value]) + c.gap, X++;
        }
        w = X - 1;
      }
      let D = 0;
      {
        let N = w, X = 0;
        for (N < 0 ? X = j.value.slice(0, N).reduce((le, ee) => le + ee[R.value] + c.gap, 0) - Math.abs(We.value + Ke.value) : X = j.value.slice(0, N).reduce((le, ee) => le + ee[R.value] + c.gap, 0) - Math.abs(We.value); X < Ve.value[R.value]; ) {
          const le = (N % v.length + v.length) % v.length;
          X += ((y = j.value[le]) === null || y === void 0 ? void 0 : y[R.value]) + c.gap, N++;
        }
        D = N - 1;
      }
      return {
        min: Math.floor(w),
        max: Math.ceil(D)
      };
    }), Vt = u(() => {
      if (c.slideEffect === "fade")
        return;
      const s = L.value ? "Y" : "X", y = L.value ? oe.y : oe.x;
      let w = We.value + y;
      if (!c.wrapAround && c.preventExcessiveDragging) {
        let D = 0;
        Q.value ? D = j.value.reduce((le, ee) => le + ee[R.value], 0) : D = (b.value - Number(c.itemsToShow)) * f.value;
        const N = U.value ? 0 : -1 * D, X = U.value ? D : 0;
        w = we({
          val: w,
          min: N,
          max: X
        });
      }
      return `translate${s}(${w}px)`;
    }), mt = u(() => ({
      "--vc-transition-duration": ge.value ? wt(c.transition, "ms") : void 0,
      "--vc-slide-gap": wt(c.gap),
      "--vc-carousel-height": wt(c.height),
      "--vc-cloned-offset": wt(Ke.value)
    })), ot = { slideTo: ke, next: _e, prev: Ye }, gt = Lt({
      activeSlide: E,
      config: c,
      currentSlide: S,
      isSliding: ge,
      isVertical: L,
      maxSlide: O,
      minSlide: G,
      nav: ot,
      normalizedDir: h,
      slideRegistry: a,
      slideSize: r,
      slides: v,
      slidesCount: b,
      viewport: p,
      visibleRange: At
    });
    aa(Fe, gt);
    const Je = Lt({
      config: c,
      currentSlide: S,
      maxSlide: O,
      middleSlide: ye,
      minSlide: G,
      slideSize: r,
      slidesCount: b
    });
    return n({
      data: Je,
      nav: ot,
      next: _e,
      prev: Ye,
      restartCarousel: pt,
      slideTo: ke,
      updateBreakpointsConfig: Ie,
      updateSlideSize: pe,
      updateSlidesData: ue
    }), () => {
      var s;
      const y = o.default || o.slides, w = (y == null ? void 0 : y(Je)) || [], { before: D, after: N } = Re.value, X = Kt({
        slides: v,
        position: "before",
        toShow: D
      }), le = Kt({
        slides: v,
        position: "after",
        toShow: N
      }), ee = [...X, ...w, ...le];
      if (!c.enabled || !ee.length)
        return Y("section", {
          ref: g,
          class: ["carousel", "is-disabled"]
        }, ee);
      const Nt = ((s = o.addons) === null || s === void 0 ? void 0 : s.call(o, Je)) || [], Mt = Y("ol", {
        class: "carousel__track",
        style: { transform: Vt.value },
        onMousedownCapture: c.mouseDrag ? ft : null,
        onTouchstartPassiveCapture: c.touchDrag ? ft : null
      }, ee), Qe = Y("div", { class: "carousel__viewport", ref: p }, Mt);
      return Y("section", {
        ref: g,
        class: [
          "carousel",
          `is-${h.value}`,
          `is-effect-${c.slideEffect}`,
          {
            "is-vertical": L.value,
            "is-sliding": ge.value,
            "is-dragging": qe.value,
            "is-hover": xe.value
          }
        ],
        dir: h.value,
        style: mt.value,
        "aria-label": c.i18n.ariaGallery,
        tabindex: "0",
        onFocus: Et,
        onBlur: vt,
        onMouseenter: Tt,
        onMouseleave: lt
      }, [Qe, Nt, Y(Ga)]);
    };
  }
});
var jt;
(function(e) {
  e.arrowDown = "arrowDown", e.arrowLeft = "arrowLeft", e.arrowRight = "arrowRight", e.arrowUp = "arrowUp";
})(jt || (jt = {}));
const Jt = (e) => `icon${e.charAt(0).toUpperCase() + e.slice(1)}`, Ka = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function Wa(e) {
  return e in jt;
}
const Qt = (e) => e && Wa(e), Zt = ae({
  props: {
    name: {
      type: String,
      required: !0,
      validator: Qt
    },
    title: {
      type: String,
      default: (e) => e.name ? P.i18n[Jt(e.name)] : ""
    }
  },
  setup(e) {
    const o = st(Fe, null);
    return () => {
      const i = e.name;
      if (!i || !Qt(i))
        return;
      const n = Ka[i], l = Y("path", { d: n }), a = (o == null ? void 0 : o.config.i18n[Jt(i)]) || e.title, v = Y("title", a);
      return Y("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": a
      }, [v, l]);
    };
  }
}), Ja = ae({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(e, { slots: o, attrs: i }) {
    const n = st(Fe);
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
    })[n.normalizedDir], g = u(() => !n.config.wrapAround && n.currentSlide <= n.minSlide), p = u(() => !n.config.wrapAround && n.currentSlide >= n.maxSlide);
    return () => {
      const { i18n: r } = n.config, T = Y("button", Object.assign(Object.assign({ type: "button", disabled: g.value, "aria-label": r.ariaPreviousSlide, title: r.ariaPreviousSlide, onClick: n.nav.prev }, i), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": g.value },
        i.class
      ] }), (a == null ? void 0 : a()) || Y(Zt, { name: v() })), c = Y("button", Object.assign(Object.assign({ type: "button", disabled: p.value, "aria-label": r.ariaNextSlide, title: r.ariaNextSlide, onClick: n.nav.next }, i), { class: [
        "carousel__next",
        { "carousel__next--disabled": p.value },
        i.class
      ] }), (l == null ? void 0 : l()) || Y(Zt, { name: b() }));
      return [T, c];
    };
  }
}), Qa = ae({
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
    const o = st(Fe);
    if (!o)
      return () => "";
    const i = u(() => o.config.itemsToShow), n = u(() => Ut({
      align: o.config.snapAlign,
      itemsToShow: i.value
    })), l = u(() => e.paginateByItemsToShow && i.value > 1), a = u(() => Math.ceil((o.activeSlide - n.value) / i.value)), v = u(() => Math.ceil(o.slidesCount / i.value)), b = (g) => pa(l.value ? {
      val: a.value,
      max: v.value - 1,
      min: 0
    } : {
      val: o.activeSlide,
      max: o.maxSlide,
      min: o.minSlide
    }) === g;
    return () => {
      var g, p;
      const r = [];
      for (let T = l.value ? 0 : o.minSlide; T <= (l.value ? v.value - 1 : o.maxSlide); T++) {
        const c = fa(o.config.i18n[l.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: T + 1
        }), S = b(T), E = Y("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": S
          },
          "aria-label": c,
          "aria-pressed": S,
          "aria-controls": (p = (g = o.slides[T]) === null || g === void 0 ? void 0 : g.exposed) === null || p === void 0 ? void 0 : p.id,
          title: c,
          disabled: e.disableOnClick,
          onClick: () => o.nav.slideTo(l.value ? Math.floor(T * +o.config.itemsToShow + n.value) : T)
        }), V = Y("li", { class: "carousel__pagination-item", key: T }, E);
        r.push(V);
      }
      return Y("ol", { class: "carousel__pagination" }, r);
    };
  }
}), ea = ae({
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
  setup(e, { attrs: o, slots: i, expose: n }) {
    const l = st(Fe);
    if (aa(Fe, void 0), !l)
      return () => "";
    const a = C(e.index), v = (E) => {
      a.value = E;
    }, b = Ba(), g = () => {
      const E = b.vnode.el;
      return E ? E.getBoundingClientRect() : { width: 0, height: 0 };
    };
    n({
      id: e.id,
      setIndex: v,
      getBoundingRect: g
    });
    const p = u(() => a.value === l.activeSlide), r = u(() => a.value === l.activeSlide - 1), T = u(() => a.value === l.activeSlide + 1), c = u(() => a.value >= l.visibleRange.min && a.value <= l.visibleRange.max), S = u(() => {
      if (l.config.itemsToShow === "auto")
        return;
      const E = l.config.itemsToShow, V = l.config.gap > 0 && E > 1 ? `calc(${100 / E}% - ${l.config.gap * (E - 1) / E}px)` : `${100 / E}%`;
      return l.isVertical ? { height: V } : { width: V };
    });
    return l.slideRegistry.registerSlide(b, e.index), Ia(() => {
      l.slideRegistry.unregisterSlide(b);
    }), e.isClone && (zt(() => {
      Wt(b.vnode);
    }), Ta(() => {
      Wt(b.vnode);
    })), () => {
      var E, V;
      return l.config.enabled ? Y("li", {
        style: [o.style, Object.assign({}, S.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": e.isClone,
          "carousel__slide--visible": c.value,
          "carousel__slide--active": p.value,
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
        isActive: p.value,
        isClone: e.isClone,
        isPrev: r.value,
        isNext: T.value,
        isSliding: l.isSliding,
        isVisible: c.value
      })) : (E = i.default) === null || E === void 0 ? void 0 : E.call(i);
    };
  }
}), Za = (e, o, i, n) => {
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
    return l.startsWith("__:") ? Va(l.substring(3)) : l;
  }
  return o[e.key];
}, el = (e, o, i) => {
  if (!e.colspan) return -1;
  let n = o;
  return i.forEach((l) => {
    let a = Ht(e, l);
    a > 0 && a < n && (n = a);
  }), n;
}, Ht = (e, o) => e.colspan === !1 ? !1 : typeof e.colspan == "function" ? e.colspan(o) : e.colspan, tl = (e, o) => typeof e.preferSlot > "u" ? !0 : e.preferSlot === !1 ? !1 : typeof e.preferSlot == "function" ? e.preferSlot(o) : !0, al = (e, o, i) => {
  if (typeof e != "object" || !e.key || o.indexOf(e.key) > -1) return !1;
  let n = Ht(e, i);
  return typeof e.colspan > "u" ? !0 : (typeof e.colspan < "u" && (typeof e.colspan == "function" ? n = parseInt(e.colspan(i)) : n = parseInt(e.colspan)), n > 0);
}, ll = (e = []) => {
  if (e.length > 0) {
    for (let o = 0; o < e.length; ++o)
      if (e[o].sortable) return e[o].key;
  }
  return "";
}, nl = (e, o) => {
  if (e.length > 0) {
    for (let i = 0; i < e.length; ++i)
      if (e[i].key === o) return e[i];
  }
  return null;
}, ma = (e) => e.type ? `is-${e.type}` : "", ga = /* @__PURE__ */ ae({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new oa() },
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
    H(a, (p) => {
      const r = JSON.parse(JSON.stringify(l.value));
      r[n.column.key] = p, i("update:modelValue", r);
    }), H(() => n.modelValue, (p) => {
      l.value = p, a.value = l.value[n.column.key];
    });
    const b = u(() => ({ ...n.column.slotData, item: l.value })), g = u(() => {
      var p, r, T, c;
      if ((p = n.column.field) != null && p.modalData && typeof ((r = n.column.field) == null ? void 0 : r.modalData) == "object")
        for (let S in n.column.field.modalData)
          if (typeof ((T = n.column.field) == null ? void 0 : T.modalData[S]) == "string" && n.column.field.modalData[S].startsWith("prop:")) {
            let E = n.column.field.modalData[S].substring(5);
            l.value[E];
          } else
            n.column.field.modalData[S];
      return (c = n.column.field) == null ? void 0 : c.modalData;
    });
    return (p, r) => {
      var E, V, ye, O;
      const T = ve("lkt-anchor"), c = ve("lkt-button"), S = ve("lkt-field");
      return p.column.type === B(ht).Anchor ? (d(), $(T, Te(fe({ key: 0 }, p.column.anchor)), {
        default: F(() => [
          Ee(Pe(B(at)(p.column, l.value, p.i)), 1)
        ]),
        _: 1
      }, 16)) : p.column.type === B(ht).Button ? (d(), $(c, fe({ key: 1 }, p.column.button, { prop: l.value }), {
        default: F(() => [
          Ee(Pe(B(at)(p.column, l.value, p.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : p.column.type === B(ht).Field && p.hasInlineEditPerm ? (d(), $(S, fe({ key: 2 }, p.column.field, {
        "read-mode": !p.column.editable || !p.editModeEnabled,
        ref: (G) => v.value = G,
        "slot-data": b.value,
        label: ((E = p.column.field) == null ? void 0 : E.type) === "switch" || ((V = p.column.field) == null ? void 0 : V.type) === "check" ? p.column.label : "",
        "modal-data": g.value,
        prop: l.value,
        modelValue: a.value,
        "onUpdate:modelValue": r[0] || (r[0] = (G) => a.value = G)
      }), null, 16, ["read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : p.column.type === B(ht).Field ? (d(), $(S, fe({ key: 3 }, p.column.field, {
        "read-mode": "",
        ref: (G) => v.value = G,
        "slot-data": b.value,
        label: ((ye = p.column.field) == null ? void 0 : ye.type) === "switch" || ((O = p.column.field) == null ? void 0 : O.type) === "check" ? p.column.label : "",
        "modal-data": g.value,
        prop: l.value,
        "model-value": a.value
      }), null, 16, ["slot-data", "label", "modal-data", "prop", "model-value"])) : (d(), k(x, { key: 4 }, [
        Ee(Pe(B(at)(p.column, l.value, p.i, p.columns)), 1)
      ], 64));
    };
  }
}), Ce = class Ce {
};
Ce.navButtonSlot = "", Ce.dropButtonSlot = "", Ce.editButtonSlot = "", Ce.createButtonSlot = "", Ce.defaultEmptySlot = void 0, Ce.defaultSaveIcon = "", Ce.defaultNoResultsMessage = "No results";
let K = Ce;
const ol = /* @__PURE__ */ ae({
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
    const i = o, n = e, l = u(() => K.dropButtonSlot !== ""), a = u(() => K.dropButtonSlot), v = u(() => ia(n.config.resourceData, n.item));
    return (b, g) => {
      const p = ve("lkt-button");
      return d(), $(p, fe({ palette: "table-delete" }, n.config, {
        disabled: b.disabled,
        "resource-data": v.value,
        onClick: g[0] || (g[0] = la((r) => i("click", r), ["prevent", "stop"]))
      }), {
        default: F(() => [
          l.value ? (d(), $(Be(a.value), { key: 0 })) : A("", !0)
        ]),
        _: 1
      }, 16, ["disabled", "resource-data"]);
    };
  }
}), il = /* @__PURE__ */ ae({
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
    const i = o, n = e, l = u(() => K.editButtonSlot !== ""), a = u(() => K.editButtonSlot), v = u(() => ia(n.config.resourceData, n.item));
    return (b, g) => {
      const p = ve("lkt-button");
      return d(), $(p, fe({ palette: "table-edit" }, n.config, {
        disabled: b.disabled,
        "resource-data": v.value,
        onClick: g[0] || (g[0] = la((r) => i("click"), ["prevent", "stop"]))
      }), {
        default: F(() => [
          l.value ? (d(), $(Be(a.value), { key: 0 })) : A("", !0)
        ]),
        _: 1
      }, 16, ["disabled", "resource-data"]);
    };
  }
}), rl = ["data-i", "data-draggable"], ul = ["data-i"], sl = {
  key: 1,
  "data-role": "invalid-drag-indicator"
}, dl = {
  key: 2,
  class: "lkt-table-nav-cell"
}, cl = { class: "lkt-table-nav-container" }, vl = ["colspan"], fl = ["colspan"], pl = ["data-column", "colspan", "title"], ml = {
  key: 7,
  class: "lkt-table-col-drop"
}, gl = {
  key: 8,
  class: "lkt-table-col-edit"
}, bl = /* @__PURE__ */ ae({
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
    const i = na(), n = o, l = e, a = C(l.modelValue);
    let v = typeof l.rowDisplayType == "function" ? l.rowDisplayType(a.value, l.i) : l.rowDisplayType;
    v || (v = Ze.Auto);
    const b = [Ze.Auto, Ze.PreferCustomItem].includes(v), g = [Ze.Auto, Ze.PreferItem].includes(v), p = C((Z = l.editButton.anchor) == null ? void 0 : Z.to);
    for (let f in a.value) p.value = ua(p.value, ":" + f, a.value[f]);
    const r = (f) => n("click", f), T = (f, h) => {
      n("show", f, h);
    }, c = u(() => {
      let f = [], h = !1;
      return typeof l.disabledDrag == "function" ? h = l.disabledDrag(a.value) : h = Ae.value === !0, !h && l.sortable && l.isDraggable ? f.push("handle") : h && f.push("disabled"), f.join(" ");
    }), S = u(() => K.navButtonSlot !== ""), E = u(() => K.navButtonSlot), V = () => {
      n("item-up", l.i);
    }, ye = () => {
      n("item-down", l.i);
    }, O = () => {
      n("item-drop", l.i);
    }, G = () => {
    };
    H(() => l.modelValue, (f) => a.value = f), H(a, (f) => {
      n("update:modelValue", f);
    }, { deep: !0 });
    const ne = u(() => typeof l.renderDrag == "function" ? l.renderDrag(a.value) : l.renderDrag === !0), Ae = u(() => typeof l.disabledDrag == "function" ? l.disabledDrag(a.value) : l.disabledDrag === !0);
    return (f, h) => {
      const U = ve("lkt-button");
      return d(), k("tr", {
        "data-i": f.i,
        "data-draggable": f.isDraggable,
        class: re({ "type-custom-item": B(b), "type-item": B(g) })
      }, [
        f.sortable && f.isDraggable && f.editModeEnabled && ne.value ? (d(), k("td", {
          key: 0,
          "data-role": "drag-indicator",
          class: re(c.value),
          "data-i": f.i
        }, h[3] || (h[3] = [
          q("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]), 10, ul)) : f.sortable && f.editModeEnabled && ne.value ? (d(), k("td", sl, h[4] || (h[4] = [
          q("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]))) : A("", !0),
        f.addNavigation && f.editModeEnabled ? (d(), k("td", dl, [
          q("div", cl, [
            De(U, {
              palette: "table-nav",
              disabled: f.i === 0,
              onClick: V
            }, {
              default: F(() => [
                S.value ? (d(), $(Be(E.value), {
                  key: 0,
                  direction: "up"
                })) : (d(), k(x, { key: 1 }, [
                  h[5] || (h[5] = q("i", { class: "" }, null, -1)),
                  h[6] || (h[6] = Ee(" UP "))
                ], 64))
              ]),
              _: 1
            }, 8, ["disabled"]),
            De(U, {
              palette: "table-nav",
              disabled: f.latestRow,
              onClick: ye
            }, {
              default: F(() => [
                S.value ? (d(), $(Be(E.value), {
                  key: 0,
                  direction: "down"
                })) : (d(), k(x, { key: 1 }, [
                  h[7] || (h[7] = q("i", { class: "" }, null, -1)),
                  h[8] || (h[8] = Ee(" DOWN "))
                ], 64))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : A("", !0),
        f.displayHiddenColumnsIndicator ? (d(), k("td", {
          key: 3,
          onClick: h[0] || (h[0] = (L) => T(L, f.i)),
          "data-role": "show-more",
          class: re(f.hiddenIsVisible ? "state-open" : "")
        }, null, 2)) : A("", !0),
        B(b) && B(i)[`item-${f.i}`] ? (d(), k("td", {
          key: "td" + f.i,
          colspan: f.visibleColumns.length
        }, [
          z(f.$slots, `item-${f.i}`, {
            item: a.value,
            index: f.i
          })
        ], 8, vl)) : B(g) && B(i).item ? (d(), k("td", {
          key: "td" + f.i,
          colspan: f.visibleColumns.length
        }, [
          z(f.$slots, "item", {
            item: a.value,
            index: f.i
          })
        ], 8, fl)) : (d(!0), k(x, { key: 6 }, ie(f.visibleColumns, (L) => (d(), k(x, null, [
          B(al)(L, f.emptyColumns, a.value) ? (d(), k("td", {
            key: "td" + f.i,
            "data-column": L.key,
            colspan: B(Ht)(L, a.value),
            title: B(at)(L, a.value, f.i, f.visibleColumns),
            class: re(B(ma)(L)),
            onClick: h[2] || (h[2] = (Q) => r(Q))
          }, [
            f.$slots[L.key] && B(tl)(L, a.value) ? z(f.$slots, L.key, {
              key: 0,
              value: a.value[L.key],
              item: a.value,
              column: L,
              i: f.i
            }) : a.value ? (d(), $(ga, {
              key: 1,
              modelValue: a.value,
              "onUpdate:modelValue": h[1] || (h[1] = (Q) => a.value = Q),
              column: L,
              columns: f.visibleColumns,
              "edit-mode-enabled": f.editModeEnabled,
              "has-inline-edit-perm": f.hasInlineEditPerm,
              i: f.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : A("", !0)
          ], 10, pl)) : A("", !0)
        ], 64))), 256)),
        f.canDrop && f.editModeEnabled ? (d(), k("td", ml, [
          De(ol, {
            config: f.dropButton,
            item: a.value,
            onClick: O
          }, null, 8, ["config", "item"])
        ])) : A("", !0),
        f.canEdit && f.editModeEnabled ? (d(), k("td", gl, [
          De(il, {
            config: f.editButton,
            item: a.value,
            onClick: G
          }, null, 8, ["config", "item"])
        ])) : A("", !0)
      ], 10, rl);
    };
  }
}), yl = { "data-role": "hidden-row" }, hl = ["colspan"], kl = ["data-column"], Sl = ["data-i"], wl = ["data-column", "title"], Cl = /* @__PURE__ */ ae({
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
    return H(() => n.modelValue, (v) => l.value = v), H(l, () => i("update:modelValue", l.value)), (v, b) => rt((d(), k("tr", yl, [
      q("td", { colspan: v.hiddenColumnsColSpan }, [
        q("table", null, [
          q("tr", null, [
            (d(!0), k(x, null, ie(v.hiddenColumns, (g) => (d(), k("th", {
              "data-column": g.key
            }, [
              q("div", null, Pe(g.label), 1)
            ], 8, kl))), 256))
          ]),
          q("tr", { "data-i": v.i }, [
            (d(!0), k(x, null, ie(v.hiddenColumns, (g, p) => (d(), k("td", {
              "data-column": g.key,
              title: B(at)(g, l.value, p, v.hiddenColumns),
              onClick: b[1] || (b[1] = (r) => a(r))
            }, [
              v.$slots[g.key] ? z(v.$slots, g.key, {
                key: 0,
                value: l.value[g.key],
                item: l.value,
                column: g,
                i: p
              }) : (d(), $(ga, {
                key: 1,
                column: g,
                columns: v.hiddenColumns,
                modelValue: l.value,
                "onUpdate:modelValue": b[0] || (b[0] = (r) => l.value = r),
                i: p,
                "edit-mode-enabled": v.editModeEnabled,
                "has-inline-edit-perm": v.hasInlineEditPerm
              }, null, 8, ["column", "columns", "modelValue", "i", "edit-mode-enabled", "has-inline-edit-perm"]))
            ], 8, wl))), 256))
          ], 8, Sl)
        ])
      ], 8, hl)
    ], 512)), [
      [ut, v.hiddenIsVisible]
    ]);
  }
}), ta = /* @__PURE__ */ ae({
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
    var p;
    const i = o, n = e, l = u(() => K.createButtonSlot !== ""), a = u(() => K.createButtonSlot), v = {
      ...(p = n.config) == null ? void 0 : p.modalData,
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
          l.value ? (d(), $(Be(a.value), { key: 0 })) : A("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), Dl = ["data-column", "data-sortable", "data-sort", "colspan", "title"], Bl = /* @__PURE__ */ ae({
  __name: "TableHeader",
  props: {
    column: { default: () => new oa() },
    sortBy: { default: "" },
    sortDirection: { default: "" },
    amountOfColumns: { default: 0 },
    items: { default: () => [] }
  },
  emits: [
    "click"
  ],
  setup(e, { emit: o }) {
    const i = o, n = e, l = u(() => el(n.column, n.amountOfColumns, n.items)), a = u(() => n.column.sortable === !0), v = u(() => a.value && n.sortBy === n.column.key ? n.sortDirection : ""), b = u(() => ra(n.column.label)), g = u(() => a.value && n.sortBy === n.column.key ? n.sortDirection === Oe.Asc ? tt.defaultTableSortAscIcon : n.sortDirection === Oe.Desc ? tt.defaultTableSortDescIcon : "" : ""), p = () => i("click", n.column);
    return (r, T) => (d(), k("th", {
      "data-column": r.column.key,
      "data-sortable": a.value,
      "data-sort": v.value,
      colspan: l.value,
      title: b.value,
      class: re(B(ma)(r.column)),
      onClick: p
    }, [
      q("div", null, [
        Ee(Pe(b.value) + " ", 1),
        g.value ? (d(), k("i", {
          key: 0,
          class: re(g.value)
        }, null, 2)) : A("", !0)
      ])
    ], 10, Dl));
  }
}), Il = ["id"], Tl = {
  key: 0,
  class: "lkt-table-page-buttons"
}, El = { class: "switch-edition-mode" }, Al = {
  key: 1,
  class: "lkt-table-page-buttons"
}, Vl = {
  key: 2,
  class: "lkt-table-page-filters"
}, Nl = { class: "lkt-table" }, Ml = { key: 0 }, _l = {
  key: 0,
  "data-role": "drag-indicator"
}, Rl = { key: 1 }, $l = { key: 2 }, Ll = {
  key: 3,
  class: "lkt-table-col-drop"
}, Ol = {
  key: 4,
  class: "lkt-table-col-edit"
}, Pl = ["id"], Fl = ["id"], Ul = ["data-i"], jl = ["data-i"], zl = ["id"], Hl = { class: "lkt-carousel-slide" }, xl = { class: "lkt-carousel-slide" }, ql = {
  key: 3,
  class: "lkt-table-empty"
}, Gl = {
  key: 5,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, Xl = /* @__PURE__ */ ae({
  __name: "LktTable",
  props: /* @__PURE__ */ Aa({
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
  }, Na(Ma)),
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
    var Gt, Xt;
    const n = i, l = na(), a = e, v = {}, b = C(typeof a.sorter == "function" ? a.sorter : Za), g = C(ll(a.columns)), p = C(Oe.Asc), r = C(a.modelValue), T = C(v), c = C(null), S = C(a.columns), E = C((Gt = a.paginator) == null ? void 0 : Gt.modelValue), V = C(a.loading), ye = C(!1), O = C(a.perms), G = C(null), ne = C(null), Ae = C(null), Z = C({}), f = C(new Ra({ items: r.value }, a.dataStateConfig)), h = C(a.editMode), U = C(0), L = C(null), Q = C(((Xt = a.carousel) == null ? void 0 : Xt.currentSlide) || 0), R = C(kt(a.saveButton, tt.defaultSaveButton)), Ie = C(kt(a.createButton, tt.defaultCreateButton)), Dt = C(kt(a.editModeButton, tt.defaultEditModeButton)), Ue = C(kt(a.dropButton, tt.defaultDropButton)), j = C(!1);
    H(V, (t) => n("update:loading", t)), H(E, (t) => n("page", t));
    const Bt = (t) => {
      O.value = t;
    }, Ve = (t) => {
      var m;
      Array.isArray(t.data) && ((!a.paginator || ![St.LoadMore, St.Infinite].includes((m = a.paginator) == null ? void 0 : m.type)) && r.value.splice(0, r.value.length), r.value = [...r.value, ...t.data]), V.value = !1, ye.value = !0, f.value.store({ items: r.value }).turnStoredIntoOriginal(), j.value = !1, yt(() => {
        U.value = Le(), lt.value, n("read-response", t);
      });
    }, It = () => yt(() => V.value = !0), pe = () => {
      G.value.doRefresh();
    }, ue = _a(12), Ne = u(() => {
      if (!a.hideEmptyColumns) return [];
      let t = [];
      return S.value.forEach((m) => {
        let _ = m.key, W = !1;
        r.value.forEach((te) => {
          if (typeof te.checkEmpty == "function")
            return te.checkEmpty(te);
          te[_] && (W = !0);
        }), W || t.push(_);
      }), t;
    }), se = u(() => S.value.filter((t) => !t.hidden)), je = u(() => S.value.filter((t) => t.hidden)), dt = u(() => {
      let t = se.value.length + 1;
      return a.sortable && ++t, t;
    }), ze = u(() => S.value.filter((t) => t.isForRowKey)), me = u(() => je.value.length > 0 && !a.sortable), He = u(() => S.value.map((t) => t.key)), oe = u(() => {
      let t = [];
      for (let m in l) He.value.indexOf(m) !== -1 && t.push(m);
      return t;
    }), xe = u(() => {
      let t = [];
      for (let m in l) m.indexOf("slide-") !== -1 && t.push(m);
      return t;
    }), qe = u(() => {
      var t;
      return a.hiddenSave || V.value || !((t = R.value) != null && t.resource || R.value.type) ? !1 : h.value && j.value ? !0 : h.value;
    }), Tt = u(() => bt.value && r.value.length >= a.requiredItemsForTopCreate || Ke.value ? !0 : qe.value || h.value && he.value), lt = u(() => {
      var t, m;
      return U.value, typeof ((t = R.value) == null ? void 0 : t.disabled) == "function" ? R.value.disabled({
        value: r.value,
        dataState: f.value
      }) : typeof ((m = R.value) == null ? void 0 : m.disabled) == "boolean" ? R.value.disabled : !j.value;
    }), ct = u(() => r.value.length), Et = u(() => {
      var t;
      return {
        items: r.value,
        ...(t = R.value) == null ? void 0 : t.resourceData
      };
    }), vt = u(() => a.titleTag === "" ? "h2" : a.titleTag), ft = u(() => a.wrapContentTag === "" ? "div" : a.wrapContentTag), Me = u(() => ra(a.title)), Ge = u(() => {
      var t;
      return (t = a.drag) == null ? void 0 : t.enabled;
    }), he = u(() => O.value.includes(Se.Create)), Xe = u(() => O.value.includes("read")), de = u(() => O.value.includes(Se.Update)), ge = u(() => O.value.includes(Se.Edit)), ke = u(() => O.value.includes(Se.InlineEdit)), _e = u(() => O.value.includes(Se.ModalCreate)), Ye = u(() => O.value.includes(Se.InlineCreate)), pt = u(() => O.value.includes(Se.InlineCreateEver)), be = u(() => O.value.includes(Se.Drop)), Re = u(() => O.value.includes(Se.SwitchEditMode)), Ke = u(() => !Re.value || !de.value && !be.value || !de.value && be.value ? !1 : !V.value), nt = u(() => {
      var t;
      return (typeof ((t = a.paginator) == null ? void 0 : t.type) < "u" && [St.LoadMore, St.Infinite].includes(a.paginator.type) || !V.value) && r.value.length > 0;
    }), We = (t) => {
      let m = t.target;
      if (typeof m.dataset.column > "u")
        do
          m = m.parentNode;
        while (typeof m.dataset.column > "u" && m.tagName !== "TABLE" && m.tagName !== "body");
      if (m.tagName === "TD" && (m = m.parentNode, m = m.dataset.i, typeof m < "u"))
        return r.value[m];
    }, At = (t) => r.value[t], Vt = (t) => {
      var m;
      return (m = c.value) == null ? void 0 : m.querySelector(`[data-i="${t}"]`);
    }, mt = (t) => T.value["tr_" + t] === !0, ot = (t) => {
      t && t.sortable && (r.value = r.value.sort((m, _) => b.value(m, _, t, p.value)), p.value = p.value === Oe.Asc ? Oe.Desc : Oe.Asc, g.value = t.key, U.value = Le(), n("sort", [g.value, p.value]));
    }, gt = (t) => {
      n("click", t);
    }, Je = (t, m) => {
      let _ = "tr_" + m;
      T.value[_] = typeof T.value[_] > "u" ? !0 : !T.value[_];
    }, s = (t) => {
      var _, W, te, ce, it, M, I, J;
      let m = parseInt((ce = (te = (W = (_ = t == null ? void 0 : t.originalEvent) == null ? void 0 : _.toElement) == null ? void 0 : W.closest("tr")) == null ? void 0 : te.dataset) == null ? void 0 : ce.i);
      return !(typeof ((it = a.drag) == null ? void 0 : it.isValid) == "function" && !((M = a.drag) != null && M.isValid(r.value[m])) || typeof ((I = a.drag) == null ? void 0 : I.isValid) == "boolean" && !((J = a.drag) != null && J.isValid));
    }, y = (t) => {
      var m, _;
      return typeof ((m = a.drag) == null ? void 0 : m.isDraggable) == "function" ? (_ = a.drag) == null ? void 0 : _.isDraggable(t) : !0;
    }, w = () => {
      if (he.value) {
        n("click-create");
        return;
      }
      if (pt.value)
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
    }, N = () => V.value = !0, X = () => V.value = !1, le = (t, m) => {
      var _, W, te;
      if (!((_ = R.value) != null && _.type && [
        Ot.Split,
        Ot.SplitEver,
        Ot.SplitLazy
      ].includes((W = R.value) == null ? void 0 : W.type))) {
        if (n("before-save"), (te = R.value) != null && te.resource && (V.value = !1, !m.success)) {
          n("error", m.httpStatus);
          return;
        }
        f.value.turnStoredIntoOriginal(), j.value = !1, n("save", m);
      }
    }, ee = (t, m, _) => {
      if (_ >= t.length) {
        let W = _ - t.length + 1;
        for (; W--; ) t.push(void 0);
      }
      return t.splice(_, 0, t.splice(m, 1)[0]), t;
    }, Nt = (t) => {
      ee(r.value, t, t - 1), U.value = Le();
    }, Mt = (t) => {
      ee(r.value, t, t + 1), U.value = Le();
    }, Qe = (t) => {
      r.value.splice(t, 1), U.value = Le();
    }, ba = () => {
      var t;
      Z.value && typeof ((t = Z.value) == null ? void 0 : t.destroy) == "function" && (Z.value.destroy(), Z.value = {});
    }, xt = () => {
      L.value || (L.value = document.getElementById("lkt-table-body-" + ue)), Z.value = new $a(L.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(t) {
          let m = t.oldIndex, _ = t.newIndex;
          r.value.splice(_, 0, r.value.splice(m, 1)[0]), U.value = Le(), n("drag-end", r.value[_]);
        },
        onMove: function(t, m) {
          return s(t);
        }
      });
    }, _t = (t, m, _ = !1) => {
      let W = [U.value, ue, "row", m];
      return _ && W.push("hidden"), ze.value.forEach((te) => {
        let ce = String(t[te.key]).toLowerCase();
        ce.length > 50 && (ce = ce.substring(0, 50)), ce = ua(ce, " ", "-"), W.push(ce);
      }), W.join("-");
    }, qt = u(() => typeof a.createEnabledValidator == "function" ? a.createEnabledValidator({ items: r.value }) : !0), bt = u(() => pt.value || he.value && h.value || Ye.value && h.value || _e.value && h.value), ya = u(() => [et.Ol, et.Ul].includes(a.type)), Rt = (t, m) => typeof a.itemDisplayChecker == "function" ? a.itemDisplayChecker(t) : !0;
    zt(() => {
      var t;
      a.initialSorting && ot(nl(a.columns, g.value)), f.value.store({ items: r.value }).turnStoredIntoOriginal(), j.value = !1, (t = a.drag) != null && t.enabled && yt(() => {
        xt();
      });
    }), H(() => {
      var t;
      return (t = a.drag) == null ? void 0 : t.enabled;
    }, (t) => {
      t ? xt() : ba();
    }), H(() => a.perms, (t) => O.value = t), H(O, (t) => n("update:perms", t)), H(() => a.editMode, (t) => h.value = t), H(() => a.columns, (t) => S.value = t, { deep: !0 }), H(() => a.modelValue, (t) => r.value = t, { deep: !0 }), H(r, (t) => {
      f.value.increment({ items: t }), j.value = f.value.changed(), n("update:modelValue", t);
    }, { deep: !0 }), o({
      getItemByEvent: We,
      getItemByIndex: At,
      getRowByIndex: Vt,
      doRefresh: pe,
      getHtml: () => ne.value,
      turnStoredIntoOriginal: () => {
        f.value.turnStoredIntoOriginal(), yt(() => {
          U.value = Le();
        });
      }
    });
    const ha = u(() => typeof K.defaultEmptySlot < "u"), ka = u(() => K.defaultEmptySlot), Sa = u(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled ? !1 : typeof a.drag.canRender > "u" ? !0 : a.drag.canRender), wa = u(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled || typeof a.drag.isDisabled > "u" ? !1 : a.drag.isDisabled);
    return (t, m) => {
      const _ = ve("lkt-button"), W = ve("lkt-field"), te = ve("lkt-loader"), ce = ve("lkt-paginator");
      return d(), k("section", {
        ref_key: "element",
        ref: ne,
        class: "lkt-table-page",
        id: "lkt-table-page-" + B(ue)
      }, [
        Me.value || B(l).title ? (d(), k("header", {
          key: 0,
          class: re(t.headerClass)
        }, [
          Me.value ? (d(), $(Be(vt.value), { key: 0 }, {
            default: F(() => [
              t.titleIcon ? (d(), k("i", {
                key: 0,
                class: re(t.titleIcon)
              }, null, 2)) : A("", !0),
              Ee(" " + Pe(Me.value), 1)
            ]),
            _: 1
          })) : A("", !0),
          B(l).title ? z(t.$slots, "title", { key: 1 }) : A("", !0)
        ], 2)) : A("", !0),
        (d(), $(Be(ft.value), {
          class: re(["lkt-table-page-content-wrapper", t.wrapContentClass])
        }, {
          default: F(() => {
            var it;
            return [
              Tt.value ? (d(), k("div", Tl, [
                rt(De(_, fe({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: Ae
                }, R.value, {
                  disabled: lt.value,
                  "modal-data": Et.value,
                  onLoading: N,
                  onLoaded: X,
                  onClick: le
                }), {
                  split: F(({ doClose: M, doRootClick: I }) => [
                    z(t.$slots, "button-save-split", {
                      doClose: M,
                      doRootClick: I,
                      dataState: f.value,
                      onButtonLoading: N,
                      onButtonLoaded: X
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
                  [ut, qe.value]
                ]),
                bt.value && r.value.length >= t.requiredItemsForTopCreate ? (d(), $(ta, {
                  key: 0,
                  config: Ie.value,
                  disabled: !qt.value,
                  onClick: w,
                  onAppend: D
                }, null, 8, ["config", "disabled"])) : A("", !0),
                q("div", El, [
                  rt(De(W, fe(Dt.value, {
                    modelValue: h.value,
                    "onUpdate:modelValue": m[0] || (m[0] = (M) => h.value = M)
                  }), null, 16, ["modelValue"]), [
                    [ut, Ke.value]
                  ])
                ])
              ])) : A("", !0),
              B(l).buttons ? (d(), k("div", Al, [
                z(t.$slots, "buttons")
              ])) : A("", !0),
              ye.value && B(l).filters ? (d(), k("div", Vl, [
                z(t.$slots, "filters", {
                  items: r.value,
                  isLoading: V.value
                })
              ])) : A("", !0),
              rt(q("div", Nl, [
                t.type === B(et).Table ? (d(), k("table", Ml, [
                  q("thead", null, [
                    q("tr", null, [
                      Ge.value && h.value ? (d(), k("th", _l)) : A("", !0),
                      t.addNavigation && h.value ? (d(), k("th", Rl)) : A("", !0),
                      me.value ? (d(), k("th", $l)) : A("", !0),
                      (d(!0), k(x, null, ie(se.value, (M) => (d(), k(x, null, [
                        Ne.value.indexOf(M.key) === -1 ? (d(), $(Bl, {
                          key: 0,
                          column: M,
                          "sort-by": g.value,
                          "sort-direction": p.value,
                          "amount-of-columns": t.columns.length,
                          items: r.value,
                          onClick: (I) => ot(M)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : A("", !0)
                      ], 64))), 256)),
                      be.value && h.value ? (d(), k("th", Ll)) : A("", !0),
                      ge.value && de.value && h.value ? (d(), k("th", Ol)) : A("", !0)
                    ])
                  ]),
                  q("tbody", {
                    ref_key: "tableBody",
                    ref: c,
                    id: "lkt-table-body-" + B(ue)
                  }, [
                    (d(!0), k(x, null, ie(r.value, (M, I) => rt((d(), $(bl, {
                      modelValue: r.value[I],
                      "onUpdate:modelValue": (J) => r.value[I] = J,
                      key: _t(M, I),
                      i: I,
                      "drop-button": Ue.value,
                      "edit-button": t.editButton,
                      "display-hidden-columns-indicator": me.value,
                      "is-draggable": y(M),
                      sortable: Ge.value,
                      "visible-columns": se.value,
                      "empty-columns": Ne.value,
                      "add-navigation": t.addNavigation,
                      "hidden-is-visible": mt(I),
                      "latest-row": I + 1 === ct.value,
                      "can-drop": be.value && h.value,
                      "can-edit": ge.value && de.value && h.value,
                      "edit-mode-enabled": h.value,
                      "has-inline-edit-perm": ke.value,
                      "row-display-type": t.rowDisplayType,
                      "render-drag": Sa.value,
                      "disabled-drag": wa.value,
                      onClick: gt,
                      onShow: Je,
                      onItemUp: Nt,
                      onItemDown: Mt,
                      onItemDrop: Qe
                    }, Yt({ _: 2 }, [
                      B(l)[`item-${I}`] ? {
                        name: `item-${I}`,
                        fn: F((J) => [
                          z(t.$slots, `item-${I}`, Te({
                            [t.slotItemVar || ""]: J.item,
                            index: I
                          }))
                        ]),
                        key: "0"
                      } : B(l).item ? {
                        name: "item",
                        fn: F((J) => [
                          z(t.$slots, "item", Te({
                            [t.slotItemVar || ""]: J.item,
                            index: I
                          }))
                        ]),
                        key: "1"
                      } : void 0,
                      ie(oe.value, (J) => ({
                        name: J,
                        fn: F(($e) => [
                          z(t.$slots, J, Te({
                            [t.slotItemVar || ""]: $e.item,
                            value: $e.value,
                            column: $e.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "drop-button", "edit-button", "display-hidden-columns-indicator", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "hidden-is-visible", "latest-row", "can-drop", "can-edit", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag"])), [
                      [ut, Rt(r.value[I])]
                    ])), 128)),
                    je.value.length > 0 ? (d(!0), k(x, { key: 0 }, ie(r.value, (M, I) => (d(), $(Cl, {
                      modelValue: r.value[I],
                      "onUpdate:modelValue": (J) => r.value[I] = J,
                      key: _t(M, I, !0),
                      i: I,
                      "hidden-columns": je.value,
                      "hidden-columns-col-span": dt.value,
                      "is-draggable": y(M),
                      sortable: Ge.value,
                      "visible-columns": se.value,
                      "empty-columns": Ne.value,
                      "hidden-is-visible": mt(I),
                      "edit-mode-enabled": h.value,
                      "has-inline-edit-perm": ke.value,
                      onClick: gt,
                      onShow: Je
                    }, Yt({ _: 2 }, [
                      ie(oe.value, (J) => ({
                        name: J,
                        fn: F(($e) => [
                          z(t.$slots, J, Te({
                            [t.slotItemVar || ""]: $e.item,
                            value: $e.value,
                            column: $e.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "hidden-columns", "hidden-columns-col-span", "is-draggable", "sortable", "visible-columns", "empty-columns", "hidden-is-visible", "edit-mode-enabled", "has-inline-edit-perm"]))), 128)) : A("", !0)
                  ], 8, Pl)
                ])) : t.type === B(et).Item ? (d(), k("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: c,
                  id: "lkt-table-body-" + B(ue),
                  class: re(["lkt-table-items-container", t.itemsContainerClass])
                }, [
                  (d(!0), k(x, null, ie(r.value, (M, I) => (d(), k(x, null, [
                    Rt(M) ? (d(), k("div", {
                      class: "lkt-table-item",
                      "data-i": I,
                      key: _t(M, I)
                    }, [
                      z(t.$slots, "item", Te({
                        [t.slotItemVar || ""]: M,
                        index: I,
                        editing: h.value,
                        canCreate: he.value,
                        canRead: Xe.value,
                        canUpdate: de.value,
                        canDrop: be.value,
                        isLoading: V.value,
                        doDrop: () => Qe(I)
                      }))
                    ], 8, Ul)) : A("", !0)
                  ], 64))), 256))
                ], 10, Fl)) : ya.value ? (d(), $(Be(t.type), {
                  key: 2,
                  class: re(["lkt-table-items-container", t.itemsContainerClass])
                }, {
                  default: F(() => [
                    (d(!0), k(x, null, ie(r.value, (M, I) => (d(), k(x, null, [
                      Rt(M) ? (d(), k("li", {
                        key: 0,
                        class: "lkt-table-item",
                        "data-i": I
                      }, [
                        z(t.$slots, "item", Te({
                          [t.slotItemVar || ""]: M,
                          index: I,
                          editing: h.value,
                          canCreate: he.value,
                          canRead: Xe.value,
                          canUpdate: de.value,
                          canDrop: be.value,
                          isLoading: V.value,
                          doDrop: () => Qe(I)
                        }))
                      ], 8, jl)) : A("", !0)
                    ], 64))), 256))
                  ]),
                  _: 3
                }, 8, ["class"])) : t.type === B(et).Carousel ? (d(), k("div", {
                  key: 3,
                  ref_key: "tableBody",
                  ref: c,
                  id: "lkt-table-body-" + B(ue),
                  class: re(["lkt-table-items-container", t.itemsContainerClass])
                }, [
                  De(B(Ya), fe({
                    modelValue: Q.value,
                    "onUpdate:modelValue": m[1] || (m[1] = (M) => Q.value = M)
                  }, t.carousel, {
                    "wrap-around": ((it = t.carousel) == null ? void 0 : it.infinite) === !0
                  }), {
                    addons: F(() => [
                      De(B(Ja)),
                      De(B(Qa))
                    ]),
                    default: F(() => [
                      (d(!0), k(x, null, ie(xe.value, (M, I) => (d(), $(B(ea), {
                        key: M,
                        index: I
                      }, {
                        default: F(() => [
                          q("div", Hl, [
                            z(t.$slots, M)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (d(!0), k(x, null, ie(r.value, (M, I) => (d(), $(B(ea), {
                        key: t.slide,
                        index: I
                      }, {
                        default: F(() => [
                          q("div", xl, [
                            z(t.$slots, "item", Te({
                              [t.slotItemVar || ""]: M,
                              index: I,
                              editing: h.value,
                              canCreate: he.value,
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
                  }, 16, ["modelValue", "wrap-around"])
                ], 10, zl)) : A("", !0)
              ], 512), [
                [ut, nt.value]
              ]),
              !V.value && r.value.length === 0 ? (d(), k("div", ql, [
                B(l).empty ? z(t.$slots, "empty", { key: 0 }) : ha.value ? (d(), $(Be(ka.value), {
                  key: 1,
                  message: t.noResultsText
                }, null, 8, ["message"])) : t.noResultsText ? (d(), k(x, { key: 2 }, [
                  Ee(Pe(t.noResultsText), 1)
                ], 64)) : A("", !0)
              ])) : A("", !0),
              V.value ? (d(), $(te, { key: 4 })) : A("", !0),
              bt.value || B(l).bottomButtons ? (d(), k("div", Gl, [
                bt.value && r.value.length >= t.requiredItemsForBottomCreate ? (d(), $(ta, {
                  key: 0,
                  config: Ie.value,
                  disabled: !qt.value,
                  onClick: w,
                  onAppend: D
                }, null, 8, ["config", "disabled"])) : A("", !0),
                z(t.$slots, "bottom-buttons")
              ])) : A("", !0),
              t.paginator && Object.keys(t.paginator).length > 0 ? (d(), $(ce, fe({
                key: 6,
                ref_key: "paginatorRef",
                ref: G
              }, t.paginator, {
                modelValue: E.value,
                "onUpdate:modelValue": m[2] || (m[2] = (M) => E.value = M),
                onLoading: It,
                onPerms: Bt,
                onResponse: Ve
              }), null, 16, ["modelValue"])) : A("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, Il);
    };
  }
}), tn = {
  install: (e) => {
    e.component("lkt-table") === void 0 && e.component("lkt-table", Xl);
  }
}, an = (e) => (K.navButtonSlot = e, !0), ln = (e) => (K.dropButtonSlot = e, !0), nn = (e) => (K.createButtonSlot = e, !0), on = (e) => {
  K.defaultEmptySlot = e;
}, rn = (e) => {
  K.defaultSaveIcon = e;
};
export {
  dn as Column,
  cn as createColumn,
  tn as default,
  nn as setTableCreateButtonSlot,
  ln as setTableDropButtonSlot,
  on as setTableEmptySlot,
  an as setTableNavButtonSlot,
  rn as setTableSaveIcon
};
