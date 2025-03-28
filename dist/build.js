import { defineComponent as ae, computed as u, ref as S, shallowReactive as Pt, watch as U, watchEffect as Lt, onMounted as jt, onBeforeUnmount as Ca, reactive as _t, provide as ta, h as X, useId as wa, inject as ut, getCurrentInstance as Ba, onUnmounted as Da, onUpdated as Ia, cloneVNode as Ta, resolveComponent as Se, createBlock as O, createElementBlock as h, unref as D, openBlock as v, normalizeProps as Re, mergeProps as fe, withCtx as j, createTextVNode as lt, toDisplayString as ze, Fragment as W, withModifiers as aa, createCommentVNode as V, resolveDynamicComponent as Ae, useSlots as la, normalizeClass as oe, createElementVNode as J, createVNode as Ee, renderSlot as H, renderList as ue, withDirectives as tt, vShow as at, mergeDefaults as Ea, nextTick as yt, createSlots as Yt } from "vue";
import { __ as Aa } from "lkt-i18n";
import { SortDirection as je, Column as na, extractPropValue as Va, ColumnType as kt, prepareResourceData as oa, TableRowType as Ze, extractI18nValue as ia, LktSettings as ke, ensureButtonConfig as Ve, TablePermission as De, PaginatorType as St, TableType as et, getDefaultValues as Ra, Table as Na, ButtonType as $t } from "lkt-vue-kernel";
import { Column as fn, createColumn as pn } from "lkt-vue-kernel";
import { replaceAll as ra, generateRandomString as Ma } from "lkt-string-tools";
import { DataState as La } from "lkt-data-state";
import _a from "sortablejs";
import { time as $a } from "lkt-date-tools";
/**
 * Vue 3 Carousel 0.14.0
 * (c) 2025
 * @license MIT
 */
