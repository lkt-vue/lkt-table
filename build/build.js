import { defineComponent as Ce, computed as r, ref as C, shallowReactive as Qt, watch as G, watchEffect as Xt, onMounted as ta, onBeforeUnmount as Ja, reactive as Yt, provide as Sa, h as Q, useId as Qa, inject as It, getCurrentInstance as Za, onUnmounted as _a, onUpdated as el, cloneVNode as tl, resolveComponent as re, createBlock as R, createElementBlock as S, unref as p, openBlock as c, mergeProps as K, withCtx as z, createTextVNode as _e, toDisplayString as et, normalizeProps as ge, normalizeClass as J, Fragment as q, renderList as ye, useSlots as Ca, createCommentVNode as x, createElementVNode as he, createVNode as be, resolveDynamicComponent as ke, guardReactiveProps as wa, renderSlot as $, mergeDefaults as al, nextTick as Pt, withDirectives as We, vShow as Je, createSlots as ll, normalizeStyle as ma } from "vue";
import { __ as nl } from "lkt-i18n";
import { ColumnType as Ae, FieldType as Qe, MultipleOptionsDisplay as ol, SortDirection as tt, Column as Da, extractPropValue as il, TableRowType as Ee, extractI18nValue as Ta, LktSettings as Be, ensureButtonConfig as je, TablePermission as Re, PaginatorType as Ie, TableType as Le, getDefaultValues as ul, Table as rl, ButtonType as Wt } from "lkt-vue-kernel";
import { Column as Nn, createColumn as Mn } from "lkt-vue-kernel";
import { generateRandomString as sl, replaceAll as dl } from "lkt-string-tools";
import { DataState as cl } from "lkt-data-state";
import vl from "sortablejs";
import { date as fl, findOldestAndNewestDateInObjects as ml, time as pl } from "lkt-date-tools";
/**
 * Vue 3 Carousel 0.14.0
 * (c) 2025
 * @license MIT
 */
