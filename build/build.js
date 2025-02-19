import { defineComponent as _, ref as C, watch as N, computed as d, resolveComponent as K, createBlock as B, createElementBlock as s, unref as v, openBlock as u, normalizeProps as ae, mergeProps as ie, withCtx as L, createTextVNode as oe, toDisplayString as ne, Fragment as P, withModifiers as ot, createCommentVNode as f, resolveDynamicComponent as X, useSlots as nt, normalizeClass as G, createElementVNode as O, createVNode as de, renderSlot as w, renderList as z, withDirectives as ve, vShow as ye, mergeDefaults as Ft, onMounted as Ut, nextTick as Be, createSlots as tt } from "vue";
import { __ as ut } from "lkt-i18n";
import { Column as Le, SortDirection as be, ColumnType as le, TableRowType as re, extractI18nValue as lt, TablePermission as Z, TableType as ce, getDefaultValues as At, Table as Ot, ButtonType as Me } from "lkt-vue-kernel";
import { Column as Zl } from "lkt-vue-kernel";
import { replaceAll as rt, generateRandomString as Ht } from "lkt-string-tools";
import { DataState as qt } from "lkt-data-state";
import jt from "sortablejs";
import { time as fe } from "lkt-date-tools";
const jl = (n) => new Le(n), Kt = (n, p, m, a) => {
  if (!m) return 0;
  let o = n[m.key], t = p[m.key];
  if (a === be.Asc) {
    if (o > t) return 1;
    if (t > o) return -1;
  } else {
    if (o > t) return -1;
    if (t > o) return 1;
  }
  return 0;
}, se = (n, p, m, a = []) => {
  if (n.extractTitleFromColumn) {
    let o = a.find((t) => t.key === n.extractTitleFromColumn);
    if (o)
      return se(o, p, m, a);
  }
  if (n.formatter && typeof n.formatter == "function") {
    let o = n.formatter(p[n.key], p, n, m);
    return o.startsWith("__:") ? ut(o.substring(3)) : o;
  }
  return p[n.key];
}, Wt = (n, p, m) => {
  if (!n.colspan) return -1;
  let a = p;
  return m.forEach((o) => {
    let t = Pe(n, o);
    t > 0 && t < a && (a = t);
  }), a;
}, Pe = (n, p) => n.colspan === !1 ? !1 : typeof n.colspan == "function" ? n.colspan(p) : n.colspan, zt = (n, p) => typeof n.preferSlot > "u" ? !0 : n.preferSlot === !1 ? !1 : typeof n.preferSlot == "function" ? n.preferSlot(p) : !0, Gt = (n, p, m) => {
  if (typeof n != "object" || !n.key || p.indexOf(n.key) > -1) return !1;
  let a = Pe(n, m);
  return typeof n.colspan > "u" ? !0 : (typeof n.colspan < "u" && (typeof n.colspan == "function" ? a = parseInt(n.colspan(m)) : a = parseInt(n.colspan)), a > 0);
}, Jt = (n = []) => {
  if (n.length > 0) {
    for (let p = 0; p < n.length; ++p)
      if (n[p].sortable) return n[p].key;
  }
  return "";
}, Qt = (n, p) => {
  if (n.length > 0) {
    for (let m = 0; m < n.length; ++m)
      if (n[m].key === p) return n[m];
  }
  return null;
}, it = (n) => n.type ? `is-${n.type}` : "", dt = /* @__PURE__ */ _({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new Le() },
    columns: { default: () => [] },
    i: { default: 0 },
    editModeEnabled: { type: Boolean, default: !1 },
    hasInlineEditPerm: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: p }) {
    const m = p, a = n, o = C(a.modelValue), t = C(o.value[a.column.key]), c = C(null);
    let D = a.column.type;
    [le.Integer, le.Float].includes(D) && (D = le.Number), N(t, (l) => {
      const R = JSON.parse(JSON.stringify(o.value));
      R[a.column.key] = l, m("update:modelValue", R);
    }), N(() => a.modelValue, (l) => {
      o.value = l, t.value = o.value[a.column.key];
    });
    const g = d(() => ({ ...a.column.slotData, item: o.value })), S = d(() => {
      var l, R, H, F;
      if ((l = a.column.field) != null && l.modalData && typeof ((R = a.column.field) == null ? void 0 : R.modalData) == "object")
        for (let U in a.column.field.modalData)
          if (typeof ((H = a.column.field) == null ? void 0 : H.modalData[U]) == "string" && a.column.field.modalData[U].startsWith("prop:")) {
            let E = a.column.field.modalData[U].substring(5);
            o.value[E];
          } else
            a.column.field.modalData[U];
      return (F = a.column.field) == null ? void 0 : F.modalData;
    });
    return (l, R) => {
      var E, x, T, ee;
      const H = K("lkt-anchor"), F = K("lkt-button"), U = K("lkt-field");
      return l.column.type === v(le).Anchor ? (u(), B(H, ae(ie({ key: 0 }, l.column.anchor)), {
        default: L(() => [
          oe(ne(v(se)(l.column, o.value, l.i)), 1)
        ]),
        _: 1
      }, 16)) : l.column.type === v(le).Button ? (u(), B(F, ie({ key: 1 }, l.column.button, { prop: o.value }), {
        default: L(() => [
          oe(ne(v(se)(l.column, o.value, l.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : l.column.type === v(le).Field && l.hasInlineEditPerm ? (u(), B(U, ie({ key: 2 }, l.column.field, {
        "read-mode": !l.column.editable || !l.editModeEnabled,
        ref: (q) => c.value = q,
        "slot-data": g.value,
        label: ((E = l.column.field) == null ? void 0 : E.type) === "switch" || ((x = l.column.field) == null ? void 0 : x.type) === "check" ? l.column.label : "",
        "modal-data": S.value,
        prop: o.value,
        modelValue: t.value,
        "onUpdate:modelValue": R[0] || (R[0] = (q) => t.value = q)
      }), null, 16, ["read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : l.column.type === v(le).Field ? (u(), B(U, ie({ key: 3 }, l.column.field, {
        "read-mode": "",
        ref: (q) => c.value = q,
        "slot-data": g.value,
        label: ((T = l.column.field) == null ? void 0 : T.type) === "switch" || ((ee = l.column.field) == null ? void 0 : ee.type) === "check" ? l.column.label : "",
        "modal-data": S.value,
        prop: o.value,
        "model-value": t.value
      }), null, 16, ["slot-data", "label", "modal-data", "prop", "model-value"])) : (u(), s(P, { key: 4 }, [
        oe(ne(v(se)(l.column, o.value, l.i, l.columns)), 1)
      ], 64));
    };
  }
}), Q = class Q {
};
Q.navButtonSlot = "", Q.dropButtonSlot = "", Q.editButtonSlot = "", Q.createButtonSlot = "", Q.defaultEmptySlot = void 0, Q.defaultSaveIcon = "", Q.defaultNoResultsMessage = "No results";
let $ = Q;
const Xt = /* @__PURE__ */ _({
  __name: "DropButton",
  props: {
    disabled: { type: Boolean, default: !1 },
    text: { default: "" },
    icon: { default: "" },
    confirm: { default: "" },
    resource: { default: "" },
    resourceData: { default: () => ({}) }
  },
  emits: ["click"],
  setup(n, { emit: p }) {
    const m = p, a = d(() => $.dropButtonSlot !== ""), o = d(() => $.dropButtonSlot);
    return (t, c) => {
      const D = K("lkt-button");
      return u(), B(D, {
        palette: "table-delete",
        icon: a.value ? "" : t.icon,
        text: a.value ? "" : t.text,
        resource: t.resource,
        "resource-data": t.resourceData,
        "confirm-modal": t.confirm,
        disabled: t.disabled,
        onClick: c[0] || (c[0] = ot((g) => m("click"), ["prevent", "stop"]))
      }, {
        default: L(() => [
          a.value ? (u(), B(X(o.value), { key: 0 })) : f("", !0)
        ]),
        _: 1
      }, 8, ["icon", "text", "resource", "resource-data", "confirm-modal", "disabled"]);
    };
  }
}), Yt = /* @__PURE__ */ _({
  __name: "EditButton",
  props: {
    disabled: { type: Boolean, default: !1 },
    text: { default: "" },
    icon: { default: "" },
    confirm: { default: "" },
    link: { default: "" },
    resource: { default: "" },
    resourceData: { default: () => ({}) }
  },
  emits: ["click"],
  setup(n, { emit: p }) {
    const m = p, a = d(() => $.editButtonSlot !== ""), o = d(() => $.editButtonSlot);
    return (t, c) => {
      const D = K("lkt-button");
      return u(), B(D, {
        palette: "table-delete",
        icon: a.value ? "" : t.icon,
        text: a.value ? "" : t.text,
        "on-click-to": t.link,
        "is-anchor": t.link !== "",
        resource: t.resource,
        "resource-data": t.resourceData,
        "confirm-modal": t.confirm,
        disabled: t.disabled,
        onClick: c[0] || (c[0] = ot((g) => m("click"), ["prevent", "stop"]))
      }, {
        default: L(() => [
          a.value ? (u(), B(X(o.value), { key: 0 })) : f("", !0)
        ]),
        _: 1
      }, 8, ["icon", "text", "on-click-to", "is-anchor", "resource", "resource-data", "confirm-modal", "disabled"]);
    };
  }
}), Zt = ["data-i", "data-draggable"], _t = ["data-i"], xt = {
  key: 1,
  "data-role": "invalid-drag-indicator"
}, el = {
  key: 2,
  class: "lkt-table-nav-cell"
}, tl = { class: "lkt-table-nav-container" }, ll = ["colspan"], al = ["colspan"], ol = ["data-column", "colspan", "title"], nl = {
  key: 7,
  class: "lkt-table-col-drop"
}, ul = {
  key: 8,
  class: "lkt-table-col-edit"
}, rl = /* @__PURE__ */ _({
  __name: "LktTableRow",
  props: {
    modelValue: { default: () => ({}) },
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
    dropConfirm: { default: "" },
    dropText: { default: "" },
    dropIcon: { default: "" },
    dropResource: { default: "" },
    editText: { default: "" },
    editIcon: { default: "" },
    editLink: { default: "" },
    rowDisplayType: { type: [Number, Function], default: re.Auto },
    renderDrag: { type: [Boolean, Function], default: !0 },
    disabledDrag: { type: [Boolean, Function], default: !0 }
  },
  emits: ["update:modelValue", "click", "show", "item-up", "item-down", "item-drop"],
  setup(n, { emit: p }) {
    const m = nt(), a = p, o = n, t = C(o.modelValue);
    let c = typeof o.rowDisplayType == "function" ? o.rowDisplayType(t.value, o.i) : o.rowDisplayType;
    c || (c = re.Auto);
    const D = [re.Auto, re.PreferCustomItem].includes(c), g = [re.Auto, re.PreferItem].includes(c), S = C(o.editLink);
    for (let r in t.value) S.value = rt(S.value, ":" + r, t.value[r]);
    const l = (r) => a("click", r), R = (r, b) => {
      a("show", r, b);
    }, H = d(() => {
      let r = [], b = !1;
      return typeof o.disabledDrag == "function" ? b = o.disabledDrag(t.value) : b = o.disabledDrag === !0, !b && o.sortable && o.isDraggable ? r.push("handle") : b && r.push("disabled"), r.join(" ");
    }), F = d(() => $.navButtonSlot !== ""), U = d(() => $.navButtonSlot), E = () => {
      a("item-up", o.i);
    }, x = () => {
      a("item-down", o.i);
    }, T = () => {
      a("item-drop", o.i);
    }, ee = () => {
    };
    N(() => o.modelValue, (r) => t.value = r), N(t, (r) => {
      a("update:modelValue", r);
    }, { deep: !0 });
    const q = d(() => typeof o.renderDrag == "function" ? o.renderDrag(t.value) : o.renderDrag === !0);
    return d(() => typeof o.disabledDrag == "function" ? o.disabledDrag(t.value) : o.disabledDrag === !0), (r, b) => {
      const I = K("lkt-button");
      return u(), s("tr", {
        "data-i": r.i,
        "data-draggable": r.isDraggable,
        class: G({ "type-custom-item": v(D), "type-item": v(g) })
      }, [
        r.sortable && r.isDraggable && r.editModeEnabled && q.value ? (u(), s("td", {
          key: 0,
          "data-role": "drag-indicator",
          class: G(H.value),
          "data-i": r.i
        }, null, 10, _t)) : r.sortable && r.editModeEnabled && q.value ? (u(), s("td", xt)) : f("", !0),
        r.addNavigation && r.editModeEnabled ? (u(), s("td", el, [
          O("div", tl, [
            de(I, {
              palette: "table-nav",
              disabled: r.i === 0,
              onClick: E
            }, {
              default: L(() => [
                F.value ? (u(), B(X(U.value), {
                  key: 0,
                  direction: "up"
                })) : (u(), s(P, { key: 1 }, [
                  b[3] || (b[3] = O("i", { class: "" }, null, -1)),
                  b[4] || (b[4] = oe(" UP "))
                ], 64))
              ]),
              _: 1
            }, 8, ["disabled"]),
            de(I, {
              palette: "table-nav",
              disabled: r.latestRow,
              onClick: x
            }, {
              default: L(() => [
                F.value ? (u(), B(X(U.value), {
                  key: 0,
                  direction: "down"
                })) : (u(), s(P, { key: 1 }, [
                  b[5] || (b[5] = O("i", { class: "" }, null, -1)),
                  b[6] || (b[6] = oe(" DOWN "))
                ], 64))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : f("", !0),
        r.displayHiddenColumnsIndicator ? (u(), s("td", {
          key: 3,
          onClick: b[0] || (b[0] = (V) => R(V, r.i)),
          "data-role": "show-more",
          class: G(r.hiddenIsVisible ? "state-open" : "")
        }, null, 2)) : f("", !0),
        v(D) && v(m)[`item-${r.i}`] ? (u(), s("td", {
          key: "td" + r.i,
          colspan: r.visibleColumns.length
        }, [
          w(r.$slots, `item-${r.i}`, {
            item: t.value,
            index: r.i
          })
        ], 8, ll)) : v(g) && v(m).item ? (u(), s("td", {
          key: "td" + r.i,
          colspan: r.visibleColumns.length
        }, [
          w(r.$slots, "item", {
            item: t.value,
            index: r.i
          })
        ], 8, al)) : (u(!0), s(P, { key: 6 }, z(r.visibleColumns, (V) => (u(), s(P, null, [
          v(Gt)(V, r.emptyColumns, t.value) ? (u(), s("td", {
            key: "td" + r.i,
            "data-column": V.key,
            colspan: v(Pe)(V, t.value),
            title: v(se)(V, t.value, r.i, r.visibleColumns),
            class: G(v(it)(V)),
            onClick: b[2] || (b[2] = (te) => l(te))
          }, [
            r.$slots[V.key] && v(zt)(V, t.value) ? w(r.$slots, V.key, {
              key: 0,
              value: t.value[V.key],
              item: t.value,
              column: V,
              i: r.i
            }) : t.value ? (u(), B(dt, {
              key: 1,
              modelValue: t.value,
              "onUpdate:modelValue": b[1] || (b[1] = (te) => t.value = te),
              column: V,
              columns: r.visibleColumns,
              "edit-mode-enabled": r.editModeEnabled,
              "has-inline-edit-perm": r.hasInlineEditPerm,
              i: r.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : f("", !0)
          ], 10, ol)) : f("", !0)
        ], 64))), 256)),
        r.canDrop && r.editModeEnabled ? (u(), s("td", nl, [
          de(Xt, {
            resource: r.dropResource,
            "resource-data": t.value,
            confirm: r.dropConfirm,
            text: r.dropText,
            icon: r.dropIcon,
            onClick: T
          }, null, 8, ["resource", "resource-data", "confirm", "text", "icon"])
        ])) : f("", !0),
        r.canEdit && r.editModeEnabled ? (u(), s("td", ul, [
          de(Yt, {
            "resource-data": t.value,
            text: r.editText,
            icon: r.editIcon,
            link: S.value,
            onClick: ee
          }, null, 8, ["resource-data", "text", "icon", "link"])
        ])) : f("", !0)
      ], 10, Zt);
    };
  }
}), il = { "data-role": "hidden-row" }, dl = ["colspan"], sl = ["data-column"], pl = ["data-i"], ml = ["data-column", "title"], cl = /* @__PURE__ */ _({
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
  setup(n, { emit: p }) {
    const m = p, a = n, o = C(a.modelValue), t = (c) => m("click", c);
    return N(() => a.modelValue, (c) => o.value = c), N(o, () => m("update:modelValue", o.value)), (c, D) => ve((u(), s("tr", il, [
      O("td", { colspan: c.hiddenColumnsColSpan }, [
        O("table", null, [
          O("tr", null, [
            (u(!0), s(P, null, z(c.hiddenColumns, (g) => (u(), s("th", {
              "data-column": g.key
            }, [
              O("div", null, ne(g.label), 1)
            ], 8, sl))), 256))
          ]),
          O("tr", { "data-i": c.i }, [
            (u(!0), s(P, null, z(c.hiddenColumns, (g, S) => (u(), s("td", {
              "data-column": g.key,
              title: v(se)(g, o.value, S, c.hiddenColumns),
              onClick: D[1] || (D[1] = (l) => t(l))
            }, [
              c.$slots[g.key] ? w(c.$slots, g.key, {
                key: 0,
                value: o.value[g.key],
                item: o.value,
                column: g,
                i: S
              }) : (u(), B(dt, {
                key: 1,
                column: g,
                columns: c.hiddenColumns,
                modelValue: o.value,
                "onUpdate:modelValue": D[0] || (D[0] = (l) => o.value = l),
                i: S,
                "edit-mode-enabled": c.editModeEnabled,
                "has-inline-edit-perm": c.hasInlineEditPerm
              }, null, 8, ["column", "columns", "modelValue", "i", "edit-mode-enabled", "has-inline-edit-perm"]))
            ], 8, ml))), 256))
          ], 8, pl)
        ])
      ], 8, dl)
    ], 512)), [
      [ye, c.hiddenIsVisible]
    ]);
  }
}), at = /* @__PURE__ */ _({
  __name: "CreateButton",
  props: {
    config: { default: void 0 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["click", "append"],
  setup(n, { emit: p }) {
    var S;
    const m = p, a = n, o = d(() => $.createButtonSlot !== ""), t = d(() => $.createButtonSlot), c = {
      ...(S = a.config) == null ? void 0 : S.modalData,
      beforeClose: (l) => {
        "itemCreated" in l && l.itemCreated === !0 && m("append", l.item);
      }
    }, D = {
      ...a.config
    };
    D.modalData = c;
    const g = () => {
      var l;
      if (!((l = a.config) != null && l.modal)) {
        m("click");
        return;
      }
    };
    return (l, R) => {
      const H = K("lkt-button");
      return u(), B(H, ie(D, {
        disabled: l.disabled,
        onClick: g
      }), {
        default: L(() => [
          o.value ? (u(), B(X(t.value), { key: 0 })) : f("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), fl = ["data-column", "data-sortable", "data-sort", "colspan", "title"], vl = /* @__PURE__ */ _({
  __name: "TableHeader",
  props: {
    column: { default: () => new Le() },
    sortBy: { default: "" },
    sortDirection: { default: "" },
    amountOfColumns: { default: 0 },
    items: { default: () => [] }
  },
  emits: ["click"],
  setup(n, { emit: p }) {
    const m = p, a = n, o = d(() => Wt(a.column, a.amountOfColumns, a.items)), t = d(() => a.column.sortable === !0), c = d(() => t.value && a.sortBy === a.column.key ? a.sortDirection : ""), D = d(() => a.column.label.startsWith("__:") ? ut(a.column.label.substring(3)) : a.column.label), g = () => m("click", a.column);
    return (S, l) => (u(), s("th", {
      "data-column": S.column.key,
      "data-sortable": t.value,
      "data-sort": c.value,
      colspan: o.value,
      title: D.value,
      class: G(v(it)(S.column)),
      onClick: g
    }, [
      O("div", null, ne(D.value), 1)
    ], 10, fl));
  }
}), yl = ["id"], bl = {
  key: 0,
  class: "lkt-table-page-buttons"
}, kl = { class: "switch-edition-mode" }, gl = {
  key: 1,
  class: "lkt-table-page-buttons"
}, hl = {
  key: 2,
  class: "lkt-table-page-filters"
}, Cl = { class: "lkt-table" }, Bl = { key: 0 }, Dl = {
  key: 0,
  "data-role": "drag-indicator"
}, Sl = { key: 1 }, Il = { key: 2 }, Vl = {
  key: 3,
  class: "lkt-table-col-drop"
}, El = {
  key: 4,
  class: "lkt-table-col-edit"
}, Tl = ["id"], wl = ["id"], $l = ["data-i"], Rl = ["data-i"], Ml = {
  key: 4,
  class: "lkt-table-empty"
}, Ll = {
  key: 5,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, Pl = /* @__PURE__ */ _({
  __name: "LktTable",
  props: /* @__PURE__ */ Ft({
    modelValue: {},
    type: {},
    columns: {},
    resource: {},
    noResultsText: {},
    filters: {},
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
    saveButton: {},
    createButton: {},
    dropButton: {},
    hiddenSave: { type: Boolean },
    wrapContentTag: {},
    wrapContentClass: {},
    itemsContainerClass: {},
    createText: {},
    createIcon: {},
    createRoute: {},
    createDisabled: { type: Boolean },
    createEnabledValidator: { type: Function },
    dropText: {},
    dropIcon: {},
    dropConfirm: {},
    dropResource: {},
    editText: {},
    editIcon: {},
    editLink: {},
    editModeText: {},
    switchEditionEnabled: { type: Boolean },
    addNavigation: { type: Boolean },
    newValueGenerator: { type: Function },
    requiredItemsForTopCreate: {},
    requiredItemsForBottomCreate: {},
    slotItemVar: {}
  }, At(Ot)),
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
  setup(n, { expose: p, emit: m }) {
    var et;
    const a = m, o = nt(), t = n, c = {}, D = C(typeof t.sorter == "function" ? t.sorter : Kt), g = C(Jt(t.columns)), S = C(be.Asc), l = C(t.modelValue), R = C(c), H = C(null), F = C(t.columns), U = C((et = t.paginator) == null ? void 0 : et.modelValue), E = C(t.loading), x = C(!1), T = C(t.perms), ee = C(null), q = C(null), r = C({}), b = C(new qt({ items: l.value }, t.dataStateConfig)), I = C(t.editMode), V = C(0), te = C(null), ue = C(!1);
    N(E, (e) => a("update:loading", e)), N(U, (e) => a("page", e));
    const st = (e) => {
      T.value = e;
    }, pt = (e) => {
      Array.isArray(e.data) && (l.value = e.data), E.value = !1, x.value = !0, b.value.store({ items: l.value }).turnStoredIntoOriginal(), ue.value = !1, Be(() => {
        Ie.value, a("read-response", e);
      });
    }, mt = () => Be(() => E.value = !0), ct = () => {
      ee.value.doRefresh();
    }, pe = Ht(12), De = d(() => {
      if (!t.hideEmptyColumns) return [];
      let e = [];
      return F.value.forEach((i) => {
        let k = i.key, M = !1;
        l.value.forEach((A) => {
          if (typeof A.checkEmpty == "function")
            return A.checkEmpty(A);
          A[k] && (M = !0);
        }), M || e.push(k);
      }), e;
    }), ke = d(() => F.value.filter((e) => !e.hidden)), Se = d(() => F.value.filter((e) => e.hidden)), ft = d(() => {
      let e = ke.value.length + 1;
      return t.sortable && ++e, e;
    }), vt = d(() => F.value.filter((e) => e.isForRowKey)), Ne = d(() => Se.value.length > 0 && !t.sortable), yt = d(() => F.value.map((e) => e.key)), Fe = d(() => {
      let e = [];
      for (let i in o) yt.value.indexOf(i) !== -1 && e.push(i);
      return e;
    }), Ue = d(() => {
      var e;
      return t.hiddenSave || E.value || !((e = t.saveButton) != null && e.resource || t.saveButton.type) ? !1 : I.value && ue.value ? !0 : I.value;
    }), bt = d(() => Ce.value && l.value.length >= t.requiredItemsForTopCreate || t.switchEditionEnabled ? !0 : Ue.value || I.value && me.value), Ie = d(() => {
      var e, i;
      return V.value, typeof ((e = t.saveButton) == null ? void 0 : e.disabled) == "function" ? t.saveButton.disabled({
        value: l.value,
        dataState: b.value
      }) : typeof ((i = t.saveButton) == null ? void 0 : i.disabled) == "boolean" ? t.saveButton.disabled : !ue.value;
    }), kt = d(() => l.value.length), gt = d(() => {
      var e;
      return {
        items: l.value,
        ...(e = t.saveButton) == null ? void 0 : e.resourceData
      };
    }), ht = d(() => t.titleTag === "" ? "h2" : t.titleTag), Ct = d(() => t.wrapContentTag === "" ? "div" : t.wrapContentTag), Ve = d(() => lt(t.title)), Bt = d(() => lt(t.editModeText)), Ee = d(() => {
      var e;
      return (e = t.drag) == null ? void 0 : e.enabled;
    }), me = d(() => T.value.includes(Z.Create)), Ae = d(() => T.value.includes("read")), ge = d(() => T.value.includes(Z.Update)), Oe = d(() => T.value.includes(Z.Edit)), He = d(() => T.value.includes(Z.InlineEdit)), Dt = d(() => T.value.includes(Z.ModalCreate)), St = d(() => T.value.includes(Z.InlineCreate)), qe = d(() => T.value.includes(Z.InlineCreateEver)), he = d(() => T.value.includes(Z.Drop)), It = (e) => {
      let i = e.target;
      if (typeof i.dataset.column > "u")
        do
          i = i.parentNode;
        while (typeof i.dataset.column > "u" && i.tagName !== "TABLE" && i.tagName !== "body");
      if (i.tagName === "TD" && (i = i.parentNode, i = i.dataset.i, typeof i < "u"))
        return l.value[i];
    }, Vt = (e) => l.value[e], Et = (e) => {
      var i;
      return (i = H.value) == null ? void 0 : i.querySelector(`[data-i="${e}"]`);
    }, je = (e) => R.value["tr_" + e] === !0, Ke = (e) => {
      e && e.sortable && (l.value = l.value.sort((i, k) => D.value(i, k, e, S.value)), S.value = S.value === be.Asc ? be.Desc : be.Asc, g.value = e.key, a("sort", [g.value, S.value]));
    }, We = (e) => {
      a("click", e);
    }, ze = (e, i) => {
      let k = "tr_" + i;
      R.value[k] = typeof R.value[k] > "u" ? !0 : !R.value[k];
    }, Tt = (e) => {
      var k, M, A, j, h, y, W, J;
      let i = parseInt((j = (A = (M = (k = e == null ? void 0 : e.originalEvent) == null ? void 0 : k.toElement) == null ? void 0 : M.closest("tr")) == null ? void 0 : A.dataset) == null ? void 0 : j.i);
      return !(typeof ((h = t.drag) == null ? void 0 : h.isValid) == "function" && !((y = t.drag) != null && y.isValid(l.value[i])) || typeof ((W = t.drag) == null ? void 0 : W.isValid) == "boolean" && !((J = t.drag) != null && J.isValid));
    }, Ge = (e) => {
      var i, k;
      return typeof ((i = t.drag) == null ? void 0 : i.isDraggable) == "function" ? (k = t.drag) == null ? void 0 : k.isDraggable(e) : !0;
    }, Je = () => {
      if (me.value) {
        a("click-create");
        return;
      }
      if (qe.value)
        a("click-create");
      else {
        if (typeof t.newValueGenerator == "function") {
          let e = t.newValueGenerator();
          if (typeof e == "object" || t.type !== ce.Table) {
            l.value.push(e);
            return;
          }
        }
        l.value.push({});
      }
    }, Qe = (e) => {
      l.value.push(e);
    }, Xe = () => E.value = !0, Ye = () => E.value = !1, wt = (e, i) => {
      var k, M, A;
      if (!((k = t.saveButton) != null && k.type && [
        Me.Split,
        Me.SplitEver,
        Me.SplitLazy
      ].includes((M = t.saveButton) == null ? void 0 : M.type))) {
        if (a("before-save"), (A = t.saveButton) != null && A.resource && (E.value = !1, !i.success)) {
          a("error", i.httpStatus);
          return;
        }
        b.value.turnStoredIntoOriginal(), ue.value = !1, a("save", i);
      }
    }, Ze = (e, i, k) => {
      if (k >= e.length) {
        let M = k - e.length + 1;
        for (; M--; ) e.push(void 0);
      }
      return e.splice(k, 0, e.splice(i, 1)[0]), e;
    }, $t = (e) => {
      Ze(l.value, e, e - 1), V.value = fe();
    }, Rt = (e) => {
      Ze(l.value, e, e + 1), V.value = fe();
    }, Te = (e) => {
      l.value.splice(e, 1), V.value = fe();
    }, Mt = () => {
      var e;
      r.value && typeof ((e = r.value) == null ? void 0 : e.destroy) == "function" && (r.value.destroy(), r.value = {});
    }, _e = () => {
      te.value || (te.value = document.getElementById("lkt-table-body-" + pe)), r.value = new jt(te.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let i = e.oldIndex, k = e.newIndex;
          l.value.splice(k, 0, l.value.splice(i, 1)[0]), V.value = fe(), a("drag-end", l.value[k]);
        },
        onMove: function(e, i) {
          return Tt(e);
        }
      });
    }, we = (e, i, k = !1) => {
      let M = [V.value, pe, "row", i];
      return k && M.push("hidden"), vt.value.forEach((A) => {
        let j = String(e[A.key]).toLowerCase();
        j.length > 50 && (j = j.substring(0, 50)), j = rt(j, " ", "-"), M.push(j);
      }), M.join("-");
    }, xe = d(() => typeof t.createEnabledValidator == "function" ? t.createEnabledValidator({ items: l.value }) : !0), Ce = d(() => qe.value || me.value && I.value || St.value && I.value || Dt.value && I.value), Lt = d(() => [ce.Ol, ce.Ul].includes(t.type)), $e = (e, i) => typeof t.itemDisplayChecker == "function" ? t.itemDisplayChecker(e) : !0;
    Ut(() => {
      var e;
      t.initialSorting && Ke(Qt(t.columns, g.value)), b.value.store({ items: l.value }).turnStoredIntoOriginal(), ue.value = !1, (e = t.drag) != null && e.enabled && Be(() => {
        _e();
      });
    }), N(() => {
      var e;
      return (e = t.drag) == null ? void 0 : e.enabled;
    }, (e) => {
      e ? _e() : Mt();
    }), N(() => t.perms, (e) => T.value = e), N(T, (e) => a("update:perms", e)), N(() => t.editMode, (e) => I.value = e), N(() => t.columns, (e) => F.value = e, { deep: !0 }), N(() => t.modelValue, (e) => l.value = e, { deep: !0 }), N(l, (e) => {
      b.value.increment({ items: e }), ue.value = b.value.changed(), a("update:modelValue", e);
    }, { deep: !0 }), p({
      getItemByEvent: It,
      getItemByIndex: Vt,
      getRowByIndex: Et,
      doRefresh: ct,
      getHtml: () => q.value,
      turnStoredIntoOriginal: () => {
        b.value.turnStoredIntoOriginal(), Be(() => {
          V.value = fe();
        });
      }
    });
    const Pt = d(() => typeof $.defaultEmptySlot < "u"), Nt = d(() => $.defaultEmptySlot);
    return (e, i) => {
      const k = K("lkt-button"), M = K("lkt-field"), A = K("lkt-loader"), j = K("lkt-paginator");
      return u(), s("section", {
        ref_key: "element",
        ref: q,
        class: "lkt-table-page",
        id: "lkt-table-page-" + v(pe)
      }, [
        Ve.value || v(o).title ? (u(), s("header", {
          key: 0,
          class: G(e.headerClass)
        }, [
          Ve.value ? (u(), B(X(ht.value), { key: 0 }, {
            default: L(() => [
              e.titleIcon ? (u(), s("i", {
                key: 0,
                class: G(e.titleIcon)
              }, null, 2)) : f("", !0),
              oe(" " + ne(Ve.value), 1)
            ]),
            _: 1
          })) : f("", !0),
          v(o).title ? w(e.$slots, "title", { key: 1 }) : f("", !0)
        ], 2)) : f("", !0),
        (u(), B(X(Ct.value), {
          class: G(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: L(() => [
            bt.value ? (u(), s("div", bl, [
              ve(de(k, ie({
                class: "lkt-table--save-button",
                ref: "saveButton"
              }, e.saveButton, {
                disabled: Ie.value,
                "modal-data": gt.value,
                onLoading: Xe,
                onLoaded: Ye,
                onClick: wt
              }), {
                split: L(({ doClose: h, doRootClick: y }) => [
                  w(e.$slots, "button-save-split", {
                    doClose: h,
                    doRootClick: y,
                    dataState: b.value,
                    onButtonLoading: Xe,
                    onButtonLoaded: Ye
                  })
                ]),
                default: L(() => [
                  v(o)["button-save"] ? w(e.$slots, "button-save", {
                    key: 0,
                    items: l.value,
                    editMode: e.editMode,
                    canUpdate: !Ie.value
                  }) : f("", !0)
                ]),
                _: 3
              }, 16, ["disabled", "modal-data"]), [
                [ye, Ue.value]
              ]),
              Ce.value && l.value.length >= e.requiredItemsForTopCreate ? (u(), B(at, {
                key: 0,
                config: e.createButton,
                disabled: !xe.value || e.createDisabled,
                onClick: Je,
                onAppend: Qe
              }, null, 8, ["config", "disabled"])) : f("", !0),
              O("div", kl, [
                ve(de(M, {
                  type: "switch",
                  modelValue: I.value,
                  "onUpdate:modelValue": i[0] || (i[0] = (h) => I.value = h),
                  label: Bt.value
                }, null, 8, ["modelValue", "label"]), [
                  [ye, e.switchEditionEnabled]
                ])
              ])
            ])) : f("", !0),
            v(o).buttons ? (u(), s("div", gl, [
              w(e.$slots, "buttons")
            ])) : f("", !0),
            x.value && v(o).filters ? (u(), s("div", hl, [
              w(e.$slots, "filters", {
                items: l.value,
                isLoading: E.value
              })
            ])) : f("", !0),
            E.value ? (u(), B(A, { key: 3 })) : f("", !0),
            ve(O("div", Cl, [
              e.type === v(ce).Table ? (u(), s("table", Bl, [
                O("thead", null, [
                  O("tr", null, [
                    Ee.value && I.value ? (u(), s("th", Dl)) : f("", !0),
                    e.addNavigation && I.value ? (u(), s("th", Sl)) : f("", !0),
                    Ne.value ? (u(), s("th", Il)) : f("", !0),
                    (u(!0), s(P, null, z(ke.value, (h) => (u(), s(P, null, [
                      De.value.indexOf(h.key) === -1 ? (u(), B(vl, {
                        key: 0,
                        column: h,
                        "sort-by": g.value,
                        "sort-direction": S.value,
                        "amount-of-columns": e.columns.length,
                        items: l.value,
                        onClick: (y) => Ke(h)
                      }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : f("", !0)
                    ], 64))), 256)),
                    he.value && I.value ? (u(), s("th", Vl)) : f("", !0),
                    Oe.value && ge.value && I.value ? (u(), s("th", El)) : f("", !0)
                  ])
                ]),
                O("tbody", {
                  ref_key: "tableBody",
                  ref: H,
                  id: "lkt-table-body-" + v(pe)
                }, [
                  (u(!0), s(P, null, z(l.value, (h, y) => {
                    var W, J;
                    return ve((u(), B(rl, {
                      modelValue: l.value[y],
                      "onUpdate:modelValue": (Y) => l.value[y] = Y,
                      key: we(h, y),
                      i: y,
                      "display-hidden-columns-indicator": Ne.value,
                      "is-draggable": Ge(h),
                      sortable: Ee.value,
                      "visible-columns": ke.value,
                      "empty-columns": De.value,
                      "add-navigation": e.addNavigation,
                      "hidden-is-visible": je(y),
                      "latest-row": y + 1 === kt.value,
                      "can-drop": he.value && I.value,
                      "drop-confirm": e.dropConfirm,
                      "drop-resource": e.dropResource,
                      "drop-text": e.dropText,
                      "drop-icon": e.dropIcon,
                      "can-edit": Oe.value && ge.value && I.value,
                      "edit-text": e.editText,
                      "edit-icon": e.editIcon,
                      "edit-link": e.editLink,
                      "edit-mode-enabled": I.value,
                      "has-inline-edit-perm": He.value,
                      "row-display-type": e.rowDisplayType,
                      "render-drag": (W = e.drag) == null ? void 0 : W.canRender,
                      "disabled-drag": (J = e.drag) == null ? void 0 : J.isDisabled,
                      onClick: We,
                      onShow: ze,
                      onItemUp: $t,
                      onItemDown: Rt,
                      onItemDrop: Te
                    }, tt({ _: 2 }, [
                      v(o)[`item-${y}`] ? {
                        name: `item-${y}`,
                        fn: L((Y) => [
                          w(e.$slots, `item-${y}`, ae({
                            [e.slotItemVar || ""]: Y.item,
                            index: y
                          }))
                        ]),
                        key: "0"
                      } : v(o).item ? {
                        name: "item",
                        fn: L((Y) => [
                          w(e.$slots, "item", ae({
                            [e.slotItemVar || ""]: Y.item,
                            index: y
                          }))
                        ]),
                        key: "1"
                      } : void 0,
                      z(Fe.value, (Y) => ({
                        name: Y,
                        fn: L((Re) => [
                          w(e.$slots, Y, ae({
                            [e.slotItemVar || ""]: Re.item,
                            value: Re.value,
                            column: Re.column
                          }))
                        ])
                      }))
                    ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "display-hidden-columns-indicator", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "hidden-is-visible", "latest-row", "can-drop", "drop-confirm", "drop-resource", "drop-text", "drop-icon", "can-edit", "edit-text", "edit-icon", "edit-link", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag"])), [
                      [ye, $e(l.value[y])]
                    ]);
                  }), 128)),
                  Se.value.length > 0 ? (u(!0), s(P, { key: 0 }, z(l.value, (h, y) => (u(), B(cl, {
                    modelValue: l.value[y],
                    "onUpdate:modelValue": (W) => l.value[y] = W,
                    key: we(h, y, !0),
                    i: y,
                    "hidden-columns": Se.value,
                    "hidden-columns-col-span": ft.value,
                    "is-draggable": Ge(h),
                    sortable: Ee.value,
                    "visible-columns": ke.value,
                    "empty-columns": De.value,
                    "hidden-is-visible": je(y),
                    "edit-mode-enabled": I.value,
                    "has-inline-edit-perm": He.value,
                    onClick: We,
                    onShow: ze
                  }, tt({ _: 2 }, [
                    z(Fe.value, (W) => ({
                      name: W,
                      fn: L((J) => [
                        w(e.$slots, W, ae({
                          [e.slotItemVar || ""]: J.item,
                          value: J.value,
                          column: J.column
                        }))
                      ])
                    }))
                  ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "hidden-columns", "hidden-columns-col-span", "is-draggable", "sortable", "visible-columns", "empty-columns", "hidden-is-visible", "edit-mode-enabled", "has-inline-edit-perm"]))), 128)) : f("", !0)
                ], 8, Tl)
              ])) : e.type === v(ce).Item ? (u(), s("div", {
                key: 1,
                ref_key: "tableBody",
                ref: H,
                id: "lkt-table-body-" + v(pe),
                class: G(["lkt-table-items-container", e.itemsContainerClass])
              }, [
                (u(!0), s(P, null, z(l.value, (h, y) => (u(), s(P, null, [
                  $e(h) ? (u(), s("div", {
                    class: "lkt-table-item",
                    "data-i": y,
                    key: we(h, y)
                  }, [
                    w(e.$slots, "item", ae({
                      [e.slotItemVar || ""]: h,
                      index: y,
                      editing: I.value,
                      canCreate: me.value,
                      canRead: Ae.value,
                      canUpdate: ge.value,
                      canDrop: he.value,
                      isLoading: E.value,
                      doDrop: () => Te(y)
                    }))
                  ], 8, $l)) : f("", !0)
                ], 64))), 256))
              ], 10, wl)) : Lt.value ? (u(), B(X(e.type), {
                key: 2,
                class: G(["lkt-table-items-container", e.itemsContainerClass])
              }, {
                default: L(() => [
                  (u(!0), s(P, null, z(l.value, (h, y) => (u(), s(P, null, [
                    $e(h) ? (u(), s("li", {
                      key: 0,
                      class: "lkt-table-item",
                      "data-i": y
                    }, [
                      w(e.$slots, "item", ae({
                        [e.slotItemVar || ""]: h,
                        index: y,
                        editing: I.value,
                        canCreate: me.value,
                        canRead: Ae.value,
                        canUpdate: ge.value,
                        canDrop: he.value,
                        isLoading: E.value,
                        doDrop: () => Te(y)
                      }))
                    ], 8, Rl)) : f("", !0)
                  ], 64))), 256))
                ]),
                _: 3
              }, 8, ["class"])) : f("", !0)
            ], 512), [
              [ye, !E.value && l.value.length > 0]
            ]),
            !E.value && l.value.length === 0 ? (u(), s("div", Ml, [
              v(o).empty ? w(e.$slots, "empty", { key: 0 }) : Pt.value ? (u(), B(X(Nt.value), {
                key: 1,
                message: e.noResultsText
              }, null, 8, ["message"])) : e.noResultsText ? (u(), s(P, { key: 2 }, [
                oe(ne(e.noResultsText), 1)
              ], 64)) : f("", !0)
            ])) : f("", !0),
            Ce.value || v(o).bottomButtons ? (u(), s("div", Ll, [
              Ce.value && l.value.length >= e.requiredItemsForBottomCreate ? (u(), B(at, {
                key: 0,
                config: e.createButton,
                disabled: !xe.value || e.createDisabled,
                onClick: Je,
                onAppend: Qe
              }, null, 8, ["config", "disabled"])) : f("", !0),
              w(e.$slots, "bottom-buttons")
            ])) : f("", !0),
            e.resource.length > 0 ? (u(), B(j, {
              key: 6,
              ref_key: "paginatorRef",
              ref: ee,
              modelValue: U.value,
              "onUpdate:modelValue": i[1] || (i[1] = (h) => U.value = h),
              resource: e.resource,
              filters: e.filters,
              onLoading: mt,
              onPerms: st,
              onResponse: pt
            }, null, 8, ["modelValue", "resource", "filters"])) : f("", !0)
          ]),
          _: 3
        }, 8, ["class"]))
      ], 8, yl);
    };
  }
}), Kl = {
  install: (n) => {
    n.component("lkt-table") === void 0 && n.component("lkt-table", Pl);
  }
}, Wl = (n) => ($.navButtonSlot = n, !0), zl = (n) => ($.dropButtonSlot = n, !0), Gl = (n) => ($.createButtonSlot = n, !0), Jl = (n) => {
  $.defaultEmptySlot = n;
}, Ql = (n) => {
  $.defaultSaveIcon = n;
};
export {
  Zl as Column,
  jl as createColumn,
  Kl as default,
  Gl as setTableCreateButtonSlot,
  zl as setTableDropButtonSlot,
  Jl as setTableEmptySlot,
  Wl as setTableNavButtonSlot,
  Ql as setTableSaveIcon
};