const ua = ["viewport", "carousel"], wt = {
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
], Oa = {
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
], F = {
  autoplay: 0,
  breakpointMode: ua[0],
  breakpoints: void 0,
  dir: sa[0],
  enabled: !0,
  gap: 0,
  height: "auto",
  i18n: Oa,
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
}, He = Symbol("carousel"), Pa = (e) => {
  const i = Pt([]), r = (n) => {
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
function Ua(e) {
  return e.length === 0 ? 0 : e.reduce((r, n) => r + n, 0) / e.length;
}
function Kt({ slides: e, position: i, toShow: r }) {
  const n = [], l = i === "before", a = l ? -r : 0, f = l ? 0 : r;
  if (e.length <= 0)
    return n;
  for (let g = a; g < f; g++) {
    const C = {
      index: l ? g : g + e.length,
      isClone: !0,
      position: i,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${i}-${g}`
    }, o = e[(g % e.length + e.length) % e.length].vnode, I = Ta(o, C);
    I.el = null, n.push(I);
  }
  return n;
}
const Fa = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function Wt(e) {
  if (!e.el || !(e.el instanceof Element))
    return;
  const i = e.el.querySelectorAll(Fa);
  for (const r of i)
    r instanceof HTMLElement && !r.hasAttribute("disabled") && r.getAttribute("aria-hidden") !== "true" && r.setAttribute("tabindex", "-1");
}
function ja(e, i) {
  return Object.keys(e).filter((r) => !i.includes(r)).reduce((r, n) => (r[n] = e[n], r), {});
}
function za(e) {
  const { isVertical: i, isReversed: r, dragged: n, effectiveSlideSize: l } = e, a = i ? n.y : n.x;
  if (a === 0)
    return 0;
  const f = Math.round(a / l);
  return r ? f : -f;
}
function Ie({ val: e, max: i, min: r }) {
  return i < r ? e : Math.min(Math.max(e, isNaN(r) ? e : r), isNaN(i) ? e : i);
}
function Ha(e) {
  const { transform: i } = window.getComputedStyle(e);
  return i.split(/[(,)]/).slice(1, -1).map((r) => parseFloat(r));
}
function qa(e) {
  let i = 1, r = 1;
  return e.forEach((n) => {
    const l = Ha(n);
    l.length === 6 && (i /= l[0], r /= l[3]);
  }), { widthMultiplier: i, heightMultiplier: r };
}
function Ga(e, i) {
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
function Xa(e, i, r) {
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
function Ut({ slideSize: e, viewportSize: i, align: r, itemsToShow: n }) {
  return n !== void 0 ? Ga(r, n) : e !== void 0 && i !== void 0 ? Xa(r, e, i) : 0;
}
function va(e = "", i = {}) {
  return Object.entries(i).reduce((r, [n, l]) => r.replace(`{${n}}`, String(l)), e);
}
function fa({ val: e, max: i, min: r = 0 }) {
  const n = i - r + 1;
  return ((e - r) % n + n) % n + r;
}
function Ot(e, i = 0) {
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
function Ct(e, i = "px") {
  if (!(e == null || e === ""))
    return typeof e == "number" || parseFloat(e).toString() === e ? `${e}${i}` : e;
}
const Ya = ae({
  name: "CarouselAria",
  setup() {
    const e = ut(He);
    return e ? () => X("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, va(e.config.i18n.itemXofY, {
      currentSlide: e.currentSlide + 1,
      slidesCount: e.slidesCount
    })) : () => "";
  }
}), Ka = {
  // time to auto advance slides in ms
  autoplay: {
    default: F.autoplay,
    type: Number
  },
  // an object to store breakpoints
  breakpoints: {
    default: F.breakpoints,
    type: Object
  },
  // controls the breakpoint mode relative to the carousel container or the viewport
  breakpointMode: {
    default: F.breakpointMode,
    validator(e) {
      return ua.includes(e);
    }
  },
  // enable/disable the carousel component
  enabled: {
    default: F.enabled,
    type: Boolean
  },
  // control the gap between slides
  gap: {
    default: F.gap,
    type: Number
  },
  // control the gap between slides
  height: {
    default: F.height,
    type: [Number, String]
  },
  ignoreAnimations: {
    default: !1,
    type: [Array, Boolean, String]
  },
  // count of items to be scrolled
  itemsToScroll: {
    default: F.itemsToScroll,
    type: Number
  },
  // count of items to showed per view
  itemsToShow: {
    default: F.itemsToShow,
    type: [Number, String]
  },
  // aria-labels and additional text labels
  i18n: {
    default: F.i18n,
    type: Object
  },
  // slide number number of initial slide
  modelValue: {
    default: void 0,
    type: Number
  },
  // toggle mouse dragging.
  mouseDrag: {
    default: F.mouseDrag,
    type: Boolean
  },
  // toggle mouse dragging.
  touchDrag: {
    default: F.touchDrag,
    type: Boolean
  },
  pauseAutoplayOnHover: {
    default: F.pauseAutoplayOnHover,
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
    default: F.snapAlign,
    validator(e) {
      return ca.includes(e);
    }
  },
  slideEffect: {
    type: String,
    default: F.slideEffect,
    validator(e) {
      return da.includes(e);
    }
  },
  // sliding transition time in ms
  transition: {
    default: F.transition,
    type: Number
  },
  // control the gap between slides
  dir: {
    type: String,
    default: F.dir,
    validator(e, i) {
      if (!sa.includes(e))
        return !1;
      const r = e in wt ? wt[e] : e;
      return ["ttb", "btt"].includes(r) && (!i.height || i.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${e}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: F.wrapAround,
    type: Boolean
  }
}, Wa = ae({
  name: "VueCarousel",
  props: Ka,
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
    const a = Pa(r), f = a.getSlides(), g = u(() => f.length), m = S(null), C = S(null), o = S(0), I = u(() => Object.assign(Object.assign(Object.assign({}, F), ja(e, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, F.i18n), e.i18n) })), c = Pt(Object.assign({}, I.value)), k = S((l = e.modelValue) !== null && l !== void 0 ? l : 0), T = S(k.value);
    U(k, (s) => T.value = s);
    const A = S(0), Ce = u(() => Math.ceil((g.value - 1) / 2)), $ = u(() => g.value - 1), Q = u(() => 0);
    let q = null, Ne = null, Z = null;
    const d = u(() => o.value + c.gap), w = u(() => {
      const s = c.dir || "ltr";
      return s in wt ? wt[s] : s;
    }), le = u(() => ["rtl", "btt"].includes(w.value)), P = u(() => ["ttb", "btt"].includes(w.value)), x = u(() => c.itemsToShow === "auto"), _ = u(() => P.value ? "height" : "width");
    function we() {
      var s;
      if (!Ge.value)
        return;
      const b = (I.value.breakpointMode === "carousel" ? (s = m.value) === null || s === void 0 ? void 0 : s.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, y = Object.keys(e.breakpoints || {}).map((R) => Number(R)).sort((R, G) => +G - +R), B = {};
      y.some((R) => b >= R ? (Object.assign(B, e.breakpoints[R]), B.i18n && Object.assign(B.i18n, I.value.i18n, e.breakpoints[R].i18n), !0) : !1), Object.assign(c, I.value, B);
    }
    const st = Ot(() => {
      we(), se(), pe();
    }), Me = Pt(/* @__PURE__ */ new Set()), z = S([]);
    function Bt({ widthMultiplier: s, heightMultiplier: b }) {
      z.value = f.map((y) => {
        var B;
        const R = (B = y.exposed) === null || B === void 0 ? void 0 : B.getBoundingRect();
        return {
          width: R.width * s,
          height: R.height * b
        };
      });
    }
    const Le = S({
      width: 0,
      height: 0
    });
    function Dt({ widthMultiplier: s, heightMultiplier: b }) {
      var y;
      const B = ((y = C.value) === null || y === void 0 ? void 0 : y.getBoundingClientRect()) || { width: 0, height: 0 };
      Le.value = {
        width: B.width * s,
        height: B.height * b
      };
    }
    function pe() {
      if (!C.value)
        return;
      const s = qa(Me);
      if (Dt(s), Bt(s), x.value)
        o.value = Ua(z.value.map((b) => b[_.value]));
      else {
        const b = Number(c.itemsToShow), y = (b - 1) * c.gap;
        o.value = (Le.value[_.value] - y) / b;
      }
    }
    function se() {
      !c.wrapAround && g.value > 0 && (k.value = Ie({
        val: k.value,
        max: $.value,
        min: Q.value
      })), x.value || (c.itemsToShow = Ie({
        val: Number(c.itemsToShow),
        max: g.value,
        min: 1
      }));
    }
    const _e = u(() => typeof e.ignoreAnimations == "string" ? e.ignoreAnimations.split(",") : Array.isArray(e.ignoreAnimations) ? e.ignoreAnimations : e.ignoreAnimations ? !1 : []);
    Lt(() => se()), Lt(() => {
      pe();
    });
    let de;
    const qe = (s) => {
      const b = s.target;
      if (!(!(b != null && b.contains(m.value)) || Array.isArray(_e.value) && _e.value.includes(s.animationName)) && (Me.add(b), !de)) {
        const y = () => {
          de = requestAnimationFrame(() => {
            pe(), y();
          });
        };
        y();
      }
    }, dt = (s) => {
      const b = s.target;
      b && Me.delete(b), de && Me.size === 0 && (cancelAnimationFrame(de), pe());
    }, Ge = S(!1);
    typeof document < "u" && Lt(() => {
      Ge.value && _e.value !== !1 ? (document.addEventListener("animationstart", qe), document.addEventListener("animationend", dt)) : (document.removeEventListener("animationstart", qe), document.removeEventListener("animationend", dt));
    }), jt(() => {
      Ge.value = !0, we(), ge(), m.value && (Z = new ResizeObserver(st), Z.observe(m.value)), r("init");
    }), Ca(() => {
      Ge.value = !1, a.cleanup(), Ne && clearTimeout(Ne), de && cancelAnimationFrame(de), q && clearInterval(q), Z && (Z.disconnect(), Z = null), typeof document < "u" && vt(), m.value && (m.value.removeEventListener("transitionend", pe), m.value.removeEventListener("animationiteration", pe));
    });
    let me = !1;
    const Xe = { x: 0, y: 0 }, ie = _t({ x: 0, y: 0 }), Ye = S(!1), Ke = S(!1), It = () => {
      Ye.value = !0;
    }, ot = () => {
      Ye.value = !1;
    }, ct = Ot((s) => {
      if (!s.ctrlKey)
        switch (s.key) {
          case "ArrowLeft":
          case "ArrowUp":
            P.value === s.key.endsWith("Up") && (le.value ? Pe(!0) : Ue(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            P.value === s.key.endsWith("Down") && (le.value ? Ue(!0) : Pe(!0));
            break;
        }
    }, 200), Tt = () => {
      document.addEventListener("keydown", ct);
    }, vt = () => {
      document.removeEventListener("keydown", ct);
    };
    function ft(s) {
      const b = s.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(b) || be.value || (me = s.type === "touchstart", !me && (s.preventDefault(), s.button !== 0)))
        return;
      Xe.x = "touches" in s ? s.touches[0].clientX : s.clientX, Xe.y = "touches" in s ? s.touches[0].clientY : s.clientY;
      const y = me ? "touchmove" : "mousemove", B = me ? "touchend" : "mouseup";
      document.addEventListener(y, $e, { passive: !1 }), document.addEventListener(B, We, { passive: !0 });
    }
    const $e = Ot((s) => {
      Ke.value = !0;
      const b = "touches" in s ? s.touches[0].clientX : s.clientX, y = "touches" in s ? s.touches[0].clientY : s.clientY;
      ie.x = b - Xe.x, ie.y = y - Xe.y;
      const B = za({
        isVertical: P.value,
        isReversed: le.value,
        dragged: ie,
        effectiveSlideSize: d.value
      });
      T.value = c.wrapAround ? k.value + B : Ie({
        val: k.value + B,
        max: $.value,
        min: Q.value
      }), r("drag", { deltaX: ie.x, deltaY: ie.y });
    });
    function We() {
      if ($e.cancel(), T.value !== k.value && !me) {
        const y = (B) => {
          B.preventDefault(), window.removeEventListener("click", y);
        };
        window.addEventListener("click", y);
      }
      Be(T.value), ie.x = 0, ie.y = 0, Ke.value = !1;
      const s = me ? "touchmove" : "mousemove", b = me ? "touchend" : "mouseup";
      document.removeEventListener(s, $e), document.removeEventListener(b, We);
    }
    function ge() {
      !c.autoplay || c.autoplay <= 0 || (q = setInterval(() => {
        c.pauseAutoplayOnHover && Ye.value || Pe();
      }, c.autoplay));
    }
    function Oe() {
      q && (clearInterval(q), q = null);
    }
    function ce() {
      Oe(), ge();
    }
    const be = S(!1);
    function Be(s, b = !1) {
      if (!b && be.value)
        return;
      let y = s, B = s;
      A.value = k.value, c.wrapAround ? B = fa({
        val: y,
        max: $.value,
        min: Q.value
      }) : y = Ie({
        val: y,
        max: $.value,
        min: Q.value
      }), r("slide-start", {
        slidingToIndex: s,
        currentSlideIndex: k.value,
        prevSlideIndex: A.value,
        slidesCount: g.value
      }), Oe(), be.value = !0, k.value = y, B !== y && he.pause(), r("update:modelValue", B), Ne = setTimeout(() => {
        c.wrapAround && B !== y && (he.resume(), k.value = B, r("loop", {
          currentSlideIndex: k.value,
          slidingToIndex: s
        })), r("slide-end", {
          currentSlideIndex: k.value,
          prevSlideIndex: A.value,
          slidesCount: g.value
        }), be.value = !1, ce();
      }, c.transition);
    }
    function Pe(s = !1) {
      Be(k.value + c.itemsToScroll, s);
    }
    function Ue(s = !1) {
      Be(k.value - c.itemsToScroll, s);
    }
    function pt() {
      we(), se(), pe(), ce();
    }
    U(() => [I.value, e.breakpoints], () => we(), { deep: !0 }), U(() => e.autoplay, () => ce());
    const he = U(() => e.modelValue, (s) => {
      s !== k.value && Be(Number(s), !0);
    });
    r("before-init");
    const Fe = u(() => {
      if (!c.wrapAround)
        return { before: 0, after: 0 };
      if (x.value)
        return { before: f.length, after: f.length };
      const s = Number(c.itemsToShow), b = Math.ceil(s + (c.itemsToScroll - 1)), y = b - T.value, B = b - (g.value - (T.value + 1));
      return {
        before: Math.max(0, y),
        after: Math.max(0, B)
      };
    }), xe = u(() => Fe.value.before ? x.value ? z.value.slice(-1 * Fe.value.before).reduce((s, b) => s + b[_.value] + c.gap, 0) * -1 : Fe.value.before * d.value * -1 : 0), it = u(() => {
      var s;
      if (x.value) {
        const b = (k.value % f.length + f.length) % f.length;
        return Ut({
          slideSize: (s = z.value[b]) === null || s === void 0 ? void 0 : s[_.value],
          viewportSize: Le.value[_.value],
          align: c.snapAlign
        });
      }
      return Ut({
        align: c.snapAlign,
        itemsToShow: +c.itemsToShow
      });
    }), Je = u(() => {
      let s = 0;
      if (x.value) {
        if (k.value < 0 ? s = z.value.slice(k.value).reduce((b, y) => b + y[_.value] + c.gap, 0) * -1 : s = z.value.slice(0, k.value).reduce((b, y) => b + y[_.value] + c.gap, 0), s -= it.value, !c.wrapAround) {
          const b = z.value.reduce((y, B) => y + B[_.value] + c.gap, 0) - Le.value[_.value] - c.gap;
          s = Ie({
            val: s,
            max: b,
            min: 0
          });
        }
      } else {
        let b = k.value - it.value;
        c.wrapAround || (b = Ie({
          val: b,
          max: g.value - +c.itemsToShow,
          min: 0
        })), s = b * d.value;
      }
      return s * (le.value ? 1 : -1);
    }), ve = u(() => {
      var s, b;
      if (!x.value) {
        const R = k.value - it.value;
        return c.wrapAround ? {
          min: Math.floor(R),
          max: Math.ceil(R + Number(c.itemsToShow) - 1)
        } : {
          min: Math.floor(Ie({
            val: R,
            max: g.value - Number(c.itemsToShow),
            min: 0
          })),
          max: Math.ceil(Ie({
            val: R + Number(c.itemsToShow) - 1,
            max: g.value - 1,
            min: 0
          }))
        };
      }
      let y = 0;
      {
        let R = 0, G = 0 - Fe.value.before;
        const ee = Math.abs(Je.value + xe.value);
        for (; R <= ee; ) {
          const ne = (G % f.length + f.length) % f.length;
          R += ((s = z.value[ne]) === null || s === void 0 ? void 0 : s[_.value]) + c.gap, G++;
        }
        y = G - 1;
      }
      let B = 0;
      {
        let R = y, G = 0;
        for (R < 0 ? G = z.value.slice(0, R).reduce((ee, ne) => ee + ne[_.value] + c.gap, 0) - Math.abs(Je.value + xe.value) : G = z.value.slice(0, R).reduce((ee, ne) => ee + ne[_.value] + c.gap, 0) - Math.abs(Je.value); G < Le.value[_.value]; ) {
          const ee = (R % f.length + f.length) % f.length;
          G += ((b = z.value[ee]) === null || b === void 0 ? void 0 : b[_.value]) + c.gap, R++;
        }
        B = R - 1;
      }
      return {
        min: Math.floor(y),
        max: Math.ceil(B)
      };
    }), Et = u(() => {
      if (c.slideEffect === "fade")
        return;
      const s = P.value ? "Y" : "X", b = P.value ? ie.y : ie.x;
      let y = Je.value + b;
      if (!c.wrapAround && c.preventExcessiveDragging) {
        let B = 0;
        x.value ? B = z.value.reduce((ee, ne) => ee + ne[_.value], 0) : B = (g.value - Number(c.itemsToShow)) * d.value;
        const R = le.value ? 0 : -1 * B, G = le.value ? B : 0;
        y = Ie({
          val: y,
          min: R,
          max: G
        });
      }
      return `translate${s}(${y}px)`;
    }), At = u(() => ({
      "--vc-transition-duration": be.value ? Ct(c.transition, "ms") : void 0,
      "--vc-slide-gap": Ct(c.gap),
      "--vc-carousel-height": Ct(c.height),
      "--vc-cloned-offset": Ct(xe.value)
    })), rt = { slideTo: Be, next: Pe, prev: Ue }, mt = _t({
      activeSlide: T,
      config: c,
      currentSlide: k,
      isSliding: be,
      isVertical: P,
      maxSlide: $,
      minSlide: Q,
      nav: rt,
      normalizedDir: w,
      slideRegistry: a,
      slideSize: o,
      slides: f,
      slidesCount: g,
      viewport: C,
      visibleRange: ve
    });
    ta(He, mt);
    const Qe = _t({
      config: c,
      currentSlide: k,
      maxSlide: $,
      middleSlide: Ce,
      minSlide: Q,
      slideSize: o,
      slidesCount: g
    });
    return n({
      data: Qe,
      nav: rt,
      next: Pe,
      prev: Ue,
      restartCarousel: pt,
      slideTo: Be,
      updateBreakpointsConfig: we,
      updateSlideSize: pe,
      updateSlidesData: se
    }), () => {
      var s;
      const b = i.default || i.slides, y = (b == null ? void 0 : b(Qe)) || [], { before: B, after: R } = Fe.value, G = Kt({
        slides: f,
        position: "before",
        toShow: B
      }), ee = Kt({
        slides: f,
        position: "after",
        toShow: R
      }), ne = [...G, ...y, ...ee];
      if (!c.enabled || !ne.length)
        return X("section", {
          ref: m,
          class: ["carousel", "is-disabled"]
        }, ne);
      const gt = ((s = i.addons) === null || s === void 0 ? void 0 : s.call(i, Qe)) || [], Vt = X("ol", {
        class: "carousel__track",
        style: { transform: Et.value },
        onMousedownCapture: c.mouseDrag ? ft : null,
        onTouchstartPassiveCapture: c.touchDrag ? ft : null
      }, ne), Rt = X("div", { class: "carousel__viewport", ref: C }, Vt);
      return X("section", {
        ref: m,
        class: [
          "carousel",
          `is-${w.value}`,
          `is-effect-${c.slideEffect}`,
          {
            "is-vertical": P.value,
            "is-sliding": be.value,
            "is-dragging": Ke.value,
            "is-hover": Ye.value
          }
        ],
        dir: w.value,
        style: At.value,
        "aria-label": c.i18n.ariaGallery,
        tabindex: "0",
        onFocus: Tt,
        onBlur: vt,
        onMouseenter: It,
        onMouseleave: ot
      }, [Rt, gt, X(Ya)]);
    };
  }
});
var Ft;
(function(e) {
  e.arrowDown = "arrowDown", e.arrowLeft = "arrowLeft", e.arrowRight = "arrowRight", e.arrowUp = "arrowUp";
})(Ft || (Ft = {}));
const xt = (e) => `icon${e.charAt(0).toUpperCase() + e.slice(1)}`, xa = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function Ja(e) {
  return e in Ft;
}
const Jt = (e) => e && Ja(e), Qt = ae({
  props: {
    name: {
      type: String,
      required: !0,
      validator: Jt
    },
    title: {
      type: String,
      default: (e) => e.name ? F.i18n[xt(e.name)] : ""
    }
  },
  setup(e) {
    const i = ut(He, null);
    return () => {
      const r = e.name;
      if (!r || !Jt(r))
        return;
      const n = xa[r], l = X("path", { d: n }), a = (i == null ? void 0 : i.config.i18n[xt(r)]) || e.title, f = X("title", a);
      return X("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": a
      }, [f, l]);
    };
  }
}), Qa = ae({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(e, { slots: i, attrs: r }) {
    const n = ut(He);
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
    })[n.normalizedDir], m = u(() => !n.config.wrapAround && n.currentSlide <= n.minSlide), C = u(() => !n.config.wrapAround && n.currentSlide >= n.maxSlide);
    return () => {
      const { i18n: o } = n.config, I = X("button", Object.assign(Object.assign({ type: "button", disabled: m.value, "aria-label": o.ariaPreviousSlide, title: o.ariaPreviousSlide, onClick: n.nav.prev }, r), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": m.value },
        r.class
      ] }), (a == null ? void 0 : a()) || X(Qt, { name: f() })), c = X("button", Object.assign(Object.assign({ type: "button", disabled: C.value, "aria-label": o.ariaNextSlide, title: o.ariaNextSlide, onClick: n.nav.next }, r), { class: [
        "carousel__next",
        { "carousel__next--disabled": C.value },
        r.class
      ] }), (l == null ? void 0 : l()) || X(Qt, { name: g() }));
      return [I, c];
    };
  }
}), Za = ae({
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
    const i = ut(He);
    if (!i)
      return () => "";
    const r = u(() => i.config.itemsToShow), n = u(() => Ut({
      align: i.config.snapAlign,
      itemsToShow: r.value
    })), l = u(() => e.paginateByItemsToShow && r.value > 1), a = u(() => Math.ceil((i.activeSlide - n.value) / r.value)), f = u(() => Math.ceil(i.slidesCount / r.value)), g = (m) => fa(l.value ? {
      val: a.value,
      max: f.value - 1,
      min: 0
    } : {
      val: i.activeSlide,
      max: i.maxSlide,
      min: i.minSlide
    }) === m;
    return () => {
      var m, C;
      const o = [];
      for (let I = l.value ? 0 : i.minSlide; I <= (l.value ? f.value - 1 : i.maxSlide); I++) {
        const c = va(i.config.i18n[l.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: I + 1
        }), k = g(I), T = X("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": k
          },
          "aria-label": c,
          "aria-pressed": k,
          "aria-controls": (C = (m = i.slides[I]) === null || m === void 0 ? void 0 : m.exposed) === null || C === void 0 ? void 0 : C.id,
          title: c,
          disabled: e.disableOnClick,
          onClick: () => i.nav.slideTo(l.value ? Math.floor(I * +i.config.itemsToShow + n.value) : I)
        }), A = X("li", { class: "carousel__pagination-item", key: I }, T);
        o.push(A);
      }
      return X("ol", { class: "carousel__pagination" }, o);
    };
  }
}), Zt = ae({
  name: "CarouselSlide",
  props: {
    id: {
      type: String,
      default: (e) => e.isClone ? void 0 : wa()
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
    const l = ut(He);
    if (ta(He, void 0), !l)
      return () => "";
    const a = S(e.index), f = (T) => {
      a.value = T;
    }, g = Ba(), m = () => {
      const T = g.vnode.el;
      return T ? T.getBoundingClientRect() : { width: 0, height: 0 };
    };
    n({
      id: e.id,
      setIndex: f,
      getBoundingRect: m
    });
    const C = u(() => a.value === l.activeSlide), o = u(() => a.value === l.activeSlide - 1), I = u(() => a.value === l.activeSlide + 1), c = u(() => a.value >= l.visibleRange.min && a.value <= l.visibleRange.max), k = u(() => {
      if (l.config.itemsToShow === "auto")
        return;
      const T = l.config.itemsToShow, A = l.config.gap > 0 && T > 1 ? `calc(${100 / T}% - ${l.config.gap * (T - 1) / T}px)` : `${100 / T}%`;
      return l.isVertical ? { height: A } : { width: A };
    });
    return l.slideRegistry.registerSlide(g, e.index), Da(() => {
      l.slideRegistry.unregisterSlide(g);
    }), e.isClone && (jt(() => {
      Wt(g.vnode);
    }), Ia(() => {
      Wt(g.vnode);
    })), () => {
      var T, A;
      return l.config.enabled ? X("li", {
        style: [i.style, Object.assign({}, k.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": e.isClone,
          "carousel__slide--visible": c.value,
          "carousel__slide--active": C.value,
          "carousel__slide--prev": o.value,
          "carousel__slide--next": I.value,
          "carousel__slide--sliding": l.isSliding
        },
        onFocusin: () => {
          l.viewport && (l.viewport.scrollLeft = 0), l.nav.slideTo(a.value);
        },
        id: e.isClone ? void 0 : e.id,
        "aria-hidden": e.isClone || void 0
      }, (A = r.default) === null || A === void 0 ? void 0 : A.call(r, {
        currentIndex: a.value,
        isActive: C.value,
        isClone: e.isClone,
        isPrev: o.value,
        isNext: I.value,
        isSliding: l.isSliding,
        isVisible: c.value
      })) : (T = r.default) === null || T === void 0 ? void 0 : T.call(r);
    };
  }
}), el = (e, i, r, n) => {
  if (!r) return 0;
  let l = String(e[r.key]).toLowerCase(), a = String(i[r.key]).toLowerCase();
  if (n === je.Asc) {
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
    return l.startsWith("__:") ? Aa(l.substring(3)) : l;
  }
  return i[e.key];
}, tl = (e, i, r) => {
  if (!e.colspan) return -1;
  let n = i;
  return r.forEach((l) => {
    let a = zt(e, l);
    a > 0 && a < n && (n = a);
  }), n;
}, zt = (e, i) => e.colspan === !1 ? !1 : typeof e.colspan == "function" ? e.colspan(i) : e.colspan, al = (e, i) => typeof e.preferSlot > "u" ? !0 : e.preferSlot === !1 ? !1 : typeof e.preferSlot == "function" ? e.preferSlot(i) : !0, ll = (e, i, r) => {
  if (typeof e != "object" || !e.key || i.indexOf(e.key) > -1) return !1;
  let n = zt(e, r);
  return typeof e.colspan > "u" ? !0 : (typeof e.colspan < "u" && (typeof e.colspan == "function" ? n = parseInt(e.colspan(r)) : n = parseInt(e.colspan)), n > 0);
}, nl = (e = []) => {
  if (e.length > 0) {
    for (let i = 0; i < e.length; ++i)
      if (e[i].sortable) return e[i].key;
  }
  return "";
}, ol = (e, i) => {
  if (e.length > 0) {
    for (let r = 0; r < e.length; ++r)
      if (e[r].key === i) return e[r];
  }
  return null;
}, pa = (e) => e.type ? `is-${e.type}` : "", ma = /* @__PURE__ */ ae({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new na() },
    columns: { default: () => [] },
    i: { default: 0 },
    editModeEnabled: { type: Boolean, default: !1 },
    hasInlineEditPerm: { type: Boolean, default: !1 }
  },
  emits: [
    "update:modelValue"
  ],
  setup(e, { emit: i }) {
    const r = i, n = e, l = S(n.modelValue), a = S(l.value[n.column.key]), f = S(null);
    U(a, (o) => {
      const I = JSON.parse(JSON.stringify(l.value));
      I[n.column.key] = o, r("update:modelValue", I);
    }), U(() => n.modelValue, (o) => {
      l.value = o, a.value = l.value[n.column.key];
    });
    const g = u(() => ({ ...n.column.slotData, item: l.value })), m = u(() => {
      var o, I, c, k;
      if ((o = n.column.field) != null && o.modalData && typeof ((I = n.column.field) == null ? void 0 : I.modalData) == "object")
        for (let T in n.column.field.modalData)
          if (typeof ((c = n.column.field) == null ? void 0 : c.modalData[T]) == "string" && n.column.field.modalData[T].startsWith("prop:")) {
            let A = n.column.field.modalData[T].substring(5);
            l.value[A];
          } else
            n.column.field.modalData[T];
      return (k = n.column.field) == null ? void 0 : k.modalData;
    }), C = u(() => typeof n.column.field == "string" && n.column.field.startsWith("prop:") ? Va(n.column.field, l.value) : n.column.field);
    return (o, I) => {
      var A, Ce, $, Q;
      const c = Se("lkt-anchor"), k = Se("lkt-button"), T = Se("lkt-field");
      return o.column.type === D(kt).Anchor ? (v(), O(c, Re(fe({ key: 0 }, o.column.anchor)), {
        default: j(() => [
          lt(ze(D(nt)(o.column, l.value, o.i)), 1)
        ]),
        _: 1
      }, 16)) : o.column.type === D(kt).Button ? (v(), O(k, fe({ key: 1 }, o.column.button, { prop: l.value }), {
        default: j(() => [
          lt(ze(D(nt)(o.column, l.value, o.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : o.column.type === D(kt).Field && o.hasInlineEditPerm ? (v(), O(T, fe({ key: 2 }, C.value, {
        "read-mode": !o.column.editable || !o.editModeEnabled,
        ref: (q) => f.value = q,
        "slot-data": g.value,
        label: ((A = o.column.field) == null ? void 0 : A.type) === "switch" || ((Ce = o.column.field) == null ? void 0 : Ce.type) === "check" ? o.column.label : "",
        "modal-data": m.value,
        prop: l.value,
        modelValue: a.value,
        "onUpdate:modelValue": I[0] || (I[0] = (q) => a.value = q)
      }), null, 16, ["read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : o.column.type === D(kt).Field ? (v(), O(T, fe({ key: 3 }, C.value, {
        "read-mode": "",
        ref: (q) => f.value = q,
        "slot-data": g.value,
        label: (($ = o.column.field) == null ? void 0 : $.type) === "switch" || ((Q = o.column.field) == null ? void 0 : Q.type) === "check" ? o.column.label : "",
        "modal-data": m.value,
        prop: l.value,
        "model-value": a.value
      }), null, 16, ["slot-data", "label", "modal-data", "prop", "model-value"])) : (v(), h(W, { key: 4 }, [
        lt(ze(D(nt)(o.column, l.value, o.i, o.columns)), 1)
      ], 64));
    };
  }
}), Te = class Te {
};
Te.navButtonSlot = "", Te.dropButtonSlot = "", Te.editButtonSlot = "", Te.createButtonSlot = "", Te.defaultEmptySlot = void 0, Te.defaultSaveIcon = "", Te.defaultNoResultsMessage = "No results";
let Y = Te;
const il = /* @__PURE__ */ ae({
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
    const r = i, n = e, l = u(() => Y.dropButtonSlot !== ""), a = u(() => Y.dropButtonSlot), f = u(() => oa(n.config.resourceData, n.item));
    return (g, m) => {
      const C = Se("lkt-button");
      return v(), O(C, fe({ palette: "table-delete" }, n.config, {
        disabled: g.disabled,
        "resource-data": f.value,
        onClick: m[0] || (m[0] = aa((o) => r("click", o), ["prevent", "stop"]))
      }), {
        default: j(() => [
          l.value ? (v(), O(Ae(a.value), { key: 0 })) : V("", !0)
        ]),
        _: 1
      }, 16, ["disabled", "resource-data"]);
    };
  }
}), rl = /* @__PURE__ */ ae({
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
    const r = i, n = e, l = u(() => Y.editButtonSlot !== ""), a = u(() => Y.editButtonSlot), f = u(() => oa(n.config.resourceData, n.item));
    return (g, m) => {
      const C = Se("lkt-button");
      return v(), O(C, fe({ palette: "table-edit" }, n.config, {
        disabled: g.disabled,
        "resource-data": f.value,
        onClick: m[0] || (m[0] = aa((o) => r("click"), ["prevent", "stop"]))
      }), {
        default: j(() => [
          l.value ? (v(), O(Ae(a.value), { key: 0 })) : V("", !0)
        ]),
        _: 1
      }, 16, ["disabled", "resource-data"]);
    };
  }
}), ul = ["data-i", "data-draggable"], sl = ["data-role", "data-i"], dl = {
  key: 1,
  class: "lkt-table-nav-cell"
}, cl = { class: "lkt-table-nav-container" }, vl = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, fl = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, pl = ["colspan"], ml = ["colspan"], gl = ["data-column", "colspan", "title"], bl = {
  key: 6,
  class: "lkt-table-col-drop"
}, hl = {
  key: 7,
  class: "lkt-table-col-edit"
}, yl = /* @__PURE__ */ ae({
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
  setup(e, { emit: i }) {
    var Z;
    const r = la(), n = i, l = e, a = S(l.modelValue);
    let f = typeof l.rowDisplayType == "function" ? l.rowDisplayType(a.value, l.i) : l.rowDisplayType;
    f || (f = Ze.Auto);
    const g = [Ze.Auto, Ze.PreferCustomItem].includes(f), m = [Ze.Auto, Ze.PreferItem].includes(f), C = S((Z = l.editButton.anchor) == null ? void 0 : Z.to);
    for (let d in a.value) C.value = ra(C.value, ":" + d, a.value[d]);
    const o = (d) => n("click", d), I = (d, w) => {
      n("show", d, w);
    }, c = u(() => {
      let d = [], w = !1;
      return typeof l.disabledDrag == "function" ? w = l.disabledDrag(a.value) : w = q.value === !0, !w && l.sortable && l.isDraggable ? d.push("handle") : w && d.push("disabled"), d.join(" ");
    }), k = u(() => Y.navButtonSlot !== ""), T = u(() => Y.navButtonSlot), A = () => {
      n("item-up", l.i);
    }, Ce = () => {
      n("item-down", l.i);
    }, $ = () => {
      n("item-drop", l.i);
    };
    U(() => l.modelValue, (d) => a.value = d), U(a, (d) => {
      n("update:modelValue", d);
    }, { deep: !0 });
    const Q = u(() => typeof l.renderDrag == "function" ? l.renderDrag(a.value) : l.renderDrag === !0), q = u(() => typeof l.disabledDrag == "function" ? l.disabledDrag(a.value) : l.disabledDrag === !0), Ne = u(() => c.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator");
    return (d, w) => {
      const le = Se("lkt-button");
      return v(), h("tr", {
        "data-i": d.i,
        "data-draggable": d.isDraggable,
        class: oe({ "type-custom-item": D(g), "type-item": D(m) })
      }, [
        d.sortable && d.editModeEnabled && Q.value ? (v(), h("td", {
          key: 0,
          "data-role": Ne.value,
          class: oe(c.value),
          "data-i": d.i
        }, w[3] || (w[3] = [
          J("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]), 10, sl)) : V("", !0),
        d.addNavigation && d.editModeEnabled ? (v(), h("td", dl, [
          J("div", cl, [
            Ee(le, {
              palette: "table-nav",
              disabled: d.i === 0,
              onClick: A
            }, {
              default: j(() => [
                k.value ? (v(), O(Ae(T.value), {
                  key: 0,
                  direction: "up"
                })) : (v(), h("i", vl))
              ]),
              _: 1
            }, 8, ["disabled"]),
            Ee(le, {
              palette: "table-nav",
              disabled: d.latestRow,
              onClick: Ce
            }, {
              default: j(() => [
                k.value ? (v(), O(Ae(T.value), {
                  key: 0,
                  direction: "down"
                })) : (v(), h("i", fl))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : V("", !0),
        d.displayHiddenColumnsIndicator ? (v(), h("td", {
          key: 2,
          onClick: w[0] || (w[0] = (P) => I(P, d.i)),
          "data-role": "show-more",
          class: oe(d.hiddenIsVisible ? "state-open" : "")
        }, null, 2)) : V("", !0),
        D(g) && D(r)[`item-${d.i}`] ? (v(), h("td", {
          key: "td" + d.i,
          colspan: d.visibleColumns.length
        }, [
          H(d.$slots, `item-${d.i}`, {
            item: a.value,
            index: d.i,
            editing: d.editModeEnabled,
            canCreate: d.canCreate,
            canRead: d.canRead,
            canUpdate: d.canEdit,
            canDrop: d.canDrop,
            isLoading: d.isLoading,
            doDrop: () => $()
          })
        ], 8, pl)) : D(m) && D(r).item ? (v(), h("td", {
          key: "td" + d.i,
          colspan: d.visibleColumns.length
        }, [
          H(d.$slots, "item", {
            item: a.value,
            index: d.i,
            editing: d.editModeEnabled,
            canCreate: d.canCreate,
            canRead: d.canRead,
            canUpdate: d.canEdit,
            canDrop: d.canDrop,
            isLoading: d.isLoading,
            doDrop: () => $()
          })
        ], 8, ml)) : (v(!0), h(W, { key: 5 }, ue(d.visibleColumns, (P) => (v(), h(W, null, [
          D(ll)(P, d.emptyColumns, a.value) ? (v(), h("td", {
            key: "td" + d.i,
            "data-column": P.key,
            colspan: D(zt)(P, a.value),
            title: D(nt)(P, a.value, d.i, d.visibleColumns),
            class: oe(D(pa)(P)),
            onClick: w[2] || (w[2] = (x) => o(x))
          }, [
            d.$slots[P.key] && D(al)(P, a.value) ? H(d.$slots, P.key, {
              key: 0,
              value: a.value[P.key],
              item: a.value,
              column: P,
              i: d.i
            }) : a.value ? (v(), O(ma, {
              key: 1,
              modelValue: a.value,
              "onUpdate:modelValue": w[1] || (w[1] = (x) => a.value = x),
              column: P,
              columns: d.visibleColumns,
              "edit-mode-enabled": d.editModeEnabled,
              "has-inline-edit-perm": d.hasInlineEditPerm,
              i: d.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : V("", !0)
          ], 10, gl)) : V("", !0)
        ], 64))), 256)),
        d.canDrop && d.editModeEnabled ? (v(), h("td", bl, [
          Ee(il, {
            config: d.dropButton,
            item: a.value,
            onClick: $
          }, null, 8, ["config", "item"])
        ])) : V("", !0),
        d.canEdit && d.editModeEnabled ? (v(), h("td", hl, [
          Ee(rl, {
            config: d.editButton,
            item: a.value
          }, null, 8, ["config", "item"])
        ])) : V("", !0)
      ], 10, ul);
    };
  }
}), kl = { "data-role": "hidden-row" }, Sl = ["colspan"], Cl = ["data-column"], wl = ["data-i"], Bl = ["data-column", "title"], Dl = /* @__PURE__ */ ae({
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
    const r = i, n = e, l = S(n.modelValue), a = (f) => r("click", f);
    return U(() => n.modelValue, (f) => l.value = f), U(l, () => r("update:modelValue", l.value)), (f, g) => tt((v(), h("tr", kl, [
      J("td", { colspan: f.hiddenColumnsColSpan }, [
        J("table", null, [
          J("tr", null, [
            (v(!0), h(W, null, ue(f.hiddenColumns, (m) => (v(), h("th", {
              "data-column": m.key
            }, [
              J("div", null, ze(m.label), 1)
            ], 8, Cl))), 256))
          ]),
          J("tr", { "data-i": f.i }, [
            (v(!0), h(W, null, ue(f.hiddenColumns, (m, C) => (v(), h("td", {
              "data-column": m.key,
              title: D(nt)(m, l.value, C, f.hiddenColumns),
              onClick: g[1] || (g[1] = (o) => a(o))
            }, [
              f.$slots[m.key] ? H(f.$slots, m.key, {
                key: 0,
                value: l.value[m.key],
                item: l.value,
                column: m,
                i: C
              }) : (v(), O(ma, {
                key: 1,
                column: m,
                columns: f.hiddenColumns,
                modelValue: l.value,
                "onUpdate:modelValue": g[0] || (g[0] = (o) => l.value = o),
                i: C,
                "edit-mode-enabled": f.editModeEnabled,
                "has-inline-edit-perm": f.hasInlineEditPerm
              }, null, 8, ["column", "columns", "modelValue", "i", "edit-mode-enabled", "has-inline-edit-perm"]))
            ], 8, Bl))), 256))
          ], 8, wl)
        ])
      ], 8, Sl)
    ], 512)), [
      [at, f.hiddenIsVisible]
    ]);
  }
}), ea = /* @__PURE__ */ ae({
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
    var C;
    const r = i, n = e, l = u(() => Y.createButtonSlot !== ""), a = u(() => Y.createButtonSlot), f = {
      ...(C = n.config) == null ? void 0 : C.modalData,
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
    return (o, I) => {
      const c = Se("lkt-button");
      return v(), O(c, fe(g, {
        disabled: o.disabled,
        onClick: m
      }), {
        default: j(() => [
          l.value ? (v(), O(Ae(a.value), { key: 0 })) : V("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), Il = ["data-column", "data-sortable", "data-sort", "colspan", "title"], Tl = /* @__PURE__ */ ae({
  __name: "TableHeader",
  props: {
    column: { default: () => new na() },
    sortBy: { default: "" },
    sortDirection: { default: "" },
    amountOfColumns: { default: 0 },
    items: { default: () => [] }
  },
  emits: [
    "click"
  ],
  setup(e, { emit: i }) {
    const r = i, n = e, l = u(() => tl(n.column, n.amountOfColumns, n.items)), a = u(() => n.column.sortable === !0), f = u(() => a.value && n.sortBy === n.column.key ? n.sortDirection : ""), g = u(() => ia(n.column.label)), m = u(() => a.value && n.sortBy === n.column.key ? n.sortDirection === je.Asc ? ke.defaultTableSortAscIcon : n.sortDirection === je.Desc ? ke.defaultTableSortDescIcon : "" : ""), C = () => r("click", n.column);
    return (o, I) => (v(), h("th", {
      "data-column": o.column.key,
      "data-sortable": a.value,
      "data-sort": f.value,
      colspan: l.value,
      title: g.value,
      class: oe(D(pa)(o.column)),
      onClick: C
    }, [
      J("div", null, [
        lt(ze(g.value) + " ", 1),
        m.value ? (v(), h("i", {
          key: 0,
          class: oe(m.value)
        }, null, 2)) : V("", !0)
      ])
    ], 10, Il));
  }
}), El = ["id"], Al = { class: "lkt-table-page-buttons" }, Vl = { class: "switch-edition-mode" }, Rl = {
  key: 0,
  class: "lkt-table-page-buttons"
}, Nl = {
  key: 1,
  class: "lkt-table-page-filters"
}, Ml = { class: "lkt-table" }, Ll = { key: 0 }, _l = { key: 0 }, $l = {
  key: 0,
  "data-role": "drag-indicator"
}, Ol = { key: 1 }, Pl = { key: 2 }, Ul = {
  key: 3,
  class: "lkt-table-col-drop"
}, Fl = {
  key: 4,
  class: "lkt-table-col-edit"
}, jl = ["id"], zl = ["id"], Hl = ["data-i"], ql = ["data-i"], Gl = ["id"], Xl = { class: "lkt-carousel-slide" }, Yl = { class: "lkt-carousel-slide" }, Kl = {
  key: 2,
  class: "lkt-table-empty"
}, Wl = {
  key: 4,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, xl = /* @__PURE__ */ ae({
  __name: "LktTable",
  props: /* @__PURE__ */ Ea({
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
    requiredItemsForTopCreate: {},
    requiredItemsForBottomCreate: {},
    addNavigation: { type: Boolean },
    newValueGenerator: { type: Function },
    wrapContentTag: {},
    wrapContentClass: {},
    itemsContainerClass: {},
    createEnabledValidator: { type: Function }
  }, Ra(Na)),
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
  setup(e, { expose: i, emit: r }) {
    var Gt, Xt;
    const n = r, l = la(), a = e, f = {}, g = S(typeof a.sorter == "function" ? a.sorter : el), m = S(nl(a.columns)), C = S(je.Asc), o = S(a.modelValue), I = S(f), c = S(null), k = S(a.columns), T = S((Gt = a.paginator) == null ? void 0 : Gt.modelValue), A = S(a.loading), Ce = S(!1), $ = S(a.perms), Q = S(null), q = S(null), Ne = S(null), Z = S({}), d = S(new La({ items: o.value }, a.dataStateConfig)), w = S(a.editMode), le = S(0), P = S(null), x = S(((Xt = a.carousel) == null ? void 0 : Xt.currentSlide) || 0), _ = S(Ve(a.saveButton, ke.defaultSaveButton)), we = S(Ve(a.createButton, ke.defaultCreateButton)), st = S(Ve(a.editModeButton, ke.defaultEditModeButton)), Me = S(Ve(a.dropButton, ke.defaultDropButton));
    U(() => a.saveButton, (t) => _.value = Ve(a.saveButton, ke.defaultSaveButton)), U(() => a.createButton, (t) => we.value = Ve(a.createButton, ke.defaultCreateButton)), U(() => a.editModeButton, (t) => st.value = Ve(a.editModeButton, ke.defaultEditModeButton)), U(() => a.dropButton, (t) => Me.value = Ve(a.dropButton, ke.defaultDropButton));
    const z = S(!1);
    U(A, (t) => n("update:loading", t)), U(T, (t) => n("page", t));
    const Bt = (t) => {
      $.value = t;
    }, Le = (t) => {
      var p;
      Array.isArray(t.data) && ((!a.paginator || ![St.LoadMore, St.Infinite].includes((p = a.paginator) == null ? void 0 : p.type)) && o.value.splice(0, o.value.length), o.value = [...o.value, ...t.data]), A.value = !1, Ce.value = !0, d.value.store({ items: o.value }).turnStoredIntoOriginal(), z.value = !1, yt(() => {
        ve(), ot.value, n("read-response", t);
      });
    }, Dt = () => yt(() => A.value = !0), pe = () => {
      Q.value.doRefresh();
    }, se = Ma(12), _e = u(() => {
      if (!a.hideEmptyColumns) return [];
      let t = [];
      return k.value.forEach((p) => {
        let L = p.key, K = !1;
        o.value.forEach((te) => {
          if (typeof te.checkEmpty == "function")
            return te.checkEmpty(te);
          te[L] && (K = !0);
        }), K || t.push(L);
      }), t;
    }), de = u(() => k.value.filter((t) => !t.hidden)), qe = u(() => k.value.filter((t) => t.hidden)), dt = u(() => {
      let t = de.value.length + 1;
      return a.sortable && ++t, t;
    }), Ge = u(() => k.value.filter((t) => t.isForRowKey)), me = u(() => qe.value.length > 0 && !a.sortable), Xe = u(() => k.value.map((t) => t.key)), ie = u(() => {
      let t = [];
      for (let p in l) Xe.value.indexOf(p) !== -1 && t.push(p);
      return t;
    }), Ye = u(() => {
      let t = [];
      for (let p in l) p.indexOf("slide-") !== -1 && t.push(p);
      return t;
    }), Ke = u(() => {
      var t;
      return a.hiddenSave || A.value || !((t = _.value) != null && t.resource || _.value.type) ? !1 : w.value && z.value ? !0 : w.value;
    }), It = u(() => ht.value && o.value.length >= a.requiredItemsForTopCreate || xe.value ? !0 : Ke.value || w.value && ge.value), ot = u(() => {
      var t, p;
      return le.value, typeof ((t = _.value) == null ? void 0 : t.disabled) == "function" ? _.value.disabled({
        value: o.value,
        dataState: d.value
      }) : typeof ((p = _.value) == null ? void 0 : p.disabled) == "boolean" ? _.value.disabled : !z.value;
    }), ct = u(() => o.value.length), Tt = u(() => {
      var t;
      return {
        items: o.value,
        ...(t = _.value) == null ? void 0 : t.resourceData
      };
    }), vt = u(() => a.titleTag === "" ? "h2" : a.titleTag), ft = u(() => a.wrapContentTag === "" ? "div" : a.wrapContentTag), $e = u(() => ia(a.title)), We = u(() => {
      var t;
      return (t = a.drag) == null ? void 0 : t.enabled;
    }), ge = u(() => $.value.includes(De.Create)), Oe = u(() => $.value.includes("read")), ce = u(() => $.value.includes(De.Update)), be = u(() => $.value.includes(De.Edit)), Be = u(() => $.value.includes(De.InlineEdit)), Pe = u(() => $.value.includes(De.ModalCreate)), Ue = u(() => $.value.includes(De.InlineCreate)), pt = u(() => $.value.includes(De.InlineCreateEver)), he = u(() => $.value.includes(De.Drop)), Fe = u(() => $.value.includes(De.SwitchEditMode)), xe = u(() => !Fe.value || !ce.value && !he.value || !ce.value && he.value ? !1 : !A.value), it = u(() => {
      var t;
      return (typeof ((t = a.paginator) == null ? void 0 : t.type) < "u" && [St.LoadMore, St.Infinite].includes(a.paginator.type) || !A.value) && o.value.length > 0;
    }), Je = (t) => {
      let p = t.target;
      if (typeof p.dataset.column > "u")
        do
          p = p.parentNode;
        while (typeof p.dataset.column > "u" && p.tagName !== "TABLE" && p.tagName !== "body");
      if (p.tagName === "TD" && (p = p.parentNode, p = p.dataset.i, typeof p < "u"))
        return o.value[p];
    }, ve = () => {
      le.value = $a();
    }, Et = (t) => o.value[t], At = (t) => {
      var p;
      return (p = c.value) == null ? void 0 : p.querySelector(`[data-i="${t}"]`);
    }, rt = (t) => I.value["tr_" + t] === !0, mt = (t) => {
      t && t.sortable && (o.value = o.value.sort((p, L) => g.value(p, L, t, C.value)), C.value = C.value === je.Asc ? je.Desc : je.Asc, m.value = t.key, ve(), n("sort", [m.value, C.value]));
    }, Qe = (t) => {
      n("click", t);
    }, s = (t, p) => {
      let L = "tr_" + p;
      I.value[L] = typeof I.value[L] > "u" ? !0 : !I.value[L];
    }, b = (t) => {
      var L, K, te, re, N, E, M, ye;
      let p = parseInt((re = (te = (K = (L = t == null ? void 0 : t.originalEvent) == null ? void 0 : L.toElement) == null ? void 0 : K.closest("tr")) == null ? void 0 : te.dataset) == null ? void 0 : re.i);
      return !(typeof ((N = a.drag) == null ? void 0 : N.isValid) == "function" && !((E = a.drag) != null && E.isValid(o.value[p])) || typeof ((M = a.drag) == null ? void 0 : M.isValid) == "boolean" && !((ye = a.drag) != null && ye.isValid));
    }, y = (t) => {
      var p, L;
      return typeof ((p = a.drag) == null ? void 0 : p.isDraggable) == "function" ? (L = a.drag) == null ? void 0 : L.isDraggable(t) : !0;
    }, B = () => {
      if (ge.value) {
        n("click-create");
        return;
      }
      if (Ue.value || pt.value) {
        if (typeof a.newValueGenerator == "function") {
          let t = a.newValueGenerator();
          if (typeof t == "object" || a.type !== et.Table) {
            o.value.push(t);
            return;
          }
        }
        o.value.push({});
      } else
        n("click-create");
    }, R = (t) => {
      o.value.push(t);
    }, G = () => A.value = !0, ee = () => A.value = !1, ne = (t, p) => {
      var L, K, te;
      if (!((L = _.value) != null && L.type && [
        $t.Split,
        $t.SplitEver,
        $t.SplitLazy
      ].includes((K = _.value) == null ? void 0 : K.type))) {
        if (n("before-save"), (te = _.value) != null && te.resource && (A.value = !1, !p.success)) {
          n("error", p.httpStatus);
          return;
        }
        d.value.turnStoredIntoOriginal(), z.value = !1, n("save", p);
      }
    }, gt = (t, p, L) => {
      if (L >= t.length) {
        let K = L - t.length + 1;
        for (; K--; ) t.push(void 0);
      }
      return t.splice(L, 0, t.splice(p, 1)[0]), t;
    }, Vt = (t) => {
      gt(o.value, t, t - 1), ve();
    }, Rt = (t) => {
      gt(o.value, t, t + 1), ve();
    }, bt = (t) => {
      o.value.splice(t, 1), ve();
    }, ga = () => {
      var t;
      Z.value && typeof ((t = Z.value) == null ? void 0 : t.destroy) == "function" && (Z.value.destroy(), Z.value = {});
    }, Ht = () => {
      P.value || (P.value = document.getElementById("lkt-table-body-" + se)), Z.value = new _a(P.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(t) {
          let p = t.oldIndex, L = t.newIndex;
          o.value.splice(L, 0, o.value.splice(p, 1)[0]), ve(), n("drag-end", o.value[L]);
        },
        onMove: function(t, p) {
          return b(t);
        }
      });
    }, Nt = (t, p, L = !1) => {
      let K = [le.value, se, "row", p];
      return L && K.push("hidden"), Ge.value.forEach((te) => {
        let re = String(t[te.key]).toLowerCase();
        re.length > 50 && (re = re.substring(0, 50)), re = ra(re, " ", "-"), K.push(re);
      }), K.join("-");
    }, qt = u(() => typeof a.createEnabledValidator == "function" ? a.createEnabledValidator({ items: o.value }) : !0), ht = u(() => pt.value || ge.value && w.value || Ue.value && w.value || Pe.value && w.value), ba = u(() => [et.Ol, et.Ul].includes(a.type)), Mt = (t, p) => typeof a.itemDisplayChecker == "function" ? a.itemDisplayChecker(t) : !0;
    jt(() => {
      var t;
      a.initialSorting && mt(ol(a.columns, m.value)), d.value.store({ items: o.value }).turnStoredIntoOriginal(), z.value = !1, (t = a.drag) != null && t.enabled && yt(() => {
        Ht();
      });
    }), U(() => {
      var t;
      return (t = a.drag) == null ? void 0 : t.enabled;
    }, (t) => {
      t ? Ht() : ga();
    }), U(() => a.perms, (t) => $.value = t), U($, (t) => n("update:perms", t)), U(() => a.editMode, (t) => w.value = t), U(() => a.columns, (t) => k.value = t, { deep: !0 }), U(() => a.modelValue, (t) => {
      o.value = t;
    }, { deep: !0 }), U(o, (t) => {
      d.value.increment({ items: t }), z.value = d.value.changed(), n("update:modelValue", t);
    }, { deep: !0 }), i({
      getItemByEvent: Je,
      getItemByIndex: Et,
      getRowByIndex: At,
      doRefresh: pe,
      doRemoveIndex: (t) => {
        o.value.splice(t, 1), ve();
      },
      getHtml: () => q.value,
      reRender: ve,
      turnStoredIntoOriginal: () => {
        d.value.turnStoredIntoOriginal(), yt(() => {
          ve();
        });
      }
    });
    const ha = u(() => typeof Y.defaultEmptySlot < "u"), ya = u(() => Y.defaultEmptySlot), ka = u(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled ? !1 : typeof a.drag.canRender > "u" ? !0 : a.drag.canRender), Sa = u(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled || typeof a.drag.isDisabled > "u" ? !1 : a.drag.isDisabled);
    return (t, p) => {
      const L = Se("lkt-button"), K = Se("lkt-loader"), te = Se("lkt-paginator");
      return v(), h("section", {
        ref_key: "element",
        ref: q,
        class: "lkt-table-page",
        id: "lkt-table-page-" + D(se)
      }, [
        $e.value || D(l).title ? (v(), h("header", {
          key: 0,
          class: oe(t.headerClass)
        }, [
          $e.value ? (v(), O(Ae(vt.value), { key: 0 }, {
            default: j(() => [
              t.titleIcon ? (v(), h("i", {
                key: 0,
                class: oe(t.titleIcon)
              }, null, 2)) : V("", !0),
              lt(" " + ze($e.value), 1)
            ]),
            _: 1
          })) : V("", !0),
          D(l).title ? H(t.$slots, "title", { key: 1 }) : V("", !0)
        ], 2)) : V("", !0),
        (v(), O(Ae(ft.value), {
          class: oe(["lkt-table-page-content-wrapper", t.wrapContentClass])
        }, {
          default: j(() => {
            var re;
            return [
              tt(J("div", Al, [
                tt(Ee(L, fe({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: Ne
                }, {
                  ..._.value,
                  disabled: ot.value,
                  resourceData: Tt.value
                }, {
                  onLoading: G,
                  onLoaded: ee,
                  onClick: ne
                }), {
                  split: j(({ doClose: N, doRootClick: E }) => [
                    H(t.$slots, "button-save-split", {
                      doClose: N,
                      doRootClick: E,
                      dataState: d.value,
                      onButtonLoading: G,
                      onButtonLoaded: ee
                    })
                  ]),
                  default: j(() => [
                    D(l)["button-save"] ? H(t.$slots, "button-save", {
                      key: 0,
                      items: o.value,
                      editMode: t.editMode,
                      canUpdate: !ot.value
                    }) : V("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [at, Ke.value]
                ]),
                ht.value && o.value.length >= t.requiredItemsForTopCreate ? (v(), O(ea, {
                  key: 0,
                  config: we.value,
                  disabled: !qt.value,
                  onClick: B,
                  onAppend: R
                }, null, 8, ["config", "disabled"])) : V("", !0),
                J("div", Vl, [
                  tt(Ee(L, fe(st.value, {
                    checked: w.value,
                    "onUpdate:checked": p[0] || (p[0] = (N) => w.value = N)
                  }), null, 16, ["checked"]), [
                    [at, xe.value]
                  ])
                ])
              ], 512), [
                [at, It.value]
              ]),
              D(l).buttons ? (v(), h("div", Rl, [
                H(t.$slots, "buttons")
              ])) : V("", !0),
              Ce.value && D(l).filters ? (v(), h("div", Nl, [
                H(t.$slots, "filters", {
                  items: o.value,
                  isLoading: A.value
                })
              ])) : V("", !0),
              tt(J("div", Ml, [
                t.type === D(et).Table ? (v(), h("table", Ll, [
                  t.hideTableHeader ? V("", !0) : (v(), h("thead", _l, [
                    J("tr", null, [
                      We.value && w.value ? (v(), h("th", $l)) : V("", !0),
                      t.addNavigation && w.value ? (v(), h("th", Ol)) : V("", !0),
                      me.value ? (v(), h("th", Pl)) : V("", !0),
                      (v(!0), h(W, null, ue(de.value, (N) => (v(), h(W, null, [
                        _e.value.indexOf(N.key) === -1 ? (v(), O(Tl, {
                          key: 0,
                          column: N,
                          "sort-by": m.value,
                          "sort-direction": C.value,
                          "amount-of-columns": t.columns.length,
                          items: o.value,
                          onClick: (E) => mt(N)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : V("", !0)
                      ], 64))), 256)),
                      he.value && w.value ? (v(), h("th", Ul)) : V("", !0),
                      be.value && ce.value && w.value ? (v(), h("th", Fl)) : V("", !0)
                    ])
                  ])),
                  J("tbody", {
                    ref_key: "tableBody",
                    ref: c,
                    id: "lkt-table-body-" + D(se),
                    class: oe(t.itemsContainerClass)
                  }, [
                    (v(!0), h(W, null, ue(o.value, (N, E) => tt((v(), O(yl, {
                      modelValue: o.value[E],
                      "onUpdate:modelValue": (M) => o.value[E] = M,
                      key: Nt(N, E),
                      i: E,
                      "drop-button": Me.value,
                      "edit-button": t.editButton,
                      "display-hidden-columns-indicator": me.value,
                      "is-draggable": y(N),
                      sortable: We.value,
                      "visible-columns": de.value,
                      "empty-columns": _e.value,
                      "add-navigation": t.addNavigation,
                      "hidden-is-visible": rt(E),
                      "latest-row": E + 1 === ct.value,
                      "can-drop": he.value && w.value,
                      "can-edit": be.value && ce.value && w.value,
                      "can-read": Oe.value,
                      "can-create": ge.value,
                      "edit-mode-enabled": w.value,
                      "has-inline-edit-perm": Be.value,
                      "row-display-type": t.rowDisplayType,
                      "render-drag": ka.value,
                      "disabled-drag": Sa.value,
                      "is-loading": A.value,
                      onClick: Qe,
                      onShow: s,
                      onItemUp: Vt,
                      onItemDown: Rt,
                      onItemDrop: bt
                    }, Yt({ _: 2 }, [
                      D(l)[`item-${E}`] ? {
                        name: `item-${E}`,
                        fn: j((M) => [
                          H(t.$slots, `item-${E}`, Re({
                            [t.slotItemVar || ""]: M.item,
                            index: E,
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
                      } : D(l).item ? {
                        name: "item",
                        fn: j((M) => [
                          H(t.$slots, "item", Re({
                            [t.slotItemVar || ""]: M.item,
                            index: E,
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
                      ue(ie.value, (M) => ({
                        name: M,
                        fn: j((ye) => [
                          H(t.$slots, M, Re({
                            [t.slotItemVar || ""]: ye.item,
                            value: ye.value,
                            column: ye.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "drop-button", "edit-button", "display-hidden-columns-indicator", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "hidden-is-visible", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading"])), [
                      [at, Mt(o.value[E])]
                    ])), 128)),
                    qe.value.length > 0 ? (v(!0), h(W, { key: 0 }, ue(o.value, (N, E) => (v(), O(Dl, {
                      modelValue: o.value[E],
                      "onUpdate:modelValue": (M) => o.value[E] = M,
                      key: Nt(N, E, !0),
                      i: E,
                      "hidden-columns": qe.value,
                      "hidden-columns-col-span": dt.value,
                      "is-draggable": y(N),
                      sortable: We.value,
                      "visible-columns": de.value,
                      "empty-columns": _e.value,
                      "hidden-is-visible": rt(E),
                      "edit-mode-enabled": w.value,
                      "has-inline-edit-perm": Be.value,
                      onClick: Qe,
                      onShow: s
                    }, Yt({ _: 2 }, [
                      ue(ie.value, (M) => ({
                        name: M,
                        fn: j((ye) => [
                          H(t.$slots, M, Re({
                            [t.slotItemVar || ""]: ye.item,
                            value: ye.value,
                            column: ye.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "hidden-columns", "hidden-columns-col-span", "is-draggable", "sortable", "visible-columns", "empty-columns", "hidden-is-visible", "edit-mode-enabled", "has-inline-edit-perm"]))), 128)) : V("", !0)
                  ], 10, jl)
                ])) : t.type === D(et).Item ? (v(), h("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: c,
                  id: "lkt-table-body-" + D(se),
                  class: oe(["lkt-table-items-container", t.itemsContainerClass])
                }, [
                  (v(!0), h(W, null, ue(o.value, (N, E) => (v(), h(W, null, [
                    Mt(N) ? (v(), h("div", {
                      class: "lkt-table-item",
                      "data-i": E,
                      key: Nt(N, E)
                    }, [
                      H(t.$slots, "item", Re({
                        [t.slotItemVar || ""]: N,
                        index: E,
                        editing: w.value,
                        canCreate: ge.value,
                        canRead: Oe.value,
                        canUpdate: ce.value,
                        canDrop: he.value,
                        isLoading: A.value,
                        doDrop: () => bt(E)
                      }))
                    ], 8, Hl)) : V("", !0)
                  ], 64))), 256))
                ], 10, zl)) : ba.value ? (v(), O(Ae(t.type), {
                  key: 2,
                  class: oe(["lkt-table-items-container", t.itemsContainerClass])
                }, {
                  default: j(() => [
                    (v(!0), h(W, null, ue(o.value, (N, E) => (v(), h(W, null, [
                      Mt(N) ? (v(), h("li", {
                        key: 0,
                        class: "lkt-table-item",
                        "data-i": E
                      }, [
                        H(t.$slots, "item", Re({
                          [t.slotItemVar || ""]: N,
                          index: E,
                          editing: w.value,
                          canCreate: ge.value,
                          canRead: Oe.value,
                          canUpdate: ce.value,
                          canDrop: he.value,
                          isLoading: A.value,
                          doDrop: () => bt(E)
                        }))
                      ], 8, ql)) : V("", !0)
                    ], 64))), 256))
                  ]),
                  _: 3
                }, 8, ["class"])) : t.type === D(et).Carousel ? (v(), h("div", {
                  key: 3,
                  ref_key: "tableBody",
                  ref: c,
                  id: "lkt-table-body-" + D(se),
                  class: oe(["lkt-table-items-container", t.itemsContainerClass])
                }, [
                  Ee(D(Wa), fe({
                    modelValue: x.value,
                    "onUpdate:modelValue": p[1] || (p[1] = (N) => x.value = N)
                  }, t.carousel, {
                    "wrap-around": ((re = t.carousel) == null ? void 0 : re.infinite) === !0
                  }), {
                    addons: j(() => [
                      Ee(D(Qa)),
                      Ee(D(Za))
                    ]),
                    default: j(() => [
                      (v(!0), h(W, null, ue(Ye.value, (N, E) => (v(), O(D(Zt), {
                        key: N,
                        index: E
                      }, {
                        default: j(() => [
                          J("div", Xl, [
                            H(t.$slots, N)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (v(!0), h(W, null, ue(o.value, (N, E) => (v(), O(D(Zt), {
                        key: t.slide,
                        index: E
                      }, {
                        default: j(() => [
                          J("div", Yl, [
                            H(t.$slots, "item", Re({
                              [t.slotItemVar || ""]: N,
                              index: E,
                              editing: w.value,
                              canCreate: ge.value,
                              canRead: Oe.value,
                              canUpdate: ce.value,
                              canDrop: he.value,
                              isLoading: A.value,
                              doDrop: () => bt(E)
                            }))
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128))
                    ]),
                    _: 3
                  }, 16, ["modelValue", "wrap-around"])
                ], 10, Gl)) : V("", !0)
              ], 512), [
                [at, it.value]
              ]),
              !A.value && o.value.length === 0 ? (v(), h("div", Kl, [
                D(l).empty ? H(t.$slots, "empty", { key: 0 }) : ha.value ? (v(), O(Ae(ya.value), {
                  key: 1,
                  message: t.noResultsText
                }, null, 8, ["message"])) : t.noResultsText ? (v(), h(W, { key: 2 }, [
                  lt(ze(t.noResultsText), 1)
                ], 64)) : V("", !0)
              ])) : V("", !0),
              A.value ? (v(), O(K, { key: 3 })) : V("", !0),
              ht.value || D(l).bottomButtons ? (v(), h("div", Wl, [
                ht.value && o.value.length >= t.requiredItemsForBottomCreate ? (v(), O(ea, {
                  key: 0,
                  config: we.value,
                  disabled: !qt.value,
                  onClick: B,
                  onAppend: R
                }, null, 8, ["config", "disabled"])) : V("", !0),
                H(t.$slots, "bottom-buttons")
              ])) : V("", !0),
              t.paginator && Object.keys(t.paginator).length > 0 ? (v(), O(te, fe({
                key: 5,
                ref_key: "paginatorRef",
                ref: Q
              }, t.paginator, {
                modelValue: T.value,
                "onUpdate:modelValue": p[2] || (p[2] = (N) => T.value = N),
                onLoading: Dt,
                onPerms: Bt,
                onResponse: Le
              }), null, 16, ["modelValue"])) : V("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, El);
    };
  }
}), nn = {
  install: (e) => {
    e.component("lkt-table") === void 0 && e.component("lkt-table", xl);
  }
}, on = (e) => (Y.navButtonSlot = e, !0), rn = (e) => (Y.dropButtonSlot = e, !0), un = (e) => (Y.createButtonSlot = e, !0), sn = (e) => {
  Y.defaultEmptySlot = e;
}, dn = (e) => {
  Y.defaultSaveIcon = e;
};
export {
  fn as Column,
  pn as createColumn,
  nn as default,
  un as setTableCreateButtonSlot,
  rn as setTableDropButtonSlot,
  sn as setTableEmptySlot,
  on as setTableNavButtonSlot,
  dn as setTableSaveIcon
};
