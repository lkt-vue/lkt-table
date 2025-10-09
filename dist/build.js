import { defineComponent as he, computed as r, ref as E, shallowReactive as Kt, watch as U, watchEffect as Gt, onMounted as Zt, onBeforeUnmount as Oa, reactive as Ht, provide as da, h as J, useId as $a, inject as yt, getCurrentInstance as Fa, onUnmounted as Pa, onUpdated as _a, cloneVNode as Ua, resolveComponent as ye, createBlock as O, createElementBlock as w, unref as b, openBlock as p, mergeProps as Y, withCtx as P, createTextVNode as Je, toDisplayString as Qe, normalizeProps as fe, Fragment as H, useSlots as ca, normalizeClass as Z, createCommentVNode as R, createElementVNode as me, createVNode as pe, resolveDynamicComponent as ge, guardReactiveProps as va, renderSlot as $, renderList as Ce, mergeDefaults as ja, nextTick as Bt, withDirectives as qe, vShow as Xe, createSlots as za } from "vue";
import { __ as Ga } from "lkt-i18n";
import { ColumnType as Re, FieldType as Ke, MultipleOptionsDisplay as Ha, SortDirection as Ze, Column as fa, extractPropValue as qa, TableRowType as we, extractI18nValue as pa, LktSettings as Ve, ensureButtonConfig as Ye, TablePermission as Ee, PaginatorType as Et, TableType as Pe, getDefaultValues as Xa, Table as Ya, ButtonType as qt } from "lkt-vue-kernel";
import { Column as bn, createColumn as hn } from "lkt-vue-kernel";
import { generateRandomString as Ka, replaceAll as Wa } from "lkt-string-tools";
import { DataState as Ja } from "lkt-data-state";
import Qa from "sortablejs";
import { date as Za, time as xa } from "lkt-date-tools";
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
], el = {
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
  i18n: el,
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
}, xe = Symbol("carousel"), tl = (t) => {
  const i = Kt([]), o = (n) => {
    n !== void 0 ? i.slice(n).forEach((l, a) => {
      var y;
      (y = l.exposed) === null || y === void 0 || y.setIndex(n + a);
    }) : i.forEach((l, a) => {
      var y;
      (y = l.exposed) === null || y === void 0 || y.setIndex(a);
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
      i.splice(a, 0, n), o(a), t("slide-registered", { slide: n, index: a });
    },
    unregisterSlide: (n) => {
      const l = i.indexOf(n);
      l !== -1 && (t("slide-unregistered", { slide: n, index: l }), i.splice(l, 1), o(l));
    }
  };
};
function al(t) {
  return t.length === 0 ? 0 : t.reduce((o, n) => o + n, 0) / t.length;
}
function na({ slides: t, position: i, toShow: o }) {
  const n = [], l = i === "before", a = l ? -o : 0, y = l ? 0 : o;
  if (t.length <= 0)
    return n;
  for (let k = a; k < y; k++) {
    const u = {
      index: l ? k : k + t.length,
      isClone: !0,
      position: i,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${i}-${k}`
    }, v = t[(k % t.length + t.length) % t.length].vnode, I = Ua(v, u);
    I.el = null, n.push(I);
  }
  return n;
}
const ll = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function oa(t) {
  if (!t.el || !(t.el instanceof Element))
    return;
  const i = t.el.querySelectorAll(ll);
  for (const o of i)
    o instanceof HTMLElement && !o.hasAttribute("disabled") && o.getAttribute("aria-hidden") !== "true" && o.setAttribute("tabindex", "-1");
}
function nl(t, i) {
  return Object.keys(t).filter((o) => !i.includes(o)).reduce((o, n) => (o[n] = t[n], o), {});
}
function ol(t) {
  const { isVertical: i, isReversed: o, dragged: n, effectiveSlideSize: l } = t, a = i ? n.y : n.x;
  if (a === 0)
    return 0;
  const y = Math.round(a / l);
  return o ? y : -y;
}
function Ae({ val: t, max: i, min: o }) {
  return i < o ? t : Math.min(Math.max(t, isNaN(o) ? t : o), isNaN(i) ? t : i);
}
function il(t) {
  const { transform: i } = window.getComputedStyle(t);
  return i.split(/[(,)]/).slice(1, -1).map((o) => parseFloat(o));
}
function rl(t) {
  let i = 1, o = 1;
  return t.forEach((n) => {
    const l = il(n);
    l.length === 6 && (i /= l[0], o /= l[3]);
  }), { widthMultiplier: i, heightMultiplier: o };
}
function ul(t, i) {
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
function sl(t, i, o) {
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
function Wt({ slideSize: t, viewportSize: i, align: o, itemsToShow: n }) {
  return n !== void 0 ? ul(o, n) : t !== void 0 && i !== void 0 ? sl(o, t, i) : 0;
}
function ha(t = "", i = {}) {
  return Object.entries(i).reduce((o, [n, l]) => o.replace(`{${n}}`, String(l)), t);
}
function ka({ val: t, max: i, min: o = 0 }) {
  const n = i - o + 1;
  return ((t - o) % n + n) % n + o;
}
function Xt(t, i = 0) {
  let o = !1, n = 0, l = null;
  function a(...y) {
    if (o)
      return;
    o = !0;
    const k = () => {
      l = requestAnimationFrame((D) => {
        D - n > i ? (n = D, t(...y), o = !1) : k();
      });
    };
    k();
  }
  return a.cancel = () => {
    l && (cancelAnimationFrame(l), l = null, o = !1);
  }, a;
}
function At(t, i = "px") {
  if (!(t == null || t === ""))
    return typeof t == "number" || parseFloat(t).toString() === t ? `${t}${i}` : t;
}
const dl = he({
  name: "CarouselAria",
  setup() {
    const t = yt(xe);
    return t ? () => J("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, ha(t.config.i18n.itemXofY, {
      currentSlide: t.currentSlide + 1,
      slidesCount: t.slidesCount
    })) : () => "";
  }
}), cl = {
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
    validator(t) {
      return ma.includes(t);
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
    validator(t, i) {
      return t && i.wrapAround && console.warn('[vue3-carousel warn]: "preventExcessiveDragging" cannot be used with wrapAround. The setting will be ignored.'), !0;
    }
  },
  // control snap position alignment
  snapAlign: {
    default: G.snapAlign,
    validator(t) {
      return ba.includes(t);
    }
  },
  slideEffect: {
    type: String,
    default: G.slideEffect,
    validator(t) {
      return ya.includes(t);
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
    validator(t, i) {
      if (!ga.includes(t))
        return !1;
      const o = t in Vt ? Vt[t] : t;
      return ["ttb", "btt"].includes(o) && (!i.height || i.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${t}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: G.wrapAround,
    type: Boolean
  }
}, vl = he({
  name: "VueCarousel",
  props: cl,
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
  setup(t, { slots: i, emit: o, expose: n }) {
    var l;
    const a = tl(o), y = a.getSlides(), k = r(() => y.length), D = E(null), u = E(null), v = E(0), I = r(() => Object.assign(Object.assign(Object.assign({}, G), nl(t, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, G.i18n), t.i18n) })), f = Kt(Object.assign({}, I.value)), g = E((l = t.modelValue) !== null && l !== void 0 ? l : 0), V = E(g.value);
    U(g, (s) => V.value = s);
    const A = E(0), et = r(() => Math.ceil((k.value - 1) / 2)), ie = r(() => k.value - 1), re = r(() => 0);
    let te = null, d = null, T = null;
    const ue = r(() => v.value + f.gap), j = r(() => {
      const s = f.dir || "ltr";
      return s in Vt ? Vt[s] : s;
    }), ne = r(() => ["rtl", "btt"].includes(j.value)), se = r(() => ["ttb", "btt"].includes(j.value)), _ = r(() => f.itemsToShow === "auto"), z = r(() => se.value ? "height" : "width");
    function De() {
      var s;
      if (!tt.value)
        return;
      const h = (I.value.breakpointMode === "carousel" ? (s = D.value) === null || s === void 0 ? void 0 : s.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, C = Object.keys(t.breakpoints || {}).map((L) => Number(L)).sort((L, W) => +W - +L), B = {};
      C.some((L) => h >= L ? (Object.assign(B, t.breakpoints[L]), B.i18n && Object.assign(B.i18n, I.value.i18n, t.breakpoints[L].i18n), !0) : !1), Object.assign(f, I.value, B);
    }
    const Rt = Xt(() => {
      De(), Ue(), K();
    }), de = Kt(/* @__PURE__ */ new Set()), ae = E([]);
    function Lt({ widthMultiplier: s, heightMultiplier: h }) {
      ae.value = y.map((C) => {
        var B;
        const L = (B = C.exposed) === null || B === void 0 ? void 0 : B.getBoundingRect();
        return {
          width: L.width * s,
          height: L.height * h
        };
      });
    }
    const _e = E({
      width: 0,
      height: 0
    });
    function Nt({ widthMultiplier: s, heightMultiplier: h }) {
      var C;
      const B = ((C = u.value) === null || C === void 0 ? void 0 : C.getBoundingClientRect()) || { width: 0, height: 0 };
      _e.value = {
        width: B.width * s,
        height: B.height * h
      };
    }
    function K() {
      if (!u.value)
        return;
      const s = rl(de);
      if (Nt(s), Lt(s), _.value)
        v.value = al(ae.value.map((h) => h[z.value]));
      else {
        const h = Number(f.itemsToShow), C = (h - 1) * f.gap;
        v.value = (_e.value[z.value] - C) / h;
      }
    }
    function Ue() {
      !f.wrapAround && k.value > 0 && (g.value = Ae({
        val: g.value,
        max: ie.value,
        min: re.value
      })), _.value || (f.itemsToShow = Ae({
        val: Number(f.itemsToShow),
        max: k.value,
        min: 1
      }));
    }
    const Ie = r(() => typeof t.ignoreAnimations == "string" ? t.ignoreAnimations.split(",") : Array.isArray(t.ignoreAnimations) ? t.ignoreAnimations : t.ignoreAnimations ? !1 : []);
    Gt(() => Ue()), Gt(() => {
      K();
    });
    let Le;
    const bt = (s) => {
      const h = s.target;
      if (!(!(h != null && h.contains(D.value)) || Array.isArray(Ie.value) && Ie.value.includes(s.animationName)) && (de.add(h), !Le)) {
        const C = () => {
          Le = requestAnimationFrame(() => {
            K(), C();
          });
        };
        C();
      }
    }, ht = (s) => {
      const h = s.target;
      h && de.delete(h), Le && de.size === 0 && (cancelAnimationFrame(Le), K());
    }, tt = E(!1);
    typeof document < "u" && Gt(() => {
      tt.value && Ie.value !== !1 ? (document.addEventListener("animationstart", bt), document.addEventListener("animationend", ht)) : (document.removeEventListener("animationstart", bt), document.removeEventListener("animationend", ht));
    }), Zt(() => {
      tt.value = !0, De(), it(), D.value && (T = new ResizeObserver(Rt), T.observe(D.value)), o("init");
    }), Oa(() => {
      tt.value = !1, a.cleanup(), d && clearTimeout(d), Le && cancelAnimationFrame(Le), te && clearInterval(te), T && (T.disconnect(), T = null), typeof document < "u" && ve(), D.value && (D.value.removeEventListener("transitionend", K), D.value.removeEventListener("animationiteration", K));
    });
    let ce = !1;
    const at = { x: 0, y: 0 }, x = Ht({ x: 0, y: 0 }), lt = E(!1), nt = E(!1), Mt = () => {
      lt.value = !0;
    }, Ot = () => {
      lt.value = !1;
    }, ot = Xt((s) => {
      if (!s.ctrlKey)
        switch (s.key) {
          case "ArrowLeft":
          case "ArrowUp":
            se.value === s.key.endsWith("Up") && (ne.value ? je(!0) : Me(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            se.value === s.key.endsWith("Down") && (ne.value ? Me(!0) : je(!0));
            break;
        }
    }, 200), kt = () => {
      document.addEventListener("keydown", ot);
    }, ve = () => {
      document.removeEventListener("keydown", ot);
    };
    function Ne(s) {
      const h = s.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(h) || ke.value || (ce = s.type === "touchstart", !ce && (s.preventDefault(), s.button !== 0)))
        return;
      at.x = "touches" in s ? s.touches[0].clientX : s.clientX, at.y = "touches" in s ? s.touches[0].clientY : s.clientY;
      const C = ce ? "touchmove" : "mousemove", B = ce ? "touchend" : "mouseup";
      document.addEventListener(C, ee, { passive: !1 }), document.addEventListener(B, St, { passive: !0 });
    }
    const ee = Xt((s) => {
      nt.value = !0;
      const h = "touches" in s ? s.touches[0].clientX : s.clientX, C = "touches" in s ? s.touches[0].clientY : s.clientY;
      x.x = h - at.x, x.y = C - at.y;
      const B = ol({
        isVertical: se.value,
        isReversed: ne.value,
        dragged: x,
        effectiveSlideSize: ue.value
      });
      V.value = f.wrapAround ? g.value + B : Ae({
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
      q(V.value), x.x = 0, x.y = 0, nt.value = !1;
      const s = ce ? "touchmove" : "mousemove", h = ce ? "touchend" : "mouseup";
      document.removeEventListener(s, ee), document.removeEventListener(h, St);
    }
    function it() {
      !f.autoplay || f.autoplay <= 0 || (te = setInterval(() => {
        f.pauseAutoplayOnHover && lt.value || je();
      }, f.autoplay));
    }
    function Ct() {
      te && (clearInterval(te), te = null);
    }
    function rt() {
      Ct(), it();
    }
    const ke = E(!1);
    function q(s, h = !1) {
      if (!h && ke.value)
        return;
      let C = s, B = s;
      A.value = g.value, f.wrapAround ? B = ka({
        val: C,
        max: ie.value,
        min: re.value
      }) : C = Ae({
        val: C,
        max: ie.value,
        min: re.value
      }), o("slide-start", {
        slidingToIndex: s,
        currentSlideIndex: g.value,
        prevSlideIndex: A.value,
        slidesCount: k.value
      }), Ct(), ke.value = !0, g.value = C, B !== C && Oe.pause(), o("update:modelValue", B), d = setTimeout(() => {
        f.wrapAround && B !== C && (Oe.resume(), g.value = B, o("loop", {
          currentSlideIndex: g.value,
          slidingToIndex: s
        })), o("slide-end", {
          currentSlideIndex: g.value,
          prevSlideIndex: A.value,
          slidesCount: k.value
        }), ke.value = !1, rt();
      }, f.transition);
    }
    function je(s = !1) {
      q(g.value + f.itemsToScroll, s);
    }
    function Me(s = !1) {
      q(g.value - f.itemsToScroll, s);
    }
    function $t() {
      De(), Ue(), K(), rt();
    }
    U(() => [I.value, t.breakpoints], () => De(), { deep: !0 }), U(() => t.autoplay, () => rt());
    const Oe = U(() => t.modelValue, (s) => {
      s !== g.value && q(Number(s), !0);
    });
    o("before-init");
    const Te = r(() => {
      if (!f.wrapAround)
        return { before: 0, after: 0 };
      if (_.value)
        return { before: y.length, after: y.length };
      const s = Number(f.itemsToShow), h = Math.ceil(s + (f.itemsToScroll - 1)), C = h - V.value, B = h - (k.value - (V.value + 1));
      return {
        before: Math.max(0, C),
        after: Math.max(0, B)
      };
    }), ut = r(() => Te.value.before ? _.value ? ae.value.slice(-1 * Te.value.before).reduce((s, h) => s + h[z.value] + f.gap, 0) * -1 : Te.value.before * ue.value * -1 : 0), st = r(() => {
      var s;
      if (_.value) {
        const h = (g.value % y.length + y.length) % y.length;
        return Wt({
          slideSize: (s = ae.value[h]) === null || s === void 0 ? void 0 : s[z.value],
          viewportSize: _e.value[z.value],
          align: f.snapAlign
        });
      }
      return Wt({
        align: f.snapAlign,
        itemsToShow: +f.itemsToShow
      });
    }), dt = r(() => {
      let s = 0;
      if (_.value) {
        if (g.value < 0 ? s = ae.value.slice(g.value).reduce((h, C) => h + C[z.value] + f.gap, 0) * -1 : s = ae.value.slice(0, g.value).reduce((h, C) => h + C[z.value] + f.gap, 0), s -= st.value, !f.wrapAround) {
          const h = ae.value.reduce((C, B) => C + B[z.value] + f.gap, 0) - _e.value[z.value] - f.gap;
          s = Ae({
            val: s,
            max: h,
            min: 0
          });
        }
      } else {
        let h = g.value - st.value;
        f.wrapAround || (h = Ae({
          val: h,
          max: k.value - +f.itemsToShow,
          min: 0
        })), s = h * ue.value;
      }
      return s * (ne.value ? 1 : -1);
    }), Se = r(() => {
      var s, h;
      if (!_.value) {
        const L = g.value - st.value;
        return f.wrapAround ? {
          min: Math.floor(L),
          max: Math.ceil(L + Number(f.itemsToShow) - 1)
        } : {
          min: Math.floor(Ae({
            val: L,
            max: k.value - Number(f.itemsToShow),
            min: 0
          })),
          max: Math.ceil(Ae({
            val: L + Number(f.itemsToShow) - 1,
            max: k.value - 1,
            min: 0
          }))
        };
      }
      let C = 0;
      {
        let L = 0, W = 0 - Te.value.before;
        const le = Math.abs(dt.value + ut.value);
        for (; L <= le; ) {
          const oe = (W % y.length + y.length) % y.length;
          L += ((s = ae.value[oe]) === null || s === void 0 ? void 0 : s[z.value]) + f.gap, W++;
        }
        C = W - 1;
      }
      let B = 0;
      {
        let L = C, W = 0;
        for (L < 0 ? W = ae.value.slice(0, L).reduce((le, oe) => le + oe[z.value] + f.gap, 0) - Math.abs(dt.value + ut.value) : W = ae.value.slice(0, L).reduce((le, oe) => le + oe[z.value] + f.gap, 0) - Math.abs(dt.value); W < _e.value[z.value]; ) {
          const le = (L % y.length + y.length) % y.length;
          W += ((h = ae.value[le]) === null || h === void 0 ? void 0 : h[z.value]) + f.gap, L++;
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
      const s = se.value ? "Y" : "X", h = se.value ? x.y : x.x;
      let C = dt.value + h;
      if (!f.wrapAround && f.preventExcessiveDragging) {
        let B = 0;
        _.value ? B = ae.value.reduce((le, oe) => le + oe[z.value], 0) : B = (k.value - Number(f.itemsToShow)) * ue.value;
        const L = ne.value ? 0 : -1 * B, W = ne.value ? B : 0;
        C = Ae({
          val: C,
          min: L,
          max: W
        });
      }
      return `translate${s}(${C}px)`;
    }), Pt = r(() => ({
      "--vc-transition-duration": ke.value ? At(f.transition, "ms") : void 0,
      "--vc-slide-gap": At(f.gap),
      "--vc-carousel-height": At(f.height),
      "--vc-cloned-offset": At(ut.value)
    })), vt = { slideTo: q, next: je, prev: Me }, _t = Ht({
      activeSlide: V,
      config: f,
      currentSlide: g,
      isSliding: ke,
      isVertical: se,
      maxSlide: ie,
      minSlide: re,
      nav: vt,
      normalizedDir: j,
      slideRegistry: a,
      slideSize: v,
      slides: y,
      slidesCount: k,
      viewport: u,
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
    return n({
      data: ft,
      nav: vt,
      next: je,
      prev: Me,
      restartCarousel: $t,
      slideTo: q,
      updateBreakpointsConfig: De,
      updateSlideSize: K,
      updateSlidesData: Ue
    }), () => {
      var s;
      const h = i.default || i.slides, C = (h == null ? void 0 : h(ft)) || [], { before: B, after: L } = Te.value, W = na({
        slides: y,
        position: "before",
        toShow: B
      }), le = na({
        slides: y,
        position: "after",
        toShow: L
      }), oe = [...W, ...C, ...le];
      if (!f.enabled || !oe.length)
        return J("section", {
          ref: D,
          class: ["carousel", "is-disabled"]
        }, oe);
      const Ut = ((s = i.addons) === null || s === void 0 ? void 0 : s.call(i, ft)) || [], ze = J("ol", {
        class: "carousel__track",
        style: { transform: Ft.value },
        onMousedownCapture: f.mouseDrag ? Ne : null,
        onTouchstartPassiveCapture: f.touchDrag ? Ne : null
      }, oe), wt = J("div", { class: "carousel__viewport", ref: u }, ze);
      return J("section", {
        ref: D,
        class: [
          "carousel",
          `is-${j.value}`,
          `is-effect-${f.slideEffect}`,
          {
            "is-vertical": se.value,
            "is-sliding": ke.value,
            "is-dragging": nt.value,
            "is-hover": lt.value
          }
        ],
        dir: j.value,
        style: Pt.value,
        "aria-label": f.i18n.ariaGallery,
        tabindex: "0",
        onFocus: kt,
        onBlur: ve,
        onMouseenter: Mt,
        onMouseleave: Ot
      }, [wt, Ut, J(dl)]);
    };
  }
});
var Jt;
(function(t) {
  t.arrowDown = "arrowDown", t.arrowLeft = "arrowLeft", t.arrowRight = "arrowRight", t.arrowUp = "arrowUp";
})(Jt || (Jt = {}));
const ia = (t) => `icon${t.charAt(0).toUpperCase() + t.slice(1)}`, fl = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function pl(t) {
  return t in Jt;
}
const ra = (t) => t && pl(t), ua = he({
  props: {
    name: {
      type: String,
      required: !0,
      validator: ra
    },
    title: {
      type: String,
      default: (t) => t.name ? G.i18n[ia(t.name)] : ""
    }
  },
  setup(t) {
    const i = yt(xe, null);
    return () => {
      const o = t.name;
      if (!o || !ra(o))
        return;
      const n = fl[o], l = J("path", { d: n }), a = (i == null ? void 0 : i.config.i18n[ia(o)]) || t.title, y = J("title", a);
      return J("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": a
      }, [y, l]);
    };
  }
}), ml = he({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(t, { slots: i, attrs: o }) {
    const n = yt(xe);
    if (!n)
      return () => "";
    const { next: l, prev: a } = i, y = () => ({
      btt: "arrowDown",
      ltr: "arrowLeft",
      rtl: "arrowRight",
      ttb: "arrowUp"
    })[n.normalizedDir], k = () => ({
      btt: "arrowUp",
      ltr: "arrowRight",
      rtl: "arrowLeft",
      ttb: "arrowDown"
    })[n.normalizedDir], D = r(() => !n.config.wrapAround && n.currentSlide <= n.minSlide), u = r(() => !n.config.wrapAround && n.currentSlide >= n.maxSlide);
    return () => {
      const { i18n: v } = n.config, I = J("button", Object.assign(Object.assign({ type: "button", disabled: D.value, "aria-label": v.ariaPreviousSlide, title: v.ariaPreviousSlide, onClick: n.nav.prev }, o), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": D.value },
        o.class
      ] }), (a == null ? void 0 : a()) || J(ua, { name: y() })), f = J("button", Object.assign(Object.assign({ type: "button", disabled: u.value, "aria-label": v.ariaNextSlide, title: v.ariaNextSlide, onClick: n.nav.next }, o), { class: [
        "carousel__next",
        { "carousel__next--disabled": u.value },
        o.class
      ] }), (l == null ? void 0 : l()) || J(ua, { name: k() }));
      return [I, f];
    };
  }
}), gl = he({
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
    const i = yt(xe);
    if (!i)
      return () => "";
    const o = r(() => i.config.itemsToShow), n = r(() => Wt({
      align: i.config.snapAlign,
      itemsToShow: o.value
    })), l = r(() => t.paginateByItemsToShow && o.value > 1), a = r(() => Math.ceil((i.activeSlide - n.value) / o.value)), y = r(() => Math.ceil(i.slidesCount / o.value)), k = (D) => ka(l.value ? {
      val: a.value,
      max: y.value - 1,
      min: 0
    } : {
      val: i.activeSlide,
      max: i.maxSlide,
      min: i.minSlide
    }) === D;
    return () => {
      var D, u;
      const v = [];
      for (let I = l.value ? 0 : i.minSlide; I <= (l.value ? y.value - 1 : i.maxSlide); I++) {
        const f = ha(i.config.i18n[l.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: I + 1
        }), g = k(I), V = J("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": g
          },
          "aria-label": f,
          "aria-pressed": g,
          "aria-controls": (u = (D = i.slides[I]) === null || D === void 0 ? void 0 : D.exposed) === null || u === void 0 ? void 0 : u.id,
          title: f,
          disabled: t.disableOnClick,
          onClick: () => i.nav.slideTo(l.value ? Math.floor(I * +i.config.itemsToShow + n.value) : I)
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
      default: (t) => t.isClone ? void 0 : $a()
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
  setup(t, { attrs: i, slots: o, expose: n }) {
    const l = yt(xe);
    if (da(xe, void 0), !l)
      return () => "";
    const a = E(t.index), y = (V) => {
      a.value = V;
    }, k = Fa(), D = () => {
      const V = k.vnode.el;
      return V ? V.getBoundingClientRect() : { width: 0, height: 0 };
    };
    n({
      id: t.id,
      setIndex: y,
      getBoundingRect: D
    });
    const u = r(() => a.value === l.activeSlide), v = r(() => a.value === l.activeSlide - 1), I = r(() => a.value === l.activeSlide + 1), f = r(() => a.value >= l.visibleRange.min && a.value <= l.visibleRange.max), g = r(() => {
      if (l.config.itemsToShow === "auto")
        return;
      const V = l.config.itemsToShow, A = l.config.gap > 0 && V > 1 ? `calc(${100 / V}% - ${l.config.gap * (V - 1) / V}px)` : `${100 / V}%`;
      return l.isVertical ? { height: A } : { width: A };
    });
    return l.slideRegistry.registerSlide(k, t.index), Pa(() => {
      l.slideRegistry.unregisterSlide(k);
    }), t.isClone && (Zt(() => {
      oa(k.vnode);
    }), _a(() => {
      oa(k.vnode);
    })), () => {
      var V, A;
      return l.config.enabled ? J("li", {
        style: [i.style, Object.assign({}, g.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": t.isClone,
          "carousel__slide--visible": f.value,
          "carousel__slide--active": u.value,
          "carousel__slide--prev": v.value,
          "carousel__slide--next": I.value,
          "carousel__slide--sliding": l.isSliding
        },
        onFocusin: () => {
          l.viewport && (l.viewport.scrollLeft = 0), l.nav.slideTo(a.value);
        },
        id: t.isClone ? void 0 : t.id,
        "aria-hidden": t.isClone || void 0
      }, (A = o.default) === null || A === void 0 ? void 0 : A.call(o, {
        currentIndex: a.value,
        isActive: u.value,
        isClone: t.isClone,
        isPrev: v.value,
        isNext: I.value,
        isSliding: l.isSliding,
        isVisible: f.value
      })) : (V = o.default) === null || V === void 0 ? void 0 : V.call(o);
    };
  }
}), yl = (t, i, o, n) => {
  var y, k, D, u, v;
  if (!o) return 0;
  let l, a;
  if (o.type === Re.Field ? [Ke.Number, Ke.Range].includes((y = o.field) == null ? void 0 : y.type) ? (l = parseFloat(t[o.key]), a = parseFloat(i[o.key])) : [Ke.Date, Ke.Date].includes((k = o.field) == null ? void 0 : k.type) ? (l = t[o.key], a = i[o.key]) : ((D = o.field) == null ? void 0 : D.type) === Ke.Select && ((u = o.field) != null && u.multiple) && ((v = o.field) == null ? void 0 : v.multipleDisplay) === Ha.Count ? (l = t[o.key].length, a = i[o.key].length) : (l = String(t[o.key]).toLowerCase(), a = String(i[o.key]).toLowerCase()) : (l = String(t[o.key]).toLowerCase(), a = String(i[o.key]).toLowerCase()), n === Ze.Asc) {
    if (l > a) return 1;
    if (a > l) return -1;
  } else {
    if (l > a) return -1;
    if (a > l) return 1;
  }
  return 0;
}, We = (t, i, o, n = []) => {
  if (t.extractTitleFromColumn) {
    let a = n.find((y) => y.key === t.extractTitleFromColumn);
    if (a)
      return We(a, i, o, n);
  }
  let l = t.type === Re.ColumnIndex ? o : i[t.key];
  if (t.formatter && typeof t.formatter == "function") {
    let a = t.formatter(l, i, t, o);
    return typeof a == "string" && a.startsWith("__:") ? Ga(a.substring(3)) : a;
  }
  return l;
}, bl = (t, i, o) => {
  if (!t.colspan) return -1;
  let n = i;
  return o.forEach((l) => {
    let a = xt(t, l);
    a > 0 && a < n && (n = a);
  }), n;
}, xt = (t, i) => t.colspan === !1 ? !1 : typeof t.colspan == "function" ? t.colspan(i) : t.colspan, Sa = (t, i) => typeof t.preferSlot > "u" ? !0 : t.preferSlot === !1 ? !1 : typeof t.preferSlot == "function" ? t.preferSlot(i) : !0, hl = (t, i, o) => {
  if (typeof t != "object" || !t.key && [Re.Field].includes(t.type) || i.indexOf(t.key) > -1) return !1;
  let n = xt(t, o);
  return typeof t.colspan > "u" ? !0 : (typeof t.colspan < "u" && (typeof t.colspan == "function" ? n = parseInt(t.colspan(o)) : n = parseInt(t.colspan)), n > 0);
}, kl = (t = []) => {
  if (t.length > 0) {
    for (let i = 0; i < t.length; ++i)
      if (t[i].sortable) return t[i].key;
  }
  return "";
}, Sl = (t, i) => {
  if (t.length > 0) {
    for (let o = 0; o < t.length; ++o)
      if (t[o].key === i) return t[o];
  }
  return null;
}, Ca = (t) => {
  let i = [];
  return t.class && i.push(t.class), t.type && i.push(`is-${t.type}`), i.join(" ");
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
  setup(t, { emit: i }) {
    const o = i, n = t, l = E(n.modelValue);
    U(() => n.modelValue, (v) => {
      l.value = v;
    }), U(l, (v) => {
      o("update:modelValue", v);
    });
    const a = () => {
      o("inline-drop");
    }, y = r(() => ({ ...n.column.slotData, item: l.value })), k = r(() => {
      var v, I, f, g;
      if ((v = n.column.field) != null && v.modalData && typeof ((I = n.column.field) == null ? void 0 : I.modalData) == "object")
        for (let V in n.column.field.modalData)
          if (typeof ((f = n.column.field) == null ? void 0 : f.modalData[V]) == "string" && n.column.field.modalData[V].startsWith("prop:")) {
            let A = n.column.field.modalData[V].substring(5);
            l.value[A];
          } else
            n.column.field.modalData[V];
      return (g = n.column.field) == null ? void 0 : g.modalData;
    }), D = r(() => typeof n.column.field == "string" && n.column.field.startsWith("prop:") ? qa(n.column.field, l.value) : n.column.field), u = r(() => {
      var v, I, f, g;
      return n.column.type === Re.Field ? !((I = (v = n.column) == null ? void 0 : v.field) != null && I.label) && (n.column.ensureFieldLabel || [
        Ke.Switch,
        Ke.Check
      ].includes((f = n.column.field) == null ? void 0 : f.type)) ? n.column.label : (g = n.column.field) == null ? void 0 : g.label : "";
    });
    return (v, I) => {
      const f = ye("lkt-anchor"), g = ye("lkt-button"), V = ye("lkt-field");
      return v.column.type === b(Re).Anchor ? (p(), O(f, Y({ key: 0 }, v.column.anchor, { prop: l.value }), {
        default: P(() => [
          Je(Qe(b(We)(v.column, l.value, v.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : v.column.type === b(Re).Button ? (p(), O(g, Y({ key: 1 }, v.column.button, { prop: l.value }), {
        default: P(() => [
          Je(Qe(b(We)(v.column, l.value, v.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : v.column.type === b(Re).Field ? (p(), O(V, Y({
        key: 2,
        modelValue: l.value[v.column.key],
        "onUpdate:modelValue": I[0] || (I[0] = (A) => l.value[v.column.key] = A)
      }, {
        ...D.value,
        readMode: !v.hasInlineEditPerm || D.value.readMode,
        slotData: y.value,
        label: u.value,
        modalData: k.value,
        prop: l.value
      }), null, 16, ["modelValue"])) : v.column.type === b(Re).InlineDrop ? (p(), O(g, Y({ key: 3 }, v.column.button, {
        prop: l.value,
        onClick: a
      }), {
        default: P(() => [
          Je(Qe(b(We)(v.column, l.value, v.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : v.column.type === b(Re).ColumnIndex && v.column.field ? (p(), O(V, fe(Y({ key: 4 }, {
        ...D.value,
        modelValue: b(We)(v.column, l.value, v.i, v.columns),
        readMode: !0,
        slotData: y.value,
        label: u.value,
        modalData: k.value,
        prop: l.value
      })), null, 16)) : (p(), w(H, { key: 5 }, [
        Je(Qe(b(We)(v.column, l.value, v.i, v.columns)), 1)
      ], 64));
    };
  }
}), gt = class gt {
};
gt.navButtonSlot = "", gt.createButtonSlot = "", gt.defaultEmptySlot = void 0;
let be = gt;
const Cl = ["data-i", "data-draggable"], wl = ["data-role", "data-i"], Dl = {
  key: 1,
  class: "lkt-table-nav-cell"
}, Il = { class: "lkt-table-nav-container" }, Tl = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, Bl = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, El = ["colspan"], Al = ["colspan"], Vl = ["colspan"], Rl = ["data-column", "colspan", "title"], Ll = /* @__PURE__ */ he({
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
  setup(t, { emit: i }) {
    const o = ca(), n = i, l = t, a = E(l.modelValue);
    let y = typeof l.rowDisplayType == "function" ? l.rowDisplayType(a.value, l.i) : l.rowDisplayType;
    y || (y = we.Auto);
    const k = [we.Auto, we.PreferCustomItem].includes(y), D = [we.Auto, we.PreferItem].includes(y), u = (d) => n("click", d), v = r(() => {
      let d = [], T = typeof l.disabledDrag == "function" ? l.disabledDrag(a.value) : ie.value === !0;
      return !T && l.sortable && l.isDraggable ? d.push("handle") : T && d.push("disabled"), d.join(" ");
    }), I = r(() => be.navButtonSlot !== ""), f = r(() => be.navButtonSlot), g = () => {
      n("item-up", l.i);
    }, V = () => {
      n("item-down", l.i);
    }, A = () => {
      n("item-drop", l.i);
    };
    U(() => l.modelValue, (d) => a.value = d), U(a, (d) => {
      n("update:modelValue", d);
    }, { deep: !0 });
    const et = r(() => typeof l.renderDrag == "function" ? l.renderDrag(a.value) : l.renderDrag === !0), ie = r(() => typeof l.disabledDrag == "function" ? l.disabledDrag(a.value) : l.disabledDrag === !0), re = r(() => v.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), te = r(() => {
      let d = [];
      return k && d.push("type-custom-item"), D && d.push("type-item"), typeof l.itemContainerClass == "function" ? d.push(l.itemContainerClass(a.value, l.i)) : l.itemContainerClass !== "" && d.push(l.itemContainerClass), d.join(" ");
    });
    return (d, T) => {
      const ue = ye("lkt-button");
      return p(), w("tr", {
        "data-i": d.i,
        "data-draggable": d.isDraggable,
        class: Z(te.value)
      }, [
        d.sortable && d.editModeEnabled && et.value ? (p(), w("td", {
          key: 0,
          "data-role": re.value,
          class: Z(v.value),
          "data-i": d.i
        }, T[2] || (T[2] = [
          me("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]), 10, wl)) : R("", !0),
        d.addNavigation && d.editModeEnabled ? (p(), w("td", Dl, [
          me("div", Il, [
            pe(ue, {
              palette: "table-nav",
              disabled: d.i === 0,
              onClick: g
            }, {
              default: P(() => [
                I.value ? (p(), O(ge(f.value), {
                  key: 0,
                  direction: "up"
                })) : (p(), w("i", Tl))
              ]),
              _: 1
            }, 8, ["disabled"]),
            pe(ue, {
              palette: "table-nav",
              disabled: d.latestRow,
              onClick: V
            }, {
              default: P(() => [
                I.value ? (p(), O(ge(f.value), {
                  key: 0,
                  direction: "down"
                })) : (p(), w("i", Bl))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : R("", !0),
        d.itemSlotComponent ? (p(), w("td", {
          key: "td" + d.i,
          colspan: d.visibleColumns.length
        }, [
          (p(), O(ge(d.itemSlotComponent), fe(va({
            item: a.value,
            index: d.i,
            editing: d.editModeEnabled,
            perms: d.permissions,
            data: d.itemSlotData,
            events: d.itemSlotEvents
          })), null, 16))
        ], 8, El)) : b(k) && b(o)[`item-${d.i}`] ? (p(), w("td", {
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
        ], 8, Al)) : b(D) && b(o).item ? (p(), w("td", {
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
        ], 8, Vl)) : (p(!0), w(H, { key: 5 }, Ce(d.visibleColumns, (j) => (p(), w(H, null, [
          b(hl)(j, d.emptyColumns, a.value) ? (p(), w("td", {
            key: "td" + d.i,
            "data-column": j.key,
            colspan: b(xt)(j, a.value),
            title: b(We)(j, a.value, d.i, d.visibleColumns),
            class: Z(b(Ca)(j)),
            onClick: T[1] || (T[1] = (ne) => u(ne))
          }, [
            d.$slots[j.key] && b(Sa)(j, a.value) ? $(d.$slots, j.key, {
              key: 0,
              value: a.value[j.key],
              item: a.value,
              column: j,
              i: d.i
            }) : a.value ? (p(), O(Qt, {
              key: 1,
              modelValue: a.value,
              "onUpdate:modelValue": T[0] || (T[0] = (ne) => a.value = ne),
              column: j,
              columns: d.visibleColumns,
              "edit-mode-enabled": d.editModeEnabled,
              "has-inline-edit-perm": d.hasInlineEditPerm,
              i: d.i,
              onInlineDrop: A
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : R("", !0)
          ], 10, Rl)) : R("", !0)
        ], 64))), 256))
      ], 10, Cl);
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
  setup(t, { emit: i }) {
    var u;
    const o = i, n = t, l = r(() => be.createButtonSlot !== ""), a = r(() => be.createButtonSlot), y = {
      ...(u = n.config) == null ? void 0 : u.modalData,
      beforeClose: (v) => {
        "itemCreated" in v && v.itemCreated === !0 && o("append", v.item);
      }
    }, k = {
      ...n.config
    };
    k.modalData = y;
    const D = () => {
      var v;
      if (!((v = n.config) != null && v.modal)) {
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
          l.value ? (p(), O(ge(a.value), { key: 0 })) : R("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), Nl = ["data-column", "data-sortable", "data-sort", "colspan", "title"], Ml = /* @__PURE__ */ he({
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
  setup(t, { emit: i }) {
    const o = i, n = t, l = r(() => bl(n.column, n.amountOfColumns, n.items)), a = r(() => n.column.sortable === !0), y = r(() => a.value && n.sortBy === n.column.key ? n.sortDirection : ""), k = r(() => pa(n.column.label)), D = r(() => a.value && n.sortBy === n.column.key ? n.sortDirection === Ze.Asc ? Ve.defaultTableSortAscIcon : n.sortDirection === Ze.Desc ? Ve.defaultTableSortDescIcon : "" : ""), u = () => o("click", n.column);
    return (v, I) => (p(), w("th", {
      "data-column": v.column.key,
      "data-sortable": a.value,
      "data-sort": y.value,
      colspan: l.value,
      title: k.value,
      class: Z(b(Ca)(v.column)),
      onClick: u
    }, [
      me("div", null, [
        Je(Qe(k.value) + " ", 1),
        D.value ? (p(), w("i", {
          key: 0,
          class: Z(D.value)
        }, null, 2)) : R("", !0)
      ])
    ], 10, Nl));
  }
}), Ol = ["id"], $l = { class: "lkt-table-page-buttons" }, Fl = { class: "switch-edition-mode" }, Pl = { class: "switch-edition-mode" }, _l = {
  key: 0,
  class: "lkt-table-page-buttons"
}, Ul = {
  key: 1,
  class: "lkt-table-page-filters"
}, jl = { class: "lkt-table" }, zl = { key: 0 }, Gl = { key: 0 }, Hl = {
  key: 0,
  "data-role": "drag-indicator"
}, ql = { key: 1 }, Xl = ["id"], Yl = ["id"], Kl = ["data-i"], Wl = ["id"], Jl = ["data-i"], Ql = ["id"], Zl = { class: "lkt-carousel-slide" }, xl = { class: "lkt-carousel-slide" }, en = ["id"], tn = {
  key: 2,
  class: "lkt-table-empty"
}, an = {
  key: 4,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, ln = /* @__PURE__ */ he({
  __name: "LktTable",
  props: /* @__PURE__ */ ja({
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
  }, Xa(Ya)),
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
    var ta, aa;
    const n = o, l = ca(), a = t, y = E(typeof a.sorter == "function" ? a.sorter : yl), k = E(kl(a.columns)), D = E(Ze.Asc), u = E(a.modelValue), v = E(null), I = E(a.columns), f = E((ta = a.paginator) == null ? void 0 : ta.modelValue), g = E(a.loading), V = E(!1), A = E(a.perms), et = E(null), ie = E(null), re = E(null), te = E({}), d = E(new Ja({ items: u.value }, a.dataStateConfig)), T = E(a.editMode), ue = E(0), j = E(null), ne = E(a.type), se = E(((aa = a.carousel) == null ? void 0 : aa.currentSlide) || 0), _ = E(Ye(a.saveButton, Ve.defaultSaveButton)), z = E(Ye(a.createButton, Ve.defaultCreateButton)), De = E(Ye(a.editModeButton, Ve.defaultEditModeButton)), Rt = E(Ye(a.groupButton, Ve.defaultGroupButton));
    U(() => a.saveButton, (e) => _.value = Ye(a.saveButton, Ve.defaultSaveButton)), U(() => a.createButton, (e) => z.value = Ye(a.createButton, Ve.defaultCreateButton)), U(() => a.editModeButton, (e) => De.value = Ye(a.editModeButton, Ve.defaultEditModeButton));
    const de = E(!1);
    U(g, (e) => n("update:loading", e)), U(f, (e) => n("page", e));
    const ae = (e) => {
      A.value = e;
    }, Lt = (e) => {
      var c;
      if (Array.isArray(e.data)) {
        let N = e.data;
        typeof ((c = a.events) == null ? void 0 : c.parseResults) == "function" && (N = a.events.parseResults(N)), u.value = [...u.value, ...N];
      }
      g.value = !1, V.value = !0, d.value.store({ items: u.value }).turnStoredIntoOriginal(), de.value = !1, Bt(() => {
        x.value, n("read-response", e);
      });
    }, _e = () => Bt(() => {
      var e;
      (!a.paginator || ![Et.LoadMore, Et.Infinite].includes((e = a.paginator) == null ? void 0 : e.type)) && u.value.splice(0, u.value.length), g.value = !0;
    }), Nt = () => {
      et.value.doRefresh();
    }, K = Ka(12), Ue = r(() => {
      if (!a.hideEmptyColumns) return [];
      let e = [];
      return I.value.forEach((c) => {
        let N = c.key, F = !1;
        u.value.forEach((Q) => {
          if (typeof Q.checkEmpty == "function")
            return Q.checkEmpty(Q);
          Q[N] && (F = !0);
        }), F || e.push(N);
      }), e;
    }), Ie = r(() => I.value.filter((e) => !e.hidden)), Le = r(() => I.value.filter((e) => e.isForRowKey)), bt = r(() => I.value.map((e) => e.key)), ht = r(() => {
      let e = [];
      for (let c in l) bt.value.indexOf(c) !== -1 && e.push(c);
      return e;
    }), tt = r(() => {
      let e = [];
      for (let c in l) c.indexOf("slide-") !== -1 && e.push(c);
      return e;
    }), ce = r(() => {
      var e;
      return a.hiddenSave || g.value || !((e = _.value) != null && e.resource || _.value.type) ? !1 : T.value && de.value ? !0 : T.value;
    }), at = r(() => pt.value && u.value.length >= a.requiredItemsForTopCreate || Me.value ? !0 : ce.value || T.value && ve.value), x = r(() => {
      var e, c;
      return ue.value, typeof ((e = _.value) == null ? void 0 : e.disabled) == "function" ? _.value.disabled({
        value: u.value,
        dataState: d.value
      }) : typeof ((c = _.value) == null ? void 0 : c.disabled) == "boolean" ? _.value.disabled : !de.value;
    }), lt = r(() => u.value.length), nt = r(() => {
      var e;
      return {
        items: u.value,
        ...(e = _.value) == null ? void 0 : e.resourceData
      };
    }), Mt = r(() => a.titleTag === "" ? "h2" : a.titleTag), Ot = r(() => a.wrapContentTag === "" ? "div" : a.wrapContentTag), ot = r(() => pa(a.title)), kt = r(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }), ve = r(() => A.value.includes(Ee.Create)), Ne = r(() => A.value.includes("read")), ee = r(() => A.value.includes(Ee.Update)), St = r(() => A.value.includes(Ee.Edit)), it = r(() => A.value.includes(Ee.InlineEdit)), Ct = r(() => A.value.includes(Ee.ModalCreate)), rt = r(() => A.value.includes(Ee.InlineCreate)), ke = r(() => A.value.includes(Ee.InlineCreateEver)), q = r(() => A.value.includes(Ee.Drop)), je = r(() => A.value.includes(Ee.SwitchEditMode)), Me = r(() => !je.value || !ee.value && !q.value || !ee.value && q.value ? !1 : !g.value), $t = r(() => {
      var e;
      return (typeof ((e = a.paginator) == null ? void 0 : e.type) < "u" && [Et.LoadMore, Et.Infinite].includes(a.paginator.type) || !g.value) && u.value.length > 0;
    }), Oe = r(() => I.value.find((e) => e.isForAccordionHeader)), Te = r(() => I.value.find((e) => e.isCalendarDate)), ut = r(() => I.value.find((e) => e.isCalendarGroup)), st = (e, c) => typeof a.customItemSlotName == "function" ? a.customItemSlotName(e, c) : "", dt = (e) => {
      let c = e.target;
      if (typeof c.dataset.column > "u")
        do
          c = c.parentNode;
        while (typeof c.dataset.column > "u" && c.tagName !== "TABLE" && c.tagName !== "body");
      if (c.tagName === "TD" && (c = c.parentNode, c = c.dataset.i, typeof c < "u"))
        return u.value[c];
    }, Se = () => {
      ue.value = xa();
    }, Ft = (e) => u.value[e], Pt = (e) => {
      var c;
      return (c = v.value) == null ? void 0 : c.querySelector(`[data-i="${e}"]`);
    }, vt = (e) => {
      e && e.sortable && (e.key === k.value && (D.value = D.value === Ze.Asc ? Ze.Desc : Ze.Asc), k.value = e.key, u.value = u.value.sort((c, N) => y.value(c, N, e, D.value)), Se(), n("sort", {
        sortBy: k.value,
        sortDirection: D.value
      }));
    }, _t = (e) => {
      n("click", e);
    }, ft = (e) => {
      var N, F, Q, X, He, Fe, Be, S;
      let c = parseInt((X = (Q = (F = (N = e == null ? void 0 : e.originalEvent) == null ? void 0 : N.toElement) == null ? void 0 : F.closest("tr")) == null ? void 0 : Q.dataset) == null ? void 0 : X.i);
      return !(typeof ((He = a.drag) == null ? void 0 : He.isValid) == "function" && !((Fe = a.drag) != null && Fe.isValid(u.value[c])) || typeof ((Be = a.drag) == null ? void 0 : Be.isValid) == "boolean" && !((S = a.drag) != null && S.isValid));
    }, s = (e) => {
      var c, N;
      return typeof ((c = a.drag) == null ? void 0 : c.isDraggable) == "function" ? (N = a.drag) == null ? void 0 : N.isDraggable(e) : !0;
    }, h = () => {
      if (ve.value) {
        n("click-create");
        return;
      }
      if (rt.value || ke.value) {
        if (typeof a.newValueGenerator == "function") {
          let e = a.newValueGenerator();
          if (typeof e == "object" || $e.value !== Pe.Table) {
            u.value.push(e);
            return;
          }
        }
        u.value.push({});
      } else
        n("click-create");
    }, C = (e) => {
      u.value.push(e);
    }, B = () => g.value = !0, L = () => g.value = !1, W = (e, c) => {
      var N, F, Q;
      if (!((N = _.value) != null && N.type && [
        qt.Split,
        qt.SplitEver,
        qt.SplitLazy
      ].includes((F = _.value) == null ? void 0 : F.type))) {
        if (n("before-save"), (Q = _.value) != null && Q.resource && (g.value = !1, !c.success)) {
          n("error", c.httpStatus);
          return;
        }
        d.value.turnStoredIntoOriginal(), de.value = !1, n("save", c);
      }
    }, le = (e, c, N) => {
      if (N >= e.length) {
        let F = N - e.length + 1;
        for (; F--; ) e.push(void 0);
      }
      return e.splice(N, 0, e.splice(c, 1)[0]), e;
    }, oe = (e) => {
      le(u.value, e, e - 1), Se();
    }, Ut = (e) => {
      le(u.value, e, e + 1), Se();
    }, ze = (e) => {
      u.value.splice(e, 1), Se();
    }, wt = () => {
      var e;
      te.value && typeof ((e = te.value) == null ? void 0 : e.destroy) == "function" && (te.value.destroy(), te.value = {});
    }, jt = () => {
      j.value || (j.value = document.getElementById("lkt-table-body-" + K)), te.value = new Qa(j.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let c = e.oldIndex, N = e.newIndex;
          u.value.splice(N, 0, u.value.splice(c, 1)[0]), Se(), n("drag-end", u.value[N]);
        },
        onMove: function(e, c) {
          return ft(e);
        }
      });
    }, Dt = (e, c, N = !1) => {
      let F = [ue.value, K, "row", c];
      return N && F.push("hidden"), Le.value.forEach((Q) => {
        let X = String(e[Q.key]).toLowerCase();
        X.length > 50 && (X = X.substring(0, 50)), X = Wa(X, " ", "-"), F.push(X);
      }), F.join("-");
    }, zt = r(() => typeof a.createEnabledValidator == "function" ? a.createEnabledValidator({ items: u.value }) : !0), pt = r(() => a.createButton === !1 ? !1 : ke.value || ve.value && T.value || rt.value && T.value || Ct.value && T.value), wa = r(() => [Pe.Ol, Pe.Ul].includes($e.value)), mt = (e, c) => typeof a.itemDisplayChecker == "function" ? a.itemDisplayChecker(e, c) : !0, It = (e, c) => typeof a.itemContainerClass == "function" ? a.itemContainerClass(e, c) : a.itemContainerClass, Da = (e, c) => Oe.value ? e[Oe.value.key] : "", Ge = r(() => typeof a.itemSlotComponent == "function" ? a.itemSlotComponent() : a.itemSlotComponent), Tt = r(() => typeof a.itemSlotData == "function" ? a.itemSlotData() : a.itemSlotData);
    Zt(() => {
      var e;
      a.initialSorting && vt(Sl(a.columns, k.value)), d.value.store({ items: u.value }).turnStoredIntoOriginal(), de.value = !1, (e = a.drag) != null && e.enabled && Bt(() => {
        jt();
      });
    }), U(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }, (e) => {
      e ? jt() : wt();
    }), U(() => a.type, (e) => {
      var c;
      (c = a.drag) != null && c.enabled ? jt() : wt();
    }), U(() => a.perms, (e) => A.value = e), U(A, (e) => n("update:perms", e)), U(T, (e) => {
      n("update:editMode", e);
    }), U(() => a.editMode, (e) => T.value = e), U(() => a.columns, (e) => I.value = e, { deep: !0 }), U(() => a.modelValue, (e) => {
      u.value = e;
    }, { deep: !0 }), U(u, (e) => {
      d.value.increment({ items: e }), de.value = d.value.changed(), n("update:modelValue", e);
    }, { deep: !0 }), i({
      getItemByEvent: dt,
      getItemByIndex: Ft,
      getRowByIndex: Pt,
      doRefresh: Nt,
      doRemoveIndex: (e) => {
        u.value.splice(e, 1), Se();
      },
      getHtml: () => ie.value,
      reRender: Se,
      turnStoredIntoOriginal: () => {
        d.value.turnStoredIntoOriginal(), Bt(() => {
          Se();
        });
      }
    });
    const Ia = r(() => typeof be.defaultEmptySlot < "u"), Ta = r(() => be.defaultEmptySlot), Ba = r(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled ? !1 : typeof a.drag.canRender > "u" ? !0 : a.drag.canRender), Ea = r(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled || typeof a.drag.isDisabled > "u" ? !1 : a.drag.isDisabled), Aa = r(() => typeof a.header == "object" && Object.keys(a.header).length > 0), $e = r(() => Array.isArray(a.switchableTypes) && a.switchableTypes.length > 0 ? ne.value : a.type), Va = r(() => Array.isArray(a.switchableTypes) ? a.switchableTypes.length > 0 ? a.switchableTypes.includes(a.type) ? a.switchableTypes : [
      a.type,
      ...a.switchableTypes
    ] : [] : []), Ra = r(() => {
      let e = [];
      return Va.value.forEach((c) => {
        e.push({
          ...a.switchableTypesButtons[c],
          events: {
            click: (N) => {
              ne.value = c, typeof a.switchableTypesButtons[c] == "function" && a.switchableTypesButtons[c](N);
            }
          }
        });
      }), e;
    }), La = r(() => {
      var e, c;
      return {
        ...a.header,
        topEndButtons: [
          ...typeof ((e = a.header) == null ? void 0 : e.topEndButtons) > "u" ? [] : (c = a.header) == null ? void 0 : c.topEndButtons,
          ...Ra.value
        ]
      };
    }), ea = (e, c) => typeof a.useItemSlot == "function" ? a.useItemSlot({ item: e, index: c }) === !0 : a.useItemSlot, Na = r(() => {
      if (!Te.value || typeof Te.value > "u") return [];
      let e = [], c = [];
      return u.value.forEach((N) => {
        var S;
        let F = N[Te.value.key], Q = Za("Y-m-d H:i:s", F), X;
        (S = ut.value) != null && S.key && (X = N[ut.value.key]);
        let He = {};
        X && a.calendarGroups && typeof a.calendarGroups[X] == "object" && (He = a.calendarGroups[X]);
        const Fe = [Q, X].join("-");
        let Be = -1;
        c.includes(Fe) ? Be = c.findIndex((m) => m === Fe) : (Be = c.length, c.push(Fe), e.push({
          date: F,
          data: {
            items: []
          },
          dot: {
            ...He,
            class: `lkt-calendar-group--${X}`
          }
        })), e[Be].data.items.push(N);
      }), e;
    });
    return (e, c) => {
      const N = ye("lkt-header"), F = ye("lkt-button"), Q = ye("lkt-accordion"), X = ye("lkt-calendar"), He = ye("lkt-loader"), Fe = ye("lkt-paginator");
      return p(), w("section", {
        ref_key: "element",
        ref: ie,
        class: "lkt-table-page",
        id: "lkt-table-page-" + b(K)
      }, [
        Aa.value ? (p(), O(N, fe(Y({ key: 0 }, La.value)), null, 16)) : ot.value || b(l).title ? (p(), w("header", {
          key: 1,
          class: Z(e.headerClass)
        }, [
          ot.value ? (p(), O(ge(Mt.value), { key: 0 }, {
            default: P(() => [
              e.titleIcon ? (p(), w("i", {
                key: 0,
                class: Z(e.titleIcon)
              }, null, 2)) : R("", !0),
              Je(" " + Qe(ot.value), 1)
            ]),
            _: 1
          })) : R("", !0),
          b(l).title ? $(e.$slots, "title", { key: 1 }) : R("", !0)
        ], 2)) : R("", !0),
        (p(), O(ge(Ot.value), {
          class: Z(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: P(() => {
            var Be;
            return [
              qe(me("div", $l, [
                e.groupButton !== !1 ? (p(), O(F, Y({
                  key: 0,
                  ref: "groupButton"
                }, Rt.value, { class: "lkt-item-crud-group-button" }), {
                  split: P(() => [
                    me("div", Fl, [
                      qe(pe(F, Y(De.value, {
                        checked: T.value,
                        "onUpdate:checked": c[0] || (c[0] = (S) => T.value = S)
                      }), null, 16, ["checked"]), [
                        [Xe, Me.value]
                      ])
                    ]),
                    b(l)["prev-buttons-ever"] ? $(e.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: ee.value,
                      canDrop: q.value,
                      perms: e.perms
                    }) : R("", !0),
                    b(l)["prev-buttons"] ? $(e.$slots, "prev-buttons", {
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
                      resourceData: nt.value
                    }, {
                      onLoading: B,
                      onLoaded: L,
                      onClick: W
                    }), {
                      split: P(({ doClose: S, doRootClick: m }) => [
                        $(e.$slots, "button-save-split", {
                          doClose: S,
                          doRootClick: m,
                          dataState: d.value,
                          onButtonLoading: B,
                          onButtonLoaded: L
                        })
                      ]),
                      default: P(() => [
                        b(l)["button-save"] ? $(e.$slots, "button-save", {
                          key: 0,
                          items: u.value,
                          editMode: e.editMode,
                          canUpdate: !x.value
                        }) : R("", !0)
                      ]),
                      _: 3
                    }, 16), [
                      [Xe, ce.value]
                    ]),
                    pt.value && u.value.length >= e.requiredItemsForTopCreate ? (p(), O(Yt, {
                      key: 2,
                      config: z.value,
                      disabled: !zt.value,
                      onClick: h,
                      onAppend: C
                    }, null, 8, ["config", "disabled"])) : R("", !0)
                  ]),
                  _: 3
                }, 16)) : R("", !0),
                b(l)["prev-buttons-ever"] ? $(e.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: ee.value,
                  canDrop: q.value,
                  perms: e.perms
                }) : R("", !0),
                b(l)["prev-buttons"] ? $(e.$slots, "prev-buttons", {
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
                  resourceData: nt.value
                }, {
                  onLoading: B,
                  onLoaded: L,
                  onClick: W
                }), {
                  split: P(({ doClose: S, doRootClick: m }) => [
                    $(e.$slots, "button-save-split", {
                      doClose: S,
                      doRootClick: m,
                      dataState: d.value,
                      onButtonLoading: B,
                      onButtonLoaded: L
                    })
                  ]),
                  default: P(() => [
                    b(l)["button-save"] ? $(e.$slots, "button-save", {
                      key: 0,
                      items: u.value,
                      editMode: e.editMode,
                      canUpdate: !x.value
                    }) : R("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [Xe, ce.value]
                ]),
                pt.value && u.value.length >= e.requiredItemsForTopCreate ? (p(), O(Yt, {
                  key: 3,
                  config: z.value,
                  disabled: !zt.value,
                  onClick: h,
                  onAppend: C
                }, null, 8, ["config", "disabled"])) : R("", !0),
                me("div", Pl, [
                  qe(pe(F, Y(De.value, {
                    checked: T.value,
                    "onUpdate:checked": c[1] || (c[1] = (S) => T.value = S)
                  }), null, 16, ["checked"]), [
                    [Xe, Me.value]
                  ])
                ])
              ], 512), [
                [Xe, at.value]
              ]),
              b(l).buttons ? (p(), w("div", _l, [
                $(e.$slots, "buttons")
              ])) : R("", !0),
              V.value && b(l).filters ? (p(), w("div", Ul, [
                $(e.$slots, "filters", {
                  items: u.value,
                  isLoading: g.value
                })
              ])) : R("", !0),
              qe(me("div", jl, [
                $e.value === b(Pe).Table ? (p(), w("table", zl, [
                  e.hideTableHeader ? R("", !0) : (p(), w("thead", Gl, [
                    me("tr", null, [
                      kt.value && T.value ? (p(), w("th", Hl)) : R("", !0),
                      e.addNavigation && T.value ? (p(), w("th", ql)) : R("", !0),
                      (p(!0), w(H, null, Ce(Ie.value, (S) => (p(), w(H, null, [
                        Ue.value.indexOf(S.key) === -1 ? (p(), O(Ml, {
                          key: 0,
                          column: S,
                          "sort-by": k.value,
                          "sort-direction": D.value,
                          "amount-of-columns": e.columns.length,
                          items: u.value,
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
                    (p(!0), w(H, null, Ce(u.value, (S, m) => qe((p(), O(Ll, {
                      modelValue: u.value[m],
                      "onUpdate:modelValue": (M) => u.value[m] = M,
                      key: Dt(S, m),
                      i: m,
                      "is-draggable": s(S),
                      sortable: kt.value,
                      "visible-columns": Ie.value,
                      "empty-columns": Ue.value,
                      "add-navigation": e.addNavigation,
                      "latest-row": m + 1 === lt.value,
                      "can-drop": q.value && T.value,
                      "can-edit": St.value && ee.value && T.value,
                      "can-read": Ne.value,
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
                    }, za({ _: 2 }, [
                      b(l)[`item-${m}`] && ea(e.row, m) ? {
                        name: `item-${m}`,
                        fn: P((M) => [
                          $(e.$slots, `item-${m}`, fe({
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
                      } : b(l).item && ea(e.row, m) ? {
                        name: "item",
                        fn: P((M) => [
                          $(e.$slots, "item", fe({
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
                      Ce(ht.value, (M) => ({
                        name: M,
                        fn: P((ct) => [
                          $(e.$slots, M, fe({
                            [e.slotItemVar || ""]: ct.item,
                            value: ct.value,
                            column: ct.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class", "item-slot-component", "item-slot-data", "item-slot-events", "permissions"])), [
                      [Xe, mt(u.value[m], m)]
                    ])), 128))
                  ], 10, Xl)
                ])) : $e.value === b(Pe).Item ? (p(), w("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + b(K),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (p(!0), w(H, null, Ce(u.value, (S, m) => (p(), w(H, {
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
                        canRead: Ne.value,
                        canUpdate: ee.value,
                        canDrop: q.value,
                        isLoading: g.value,
                        doDrop: () => ze(m)
                      }))
                    ], 10, Kl)) : mt(S, m) ? $(e.$slots, "item", fe({
                      key: 1,
                      class: It(S, m),
                      dataI: m,
                      [e.slotItemVar || ""]: S,
                      index: m,
                      editing: T.value,
                      canCreate: ve.value,
                      canRead: Ne.value,
                      canUpdate: ee.value,
                      canDrop: q.value,
                      isLoading: g.value,
                      doDrop: () => ze(m)
                    })) : R("", !0)
                  ], 64))), 128))
                ], 10, Yl)) : $e.value === b(Pe).Accordion ? (p(), w("div", {
                  key: 2,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + b(K),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (p(!0), w(H, null, Ce(u.value, (S, m) => (p(), w(H, null, [
                    [b(we).Auto, b(we).PreferCustomItem].includes(e.rowDisplayType) && b(l)[st(S, m)] ? $(e.$slots, st(S, m), {
                      key: 0,
                      item: S,
                      index: m,
                      editing: T.value,
                      isLoading: g.value
                    }) : [b(we).Auto, b(we).PreferCustomItem].includes(e.rowDisplayType) && b(l)[`item-${m}`] ? $(e.$slots, `item-${m}`, {
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
                            modelValue: u.value[m],
                            "onUpdate:modelValue": (M) => u.value[m] = M,
                            i: m,
                            column: Oe.value,
                            columns: Ie.value,
                            "edit-mode-enabled": T.value,
                            "has-inline-edit-perm": it.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])
                        ]),
                        default: P(() => [
                          (p(!0), w(H, null, Ce(Ie.value, (M) => {
                            var ct, la;
                            return p(), w(H, null, [
                              M.key !== ((ct = Oe.value) == null ? void 0 : ct.key) && e.$slots[M.key] && b(Sa)(M, u.value[m]) ? $(e.$slots, M.key, {
                                key: 0,
                                value: u.value[m][M.key],
                                item: u.value[m],
                                column: M,
                                i: m
                              }) : (p(), w(H, { key: 1 }, [
                                M.key !== ((la = Oe.value) == null ? void 0 : la.key) ? (p(), O(Qt, {
                                  key: 0,
                                  modelValue: u.value[m],
                                  "onUpdate:modelValue": (Ma) => u.value[m] = Ma,
                                  i: m,
                                  column: M,
                                  columns: Ie.value,
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
                ], 10, Wl)) : wa.value ? (p(), O(ge($e.value), {
                  key: 3,
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, {
                  default: P(() => [
                    (p(!0), w(H, null, Ce(u.value, (S, m) => (p(), w(H, {
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
                          canRead: Ne.value,
                          canUpdate: ee.value,
                          canDrop: q.value,
                          isLoading: g.value,
                          doDrop: () => ze(m)
                        }))
                      ], 10, Jl)) : R("", !0)
                    ], 64))), 128))
                  ]),
                  _: 3
                }, 8, ["class"])) : $e.value === b(Pe).Carousel ? (p(), w("div", {
                  key: 4,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + b(K),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  pe(b(vl), Y({
                    modelValue: se.value,
                    "onUpdate:modelValue": c[2] || (c[2] = (S) => se.value = S)
                  }, e.carousel, {
                    "wrap-around": ((Be = e.carousel) == null ? void 0 : Be.infinite) === !0
                  }), {
                    addons: P(() => [
                      pe(b(ml)),
                      pe(b(gl))
                    ]),
                    default: P(() => [
                      (p(!0), w(H, null, Ce(tt.value, (S, m) => (p(), O(b(sa), {
                        key: S,
                        index: m
                      }, {
                        default: P(() => [
                          me("div", Zl, [
                            $(e.$slots, S)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (p(!0), w(H, null, Ce(u.value, (S, m) => (p(), O(b(sa), {
                        key: e.slide,
                        index: m
                      }, {
                        default: P(() => [
                          me("div", xl, [
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
                              canRead: Ne.value,
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
                ], 10, Ql)) : $e.value === b(Pe).Calendar ? (p(), w("div", {
                  key: 5,
                  ref_key: "tableBody",
                  ref: v,
                  id: "lkt-table-body-" + b(K),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  pe(X, fe(va({
                    ...e.calendar,
                    events: Na.value
                  })), null, 16)
                ], 10, en)) : R("", !0)
              ], 512), [
                [Xe, $t.value]
              ]),
              !g.value && u.value.length === 0 ? (p(), w("div", tn, [
                b(l).empty ? $(e.$slots, "empty", { key: 0 }) : Ia.value ? (p(), O(ge(Ta.value), {
                  key: 1,
                  message: e.noResultsText
                }, null, 8, ["message"])) : e.noResultsText ? (p(), w(H, { key: 2 }, [
                  Je(Qe(e.noResultsText), 1)
                ], 64)) : R("", !0)
              ])) : R("", !0),
              g.value ? (p(), O(He, { key: 3 })) : R("", !0),
              pt.value || b(l).bottomButtons ? (p(), w("div", an, [
                pt.value && u.value.length >= e.requiredItemsForBottomCreate ? (p(), O(Yt, {
                  key: 0,
                  config: z.value,
                  disabled: !zt.value,
                  onClick: h,
                  onAppend: C
                }, null, 8, ["config", "disabled"])) : R("", !0),
                $(e.$slots, "bottom-buttons")
              ])) : R("", !0),
              e.paginator && Object.keys(e.paginator).length > 0 ? (p(), O(Fe, Y({
                key: 5,
                ref_key: "paginatorRef",
                ref: et
              }, e.paginator, {
                modelValue: f.value,
                "onUpdate:modelValue": c[3] || (c[3] = (S) => f.value = S),
                onLoading: _e,
                onPerms: ae,
                onResponse: Lt
              }), null, 16, ["modelValue"])) : R("", !0),
              b(l)["web-element-actions"] ? $(e.$slots, "web-element-actions", { key: 6 }) : R("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, Ol);
    };
  }
}), vn = {
  install: (t) => {
    t.component("lkt-table") === void 0 && t.component("lkt-table", ln);
  }
}, fn = (t) => (be.navButtonSlot = t, !0), pn = (t) => (be.createButtonSlot = t, !0), mn = (t) => {
  be.defaultEmptySlot = t;
};
export {
  bn as Column,
  hn as createColumn,
  vn as default,
  yl as defaultTableSorter,
  pn as setTableCreateButtonSlot,
  mn as setTableEmptySlot,
  fn as setTableNavButtonSlot
};
