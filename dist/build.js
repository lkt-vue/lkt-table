import { defineComponent as ke, computed as r, ref as I, shallowReactive as Jt, watch as U, watchEffect as qt, onMounted as ea, onBeforeUnmount as Ka, reactive as Kt, provide as ya, h as J, useId as Xa, inject as Bt, getCurrentInstance as Ya, onUnmounted as Wa, onUpdated as Ja, cloneVNode as Qa, resolveComponent as ie, createBlock as O, createElementBlock as C, unref as y, openBlock as v, mergeProps as X, withCtx as P, createTextVNode as Qe, toDisplayString as Ze, normalizeProps as pe, Fragment as K, useSlots as ba, normalizeClass as Z, createCommentVNode as x, createElementVNode as ye, createVNode as ge, resolveDynamicComponent as be, guardReactiveProps as ha, renderSlot as $, renderList as we, mergeDefaults as Za, nextTick as Ot, withDirectives as Ke, vShow as Xe, createSlots as _a, normalizeStyle as da } from "vue";
import { __ as el } from "lkt-i18n";
import { ColumnType as Re, FieldType as We, MultipleOptionsDisplay as tl, SortDirection as _e, Column as ka, extractPropValue as al, TableRowType as De, extractI18nValue as Sa, LktSettings as Ve, ensureButtonConfig as Ye, TablePermission as Ae, PaginatorType as Ce, TableType as Ee, getDefaultValues as ll, Table as nl, ButtonType as Xt } from "lkt-vue-kernel";
import { Column as xn, createColumn as Vn } from "lkt-vue-kernel";
import { generateRandomString as ol, replaceAll as il } from "lkt-string-tools";
import { DataState as ul } from "lkt-data-state";
import rl from "sortablejs";
import { date as sl, findOldestAndNewestDateInObjects as dl, time as cl } from "lkt-date-tools";
/**
 * Vue 3 Carousel 0.14.0
 * (c) 2025
 * @license MIT
 */
