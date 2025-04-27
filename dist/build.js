import { defineComponent as re, computed as s, ref as I, shallowReactive as qt, watch as F, watchEffect as Pt, onMounted as Yt, onBeforeUnmount as Aa, reactive as Ft, provide as ia, h as K, useId as Va, inject as kt, getCurrentInstance as Ra, onUnmounted as Ma, onUpdated as La, cloneVNode as Na, resolveComponent as ye, createBlock as $, createElementBlock as k, unref as B, openBlock as v, normalizeProps as Re, mergeProps as ae, withCtx as P, createTextVNode as ot, toDisplayString as Xe, Fragment as q, withModifiers as ra, createCommentVNode as D, resolveDynamicComponent as Le, useSlots as ua, normalizeClass as Z, createElementVNode as x, createVNode as se, renderSlot as O, renderList as ie, withDirectives as Oe, vShow as Ue, mergeDefaults as $a, nextTick as Tt, createSlots as Zt } from "vue";
import { __ as _a } from "lkt-i18n";
import { SortDirection as Ge, Column as sa, extractPropValue as Oa, ColumnType as ht, FieldType as xt, prepareResourceData as da, TableRowType as nt, extractI18nValue as ca, LktSettings as be, ensureButtonConfig as Ee, TablePermission as Ae, PaginatorType as Et, TableType as qe, getDefaultValues as Ua, Table as Pa, ButtonType as jt } from "lkt-vue-kernel";
import { Column as Cn, createColumn as wn } from "lkt-vue-kernel";
import { replaceAll as va, generateRandomString as Fa } from "lkt-string-tools";
import { DataState as ja } from "lkt-data-state";
import za from "sortablejs";
import { time as Ha } from "lkt-date-tools";
/**
 * Vue 3 Carousel 0.14.0
 * (c) 2025
 * @license MIT
 */
