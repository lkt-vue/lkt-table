import { defineComponent as Se, computed as r, ref as B, shallowReactive as Wt, watch as _, watchEffect as Ht, onMounted as xt, onBeforeUnmount as _a, reactive as qt, provide as va, h as Y, useId as Ua, inject as Ct, getCurrentInstance as ja, onUnmounted as za, onUpdated as Ga, cloneVNode as Ha, resolveComponent as he, createBlock as O, createElementBlock as C, unref as b, openBlock as p, mergeProps as X, withCtx as P, createTextVNode as et, toDisplayString as tt, normalizeProps as me, Fragment as G, useSlots as fa, normalizeClass as Z, createCommentVNode as R, createElementVNode as ye, createVNode as ge, resolveDynamicComponent as be, guardReactiveProps as pa, renderSlot as F, renderList as De, mergeDefaults as qa, nextTick as Lt, withDirectives as Ye, vShow as We, createSlots as Ka } from "vue";
import { __ as Xa } from "lkt-i18n";
import { ColumnType as Oe, FieldType as Ze, MultipleOptionsDisplay as Ya, SortDirection as at, Column as ma, extractPropValue as Wa, TableRowType as Te, extractI18nValue as ga, LktSettings as Me, ensureButtonConfig as Je, TablePermission as Re, PaginatorType as Qe, TableType as Le, getDefaultValues as Ja, Table as Qa, ButtonType as Kt } from "lkt-vue-kernel";
import { Column as wl, createColumn as Dl } from "lkt-vue-kernel";
import { generateRandomString as Za, replaceAll as xa } from "lkt-string-tools";
import { DataState as en } from "lkt-data-state";
import tn from "sortablejs";
import { date as an, findOldestAndNewestDateInObjects as nn, time as ln } from "lkt-date-tools";
/**
 * Vue 3 Carousel 0.14.0
 * (c) 2025
 * @license MIT
 */
