import { defineComponent as he, computed as r, ref as E, shallowReactive as Kt, watch as U, watchEffect as Gt, onMounted as Zt, onBeforeUnmount as $a, reactive as Ht, provide as da, h as J, useId as Fa, inject as yt, getCurrentInstance as Pa, onUnmounted as _a, onUpdated as Ua, cloneVNode as ja, resolveComponent as ye, createBlock as O, createElementBlock as w, unref as b, openBlock as p, mergeProps as Y, withCtx as P, createTextVNode as Je, toDisplayString as Qe, normalizeProps as fe, Fragment as H, useSlots as ca, normalizeClass as Z, createCommentVNode as R, createElementVNode as me, createVNode as pe, resolveDynamicComponent as ge, guardReactiveProps as va, renderSlot as $, renderList as we, mergeDefaults as za, nextTick as Bt, withDirectives as qe, vShow as Xe, createSlots as Ga } from "vue";
import { __ as Ha } from "lkt-i18n";
import { ColumnType as Me, FieldType as Ke, MultipleOptionsDisplay as qa, SortDirection as Ze, Column as fa, extractPropValue as Xa, TableRowType as De, extractI18nValue as pa, LktSettings as Le, ensureButtonConfig as Ye, TablePermission as Ae, PaginatorType as Et, TableType as Ve, getDefaultValues as Ya, Table as Ka, ButtonType as qt } from "lkt-vue-kernel";
import { Column as hl, createColumn as kl } from "lkt-vue-kernel";
import { generateRandomString as Wa, replaceAll as Ja } from "lkt-string-tools";
import { DataState as Qa } from "lkt-data-state";
import Za from "sortablejs";
import { date as xa, time as en } from "lkt-date-tools";
/**
 * Vue 3 Carousel 0.14.0
 * (c) 2025
 * @license MIT
 */
