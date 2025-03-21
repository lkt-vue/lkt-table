import { defineComponent as ae, computed as u, ref as C, shallowReactive as Pt, watch as U, watchEffect as Lt, onMounted as jt, onBeforeUnmount as Ca, reactive as _t, provide as ta, h as Y, useId as wa, inject as st, getCurrentInstance as Ba, onUnmounted as Da, onUpdated as Ia, cloneVNode as Ta, resolveComponent as ke, createBlock as O, createElementBlock as y, unref as D, openBlock as v, normalizeProps as Re, mergeProps as ve, withCtx as z, createTextVNode as nt, toDisplayString as je, Fragment as x, withModifiers as aa, createCommentVNode as A, resolveDynamicComponent as Ee, useSlots as la, normalizeClass as ne, createElementVNode as Q, createVNode as Te, renderSlot as q, renderList as re, withDirectives as at, vShow as lt, mergeDefaults as Ea, nextTick as yt, createSlots as Yt } from "vue";
import { __ as Aa } from "lkt-i18n";
import { SortDirection as Fe, Column as na, ColumnType as kt, prepareResourceData as oa, TableRowType as et, extractI18nValue as ia, LktSettings as ye, ensureButtonConfig as Ae, TablePermission as Be, PaginatorType as St, TableType as tt, getDefaultValues as Va, Table as Ra, ButtonType as $t } from "lkt-vue-kernel";
import { Column as cn, createColumn as vn } from "lkt-vue-kernel";
import { replaceAll as ra, generateRandomString as Na } from "lkt-string-tools";
import { DataState as Ma } from "lkt-data-state";
import La from "sortablejs";
import { time as Ve } from "lkt-date-tools";
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
], _a = {
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
], j = {
  autoplay: 0,
  breakpointMode: ua[0],
  breakpoints: void 0,
  dir: sa[0],
  enabled: !0,
  gap: 0,
  height: "auto",
  i18n: _a,
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
}, ze = Symbol("carousel"), $a = (e) => {
  const o = Pt([]), i = (n) => {
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
      o.splice(a, 0, n), i(a), e("slide-registered", { slide: n, index: a });
    },
    unregisterSlide: (n) => {
      const l = o.indexOf(n);
      l !== -1 && (e("slide-unregistered", { slide: n, index: l }), o.splice(l, 1), i(l));
    }
  };
};
function Oa(e) {
  return e.length === 0 ? 0 : e.reduce((i, n) => i + n, 0) / e.length;
}
function Kt({ slides: e, position: o, toShow: i }) {
  const n = [], l = o === "before", a = l ? -i : 0, f = l ? 0 : i;
  if (e.length <= 0)
    return n;
  for (let b = a; b < f; b++) {
    const p = {
      index: l ? b : b + e.length,
      isClone: !0,
      position: o,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${o}-${b}`
    }, r = e[(b % e.length + e.length) % e.length].vnode, T = Ta(r, p);
    T.el = null, n.push(T);
  }
  return n;
}
const Pa = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function Wt(e) {
  if (!e.el || !(e.el instanceof Element))
    return;
  const o = e.el.querySelectorAll(Pa);
  for (const i of o)
    i instanceof HTMLElement && !i.hasAttribute("disabled") && i.getAttribute("aria-hidden") !== "true" && i.setAttribute("tabindex", "-1");
}
function Ua(e, o) {
  return Object.keys(e).filter((i) => !o.includes(i)).reduce((i, n) => (i[n] = e[n], i), {});
}
function Fa(e) {
  const { isVertical: o, isReversed: i, dragged: n, effectiveSlideSize: l } = e, a = o ? n.y : n.x;
  if (a === 0)
    return 0;
  const f = Math.round(a / l);
  return i ? f : -f;
}
function De({ val: e, max: o, min: i }) {
  return o < i ? e : Math.min(Math.max(e, isNaN(i) ? e : i), isNaN(o) ? e : o);
}
function ja(e) {
  const { transform: o } = window.getComputedStyle(e);
  return o.split(/[(,)]/).slice(1, -1).map((i) => parseFloat(i));
}
function za(e) {
  let o = 1, i = 1;
  return e.forEach((n) => {
    const l = ja(n);
    l.length === 6 && (o /= l[0], i /= l[3]);
  }), { widthMultiplier: o, heightMultiplier: i };
}
function Ha(e, o) {
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
  return n !== void 0 ? Ha(i, n) : e !== void 0 && o !== void 0 ? qa(i, e, o) : 0;
}
function va(e = "", o = {}) {
  return Object.entries(o).reduce((i, [n, l]) => i.replace(`{${n}}`, String(l)), e);
}
function fa({ val: e, max: o, min: i = 0 }) {
  const n = o - i + 1;
  return ((e - i) % n + n) % n + i;
}
function Ot(e, o = 0) {
  let i = !1, n = 0, l = null;
  function a(...f) {
    if (i)
      return;
    i = !0;
    const b = () => {
      l = requestAnimationFrame((g) => {
        g - n > o ? (n = g, e(...f), i = !1) : b();
      });
    };
    b();
  }
  return a.cancel = () => {
    l && (cancelAnimationFrame(l), l = null, i = !1);
  }, a;
}
function Ct(e, o = "px") {
  if (!(e == null || e === ""))
    return typeof e == "number" || parseFloat(e).toString() === e ? `${e}${o}` : e;
}
const Ga = ae({
  name: "CarouselAria",
  setup() {
    const e = st(ze);
    return e ? () => Y("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, va(e.config.i18n.itemXofY, {
      currentSlide: e.currentSlide + 1,
      slidesCount: e.slidesCount
    })) : () => "";
  }
}), Xa = {
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
    validator(e) {
      return ua.includes(e);
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
    validator(e, o) {
      return e && o.wrapAround && console.warn('[vue3-carousel warn]: "preventExcessiveDragging" cannot be used with wrapAround. The setting will be ignored.'), !0;
    }
  },
  // control snap position alignment
  snapAlign: {
    default: j.snapAlign,
    validator(e) {
      return ca.includes(e);
    }
  },
  slideEffect: {
    type: String,
    default: j.slideEffect,
    validator(e) {
      return da.includes(e);
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
    validator(e, o) {
      if (!sa.includes(e))
        return !1;
      const i = e in wt ? wt[e] : e;
      return ["ttb", "btt"].includes(i) && (!o.height || o.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${e}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: j.wrapAround,
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
    const a = $a(i), f = a.getSlides(), b = u(() => f.length), g = C(null), p = C(null), r = C(0), T = u(() => Object.assign(Object.assign(Object.assign({}, j), Ua(e, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, j.i18n), e.i18n) })), c = Pt(Object.assign({}, T.value)), k = C((l = e.modelValue) !== null && l !== void 0 ? l : 0), E = C(k.value);
    U(k, (s) => E.value = s);
    const V = C(0), Se = u(() => Math.ceil((b.value - 1) / 2)), $ = u(() => b.value - 1), G = u(() => 0);
    let ue = null, Ne = null, Z = null;
    const d = u(() => r.value + c.gap), w = u(() => {
      const s = c.dir || "ltr";
      return s in wt ? wt[s] : s;
    }), F = u(() => ["rtl", "btt"].includes(w.value)), P = u(() => ["ttb", "btt"].includes(w.value)), J = u(() => c.itemsToShow === "auto"), _ = u(() => P.value ? "height" : "width");
    function Ce() {
      var s;
      if (!qe.value)
        return;
      const h = (T.value.breakpointMode === "carousel" ? (s = g.value) === null || s === void 0 ? void 0 : s.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, S = Object.keys(e.breakpoints || {}).map((R) => Number(R)).sort((R, X) => +X - +R), B = {};
      S.some((R) => h >= R ? (Object.assign(B, e.breakpoints[R]), B.i18n && Object.assign(B.i18n, T.value.i18n, e.breakpoints[R].i18n), !0) : !1), Object.assign(c, T.value, B);
    }
    const dt = Ot(() => {
      Ce(), se(), fe();
    }), Me = Pt(/* @__PURE__ */ new Set()), H = C([]);
    function Bt({ widthMultiplier: s, heightMultiplier: h }) {
      H.value = f.map((S) => {
        var B;
        const R = (B = S.exposed) === null || B === void 0 ? void 0 : B.getBoundingRect();
        return {
          width: R.width * s,
          height: R.height * h
        };
      });
    }
    const Le = C({
      width: 0,
      height: 0
    });
    function Dt({ widthMultiplier: s, heightMultiplier: h }) {
      var S;
      const B = ((S = p.value) === null || S === void 0 ? void 0 : S.getBoundingClientRect()) || { width: 0, height: 0 };
      Le.value = {
        width: B.width * s,
        height: B.height * h
      };
    }
    function fe() {
      if (!p.value)
        return;
      const s = za(Me);
      if (Dt(s), Bt(s), J.value)
        r.value = Oa(H.value.map((h) => h[_.value]));
      else {
        const h = Number(c.itemsToShow), S = (h - 1) * c.gap;
        r.value = (Le.value[_.value] - S) / h;
      }
    }
    function se() {
      !c.wrapAround && b.value > 0 && (k.value = De({
        val: k.value,
        max: $.value,
        min: G.value
      })), J.value || (c.itemsToShow = De({
        val: Number(c.itemsToShow),
        max: b.value,
        min: 1
      }));
    }
    const _e = u(() => typeof e.ignoreAnimations == "string" ? e.ignoreAnimations.split(",") : Array.isArray(e.ignoreAnimations) ? e.ignoreAnimations : e.ignoreAnimations ? !1 : []);
    Lt(() => se()), Lt(() => {
      fe();
    });
    let de;
    const He = (s) => {
      const h = s.target;
      if (!(!(h != null && h.contains(g.value)) || Array.isArray(_e.value) && _e.value.includes(s.animationName)) && (Me.add(h), !de)) {
        const S = () => {
          de = requestAnimationFrame(() => {
            fe(), S();
          });
        };
        S();
      }
    }, ct = (s) => {
      const h = s.target;
      h && Me.delete(h), de && Me.size === 0 && (cancelAnimationFrame(de), fe());
    }, qe = C(!1);
    typeof document < "u" && Lt(() => {
      qe.value && _e.value !== !1 ? (document.addEventListener("animationstart", He), document.addEventListener("animationend", ct)) : (document.removeEventListener("animationstart", He), document.removeEventListener("animationend", ct));
    }), jt(() => {
      qe.value = !0, Ce(), me(), g.value && (Z = new ResizeObserver(dt), Z.observe(g.value)), i("init");
    }), Ca(() => {
      qe.value = !1, a.cleanup(), Ne && clearTimeout(Ne), de && cancelAnimationFrame(de), ue && clearInterval(ue), Z && (Z.disconnect(), Z = null), typeof document < "u" && ft(), g.value && (g.value.removeEventListener("transitionend", fe), g.value.removeEventListener("animationiteration", fe));
    });
    let pe = !1;
    const Ge = { x: 0, y: 0 }, oe = _t({ x: 0, y: 0 }), Xe = C(!1), Ye = C(!1), It = () => {
      Xe.value = !0;
    }, it = () => {
      Xe.value = !1;
    }, vt = Ot((s) => {
      if (!s.ctrlKey)
        switch (s.key) {
          case "ArrowLeft":
          case "ArrowUp":
            P.value === s.key.endsWith("Up") && (F.value ? Pe(!0) : We(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            P.value === s.key.endsWith("Down") && (F.value ? We(!0) : Pe(!0));
            break;
        }
    }, 200), Tt = () => {
      document.addEventListener("keydown", vt);
    }, ft = () => {
      document.removeEventListener("keydown", vt);
    };
    function pt(s) {
      const h = s.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(h) || ge.value || (pe = s.type === "touchstart", !pe && (s.preventDefault(), s.button !== 0)))
        return;
      Ge.x = "touches" in s ? s.touches[0].clientX : s.clientX, Ge.y = "touches" in s ? s.touches[0].clientY : s.clientY;
      const S = pe ? "touchmove" : "mousemove", B = pe ? "touchend" : "mouseup";
      document.addEventListener(S, $e, { passive: !1 }), document.addEventListener(B, Ke, { passive: !0 });
    }
    const $e = Ot((s) => {
      Ye.value = !0;
      const h = "touches" in s ? s.touches[0].clientX : s.clientX, S = "touches" in s ? s.touches[0].clientY : s.clientY;
      oe.x = h - Ge.x, oe.y = S - Ge.y;
      const B = Fa({
        isVertical: P.value,
        isReversed: F.value,
        dragged: oe,
        effectiveSlideSize: d.value
      });
      E.value = c.wrapAround ? k.value + B : De({
        val: k.value + B,
        max: $.value,
        min: G.value
      }), i("drag", { deltaX: oe.x, deltaY: oe.y });
    });
    function Ke() {
      if ($e.cancel(), E.value !== k.value && !pe) {
        const S = (B) => {
          B.preventDefault(), window.removeEventListener("click", S);
        };
        window.addEventListener("click", S);
      }
      we(E.value), oe.x = 0, oe.y = 0, Ye.value = !1;
      const s = pe ? "touchmove" : "mousemove", h = pe ? "touchend" : "mouseup";
      document.removeEventListener(s, $e), document.removeEventListener(h, Ke);
    }
    function me() {
      !c.autoplay || c.autoplay <= 0 || (ue = setInterval(() => {
        c.pauseAutoplayOnHover && Xe.value || Pe();
      }, c.autoplay));
    }
    function Oe() {
      ue && (clearInterval(ue), ue = null);
    }
    function ce() {
      Oe(), me();
    }
    const ge = C(!1);
    function we(s, h = !1) {
      if (!h && ge.value)
        return;
      let S = s, B = s;
      V.value = k.value, c.wrapAround ? B = fa({
        val: S,
        max: $.value,
        min: G.value
      }) : S = De({
        val: S,
        max: $.value,
        min: G.value
      }), i("slide-start", {
        slidingToIndex: s,
        currentSlideIndex: k.value,
        prevSlideIndex: V.value,
        slidesCount: b.value
      }), Oe(), ge.value = !0, k.value = S, B !== S && be.pause(), i("update:modelValue", B), Ne = setTimeout(() => {
        c.wrapAround && B !== S && (be.resume(), k.value = B, i("loop", {
          currentSlideIndex: k.value,
          slidingToIndex: s
        })), i("slide-end", {
          currentSlideIndex: k.value,
          prevSlideIndex: V.value,
          slidesCount: b.value
        }), ge.value = !1, ce();
      }, c.transition);
    }
    function Pe(s = !1) {
      we(k.value + c.itemsToScroll, s);
    }
    function We(s = !1) {
      we(k.value - c.itemsToScroll, s);
    }
    function mt() {
      Ce(), se(), fe(), ce();
    }
    U(() => [T.value, e.breakpoints], () => Ce(), { deep: !0 }), U(() => e.autoplay, () => ce());
    const be = U(() => e.modelValue, (s) => {
      s !== k.value && we(Number(s), !0);
    });
    i("before-init");
    const Ue = u(() => {
      if (!c.wrapAround)
        return { before: 0, after: 0 };
      if (J.value)
        return { before: f.length, after: f.length };
      const s = Number(c.itemsToShow), h = Math.ceil(s + (c.itemsToScroll - 1)), S = h - E.value, B = h - (b.value - (E.value + 1));
      return {
        before: Math.max(0, S),
        after: Math.max(0, B)
      };
    }), xe = u(() => Ue.value.before ? J.value ? H.value.slice(-1 * Ue.value.before).reduce((s, h) => s + h[_.value] + c.gap, 0) * -1 : Ue.value.before * d.value * -1 : 0), rt = u(() => {
      var s;
      if (J.value) {
        const h = (k.value % f.length + f.length) % f.length;
        return Ut({
          slideSize: (s = H.value[h]) === null || s === void 0 ? void 0 : s[_.value],
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
      if (J.value) {
        if (k.value < 0 ? s = H.value.slice(k.value).reduce((h, S) => h + S[_.value] + c.gap, 0) * -1 : s = H.value.slice(0, k.value).reduce((h, S) => h + S[_.value] + c.gap, 0), s -= rt.value, !c.wrapAround) {
          const h = H.value.reduce((S, B) => S + B[_.value] + c.gap, 0) - Le.value[_.value] - c.gap;
          s = De({
            val: s,
            max: h,
            min: 0
          });
        }
      } else {
        let h = k.value - rt.value;
        c.wrapAround || (h = De({
          val: h,
          max: b.value - +c.itemsToShow,
          min: 0
        })), s = h * d.value;
      }
      return s * (F.value ? 1 : -1);
    }), Et = u(() => {
      var s, h;
      if (!J.value) {
        const R = k.value - rt.value;
        return c.wrapAround ? {
          min: Math.floor(R),
          max: Math.ceil(R + Number(c.itemsToShow) - 1)
        } : {
          min: Math.floor(De({
            val: R,
            max: b.value - Number(c.itemsToShow),
            min: 0
          })),
          max: Math.ceil(De({
            val: R + Number(c.itemsToShow) - 1,
            max: b.value - 1,
            min: 0
          }))
        };
      }
      let S = 0;
      {
        let R = 0, X = 0 - Ue.value.before;
        const le = Math.abs(Je.value + xe.value);
        for (; R <= le; ) {
          const ee = (X % f.length + f.length) % f.length;
          R += ((s = H.value[ee]) === null || s === void 0 ? void 0 : s[_.value]) + c.gap, X++;
        }
        S = X - 1;
      }
      let B = 0;
      {
        let R = S, X = 0;
        for (R < 0 ? X = H.value.slice(0, R).reduce((le, ee) => le + ee[_.value] + c.gap, 0) - Math.abs(Je.value + xe.value) : X = H.value.slice(0, R).reduce((le, ee) => le + ee[_.value] + c.gap, 0) - Math.abs(Je.value); X < Le.value[_.value]; ) {
          const le = (R % f.length + f.length) % f.length;
          X += ((h = H.value[le]) === null || h === void 0 ? void 0 : h[_.value]) + c.gap, R++;
        }
        B = R - 1;
      }
      return {
        min: Math.floor(S),
        max: Math.ceil(B)
      };
    }), At = u(() => {
      if (c.slideEffect === "fade")
        return;
      const s = P.value ? "Y" : "X", h = P.value ? oe.y : oe.x;
      let S = Je.value + h;
      if (!c.wrapAround && c.preventExcessiveDragging) {
        let B = 0;
        J.value ? B = H.value.reduce((le, ee) => le + ee[_.value], 0) : B = (b.value - Number(c.itemsToShow)) * d.value;
        const R = F.value ? 0 : -1 * B, X = F.value ? B : 0;
        S = De({
          val: S,
          min: R,
          max: X
        });
      }
      return `translate${s}(${S}px)`;
    }), gt = u(() => ({
      "--vc-transition-duration": ge.value ? Ct(c.transition, "ms") : void 0,
      "--vc-slide-gap": Ct(c.gap),
      "--vc-carousel-height": Ct(c.height),
      "--vc-cloned-offset": Ct(xe.value)
    })), ut = { slideTo: we, next: Pe, prev: We }, bt = _t({
      activeSlide: E,
      config: c,
      currentSlide: k,
      isSliding: ge,
      isVertical: P,
      maxSlide: $,
      minSlide: G,
      nav: ut,
      normalizedDir: w,
      slideRegistry: a,
      slideSize: r,
      slides: f,
      slidesCount: b,
      viewport: p,
      visibleRange: Et
    });
    ta(ze, bt);
    const Qe = _t({
      config: c,
      currentSlide: k,
      maxSlide: $,
      middleSlide: Se,
      minSlide: G,
      slideSize: r,
      slidesCount: b
    });
    return n({
      data: Qe,
      nav: ut,
      next: Pe,
      prev: We,
      restartCarousel: mt,
      slideTo: we,
      updateBreakpointsConfig: Ce,
      updateSlideSize: fe,
      updateSlidesData: se
    }), () => {
      var s;
      const h = o.default || o.slides, S = (h == null ? void 0 : h(Qe)) || [], { before: B, after: R } = Ue.value, X = Kt({
        slides: f,
        position: "before",
        toShow: B
      }), le = Kt({
        slides: f,
        position: "after",
        toShow: R
      }), ee = [...X, ...S, ...le];
      if (!c.enabled || !ee.length)
        return Y("section", {
          ref: g,
          class: ["carousel", "is-disabled"]
        }, ee);
      const Vt = ((s = o.addons) === null || s === void 0 ? void 0 : s.call(o, Qe)) || [], Rt = Y("ol", {
        class: "carousel__track",
        style: { transform: At.value },
        onMousedownCapture: c.mouseDrag ? pt : null,
        onTouchstartPassiveCapture: c.touchDrag ? pt : null
      }, ee), Ze = Y("div", { class: "carousel__viewport", ref: p }, Rt);
      return Y("section", {
        ref: g,
        class: [
          "carousel",
          `is-${w.value}`,
          `is-effect-${c.slideEffect}`,
          {
            "is-vertical": P.value,
            "is-sliding": ge.value,
            "is-dragging": Ye.value,
            "is-hover": Xe.value
          }
        ],
        dir: w.value,
        style: gt.value,
        "aria-label": c.i18n.ariaGallery,
        tabindex: "0",
        onFocus: Tt,
        onBlur: ft,
        onMouseenter: It,
        onMouseleave: it
      }, [Ze, Vt, Y(Ga)]);
    };
  }
});
var Ft;
(function(e) {
  e.arrowDown = "arrowDown", e.arrowLeft = "arrowLeft", e.arrowRight = "arrowRight", e.arrowUp = "arrowUp";
})(Ft || (Ft = {}));
const xt = (e) => `icon${e.charAt(0).toUpperCase() + e.slice(1)}`, Ka = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function Wa(e) {
  return e in Ft;
}
const Jt = (e) => e && Wa(e), Qt = ae({
  props: {
    name: {
      type: String,
      required: !0,
      validator: Jt
    },
    title: {
      type: String,
      default: (e) => e.name ? j.i18n[xt(e.name)] : ""
    }
  },
  setup(e) {
    const o = st(ze, null);
    return () => {
      const i = e.name;
      if (!i || !Jt(i))
        return;
      const n = Ka[i], l = Y("path", { d: n }), a = (o == null ? void 0 : o.config.i18n[xt(i)]) || e.title, f = Y("title", a);
      return Y("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": a
      }, [f, l]);
    };
  }
}), xa = ae({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(e, { slots: o, attrs: i }) {
    const n = st(ze);
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
    })[n.normalizedDir], g = u(() => !n.config.wrapAround && n.currentSlide <= n.minSlide), p = u(() => !n.config.wrapAround && n.currentSlide >= n.maxSlide);
    return () => {
      const { i18n: r } = n.config, T = Y("button", Object.assign(Object.assign({ type: "button", disabled: g.value, "aria-label": r.ariaPreviousSlide, title: r.ariaPreviousSlide, onClick: n.nav.prev }, i), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": g.value },
        i.class
      ] }), (a == null ? void 0 : a()) || Y(Qt, { name: f() })), c = Y("button", Object.assign(Object.assign({ type: "button", disabled: p.value, "aria-label": r.ariaNextSlide, title: r.ariaNextSlide, onClick: n.nav.next }, i), { class: [
        "carousel__next",
        { "carousel__next--disabled": p.value },
        i.class
      ] }), (l == null ? void 0 : l()) || Y(Qt, { name: b() }));
      return [T, c];
    };
  }
}), Ja = ae({
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
    const o = st(ze);
    if (!o)
      return () => "";
    const i = u(() => o.config.itemsToShow), n = u(() => Ut({
      align: o.config.snapAlign,
      itemsToShow: i.value
    })), l = u(() => e.paginateByItemsToShow && i.value > 1), a = u(() => Math.ceil((o.activeSlide - n.value) / i.value)), f = u(() => Math.ceil(o.slidesCount / i.value)), b = (g) => fa(l.value ? {
      val: a.value,
      max: f.value - 1,
      min: 0
    } : {
      val: o.activeSlide,
      max: o.maxSlide,
      min: o.minSlide
    }) === g;
    return () => {
      var g, p;
      const r = [];
      for (let T = l.value ? 0 : o.minSlide; T <= (l.value ? f.value - 1 : o.maxSlide); T++) {
        const c = va(o.config.i18n[l.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: T + 1
        }), k = b(T), E = Y("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": k
          },
          "aria-label": c,
          "aria-pressed": k,
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
  setup(e, { attrs: o, slots: i, expose: n }) {
    const l = st(ze);
    if (ta(ze, void 0), !l)
      return () => "";
    const a = C(e.index), f = (E) => {
      a.value = E;
    }, b = Ba(), g = () => {
      const E = b.vnode.el;
      return E ? E.getBoundingClientRect() : { width: 0, height: 0 };
    };
    n({
      id: e.id,
      setIndex: f,
      getBoundingRect: g
    });
    const p = u(() => a.value === l.activeSlide), r = u(() => a.value === l.activeSlide - 1), T = u(() => a.value === l.activeSlide + 1), c = u(() => a.value >= l.visibleRange.min && a.value <= l.visibleRange.max), k = u(() => {
      if (l.config.itemsToShow === "auto")
        return;
      const E = l.config.itemsToShow, V = l.config.gap > 0 && E > 1 ? `calc(${100 / E}% - ${l.config.gap * (E - 1) / E}px)` : `${100 / E}%`;
      return l.isVertical ? { height: V } : { width: V };
    });
    return l.slideRegistry.registerSlide(b, e.index), Da(() => {
      l.slideRegistry.unregisterSlide(b);
    }), e.isClone && (jt(() => {
      Wt(b.vnode);
    }), Ia(() => {
      Wt(b.vnode);
    })), () => {
      var E, V;
      return l.config.enabled ? Y("li", {
        style: [o.style, Object.assign({}, k.value)],
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
}), Qa = (e, o, i, n) => {
  if (!i) return 0;
  let l = String(e[i.key]).toLowerCase(), a = String(o[i.key]).toLowerCase();
  if (n === Fe.Asc) {
    if (l > a) return 1;
    if (a > l) return -1;
  } else {
    if (l > a) return -1;
    if (a > l) return 1;
  }
  return 0;
}, ot = (e, o, i, n = []) => {
  if (e.extractTitleFromColumn) {
    let l = n.find((a) => a.key === e.extractTitleFromColumn);
    if (l)
      return ot(l, o, i, n);
  }
  if (e.formatter && typeof e.formatter == "function") {
    let l = e.formatter(o[e.key], o, e, i);
    return l.startsWith("__:") ? Aa(l.substring(3)) : l;
  }
  return o[e.key];
}, Za = (e, o, i) => {
  if (!e.colspan) return -1;
  let n = o;
  return i.forEach((l) => {
    let a = zt(e, l);
    a > 0 && a < n && (n = a);
  }), n;
}, zt = (e, o) => e.colspan === !1 ? !1 : typeof e.colspan == "function" ? e.colspan(o) : e.colspan, el = (e, o) => typeof e.preferSlot > "u" ? !0 : e.preferSlot === !1 ? !1 : typeof e.preferSlot == "function" ? e.preferSlot(o) : !0, tl = (e, o, i) => {
  if (typeof e != "object" || !e.key || o.indexOf(e.key) > -1) return !1;
  let n = zt(e, i);
  return typeof e.colspan > "u" ? !0 : (typeof e.colspan < "u" && (typeof e.colspan == "function" ? n = parseInt(e.colspan(i)) : n = parseInt(e.colspan)), n > 0);
}, al = (e = []) => {
  if (e.length > 0) {
    for (let o = 0; o < e.length; ++o)
      if (e[o].sortable) return e[o].key;
  }
  return "";
}, ll = (e, o) => {
  if (e.length > 0) {
    for (let i = 0; i < e.length; ++i)
      if (e[i].key === o) return e[i];
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
  setup(e, { emit: o }) {
    const i = o, n = e, l = C(n.modelValue), a = C(l.value[n.column.key]), f = C(null);
    U(a, (p) => {
      const r = JSON.parse(JSON.stringify(l.value));
      r[n.column.key] = p, i("update:modelValue", r);
    }), U(() => n.modelValue, (p) => {
      l.value = p, a.value = l.value[n.column.key];
    });
    const b = u(() => ({ ...n.column.slotData, item: l.value })), g = u(() => {
      var p, r, T, c;
      if ((p = n.column.field) != null && p.modalData && typeof ((r = n.column.field) == null ? void 0 : r.modalData) == "object")
        for (let k in n.column.field.modalData)
          if (typeof ((T = n.column.field) == null ? void 0 : T.modalData[k]) == "string" && n.column.field.modalData[k].startsWith("prop:")) {
            let E = n.column.field.modalData[k].substring(5);
            l.value[E];
          } else
            n.column.field.modalData[k];
      return (c = n.column.field) == null ? void 0 : c.modalData;
    });
    return (p, r) => {
      var E, V, Se, $;
      const T = ke("lkt-anchor"), c = ke("lkt-button"), k = ke("lkt-field");
      return p.column.type === D(kt).Anchor ? (v(), O(T, Re(ve({ key: 0 }, p.column.anchor)), {
        default: z(() => [
          nt(je(D(ot)(p.column, l.value, p.i)), 1)
        ]),
        _: 1
      }, 16)) : p.column.type === D(kt).Button ? (v(), O(c, ve({ key: 1 }, p.column.button, { prop: l.value }), {
        default: z(() => [
          nt(je(D(ot)(p.column, l.value, p.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : p.column.type === D(kt).Field && p.hasInlineEditPerm ? (v(), O(k, ve({ key: 2 }, p.column.field, {
        "read-mode": !p.column.editable || !p.editModeEnabled,
        ref: (G) => f.value = G,
        "slot-data": b.value,
        label: ((E = p.column.field) == null ? void 0 : E.type) === "switch" || ((V = p.column.field) == null ? void 0 : V.type) === "check" ? p.column.label : "",
        "modal-data": g.value,
        prop: l.value,
        modelValue: a.value,
        "onUpdate:modelValue": r[0] || (r[0] = (G) => a.value = G)
      }), null, 16, ["read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : p.column.type === D(kt).Field ? (v(), O(k, ve({ key: 3 }, p.column.field, {
        "read-mode": "",
        ref: (G) => f.value = G,
        "slot-data": b.value,
        label: ((Se = p.column.field) == null ? void 0 : Se.type) === "switch" || (($ = p.column.field) == null ? void 0 : $.type) === "check" ? p.column.label : "",
        "modal-data": g.value,
        prop: l.value,
        "model-value": a.value
      }), null, 16, ["slot-data", "label", "modal-data", "prop", "model-value"])) : (v(), y(x, { key: 4 }, [
        nt(je(D(ot)(p.column, l.value, p.i, p.columns)), 1)
      ], 64));
    };
  }
}), Ie = class Ie {
};
Ie.navButtonSlot = "", Ie.dropButtonSlot = "", Ie.editButtonSlot = "", Ie.createButtonSlot = "", Ie.defaultEmptySlot = void 0, Ie.defaultSaveIcon = "", Ie.defaultNoResultsMessage = "No results";
let K = Ie;
const nl = /* @__PURE__ */ ae({
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
    const i = o, n = e, l = u(() => K.dropButtonSlot !== ""), a = u(() => K.dropButtonSlot), f = u(() => oa(n.config.resourceData, n.item));
    return (b, g) => {
      const p = ke("lkt-button");
      return v(), O(p, ve({ palette: "table-delete" }, n.config, {
        disabled: b.disabled,
        "resource-data": f.value,
        onClick: g[0] || (g[0] = aa((r) => i("click", r), ["prevent", "stop"]))
      }), {
        default: z(() => [
          l.value ? (v(), O(Ee(a.value), { key: 0 })) : A("", !0)
        ]),
        _: 1
      }, 16, ["disabled", "resource-data"]);
    };
  }
}), ol = /* @__PURE__ */ ae({
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
    const i = o, n = e, l = u(() => K.editButtonSlot !== ""), a = u(() => K.editButtonSlot), f = u(() => oa(n.config.resourceData, n.item));
    return (b, g) => {
      const p = ke("lkt-button");
      return v(), O(p, ve({ palette: "table-edit" }, n.config, {
        disabled: b.disabled,
        "resource-data": f.value,
        onClick: g[0] || (g[0] = aa((r) => i("click"), ["prevent", "stop"]))
      }), {
        default: z(() => [
          l.value ? (v(), O(Ee(a.value), { key: 0 })) : A("", !0)
        ]),
        _: 1
      }, 16, ["disabled", "resource-data"]);
    };
  }
}), il = ["data-i", "data-draggable"], rl = ["data-role", "data-i"], ul = {
  key: 1,
  class: "lkt-table-nav-cell"
}, sl = { class: "lkt-table-nav-container" }, dl = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, cl = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, vl = ["colspan"], fl = ["colspan"], pl = ["data-column", "colspan", "title"], ml = {
  key: 6,
  class: "lkt-table-col-drop"
}, gl = {
  key: 7,
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
    rowDisplayType: { type: [Number, Function], default: et.Auto },
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
    const i = la(), n = o, l = e, a = C(l.modelValue);
    let f = typeof l.rowDisplayType == "function" ? l.rowDisplayType(a.value, l.i) : l.rowDisplayType;
    f || (f = et.Auto);
    const b = [et.Auto, et.PreferCustomItem].includes(f), g = [et.Auto, et.PreferItem].includes(f), p = C((Z = l.editButton.anchor) == null ? void 0 : Z.to);
    for (let d in a.value) p.value = ra(p.value, ":" + d, a.value[d]);
    const r = (d) => n("click", d), T = (d, w) => {
      n("show", d, w);
    }, c = u(() => {
      let d = [], w = !1;
      return typeof l.disabledDrag == "function" ? w = l.disabledDrag(a.value) : w = ue.value === !0, !w && l.sortable && l.isDraggable ? d.push("handle") : w && d.push("disabled"), d.join(" ");
    }), k = u(() => K.navButtonSlot !== ""), E = u(() => K.navButtonSlot), V = () => {
      n("item-up", l.i);
    }, Se = () => {
      n("item-down", l.i);
    }, $ = () => {
      n("item-drop", l.i);
    };
    U(() => l.modelValue, (d) => a.value = d), U(a, (d) => {
      n("update:modelValue", d);
    }, { deep: !0 });
    const G = u(() => typeof l.renderDrag == "function" ? l.renderDrag(a.value) : l.renderDrag === !0), ue = u(() => typeof l.disabledDrag == "function" ? l.disabledDrag(a.value) : l.disabledDrag === !0), Ne = u(() => c.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator");
    return (d, w) => {
      const F = ke("lkt-button");
      return v(), y("tr", {
        "data-i": d.i,
        "data-draggable": d.isDraggable,
        class: ne({ "type-custom-item": D(b), "type-item": D(g) })
      }, [
        d.sortable && d.editModeEnabled && G.value ? (v(), y("td", {
          key: 0,
          "data-role": Ne.value,
          class: ne(c.value),
          "data-i": d.i
        }, w[3] || (w[3] = [
          Q("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]), 10, rl)) : A("", !0),
        d.addNavigation && d.editModeEnabled ? (v(), y("td", ul, [
          Q("div", sl, [
            Te(F, {
              palette: "table-nav",
              disabled: d.i === 0,
              onClick: V
            }, {
              default: z(() => [
                k.value ? (v(), O(Ee(E.value), {
                  key: 0,
                  direction: "up"
                })) : (v(), y("i", dl))
              ]),
              _: 1
            }, 8, ["disabled"]),
            Te(F, {
              palette: "table-nav",
              disabled: d.latestRow,
              onClick: Se
            }, {
              default: z(() => [
                k.value ? (v(), O(Ee(E.value), {
                  key: 0,
                  direction: "down"
                })) : (v(), y("i", cl))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : A("", !0),
        d.displayHiddenColumnsIndicator ? (v(), y("td", {
          key: 2,
          onClick: w[0] || (w[0] = (P) => T(P, d.i)),
          "data-role": "show-more",
          class: ne(d.hiddenIsVisible ? "state-open" : "")
        }, null, 2)) : A("", !0),
        D(b) && D(i)[`item-${d.i}`] ? (v(), y("td", {
          key: "td" + d.i,
          colspan: d.visibleColumns.length
        }, [
          q(d.$slots, `item-${d.i}`, {
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
        ], 8, vl)) : D(g) && D(i).item ? (v(), y("td", {
          key: "td" + d.i,
          colspan: d.visibleColumns.length
        }, [
          q(d.$slots, "item", {
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
        ], 8, fl)) : (v(!0), y(x, { key: 5 }, re(d.visibleColumns, (P) => (v(), y(x, null, [
          D(tl)(P, d.emptyColumns, a.value) ? (v(), y("td", {
            key: "td" + d.i,
            "data-column": P.key,
            colspan: D(zt)(P, a.value),
            title: D(ot)(P, a.value, d.i, d.visibleColumns),
            class: ne(D(pa)(P)),
            onClick: w[2] || (w[2] = (J) => r(J))
          }, [
            d.$slots[P.key] && D(el)(P, a.value) ? q(d.$slots, P.key, {
              key: 0,
              value: a.value[P.key],
              item: a.value,
              column: P,
              i: d.i
            }) : a.value ? (v(), O(ma, {
              key: 1,
              modelValue: a.value,
              "onUpdate:modelValue": w[1] || (w[1] = (J) => a.value = J),
              column: P,
              columns: d.visibleColumns,
              "edit-mode-enabled": d.editModeEnabled,
              "has-inline-edit-perm": d.hasInlineEditPerm,
              i: d.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : A("", !0)
          ], 10, pl)) : A("", !0)
        ], 64))), 256)),
        d.canDrop && d.editModeEnabled ? (v(), y("td", ml, [
          Te(nl, {
            config: d.dropButton,
            item: a.value,
            onClick: $
          }, null, 8, ["config", "item"])
        ])) : A("", !0),
        d.canEdit && d.editModeEnabled ? (v(), y("td", gl, [
          Te(ol, {
            config: d.editButton,
            item: a.value
          }, null, 8, ["config", "item"])
        ])) : A("", !0)
      ], 10, il);
    };
  }
}), hl = { "data-role": "hidden-row" }, yl = ["colspan"], kl = ["data-column"], Sl = ["data-i"], Cl = ["data-column", "title"], wl = /* @__PURE__ */ ae({
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
    const i = o, n = e, l = C(n.modelValue), a = (f) => i("click", f);
    return U(() => n.modelValue, (f) => l.value = f), U(l, () => i("update:modelValue", l.value)), (f, b) => at((v(), y("tr", hl, [
      Q("td", { colspan: f.hiddenColumnsColSpan }, [
        Q("table", null, [
          Q("tr", null, [
            (v(!0), y(x, null, re(f.hiddenColumns, (g) => (v(), y("th", {
              "data-column": g.key
            }, [
              Q("div", null, je(g.label), 1)
            ], 8, kl))), 256))
          ]),
          Q("tr", { "data-i": f.i }, [
            (v(!0), y(x, null, re(f.hiddenColumns, (g, p) => (v(), y("td", {
              "data-column": g.key,
              title: D(ot)(g, l.value, p, f.hiddenColumns),
              onClick: b[1] || (b[1] = (r) => a(r))
            }, [
              f.$slots[g.key] ? q(f.$slots, g.key, {
                key: 0,
                value: l.value[g.key],
                item: l.value,
                column: g,
                i: p
              }) : (v(), O(ma, {
                key: 1,
                column: g,
                columns: f.hiddenColumns,
                modelValue: l.value,
                "onUpdate:modelValue": b[0] || (b[0] = (r) => l.value = r),
                i: p,
                "edit-mode-enabled": f.editModeEnabled,
                "has-inline-edit-perm": f.hasInlineEditPerm
              }, null, 8, ["column", "columns", "modelValue", "i", "edit-mode-enabled", "has-inline-edit-perm"]))
            ], 8, Cl))), 256))
          ], 8, Sl)
        ])
      ], 8, yl)
    ], 512)), [
      [lt, f.hiddenIsVisible]
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
  setup(e, { emit: o }) {
    var p;
    const i = o, n = e, l = u(() => K.createButtonSlot !== ""), a = u(() => K.createButtonSlot), f = {
      ...(p = n.config) == null ? void 0 : p.modalData,
      beforeClose: (r) => {
        "itemCreated" in r && r.itemCreated === !0 && i("append", r.item);
      }
    }, b = {
      ...n.config
    };
    b.modalData = f;
    const g = () => {
      var r;
      if (!((r = n.config) != null && r.modal)) {
        i("click");
        return;
      }
    };
    return (r, T) => {
      const c = ke("lkt-button");
      return v(), O(c, ve(b, {
        disabled: r.disabled,
        onClick: g
      }), {
        default: z(() => [
          l.value ? (v(), O(Ee(a.value), { key: 0 })) : A("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), Bl = ["data-column", "data-sortable", "data-sort", "colspan", "title"], Dl = /* @__PURE__ */ ae({
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
  setup(e, { emit: o }) {
    const i = o, n = e, l = u(() => Za(n.column, n.amountOfColumns, n.items)), a = u(() => n.column.sortable === !0), f = u(() => a.value && n.sortBy === n.column.key ? n.sortDirection : ""), b = u(() => ia(n.column.label)), g = u(() => a.value && n.sortBy === n.column.key ? n.sortDirection === Fe.Asc ? ye.defaultTableSortAscIcon : n.sortDirection === Fe.Desc ? ye.defaultTableSortDescIcon : "" : ""), p = () => i("click", n.column);
    return (r, T) => (v(), y("th", {
      "data-column": r.column.key,
      "data-sortable": a.value,
      "data-sort": f.value,
      colspan: l.value,
      title: b.value,
      class: ne(D(pa)(r.column)),
      onClick: p
    }, [
      Q("div", null, [
        nt(je(b.value) + " ", 1),
        g.value ? (v(), y("i", {
          key: 0,
          class: ne(g.value)
        }, null, 2)) : A("", !0)
      ])
    ], 10, Bl));
  }
}), Il = ["id"], Tl = { class: "lkt-table-page-buttons" }, El = { class: "switch-edition-mode" }, Al = {
  key: 0,
  class: "lkt-table-page-buttons"
}, Vl = {
  key: 1,
  class: "lkt-table-page-filters"
}, Rl = { class: "lkt-table" }, Nl = { key: 0 }, Ml = { key: 0 }, Ll = {
  key: 0,
  "data-role": "drag-indicator"
}, _l = { key: 1 }, $l = { key: 2 }, Ol = {
  key: 3,
  class: "lkt-table-col-drop"
}, Pl = {
  key: 4,
  class: "lkt-table-col-edit"
}, Ul = ["id"], Fl = ["id"], jl = ["data-i"], zl = ["data-i"], Hl = ["id"], ql = { class: "lkt-carousel-slide" }, Gl = { class: "lkt-carousel-slide" }, Xl = {
  key: 2,
  class: "lkt-table-empty"
}, Yl = {
  key: 4,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, Kl = /* @__PURE__ */ ae({
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
  }, Va(Ra)),
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
    const n = i, l = la(), a = e, f = {}, b = C(typeof a.sorter == "function" ? a.sorter : Qa), g = C(al(a.columns)), p = C(Fe.Asc), r = C(a.modelValue), T = C(f), c = C(null), k = C(a.columns), E = C((Gt = a.paginator) == null ? void 0 : Gt.modelValue), V = C(a.loading), Se = C(!1), $ = C(a.perms), G = C(null), ue = C(null), Ne = C(null), Z = C({}), d = C(new Ma({ items: r.value }, a.dataStateConfig)), w = C(a.editMode), F = C(0), P = C(null), J = C(((Xt = a.carousel) == null ? void 0 : Xt.currentSlide) || 0), _ = C(Ae(a.saveButton, ye.defaultSaveButton)), Ce = C(Ae(a.createButton, ye.defaultCreateButton)), dt = C(Ae(a.editModeButton, ye.defaultEditModeButton)), Me = C(Ae(a.dropButton, ye.defaultDropButton));
    U(() => a.saveButton, (t) => _.value = Ae(a.saveButton, ye.defaultSaveButton)), U(() => a.createButton, (t) => Ce.value = Ae(a.createButton, ye.defaultCreateButton)), U(() => a.editModeButton, (t) => dt.value = Ae(a.editModeButton, ye.defaultEditModeButton)), U(() => a.dropButton, (t) => Me.value = Ae(a.dropButton, ye.defaultDropButton));
    const H = C(!1);
    U(V, (t) => n("update:loading", t)), U(E, (t) => n("page", t));
    const Bt = (t) => {
      $.value = t;
    }, Le = (t) => {
      var m;
      Array.isArray(t.data) && ((!a.paginator || ![St.LoadMore, St.Infinite].includes((m = a.paginator) == null ? void 0 : m.type)) && r.value.splice(0, r.value.length), r.value = [...r.value, ...t.data]), V.value = !1, Se.value = !0, d.value.store({ items: r.value }).turnStoredIntoOriginal(), H.value = !1, yt(() => {
        F.value = Ve(), it.value, n("read-response", t);
      });
    }, Dt = () => yt(() => V.value = !0), fe = () => {
      G.value.doRefresh();
    }, se = Na(12), _e = u(() => {
      if (!a.hideEmptyColumns) return [];
      let t = [];
      return k.value.forEach((m) => {
        let L = m.key, W = !1;
        r.value.forEach((te) => {
          if (typeof te.checkEmpty == "function")
            return te.checkEmpty(te);
          te[L] && (W = !0);
        }), W || t.push(L);
      }), t;
    }), de = u(() => k.value.filter((t) => !t.hidden)), He = u(() => k.value.filter((t) => t.hidden)), ct = u(() => {
      let t = de.value.length + 1;
      return a.sortable && ++t, t;
    }), qe = u(() => k.value.filter((t) => t.isForRowKey)), pe = u(() => He.value.length > 0 && !a.sortable), Ge = u(() => k.value.map((t) => t.key)), oe = u(() => {
      let t = [];
      for (let m in l) Ge.value.indexOf(m) !== -1 && t.push(m);
      return t;
    }), Xe = u(() => {
      let t = [];
      for (let m in l) m.indexOf("slide-") !== -1 && t.push(m);
      return t;
    }), Ye = u(() => {
      var t;
      return a.hiddenSave || V.value || !((t = _.value) != null && t.resource || _.value.type) ? !1 : w.value && H.value ? !0 : w.value;
    }), It = u(() => ht.value && r.value.length >= a.requiredItemsForTopCreate || xe.value ? !0 : Ye.value || w.value && me.value), it = u(() => {
      var t, m;
      return F.value, typeof ((t = _.value) == null ? void 0 : t.disabled) == "function" ? _.value.disabled({
        value: r.value,
        dataState: d.value
      }) : typeof ((m = _.value) == null ? void 0 : m.disabled) == "boolean" ? _.value.disabled : !H.value;
    }), vt = u(() => r.value.length), Tt = u(() => {
      var t;
      return {
        items: r.value,
        ...(t = _.value) == null ? void 0 : t.resourceData
      };
    }), ft = u(() => a.titleTag === "" ? "h2" : a.titleTag), pt = u(() => a.wrapContentTag === "" ? "div" : a.wrapContentTag), $e = u(() => ia(a.title)), Ke = u(() => {
      var t;
      return (t = a.drag) == null ? void 0 : t.enabled;
    }), me = u(() => $.value.includes(Be.Create)), Oe = u(() => $.value.includes("read")), ce = u(() => $.value.includes(Be.Update)), ge = u(() => $.value.includes(Be.Edit)), we = u(() => $.value.includes(Be.InlineEdit)), Pe = u(() => $.value.includes(Be.ModalCreate)), We = u(() => $.value.includes(Be.InlineCreate)), mt = u(() => $.value.includes(Be.InlineCreateEver)), be = u(() => $.value.includes(Be.Drop)), Ue = u(() => $.value.includes(Be.SwitchEditMode)), xe = u(() => !Ue.value || !ce.value && !be.value || !ce.value && be.value ? !1 : !V.value), rt = u(() => {
      var t;
      return (typeof ((t = a.paginator) == null ? void 0 : t.type) < "u" && [St.LoadMore, St.Infinite].includes(a.paginator.type) || !V.value) && r.value.length > 0;
    }), Je = (t) => {
      let m = t.target;
      if (typeof m.dataset.column > "u")
        do
          m = m.parentNode;
        while (typeof m.dataset.column > "u" && m.tagName !== "TABLE" && m.tagName !== "body");
      if (m.tagName === "TD" && (m = m.parentNode, m = m.dataset.i, typeof m < "u"))
        return r.value[m];
    }, Et = (t) => r.value[t], At = (t) => {
      var m;
      return (m = c.value) == null ? void 0 : m.querySelector(`[data-i="${t}"]`);
    }, gt = (t) => T.value["tr_" + t] === !0, ut = (t) => {
      t && t.sortable && (r.value = r.value.sort((m, L) => b.value(m, L, t, p.value)), p.value = p.value === Fe.Asc ? Fe.Desc : Fe.Asc, g.value = t.key, F.value = Ve(), n("sort", [g.value, p.value]));
    }, bt = (t) => {
      n("click", t);
    }, Qe = (t, m) => {
      let L = "tr_" + m;
      T.value[L] = typeof T.value[L] > "u" ? !0 : !T.value[L];
    }, s = (t) => {
      var L, W, te, ie, N, I, M, he;
      let m = parseInt((ie = (te = (W = (L = t == null ? void 0 : t.originalEvent) == null ? void 0 : L.toElement) == null ? void 0 : W.closest("tr")) == null ? void 0 : te.dataset) == null ? void 0 : ie.i);
      return !(typeof ((N = a.drag) == null ? void 0 : N.isValid) == "function" && !((I = a.drag) != null && I.isValid(r.value[m])) || typeof ((M = a.drag) == null ? void 0 : M.isValid) == "boolean" && !((he = a.drag) != null && he.isValid));
    }, h = (t) => {
      var m, L;
      return typeof ((m = a.drag) == null ? void 0 : m.isDraggable) == "function" ? (L = a.drag) == null ? void 0 : L.isDraggable(t) : !0;
    }, S = () => {
      if (me.value) {
        n("click-create");
        return;
      }
      if (mt.value)
        n("click-create");
      else {
        if (typeof a.newValueGenerator == "function") {
          let t = a.newValueGenerator();
          if (typeof t == "object" || a.type !== tt.Table) {
            r.value.push(t);
            return;
          }
        }
        r.value.push({});
      }
    }, B = (t) => {
      r.value.push(t);
    }, R = () => V.value = !0, X = () => V.value = !1, le = (t, m) => {
      var L, W, te;
      if (!((L = _.value) != null && L.type && [
        $t.Split,
        $t.SplitEver,
        $t.SplitLazy
      ].includes((W = _.value) == null ? void 0 : W.type))) {
        if (n("before-save"), (te = _.value) != null && te.resource && (V.value = !1, !m.success)) {
          n("error", m.httpStatus);
          return;
        }
        d.value.turnStoredIntoOriginal(), H.value = !1, n("save", m);
      }
    }, ee = (t, m, L) => {
      if (L >= t.length) {
        let W = L - t.length + 1;
        for (; W--; ) t.push(void 0);
      }
      return t.splice(L, 0, t.splice(m, 1)[0]), t;
    }, Vt = (t) => {
      ee(r.value, t, t - 1), F.value = Ve();
    }, Rt = (t) => {
      ee(r.value, t, t + 1), F.value = Ve();
    }, Ze = (t) => {
      r.value.splice(t, 1), F.value = Ve();
    }, ga = () => {
      var t;
      Z.value && typeof ((t = Z.value) == null ? void 0 : t.destroy) == "function" && (Z.value.destroy(), Z.value = {});
    }, Ht = () => {
      P.value || (P.value = document.getElementById("lkt-table-body-" + se)), Z.value = new La(P.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(t) {
          let m = t.oldIndex, L = t.newIndex;
          r.value.splice(L, 0, r.value.splice(m, 1)[0]), F.value = Ve(), n("drag-end", r.value[L]);
        },
        onMove: function(t, m) {
          return s(t);
        }
      });
    }, Nt = (t, m, L = !1) => {
      let W = [F.value, se, "row", m];
      return L && W.push("hidden"), qe.value.forEach((te) => {
        let ie = String(t[te.key]).toLowerCase();
        ie.length > 50 && (ie = ie.substring(0, 50)), ie = ra(ie, " ", "-"), W.push(ie);
      }), W.join("-");
    }, qt = u(() => typeof a.createEnabledValidator == "function" ? a.createEnabledValidator({ items: r.value }) : !0), ht = u(() => mt.value || me.value && w.value || We.value && w.value || Pe.value && w.value), ba = u(() => [tt.Ol, tt.Ul].includes(a.type)), Mt = (t, m) => typeof a.itemDisplayChecker == "function" ? a.itemDisplayChecker(t) : !0;
    jt(() => {
      var t;
      a.initialSorting && ut(ll(a.columns, g.value)), d.value.store({ items: r.value }).turnStoredIntoOriginal(), H.value = !1, (t = a.drag) != null && t.enabled && yt(() => {
        Ht();
      });
    }), U(() => {
      var t;
      return (t = a.drag) == null ? void 0 : t.enabled;
    }, (t) => {
      t ? Ht() : ga();
    }), U(() => a.perms, (t) => $.value = t), U($, (t) => n("update:perms", t)), U(() => a.editMode, (t) => w.value = t), U(() => a.columns, (t) => k.value = t, { deep: !0 }), U(() => a.modelValue, (t) => {
      r.value = t;
    }, { deep: !0 }), U(r, (t) => {
      d.value.increment({ items: t }), H.value = d.value.changed(), n("update:modelValue", t);
    }, { deep: !0 }), o({
      getItemByEvent: Je,
      getItemByIndex: Et,
      getRowByIndex: At,
      doRefresh: fe,
      doRemoveIndex: (t) => {
        r.value.splice(t, 1), F.value = Ve();
      },
      getHtml: () => ue.value,
      turnStoredIntoOriginal: () => {
        d.value.turnStoredIntoOriginal(), yt(() => {
          F.value = Ve();
        });
      }
    });
    const ha = u(() => typeof K.defaultEmptySlot < "u"), ya = u(() => K.defaultEmptySlot), ka = u(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled ? !1 : typeof a.drag.canRender > "u" ? !0 : a.drag.canRender), Sa = u(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled || typeof a.drag.isDisabled > "u" ? !1 : a.drag.isDisabled);
    return (t, m) => {
      const L = ke("lkt-button"), W = ke("lkt-loader"), te = ke("lkt-paginator");
      return v(), y("section", {
        ref_key: "element",
        ref: ue,
        class: "lkt-table-page",
        id: "lkt-table-page-" + D(se)
      }, [
        $e.value || D(l).title ? (v(), y("header", {
          key: 0,
          class: ne(t.headerClass)
        }, [
          $e.value ? (v(), O(Ee(ft.value), { key: 0 }, {
            default: z(() => [
              t.titleIcon ? (v(), y("i", {
                key: 0,
                class: ne(t.titleIcon)
              }, null, 2)) : A("", !0),
              nt(" " + je($e.value), 1)
            ]),
            _: 1
          })) : A("", !0),
          D(l).title ? q(t.$slots, "title", { key: 1 }) : A("", !0)
        ], 2)) : A("", !0),
        (v(), O(Ee(pt.value), {
          class: ne(["lkt-table-page-content-wrapper", t.wrapContentClass])
        }, {
          default: z(() => {
            var ie;
            return [
              at(Q("div", Tl, [
                at(Te(L, ve({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: Ne
                }, {
                  ..._.value,
                  disabled: it.value,
                  resourceData: Tt.value
                }, {
                  onLoading: R,
                  onLoaded: X,
                  onClick: le
                }), {
                  split: z(({ doClose: N, doRootClick: I }) => [
                    q(t.$slots, "button-save-split", {
                      doClose: N,
                      doRootClick: I,
                      dataState: d.value,
                      onButtonLoading: R,
                      onButtonLoaded: X
                    })
                  ]),
                  default: z(() => [
                    D(l)["button-save"] ? q(t.$slots, "button-save", {
                      key: 0,
                      items: r.value,
                      editMode: t.editMode,
                      canUpdate: !it.value
                    }) : A("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [lt, Ye.value]
                ]),
                ht.value && r.value.length >= t.requiredItemsForTopCreate ? (v(), O(ea, {
                  key: 0,
                  config: Ce.value,
                  disabled: !qt.value,
                  onClick: S,
                  onAppend: B
                }, null, 8, ["config", "disabled"])) : A("", !0),
                Q("div", El, [
                  at(Te(L, ve(dt.value, {
                    checked: w.value,
                    "onUpdate:checked": m[0] || (m[0] = (N) => w.value = N)
                  }), null, 16, ["checked"]), [
                    [lt, xe.value]
                  ])
                ])
              ], 512), [
                [lt, It.value]
              ]),
              D(l).buttons ? (v(), y("div", Al, [
                q(t.$slots, "buttons")
              ])) : A("", !0),
              Se.value && D(l).filters ? (v(), y("div", Vl, [
                q(t.$slots, "filters", {
                  items: r.value,
                  isLoading: V.value
                })
              ])) : A("", !0),
              at(Q("div", Rl, [
                t.type === D(tt).Table ? (v(), y("table", Nl, [
                  t.hideTableHeader ? A("", !0) : (v(), y("thead", Ml, [
                    Q("tr", null, [
                      Ke.value && w.value ? (v(), y("th", Ll)) : A("", !0),
                      t.addNavigation && w.value ? (v(), y("th", _l)) : A("", !0),
                      pe.value ? (v(), y("th", $l)) : A("", !0),
                      (v(!0), y(x, null, re(de.value, (N) => (v(), y(x, null, [
                        _e.value.indexOf(N.key) === -1 ? (v(), O(Dl, {
                          key: 0,
                          column: N,
                          "sort-by": g.value,
                          "sort-direction": p.value,
                          "amount-of-columns": t.columns.length,
                          items: r.value,
                          onClick: (I) => ut(N)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : A("", !0)
                      ], 64))), 256)),
                      be.value && w.value ? (v(), y("th", Ol)) : A("", !0),
                      ge.value && ce.value && w.value ? (v(), y("th", Pl)) : A("", !0)
                    ])
                  ])),
                  Q("tbody", {
                    ref_key: "tableBody",
                    ref: c,
                    id: "lkt-table-body-" + D(se),
                    class: ne(t.itemsContainerClass)
                  }, [
                    (v(!0), y(x, null, re(r.value, (N, I) => at((v(), O(bl, {
                      modelValue: r.value[I],
                      "onUpdate:modelValue": (M) => r.value[I] = M,
                      key: Nt(N, I),
                      i: I,
                      "drop-button": Me.value,
                      "edit-button": t.editButton,
                      "display-hidden-columns-indicator": pe.value,
                      "is-draggable": h(N),
                      sortable: Ke.value,
                      "visible-columns": de.value,
                      "empty-columns": _e.value,
                      "add-navigation": t.addNavigation,
                      "hidden-is-visible": gt(I),
                      "latest-row": I + 1 === vt.value,
                      "can-drop": be.value && w.value,
                      "can-edit": ge.value && ce.value && w.value,
                      "can-read": Oe.value,
                      "can-create": me.value,
                      "edit-mode-enabled": w.value,
                      "has-inline-edit-perm": we.value,
                      "row-display-type": t.rowDisplayType,
                      "render-drag": ka.value,
                      "disabled-drag": Sa.value,
                      "is-loading": V.value,
                      onClick: bt,
                      onShow: Qe,
                      onItemUp: Vt,
                      onItemDown: Rt,
                      onItemDrop: Ze
                    }, Yt({ _: 2 }, [
                      D(l)[`item-${I}`] ? {
                        name: `item-${I}`,
                        fn: z((M) => [
                          q(t.$slots, `item-${I}`, Re({
                            [t.slotItemVar || ""]: M.item,
                            index: I,
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
                        fn: z((M) => [
                          q(t.$slots, "item", Re({
                            [t.slotItemVar || ""]: M.item,
                            index: I,
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
                      re(oe.value, (M) => ({
                        name: M,
                        fn: z((he) => [
                          q(t.$slots, M, Re({
                            [t.slotItemVar || ""]: he.item,
                            value: he.value,
                            column: he.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "drop-button", "edit-button", "display-hidden-columns-indicator", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "hidden-is-visible", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading"])), [
                      [lt, Mt(r.value[I])]
                    ])), 128)),
                    He.value.length > 0 ? (v(!0), y(x, { key: 0 }, re(r.value, (N, I) => (v(), O(wl, {
                      modelValue: r.value[I],
                      "onUpdate:modelValue": (M) => r.value[I] = M,
                      key: Nt(N, I, !0),
                      i: I,
                      "hidden-columns": He.value,
                      "hidden-columns-col-span": ct.value,
                      "is-draggable": h(N),
                      sortable: Ke.value,
                      "visible-columns": de.value,
                      "empty-columns": _e.value,
                      "hidden-is-visible": gt(I),
                      "edit-mode-enabled": w.value,
                      "has-inline-edit-perm": we.value,
                      onClick: bt,
                      onShow: Qe
                    }, Yt({ _: 2 }, [
                      re(oe.value, (M) => ({
                        name: M,
                        fn: z((he) => [
                          q(t.$slots, M, Re({
                            [t.slotItemVar || ""]: he.item,
                            value: he.value,
                            column: he.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "hidden-columns", "hidden-columns-col-span", "is-draggable", "sortable", "visible-columns", "empty-columns", "hidden-is-visible", "edit-mode-enabled", "has-inline-edit-perm"]))), 128)) : A("", !0)
                  ], 10, Ul)
                ])) : t.type === D(tt).Item ? (v(), y("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: c,
                  id: "lkt-table-body-" + D(se),
                  class: ne(["lkt-table-items-container", t.itemsContainerClass])
                }, [
                  (v(!0), y(x, null, re(r.value, (N, I) => (v(), y(x, null, [
                    Mt(N) ? (v(), y("div", {
                      class: "lkt-table-item",
                      "data-i": I,
                      key: Nt(N, I)
                    }, [
                      q(t.$slots, "item", Re({
                        [t.slotItemVar || ""]: N,
                        index: I,
                        editing: w.value,
                        canCreate: me.value,
                        canRead: Oe.value,
                        canUpdate: ce.value,
                        canDrop: be.value,
                        isLoading: V.value,
                        doDrop: () => Ze(I)
                      }))
                    ], 8, jl)) : A("", !0)
                  ], 64))), 256))
                ], 10, Fl)) : ba.value ? (v(), O(Ee(t.type), {
                  key: 2,
                  class: ne(["lkt-table-items-container", t.itemsContainerClass])
                }, {
                  default: z(() => [
                    (v(!0), y(x, null, re(r.value, (N, I) => (v(), y(x, null, [
                      Mt(N) ? (v(), y("li", {
                        key: 0,
                        class: "lkt-table-item",
                        "data-i": I
                      }, [
                        q(t.$slots, "item", Re({
                          [t.slotItemVar || ""]: N,
                          index: I,
                          editing: w.value,
                          canCreate: me.value,
                          canRead: Oe.value,
                          canUpdate: ce.value,
                          canDrop: be.value,
                          isLoading: V.value,
                          doDrop: () => Ze(I)
                        }))
                      ], 8, zl)) : A("", !0)
                    ], 64))), 256))
                  ]),
                  _: 3
                }, 8, ["class"])) : t.type === D(tt).Carousel ? (v(), y("div", {
                  key: 3,
                  ref_key: "tableBody",
                  ref: c,
                  id: "lkt-table-body-" + D(se),
                  class: ne(["lkt-table-items-container", t.itemsContainerClass])
                }, [
                  Te(D(Ya), ve({
                    modelValue: J.value,
                    "onUpdate:modelValue": m[1] || (m[1] = (N) => J.value = N)
                  }, t.carousel, {
                    "wrap-around": ((ie = t.carousel) == null ? void 0 : ie.infinite) === !0
                  }), {
                    addons: z(() => [
                      Te(D(xa)),
                      Te(D(Ja))
                    ]),
                    default: z(() => [
                      (v(!0), y(x, null, re(Xe.value, (N, I) => (v(), O(D(Zt), {
                        key: N,
                        index: I
                      }, {
                        default: z(() => [
                          Q("div", ql, [
                            q(t.$slots, N)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (v(!0), y(x, null, re(r.value, (N, I) => (v(), O(D(Zt), {
                        key: t.slide,
                        index: I
                      }, {
                        default: z(() => [
                          Q("div", Gl, [
                            q(t.$slots, "item", Re({
                              [t.slotItemVar || ""]: N,
                              index: I,
                              editing: w.value,
                              canCreate: me.value,
                              canRead: Oe.value,
                              canUpdate: ce.value,
                              canDrop: be.value,
                              isLoading: V.value,
                              doDrop: () => Ze(I)
                            }))
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128))
                    ]),
                    _: 3
                  }, 16, ["modelValue", "wrap-around"])
                ], 10, Hl)) : A("", !0)
              ], 512), [
                [lt, rt.value]
              ]),
              !V.value && r.value.length === 0 ? (v(), y("div", Xl, [
                D(l).empty ? q(t.$slots, "empty", { key: 0 }) : ha.value ? (v(), O(Ee(ya.value), {
                  key: 1,
                  message: t.noResultsText
                }, null, 8, ["message"])) : t.noResultsText ? (v(), y(x, { key: 2 }, [
                  nt(je(t.noResultsText), 1)
                ], 64)) : A("", !0)
              ])) : A("", !0),
              V.value ? (v(), O(W, { key: 3 })) : A("", !0),
              ht.value || D(l).bottomButtons ? (v(), y("div", Yl, [
                ht.value && r.value.length >= t.requiredItemsForBottomCreate ? (v(), O(ea, {
                  key: 0,
                  config: Ce.value,
                  disabled: !qt.value,
                  onClick: S,
                  onAppend: B
                }, null, 8, ["config", "disabled"])) : A("", !0),
                q(t.$slots, "bottom-buttons")
              ])) : A("", !0),
              t.paginator && Object.keys(t.paginator).length > 0 ? (v(), O(te, ve({
                key: 5,
                ref_key: "paginatorRef",
                ref: G
              }, t.paginator, {
                modelValue: E.value,
                "onUpdate:modelValue": m[2] || (m[2] = (N) => E.value = N),
                onLoading: Dt,
                onPerms: Bt,
                onResponse: Le
              }), null, 16, ["modelValue"])) : A("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, Il);
    };
  }
}), an = {
  install: (e) => {
    e.component("lkt-table") === void 0 && e.component("lkt-table", Kl);
  }
}, ln = (e) => (K.navButtonSlot = e, !0), nn = (e) => (K.dropButtonSlot = e, !0), on = (e) => (K.createButtonSlot = e, !0), rn = (e) => {
  K.defaultEmptySlot = e;
}, un = (e) => {
  K.defaultSaveIcon = e;
};
export {
  cn as Column,
  vn as createColumn,
  an as default,
  on as setTableCreateButtonSlot,
  nn as setTableDropButtonSlot,
  rn as setTableEmptySlot,
  ln as setTableNavButtonSlot,
  un as setTableSaveIcon
};
