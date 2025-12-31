import { defineComponent as he, computed as r, ref as D, shallowReactive as Jt, watch as U, watchEffect as Kt, onMounted as ea, onBeforeUnmount as Ya, reactive as Xt, provide as ha, h as J, useId as Wa, inject as Et, getCurrentInstance as Ja, onUnmounted as Qa, onUpdated as Za, cloneVNode as _a, resolveComponent as ie, createBlock as L, createElementBlock as C, unref as y, openBlock as c, mergeProps as K, withCtx as P, createTextVNode as _e, toDisplayString as et, normalizeProps as me, Fragment as q, useSlots as ka, normalizeClass as Z, createCommentVNode as x, createElementVNode as ge, createVNode as pe, resolveDynamicComponent as ye, guardReactiveProps as Sa, renderSlot as $, renderList as Te, mergeDefaults as el, nextTick as Ut, withDirectives as We, vShow as Je, createSlots as tl, normalizeStyle as va } from "vue";
import { __ as al } from "lkt-i18n";
import { ColumnType as Re, FieldType as Qe, MultipleOptionsDisplay as ll, SortDirection as tt, Column as Ca, extractPropValue as nl, TableRowType as Be, extractI18nValue as wa, LktSettings as Ie, ensureButtonConfig as ze, TablePermission as Ee, PaginatorType as De, TableType as xe, getDefaultValues as ol, Table as il, ButtonType as Yt } from "lkt-vue-kernel";
import { Column as Rn, createColumn as Ln } from "lkt-vue-kernel";
import { generateRandomString as ul, replaceAll as rl } from "lkt-string-tools";
import { DataState as sl } from "lkt-data-state";
import dl from "sortablejs";
import { date as cl, findOldestAndNewestDateInObjects as vl, time as fl } from "lkt-date-tools";
/**
 * Vue 3 Carousel 0.14.0
 * (c) 2025
 * @license MIT
 */