const ma = ["viewport", "carousel"], Vt = {
  "bottom-to-top": "btt",
  "left-to-right": "ltr",
  "right-to-left": "rtl",
  "top-to-bottom": "ttb"
}, ga = [
  "ltr",
  "left-to-right",
  "rtl",
  "right-to-left",
  "ttb",
  "top-to-bottom",
  "btt",
  "bottom-to-top"
], tn = {
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
}, ya = ["slide", "fade"], ba = [
  "center",
  "start",
  "end",
  "center-even",
  "center-odd"
], G = {
  autoplay: 0,
  breakpointMode: ma[0],
  breakpoints: void 0,
  dir: ga[0],
  enabled: !0,
  gap: 0,
  height: "auto",
  i18n: tn,
  ignoreAnimations: !1,
  itemsToScroll: 1,
  itemsToShow: 1,
  modelValue: 0,
  mouseDrag: !0,
  pauseAutoplayOnHover: !1,
  preventExcessiveDragging: !1,
  slideEffect: ya[0],
  snapAlign: ba[0],
  touchDrag: !0,
  transition: 300,
  wrapAround: !1
}, xe = Symbol("carousel"), an = (a) => {
  const i = Kt([]), o = (l) => {
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
function nn(a) {
  return a.length === 0 ? 0 : a.reduce((o, l) => o + l, 0) / a.length;
}
function la({ slides: a, position: i, toShow: o }) {
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
    }, v = a[(k % a.length + a.length) % a.length].vnode, I = ja(v, s);
    I.el = null, l.push(I);
  }
  return l;
}
const ln = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function oa(a) {
  if (!a.el || !(a.el instanceof Element))
    return;
  const i = a.el.querySelectorAll(ln);
  for (const o of i)
    o instanceof HTMLElement && !o.hasAttribute("disabled") && o.getAttribute("aria-hidden") !== "true" && o.setAttribute("tabindex", "-1");
}
function on(a, i) {
  return Object.keys(a).filter((o) => !i.includes(o)).reduce((o, l) => (o[l] = a[l], o), {});
}
function rn(a) {
  const { isVertical: i, isReversed: o, dragged: l, effectiveSlideSize: n } = a, t = i ? l.y : l.x;
  if (t === 0)
    return 0;
  const y = Math.round(t / n);
  return o ? y : -y;
}
function Re({ val: a, max: i, min: o }) {
  return i < o ? a : Math.min(Math.max(a, isNaN(o) ? a : o), isNaN(i) ? a : i);
}
function un(a) {
  const { transform: i } = window.getComputedStyle(a);
  return i.split(/[(,)]/).slice(1, -1).map((o) => parseFloat(o));
}
function sn(a) {
  let i = 1, o = 1;
  return a.forEach((l) => {
    const n = un(l);
    n.length === 6 && (i /= n[0], o /= n[3]);
  }), { widthMultiplier: i, heightMultiplier: o };
}
function dn(a, i) {
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
function cn(a, i, o) {
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
function Wt({ slideSize: a, viewportSize: i, align: o, itemsToShow: l }) {
  return l !== void 0 ? dn(o, l) : a !== void 0 && i !== void 0 ? cn(o, a, i) : 0;
}
function ha(a = "", i = {}) {
  return Object.entries(i).reduce((o, [l, n]) => o.replace(`{${l}}`, String(n)), a);
}
function ka({ val: a, max: i, min: o = 0 }) {
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
function At(a, i = "px") {
  if (!(a == null || a === ""))
    return typeof a == "number" || parseFloat(a).toString() === a ? `${a}${i}` : a;
}
const vn = he({
  name: "CarouselAria",
  setup() {
    const a = yt(xe);
    return a ? () => J("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, ha(a.config.i18n.itemXofY, {
      currentSlide: a.currentSlide + 1,
      slidesCount: a.slidesCount
    })) : () => "";
  }
}), fn = {
  // time to auto advance slides in ms
  autoplay: {
    default: G.autoplay,
    type: Number
  },
  // an object to store breakpoints
  breakpoints: {
    default: G.breakpoints,
    type: Object
  },
  // controls the breakpoint mode relative to the carousel container or the viewport
  breakpointMode: {
    default: G.breakpointMode,
    validator(a) {
      return ma.includes(a);
    }
  },
  // enable/disable the carousel component
  enabled: {
    default: G.enabled,
    type: Boolean
  },
  // control the gap between slides
  gap: {
    default: G.gap,
    type: Number
  },
  // control the gap between slides
  height: {
    default: G.height,
    type: [Number, String]
  },
  ignoreAnimations: {
    default: !1,
    type: [Array, Boolean, String]
  },
  // count of items to be scrolled
  itemsToScroll: {
    default: G.itemsToScroll,
    type: Number
  },
  // count of items to showed per view
  itemsToShow: {
    default: G.itemsToShow,
    type: [Number, String]
  },
  // aria-labels and additional text labels
  i18n: {
    default: G.i18n,
    type: Object
  },
  // slide number number of initial slide
  modelValue: {
    default: void 0,
    type: Number
  },
  // toggle mouse dragging.
  mouseDrag: {
    default: G.mouseDrag,
    type: Boolean
  },
  // toggle mouse dragging.
  touchDrag: {
    default: G.touchDrag,
    type: Boolean
  },
  pauseAutoplayOnHover: {
    default: G.pauseAutoplayOnHover,
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
    default: G.snapAlign,
    validator(a) {
      return ba.includes(a);
    }
  },
  slideEffect: {
    type: String,
    default: G.slideEffect,
    validator(a) {
      return ya.includes(a);
    }
  },
  // sliding transition time in ms
  transition: {
    default: G.transition,
    type: Number
  },
  // control the gap between slides
  dir: {
    type: String,
    default: G.dir,
    validator(a, i) {
      if (!ga.includes(a))
        return !1;
      const o = a in Vt ? Vt[a] : a;
      return ["ttb", "btt"].includes(o) && (!i.height || i.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${a}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: G.wrapAround,
    type: Boolean
  }
}, pn = he({
  name: "VueCarousel",
  props: fn,
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
    const t = an(o), y = t.getSlides(), k = r(() => y.length), D = E(null), s = E(null), v = E(0), I = r(() => Object.assign(Object.assign(Object.assign({}, G), on(a, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, G.i18n), a.i18n) })), f = Kt(Object.assign({}, I.value)), g = E((n = a.modelValue) !== null && n !== void 0 ? n : 0), V = E(g.value);
    U(g, (d) => V.value = d);
    const A = E(0), et = r(() => Math.ceil((k.value - 1) / 2)), ie = r(() => k.value - 1), re = r(() => 0);
    let te = null, c = null, T = null;
    const ue = r(() => v.value + f.gap), j = r(() => {
      const d = f.dir || "ltr";
      return d in Vt ? Vt[d] : d;
    }), le = r(() => ["rtl", "btt"].includes(j.value)), se = r(() => ["ttb", "btt"].includes(j.value)), _ = r(() => f.itemsToShow === "auto"), z = r(() => se.value ? "height" : "width");
    function Ie() {
      var d;
      if (!tt.value)
        return;
      const h = (I.value.breakpointMode === "carousel" ? (d = D.value) === null || d === void 0 ? void 0 : d.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, C = Object.keys(a.breakpoints || {}).map((L) => Number(L)).sort((L, W) => +W - +L), B = {};
      C.some((L) => h >= L ? (Object.assign(B, a.breakpoints[L]), B.i18n && Object.assign(B.i18n, I.value.i18n, a.breakpoints[L].i18n), !0) : !1), Object.assign(f, I.value, B);
    }
    const Rt = Xt(() => {
      Ie(), Ue(), K();
    }), de = Kt(/* @__PURE__ */ new Set()), ae = E([]);
    function Lt({ widthMultiplier: d, heightMultiplier: h }) {
      ae.value = y.map((C) => {
        var B;
        const L = (B = C.exposed) === null || B === void 0 ? void 0 : B.getBoundingRect();
        return {
          width: L.width * d,
          height: L.height * h
        };
      });
    }
    const _e = E({
      width: 0,
      height: 0
    });
    function Mt({ widthMultiplier: d, heightMultiplier: h }) {
      var C;
      const B = ((C = s.value) === null || C === void 0 ? void 0 : C.getBoundingClientRect()) || { width: 0, height: 0 };
      _e.value = {
        width: B.width * d,
        height: B.height * h
      };
    }
    function K() {
      if (!s.value)
        return;
      const d = sn(de);
      if (Mt(d), Lt(d), _.value)
        v.value = nn(ae.value.map((h) => h[z.value]));
      else {
        const h = Number(f.itemsToShow), C = (h - 1) * f.gap;
        v.value = (_e.value[z.value] - C) / h;
      }
    }
    function Ue() {
      !f.wrapAround && k.value > 0 && (g.value = Re({
        val: g.value,
        max: ie.value,
        min: re.value
      })), _.value || (f.itemsToShow = Re({
        val: Number(f.itemsToShow),
        max: k.value,
        min: 1
      }));
    }
    const Te = r(() => typeof a.ignoreAnimations == "string" ? a.ignoreAnimations.split(",") : Array.isArray(a.ignoreAnimations) ? a.ignoreAnimations : a.ignoreAnimations ? !1 : []);
    Gt(() => Ue()), Gt(() => {
      K();
    });
    let Ne;
    const bt = (d) => {
      const h = d.target;
      if (!(!(h != null && h.contains(D.value)) || Array.isArray(Te.value) && Te.value.includes(d.animationName)) && (de.add(h), !Ne)) {
        const C = () => {
          Ne = requestAnimationFrame(() => {
            K(), C();
          });
        };
        C();
      }
    }, ht = (d) => {
      const h = d.target;
      h && de.delete(h), Ne && de.size === 0 && (cancelAnimationFrame(Ne), K());
    }, tt = E(!1);
    typeof document < "u" && Gt(() => {
      tt.value && Te.value !== !1 ? (document.addEventListener("animationstart", bt), document.addEventListener("animationend", ht)) : (document.removeEventListener("animationstart", bt), document.removeEventListener("animationend", ht));
    }), Zt(() => {
      tt.value = !0, Ie(), it(), D.value && (T = new ResizeObserver(Rt), T.observe(D.value)), o("init");
    }), $a(() => {
      tt.value = !1, t.cleanup(), c && clearTimeout(c), Ne && cancelAnimationFrame(Ne), te && clearInterval(te), T && (T.disconnect(), T = null), typeof document < "u" && ve(), D.value && (D.value.removeEventListener("transitionend", K), D.value.removeEventListener("animationiteration", K));
    });
    let ce = !1;
    const at = { x: 0, y: 0 }, x = Ht({ x: 0, y: 0 }), nt = E(!1), lt = E(!1), Nt = () => {
      nt.value = !0;
    }, Ot = () => {
      nt.value = !1;
    }, ot = Xt((d) => {
      if (!d.ctrlKey)
        switch (d.key) {
          case "ArrowLeft":
          case "ArrowUp":
            se.value === d.key.endsWith("Up") && (le.value ? je(!0) : $e(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            se.value === d.key.endsWith("Down") && (le.value ? $e(!0) : je(!0));
            break;
        }
    }, 200), kt = () => {
      document.addEventListener("keydown", ot);
    }, ve = () => {
      document.removeEventListener("keydown", ot);
    };
    function Oe(d) {
      const h = d.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(h) || ke.value || (ce = d.type === "touchstart", !ce && (d.preventDefault(), d.button !== 0)))
        return;
      at.x = "touches" in d ? d.touches[0].clientX : d.clientX, at.y = "touches" in d ? d.touches[0].clientY : d.clientY;
      const C = ce ? "touchmove" : "mousemove", B = ce ? "touchend" : "mouseup";
      document.addEventListener(C, ee, { passive: !1 }), document.addEventListener(B, St, { passive: !0 });
    }
    const ee = Xt((d) => {
      lt.value = !0;
      const h = "touches" in d ? d.touches[0].clientX : d.clientX, C = "touches" in d ? d.touches[0].clientY : d.clientY;
      x.x = h - at.x, x.y = C - at.y;
      const B = rn({
        isVertical: se.value,
        isReversed: le.value,
        dragged: x,
        effectiveSlideSize: ue.value
      });
      V.value = f.wrapAround ? g.value + B : Re({
        val: g.value + B,
        max: ie.value,
        min: re.value
      }), o("drag", { deltaX: x.x, deltaY: x.y });
    });
    function St() {
      if (ee.cancel(), V.value !== g.value && !ce) {
        const C = (B) => {
          B.preventDefault(), window.removeEventListener("click", C);
        };
        window.addEventListener("click", C);
      }
      q(V.value), x.x = 0, x.y = 0, lt.value = !1;
      const d = ce ? "touchmove" : "mousemove", h = ce ? "touchend" : "mouseup";
      document.removeEventListener(d, ee), document.removeEventListener(h, St);
    }
    function it() {
      !f.autoplay || f.autoplay <= 0 || (te = setInterval(() => {
        f.pauseAutoplayOnHover && nt.value || je();
      }, f.autoplay));
    }
    function Ct() {
      te && (clearInterval(te), te = null);
    }
    function rt() {
      Ct(), it();
    }
    const ke = E(!1);
    function q(d, h = !1) {
      if (!h && ke.value)
        return;
      let C = d, B = d;
      A.value = g.value, f.wrapAround ? B = ka({
        val: C,
        max: ie.value,
        min: re.value
      }) : C = Re({
        val: C,
        max: ie.value,
        min: re.value
      }), o("slide-start", {
        slidingToIndex: d,
        currentSlideIndex: g.value,
        prevSlideIndex: A.value,
        slidesCount: k.value
      }), Ct(), ke.value = !0, g.value = C, B !== C && Fe.pause(), o("update:modelValue", B), c = setTimeout(() => {
        f.wrapAround && B !== C && (Fe.resume(), g.value = B, o("loop", {
          currentSlideIndex: g.value,
          slidingToIndex: d
        })), o("slide-end", {
          currentSlideIndex: g.value,
          prevSlideIndex: A.value,
          slidesCount: k.value
        }), ke.value = !1, rt();
      }, f.transition);
    }
    function je(d = !1) {
      q(g.value + f.itemsToScroll, d);
    }
    function $e(d = !1) {
      q(g.value - f.itemsToScroll, d);
    }
    function $t() {
      Ie(), Ue(), K(), rt();
    }
    U(() => [I.value, a.breakpoints], () => Ie(), { deep: !0 }), U(() => a.autoplay, () => rt());
    const Fe = U(() => a.modelValue, (d) => {
      d !== g.value && q(Number(d), !0);
    });
    o("before-init");
    const Be = r(() => {
      if (!f.wrapAround)
        return { before: 0, after: 0 };
      if (_.value)
        return { before: y.length, after: y.length };
      const d = Number(f.itemsToShow), h = Math.ceil(d + (f.itemsToScroll - 1)), C = h - V.value, B = h - (k.value - (V.value + 1));
      return {
        before: Math.max(0, C),
        after: Math.max(0, B)
      };
    }), ut = r(() => Be.value.before ? _.value ? ae.value.slice(-1 * Be.value.before).reduce((d, h) => d + h[z.value] + f.gap, 0) * -1 : Be.value.before * ue.value * -1 : 0), st = r(() => {
      var d;
      if (_.value) {
        const h = (g.value % y.length + y.length) % y.length;
        return Wt({
          slideSize: (d = ae.value[h]) === null || d === void 0 ? void 0 : d[z.value],
          viewportSize: _e.value[z.value],
          align: f.snapAlign
        });
      }
      return Wt({
        align: f.snapAlign,
        itemsToShow: +f.itemsToShow
      });
    }), dt = r(() => {
      let d = 0;
      if (_.value) {
        if (g.value < 0 ? d = ae.value.slice(g.value).reduce((h, C) => h + C[z.value] + f.gap, 0) * -1 : d = ae.value.slice(0, g.value).reduce((h, C) => h + C[z.value] + f.gap, 0), d -= st.value, !f.wrapAround) {
          const h = ae.value.reduce((C, B) => C + B[z.value] + f.gap, 0) - _e.value[z.value] - f.gap;
          d = Re({
            val: d,
            max: h,
            min: 0
          });
        }
      } else {
        let h = g.value - st.value;
        f.wrapAround || (h = Re({
          val: h,
          max: k.value - +f.itemsToShow,
          min: 0
        })), d = h * ue.value;
      }
      return d * (le.value ? 1 : -1);
    }), Se = r(() => {
      var d, h;
      if (!_.value) {
        const L = g.value - st.value;
        return f.wrapAround ? {
          min: Math.floor(L),
          max: Math.ceil(L + Number(f.itemsToShow) - 1)
        } : {
          min: Math.floor(Re({
            val: L,
            max: k.value - Number(f.itemsToShow),
            min: 0
          })),
          max: Math.ceil(Re({
            val: L + Number(f.itemsToShow) - 1,
            max: k.value - 1,
            min: 0
          }))
        };
      }
      let C = 0;
      {
        let L = 0, W = 0 - Be.value.before;
        const ne = Math.abs(dt.value + ut.value);
        for (; L <= ne; ) {
          const oe = (W % y.length + y.length) % y.length;
          L += ((d = ae.value[oe]) === null || d === void 0 ? void 0 : d[z.value]) + f.gap, W++;
        }
        C = W - 1;
      }
      let B = 0;
      {
        let L = C, W = 0;
        for (L < 0 ? W = ae.value.slice(0, L).reduce((ne, oe) => ne + oe[z.value] + f.gap, 0) - Math.abs(dt.value + ut.value) : W = ae.value.slice(0, L).reduce((ne, oe) => ne + oe[z.value] + f.gap, 0) - Math.abs(dt.value); W < _e.value[z.value]; ) {
          const ne = (L % y.length + y.length) % y.length;
          W += ((h = ae.value[ne]) === null || h === void 0 ? void 0 : h[z.value]) + f.gap, L++;
        }
        B = L - 1;
      }
      return {
        min: Math.floor(C),
        max: Math.ceil(B)
      };
    }), Ft = r(() => {
      if (f.slideEffect === "fade")
        return;
      const d = se.value ? "Y" : "X", h = se.value ? x.y : x.x;
      let C = dt.value + h;
      if (!f.wrapAround && f.preventExcessiveDragging) {
        let B = 0;
        _.value ? B = ae.value.reduce((ne, oe) => ne + oe[z.value], 0) : B = (k.value - Number(f.itemsToShow)) * ue.value;
        const L = le.value ? 0 : -1 * B, W = le.value ? B : 0;
        C = Re({
          val: C,
          min: L,
          max: W
        });
      }
      return `translate${d}(${C}px)`;
    }), Pt = r(() => ({
      "--vc-transition-duration": ke.value ? At(f.transition, "ms") : void 0,
      "--vc-slide-gap": At(f.gap),
      "--vc-carousel-height": At(f.height),
      "--vc-cloned-offset": At(ut.value)
    })), vt = { slideTo: q, next: je, prev: $e }, _t = Ht({
      activeSlide: V,
      config: f,
      currentSlide: g,
      isSliding: ke,
      isVertical: se,
      maxSlide: ie,
      minSlide: re,
      nav: vt,
      normalizedDir: j,
      slideRegistry: t,
      slideSize: v,
      slides: y,
      slidesCount: k,
      viewport: s,
      visibleRange: Se
    });
    da(xe, _t);
    const ft = Ht({
      config: f,
      currentSlide: g,
      maxSlide: ie,
      middleSlide: et,
      minSlide: re,
      slideSize: v,
      slidesCount: k
    });
    return l({
      data: ft,
      nav: vt,
      next: je,
      prev: $e,
      restartCarousel: $t,
      slideTo: q,
      updateBreakpointsConfig: Ie,
      updateSlideSize: K,
      updateSlidesData: Ue
    }), () => {
      var d;
      const h = i.default || i.slides, C = (h == null ? void 0 : h(ft)) || [], { before: B, after: L } = Be.value, W = la({
        slides: y,
        position: "before",
        toShow: B
      }), ne = la({
        slides: y,
        position: "after",
        toShow: L
      }), oe = [...W, ...C, ...ne];
      if (!f.enabled || !oe.length)
        return J("section", {
          ref: D,
          class: ["carousel", "is-disabled"]
        }, oe);
      const Ut = ((d = i.addons) === null || d === void 0 ? void 0 : d.call(i, ft)) || [], ze = J("ol", {
        class: "carousel__track",
        style: { transform: Ft.value },
        onMousedownCapture: f.mouseDrag ? Oe : null,
        onTouchstartPassiveCapture: f.touchDrag ? Oe : null
      }, oe), wt = J("div", { class: "carousel__viewport", ref: s }, ze);
      return J("section", {
        ref: D,
        class: [
          "carousel",
          `is-${j.value}`,
          `is-effect-${f.slideEffect}`,
          {
            "is-vertical": se.value,
            "is-sliding": ke.value,
            "is-dragging": lt.value,
            "is-hover": nt.value
          }
        ],
        dir: j.value,
        style: Pt.value,
        "aria-label": f.i18n.ariaGallery,
        tabindex: "0",
        onFocus: kt,
        onBlur: ve,
        onMouseenter: Nt,
        onMouseleave: Ot
      }, [wt, Ut, J(vn)]);
    };
  }
});
var Jt;
(function(a) {
  a.arrowDown = "arrowDown", a.arrowLeft = "arrowLeft", a.arrowRight = "arrowRight", a.arrowUp = "arrowUp";
})(Jt || (Jt = {}));
const ia = (a) => `icon${a.charAt(0).toUpperCase() + a.slice(1)}`, mn = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function gn(a) {
  return a in Jt;
}
const ra = (a) => a && gn(a), ua = he({
  props: {
    name: {
      type: String,
      required: !0,
      validator: ra
    },
    title: {
      type: String,
      default: (a) => a.name ? G.i18n[ia(a.name)] : ""
    }
  },
  setup(a) {
    const i = yt(xe, null);
    return () => {
      const o = a.name;
      if (!o || !ra(o))
        return;
      const l = mn[o], n = J("path", { d: l }), t = (i == null ? void 0 : i.config.i18n[ia(o)]) || a.title, y = J("title", t);
      return J("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": t
      }, [y, n]);
    };
  }
}), yn = he({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(a, { slots: i, attrs: o }) {
    const l = yt(xe);
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
      const { i18n: v } = l.config, I = J("button", Object.assign(Object.assign({ type: "button", disabled: D.value, "aria-label": v.ariaPreviousSlide, title: v.ariaPreviousSlide, onClick: l.nav.prev }, o), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": D.value },
        o.class
      ] }), (t == null ? void 0 : t()) || J(ua, { name: y() })), f = J("button", Object.assign(Object.assign({ type: "button", disabled: s.value, "aria-label": v.ariaNextSlide, title: v.ariaNextSlide, onClick: l.nav.next }, o), { class: [
        "carousel__next",
        { "carousel__next--disabled": s.value },
        o.class
      ] }), (n == null ? void 0 : n()) || J(ua, { name: k() }));
      return [I, f];
    };
  }
}), bn = he({
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
    const i = yt(xe);
    if (!i)
      return () => "";
    const o = r(() => i.config.itemsToShow), l = r(() => Wt({
      align: i.config.snapAlign,
      itemsToShow: o.value
    })), n = r(() => a.paginateByItemsToShow && o.value > 1), t = r(() => Math.ceil((i.activeSlide - l.value) / o.value)), y = r(() => Math.ceil(i.slidesCount / o.value)), k = (D) => ka(n.value ? {
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
      for (let I = n.value ? 0 : i.minSlide; I <= (n.value ? y.value - 1 : i.maxSlide); I++) {
        const f = ha(i.config.i18n[n.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: I + 1
        }), g = k(I), V = J("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": g
          },
          "aria-label": f,
          "aria-pressed": g,
          "aria-controls": (s = (D = i.slides[I]) === null || D === void 0 ? void 0 : D.exposed) === null || s === void 0 ? void 0 : s.id,
          title: f,
          disabled: a.disableOnClick,
          onClick: () => i.nav.slideTo(n.value ? Math.floor(I * +i.config.itemsToShow + l.value) : I)
        }), A = J("li", { class: "carousel__pagination-item", key: I }, V);
        v.push(A);
      }
      return J("ol", { class: "carousel__pagination" }, v);
    };
  }
}), sa = he({
  name: "CarouselSlide",
  props: {
    id: {
      type: String,
      default: (a) => a.isClone ? void 0 : Fa()
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
    const n = yt(xe);
    if (da(xe, void 0), !n)
      return () => "";
    const t = E(a.index), y = (V) => {
      t.value = V;
    }, k = Pa(), D = () => {
      const V = k.vnode.el;
      return V ? V.getBoundingClientRect() : { width: 0, height: 0 };
    };
    l({
      id: a.id,
      setIndex: y,
      getBoundingRect: D
    });
    const s = r(() => t.value === n.activeSlide), v = r(() => t.value === n.activeSlide - 1), I = r(() => t.value === n.activeSlide + 1), f = r(() => t.value >= n.visibleRange.min && t.value <= n.visibleRange.max), g = r(() => {
      if (n.config.itemsToShow === "auto")
        return;
      const V = n.config.itemsToShow, A = n.config.gap > 0 && V > 1 ? `calc(${100 / V}% - ${n.config.gap * (V - 1) / V}px)` : `${100 / V}%`;
      return n.isVertical ? { height: A } : { width: A };
    });
    return n.slideRegistry.registerSlide(k, a.index), _a(() => {
      n.slideRegistry.unregisterSlide(k);
    }), a.isClone && (Zt(() => {
      oa(k.vnode);
    }), Ua(() => {
      oa(k.vnode);
    })), () => {
      var V, A;
      return n.config.enabled ? J("li", {
        style: [i.style, Object.assign({}, g.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": a.isClone,
          "carousel__slide--visible": f.value,
          "carousel__slide--active": s.value,
          "carousel__slide--prev": v.value,
          "carousel__slide--next": I.value,
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
        isNext: I.value,
        isSliding: n.isSliding,
        isVisible: f.value
      })) : (V = o.default) === null || V === void 0 ? void 0 : V.call(o);
    };
  }
}), hn = (a, i, o, l) => {
  var y, k, D, s, v;
  if (!o) return 0;
  let n, t;
  if (o.type === Me.Field ? [Ke.Number, Ke.Range].includes((y = o.field) == null ? void 0 : y.type) ? (n = parseFloat(a[o.key]), t = parseFloat(i[o.key])) : [Ke.Date, Ke.Date].includes((k = o.field) == null ? void 0 : k.type) ? (n = a[o.key], t = i[o.key]) : ((D = o.field) == null ? void 0 : D.type) === Ke.Select && ((s = o.field) != null && s.multiple) && ((v = o.field) == null ? void 0 : v.multipleDisplay) === qa.Count ? (n = a[o.key].length, t = i[o.key].length) : (n = String(a[o.key]).toLowerCase(), t = String(i[o.key]).toLowerCase()) : (n = String(a[o.key]).toLowerCase(), t = String(i[o.key]).toLowerCase()), l === Ze.Asc) {
    if (n > t) return 1;
    if (t > n) return -1;
  } else {
    if (n > t) return -1;
    if (t > n) return 1;
  }
  return 0;
}, We = (a, i, o, l = []) => {
  if (a.extractTitleFromColumn) {
    let t = l.find((y) => y.key === a.extractTitleFromColumn);
    if (t)
      return We(t, i, o, l);
  }
  let n = a.type === Me.ColumnIndex ? o : i[a.key];
  if (a.formatter && typeof a.formatter == "function") {
    let t = a.formatter(n, i, a, o);
    return typeof t == "string" && t.startsWith("__:") ? Ha(t.substring(3)) : t;
  }
  return n;
}, kn = (a, i, o) => {
  if (!a.colspan) return -1;
  let l = i;
  return o.forEach((n) => {
    let t = xt(a, n);
    t > 0 && t < l && (l = t);
  }), l;
}, xt = (a, i) => a.colspan === !1 ? !1 : typeof a.colspan == "function" ? a.colspan(i) : a.colspan, Sa = (a, i) => typeof a.preferSlot > "u" ? !0 : a.preferSlot === !1 ? !1 : typeof a.preferSlot == "function" ? a.preferSlot(i) : !0, Sn = (a, i, o) => {
  if (typeof a != "object" || !a.key && [Me.Field].includes(a.type) || i.indexOf(a.key) > -1) return !1;
  let l = xt(a, o);
  return typeof a.colspan > "u" ? !0 : (typeof a.colspan < "u" && (typeof a.colspan == "function" ? l = parseInt(a.colspan(o)) : l = parseInt(a.colspan)), l > 0);
}, Cn = (a = []) => {
  if (a.length > 0) {
    for (let i = 0; i < a.length; ++i)
      if (a[i].sortable) return a[i].key;
  }
  return "";
}, wn = (a, i) => {
  if (a.length > 0) {
    for (let o = 0; o < a.length; ++o)
      if (a[o].key === i) return a[o];
  }
  return null;
}, Ca = (a) => {
  let i = [];
  return a.class && i.push(a.class), a.type && i.push(`is-${a.type}`), i.join(" ");
}, Qt = /* @__PURE__ */ he({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new fa() },
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
    const o = i, l = a, n = E(l.modelValue);
    U(() => l.modelValue, (v) => {
      n.value = v;
    }), U(n, (v) => {
      o("update:modelValue", v);
    });
    const t = () => {
      o("inline-drop");
    }, y = r(() => ({ ...l.column.slotData, item: n.value })), k = r(() => {
      var v, I, f, g;
      if ((v = l.column.field) != null && v.modalData && typeof ((I = l.column.field) == null ? void 0 : I.modalData) == "object")
        for (let V in l.column.field.modalData)
          if (typeof ((f = l.column.field) == null ? void 0 : f.modalData[V]) == "string" && l.column.field.modalData[V].startsWith("prop:")) {
            let A = l.column.field.modalData[V].substring(5);
            n.value[A];
          } else
            l.column.field.modalData[V];
      return (g = l.column.field) == null ? void 0 : g.modalData;
    }), D = r(() => typeof l.column.field == "string" && l.column.field.startsWith("prop:") ? Xa(l.column.field, n.value) : l.column.field), s = r(() => {
      var v, I, f, g;
      return l.column.type === Me.Field ? !((I = (v = l.column) == null ? void 0 : v.field) != null && I.label) && (l.column.ensureFieldLabel || [
        Ke.Switch,
        Ke.Check
      ].includes((f = l.column.field) == null ? void 0 : f.type)) ? l.column.label : (g = l.column.field) == null ? void 0 : g.label : "";
    });
    return (v, I) => {
      const f = ye("lkt-anchor"), g = ye("lkt-button"), V = ye("lkt-field");
      return v.column.type === b(Me).Anchor ? (p(), O(f, Y({ key: 0 }, v.column.anchor, { prop: n.value }), {
        default: P(() => [
          Je(Qe(b(We)(v.column, n.value, v.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : v.column.type === b(Me).Button ? (p(), O(g, Y({ key: 1 }, v.column.button, { prop: n.value }), {
        default: P(() => [
          Je(Qe(b(We)(v.column, n.value, v.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : v.column.type === b(Me).Field ? (p(), O(V, Y({
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
      }), null, 16, ["modelValue"])) : v.column.type === b(Me).InlineDrop ? (p(), O(g, Y({ key: 3 }, v.column.button, {
        prop: n.value,
        onClick: t
      }), {
        default: P(() => [
          Je(Qe(b(We)(v.column, n.value, v.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : v.column.type === b(Me).ColumnIndex && v.column.field ? (p(), O(V, fe(Y({ key: 4 }, {
        ...D.value,
        modelValue: b(We)(v.column, n.value, v.i, v.columns),
        readMode: !0,
        slotData: y.value,
        label: s.value,
        modalData: k.value,
        prop: n.value
      })), null, 16)) : (p(), w(H, { key: 5 }, [
        Je(Qe(b(We)(v.column, n.value, v.i, v.columns)), 1)
      ], 64));
    };
  }
}), gt = class gt {
};
gt.navButtonSlot = "", gt.createButtonSlot = "", gt.defaultEmptySlot = void 0;
let be = gt;
const Dn = ["data-i", "data-draggable"], In = ["data-role", "data-i"], Tn = {
  key: 1,
  class: "lkt-table-nav-cell"
}, Bn = { class: "lkt-table-nav-container" }, En = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, An = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, Vn = ["colspan"], Rn = ["colspan"], Ln = ["colspan"], Mn = ["data-column", "colspan", "title"], Nn = /* @__PURE__ */ he({
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
    rowDisplayType: { type: [Number, Function], default: De.Auto },
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
    const o = ca(), l = i, n = a, t = E(n.modelValue);
    let y = typeof n.rowDisplayType == "function" ? n.rowDisplayType(t.value, n.i) : n.rowDisplayType;
    y || (y = De.Auto);
    const k = [De.Auto, De.PreferCustomItem].includes(y), D = [De.Auto, De.PreferItem].includes(y), s = (c) => l("click", c), v = r(() => {
      let c = [], T = typeof n.disabledDrag == "function" ? n.disabledDrag(t.value) : ie.value === !0;
      return !T && n.sortable && n.isDraggable ? c.push("handle") : T && c.push("disabled"), c.join(" ");
    }), I = r(() => be.navButtonSlot !== ""), f = r(() => be.navButtonSlot), g = () => {
      l("item-up", n.i);
    }, V = () => {
      l("item-down", n.i);
    }, A = () => {
      l("item-drop", n.i);
    };
    U(() => n.modelValue, (c) => t.value = c), U(t, (c) => {
      l("update:modelValue", c);
    }, { deep: !0 });
    const et = r(() => typeof n.renderDrag == "function" ? n.renderDrag(t.value) : n.renderDrag === !0), ie = r(() => typeof n.disabledDrag == "function" ? n.disabledDrag(t.value) : n.disabledDrag === !0), re = r(() => v.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), te = r(() => {
      let c = [];
      return k && c.push("type-custom-item"), D && c.push("type-item"), typeof n.itemContainerClass == "function" ? c.push(n.itemContainerClass(t.value, n.i)) : n.itemContainerClass !== "" && c.push(n.itemContainerClass), c.join(" ");
    });
    return (c, T) => {
      const ue = ye("lkt-button");
      return p(), w("tr", {
        "data-i": c.i,
        "data-draggable": c.isDraggable,
        class: Z(te.value)
      }, [
        c.sortable && c.editModeEnabled && et.value ? (p(), w("td", {
          key: 0,
          "data-role": re.value,
          class: Z(v.value),
          "data-i": c.i
        }, T[2] || (T[2] = [
          me("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]), 10, In)) : R("", !0),
        c.addNavigation && c.editModeEnabled ? (p(), w("td", Tn, [
          me("div", Bn, [
            pe(ue, {
              palette: "table-nav",
              disabled: c.i === 0,
              onClick: g
            }, {
              default: P(() => [
                I.value ? (p(), O(ge(f.value), {
                  key: 0,
                  direction: "up"
                })) : (p(), w("i", En))
              ]),
              _: 1
            }, 8, ["disabled"]),
            pe(ue, {
              palette: "table-nav",
              disabled: c.latestRow,
              onClick: V
            }, {
              default: P(() => [
                I.value ? (p(), O(ge(f.value), {
                  key: 0,
                  direction: "down"
                })) : (p(), w("i", An))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : R("", !0),
        c.itemSlotComponent ? (p(), w("td", {
          key: "td" + c.i,
          colspan: c.visibleColumns.length
        }, [
          (p(), O(ge(c.itemSlotComponent), fe(va({
            item: t.value,
            index: c.i,
            editing: c.editModeEnabled,
            perms: c.permissions,
            data: c.itemSlotData,
            events: c.itemSlotEvents
          })), null, 16))
        ], 8, Vn)) : b(k) && b(o)[`item-${c.i}`] ? (p(), w("td", {
          key: "td" + c.i,
          colspan: c.visibleColumns.length
        }, [
          $(c.$slots, `item-${c.i}`, {
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
        ], 8, Rn)) : b(D) && b(o).item ? (p(), w("td", {
          key: "td" + c.i,
          colspan: c.visibleColumns.length
        }, [
          $(c.$slots, "item", {
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
        ], 8, Ln)) : (p(!0), w(H, { key: 5 }, we(c.visibleColumns, (j) => (p(), w(H, null, [
          b(Sn)(j, c.emptyColumns, t.value) ? (p(), w("td", {
            key: "td" + c.i,
            "data-column": j.key,
            colspan: b(xt)(j, t.value),
            title: b(We)(j, t.value, c.i, c.visibleColumns),
            class: Z(b(Ca)(j)),
            onClick: T[1] || (T[1] = (le) => s(le))
          }, [
            c.$slots[j.key] && b(Sa)(j, t.value) ? $(c.$slots, j.key, {
              key: 0,
              value: t.value[j.key],
              item: t.value,
              column: j,
              i: c.i
            }) : t.value ? (p(), O(Qt, {
              key: 1,
              modelValue: t.value,
              "onUpdate:modelValue": T[0] || (T[0] = (le) => t.value = le),
              column: j,
              columns: c.visibleColumns,
              "edit-mode-enabled": c.editModeEnabled,
              "has-inline-edit-perm": c.hasInlineEditPerm,
              i: c.i,
              onInlineDrop: A
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : R("", !0)
          ], 10, Mn)) : R("", !0)
        ], 64))), 256))
      ], 10, Dn);
    };
  }
}), Yt = /* @__PURE__ */ he({
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
    const o = i, l = a, n = r(() => be.createButtonSlot !== ""), t = r(() => be.createButtonSlot), y = {
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
      const f = ye("lkt-button");
      return p(), O(f, Y(k, {
        disabled: v.disabled,
        onClick: D
      }), {
        default: P(() => [
          n.value ? (p(), O(ge(t.value), { key: 0 })) : R("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), On = ["data-column", "data-sortable", "data-sort", "colspan", "title"], $n = /* @__PURE__ */ he({
  __name: "TableHeader",
  props: {
    column: { default: () => new fa() },
    sortBy: { default: "" },
    sortDirection: { default: "" },
    amountOfColumns: { default: 0 },
    items: { default: () => [] }
  },
  emits: [
    "click"
  ],
  setup(a, { emit: i }) {
    const o = i, l = a, n = r(() => kn(l.column, l.amountOfColumns, l.items)), t = r(() => l.column.sortable === !0), y = r(() => t.value && l.sortBy === l.column.key ? l.sortDirection : ""), k = r(() => pa(l.column.label)), D = r(() => t.value && l.sortBy === l.column.key ? l.sortDirection === Ze.Asc ? Le.defaultTableSortAscIcon : l.sortDirection === Ze.Desc ? Le.defaultTableSortDescIcon : "" : ""), s = () => o("click", l.column);
    return (v, I) => (p(), w("th", {
      "data-column": v.column.key,
      "data-sortable": t.value,
      "data-sort": y.value,
      colspan: n.value,
      title: k.value,
      class: Z(b(Ca)(v.column)),
      onClick: s
    }, [
      me("div", null, [
        Je(Qe(k.value) + " ", 1),
        D.value ? (p(), w("i", {
          key: 0,
          class: Z(D.value)
        }, null, 2)) : R("", !0)
      ])
    ], 10, On));
  }
}), Fn = ["id"], Pn = { class: "lkt-table-page-buttons" }, _n = { class: "switch-edition-mode" }, Un = { class: "switch-edition-mode" }, jn = {
  key: 0,
  class: "lkt-table-page-buttons"
}, zn = {
  key: 1,
  class: "lkt-table-page-filters"
}, Gn = { class: "lkt-table" }, Hn = { key: 0 }, qn = { key: 0 }, Xn = {
  key: 0,
  "data-role": "drag-indicator"
}, Yn = { key: 1 }, Kn = ["id"], Wn = ["id"], Jn = ["data-i"], Qn = ["id"], Zn = ["data-i"], xn = ["id"], el = { class: "lkt-carousel-slide" }, tl = { class: "lkt-carousel-slide" }, al = ["id"], nl = {
  key: 2,
  class: "lkt-table-empty"
}, ll = {
  key: 4,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, ol = /* @__PURE__ */ he({
  __name: "LktTable",
  props: /* @__PURE__ */ za({
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
  }, Ya(Ka)),
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
    var ta, aa;
    const l = o, n = ca(), t = a, y = E(typeof t.sorter == "function" ? t.sorter : hn), k = E(Cn(t.columns)), D = E(Ze.Asc), s = E(t.modelValue), v = E(null), I = E(t.columns), f = E((ta = t.paginator) == null ? void 0 : ta.modelValue), g = E(t.loading), V = E(!1), A = E(t.perms), et = E(null), ie = E(null), re = E(null), te = E({}), c = E(new Qa({ items: s.value }, t.dataStateConfig)), T = E(t.editMode), ue = E(0), j = E(null), le = E(t.type), se = E(((aa = t.carousel) == null ? void 0 : aa.currentSlide) || 0), _ = E(Ye(t.saveButton, Le.defaultSaveButton)), z = E(Ye(t.createButton, Le.defaultCreateButton)), Ie = E(Ye(t.editModeButton, Le.defaultEditModeButton)), Rt = E(Ye(t.groupButton, Le.defaultGroupButton));
    U(() => t.saveButton, (e) => _.value = Ye(t.saveButton, Le.defaultSaveButton)), U(() => t.createButton, (e) => z.value = Ye(t.createButton, Le.defaultCreateButton)), U(() => t.editModeButton, (e) => Ie.value = Ye(t.editModeButton, Le.defaultEditModeButton));
    const de = E(!1);
    U(g, (e) => l("update:loading", e)), U(f, (e) => l("page", e));
    const ae = (e) => {
      A.value = e;
    }, Lt = (e) => {
      var u;
      if (Array.isArray(e.data)) {
        let M = e.data;
        typeof ((u = t.events) == null ? void 0 : u.parseResults) == "function" && (M = t.events.parseResults(M)), s.value = [...s.value, ...M];
      }
      g.value = !1, V.value = !0, c.value.store({ items: s.value }).turnStoredIntoOriginal(), de.value = !1, Bt(() => {
        x.value, l("read-response", e);
      });
    }, _e = () => Bt(() => {
      var e;
      (!t.paginator || ![Et.LoadMore, Et.Infinite].includes((e = t.paginator) == null ? void 0 : e.type)) && s.value.splice(0, s.value.length), g.value = !0;
    }), Mt = () => {
      et.value.doRefresh();
    }, K = Wa(12), Ue = r(() => {
      if (!t.hideEmptyColumns) return [];
      let e = [];
      return I.value.forEach((u) => {
        let M = u.key, F = !1;
        s.value.forEach((Q) => {
          if (typeof Q.checkEmpty == "function")
            return Q.checkEmpty(Q);
          Q[M] && (F = !0);
        }), F || e.push(M);
      }), e;
    }), Te = r(() => I.value.filter((e) => !e.hidden)), Ne = r(() => I.value.filter((e) => e.isForRowKey)), bt = r(() => I.value.map((e) => e.key)), ht = r(() => {
      let e = [];
      for (let u in n) bt.value.indexOf(u) !== -1 && e.push(u);
      return e;
    }), tt = r(() => {
      let e = [];
      for (let u in n) u.indexOf("slide-") !== -1 && e.push(u);
      return e;
    }), ce = r(() => {
      var e;
      return t.hiddenSave || g.value || !((e = _.value) != null && e.resource || _.value.type) ? !1 : T.value && de.value ? !0 : T.value;
    }), at = r(() => pt.value && s.value.length >= t.requiredItemsForTopCreate || $e.value ? !0 : ce.value || T.value && ve.value), x = r(() => {
      var e, u;
      return ue.value, typeof ((e = _.value) == null ? void 0 : e.disabled) == "function" ? _.value.disabled({
        value: s.value,
        dataState: c.value
      }) : typeof ((u = _.value) == null ? void 0 : u.disabled) == "boolean" ? _.value.disabled : !de.value;
    }), nt = r(() => s.value.length), lt = r(() => {
      var e;
      return {
        items: s.value,
        ...(e = _.value) == null ? void 0 : e.resourceData
      };
    }), Nt = r(() => t.titleTag === "" ? "h2" : t.titleTag), Ot = r(() => t.wrapContentTag === "" ? "div" : t.wrapContentTag), ot = r(() => pa(t.title)), kt = r(() => {
      var e;
      return (e = t.drag) == null ? void 0 : e.enabled;
    }), ve = r(() => A.value.includes(Ae.Create)), Oe = r(() => A.value.includes("read")), ee = r(() => A.value.includes(Ae.Update)), St = r(() => A.value.includes(Ae.Edit)), it = r(() => A.value.includes(Ae.InlineEdit)), Ct = r(() => A.value.includes(Ae.ModalCreate)), rt = r(() => A.value.includes(Ae.InlineCreate)), ke = r(() => A.value.includes(Ae.InlineCreateEver)), q = r(() => A.value.includes(Ae.Drop)), je = r(() => A.value.includes(Ae.SwitchEditMode)), $e = r(() => !je.value || !ee.value && !q.value || !ee.value && q.value ? !1 : !g.value), $t = r(() => {
      var e;
      return (typeof ((e = t.paginator) == null ? void 0 : e.type) < "u" && [Et.LoadMore, Et.Infinite].includes(t.paginator.type) || !g.value) && s.value.length > 0;
    }), Fe = r(() => I.value.find((e) => e.isForAccordionHeader)), Be = r(() => I.value.find((e) => e.isCalendarDate)), ut = r(() => I.value.find((e) => e.isCalendarGroup)), st = (e, u) => typeof t.customItemSlotName == "function" ? t.customItemSlotName(e, u) : "", dt = (e) => {
      let u = e.target;
      if (typeof u.dataset.column > "u")
        do
          u = u.parentNode;
        while (typeof u.dataset.column > "u" && u.tagName !== "TABLE" && u.tagName !== "body");
      if (u.tagName === "TD" && (u = u.parentNode, u = u.dataset.i, typeof u < "u"))
        return s.value[u];
    }, Se = () => {
      ue.value = en();
    }, Ft = (e) => s.value[e], Pt = (e) => {
      var u;
      return (u = v.value) == null ? void 0 : u.querySelector(`[data-i="${e}"]`);
    }, vt = (e) => {
      e && e.sortable && (e.key === k.value && (D.value = D.value === Ze.Asc ? Ze.Desc : Ze.Asc), k.value = e.key, s.value = s.value.sort((u, M) => y.value(u, M, e, D.value)), Se(), l("sort", {
        sortBy: k.value,
        sortDirection: D.value
      }));
    }, _t = (e) => {
      l("click", e);
    }, ft = (e) => {
      var M, F, Q, X, He, Pe, Ee, S;
      let u = parseInt((X = (Q = (F = (M = e == null ? void 0 : e.originalEvent) == null ? void 0 : M.toElement) == null ? void 0 : F.closest("tr")) == null ? void 0 : Q.dataset) == null ? void 0 : X.i);
      return !(typeof ((He = t.drag) == null ? void 0 : He.isValid) == "function" && !((Pe = t.drag) != null && Pe.isValid(s.value[u])) || typeof ((Ee = t.drag) == null ? void 0 : Ee.isValid) == "boolean" && !((S = t.drag) != null && S.isValid));
    }, d = (e) => {
      var u, M;
      return typeof ((u = t.drag) == null ? void 0 : u.isDraggable) == "function" ? (M = t.drag) == null ? void 0 : M.isDraggable(e) : !0;
    }, h = () => {
      if (ve.value) {
        l("click-create");
        return;
      }
      if (rt.value || ke.value) {
        if (typeof t.newValueGenerator == "function") {
          let e = t.newValueGenerator();
          if (typeof e == "object" || Ce.value !== Ve.Table) {
            s.value.push(e);
            return;
          }
        }
        s.value.push({});
      } else
        l("click-create");
    }, C = (e) => {
      s.value.push(e);
    }, B = () => g.value = !0, L = () => g.value = !1, W = (e, u) => {
      var M, F, Q;
      if (!((M = _.value) != null && M.type && [
        qt.Split,
        qt.SplitEver,
        qt.SplitLazy
      ].includes((F = _.value) == null ? void 0 : F.type))) {
        if (l("before-save"), (Q = _.value) != null && Q.resource && (g.value = !1, !u.success)) {
          l("error", u.httpStatus);
          return;
        }
        c.value.turnStoredIntoOriginal(), de.value = !1, l("save", u);
      }
    }, ne = (e, u, M) => {
      if (M >= e.length) {
        let F = M - e.length + 1;
        for (; F--; ) e.push(void 0);
      }
      return e.splice(M, 0, e.splice(u, 1)[0]), e;
    }, oe = (e) => {
      ne(s.value, e, e - 1), Se();
    }, Ut = (e) => {
      ne(s.value, e, e + 1), Se();
    }, ze = (e) => {
      s.value.splice(e, 1), Se();
    }, wt = () => {
      var e;
      te.value && typeof ((e = te.value) == null ? void 0 : e.destroy) == "function" && (te.value.destroy(), te.value = {});
    }, jt = () => {
      j.value || (j.value = document.getElementById("lkt-table-body-" + K)), te.value = new Za(j.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let u = e.oldIndex, M = e.newIndex;
          s.value.splice(M, 0, s.value.splice(u, 1)[0]), Se(), l("drag-end", s.value[M]);
        },
        onMove: function(e, u) {
          return ft(e);
        }
      });
    }, Dt = (e, u, M = !1) => {
      let F = [ue.value, K, "row", u];
      return M && F.push("hidden"), Ne.value.forEach((Q) => {
        let X = String(e[Q.key]).toLowerCase();
        X.length > 50 && (X = X.substring(0, 50)), X = Ja(X, " ", "-"), F.push(X);
      }), F.join("-");
    }, zt = r(() => typeof t.createEnabledValidator == "function" ? t.createEnabledValidator({ items: s.value }) : !0), pt = r(() => t.createButton === !1 ? !1 : ke.value || ve.value && T.value || rt.value && T.value || Ct.value && T.value), wa = r(() => [Ve.Ol, Ve.Ul].includes(Ce.value)), mt = (e, u) => typeof t.itemDisplayChecker == "function" ? t.itemDisplayChecker(e, u) : !0, It = (e, u) => typeof t.itemContainerClass == "function" ? t.itemContainerClass(e, u) : t.itemContainerClass, Da = (e, u) => Fe.value ? e[Fe.value.key] : "", Ge = r(() => typeof t.itemSlotComponent == "function" ? t.itemSlotComponent() : t.itemSlotComponent), Tt = r(() => typeof t.itemSlotData == "function" ? t.itemSlotData() : t.itemSlotData);
    Zt(() => {
      var e;
      t.initialSorting && vt(wn(t.columns, k.value)), c.value.store({ items: s.value }).turnStoredIntoOriginal(), de.value = !1, (e = t.drag) != null && e.enabled && Bt(() => {
        jt();
      });
    }), U(() => {
      var e;
      return (e = t.drag) == null ? void 0 : e.enabled;
    }, (e) => {
      e ? jt() : wt();
    }), U(() => t.type, (e) => {
      var u;
      (u = t.drag) != null && u.enabled ? jt() : wt();
    }), U(() => t.perms, (e) => A.value = e), U(A, (e) => l("update:perms", e)), U(T, (e) => {
      l("update:editMode", e);
    }), U(() => t.editMode, (e) => T.value = e), U(() => t.columns, (e) => I.value = e, { deep: !0 }), U(() => t.modelValue, (e) => {
      s.value = e;
    }, { deep: !0 }), U(s, (e) => {
      c.value.increment({ items: e }), de.value = c.value.changed(), l("update:modelValue", e);
    }, { deep: !0 }), i({
      getItemByEvent: dt,
      getItemByIndex: Ft,
      getRowByIndex: Pt,
      doRefresh: Mt,
      doRemoveIndex: (e) => {
        s.value.splice(e, 1), Se();
      },
      getHtml: () => ie.value,
      reRender: Se,
      turnStoredIntoOriginal: () => {
        c.value.turnStoredIntoOriginal(), Bt(() => {
          Se();
        });
      }
    });
    const Ia = r(() => typeof be.defaultEmptySlot < "u"), Ta = r(() => be.defaultEmptySlot), Ba = r(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled ? !1 : typeof t.drag.canRender > "u" ? !0 : t.drag.canRender), Ea = r(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled || typeof t.drag.isDisabled > "u" ? !1 : t.drag.isDisabled), Aa = r(() => typeof t.header == "object" && Object.keys(t.header).length > 0), Ce = r(() => Array.isArray(t.switchableTypes) && t.switchableTypes.length > 0 ? le.value : t.type), Va = r(() => Array.isArray(t.switchableTypes) ? t.switchableTypes.length > 0 ? t.switchableTypes.includes(t.type) ? t.switchableTypes : [
      t.type,
      ...t.switchableTypes
    ] : [] : []), Ra = r(() => {
      let e = [];
      return Va.value.forEach((u) => {
        let M = t.switchableTypesButtons[u];
        e.push({
          ...M,
          class: [M.class, u === Ce.value ? "is-current" : ""].join(" "),
          events: {
            click: (F) => {
              le.value = u, typeof t.switchableTypesButtons[u] == "function" && t.switchableTypesButtons[u](F);
            }
          }
        });
      }), e;
    }), La = r(() => {
      var e, u;
      return {
        ...t.header,
        topEndButtons: [
          ...typeof ((e = t.header) == null ? void 0 : e.topEndButtons) > "u" ? [] : (u = t.header) == null ? void 0 : u.topEndButtons,
          ...Ra.value
        ]
      };
    }), ea = (e, u) => typeof t.useItemSlot == "function" ? t.useItemSlot({ item: e, index: u }) === !0 : t.useItemSlot, Ma = r(() => {
      if (Ce.value !== Ve.Calendar || !Be.value || typeof Be.value > "u") return [];
      let e = [], u = [];
      return s.value.forEach((M) => {
        var S;
        let F = M[Be.value.key], Q = xa("Y-m-d H:i:s", F), X;
        (S = ut.value) != null && S.key && (X = M[ut.value.key]);
        let He = {};
        X && t.calendarGroups && typeof t.calendarGroups[X] == "object" && (He = t.calendarGroups[X]);
        const Pe = [Q, X].join("-");
        let Ee = -1;
        u.includes(Pe) ? Ee = u.findIndex((m) => m === Pe) : (Ee = u.length, u.push(Pe), e.push({
          date: F,
          data: {
            items: []
          },
          dot: {
            ...He,
            class: `lkt-calendar-group--${X}`
          }
        })), e[Ee].data.items.push(M);
      }), e;
    }), Na = {
      dayPicked: (e) => {
        var u;
        typeof ((u = t.calendar.events) == null ? void 0 : u.dayPicked) == "function" && t.calendar.events.dayPicked(e);
      },
      visibleMonthChanged: (e) => {
        var u;
        typeof ((u = t.calendar.events) == null ? void 0 : u.visibleMonthChanged) == "function" && t.calendar.events.visibleMonthChanged(e);
      }
    };
    return (e, u) => {
      const M = ye("lkt-header"), F = ye("lkt-button"), Q = ye("lkt-accordion"), X = ye("lkt-calendar"), He = ye("lkt-loader"), Pe = ye("lkt-paginator");
      return p(), w("section", {
        ref_key: "element",
        ref: ie,
        class: "lkt-table-page",
        id: "lkt-table-page-" + b(K)
      }, [
        Aa.value ? (p(), O(M, fe(Y({ key: 0 }, La.value)), null, 16)) : ot.value || b(n).title ? (p(), w("header", {
          key: 1,
          class: Z(e.headerClass)
        }, [
          ot.value ? (p(), O(ge(Nt.value), { key: 0 }, {
            default: P(() => [
              e.titleIcon ? (p(), w("i", {
                key: 0,
                class: Z(e.titleIcon)
              }, null, 2)) : R("", !0),
              Je(" " + Qe(ot.value), 1)
            ]),
            _: 1
          })) : R("", !0),
          b(n).title ? $(e.$slots, "title", { key: 1 }) : R("", !0)
        ], 2)) : R("", !0),
        (p(), O(ge(Ot.value), {
          class: Z(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: P(() => {
            var Ee;
            return [
              qe(me("div", Pn, [
                e.groupButton !== !1 ? (p(), O(F, Y({
                  key: 0,
                  ref: "groupButton"
                }, Rt.value, { class: "lkt-item-crud-group-button" }), {
                  split: P(() => [
                    me("div", _n, [
                      qe(pe(F, Y(Ie.value, {
                        checked: T.value,
                        "onUpdate:checked": u[0] || (u[0] = (S) => T.value = S)
                      }), null, 16, ["checked"]), [
                        [Xe, $e.value]
                      ])
                    ]),
                    b(n)["prev-buttons-ever"] ? $(e.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: ee.value,
                      canDrop: q.value,
                      perms: e.perms
                    }) : R("", !0),
                    b(n)["prev-buttons"] ? $(e.$slots, "prev-buttons", {
                      key: 1,
                      canUpdate: ee.value,
                      canDrop: q.value,
                      perms: e.perms
                    }) : R("", !0),
                    qe(pe(F, Y({
                      class: "lkt-table--save-button",
                      ref_key: "saveButtonRef",
                      ref: re
                    }, {
                      ..._.value,
                      disabled: x.value,
                      resourceData: lt.value
                    }, {
                      onLoading: B,
                      onLoaded: L,
                      onClick: W
                    }), {
                      split: P(({ doClose: S, doRootClick: m }) => [
                        $(e.$slots, "button-save-split", {
                          doClose: S,
                          doRootClick: m,
                          dataState: c.value,
                          onButtonLoading: B,
                          onButtonLoaded: L
                        })
                      ]),
                      default: P(() => [
                        b(n)["button-save"] ? $(e.$slots, "button-save", {
                          key: 0,
                          items: s.value,
                          editMode: e.editMode,
                          canUpdate: !x.value
                        }) : R("", !0)
                      ]),
                      _: 3
                    }, 16), [
                      [Xe, ce.value]
                    ]),
                    pt.value && s.value.length >= e.requiredItemsForTopCreate ? (p(), O(Yt, {
                      key: 2,
                      config: z.value,
                      disabled: !zt.value,
                      onClick: h,
                      onAppend: C
                    }, null, 8, ["config", "disabled"])) : R("", !0)
                  ]),
                  _: 3
                }, 16)) : R("", !0),
                b(n)["prev-buttons-ever"] ? $(e.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: ee.value,
                  canDrop: q.value,
                  perms: e.perms
                }) : R("", !0),
                b(n)["prev-buttons"] ? $(e.$slots, "prev-buttons", {
                  key: 2,
                  canUpdate: ee.value,
                  canDrop: q.value,
                  perms: e.perms
                }) : R("", !0),
                qe(pe(F, Y({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: re
                }, {
                  ..._.value,
                  disabled: x.value,
                  resourceData: lt.value
                }, {
                  onLoading: B,
                  onLoaded: L,
                  onClick: W
                }), {
                  split: P(({ doClose: S, doRootClick: m }) => [
                    $(e.$slots, "button-save-split", {
                      doClose: S,
                      doRootClick: m,
                      dataState: c.value,
                      onButtonLoading: B,
                      onButtonLoaded: L
                    })
                  ]),
                  default: P(() => [
                    b(n)["button-save"] ? $(e.$slots, "button-save", {
                      key: 0,
                      items: s.value,
                      editMode: e.editMode,
                      canUpdate: !x.value
                    }) : R("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [Xe, ce.value]
                ]),
                pt.value && s.value.length >= e.requiredItemsForTopCreate ? (p(), O(Yt, {
                  key: 3,
                  config: z.value,
                  disabled: !zt.value,
                  onClick: h,
                  onAppend: C
                }, null, 8, ["config", "disabled"])) : R("", !0),
                me("div", Un, [
                  qe(pe(F, Y(Ie.value, {
                    checked: T.value,
                    "onUpdate:checked": u[1] || (u[1] = (S) => T.value = S)
                  }), null, 16, ["checked"]), [
                    [Xe, $e.value]
                  ])
                ])
              ], 512), [
                [Xe, at.value]
              ]),
              b(n).buttons ? (p(), w("div", jn, [
                $(e.$slots, "buttons")
              ])) : R("", !0),
              V.value && b(n).filters ? (p(), w("div", zn, [
                $(e.$slots, "filters", {
                  items: s.value,
                  isLoading: g.value
                })
              ])) : R("", !0),
              qe(me("div", Gn, [
                Ce.value === b(Ve).Table ? (p(), w("table", Hn, [
                  e.hideTableHeader ? R("", !0) : (p(), w("thead", qn, [
                    me("tr", null, [
                      kt.value && T.value ? (p(), w("th", Xn)) : R("", !0),
                      e.addNavigation && T.value ? (p(), w("th", Yn)) : R("", !0),
                      (p(!0), w(H, null, we(Te.value, (S) => (p(), w(H, null, [
                        Ue.value.indexOf(S.key) === -1 ? (p(), O($n, {
                          key: 0,
                          column: S,
                          "sort-by": k.value,
                          "sort-direction": D.value,
                          "amount-of-columns": e.columns.length,
                          items: s.value,
                          onClick: (m) => vt(S)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : R("", !0)
                      ], 64))), 256))
                    ])
                  ])),
                  me("tbody", {
                    ref_key: "tableBody",
                    ref: v,
                    id: "lkt-table-body-" + b(K),
                    class: Z(e.itemsContainerClass)
                  }, [
                    (p(!0), w(H, null, we(s.value, (S, m) => qe((p(), O(Nn, {
                      modelValue: s.value[m],
                      "onUpdate:modelValue": (N) => s.value[m] = N,
                      key: Dt(S, m),
                      i: m,
                      "is-draggable": d(S),
                      sortable: kt.value,
                      "visible-columns": Te.value,
                      "empty-columns": Ue.value,
                      "add-navigation": e.addNavigation,
                      "latest-row": m + 1 === nt.value,
                      "can-drop": q.value && T.value,
                      "can-edit": St.value && ee.value && T.value,
                      "can-read": Oe.value,
                      "can-create": ve.value,
                      "edit-mode-enabled": T.value,
                      "has-inline-edit-perm": it.value,
                      "row-display-type": e.rowDisplayType,
                      "render-drag": Ba.value,
                      "disabled-drag": Ea.value,
                      "is-loading": g.value,
                      "item-container-class": e.itemContainerClass,
                      "item-slot-component": Ge.value,
                      "item-slot-data": Tt.value,
                      "item-slot-events": e.itemSlotEvents,
                      permissions: A.value,
                      onClick: _t,
                      onItemUp: oe,
                      onItemDown: Ut,
                      onItemDrop: ze
                    }, Ga({ _: 2 }, [
                      b(n)[`item-${m}`] && ea(e.row, m) ? {
                        name: `item-${m}`,
                        fn: P((N) => [
                          $(e.$slots, `item-${m}`, fe({
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
                      } : b(n).item && ea(e.row, m) ? {
                        name: "item",
                        fn: P((N) => [
                          $(e.$slots, "item", fe({
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
                      we(ht.value, (N) => ({
                        name: N,
                        fn: P((ct) => [
                          $(e.$slots, N, fe({
                            [e.slotItemVar || ""]: ct.item,
                            value: ct.value,
                            column: ct.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class", "item-slot-component", "item-slot-data", "item-slot-events", "permissions"])), [
                      [Xe, mt(s.value[m], m)]
                    ])), 128))
                  ], 10, Kn)
                ])) : Ce.value === b(Ve).Item ? (p(), w("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + b(K),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (p(!0), w(H, null, we(s.value, (S, m) => (p(), w(H, {
                    key: Dt(S, m)
                  }, [
                    !e.skipTableItemsContainer && mt(S, m) ? (p(), w("div", {
                      key: 0,
                      class: Z(["lkt-table-item", It(S, m)]),
                      "data-i": m
                    }, [
                      Ge.value ? (p(), O(ge(Ge.value), Y({
                        key: 0,
                        ref_for: !0
                      }, {
                        item: S,
                        index: m,
                        editing: T.value,
                        perms: A.value,
                        data: Tt.value,
                        events: e.itemSlotEvents
                      }), null, 16)) : $(e.$slots, "item", fe({
                        key: 1,
                        [e.slotItemVar || ""]: S,
                        index: m,
                        editing: T.value,
                        canCreate: ve.value,
                        canRead: Oe.value,
                        canUpdate: ee.value,
                        canDrop: q.value,
                        isLoading: g.value,
                        doDrop: () => ze(m)
                      }))
                    ], 10, Jn)) : mt(S, m) ? $(e.$slots, "item", fe({
                      key: 1,
                      class: It(S, m),
                      dataI: m,
                      [e.slotItemVar || ""]: S,
                      index: m,
                      editing: T.value,
                      canCreate: ve.value,
                      canRead: Oe.value,
                      canUpdate: ee.value,
                      canDrop: q.value,
                      isLoading: g.value,
                      doDrop: () => ze(m)
                    })) : R("", !0)
                  ], 64))), 128))
                ], 10, Wn)) : Ce.value === b(Ve).Accordion ? (p(), w("div", {
                  key: 2,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + b(K),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (p(!0), w(H, null, we(s.value, (S, m) => (p(), w(H, null, [
                    [b(De).Auto, b(De).PreferCustomItem].includes(e.rowDisplayType) && b(n)[st(S, m)] ? $(e.$slots, st(S, m), {
                      key: 0,
                      item: S,
                      index: m,
                      editing: T.value,
                      isLoading: g.value
                    }) : [b(De).Auto, b(De).PreferCustomItem].includes(e.rowDisplayType) && b(n)[`item-${m}`] ? $(e.$slots, `item-${m}`, {
                      key: 1,
                      item: S,
                      index: m,
                      editing: T.value,
                      isLoading: g.value
                    }) : (p(), w(H, { key: 2 }, [
                      mt(S, m) ? (p(), O(Q, Y({
                        class: ["lkt-table-item", It(S, m)],
                        "data-i": m,
                        key: Dt(S, m)
                      }, { ref_for: !0 }, {
                        ...e.accordion,
                        title: Da(S)
                      }), {
                        header: P(() => [
                          pe(Qt, {
                            modelValue: s.value[m],
                            "onUpdate:modelValue": (N) => s.value[m] = N,
                            i: m,
                            column: Fe.value,
                            columns: Te.value,
                            "edit-mode-enabled": T.value,
                            "has-inline-edit-perm": it.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])
                        ]),
                        default: P(() => [
                          (p(!0), w(H, null, we(Te.value, (N) => {
                            var ct, na;
                            return p(), w(H, null, [
                              N.key !== ((ct = Fe.value) == null ? void 0 : ct.key) && e.$slots[N.key] && b(Sa)(N, s.value[m]) ? $(e.$slots, N.key, {
                                key: 0,
                                value: s.value[m][N.key],
                                item: s.value[m],
                                column: N,
                                i: m
                              }) : (p(), w(H, { key: 1 }, [
                                N.key !== ((na = Fe.value) == null ? void 0 : na.key) ? (p(), O(Qt, {
                                  key: 0,
                                  modelValue: s.value[m],
                                  "onUpdate:modelValue": (Oa) => s.value[m] = Oa,
                                  i: m,
                                  column: N,
                                  columns: Te.value,
                                  "edit-mode-enabled": T.value,
                                  "has-inline-edit-perm": it.value
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])) : R("", !0)
                              ], 64))
                            ], 64);
                          }), 256))
                        ]),
                        _: 2
                      }, 1040, ["class", "data-i"])) : R("", !0)
                    ], 64))
                  ], 64))), 256))
                ], 10, Qn)) : wa.value ? (p(), O(ge(Ce.value), {
                  key: 3,
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, {
                  default: P(() => [
                    (p(!0), w(H, null, we(s.value, (S, m) => (p(), w(H, {
                      key: Dt(S, m)
                    }, [
                      mt(S, m) ? (p(), w("li", {
                        key: 0,
                        class: Z(["lkt-table-item", It(S, m)]),
                        "data-i": m
                      }, [
                        Ge.value ? (p(), O(ge(Ge.value), Y({
                          key: 0,
                          ref_for: !0
                        }, {
                          item: S,
                          index: m,
                          editing: T.value,
                          perms: A.value,
                          data: Tt.value,
                          events: e.itemSlotEvents
                        }), null, 16)) : $(e.$slots, "item", fe({
                          key: 1,
                          [e.slotItemVar || ""]: S,
                          index: m,
                          editing: T.value,
                          canCreate: ve.value,
                          canRead: Oe.value,
                          canUpdate: ee.value,
                          canDrop: q.value,
                          isLoading: g.value,
                          doDrop: () => ze(m)
                        }))
                      ], 10, Zn)) : R("", !0)
                    ], 64))), 128))
                  ]),
                  _: 3
                }, 8, ["class"])) : Ce.value === b(Ve).Carousel ? (p(), w("div", {
                  key: 4,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + b(K),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  pe(b(pn), Y({
                    modelValue: se.value,
                    "onUpdate:modelValue": u[2] || (u[2] = (S) => se.value = S)
                  }, e.carousel, {
                    "wrap-around": ((Ee = e.carousel) == null ? void 0 : Ee.infinite) === !0
                  }), {
                    addons: P(() => [
                      pe(b(yn)),
                      pe(b(bn))
                    ]),
                    default: P(() => [
                      (p(!0), w(H, null, we(tt.value, (S, m) => (p(), O(b(sa), {
                        key: S,
                        index: m
                      }, {
                        default: P(() => [
                          me("div", el, [
                            $(e.$slots, S)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (p(!0), w(H, null, we(s.value, (S, m) => (p(), O(b(sa), {
                        key: e.slide,
                        index: m
                      }, {
                        default: P(() => [
                          me("div", tl, [
                            Ge.value ? (p(), O(ge(Ge.value), Y({
                              key: 0,
                              ref_for: !0
                            }, {
                              item: S,
                              index: m,
                              editing: T.value,
                              perms: A.value,
                              data: Tt.value,
                              events: e.itemSlotEvents
                            }), null, 16)) : $(e.$slots, "item", fe({
                              key: 1,
                              [e.slotItemVar || ""]: S,
                              index: m,
                              editing: T.value,
                              canCreate: ve.value,
                              canRead: Oe.value,
                              canUpdate: ee.value,
                              canDrop: q.value,
                              isLoading: g.value,
                              doDrop: () => ze(m)
                            }))
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128))
                    ]),
                    _: 3
                  }, 16, ["modelValue", "wrap-around"])
                ], 10, xn)) : Ce.value === b(Ve).Calendar ? (p(), w("div", {
                  key: 5,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + b(K),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  pe(X, fe(va({
                    ...e.calendar,
                    items: Ma.value,
                    events: Na
                  })), null, 16)
                ], 10, al)) : R("", !0)
              ], 512), [
                [Xe, $t.value]
              ]),
              !g.value && s.value.length === 0 ? (p(), w("div", nl, [
                b(n).empty ? $(e.$slots, "empty", { key: 0 }) : Ia.value ? (p(), O(ge(Ta.value), {
                  key: 1,
                  message: e.noResultsText
                }, null, 8, ["message"])) : e.noResultsText ? (p(), w(H, { key: 2 }, [
                  Je(Qe(e.noResultsText), 1)
                ], 64)) : R("", !0)
              ])) : R("", !0),
              g.value ? (p(), O(He, { key: 3 })) : R("", !0),
              pt.value || b(n).bottomButtons ? (p(), w("div", ll, [
                pt.value && s.value.length >= e.requiredItemsForBottomCreate ? (p(), O(Yt, {
                  key: 0,
                  config: z.value,
                  disabled: !zt.value,
                  onClick: h,
                  onAppend: C
                }, null, 8, ["config", "disabled"])) : R("", !0),
                $(e.$slots, "bottom-buttons")
              ])) : R("", !0),
              e.paginator && Object.keys(e.paginator).length > 0 ? (p(), O(Pe, Y({
                key: 5,
                ref_key: "paginatorRef",
                ref: et
              }, e.paginator, {
                modelValue: f.value,
                "onUpdate:modelValue": u[3] || (u[3] = (S) => f.value = S),
                onLoading: _e,
                onPerms: ae,
                onResponse: Lt
              }), null, 16, ["modelValue"])) : R("", !0),
              b(n)["web-element-actions"] ? $(e.$slots, "web-element-actions", { key: 6 }) : R("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, Fn);
    };
  }
}), fl = {
  install: (a) => {
    a.component("lkt-table") === void 0 && a.component("lkt-table", ol);
  }
}, pl = (a) => (be.navButtonSlot = a, !0), ml = (a) => (be.createButtonSlot = a, !0), gl = (a) => {
  be.defaultEmptySlot = a;
};
export {
  hl as Column,
  kl as createColumn,
  fl as default,
  hn as defaultTableSorter,
  ml as setTableCreateButtonSlot,
  gl as setTableEmptySlot,
  pl as setTableNavButtonSlot
};
