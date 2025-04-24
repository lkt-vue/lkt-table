import { defineComponent as re, computed as s, ref as D, shallowReactive as qt, watch as F, watchEffect as Ut, onMounted as Yt, onBeforeUnmount as Aa, reactive as Ft, provide as ia, h as K, useId as Va, inject as bt, getCurrentInstance as Ra, onUnmounted as Ma, onUpdated as Na, cloneVNode as La, resolveComponent as be, createBlock as _, createElementBlock as h, unref as w, openBlock as v, normalizeProps as $e, mergeProps as ae, withCtx as U, createTextVNode as ot, toDisplayString as Xe, Fragment as H, withModifiers as ra, createCommentVNode as B, resolveDynamicComponent as Re, useSlots as ua, normalizeClass as Z, createElementVNode as x, createVNode as se, renderSlot as P, renderList as ie, withDirectives as Oe, vShow as Pe, mergeDefaults as _a, nextTick as It, createSlots as Zt } from "vue";
import { __ as $a } from "lkt-i18n";
import { SortDirection as Ge, Column as sa, extractPropValue as Oa, ColumnType as gt, FieldType as xt, prepareResourceData as da, TableRowType as nt, extractI18nValue as ca, LktSettings as ge, ensureButtonConfig as Te, TablePermission as Ee, PaginatorType as Tt, TableType as qe, getDefaultValues as Pa, Table as Ua, ButtonType as jt } from "lkt-vue-kernel";
import { Column as Cn, createColumn as wn } from "lkt-vue-kernel";
import { replaceAll as va, generateRandomString as Fa } from "lkt-string-tools";
import { DataState as ja } from "lkt-data-state";
import za from "sortablejs";
import { time as Ha } from "lkt-date-tools";
/**
 * Vue 3 Carousel 0.14.0
 * (c) 2025
 * @license MIT
 */
