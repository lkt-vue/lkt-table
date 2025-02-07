import { defineComponent as ee, ref as h, watch as F, computed as i, resolveComponent as z, createBlock as C, createElementBlock as d, unref as f, openBlock as n, normalizeProps as X, mergeProps as De, withCtx as L, createTextVNode as ue, toDisplayString as _, Fragment as w, withModifiers as xe, createCommentVNode as v, resolveDynamicComponent as x, useSlots as et, normalizeClass as K, createElementVNode as P, createVNode as ie, renderSlot as $, renderList as j, withDirectives as ve, vShow as be, onMounted as Mt, nextTick as we, createSlots as Ye } from "vue";
import { __ as ye } from "lkt-i18n";
import { Column as Re, ColumnType as ne, SortDirection as Se } from "lkt-vue-kernel";
import { Column as za } from "lkt-vue-kernel";
import { replaceAll as tt, generateRandomString as Ft } from "lkt-string-tools";
import { DataState as Lt } from "lkt-data-state";
import Nt from "sortablejs";
import { time as Ie } from "lkt-date-tools";
const Ua = (a) => new Re(a), Ze = (a, m, p, u) => {
  if (!p) return 0;
  let o = a[p.key], t = m[p.key];
  if (u === "asc") {
    if (o > t) return 1;
    if (t > o) return -1;
  } else {
    if (o > t) return -1;
    if (t > o) return 1;
  }
  return 0;
}, se = (a, m, p, u = []) => {
  if (a.extractTitleFromColumn) {
    let o = u.find((t) => t.key === a.extractTitleFromColumn);
    if (o)
      return se(o, m, p, u);
  }
  if (a.formatter && typeof a.formatter == "function") {
    let o = a.formatter(m[a.key], m, a, p);
    return o.startsWith("__:") ? ye(o.substring(3)) : o;
  }
  return m[a.key];
}, Ut = (a, m, p) => {
  if (!a.colspan) return -1;
  let u = m;
  return p.forEach((o) => {
    let t = Me(a, o);
    t > 0 && t < u && (u = t);
  }), u;
}, Me = (a, m) => a.colspan === !1 ? !1 : typeof a.colspan == "function" ? a.colspan(m) : a.colspan, Pt = (a, m) => typeof a.preferSlot > "u" ? !0 : a.preferSlot === !1 ? !1 : typeof a.preferSlot == "function" ? a.preferSlot(m) : !0, At = (a, m, p) => {
  if (typeof a != "object" || !a.key || m.indexOf(a.key) > -1) return !1;
  let u = Me(a, p);
  return typeof a.colspan > "u" ? !0 : (typeof a.colspan < "u" && (typeof a.colspan == "function" ? u = parseInt(a.colspan(p)) : u = parseInt(a.colspan)), u > 0);
}, Ot = (a = []) => {
  if (a.length > 0) {
    for (let m = 0; m < a.length; ++m)
      if (a[m].sortable) return a[m].key;
  }
  return "";
}, Ht = (a, m) => {
  if (a.length > 0) {
    for (let p = 0; p < a.length; ++p)
      if (a[p].key === m) return a[p];
  }
  return null;
}, at = (a) => a.type ? `is-${a.type}` : "", lt = /* @__PURE__ */ ee({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new Re() },
    columns: { default: () => [] },
    i: { default: 0 },
    editModeEnabled: { type: Boolean, default: !1 },
    hasInlineEditPerm: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(a, { emit: m }) {
    const p = m, u = a, o = h(u.modelValue), t = h(o.value[u.column.key]), y = h(null);
    let V = u.column.type;
    [ne.Integer, ne.Float].includes(V) && (V = ne.Number), F(t, (l) => {
      const M = JSON.parse(JSON.stringify(o.value));
      M[u.column.key] = l, p("update:modelValue", M);
    }), F(() => u.modelValue, (l) => {
      o.value = l, t.value = o.value[u.column.key];
    });
    const c = i(() => ({ ...u.column.slotData, item: o.value })), B = i(() => {
      var l, M, G, N;
      if ((l = u.column.field) != null && l.modalData && typeof ((M = u.column.field) == null ? void 0 : M.modalData) == "object")
        for (let U in u.column.field.modalData)
          if (typeof ((G = u.column.field) == null ? void 0 : G.modalData[U]) == "string" && u.column.field.modalData[U].startsWith("prop:")) {
            let I = u.column.field.modalData[U].substring(5);
            o.value[I];
          } else
            u.column.field.modalData[U];
      return (N = u.column.field) == null ? void 0 : N.modalData;
    });
    return (l, M) => {
      var I, te, R, ae;
      const G = z("lkt-anchor"), N = z("lkt-button"), U = z("lkt-field");
      return l.column.type === f(ne).Anchor ? (n(), C(G, X(De({ key: 0 }, l.column.anchor)), {
        default: L(() => [
          ue(_(f(se)(l.column, o.value, l.i)), 1)
        ]),
        _: 1
      }, 16)) : l.column.type === f(ne).Button ? (n(), C(N, X(De({ key: 1 }, l.column.button)), {
        default: L(() => [
          ue(_(f(se)(l.column, o.value, l.i)), 1)
        ]),
        _: 1
      }, 16)) : l.column.type === f(ne).Field && l.hasInlineEditPerm ? (n(), C(U, De({ key: 2 }, l.column.field, {
        "read-mode": !l.column.editable || !l.editModeEnabled,
        ref: (H) => y.value = H,
        "slot-data": c.value,
        label: ((I = l.column.field) == null ? void 0 : I.type) === "switch" || ((te = l.column.field) == null ? void 0 : te.type) === "check" ? l.column.label : "",
        "modal-data": B.value,
        prop: o.value,
        modelValue: t.value,
        "onUpdate:modelValue": M[0] || (M[0] = (H) => t.value = H)
      }), null, 16, ["read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : l.column.type === f(ne).Field ? (n(), C(U, De({ key: 3 }, l.column.field, {
        "read-mode": "",
        ref: (H) => y.value = H,
        "slot-data": c.value,
        label: ((R = l.column.field) == null ? void 0 : R.type) === "switch" || ((ae = l.column.field) == null ? void 0 : ae.type) === "check" ? l.column.label : "",
        "modal-data": B.value,
        prop: o.value,
        "model-value": t.value
      }), null, 16, ["slot-data", "label", "modal-data", "prop", "model-value"])) : (n(), d(w, { key: 4 }, [
        ue(_(f(se)(l.column, o.value, l.i, l.columns)), 1)
      ], 64));
    };
  }
}), Y = class Y {
};
Y.navButtonSlot = "", Y.dropButtonSlot = "", Y.editButtonSlot = "", Y.createButtonSlot = "", Y.defaultEmptySlot = void 0, Y.defaultSaveIcon = "", Y.defaultNoResultsMessage = "No results";
let T = Y;
const Wt = /* @__PURE__ */ ee({
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
  setup(a, { emit: m }) {
    const p = m, u = i(() => T.dropButtonSlot !== ""), o = i(() => T.dropButtonSlot);
    return (t, y) => {
      const V = z("lkt-button");
      return n(), C(V, {
        palette: "table-delete",
        icon: u.value ? "" : t.icon,
        text: u.value ? "" : t.text,
        resource: t.resource,
        "resource-data": t.resourceData,
        "confirm-modal": t.confirm,
        disabled: t.disabled,
        onClick: y[0] || (y[0] = xe((c) => p("click"), ["prevent", "stop"]))
      }, {
        default: L(() => [
          u.value ? (n(), C(x(o.value), { key: 0 })) : v("", !0)
        ]),
        _: 1
      }, 8, ["icon", "text", "resource", "resource-data", "confirm-modal", "disabled"]);
    };
  }
}), qt = /* @__PURE__ */ ee({
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
  setup(a, { emit: m }) {
    const p = m, u = i(() => T.editButtonSlot !== ""), o = i(() => T.editButtonSlot);
    return (t, y) => {
      const V = z("lkt-button");
      return n(), C(V, {
        palette: "table-delete",
        icon: u.value ? "" : t.icon,
        text: u.value ? "" : t.text,
        "on-click-to": t.link,
        "is-anchor": t.link !== "",
        resource: t.resource,
        "resource-data": t.resourceData,
        "confirm-modal": t.confirm,
        disabled: t.disabled,
        onClick: y[0] || (y[0] = xe((c) => p("click"), ["prevent", "stop"]))
      }, {
        default: L(() => [
          u.value ? (n(), C(x(o.value), { key: 0 })) : v("", !0)
        ]),
        _: 1
      }, 8, ["icon", "text", "on-click-to", "is-anchor", "resource", "resource-data", "confirm-modal", "disabled"]);
    };
  }
});
var Z = /* @__PURE__ */ ((a) => (a[a.Auto = 0] = "Auto", a[a.PreferItem = 1] = "PreferItem", a[a.PreferCustomItem = 2] = "PreferCustomItem", a[a.PreferColumns = 3] = "PreferColumns", a))(Z || {});
const jt = ["data-i", "data-draggable"], Kt = ["data-i"], zt = {
  key: 1,
  "data-role": "invalid-drag-indicator"
}, Gt = {
  key: 2,
  class: "lkt-table-nav-cell"
}, Jt = { class: "lkt-table-nav-container" }, Qt = ["colspan"], Xt = ["colspan"], Yt = ["data-column", "colspan", "title"], Zt = {
  key: 7,
  class: "lkt-table-col-drop"
}, _t = {
  key: 8,
  class: "lkt-table-col-edit"
}, xt = /* @__PURE__ */ ee({
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
    rowDisplayType: { type: [Number, Function], default: Z.Auto },
    renderDrag: { type: [Boolean, Function], default: !0 },
    disabledDrag: { type: [Boolean, Function], default: !0 }
  },
  emits: ["update:modelValue", "click", "show", "item-up", "item-down", "item-drop"],
  setup(a, { emit: m }) {
    const p = et(), u = m, o = a, t = h(o.modelValue);
    let y = typeof o.rowDisplayType == "function" ? o.rowDisplayType(t.value, o.i) : o.rowDisplayType;
    y || (y = Z.Auto);
    const V = [Z.Auto, Z.PreferCustomItem].includes(y), c = [Z.Auto, Z.PreferItem].includes(y), B = h(o.editLink);
    for (let r in t.value) B.value = tt(B.value, ":" + r, t.value[r]);
    const l = (r) => u("click", r), M = (r, k) => {
      u("show", r, k);
    }, G = i(() => {
      let r = [], k = !1;
      return typeof o.disabledDrag == "function" ? k = o.disabledDrag(t.value) : k = o.disabledDrag === !0, !k && o.sortable && o.isDraggable ? r.push("handle") : k && r.push("disabled"), r.join(" ");
    }), N = i(() => T.navButtonSlot !== ""), U = i(() => T.navButtonSlot), I = () => {
      u("item-up", o.i);
    }, te = () => {
      u("item-down", o.i);
    }, R = () => {
      u("item-drop", o.i);
    }, ae = () => {
    };
    F(() => o.modelValue, (r) => t.value = r), F(t, (r) => {
      u("update:modelValue", r);
    }, { deep: !0 });
    const H = i(() => typeof o.renderDrag == "function" ? o.renderDrag(t.value) : o.renderDrag === !0);
    return i(() => typeof o.disabledDrag == "function" ? o.disabledDrag(t.value) : o.disabledDrag === !0), (r, k) => {
      const D = z("lkt-button");
      return n(), d("tr", {
        "data-i": r.i,
        "data-draggable": r.isDraggable,
        class: K({ "type-custom-item": f(V), "type-item": f(c) })
      }, [
        r.sortable && r.isDraggable && r.editModeEnabled && H.value ? (n(), d("td", {
          key: 0,
          "data-role": "drag-indicator",
          class: K(G.value),
          "data-i": r.i
        }, null, 10, Kt)) : r.sortable && r.editModeEnabled && H.value ? (n(), d("td", zt)) : v("", !0),
        r.addNavigation && r.editModeEnabled ? (n(), d("td", Gt, [
          P("div", Jt, [
            ie(D, {
              palette: "table-nav",
              disabled: r.i === 0,
              onClick: I
            }, {
              default: L(() => [
                N.value ? (n(), C(x(U.value), {
                  key: 0,
                  direction: "up"
                })) : (n(), d(w, { key: 1 }, [
                  k[3] || (k[3] = P("i", { class: "" }, null, -1)),
                  k[4] || (k[4] = ue(" UP "))
                ], 64))
              ]),
              _: 1
            }, 8, ["disabled"]),
            ie(D, {
              palette: "table-nav",
              disabled: r.latestRow,
              onClick: te
            }, {
              default: L(() => [
                N.value ? (n(), C(x(U.value), {
                  key: 0,
                  direction: "down"
                })) : (n(), d(w, { key: 1 }, [
                  k[5] || (k[5] = P("i", { class: "" }, null, -1)),
                  k[6] || (k[6] = ue(" DOWN "))
                ], 64))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : v("", !0),
        r.displayHiddenColumnsIndicator ? (n(), d("td", {
          key: 3,
          onClick: k[0] || (k[0] = (E) => M(E, r.i)),
          "data-role": "show-more",
          class: K(r.hiddenIsVisible ? "state-open" : "")
        }, null, 2)) : v("", !0),
        f(V) && f(p)[`item-${r.i}`] ? (n(), d("td", {
          key: "td" + r.i,
          colspan: r.visibleColumns.length
        }, [
          $(r.$slots, `item-${r.i}`, {
            item: t.value,
            index: r.i
          })
        ], 8, Qt)) : f(c) && f(p).item ? (n(), d("td", {
          key: "td" + r.i,
          colspan: r.visibleColumns.length
        }, [
          $(r.$slots, "item", {
            item: t.value,
            index: r.i
          })
        ], 8, Xt)) : (n(!0), d(w, { key: 6 }, j(r.visibleColumns, (E) => (n(), d(w, null, [
          f(At)(E, r.emptyColumns, t.value) ? (n(), d("td", {
            key: "td" + r.i,
            "data-column": E.key,
            colspan: f(Me)(E, t.value),
            title: f(se)(E, t.value, r.i, r.visibleColumns),
            class: K(f(at)(E)),
            onClick: k[2] || (k[2] = (le) => l(le))
          }, [
            r.$slots[E.key] && f(Pt)(E, t.value) ? $(r.$slots, E.key, {
              key: 0,
              value: t.value[E.key],
              item: t.value,
              column: E,
              i: r.i
            }) : t.value ? (n(), C(lt, {
              key: 1,
              modelValue: t.value,
              "onUpdate:modelValue": k[1] || (k[1] = (le) => t.value = le),
              column: E,
              columns: r.visibleColumns,
              "edit-mode-enabled": r.editModeEnabled,
              "has-inline-edit-perm": r.hasInlineEditPerm,
              i: r.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : v("", !0)
          ], 10, Yt)) : v("", !0)
        ], 64))), 256)),
        r.canDrop && r.editModeEnabled ? (n(), d("td", Zt, [
          ie(Wt, {
            resource: r.dropResource,
            "resource-data": t.value,
            confirm: r.dropConfirm,
            text: r.dropText,
            icon: r.dropIcon,
            onClick: R
          }, null, 8, ["resource", "resource-data", "confirm", "text", "icon"])
        ])) : v("", !0),
        r.canEdit && r.editModeEnabled ? (n(), d("td", _t, [
          ie(qt, {
            "resource-data": t.value,
            text: r.editText,
            icon: r.editIcon,
            link: B.value,
            onClick: ae
          }, null, 8, ["resource-data", "text", "icon", "link"])
        ])) : v("", !0)
      ], 10, jt);
    };
  }
}), ea = { "data-role": "hidden-row" }, ta = ["colspan"], aa = ["data-column"], la = ["data-i"], oa = ["data-column", "title", "onClick"], na = /* @__PURE__ */ ee({
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
    emptyColumns: { default: () => [] }
  },
  emits: ["update:modelValue", "click"],
  setup(a, { emit: m }) {
    const p = m, u = a, o = h(u.modelValue), t = (y) => p("click", y);
    return F(() => u.modelValue, (y) => o.value = y), F(o, () => p("update:modelValue", o.value)), (y, V) => ve((n(), d("tr", ea, [
      P("td", { colspan: y.hiddenColumnsColSpan }, [
        P("table", null, [
          P("tr", null, [
            (n(!0), d(w, null, j(y.hiddenColumns, (c) => (n(), d("th", {
              "data-column": c.key
            }, [
              P("div", null, _(c.label), 1)
            ], 8, aa))), 256))
          ]),
          P("tr", { "data-i": y.i }, [
            (n(!0), d(w, null, j(y.hiddenColumns, (c, B) => (n(), d("td", {
              "data-column": c.key,
              title: f(se)(c, o.value, B, y.hiddenColumns),
              onClick: (l) => t(l, o.value)
            }, [
              y.$slots[c.key] ? $(y.$slots, c.key, {
                key: 0,
                value: o.value[c.key],
                item: o.value,
                column: c,
                i: B
              }) : (n(), C(lt, {
                key: 1,
                column: c,
                columns: y.hiddenColumns,
                modelValue: o.value,
                "onUpdate:modelValue": V[0] || (V[0] = (l) => o.value = l),
                i: B
              }, null, 8, ["column", "columns", "modelValue", "i"]))
            ], 8, oa))), 256))
          ], 8, la)
        ])
      ], 8, ta)
    ], 512)), [
      [be, y.hiddenIsVisible]
    ]);
  }
}), _e = /* @__PURE__ */ ee({
  __name: "CreateButton",
  props: {
    disabled: { type: Boolean, default: !1 },
    text: { default: "" },
    icon: { default: "" },
    to: { default: "" },
    modal: { default: "" },
    modalData: {}
  },
  emits: ["click", "append"],
  setup(a, { emit: m }) {
    const p = m, u = a, o = i(() => T.createButtonSlot !== ""), t = i(() => T.createButtonSlot), y = {
      ...u.modalData,
      beforeClose: (c) => {
        "itemCreated" in c && c.itemCreated === !0 && p("append", c.item);
      }
    }, V = () => {
      if (!u.modal) {
        p("click");
        return;
      }
    };
    return (c, B) => {
      const l = z("lkt-button");
      return n(), C(l, {
        palette: "table-create",
        disabled: c.disabled,
        icon: o.value ? "" : c.icon,
        text: o.value ? "" : c.text,
        modal: c.modal,
        "modal-data": y,
        "on-click-to": c.to,
        onClick: V
      }, {
        default: L(() => [
          o.value ? (n(), C(x(t.value), { key: 0 })) : v("", !0)
        ]),
        _: 1
      }, 8, ["disabled", "icon", "text", "modal", "on-click-to"]);
    };
  }
}), ua = ["data-column", "data-sortable", "data-sort", "colspan", "title"], ra = /* @__PURE__ */ ee({
  __name: "TableHeader",
  props: {
    column: { default: () => new Re() },
    sortBy: { default: "" },
    sortDirection: { default: "" },
    amountOfColumns: { default: 0 },
    items: { default: () => [] }
  },
  emits: ["click"],
  setup(a, { emit: m }) {
    const p = m, u = a, o = i(() => Ut(u.column, u.amountOfColumns, u.items)), t = i(() => u.column.sortable === !0), y = i(() => t.value && u.sortBy === u.column.key ? u.sortDirection : ""), V = i(() => u.column.label.startsWith("__:") ? ye(u.column.label.substring(3)) : u.column.label), c = () => p("click", u.column);
    return (B, l) => (n(), d("th", {
      "data-column": B.column.key,
      "data-sortable": t.value,
      "data-sort": y.value,
      colspan: o.value,
      title: V.value,
      class: K(f(at)(B.column)),
      onClick: c
    }, [
      P("div", null, _(V.value), 1)
    ], 10, ua));
  }
});
var J = /* @__PURE__ */ ((a) => (a.Table = "table", a.Item = "item", a.Ul = "ul", a.Ol = "ol", a))(J || {}), Q = /* @__PURE__ */ ((a) => (a.Create = "create", a.Update = "update", a.Edit = "edit", a.Drop = "drop", a.Sort = "sort", a.InlineEdit = "inline-edit", a.InlineCreate = "inline-create", a.ModalCreate = "modal-create", a.InlineCreateEver = "inline-create-ever", a))(Q || {});
const da = ["id"], ia = {
  key: 0,
  class: "lkt-table-page-buttons"
}, sa = { key: 1 }, ma = { class: "switch-edition-mode" }, fa = {
  key: 1,
  class: "lkt-table-page-buttons"
}, pa = {
  key: 2,
  class: "lkt-table-page-filters"
}, ca = ["data-sortable"], va = { key: 0 }, ba = {
  key: 0,
  "data-role": "drag-indicator"
}, ya = { key: 1 }, ka = { key: 2 }, ha = {
  key: 3,
  class: "lkt-table-col-drop"
}, ga = {
  key: 4,
  class: "lkt-table-col-edit"
}, Ca = ["id"], Da = ["id"], Sa = ["data-i"], Ia = ["data-i"], Ba = ["data-i"], Va = {
  key: 4,
  class: "lkt-table-empty"
}, Ea = {
  key: 5,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, Ta = /* @__PURE__ */ ee({
  __name: "LktTable",
  props: {
    modelValue: { default: () => [] },
    type: { default: J.Table },
    columns: { default: () => [] },
    sorter: { type: Function, default: Ze },
    draggableChecker: { type: Function, default: (a) => !0 },
    checkValidDrag: { type: Function, default: void 0 },
    renderDrag: { type: [Boolean, Function], default: !0 },
    disabledDrag: { type: [Boolean, Function] },
    sortable: { type: Boolean, default: !1 },
    hideEmptyColumns: { type: Boolean, default: !1 },
    initialSorting: { type: Boolean, default: !1 },
    draggableItemKey: { default: "name" },
    itemDisplayChecker: {},
    loading: { type: Boolean, default: !1 },
    page: { default: 1 },
    perms: { default: () => [] },
    resource: { default: "" },
    noResultsText: { default: T.defaultNoResultsMessage },
    title: { default: "" },
    titleTag: { default: "h2" },
    titleIcon: { default: "" },
    headerClass: { default: "" },
    wrapContentTag: { default: "div" },
    wrapContentClass: { default: "" },
    itemsContainerClass: { default: "" },
    filters: { default: () => [] },
    dataStateConfig: { default: () => ({}) },
    hiddenSave: { type: Boolean, default: !1 },
    editMode: { type: Boolean, default: !1 },
    saveDisabled: { type: Boolean, default: !1 },
    saveValidator: { type: Function, default: () => !0 },
    saveConfirm: { default: "" },
    confirmData: { default: () => ({}) },
    saveResource: { default: "" },
    saveResourceData: { default: () => ({}) },
    saveTooltipEngine: { default: "absolute" },
    splitSave: { type: Boolean, default: !1 },
    saveText: { default: "Save" },
    createText: { default: "Add item" },
    createIcon: { default: "" },
    createRoute: { default: "" },
    dropText: { default: "Delete" },
    dropIcon: { default: "" },
    editText: { default: "Edit" },
    editIcon: { default: "" },
    editLink: { default: "" },
    editModeText: { default: "Edit mode" },
    switchEditionEnabled: { type: Boolean, default: !1 },
    createDisabled: { type: Boolean },
    dropConfirm: { default: "" },
    dropResource: { default: "" },
    addNavigation: { type: Boolean, default: !1 },
    itemMode: { type: Boolean, default: !1 },
    createEnabledValidator: { type: Function, default: void 0 },
    newValueGenerator: { type: Function, default: void 0 },
    requiredItemsForTopCreate: { default: 0 },
    requiredItemsForBottomCreate: { default: 0 },
    slotItemVar: { default: "item" },
    rowDisplayType: { type: [Number, Function], default: Z.Auto },
    modal: { default: "" },
    modalData: {}
  },
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
  setup(a, { expose: m, emit: p }) {
    const u = p, o = et(), t = a, y = {}, V = h(typeof t.sorter == "function" ? t.sorter : Ze), c = h(Ot(t.columns)), B = h(Se.Asc), l = h(t.modelValue), M = h(y), G = h(null), N = h(t.columns), U = h(t.page), I = h(t.loading), te = h(!1), R = h(t.perms), ae = h(null), H = h(null), r = h({}), k = h(new Lt({ items: l.value }, t.dataStateConfig)), D = h(t.editMode), E = h(0), le = h(null), re = h(!1);
    F(I, (e) => u("update:loading", e)), F(U, (e) => u("page", e));
    const me = h(t.type);
    t.itemMode && me.value === J.Table && (me.value = J.Item);
    const ot = (e) => {
      R.value = e;
    }, nt = (e) => {
      Array.isArray(e.data) && (l.value = e.data), I.value = !1, te.value = !0, k.value.store({ items: l.value }).turnStoredIntoOriginal(), re.value = !1, we(() => {
        u("read-response", e);
      });
    }, ut = () => we(() => I.value = !0), rt = () => {
      ae.value.doRefresh();
    }, fe = Ft(12), Be = i(() => {
      if (!t.hideEmptyColumns) return [];
      let e = [];
      return N.value.forEach((s) => {
        let S = s.key, A = !1;
        l.value.forEach((W) => {
          if (typeof W.checkEmpty == "function")
            return W.checkEmpty(W);
          W[S] && (A = !0);
        }), A || e.push(S);
      }), e;
    }), ke = i(() => N.value.filter((e) => !e.hidden)), Ve = i(() => N.value.filter((e) => e.hidden)), dt = i(() => {
      let e = ke.value.length + 1;
      return t.sortable && ++e, e;
    }), it = i(() => N.value.filter((e) => e.isForRowKey)), Fe = i(() => Ve.value.length > 0 && !t.sortable), st = i(() => N.value.map((e) => e.key)), Le = i(() => {
      let e = [];
      for (let s in o) st.value.indexOf(s) !== -1 && e.push(s);
      return e;
    }), Ne = i(() => t.hiddenSave || I.value || !t.saveResource ? !1 : D.value && re.value ? !0 : D.value), mt = i(() => ge.value && l.value.length >= t.requiredItemsForTopCreate || t.switchEditionEnabled ? !0 : Ne.value || D.value && de.value), ft = i(() => t.saveDisabled || typeof t.saveValidator == "function" && !t.saveValidator(l.value) ? !1 : re.value), pt = i(() => l.value.length), ct = i(() => ({
      items: l.value,
      ...t.saveResourceData
    })), vt = i(() => t.titleTag === "" ? "h2" : t.titleTag), bt = i(() => t.wrapContentTag === "" ? "div" : t.wrapContentTag), Ee = i(() => t.title.startsWith("__:") ? ye(t.title.substring(3)) : t.title), yt = i(() => t.saveText.startsWith("__:") ? ye(t.saveText.substring(3)) : t.saveText), kt = i(() => t.editModeText.startsWith("__:") ? ye(t.editModeText.substring(3)) : t.editModeText), de = i(() => R.value.includes(Q.Create)), Te = i(() => R.value.includes("read")), pe = i(() => R.value.includes(Q.Update)), Ue = i(() => R.value.includes(Q.Edit)), ht = i(() => R.value.includes(Q.InlineEdit)), gt = i(() => R.value.includes(Q.ModalCreate)), Ct = i(() => R.value.includes(Q.InlineCreate)), Pe = i(() => R.value.includes(Q.InlineCreateEver)), ce = i(() => R.value.includes(Q.Drop)), Dt = (e) => {
      let s = e.target;
      if (typeof s.dataset.column > "u")
        do
          s = s.parentNode;
        while (typeof s.dataset.column > "u" && s.tagName !== "TABLE" && s.tagName !== "body");
      if (s.tagName === "TD" && (s = s.parentNode, s = s.dataset.i, typeof s < "u"))
        return l.value[s];
    }, St = (e) => l.value[e], It = (e) => {
      var s;
      return (s = G.value) == null ? void 0 : s.querySelector(`[data-i="${e}"]`);
    }, Ae = (e) => M.value["tr_" + e] === !0, Oe = (e) => {
      e && e.sortable && (l.value = l.value.sort((s, S) => V.value(s, S, e, B.value)), B.value = B.value === Se.Asc ? Se.Desc : Se.Asc, c.value = e.key, u("sort", [c.value, B.value]));
    }, He = (e) => {
      u("click", e);
    }, We = (e, s) => {
      let S = "tr_" + s;
      M.value[S] = typeof M.value[S] > "u" ? !0 : !M.value[S];
    }, Bt = (e) => {
      var S, A, W, q;
      let s = parseInt((q = (W = (A = (S = e == null ? void 0 : e.originalEvent) == null ? void 0 : S.toElement) == null ? void 0 : A.closest("tr")) == null ? void 0 : W.dataset) == null ? void 0 : q.i);
      return typeof t.disabledDrag == "function" && t.disabledDrag(l.value[s]) || typeof t.disabledDrag == "boolean" && t.disabledDrag ? !1 : typeof t.checkValidDrag == "function" ? t.checkValidDrag(e) : !0;
    }, qe = (e) => typeof t.draggableChecker == "function" ? t.draggableChecker(e) : !0, je = () => {
      if (de.value) {
        u("click-create");
        return;
      }
      if (Pe.value)
        u("click-create");
      else {
        if (typeof t.newValueGenerator == "function") {
          let e = t.newValueGenerator();
          if (typeof e == "object" || me.value !== J.Table) {
            l.value.push(e);
            return;
          }
        }
        l.value.push({});
      }
    }, Ke = (e) => {
      l.value.push(e);
    }, ze = () => {
      I.value = !0;
    }, Ge = () => {
      I.value = !1;
    }, Vt = (e, s) => {
      if (u("before-save"), t.saveResource && (I.value = !1, !s.success)) {
        u("error", s.httpStatus);
        return;
      }
      k.value.turnStoredIntoOriginal(), re.value = !1, u("save", s);
    }, Je = (e, s, S) => {
      if (S >= e.length) {
        let A = S - e.length + 1;
        for (; A--; ) e.push(void 0);
      }
      return e.splice(S, 0, e.splice(s, 1)[0]), e;
    }, Et = (e) => {
      Je(l.value, e, e - 1), E.value = Ie();
    }, Tt = (e) => {
      Je(l.value, e, e + 1), E.value = Ie();
    }, he = (e) => {
      l.value.splice(e, 1), E.value = Ie();
    }, $t = () => {
      r.value && (r.value.destroy(), r.value = {});
    }, Qe = () => {
      le.value || (le.value = document.getElementById("lkt-table-body-" + fe)), r.value = new Nt(le.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let s = e.oldIndex, S = e.newIndex;
          l.value.splice(S, 0, l.value.splice(s, 1)[0]), E.value = Ie(), u("drag-end", l.value[S]);
        },
        onMove: function(e, s) {
          return Bt(e);
        }
      });
    }, $e = (e, s, S = !1) => {
      let A = [E.value, fe, "row", s];
      return S && A.push("hidden"), it.value.forEach((W) => {
        let q = String(e[W.key]).toLowerCase();
        q.length > 50 && (q = q.substring(0, 50)), q = tt(q, " ", "-"), A.push(q);
      }), A.join("-");
    }, Xe = i(() => typeof t.createEnabledValidator == "function" ? t.createEnabledValidator({ items: l.value }) : !0), ge = i(() => Pe.value || de.value && D.value || Ct.value && D.value || gt.value && D.value), Ce = (e, s) => typeof t.itemDisplayChecker == "function" ? t.itemDisplayChecker(e) : !0;
    Mt(() => {
      t.initialSorting && Oe(Ht(t.columns, c.value)), k.value.store({ items: l.value }).turnStoredIntoOriginal(), re.value = !1, t.sortable && we(() => {
        Qe();
      });
    }), F(() => t.sortable, (e) => {
      e ? Qe() : $t();
    }), F(() => t.perms, (e) => R.value = e), F(R, (e) => u("update:perms", e)), F(() => t.editMode, (e) => D.value = e), F(() => t.columns, (e) => N.value = e, { deep: !0 }), F(() => t.modelValue, (e) => l.value = e, { deep: !0 }), F(l, (e) => {
      k.value.increment({ items: e }), re.value = k.value.changed(), u("update:modelValue", e);
    }, { deep: !0 }), m({
      getItemByEvent: Dt,
      getItemByIndex: St,
      getRowByIndex: It,
      doRefresh: rt,
      getHtml: () => H.value
    });
    const wt = i(() => typeof T.defaultEmptySlot < "u"), Rt = i(() => T.defaultEmptySlot);
    return (e, s) => {
      const S = z("lkt-button"), A = z("lkt-field"), W = z("lkt-loader"), q = z("lkt-paginator");
      return n(), d("section", {
        ref_key: "element",
        ref: H,
        class: "lkt-table-page",
        id: "lkt-table-page-" + f(fe)
      }, [
        Ee.value || f(o).title ? (n(), d("header", {
          key: 0,
          class: K(e.headerClass)
        }, [
          Ee.value ? (n(), C(x(vt.value), { key: 0 }, {
            default: L(() => [
              e.titleIcon ? (n(), d("i", {
                key: 0,
                class: K(e.titleIcon)
              }, null, 2)) : v("", !0),
              ue(" " + _(Ee.value), 1)
            ]),
            _: 1
          })) : v("", !0),
          f(o).title ? $(e.$slots, "title", { key: 1 }) : v("", !0)
        ], 2)) : v("", !0),
        (n(), C(x(bt.value), {
          class: K(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: L(() => [
            mt.value ? (n(), d("div", ia, [
              ve(ie(S, {
                class: "lkt-table--save-button",
                ref: "saveButton",
                icon: f(T).defaultSaveIcon,
                disabled: !ft.value,
                "confirm-modal": e.saveConfirm,
                "confirm-data": e.confirmData,
                resource: e.saveResource,
                "resource-data": ct.value,
                split: e.splitSave,
                "tooltip-engine": e.saveTooltipEngine,
                onLoading: ze,
                onLoaded: Ge,
                onClick: Vt
              }, {
                split: L(({ doClose: g, doRootClick: b }) => [
                  $(e.$slots, "button-save-split", {
                    doClose: g,
                    doRootClick: b,
                    dataState: k.value,
                    onButtonLoading: ze,
                    onButtonLoaded: Ge
                  })
                ]),
                default: L(() => [
                  f(o)["button-save"] ? $(e.$slots, "button-save", {
                    key: 0,
                    items: l.value,
                    editMode: e.editMode,
                    canUpdate: !e.saveDisabled
                  }) : (n(), d("span", sa, _(yt.value), 1))
                ]),
                _: 3
              }, 8, ["icon", "disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "split", "tooltip-engine"]), [
                [be, Ne.value]
              ]),
              ge.value && l.value.length >= e.requiredItemsForTopCreate ? (n(), C(_e, {
                key: 0,
                disabled: !Xe.value || e.createDisabled,
                text: e.createText,
                icon: e.createIcon,
                to: e.createRoute,
                modal: e.modal,
                "modal-data": e.modalData,
                onClick: je,
                onAppend: Ke
              }, null, 8, ["disabled", "text", "icon", "to", "modal", "modal-data"])) : v("", !0),
              P("div", ma, [
                ve(ie(A, {
                  type: "switch",
                  modelValue: D.value,
                  "onUpdate:modelValue": s[0] || (s[0] = (g) => D.value = g),
                  label: kt.value
                }, null, 8, ["modelValue", "label"]), [
                  [be, e.switchEditionEnabled]
                ])
              ])
            ])) : v("", !0),
            f(o).buttons ? (n(), d("div", fa, [
              $(e.$slots, "buttons")
            ])) : v("", !0),
            te.value && f(o).filters ? (n(), d("div", pa, [
              $(e.$slots, "filters", {
                items: l.value,
                isLoading: I.value
              })
            ])) : v("", !0),
            I.value ? (n(), C(W, { key: 3 })) : v("", !0),
            ve(P("div", {
              class: "lkt-table",
              "data-sortable": e.sortable
            }, [
              me.value === f(J).Table ? (n(), d("table", va, [
                P("thead", null, [
                  P("tr", null, [
                    e.sortable && D.value ? (n(), d("th", ba)) : v("", !0),
                    e.addNavigation && D.value ? (n(), d("th", ya)) : v("", !0),
                    Fe.value ? (n(), d("th", ka)) : v("", !0),
                    (n(!0), d(w, null, j(ke.value, (g) => (n(), d(w, null, [
                      Be.value.indexOf(g.key) === -1 ? (n(), C(ra, {
                        key: 0,
                        column: g,
                        "sort-by": c.value,
                        "sort-direction": B.value,
                        "amount-of-columns": e.columns.length,
                        items: l.value,
                        onClick: (b) => Oe(g)
                      }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : v("", !0)
                    ], 64))), 256)),
                    ce.value && D.value ? (n(), d("th", ha)) : v("", !0),
                    Ue.value && pe.value && D.value ? (n(), d("th", ga)) : v("", !0)
                  ])
                ]),
                P("tbody", {
                  ref_key: "tableBody",
                  ref: G,
                  id: "lkt-table-body-" + f(fe)
                }, [
                  (n(!0), d(w, null, j(l.value, (g, b) => ve((n(), C(xt, {
                    modelValue: l.value[b],
                    "onUpdate:modelValue": (O) => l.value[b] = O,
                    key: $e(g, b),
                    i: b,
                    "display-hidden-columns-indicator": Fe.value,
                    "is-draggable": qe(g),
                    sortable: e.sortable,
                    "visible-columns": ke.value,
                    "empty-columns": Be.value,
                    "add-navigation": e.addNavigation,
                    "hidden-is-visible": Ae(b),
                    "latest-row": b + 1 === pt.value,
                    "can-drop": ce.value && D.value,
                    "drop-confirm": e.dropConfirm,
                    "drop-resource": e.dropResource,
                    "drop-text": e.dropText,
                    "drop-icon": e.dropIcon,
                    "can-edit": Ue.value && pe.value && D.value,
                    "edit-text": e.editText,
                    "edit-icon": e.editIcon,
                    "edit-link": e.editLink,
                    "edit-mode-enabled": D.value,
                    "has-inline-edit-perm": ht.value,
                    "row-display-type": e.rowDisplayType,
                    "render-drag": e.renderDrag,
                    "disabled-drag": e.disabledDrag,
                    onClick: He,
                    onShow: We,
                    onItemUp: Et,
                    onItemDown: Tt,
                    onItemDrop: he
                  }, Ye({ _: 2 }, [
                    f(o)[`item-${b}`] ? {
                      name: `item-${b}`,
                      fn: L((O) => [
                        $(e.$slots, `item-${b}`, X({
                          [e.slotItemVar || ""]: O.item,
                          index: b
                        }))
                      ]),
                      key: "0"
                    } : f(o).item ? {
                      name: "item",
                      fn: L((O) => [
                        $(e.$slots, "item", X({
                          [e.slotItemVar || ""]: O.item,
                          index: b
                        }))
                      ]),
                      key: "1"
                    } : void 0,
                    j(Le.value, (O) => ({
                      name: O,
                      fn: L((oe) => [
                        $(e.$slots, O, X({
                          [e.slotItemVar || ""]: oe.item,
                          value: oe.value,
                          column: oe.column
                        }))
                      ])
                    }))
                  ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "display-hidden-columns-indicator", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "hidden-is-visible", "latest-row", "can-drop", "drop-confirm", "drop-resource", "drop-text", "drop-icon", "can-edit", "edit-text", "edit-icon", "edit-link", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag"])), [
                    [be, Ce(l.value[b])]
                  ])), 128)),
                  Ve.value.length > 0 ? (n(!0), d(w, { key: 0 }, j(l.value, (g, b) => (n(), C(na, {
                    modelValue: l.value[b],
                    "onUpdate:modelValue": (O) => l.value[b] = O,
                    key: $e(g, b, !0),
                    i: b,
                    "hidden-columns": Ve.value,
                    "hidden-columns-col-span": dt.value,
                    "is-draggable": qe(g),
                    sortable: e.sortable,
                    "visible-columns": ke.value,
                    "empty-columns": Be.value,
                    "hidden-is-visible": Ae(b),
                    onClick: He,
                    onShow: We
                  }, Ye({ _: 2 }, [
                    j(Le.value, (O) => ({
                      name: O,
                      fn: L((oe) => [
                        $(e.$slots, O, X({
                          [e.slotItemVar || ""]: oe.item,
                          value: oe.value,
                          column: oe.column
                        }))
                      ])
                    }))
                  ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "hidden-columns", "hidden-columns-col-span", "is-draggable", "sortable", "visible-columns", "empty-columns", "hidden-is-visible"]))), 128)) : v("", !0)
                ], 8, Ca)
              ])) : me.value === f(J).Item ? (n(), d("div", {
                key: 1,
                ref_key: "tableBody",
                ref: G,
                id: "lkt-table-body-" + f(fe),
                class: K(["lkt-table-items-container", e.itemsContainerClass])
              }, [
                (n(!0), d(w, null, j(l.value, (g, b) => (n(), d(w, null, [
                  Ce(g) ? (n(), d("div", {
                    class: "lkt-table-item",
                    "data-i": b,
                    key: $e(g, b)
                  }, [
                    $(e.$slots, "item", X({
                      [e.slotItemVar || ""]: g,
                      index: b,
                      editing: D.value,
                      canCreate: de.value,
                      canRead: Te.value,
                      canUpdate: pe.value,
                      canDrop: ce.value,
                      isLoading: I.value,
                      doDrop: () => he(b)
                    }))
                  ], 8, Sa)) : v("", !0)
                ], 64))), 256))
              ], 10, Da)) : f(J).Ul ? (n(), d("ul", {
                key: 2,
                class: K(["lkt-table-items-container", e.itemsContainerClass])
              }, [
                (n(!0), d(w, null, j(l.value, (g, b) => (n(), d(w, null, [
                  Ce(g) ? (n(), d("li", {
                    key: 0,
                    class: "lkt-table-item",
                    "data-i": b
                  }, [
                    $(e.$slots, "item", X({
                      [e.slotItemVar || ""]: g,
                      index: b,
                      editing: D.value,
                      canCreate: de.value,
                      canRead: Te.value,
                      canUpdate: pe.value,
                      canDrop: ce.value,
                      isLoading: I.value,
                      doDrop: () => he(b)
                    }))
                  ], 8, Ia)) : v("", !0)
                ], 64))), 256))
              ], 2)) : f(J).Ul ? (n(), d("ol", {
                key: 3,
                class: K(["lkt-table-items-container", e.itemsContainerClass])
              }, [
                (n(!0), d(w, null, j(l.value, (g, b) => (n(), d(w, null, [
                  Ce(g) ? (n(), d("li", {
                    key: 0,
                    class: "lkt-table-item",
                    "data-i": b
                  }, [
                    $(e.$slots, "item", X({
                      [e.slotItemVar || ""]: g,
                      index: b,
                      editing: D.value,
                      canCreate: de.value,
                      canRead: Te.value,
                      canUpdate: pe.value,
                      canDrop: ce.value,
                      isLoading: I.value,
                      doDrop: () => he(b)
                    }))
                  ], 8, Ba)) : v("", !0)
                ], 64))), 256))
              ], 2)) : v("", !0)
            ], 8, ca), [
              [be, !I.value && l.value.length > 0]
            ]),
            !I.value && l.value.length === 0 ? (n(), d("div", Va, [
              f(o).empty ? $(e.$slots, "empty", { key: 0 }) : wt.value ? (n(), C(x(Rt.value), {
                key: 1,
                message: e.noResultsText
              }, null, 8, ["message"])) : e.noResultsText ? (n(), d(w, { key: 2 }, [
                ue(_(e.noResultsText), 1)
              ], 64)) : v("", !0)
            ])) : v("", !0),
            ge.value || f(o).bottomButtons ? (n(), d("div", Ea, [
              ge.value && l.value.length >= e.requiredItemsForBottomCreate ? (n(), C(_e, {
                key: 0,
                disabled: !Xe.value || e.createDisabled,
                text: e.createText,
                icon: e.createIcon,
                to: e.createRoute,
                modal: e.modal,
                "modal-data": e.modalData,
                onClick: je,
                onAppend: Ke
              }, null, 8, ["disabled", "text", "icon", "to", "modal", "modal-data"])) : v("", !0),
              $(e.$slots, "bottom-buttons")
            ])) : v("", !0),
            e.resource.length > 0 ? (n(), C(q, {
              key: 6,
              ref_key: "paginator",
              ref: ae,
              modelValue: U.value,
              "onUpdate:modelValue": s[1] || (s[1] = (g) => U.value = g),
              resource: e.resource,
              filters: e.filters,
              onLoading: ut,
              onPerms: ot,
              onResponse: nt
            }, null, 8, ["modelValue", "resource", "filters"])) : v("", !0)
          ]),
          _: 3
        }, 8, ["class"]))
      ], 8, da);
    };
  }
}), Pa = {
  install: (a) => {
    a.component("lkt-table") === void 0 && a.component("lkt-table", Ta);
  }
}, Aa = (a) => (T.navButtonSlot = a, !0), Oa = (a) => (T.dropButtonSlot = a, !0), Ha = (a) => (T.createButtonSlot = a, !0), Wa = (a) => {
  T.defaultEmptySlot = a;
}, qa = (a) => {
  T.defaultSaveIcon = a;
};
export {
  za as Column,
  Ua as createColumn,
  Pa as default,
  Ha as setTableCreateButtonSlot,
  Oa as setTableDropButtonSlot,
  Wa as setTableEmptySlot,
  Aa as setTableNavButtonSlot,
  qa as setTableSaveIcon
};
