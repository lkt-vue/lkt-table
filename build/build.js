import { reactive as Nt, defineComponent as _, ref as h, watch as F, computed as d, resolveComponent as G, unref as c, openBlock as n, createBlock as C, withCtx as A, createTextVNode as re, toDisplayString as Z, createElementBlock as i, mergeProps as Xe, Fragment as R, withModifiers as xe, resolveDynamicComponent as O, createCommentVNode as v, useSlots as et, normalizeClass as j, createElementVNode as U, createVNode as ne, renderSlot as T, renderList as K, withDirectives as ce, vShow as pe, onMounted as Ft, nextTick as $e, createSlots as Ye, normalizeProps as te } from "vue";
import { Field as Ze } from "lkt-field";
import { __ as be } from "lkt-i18n";
import { replaceAll as tt, generateRandomString as Lt } from "lkt-string-tools";
import { DataState as At } from "lkt-data-state";
import Ut from "sortablejs";
import { time as Se } from "lkt-date-tools";
var ae = /* @__PURE__ */ ((t) => (t.Text = "text", t.Number = "number", t.Check = "check", t.Switch = "switch", t.Select = "select", t.Email = "email", t.Tel = "tel", t.File = "file", t.Link = "link", t.Action = "action", t.Integer = "int", t.Float = "float", t.None = "", t))(ae || {});
class at {
  constructor(s = {}) {
    this.key = "", this.label = "", this.sortable = !0, this.hidden = !1, this.editable = !1, this.formatter = void 0, this.checkEmpty = void 0, this.colspan = void 0, this.preferSlot = !0, this.type = ae.None, this.link = "", this.action = void 0, this.isForRowKey = !1, this.extractTitleFromColumn = "", this.slotData = {}, this.field = new Ze();
    for (let m in s)
      this[m] = s[m];
    this.field = new Ze(this.field);
  }
  getHref(s) {
    return typeof this.link == "function" ? this.link(s) : this.link;
  }
  doAction(s) {
    if (typeof this.action == "function")
      return this.action(s);
    console.warn("No action defined");
  }
}
const Pa = (t) => Nt(new at(t)), Oe = (t, s, m, u) => {
  if (!m) return 0;
  let o = t[m.key], a = s[m.key];
  if (u === "asc") {
    if (o > a) return 1;
    if (a > o) return -1;
  } else {
    if (o > a) return -1;
    if (a > o) return 1;
  }
  return 0;
}, ue = (t, s, m, u = []) => {
  if (t.extractTitleFromColumn) {
    let o = u.find((a) => a.key === t.extractTitleFromColumn);
    if (o)
      return ue(o, s, m, u);
  }
  if (t.formatter && typeof t.formatter == "function") {
    let o = t.formatter(s[t.key], s, t, m);
    return o.startsWith("__:") ? be(o.substring(3)) : o;
  }
  return s[t.key];
}, Pt = (t, s, m) => {
  if (!t.colspan) return -1;
  let u = s;
  return m.forEach((o) => {
    let a = Te(t, o);
    a > 0 && a < u && (u = a);
  }), u;
}, Te = (t, s) => t.colspan === !1 ? !1 : typeof t.colspan == "function" ? t.colspan(s) : t.colspan, Ht = (t, s) => typeof t.preferSlot > "u" ? !0 : t.preferSlot === !1 ? !1 : typeof t.preferSlot == "function" ? t.preferSlot(s) : !0, Wt = (t, s, m) => {
  if (typeof t != "object" || !t.key || s.indexOf(t.key) > -1) return !1;
  let u = Te(t, m);
  return typeof t.colspan > "u" ? !0 : (typeof t.colspan < "u" && (typeof t.colspan == "function" ? u = parseInt(t.colspan(m)) : u = parseInt(t.colspan)), u > 0);
}, qt = (t = []) => {
  if (t.length > 0) {
    for (let s = 0; s < t.length; ++s)
      if (t[s].sortable) return t[s].key;
  }
  return "";
}, Kt = (t, s) => {
  if (t.length > 0) {
    for (let m = 0; m < t.length; ++m)
      if (t[m].key === s) return t[m];
  }
  return null;
}, lt = (t) => t.type ? `is-${t.type}` : "", ot = /* @__PURE__ */ _({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new at() },
    columns: { default: () => [] },
    i: { default: 0 },
    editModeEnabled: { type: Boolean, default: !1 },
    hasInlineEditPerm: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: s }) {
    const m = s, u = t, o = h(u.modelValue), a = h(o.value[u.column.key]), y = h(null);
    let I = u.column.type;
    [ae.Integer, ae.Float].includes(I) && (I = ae.Number), F(a, (l) => {
      const M = JSON.parse(JSON.stringify(o.value));
      M[u.column.key] = l, m("update:modelValue", M);
    }), F(() => u.modelValue, (l) => {
      o.value = l, a.value = o.value[u.column.key];
    });
    const p = d(() => ({ ...u.column.slotData, item: o.value })), B = d(() => {
      var l, M, z, N;
      if ((l = u.column.field) != null && l.modalData && typeof ((M = u.column.field) == null ? void 0 : M.modalData) == "object")
        for (let w in u.column.field.modalData)
          if (typeof ((z = u.column.field) == null ? void 0 : z.modalData[w]) == "string" && u.column.field.modalData[w].startsWith("prop:")) {
            let $ = u.column.field.modalData[w].substring(5);
            o.value[$];
          } else
            u.column.field.modalData[w];
      return (N = u.column.field) == null ? void 0 : N.modalData;
    });
    return (l, M) => {
      const z = G("lkt-anchor"), N = G("lkt-field");
      return l.column.type === c(ae).Link ? (n(), C(z, {
        key: 0,
        to: l.column.getHref(o.value)
      }, {
        default: A(() => [
          re(Z(c(ue)(l.column, o.value, l.i)), 1)
        ]),
        _: 1
      }, 8, ["to"])) : l.column.type === c(ae).Action ? (n(), i("a", {
        key: 1,
        href: "#",
        onClick: M[0] || (M[0] = (w) => l.column.doAction(o.value))
      }, Z(c(ue)(l.column, o.value, l.i)), 1)) : l.column.type !== "" && l.hasInlineEditPerm ? (n(), C(N, Xe({ key: 2 }, l.column.field, {
        type: c(I),
        "read-mode": !l.column.editable || !l.editModeEnabled,
        ref: (w) => y.value = w,
        "slot-data": p.value,
        label: l.column.type === "switch" || l.column.type === "check" ? l.column.label : "",
        "modal-data": B.value,
        prop: o.value,
        modelValue: a.value,
        "onUpdate:modelValue": M[1] || (M[1] = (w) => a.value = w)
      }), null, 16, ["type", "read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : l.column.type !== "" ? (n(), C(N, Xe({ key: 3 }, l.column.field, {
        type: c(I),
        "read-mode": "",
        ref: (w) => y.value = w,
        "slot-data": p.value,
        label: l.column.type === "switch" || l.column.type === "check" ? l.column.label : "",
        "modal-data": B.value,
        prop: o.value,
        "model-value": a.value
      }), null, 16, ["type", "slot-data", "label", "modal-data", "prop", "model-value"])) : (n(), i(R, { key: 4 }, [
        re(Z(c(ue)(l.column, o.value, l.i, l.columns)), 1)
      ], 64));
    };
  }
}), X = class X {
};
X.navButtonSlot = "", X.dropButtonSlot = "", X.editButtonSlot = "", X.createButtonSlot = "", X.defaultEmptySlot = void 0, X.defaultSaveIcon = "", X.defaultNoResultsMessage = "No results";
let E = X;
const jt = /* @__PURE__ */ _({
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
  setup(t, { emit: s }) {
    const m = s, u = d(() => E.dropButtonSlot !== ""), o = d(() => E.dropButtonSlot);
    return (a, y) => {
      const I = G("lkt-button");
      return n(), C(I, {
        palette: "table-delete",
        icon: u.value ? "" : a.icon,
        text: u.value ? "" : a.text,
        resource: a.resource,
        "resource-data": a.resourceData,
        "confirm-modal": a.confirm,
        disabled: a.disabled,
        onClick: y[0] || (y[0] = xe((p) => m("click"), ["prevent", "stop"]))
      }, {
        default: A(() => [
          u.value ? (n(), C(O(o.value), { key: 0 })) : v("", !0)
        ]),
        _: 1
      }, 8, ["icon", "text", "resource", "resource-data", "confirm-modal", "disabled"]);
    };
  }
}), zt = /* @__PURE__ */ _({
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
  setup(t, { emit: s }) {
    const m = s, u = d(() => E.editButtonSlot !== ""), o = d(() => E.editButtonSlot);
    return (a, y) => {
      const I = G("lkt-button");
      return n(), C(I, {
        palette: "table-delete",
        icon: u.value ? "" : a.icon,
        text: u.value ? "" : a.text,
        "on-click-to": a.link,
        "is-anchor": a.link !== "",
        resource: a.resource,
        "resource-data": a.resourceData,
        "confirm-modal": a.confirm,
        disabled: a.disabled,
        onClick: y[0] || (y[0] = xe((p) => m("click"), ["prevent", "stop"]))
      }, {
        default: A(() => [
          u.value ? (n(), C(O(o.value), { key: 0 })) : v("", !0)
        ]),
        _: 1
      }, 8, ["icon", "text", "on-click-to", "is-anchor", "resource", "resource-data", "confirm-modal", "disabled"]);
    };
  }
});
var Y = /* @__PURE__ */ ((t) => (t[t.Auto = 0] = "Auto", t[t.PreferItem = 1] = "PreferItem", t[t.PreferCustomItem = 2] = "PreferCustomItem", t[t.PreferColumns = 3] = "PreferColumns", t))(Y || {});
const Gt = ["data-i", "data-draggable"], Jt = ["data-i"], Qt = {
  key: 1,
  "data-role": "invalid-drag-indicator"
}, Xt = {
  key: 2,
  class: "lkt-table-nav-cell"
}, Yt = { class: "lkt-table-nav-container" }, Zt = ["colspan"], Ot = ["colspan"], _t = ["data-column", "colspan", "title"], xt = {
  key: 7,
  class: "lkt-table-col-drop"
}, ea = {
  key: 8,
  class: "lkt-table-col-edit"
}, ta = /* @__PURE__ */ _({
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
    rowDisplayType: { type: [Number, Function], default: Y.Auto },
    renderDrag: { type: [Boolean, Function], default: !0 },
    disabledDrag: { type: [Boolean, Function], default: !0 }
  },
  emits: ["update:modelValue", "click", "show", "item-up", "item-down", "item-drop"],
  setup(t, { emit: s }) {
    const m = et(), u = s, o = t, a = h(o.modelValue);
    let y = typeof o.rowDisplayType == "function" ? o.rowDisplayType(a.value, o.i) : o.rowDisplayType;
    y || (y = Y.Auto);
    const I = [Y.Auto, Y.PreferCustomItem].includes(y), p = [Y.Auto, Y.PreferItem].includes(y), B = h(o.editLink);
    for (let r in a.value) B.value = tt(B.value, ":" + r, a.value[r]);
    const l = (r) => u("click", r), M = (r, k) => {
      u("show", r, k);
    }, z = d(() => {
      let r = [], k = !1;
      return typeof o.disabledDrag == "function" ? k = o.disabledDrag(a.value) : k = o.disabledDrag === !0, !k && o.sortable && o.isDraggable ? r.push("handle") : k && r.push("disabled"), r.join(" ");
    }), N = d(() => E.navButtonSlot !== ""), w = d(() => E.navButtonSlot), $ = () => {
      u("item-up", o.i);
    }, ye = () => {
      u("item-down", o.i);
    }, L = () => {
      u("item-drop", o.i);
    }, ke = () => {
    };
    F(() => o.modelValue, (r) => a.value = r), F(a, (r) => {
      u("update:modelValue", r);
    }, { deep: !0 });
    const ie = d(() => typeof o.renderDrag == "function" ? o.renderDrag(a.value) : o.renderDrag === !0);
    return d(() => typeof o.disabledDrag == "function" ? o.disabledDrag(a.value) : o.disabledDrag === !0), (r, k) => {
      const D = G("lkt-button");
      return n(), i("tr", {
        "data-i": r.i,
        "data-draggable": r.isDraggable,
        class: j({ "type-custom-item": c(I), "type-item": c(p) })
      }, [
        r.sortable && r.isDraggable && r.editModeEnabled && ie.value ? (n(), i("td", {
          key: 0,
          "data-role": "drag-indicator",
          class: j(z.value),
          "data-i": r.i
        }, null, 10, Jt)) : r.sortable && r.editModeEnabled && ie.value ? (n(), i("td", Qt)) : v("", !0),
        r.addNavigation && r.editModeEnabled ? (n(), i("td", Xt, [
          U("div", Yt, [
            ne(D, {
              palette: "table-nav",
              disabled: r.i === 0,
              onClick: $
            }, {
              default: A(() => [
                N.value ? (n(), C(O(w.value), {
                  key: 0,
                  direction: "up"
                })) : (n(), i(R, { key: 1 }, [
                  k[3] || (k[3] = U("i", { class: "" }, null, -1)),
                  k[4] || (k[4] = re(" UP "))
                ], 64))
              ]),
              _: 1
            }, 8, ["disabled"]),
            ne(D, {
              palette: "table-nav",
              disabled: r.latestRow,
              onClick: ye
            }, {
              default: A(() => [
                N.value ? (n(), C(O(w.value), {
                  key: 0,
                  direction: "down"
                })) : (n(), i(R, { key: 1 }, [
                  k[5] || (k[5] = U("i", { class: "" }, null, -1)),
                  k[6] || (k[6] = re(" DOWN "))
                ], 64))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : v("", !0),
        r.displayHiddenColumnsIndicator ? (n(), i("td", {
          key: 3,
          onClick: k[0] || (k[0] = (V) => M(V, r.i)),
          "data-role": "show-more",
          class: j(r.hiddenIsVisible ? "state-open" : "")
        }, null, 2)) : v("", !0),
        c(I) && c(m)[`item-${r.i}`] ? (n(), i("td", {
          key: "td" + r.i,
          colspan: r.visibleColumns.length
        }, [
          T(r.$slots, `item-${r.i}`, {
            item: a.value,
            index: r.i
          })
        ], 8, Zt)) : c(p) && c(m).item ? (n(), i("td", {
          key: "td" + r.i,
          colspan: r.visibleColumns.length
        }, [
          T(r.$slots, "item", {
            item: a.value,
            index: r.i
          })
        ], 8, Ot)) : (n(!0), i(R, { key: 6 }, K(r.visibleColumns, (V) => (n(), i(R, null, [
          c(Wt)(V, r.emptyColumns, a.value) ? (n(), i("td", {
            key: "td" + r.i,
            "data-column": V.key,
            colspan: c(Te)(V, a.value),
            title: c(ue)(V, a.value, r.i, r.visibleColumns),
            class: j(c(lt)(V)),
            onClick: k[2] || (k[2] = (x) => l(x))
          }, [
            r.$slots[V.key] && c(Ht)(V, a.value) ? T(r.$slots, V.key, {
              key: 0,
              value: a.value[V.key],
              item: a.value,
              column: V,
              i: r.i
            }) : a.value ? (n(), C(ot, {
              key: 1,
              modelValue: a.value,
              "onUpdate:modelValue": k[1] || (k[1] = (x) => a.value = x),
              column: V,
              columns: r.visibleColumns,
              "edit-mode-enabled": r.editModeEnabled,
              "has-inline-edit-perm": r.hasInlineEditPerm,
              i: r.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : v("", !0)
          ], 10, _t)) : v("", !0)
        ], 64))), 256)),
        r.canDrop && r.editModeEnabled ? (n(), i("td", xt, [
          ne(jt, {
            resource: r.dropResource,
            "resource-data": a.value,
            confirm: r.dropConfirm,
            text: r.dropText,
            icon: r.dropIcon,
            onClick: L
          }, null, 8, ["resource", "resource-data", "confirm", "text", "icon"])
        ])) : v("", !0),
        r.canEdit && r.editModeEnabled ? (n(), i("td", ea, [
          ne(zt, {
            "resource-data": a.value,
            text: r.editText,
            icon: r.editIcon,
            link: B.value,
            onClick: ke
          }, null, 8, ["resource-data", "text", "icon", "link"])
        ])) : v("", !0)
      ], 10, Gt);
    };
  }
}), aa = { "data-role": "hidden-row" }, la = ["colspan"], oa = ["data-column"], na = ["data-i"], ua = ["data-column", "title", "onClick"], ra = /* @__PURE__ */ _({
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
  setup(t, { emit: s }) {
    const m = s, u = t, o = h(u.modelValue), a = (y) => m("click", y);
    return F(() => u.modelValue, (y) => o.value = y), F(o, () => m("update:modelValue", o.value)), (y, I) => ce((n(), i("tr", aa, [
      U("td", { colspan: y.hiddenColumnsColSpan }, [
        U("table", null, [
          U("tr", null, [
            (n(!0), i(R, null, K(y.hiddenColumns, (p) => (n(), i("th", {
              "data-column": p.key
            }, [
              U("div", null, Z(p.label), 1)
            ], 8, oa))), 256))
          ]),
          U("tr", { "data-i": y.i }, [
            (n(!0), i(R, null, K(y.hiddenColumns, (p, B) => (n(), i("td", {
              "data-column": p.key,
              title: c(ue)(p, o.value, B, y.hiddenColumns),
              onClick: (l) => a(l, o.value)
            }, [
              y.$slots[p.key] ? T(y.$slots, p.key, {
                key: 0,
                value: o.value[p.key],
                item: o.value,
                column: p,
                i: B
              }) : (n(), C(ot, {
                key: 1,
                column: p,
                columns: y.hiddenColumns,
                modelValue: o.value,
                "onUpdate:modelValue": I[0] || (I[0] = (l) => o.value = l),
                i: B
              }, null, 8, ["column", "columns", "modelValue", "i"]))
            ], 8, ua))), 256))
          ], 8, na)
        ])
      ], 8, la)
    ], 512)), [
      [pe, y.hiddenIsVisible]
    ]);
  }
}), _e = /* @__PURE__ */ _({
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
  setup(t, { emit: s }) {
    const m = s, u = t, o = d(() => E.createButtonSlot !== ""), a = d(() => E.createButtonSlot), y = {
      ...u.modalData,
      beforeClose: (p) => {
        "itemCreated" in p && p.itemCreated === !0 && m("append", p.item);
      }
    }, I = () => {
      if (!u.modal) {
        m("click");
        return;
      }
    };
    return (p, B) => {
      const l = G("lkt-button");
      return n(), C(l, {
        palette: "table-create",
        disabled: p.disabled,
        icon: o.value ? "" : p.icon,
        text: o.value ? "" : p.text,
        modal: p.modal,
        "modal-data": y,
        "on-click-to": p.to,
        onClick: I
      }, {
        default: A(() => [
          o.value ? (n(), C(O(a.value), { key: 0 })) : v("", !0)
        ]),
        _: 1
      }, 8, ["disabled", "icon", "text", "modal", "on-click-to"]);
    };
  }
}), ia = ["data-column", "data-sortable", "data-sort", "colspan", "title"], da = /* @__PURE__ */ _({
  __name: "TableHeader",
  props: {
    column: { default: () => ({}) },
    sortBy: { default: "" },
    sortDirection: { default: "" },
    amountOfColumns: { default: 0 },
    items: { default: () => [] }
  },
  emits: ["click"],
  setup(t, { emit: s }) {
    const m = s, u = t, o = d(() => Pt(u.column, u.amountOfColumns, u.items)), a = d(() => u.column.sortable === !0), y = d(() => a.value && u.sortBy === u.column.key ? u.sortDirection : ""), I = d(() => u.column.label.startsWith("__:") ? be(u.column.label.substring(3)) : u.column.label), p = () => m("click", u.column);
    return (B, l) => (n(), i("th", {
      "data-column": B.column.key,
      "data-sortable": a.value,
      "data-sort": y.value,
      colspan: o.value,
      title: I.value,
      class: j(c(lt)(B.column)),
      onClick: p
    }, [
      U("div", null, Z(I.value), 1)
    ], 10, ia));
  }
});
var J = /* @__PURE__ */ ((t) => (t.Table = "table", t.Item = "item", t.Ul = "ul", t.Ol = "ol", t))(J || {}), Q = /* @__PURE__ */ ((t) => (t.Create = "create", t.Update = "update", t.Edit = "edit", t.Drop = "drop", t.Sort = "sort", t.InlineEdit = "inline-edit", t.InlineCreate = "inline-create", t.ModalCreate = "modal-create", t.InlineCreateEver = "inline-create-ever", t))(Q || {}), ve = /* @__PURE__ */ ((t) => (t.Asc = "asc", t.Desc = "desc", t))(ve || {});
const sa = ["id"], fa = {
  key: 0,
  class: "lkt-table-page-buttons"
}, ma = { key: 1 }, ca = { class: "switch-edition-mode" }, pa = {
  key: 1,
  class: "lkt-table-page-buttons"
}, va = {
  key: 2,
  class: "lkt-table-page-filters"
}, ba = ["data-sortable"], ya = { key: 0 }, ka = {
  key: 0,
  "data-role": "drag-indicator"
}, ha = { key: 1 }, ga = { key: 2 }, Ca = {
  key: 3,
  class: "lkt-table-col-drop"
}, Da = {
  key: 4,
  class: "lkt-table-col-edit"
}, Sa = ["id"], Ia = ["id"], Ba = ["data-i"], Va = ["data-i"], Ea = ["data-i"], wa = {
  key: 4,
  class: "lkt-table-empty"
}, $a = {
  key: 5,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, Ta = /* @__PURE__ */ _({
  __name: "LktTable",
  props: {
    modelValue: { default: () => [] },
    type: { default: J.Table },
    columns: { default: () => [] },
    sorter: { type: Function, default: Oe },
    draggableChecker: { type: Function, default: (t) => !0 },
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
    noResultsText: { default: E.defaultNoResultsMessage },
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
    rowDisplayType: { type: [Number, Function], default: Y.Auto },
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
  setup(t, { expose: s, emit: m }) {
    const u = m, o = et(), a = t, y = {}, I = h(typeof a.sorter == "function" ? a.sorter : Oe), p = h(qt(a.columns)), B = h(ve.Asc), l = h(a.modelValue), M = h(y), z = h(null), N = h(a.columns), w = h(a.page), $ = h(a.loading), ye = h(!1), L = h(a.perms), ke = h(null), ie = h(null), r = h({}), k = h(new At({ items: l.value }, a.dataStateConfig)), D = h(a.editMode), V = h(0), x = h(null), le = h(!1);
    F($, (e) => u("update:loading", e)), F(w, (e) => u("page", e));
    const de = h(a.type);
    a.itemMode && de.value === J.Table && (de.value = J.Item);
    const nt = (e) => {
      L.value = e;
    }, ut = (e) => {
      Array.isArray(e.data) && (l.value = e.data), $.value = !1, ye.value = !0, k.value.store({ items: l.value }).turnStoredIntoOriginal(), le.value = !1, $e(() => {
        u("read-response", e);
      });
    }, rt = () => $e(() => $.value = !0), it = () => {
      ke.value.doRefresh();
    }, se = Lt(12), Ie = d(() => {
      if (!a.hideEmptyColumns) return [];
      let e = [];
      return N.value.forEach((f) => {
        let S = f.key, P = !1;
        l.value.forEach((W) => {
          if (typeof W.checkEmpty == "function")
            return W.checkEmpty(W);
          W[S] && (P = !0);
        }), P || e.push(S);
      }), e;
    }), he = d(() => N.value.filter((e) => !e.hidden)), Be = d(() => N.value.filter((e) => e.hidden)), dt = d(() => {
      let e = he.value.length + 1;
      return a.sortable && ++e, e;
    }), st = d(() => N.value.filter((e) => e.isForRowKey)), Re = d(() => Be.value.length > 0 && !a.sortable), ft = d(() => N.value.map((e) => e.key)), Me = d(() => {
      let e = [];
      for (let f in o) ft.value.indexOf(f) !== -1 && e.push(f);
      return e;
    }), Ne = d(() => a.hiddenSave || $.value || !a.saveResource ? !1 : D.value && le.value ? !0 : D.value), mt = d(() => Ce.value && l.value.length >= a.requiredItemsForTopCreate || a.switchEditionEnabled ? !0 : Ne.value || D.value && oe.value), ct = d(() => a.saveDisabled || typeof a.saveValidator == "function" && !a.saveValidator(l.value) ? !1 : le.value), pt = d(() => l.value.length), vt = d(() => ({
      items: l.value,
      ...a.saveResourceData
    })), bt = d(() => a.titleTag === "" ? "h2" : a.titleTag), yt = d(() => a.wrapContentTag === "" ? "div" : a.wrapContentTag), Ve = d(() => a.title.startsWith("__:") ? be(a.title.substring(3)) : a.title), kt = d(() => a.saveText.startsWith("__:") ? be(a.saveText.substring(3)) : a.saveText), ht = d(() => a.editModeText.startsWith("__:") ? be(a.editModeText.substring(3)) : a.editModeText), oe = d(() => L.value.includes(Q.Create)), Ee = d(() => L.value.includes("read")), fe = d(() => L.value.includes(Q.Update)), Fe = d(() => L.value.includes(Q.Edit)), gt = d(() => L.value.includes(Q.InlineEdit)), Ct = d(() => L.value.includes(Q.ModalCreate)), Dt = d(() => L.value.includes(Q.InlineCreate)), Le = d(() => L.value.includes(Q.InlineCreateEver)), me = d(() => L.value.includes(Q.Drop)), St = (e) => {
      let f = e.target;
      if (typeof f.dataset.column > "u")
        do
          f = f.parentNode;
        while (typeof f.dataset.column > "u" && f.tagName !== "TABLE" && f.tagName !== "body");
      if (f.tagName === "TD" && (f = f.parentNode, f = f.dataset.i, typeof f < "u"))
        return l.value[f];
    }, It = (e) => l.value[e], Bt = (e) => {
      var f;
      return (f = z.value) == null ? void 0 : f.querySelector(`[data-i="${e}"]`);
    }, Ae = (e) => M.value["tr_" + e] === !0, Ue = (e) => {
      e && e.sortable && (l.value = l.value.sort((f, S) => I.value(f, S, e, B.value)), B.value = B.value === ve.Asc ? ve.Desc : ve.Asc, p.value = e.key, u("sort", [p.value, B.value]));
    }, Pe = (e) => {
      u("click", e);
    }, He = (e, f) => {
      let S = "tr_" + f;
      M.value[S] = typeof M.value[S] > "u" ? !0 : !M.value[S];
    }, Vt = (e) => {
      var S, P, W, q;
      let f = parseInt((q = (W = (P = (S = e == null ? void 0 : e.originalEvent) == null ? void 0 : S.toElement) == null ? void 0 : P.closest("tr")) == null ? void 0 : W.dataset) == null ? void 0 : q.i);
      return typeof a.disabledDrag == "function" && a.disabledDrag(l.value[f]) || typeof a.disabledDrag == "boolean" && a.disabledDrag ? !1 : typeof a.checkValidDrag == "function" ? a.checkValidDrag(e) : !0;
    }, We = (e) => typeof a.draggableChecker == "function" ? a.draggableChecker(e) : !0, qe = () => {
      if (oe.value) {
        u("click-create");
        return;
      }
      if (Le.value)
        u("click-create");
      else {
        if (typeof a.newValueGenerator == "function") {
          let e = a.newValueGenerator();
          if (typeof e == "object" || de.value !== J.Table) {
            l.value.push(e);
            return;
          }
        }
        l.value.push({});
      }
    }, Ke = (e) => {
      l.value.push(e);
    }, je = () => {
      $.value = !0;
    }, ze = () => {
      $.value = !1;
    }, Et = (e, f) => {
      if (u("before-save"), a.saveResource && ($.value = !1, !f.success)) {
        u("error", f.httpStatus);
        return;
      }
      k.value.turnStoredIntoOriginal(), le.value = !1, u("save", f);
    }, Ge = (e, f, S) => {
      if (S >= e.length) {
        let P = S - e.length + 1;
        for (; P--; ) e.push(void 0);
      }
      return e.splice(S, 0, e.splice(f, 1)[0]), e;
    }, wt = (e) => {
      Ge(l.value, e, e - 1), V.value = Se();
    }, $t = (e) => {
      Ge(l.value, e, e + 1), V.value = Se();
    }, ge = (e) => {
      l.value.splice(e, 1), V.value = Se();
    }, Tt = () => {
      r.value && (r.value.destroy(), r.value = {});
    }, Je = () => {
      x.value || (x.value = document.getElementById("lkt-table-body-" + se)), r.value = new Ut(x.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let f = e.oldIndex, S = e.newIndex;
          l.value.splice(S, 0, l.value.splice(f, 1)[0]), V.value = Se(), u("drag-end", l.value[S]);
        },
        onMove: function(e, f) {
          return Vt(e);
        }
      });
    }, we = (e, f, S = !1) => {
      let P = [V.value, se, "row", f];
      return S && P.push("hidden"), st.value.forEach((W) => {
        let q = String(e[W.key]).toLowerCase();
        q.length > 50 && (q = q.substring(0, 50)), q = tt(q, " ", "-"), P.push(q);
      }), P.join("-");
    }, Qe = d(() => typeof a.createEnabledValidator == "function" ? a.createEnabledValidator({ items: l.value }) : !0), Ce = d(() => Le.value || oe.value && D.value || Dt.value && D.value || Ct.value && D.value), De = (e, f) => typeof a.itemDisplayChecker == "function" ? a.itemDisplayChecker(e) : !0;
    Ft(() => {
      a.initialSorting && Ue(Kt(a.columns, p.value)), k.value.store({ items: l.value }).turnStoredIntoOriginal(), le.value = !1, a.sortable && $e(() => {
        Je();
      });
    }), F(() => a.sortable, (e) => {
      e ? Je() : Tt();
    }), F(() => a.perms, (e) => L.value = e), F(L, (e) => u("update:perms", e)), F(() => a.editMode, (e) => D.value = e), F(() => a.columns, (e) => N.value = e, { deep: !0 }), F(() => a.modelValue, (e) => l.value = e, { deep: !0 }), F(l, (e) => {
      k.value.increment({ items: e }), le.value = k.value.changed(), u("update:modelValue", e);
    }, { deep: !0 }), s({
      getItemByEvent: St,
      getItemByIndex: It,
      getRowByIndex: Bt,
      doRefresh: it,
      getHtml: () => ie.value
    });
    const Rt = d(() => typeof E.defaultEmptySlot < "u"), Mt = d(() => E.defaultEmptySlot);
    return (e, f) => {
      const S = G("lkt-button"), P = G("lkt-field"), W = G("lkt-loader"), q = G("lkt-paginator");
      return n(), i("section", {
        ref_key: "element",
        ref: ie,
        class: "lkt-table-page",
        id: "lkt-table-page-" + c(se)
      }, [
        Ve.value || c(o).title ? (n(), i("header", {
          key: 0,
          class: j(e.headerClass)
        }, [
          Ve.value ? (n(), C(O(bt.value), { key: 0 }, {
            default: A(() => [
              e.titleIcon ? (n(), i("i", {
                key: 0,
                class: j(e.titleIcon)
              }, null, 2)) : v("", !0),
              re(" " + Z(Ve.value), 1)
            ]),
            _: 1
          })) : v("", !0),
          c(o).title ? T(e.$slots, "title", { key: 1 }) : v("", !0)
        ], 2)) : v("", !0),
        (n(), C(O(yt.value), {
          class: j(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: A(() => [
            mt.value ? (n(), i("div", fa, [
              ce(ne(S, {
                class: "lkt-table--save-button",
                ref: "saveButton",
                icon: c(E).defaultSaveIcon,
                disabled: !ct.value,
                "confirm-modal": e.saveConfirm,
                "confirm-data": e.confirmData,
                resource: e.saveResource,
                "resource-data": vt.value,
                split: e.splitSave,
                "tooltip-engine": e.saveTooltipEngine,
                onLoading: je,
                onLoaded: ze,
                onClick: Et
              }, {
                split: A(({ doClose: g, doRootClick: b }) => [
                  T(e.$slots, "button-save-split", {
                    doClose: g,
                    doRootClick: b,
                    dataState: k.value,
                    onButtonLoading: je,
                    onButtonLoaded: ze
                  })
                ]),
                default: A(() => [
                  c(o)["button-save"] ? T(e.$slots, "button-save", {
                    key: 0,
                    items: l.value,
                    editMode: e.editMode,
                    canUpdate: !e.saveDisabled
                  }) : (n(), i("span", ma, Z(kt.value), 1))
                ]),
                _: 3
              }, 8, ["icon", "disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "split", "tooltip-engine"]), [
                [pe, Ne.value]
              ]),
              Ce.value && l.value.length >= e.requiredItemsForTopCreate ? (n(), C(_e, {
                key: 0,
                disabled: !Qe.value || e.createDisabled,
                text: e.createText,
                icon: e.createIcon,
                to: e.createRoute,
                modal: e.modal,
                "modal-data": e.modalData,
                onClick: qe,
                onAppend: Ke
              }, null, 8, ["disabled", "text", "icon", "to", "modal", "modal-data"])) : v("", !0),
              U("div", ca, [
                ce(ne(P, {
                  type: "switch",
                  modelValue: D.value,
                  "onUpdate:modelValue": f[0] || (f[0] = (g) => D.value = g),
                  label: ht.value
                }, null, 8, ["modelValue", "label"]), [
                  [pe, e.switchEditionEnabled]
                ])
              ])
            ])) : v("", !0),
            c(o).buttons ? (n(), i("div", pa, [
              T(e.$slots, "buttons")
            ])) : v("", !0),
            ye.value && c(o).filters ? (n(), i("div", va, [
              T(e.$slots, "filters", {
                items: l.value,
                isLoading: $.value
              })
            ])) : v("", !0),
            $.value ? (n(), C(W, { key: 3 })) : v("", !0),
            ce(U("div", {
              class: "lkt-table",
              "data-sortable": e.sortable
            }, [
              de.value === c(J).Table ? (n(), i("table", ya, [
                U("thead", null, [
                  U("tr", null, [
                    e.sortable && D.value ? (n(), i("th", ka)) : v("", !0),
                    e.addNavigation && D.value ? (n(), i("th", ha)) : v("", !0),
                    Re.value ? (n(), i("th", ga)) : v("", !0),
                    (n(!0), i(R, null, K(he.value, (g) => (n(), i(R, null, [
                      Ie.value.indexOf(g.key) === -1 ? (n(), C(da, {
                        key: 0,
                        column: g,
                        "sort-by": p.value,
                        "sort-direction": B.value,
                        "amount-of-columns": e.columns.length,
                        items: l.value,
                        onClick: (b) => Ue(g)
                      }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : v("", !0)
                    ], 64))), 256)),
                    me.value && D.value ? (n(), i("th", Ca)) : v("", !0),
                    Fe.value && fe.value && D.value ? (n(), i("th", Da)) : v("", !0)
                  ])
                ]),
                U("tbody", {
                  ref_key: "tableBody",
                  ref: z,
                  id: "lkt-table-body-" + c(se)
                }, [
                  (n(!0), i(R, null, K(l.value, (g, b) => ce((n(), C(ta, {
                    modelValue: l.value[b],
                    "onUpdate:modelValue": (H) => l.value[b] = H,
                    key: we(g, b),
                    i: b,
                    "display-hidden-columns-indicator": Re.value,
                    "is-draggable": We(g),
                    sortable: e.sortable,
                    "visible-columns": he.value,
                    "empty-columns": Ie.value,
                    "add-navigation": e.addNavigation,
                    "hidden-is-visible": Ae(b),
                    "latest-row": b + 1 === pt.value,
                    "can-drop": me.value && D.value,
                    "drop-confirm": e.dropConfirm,
                    "drop-resource": e.dropResource,
                    "drop-text": e.dropText,
                    "drop-icon": e.dropIcon,
                    "can-edit": Fe.value && fe.value && D.value,
                    "edit-text": e.editText,
                    "edit-icon": e.editIcon,
                    "edit-link": e.editLink,
                    "edit-mode-enabled": D.value,
                    "has-inline-edit-perm": gt.value,
                    "row-display-type": e.rowDisplayType,
                    "render-drag": e.renderDrag,
                    "disabled-drag": e.disabledDrag,
                    onClick: Pe,
                    onShow: He,
                    onItemUp: wt,
                    onItemDown: $t,
                    onItemDrop: ge
                  }, Ye({ _: 2 }, [
                    c(o)[`item-${b}`] ? {
                      name: `item-${b}`,
                      fn: A((H) => [
                        T(e.$slots, `item-${b}`, te({
                          [e.slotItemVar || ""]: H.item,
                          index: b
                        }))
                      ]),
                      key: "0"
                    } : c(o).item ? {
                      name: "item",
                      fn: A((H) => [
                        T(e.$slots, "item", te({
                          [e.slotItemVar || ""]: H.item,
                          index: b
                        }))
                      ]),
                      key: "1"
                    } : void 0,
                    K(Me.value, (H) => ({
                      name: H,
                      fn: A((ee) => [
                        T(e.$slots, H, te({
                          [e.slotItemVar || ""]: ee.item,
                          value: ee.value,
                          column: ee.column
                        }))
                      ])
                    }))
                  ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "display-hidden-columns-indicator", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "hidden-is-visible", "latest-row", "can-drop", "drop-confirm", "drop-resource", "drop-text", "drop-icon", "can-edit", "edit-text", "edit-icon", "edit-link", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag"])), [
                    [pe, De(l.value[b])]
                  ])), 128)),
                  Be.value.length > 0 ? (n(!0), i(R, { key: 0 }, K(l.value, (g, b) => (n(), C(ra, {
                    modelValue: l.value[b],
                    "onUpdate:modelValue": (H) => l.value[b] = H,
                    key: we(g, b, !0),
                    i: b,
                    "hidden-columns": Be.value,
                    "hidden-columns-col-span": dt.value,
                    "is-draggable": We(g),
                    sortable: e.sortable,
                    "visible-columns": he.value,
                    "empty-columns": Ie.value,
                    "hidden-is-visible": Ae(b),
                    onClick: Pe,
                    onShow: He
                  }, Ye({ _: 2 }, [
                    K(Me.value, (H) => ({
                      name: H,
                      fn: A((ee) => [
                        T(e.$slots, H, te({
                          [e.slotItemVar || ""]: ee.item,
                          value: ee.value,
                          column: ee.column
                        }))
                      ])
                    }))
                  ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "hidden-columns", "hidden-columns-col-span", "is-draggable", "sortable", "visible-columns", "empty-columns", "hidden-is-visible"]))), 128)) : v("", !0)
                ], 8, Sa)
              ])) : de.value === c(J).Item ? (n(), i("div", {
                key: 1,
                ref_key: "tableBody",
                ref: z,
                id: "lkt-table-body-" + c(se),
                class: j(["lkt-table-items-container", e.itemsContainerClass])
              }, [
                (n(!0), i(R, null, K(l.value, (g, b) => (n(), i(R, null, [
                  De(g) ? (n(), i("div", {
                    class: "lkt-table-item",
                    "data-i": b,
                    key: we(g, b)
                  }, [
                    T(e.$slots, "item", te({
                      [e.slotItemVar || ""]: g,
                      index: b,
                      editing: D.value,
                      canCreate: oe.value,
                      canRead: Ee.value,
                      canUpdate: fe.value,
                      canDrop: me.value,
                      isLoading: $.value,
                      doDrop: () => ge(b)
                    }))
                  ], 8, Ba)) : v("", !0)
                ], 64))), 256))
              ], 10, Ia)) : c(J).Ul ? (n(), i("ul", {
                key: 2,
                class: j(["lkt-table-items-container", e.itemsContainerClass])
              }, [
                (n(!0), i(R, null, K(l.value, (g, b) => (n(), i(R, null, [
                  De(g) ? (n(), i("li", {
                    key: 0,
                    class: "lkt-table-item",
                    "data-i": b
                  }, [
                    T(e.$slots, "item", te({
                      [e.slotItemVar || ""]: g,
                      index: b,
                      editing: D.value,
                      canCreate: oe.value,
                      canRead: Ee.value,
                      canUpdate: fe.value,
                      canDrop: me.value,
                      isLoading: $.value,
                      doDrop: () => ge(b)
                    }))
                  ], 8, Va)) : v("", !0)
                ], 64))), 256))
              ], 2)) : c(J).Ul ? (n(), i("ol", {
                key: 3,
                class: j(["lkt-table-items-container", e.itemsContainerClass])
              }, [
                (n(!0), i(R, null, K(l.value, (g, b) => (n(), i(R, null, [
                  De(g) ? (n(), i("li", {
                    key: 0,
                    class: "lkt-table-item",
                    "data-i": b
                  }, [
                    T(e.$slots, "item", te({
                      [e.slotItemVar || ""]: g,
                      index: b,
                      editing: D.value,
                      canCreate: oe.value,
                      canRead: Ee.value,
                      canUpdate: fe.value,
                      canDrop: me.value,
                      isLoading: $.value,
                      doDrop: () => ge(b)
                    }))
                  ], 8, Ea)) : v("", !0)
                ], 64))), 256))
              ], 2)) : v("", !0)
            ], 8, ba), [
              [pe, !$.value && l.value.length > 0]
            ]),
            !$.value && l.value.length === 0 ? (n(), i("div", wa, [
              c(o).empty ? T(e.$slots, "empty", { key: 0 }) : Rt.value ? (n(), C(O(Mt.value), {
                key: 1,
                message: e.noResultsText
              }, null, 8, ["message"])) : e.noResultsText ? (n(), i(R, { key: 2 }, [
                re(Z(e.noResultsText), 1)
              ], 64)) : v("", !0)
            ])) : v("", !0),
            Ce.value || c(o).bottomButtons ? (n(), i("div", $a, [
              Ce.value && l.value.length >= e.requiredItemsForBottomCreate ? (n(), C(_e, {
                key: 0,
                disabled: !Qe.value || e.createDisabled,
                text: e.createText,
                icon: e.createIcon,
                to: e.createRoute,
                modal: e.modal,
                "modal-data": e.modalData,
                onClick: qe,
                onAppend: Ke
              }, null, 8, ["disabled", "text", "icon", "to", "modal", "modal-data"])) : v("", !0),
              T(e.$slots, "bottom-buttons")
            ])) : v("", !0),
            e.resource.length > 0 ? (n(), C(q, {
              key: 6,
              ref_key: "paginator",
              ref: ke,
              modelValue: w.value,
              "onUpdate:modelValue": f[1] || (f[1] = (g) => w.value = g),
              resource: e.resource,
              filters: e.filters,
              onLoading: rt,
              onPerms: nt,
              onResponse: ut
            }, null, 8, ["modelValue", "resource", "filters"])) : v("", !0)
          ]),
          _: 3
        }, 8, ["class"]))
      ], 8, sa);
    };
  }
}), Ha = {
  install: (t) => {
    t.component("lkt-table") === void 0 && t.component("lkt-table", Ta);
  }
}, Wa = (t) => (E.navButtonSlot = t, !0), qa = (t) => (E.dropButtonSlot = t, !0), Ka = (t) => (E.createButtonSlot = t, !0), ja = (t) => {
  E.defaultEmptySlot = t;
}, za = (t) => {
  E.defaultSaveIcon = t;
};
export {
  at as Column,
  Pa as createColumn,
  Ha as default,
  Ka as setTableCreateButtonSlot,
  qa as setTableDropButtonSlot,
  ja as setTableEmptySlot,
  Wa as setTableNavButtonSlot,
  za as setTableSaveIcon
};
