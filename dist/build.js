import { defineComponent as pe, computed as s, ref as A, shallowReactive as Ut, watch as U, watchEffect as Mt, onMounted as Ht, onBeforeUnmount as ka, reactive as Ot, provide as ta, h as G, useId as Sa, inject as ht, getCurrentInstance as Ca, onUnmounted as wa, onUpdated as Da, cloneVNode as Ia, resolveComponent as Be, createBlock as $, createElementBlock as w, unref as h, openBlock as v, mergeProps as oe, withCtx as P, createTextVNode as et, toDisplayString as tt, Fragment as q, useSlots as aa, normalizeClass as K, createCommentVNode as R, createElementVNode as ve, createVNode as he, resolveDynamicComponent as qe, renderSlot as O, renderList as be, mergeDefaults as Ta, nextTick as Tt, withDirectives as Ue, vShow as Fe, createSlots as Ba, normalizeProps as je } from "vue";
import { __ as Aa } from "lkt-i18n";
import { SortDirection as xe, Column as la, extractPropValue as Ea, ColumnType as gt, FieldType as Yt, TableRowType as ke, extractI18nValue as na, LktSettings as Te, ensureButtonConfig as ze, TablePermission as De, PaginatorType as Bt, TableType as He, getDefaultValues as Va, Table as Na, ButtonType as $t } from "lkt-vue-kernel";
import { Column as Ql, createColumn as Zl } from "lkt-vue-kernel";
import { generateRandomString as Ra, replaceAll as La } from "lkt-string-tools";
import { DataState as Ma } from "lkt-data-state";
import Oa from "sortablejs";
import { time as $a } from "lkt-date-tools";
/**
 * Vue 3 Carousel 0.14.0
 * (c) 2025
 * @license MIT
 */
