import { defineComponent as ke, computed as u, ref as I, shallowReactive as Jt, watch as j, watchEffect as qt, onMounted as ea, onBeforeUnmount as Ka, reactive as Kt, provide as ya, h as J, useId as Xa, inject as Bt, getCurrentInstance as Ya, onUnmounted as Wa, onUpdated as Ja, cloneVNode as Qa, resolveComponent as ie, createBlock as O, createElementBlock as w, unref as h, openBlock as p, mergeProps as X, withCtx as U, createTextVNode as Qe, toDisplayString as Ze, normalizeProps as me, Fragment as K, useSlots as ba, normalizeClass as Z, createCommentVNode as V, createElementVNode as ye, createVNode as ge, resolveDynamicComponent as be, guardReactiveProps as ha, renderSlot as F, renderList as Ce, mergeDefaults as Za, nextTick as $t, withDirectives as qe, vShow as Ke, createSlots as xa, normalizeStyle as da } from "vue";
import { __ as el } from "lkt-i18n";
import { ColumnType as Re, FieldType as We, MultipleOptionsDisplay as tl, SortDirection as xe, Column as ka, extractPropValue as al, TableRowType as we, extractI18nValue as Sa, LktSettings as Ve, ensureButtonConfig as Xe, TablePermission as Be, PaginatorType as Ye, TableType as Ee, getDefaultValues as ll, Table as nl, ButtonType as Xt } from "lkt-vue-kernel";
import { Column as Vn, createColumn as Rn } from "lkt-vue-kernel";
import { generateRandomString as ol, replaceAll as il } from "lkt-string-tools";
import { DataState as rl } from "lkt-data-state";
import ul from "sortablejs";
import { date as sl, findOldestAndNewestDateInObjects as dl, time as cl } from "lkt-date-tools";
/**
 * Vue 3 Carousel 0.14.0
 * (c) 2025
 * @license MIT
 */
