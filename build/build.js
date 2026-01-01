import { defineComponent as Se, computed as r, ref as D, shallowReactive as Jt, watch as U, watchEffect as Kt, onMounted as ea, onBeforeUnmount as Ya, reactive as Xt, provide as ha, h as Q, useId as Wa, inject as Et, getCurrentInstance as Ja, onUnmounted as Qa, onUpdated as Za, cloneVNode as _a, resolveComponent as oe, createBlock as R, createElementBlock as S, unref as g, openBlock as c, mergeProps as q, withCtx as P, createTextVNode as et, toDisplayString as tt, normalizeProps as pe, normalizeClass as J, Fragment as H, renderList as ge, useSlots as ka, createCommentVNode as x, createElementVNode as be, createVNode as ye, resolveDynamicComponent as he, guardReactiveProps as Sa, renderSlot as $, mergeDefaults as el, nextTick as Ut, withDirectives as Je, vShow as Qe, createSlots as tl, normalizeStyle as va } from "vue";
import { __ as al } from "lkt-i18n";
import { ColumnType as Ae, FieldType as Ze, MultipleOptionsDisplay as ll, SortDirection as at, Column as Ca, extractPropValue as nl, TableRowType as Ee, extractI18nValue as wa, LktSettings as Be, ensureButtonConfig as Ge, TablePermission as Ve, PaginatorType as Ie, TableType as Re, getDefaultValues as ol, Table as il, ButtonType as Yt } from "lkt-vue-kernel";
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
], K = {
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
}, lt = Symbol("carousel"), pl = (e) => {
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
function Le({ val: e, max: i, min: o }) {
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
const Dl = Se({
  name: "CarouselAria",
  setup() {
    const e = Et(lt);
    return e ? () => Q("div", {
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
    default: K.autoplay,
    type: Number
  },
  // an object to store breakpoints
  breakpoints: {
    default: K.breakpoints,
    type: Object
  },
  // controls the breakpoint mode relative to the carousel container or the viewport
  breakpointMode: {
    default: K.breakpointMode,
    validator(e) {
      return Da.includes(e);
    }
  },
  // enable/disable the carousel component
  enabled: {
    default: K.enabled,
    type: Boolean
  },
  // control the gap between slides
  gap: {
    default: K.gap,
    type: Number
  },
  // control the gap between slides
  height: {
    default: K.height,
    type: [Number, String]
  },
  ignoreAnimations: {
    default: !1,
    type: [Array, Boolean, String]
  },
  // count of items to be scrolled
  itemsToScroll: {
    default: K.itemsToScroll,
    type: Number
  },
  // count of items to showed per view
  itemsToShow: {
    default: K.itemsToShow,
    type: [Number, String]
  },
  // aria-labels and additional text labels
  i18n: {
    default: K.i18n,
    type: Object
  },
  // slide number number of initial slide
  modelValue: {
    default: void 0,
    type: Number
  },
  // toggle mouse dragging.
  mouseDrag: {
    default: K.mouseDrag,
    type: Boolean
  },
  // toggle mouse dragging.
  touchDrag: {
    default: K.touchDrag,
    type: Boolean
  },
  pauseAutoplayOnHover: {
    default: K.pauseAutoplayOnHover,
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
    default: K.snapAlign,
    validator(e) {
      return Ba.includes(e);
    }
  },
  slideEffect: {
    type: String,
    default: K.slideEffect,
    validator(e) {
      return Ia.includes(e);
    }
  },
  // sliding transition time in ms
  transition: {
    default: K.transition,
    type: Number
  },
  // control the gap between slides
  dir: {
    type: String,
    default: K.dir,
    validator(e, i) {
      if (!Ta.includes(e))
        return !1;
      const o = e in zt ? zt[e] : e;
      return ["ttb", "btt"].includes(o) && (!i.height || i.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${e}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: K.wrapAround,
    type: Boolean
  }
}, Il = Se({
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
    const t = pl(o), p = t.getSlides(), h = r(() => p.length), T = D(null), d = D(null), k = D(0), I = r(() => Object.assign(Object.assign(Object.assign({}, K), bl(e, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, K.i18n), e.i18n) })), v = Jt(Object.assign({}, I.value)), m = D((l = e.modelValue) !== null && l !== void 0 ? l : 0), V = D(m.value);
    U(m, (s) => V.value = s);
    const B = D(0), ie = r(() => Math.ceil((h.value - 1) / 2)), re = r(() => h.value - 1), se = r(() => 0);
    let ee = null, L = null, C = null;
    const de = r(() => k.value + v.gap), z = r(() => {
      const s = v.dir || "ltr";
      return s in zt ? zt[s] : s;
    }), te = r(() => ["rtl", "btt"].includes(z.value)), ce = r(() => ["ttb", "btt"].includes(z.value)), ve = r(() => v.itemsToShow === "auto"), X = r(() => ce.value ? "height" : "width");
    function Ne() {
      var s;
      if (!ae.value)
        return;
      const b = (I.value.breakpointMode === "carousel" ? (s = T.value) === null || s === void 0 ? void 0 : s.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, w = Object.keys(e.breakpoints || {}).map((M) => Number(M)).sort((M, Z) => +Z - +M), A = {};
      w.some((M) => b >= M ? (Object.assign(A, e.breakpoints[M]), A.i18n && Object.assign(A.i18n, I.value.i18n, e.breakpoints[M].i18n), !0) : !1), Object.assign(v, I.value, A);
    }
    const nt = Wt(() => {
      Ne(), fe(), Ce();
    }), Me = Jt(/* @__PURE__ */ new Set()), F = D([]);
    function ot({ widthMultiplier: s, heightMultiplier: b }) {
      F.value = p.map((w) => {
        var A;
        const M = (A = w.exposed) === null || A === void 0 ? void 0 : A.getBoundingRect();
        return {
          width: M.width * s,
          height: M.height * b
        };
      });
    }
    const Oe = D({
      width: 0,
      height: 0
    });
    function vt({ widthMultiplier: s, heightMultiplier: b }) {
      var w;
      const A = ((w = d.value) === null || w === void 0 ? void 0 : w.getBoundingClientRect()) || { width: 0, height: 0 };
      Oe.value = {
        width: A.width * s,
        height: A.height * b
      };
    }
    function Ce() {
      if (!d.value)
        return;
      const s = Sl(Me);
      if (vt(s), ot(s), ve.value)
        k.value = gl(F.value.map((b) => b[X.value]));
      else {
        const b = Number(v.itemsToShow), w = (b - 1) * v.gap;
        k.value = (Oe.value[X.value] - w) / b;
      }
    }
    function fe() {
      !v.wrapAround && h.value > 0 && (m.value = Le({
        val: m.value,
        max: re.value,
        min: se.value
      })), ve.value || (v.itemsToShow = Le({
        val: Number(v.itemsToShow),
        max: h.value,
        min: 1
      }));
    }
    const ft = r(() => typeof e.ignoreAnimations == "string" ? e.ignoreAnimations.split(",") : Array.isArray(e.ignoreAnimations) ? e.ignoreAnimations : e.ignoreAnimations ? !1 : []);
    Kt(() => fe()), Kt(() => {
      Ce();
    });
    let $e;
    const xt = (s) => {
      const b = s.target;
      if (!(!(b != null && b.contains(T.value)) || Array.isArray(ft.value) && ft.value.includes(s.animationName)) && (Me.add(b), !$e)) {
        const w = () => {
          $e = requestAnimationFrame(() => {
            Ce(), w();
          });
        };
        w();
      }
    }, Vt = (s) => {
      const b = s.target;
      b && Me.delete(b), $e && Me.size === 0 && (cancelAnimationFrame($e), Ce());
    }, ae = D(!1);
    typeof document < "u" && Kt(() => {
      ae.value && ft.value !== !1 ? (document.addEventListener("animationstart", xt), document.addEventListener("animationend", Vt)) : (document.removeEventListener("animationstart", xt), document.removeEventListener("animationend", Vt));
    }), ea(() => {
      ae.value = !0, Ne(), ut(), T.value && (C = new ResizeObserver(nt), C.observe(T.value)), o("init");
    }), Ya(() => {
      ae.value = !1, t.cleanup(), L && clearTimeout(L), $e && cancelAnimationFrame($e), ee && clearInterval(ee), C && (C.disconnect(), C = null), typeof document < "u" && Lt(), T.value && (T.value.removeEventListener("transitionend", Ce), T.value.removeEventListener("animationiteration", Ce));
    });
    let we = !1;
    const De = { x: 0, y: 0 }, me = Xt({ x: 0, y: 0 }), it = D(!1), mt = D(!1), Gt = () => {
      it.value = !0;
    }, pt = () => {
      it.value = !1;
    }, Rt = Wt((s) => {
      if (!s.ctrlKey)
        switch (s.key) {
          case "ArrowLeft":
          case "ArrowUp":
            ce.value === s.key.endsWith("Up") && (te.value ? qe(!0) : Fe(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            ce.value === s.key.endsWith("Down") && (te.value ? Fe(!0) : qe(!0));
            break;
        }
    }, 200), He = () => {
      document.addEventListener("keydown", Rt);
    }, Lt = () => {
      document.removeEventListener("keydown", Rt);
    };
    function gt(s) {
      const b = s.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(b) || le.value || (we = s.type === "touchstart", !we && (s.preventDefault(), s.button !== 0)))
        return;
      De.x = "touches" in s ? s.touches[0].clientX : s.clientX, De.y = "touches" in s ? s.touches[0].clientY : s.clientY;
      const w = we ? "touchmove" : "mousemove", A = we ? "touchend" : "mouseup";
      document.addEventListener(w, yt, { passive: !1 }), document.addEventListener(A, Nt, { passive: !0 });
    }
    const yt = Wt((s) => {
      mt.value = !0;
      const b = "touches" in s ? s.touches[0].clientX : s.clientX, w = "touches" in s ? s.touches[0].clientY : s.clientY;
      me.x = b - De.x, me.y = w - De.y;
      const A = hl({
        isVertical: ce.value,
        isReversed: te.value,
        dragged: me,
        effectiveSlideSize: de.value
      });
      V.value = v.wrapAround ? m.value + A : Le({
        val: m.value + A,
        max: re.value,
        min: se.value
      }), o("drag", { deltaX: me.x, deltaY: me.y });
    });
    function Nt() {
      if (yt.cancel(), V.value !== m.value && !we) {
        const w = (A) => {
          A.preventDefault(), window.removeEventListener("click", w);
        };
        window.addEventListener("click", w);
      }
      Y(V.value), me.x = 0, me.y = 0, mt.value = !1;
      const s = we ? "touchmove" : "mousemove", b = we ? "touchend" : "mouseup";
      document.removeEventListener(s, yt), document.removeEventListener(b, Nt);
    }
    function ut() {
      !v.autoplay || v.autoplay <= 0 || (ee = setInterval(() => {
        v.pauseAutoplayOnHover && it.value || qe();
      }, v.autoplay));
    }
    function bt() {
      ee && (clearInterval(ee), ee = null);
    }
    function ue() {
      bt(), ut();
    }
    const le = D(!1);
    function Y(s, b = !1) {
      if (!b && le.value)
        return;
      let w = s, A = s;
      B.value = m.value, v.wrapAround ? A = Ea({
        val: w,
        max: re.value,
        min: se.value
      }) : w = Le({
        val: w,
        max: re.value,
        min: se.value
      }), o("slide-start", {
        slidingToIndex: s,
        currentSlideIndex: m.value,
        prevSlideIndex: B.value,
        slidesCount: h.value
      }), bt(), le.value = !0, m.value = w, A !== w && rt.pause(), o("update:modelValue", A), L = setTimeout(() => {
        v.wrapAround && A !== w && (rt.resume(), m.value = A, o("loop", {
          currentSlideIndex: m.value,
          slidingToIndex: s
        })), o("slide-end", {
          currentSlideIndex: m.value,
          prevSlideIndex: B.value,
          slidesCount: h.value
        }), le.value = !1, ue();
      }, v.transition);
    }
    function qe(s = !1) {
      Y(m.value + v.itemsToScroll, s);
    }
    function Fe(s = !1) {
      Y(m.value - v.itemsToScroll, s);
    }
    function Mt() {
      Ne(), fe(), Ce(), ue();
    }
    U(() => [I.value, e.breakpoints], () => Ne(), { deep: !0 }), U(() => e.autoplay, () => ue());
    const rt = U(() => e.modelValue, (s) => {
      s !== m.value && Y(Number(s), !0);
    });
    o("before-init");
    const xe = r(() => {
      if (!v.wrapAround)
        return { before: 0, after: 0 };
      if (ve.value)
        return { before: p.length, after: p.length };
      const s = Number(v.itemsToShow), b = Math.ceil(s + (v.itemsToScroll - 1)), w = b - V.value, A = b - (h.value - (V.value + 1));
      return {
        before: Math.max(0, w),
        after: Math.max(0, A)
      };
    }), _ = r(() => xe.value.before ? ve.value ? F.value.slice(-1 * xe.value.before).reduce((s, b) => s + b[X.value] + v.gap, 0) * -1 : xe.value.before * de.value * -1 : 0), ht = r(() => {
      var s;
      if (ve.value) {
        const b = (m.value % p.length + p.length) % p.length;
        return Qt({
          slideSize: (s = F.value[b]) === null || s === void 0 ? void 0 : s[X.value],
          viewportSize: Oe.value[X.value],
          align: v.snapAlign
        });
      }
      return Qt({
        align: v.snapAlign,
        itemsToShow: +v.itemsToShow
      });
    }), Pe = r(() => {
      let s = 0;
      if (ve.value) {
        if (m.value < 0 ? s = F.value.slice(m.value).reduce((b, w) => b + w[X.value] + v.gap, 0) * -1 : s = F.value.slice(0, m.value).reduce((b, w) => b + w[X.value] + v.gap, 0), s -= ht.value, !v.wrapAround) {
          const b = F.value.reduce((w, A) => w + A[X.value] + v.gap, 0) - Oe.value[X.value] - v.gap;
          s = Le({
            val: s,
            max: b,
            min: 0
          });
        }
      } else {
        let b = m.value - ht.value;
        v.wrapAround || (b = Le({
          val: b,
          max: h.value - +v.itemsToShow,
          min: 0
        })), s = b * de.value;
      }
      return s * (te.value ? 1 : -1);
    }), Ht = r(() => {
      var s, b;
      if (!ve.value) {
        const M = m.value - ht.value;
        return v.wrapAround ? {
          min: Math.floor(M),
          max: Math.ceil(M + Number(v.itemsToShow) - 1)
        } : {
          min: Math.floor(Le({
            val: M,
            max: h.value - Number(v.itemsToShow),
            min: 0
          })),
          max: Math.ceil(Le({
            val: M + Number(v.itemsToShow) - 1,
            max: h.value - 1,
            min: 0
          }))
        };
      }
      let w = 0;
      {
        let M = 0, Z = 0 - xe.value.before;
        const ne = Math.abs(Pe.value + _.value);
        for (; M <= ne; ) {
          const W = (Z % p.length + p.length) % p.length;
          M += ((s = F.value[W]) === null || s === void 0 ? void 0 : s[X.value]) + v.gap, Z++;
        }
        w = Z - 1;
      }
      let A = 0;
      {
        let M = w, Z = 0;
        for (M < 0 ? Z = F.value.slice(0, M).reduce((ne, W) => ne + W[X.value] + v.gap, 0) - Math.abs(Pe.value + _.value) : Z = F.value.slice(0, M).reduce((ne, W) => ne + W[X.value] + v.gap, 0) - Math.abs(Pe.value); Z < Oe.value[X.value]; ) {
          const ne = (M % p.length + p.length) % p.length;
          Z += ((b = F.value[ne]) === null || b === void 0 ? void 0 : b[X.value]) + v.gap, M++;
        }
        A = M - 1;
      }
      return {
        min: Math.floor(w),
        max: Math.ceil(A)
      };
    }), Ke = r(() => {
      if (v.slideEffect === "fade")
        return;
      const s = ce.value ? "Y" : "X", b = ce.value ? me.y : me.x;
      let w = Pe.value + b;
      if (!v.wrapAround && v.preventExcessiveDragging) {
        let A = 0;
        ve.value ? A = F.value.reduce((ne, W) => ne + W[X.value], 0) : A = (h.value - Number(v.itemsToShow)) * de.value;
        const M = te.value ? 0 : -1 * A, Z = te.value ? A : 0;
        w = Le({
          val: w,
          min: M,
          max: Z
        });
      }
      return `translate${s}(${w}px)`;
    }), kt = r(() => ({
      "--vc-transition-duration": le.value ? jt(v.transition, "ms") : void 0,
      "--vc-slide-gap": jt(v.gap),
      "--vc-carousel-height": jt(v.height),
      "--vc-cloned-offset": jt(_.value)
    })), St = { slideTo: Y, next: qe, prev: Fe }, Ot = Xt({
      activeSlide: V,
      config: v,
      currentSlide: m,
      isSliding: le,
      isVertical: ce,
      maxSlide: re,
      minSlide: se,
      nav: St,
      normalizedDir: z,
      slideRegistry: t,
      slideSize: k,
      slides: p,
      slidesCount: h,
      viewport: d,
      visibleRange: Ht
    });
    ha(lt, Ot);
    const Ct = Xt({
      config: v,
      currentSlide: m,
      maxSlide: re,
      middleSlide: ie,
      minSlide: se,
      slideSize: k,
      slidesCount: h
    });
    return n({
      data: Ct,
      nav: St,
      next: qe,
      prev: Fe,
      restartCarousel: Mt,
      slideTo: Y,
      updateBreakpointsConfig: Ne,
      updateSlideSize: Ce,
      updateSlidesData: fe
    }), () => {
      var s;
      const b = i.default || i.slides, w = (b == null ? void 0 : b(Ct)) || [], { before: A, after: M } = xe.value, Z = fa({
        slides: p,
        position: "before",
        toShow: A
      }), ne = fa({
        slides: p,
        position: "after",
        toShow: M
      }), W = [...Z, ...w, ...ne];
      if (!v.enabled || !W.length)
        return Q("section", {
          ref: T,
          class: ["carousel", "is-disabled"]
        }, W);
      const Xe = ((s = i.addons) === null || s === void 0 ? void 0 : s.call(i, Ct)) || [], st = Q("ol", {
        class: "carousel__track",
        style: { transform: Ke.value },
        onMousedownCapture: v.mouseDrag ? gt : null,
        onTouchstartPassiveCapture: v.touchDrag ? gt : null
      }, W), dt = Q("div", { class: "carousel__viewport", ref: d }, st);
      return Q("section", {
        ref: T,
        class: [
          "carousel",
          `is-${z.value}`,
          `is-effect-${v.slideEffect}`,
          {
            "is-vertical": ce.value,
            "is-sliding": le.value,
            "is-dragging": mt.value,
            "is-hover": it.value
          }
        ],
        dir: z.value,
        style: kt.value,
        "aria-label": v.i18n.ariaGallery,
        tabindex: "0",
        onFocus: He,
        onBlur: Lt,
        onMouseenter: Gt,
        onMouseleave: pt
      }, [dt, Xe, Q(Dl)]);
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
const ga = (e) => e && Al(e), ya = Se({
  props: {
    name: {
      type: String,
      required: !0,
      validator: ga
    },
    title: {
      type: String,
      default: (e) => e.name ? K.i18n[pa(e.name)] : ""
    }
  },
  setup(e) {
    const i = Et(lt, null);
    return () => {
      const o = e.name;
      if (!o || !ga(o))
        return;
      const n = Bl[o], l = Q("path", { d: n }), t = (i == null ? void 0 : i.config.i18n[pa(o)]) || e.title, p = Q("title", t);
      return Q("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": t
      }, [p, l]);
    };
  }
}), El = Se({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(e, { slots: i, attrs: o }) {
    const n = Et(lt);
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
      const { i18n: k } = n.config, I = Q("button", Object.assign(Object.assign({ type: "button", disabled: T.value, "aria-label": k.ariaPreviousSlide, title: k.ariaPreviousSlide, onClick: n.nav.prev }, o), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": T.value },
        o.class
      ] }), (t == null ? void 0 : t()) || Q(ya, { name: p() })), v = Q("button", Object.assign(Object.assign({ type: "button", disabled: d.value, "aria-label": k.ariaNextSlide, title: k.ariaNextSlide, onClick: n.nav.next }, o), { class: [
        "carousel__next",
        { "carousel__next--disabled": d.value },
        o.class
      ] }), (l == null ? void 0 : l()) || Q(ya, { name: h() }));
      return [I, v];
    };
  }
}), xl = Se({
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
    const i = Et(lt);
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
        }), m = h(I), V = Q("button", {
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
        }), B = Q("li", { class: "carousel__pagination-item", key: I }, V);
        k.push(B);
      }
      return Q("ol", { class: "carousel__pagination" }, k);
    };
  }
}), ba = Se({
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
    const l = Et(lt);
    if (ha(lt, void 0), !l)
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
      const V = l.config.itemsToShow, B = l.config.gap > 0 && V > 1 ? `calc(${100 / V}% - ${l.config.gap * (V - 1) / V}px)` : `${100 / V}%`;
      return l.isVertical ? { height: B } : { width: B };
    });
    return l.slideRegistry.registerSlide(h, e.index), Qa(() => {
      l.slideRegistry.unregisterSlide(h);
    }), e.isClone && (ea(() => {
      ma(h.vnode);
    }), Za(() => {
      ma(h.vnode);
    })), () => {
      var V, B;
      return l.config.enabled ? Q("li", {
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
      }, (B = o.default) === null || B === void 0 ? void 0 : B.call(o, {
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
  if (o.type === Ae.Field ? [Ze.Number, Ze.Range].includes((p = o.field) == null ? void 0 : p.type) ? (l = parseFloat(e[o.key]), t = parseFloat(i[o.key])) : [Ze.Date, Ze.Date].includes((h = o.field) == null ? void 0 : h.type) ? (l = e[o.key], t = i[o.key]) : ((T = o.field) == null ? void 0 : T.type) === Ze.Select && ((d = o.field) != null && d.multiple) && ((k = o.field) == null ? void 0 : k.multipleDisplay) === ll.Count ? (l = e[o.key].length, t = i[o.key].length) : (l = String(e[o.key]).toLowerCase(), t = String(i[o.key]).toLowerCase()) : (l = String(e[o.key]).toLowerCase(), t = String(i[o.key]).toLowerCase()), n === at.Asc) {
    if (l > t) return 1;
    if (t > l) return -1;
  } else {
    if (l > t) return -1;
    if (t > l) return 1;
  }
  return 0;
}, _e = (e, i, o, n = []) => {
  if (e.extractTitleFromColumn) {
    let t = n.find((p) => p.key === e.extractTitleFromColumn);
    if (t)
      return _e(t, i, o, n);
  }
  let l = e.type === Ae.ColumnIndex ? o : i[e.key];
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
  if (typeof e != "object" || !e.key && [Ae.Field].includes(e.type) || i.indexOf(e.key) > -1) return !1;
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
}, _t = /* @__PURE__ */ Se({
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
            let B = n.column.field.modalData[V].substring(5);
            l.value[B];
          } else
            n.column.field.modalData[V];
      return (m = n.column.field) == null ? void 0 : m.modalData;
    }), T = r(() => typeof n.column.field == "string" && n.column.field.startsWith("prop:") ? nl(n.column.field, l.value) : n.column.field), d = r(() => {
      var k, I, v, m;
      return n.column.type === Ae.Field ? !((I = (k = n.column) == null ? void 0 : k.field) != null && I.label) && (n.column.ensureFieldLabel || [
        Ze.Switch,
        Ze.Check
      ].includes((v = n.column.field) == null ? void 0 : v.type)) ? n.column.label : (m = n.column.field) == null ? void 0 : m.label : "";
    });
    return (k, I) => {
      const v = oe("lkt-anchor"), m = oe("lkt-button"), V = oe("lkt-field"), B = oe("lkt-polymorphic-element");
      return e.column.type === g(Ae).Anchor ? (c(), R(v, q({ key: 0 }, e.column.anchor, { prop: l.value }), {
        default: P(() => [
          et(tt(g(_e)(e.column, l.value, e.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : e.column.type === g(Ae).Button ? (c(), R(m, q({ key: 1 }, e.column.button, { prop: l.value }), {
        default: P(() => [
          et(tt(g(_e)(e.column, l.value, e.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : e.column.type === g(Ae).Field ? (c(), R(V, q({
        key: 2,
        modelValue: l.value[e.column.key],
        "onUpdate:modelValue": I[0] || (I[0] = (ie) => l.value[e.column.key] = ie)
      }, {
        ...T.value,
        readMode: !e.hasInlineEditPerm || T.value.readMode,
        slotData: p.value,
        label: d.value,
        modalData: h.value,
        prop: l.value
      }), null, 16, ["modelValue"])) : e.column.type === g(Ae).InlineDrop ? (c(), R(m, q({ key: 3 }, e.column.button, {
        prop: l.value,
        onClick: t
      }), {
        default: P(() => [
          et(tt(g(_e)(e.column, l.value, e.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : e.column.type === g(Ae).ColumnIndex && e.column.field ? (c(), R(V, pe(q({ key: 4 }, {
        ...T.value,
        modelValue: g(_e)(e.column, l.value, e.i, e.columns),
        readMode: !0,
        slotData: p.value,
        label: d.value,
        modalData: h.value,
        prop: l.value
      })), null, 16)) : e.column.type === g(Ae).Content && Array.isArray(e.column.content) ? (c(), S("div", {
        key: 5,
        class: J(["lkt-content-container", e.column.class])
      }, [
        (c(!0), S(H, null, ge(e.column.content, (ie) => (c(), S(H, null, [
          typeof ie == "function" ? (c(), R(B, q({
            key: 0,
            ref_for: !0
          }, ie({ item: l.value })), null, 16)) : (c(), R(B, q({
            key: 1,
            ref_for: !0
          }, ie), null, 16))
        ], 64))), 256))
      ], 2)) : (c(), S(H, { key: 6 }, [
        et(tt(g(_e)(e.column, l.value, e.i, e.columns)), 1)
      ], 64));
    };
  }
}), At = class At {
};
At.navButtonSlot = "", At.createButtonSlot = "", At.defaultEmptySlot = void 0;
let ke = At;
const Ol = ["data-i", "data-draggable"], $l = ["data-role", "data-i"], Fl = {
  key: 1,
  class: "lkt-table-nav-cell"
}, Pl = { class: "lkt-table-nav-container" }, Ul = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, jl = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, zl = ["colspan"], Gl = ["colspan"], Hl = ["colspan"], ql = ["data-column", "colspan", "title"], Kl = /* @__PURE__ */ Se({
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
    const o = ka(), n = i, l = e, t = D(l.modelValue);
    let p = typeof l.rowDisplayType == "function" ? l.rowDisplayType(t.value, l.i) : l.rowDisplayType;
    p || (p = Ee.Auto);
    const h = [Ee.Auto, Ee.PreferCustomItem].includes(p), T = [Ee.Auto, Ee.PreferItem].includes(p), d = (L) => n("click", L), k = r(() => {
      let L = [], C = typeof l.disabledDrag == "function" ? l.disabledDrag(t.value) : re.value === !0;
      return !C && l.sortable && l.isDraggable ? L.push("handle") : C && L.push("disabled"), L.join(" ");
    }), I = r(() => ke.navButtonSlot !== ""), v = r(() => ke.navButtonSlot), m = () => {
      n("item-up", l.i);
    }, V = () => {
      n("item-down", l.i);
    }, B = () => {
      n("item-drop", l.i);
    };
    U(() => l.modelValue, (L) => t.value = L), U(t, (L) => {
      n("update:modelValue", L);
    }, { deep: !0 });
    const ie = r(() => typeof l.renderDrag == "function" ? l.renderDrag(t.value) : l.renderDrag === !0), re = r(() => typeof l.disabledDrag == "function" ? l.disabledDrag(t.value) : l.disabledDrag === !0), se = r(() => k.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), ee = r(() => {
      let L = [];
      return h && L.push("type-custom-item"), T && L.push("type-item"), typeof l.itemContainerClass == "function" ? L.push(l.itemContainerClass(t.value, l.i)) : l.itemContainerClass !== "" && L.push(l.itemContainerClass), L.join(" ");
    });
    return (L, C) => {
      const de = oe("lkt-button");
      return c(), S("tr", {
        "data-i": e.i,
        "data-draggable": e.isDraggable,
        class: J(ee.value)
      }, [
        e.sortable && e.editModeEnabled && ie.value ? (c(), S("td", {
          key: 0,
          "data-role": se.value,
          class: J(k.value),
          "data-i": e.i
        }, [...C[2] || (C[2] = [
          be("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ])], 10, $l)) : x("", !0),
        e.addNavigation && e.editModeEnabled ? (c(), S("td", Fl, [
          be("div", Pl, [
            ye(de, {
              palette: "table-nav",
              disabled: e.i === 0,
              onClick: m
            }, {
              default: P(() => [
                I.value ? (c(), R(he(v.value), {
                  key: 0,
                  direction: "up"
                })) : (c(), S("i", Ul))
              ]),
              _: 1
            }, 8, ["disabled"]),
            ye(de, {
              palette: "table-nav",
              disabled: e.latestRow,
              onClick: V
            }, {
              default: P(() => [
                I.value ? (c(), R(he(v.value), {
                  key: 0,
                  direction: "down"
                })) : (c(), S("i", jl))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : x("", !0),
        e.itemSlotComponent ? (c(), S("td", {
          key: "td" + e.i,
          colspan: e.visibleColumns.length
        }, [
          (c(), R(he(e.itemSlotComponent), pe(Sa({
            item: t.value,
            index: e.i,
            editing: e.editModeEnabled,
            perms: e.permissions,
            data: e.itemSlotData,
            events: e.itemSlotEvents
          })), null, 16))
        ], 8, zl)) : g(h) && g(o)[`item-${e.i}`] ? (c(), S("td", {
          key: "td" + e.i,
          colspan: e.visibleColumns.length
        }, [
          $(L.$slots, `item-${e.i}`, {
            item: t.value,
            index: e.i,
            editing: e.editModeEnabled,
            canCreate: e.canCreate,
            canRead: e.canRead,
            canUpdate: e.canEdit,
            canDrop: e.canDrop,
            isLoading: e.isLoading,
            doDrop: () => B()
          })
        ], 8, Gl)) : g(T) && g(o).item ? (c(), S("td", {
          key: "td" + e.i,
          colspan: e.visibleColumns.length
        }, [
          $(L.$slots, "item", {
            item: t.value,
            index: e.i,
            editing: e.editModeEnabled,
            canCreate: e.canCreate,
            canRead: e.canRead,
            canUpdate: e.canEdit,
            canDrop: e.canDrop,
            isLoading: e.isLoading,
            doDrop: () => B()
          })
        ], 8, Hl)) : (c(!0), S(H, { key: 5 }, ge(e.visibleColumns, (z) => (c(), S(H, null, [
          g(Ll)(z, e.emptyColumns, t.value) ? (c(), S("td", {
            key: "td" + e.i,
            "data-column": z.key,
            colspan: g(ta)(z, t.value),
            title: g(_e)(z, t.value, e.i, e.visibleColumns),
            class: J(g(Va)(z)),
            onClick: C[1] || (C[1] = (te) => d(te))
          }, [
            L.$slots[z.key] && g(xa)(z, t.value) ? $(L.$slots, z.key, {
              key: 0,
              value: t.value[z.key],
              item: t.value,
              column: z,
              i: e.i
            }) : t.value ? (c(), R(_t, {
              key: 1,
              modelValue: t.value,
              "onUpdate:modelValue": C[0] || (C[0] = (te) => t.value = te),
              column: z,
              columns: e.visibleColumns,
              "edit-mode-enabled": e.editModeEnabled,
              "has-inline-edit-perm": e.hasInlineEditPerm,
              i: e.i,
              onInlineDrop: B
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : x("", !0)
          ], 10, ql)) : x("", !0)
        ], 64))), 256))
      ], 10, Ol);
    };
  }
}), Bt = /* @__PURE__ */ Se({
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
    const o = i, n = e, l = r(() => ke.createButtonSlot !== ""), t = r(() => ke.createButtonSlot), p = {
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
      const v = oe("lkt-button");
      return c(), R(v, q(h, {
        disabled: e.disabled,
        onClick: T
      }), {
        default: P(() => [
          l.value ? (c(), R(he(t.value), { key: 0 })) : x("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), Xl = ["data-column", "data-sortable", "data-sort", "colspan", "title"], Yl = /* @__PURE__ */ Se({
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
    const o = i, n = e, l = r(() => Rl(n.column, n.amountOfColumns, n.items)), t = r(() => n.column.sortable === !0), p = r(() => t.value && n.sortBy === n.column.key ? n.sortDirection : ""), h = r(() => wa(n.column.label)), T = r(() => t.value && n.sortBy === n.column.key ? n.sortDirection === at.Asc ? Be.defaultTableSortAscIcon : n.sortDirection === at.Desc ? Be.defaultTableSortDescIcon : "" : ""), d = () => o("click", n.column);
    return (k, I) => (c(), S("th", {
      "data-column": e.column.key,
      "data-sortable": t.value,
      "data-sort": p.value,
      colspan: l.value,
      title: h.value,
      class: J(g(Va)(e.column)),
      onClick: d
    }, [
      be("div", null, [
        et(tt(h.value) + " ", 1),
        T.value ? (c(), S("i", {
          key: 0,
          class: J(T.value)
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
}, bn = /* @__PURE__ */ Se({
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
    const n = o, l = ka(), t = e, p = D(typeof t.sorter == "function" ? t.sorter : Vl), h = D(Nl(t.columns)), T = D(at.Asc), d = D(t.modelValue), k = D(null), I = D(t.columns), v = D((sa = t.paginator) == null ? void 0 : sa.modelValue), m = D(t.loading), V = D(!1), B = D(t.perms), ie = D(null), re = D(null), se = D(null), ee = D({}), L = D(new sl({ items: d.value }, t.dataStateConfig)), C = D(t.editMode), de = D(0), z = D(null), te = D(t.type), ce = D(((da = t.carousel) == null ? void 0 : da.currentSlide) || 0), ve = D(void 0), X = D(void 0), Ne = D(void 0), nt = D({
      ...typeof t.paginator.resourceData == "object" ? t.paginator.resourceData : {}
    }), Me = D({
      ...typeof t.paginator.resourceData == "object" ? t.paginator.resourceData : {}
    }), F = D(Ge(t.saveButton, Be.defaultSaveButton)), ot = D(Ge(t.createButton, Be.defaultCreateButton)), Oe = D(Ge(t.createButton, Be.defaultInlineCreateButton)), vt = D(Ge(t.editModeButton, Be.defaultEditModeButton)), Ce = D(Ge(t.groupButton, Be.defaultGroupButton));
    U(() => t.saveButton, (a) => F.value = Ge(t.saveButton, Be.defaultSaveButton)), U(() => t.createButton, (a) => ot.value = Ge(t.createButton, Be.defaultCreateButton)), U(() => t.editModeButton, (a) => vt.value = Ge(t.editModeButton, Be.defaultEditModeButton));
    const fe = D(!1);
    U(m, (a) => n("update:loading", a)), U(v, (a) => n("page", a));
    const ft = (a) => {
      B.value = a;
    }, $e = (a) => {
      var u, E;
      if (Array.isArray(a.data)) {
        let O = a.data;
        if (typeof ((u = t.events) == null ? void 0 : u.parseResults) == "function" && (O = t.events.parseResults(O)), d.value = [...d.value, ...O], [Ie.TimelineAsc, Ie.TimelineDesc, Ie.TimelineAscDesc].includes((E = t.paginator) == null ? void 0 : E.type)) {
          const j = vl(d.value, t.paginator.dateKey);
          ve.value = j.oldest, X.value = j.newest;
        }
      }
      m.value = !1, V.value = !0, L.value.store({ items: d.value }).turnStoredIntoOriginal(), fe.value = !1, Ut(() => {
        He.value, n("read-response", a);
      });
    }, xt = () => Ut(() => {
      var O;
      const a = t.paginator, u = a == null ? void 0 : a.type;
      let E = !0;
      u && ([Ie.LoadMore, Ie.Infinite].includes(u) || [Ie.TimelineDesc, Ie.TimelineAsc, Ie.TimelineAscDesc].includes(u) && ((O = t.paginator.timeline) != null && O.accumulative)) && (E = !1), E && d.value.splice(0, d.value.length), m.value = !0;
    }), Vt = () => {
      ie.value.doRefresh();
    }, ae = ul(12), we = r(() => {
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
    }), De = r(() => I.value.filter((a) => !a.hidden)), me = r(() => I.value.filter((a) => a.isForRowKey)), it = r(() => I.value.map((a) => a.key)), mt = r(() => {
      let a = [];
      for (let u in l) it.value.indexOf(u) !== -1 && a.push(u);
      return a;
    }), Gt = r(() => {
      let a = [];
      for (let u in l) u.indexOf("slide-") !== -1 && a.push(u);
      return a;
    }), pt = r(() => {
      var a;
      return t.hiddenSave || m.value || !((a = F.value) != null && a.resource || F.value.type) ? !1 : C.value && fe.value ? !0 : C.value;
    }), Rt = r(() => Tt.value && d.value.length >= t.requiredItemsForTopCreate || Pe.value ? !0 : pt.value || C.value && ue.value), He = r(() => {
      var a, u;
      return de.value, typeof ((a = F.value) == null ? void 0 : a.disabled) == "function" ? F.value.disabled({
        value: d.value,
        dataState: L.value
      }) : typeof ((u = F.value) == null ? void 0 : u.disabled) == "boolean" ? F.value.disabled : !fe.value;
    }), Lt = r(() => d.value.length), gt = r(() => {
      var a;
      return {
        items: d.value,
        ...(a = F.value) == null ? void 0 : a.resourceData
      };
    }), yt = r(() => t.titleTag === "" ? "h2" : t.titleTag), Nt = r(() => t.wrapContentTag === "" ? "div" : t.wrapContentTag), ut = r(() => wa(t.title)), bt = r(() => {
      var a;
      return (a = t.drag) == null ? void 0 : a.enabled;
    }), ue = r(() => B.value.includes(Ve.Create)), le = r(() => B.value.includes("read")), Y = r(() => B.value.includes(Ve.Update)), qe = r(() => B.value.includes(Ve.Edit)), Fe = r(() => B.value.includes(Ve.InlineEdit)), Mt = r(() => B.value.includes(Ve.ModalCreate)), rt = r(() => B.value.includes(Ve.InlineCreate)), xe = r(() => B.value.includes(Ve.InlineCreateEver)), _ = r(() => B.value.includes(Ve.Drop)), ht = r(() => B.value.includes(Ve.SwitchEditMode)), Pe = r(() => !ht.value || !Y.value && !_.value || !Y.value && _.value ? !1 : !m.value), Ht = r(() => {
      var a;
      return (typeof ((a = t.paginator) == null ? void 0 : a.type) < "u" && [Ie.LoadMore, Ie.Infinite].includes(t.paginator.type) || !m.value) && d.value.length > 0;
    }), Ke = r(() => I.value.find((a) => a.isForAccordionHeader)), kt = r(() => I.value.find((a) => a.isCalendarDate)), St = r(() => I.value.find((a) => a.isCalendarGroup)), Ot = (a, u) => typeof t.customItemSlotName == "function" ? t.customItemSlotName(a, u) : "", Ct = (a) => {
      let u = a.target;
      if (typeof u.dataset.column > "u")
        do
          u = u.parentNode;
        while (typeof u.dataset.column > "u" && u.tagName !== "TABLE" && u.tagName !== "body");
      if (u.tagName === "TD" && (u = u.parentNode, u = u.dataset.i, typeof u < "u"))
        return d.value[u];
    }, s = () => {
      de.value = fl();
    }, b = (a) => d.value[a], w = (a) => {
      var u;
      return (u = k.value) == null ? void 0 : u.querySelector(`[data-i="${a}"]`);
    }, A = (a) => {
      a && a.sortable && (a.key === h.value && (T.value = T.value === at.Asc ? at.Desc : at.Asc), h.value = a.key, d.value = d.value.sort((u, E) => p.value(u, E, a, T.value)), s(), n("sort", {
        sortBy: h.value,
        sortDirection: T.value
      }));
    }, M = (a) => {
      n("click", a);
    }, Z = (a) => {
      var E, O, j, G, We, Ue, je, ze;
      let u = parseInt((G = (j = (O = (E = a == null ? void 0 : a.originalEvent) == null ? void 0 : E.toElement) == null ? void 0 : O.closest("tr")) == null ? void 0 : j.dataset) == null ? void 0 : G.i);
      return !(typeof ((We = t.drag) == null ? void 0 : We.isValid) == "function" && !((Ue = t.drag) != null && Ue.isValid(d.value[u])) || typeof ((je = t.drag) == null ? void 0 : je.isValid) == "boolean" && !((ze = t.drag) != null && ze.isValid));
    }, ne = (a) => {
      var u, E;
      return typeof ((u = t.drag) == null ? void 0 : u.isDraggable) == "function" ? (E = t.drag) == null ? void 0 : E.isDraggable(a) : !0;
    }, W = () => {
      if (ue.value) {
        n("click-create");
        return;
      }
      if (rt.value || xe.value) {
        if (typeof t.newValueGenerator == "function") {
          let a = t.newValueGenerator();
          if (typeof a == "object" || Te.value !== Re.Table) {
            d.value.push(a);
            return;
          }
        }
        d.value.push({});
      } else
        n("click-create");
    }, Xe = (a) => {
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
        L.value.turnStoredIntoOriginal(), fe.value = !1, n("save", u);
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
          return Z(a);
        }
      });
    }, $t = (a, u, E = !1) => {
      let O = [de.value, ae, "row", u];
      return E && O.push("hidden"), me.value.forEach((j) => {
        let G = String(a[j.key]).toLowerCase();
        G.length > 50 && (G = G.substring(0, 50)), G = rl(G, " ", "-"), O.push(G);
      }), O.join("-");
    }, Dt = r(() => typeof t.createEnabledValidator == "function" ? t.createEnabledValidator({ items: d.value }) : !0), Tt = r(() => t.createButton === !1 ? !1 : xe.value || ue.value && C.value || rt.value && C.value || Mt.value && C.value), oa = r(() => t.createButton === !1 ? !1 : xe.value || rt.value && C.value || Mt.value && C.value), Na = r(() => [Re.Ol, Re.Ul].includes(Te.value)), It = (a, u) => typeof t.itemDisplayChecker == "function" ? t.itemDisplayChecker(a, u) : !0, Ft = (a, u) => typeof t.itemContainerClass == "function" ? t.itemContainerClass(a, u) : t.itemContainerClass, ia = (a, u) => typeof t.itemContainerStyle == "function" ? t.itemContainerStyle(a, u) : t.itemContainerStyle, Ma = (a, u) => Ke.value ? a[Ke.value.key] : "", Ye = r(() => typeof t.itemSlotComponent == "function" ? t.itemSlotComponent() : t.itemSlotComponent), Pt = r(() => typeof t.itemSlotData == "function" ? t.itemSlotData() : t.itemSlotData);
    ea(() => {
      var a;
      t.initialSorting && A(Ml(t.columns, h.value)), L.value.store({ items: d.value }).turnStoredIntoOriginal(), fe.value = !1, (a = t.drag) != null && a.enabled && Ut(() => {
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
    }), U(() => t.perms, (a) => B.value = a), U(B, (a) => n("update:perms", a)), U(C, (a) => {
      n("update:editMode", a);
    }), U(() => t.editMode, (a) => C.value = a), U(() => t.columns, (a) => I.value = a, { deep: !0 }), U(() => t.modelValue, (a) => {
      d.value = a;
    }, { deep: !0 }), U(d, (a) => {
      L.value.increment({ items: a }), fe.value = L.value.changed(), n("update:modelValue", a);
    }, { deep: !0 }), i({
      getItemByEvent: Ct,
      getItemByIndex: b,
      getRowByIndex: w,
      doRefresh: Vt,
      doRemoveIndex: (a) => {
        d.value.splice(a, 1), s();
      },
      getHtml: () => re.value,
      reRender: s,
      turnStoredIntoOriginal: () => {
        L.value.turnStoredIntoOriginal(), Ut(() => {
          s();
        });
      }
    });
    const Oa = r(() => typeof ke.defaultEmptySlot < "u"), $a = r(() => ke.defaultEmptySlot), Fa = r(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled ? !1 : typeof t.drag.canRender > "u" ? !0 : t.drag.canRender), Pa = r(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled || typeof t.drag.isDisabled > "u" ? !1 : t.drag.isDisabled), Ua = r(() => typeof t.header == "object" && Object.keys(t.header).length > 0), ja = r(() => (console.log("displayFiltersLktForm: ", typeof t.filtersForm == "object" && Object.keys(t.filtersForm).length > 0), typeof t.filtersForm == "object" && Object.keys(t.filtersForm).length > 0)), Te = r(() => Array.isArray(t.switchableTypes) && t.switchableTypes.length > 0 ? te.value : t.type), za = r(() => Array.isArray(t.switchableTypes) ? t.switchableTypes.length > 0 ? t.switchableTypes.includes(t.type) ? t.switchableTypes : [
      t.type,
      ...t.switchableTypes
    ] : [] : []), Ga = r(() => {
      let a = [];
      return za.value.forEach((u) => {
        let E = t.switchableTypesButtons[u];
        a.push({
          ...E,
          class: [E.class, u === Te.value ? "is-current" : ""].join(" "),
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
      if (Te.value !== Re.Calendar || !kt.value || typeof kt.value > "u") return [];
      let a = [], u = [];
      return d.value.forEach((E) => {
        var ze;
        let O = E[kt.value.key], j = cl("Y-m-d H:i:s", O), G;
        (ze = St.value) != null && ze.key && (G = E[St.value.key]);
        let We = {};
        G && t.calendarGroups && typeof t.calendarGroups[G] == "object" && (We = t.calendarGroups[G]);
        const Ue = [j, G].join("-");
        let je = -1;
        u.includes(Ue) ? je = u.findIndex((y) => y === Ue) : (je = u.length, u.push(Ue), a.push({
          date: O,
          data: {
            items: []
          },
          dot: {
            ...We,
            class: `lkt-calendar-group--${G}`
          }
        })), a[je].data.items.push(E);
      }), a;
    }), Ka = {
      dayPicked: ((a) => {
        var u;
        typeof ((u = t.calendar.events) == null ? void 0 : u.dayPicked) == "function" && t.calendar.events.dayPicked(a);
      }),
      visibleMonthChanged: ((a) => {
        var u;
        typeof ((u = t.calendar.events) == null ? void 0 : u.visibleMonthChanged) == "function" && t.calendar.events.visibleMonthChanged(a), Ne.value = a.visibleDate;
      })
    };
    let ra = null;
    return U(nt, () => {
      clearTimeout(ra), ra = setTimeout(() => {
        Me.value = {
          ...Me.value,
          ...nt.value
        };
      }, 400);
    }, { deep: !0 }), (a, u) => {
      const E = oe("lkt-header"), O = oe("lkt-button"), j = oe("lkt-form"), G = oe("lkt-accordion"), We = oe("lkt-calendar"), Ue = oe("lkt-loader"), je = oe("lkt-paginator");
      return c(), S("section", {
        ref_key: "element",
        ref: re,
        class: "lkt-table-page",
        id: "lkt-table-page-" + g(ae)
      }, [
        Ua.value ? (c(), R(E, pe(q({ key: 0 }, Ha.value)), null, 16)) : ut.value || g(l).title ? (c(), S("header", {
          key: 1,
          class: J(e.headerClass)
        }, [
          ut.value ? (c(), R(he(yt.value), { key: 0 }, {
            default: P(() => [
              e.titleIcon ? (c(), S("i", {
                key: 0,
                class: J(e.titleIcon)
              }, null, 2)) : x("", !0),
              et(" " + tt(ut.value), 1)
            ]),
            _: 1
          })) : x("", !0),
          g(l).title ? $(a.$slots, "title", { key: 1 }) : x("", !0)
        ], 2)) : x("", !0),
        (c(), R(he(Nt.value), {
          class: J(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: P(() => {
            var ze;
            return [
              Je(be("div", Jl, [
                e.groupButton !== !1 ? (c(), R(O, q({
                  key: 0,
                  ref: "groupButton"
                }, Ce.value, { class: "lkt-item-crud-group-button" }), {
                  split: P(() => [
                    be("div", Ql, [
                      Je(ye(O, q(vt.value, {
                        checked: C.value,
                        "onUpdate:checked": u[0] || (u[0] = (y) => C.value = y)
                      }), null, 16, ["checked"]), [
                        [Qe, Pe.value]
                      ])
                    ]),
                    g(l)["prev-buttons-ever"] ? $(a.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: Y.value,
                      canDrop: _.value,
                      perms: e.perms
                    }) : x("", !0),
                    g(l)["prev-buttons"] ? $(a.$slots, "prev-buttons", {
                      key: 1,
                      canUpdate: Y.value,
                      canDrop: _.value,
                      perms: e.perms
                    }) : x("", !0),
                    Je(ye(O, q({
                      class: "lkt-table--save-button",
                      ref_key: "saveButtonRef",
                      ref: se
                    }, {
                      ...F.value,
                      disabled: He.value,
                      resourceData: gt.value
                    }, {
                      onLoading: st,
                      onLoaded: dt,
                      onClick: aa
                    }), {
                      split: P(({ doClose: y, doRootClick: f }) => [
                        $(a.$slots, "button-save-split", {
                          doClose: y,
                          doRootClick: f,
                          dataState: L.value,
                          onButtonLoading: st,
                          onButtonLoaded: dt
                        })
                      ]),
                      default: P(() => [
                        g(l)["button-save"] ? $(a.$slots, "button-save", {
                          key: 0,
                          items: d.value,
                          editMode: e.editMode,
                          canUpdate: !He.value
                        }) : x("", !0)
                      ]),
                      _: 3
                    }, 16), [
                      [Qe, pt.value]
                    ]),
                    Tt.value && d.value.length >= e.requiredItemsForTopCreate ? (c(), R(Bt, {
                      key: 2,
                      config: ot.value,
                      disabled: !Dt.value,
                      onClick: W,
                      onAppend: Xe
                    }, null, 8, ["config", "disabled"])) : x("", !0)
                  ]),
                  _: 3
                }, 16)) : x("", !0),
                g(l)["prev-buttons-ever"] ? $(a.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: Y.value,
                  canDrop: _.value,
                  perms: e.perms
                }) : x("", !0),
                g(l)["prev-buttons"] ? $(a.$slots, "prev-buttons", {
                  key: 2,
                  canUpdate: Y.value,
                  canDrop: _.value,
                  perms: e.perms
                }) : x("", !0),
                Je(ye(O, q({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: se
                }, {
                  ...F.value,
                  disabled: He.value,
                  resourceData: gt.value
                }, {
                  onLoading: st,
                  onLoaded: dt,
                  onClick: aa
                }), {
                  split: P(({ doClose: y, doRootClick: f }) => [
                    $(a.$slots, "button-save-split", {
                      doClose: y,
                      doRootClick: f,
                      dataState: L.value,
                      onButtonLoading: st,
                      onButtonLoaded: dt
                    })
                  ]),
                  default: P(() => [
                    g(l)["button-save"] ? $(a.$slots, "button-save", {
                      key: 0,
                      items: d.value,
                      editMode: e.editMode,
                      canUpdate: !He.value
                    }) : x("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [Qe, pt.value]
                ]),
                oa.value && d.value.length >= e.requiredItemsForTopCreate ? (c(), R(Bt, {
                  key: 3,
                  config: Oe.value,
                  disabled: !Dt.value,
                  onClick: W,
                  onAppend: Xe
                }, null, 8, ["config", "disabled"])) : Tt.value && d.value.length >= e.requiredItemsForTopCreate ? (c(), R(Bt, {
                  key: 4,
                  config: ot.value,
                  disabled: !Dt.value,
                  onClick: W,
                  onAppend: Xe
                }, null, 8, ["config", "disabled"])) : x("", !0),
                be("div", Zl, [
                  Je(ye(O, q(vt.value, {
                    checked: C.value,
                    "onUpdate:checked": u[1] || (u[1] = (y) => C.value = y)
                  }), null, 16, ["checked"]), [
                    [Qe, Pe.value]
                  ])
                ])
              ], 512), [
                [Qe, Rt.value]
              ]),
              g(l).buttons ? (c(), S("div", _l, [
                $(a.$slots, "buttons")
              ])) : x("", !0),
              V.value && g(l).filters ? (c(), S("div", en, [
                $(a.$slots, "filters", {
                  items: d.value,
                  isLoading: m.value
                })
              ])) : x("", !0),
              ja.value ? (c(), R(j, q({
                key: 2,
                modelValue: nt.value,
                "onUpdate:modelValue": u[2] || (u[2] = (y) => nt.value = y),
                editing: C.value,
                "onUpdate:editing": u[3] || (u[3] = (y) => C.value = y),
                perms: B.value,
                "onUpdate:perms": u[4] || (u[4] = (y) => B.value = y)
              }, {
                form: e.filtersForm
              }), null, 16, ["modelValue", "editing", "perms"])) : x("", !0),
              Je(be("div", tn, [
                Te.value === g(Re).Table ? (c(), S("table", an, [
                  e.hideTableHeader ? x("", !0) : (c(), S("thead", ln, [
                    be("tr", null, [
                      bt.value && C.value ? (c(), S("th", nn)) : x("", !0),
                      e.addNavigation && C.value ? (c(), S("th", on)) : x("", !0),
                      (c(!0), S(H, null, ge(De.value, (y) => (c(), S(H, null, [
                        we.value.indexOf(y.key) === -1 ? (c(), R(Yl, {
                          key: 0,
                          column: y,
                          "sort-by": h.value,
                          "sort-direction": T.value,
                          "amount-of-columns": e.columns.length,
                          items: d.value,
                          onClick: (f) => A(y)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : x("", !0)
                      ], 64))), 256))
                    ])
                  ])),
                  be("tbody", {
                    ref_key: "tableBody",
                    ref: k,
                    id: "lkt-table-body-" + g(ae),
                    class: J(e.itemsContainerClass)
                  }, [
                    (c(!0), S(H, null, ge(d.value, (y, f) => Je((c(), R(Kl, {
                      modelValue: d.value[f],
                      "onUpdate:modelValue": (N) => d.value[f] = N,
                      key: $t(y, f),
                      i: f,
                      "is-draggable": ne(y),
                      sortable: bt.value,
                      "visible-columns": De.value,
                      "empty-columns": we.value,
                      "add-navigation": e.addNavigation,
                      "latest-row": f + 1 === Lt.value,
                      "can-drop": _.value && C.value,
                      "can-edit": qe.value && Y.value && C.value,
                      "can-read": le.value,
                      "can-create": ue.value,
                      "edit-mode-enabled": C.value,
                      "has-inline-edit-perm": Fe.value,
                      "row-display-type": e.rowDisplayType,
                      "render-drag": Fa.value,
                      "disabled-drag": Pa.value,
                      "is-loading": m.value,
                      "item-container-class": e.itemContainerClass,
                      "item-slot-component": Ye.value,
                      "item-slot-data": Pt.value,
                      "item-slot-events": e.itemSlotEvents,
                      permissions: B.value,
                      onClick: M,
                      onItemUp: Ra,
                      onItemDown: La,
                      onItemDrop: wt
                    }, tl({ _: 2 }, [
                      g(l)[`item-${f}`] && ua(a.row, f) ? {
                        name: `item-${f}`,
                        fn: P((N) => [
                          $(a.$slots, `item-${f}`, pe({
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
                      } : g(l).item && ua(a.row, f) ? {
                        name: "item",
                        fn: P((N) => [
                          $(a.$slots, "item", pe({
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
                      ge(mt.value, (N) => ({
                        name: N,
                        fn: P((ct) => [
                          $(a.$slots, N, pe({
                            [e.slotItemVar || ""]: ct.item,
                            value: ct.value,
                            column: ct.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class", "item-slot-component", "item-slot-data", "item-slot-events", "permissions"])), [
                      [Qe, It(d.value[f], f)]
                    ])), 128))
                  ], 10, un)
                ])) : Te.value === g(Re).Item ? (c(), S("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: k,
                  id: "lkt-table-body-" + g(ae),
                  class: J(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (c(!0), S(H, null, ge(d.value, (y, f) => (c(), S(H, {
                    key: $t(y, f)
                  }, [
                    !e.skipTableItemsContainer && It(y, f) ? (c(), S("div", {
                      key: 0,
                      class: J(["lkt-table-item", Ft(y, f)]),
                      style: va(ia(y, f)),
                      "data-i": f
                    }, [
                      Ye.value ? (c(), R(he(Ye.value), q({
                        key: 0,
                        ref_for: !0
                      }, {
                        item: y,
                        index: f,
                        editing: C.value,
                        perms: B.value,
                        data: Pt.value,
                        events: e.itemSlotEvents
                      }), null, 16)) : $(a.$slots, "item", pe({
                        key: 1,
                        [e.slotItemVar || ""]: y,
                        index: f,
                        editing: C.value,
                        canCreate: ue.value,
                        canRead: le.value,
                        canUpdate: Y.value,
                        canDrop: _.value,
                        isLoading: m.value,
                        doDrop: () => wt(f)
                      }))
                    ], 14, sn)) : It(y, f) ? $(a.$slots, "item", pe({
                      key: 1,
                      class: Ft(y, f),
                      dataI: f,
                      [e.slotItemVar || ""]: y,
                      index: f,
                      editing: C.value,
                      canCreate: ue.value,
                      canRead: le.value,
                      canUpdate: Y.value,
                      canDrop: _.value,
                      isLoading: m.value,
                      doDrop: () => wt(f)
                    })) : x("", !0)
                  ], 64))), 128))
                ], 10, rn)) : Te.value === g(Re).Accordion ? (c(), S("div", {
                  key: 2,
                  ref_key: "tableBody",
                  ref: k,
                  id: "lkt-table-body-" + g(ae),
                  class: J(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (c(!0), S(H, null, ge(d.value, (y, f) => (c(), S(H, null, [
                    [g(Ee).Auto, g(Ee).PreferCustomItem].includes(e.rowDisplayType) && g(l)[Ot(y, f)] ? $(a.$slots, Ot(y, f), {
                      key: 0,
                      item: y,
                      index: f,
                      editing: C.value,
                      isLoading: m.value
                    }) : [g(Ee).Auto, g(Ee).PreferCustomItem].includes(e.rowDisplayType) && g(l)[`item-${f}`] ? $(a.$slots, `item-${f}`, {
                      key: 1,
                      item: y,
                      index: f,
                      editing: C.value,
                      isLoading: m.value
                    }) : (c(), S(H, { key: 2 }, [
                      It(y, f) ? (c(), R(G, q({
                        class: ["lkt-table-item", Ft(y, f)],
                        "data-i": f,
                        key: $t(y, f)
                      }, { ref_for: !0 }, {
                        ...e.accordion,
                        title: Ma(y)
                      }), {
                        header: P(() => [
                          ye(_t, {
                            modelValue: d.value[f],
                            "onUpdate:modelValue": (N) => d.value[f] = N,
                            i: f,
                            column: Ke.value,
                            columns: De.value,
                            "edit-mode-enabled": C.value,
                            "has-inline-edit-perm": Fe.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])
                        ]),
                        default: P(() => [
                          (c(!0), S(H, null, ge(De.value, (N) => {
                            var ct, ca;
                            return c(), S(H, null, [
                              N.key !== ((ct = Ke.value) == null ? void 0 : ct.key) && a.$slots[N.key] && g(xa)(N, d.value[f]) ? $(a.$slots, N.key, {
                                key: 0,
                                value: d.value[f][N.key],
                                item: d.value[f],
                                column: N,
                                i: f
                              }) : (c(), S(H, { key: 1 }, [
                                N.key !== ((ca = Ke.value) == null ? void 0 : ca.key) ? (c(), R(_t, {
                                  key: 0,
                                  modelValue: d.value[f],
                                  "onUpdate:modelValue": (Xa) => d.value[f] = Xa,
                                  i: f,
                                  column: N,
                                  columns: De.value,
                                  "edit-mode-enabled": C.value,
                                  "has-inline-edit-perm": Fe.value
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])) : x("", !0)
                              ], 64))
                            ], 64);
                          }), 256))
                        ]),
                        _: 2
                      }, 1040, ["class", "data-i"])) : x("", !0)
                    ], 64))
                  ], 64))), 256))
                ], 10, dn)) : Na.value ? (c(), R(he(Te.value), {
                  key: 3,
                  class: J(["lkt-table-items-container", e.itemsContainerClass])
                }, {
                  default: P(() => [
                    (c(!0), S(H, null, ge(d.value, (y, f) => (c(), S(H, {
                      key: $t(y, f)
                    }, [
                      It(y, f) ? (c(), S("li", {
                        key: 0,
                        class: J(["lkt-table-item", Ft(y, f)]),
                        "data-i": f,
                        style: va(ia(y, f))
                      }, [
                        Ye.value ? (c(), R(he(Ye.value), q({
                          key: 0,
                          ref_for: !0
                        }, {
                          item: y,
                          index: f,
                          editing: C.value,
                          perms: B.value,
                          data: Pt.value,
                          events: e.itemSlotEvents
                        }), null, 16)) : $(a.$slots, "item", pe({
                          key: 1,
                          [e.slotItemVar || ""]: y,
                          index: f,
                          editing: C.value,
                          canCreate: ue.value,
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
                }, 8, ["class"])) : Te.value === g(Re).Carousel ? (c(), S("div", {
                  key: 4,
                  ref_key: "tableBody",
                  ref: k,
                  id: "lkt-table-body-" + g(ae),
                  class: J(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  ye(g(Il), q({
                    modelValue: ce.value,
                    "onUpdate:modelValue": u[5] || (u[5] = (y) => ce.value = y)
                  }, e.carousel, {
                    "wrap-around": ((ze = e.carousel) == null ? void 0 : ze.infinite) === !0
                  }), {
                    addons: P(() => [
                      ye(g(El)),
                      ye(g(xl))
                    ]),
                    default: P(() => [
                      (c(!0), S(H, null, ge(Gt.value, (y, f) => (c(), R(g(ba), {
                        key: y,
                        index: f
                      }, {
                        default: P(() => [
                          be("div", fn, [
                            $(a.$slots, y)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (c(!0), S(H, null, ge(d.value, (y, f) => (c(), R(g(ba), {
                        key: a.slide,
                        index: f
                      }, {
                        default: P(() => [
                          be("div", mn, [
                            Ye.value ? (c(), R(he(Ye.value), q({
                              key: 0,
                              ref_for: !0
                            }, {
                              item: y,
                              index: f,
                              editing: C.value,
                              perms: B.value,
                              data: Pt.value,
                              events: e.itemSlotEvents
                            }), null, 16)) : $(a.$slots, "item", pe({
                              key: 1,
                              [e.slotItemVar || ""]: y,
                              index: f,
                              editing: C.value,
                              canCreate: ue.value,
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
                ], 10, vn)) : Te.value === g(Re).Calendar ? (c(), S("div", {
                  key: 5,
                  ref_key: "tableBody",
                  ref: k,
                  id: "lkt-table-body-" + g(ae),
                  class: J(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  ye(We, pe(Sa({
                    ...e.calendar,
                    items: qa.value,
                    events: Ka
                  })), null, 16)
                ], 10, pn)) : x("", !0)
              ], 512), [
                [Qe, Ht.value]
              ]),
              !m.value && d.value.length === 0 ? (c(), S("div", gn, [
                g(l).empty ? $(a.$slots, "empty", { key: 0 }) : Oa.value ? (c(), R(he($a.value), {
                  key: 1,
                  message: e.noResultsText
                }, null, 8, ["message"])) : e.noResultsText ? (c(), S(H, { key: 2 }, [
                  et(tt(e.noResultsText), 1)
                ], 64)) : x("", !0)
              ])) : x("", !0),
              m.value ? (c(), R(Ue, { key: 4 })) : x("", !0),
              Tt.value || g(l).bottomButtons ? (c(), S("div", yn, [
                oa.value && d.value.length >= e.requiredItemsForBottomCreate ? (c(), R(Bt, {
                  key: 0,
                  config: Oe.value,
                  disabled: !Dt.value,
                  onClick: W,
                  onAppend: Xe
                }, null, 8, ["config", "disabled"])) : Tt.value && d.value.length >= e.requiredItemsForBottomCreate ? (c(), R(Bt, {
                  key: 1,
                  config: ot.value,
                  disabled: !Dt.value,
                  onClick: W,
                  onAppend: Xe
                }, null, 8, ["config", "disabled"])) : x("", !0),
                $(a.$slots, "bottom-buttons")
              ])) : x("", !0),
              e.paginator && Object.keys(e.paginator).length > 0 ? (c(), R(je, q({
                key: 6,
                ref_key: "paginatorRef",
                ref: ie
              }, {
                ...e.paginator,
                resourceData: Me.value,
                timelineOldestDate: ve.value,
                timelineNewestDate: X.value,
                timelineVisibleDate: Ne.value
              }, {
                modelValue: v.value,
                "onUpdate:modelValue": u[6] || (u[6] = (y) => v.value = y),
                onLoading: xt,
                onPerms: ft,
                onResponse: $e
              }), null, 16, ["modelValue"])) : x("", !0),
              g(l)["web-element-actions"] ? $(a.$slots, "web-element-actions", { key: 7 }) : x("", !0)
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
}, Bn = (e) => (ke.navButtonSlot = e, !0), An = (e) => (ke.createButtonSlot = e, !0), En = (e) => {
  ke.defaultEmptySlot = e;
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