const Ia = ["viewport", "carousel"], jt = {
  "bottom-to-top": "btt",
  "left-to-right": "ltr",
  "right-to-left": "rtl",
  "top-to-bottom": "ttb"
}, Ba = [
  "ltr",
  "left-to-right",
  "rtl",
  "right-to-left",
  "ttb",
  "top-to-bottom",
  "btt",
  "bottom-to-top"
], gl = {
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
}, Aa = ["slide", "fade"], Ea = [
  "center",
  "start",
  "end",
  "center-even",
  "center-odd"
], X = {
  autoplay: 0,
  breakpointMode: Ia[0],
  breakpoints: void 0,
  dir: Ba[0],
  enabled: !0,
  gap: 0,
  height: "auto",
  i18n: gl,
  ignoreAnimations: !1,
  itemsToScroll: 1,
  itemsToShow: 1,
  modelValue: 0,
  mouseDrag: !0,
  pauseAutoplayOnHover: !1,
  preventExcessiveDragging: !1,
  slideEffect: Aa[0],
  snapAlign: Ea[0],
  touchDrag: !0,
  transition: 300,
  wrapAround: !1
}, at = Symbol("carousel"), yl = (e) => {
  const i = Qt([]), o = (n) => {
    n !== void 0 ? i.slice(n).forEach((l, t) => {
      var g;
      (g = l.exposed) === null || g === void 0 || g.setIndex(n + t);
    }) : i.forEach((l, t) => {
      var g;
      (g = l.exposed) === null || g === void 0 || g.setIndex(t);
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
      const t = l ?? i.length;
      i.splice(t, 0, n), o(t), e("slide-registered", { slide: n, index: t });
    },
    unregisterSlide: (n) => {
      const l = i.indexOf(n);
      l !== -1 && (e("slide-unregistered", { slide: n, index: l }), i.splice(l, 1), o(l));
    }
  };
};
function bl(e) {
  return e.length === 0 ? 0 : e.reduce((o, n) => o + n, 0) / e.length;
}
function pa({ slides: e, position: i, toShow: o }) {
  const n = [], l = i === "before", t = l ? -o : 0, g = l ? 0 : o;
  if (e.length <= 0)
    return n;
  for (let b = t; b < g; b++) {
    const s = {
      index: l ? b : b + e.length,
      isClone: !0,
      position: i,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${i}-${b}`
    }, k = e[(b % e.length + e.length) % e.length].vnode, T = tl(k, s);
    T.el = null, n.push(T);
  }
  return n;
}
const hl = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function ga(e) {
  if (!e.el || !(e.el instanceof Element))
    return;
  const i = e.el.querySelectorAll(hl);
  for (const o of i)
    o instanceof HTMLElement && !o.hasAttribute("disabled") && o.getAttribute("aria-hidden") !== "true" && o.setAttribute("tabindex", "-1");
}
function kl(e, i) {
  return Object.keys(e).filter((o) => !i.includes(o)).reduce((o, n) => (o[n] = e[n], o), {});
}
function Sl(e) {
  const { isVertical: i, isReversed: o, dragged: n, effectiveSlideSize: l } = e, t = i ? n.y : n.x;
  if (t === 0)
    return 0;
  const g = Math.round(t / l);
  return o ? g : -g;
}
function Ne({ val: e, max: i, min: o }) {
  return i < o ? e : Math.min(Math.max(e, isNaN(o) ? e : o), isNaN(i) ? e : i);
}
function Cl(e) {
  const { transform: i } = window.getComputedStyle(e);
  return i.split(/[(,)]/).slice(1, -1).map((o) => parseFloat(o));
}
function wl(e) {
  let i = 1, o = 1;
  return e.forEach((n) => {
    const l = Cl(n);
    l.length === 6 && (i /= l[0], o /= l[3]);
  }), { widthMultiplier: i, heightMultiplier: o };
}
function Dl(e, i) {
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
function Tl(e, i, o) {
  switch (e) {
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
function Zt({ slideSize: e, viewportSize: i, align: o, itemsToShow: n }) {
  return n !== void 0 ? Dl(o, n) : e !== void 0 && i !== void 0 ? Tl(o, e, i) : 0;
}
function xa(e = "", i = {}) {
  return Object.entries(i).reduce((o, [n, l]) => o.replace(`{${n}}`, String(l)), e);
}
function Va({ val: e, max: i, min: o = 0 }) {
  const n = i - o + 1;
  return ((e - o) % n + n) % n + o;
}
function Jt(e, i = 0) {
  let o = !1, n = 0, l = null;
  function t(...g) {
    if (o)
      return;
    o = !0;
    const b = () => {
      l = requestAnimationFrame((D) => {
        D - n > i ? (n = D, e(...g), o = !1) : b();
      });
    };
    b();
  }
  return t.cancel = () => {
    l && (cancelAnimationFrame(l), l = null, o = !1);
  }, t;
}
function Ut(e, i = "px") {
  if (!(e == null || e === ""))
    return typeof e == "number" || parseFloat(e).toString() === e ? `${e}${i}` : e;
}
const Il = Ce({
  name: "CarouselAria",
  setup() {
    const e = It(at);
    return e ? () => Q("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, xa(e.config.i18n.itemXofY, {
      currentSlide: e.currentSlide + 1,
      slidesCount: e.slidesCount
    })) : () => "";
  }
}), Bl = {
  // time to auto advance slides in ms
  autoplay: {
    default: X.autoplay,
    type: Number
  },
  // an object to store breakpoints
  breakpoints: {
    default: X.breakpoints,
    type: Object
  },
  // controls the breakpoint mode relative to the carousel container or the viewport
  breakpointMode: {
    default: X.breakpointMode,
    validator(e) {
      return Ia.includes(e);
    }
  },
  // enable/disable the carousel component
  enabled: {
    default: X.enabled,
    type: Boolean
  },
  // control the gap between slides
  gap: {
    default: X.gap,
    type: Number
  },
  // control the gap between slides
  height: {
    default: X.height,
    type: [Number, String]
  },
  ignoreAnimations: {
    default: !1,
    type: [Array, Boolean, String]
  },
  // count of items to be scrolled
  itemsToScroll: {
    default: X.itemsToScroll,
    type: Number
  },
  // count of items to showed per view
  itemsToShow: {
    default: X.itemsToShow,
    type: [Number, String]
  },
  // aria-labels and additional text labels
  i18n: {
    default: X.i18n,
    type: Object
  },
  // slide number number of initial slide
  modelValue: {
    default: void 0,
    type: Number
  },
  // toggle mouse dragging.
  mouseDrag: {
    default: X.mouseDrag,
    type: Boolean
  },
  // toggle mouse dragging.
  touchDrag: {
    default: X.touchDrag,
    type: Boolean
  },
  pauseAutoplayOnHover: {
    default: X.pauseAutoplayOnHover,
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
    default: X.snapAlign,
    validator(e) {
      return Ea.includes(e);
    }
  },
  slideEffect: {
    type: String,
    default: X.slideEffect,
    validator(e) {
      return Aa.includes(e);
    }
  },
  // sliding transition time in ms
  transition: {
    default: X.transition,
    type: Number
  },
  // control the gap between slides
  dir: {
    type: String,
    default: X.dir,
    validator(e, i) {
      if (!Ba.includes(e))
        return !1;
      const o = e in jt ? jt[e] : e;
      return ["ttb", "btt"].includes(o) && (!i.height || i.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${e}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: X.wrapAround,
    type: Boolean
  }
}, Al = Ce({
  name: "VueCarousel",
  props: Bl,
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
  setup(e, { slots: i, emit: o, expose: n }) {
    var l;
    const t = yl(o), g = t.getSlides(), b = r(() => g.length), D = C(null), s = C(null), k = C(0), T = r(() => Object.assign(Object.assign(Object.assign({}, X), kl(e, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, X.i18n), e.i18n) })), v = Qt(Object.assign({}, T.value)), I = C((l = e.modelValue) !== null && l !== void 0 ? l : 0), h = C(I.value);
    G(I, (d) => h.value = d);
    const P = C(0), O = r(() => Math.ceil((b.value - 1) / 2)), ce = r(() => b.value - 1), ve = r(() => 0);
    let fe = null, M = null, F = null;
    const B = r(() => k.value + v.gap), H = r(() => {
      const d = v.dir || "ltr";
      return d in jt ? jt[d] : d;
    }), oe = r(() => ["rtl", "btt"].includes(H.value)), me = r(() => ["ttb", "btt"].includes(H.value)), pe = r(() => v.itemsToShow === "auto"), Y = r(() => me.value ? "height" : "width");
    function Me() {
      var d;
      if (!nt.value)
        return;
      const m = (T.value.breakpointMode === "carousel" ? (d = D.value) === null || d === void 0 ? void 0 : d.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, w = Object.keys(e.breakpoints || {}).map((N) => Number(N)).sort((N, te) => +te - +N), A = {};
      w.some((N) => m >= N ? (Object.assign(A, e.breakpoints[N]), A.i18n && Object.assign(A.i18n, T.value.i18n, e.breakpoints[N].i18n), !0) : !1), Object.assign(v, T.value, A);
    }
    const Bt = Jt(() => {
      Me(), lt(), se();
    }), xe = Qt(/* @__PURE__ */ new Set()), Z = C([]);
    function ae({ widthMultiplier: d, heightMultiplier: m }) {
      Z.value = g.map((w) => {
        var A;
        const N = (A = w.exposed) === null || A === void 0 ? void 0 : A.getBoundingRect();
        return {
          width: N.width * d,
          height: N.height * m
        };
      });
    }
    const we = C({
      width: 0,
      height: 0
    });
    function At({ widthMultiplier: d, heightMultiplier: m }) {
      var w;
      const A = ((w = s.value) === null || w === void 0 ? void 0 : w.getBoundingClientRect()) || { width: 0, height: 0 };
      we.value = {
        width: A.width * d,
        height: A.height * m
      };
    }
    function se() {
      if (!s.value)
        return;
      const d = wl(xe);
      if (At(d), ae(d), pe.value)
        k.value = bl(Z.value.map((m) => m[Y.value]));
      else {
        const m = Number(v.itemsToShow), w = (m - 1) * v.gap;
        k.value = (we.value[Y.value] - w) / m;
      }
    }
    function lt() {
      !v.wrapAround && b.value > 0 && (I.value = Ne({
        val: I.value,
        max: ce.value,
        min: ve.value
      })), pe.value || (v.itemsToShow = Ne({
        val: Number(v.itemsToShow),
        max: b.value,
        min: 1
      }));
    }
    const De = r(() => typeof e.ignoreAnimations == "string" ? e.ignoreAnimations.split(",") : Array.isArray(e.ignoreAnimations) ? e.ignoreAnimations : e.ignoreAnimations ? !1 : []);
    Xt(() => lt()), Xt(() => {
      se();
    });
    let Oe;
    const Et = (d) => {
      const m = d.target;
      if (!(!(m != null && m.contains(D.value)) || Array.isArray(De.value) && De.value.includes(d.animationName)) && (xe.add(m), !Oe)) {
        const w = () => {
          Oe = requestAnimationFrame(() => {
            se(), w();
          });
        };
        w();
      }
    }, xt = (d) => {
      const m = d.target;
      m && xe.delete(m), Oe && xe.size === 0 && (cancelAnimationFrame(Oe), se());
    }, nt = C(!1);
    typeof document < "u" && Xt(() => {
      nt.value && De.value !== !1 ? (document.addEventListener("animationstart", Et), document.addEventListener("animationend", xt)) : (document.removeEventListener("animationstart", Et), document.removeEventListener("animationend", xt));
    }), ta(() => {
      nt.value = !0, Me(), Lt(), D.value && (F = new ResizeObserver(Bt), F.observe(D.value)), o("init");
    }), Ja(() => {
      nt.value = !1, t.cleanup(), M && clearTimeout(M), Oe && cancelAnimationFrame(Oe), fe && clearInterval(fe), F && (F.disconnect(), F = null), typeof document < "u" && $e(), D.value && (D.value.removeEventListener("transitionend", se), D.value.removeEventListener("animationiteration", se));
    });
    let _ = !1;
    const ze = { x: 0, y: 0 }, le = Yt({ x: 0, y: 0 }), ot = C(!1), gt = C(!1), zt = () => {
      ot.value = !0;
    }, Gt = () => {
      ot.value = !1;
    }, it = Jt((d) => {
      if (!d.ctrlKey)
        switch (d.key) {
          case "ArrowLeft":
          case "ArrowUp":
            me.value === d.key.endsWith("Up") && (oe.value ? W(!0) : dt(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            me.value === d.key.endsWith("Down") && (oe.value ? dt(!0) : W(!0));
            break;
        }
    }, 200), Ht = () => {
      document.addEventListener("keydown", it);
    }, $e = () => {
      document.removeEventListener("keydown", it);
    };
    function Vt(d) {
      const m = d.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(m) || ee.value || (_ = d.type === "touchstart", !_ && (d.preventDefault(), d.button !== 0)))
        return;
      ze.x = "touches" in d ? d.touches[0].clientX : d.clientX, ze.y = "touches" in d ? d.touches[0].clientY : d.clientY;
      const w = _ ? "touchmove" : "mousemove", A = _ ? "touchend" : "mouseup";
      document.addEventListener(w, ut, { passive: !1 }), document.addEventListener(A, Rt, { passive: !0 });
    }
    const ut = Jt((d) => {
      gt.value = !0;
      const m = "touches" in d ? d.touches[0].clientX : d.clientX, w = "touches" in d ? d.touches[0].clientY : d.clientY;
      le.x = m - ze.x, le.y = w - ze.y;
      const A = Sl({
        isVertical: me.value,
        isReversed: oe.value,
        dragged: le,
        effectiveSlideSize: B.value
      });
      h.value = v.wrapAround ? I.value + A : Ne({
        val: I.value + A,
        max: ce.value,
        min: ve.value
      }), o("drag", { deltaX: le.x, deltaY: le.y });
    });
    function Rt() {
      if (ut.cancel(), h.value !== I.value && !_) {
        const w = (A) => {
          A.preventDefault(), window.removeEventListener("click", w);
        };
        window.addEventListener("click", w);
      }
      de(h.value), le.x = 0, le.y = 0, gt.value = !1;
      const d = _ ? "touchmove" : "mousemove", m = _ ? "touchend" : "mouseup";
      document.removeEventListener(d, ut), document.removeEventListener(m, Rt);
    }
    function Lt() {
      !v.autoplay || v.autoplay <= 0 || (fe = setInterval(() => {
        v.pauseAutoplayOnHover && ot.value || W();
      }, v.autoplay));
    }
    function rt() {
      fe && (clearInterval(fe), fe = null);
    }
    function st() {
      rt(), Lt();
    }
    const ee = C(!1);
    function de(d, m = !1) {
      if (!m && ee.value)
        return;
      let w = d, A = d;
      P.value = I.value, v.wrapAround ? A = Va({
        val: w,
        max: ce.value,
        min: ve.value
      }) : w = Ne({
        val: w,
        max: ce.value,
        min: ve.value
      }), o("slide-start", {
        slidingToIndex: d,
        currentSlideIndex: I.value,
        prevSlideIndex: P.value,
        slidesCount: b.value
      }), rt(), ee.value = !0, I.value = w, A !== w && bt.pause(), o("update:modelValue", A), M = setTimeout(() => {
        v.wrapAround && A !== w && (bt.resume(), I.value = A, o("loop", {
          currentSlideIndex: I.value,
          slidingToIndex: d
        })), o("slide-end", {
          currentSlideIndex: I.value,
          prevSlideIndex: P.value,
          slidesCount: b.value
        }), ee.value = !1, st();
      }, v.transition);
    }
    function W(d = !1) {
      de(I.value + v.itemsToScroll, d);
    }
    function dt(d = !1) {
      de(I.value - v.itemsToScroll, d);
    }
    function yt() {
      Me(), lt(), se(), st();
    }
    G(() => [T.value, e.breakpoints], () => Me(), { deep: !0 }), G(() => e.autoplay, () => st());
    const bt = G(() => e.modelValue, (d) => {
      d !== I.value && de(Number(d), !0);
    });
    o("before-init");
    const Ve = r(() => {
      if (!v.wrapAround)
        return { before: 0, after: 0 };
      if (pe.value)
        return { before: g.length, after: g.length };
      const d = Number(v.itemsToShow), m = Math.ceil(d + (v.itemsToScroll - 1)), w = m - h.value, A = m - (b.value - (h.value + 1));
      return {
        before: Math.max(0, w),
        after: Math.max(0, A)
      };
    }), Ge = r(() => Ve.value.before ? pe.value ? Z.value.slice(-1 * Ve.value.before).reduce((d, m) => d + m[Y.value] + v.gap, 0) * -1 : Ve.value.before * B.value * -1 : 0), ne = r(() => {
      var d;
      if (pe.value) {
        const m = (I.value % g.length + g.length) % g.length;
        return Zt({
          slideSize: (d = Z.value[m]) === null || d === void 0 ? void 0 : d[Y.value],
          viewportSize: we.value[Y.value],
          align: v.snapAlign
        });
      }
      return Zt({
        align: v.snapAlign,
        itemsToShow: +v.itemsToShow
      });
    }), ct = r(() => {
      let d = 0;
      if (pe.value) {
        if (I.value < 0 ? d = Z.value.slice(I.value).reduce((m, w) => m + w[Y.value] + v.gap, 0) * -1 : d = Z.value.slice(0, I.value).reduce((m, w) => m + w[Y.value] + v.gap, 0), d -= ne.value, !v.wrapAround) {
          const m = Z.value.reduce((w, A) => w + A[Y.value] + v.gap, 0) - we.value[Y.value] - v.gap;
          d = Ne({
            val: d,
            max: m,
            min: 0
          });
        }
      } else {
        let m = I.value - ne.value;
        v.wrapAround || (m = Ne({
          val: m,
          max: b.value - +v.itemsToShow,
          min: 0
        })), d = m * B.value;
      }
      return d * (oe.value ? 1 : -1);
    }), ht = r(() => {
      var d, m;
      if (!pe.value) {
        const N = I.value - ne.value;
        return v.wrapAround ? {
          min: Math.floor(N),
          max: Math.ceil(N + Number(v.itemsToShow) - 1)
        } : {
          min: Math.floor(Ne({
            val: N,
            max: b.value - Number(v.itemsToShow),
            min: 0
          })),
          max: Math.ceil(Ne({
            val: N + Number(v.itemsToShow) - 1,
            max: b.value - 1,
            min: 0
          }))
        };
      }
      let w = 0;
      {
        let N = 0, te = 0 - Ve.value.before;
        const ie = Math.abs(ct.value + Ge.value);
        for (; N <= ie; ) {
          const ue = (te % g.length + g.length) % g.length;
          N += ((d = Z.value[ue]) === null || d === void 0 ? void 0 : d[Y.value]) + v.gap, te++;
        }
        w = te - 1;
      }
      let A = 0;
      {
        let N = w, te = 0;
        for (N < 0 ? te = Z.value.slice(0, N).reduce((ie, ue) => ie + ue[Y.value] + v.gap, 0) - Math.abs(ct.value + Ge.value) : te = Z.value.slice(0, N).reduce((ie, ue) => ie + ue[Y.value] + v.gap, 0) - Math.abs(ct.value); te < we.value[Y.value]; ) {
          const ie = (N % g.length + g.length) % g.length;
          te += ((m = Z.value[ie]) === null || m === void 0 ? void 0 : m[Y.value]) + v.gap, N++;
        }
        A = N - 1;
      }
      return {
        min: Math.floor(w),
        max: Math.ceil(A)
      };
    }), qt = r(() => {
      if (v.slideEffect === "fade")
        return;
      const d = me.value ? "Y" : "X", m = me.value ? le.y : le.x;
      let w = ct.value + m;
      if (!v.wrapAround && v.preventExcessiveDragging) {
        let A = 0;
        pe.value ? A = Z.value.reduce((ie, ue) => ie + ue[Y.value], 0) : A = (b.value - Number(v.itemsToShow)) * B.value;
        const N = oe.value ? 0 : -1 * A, te = oe.value ? A : 0;
        w = Ne({
          val: w,
          min: N,
          max: te
        });
      }
      return `translate${d}(${w}px)`;
    }), He = r(() => ({
      "--vc-transition-duration": ee.value ? Ut(v.transition, "ms") : void 0,
      "--vc-slide-gap": Ut(v.gap),
      "--vc-carousel-height": Ut(v.height),
      "--vc-cloned-offset": Ut(Ge.value)
    })), vt = { slideTo: de, next: W, prev: dt }, Nt = Yt({
      activeSlide: h,
      config: v,
      currentSlide: I,
      isSliding: ee,
      isVertical: me,
      maxSlide: ce,
      minSlide: ve,
      nav: vt,
      normalizedDir: H,
      slideRegistry: t,
      slideSize: k,
      slides: g,
      slidesCount: b,
      viewport: s,
      visibleRange: ht
    });
    Sa(at, Nt);
    const ft = Yt({
      config: v,
      currentSlide: I,
      maxSlide: ce,
      middleSlide: O,
      minSlide: ve,
      slideSize: k,
      slidesCount: b
    });
    return n({
      data: ft,
      nav: vt,
      next: W,
      prev: dt,
      restartCarousel: yt,
      slideTo: de,
      updateBreakpointsConfig: Me,
      updateSlideSize: se,
      updateSlidesData: lt
    }), () => {
      var d;
      const m = i.default || i.slides, w = (m == null ? void 0 : m(ft)) || [], { before: A, after: N } = Ve.value, te = pa({
        slides: g,
        position: "before",
        toShow: A
      }), ie = pa({
        slides: g,
        position: "after",
        toShow: N
      }), ue = [...te, ...w, ...ie];
      if (!v.enabled || !ue.length)
        return Q("section", {
          ref: D,
          class: ["carousel", "is-disabled"]
        }, ue);
      const qe = ((d = i.addons) === null || d === void 0 ? void 0 : d.call(i, ft)) || [], Ke = Q("ol", {
        class: "carousel__track",
        style: { transform: qt.value },
        onMousedownCapture: v.mouseDrag ? Vt : null,
        onTouchstartPassiveCapture: v.touchDrag ? Vt : null
      }, ue), mt = Q("div", { class: "carousel__viewport", ref: s }, Ke);
      return Q("section", {
        ref: D,
        class: [
          "carousel",
          `is-${H.value}`,
          `is-effect-${v.slideEffect}`,
          {
            "is-vertical": me.value,
            "is-sliding": ee.value,
            "is-dragging": gt.value,
            "is-hover": ot.value
          }
        ],
        dir: H.value,
        style: He.value,
        "aria-label": v.i18n.ariaGallery,
        tabindex: "0",
        onFocus: Ht,
        onBlur: $e,
        onMouseenter: zt,
        onMouseleave: Gt
      }, [mt, qe, Q(Il)]);
    };
  }
});
var _t;
(function(e) {
  e.arrowDown = "arrowDown", e.arrowLeft = "arrowLeft", e.arrowRight = "arrowRight", e.arrowUp = "arrowUp";
})(_t || (_t = {}));
const ya = (e) => `icon${e.charAt(0).toUpperCase() + e.slice(1)}`, El = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function xl(e) {
  return e in _t;
}
const ba = (e) => e && xl(e), ha = Ce({
  props: {
    name: {
      type: String,
      required: !0,
      validator: ba
    },
    title: {
      type: String,
      default: (e) => e.name ? X.i18n[ya(e.name)] : ""
    }
  },
  setup(e) {
    const i = It(at, null);
    return () => {
      const o = e.name;
      if (!o || !ba(o))
        return;
      const n = El[o], l = Q("path", { d: n }), t = (i == null ? void 0 : i.config.i18n[ya(o)]) || e.title, g = Q("title", t);
      return Q("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": t
      }, [g, l]);
    };
  }
}), Vl = Ce({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(e, { slots: i, attrs: o }) {
    const n = It(at);
    if (!n)
      return () => "";
    const { next: l, prev: t } = i, g = () => ({
      btt: "arrowDown",
      ltr: "arrowLeft",
      rtl: "arrowRight",
      ttb: "arrowUp"
    })[n.normalizedDir], b = () => ({
      btt: "arrowUp",
      ltr: "arrowRight",
      rtl: "arrowLeft",
      ttb: "arrowDown"
    })[n.normalizedDir], D = r(() => !n.config.wrapAround && n.currentSlide <= n.minSlide), s = r(() => !n.config.wrapAround && n.currentSlide >= n.maxSlide);
    return () => {
      const { i18n: k } = n.config, T = Q("button", Object.assign(Object.assign({ type: "button", disabled: D.value, "aria-label": k.ariaPreviousSlide, title: k.ariaPreviousSlide, onClick: n.nav.prev }, o), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": D.value },
        o.class
      ] }), (t == null ? void 0 : t()) || Q(ha, { name: g() })), v = Q("button", Object.assign(Object.assign({ type: "button", disabled: s.value, "aria-label": k.ariaNextSlide, title: k.ariaNextSlide, onClick: n.nav.next }, o), { class: [
        "carousel__next",
        { "carousel__next--disabled": s.value },
        o.class
      ] }), (l == null ? void 0 : l()) || Q(ha, { name: b() }));
      return [T, v];
    };
  }
}), Rl = Ce({
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
    const i = It(at);
    if (!i)
      return () => "";
    const o = r(() => i.config.itemsToShow), n = r(() => Zt({
      align: i.config.snapAlign,
      itemsToShow: o.value
    })), l = r(() => e.paginateByItemsToShow && o.value > 1), t = r(() => Math.ceil((i.activeSlide - n.value) / o.value)), g = r(() => Math.ceil(i.slidesCount / o.value)), b = (D) => Va(l.value ? {
      val: t.value,
      max: g.value - 1,
      min: 0
    } : {
      val: i.activeSlide,
      max: i.maxSlide,
      min: i.minSlide
    }) === D;
    return () => {
      var D, s;
      const k = [];
      for (let T = l.value ? 0 : i.minSlide; T <= (l.value ? g.value - 1 : i.maxSlide); T++) {
        const v = xa(i.config.i18n[l.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: T + 1
        }), I = b(T), h = Q("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": I
          },
          "aria-label": v,
          "aria-pressed": I,
          "aria-controls": (s = (D = i.slides[T]) === null || D === void 0 ? void 0 : D.exposed) === null || s === void 0 ? void 0 : s.id,
          title: v,
          disabled: e.disableOnClick,
          onClick: () => i.nav.slideTo(l.value ? Math.floor(T * +i.config.itemsToShow + n.value) : T)
        }), P = Q("li", { class: "carousel__pagination-item", key: T }, h);
        k.push(P);
      }
      return Q("ol", { class: "carousel__pagination" }, k);
    };
  }
}), ka = Ce({
  name: "CarouselSlide",
  props: {
    id: {
      type: String,
      default: (e) => e.isClone ? void 0 : Qa()
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
  setup(e, { attrs: i, slots: o, expose: n }) {
    const l = It(at);
    if (Sa(at, void 0), !l)
      return () => "";
    const t = C(e.index), g = (h) => {
      t.value = h;
    }, b = Za(), D = () => {
      const h = b.vnode.el;
      return h ? h.getBoundingClientRect() : { width: 0, height: 0 };
    };
    n({
      id: e.id,
      setIndex: g,
      getBoundingRect: D
    });
    const s = r(() => t.value === l.activeSlide), k = r(() => t.value === l.activeSlide - 1), T = r(() => t.value === l.activeSlide + 1), v = r(() => t.value >= l.visibleRange.min && t.value <= l.visibleRange.max), I = r(() => {
      if (l.config.itemsToShow === "auto")
        return;
      const h = l.config.itemsToShow, P = l.config.gap > 0 && h > 1 ? `calc(${100 / h}% - ${l.config.gap * (h - 1) / h}px)` : `${100 / h}%`;
      return l.isVertical ? { height: P } : { width: P };
    });
    return l.slideRegistry.registerSlide(b, e.index), _a(() => {
      l.slideRegistry.unregisterSlide(b);
    }), e.isClone && (ta(() => {
      ga(b.vnode);
    }), el(() => {
      ga(b.vnode);
    })), () => {
      var h, P;
      return l.config.enabled ? Q("li", {
        style: [i.style, Object.assign({}, I.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": e.isClone,
          "carousel__slide--visible": v.value,
          "carousel__slide--active": s.value,
          "carousel__slide--prev": k.value,
          "carousel__slide--next": T.value,
          "carousel__slide--sliding": l.isSliding
        },
        onFocusin: () => {
          l.viewport && (l.viewport.scrollLeft = 0), l.nav.slideTo(t.value);
        },
        id: e.isClone ? void 0 : e.id,
        "aria-hidden": e.isClone || void 0
      }, (P = o.default) === null || P === void 0 ? void 0 : P.call(o, {
        currentIndex: t.value,
        isActive: s.value,
        isClone: e.isClone,
        isPrev: k.value,
        isNext: T.value,
        isSliding: l.isSliding,
        isVisible: v.value
      })) : (h = o.default) === null || h === void 0 ? void 0 : h.call(o);
    };
  }
}), Ll = (e, i, o, n) => {
  var g, b, D, s, k;
  if (!o) return 0;
  let l, t;
  if (o.type === Ae.Field ? [Qe.Number, Qe.Range].includes((g = o.field) == null ? void 0 : g.type) ? (l = parseFloat(e[o.key]), t = parseFloat(i[o.key])) : [Qe.Date, Qe.Date].includes((b = o.field) == null ? void 0 : b.type) ? (l = e[o.key], t = i[o.key]) : ((D = o.field) == null ? void 0 : D.type) === Qe.Select && ((s = o.field) != null && s.multiple) && ((k = o.field) == null ? void 0 : k.multipleDisplay) === ol.Count ? (l = e[o.key].length, t = i[o.key].length) : (l = String(e[o.key]).toLowerCase(), t = String(i[o.key]).toLowerCase()) : (l = String(e[o.key]).toLowerCase(), t = String(i[o.key]).toLowerCase()), n === tt.Asc) {
    if (l > t) return 1;
    if (t > l) return -1;
  } else {
    if (l > t) return -1;
    if (t > l) return 1;
  }
  return 0;
}, Ze = (e, i, o, n = []) => {
  if (e.extractTitleFromColumn) {
    let t = n.find((g) => g.key === e.extractTitleFromColumn);
    if (t)
      return Ze(t, i, o, n);
  }
  let l = e.type === Ae.ColumnIndex ? o : i[e.key];
  if (e.formatter && typeof e.formatter == "function") {
    let t = e.formatter(l, i, e, o);
    return typeof t == "string" && t.startsWith("__:") ? nl(t.substring(3)) : t;
  }
  return l;
}, Nl = (e, i, o) => {
  if (!e.colspan) return -1;
  let n = i;
  return o.forEach((l) => {
    let t = aa(e, l);
    t > 0 && t < n && (n = t);
  }), n;
}, aa = (e, i) => e.colspan === !1 ? !1 : typeof e.colspan == "function" ? e.colspan(i) : e.colspan, Ra = (e, i) => typeof e.preferSlot > "u" ? !0 : e.preferSlot === !1 ? !1 : typeof e.preferSlot == "function" ? e.preferSlot(i) : !0, Ml = (e, i, o) => {
  if (typeof e != "object" || !e.key && [Ae.Field].includes(e.type) || i.indexOf(e.key) > -1) return !1;
  let n = aa(e, o);
  return typeof e.colspan > "u" ? !0 : (typeof e.colspan < "u" && (typeof e.colspan == "function" ? n = parseInt(e.colspan(o)) : n = parseInt(e.colspan)), n > 0);
}, Ol = (e = []) => {
  if (e.length > 0) {
    for (let i = 0; i < e.length; ++i)
      if (e[i].sortable) return e[i].key;
  }
  return "";
}, $l = (e, i) => {
  if (e.length > 0) {
    for (let o = 0; o < e.length; ++o)
      if (e[o].key === i) return e[o];
  }
  return null;
}, La = (e) => {
  let i = [];
  return e.class && i.push(e.class), e.type && i.push(`is-${e.type}`), i.join(" ");
}, ea = /* @__PURE__ */ Ce({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new Da() },
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
  setup(e, { emit: i }) {
    const o = i, n = e, l = C(n.modelValue);
    G(() => n.modelValue, (k) => {
      l.value = k;
    }), G(l, (k) => {
      o("update:modelValue", k);
    });
    const t = () => {
      o("inline-drop");
    }, g = r(() => ({ ...n.column.slotData, item: l.value })), b = r(() => {
      var k, T, v, I;
      if ((k = n.column.field) != null && k.modalData && typeof ((T = n.column.field) == null ? void 0 : T.modalData) == "object")
        for (let h in n.column.field.modalData)
          if (typeof ((v = n.column.field) == null ? void 0 : v.modalData[h]) == "string" && n.column.field.modalData[h].startsWith("prop:")) {
            let P = n.column.field.modalData[h].substring(5);
            l.value[P];
          } else
            n.column.field.modalData[h];
      return (I = n.column.field) == null ? void 0 : I.modalData;
    }), D = r(() => typeof n.column.field == "string" && n.column.field.startsWith("prop:") ? il(n.column.field, l.value) : n.column.field), s = r(() => {
      var k, T, v, I;
      return n.column.type === Ae.Field ? !((T = (k = n.column) == null ? void 0 : k.field) != null && T.label) && (n.column.ensureFieldLabel || [
        Qe.Switch,
        Qe.Check
      ].includes((v = n.column.field) == null ? void 0 : v.type)) ? n.column.label : (I = n.column.field) == null ? void 0 : I.label : "";
    });
    return (k, T) => {
      const v = re("lkt-anchor"), I = re("lkt-button"), h = re("lkt-field"), P = re("lkt-polymorphic-element");
      return e.column.type === p(Ae).Anchor ? (c(), R(v, K({ key: 0 }, e.column.anchor, { prop: l.value }), {
        default: z(() => [
          _e(et(p(Ze)(e.column, l.value, e.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : e.column.type === p(Ae).Button ? (c(), R(I, K({ key: 1 }, e.column.button, { prop: l.value }), {
        default: z(() => [
          _e(et(p(Ze)(e.column, l.value, e.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : e.column.type === p(Ae).Field ? (c(), R(h, K({
        key: 2,
        modelValue: l.value[e.column.key],
        "onUpdate:modelValue": T[0] || (T[0] = (O) => l.value[e.column.key] = O)
      }, {
        ...D.value,
        readMode: !e.hasInlineEditPerm || D.value.readMode,
        slotData: g.value,
        label: s.value,
        modalData: b.value,
        prop: l.value
      }), null, 16, ["modelValue"])) : e.column.type === p(Ae).InlineDrop ? (c(), R(I, K({ key: 3 }, e.column.button, {
        prop: l.value,
        onClick: t
      }), {
        default: z(() => [
          _e(et(p(Ze)(e.column, l.value, e.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : e.column.type === p(Ae).ColumnIndex && e.column.field ? (c(), R(h, ge(K({ key: 4 }, {
        ...D.value,
        modelValue: p(Ze)(e.column, l.value, e.i, e.columns),
        readMode: !0,
        slotData: g.value,
        label: s.value,
        modalData: b.value,
        prop: l.value
      })), null, 16)) : e.column.type === p(Ae).Content && Array.isArray(e.column.content) ? (c(), S("div", {
        key: 5,
        class: J(["lkt-content-container", e.column.class])
      }, [
        (c(!0), S(q, null, ye(e.column.content, (O) => (c(), S(q, null, [
          typeof O == "function" ? (c(), R(P, K({
            key: 0,
            ref_for: !0
          }, O({ item: l.value })), null, 16)) : (c(), R(P, K({
            key: 1,
            ref_for: !0
          }, O), null, 16))
        ], 64))), 256))
      ], 2)) : (c(), S(q, { key: 6 }, [
        _e(et(p(Ze)(e.column, l.value, e.i, e.columns)), 1)
      ], 64));
    };
  }
}), Tt = class Tt {
};
Tt.navButtonSlot = "", Tt.createButtonSlot = "", Tt.defaultEmptySlot = void 0;
let Se = Tt;
const Fl = ["data-i", "data-draggable"], Pl = ["data-role", "data-i"], Ul = {
  key: 1,
  class: "lkt-table-nav-cell"
}, jl = { class: "lkt-table-nav-container" }, zl = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, Gl = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, Hl = ["colspan"], ql = ["colspan"], Kl = ["colspan"], Xl = ["data-column", "colspan", "title"], Yl = /* @__PURE__ */ Ce({
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
    rowDisplayType: { type: [Number, Function], default: Ee.Auto },
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
  setup(e, { emit: i }) {
    const o = Ca(), n = i, l = e, t = C(l.modelValue);
    let g = typeof l.rowDisplayType == "function" ? l.rowDisplayType(t.value, l.i) : l.rowDisplayType;
    g || (g = Ee.Auto);
    const b = [Ee.Auto, Ee.PreferCustomItem].includes(g), D = [Ee.Auto, Ee.PreferItem].includes(g), s = (M) => n("click", M), k = r(() => {
      let M = [], F = typeof l.disabledDrag == "function" ? l.disabledDrag(t.value) : ce.value === !0;
      return !F && l.sortable && l.isDraggable ? M.push("handle") : F && M.push("disabled"), M.join(" ");
    }), T = r(() => Se.navButtonSlot !== ""), v = r(() => Se.navButtonSlot), I = () => {
      n("item-up", l.i);
    }, h = () => {
      n("item-down", l.i);
    }, P = () => {
      n("item-drop", l.i);
    };
    G(() => l.modelValue, (M) => t.value = M), G(t, (M) => {
      n("update:modelValue", M);
    }, { deep: !0 });
    const O = r(() => typeof l.renderDrag == "function" ? l.renderDrag(t.value) : l.renderDrag === !0), ce = r(() => typeof l.disabledDrag == "function" ? l.disabledDrag(t.value) : l.disabledDrag === !0), ve = r(() => k.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), fe = r(() => {
      let M = [];
      return b && M.push("type-custom-item"), D && M.push("type-item"), typeof l.itemContainerClass == "function" ? M.push(l.itemContainerClass(t.value, l.i)) : l.itemContainerClass !== "" && M.push(l.itemContainerClass), M.join(" ");
    });
    return (M, F) => {
      const B = re("lkt-button");
      return c(), S("tr", {
        "data-i": e.i,
        "data-draggable": e.isDraggable,
        class: J(fe.value)
      }, [
        e.sortable && e.editModeEnabled && O.value ? (c(), S("td", {
          key: 0,
          "data-role": ve.value,
          class: J(k.value),
          "data-i": e.i
        }, [...F[2] || (F[2] = [
          he("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ])], 10, Pl)) : x("", !0),
        e.addNavigation && e.editModeEnabled ? (c(), S("td", Ul, [
          he("div", jl, [
            be(B, {
              palette: "table-nav",
              disabled: e.i === 0,
              onClick: I
            }, {
              default: z(() => [
                T.value ? (c(), R(ke(v.value), {
                  key: 0,
                  direction: "up"
                })) : (c(), S("i", zl))
              ]),
              _: 1
            }, 8, ["disabled"]),
            be(B, {
              palette: "table-nav",
              disabled: e.latestRow,
              onClick: h
            }, {
              default: z(() => [
                T.value ? (c(), R(ke(v.value), {
                  key: 0,
                  direction: "down"
                })) : (c(), S("i", Gl))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : x("", !0),
        e.itemSlotComponent ? (c(), S("td", {
          key: "td" + e.i,
          colspan: e.visibleColumns.length
        }, [
          (c(), R(ke(e.itemSlotComponent), ge(wa({
            item: t.value,
            index: e.i,
            editing: e.editModeEnabled,
            perms: e.permissions,
            data: e.itemSlotData,
            events: e.itemSlotEvents
          })), null, 16))
        ], 8, Hl)) : p(b) && p(o)[`item-${e.i}`] ? (c(), S("td", {
          key: "td" + e.i,
          colspan: e.visibleColumns.length
        }, [
          $(M.$slots, `item-${e.i}`, {
            item: t.value,
            index: e.i,
            editing: e.editModeEnabled,
            canCreate: e.canCreate,
            canRead: e.canRead,
            canUpdate: e.canEdit,
            canDrop: e.canDrop,
            isLoading: e.isLoading,
            doDrop: () => P()
          })
        ], 8, ql)) : p(D) && p(o).item ? (c(), S("td", {
          key: "td" + e.i,
          colspan: e.visibleColumns.length
        }, [
          $(M.$slots, "item", {
            item: t.value,
            index: e.i,
            editing: e.editModeEnabled,
            canCreate: e.canCreate,
            canRead: e.canRead,
            canUpdate: e.canEdit,
            canDrop: e.canDrop,
            isLoading: e.isLoading,
            doDrop: () => P()
          })
        ], 8, Kl)) : (c(!0), S(q, { key: 5 }, ye(e.visibleColumns, (H) => (c(), S(q, null, [
          p(Ml)(H, e.emptyColumns, t.value) ? (c(), S("td", {
            key: "td" + e.i,
            "data-column": H.key,
            colspan: p(aa)(H, t.value),
            title: p(Ze)(H, t.value, e.i, e.visibleColumns),
            class: J(p(La)(H)),
            onClick: F[1] || (F[1] = (oe) => s(oe))
          }, [
            M.$slots[H.key] && p(Ra)(H, t.value) ? $(M.$slots, H.key, {
              key: 0,
              value: t.value[H.key],
              item: t.value,
              column: H,
              i: e.i
            }) : t.value ? (c(), R(ea, {
              key: 1,
              modelValue: t.value,
              "onUpdate:modelValue": F[0] || (F[0] = (oe) => t.value = oe),
              column: H,
              columns: e.visibleColumns,
              "edit-mode-enabled": e.editModeEnabled,
              "has-inline-edit-perm": e.hasInlineEditPerm,
              i: e.i,
              onInlineDrop: P
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : x("", !0)
          ], 10, Xl)) : x("", !0)
        ], 64))), 256))
      ], 10, Fl);
    };
  }
}), Dt = /* @__PURE__ */ Ce({
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
    var s;
    const o = i, n = e, l = r(() => Se.createButtonSlot !== ""), t = r(() => Se.createButtonSlot), g = {
      ...(s = n.config) == null ? void 0 : s.modalData,
      beforeClose: (k) => {
        "itemCreated" in k && k.itemCreated === !0 && o("append", k.item);
      }
    }, b = {
      ...n.config
    };
    b.modalData = g;
    const D = () => {
      var k;
      if (!((k = n.config) != null && k.modal)) {
        o("click");
        return;
      }
    };
    return (k, T) => {
      const v = re("lkt-button");
      return c(), R(v, K(b, {
        disabled: e.disabled,
        onClick: D
      }), {
        default: z(() => [
          l.value ? (c(), R(ke(t.value), { key: 0 })) : x("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), Wl = ["data-column", "data-sortable", "data-sort", "colspan", "title"], Jl = /* @__PURE__ */ Ce({
  __name: "TableHeader",
  props: {
    column: { default: () => new Da() },
    sortBy: { default: "" },
    sortDirection: { default: "" },
    amountOfColumns: { default: 0 },
    items: { default: () => [] }
  },
  emits: [
    "click"
  ],
  setup(e, { emit: i }) {
    const o = i, n = e, l = r(() => Nl(n.column, n.amountOfColumns, n.items)), t = r(() => n.column.sortable === !0), g = r(() => t.value && n.sortBy === n.column.key ? n.sortDirection : ""), b = r(() => Ta(n.column.label)), D = r(() => t.value && n.sortBy === n.column.key ? n.sortDirection === tt.Asc ? Be.defaultTableSortAscIcon : n.sortDirection === tt.Desc ? Be.defaultTableSortDescIcon : "" : ""), s = () => o("click", n.column);
    return (k, T) => (c(), S("th", {
      "data-column": e.column.key,
      "data-sortable": t.value,
      "data-sort": g.value,
      colspan: l.value,
      title: b.value,
      class: J(p(La)(e.column)),
      onClick: s
    }, [
      he("div", null, [
        _e(et(b.value) + " ", 1),
        D.value ? (c(), S("i", {
          key: 0,
          class: J(D.value)
        }, null, 2)) : x("", !0)
      ])
    ], 10, Wl));
  }
}), Ql = ["id"], Zl = { class: "lkt-table-page-buttons" }, _l = { class: "switch-edition-mode" }, en = { class: "switch-edition-mode" }, tn = {
  key: 0,
  class: "lkt-table-page-buttons"
}, an = {
  key: 1,
  class: "lkt-table-page-filters"
}, ln = { class: "lkt-table" }, nn = { key: 0 }, on = { key: 0 }, un = {
  key: 0,
  "data-role": "drag-indicator"
}, rn = { key: 1 }, sn = ["id"], dn = ["id"], cn = ["data-i"], vn = ["id"], fn = ["data-i"], mn = ["id"], pn = { class: "lkt-carousel-slide" }, gn = { class: "lkt-carousel-slide" }, yn = ["id"], bn = {
  key: 3,
  class: "lkt-table-empty"
}, hn = {
  key: 5,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, kn = /* @__PURE__ */ Ce({
  __name: "LktTable",
  props: /* @__PURE__ */ al({
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
    calendar: {},
    calendarGroups: {},
    accordion: {},
    accordionList: {},
    header: {},
    title: {},
    titleTag: {},
    titleIcon: {},
    headerClass: {},
    editModeButton: { type: [Boolean, Object] },
    saveButton: { type: [Boolean, Object] },
    createButton: { type: [Boolean, Object] },
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
    itemContainerStyle: { type: [String, Function] },
    skipTableItemsContainer: { type: Boolean },
    createEnabledValidator: { type: Function },
    switchableTypes: {},
    switchableTypesButtons: {},
    useItemSlot: { type: [Boolean, Function] },
    filtersForm: {},
    events: {}
  }, ul(rl)),
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
  setup(e, { expose: i, emit: o }) {
    var ca, va;
    const n = o, l = Ca(), t = e, g = C(typeof t.sorter == "function" ? t.sorter : Ll), b = C(Ol(t.columns)), D = C(tt.Asc), s = C(t.modelValue), k = C(null), T = C(t.columns), v = C([]), I = C((ca = t.paginator) == null ? void 0 : ca.modelValue), h = C(t.loading), P = C(!1), O = C(t.perms), ce = C(null), ve = C(null), fe = C(null), M = C({}), F = C(new cl({ items: s.value }, t.dataStateConfig)), B = C(t.editMode), H = C(0), oe = C(null), me = C(t.type), pe = C(((va = t.carousel) == null ? void 0 : va.currentSlide) || 0), Y = C(void 0), Me = C(void 0), Bt = C(void 0), xe = C({
      ...typeof t.paginator.resourceData == "object" ? t.paginator.resourceData : {}
    }), Z = C({
      ...typeof t.paginator.resourceData == "object" ? t.paginator.resourceData : {}
    }), ae = C(je(t.saveButton, Be.defaultSaveButton)), we = C(je(t.createButton, Be.defaultCreateButton)), At = C(je(t.createButton, Be.defaultInlineCreateButton)), se = C(je(t.editModeButton, Be.defaultEditModeButton)), lt = C(je(t.groupButton, Be.defaultGroupButton));
    G(() => t.saveButton, (a) => ae.value = je(t.saveButton, Be.defaultSaveButton)), G(() => t.createButton, (a) => we.value = je(t.createButton, Be.defaultCreateButton)), G(() => t.editModeButton, (a) => se.value = je(t.editModeButton, Be.defaultEditModeButton));
    const De = C(!1);
    G(h, (a) => n("update:loading", a)), G(I, (a) => n("page", a));
    const Oe = (a) => {
      O.value = a;
    }, Et = (a) => {
      var u, E;
      if (Array.isArray(a.data)) {
        let L = a.data;
        if (typeof ((u = t.events) == null ? void 0 : u.parseResults) == "function" && (L = t.events.parseResults(L)), s.value = [...s.value, ...L], [Ie.TimelineAsc, Ie.TimelineDesc, Ie.TimelineAscDesc].includes((E = t.paginator) == null ? void 0 : E.type)) {
          const U = ml(s.value, t.paginator.dateKey);
          Y.value = U.oldest, Me.value = U.newest;
        }
      }
      h.value = !1, P.value = !0, F.value.store({ items: s.value }).turnStoredIntoOriginal(), De.value = !1, Pt(() => {
        $e.value, n("read-response", a);
      });
    }, xt = () => Pt(() => {
      var L;
      const a = t.paginator, u = a == null ? void 0 : a.type;
      let E = !0;
      u && ([Ie.LoadMore, Ie.Infinite].includes(u) || [Ie.TimelineDesc, Ie.TimelineAsc, Ie.TimelineAscDesc].includes(u) && ((L = t.paginator.timeline) != null && L.accumulative)) && (E = !1), E && s.value.splice(0, s.value.length), h.value = !0;
    }), nt = () => {
      ce.value.doRefresh();
    }, _ = sl(12), ze = r(() => {
      if (!t.hideEmptyColumns) return [];
      let a = [];
      return T.value.forEach((u) => {
        let E = u.key, L = !1;
        s.value.forEach((U) => {
          if (typeof U.checkEmpty == "function")
            return U.checkEmpty(U);
          U[E] && (L = !0);
        }), L || a.push(E);
      }), a;
    }), le = r(() => T.value.filter((a) => !a.hidden)), ot = r(() => T.value.filter((a) => a.isForRowKey)), gt = r(() => T.value.map((a) => a.key)), zt = r(() => {
      let a = [];
      for (let u in l) gt.value.indexOf(u) !== -1 && a.push(u);
      return a;
    }), Gt = r(() => {
      let a = [];
      for (let u in l) u.indexOf("slide-") !== -1 && a.push(u);
      return a;
    }), it = r(() => {
      var a;
      return t.hiddenSave || h.value || !((a = ae.value) != null && a.resource || ae.value.type) ? !1 : B.value && De.value ? !0 : B.value;
    }), Ht = r(() => Ct.value && s.value.length >= t.requiredItemsForTopCreate || ht.value ? !0 : it.value || B.value && ee.value), $e = r(() => {
      var a, u;
      return H.value, typeof ((a = ae.value) == null ? void 0 : a.disabled) == "function" ? ae.value.disabled({
        value: s.value,
        dataState: F.value
      }) : typeof ((u = ae.value) == null ? void 0 : u.disabled) == "boolean" ? ae.value.disabled : !De.value;
    }), Vt = r(() => s.value.length), ut = r(() => {
      var a;
      return {
        items: s.value,
        ...(a = ae.value) == null ? void 0 : a.resourceData
      };
    }), Rt = r(() => t.titleTag === "" ? "h2" : t.titleTag), Lt = r(() => t.wrapContentTag === "" ? "div" : t.wrapContentTag), rt = r(() => Ta(t.title)), st = r(() => {
      var a;
      return (a = t.drag) == null ? void 0 : a.enabled;
    }), ee = r(() => O.value.includes(Re.Create)), de = r(() => O.value.includes("read")), W = r(() => O.value.includes(Re.Update)), dt = r(() => O.value.includes(Re.Edit)), yt = r(() => O.value.includes(Re.InlineEdit)), bt = r(() => O.value.includes(Re.ModalCreate)), Ve = r(() => O.value.includes(Re.InlineCreate)), Ge = r(() => O.value.includes(Re.InlineCreateEver)), ne = r(() => O.value.includes(Re.Drop)), ct = r(() => O.value.includes(Re.SwitchEditMode)), ht = r(() => !ct.value || !W.value && !ne.value || !W.value && ne.value ? !1 : !h.value), qt = r(() => {
      var a;
      return (typeof ((a = t.paginator) == null ? void 0 : a.type) < "u" && [Ie.LoadMore, Ie.Infinite].includes(t.paginator.type) || !h.value) && s.value.length > 0;
    }), He = r(() => T.value.find((a) => a.isForAccordionHeader)), vt = r(() => T.value.find((a) => a.isCalendarDate)), Nt = r(() => T.value.find((a) => a.isCalendarGroup)), ft = (a, u) => typeof t.customItemSlotName == "function" ? t.customItemSlotName(a, u) : "", d = (a) => {
      let u = a.target;
      if (typeof u.dataset.column > "u")
        do
          u = u.parentNode;
        while (typeof u.dataset.column > "u" && u.tagName !== "TABLE" && u.tagName !== "body");
      if (u.tagName === "TD" && (u = u.parentNode, u = u.dataset.i, typeof u < "u"))
        return s.value[u];
    }, m = () => {
      H.value = pl();
    }, w = (a) => s.value[a], A = (a) => {
      var u;
      return (u = k.value) == null ? void 0 : u.querySelector(`[data-i="${a}"]`);
    }, N = (a) => {
      a && a.sortable && (a.key === b.value && (D.value = D.value === tt.Asc ? tt.Desc : tt.Asc), b.value = a.key, s.value = s.value.sort((u, E) => g.value(u, E, a, D.value)), m(), n("sort", {
        sortBy: b.value,
        sortDirection: D.value
      }));
    }, te = (a) => {
      n("click", a);
    }, ie = (a) => {
      var E, L, U, j, Ye, Fe, Pe, Ue;
      let u = parseInt((j = (U = (L = (E = a == null ? void 0 : a.originalEvent) == null ? void 0 : E.toElement) == null ? void 0 : L.closest("tr")) == null ? void 0 : U.dataset) == null ? void 0 : j.i);
      return !(typeof ((Ye = t.drag) == null ? void 0 : Ye.isValid) == "function" && !((Fe = t.drag) != null && Fe.isValid(s.value[u])) || typeof ((Pe = t.drag) == null ? void 0 : Pe.isValid) == "boolean" && !((Ue = t.drag) != null && Ue.isValid));
    }, ue = (a) => {
      var u, E;
      return typeof ((u = t.drag) == null ? void 0 : u.isDraggable) == "function" ? (E = t.drag) == null ? void 0 : E.isDraggable(a) : !0;
    }, qe = () => {
      if (ee.value) {
        n("click-create");
        return;
      }
      if (Ve.value || Ge.value) {
        if (typeof t.newValueGenerator == "function") {
          let a = t.newValueGenerator();
          if (typeof a == "object" || Te.value !== Le.Table) {
            s.value.push(a);
            return;
          }
        }
        s.value.push({});
      } else
        n("click-create");
    }, Ke = (a) => {
      s.value.push(a);
    }, mt = () => h.value = !0, Mt = () => h.value = !1, la = (a, u) => {
      var E, L, U;
      if (!((E = ae.value) != null && E.type && [
        Wt.Split,
        Wt.SplitEver,
        Wt.SplitLazy
      ].includes((L = ae.value) == null ? void 0 : L.type))) {
        if (n("before-save"), (U = ae.value) != null && U.resource && (h.value = !1, !u.success)) {
          n("error", u.httpStatus);
          return;
        }
        F.value.turnStoredIntoOriginal(), De.value = !1, n("save", u);
      }
    }, na = (a, u, E) => {
      if (E >= a.length) {
        let L = E - a.length + 1;
        for (; L--; ) a.push(void 0);
      }
      return a.splice(E, 0, a.splice(u, 1)[0]), a;
    }, Na = (a) => {
      na(s.value, a, a - 1), m();
    }, Ma = (a) => {
      na(s.value, a, a + 1), m();
    }, kt = (a) => {
      s.value.splice(a, 1), m();
    }, oa = () => {
      var a;
      M.value && typeof ((a = M.value) == null ? void 0 : a.destroy) == "function" && (M.value.destroy(), M.value = {});
    }, Kt = () => {
      oe.value || (oe.value = document.getElementById("lkt-table-body-" + _)), M.value = new vl(oe.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(a) {
          let u = a.oldIndex, E = a.newIndex;
          s.value.splice(E, 0, s.value.splice(u, 1)[0]), m(), n("drag-end", s.value[E]);
        },
        onMove: function(a, u) {
          return ie(a);
        }
      });
    }, Ot = (a, u, E = !1) => {
      let L = [H.value, _, "row", u];
      return E && L.push("hidden"), ot.value.forEach((U) => {
        let j = String(a[U.key]).toLowerCase();
        j.length > 50 && (j = j.substring(0, 50)), j = dl(j, " ", "-"), L.push(j);
      }), L.join("-");
    }, St = r(() => typeof t.createEnabledValidator == "function" ? t.createEnabledValidator({ items: s.value }) : !0), Ct = r(() => t.createButton === !1 ? !1 : Ge.value || ee.value && B.value || Ve.value && B.value || bt.value && B.value), ia = r(() => t.createButton === !1 ? !1 : Ge.value || Ve.value && B.value || bt.value && B.value), Oa = r(() => [Le.Ol, Le.Ul].includes(Te.value)), wt = (a, u) => typeof t.itemDisplayChecker == "function" ? t.itemDisplayChecker(a, u) : !0, $t = (a, u) => typeof t.itemContainerClass == "function" ? t.itemContainerClass(a, u) : t.itemContainerClass, ua = (a, u) => typeof t.itemContainerStyle == "function" ? t.itemContainerStyle(a, u) : t.itemContainerStyle, $a = (a, u) => He.value ? a[He.value.key] : "", Xe = r(() => typeof t.itemSlotComponent == "function" ? t.itemSlotComponent() : t.itemSlotComponent), Ft = r(() => typeof t.itemSlotData == "function" ? t.itemSlotData() : t.itemSlotData);
    ta(() => {
      var a;
      t.initialSorting && N($l(t.columns, b.value)), F.value.store({ items: s.value }).turnStoredIntoOriginal(), De.value = !1, (a = t.drag) != null && a.enabled && Pt(() => {
        Kt();
      });
    }), G(() => {
      var a;
      return (a = t.drag) == null ? void 0 : a.enabled;
    }, (a) => {
      a ? Kt() : oa();
    }), G(() => t.type, (a) => {
      var u;
      (u = t.drag) != null && u.enabled ? Kt() : oa();
    }), G(() => t.perms, (a) => O.value = a), G(O, (a) => n("update:perms", a)), G(B, (a) => {
      n("update:editMode", a);
    }), G(() => t.editMode, (a) => B.value = a), G(() => t.columns, (a) => T.value = a, { deep: !0 }), G(() => t.modelValue, (a) => {
      s.value = a;
    }, { deep: !0 }), G(s, (a) => {
      F.value.increment({ items: a }), De.value = F.value.changed(), n("update:modelValue", a);
    }, { deep: !0 }), i({
      getItemByEvent: d,
      getItemByIndex: w,
      getRowByIndex: A,
      doRefresh: nt,
      doRemoveIndex: (a) => {
        s.value.splice(a, 1), m();
      },
      getHtml: () => ve.value,
      reRender: m,
      turnStoredIntoOriginal: () => {
        F.value.turnStoredIntoOriginal(), Pt(() => {
          m();
        });
      }
    });
    const ra = r(() => typeof Se.defaultEmptySlot < "u"), Fa = r(() => Se.defaultEmptySlot), Pa = r(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled ? !1 : typeof t.drag.canRender > "u" ? !0 : t.drag.canRender), Ua = r(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled || typeof t.drag.isDisabled > "u" ? !1 : t.drag.isDisabled), ja = r(() => typeof t.header == "object" && Object.keys(t.header).length > 0), za = r(() => (console.log("displayFiltersLktForm: ", typeof t.filtersForm == "object" && Object.keys(t.filtersForm).length > 0), typeof t.filtersForm == "object" && Object.keys(t.filtersForm).length > 0)), Te = r(() => Array.isArray(t.switchableTypes) && t.switchableTypes.length > 0 ? me.value : t.type), Ga = r(() => Array.isArray(t.switchableTypes) ? t.switchableTypes.length > 0 ? t.switchableTypes.includes(t.type) ? t.switchableTypes : [
      t.type,
      ...t.switchableTypes
    ] : [] : []), Ha = r(() => {
      let a = [];
      return Ga.value.forEach((u) => {
        let E = t.switchableTypesButtons[u];
        a.push({
          ...E,
          class: [E.class, u === Te.value ? "is-current" : ""].join(" "),
          events: {
            click: (L) => {
              var U, j;
              me.value = u, typeof ((U = t.switchableTypesButtons[u].events) == null ? void 0 : U.click) == "function" && t.switchableTypesButtons[u].events.click(L), typeof ((j = t.events) == null ? void 0 : j.viewChanged) == "function" && t.events.viewChanged(u);
            }
          }
        });
      }), a;
    }), qa = r(() => {
      var a, u;
      return {
        ...t.header,
        topEndButtons: [
          ...typeof ((a = t.header) == null ? void 0 : a.topEndButtons) > "u" ? [] : (u = t.header) == null ? void 0 : u.topEndButtons,
          ...Ha.value
        ]
      };
    }), sa = (a, u) => typeof t.useItemSlot == "function" ? t.useItemSlot({ item: a, index: u }) === !0 : t.useItemSlot, Ka = r(() => {
      if (Te.value !== Le.Calendar || !vt.value || typeof vt.value > "u") return [];
      let a = [], u = [];
      return s.value.forEach((E) => {
        var Ue;
        let L = E[vt.value.key], U = fl("Y-m-d H:i:s", L), j;
        (Ue = Nt.value) != null && Ue.key && (j = E[Nt.value.key]);
        let Ye = {};
        j && t.calendarGroups && typeof t.calendarGroups[j] == "object" && (Ye = t.calendarGroups[j]);
        const Fe = [U, j].join("-");
        let Pe = -1;
        u.includes(Fe) ? Pe = u.findIndex((y) => y === Fe) : (Pe = u.length, u.push(Fe), a.push({
          date: L,
          data: {
            items: []
          },
          dot: {
            ...Ye,
            class: `lkt-calendar-group--${j}`
          }
        })), a[Pe].data.items.push(E);
      }), a;
    }), Xa = {
      dayPicked: ((a) => {
        var u;
        typeof ((u = t.calendar.events) == null ? void 0 : u.dayPicked) == "function" && t.calendar.events.dayPicked(a);
      }),
      visibleMonthChanged: ((a) => {
        var u;
        typeof ((u = t.calendar.events) == null ? void 0 : u.visibleMonthChanged) == "function" && t.calendar.events.visibleMonthChanged(a), Bt.value = a.visibleDate;
      })
    };
    let da = null;
    G(xe, () => {
      clearTimeout(da), da = setTimeout(() => {
        Z.value = {
          ...Z.value,
          ...xe.value
        };
      }, 400);
    }, { deep: !0 });
    const Ya = (a, u, E) => {
      var L;
      a && ((L = t.accordionList) != null && L.limitOpened) && v.value.forEach((U, j) => {
        U && j !== u && (v.value[j] = !1);
      });
    };
    return (a, u) => {
      const E = re("lkt-header"), L = re("lkt-button"), U = re("lkt-form"), j = re("lkt-accordion"), Ye = re("lkt-calendar"), Fe = re("lkt-loader"), Pe = re("lkt-paginator");
      return c(), S("section", {
        ref_key: "element",
        ref: ve,
        class: "lkt-table-page",
        id: "lkt-table-page-" + p(_)
      }, [
        ja.value ? (c(), R(E, ge(K({ key: 0 }, qa.value)), null, 16)) : rt.value || p(l).title ? (c(), S("header", {
          key: 1,
          class: J(e.headerClass)
        }, [
          rt.value ? (c(), R(ke(Rt.value), { key: 0 }, {
            default: z(() => [
              e.titleIcon ? (c(), S("i", {
                key: 0,
                class: J(e.titleIcon)
              }, null, 2)) : x("", !0),
              _e(" " + et(rt.value), 1)
            ]),
            _: 1
          })) : x("", !0),
          p(l).title ? $(a.$slots, "title", { key: 1 }) : x("", !0)
        ], 2)) : x("", !0),
        (c(), R(ke(Lt.value), {
          class: J(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: z(() => {
            var Ue;
            return [
              We(he("div", Zl, [
                e.groupButton !== !1 ? (c(), R(L, K({
                  key: 0,
                  ref: "groupButton"
                }, lt.value, { class: "lkt-item-crud-group-button" }), {
                  split: z(() => [
                    he("div", _l, [
                      We(be(L, K(se.value, {
                        checked: B.value,
                        "onUpdate:checked": u[0] || (u[0] = (y) => B.value = y)
                      }), null, 16, ["checked"]), [
                        [Je, ht.value]
                      ])
                    ]),
                    p(l)["prev-buttons-ever"] ? $(a.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: W.value,
                      canDrop: ne.value,
                      perms: e.perms
                    }) : x("", !0),
                    p(l)["prev-buttons"] ? $(a.$slots, "prev-buttons", {
                      key: 1,
                      canUpdate: W.value,
                      canDrop: ne.value,
                      perms: e.perms
                    }) : x("", !0),
                    We(be(L, K({
                      class: "lkt-table--save-button",
                      ref_key: "saveButtonRef",
                      ref: fe
                    }, {
                      ...ae.value,
                      disabled: $e.value,
                      resourceData: ut.value
                    }, {
                      onLoading: mt,
                      onLoaded: Mt,
                      onClick: la
                    }), {
                      split: z(({ doClose: y, doRootClick: f }) => [
                        $(a.$slots, "button-save-split", {
                          doClose: y,
                          doRootClick: f,
                          dataState: F.value,
                          onButtonLoading: mt,
                          onButtonLoaded: Mt
                        })
                      ]),
                      default: z(() => [
                        p(l)["button-save"] ? $(a.$slots, "button-save", {
                          key: 0,
                          items: s.value,
                          editMode: e.editMode,
                          canUpdate: !$e.value
                        }) : x("", !0)
                      ]),
                      _: 3
                    }, 16), [
                      [Je, it.value]
                    ]),
                    Ct.value && s.value.length >= e.requiredItemsForTopCreate ? (c(), R(Dt, {
                      key: 2,
                      config: we.value,
                      disabled: !St.value,
                      onClick: qe,
                      onAppend: Ke
                    }, null, 8, ["config", "disabled"])) : x("", !0)
                  ]),
                  _: 3
                }, 16)) : x("", !0),
                p(l)["prev-buttons-ever"] ? $(a.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: W.value,
                  canDrop: ne.value,
                  perms: e.perms
                }) : x("", !0),
                p(l)["prev-buttons"] ? $(a.$slots, "prev-buttons", {
                  key: 2,
                  canUpdate: W.value,
                  canDrop: ne.value,
                  perms: e.perms
                }) : x("", !0),
                We(be(L, K({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: fe
                }, {
                  ...ae.value,
                  disabled: $e.value,
                  resourceData: ut.value
                }, {
                  onLoading: mt,
                  onLoaded: Mt,
                  onClick: la
                }), {
                  split: z(({ doClose: y, doRootClick: f }) => [
                    $(a.$slots, "button-save-split", {
                      doClose: y,
                      doRootClick: f,
                      dataState: F.value,
                      onButtonLoading: mt,
                      onButtonLoaded: Mt
                    })
                  ]),
                  default: z(() => [
                    p(l)["button-save"] ? $(a.$slots, "button-save", {
                      key: 0,
                      items: s.value,
                      editMode: e.editMode,
                      canUpdate: !$e.value
                    }) : x("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [Je, it.value]
                ]),
                ia.value && s.value.length >= e.requiredItemsForTopCreate ? (c(), R(Dt, {
                  key: 3,
                  config: At.value,
                  disabled: !St.value,
                  onClick: qe,
                  onAppend: Ke
                }, null, 8, ["config", "disabled"])) : Ct.value && s.value.length >= e.requiredItemsForTopCreate ? (c(), R(Dt, {
                  key: 4,
                  config: we.value,
                  disabled: !St.value,
                  onClick: qe,
                  onAppend: Ke
                }, null, 8, ["config", "disabled"])) : x("", !0),
                he("div", en, [
                  We(be(L, K(se.value, {
                    checked: B.value,
                    "onUpdate:checked": u[1] || (u[1] = (y) => B.value = y)
                  }), null, 16, ["checked"]), [
                    [Je, ht.value]
                  ])
                ])
              ], 512), [
                [Je, Ht.value]
              ]),
              p(l).buttons ? (c(), S("div", tn, [
                $(a.$slots, "buttons")
              ])) : x("", !0),
              P.value && p(l).filters ? (c(), S("div", an, [
                $(a.$slots, "filters", {
                  items: s.value,
                  isLoading: h.value
                })
              ])) : x("", !0),
              za.value ? (c(), R(U, K({
                key: 2,
                modelValue: xe.value,
                "onUpdate:modelValue": u[2] || (u[2] = (y) => xe.value = y),
                editing: B.value,
                "onUpdate:editing": u[3] || (u[3] = (y) => B.value = y),
                perms: O.value,
                "onUpdate:perms": u[4] || (u[4] = (y) => O.value = y)
              }, {
                form: e.filtersForm
              }), null, 16, ["modelValue", "editing", "perms"])) : x("", !0),
              We(he("div", ln, [
                Te.value === p(Le).Table ? (c(), S("table", nn, [
                  e.hideTableHeader ? x("", !0) : (c(), S("thead", on, [
                    he("tr", null, [
                      st.value && B.value ? (c(), S("th", un)) : x("", !0),
                      e.addNavigation && B.value ? (c(), S("th", rn)) : x("", !0),
                      (c(!0), S(q, null, ye(le.value, (y) => (c(), S(q, null, [
                        ze.value.indexOf(y.key) === -1 ? (c(), R(Jl, {
                          key: 0,
                          column: y,
                          "sort-by": b.value,
                          "sort-direction": D.value,
                          "amount-of-columns": e.columns.length,
                          items: s.value,
                          onClick: (f) => N(y)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : x("", !0)
                      ], 64))), 256))
                    ])
                  ])),
                  he("tbody", {
                    ref_key: "tableBody",
                    ref: k,
                    id: "lkt-table-body-" + p(_),
                    class: J(e.itemsContainerClass)
                  }, [
                    (c(!0), S(q, null, ye(s.value, (y, f) => We((c(), R(Yl, {
                      modelValue: s.value[f],
                      "onUpdate:modelValue": (V) => s.value[f] = V,
                      key: Ot(y, f),
                      i: f,
                      "is-draggable": ue(y),
                      sortable: st.value,
                      "visible-columns": le.value,
                      "empty-columns": ze.value,
                      "add-navigation": e.addNavigation,
                      "latest-row": f + 1 === Vt.value,
                      "can-drop": ne.value && B.value,
                      "can-edit": dt.value && W.value && B.value,
                      "can-read": de.value,
                      "can-create": ee.value,
                      "edit-mode-enabled": B.value,
                      "has-inline-edit-perm": yt.value,
                      "row-display-type": e.rowDisplayType,
                      "render-drag": Pa.value,
                      "disabled-drag": Ua.value,
                      "is-loading": h.value,
                      "item-container-class": e.itemContainerClass,
                      "item-slot-component": Xe.value,
                      "item-slot-data": Ft.value,
                      "item-slot-events": e.itemSlotEvents,
                      permissions: O.value,
                      onClick: te,
                      onItemUp: Na,
                      onItemDown: Ma,
                      onItemDrop: kt
                    }, ll({ _: 2 }, [
                      p(l)[`item-${f}`] && sa(a.row, f) ? {
                        name: `item-${f}`,
                        fn: z((V) => [
                          $(a.$slots, `item-${f}`, ge({
                            [e.slotItemVar || ""]: V.item,
                            index: f,
                            editing: V.editing,
                            canCreate: V.canCreate,
                            canRead: V.canRead,
                            canUpdate: V.canUpdate,
                            canDrop: V.canDrop,
                            isLoading: V.isLoading,
                            doDrop: V.doDrop
                          }))
                        ]),
                        key: "0"
                      } : p(l).item && sa(a.row, f) ? {
                        name: "item",
                        fn: z((V) => [
                          $(a.$slots, "item", ge({
                            [e.slotItemVar || ""]: V.item,
                            index: f,
                            editing: V.editing,
                            canCreate: V.canCreate,
                            canRead: V.canRead,
                            canUpdate: V.canUpdate,
                            canDrop: V.canDrop,
                            isLoading: V.isLoading,
                            doDrop: V.doDrop
                          }))
                        ]),
                        key: "1"
                      } : void 0,
                      ye(zt.value, (V) => ({
                        name: V,
                        fn: z((pt) => [
                          $(a.$slots, V, ge({
                            [e.slotItemVar || ""]: pt.item,
                            value: pt.value,
                            column: pt.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class", "item-slot-component", "item-slot-data", "item-slot-events", "permissions"])), [
                      [Je, wt(s.value[f], f)]
                    ])), 128))
                  ], 10, sn)
                ])) : Te.value === p(Le).Item ? (c(), S("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: k,
                  id: "lkt-table-body-" + p(_),
                  class: J(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (c(!0), S(q, null, ye(s.value, (y, f) => (c(), S(q, {
                    key: Ot(y, f)
                  }, [
                    !e.skipTableItemsContainer && wt(y, f) ? (c(), S("div", {
                      key: 0,
                      class: J(["lkt-table-item", $t(y, f)]),
                      style: ma(ua(y, f)),
                      "data-i": f
                    }, [
                      Xe.value ? (c(), R(ke(Xe.value), K({
                        key: 0,
                        ref_for: !0
                      }, {
                        item: y,
                        index: f,
                        editing: B.value,
                        perms: O.value,
                        data: Ft.value,
                        events: e.itemSlotEvents
                      }), null, 16)) : $(a.$slots, "item", ge({
                        key: 1,
                        [e.slotItemVar || ""]: y,
                        index: f,
                        editing: B.value,
                        canCreate: ee.value,
                        canRead: de.value,
                        canUpdate: W.value,
                        canDrop: ne.value,
                        isLoading: h.value,
                        doDrop: () => kt(f)
                      }))
                    ], 14, cn)) : wt(y, f) ? $(a.$slots, "item", ge({
                      key: 1,
                      class: $t(y, f),
                      dataI: f,
                      [e.slotItemVar || ""]: y,
                      index: f,
                      editing: B.value,
                      canCreate: ee.value,
                      canRead: de.value,
                      canUpdate: W.value,
                      canDrop: ne.value,
                      isLoading: h.value,
                      doDrop: () => kt(f)
                    })) : x("", !0)
                  ], 64))), 128))
                ], 10, dn)) : Te.value === p(Le).Accordion ? (c(), S("div", {
                  key: 2,
                  ref_key: "tableBody",
                  ref: k,
                  id: "lkt-table-body-" + p(_),
                  class: J(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (c(!0), S(q, null, ye(s.value, (y, f) => (c(), S(q, null, [
                    [p(Ee).Auto, p(Ee).PreferCustomItem].includes(e.rowDisplayType) && p(l)[ft(y, f)] ? $(a.$slots, ft(y, f), {
                      key: 0,
                      item: y,
                      index: f,
                      editing: B.value,
                      isLoading: h.value
                    }) : [p(Ee).Auto, p(Ee).PreferCustomItem].includes(e.rowDisplayType) && p(l)[`item-${f}`] ? $(a.$slots, `item-${f}`, {
                      key: 1,
                      item: y,
                      index: f,
                      editing: B.value,
                      isLoading: h.value
                    }) : (c(), S(q, { key: 2 }, [
                      wt(y, f) ? (c(), R(j, K({
                        modelValue: v.value[f],
                        "onUpdate:modelValue": (V) => v.value[f] = V,
                        class: ["lkt-table-item", $t(y, f)],
                        "data-i": f,
                        key: Ot(y, f)
                      }, { ref_for: !0 }, {
                        ...e.accordion,
                        title: $a(y)
                      }, {
                        "onUpdate:modelValue": (V) => Ya(V, f)
                      }), {
                        header: z(() => [
                          be(ea, {
                            modelValue: s.value[f],
                            "onUpdate:modelValue": (V) => s.value[f] = V,
                            i: f,
                            column: He.value,
                            columns: le.value,
                            "edit-mode-enabled": B.value,
                            "has-inline-edit-perm": yt.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])
                        ]),
                        default: z(() => [
                          (c(!0), S(q, null, ye(le.value, (V) => {
                            var pt, fa;
                            return c(), S(q, null, [
                              V.key !== ((pt = He.value) == null ? void 0 : pt.key) && a.$slots[V.key] && p(Ra)(V, s.value[f]) ? $(a.$slots, V.key, {
                                key: 0,
                                value: s.value[f][V.key],
                                item: s.value[f],
                                column: V,
                                i: f
                              }) : (c(), S(q, { key: 1 }, [
                                V.key !== ((fa = He.value) == null ? void 0 : fa.key) ? (c(), R(ea, {
                                  key: 0,
                                  modelValue: s.value[f],
                                  "onUpdate:modelValue": (Wa) => s.value[f] = Wa,
                                  i: f,
                                  column: V,
                                  columns: le.value,
                                  "edit-mode-enabled": B.value,
                                  "has-inline-edit-perm": yt.value
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])) : x("", !0)
                              ], 64))
                            ], 64);
                          }), 256))
                        ]),
                        _: 2
                      }, 1040, ["modelValue", "onUpdate:modelValue", "class", "data-i"])) : x("", !0)
                    ], 64))
                  ], 64))), 256))
                ], 10, vn)) : Oa.value ? (c(), R(ke(Te.value), {
                  key: 3,
                  class: J(["lkt-table-items-container", e.itemsContainerClass])
                }, {
                  default: z(() => [
                    (c(!0), S(q, null, ye(s.value, (y, f) => (c(), S(q, {
                      key: Ot(y, f)
                    }, [
                      wt(y, f) ? (c(), S("li", {
                        key: 0,
                        class: J(["lkt-table-item", $t(y, f)]),
                        "data-i": f,
                        style: ma(ua(y, f))
                      }, [
                        Xe.value ? (c(), R(ke(Xe.value), K({
                          key: 0,
                          ref_for: !0
                        }, {
                          item: y,
                          index: f,
                          editing: B.value,
                          perms: O.value,
                          data: Ft.value,
                          events: e.itemSlotEvents
                        }), null, 16)) : $(a.$slots, "item", ge({
                          key: 1,
                          [e.slotItemVar || ""]: y,
                          index: f,
                          editing: B.value,
                          canCreate: ee.value,
                          canRead: de.value,
                          canUpdate: W.value,
                          canDrop: ne.value,
                          isLoading: h.value,
                          doDrop: () => kt(f)
                        }))
                      ], 14, fn)) : x("", !0)
                    ], 64))), 128))
                  ]),
                  _: 3
                }, 8, ["class"])) : Te.value === p(Le).Carousel ? (c(), S("div", {
                  key: 4,
                  ref_key: "tableBody",
                  ref: k,
                  id: "lkt-table-body-" + p(_),
                  class: J(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  be(p(Al), K({
                    modelValue: pe.value,
                    "onUpdate:modelValue": u[5] || (u[5] = (y) => pe.value = y)
                  }, e.carousel, {
                    "wrap-around": ((Ue = e.carousel) == null ? void 0 : Ue.infinite) === !0
                  }), {
                    addons: z(() => [
                      be(p(Vl)),
                      be(p(Rl))
                    ]),
                    default: z(() => [
                      (c(!0), S(q, null, ye(Gt.value, (y, f) => (c(), R(p(ka), {
                        key: y,
                        index: f
                      }, {
                        default: z(() => [
                          he("div", pn, [
                            $(a.$slots, y)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (c(!0), S(q, null, ye(s.value, (y, f) => (c(), R(p(ka), {
                        key: a.slide,
                        index: f
                      }, {
                        default: z(() => [
                          he("div", gn, [
                            Xe.value ? (c(), R(ke(Xe.value), K({
                              key: 0,
                              ref_for: !0
                            }, {
                              item: y,
                              index: f,
                              editing: B.value,
                              perms: O.value,
                              data: Ft.value,
                              events: e.itemSlotEvents
                            }), null, 16)) : $(a.$slots, "item", ge({
                              key: 1,
                              [e.slotItemVar || ""]: y,
                              index: f,
                              editing: B.value,
                              canCreate: ee.value,
                              canRead: de.value,
                              canUpdate: W.value,
                              canDrop: ne.value,
                              isLoading: h.value,
                              doDrop: () => kt(f)
                            }))
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128))
                    ]),
                    _: 3
                  }, 16, ["modelValue", "wrap-around"])
                ], 10, mn)) : Te.value === p(Le).Calendar ? (c(), S("div", {
                  key: 5,
                  ref_key: "tableBody",
                  ref: k,
                  id: "lkt-table-body-" + p(_),
                  class: J(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  be(Ye, ge(wa({
                    ...e.calendar,
                    items: Ka.value,
                    events: Xa
                  })), null, 16)
                ], 10, yn)) : x("", !0)
              ], 512), [
                [Je, qt.value]
              ]),
              !h.value && s.value.length === 0 && (p(l).empty || ra.value || e.noResultsText) ? (c(), S("div", bn, [
                p(l).empty ? $(a.$slots, "empty", { key: 0 }) : ra.value ? (c(), R(ke(Fa.value), {
                  key: 1,
                  message: e.noResultsText
                }, null, 8, ["message"])) : e.noResultsText ? (c(), S(q, { key: 2 }, [
                  _e(et(e.noResultsText), 1)
                ], 64)) : x("", !0)
              ])) : x("", !0),
              h.value ? (c(), R(Fe, { key: 4 })) : x("", !0),
              Ct.value || p(l).bottomButtons ? (c(), S("div", hn, [
                ia.value && s.value.length >= e.requiredItemsForBottomCreate ? (c(), R(Dt, {
                  key: 0,
                  config: At.value,
                  disabled: !St.value,
                  onClick: qe,
                  onAppend: Ke
                }, null, 8, ["config", "disabled"])) : Ct.value && s.value.length >= e.requiredItemsForBottomCreate ? (c(), R(Dt, {
                  key: 1,
                  config: we.value,
                  disabled: !St.value,
                  onClick: qe,
                  onAppend: Ke
                }, null, 8, ["config", "disabled"])) : x("", !0),
                $(a.$slots, "bottom-buttons")
              ])) : x("", !0),
              e.paginator && Object.keys(e.paginator).length > 0 ? (c(), R(Pe, K({
                key: 6,
                ref_key: "paginatorRef",
                ref: ce
              }, {
                ...e.paginator,
                resourceData: Z.value,
                timelineOldestDate: Y.value,
                timelineNewestDate: Me.value,
                timelineVisibleDate: Bt.value
              }, {
                modelValue: I.value,
                "onUpdate:modelValue": u[6] || (u[6] = (y) => I.value = y),
                onLoading: xt,
                onPerms: Oe,
                onResponse: Et
              }), null, 16, ["modelValue"])) : x("", !0),
              p(l)["web-element-actions"] ? $(a.$slots, "web-element-actions", { key: 7 }) : x("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, Ql);
    };
  }
}), An = {
  install: (e) => {
    e.component("lkt-table") === void 0 && e.component("lkt-table", kn);
  }
}, En = (e) => (Se.navButtonSlot = e, !0), xn = (e) => (Se.createButtonSlot = e, !0), Vn = (e) => {
  Se.defaultEmptySlot = e;
};
export {
  Nn as Column,
  Mn as createColumn,
  An as default,
  Ll as defaultTableSorter,
  xn as setTableCreateButtonSlot,
  Vn as setTableEmptySlot,
  En as setTableNavButtonSlot
};