const oa = ["viewport", "carousel"], Et = {
  "bottom-to-top": "btt",
  "left-to-right": "ltr",
  "right-to-left": "rtl",
  "top-to-bottom": "ttb"
}, ia = [
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
}, ra = ["slide", "fade"], ua = [
  "center",
  "start",
  "end",
  "center-even",
  "center-odd"
], j = {
  autoplay: 0,
  breakpointMode: oa[0],
  breakpoints: void 0,
  dir: ia[0],
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
  slideEffect: ra[0],
  snapAlign: ua[0],
  touchDrag: !0,
  transition: 300,
  wrapAround: !1
}, Ge = Symbol("carousel"), Pa = (t) => {
  const o = Ut([]), i = (n) => {
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
function Ua(t) {
  return t.length === 0 ? 0 : t.reduce((i, n) => i + n, 0) / t.length;
}
function Kt({ slides: t, position: o, toShow: i }) {
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
    }, D = t[(k % t.length + t.length) % t.length].vnode, p = Ia(D, d);
    p.el = null, n.push(p);
  }
  return n;
}
const Fa = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function Wt(t) {
  if (!t.el || !(t.el instanceof Element))
    return;
  const o = t.el.querySelectorAll(Fa);
  for (const i of o)
    i instanceof HTMLElement && !i.hasAttribute("disabled") && i.getAttribute("aria-hidden") !== "true" && i.setAttribute("tabindex", "-1");
}
function ja(t, o) {
  return Object.keys(t).filter((i) => !o.includes(i)).reduce((i, n) => (i[n] = t[n], i), {});
}
function za(t) {
  const { isVertical: o, isReversed: i, dragged: n, effectiveSlideSize: l } = t, a = o ? n.y : n.x;
  if (a === 0)
    return 0;
  const b = Math.round(a / l);
  return i ? b : -b;
}
function Ie({ val: t, max: o, min: i }) {
  return o < i ? t : Math.min(Math.max(t, isNaN(i) ? t : i), isNaN(o) ? t : o);
}
function Ha(t) {
  const { transform: o } = window.getComputedStyle(t);
  return o.split(/[(,)]/).slice(1, -1).map((i) => parseFloat(i));
}
function qa(t) {
  let o = 1, i = 1;
  return t.forEach((n) => {
    const l = Ha(n);
    l.length === 6 && (o /= l[0], i /= l[3]);
  }), { widthMultiplier: o, heightMultiplier: i };
}
function xa(t, o) {
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
function Ga(t, o, i) {
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
function Ft({ slideSize: t, viewportSize: o, align: i, itemsToShow: n }) {
  return n !== void 0 ? xa(i, n) : t !== void 0 && o !== void 0 ? Ga(i, t, o) : 0;
}
function sa(t = "", o = {}) {
  return Object.entries(o).reduce((i, [n, l]) => i.replace(`{${n}}`, String(l)), t);
}
function da({ val: t, max: o, min: i = 0 }) {
  const n = o - i + 1;
  return ((t - i) % n + n) % n + i;
}
function _t(t, o = 0) {
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
function At(t, o = "px") {
  if (!(t == null || t === ""))
    return typeof t == "number" || parseFloat(t).toString() === t ? `${t}${o}` : t;
}
const Xa = pe({
  name: "CarouselAria",
  setup() {
    const t = ht(Ge);
    return t ? () => G("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, sa(t.config.i18n.itemXofY, {
      currentSlide: t.currentSlide + 1,
      slidesCount: t.slidesCount
    })) : () => "";
  }
}), Ya = {
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
    validator(t) {
      return oa.includes(t);
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
    validator(t, o) {
      return t && o.wrapAround && console.warn('[vue3-carousel warn]: "preventExcessiveDragging" cannot be used with wrapAround. The setting will be ignored.'), !0;
    }
  },
  // control snap position alignment
  snapAlign: {
    default: j.snapAlign,
    validator(t) {
      return ua.includes(t);
    }
  },
  slideEffect: {
    type: String,
    default: j.slideEffect,
    validator(t) {
      return ra.includes(t);
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
    validator(t, o) {
      if (!ia.includes(t))
        return !1;
      const i = t in Et ? Et[t] : t;
      return ["ttb", "btt"].includes(i) && (!o.height || o.height === "auto") && console.warn(`[vue3-carousel warn]: The dir "${t}" is not supported with height "auto".`), !0;
    }
  },
  // control infinite scrolling mode
  wrapAround: {
    default: j.wrapAround,
    type: Boolean
  }
}, Ka = pe({
  name: "VueCarousel",
  props: Ya,
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
    const a = Pa(i), b = a.getSlides(), k = s(() => b.length), T = A(null), d = A(null), D = A(0), p = s(() => Object.assign(Object.assign(Object.assign({}, j), ja(t, ["breakpoints", "modelValue"])), { i18n: Object.assign(Object.assign({}, j.i18n), t.i18n) })), u = Ut(Object.assign({}, p.value)), g = A((l = t.modelValue) !== null && l !== void 0 ? l : 0), E = A(g.value);
    U(g, (r) => E.value = r);
    const V = A(0), W = s(() => Math.ceil((k.value - 1) / 2)), ie = s(() => k.value - 1), re = s(() => 0);
    let J = null, c = null, I = null;
    const ue = s(() => D.value + u.gap), F = s(() => {
      const r = u.dir || "ltr";
      return r in Et ? Et[r] : r;
    }), ae = s(() => ["rtl", "btt"].includes(F.value)), _ = s(() => ["ttb", "btt"].includes(F.value)), le = s(() => u.itemsToShow === "auto"), z = s(() => _.value ? "height" : "width");
    function Le() {
      var r;
      if (!Ve.value)
        return;
      const y = (p.value.breakpointMode === "carousel" ? (r = T.value) === null || r === void 0 ? void 0 : r.getBoundingClientRect().width : typeof window < "u" ? window.innerWidth : 0) || 0, C = Object.keys(t.breakpoints || {}).map((L) => Number(L)).sort((L, X) => +X - +L), B = {};
      C.some((L) => y >= L ? (Object.assign(B, t.breakpoints[L]), B.i18n && Object.assign(B.i18n, p.value.i18n, t.breakpoints[L].i18n), !0) : !1), Object.assign(u, p.value, B);
    }
    const Ae = _t(() => {
      Le(), me(), se();
    }), Xe = Ut(/* @__PURE__ */ new Set()), Q = A([]);
    function Vt({ widthMultiplier: r, heightMultiplier: y }) {
      Q.value = b.map((C) => {
        var B;
        const L = (B = C.exposed) === null || B === void 0 ? void 0 : B.getBoundingRect();
        return {
          width: L.width * r,
          height: L.height * y
        };
      });
    }
    const Me = A({
      width: 0,
      height: 0
    });
    function Se({ widthMultiplier: r, heightMultiplier: y }) {
      var C;
      const B = ((C = d.value) === null || C === void 0 ? void 0 : C.getBoundingClientRect()) || { width: 0, height: 0 };
      Me.value = {
        width: B.width * r,
        height: B.height * y
      };
    }
    function se() {
      if (!d.value)
        return;
      const r = qa(Xe);
      if (Se(r), Vt(r), le.value)
        D.value = Ua(Q.value.map((y) => y[z.value]));
      else {
        const y = Number(u.itemsToShow), C = (y - 1) * u.gap;
        D.value = (Me.value[z.value] - C) / y;
      }
    }
    function me() {
      !u.wrapAround && k.value > 0 && (g.value = Ie({
        val: g.value,
        max: ie.value,
        min: re.value
      })), le.value || (u.itemsToShow = Ie({
        val: Number(u.itemsToShow),
        max: k.value,
        min: 1
      }));
    }
    const at = s(() => typeof t.ignoreAnimations == "string" ? t.ignoreAnimations.split(",") : Array.isArray(t.ignoreAnimations) ? t.ignoreAnimations : t.ignoreAnimations ? !1 : []);
    Mt(() => me()), Mt(() => {
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
    typeof document < "u" && Mt(() => {
      Ve.value && at.value !== !1 ? (document.addEventListener("animationstart", kt), document.addEventListener("animationend", St)) : (document.removeEventListener("animationstart", kt), document.removeEventListener("animationend", St));
    }), Ht(() => {
      Ve.value = !0, Le(), Ct(), T.value && (I = new ResizeObserver(Ae), I.observe(T.value)), i("init");
    }), ka(() => {
      Ve.value = !1, a.cleanup(), c && clearTimeout(c), Ee && cancelAnimationFrame(Ee), J && clearInterval(J), I && (I.disconnect(), I = null), typeof document < "u" && Ne(), T.value && (T.value.removeEventListener("transitionend", se), T.value.removeEventListener("animationiteration", se));
    });
    let Ce = !1;
    const ge = { x: 0, y: 0 }, de = Ot({ x: 0, y: 0 }), Oe = A(!1), lt = A(!1), Nt = () => {
      Oe.value = !0;
    }, nt = () => {
      Oe.value = !1;
    }, ot = _t((r) => {
      if (!r.ctrlKey)
        switch (r.key) {
          case "ArrowLeft":
          case "ArrowUp":
            _.value === r.key.endsWith("Up") && (ae.value ? we(!0) : We(!0));
            break;
          case "ArrowRight":
          case "ArrowDown":
            _.value === r.key.endsWith("Down") && (ae.value ? We(!0) : we(!0));
            break;
        }
    }, 200), ye = () => {
      document.addEventListener("keydown", ot);
    }, Ne = () => {
      document.removeEventListener("keydown", ot);
    };
    function Z(r) {
      const y = r.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(y) || H.value || (Ce = r.type === "touchstart", !Ce && (r.preventDefault(), r.button !== 0)))
        return;
      ge.x = "touches" in r ? r.touches[0].clientX : r.clientX, ge.y = "touches" in r ? r.touches[0].clientY : r.clientY;
      const C = Ce ? "touchmove" : "mousemove", B = Ce ? "touchend" : "mouseup";
      document.addEventListener(C, it, { passive: !1 }), document.addEventListener(B, Ye, { passive: !0 });
    }
    const it = _t((r) => {
      lt.value = !0;
      const y = "touches" in r ? r.touches[0].clientX : r.clientX, C = "touches" in r ? r.touches[0].clientY : r.clientY;
      de.x = y - ge.x, de.y = C - ge.y;
      const B = za({
        isVertical: _.value,
        isReversed: ae.value,
        dragged: de,
        effectiveSlideSize: ue.value
      });
      E.value = u.wrapAround ? g.value + B : Ie({
        val: g.value + B,
        max: ie.value,
        min: re.value
      }), i("drag", { deltaX: de.x, deltaY: de.y });
    });
    function Ye() {
      if (it.cancel(), E.value !== g.value && !Ce) {
        const C = (B) => {
          B.preventDefault(), window.removeEventListener("click", C);
        };
        window.addEventListener("click", C);
      }
      Re(E.value), de.x = 0, de.y = 0, lt.value = !1;
      const r = Ce ? "touchmove" : "mousemove", y = Ce ? "touchend" : "mouseup";
      document.removeEventListener(r, it), document.removeEventListener(y, Ye);
    }
    function Ct() {
      !u.autoplay || u.autoplay <= 0 || (J = setInterval(() => {
        u.pauseAutoplayOnHover && Oe.value || we();
      }, u.autoplay));
    }
    function rt() {
      J && (clearInterval(J), J = null);
    }
    function Ke() {
      rt(), Ct();
    }
    const H = A(!1);
    function Re(r, y = !1) {
      if (!y && H.value)
        return;
      let C = r, B = r;
      V.value = g.value, u.wrapAround ? B = da({
        val: C,
        max: ie.value,
        min: re.value
      }) : C = Ie({
        val: C,
        max: ie.value,
        min: re.value
      }), i("slide-start", {
        slidingToIndex: r,
        currentSlideIndex: g.value,
        prevSlideIndex: V.value,
        slidesCount: k.value
      }), rt(), H.value = !0, g.value = C, B !== C && ut.pause(), i("update:modelValue", B), c = setTimeout(() => {
        u.wrapAround && B !== C && (ut.resume(), g.value = B, i("loop", {
          currentSlideIndex: g.value,
          slidingToIndex: r
        })), i("slide-end", {
          currentSlideIndex: g.value,
          prevSlideIndex: V.value,
          slidesCount: k.value
        }), H.value = !1, Ke();
      }, u.transition);
    }
    function we(r = !1) {
      Re(g.value + u.itemsToScroll, r);
    }
    function We(r = !1) {
      Re(g.value - u.itemsToScroll, r);
    }
    function $e() {
      Le(), me(), se(), Ke();
    }
    U(() => [p.value, t.breakpoints], () => Le(), { deep: !0 }), U(() => t.autoplay, () => Ke());
    const ut = U(() => t.modelValue, (r) => {
      r !== g.value && Re(Number(r), !0);
    });
    i("before-init");
    const _e = s(() => {
      if (!u.wrapAround)
        return { before: 0, after: 0 };
      if (le.value)
        return { before: b.length, after: b.length };
      const r = Number(u.itemsToShow), y = Math.ceil(r + (u.itemsToScroll - 1)), C = y - E.value, B = y - (k.value - (E.value + 1));
      return {
        before: Math.max(0, C),
        after: Math.max(0, B)
      };
    }), ne = s(() => _e.value.before ? le.value ? Q.value.slice(-1 * _e.value.before).reduce((r, y) => r + y[z.value] + u.gap, 0) * -1 : _e.value.before * ue.value * -1 : 0), st = s(() => {
      var r;
      if (le.value) {
        const y = (g.value % b.length + b.length) % b.length;
        return Ft({
          slideSize: (r = Q.value[y]) === null || r === void 0 ? void 0 : r[z.value],
          viewportSize: Me.value[z.value],
          align: u.snapAlign
        });
      }
      return Ft({
        align: u.snapAlign,
        itemsToShow: +u.itemsToShow
      });
    }), Je = s(() => {
      let r = 0;
      if (le.value) {
        if (g.value < 0 ? r = Q.value.slice(g.value).reduce((y, C) => y + C[z.value] + u.gap, 0) * -1 : r = Q.value.slice(0, g.value).reduce((y, C) => y + C[z.value] + u.gap, 0), r -= st.value, !u.wrapAround) {
          const y = Q.value.reduce((C, B) => C + B[z.value] + u.gap, 0) - Me.value[z.value] - u.gap;
          r = Ie({
            val: r,
            max: y,
            min: 0
          });
        }
      } else {
        let y = g.value - st.value;
        u.wrapAround || (y = Ie({
          val: y,
          max: k.value - +u.itemsToShow,
          min: 0
        })), r = y * ue.value;
      }
      return r * (ae.value ? 1 : -1);
    }), wt = s(() => {
      var r, y;
      if (!le.value) {
        const L = g.value - st.value;
        return u.wrapAround ? {
          min: Math.floor(L),
          max: Math.ceil(L + Number(u.itemsToShow) - 1)
        } : {
          min: Math.floor(Ie({
            val: L,
            max: k.value - Number(u.itemsToShow),
            min: 0
          })),
          max: Math.ceil(Ie({
            val: L + Number(u.itemsToShow) - 1,
            max: k.value - 1,
            min: 0
          }))
        };
      }
      let C = 0;
      {
        let L = 0, X = 0 - _e.value.before;
        const x = Math.abs(Je.value + ne.value);
        for (; L <= x; ) {
          const ee = (X % b.length + b.length) % b.length;
          L += ((r = Q.value[ee]) === null || r === void 0 ? void 0 : r[z.value]) + u.gap, X++;
        }
        C = X - 1;
      }
      let B = 0;
      {
        let L = C, X = 0;
        for (L < 0 ? X = Q.value.slice(0, L).reduce((x, ee) => x + ee[z.value] + u.gap, 0) - Math.abs(Je.value + ne.value) : X = Q.value.slice(0, L).reduce((x, ee) => x + ee[z.value] + u.gap, 0) - Math.abs(Je.value); X < Me.value[z.value]; ) {
          const x = (L % b.length + b.length) % b.length;
          X += ((y = Q.value[x]) === null || y === void 0 ? void 0 : y[z.value]) + u.gap, L++;
        }
        B = L - 1;
      }
      return {
        min: Math.floor(C),
        max: Math.ceil(B)
      };
    }), Rt = s(() => {
      if (u.slideEffect === "fade")
        return;
      const r = _.value ? "Y" : "X", y = _.value ? de.y : de.x;
      let C = Je.value + y;
      if (!u.wrapAround && u.preventExcessiveDragging) {
        let B = 0;
        le.value ? B = Q.value.reduce((x, ee) => x + ee[z.value], 0) : B = (k.value - Number(u.itemsToShow)) * ue.value;
        const L = ae.value ? 0 : -1 * B, X = ae.value ? B : 0;
        C = Ie({
          val: C,
          min: L,
          max: X
        });
      }
      return `translate${r}(${C}px)`;
    }), Lt = s(() => ({
      "--vc-transition-duration": H.value ? At(u.transition, "ms") : void 0,
      "--vc-slide-gap": At(u.gap),
      "--vc-carousel-height": At(u.height),
      "--vc-cloned-offset": At(ne.value)
    })), Dt = { slideTo: Re, next: we, prev: We }, dt = Ot({
      activeSlide: E,
      config: u,
      currentSlide: g,
      isSliding: H,
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
    ta(Ge, dt);
    const Pe = Ot({
      config: u,
      currentSlide: g,
      maxSlide: ie,
      middleSlide: W,
      minSlide: re,
      slideSize: D,
      slidesCount: k
    });
    return n({
      data: Pe,
      nav: Dt,
      next: we,
      prev: We,
      restartCarousel: $e,
      slideTo: Re,
      updateBreakpointsConfig: Le,
      updateSlideSize: se,
      updateSlidesData: me
    }), () => {
      var r;
      const y = o.default || o.slides, C = (y == null ? void 0 : y(Pe)) || [], { before: B, after: L } = _e.value, X = Kt({
        slides: b,
        position: "before",
        toShow: B
      }), x = Kt({
        slides: b,
        position: "after",
        toShow: L
      }), ee = [...X, ...C, ...x];
      if (!u.enabled || !ee.length)
        return G("section", {
          ref: T,
          class: ["carousel", "is-disabled"]
        }, ee);
      const ct = ((r = o.addons) === null || r === void 0 ? void 0 : r.call(o, Pe)) || [], Qe = G("ol", {
        class: "carousel__track",
        style: { transform: Rt.value },
        onMousedownCapture: u.mouseDrag ? Z : null,
        onTouchstartPassiveCapture: u.touchDrag ? Z : null
      }, ee), vt = G("div", { class: "carousel__viewport", ref: d }, Qe);
      return G("section", {
        ref: T,
        class: [
          "carousel",
          `is-${F.value}`,
          `is-effect-${u.slideEffect}`,
          {
            "is-vertical": _.value,
            "is-sliding": H.value,
            "is-dragging": lt.value,
            "is-hover": Oe.value
          }
        ],
        dir: F.value,
        style: Lt.value,
        "aria-label": u.i18n.ariaGallery,
        tabindex: "0",
        onFocus: ye,
        onBlur: Ne,
        onMouseenter: Nt,
        onMouseleave: nt
      }, [vt, ct, G(Xa)]);
    };
  }
});
var jt;
(function(t) {
  t.arrowDown = "arrowDown", t.arrowLeft = "arrowLeft", t.arrowRight = "arrowRight", t.arrowUp = "arrowUp";
})(jt || (jt = {}));
const Jt = (t) => `icon${t.charAt(0).toUpperCase() + t.slice(1)}`, Wa = {
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
};
function Ja(t) {
  return t in jt;
}
const Qt = (t) => t && Ja(t), Zt = pe({
  props: {
    name: {
      type: String,
      required: !0,
      validator: Qt
    },
    title: {
      type: String,
      default: (t) => t.name ? j.i18n[Jt(t.name)] : ""
    }
  },
  setup(t) {
    const o = ht(Ge, null);
    return () => {
      const i = t.name;
      if (!i || !Qt(i))
        return;
      const n = Wa[i], l = G("path", { d: n }), a = (o == null ? void 0 : o.config.i18n[Jt(i)]) || t.title, b = G("title", a);
      return G("svg", {
        class: "carousel__icon",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": a
      }, [b, l]);
    };
  }
}), Qa = pe({
  name: "CarouselNavigation",
  inheritAttrs: !1,
  setup(t, { slots: o, attrs: i }) {
    const n = ht(Ge);
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
    })[n.normalizedDir], T = s(() => !n.config.wrapAround && n.currentSlide <= n.minSlide), d = s(() => !n.config.wrapAround && n.currentSlide >= n.maxSlide);
    return () => {
      const { i18n: D } = n.config, p = G("button", Object.assign(Object.assign({ type: "button", disabled: T.value, "aria-label": D.ariaPreviousSlide, title: D.ariaPreviousSlide, onClick: n.nav.prev }, i), { class: [
        "carousel__prev",
        { "carousel__prev--disabled": T.value },
        i.class
      ] }), (a == null ? void 0 : a()) || G(Zt, { name: b() })), u = G("button", Object.assign(Object.assign({ type: "button", disabled: d.value, "aria-label": D.ariaNextSlide, title: D.ariaNextSlide, onClick: n.nav.next }, i), { class: [
        "carousel__next",
        { "carousel__next--disabled": d.value },
        i.class
      ] }), (l == null ? void 0 : l()) || G(Zt, { name: k() }));
      return [p, u];
    };
  }
}), Za = pe({
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
    const o = ht(Ge);
    if (!o)
      return () => "";
    const i = s(() => o.config.itemsToShow), n = s(() => Ft({
      align: o.config.snapAlign,
      itemsToShow: i.value
    })), l = s(() => t.paginateByItemsToShow && i.value > 1), a = s(() => Math.ceil((o.activeSlide - n.value) / i.value)), b = s(() => Math.ceil(o.slidesCount / i.value)), k = (T) => da(l.value ? {
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
        const u = sa(o.config.i18n[l.value ? "ariaNavigateToPage" : "ariaNavigateToSlide"], {
          slideNumber: p + 1
        }), g = k(p), E = G("button", {
          type: "button",
          class: {
            "carousel__pagination-button": !0,
            "carousel__pagination-button--active": g
          },
          "aria-label": u,
          "aria-pressed": g,
          "aria-controls": (d = (T = o.slides[p]) === null || T === void 0 ? void 0 : T.exposed) === null || d === void 0 ? void 0 : d.id,
          title: u,
          disabled: t.disableOnClick,
          onClick: () => o.nav.slideTo(l.value ? Math.floor(p * +o.config.itemsToShow + n.value) : p)
        }), V = G("li", { class: "carousel__pagination-item", key: p }, E);
        D.push(V);
      }
      return G("ol", { class: "carousel__pagination" }, D);
    };
  }
}), ea = pe({
  name: "CarouselSlide",
  props: {
    id: {
      type: String,
      default: (t) => t.isClone ? void 0 : Sa()
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
    const l = ht(Ge);
    if (ta(Ge, void 0), !l)
      return () => "";
    const a = A(t.index), b = (E) => {
      a.value = E;
    }, k = Ca(), T = () => {
      const E = k.vnode.el;
      return E ? E.getBoundingClientRect() : { width: 0, height: 0 };
    };
    n({
      id: t.id,
      setIndex: b,
      getBoundingRect: T
    });
    const d = s(() => a.value === l.activeSlide), D = s(() => a.value === l.activeSlide - 1), p = s(() => a.value === l.activeSlide + 1), u = s(() => a.value >= l.visibleRange.min && a.value <= l.visibleRange.max), g = s(() => {
      if (l.config.itemsToShow === "auto")
        return;
      const E = l.config.itemsToShow, V = l.config.gap > 0 && E > 1 ? `calc(${100 / E}% - ${l.config.gap * (E - 1) / E}px)` : `${100 / E}%`;
      return l.isVertical ? { height: V } : { width: V };
    });
    return l.slideRegistry.registerSlide(k, t.index), wa(() => {
      l.slideRegistry.unregisterSlide(k);
    }), t.isClone && (Ht(() => {
      Wt(k.vnode);
    }), Da(() => {
      Wt(k.vnode);
    })), () => {
      var E, V;
      return l.config.enabled ? G("li", {
        style: [o.style, Object.assign({}, g.value)],
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": t.isClone,
          "carousel__slide--visible": u.value,
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
        isVisible: u.value
      })) : (E = i.default) === null || E === void 0 ? void 0 : E.call(i);
    };
  }
}), el = (t, o, i, n) => {
  if (!i) return 0;
  let l = String(t[i.key]).toLowerCase(), a = String(o[i.key]).toLowerCase();
  if (n === xe.Asc) {
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
    return l.startsWith("__:") ? Aa(l.substring(3)) : l;
  }
  return o[t.key];
}, tl = (t, o, i) => {
  if (!t.colspan) return -1;
  let n = o;
  return i.forEach((l) => {
    let a = qt(t, l);
    a > 0 && a < n && (n = a);
  }), n;
}, qt = (t, o) => t.colspan === !1 ? !1 : typeof t.colspan == "function" ? t.colspan(o) : t.colspan, ca = (t, o) => typeof t.preferSlot > "u" ? !0 : t.preferSlot === !1 ? !1 : typeof t.preferSlot == "function" ? t.preferSlot(o) : !0, al = (t, o, i) => {
  if (typeof t != "object" || !t.key || o.indexOf(t.key) > -1) return !1;
  let n = qt(t, i);
  return typeof t.colspan > "u" ? !0 : (typeof t.colspan < "u" && (typeof t.colspan == "function" ? n = parseInt(t.colspan(i)) : n = parseInt(t.colspan)), n > 0);
}, ll = (t = []) => {
  if (t.length > 0) {
    for (let o = 0; o < t.length; ++o)
      if (t[o].sortable) return t[o].key;
  }
  return "";
}, nl = (t, o) => {
  if (t.length > 0) {
    for (let i = 0; i < t.length; ++i)
      if (t[i].key === o) return t[i];
  }
  return null;
}, va = (t) => {
  let o = [];
  return t.class && o.push(t.class), t.type && o.push(`is-${t.type}`), o.join(" ");
}, zt = /* @__PURE__ */ pe({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new la() },
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
      const u = JSON.parse(JSON.stringify(l.value));
      u[n.column.key] = p, i("update:modelValue", u);
    }), U(() => n.modelValue, (p) => {
      l.value = p, a.value = l.value[n.column.key];
    });
    const k = s(() => ({ ...n.column.slotData, item: l.value })), T = s(() => {
      var p, u, g, E;
      if ((p = n.column.field) != null && p.modalData && typeof ((u = n.column.field) == null ? void 0 : u.modalData) == "object")
        for (let V in n.column.field.modalData)
          if (typeof ((g = n.column.field) == null ? void 0 : g.modalData[V]) == "string" && n.column.field.modalData[V].startsWith("prop:")) {
            let W = n.column.field.modalData[V].substring(5);
            l.value[W];
          } else
            n.column.field.modalData[V];
      return (E = n.column.field) == null ? void 0 : E.modalData;
    }), d = s(() => typeof n.column.field == "string" && n.column.field.startsWith("prop:") ? Ea(n.column.field, l.value) : n.column.field), D = s(() => {
      var p, u, g, E;
      return n.column.type === gt.Field ? !((u = (p = n.column) == null ? void 0 : p.field) != null && u.label) && (n.column.ensureFieldLabel || [
        Yt.Switch,
        Yt.Check
      ].includes((g = n.column.field) == null ? void 0 : g.type)) ? n.column.label : (E = n.column.field) == null ? void 0 : E.label : "";
    });
    return (p, u) => {
      const g = Be("lkt-anchor"), E = Be("lkt-button"), V = Be("lkt-field");
      return p.column.type === h(gt).Anchor ? (v(), $(g, oe({ key: 0 }, p.column.anchor, { prop: l.value }), {
        default: P(() => [
          et(tt(h(yt)(p.column, l.value, p.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : p.column.type === h(gt).Button ? (v(), $(E, oe({ key: 1 }, p.column.button, { prop: l.value }), {
        default: P(() => [
          et(tt(h(yt)(p.column, l.value, p.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : p.column.type === h(gt).Field && p.hasInlineEditPerm ? (v(), $(V, oe({ key: 2 }, d.value, {
        "read-mode": !p.column.editable || !p.editModeEnabled,
        ref: (W) => b.value = W,
        "slot-data": k.value,
        label: D.value,
        "modal-data": T.value,
        prop: l.value,
        modelValue: a.value,
        "onUpdate:modelValue": u[0] || (u[0] = (W) => a.value = W)
      }), null, 16, ["read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : p.column.type === h(gt).Field ? (v(), $(V, oe({ key: 3 }, d.value, {
        "read-mode": "",
        ref: (W) => b.value = W,
        "slot-data": k.value,
        label: D.value,
        "modal-data": T.value,
        prop: l.value,
        "model-value": a.value
      }), null, 16, ["slot-data", "label", "modal-data", "prop", "model-value"])) : (v(), w(q, { key: 4 }, [
        et(tt(h(yt)(p.column, l.value, p.i, p.columns)), 1)
      ], 64));
    };
  }
}), bt = class bt {
};
bt.navButtonSlot = "", bt.createButtonSlot = "", bt.defaultEmptySlot = void 0;
let fe = bt;
const ol = ["data-i", "data-draggable"], il = ["data-role", "data-i"], rl = {
  key: 1,
  class: "lkt-table-nav-cell"
}, ul = { class: "lkt-table-nav-container" }, sl = {
  key: 1,
  class: "lkt-icn-arrow-top"
}, dl = {
  key: 1,
  class: "lkt-icn-arrow-bottom"
}, cl = ["colspan"], vl = ["colspan"], fl = ["data-column", "colspan", "title"], pl = /* @__PURE__ */ pe({
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
    const i = aa(), n = o, l = t, a = A(l.modelValue);
    let b = typeof l.rowDisplayType == "function" ? l.rowDisplayType(a.value, l.i) : l.rowDisplayType;
    b || (b = ke.Auto);
    const k = [ke.Auto, ke.PreferCustomItem].includes(b), T = [ke.Auto, ke.PreferItem].includes(b), d = (c) => n("click", c), D = s(() => {
      let c = [], I = !1;
      return typeof l.disabledDrag == "function" ? I = l.disabledDrag(a.value) : I = ie.value === !0, !I && l.sortable && l.isDraggable ? c.push("handle") : I && c.push("disabled"), c.join(" ");
    }), p = s(() => fe.navButtonSlot !== ""), u = s(() => fe.navButtonSlot), g = () => {
      n("item-up", l.i);
    }, E = () => {
      n("item-down", l.i);
    }, V = () => {
      n("item-drop", l.i);
    };
    U(() => l.modelValue, (c) => a.value = c), U(a, (c) => {
      n("update:modelValue", c);
    }, { deep: !0 });
    const W = s(() => typeof l.renderDrag == "function" ? l.renderDrag(a.value) : l.renderDrag === !0), ie = s(() => typeof l.disabledDrag == "function" ? l.disabledDrag(a.value) : l.disabledDrag === !0), re = s(() => D.value.includes("handle") ? "drag-indicator" : "invalid-drag-indicator"), J = s(() => {
      let c = [];
      return k && c.push("type-custom-item"), T && c.push("type-item"), typeof l.itemContainerClass == "function" ? c.push(l.itemContainerClass(a.value, l.i)) : l.itemContainerClass !== "" && c.push(l.itemContainerClass), c.join(" ");
    });
    return (c, I) => {
      const ue = Be("lkt-button");
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
        ]), 10, il)) : R("", !0),
        c.addNavigation && c.editModeEnabled ? (v(), w("td", rl, [
          ve("div", ul, [
            he(ue, {
              palette: "table-nav",
              disabled: c.i === 0,
              onClick: g
            }, {
              default: P(() => [
                p.value ? (v(), $(qe(u.value), {
                  key: 0,
                  direction: "up"
                })) : (v(), w("i", sl))
              ]),
              _: 1
            }, 8, ["disabled"]),
            he(ue, {
              palette: "table-nav",
              disabled: c.latestRow,
              onClick: E
            }, {
              default: P(() => [
                p.value ? (v(), $(qe(u.value), {
                  key: 0,
                  direction: "down"
                })) : (v(), w("i", dl))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : R("", !0),
        h(k) && h(i)[`item-${c.i}`] ? (v(), w("td", {
          key: "td" + c.i,
          colspan: c.visibleColumns.length
        }, [
          O(c.$slots, `item-${c.i}`, {
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
        ], 8, cl)) : h(T) && h(i).item ? (v(), w("td", {
          key: "td" + c.i,
          colspan: c.visibleColumns.length
        }, [
          O(c.$slots, "item", {
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
        ], 8, vl)) : (v(!0), w(q, { key: 4 }, be(c.visibleColumns, (F) => (v(), w(q, null, [
          h(al)(F, c.emptyColumns, a.value) ? (v(), w("td", {
            key: "td" + c.i,
            "data-column": F.key,
            colspan: h(qt)(F, a.value),
            title: h(yt)(F, a.value, c.i, c.visibleColumns),
            class: K(h(va)(F)),
            onClick: I[1] || (I[1] = (ae) => d(ae))
          }, [
            c.$slots[F.key] && h(ca)(F, a.value) ? O(c.$slots, F.key, {
              key: 0,
              value: a.value[F.key],
              item: a.value,
              column: F,
              i: c.i
            }) : a.value ? (v(), $(zt, {
              key: 1,
              modelValue: a.value,
              "onUpdate:modelValue": I[0] || (I[0] = (ae) => a.value = ae),
              column: F,
              columns: c.visibleColumns,
              "edit-mode-enabled": c.editModeEnabled,
              "has-inline-edit-perm": c.hasInlineEditPerm,
              i: c.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : R("", !0)
          ], 10, fl)) : R("", !0)
        ], 64))), 256))
      ], 10, ol);
    };
  }
}), Pt = /* @__PURE__ */ pe({
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
      const u = Be("lkt-button");
      return v(), $(u, oe(k, {
        disabled: D.disabled,
        onClick: T
      }), {
        default: P(() => [
          l.value ? (v(), $(qe(a.value), { key: 0 })) : R("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), ml = ["data-column", "data-sortable", "data-sort", "colspan", "title"], gl = /* @__PURE__ */ pe({
  __name: "TableHeader",
  props: {
    column: { default: () => new la() },
    sortBy: { default: "" },
    sortDirection: { default: "" },
    amountOfColumns: { default: 0 },
    items: { default: () => [] }
  },
  emits: [
    "click"
  ],
  setup(t, { emit: o }) {
    const i = o, n = t, l = s(() => tl(n.column, n.amountOfColumns, n.items)), a = s(() => n.column.sortable === !0), b = s(() => a.value && n.sortBy === n.column.key ? n.sortDirection : ""), k = s(() => na(n.column.label)), T = s(() => a.value && n.sortBy === n.column.key ? n.sortDirection === xe.Asc ? Te.defaultTableSortAscIcon : n.sortDirection === xe.Desc ? Te.defaultTableSortDescIcon : "" : ""), d = () => i("click", n.column);
    return (D, p) => (v(), w("th", {
      "data-column": D.column.key,
      "data-sortable": a.value,
      "data-sort": b.value,
      colspan: l.value,
      title: k.value,
      class: K(h(va)(D.column)),
      onClick: d
    }, [
      ve("div", null, [
        et(tt(k.value) + " ", 1),
        T.value ? (v(), w("i", {
          key: 0,
          class: K(T.value)
        }, null, 2)) : R("", !0)
      ])
    ], 10, ml));
  }
}), yl = ["id"], bl = { class: "lkt-table-page-buttons" }, hl = { class: "switch-edition-mode" }, kl = { class: "switch-edition-mode" }, Sl = {
  key: 0,
  class: "lkt-table-page-buttons"
}, Cl = {
  key: 1,
  class: "lkt-table-page-filters"
}, wl = { class: "lkt-table" }, Dl = { key: 0 }, Il = { key: 0 }, Tl = {
  key: 0,
  "data-role": "drag-indicator"
}, Bl = { key: 1 }, Al = ["id"], El = ["id"], Vl = ["data-i"], Nl = ["id"], Rl = ["data-i"], Ll = ["id"], Ml = { class: "lkt-carousel-slide" }, Ol = { class: "lkt-carousel-slide" }, $l = {
  key: 2,
  class: "lkt-table-empty"
}, _l = {
  key: 4,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, Pl = /* @__PURE__ */ pe({
  __name: "LktTable",
  props: /* @__PURE__ */ Ta({
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
  }, Va(Na)),
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
    var xt, Gt;
    const n = i, l = aa(), a = t, b = A(typeof a.sorter == "function" ? a.sorter : el), k = A(ll(a.columns)), T = A(xe.Asc), d = A(a.modelValue), D = A(null), p = A(a.columns), u = A((xt = a.paginator) == null ? void 0 : xt.modelValue), g = A(a.loading), E = A(!1), V = A(a.perms), W = A(null), ie = A(null), re = A(null), J = A({}), c = A(new Ma({ items: d.value }, a.dataStateConfig)), I = A(a.editMode), ue = A(0), F = A(null), ae = A(((Gt = a.carousel) == null ? void 0 : Gt.currentSlide) || 0), _ = A(ze(a.saveButton, Te.defaultSaveButton)), le = A(ze(a.createButton, Te.defaultCreateButton)), z = A(ze(a.editModeButton, Te.defaultEditModeButton)), Le = A(ze(a.groupButton, Te.defaultGroupButton));
    U(() => a.saveButton, (e) => _.value = ze(a.saveButton, Te.defaultSaveButton)), U(() => a.createButton, (e) => le.value = ze(a.createButton, Te.defaultCreateButton)), U(() => a.editModeButton, (e) => z.value = ze(a.editModeButton, Te.defaultEditModeButton));
    const Ae = A(!1);
    U(g, (e) => n("update:loading", e)), U(u, (e) => n("page", e));
    const Xe = (e) => {
      V.value = e;
    }, Q = (e) => {
      var f;
      Array.isArray(e.data) && ((!a.paginator || ![Bt.LoadMore, Bt.Infinite].includes((f = a.paginator) == null ? void 0 : f.type)) && d.value.splice(0, d.value.length), d.value = [...d.value, ...e.data]), g.value = !1, E.value = !0, c.value.store({ items: d.value }).turnStoredIntoOriginal(), Ae.value = !1, Tt(() => {
        ne(), ge.value, n("read-response", e);
      });
    }, Vt = () => Tt(() => g.value = !0), Me = () => {
      W.value.doRefresh();
    }, Se = Ra(12), se = s(() => {
      if (!a.hideEmptyColumns) return [];
      let e = [];
      return p.value.forEach((f) => {
        let M = f.key, Y = !1;
        d.value.forEach((te) => {
          if (typeof te.checkEmpty == "function")
            return te.checkEmpty(te);
          te[M] && (Y = !0);
        }), Y || e.push(M);
      }), e;
    }), me = s(() => p.value.filter((e) => !e.hidden)), at = s(() => p.value.filter((e) => e.isForRowKey)), Ee = s(() => p.value.map((e) => e.key)), kt = s(() => {
      let e = [];
      for (let f in l) Ee.value.indexOf(f) !== -1 && e.push(f);
      return e;
    }), St = s(() => {
      let e = [];
      for (let f in l) f.indexOf("slide-") !== -1 && e.push(f);
      return e;
    }), Ve = s(() => {
      var e;
      return a.hiddenSave || g.value || !((e = _.value) != null && e.resource || _.value.type) ? !1 : I.value && Ae.value ? !0 : I.value;
    }), Ce = s(() => ft.value && d.value.length >= a.requiredItemsForTopCreate || we.value ? !0 : Ve.value || I.value && ye.value), ge = s(() => {
      var e, f;
      return ue.value, typeof ((e = _.value) == null ? void 0 : e.disabled) == "function" ? _.value.disabled({
        value: d.value,
        dataState: c.value
      }) : typeof ((f = _.value) == null ? void 0 : f.disabled) == "boolean" ? _.value.disabled : !Ae.value;
    }), de = s(() => d.value.length), Oe = s(() => {
      var e;
      return {
        items: d.value,
        ...(e = _.value) == null ? void 0 : e.resourceData
      };
    }), lt = s(() => a.titleTag === "" ? "h2" : a.titleTag), Nt = s(() => a.wrapContentTag === "" ? "div" : a.wrapContentTag), nt = s(() => na(a.title)), ot = s(() => {
      var e;
      return (e = a.drag) == null ? void 0 : e.enabled;
    }), ye = s(() => V.value.includes(De.Create)), Ne = s(() => V.value.includes("read")), Z = s(() => V.value.includes(De.Update)), it = s(() => V.value.includes(De.Edit)), Ye = s(() => V.value.includes(De.InlineEdit)), Ct = s(() => V.value.includes(De.ModalCreate)), rt = s(() => V.value.includes(De.InlineCreate)), Ke = s(() => V.value.includes(De.InlineCreateEver)), H = s(() => V.value.includes(De.Drop)), Re = s(() => V.value.includes(De.SwitchEditMode)), we = s(() => !Re.value || !Z.value && !H.value || !Z.value && H.value ? !1 : !g.value), We = s(() => {
      var e;
      return (typeof ((e = a.paginator) == null ? void 0 : e.type) < "u" && [Bt.LoadMore, Bt.Infinite].includes(a.paginator.type) || !g.value) && d.value.length > 0;
    }), $e = s(() => p.value.find((e) => e.isForAccordionHeader)), ut = (e, f) => typeof a.customItemSlotName == "function" ? a.customItemSlotName(e, f) : "", _e = (e) => {
      let f = e.target;
      if (typeof f.dataset.column > "u")
        do
          f = f.parentNode;
        while (typeof f.dataset.column > "u" && f.tagName !== "TABLE" && f.tagName !== "body");
      if (f.tagName === "TD" && (f = f.parentNode, f = f.dataset.i, typeof f < "u"))
        return d.value[f];
    }, ne = () => {
      ue.value = $a();
    }, st = (e) => d.value[e], Je = (e) => {
      var f;
      return (f = D.value) == null ? void 0 : f.querySelector(`[data-i="${e}"]`);
    }, wt = (e) => {
      e && e.sortable && (d.value = d.value.sort((f, M) => b.value(f, M, e, T.value)), T.value = T.value === xe.Asc ? xe.Desc : xe.Asc, k.value = e.key, ne(), n("sort", [k.value, T.value]));
    }, Rt = (e) => {
      n("click", e);
    }, Lt = (e) => {
      var M, Y, te, ce, mt, S, m, N;
      let f = parseInt((ce = (te = (Y = (M = e == null ? void 0 : e.originalEvent) == null ? void 0 : M.toElement) == null ? void 0 : Y.closest("tr")) == null ? void 0 : te.dataset) == null ? void 0 : ce.i);
      return !(typeof ((mt = a.drag) == null ? void 0 : mt.isValid) == "function" && !((S = a.drag) != null && S.isValid(d.value[f])) || typeof ((m = a.drag) == null ? void 0 : m.isValid) == "boolean" && !((N = a.drag) != null && N.isValid));
    }, Dt = (e) => {
      var f, M;
      return typeof ((f = a.drag) == null ? void 0 : f.isDraggable) == "function" ? (M = a.drag) == null ? void 0 : M.isDraggable(e) : !0;
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
    }, Pe = (e) => {
      d.value.push(e);
    }, r = () => g.value = !0, y = () => g.value = !1, C = (e, f) => {
      var M, Y, te;
      if (!((M = _.value) != null && M.type && [
        $t.Split,
        $t.SplitEver,
        $t.SplitLazy
      ].includes((Y = _.value) == null ? void 0 : Y.type))) {
        if (n("before-save"), (te = _.value) != null && te.resource && (g.value = !1, !f.success)) {
          n("error", f.httpStatus);
          return;
        }
        c.value.turnStoredIntoOriginal(), Ae.value = !1, n("save", f);
      }
    }, B = (e, f, M) => {
      if (M >= e.length) {
        let Y = M - e.length + 1;
        for (; Y--; ) e.push(void 0);
      }
      return e.splice(M, 0, e.splice(f, 1)[0]), e;
    }, L = (e) => {
      B(d.value, e, e - 1), ne();
    }, X = (e) => {
      B(d.value, e, e + 1), ne();
    }, x = (e) => {
      d.value.splice(e, 1), ne();
    }, ee = () => {
      var e;
      J.value && typeof ((e = J.value) == null ? void 0 : e.destroy) == "function" && (J.value.destroy(), J.value = {});
    }, ct = () => {
      F.value || (F.value = document.getElementById("lkt-table-body-" + Se)), J.value = new Oa(F.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let f = e.oldIndex, M = e.newIndex;
          d.value.splice(M, 0, d.value.splice(f, 1)[0]), ne(), n("drag-end", d.value[M]);
        },
        onMove: function(e, f) {
          return Lt(e);
        }
      });
    }, Qe = (e, f, M = !1) => {
      let Y = [ue.value, Se, "row", f];
      return M && Y.push("hidden"), at.value.forEach((te) => {
        let ce = String(e[te.key]).toLowerCase();
        ce.length > 50 && (ce = ce.substring(0, 50)), ce = La(ce, " ", "-"), Y.push(ce);
      }), Y.join("-");
    }, vt = s(() => typeof a.createEnabledValidator == "function" ? a.createEnabledValidator({ items: d.value }) : !0), ft = s(() => Ke.value || ye.value && I.value || rt.value && I.value || Ct.value && I.value), fa = s(() => [He.Ol, He.Ul].includes(a.type)), pt = (e, f) => typeof a.itemDisplayChecker == "function" ? a.itemDisplayChecker(e) : !0, It = (e, f) => typeof a.itemContainerClass == "function" ? a.itemContainerClass(e, f) : a.itemContainerClass, pa = (e, f) => $e.value ? e[$e.value.key] : "";
    Ht(() => {
      var e;
      a.initialSorting && wt(nl(a.columns, k.value)), c.value.store({ items: d.value }).turnStoredIntoOriginal(), Ae.value = !1, (e = a.drag) != null && e.enabled && Tt(() => {
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
      getItemByEvent: _e,
      getItemByIndex: st,
      getRowByIndex: Je,
      doRefresh: Me,
      doRemoveIndex: (e) => {
        d.value.splice(e, 1), ne();
      },
      getHtml: () => ie.value,
      reRender: ne,
      turnStoredIntoOriginal: () => {
        c.value.turnStoredIntoOriginal(), Tt(() => {
          ne();
        });
      }
    });
    const ma = s(() => typeof fe.defaultEmptySlot < "u"), ga = s(() => fe.defaultEmptySlot), ya = s(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled ? !1 : typeof a.drag.canRender > "u" ? !0 : a.drag.canRender), ba = s(() => !a.drag || Object.keys(a.drag).length === 0 || !a.drag.enabled || typeof a.drag.isDisabled > "u" ? !1 : a.drag.isDisabled);
    return (e, f) => {
      const M = Be("lkt-button"), Y = Be("lkt-accordion"), te = Be("lkt-loader"), ce = Be("lkt-paginator");
      return v(), w("section", {
        ref_key: "element",
        ref: ie,
        class: "lkt-table-page",
        id: "lkt-table-page-" + h(Se)
      }, [
        nt.value || h(l).title ? (v(), w("header", {
          key: 0,
          class: K(e.headerClass)
        }, [
          nt.value ? (v(), $(qe(lt.value), { key: 0 }, {
            default: P(() => [
              e.titleIcon ? (v(), w("i", {
                key: 0,
                class: K(e.titleIcon)
              }, null, 2)) : R("", !0),
              et(" " + tt(nt.value), 1)
            ]),
            _: 1
          })) : R("", !0),
          h(l).title ? O(e.$slots, "title", { key: 1 }) : R("", !0)
        ], 2)) : R("", !0),
        (v(), $(qe(Nt.value), {
          class: K(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: P(() => {
            var mt;
            return [
              Ue(ve("div", bl, [
                e.groupButton !== !1 ? (v(), $(M, oe({
                  key: 0,
                  ref: "groupButton"
                }, Le.value, { class: "lkt-item-crud-group-button" }), {
                  split: P(() => [
                    ve("div", hl, [
                      Ue(he(M, oe(z.value, {
                        checked: I.value,
                        "onUpdate:checked": f[0] || (f[0] = (S) => I.value = S)
                      }), null, 16, ["checked"]), [
                        [Fe, we.value]
                      ])
                    ]),
                    h(l)["prev-buttons-ever"] ? O(e.$slots, "prev-buttons-ever", {
                      key: 0,
                      canUpdate: Z.value,
                      canDrop: H.value,
                      perms: e.perms
                    }) : R("", !0),
                    h(l)["prev-buttons"] ? O(e.$slots, "prev-buttons", {
                      key: 1,
                      canUpdate: Z.value,
                      canDrop: H.value,
                      perms: e.perms
                    }) : R("", !0),
                    Ue(he(M, oe({
                      class: "lkt-table--save-button",
                      ref_key: "saveButtonRef",
                      ref: re
                    }, {
                      ..._.value,
                      disabled: ge.value,
                      resourceData: Oe.value
                    }, {
                      onLoading: r,
                      onLoaded: y,
                      onClick: C
                    }), {
                      split: P(({ doClose: S, doRootClick: m }) => [
                        O(e.$slots, "button-save-split", {
                          doClose: S,
                          doRootClick: m,
                          dataState: c.value,
                          onButtonLoading: r,
                          onButtonLoaded: y
                        })
                      ]),
                      default: P(() => [
                        h(l)["button-save"] ? O(e.$slots, "button-save", {
                          key: 0,
                          items: d.value,
                          editMode: e.editMode,
                          canUpdate: !ge.value
                        }) : R("", !0)
                      ]),
                      _: 3
                    }, 16), [
                      [Fe, Ve.value]
                    ]),
                    ft.value && d.value.length >= e.requiredItemsForTopCreate ? (v(), $(Pt, {
                      key: 2,
                      config: le.value,
                      disabled: !vt.value,
                      onClick: dt,
                      onAppend: Pe
                    }, null, 8, ["config", "disabled"])) : R("", !0)
                  ]),
                  _: 3
                }, 16)) : R("", !0),
                h(l)["prev-buttons-ever"] ? O(e.$slots, "prev-buttons-ever", {
                  key: 1,
                  canUpdate: Z.value,
                  canDrop: H.value,
                  perms: e.perms
                }) : R("", !0),
                h(l)["prev-buttons"] ? O(e.$slots, "prev-buttons", {
                  key: 2,
                  canUpdate: Z.value,
                  canDrop: H.value,
                  perms: e.perms
                }) : R("", !0),
                Ue(he(M, oe({
                  class: "lkt-table--save-button",
                  ref_key: "saveButtonRef",
                  ref: re
                }, {
                  ..._.value,
                  disabled: ge.value,
                  resourceData: Oe.value
                }, {
                  onLoading: r,
                  onLoaded: y,
                  onClick: C
                }), {
                  split: P(({ doClose: S, doRootClick: m }) => [
                    O(e.$slots, "button-save-split", {
                      doClose: S,
                      doRootClick: m,
                      dataState: c.value,
                      onButtonLoading: r,
                      onButtonLoaded: y
                    })
                  ]),
                  default: P(() => [
                    h(l)["button-save"] ? O(e.$slots, "button-save", {
                      key: 0,
                      items: d.value,
                      editMode: e.editMode,
                      canUpdate: !ge.value
                    }) : R("", !0)
                  ]),
                  _: 3
                }, 16), [
                  [Fe, Ve.value]
                ]),
                ft.value && d.value.length >= e.requiredItemsForTopCreate ? (v(), $(Pt, {
                  key: 3,
                  config: le.value,
                  disabled: !vt.value,
                  onClick: dt,
                  onAppend: Pe
                }, null, 8, ["config", "disabled"])) : R("", !0),
                ve("div", kl, [
                  Ue(he(M, oe(z.value, {
                    checked: I.value,
                    "onUpdate:checked": f[1] || (f[1] = (S) => I.value = S)
                  }), null, 16, ["checked"]), [
                    [Fe, we.value]
                  ])
                ])
              ], 512), [
                [Fe, Ce.value]
              ]),
              h(l).buttons ? (v(), w("div", Sl, [
                O(e.$slots, "buttons")
              ])) : R("", !0),
              E.value && h(l).filters ? (v(), w("div", Cl, [
                O(e.$slots, "filters", {
                  items: d.value,
                  isLoading: g.value
                })
              ])) : R("", !0),
              Ue(ve("div", wl, [
                e.type === h(He).Table ? (v(), w("table", Dl, [
                  e.hideTableHeader ? R("", !0) : (v(), w("thead", Il, [
                    ve("tr", null, [
                      ot.value && I.value ? (v(), w("th", Tl)) : R("", !0),
                      e.addNavigation && I.value ? (v(), w("th", Bl)) : R("", !0),
                      (v(!0), w(q, null, be(me.value, (S) => (v(), w(q, null, [
                        se.value.indexOf(S.key) === -1 ? (v(), $(gl, {
                          key: 0,
                          column: S,
                          "sort-by": k.value,
                          "sort-direction": T.value,
                          "amount-of-columns": e.columns.length,
                          items: d.value,
                          onClick: (m) => wt(S)
                        }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : R("", !0)
                      ], 64))), 256))
                    ])
                  ])),
                  ve("tbody", {
                    ref_key: "tableBody",
                    ref: D,
                    id: "lkt-table-body-" + h(Se),
                    class: K(e.itemsContainerClass)
                  }, [
                    (v(!0), w(q, null, be(d.value, (S, m) => Ue((v(), $(pl, {
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
                      "can-drop": H.value && I.value,
                      "can-edit": it.value && Z.value && I.value,
                      "can-read": Ne.value,
                      "can-create": ye.value,
                      "edit-mode-enabled": I.value,
                      "has-inline-edit-perm": Ye.value,
                      "row-display-type": e.rowDisplayType,
                      "render-drag": ya.value,
                      "disabled-drag": ba.value,
                      "is-loading": g.value,
                      "item-container-class": e.itemContainerClass,
                      onClick: Rt,
                      onItemUp: L,
                      onItemDown: X,
                      onItemDrop: x
                    }, Ba({ _: 2 }, [
                      h(l)[`item-${m}`] ? {
                        name: `item-${m}`,
                        fn: P((N) => [
                          O(e.$slots, `item-${m}`, je({
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
                          O(e.$slots, "item", je({
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
                          O(e.$slots, N, je({
                            [e.slotItemVar || ""]: Ze.item,
                            value: Ze.value,
                            column: Ze.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "latest-row", "can-drop", "can-edit", "can-read", "can-create", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag", "is-loading", "item-container-class"])), [
                      [Fe, pt(d.value[m])]
                    ])), 128))
                  ], 10, Al)
                ])) : e.type === h(He).Item ? (v(), w("div", {
                  key: 1,
                  ref_key: "tableBody",
                  ref: D,
                  id: "lkt-table-body-" + h(Se),
                  class: K(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), w(q, null, be(d.value, (S, m) => (v(), w(q, {
                    key: Qe(S, m)
                  }, [
                    !e.skipTableItemsContainer && pt(S) ? (v(), w("div", {
                      key: 0,
                      class: K(["lkt-table-item", It(S, m)]),
                      "data-i": m
                    }, [
                      O(e.$slots, "item", je({
                        [e.slotItemVar || ""]: S,
                        index: m,
                        editing: I.value,
                        canCreate: ye.value,
                        canRead: Ne.value,
                        canUpdate: Z.value,
                        canDrop: H.value,
                        isLoading: g.value,
                        doDrop: () => x(m)
                      }))
                    ], 10, Vl)) : pt(S) ? O(e.$slots, "item", je({
                      key: 1,
                      class: It(S, m),
                      dataI: m,
                      [e.slotItemVar || ""]: S,
                      index: m,
                      editing: I.value,
                      canCreate: ye.value,
                      canRead: Ne.value,
                      canUpdate: Z.value,
                      canDrop: H.value,
                      isLoading: g.value,
                      doDrop: () => x(m)
                    })) : R("", !0)
                  ], 64))), 128))
                ], 10, El)) : e.type === h(He).Accordion ? (v(), w("div", {
                  key: 2,
                  ref_key: "tableBody",
                  ref: D,
                  id: "lkt-table-body-" + h(Se),
                  class: K(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  (v(!0), w(q, null, be(d.value, (S, m) => (v(), w(q, null, [
                    [h(ke).Auto, h(ke).PreferCustomItem].includes(e.rowDisplayType) && h(l)[ut(S, m)] ? O(e.$slots, ut(S, m), {
                      key: 0,
                      item: S,
                      index: m,
                      editing: I.value,
                      isLoading: g.value
                    }) : [h(ke).Auto, h(ke).PreferCustomItem].includes(e.rowDisplayType) && h(l)[`item-${m}`] ? O(e.$slots, `item-${m}`, {
                      key: 1,
                      item: S,
                      index: m,
                      editing: I.value,
                      isLoading: g.value
                    }) : (v(), w(q, { key: 2 }, [
                      pt(S) ? (v(), $(Y, oe({
                        class: ["lkt-table-item", It(S, m)],
                        "data-i": m,
                        key: Qe(S, m),
                        ref_for: !0
                      }, {
                        ...e.accordion,
                        title: pa(S)
                      }), {
                        header: P(() => [
                          he(zt, {
                            modelValue: d.value[m],
                            "onUpdate:modelValue": (N) => d.value[m] = N,
                            i: m,
                            column: $e.value,
                            columns: me.value,
                            "edit-mode-enabled": I.value,
                            "has-inline-edit-perm": Ye.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])
                        ]),
                        default: P(() => [
                          (v(!0), w(q, null, be(me.value, (N) => {
                            var Ze, Xt;
                            return v(), w(q, null, [
                              N.key !== ((Ze = $e.value) == null ? void 0 : Ze.key) && e.$slots[N.key] && h(ca)(N, d.value[m]) ? O(e.$slots, N.key, {
                                key: 0,
                                value: d.value[m][N.key],
                                item: d.value[m],
                                column: N,
                                i: m
                              }) : (v(), w(q, { key: 1 }, [
                                N.key !== ((Xt = $e.value) == null ? void 0 : Xt.key) ? (v(), $(zt, {
                                  key: 0,
                                  modelValue: d.value[m],
                                  "onUpdate:modelValue": (ha) => d.value[m] = ha,
                                  i: m,
                                  column: N,
                                  columns: me.value,
                                  "edit-mode-enabled": I.value,
                                  "has-inline-edit-perm": Ye.value
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "i", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm"])) : R("", !0)
                              ], 64))
                            ], 64);
                          }), 256))
                        ]),
                        _: 2
                      }, 1040, ["class", "data-i"])) : R("", !0)
                    ], 64))
                  ], 64))), 256))
                ], 10, Nl)) : fa.value ? (v(), $(qe(e.type), {
                  key: 3,
                  class: K(["lkt-table-items-container", e.itemsContainerClass])
                }, {
                  default: P(() => [
                    (v(!0), w(q, null, be(d.value, (S, m) => (v(), w(q, {
                      key: Qe(S, m)
                    }, [
                      pt(S) ? (v(), w("li", {
                        key: 0,
                        class: K(["lkt-table-item", It(S, m)]),
                        "data-i": m
                      }, [
                        O(e.$slots, "item", je({
                          [e.slotItemVar || ""]: S,
                          index: m,
                          editing: I.value,
                          canCreate: ye.value,
                          canRead: Ne.value,
                          canUpdate: Z.value,
                          canDrop: H.value,
                          isLoading: g.value,
                          doDrop: () => x(m)
                        }))
                      ], 10, Rl)) : R("", !0)
                    ], 64))), 128))
                  ]),
                  _: 3
                }, 8, ["class"])) : e.type === h(He).Carousel ? (v(), w("div", {
                  key: 4,
                  ref_key: "tableBody",
                  ref: D,
                  id: "lkt-table-body-" + h(Se),
                  class: K(["lkt-table-items-container", e.itemsContainerClass])
                }, [
                  he(h(Ka), oe({
                    modelValue: ae.value,
                    "onUpdate:modelValue": f[2] || (f[2] = (S) => ae.value = S)
                  }, e.carousel, {
                    "wrap-around": ((mt = e.carousel) == null ? void 0 : mt.infinite) === !0
                  }), {
                    addons: P(() => [
                      he(h(Qa)),
                      he(h(Za))
                    ]),
                    default: P(() => [
                      (v(!0), w(q, null, be(St.value, (S, m) => (v(), $(h(ea), {
                        key: S,
                        index: m
                      }, {
                        default: P(() => [
                          ve("div", Ml, [
                            O(e.$slots, S)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["index"]))), 128)),
                      (v(!0), w(q, null, be(d.value, (S, m) => (v(), $(h(ea), {
                        key: e.slide,
                        index: m
                      }, {
                        default: P(() => [
                          ve("div", Ol, [
                            O(e.$slots, "item", je({
                              [e.slotItemVar || ""]: S,
                              index: m,
                              editing: I.value,
                              canCreate: ye.value,
                              canRead: Ne.value,
                              canUpdate: Z.value,
                              canDrop: H.value,
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
                ], 10, Ll)) : R("", !0)
              ], 512), [
                [Fe, We.value]
              ]),
              !g.value && d.value.length === 0 ? (v(), w("div", $l, [
                h(l).empty ? O(e.$slots, "empty", { key: 0 }) : ma.value ? (v(), $(qe(ga.value), {
                  key: 1,
                  message: e.noResultsText
                }, null, 8, ["message"])) : e.noResultsText ? (v(), w(q, { key: 2 }, [
                  et(tt(e.noResultsText), 1)
                ], 64)) : R("", !0)
              ])) : R("", !0),
              g.value ? (v(), $(te, { key: 3 })) : R("", !0),
              ft.value || h(l).bottomButtons ? (v(), w("div", _l, [
                ft.value && d.value.length >= e.requiredItemsForBottomCreate ? (v(), $(Pt, {
                  key: 0,
                  config: le.value,
                  disabled: !vt.value,
                  onClick: dt,
                  onAppend: Pe
                }, null, 8, ["config", "disabled"])) : R("", !0),
                O(e.$slots, "bottom-buttons")
              ])) : R("", !0),
              e.paginator && Object.keys(e.paginator).length > 0 ? (v(), $(ce, oe({
                key: 5,
                ref_key: "paginatorRef",
                ref: W
              }, e.paginator, {
                modelValue: u.value,
                "onUpdate:modelValue": f[3] || (f[3] = (S) => u.value = S),
                onLoading: Vt,
                onPerms: Xe,
                onResponse: Q
              }), null, 16, ["modelValue"])) : R("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"]))
      ], 8, yl);
    };
  }
}), Gl = {
  install: (t) => {
    t.component("lkt-table") === void 0 && t.component("lkt-table", Pl);
  }
}, Xl = (t) => (fe.navButtonSlot = t, !0), Yl = (t) => (fe.createButtonSlot = t, !0), Kl = (t) => {
  fe.defaultEmptySlot = t;
};
export {
  Ql as Column,
  Zl as createColumn,
  Gl as default,
  Yl as setTableCreateButtonSlot,
  Kl as setTableEmptySlot,
  Xl as setTableNavButtonSlot
};