const Ca = ["viewport", "carousel"], Pt = {
  "bottom-to-top": "btt",
  "left-to-right": "ltr",
  "right-to-left": "rtl",
  "top-to-bottom": "ttb"
}, wa = [
  "ltr",
  "left-to-right",
  "rtl",
  "right-to-left",
  "ttb",
  "top-to-bottom",
  "btt",
  "bottom-to-top"
], vl = {
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
}, Da = ["slide", "fade"], Ta = [
  "center",
  "start",
  "end",
  "center-even",
  "center-odd"
], H = {
  autoplay: 0,
  breakpointMode: Ca[0],
  breakpoints: void 0,
  dir: wa[0],
  enabled: !0,
  gap: 0,
  height: "auto",
  i18n: vl,
  ignoreAnimations: !1,
  itemsToScroll: 1,
  itemsToShow: 1,
  modelValue: 0,
  mouseDrag: !0,
  pauseAutoplayOnHover: !1,
  preventExcessiveDragging: !1,
  slideEffect: Da[0],
  snapAlign: Ta[0],
  touchDrag: !0,
  transition: 300,
  wrapAround: !1
}, et = Symbol("carousel"), fl = (a) => {
  const i = Jt([]), o = (n) => {
    n !== void 0 ? i.slice(n).forEach((l, t) => {
      var y;
      (y = l.exposed) === null || y === void 0 || y.setIndex(n + t);
    }) : i.forEach((l, t) => {
      var y;
      (y = l.exposed) === null || y === void 0 || y.setIndex(t);
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
      i.splice(t, 0, n), o(t), a("slide-registered", { slide: n, index: t });
    },
    unregisterSlide: (n) => {
      const l = i.indexOf(n);
      l !== -1 && (a("slide-unregistered", { slide: n, index: l }), i.splice(l, 1), o(l));
    }
  };
};
function pl(a) {
  return a.length === 0 ? 0 : a.reduce((o, n) => o + n, 0) / a.length;
}
function ca({ slides: a, position: i, toShow: o }) {
  const n = [], l = i === "before", t = l ? -o : 0, y = l ? 0 : o;
  if (a.length <= 0)
    return n;
  for (let S = t; S < y; S++) {
    const s = {
      index: l ? S : S + a.length,
      isClone: !0,
      position: i,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${i}-${S}`
    }, v = a[(S % a.length + a.length) % a.length].vnode, T = Qa(v, s);
    T.el = null, n.push(T);
  }
  return n;
}
const ml = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function va(a) {
  if (!a.el || !(a.el instanceof Element))
    return;
  const i = a.el.querySelectorAll(ml);
  for (const o of i)
    o instanceof HTMLElement && !o.hasAttribute("disabled") && o.getAttribute("aria-hidden") !== "true" && o.setAttribute("tabindex", "-1");
}
function gl(a, i) {
  return Object.keys(a).filter((o) => !i.includes(o)).reduce((o, n) => (o[n] = a[n], o), {});
}
function yl(a) {
  const { isVertical: i, isReversed: o, dragged: n, effectiveSlideSize: l } = a, t = i ? n.y : n.x;
  if (t === 0)
    return 0;
  const y = Math.round(t / l);
  return o ? y : -y;
}
function Ae({ val: a, max: i, min: o }) {
  return i < o ? a : Math.min(Math.max(a, isNaN(o) ? a : o), isNaN(i) ? a : i);
}
function bl(a) {
  const { transform: i } = window.getComputedStyle(a);
  return i.split(/[(,)]/).slice(1, -1).map((o) => parseFloat(o));
}
function hl(a) {
  let i = 1, o = 1;
  return a.forEach((n) => {
    const l = bl(n);
    l.length === 6 && (i /= l[0], o /= l[3]);
  }), { widthMultiplier: i, heightMultiplier: o };
}
function kl(a, i) {
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
function Sl(a, i, o) {
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
function Qt({ slideSize: a, viewportSize: i, align: o, itemsToShow: n }) {
  return n !== void 0 ? kl(o, n) : a !== void 0 && i !== void 0 ? Sl(o, a, i) : 0;
}
function Ia(a = "", i = {}) {
  return Object.entries(i).reduce((o, [n, l]) => o.replace(`{${n}}`, String(l)), a);
}
function Ba({ val: a, max: i, min: o = 0 }) {
  const n = i - o + 1;
  return ((a - o) % n + n) % n + o;
}
function Yt(a, i = 0) {
  let o = !1, n = 0, l = null;
  function t(...y) {
    if (o)
      return;
    o = !0;
    const S = () => {
      l = requestAnimationFrame((D) => {
        D - n > i ? (n = D, a(...y), o = !1) : S();
      });
    };
    S();
  }
  return t.cancel = () => {
    l && (cancelAnimationFrame(l), l = null, o = !1);
  }, t;
}
function Ft(a, i = "px") {
  if (!(a == null || a === ""))
    return typeof a == "number" || parseFloat(a).toString() === a ? `${a}${i}` : a;
}
const Cl = ke({
  name: "CarouselAria",
  setup() {
    const a = Bt(et);
    return a ? () => J("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, Ia(a.config.i18n.itemXofY, {
      currentSlide: a.currentSlide + 1,
      slidesCount: a.slidesCount
    })) : () => "";
  }
}), wl = {
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
    validator(a) {
      return Ca.includes(a);
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
    validator(a, i) {
      return a && i.wrapAround && console.warn('[vue3-carousel warn]: "preventExcessiveDragging" cannot be used with wrapAround. The setting will be ignored.'), !0;
    }
  },
  // control snap position alignment
  snapAlign: {
    default: H.snapAlign,
    validator(a) {
      return Ta.includes(a);
    }
  },
  slideEffect: {
    type: String,
    default: H.slideEffect,
    validator(a) {
      return Da.includes(a);
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
    validator(a, i) {
      if (!wa.includes(a))
        return !1;
      const o = a in Pt ? Pt[a] : a;
      return ["ttb", "btt"].includes(o) && (!i.height || i.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${a}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: H.wrapAround,
    type: Boolean
  }
}, Dl = ke({
  name: "VueCarousel",
  props: wl,
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
  setup(a, { slots: i, emit: o, expose: n }) {
    var l;
    const t = fl(o), y = t.getSlides(), S = u(() => y.length), D = I(null), s = I(null), v = I(0), T = u(() => Object.assign(Object.assign(Object.assign({}, H), gl(a, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, H.i18n), a.i18n) })), f = Jt(Object.assign({}, T.value)), g = I((l = a.modelValue) !== null && l !== void 0 ? l : 0), R = I(g.value);
    j(g, (d) => R.value = d);
    const A = I(0), tt = u(() => Math.ceil((S.value - 1) / 2)), re = u(() => S.value - 1), ue = u(() => 0);
    let ae = null, c = null, B = null;
    const se = u(() => v.value + f.gap), z = u(() => {
      const d = f.dir || "ltr";
      return d in Pt ? Pt[d] : d;
    }), le = u(() => ["rtl", "btt"].includes(z.value)), de = u(() => ["ttb", "btt"].includes(z.value)), ce = u(() => f.itemsToShow === "auto"), Y = u(() => de.value ? "height" : "width");
    function Le() {
      var d;
      if (!je.value)
        return;
      const k = (T.value.breakpointMode === "carousel" ? (d = D.value) === null || d === void 0 ? void 0 : d.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, C = Object.keys(a.breakpoints || {}).map((N) => Number(N)).sort((N, Q) => +Q - +N), E = {};
      C.some((N) => k >= N ? (Object.assign(E, a.breakpoints[N]), E.i18n && Object.assign(E.i18n, T.value.i18n, a.breakpoints[N].i18n), !0) : !1), Object.assign(f, T.value, E);
    }
    const at = Yt(() => {
      Le(), nt(), x();
    }), Me = Jt(/* @__PURE__ */ new Set()), P = I([]);
    function lt({ widthMultiplier: d, heightMultiplier: k }) {
      P.value = y.map((C) => {
        var E;
        const N = (E = C.exposed) === null || E === void 0 ? void 0 : E.getBoundingRect();
        return {
          width: N.width * d,
          height: N.height * k
        };
      });
    }
    const De = I({
      width: 0,
      height: 0
    });
    function Ut({ widthMultiplier: d, heightMultiplier: k }) {
      var C;
      const E = ((C = s.value) === null || C === void 0 ? void 0 : C.getBoundingClientRect()) || { width: 0, height: 0 };
      De.value = {
        width: E.width * d,
        height: E.height * k
      };
    }
    function x() {
      if (!s.value)
        return;
      const d = hl(Me);
      if (Ut(d), lt(d), ce.value)
        v.value = pl(P.value.map((k) => k[Y.value]));
      else {
        const k = Number(f.itemsToShow), C = (k - 1) * f.gap;
        v.value = (De.value[Y.value] - C) / k;
      }
    }
    function nt() {
      !f.wrapAround && S.value > 0 && (g.value = Ae({
        val: g.value,
        max: re.value,
        min: ue.value
      })), ce.value || (f.itemsToShow = Ae({
        val: Number(f.itemsToShow),
        max: S.value,
        min: 1
      }));
    }
    const ft = u(() => typeof a.ignoreAnimations == "string" ? a.ignoreAnimations.split(",") : Array.isArray(a.ignoreAnimations) ? a.ignoreAnimations : a.ignoreAnimations ? !1 : []);
    qt(() => nt()), qt(() => {
      x();
    });
    let Ne;
    const Et = (d) => {
      const k = d.target;
      if (!(!(k != null && k.contains(D.value)) || Array.isArray(ft.value) && ft.value.includes(d.animationName)) && (Me.add(k), !Ne)) {
        const C = () => {
          Ne = requestAnimationFrame(() => {
            x(), C();
          });
        };
        C();
      }
    }, ve = (d) => {
      const k = d.target;
      k && Me.delete(k), Ne && Me.size === 0 && (cancelAnimationFrame(Ne), x());
    }, je = I(!1);
    typeof document < "u" && qt(() => {
      je.value && ft.value !== !1 ? (document.addEventListener("animationstart", Et), document.addEventListener("animationend", ve)) : (document.removeEventListener("animationstart", Et), document.removeEventListener("animationend", ve));
    }), ea(() => {
      je.value = !0, Le(), bt(), D.value && (B = new ResizeObserver(at), B.observe(D.value)), o("init");
    }), Ka(() => {
      je.value = !1, t.cleanup(), c && clearTimeout(c), Ne && cancelAnimationFrame(Ne), ae && clearInterval(ae), B && (B.disconnect(), B = null), typeof document < "u" && gt(), D.value && (D.value.removeEventListener("transitionend", x), D.value.removeEventListener("animationiteration", x));
    });
    let ne = !1;
    const ot = { x: 0, y: 0 }, fe = Kt({ x: 0, y: 0 }), it = I(!1), pt = I(!1), mt = () => {
      it.value = !0;
    }, jt = () => {
      it.value = !1;
    }, Oe = Yt((d) => {
      if (!d.ctrlKey)
        switch (d.key) {
          case "ArrowLeft":
          case "ArrowUp":
            de.value === d.key.endsWith("Up") && (le.value ? Ie(!0) : ut(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            de.value === d.key.endsWith("Down") && (le.value ? ut(!0) : Ie(!0));
            break;
        }
    }, 200), _t = () => {
      document.addEventListener("keydown", Oe);
    }, gt = () => {
      document.removeEventListener("keydown", Oe);
    };
    function At(d) {
      const k = d.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(k) || q.value || (ne = d.type === "touchstart", !ne && (d.preventDefault(), d.button !== 0)))
        return;
      ot.x = "touches" in d ? d.touches[0].clientX : d.clientX, ot.y = "touches" in d ? d.touches[0].clientY : d.clientY;
      const C = ne ? "touchmove" : "mousemove", E = ne ? "touchend" : "mouseup";
      document.addEventListener(C, yt, { passive: !1 }), document.addEventListener(E, rt, { passive: !0 });
    }
    const yt = Yt((d) => {
      pt.value = !0;
      const k = "touches" in d ? d.touches[0].clientX : d.clientX, C = "touches" in d ? d.touches[0].clientY : d.clientY;
      fe.x = k - ot.x, fe.y = C - ot.y;
      const E = yl({
        isVertical: de.value,
        isReversed: le.value,
        dragged: fe,
        effectiveSlideSize: se.value
      });
      R.value = f.wrapAround ? g.value + E : Ae({
        val: g.value + E,
        max: re.value,
        min: ue.value
      }), o("drag", { deltaX: fe.x, deltaY: fe.y });
    });
    function rt() {
      if (yt.cancel(), R.value !== g.value && !ne) {
        const C = (E) => {
          E.preventDefault(), window.removeEventListener("click", C);
        };
        window.addEventListener("click", C);
      }
      $e(R.value), fe.x = 0, fe.y = 0, pt.value = !1;
      const d = ne ? "touchmove" : "mousemove", k = ne ? "touchend" : "mouseup";
      document.removeEventListener(d, yt), document.removeEventListener(k, rt);
    }
    function bt() {
      !f.autoplay || f.autoplay <= 0 || (ae = setInterval(() => {
        f.pauseAutoplayOnHover && it.value || Ie();
      }, f.autoplay));
    }
    function pe() {
      ae && (clearInterval(ae), ae = null);
    }
    function Te() {
      pe(), bt();
    }
    const q = I(!1);
    function $e(d, k = !1) {
      if (!k && q.value)
        return;
      let C = d, E = d;
      A.value = g.value, f.wrapAround ? E = Ba({
        val: C,
        max: re.value,
        min: ue.value
      }) : C = Ae({
        val: C,
        max: re.value,
        min: ue.value
      }), o("slide-start", {
        slidingToIndex: d,
        currentSlideIndex: g.value,
        prevSlideIndex: A.value,
        slidesCount: S.value
      }), pe(), q.value = !0, g.value = C, E !== C && ht.pause(), o("update:modelValue", E), c = setTimeout(() => {
        f.wrapAround && E !== C && (ht.resume(), g.value = E, o("loop", {
          currentSlideIndex: g.value,
          slidingToIndex: d
        })), o("slide-end", {
          currentSlideIndex: g.value,
          prevSlideIndex: A.value,
          slidesCount: S.value
        }), q.value = !1, Te();
      }, f.transition);
    }
    function Ie(d = !1) {
      $e(g.value + f.itemsToScroll, d);
    }
    function ut(d = !1) {
      $e(g.value - f.itemsToScroll, d);
    }
    function Vt() {
      Le(), nt(), x(), Te();
    }
    j(() => [T.value, a.breakpoints], () => Le(), { deep: !0 }), j(() => a.autoplay, () => Te());
    const ht = j(() => a.modelValue, (d) => {
      d !== g.value && $e(Number(d), !0);
    });
    o("before-init");
    const W = u(() => {
      if (!f.wrapAround)
        return { before: 0, after: 0 };
      if (ce.value)
        return { before: y.length, after: y.length };
      const d = Number(f.itemsToShow), k = Math.ceil(d + (f.itemsToScroll - 1)), C = k - R.value, E = k - (S.value - (R.value + 1));
      return {
        before: Math.max(0, C),
        after: Math.max(0, E)
      };
    }), kt = u(() => W.value.before ? ce.value ? P.value.slice(-1 * W.value.before).reduce((d, k) => d + k[Y.value] + f.gap, 0) * -1 : W.value.before * se.value * -1 : 0), _e = u(() => {
      var d;
      if (ce.value) {
        const k = (g.value % y.length + y.length) % y.length;
        return Qt({
          slideSize: (d = P.value[k]) === null || d === void 0 ? void 0 : d[Y.value],
          viewportSize: De.value[Y.value],
          align: f.snapAlign
        });
      }
      return Qt({
        align: f.snapAlign,
        itemsToShow: +f.itemsToShow
      });
    }), st = u(() => {
      let d = 0;
      if (ce.value) {
        if (g.value < 0 ? d = P.value.slice(g.value).reduce((k, C) => k + C[Y.value] + f.gap, 0) * -1 : d = P.value.slice(0, g.value).reduce((k, C) => k + C[Y.value] + f.gap, 0), d -= _e.value, !f.wrapAround) {
          const k = P.value.reduce((C, E) => C + E[Y.value] + f.gap, 0) - De.value[Y.value] - f.gap;
          d = Ae({
            val: d,
            max: k,
            min: 0
          });
        }
      } else {
        let k = g.value - _e.value;
        f.wrapAround || (k = Ae({
          val: k,
          max: S.value - +f.itemsToShow,
          min: 0
        })), d = k * se.value;
      }
      return d * (le.value ? 1 : -1);
    }), ze = u(() => {
      var d, k;
      if (!ce.value) {
        const N = g.value - _e.value;
        return f.wrapAround ? {
          min: Math.floor(N),
          max: Math.ceil(N + Number(f.itemsToShow) - 1)
        } : {
          min: Math.floor(Ae({
            val: N,
            max: S.value - Number(f.itemsToShow),
            min: 0
          })),
          max: Math.ceil(Ae({
            val: N + Number(f.itemsToShow) - 1,
            max: S.value - 1,
            min: 0
          }))
        };
      }
      let C = 0;
      {
        let N = 0, Q = 0 - W.value.before;
        const ee = Math.abs(st.value + kt.value);
        for (; N <= ee; ) {
          const te = (Q % y.length + y.length) % y.length;
          N += ((d = P.value[te]) === null || d === void 0 ? void 0 : d[Y.value]) + f.gap, Q++;
        }
        C = Q - 1;
      }
      let E = 0;
      {
        let N = C, Q = 0;
        for (N < 0 ? Q = P.value.slice(0, N).reduce((ee, te) => ee + te[Y.value] + f.gap, 0) - Math.abs(st.value + kt.value) : Q = P.value.slice(0, N).reduce((ee, te) => ee + te[Y.value] + f.gap, 0) - Math.abs(st.value); Q < De.value[Y.value]; ) {
          const ee = (N % y.length + y.length) % y.length;
          Q += ((k = P.value[ee]) === null || k === void 0 ? void 0 : k[Y.value]) + f.gap, N++;
        }
        E = N - 1;
      }
      return {
        min: Math.floor(C),
        max: Math.ceil(E)
      };
    }), St = u(() => {
      if (f.slideEffect === "fade")
        return;
      const d = de.value ? "Y" : "X", k = de.value ? fe.y : fe.x;
      let C = st.value + k;
      if (!f.wrapAround && f.preventExcessiveDragging) {
        let E = 0;
        ce.value ? E = P.value.reduce((ee, te) => ee + te[Y.value], 0) : E = (S.value - Number(f.itemsToShow)) * se.value;
        const N = le.value ? 0 : -1 * E, Q = le.value ? E : 0;
        C = Ae({
          val: C,
          min: N,
          max: Q
        });
      }
      return `translate${d}(${C}px)`;
    }), Rt = u(() => ({
      "--vc-transition-duration": q.value ? Ft(f.transition, "ms") : void 0,
      "--vc-slide-gap": Ft(f.gap),
      "--vc-carousel-height": Ft(f.height),
      "--vc-cloned-offset": Ft(kt.value)
    })), Ct = { slideTo: $e, next: Ie, prev: ut }, zt = Kt({
      activeSlide: R,
      config: f,
      currentSlide: g,
      isSliding: q,
      isVertical: de,
      maxSlide: re,
      minSlide: ue,
      nav: Ct,
      normalizedDir: z,
      slideRegistry: t,
      slideSize: v,
      slides: y,
      slidesCount: S,
      viewport: s,
      visibleRange: ze
    });
    ya(et, zt);
    const oe = Kt({
      config: f,
      currentSlide: g,
      maxSlide: re,
      middleSlide: tt,
      minSlide: ue,
      slideSize: v,
      slidesCount: S
    });
    return n({
      data: oe,
      nav: Ct,
      next: Ie,
      prev: ut,
      restartCarousel: Vt,
      slideTo: $e,
      updateBreakpointsConfig: Le,
      updateSlideSize: x,
      updateSlidesData: nt
    }), () => {
      var d;
      const k = i.default || i.slides, C = (k == null ? void 0 : k(oe)) || [], { before: E, after: N } = W.value, Q = ca({
        slides: y,
        position: "before",
        toShow: E
      }), ee = ca({
        slides: y,
        position: "after",
        toShow: N
      }), te = [...Q, ...C, ...ee];
      if (!f.enabled || !te.length)
        return J("section", {
          ref: D,
          class: ["carousel", "is-disabled"]
        }, te);
      const dt = ((d = i.addons) === null || d === void 0 ? void 0 : d.call(i, oe)) || [], ct = J("ol", {
        class: "carousel__track",
        style: { transform: St.value },
        onMousedownCapture: f.mouseDrag ? At : null,
        onTouchstartPassiveCapture: f.touchDrag ? At : null
      }, te), Lt = J("div", { class: "carousel__viewport", ref: s }, ct);
      return J("section", {
        ref: D,
        class: [
          "carousel",
          `is-${z.value}`,
          `is-effect-${f.slideEffect}`,
          {
            "is-vertical": de.value,
            "is-sliding": q.value,
            "is-dragging": pt.value,
            "is-hover": it.value
          }
        ],
        dir: z.value,
        style: Rt.value,
        "aria-label": f.i18n.ariaGallery,
        tabindex: "0",
        onFocus: _t,
        onBlur: gt,
        onMouseenter: mt,
        onMouseleave: jt
      }, [Lt, dt, J(Cl)]);
    };
  }
});
var Zt;
(function(a) {
  a.arrowDown = "arrowDown", a.arrowLeft = "arrowLeft", a.arrowRight = "arrowRight", a.arrowUp = "arrowUp";
})(Zt || (Zt = {}));
const fa = (a) => `icon${a.charAt(0).toUpperCase() + a.slice(1)}`, Tl = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function Il(a) {
  return a in Zt;
}
const pa = (a) => a && Il(a), ma = ke({
  props: {
    name: {
      type: String,
      required: !0,
      validator: pa
    },
    title: {
      type: String,
      default: (a) => a.name ? H.i18n[fa(a.name)] : ""
    }
  },
  setup(a) {
    const i = Bt(et, null);
    return () => {
      const o = a.name;
      if (!o || !pa(o))
        return;
      const n = Tl[o], l = J("path", { d: n }), t = (i == null ? void 0 : i.config.i18n[fa(o)]) || a.title, y = J("title", t);
      return J("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": t
      }, [y, l]);
    };
  }
}), Bl = ke({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(a, { slots: i, attrs: o }) {
    const n = Bt(et);
    if (!n)
      return () => "";
    const { next: l, prev: t } = i, y = () => ({
      btt: "arrowDown",
      ltr: "arrowLeft",
      rtl: "arrowRight",
      ttb: "arrowUp"
    })[n.normalizedDir], S = () => ({
      btt: "arrowUp",
      ltr: "arrowRight",
      rtl: "arrowLeft",
      ttb: "arrowDown"
    })[n.normalizedDir], D = u(() => !n.config.wrapAround && n.currentSlide <= n.minSlide), s = u(() => !n.config.wrapAround && n.currentSlide >= n.maxSlide);
    return () => {
      const { i18n: v } = n.config, T = J("button", Object.assign(Object.assign({ type: "button", disabled: D.value, "aria-label": v.ariaPreviousSlide, title: v.ariaPreviousSlide, onClick: n.nav.prev }, o), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": D.value },
        o.class
      ] }), (t == null ? void 0 : t()) || J(ma, { name: y() })), f = J("button", Object.assign(Object.assign({ type: "button", disabled: s.value, "aria-label": v.ariaNextSlide, title: v.ariaNextSlide, onClick: n.nav.next }, o), { class: [
        "carousel__next",
        { "carousel__next--disabled": s.value },
        o.class
      ] }), (l == null ? void 0 : l()) || J(ma, { name: S() }));
      return [T, f];
    };
  }
}), El = ke({
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
    const i = Bt(et);
    if (!i)
      return () => "";
    const o = u(() => i.config.itemsToShow), n = u(() => Qt({
      align: i.config.snapAlign,
      itemsToShow: o.value
    })), l = u(() => a.paginateByItemsToShow && o.value > 1), t = u(() => Math.ceil((i.activeSlide - n.value) / o.value)), y = u(() => Math.ceil(i.slidesCount / o.value)), S = (D) => Ba(l.value ? {
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
      for (let T = l.value ? 0 : i.minSlide; T <= (l.value ? y.value - 1 : i.maxSlide); T++) {
        const f = Ia(i.config.i18n[l.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: T + 1
        }), g = S(T), R = J("button", {
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
          onClick: () => i.nav.slideTo(l.value ? Math.floor(T * +i.config.itemsToShow + n.value) : T)
        }), A = J("li", { class: "carousel__pagination-item", key: T }, R);
        v.push(A);
      }
      return J("ol", { class: "carousel__pagination" }, v);
    };
  }
}), ga = ke({
  name: "CarouselSlide",
  props: {
    id: {
      type: String,
      default: (a) => a.isClone ? void 0 : Xa()
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
  setup(a, { attrs: i, slots: o, expose: n }) {
    const l = Bt(et);
    if (ya(et, void 0), !l)
      return () => "";
    const t = I(a.index), y = (R) => {
      t.value = R;
    }, S = Ya(), D = () => {
      const R = S.vnode.el;
      return R ? R.getBoundingClientRect() : { width: 0, height: 0 };
    };
    n({
      id: a.id,
      setIndex: y,
      getBoundingRect: D
    });
    const s = u(() => t.value === l.activeSlide), v = u(() => t.value === l.activeSlide - 1), T = u(() => t.value === l.activeSlide + 1), f = u(() => t.value >= l.visibleRange.min && t.value <= l.visibleRange.max), g = u(() => {
      if (l.config.itemsToShow === "auto")
        return;
      const R = l.config.itemsToShow, A = l.config.gap > 0 && R > 1 ? `calc(${100 / R}% - ${l.config.gap * (R - 1) / R}px)` : `${100 / R}%`;
      return l.isVertical ? { height: A } : { width: A };
    });
    return l.slideRegistry.registerSlide(S, a.index), Wa(() => {
      l.slideRegistry.unregisterSlide(S);
    }), a.isClone && (ea(() => {
      va(S.vnode);
    }), Ja(() => {
      va(S.vnode);
    })), () => {
      var R, A;
      return l.config.enabled ? J("li", {
        style: [i.style, Object.assign({}, g.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": a.isClone,
          "carousel__slide--visible": f.value,
          "carousel__slide--active": s.value,
          "carousel__slide--prev": v.value,
          "carousel__slide--next": T.value,
          "carousel__slide--sliding": l.isSliding
        },
        onFocusin: () => {
          l.viewport && (l.viewport.scrollLeft = 0), l.nav.slideTo(t.value);
        },
        id: a.isClone ? void 0 : a.id,
        "aria-hidden": a.isClone || void 0
      }, (A = o.default) === null || A === void 0 ? void 0 : A.call(o, {
        currentIndex: t.value,
        isActive: s.value,
        isClone: a.isClone,
        isPrev: v.value,
        isNext: T.value,
        isSliding: l.isSliding,
        isVisible: f.value
      })) : (R = o.default) === null || R === void 0 ? void 0 : R.call(o);
    };
  }
}), Al = (a, i, o, n) => {
  var y, S, D, s, v;
  if (!o) return 0;
  let l, t;
  if (o.type === Re.Field ? [We.Number, We.Range].includes((y = o.field) == null ? void 0 : y.type) ? (l = parseFloat(a[o.key]), t = parseFloat(i[o.key])) : [We.Date, We.Date].includes((S = o.field) == null ? void 0 : S.type) ? (l = a[o.key], t = i[o.key]) : ((D = o.field) == null ? void 0 : D.type) === We.Select && ((s = o.field) != null && s.multiple) && ((v = o.field) == null ? void 0 : v.multipleDisplay) === tl.Count ? (l = a[o.key].length, t = i[o.key].length) : (l = String(a[o.key]).toLowerCase(), t = String(i[o.key]).toLowerCase()) : (l = String(a[o.key]).toLowerCase(), t = String(i[o.key]).toLowerCase()), n === xe.Asc) {
    if (l > t) return 1;
    if (t > l) return -1;
  } else {
    if (l > t) return -1;
    if (t > l) return 1;
  }
  return 0;
}, Je = (a, i, o, n = []) => {
  if (a.extractTitleFromColumn) {
    let t = n.find((y) => y.key === a.extractTitleFromColumn);
    if (t)
      return Je(t, i, o, n);
  }
  let l = a.type === Re.ColumnIndex ? o : i[a.key];
  if (a.formatter && typeof a.formatter == "function") {
    let t = a.formatter(l, i, a, o);
    return typeof t == "string" && t.startsWith("__:") ? el(t.substring(3)) : t;
  }
  return l;
}, Vl = (a, i, o) => {
  if (!a.colspan) return -1;
  let n = i;
  return o.forEach((l) => {
    let t = ta(a, l);
    t > 0 && t < n && (n = t);
  }), n;
}, ta = (a, i) => a.colspan === !1 ? !1 : typeof a.colspan == "function" ? a.colspan(i) : a.colspan, Ea = (a, i) => typeof a.preferSlot > "u" ? !0 : a.preferSlot === !1 ? !1 : typeof a.preferSlot == "function" ? a.preferSlot(i) : !0, Rl = (a, i, o) => {
  if (typeof a != "object" || !a.key && [Re.Field].includes(a.type) || i.indexOf(a.key) > -1) return !1;
  let n = ta(a, o);
  return typeof a.colspan > "u" ? !0 : (typeof a.colspan < "u" && (typeof a.colspan == "function" ? n = parseInt(a.colspan(o)) : n = parseInt(a.colspan)), n > 0);
}, Ll = (a = []) => {
  if (a.length > 0) {
    for (let i = 0; i < a.length; ++i)
      if (a[i].sortable) return a[i].key;
  }
  return "";
}, Ml = (a, i) => {
  if (a.length > 0) {
    for (let o = 0; o < a.length; ++o)
      if (a[o].key === i) return a[o];
  }
  return null;
}, Aa = (a) => {
  let i = [];
  return a.class && i.push(a.class), a.type && i.push(`is-${a.type}`), i.join(" ");
}, xt = /* @__PURE__ */ ke({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new ka() },
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
    const o = i, n = a, l = I(n.modelValue);
    j(() => n.modelValue, (v) => {
      l.value = v;
    }), j(l, (v) => {
      o("update:modelValue", v);
    });
    const t = () => {
      o("inline-drop");
    }, y = u(() => ({ ...n.column.slotData, item: l.value })), S = u(() => {
      var v, T, f, g;
      if ((v = n.column.field) != null && v.modalData && typeof ((T = n.column.field) == null ? void 0 : T.modalData) == "object")
        for (let R in n.column.field.modalData)
          if (typeof ((f = n.column.field) == null ? void 0 : f.modalData[R]) == "string" && n.column.field.modalData[R].startsWith("prop:")) {
            let A = n.column.field.modalData[R].substring(5);
            l.value[A];
          } else
            n.column.field.modalData[R];
      return (g = n.column.field) == null ? void 0 : g.modalData;
    }), D = u(() => typeof n.column.field == "string" && n.column.field.startsWith("prop:") ? al(n.column.field, l.value) : n.column.field), s = u(() => {
      var v, T, f, g;
      return n.column.type === Re.Field ? !((T = (v = n.column) == null ? void 0 : v.field) != null && T.label) && (n.column.ensureFieldLabel || [
        We.Switch,
        We.Check
      ].includes((f = n.column.field) == null ? void 0 : f.type)) ? n.column.label : (g = n.column.field) == null ? void 0 : g.label : "";
    });
    return (v, T) => {
      const f = ie("lkt-anchor"), g = ie("lkt-button"), R = ie("lkt-field");
      return v.column.type === h(Re).Anchor ? (p(), O(f, X({ key: 0 }, v.column.anchor, { prop: l.value }), {
        default: U(() => [
          Qe(Ze(h(Je)(v.column, l.value, v.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : v.column.type === h(Re).Button ? (p(), O(g, X({ key: 1 }, v.column.button, { prop: l.value }), {
        default: U(() => [
          Qe(Ze(h(Je)(v.column, l.value, v.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : v.column.type === h(Re).Field ? (p(), O(R, X({
        key: 2,
        modelValue: l.value[v.column.key],
        "onUpdate:modelValue": T[0] || (T[0] = (A) => l.value[v.column.key] = A)
      }, {
        ...D.value,
        readMode: !v.hasInlineEditPerm || D.value.readMode,
        slotData: y.value,
        label: s.value,
        modalData: S.value,
        prop: l.value
      }), null, 16, ["modelValue"])) : v.column.type === h(Re).InlineDrop ? (p(), O(g, X({ key: 3 }, v.column.button, {
        prop: l.value,
        onClick: t
      }), {
        default: U(() => [
          Qe(Ze(h(Je)(v.column, l.value, v.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : v.column.type === h(Re).ColumnIndex && v.column.field ? (p(), O(R, me(X({ key: 4 }, {
        ...D.value,
        modelValue: h(Je)(v.column, l.value, v.i, v.columns),
        readMode: !0,
        slotData: y.value,
        label: s.value,
        modalData: S.value,
        prop: l.value
      })), null, 16)) : (p(), w(K, { key: 5 }, [
        Qe(Ze(h(Je)(v.column, l.value, v.i, v.columns)), 1)
      ], 64));
    };
  }
}), It = class It {
};
It.navButtonSlot = "", It.createButtonSlot = "", It.defaultEmptySlot = void 0;
let he = It;
const Nl = ["data-i", "data-draggable"], Ol = ["data-role", "data-i"], $l = {
  key: 1,
  class: "lkt-table-nav-cell"
}, Fl = { class: "lkt-table-nav-container" }, Pl = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, Ul = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, jl = ["colspan"], _l = ["colspan"], zl = ["colspan"], Gl = ["data-column", "colspan", "title"], Hl = /* @__PURE__ */ ke({
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
    rowDisplayType: { type: [Number, Function], default: we.Auto },
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
    const o = ba(), n = i, l = a, t = I(l.modelValue);
    let y = typeof l.rowDisplayType == "function" ? l.rowDisplayType(t.value, l.i) : l.rowDisplayType;
    y || (y = we.Auto);
    const S = [we.Auto, we.PreferCustomItem].includes(y), D = [we.Auto, we.PreferItem].includes(y), s = (c) => n("click", c), v = u(() => {
      let c = [], B = typeof l.disabledDrag == "function" ? l.disabledDrag(t.value) : re.value === !0;
      return !B && l.sortable && l.isDraggable ? c.push("handle") : B && c.push("disabled"), c.join(" ");
    }), T = u(() => he.navButtonSlot !== ""), f = u(() => he.navButtonSlot), g = () => {
      n("item-up", l.i);
    }, R = () => {
      n("item-down", l.i);
    }, A = () => {
      n("item-drop", l.i);
    };
    j(() => l.modelValue, (c) => t.value = c), j(t, (c) => {
      n("update:modelValue", c);
    }, { deep: !0 });
    const tt = u(() => typeof l.renderDrag == "function" ? l.renderDrag(t.value) : l.renderDrag === !0), re = u(() => typeof l.disabledDrag == "function" ? l.disabledDrag(t.value) : l.disabledDrag === !0), ue = u(() => v.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), ae = u(() => {
      let c = [];
      return S && c.push("type-custom-item"), D && c.push("type-item"), typeof l.itemContainerClass == "function" ? c.push(l.itemContainerClass(t.value, l.i)) : l.itemContainerClass !== "" && c.push(l.itemContainerClass), c.join(" ");
    });
    return (c, B) => {
      const se = ie("lkt-button");
      return p(), w("tr", {
        "data-i": c.i,
        "data-draggable": c.isDraggable,
        class: Z(ae.value)
      }, [
        c.sortable && c.editModeEnabled && tt.value ? (p(), w("td", {
          key: 0,
          "data-role": ue.value,
          class: Z(v.value),
          "data-i": c.i
        }, B[2] || (B[2] = [
          ye("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]), 10, Ol)) : V("", !0),
        c.addNavigation && c.editModeEnabled ? (p(), w("td", $l, [
          ye("div", Fl, [
            ge(se, {
              palette: "table-nav",
              disabled: c.i === 0,
              onClick: g
            }, {
              default: U(() => [
                T.value ? (p(), O(be(f.value), {
                  key: 0,
                  direction: "up"
                })) : (p(), w("i", Pl))
              ]),
              _: 1
            }, 8, ["disabled"]),
            ge(se, {
              palette: "table-nav",
              disabled: c.latestRow,
              onClick: R
            }, {
              default: U(() => [
                T.value ? (p(), O(be(f.value), {
                  key: 0,
                  direction: "down"
                })) : (p(), w("i", Ul))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : V("", !0),
        c.itemSlotComponent ? (p(), w("td", {
          key: "td" + c.i,
          colspan: c.visibleColumns.length
        }, [
          (p(), O(be(c.itemSlotComponent), me(ha({
            item: t.value,
            index: c.i,
            editing: c.editModeEnabled,
            perms: c.permissions,
            data: c.itemSlotData,
            events: c.itemSlotEvents
          })), null, 16))
        ], 8, jl)) : h(S) && h(o)[`item-${c.i}`] ? (p(), w("td", {
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
        ], 8, _l)) : h(D) && h(o).item ? (p(), w("td", {
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
        ], 8, zl)) : (p(!0), w(K, { key: 5 }, Ce(c.visibleColumns, (z) => (p(), w(K, null, [
          h(Rl)(z, c.emptyColumns, t.value) ? (p(), w("td", {
            key: "td" + c.i,
            "data-column": z.key,
            colspan: h(ta)(z, t.value),
            title: h(Je)(z, t.value, c.i, c.visibleColumns),
            class: Z(h(Aa)(z)),
            onClick: B[1] || (B[1] = (le) => s(le))
          }, [
            c.$slots[z.key] && h(Ea)(z, t.value) ? F(c.$slots, z.key, {
              key: 0,
              value: t.value[z.key],
              item: t.value,
              column: z,
              i: c.i
            }) : t.value ? (p(), O(xt, {
              key: 1,
              modelValue: t.value,
              "onUpdate:modelValue": B[0] || (B[0] = (le) => t.value = le),
              column: z,
              columns: c.visibleColumns,
              "edit-mode-enabled": c.editModeEnabled,
              "has-inline-edit-perm": c.hasInlineEditPerm,
              i: c.i,
              onInlineDrop: A
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : V("", !0)
          ], 10, Gl)) : V("", !0)
        ], 64))), 256))
      ], 10, Nl);
    };
  }
}), Wt = /* @__PURE__ */ ke({
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
    const o = i, n = a, l = u(() => he.createButtonSlot !== ""), t = u(() => he.createButtonSlot), y = {
      ...(s = n.config) == null ? void 0 : s.modalData,
      beforeClose: (v) => {
        "itemCreated" in v && v.itemCreated === !0 && o("append", v.item);
      }
    }, S = {
      ...n.config
    };
    S.modalData = y;
    const D = () => {
      var v;
      if (!((v = n.config) != null && v.modal)) {
        o("click");
        return;
      }
    };
    return (v, T) => {
      const f = ie("lkt-button");
      return p(), O(f, X(S, {
        disabled: v.disabled,
        onClick: D
      }), {
        default: U(() => [
          l.value ? (p(), O(be(t.value), { key: 0 })) : V("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), ql = ["data-column", "data-sortable", "data-sort", "colspan", "title"], Kl = /* @__PURE__ */ ke({
  __name: "TableHeader",
  props: {
    column: { default: () => new ka() },
    sortBy: { default: "" },
    sortDirection: { default: "" },
    amountOfColumns: { default: 0 },
    items: { default: () => [] }
  },
  emits: [
    "click"
  ],
  setup(a, { emit: i }) {
    const o = i, n = a, l = u(() => Vl(n.column, n.amountOfColumns, n.items)), t = u(() => n.column.sortable === !0), y = u(() => t.value && n.sortBy === n.column.key ? n.sortDirection : ""), S = u(() => Sa(n.column.label)), D = u(() => t.value && n.sortBy === n.column.key ? n.sortDirection === xe.Asc ? Ve.defaultTableSortAscIcon : n.sortDirection === xe.Desc ? Ve.defaultTableSortDescIcon : "" : ""), s = () => o("click", n.column);
    return (v, T) => (p(), w("th", {
      "data-column": v.column.key,
      "data-sortable": t.value,
      "data-sort": y.value,
      colspan: l.value,
      title: S.value,
      class: Z(h(Aa)(v.column)),
      onClick: s
    }, [
      ye("div", null, [
        Qe(Ze(S.value) + " ", 1),
        D.value ? (p(), w("i", {
          key: 0,
          class: Z(D.value)
        }, null, 2)) : V("", !0)
      ])
    ], 10, ql));
  }
}), Xl = ["id"], Yl = { class: "lkt-table-page-buttons" }, Wl = { class: "switch-edition-mode" }, Jl = { class: "switch-edition-mode" }, Ql = {
  key: 0,
  class: "lkt-table-page-buttons"
}, Zl = {
  key: 1,
  class: "lkt-table-page-filters"
}, xl = { class: "lkt-table" }, en = { key: 0 }, tn = { key: 0 }, an = {
  key: 0,
  "data-role": "drag-indicator"
}, ln = { key: 1 }, nn = ["id"], on = ["id"], rn = ["data-i"], un = ["id"], sn = ["data-i"], dn = ["id"], cn = { class: "lkt-carousel-slide" }, vn = { class: "lkt-carousel-slide" }, fn = ["id"], pn = {
  key: 3,
  class: "lkt-table-empty"
}, mn = {
  key: 5,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, gn = /* @__PURE__ */ ke({
  __name: "LktTable",
  props: /* @__PURE__ */ Za({
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
    itemContainerStyle: { type: [String, Function] },
    skipTableItemsContainer: { type: Boolean },
    createEnabledValidator: { type: Function },
    switchableTypes: {},
    switchableTypesButtons: {},
    useItemSlot: { type: [Boolean, Function] },
    filtersForm: {},
    events: {}
  }, ll(nl)),
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
    var ra, ua;
    const n = o, l = ba(), t = a, y = I(typeof t.sorter == "function" ? t.sorter : Al), S = I(Ll(t.columns)), D = I(xe.Asc), s = I(t.modelValue), v = I(null), T = I(t.columns), f = I((ra = t.paginator) == null ? void 0 : ra.modelValue), g = I(t.loading), R = I(!1), A = I(t.perms), tt = I(null), re = I(null), ue = I(null), ae = I({}), c = I(new rl({ items: s.value }, t.dataStateConfig)), B = I(t.editMode), se = I(0), z = I(null), le = I(t.type), de = I(((ua = t.carousel) == null ? void 0 : ua.currentSlide) || 0), ce = I(void 0), Y = I(void 0), Le = I(void 0), at = I({
      ...typeof t.paginator.resourceData == "object" ? t.paginator.resourceData : {}
    }), Me = I({
      ...typeof t.paginator.resourceData == "object" ? t.paginator.resourceData : {}
    }), P = I(Xe(t.saveButton, Ve.defaultSaveButton)), lt = I(Xe(t.createButton, Ve.defaultCreateButton)), De = I(Xe(t.editModeButton, Ve.defaultEditModeButton)), Ut = I(Xe(t.groupButton, Ve.defaultGroupButton));
    j(() => t.saveButton, (e) => P.value = Xe(t.saveButton, Ve.defaultSaveButton)), j(() => t.createButton, (e) => lt.value = Xe(t.createButton, Ve.defaultCreateButton)), j(() => t.editModeButton, (e) => De.value = Xe(t.editModeButton, Ve.defaultEditModeButton));
    const x = I(!1);
    j(g, (e) => n("update:loading", e)), j(f, (e) => n("page", e));
    const nt = (e) => {
      A.value = e;
    }, ft = (e) => {
      var r, L;
      if (Array.isArray(e.data)) {
        let $ = e.data;
        if (typeof ((r = t.events) == null ? void 0 : r.parseResults) == "function" && ($ = t.events.parseResults($)), s.value = [...s.value, ...$], [Ye.TimelineAsc, Ye.TimelineDesc, Ye.TimelineAscDesc].includes((L = t.paginator) == null ? void 0 : L.type)) {
          const _ = dl(s.value, t.paginator.dateKey);
          ce.value = _.oldest, Y.value = _.newest;
        }
      }
      g.value = !1, R.value = !0, c.value.store({ items: s.value }).turnStoredIntoOriginal(), x.value = !1, $t(() => {
        Oe.value, n("read-response", e);
      });
    }, Ne = () => $t(() => {
      var e;
      (!t.paginator || ![Ye.LoadMore, Ye.Infinite].includes((e = t.paginator) == null ? void 0 : e.type)) && s.value.splice(0, s.value.length), g.value = !0;
    }), Et = () => {
      tt.value.doRefresh();
    }, ve = ol(12), je = u(() => {
      if (!t.hideEmptyColumns) return [];
      let e = [];
      return T.value.forEach((r) => {
        let L = r.key, $ = !1;
        s.value.forEach((_) => {
          if (typeof _.checkEmpty == "function")
            return _.checkEmpty(_);
          _[L] && ($ = !0);
        }), $ || e.push(L);
      }), e;
    }), ne = u(() => T.value.filter((e) => !e.hidden)), ot = u(() => T.value.filter((e) => e.isForRowKey)), fe = u(() => T.value.map((e) => e.key)), it = u(() => {
      let e = [];
      for (let r in l) fe.value.indexOf(r) !== -1 && e.push(r);
      return e;
    }), pt = u(() => {
      let e = [];
      for (let r in l) r.indexOf("slide-") !== -1 && e.push(r);
      return e;
    }), mt = u(() => {
      var e;
      return t.hiddenSave || g.value || !((e = P.value) != null && e.resource || P.value.type) ? !1 : B.value && x.value ? !0 : B.value;
    }), jt = u(() => Dt.value && s.value.length >= t.requiredItemsForTopCreate || _e.value ? !0 : mt.value || B.value && pe.value), Oe = u(() => {
      var e, r;
      return se.value, typeof ((e = P.value) == null ? void 0 : e.disabled) == "function" ? P.value.disabled({
        value: s.value,
        dataState: c.value
      }) : typeof ((r = P.value) == null ? void 0 : r.disabled) == "boolean" ? P.value.disabled : !x.value;
    }), _t = u(() => s.value.length), gt = u(() => {
      var e;
      return {
        items: s.value,
        ...(e = P.value) == null ? void 0 : e.resourceData
      };
    }), At = u(() => t.titleTag === "" ? "h2" : t.titleTag), yt = u(() => t.wrapContentTag === "" ? "div" : t.wrapContentTag), rt = u(() => Sa(t.title)), bt = u(() => {
      var e;
      return (e = t.drag) == null ? void 0 : e.enabled;
    }), pe = u(() => A.value.includes(Be.Create)), Te = u(() => A.value.includes("read")), q = u(() => A.value.includes(Be.Update)), $e = u(() => A.value.includes(Be.Edit)), Ie = u(() => A.value.includes(Be.InlineEdit)), ut = u(() => A.value.includes(Be.ModalCreate)), Vt = u(() => A.value.includes(Be.InlineCreate)), ht = u(() => A.value.includes(Be.InlineCreateEver)), W = u(() => A.value.includes(Be.Drop)), kt = u(() => A.value.includes(Be.SwitchEditMode)), _e = u(() => !kt.value || !q.value && !W.value || !q.value && W.value ? !1 : !g.value), st = u(() => {
      var e;
      return (typeof ((e = t.paginator) == null ? void 0 : e.type) < "u" && [Ye.LoadMore, Ye.Infinite].includes(t.paginator.type) || !g.value) && s.value.length > 0;
    }), ze = u(() => T.value.find((e) => e.isForAccordionHeader)), St = u(() => T.value.find((e) => e.isCalendarDate)), Rt = u(() => T.value.find((e) => e.isCalendarGroup)), Ct = (e, r) => typeof t.customItemSlotName == "function" ? t.customItemSlotName(e, r) : "", zt = (e) => {
      let r = e.target;
      if (typeof r.dataset.column > "u")
        do
          r = r.parentNode;
        while (typeof r.dataset.column > "u" && r.tagName !== "TABLE" && r.tagName !== "body");
      if (r.tagName === "TD" && (r = r.parentNode, r = r.dataset.i, typeof r < "u"))
        return s.value[r];
    }, oe = () => {
      se.value = cl();
    }, d = (e) => s.value[e], k = (e) => {
      var r;
      return (r = v.value) == null ? void 0 : r.querySelector(`[data-i="${e}"]`);
    }, C = (e) => {
      e && e.sortable && (e.key === S.value && (D.value = D.value === xe.Asc ? xe.Desc : xe.Asc), S.value = e.key, s.value = s.value.sort((r, L) => y.value(r, L, e, D.value)), oe(), n("sort", {
        sortBy: S.value,
        sortDirection: D.value
      }));
    }, E = (e) => {
      n("click", e);
    }, N = (e) => {
      var L, $, _, G, He, Fe, Pe, Ue;
      let r = parseInt((G = (_ = ($ = (L = e == null ? void 0 : e.originalEvent) == null ? void 0 : L.toElement) == null ? void 0 : $.closest("tr")) == null ? void 0 : _.dataset) == null ? void 0 : G.i);
      return !(typeof ((He = t.drag) == null ? void 0 : He.isValid) == "function" && !((Fe = t.drag) != null && Fe.isValid(s.value[r])) || typeof ((Pe = t.drag) == null ? void 0 : Pe.isValid) == "boolean" && !((Ue = t.drag) != null && Ue.isValid));
    }, Q = (e) => {
      var r, L;
      return typeof ((r = t.drag) == null ? void 0 : r.isDraggable) == "function" ? (L = t.drag) == null ? void 0 : L.isDraggable(e) : !0;
    }, ee = () => {
      if (pe.value) {
        n("click-create");
        return;
      }
      if (Vt.value || ht.value) {
        if (typeof t.newValueGenerator == "function") {
          let e = t.newValueGenerator();
          if (typeof e == "object" || Se.value !== Ee.Table) {
            s.value.push(e);
            return;
          }
        }
        s.value.push({});
      } else
        n("click-create");
    }, te = (e) => {
      s.value.push(e);
    }, dt = () => g.value = !0, ct = () => g.value = !1, Lt = (e, r) => {
      var L, $, _;
      if (!((L = P.value) != null && L.type && [
        Xt.Split,
        Xt.SplitEver,
        Xt.SplitLazy
      ].includes(($ = P.value) == null ? void 0 : $.type))) {
        if (n("before-save"), (_ = P.value) != null && _.resource && (g.value = !1, !r.success)) {
          n("error", r.httpStatus);
          return;
        }
        c.value.turnStoredIntoOriginal(), x.value = !1, n("save", r);
      }
    }, aa = (e, r, L) => {
      if (L >= e.length) {
        let $ = L - e.length + 1;
        for (; $--; ) e.push(void 0);
      }
      return e.splice(L, 0, e.splice(r, 1)[0]), e;
    }, Va = (e) => {
      aa(s.value, e, e - 1), oe();
    }, Ra = (e) => {
      aa(s.value, e, e + 1), oe();
    }, wt = (e) => {
      s.value.splice(e, 1), oe();
    }, la = () => {
      var e;
      ae.value && typeof ((e = ae.value) == null ? void 0 : e.destroy) == "function" && (ae.value.destroy(), ae.value = {});
    }, Gt = () => {
      z.value || (z.value = document.getElementById("lkt-table-body-" + ve)), ae.value = new ul(z.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let r = e.oldIndex, L = e.newIndex;
          s.value.splice(L, 0, s.value.splice(r, 1)[0]), oe(), n("drag-end", s.value[L]);
        },
        onMove: function(e, r) {
          return N(e);
        }
      });
    }, Mt = (e, r, L = !1) => {
      let $ = [se.value, ve, "row", r];
      return L && $.push("hidden"), ot.value.forEach((_) => {
        let G = String(e[_.key]).toLowerCase();
        G.length > 50 && (G = G.substring(0, 50)), G = il(G, " ", "-"), $.push(G);
      }), $.join("-");
    }, Ht = u(() => typeof t.createEnabledValidator == "function" ? t.createEnabledValidator({ items: s.value }) : !0), Dt = u(() => t.createButton === !1 ? !1 : ht.value || pe.value && B.value || Vt.value && B.value || ut.value && B.value), La = u(() => [Ee.Ol, Ee.Ul].includes(Se.value)), Tt = (e, r) => typeof t.itemDisplayChecker == "function" ? t.itemDisplayChecker(e, r) : !0, Nt = (e, r) => typeof t.itemContainerClass == "function" ? t.itemContainerClass(e, r) : t.itemContainerClass, na = (e, r) => typeof t.itemContainerStyle == "function" ? t.itemContainerStyle(e, r) : t.itemContainerStyle, Ma = (e, r) => ze.value ? e[ze.value.key] : "", Ge = u(() => typeof t.itemSlotComponent == "function" ? t.itemSlotComponent() : t.itemSlotComponent), Ot = u(() => typeof t.itemSlotData == "function" ? t.itemSlotData() : t.itemSlotData);
    ea(() => {
      var e;
      t.initialSorting && C(Ml(t.columns, S.value)), c.value.store({ items: s.value }).turnStoredIntoOriginal(), x.value = !1, (e = t.drag) != null && e.enabled && $t(() => {
        Gt();
      });
    }), j(() => {
      var e;
      return (e = t.drag) == null ? void 0 : e.enabled;
    }, (e) => {
      e ? Gt() : la();
    }), j(() => t.type, (e) => {
      var r;
      (r = t.drag) != null && r.enabled ? Gt() : la();
    }), j(() => t.perms, (e) => A.value = e), j(A, (e) => n("update:perms", e)), j(B, (e) => {
      n("update:editMode", e);
    }), j(() => t.editMode, (e) => B.value = e), j(() => t.columns, (e) => T.value = e, { deep: !0 }), j(() => t.modelValue, (e) => {
      s.value = e;
    }, { deep: !0 }), j(s, (e) => {
      c.value.increment({ items: e }), x.value = c.value.changed(), n("update:modelValue", e);
    }, { deep: !0 }), i({
      getItemByEvent: zt,
      getItemByIndex: d,
      getRowByIndex: k,
      doRefresh: Et,
      doRemoveIndex: (e) => {
        s.value.splice(e, 1), oe();
      },
      getHtml: () => re.value,
      reRender: oe,
      turnStoredIntoOriginal: () => {
        c.value.turnStoredIntoOriginal(), $t(() => {
          oe();
        });
      }
    });
    const Na = u(() => typeof he.defaultEmptySlot < "u"), Oa = u(() => he.defaultEmptySlot), $a = u(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled ? !1 : typeof t.drag.canRender > "u" ? !0 : t.drag.canRender), Fa = u(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled || typeof t.drag.isDisabled > "u" ? !1 : t.drag.isDisabled), Pa = u(() => typeof t.header == "object" && Object.keys(t.header).length > 0), Ua = u(() => (console.log("displayFiltersLktForm: ", typeof t.filtersForm == "object" && Object.keys(t.filtersForm).length > 0), typeof t.filtersForm == "object" && Object.keys(t.filtersForm).length > 0)), Se = u(() => Array.isArray(t.switchableTypes) && t.switchableTypes.length > 0 ? le.value : t.type), ja = u(() => Array.isArray(t.switchableTypes) ? t.switchableTypes.length > 0 ? t.switchableTypes.includes(t.type) ? t.switchableTypes : [
      t.type,
      ...t.switchableTypes
    ] : [] : []), _a = u(() => {
      let e = [];
      return ja.value.forEach((r) => {
        let L = t.switchableTypesButtons[r];
        e.push({
          ...L,
          class: [L.class, r === Se.value ? "is-current" : ""].join(" "),
          events: {
            click: ($) => {
              var _, G;
              le.value = r, typeof ((_ = t.switchableTypesButtons[r].events) == null ? void 0 : _.click) == "function" && t.switchableTypesButtons[r].events.click($), typeof ((G = t.events) == null ? void 0 : G.viewChanged) == "function" && t.events.viewChanged(r);
            }
          }
        });
      }), e;
    }), za = u(() => {
      var e, r;
      return {
        ...t.header,
        topEndButtons: [
          ...typeof ((e = t.header) == null ? void 0 : e.topEndButtons) > "u" ? [] : (r = t.header) == null ? void 0 : r.topEndButtons,
          ..._a.value
        ]
      };
    }), oa = (e, r) => typeof t.useItemSlot == "function" ? t.useItemSlot({ item: e, index: r }) === !0 : t.useItemSlot, Ga = u(() => {
      if (Se.value !== Ee.Calendar || !St.value || typeof St.value > "u") return [];
      let e = [], r = [];
      return s.value.forEach((L) => {
        var Ue;
        let $ = L[St.value.key], _ = sl("Y-m-d H:i:s", $), G;
        (Ue = Rt.value) != null && Ue.key && (G = L[Rt.value.key]);
        let He = {};
        G && t.calendarGroups && typeof t.calendarGroups[G] == "object" && (He = t.calendarGroups[G]);
        const Fe = [_, G].join("-");
        let Pe = -1;
        r.includes(Fe) ? Pe = r.findIndex((b) => b === Fe) : (Pe = r.length, r.push(Fe), e.push({
          date: $,
          data: {
            items: []
          },
          dot: {
            ...He,
            class: `lkt-calendar-group--${G}`
          }
        })), e[Pe].data.items.push(L);
      }), e;
    }), Ha = {
      dayPicked: (e) => {
        var r;
        typeof ((r = t.calendar.events) == null ? void 0 : r.dayPicked) == "function" && t.calendar.events.dayPicked(e);
      },
      visibleMonthChanged: (e) => {
        var r;
        typeof ((r = t.calendar.events) == null ? void 0 : r.visibleMonthChanged) == "function" && t.calendar.events.visibleMonthChanged(e), Le.value = e.visibleDate;
      }
    };
    let ia = null;
    return j(at, () => {
      clearTimeout(ia), ia = setTimeout(() => {
        Me.value = {
          ...Me.value,
          ...at.value
        };
      }, 400);
    }, { deep: !0 }), (e, r) => {
      const L = ie("lkt-header"), $ = ie("lkt-button"), _ = ie("lkt-form"), G = ie("lkt-accordion"), He = ie("lkt-calendar"), Fe = ie("lkt-loader"), Pe = ie("lkt-paginator");
      return p(), w("section", {
        ref_key: "element",
        ref: re,
        class: "lkt-table-page",
        id: "lkt-table-page-" + h(ve)
      }, [
        Pa.value ? (p(), O(L, me(X({ key: 0 }, za.value)), null, 16)) : rt.value || h(l).title ? (p(), w("header", {
          key: 1,
          class: Z(e.headerClass)
        }, [
          rt.value ? (p(), O(be(At.value), { key: 0 }, {
            default: U(() => [
              e.titleIcon ? (p(), w("i", {
                key: 0,
                class: Z(e.titleIcon)
              }, null, 2)) : V("", !0),
              Qe(" " + Ze(rt.value), 1)
            ]),
            _: 1
          })) : V("", !0),
          h(l).title ? F(e.$slots, "title", { key: 1 }) : V("", !0)
        ], 2)) : V("", !0),
        (p(), O(be(yt.value), {
          class: Z(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: U(() => {
            var Ue;
            return [
              qe(ye("div", Yl, [
                e.groupButton !== !1 ? (p(), O($, X({
                  key: 0,
                  ref: "groupButton"
                }, Ut.value, { class: "lkt-item-crud-group-button" }), {
                  split: U(() => [
                    ye("div", Wl, [
                      qe(ge($, X(De.value, {
                        checked: B.value,
                        "onUpdate:checked": r[0] || (r[0] = (b) => B.value = b)
                      }), null, 16, ["checked"]), [
                        [Ke, _e.value]
                      ])
                    ]),
                    h(l)["prev-buttons-ever"] ? F(e.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: q.value,
                      canDrop: W.value,
                      perms: e.perms
                    }) : V("", !0),
                    h(l)["prev-buttons"] ? F(e.$slots, "prev-buttons", {
                      key: 1,
                      canUpdate: q.value,
                      canDrop: W.value,
                      perms: e.perms
                    }) : V("", !0),
                    qe(ge($, X({
                      class: "lkt-table--save-button",
                      ref_key: "saveButtonRef",
                      ref: ue
                    }, {
                      ...P.value,
                      disabled: Oe.value,
                      resourceData: gt.value
                    }, {
                      onLoading: dt,
                      onLoaded: ct,
                      onClick: Lt
                    }), {
                      split: U(({ doClose: b, doRootClick: m }) => [
                        F(e.$slots, "button-save-split", {
                          doClose: b,
                          doRootClick: m,
                          dataState: c.value,
                          onButtonLoading: dt,
                          onButtonLoaded: ct
                        })
                      ]),
                      default: U(() => [
                        h(l)["button-save"] ? F(e.$slots, "button-save", {
                          key: 0,
                          items: s.value,
                          editMode: e.editMode,
                          canUpdate: !Oe.value
                        }) : V("", !0)
                      ]),
                      _: 3
                    }, 16), [
                      [Ke, mt.value]
                    ]),
                    Dt.value && s.value.length >= e.requiredItemsForTopCreate ? (p(), O(Wt, {
                      key: 2,
                      config: lt.value,
                      disabled: !Ht.value,
                      onClick: ee,
                      onAppend: te
                    }, null, 8, ["config", "disabled"])) : V("", !0)
                  ]),
                  _: 3
                }, 16)) : V("", !0),
                h(l)["prev-buttons-ever"] ? F(e.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: q.value,
                  canDrop: W.value,
                  perms: e.perms
                }) : V("", !0),
                h(l)["prev-buttons"] ? F(e.$slots, "prev-buttons", {
                  key: 2,
                  canUpdate: q.value,
                  canDrop: W.value,
                  perms: e.perms
                }) : V("", !0),
                qe(ge($, X({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: ue
                }, {
                  ...P.value,
                  disabled: Oe.value,
                  resourceData: gt.value
                }, {
                  onLoading: dt,
                  onLoaded: ct,
                  onClick: Lt
                }), {
                  split: U(({ doClose: b, doRootClick: m }) => [
                    F(e.$slots, "button-save-split", {
                      doClose: b,
                      doRootClick: m,
                      dataState: c.value,
                      onButtonLoading: dt,
                      onButtonLoaded: ct
                    })
                  ]),
                  default: U(() => [
                    h(l)["button-save"] ? F(e.$slots, "button-save", {
                      key: 0,
                      items: s.value,
                      editMode: e.editMode,
                      canUpdate: !Oe.value
                    }) : V("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [Ke, mt.value]
                ]),
                Dt.value && s.value.length >= e.requiredItemsForTopCreate ? (p(), O(Wt, {
                  key: 3,
                  config: lt.value,
                  disabled: !Ht.value,
                  onClick: ee,
                  onAppend: te
                }, null, 8, ["config", "disabled"])) : V("", !0),
                ye("div", Jl, [
                  qe(ge($, X(De.value, {
                    checked: B.value,
                    "onUpdate:checked": r[1] || (r[1] = (b) => B.value = b)
                  }), null, 16, ["checked"]), [
                    [Ke, _e.value]
                  ])
                ])
              ], 512), [
                [Ke, jt.value]
              ]),
              h(l).buttons ? (p(), w("div", Ql, [
                F(e.$slots, "buttons")
              ])) : V("", !0),
              R.value && h(l).filters ? (p(), w("div", Zl, [
                F(e.$slots, "filters", {
                  items: s.value,
                  isLoading: g.value
                })
              ])) : V("", !0),
              Ua.value ? (p(), O(_, X({
                key: 2,
                modelValue: at.value,
                "onUpdate:modelValue": r[2] || (r[2] = (b) => at.value = b),
                editing: e.editMode,
                "onUpdate:editing": r[3] || (r[3] = (b) => e.editMode = b),
                perms: e.perms,
                "onUpdate:perms": r[4] || (r[4] = (b) => e.perms = b)
              }, {
                form: e.filtersForm
              }), null, 16, ["modelValue", "editing", "perms"])) : V("", !0),
              qe(ye("div", xl, [
                Se.value === h(Ee).Table ? (p(), w("table", en, [
                  e.hideTableHeader ? V("", !0) : (p(), w("thead", tn, [
                    ye("tr", null, [
                      bt.value && B.value ? (p(), w("th", an)) : V("", !0),
                      e.addNavigation && B.value ? (p(), w("th", ln)) : V("", !0),
                      (p(!0), w(K, null, Ce(ne.value, (b) => (p(), w(K, null, [
                        je.value.indexOf(b.key) === -1 ? (p(), O(Kl, {
                          key: 0,
                          column: b,
                          "sort-by": S.value,
                          "sort-direction": D.value,
                          "amount-of-columns": e.columns.length,
                          items: s.value,
                          onClick: (m) => C(b)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : V("", !0)
                      ], 64))), 256))
                    ])
                  ])),
                  ye("tbody", {
                    ref_key: "tableBody",
                    ref: v,
                    id: "lkt-table-body-" + h(ve),
                    class: Z(e.itemsContainerClass)
                  }, [
                    (p(!0), w(K, null, Ce(s.value, (b, m) => qe((p(), O(Hl, {
                      modelValue: s.value[m],
                      "onUpdate:modelValue": (M) => s.value[m] = M,
                      key: Mt(b, m),
                      i: m,
                      "is-draggable": Q(b),
                      sortable: bt.value,
                      "visible-columns": ne.value,
                      "empty-columns": je.value,
                      "add-navigation": e.addNavigation,
                      "latest-row": m + 1 === _t.value,
                      "can-drop": W.value && B.value,
                      "can-edit": $e.value && q.value && B.value,
                      "can-read": Te.value,
                      "can-create": pe.value,
                      "edit-mode-enabled": B.value,
                      "has-inline-edit-perm": Ie.value,
                      "row-display-type": e.rowDisplayType,
                      "render-drag": $a.value,
                      "disabled-drag": Fa.value,
                      "is-loading": g.value,
                      "item-container-class": e.itemContainerClass,
                      "item-slot-component": Ge.value,
                      "item-slot-data": Ot.value,
                      "item-slot-events": e.itemSlotEvents,
                      permissions: A.value,
                      onClick: E,
                      onItemUp: Va,
                      onItemDown: Ra,
                      onItemDrop: wt
                    }, xa({ _: 2 }, [
                      h(l)[`item-${m}`] && oa(e.row, m) ? {
                        name: `item-${m}`,
                        fn: U((M) => [
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
                      } : h(l).item && oa(e.row, m) ? {
                        name: "item",
                        fn: U((M) => [
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
                      Ce(it.value, (M) => ({
                        name: M,
                        fn: U((vt) => [
                          F(e.$slots, M, me({
                            [e.slotItemVar || ""]: vt.item,
                            value: vt.value,
                            column: vt.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class", "item-slot-component", "item-slot-data", "item-slot-events", "permissions"])), [
                      [Ke, Tt(s.value[m], m)]
                    ])), 128))
                  ], 10, nn)
                ])) : Se.value === h(Ee).Item ? (p(), w("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + h(ve),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (p(!0), w(K, null, Ce(s.value, (b, m) => (p(), w(K, {
                    key: Mt(b, m)
                  }, [
                    !e.skipTableItemsContainer && Tt(b, m) ? (p(), w("div", {
                      key: 0,
                      class: Z(["lkt-table-item", Nt(b, m)]),
                      style: da(na(b, m)),
                      "data-i": m
                    }, [
                      Ge.value ? (p(), O(be(Ge.value), X({
                        key: 0,
                        ref_for: !0
                      }, {
                        item: b,
                        index: m,
                        editing: B.value,
                        perms: A.value,
                        data: Ot.value,
                        events: e.itemSlotEvents
                      }), null, 16)) : F(e.$slots, "item", me({
                        key: 1,
                        [e.slotItemVar || ""]: b,
                        index: m,
                        editing: B.value,
                        canCreate: pe.value,
                        canRead: Te.value,
                        canUpdate: q.value,
                        canDrop: W.value,
                        isLoading: g.value,
                        doDrop: () => wt(m)
                      }))
                    ], 14, rn)) : Tt(b, m) ? F(e.$slots, "item", me({
                      key: 1,
                      class: Nt(b, m),
                      dataI: m,
                      [e.slotItemVar || ""]: b,
                      index: m,
                      editing: B.value,
                      canCreate: pe.value,
                      canRead: Te.value,
                      canUpdate: q.value,
                      canDrop: W.value,
                      isLoading: g.value,
                      doDrop: () => wt(m)
                    })) : V("", !0)
                  ], 64))), 128))
                ], 10, on)) : Se.value === h(Ee).Accordion ? (p(), w("div", {
                  key: 2,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + h(ve),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (p(!0), w(K, null, Ce(s.value, (b, m) => (p(), w(K, null, [
                    [h(we).Auto, h(we).PreferCustomItem].includes(e.rowDisplayType) && h(l)[Ct(b, m)] ? F(e.$slots, Ct(b, m), {
                      key: 0,
                      item: b,
                      index: m,
                      editing: B.value,
                      isLoading: g.value
                    }) : [h(we).Auto, h(we).PreferCustomItem].includes(e.rowDisplayType) && h(l)[`item-${m}`] ? F(e.$slots, `item-${m}`, {
                      key: 1,
                      item: b,
                      index: m,
                      editing: B.value,
                      isLoading: g.value
                    }) : (p(), w(K, { key: 2 }, [
                      Tt(b, m) ? (p(), O(G, X({
                        class: ["lkt-table-item", Nt(b, m)],
                        "data-i": m,
                        key: Mt(b, m)
                      }, { ref_for: !0 }, {
                        ...e.accordion,
                        title: Ma(b)
                      }), {
                        header: U(() => [
                          ge(xt, {
                            modelValue: s.value[m],
                            "onUpdate:modelValue": (M) => s.value[m] = M,
                            i: m,
                            column: ze.value,
                            columns: ne.value,
                            "edit-mode-enabled": B.value,
                            "has-inline-edit-perm": Ie.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])
                        ]),
                        default: U(() => [
                          (p(!0), w(K, null, Ce(ne.value, (M) => {
                            var vt, sa;
                            return p(), w(K, null, [
                              M.key !== ((vt = ze.value) == null ? void 0 : vt.key) && e.$slots[M.key] && h(Ea)(M, s.value[m]) ? F(e.$slots, M.key, {
                                key: 0,
                                value: s.value[m][M.key],
                                item: s.value[m],
                                column: M,
                                i: m
                              }) : (p(), w(K, { key: 1 }, [
                                M.key !== ((sa = ze.value) == null ? void 0 : sa.key) ? (p(), O(xt, {
                                  key: 0,
                                  modelValue: s.value[m],
                                  "onUpdate:modelValue": (qa) => s.value[m] = qa,
                                  i: m,
                                  column: M,
                                  columns: ne.value,
                                  "edit-mode-enabled": B.value,
                                  "has-inline-edit-perm": Ie.value
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])) : V("", !0)
                              ], 64))
                            ], 64);
                          }), 256))
                        ]),
                        _: 2
                      }, 1040, ["class", "data-i"])) : V("", !0)
                    ], 64))
                  ], 64))), 256))
                ], 10, un)) : La.value ? (p(), O(be(Se.value), {
                  key: 3,
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, {
                  default: U(() => [
                    (p(!0), w(K, null, Ce(s.value, (b, m) => (p(), w(K, {
                      key: Mt(b, m)
                    }, [
                      Tt(b, m) ? (p(), w("li", {
                        key: 0,
                        class: Z(["lkt-table-item", Nt(b, m)]),
                        "data-i": m,
                        style: da(na(b, m))
                      }, [
                        Ge.value ? (p(), O(be(Ge.value), X({
                          key: 0,
                          ref_for: !0
                        }, {
                          item: b,
                          index: m,
                          editing: B.value,
                          perms: A.value,
                          data: Ot.value,
                          events: e.itemSlotEvents
                        }), null, 16)) : F(e.$slots, "item", me({
                          key: 1,
                          [e.slotItemVar || ""]: b,
                          index: m,
                          editing: B.value,
                          canCreate: pe.value,
                          canRead: Te.value,
                          canUpdate: q.value,
                          canDrop: W.value,
                          isLoading: g.value,
                          doDrop: () => wt(m)
                        }))
                      ], 14, sn)) : V("", !0)
                    ], 64))), 128))
                  ]),
                  _: 3
                }, 8, ["class"])) : Se.value === h(Ee).Carousel ? (p(), w("div", {
                  key: 4,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + h(ve),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  ge(h(Dl), X({
                    modelValue: de.value,
                    "onUpdate:modelValue": r[5] || (r[5] = (b) => de.value = b)
                  }, e.carousel, {
                    "wrap-around": ((Ue = e.carousel) == null ? void 0 : Ue.infinite) === !0
                  }), {
                    addons: U(() => [
                      ge(h(Bl)),
                      ge(h(El))
                    ]),
                    default: U(() => [
                      (p(!0), w(K, null, Ce(pt.value, (b, m) => (p(), O(h(ga), {
                        key: b,
                        index: m
                      }, {
                        default: U(() => [
                          ye("div", cn, [
                            F(e.$slots, b)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (p(!0), w(K, null, Ce(s.value, (b, m) => (p(), O(h(ga), {
                        key: e.slide,
                        index: m
                      }, {
                        default: U(() => [
                          ye("div", vn, [
                            Ge.value ? (p(), O(be(Ge.value), X({
                              key: 0,
                              ref_for: !0
                            }, {
                              item: b,
                              index: m,
                              editing: B.value,
                              perms: A.value,
                              data: Ot.value,
                              events: e.itemSlotEvents
                            }), null, 16)) : F(e.$slots, "item", me({
                              key: 1,
                              [e.slotItemVar || ""]: b,
                              index: m,
                              editing: B.value,
                              canCreate: pe.value,
                              canRead: Te.value,
                              canUpdate: q.value,
                              canDrop: W.value,
                              isLoading: g.value,
                              doDrop: () => wt(m)
                            }))
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128))
                    ]),
                    _: 3
                  }, 16, ["modelValue", "wrap-around"])
                ], 10, dn)) : Se.value === h(Ee).Calendar ? (p(), w("div", {
                  key: 5,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + h(ve),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  ge(He, me(ha({
                    ...e.calendar,
                    items: Ga.value,
                    events: Ha
                  })), null, 16)
                ], 10, fn)) : V("", !0)
              ], 512), [
                [Ke, st.value]
              ]),
              !g.value && s.value.length === 0 ? (p(), w("div", pn, [
                h(l).empty ? F(e.$slots, "empty", { key: 0 }) : Na.value ? (p(), O(be(Oa.value), {
                  key: 1,
                  message: e.noResultsText
                }, null, 8, ["message"])) : e.noResultsText ? (p(), w(K, { key: 2 }, [
                  Qe(Ze(e.noResultsText), 1)
                ], 64)) : V("", !0)
              ])) : V("", !0),
              g.value ? (p(), O(Fe, { key: 4 })) : V("", !0),
              Dt.value || h(l).bottomButtons ? (p(), w("div", mn, [
                Dt.value && s.value.length >= e.requiredItemsForBottomCreate ? (p(), O(Wt, {
                  key: 0,
                  config: lt.value,
                  disabled: !Ht.value,
                  onClick: ee,
                  onAppend: te
                }, null, 8, ["config", "disabled"])) : V("", !0),
                F(e.$slots, "bottom-buttons")
              ])) : V("", !0),
              e.paginator && Object.keys(e.paginator).length > 0 ? (p(), O(Pe, X({
                key: 6,
                ref_key: "paginatorRef",
                ref: tt
              }, {
                ...e.paginator,
                resourceData: Me.value,
                timelineOldestDate: ce.value,
                timelineNewestDate: Y.value,
                timelineVisibleDate: Le.value
              }, {
                modelValue: f.value,
                "onUpdate:modelValue": r[6] || (r[6] = (b) => f.value = b),
                onLoading: Ne,
                onPerms: nt,
                onResponse: ft
              }), null, 16, ["modelValue"])) : V("", !0),
              h(l)["web-element-actions"] ? F(e.$slots, "web-element-actions", { key: 7 }) : V("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, Xl);
    };
  }
}), Dn = {
  install: (a) => {
    a.component("lkt-table") === void 0 && a.component("lkt-table", gn);
  }
}, Tn = (a) => (he.navButtonSlot = a, !0), In = (a) => (he.createButtonSlot = a, !0), Bn = (a) => {
  he.defaultEmptySlot = a;
};
export {
  Vn as Column,
  Rn as createColumn,
  Dn as default,
  Al as defaultTableSorter,
  In as setTableCreateButtonSlot,
  Bn as setTableEmptySlot,
  Tn as setTableNavButtonSlot
};