const ya = ["viewport", "carousel"], Mt = {
  "bottom-to-top": "btt",
  "left-to-right": "ltr",
  "right-to-left": "rtl",
  "top-to-bottom": "ttb"
}, ba = [
  "ltr",
  "left-to-right",
  "rtl",
  "right-to-left",
  "ttb",
  "top-to-bottom",
  "btt",
  "bottom-to-top"
], on = {
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
}, ha = ["slide", "fade"], ka = [
  "center",
  "start",
  "end",
  "center-even",
  "center-odd"
], j = {
  autoplay: 0,
  breakpointMode: ya[0],
  breakpoints: void 0,
  dir: ba[0],
  enabled: !0,
  gap: 0,
  height: "auto",
  i18n: on,
  ignoreAnimations: !1,
  itemsToScroll: 1,
  itemsToShow: 1,
  modelValue: 0,
  mouseDrag: !0,
  pauseAutoplayOnHover: !1,
  preventExcessiveDragging: !1,
  slideEffect: ha[0],
  snapAlign: ka[0],
  touchDrag: !0,
  transition: 300,
  wrapAround: !1
}, nt = Symbol("carousel"), rn = (a) => {
  const i = Wt([]), o = (l) => {
    l !== void 0 ? i.slice(l).forEach((n, t) => {
      var y;
      (y = n.exposed) === null || y === void 0 || y.setIndex(l + t);
    }) : i.forEach((n, t) => {
      var y;
      (y = n.exposed) === null || y === void 0 || y.setIndex(t);
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
      const t = n ?? i.length;
      i.splice(t, 0, l), o(t), a("slide-registered", { slide: l, index: t });
    },
    unregisterSlide: (l) => {
      const n = i.indexOf(l);
      n !== -1 && (a("slide-unregistered", { slide: l, index: n }), i.splice(n, 1), o(n));
    }
  };
};
function un(a) {
  return a.length === 0 ? 0 : a.reduce((o, l) => o + l, 0) / a.length;
}
function ia({ slides: a, position: i, toShow: o }) {
  const l = [], n = i === "before", t = n ? -o : 0, y = n ? 0 : o;
  if (a.length <= 0)
    return l;
  for (let k = t; k < y; k++) {
    const s = {
      index: n ? k : k + a.length,
      isClone: !0,
      position: i,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${i}-${k}`
    }, v = a[(k % a.length + a.length) % a.length].vnode, T = Ha(v, s);
    T.el = null, l.push(T);
  }
  return l;
}
const sn = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function ra(a) {
  if (!a.el || !(a.el instanceof Element))
    return;
  const i = a.el.querySelectorAll(sn);
  for (const o of i)
    o instanceof HTMLElement && !o.hasAttribute("disabled") && o.getAttribute("aria-hidden") !== "true" && o.setAttribute("tabindex", "-1");
}
function dn(a, i) {
  return Object.keys(a).filter((o) => !i.includes(o)).reduce((o, l) => (o[l] = a[l], o), {});
}
function cn(a) {
  const { isVertical: i, isReversed: o, dragged: l, effectiveSlideSize: n } = a, t = i ? l.y : l.x;
  if (t === 0)
    return 0;
  const y = Math.round(t / n);
  return o ? y : -y;
}
function Ne({ val: a, max: i, min: o }) {
  return i < o ? a : Math.min(Math.max(a, isNaN(o) ? a : o), isNaN(i) ? a : i);
}
function vn(a) {
  const { transform: i } = window.getComputedStyle(a);
  return i.split(/[(,)]/).slice(1, -1).map((o) => parseFloat(o));
}
function fn(a) {
  let i = 1, o = 1;
  return a.forEach((l) => {
    const n = vn(l);
    n.length === 6 && (i /= n[0], o /= n[3]);
  }), { widthMultiplier: i, heightMultiplier: o };
}
function pn(a, i) {
  switch (a) {
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
function mn(a, i, o) {
  switch (a) {
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
function Jt({ slideSize: a, viewportSize: i, align: o, itemsToShow: l }) {
  return l !== void 0 ? pn(o, l) : a !== void 0 && i !== void 0 ? mn(o, a, i) : 0;
}
function Sa(a = "", i = {}) {
  return Object.entries(i).reduce((o, [l, n]) => o.replace(`{${l}}`, String(n)), a);
}
function Ca({ val: a, max: i, min: o = 0 }) {
  const l = i - o + 1;
  return ((a - o) % l + l) % l + o;
}
function Xt(a, i = 0) {
  let o = !1, l = 0, n = null;
  function t(...y) {
    if (o)
      return;
    o = !0;
    const k = () => {
      n = requestAnimationFrame((D) => {
        D - l > i ? (l = D, a(...y), o = !1) : k();
      });
    };
    k();
  }
  return t.cancel = () => {
    n && (cancelAnimationFrame(n), n = null, o = !1);
  }, t;
}
function Nt(a, i = "px") {
  if (!(a == null || a === ""))
    return typeof a == "number" || parseFloat(a).toString() === a ? `${a}${i}` : a;
}
const gn = Se({
  name: "CarouselAria",
  setup() {
    const a = Ct(nt);
    return a ? () => Y("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, Sa(a.config.i18n.itemXofY, {
      currentSlide: a.currentSlide + 1,
      slidesCount: a.slidesCount
    })) : () => "";
  }
}), yn = {
  // time to auto advance slides in ms
  autoplay: {
    default: j.autoplay,
    type: Number
  },
  // an object to store breakpoints
  breakpoints: {
    default: j.breakpoints,
    type: Object
  },
  // controls the breakpoint mode relative to the carousel container or the viewport
  breakpointMode: {
    default: j.breakpointMode,
    validator(a) {
      return ya.includes(a);
    }
  },
  // enable/disable the carousel component
  enabled: {
    default: j.enabled,
    type: Boolean
  },
  // control the gap between slides
  gap: {
    default: j.gap,
    type: Number
  },
  // control the gap between slides
  height: {
    default: j.height,
    type: [Number, String]
  },
  ignoreAnimations: {
    default: !1,
    type: [Array, Boolean, String]
  },
  // count of items to be scrolled
  itemsToScroll: {
    default: j.itemsToScroll,
    type: Number
  },
  // count of items to showed per view
  itemsToShow: {
    default: j.itemsToShow,
    type: [Number, String]
  },
  // aria-labels and additional text labels
  i18n: {
    default: j.i18n,
    type: Object
  },
  // slide number number of initial slide
  modelValue: {
    default: void 0,
    type: Number
  },
  // toggle mouse dragging.
  mouseDrag: {
    default: j.mouseDrag,
    type: Boolean
  },
  // toggle mouse dragging.
  touchDrag: {
    default: j.touchDrag,
    type: Boolean
  },
  pauseAutoplayOnHover: {
    default: j.pauseAutoplayOnHover,
    type: Boolean
  },
  preventExcessiveDragging: {
    default: !1,
    type: Boolean,
    validator(a, i) {
      return a && i.wrapAround && console.warn('[vue3-carousel warn]: "preventExcessiveDragging" cannot be used with wrapAround. The setting will be ignored.'), !0;
    }
  },
  // control snap position alignment
  snapAlign: {
    default: j.snapAlign,
    validator(a) {
      return ka.includes(a);
    }
  },
  slideEffect: {
    type: String,
    default: j.slideEffect,
    validator(a) {
      return ha.includes(a);
    }
  },
  // sliding transition time in ms
  transition: {
    default: j.transition,
    type: Number
  },
  // control the gap between slides
  dir: {
    type: String,
    default: j.dir,
    validator(a, i) {
      if (!ba.includes(a))
        return !1;
      const o = a in Mt ? Mt[a] : a;
      return ["ttb", "btt"].includes(o) && (!i.height || i.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${a}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: j.wrapAround,
    type: Boolean
  }
}, bn = Se({
  name: "VueCarousel",
  props: yn,
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
  setup(a, { slots: i, emit: o, expose: l }) {
    var n;
    const t = rn(o), y = t.getSlides(), k = r(() => y.length), D = B(null), s = B(null), v = B(0), T = r(() => Object.assign(Object.assign(Object.assign({}, j), dn(a, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, j.i18n), a.i18n) })), f = Wt(Object.assign({}, T.value)), g = B((n = a.modelValue) !== null && n !== void 0 ? n : 0), V = B(g.value);
    _(g, (d) => V.value = d);
    const A = B(0), lt = r(() => Math.ceil((k.value - 1) / 2)), ie = r(() => k.value - 1), re = r(() => 0);
    let te = null, c = null, I = null;
    const ue = r(() => v.value + f.gap), U = r(() => {
      const d = f.dir || "ltr";
      return d in Mt ? Mt[d] : d;
    }), ne = r(() => ["rtl", "btt"].includes(U.value)), se = r(() => ["ttb", "btt"].includes(U.value)), de = r(() => f.itemsToShow === "auto"), H = r(() => se.value ? "height" : "width");
    function $e() {
      var d;
      if (!it.value)
        return;
      const h = (T.value.breakpointMode === "carousel" ? (d = D.value) === null || d === void 0 ? void 0 : d.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, w = Object.keys(a.breakpoints || {}).map((L) => Number(L)).sort((L, q) => +q - +L), E = {};
      w.some((L) => h >= L ? (Object.assign(E, a.breakpoints[L]), E.i18n && Object.assign(E.i18n, T.value.i18n, a.breakpoints[L].i18n), !0) : !1), Object.assign(f, T.value, E);
    }
    const x = Xt(() => {
      $e(), ot(), Ce();
    }), Ie = Wt(/* @__PURE__ */ new Set()), W = B([]);
    function Ot({ widthMultiplier: d, heightMultiplier: h }) {
      W.value = y.map((w) => {
        var E;
        const L = (E = w.exposed) === null || E === void 0 ? void 0 : E.getBoundingRect();
        return {
          width: L.width * d,
          height: L.height * h
        };
      });
    }
    const oe = B({
      width: 0,
      height: 0
    });
    function $t({ widthMultiplier: d, heightMultiplier: h }) {
      var w;
      const E = ((w = s.value) === null || w === void 0 ? void 0 : w.getBoundingClientRect()) || { width: 0, height: 0 };
      oe.value = {
        width: E.width * d,
        height: E.height * h
      };
    }
    function Ce() {
      if (!s.value)
        return;
      const d = fn(Ie);
      if ($t(d), Ot(d), de.value)
        v.value = un(W.value.map((h) => h[H.value]));
      else {
        const h = Number(f.itemsToShow), w = (h - 1) * f.gap;
        v.value = (oe.value[H.value] - w) / h;
      }
    }
    function ot() {
      !f.wrapAround && k.value > 0 && (g.value = Ne({
        val: g.value,
        max: ie.value,
        min: re.value
      })), de.value || (f.itemsToShow = Ne({
        val: Number(f.itemsToShow),
        max: k.value,
        min: 1
      }));
    }
    const ct = r(() => typeof a.ignoreAnimations == "string" ? a.ignoreAnimations.split(",") : Array.isArray(a.ignoreAnimations) ? a.ignoreAnimations : a.ignoreAnimations ? !1 : []);
    Ht(() => ot()), Ht(() => {
      Ce();
    });
    let ee;
    const vt = (d) => {
      const h = d.target;
      if (!(!(h != null && h.contains(D.value)) || Array.isArray(ct.value) && ct.value.includes(d.animationName)) && (Ie.add(h), !ee)) {
        const w = () => {
          ee = requestAnimationFrame(() => {
            Ce(), w();
          });
        };
        w();
      }
    }, Fe = (d) => {
      const h = d.target;
      h && Ie.delete(h), ee && Ie.size === 0 && (cancelAnimationFrame(ee), Ce());
    }, it = B(!1);
    typeof document < "u" && Ht(() => {
      it.value && ct.value !== !1 ? (document.addEventListener("animationstart", vt), document.addEventListener("animationend", Fe)) : (document.removeEventListener("animationstart", vt), document.removeEventListener("animationend", Fe));
    }), xt(() => {
      it.value = !0, $e(), _e(), D.value && (I = new ResizeObserver(x), I.observe(D.value)), o("init");
    }), _a(() => {
      it.value = !1, t.cleanup(), c && clearTimeout(c), ee && cancelAnimationFrame(ee), te && clearInterval(te), I && (I.disconnect(), I = null), typeof document < "u" && wt(), D.value && (D.value.removeEventListener("transitionend", Ce), D.value.removeEventListener("animationiteration", Ce));
    });
    let Be = !1;
    const rt = { x: 0, y: 0 }, ce = qt({ x: 0, y: 0 }), Pe = B(!1), ft = B(!1), He = () => {
      Pe.value = !0;
    }, Ft = () => {
      Pe.value = !1;
    }, pt = Xt((d) => {
      if (!d.ctrlKey)
        switch (d.key) {
          case "ArrowLeft":
          case "ArrowUp":
            se.value === d.key.endsWith("Up") && (ne.value ? je(!0) : qe(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            se.value === d.key.endsWith("Down") && (ne.value ? qe(!0) : je(!0));
            break;
        }
    }, 200), Pt = () => {
      document.addEventListener("keydown", pt);
    }, wt = () => {
      document.removeEventListener("keydown", pt);
    };
    function ut(d) {
      const h = d.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(h) || fe.value || (Be = d.type === "touchstart", !Be && (d.preventDefault(), d.button !== 0)))
        return;
      rt.x = "touches" in d ? d.touches[0].clientX : d.clientX, rt.y = "touches" in d ? d.touches[0].clientY : d.clientY;
      const w = Be ? "touchmove" : "mousemove", E = Be ? "touchend" : "mouseup";
      document.addEventListener(w, st, { passive: !1 }), document.addEventListener(E, ve, { passive: !0 });
    }
    const st = Xt((d) => {
      ft.value = !0;
      const h = "touches" in d ? d.touches[0].clientX : d.clientX, w = "touches" in d ? d.touches[0].clientY : d.clientY;
      ce.x = h - rt.x, ce.y = w - rt.y;
      const E = cn({
        isVertical: se.value,
        isReversed: ne.value,
        dragged: ce,
        effectiveSlideSize: ue.value
      });
      V.value = f.wrapAround ? g.value + E : Ne({
        val: g.value + E,
        max: ie.value,
        min: re.value
      }), o("drag", { deltaX: ce.x, deltaY: ce.y });
    });
    function ve() {
      if (st.cancel(), V.value !== g.value && !Be) {
        const w = (E) => {
          E.preventDefault(), window.removeEventListener("click", w);
        };
        window.addEventListener("click", w);
      }
      Ue(V.value), ce.x = 0, ce.y = 0, ft.value = !1;
      const d = Be ? "touchmove" : "mousemove", h = Be ? "touchend" : "mouseup";
      document.removeEventListener(d, st), document.removeEventListener(h, ve);
    }
    function _e() {
      !f.autoplay || f.autoplay <= 0 || (te = setInterval(() => {
        f.pauseAutoplayOnHover && Pe.value || je();
      }, f.autoplay));
    }
    function ae() {
      te && (clearInterval(te), te = null);
    }
    function mt() {
      ae(), _e();
    }
    const fe = B(!1);
    function Ue(d, h = !1) {
      if (!h && fe.value)
        return;
      let w = d, E = d;
      A.value = g.value, f.wrapAround ? E = Ca({
        val: w,
        max: ie.value,
        min: re.value
      }) : w = Ne({
        val: w,
        max: ie.value,
        min: re.value
      }), o("slide-start", {
        slidingToIndex: d,
        currentSlideIndex: g.value,
        prevSlideIndex: A.value,
        slidesCount: k.value
      }), ae(), fe.value = !0, g.value = w, E !== w && Dt.pause(), o("update:modelValue", E), c = setTimeout(() => {
        f.wrapAround && E !== w && (Dt.resume(), g.value = E, o("loop", {
          currentSlideIndex: g.value,
          slidingToIndex: d
        })), o("slide-end", {
          currentSlideIndex: g.value,
          prevSlideIndex: A.value,
          slidesCount: k.value
        }), fe.value = !1, mt();
      }, f.transition);
    }
    function je(d = !1) {
      Ue(g.value + f.itemsToScroll, d);
    }
    function qe(d = !1) {
      Ue(g.value - f.itemsToScroll, d);
    }
    function le() {
      $e(), ot(), Ce(), mt();
    }
    _(() => [T.value, a.breakpoints], () => $e(), { deep: !0 }), _(() => a.autoplay, () => mt());
    const Dt = _(() => a.modelValue, (d) => {
      d !== g.value && Ue(Number(d), !0);
    });
    o("before-init");
    const Ee = r(() => {
      if (!f.wrapAround)
        return { before: 0, after: 0 };
      if (de.value)
        return { before: y.length, after: y.length };
      const d = Number(f.itemsToShow), h = Math.ceil(d + (f.itemsToScroll - 1)), w = h - V.value, E = h - (k.value - (V.value + 1));
      return {
        before: Math.max(0, w),
        after: Math.max(0, E)
      };
    }), gt = r(() => Ee.value.before ? de.value ? W.value.slice(-1 * Ee.value.before).reduce((d, h) => d + h[H.value] + f.gap, 0) * -1 : Ee.value.before * ue.value * -1 : 0), Ae = r(() => {
      var d;
      if (de.value) {
        const h = (g.value % y.length + y.length) % y.length;
        return Jt({
          slideSize: (d = W.value[h]) === null || d === void 0 ? void 0 : d[H.value],
          viewportSize: oe.value[H.value],
          align: f.snapAlign
        });
      }
      return Jt({
        align: f.snapAlign,
        itemsToShow: +f.itemsToShow
      });
    }), ze = r(() => {
      let d = 0;
      if (de.value) {
        if (g.value < 0 ? d = W.value.slice(g.value).reduce((h, w) => h + w[H.value] + f.gap, 0) * -1 : d = W.value.slice(0, g.value).reduce((h, w) => h + w[H.value] + f.gap, 0), d -= Ae.value, !f.wrapAround) {
          const h = W.value.reduce((w, E) => w + E[H.value] + f.gap, 0) - oe.value[H.value] - f.gap;
          d = Ne({
            val: d,
            max: h,
            min: 0
          });
        }
      } else {
        let h = g.value - Ae.value;
        f.wrapAround || (h = Ne({
          val: h,
          max: k.value - +f.itemsToShow,
          min: 0
        })), d = h * ue.value;
      }
      return d * (ne.value ? 1 : -1);
    }), Tt = r(() => {
      var d, h;
      if (!de.value) {
        const L = g.value - Ae.value;
        return f.wrapAround ? {
          min: Math.floor(L),
          max: Math.ceil(L + Number(f.itemsToShow) - 1)
        } : {
          min: Math.floor(Ne({
            val: L,
            max: k.value - Number(f.itemsToShow),
            min: 0
          })),
          max: Math.ceil(Ne({
            val: L + Number(f.itemsToShow) - 1,
            max: k.value - 1,
            min: 0
          }))
        };
      }
      let w = 0;
      {
        let L = 0, q = 0 - Ee.value.before;
        const J = Math.abs(ze.value + gt.value);
        for (; L <= J; ) {
          const Q = (q % y.length + y.length) % y.length;
          L += ((d = W.value[Q]) === null || d === void 0 ? void 0 : d[H.value]) + f.gap, q++;
        }
        w = q - 1;
      }
      let E = 0;
      {
        let L = w, q = 0;
        for (L < 0 ? q = W.value.slice(0, L).reduce((J, Q) => J + Q[H.value] + f.gap, 0) - Math.abs(ze.value + gt.value) : q = W.value.slice(0, L).reduce((J, Q) => J + Q[H.value] + f.gap, 0) - Math.abs(ze.value); q < oe.value[H.value]; ) {
          const J = (L % y.length + y.length) % y.length;
          q += ((h = W.value[J]) === null || h === void 0 ? void 0 : h[H.value]) + f.gap, L++;
        }
        E = L - 1;
      }
      return {
        min: Math.floor(w),
        max: Math.ceil(E)
      };
    }), It = r(() => {
      if (f.slideEffect === "fade")
        return;
      const d = se.value ? "Y" : "X", h = se.value ? ce.y : ce.x;
      let w = ze.value + h;
      if (!f.wrapAround && f.preventExcessiveDragging) {
        let E = 0;
        de.value ? E = W.value.reduce((J, Q) => J + Q[H.value], 0) : E = (k.value - Number(f.itemsToShow)) * ue.value;
        const L = ne.value ? 0 : -1 * E, q = ne.value ? E : 0;
        w = Ne({
          val: w,
          min: L,
          max: q
        });
      }
      return `translate${d}(${w}px)`;
    }), _t = r(() => ({
      "--vc-transition-duration": fe.value ? Nt(f.transition, "ms") : void 0,
      "--vc-slide-gap": Nt(f.gap),
      "--vc-carousel-height": Nt(f.height),
      "--vc-cloned-offset": Nt(gt.value)
    })), pe = { slideTo: Ue, next: je, prev: qe }, Ut = qt({
      activeSlide: V,
      config: f,
      currentSlide: g,
      isSliding: fe,
      isVertical: se,
      maxSlide: ie,
      minSlide: re,
      nav: pe,
      normalizedDir: U,
      slideRegistry: t,
      slideSize: v,
      slides: y,
      slidesCount: k,
      viewport: s,
      visibleRange: Tt
    });
    va(nt, Ut);
    const yt = qt({
      config: f,
      currentSlide: g,
      maxSlide: ie,
      middleSlide: lt,
      minSlide: re,
      slideSize: v,
      slidesCount: k
    });
    return l({
      data: yt,
      nav: pe,
      next: je,
      prev: qe,
      restartCarousel: le,
      slideTo: Ue,
      updateBreakpointsConfig: $e,
      updateSlideSize: Ce,
      updateSlidesData: ot
    }), () => {
      var d;
      const h = i.default || i.slides, w = (h == null ? void 0 : h(yt)) || [], { before: E, after: L } = Ee.value, q = ia({
        slides: y,
        position: "before",
        toShow: E
      }), J = ia({
        slides: y,
        position: "after",
        toShow: L
      }), Q = [...q, ...w, ...J];
      if (!f.enabled || !Q.length)
        return Y("section", {
          ref: D,
          class: ["carousel", "is-disabled"]
        }, Q);
      const Bt = ((d = i.addons) === null || d === void 0 ? void 0 : d.call(i, yt)) || [], Et = Y("ol", {
        class: "carousel__track",
        style: { transform: It.value },
        onMousedownCapture: f.mouseDrag ? ut : null,
        onTouchstartPassiveCapture: f.touchDrag ? ut : null
      }, Q), jt = Y("div", { class: "carousel__viewport", ref: s }, Et);
      return Y("section", {
        ref: D,
        class: [
          "carousel",
          `is-${U.value}`,
          `is-effect-${f.slideEffect}`,
          {
            "is-vertical": se.value,
            "is-sliding": fe.value,
            "is-dragging": ft.value,
            "is-hover": Pe.value
          }
        ],
        dir: U.value,
        style: _t.value,
        "aria-label": f.i18n.ariaGallery,
        tabindex: "0",
        onFocus: Pt,
        onBlur: wt,
        onMouseenter: He,
        onMouseleave: Ft
      }, [jt, Bt, Y(gn)]);
    };
  }
});
var Qt;
(function(a) {
  a.arrowDown = "arrowDown", a.arrowLeft = "arrowLeft", a.arrowRight = "arrowRight", a.arrowUp = "arrowUp";
})(Qt || (Qt = {}));
const ua = (a) => `icon${a.charAt(0).toUpperCase() + a.slice(1)}`, hn = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function kn(a) {
  return a in Qt;
}
const sa = (a) => a && kn(a), da = Se({
  props: {
    name: {
      type: String,
      required: !0,
      validator: sa
    },
    title: {
      type: String,
      default: (a) => a.name ? j.i18n[ua(a.name)] : ""
    }
  },
  setup(a) {
    const i = Ct(nt, null);
    return () => {
      const o = a.name;
      if (!o || !sa(o))
        return;
      const l = hn[o], n = Y("path", { d: l }), t = (i == null ? void 0 : i.config.i18n[ua(o)]) || a.title, y = Y("title", t);
      return Y("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": t
      }, [y, n]);
    };
  }
}), Sn = Se({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(a, { slots: i, attrs: o }) {
    const l = Ct(nt);
    if (!l)
      return () => "";
    const { next: n, prev: t } = i, y = () => ({
      btt: "arrowDown",
      ltr: "arrowLeft",
      rtl: "arrowRight",
      ttb: "arrowUp"
    })[l.normalizedDir], k = () => ({
      btt: "arrowUp",
      ltr: "arrowRight",
      rtl: "arrowLeft",
      ttb: "arrowDown"
    })[l.normalizedDir], D = r(() => !l.config.wrapAround && l.currentSlide <= l.minSlide), s = r(() => !l.config.wrapAround && l.currentSlide >= l.maxSlide);
    return () => {
      const { i18n: v } = l.config, T = Y("button", Object.assign(Object.assign({ type: "button", disabled: D.value, "aria-label": v.ariaPreviousSlide, title: v.ariaPreviousSlide, onClick: l.nav.prev }, o), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": D.value },
        o.class
      ] }), (t == null ? void 0 : t()) || Y(da, { name: y() })), f = Y("button", Object.assign(Object.assign({ type: "button", disabled: s.value, "aria-label": v.ariaNextSlide, title: v.ariaNextSlide, onClick: l.nav.next }, o), { class: [
        "carousel__next",
        { "carousel__next--disabled": s.value },
        o.class
      ] }), (n == null ? void 0 : n()) || Y(da, { name: k() }));
      return [T, f];
    };
  }
}), Cn = Se({
  name: "CarouselPagination",
  props: {
    disableOnClick: {
      type: Boolean
    },
    paginateByItemsToShow: {
      type: Boolean
    }
  },
  setup(a) {
    const i = Ct(nt);
    if (!i)
      return () => "";
    const o = r(() => i.config.itemsToShow), l = r(() => Jt({
      align: i.config.snapAlign,
      itemsToShow: o.value
    })), n = r(() => a.paginateByItemsToShow && o.value > 1), t = r(() => Math.ceil((i.activeSlide - l.value) / o.value)), y = r(() => Math.ceil(i.slidesCount / o.value)), k = (D) => Ca(n.value ? {
      val: t.value,
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
      for (let T = n.value ? 0 : i.minSlide; T <= (n.value ? y.value - 1 : i.maxSlide); T++) {
        const f = Sa(i.config.i18n[n.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: T + 1
        }), g = k(T), V = Y("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": g
          },
          "aria-label": f,
          "aria-pressed": g,
          "aria-controls": (s = (D = i.slides[T]) === null || D === void 0 ? void 0 : D.exposed) === null || s === void 0 ? void 0 : s.id,
          title: f,
          disabled: a.disableOnClick,
          onClick: () => i.nav.slideTo(n.value ? Math.floor(T * +i.config.itemsToShow + l.value) : T)
        }), A = Y("li", { class: "carousel__pagination-item", key: T }, V);
        v.push(A);
      }
      return Y("ol", { class: "carousel__pagination" }, v);
    };
  }
}), ca = Se({
  name: "CarouselSlide",
  props: {
    id: {
      type: String,
      default: (a) => a.isClone ? void 0 : Ua()
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
  setup(a, { attrs: i, slots: o, expose: l }) {
    const n = Ct(nt);
    if (va(nt, void 0), !n)
      return () => "";
    const t = B(a.index), y = (V) => {
      t.value = V;
    }, k = ja(), D = () => {
      const V = k.vnode.el;
      return V ? V.getBoundingClientRect() : { width: 0, height: 0 };
    };
    l({
      id: a.id,
      setIndex: y,
      getBoundingRect: D
    });
    const s = r(() => t.value === n.activeSlide), v = r(() => t.value === n.activeSlide - 1), T = r(() => t.value === n.activeSlide + 1), f = r(() => t.value >= n.visibleRange.min && t.value <= n.visibleRange.max), g = r(() => {
      if (n.config.itemsToShow === "auto")
        return;
      const V = n.config.itemsToShow, A = n.config.gap > 0 && V > 1 ? `calc(${100 / V}% - ${n.config.gap * (V - 1) / V}px)` : `${100 / V}%`;
      return n.isVertical ? { height: A } : { width: A };
    });
    return n.slideRegistry.registerSlide(k, a.index), za(() => {
      n.slideRegistry.unregisterSlide(k);
    }), a.isClone && (xt(() => {
      ra(k.vnode);
    }), Ga(() => {
      ra(k.vnode);
    })), () => {
      var V, A;
      return n.config.enabled ? Y("li", {
        style: [i.style, Object.assign({}, g.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": a.isClone,
          "carousel__slide--visible": f.value,
          "carousel__slide--active": s.value,
          "carousel__slide--prev": v.value,
          "carousel__slide--next": T.value,
          "carousel__slide--sliding": n.isSliding
        },
        onFocusin: () => {
          n.viewport && (n.viewport.scrollLeft = 0), n.nav.slideTo(t.value);
        },
        id: a.isClone ? void 0 : a.id,
        "aria-hidden": a.isClone || void 0
      }, (A = o.default) === null || A === void 0 ? void 0 : A.call(o, {
        currentIndex: t.value,
        isActive: s.value,
        isClone: a.isClone,
        isPrev: v.value,
        isNext: T.value,
        isSliding: n.isSliding,
        isVisible: f.value
      })) : (V = o.default) === null || V === void 0 ? void 0 : V.call(o);
    };
  }
}), wn = (a, i, o, l) => {
  var y, k, D, s, v;
  if (!o) return 0;
  let n, t;
  if (o.type === Oe.Field ? [Ze.Number, Ze.Range].includes((y = o.field) == null ? void 0 : y.type) ? (n = parseFloat(a[o.key]), t = parseFloat(i[o.key])) : [Ze.Date, Ze.Date].includes((k = o.field) == null ? void 0 : k.type) ? (n = a[o.key], t = i[o.key]) : ((D = o.field) == null ? void 0 : D.type) === Ze.Select && ((s = o.field) != null && s.multiple) && ((v = o.field) == null ? void 0 : v.multipleDisplay) === Ya.Count ? (n = a[o.key].length, t = i[o.key].length) : (n = String(a[o.key]).toLowerCase(), t = String(i[o.key]).toLowerCase()) : (n = String(a[o.key]).toLowerCase(), t = String(i[o.key]).toLowerCase()), l === at.Asc) {
    if (n > t) return 1;
    if (t > n) return -1;
  } else {
    if (n > t) return -1;
    if (t > n) return 1;
  }
  return 0;
}, xe = (a, i, o, l = []) => {
  if (a.extractTitleFromColumn) {
    let t = l.find((y) => y.key === a.extractTitleFromColumn);
    if (t)
      return xe(t, i, o, l);
  }
  let n = a.type === Oe.ColumnIndex ? o : i[a.key];
  if (a.formatter && typeof a.formatter == "function") {
    let t = a.formatter(n, i, a, o);
    return typeof t == "string" && t.startsWith("__:") ? Xa(t.substring(3)) : t;
  }
  return n;
}, Dn = (a, i, o) => {
  if (!a.colspan) return -1;
  let l = i;
  return o.forEach((n) => {
    let t = ea(a, n);
    t > 0 && t < l && (l = t);
  }), l;
}, ea = (a, i) => a.colspan === !1 ? !1 : typeof a.colspan == "function" ? a.colspan(i) : a.colspan, wa = (a, i) => typeof a.preferSlot > "u" ? !0 : a.preferSlot === !1 ? !1 : typeof a.preferSlot == "function" ? a.preferSlot(i) : !0, Tn = (a, i, o) => {
  if (typeof a != "object" || !a.key && [Oe.Field].includes(a.type) || i.indexOf(a.key) > -1) return !1;
  let l = ea(a, o);
  return typeof a.colspan > "u" ? !0 : (typeof a.colspan < "u" && (typeof a.colspan == "function" ? l = parseInt(a.colspan(o)) : l = parseInt(a.colspan)), l > 0);
}, In = (a = []) => {
  if (a.length > 0) {
    for (let i = 0; i < a.length; ++i)
      if (a[i].sortable) return a[i].key;
  }
  return "";
}, Bn = (a, i) => {
  if (a.length > 0) {
    for (let o = 0; o < a.length; ++o)
      if (a[o].key === i) return a[o];
  }
  return null;
}, Da = (a) => {
  let i = [];
  return a.class && i.push(a.class), a.type && i.push(`is-${a.type}`), i.join(" ");
}, Zt = /* @__PURE__ */ Se({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new ma() },
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
  setup(a, { emit: i }) {
    const o = i, l = a, n = B(l.modelValue);
    _(() => l.modelValue, (v) => {
      n.value = v;
    }), _(n, (v) => {
      o("update:modelValue", v);
    });
    const t = () => {
      o("inline-drop");
    }, y = r(() => ({ ...l.column.slotData, item: n.value })), k = r(() => {
      var v, T, f, g;
      if ((v = l.column.field) != null && v.modalData && typeof ((T = l.column.field) == null ? void 0 : T.modalData) == "object")
        for (let V in l.column.field.modalData)
          if (typeof ((f = l.column.field) == null ? void 0 : f.modalData[V]) == "string" && l.column.field.modalData[V].startsWith("prop:")) {
            let A = l.column.field.modalData[V].substring(5);
            n.value[A];
          } else
            l.column.field.modalData[V];
      return (g = l.column.field) == null ? void 0 : g.modalData;
    }), D = r(() => typeof l.column.field == "string" && l.column.field.startsWith("prop:") ? Wa(l.column.field, n.value) : l.column.field), s = r(() => {
      var v, T, f, g;
      return l.column.type === Oe.Field ? !((T = (v = l.column) == null ? void 0 : v.field) != null && T.label) && (l.column.ensureFieldLabel || [
        Ze.Switch,
        Ze.Check
      ].includes((f = l.column.field) == null ? void 0 : f.type)) ? l.column.label : (g = l.column.field) == null ? void 0 : g.label : "";
    });
    return (v, T) => {
      const f = he("lkt-anchor"), g = he("lkt-button"), V = he("lkt-field");
      return v.column.type === b(Oe).Anchor ? (p(), O(f, X({ key: 0 }, v.column.anchor, { prop: n.value }), {
        default: P(() => [
          et(tt(b(xe)(v.column, n.value, v.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : v.column.type === b(Oe).Button ? (p(), O(g, X({ key: 1 }, v.column.button, { prop: n.value }), {
        default: P(() => [
          et(tt(b(xe)(v.column, n.value, v.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : v.column.type === b(Oe).Field ? (p(), O(V, X({
        key: 2,
        modelValue: n.value[v.column.key],
        "onUpdate:modelValue": T[0] || (T[0] = (A) => n.value[v.column.key] = A)
      }, {
        ...D.value,
        readMode: !v.hasInlineEditPerm || D.value.readMode,
        slotData: y.value,
        label: s.value,
        modalData: k.value,
        prop: n.value
      }), null, 16, ["modelValue"])) : v.column.type === b(Oe).InlineDrop ? (p(), O(g, X({ key: 3 }, v.column.button, {
        prop: n.value,
        onClick: t
      }), {
        default: P(() => [
          et(tt(b(xe)(v.column, n.value, v.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : v.column.type === b(Oe).ColumnIndex && v.column.field ? (p(), O(V, me(X({ key: 4 }, {
        ...D.value,
        modelValue: b(xe)(v.column, n.value, v.i, v.columns),
        readMode: !0,
        slotData: y.value,
        label: s.value,
        modalData: k.value,
        prop: n.value
      })), null, 16)) : (p(), C(G, { key: 5 }, [
        et(tt(b(xe)(v.column, n.value, v.i, v.columns)), 1)
      ], 64));
    };
  }
}), St = class St {
};
St.navButtonSlot = "", St.createButtonSlot = "", St.defaultEmptySlot = void 0;
let ke = St;
const En = ["data-i", "data-draggable"], An = ["data-role", "data-i"], Vn = {
  key: 1,
  class: "lkt-table-nav-cell"
}, Rn = { class: "lkt-table-nav-container" }, Ln = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, Nn = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, Mn = ["colspan"], On = ["colspan"], $n = ["colspan"], Fn = ["data-column", "colspan", "title"], Pn = /* @__PURE__ */ Se({
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
    rowDisplayType: { type: [Number, Function], default: Te.Auto },
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
  setup(a, { emit: i }) {
    const o = fa(), l = i, n = a, t = B(n.modelValue);
    let y = typeof n.rowDisplayType == "function" ? n.rowDisplayType(t.value, n.i) : n.rowDisplayType;
    y || (y = Te.Auto);
    const k = [Te.Auto, Te.PreferCustomItem].includes(y), D = [Te.Auto, Te.PreferItem].includes(y), s = (c) => l("click", c), v = r(() => {
      let c = [], I = typeof n.disabledDrag == "function" ? n.disabledDrag(t.value) : ie.value === !0;
      return !I && n.sortable && n.isDraggable ? c.push("handle") : I && c.push("disabled"), c.join(" ");
    }), T = r(() => ke.navButtonSlot !== ""), f = r(() => ke.navButtonSlot), g = () => {
      l("item-up", n.i);
    }, V = () => {
      l("item-down", n.i);
    }, A = () => {
      l("item-drop", n.i);
    };
    _(() => n.modelValue, (c) => t.value = c), _(t, (c) => {
      l("update:modelValue", c);
    }, { deep: !0 });
    const lt = r(() => typeof n.renderDrag == "function" ? n.renderDrag(t.value) : n.renderDrag === !0), ie = r(() => typeof n.disabledDrag == "function" ? n.disabledDrag(t.value) : n.disabledDrag === !0), re = r(() => v.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), te = r(() => {
      let c = [];
      return k && c.push("type-custom-item"), D && c.push("type-item"), typeof n.itemContainerClass == "function" ? c.push(n.itemContainerClass(t.value, n.i)) : n.itemContainerClass !== "" && c.push(n.itemContainerClass), c.join(" ");
    });
    return (c, I) => {
      const ue = he("lkt-button");
      return p(), C("tr", {
        "data-i": c.i,
        "data-draggable": c.isDraggable,
        class: Z(te.value)
      }, [
        c.sortable && c.editModeEnabled && lt.value ? (p(), C("td", {
          key: 0,
          "data-role": re.value,
          class: Z(v.value),
          "data-i": c.i
        }, I[2] || (I[2] = [
          ye("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]), 10, An)) : R("", !0),
        c.addNavigation && c.editModeEnabled ? (p(), C("td", Vn, [
          ye("div", Rn, [
            ge(ue, {
              palette: "table-nav",
              disabled: c.i === 0,
              onClick: g
            }, {
              default: P(() => [
                T.value ? (p(), O(be(f.value), {
                  key: 0,
                  direction: "up"
                })) : (p(), C("i", Ln))
              ]),
              _: 1
            }, 8, ["disabled"]),
            ge(ue, {
              palette: "table-nav",
              disabled: c.latestRow,
              onClick: V
            }, {
              default: P(() => [
                T.value ? (p(), O(be(f.value), {
                  key: 0,
                  direction: "down"
                })) : (p(), C("i", Nn))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : R("", !0),
        c.itemSlotComponent ? (p(), C("td", {
          key: "td" + c.i,
          colspan: c.visibleColumns.length
        }, [
          (p(), O(be(c.itemSlotComponent), me(pa({
            item: t.value,
            index: c.i,
            editing: c.editModeEnabled,
            perms: c.permissions,
            data: c.itemSlotData,
            events: c.itemSlotEvents
          })), null, 16))
        ], 8, Mn)) : b(k) && b(o)[`item-${c.i}`] ? (p(), C("td", {
          key: "td" + c.i,
          colspan: c.visibleColumns.length
        }, [
          F(c.$slots, `item-${c.i}`, {
            item: t.value,
            index: c.i,
            editing: c.editModeEnabled,
            canCreate: c.canCreate,
            canRead: c.canRead,
            canUpdate: c.canEdit,
            canDrop: c.canDrop,
            isLoading: c.isLoading,
            doDrop: () => A()
          })
        ], 8, On)) : b(D) && b(o).item ? (p(), C("td", {
          key: "td" + c.i,
          colspan: c.visibleColumns.length
        }, [
          F(c.$slots, "item", {
            item: t.value,
            index: c.i,
            editing: c.editModeEnabled,
            canCreate: c.canCreate,
            canRead: c.canRead,
            canUpdate: c.canEdit,
            canDrop: c.canDrop,
            isLoading: c.isLoading,
            doDrop: () => A()
          })
        ], 8, $n)) : (p(!0), C(G, { key: 5 }, De(c.visibleColumns, (U) => (p(), C(G, null, [
          b(Tn)(U, c.emptyColumns, t.value) ? (p(), C("td", {
            key: "td" + c.i,
            "data-column": U.key,
            colspan: b(ea)(U, t.value),
            title: b(xe)(U, t.value, c.i, c.visibleColumns),
            class: Z(b(Da)(U)),
            onClick: I[1] || (I[1] = (ne) => s(ne))
          }, [
            c.$slots[U.key] && b(wa)(U, t.value) ? F(c.$slots, U.key, {
              key: 0,
              value: t.value[U.key],
              item: t.value,
              column: U,
              i: c.i
            }) : t.value ? (p(), O(Zt, {
              key: 1,
              modelValue: t.value,
              "onUpdate:modelValue": I[0] || (I[0] = (ne) => t.value = ne),
              column: U,
              columns: c.visibleColumns,
              "edit-mode-enabled": c.editModeEnabled,
              "has-inline-edit-perm": c.hasInlineEditPerm,
              i: c.i,
              onInlineDrop: A
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : R("", !0)
          ], 10, Fn)) : R("", !0)
        ], 64))), 256))
      ], 10, En);
    };
  }
}), Yt = /* @__PURE__ */ Se({
  __name: "CreateButton",
  props: {
    config: { default: void 0 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: [
    "click",
    "append"
  ],
  setup(a, { emit: i }) {
    var s;
    const o = i, l = a, n = r(() => ke.createButtonSlot !== ""), t = r(() => ke.createButtonSlot), y = {
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
    return (v, T) => {
      const f = he("lkt-button");
      return p(), O(f, X(k, {
        disabled: v.disabled,
        onClick: D
      }), {
        default: P(() => [
          n.value ? (p(), O(be(t.value), { key: 0 })) : R("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), _n = ["data-column", "data-sortable", "data-sort", "colspan", "title"], Un = /* @__PURE__ */ Se({
  __name: "TableHeader",
  props: {
    column: { default: () => new ma() },
    sortBy: { default: "" },
    sortDirection: { default: "" },
    amountOfColumns: { default: 0 },
    items: { default: () => [] }
  },
  emits: [
    "click"
  ],
  setup(a, { emit: i }) {
    const o = i, l = a, n = r(() => Dn(l.column, l.amountOfColumns, l.items)), t = r(() => l.column.sortable === !0), y = r(() => t.value && l.sortBy === l.column.key ? l.sortDirection : ""), k = r(() => ga(l.column.label)), D = r(() => t.value && l.sortBy === l.column.key ? l.sortDirection === at.Asc ? Me.defaultTableSortAscIcon : l.sortDirection === at.Desc ? Me.defaultTableSortDescIcon : "" : ""), s = () => o("click", l.column);
    return (v, T) => (p(), C("th", {
      "data-column": v.column.key,
      "data-sortable": t.value,
      "data-sort": y.value,
      colspan: n.value,
      title: k.value,
      class: Z(b(Da)(v.column)),
      onClick: s
    }, [
      ye("div", null, [
        et(tt(k.value) + " ", 1),
        D.value ? (p(), C("i", {
          key: 0,
          class: Z(D.value)
        }, null, 2)) : R("", !0)
      ])
    ], 10, _n));
  }
}), jn = ["id"], zn = { class: "lkt-table-page-buttons" }, Gn = { class: "switch-edition-mode" }, Hn = { class: "switch-edition-mode" }, qn = {
  key: 0,
  class: "lkt-table-page-buttons"
}, Kn = {
  key: 1,
  class: "lkt-table-page-filters"
}, Xn = { class: "lkt-table" }, Yn = { key: 0 }, Wn = { key: 0 }, Jn = {
  key: 0,
  "data-role": "drag-indicator"
}, Qn = { key: 1 }, Zn = ["id"], xn = ["id"], el = ["data-i"], tl = ["id"], al = ["data-i"], nl = ["id"], ll = { class: "lkt-carousel-slide" }, ol = { class: "lkt-carousel-slide" }, il = ["id"], rl = {
  key: 2,
  class: "lkt-table-empty"
}, ul = {
  key: 4,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, sl = /* @__PURE__ */ Se({
  __name: "LktTable",
  props: /* @__PURE__ */ qa({
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
    calendar: {},
    calendarGroups: {},
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
    switchableTypes: {},
    switchableTypesButtons: {},
    useItemSlot: { type: [Boolean, Function] },
    events: {}
  }, Ja(Qa)),
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
  setup(a, { expose: i, emit: o }) {
    var na, la;
    const l = o, n = fa(), t = a, y = B(typeof t.sorter == "function" ? t.sorter : wn), k = B(In(t.columns)), D = B(at.Asc), s = B(t.modelValue), v = B(null), T = B(t.columns), f = B((na = t.paginator) == null ? void 0 : na.modelValue), g = B(t.loading), V = B(!1), A = B(t.perms), lt = B(null), ie = B(null), re = B(null), te = B({}), c = B(new en({ items: s.value }, t.dataStateConfig)), I = B(t.editMode), ue = B(0), U = B(null), ne = B(t.type), se = B(((la = t.carousel) == null ? void 0 : la.currentSlide) || 0), de = B(void 0), H = B(void 0), $e = B(void 0), x = B(Je(t.saveButton, Me.defaultSaveButton)), Ie = B(Je(t.createButton, Me.defaultCreateButton)), W = B(Je(t.editModeButton, Me.defaultEditModeButton)), Ot = B(Je(t.groupButton, Me.defaultGroupButton));
    _(() => t.saveButton, (e) => x.value = Je(t.saveButton, Me.defaultSaveButton)), _(() => t.createButton, (e) => Ie.value = Je(t.createButton, Me.defaultCreateButton)), _(() => t.editModeButton, (e) => W.value = Je(t.editModeButton, Me.defaultEditModeButton));
    const oe = B(!1);
    _(g, (e) => l("update:loading", e)), _(f, (e) => l("page", e));
    const $t = (e) => {
      A.value = e;
    }, Ce = (e) => {
      var u, N;
      if (Array.isArray(e.data)) {
        let $ = e.data;
        if (typeof ((u = t.events) == null ? void 0 : u.parseResults) == "function" && ($ = t.events.parseResults($)), s.value = [...s.value, ...$], [Qe.TimelineAsc, Qe.TimelineDesc, Qe.TimelineAscDesc].includes((N = t.paginator) == null ? void 0 : N.type)) {
          const z = nn(s.value, t.paginator.dateKey);
          de.value = z.oldest, H.value = z.newest;
        }
      }
      g.value = !1, V.value = !0, c.value.store({ items: s.value }).turnStoredIntoOriginal(), oe.value = !1, Lt(() => {
        He.value, l("read-response", e);
      });
    }, ot = () => Lt(() => {
      var e;
      (!t.paginator || ![Qe.LoadMore, Qe.Infinite].includes((e = t.paginator) == null ? void 0 : e.type)) && s.value.splice(0, s.value.length), g.value = !0;
    }), ct = () => {
      lt.value.doRefresh();
    }, ee = Za(12), vt = r(() => {
      if (!t.hideEmptyColumns) return [];
      let e = [];
      return T.value.forEach((u) => {
        let N = u.key, $ = !1;
        s.value.forEach((z) => {
          if (typeof z.checkEmpty == "function")
            return z.checkEmpty(z);
          z[N] && ($ = !0);
        }), $ || e.push(N);
      }), e;
    }), Fe = r(() => T.value.filter((e) => !e.hidden)), it = r(() => T.value.filter((e) => e.isForRowKey)), Be = r(() => T.value.map((e) => e.key)), rt = r(() => {
      let e = [];
      for (let u in n) Be.value.indexOf(u) !== -1 && e.push(u);
      return e;
    }), ce = r(() => {
      let e = [];
      for (let u in n) u.indexOf("slide-") !== -1 && e.push(u);
      return e;
    }), Pe = r(() => {
      var e;
      return t.hiddenSave || g.value || !((e = x.value) != null && e.resource || x.value.type) ? !1 : I.value && oe.value ? !0 : I.value;
    }), ft = r(() => ht.value && s.value.length >= t.requiredItemsForTopCreate || Ee.value ? !0 : Pe.value || I.value && ve.value), He = r(() => {
      var e, u;
      return ue.value, typeof ((e = x.value) == null ? void 0 : e.disabled) == "function" ? x.value.disabled({
        value: s.value,
        dataState: c.value
      }) : typeof ((u = x.value) == null ? void 0 : u.disabled) == "boolean" ? x.value.disabled : !oe.value;
    }), Ft = r(() => s.value.length), pt = r(() => {
      var e;
      return {
        items: s.value,
        ...(e = x.value) == null ? void 0 : e.resourceData
      };
    }), Pt = r(() => t.titleTag === "" ? "h2" : t.titleTag), wt = r(() => t.wrapContentTag === "" ? "div" : t.wrapContentTag), ut = r(() => ga(t.title)), st = r(() => {
      var e;
      return (e = t.drag) == null ? void 0 : e.enabled;
    }), ve = r(() => A.value.includes(Re.Create)), _e = r(() => A.value.includes("read")), ae = r(() => A.value.includes(Re.Update)), mt = r(() => A.value.includes(Re.Edit)), fe = r(() => A.value.includes(Re.InlineEdit)), Ue = r(() => A.value.includes(Re.ModalCreate)), je = r(() => A.value.includes(Re.InlineCreate)), qe = r(() => A.value.includes(Re.InlineCreateEver)), le = r(() => A.value.includes(Re.Drop)), Dt = r(() => A.value.includes(Re.SwitchEditMode)), Ee = r(() => !Dt.value || !ae.value && !le.value || !ae.value && le.value ? !1 : !g.value), gt = r(() => {
      var e;
      return (typeof ((e = t.paginator) == null ? void 0 : e.type) < "u" && [Qe.LoadMore, Qe.Infinite].includes(t.paginator.type) || !g.value) && s.value.length > 0;
    }), Ae = r(() => T.value.find((e) => e.isForAccordionHeader)), ze = r(() => T.value.find((e) => e.isCalendarDate)), Tt = r(() => T.value.find((e) => e.isCalendarGroup)), It = (e, u) => typeof t.customItemSlotName == "function" ? t.customItemSlotName(e, u) : "", _t = (e) => {
      let u = e.target;
      if (typeof u.dataset.column > "u")
        do
          u = u.parentNode;
        while (typeof u.dataset.column > "u" && u.tagName !== "TABLE" && u.tagName !== "body");
      if (u.tagName === "TD" && (u = u.parentNode, u = u.dataset.i, typeof u < "u"))
        return s.value[u];
    }, pe = () => {
      ue.value = ln();
    }, Ut = (e) => s.value[e], yt = (e) => {
      var u;
      return (u = v.value) == null ? void 0 : u.querySelector(`[data-i="${e}"]`);
    }, d = (e) => {
      e && e.sortable && (e.key === k.value && (D.value = D.value === at.Asc ? at.Desc : at.Asc), k.value = e.key, s.value = s.value.sort((u, N) => y.value(u, N, e, D.value)), pe(), l("sort", {
        sortBy: k.value,
        sortDirection: D.value
      }));
    }, h = (e) => {
      l("click", e);
    }, w = (e) => {
      var N, $, z, K, Xe, Ge, Ve, S;
      let u = parseInt((K = (z = ($ = (N = e == null ? void 0 : e.originalEvent) == null ? void 0 : N.toElement) == null ? void 0 : $.closest("tr")) == null ? void 0 : z.dataset) == null ? void 0 : K.i);
      return !(typeof ((Xe = t.drag) == null ? void 0 : Xe.isValid) == "function" && !((Ge = t.drag) != null && Ge.isValid(s.value[u])) || typeof ((Ve = t.drag) == null ? void 0 : Ve.isValid) == "boolean" && !((S = t.drag) != null && S.isValid));
    }, E = (e) => {
      var u, N;
      return typeof ((u = t.drag) == null ? void 0 : u.isDraggable) == "function" ? (N = t.drag) == null ? void 0 : N.isDraggable(e) : !0;
    }, L = () => {
      if (ve.value) {
        l("click-create");
        return;
      }
      if (je.value || qe.value) {
        if (typeof t.newValueGenerator == "function") {
          let e = t.newValueGenerator();
          if (typeof e == "object" || we.value !== Le.Table) {
            s.value.push(e);
            return;
          }
        }
        s.value.push({});
      } else
        l("click-create");
    }, q = (e) => {
      s.value.push(e);
    }, J = () => g.value = !0, Q = () => g.value = !1, Bt = (e, u) => {
      var N, $, z;
      if (!((N = x.value) != null && N.type && [
        Kt.Split,
        Kt.SplitEver,
        Kt.SplitLazy
      ].includes(($ = x.value) == null ? void 0 : $.type))) {
        if (l("before-save"), (z = x.value) != null && z.resource && (g.value = !1, !u.success)) {
          l("error", u.httpStatus);
          return;
        }
        c.value.turnStoredIntoOriginal(), oe.value = !1, l("save", u);
      }
    }, Et = (e, u, N) => {
      if (N >= e.length) {
        let $ = N - e.length + 1;
        for (; $--; ) e.push(void 0);
      }
      return e.splice(N, 0, e.splice(u, 1)[0]), e;
    }, jt = (e) => {
      Et(s.value, e, e - 1), pe();
    }, Ta = (e) => {
      Et(s.value, e, e + 1), pe();
    }, bt = (e) => {
      s.value.splice(e, 1), pe();
    }, ta = () => {
      var e;
      te.value && typeof ((e = te.value) == null ? void 0 : e.destroy) == "function" && (te.value.destroy(), te.value = {});
    }, zt = () => {
      U.value || (U.value = document.getElementById("lkt-table-body-" + ee)), te.value = new tn(U.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let u = e.oldIndex, N = e.newIndex;
          s.value.splice(N, 0, s.value.splice(u, 1)[0]), pe(), l("drag-end", s.value[N]);
        },
        onMove: function(e, u) {
          return w(e);
        }
      });
    }, At = (e, u, N = !1) => {
      let $ = [ue.value, ee, "row", u];
      return N && $.push("hidden"), it.value.forEach((z) => {
        let K = String(e[z.key]).toLowerCase();
        K.length > 50 && (K = K.substring(0, 50)), K = xa(K, " ", "-"), $.push(K);
      }), $.join("-");
    }, Gt = r(() => typeof t.createEnabledValidator == "function" ? t.createEnabledValidator({ items: s.value }) : !0), ht = r(() => t.createButton === !1 ? !1 : qe.value || ve.value && I.value || je.value && I.value || Ue.value && I.value), Ia = r(() => [Le.Ol, Le.Ul].includes(we.value)), kt = (e, u) => typeof t.itemDisplayChecker == "function" ? t.itemDisplayChecker(e, u) : !0, Vt = (e, u) => typeof t.itemContainerClass == "function" ? t.itemContainerClass(e, u) : t.itemContainerClass, Ba = (e, u) => Ae.value ? e[Ae.value.key] : "", Ke = r(() => typeof t.itemSlotComponent == "function" ? t.itemSlotComponent() : t.itemSlotComponent), Rt = r(() => typeof t.itemSlotData == "function" ? t.itemSlotData() : t.itemSlotData);
    xt(() => {
      var e;
      t.initialSorting && d(Bn(t.columns, k.value)), c.value.store({ items: s.value }).turnStoredIntoOriginal(), oe.value = !1, (e = t.drag) != null && e.enabled && Lt(() => {
        zt();
      });
    }), _(() => {
      var e;
      return (e = t.drag) == null ? void 0 : e.enabled;
    }, (e) => {
      e ? zt() : ta();
    }), _(() => t.type, (e) => {
      var u;
      (u = t.drag) != null && u.enabled ? zt() : ta();
    }), _(() => t.perms, (e) => A.value = e), _(A, (e) => l("update:perms", e)), _(I, (e) => {
      l("update:editMode", e);
    }), _(() => t.editMode, (e) => I.value = e), _(() => t.columns, (e) => T.value = e, { deep: !0 }), _(() => t.modelValue, (e) => {
      s.value = e;
    }, { deep: !0 }), _(s, (e) => {
      c.value.increment({ items: e }), oe.value = c.value.changed(), l("update:modelValue", e);
    }, { deep: !0 }), i({
      getItemByEvent: _t,
      getItemByIndex: Ut,
      getRowByIndex: yt,
      doRefresh: ct,
      doRemoveIndex: (e) => {
        s.value.splice(e, 1), pe();
      },
      getHtml: () => ie.value,
      reRender: pe,
      turnStoredIntoOriginal: () => {
        c.value.turnStoredIntoOriginal(), Lt(() => {
          pe();
        });
      }
    });
    const Ea = r(() => typeof ke.defaultEmptySlot < "u"), Aa = r(() => ke.defaultEmptySlot), Va = r(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled ? !1 : typeof t.drag.canRender > "u" ? !0 : t.drag.canRender), Ra = r(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled || typeof t.drag.isDisabled > "u" ? !1 : t.drag.isDisabled), La = r(() => typeof t.header == "object" && Object.keys(t.header).length > 0), we = r(() => Array.isArray(t.switchableTypes) && t.switchableTypes.length > 0 ? ne.value : t.type), Na = r(() => Array.isArray(t.switchableTypes) ? t.switchableTypes.length > 0 ? t.switchableTypes.includes(t.type) ? t.switchableTypes : [
      t.type,
      ...t.switchableTypes
    ] : [] : []), Ma = r(() => {
      let e = [];
      return Na.value.forEach((u) => {
        let N = t.switchableTypesButtons[u];
        e.push({
          ...N,
          class: [N.class, u === we.value ? "is-current" : ""].join(" "),
          events: {
            click: ($) => {
              ne.value = u, typeof t.switchableTypesButtons[u] == "function" && t.switchableTypesButtons[u]($);
            }
          }
        });
      }), e;
    }), Oa = r(() => {
      var e, u;
      return {
        ...t.header,
        topEndButtons: [
          ...typeof ((e = t.header) == null ? void 0 : e.topEndButtons) > "u" ? [] : (u = t.header) == null ? void 0 : u.topEndButtons,
          ...Ma.value
        ]
      };
    }), aa = (e, u) => typeof t.useItemSlot == "function" ? t.useItemSlot({ item: e, index: u }) === !0 : t.useItemSlot, $a = r(() => {
      if (we.value !== Le.Calendar || !ze.value || typeof ze.value > "u") return [];
      let e = [], u = [];
      return s.value.forEach((N) => {
        var S;
        let $ = N[ze.value.key], z = an("Y-m-d H:i:s", $), K;
        (S = Tt.value) != null && S.key && (K = N[Tt.value.key]);
        let Xe = {};
        K && t.calendarGroups && typeof t.calendarGroups[K] == "object" && (Xe = t.calendarGroups[K]);
        const Ge = [z, K].join("-");
        let Ve = -1;
        u.includes(Ge) ? Ve = u.findIndex((m) => m === Ge) : (Ve = u.length, u.push(Ge), e.push({
          date: $,
          data: {
            items: []
          },
          dot: {
            ...Xe,
            class: `lkt-calendar-group--${K}`
          }
        })), e[Ve].data.items.push(N);
      }), e;
    }), Fa = {
      dayPicked: (e) => {
        var u;
        typeof ((u = t.calendar.events) == null ? void 0 : u.dayPicked) == "function" && t.calendar.events.dayPicked(e);
      },
      visibleMonthChanged: (e) => {
        var u;
        typeof ((u = t.calendar.events) == null ? void 0 : u.visibleMonthChanged) == "function" && t.calendar.events.visibleMonthChanged(e), $e.value = e.visibleDate;
      }
    };
    return (e, u) => {
      const N = he("lkt-header"), $ = he("lkt-button"), z = he("lkt-accordion"), K = he("lkt-calendar"), Xe = he("lkt-loader"), Ge = he("lkt-paginator");
      return p(), C("section", {
        ref_key: "element",
        ref: ie,
        class: "lkt-table-page",
        id: "lkt-table-page-" + b(ee)
      }, [
        La.value ? (p(), O(N, me(X({ key: 0 }, Oa.value)), null, 16)) : ut.value || b(n).title ? (p(), C("header", {
          key: 1,
          class: Z(e.headerClass)
        }, [
          ut.value ? (p(), O(be(Pt.value), { key: 0 }, {
            default: P(() => [
              e.titleIcon ? (p(), C("i", {
                key: 0,
                class: Z(e.titleIcon)
              }, null, 2)) : R("", !0),
              et(" " + tt(ut.value), 1)
            ]),
            _: 1
          })) : R("", !0),
          b(n).title ? F(e.$slots, "title", { key: 1 }) : R("", !0)
        ], 2)) : R("", !0),
        (p(), O(be(wt.value), {
          class: Z(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: P(() => {
            var Ve;
            return [
              Ye(ye("div", zn, [
                e.groupButton !== !1 ? (p(), O($, X({
                  key: 0,
                  ref: "groupButton"
                }, Ot.value, { class: "lkt-item-crud-group-button" }), {
                  split: P(() => [
                    ye("div", Gn, [
                      Ye(ge($, X(W.value, {
                        checked: I.value,
                        "onUpdate:checked": u[0] || (u[0] = (S) => I.value = S)
                      }), null, 16, ["checked"]), [
                        [We, Ee.value]
                      ])
                    ]),
                    b(n)["prev-buttons-ever"] ? F(e.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: ae.value,
                      canDrop: le.value,
                      perms: e.perms
                    }) : R("", !0),
                    b(n)["prev-buttons"] ? F(e.$slots, "prev-buttons", {
                      key: 1,
                      canUpdate: ae.value,
                      canDrop: le.value,
                      perms: e.perms
                    }) : R("", !0),
                    Ye(ge($, X({
                      class: "lkt-table--save-button",
                      ref_key: "saveButtonRef",
                      ref: re
                    }, {
                      ...x.value,
                      disabled: He.value,
                      resourceData: pt.value
                    }, {
                      onLoading: J,
                      onLoaded: Q,
                      onClick: Bt
                    }), {
                      split: P(({ doClose: S, doRootClick: m }) => [
                        F(e.$slots, "button-save-split", {
                          doClose: S,
                          doRootClick: m,
                          dataState: c.value,
                          onButtonLoading: J,
                          onButtonLoaded: Q
                        })
                      ]),
                      default: P(() => [
                        b(n)["button-save"] ? F(e.$slots, "button-save", {
                          key: 0,
                          items: s.value,
                          editMode: e.editMode,
                          canUpdate: !He.value
                        }) : R("", !0)
                      ]),
                      _: 3
                    }, 16), [
                      [We, Pe.value]
                    ]),
                    ht.value && s.value.length >= e.requiredItemsForTopCreate ? (p(), O(Yt, {
                      key: 2,
                      config: Ie.value,
                      disabled: !Gt.value,
                      onClick: L,
                      onAppend: q
                    }, null, 8, ["config", "disabled"])) : R("", !0)
                  ]),
                  _: 3
                }, 16)) : R("", !0),
                b(n)["prev-buttons-ever"] ? F(e.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: ae.value,
                  canDrop: le.value,
                  perms: e.perms
                }) : R("", !0),
                b(n)["prev-buttons"] ? F(e.$slots, "prev-buttons", {
                  key: 2,
                  canUpdate: ae.value,
                  canDrop: le.value,
                  perms: e.perms
                }) : R("", !0),
                Ye(ge($, X({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: re
                }, {
                  ...x.value,
                  disabled: He.value,
                  resourceData: pt.value
                }, {
                  onLoading: J,
                  onLoaded: Q,
                  onClick: Bt
                }), {
                  split: P(({ doClose: S, doRootClick: m }) => [
                    F(e.$slots, "button-save-split", {
                      doClose: S,
                      doRootClick: m,
                      dataState: c.value,
                      onButtonLoading: J,
                      onButtonLoaded: Q
                    })
                  ]),
                  default: P(() => [
                    b(n)["button-save"] ? F(e.$slots, "button-save", {
                      key: 0,
                      items: s.value,
                      editMode: e.editMode,
                      canUpdate: !He.value
                    }) : R("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [We, Pe.value]
                ]),
                ht.value && s.value.length >= e.requiredItemsForTopCreate ? (p(), O(Yt, {
                  key: 3,
                  config: Ie.value,
                  disabled: !Gt.value,
                  onClick: L,
                  onAppend: q
                }, null, 8, ["config", "disabled"])) : R("", !0),
                ye("div", Hn, [
                  Ye(ge($, X(W.value, {
                    checked: I.value,
                    "onUpdate:checked": u[1] || (u[1] = (S) => I.value = S)
                  }), null, 16, ["checked"]), [
                    [We, Ee.value]
                  ])
                ])
              ], 512), [
                [We, ft.value]
              ]),
              b(n).buttons ? (p(), C("div", qn, [
                F(e.$slots, "buttons")
              ])) : R("", !0),
              V.value && b(n).filters ? (p(), C("div", Kn, [
                F(e.$slots, "filters", {
                  items: s.value,
                  isLoading: g.value
                })
              ])) : R("", !0),
              Ye(ye("div", Xn, [
                we.value === b(Le).Table ? (p(), C("table", Yn, [
                  e.hideTableHeader ? R("", !0) : (p(), C("thead", Wn, [
                    ye("tr", null, [
                      st.value && I.value ? (p(), C("th", Jn)) : R("", !0),
                      e.addNavigation && I.value ? (p(), C("th", Qn)) : R("", !0),
                      (p(!0), C(G, null, De(Fe.value, (S) => (p(), C(G, null, [
                        vt.value.indexOf(S.key) === -1 ? (p(), O(Un, {
                          key: 0,
                          column: S,
                          "sort-by": k.value,
                          "sort-direction": D.value,
                          "amount-of-columns": e.columns.length,
                          items: s.value,
                          onClick: (m) => d(S)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : R("", !0)
                      ], 64))), 256))
                    ])
                  ])),
                  ye("tbody", {
                    ref_key: "tableBody",
                    ref: v,
                    id: "lkt-table-body-" + b(ee),
                    class: Z(e.itemsContainerClass)
                  }, [
                    (p(!0), C(G, null, De(s.value, (S, m) => Ye((p(), O(Pn, {
                      modelValue: s.value[m],
                      "onUpdate:modelValue": (M) => s.value[m] = M,
                      key: At(S, m),
                      i: m,
                      "is-draggable": E(S),
                      sortable: st.value,
                      "visible-columns": Fe.value,
                      "empty-columns": vt.value,
                      "add-navigation": e.addNavigation,
                      "latest-row": m + 1 === Ft.value,
                      "can-drop": le.value && I.value,
                      "can-edit": mt.value && ae.value && I.value,
                      "can-read": _e.value,
                      "can-create": ve.value,
                      "edit-mode-enabled": I.value,
                      "has-inline-edit-perm": fe.value,
                      "row-display-type": e.rowDisplayType,
                      "render-drag": Va.value,
                      "disabled-drag": Ra.value,
                      "is-loading": g.value,
                      "item-container-class": e.itemContainerClass,
                      "item-slot-component": Ke.value,
                      "item-slot-data": Rt.value,
                      "item-slot-events": e.itemSlotEvents,
                      permissions: A.value,
                      onClick: h,
                      onItemUp: jt,
                      onItemDown: Ta,
                      onItemDrop: bt
                    }, Ka({ _: 2 }, [
                      b(n)[`item-${m}`] && aa(e.row, m) ? {
                        name: `item-${m}`,
                        fn: P((M) => [
                          F(e.$slots, `item-${m}`, me({
                            [e.slotItemVar || ""]: M.item,
                            index: m,
                            editing: M.editing,
                            canCreate: M.canCreate,
                            canRead: M.canRead,
                            canUpdate: M.canUpdate,
                            canDrop: M.canDrop,
                            isLoading: M.isLoading,
                            doDrop: M.doDrop
                          }))
                        ]),
                        key: "0"
                      } : b(n).item && aa(e.row, m) ? {
                        name: "item",
                        fn: P((M) => [
                          F(e.$slots, "item", me({
                            [e.slotItemVar || ""]: M.item,
                            index: m,
                            editing: M.editing,
                            canCreate: M.canCreate,
                            canRead: M.canRead,
                            canUpdate: M.canUpdate,
                            canDrop: M.canDrop,
                            isLoading: M.isLoading,
                            doDrop: M.doDrop
                          }))
                        ]),
                        key: "1"
                      } : void 0,
                      De(rt.value, (M) => ({
                        name: M,
                        fn: P((dt) => [
                          F(e.$slots, M, me({
                            [e.slotItemVar || ""]: dt.item,
                            value: dt.value,
                            column: dt.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class", "item-slot-component", "item-slot-data", "item-slot-events", "permissions"])), [
                      [We, kt(s.value[m], m)]
                    ])), 128))
                  ], 10, Zn)
                ])) : we.value === b(Le).Item ? (p(), C("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + b(ee),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (p(!0), C(G, null, De(s.value, (S, m) => (p(), C(G, {
                    key: At(S, m)
                  }, [
                    !e.skipTableItemsContainer && kt(S, m) ? (p(), C("div", {
                      key: 0,
                      class: Z(["lkt-table-item", Vt(S, m)]),
                      "data-i": m
                    }, [
                      Ke.value ? (p(), O(be(Ke.value), X({
                        key: 0,
                        ref_for: !0
                      }, {
                        item: S,
                        index: m,
                        editing: I.value,
                        perms: A.value,
                        data: Rt.value,
                        events: e.itemSlotEvents
                      }), null, 16)) : F(e.$slots, "item", me({
                        key: 1,
                        [e.slotItemVar || ""]: S,
                        index: m,
                        editing: I.value,
                        canCreate: ve.value,
                        canRead: _e.value,
                        canUpdate: ae.value,
                        canDrop: le.value,
                        isLoading: g.value,
                        doDrop: () => bt(m)
                      }))
                    ], 10, el)) : kt(S, m) ? F(e.$slots, "item", me({
                      key: 1,
                      class: Vt(S, m),
                      dataI: m,
                      [e.slotItemVar || ""]: S,
                      index: m,
                      editing: I.value,
                      canCreate: ve.value,
                      canRead: _e.value,
                      canUpdate: ae.value,
                      canDrop: le.value,
                      isLoading: g.value,
                      doDrop: () => bt(m)
                    })) : R("", !0)
                  ], 64))), 128))
                ], 10, xn)) : we.value === b(Le).Accordion ? (p(), C("div", {
                  key: 2,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + b(ee),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (p(!0), C(G, null, De(s.value, (S, m) => (p(), C(G, null, [
                    [b(Te).Auto, b(Te).PreferCustomItem].includes(e.rowDisplayType) && b(n)[It(S, m)] ? F(e.$slots, It(S, m), {
                      key: 0,
                      item: S,
                      index: m,
                      editing: I.value,
                      isLoading: g.value
                    }) : [b(Te).Auto, b(Te).PreferCustomItem].includes(e.rowDisplayType) && b(n)[`item-${m}`] ? F(e.$slots, `item-${m}`, {
                      key: 1,
                      item: S,
                      index: m,
                      editing: I.value,
                      isLoading: g.value
                    }) : (p(), C(G, { key: 2 }, [
                      kt(S, m) ? (p(), O(z, X({
                        class: ["lkt-table-item", Vt(S, m)],
                        "data-i": m,
                        key: At(S, m)
                      }, { ref_for: !0 }, {
                        ...e.accordion,
                        title: Ba(S)
                      }), {
                        header: P(() => [
                          ge(Zt, {
                            modelValue: s.value[m],
                            "onUpdate:modelValue": (M) => s.value[m] = M,
                            i: m,
                            column: Ae.value,
                            columns: Fe.value,
                            "edit-mode-enabled": I.value,
                            "has-inline-edit-perm": fe.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])
                        ]),
                        default: P(() => [
                          (p(!0), C(G, null, De(Fe.value, (M) => {
                            var dt, oa;
                            return p(), C(G, null, [
                              M.key !== ((dt = Ae.value) == null ? void 0 : dt.key) && e.$slots[M.key] && b(wa)(M, s.value[m]) ? F(e.$slots, M.key, {
                                key: 0,
                                value: s.value[m][M.key],
                                item: s.value[m],
                                column: M,
                                i: m
                              }) : (p(), C(G, { key: 1 }, [
                                M.key !== ((oa = Ae.value) == null ? void 0 : oa.key) ? (p(), O(Zt, {
                                  key: 0,
                                  modelValue: s.value[m],
                                  "onUpdate:modelValue": (Pa) => s.value[m] = Pa,
                                  i: m,
                                  column: M,
                                  columns: Fe.value,
                                  "edit-mode-enabled": I.value,
                                  "has-inline-edit-perm": fe.value
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])) : R("", !0)
                              ], 64))
                            ], 64);
                          }), 256))
                        ]),
                        _: 2
                      }, 1040, ["class", "data-i"])) : R("", !0)
                    ], 64))
                  ], 64))), 256))
                ], 10, tl)) : Ia.value ? (p(), O(be(we.value), {
                  key: 3,
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, {
                  default: P(() => [
                    (p(!0), C(G, null, De(s.value, (S, m) => (p(), C(G, {
                      key: At(S, m)
                    }, [
                      kt(S, m) ? (p(), C("li", {
                        key: 0,
                        class: Z(["lkt-table-item", Vt(S, m)]),
                        "data-i": m
                      }, [
                        Ke.value ? (p(), O(be(Ke.value), X({
                          key: 0,
                          ref_for: !0
                        }, {
                          item: S,
                          index: m,
                          editing: I.value,
                          perms: A.value,
                          data: Rt.value,
                          events: e.itemSlotEvents
                        }), null, 16)) : F(e.$slots, "item", me({
                          key: 1,
                          [e.slotItemVar || ""]: S,
                          index: m,
                          editing: I.value,
                          canCreate: ve.value,
                          canRead: _e.value,
                          canUpdate: ae.value,
                          canDrop: le.value,
                          isLoading: g.value,
                          doDrop: () => bt(m)
                        }))
                      ], 10, al)) : R("", !0)
                    ], 64))), 128))
                  ]),
                  _: 3
                }, 8, ["class"])) : we.value === b(Le).Carousel ? (p(), C("div", {
                  key: 4,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + b(ee),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  ge(b(bn), X({
                    modelValue: se.value,
                    "onUpdate:modelValue": u[2] || (u[2] = (S) => se.value = S)
                  }, e.carousel, {
                    "wrap-around": ((Ve = e.carousel) == null ? void 0 : Ve.infinite) === !0
                  }), {
                    addons: P(() => [
                      ge(b(Sn)),
                      ge(b(Cn))
                    ]),
                    default: P(() => [
                      (p(!0), C(G, null, De(ce.value, (S, m) => (p(), O(b(ca), {
                        key: S,
                        index: m
                      }, {
                        default: P(() => [
                          ye("div", ll, [
                            F(e.$slots, S)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (p(!0), C(G, null, De(s.value, (S, m) => (p(), O(b(ca), {
                        key: e.slide,
                        index: m
                      }, {
                        default: P(() => [
                          ye("div", ol, [
                            Ke.value ? (p(), O(be(Ke.value), X({
                              key: 0,
                              ref_for: !0
                            }, {
                              item: S,
                              index: m,
                              editing: I.value,
                              perms: A.value,
                              data: Rt.value,
                              events: e.itemSlotEvents
                            }), null, 16)) : F(e.$slots, "item", me({
                              key: 1,
                              [e.slotItemVar || ""]: S,
                              index: m,
                              editing: I.value,
                              canCreate: ve.value,
                              canRead: _e.value,
                              canUpdate: ae.value,
                              canDrop: le.value,
                              isLoading: g.value,
                              doDrop: () => bt(m)
                            }))
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128))
                    ]),
                    _: 3
                  }, 16, ["modelValue", "wrap-around"])
                ], 10, nl)) : we.value === b(Le).Calendar ? (p(), C("div", {
                  key: 5,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + b(ee),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  ge(K, me(pa({
                    ...e.calendar,
                    items: $a.value,
                    events: Fa
                  })), null, 16)
                ], 10, il)) : R("", !0)
              ], 512), [
                [We, gt.value]
              ]),
              !g.value && s.value.length === 0 ? (p(), C("div", rl, [
                b(n).empty ? F(e.$slots, "empty", { key: 0 }) : Ea.value ? (p(), O(be(Aa.value), {
                  key: 1,
                  message: e.noResultsText
                }, null, 8, ["message"])) : e.noResultsText ? (p(), C(G, { key: 2 }, [
                  et(tt(e.noResultsText), 1)
                ], 64)) : R("", !0)
              ])) : R("", !0),
              g.value ? (p(), O(Xe, { key: 3 })) : R("", !0),
              ht.value || b(n).bottomButtons ? (p(), C("div", ul, [
                ht.value && s.value.length >= e.requiredItemsForBottomCreate ? (p(), O(Yt, {
                  key: 0,
                  config: Ie.value,
                  disabled: !Gt.value,
                  onClick: L,
                  onAppend: q
                }, null, 8, ["config", "disabled"])) : R("", !0),
                F(e.$slots, "bottom-buttons")
              ])) : R("", !0),
              e.paginator && Object.keys(e.paginator).length > 0 ? (p(), O(Ge, X({
                key: 5,
                ref_key: "paginatorRef",
                ref: lt
              }, {
                ...e.paginator,
                timelineOldestDate: de.value,
                timelineNewestDate: H.value,
                timelineVisibleDate: $e.value
              }, {
                modelValue: f.value,
                "onUpdate:modelValue": u[3] || (u[3] = (S) => f.value = S),
                onLoading: ot,
                onPerms: $t,
                onResponse: Ce
              }), null, 16, ["modelValue"])) : R("", !0),
              b(n)["web-element-actions"] ? F(e.$slots, "web-element-actions", { key: 6 }) : R("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, jn);
    };
  }
}), yl = {
  install: (a) => {
    a.component("lkt-table") === void 0 && a.component("lkt-table", sl);
  }
}, bl = (a) => (ke.navButtonSlot = a, !0), hl = (a) => (ke.createButtonSlot = a, !0), kl = (a) => {
  ke.defaultEmptySlot = a;
};
export {
  wl as Column,
  Dl as createColumn,
  yl as default,
  wn as defaultTableSorter,
  hl as setTableCreateButtonSlot,
  kl as setTableEmptySlot,
  bl as setTableNavButtonSlot
};