const fa = ["viewport", "carousel"], At = {
  "bottom-to-top": "btt",
  "left-to-right": "ltr",
  "right-to-left": "rtl",
  "top-to-bottom": "ttb"
}, pa = [
  "ltr",
  "left-to-right",
  "rtl",
  "right-to-left",
  "ttb",
  "top-to-bottom",
  "btt",
  "bottom-to-top"
], qa = {
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
}, ma = ["slide", "fade"], ga = [
  "center",
  "start",
  "end",
  "center-even",
  "center-odd"
], z = {
  autoplay: 0,
  breakpointMode: fa[0],
  breakpoints: void 0,
  dir: pa[0],
  enabled: !0,
  gap: 0,
  height: "auto",
  i18n: qa,
  ignoreAnimations: !1,
  itemsToScroll: 1,
  itemsToShow: 1,
  modelValue: 0,
  mouseDrag: !0,
  pauseAutoplayOnHover: !1,
  preventExcessiveDragging: !1,
  slideEffect: ma[0],
  snapAlign: ga[0],
  touchDrag: !0,
  transition: 300,
  wrapAround: !1
}, Ye = Symbol("carousel"), Ga = (t) => {
  const o = qt([]), i = (n) => {
    n !== void 0 ? o.slice(n).forEach((l, a) => {
      var f;
      (f = l.exposed) === null || f === void 0 || f.setIndex(n + a);
    }) : o.forEach((l, a) => {
      var f;
      (f = l.exposed) === null || f === void 0 || f.setIndex(a);
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
function Xa(t) {
  return t.length === 0 ? 0 : t.reduce((i, n) => i + n, 0) / t.length;
}
function ea({ slides: t, position: o, toShow: i }) {
  const n = [], l = o === "before", a = l ? -i : 0, f = l ? 0 : i;
  if (t.length <= 0)
    return n;
  for (let b = a; b < f; b++) {
    const T = {
      index: l ? b : b + t.length,
      isClone: !0,
      position: o,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${o}-${b}`
    }, u = t[(b % t.length + t.length) % t.length].vnode, m = La(u, T);
    m.el = null, n.push(m);
  }
  return n;
}
const Ya = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function ta(t) {
  if (!t.el || !(t.el instanceof Element))
    return;
  const o = t.el.querySelectorAll(Ya);
  for (const i of o)
    i instanceof HTMLElement && !i.hasAttribute("disabled") && i.getAttribute("aria-hidden") !== "true" && i.setAttribute("tabindex", "-1");
}
function Ka(t, o) {
  return Object.keys(t).filter((i) => !o.includes(i)).reduce((i, n) => (i[n] = t[n], i), {});
}
function Wa(t) {
  const { isVertical: o, isReversed: i, dragged: n, effectiveSlideSize: l } = t, a = o ? n.y : n.x;
  if (a === 0)
    return 0;
  const f = Math.round(a / l);
  return i ? f : -f;
}
function Ae({ val: t, max: o, min: i }) {
  return o < i ? t : Math.min(Math.max(t, isNaN(i) ? t : i), isNaN(o) ? t : o);
}
function Ja(t) {
  const { transform: o } = window.getComputedStyle(t);
  return o.split(/[(,)]/).slice(1, -1).map((i) => parseFloat(i));
}
function Qa(t) {
  let o = 1, i = 1;
  return t.forEach((n) => {
    const l = Ja(n);
    l.length === 6 && (o /= l[0], i /= l[3]);
  }), { widthMultiplier: o, heightMultiplier: i };
}
function Za(t, o) {
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
function xa(t, o, i) {
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
function Gt({ slideSize: t, viewportSize: o, align: i, itemsToShow: n }) {
  return n !== void 0 ? Za(i, n) : t !== void 0 && o !== void 0 ? xa(i, t, o) : 0;
}
function ba(t = "", o = {}) {
  return Object.entries(o).reduce((i, [n, l]) => i.replace(`{${n}}`, String(l)), t);
}
function ya({ val: t, max: o, min: i = 0 }) {
  const n = o - i + 1;
  return ((t - i) % n + n) % n + i;
}
function zt(t, o = 0) {
  let i = !1, n = 0, l = null;
  function a(...f) {
    if (i)
      return;
    i = !0;
    const b = () => {
      l = requestAnimationFrame((g) => {
        g - n > o ? (n = g, t(...f), i = !1) : b();
      });
    };
    b();
  }
  return a.cancel = () => {
    l && (cancelAnimationFrame(l), l = null, i = !1);
  }, a;
}
function Et(t, o = "px") {
  if (!(t == null || t === ""))
    return typeof t == "number" || parseFloat(t).toString() === t ? `${t}${o}` : t;
}
const el = re({
  name: "CarouselAria",
  setup() {
    const t = bt(Ye);
    return t ? () => K("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, ba(t.config.i18n.itemXofY, {
      currentSlide: t.currentSlide + 1,
      slidesCount: t.slidesCount
    })) : () => "";
  }
}), tl = {
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
      return fa.includes(t);
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
      return ga.includes(t);
    }
  },
  slideEffect: {
    type: String,
    default: z.slideEffect,
    validator(t) {
      return ma.includes(t);
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
      if (!pa.includes(t))
        return !1;
      const i = t in At ? At[t] : t;
      return ["ttb", "btt"].includes(i) && (!o.height || o.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${t}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: z.wrapAround,
    type: Boolean
  }
}, al = re({
  name: "VueCarousel",
  props: tl,
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
    const a = Ga(i), f = a.getSlides(), b = s(() => f.length), g = D(null), T = D(null), u = D(0), m = s(() => Object.assign(Object.assign(Object.assign({}, z), Ka(t, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, z.i18n), t.i18n) })), c = qt(Object.assign({}, m.value)), S = D((l = t.modelValue) !== null && l !== void 0 ? l : 0), A = D(S.value);
    F(S, (d) => A.value = d);
    const V = D(0), le = s(() => Math.ceil((b.value - 1) / 2)), j = s(() => b.value - 1), de = s(() => 0);
    let ce = null, Me = null, ue = null;
    const X = s(() => u.value + c.gap), r = s(() => {
      const d = c.dir || "ltr";
      return d in At ? At[d] : d;
    }), $ = s(() => ["rtl", "btt"].includes(r.value)), ee = s(() => ["ttb", "btt"].includes(r.value)), O = s(() => c.itemsToShow === "auto"), M = s(() => ee.value ? "height" : "width");
    function ye() {
      var d;
      if (!Je.value)
        return;
      const y = (m.value.breakpointMode === "carousel" ? (d = g.value) === null || d === void 0 ? void 0 : d.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, C = Object.keys(t.breakpoints || {}).map((N) => Number(N)).sort((N, G) => +G - +N), E = {};
      C.some((N) => y >= N ? (Object.assign(E, t.breakpoints[N]), E.i18n && Object.assign(E.i18n, m.value.i18n, t.breakpoints[N].i18n), !0) : !1), Object.assign(c, m.value, E);
    }
    const rt = zt(() => {
      ye(), Ke(), he();
    }), Ue = qt(/* @__PURE__ */ new Set()), ne = D([]);
    function Ne({ widthMultiplier: d, heightMultiplier: y }) {
      ne.value = f.map((C) => {
        var E;
        const N = (E = C.exposed) === null || E === void 0 ? void 0 : E.getBoundingRect();
        return {
          width: N.width * d,
          height: N.height * y
        };
      });
    }
    const Fe = D({
      width: 0,
      height: 0
    });
    function Rt({ widthMultiplier: d, heightMultiplier: y }) {
      var C;
      const E = ((C = T.value) === null || C === void 0 ? void 0 : C.getBoundingClientRect()) || { width: 0, height: 0 };
      Fe.value = {
        width: E.width * d,
        height: E.height * y
      };
    }
    function he() {
      if (!T.value)
        return;
      const d = Qa(Ue);
      if (Rt(d), Ne(d), O.value)
        u.value = Xa(ne.value.map((y) => y[M.value]));
      else {
        const y = Number(c.itemsToShow), C = (y - 1) * c.gap;
        u.value = (Fe.value[M.value] - C) / y;
      }
    }
    function Ke() {
      !c.wrapAround && b.value > 0 && (S.value = Ae({
        val: S.value,
        max: j.value,
        min: de.value
      })), O.value || (c.itemsToShow = Ae({
        val: Number(c.itemsToShow),
        max: b.value,
        min: 1
      }));
    }
    const ve = s(() => typeof t.ignoreAnimations == "string" ? t.ignoreAnimations.split(",") : Array.isArray(t.ignoreAnimations) ? t.ignoreAnimations : t.ignoreAnimations ? !1 : []);
    Ut(() => Ke()), Ut(() => {
      he();
    });
    let ke;
    const Se = (d) => {
      const y = d.target;
      if (!(!(y != null && y.contains(g.value)) || Array.isArray(ve.value) && ve.value.includes(d.animationName)) && (Ue.add(y), !ke)) {
        const C = () => {
          ke = requestAnimationFrame(() => {
            he(), C();
          });
        };
        C();
      }
    }, We = (d) => {
      const y = d.target;
      y && Ue.delete(y), ke && Ue.size === 0 && (cancelAnimationFrame(ke), he());
    }, Je = D(!1);
    typeof document < "u" && Ut(() => {
      Je.value && ve.value !== !1 ? (document.addEventListener("animationstart", Se), document.addEventListener("animationend", We)) : (document.removeEventListener("animationstart", Se), document.removeEventListener("animationend", We));
    }), Yt(() => {
      Je.value = !0, ye(), Ze(), g.value && (ue = new ResizeObserver(rt), ue.observe(g.value)), i("init");
    }), Aa(() => {
      Je.value = !1, a.cleanup(), Me && clearTimeout(Me), ke && cancelAnimationFrame(ke), ce && clearInterval(ce), ue && (ue.disconnect(), ue = null), typeof document < "u" && dt(), g.value && (g.value.removeEventListener("transitionend", he), g.value.removeEventListener("animationiteration", he));
    });
    let De = !1;
    const je = { x: 0, y: 0 }, fe = Ft({ x: 0, y: 0 }), ze = D(!1), ut = D(!1), st = () => {
      ze.value = !0;
    }, Mt = () => {
      ze.value = !1;
    }, Le = zt((d) => {
      if (!d.ctrlKey)
        switch (d.key) {
          case "ArrowLeft":
          case "ArrowUp":
            ee.value === d.key.endsWith("Up") && ($.value ? we(!0) : xe(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            ee.value === d.key.endsWith("Down") && ($.value ? xe(!0) : we(!0));
            break;
        }
    }, 200), Nt = () => {
      document.addEventListener("keydown", Le);
    }, dt = () => {
      document.removeEventListener("keydown", Le);
    };
    function yt(d) {
      const y = d.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(y) || q.value || (De = d.type === "touchstart", !De && (d.preventDefault(), d.button !== 0)))
        return;
      je.x = "touches" in d ? d.touches[0].clientX : d.clientX, je.y = "touches" in d ? d.touches[0].clientY : d.clientY;
      const C = De ? "touchmove" : "mousemove", E = De ? "touchend" : "mouseup";
      document.addEventListener(C, ct, { passive: !1 }), document.addEventListener(E, Qe, { passive: !0 });
    }
    const ct = zt((d) => {
      ut.value = !0;
      const y = "touches" in d ? d.touches[0].clientX : d.clientX, C = "touches" in d ? d.touches[0].clientY : d.clientY;
      fe.x = y - je.x, fe.y = C - je.y;
      const E = Wa({
        isVertical: ee.value,
        isReversed: $.value,
        dragged: fe,
        effectiveSlideSize: X.value
      });
      A.value = c.wrapAround ? S.value + E : Ae({
        val: S.value + E,
        max: j.value,
        min: de.value
      }), i("drag", { deltaX: fe.x, deltaY: fe.y });
    });
    function Qe() {
      if (ct.cancel(), A.value !== S.value && !De) {
        const C = (E) => {
          E.preventDefault(), window.removeEventListener("click", C);
        };
        window.addEventListener("click", C);
      }
      Ie(A.value), fe.x = 0, fe.y = 0, ut.value = !1;
      const d = De ? "touchmove" : "mousemove", y = De ? "touchend" : "mouseup";
      document.removeEventListener(d, ct), document.removeEventListener(y, Qe);
    }
    function Ze() {
      !c.autoplay || c.autoplay <= 0 || (ce = setInterval(() => {
        c.pauseAutoplayOnHover && ze.value || we();
      }, c.autoplay));
    }
    function Ce() {
      ce && (clearInterval(ce), ce = null);
    }
    function _e() {
      Ce(), Ze();
    }
    const q = D(!1);
    function Ie(d, y = !1) {
      if (!y && q.value)
        return;
      let C = d, E = d;
      V.value = S.value, c.wrapAround ? E = ya({
        val: C,
        max: j.value,
        min: de.value
      }) : C = Ae({
        val: C,
        max: j.value,
        min: de.value
      }), i("slide-start", {
        slidingToIndex: d,
        currentSlideIndex: S.value,
        prevSlideIndex: V.value,
        slidesCount: b.value
      }), Ce(), q.value = !0, S.value = C, E !== C && vt.pause(), i("update:modelValue", E), Me = setTimeout(() => {
        c.wrapAround && E !== C && (vt.resume(), S.value = E, i("loop", {
          currentSlideIndex: S.value,
          slidingToIndex: d
        })), i("slide-end", {
          currentSlideIndex: S.value,
          prevSlideIndex: V.value,
          slidesCount: b.value
        }), q.value = !1, _e();
      }, c.transition);
    }
    function we(d = !1) {
      Ie(S.value + c.itemsToScroll, d);
    }
    function xe(d = !1) {
      Ie(S.value - c.itemsToScroll, d);
    }
    function ht() {
      ye(), Ke(), he(), _e();
    }
    F(() => [m.value, t.breakpoints], () => ye(), { deep: !0 }), F(() => t.autoplay, () => _e());
    const vt = F(() => t.modelValue, (d) => {
      d !== S.value && Ie(Number(d), !0);
    });
    i("before-init");
    const Y = s(() => {
      if (!c.wrapAround)
        return { before: 0, after: 0 };
      if (O.value)
        return { before: f.length, after: f.length };
      const d = Number(c.itemsToShow), y = Math.ceil(d + (c.itemsToScroll - 1)), C = y - A.value, E = y - (b.value - (A.value + 1));
      return {
        before: Math.max(0, C),
        after: Math.max(0, E)
      };
    }), ft = s(() => Y.value.before ? O.value ? ne.value.slice(-1 * Y.value.before).reduce((d, y) => d + y[M.value] + c.gap, 0) * -1 : Y.value.before * X.value * -1 : 0), He = s(() => {
      var d;
      if (O.value) {
        const y = (S.value % f.length + f.length) % f.length;
        return Gt({
          slideSize: (d = ne.value[y]) === null || d === void 0 ? void 0 : d[M.value],
          viewportSize: Fe.value[M.value],
          align: c.snapAlign
        });
      }
      return Gt({
        align: c.snapAlign,
        itemsToShow: +c.itemsToShow
      });
    }), et = s(() => {
      let d = 0;
      if (O.value) {
        if (S.value < 0 ? d = ne.value.slice(S.value).reduce((y, C) => y + C[M.value] + c.gap, 0) * -1 : d = ne.value.slice(0, S.value).reduce((y, C) => y + C[M.value] + c.gap, 0), d -= He.value, !c.wrapAround) {
          const y = ne.value.reduce((C, E) => C + E[M.value] + c.gap, 0) - Fe.value[M.value] - c.gap;
          d = Ae({
            val: d,
            max: y,
            min: 0
          });
        }
      } else {
        let y = S.value - He.value;
        c.wrapAround || (y = Ae({
          val: y,
          max: b.value - +c.itemsToShow,
          min: 0
        })), d = y * X.value;
      }
      return d * ($.value ? 1 : -1);
    }), tt = s(() => {
      var d, y;
      if (!O.value) {
        const N = S.value - He.value;
        return c.wrapAround ? {
          min: Math.floor(N),
          max: Math.ceil(N + Number(c.itemsToShow) - 1)
        } : {
          min: Math.floor(Ae({
            val: N,
            max: b.value - Number(c.itemsToShow),
            min: 0
          })),
          max: Math.ceil(Ae({
            val: N + Number(c.itemsToShow) - 1,
            max: b.value - 1,
            min: 0
          }))
        };
      }
      let C = 0;
      {
        let N = 0, G = 0 - Y.value.before;
        const te = Math.abs(et.value + ft.value);
        for (; N <= te; ) {
          const J = (G % f.length + f.length) % f.length;
          N += ((d = ne.value[J]) === null || d === void 0 ? void 0 : d[M.value]) + c.gap, G++;
        }
        C = G - 1;
      }
      let E = 0;
      {
        let N = C, G = 0;
        for (N < 0 ? G = ne.value.slice(0, N).reduce((te, J) => te + J[M.value] + c.gap, 0) - Math.abs(et.value + ft.value) : G = ne.value.slice(0, N).reduce((te, J) => te + J[M.value] + c.gap, 0) - Math.abs(et.value); G < Fe.value[M.value]; ) {
          const te = (N % f.length + f.length) % f.length;
          G += ((y = ne.value[te]) === null || y === void 0 ? void 0 : y[M.value]) + c.gap, N++;
        }
        E = N - 1;
      }
      return {
        min: Math.floor(C),
        max: Math.ceil(E)
      };
    }), Lt = s(() => {
      if (c.slideEffect === "fade")
        return;
      const d = ee.value ? "Y" : "X", y = ee.value ? fe.y : fe.x;
      let C = et.value + y;
      if (!c.wrapAround && c.preventExcessiveDragging) {
        let E = 0;
        O.value ? E = ne.value.reduce((te, J) => te + J[M.value], 0) : E = (b.value - Number(c.itemsToShow)) * X.value;
        const N = $.value ? 0 : -1 * E, G = $.value ? E : 0;
        C = Ae({
          val: C,
          min: N,
          max: G
        });
      }
      return `translate${d}(${C}px)`;
    }), pe = s(() => ({
      "--vc-transition-duration": q.value ? Et(c.transition, "ms") : void 0,
      "--vc-slide-gap": Et(c.gap),
      "--vc-carousel-height": Et(c.height),
      "--vc-cloned-offset": Et(ft.value)
    })), kt = { slideTo: Ie, next: we, prev: xe }, _t = Ft({
      activeSlide: A,
      config: c,
      currentSlide: S,
      isSliding: q,
      isVertical: ee,
      maxSlide: j,
      minSlide: de,
      nav: kt,
      normalizedDir: r,
      slideRegistry: a,
      slideSize: u,
      slides: f,
      slidesCount: b,
      viewport: T,
      visibleRange: tt
    });
    ia(Ye, _t);
    const at = Ft({
      config: c,
      currentSlide: S,
      maxSlide: j,
      middleSlide: le,
      minSlide: de,
      slideSize: u,
      slidesCount: b
    });
    return n({
      data: at,
      nav: kt,
      next: we,
      prev: xe,
      restartCarousel: ht,
      slideTo: Ie,
      updateBreakpointsConfig: ye,
      updateSlideSize: he,
      updateSlidesData: Ke
    }), () => {
      var d;
      const y = o.default || o.slides, C = (y == null ? void 0 : y(at)) || [], { before: E, after: N } = Y.value, G = ea({
        slides: f,
        position: "before",
        toShow: E
      }), te = ea({
        slides: f,
        position: "after",
        toShow: N
      }), J = [...G, ...C, ...te];
      if (!c.enabled || !J.length)
        return K("section", {
          ref: g,
          class: ["carousel", "is-disabled"]
        }, J);
      const lt = ((d = o.addons) === null || d === void 0 ? void 0 : d.call(o, at)) || [], St = K("ol", {
        class: "carousel__track",
        style: { transform: Lt.value },
        onMousedownCapture: c.mouseDrag ? yt : null,
        onTouchstartPassiveCapture: c.touchDrag ? yt : null
      }, J), Ct = K("div", { class: "carousel__viewport", ref: T }, St);
      return K("section", {
        ref: g,
        class: [
          "carousel",
          `is-${r.value}`,
          `is-effect-${c.slideEffect}`,
          {
            "is-vertical": ee.value,
            "is-sliding": q.value,
            "is-dragging": ut.value,
            "is-hover": ze.value
          }
        ],
        dir: r.value,
        style: pe.value,
        "aria-label": c.i18n.ariaGallery,
        tabindex: "0",
        onFocus: Nt,
        onBlur: dt,
        onMouseenter: st,
        onMouseleave: Mt
      }, [Ct, lt, K(el)]);
    };
  }
});
var Xt;
(function(t) {
  t.arrowDown = "arrowDown", t.arrowLeft = "arrowLeft", t.arrowRight = "arrowRight", t.arrowUp = "arrowUp";
})(Xt || (Xt = {}));
const aa = (t) => `icon${t.charAt(0).toUpperCase() + t.slice(1)}`, ll = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function nl(t) {
  return t in Xt;
}
const la = (t) => t && nl(t), na = re({
  props: {
    name: {
      type: String,
      required: !0,
      validator: la
    },
    title: {
      type: String,
      default: (t) => t.name ? z.i18n[aa(t.name)] : ""
    }
  },
  setup(t) {
    const o = bt(Ye, null);
    return () => {
      const i = t.name;
      if (!i || !la(i))
        return;
      const n = ll[i], l = K("path", { d: n }), a = (o == null ? void 0 : o.config.i18n[aa(i)]) || t.title, f = K("title", a);
      return K("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": a
      }, [f, l]);
    };
  }
}), ol = re({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(t, { slots: o, attrs: i }) {
    const n = bt(Ye);
    if (!n)
      return () => "";
    const { next: l, prev: a } = o, f = () => ({
      btt: "arrowDown",
      ltr: "arrowLeft",
      rtl: "arrowRight",
      ttb: "arrowUp"
    })[n.normalizedDir], b = () => ({
      btt: "arrowUp",
      ltr: "arrowRight",
      rtl: "arrowLeft",
      ttb: "arrowDown"
    })[n.normalizedDir], g = s(() => !n.config.wrapAround && n.currentSlide <= n.minSlide), T = s(() => !n.config.wrapAround && n.currentSlide >= n.maxSlide);
    return () => {
      const { i18n: u } = n.config, m = K("button", Object.assign(Object.assign({ type: "button", disabled: g.value, "aria-label": u.ariaPreviousSlide, title: u.ariaPreviousSlide, onClick: n.nav.prev }, i), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": g.value },
        i.class
      ] }), (a == null ? void 0 : a()) || K(na, { name: f() })), c = K("button", Object.assign(Object.assign({ type: "button", disabled: T.value, "aria-label": u.ariaNextSlide, title: u.ariaNextSlide, onClick: n.nav.next }, i), { class: [
        "carousel__next",
        { "carousel__next--disabled": T.value },
        i.class
      ] }), (l == null ? void 0 : l()) || K(na, { name: b() }));
      return [m, c];
    };
  }
}), il = re({
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
    const o = bt(Ye);
    if (!o)
      return () => "";
    const i = s(() => o.config.itemsToShow), n = s(() => Gt({
      align: o.config.snapAlign,
      itemsToShow: i.value
    })), l = s(() => t.paginateByItemsToShow && i.value > 1), a = s(() => Math.ceil((o.activeSlide - n.value) / i.value)), f = s(() => Math.ceil(o.slidesCount / i.value)), b = (g) => ya(l.value ? {
      val: a.value,
      max: f.value - 1,
      min: 0
    } : {
      val: o.activeSlide,
      max: o.maxSlide,
      min: o.minSlide
    }) === g;
    return () => {
      var g, T;
      const u = [];
      for (let m = l.value ? 0 : o.minSlide; m <= (l.value ? f.value - 1 : o.maxSlide); m++) {
        const c = ba(o.config.i18n[l.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: m + 1
        }), S = b(m), A = K("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": S
          },
          "aria-label": c,
          "aria-pressed": S,
          "aria-controls": (T = (g = o.slides[m]) === null || g === void 0 ? void 0 : g.exposed) === null || T === void 0 ? void 0 : T.id,
          title: c,
          disabled: t.disableOnClick,
          onClick: () => o.nav.slideTo(l.value ? Math.floor(m * +o.config.itemsToShow + n.value) : m)
        }), V = K("li", { class: "carousel__pagination-item", key: m }, A);
        u.push(V);
      }
      return K("ol", { class: "carousel__pagination" }, u);
    };
  }
}), oa = re({
  name: "CarouselSlide",
  props: {
    id: {
      type: String,
      default: (t) => t.isClone ? void 0 : Va()
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
    const l = bt(Ye);
    if (ia(Ye, void 0), !l)
      return () => "";
    const a = D(t.index), f = (A) => {
      a.value = A;
    }, b = Ra(), g = () => {
      const A = b.vnode.el;
      return A ? A.getBoundingClientRect() : { width: 0, height: 0 };
    };
    n({
      id: t.id,
      setIndex: f,
      getBoundingRect: g
    });
    const T = s(() => a.value === l.activeSlide), u = s(() => a.value === l.activeSlide - 1), m = s(() => a.value === l.activeSlide + 1), c = s(() => a.value >= l.visibleRange.min && a.value <= l.visibleRange.max), S = s(() => {
      if (l.config.itemsToShow === "auto")
        return;
      const A = l.config.itemsToShow, V = l.config.gap > 0 && A > 1 ? `calc(${100 / A}% - ${l.config.gap * (A - 1) / A}px)` : `${100 / A}%`;
      return l.isVertical ? { height: V } : { width: V };
    });
    return l.slideRegistry.registerSlide(b, t.index), Ma(() => {
      l.slideRegistry.unregisterSlide(b);
    }), t.isClone && (Yt(() => {
      ta(b.vnode);
    }), Na(() => {
      ta(b.vnode);
    })), () => {
      var A, V;
      return l.config.enabled ? K("li", {
        style: [o.style, Object.assign({}, S.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": t.isClone,
          "carousel__slide--visible": c.value,
          "carousel__slide--active": T.value,
          "carousel__slide--prev": u.value,
          "carousel__slide--next": m.value,
          "carousel__slide--sliding": l.isSliding
        },
        onFocusin: () => {
          l.viewport && (l.viewport.scrollLeft = 0), l.nav.slideTo(a.value);
        },
        id: t.isClone ? void 0 : t.id,
        "aria-hidden": t.isClone || void 0
      }, (V = i.default) === null || V === void 0 ? void 0 : V.call(i, {
        currentIndex: a.value,
        isActive: T.value,
        isClone: t.isClone,
        isPrev: u.value,
        isNext: m.value,
        isSliding: l.isSliding,
        isVisible: c.value
      })) : (A = i.default) === null || A === void 0 ? void 0 : A.call(i);
    };
  }
}), rl = (t, o, i, n) => {
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
}, it = (t, o, i, n = []) => {
  if (t.extractTitleFromColumn) {
    let l = n.find((a) => a.key === t.extractTitleFromColumn);
    if (l)
      return it(l, o, i, n);
  }
  if (t.formatter && typeof t.formatter == "function") {
    let l = t.formatter(o[t.key], o, t, i);
    return l.startsWith("__:") ? $a(l.substring(3)) : l;
  }
  return o[t.key];
}, ul = (t, o, i) => {
  if (!t.colspan) return -1;
  let n = o;
  return i.forEach((l) => {
    let a = Kt(t, l);
    a > 0 && a < n && (n = a);
  }), n;
}, Kt = (t, o) => t.colspan === !1 ? !1 : typeof t.colspan == "function" ? t.colspan(o) : t.colspan, sl = (t, o) => typeof t.preferSlot > "u" ? !0 : t.preferSlot === !1 ? !1 : typeof t.preferSlot == "function" ? t.preferSlot(o) : !0, dl = (t, o, i) => {
  if (typeof t != "object" || !t.key || o.indexOf(t.key) > -1) return !1;
  let n = Kt(t, i);
  return typeof t.colspan > "u" ? !0 : (typeof t.colspan < "u" && (typeof t.colspan == "function" ? n = parseInt(t.colspan(i)) : n = parseInt(t.colspan)), n > 0);
}, cl = (t = []) => {
  if (t.length > 0) {
    for (let o = 0; o < t.length; ++o)
      if (t[o].sortable) return t[o].key;
  }
  return "";
}, vl = (t, o) => {
  if (t.length > 0) {
    for (let i = 0; i < t.length; ++i)
      if (t[i].key === o) return t[i];
  }
  return null;
}, ha = (t) => t.type ? `is-${t.type}` : "", Vt = /* @__PURE__ */ re({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new sa() },
    columns: { default: () => [] },
    i: { default: 0 },
    editModeEnabled: { type: Boolean, default: !1 },
    hasInlineEditPerm: { type: Boolean, default: !1 }
  },
  emits: [
    "update:modelValue"
  ],
  setup(t, { emit: o }) {
    const i = o, n = t, l = D(n.modelValue), a = D(l.value[n.column.key]), f = D(null);
    F(a, (m) => {
      const c = JSON.parse(JSON.stringify(l.value));
      c[n.column.key] = m, i("update:modelValue", c);
    }), F(() => n.modelValue, (m) => {
      l.value = m, a.value = l.value[n.column.key];
    });
    const b = s(() => ({ ...n.column.slotData, item: l.value })), g = s(() => {
      var m, c, S, A;
      if ((m = n.column.field) != null && m.modalData && typeof ((c = n.column.field) == null ? void 0 : c.modalData) == "object")
        for (let V in n.column.field.modalData)
          if (typeof ((S = n.column.field) == null ? void 0 : S.modalData[V]) == "string" && n.column.field.modalData[V].startsWith("prop:")) {
            let le = n.column.field.modalData[V].substring(5);
            l.value[le];
          } else
            n.column.field.modalData[V];
      return (A = n.column.field) == null ? void 0 : A.modalData;
    }), T = s(() => typeof n.column.field == "string" && n.column.field.startsWith("prop:") ? Oa(n.column.field, l.value) : n.column.field), u = s(() => {
      var m, c, S, A;
      return n.column.type === gt.Field ? !((c = (m = n.column) == null ? void 0 : m.field) != null && c.label) && [
        xt.Switch,
        xt.Check
      ].includes((S = n.column.field) == null ? void 0 : S.type) ? n.column.label : (A = n.column.field) == null ? void 0 : A.label : "";
    });
    return (m, c) => {
      const S = be("lkt-anchor"), A = be("lkt-button"), V = be("lkt-field");
      return m.column.type === w(gt).Anchor ? (v(), _(S, $e(ae({ key: 0 }, m.column.anchor)), {
        default: U(() => [
          ot(Xe(w(it)(m.column, l.value, m.i)), 1)
        ]),
        _: 1
      }, 16)) : m.column.type === w(gt).Button ? (v(), _(A, ae({ key: 1 }, m.column.button, { prop: l.value }), {
        default: U(() => [
          ot(Xe(w(it)(m.column, l.value, m.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : m.column.type === w(gt).Field && m.hasInlineEditPerm ? (v(), _(V, ae({ key: 2 }, T.value, {
        "read-mode": !m.column.editable || !m.editModeEnabled,
        ref: (le) => f.value = le,
        "slot-data": b.value,
        label: u.value,
        "modal-data": g.value,
        prop: l.value,
        modelValue: a.value,
        "onUpdate:modelValue": c[0] || (c[0] = (le) => a.value = le)
      }), null, 16, ["read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : m.column.type === w(gt).Field ? (v(), _(V, ae({ key: 3 }, T.value, {
        "read-mode": "",
        ref: (le) => f.value = le,
        "slot-data": b.value,
        label: u.value,
        "modal-data": g.value,
        prop: l.value,
        "model-value": a.value
      }), null, 16, ["slot-data", "label", "modal-data", "prop", "model-value"])) : (v(), h(H, { key: 4 }, [
        ot(Xe(w(it)(m.column, l.value, m.i, m.columns)), 1)
      ], 64));
    };
  }
}), Ve = class Ve {
};
Ve.navButtonSlot = "", Ve.dropButtonSlot = "", Ve.editButtonSlot = "", Ve.createButtonSlot = "", Ve.defaultEmptySlot = void 0, Ve.defaultSaveIcon = "", Ve.defaultNoResultsMessage = "No results";
let W = Ve;
const fl = /* @__PURE__ */ re({
  __name: "DropButtonComponent",
  props: {
    config: {},
    item: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: [
    "click"
  ],
  setup(t, { emit: o }) {
    const i = o, n = t, l = s(() => W.dropButtonSlot !== ""), a = s(() => W.dropButtonSlot), f = s(() => da(n.config.resourceData, n.item));
    return (b, g) => {
      const T = be("lkt-button");
      return v(), _(T, ae({ palette: "table-delete" }, n.config, {
        disabled: b.disabled,
        "resource-data": f.value,
        onClick: g[0] || (g[0] = ra((u) => i("click", u), ["prevent", "stop"]))
      }), {
        default: U(() => [
          l.value ? (v(), _(Re(a.value), { key: 0 })) : B("", !0)
        ]),
        _: 1
      }, 16, ["disabled", "resource-data"]);
    };
  }
}), pl = /* @__PURE__ */ re({
  __name: "EditButtonComponent",
  props: {
    config: {},
    item: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: [
    "click"
  ],
  setup(t, { emit: o }) {
    const i = o, n = t, l = s(() => W.editButtonSlot !== ""), a = s(() => W.editButtonSlot), f = s(() => da(n.config.resourceData, n.item));
    return (b, g) => {
      const T = be("lkt-button");
      return v(), _(T, ae({ palette: "table-edit" }, n.config, {
        disabled: b.disabled,
        "resource-data": f.value,
        onClick: g[0] || (g[0] = ra((u) => i("click"), ["prevent", "stop"]))
      }), {
        default: U(() => [
          l.value ? (v(), _(Re(a.value), { key: 0 })) : B("", !0)
        ]),
        _: 1
      }, 16, ["disabled", "resource-data"]);
    };
  }
}), ml = ["data-i", "data-draggable"], gl = ["data-role", "data-i"], bl = {
  key: 1,
  class: "lkt-table-nav-cell"
}, yl = { class: "lkt-table-nav-container" }, hl = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, kl = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, Sl = ["colspan"], Cl = ["colspan"], wl = ["data-column", "colspan", "title"], Bl = {
  key: 6,
  class: "lkt-table-col-drop"
}, Dl = {
  key: 7,
  class: "lkt-table-col-edit"
}, Il = /* @__PURE__ */ re({
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
    rowDisplayType: { type: [Number, Function], default: nt.Auto },
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
  setup(t, { emit: o }) {
    var X;
    const i = ua(), n = o, l = t, a = D(l.modelValue);
    let f = typeof l.rowDisplayType == "function" ? l.rowDisplayType(a.value, l.i) : l.rowDisplayType;
    f || (f = nt.Auto);
    const b = [nt.Auto, nt.PreferCustomItem].includes(f), g = [nt.Auto, nt.PreferItem].includes(f), T = D((X = l.editButton.anchor) == null ? void 0 : X.to);
    for (let r in a.value) T.value = va(T.value, ":" + r, a.value[r]);
    const u = (r) => n("click", r), m = (r, $) => {
      n("show", r, $);
    }, c = s(() => {
      let r = [], $ = !1;
      return typeof l.disabledDrag == "function" ? $ = l.disabledDrag(a.value) : $ = ce.value === !0, !$ && l.sortable && l.isDraggable ? r.push("handle") : $ && r.push("disabled"), r.join(" ");
    }), S = s(() => W.navButtonSlot !== ""), A = s(() => W.navButtonSlot), V = () => {
      n("item-up", l.i);
    }, le = () => {
      n("item-down", l.i);
    }, j = () => {
      n("item-drop", l.i);
    };
    F(() => l.modelValue, (r) => a.value = r), F(a, (r) => {
      n("update:modelValue", r);
    }, { deep: !0 });
    const de = s(() => typeof l.renderDrag == "function" ? l.renderDrag(a.value) : l.renderDrag === !0), ce = s(() => typeof l.disabledDrag == "function" ? l.disabledDrag(a.value) : l.disabledDrag === !0), Me = s(() => c.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), ue = s(() => {
      let r = [];
      return b && r.push("type-custom-item"), g && r.push("type-item"), typeof l.itemContainerClass == "function" ? r.push(l.itemContainerClass(a.value, l.i)) : l.itemContainerClass !== "" && r.push(l.itemContainerClass), r.join(" ");
    });
    return (r, $) => {
      const ee = be("lkt-button");
      return v(), h("tr", {
        "data-i": r.i,
        "data-draggable": r.isDraggable,
        class: Z(ue.value)
      }, [
        r.sortable && r.editModeEnabled && de.value ? (v(), h("td", {
          key: 0,
          "data-role": Me.value,
          class: Z(c.value),
          "data-i": r.i
        }, $[3] || ($[3] = [
          x("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]), 10, gl)) : B("", !0),
        r.addNavigation && r.editModeEnabled ? (v(), h("td", bl, [
          x("div", yl, [
            se(ee, {
              palette: "table-nav",
              disabled: r.i === 0,
              onClick: V
            }, {
              default: U(() => [
                S.value ? (v(), _(Re(A.value), {
                  key: 0,
                  direction: "up"
                })) : (v(), h("i", hl))
              ]),
              _: 1
            }, 8, ["disabled"]),
            se(ee, {
              palette: "table-nav",
              disabled: r.latestRow,
              onClick: le
            }, {
              default: U(() => [
                S.value ? (v(), _(Re(A.value), {
                  key: 0,
                  direction: "down"
                })) : (v(), h("i", kl))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : B("", !0),
        r.displayHiddenColumnsIndicator ? (v(), h("td", {
          key: 2,
          onClick: $[0] || ($[0] = (O) => m(O, r.i)),
          "data-role": "show-more",
          class: Z(r.hiddenIsVisible ? "state-open" : "")
        }, null, 2)) : B("", !0),
        w(b) && w(i)[`item-${r.i}`] ? (v(), h("td", {
          key: "td" + r.i,
          colspan: r.visibleColumns.length
        }, [
          P(r.$slots, `item-${r.i}`, {
            item: a.value,
            index: r.i,
            editing: r.editModeEnabled,
            canCreate: r.canCreate,
            canRead: r.canRead,
            canUpdate: r.canEdit,
            canDrop: r.canDrop,
            isLoading: r.isLoading,
            doDrop: () => j()
          })
        ], 8, Sl)) : w(g) && w(i).item ? (v(), h("td", {
          key: "td" + r.i,
          colspan: r.visibleColumns.length
        }, [
          P(r.$slots, "item", {
            item: a.value,
            index: r.i,
            editing: r.editModeEnabled,
            canCreate: r.canCreate,
            canRead: r.canRead,
            canUpdate: r.canEdit,
            canDrop: r.canDrop,
            isLoading: r.isLoading,
            doDrop: () => j()
          })
        ], 8, Cl)) : (v(!0), h(H, { key: 5 }, ie(r.visibleColumns, (O) => (v(), h(H, null, [
          w(dl)(O, r.emptyColumns, a.value) ? (v(), h("td", {
            key: "td" + r.i,
            "data-column": O.key,
            colspan: w(Kt)(O, a.value),
            title: w(it)(O, a.value, r.i, r.visibleColumns),
            class: Z(w(ha)(O)),
            onClick: $[2] || ($[2] = (M) => u(M))
          }, [
            r.$slots[O.key] && w(sl)(O, a.value) ? P(r.$slots, O.key, {
              key: 0,
              value: a.value[O.key],
              item: a.value,
              column: O,
              i: r.i
            }) : a.value ? (v(), _(Vt, {
              key: 1,
              modelValue: a.value,
              "onUpdate:modelValue": $[1] || ($[1] = (M) => a.value = M),
              column: O,
              columns: r.visibleColumns,
              "edit-mode-enabled": r.editModeEnabled,
              "has-inline-edit-perm": r.hasInlineEditPerm,
              i: r.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : B("", !0)
          ], 10, wl)) : B("", !0)
        ], 64))), 256)),
        r.canDrop && r.editModeEnabled ? (v(), h("td", Bl, [
          se(fl, {
            config: r.dropButton,
            item: a.value,
            onClick: j
          }, null, 8, ["config", "item"])
        ])) : B("", !0),
        r.canEdit && r.editModeEnabled ? (v(), h("td", Dl, [
          se(pl, {
            config: r.editButton,
            item: a.value
          }, null, 8, ["config", "item"])
        ])) : B("", !0)
      ], 10, ml);
    };
  }
}), Tl = { "data-role": "hidden-row" }, El = ["colspan"], Al = ["data-column"], Vl = ["data-i"], Rl = ["data-column", "title"], Ml = /* @__PURE__ */ re({
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
  setup(t, { emit: o }) {
    const i = o, n = t, l = D(n.modelValue), a = (f) => i("click", f);
    return F(() => n.modelValue, (f) => l.value = f), F(l, () => i("update:modelValue", l.value)), (f, b) => Oe((v(), h("tr", Tl, [
      x("td", { colspan: f.hiddenColumnsColSpan }, [
        x("table", null, [
          x("tr", null, [
            (v(!0), h(H, null, ie(f.hiddenColumns, (g) => (v(), h("th", {
              "data-column": g.key
            }, [
              x("div", null, Xe(g.label), 1)
            ], 8, Al))), 256))
          ]),
          x("tr", { "data-i": f.i }, [
            (v(!0), h(H, null, ie(f.hiddenColumns, (g, T) => (v(), h("td", {
              "data-column": g.key,
              title: w(it)(g, l.value, T, f.hiddenColumns),
              onClick: b[1] || (b[1] = (u) => a(u))
            }, [
              f.$slots[g.key] ? P(f.$slots, g.key, {
                key: 0,
                value: l.value[g.key],
                item: l.value,
                column: g,
                i: T
              }) : (v(), _(Vt, {
                key: 1,
                column: g,
                columns: f.hiddenColumns,
                modelValue: l.value,
                "onUpdate:modelValue": b[0] || (b[0] = (u) => l.value = u),
                i: T,
                "edit-mode-enabled": f.editModeEnabled,
                "has-inline-edit-perm": f.hasInlineEditPerm
              }, null, 8, ["column", "columns", "modelValue", "i", "edit-mode-enabled", "has-inline-edit-perm"]))
            ], 8, Rl))), 256))
          ], 8, Vl)
        ])
      ], 8, El)
    ], 512)), [
      [Pe, f.hiddenIsVisible]
    ]);
  }
}), Ht = /* @__PURE__ */ re({
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
    var T;
    const i = o, n = t, l = s(() => W.createButtonSlot !== ""), a = s(() => W.createButtonSlot), f = {
      ...(T = n.config) == null ? void 0 : T.modalData,
      beforeClose: (u) => {
        "itemCreated" in u && u.itemCreated === !0 && i("append", u.item);
      }
    }, b = {
      ...n.config
    };
    b.modalData = f;
    const g = () => {
      var u;
      if (!((u = n.config) != null && u.modal)) {
        i("click");
        return;
      }
    };
    return (u, m) => {
      const c = be("lkt-button");
      return v(), _(c, ae(b, {
        disabled: u.disabled,
        onClick: g
      }), {
        default: U(() => [
          l.value ? (v(), _(Re(a.value), { key: 0 })) : B("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), Nl = ["data-column", "data-sortable", "data-sort", "colspan", "title"], Ll = /* @__PURE__ */ re({
  __name: "TableHeader",
  props: {
    column: { default: () => new sa() },
    sortBy: { default: "" },
    sortDirection: { default: "" },
    amountOfColumns: { default: 0 },
    items: { default: () => [] }
  },
  emits: [
    "click"
  ],
  setup(t, { emit: o }) {
    const i = o, n = t, l = s(() => ul(n.column, n.amountOfColumns, n.items)), a = s(() => n.column.sortable === !0), f = s(() => a.value && n.sortBy === n.column.key ? n.sortDirection : ""), b = s(() => ca(n.column.label)), g = s(() => a.value && n.sortBy === n.column.key ? n.sortDirection === Ge.Asc ? ge.defaultTableSortAscIcon : n.sortDirection === Ge.Desc ? ge.defaultTableSortDescIcon : "" : ""), T = () => i("click", n.column);
    return (u, m) => (v(), h("th", {
      "data-column": u.column.key,
      "data-sortable": a.value,
      "data-sort": f.value,
      colspan: l.value,
      title: b.value,
      class: Z(w(ha)(u.column)),
      onClick: T
    }, [
      x("div", null, [
        ot(Xe(b.value) + " ", 1),
        g.value ? (v(), h("i", {
          key: 0,
          class: Z(g.value)
        }, null, 2)) : B("", !0)
      ])
    ], 10, Nl));
  }
}), _l = ["id"], $l = { class: "lkt-table-page-buttons" }, Ol = { class: "switch-edition-mode" }, Pl = { class: "switch-edition-mode" }, Ul = {
  key: 0,
  class: "lkt-table-page-buttons"
}, Fl = {
  key: 1,
  class: "lkt-table-page-filters"
}, jl = { class: "lkt-table" }, zl = { key: 0 }, Hl = { key: 0 }, ql = {
  key: 0,
  "data-role": "drag-indicator"
}, Gl = { key: 1 }, Xl = { key: 2 }, Yl = {
  key: 3,
  class: "lkt-table-col-drop"
}, Kl = {
  key: 4,
  class: "lkt-table-col-edit"
}, Wl = ["id"], Jl = ["id"], Ql = ["data-i"], Zl = ["id"], xl = ["data-i"], en = ["id"], tn = { class: "lkt-carousel-slide" }, an = { class: "lkt-carousel-slide" }, ln = {
  key: 2,
  class: "lkt-table-empty"
}, nn = {
  key: 4,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, on = /* @__PURE__ */ re({
  __name: "LktTable",
  props: /* @__PURE__ */ _a({
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
    accordion: {},
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
  }, Pa(Ua)),
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
    var Jt, Qt;
    const n = i, l = ua(), a = t, f = {}, b = D(typeof a.sorter == "function" ? a.sorter : rl), g = D(cl(a.columns)), T = D(Ge.Asc), u = D(a.modelValue), m = D(f), c = D(null), S = D(a.columns), A = D((Jt = a.paginator) == null ? void 0 : Jt.modelValue), V = D(a.loading), le = D(!1), j = D(a.perms), de = D(null), ce = D(null), Me = D(null), ue = D({}), X = D(new ja({ items: u.value }, a.dataStateConfig)), r = D(a.editMode), $ = D(0), ee = D(null), O = D(((Qt = a.carousel) == null ? void 0 : Qt.currentSlide) || 0), M = D(Te(a.saveButton, ge.defaultSaveButton)), ye = D(Te(a.createButton, ge.defaultCreateButton)), rt = D(Te(a.editModeButton, ge.defaultEditModeButton)), Ue = D(Te(a.dropButton, ge.defaultDropButton)), ne = D(Te(a.groupButton, ge.defaultGroupButton));
    F(() => a.saveButton, (e) => M.value = Te(a.saveButton, ge.defaultSaveButton)), F(() => a.createButton, (e) => ye.value = Te(a.createButton, ge.defaultCreateButton)), F(() => a.editModeButton, (e) => rt.value = Te(a.editModeButton, ge.defaultEditModeButton)), F(() => a.dropButton, (e) => Ue.value = Te(a.dropButton, ge.defaultDropButton));
    const Ne = D(!1);
    F(V, (e) => n("update:loading", e)), F(A, (e) => n("page", e));
    const Fe = (e) => {
      j.value = e;
    }, Rt = (e) => {
      var p;
      Array.isArray(e.data) && ((!a.paginator || ![Tt.LoadMore, Tt.Infinite].includes((p = a.paginator) == null ? void 0 : p.type)) && u.value.splice(0, u.value.length), u.value = [...u.value, ...e.data]), V.value = !1, le.value = !0, X.value.store({ items: u.value }).turnStoredIntoOriginal(), Ne.value = !1, It(() => {
        pe(), Le.value, n("read-response", e);
      });
    }, he = () => It(() => V.value = !0), Ke = () => {
      de.value.doRefresh();
    }, ve = Fa(12), ke = s(() => {
      if (!a.hideEmptyColumns) return [];
      let e = [];
      return S.value.forEach((p) => {
        let L = p.key, Q = !1;
        u.value.forEach((oe) => {
          if (typeof oe.checkEmpty == "function")
            return oe.checkEmpty(oe);
          oe[L] && (Q = !0);
        }), Q || e.push(L);
      }), e;
    }), Se = s(() => S.value.filter((e) => !e.hidden)), We = s(() => []), Je = s(() => {
      let e = Se.value.length + 1;
      return a.sortable && ++e, e;
    }), De = s(() => S.value.filter((e) => e.isForRowKey)), je = s(() => We.value.length > 0 && !a.sortable), fe = s(() => S.value.map((e) => e.key)), ze = s(() => {
      let e = [];
      for (let p in l) fe.value.indexOf(p) !== -1 && e.push(p);
      return e;
    }), ut = s(() => {
      let e = [];
      for (let p in l) p.indexOf("slide-") !== -1 && e.push(p);
      return e;
    }), st = s(() => {
      var e;
      return a.hiddenSave || V.value || !((e = M.value) != null && e.resource || M.value.type) ? !1 : r.value && Ne.value ? !0 : r.value;
    }), Mt = s(() => pt.value && u.value.length >= a.requiredItemsForTopCreate || He.value ? !0 : st.value || r.value && Ce.value), Le = s(() => {
      var e, p;
      return $.value, typeof ((e = M.value) == null ? void 0 : e.disabled) == "function" ? M.value.disabled({
        value: u.value,
        dataState: X.value
      }) : typeof ((p = M.value) == null ? void 0 : p.disabled) == "boolean" ? M.value.disabled : !Ne.value;
    }), Nt = s(() => u.value.length), dt = s(() => {
      var e;
      return {
        items: u.value,
        ...(e = M.value) == null ? void 0 : e.resourceData
      };
    }), yt = s(() => a.titleTag === "" ? "h2" : a.titleTag), ct = s(() => a.wrapContentTag === "" ? "div" : a.wrapContentTag), Qe = s(() => ca(a.title)), Ze = s(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }), Ce = s(() => j.value.includes(Ee.Create)), _e = s(() => j.value.includes("read")), q = s(() => j.value.includes(Ee.Update)), Ie = s(() => j.value.includes(Ee.Edit)), we = s(() => j.value.includes(Ee.InlineEdit)), xe = s(() => j.value.includes(Ee.ModalCreate)), ht = s(() => j.value.includes(Ee.InlineCreate)), vt = s(() => j.value.includes(Ee.InlineCreateEver)), Y = s(() => j.value.includes(Ee.Drop)), ft = s(() => j.value.includes(Ee.SwitchEditMode)), He = s(() => !ft.value || !q.value && !Y.value || !q.value && Y.value ? !1 : !V.value), et = s(() => {
      var e;
      return (typeof ((e = a.paginator) == null ? void 0 : e.type) < "u" && [Tt.LoadMore, Tt.Infinite].includes(a.paginator.type) || !V.value) && u.value.length > 0;
    }), tt = s(() => S.value.find((e) => e.isForAccordionHeader)), Lt = (e) => {
      let p = e.target;
      if (typeof p.dataset.column > "u")
        do
          p = p.parentNode;
        while (typeof p.dataset.column > "u" && p.tagName !== "TABLE" && p.tagName !== "body");
      if (p.tagName === "TD" && (p = p.parentNode, p = p.dataset.i, typeof p < "u"))
        return u.value[p];
    }, pe = () => {
      $.value = Ha();
    }, kt = (e) => u.value[e], _t = (e) => {
      var p;
      return (p = c.value) == null ? void 0 : p.querySelector(`[data-i="${e}"]`);
    }, at = (e) => m.value["tr_" + e] === !0, d = (e) => {
      e && e.sortable && (u.value = u.value.sort((p, L) => b.value(p, L, e, T.value)), T.value = T.value === Ge.Asc ? Ge.Desc : Ge.Asc, g.value = e.key, pe(), n("sort", [g.value, T.value]));
    }, y = (e) => {
      n("click", e);
    }, C = (e, p) => {
      let L = "tr_" + p;
      m.value[L] = typeof m.value[L] > "u" ? !0 : !m.value[L];
    }, E = (e) => {
      var L, Q, oe, me, mt, I, k, R;
      let p = parseInt((me = (oe = (Q = (L = e == null ? void 0 : e.originalEvent) == null ? void 0 : L.toElement) == null ? void 0 : Q.closest("tr")) == null ? void 0 : oe.dataset) == null ? void 0 : me.i);
      return !(typeof ((mt = a.drag) == null ? void 0 : mt.isValid) == "function" && !((I = a.drag) != null && I.isValid(u.value[p])) || typeof ((k = a.drag) == null ? void 0 : k.isValid) == "boolean" && !((R = a.drag) != null && R.isValid));
    }, N = (e) => {
      var p, L;
      return typeof ((p = a.drag) == null ? void 0 : p.isDraggable) == "function" ? (L = a.drag) == null ? void 0 : L.isDraggable(e) : !0;
    }, G = () => {
      if (Ce.value) {
        n("click-create");
        return;
      }
      if (ht.value || vt.value) {
        if (typeof a.newValueGenerator == "function") {
          let e = a.newValueGenerator();
          if (typeof e == "object" || a.type !== qe.Table) {
            u.value.push(e);
            return;
          }
        }
        u.value.push({});
      } else
        n("click-create");
    }, te = (e) => {
      u.value.push(e);
    }, J = () => V.value = !0, lt = () => V.value = !1, St = (e, p) => {
      var L, Q, oe;
      if (!((L = M.value) != null && L.type && [
        jt.Split,
        jt.SplitEver,
        jt.SplitLazy
      ].includes((Q = M.value) == null ? void 0 : Q.type))) {
        if (n("before-save"), (oe = M.value) != null && oe.resource && (V.value = !1, !p.success)) {
          n("error", p.httpStatus);
          return;
        }
        X.value.turnStoredIntoOriginal(), Ne.value = !1, n("save", p);
      }
    }, Ct = (e, p, L) => {
      if (L >= e.length) {
        let Q = L - e.length + 1;
        for (; Q--; ) e.push(void 0);
      }
      return e.splice(L, 0, e.splice(p, 1)[0]), e;
    }, ka = (e) => {
      Ct(u.value, e, e - 1), pe();
    }, Sa = (e) => {
      Ct(u.value, e, e + 1), pe();
    }, wt = (e) => {
      u.value.splice(e, 1), pe();
    }, Wt = () => {
      var e;
      ue.value && typeof ((e = ue.value) == null ? void 0 : e.destroy) == "function" && (ue.value.destroy(), ue.value = {});
    }, $t = () => {
      ee.value || (ee.value = document.getElementById("lkt-table-body-" + ve)), ue.value = new za(ee.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let p = e.oldIndex, L = e.newIndex;
          u.value.splice(L, 0, u.value.splice(p, 1)[0]), pe(), n("drag-end", u.value[L]);
        },
        onMove: function(e, p) {
          return E(e);
        }
      });
    }, Bt = (e, p, L = !1) => {
      let Q = [$.value, ve, "row", p];
      return L && Q.push("hidden"), De.value.forEach((oe) => {
        let me = String(e[oe.key]).toLowerCase();
        me.length > 50 && (me = me.substring(0, 50)), me = va(me, " ", "-"), Q.push(me);
      }), Q.join("-");
    }, Ot = s(() => typeof a.createEnabledValidator == "function" ? a.createEnabledValidator({ items: u.value }) : !0), pt = s(() => vt.value || Ce.value && r.value || ht.value && r.value || xe.value && r.value), Ca = s(() => [qe.Ol, qe.Ul].includes(a.type)), Dt = (e, p) => typeof a.itemDisplayChecker == "function" ? a.itemDisplayChecker(e) : !0, Pt = (e, p) => typeof a.itemContainerClass == "function" ? a.itemContainerClass(e, p) : a.itemContainerClass, wa = (e, p) => tt.value ? e[tt.value.key] : "";
    Yt(() => {
      var e;
      a.initialSorting && d(vl(a.columns, g.value)), X.value.store({ items: u.value }).turnStoredIntoOriginal(), Ne.value = !1, (e = a.drag) != null && e.enabled && It(() => {
        $t();
      });
    }), F(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }, (e) => {
      e ? $t() : Wt();
    }), F(() => a.type, (e) => {
      var p;
      (p = a.drag) != null && p.enabled ? $t() : Wt();
    }), F(() => a.perms, (e) => j.value = e), F(j, (e) => n("update:perms", e)), F(r, (e) => {
      n("update:editMode", e);
    }), F(() => a.editMode, (e) => r.value = e), F(() => a.columns, (e) => S.value = e, { deep: !0 }), F(() => a.modelValue, (e) => {
      u.value = e;
    }, { deep: !0 }), F(u, (e) => {
      X.value.increment({ items: e }), Ne.value = X.value.changed(), n("update:modelValue", e);
    }, { deep: !0 }), o({
      getItemByEvent: Lt,
      getItemByIndex: kt,
      getRowByIndex: _t,
      doRefresh: Ke,
      doRemoveIndex: (e) => {
        u.value.splice(e, 1), pe();
      },
      getHtml: () => ce.value,
      reRender: pe,
      turnStoredIntoOriginal: () => {
        X.value.turnStoredIntoOriginal(), It(() => {
          pe();
        });
      }
    });
    const Ba = s(() => typeof W.defaultEmptySlot < "u"), Da = s(() => W.defaultEmptySlot), Ia = s(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled ? !1 : typeof a.drag.canRender > "u" ? !0 : a.drag.canRender), Ta = s(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled || typeof a.drag.isDisabled > "u" ? !1 : a.drag.isDisabled);
    return (e, p) => {
      const L = be("lkt-button"), Q = be("lkt-accordion"), oe = be("lkt-loader"), me = be("lkt-paginator");
      return v(), h("section", {
        ref_key: "element",
        ref: ce,
        class: "lkt-table-page",
        id: "lkt-table-page-" + w(ve)
      }, [
        Qe.value || w(l).title ? (v(), h("header", {
          key: 0,
          class: Z(e.headerClass)
        }, [
          Qe.value ? (v(), _(Re(yt.value), { key: 0 }, {
            default: U(() => [
              e.titleIcon ? (v(), h("i", {
                key: 0,
                class: Z(e.titleIcon)
              }, null, 2)) : B("", !0),
              ot(" " + Xe(Qe.value), 1)
            ]),
            _: 1
          })) : B("", !0),
          w(l).title ? P(e.$slots, "title", { key: 1 }) : B("", !0)
        ], 2)) : B("", !0),
        (v(), _(Re(ct.value), {
          class: Z(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: U(() => {
            var mt;
            return [
              Oe(x("div", $l, [
                e.groupButton !== !1 ? (v(), _(L, ae({
                  key: 0,
                  ref: "groupButton"
                }, ne.value, { class: "lkt-item-crud-group-button" }), {
                  split: U(() => [
                    x("div", Ol, [
                      Oe(se(L, ae(rt.value, {
                        checked: r.value,
                        "onUpdate:checked": p[0] || (p[0] = (I) => r.value = I)
                      }), null, 16, ["checked"]), [
                        [Pe, He.value]
                      ])
                    ]),
                    w(l)["prev-buttons-ever"] ? P(e.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: q.value,
                      canDrop: Y.value,
                      perms: e.perms
                    }) : B("", !0),
                    w(l)["prev-buttons"] ? P(e.$slots, "prev-buttons", {
                      key: 1,
                      canUpdate: q.value,
                      canDrop: Y.value,
                      perms: e.perms
                    }) : B("", !0),
                    Oe(se(L, ae({
                      class: "lkt-table--save-button",
                      ref_key: "saveButtonRef",
                      ref: Me
                    }, {
                      ...M.value,
                      disabled: Le.value,
                      resourceData: dt.value
                    }, {
                      onLoading: J,
                      onLoaded: lt,
                      onClick: St
                    }), {
                      split: U(({ doClose: I, doRootClick: k }) => [
                        P(e.$slots, "button-save-split", {
                          doClose: I,
                          doRootClick: k,
                          dataState: X.value,
                          onButtonLoading: J,
                          onButtonLoaded: lt
                        })
                      ]),
                      default: U(() => [
                        w(l)["button-save"] ? P(e.$slots, "button-save", {
                          key: 0,
                          items: u.value,
                          editMode: e.editMode,
                          canUpdate: !Le.value
                        }) : B("", !0)
                      ]),
                      _: 3
                    }, 16), [
                      [Pe, st.value]
                    ]),
                    pt.value && u.value.length >= e.requiredItemsForTopCreate ? (v(), _(Ht, {
                      key: 2,
                      config: ye.value,
                      disabled: !Ot.value,
                      onClick: G,
                      onAppend: te
                    }, null, 8, ["config", "disabled"])) : B("", !0)
                  ]),
                  _: 3
                }, 16)) : B("", !0),
                w(l)["prev-buttons-ever"] ? P(e.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: q.value,
                  canDrop: Y.value,
                  perms: e.perms
                }) : B("", !0),
                w(l)["prev-buttons"] ? P(e.$slots, "prev-buttons", {
                  key: 2,
                  canUpdate: q.value,
                  canDrop: Y.value,
                  perms: e.perms
                }) : B("", !0),
                Oe(se(L, ae({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: Me
                }, {
                  ...M.value,
                  disabled: Le.value,
                  resourceData: dt.value
                }, {
                  onLoading: J,
                  onLoaded: lt,
                  onClick: St
                }), {
                  split: U(({ doClose: I, doRootClick: k }) => [
                    P(e.$slots, "button-save-split", {
                      doClose: I,
                      doRootClick: k,
                      dataState: X.value,
                      onButtonLoading: J,
                      onButtonLoaded: lt
                    })
                  ]),
                  default: U(() => [
                    w(l)["button-save"] ? P(e.$slots, "button-save", {
                      key: 0,
                      items: u.value,
                      editMode: e.editMode,
                      canUpdate: !Le.value
                    }) : B("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [Pe, st.value]
                ]),
                pt.value && u.value.length >= e.requiredItemsForTopCreate ? (v(), _(Ht, {
                  key: 3,
                  config: ye.value,
                  disabled: !Ot.value,
                  onClick: G,
                  onAppend: te
                }, null, 8, ["config", "disabled"])) : B("", !0),
                x("div", Pl, [
                  Oe(se(L, ae(rt.value, {
                    checked: r.value,
                    "onUpdate:checked": p[1] || (p[1] = (I) => r.value = I)
                  }), null, 16, ["checked"]), [
                    [Pe, He.value]
                  ])
                ])
              ], 512), [
                [Pe, Mt.value]
              ]),
              w(l).buttons ? (v(), h("div", Ul, [
                P(e.$slots, "buttons")
              ])) : B("", !0),
              le.value && w(l).filters ? (v(), h("div", Fl, [
                P(e.$slots, "filters", {
                  items: u.value,
                  isLoading: V.value
                })
              ])) : B("", !0),
              Oe(x("div", jl, [
                e.type === w(qe).Table ? (v(), h("table", zl, [
                  e.hideTableHeader ? B("", !0) : (v(), h("thead", Hl, [
                    x("tr", null, [
                      Ze.value && r.value ? (v(), h("th", ql)) : B("", !0),
                      e.addNavigation && r.value ? (v(), h("th", Gl)) : B("", !0),
                      je.value ? (v(), h("th", Xl)) : B("", !0),
                      (v(!0), h(H, null, ie(Se.value, (I) => (v(), h(H, null, [
                        ke.value.indexOf(I.key) === -1 ? (v(), _(Ll, {
                          key: 0,
                          column: I,
                          "sort-by": g.value,
                          "sort-direction": T.value,
                          "amount-of-columns": e.columns.length,
                          items: u.value,
                          onClick: (k) => d(I)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : B("", !0)
                      ], 64))), 256)),
                      Y.value && r.value ? (v(), h("th", Yl)) : B("", !0),
                      Ie.value && q.value && r.value ? (v(), h("th", Kl)) : B("", !0)
                    ])
                  ])),
                  x("tbody", {
                    ref_key: "tableBody",
                    ref: c,
                    id: "lkt-table-body-" + w(ve),
                    class: Z(e.itemsContainerClass)
                  }, [
                    (v(!0), h(H, null, ie(u.value, (I, k) => Oe((v(), _(Il, {
                      modelValue: u.value[k],
                      "onUpdate:modelValue": (R) => u.value[k] = R,
                      key: Bt(I, k),
                      i: k,
                      "drop-button": Ue.value,
                      "edit-button": e.editButton,
                      "display-hidden-columns-indicator": je.value,
                      "is-draggable": N(I),
                      sortable: Ze.value,
                      "visible-columns": Se.value,
                      "empty-columns": ke.value,
                      "add-navigation": e.addNavigation,
                      "hidden-is-visible": at(k),
                      "latest-row": k + 1 === Nt.value,
                      "can-drop": Y.value && r.value,
                      "can-edit": Ie.value && q.value && r.value,
                      "can-read": _e.value,
                      "can-create": Ce.value,
                      "edit-mode-enabled": r.value,
                      "has-inline-edit-perm": we.value,
                      "row-display-type": e.rowDisplayType,
                      "render-drag": Ia.value,
                      "disabled-drag": Ta.value,
                      "is-loading": V.value,
                      "item-container-class": e.itemContainerClass,
                      onClick: y,
                      onShow: C,
                      onItemUp: ka,
                      onItemDown: Sa,
                      onItemDrop: wt
                    }, Zt({ _: 2 }, [
                      w(l)[`item-${k}`] ? {
                        name: `item-${k}`,
                        fn: U((R) => [
                          P(e.$slots, `item-${k}`, $e({
                            [e.slotItemVar || ""]: R.item,
                            index: k,
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
                      } : w(l).item ? {
                        name: "item",
                        fn: U((R) => [
                          P(e.$slots, "item", $e({
                            [e.slotItemVar || ""]: R.item,
                            index: k,
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
                      ie(ze.value, (R) => ({
                        name: R,
                        fn: U((Be) => [
                          P(e.$slots, R, $e({
                            [e.slotItemVar || ""]: Be.item,
                            value: Be.value,
                            column: Be.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "drop-button", "edit-button", "display-hidden-columns-indicator", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "hidden-is-visible", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class"])), [
                      [Pe, Dt(u.value[k])]
                    ])), 128)),
                    We.value.length > 0 ? (v(!0), h(H, { key: 0 }, ie(u.value, (I, k) => (v(), _(Ml, {
                      modelValue: u.value[k],
                      "onUpdate:modelValue": (R) => u.value[k] = R,
                      key: Bt(I, k, !0),
                      i: k,
                      "hidden-columns": We.value,
                      "hidden-columns-col-span": Je.value,
                      "is-draggable": N(I),
                      sortable: Ze.value,
                      "visible-columns": Se.value,
                      "empty-columns": ke.value,
                      "hidden-is-visible": at(k),
                      "edit-mode-enabled": r.value,
                      "has-inline-edit-perm": we.value,
                      onClick: y,
                      onShow: C
                    }, Zt({ _: 2 }, [
                      ie(ze.value, (R) => ({
                        name: R,
                        fn: U((Be) => [
                          P(e.$slots, R, $e({
                            [e.slotItemVar || ""]: Be.item,
                            value: Be.value,
                            column: Be.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "hidden-columns", "hidden-columns-col-span", "is-draggable", "sortable", "visible-columns", "empty-columns", "hidden-is-visible", "edit-mode-enabled", "has-inline-edit-perm"]))), 128)) : B("", !0)
                  ], 10, Wl)
                ])) : e.type === w(qe).Item ? (v(), h("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: c,
                  id: "lkt-table-body-" + w(ve),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), h(H, null, ie(u.value, (I, k) => (v(), h(H, null, [
                    Dt(I) ? (v(), h("div", {
                      class: Z(["lkt-table-item", Pt(I, k)]),
                      "data-i": k,
                      key: Bt(I, k)
                    }, [
                      P(e.$slots, "item", $e({
                        [e.slotItemVar || ""]: I,
                        index: k,
                        editing: r.value,
                        canCreate: Ce.value,
                        canRead: _e.value,
                        canUpdate: q.value,
                        canDrop: Y.value,
                        isLoading: V.value,
                        doDrop: () => wt(k)
                      }))
                    ], 10, Ql)) : B("", !0)
                  ], 64))), 256))
                ], 10, Jl)) : e.type === w(qe).Accordion ? (v(), h("div", {
                  key: 2,
                  ref_key: "tableBody",
                  ref: c,
                  id: "lkt-table-body-" + w(ve),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), h(H, null, ie(u.value, (I, k) => (v(), h(H, null, [
                    Dt(I) ? (v(), _(Q, ae({
                      class: ["lkt-table-item", Pt(I, k)],
                      "data-i": k,
                      key: Bt(I, k),
                      ref_for: !0
                    }, {
                      ...e.accordion,
                      title: wa(I)
                    }), {
                      header: U(() => [
                        se(Vt, {
                          modelValue: u.value[k],
                          "onUpdate:modelValue": (R) => u.value[k] = R,
                          i: k,
                          column: tt.value,
                          columns: Se.value,
                          "edit-mode-enabled": r.value,
                          "has-inline-edit-perm": we.value
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])
                      ]),
                      default: U(() => [
                        (v(!0), h(H, null, ie(Se.value, (R) => {
                          var Be;
                          return v(), h(H, null, [
                            R.key !== ((Be = tt.value) == null ? void 0 : Be.key) ? (v(), _(Vt, {
                              key: 0,
                              modelValue: u.value[k],
                              "onUpdate:modelValue": (Ea) => u.value[k] = Ea,
                              i: k,
                              column: R,
                              columns: Se.value,
                              "edit-mode-enabled": r.value,
                              "has-inline-edit-perm": we.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])) : B("", !0)
                          ], 64);
                        }), 256))
                      ]),
                      _: 2
                    }, 1040, ["class", "data-i"])) : B("", !0)
                  ], 64))), 256))
                ], 10, Zl)) : Ca.value ? (v(), _(Re(e.type), {
                  key: 3,
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, {
                  default: U(() => [
                    (v(!0), h(H, null, ie(u.value, (I, k) => (v(), h(H, null, [
                      Dt(I) ? (v(), h("li", {
                        key: 0,
                        class: Z(["lkt-table-item", Pt(I, k)]),
                        "data-i": k
                      }, [
                        P(e.$slots, "item", $e({
                          [e.slotItemVar || ""]: I,
                          index: k,
                          editing: r.value,
                          canCreate: Ce.value,
                          canRead: _e.value,
                          canUpdate: q.value,
                          canDrop: Y.value,
                          isLoading: V.value,
                          doDrop: () => wt(k)
                        }))
                      ], 10, xl)) : B("", !0)
                    ], 64))), 256))
                  ]),
                  _: 3
                }, 8, ["class"])) : e.type === w(qe).Carousel ? (v(), h("div", {
                  key: 4,
                  ref_key: "tableBody",
                  ref: c,
                  id: "lkt-table-body-" + w(ve),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  se(w(al), ae({
                    modelValue: O.value,
                    "onUpdate:modelValue": p[2] || (p[2] = (I) => O.value = I)
                  }, e.carousel, {
                    "wrap-around": ((mt = e.carousel) == null ? void 0 : mt.infinite) === !0
                  }), {
                    addons: U(() => [
                      se(w(ol)),
                      se(w(il))
                    ]),
                    default: U(() => [
                      (v(!0), h(H, null, ie(ut.value, (I, k) => (v(), _(w(oa), {
                        key: I,
                        index: k
                      }, {
                        default: U(() => [
                          x("div", tn, [
                            P(e.$slots, I)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (v(!0), h(H, null, ie(u.value, (I, k) => (v(), _(w(oa), {
                        key: e.slide,
                        index: k
                      }, {
                        default: U(() => [
                          x("div", an, [
                            P(e.$slots, "item", $e({
                              [e.slotItemVar || ""]: I,
                              index: k,
                              editing: r.value,
                              canCreate: Ce.value,
                              canRead: _e.value,
                              canUpdate: q.value,
                              canDrop: Y.value,
                              isLoading: V.value,
                              doDrop: () => wt(k)
                            }))
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128))
                    ]),
                    _: 3
                  }, 16, ["modelValue", "wrap-around"])
                ], 10, en)) : B("", !0)
              ], 512), [
                [Pe, et.value]
              ]),
              !V.value && u.value.length === 0 ? (v(), h("div", ln, [
                w(l).empty ? P(e.$slots, "empty", { key: 0 }) : Ba.value ? (v(), _(Re(Da.value), {
                  key: 1,
                  message: e.noResultsText
                }, null, 8, ["message"])) : e.noResultsText ? (v(), h(H, { key: 2 }, [
                  ot(Xe(e.noResultsText), 1)
                ], 64)) : B("", !0)
              ])) : B("", !0),
              V.value ? (v(), _(oe, { key: 3 })) : B("", !0),
              pt.value || w(l).bottomButtons ? (v(), h("div", nn, [
                pt.value && u.value.length >= e.requiredItemsForBottomCreate ? (v(), _(Ht, {
                  key: 0,
                  config: ye.value,
                  disabled: !Ot.value,
                  onClick: G,
                  onAppend: te
                }, null, 8, ["config", "disabled"])) : B("", !0),
                P(e.$slots, "bottom-buttons")
              ])) : B("", !0),
              e.paginator && Object.keys(e.paginator).length > 0 ? (v(), _(me, ae({
                key: 5,
                ref_key: "paginatorRef",
                ref: de
              }, e.paginator, {
                modelValue: A.value,
                "onUpdate:modelValue": p[3] || (p[3] = (I) => A.value = I),
                onLoading: he,
                onPerms: Fe,
                onResponse: Rt
              }), null, 16, ["modelValue"])) : B("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, _l);
    };
  }
}), pn = {
  install: (t) => {
    t.component("lkt-table") === void 0 && t.component("lkt-table", on);
  }
}, mn = (t) => (W.navButtonSlot = t, !0), gn = (t) => (W.dropButtonSlot = t, !0), bn = (t) => (W.createButtonSlot = t, !0), yn = (t) => {
  W.defaultEmptySlot = t;
}, hn = (t) => {
  W.defaultSaveIcon = t;
};
export {
  Cn as Column,
  wn as createColumn,
  pn as default,
  bn as setTableCreateButtonSlot,
  gn as setTableDropButtonSlot,
  yn as setTableEmptySlot,
  mn as setTableNavButtonSlot,
  hn as setTableSaveIcon
};
