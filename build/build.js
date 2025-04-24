import { defineComponent as re, computed as s, ref as D, shallowReactive as Ht, watch as U, watchEffect as Pt, onMounted as Xt, onBeforeUnmount as Va, reactive as Ut, provide as ia, h as W, useId as Ra, inject as bt, getCurrentInstance as Ma, onUnmounted as Na, onUpdated as La, cloneVNode as _a, resolveComponent as be, createBlock as _, createElementBlock as h, unref as w, openBlock as v, normalizeProps as $e, mergeProps as ae, withCtx as j, createTextVNode as ot, toDisplayString as Ye, Fragment as H, withModifiers as ra, createCommentVNode as B, resolveDynamicComponent as Re, useSlots as ua, normalizeClass as Z, createElementVNode as x, createVNode as ge, renderSlot as P, renderList as ie, withDirectives as Oe, vShow as Pe, mergeDefaults as $a, nextTick as It, createSlots as Zt } from "vue";
import { __ as Oa } from "lkt-i18n";
import { SortDirection as Xe, Column as sa, extractPropValue as Pa, ColumnType as gt, FieldType as xt, prepareResourceData as da, TableRowType as nt, extractI18nValue as ca, LktSettings as me, ensureButtonConfig as Te, TablePermission as Ee, PaginatorType as Tt, TableType as Ge, getDefaultValues as Ua, Table as Fa, ButtonType as Ft } from "lkt-vue-kernel";
import { Column as wn, createColumn as Bn } from "lkt-vue-kernel";
import { replaceAll as va, generateRandomString as ja } from "lkt-string-tools";
import { DataState as za } from "lkt-data-state";
import Ha from "sortablejs";
import { time as qa } from "lkt-date-tools";
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
], Ga = {
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
  i18n: Ga,
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
}, Ke = Symbol("carousel"), Xa = (t) => {
  const o = Ht([]), i = (n) => {
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
function Ya(t) {
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
    }, u = t[(b % t.length + t.length) % t.length].vnode, m = _a(u, T);
    m.el = null, n.push(m);
  }
  return n;
}
const Ka = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function ta(t) {
  if (!t.el || !(t.el instanceof Element))
    return;
  const o = t.el.querySelectorAll(Ka);
  for (const i of o)
    i instanceof HTMLElement && !i.hasAttribute("disabled") && i.getAttribute("aria-hidden") !== "true" && i.setAttribute("tabindex", "-1");
}
function Wa(t, o) {
  return Object.keys(t).filter((i) => !o.includes(i)).reduce((i, n) => (i[n] = t[n], i), {});
}
function Ja(t) {
  const { isVertical: o, isReversed: i, dragged: n, effectiveSlideSize: l } = t, a = o ? n.y : n.x;
  if (a === 0)
    return 0;
  const f = Math.round(a / l);
  return i ? f : -f;
}
function Ae({ val: t, max: o, min: i }) {
  return o < i ? t : Math.min(Math.max(t, isNaN(i) ? t : i), isNaN(o) ? t : o);
}
function Qa(t) {
  const { transform: o } = window.getComputedStyle(t);
  return o.split(/[(,)]/).slice(1, -1).map((i) => parseFloat(i));
}
function Za(t) {
  let o = 1, i = 1;
  return t.forEach((n) => {
    const l = Qa(n);
    l.length === 6 && (o /= l[0], i /= l[3]);
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
function el(t, o, i) {
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
function qt({ slideSize: t, viewportSize: o, align: i, itemsToShow: n }) {
  return n !== void 0 ? xa(i, n) : t !== void 0 && o !== void 0 ? el(i, t, o) : 0;
}
function ba(t = "", o = {}) {
  return Object.entries(o).reduce((i, [n, l]) => i.replace(`{${n}}`, String(l)), t);
}
function ya({ val: t, max: o, min: i = 0 }) {
  const n = o - i + 1;
  return ((t - i) % n + n) % n + i;
}
function jt(t, o = 0) {
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
const tl = re({
  name: "CarouselAria",
  setup() {
    const t = bt(Ke);
    return t ? () => W("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, ba(t.config.i18n.itemXofY, {
      currentSlide: t.currentSlide + 1,
      slidesCount: t.slidesCount
    })) : () => "";
  }
}), al = {
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
}, ll = re({
  name: "VueCarousel",
  props: al,
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
    const a = Xa(i), f = a.getSlides(), b = s(() => f.length), g = D(null), T = D(null), u = D(0), m = s(() => Object.assign(Object.assign(Object.assign({}, z), Wa(t, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, z.i18n), t.i18n) })), c = Ht(Object.assign({}, m.value)), S = D((l = t.modelValue) !== null && l !== void 0 ? l : 0), A = D(S.value);
    U(S, (d) => A.value = d);
    const V = D(0), le = s(() => Math.ceil((b.value - 1) / 2)), F = s(() => b.value - 1), se = s(() => 0);
    let de = null, Me = null, ue = null;
    const Y = s(() => u.value + c.gap), r = s(() => {
      const d = c.dir || "ltr";
      return d in At ? At[d] : d;
    }), $ = s(() => ["rtl", "btt"].includes(r.value)), ee = s(() => ["ttb", "btt"].includes(r.value)), O = s(() => c.itemsToShow === "auto"), M = s(() => ee.value ? "height" : "width");
    function ye() {
      var d;
      if (!Qe.value)
        return;
      const y = (m.value.breakpointMode === "carousel" ? (d = g.value) === null || d === void 0 ? void 0 : d.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, C = Object.keys(t.breakpoints || {}).map((N) => Number(N)).sort((N, X) => +X - +N), E = {};
      C.some((N) => y >= N ? (Object.assign(E, t.breakpoints[N]), E.i18n && Object.assign(E.i18n, m.value.i18n, t.breakpoints[N].i18n), !0) : !1), Object.assign(c, m.value, E);
    }
    const rt = jt(() => {
      ye(), We(), he();
    }), Ue = Ht(/* @__PURE__ */ new Set()), ne = D([]);
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
    function Vt({ widthMultiplier: d, heightMultiplier: y }) {
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
      const d = Za(Ue);
      if (Vt(d), Ne(d), O.value)
        u.value = Ya(ne.value.map((y) => y[M.value]));
      else {
        const y = Number(c.itemsToShow), C = (y - 1) * c.gap;
        u.value = (Fe.value[M.value] - C) / y;
      }
    }
    function We() {
      !c.wrapAround && b.value > 0 && (S.value = Ae({
        val: S.value,
        max: F.value,
        min: se.value
      })), O.value || (c.itemsToShow = Ae({
        val: Number(c.itemsToShow),
        max: b.value,
        min: 1
      }));
    }
    const ce = s(() => typeof t.ignoreAnimations == "string" ? t.ignoreAnimations.split(",") : Array.isArray(t.ignoreAnimations) ? t.ignoreAnimations : t.ignoreAnimations ? !1 : []);
    Pt(() => We()), Pt(() => {
      he();
    });
    let ke;
    const we = (d) => {
      const y = d.target;
      if (!(!(y != null && y.contains(g.value)) || Array.isArray(ce.value) && ce.value.includes(d.animationName)) && (Ue.add(y), !ke)) {
        const C = () => {
          ke = requestAnimationFrame(() => {
            he(), C();
          });
        };
        C();
      }
    }, Je = (d) => {
      const y = d.target;
      y && Ue.delete(y), ke && Ue.size === 0 && (cancelAnimationFrame(ke), he());
    }, Qe = D(!1);
    typeof document < "u" && Pt(() => {
      Qe.value && ce.value !== !1 ? (document.addEventListener("animationstart", we), document.addEventListener("animationend", Je)) : (document.removeEventListener("animationstart", we), document.removeEventListener("animationend", Je));
    }), Xt(() => {
      Qe.value = !0, ye(), xe(), g.value && (ue = new ResizeObserver(rt), ue.observe(g.value)), i("init");
    }), Va(() => {
      Qe.value = !1, a.cleanup(), Me && clearTimeout(Me), ke && cancelAnimationFrame(ke), de && clearInterval(de), ue && (ue.disconnect(), ue = null), typeof document < "u" && dt(), g.value && (g.value.removeEventListener("transitionend", he), g.value.removeEventListener("animationiteration", he));
    });
    let Be = !1;
    const je = { x: 0, y: 0 }, ve = Ut({ x: 0, y: 0 }), ze = D(!1), ut = D(!1), st = () => {
      ze.value = !0;
    }, Rt = () => {
      ze.value = !1;
    }, Le = jt((d) => {
      if (!d.ctrlKey)
        switch (d.key) {
          case "ArrowLeft":
          case "ArrowUp":
            ee.value === d.key.endsWith("Up") && ($.value ? Ie(!0) : et(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            ee.value === d.key.endsWith("Down") && ($.value ? et(!0) : Ie(!0));
            break;
        }
    }, 200), Mt = () => {
      document.addEventListener("keydown", Le);
    }, dt = () => {
      document.removeEventListener("keydown", Le);
    };
    function yt(d) {
      const y = d.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(y) || q.value || (Be = d.type === "touchstart", !Be && (d.preventDefault(), d.button !== 0)))
        return;
      je.x = "touches" in d ? d.touches[0].clientX : d.clientX, je.y = "touches" in d ? d.touches[0].clientY : d.clientY;
      const C = Be ? "touchmove" : "mousemove", E = Be ? "touchend" : "mouseup";
      document.addEventListener(C, ct, { passive: !1 }), document.addEventListener(E, Ze, { passive: !0 });
    }
    const ct = jt((d) => {
      ut.value = !0;
      const y = "touches" in d ? d.touches[0].clientX : d.clientX, C = "touches" in d ? d.touches[0].clientY : d.clientY;
      ve.x = y - je.x, ve.y = C - je.y;
      const E = Ja({
        isVertical: ee.value,
        isReversed: $.value,
        dragged: ve,
        effectiveSlideSize: Y.value
      });
      A.value = c.wrapAround ? S.value + E : Ae({
        val: S.value + E,
        max: F.value,
        min: se.value
      }), i("drag", { deltaX: ve.x, deltaY: ve.y });
    });
    function Ze() {
      if (ct.cancel(), A.value !== S.value && !Be) {
        const C = (E) => {
          E.preventDefault(), window.removeEventListener("click", C);
        };
        window.addEventListener("click", C);
      }
      De(A.value), ve.x = 0, ve.y = 0, ut.value = !1;
      const d = Be ? "touchmove" : "mousemove", y = Be ? "touchend" : "mouseup";
      document.removeEventListener(d, ct), document.removeEventListener(y, Ze);
    }
    function xe() {
      !c.autoplay || c.autoplay <= 0 || (de = setInterval(() => {
        c.pauseAutoplayOnHover && ze.value || Ie();
      }, c.autoplay));
    }
    function Se() {
      de && (clearInterval(de), de = null);
    }
    function _e() {
      Se(), xe();
    }
    const q = D(!1);
    function De(d, y = !1) {
      if (!y && q.value)
        return;
      let C = d, E = d;
      V.value = S.value, c.wrapAround ? E = ya({
        val: C,
        max: F.value,
        min: se.value
      }) : C = Ae({
        val: C,
        max: F.value,
        min: se.value
      }), i("slide-start", {
        slidingToIndex: d,
        currentSlideIndex: S.value,
        prevSlideIndex: V.value,
        slidesCount: b.value
      }), Se(), q.value = !0, S.value = C, E !== C && vt.pause(), i("update:modelValue", E), Me = setTimeout(() => {
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
    function Ie(d = !1) {
      De(S.value + c.itemsToScroll, d);
    }
    function et(d = !1) {
      De(S.value - c.itemsToScroll, d);
    }
    function ht() {
      ye(), We(), he(), _e();
    }
    U(() => [m.value, t.breakpoints], () => ye(), { deep: !0 }), U(() => t.autoplay, () => _e());
    const vt = U(() => t.modelValue, (d) => {
      d !== S.value && De(Number(d), !0);
    });
    i("before-init");
    const K = s(() => {
      if (!c.wrapAround)
        return { before: 0, after: 0 };
      if (O.value)
        return { before: f.length, after: f.length };
      const d = Number(c.itemsToShow), y = Math.ceil(d + (c.itemsToScroll - 1)), C = y - A.value, E = y - (b.value - (A.value + 1));
      return {
        before: Math.max(0, C),
        after: Math.max(0, E)
      };
    }), ft = s(() => K.value.before ? O.value ? ne.value.slice(-1 * K.value.before).reduce((d, y) => d + y[M.value] + c.gap, 0) * -1 : K.value.before * Y.value * -1 : 0), He = s(() => {
      var d;
      if (O.value) {
        const y = (S.value % f.length + f.length) % f.length;
        return qt({
          slideSize: (d = ne.value[y]) === null || d === void 0 ? void 0 : d[M.value],
          viewportSize: Fe.value[M.value],
          align: c.snapAlign
        });
      }
      return qt({
        align: c.snapAlign,
        itemsToShow: +c.itemsToShow
      });
    }), tt = s(() => {
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
        })), d = y * Y.value;
      }
      return d * ($.value ? 1 : -1);
    }), qe = s(() => {
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
        let N = 0, X = 0 - K.value.before;
        const te = Math.abs(tt.value + ft.value);
        for (; N <= te; ) {
          const Q = (X % f.length + f.length) % f.length;
          N += ((d = ne.value[Q]) === null || d === void 0 ? void 0 : d[M.value]) + c.gap, X++;
        }
        C = X - 1;
      }
      let E = 0;
      {
        let N = C, X = 0;
        for (N < 0 ? X = ne.value.slice(0, N).reduce((te, Q) => te + Q[M.value] + c.gap, 0) - Math.abs(tt.value + ft.value) : X = ne.value.slice(0, N).reduce((te, Q) => te + Q[M.value] + c.gap, 0) - Math.abs(tt.value); X < Fe.value[M.value]; ) {
          const te = (N % f.length + f.length) % f.length;
          X += ((y = ne.value[te]) === null || y === void 0 ? void 0 : y[M.value]) + c.gap, N++;
        }
        E = N - 1;
      }
      return {
        min: Math.floor(C),
        max: Math.ceil(E)
      };
    }), Nt = s(() => {
      if (c.slideEffect === "fade")
        return;
      const d = ee.value ? "Y" : "X", y = ee.value ? ve.y : ve.x;
      let C = tt.value + y;
      if (!c.wrapAround && c.preventExcessiveDragging) {
        let E = 0;
        O.value ? E = ne.value.reduce((te, Q) => te + Q[M.value], 0) : E = (b.value - Number(c.itemsToShow)) * Y.value;
        const N = $.value ? 0 : -1 * E, X = $.value ? E : 0;
        C = Ae({
          val: C,
          min: N,
          max: X
        });
      }
      return `translate${d}(${C}px)`;
    }), fe = s(() => ({
      "--vc-transition-duration": q.value ? Et(c.transition, "ms") : void 0,
      "--vc-slide-gap": Et(c.gap),
      "--vc-carousel-height": Et(c.height),
      "--vc-cloned-offset": Et(ft.value)
    })), kt = { slideTo: De, next: Ie, prev: et }, Lt = Ut({
      activeSlide: A,
      config: c,
      currentSlide: S,
      isSliding: q,
      isVertical: ee,
      maxSlide: F,
      minSlide: se,
      nav: kt,
      normalizedDir: r,
      slideRegistry: a,
      slideSize: u,
      slides: f,
      slidesCount: b,
      viewport: T,
      visibleRange: qe
    });
    ia(Ke, Lt);
    const at = Ut({
      config: c,
      currentSlide: S,
      maxSlide: F,
      middleSlide: le,
      minSlide: se,
      slideSize: u,
      slidesCount: b
    });
    return n({
      data: at,
      nav: kt,
      next: Ie,
      prev: et,
      restartCarousel: ht,
      slideTo: De,
      updateBreakpointsConfig: ye,
      updateSlideSize: he,
      updateSlidesData: We
    }), () => {
      var d;
      const y = o.default || o.slides, C = (y == null ? void 0 : y(at)) || [], { before: E, after: N } = K.value, X = ea({
        slides: f,
        position: "before",
        toShow: E
      }), te = ea({
        slides: f,
        position: "after",
        toShow: N
      }), Q = [...X, ...C, ...te];
      if (!c.enabled || !Q.length)
        return W("section", {
          ref: g,
          class: ["carousel", "is-disabled"]
        }, Q);
      const lt = ((d = o.addons) === null || d === void 0 ? void 0 : d.call(o, at)) || [], St = W("ol", {
        class: "carousel__track",
        style: { transform: Nt.value },
        onMousedownCapture: c.mouseDrag ? yt : null,
        onTouchstartPassiveCapture: c.touchDrag ? yt : null
      }, Q), Ct = W("div", { class: "carousel__viewport", ref: T }, St);
      return W("section", {
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
        style: fe.value,
        "aria-label": c.i18n.ariaGallery,
        tabindex: "0",
        onFocus: Mt,
        onBlur: dt,
        onMouseenter: st,
        onMouseleave: Rt
      }, [Ct, lt, W(tl)]);
    };
  }
});
var Gt;
(function(t) {
  t.arrowDown = "arrowDown", t.arrowLeft = "arrowLeft", t.arrowRight = "arrowRight", t.arrowUp = "arrowUp";
})(Gt || (Gt = {}));
const aa = (t) => `icon${t.charAt(0).toUpperCase() + t.slice(1)}`, nl = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function ol(t) {
  return t in Gt;
}
const la = (t) => t && ol(t), na = re({
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
    const o = bt(Ke, null);
    return () => {
      const i = t.name;
      if (!i || !la(i))
        return;
      const n = nl[i], l = W("path", { d: n }), a = (o == null ? void 0 : o.config.i18n[aa(i)]) || t.title, f = W("title", a);
      return W("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": a
      }, [f, l]);
    };
  }
}), il = re({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(t, { slots: o, attrs: i }) {
    const n = bt(Ke);
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
      const { i18n: u } = n.config, m = W("button", Object.assign(Object.assign({ type: "button", disabled: g.value, "aria-label": u.ariaPreviousSlide, title: u.ariaPreviousSlide, onClick: n.nav.prev }, i), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": g.value },
        i.class
      ] }), (a == null ? void 0 : a()) || W(na, { name: f() })), c = W("button", Object.assign(Object.assign({ type: "button", disabled: T.value, "aria-label": u.ariaNextSlide, title: u.ariaNextSlide, onClick: n.nav.next }, i), { class: [
        "carousel__next",
        { "carousel__next--disabled": T.value },
        i.class
      ] }), (l == null ? void 0 : l()) || W(na, { name: b() }));
      return [m, c];
    };
  }
}), rl = re({
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
    const o = bt(Ke);
    if (!o)
      return () => "";
    const i = s(() => o.config.itemsToShow), n = s(() => qt({
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
        }), S = b(m), A = W("button", {
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
        }), V = W("li", { class: "carousel__pagination-item", key: m }, A);
        u.push(V);
      }
      return W("ol", { class: "carousel__pagination" }, u);
    };
  }
}), oa = re({
  name: "CarouselSlide",
  props: {
    id: {
      type: String,
      default: (t) => t.isClone ? void 0 : Ra()
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
    const l = bt(Ke);
    if (ia(Ke, void 0), !l)
      return () => "";
    const a = D(t.index), f = (A) => {
      a.value = A;
    }, b = Ma(), g = () => {
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
    return l.slideRegistry.registerSlide(b, t.index), Na(() => {
      l.slideRegistry.unregisterSlide(b);
    }), t.isClone && (Xt(() => {
      ta(b.vnode);
    }), La(() => {
      ta(b.vnode);
    })), () => {
      var A, V;
      return l.config.enabled ? W("li", {
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
}), ul = (t, o, i, n) => {
  if (!i) return 0;
  let l = String(t[i.key]).toLowerCase(), a = String(o[i.key]).toLowerCase();
  if (n === Xe.Asc) {
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
    return l.startsWith("__:") ? Oa(l.substring(3)) : l;
  }
  return o[t.key];
}, sl = (t, o, i) => {
  if (!t.colspan) return -1;
  let n = o;
  return i.forEach((l) => {
    let a = Yt(t, l);
    a > 0 && a < n && (n = a);
  }), n;
}, Yt = (t, o) => t.colspan === !1 ? !1 : typeof t.colspan == "function" ? t.colspan(o) : t.colspan, dl = (t, o) => typeof t.preferSlot > "u" ? !0 : t.preferSlot === !1 ? !1 : typeof t.preferSlot == "function" ? t.preferSlot(o) : !0, cl = (t, o, i) => {
  if (typeof t != "object" || !t.key || o.indexOf(t.key) > -1) return !1;
  let n = Yt(t, i);
  return typeof t.colspan > "u" ? !0 : (typeof t.colspan < "u" && (typeof t.colspan == "function" ? n = parseInt(t.colspan(i)) : n = parseInt(t.colspan)), n > 0);
}, vl = (t = []) => {
  if (t.length > 0) {
    for (let o = 0; o < t.length; ++o)
      if (t[o].sortable) return t[o].key;
  }
  return "";
}, fl = (t, o) => {
  if (t.length > 0) {
    for (let i = 0; i < t.length; ++i)
      if (t[i].key === o) return t[i];
  }
  return null;
}, ha = (t) => t.type ? `is-${t.type}` : "", Kt = /* @__PURE__ */ re({
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
    U(a, (m) => {
      const c = JSON.parse(JSON.stringify(l.value));
      c[n.column.key] = m, i("update:modelValue", c);
    }), U(() => n.modelValue, (m) => {
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
    }), T = s(() => typeof n.column.field == "string" && n.column.field.startsWith("prop:") ? Pa(n.column.field, l.value) : n.column.field), u = s(() => {
      var m, c, S, A;
      return n.column.type === gt.Field ? !((c = (m = n.column) == null ? void 0 : m.field) != null && c.label) && [
        xt.Switch,
        xt.Check
      ].includes((S = n.column.field) == null ? void 0 : S.type) ? n.column.label : (A = n.column.field) == null ? void 0 : A.label : "";
    });
    return (m, c) => {
      const S = be("lkt-anchor"), A = be("lkt-button"), V = be("lkt-field");
      return m.column.type === w(gt).Anchor ? (v(), _(S, $e(ae({ key: 0 }, m.column.anchor)), {
        default: j(() => [
          ot(Ye(w(it)(m.column, l.value, m.i)), 1)
        ]),
        _: 1
      }, 16)) : m.column.type === w(gt).Button ? (v(), _(A, ae({ key: 1 }, m.column.button, { prop: l.value }), {
        default: j(() => [
          ot(Ye(w(it)(m.column, l.value, m.i)), 1)
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
        ot(Ye(w(it)(m.column, l.value, m.i, m.columns)), 1)
      ], 64));
    };
  }
}), Ve = class Ve {
};
Ve.navButtonSlot = "", Ve.dropButtonSlot = "", Ve.editButtonSlot = "", Ve.createButtonSlot = "", Ve.defaultEmptySlot = void 0, Ve.defaultSaveIcon = "", Ve.defaultNoResultsMessage = "No results";
let J = Ve;
const pl = /* @__PURE__ */ re({
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
    const i = o, n = t, l = s(() => J.dropButtonSlot !== ""), a = s(() => J.dropButtonSlot), f = s(() => da(n.config.resourceData, n.item));
    return (b, g) => {
      const T = be("lkt-button");
      return v(), _(T, ae({ palette: "table-delete" }, n.config, {
        disabled: b.disabled,
        "resource-data": f.value,
        onClick: g[0] || (g[0] = ra((u) => i("click", u), ["prevent", "stop"]))
      }), {
        default: j(() => [
          l.value ? (v(), _(Re(a.value), { key: 0 })) : B("", !0)
        ]),
        _: 1
      }, 16, ["disabled", "resource-data"]);
    };
  }
}), ml = /* @__PURE__ */ re({
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
    const i = o, n = t, l = s(() => J.editButtonSlot !== ""), a = s(() => J.editButtonSlot), f = s(() => da(n.config.resourceData, n.item));
    return (b, g) => {
      const T = be("lkt-button");
      return v(), _(T, ae({ palette: "table-edit" }, n.config, {
        disabled: b.disabled,
        "resource-data": f.value,
        onClick: g[0] || (g[0] = ra((u) => i("click"), ["prevent", "stop"]))
      }), {
        default: j(() => [
          l.value ? (v(), _(Re(a.value), { key: 0 })) : B("", !0)
        ]),
        _: 1
      }, 16, ["disabled", "resource-data"]);
    };
  }
}), gl = ["data-i", "data-draggable"], bl = ["data-role", "data-i"], yl = {
  key: 1,
  class: "lkt-table-nav-cell"
}, hl = { class: "lkt-table-nav-container" }, kl = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, Sl = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, Cl = ["colspan"], wl = ["colspan"], Bl = ["data-column", "colspan", "title"], Dl = {
  key: 6,
  class: "lkt-table-col-drop"
}, Il = {
  key: 7,
  class: "lkt-table-col-edit"
}, Tl = /* @__PURE__ */ re({
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
    var Y;
    const i = ua(), n = o, l = t, a = D(l.modelValue);
    let f = typeof l.rowDisplayType == "function" ? l.rowDisplayType(a.value, l.i) : l.rowDisplayType;
    f || (f = nt.Auto);
    const b = [nt.Auto, nt.PreferCustomItem].includes(f), g = [nt.Auto, nt.PreferItem].includes(f), T = D((Y = l.editButton.anchor) == null ? void 0 : Y.to);
    for (let r in a.value) T.value = va(T.value, ":" + r, a.value[r]);
    const u = (r) => n("click", r), m = (r, $) => {
      n("show", r, $);
    }, c = s(() => {
      let r = [], $ = !1;
      return typeof l.disabledDrag == "function" ? $ = l.disabledDrag(a.value) : $ = de.value === !0, !$ && l.sortable && l.isDraggable ? r.push("handle") : $ && r.push("disabled"), r.join(" ");
    }), S = s(() => J.navButtonSlot !== ""), A = s(() => J.navButtonSlot), V = () => {
      n("item-up", l.i);
    }, le = () => {
      n("item-down", l.i);
    }, F = () => {
      n("item-drop", l.i);
    };
    U(() => l.modelValue, (r) => a.value = r), U(a, (r) => {
      n("update:modelValue", r);
    }, { deep: !0 });
    const se = s(() => typeof l.renderDrag == "function" ? l.renderDrag(a.value) : l.renderDrag === !0), de = s(() => typeof l.disabledDrag == "function" ? l.disabledDrag(a.value) : l.disabledDrag === !0), Me = s(() => c.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), ue = s(() => {
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
        r.sortable && r.editModeEnabled && se.value ? (v(), h("td", {
          key: 0,
          "data-role": Me.value,
          class: Z(c.value),
          "data-i": r.i
        }, $[3] || ($[3] = [
          x("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]), 10, bl)) : B("", !0),
        r.addNavigation && r.editModeEnabled ? (v(), h("td", yl, [
          x("div", hl, [
            ge(ee, {
              palette: "table-nav",
              disabled: r.i === 0,
              onClick: V
            }, {
              default: j(() => [
                S.value ? (v(), _(Re(A.value), {
                  key: 0,
                  direction: "up"
                })) : (v(), h("i", kl))
              ]),
              _: 1
            }, 8, ["disabled"]),
            ge(ee, {
              palette: "table-nav",
              disabled: r.latestRow,
              onClick: le
            }, {
              default: j(() => [
                S.value ? (v(), _(Re(A.value), {
                  key: 0,
                  direction: "down"
                })) : (v(), h("i", Sl))
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
            doDrop: () => F()
          })
        ], 8, Cl)) : w(g) && w(i).item ? (v(), h("td", {
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
            doDrop: () => F()
          })
        ], 8, wl)) : (v(!0), h(H, { key: 5 }, ie(r.visibleColumns, (O) => (v(), h(H, null, [
          w(cl)(O, r.emptyColumns, a.value) ? (v(), h("td", {
            key: "td" + r.i,
            "data-column": O.key,
            colspan: w(Yt)(O, a.value),
            title: w(it)(O, a.value, r.i, r.visibleColumns),
            class: Z(w(ha)(O)),
            onClick: $[2] || ($[2] = (M) => u(M))
          }, [
            r.$slots[O.key] && w(dl)(O, a.value) ? P(r.$slots, O.key, {
              key: 0,
              value: a.value[O.key],
              item: a.value,
              column: O,
              i: r.i
            }) : a.value ? (v(), _(Kt, {
              key: 1,
              modelValue: a.value,
              "onUpdate:modelValue": $[1] || ($[1] = (M) => a.value = M),
              column: O,
              columns: r.visibleColumns,
              "edit-mode-enabled": r.editModeEnabled,
              "has-inline-edit-perm": r.hasInlineEditPerm,
              i: r.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : B("", !0)
          ], 10, Bl)) : B("", !0)
        ], 64))), 256)),
        r.canDrop && r.editModeEnabled ? (v(), h("td", Dl, [
          ge(pl, {
            config: r.dropButton,
            item: a.value,
            onClick: F
          }, null, 8, ["config", "item"])
        ])) : B("", !0),
        r.canEdit && r.editModeEnabled ? (v(), h("td", Il, [
          ge(ml, {
            config: r.editButton,
            item: a.value
          }, null, 8, ["config", "item"])
        ])) : B("", !0)
      ], 10, gl);
    };
  }
}), El = { "data-role": "hidden-row" }, Al = ["colspan"], Vl = ["data-column"], Rl = ["data-i"], Ml = ["data-column", "title"], Nl = /* @__PURE__ */ re({
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
    return U(() => n.modelValue, (f) => l.value = f), U(l, () => i("update:modelValue", l.value)), (f, b) => Oe((v(), h("tr", El, [
      x("td", { colspan: f.hiddenColumnsColSpan }, [
        x("table", null, [
          x("tr", null, [
            (v(!0), h(H, null, ie(f.hiddenColumns, (g) => (v(), h("th", {
              "data-column": g.key
            }, [
              x("div", null, Ye(g.label), 1)
            ], 8, Vl))), 256))
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
              }) : (v(), _(Kt, {
                key: 1,
                column: g,
                columns: f.hiddenColumns,
                modelValue: l.value,
                "onUpdate:modelValue": b[0] || (b[0] = (u) => l.value = u),
                i: T,
                "edit-mode-enabled": f.editModeEnabled,
                "has-inline-edit-perm": f.hasInlineEditPerm
              }, null, 8, ["column", "columns", "modelValue", "i", "edit-mode-enabled", "has-inline-edit-perm"]))
            ], 8, Ml))), 256))
          ], 8, Rl)
        ])
      ], 8, Al)
    ], 512)), [
      [Pe, f.hiddenIsVisible]
    ]);
  }
}), zt = /* @__PURE__ */ re({
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
    const i = o, n = t, l = s(() => J.createButtonSlot !== ""), a = s(() => J.createButtonSlot), f = {
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
        default: j(() => [
          l.value ? (v(), _(Re(a.value), { key: 0 })) : B("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), Ll = ["data-column", "data-sortable", "data-sort", "colspan", "title"], _l = /* @__PURE__ */ re({
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
    const i = o, n = t, l = s(() => sl(n.column, n.amountOfColumns, n.items)), a = s(() => n.column.sortable === !0), f = s(() => a.value && n.sortBy === n.column.key ? n.sortDirection : ""), b = s(() => ca(n.column.label)), g = s(() => a.value && n.sortBy === n.column.key ? n.sortDirection === Xe.Asc ? me.defaultTableSortAscIcon : n.sortDirection === Xe.Desc ? me.defaultTableSortDescIcon : "" : ""), T = () => i("click", n.column);
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
        ot(Ye(b.value) + " ", 1),
        g.value ? (v(), h("i", {
          key: 0,
          class: Z(g.value)
        }, null, 2)) : B("", !0)
      ])
    ], 10, Ll));
  }
}), $l = ["id"], Ol = { class: "lkt-table-page-buttons" }, Pl = { class: "switch-edition-mode" }, Ul = { class: "switch-edition-mode" }, Fl = {
  key: 0,
  class: "lkt-table-page-buttons"
}, jl = {
  key: 1,
  class: "lkt-table-page-filters"
}, zl = { class: "lkt-table" }, Hl = { key: 0 }, ql = { key: 0 }, Gl = {
  key: 0,
  "data-role": "drag-indicator"
}, Xl = { key: 1 }, Yl = { key: 2 }, Kl = {
  key: 3,
  class: "lkt-table-col-drop"
}, Wl = {
  key: 4,
  class: "lkt-table-col-edit"
}, Jl = ["id"], Ql = ["id"], Zl = ["data-i"], xl = ["id"], en = ["data-i"], tn = ["id"], an = { class: "lkt-carousel-slide" }, ln = { class: "lkt-carousel-slide" }, nn = {
  key: 2,
  class: "lkt-table-empty"
}, on = {
  key: 4,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, rn = /* @__PURE__ */ re({
  __name: "LktTable",
  props: /* @__PURE__ */ $a({
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
  }, Ua(Fa)),
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
    const n = i, l = ua(), a = t, f = {}, b = D(typeof a.sorter == "function" ? a.sorter : ul), g = D(vl(a.columns)), T = D(Xe.Asc), u = D(a.modelValue), m = D(f), c = D(null), S = D(a.columns), A = D((Jt = a.paginator) == null ? void 0 : Jt.modelValue), V = D(a.loading), le = D(!1), F = D(a.perms), se = D(null), de = D(null), Me = D(null), ue = D({}), Y = D(new za({ items: u.value }, a.dataStateConfig)), r = D(a.editMode), $ = D(0), ee = D(null), O = D(((Qt = a.carousel) == null ? void 0 : Qt.currentSlide) || 0), M = D(Te(a.saveButton, me.defaultSaveButton)), ye = D(Te(a.createButton, me.defaultCreateButton)), rt = D(Te(a.editModeButton, me.defaultEditModeButton)), Ue = D(Te(a.dropButton, me.defaultDropButton)), ne = D(Te(a.groupButton, me.defaultGroupButton));
    U(() => a.saveButton, (e) => M.value = Te(a.saveButton, me.defaultSaveButton)), U(() => a.createButton, (e) => ye.value = Te(a.createButton, me.defaultCreateButton)), U(() => a.editModeButton, (e) => rt.value = Te(a.editModeButton, me.defaultEditModeButton)), U(() => a.dropButton, (e) => Ue.value = Te(a.dropButton, me.defaultDropButton));
    const Ne = D(!1);
    U(V, (e) => n("update:loading", e)), U(A, (e) => n("page", e));
    const Fe = (e) => {
      F.value = e;
    }, Vt = (e) => {
      var p;
      Array.isArray(e.data) && ((!a.paginator || ![Tt.LoadMore, Tt.Infinite].includes((p = a.paginator) == null ? void 0 : p.type)) && u.value.splice(0, u.value.length), u.value = [...u.value, ...e.data]), V.value = !1, le.value = !0, Y.value.store({ items: u.value }).turnStoredIntoOriginal(), Ne.value = !1, It(() => {
        fe(), Le.value, n("read-response", e);
      });
    }, he = () => It(() => V.value = !0), We = () => {
      se.value.doRefresh();
    }, ce = ja(12), ke = s(() => {
      if (!a.hideEmptyColumns) return [];
      let e = [];
      return S.value.forEach((p) => {
        let R = p.key, G = !1;
        u.value.forEach((oe) => {
          if (typeof oe.checkEmpty == "function")
            return oe.checkEmpty(oe);
          oe[R] && (G = !0);
        }), G || e.push(R);
      }), e;
    }), we = s(() => S.value.filter((e) => !e.hidden)), Je = s(() => S.value.filter((e) => e.hidden)), Qe = s(() => {
      let e = we.value.length + 1;
      return a.sortable && ++e, e;
    }), Be = s(() => S.value.filter((e) => e.isForRowKey)), je = s(() => Je.value.length > 0 && !a.sortable), ve = s(() => S.value.map((e) => e.key)), ze = s(() => {
      let e = [];
      for (let p in l) ve.value.indexOf(p) !== -1 && e.push(p);
      return e;
    }), ut = s(() => {
      let e = [];
      for (let p in l) p.indexOf("slide-") !== -1 && e.push(p);
      return e;
    }), st = s(() => {
      var e;
      return a.hiddenSave || V.value || !((e = M.value) != null && e.resource || M.value.type) ? !1 : r.value && Ne.value ? !0 : r.value;
    }), Rt = s(() => pt.value && u.value.length >= a.requiredItemsForTopCreate || He.value ? !0 : st.value || r.value && Se.value), Le = s(() => {
      var e, p;
      return $.value, typeof ((e = M.value) == null ? void 0 : e.disabled) == "function" ? M.value.disabled({
        value: u.value,
        dataState: Y.value
      }) : typeof ((p = M.value) == null ? void 0 : p.disabled) == "boolean" ? M.value.disabled : !Ne.value;
    }), Mt = s(() => u.value.length), dt = s(() => {
      var e;
      return {
        items: u.value,
        ...(e = M.value) == null ? void 0 : e.resourceData
      };
    }), yt = s(() => a.titleTag === "" ? "h2" : a.titleTag), ct = s(() => a.wrapContentTag === "" ? "div" : a.wrapContentTag), Ze = s(() => ca(a.title)), xe = s(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }), Se = s(() => F.value.includes(Ee.Create)), _e = s(() => F.value.includes("read")), q = s(() => F.value.includes(Ee.Update)), De = s(() => F.value.includes(Ee.Edit)), Ie = s(() => F.value.includes(Ee.InlineEdit)), et = s(() => F.value.includes(Ee.ModalCreate)), ht = s(() => F.value.includes(Ee.InlineCreate)), vt = s(() => F.value.includes(Ee.InlineCreateEver)), K = s(() => F.value.includes(Ee.Drop)), ft = s(() => F.value.includes(Ee.SwitchEditMode)), He = s(() => !ft.value || !q.value && !K.value || !q.value && K.value ? !1 : !V.value), tt = s(() => {
      var e;
      return (typeof ((e = a.paginator) == null ? void 0 : e.type) < "u" && [Tt.LoadMore, Tt.Infinite].includes(a.paginator.type) || !V.value) && u.value.length > 0;
    }), qe = s(() => S.value.find((e) => e.isForAccordionHeader)), Nt = (e) => {
      let p = e.target;
      if (typeof p.dataset.column > "u")
        do
          p = p.parentNode;
        while (typeof p.dataset.column > "u" && p.tagName !== "TABLE" && p.tagName !== "body");
      if (p.tagName === "TD" && (p = p.parentNode, p = p.dataset.i, typeof p < "u"))
        return u.value[p];
    }, fe = () => {
      $.value = qa();
    }, kt = (e) => u.value[e], Lt = (e) => {
      var p;
      return (p = c.value) == null ? void 0 : p.querySelector(`[data-i="${e}"]`);
    }, at = (e) => m.value["tr_" + e] === !0, d = (e) => {
      e && e.sortable && (u.value = u.value.sort((p, R) => b.value(p, R, e, T.value)), T.value = T.value === Xe.Asc ? Xe.Desc : Xe.Asc, g.value = e.key, fe(), n("sort", [g.value, T.value]));
    }, y = (e) => {
      n("click", e);
    }, C = (e, p) => {
      let R = "tr_" + p;
      m.value[R] = typeof m.value[R] > "u" ? !0 : !m.value[R];
    }, E = (e) => {
      var R, G, oe, pe, mt, I, k, L;
      let p = parseInt((pe = (oe = (G = (R = e == null ? void 0 : e.originalEvent) == null ? void 0 : R.toElement) == null ? void 0 : G.closest("tr")) == null ? void 0 : oe.dataset) == null ? void 0 : pe.i);
      return !(typeof ((mt = a.drag) == null ? void 0 : mt.isValid) == "function" && !((I = a.drag) != null && I.isValid(u.value[p])) || typeof ((k = a.drag) == null ? void 0 : k.isValid) == "boolean" && !((L = a.drag) != null && L.isValid));
    }, N = (e) => {
      var p, R;
      return typeof ((p = a.drag) == null ? void 0 : p.isDraggable) == "function" ? (R = a.drag) == null ? void 0 : R.isDraggable(e) : !0;
    }, X = () => {
      if (Se.value) {
        n("click-create");
        return;
      }
      if (ht.value || vt.value) {
        if (typeof a.newValueGenerator == "function") {
          let e = a.newValueGenerator();
          if (typeof e == "object" || a.type !== Ge.Table) {
            u.value.push(e);
            return;
          }
        }
        u.value.push({});
      } else
        n("click-create");
    }, te = (e) => {
      u.value.push(e);
    }, Q = () => V.value = !0, lt = () => V.value = !1, St = (e, p) => {
      var R, G, oe;
      if (!((R = M.value) != null && R.type && [
        Ft.Split,
        Ft.SplitEver,
        Ft.SplitLazy
      ].includes((G = M.value) == null ? void 0 : G.type))) {
        if (n("before-save"), (oe = M.value) != null && oe.resource && (V.value = !1, !p.success)) {
          n("error", p.httpStatus);
          return;
        }
        Y.value.turnStoredIntoOriginal(), Ne.value = !1, n("save", p);
      }
    }, Ct = (e, p, R) => {
      if (R >= e.length) {
        let G = R - e.length + 1;
        for (; G--; ) e.push(void 0);
      }
      return e.splice(R, 0, e.splice(p, 1)[0]), e;
    }, ka = (e) => {
      Ct(u.value, e, e - 1), fe();
    }, Sa = (e) => {
      Ct(u.value, e, e + 1), fe();
    }, wt = (e) => {
      u.value.splice(e, 1), fe();
    }, Wt = () => {
      var e;
      ue.value && typeof ((e = ue.value) == null ? void 0 : e.destroy) == "function" && (ue.value.destroy(), ue.value = {});
    }, _t = () => {
      ee.value || (ee.value = document.getElementById("lkt-table-body-" + ce)), ue.value = new Ha(ee.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let p = e.oldIndex, R = e.newIndex;
          u.value.splice(R, 0, u.value.splice(p, 1)[0]), fe(), n("drag-end", u.value[R]);
        },
        onMove: function(e, p) {
          return E(e);
        }
      });
    }, Bt = (e, p, R = !1) => {
      let G = [$.value, ce, "row", p];
      return R && G.push("hidden"), Be.value.forEach((oe) => {
        let pe = String(e[oe.key]).toLowerCase();
        pe.length > 50 && (pe = pe.substring(0, 50)), pe = va(pe, " ", "-"), G.push(pe);
      }), G.join("-");
    }, $t = s(() => typeof a.createEnabledValidator == "function" ? a.createEnabledValidator({ items: u.value }) : !0), pt = s(() => vt.value || Se.value && r.value || ht.value && r.value || et.value && r.value), Ca = s(() => [Ge.Ol, Ge.Ul].includes(a.type)), Dt = (e, p) => typeof a.itemDisplayChecker == "function" ? a.itemDisplayChecker(e) : !0, Ot = (e, p) => typeof a.itemContainerClass == "function" ? a.itemContainerClass(e, p) : a.itemContainerClass, wa = (e, p) => qe.value ? e[qe.value.key] : "", Ba = (e, p) => {
      var R, G;
      return qe.value ? (G = (R = qe.value) == null ? void 0 : R.field) == null ? void 0 : G.icon : "";
    };
    Xt(() => {
      var e;
      a.initialSorting && d(fl(a.columns, g.value)), Y.value.store({ items: u.value }).turnStoredIntoOriginal(), Ne.value = !1, (e = a.drag) != null && e.enabled && It(() => {
        _t();
      });
    }), U(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }, (e) => {
      e ? _t() : Wt();
    }), U(() => a.type, (e) => {
      var p;
      (p = a.drag) != null && p.enabled ? _t() : Wt();
    }), U(() => a.perms, (e) => F.value = e), U(F, (e) => n("update:perms", e)), U(r, (e) => {
      n("update:editMode", e);
    }), U(() => a.editMode, (e) => r.value = e), U(() => a.columns, (e) => S.value = e, { deep: !0 }), U(() => a.modelValue, (e) => {
      u.value = e;
    }, { deep: !0 }), U(u, (e) => {
      Y.value.increment({ items: e }), Ne.value = Y.value.changed(), n("update:modelValue", e);
    }, { deep: !0 }), o({
      getItemByEvent: Nt,
      getItemByIndex: kt,
      getRowByIndex: Lt,
      doRefresh: We,
      doRemoveIndex: (e) => {
        u.value.splice(e, 1), fe();
      },
      getHtml: () => de.value,
      reRender: fe,
      turnStoredIntoOriginal: () => {
        Y.value.turnStoredIntoOriginal(), It(() => {
          fe();
        });
      }
    });
    const Da = s(() => typeof J.defaultEmptySlot < "u"), Ia = s(() => J.defaultEmptySlot), Ta = s(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled ? !1 : typeof a.drag.canRender > "u" ? !0 : a.drag.canRender), Ea = s(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled || typeof a.drag.isDisabled > "u" ? !1 : a.drag.isDisabled);
    return (e, p) => {
      const R = be("lkt-button"), G = be("lkt-accordion"), oe = be("lkt-loader"), pe = be("lkt-paginator");
      return v(), h("section", {
        ref_key: "element",
        ref: de,
        class: "lkt-table-page",
        id: "lkt-table-page-" + w(ce)
      }, [
        Ze.value || w(l).title ? (v(), h("header", {
          key: 0,
          class: Z(e.headerClass)
        }, [
          Ze.value ? (v(), _(Re(yt.value), { key: 0 }, {
            default: j(() => [
              e.titleIcon ? (v(), h("i", {
                key: 0,
                class: Z(e.titleIcon)
              }, null, 2)) : B("", !0),
              ot(" " + Ye(Ze.value), 1)
            ]),
            _: 1
          })) : B("", !0),
          w(l).title ? P(e.$slots, "title", { key: 1 }) : B("", !0)
        ], 2)) : B("", !0),
        (v(), _(Re(ct.value), {
          class: Z(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: j(() => {
            var mt;
            return [
              Oe(x("div", Ol, [
                e.groupButton !== !1 ? (v(), _(R, ae({
                  key: 0,
                  ref: "groupButton"
                }, ne.value, { class: "lkt-item-crud-group-button" }), {
                  split: j(() => [
                    x("div", Pl, [
                      Oe(ge(R, ae(rt.value, {
                        checked: r.value,
                        "onUpdate:checked": p[0] || (p[0] = (I) => r.value = I)
                      }), null, 16, ["checked"]), [
                        [Pe, He.value]
                      ])
                    ]),
                    w(l)["prev-buttons-ever"] ? P(e.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: q.value,
                      canDrop: K.value,
                      perms: e.perms
                    }) : B("", !0),
                    w(l)["prev-buttons"] ? P(e.$slots, "prev-buttons", {
                      key: 1,
                      canUpdate: q.value,
                      canDrop: K.value,
                      perms: e.perms
                    }) : B("", !0),
                    Oe(ge(R, ae({
                      class: "lkt-table--save-button",
                      ref_key: "saveButtonRef",
                      ref: Me
                    }, {
                      ...M.value,
                      disabled: Le.value,
                      resourceData: dt.value
                    }, {
                      onLoading: Q,
                      onLoaded: lt,
                      onClick: St
                    }), {
                      split: j(({ doClose: I, doRootClick: k }) => [
                        P(e.$slots, "button-save-split", {
                          doClose: I,
                          doRootClick: k,
                          dataState: Y.value,
                          onButtonLoading: Q,
                          onButtonLoaded: lt
                        })
                      ]),
                      default: j(() => [
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
                    pt.value && u.value.length >= e.requiredItemsForTopCreate ? (v(), _(zt, {
                      key: 2,
                      config: ye.value,
                      disabled: !$t.value,
                      onClick: X,
                      onAppend: te
                    }, null, 8, ["config", "disabled"])) : B("", !0)
                  ]),
                  _: 3
                }, 16)) : B("", !0),
                w(l)["prev-buttons-ever"] ? P(e.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: q.value,
                  canDrop: K.value,
                  perms: e.perms
                }) : B("", !0),
                w(l)["prev-buttons"] ? P(e.$slots, "prev-buttons", {
                  key: 2,
                  canUpdate: q.value,
                  canDrop: K.value,
                  perms: e.perms
                }) : B("", !0),
                Oe(ge(R, ae({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: Me
                }, {
                  ...M.value,
                  disabled: Le.value,
                  resourceData: dt.value
                }, {
                  onLoading: Q,
                  onLoaded: lt,
                  onClick: St
                }), {
                  split: j(({ doClose: I, doRootClick: k }) => [
                    P(e.$slots, "button-save-split", {
                      doClose: I,
                      doRootClick: k,
                      dataState: Y.value,
                      onButtonLoading: Q,
                      onButtonLoaded: lt
                    })
                  ]),
                  default: j(() => [
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
                pt.value && u.value.length >= e.requiredItemsForTopCreate ? (v(), _(zt, {
                  key: 3,
                  config: ye.value,
                  disabled: !$t.value,
                  onClick: X,
                  onAppend: te
                }, null, 8, ["config", "disabled"])) : B("", !0),
                x("div", Ul, [
                  Oe(ge(R, ae(rt.value, {
                    checked: r.value,
                    "onUpdate:checked": p[1] || (p[1] = (I) => r.value = I)
                  }), null, 16, ["checked"]), [
                    [Pe, He.value]
                  ])
                ])
              ], 512), [
                [Pe, Rt.value]
              ]),
              w(l).buttons ? (v(), h("div", Fl, [
                P(e.$slots, "buttons")
              ])) : B("", !0),
              le.value && w(l).filters ? (v(), h("div", jl, [
                P(e.$slots, "filters", {
                  items: u.value,
                  isLoading: V.value
                })
              ])) : B("", !0),
              Oe(x("div", zl, [
                e.type === w(Ge).Table ? (v(), h("table", Hl, [
                  e.hideTableHeader ? B("", !0) : (v(), h("thead", ql, [
                    x("tr", null, [
                      xe.value && r.value ? (v(), h("th", Gl)) : B("", !0),
                      e.addNavigation && r.value ? (v(), h("th", Xl)) : B("", !0),
                      je.value ? (v(), h("th", Yl)) : B("", !0),
                      (v(!0), h(H, null, ie(we.value, (I) => (v(), h(H, null, [
                        ke.value.indexOf(I.key) === -1 ? (v(), _(_l, {
                          key: 0,
                          column: I,
                          "sort-by": g.value,
                          "sort-direction": T.value,
                          "amount-of-columns": e.columns.length,
                          items: u.value,
                          onClick: (k) => d(I)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : B("", !0)
                      ], 64))), 256)),
                      K.value && r.value ? (v(), h("th", Kl)) : B("", !0),
                      De.value && q.value && r.value ? (v(), h("th", Wl)) : B("", !0)
                    ])
                  ])),
                  x("tbody", {
                    ref_key: "tableBody",
                    ref: c,
                    id: "lkt-table-body-" + w(ce),
                    class: Z(e.itemsContainerClass)
                  }, [
                    (v(!0), h(H, null, ie(u.value, (I, k) => Oe((v(), _(Tl, {
                      modelValue: u.value[k],
                      "onUpdate:modelValue": (L) => u.value[k] = L,
                      key: Bt(I, k),
                      i: k,
                      "drop-button": Ue.value,
                      "edit-button": e.editButton,
                      "display-hidden-columns-indicator": je.value,
                      "is-draggable": N(I),
                      sortable: xe.value,
                      "visible-columns": we.value,
                      "empty-columns": ke.value,
                      "add-navigation": e.addNavigation,
                      "hidden-is-visible": at(k),
                      "latest-row": k + 1 === Mt.value,
                      "can-drop": K.value && r.value,
                      "can-edit": De.value && q.value && r.value,
                      "can-read": _e.value,
                      "can-create": Se.value,
                      "edit-mode-enabled": r.value,
                      "has-inline-edit-perm": Ie.value,
                      "row-display-type": e.rowDisplayType,
                      "render-drag": Ta.value,
                      "disabled-drag": Ea.value,
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
                        fn: j((L) => [
                          P(e.$slots, `item-${k}`, $e({
                            [e.slotItemVar || ""]: L.item,
                            index: k,
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
                      } : w(l).item ? {
                        name: "item",
                        fn: j((L) => [
                          P(e.$slots, "item", $e({
                            [e.slotItemVar || ""]: L.item,
                            index: k,
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
                      ie(ze.value, (L) => ({
                        name: L,
                        fn: j((Ce) => [
                          P(e.$slots, L, $e({
                            [e.slotItemVar || ""]: Ce.item,
                            value: Ce.value,
                            column: Ce.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "drop-button", "edit-button", "display-hidden-columns-indicator", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "hidden-is-visible", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class"])), [
                      [Pe, Dt(u.value[k])]
                    ])), 128)),
                    Je.value.length > 0 ? (v(!0), h(H, { key: 0 }, ie(u.value, (I, k) => (v(), _(Nl, {
                      modelValue: u.value[k],
                      "onUpdate:modelValue": (L) => u.value[k] = L,
                      key: Bt(I, k, !0),
                      i: k,
                      "hidden-columns": Je.value,
                      "hidden-columns-col-span": Qe.value,
                      "is-draggable": N(I),
                      sortable: xe.value,
                      "visible-columns": we.value,
                      "empty-columns": ke.value,
                      "hidden-is-visible": at(k),
                      "edit-mode-enabled": r.value,
                      "has-inline-edit-perm": Ie.value,
                      onClick: y,
                      onShow: C
                    }, Zt({ _: 2 }, [
                      ie(ze.value, (L) => ({
                        name: L,
                        fn: j((Ce) => [
                          P(e.$slots, L, $e({
                            [e.slotItemVar || ""]: Ce.item,
                            value: Ce.value,
                            column: Ce.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "hidden-columns", "hidden-columns-col-span", "is-draggable", "sortable", "visible-columns", "empty-columns", "hidden-is-visible", "edit-mode-enabled", "has-inline-edit-perm"]))), 128)) : B("", !0)
                  ], 10, Jl)
                ])) : e.type === w(Ge).Item ? (v(), h("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: c,
                  id: "lkt-table-body-" + w(ce),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), h(H, null, ie(u.value, (I, k) => (v(), h(H, null, [
                    Dt(I) ? (v(), h("div", {
                      class: Z(["lkt-table-item", Ot(I, k)]),
                      "data-i": k,
                      key: Bt(I, k)
                    }, [
                      P(e.$slots, "item", $e({
                        [e.slotItemVar || ""]: I,
                        index: k,
                        editing: r.value,
                        canCreate: Se.value,
                        canRead: _e.value,
                        canUpdate: q.value,
                        canDrop: K.value,
                        isLoading: V.value,
                        doDrop: () => wt(k)
                      }))
                    ], 10, Zl)) : B("", !0)
                  ], 64))), 256))
                ], 10, Ql)) : e.type === w(Ge).Accordion ? (v(), h("div", {
                  key: 2,
                  ref_key: "tableBody",
                  ref: c,
                  id: "lkt-table-body-" + w(ce),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), h(H, null, ie(u.value, (I, k) => (v(), h(H, null, [
                    Dt(I) ? (v(), _(G, ae({
                      class: ["lkt-table-item", Ot(I, k)],
                      "data-i": k,
                      key: Bt(I, k),
                      ref_for: !0
                    }, {
                      ...e.accordion,
                      title: wa(I),
                      icon: Ba()
                    }), {
                      default: j(() => [
                        (v(!0), h(H, null, ie(we.value, (L) => {
                          var Ce;
                          return v(), h(H, null, [
                            L.key !== ((Ce = qe.value) == null ? void 0 : Ce.key) ? (v(), _(Kt, {
                              key: 0,
                              modelValue: u.value[k],
                              "onUpdate:modelValue": (Aa) => u.value[k] = Aa,
                              i: k,
                              column: L,
                              columns: we.value,
                              "edit-mode-enabled": r.value,
                              "has-inline-edit-perm": Ie.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])) : B("", !0)
                          ], 64);
                        }), 256))
                      ]),
                      _: 2
                    }, 1040, ["class", "data-i"])) : B("", !0)
                  ], 64))), 256))
                ], 10, xl)) : Ca.value ? (v(), _(Re(e.type), {
                  key: 3,
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, {
                  default: j(() => [
                    (v(!0), h(H, null, ie(u.value, (I, k) => (v(), h(H, null, [
                      Dt(I) ? (v(), h("li", {
                        key: 0,
                        class: Z(["lkt-table-item", Ot(I, k)]),
                        "data-i": k
                      }, [
                        P(e.$slots, "item", $e({
                          [e.slotItemVar || ""]: I,
                          index: k,
                          editing: r.value,
                          canCreate: Se.value,
                          canRead: _e.value,
                          canUpdate: q.value,
                          canDrop: K.value,
                          isLoading: V.value,
                          doDrop: () => wt(k)
                        }))
                      ], 10, en)) : B("", !0)
                    ], 64))), 256))
                  ]),
                  _: 3
                }, 8, ["class"])) : e.type === w(Ge).Carousel ? (v(), h("div", {
                  key: 4,
                  ref_key: "tableBody",
                  ref: c,
                  id: "lkt-table-body-" + w(ce),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  ge(w(ll), ae({
                    modelValue: O.value,
                    "onUpdate:modelValue": p[2] || (p[2] = (I) => O.value = I)
                  }, e.carousel, {
                    "wrap-around": ((mt = e.carousel) == null ? void 0 : mt.infinite) === !0
                  }), {
                    addons: j(() => [
                      ge(w(il)),
                      ge(w(rl))
                    ]),
                    default: j(() => [
                      (v(!0), h(H, null, ie(ut.value, (I, k) => (v(), _(w(oa), {
                        key: I,
                        index: k
                      }, {
                        default: j(() => [
                          x("div", an, [
                            P(e.$slots, I)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (v(!0), h(H, null, ie(u.value, (I, k) => (v(), _(w(oa), {
                        key: e.slide,
                        index: k
                      }, {
                        default: j(() => [
                          x("div", ln, [
                            P(e.$slots, "item", $e({
                              [e.slotItemVar || ""]: I,
                              index: k,
                              editing: r.value,
                              canCreate: Se.value,
                              canRead: _e.value,
                              canUpdate: q.value,
                              canDrop: K.value,
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
                ], 10, tn)) : B("", !0)
              ], 512), [
                [Pe, tt.value]
              ]),
              !V.value && u.value.length === 0 ? (v(), h("div", nn, [
                w(l).empty ? P(e.$slots, "empty", { key: 0 }) : Da.value ? (v(), _(Re(Ia.value), {
                  key: 1,
                  message: e.noResultsText
                }, null, 8, ["message"])) : e.noResultsText ? (v(), h(H, { key: 2 }, [
                  ot(Ye(e.noResultsText), 1)
                ], 64)) : B("", !0)
              ])) : B("", !0),
              V.value ? (v(), _(oe, { key: 3 })) : B("", !0),
              pt.value || w(l).bottomButtons ? (v(), h("div", on, [
                pt.value && u.value.length >= e.requiredItemsForBottomCreate ? (v(), _(zt, {
                  key: 0,
                  config: ye.value,
                  disabled: !$t.value,
                  onClick: X,
                  onAppend: te
                }, null, 8, ["config", "disabled"])) : B("", !0),
                P(e.$slots, "bottom-buttons")
              ])) : B("", !0),
              e.paginator && Object.keys(e.paginator).length > 0 ? (v(), _(pe, ae({
                key: 5,
                ref_key: "paginatorRef",
                ref: se
              }, e.paginator, {
                modelValue: A.value,
                "onUpdate:modelValue": p[3] || (p[3] = (I) => A.value = I),
                onLoading: he,
                onPerms: Fe,
                onResponse: Vt
              }), null, 16, ["modelValue"])) : B("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, $l);
    };
  }
}), mn = {
  install: (t) => {
    t.component("lkt-table") === void 0 && t.component("lkt-table", rn);
  }
}, gn = (t) => (J.navButtonSlot = t, !0), bn = (t) => (J.dropButtonSlot = t, !0), yn = (t) => (J.createButtonSlot = t, !0), hn = (t) => {
  J.defaultEmptySlot = t;
}, kn = (t) => {
  J.defaultSaveIcon = t;
};
export {
  wn as Column,
  Bn as createColumn,
  mn as default,
  yn as setTableCreateButtonSlot,
  bn as setTableDropButtonSlot,
  hn as setTableEmptySlot,
  gn as setTableNavButtonSlot,
  kn as setTableSaveIcon
};