const Da = ["viewport", "carousel"], zt = {
  "bottom-to-top": "btt",
  "left-to-right": "ltr",
  "right-to-left": "rtl",
  "top-to-bottom": "ttb"
}, Ta = [
  "ltr",
  "left-to-right",
  "rtl",
  "right-to-left",
  "ttb",
  "top-to-bottom",
  "btt",
  "bottom-to-top"
], ml = {
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
}, Ia = ["slide", "fade"], Ba = [
  "center",
  "start",
  "end",
  "center-even",
  "center-odd"
], H = {
  autoplay: 0,
  breakpointMode: Da[0],
  breakpoints: void 0,
  dir: Ta[0],
  enabled: !0,
  gap: 0,
  height: "auto",
  i18n: ml,
  ignoreAnimations: !1,
  itemsToScroll: 1,
  itemsToShow: 1,
  modelValue: 0,
  mouseDrag: !0,
  pauseAutoplayOnHover: !1,
  preventExcessiveDragging: !1,
  slideEffect: Ia[0],
  snapAlign: Ba[0],
  touchDrag: !0,
  transition: 300,
  wrapAround: !1
}, at = Symbol("carousel"), pl = (e) => {
  const i = Jt([]), o = (n) => {
    n !== void 0 ? i.slice(n).forEach((l, t) => {
      var p;
      (p = l.exposed) === null || p === void 0 || p.setIndex(n + t);
    }) : i.forEach((l, t) => {
      var p;
      (p = l.exposed) === null || p === void 0 || p.setIndex(t);
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
function gl(e) {
  return e.length === 0 ? 0 : e.reduce((o, n) => o + n, 0) / e.length;
}
function fa({ slides: e, position: i, toShow: o }) {
  const n = [], l = i === "before", t = l ? -o : 0, p = l ? 0 : o;
  if (e.length <= 0)
    return n;
  for (let h = t; h < p; h++) {
    const d = {
      index: l ? h : h + e.length,
      isClone: !0,
      position: i,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${i}-${h}`
    }, k = e[(h % e.length + e.length) % e.length].vnode, I = _a(k, d);
    I.el = null, n.push(I);
  }
  return n;
}
const yl = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function ma(e) {
  if (!e.el || !(e.el instanceof Element))
    return;
  const i = e.el.querySelectorAll(yl);
  for (const o of i)
    o instanceof HTMLElement && !o.hasAttribute("disabled") && o.getAttribute("aria-hidden") !== "true" && o.setAttribute("tabindex", "-1");
}
function bl(e, i) {
  return Object.keys(e).filter((o) => !i.includes(o)).reduce((o, n) => (o[n] = e[n], o), {});
}
function hl(e) {
  const { isVertical: i, isReversed: o, dragged: n, effectiveSlideSize: l } = e, t = i ? n.y : n.x;
  if (t === 0)
    return 0;
  const p = Math.round(t / l);
  return o ? p : -p;
}
function Ve({ val: e, max: i, min: o }) {
  return i < o ? e : Math.min(Math.max(e, isNaN(o) ? e : o), isNaN(i) ? e : i);
}
function kl(e) {
  const { transform: i } = window.getComputedStyle(e);
  return i.split(/[(,)]/).slice(1, -1).map((o) => parseFloat(o));
}
function Sl(e) {
  let i = 1, o = 1;
  return e.forEach((n) => {
    const l = kl(n);
    l.length === 6 && (i /= l[0], o /= l[3]);
  }), { widthMultiplier: i, heightMultiplier: o };
}
function Cl(e, i) {
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
function wl(e, i, o) {
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
function Qt({ slideSize: e, viewportSize: i, align: o, itemsToShow: n }) {
  return n !== void 0 ? Cl(o, n) : e !== void 0 && i !== void 0 ? wl(o, e, i) : 0;
}
function Aa(e = "", i = {}) {
  return Object.entries(i).reduce((o, [n, l]) => o.replace(`{${n}}`, String(l)), e);
}
function Ea({ val: e, max: i, min: o = 0 }) {
  const n = i - o + 1;
  return ((e - o) % n + n) % n + o;
}
function Wt(e, i = 0) {
  let o = !1, n = 0, l = null;
  function t(...p) {
    if (o)
      return;
    o = !0;
    const h = () => {
      l = requestAnimationFrame((T) => {
        T - n > i ? (n = T, e(...p), o = !1) : h();
      });
    };
    h();
  }
  return t.cancel = () => {
    l && (cancelAnimationFrame(l), l = null, o = !1);
  }, t;
}
function jt(e, i = "px") {
  if (!(e == null || e === ""))
    return typeof e == "number" || parseFloat(e).toString() === e ? `${e}${i}` : e;
}
const Dl = he({
  name: "CarouselAria",
  setup() {
    const e = Et(at);
    return e ? () => J("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, Aa(e.config.i18n.itemXofY, {
      currentSlide: e.currentSlide + 1,
      slidesCount: e.slidesCount
    })) : () => "";
  }
}), Tl = {
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
    validator(e) {
      return Da.includes(e);
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
    validator(e, i) {
      return e && i.wrapAround && console.warn('[vue3-carousel warn]: "preventExcessiveDragging" cannot be used with wrapAround. The setting will be ignored.'), !0;
    }
  },
  // control snap position alignment
  snapAlign: {
    default: H.snapAlign,
    validator(e) {
      return Ba.includes(e);
    }
  },
  slideEffect: {
    type: String,
    default: H.slideEffect,
    validator(e) {
      return Ia.includes(e);
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
    validator(e, i) {
      if (!Ta.includes(e))
        return !1;
      const o = e in zt ? zt[e] : e;
      return ["ttb", "btt"].includes(o) && (!i.height || i.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${e}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: H.wrapAround,
    type: Boolean
  }
}, Il = he({
  name: "VueCarousel",
  props: Tl,
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
    const t = pl(o), p = t.getSlides(), h = r(() => p.length), T = D(null), d = D(null), k = D(0), I = r(() => Object.assign(Object.assign(Object.assign({}, H), bl(e, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, H.i18n), e.i18n) })), v = Jt(Object.assign({}, I.value)), m = D((l = e.modelValue) !== null && l !== void 0 ? l : 0), V = D(m.value);
    U(m, (s) => V.value = s);
    const A = D(0), lt = r(() => Math.ceil((h.value - 1) / 2)), ue = r(() => h.value - 1), re = r(() => 0);
    let ee = null, R = null, S = null;
    const se = r(() => k.value + v.gap), z = r(() => {
      const s = v.dir || "ltr";
      return s in zt ? zt[s] : s;
    }), te = r(() => ["rtl", "btt"].includes(z.value)), de = r(() => ["ttb", "btt"].includes(z.value)), ce = r(() => v.itemsToShow === "auto"), X = r(() => de.value ? "height" : "width");
    function Le() {
      var s;
      if (!ae.value)
        return;
      const b = (I.value.breakpointMode === "carousel" ? (s = T.value) === null || s === void 0 ? void 0 : s.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, w = Object.keys(e.breakpoints || {}).map((M) => Number(M)).sort((M, Q) => +Q - +M), B = {};
      w.some((M) => b >= M ? (Object.assign(B, e.breakpoints[M]), B.i18n && Object.assign(B.i18n, I.value.i18n, e.breakpoints[M].i18n), !0) : !1), Object.assign(v, I.value, B);
    }
    const nt = Wt(() => {
      Le(), ve(), ke();
    }), Ne = Jt(/* @__PURE__ */ new Set()), F = D([]);
    function ot({ widthMultiplier: s, heightMultiplier: b }) {
      F.value = p.map((w) => {
        var B;
        const M = (B = w.exposed) === null || B === void 0 ? void 0 : B.getBoundingRect();
        return {
          width: M.width * s,
          height: M.height * b
        };
      });
    }
    const Me = D({
      width: 0,
      height: 0
    });
    function vt({ widthMultiplier: s, heightMultiplier: b }) {
      var w;
      const B = ((w = d.value) === null || w === void 0 ? void 0 : w.getBoundingClientRect()) || { width: 0, height: 0 };
      Me.value = {
        width: B.width * s,
        height: B.height * b
      };
    }
    function ke() {
      if (!d.value)
        return;
      const s = Sl(Ne);
      if (vt(s), ot(s), ce.value)
        k.value = gl(F.value.map((b) => b[X.value]));
      else {
        const b = Number(v.itemsToShow), w = (b - 1) * v.gap;
        k.value = (Me.value[X.value] - w) / b;
      }
    }
    function ve() {
      !v.wrapAround && h.value > 0 && (m.value = Ve({
        val: m.value,
        max: ue.value,
        min: re.value
      })), ce.value || (v.itemsToShow = Ve({
        val: Number(v.itemsToShow),
        max: h.value,
        min: 1
      }));
    }
    const ft = r(() => typeof e.ignoreAnimations == "string" ? e.ignoreAnimations.split(",") : Array.isArray(e.ignoreAnimations) ? e.ignoreAnimations : e.ignoreAnimations ? !1 : []);
    Kt(() => ve()), Kt(() => {
      ke();
    });
    let Oe;
    const xt = (s) => {
      const b = s.target;
      if (!(!(b != null && b.contains(T.value)) || Array.isArray(ft.value) && ft.value.includes(s.animationName)) && (Ne.add(b), !Oe)) {
        const w = () => {
          Oe = requestAnimationFrame(() => {
            ke(), w();
          });
        };
        w();
      }
    }, Vt = (s) => {
      const b = s.target;
      b && Ne.delete(b), Oe && Ne.size === 0 && (cancelAnimationFrame(Oe), ke());
    }, ae = D(!1);
    typeof document < "u" && Kt(() => {
      ae.value && ft.value !== !1 ? (document.addEventListener("animationstart", xt), document.addEventListener("animationend", Vt)) : (document.removeEventListener("animationstart", xt), document.removeEventListener("animationend", Vt));
    }), ea(() => {
      ae.value = !0, Le(), ut(), T.value && (S = new ResizeObserver(nt), S.observe(T.value)), o("init");
    }), Ya(() => {
      ae.value = !1, t.cleanup(), R && clearTimeout(R), Oe && cancelAnimationFrame(Oe), ee && clearInterval(ee), S && (S.disconnect(), S = null), typeof document < "u" && Lt(), T.value && (T.value.removeEventListener("transitionend", ke), T.value.removeEventListener("animationiteration", ke));
    });
    let Se = !1;
    const Ce = { x: 0, y: 0 }, fe = Xt({ x: 0, y: 0 }), it = D(!1), mt = D(!1), Gt = () => {
      it.value = !0;
    }, pt = () => {
      it.value = !1;
    }, Rt = Wt((s) => {
      if (!s.ctrlKey)
        switch (s.key) {
          case "ArrowLeft":
          case "ArrowUp":
            de.value === s.key.endsWith("Up") && (te.value ? He(!0) : $e(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            de.value === s.key.endsWith("Down") && (te.value ? $e(!0) : He(!0));
            break;
        }
    }, 200), Ge = () => {
      document.addEventListener("keydown", Rt);
    }, Lt = () => {
      document.removeEventListener("keydown", Rt);
    };
    function gt(s) {
      const b = s.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(b) || le.value || (Se = s.type === "touchstart", !Se && (s.preventDefault(), s.button !== 0)))
        return;
      Ce.x = "touches" in s ? s.touches[0].clientX : s.clientX, Ce.y = "touches" in s ? s.touches[0].clientY : s.clientY;
      const w = Se ? "touchmove" : "mousemove", B = Se ? "touchend" : "mouseup";
      document.addEventListener(w, yt, { passive: !1 }), document.addEventListener(B, Nt, { passive: !0 });
    }
    const yt = Wt((s) => {
      mt.value = !0;
      const b = "touches" in s ? s.touches[0].clientX : s.clientX, w = "touches" in s ? s.touches[0].clientY : s.clientY;
      fe.x = b - Ce.x, fe.y = w - Ce.y;
      const B = hl({
        isVertical: de.value,
        isReversed: te.value,
        dragged: fe,
        effectiveSlideSize: se.value
      });
      V.value = v.wrapAround ? m.value + B : Ve({
        val: m.value + B,
        max: ue.value,
        min: re.value
      }), o("drag", { deltaX: fe.x, deltaY: fe.y });
    });
    function Nt() {
      if (yt.cancel(), V.value !== m.value && !Se) {
        const w = (B) => {
          B.preventDefault(), window.removeEventListener("click", w);
        };
        window.addEventListener("click", w);
      }
      Y(V.value), fe.x = 0, fe.y = 0, mt.value = !1;
      const s = Se ? "touchmove" : "mousemove", b = Se ? "touchend" : "mouseup";
      document.removeEventListener(s, yt), document.removeEventListener(b, Nt);
    }
    function ut() {
      !v.autoplay || v.autoplay <= 0 || (ee = setInterval(() => {
        v.pauseAutoplayOnHover && it.value || He();
      }, v.autoplay));
    }
    function bt() {
      ee && (clearInterval(ee), ee = null);
    }
    function oe() {
      bt(), ut();
    }
    const le = D(!1);
    function Y(s, b = !1) {
      if (!b && le.value)
        return;
      let w = s, B = s;
      A.value = m.value, v.wrapAround ? B = Ea({
        val: w,
        max: ue.value,
        min: re.value
      }) : w = Ve({
        val: w,
        max: ue.value,
        min: re.value
      }), o("slide-start", {
        slidingToIndex: s,
        currentSlideIndex: m.value,
        prevSlideIndex: A.value,
        slidesCount: h.value
      }), bt(), le.value = !0, m.value = w, B !== w && rt.pause(), o("update:modelValue", B), R = setTimeout(() => {
        v.wrapAround && B !== w && (rt.resume(), m.value = B, o("loop", {
          currentSlideIndex: m.value,
          slidingToIndex: s
        })), o("slide-end", {
          currentSlideIndex: m.value,
          prevSlideIndex: A.value,
          slidesCount: h.value
        }), le.value = !1, oe();
      }, v.transition);
    }
    function He(s = !1) {
      Y(m.value + v.itemsToScroll, s);
    }
    function $e(s = !1) {
      Y(m.value - v.itemsToScroll, s);
    }
    function Mt() {
      Le(), ve(), ke(), oe();
    }
    U(() => [I.value, e.breakpoints], () => Le(), { deep: !0 }), U(() => e.autoplay, () => oe());
    const rt = U(() => e.modelValue, (s) => {
      s !== m.value && Y(Number(s), !0);
    });
    o("before-init");
    const Ae = r(() => {
      if (!v.wrapAround)
        return { before: 0, after: 0 };
      if (ce.value)
        return { before: p.length, after: p.length };
      const s = Number(v.itemsToShow), b = Math.ceil(s + (v.itemsToScroll - 1)), w = b - V.value, B = b - (h.value - (V.value + 1));
      return {
        before: Math.max(0, w),
        after: Math.max(0, B)
      };
    }), _ = r(() => Ae.value.before ? ce.value ? F.value.slice(-1 * Ae.value.before).reduce((s, b) => s + b[X.value] + v.gap, 0) * -1 : Ae.value.before * se.value * -1 : 0), ht = r(() => {
      var s;
      if (ce.value) {
        const b = (m.value % p.length + p.length) % p.length;
        return Qt({
          slideSize: (s = F.value[b]) === null || s === void 0 ? void 0 : s[X.value],
          viewportSize: Me.value[X.value],
          align: v.snapAlign
        });
      }
      return Qt({
        align: v.snapAlign,
        itemsToShow: +v.itemsToShow
      });
    }), Fe = r(() => {
      let s = 0;
      if (ce.value) {
        if (m.value < 0 ? s = F.value.slice(m.value).reduce((b, w) => b + w[X.value] + v.gap, 0) * -1 : s = F.value.slice(0, m.value).reduce((b, w) => b + w[X.value] + v.gap, 0), s -= ht.value, !v.wrapAround) {
          const b = F.value.reduce((w, B) => w + B[X.value] + v.gap, 0) - Me.value[X.value] - v.gap;
          s = Ve({
            val: s,
            max: b,
            min: 0
          });
        }
      } else {
        let b = m.value - ht.value;
        v.wrapAround || (b = Ve({
          val: b,
          max: h.value - +v.itemsToShow,
          min: 0
        })), s = b * se.value;
      }
      return s * (te.value ? 1 : -1);
    }), Ht = r(() => {
      var s, b;
      if (!ce.value) {
        const M = m.value - ht.value;
        return v.wrapAround ? {
          min: Math.floor(M),
          max: Math.ceil(M + Number(v.itemsToShow) - 1)
        } : {
          min: Math.floor(Ve({
            val: M,
            max: h.value - Number(v.itemsToShow),
            min: 0
          })),
          max: Math.ceil(Ve({
            val: M + Number(v.itemsToShow) - 1,
            max: h.value - 1,
            min: 0
          }))
        };
      }
      let w = 0;
      {
        let M = 0, Q = 0 - Ae.value.before;
        const ne = Math.abs(Fe.value + _.value);
        for (; M <= ne; ) {
          const W = (Q % p.length + p.length) % p.length;
          M += ((s = F.value[W]) === null || s === void 0 ? void 0 : s[X.value]) + v.gap, Q++;
        }
        w = Q - 1;
      }
      let B = 0;
      {
        let M = w, Q = 0;
        for (M < 0 ? Q = F.value.slice(0, M).reduce((ne, W) => ne + W[X.value] + v.gap, 0) - Math.abs(Fe.value + _.value) : Q = F.value.slice(0, M).reduce((ne, W) => ne + W[X.value] + v.gap, 0) - Math.abs(Fe.value); Q < Me.value[X.value]; ) {
          const ne = (M % p.length + p.length) % p.length;
          Q += ((b = F.value[ne]) === null || b === void 0 ? void 0 : b[X.value]) + v.gap, M++;
        }
        B = M - 1;
      }
      return {
        min: Math.floor(w),
        max: Math.ceil(B)
      };
    }), qe = r(() => {
      if (v.slideEffect === "fade")
        return;
      const s = de.value ? "Y" : "X", b = de.value ? fe.y : fe.x;
      let w = Fe.value + b;
      if (!v.wrapAround && v.preventExcessiveDragging) {
        let B = 0;
        ce.value ? B = F.value.reduce((ne, W) => ne + W[X.value], 0) : B = (h.value - Number(v.itemsToShow)) * se.value;
        const M = te.value ? 0 : -1 * B, Q = te.value ? B : 0;
        w = Ve({
          val: w,
          min: M,
          max: Q
        });
      }
      return `translate${s}(${w}px)`;
    }), kt = r(() => ({
      "--vc-transition-duration": le.value ? jt(v.transition, "ms") : void 0,
      "--vc-slide-gap": jt(v.gap),
      "--vc-carousel-height": jt(v.height),
      "--vc-cloned-offset": jt(_.value)
    })), St = { slideTo: Y, next: He, prev: $e }, Ot = Xt({
      activeSlide: V,
      config: v,
      currentSlide: m,
      isSliding: le,
      isVertical: de,
      maxSlide: ue,
      minSlide: re,
      nav: St,
      normalizedDir: z,
      slideRegistry: t,
      slideSize: k,
      slides: p,
      slidesCount: h,
      viewport: d,
      visibleRange: Ht
    });
    ha(at, Ot);
    const Ct = Xt({
      config: v,
      currentSlide: m,
      maxSlide: ue,
      middleSlide: lt,
      minSlide: re,
      slideSize: k,
      slidesCount: h
    });
    return n({
      data: Ct,
      nav: St,
      next: He,
      prev: $e,
      restartCarousel: Mt,
      slideTo: Y,
      updateBreakpointsConfig: Le,
      updateSlideSize: ke,
      updateSlidesData: ve
    }), () => {
      var s;
      const b = i.default || i.slides, w = (b == null ? void 0 : b(Ct)) || [], { before: B, after: M } = Ae.value, Q = fa({
        slides: p,
        position: "before",
        toShow: B
      }), ne = fa({
        slides: p,
        position: "after",
        toShow: M
      }), W = [...Q, ...w, ...ne];
      if (!v.enabled || !W.length)
        return J("section", {
          ref: T,
          class: ["carousel", "is-disabled"]
        }, W);
      const Ke = ((s = i.addons) === null || s === void 0 ? void 0 : s.call(i, Ct)) || [], st = J("ol", {
        class: "carousel__track",
        style: { transform: qe.value },
        onMousedownCapture: v.mouseDrag ? gt : null,
        onTouchstartPassiveCapture: v.touchDrag ? gt : null
      }, W), dt = J("div", { class: "carousel__viewport", ref: d }, st);
      return J("section", {
        ref: T,
        class: [
          "carousel",
          `is-${z.value}`,
          `is-effect-${v.slideEffect}`,
          {
            "is-vertical": de.value,
            "is-sliding": le.value,
            "is-dragging": mt.value,
            "is-hover": it.value
          }
        ],
        dir: z.value,
        style: kt.value,
        "aria-label": v.i18n.ariaGallery,
        tabindex: "0",
        onFocus: Ge,
        onBlur: Lt,
        onMouseenter: Gt,
        onMouseleave: pt
      }, [dt, Ke, J(Dl)]);
    };
  }
});
var Zt;
(function(e) {
  e.arrowDown = "arrowDown", e.arrowLeft = "arrowLeft", e.arrowRight = "arrowRight", e.arrowUp = "arrowUp";
})(Zt || (Zt = {}));
const pa = (e) => `icon${e.charAt(0).toUpperCase() + e.slice(1)}`, Bl = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function Al(e) {
  return e in Zt;
}
const ga = (e) => e && Al(e), ya = he({
  props: {
    name: {
      type: String,
      required: !0,
      validator: ga
    },
    title: {
      type: String,
      default: (e) => e.name ? H.i18n[pa(e.name)] : ""
    }
  },
  setup(e) {
    const i = Et(at, null);
    return () => {
      const o = e.name;
      if (!o || !ga(o))
        return;
      const n = Bl[o], l = J("path", { d: n }), t = (i == null ? void 0 : i.config.i18n[pa(o)]) || e.title, p = J("title", t);
      return J("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": t
      }, [p, l]);
    };
  }
}), El = he({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(e, { slots: i, attrs: o }) {
    const n = Et(at);
    if (!n)
      return () => "";
    const { next: l, prev: t } = i, p = () => ({
      btt: "arrowDown",
      ltr: "arrowLeft",
      rtl: "arrowRight",
      ttb: "arrowUp"
    })[n.normalizedDir], h = () => ({
      btt: "arrowUp",
      ltr: "arrowRight",
      rtl: "arrowLeft",
      ttb: "arrowDown"
    })[n.normalizedDir], T = r(() => !n.config.wrapAround && n.currentSlide <= n.minSlide), d = r(() => !n.config.wrapAround && n.currentSlide >= n.maxSlide);
    return () => {
      const { i18n: k } = n.config, I = J("button", Object.assign(Object.assign({ type: "button", disabled: T.value, "aria-label": k.ariaPreviousSlide, title: k.ariaPreviousSlide, onClick: n.nav.prev }, o), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": T.value },
        o.class
      ] }), (t == null ? void 0 : t()) || J(ya, { name: p() })), v = J("button", Object.assign(Object.assign({ type: "button", disabled: d.value, "aria-label": k.ariaNextSlide, title: k.ariaNextSlide, onClick: n.nav.next }, o), { class: [
        "carousel__next",
        { "carousel__next--disabled": d.value },
        o.class
      ] }), (l == null ? void 0 : l()) || J(ya, { name: h() }));
      return [I, v];
    };
  }
}), xl = he({
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
    const i = Et(at);
    if (!i)
      return () => "";
    const o = r(() => i.config.itemsToShow), n = r(() => Qt({
      align: i.config.snapAlign,
      itemsToShow: o.value
    })), l = r(() => e.paginateByItemsToShow && o.value > 1), t = r(() => Math.ceil((i.activeSlide - n.value) / o.value)), p = r(() => Math.ceil(i.slidesCount / o.value)), h = (T) => Ea(l.value ? {
      val: t.value,
      max: p.value - 1,
      min: 0
    } : {
      val: i.activeSlide,
      max: i.maxSlide,
      min: i.minSlide
    }) === T;
    return () => {
      var T, d;
      const k = [];
      for (let I = l.value ? 0 : i.minSlide; I <= (l.value ? p.value - 1 : i.maxSlide); I++) {
        const v = Aa(i.config.i18n[l.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: I + 1
        }), m = h(I), V = J("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": m
          },
          "aria-label": v,
          "aria-pressed": m,
          "aria-controls": (d = (T = i.slides[I]) === null || T === void 0 ? void 0 : T.exposed) === null || d === void 0 ? void 0 : d.id,
          title: v,
          disabled: e.disableOnClick,
          onClick: () => i.nav.slideTo(l.value ? Math.floor(I * +i.config.itemsToShow + n.value) : I)
        }), A = J("li", { class: "carousel__pagination-item", key: I }, V);
        k.push(A);
      }
      return J("ol", { class: "carousel__pagination" }, k);
    };
  }
}), ba = he({
  name: "CarouselSlide",
  props: {
    id: {
      type: String,
      default: (e) => e.isClone ? void 0 : Wa()
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
    const l = Et(at);
    if (ha(at, void 0), !l)
      return () => "";
    const t = D(e.index), p = (V) => {
      t.value = V;
    }, h = Ja(), T = () => {
      const V = h.vnode.el;
      return V ? V.getBoundingClientRect() : { width: 0, height: 0 };
    };
    n({
      id: e.id,
      setIndex: p,
      getBoundingRect: T
    });
    const d = r(() => t.value === l.activeSlide), k = r(() => t.value === l.activeSlide - 1), I = r(() => t.value === l.activeSlide + 1), v = r(() => t.value >= l.visibleRange.min && t.value <= l.visibleRange.max), m = r(() => {
      if (l.config.itemsToShow === "auto")
        return;
      const V = l.config.itemsToShow, A = l.config.gap > 0 && V > 1 ? `calc(${100 / V}% - ${l.config.gap * (V - 1) / V}px)` : `${100 / V}%`;
      return l.isVertical ? { height: A } : { width: A };
    });
    return l.slideRegistry.registerSlide(h, e.index), Qa(() => {
      l.slideRegistry.unregisterSlide(h);
    }), e.isClone && (ea(() => {
      ma(h.vnode);
    }), Za(() => {
      ma(h.vnode);
    })), () => {
      var V, A;
      return l.config.enabled ? J("li", {
        style: [i.style, Object.assign({}, m.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": e.isClone,
          "carousel__slide--visible": v.value,
          "carousel__slide--active": d.value,
          "carousel__slide--prev": k.value,
          "carousel__slide--next": I.value,
          "carousel__slide--sliding": l.isSliding
        },
        onFocusin: () => {
          l.viewport && (l.viewport.scrollLeft = 0), l.nav.slideTo(t.value);
        },
        id: e.isClone ? void 0 : e.id,
        "aria-hidden": e.isClone || void 0
      }, (A = o.default) === null || A === void 0 ? void 0 : A.call(o, {
        currentIndex: t.value,
        isActive: d.value,
        isClone: e.isClone,
        isPrev: k.value,
        isNext: I.value,
        isSliding: l.isSliding,
        isVisible: v.value
      })) : (V = o.default) === null || V === void 0 ? void 0 : V.call(o);
    };
  }
}), Vl = (e, i, o, n) => {
  var p, h, T, d, k;
  if (!o) return 0;
  let l, t;
  if (o.type === Re.Field ? [Qe.Number, Qe.Range].includes((p = o.field) == null ? void 0 : p.type) ? (l = parseFloat(e[o.key]), t = parseFloat(i[o.key])) : [Qe.Date, Qe.Date].includes((h = o.field) == null ? void 0 : h.type) ? (l = e[o.key], t = i[o.key]) : ((T = o.field) == null ? void 0 : T.type) === Qe.Select && ((d = o.field) != null && d.multiple) && ((k = o.field) == null ? void 0 : k.multipleDisplay) === ll.Count ? (l = e[o.key].length, t = i[o.key].length) : (l = String(e[o.key]).toLowerCase(), t = String(i[o.key]).toLowerCase()) : (l = String(e[o.key]).toLowerCase(), t = String(i[o.key]).toLowerCase()), n === tt.Asc) {
    if (l > t) return 1;
    if (t > l) return -1;
  } else {
    if (l > t) return -1;
    if (t > l) return 1;
  }
  return 0;
}, Ze = (e, i, o, n = []) => {
  if (e.extractTitleFromColumn) {
    let t = n.find((p) => p.key === e.extractTitleFromColumn);
    if (t)
      return Ze(t, i, o, n);
  }
  let l = e.type === Re.ColumnIndex ? o : i[e.key];
  if (e.formatter && typeof e.formatter == "function") {
    let t = e.formatter(l, i, e, o);
    return typeof t == "string" && t.startsWith("__:") ? al(t.substring(3)) : t;
  }
  return l;
}, Rl = (e, i, o) => {
  if (!e.colspan) return -1;
  let n = i;
  return o.forEach((l) => {
    let t = ta(e, l);
    t > 0 && t < n && (n = t);
  }), n;
}, ta = (e, i) => e.colspan === !1 ? !1 : typeof e.colspan == "function" ? e.colspan(i) : e.colspan, xa = (e, i) => typeof e.preferSlot > "u" ? !0 : e.preferSlot === !1 ? !1 : typeof e.preferSlot == "function" ? e.preferSlot(i) : !0, Ll = (e, i, o) => {
  if (typeof e != "object" || !e.key && [Re.Field].includes(e.type) || i.indexOf(e.key) > -1) return !1;
  let n = ta(e, o);
  return typeof e.colspan > "u" ? !0 : (typeof e.colspan < "u" && (typeof e.colspan == "function" ? n = parseInt(e.colspan(o)) : n = parseInt(e.colspan)), n > 0);
}, Nl = (e = []) => {
  if (e.length > 0) {
    for (let i = 0; i < e.length; ++i)
      if (e[i].sortable) return e[i].key;
  }
  return "";
}, Ml = (e, i) => {
  if (e.length > 0) {
    for (let o = 0; o < e.length; ++o)
      if (e[o].key === i) return e[o];
  }
  return null;
}, Va = (e) => {
  let i = [];
  return e.class && i.push(e.class), e.type && i.push(`is-${e.type}`), i.join(" ");
}, _t = /* @__PURE__ */ he({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new Ca() },
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
    const o = i, n = e, l = D(n.modelValue);
    U(() => n.modelValue, (k) => {
      l.value = k;
    }), U(l, (k) => {
      o("update:modelValue", k);
    });
    const t = () => {
      o("inline-drop");
    }, p = r(() => ({ ...n.column.slotData, item: l.value })), h = r(() => {
      var k, I, v, m;
      if ((k = n.column.field) != null && k.modalData && typeof ((I = n.column.field) == null ? void 0 : I.modalData) == "object")
        for (let V in n.column.field.modalData)
          if (typeof ((v = n.column.field) == null ? void 0 : v.modalData[V]) == "string" && n.column.field.modalData[V].startsWith("prop:")) {
            let A = n.column.field.modalData[V].substring(5);
            l.value[A];
          } else
            n.column.field.modalData[V];
      return (m = n.column.field) == null ? void 0 : m.modalData;
    }), T = r(() => typeof n.column.field == "string" && n.column.field.startsWith("prop:") ? nl(n.column.field, l.value) : n.column.field), d = r(() => {
      var k, I, v, m;
      return n.column.type === Re.Field ? !((I = (k = n.column) == null ? void 0 : k.field) != null && I.label) && (n.column.ensureFieldLabel || [
        Qe.Switch,
        Qe.Check
      ].includes((v = n.column.field) == null ? void 0 : v.type)) ? n.column.label : (m = n.column.field) == null ? void 0 : m.label : "";
    });
    return (k, I) => {
      const v = ie("lkt-anchor"), m = ie("lkt-button"), V = ie("lkt-field");
      return e.column.type === y(Re).Anchor ? (c(), L(v, K({ key: 0 }, e.column.anchor, { prop: l.value }), {
        default: P(() => [
          _e(et(y(Ze)(e.column, l.value, e.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : e.column.type === y(Re).Button ? (c(), L(m, K({ key: 1 }, e.column.button, { prop: l.value }), {
        default: P(() => [
          _e(et(y(Ze)(e.column, l.value, e.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : e.column.type === y(Re).Field ? (c(), L(V, K({
        key: 2,
        modelValue: l.value[e.column.key],
        "onUpdate:modelValue": I[0] || (I[0] = (A) => l.value[e.column.key] = A)
      }, {
        ...T.value,
        readMode: !e.hasInlineEditPerm || T.value.readMode,
        slotData: p.value,
        label: d.value,
        modalData: h.value,
        prop: l.value
      }), null, 16, ["modelValue"])) : e.column.type === y(Re).InlineDrop ? (c(), L(m, K({ key: 3 }, e.column.button, {
        prop: l.value,
        onClick: t
      }), {
        default: P(() => [
          _e(et(y(Ze)(e.column, l.value, e.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : e.column.type === y(Re).ColumnIndex && e.column.field ? (c(), L(V, me(K({ key: 4 }, {
        ...T.value,
        modelValue: y(Ze)(e.column, l.value, e.i, e.columns),
        readMode: !0,
        slotData: p.value,
        label: d.value,
        modalData: h.value,
        prop: l.value
      })), null, 16)) : (c(), C(q, { key: 5 }, [
        _e(et(y(Ze)(e.column, l.value, e.i, e.columns)), 1)
      ], 64));
    };
  }
}), At = class At {
};
At.navButtonSlot = "", At.createButtonSlot = "", At.defaultEmptySlot = void 0;
let be = At;
const Ol = ["data-i", "data-draggable"], $l = ["data-role", "data-i"], Fl = {
  key: 1,
  class: "lkt-table-nav-cell"
}, Pl = { class: "lkt-table-nav-container" }, Ul = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, jl = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, zl = ["colspan"], Gl = ["colspan"], Hl = ["colspan"], ql = ["data-column", "colspan", "title"], Kl = /* @__PURE__ */ he({
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
    rowDisplayType: { type: [Number, Function], default: Be.Auto },
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
    const o = ka(), n = i, l = e, t = D(l.modelValue);
    let p = typeof l.rowDisplayType == "function" ? l.rowDisplayType(t.value, l.i) : l.rowDisplayType;
    p || (p = Be.Auto);
    const h = [Be.Auto, Be.PreferCustomItem].includes(p), T = [Be.Auto, Be.PreferItem].includes(p), d = (R) => n("click", R), k = r(() => {
      let R = [], S = typeof l.disabledDrag == "function" ? l.disabledDrag(t.value) : ue.value === !0;
      return !S && l.sortable && l.isDraggable ? R.push("handle") : S && R.push("disabled"), R.join(" ");
    }), I = r(() => be.navButtonSlot !== ""), v = r(() => be.navButtonSlot), m = () => {
      n("item-up", l.i);
    }, V = () => {
      n("item-down", l.i);
    }, A = () => {
      n("item-drop", l.i);
    };
    U(() => l.modelValue, (R) => t.value = R), U(t, (R) => {
      n("update:modelValue", R);
    }, { deep: !0 });
    const lt = r(() => typeof l.renderDrag == "function" ? l.renderDrag(t.value) : l.renderDrag === !0), ue = r(() => typeof l.disabledDrag == "function" ? l.disabledDrag(t.value) : l.disabledDrag === !0), re = r(() => k.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), ee = r(() => {
      let R = [];
      return h && R.push("type-custom-item"), T && R.push("type-item"), typeof l.itemContainerClass == "function" ? R.push(l.itemContainerClass(t.value, l.i)) : l.itemContainerClass !== "" && R.push(l.itemContainerClass), R.join(" ");
    });
    return (R, S) => {
      const se = ie("lkt-button");
      return c(), C("tr", {
        "data-i": e.i,
        "data-draggable": e.isDraggable,
        class: Z(ee.value)
      }, [
        e.sortable && e.editModeEnabled && lt.value ? (c(), C("td", {
          key: 0,
          "data-role": re.value,
          class: Z(k.value),
          "data-i": e.i
        }, [...S[2] || (S[2] = [
          ge("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ])], 10, $l)) : x("", !0),
        e.addNavigation && e.editModeEnabled ? (c(), C("td", Fl, [
          ge("div", Pl, [
            pe(se, {
              palette: "table-nav",
              disabled: e.i === 0,
              onClick: m
            }, {
              default: P(() => [
                I.value ? (c(), L(ye(v.value), {
                  key: 0,
                  direction: "up"
                })) : (c(), C("i", Ul))
              ]),
              _: 1
            }, 8, ["disabled"]),
            pe(se, {
              palette: "table-nav",
              disabled: e.latestRow,
              onClick: V
            }, {
              default: P(() => [
                I.value ? (c(), L(ye(v.value), {
                  key: 0,
                  direction: "down"
                })) : (c(), C("i", jl))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : x("", !0),
        e.itemSlotComponent ? (c(), C("td", {
          key: "td" + e.i,
          colspan: e.visibleColumns.length
        }, [
          (c(), L(ye(e.itemSlotComponent), me(Sa({
            item: t.value,
            index: e.i,
            editing: e.editModeEnabled,
            perms: e.permissions,
            data: e.itemSlotData,
            events: e.itemSlotEvents
          })), null, 16))
        ], 8, zl)) : y(h) && y(o)[`item-${e.i}`] ? (c(), C("td", {
          key: "td" + e.i,
          colspan: e.visibleColumns.length
        }, [
          $(R.$slots, `item-${e.i}`, {
            item: t.value,
            index: e.i,
            editing: e.editModeEnabled,
            canCreate: e.canCreate,
            canRead: e.canRead,
            canUpdate: e.canEdit,
            canDrop: e.canDrop,
            isLoading: e.isLoading,
            doDrop: () => A()
          })
        ], 8, Gl)) : y(T) && y(o).item ? (c(), C("td", {
          key: "td" + e.i,
          colspan: e.visibleColumns.length
        }, [
          $(R.$slots, "item", {
            item: t.value,
            index: e.i,
            editing: e.editModeEnabled,
            canCreate: e.canCreate,
            canRead: e.canRead,
            canUpdate: e.canEdit,
            canDrop: e.canDrop,
            isLoading: e.isLoading,
            doDrop: () => A()
          })
        ], 8, Hl)) : (c(!0), C(q, { key: 5 }, Te(e.visibleColumns, (z) => (c(), C(q, null, [
          y(Ll)(z, e.emptyColumns, t.value) ? (c(), C("td", {
            key: "td" + e.i,
            "data-column": z.key,
            colspan: y(ta)(z, t.value),
            title: y(Ze)(z, t.value, e.i, e.visibleColumns),
            class: Z(y(Va)(z)),
            onClick: S[1] || (S[1] = (te) => d(te))
          }, [
            R.$slots[z.key] && y(xa)(z, t.value) ? $(R.$slots, z.key, {
              key: 0,
              value: t.value[z.key],
              item: t.value,
              column: z,
              i: e.i
            }) : t.value ? (c(), L(_t, {
              key: 1,
              modelValue: t.value,
              "onUpdate:modelValue": S[0] || (S[0] = (te) => t.value = te),
              column: z,
              columns: e.visibleColumns,
              "edit-mode-enabled": e.editModeEnabled,
              "has-inline-edit-perm": e.hasInlineEditPerm,
              i: e.i,
              onInlineDrop: A
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : x("", !0)
          ], 10, ql)) : x("", !0)
        ], 64))), 256))
      ], 10, Ol);
    };
  }
}), Bt = /* @__PURE__ */ he({
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
    var d;
    const o = i, n = e, l = r(() => be.createButtonSlot !== ""), t = r(() => be.createButtonSlot), p = {
      ...(d = n.config) == null ? void 0 : d.modalData,
      beforeClose: (k) => {
        "itemCreated" in k && k.itemCreated === !0 && o("append", k.item);
      }
    }, h = {
      ...n.config
    };
    h.modalData = p;
    const T = () => {
      var k;
      if (!((k = n.config) != null && k.modal)) {
        o("click");
        return;
      }
    };
    return (k, I) => {
      const v = ie("lkt-button");
      return c(), L(v, K(h, {
        disabled: e.disabled,
        onClick: T
      }), {
        default: P(() => [
          l.value ? (c(), L(ye(t.value), { key: 0 })) : x("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), Xl = ["data-column", "data-sortable", "data-sort", "colspan", "title"], Yl = /* @__PURE__ */ he({
  __name: "TableHeader",
  props: {
    column: { default: () => new Ca() },
    sortBy: { default: "" },
    sortDirection: { default: "" },
    amountOfColumns: { default: 0 },
    items: { default: () => [] }
  },
  emits: [
    "click"
  ],
  setup(e, { emit: i }) {
    const o = i, n = e, l = r(() => Rl(n.column, n.amountOfColumns, n.items)), t = r(() => n.column.sortable === !0), p = r(() => t.value && n.sortBy === n.column.key ? n.sortDirection : ""), h = r(() => wa(n.column.label)), T = r(() => t.value && n.sortBy === n.column.key ? n.sortDirection === tt.Asc ? Ie.defaultTableSortAscIcon : n.sortDirection === tt.Desc ? Ie.defaultTableSortDescIcon : "" : ""), d = () => o("click", n.column);
    return (k, I) => (c(), C("th", {
      "data-column": e.column.key,
      "data-sortable": t.value,
      "data-sort": p.value,
      colspan: l.value,
      title: h.value,
      class: Z(y(Va)(e.column)),
      onClick: d
    }, [
      ge("div", null, [
        _e(et(h.value) + " ", 1),
        T.value ? (c(), C("i", {
          key: 0,
          class: Z(T.value)
        }, null, 2)) : x("", !0)
      ])
    ], 10, Xl));
  }
}), Wl = ["id"], Jl = { class: "lkt-table-page-buttons" }, Ql = { class: "switch-edition-mode" }, Zl = { class: "switch-edition-mode" }, _l = {
  key: 0,
  class: "lkt-table-page-buttons"
}, en = {
  key: 1,
  class: "lkt-table-page-filters"
}, tn = { class: "lkt-table" }, an = { key: 0 }, ln = { key: 0 }, nn = {
  key: 0,
  "data-role": "drag-indicator"
}, on = { key: 1 }, un = ["id"], rn = ["id"], sn = ["data-i"], dn = ["id"], cn = ["data-i"], vn = ["id"], fn = { class: "lkt-carousel-slide" }, mn = { class: "lkt-carousel-slide" }, pn = ["id"], gn = {
  key: 3,
  class: "lkt-table-empty"
}, yn = {
  key: 5,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, bn = /* @__PURE__ */ he({
  __name: "LktTable",
  props: /* @__PURE__ */ el({
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
  }, ol(il)),
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
    var sa, da;
    const n = o, l = ka(), t = e, p = D(typeof t.sorter == "function" ? t.sorter : Vl), h = D(Nl(t.columns)), T = D(tt.Asc), d = D(t.modelValue), k = D(null), I = D(t.columns), v = D((sa = t.paginator) == null ? void 0 : sa.modelValue), m = D(t.loading), V = D(!1), A = D(t.perms), lt = D(null), ue = D(null), re = D(null), ee = D({}), R = D(new sl({ items: d.value }, t.dataStateConfig)), S = D(t.editMode), se = D(0), z = D(null), te = D(t.type), de = D(((da = t.carousel) == null ? void 0 : da.currentSlide) || 0), ce = D(void 0), X = D(void 0), Le = D(void 0), nt = D({
      ...typeof t.paginator.resourceData == "object" ? t.paginator.resourceData : {}
    }), Ne = D({
      ...typeof t.paginator.resourceData == "object" ? t.paginator.resourceData : {}
    }), F = D(ze(t.saveButton, Ie.defaultSaveButton)), ot = D(ze(t.createButton, Ie.defaultCreateButton)), Me = D(ze(t.createButton, Ie.defaultInlineCreateButton)), vt = D(ze(t.editModeButton, Ie.defaultEditModeButton)), ke = D(ze(t.groupButton, Ie.defaultGroupButton));
    U(() => t.saveButton, (a) => F.value = ze(t.saveButton, Ie.defaultSaveButton)), U(() => t.createButton, (a) => ot.value = ze(t.createButton, Ie.defaultCreateButton)), U(() => t.editModeButton, (a) => vt.value = ze(t.editModeButton, Ie.defaultEditModeButton));
    const ve = D(!1);
    U(m, (a) => n("update:loading", a)), U(v, (a) => n("page", a));
    const ft = (a) => {
      A.value = a;
    }, Oe = (a) => {
      var u, E;
      if (Array.isArray(a.data)) {
        let O = a.data;
        if (typeof ((u = t.events) == null ? void 0 : u.parseResults) == "function" && (O = t.events.parseResults(O)), d.value = [...d.value, ...O], [De.TimelineAsc, De.TimelineDesc, De.TimelineAscDesc].includes((E = t.paginator) == null ? void 0 : E.type)) {
          const j = vl(d.value, t.paginator.dateKey);
          ce.value = j.oldest, X.value = j.newest;
        }
      }
      m.value = !1, V.value = !0, R.value.store({ items: d.value }).turnStoredIntoOriginal(), ve.value = !1, Ut(() => {
        Ge.value, n("read-response", a);
      });
    }, xt = () => Ut(() => {
      var O;
      const a = t.paginator, u = a == null ? void 0 : a.type;
      let E = !0;
      u && ([De.LoadMore, De.Infinite].includes(u) || [De.TimelineDesc, De.TimelineAsc, De.TimelineAscDesc].includes(u) && ((O = t.paginator.timeline) != null && O.accumulative)) && (E = !1), E && d.value.splice(0, d.value.length), m.value = !0;
    }), Vt = () => {
      lt.value.doRefresh();
    }, ae = ul(12), Se = r(() => {
      if (!t.hideEmptyColumns) return [];
      let a = [];
      return I.value.forEach((u) => {
        let E = u.key, O = !1;
        d.value.forEach((j) => {
          if (typeof j.checkEmpty == "function")
            return j.checkEmpty(j);
          j[E] && (O = !0);
        }), O || a.push(E);
      }), a;
    }), Ce = r(() => I.value.filter((a) => !a.hidden)), fe = r(() => I.value.filter((a) => a.isForRowKey)), it = r(() => I.value.map((a) => a.key)), mt = r(() => {
      let a = [];
      for (let u in l) it.value.indexOf(u) !== -1 && a.push(u);
      return a;
    }), Gt = r(() => {
      let a = [];
      for (let u in l) u.indexOf("slide-") !== -1 && a.push(u);
      return a;
    }), pt = r(() => {
      var a;
      return t.hiddenSave || m.value || !((a = F.value) != null && a.resource || F.value.type) ? !1 : S.value && ve.value ? !0 : S.value;
    }), Rt = r(() => Tt.value && d.value.length >= t.requiredItemsForTopCreate || Fe.value ? !0 : pt.value || S.value && oe.value), Ge = r(() => {
      var a, u;
      return se.value, typeof ((a = F.value) == null ? void 0 : a.disabled) == "function" ? F.value.disabled({
        value: d.value,
        dataState: R.value
      }) : typeof ((u = F.value) == null ? void 0 : u.disabled) == "boolean" ? F.value.disabled : !ve.value;
    }), Lt = r(() => d.value.length), gt = r(() => {
      var a;
      return {
        items: d.value,
        ...(a = F.value) == null ? void 0 : a.resourceData
      };
    }), yt = r(() => t.titleTag === "" ? "h2" : t.titleTag), Nt = r(() => t.wrapContentTag === "" ? "div" : t.wrapContentTag), ut = r(() => wa(t.title)), bt = r(() => {
      var a;
      return (a = t.drag) == null ? void 0 : a.enabled;
    }), oe = r(() => A.value.includes(Ee.Create)), le = r(() => A.value.includes("read")), Y = r(() => A.value.includes(Ee.Update)), He = r(() => A.value.includes(Ee.Edit)), $e = r(() => A.value.includes(Ee.InlineEdit)), Mt = r(() => A.value.includes(Ee.ModalCreate)), rt = r(() => A.value.includes(Ee.InlineCreate)), Ae = r(() => A.value.includes(Ee.InlineCreateEver)), _ = r(() => A.value.includes(Ee.Drop)), ht = r(() => A.value.includes(Ee.SwitchEditMode)), Fe = r(() => !ht.value || !Y.value && !_.value || !Y.value && _.value ? !1 : !m.value), Ht = r(() => {
      var a;
      return (typeof ((a = t.paginator) == null ? void 0 : a.type) < "u" && [De.LoadMore, De.Infinite].includes(t.paginator.type) || !m.value) && d.value.length > 0;
    }), qe = r(() => I.value.find((a) => a.isForAccordionHeader)), kt = r(() => I.value.find((a) => a.isCalendarDate)), St = r(() => I.value.find((a) => a.isCalendarGroup)), Ot = (a, u) => typeof t.customItemSlotName == "function" ? t.customItemSlotName(a, u) : "", Ct = (a) => {
      let u = a.target;
      if (typeof u.dataset.column > "u")
        do
          u = u.parentNode;
        while (typeof u.dataset.column > "u" && u.tagName !== "TABLE" && u.tagName !== "body");
      if (u.tagName === "TD" && (u = u.parentNode, u = u.dataset.i, typeof u < "u"))
        return d.value[u];
    }, s = () => {
      se.value = fl();
    }, b = (a) => d.value[a], w = (a) => {
      var u;
      return (u = k.value) == null ? void 0 : u.querySelector(`[data-i="${a}"]`);
    }, B = (a) => {
      a && a.sortable && (a.key === h.value && (T.value = T.value === tt.Asc ? tt.Desc : tt.Asc), h.value = a.key, d.value = d.value.sort((u, E) => p.value(u, E, a, T.value)), s(), n("sort", {
        sortBy: h.value,
        sortDirection: T.value
      }));
    }, M = (a) => {
      n("click", a);
    }, Q = (a) => {
      var E, O, j, G, Ye, Pe, Ue, je;
      let u = parseInt((G = (j = (O = (E = a == null ? void 0 : a.originalEvent) == null ? void 0 : E.toElement) == null ? void 0 : O.closest("tr")) == null ? void 0 : j.dataset) == null ? void 0 : G.i);
      return !(typeof ((Ye = t.drag) == null ? void 0 : Ye.isValid) == "function" && !((Pe = t.drag) != null && Pe.isValid(d.value[u])) || typeof ((Ue = t.drag) == null ? void 0 : Ue.isValid) == "boolean" && !((je = t.drag) != null && je.isValid));
    }, ne = (a) => {
      var u, E;
      return typeof ((u = t.drag) == null ? void 0 : u.isDraggable) == "function" ? (E = t.drag) == null ? void 0 : E.isDraggable(a) : !0;
    }, W = () => {
      if (oe.value) {
        n("click-create");
        return;
      }
      if (rt.value || Ae.value) {
        if (typeof t.newValueGenerator == "function") {
          let a = t.newValueGenerator();
          if (typeof a == "object" || we.value !== xe.Table) {
            d.value.push(a);
            return;
          }
        }
        d.value.push({});
      } else
        n("click-create");
    }, Ke = (a) => {
      d.value.push(a);
    }, st = () => m.value = !0, dt = () => m.value = !1, aa = (a, u) => {
      var E, O, j;
      if (!((E = F.value) != null && E.type && [
        Yt.Split,
        Yt.SplitEver,
        Yt.SplitLazy
      ].includes((O = F.value) == null ? void 0 : O.type))) {
        if (n("before-save"), (j = F.value) != null && j.resource && (m.value = !1, !u.success)) {
          n("error", u.httpStatus);
          return;
        }
        R.value.turnStoredIntoOriginal(), ve.value = !1, n("save", u);
      }
    }, la = (a, u, E) => {
      if (E >= a.length) {
        let O = E - a.length + 1;
        for (; O--; ) a.push(void 0);
      }
      return a.splice(E, 0, a.splice(u, 1)[0]), a;
    }, Ra = (a) => {
      la(d.value, a, a - 1), s();
    }, La = (a) => {
      la(d.value, a, a + 1), s();
    }, wt = (a) => {
      d.value.splice(a, 1), s();
    }, na = () => {
      var a;
      ee.value && typeof ((a = ee.value) == null ? void 0 : a.destroy) == "function" && (ee.value.destroy(), ee.value = {});
    }, qt = () => {
      z.value || (z.value = document.getElementById("lkt-table-body-" + ae)), ee.value = new dl(z.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(a) {
          let u = a.oldIndex, E = a.newIndex;
          d.value.splice(E, 0, d.value.splice(u, 1)[0]), s(), n("drag-end", d.value[E]);
        },
        onMove: function(a, u) {
          return Q(a);
        }
      });
    }, $t = (a, u, E = !1) => {
      let O = [se.value, ae, "row", u];
      return E && O.push("hidden"), fe.value.forEach((j) => {
        let G = String(a[j.key]).toLowerCase();
        G.length > 50 && (G = G.substring(0, 50)), G = rl(G, " ", "-"), O.push(G);
      }), O.join("-");
    }, Dt = r(() => typeof t.createEnabledValidator == "function" ? t.createEnabledValidator({ items: d.value }) : !0), Tt = r(() => t.createButton === !1 ? !1 : Ae.value || oe.value && S.value || rt.value && S.value || Mt.value && S.value), oa = r(() => t.createButton === !1 ? !1 : Ae.value || rt.value && S.value || Mt.value && S.value), Na = r(() => [xe.Ol, xe.Ul].includes(we.value)), It = (a, u) => typeof t.itemDisplayChecker == "function" ? t.itemDisplayChecker(a, u) : !0, Ft = (a, u) => typeof t.itemContainerClass == "function" ? t.itemContainerClass(a, u) : t.itemContainerClass, ia = (a, u) => typeof t.itemContainerStyle == "function" ? t.itemContainerStyle(a, u) : t.itemContainerStyle, Ma = (a, u) => qe.value ? a[qe.value.key] : "", Xe = r(() => typeof t.itemSlotComponent == "function" ? t.itemSlotComponent() : t.itemSlotComponent), Pt = r(() => typeof t.itemSlotData == "function" ? t.itemSlotData() : t.itemSlotData);
    ea(() => {
      var a;
      t.initialSorting && B(Ml(t.columns, h.value)), R.value.store({ items: d.value }).turnStoredIntoOriginal(), ve.value = !1, (a = t.drag) != null && a.enabled && Ut(() => {
        qt();
      });
    }), U(() => {
      var a;
      return (a = t.drag) == null ? void 0 : a.enabled;
    }, (a) => {
      a ? qt() : na();
    }), U(() => t.type, (a) => {
      var u;
      (u = t.drag) != null && u.enabled ? qt() : na();
    }), U(() => t.perms, (a) => A.value = a), U(A, (a) => n("update:perms", a)), U(S, (a) => {
      n("update:editMode", a);
    }), U(() => t.editMode, (a) => S.value = a), U(() => t.columns, (a) => I.value = a, { deep: !0 }), U(() => t.modelValue, (a) => {
      d.value = a;
    }, { deep: !0 }), U(d, (a) => {
      R.value.increment({ items: a }), ve.value = R.value.changed(), n("update:modelValue", a);
    }, { deep: !0 }), i({
      getItemByEvent: Ct,
      getItemByIndex: b,
      getRowByIndex: w,
      doRefresh: Vt,
      doRemoveIndex: (a) => {
        d.value.splice(a, 1), s();
      },
      getHtml: () => ue.value,
      reRender: s,
      turnStoredIntoOriginal: () => {
        R.value.turnStoredIntoOriginal(), Ut(() => {
          s();
        });
      }
    });
    const Oa = r(() => typeof be.defaultEmptySlot < "u"), $a = r(() => be.defaultEmptySlot), Fa = r(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled ? !1 : typeof t.drag.canRender > "u" ? !0 : t.drag.canRender), Pa = r(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled || typeof t.drag.isDisabled > "u" ? !1 : t.drag.isDisabled), Ua = r(() => typeof t.header == "object" && Object.keys(t.header).length > 0), ja = r(() => (console.log("displayFiltersLktForm: ", typeof t.filtersForm == "object" && Object.keys(t.filtersForm).length > 0), typeof t.filtersForm == "object" && Object.keys(t.filtersForm).length > 0)), we = r(() => Array.isArray(t.switchableTypes) && t.switchableTypes.length > 0 ? te.value : t.type), za = r(() => Array.isArray(t.switchableTypes) ? t.switchableTypes.length > 0 ? t.switchableTypes.includes(t.type) ? t.switchableTypes : [
      t.type,
      ...t.switchableTypes
    ] : [] : []), Ga = r(() => {
      let a = [];
      return za.value.forEach((u) => {
        let E = t.switchableTypesButtons[u];
        a.push({
          ...E,
          class: [E.class, u === we.value ? "is-current" : ""].join(" "),
          events: {
            click: (O) => {
              var j, G;
              te.value = u, typeof ((j = t.switchableTypesButtons[u].events) == null ? void 0 : j.click) == "function" && t.switchableTypesButtons[u].events.click(O), typeof ((G = t.events) == null ? void 0 : G.viewChanged) == "function" && t.events.viewChanged(u);
            }
          }
        });
      }), a;
    }), Ha = r(() => {
      var a, u;
      return {
        ...t.header,
        topEndButtons: [
          ...typeof ((a = t.header) == null ? void 0 : a.topEndButtons) > "u" ? [] : (u = t.header) == null ? void 0 : u.topEndButtons,
          ...Ga.value
        ]
      };
    }), ua = (a, u) => typeof t.useItemSlot == "function" ? t.useItemSlot({ item: a, index: u }) === !0 : t.useItemSlot, qa = r(() => {
      if (we.value !== xe.Calendar || !kt.value || typeof kt.value > "u") return [];
      let a = [], u = [];
      return d.value.forEach((E) => {
        var je;
        let O = E[kt.value.key], j = cl("Y-m-d H:i:s", O), G;
        (je = St.value) != null && je.key && (G = E[St.value.key]);
        let Ye = {};
        G && t.calendarGroups && typeof t.calendarGroups[G] == "object" && (Ye = t.calendarGroups[G]);
        const Pe = [j, G].join("-");
        let Ue = -1;
        u.includes(Pe) ? Ue = u.findIndex((g) => g === Pe) : (Ue = u.length, u.push(Pe), a.push({
          date: O,
          data: {
            items: []
          },
          dot: {
            ...Ye,
            class: `lkt-calendar-group--${G}`
          }
        })), a[Ue].data.items.push(E);
      }), a;
    }), Ka = {
      dayPicked: ((a) => {
        var u;
        typeof ((u = t.calendar.events) == null ? void 0 : u.dayPicked) == "function" && t.calendar.events.dayPicked(a);
      }),
      visibleMonthChanged: ((a) => {
        var u;
        typeof ((u = t.calendar.events) == null ? void 0 : u.visibleMonthChanged) == "function" && t.calendar.events.visibleMonthChanged(a), Le.value = a.visibleDate;
      })
    };
    let ra = null;
    return U(nt, () => {
      clearTimeout(ra), ra = setTimeout(() => {
        Ne.value = {
          ...Ne.value,
          ...nt.value
        };
      }, 400);
    }, { deep: !0 }), (a, u) => {
      const E = ie("lkt-header"), O = ie("lkt-button"), j = ie("lkt-form"), G = ie("lkt-accordion"), Ye = ie("lkt-calendar"), Pe = ie("lkt-loader"), Ue = ie("lkt-paginator");
      return c(), C("section", {
        ref_key: "element",
        ref: ue,
        class: "lkt-table-page",
        id: "lkt-table-page-" + y(ae)
      }, [
        Ua.value ? (c(), L(E, me(K({ key: 0 }, Ha.value)), null, 16)) : ut.value || y(l).title ? (c(), C("header", {
          key: 1,
          class: Z(e.headerClass)
        }, [
          ut.value ? (c(), L(ye(yt.value), { key: 0 }, {
            default: P(() => [
              e.titleIcon ? (c(), C("i", {
                key: 0,
                class: Z(e.titleIcon)
              }, null, 2)) : x("", !0),
              _e(" " + et(ut.value), 1)
            ]),
            _: 1
          })) : x("", !0),
          y(l).title ? $(a.$slots, "title", { key: 1 }) : x("", !0)
        ], 2)) : x("", !0),
        (c(), L(ye(Nt.value), {
          class: Z(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: P(() => {
            var je;
            return [
              We(ge("div", Jl, [
                e.groupButton !== !1 ? (c(), L(O, K({
                  key: 0,
                  ref: "groupButton"
                }, ke.value, { class: "lkt-item-crud-group-button" }), {
                  split: P(() => [
                    ge("div", Ql, [
                      We(pe(O, K(vt.value, {
                        checked: S.value,
                        "onUpdate:checked": u[0] || (u[0] = (g) => S.value = g)
                      }), null, 16, ["checked"]), [
                        [Je, Fe.value]
                      ])
                    ]),
                    y(l)["prev-buttons-ever"] ? $(a.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: Y.value,
                      canDrop: _.value,
                      perms: e.perms
                    }) : x("", !0),
                    y(l)["prev-buttons"] ? $(a.$slots, "prev-buttons", {
                      key: 1,
                      canUpdate: Y.value,
                      canDrop: _.value,
                      perms: e.perms
                    }) : x("", !0),
                    We(pe(O, K({
                      class: "lkt-table--save-button",
                      ref_key: "saveButtonRef",
                      ref: re
                    }, {
                      ...F.value,
                      disabled: Ge.value,
                      resourceData: gt.value
                    }, {
                      onLoading: st,
                      onLoaded: dt,
                      onClick: aa
                    }), {
                      split: P(({ doClose: g, doRootClick: f }) => [
                        $(a.$slots, "button-save-split", {
                          doClose: g,
                          doRootClick: f,
                          dataState: R.value,
                          onButtonLoading: st,
                          onButtonLoaded: dt
                        })
                      ]),
                      default: P(() => [
                        y(l)["button-save"] ? $(a.$slots, "button-save", {
                          key: 0,
                          items: d.value,
                          editMode: e.editMode,
                          canUpdate: !Ge.value
                        }) : x("", !0)
                      ]),
                      _: 3
                    }, 16), [
                      [Je, pt.value]
                    ]),
                    Tt.value && d.value.length >= e.requiredItemsForTopCreate ? (c(), L(Bt, {
                      key: 2,
                      config: ot.value,
                      disabled: !Dt.value,
                      onClick: W,
                      onAppend: Ke
                    }, null, 8, ["config", "disabled"])) : x("", !0)
                  ]),
                  _: 3
                }, 16)) : x("", !0),
                y(l)["prev-buttons-ever"] ? $(a.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: Y.value,
                  canDrop: _.value,
                  perms: e.perms
                }) : x("", !0),
                y(l)["prev-buttons"] ? $(a.$slots, "prev-buttons", {
                  key: 2,
                  canUpdate: Y.value,
                  canDrop: _.value,
                  perms: e.perms
                }) : x("", !0),
                We(pe(O, K({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: re
                }, {
                  ...F.value,
                  disabled: Ge.value,
                  resourceData: gt.value
                }, {
                  onLoading: st,
                  onLoaded: dt,
                  onClick: aa
                }), {
                  split: P(({ doClose: g, doRootClick: f }) => [
                    $(a.$slots, "button-save-split", {
                      doClose: g,
                      doRootClick: f,
                      dataState: R.value,
                      onButtonLoading: st,
                      onButtonLoaded: dt
                    })
                  ]),
                  default: P(() => [
                    y(l)["button-save"] ? $(a.$slots, "button-save", {
                      key: 0,
                      items: d.value,
                      editMode: e.editMode,
                      canUpdate: !Ge.value
                    }) : x("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [Je, pt.value]
                ]),
                oa.value && d.value.length >= e.requiredItemsForTopCreate ? (c(), L(Bt, {
                  key: 3,
                  config: Me.value,
                  disabled: !Dt.value,
                  onClick: W,
                  onAppend: Ke
                }, null, 8, ["config", "disabled"])) : Tt.value && d.value.length >= e.requiredItemsForTopCreate ? (c(), L(Bt, {
                  key: 4,
                  config: ot.value,
                  disabled: !Dt.value,
                  onClick: W,
                  onAppend: Ke
                }, null, 8, ["config", "disabled"])) : x("", !0),
                ge("div", Zl, [
                  We(pe(O, K(vt.value, {
                    checked: S.value,
                    "onUpdate:checked": u[1] || (u[1] = (g) => S.value = g)
                  }), null, 16, ["checked"]), [
                    [Je, Fe.value]
                  ])
                ])
              ], 512), [
                [Je, Rt.value]
              ]),
              y(l).buttons ? (c(), C("div", _l, [
                $(a.$slots, "buttons")
              ])) : x("", !0),
              V.value && y(l).filters ? (c(), C("div", en, [
                $(a.$slots, "filters", {
                  items: d.value,
                  isLoading: m.value
                })
              ])) : x("", !0),
              ja.value ? (c(), L(j, K({
                key: 2,
                modelValue: nt.value,
                "onUpdate:modelValue": u[2] || (u[2] = (g) => nt.value = g),
                editing: S.value,
                "onUpdate:editing": u[3] || (u[3] = (g) => S.value = g),
                perms: A.value,
                "onUpdate:perms": u[4] || (u[4] = (g) => A.value = g)
              }, {
                form: e.filtersForm
              }), null, 16, ["modelValue", "editing", "perms"])) : x("", !0),
              We(ge("div", tn, [
                we.value === y(xe).Table ? (c(), C("table", an, [
                  e.hideTableHeader ? x("", !0) : (c(), C("thead", ln, [
                    ge("tr", null, [
                      bt.value && S.value ? (c(), C("th", nn)) : x("", !0),
                      e.addNavigation && S.value ? (c(), C("th", on)) : x("", !0),
                      (c(!0), C(q, null, Te(Ce.value, (g) => (c(), C(q, null, [
                        Se.value.indexOf(g.key) === -1 ? (c(), L(Yl, {
                          key: 0,
                          column: g,
                          "sort-by": h.value,
                          "sort-direction": T.value,
                          "amount-of-columns": e.columns.length,
                          items: d.value,
                          onClick: (f) => B(g)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : x("", !0)
                      ], 64))), 256))
                    ])
                  ])),
                  ge("tbody", {
                    ref_key: "tableBody",
                    ref: k,
                    id: "lkt-table-body-" + y(ae),
                    class: Z(e.itemsContainerClass)
                  }, [
                    (c(!0), C(q, null, Te(d.value, (g, f) => We((c(), L(Kl, {
                      modelValue: d.value[f],
                      "onUpdate:modelValue": (N) => d.value[f] = N,
                      key: $t(g, f),
                      i: f,
                      "is-draggable": ne(g),
                      sortable: bt.value,
                      "visible-columns": Ce.value,
                      "empty-columns": Se.value,
                      "add-navigation": e.addNavigation,
                      "latest-row": f + 1 === Lt.value,
                      "can-drop": _.value && S.value,
                      "can-edit": He.value && Y.value && S.value,
                      "can-read": le.value,
                      "can-create": oe.value,
                      "edit-mode-enabled": S.value,
                      "has-inline-edit-perm": $e.value,
                      "row-display-type": e.rowDisplayType,
                      "render-drag": Fa.value,
                      "disabled-drag": Pa.value,
                      "is-loading": m.value,
                      "item-container-class": e.itemContainerClass,
                      "item-slot-component": Xe.value,
                      "item-slot-data": Pt.value,
                      "item-slot-events": e.itemSlotEvents,
                      permissions: A.value,
                      onClick: M,
                      onItemUp: Ra,
                      onItemDown: La,
                      onItemDrop: wt
                    }, tl({ _: 2 }, [
                      y(l)[`item-${f}`] && ua(a.row, f) ? {
                        name: `item-${f}`,
                        fn: P((N) => [
                          $(a.$slots, `item-${f}`, me({
                            [e.slotItemVar || ""]: N.item,
                            index: f,
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
                      } : y(l).item && ua(a.row, f) ? {
                        name: "item",
                        fn: P((N) => [
                          $(a.$slots, "item", me({
                            [e.slotItemVar || ""]: N.item,
                            index: f,
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
                      Te(mt.value, (N) => ({
                        name: N,
                        fn: P((ct) => [
                          $(a.$slots, N, me({
                            [e.slotItemVar || ""]: ct.item,
                            value: ct.value,
                            column: ct.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class", "item-slot-component", "item-slot-data", "item-slot-events", "permissions"])), [
                      [Je, It(d.value[f], f)]
                    ])), 128))
                  ], 10, un)
                ])) : we.value === y(xe).Item ? (c(), C("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: k,
                  id: "lkt-table-body-" + y(ae),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (c(!0), C(q, null, Te(d.value, (g, f) => (c(), C(q, {
                    key: $t(g, f)
                  }, [
                    !e.skipTableItemsContainer && It(g, f) ? (c(), C("div", {
                      key: 0,
                      class: Z(["lkt-table-item", Ft(g, f)]),
                      style: va(ia(g, f)),
                      "data-i": f
                    }, [
                      Xe.value ? (c(), L(ye(Xe.value), K({
                        key: 0,
                        ref_for: !0
                      }, {
                        item: g,
                        index: f,
                        editing: S.value,
                        perms: A.value,
                        data: Pt.value,
                        events: e.itemSlotEvents
                      }), null, 16)) : $(a.$slots, "item", me({
                        key: 1,
                        [e.slotItemVar || ""]: g,
                        index: f,
                        editing: S.value,
                        canCreate: oe.value,
                        canRead: le.value,
                        canUpdate: Y.value,
                        canDrop: _.value,
                        isLoading: m.value,
                        doDrop: () => wt(f)
                      }))
                    ], 14, sn)) : It(g, f) ? $(a.$slots, "item", me({
                      key: 1,
                      class: Ft(g, f),
                      dataI: f,
                      [e.slotItemVar || ""]: g,
                      index: f,
                      editing: S.value,
                      canCreate: oe.value,
                      canRead: le.value,
                      canUpdate: Y.value,
                      canDrop: _.value,
                      isLoading: m.value,
                      doDrop: () => wt(f)
                    })) : x("", !0)
                  ], 64))), 128))
                ], 10, rn)) : we.value === y(xe).Accordion ? (c(), C("div", {
                  key: 2,
                  ref_key: "tableBody",
                  ref: k,
                  id: "lkt-table-body-" + y(ae),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (c(!0), C(q, null, Te(d.value, (g, f) => (c(), C(q, null, [
                    [y(Be).Auto, y(Be).PreferCustomItem].includes(e.rowDisplayType) && y(l)[Ot(g, f)] ? $(a.$slots, Ot(g, f), {
                      key: 0,
                      item: g,
                      index: f,
                      editing: S.value,
                      isLoading: m.value
                    }) : [y(Be).Auto, y(Be).PreferCustomItem].includes(e.rowDisplayType) && y(l)[`item-${f}`] ? $(a.$slots, `item-${f}`, {
                      key: 1,
                      item: g,
                      index: f,
                      editing: S.value,
                      isLoading: m.value
                    }) : (c(), C(q, { key: 2 }, [
                      It(g, f) ? (c(), L(G, K({
                        class: ["lkt-table-item", Ft(g, f)],
                        "data-i": f,
                        key: $t(g, f)
                      }, { ref_for: !0 }, {
                        ...e.accordion,
                        title: Ma(g)
                      }), {
                        header: P(() => [
                          pe(_t, {
                            modelValue: d.value[f],
                            "onUpdate:modelValue": (N) => d.value[f] = N,
                            i: f,
                            column: qe.value,
                            columns: Ce.value,
                            "edit-mode-enabled": S.value,
                            "has-inline-edit-perm": $e.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])
                        ]),
                        default: P(() => [
                          (c(!0), C(q, null, Te(Ce.value, (N) => {
                            var ct, ca;
                            return c(), C(q, null, [
                              N.key !== ((ct = qe.value) == null ? void 0 : ct.key) && a.$slots[N.key] && y(xa)(N, d.value[f]) ? $(a.$slots, N.key, {
                                key: 0,
                                value: d.value[f][N.key],
                                item: d.value[f],
                                column: N,
                                i: f
                              }) : (c(), C(q, { key: 1 }, [
                                N.key !== ((ca = qe.value) == null ? void 0 : ca.key) ? (c(), L(_t, {
                                  key: 0,
                                  modelValue: d.value[f],
                                  "onUpdate:modelValue": (Xa) => d.value[f] = Xa,
                                  i: f,
                                  column: N,
                                  columns: Ce.value,
                                  "edit-mode-enabled": S.value,
                                  "has-inline-edit-perm": $e.value
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])) : x("", !0)
                              ], 64))
                            ], 64);
                          }), 256))
                        ]),
                        _: 2
                      }, 1040, ["class", "data-i"])) : x("", !0)
                    ], 64))
                  ], 64))), 256))
                ], 10, dn)) : Na.value ? (c(), L(ye(we.value), {
                  key: 3,
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, {
                  default: P(() => [
                    (c(!0), C(q, null, Te(d.value, (g, f) => (c(), C(q, {
                      key: $t(g, f)
                    }, [
                      It(g, f) ? (c(), C("li", {
                        key: 0,
                        class: Z(["lkt-table-item", Ft(g, f)]),
                        "data-i": f,
                        style: va(ia(g, f))
                      }, [
                        Xe.value ? (c(), L(ye(Xe.value), K({
                          key: 0,
                          ref_for: !0
                        }, {
                          item: g,
                          index: f,
                          editing: S.value,
                          perms: A.value,
                          data: Pt.value,
                          events: e.itemSlotEvents
                        }), null, 16)) : $(a.$slots, "item", me({
                          key: 1,
                          [e.slotItemVar || ""]: g,
                          index: f,
                          editing: S.value,
                          canCreate: oe.value,
                          canRead: le.value,
                          canUpdate: Y.value,
                          canDrop: _.value,
                          isLoading: m.value,
                          doDrop: () => wt(f)
                        }))
                      ], 14, cn)) : x("", !0)
                    ], 64))), 128))
                  ]),
                  _: 3
                }, 8, ["class"])) : we.value === y(xe).Carousel ? (c(), C("div", {
                  key: 4,
                  ref_key: "tableBody",
                  ref: k,
                  id: "lkt-table-body-" + y(ae),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  pe(y(Il), K({
                    modelValue: de.value,
                    "onUpdate:modelValue": u[5] || (u[5] = (g) => de.value = g)
                  }, e.carousel, {
                    "wrap-around": ((je = e.carousel) == null ? void 0 : je.infinite) === !0
                  }), {
                    addons: P(() => [
                      pe(y(El)),
                      pe(y(xl))
                    ]),
                    default: P(() => [
                      (c(!0), C(q, null, Te(Gt.value, (g, f) => (c(), L(y(ba), {
                        key: g,
                        index: f
                      }, {
                        default: P(() => [
                          ge("div", fn, [
                            $(a.$slots, g)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (c(!0), C(q, null, Te(d.value, (g, f) => (c(), L(y(ba), {
                        key: a.slide,
                        index: f
                      }, {
                        default: P(() => [
                          ge("div", mn, [
                            Xe.value ? (c(), L(ye(Xe.value), K({
                              key: 0,
                              ref_for: !0
                            }, {
                              item: g,
                              index: f,
                              editing: S.value,
                              perms: A.value,
                              data: Pt.value,
                              events: e.itemSlotEvents
                            }), null, 16)) : $(a.$slots, "item", me({
                              key: 1,
                              [e.slotItemVar || ""]: g,
                              index: f,
                              editing: S.value,
                              canCreate: oe.value,
                              canRead: le.value,
                              canUpdate: Y.value,
                              canDrop: _.value,
                              isLoading: m.value,
                              doDrop: () => wt(f)
                            }))
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128))
                    ]),
                    _: 3
                  }, 16, ["modelValue", "wrap-around"])
                ], 10, vn)) : we.value === y(xe).Calendar ? (c(), C("div", {
                  key: 5,
                  ref_key: "tableBody",
                  ref: k,
                  id: "lkt-table-body-" + y(ae),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  pe(Ye, me(Sa({
                    ...e.calendar,
                    items: qa.value,
                    events: Ka
                  })), null, 16)
                ], 10, pn)) : x("", !0)
              ], 512), [
                [Je, Ht.value]
              ]),
              !m.value && d.value.length === 0 ? (c(), C("div", gn, [
                y(l).empty ? $(a.$slots, "empty", { key: 0 }) : Oa.value ? (c(), L(ye($a.value), {
                  key: 1,
                  message: e.noResultsText
                }, null, 8, ["message"])) : e.noResultsText ? (c(), C(q, { key: 2 }, [
                  _e(et(e.noResultsText), 1)
                ], 64)) : x("", !0)
              ])) : x("", !0),
              m.value ? (c(), L(Pe, { key: 4 })) : x("", !0),
              Tt.value || y(l).bottomButtons ? (c(), C("div", yn, [
                oa.value && d.value.length >= e.requiredItemsForBottomCreate ? (c(), L(Bt, {
                  key: 0,
                  config: Me.value,
                  disabled: !Dt.value,
                  onClick: W,
                  onAppend: Ke
                }, null, 8, ["config", "disabled"])) : Tt.value && d.value.length >= e.requiredItemsForBottomCreate ? (c(), L(Bt, {
                  key: 1,
                  config: ot.value,
                  disabled: !Dt.value,
                  onClick: W,
                  onAppend: Ke
                }, null, 8, ["config", "disabled"])) : x("", !0),
                $(a.$slots, "bottom-buttons")
              ])) : x("", !0),
              e.paginator && Object.keys(e.paginator).length > 0 ? (c(), L(Ue, K({
                key: 6,
                ref_key: "paginatorRef",
                ref: lt
              }, {
                ...e.paginator,
                resourceData: Ne.value,
                timelineOldestDate: ce.value,
                timelineNewestDate: X.value,
                timelineVisibleDate: Le.value
              }, {
                modelValue: v.value,
                "onUpdate:modelValue": u[6] || (u[6] = (g) => v.value = g),
                onLoading: xt,
                onPerms: ft,
                onResponse: Oe
              }), null, 16, ["modelValue"])) : x("", !0),
              y(l)["web-element-actions"] ? $(a.$slots, "web-element-actions", { key: 7 }) : x("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, Wl);
    };
  }
}), In = {
  install: (e) => {
    e.component("lkt-table") === void 0 && e.component("lkt-table", bn);
  }
}, Bn = (e) => (be.navButtonSlot = e, !0), An = (e) => (be.createButtonSlot = e, !0), En = (e) => {
  be.defaultEmptySlot = e;
};
export {
  Rn as Column,
  Ln as createColumn,
  In as default,
  Vl as defaultTableSorter,
  An as setTableCreateButtonSlot,
  En as setTableEmptySlot,
  Bn as setTableNavButtonSlot
};
