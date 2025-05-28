import { defineComponent as pe, computed as u, ref as A, shallowReactive as Ft, watch as U, watchEffect as Ot, onMounted as qt, onBeforeUnmount as Ca, reactive as $t, provide as aa, h as X, useId as wa, inject as ht, getCurrentInstance as Da, onUnmounted as Ia, onUpdated as Ta, cloneVNode as Ba, resolveComponent as Se, createBlock as O, createElementBlock as w, unref as h, openBlock as v, mergeProps as ae, withCtx as P, createTextVNode as et, toDisplayString as tt, Fragment as G, useSlots as la, normalizeClass as K, createCommentVNode as L, createElementVNode as ve, createVNode as he, resolveDynamicComponent as qe, renderSlot as M, renderList as be, mergeDefaults as Aa, nextTick as Bt, normalizeProps as Re, withDirectives as Fe, vShow as je, createSlots as Ea } from "vue";
import { __ as Va } from "lkt-i18n";
import { SortDirection as Ge, Column as na, extractPropValue as La, ColumnType as gt, FieldType as Kt, TableRowType as ke, extractI18nValue as oa, LktSettings as Be, ensureButtonConfig as ze, TablePermission as Ie, PaginatorType as At, TableType as He, getDefaultValues as Na, Table as Ra, ButtonType as _t } from "lkt-vue-kernel";
import { Column as en, createColumn as tn } from "lkt-vue-kernel";
import { generateRandomString as Ma, replaceAll as Oa } from "lkt-string-tools";
import { DataState as $a } from "lkt-data-state";
import _a from "sortablejs";
import { time as Pa } from "lkt-date-tools";
/**
 * Vue 3 Carousel 0.14.0
 * (c) 2025
 * @license MIT
 */