const Ca = ["viewport", "carousel"], Ft = {
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
}, et = Symbol("carousel"), fl = (e) => {
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
function ml(e) {
  return e.length === 0 ? 0 : e.reduce((o, n) => o + n, 0) / e.length;
}
function ca({ slides: e, position: i, toShow: o }) {
  const n = [], l = i === "before", t = l ? -o : 0, p = l ? 0 : o;
  if (e.length <= 0)
    return n;
  for (let h = t; h < p; h++) {
    const s = {
      index: l ? h : h + e.length,
      isClone: !0,
      position: i,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${i}-${h}`
    }, k = e[(h % e.length + e.length) % e.length].vnode, T = Qa(k, s);
    T.el = null, n.push(T);
  }
  return n;
}
const pl = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function va(e) {
  if (!e.el || !(e.el instanceof Element))
    return;
  const i = e.el.querySelectorAll(pl);
  for (const o of i)
    o instanceof HTMLElement && !o.hasAttribute("disabled") && o.getAttribute("aria-hidden") !== "true" && o.setAttribute("tabindex", "-1");
}
function gl(e, i) {
  return Object.keys(e).filter((o) => !i.includes(o)).reduce((o, n) => (o[n] = e[n], o), {});
}
function yl(e) {
  const { isVertical: i, isReversed: o, dragged: n, effectiveSlideSize: l } = e, t = i ? n.y : n.x;
  if (t === 0)
    return 0;
  const p = Math.round(t / l);
  return o ? p : -p;
}
function xe({ val: e, max: i, min: o }) {
  return i < o ? e : Math.min(Math.max(e, isNaN(o) ? e : o), isNaN(i) ? e : i);
}
function bl(e) {
  const { transform: i } = window.getComputedStyle(e);
  return i.split(/[(,)]/).slice(1, -1).map((o) => parseFloat(o));
}
function hl(e) {
  let i = 1, o = 1;
  return e.forEach((n) => {
    const l = bl(n);
    l.length === 6 && (i /= l[0], o /= l[3]);
  }), { widthMultiplier: i, heightMultiplier: o };
}
function kl(e, i) {
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
function Sl(e, i, o) {
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
  return n !== void 0 ? kl(o, n) : e !== void 0 && i !== void 0 ? Sl(o, e, i) : 0;
}
function Ia(e = "", i = {}) {
  return Object.entries(i).reduce((o, [n, l]) => o.replace(`{${n}}`, String(l)), e);
}
function Ba({ val: e, max: i, min: o = 0 }) {
  const n = i - o + 1;
  return ((e - o) % n + n) % n + o;
}
function Yt(e, i = 0) {
  let o = !1, n = 0, l = null;
  function t(...p) {
    if (o)
      return;
    o = !0;
    const h = () => {
      l = requestAnimationFrame((D) => {
        D - n > i ? (n = D, e(...p), o = !1) : h();
      });
    };
    h();
  }
  return t.cancel = () => {
    l && (cancelAnimationFrame(l), l = null, o = !1);
  }, t;
}
function $t(e, i = "px") {
  if (!(e == null || e === ""))
    return typeof e == "number" || parseFloat(e).toString() === e ? `${e}${i}` : e;
}
const Cl = ke({
  name: "CarouselAria",
  setup() {
    const e = Bt(et);
    return e ? () => J("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, Ia(e.config.i18n.itemXofY, {
      currentSlide: e.currentSlide + 1,
      slidesCount: e.slidesCount
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
    validator(e) {
      return Ca.includes(e);
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
      return Ta.includes(e);
    }
  },
  slideEffect: {
    type: String,
    default: H.slideEffect,
    validator(e) {
      return Da.includes(e);
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
      if (!wa.includes(e))
        return !1;
      const o = e in Ft ? Ft[e] : e;
      return ["ttb", "btt"].includes(o) && (!i.height || i.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${e}" is not supported with height "auto".`), !0;
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
  setup(e, { slots: i, emit: o, expose: n }) {
    var l;
    const t = fl(o), p = t.getSlides(), h = r(() => p.length), D = I(null), s = I(null), k = I(0), T = r(() => Object.assign(Object.assign(Object.assign({}, H), gl(e, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, H.i18n), e.i18n) })), c = Jt(Object.assign({}, T.value)), m = I((l = e.modelValue) !== null && l !== void 0 ? l : 0), V = I(m.value);
    U(m, (d) => V.value = d);
    const B = I(0), tt = r(() => Math.ceil((h.value - 1) / 2)), ue = r(() => h.value - 1), re = r(() => 0);
    let ae = null, R = null, w = null;
    const se = r(() => k.value + c.gap), z = r(() => {
      const d = c.dir || "ltr";
      return d in Ft ? Ft[d] : d;
    }), le = r(() => ["rtl", "btt"].includes(z.value)), de = r(() => ["ttb", "btt"].includes(z.value)), ce = r(() => c.itemsToShow === "auto"), Y = r(() => de.value ? "height" : "width");
    function Le() {
      var d;
      if (!je.value)
        return;
      const b = (T.value.breakpointMode === "carousel" ? (d = D.value) === null || d === void 0 ? void 0 : d.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, S = Object.keys(e.breakpoints || {}).map((N) => Number(N)).sort((N, Q) => +Q - +N), A = {};
      S.some((N) => b >= N ? (Object.assign(A, e.breakpoints[N]), A.i18n && Object.assign(A.i18n, T.value.i18n, e.breakpoints[N].i18n), !0) : !1), Object.assign(c, T.value, A);
    }
    const at = Yt(() => {
      Le(), nt(), _();
    }), Ne = Jt(/* @__PURE__ */ new Set()), F = I([]);
    function lt({ widthMultiplier: d, heightMultiplier: b }) {
      F.value = p.map((S) => {
        var A;
        const N = (A = S.exposed) === null || A === void 0 ? void 0 : A.getBoundingRect();
        return {
          width: N.width * d,
          height: N.height * b
        };
      });
    }
    const Te = I({
      width: 0,
      height: 0
    });
    function Pt({ widthMultiplier: d, heightMultiplier: b }) {
      var S;
      const A = ((S = s.value) === null || S === void 0 ? void 0 : S.getBoundingClientRect()) || { width: 0, height: 0 };
      Te.value = {
        width: A.width * d,
        height: A.height * b
      };
    }
    function _() {
      if (!s.value)
        return;
      const d = hl(Ne);
      if (Pt(d), lt(d), ce.value)
        k.value = ml(F.value.map((b) => b[Y.value]));
      else {
        const b = Number(c.itemsToShow), S = (b - 1) * c.gap;
        k.value = (Te.value[Y.value] - S) / b;
      }
    }
    function nt() {
      !c.wrapAround && h.value > 0 && (m.value = xe({
        val: m.value,
        max: ue.value,
        min: re.value
      })), ce.value || (c.itemsToShow = xe({
        val: Number(c.itemsToShow),
        max: h.value,
        min: 1
      }));
    }
    const ft = r(() => typeof e.ignoreAnimations == "string" ? e.ignoreAnimations.split(",") : Array.isArray(e.ignoreAnimations) ? e.ignoreAnimations : e.ignoreAnimations ? !1 : []);
    qt(() => nt()), qt(() => {
      _();
    });
    let Me;
    const At = (d) => {
      const b = d.target;
      if (!(!(b != null && b.contains(D.value)) || Array.isArray(ft.value) && ft.value.includes(d.animationName)) && (Ne.add(b), !Me)) {
        const S = () => {
          Me = requestAnimationFrame(() => {
            _(), S();
          });
        };
        S();
      }
    }, ve = (d) => {
      const b = d.target;
      b && Ne.delete(b), Me && Ne.size === 0 && (cancelAnimationFrame(Me), _());
    }, je = I(!1);
    typeof document < "u" && qt(() => {
      je.value && ft.value !== !1 ? (document.addEventListener("animationstart", At), document.addEventListener("animationend", ve)) : (document.removeEventListener("animationstart", At), document.removeEventListener("animationend", ve));
    }), ea(() => {
      je.value = !0, Le(), bt(), D.value && (w = new ResizeObserver(at), w.observe(D.value)), o("init");
    }), Ka(() => {
      je.value = !1, t.cleanup(), R && clearTimeout(R), Me && cancelAnimationFrame(Me), ae && clearInterval(ae), w && (w.disconnect(), w = null), typeof document < "u" && gt(), D.value && (D.value.removeEventListener("transitionend", _), D.value.removeEventListener("animationiteration", _));
    });
    let ne = !1;
    const ot = { x: 0, y: 0 }, fe = Kt({ x: 0, y: 0 }), it = I(!1), mt = I(!1), pt = () => {
      it.value = !0;
    }, Ut = () => {
      it.value = !1;
    }, Oe = Yt((d) => {
      if (!d.ctrlKey)
        switch (d.key) {
          case "ArrowLeft":
          case "ArrowUp":
            de.value === d.key.endsWith("Up") && (le.value ? Be(!0) : rt(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            de.value === d.key.endsWith("Down") && (le.value ? rt(!0) : Be(!0));
            break;
        }
    }, 200), jt = () => {
      document.addEventListener("keydown", Oe);
    }, gt = () => {
      document.removeEventListener("keydown", Oe);
    };
    function Et(d) {
      const b = d.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(b) || q.value || (ne = d.type === "touchstart", !ne && (d.preventDefault(), d.button !== 0)))
        return;
      ot.x = "touches" in d ? d.touches[0].clientX : d.clientX, ot.y = "touches" in d ? d.touches[0].clientY : d.clientY;
      const S = ne ? "touchmove" : "mousemove", A = ne ? "touchend" : "mouseup";
      document.addEventListener(S, yt, { passive: !1 }), document.addEventListener(A, ut, { passive: !0 });
    }
    const yt = Yt((d) => {
      mt.value = !0;
      const b = "touches" in d ? d.touches[0].clientX : d.clientX, S = "touches" in d ? d.touches[0].clientY : d.clientY;
      fe.x = b - ot.x, fe.y = S - ot.y;
      const A = yl({
        isVertical: de.value,
        isReversed: le.value,
        dragged: fe,
        effectiveSlideSize: se.value
      });
      V.value = c.wrapAround ? m.value + A : xe({
        val: m.value + A,
        max: ue.value,
        min: re.value
      }), o("drag", { deltaX: fe.x, deltaY: fe.y });
    });
    function ut() {
      if (yt.cancel(), V.value !== m.value && !ne) {
        const S = (A) => {
          A.preventDefault(), window.removeEventListener("click", S);
        };
        window.addEventListener("click", S);
      }
      $e(V.value), fe.x = 0, fe.y = 0, mt.value = !1;
      const d = ne ? "touchmove" : "mousemove", b = ne ? "touchend" : "mouseup";
      document.removeEventListener(d, yt), document.removeEventListener(b, ut);
    }
    function bt() {
      !c.autoplay || c.autoplay <= 0 || (ae = setInterval(() => {
        c.pauseAutoplayOnHover && it.value || Be();
      }, c.autoplay));
    }
    function me() {
      ae && (clearInterval(ae), ae = null);
    }
    function Ie() {
      me(), bt();
    }
    const q = I(!1);
    function $e(d, b = !1) {
      if (!b && q.value)
        return;
      let S = d, A = d;
      B.value = m.value, c.wrapAround ? A = Ba({
        val: S,
        max: ue.value,
        min: re.value
      }) : S = xe({
        val: S,
        max: ue.value,
        min: re.value
      }), o("slide-start", {
        slidingToIndex: d,
        currentSlideIndex: m.value,
        prevSlideIndex: B.value,
        slidesCount: h.value
      }), me(), q.value = !0, m.value = S, A !== S && ht.pause(), o("update:modelValue", A), R = setTimeout(() => {
        c.wrapAround && A !== S && (ht.resume(), m.value = A, o("loop", {
          currentSlideIndex: m.value,
          slidingToIndex: d
        })), o("slide-end", {
          currentSlideIndex: m.value,
          prevSlideIndex: B.value,
          slidesCount: h.value
        }), q.value = !1, Ie();
      }, c.transition);
    }
    function Be(d = !1) {
      $e(m.value + c.itemsToScroll, d);
    }
    function rt(d = !1) {
      $e(m.value - c.itemsToScroll, d);
    }
    function xt() {
      Le(), nt(), _(), Ie();
    }
    U(() => [T.value, e.breakpoints], () => Le(), { deep: !0 }), U(() => e.autoplay, () => Ie());
    const ht = U(() => e.modelValue, (d) => {
      d !== m.value && $e(Number(d), !0);
    });
    o("before-init");
    const W = r(() => {
      if (!c.wrapAround)
        return { before: 0, after: 0 };
      if (ce.value)
        return { before: p.length, after: p.length };
      const d = Number(c.itemsToShow), b = Math.ceil(d + (c.itemsToScroll - 1)), S = b - V.value, A = b - (h.value - (V.value + 1));
      return {
        before: Math.max(0, S),
        after: Math.max(0, A)
      };
    }), kt = r(() => W.value.before ? ce.value ? F.value.slice(-1 * W.value.before).reduce((d, b) => d + b[Y.value] + c.gap, 0) * -1 : W.value.before * se.value * -1 : 0), ze = r(() => {
      var d;
      if (ce.value) {
        const b = (m.value % p.length + p.length) % p.length;
        return Qt({
          slideSize: (d = F.value[b]) === null || d === void 0 ? void 0 : d[Y.value],
          viewportSize: Te.value[Y.value],
          align: c.snapAlign
        });
      }
      return Qt({
        align: c.snapAlign,
        itemsToShow: +c.itemsToShow
      });
    }), st = r(() => {
      let d = 0;
      if (ce.value) {
        if (m.value < 0 ? d = F.value.slice(m.value).reduce((b, S) => b + S[Y.value] + c.gap, 0) * -1 : d = F.value.slice(0, m.value).reduce((b, S) => b + S[Y.value] + c.gap, 0), d -= ze.value, !c.wrapAround) {
          const b = F.value.reduce((S, A) => S + A[Y.value] + c.gap, 0) - Te.value[Y.value] - c.gap;
          d = xe({
            val: d,
            max: b,
            min: 0
          });
        }
      } else {
        let b = m.value - ze.value;
        c.wrapAround || (b = xe({
          val: b,
          max: h.value - +c.itemsToShow,
          min: 0
        })), d = b * se.value;
      }
      return d * (le.value ? 1 : -1);
    }), Ge = r(() => {
      var d, b;
      if (!ce.value) {
        const N = m.value - ze.value;
        return c.wrapAround ? {
          min: Math.floor(N),
          max: Math.ceil(N + Number(c.itemsToShow) - 1)
        } : {
          min: Math.floor(xe({
            val: N,
            max: h.value - Number(c.itemsToShow),
            min: 0
          })),
          max: Math.ceil(xe({
            val: N + Number(c.itemsToShow) - 1,
            max: h.value - 1,
            min: 0
          }))
        };
      }
      let S = 0;
      {
        let N = 0, Q = 0 - W.value.before;
        const ee = Math.abs(st.value + kt.value);
        for (; N <= ee; ) {
          const te = (Q % p.length + p.length) % p.length;
          N += ((d = F.value[te]) === null || d === void 0 ? void 0 : d[Y.value]) + c.gap, Q++;
        }
        S = Q - 1;
      }
      let A = 0;
      {
        let N = S, Q = 0;
        for (N < 0 ? Q = F.value.slice(0, N).reduce((ee, te) => ee + te[Y.value] + c.gap, 0) - Math.abs(st.value + kt.value) : Q = F.value.slice(0, N).reduce((ee, te) => ee + te[Y.value] + c.gap, 0) - Math.abs(st.value); Q < Te.value[Y.value]; ) {
          const ee = (N % p.length + p.length) % p.length;
          Q += ((b = F.value[ee]) === null || b === void 0 ? void 0 : b[Y.value]) + c.gap, N++;
        }
        A = N - 1;
      }
      return {
        min: Math.floor(S),
        max: Math.ceil(A)
      };
    }), St = r(() => {
      if (c.slideEffect === "fade")
        return;
      const d = de.value ? "Y" : "X", b = de.value ? fe.y : fe.x;
      let S = st.value + b;
      if (!c.wrapAround && c.preventExcessiveDragging) {
        let A = 0;
        ce.value ? A = F.value.reduce((ee, te) => ee + te[Y.value], 0) : A = (h.value - Number(c.itemsToShow)) * se.value;
        const N = le.value ? 0 : -1 * A, Q = le.value ? A : 0;
        S = xe({
          val: S,
          min: N,
          max: Q
        });
      }
      return `translate${d}(${S}px)`;
    }), Vt = r(() => ({
      "--vc-transition-duration": q.value ? $t(c.transition, "ms") : void 0,
      "--vc-slide-gap": $t(c.gap),
      "--vc-carousel-height": $t(c.height),
      "--vc-cloned-offset": $t(kt.value)
    })), Ct = { slideTo: $e, next: Be, prev: rt }, zt = Kt({
      activeSlide: V,
      config: c,
      currentSlide: m,
      isSliding: q,
      isVertical: de,
      maxSlide: ue,
      minSlide: re,
      nav: Ct,
      normalizedDir: z,
      slideRegistry: t,
      slideSize: k,
      slides: p,
      slidesCount: h,
      viewport: s,
      visibleRange: Ge
    });
    ya(et, zt);
    const oe = Kt({
      config: c,
      currentSlide: m,
      maxSlide: ue,
      middleSlide: tt,
      minSlide: re,
      slideSize: k,
      slidesCount: h
    });
    return n({
      data: oe,
      nav: Ct,
      next: Be,
      prev: rt,
      restartCarousel: xt,
      slideTo: $e,
      updateBreakpointsConfig: Le,
      updateSlideSize: _,
      updateSlidesData: nt
    }), () => {
      var d;
      const b = i.default || i.slides, S = (b == null ? void 0 : b(oe)) || [], { before: A, after: N } = W.value, Q = ca({
        slides: p,
        position: "before",
        toShow: A
      }), ee = ca({
        slides: p,
        position: "after",
        toShow: N
      }), te = [...Q, ...S, ...ee];
      if (!c.enabled || !te.length)
        return J("section", {
          ref: D,
          class: ["carousel", "is-disabled"]
        }, te);
      const dt = ((d = i.addons) === null || d === void 0 ? void 0 : d.call(i, oe)) || [], ct = J("ol", {
        class: "carousel__track",
        style: { transform: St.value },
        onMousedownCapture: c.mouseDrag ? Et : null,
        onTouchstartPassiveCapture: c.touchDrag ? Et : null
      }, te), Rt = J("div", { class: "carousel__viewport", ref: s }, ct);
      return J("section", {
        ref: D,
        class: [
          "carousel",
          `is-${z.value}`,
          `is-effect-${c.slideEffect}`,
          {
            "is-vertical": de.value,
            "is-sliding": q.value,
            "is-dragging": mt.value,
            "is-hover": it.value
          }
        ],
        dir: z.value,
        style: Vt.value,
        "aria-label": c.i18n.ariaGallery,
        tabindex: "0",
        onFocus: jt,
        onBlur: gt,
        onMouseenter: pt,
        onMouseleave: Ut
      }, [Rt, dt, J(Cl)]);
    };
  }
});
var Zt;
(function(e) {
  e.arrowDown = "arrowDown", e.arrowLeft = "arrowLeft", e.arrowRight = "arrowRight", e.arrowUp = "arrowUp";
})(Zt || (Zt = {}));
const fa = (e) => `icon${e.charAt(0).toUpperCase() + e.slice(1)}`, Tl = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function Il(e) {
  return e in Zt;
}
const ma = (e) => e && Il(e), pa = ke({
  props: {
    name: {
      type: String,
      required: !0,
      validator: ma
    },
    title: {
      type: String,
      default: (e) => e.name ? H.i18n[fa(e.name)] : ""
    }
  },
  setup(e) {
    const i = Bt(et, null);
    return () => {
      const o = e.name;
      if (!o || !ma(o))
        return;
      const n = Tl[o], l = J("path", { d: n }), t = (i == null ? void 0 : i.config.i18n[fa(o)]) || e.title, p = J("title", t);
      return J("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": t
      }, [p, l]);
    };
  }
}), Bl = ke({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(e, { slots: i, attrs: o }) {
    const n = Bt(et);
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
    })[n.normalizedDir], D = r(() => !n.config.wrapAround && n.currentSlide <= n.minSlide), s = r(() => !n.config.wrapAround && n.currentSlide >= n.maxSlide);
    return () => {
      const { i18n: k } = n.config, T = J("button", Object.assign(Object.assign({ type: "button", disabled: D.value, "aria-label": k.ariaPreviousSlide, title: k.ariaPreviousSlide, onClick: n.nav.prev }, o), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": D.value },
        o.class
      ] }), (t == null ? void 0 : t()) || J(pa, { name: p() })), c = J("button", Object.assign(Object.assign({ type: "button", disabled: s.value, "aria-label": k.ariaNextSlide, title: k.ariaNextSlide, onClick: n.nav.next }, o), { class: [
        "carousel__next",
        { "carousel__next--disabled": s.value },
        o.class
      ] }), (l == null ? void 0 : l()) || J(pa, { name: h() }));
      return [T, c];
    };
  }
}), Al = ke({
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
    const i = Bt(et);
    if (!i)
      return () => "";
    const o = r(() => i.config.itemsToShow), n = r(() => Qt({
      align: i.config.snapAlign,
      itemsToShow: o.value
    })), l = r(() => e.paginateByItemsToShow && o.value > 1), t = r(() => Math.ceil((i.activeSlide - n.value) / o.value)), p = r(() => Math.ceil(i.slidesCount / o.value)), h = (D) => Ba(l.value ? {
      val: t.value,
      max: p.value - 1,
      min: 0
    } : {
      val: i.activeSlide,
      max: i.maxSlide,
      min: i.minSlide
    }) === D;
    return () => {
      var D, s;
      const k = [];
      for (let T = l.value ? 0 : i.minSlide; T <= (l.value ? p.value - 1 : i.maxSlide); T++) {
        const c = Ia(i.config.i18n[l.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: T + 1
        }), m = h(T), V = J("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": m
          },
          "aria-label": c,
          "aria-pressed": m,
          "aria-controls": (s = (D = i.slides[T]) === null || D === void 0 ? void 0 : D.exposed) === null || s === void 0 ? void 0 : s.id,
          title: c,
          disabled: e.disableOnClick,
          onClick: () => i.nav.slideTo(l.value ? Math.floor(T * +i.config.itemsToShow + n.value) : T)
        }), B = J("li", { class: "carousel__pagination-item", key: T }, V);
        k.push(B);
      }
      return J("ol", { class: "carousel__pagination" }, k);
    };
  }
}), ga = ke({
  name: "CarouselSlide",
  props: {
    id: {
      type: String,
      default: (e) => e.isClone ? void 0 : Xa()
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
    const l = Bt(et);
    if (ya(et, void 0), !l)
      return () => "";
    const t = I(e.index), p = (V) => {
      t.value = V;
    }, h = Ya(), D = () => {
      const V = h.vnode.el;
      return V ? V.getBoundingClientRect() : { width: 0, height: 0 };
    };
    n({
      id: e.id,
      setIndex: p,
      getBoundingRect: D
    });
    const s = r(() => t.value === l.activeSlide), k = r(() => t.value === l.activeSlide - 1), T = r(() => t.value === l.activeSlide + 1), c = r(() => t.value >= l.visibleRange.min && t.value <= l.visibleRange.max), m = r(() => {
      if (l.config.itemsToShow === "auto")
        return;
      const V = l.config.itemsToShow, B = l.config.gap > 0 && V > 1 ? `calc(${100 / V}% - ${l.config.gap * (V - 1) / V}px)` : `${100 / V}%`;
      return l.isVertical ? { height: B } : { width: B };
    });
    return l.slideRegistry.registerSlide(h, e.index), Wa(() => {
      l.slideRegistry.unregisterSlide(h);
    }), e.isClone && (ea(() => {
      va(h.vnode);
    }), Ja(() => {
      va(h.vnode);
    })), () => {
      var V, B;
      return l.config.enabled ? J("li", {
        style: [i.style, Object.assign({}, m.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": e.isClone,
          "carousel__slide--visible": c.value,
          "carousel__slide--active": s.value,
          "carousel__slide--prev": k.value,
          "carousel__slide--next": T.value,
          "carousel__slide--sliding": l.isSliding
        },
        onFocusin: () => {
          l.viewport && (l.viewport.scrollLeft = 0), l.nav.slideTo(t.value);
        },
        id: e.isClone ? void 0 : e.id,
        "aria-hidden": e.isClone || void 0
      }, (B = o.default) === null || B === void 0 ? void 0 : B.call(o, {
        currentIndex: t.value,
        isActive: s.value,
        isClone: e.isClone,
        isPrev: k.value,
        isNext: T.value,
        isSliding: l.isSliding,
        isVisible: c.value
      })) : (V = o.default) === null || V === void 0 ? void 0 : V.call(o);
    };
  }
}), El = (e, i, o, n) => {
  var p, h, D, s, k;
  if (!o) return 0;
  let l, t;
  if (o.type === Re.Field ? [We.Number, We.Range].includes((p = o.field) == null ? void 0 : p.type) ? (l = parseFloat(e[o.key]), t = parseFloat(i[o.key])) : [We.Date, We.Date].includes((h = o.field) == null ? void 0 : h.type) ? (l = e[o.key], t = i[o.key]) : ((D = o.field) == null ? void 0 : D.type) === We.Select && ((s = o.field) != null && s.multiple) && ((k = o.field) == null ? void 0 : k.multipleDisplay) === tl.Count ? (l = e[o.key].length, t = i[o.key].length) : (l = String(e[o.key]).toLowerCase(), t = String(i[o.key]).toLowerCase()) : (l = String(e[o.key]).toLowerCase(), t = String(i[o.key]).toLowerCase()), n === _e.Asc) {
    if (l > t) return 1;
    if (t > l) return -1;
  } else {
    if (l > t) return -1;
    if (t > l) return 1;
  }
  return 0;
}, Je = (e, i, o, n = []) => {
  if (e.extractTitleFromColumn) {
    let t = n.find((p) => p.key === e.extractTitleFromColumn);
    if (t)
      return Je(t, i, o, n);
  }
  let l = e.type === Re.ColumnIndex ? o : i[e.key];
  if (e.formatter && typeof e.formatter == "function") {
    let t = e.formatter(l, i, e, o);
    return typeof t == "string" && t.startsWith("__:") ? el(t.substring(3)) : t;
  }
  return l;
}, xl = (e, i, o) => {
  if (!e.colspan) return -1;
  let n = i;
  return o.forEach((l) => {
    let t = ta(e, l);
    t > 0 && t < n && (n = t);
  }), n;
}, ta = (e, i) => e.colspan === !1 ? !1 : typeof e.colspan == "function" ? e.colspan(i) : e.colspan, Aa = (e, i) => typeof e.preferSlot > "u" ? !0 : e.preferSlot === !1 ? !1 : typeof e.preferSlot == "function" ? e.preferSlot(i) : !0, Vl = (e, i, o) => {
  if (typeof e != "object" || !e.key && [Re.Field].includes(e.type) || i.indexOf(e.key) > -1) return !1;
  let n = ta(e, o);
  return typeof e.colspan > "u" ? !0 : (typeof e.colspan < "u" && (typeof e.colspan == "function" ? n = parseInt(e.colspan(o)) : n = parseInt(e.colspan)), n > 0);
}, Rl = (e = []) => {
  if (e.length > 0) {
    for (let i = 0; i < e.length; ++i)
      if (e[i].sortable) return e[i].key;
  }
  return "";
}, Ll = (e, i) => {
  if (e.length > 0) {
    for (let o = 0; o < e.length; ++o)
      if (e[o].key === i) return e[o];
  }
  return null;
}, Ea = (e) => {
  let i = [];
  return e.class && i.push(e.class), e.type && i.push(`is-${e.type}`), i.join(" ");
}, _t = /* @__PURE__ */ ke({
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
  setup(e, { emit: i }) {
    const o = i, n = e, l = I(n.modelValue);
    U(() => n.modelValue, (k) => {
      l.value = k;
    }), U(l, (k) => {
      o("update:modelValue", k);
    });
    const t = () => {
      o("inline-drop");
    }, p = r(() => ({ ...n.column.slotData, item: l.value })), h = r(() => {
      var k, T, c, m;
      if ((k = n.column.field) != null && k.modalData && typeof ((T = n.column.field) == null ? void 0 : T.modalData) == "object")
        for (let V in n.column.field.modalData)
          if (typeof ((c = n.column.field) == null ? void 0 : c.modalData[V]) == "string" && n.column.field.modalData[V].startsWith("prop:")) {
            let B = n.column.field.modalData[V].substring(5);
            l.value[B];
          } else
            n.column.field.modalData[V];
      return (m = n.column.field) == null ? void 0 : m.modalData;
    }), D = r(() => typeof n.column.field == "string" && n.column.field.startsWith("prop:") ? al(n.column.field, l.value) : n.column.field), s = r(() => {
      var k, T, c, m;
      return n.column.type === Re.Field ? !((T = (k = n.column) == null ? void 0 : k.field) != null && T.label) && (n.column.ensureFieldLabel || [
        We.Switch,
        We.Check
      ].includes((c = n.column.field) == null ? void 0 : c.type)) ? n.column.label : (m = n.column.field) == null ? void 0 : m.label : "";
    });
    return (k, T) => {
      const c = ie("lkt-anchor"), m = ie("lkt-button"), V = ie("lkt-field");
      return e.column.type === y(Re).Anchor ? (v(), O(c, X({ key: 0 }, e.column.anchor, { prop: l.value }), {
        default: P(() => [
          Qe(Ze(y(Je)(e.column, l.value, e.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : e.column.type === y(Re).Button ? (v(), O(m, X({ key: 1 }, e.column.button, { prop: l.value }), {
        default: P(() => [
          Qe(Ze(y(Je)(e.column, l.value, e.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : e.column.type === y(Re).Field ? (v(), O(V, X({
        key: 2,
        modelValue: l.value[e.column.key],
        "onUpdate:modelValue": T[0] || (T[0] = (B) => l.value[e.column.key] = B)
      }, {
        ...D.value,
        readMode: !e.hasInlineEditPerm || D.value.readMode,
        slotData: p.value,
        label: s.value,
        modalData: h.value,
        prop: l.value
      }), null, 16, ["modelValue"])) : e.column.type === y(Re).InlineDrop ? (v(), O(m, X({ key: 3 }, e.column.button, {
        prop: l.value,
        onClick: t
      }), {
        default: P(() => [
          Qe(Ze(y(Je)(e.column, l.value, e.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : e.column.type === y(Re).ColumnIndex && e.column.field ? (v(), O(V, pe(X({ key: 4 }, {
        ...D.value,
        modelValue: y(Je)(e.column, l.value, e.i, e.columns),
        readMode: !0,
        slotData: p.value,
        label: s.value,
        modalData: h.value,
        prop: l.value
      })), null, 16)) : (v(), C(K, { key: 5 }, [
        Qe(Ze(y(Je)(e.column, l.value, e.i, e.columns)), 1)
      ], 64));
    };
  }
}), It = class It {
};
It.navButtonSlot = "", It.createButtonSlot = "", It.defaultEmptySlot = void 0;
let he = It;
const Nl = ["data-i", "data-draggable"], Ml = ["data-role", "data-i"], Ol = {
  key: 1,
  class: "lkt-table-nav-cell"
}, $l = { class: "lkt-table-nav-container" }, Fl = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, Pl = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, Ul = ["colspan"], jl = ["colspan"], zl = ["colspan"], Gl = ["data-column", "colspan", "title"], Hl = /* @__PURE__ */ ke({
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
  setup(e, { emit: i }) {
    const o = ba(), n = i, l = e, t = I(l.modelValue);
    let p = typeof l.rowDisplayType == "function" ? l.rowDisplayType(t.value, l.i) : l.rowDisplayType;
    p || (p = De.Auto);
    const h = [De.Auto, De.PreferCustomItem].includes(p), D = [De.Auto, De.PreferItem].includes(p), s = (R) => n("click", R), k = r(() => {
      let R = [], w = typeof l.disabledDrag == "function" ? l.disabledDrag(t.value) : ue.value === !0;
      return !w && l.sortable && l.isDraggable ? R.push("handle") : w && R.push("disabled"), R.join(" ");
    }), T = r(() => he.navButtonSlot !== ""), c = r(() => he.navButtonSlot), m = () => {
      n("item-up", l.i);
    }, V = () => {
      n("item-down", l.i);
    }, B = () => {
      n("item-drop", l.i);
    };
    U(() => l.modelValue, (R) => t.value = R), U(t, (R) => {
      n("update:modelValue", R);
    }, { deep: !0 });
    const tt = r(() => typeof l.renderDrag == "function" ? l.renderDrag(t.value) : l.renderDrag === !0), ue = r(() => typeof l.disabledDrag == "function" ? l.disabledDrag(t.value) : l.disabledDrag === !0), re = r(() => k.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), ae = r(() => {
      let R = [];
      return h && R.push("type-custom-item"), D && R.push("type-item"), typeof l.itemContainerClass == "function" ? R.push(l.itemContainerClass(t.value, l.i)) : l.itemContainerClass !== "" && R.push(l.itemContainerClass), R.join(" ");
    });
    return (R, w) => {
      const se = ie("lkt-button");
      return v(), C("tr", {
        "data-i": e.i,
        "data-draggable": e.isDraggable,
        class: Z(ae.value)
      }, [
        e.sortable && e.editModeEnabled && tt.value ? (v(), C("td", {
          key: 0,
          "data-role": re.value,
          class: Z(k.value),
          "data-i": e.i
        }, [...w[2] || (w[2] = [
          ye("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ])], 10, Ml)) : x("", !0),
        e.addNavigation && e.editModeEnabled ? (v(), C("td", Ol, [
          ye("div", $l, [
            ge(se, {
              palette: "table-nav",
              disabled: e.i === 0,
              onClick: m
            }, {
              default: P(() => [
                T.value ? (v(), O(be(c.value), {
                  key: 0,
                  direction: "up"
                })) : (v(), C("i", Fl))
              ]),
              _: 1
            }, 8, ["disabled"]),
            ge(se, {
              palette: "table-nav",
              disabled: e.latestRow,
              onClick: V
            }, {
              default: P(() => [
                T.value ? (v(), O(be(c.value), {
                  key: 0,
                  direction: "down"
                })) : (v(), C("i", Pl))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : x("", !0),
        e.itemSlotComponent ? (v(), C("td", {
          key: "td" + e.i,
          colspan: e.visibleColumns.length
        }, [
          (v(), O(be(e.itemSlotComponent), pe(ha({
            item: t.value,
            index: e.i,
            editing: e.editModeEnabled,
            perms: e.permissions,
            data: e.itemSlotData,
            events: e.itemSlotEvents
          })), null, 16))
        ], 8, Ul)) : y(h) && y(o)[`item-${e.i}`] ? (v(), C("td", {
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
            doDrop: () => B()
          })
        ], 8, jl)) : y(D) && y(o).item ? (v(), C("td", {
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
            doDrop: () => B()
          })
        ], 8, zl)) : (v(!0), C(K, { key: 5 }, we(e.visibleColumns, (z) => (v(), C(K, null, [
          y(Vl)(z, e.emptyColumns, t.value) ? (v(), C("td", {
            key: "td" + e.i,
            "data-column": z.key,
            colspan: y(ta)(z, t.value),
            title: y(Je)(z, t.value, e.i, e.visibleColumns),
            class: Z(y(Ea)(z)),
            onClick: w[1] || (w[1] = (le) => s(le))
          }, [
            R.$slots[z.key] && y(Aa)(z, t.value) ? $(R.$slots, z.key, {
              key: 0,
              value: t.value[z.key],
              item: t.value,
              column: z,
              i: e.i
            }) : t.value ? (v(), O(_t, {
              key: 1,
              modelValue: t.value,
              "onUpdate:modelValue": w[0] || (w[0] = (le) => t.value = le),
              column: z,
              columns: e.visibleColumns,
              "edit-mode-enabled": e.editModeEnabled,
              "has-inline-edit-perm": e.hasInlineEditPerm,
              i: e.i,
              onInlineDrop: B
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : x("", !0)
          ], 10, Gl)) : x("", !0)
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
  setup(e, { emit: i }) {
    var s;
    const o = i, n = e, l = r(() => he.createButtonSlot !== ""), t = r(() => he.createButtonSlot), p = {
      ...(s = n.config) == null ? void 0 : s.modalData,
      beforeClose: (k) => {
        "itemCreated" in k && k.itemCreated === !0 && o("append", k.item);
      }
    }, h = {
      ...n.config
    };
    h.modalData = p;
    const D = () => {
      var k;
      if (!((k = n.config) != null && k.modal)) {
        o("click");
        return;
      }
    };
    return (k, T) => {
      const c = ie("lkt-button");
      return v(), O(c, X(h, {
        disabled: e.disabled,
        onClick: D
      }), {
        default: P(() => [
          l.value ? (v(), O(be(t.value), { key: 0 })) : x("", !0)
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
  setup(e, { emit: i }) {
    const o = i, n = e, l = r(() => xl(n.column, n.amountOfColumns, n.items)), t = r(() => n.column.sortable === !0), p = r(() => t.value && n.sortBy === n.column.key ? n.sortDirection : ""), h = r(() => Sa(n.column.label)), D = r(() => t.value && n.sortBy === n.column.key ? n.sortDirection === _e.Asc ? Ve.defaultTableSortAscIcon : n.sortDirection === _e.Desc ? Ve.defaultTableSortDescIcon : "" : ""), s = () => o("click", n.column);
    return (k, T) => (v(), C("th", {
      "data-column": e.column.key,
      "data-sortable": t.value,
      "data-sort": p.value,
      colspan: l.value,
      title: h.value,
      class: Z(y(Ea)(e.column)),
      onClick: s
    }, [
      ye("div", null, [
        Qe(Ze(h.value) + " ", 1),
        D.value ? (v(), C("i", {
          key: 0,
          class: Z(D.value)
        }, null, 2)) : x("", !0)
      ])
    ], 10, ql));
  }
}), Xl = ["id"], Yl = { class: "lkt-table-page-buttons" }, Wl = { class: "switch-edition-mode" }, Jl = { class: "switch-edition-mode" }, Ql = {
  key: 0,
  class: "lkt-table-page-buttons"
}, Zl = {
  key: 1,
  class: "lkt-table-page-filters"
}, _l = { class: "lkt-table" }, en = { key: 0 }, tn = { key: 0 }, an = {
  key: 0,
  "data-role": "drag-indicator"
}, ln = { key: 1 }, nn = ["id"], on = ["id"], un = ["data-i"], rn = ["id"], sn = ["data-i"], dn = ["id"], cn = { class: "lkt-carousel-slide" }, vn = { class: "lkt-carousel-slide" }, fn = ["id"], mn = {
  key: 3,
  class: "lkt-table-empty"
}, pn = {
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
  setup(e, { expose: i, emit: o }) {
    var ua, ra;
    const n = o, l = ba(), t = e, p = I(typeof t.sorter == "function" ? t.sorter : El), h = I(Rl(t.columns)), D = I(_e.Asc), s = I(t.modelValue), k = I(null), T = I(t.columns), c = I((ua = t.paginator) == null ? void 0 : ua.modelValue), m = I(t.loading), V = I(!1), B = I(t.perms), tt = I(null), ue = I(null), re = I(null), ae = I({}), R = I(new ul({ items: s.value }, t.dataStateConfig)), w = I(t.editMode), se = I(0), z = I(null), le = I(t.type), de = I(((ra = t.carousel) == null ? void 0 : ra.currentSlide) || 0), ce = I(void 0), Y = I(void 0), Le = I(void 0), at = I({
      ...typeof t.paginator.resourceData == "object" ? t.paginator.resourceData : {}
    }), Ne = I({
      ...typeof t.paginator.resourceData == "object" ? t.paginator.resourceData : {}
    }), F = I(Ye(t.saveButton, Ve.defaultSaveButton)), lt = I(Ye(t.createButton, Ve.defaultCreateButton)), Te = I(Ye(t.editModeButton, Ve.defaultEditModeButton)), Pt = I(Ye(t.groupButton, Ve.defaultGroupButton));
    U(() => t.saveButton, (a) => F.value = Ye(t.saveButton, Ve.defaultSaveButton)), U(() => t.createButton, (a) => lt.value = Ye(t.createButton, Ve.defaultCreateButton)), U(() => t.editModeButton, (a) => Te.value = Ye(t.editModeButton, Ve.defaultEditModeButton));
    const _ = I(!1);
    U(m, (a) => n("update:loading", a)), U(c, (a) => n("page", a));
    const nt = (a) => {
      B.value = a;
    }, ft = (a) => {
      var u, E;
      if (Array.isArray(a.data)) {
        let M = a.data;
        if (typeof ((u = t.events) == null ? void 0 : u.parseResults) == "function" && (M = t.events.parseResults(M)), s.value = [...s.value, ...M], [Ce.TimelineAsc, Ce.TimelineDesc, Ce.TimelineAscDesc].includes((E = t.paginator) == null ? void 0 : E.type)) {
          const j = dl(s.value, t.paginator.dateKey);
          ce.value = j.oldest, Y.value = j.newest;
        }
      }
      m.value = !1, V.value = !0, R.value.store({ items: s.value }).turnStoredIntoOriginal(), _.value = !1, Ot(() => {
        Oe.value, n("read-response", a);
      });
    }, Me = () => Ot(() => {
      var M;
      const a = t.paginator, u = a == null ? void 0 : a.type;
      let E = !0;
      u && ([Ce.LoadMore, Ce.Infinite].includes(u) || [Ce.TimelineDesc, Ce.TimelineAsc, Ce.TimelineAscDesc].includes(u) && ((M = t.paginator.timeline) != null && M.accumulative)) && (E = !1), E && s.value.splice(0, s.value.length), m.value = !0;
    }), At = () => {
      tt.value.doRefresh();
    }, ve = ol(12), je = r(() => {
      if (!t.hideEmptyColumns) return [];
      let a = [];
      return T.value.forEach((u) => {
        let E = u.key, M = !1;
        s.value.forEach((j) => {
          if (typeof j.checkEmpty == "function")
            return j.checkEmpty(j);
          j[E] && (M = !0);
        }), M || a.push(E);
      }), a;
    }), ne = r(() => T.value.filter((a) => !a.hidden)), ot = r(() => T.value.filter((a) => a.isForRowKey)), fe = r(() => T.value.map((a) => a.key)), it = r(() => {
      let a = [];
      for (let u in l) fe.value.indexOf(u) !== -1 && a.push(u);
      return a;
    }), mt = r(() => {
      let a = [];
      for (let u in l) u.indexOf("slide-") !== -1 && a.push(u);
      return a;
    }), pt = r(() => {
      var a;
      return t.hiddenSave || m.value || !((a = F.value) != null && a.resource || F.value.type) ? !1 : w.value && _.value ? !0 : w.value;
    }), Ut = r(() => Dt.value && s.value.length >= t.requiredItemsForTopCreate || ze.value ? !0 : pt.value || w.value && me.value), Oe = r(() => {
      var a, u;
      return se.value, typeof ((a = F.value) == null ? void 0 : a.disabled) == "function" ? F.value.disabled({
        value: s.value,
        dataState: R.value
      }) : typeof ((u = F.value) == null ? void 0 : u.disabled) == "boolean" ? F.value.disabled : !_.value;
    }), jt = r(() => s.value.length), gt = r(() => {
      var a;
      return {
        items: s.value,
        ...(a = F.value) == null ? void 0 : a.resourceData
      };
    }), Et = r(() => t.titleTag === "" ? "h2" : t.titleTag), yt = r(() => t.wrapContentTag === "" ? "div" : t.wrapContentTag), ut = r(() => Sa(t.title)), bt = r(() => {
      var a;
      return (a = t.drag) == null ? void 0 : a.enabled;
    }), me = r(() => B.value.includes(Ae.Create)), Ie = r(() => B.value.includes("read")), q = r(() => B.value.includes(Ae.Update)), $e = r(() => B.value.includes(Ae.Edit)), Be = r(() => B.value.includes(Ae.InlineEdit)), rt = r(() => B.value.includes(Ae.ModalCreate)), xt = r(() => B.value.includes(Ae.InlineCreate)), ht = r(() => B.value.includes(Ae.InlineCreateEver)), W = r(() => B.value.includes(Ae.Drop)), kt = r(() => B.value.includes(Ae.SwitchEditMode)), ze = r(() => !kt.value || !q.value && !W.value || !q.value && W.value ? !1 : !m.value), st = r(() => {
      var a;
      return (typeof ((a = t.paginator) == null ? void 0 : a.type) < "u" && [Ce.LoadMore, Ce.Infinite].includes(t.paginator.type) || !m.value) && s.value.length > 0;
    }), Ge = r(() => T.value.find((a) => a.isForAccordionHeader)), St = r(() => T.value.find((a) => a.isCalendarDate)), Vt = r(() => T.value.find((a) => a.isCalendarGroup)), Ct = (a, u) => typeof t.customItemSlotName == "function" ? t.customItemSlotName(a, u) : "", zt = (a) => {
      let u = a.target;
      if (typeof u.dataset.column > "u")
        do
          u = u.parentNode;
        while (typeof u.dataset.column > "u" && u.tagName !== "TABLE" && u.tagName !== "body");
      if (u.tagName === "TD" && (u = u.parentNode, u = u.dataset.i, typeof u < "u"))
        return s.value[u];
    }, oe = () => {
      se.value = cl();
    }, d = (a) => s.value[a], b = (a) => {
      var u;
      return (u = k.value) == null ? void 0 : u.querySelector(`[data-i="${a}"]`);
    }, S = (a) => {
      a && a.sortable && (a.key === h.value && (D.value = D.value === _e.Asc ? _e.Desc : _e.Asc), h.value = a.key, s.value = s.value.sort((u, E) => p.value(u, E, a, D.value)), oe(), n("sort", {
        sortBy: h.value,
        sortDirection: D.value
      }));
    }, A = (a) => {
      n("click", a);
    }, N = (a) => {
      var E, M, j, G, qe, Fe, Pe, Ue;
      let u = parseInt((G = (j = (M = (E = a == null ? void 0 : a.originalEvent) == null ? void 0 : E.toElement) == null ? void 0 : M.closest("tr")) == null ? void 0 : j.dataset) == null ? void 0 : G.i);
      return !(typeof ((qe = t.drag) == null ? void 0 : qe.isValid) == "function" && !((Fe = t.drag) != null && Fe.isValid(s.value[u])) || typeof ((Pe = t.drag) == null ? void 0 : Pe.isValid) == "boolean" && !((Ue = t.drag) != null && Ue.isValid));
    }, Q = (a) => {
      var u, E;
      return typeof ((u = t.drag) == null ? void 0 : u.isDraggable) == "function" ? (E = t.drag) == null ? void 0 : E.isDraggable(a) : !0;
    }, ee = () => {
      if (me.value) {
        n("click-create");
        return;
      }
      if (xt.value || ht.value) {
        if (typeof t.newValueGenerator == "function") {
          let a = t.newValueGenerator();
          if (typeof a == "object" || Se.value !== Ee.Table) {
            s.value.push(a);
            return;
          }
        }
        s.value.push({});
      } else
        n("click-create");
    }, te = (a) => {
      s.value.push(a);
    }, dt = () => m.value = !0, ct = () => m.value = !1, Rt = (a, u) => {
      var E, M, j;
      if (!((E = F.value) != null && E.type && [
        Xt.Split,
        Xt.SplitEver,
        Xt.SplitLazy
      ].includes((M = F.value) == null ? void 0 : M.type))) {
        if (n("before-save"), (j = F.value) != null && j.resource && (m.value = !1, !u.success)) {
          n("error", u.httpStatus);
          return;
        }
        R.value.turnStoredIntoOriginal(), _.value = !1, n("save", u);
      }
    }, aa = (a, u, E) => {
      if (E >= a.length) {
        let M = E - a.length + 1;
        for (; M--; ) a.push(void 0);
      }
      return a.splice(E, 0, a.splice(u, 1)[0]), a;
    }, xa = (a) => {
      aa(s.value, a, a - 1), oe();
    }, Va = (a) => {
      aa(s.value, a, a + 1), oe();
    }, wt = (a) => {
      s.value.splice(a, 1), oe();
    }, la = () => {
      var a;
      ae.value && typeof ((a = ae.value) == null ? void 0 : a.destroy) == "function" && (ae.value.destroy(), ae.value = {});
    }, Gt = () => {
      z.value || (z.value = document.getElementById("lkt-table-body-" + ve)), ae.value = new rl(z.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(a) {
          let u = a.oldIndex, E = a.newIndex;
          s.value.splice(E, 0, s.value.splice(u, 1)[0]), oe(), n("drag-end", s.value[E]);
        },
        onMove: function(a, u) {
          return N(a);
        }
      });
    }, Lt = (a, u, E = !1) => {
      let M = [se.value, ve, "row", u];
      return E && M.push("hidden"), ot.value.forEach((j) => {
        let G = String(a[j.key]).toLowerCase();
        G.length > 50 && (G = G.substring(0, 50)), G = il(G, " ", "-"), M.push(G);
      }), M.join("-");
    }, Ht = r(() => typeof t.createEnabledValidator == "function" ? t.createEnabledValidator({ items: s.value }) : !0), Dt = r(() => t.createButton === !1 ? !1 : ht.value || me.value && w.value || xt.value && w.value || rt.value && w.value), Ra = r(() => [Ee.Ol, Ee.Ul].includes(Se.value)), Tt = (a, u) => typeof t.itemDisplayChecker == "function" ? t.itemDisplayChecker(a, u) : !0, Nt = (a, u) => typeof t.itemContainerClass == "function" ? t.itemContainerClass(a, u) : t.itemContainerClass, na = (a, u) => typeof t.itemContainerStyle == "function" ? t.itemContainerStyle(a, u) : t.itemContainerStyle, La = (a, u) => Ge.value ? a[Ge.value.key] : "", He = r(() => typeof t.itemSlotComponent == "function" ? t.itemSlotComponent() : t.itemSlotComponent), Mt = r(() => typeof t.itemSlotData == "function" ? t.itemSlotData() : t.itemSlotData);
    ea(() => {
      var a;
      t.initialSorting && S(Ll(t.columns, h.value)), R.value.store({ items: s.value }).turnStoredIntoOriginal(), _.value = !1, (a = t.drag) != null && a.enabled && Ot(() => {
        Gt();
      });
    }), U(() => {
      var a;
      return (a = t.drag) == null ? void 0 : a.enabled;
    }, (a) => {
      a ? Gt() : la();
    }), U(() => t.type, (a) => {
      var u;
      (u = t.drag) != null && u.enabled ? Gt() : la();
    }), U(() => t.perms, (a) => B.value = a), U(B, (a) => n("update:perms", a)), U(w, (a) => {
      n("update:editMode", a);
    }), U(() => t.editMode, (a) => w.value = a), U(() => t.columns, (a) => T.value = a, { deep: !0 }), U(() => t.modelValue, (a) => {
      s.value = a;
    }, { deep: !0 }), U(s, (a) => {
      R.value.increment({ items: a }), _.value = R.value.changed(), n("update:modelValue", a);
    }, { deep: !0 }), i({
      getItemByEvent: zt,
      getItemByIndex: d,
      getRowByIndex: b,
      doRefresh: At,
      doRemoveIndex: (a) => {
        s.value.splice(a, 1), oe();
      },
      getHtml: () => ue.value,
      reRender: oe,
      turnStoredIntoOriginal: () => {
        R.value.turnStoredIntoOriginal(), Ot(() => {
          oe();
        });
      }
    });
    const Na = r(() => typeof he.defaultEmptySlot < "u"), Ma = r(() => he.defaultEmptySlot), Oa = r(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled ? !1 : typeof t.drag.canRender > "u" ? !0 : t.drag.canRender), $a = r(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled || typeof t.drag.isDisabled > "u" ? !1 : t.drag.isDisabled), Fa = r(() => typeof t.header == "object" && Object.keys(t.header).length > 0), Pa = r(() => (console.log("displayFiltersLktForm: ", typeof t.filtersForm == "object" && Object.keys(t.filtersForm).length > 0), typeof t.filtersForm == "object" && Object.keys(t.filtersForm).length > 0)), Se = r(() => Array.isArray(t.switchableTypes) && t.switchableTypes.length > 0 ? le.value : t.type), Ua = r(() => Array.isArray(t.switchableTypes) ? t.switchableTypes.length > 0 ? t.switchableTypes.includes(t.type) ? t.switchableTypes : [
      t.type,
      ...t.switchableTypes
    ] : [] : []), ja = r(() => {
      let a = [];
      return Ua.value.forEach((u) => {
        let E = t.switchableTypesButtons[u];
        a.push({
          ...E,
          class: [E.class, u === Se.value ? "is-current" : ""].join(" "),
          events: {
            click: (M) => {
              var j, G;
              le.value = u, typeof ((j = t.switchableTypesButtons[u].events) == null ? void 0 : j.click) == "function" && t.switchableTypesButtons[u].events.click(M), typeof ((G = t.events) == null ? void 0 : G.viewChanged) == "function" && t.events.viewChanged(u);
            }
          }
        });
      }), a;
    }), za = r(() => {
      var a, u;
      return {
        ...t.header,
        topEndButtons: [
          ...typeof ((a = t.header) == null ? void 0 : a.topEndButtons) > "u" ? [] : (u = t.header) == null ? void 0 : u.topEndButtons,
          ...ja.value
        ]
      };
    }), oa = (a, u) => typeof t.useItemSlot == "function" ? t.useItemSlot({ item: a, index: u }) === !0 : t.useItemSlot, Ga = r(() => {
      if (Se.value !== Ee.Calendar || !St.value || typeof St.value > "u") return [];
      let a = [], u = [];
      return s.value.forEach((E) => {
        var Ue;
        let M = E[St.value.key], j = sl("Y-m-d H:i:s", M), G;
        (Ue = Vt.value) != null && Ue.key && (G = E[Vt.value.key]);
        let qe = {};
        G && t.calendarGroups && typeof t.calendarGroups[G] == "object" && (qe = t.calendarGroups[G]);
        const Fe = [j, G].join("-");
        let Pe = -1;
        u.includes(Fe) ? Pe = u.findIndex((g) => g === Fe) : (Pe = u.length, u.push(Fe), a.push({
          date: M,
          data: {
            items: []
          },
          dot: {
            ...qe,
            class: `lkt-calendar-group--${G}`
          }
        })), a[Pe].data.items.push(E);
      }), a;
    }), Ha = {
      dayPicked: ((a) => {
        var u;
        typeof ((u = t.calendar.events) == null ? void 0 : u.dayPicked) == "function" && t.calendar.events.dayPicked(a);
      }),
      visibleMonthChanged: ((a) => {
        var u;
        typeof ((u = t.calendar.events) == null ? void 0 : u.visibleMonthChanged) == "function" && t.calendar.events.visibleMonthChanged(a), Le.value = a.visibleDate;
      })
    };
    let ia = null;
    return U(at, () => {
      clearTimeout(ia), ia = setTimeout(() => {
        Ne.value = {
          ...Ne.value,
          ...at.value
        };
      }, 400);
    }, { deep: !0 }), (a, u) => {
      const E = ie("lkt-header"), M = ie("lkt-button"), j = ie("lkt-form"), G = ie("lkt-accordion"), qe = ie("lkt-calendar"), Fe = ie("lkt-loader"), Pe = ie("lkt-paginator");
      return v(), C("section", {
        ref_key: "element",
        ref: ue,
        class: "lkt-table-page",
        id: "lkt-table-page-" + y(ve)
      }, [
        Fa.value ? (v(), O(E, pe(X({ key: 0 }, za.value)), null, 16)) : ut.value || y(l).title ? (v(), C("header", {
          key: 1,
          class: Z(e.headerClass)
        }, [
          ut.value ? (v(), O(be(Et.value), { key: 0 }, {
            default: P(() => [
              e.titleIcon ? (v(), C("i", {
                key: 0,
                class: Z(e.titleIcon)
              }, null, 2)) : x("", !0),
              Qe(" " + Ze(ut.value), 1)
            ]),
            _: 1
          })) : x("", !0),
          y(l).title ? $(a.$slots, "title", { key: 1 }) : x("", !0)
        ], 2)) : x("", !0),
        (v(), O(be(yt.value), {
          class: Z(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: P(() => {
            var Ue;
            return [
              Ke(ye("div", Yl, [
                e.groupButton !== !1 ? (v(), O(M, X({
                  key: 0,
                  ref: "groupButton"
                }, Pt.value, { class: "lkt-item-crud-group-button" }), {
                  split: P(() => [
                    ye("div", Wl, [
                      Ke(ge(M, X(Te.value, {
                        checked: w.value,
                        "onUpdate:checked": u[0] || (u[0] = (g) => w.value = g)
                      }), null, 16, ["checked"]), [
                        [Xe, ze.value]
                      ])
                    ]),
                    y(l)["prev-buttons-ever"] ? $(a.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: q.value,
                      canDrop: W.value,
                      perms: e.perms
                    }) : x("", !0),
                    y(l)["prev-buttons"] ? $(a.$slots, "prev-buttons", {
                      key: 1,
                      canUpdate: q.value,
                      canDrop: W.value,
                      perms: e.perms
                    }) : x("", !0),
                    Ke(ge(M, X({
                      class: "lkt-table--save-button",
                      ref_key: "saveButtonRef",
                      ref: re
                    }, {
                      ...F.value,
                      disabled: Oe.value,
                      resourceData: gt.value
                    }, {
                      onLoading: dt,
                      onLoaded: ct,
                      onClick: Rt
                    }), {
                      split: P(({ doClose: g, doRootClick: f }) => [
                        $(a.$slots, "button-save-split", {
                          doClose: g,
                          doRootClick: f,
                          dataState: R.value,
                          onButtonLoading: dt,
                          onButtonLoaded: ct
                        })
                      ]),
                      default: P(() => [
                        y(l)["button-save"] ? $(a.$slots, "button-save", {
                          key: 0,
                          items: s.value,
                          editMode: e.editMode,
                          canUpdate: !Oe.value
                        }) : x("", !0)
                      ]),
                      _: 3
                    }, 16), [
                      [Xe, pt.value]
                    ]),
                    Dt.value && s.value.length >= e.requiredItemsForTopCreate ? (v(), O(Wt, {
                      key: 2,
                      config: lt.value,
                      disabled: !Ht.value,
                      onClick: ee,
                      onAppend: te
                    }, null, 8, ["config", "disabled"])) : x("", !0)
                  ]),
                  _: 3
                }, 16)) : x("", !0),
                y(l)["prev-buttons-ever"] ? $(a.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: q.value,
                  canDrop: W.value,
                  perms: e.perms
                }) : x("", !0),
                y(l)["prev-buttons"] ? $(a.$slots, "prev-buttons", {
                  key: 2,
                  canUpdate: q.value,
                  canDrop: W.value,
                  perms: e.perms
                }) : x("", !0),
                Ke(ge(M, X({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: re
                }, {
                  ...F.value,
                  disabled: Oe.value,
                  resourceData: gt.value
                }, {
                  onLoading: dt,
                  onLoaded: ct,
                  onClick: Rt
                }), {
                  split: P(({ doClose: g, doRootClick: f }) => [
                    $(a.$slots, "button-save-split", {
                      doClose: g,
                      doRootClick: f,
                      dataState: R.value,
                      onButtonLoading: dt,
                      onButtonLoaded: ct
                    })
                  ]),
                  default: P(() => [
                    y(l)["button-save"] ? $(a.$slots, "button-save", {
                      key: 0,
                      items: s.value,
                      editMode: e.editMode,
                      canUpdate: !Oe.value
                    }) : x("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [Xe, pt.value]
                ]),
                Dt.value && s.value.length >= e.requiredItemsForTopCreate ? (v(), O(Wt, {
                  key: 3,
                  config: lt.value,
                  disabled: !Ht.value,
                  onClick: ee,
                  onAppend: te
                }, null, 8, ["config", "disabled"])) : x("", !0),
                ye("div", Jl, [
                  Ke(ge(M, X(Te.value, {
                    checked: w.value,
                    "onUpdate:checked": u[1] || (u[1] = (g) => w.value = g)
                  }), null, 16, ["checked"]), [
                    [Xe, ze.value]
                  ])
                ])
              ], 512), [
                [Xe, Ut.value]
              ]),
              y(l).buttons ? (v(), C("div", Ql, [
                $(a.$slots, "buttons")
              ])) : x("", !0),
              V.value && y(l).filters ? (v(), C("div", Zl, [
                $(a.$slots, "filters", {
                  items: s.value,
                  isLoading: m.value
                })
              ])) : x("", !0),
              Pa.value ? (v(), O(j, X({
                key: 2,
                modelValue: at.value,
                "onUpdate:modelValue": u[2] || (u[2] = (g) => at.value = g),
                editing: w.value,
                "onUpdate:editing": u[3] || (u[3] = (g) => w.value = g),
                perms: B.value,
                "onUpdate:perms": u[4] || (u[4] = (g) => B.value = g)
              }, {
                form: e.filtersForm
              }), null, 16, ["modelValue", "editing", "perms"])) : x("", !0),
              Ke(ye("div", _l, [
                Se.value === y(Ee).Table ? (v(), C("table", en, [
                  e.hideTableHeader ? x("", !0) : (v(), C("thead", tn, [
                    ye("tr", null, [
                      bt.value && w.value ? (v(), C("th", an)) : x("", !0),
                      e.addNavigation && w.value ? (v(), C("th", ln)) : x("", !0),
                      (v(!0), C(K, null, we(ne.value, (g) => (v(), C(K, null, [
                        je.value.indexOf(g.key) === -1 ? (v(), O(Kl, {
                          key: 0,
                          column: g,
                          "sort-by": h.value,
                          "sort-direction": D.value,
                          "amount-of-columns": e.columns.length,
                          items: s.value,
                          onClick: (f) => S(g)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : x("", !0)
                      ], 64))), 256))
                    ])
                  ])),
                  ye("tbody", {
                    ref_key: "tableBody",
                    ref: k,
                    id: "lkt-table-body-" + y(ve),
                    class: Z(e.itemsContainerClass)
                  }, [
                    (v(!0), C(K, null, we(s.value, (g, f) => Ke((v(), O(Hl, {
                      modelValue: s.value[f],
                      "onUpdate:modelValue": (L) => s.value[f] = L,
                      key: Lt(g, f),
                      i: f,
                      "is-draggable": Q(g),
                      sortable: bt.value,
                      "visible-columns": ne.value,
                      "empty-columns": je.value,
                      "add-navigation": e.addNavigation,
                      "latest-row": f + 1 === jt.value,
                      "can-drop": W.value && w.value,
                      "can-edit": $e.value && q.value && w.value,
                      "can-read": Ie.value,
                      "can-create": me.value,
                      "edit-mode-enabled": w.value,
                      "has-inline-edit-perm": Be.value,
                      "row-display-type": e.rowDisplayType,
                      "render-drag": Oa.value,
                      "disabled-drag": $a.value,
                      "is-loading": m.value,
                      "item-container-class": e.itemContainerClass,
                      "item-slot-component": He.value,
                      "item-slot-data": Mt.value,
                      "item-slot-events": e.itemSlotEvents,
                      permissions: B.value,
                      onClick: A,
                      onItemUp: xa,
                      onItemDown: Va,
                      onItemDrop: wt
                    }, _a({ _: 2 }, [
                      y(l)[`item-${f}`] && oa(a.row, f) ? {
                        name: `item-${f}`,
                        fn: P((L) => [
                          $(a.$slots, `item-${f}`, pe({
                            [e.slotItemVar || ""]: L.item,
                            index: f,
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
                      } : y(l).item && oa(a.row, f) ? {
                        name: "item",
                        fn: P((L) => [
                          $(a.$slots, "item", pe({
                            [e.slotItemVar || ""]: L.item,
                            index: f,
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
                      we(it.value, (L) => ({
                        name: L,
                        fn: P((vt) => [
                          $(a.$slots, L, pe({
                            [e.slotItemVar || ""]: vt.item,
                            value: vt.value,
                            column: vt.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class", "item-slot-component", "item-slot-data", "item-slot-events", "permissions"])), [
                      [Xe, Tt(s.value[f], f)]
                    ])), 128))
                  ], 10, nn)
                ])) : Se.value === y(Ee).Item ? (v(), C("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: k,
                  id: "lkt-table-body-" + y(ve),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), C(K, null, we(s.value, (g, f) => (v(), C(K, {
                    key: Lt(g, f)
                  }, [
                    !e.skipTableItemsContainer && Tt(g, f) ? (v(), C("div", {
                      key: 0,
                      class: Z(["lkt-table-item", Nt(g, f)]),
                      style: da(na(g, f)),
                      "data-i": f
                    }, [
                      He.value ? (v(), O(be(He.value), X({
                        key: 0,
                        ref_for: !0
                      }, {
                        item: g,
                        index: f,
                        editing: w.value,
                        perms: B.value,
                        data: Mt.value,
                        events: e.itemSlotEvents
                      }), null, 16)) : $(a.$slots, "item", pe({
                        key: 1,
                        [e.slotItemVar || ""]: g,
                        index: f,
                        editing: w.value,
                        canCreate: me.value,
                        canRead: Ie.value,
                        canUpdate: q.value,
                        canDrop: W.value,
                        isLoading: m.value,
                        doDrop: () => wt(f)
                      }))
                    ], 14, un)) : Tt(g, f) ? $(a.$slots, "item", pe({
                      key: 1,
                      class: Nt(g, f),
                      dataI: f,
                      [e.slotItemVar || ""]: g,
                      index: f,
                      editing: w.value,
                      canCreate: me.value,
                      canRead: Ie.value,
                      canUpdate: q.value,
                      canDrop: W.value,
                      isLoading: m.value,
                      doDrop: () => wt(f)
                    })) : x("", !0)
                  ], 64))), 128))
                ], 10, on)) : Se.value === y(Ee).Accordion ? (v(), C("div", {
                  key: 2,
                  ref_key: "tableBody",
                  ref: k,
                  id: "lkt-table-body-" + y(ve),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), C(K, null, we(s.value, (g, f) => (v(), C(K, null, [
                    [y(De).Auto, y(De).PreferCustomItem].includes(e.rowDisplayType) && y(l)[Ct(g, f)] ? $(a.$slots, Ct(g, f), {
                      key: 0,
                      item: g,
                      index: f,
                      editing: w.value,
                      isLoading: m.value
                    }) : [y(De).Auto, y(De).PreferCustomItem].includes(e.rowDisplayType) && y(l)[`item-${f}`] ? $(a.$slots, `item-${f}`, {
                      key: 1,
                      item: g,
                      index: f,
                      editing: w.value,
                      isLoading: m.value
                    }) : (v(), C(K, { key: 2 }, [
                      Tt(g, f) ? (v(), O(G, X({
                        class: ["lkt-table-item", Nt(g, f)],
                        "data-i": f,
                        key: Lt(g, f)
                      }, { ref_for: !0 }, {
                        ...e.accordion,
                        title: La(g)
                      }), {
                        header: P(() => [
                          ge(_t, {
                            modelValue: s.value[f],
                            "onUpdate:modelValue": (L) => s.value[f] = L,
                            i: f,
                            column: Ge.value,
                            columns: ne.value,
                            "edit-mode-enabled": w.value,
                            "has-inline-edit-perm": Be.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])
                        ]),
                        default: P(() => [
                          (v(!0), C(K, null, we(ne.value, (L) => {
                            var vt, sa;
                            return v(), C(K, null, [
                              L.key !== ((vt = Ge.value) == null ? void 0 : vt.key) && a.$slots[L.key] && y(Aa)(L, s.value[f]) ? $(a.$slots, L.key, {
                                key: 0,
                                value: s.value[f][L.key],
                                item: s.value[f],
                                column: L,
                                i: f
                              }) : (v(), C(K, { key: 1 }, [
                                L.key !== ((sa = Ge.value) == null ? void 0 : sa.key) ? (v(), O(_t, {
                                  key: 0,
                                  modelValue: s.value[f],
                                  "onUpdate:modelValue": (qa) => s.value[f] = qa,
                                  i: f,
                                  column: L,
                                  columns: ne.value,
                                  "edit-mode-enabled": w.value,
                                  "has-inline-edit-perm": Be.value
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])) : x("", !0)
                              ], 64))
                            ], 64);
                          }), 256))
                        ]),
                        _: 2
                      }, 1040, ["class", "data-i"])) : x("", !0)
                    ], 64))
                  ], 64))), 256))
                ], 10, rn)) : Ra.value ? (v(), O(be(Se.value), {
                  key: 3,
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, {
                  default: P(() => [
                    (v(!0), C(K, null, we(s.value, (g, f) => (v(), C(K, {
                      key: Lt(g, f)
                    }, [
                      Tt(g, f) ? (v(), C("li", {
                        key: 0,
                        class: Z(["lkt-table-item", Nt(g, f)]),
                        "data-i": f,
                        style: da(na(g, f))
                      }, [
                        He.value ? (v(), O(be(He.value), X({
                          key: 0,
                          ref_for: !0
                        }, {
                          item: g,
                          index: f,
                          editing: w.value,
                          perms: B.value,
                          data: Mt.value,
                          events: e.itemSlotEvents
                        }), null, 16)) : $(a.$slots, "item", pe({
                          key: 1,
                          [e.slotItemVar || ""]: g,
                          index: f,
                          editing: w.value,
                          canCreate: me.value,
                          canRead: Ie.value,
                          canUpdate: q.value,
                          canDrop: W.value,
                          isLoading: m.value,
                          doDrop: () => wt(f)
                        }))
                      ], 14, sn)) : x("", !0)
                    ], 64))), 128))
                  ]),
                  _: 3
                }, 8, ["class"])) : Se.value === y(Ee).Carousel ? (v(), C("div", {
                  key: 4,
                  ref_key: "tableBody",
                  ref: k,
                  id: "lkt-table-body-" + y(ve),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  ge(y(Dl), X({
                    modelValue: de.value,
                    "onUpdate:modelValue": u[5] || (u[5] = (g) => de.value = g)
                  }, e.carousel, {
                    "wrap-around": ((Ue = e.carousel) == null ? void 0 : Ue.infinite) === !0
                  }), {
                    addons: P(() => [
                      ge(y(Bl)),
                      ge(y(Al))
                    ]),
                    default: P(() => [
                      (v(!0), C(K, null, we(mt.value, (g, f) => (v(), O(y(ga), {
                        key: g,
                        index: f
                      }, {
                        default: P(() => [
                          ye("div", cn, [
                            $(a.$slots, g)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (v(!0), C(K, null, we(s.value, (g, f) => (v(), O(y(ga), {
                        key: a.slide,
                        index: f
                      }, {
                        default: P(() => [
                          ye("div", vn, [
                            He.value ? (v(), O(be(He.value), X({
                              key: 0,
                              ref_for: !0
                            }, {
                              item: g,
                              index: f,
                              editing: w.value,
                              perms: B.value,
                              data: Mt.value,
                              events: e.itemSlotEvents
                            }), null, 16)) : $(a.$slots, "item", pe({
                              key: 1,
                              [e.slotItemVar || ""]: g,
                              index: f,
                              editing: w.value,
                              canCreate: me.value,
                              canRead: Ie.value,
                              canUpdate: q.value,
                              canDrop: W.value,
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
                ], 10, dn)) : Se.value === y(Ee).Calendar ? (v(), C("div", {
                  key: 5,
                  ref_key: "tableBody",
                  ref: k,
                  id: "lkt-table-body-" + y(ve),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  ge(qe, pe(ha({
                    ...e.calendar,
                    items: Ga.value,
                    events: Ha
                  })), null, 16)
                ], 10, fn)) : x("", !0)
              ], 512), [
                [Xe, st.value]
              ]),
              !m.value && s.value.length === 0 ? (v(), C("div", mn, [
                y(l).empty ? $(a.$slots, "empty", { key: 0 }) : Na.value ? (v(), O(be(Ma.value), {
                  key: 1,
                  message: e.noResultsText
                }, null, 8, ["message"])) : e.noResultsText ? (v(), C(K, { key: 2 }, [
                  Qe(Ze(e.noResultsText), 1)
                ], 64)) : x("", !0)
              ])) : x("", !0),
              m.value ? (v(), O(Fe, { key: 4 })) : x("", !0),
              Dt.value || y(l).bottomButtons ? (v(), C("div", pn, [
                Dt.value && s.value.length >= e.requiredItemsForBottomCreate ? (v(), O(Wt, {
                  key: 0,
                  config: lt.value,
                  disabled: !Ht.value,
                  onClick: ee,
                  onAppend: te
                }, null, 8, ["config", "disabled"])) : x("", !0),
                $(a.$slots, "bottom-buttons")
              ])) : x("", !0),
              e.paginator && Object.keys(e.paginator).length > 0 ? (v(), O(Pe, X({
                key: 6,
                ref_key: "paginatorRef",
                ref: tt
              }, {
                ...e.paginator,
                resourceData: Ne.value,
                timelineOldestDate: ce.value,
                timelineNewestDate: Y.value,
                timelineVisibleDate: Le.value
              }, {
                modelValue: c.value,
                "onUpdate:modelValue": u[6] || (u[6] = (g) => c.value = g),
                onLoading: Me,
                onPerms: nt,
                onResponse: ft
              }), null, 16, ["modelValue"])) : x("", !0),
              y(l)["web-element-actions"] ? $(a.$slots, "web-element-actions", { key: 7 }) : x("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, Xl);
    };
  }
}), Dn = {
  install: (e) => {
    e.component("lkt-table") === void 0 && e.component("lkt-table", gn);
  }
}, Tn = (e) => (he.navButtonSlot = e, !0), In = (e) => (he.createButtonSlot = e, !0), Bn = (e) => {
  he.defaultEmptySlot = e;
};
export {
  xn as Column,
  Vn as createColumn,
  Dn as default,
  El as defaultTableSorter,
  In as setTableCreateButtonSlot,
  Bn as setTableEmptySlot,
  Tn as setTableNavButtonSlot
};
