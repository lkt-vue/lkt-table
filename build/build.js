import { defineComponent as ye, computed as r, ref as E, shallowReactive as Gt, watch as U, watchEffect as _t, onMounted as Wt, onBeforeUnmount as Va, reactive as jt, provide as ra, h as K, useId as Ra, inject as pt, getCurrentInstance as La, onUnmounted as Na, onUpdated as Ma, cloneVNode as Oa, resolveComponent as we, createBlock as M, createElementBlock as w, unref as h, openBlock as p, mergeProps as X, withCtx as F, createTextVNode as Ye, toDisplayString as Ke, normalizeProps as ke, Fragment as q, useSlots as ua, normalizeClass as x, createCommentVNode as R, createElementVNode as pe, createVNode as Se, resolveDynamicComponent as me, guardReactiveProps as $a, renderSlot as $, renderList as he, mergeDefaults as Fa, nextTick as It, withDirectives as je, vShow as ze, createSlots as Pa } from "vue";
import { __ as Ua } from "lkt-i18n";
import { ColumnType as Ae, FieldType as Ge, MultipleOptionsDisplay as _a, SortDirection as We, Column as sa, extractPropValue as ja, TableRowType as Ce, extractI18nValue as da, LktSettings as Ee, ensureButtonConfig as He, TablePermission as Ie, PaginatorType as Bt, TableType as qe, getDefaultValues as za, Table as Ha, ButtonType as zt } from "lkt-vue-kernel";
import { Column as vl, createColumn as fl } from "lkt-vue-kernel";
import { generateRandomString as qa, replaceAll as Ga } from "lkt-string-tools";
import { DataState as Xa } from "lkt-data-state";
import Ya from "sortablejs";
import { time as Ka } from "lkt-date-tools";
/**
 * Vue 3 Carousel 0.14.0
 * (c) 2025
 * @license MIT
 */
