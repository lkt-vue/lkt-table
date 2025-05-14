import { defineComponent as pe, computed as s, ref as I, shallowReactive as Pt, watch as U, watchEffect as Nt, onMounted as zt, onBeforeUnmount as ba, reactive as Mt, provide as Zt, h as G, useId as ya, inject as yt, getCurrentInstance as ha, onUnmounted as ka, onUpdated as Sa, cloneVNode as Ca, resolveComponent as Te, createBlock as O, createElementBlock as D, unref as S, openBlock as v, mergeProps as oe, withCtx as P, createTextVNode as tt, toDisplayString as at, Fragment as q, useSlots as ea, normalizeClass as W, createCommentVNode as R, createElementVNode as ve, createVNode as he, resolveDynamicComponent as xe, renderSlot as _, renderList as ye, mergeDefaults as wa, nextTick as Dt, withDirectives as Pe, vShow as Ue, createSlots as Da, normalizeProps as Fe } from "vue";
import { __ as Ba } from "lkt-i18n";
import { SortDirection as He, Column as ta, extractPropValue as Ta, ColumnType as mt, FieldType as Gt, TableRowType as et, extractI18nValue as aa, LktSettings as Be, ensureButtonConfig as je, TablePermission as we, PaginatorType as Bt, TableType as ze, getDefaultValues as Ia, Table as Aa, ButtonType as Ot } from "lkt-vue-kernel";
import { Column as Wl, createColumn as Jl } from "lkt-vue-kernel";
import { generateRandomString as Ea, replaceAll as Va } from "lkt-string-tools";
import { DataState as Ra } from "lkt-data-state";
import La from "sortablejs";
import { time as Na } from "lkt-date-tools";
/**
 * Vue 3 Carousel 0.14.0
 * (c) 2025
 * @license MIT
 */
