import { defineComponent as ee, ref as k, watch as F, computed as d, resolveComponent as W, createBlock as S, createElementBlock as s, unref as y, openBlock as u, normalizeProps as oe, mergeProps as Q, withCtx as P, createTextVNode as ne, toDisplayString as ue, Fragment as L, withModifiers as it, createCommentVNode as c, resolveDynamicComponent as Z, useSlots as rt, normalizeClass as J, createElementVNode as _, createVNode as me, renderSlot as T, renderList as G, withDirectives as be, vShow as ge, mergeDefaults as Kt, onMounted as Wt, nextTick as Be, createSlots as nt } from "vue";
import { __ as dt } from "lkt-i18n";
import { SortDirection as ke, Column as st, ColumnType as ae, TableRowType as se, ensureButtonConfig as Pe, LktSettings as Le, extractI18nValue as zt, TablePermission as X, PaginatorType as Se, TableType as ye, getDefaultValues as Gt, Table as Jt, ButtonType as Ne } from "lkt-vue-kernel";
import { Column as na, createColumn as ua } from "lkt-vue-kernel";
import { replaceAll as pt, generateRandomString as Qt } from "lkt-string-tools";
import { DataState as Xt } from "lkt-data-state";
import Yt from "sortablejs";
import { time as pe } from "lkt-date-tools";
const Zt = (o, m, f, n) => {
  if (!f) return 0;
  let a = o[f.key], t = m[f.key];
  if (n === ke.Asc) {
    if (a > t) return 1;
    if (t > a) return -1;
  } else {
    if (a > t) return -1;
    if (t > a) return 1;
  }
  return 0;
}, ve = (o, m, f, n = []) => {
  if (o.extractTitleFromColumn) {
    let a = n.find((t) => t.key === o.extractTitleFromColumn);
    if (a)
      return ve(a, m, f, n);
  }
  if (o.formatter && typeof o.formatter == "function") {
    let a = o.formatter(m[o.key], m, o, f);
    return a.startsWith("__:") ? dt(a.substring(3)) : a;
  }
  return m[o.key];
}, xt = (o, m, f) => {
  if (!o.colspan) return -1;
  let n = m;
  return f.forEach((a) => {
    let t = Fe(o, a);
    t > 0 && t < n && (n = t);
  }), n;
}, Fe = (o, m) => o.colspan === !1 ? !1 : typeof o.colspan == "function" ? o.colspan(m) : o.colspan, el = (o, m) => typeof o.preferSlot > "u" ? !0 : o.preferSlot === !1 ? !1 : typeof o.preferSlot == "function" ? o.preferSlot(m) : !0, tl = (o, m, f) => {
  if (typeof o != "object" || !o.key || m.indexOf(o.key) > -1) return !1;
  let n = Fe(o, f);
  return typeof o.colspan > "u" ? !0 : (typeof o.colspan < "u" && (typeof o.colspan == "function" ? n = parseInt(o.colspan(f)) : n = parseInt(o.colspan)), n > 0);
}, ll = (o = []) => {
  if (o.length > 0) {
    for (let m = 0; m < o.length; ++m)
      if (o[m].sortable) return o[m].key;
  }
  return "";
}, al = (o, m) => {
  if (o.length > 0) {
    for (let f = 0; f < o.length; ++f)
      if (o[f].key === m) return o[f];
  }
  return null;
}, mt = (o) => o.type ? `is-${o.type}` : "", vt = /* @__PURE__ */ ee({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new st() },
    columns: { default: () => [] },
    i: { default: 0 },
    editModeEnabled: { type: Boolean, default: !1 },
    hasInlineEditPerm: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: m }) {
    const f = m, n = o, a = k(n.modelValue), t = k(a.value[n.column.key]), v = k(null);
    let D = n.column.type;
    [ae.Integer, ae.Float].includes(D) && (D = ae.Number), F(t, (l) => {
      const V = JSON.parse(JSON.stringify(a.value));
      V[n.column.key] = l, f("update:modelValue", V);
    }), F(() => n.modelValue, (l) => {
      a.value = l, t.value = a.value[n.column.key];
    });
    const g = d(() => ({ ...n.column.slotData, item: a.value })), C = d(() => {
      var l, V, j, O;
      if ((l = n.column.field) != null && l.modalData && typeof ((V = n.column.field) == null ? void 0 : V.modalData) == "object")
        for (let U in n.column.field.modalData)
          if (typeof ((j = n.column.field) == null ? void 0 : j.modalData[U]) == "string" && n.column.field.modalData[U].startsWith("prop:")) {
            let I = n.column.field.modalData[U].substring(5);
            a.value[I];
          } else
            n.column.field.modalData[U];
      return (O = n.column.field) == null ? void 0 : O.modalData;
    });
    return (l, V) => {
      var I, te, E, le;
      const j = W("lkt-anchor"), O = W("lkt-button"), U = W("lkt-field");
      return l.column.type === y(ae).Anchor ? (u(), S(j, oe(Q({ key: 0 }, l.column.anchor)), {
        default: P(() => [
          ne(ue(y(ve)(l.column, a.value, l.i)), 1)
        ]),
        _: 1
      }, 16)) : l.column.type === y(ae).Button ? (u(), S(O, Q({ key: 1 }, l.column.button, { prop: a.value }), {
        default: P(() => [
          ne(ue(y(ve)(l.column, a.value, l.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : l.column.type === y(ae).Field && l.hasInlineEditPerm ? (u(), S(U, Q({ key: 2 }, l.column.field, {
        "read-mode": !l.column.editable || !l.editModeEnabled,
        ref: (H) => v.value = H,
        "slot-data": g.value,
        label: ((I = l.column.field) == null ? void 0 : I.type) === "switch" || ((te = l.column.field) == null ? void 0 : te.type) === "check" ? l.column.label : "",
        "modal-data": C.value,
        prop: a.value,
        modelValue: t.value,
        "onUpdate:modelValue": V[0] || (V[0] = (H) => t.value = H)
      }), null, 16, ["read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : l.column.type === y(ae).Field ? (u(), S(U, Q({ key: 3 }, l.column.field, {
        "read-mode": "",
        ref: (H) => v.value = H,
        "slot-data": g.value,
        label: ((E = l.column.field) == null ? void 0 : E.type) === "switch" || ((le = l.column.field) == null ? void 0 : le.type) === "check" ? l.column.label : "",
        "modal-data": C.value,
        prop: a.value,
        "model-value": t.value
      }), null, 16, ["slot-data", "label", "modal-data", "prop", "model-value"])) : (u(), s(L, { key: 4 }, [
        ne(ue(y(ve)(l.column, a.value, l.i, l.columns)), 1)
      ], 64));
    };
  }
}), Y = class Y {
};
Y.navButtonSlot = "", Y.dropButtonSlot = "", Y.editButtonSlot = "", Y.createButtonSlot = "", Y.defaultEmptySlot = void 0, Y.defaultSaveIcon = "", Y.defaultNoResultsMessage = "No results";
let $ = Y;
const ol = /* @__PURE__ */ ee({
  __name: "DropButton",
  props: {
    config: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(o, { emit: m }) {
    const f = m, n = o, a = d(() => $.dropButtonSlot !== ""), t = d(() => $.dropButtonSlot);
    return (v, D) => {
      var C, l;
      const g = W("lkt-button");
      return u(), S(g, Q({ palette: "table-delete" }, n.config, {
        icon: a.value ? "" : (C = v.config) == null ? void 0 : C.icon,
        text: a.value ? "" : (l = v.config) == null ? void 0 : l.text,
        disabled: v.disabled,
        onClick: D[0] || (D[0] = it((V) => f("click"), ["prevent", "stop"]))
      }), {
        default: P(() => [
          a.value ? (u(), S(Z(t.value), { key: 0 })) : c("", !0)
        ]),
        _: 1
      }, 16, ["icon", "text", "disabled"]);
    };
  }
}), nl = /* @__PURE__ */ ee({
  __name: "EditButton",
  props: {
    config: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(o, { emit: m }) {
    const f = m, n = o, a = d(() => $.editButtonSlot !== ""), t = d(() => $.editButtonSlot);
    return (v, D) => {
      var C, l;
      const g = W("lkt-button");
      return u(), S(g, Q({ palette: "table-delete" }, n.config, {
        icon: a.value ? "" : (C = v.config) == null ? void 0 : C.icon,
        text: a.value ? "" : (l = v.config) == null ? void 0 : l.text,
        disabled: v.disabled,
        onClick: D[0] || (D[0] = it((V) => f("click"), ["prevent", "stop"]))
      }), {
        default: P(() => [
          a.value ? (u(), S(Z(t.value), { key: 0 })) : c("", !0)
        ]),
        _: 1
      }, 16, ["icon", "text", "disabled"]);
    };
  }
}), ul = ["data-i", "data-draggable"], il = ["data-i"], rl = {
  key: 1,
  "data-role": "invalid-drag-indicator"
}, dl = {
  key: 2,
  class: "lkt-table-nav-cell"
}, sl = { class: "lkt-table-nav-container" }, pl = ["colspan"], ml = ["colspan"], vl = ["data-column", "colspan", "title"], fl = {
  key: 7,
  class: "lkt-table-col-drop"
}, cl = {
  key: 8,
  class: "lkt-table-col-edit"
}, yl = /* @__PURE__ */ ee({
  __name: "LktTableRow",
  props: {
    modelValue: { default: () => ({}) },
    editButton: {},
    dropButton: {},
    isDraggable: { type: Boolean, default: !0 },
    sortable: { type: Boolean, default: !0 },
    displayHiddenColumnsIndicator: { type: Boolean, default: !1 },
    hiddenIsVisible: { type: Boolean, default: !1 },
    addNavigation: { type: Boolean, default: !1 },
    latestRow: { type: Boolean, default: !1 },
    canDrop: { type: Boolean, default: !1 },
    canEdit: { type: Boolean, default: !1 },
    editModeEnabled: { type: Boolean, default: !1 },
    hasInlineEditPerm: { type: Boolean },
    i: { default: 0 },
    visibleColumns: { default: () => [] },
    emptyColumns: { default: () => [] },
    rowDisplayType: { type: [Number, Function], default: se.Auto },
    renderDrag: { type: [Boolean, Function], default: !0 },
    disabledDrag: { type: [Boolean, Function], default: !0 }
  },
  emits: ["update:modelValue", "click", "show", "item-up", "item-down", "item-drop"],
  setup(o, { emit: m }) {
    var x;
    const f = rt(), n = m, a = o, t = k(a.modelValue);
    let v = typeof a.rowDisplayType == "function" ? a.rowDisplayType(t.value, a.i) : a.rowDisplayType;
    v || (v = se.Auto);
    const D = [se.Auto, se.PreferCustomItem].includes(v), g = [se.Auto, se.PreferItem].includes(v), C = k((x = a.editButton.anchor) == null ? void 0 : x.to);
    for (let i in t.value) C.value = pt(C.value, ":" + i, t.value[i]);
    const l = (i) => n("click", i), V = (i, p) => {
      n("show", i, p);
    }, j = d(() => {
      let i = [], p = !1;
      return typeof a.disabledDrag == "function" ? p = a.disabledDrag(t.value) : p = De.value === !0, !p && a.sortable && a.isDraggable ? i.push("handle") : p && i.push("disabled"), i.join(" ");
    }), O = d(() => $.navButtonSlot !== ""), U = d(() => $.navButtonSlot), I = () => {
      n("item-up", a.i);
    }, te = () => {
      n("item-down", a.i);
    }, E = () => {
      n("item-drop", a.i);
    }, le = () => {
    };
    F(() => a.modelValue, (i) => t.value = i), F(t, (i) => {
      n("update:modelValue", i);
    }, { deep: !0 });
    const H = d(() => typeof a.renderDrag == "function" ? a.renderDrag(t.value) : a.renderDrag === !0), De = d(() => typeof a.disabledDrag == "function" ? a.disabledDrag(t.value) : a.disabledDrag === !0);
    return (i, p) => {
      const q = W("lkt-button");
      return u(), s("tr", {
        "data-i": i.i,
        "data-draggable": i.isDraggable,
        class: J({ "type-custom-item": y(D), "type-item": y(g) })
      }, [
        i.sortable && i.isDraggable && i.editModeEnabled && H.value ? (u(), s("td", {
          key: 0,
          "data-role": "drag-indicator",
          class: J(j.value),
          "data-i": i.i
        }, null, 10, il)) : i.sortable && i.editModeEnabled && H.value ? (u(), s("td", rl)) : c("", !0),
        i.addNavigation && i.editModeEnabled ? (u(), s("td", dl, [
          _("div", sl, [
            me(q, {
              palette: "table-nav",
              disabled: i.i === 0,
              onClick: I
            }, {
              default: P(() => [
                O.value ? (u(), S(Z(U.value), {
                  key: 0,
                  direction: "up"
                })) : (u(), s(L, { key: 1 }, [
                  p[3] || (p[3] = _("i", { class: "" }, null, -1)),
                  p[4] || (p[4] = ne(" UP "))
                ], 64))
              ]),
              _: 1
            }, 8, ["disabled"]),
            me(q, {
              palette: "table-nav",
              disabled: i.latestRow,
              onClick: te
            }, {
              default: P(() => [
                O.value ? (u(), S(Z(U.value), {
                  key: 0,
                  direction: "down"
                })) : (u(), s(L, { key: 1 }, [
                  p[5] || (p[5] = _("i", { class: "" }, null, -1)),
                  p[6] || (p[6] = ne(" DOWN "))
                ], 64))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : c("", !0),
        i.displayHiddenColumnsIndicator ? (u(), s("td", {
          key: 3,
          onClick: p[0] || (p[0] = (w) => V(w, i.i)),
          "data-role": "show-more",
          class: J(i.hiddenIsVisible ? "state-open" : "")
        }, null, 2)) : c("", !0),
        y(D) && y(f)[`item-${i.i}`] ? (u(), s("td", {
          key: "td" + i.i,
          colspan: i.visibleColumns.length
        }, [
          T(i.$slots, `item-${i.i}`, {
            item: t.value,
            index: i.i
          })
        ], 8, pl)) : y(g) && y(f).item ? (u(), s("td", {
          key: "td" + i.i,
          colspan: i.visibleColumns.length
        }, [
          T(i.$slots, "item", {
            item: t.value,
            index: i.i
          })
        ], 8, ml)) : (u(!0), s(L, { key: 6 }, G(i.visibleColumns, (w) => (u(), s(L, null, [
          y(tl)(w, i.emptyColumns, t.value) ? (u(), s("td", {
            key: "td" + i.i,
            "data-column": w.key,
            colspan: y(Fe)(w, t.value),
            title: y(ve)(w, t.value, i.i, i.visibleColumns),
            class: J(y(mt)(w)),
            onClick: p[2] || (p[2] = (N) => l(N))
          }, [
            i.$slots[w.key] && y(el)(w, t.value) ? T(i.$slots, w.key, {
              key: 0,
              value: t.value[w.key],
              item: t.value,
              column: w,
              i: i.i
            }) : t.value ? (u(), S(vt, {
              key: 1,
              modelValue: t.value,
              "onUpdate:modelValue": p[1] || (p[1] = (N) => t.value = N),
              column: w,
              columns: i.visibleColumns,
              "edit-mode-enabled": i.editModeEnabled,
              "has-inline-edit-perm": i.hasInlineEditPerm,
              i: i.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : c("", !0)
          ], 10, vl)) : c("", !0)
        ], 64))), 256)),
        i.canDrop && i.editModeEnabled ? (u(), s("td", fl, [
          me(ol, {
            config: i.dropButton,
            onClick: E
          }, null, 8, ["config"])
        ])) : c("", !0),
        i.canEdit && i.editModeEnabled ? (u(), s("td", cl, [
          me(nl, {
            config: i.editButton,
            onClick: le
          }, null, 8, ["config"])
        ])) : c("", !0)
      ], 10, ul);
    };
  }
}), bl = { "data-role": "hidden-row" }, gl = ["colspan"], kl = ["data-column"], hl = ["data-i"], Cl = ["data-column", "title"], Bl = /* @__PURE__ */ ee({
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
  emits: ["update:modelValue", "click"],
  setup(o, { emit: m }) {
    const f = m, n = o, a = k(n.modelValue), t = (v) => f("click", v);
    return F(() => n.modelValue, (v) => a.value = v), F(a, () => f("update:modelValue", a.value)), (v, D) => be((u(), s("tr", bl, [
      _("td", { colspan: v.hiddenColumnsColSpan }, [
        _("table", null, [
          _("tr", null, [
            (u(!0), s(L, null, G(v.hiddenColumns, (g) => (u(), s("th", {
              "data-column": g.key
            }, [
              _("div", null, ue(g.label), 1)
            ], 8, kl))), 256))
          ]),
          _("tr", { "data-i": v.i }, [
            (u(!0), s(L, null, G(v.hiddenColumns, (g, C) => (u(), s("td", {
              "data-column": g.key,
              title: y(ve)(g, a.value, C, v.hiddenColumns),
              onClick: D[1] || (D[1] = (l) => t(l))
            }, [
              v.$slots[g.key] ? T(v.$slots, g.key, {
                key: 0,
                value: a.value[g.key],
                item: a.value,
                column: g,
                i: C
              }) : (u(), S(vt, {
                key: 1,
                column: g,
                columns: v.hiddenColumns,
                modelValue: a.value,
                "onUpdate:modelValue": D[0] || (D[0] = (l) => a.value = l),
                i: C,
                "edit-mode-enabled": v.editModeEnabled,
                "has-inline-edit-perm": v.hasInlineEditPerm
              }, null, 8, ["column", "columns", "modelValue", "i", "edit-mode-enabled", "has-inline-edit-perm"]))
            ], 8, Cl))), 256))
          ], 8, hl)
        ])
      ], 8, gl)
    ], 512)), [
      [ge, v.hiddenIsVisible]
    ]);
  }
}), ut = /* @__PURE__ */ ee({
  __name: "CreateButton",
  props: {
    config: { default: void 0 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["click", "append"],
  setup(o, { emit: m }) {
    var C;
    const f = m, n = o, a = d(() => $.createButtonSlot !== ""), t = d(() => $.createButtonSlot), v = {
      ...(C = n.config) == null ? void 0 : C.modalData,
      beforeClose: (l) => {
        "itemCreated" in l && l.itemCreated === !0 && f("append", l.item);
      }
    }, D = {
      ...n.config
    };
    D.modalData = v;
    const g = () => {
      var l;
      if (!((l = n.config) != null && l.modal)) {
        f("click");
        return;
      }
    };
    return (l, V) => {
      const j = W("lkt-button");
      return u(), S(j, Q(D, {
        disabled: l.disabled,
        onClick: g
      }), {
        default: P(() => [
          a.value ? (u(), S(Z(t.value), { key: 0 })) : c("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), Sl = ["data-column", "data-sortable", "data-sort", "colspan", "title"], Dl = /* @__PURE__ */ ee({
  __name: "TableHeader",
  props: {
    column: { default: () => new st() },
    sortBy: { default: "" },
    sortDirection: { default: "" },
    amountOfColumns: { default: 0 },
    items: { default: () => [] }
  },
  emits: ["click"],
  setup(o, { emit: m }) {
    const f = m, n = o, a = d(() => xt(n.column, n.amountOfColumns, n.items)), t = d(() => n.column.sortable === !0), v = d(() => t.value && n.sortBy === n.column.key ? n.sortDirection : ""), D = d(() => n.column.label.startsWith("__:") ? dt(n.column.label.substring(3)) : n.column.label), g = () => f("click", n.column);
    return (C, l) => (u(), s("th", {
      "data-column": C.column.key,
      "data-sortable": t.value,
      "data-sort": v.value,
      colspan: a.value,
      title: D.value,
      class: J(y(mt)(C.column)),
      onClick: g
    }, [
      _("div", null, ue(D.value), 1)
    ], 10, Sl));
  }
}), Il = ["id"], Vl = {
  key: 0,
  class: "lkt-table-page-buttons"
}, El = { class: "switch-edition-mode" }, wl = {
  key: 1,
  class: "lkt-table-page-buttons"
}, Tl = {
  key: 2,
  class: "lkt-table-page-filters"
}, $l = { class: "lkt-table" }, Ml = { key: 0 }, Rl = {
  key: 0,
  "data-role": "drag-indicator"
}, Pl = { key: 1 }, Ll = { key: 2 }, Nl = {
  key: 3,
  class: "lkt-table-col-drop"
}, Fl = {
  key: 4,
  class: "lkt-table-col-edit"
}, Ol = ["id"], Ul = ["id"], Al = ["data-i"], _l = ["data-i"], jl = {
  key: 3,
  class: "lkt-table-empty"
}, Hl = {
  key: 5,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, ql = /* @__PURE__ */ ee({
  __name: "LktTable",
  props: /* @__PURE__ */ Kt({
    modelValue: {},
    type: {},
    columns: {},
    noResultsText: {},
    hideEmptyColumns: { type: Boolean },
    itemDisplayChecker: { type: Function },
    rowDisplayType: { type: [Number, Function] },
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
    wrapContentTag: {},
    wrapContentClass: {},
    itemsContainerClass: {},
    addNavigation: { type: Boolean },
    newValueGenerator: { type: Function },
    requiredItemsForTopCreate: {},
    requiredItemsForBottomCreate: {},
    slotItemVar: {},
    createEnabledValidator: { type: Function }
  }, Gt(Jt)),
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
  setup(o, { expose: m, emit: f }) {
    var ot;
    const n = f, a = rt(), t = o, v = {}, D = k(typeof t.sorter == "function" ? t.sorter : Zt), g = k(ll(t.columns)), C = k(ke.Asc), l = k(t.modelValue), V = k(v), j = k(null), O = k(t.columns), U = k((ot = t.paginator) == null ? void 0 : ot.modelValue), I = k(t.loading), te = k(!1), E = k(t.perms), le = k(null), H = k(null), De = k(null), x = k({}), i = k(new Xt({ items: l.value }, t.dataStateConfig)), p = k(t.editMode), q = k(0), w = k(null), N = k(Pe(t.saveButton, Le.defaultSaveButton)), Oe = k(Pe(t.createButton, Le.defaultCreateButton)), ft = k(Pe(t.editModeButton, Le.defaultEditModeButton)), ie = k(!1);
    F(I, (e) => n("update:loading", e)), F(U, (e) => n("page", e));
    const ct = (e) => {
      E.value = e;
    }, yt = (e) => {
      var r;
      Array.isArray(e.data) && ((!t.paginator || ![Se.LoadMore, Se.Infinite].includes((r = t.paginator) == null ? void 0 : r.type)) && l.value.splice(0, l.value.length), l.value = [...l.value, ...e.data]), I.value = !1, te.value = !0, i.value.store({ items: l.value }).turnStoredIntoOriginal(), ie.value = !1, Be(() => {
        q.value = pe(), Ee.value, n("read-response", e);
      });
    }, bt = () => Be(() => I.value = !0), gt = () => {
      le.value.doRefresh();
    }, fe = Qt(12), Ie = d(() => {
      if (!t.hideEmptyColumns) return [];
      let e = [];
      return O.value.forEach((r) => {
        let h = r.key, M = !1;
        l.value.forEach((A) => {
          if (typeof A.checkEmpty == "function")
            return A.checkEmpty(A);
          A[h] && (M = !0);
        }), M || e.push(h);
      }), e;
    }), he = d(() => O.value.filter((e) => !e.hidden)), Ve = d(() => O.value.filter((e) => e.hidden)), kt = d(() => {
      let e = he.value.length + 1;
      return t.sortable && ++e, e;
    }), ht = d(() => O.value.filter((e) => e.isForRowKey)), Ue = d(() => Ve.value.length > 0 && !t.sortable), Ct = d(() => O.value.map((e) => e.key)), Ae = d(() => {
      let e = [];
      for (let r in a) Ct.value.indexOf(r) !== -1 && e.push(r);
      return e;
    }), _e = d(() => {
      var e;
      return t.hiddenSave || I.value || !((e = N.value) != null && e.resource || N.value.type) ? !1 : p.value && ie.value ? !0 : p.value;
    }), Bt = d(() => Ce.value && l.value.length >= t.requiredItemsForTopCreate || We.value ? !0 : _e.value || p.value && ce.value), Ee = d(() => {
      var e, r;
      return q.value, typeof ((e = N.value) == null ? void 0 : e.disabled) == "function" ? N.value.disabled({
        value: l.value,
        dataState: i.value
      }) : typeof ((r = N.value) == null ? void 0 : r.disabled) == "boolean" ? N.value.disabled : !ie.value;
    }), St = d(() => l.value.length), Dt = d(() => {
      var e;
      return {
        items: l.value,
        ...(e = N.value) == null ? void 0 : e.resourceData
      };
    }), It = d(() => t.titleTag === "" ? "h2" : t.titleTag), Vt = d(() => t.wrapContentTag === "" ? "div" : t.wrapContentTag), we = d(() => zt(t.title)), Te = d(() => {
      var e;
      return (e = t.drag) == null ? void 0 : e.enabled;
    }), ce = d(() => E.value.includes(X.Create)), je = d(() => E.value.includes("read")), re = d(() => E.value.includes(X.Update)), He = d(() => E.value.includes(X.Edit)), qe = d(() => E.value.includes(X.InlineEdit)), Et = d(() => E.value.includes(X.ModalCreate)), wt = d(() => E.value.includes(X.InlineCreate)), Ke = d(() => E.value.includes(X.InlineCreateEver)), de = d(() => E.value.includes(X.Drop)), Tt = d(() => E.value.includes(X.SwitchEditMode)), We = d(() => !Tt.value || !re.value && !de.value || !re.value && de.value ? !1 : !I.value), $t = d(() => {
      var e;
      return (typeof ((e = t.paginator) == null ? void 0 : e.type) < "u" && [Se.LoadMore, Se.Infinite].includes(t.paginator.type) || !I.value) && l.value.length > 0;
    }), Mt = (e) => {
      let r = e.target;
      if (typeof r.dataset.column > "u")
        do
          r = r.parentNode;
        while (typeof r.dataset.column > "u" && r.tagName !== "TABLE" && r.tagName !== "body");
      if (r.tagName === "TD" && (r = r.parentNode, r = r.dataset.i, typeof r < "u"))
        return l.value[r];
    }, Rt = (e) => l.value[e], Pt = (e) => {
      var r;
      return (r = j.value) == null ? void 0 : r.querySelector(`[data-i="${e}"]`);
    }, ze = (e) => V.value["tr_" + e] === !0, Ge = (e) => {
      e && e.sortable && (l.value = l.value.sort((r, h) => D.value(r, h, e, C.value)), C.value = C.value === ke.Asc ? ke.Desc : ke.Asc, g.value = e.key, n("sort", [g.value, C.value]));
    }, Je = (e) => {
      n("click", e);
    }, Qe = (e, r) => {
      let h = "tr_" + r;
      V.value[h] = typeof V.value[h] > "u" ? !0 : !V.value[h];
    }, Lt = (e) => {
      var h, M, A, K, B, b, R, z;
      let r = parseInt((K = (A = (M = (h = e == null ? void 0 : e.originalEvent) == null ? void 0 : h.toElement) == null ? void 0 : M.closest("tr")) == null ? void 0 : A.dataset) == null ? void 0 : K.i);
      return !(typeof ((B = t.drag) == null ? void 0 : B.isValid) == "function" && !((b = t.drag) != null && b.isValid(l.value[r])) || typeof ((R = t.drag) == null ? void 0 : R.isValid) == "boolean" && !((z = t.drag) != null && z.isValid));
    }, Xe = (e) => {
      var r, h;
      return typeof ((r = t.drag) == null ? void 0 : r.isDraggable) == "function" ? (h = t.drag) == null ? void 0 : h.isDraggable(e) : !0;
    }, Ye = () => {
      if (ce.value) {
        n("click-create");
        return;
      }
      if (Ke.value)
        n("click-create");
      else {
        if (typeof t.newValueGenerator == "function") {
          let e = t.newValueGenerator();
          if (typeof e == "object" || t.type !== ye.Table) {
            l.value.push(e);
            return;
          }
        }
        l.value.push({});
      }
    }, Ze = (e) => {
      l.value.push(e);
    }, xe = () => I.value = !0, et = () => I.value = !1, Nt = (e, r) => {
      var h, M, A;
      if (!((h = N.value) != null && h.type && [
        Ne.Split,
        Ne.SplitEver,
        Ne.SplitLazy
      ].includes((M = N.value) == null ? void 0 : M.type))) {
        if (n("before-save"), (A = N.value) != null && A.resource && (I.value = !1, !r.success)) {
          n("error", r.httpStatus);
          return;
        }
        i.value.turnStoredIntoOriginal(), ie.value = !1, n("save", r);
      }
    }, tt = (e, r, h) => {
      if (h >= e.length) {
        let M = h - e.length + 1;
        for (; M--; ) e.push(void 0);
      }
      return e.splice(h, 0, e.splice(r, 1)[0]), e;
    }, Ft = (e) => {
      tt(l.value, e, e - 1), q.value = pe();
    }, Ot = (e) => {
      tt(l.value, e, e + 1), q.value = pe();
    }, $e = (e) => {
      l.value.splice(e, 1), q.value = pe();
    }, Ut = () => {
      var e;
      x.value && typeof ((e = x.value) == null ? void 0 : e.destroy) == "function" && (x.value.destroy(), x.value = {});
    }, lt = () => {
      w.value || (w.value = document.getElementById("lkt-table-body-" + fe)), x.value = new Yt(w.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let r = e.oldIndex, h = e.newIndex;
          l.value.splice(h, 0, l.value.splice(r, 1)[0]), q.value = pe(), n("drag-end", l.value[h]);
        },
        onMove: function(e, r) {
          return Lt(e);
        }
      });
    }, Me = (e, r, h = !1) => {
      let M = [q.value, fe, "row", r];
      return h && M.push("hidden"), ht.value.forEach((A) => {
        let K = String(e[A.key]).toLowerCase();
        K.length > 50 && (K = K.substring(0, 50)), K = pt(K, " ", "-"), M.push(K);
      }), M.join("-");
    }, at = d(() => typeof t.createEnabledValidator == "function" ? t.createEnabledValidator({ items: l.value }) : !0), Ce = d(() => Ke.value || ce.value && p.value || wt.value && p.value || Et.value && p.value), At = d(() => [ye.Ol, ye.Ul].includes(t.type)), Re = (e, r) => typeof t.itemDisplayChecker == "function" ? t.itemDisplayChecker(e) : !0;
    Wt(() => {
      var e;
      t.initialSorting && Ge(al(t.columns, g.value)), i.value.store({ items: l.value }).turnStoredIntoOriginal(), ie.value = !1, (e = t.drag) != null && e.enabled && Be(() => {
        lt();
      });
    }), F(() => {
      var e;
      return (e = t.drag) == null ? void 0 : e.enabled;
    }, (e) => {
      e ? lt() : Ut();
    }), F(() => t.perms, (e) => E.value = e), F(E, (e) => n("update:perms", e)), F(() => t.editMode, (e) => p.value = e), F(() => t.columns, (e) => O.value = e, { deep: !0 }), F(() => t.modelValue, (e) => l.value = e, { deep: !0 }), F(l, (e) => {
      i.value.increment({ items: e }), ie.value = i.value.changed(), n("update:modelValue", e);
    }, { deep: !0 }), m({
      getItemByEvent: Mt,
      getItemByIndex: Rt,
      getRowByIndex: Pt,
      doRefresh: gt,
      getHtml: () => H.value,
      turnStoredIntoOriginal: () => {
        i.value.turnStoredIntoOriginal(), Be(() => {
          q.value = pe();
        });
      }
    });
    const _t = d(() => typeof $.defaultEmptySlot < "u"), jt = d(() => $.defaultEmptySlot), Ht = d(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled ? !1 : typeof t.drag.canRender > "u" ? !0 : t.drag.canRender), qt = d(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled || typeof t.drag.isDisabled > "u" ? !1 : t.drag.isDisabled);
    return (e, r) => {
      const h = W("lkt-button"), M = W("lkt-field"), A = W("lkt-loader"), K = W("lkt-paginator");
      return u(), s("section", {
        ref_key: "element",
        ref: H,
        class: "lkt-table-page",
        id: "lkt-table-page-" + y(fe)
      }, [
        we.value || y(a).title ? (u(), s("header", {
          key: 0,
          class: J(e.headerClass)
        }, [
          we.value ? (u(), S(Z(It.value), { key: 0 }, {
            default: P(() => [
              e.titleIcon ? (u(), s("i", {
                key: 0,
                class: J(e.titleIcon)
              }, null, 2)) : c("", !0),
              ne(" " + ue(we.value), 1)
            ]),
            _: 1
          })) : c("", !0),
          y(a).title ? T(e.$slots, "title", { key: 1 }) : c("", !0)
        ], 2)) : c("", !0),
        (u(), S(Z(Vt.value), {
          class: J(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: P(() => [
            Bt.value ? (u(), s("div", Vl, [
              be(me(h, Q({
                class: "lkt-table--save-button",
                ref_key: "saveButtonRef",
                ref: De
              }, N.value, {
                disabled: Ee.value,
                "modal-data": Dt.value,
                onLoading: xe,
                onLoaded: et,
                onClick: Nt
              }), {
                split: P(({ doClose: B, doRootClick: b }) => [
                  T(e.$slots, "button-save-split", {
                    doClose: B,
                    doRootClick: b,
                    dataState: i.value,
                    onButtonLoading: xe,
                    onButtonLoaded: et
                  })
                ]),
                default: P(() => [
                  y(a)["button-save"] ? T(e.$slots, "button-save", {
                    key: 0,
                    items: l.value,
                    editMode: e.editMode,
                    canUpdate: !Ee.value
                  }) : c("", !0)
                ]),
                _: 3
              }, 16, ["disabled", "modal-data"]), [
                [ge, _e.value]
              ]),
              Ce.value && l.value.length >= e.requiredItemsForTopCreate ? (u(), S(ut, {
                key: 0,
                config: Oe.value,
                disabled: !at.value,
                onClick: Ye,
                onAppend: Ze
              }, null, 8, ["config", "disabled"])) : c("", !0),
              _("div", El, [
                be(me(M, Q(ft.value, {
                  modelValue: p.value,
                  "onUpdate:modelValue": r[0] || (r[0] = (B) => p.value = B)
                }), null, 16, ["modelValue"]), [
                  [ge, We.value]
                ])
              ])
            ])) : c("", !0),
            y(a).buttons ? (u(), s("div", wl, [
              T(e.$slots, "buttons")
            ])) : c("", !0),
            te.value && y(a).filters ? (u(), s("div", Tl, [
              T(e.$slots, "filters", {
                items: l.value,
                isLoading: I.value
              })
            ])) : c("", !0),
            be(_("div", $l, [
              e.type === y(ye).Table ? (u(), s("table", Ml, [
                _("thead", null, [
                  _("tr", null, [
                    Te.value && p.value ? (u(), s("th", Rl)) : c("", !0),
                    e.addNavigation && p.value ? (u(), s("th", Pl)) : c("", !0),
                    Ue.value ? (u(), s("th", Ll)) : c("", !0),
                    (u(!0), s(L, null, G(he.value, (B) => (u(), s(L, null, [
                      Ie.value.indexOf(B.key) === -1 ? (u(), S(Dl, {
                        key: 0,
                        column: B,
                        "sort-by": g.value,
                        "sort-direction": C.value,
                        "amount-of-columns": e.columns.length,
                        items: l.value,
                        onClick: (b) => Ge(B)
                      }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : c("", !0)
                    ], 64))), 256)),
                    de.value && p.value ? (u(), s("th", Nl)) : c("", !0),
                    He.value && re.value && p.value ? (u(), s("th", Fl)) : c("", !0)
                  ])
                ]),
                _("tbody", {
                  ref_key: "tableBody",
                  ref: j,
                  id: "lkt-table-body-" + y(fe)
                }, [
                  (u(!0), s(L, null, G(l.value, (B, b) => be((u(), S(yl, {
                    modelValue: l.value[b],
                    "onUpdate:modelValue": (R) => l.value[b] = R,
                    key: Me(B, b),
                    i: b,
                    "drop-button": e.dropButton,
                    "edit-button": e.editButton,
                    "display-hidden-columns-indicator": Ue.value,
                    "is-draggable": Xe(B),
                    sortable: Te.value,
                    "visible-columns": he.value,
                    "empty-columns": Ie.value,
                    "add-navigation": e.addNavigation,
                    "hidden-is-visible": ze(b),
                    "latest-row": b + 1 === St.value,
                    "can-drop": de.value && p.value,
                    "can-edit": He.value && re.value && p.value,
                    "edit-mode-enabled": p.value,
                    "has-inline-edit-perm": qe.value,
                    "row-display-type": e.rowDisplayType,
                    "render-drag": Ht.value,
                    "disabled-drag": qt.value,
                    onClick: Je,
                    onShow: Qe,
                    onItemUp: Ft,
                    onItemDown: Ot,
                    onItemDrop: $e
                  }, nt({ _: 2 }, [
                    y(a)[`item-${b}`] ? {
                      name: `item-${b}`,
                      fn: P((R) => [
                        T(e.$slots, `item-${b}`, oe({
                          [e.slotItemVar || ""]: R.item,
                          index: b
                        }))
                      ]),
                      key: "0"
                    } : y(a).item ? {
                      name: "item",
                      fn: P((R) => [
                        T(e.$slots, "item", oe({
                          [e.slotItemVar || ""]: R.item,
                          index: b
                        }))
                      ]),
                      key: "1"
                    } : void 0,
                    G(Ae.value, (R) => ({
                      name: R,
                      fn: P((z) => [
                        T(e.$slots, R, oe({
                          [e.slotItemVar || ""]: z.item,
                          value: z.value,
                          column: z.column
                        }))
                      ])
                    }))
                  ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "drop-button", "edit-button", "display-hidden-columns-indicator", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "hidden-is-visible", "latest-row", "can-drop", "can-edit", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag"])), [
                    [ge, Re(l.value[b])]
                  ])), 128)),
                  Ve.value.length > 0 ? (u(!0), s(L, { key: 0 }, G(l.value, (B, b) => (u(), S(Bl, {
                    modelValue: l.value[b],
                    "onUpdate:modelValue": (R) => l.value[b] = R,
                    key: Me(B, b, !0),
                    i: b,
                    "hidden-columns": Ve.value,
                    "hidden-columns-col-span": kt.value,
                    "is-draggable": Xe(B),
                    sortable: Te.value,
                    "visible-columns": he.value,
                    "empty-columns": Ie.value,
                    "hidden-is-visible": ze(b),
                    "edit-mode-enabled": p.value,
                    "has-inline-edit-perm": qe.value,
                    onClick: Je,
                    onShow: Qe
                  }, nt({ _: 2 }, [
                    G(Ae.value, (R) => ({
                      name: R,
                      fn: P((z) => [
                        T(e.$slots, R, oe({
                          [e.slotItemVar || ""]: z.item,
                          value: z.value,
                          column: z.column
                        }))
                      ])
                    }))
                  ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "hidden-columns", "hidden-columns-col-span", "is-draggable", "sortable", "visible-columns", "empty-columns", "hidden-is-visible", "edit-mode-enabled", "has-inline-edit-perm"]))), 128)) : c("", !0)
                ], 8, Ol)
              ])) : e.type === y(ye).Item ? (u(), s("div", {
                key: 1,
                ref_key: "tableBody",
                ref: j,
                id: "lkt-table-body-" + y(fe),
                class: J(["lkt-table-items-container", e.itemsContainerClass])
              }, [
                (u(!0), s(L, null, G(l.value, (B, b) => (u(), s(L, null, [
                  Re(B) ? (u(), s("div", {
                    class: "lkt-table-item",
                    "data-i": b,
                    key: Me(B, b)
                  }, [
                    T(e.$slots, "item", oe({
                      [e.slotItemVar || ""]: B,
                      index: b,
                      editing: p.value,
                      canCreate: ce.value,
                      canRead: je.value,
                      canUpdate: re.value,
                      canDrop: de.value,
                      isLoading: I.value,
                      doDrop: () => $e(b)
                    }))
                  ], 8, Al)) : c("", !0)
                ], 64))), 256))
              ], 10, Ul)) : At.value ? (u(), S(Z(e.type), {
                key: 2,
                class: J(["lkt-table-items-container", e.itemsContainerClass])
              }, {
                default: P(() => [
                  (u(!0), s(L, null, G(l.value, (B, b) => (u(), s(L, null, [
                    Re(B) ? (u(), s("li", {
                      key: 0,
                      class: "lkt-table-item",
                      "data-i": b
                    }, [
                      T(e.$slots, "item", oe({
                        [e.slotItemVar || ""]: B,
                        index: b,
                        editing: p.value,
                        canCreate: ce.value,
                        canRead: je.value,
                        canUpdate: re.value,
                        canDrop: de.value,
                        isLoading: I.value,
                        doDrop: () => $e(b)
                      }))
                    ], 8, _l)) : c("", !0)
                  ], 64))), 256))
                ]),
                _: 3
              }, 8, ["class"])) : c("", !0)
            ], 512), [
              [ge, $t.value]
            ]),
            !I.value && l.value.length === 0 ? (u(), s("div", jl, [
              y(a).empty ? T(e.$slots, "empty", { key: 0 }) : _t.value ? (u(), S(Z(jt.value), {
                key: 1,
                message: e.noResultsText
              }, null, 8, ["message"])) : e.noResultsText ? (u(), s(L, { key: 2 }, [
                ne(ue(e.noResultsText), 1)
              ], 64)) : c("", !0)
            ])) : c("", !0),
            I.value ? (u(), S(A, { key: 4 })) : c("", !0),
            Ce.value || y(a).bottomButtons ? (u(), s("div", Hl, [
              Ce.value && l.value.length >= e.requiredItemsForBottomCreate ? (u(), S(ut, {
                key: 0,
                config: Oe.value,
                disabled: !at.value,
                onClick: Ye,
                onAppend: Ze
              }, null, 8, ["config", "disabled"])) : c("", !0),
              T(e.$slots, "bottom-buttons")
            ])) : c("", !0),
            e.paginator && Object.keys(e.paginator).length > 0 ? (u(), S(K, Q({
              key: 6,
              ref_key: "paginatorRef",
              ref: le
            }, e.paginator, {
              modelValue: U.value,
              "onUpdate:modelValue": r[1] || (r[1] = (B) => U.value = B),
              onLoading: bt,
              onPerms: ct,
              onResponse: yt
            }), null, 16, ["modelValue"])) : c("", !0)
          ]),
          _: 3
        }, 8, ["class"]))
      ], 8, Il);
    };
  }
}), Yl = {
  install: (o) => {
    o.component("lkt-table") === void 0 && o.component("lkt-table", ql);
  }
}, Zl = (o) => ($.navButtonSlot = o, !0), xl = (o) => ($.dropButtonSlot = o, !0), ea = (o) => ($.createButtonSlot = o, !0), ta = (o) => {
  $.defaultEmptySlot = o;
}, la = (o) => {
  $.defaultSaveIcon = o;
};
export {
  na as Column,
  ua as createColumn,
  Yl as default,
  ea as setTableCreateButtonSlot,
  xl as setTableDropButtonSlot,
  ta as setTableEmptySlot,
  Zl as setTableNavButtonSlot,
  la as setTableSaveIcon
};