const ca = ["viewport", "carousel"], At = {
  "bottom-to-top": "btt",
  "left-to-right": "ltr",
  "right-to-left": "rtl",
  "top-to-bottom": "ttb"
}, va = [
  "ltr",
  "left-to-right",
  "rtl",
  "right-to-left",
  "ttb",
  "top-to-bottom",
  "btt",
  "bottom-to-top"
], Wa = {
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
}, fa = ["slide", "fade"], pa = [
  "center",
  "start",
  "end",
  "center-even",
  "center-odd"
], H = {
  autoplay: 0,
  breakpointMode: ca[0],
  breakpoints: void 0,
  dir: va[0],
  enabled: !0,
  gap: 0,
  height: "auto",
  i18n: Wa,
  ignoreAnimations: !1,
  itemsToScroll: 1,
  itemsToShow: 1,
  modelValue: 0,
  mouseDrag: !0,
  pauseAutoplayOnHover: !1,
  preventExcessiveDragging: !1,
  slideEffect: fa[0],
  snapAlign: pa[0],
  touchDrag: !0,
  transition: 300,
  wrapAround: !1
}, Je = Symbol("carousel"), Ja = (t) => {
  const i = Gt([]), o = (l) => {
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
function Qa(t) {
  return t.length === 0 ? 0 : t.reduce((o, l) => o + l, 0) / t.length;
}
function ta({ slides: t, position: i, toShow: o }) {
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
    }, v = t[(k % t.length + t.length) % t.length].vnode, I = Oa(v, s);
    I.el = null, l.push(I);
  }
  return l;
}
const Za = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function aa(t) {
  if (!t.el || !(t.el instanceof Element))
    return;
  const i = t.el.querySelectorAll(Za);
  for (const o of i)
    o instanceof HTMLElement && !o.hasAttribute("disabled") && o.getAttribute("aria-hidden") !== "true" && o.setAttribute("tabindex", "-1");
}
function xa(t, i) {
  return Object.keys(t).filter((o) => !i.includes(o)).reduce((o, l) => (o[l] = t[l], o), {});
}
function en(t) {
  const { isVertical: i, isReversed: o, dragged: l, effectiveSlideSize: n } = t, a = i ? l.y : l.x;
  if (a === 0)
    return 0;
  const y = Math.round(a / n);
  return o ? y : -y;
}
function Be({ val: t, max: i, min: o }) {
  return i < o ? t : Math.min(Math.max(t, isNaN(o) ? t : o), isNaN(i) ? t : i);
}
function tn(t) {
  const { transform: i } = window.getComputedStyle(t);
  return i.split(/[(,)]/).slice(1, -1).map((o) => parseFloat(o));
}
function an(t) {
  let i = 1, o = 1;
  return t.forEach((l) => {
    const n = tn(l);
    n.length === 6 && (i /= n[0], o /= n[3]);
  }), { widthMultiplier: i, heightMultiplier: o };
}
function nn(t, i) {
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
function ln(t, i, o) {
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
function Xt({ slideSize: t, viewportSize: i, align: o, itemsToShow: l }) {
  return l !== void 0 ? nn(o, l) : t !== void 0 && i !== void 0 ? ln(o, t, i) : 0;
}
function ma(t = "", i = {}) {
  return Object.entries(i).reduce((o, [l, n]) => o.replace(`{${l}}`, String(n)), t);
}
function ga({ val: t, max: i, min: o = 0 }) {
  const l = i - o + 1;
  return ((t - o) % l + l) % l + o;
}
function Ht(t, i = 0) {
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
function Et(t, i = "px") {
  if (!(t == null || t === ""))
    return typeof t == "number" || parseFloat(t).toString() === t ? `${t}${i}` : t;
}
const on = ye({
  name: "CarouselAria",
  setup() {
    const t = pt(Je);
    return t ? () => K("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, ma(t.config.i18n.itemXofY, {
      currentSlide: t.currentSlide + 1,
      slidesCount: t.slidesCount
    })) : () => "";
  }
}), rn = {
  // time to auto advance slides in ms
  autoplay: {
    default: H.autoplay,
    type: Number
  },
  // an object to store breakpoints
  breakpoints: {
    default: H.breakpoints,
    type: Object
  },
  // controls the breakpoint mode relative to the carousel container or the viewport
  breakpointMode: {
    default: H.breakpointMode,
    validator(t) {
      return ca.includes(t);
    }
  },
  // enable/disable the carousel component
  enabled: {
    default: H.enabled,
    type: Boolean
  },
  // control the gap between slides
  gap: {
    default: H.gap,
    type: Number
  },
  // control the gap between slides
  height: {
    default: H.height,
    type: [Number, String]
  },
  ignoreAnimations: {
    default: !1,
    type: [Array, Boolean, String]
  },
  // count of items to be scrolled
  itemsToScroll: {
    default: H.itemsToScroll,
    type: Number
  },
  // count of items to showed per view
  itemsToShow: {
    default: H.itemsToShow,
    type: [Number, String]
  },
  // aria-labels and additional text labels
  i18n: {
    default: H.i18n,
    type: Object
  },
  // slide number number of initial slide
  modelValue: {
    default: void 0,
    type: Number
  },
  // toggle mouse dragging.
  mouseDrag: {
    default: H.mouseDrag,
    type: Boolean
  },
  // toggle mouse dragging.
  touchDrag: {
    default: H.touchDrag,
    type: Boolean
  },
  pauseAutoplayOnHover: {
    default: H.pauseAutoplayOnHover,
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
    default: H.snapAlign,
    validator(t) {
      return pa.includes(t);
    }
  },
  slideEffect: {
    type: String,
    default: H.slideEffect,
    validator(t) {
      return fa.includes(t);
    }
  },
  // sliding transition time in ms
  transition: {
    default: H.transition,
    type: Number
  },
  // control the gap between slides
  dir: {
    type: String,
    default: H.dir,
    validator(t, i) {
      if (!va.includes(t))
        return !1;
      const o = t in At ? At[t] : t;
      return ["ttb", "btt"].includes(o) && (!i.height || i.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${t}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: H.wrapAround,
    type: Boolean
  }
}, un = ye({
  name: "VueCarousel",
  props: rn,
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
    const a = Ja(o), y = a.getSlides(), k = r(() => y.length), D = E(null), s = E(null), v = E(0), I = r(() => Object.assign(Object.assign(Object.assign({}, H), xa(t, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, H.i18n), t.i18n) })), c = Gt(Object.assign({}, I.value)), g = E((n = t.modelValue) !== null && n !== void 0 ? n : 0), V = E(g.value);
    U(g, (u) => V.value = u);
    const A = E(0), Qe = r(() => Math.ceil((k.value - 1) / 2)), ie = r(() => k.value - 1), re = r(() => 0);
    let ee = null, d = null, T = null;
    const ue = r(() => v.value + c.gap), _ = r(() => {
      const u = c.dir || "ltr";
      return u in At ? At[u] : u;
    }), ne = r(() => ["rtl", "btt"].includes(_.value)), se = r(() => ["ttb", "btt"].includes(_.value)), P = r(() => c.itemsToShow === "auto"), j = r(() => se.value ? "height" : "width");
    function De() {
      var u;
      if (!Ze.value)
        return;
      const b = (I.value.breakpointMode === "carousel" ? (u = D.value) === null || u === void 0 ? void 0 : u.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, C = Object.keys(t.breakpoints || {}).map((L) => Number(L)).sort((L, J) => +J - +L), B = {};
      C.some((L) => b >= L ? (Object.assign(B, t.breakpoints[L]), B.i18n && Object.assign(B.i18n, I.value.i18n, t.breakpoints[L].i18n), !0) : !1), Object.assign(c, I.value, B);
    }
    const Vt = Ht(() => {
      De(), $e(), W();
    }), de = Gt(/* @__PURE__ */ new Set()), te = E([]);
    function Rt({ widthMultiplier: u, heightMultiplier: b }) {
      te.value = y.map((C) => {
        var B;
        const L = (B = C.exposed) === null || B === void 0 ? void 0 : B.getBoundingRect();
        return {
          width: L.width * u,
          height: L.height * b
        };
      });
    }
    const Oe = E({
      width: 0,
      height: 0
    });
    function Lt({ widthMultiplier: u, heightMultiplier: b }) {
      var C;
      const B = ((C = s.value) === null || C === void 0 ? void 0 : C.getBoundingClientRect()) || { width: 0, height: 0 };
      Oe.value = {
        width: B.width * u,
        height: B.height * b
      };
    }
    function W() {
      if (!s.value)
        return;
      const u = an(de);
      if (Lt(u), Rt(u), P.value)
        v.value = Qa(te.value.map((b) => b[j.value]));
      else {
        const b = Number(c.itemsToShow), C = (b - 1) * c.gap;
        v.value = (Oe.value[j.value] - C) / b;
      }
    }
    function $e() {
      !c.wrapAround && k.value > 0 && (g.value = Be({
        val: g.value,
        max: ie.value,
        min: re.value
      })), P.value || (c.itemsToShow = Be({
        val: Number(c.itemsToShow),
        max: k.value,
        min: 1
      }));
    }
    const Te = r(() => typeof t.ignoreAnimations == "string" ? t.ignoreAnimations.split(",") : Array.isArray(t.ignoreAnimations) ? t.ignoreAnimations : t.ignoreAnimations ? !1 : []);
    _t(() => $e()), _t(() => {
      W();
    });
    let Ve;
    const mt = (u) => {
      const b = u.target;
      if (!(!(b != null && b.contains(D.value)) || Array.isArray(Te.value) && Te.value.includes(u.animationName)) && (de.add(b), !Ve)) {
        const C = () => {
          Ve = requestAnimationFrame(() => {
            W(), C();
          });
        };
        C();
      }
    }, gt = (u) => {
      const b = u.target;
      b && de.delete(b), Ve && de.size === 0 && (cancelAnimationFrame(Ve), W());
    }, Ze = E(!1);
    typeof document < "u" && _t(() => {
      Ze.value && Te.value !== !1 ? (document.addEventListener("animationstart", mt), document.addEventListener("animationend", gt)) : (document.removeEventListener("animationstart", mt), document.removeEventListener("animationend", gt));
    }), Wt(() => {
      Ze.value = !0, De(), nt(), D.value && (T = new ResizeObserver(Vt), T.observe(D.value)), o("init");
    }), Va(() => {
      Ze.value = !1, a.cleanup(), d && clearTimeout(d), Ve && cancelAnimationFrame(Ve), ee && clearInterval(ee), T && (T.disconnect(), T = null), typeof document < "u" && ve(), D.value && (D.value.removeEventListener("transitionend", W), D.value.removeEventListener("animationiteration", W));
    });
    let ce = !1;
    const xe = { x: 0, y: 0 }, Q = jt({ x: 0, y: 0 }), et = E(!1), tt = E(!1), Nt = () => {
      et.value = !0;
    }, Mt = () => {
      et.value = !1;
    }, at = Ht((u) => {
      if (!u.ctrlKey)
        switch (u.key) {
          case "ArrowLeft":
          case "ArrowUp":
            se.value === u.key.endsWith("Up") && (ne.value ? Fe(!0) : Le(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            se.value === u.key.endsWith("Down") && (ne.value ? Le(!0) : Fe(!0));
            break;
        }
    }, 200), yt = () => {
      document.addEventListener("keydown", at);
    }, ve = () => {
      document.removeEventListener("keydown", at);
    };
    function Re(u) {
      const b = u.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(b) || be.value || (ce = u.type === "touchstart", !ce && (u.preventDefault(), u.button !== 0)))
        return;
      xe.x = "touches" in u ? u.touches[0].clientX : u.clientX, xe.y = "touches" in u ? u.touches[0].clientY : u.clientY;
      const C = ce ? "touchmove" : "mousemove", B = ce ? "touchend" : "mouseup";
      document.addEventListener(C, Z, { passive: !1 }), document.addEventListener(B, bt, { passive: !0 });
    }
    const Z = Ht((u) => {
      tt.value = !0;
      const b = "touches" in u ? u.touches[0].clientX : u.clientX, C = "touches" in u ? u.touches[0].clientY : u.clientY;
      Q.x = b - xe.x, Q.y = C - xe.y;
      const B = en({
        isVertical: se.value,
        isReversed: ne.value,
        dragged: Q,
        effectiveSlideSize: ue.value
      });
      V.value = c.wrapAround ? g.value + B : Be({
        val: g.value + B,
        max: ie.value,
        min: re.value
      }), o("drag", { deltaX: Q.x, deltaY: Q.y });
    });
    function bt() {
      if (Z.cancel(), V.value !== g.value && !ce) {
        const C = (B) => {
          B.preventDefault(), window.removeEventListener("click", C);
        };
        window.addEventListener("click", C);
      }
      G(V.value), Q.x = 0, Q.y = 0, tt.value = !1;
      const u = ce ? "touchmove" : "mousemove", b = ce ? "touchend" : "mouseup";
      document.removeEventListener(u, Z), document.removeEventListener(b, bt);
    }
    function nt() {
      !c.autoplay || c.autoplay <= 0 || (ee = setInterval(() => {
        c.pauseAutoplayOnHover && et.value || Fe();
      }, c.autoplay));
    }
    function ht() {
      ee && (clearInterval(ee), ee = null);
    }
    function lt() {
      ht(), nt();
    }
    const be = E(!1);
    function G(u, b = !1) {
      if (!b && be.value)
        return;
      let C = u, B = u;
      A.value = g.value, c.wrapAround ? B = ga({
        val: C,
        max: ie.value,
        min: re.value
      }) : C = Be({
        val: C,
        max: ie.value,
        min: re.value
      }), o("slide-start", {
        slidingToIndex: u,
        currentSlideIndex: g.value,
        prevSlideIndex: A.value,
        slidesCount: k.value
      }), ht(), be.value = !0, g.value = C, B !== C && Ne.pause(), o("update:modelValue", B), d = setTimeout(() => {
        c.wrapAround && B !== C && (Ne.resume(), g.value = B, o("loop", {
          currentSlideIndex: g.value,
          slidingToIndex: u
        })), o("slide-end", {
          currentSlideIndex: g.value,
          prevSlideIndex: A.value,
          slidesCount: k.value
        }), be.value = !1, lt();
      }, c.transition);
    }
    function Fe(u = !1) {
      G(g.value + c.itemsToScroll, u);
    }
    function Le(u = !1) {
      G(g.value - c.itemsToScroll, u);
    }
    function Ot() {
      De(), $e(), W(), lt();
    }
    U(() => [I.value, t.breakpoints], () => De(), { deep: !0 }), U(() => t.autoplay, () => lt());
    const Ne = U(() => t.modelValue, (u) => {
      u !== g.value && G(Number(u), !0);
    });
    o("before-init");
    const Me = r(() => {
      if (!c.wrapAround)
        return { before: 0, after: 0 };
      if (P.value)
        return { before: y.length, after: y.length };
      const u = Number(c.itemsToShow), b = Math.ceil(u + (c.itemsToScroll - 1)), C = b - V.value, B = b - (k.value - (V.value + 1));
      return {
        before: Math.max(0, C),
        after: Math.max(0, B)
      };
    }), ut = r(() => Me.value.before ? P.value ? te.value.slice(-1 * Me.value.before).reduce((u, b) => u + b[j.value] + c.gap, 0) * -1 : Me.value.before * ue.value * -1 : 0), oe = r(() => {
      var u;
      if (P.value) {
        const b = (g.value % y.length + y.length) % y.length;
        return Xt({
          slideSize: (u = te.value[b]) === null || u === void 0 ? void 0 : u[j.value],
          viewportSize: Oe.value[j.value],
          align: c.snapAlign
        });
      }
      return Xt({
        align: c.snapAlign,
        itemsToShow: +c.itemsToShow
      });
    }), ot = r(() => {
      let u = 0;
      if (P.value) {
        if (g.value < 0 ? u = te.value.slice(g.value).reduce((b, C) => b + C[j.value] + c.gap, 0) * -1 : u = te.value.slice(0, g.value).reduce((b, C) => b + C[j.value] + c.gap, 0), u -= oe.value, !c.wrapAround) {
          const b = te.value.reduce((C, B) => C + B[j.value] + c.gap, 0) - Oe.value[j.value] - c.gap;
          u = Be({
            val: u,
            max: b,
            min: 0
          });
        }
      } else {
        let b = g.value - oe.value;
        c.wrapAround || (b = Be({
          val: b,
          max: k.value - +c.itemsToShow,
          min: 0
        })), u = b * ue.value;
      }
      return u * (ne.value ? 1 : -1);
    }), $t = r(() => {
      var u, b;
      if (!P.value) {
        const L = g.value - oe.value;
        return c.wrapAround ? {
          min: Math.floor(L),
          max: Math.ceil(L + Number(c.itemsToShow) - 1)
        } : {
          min: Math.floor(Be({
            val: L,
            max: k.value - Number(c.itemsToShow),
            min: 0
          })),
          max: Math.ceil(Be({
            val: L + Number(c.itemsToShow) - 1,
            max: k.value - 1,
            min: 0
          }))
        };
      }
      let C = 0;
      {
        let L = 0, J = 0 - Me.value.before;
        const le = Math.abs(ot.value + ut.value);
        for (; L <= le; ) {
          const Y = (J % y.length + y.length) % y.length;
          L += ((u = te.value[Y]) === null || u === void 0 ? void 0 : u[j.value]) + c.gap, J++;
        }
        C = J - 1;
      }
      let B = 0;
      {
        let L = C, J = 0;
        for (L < 0 ? J = te.value.slice(0, L).reduce((le, Y) => le + Y[j.value] + c.gap, 0) - Math.abs(ot.value + ut.value) : J = te.value.slice(0, L).reduce((le, Y) => le + Y[j.value] + c.gap, 0) - Math.abs(ot.value); J < Oe.value[j.value]; ) {
          const le = (L % y.length + y.length) % y.length;
          J += ((b = te.value[le]) === null || b === void 0 ? void 0 : b[j.value]) + c.gap, L++;
        }
        B = L - 1;
      }
      return {
        min: Math.floor(C),
        max: Math.ceil(B)
      };
    }), kt = r(() => {
      if (c.slideEffect === "fade")
        return;
      const u = se.value ? "Y" : "X", b = se.value ? Q.y : Q.x;
      let C = ot.value + b;
      if (!c.wrapAround && c.preventExcessiveDragging) {
        let B = 0;
        P.value ? B = te.value.reduce((le, Y) => le + Y[j.value], 0) : B = (k.value - Number(c.itemsToShow)) * ue.value;
        const L = ne.value ? 0 : -1 * B, J = ne.value ? B : 0;
        C = Be({
          val: C,
          min: L,
          max: J
        });
      }
      return `translate${u}(${C}px)`;
    }), Ft = r(() => ({
      "--vc-transition-duration": be.value ? Et(c.transition, "ms") : void 0,
      "--vc-slide-gap": Et(c.gap),
      "--vc-carousel-height": Et(c.height),
      "--vc-cloned-offset": Et(ut.value)
    })), St = { slideTo: G, next: Fe, prev: Le }, Pt = jt({
      activeSlide: V,
      config: c,
      currentSlide: g,
      isSliding: be,
      isVertical: se,
      maxSlide: ie,
      minSlide: re,
      nav: St,
      normalizedDir: _,
      slideRegistry: a,
      slideSize: v,
      slides: y,
      slidesCount: k,
      viewport: s,
      visibleRange: $t
    });
    ra(Je, Pt);
    const Pe = jt({
      config: c,
      currentSlide: g,
      maxSlide: ie,
      middleSlide: Qe,
      minSlide: re,
      slideSize: v,
      slidesCount: k
    });
    return l({
      data: Pe,
      nav: St,
      next: Fe,
      prev: Le,
      restartCarousel: Ot,
      slideTo: G,
      updateBreakpointsConfig: De,
      updateSlideSize: W,
      updateSlidesData: $e
    }), () => {
      var u;
      const b = i.default || i.slides, C = (b == null ? void 0 : b(Pe)) || [], { before: B, after: L } = Me.value, J = ta({
        slides: y,
        position: "before",
        toShow: B
      }), le = ta({
        slides: y,
        position: "after",
        toShow: L
      }), Y = [...J, ...C, ...le];
      if (!c.enabled || !Y.length)
        return K("section", {
          ref: D,
          class: ["carousel", "is-disabled"]
        }, Y);
      const Ct = ((u = i.addons) === null || u === void 0 ? void 0 : u.call(i, Pe)) || [], st = K("ol", {
        class: "carousel__track",
        style: { transform: kt.value },
        onMousedownCapture: c.mouseDrag ? Re : null,
        onTouchstartPassiveCapture: c.touchDrag ? Re : null
      }, Y), it = K("div", { class: "carousel__viewport", ref: s }, st);
      return K("section", {
        ref: D,
        class: [
          "carousel",
          `is-${_.value}`,
          `is-effect-${c.slideEffect}`,
          {
            "is-vertical": se.value,
            "is-sliding": be.value,
            "is-dragging": tt.value,
            "is-hover": et.value
          }
        ],
        dir: _.value,
        style: Ft.value,
        "aria-label": c.i18n.ariaGallery,
        tabindex: "0",
        onFocus: yt,
        onBlur: ve,
        onMouseenter: Nt,
        onMouseleave: Mt
      }, [it, Ct, K(on)]);
    };
  }
});
var Yt;
(function(t) {
  t.arrowDown = "arrowDown", t.arrowLeft = "arrowLeft", t.arrowRight = "arrowRight", t.arrowUp = "arrowUp";
})(Yt || (Yt = {}));
const na = (t) => `icon${t.charAt(0).toUpperCase() + t.slice(1)}`, sn = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function dn(t) {
  return t in Yt;
}
const la = (t) => t && dn(t), oa = ye({
  props: {
    name: {
      type: String,
      required: !0,
      validator: la
    },
    title: {
      type: String,
      default: (t) => t.name ? H.i18n[na(t.name)] : ""
    }
  },
  setup(t) {
    const i = pt(Je, null);
    return () => {
      const o = t.name;
      if (!o || !la(o))
        return;
      const l = sn[o], n = K("path", { d: l }), a = (i == null ? void 0 : i.config.i18n[na(o)]) || t.title, y = K("title", a);
      return K("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": a
      }, [y, n]);
    };
  }
}), cn = ye({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(t, { slots: i, attrs: o }) {
    const l = pt(Je);
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
    })[l.normalizedDir], D = r(() => !l.config.wrapAround && l.currentSlide <= l.minSlide), s = r(() => !l.config.wrapAround && l.currentSlide >= l.maxSlide);
    return () => {
      const { i18n: v } = l.config, I = K("button", Object.assign(Object.assign({ type: "button", disabled: D.value, "aria-label": v.ariaPreviousSlide, title: v.ariaPreviousSlide, onClick: l.nav.prev }, o), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": D.value },
        o.class
      ] }), (a == null ? void 0 : a()) || K(oa, { name: y() })), c = K("button", Object.assign(Object.assign({ type: "button", disabled: s.value, "aria-label": v.ariaNextSlide, title: v.ariaNextSlide, onClick: l.nav.next }, o), { class: [
        "carousel__next",
        { "carousel__next--disabled": s.value },
        o.class
      ] }), (n == null ? void 0 : n()) || K(oa, { name: k() }));
      return [I, c];
    };
  }
}), vn = ye({
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
    const i = pt(Je);
    if (!i)
      return () => "";
    const o = r(() => i.config.itemsToShow), l = r(() => Xt({
      align: i.config.snapAlign,
      itemsToShow: o.value
    })), n = r(() => t.paginateByItemsToShow && o.value > 1), a = r(() => Math.ceil((i.activeSlide - l.value) / o.value)), y = r(() => Math.ceil(i.slidesCount / o.value)), k = (D) => ga(n.value ? {
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
      for (let I = n.value ? 0 : i.minSlide; I <= (n.value ? y.value - 1 : i.maxSlide); I++) {
        const c = ma(i.config.i18n[n.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: I + 1
        }), g = k(I), V = K("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": g
          },
          "aria-label": c,
          "aria-pressed": g,
          "aria-controls": (s = (D = i.slides[I]) === null || D === void 0 ? void 0 : D.exposed) === null || s === void 0 ? void 0 : s.id,
          title: c,
          disabled: t.disableOnClick,
          onClick: () => i.nav.slideTo(n.value ? Math.floor(I * +i.config.itemsToShow + l.value) : I)
        }), A = K("li", { class: "carousel__pagination-item", key: I }, V);
        v.push(A);
      }
      return K("ol", { class: "carousel__pagination" }, v);
    };
  }
}), ia = ye({
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
  setup(t, { attrs: i, slots: o, expose: l }) {
    const n = pt(Je);
    if (ra(Je, void 0), !n)
      return () => "";
    const a = E(t.index), y = (V) => {
      a.value = V;
    }, k = La(), D = () => {
      const V = k.vnode.el;
      return V ? V.getBoundingClientRect() : { width: 0, height: 0 };
    };
    l({
      id: t.id,
      setIndex: y,
      getBoundingRect: D
    });
    const s = r(() => a.value === n.activeSlide), v = r(() => a.value === n.activeSlide - 1), I = r(() => a.value === n.activeSlide + 1), c = r(() => a.value >= n.visibleRange.min && a.value <= n.visibleRange.max), g = r(() => {
      if (n.config.itemsToShow === "auto")
        return;
      const V = n.config.itemsToShow, A = n.config.gap > 0 && V > 1 ? `calc(${100 / V}% - ${n.config.gap * (V - 1) / V}px)` : `${100 / V}%`;
      return n.isVertical ? { height: A } : { width: A };
    });
    return n.slideRegistry.registerSlide(k, t.index), Na(() => {
      n.slideRegistry.unregisterSlide(k);
    }), t.isClone && (Wt(() => {
      aa(k.vnode);
    }), Ma(() => {
      aa(k.vnode);
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
          "carousel__slide--next": I.value,
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
        isNext: I.value,
        isSliding: n.isSliding,
        isVisible: c.value
      })) : (V = o.default) === null || V === void 0 ? void 0 : V.call(o);
    };
  }
}), fn = (t, i, o, l) => {
  var y, k, D, s, v;
  if (!o) return 0;
  let n, a;
  if (o.type === Ae.Field ? [Ge.Number, Ge.Range].includes((y = o.field) == null ? void 0 : y.type) ? (n = parseFloat(t[o.key]), a = parseFloat(i[o.key])) : [Ge.Date, Ge.Date].includes((k = o.field) == null ? void 0 : k.type) ? (n = t[o.key], a = i[o.key]) : ((D = o.field) == null ? void 0 : D.type) === Ge.Select && ((s = o.field) != null && s.multiple) && ((v = o.field) == null ? void 0 : v.multipleDisplay) === _a.Count ? (n = t[o.key].length, a = i[o.key].length) : (n = String(t[o.key]).toLowerCase(), a = String(i[o.key]).toLowerCase()) : (n = String(t[o.key]).toLowerCase(), a = String(i[o.key]).toLowerCase()), l === We.Asc) {
    if (n > a) return 1;
    if (a > n) return -1;
  } else {
    if (n > a) return -1;
    if (a > n) return 1;
  }
  return 0;
}, Xe = (t, i, o, l = []) => {
  if (t.extractTitleFromColumn) {
    let a = l.find((y) => y.key === t.extractTitleFromColumn);
    if (a)
      return Xe(a, i, o, l);
  }
  let n = t.type === Ae.ColumnIndex ? o : i[t.key];
  if (t.formatter && typeof t.formatter == "function") {
    let a = t.formatter(n, i, t, o);
    return typeof a == "string" && a.startsWith("__:") ? Ua(a.substring(3)) : a;
  }
  return n;
}, pn = (t, i, o) => {
  if (!t.colspan) return -1;
  let l = i;
  return o.forEach((n) => {
    let a = Jt(t, n);
    a > 0 && a < l && (l = a);
  }), l;
}, Jt = (t, i) => t.colspan === !1 ? !1 : typeof t.colspan == "function" ? t.colspan(i) : t.colspan, ya = (t, i) => typeof t.preferSlot > "u" ? !0 : t.preferSlot === !1 ? !1 : typeof t.preferSlot == "function" ? t.preferSlot(i) : !0, mn = (t, i, o) => {
  if (typeof t != "object" || !t.key && [Ae.Field].includes(t.type) || i.indexOf(t.key) > -1) return !1;
  let l = Jt(t, o);
  return typeof t.colspan > "u" ? !0 : (typeof t.colspan < "u" && (typeof t.colspan == "function" ? l = parseInt(t.colspan(o)) : l = parseInt(t.colspan)), l > 0);
}, gn = (t = []) => {
  if (t.length > 0) {
    for (let i = 0; i < t.length; ++i)
      if (t[i].sortable) return t[i].key;
  }
  return "";
}, yn = (t, i) => {
  if (t.length > 0) {
    for (let o = 0; o < t.length; ++o)
      if (t[o].key === i) return t[o];
  }
  return null;
}, ba = (t) => {
  let i = [];
  return t.class && i.push(t.class), t.type && i.push(`is-${t.type}`), i.join(" ");
}, Kt = /* @__PURE__ */ ye({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new sa() },
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
    }, y = r(() => ({ ...l.column.slotData, item: n.value })), k = r(() => {
      var v, I, c, g;
      if ((v = l.column.field) != null && v.modalData && typeof ((I = l.column.field) == null ? void 0 : I.modalData) == "object")
        for (let V in l.column.field.modalData)
          if (typeof ((c = l.column.field) == null ? void 0 : c.modalData[V]) == "string" && l.column.field.modalData[V].startsWith("prop:")) {
            let A = l.column.field.modalData[V].substring(5);
            n.value[A];
          } else
            l.column.field.modalData[V];
      return (g = l.column.field) == null ? void 0 : g.modalData;
    }), D = r(() => typeof l.column.field == "string" && l.column.field.startsWith("prop:") ? ja(l.column.field, n.value) : l.column.field), s = r(() => {
      var v, I, c, g;
      return l.column.type === Ae.Field ? !((I = (v = l.column) == null ? void 0 : v.field) != null && I.label) && (l.column.ensureFieldLabel || [
        Ge.Switch,
        Ge.Check
      ].includes((c = l.column.field) == null ? void 0 : c.type)) ? l.column.label : (g = l.column.field) == null ? void 0 : g.label : "";
    });
    return (v, I) => {
      const c = we("lkt-anchor"), g = we("lkt-button"), V = we("lkt-field");
      return v.column.type === h(Ae).Anchor ? (p(), M(c, X({ key: 0 }, v.column.anchor, { prop: n.value }), {
        default: F(() => [
          Ye(Ke(h(Xe)(v.column, n.value, v.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : v.column.type === h(Ae).Button ? (p(), M(g, X({ key: 1 }, v.column.button, { prop: n.value }), {
        default: F(() => [
          Ye(Ke(h(Xe)(v.column, n.value, v.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : v.column.type === h(Ae).Field ? (p(), M(V, X({
        key: 2,
        modelValue: n.value[v.column.key],
        "onUpdate:modelValue": I[0] || (I[0] = (A) => n.value[v.column.key] = A)
      }, {
        ...D.value,
        readMode: !v.hasInlineEditPerm || D.value.readMode,
        slotData: y.value,
        label: s.value,
        modalData: k.value,
        prop: n.value
      }), null, 16, ["modelValue"])) : v.column.type === h(Ae).InlineDrop ? (p(), M(g, X({ key: 3 }, v.column.button, {
        prop: n.value,
        onClick: a
      }), {
        default: F(() => [
          Ye(Ke(h(Xe)(v.column, n.value, v.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : v.column.type === h(Ae).ColumnIndex && v.column.field ? (p(), M(V, ke(X({ key: 4 }, {
        ...D.value,
        modelValue: h(Xe)(v.column, n.value, v.i, v.columns),
        readMode: !0,
        slotData: y.value,
        label: s.value,
        modalData: k.value,
        prop: n.value
      })), null, 16)) : (p(), w(q, { key: 5 }, [
        Ye(Ke(h(Xe)(v.column, n.value, v.i, v.columns)), 1)
      ], 64));
    };
  }
}), ft = class ft {
};
ft.navButtonSlot = "", ft.createButtonSlot = "", ft.defaultEmptySlot = void 0;
let ge = ft;
const bn = ["data-i", "data-draggable"], hn = ["data-role", "data-i"], kn = {
  key: 1,
  class: "lkt-table-nav-cell"
}, Sn = { class: "lkt-table-nav-container" }, Cn = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, wn = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, Dn = ["colspan"], Tn = ["colspan"], In = ["colspan"], Bn = ["data-column", "colspan", "title"], En = /* @__PURE__ */ ye({
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
    rowDisplayType: { type: [Number, Function], default: Ce.Auto },
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
    const o = ua(), l = i, n = t, a = E(n.modelValue);
    let y = typeof n.rowDisplayType == "function" ? n.rowDisplayType(a.value, n.i) : n.rowDisplayType;
    y || (y = Ce.Auto);
    const k = [Ce.Auto, Ce.PreferCustomItem].includes(y), D = [Ce.Auto, Ce.PreferItem].includes(y), s = (d) => l("click", d), v = r(() => {
      let d = [], T = typeof n.disabledDrag == "function" ? n.disabledDrag(a.value) : ie.value === !0;
      return !T && n.sortable && n.isDraggable ? d.push("handle") : T && d.push("disabled"), d.join(" ");
    }), I = r(() => ge.navButtonSlot !== ""), c = r(() => ge.navButtonSlot), g = () => {
      l("item-up", n.i);
    }, V = () => {
      l("item-down", n.i);
    }, A = () => {
      l("item-drop", n.i);
    };
    U(() => n.modelValue, (d) => a.value = d), U(a, (d) => {
      l("update:modelValue", d);
    }, { deep: !0 });
    const Qe = r(() => typeof n.renderDrag == "function" ? n.renderDrag(a.value) : n.renderDrag === !0), ie = r(() => typeof n.disabledDrag == "function" ? n.disabledDrag(a.value) : n.disabledDrag === !0), re = r(() => v.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), ee = r(() => {
      let d = [];
      return k && d.push("type-custom-item"), D && d.push("type-item"), typeof n.itemContainerClass == "function" ? d.push(n.itemContainerClass(a.value, n.i)) : n.itemContainerClass !== "" && d.push(n.itemContainerClass), d.join(" ");
    });
    return (d, T) => {
      const ue = we("lkt-button");
      return p(), w("tr", {
        "data-i": d.i,
        "data-draggable": d.isDraggable,
        class: x(ee.value)
      }, [
        d.sortable && d.editModeEnabled && Qe.value ? (p(), w("td", {
          key: 0,
          "data-role": re.value,
          class: x(v.value),
          "data-i": d.i
        }, T[2] || (T[2] = [
          pe("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]), 10, hn)) : R("", !0),
        d.addNavigation && d.editModeEnabled ? (p(), w("td", kn, [
          pe("div", Sn, [
            Se(ue, {
              palette: "table-nav",
              disabled: d.i === 0,
              onClick: g
            }, {
              default: F(() => [
                I.value ? (p(), M(me(c.value), {
                  key: 0,
                  direction: "up"
                })) : (p(), w("i", Cn))
              ]),
              _: 1
            }, 8, ["disabled"]),
            Se(ue, {
              palette: "table-nav",
              disabled: d.latestRow,
              onClick: V
            }, {
              default: F(() => [
                I.value ? (p(), M(me(c.value), {
                  key: 0,
                  direction: "down"
                })) : (p(), w("i", wn))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : R("", !0),
        d.itemSlotComponent ? (p(), w("td", {
          key: "td" + d.i,
          colspan: d.visibleColumns.length
        }, [
          (p(), M(me(d.itemSlotComponent), ke($a({
            item: a.value,
            index: d.i,
            editing: d.editModeEnabled,
            perms: d.permissions,
            data: d.itemSlotData,
            events: d.itemSlotEvents
          })), null, 16))
        ], 8, Dn)) : h(k) && h(o)[`item-${d.i}`] ? (p(), w("td", {
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
        ], 8, Tn)) : h(D) && h(o).item ? (p(), w("td", {
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
        ], 8, In)) : (p(!0), w(q, { key: 5 }, he(d.visibleColumns, (_) => (p(), w(q, null, [
          h(mn)(_, d.emptyColumns, a.value) ? (p(), w("td", {
            key: "td" + d.i,
            "data-column": _.key,
            colspan: h(Jt)(_, a.value),
            title: h(Xe)(_, a.value, d.i, d.visibleColumns),
            class: x(h(ba)(_)),
            onClick: T[1] || (T[1] = (ne) => s(ne))
          }, [
            d.$slots[_.key] && h(ya)(_, a.value) ? $(d.$slots, _.key, {
              key: 0,
              value: a.value[_.key],
              item: a.value,
              column: _,
              i: d.i
            }) : a.value ? (p(), M(Kt, {
              key: 1,
              modelValue: a.value,
              "onUpdate:modelValue": T[0] || (T[0] = (ne) => a.value = ne),
              column: _,
              columns: d.visibleColumns,
              "edit-mode-enabled": d.editModeEnabled,
              "has-inline-edit-perm": d.hasInlineEditPerm,
              i: d.i,
              onInlineDrop: A
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : R("", !0)
          ], 10, Bn)) : R("", !0)
        ], 64))), 256))
      ], 10, bn);
    };
  }
}), qt = /* @__PURE__ */ ye({
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
    const o = i, l = t, n = r(() => ge.createButtonSlot !== ""), a = r(() => ge.createButtonSlot), y = {
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
    return (v, I) => {
      const c = we("lkt-button");
      return p(), M(c, X(k, {
        disabled: v.disabled,
        onClick: D
      }), {
        default: F(() => [
          n.value ? (p(), M(me(a.value), { key: 0 })) : R("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), An = ["data-column", "data-sortable", "data-sort", "colspan", "title"], Vn = /* @__PURE__ */ ye({
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
  setup(t, { emit: i }) {
    const o = i, l = t, n = r(() => pn(l.column, l.amountOfColumns, l.items)), a = r(() => l.column.sortable === !0), y = r(() => a.value && l.sortBy === l.column.key ? l.sortDirection : ""), k = r(() => da(l.column.label)), D = r(() => a.value && l.sortBy === l.column.key ? l.sortDirection === We.Asc ? Ee.defaultTableSortAscIcon : l.sortDirection === We.Desc ? Ee.defaultTableSortDescIcon : "" : ""), s = () => o("click", l.column);
    return (v, I) => (p(), w("th", {
      "data-column": v.column.key,
      "data-sortable": a.value,
      "data-sort": y.value,
      colspan: n.value,
      title: k.value,
      class: x(h(ba)(v.column)),
      onClick: s
    }, [
      pe("div", null, [
        Ye(Ke(k.value) + " ", 1),
        D.value ? (p(), w("i", {
          key: 0,
          class: x(D.value)
        }, null, 2)) : R("", !0)
      ])
    ], 10, An));
  }
}), Rn = ["id"], Ln = { class: "lkt-table-page-buttons" }, Nn = { class: "switch-edition-mode" }, Mn = { class: "switch-edition-mode" }, On = {
  key: 0,
  class: "lkt-table-page-buttons"
}, $n = {
  key: 1,
  class: "lkt-table-page-filters"
}, Fn = { class: "lkt-table" }, Pn = { key: 0 }, Un = { key: 0 }, _n = {
  key: 0,
  "data-role": "drag-indicator"
}, jn = { key: 1 }, zn = ["id"], Hn = ["id"], qn = ["data-i"], Gn = ["id"], Xn = ["data-i"], Yn = ["id"], Kn = { class: "lkt-carousel-slide" }, Wn = { class: "lkt-carousel-slide" }, Jn = {
  key: 2,
  class: "lkt-table-empty"
}, Qn = {
  key: 4,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, Zn = /* @__PURE__ */ ye({
  __name: "LktTable",
  props: /* @__PURE__ */ Fa({
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
    switchableTypes: {},
    switchableTypesButtons: {},
    useItemSlot: { type: [Boolean, Function] },
    events: {}
  }, za(Ha)),
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
    var Zt, xt;
    const l = o, n = ua(), a = t, y = E(typeof a.sorter == "function" ? a.sorter : fn), k = E(gn(a.columns)), D = E(We.Asc), s = E(a.modelValue), v = E(null), I = E(a.columns), c = E((Zt = a.paginator) == null ? void 0 : Zt.modelValue), g = E(a.loading), V = E(!1), A = E(a.perms), Qe = E(null), ie = E(null), re = E(null), ee = E({}), d = E(new Xa({ items: s.value }, a.dataStateConfig)), T = E(a.editMode), ue = E(0), _ = E(null), ne = E(a.type), se = E(((xt = a.carousel) == null ? void 0 : xt.currentSlide) || 0), P = E(He(a.saveButton, Ee.defaultSaveButton)), j = E(He(a.createButton, Ee.defaultCreateButton)), De = E(He(a.editModeButton, Ee.defaultEditModeButton)), Vt = E(He(a.groupButton, Ee.defaultGroupButton));
    U(() => a.saveButton, (e) => P.value = He(a.saveButton, Ee.defaultSaveButton)), U(() => a.createButton, (e) => j.value = He(a.createButton, Ee.defaultCreateButton)), U(() => a.editModeButton, (e) => De.value = He(a.editModeButton, Ee.defaultEditModeButton));
    const de = E(!1);
    U(g, (e) => l("update:loading", e)), U(c, (e) => l("page", e));
    const te = (e) => {
      A.value = e;
    }, Rt = (e) => {
      var f;
      if (Array.isArray(e.data)) {
        let O = e.data;
        typeof ((f = a.events) == null ? void 0 : f.parseResults) == "function" && (O = a.events.parseResults(O)), s.value = [...s.value, ...O];
      }
      g.value = !1, V.value = !0, d.value.store({ items: s.value }).turnStoredIntoOriginal(), de.value = !1, It(() => {
        Q.value, l("read-response", e);
      });
    }, Oe = () => It(() => {
      var e;
      (!a.paginator || ![Bt.LoadMore, Bt.Infinite].includes((e = a.paginator) == null ? void 0 : e.type)) && s.value.splice(0, s.value.length), g.value = !0;
    }), Lt = () => {
      Qe.value.doRefresh();
    }, W = qa(12), $e = r(() => {
      if (!a.hideEmptyColumns) return [];
      let e = [];
      return I.value.forEach((f) => {
        let O = f.key, z = !1;
        s.value.forEach((ae) => {
          if (typeof ae.checkEmpty == "function")
            return ae.checkEmpty(ae);
          ae[O] && (z = !0);
        }), z || e.push(O);
      }), e;
    }), Te = r(() => I.value.filter((e) => !e.hidden)), Ve = r(() => I.value.filter((e) => e.isForRowKey)), mt = r(() => I.value.map((e) => e.key)), gt = r(() => {
      let e = [];
      for (let f in n) mt.value.indexOf(f) !== -1 && e.push(f);
      return e;
    }), Ze = r(() => {
      let e = [];
      for (let f in n) f.indexOf("slide-") !== -1 && e.push(f);
      return e;
    }), ce = r(() => {
      var e;
      return a.hiddenSave || g.value || !((e = P.value) != null && e.resource || P.value.type) ? !1 : T.value && de.value ? !0 : T.value;
    }), xe = r(() => dt.value && s.value.length >= a.requiredItemsForTopCreate || Le.value ? !0 : ce.value || T.value && ve.value), Q = r(() => {
      var e, f;
      return ue.value, typeof ((e = P.value) == null ? void 0 : e.disabled) == "function" ? P.value.disabled({
        value: s.value,
        dataState: d.value
      }) : typeof ((f = P.value) == null ? void 0 : f.disabled) == "boolean" ? P.value.disabled : !de.value;
    }), et = r(() => s.value.length), tt = r(() => {
      var e;
      return {
        items: s.value,
        ...(e = P.value) == null ? void 0 : e.resourceData
      };
    }), Nt = r(() => a.titleTag === "" ? "h2" : a.titleTag), Mt = r(() => a.wrapContentTag === "" ? "div" : a.wrapContentTag), at = r(() => da(a.title)), yt = r(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }), ve = r(() => A.value.includes(Ie.Create)), Re = r(() => A.value.includes("read")), Z = r(() => A.value.includes(Ie.Update)), bt = r(() => A.value.includes(Ie.Edit)), nt = r(() => A.value.includes(Ie.InlineEdit)), ht = r(() => A.value.includes(Ie.ModalCreate)), lt = r(() => A.value.includes(Ie.InlineCreate)), be = r(() => A.value.includes(Ie.InlineCreateEver)), G = r(() => A.value.includes(Ie.Drop)), Fe = r(() => A.value.includes(Ie.SwitchEditMode)), Le = r(() => !Fe.value || !Z.value && !G.value || !Z.value && G.value ? !1 : !g.value), Ot = r(() => {
      var e;
      return (typeof ((e = a.paginator) == null ? void 0 : e.type) < "u" && [Bt.LoadMore, Bt.Infinite].includes(a.paginator.type) || !g.value) && s.value.length > 0;
    }), Ne = r(() => I.value.find((e) => e.isForAccordionHeader)), Me = (e, f) => typeof a.customItemSlotName == "function" ? a.customItemSlotName(e, f) : "", ut = (e) => {
      let f = e.target;
      if (typeof f.dataset.column > "u")
        do
          f = f.parentNode;
        while (typeof f.dataset.column > "u" && f.tagName !== "TABLE" && f.tagName !== "body");
      if (f.tagName === "TD" && (f = f.parentNode, f = f.dataset.i, typeof f < "u"))
        return s.value[f];
    }, oe = () => {
      ue.value = Ka();
    }, ot = (e) => s.value[e], $t = (e) => {
      var f;
      return (f = v.value) == null ? void 0 : f.querySelector(`[data-i="${e}"]`);
    }, kt = (e) => {
      e && e.sortable && (e.key === k.value && (D.value = D.value === We.Asc ? We.Desc : We.Asc), k.value = e.key, s.value = s.value.sort((f, O) => y.value(f, O, e, D.value)), oe(), l("sort", {
        sortBy: k.value,
        sortDirection: D.value
      }));
    }, Ft = (e) => {
      l("click", e);
    }, St = (e) => {
      var O, z, ae, fe, Tt, vt, S, m;
      let f = parseInt((fe = (ae = (z = (O = e == null ? void 0 : e.originalEvent) == null ? void 0 : O.toElement) == null ? void 0 : z.closest("tr")) == null ? void 0 : ae.dataset) == null ? void 0 : fe.i);
      return !(typeof ((Tt = a.drag) == null ? void 0 : Tt.isValid) == "function" && !((vt = a.drag) != null && vt.isValid(s.value[f])) || typeof ((S = a.drag) == null ? void 0 : S.isValid) == "boolean" && !((m = a.drag) != null && m.isValid));
    }, Pt = (e) => {
      var f, O;
      return typeof ((f = a.drag) == null ? void 0 : f.isDraggable) == "function" ? (O = a.drag) == null ? void 0 : O.isDraggable(e) : !0;
    }, Pe = () => {
      if (ve.value) {
        l("click-create");
        return;
      }
      if (lt.value || be.value) {
        if (typeof a.newValueGenerator == "function") {
          let e = a.newValueGenerator();
          if (typeof e == "object" || _e.value !== qe.Table) {
            s.value.push(e);
            return;
          }
        }
        s.value.push({});
      } else
        l("click-create");
    }, u = (e) => {
      s.value.push(e);
    }, b = () => g.value = !0, C = () => g.value = !1, B = (e, f) => {
      var O, z, ae;
      if (!((O = P.value) != null && O.type && [
        zt.Split,
        zt.SplitEver,
        zt.SplitLazy
      ].includes((z = P.value) == null ? void 0 : z.type))) {
        if (l("before-save"), (ae = P.value) != null && ae.resource && (g.value = !1, !f.success)) {
          l("error", f.httpStatus);
          return;
        }
        d.value.turnStoredIntoOriginal(), de.value = !1, l("save", f);
      }
    }, L = (e, f, O) => {
      if (O >= e.length) {
        let z = O - e.length + 1;
        for (; z--; ) e.push(void 0);
      }
      return e.splice(O, 0, e.splice(f, 1)[0]), e;
    }, J = (e) => {
      L(s.value, e, e - 1), oe();
    }, le = (e) => {
      L(s.value, e, e + 1), oe();
    }, Y = (e) => {
      s.value.splice(e, 1), oe();
    }, Ct = () => {
      var e;
      ee.value && typeof ((e = ee.value) == null ? void 0 : e.destroy) == "function" && (ee.value.destroy(), ee.value = {});
    }, st = () => {
      _.value || (_.value = document.getElementById("lkt-table-body-" + W)), ee.value = new Ya(_.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let f = e.oldIndex, O = e.newIndex;
          s.value.splice(O, 0, s.value.splice(f, 1)[0]), oe(), l("drag-end", s.value[O]);
        },
        onMove: function(e, f) {
          return St(e);
        }
      });
    }, it = (e, f, O = !1) => {
      let z = [ue.value, W, "row", f];
      return O && z.push("hidden"), Ve.value.forEach((ae) => {
        let fe = String(e[ae.key]).toLowerCase();
        fe.length > 50 && (fe = fe.substring(0, 50)), fe = Ga(fe, " ", "-"), z.push(fe);
      }), z.join("-");
    }, Ut = r(() => typeof a.createEnabledValidator == "function" ? a.createEnabledValidator({ items: s.value }) : !0), dt = r(() => a.createButton === !1 ? !1 : be.value || ve.value && T.value || lt.value && T.value || ht.value && T.value), ha = r(() => [qe.Ol, qe.Ul].includes(_e.value)), ct = (e, f) => typeof a.itemDisplayChecker == "function" ? a.itemDisplayChecker(e, f) : !0, wt = (e, f) => typeof a.itemContainerClass == "function" ? a.itemContainerClass(e, f) : a.itemContainerClass, ka = (e, f) => Ne.value ? e[Ne.value.key] : "", Ue = r(() => typeof a.itemSlotComponent == "function" ? a.itemSlotComponent() : a.itemSlotComponent), Dt = r(() => typeof a.itemSlotData == "function" ? a.itemSlotData() : a.itemSlotData);
    Wt(() => {
      var e;
      a.initialSorting && kt(yn(a.columns, k.value)), d.value.store({ items: s.value }).turnStoredIntoOriginal(), de.value = !1, (e = a.drag) != null && e.enabled && It(() => {
        st();
      });
    }), U(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }, (e) => {
      e ? st() : Ct();
    }), U(() => a.type, (e) => {
      var f;
      (f = a.drag) != null && f.enabled ? st() : Ct();
    }), U(() => a.perms, (e) => A.value = e), U(A, (e) => l("update:perms", e)), U(T, (e) => {
      l("update:editMode", e);
    }), U(() => a.editMode, (e) => T.value = e), U(() => a.columns, (e) => I.value = e, { deep: !0 }), U(() => a.modelValue, (e) => {
      s.value = e;
    }, { deep: !0 }), U(s, (e) => {
      d.value.increment({ items: e }), de.value = d.value.changed(), l("update:modelValue", e);
    }, { deep: !0 }), i({
      getItemByEvent: ut,
      getItemByIndex: ot,
      getRowByIndex: $t,
      doRefresh: Lt,
      doRemoveIndex: (e) => {
        s.value.splice(e, 1), oe();
      },
      getHtml: () => ie.value,
      reRender: oe,
      turnStoredIntoOriginal: () => {
        d.value.turnStoredIntoOriginal(), It(() => {
          oe();
        });
      }
    });
    const Sa = r(() => typeof ge.defaultEmptySlot < "u"), Ca = r(() => ge.defaultEmptySlot), wa = r(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled ? !1 : typeof a.drag.canRender > "u" ? !0 : a.drag.canRender), Da = r(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled || typeof a.drag.isDisabled > "u" ? !1 : a.drag.isDisabled), Ta = r(() => typeof a.header == "object" && Object.keys(a.header).length > 0), _e = r(() => Array.isArray(a.switchableTypes) && a.switchableTypes.length > 0 ? ne.value : a.type), Ia = r(() => Array.isArray(a.switchableTypes) ? a.switchableTypes.length > 0 ? a.switchableTypes.includes(a.type) ? a.switchableTypes : [
      a.type,
      ...a.switchableTypes
    ] : [] : []), Ba = r(() => {
      let e = [];
      return Ia.value.forEach((f) => {
        e.push({
          ...a.switchableTypesButtons[f],
          events: {
            click: (O) => {
              ne.value = f, typeof a.switchableTypesButtons[f] == "function" && a.switchableTypesButtons[f](O);
            }
          }
        });
      }), e;
    }), Ea = r(() => {
      var e, f;
      return {
        ...a.header,
        topEndButtons: [
          ...typeof ((e = a.header) == null ? void 0 : e.topEndButtons) > "u" ? [] : (f = a.header) == null ? void 0 : f.topEndButtons,
          ...Ba.value
        ]
      };
    }), Qt = (e, f) => typeof a.useItemSlot == "function" ? a.useItemSlot({ item: e, index: f }) === !0 : a.useItemSlot;
    return (e, f) => {
      const O = we("lkt-header"), z = we("lkt-button"), ae = we("lkt-accordion"), fe = we("lkt-loader"), Tt = we("lkt-paginator");
      return p(), w("section", {
        ref_key: "element",
        ref: ie,
        class: "lkt-table-page",
        id: "lkt-table-page-" + h(W)
      }, [
        Ta.value ? (p(), M(O, ke(X({ key: 0 }, Ea.value)), null, 16)) : at.value || h(n).title ? (p(), w("header", {
          key: 1,
          class: x(e.headerClass)
        }, [
          at.value ? (p(), M(me(Nt.value), { key: 0 }, {
            default: F(() => [
              e.titleIcon ? (p(), w("i", {
                key: 0,
                class: x(e.titleIcon)
              }, null, 2)) : R("", !0),
              Ye(" " + Ke(at.value), 1)
            ]),
            _: 1
          })) : R("", !0),
          h(n).title ? $(e.$slots, "title", { key: 1 }) : R("", !0)
        ], 2)) : R("", !0),
        (p(), M(me(Mt.value), {
          class: x(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: F(() => {
            var vt;
            return [
              je(pe("div", Ln, [
                e.groupButton !== !1 ? (p(), M(z, X({
                  key: 0,
                  ref: "groupButton"
                }, Vt.value, { class: "lkt-item-crud-group-button" }), {
                  split: F(() => [
                    pe("div", Nn, [
                      je(Se(z, X(De.value, {
                        checked: T.value,
                        "onUpdate:checked": f[0] || (f[0] = (S) => T.value = S)
                      }), null, 16, ["checked"]), [
                        [ze, Le.value]
                      ])
                    ]),
                    h(n)["prev-buttons-ever"] ? $(e.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: Z.value,
                      canDrop: G.value,
                      perms: e.perms
                    }) : R("", !0),
                    h(n)["prev-buttons"] ? $(e.$slots, "prev-buttons", {
                      key: 1,
                      canUpdate: Z.value,
                      canDrop: G.value,
                      perms: e.perms
                    }) : R("", !0),
                    je(Se(z, X({
                      class: "lkt-table--save-button",
                      ref_key: "saveButtonRef",
                      ref: re
                    }, {
                      ...P.value,
                      disabled: Q.value,
                      resourceData: tt.value
                    }, {
                      onLoading: b,
                      onLoaded: C,
                      onClick: B
                    }), {
                      split: F(({ doClose: S, doRootClick: m }) => [
                        $(e.$slots, "button-save-split", {
                          doClose: S,
                          doRootClick: m,
                          dataState: d.value,
                          onButtonLoading: b,
                          onButtonLoaded: C
                        })
                      ]),
                      default: F(() => [
                        h(n)["button-save"] ? $(e.$slots, "button-save", {
                          key: 0,
                          items: s.value,
                          editMode: e.editMode,
                          canUpdate: !Q.value
                        }) : R("", !0)
                      ]),
                      _: 3
                    }, 16), [
                      [ze, ce.value]
                    ]),
                    dt.value && s.value.length >= e.requiredItemsForTopCreate ? (p(), M(qt, {
                      key: 2,
                      config: j.value,
                      disabled: !Ut.value,
                      onClick: Pe,
                      onAppend: u
                    }, null, 8, ["config", "disabled"])) : R("", !0)
                  ]),
                  _: 3
                }, 16)) : R("", !0),
                h(n)["prev-buttons-ever"] ? $(e.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: Z.value,
                  canDrop: G.value,
                  perms: e.perms
                }) : R("", !0),
                h(n)["prev-buttons"] ? $(e.$slots, "prev-buttons", {
                  key: 2,
                  canUpdate: Z.value,
                  canDrop: G.value,
                  perms: e.perms
                }) : R("", !0),
                je(Se(z, X({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: re
                }, {
                  ...P.value,
                  disabled: Q.value,
                  resourceData: tt.value
                }, {
                  onLoading: b,
                  onLoaded: C,
                  onClick: B
                }), {
                  split: F(({ doClose: S, doRootClick: m }) => [
                    $(e.$slots, "button-save-split", {
                      doClose: S,
                      doRootClick: m,
                      dataState: d.value,
                      onButtonLoading: b,
                      onButtonLoaded: C
                    })
                  ]),
                  default: F(() => [
                    h(n)["button-save"] ? $(e.$slots, "button-save", {
                      key: 0,
                      items: s.value,
                      editMode: e.editMode,
                      canUpdate: !Q.value
                    }) : R("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [ze, ce.value]
                ]),
                dt.value && s.value.length >= e.requiredItemsForTopCreate ? (p(), M(qt, {
                  key: 3,
                  config: j.value,
                  disabled: !Ut.value,
                  onClick: Pe,
                  onAppend: u
                }, null, 8, ["config", "disabled"])) : R("", !0),
                pe("div", Mn, [
                  je(Se(z, X(De.value, {
                    checked: T.value,
                    "onUpdate:checked": f[1] || (f[1] = (S) => T.value = S)
                  }), null, 16, ["checked"]), [
                    [ze, Le.value]
                  ])
                ])
              ], 512), [
                [ze, xe.value]
              ]),
              h(n).buttons ? (p(), w("div", On, [
                $(e.$slots, "buttons")
              ])) : R("", !0),
              V.value && h(n).filters ? (p(), w("div", $n, [
                $(e.$slots, "filters", {
                  items: s.value,
                  isLoading: g.value
                })
              ])) : R("", !0),
              je(pe("div", Fn, [
                _e.value === h(qe).Table ? (p(), w("table", Pn, [
                  e.hideTableHeader ? R("", !0) : (p(), w("thead", Un, [
                    pe("tr", null, [
                      yt.value && T.value ? (p(), w("th", _n)) : R("", !0),
                      e.addNavigation && T.value ? (p(), w("th", jn)) : R("", !0),
                      (p(!0), w(q, null, he(Te.value, (S) => (p(), w(q, null, [
                        $e.value.indexOf(S.key) === -1 ? (p(), M(Vn, {
                          key: 0,
                          column: S,
                          "sort-by": k.value,
                          "sort-direction": D.value,
                          "amount-of-columns": e.columns.length,
                          items: s.value,
                          onClick: (m) => kt(S)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : R("", !0)
                      ], 64))), 256))
                    ])
                  ])),
                  pe("tbody", {
                    ref_key: "tableBody",
                    ref: v,
                    id: "lkt-table-body-" + h(W),
                    class: x(e.itemsContainerClass)
                  }, [
                    (p(!0), w(q, null, he(s.value, (S, m) => je((p(), M(En, {
                      modelValue: s.value[m],
                      "onUpdate:modelValue": (N) => s.value[m] = N,
                      key: it(S, m),
                      i: m,
                      "is-draggable": Pt(S),
                      sortable: yt.value,
                      "visible-columns": Te.value,
                      "empty-columns": $e.value,
                      "add-navigation": e.addNavigation,
                      "latest-row": m + 1 === et.value,
                      "can-drop": G.value && T.value,
                      "can-edit": bt.value && Z.value && T.value,
                      "can-read": Re.value,
                      "can-create": ve.value,
                      "edit-mode-enabled": T.value,
                      "has-inline-edit-perm": nt.value,
                      "row-display-type": e.rowDisplayType,
                      "render-drag": wa.value,
                      "disabled-drag": Da.value,
                      "is-loading": g.value,
                      "item-container-class": e.itemContainerClass,
                      "item-slot-component": Ue.value,
                      "item-slot-data": Dt.value,
                      "item-slot-events": e.itemSlotEvents,
                      permissions: A.value,
                      onClick: Ft,
                      onItemUp: J,
                      onItemDown: le,
                      onItemDrop: Y
                    }, Pa({ _: 2 }, [
                      h(n)[`item-${m}`] && Qt(e.row, m) ? {
                        name: `item-${m}`,
                        fn: F((N) => [
                          $(e.$slots, `item-${m}`, ke({
                            [e.slotItemVar || ""]: N.item,
                            index: m,
                            editing: N.editing,
                            canCreate: N.canCreate,
                            canRead: N.canRead,
                            canUpdate: N.canUpdate,
                            canDrop: N.canDrop,
                            isLoading: N.isLoading,
                            doDrop: N.doDrop
                          }))
                        ]),
                        key: "0"
                      } : h(n).item && Qt(e.row, m) ? {
                        name: "item",
                        fn: F((N) => [
                          $(e.$slots, "item", ke({
                            [e.slotItemVar || ""]: N.item,
                            index: m,
                            editing: N.editing,
                            canCreate: N.canCreate,
                            canRead: N.canRead,
                            canUpdate: N.canUpdate,
                            canDrop: N.canDrop,
                            isLoading: N.isLoading,
                            doDrop: N.doDrop
                          }))
                        ]),
                        key: "1"
                      } : void 0,
                      he(gt.value, (N) => ({
                        name: N,
                        fn: F((rt) => [
                          $(e.$slots, N, ke({
                            [e.slotItemVar || ""]: rt.item,
                            value: rt.value,
                            column: rt.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class", "item-slot-component", "item-slot-data", "item-slot-events", "permissions"])), [
                      [ze, ct(s.value[m], m)]
                    ])), 128))
                  ], 10, zn)
                ])) : _e.value === h(qe).Item ? (p(), w("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + h(W),
                  class: x(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (p(!0), w(q, null, he(s.value, (S, m) => (p(), w(q, {
                    key: it(S, m)
                  }, [
                    !e.skipTableItemsContainer && ct(S, m) ? (p(), w("div", {
                      key: 0,
                      class: x(["lkt-table-item", wt(S, m)]),
                      "data-i": m
                    }, [
                      Ue.value ? (p(), M(me(Ue.value), X({
                        key: 0,
                        ref_for: !0
                      }, {
                        item: S,
                        index: m,
                        editing: T.value,
                        perms: A.value,
                        data: Dt.value,
                        events: e.itemSlotEvents
                      }), null, 16)) : $(e.$slots, "item", ke({
                        key: 1,
                        [e.slotItemVar || ""]: S,
                        index: m,
                        editing: T.value,
                        canCreate: ve.value,
                        canRead: Re.value,
                        canUpdate: Z.value,
                        canDrop: G.value,
                        isLoading: g.value,
                        doDrop: () => Y(m)
                      }))
                    ], 10, qn)) : ct(S, m) ? $(e.$slots, "item", ke({
                      key: 1,
                      class: wt(S, m),
                      dataI: m,
                      [e.slotItemVar || ""]: S,
                      index: m,
                      editing: T.value,
                      canCreate: ve.value,
                      canRead: Re.value,
                      canUpdate: Z.value,
                      canDrop: G.value,
                      isLoading: g.value,
                      doDrop: () => Y(m)
                    })) : R("", !0)
                  ], 64))), 128))
                ], 10, Hn)) : _e.value === h(qe).Accordion ? (p(), w("div", {
                  key: 2,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + h(W),
                  class: x(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (p(!0), w(q, null, he(s.value, (S, m) => (p(), w(q, null, [
                    [h(Ce).Auto, h(Ce).PreferCustomItem].includes(e.rowDisplayType) && h(n)[Me(S, m)] ? $(e.$slots, Me(S, m), {
                      key: 0,
                      item: S,
                      index: m,
                      editing: T.value,
                      isLoading: g.value
                    }) : [h(Ce).Auto, h(Ce).PreferCustomItem].includes(e.rowDisplayType) && h(n)[`item-${m}`] ? $(e.$slots, `item-${m}`, {
                      key: 1,
                      item: S,
                      index: m,
                      editing: T.value,
                      isLoading: g.value
                    }) : (p(), w(q, { key: 2 }, [
                      ct(S, m) ? (p(), M(ae, X({
                        class: ["lkt-table-item", wt(S, m)],
                        "data-i": m,
                        key: it(S, m)
                      }, { ref_for: !0 }, {
                        ...e.accordion,
                        title: ka(S)
                      }), {
                        header: F(() => [
                          Se(Kt, {
                            modelValue: s.value[m],
                            "onUpdate:modelValue": (N) => s.value[m] = N,
                            i: m,
                            column: Ne.value,
                            columns: Te.value,
                            "edit-mode-enabled": T.value,
                            "has-inline-edit-perm": nt.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])
                        ]),
                        default: F(() => [
                          (p(!0), w(q, null, he(Te.value, (N) => {
                            var rt, ea;
                            return p(), w(q, null, [
                              N.key !== ((rt = Ne.value) == null ? void 0 : rt.key) && e.$slots[N.key] && h(ya)(N, s.value[m]) ? $(e.$slots, N.key, {
                                key: 0,
                                value: s.value[m][N.key],
                                item: s.value[m],
                                column: N,
                                i: m
                              }) : (p(), w(q, { key: 1 }, [
                                N.key !== ((ea = Ne.value) == null ? void 0 : ea.key) ? (p(), M(Kt, {
                                  key: 0,
                                  modelValue: s.value[m],
                                  "onUpdate:modelValue": (Aa) => s.value[m] = Aa,
                                  i: m,
                                  column: N,
                                  columns: Te.value,
                                  "edit-mode-enabled": T.value,
                                  "has-inline-edit-perm": nt.value
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])) : R("", !0)
                              ], 64))
                            ], 64);
                          }), 256))
                        ]),
                        _: 2
                      }, 1040, ["class", "data-i"])) : R("", !0)
                    ], 64))
                  ], 64))), 256))
                ], 10, Gn)) : ha.value ? (p(), M(me(_e.value), {
                  key: 3,
                  class: x(["lkt-table-items-container", e.itemsContainerClass])
                }, {
                  default: F(() => [
                    (p(!0), w(q, null, he(s.value, (S, m) => (p(), w(q, {
                      key: it(S, m)
                    }, [
                      ct(S, m) ? (p(), w("li", {
                        key: 0,
                        class: x(["lkt-table-item", wt(S, m)]),
                        "data-i": m
                      }, [
                        Ue.value ? (p(), M(me(Ue.value), X({
                          key: 0,
                          ref_for: !0
                        }, {
                          item: S,
                          index: m,
                          editing: T.value,
                          perms: A.value,
                          data: Dt.value,
                          events: e.itemSlotEvents
                        }), null, 16)) : $(e.$slots, "item", ke({
                          key: 1,
                          [e.slotItemVar || ""]: S,
                          index: m,
                          editing: T.value,
                          canCreate: ve.value,
                          canRead: Re.value,
                          canUpdate: Z.value,
                          canDrop: G.value,
                          isLoading: g.value,
                          doDrop: () => Y(m)
                        }))
                      ], 10, Xn)) : R("", !0)
                    ], 64))), 128))
                  ]),
                  _: 3
                }, 8, ["class"])) : _e.value === h(qe).Carousel ? (p(), w("div", {
                  key: 4,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + h(W),
                  class: x(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  Se(h(un), X({
                    modelValue: se.value,
                    "onUpdate:modelValue": f[2] || (f[2] = (S) => se.value = S)
                  }, e.carousel, {
                    "wrap-around": ((vt = e.carousel) == null ? void 0 : vt.infinite) === !0
                  }), {
                    addons: F(() => [
                      Se(h(cn)),
                      Se(h(vn))
                    ]),
                    default: F(() => [
                      (p(!0), w(q, null, he(Ze.value, (S, m) => (p(), M(h(ia), {
                        key: S,
                        index: m
                      }, {
                        default: F(() => [
                          pe("div", Kn, [
                            $(e.$slots, S)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (p(!0), w(q, null, he(s.value, (S, m) => (p(), M(h(ia), {
                        key: e.slide,
                        index: m
                      }, {
                        default: F(() => [
                          pe("div", Wn, [
                            Ue.value ? (p(), M(me(Ue.value), X({
                              key: 0,
                              ref_for: !0
                            }, {
                              item: S,
                              index: m,
                              editing: T.value,
                              perms: A.value,
                              data: Dt.value,
                              events: e.itemSlotEvents
                            }), null, 16)) : $(e.$slots, "item", ke({
                              key: 1,
                              [e.slotItemVar || ""]: S,
                              index: m,
                              editing: T.value,
                              canCreate: ve.value,
                              canRead: Re.value,
                              canUpdate: Z.value,
                              canDrop: G.value,
                              isLoading: g.value,
                              doDrop: () => Y(m)
                            }))
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128))
                    ]),
                    _: 3
                  }, 16, ["modelValue", "wrap-around"])
                ], 10, Yn)) : R("", !0)
              ], 512), [
                [ze, Ot.value]
              ]),
              !g.value && s.value.length === 0 ? (p(), w("div", Jn, [
                h(n).empty ? $(e.$slots, "empty", { key: 0 }) : Sa.value ? (p(), M(me(Ca.value), {
                  key: 1,
                  message: e.noResultsText
                }, null, 8, ["message"])) : e.noResultsText ? (p(), w(q, { key: 2 }, [
                  Ye(Ke(e.noResultsText), 1)
                ], 64)) : R("", !0)
              ])) : R("", !0),
              g.value ? (p(), M(fe, { key: 3 })) : R("", !0),
              dt.value || h(n).bottomButtons ? (p(), w("div", Qn, [
                dt.value && s.value.length >= e.requiredItemsForBottomCreate ? (p(), M(qt, {
                  key: 0,
                  config: j.value,
                  disabled: !Ut.value,
                  onClick: Pe,
                  onAppend: u
                }, null, 8, ["config", "disabled"])) : R("", !0),
                $(e.$slots, "bottom-buttons")
              ])) : R("", !0),
              e.paginator && Object.keys(e.paginator).length > 0 ? (p(), M(Tt, X({
                key: 5,
                ref_key: "paginatorRef",
                ref: Qe
              }, e.paginator, {
                modelValue: c.value,
                "onUpdate:modelValue": f[3] || (f[3] = (S) => c.value = S),
                onLoading: Oe,
                onPerms: te,
                onResponse: Rt
              }), null, 16, ["modelValue"])) : R("", !0),
              h(n)["web-element-actions"] ? $(e.$slots, "web-element-actions", { key: 6 }) : R("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, Rn);
    };
  }
}), il = {
  install: (t) => {
    t.component("lkt-table") === void 0 && t.component("lkt-table", Zn);
  }
}, rl = (t) => (ge.navButtonSlot = t, !0), ul = (t) => (ge.createButtonSlot = t, !0), sl = (t) => {
  ge.defaultEmptySlot = t;
};
export {
  vl as Column,
  fl as createColumn,
  il as default,
  fn as defaultTableSorter,
  ul as setTableCreateButtonSlot,
  sl as setTableEmptySlot,
  rl as setTableNavButtonSlot
};