const la = ["viewport", "carousel"], It = {
  "bottom-to-top": "btt",
  "left-to-right": "ltr",
  "right-to-left": "rtl",
  "top-to-bottom": "ttb"
}, na = [
  "ltr",
  "left-to-right",
  "rtl",
  "right-to-left",
  "ttb",
  "top-to-bottom",
  "btt",
  "bottom-to-top"
], Ma = {
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
}, oa = ["slide", "fade"], ia = [
  "center",
  "start",
  "end",
  "center-even",
  "center-odd"
], z = {
  autoplay: 0,
  breakpointMode: la[0],
  breakpoints: void 0,
  dir: na[0],
  enabled: !0,
  gap: 0,
  height: "auto",
  i18n: Ma,
  ignoreAnimations: !1,
  itemsToScroll: 1,
  itemsToShow: 1,
  modelValue: 0,
  mouseDrag: !0,
  pauseAutoplayOnHover: !1,
  preventExcessiveDragging: !1,
  slideEffect: oa[0],
  snapAlign: ia[0],
  touchDrag: !0,
  transition: 300,
  wrapAround: !1
}, qe = Symbol("carousel"), Oa = (t) => {
  const o = Pt([]), i = (n) => {
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
function _a(t) {
  return t.length === 0 ? 0 : t.reduce((i, n) => i + n, 0) / t.length;
}
function Xt({ slides: t, position: o, toShow: i }) {
  const n = [], l = o === "before", a = l ? -i : 0, b = l ? 0 : i;
  if (t.length <= 0)
    return n;
  for (let h = a; h < b; h++) {
    const d = {
      index: l ? h : h + t.length,
      isClone: !0,
      position: o,
      id: void 0,
      // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${o}-${h}`
    }, C = t[(h % t.length + t.length) % t.length].vnode, p = Ca(C, d);
    p.el = null, n.push(p);
  }
  return n;
}
const $a = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function Yt(t) {
  if (!t.el || !(t.el instanceof Element))
    return;
  const o = t.el.querySelectorAll($a);
  for (const i of o)
    i instanceof HTMLElement && !i.hasAttribute("disabled") && i.getAttribute("aria-hidden") !== "true" && i.setAttribute("tabindex", "-1");
}
function Pa(t, o) {
  return Object.keys(t).filter((i) => !o.includes(i)).reduce((i, n) => (i[n] = t[n], i), {});
}
function Ua(t) {
  const { isVertical: o, isReversed: i, dragged: n, effectiveSlideSize: l } = t, a = o ? n.y : n.x;
  if (a === 0)
    return 0;
  const b = Math.round(a / l);
  return i ? b : -b;
}
function De({ val: t, max: o, min: i }) {
  return o < i ? t : Math.min(Math.max(t, isNaN(i) ? t : i), isNaN(o) ? t : o);
}
function Fa(t) {
  const { transform: o } = window.getComputedStyle(t);
  return o.split(/[(,)]/).slice(1, -1).map((i) => parseFloat(i));
}
function ja(t) {
  let o = 1, i = 1;
  return t.forEach((n) => {
    const l = Fa(n);
    l.length === 6 && (o /= l[0], i /= l[3]);
  }), { widthMultiplier: o, heightMultiplier: i };
}
function za(t, o) {
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
function Ut({ slideSize: t, viewportSize: o, align: i, itemsToShow: n }) {
  return n !== void 0 ? za(i, n) : t !== void 0 && o !== void 0 ? xa(i, t, o) : 0;
}
function ra(t = "", o = {}) {
  return Object.entries(o).reduce((i, [n, l]) => i.replace(`{${n}}`, String(l)), t);
}
function ua({ val: t, max: o, min: i = 0 }) {
  const n = o - i + 1;
  return ((t - i) % n + n) % n + i;
}
function _t(t, o = 0) {
  let i = !1, n = 0, l = null;
  function a(...b) {
    if (i)
      return;
    i = !0;
    const h = () => {
      l = requestAnimationFrame((B) => {
        B - n > o ? (n = B, t(...b), i = !1) : h();
      });
    };
    h();
  }
  return a.cancel = () => {
    l && (cancelAnimationFrame(l), l = null, i = !1);
  }, a;
}
function Tt(t, o = "px") {
  if (!(t == null || t === ""))
    return typeof t == "number" || parseFloat(t).toString() === t ? `${t}${o}` : t;
}
const Ha = pe({
  name: "CarouselAria",
  setup() {
    const t = yt(qe);
    return t ? () => G("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, ra(t.config.i18n.itemXofY, {
      currentSlide: t.currentSlide + 1,
      slidesCount: t.slidesCount
    })) : () => "";
  }
}), qa = {
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
      return la.includes(t);
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
      return ia.includes(t);
    }
  },
  slideEffect: {
    type: String,
    default: z.slideEffect,
    validator(t) {
      return oa.includes(t);
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
      if (!na.includes(t))
        return !1;
      const i = t in It ? It[t] : t;
      return ["ttb", "btt"].includes(i) && (!o.height || o.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${t}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: z.wrapAround,
    type: Boolean
  }
}, Ga = pe({
  name: "VueCarousel",
  props: qa,
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
    const a = Oa(i), b = a.getSlides(), h = s(() => b.length), B = I(null), d = I(null), C = I(0), p = s(() => Object.assign(Object.assign(Object.assign({}, z), Pa(t, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, z.i18n), t.i18n) })), u = Pt(Object.assign({}, p.value)), m = I((l = t.modelValue) !== null && l !== void 0 ? l : 0), E = I(m.value);
    U(m, (r) => E.value = r);
    const V = I(0), J = s(() => Math.ceil((h.value - 1) / 2)), ie = s(() => h.value - 1), re = s(() => 0);
    let Q = null, c = null, T = null;
    const ue = s(() => C.value + u.gap), F = s(() => {
      const r = u.dir || "ltr";
      return r in It ? It[r] : r;
    }), le = s(() => ["rtl", "btt"].includes(F.value)), $ = s(() => ["ttb", "btt"].includes(F.value)), ne = s(() => u.itemsToShow === "auto"), x = s(() => $.value ? "height" : "width");
    function Ne() {
      var r;
      if (!Ee.value)
        return;
      const g = (p.value.breakpointMode === "carousel" ? (r = B.value) === null || r === void 0 ? void 0 : r.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, k = Object.keys(t.breakpoints || {}).map((L) => Number(L)).sort((L, j) => +j - +L), A = {};
      k.some((L) => g >= L ? (Object.assign(A, t.breakpoints[L]), A.i18n && Object.assign(A.i18n, p.value.i18n, t.breakpoints[L].i18n), !0) : !1), Object.assign(u, p.value, A);
    }
    const Ie = _t(() => {
      Ne(), me(), se();
    }), Ge = Pt(/* @__PURE__ */ new Set()), Z = I([]);
    function At({ widthMultiplier: r, heightMultiplier: g }) {
      Z.value = b.map((k) => {
        var A;
        const L = (A = k.exposed) === null || A === void 0 ? void 0 : A.getBoundingRect();
        return {
          width: L.width * r,
          height: L.height * g
        };
      });
    }
    const Me = I({
      width: 0,
      height: 0
    });
    function ke({ widthMultiplier: r, heightMultiplier: g }) {
      var k;
      const A = ((k = d.value) === null || k === void 0 ? void 0 : k.getBoundingClientRect()) || { width: 0, height: 0 };
      Me.value = {
        width: A.width * r,
        height: A.height * g
      };
    }
    function se() {
      if (!d.value)
        return;
      const r = ja(Ge);
      if (ke(r), At(r), ne.value)
        C.value = _a(Z.value.map((g) => g[x.value]));
      else {
        const g = Number(u.itemsToShow), k = (g - 1) * u.gap;
        C.value = (Me.value[x.value] - k) / g;
      }
    }
    function me() {
      !u.wrapAround && h.value > 0 && (m.value = De({
        val: m.value,
        max: ie.value,
        min: re.value
      })), ne.value || (u.itemsToShow = De({
        val: Number(u.itemsToShow),
        max: h.value,
        min: 1
      }));
    }
    const lt = s(() => typeof t.ignoreAnimations == "string" ? t.ignoreAnimations.split(",") : Array.isArray(t.ignoreAnimations) ? t.ignoreAnimations : t.ignoreAnimations ? !1 : []);
    Nt(() => me()), Nt(() => {
      se();
    });
    let Ae;
    const ht = (r) => {
      const g = r.target;
      if (!(!(g != null && g.contains(B.value)) || Array.isArray(lt.value) && lt.value.includes(r.animationName)) && (Ge.add(g), !Ae)) {
        const k = () => {
          Ae = requestAnimationFrame(() => {
            se(), k();
          });
        };
        k();
      }
    }, kt = (r) => {
      const g = r.target;
      g && Ge.delete(g), Ae && Ge.size === 0 && (cancelAnimationFrame(Ae), se());
    }, Ee = I(!1);
    typeof document < "u" && Nt(() => {
      Ee.value && lt.value !== !1 ? (document.addEventListener("animationstart", ht), document.addEventListener("animationend", kt)) : (document.removeEventListener("animationstart", ht), document.removeEventListener("animationend", kt));
    }), zt(() => {
      Ee.value = !0, Ne(), St(), B.value && (T = new ResizeObserver(Ie), T.observe(B.value)), i("init");
    }), ba(() => {
      Ee.value = !1, a.cleanup(), c && clearTimeout(c), Ae && cancelAnimationFrame(Ae), Q && clearInterval(Q), T && (T.disconnect(), T = null), typeof document < "u" && Ve(), B.value && (B.value.removeEventListener("transitionend", se), B.value.removeEventListener("animationiteration", se));
    });
    let Se = !1;
    const ge = { x: 0, y: 0 }, de = Mt({ x: 0, y: 0 }), Oe = I(!1), nt = I(!1), Et = () => {
      Oe.value = !0;
    }, ot = () => {
      Oe.value = !1;
    }, it = _t((r) => {
      if (!r.ctrlKey)
        switch (r.key) {
          case "ArrowLeft":
          case "ArrowUp":
            $.value === r.key.endsWith("Up") && (le.value ? Ce(!0) : Ke(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            $.value === r.key.endsWith("Down") && (le.value ? Ke(!0) : Ce(!0));
            break;
        }
    }, 200), be = () => {
      document.addEventListener("keydown", it);
    }, Ve = () => {
      document.removeEventListener("keydown", it);
    };
    function ee(r) {
      const g = r.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(g) || H.value || (Se = r.type === "touchstart", !Se && (r.preventDefault(), r.button !== 0)))
        return;
      ge.x = "touches" in r ? r.touches[0].clientX : r.clientX, ge.y = "touches" in r ? r.touches[0].clientY : r.clientY;
      const k = Se ? "touchmove" : "mousemove", A = Se ? "touchend" : "mouseup";
      document.addEventListener(k, rt, { passive: !1 }), document.addEventListener(A, Xe, { passive: !0 });
    }
    const rt = _t((r) => {
      nt.value = !0;
      const g = "touches" in r ? r.touches[0].clientX : r.clientX, k = "touches" in r ? r.touches[0].clientY : r.clientY;
      de.x = g - ge.x, de.y = k - ge.y;
      const A = Ua({
        isVertical: $.value,
        isReversed: le.value,
        dragged: de,
        effectiveSlideSize: ue.value
      });
      E.value = u.wrapAround ? m.value + A : De({
        val: m.value + A,
        max: ie.value,
        min: re.value
      }), i("drag", { deltaX: de.x, deltaY: de.y });
    });
    function Xe() {
      if (rt.cancel(), E.value !== m.value && !Se) {
        const k = (A) => {
          A.preventDefault(), window.removeEventListener("click", k);
        };
        window.addEventListener("click", k);
      }
      Re(E.value), de.x = 0, de.y = 0, nt.value = !1;
      const r = Se ? "touchmove" : "mousemove", g = Se ? "touchend" : "mouseup";
      document.removeEventListener(r, rt), document.removeEventListener(g, Xe);
    }
    function St() {
      !u.autoplay || u.autoplay <= 0 || (Q = setInterval(() => {
        u.pauseAutoplayOnHover && Oe.value || Ce();
      }, u.autoplay));
    }
    function ut() {
      Q && (clearInterval(Q), Q = null);
    }
    function Ye() {
      ut(), St();
    }
    const H = I(!1);
    function Re(r, g = !1) {
      if (!g && H.value)
        return;
      let k = r, A = r;
      V.value = m.value, u.wrapAround ? A = ua({
        val: k,
        max: ie.value,
        min: re.value
      }) : k = De({
        val: k,
        max: ie.value,
        min: re.value
      }), i("slide-start", {
        slidingToIndex: r,
        currentSlideIndex: m.value,
        prevSlideIndex: V.value,
        slidesCount: h.value
      }), ut(), H.value = !0, m.value = k, A !== k && Ct.pause(), i("update:modelValue", A), c = setTimeout(() => {
        u.wrapAround && A !== k && (Ct.resume(), m.value = A, i("loop", {
          currentSlideIndex: m.value,
          slidingToIndex: r
        })), i("slide-end", {
          currentSlideIndex: m.value,
          prevSlideIndex: V.value,
          slidesCount: h.value
        }), H.value = !1, Ye();
      }, u.transition);
    }
    function Ce(r = !1) {
      Re(m.value + u.itemsToScroll, r);
    }
    function Ke(r = !1) {
      Re(m.value - u.itemsToScroll, r);
    }
    function We() {
      Ne(), me(), se(), Ye();
    }
    U(() => [p.value, t.breakpoints], () => Ne(), { deep: !0 }), U(() => t.autoplay, () => Ye());
    const Ct = U(() => t.modelValue, (r) => {
      r !== m.value && Re(Number(r), !0);
    });
    i("before-init");
    const Y = s(() => {
      if (!u.wrapAround)
        return { before: 0, after: 0 };
      if (ne.value)
        return { before: b.length, after: b.length };
      const r = Number(u.itemsToShow), g = Math.ceil(r + (u.itemsToScroll - 1)), k = g - E.value, A = g - (h.value - (E.value + 1));
      return {
        before: Math.max(0, k),
        after: Math.max(0, A)
      };
    }), st = s(() => Y.value.before ? ne.value ? Z.value.slice(-1 * Y.value.before).reduce((r, g) => r + g[x.value] + u.gap, 0) * -1 : Y.value.before * ue.value * -1 : 0), dt = s(() => {
      var r;
      if (ne.value) {
        const g = (m.value % b.length + b.length) % b.length;
        return Ut({
          slideSize: (r = Z.value[g]) === null || r === void 0 ? void 0 : r[x.value],
          viewportSize: Me.value[x.value],
          align: u.snapAlign
        });
      }
      return Ut({
        align: u.snapAlign,
        itemsToShow: +u.itemsToShow
      });
    }), _e = s(() => {
      let r = 0;
      if (ne.value) {
        if (m.value < 0 ? r = Z.value.slice(m.value).reduce((g, k) => g + k[x.value] + u.gap, 0) * -1 : r = Z.value.slice(0, m.value).reduce((g, k) => g + k[x.value] + u.gap, 0), r -= dt.value, !u.wrapAround) {
          const g = Z.value.reduce((k, A) => k + A[x.value] + u.gap, 0) - Me.value[x.value] - u.gap;
          r = De({
            val: r,
            max: g,
            min: 0
          });
        }
      } else {
        let g = m.value - dt.value;
        u.wrapAround || (g = De({
          val: g,
          max: h.value - +u.itemsToShow,
          min: 0
        })), r = g * ue.value;
      }
      return r * (le.value ? 1 : -1);
    }), Vt = s(() => {
      var r, g;
      if (!ne.value) {
        const L = m.value - dt.value;
        return u.wrapAround ? {
          min: Math.floor(L),
          max: Math.ceil(L + Number(u.itemsToShow) - 1)
        } : {
          min: Math.floor(De({
            val: L,
            max: h.value - Number(u.itemsToShow),
            min: 0
          })),
          max: Math.ceil(De({
            val: L + Number(u.itemsToShow) - 1,
            max: h.value - 1,
            min: 0
          }))
        };
      }
      let k = 0;
      {
        let L = 0, j = 0 - Y.value.before;
        const te = Math.abs(_e.value + st.value);
        for (; L <= te; ) {
          const K = (j % b.length + b.length) % b.length;
          L += ((r = Z.value[K]) === null || r === void 0 ? void 0 : r[x.value]) + u.gap, j++;
        }
        k = j - 1;
      }
      let A = 0;
      {
        let L = k, j = 0;
        for (L < 0 ? j = Z.value.slice(0, L).reduce((te, K) => te + K[x.value] + u.gap, 0) - Math.abs(_e.value + st.value) : j = Z.value.slice(0, L).reduce((te, K) => te + K[x.value] + u.gap, 0) - Math.abs(_e.value); j < Me.value[x.value]; ) {
          const te = (L % b.length + b.length) % b.length;
          j += ((g = Z.value[te]) === null || g === void 0 ? void 0 : g[x.value]) + u.gap, L++;
        }
        A = L - 1;
      }
      return {
        min: Math.floor(k),
        max: Math.ceil(A)
      };
    }), Rt = s(() => {
      if (u.slideEffect === "fade")
        return;
      const r = $.value ? "Y" : "X", g = $.value ? de.y : de.x;
      let k = _e.value + g;
      if (!u.wrapAround && u.preventExcessiveDragging) {
        let A = 0;
        ne.value ? A = Z.value.reduce((te, K) => te + K[x.value], 0) : A = (h.value - Number(u.itemsToShow)) * ue.value;
        const L = le.value ? 0 : -1 * A, j = le.value ? A : 0;
        k = De({
          val: k,
          min: L,
          max: j
        });
      }
      return `translate${r}(${k}px)`;
    }), Lt = s(() => ({
      "--vc-transition-duration": H.value ? Tt(u.transition, "ms") : void 0,
      "--vc-slide-gap": Tt(u.gap),
      "--vc-carousel-height": Tt(u.height),
      "--vc-cloned-offset": Tt(st.value)
    })), Je = { slideTo: Re, next: Ce, prev: Ke }, ct = Mt({
      activeSlide: E,
      config: u,
      currentSlide: m,
      isSliding: H,
      isVertical: $,
      maxSlide: ie,
      minSlide: re,
      nav: Je,
      normalizedDir: F,
      slideRegistry: a,
      slideSize: C,
      slides: b,
      slidesCount: h,
      viewport: d,
      visibleRange: Vt
    });
    Zt(qe, ct);
    const Le = Mt({
      config: u,
      currentSlide: m,
      maxSlide: ie,
      middleSlide: J,
      minSlide: re,
      slideSize: C,
      slidesCount: h
    });
    return n({
      data: Le,
      nav: Je,
      next: Ce,
      prev: Ke,
      restartCarousel: We,
      slideTo: Re,
      updateBreakpointsConfig: Ne,
      updateSlideSize: se,
      updateSlidesData: me
    }), () => {
      var r;
      const g = o.default || o.slides, k = (g == null ? void 0 : g(Le)) || [], { before: A, after: L } = Y.value, j = Xt({
        slides: b,
        position: "before",
        toShow: A
      }), te = Xt({
        slides: b,
        position: "after",
        toShow: L
      }), K = [...j, ...k, ...te];
      if (!u.enabled || !K.length)
        return G("section", {
          ref: B,
          class: ["carousel", "is-disabled"]
        }, K);
      const Qe = ((r = o.addons) === null || r === void 0 ? void 0 : r.call(o, Le)) || [], vt = G("ol", {
        class: "carousel__track",
        style: { transform: Rt.value },
        onMousedownCapture: u.mouseDrag ? ee : null,
        onTouchstartPassiveCapture: u.touchDrag ? ee : null
      }, K), $e = G("div", { class: "carousel__viewport", ref: d }, vt);
      return G("section", {
        ref: B,
        class: [
          "carousel",
          `is-${F.value}`,
          `is-effect-${u.slideEffect}`,
          {
            "is-vertical": $.value,
            "is-sliding": H.value,
            "is-dragging": nt.value,
            "is-hover": Oe.value
          }
        ],
        dir: F.value,
        style: Lt.value,
        "aria-label": u.i18n.ariaGallery,
        tabindex: "0",
        onFocus: be,
        onBlur: Ve,
        onMouseenter: Et,
        onMouseleave: ot
      }, [$e, Qe, G(Ha)]);
    };
  }
});
var Ft;
(function(t) {
  t.arrowDown = "arrowDown", t.arrowLeft = "arrowLeft", t.arrowRight = "arrowRight", t.arrowUp = "arrowUp";
})(Ft || (Ft = {}));
const Kt = (t) => `icon${t.charAt(0).toUpperCase() + t.slice(1)}`, Xa = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function Ya(t) {
  return t in Ft;
}
const Wt = (t) => t && Ya(t), Jt = pe({
  props: {
    name: {
      type: String,
      required: !0,
      validator: Wt
    },
    title: {
      type: String,
      default: (t) => t.name ? z.i18n[Kt(t.name)] : ""
    }
  },
  setup(t) {
    const o = yt(qe, null);
    return () => {
      const i = t.name;
      if (!i || !Wt(i))
        return;
      const n = Xa[i], l = G("path", { d: n }), a = (o == null ? void 0 : o.config.i18n[Kt(i)]) || t.title, b = G("title", a);
      return G("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": a
      }, [b, l]);
    };
  }
}), Ka = pe({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(t, { slots: o, attrs: i }) {
    const n = yt(qe);
    if (!n)
      return () => "";
    const { next: l, prev: a } = o, b = () => ({
      btt: "arrowDown",
      ltr: "arrowLeft",
      rtl: "arrowRight",
      ttb: "arrowUp"
    })[n.normalizedDir], h = () => ({
      btt: "arrowUp",
      ltr: "arrowRight",
      rtl: "arrowLeft",
      ttb: "arrowDown"
    })[n.normalizedDir], B = s(() => !n.config.wrapAround && n.currentSlide <= n.minSlide), d = s(() => !n.config.wrapAround && n.currentSlide >= n.maxSlide);
    return () => {
      const { i18n: C } = n.config, p = G("button", Object.assign(Object.assign({ type: "button", disabled: B.value, "aria-label": C.ariaPreviousSlide, title: C.ariaPreviousSlide, onClick: n.nav.prev }, i), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": B.value },
        i.class
      ] }), (a == null ? void 0 : a()) || G(Jt, { name: b() })), u = G("button", Object.assign(Object.assign({ type: "button", disabled: d.value, "aria-label": C.ariaNextSlide, title: C.ariaNextSlide, onClick: n.nav.next }, i), { class: [
        "carousel__next",
        { "carousel__next--disabled": d.value },
        i.class
      ] }), (l == null ? void 0 : l()) || G(Jt, { name: h() }));
      return [p, u];
    };
  }
}), Wa = pe({
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
    const o = yt(qe);
    if (!o)
      return () => "";
    const i = s(() => o.config.itemsToShow), n = s(() => Ut({
      align: o.config.snapAlign,
      itemsToShow: i.value
    })), l = s(() => t.paginateByItemsToShow && i.value > 1), a = s(() => Math.ceil((o.activeSlide - n.value) / i.value)), b = s(() => Math.ceil(o.slidesCount / i.value)), h = (B) => ua(l.value ? {
      val: a.value,
      max: b.value - 1,
      min: 0
    } : {
      val: o.activeSlide,
      max: o.maxSlide,
      min: o.minSlide
    }) === B;
    return () => {
      var B, d;
      const C = [];
      for (let p = l.value ? 0 : o.minSlide; p <= (l.value ? b.value - 1 : o.maxSlide); p++) {
        const u = ra(o.config.i18n[l.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: p + 1
        }), m = h(p), E = G("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": m
          },
          "aria-label": u,
          "aria-pressed": m,
          "aria-controls": (d = (B = o.slides[p]) === null || B === void 0 ? void 0 : B.exposed) === null || d === void 0 ? void 0 : d.id,
          title: u,
          disabled: t.disableOnClick,
          onClick: () => o.nav.slideTo(l.value ? Math.floor(p * +o.config.itemsToShow + n.value) : p)
        }), V = G("li", { class: "carousel__pagination-item", key: p }, E);
        C.push(V);
      }
      return G("ol", { class: "carousel__pagination" }, C);
    };
  }
}), Qt = pe({
  name: "CarouselSlide",
  props: {
    id: {
      type: String,
      default: (t) => t.isClone ? void 0 : ya()
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
    const l = yt(qe);
    if (Zt(qe, void 0), !l)
      return () => "";
    const a = I(t.index), b = (E) => {
      a.value = E;
    }, h = ha(), B = () => {
      const E = h.vnode.el;
      return E ? E.getBoundingClientRect() : { width: 0, height: 0 };
    };
    n({
      id: t.id,
      setIndex: b,
      getBoundingRect: B
    });
    const d = s(() => a.value === l.activeSlide), C = s(() => a.value === l.activeSlide - 1), p = s(() => a.value === l.activeSlide + 1), u = s(() => a.value >= l.visibleRange.min && a.value <= l.visibleRange.max), m = s(() => {
      if (l.config.itemsToShow === "auto")
        return;
      const E = l.config.itemsToShow, V = l.config.gap > 0 && E > 1 ? `calc(${100 / E}% - ${l.config.gap * (E - 1) / E}px)` : `${100 / E}%`;
      return l.isVertical ? { height: V } : { width: V };
    });
    return l.slideRegistry.registerSlide(h, t.index), ka(() => {
      l.slideRegistry.unregisterSlide(h);
    }), t.isClone && (zt(() => {
      Yt(h.vnode);
    }), Sa(() => {
      Yt(h.vnode);
    })), () => {
      var E, V;
      return l.config.enabled ? G("li", {
        style: [o.style, Object.assign({}, m.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": t.isClone,
          "carousel__slide--visible": u.value,
          "carousel__slide--active": d.value,
          "carousel__slide--prev": C.value,
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
        isPrev: C.value,
        isNext: p.value,
        isSliding: l.isSliding,
        isVisible: u.value
      })) : (E = i.default) === null || E === void 0 ? void 0 : E.call(i);
    };
  }
}), Ja = (t, o, i, n) => {
  if (!i) return 0;
  let l = String(t[i.key]).toLowerCase(), a = String(o[i.key]).toLowerCase();
  if (n === He.Asc) {
    if (l > a) return 1;
    if (a > l) return -1;
  } else {
    if (l > a) return -1;
    if (a > l) return 1;
  }
  return 0;
}, gt = (t, o, i, n = []) => {
  if (t.extractTitleFromColumn) {
    let l = n.find((a) => a.key === t.extractTitleFromColumn);
    if (l)
      return gt(l, o, i, n);
  }
  if (t.formatter && typeof t.formatter == "function") {
    let l = t.formatter(o[t.key], o, t, i);
    return l.startsWith("__:") ? Ba(l.substring(3)) : l;
  }
  return o[t.key];
}, Qa = (t, o, i) => {
  if (!t.colspan) return -1;
  let n = o;
  return i.forEach((l) => {
    let a = xt(t, l);
    a > 0 && a < n && (n = a);
  }), n;
}, xt = (t, o) => t.colspan === !1 ? !1 : typeof t.colspan == "function" ? t.colspan(o) : t.colspan, Za = (t, o) => typeof t.preferSlot > "u" ? !0 : t.preferSlot === !1 ? !1 : typeof t.preferSlot == "function" ? t.preferSlot(o) : !0, el = (t, o, i) => {
  if (typeof t != "object" || !t.key || o.indexOf(t.key) > -1) return !1;
  let n = xt(t, i);
  return typeof t.colspan > "u" ? !0 : (typeof t.colspan < "u" && (typeof t.colspan == "function" ? n = parseInt(t.colspan(i)) : n = parseInt(t.colspan)), n > 0);
}, tl = (t = []) => {
  if (t.length > 0) {
    for (let o = 0; o < t.length; ++o)
      if (t[o].sortable) return t[o].key;
  }
  return "";
}, al = (t, o) => {
  if (t.length > 0) {
    for (let i = 0; i < t.length; ++i)
      if (t[i].key === o) return t[i];
  }
  return null;
}, sa = (t) => {
  let o = [];
  return t.class && o.push(t.class), t.type && o.push(`is-${t.type}`), o.join(" ");
}, jt = /* @__PURE__ */ pe({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new ta() },
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
    const i = o, n = t, l = I(n.modelValue), a = I(l.value[n.column.key]), b = I(null);
    U(a, (p) => {
      const u = JSON.parse(JSON.stringify(l.value));
      u[n.column.key] = p, i("update:modelValue", u);
    }), U(() => n.modelValue, (p) => {
      l.value = p, a.value = l.value[n.column.key];
    });
    const h = s(() => ({ ...n.column.slotData, item: l.value })), B = s(() => {
      var p, u, m, E;
      if ((p = n.column.field) != null && p.modalData && typeof ((u = n.column.field) == null ? void 0 : u.modalData) == "object")
        for (let V in n.column.field.modalData)
          if (typeof ((m = n.column.field) == null ? void 0 : m.modalData[V]) == "string" && n.column.field.modalData[V].startsWith("prop:")) {
            let J = n.column.field.modalData[V].substring(5);
            l.value[J];
          } else
            n.column.field.modalData[V];
      return (E = n.column.field) == null ? void 0 : E.modalData;
    }), d = s(() => typeof n.column.field == "string" && n.column.field.startsWith("prop:") ? Ta(n.column.field, l.value) : n.column.field), C = s(() => {
      var p, u, m, E;
      return n.column.type === mt.Field ? !((u = (p = n.column) == null ? void 0 : p.field) != null && u.label) && (n.column.ensureFieldLabel || [
        Gt.Switch,
        Gt.Check
      ].includes((m = n.column.field) == null ? void 0 : m.type)) ? n.column.label : (E = n.column.field) == null ? void 0 : E.label : "";
    });
    return (p, u) => {
      const m = Te("lkt-anchor"), E = Te("lkt-button"), V = Te("lkt-field");
      return p.column.type === S(mt).Anchor ? (v(), O(m, oe({ key: 0 }, p.column.anchor, { prop: l.value }), {
        default: P(() => [
          tt(at(S(gt)(p.column, l.value, p.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : p.column.type === S(mt).Button ? (v(), O(E, oe({ key: 1 }, p.column.button, { prop: l.value }), {
        default: P(() => [
          tt(at(S(gt)(p.column, l.value, p.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : p.column.type === S(mt).Field && p.hasInlineEditPerm ? (v(), O(V, oe({ key: 2 }, d.value, {
        "read-mode": !p.column.editable || !p.editModeEnabled,
        ref: (J) => b.value = J,
        "slot-data": h.value,
        label: C.value,
        "modal-data": B.value,
        prop: l.value,
        modelValue: a.value,
        "onUpdate:modelValue": u[0] || (u[0] = (J) => a.value = J)
      }), null, 16, ["read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : p.column.type === S(mt).Field ? (v(), O(V, oe({ key: 3 }, d.value, {
        "read-mode": "",
        ref: (J) => b.value = J,
        "slot-data": h.value,
        label: C.value,
        "modal-data": B.value,
        prop: l.value,
        "model-value": a.value
      }), null, 16, ["slot-data", "label", "modal-data", "prop", "model-value"])) : (v(), D(q, { key: 4 }, [
        tt(at(S(gt)(p.column, l.value, p.i, p.columns)), 1)
      ], 64));
    };
  }
}), bt = class bt {
};
bt.navButtonSlot = "", bt.createButtonSlot = "", bt.defaultEmptySlot = void 0;
let fe = bt;
const ll = ["data-i", "data-draggable"], nl = ["data-role", "data-i"], ol = {
  key: 1,
  class: "lkt-table-nav-cell"
}, il = { class: "lkt-table-nav-container" }, rl = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, ul = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, sl = ["colspan"], dl = ["colspan"], cl = ["data-column", "colspan", "title"], vl = /* @__PURE__ */ pe({
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
    rowDisplayType: { type: [Number, Function], default: et.Auto },
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
    const i = ea(), n = o, l = t, a = I(l.modelValue);
    let b = typeof l.rowDisplayType == "function" ? l.rowDisplayType(a.value, l.i) : l.rowDisplayType;
    b || (b = et.Auto);
    const h = [et.Auto, et.PreferCustomItem].includes(b), B = [et.Auto, et.PreferItem].includes(b), d = (c) => n("click", c), C = s(() => {
      let c = [], T = !1;
      return typeof l.disabledDrag == "function" ? T = l.disabledDrag(a.value) : T = ie.value === !0, !T && l.sortable && l.isDraggable ? c.push("handle") : T && c.push("disabled"), c.join(" ");
    }), p = s(() => fe.navButtonSlot !== ""), u = s(() => fe.navButtonSlot), m = () => {
      n("item-up", l.i);
    }, E = () => {
      n("item-down", l.i);
    }, V = () => {
      n("item-drop", l.i);
    };
    U(() => l.modelValue, (c) => a.value = c), U(a, (c) => {
      n("update:modelValue", c);
    }, { deep: !0 });
    const J = s(() => typeof l.renderDrag == "function" ? l.renderDrag(a.value) : l.renderDrag === !0), ie = s(() => typeof l.disabledDrag == "function" ? l.disabledDrag(a.value) : l.disabledDrag === !0), re = s(() => C.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), Q = s(() => {
      let c = [];
      return h && c.push("type-custom-item"), B && c.push("type-item"), typeof l.itemContainerClass == "function" ? c.push(l.itemContainerClass(a.value, l.i)) : l.itemContainerClass !== "" && c.push(l.itemContainerClass), c.join(" ");
    });
    return (c, T) => {
      const ue = Te("lkt-button");
      return v(), D("tr", {
        "data-i": c.i,
        "data-draggable": c.isDraggable,
        class: W(Q.value)
      }, [
        c.sortable && c.editModeEnabled && J.value ? (v(), D("td", {
          key: 0,
          "data-role": re.value,
          class: W(C.value),
          "data-i": c.i
        }, T[2] || (T[2] = [
          ve("i", { class: "lkt-icn-drag-indicator" }, null, -1)
        ]), 10, nl)) : R("", !0),
        c.addNavigation && c.editModeEnabled ? (v(), D("td", ol, [
          ve("div", il, [
            he(ue, {
              palette: "table-nav",
              disabled: c.i === 0,
              onClick: m
            }, {
              default: P(() => [
                p.value ? (v(), O(xe(u.value), {
                  key: 0,
                  direction: "up"
                })) : (v(), D("i", rl))
              ]),
              _: 1
            }, 8, ["disabled"]),
            he(ue, {
              palette: "table-nav",
              disabled: c.latestRow,
              onClick: E
            }, {
              default: P(() => [
                p.value ? (v(), O(xe(u.value), {
                  key: 0,
                  direction: "down"
                })) : (v(), D("i", ul))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : R("", !0),
        S(h) && S(i)[`item-${c.i}`] ? (v(), D("td", {
          key: "td" + c.i,
          colspan: c.visibleColumns.length
        }, [
          _(c.$slots, `item-${c.i}`, {
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
        ], 8, sl)) : S(B) && S(i).item ? (v(), D("td", {
          key: "td" + c.i,
          colspan: c.visibleColumns.length
        }, [
          _(c.$slots, "item", {
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
        ], 8, dl)) : (v(!0), D(q, { key: 4 }, ye(c.visibleColumns, (F) => (v(), D(q, null, [
          S(el)(F, c.emptyColumns, a.value) ? (v(), D("td", {
            key: "td" + c.i,
            "data-column": F.key,
            colspan: S(xt)(F, a.value),
            title: S(gt)(F, a.value, c.i, c.visibleColumns),
            class: W(S(sa)(F)),
            onClick: T[1] || (T[1] = (le) => d(le))
          }, [
            c.$slots[F.key] && S(Za)(F, a.value) ? _(c.$slots, F.key, {
              key: 0,
              value: a.value[F.key],
              item: a.value,
              column: F,
              i: c.i
            }) : a.value ? (v(), O(jt, {
              key: 1,
              modelValue: a.value,
              "onUpdate:modelValue": T[0] || (T[0] = (le) => a.value = le),
              column: F,
              columns: c.visibleColumns,
              "edit-mode-enabled": c.editModeEnabled,
              "has-inline-edit-perm": c.hasInlineEditPerm,
              i: c.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : R("", !0)
          ], 10, cl)) : R("", !0)
        ], 64))), 256))
      ], 10, ll);
    };
  }
}), $t = /* @__PURE__ */ pe({
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
    const i = o, n = t, l = s(() => fe.createButtonSlot !== ""), a = s(() => fe.createButtonSlot), b = {
      ...(d = n.config) == null ? void 0 : d.modalData,
      beforeClose: (C) => {
        "itemCreated" in C && C.itemCreated === !0 && i("append", C.item);
      }
    }, h = {
      ...n.config
    };
    h.modalData = b;
    const B = () => {
      var C;
      if (!((C = n.config) != null && C.modal)) {
        i("click");
        return;
      }
    };
    return (C, p) => {
      const u = Te("lkt-button");
      return v(), O(u, oe(h, {
        disabled: C.disabled,
        onClick: B
      }), {
        default: P(() => [
          l.value ? (v(), O(xe(a.value), { key: 0 })) : R("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), fl = ["data-column", "data-sortable", "data-sort", "colspan", "title"], pl = /* @__PURE__ */ pe({
  __name: "TableHeader",
  props: {
    column: { default: () => new ta() },
    sortBy: { default: "" },
    sortDirection: { default: "" },
    amountOfColumns: { default: 0 },
    items: { default: () => [] }
  },
  emits: [
    "click"
  ],
  setup(t, { emit: o }) {
    const i = o, n = t, l = s(() => Qa(n.column, n.amountOfColumns, n.items)), a = s(() => n.column.sortable === !0), b = s(() => a.value && n.sortBy === n.column.key ? n.sortDirection : ""), h = s(() => aa(n.column.label)), B = s(() => a.value && n.sortBy === n.column.key ? n.sortDirection === He.Asc ? Be.defaultTableSortAscIcon : n.sortDirection === He.Desc ? Be.defaultTableSortDescIcon : "" : ""), d = () => i("click", n.column);
    return (C, p) => (v(), D("th", {
      "data-column": C.column.key,
      "data-sortable": a.value,
      "data-sort": b.value,
      colspan: l.value,
      title: h.value,
      class: W(S(sa)(C.column)),
      onClick: d
    }, [
      ve("div", null, [
        tt(at(h.value) + " ", 1),
        B.value ? (v(), D("i", {
          key: 0,
          class: W(B.value)
        }, null, 2)) : R("", !0)
      ])
    ], 10, fl));
  }
}), ml = ["id"], gl = { class: "lkt-table-page-buttons" }, bl = { class: "switch-edition-mode" }, yl = { class: "switch-edition-mode" }, hl = {
  key: 0,
  class: "lkt-table-page-buttons"
}, kl = {
  key: 1,
  class: "lkt-table-page-filters"
}, Sl = { class: "lkt-table" }, Cl = { key: 0 }, wl = { key: 0 }, Dl = {
  key: 0,
  "data-role": "drag-indicator"
}, Bl = { key: 1 }, Tl = ["id"], Il = ["id"], Al = ["data-i"], El = ["id"], Vl = ["data-i"], Rl = ["id"], Ll = { class: "lkt-carousel-slide" }, Nl = { class: "lkt-carousel-slide" }, Ml = {
  key: 2,
  class: "lkt-table-empty"
}, Ol = {
  key: 4,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, _l = /* @__PURE__ */ pe({
  __name: "LktTable",
  props: /* @__PURE__ */ wa({
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
  }, Ia(Aa)),
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
    var Ht, qt;
    const n = i, l = ea(), a = t, b = I(typeof a.sorter == "function" ? a.sorter : Ja), h = I(tl(a.columns)), B = I(He.Asc), d = I(a.modelValue), C = I(null), p = I(a.columns), u = I((Ht = a.paginator) == null ? void 0 : Ht.modelValue), m = I(a.loading), E = I(!1), V = I(a.perms), J = I(null), ie = I(null), re = I(null), Q = I({}), c = I(new Ra({ items: d.value }, a.dataStateConfig)), T = I(a.editMode), ue = I(0), F = I(null), le = I(((qt = a.carousel) == null ? void 0 : qt.currentSlide) || 0), $ = I(je(a.saveButton, Be.defaultSaveButton)), ne = I(je(a.createButton, Be.defaultCreateButton)), x = I(je(a.editModeButton, Be.defaultEditModeButton)), Ne = I(je(a.groupButton, Be.defaultGroupButton));
    U(() => a.saveButton, (e) => $.value = je(a.saveButton, Be.defaultSaveButton)), U(() => a.createButton, (e) => ne.value = je(a.createButton, Be.defaultCreateButton)), U(() => a.editModeButton, (e) => x.value = je(a.editModeButton, Be.defaultEditModeButton));
    const Ie = I(!1);
    U(m, (e) => n("update:loading", e)), U(u, (e) => n("page", e));
    const Ge = (e) => {
      V.value = e;
    }, Z = (e) => {
      var f;
      Array.isArray(e.data) && ((!a.paginator || ![Bt.LoadMore, Bt.Infinite].includes((f = a.paginator) == null ? void 0 : f.type)) && d.value.splice(0, d.value.length), d.value = [...d.value, ...e.data]), m.value = !1, E.value = !0, c.value.store({ items: d.value }).turnStoredIntoOriginal(), Ie.value = !1, Dt(() => {
        Y(), ge.value, n("read-response", e);
      });
    }, At = () => Dt(() => m.value = !0), Me = () => {
      J.value.doRefresh();
    }, ke = Ea(12), se = s(() => {
      if (!a.hideEmptyColumns) return [];
      let e = [];
      return p.value.forEach((f) => {
        let M = f.key, X = !1;
        d.value.forEach((ae) => {
          if (typeof ae.checkEmpty == "function")
            return ae.checkEmpty(ae);
          ae[M] && (X = !0);
        }), X || e.push(M);
      }), e;
    }), me = s(() => p.value.filter((e) => !e.hidden)), lt = s(() => p.value.filter((e) => e.isForRowKey)), Ae = s(() => p.value.map((e) => e.key)), ht = s(() => {
      let e = [];
      for (let f in l) Ae.value.indexOf(f) !== -1 && e.push(f);
      return e;
    }), kt = s(() => {
      let e = [];
      for (let f in l) f.indexOf("slide-") !== -1 && e.push(f);
      return e;
    }), Ee = s(() => {
      var e;
      return a.hiddenSave || m.value || !((e = $.value) != null && e.resource || $.value.type) ? !1 : T.value && Ie.value ? !0 : T.value;
    }), Se = s(() => $e.value && d.value.length >= a.requiredItemsForTopCreate || Ce.value ? !0 : Ee.value || T.value && be.value), ge = s(() => {
      var e, f;
      return ue.value, typeof ((e = $.value) == null ? void 0 : e.disabled) == "function" ? $.value.disabled({
        value: d.value,
        dataState: c.value
      }) : typeof ((f = $.value) == null ? void 0 : f.disabled) == "boolean" ? $.value.disabled : !Ie.value;
    }), de = s(() => d.value.length), Oe = s(() => {
      var e;
      return {
        items: d.value,
        ...(e = $.value) == null ? void 0 : e.resourceData
      };
    }), nt = s(() => a.titleTag === "" ? "h2" : a.titleTag), Et = s(() => a.wrapContentTag === "" ? "div" : a.wrapContentTag), ot = s(() => aa(a.title)), it = s(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }), be = s(() => V.value.includes(we.Create)), Ve = s(() => V.value.includes("read")), ee = s(() => V.value.includes(we.Update)), rt = s(() => V.value.includes(we.Edit)), Xe = s(() => V.value.includes(we.InlineEdit)), St = s(() => V.value.includes(we.ModalCreate)), ut = s(() => V.value.includes(we.InlineCreate)), Ye = s(() => V.value.includes(we.InlineCreateEver)), H = s(() => V.value.includes(we.Drop)), Re = s(() => V.value.includes(we.SwitchEditMode)), Ce = s(() => !Re.value || !ee.value && !H.value || !ee.value && H.value ? !1 : !m.value), Ke = s(() => {
      var e;
      return (typeof ((e = a.paginator) == null ? void 0 : e.type) < "u" && [Bt.LoadMore, Bt.Infinite].includes(a.paginator.type) || !m.value) && d.value.length > 0;
    }), We = s(() => p.value.find((e) => e.isForAccordionHeader)), Ct = (e) => {
      let f = e.target;
      if (typeof f.dataset.column > "u")
        do
          f = f.parentNode;
        while (typeof f.dataset.column > "u" && f.tagName !== "TABLE" && f.tagName !== "body");
      if (f.tagName === "TD" && (f = f.parentNode, f = f.dataset.i, typeof f < "u"))
        return d.value[f];
    }, Y = () => {
      ue.value = Na();
    }, st = (e) => d.value[e], dt = (e) => {
      var f;
      return (f = C.value) == null ? void 0 : f.querySelector(`[data-i="${e}"]`);
    }, _e = (e) => {
      e && e.sortable && (d.value = d.value.sort((f, M) => b.value(f, M, e, B.value)), B.value = B.value === He.Asc ? He.Desc : He.Asc, h.value = e.key, Y(), n("sort", [h.value, B.value]));
    }, Vt = (e) => {
      n("click", e);
    }, Rt = (e) => {
      var M, X, ae, ce, pt, w, y, N;
      let f = parseInt((ce = (ae = (X = (M = e == null ? void 0 : e.originalEvent) == null ? void 0 : M.toElement) == null ? void 0 : X.closest("tr")) == null ? void 0 : ae.dataset) == null ? void 0 : ce.i);
      return !(typeof ((pt = a.drag) == null ? void 0 : pt.isValid) == "function" && !((w = a.drag) != null && w.isValid(d.value[f])) || typeof ((y = a.drag) == null ? void 0 : y.isValid) == "boolean" && !((N = a.drag) != null && N.isValid));
    }, Lt = (e) => {
      var f, M;
      return typeof ((f = a.drag) == null ? void 0 : f.isDraggable) == "function" ? (M = a.drag) == null ? void 0 : M.isDraggable(e) : !0;
    }, Je = () => {
      if (be.value) {
        n("click-create");
        return;
      }
      if (ut.value || Ye.value) {
        if (typeof a.newValueGenerator == "function") {
          let e = a.newValueGenerator();
          if (typeof e == "object" || a.type !== ze.Table) {
            d.value.push(e);
            return;
          }
        }
        d.value.push({});
      } else
        n("click-create");
    }, ct = (e) => {
      d.value.push(e);
    }, Le = () => m.value = !0, r = () => m.value = !1, g = (e, f) => {
      var M, X, ae;
      if (!((M = $.value) != null && M.type && [
        Ot.Split,
        Ot.SplitEver,
        Ot.SplitLazy
      ].includes((X = $.value) == null ? void 0 : X.type))) {
        if (n("before-save"), (ae = $.value) != null && ae.resource && (m.value = !1, !f.success)) {
          n("error", f.httpStatus);
          return;
        }
        c.value.turnStoredIntoOriginal(), Ie.value = !1, n("save", f);
      }
    }, k = (e, f, M) => {
      if (M >= e.length) {
        let X = M - e.length + 1;
        for (; X--; ) e.push(void 0);
      }
      return e.splice(M, 0, e.splice(f, 1)[0]), e;
    }, A = (e) => {
      k(d.value, e, e - 1), Y();
    }, L = (e) => {
      k(d.value, e, e + 1), Y();
    }, j = (e) => {
      d.value.splice(e, 1), Y();
    }, te = () => {
      var e;
      Q.value && typeof ((e = Q.value) == null ? void 0 : e.destroy) == "function" && (Q.value.destroy(), Q.value = {});
    }, K = () => {
      F.value || (F.value = document.getElementById("lkt-table-body-" + ke)), Q.value = new La(F.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let f = e.oldIndex, M = e.newIndex;
          d.value.splice(M, 0, d.value.splice(f, 1)[0]), Y(), n("drag-end", d.value[M]);
        },
        onMove: function(e, f) {
          return Rt(e);
        }
      });
    }, Qe = (e, f, M = !1) => {
      let X = [ue.value, ke, "row", f];
      return M && X.push("hidden"), lt.value.forEach((ae) => {
        let ce = String(e[ae.key]).toLowerCase();
        ce.length > 50 && (ce = ce.substring(0, 50)), ce = Va(ce, " ", "-"), X.push(ce);
      }), X.join("-");
    }, vt = s(() => typeof a.createEnabledValidator == "function" ? a.createEnabledValidator({ items: d.value }) : !0), $e = s(() => Ye.value || be.value && T.value || ut.value && T.value || St.value && T.value), da = s(() => [ze.Ol, ze.Ul].includes(a.type)), ft = (e, f) => typeof a.itemDisplayChecker == "function" ? a.itemDisplayChecker(e) : !0, wt = (e, f) => typeof a.itemContainerClass == "function" ? a.itemContainerClass(e, f) : a.itemContainerClass, ca = (e, f) => We.value ? e[We.value.key] : "";
    zt(() => {
      var e;
      a.initialSorting && _e(al(a.columns, h.value)), c.value.store({ items: d.value }).turnStoredIntoOriginal(), Ie.value = !1, (e = a.drag) != null && e.enabled && Dt(() => {
        K();
      });
    }), U(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }, (e) => {
      e ? K() : te();
    }), U(() => a.type, (e) => {
      var f;
      (f = a.drag) != null && f.enabled ? K() : te();
    }), U(() => a.perms, (e) => V.value = e), U(V, (e) => n("update:perms", e)), U(T, (e) => {
      n("update:editMode", e);
    }), U(() => a.editMode, (e) => T.value = e), U(() => a.columns, (e) => p.value = e, { deep: !0 }), U(() => a.modelValue, (e) => {
      d.value = e;
    }, { deep: !0 }), U(d, (e) => {
      c.value.increment({ items: e }), Ie.value = c.value.changed(), n("update:modelValue", e);
    }, { deep: !0 }), o({
      getItemByEvent: Ct,
      getItemByIndex: st,
      getRowByIndex: dt,
      doRefresh: Me,
      doRemoveIndex: (e) => {
        d.value.splice(e, 1), Y();
      },
      getHtml: () => ie.value,
      reRender: Y,
      turnStoredIntoOriginal: () => {
        c.value.turnStoredIntoOriginal(), Dt(() => {
          Y();
        });
      }
    });
    const va = s(() => typeof fe.defaultEmptySlot < "u"), fa = s(() => fe.defaultEmptySlot), pa = s(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled ? !1 : typeof a.drag.canRender > "u" ? !0 : a.drag.canRender), ma = s(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled || typeof a.drag.isDisabled > "u" ? !1 : a.drag.isDisabled);
    return (e, f) => {
      const M = Te("lkt-button"), X = Te("lkt-accordion"), ae = Te("lkt-loader"), ce = Te("lkt-paginator");
      return v(), D("section", {
        ref_key: "element",
        ref: ie,
        class: "lkt-table-page",
        id: "lkt-table-page-" + S(ke)
      }, [
        ot.value || S(l).title ? (v(), D("header", {
          key: 0,
          class: W(e.headerClass)
        }, [
          ot.value ? (v(), O(xe(nt.value), { key: 0 }, {
            default: P(() => [
              e.titleIcon ? (v(), D("i", {
                key: 0,
                class: W(e.titleIcon)
              }, null, 2)) : R("", !0),
              tt(" " + at(ot.value), 1)
            ]),
            _: 1
          })) : R("", !0),
          S(l).title ? _(e.$slots, "title", { key: 1 }) : R("", !0)
        ], 2)) : R("", !0),
        (v(), O(xe(Et.value), {
          class: W(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: P(() => {
            var pt;
            return [
              Pe(ve("div", gl, [
                e.groupButton !== !1 ? (v(), O(M, oe({
                  key: 0,
                  ref: "groupButton"
                }, Ne.value, { class: "lkt-item-crud-group-button" }), {
                  split: P(() => [
                    ve("div", bl, [
                      Pe(he(M, oe(x.value, {
                        checked: T.value,
                        "onUpdate:checked": f[0] || (f[0] = (w) => T.value = w)
                      }), null, 16, ["checked"]), [
                        [Ue, Ce.value]
                      ])
                    ]),
                    S(l)["prev-buttons-ever"] ? _(e.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: ee.value,
                      canDrop: H.value,
                      perms: e.perms
                    }) : R("", !0),
                    S(l)["prev-buttons"] ? _(e.$slots, "prev-buttons", {
                      key: 1,
                      canUpdate: ee.value,
                      canDrop: H.value,
                      perms: e.perms
                    }) : R("", !0),
                    Pe(he(M, oe({
                      class: "lkt-table--save-button",
                      ref_key: "saveButtonRef",
                      ref: re
                    }, {
                      ...$.value,
                      disabled: ge.value,
                      resourceData: Oe.value
                    }, {
                      onLoading: Le,
                      onLoaded: r,
                      onClick: g
                    }), {
                      split: P(({ doClose: w, doRootClick: y }) => [
                        _(e.$slots, "button-save-split", {
                          doClose: w,
                          doRootClick: y,
                          dataState: c.value,
                          onButtonLoading: Le,
                          onButtonLoaded: r
                        })
                      ]),
                      default: P(() => [
                        S(l)["button-save"] ? _(e.$slots, "button-save", {
                          key: 0,
                          items: d.value,
                          editMode: e.editMode,
                          canUpdate: !ge.value
                        }) : R("", !0)
                      ]),
                      _: 3
                    }, 16), [
                      [Ue, Ee.value]
                    ]),
                    $e.value && d.value.length >= e.requiredItemsForTopCreate ? (v(), O($t, {
                      key: 2,
                      config: ne.value,
                      disabled: !vt.value,
                      onClick: Je,
                      onAppend: ct
                    }, null, 8, ["config", "disabled"])) : R("", !0)
                  ]),
                  _: 3
                }, 16)) : R("", !0),
                S(l)["prev-buttons-ever"] ? _(e.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: ee.value,
                  canDrop: H.value,
                  perms: e.perms
                }) : R("", !0),
                S(l)["prev-buttons"] ? _(e.$slots, "prev-buttons", {
                  key: 2,
                  canUpdate: ee.value,
                  canDrop: H.value,
                  perms: e.perms
                }) : R("", !0),
                Pe(he(M, oe({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: re
                }, {
                  ...$.value,
                  disabled: ge.value,
                  resourceData: Oe.value
                }, {
                  onLoading: Le,
                  onLoaded: r,
                  onClick: g
                }), {
                  split: P(({ doClose: w, doRootClick: y }) => [
                    _(e.$slots, "button-save-split", {
                      doClose: w,
                      doRootClick: y,
                      dataState: c.value,
                      onButtonLoading: Le,
                      onButtonLoaded: r
                    })
                  ]),
                  default: P(() => [
                    S(l)["button-save"] ? _(e.$slots, "button-save", {
                      key: 0,
                      items: d.value,
                      editMode: e.editMode,
                      canUpdate: !ge.value
                    }) : R("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [Ue, Ee.value]
                ]),
                $e.value && d.value.length >= e.requiredItemsForTopCreate ? (v(), O($t, {
                  key: 3,
                  config: ne.value,
                  disabled: !vt.value,
                  onClick: Je,
                  onAppend: ct
                }, null, 8, ["config", "disabled"])) : R("", !0),
                ve("div", yl, [
                  Pe(he(M, oe(x.value, {
                    checked: T.value,
                    "onUpdate:checked": f[1] || (f[1] = (w) => T.value = w)
                  }), null, 16, ["checked"]), [
                    [Ue, Ce.value]
                  ])
                ])
              ], 512), [
                [Ue, Se.value]
              ]),
              S(l).buttons ? (v(), D("div", hl, [
                _(e.$slots, "buttons")
              ])) : R("", !0),
              E.value && S(l).filters ? (v(), D("div", kl, [
                _(e.$slots, "filters", {
                  items: d.value,
                  isLoading: m.value
                })
              ])) : R("", !0),
              Pe(ve("div", Sl, [
                e.type === S(ze).Table ? (v(), D("table", Cl, [
                  e.hideTableHeader ? R("", !0) : (v(), D("thead", wl, [
                    ve("tr", null, [
                      it.value && T.value ? (v(), D("th", Dl)) : R("", !0),
                      e.addNavigation && T.value ? (v(), D("th", Bl)) : R("", !0),
                      (v(!0), D(q, null, ye(me.value, (w) => (v(), D(q, null, [
                        se.value.indexOf(w.key) === -1 ? (v(), O(pl, {
                          key: 0,
                          column: w,
                          "sort-by": h.value,
                          "sort-direction": B.value,
                          "amount-of-columns": e.columns.length,
                          items: d.value,
                          onClick: (y) => _e(w)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : R("", !0)
                      ], 64))), 256))
                    ])
                  ])),
                  ve("tbody", {
                    ref_key: "tableBody",
                    ref: C,
                    id: "lkt-table-body-" + S(ke),
                    class: W(e.itemsContainerClass)
                  }, [
                    (v(!0), D(q, null, ye(d.value, (w, y) => Pe((v(), O(vl, {
                      modelValue: d.value[y],
                      "onUpdate:modelValue": (N) => d.value[y] = N,
                      key: Qe(w, y),
                      i: y,
                      "is-draggable": Lt(w),
                      sortable: it.value,
                      "visible-columns": me.value,
                      "empty-columns": se.value,
                      "add-navigation": e.addNavigation,
                      "latest-row": y + 1 === de.value,
                      "can-drop": H.value && T.value,
                      "can-edit": rt.value && ee.value && T.value,
                      "can-read": Ve.value,
                      "can-create": be.value,
                      "edit-mode-enabled": T.value,
                      "has-inline-edit-perm": Xe.value,
                      "row-display-type": e.rowDisplayType,
                      "render-drag": pa.value,
                      "disabled-drag": ma.value,
                      "is-loading": m.value,
                      "item-container-class": e.itemContainerClass,
                      onClick: Vt,
                      onItemUp: A,
                      onItemDown: L,
                      onItemDrop: j
                    }, Da({ _: 2 }, [
                      S(l)[`item-${y}`] ? {
                        name: `item-${y}`,
                        fn: P((N) => [
                          _(e.$slots, `item-${y}`, Fe({
                            [e.slotItemVar || ""]: N.item,
                            index: y,
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
                      } : S(l).item ? {
                        name: "item",
                        fn: P((N) => [
                          _(e.$slots, "item", Fe({
                            [e.slotItemVar || ""]: N.item,
                            index: y,
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
                      ye(ht.value, (N) => ({
                        name: N,
                        fn: P((Ze) => [
                          _(e.$slots, N, Fe({
                            [e.slotItemVar || ""]: Ze.item,
                            value: Ze.value,
                            column: Ze.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class"])), [
                      [Ue, ft(d.value[y])]
                    ])), 128))
                  ], 10, Tl)
                ])) : e.type === S(ze).Item ? (v(), D("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: C,
                  id: "lkt-table-body-" + S(ke),
                  class: W(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), D(q, null, ye(d.value, (w, y) => (v(), D(q, null, [
                    !e.skipTableItemsContainer && ft(w) ? (v(), D("div", {
                      class: W(["lkt-table-item", wt(w, y)]),
                      "data-i": y,
                      key: Qe(w, y)
                    }, [
                      _(e.$slots, "item", Fe({
                        [e.slotItemVar || ""]: w,
                        index: y,
                        editing: T.value,
                        canCreate: be.value,
                        canRead: Ve.value,
                        canUpdate: ee.value,
                        canDrop: H.value,
                        isLoading: m.value,
                        doDrop: () => j(y)
                      }))
                    ], 10, Al)) : ft(w) ? _(e.$slots, "item", Fe({
                      class: wt(w, y),
                      dataI: y,
                      key: Qe(w, y),
                      [e.slotItemVar || ""]: w,
                      index: y,
                      editing: T.value,
                      canCreate: be.value,
                      canRead: Ve.value,
                      canUpdate: ee.value,
                      canDrop: H.value,
                      isLoading: m.value,
                      doDrop: () => j(y)
                    })) : R("", !0)
                  ], 64))), 256))
                ], 10, Il)) : e.type === S(ze).Accordion ? (v(), D("div", {
                  key: 2,
                  ref_key: "tableBody",
                  ref: C,
                  id: "lkt-table-body-" + S(ke),
                  class: W(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), D(q, null, ye(d.value, (w, y) => (v(), D(q, null, [
                    ft(w) ? (v(), O(X, oe({
                      class: ["lkt-table-item", wt(w, y)],
                      "data-i": y,
                      key: Qe(w, y),
                      ref_for: !0
                    }, {
                      ...e.accordion,
                      title: ca(w)
                    }), {
                      header: P(() => [
                        he(jt, {
                          modelValue: d.value[y],
                          "onUpdate:modelValue": (N) => d.value[y] = N,
                          i: y,
                          column: We.value,
                          columns: me.value,
                          "edit-mode-enabled": T.value,
                          "has-inline-edit-perm": Xe.value
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])
                      ]),
                      default: P(() => [
                        (v(!0), D(q, null, ye(me.value, (N) => {
                          var Ze;
                          return v(), D(q, null, [
                            N.key !== ((Ze = We.value) == null ? void 0 : Ze.key) ? (v(), O(jt, {
                              key: 0,
                              modelValue: d.value[y],
                              "onUpdate:modelValue": (ga) => d.value[y] = ga,
                              i: y,
                              column: N,
                              columns: me.value,
                              "edit-mode-enabled": T.value,
                              "has-inline-edit-perm": Xe.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])) : R("", !0)
                          ], 64);
                        }), 256))
                      ]),
                      _: 2
                    }, 1040, ["class", "data-i"])) : R("", !0)
                  ], 64))), 256))
                ], 10, El)) : da.value ? (v(), O(xe(e.type), {
                  key: 3,
                  class: W(["lkt-table-items-container", e.itemsContainerClass])
                }, {
                  default: P(() => [
                    (v(!0), D(q, null, ye(d.value, (w, y) => (v(), D(q, null, [
                      ft(w) ? (v(), D("li", {
                        key: 0,
                        class: W(["lkt-table-item", wt(w, y)]),
                        "data-i": y
                      }, [
                        _(e.$slots, "item", Fe({
                          [e.slotItemVar || ""]: w,
                          index: y,
                          editing: T.value,
                          canCreate: be.value,
                          canRead: Ve.value,
                          canUpdate: ee.value,
                          canDrop: H.value,
                          isLoading: m.value,
                          doDrop: () => j(y)
                        }))
                      ], 10, Vl)) : R("", !0)
                    ], 64))), 256))
                  ]),
                  _: 3
                }, 8, ["class"])) : e.type === S(ze).Carousel ? (v(), D("div", {
                  key: 4,
                  ref_key: "tableBody",
                  ref: C,
                  id: "lkt-table-body-" + S(ke),
                  class: W(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  he(S(Ga), oe({
                    modelValue: le.value,
                    "onUpdate:modelValue": f[2] || (f[2] = (w) => le.value = w)
                  }, e.carousel, {
                    "wrap-around": ((pt = e.carousel) == null ? void 0 : pt.infinite) === !0
                  }), {
                    addons: P(() => [
                      he(S(Ka)),
                      he(S(Wa))
                    ]),
                    default: P(() => [
                      (v(!0), D(q, null, ye(kt.value, (w, y) => (v(), O(S(Qt), {
                        key: w,
                        index: y
                      }, {
                        default: P(() => [
                          ve("div", Ll, [
                            _(e.$slots, w)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (v(!0), D(q, null, ye(d.value, (w, y) => (v(), O(S(Qt), {
                        key: e.slide,
                        index: y
                      }, {
                        default: P(() => [
                          ve("div", Nl, [
                            _(e.$slots, "item", Fe({
                              [e.slotItemVar || ""]: w,
                              index: y,
                              editing: T.value,
                              canCreate: be.value,
                              canRead: Ve.value,
                              canUpdate: ee.value,
                              canDrop: H.value,
                              isLoading: m.value,
                              doDrop: () => j(y)
                            }))
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128))
                    ]),
                    _: 3
                  }, 16, ["modelValue", "wrap-around"])
                ], 10, Rl)) : R("", !0)
              ], 512), [
                [Ue, Ke.value]
              ]),
              !m.value && d.value.length === 0 ? (v(), D("div", Ml, [
                S(l).empty ? _(e.$slots, "empty", { key: 0 }) : va.value ? (v(), O(xe(fa.value), {
                  key: 1,
                  message: e.noResultsText
                }, null, 8, ["message"])) : e.noResultsText ? (v(), D(q, { key: 2 }, [
                  tt(at(e.noResultsText), 1)
                ], 64)) : R("", !0)
              ])) : R("", !0),
              m.value ? (v(), O(ae, { key: 3 })) : R("", !0),
              $e.value || S(l).bottomButtons ? (v(), D("div", Ol, [
                $e.value && d.value.length >= e.requiredItemsForBottomCreate ? (v(), O($t, {
                  key: 0,
                  config: ne.value,
                  disabled: !vt.value,
                  onClick: Je,
                  onAppend: ct
                }, null, 8, ["config", "disabled"])) : R("", !0),
                _(e.$slots, "bottom-buttons")
              ])) : R("", !0),
              e.paginator && Object.keys(e.paginator).length > 0 ? (v(), O(ce, oe({
                key: 5,
                ref_key: "paginatorRef",
                ref: J
              }, e.paginator, {
                modelValue: u.value,
                "onUpdate:modelValue": f[3] || (f[3] = (w) => u.value = w),
                onLoading: At,
                onPerms: Ge,
                onResponse: Z
              }), null, 16, ["modelValue"])) : R("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, ml);
    };
  }
}), Hl = {
  install: (t) => {
    t.component("lkt-table") === void 0 && t.component("lkt-table", _l);
  }
}, ql = (t) => (fe.navButtonSlot = t, !0), Gl = (t) => (fe.createButtonSlot = t, !0), Xl = (t) => {
  fe.defaultEmptySlot = t;
};
export {
  Wl as Column,
  Jl as createColumn,
  Hl as default,
  Gl as setTableCreateButtonSlot,
  Xl as setTableEmptySlot,
  ql as setTableNavButtonSlot
};