const fa = ["viewport", "carousel"], Vt = {
  "bottom-to-top": "btt",
  "left-to-right": "ltr",
  "right-to-left": "rtl",
  "top-to-bottom": "ttb"
}, pa = [
  "ltr",
  "left-to-right",
  "rtl",
  "right-to-left",
  "ttb",
  "top-to-bottom",
  "btt",
  "bottom-to-top"
], qa = {
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
}, ma = ["slide", "fade"], ga = [
  "center",
  "start",
  "end",
  "center-even",
  "center-odd"
], H = {
  autoplay: 0,
  breakpointMode: fa[0],
  breakpoints: void 0,
  dir: pa[0],
  enabled: !0,
  gap: 0,
  height: "auto",
  i18n: qa,
  ignoreAnimations: !1,
  itemsToScroll: 1,
  itemsToShow: 1,
  modelValue: 0,
  mouseDrag: !0,
  pauseAutoplayOnHover: !1,
  preventExcessiveDragging: !1,
  slideEffect: ma[0],
  snapAlign: ga[0],
  touchDrag: !0,
  transition: 300,
  wrapAround: !1
}, Ye = Symbol("carousel"), Ga = (t) => {
  const o = qt([]), i = (n) => {
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
      o.splice(a, 0, n), i(a), t("slide-registered", { slide: n, index: a });
    },
    unregisterSlide: (n) => {
      const l = o.indexOf(n);
      l !== -1 && (t("slide-unregistered", { slide: n, index: l }), o.splice(l, 1), i(l));
    }
  };
};
function Xa(t) {
  return t.length === 0 ? 0 : t.reduce((i, n) => i + n, 0) / t.length;
}
function ea({ slides: t, position: o, toShow: i }) {
  const n = [], l = o === "before", a = l ? -i : 0, f = l ? 0 : i;
  if (t.length <= 0)
    return n;
  for (let y = a; y < f; y++) {
    const T = {
      index: l ? y : y + t.length,
      isClone: !0,
      position: o,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${o}-${y}`
    }, u = t[(y % t.length + t.length) % t.length].vnode, m = Na(u, T);
    m.el = null, n.push(m);
  }
  return n;
}
const Ya = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function ta(t) {
  if (!t.el || !(t.el instanceof Element))
    return;
  const o = t.el.querySelectorAll(Ya);
  for (const i of o)
    i instanceof HTMLElement && !i.hasAttribute("disabled") && i.getAttribute("aria-hidden") !== "true" && i.setAttribute("tabindex", "-1");
}
function Ka(t, o) {
  return Object.keys(t).filter((i) => !o.includes(i)).reduce((i, n) => (i[n] = t[n], i), {});
}
function Wa(t) {
  const { isVertical: o, isReversed: i, dragged: n, effectiveSlideSize: l } = t, a = o ? n.y : n.x;
  if (a === 0)
    return 0;
  const f = Math.round(a / l);
  return i ? f : -f;
}
function Ve({ val: t, max: o, min: i }) {
  return o < i ? t : Math.min(Math.max(t, isNaN(i) ? t : i), isNaN(o) ? t : o);
}
function Ja(t) {
  const { transform: o } = window.getComputedStyle(t);
  return o.split(/[(,)]/).slice(1, -1).map((i) => parseFloat(i));
}
function Qa(t) {
  let o = 1, i = 1;
  return t.forEach((n) => {
    const l = Ja(n);
    l.length === 6 && (o /= l[0], i /= l[3]);
  }), { widthMultiplier: o, heightMultiplier: i };
}
function Za(t, o) {
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
function xa(t, o, i) {
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
function Gt({ slideSize: t, viewportSize: o, align: i, itemsToShow: n }) {
  return n !== void 0 ? Za(i, n) : t !== void 0 && o !== void 0 ? xa(i, t, o) : 0;
}
function ba(t = "", o = {}) {
  return Object.entries(o).reduce((i, [n, l]) => i.replace(`{${n}}`, String(l)), t);
}
function ya({ val: t, max: o, min: i = 0 }) {
  const n = o - i + 1;
  return ((t - i) % n + n) % n + i;
}
function zt(t, o = 0) {
  let i = !1, n = 0, l = null;
  function a(...f) {
    if (i)
      return;
    i = !0;
    const y = () => {
      l = requestAnimationFrame((b) => {
        b - n > o ? (n = b, t(...f), i = !1) : y();
      });
    };
    y();
  }
  return a.cancel = () => {
    l && (cancelAnimationFrame(l), l = null, i = !1);
  }, a;
}
function At(t, o = "px") {
  if (!(t == null || t === ""))
    return typeof t == "number" || parseFloat(t).toString() === t ? `${t}${o}` : t;
}
const el = re({
  name: "CarouselAria",
  setup() {
    const t = kt(Ye);
    return t ? () => K("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, ba(t.config.i18n.itemXofY, {
      currentSlide: t.currentSlide + 1,
      slidesCount: t.slidesCount
    })) : () => "";
  }
}), tl = {
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
      return fa.includes(t);
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
    validator(t, o) {
      return t && o.wrapAround && console.warn('[vue3-carousel warn]: "preventExcessiveDragging" cannot be used with wrapAround. The setting will be ignored.'), !0;
    }
  },
  // control snap position alignment
  snapAlign: {
    default: H.snapAlign,
    validator(t) {
      return ga.includes(t);
    }
  },
  slideEffect: {
    type: String,
    default: H.slideEffect,
    validator(t) {
      return ma.includes(t);
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
    validator(t, o) {
      if (!pa.includes(t))
        return !1;
      const i = t in Vt ? Vt[t] : t;
      return ["ttb", "btt"].includes(i) && (!o.height || o.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${t}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: H.wrapAround,
    type: Boolean
  }
}, al = re({
  name: "VueCarousel",
  props: tl,
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
    const a = Ga(i), f = a.getSlides(), y = s(() => f.length), b = I(null), T = I(null), u = I(0), m = s(() => Object.assign(Object.assign(Object.assign({}, H), Ka(t, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, H.i18n), t.i18n) })), c = qt(Object.assign({}, m.value)), S = I((l = t.modelValue) !== null && l !== void 0 ? l : 0), V = I(S.value);
    F(S, (d) => V.value = d);
    const E = I(0), le = s(() => Math.ceil((y.value - 1) / 2)), j = s(() => y.value - 1), de = s(() => 0);
    let ce = null, Ne = null, ue = null;
    const Y = s(() => u.value + c.gap), r = s(() => {
      const d = c.dir || "ltr";
      return d in Vt ? Vt[d] : d;
    }), _ = s(() => ["rtl", "btt"].includes(r.value)), ee = s(() => ["ttb", "btt"].includes(r.value)), U = s(() => c.itemsToShow === "auto"), M = s(() => ee.value ? "height" : "width");
    function he() {
      var d;
      if (!Je.value)
        return;
      const h = (m.value.breakpointMode === "carousel" ? (d = b.value) === null || d === void 0 ? void 0 : d.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, C = Object.keys(t.breakpoints || {}).map((L) => Number(L)).sort((L, X) => +X - +L), A = {};
      C.some((L) => h >= L ? (Object.assign(A, t.breakpoints[L]), A.i18n && Object.assign(A.i18n, m.value.i18n, t.breakpoints[L].i18n), !0) : !1), Object.assign(c, m.value, A);
    }
    const rt = zt(() => {
      he(), Ke(), ke();
    }), Pe = qt(/* @__PURE__ */ new Set()), ne = I([]);
    function $e({ widthMultiplier: d, heightMultiplier: h }) {
      ne.value = f.map((C) => {
        var A;
        const L = (A = C.exposed) === null || A === void 0 ? void 0 : A.getBoundingRect();
        return {
          width: L.width * d,
          height: L.height * h
        };
      });
    }
    const Fe = I({
      width: 0,
      height: 0
    });
    function Mt({ widthMultiplier: d, heightMultiplier: h }) {
      var C;
      const A = ((C = T.value) === null || C === void 0 ? void 0 : C.getBoundingClientRect()) || { width: 0, height: 0 };
      Fe.value = {
        width: A.width * d,
        height: A.height * h
      };
    }
    function ke() {
      if (!T.value)
        return;
      const d = Qa(Pe);
      if (Mt(d), $e(d), U.value)
        u.value = Xa(ne.value.map((h) => h[M.value]));
      else {
        const h = Number(c.itemsToShow), C = (h - 1) * c.gap;
        u.value = (Fe.value[M.value] - C) / h;
      }
    }
    function Ke() {
      !c.wrapAround && y.value > 0 && (S.value = Ve({
        val: S.value,
        max: j.value,
        min: de.value
      })), U.value || (c.itemsToShow = Ve({
        val: Number(c.itemsToShow),
        max: y.value,
        min: 1
      }));
    }
    const ve = s(() => typeof t.ignoreAnimations == "string" ? t.ignoreAnimations.split(",") : Array.isArray(t.ignoreAnimations) ? t.ignoreAnimations : t.ignoreAnimations ? !1 : []);
    Pt(() => Ke()), Pt(() => {
      ke();
    });
    let Se;
    const Ce = (d) => {
      const h = d.target;
      if (!(!(h != null && h.contains(b.value)) || Array.isArray(ve.value) && ve.value.includes(d.animationName)) && (Pe.add(h), !Se)) {
        const C = () => {
          Se = requestAnimationFrame(() => {
            ke(), C();
          });
        };
        C();
      }
    }, We = (d) => {
      const h = d.target;
      h && Pe.delete(h), Se && Pe.size === 0 && (cancelAnimationFrame(Se), ke());
    }, Je = I(!1);
    typeof document < "u" && Pt(() => {
      Je.value && ve.value !== !1 ? (document.addEventListener("animationstart", Ce), document.addEventListener("animationend", We)) : (document.removeEventListener("animationstart", Ce), document.removeEventListener("animationend", We));
    }), Yt(() => {
      Je.value = !0, he(), Ze(), b.value && (ue = new ResizeObserver(rt), ue.observe(b.value)), i("init");
    }), Aa(() => {
      Je.value = !1, a.cleanup(), Ne && clearTimeout(Ne), Se && cancelAnimationFrame(Se), ce && clearInterval(ce), ue && (ue.disconnect(), ue = null), typeof document < "u" && dt(), b.value && (b.value.removeEventListener("transitionend", ke), b.value.removeEventListener("animationiteration", ke));
    });
    let De = !1;
    const je = { x: 0, y: 0 }, fe = Ft({ x: 0, y: 0 }), ze = I(!1), ut = I(!1), st = () => {
      ze.value = !0;
    }, Lt = () => {
      ze.value = !1;
    }, _e = zt((d) => {
      if (!d.ctrlKey)
        switch (d.key) {
          case "ArrowLeft":
          case "ArrowUp":
            ee.value === d.key.endsWith("Up") && (_.value ? we(!0) : xe(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            ee.value === d.key.endsWith("Down") && (_.value ? xe(!0) : we(!0));
            break;
        }
    }, 200), Nt = () => {
      document.addEventListener("keydown", _e);
    }, dt = () => {
      document.removeEventListener("keydown", _e);
    };
    function St(d) {
      const h = d.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(h) || z.value || (De = d.type === "touchstart", !De && (d.preventDefault(), d.button !== 0)))
        return;
      je.x = "touches" in d ? d.touches[0].clientX : d.clientX, je.y = "touches" in d ? d.touches[0].clientY : d.clientY;
      const C = De ? "touchmove" : "mousemove", A = De ? "touchend" : "mouseup";
      document.addEventListener(C, ct, { passive: !1 }), document.addEventListener(A, Qe, { passive: !0 });
    }
    const ct = zt((d) => {
      ut.value = !0;
      const h = "touches" in d ? d.touches[0].clientX : d.clientX, C = "touches" in d ? d.touches[0].clientY : d.clientY;
      fe.x = h - je.x, fe.y = C - je.y;
      const A = Wa({
        isVertical: ee.value,
        isReversed: _.value,
        dragged: fe,
        effectiveSlideSize: Y.value
      });
      V.value = c.wrapAround ? S.value + A : Ve({
        val: S.value + A,
        max: j.value,
        min: de.value
      }), i("drag", { deltaX: fe.x, deltaY: fe.y });
    });
    function Qe() {
      if (ct.cancel(), V.value !== S.value && !De) {
        const C = (A) => {
          A.preventDefault(), window.removeEventListener("click", C);
        };
        window.addEventListener("click", C);
      }
      Te(V.value), fe.x = 0, fe.y = 0, ut.value = !1;
      const d = De ? "touchmove" : "mousemove", h = De ? "touchend" : "mouseup";
      document.removeEventListener(d, ct), document.removeEventListener(h, Qe);
    }
    function Ze() {
      !c.autoplay || c.autoplay <= 0 || (ce = setInterval(() => {
        c.pauseAutoplayOnHover && ze.value || we();
      }, c.autoplay));
    }
    function pe() {
      ce && (clearInterval(ce), ce = null);
    }
    function Ie() {
      pe(), Ze();
    }
    const z = I(!1);
    function Te(d, h = !1) {
      if (!h && z.value)
        return;
      let C = d, A = d;
      E.value = S.value, c.wrapAround ? A = ya({
        val: C,
        max: j.value,
        min: de.value
      }) : C = Ve({
        val: C,
        max: j.value,
        min: de.value
      }), i("slide-start", {
        slidingToIndex: d,
        currentSlideIndex: S.value,
        prevSlideIndex: E.value,
        slidesCount: y.value
      }), pe(), z.value = !0, S.value = C, A !== C && vt.pause(), i("update:modelValue", A), Ne = setTimeout(() => {
        c.wrapAround && A !== C && (vt.resume(), S.value = A, i("loop", {
          currentSlideIndex: S.value,
          slidingToIndex: d
        })), i("slide-end", {
          currentSlideIndex: S.value,
          prevSlideIndex: E.value,
          slidesCount: y.value
        }), z.value = !1, Ie();
      }, c.transition);
    }
    function we(d = !1) {
      Te(S.value + c.itemsToScroll, d);
    }
    function xe(d = !1) {
      Te(S.value - c.itemsToScroll, d);
    }
    function Ct() {
      he(), Ke(), ke(), Ie();
    }
    F(() => [m.value, t.breakpoints], () => he(), { deep: !0 }), F(() => t.autoplay, () => Ie());
    const vt = F(() => t.modelValue, (d) => {
      d !== S.value && Te(Number(d), !0);
    });
    i("before-init");
    const G = s(() => {
      if (!c.wrapAround)
        return { before: 0, after: 0 };
      if (U.value)
        return { before: f.length, after: f.length };
      const d = Number(c.itemsToShow), h = Math.ceil(d + (c.itemsToScroll - 1)), C = h - V.value, A = h - (y.value - (V.value + 1));
      return {
        before: Math.max(0, C),
        after: Math.max(0, A)
      };
    }), ft = s(() => G.value.before ? U.value ? ne.value.slice(-1 * G.value.before).reduce((d, h) => d + h[M.value] + c.gap, 0) * -1 : G.value.before * Y.value * -1 : 0), He = s(() => {
      var d;
      if (U.value) {
        const h = (S.value % f.length + f.length) % f.length;
        return Gt({
          slideSize: (d = ne.value[h]) === null || d === void 0 ? void 0 : d[M.value],
          viewportSize: Fe.value[M.value],
          align: c.snapAlign
        });
      }
      return Gt({
        align: c.snapAlign,
        itemsToShow: +c.itemsToShow
      });
    }), et = s(() => {
      let d = 0;
      if (U.value) {
        if (S.value < 0 ? d = ne.value.slice(S.value).reduce((h, C) => h + C[M.value] + c.gap, 0) * -1 : d = ne.value.slice(0, S.value).reduce((h, C) => h + C[M.value] + c.gap, 0), d -= He.value, !c.wrapAround) {
          const h = ne.value.reduce((C, A) => C + A[M.value] + c.gap, 0) - Fe.value[M.value] - c.gap;
          d = Ve({
            val: d,
            max: h,
            min: 0
          });
        }
      } else {
        let h = S.value - He.value;
        c.wrapAround || (h = Ve({
          val: h,
          max: y.value - +c.itemsToShow,
          min: 0
        })), d = h * Y.value;
      }
      return d * (_.value ? 1 : -1);
    }), tt = s(() => {
      var d, h;
      if (!U.value) {
        const L = S.value - He.value;
        return c.wrapAround ? {
          min: Math.floor(L),
          max: Math.ceil(L + Number(c.itemsToShow) - 1)
        } : {
          min: Math.floor(Ve({
            val: L,
            max: y.value - Number(c.itemsToShow),
            min: 0
          })),
          max: Math.ceil(Ve({
            val: L + Number(c.itemsToShow) - 1,
            max: y.value - 1,
            min: 0
          }))
        };
      }
      let C = 0;
      {
        let L = 0, X = 0 - G.value.before;
        const te = Math.abs(et.value + ft.value);
        for (; L <= te; ) {
          const J = (X % f.length + f.length) % f.length;
          L += ((d = ne.value[J]) === null || d === void 0 ? void 0 : d[M.value]) + c.gap, X++;
        }
        C = X - 1;
      }
      let A = 0;
      {
        let L = C, X = 0;
        for (L < 0 ? X = ne.value.slice(0, L).reduce((te, J) => te + J[M.value] + c.gap, 0) - Math.abs(et.value + ft.value) : X = ne.value.slice(0, L).reduce((te, J) => te + J[M.value] + c.gap, 0) - Math.abs(et.value); X < Fe.value[M.value]; ) {
          const te = (L % f.length + f.length) % f.length;
          X += ((h = ne.value[te]) === null || h === void 0 ? void 0 : h[M.value]) + c.gap, L++;
        }
        A = L - 1;
      }
      return {
        min: Math.floor(C),
        max: Math.ceil(A)
      };
    }), $t = s(() => {
      if (c.slideEffect === "fade")
        return;
      const d = ee.value ? "Y" : "X", h = ee.value ? fe.y : fe.x;
      let C = et.value + h;
      if (!c.wrapAround && c.preventExcessiveDragging) {
        let A = 0;
        U.value ? A = ne.value.reduce((te, J) => te + J[M.value], 0) : A = (y.value - Number(c.itemsToShow)) * Y.value;
        const L = _.value ? 0 : -1 * A, X = _.value ? A : 0;
        C = Ve({
          val: C,
          min: L,
          max: X
        });
      }
      return `translate${d}(${C}px)`;
    }), me = s(() => ({
      "--vc-transition-duration": z.value ? At(c.transition, "ms") : void 0,
      "--vc-slide-gap": At(c.gap),
      "--vc-carousel-height": At(c.height),
      "--vc-cloned-offset": At(ft.value)
    })), wt = { slideTo: Te, next: we, prev: xe }, _t = Ft({
      activeSlide: V,
      config: c,
      currentSlide: S,
      isSliding: z,
      isVertical: ee,
      maxSlide: j,
      minSlide: de,
      nav: wt,
      normalizedDir: r,
      slideRegistry: a,
      slideSize: u,
      slides: f,
      slidesCount: y,
      viewport: T,
      visibleRange: tt
    });
    ia(Ye, _t);
    const at = Ft({
      config: c,
      currentSlide: S,
      maxSlide: j,
      middleSlide: le,
      minSlide: de,
      slideSize: u,
      slidesCount: y
    });
    return n({
      data: at,
      nav: wt,
      next: we,
      prev: xe,
      restartCarousel: Ct,
      slideTo: Te,
      updateBreakpointsConfig: he,
      updateSlideSize: ke,
      updateSlidesData: Ke
    }), () => {
      var d;
      const h = o.default || o.slides, C = (h == null ? void 0 : h(at)) || [], { before: A, after: L } = G.value, X = ea({
        slides: f,
        position: "before",
        toShow: A
      }), te = ea({
        slides: f,
        position: "after",
        toShow: L
      }), J = [...X, ...C, ...te];
      if (!c.enabled || !J.length)
        return K("section", {
          ref: b,
          class: ["carousel", "is-disabled"]
        }, J);
      const lt = ((d = o.addons) === null || d === void 0 ? void 0 : d.call(o, at)) || [], Bt = K("ol", {
        class: "carousel__track",
        style: { transform: $t.value },
        onMousedownCapture: c.mouseDrag ? St : null,
        onTouchstartPassiveCapture: c.touchDrag ? St : null
      }, J), Dt = K("div", { class: "carousel__viewport", ref: T }, Bt);
      return K("section", {
        ref: b,
        class: [
          "carousel",
          `is-${r.value}`,
          `is-effect-${c.slideEffect}`,
          {
            "is-vertical": ee.value,
            "is-sliding": z.value,
            "is-dragging": ut.value,
            "is-hover": ze.value
          }
        ],
        dir: r.value,
        style: me.value,
        "aria-label": c.i18n.ariaGallery,
        tabindex: "0",
        onFocus: Nt,
        onBlur: dt,
        onMouseenter: st,
        onMouseleave: Lt
      }, [Dt, lt, K(el)]);
    };
  }
});
var Xt;
(function(t) {
  t.arrowDown = "arrowDown", t.arrowLeft = "arrowLeft", t.arrowRight = "arrowRight", t.arrowUp = "arrowUp";
})(Xt || (Xt = {}));
const aa = (t) => `icon${t.charAt(0).toUpperCase() + t.slice(1)}`, ll = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function nl(t) {
  return t in Xt;
}
const la = (t) => t && nl(t), na = re({
  props: {
    name: {
      type: String,
      required: !0,
      validator: la
    },
    title: {
      type: String,
      default: (t) => t.name ? H.i18n[aa(t.name)] : ""
    }
  },
  setup(t) {
    const o = kt(Ye, null);
    return () => {
      const i = t.name;
      if (!i || !la(i))
        return;
      const n = ll[i], l = K("path", { d: n }), a = (o == null ? void 0 : o.config.i18n[aa(i)]) || t.title, f = K("title", a);
      return K("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": a
      }, [f, l]);
    };
  }
}), ol = re({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(t, { slots: o, attrs: i }) {
    const n = kt(Ye);
    if (!n)
      return () => "";
    const { next: l, prev: a } = o, f = () => ({
      btt: "arrowDown",
      ltr: "arrowLeft",
      rtl: "arrowRight",
      ttb: "arrowUp"
    })[n.normalizedDir], y = () => ({
      btt: "arrowUp",
      ltr: "arrowRight",
      rtl: "arrowLeft",
      ttb: "arrowDown"
    })[n.normalizedDir], b = s(() => !n.config.wrapAround && n.currentSlide <= n.minSlide), T = s(() => !n.config.wrapAround && n.currentSlide >= n.maxSlide);
    return () => {
      const { i18n: u } = n.config, m = K("button", Object.assign(Object.assign({ type: "button", disabled: b.value, "aria-label": u.ariaPreviousSlide, title: u.ariaPreviousSlide, onClick: n.nav.prev }, i), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": b.value },
        i.class
      ] }), (a == null ? void 0 : a()) || K(na, { name: f() })), c = K("button", Object.assign(Object.assign({ type: "button", disabled: T.value, "aria-label": u.ariaNextSlide, title: u.ariaNextSlide, onClick: n.nav.next }, i), { class: [
        "carousel__next",
        { "carousel__next--disabled": T.value },
        i.class
      ] }), (l == null ? void 0 : l()) || K(na, { name: y() }));
      return [m, c];
    };
  }
}), il = re({
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
    const o = kt(Ye);
    if (!o)
      return () => "";
    const i = s(() => o.config.itemsToShow), n = s(() => Gt({
      align: o.config.snapAlign,
      itemsToShow: i.value
    })), l = s(() => t.paginateByItemsToShow && i.value > 1), a = s(() => Math.ceil((o.activeSlide - n.value) / i.value)), f = s(() => Math.ceil(o.slidesCount / i.value)), y = (b) => ya(l.value ? {
      val: a.value,
      max: f.value - 1,
      min: 0
    } : {
      val: o.activeSlide,
      max: o.maxSlide,
      min: o.minSlide
    }) === b;
    return () => {
      var b, T;
      const u = [];
      for (let m = l.value ? 0 : o.minSlide; m <= (l.value ? f.value - 1 : o.maxSlide); m++) {
        const c = ba(o.config.i18n[l.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: m + 1
        }), S = y(m), V = K("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": S
          },
          "aria-label": c,
          "aria-pressed": S,
          "aria-controls": (T = (b = o.slides[m]) === null || b === void 0 ? void 0 : b.exposed) === null || T === void 0 ? void 0 : T.id,
          title: c,
          disabled: t.disableOnClick,
          onClick: () => o.nav.slideTo(l.value ? Math.floor(m * +o.config.itemsToShow + n.value) : m)
        }), E = K("li", { class: "carousel__pagination-item", key: m }, V);
        u.push(E);
      }
      return K("ol", { class: "carousel__pagination" }, u);
    };
  }
}), oa = re({
  name: "CarouselSlide",
  props: {
    id: {
      type: String,
      default: (t) => t.isClone ? void 0 : Va()
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
    const l = kt(Ye);
    if (ia(Ye, void 0), !l)
      return () => "";
    const a = I(t.index), f = (V) => {
      a.value = V;
    }, y = Ra(), b = () => {
      const V = y.vnode.el;
      return V ? V.getBoundingClientRect() : { width: 0, height: 0 };
    };
    n({
      id: t.id,
      setIndex: f,
      getBoundingRect: b
    });
    const T = s(() => a.value === l.activeSlide), u = s(() => a.value === l.activeSlide - 1), m = s(() => a.value === l.activeSlide + 1), c = s(() => a.value >= l.visibleRange.min && a.value <= l.visibleRange.max), S = s(() => {
      if (l.config.itemsToShow === "auto")
        return;
      const V = l.config.itemsToShow, E = l.config.gap > 0 && V > 1 ? `calc(${100 / V}% - ${l.config.gap * (V - 1) / V}px)` : `${100 / V}%`;
      return l.isVertical ? { height: E } : { width: E };
    });
    return l.slideRegistry.registerSlide(y, t.index), Ma(() => {
      l.slideRegistry.unregisterSlide(y);
    }), t.isClone && (Yt(() => {
      ta(y.vnode);
    }), La(() => {
      ta(y.vnode);
    })), () => {
      var V, E;
      return l.config.enabled ? K("li", {
        style: [o.style, Object.assign({}, S.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": t.isClone,
          "carousel__slide--visible": c.value,
          "carousel__slide--active": T.value,
          "carousel__slide--prev": u.value,
          "carousel__slide--next": m.value,
          "carousel__slide--sliding": l.isSliding
        },
        onFocusin: () => {
          l.viewport && (l.viewport.scrollLeft = 0), l.nav.slideTo(a.value);
        },
        id: t.isClone ? void 0 : t.id,
        "aria-hidden": t.isClone || void 0
      }, (E = i.default) === null || E === void 0 ? void 0 : E.call(i, {
        currentIndex: a.value,
        isActive: T.value,
        isClone: t.isClone,
        isPrev: u.value,
        isNext: m.value,
        isSliding: l.isSliding,
        isVisible: c.value
      })) : (V = i.default) === null || V === void 0 ? void 0 : V.call(i);
    };
  }
}), rl = (t, o, i, n) => {
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
}, it = (t, o, i, n = []) => {
  if (t.extractTitleFromColumn) {
    let l = n.find((a) => a.key === t.extractTitleFromColumn);
    if (l)
      return it(l, o, i, n);
  }
  if (t.formatter && typeof t.formatter == "function") {
    let l = t.formatter(o[t.key], o, t, i);
    return l.startsWith("__:") ? _a(l.substring(3)) : l;
  }
  return o[t.key];
}, ul = (t, o, i) => {
  if (!t.colspan) return -1;
  let n = o;
  return i.forEach((l) => {
    let a = Kt(t, l);
    a > 0 && a < n && (n = a);
  }), n;
}, Kt = (t, o) => t.colspan === !1 ? !1 : typeof t.colspan == "function" ? t.colspan(o) : t.colspan, sl = (t, o) => typeof t.preferSlot > "u" ? !0 : t.preferSlot === !1 ? !1 : typeof t.preferSlot == "function" ? t.preferSlot(o) : !0, dl = (t, o, i) => {
  if (typeof t != "object" || !t.key || o.indexOf(t.key) > -1) return !1;
  let n = Kt(t, i);
  return typeof t.colspan > "u" ? !0 : (typeof t.colspan < "u" && (typeof t.colspan == "function" ? n = parseInt(t.colspan(i)) : n = parseInt(t.colspan)), n > 0);
}, cl = (t = []) => {
  if (t.length > 0) {
    for (let o = 0; o < t.length; ++o)
      if (t[o].sortable) return t[o].key;
  }
  return "";
}, vl = (t, o) => {
  if (t.length > 0) {
    for (let i = 0; i < t.length; ++i)
      if (t[i].key === o) return t[i];
  }
  return null;
}, ha = (t) => t.type ? `is-${t.type}` : "", Rt = /* @__PURE__ */ re({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new sa() },
    columns: { default: () => [] },
    i: { default: 0 },
    editModeEnabled: { type: Boolean, default: !1 },
    hasInlineEditPerm: { type: Boolean, default: !1 }
  },
  emits: [
    "update:modelValue"
  ],
  setup(t, { emit: o }) {
    const i = o, n = t, l = I(n.modelValue), a = I(l.value[n.column.key]), f = I(null);
    F(a, (m) => {
      const c = JSON.parse(JSON.stringify(l.value));
      c[n.column.key] = m, i("update:modelValue", c);
    }), F(() => n.modelValue, (m) => {
      l.value = m, a.value = l.value[n.column.key];
    });
    const y = s(() => ({ ...n.column.slotData, item: l.value })), b = s(() => {
      var m, c, S, V;
      if ((m = n.column.field) != null && m.modalData && typeof ((c = n.column.field) == null ? void 0 : c.modalData) == "object")
        for (let E in n.column.field.modalData)
          if (typeof ((S = n.column.field) == null ? void 0 : S.modalData[E]) == "string" && n.column.field.modalData[E].startsWith("prop:")) {
            let le = n.column.field.modalData[E].substring(5);
            l.value[le];
          } else
            n.column.field.modalData[E];
      return (V = n.column.field) == null ? void 0 : V.modalData;
    }), T = s(() => typeof n.column.field == "string" && n.column.field.startsWith("prop:") ? Oa(n.column.field, l.value) : n.column.field), u = s(() => {
      var m, c, S, V;
      return n.column.type === ht.Field ? !((c = (m = n.column) == null ? void 0 : m.field) != null && c.label) && [
        xt.Switch,
        xt.Check
      ].includes((S = n.column.field) == null ? void 0 : S.type) ? n.column.label : (V = n.column.field) == null ? void 0 : V.label : "";
    });
    return (m, c) => {
      const S = ye("lkt-anchor"), V = ye("lkt-button"), E = ye("lkt-field");
      return m.column.type === B(ht).Anchor ? (v(), $(S, Re(ae({ key: 0 }, m.column.anchor)), {
        default: P(() => [
          ot(Xe(B(it)(m.column, l.value, m.i)), 1)
        ]),
        _: 1
      }, 16)) : m.column.type === B(ht).Button ? (v(), $(V, ae({ key: 1 }, m.column.button, { prop: l.value }), {
        default: P(() => [
          ot(Xe(B(it)(m.column, l.value, m.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : m.column.type === B(ht).Field && m.hasInlineEditPerm ? (v(), $(E, ae({ key: 2 }, T.value, {
        "read-mode": !m.column.editable || !m.editModeEnabled,
        ref: (le) => f.value = le,
        "slot-data": y.value,
        label: u.value,
        "modal-data": b.value,
        prop: l.value,
        modelValue: a.value,
        "onUpdate:modelValue": c[0] || (c[0] = (le) => a.value = le)
      }), null, 16, ["read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : m.column.type === B(ht).Field ? (v(), $(E, ae({ key: 3 }, T.value, {
        "read-mode": "",
        ref: (le) => f.value = le,
        "slot-data": y.value,
        label: u.value,
        "modal-data": b.value,
        prop: l.value,
        "model-value": a.value
      }), null, 16, ["slot-data", "label", "modal-data", "prop", "model-value"])) : (v(), k(q, { key: 4 }, [
        ot(Xe(B(it)(m.column, l.value, m.i, m.columns)), 1)
      ], 64));
    };
  }
}), Me = class Me {
};
Me.navButtonSlot = "", Me.dropButtonSlot = "", Me.editButtonSlot = "", Me.createButtonSlot = "", Me.defaultEmptySlot = void 0, Me.defaultSaveIcon = "", Me.defaultNoResultsMessage = "No results";
let W = Me;
const fl = /* @__PURE__ */ re({
  __name: "DropButtonComponent",
  props: {
    config: {},
    item: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: [
    "click"
  ],
  setup(t, { emit: o }) {
    const i = o, n = t, l = s(() => W.dropButtonSlot !== ""), a = s(() => W.dropButtonSlot), f = s(() => da(n.config.resourceData, n.item));
    return (y, b) => {
      const T = ye("lkt-button");
      return v(), $(T, ae({ palette: "table-delete" }, n.config, {
        disabled: y.disabled,
        "resource-data": f.value,
        onClick: b[0] || (b[0] = ra((u) => i("click", u), ["prevent", "stop"]))
      }), {
        default: P(() => [
          l.value ? (v(), $(Le(a.value), { key: 0 })) : D("", !0)
        ]),
        _: 1
      }, 16, ["disabled", "resource-data"]);
    };
  }
}), pl = /* @__PURE__ */ re({
  __name: "EditButtonComponent",
  props: {
    config: {},
    item: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: [
    "click"
  ],
  setup(t, { emit: o }) {
    const i = o, n = t, l = s(() => W.editButtonSlot !== ""), a = s(() => W.editButtonSlot), f = s(() => da(n.config.resourceData, n.item));
    return (y, b) => {
      const T = ye("lkt-button");
      return v(), $(T, ae({ palette: "table-edit" }, n.config, {
        disabled: y.disabled,
        "resource-data": f.value,
        onClick: b[0] || (b[0] = ra((u) => i("click"), ["prevent", "stop"]))
      }), {
        default: P(() => [
          l.value ? (v(), $(Le(a.value), { key: 0 })) : D("", !0)
        ]),
        _: 1
      }, 16, ["disabled", "resource-data"]);
    };
  }
}), ml = ["data-i", "data-draggable"], gl = ["data-role", "data-i"], bl = {
  key: 1,
  class: "lkt-table-nav-cell"
}, yl = { class: "lkt-table-nav-container" }, hl = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, kl = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, Sl = ["colspan"], Cl = ["colspan"], wl = ["data-column", "colspan", "title"], Bl = {
  key: 6,
  class: "lkt-table-col-drop"
}, Dl = {
  key: 7,
  class: "lkt-table-col-edit"
}, Il = /* @__PURE__ */ re({
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
    rowDisplayType: { type: [Number, Function], default: nt.Auto },
    renderDrag: { type: [Boolean, Function], default: !0 },
    disabledDrag: { type: [Boolean, Function], default: !0 },
    itemContainerClass: { type: [String, Function], default: "" }
  },
  emits: [
    "update:modelValue",
    "click",
    "show",
    "item-up",
    "item-down",
    "item-drop"
  ],
  setup(t, { emit: o }) {
    var Y;
    const i = ua(), n = o, l = t, a = I(l.modelValue);
    let f = typeof l.rowDisplayType == "function" ? l.rowDisplayType(a.value, l.i) : l.rowDisplayType;
    f || (f = nt.Auto);
    const y = [nt.Auto, nt.PreferCustomItem].includes(f), b = [nt.Auto, nt.PreferItem].includes(f), T = I((Y = l.editButton.anchor) == null ? void 0 : Y.to);
    for (let r in a.value) T.value = va(T.value, ":" + r, a.value[r]);
    const u = (r) => n("click", r), m = (r, _) => {
      n("show", r, _);
    }, c = s(() => {
      let r = [], _ = !1;
      return typeof l.disabledDrag == "function" ? _ = l.disabledDrag(a.value) : _ = ce.value === !0, !_ && l.sortable && l.isDraggable ? r.push("handle") : _ && r.push("disabled"), r.join(" ");
    }), S = s(() => W.navButtonSlot !== ""), V = s(() => W.navButtonSlot), E = () => {
      n("item-up", l.i);
    }, le = () => {
      n("item-down", l.i);
    }, j = () => {
      n("item-drop", l.i);
    };
    F(() => l.modelValue, (r) => a.value = r), F(a, (r) => {
      n("update:modelValue", r);
    }, { deep: !0 });
    const de = s(() => typeof l.renderDrag == "function" ? l.renderDrag(a.value) : l.renderDrag === !0), ce = s(() => typeof l.disabledDrag == "function" ? l.disabledDrag(a.value) : l.disabledDrag === !0), Ne = s(() => c.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), ue = s(() => {
      let r = [];
      return y && r.push("type-custom-item"), b && r.push("type-item"), typeof l.itemContainerClass == "function" ? r.push(l.itemContainerClass(a.value, l.i)) : l.itemContainerClass !== "" && r.push(l.itemContainerClass), r.join(" ");
    });
    return (r, _) => {
      const ee = ye("lkt-button");
      return v(), k("tr", {
        "data-i": r.i,
        "data-draggable": r.isDraggable,
        class: Z(ue.value)
      }, [
        r.sortable && r.editModeEnabled && de.value ? (v(), k("td", {
          key: 0,
          "data-role": Ne.value,
          class: Z(c.value),
          "data-i": r.i
        }, _[3] || (_[3] = [
          x("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]), 10, gl)) : D("", !0),
        r.addNavigation && r.editModeEnabled ? (v(), k("td", bl, [
          x("div", yl, [
            se(ee, {
              palette: "table-nav",
              disabled: r.i === 0,
              onClick: E
            }, {
              default: P(() => [
                S.value ? (v(), $(Le(V.value), {
                  key: 0,
                  direction: "up"
                })) : (v(), k("i", hl))
              ]),
              _: 1
            }, 8, ["disabled"]),
            se(ee, {
              palette: "table-nav",
              disabled: r.latestRow,
              onClick: le
            }, {
              default: P(() => [
                S.value ? (v(), $(Le(V.value), {
                  key: 0,
                  direction: "down"
                })) : (v(), k("i", kl))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : D("", !0),
        r.displayHiddenColumnsIndicator ? (v(), k("td", {
          key: 2,
          onClick: _[0] || (_[0] = (U) => m(U, r.i)),
          "data-role": "show-more",
          class: Z(r.hiddenIsVisible ? "state-open" : "")
        }, null, 2)) : D("", !0),
        B(y) && B(i)[`item-${r.i}`] ? (v(), k("td", {
          key: "td" + r.i,
          colspan: r.visibleColumns.length
        }, [
          O(r.$slots, `item-${r.i}`, {
            item: a.value,
            index: r.i,
            editing: r.editModeEnabled,
            canCreate: r.canCreate,
            canRead: r.canRead,
            canUpdate: r.canEdit,
            canDrop: r.canDrop,
            isLoading: r.isLoading,
            doDrop: () => j()
          })
        ], 8, Sl)) : B(b) && B(i).item ? (v(), k("td", {
          key: "td" + r.i,
          colspan: r.visibleColumns.length
        }, [
          O(r.$slots, "item", {
            item: a.value,
            index: r.i,
            editing: r.editModeEnabled,
            canCreate: r.canCreate,
            canRead: r.canRead,
            canUpdate: r.canEdit,
            canDrop: r.canDrop,
            isLoading: r.isLoading,
            doDrop: () => j()
          })
        ], 8, Cl)) : (v(!0), k(q, { key: 5 }, ie(r.visibleColumns, (U) => (v(), k(q, null, [
          B(dl)(U, r.emptyColumns, a.value) ? (v(), k("td", {
            key: "td" + r.i,
            "data-column": U.key,
            colspan: B(Kt)(U, a.value),
            title: B(it)(U, a.value, r.i, r.visibleColumns),
            class: Z(B(ha)(U)),
            onClick: _[2] || (_[2] = (M) => u(M))
          }, [
            r.$slots[U.key] && B(sl)(U, a.value) ? O(r.$slots, U.key, {
              key: 0,
              value: a.value[U.key],
              item: a.value,
              column: U,
              i: r.i
            }) : a.value ? (v(), $(Rt, {
              key: 1,
              modelValue: a.value,
              "onUpdate:modelValue": _[1] || (_[1] = (M) => a.value = M),
              column: U,
              columns: r.visibleColumns,
              "edit-mode-enabled": r.editModeEnabled,
              "has-inline-edit-perm": r.hasInlineEditPerm,
              i: r.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : D("", !0)
          ], 10, wl)) : D("", !0)
        ], 64))), 256)),
        r.canDrop && r.editModeEnabled ? (v(), k("td", Bl, [
          se(fl, {
            config: r.dropButton,
            item: a.value,
            onClick: j
          }, null, 8, ["config", "item"])
        ])) : D("", !0),
        r.canEdit && r.editModeEnabled ? (v(), k("td", Dl, [
          se(pl, {
            config: r.editButton,
            item: a.value
          }, null, 8, ["config", "item"])
        ])) : D("", !0)
      ], 10, ml);
    };
  }
}), Tl = { "data-role": "hidden-row" }, El = ["colspan"], Al = ["data-column"], Vl = ["data-i"], Rl = ["data-column", "title"], Ml = /* @__PURE__ */ re({
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
  setup(t, { emit: o }) {
    const i = o, n = t, l = I(n.modelValue), a = (f) => i("click", f);
    return F(() => n.modelValue, (f) => l.value = f), F(l, () => i("update:modelValue", l.value)), (f, y) => Oe((v(), k("tr", Tl, [
      x("td", { colspan: f.hiddenColumnsColSpan }, [
        x("table", null, [
          x("tr", null, [
            (v(!0), k(q, null, ie(f.hiddenColumns, (b) => (v(), k("th", {
              "data-column": b.key
            }, [
              x("div", null, Xe(b.label), 1)
            ], 8, Al))), 256))
          ]),
          x("tr", { "data-i": f.i }, [
            (v(!0), k(q, null, ie(f.hiddenColumns, (b, T) => (v(), k("td", {
              "data-column": b.key,
              title: B(it)(b, l.value, T, f.hiddenColumns),
              onClick: y[1] || (y[1] = (u) => a(u))
            }, [
              f.$slots[b.key] ? O(f.$slots, b.key, {
                key: 0,
                value: l.value[b.key],
                item: l.value,
                column: b,
                i: T
              }) : (v(), $(Rt, {
                key: 1,
                column: b,
                columns: f.hiddenColumns,
                modelValue: l.value,
                "onUpdate:modelValue": y[0] || (y[0] = (u) => l.value = u),
                i: T,
                "edit-mode-enabled": f.editModeEnabled,
                "has-inline-edit-perm": f.hasInlineEditPerm
              }, null, 8, ["column", "columns", "modelValue", "i", "edit-mode-enabled", "has-inline-edit-perm"]))
            ], 8, Rl))), 256))
          ], 8, Vl)
        ])
      ], 8, El)
    ], 512)), [
      [Ue, f.hiddenIsVisible]
    ]);
  }
}), Ht = /* @__PURE__ */ re({
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
    var T;
    const i = o, n = t, l = s(() => W.createButtonSlot !== ""), a = s(() => W.createButtonSlot), f = {
      ...(T = n.config) == null ? void 0 : T.modalData,
      beforeClose: (u) => {
        "itemCreated" in u && u.itemCreated === !0 && i("append", u.item);
      }
    }, y = {
      ...n.config
    };
    y.modalData = f;
    const b = () => {
      var u;
      if (!((u = n.config) != null && u.modal)) {
        i("click");
        return;
      }
    };
    return (u, m) => {
      const c = ye("lkt-button");
      return v(), $(c, ae(y, {
        disabled: u.disabled,
        onClick: b
      }), {
        default: P(() => [
          l.value ? (v(), $(Le(a.value), { key: 0 })) : D("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), Ll = ["data-column", "data-sortable", "data-sort", "colspan", "title"], Nl = /* @__PURE__ */ re({
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
  setup(t, { emit: o }) {
    const i = o, n = t, l = s(() => ul(n.column, n.amountOfColumns, n.items)), a = s(() => n.column.sortable === !0), f = s(() => a.value && n.sortBy === n.column.key ? n.sortDirection : ""), y = s(() => ca(n.column.label)), b = s(() => a.value && n.sortBy === n.column.key ? n.sortDirection === Ge.Asc ? be.defaultTableSortAscIcon : n.sortDirection === Ge.Desc ? be.defaultTableSortDescIcon : "" : ""), T = () => i("click", n.column);
    return (u, m) => (v(), k("th", {
      "data-column": u.column.key,
      "data-sortable": a.value,
      "data-sort": f.value,
      colspan: l.value,
      title: y.value,
      class: Z(B(ha)(u.column)),
      onClick: T
    }, [
      x("div", null, [
        ot(Xe(y.value) + " ", 1),
        b.value ? (v(), k("i", {
          key: 0,
          class: Z(b.value)
        }, null, 2)) : D("", !0)
      ])
    ], 10, Ll));
  }
}), $l = ["id"], _l = { class: "lkt-table-page-buttons" }, Ol = { class: "switch-edition-mode" }, Ul = { class: "switch-edition-mode" }, Pl = {
  key: 0,
  class: "lkt-table-page-buttons"
}, Fl = {
  key: 1,
  class: "lkt-table-page-filters"
}, jl = { class: "lkt-table" }, zl = { key: 0 }, Hl = { key: 0 }, ql = {
  key: 0,
  "data-role": "drag-indicator"
}, Gl = { key: 1 }, Xl = { key: 2 }, Yl = {
  key: 3,
  class: "lkt-table-col-drop"
}, Kl = {
  key: 4,
  class: "lkt-table-col-edit"
}, Wl = ["id"], Jl = ["id"], Ql = ["data-i"], Zl = ["id"], xl = ["data-i"], en = ["id"], tn = { class: "lkt-carousel-slide" }, an = { class: "lkt-carousel-slide" }, ln = {
  key: 2,
  class: "lkt-table-empty"
}, nn = {
  key: 4,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, on = /* @__PURE__ */ re({
  __name: "LktTable",
  props: /* @__PURE__ */ $a({
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
    accordion: {},
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
  }, Ua(Pa)),
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
    var Jt, Qt;
    const n = i, l = ua(), a = t, f = {}, y = I(typeof a.sorter == "function" ? a.sorter : rl), b = I(cl(a.columns)), T = I(Ge.Asc), u = I(a.modelValue), m = I(f), c = I(null), S = I(a.columns), V = I((Jt = a.paginator) == null ? void 0 : Jt.modelValue), E = I(a.loading), le = I(!1), j = I(a.perms), de = I(null), ce = I(null), Ne = I(null), ue = I({}), Y = I(new ja({ items: u.value }, a.dataStateConfig)), r = I(a.editMode), _ = I(0), ee = I(null), U = I(((Qt = a.carousel) == null ? void 0 : Qt.currentSlide) || 0), M = I(Ee(a.saveButton, be.defaultSaveButton)), he = I(Ee(a.createButton, be.defaultCreateButton)), rt = I(Ee(a.editModeButton, be.defaultEditModeButton)), Pe = I(Ee(a.dropButton, be.defaultDropButton)), ne = I(Ee(a.groupButton, be.defaultGroupButton));
    F(() => a.saveButton, (e) => M.value = Ee(a.saveButton, be.defaultSaveButton)), F(() => a.createButton, (e) => he.value = Ee(a.createButton, be.defaultCreateButton)), F(() => a.editModeButton, (e) => rt.value = Ee(a.editModeButton, be.defaultEditModeButton)), F(() => a.dropButton, (e) => Pe.value = Ee(a.dropButton, be.defaultDropButton));
    const $e = I(!1);
    F(E, (e) => n("update:loading", e)), F(V, (e) => n("page", e));
    const Fe = (e) => {
      j.value = e;
    }, Mt = (e) => {
      var p;
      Array.isArray(e.data) && ((!a.paginator || ![Et.LoadMore, Et.Infinite].includes((p = a.paginator) == null ? void 0 : p.type)) && u.value.splice(0, u.value.length), u.value = [...u.value, ...e.data]), E.value = !1, le.value = !0, Y.value.store({ items: u.value }).turnStoredIntoOriginal(), $e.value = !1, Tt(() => {
        me(), _e.value, n("read-response", e);
      });
    }, ke = () => Tt(() => E.value = !0), Ke = () => {
      de.value.doRefresh();
    }, ve = Fa(12), Se = s(() => {
      if (!a.hideEmptyColumns) return [];
      let e = [];
      return S.value.forEach((p) => {
        let N = p.key, Q = !1;
        u.value.forEach((oe) => {
          if (typeof oe.checkEmpty == "function")
            return oe.checkEmpty(oe);
          oe[N] && (Q = !0);
        }), Q || e.push(N);
      }), e;
    }), Ce = s(() => S.value.filter((e) => !e.hidden)), We = s(() => []), Je = s(() => {
      let e = Ce.value.length + 1;
      return a.sortable && ++e, e;
    }), De = s(() => S.value.filter((e) => e.isForRowKey)), je = s(() => We.value.length > 0 && !a.sortable), fe = s(() => S.value.map((e) => e.key)), ze = s(() => {
      let e = [];
      for (let p in l) fe.value.indexOf(p) !== -1 && e.push(p);
      return e;
    }), ut = s(() => {
      let e = [];
      for (let p in l) p.indexOf("slide-") !== -1 && e.push(p);
      return e;
    }), st = s(() => {
      var e;
      return a.hiddenSave || E.value || !((e = M.value) != null && e.resource || M.value.type) ? !1 : r.value && $e.value ? !0 : r.value;
    }), Lt = s(() => gt.value && u.value.length >= a.requiredItemsForTopCreate || He.value ? !0 : st.value || r.value && pe.value), _e = s(() => {
      var e, p;
      return _.value, typeof ((e = M.value) == null ? void 0 : e.disabled) == "function" ? M.value.disabled({
        value: u.value,
        dataState: Y.value
      }) : typeof ((p = M.value) == null ? void 0 : p.disabled) == "boolean" ? M.value.disabled : !$e.value;
    }), Nt = s(() => u.value.length), dt = s(() => {
      var e;
      return {
        items: u.value,
        ...(e = M.value) == null ? void 0 : e.resourceData
      };
    }), St = s(() => a.titleTag === "" ? "h2" : a.titleTag), ct = s(() => a.wrapContentTag === "" ? "div" : a.wrapContentTag), Qe = s(() => ca(a.title)), Ze = s(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }), pe = s(() => j.value.includes(Ae.Create)), Ie = s(() => j.value.includes("read")), z = s(() => j.value.includes(Ae.Update)), Te = s(() => j.value.includes(Ae.Edit)), we = s(() => j.value.includes(Ae.InlineEdit)), xe = s(() => j.value.includes(Ae.ModalCreate)), Ct = s(() => j.value.includes(Ae.InlineCreate)), vt = s(() => j.value.includes(Ae.InlineCreateEver)), G = s(() => j.value.includes(Ae.Drop)), ft = s(() => j.value.includes(Ae.SwitchEditMode)), He = s(() => !ft.value || !z.value && !G.value || !z.value && G.value ? !1 : !E.value), et = s(() => {
      var e;
      return (typeof ((e = a.paginator) == null ? void 0 : e.type) < "u" && [Et.LoadMore, Et.Infinite].includes(a.paginator.type) || !E.value) && u.value.length > 0;
    }), tt = s(() => S.value.find((e) => e.isForAccordionHeader)), $t = (e) => {
      let p = e.target;
      if (typeof p.dataset.column > "u")
        do
          p = p.parentNode;
        while (typeof p.dataset.column > "u" && p.tagName !== "TABLE" && p.tagName !== "body");
      if (p.tagName === "TD" && (p = p.parentNode, p = p.dataset.i, typeof p < "u"))
        return u.value[p];
    }, me = () => {
      _.value = Ha();
    }, wt = (e) => u.value[e], _t = (e) => {
      var p;
      return (p = c.value) == null ? void 0 : p.querySelector(`[data-i="${e}"]`);
    }, at = (e) => m.value["tr_" + e] === !0, d = (e) => {
      e && e.sortable && (u.value = u.value.sort((p, N) => y.value(p, N, e, T.value)), T.value = T.value === Ge.Asc ? Ge.Desc : Ge.Asc, b.value = e.key, me(), n("sort", [b.value, T.value]));
    }, h = (e) => {
      n("click", e);
    }, C = (e, p) => {
      let N = "tr_" + p;
      m.value[N] = typeof m.value[N] > "u" ? !0 : !m.value[N];
    }, A = (e) => {
      var N, Q, oe, ge, yt, w, g, R;
      let p = parseInt((ge = (oe = (Q = (N = e == null ? void 0 : e.originalEvent) == null ? void 0 : N.toElement) == null ? void 0 : Q.closest("tr")) == null ? void 0 : oe.dataset) == null ? void 0 : ge.i);
      return !(typeof ((yt = a.drag) == null ? void 0 : yt.isValid) == "function" && !((w = a.drag) != null && w.isValid(u.value[p])) || typeof ((g = a.drag) == null ? void 0 : g.isValid) == "boolean" && !((R = a.drag) != null && R.isValid));
    }, L = (e) => {
      var p, N;
      return typeof ((p = a.drag) == null ? void 0 : p.isDraggable) == "function" ? (N = a.drag) == null ? void 0 : N.isDraggable(e) : !0;
    }, X = () => {
      if (pe.value) {
        n("click-create");
        return;
      }
      if (Ct.value || vt.value) {
        if (typeof a.newValueGenerator == "function") {
          let e = a.newValueGenerator();
          if (typeof e == "object" || a.type !== qe.Table) {
            u.value.push(e);
            return;
          }
        }
        u.value.push({});
      } else
        n("click-create");
    }, te = (e) => {
      u.value.push(e);
    }, J = () => E.value = !0, lt = () => E.value = !1, Bt = (e, p) => {
      var N, Q, oe;
      if (!((N = M.value) != null && N.type && [
        jt.Split,
        jt.SplitEver,
        jt.SplitLazy
      ].includes((Q = M.value) == null ? void 0 : Q.type))) {
        if (n("before-save"), (oe = M.value) != null && oe.resource && (E.value = !1, !p.success)) {
          n("error", p.httpStatus);
          return;
        }
        Y.value.turnStoredIntoOriginal(), $e.value = !1, n("save", p);
      }
    }, Dt = (e, p, N) => {
      if (N >= e.length) {
        let Q = N - e.length + 1;
        for (; Q--; ) e.push(void 0);
      }
      return e.splice(N, 0, e.splice(p, 1)[0]), e;
    }, ka = (e) => {
      Dt(u.value, e, e - 1), me();
    }, Sa = (e) => {
      Dt(u.value, e, e + 1), me();
    }, pt = (e) => {
      u.value.splice(e, 1), me();
    }, Wt = () => {
      var e;
      ue.value && typeof ((e = ue.value) == null ? void 0 : e.destroy) == "function" && (ue.value.destroy(), ue.value = {});
    }, Ot = () => {
      ee.value || (ee.value = document.getElementById("lkt-table-body-" + ve)), ue.value = new za(ee.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let p = e.oldIndex, N = e.newIndex;
          u.value.splice(N, 0, u.value.splice(p, 1)[0]), me(), n("drag-end", u.value[N]);
        },
        onMove: function(e, p) {
          return A(e);
        }
      });
    }, mt = (e, p, N = !1) => {
      let Q = [_.value, ve, "row", p];
      return N && Q.push("hidden"), De.value.forEach((oe) => {
        let ge = String(e[oe.key]).toLowerCase();
        ge.length > 50 && (ge = ge.substring(0, 50)), ge = va(ge, " ", "-"), Q.push(ge);
      }), Q.join("-");
    }, Ut = s(() => typeof a.createEnabledValidator == "function" ? a.createEnabledValidator({ items: u.value }) : !0), gt = s(() => vt.value || pe.value && r.value || Ct.value && r.value || xe.value && r.value), Ca = s(() => [qe.Ol, qe.Ul].includes(a.type)), bt = (e, p) => typeof a.itemDisplayChecker == "function" ? a.itemDisplayChecker(e) : !0, It = (e, p) => typeof a.itemContainerClass == "function" ? a.itemContainerClass(e, p) : a.itemContainerClass, wa = (e, p) => tt.value ? e[tt.value.key] : "";
    Yt(() => {
      var e;
      a.initialSorting && d(vl(a.columns, b.value)), Y.value.store({ items: u.value }).turnStoredIntoOriginal(), $e.value = !1, (e = a.drag) != null && e.enabled && Tt(() => {
        Ot();
      });
    }), F(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }, (e) => {
      e ? Ot() : Wt();
    }), F(() => a.type, (e) => {
      var p;
      (p = a.drag) != null && p.enabled ? Ot() : Wt();
    }), F(() => a.perms, (e) => j.value = e), F(j, (e) => n("update:perms", e)), F(r, (e) => {
      n("update:editMode", e);
    }), F(() => a.editMode, (e) => r.value = e), F(() => a.columns, (e) => S.value = e, { deep: !0 }), F(() => a.modelValue, (e) => {
      u.value = e;
    }, { deep: !0 }), F(u, (e) => {
      Y.value.increment({ items: e }), $e.value = Y.value.changed(), n("update:modelValue", e);
    }, { deep: !0 }), o({
      getItemByEvent: $t,
      getItemByIndex: wt,
      getRowByIndex: _t,
      doRefresh: Ke,
      doRemoveIndex: (e) => {
        u.value.splice(e, 1), me();
      },
      getHtml: () => ce.value,
      reRender: me,
      turnStoredIntoOriginal: () => {
        Y.value.turnStoredIntoOriginal(), Tt(() => {
          me();
        });
      }
    });
    const Ba = s(() => typeof W.defaultEmptySlot < "u"), Da = s(() => W.defaultEmptySlot), Ia = s(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled ? !1 : typeof a.drag.canRender > "u" ? !0 : a.drag.canRender), Ta = s(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled || typeof a.drag.isDisabled > "u" ? !1 : a.drag.isDisabled);
    return (e, p) => {
      const N = ye("lkt-button"), Q = ye("lkt-accordion"), oe = ye("lkt-loader"), ge = ye("lkt-paginator");
      return v(), k("section", {
        ref_key: "element",
        ref: ce,
        class: "lkt-table-page",
        id: "lkt-table-page-" + B(ve)
      }, [
        Qe.value || B(l).title ? (v(), k("header", {
          key: 0,
          class: Z(e.headerClass)
        }, [
          Qe.value ? (v(), $(Le(St.value), { key: 0 }, {
            default: P(() => [
              e.titleIcon ? (v(), k("i", {
                key: 0,
                class: Z(e.titleIcon)
              }, null, 2)) : D("", !0),
              ot(" " + Xe(Qe.value), 1)
            ]),
            _: 1
          })) : D("", !0),
          B(l).title ? O(e.$slots, "title", { key: 1 }) : D("", !0)
        ], 2)) : D("", !0),
        (v(), $(Le(ct.value), {
          class: Z(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: P(() => {
            var yt;
            return [
              Oe(x("div", _l, [
                e.groupButton !== !1 ? (v(), $(N, ae({
                  key: 0,
                  ref: "groupButton"
                }, ne.value, { class: "lkt-item-crud-group-button" }), {
                  split: P(() => [
                    x("div", Ol, [
                      Oe(se(N, ae(rt.value, {
                        checked: r.value,
                        "onUpdate:checked": p[0] || (p[0] = (w) => r.value = w)
                      }), null, 16, ["checked"]), [
                        [Ue, He.value]
                      ])
                    ]),
                    B(l)["prev-buttons-ever"] ? O(e.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: z.value,
                      canDrop: G.value,
                      perms: e.perms
                    }) : D("", !0),
                    B(l)["prev-buttons"] ? O(e.$slots, "prev-buttons", {
                      key: 1,
                      canUpdate: z.value,
                      canDrop: G.value,
                      perms: e.perms
                    }) : D("", !0),
                    Oe(se(N, ae({
                      class: "lkt-table--save-button",
                      ref_key: "saveButtonRef",
                      ref: Ne
                    }, {
                      ...M.value,
                      disabled: _e.value,
                      resourceData: dt.value
                    }, {
                      onLoading: J,
                      onLoaded: lt,
                      onClick: Bt
                    }), {
                      split: P(({ doClose: w, doRootClick: g }) => [
                        O(e.$slots, "button-save-split", {
                          doClose: w,
                          doRootClick: g,
                          dataState: Y.value,
                          onButtonLoading: J,
                          onButtonLoaded: lt
                        })
                      ]),
                      default: P(() => [
                        B(l)["button-save"] ? O(e.$slots, "button-save", {
                          key: 0,
                          items: u.value,
                          editMode: e.editMode,
                          canUpdate: !_e.value
                        }) : D("", !0)
                      ]),
                      _: 3
                    }, 16), [
                      [Ue, st.value]
                    ]),
                    gt.value && u.value.length >= e.requiredItemsForTopCreate ? (v(), $(Ht, {
                      key: 2,
                      config: he.value,
                      disabled: !Ut.value,
                      onClick: X,
                      onAppend: te
                    }, null, 8, ["config", "disabled"])) : D("", !0)
                  ]),
                  _: 3
                }, 16)) : D("", !0),
                B(l)["prev-buttons-ever"] ? O(e.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: z.value,
                  canDrop: G.value,
                  perms: e.perms
                }) : D("", !0),
                B(l)["prev-buttons"] ? O(e.$slots, "prev-buttons", {
                  key: 2,
                  canUpdate: z.value,
                  canDrop: G.value,
                  perms: e.perms
                }) : D("", !0),
                Oe(se(N, ae({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: Ne
                }, {
                  ...M.value,
                  disabled: _e.value,
                  resourceData: dt.value
                }, {
                  onLoading: J,
                  onLoaded: lt,
                  onClick: Bt
                }), {
                  split: P(({ doClose: w, doRootClick: g }) => [
                    O(e.$slots, "button-save-split", {
                      doClose: w,
                      doRootClick: g,
                      dataState: Y.value,
                      onButtonLoading: J,
                      onButtonLoaded: lt
                    })
                  ]),
                  default: P(() => [
                    B(l)["button-save"] ? O(e.$slots, "button-save", {
                      key: 0,
                      items: u.value,
                      editMode: e.editMode,
                      canUpdate: !_e.value
                    }) : D("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [Ue, st.value]
                ]),
                gt.value && u.value.length >= e.requiredItemsForTopCreate ? (v(), $(Ht, {
                  key: 3,
                  config: he.value,
                  disabled: !Ut.value,
                  onClick: X,
                  onAppend: te
                }, null, 8, ["config", "disabled"])) : D("", !0),
                x("div", Ul, [
                  Oe(se(N, ae(rt.value, {
                    checked: r.value,
                    "onUpdate:checked": p[1] || (p[1] = (w) => r.value = w)
                  }), null, 16, ["checked"]), [
                    [Ue, He.value]
                  ])
                ])
              ], 512), [
                [Ue, Lt.value]
              ]),
              B(l).buttons ? (v(), k("div", Pl, [
                O(e.$slots, "buttons")
              ])) : D("", !0),
              le.value && B(l).filters ? (v(), k("div", Fl, [
                O(e.$slots, "filters", {
                  items: u.value,
                  isLoading: E.value
                })
              ])) : D("", !0),
              Oe(x("div", jl, [
                e.type === B(qe).Table ? (v(), k("table", zl, [
                  e.hideTableHeader ? D("", !0) : (v(), k("thead", Hl, [
                    x("tr", null, [
                      Ze.value && r.value ? (v(), k("th", ql)) : D("", !0),
                      e.addNavigation && r.value ? (v(), k("th", Gl)) : D("", !0),
                      je.value ? (v(), k("th", Xl)) : D("", !0),
                      (v(!0), k(q, null, ie(Ce.value, (w) => (v(), k(q, null, [
                        Se.value.indexOf(w.key) === -1 ? (v(), $(Nl, {
                          key: 0,
                          column: w,
                          "sort-by": b.value,
                          "sort-direction": T.value,
                          "amount-of-columns": e.columns.length,
                          items: u.value,
                          onClick: (g) => d(w)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : D("", !0)
                      ], 64))), 256)),
                      G.value && r.value ? (v(), k("th", Yl)) : D("", !0),
                      Te.value && z.value && r.value ? (v(), k("th", Kl)) : D("", !0)
                    ])
                  ])),
                  x("tbody", {
                    ref_key: "tableBody",
                    ref: c,
                    id: "lkt-table-body-" + B(ve),
                    class: Z(e.itemsContainerClass)
                  }, [
                    (v(!0), k(q, null, ie(u.value, (w, g) => Oe((v(), $(Il, {
                      modelValue: u.value[g],
                      "onUpdate:modelValue": (R) => u.value[g] = R,
                      key: mt(w, g),
                      i: g,
                      "drop-button": Pe.value,
                      "edit-button": e.editButton,
                      "display-hidden-columns-indicator": je.value,
                      "is-draggable": L(w),
                      sortable: Ze.value,
                      "visible-columns": Ce.value,
                      "empty-columns": Se.value,
                      "add-navigation": e.addNavigation,
                      "hidden-is-visible": at(g),
                      "latest-row": g + 1 === Nt.value,
                      "can-drop": G.value && r.value,
                      "can-edit": Te.value && z.value && r.value,
                      "can-read": Ie.value,
                      "can-create": pe.value,
                      "edit-mode-enabled": r.value,
                      "has-inline-edit-perm": we.value,
                      "row-display-type": e.rowDisplayType,
                      "render-drag": Ia.value,
                      "disabled-drag": Ta.value,
                      "is-loading": E.value,
                      "item-container-class": e.itemContainerClass,
                      onClick: h,
                      onShow: C,
                      onItemUp: ka,
                      onItemDown: Sa,
                      onItemDrop: pt
                    }, Zt({ _: 2 }, [
                      B(l)[`item-${g}`] ? {
                        name: `item-${g}`,
                        fn: P((R) => [
                          O(e.$slots, `item-${g}`, Re({
                            [e.slotItemVar || ""]: R.item,
                            index: g,
                            editing: R.editing,
                            canCreate: R.canCreate,
                            canRead: R.canRead,
                            canUpdate: R.canUpdate,
                            canDrop: R.canDrop,
                            isLoading: R.isLoading,
                            doDrop: R.doDrop
                          }))
                        ]),
                        key: "0"
                      } : B(l).item ? {
                        name: "item",
                        fn: P((R) => [
                          O(e.$slots, "item", Re({
                            [e.slotItemVar || ""]: R.item,
                            index: g,
                            editing: R.editing,
                            canCreate: R.canCreate,
                            canRead: R.canRead,
                            canUpdate: R.canUpdate,
                            canDrop: R.canDrop,
                            isLoading: R.isLoading,
                            doDrop: R.doDrop
                          }))
                        ]),
                        key: "1"
                      } : void 0,
                      ie(ze.value, (R) => ({
                        name: R,
                        fn: P((Be) => [
                          O(e.$slots, R, Re({
                            [e.slotItemVar || ""]: Be.item,
                            value: Be.value,
                            column: Be.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "drop-button", "edit-button", "display-hidden-columns-indicator", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "hidden-is-visible", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class"])), [
                      [Ue, bt(u.value[g])]
                    ])), 128)),
                    We.value.length > 0 ? (v(!0), k(q, { key: 0 }, ie(u.value, (w, g) => (v(), $(Ml, {
                      modelValue: u.value[g],
                      "onUpdate:modelValue": (R) => u.value[g] = R,
                      key: mt(w, g, !0),
                      i: g,
                      "hidden-columns": We.value,
                      "hidden-columns-col-span": Je.value,
                      "is-draggable": L(w),
                      sortable: Ze.value,
                      "visible-columns": Ce.value,
                      "empty-columns": Se.value,
                      "hidden-is-visible": at(g),
                      "edit-mode-enabled": r.value,
                      "has-inline-edit-perm": we.value,
                      onClick: h,
                      onShow: C
                    }, Zt({ _: 2 }, [
                      ie(ze.value, (R) => ({
                        name: R,
                        fn: P((Be) => [
                          O(e.$slots, R, Re({
                            [e.slotItemVar || ""]: Be.item,
                            value: Be.value,
                            column: Be.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "hidden-columns", "hidden-columns-col-span", "is-draggable", "sortable", "visible-columns", "empty-columns", "hidden-is-visible", "edit-mode-enabled", "has-inline-edit-perm"]))), 128)) : D("", !0)
                  ], 10, Wl)
                ])) : e.type === B(qe).Item ? (v(), k("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: c,
                  id: "lkt-table-body-" + B(ve),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), k(q, null, ie(u.value, (w, g) => (v(), k(q, null, [
                    !e.skipTableItemsContainer && bt(w) ? (v(), k("div", {
                      class: Z(["lkt-table-item", It(w, g)]),
                      "data-i": g,
                      key: mt(w, g)
                    }, [
                      O(e.$slots, "item", Re({
                        [e.slotItemVar || ""]: w,
                        index: g,
                        editing: r.value,
                        canCreate: pe.value,
                        canRead: Ie.value,
                        canUpdate: z.value,
                        canDrop: G.value,
                        isLoading: E.value,
                        doDrop: () => pt(g)
                      }))
                    ], 10, Ql)) : bt(w) ? O(e.$slots, "item", Re({
                      class: It(w, g),
                      dataI: g,
                      key: mt(w, g),
                      [e.slotItemVar || ""]: w,
                      index: g,
                      editing: r.value,
                      canCreate: pe.value,
                      canRead: Ie.value,
                      canUpdate: z.value,
                      canDrop: G.value,
                      isLoading: E.value,
                      doDrop: () => pt(g)
                    })) : D("", !0)
                  ], 64))), 256))
                ], 10, Jl)) : e.type === B(qe).Accordion ? (v(), k("div", {
                  key: 2,
                  ref_key: "tableBody",
                  ref: c,
                  id: "lkt-table-body-" + B(ve),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), k(q, null, ie(u.value, (w, g) => (v(), k(q, null, [
                    bt(w) ? (v(), $(Q, ae({
                      class: ["lkt-table-item", It(w, g)],
                      "data-i": g,
                      key: mt(w, g),
                      ref_for: !0
                    }, {
                      ...e.accordion,
                      title: wa(w)
                    }), {
                      header: P(() => [
                        se(Rt, {
                          modelValue: u.value[g],
                          "onUpdate:modelValue": (R) => u.value[g] = R,
                          i: g,
                          column: tt.value,
                          columns: Ce.value,
                          "edit-mode-enabled": r.value,
                          "has-inline-edit-perm": we.value
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])
                      ]),
                      default: P(() => [
                        (v(!0), k(q, null, ie(Ce.value, (R) => {
                          var Be;
                          return v(), k(q, null, [
                            R.key !== ((Be = tt.value) == null ? void 0 : Be.key) ? (v(), $(Rt, {
                              key: 0,
                              modelValue: u.value[g],
                              "onUpdate:modelValue": (Ea) => u.value[g] = Ea,
                              i: g,
                              column: R,
                              columns: Ce.value,
                              "edit-mode-enabled": r.value,
                              "has-inline-edit-perm": we.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])) : D("", !0)
                          ], 64);
                        }), 256))
                      ]),
                      _: 2
                    }, 1040, ["class", "data-i"])) : D("", !0)
                  ], 64))), 256))
                ], 10, Zl)) : Ca.value ? (v(), $(Le(e.type), {
                  key: 3,
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, {
                  default: P(() => [
                    (v(!0), k(q, null, ie(u.value, (w, g) => (v(), k(q, null, [
                      bt(w) ? (v(), k("li", {
                        key: 0,
                        class: Z(["lkt-table-item", It(w, g)]),
                        "data-i": g
                      }, [
                        O(e.$slots, "item", Re({
                          [e.slotItemVar || ""]: w,
                          index: g,
                          editing: r.value,
                          canCreate: pe.value,
                          canRead: Ie.value,
                          canUpdate: z.value,
                          canDrop: G.value,
                          isLoading: E.value,
                          doDrop: () => pt(g)
                        }))
                      ], 10, xl)) : D("", !0)
                    ], 64))), 256))
                  ]),
                  _: 3
                }, 8, ["class"])) : e.type === B(qe).Carousel ? (v(), k("div", {
                  key: 4,
                  ref_key: "tableBody",
                  ref: c,
                  id: "lkt-table-body-" + B(ve),
                  class: Z(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  se(B(al), ae({
                    modelValue: U.value,
                    "onUpdate:modelValue": p[2] || (p[2] = (w) => U.value = w)
                  }, e.carousel, {
                    "wrap-around": ((yt = e.carousel) == null ? void 0 : yt.infinite) === !0
                  }), {
                    addons: P(() => [
                      se(B(ol)),
                      se(B(il))
                    ]),
                    default: P(() => [
                      (v(!0), k(q, null, ie(ut.value, (w, g) => (v(), $(B(oa), {
                        key: w,
                        index: g
                      }, {
                        default: P(() => [
                          x("div", tn, [
                            O(e.$slots, w)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (v(!0), k(q, null, ie(u.value, (w, g) => (v(), $(B(oa), {
                        key: e.slide,
                        index: g
                      }, {
                        default: P(() => [
                          x("div", an, [
                            O(e.$slots, "item", Re({
                              [e.slotItemVar || ""]: w,
                              index: g,
                              editing: r.value,
                              canCreate: pe.value,
                              canRead: Ie.value,
                              canUpdate: z.value,
                              canDrop: G.value,
                              isLoading: E.value,
                              doDrop: () => pt(g)
                            }))
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128))
                    ]),
                    _: 3
                  }, 16, ["modelValue", "wrap-around"])
                ], 10, en)) : D("", !0)
              ], 512), [
                [Ue, et.value]
              ]),
              !E.value && u.value.length === 0 ? (v(), k("div", ln, [
                B(l).empty ? O(e.$slots, "empty", { key: 0 }) : Ba.value ? (v(), $(Le(Da.value), {
                  key: 1,
                  message: e.noResultsText
                }, null, 8, ["message"])) : e.noResultsText ? (v(), k(q, { key: 2 }, [
                  ot(Xe(e.noResultsText), 1)
                ], 64)) : D("", !0)
              ])) : D("", !0),
              E.value ? (v(), $(oe, { key: 3 })) : D("", !0),
              gt.value || B(l).bottomButtons ? (v(), k("div", nn, [
                gt.value && u.value.length >= e.requiredItemsForBottomCreate ? (v(), $(Ht, {
                  key: 0,
                  config: he.value,
                  disabled: !Ut.value,
                  onClick: X,
                  onAppend: te
                }, null, 8, ["config", "disabled"])) : D("", !0),
                O(e.$slots, "bottom-buttons")
              ])) : D("", !0),
              e.paginator && Object.keys(e.paginator).length > 0 ? (v(), $(ge, ae({
                key: 5,
                ref_key: "paginatorRef",
                ref: de
              }, e.paginator, {
                modelValue: V.value,
                "onUpdate:modelValue": p[3] || (p[3] = (w) => V.value = w),
                onLoading: ke,
                onPerms: Fe,
                onResponse: Mt
              }), null, 16, ["modelValue"])) : D("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, $l);
    };
  }
}), pn = {
  install: (t) => {
    t.component("lkt-table") === void 0 && t.component("lkt-table", on);
  }
}, mn = (t) => (W.navButtonSlot = t, !0), gn = (t) => (W.dropButtonSlot = t, !0), bn = (t) => (W.createButtonSlot = t, !0), yn = (t) => {
  W.defaultEmptySlot = t;
}, hn = (t) => {
  W.defaultSaveIcon = t;
};
export {
  Cn as Column,
  wn as createColumn,
  pn as default,
  bn as setTableCreateButtonSlot,
  gn as setTableDropButtonSlot,
  yn as setTableEmptySlot,
  mn as setTableNavButtonSlot,
  hn as setTableSaveIcon
};