const ia = ["viewport", "carousel"], Vt = {
  "bottom-to-top": "btt",
  "left-to-right": "ltr",
  "right-to-left": "rtl",
  "top-to-bottom": "ttb"
}, ra = [
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
}, ua = ["slide", "fade"], sa = [
  "center",
  "start",
  "end",
  "center-even",
  "center-odd"
], z = {
  autoplay: 0,
  breakpointMode: ia[0],
  breakpoints: void 0,
  dir: ra[0],
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
  slideEffect: ua[0],
  snapAlign: sa[0],
  touchDrag: !0,
  transition: 300,
  wrapAround: !1
}, xe = Symbol("carousel"), Fa = (t) => {
  const o = Ft([]), i = (n) => {
    n !== void 0 ? o.slice(n).forEach((l, a) => {
      var b;
      (b = l.exposed) === null || b === void 0 || b.setIndex(n + a);
    }) : o.forEach((l, a) => {
      var b;
      (b = l.exposed) === null || b === void 0 || b.setIndex(a);
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
function ja(t) {
  return t.length === 0 ? 0 : t.reduce((i, n) => i + n, 0) / t.length;
}
function Wt({ slides: t, position: o, toShow: i }) {
  const n = [], l = o === "before", a = l ? -i : 0, b = l ? 0 : i;
  if (t.length <= 0)
    return n;
  for (let k = a; k < b; k++) {
    const d = {
      index: l ? k : k + t.length,
      isClone: !0,
      position: o,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${o}-${k}`
    }, D = t[(k % t.length + t.length) % t.length].vnode, p = Ba(D, d);
    p.el = null, n.push(p);
  }
  return n;
}
const za = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function Jt(t) {
  if (!t.el || !(t.el instanceof Element))
    return;
  const o = t.el.querySelectorAll(za);
  for (const i of o)
    i instanceof HTMLElement && !i.hasAttribute("disabled") && i.getAttribute("aria-hidden") !== "true" && i.setAttribute("tabindex", "-1");
}
function Ha(t, o) {
  return Object.keys(t).filter((i) => !o.includes(i)).reduce((i, n) => (i[n] = t[n], i), {});
}
function qa(t) {
  const { isVertical: o, isReversed: i, dragged: n, effectiveSlideSize: l } = t, a = o ? n.y : n.x;
  if (a === 0)
    return 0;
  const b = Math.round(a / l);
  return i ? b : -b;
}
function Te({ val: t, max: o, min: i }) {
  return o < i ? t : Math.min(Math.max(t, isNaN(i) ? t : i), isNaN(o) ? t : o);
}
function Ga(t) {
  const { transform: o } = window.getComputedStyle(t);
  return o.split(/[(,)]/).slice(1, -1).map((i) => parseFloat(i));
}
function xa(t) {
  let o = 1, i = 1;
  return t.forEach((n) => {
    const l = Ga(n);
    l.length === 6 && (o /= l[0], i /= l[3]);
  }), { widthMultiplier: o, heightMultiplier: i };
}
function Xa(t, o) {
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
function Ya(t, o, i) {
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
function jt({ slideSize: t, viewportSize: o, align: i, itemsToShow: n }) {
  return n !== void 0 ? Xa(i, n) : t !== void 0 && o !== void 0 ? Ya(i, t, o) : 0;
}
function da(t = "", o = {}) {
  return Object.entries(o).reduce((i, [n, l]) => i.replace(`{${n}}`, String(l)), t);
}
function ca({ val: t, max: o, min: i = 0 }) {
  const n = o - i + 1;
  return ((t - i) % n + n) % n + i;
}
function Pt(t, o = 0) {
  let i = !1, n = 0, l = null;
  function a(...b) {
    if (i)
      return;
    i = !0;
    const k = () => {
      l = requestAnimationFrame((T) => {
        T - n > o ? (n = T, t(...b), i = !1) : k();
      });
    };
    k();
  }
  return a.cancel = () => {
    l && (cancelAnimationFrame(l), l = null, i = !1);
  }, a;
}
function Et(t, o = "px") {
  if (!(t == null || t === ""))
    return typeof t == "number" || parseFloat(t).toString() === t ? `${t}${o}` : t;
}
const Ka = pe({
  name: "CarouselAria",
  setup() {
    const t = ht(xe);
    return t ? () => X("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, da(t.config.i18n.itemXofY, {
      currentSlide: t.currentSlide + 1,
      slidesCount: t.slidesCount
    })) : () => "";
  }
}), Wa = {
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
      return ia.includes(t);
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
      return sa.includes(t);
    }
  },
  slideEffect: {
    type: String,
    default: z.slideEffect,
    validator(t) {
      return ua.includes(t);
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
      if (!ra.includes(t))
        return !1;
      const i = t in Vt ? Vt[t] : t;
      return ["ttb", "btt"].includes(i) && (!o.height || o.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${t}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: z.wrapAround,
    type: Boolean
  }
}, Ja = pe({
  name: "VueCarousel",
  props: Wa,
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
    const a = Fa(i), b = a.getSlides(), k = u(() => b.length), T = A(null), d = A(null), D = A(0), p = u(() => Object.assign(Object.assign(Object.assign({}, z), Ha(t, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, z.i18n), t.i18n) })), s = Ft(Object.assign({}, p.value)), g = A((l = t.modelValue) !== null && l !== void 0 ? l : 0), E = A(g.value);
    U(g, (r) => E.value = r);
    const V = A(0), W = u(() => Math.ceil((k.value - 1) / 2)), ie = u(() => k.value - 1), re = u(() => 0);
    let J = null, c = null, I = null;
    const ue = u(() => D.value + s.gap), F = u(() => {
      const r = s.dir || "ltr";
      return r in Vt ? Vt[r] : r;
    }), le = u(() => ["rtl", "btt"].includes(F.value)), _ = u(() => ["ttb", "btt"].includes(F.value)), ne = u(() => s.itemsToShow === "auto"), H = u(() => _.value ? "height" : "width");
    function Me() {
      var r;
      if (!Ve.value)
        return;
      const y = (p.value.breakpointMode === "carousel" ? (r = T.value) === null || r === void 0 ? void 0 : r.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, C = Object.keys(t.breakpoints || {}).map((R) => Number(R)).sort((R, Y) => +Y - +R), B = {};
      C.some((R) => y >= R ? (Object.assign(B, t.breakpoints[R]), B.i18n && Object.assign(B.i18n, p.value.i18n, t.breakpoints[R].i18n), !0) : !1), Object.assign(s, p.value, B);
    }
    const Ae = Pt(() => {
      Me(), me(), se();
    }), Xe = Ft(/* @__PURE__ */ new Set()), Q = A([]);
    function Lt({ widthMultiplier: r, heightMultiplier: y }) {
      Q.value = b.map((C) => {
        var B;
        const R = (B = C.exposed) === null || B === void 0 ? void 0 : B.getBoundingRect();
        return {
          width: R.width * r,
          height: R.height * y
        };
      });
    }
    const Oe = A({
      width: 0,
      height: 0
    });
    function Ce({ widthMultiplier: r, heightMultiplier: y }) {
      var C;
      const B = ((C = d.value) === null || C === void 0 ? void 0 : C.getBoundingClientRect()) || { width: 0, height: 0 };
      Oe.value = {
        width: B.width * r,
        height: B.height * y
      };
    }
    function se() {
      if (!d.value)
        return;
      const r = xa(Xe);
      if (Ce(r), Lt(r), ne.value)
        D.value = ja(Q.value.map((y) => y[H.value]));
      else {
        const y = Number(s.itemsToShow), C = (y - 1) * s.gap;
        D.value = (Oe.value[H.value] - C) / y;
      }
    }
    function me() {
      !s.wrapAround && k.value > 0 && (g.value = Te({
        val: g.value,
        max: ie.value,
        min: re.value
      })), ne.value || (s.itemsToShow = Te({
        val: Number(s.itemsToShow),
        max: k.value,
        min: 1
      }));
    }
    const at = u(() => typeof t.ignoreAnimations == "string" ? t.ignoreAnimations.split(",") : Array.isArray(t.ignoreAnimations) ? t.ignoreAnimations : t.ignoreAnimations ? !1 : []);
    Ot(() => me()), Ot(() => {
      se();
    });
    let Ee;
    const kt = (r) => {
      const y = r.target;
      if (!(!(y != null && y.contains(T.value)) || Array.isArray(at.value) && at.value.includes(r.animationName)) && (Xe.add(y), !Ee)) {
        const C = () => {
          Ee = requestAnimationFrame(() => {
            se(), C();
          });
        };
        C();
      }
    }, St = (r) => {
      const y = r.target;
      y && Xe.delete(y), Ee && Xe.size === 0 && (cancelAnimationFrame(Ee), se());
    }, Ve = A(!1);
    typeof document < "u" && Ot(() => {
      Ve.value && at.value !== !1 ? (document.addEventListener("animationstart", kt), document.addEventListener("animationend", St)) : (document.removeEventListener("animationstart", kt), document.removeEventListener("animationend", St));
    }), qt(() => {
      Ve.value = !0, Me(), Ct(), T.value && (I = new ResizeObserver(Ae), I.observe(T.value)), i("init");
    }), Ca(() => {
      Ve.value = !1, a.cleanup(), c && clearTimeout(c), Ee && cancelAnimationFrame(Ee), J && clearInterval(J), I && (I.disconnect(), I = null), typeof document < "u" && Le(), T.value && (T.value.removeEventListener("transitionend", se), T.value.removeEventListener("animationiteration", se));
    });
    let we = !1;
    const ge = { x: 0, y: 0 }, de = $t({ x: 0, y: 0 }), $e = A(!1), lt = A(!1), Nt = () => {
      $e.value = !0;
    }, nt = () => {
      $e.value = !1;
    }, ot = Pt((r) => {
      if (!r.ctrlKey)
        switch (r.key) {
          case "ArrowLeft":
          case "ArrowUp":
            _.value === r.key.endsWith("Up") && (le.value ? De(!0) : We(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            _.value === r.key.endsWith("Down") && (le.value ? We(!0) : De(!0));
            break;
        }
    }, 200), ye = () => {
      document.addEventListener("keydown", ot);
    }, Le = () => {
      document.removeEventListener("keydown", ot);
    };
    function Z(r) {
      const y = r.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(y) || q.value || (we = r.type === "touchstart", !we && (r.preventDefault(), r.button !== 0)))
        return;
      ge.x = "touches" in r ? r.touches[0].clientX : r.clientX, ge.y = "touches" in r ? r.touches[0].clientY : r.clientY;
      const C = we ? "touchmove" : "mousemove", B = we ? "touchend" : "mouseup";
      document.addEventListener(C, it, { passive: !1 }), document.addEventListener(B, Ye, { passive: !0 });
    }
    const it = Pt((r) => {
      lt.value = !0;
      const y = "touches" in r ? r.touches[0].clientX : r.clientX, C = "touches" in r ? r.touches[0].clientY : r.clientY;
      de.x = y - ge.x, de.y = C - ge.y;
      const B = qa({
        isVertical: _.value,
        isReversed: le.value,
        dragged: de,
        effectiveSlideSize: ue.value
      });
      E.value = s.wrapAround ? g.value + B : Te({
        val: g.value + B,
        max: ie.value,
        min: re.value
      }), i("drag", { deltaX: de.x, deltaY: de.y });
    });
    function Ye() {
      if (it.cancel(), E.value !== g.value && !we) {
        const C = (B) => {
          B.preventDefault(), window.removeEventListener("click", C);
        };
        window.addEventListener("click", C);
      }
      Ne(E.value), de.x = 0, de.y = 0, lt.value = !1;
      const r = we ? "touchmove" : "mousemove", y = we ? "touchend" : "mouseup";
      document.removeEventListener(r, it), document.removeEventListener(y, Ye);
    }
    function Ct() {
      !s.autoplay || s.autoplay <= 0 || (J = setInterval(() => {
        s.pauseAutoplayOnHover && $e.value || De();
      }, s.autoplay));
    }
    function rt() {
      J && (clearInterval(J), J = null);
    }
    function Ke() {
      rt(), Ct();
    }
    const q = A(!1);
    function Ne(r, y = !1) {
      if (!y && q.value)
        return;
      let C = r, B = r;
      V.value = g.value, s.wrapAround ? B = ca({
        val: C,
        max: ie.value,
        min: re.value
      }) : C = Te({
        val: C,
        max: ie.value,
        min: re.value
      }), i("slide-start", {
        slidingToIndex: r,
        currentSlideIndex: g.value,
        prevSlideIndex: V.value,
        slidesCount: k.value
      }), rt(), q.value = !0, g.value = C, B !== C && ut.pause(), i("update:modelValue", B), c = setTimeout(() => {
        s.wrapAround && B !== C && (ut.resume(), g.value = B, i("loop", {
          currentSlideIndex: g.value,
          slidingToIndex: r
        })), i("slide-end", {
          currentSlideIndex: g.value,
          prevSlideIndex: V.value,
          slidesCount: k.value
        }), q.value = !1, Ke();
      }, s.transition);
    }
    function De(r = !1) {
      Ne(g.value + s.itemsToScroll, r);
    }
    function We(r = !1) {
      Ne(g.value - s.itemsToScroll, r);
    }
    function _e() {
      Me(), me(), se(), Ke();
    }
    U(() => [p.value, t.breakpoints], () => Me(), { deep: !0 }), U(() => t.autoplay, () => Ke());
    const ut = U(() => t.modelValue, (r) => {
      r !== g.value && Ne(Number(r), !0);
    });
    i("before-init");
    const Pe = u(() => {
      if (!s.wrapAround)
        return { before: 0, after: 0 };
      if (ne.value)
        return { before: b.length, after: b.length };
      const r = Number(s.itemsToShow), y = Math.ceil(r + (s.itemsToScroll - 1)), C = y - E.value, B = y - (k.value - (E.value + 1));
      return {
        before: Math.max(0, C),
        after: Math.max(0, B)
      };
    }), oe = u(() => Pe.value.before ? ne.value ? Q.value.slice(-1 * Pe.value.before).reduce((r, y) => r + y[H.value] + s.gap, 0) * -1 : Pe.value.before * ue.value * -1 : 0), st = u(() => {
      var r;
      if (ne.value) {
        const y = (g.value % b.length + b.length) % b.length;
        return jt({
          slideSize: (r = Q.value[y]) === null || r === void 0 ? void 0 : r[H.value],
          viewportSize: Oe.value[H.value],
          align: s.snapAlign
        });
      }
      return jt({
        align: s.snapAlign,
        itemsToShow: +s.itemsToShow
      });
    }), Je = u(() => {
      let r = 0;
      if (ne.value) {
        if (g.value < 0 ? r = Q.value.slice(g.value).reduce((y, C) => y + C[H.value] + s.gap, 0) * -1 : r = Q.value.slice(0, g.value).reduce((y, C) => y + C[H.value] + s.gap, 0), r -= st.value, !s.wrapAround) {
          const y = Q.value.reduce((C, B) => C + B[H.value] + s.gap, 0) - Oe.value[H.value] - s.gap;
          r = Te({
            val: r,
            max: y,
            min: 0
          });
        }
      } else {
        let y = g.value - st.value;
        s.wrapAround || (y = Te({
          val: y,
          max: k.value - +s.itemsToShow,
          min: 0
        })), r = y * ue.value;
      }
      return r * (le.value ? 1 : -1);
    }), wt = u(() => {
      var r, y;
      if (!ne.value) {
        const R = g.value - st.value;
        return s.wrapAround ? {
          min: Math.floor(R),
          max: Math.ceil(R + Number(s.itemsToShow) - 1)
        } : {
          min: Math.floor(Te({
            val: R,
            max: k.value - Number(s.itemsToShow),
            min: 0
          })),
          max: Math.ceil(Te({
            val: R + Number(s.itemsToShow) - 1,
            max: k.value - 1,
            min: 0
          }))
        };
      }
      let C = 0;
      {
        let R = 0, Y = 0 - Pe.value.before;
        const x = Math.abs(Je.value + oe.value);
        for (; R <= x; ) {
          const ee = (Y % b.length + b.length) % b.length;
          R += ((r = Q.value[ee]) === null || r === void 0 ? void 0 : r[H.value]) + s.gap, Y++;
        }
        C = Y - 1;
      }
      let B = 0;
      {
        let R = C, Y = 0;
        for (R < 0 ? Y = Q.value.slice(0, R).reduce((x, ee) => x + ee[H.value] + s.gap, 0) - Math.abs(Je.value + oe.value) : Y = Q.value.slice(0, R).reduce((x, ee) => x + ee[H.value] + s.gap, 0) - Math.abs(Je.value); Y < Oe.value[H.value]; ) {
          const x = (R % b.length + b.length) % b.length;
          Y += ((y = Q.value[x]) === null || y === void 0 ? void 0 : y[H.value]) + s.gap, R++;
        }
        B = R - 1;
      }
      return {
        min: Math.floor(C),
        max: Math.ceil(B)
      };
    }), Rt = u(() => {
      if (s.slideEffect === "fade")
        return;
      const r = _.value ? "Y" : "X", y = _.value ? de.y : de.x;
      let C = Je.value + y;
      if (!s.wrapAround && s.preventExcessiveDragging) {
        let B = 0;
        ne.value ? B = Q.value.reduce((x, ee) => x + ee[H.value], 0) : B = (k.value - Number(s.itemsToShow)) * ue.value;
        const R = le.value ? 0 : -1 * B, Y = le.value ? B : 0;
        C = Te({
          val: C,
          min: R,
          max: Y
        });
      }
      return `translate${r}(${C}px)`;
    }), Mt = u(() => ({
      "--vc-transition-duration": q.value ? Et(s.transition, "ms") : void 0,
      "--vc-slide-gap": Et(s.gap),
      "--vc-carousel-height": Et(s.height),
      "--vc-cloned-offset": Et(oe.value)
    })), Dt = { slideTo: Ne, next: De, prev: We }, dt = $t({
      activeSlide: E,
      config: s,
      currentSlide: g,
      isSliding: q,
      isVertical: _,
      maxSlide: ie,
      minSlide: re,
      nav: Dt,
      normalizedDir: F,
      slideRegistry: a,
      slideSize: D,
      slides: b,
      slidesCount: k,
      viewport: d,
      visibleRange: wt
    });
    aa(xe, dt);
    const Ue = $t({
      config: s,
      currentSlide: g,
      maxSlide: ie,
      middleSlide: W,
      minSlide: re,
      slideSize: D,
      slidesCount: k
    });
    return n({
      data: Ue,
      nav: Dt,
      next: De,
      prev: We,
      restartCarousel: _e,
      slideTo: Ne,
      updateBreakpointsConfig: Me,
      updateSlideSize: se,
      updateSlidesData: me
    }), () => {
      var r;
      const y = o.default || o.slides, C = (y == null ? void 0 : y(Ue)) || [], { before: B, after: R } = Pe.value, Y = Wt({
        slides: b,
        position: "before",
        toShow: B
      }), x = Wt({
        slides: b,
        position: "after",
        toShow: R
      }), ee = [...Y, ...C, ...x];
      if (!s.enabled || !ee.length)
        return X("section", {
          ref: T,
          class: ["carousel", "is-disabled"]
        }, ee);
      const ct = ((r = o.addons) === null || r === void 0 ? void 0 : r.call(o, Ue)) || [], Qe = X("ol", {
        class: "carousel__track",
        style: { transform: Rt.value },
        onMousedownCapture: s.mouseDrag ? Z : null,
        onTouchstartPassiveCapture: s.touchDrag ? Z : null
      }, ee), vt = X("div", { class: "carousel__viewport", ref: d }, Qe);
      return X("section", {
        ref: T,
        class: [
          "carousel",
          `is-${F.value}`,
          `is-effect-${s.slideEffect}`,
          {
            "is-vertical": _.value,
            "is-sliding": q.value,
            "is-dragging": lt.value,
            "is-hover": $e.value
          }
        ],
        dir: F.value,
        style: Mt.value,
        "aria-label": s.i18n.ariaGallery,
        tabindex: "0",
        onFocus: ye,
        onBlur: Le,
        onMouseenter: Nt,
        onMouseleave: nt
      }, [vt, ct, X(Ka)]);
    };
  }
});
var zt;
(function(t) {
  t.arrowDown = "arrowDown", t.arrowLeft = "arrowLeft", t.arrowRight = "arrowRight", t.arrowUp = "arrowUp";
})(zt || (zt = {}));
const Qt = (t) => `icon${t.charAt(0).toUpperCase() + t.slice(1)}`, Qa = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function Za(t) {
  return t in zt;
}
const Zt = (t) => t && Za(t), ea = pe({
  props: {
    name: {
      type: String,
      required: !0,
      validator: Zt
    },
    title: {
      type: String,
      default: (t) => t.name ? z.i18n[Qt(t.name)] : ""
    }
  },
  setup(t) {
    const o = ht(xe, null);
    return () => {
      const i = t.name;
      if (!i || !Zt(i))
        return;
      const n = Qa[i], l = X("path", { d: n }), a = (o == null ? void 0 : o.config.i18n[Qt(i)]) || t.title, b = X("title", a);
      return X("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": a
      }, [b, l]);
    };
  }
}), el = pe({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(t, { slots: o, attrs: i }) {
    const n = ht(xe);
    if (!n)
      return () => "";
    const { next: l, prev: a } = o, b = () => ({
      btt: "arrowDown",
      ltr: "arrowLeft",
      rtl: "arrowRight",
      ttb: "arrowUp"
    })[n.normalizedDir], k = () => ({
      btt: "arrowUp",
      ltr: "arrowRight",
      rtl: "arrowLeft",
      ttb: "arrowDown"
    })[n.normalizedDir], T = u(() => !n.config.wrapAround && n.currentSlide <= n.minSlide), d = u(() => !n.config.wrapAround && n.currentSlide >= n.maxSlide);
    return () => {
      const { i18n: D } = n.config, p = X("button", Object.assign(Object.assign({ type: "button", disabled: T.value, "aria-label": D.ariaPreviousSlide, title: D.ariaPreviousSlide, onClick: n.nav.prev }, i), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": T.value },
        i.class
      ] }), (a == null ? void 0 : a()) || X(ea, { name: b() })), s = X("button", Object.assign(Object.assign({ type: "button", disabled: d.value, "aria-label": D.ariaNextSlide, title: D.ariaNextSlide, onClick: n.nav.next }, i), { class: [
        "carousel__next",
        { "carousel__next--disabled": d.value },
        i.class
      ] }), (l == null ? void 0 : l()) || X(ea, { name: k() }));
      return [p, s];
    };
  }
}), tl = pe({
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
    const o = ht(xe);
    if (!o)
      return () => "";
    const i = u(() => o.config.itemsToShow), n = u(() => jt({
      align: o.config.snapAlign,
      itemsToShow: i.value
    })), l = u(() => t.paginateByItemsToShow && i.value > 1), a = u(() => Math.ceil((o.activeSlide - n.value) / i.value)), b = u(() => Math.ceil(o.slidesCount / i.value)), k = (T) => ca(l.value ? {
      val: a.value,
      max: b.value - 1,
      min: 0
    } : {
      val: o.activeSlide,
      max: o.maxSlide,
      min: o.minSlide
    }) === T;
    return () => {
      var T, d;
      const D = [];
      for (let p = l.value ? 0 : o.minSlide; p <= (l.value ? b.value - 1 : o.maxSlide); p++) {
        const s = da(o.config.i18n[l.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: p + 1
        }), g = k(p), E = X("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": g
          },
          "aria-label": s,
          "aria-pressed": g,
          "aria-controls": (d = (T = o.slides[p]) === null || T === void 0 ? void 0 : T.exposed) === null || d === void 0 ? void 0 : d.id,
          title: s,
          disabled: t.disableOnClick,
          onClick: () => o.nav.slideTo(l.value ? Math.floor(p * +o.config.itemsToShow + n.value) : p)
        }), V = X("li", { class: "carousel__pagination-item", key: p }, E);
        D.push(V);
      }
      return X("ol", { class: "carousel__pagination" }, D);
    };
  }
}), ta = pe({
  name: "CarouselSlide",
  props: {
    id: {
      type: String,
      default: (t) => t.isClone ? void 0 : wa()
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
    const l = ht(xe);
    if (aa(xe, void 0), !l)
      return () => "";
    const a = A(t.index), b = (E) => {
      a.value = E;
    }, k = Da(), T = () => {
      const E = k.vnode.el;
      return E ? E.getBoundingClientRect() : { width: 0, height: 0 };
    };
    n({
      id: t.id,
      setIndex: b,
      getBoundingRect: T
    });
    const d = u(() => a.value === l.activeSlide), D = u(() => a.value === l.activeSlide - 1), p = u(() => a.value === l.activeSlide + 1), s = u(() => a.value >= l.visibleRange.min && a.value <= l.visibleRange.max), g = u(() => {
      if (l.config.itemsToShow === "auto")
        return;
      const E = l.config.itemsToShow, V = l.config.gap > 0 && E > 1 ? `calc(${100 / E}% - ${l.config.gap * (E - 1) / E}px)` : `${100 / E}%`;
      return l.isVertical ? { height: V } : { width: V };
    });
    return l.slideRegistry.registerSlide(k, t.index), Ia(() => {
      l.slideRegistry.unregisterSlide(k);
    }), t.isClone && (qt(() => {
      Jt(k.vnode);
    }), Ta(() => {
      Jt(k.vnode);
    })), () => {
      var E, V;
      return l.config.enabled ? X("li", {
        style: [o.style, Object.assign({}, g.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": t.isClone,
          "carousel__slide--visible": s.value,
          "carousel__slide--active": d.value,
          "carousel__slide--prev": D.value,
          "carousel__slide--next": p.value,
          "carousel__slide--sliding": l.isSliding
        },
        onFocusin: () => {
          l.viewport && (l.viewport.scrollLeft = 0), l.nav.slideTo(a.value);
        },
        id: t.isClone ? void 0 : t.id,
        "aria-hidden": t.isClone || void 0
      }, (V = i.default) === null || V === void 0 ? void 0 : V.call(i, {
        currentIndex: a.value,
        isActive: d.value,
        isClone: t.isClone,
        isPrev: D.value,
        isNext: p.value,
        isSliding: l.isSliding,
        isVisible: s.value
      })) : (E = i.default) === null || E === void 0 ? void 0 : E.call(i);
    };
  }
}), al = (t, o, i, n) => {
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
}, yt = (t, o, i, n = []) => {
  if (t.extractTitleFromColumn) {
    let l = n.find((a) => a.key === t.extractTitleFromColumn);
    if (l)
      return yt(l, o, i, n);
  }
  if (t.formatter && typeof t.formatter == "function") {
    let l = t.formatter(o[t.key], o, t, i);
    return l.startsWith("__:") ? Va(l.substring(3)) : l;
  }
  return o[t.key];
}, ll = (t, o, i) => {
  if (!t.colspan) return -1;
  let n = o;
  return i.forEach((l) => {
    let a = Gt(t, l);
    a > 0 && a < n && (n = a);
  }), n;
}, Gt = (t, o) => t.colspan === !1 ? !1 : typeof t.colspan == "function" ? t.colspan(o) : t.colspan, va = (t, o) => typeof t.preferSlot > "u" ? !0 : t.preferSlot === !1 ? !1 : typeof t.preferSlot == "function" ? t.preferSlot(o) : !0, nl = (t, o, i) => {
  if (typeof t != "object" || !t.key || o.indexOf(t.key) > -1) return !1;
  let n = Gt(t, i);
  return typeof t.colspan > "u" ? !0 : (typeof t.colspan < "u" && (typeof t.colspan == "function" ? n = parseInt(t.colspan(i)) : n = parseInt(t.colspan)), n > 0);
}, ol = (t = []) => {
  if (t.length > 0) {
    for (let o = 0; o < t.length; ++o)
      if (t[o].sortable) return t[o].key;
  }
  return "";
}, il = (t, o) => {
  if (t.length > 0) {
    for (let i = 0; i < t.length; ++i)
      if (t[i].key === o) return t[i];
  }
  return null;
}, fa = (t) => {
  let o = [];
  return t.class && o.push(t.class), t.type && o.push(`is-${t.type}`), o.join(" ");
}, Ht = /* @__PURE__ */ pe({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new na() },
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
    const i = o, n = t, l = A(n.modelValue), a = A(l.value[n.column.key]), b = A(null);
    U(a, (p) => {
      const s = JSON.parse(JSON.stringify(l.value));
      s[n.column.key] = p, i("update:modelValue", s);
    }), U(() => n.modelValue, (p) => {
      l.value = p, a.value = l.value[n.column.key];
    });
    const k = u(() => ({ ...n.column.slotData, item: l.value })), T = u(() => {
      var p, s, g, E;
      if ((p = n.column.field) != null && p.modalData && typeof ((s = n.column.field) == null ? void 0 : s.modalData) == "object")
        for (let V in n.column.field.modalData)
          if (typeof ((g = n.column.field) == null ? void 0 : g.modalData[V]) == "string" && n.column.field.modalData[V].startsWith("prop:")) {
            let W = n.column.field.modalData[V].substring(5);
            l.value[W];
          } else
            n.column.field.modalData[V];
      return (E = n.column.field) == null ? void 0 : E.modalData;
    }), d = u(() => typeof n.column.field == "string" && n.column.field.startsWith("prop:") ? La(n.column.field, l.value) : n.column.field), D = u(() => {
      var p, s, g, E;
      return n.column.type === gt.Field ? !((s = (p = n.column) == null ? void 0 : p.field) != null && s.label) && (n.column.ensureFieldLabel || [
        Kt.Switch,
        Kt.Check
      ].includes((g = n.column.field) == null ? void 0 : g.type)) ? n.column.label : (E = n.column.field) == null ? void 0 : E.label : "";
    });
    return (p, s) => {
      const g = Se("lkt-anchor"), E = Se("lkt-button"), V = Se("lkt-field");
      return p.column.type === h(gt).Anchor ? (v(), O(g, ae({ key: 0 }, p.column.anchor, { prop: l.value }), {
        default: P(() => [
          et(tt(h(yt)(p.column, l.value, p.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : p.column.type === h(gt).Button ? (v(), O(E, ae({ key: 1 }, p.column.button, { prop: l.value }), {
        default: P(() => [
          et(tt(h(yt)(p.column, l.value, p.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : p.column.type === h(gt).Field && p.hasInlineEditPerm ? (v(), O(V, ae({ key: 2 }, d.value, {
        "read-mode": !p.column.editable || !p.editModeEnabled,
        ref: (W) => b.value = W,
        "slot-data": k.value,
        label: D.value,
        "modal-data": T.value,
        prop: l.value,
        modelValue: a.value,
        "onUpdate:modelValue": s[0] || (s[0] = (W) => a.value = W)
      }), null, 16, ["read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : p.column.type === h(gt).Field ? (v(), O(V, ae({ key: 3 }, d.value, {
        "read-mode": "",
        ref: (W) => b.value = W,
        "slot-data": k.value,
        label: D.value,
        "modal-data": T.value,
        prop: l.value,
        "model-value": a.value
      }), null, 16, ["slot-data", "label", "modal-data", "prop", "model-value"])) : (v(), w(G, { key: 4 }, [
        et(tt(h(yt)(p.column, l.value, p.i, p.columns)), 1)
      ], 64));
    };
  }
}), bt = class bt {
};
bt.navButtonSlot = "", bt.createButtonSlot = "", bt.defaultEmptySlot = void 0;
let fe = bt;
const rl = ["data-i", "data-draggable"], ul = ["data-role", "data-i"], sl = {
  key: 1,
  class: "lkt-table-nav-cell"
}, dl = { class: "lkt-table-nav-container" }, cl = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, vl = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, fl = ["colspan"], pl = ["colspan"], ml = ["data-column", "colspan", "title"], gl = /* @__PURE__ */ pe({
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
    const i = la(), n = o, l = t, a = A(l.modelValue);
    let b = typeof l.rowDisplayType == "function" ? l.rowDisplayType(a.value, l.i) : l.rowDisplayType;
    b || (b = ke.Auto);
    const k = [ke.Auto, ke.PreferCustomItem].includes(b), T = [ke.Auto, ke.PreferItem].includes(b), d = (c) => n("click", c), D = u(() => {
      let c = [], I = !1;
      return typeof l.disabledDrag == "function" ? I = l.disabledDrag(a.value) : I = ie.value === !0, !I && l.sortable && l.isDraggable ? c.push("handle") : I && c.push("disabled"), c.join(" ");
    }), p = u(() => fe.navButtonSlot !== ""), s = u(() => fe.navButtonSlot), g = () => {
      n("item-up", l.i);
    }, E = () => {
      n("item-down", l.i);
    }, V = () => {
      n("item-drop", l.i);
    };
    U(() => l.modelValue, (c) => a.value = c), U(a, (c) => {
      n("update:modelValue", c);
    }, { deep: !0 });
    const W = u(() => typeof l.renderDrag == "function" ? l.renderDrag(a.value) : l.renderDrag === !0), ie = u(() => typeof l.disabledDrag == "function" ? l.disabledDrag(a.value) : l.disabledDrag === !0), re = u(() => D.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), J = u(() => {
      let c = [];
      return k && c.push("type-custom-item"), T && c.push("type-item"), typeof l.itemContainerClass == "function" ? c.push(l.itemContainerClass(a.value, l.i)) : l.itemContainerClass !== "" && c.push(l.itemContainerClass), c.join(" ");
    });
    return (c, I) => {
      const ue = Se("lkt-button");
      return v(), w("tr", {
        "data-i": c.i,
        "data-draggable": c.isDraggable,
        class: K(J.value)
      }, [
        c.sortable && c.editModeEnabled && W.value ? (v(), w("td", {
          key: 0,
          "data-role": re.value,
          class: K(D.value),
          "data-i": c.i
        }, I[2] || (I[2] = [
          ve("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]), 10, ul)) : L("", !0),
        c.addNavigation && c.editModeEnabled ? (v(), w("td", sl, [
          ve("div", dl, [
            he(ue, {
              palette: "table-nav",
              disabled: c.i === 0,
              onClick: g
            }, {
              default: P(() => [
                p.value ? (v(), O(qe(s.value), {
                  key: 0,
                  direction: "up"
                })) : (v(), w("i", cl))
              ]),
              _: 1
            }, 8, ["disabled"]),
            he(ue, {
              palette: "table-nav",
              disabled: c.latestRow,
              onClick: E
            }, {
              default: P(() => [
                p.value ? (v(), O(qe(s.value), {
                  key: 0,
                  direction: "down"
                })) : (v(), w("i", vl))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : L("", !0),
        h(k) && h(i)[`item-${c.i}`] ? (v(), w("td", {
          key: "td" + c.i,
          colspan: c.visibleColumns.length
        }, [
          M(c.$slots, `item-${c.i}`, {
            item: a.value,
            index: c.i,
            editing: c.editModeEnabled,
            canCreate: c.canCreate,
            canRead: c.canRead,
            canUpdate: c.canEdit,
            canDrop: c.canDrop,
            isLoading: c.isLoading,
            doDrop: () => V()
          })
        ], 8, fl)) : h(T) && h(i).item ? (v(), w("td", {
          key: "td" + c.i,
          colspan: c.visibleColumns.length
        }, [
          M(c.$slots, "item", {
            item: a.value,
            index: c.i,
            editing: c.editModeEnabled,
            canCreate: c.canCreate,
            canRead: c.canRead,
            canUpdate: c.canEdit,
            canDrop: c.canDrop,
            isLoading: c.isLoading,
            doDrop: () => V()
          })
        ], 8, pl)) : (v(!0), w(G, { key: 4 }, be(c.visibleColumns, (F) => (v(), w(G, null, [
          h(nl)(F, c.emptyColumns, a.value) ? (v(), w("td", {
            key: "td" + c.i,
            "data-column": F.key,
            colspan: h(Gt)(F, a.value),
            title: h(yt)(F, a.value, c.i, c.visibleColumns),
            class: K(h(fa)(F)),
            onClick: I[1] || (I[1] = (le) => d(le))
          }, [
            c.$slots[F.key] && h(va)(F, a.value) ? M(c.$slots, F.key, {
              key: 0,
              value: a.value[F.key],
              item: a.value,
              column: F,
              i: c.i
            }) : a.value ? (v(), O(Ht, {
              key: 1,
              modelValue: a.value,
              "onUpdate:modelValue": I[0] || (I[0] = (le) => a.value = le),
              column: F,
              columns: c.visibleColumns,
              "edit-mode-enabled": c.editModeEnabled,
              "has-inline-edit-perm": c.hasInlineEditPerm,
              i: c.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : L("", !0)
          ], 10, ml)) : L("", !0)
        ], 64))), 256))
      ], 10, rl);
    };
  }
}), Ut = /* @__PURE__ */ pe({
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
    var d;
    const i = o, n = t, l = u(() => fe.createButtonSlot !== ""), a = u(() => fe.createButtonSlot), b = {
      ...(d = n.config) == null ? void 0 : d.modalData,
      beforeClose: (D) => {
        "itemCreated" in D && D.itemCreated === !0 && i("append", D.item);
      }
    }, k = {
      ...n.config
    };
    k.modalData = b;
    const T = () => {
      var D;
      if (!((D = n.config) != null && D.modal)) {
        i("click");
        return;
      }
    };
    return (D, p) => {
      const s = Se("lkt-button");
      return v(), O(s, ae(k, {
        disabled: D.disabled,
        onClick: T
      }), {
        default: P(() => [
          l.value ? (v(), O(qe(a.value), { key: 0 })) : L("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), yl = ["data-column", "data-sortable", "data-sort", "colspan", "title"], bl = /* @__PURE__ */ pe({
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
  setup(t, { emit: o }) {
    const i = o, n = t, l = u(() => ll(n.column, n.amountOfColumns, n.items)), a = u(() => n.column.sortable === !0), b = u(() => a.value && n.sortBy === n.column.key ? n.sortDirection : ""), k = u(() => oa(n.column.label)), T = u(() => a.value && n.sortBy === n.column.key ? n.sortDirection === Ge.Asc ? Be.defaultTableSortAscIcon : n.sortDirection === Ge.Desc ? Be.defaultTableSortDescIcon : "" : ""), d = () => i("click", n.column);
    return (D, p) => (v(), w("th", {
      "data-column": D.column.key,
      "data-sortable": a.value,
      "data-sort": b.value,
      colspan: l.value,
      title: k.value,
      class: K(h(fa)(D.column)),
      onClick: d
    }, [
      ve("div", null, [
        et(tt(k.value) + " ", 1),
        T.value ? (v(), w("i", {
          key: 0,
          class: K(T.value)
        }, null, 2)) : L("", !0)
      ])
    ], 10, yl));
  }
}), hl = ["id"], kl = { class: "lkt-table-page-buttons" }, Sl = { class: "switch-edition-mode" }, Cl = { class: "switch-edition-mode" }, wl = {
  key: 0,
  class: "lkt-table-page-buttons"
}, Dl = {
  key: 1,
  class: "lkt-table-page-filters"
}, Il = { class: "lkt-table" }, Tl = { key: 0 }, Bl = { key: 0 }, Al = {
  key: 0,
  "data-role": "drag-indicator"
}, El = { key: 1 }, Vl = ["id"], Ll = ["id"], Nl = ["data-i"], Rl = ["id"], Ml = ["data-i"], Ol = ["id"], $l = { class: "lkt-carousel-slide" }, _l = { class: "lkt-carousel-slide" }, Pl = {
  key: 2,
  class: "lkt-table-empty"
}, Ul = {
  key: 4,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, Fl = /* @__PURE__ */ pe({
  __name: "LktTable",
  props: /* @__PURE__ */ Aa({
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
    createEnabledValidator: { type: Function }
  }, Na(Ra)),
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
    var xt, Xt;
    const n = i, l = la(), a = t, b = A(typeof a.sorter == "function" ? a.sorter : al), k = A(ol(a.columns)), T = A(Ge.Asc), d = A(a.modelValue), D = A(null), p = A(a.columns), s = A((xt = a.paginator) == null ? void 0 : xt.modelValue), g = A(a.loading), E = A(!1), V = A(a.perms), W = A(null), ie = A(null), re = A(null), J = A({}), c = A(new $a({ items: d.value }, a.dataStateConfig)), I = A(a.editMode), ue = A(0), F = A(null), le = A(((Xt = a.carousel) == null ? void 0 : Xt.currentSlide) || 0), _ = A(ze(a.saveButton, Be.defaultSaveButton)), ne = A(ze(a.createButton, Be.defaultCreateButton)), H = A(ze(a.editModeButton, Be.defaultEditModeButton)), Me = A(ze(a.groupButton, Be.defaultGroupButton));
    U(() => a.saveButton, (e) => _.value = ze(a.saveButton, Be.defaultSaveButton)), U(() => a.createButton, (e) => ne.value = ze(a.createButton, Be.defaultCreateButton)), U(() => a.editModeButton, (e) => H.value = ze(a.editModeButton, Be.defaultEditModeButton));
    const Ae = A(!1);
    U(g, (e) => n("update:loading", e)), U(s, (e) => n("page", e));
    const Xe = (e) => {
      V.value = e;
    }, Q = (e) => {
      var f;
      Array.isArray(e.data) && ((!a.paginator || ![At.LoadMore, At.Infinite].includes((f = a.paginator) == null ? void 0 : f.type)) && d.value.splice(0, d.value.length), d.value = [...d.value, ...e.data]), g.value = !1, E.value = !0, c.value.store({ items: d.value }).turnStoredIntoOriginal(), Ae.value = !1, Bt(() => {
        oe(), ge.value, n("read-response", e);
      });
    }, Lt = () => Bt(() => g.value = !0), Oe = () => {
      W.value.doRefresh();
    }, Ce = Ma(12), se = u(() => {
      if (!a.hideEmptyColumns) return [];
      let e = [];
      return p.value.forEach((f) => {
        let $ = f.key, j = !1;
        d.value.forEach((te) => {
          if (typeof te.checkEmpty == "function")
            return te.checkEmpty(te);
          te[$] && (j = !0);
        }), j || e.push($);
      }), e;
    }), me = u(() => p.value.filter((e) => !e.hidden)), at = u(() => p.value.filter((e) => e.isForRowKey)), Ee = u(() => p.value.map((e) => e.key)), kt = u(() => {
      let e = [];
      for (let f in l) Ee.value.indexOf(f) !== -1 && e.push(f);
      return e;
    }), St = u(() => {
      let e = [];
      for (let f in l) f.indexOf("slide-") !== -1 && e.push(f);
      return e;
    }), Ve = u(() => {
      var e;
      return a.hiddenSave || g.value || !((e = _.value) != null && e.resource || _.value.type) ? !1 : I.value && Ae.value ? !0 : I.value;
    }), we = u(() => ft.value && d.value.length >= a.requiredItemsForTopCreate || De.value ? !0 : Ve.value || I.value && ye.value), ge = u(() => {
      var e, f;
      return ue.value, typeof ((e = _.value) == null ? void 0 : e.disabled) == "function" ? _.value.disabled({
        value: d.value,
        dataState: c.value
      }) : typeof ((f = _.value) == null ? void 0 : f.disabled) == "boolean" ? _.value.disabled : !Ae.value;
    }), de = u(() => d.value.length), $e = u(() => {
      var e;
      return {
        items: d.value,
        ...(e = _.value) == null ? void 0 : e.resourceData
      };
    }), lt = u(() => a.titleTag === "" ? "h2" : a.titleTag), Nt = u(() => a.wrapContentTag === "" ? "div" : a.wrapContentTag), nt = u(() => oa(a.title)), ot = u(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }), ye = u(() => V.value.includes(Ie.Create)), Le = u(() => V.value.includes("read")), Z = u(() => V.value.includes(Ie.Update)), it = u(() => V.value.includes(Ie.Edit)), Ye = u(() => V.value.includes(Ie.InlineEdit)), Ct = u(() => V.value.includes(Ie.ModalCreate)), rt = u(() => V.value.includes(Ie.InlineCreate)), Ke = u(() => V.value.includes(Ie.InlineCreateEver)), q = u(() => V.value.includes(Ie.Drop)), Ne = u(() => V.value.includes(Ie.SwitchEditMode)), De = u(() => !Ne.value || !Z.value && !q.value || !Z.value && q.value ? !1 : !g.value), We = u(() => {
      var e;
      return (typeof ((e = a.paginator) == null ? void 0 : e.type) < "u" && [At.LoadMore, At.Infinite].includes(a.paginator.type) || !g.value) && d.value.length > 0;
    }), _e = u(() => p.value.find((e) => e.isForAccordionHeader)), ut = (e, f) => typeof a.customItemSlotName == "function" ? a.customItemSlotName(e, f) : "", Pe = (e) => {
      let f = e.target;
      if (typeof f.dataset.column > "u")
        do
          f = f.parentNode;
        while (typeof f.dataset.column > "u" && f.tagName !== "TABLE" && f.tagName !== "body");
      if (f.tagName === "TD" && (f = f.parentNode, f = f.dataset.i, typeof f < "u"))
        return d.value[f];
    }, oe = () => {
      ue.value = Pa();
    }, st = (e) => d.value[e], Je = (e) => {
      var f;
      return (f = D.value) == null ? void 0 : f.querySelector(`[data-i="${e}"]`);
    }, wt = (e) => {
      e && e.sortable && (d.value = d.value.sort((f, $) => b.value(f, $, e, T.value)), T.value = T.value === Ge.Asc ? Ge.Desc : Ge.Asc, k.value = e.key, oe(), n("sort", [k.value, T.value]));
    }, Rt = (e) => {
      n("click", e);
    }, Mt = (e) => {
      var $, j, te, ce, Tt, mt, S, m;
      let f = parseInt((ce = (te = (j = ($ = e == null ? void 0 : e.originalEvent) == null ? void 0 : $.toElement) == null ? void 0 : j.closest("tr")) == null ? void 0 : te.dataset) == null ? void 0 : ce.i);
      return !(typeof ((Tt = a.drag) == null ? void 0 : Tt.isValid) == "function" && !((mt = a.drag) != null && mt.isValid(d.value[f])) || typeof ((S = a.drag) == null ? void 0 : S.isValid) == "boolean" && !((m = a.drag) != null && m.isValid));
    }, Dt = (e) => {
      var f, $;
      return typeof ((f = a.drag) == null ? void 0 : f.isDraggable) == "function" ? ($ = a.drag) == null ? void 0 : $.isDraggable(e) : !0;
    }, dt = () => {
      if (ye.value) {
        n("click-create");
        return;
      }
      if (rt.value || Ke.value) {
        if (typeof a.newValueGenerator == "function") {
          let e = a.newValueGenerator();
          if (typeof e == "object" || a.type !== He.Table) {
            d.value.push(e);
            return;
          }
        }
        d.value.push({});
      } else
        n("click-create");
    }, Ue = (e) => {
      d.value.push(e);
    }, r = () => g.value = !0, y = () => g.value = !1, C = (e, f) => {
      var $, j, te;
      if (!(($ = _.value) != null && $.type && [
        _t.Split,
        _t.SplitEver,
        _t.SplitLazy
      ].includes((j = _.value) == null ? void 0 : j.type))) {
        if (n("before-save"), (te = _.value) != null && te.resource && (g.value = !1, !f.success)) {
          n("error", f.httpStatus);
          return;
        }
        c.value.turnStoredIntoOriginal(), Ae.value = !1, n("save", f);
      }
    }, B = (e, f, $) => {
      if ($ >= e.length) {
        let j = $ - e.length + 1;
        for (; j--; ) e.push(void 0);
      }
      return e.splice($, 0, e.splice(f, 1)[0]), e;
    }, R = (e) => {
      B(d.value, e, e - 1), oe();
    }, Y = (e) => {
      B(d.value, e, e + 1), oe();
    }, x = (e) => {
      d.value.splice(e, 1), oe();
    }, ee = () => {
      var e;
      J.value && typeof ((e = J.value) == null ? void 0 : e.destroy) == "function" && (J.value.destroy(), J.value = {});
    }, ct = () => {
      F.value || (F.value = document.getElementById("lkt-table-body-" + Ce)), J.value = new _a(F.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let f = e.oldIndex, $ = e.newIndex;
          d.value.splice($, 0, d.value.splice(f, 1)[0]), oe(), n("drag-end", d.value[$]);
        },
        onMove: function(e, f) {
          return Mt(e);
        }
      });
    }, Qe = (e, f, $ = !1) => {
      let j = [ue.value, Ce, "row", f];
      return $ && j.push("hidden"), at.value.forEach((te) => {
        let ce = String(e[te.key]).toLowerCase();
        ce.length > 50 && (ce = ce.substring(0, 50)), ce = Oa(ce, " ", "-"), j.push(ce);
      }), j.join("-");
    }, vt = u(() => typeof a.createEnabledValidator == "function" ? a.createEnabledValidator({ items: d.value }) : !0), ft = u(() => Ke.value || ye.value && I.value || rt.value && I.value || Ct.value && I.value), pa = u(() => [He.Ol, He.Ul].includes(a.type)), pt = (e, f) => typeof a.itemDisplayChecker == "function" ? a.itemDisplayChecker(e) : !0, It = (e, f) => typeof a.itemContainerClass == "function" ? a.itemContainerClass(e, f) : a.itemContainerClass, ma = (e, f) => _e.value ? e[_e.value.key] : "";
    qt(() => {
      var e;
      a.initialSorting && wt(il(a.columns, k.value)), c.value.store({ items: d.value }).turnStoredIntoOriginal(), Ae.value = !1, (e = a.drag) != null && e.enabled && Bt(() => {
        ct();
      });
    }), U(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }, (e) => {
      e ? ct() : ee();
    }), U(() => a.type, (e) => {
      var f;
      (f = a.drag) != null && f.enabled ? ct() : ee();
    }), U(() => a.perms, (e) => V.value = e), U(V, (e) => n("update:perms", e)), U(I, (e) => {
      n("update:editMode", e);
    }), U(() => a.editMode, (e) => I.value = e), U(() => a.columns, (e) => p.value = e, { deep: !0 }), U(() => a.modelValue, (e) => {
      d.value = e;
    }, { deep: !0 }), U(d, (e) => {
      c.value.increment({ items: e }), Ae.value = c.value.changed(), n("update:modelValue", e);
    }, { deep: !0 }), o({
      getItemByEvent: Pe,
      getItemByIndex: st,
      getRowByIndex: Je,
      doRefresh: Oe,
      doRemoveIndex: (e) => {
        d.value.splice(e, 1), oe();
      },
      getHtml: () => ie.value,
      reRender: oe,
      turnStoredIntoOriginal: () => {
        c.value.turnStoredIntoOriginal(), Bt(() => {
          oe();
        });
      }
    });
    const ga = u(() => typeof fe.defaultEmptySlot < "u"), ya = u(() => fe.defaultEmptySlot), ba = u(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled ? !1 : typeof a.drag.canRender > "u" ? !0 : a.drag.canRender), ha = u(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled || typeof a.drag.isDisabled > "u" ? !1 : a.drag.isDisabled), ka = u(() => typeof a.header == "object" && Object.keys(a.header).length > 0);
    return (e, f) => {
      const $ = Se("lkt-header"), j = Se("lkt-button"), te = Se("lkt-accordion"), ce = Se("lkt-loader"), Tt = Se("lkt-paginator");
      return v(), w("section", {
        ref_key: "element",
        ref: ie,
        class: "lkt-table-page",
        id: "lkt-table-page-" + h(Ce)
      }, [
        ka.value ? (v(), O($, Re(ae({ key: 0 }, e.header)), null, 16)) : nt.value || h(l).title ? (v(), w("header", {
          key: 1,
          class: K(e.headerClass)
        }, [
          nt.value ? (v(), O(qe(lt.value), { key: 0 }, {
            default: P(() => [
              e.titleIcon ? (v(), w("i", {
                key: 0,
                class: K(e.titleIcon)
              }, null, 2)) : L("", !0),
              et(" " + tt(nt.value), 1)
            ]),
            _: 1
          })) : L("", !0),
          h(l).title ? M(e.$slots, "title", { key: 1 }) : L("", !0)
        ], 2)) : L("", !0),
        (v(), O(qe(Nt.value), {
          class: K(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: P(() => {
            var mt;
            return [
              Fe(ve("div", kl, [
                e.groupButton !== !1 ? (v(), O(j, ae({
                  key: 0,
                  ref: "groupButton"
                }, Me.value, { class: "lkt-item-crud-group-button" }), {
                  split: P(() => [
                    ve("div", Sl, [
                      Fe(he(j, ae(H.value, {
                        checked: I.value,
                        "onUpdate:checked": f[0] || (f[0] = (S) => I.value = S)
                      }), null, 16, ["checked"]), [
                        [je, De.value]
                      ])
                    ]),
                    h(l)["prev-buttons-ever"] ? M(e.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: Z.value,
                      canDrop: q.value,
                      perms: e.perms
                    }) : L("", !0),
                    h(l)["prev-buttons"] ? M(e.$slots, "prev-buttons", {
                      key: 1,
                      canUpdate: Z.value,
                      canDrop: q.value,
                      perms: e.perms
                    }) : L("", !0),
                    Fe(he(j, ae({
                      class: "lkt-table--save-button",
                      ref_key: "saveButtonRef",
                      ref: re
                    }, {
                      ..._.value,
                      disabled: ge.value,
                      resourceData: $e.value
                    }, {
                      onLoading: r,
                      onLoaded: y,
                      onClick: C
                    }), {
                      split: P(({ doClose: S, doRootClick: m }) => [
                        M(e.$slots, "button-save-split", {
                          doClose: S,
                          doRootClick: m,
                          dataState: c.value,
                          onButtonLoading: r,
                          onButtonLoaded: y
                        })
                      ]),
                      default: P(() => [
                        h(l)["button-save"] ? M(e.$slots, "button-save", {
                          key: 0,
                          items: d.value,
                          editMode: e.editMode,
                          canUpdate: !ge.value
                        }) : L("", !0)
                      ]),
                      _: 3
                    }, 16), [
                      [je, Ve.value]
                    ]),
                    ft.value && d.value.length >= e.requiredItemsForTopCreate ? (v(), O(Ut, {
                      key: 2,
                      config: ne.value,
                      disabled: !vt.value,
                      onClick: dt,
                      onAppend: Ue
                    }, null, 8, ["config", "disabled"])) : L("", !0)
                  ]),
                  _: 3
                }, 16)) : L("", !0),
                h(l)["prev-buttons-ever"] ? M(e.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: Z.value,
                  canDrop: q.value,
                  perms: e.perms
                }) : L("", !0),
                h(l)["prev-buttons"] ? M(e.$slots, "prev-buttons", {
                  key: 2,
                  canUpdate: Z.value,
                  canDrop: q.value,
                  perms: e.perms
                }) : L("", !0),
                Fe(he(j, ae({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: re
                }, {
                  ..._.value,
                  disabled: ge.value,
                  resourceData: $e.value
                }, {
                  onLoading: r,
                  onLoaded: y,
                  onClick: C
                }), {
                  split: P(({ doClose: S, doRootClick: m }) => [
                    M(e.$slots, "button-save-split", {
                      doClose: S,
                      doRootClick: m,
                      dataState: c.value,
                      onButtonLoading: r,
                      onButtonLoaded: y
                    })
                  ]),
                  default: P(() => [
                    h(l)["button-save"] ? M(e.$slots, "button-save", {
                      key: 0,
                      items: d.value,
                      editMode: e.editMode,
                      canUpdate: !ge.value
                    }) : L("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [je, Ve.value]
                ]),
                ft.value && d.value.length >= e.requiredItemsForTopCreate ? (v(), O(Ut, {
                  key: 3,
                  config: ne.value,
                  disabled: !vt.value,
                  onClick: dt,
                  onAppend: Ue
                }, null, 8, ["config", "disabled"])) : L("", !0),
                ve("div", Cl, [
                  Fe(he(j, ae(H.value, {
                    checked: I.value,
                    "onUpdate:checked": f[1] || (f[1] = (S) => I.value = S)
                  }), null, 16, ["checked"]), [
                    [je, De.value]
                  ])
                ])
              ], 512), [
                [je, we.value]
              ]),
              h(l).buttons ? (v(), w("div", wl, [
                M(e.$slots, "buttons")
              ])) : L("", !0),
              E.value && h(l).filters ? (v(), w("div", Dl, [
                M(e.$slots, "filters", {
                  items: d.value,
                  isLoading: g.value
                })
              ])) : L("", !0),
              Fe(ve("div", Il, [
                e.type === h(He).Table ? (v(), w("table", Tl, [
                  e.hideTableHeader ? L("", !0) : (v(), w("thead", Bl, [
                    ve("tr", null, [
                      ot.value && I.value ? (v(), w("th", Al)) : L("", !0),
                      e.addNavigation && I.value ? (v(), w("th", El)) : L("", !0),
                      (v(!0), w(G, null, be(me.value, (S) => (v(), w(G, null, [
                        se.value.indexOf(S.key) === -1 ? (v(), O(bl, {
                          key: 0,
                          column: S,
                          "sort-by": k.value,
                          "sort-direction": T.value,
                          "amount-of-columns": e.columns.length,
                          items: d.value,
                          onClick: (m) => wt(S)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : L("", !0)
                      ], 64))), 256))
                    ])
                  ])),
                  ve("tbody", {
                    ref_key: "tableBody",
                    ref: D,
                    id: "lkt-table-body-" + h(Ce),
                    class: K(e.itemsContainerClass)
                  }, [
                    (v(!0), w(G, null, be(d.value, (S, m) => Fe((v(), O(gl, {
                      modelValue: d.value[m],
                      "onUpdate:modelValue": (N) => d.value[m] = N,
                      key: Qe(S, m),
                      i: m,
                      "is-draggable": Dt(S),
                      sortable: ot.value,
                      "visible-columns": me.value,
                      "empty-columns": se.value,
                      "add-navigation": e.addNavigation,
                      "latest-row": m + 1 === de.value,
                      "can-drop": q.value && I.value,
                      "can-edit": it.value && Z.value && I.value,
                      "can-read": Le.value,
                      "can-create": ye.value,
                      "edit-mode-enabled": I.value,
                      "has-inline-edit-perm": Ye.value,
                      "row-display-type": e.rowDisplayType,
                      "render-drag": ba.value,
                      "disabled-drag": ha.value,
                      "is-loading": g.value,
                      "item-container-class": e.itemContainerClass,
                      onClick: Rt,
                      onItemUp: R,
                      onItemDown: Y,
                      onItemDrop: x
                    }, Ea({ _: 2 }, [
                      h(l)[`item-${m}`] ? {
                        name: `item-${m}`,
                        fn: P((N) => [
                          M(e.$slots, `item-${m}`, Re({
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
                      } : h(l).item ? {
                        name: "item",
                        fn: P((N) => [
                          M(e.$slots, "item", Re({
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
                      be(kt.value, (N) => ({
                        name: N,
                        fn: P((Ze) => [
                          M(e.$slots, N, Re({
                            [e.slotItemVar || ""]: Ze.item,
                            value: Ze.value,
                            column: Ze.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class"])), [
                      [je, pt(d.value[m])]
                    ])), 128))
                  ], 10, Vl)
                ])) : e.type === h(He).Item ? (v(), w("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: D,
                  id: "lkt-table-body-" + h(Ce),
                  class: K(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), w(G, null, be(d.value, (S, m) => (v(), w(G, {
                    key: Qe(S, m)
                  }, [
                    !e.skipTableItemsContainer && pt(S) ? (v(), w("div", {
                      key: 0,
                      class: K(["lkt-table-item", It(S, m)]),
                      "data-i": m
                    }, [
                      M(e.$slots, "item", Re({
                        [e.slotItemVar || ""]: S,
                        index: m,
                        editing: I.value,
                        canCreate: ye.value,
                        canRead: Le.value,
                        canUpdate: Z.value,
                        canDrop: q.value,
                        isLoading: g.value,
                        doDrop: () => x(m)
                      }))
                    ], 10, Nl)) : pt(S) ? M(e.$slots, "item", Re({
                      key: 1,
                      class: It(S, m),
                      dataI: m,
                      [e.slotItemVar || ""]: S,
                      index: m,
                      editing: I.value,
                      canCreate: ye.value,
                      canRead: Le.value,
                      canUpdate: Z.value,
                      canDrop: q.value,
                      isLoading: g.value,
                      doDrop: () => x(m)
                    })) : L("", !0)
                  ], 64))), 128))
                ], 10, Ll)) : e.type === h(He).Accordion ? (v(), w("div", {
                  key: 2,
                  ref_key: "tableBody",
                  ref: D,
                  id: "lkt-table-body-" + h(Ce),
                  class: K(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), w(G, null, be(d.value, (S, m) => (v(), w(G, null, [
                    [h(ke).Auto, h(ke).PreferCustomItem].includes(e.rowDisplayType) && h(l)[ut(S, m)] ? M(e.$slots, ut(S, m), {
                      key: 0,
                      item: S,
                      index: m,
                      editing: I.value,
                      isLoading: g.value
                    }) : [h(ke).Auto, h(ke).PreferCustomItem].includes(e.rowDisplayType) && h(l)[`item-${m}`] ? M(e.$slots, `item-${m}`, {
                      key: 1,
                      item: S,
                      index: m,
                      editing: I.value,
                      isLoading: g.value
                    }) : (v(), w(G, { key: 2 }, [
                      pt(S) ? (v(), O(te, ae({
                        class: ["lkt-table-item", It(S, m)],
                        "data-i": m,
                        key: Qe(S, m),
                        ref_for: !0
                      }, {
                        ...e.accordion,
                        title: ma(S)
                      }), {
                        header: P(() => [
                          he(Ht, {
                            modelValue: d.value[m],
                            "onUpdate:modelValue": (N) => d.value[m] = N,
                            i: m,
                            column: _e.value,
                            columns: me.value,
                            "edit-mode-enabled": I.value,
                            "has-inline-edit-perm": Ye.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])
                        ]),
                        default: P(() => [
                          (v(!0), w(G, null, be(me.value, (N) => {
                            var Ze, Yt;
                            return v(), w(G, null, [
                              N.key !== ((Ze = _e.value) == null ? void 0 : Ze.key) && e.$slots[N.key] && h(va)(N, d.value[m]) ? M(e.$slots, N.key, {
                                key: 0,
                                value: d.value[m][N.key],
                                item: d.value[m],
                                column: N,
                                i: m
                              }) : (v(), w(G, { key: 1 }, [
                                N.key !== ((Yt = _e.value) == null ? void 0 : Yt.key) ? (v(), O(Ht, {
                                  key: 0,
                                  modelValue: d.value[m],
                                  "onUpdate:modelValue": (Sa) => d.value[m] = Sa,
                                  i: m,
                                  column: N,
                                  columns: me.value,
                                  "edit-mode-enabled": I.value,
                                  "has-inline-edit-perm": Ye.value
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])) : L("", !0)
                              ], 64))
                            ], 64);
                          }), 256))
                        ]),
                        _: 2
                      }, 1040, ["class", "data-i"])) : L("", !0)
                    ], 64))
                  ], 64))), 256))
                ], 10, Rl)) : pa.value ? (v(), O(qe(e.type), {
                  key: 3,
                  class: K(["lkt-table-items-container", e.itemsContainerClass])
                }, {
                  default: P(() => [
                    (v(!0), w(G, null, be(d.value, (S, m) => (v(), w(G, {
                      key: Qe(S, m)
                    }, [
                      pt(S) ? (v(), w("li", {
                        key: 0,
                        class: K(["lkt-table-item", It(S, m)]),
                        "data-i": m
                      }, [
                        M(e.$slots, "item", Re({
                          [e.slotItemVar || ""]: S,
                          index: m,
                          editing: I.value,
                          canCreate: ye.value,
                          canRead: Le.value,
                          canUpdate: Z.value,
                          canDrop: q.value,
                          isLoading: g.value,
                          doDrop: () => x(m)
                        }))
                      ], 10, Ml)) : L("", !0)
                    ], 64))), 128))
                  ]),
                  _: 3
                }, 8, ["class"])) : e.type === h(He).Carousel ? (v(), w("div", {
                  key: 4,
                  ref_key: "tableBody",
                  ref: D,
                  id: "lkt-table-body-" + h(Ce),
                  class: K(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  he(h(Ja), ae({
                    modelValue: le.value,
                    "onUpdate:modelValue": f[2] || (f[2] = (S) => le.value = S)
                  }, e.carousel, {
                    "wrap-around": ((mt = e.carousel) == null ? void 0 : mt.infinite) === !0
                  }), {
                    addons: P(() => [
                      he(h(el)),
                      he(h(tl))
                    ]),
                    default: P(() => [
                      (v(!0), w(G, null, be(St.value, (S, m) => (v(), O(h(ta), {
                        key: S,
                        index: m
                      }, {
                        default: P(() => [
                          ve("div", $l, [
                            M(e.$slots, S)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (v(!0), w(G, null, be(d.value, (S, m) => (v(), O(h(ta), {
                        key: e.slide,
                        index: m
                      }, {
                        default: P(() => [
                          ve("div", _l, [
                            M(e.$slots, "item", Re({
                              [e.slotItemVar || ""]: S,
                              index: m,
                              editing: I.value,
                              canCreate: ye.value,
                              canRead: Le.value,
                              canUpdate: Z.value,
                              canDrop: q.value,
                              isLoading: g.value,
                              doDrop: () => x(m)
                            }))
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128))
                    ]),
                    _: 3
                  }, 16, ["modelValue", "wrap-around"])
                ], 10, Ol)) : L("", !0)
              ], 512), [
                [je, We.value]
              ]),
              !g.value && d.value.length === 0 ? (v(), w("div", Pl, [
                h(l).empty ? M(e.$slots, "empty", { key: 0 }) : ga.value ? (v(), O(qe(ya.value), {
                  key: 1,
                  message: e.noResultsText
                }, null, 8, ["message"])) : e.noResultsText ? (v(), w(G, { key: 2 }, [
                  et(tt(e.noResultsText), 1)
                ], 64)) : L("", !0)
              ])) : L("", !0),
              g.value ? (v(), O(ce, { key: 3 })) : L("", !0),
              ft.value || h(l).bottomButtons ? (v(), w("div", Ul, [
                ft.value && d.value.length >= e.requiredItemsForBottomCreate ? (v(), O(Ut, {
                  key: 0,
                  config: ne.value,
                  disabled: !vt.value,
                  onClick: dt,
                  onAppend: Ue
                }, null, 8, ["config", "disabled"])) : L("", !0),
                M(e.$slots, "bottom-buttons")
              ])) : L("", !0),
              e.paginator && Object.keys(e.paginator).length > 0 ? (v(), O(Tt, ae({
                key: 5,
                ref_key: "paginatorRef",
                ref: W
              }, e.paginator, {
                modelValue: s.value,
                "onUpdate:modelValue": f[3] || (f[3] = (S) => s.value = S),
                onLoading: Lt,
                onPerms: Xe,
                onResponse: Q
              }), null, 16, ["modelValue"])) : L("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, hl);
    };
  }
}), Yl = {
  install: (t) => {
    t.component("lkt-table") === void 0 && t.component("lkt-table", Fl);
  }
}, Kl = (t) => (fe.navButtonSlot = t, !0), Wl = (t) => (fe.createButtonSlot = t, !0), Jl = (t) => {
  fe.defaultEmptySlot = t;
};
export {
  en as Column,
  tn as createColumn,
  Yl as default,
  Wl as setTableCreateButtonSlot,
  Jl as setTableEmptySlot,
  Kl as setTableNavButtonSlot
};
