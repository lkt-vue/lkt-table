import { defineComponent as x, ref as h, watch as P, computed as i, resolveComponent as z, createBlock as C, createElementBlock as d, unref as f, openBlock as o, normalizeProps as Y, mergeProps as De, withCtx as F, createTextVNode as ue, toDisplayString as Z, Fragment as $, withModifiers as et, createCommentVNode as y, resolveDynamicComponent as _, useSlots as tt, normalizeClass as K, createElementVNode as U, createVNode as ie, renderSlot as w, renderList as j, withDirectives as ve, vShow as ye, onMounted as Mt, nextTick as $e, createSlots as Ze } from "vue";
import { __ as be } from "lkt-i18n";
import { Column as Re, ColumnType as oe, TableRowType as ne, TableType as Q, SortDirection as Be, TablePermission as X } from "lkt-vue-kernel";
import { Column as zl } from "lkt-vue-kernel";
import { replaceAll as lt, generateRandomString as Pt } from "lkt-string-tools";
import { DataState as Ft } from "lkt-data-state";
import Lt from "sortablejs";
import { time as Se } from "lkt-date-tools";
const Nl = (n) => new Re(n), _e = (n, m, p, u) => {
  if (!p) return 0;
  let a = n[p.key], t = m[p.key];
  if (u === "asc") {
    if (a > t) return 1;
    if (t > a) return -1;
  } else {
    if (a > t) return -1;
    if (t > a) return 1;
  }
  return 0;
}, se = (n, m, p, u = []) => {
  if (n.extractTitleFromColumn) {
    let a = u.find((t) => t.key === n.extractTitleFromColumn);
    if (a)
      return se(a, m, p, u);
  }
  if (n.formatter && typeof n.formatter == "function") {
    let a = n.formatter(m[n.key], m, n, p);
    return a.startsWith("__:") ? be(a.substring(3)) : a;
  }
  return m[n.key];
}, Nt = (n, m, p) => {
  if (!n.colspan) return -1;
  let u = m;
  return p.forEach((a) => {
    let t = Me(n, a);
    t > 0 && t < u && (u = t);
  }), u;
}, Me = (n, m) => n.colspan === !1 ? !1 : typeof n.colspan == "function" ? n.colspan(m) : n.colspan, Ut = (n, m) => typeof n.preferSlot > "u" ? !0 : n.preferSlot === !1 ? !1 : typeof n.preferSlot == "function" ? n.preferSlot(m) : !0, At = (n, m, p) => {
  if (typeof n != "object" || !n.key || m.indexOf(n.key) > -1) return !1;
  let u = Me(n, p);
  return typeof n.colspan > "u" ? !0 : (typeof n.colspan < "u" && (typeof n.colspan == "function" ? u = parseInt(n.colspan(p)) : u = parseInt(n.colspan)), u > 0);
}, Ot = (n = []) => {
  if (n.length > 0) {
    for (let m = 0; m < n.length; ++m)
      if (n[m].sortable) return n[m].key;
  }
  return "";
}, Ht = (n, m) => {
  if (n.length > 0) {
    for (let p = 0; p < n.length; ++p)
      if (n[p].key === m) return n[p];
  }
  return null;
}, at = (n) => n.type ? `is-${n.type}` : "", ot = /* @__PURE__ */ x({
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
  setup(n, { emit: m }) {
    const p = m, u = n, a = h(u.modelValue), t = h(a.value[u.column.key]), c = h(null);
    let S = u.column.type;
    [oe.Integer, oe.Float].includes(S) && (S = oe.Number), P(t, (l) => {
      const M = JSON.parse(JSON.stringify(a.value));
      M[u.column.key] = l, p("update:modelValue", M);
    }), P(() => u.modelValue, (l) => {
      a.value = l, t.value = a.value[u.column.key];
    });
    const v = i(() => ({ ...u.column.slotData, item: a.value })), T = i(() => {
      var l, M, G, L;
      if ((l = u.column.field) != null && l.modalData && typeof ((M = u.column.field) == null ? void 0 : M.modalData) == "object")
        for (let N in u.column.field.modalData)
          if (typeof ((G = u.column.field) == null ? void 0 : G.modalData[N]) == "string" && u.column.field.modalData[N].startsWith("prop:")) {
            let I = u.column.field.modalData[N].substring(5);
            a.value[I];
          } else
            u.column.field.modalData[N];
      return (L = u.column.field) == null ? void 0 : L.modalData;
    });
    return (l, M) => {
      var I, ee, R, te;
      const G = z("lkt-anchor"), L = z("lkt-button"), N = z("lkt-field");
      return l.column.type === f(oe).Anchor ? (o(), C(G, Y(De({ key: 0 }, l.column.anchor)), {
        default: F(() => [
          ue(Z(f(se)(l.column, a.value, l.i)), 1)
        ]),
        _: 1
      }, 16)) : l.column.type === f(oe).Button ? (o(), C(L, De({ key: 1 }, l.column.button, { prop: a.value }), {
        default: F(() => [
          ue(Z(f(se)(l.column, a.value, l.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : l.column.type === f(oe).Field && l.hasInlineEditPerm ? (o(), C(N, De({ key: 2 }, l.column.field, {
        "read-mode": !l.column.editable || !l.editModeEnabled,
        ref: (H) => c.value = H,
        "slot-data": v.value,
        label: ((I = l.column.field) == null ? void 0 : I.type) === "switch" || ((ee = l.column.field) == null ? void 0 : ee.type) === "check" ? l.column.label : "",
        "modal-data": T.value,
        prop: a.value,
        modelValue: t.value,
        "onUpdate:modelValue": M[0] || (M[0] = (H) => t.value = H)
      }), null, 16, ["read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : l.column.type === f(oe).Field ? (o(), C(N, De({ key: 3 }, l.column.field, {
        "read-mode": "",
        ref: (H) => c.value = H,
        "slot-data": v.value,
        label: ((R = l.column.field) == null ? void 0 : R.type) === "switch" || ((te = l.column.field) == null ? void 0 : te.type) === "check" ? l.column.label : "",
        "modal-data": T.value,
        prop: a.value,
        "model-value": t.value
      }), null, 16, ["slot-data", "label", "modal-data", "prop", "model-value"])) : (o(), d($, { key: 4 }, [
        ue(Z(f(se)(l.column, a.value, l.i, l.columns)), 1)
      ], 64));
    };
  }
}), J = class J {
};
J.navButtonSlot = "", J.dropButtonSlot = "", J.editButtonSlot = "", J.createButtonSlot = "", J.defaultEmptySlot = void 0, J.defaultSaveIcon = "", J.defaultNoResultsMessage = "No results";
let E = J;
const Wt = /* @__PURE__ */ x({
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
  setup(n, { emit: m }) {
    const p = m, u = i(() => E.dropButtonSlot !== ""), a = i(() => E.dropButtonSlot);
    return (t, c) => {
      const S = z("lkt-button");
      return o(), C(S, {
        palette: "table-delete",
        icon: u.value ? "" : t.icon,
        text: u.value ? "" : t.text,
        resource: t.resource,
        "resource-data": t.resourceData,
        "confirm-modal": t.confirm,
        disabled: t.disabled,
        onClick: c[0] || (c[0] = et((v) => p("click"), ["prevent", "stop"]))
      }, {
        default: F(() => [
          u.value ? (o(), C(_(a.value), { key: 0 })) : y("", !0)
        ]),
        _: 1
      }, 8, ["icon", "text", "resource", "resource-data", "confirm-modal", "disabled"]);
    };
  }
}), qt = /* @__PURE__ */ x({
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
  setup(n, { emit: m }) {
    const p = m, u = i(() => E.editButtonSlot !== ""), a = i(() => E.editButtonSlot);
    return (t, c) => {
      const S = z("lkt-button");
      return o(), C(S, {
        palette: "table-delete",
        icon: u.value ? "" : t.icon,
        text: u.value ? "" : t.text,
        "on-click-to": t.link,
        "is-anchor": t.link !== "",
        resource: t.resource,
        "resource-data": t.resourceData,
        "confirm-modal": t.confirm,
        disabled: t.disabled,
        onClick: c[0] || (c[0] = et((v) => p("click"), ["prevent", "stop"]))
      }, {
        default: F(() => [
          u.value ? (o(), C(_(a.value), { key: 0 })) : y("", !0)
        ]),
        _: 1
      }, 8, ["icon", "text", "on-click-to", "is-anchor", "resource", "resource-data", "confirm-modal", "disabled"]);
    };
  }
}), jt = ["data-i", "data-draggable"], Kt = ["data-i"], zt = {
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
}, xt = /* @__PURE__ */ x({
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
    rowDisplayType: { type: [Number, Function], default: ne.Auto },
    renderDrag: { type: [Boolean, Function], default: !0 },
    disabledDrag: { type: [Boolean, Function], default: !0 }
  },
  emits: ["update:modelValue", "click", "show", "item-up", "item-down", "item-drop"],
  setup(n, { emit: m }) {
    const p = tt(), u = m, a = n, t = h(a.modelValue);
    let c = typeof a.rowDisplayType == "function" ? a.rowDisplayType(t.value, a.i) : a.rowDisplayType;
    c || (c = ne.Auto);
    const S = [ne.Auto, ne.PreferCustomItem].includes(c), v = [ne.Auto, ne.PreferItem].includes(c), T = h(a.editLink);
    for (let r in t.value) T.value = lt(T.value, ":" + r, t.value[r]);
    const l = (r) => u("click", r), M = (r, k) => {
      u("show", r, k);
    }, G = i(() => {
      let r = [], k = !1;
      return typeof a.disabledDrag == "function" ? k = a.disabledDrag(t.value) : k = a.disabledDrag === !0, !k && a.sortable && a.isDraggable ? r.push("handle") : k && r.push("disabled"), r.join(" ");
    }), L = i(() => E.navButtonSlot !== ""), N = i(() => E.navButtonSlot), I = () => {
      u("item-up", a.i);
    }, ee = () => {
      u("item-down", a.i);
    }, R = () => {
      u("item-drop", a.i);
    }, te = () => {
    };
    P(() => a.modelValue, (r) => t.value = r), P(t, (r) => {
      u("update:modelValue", r);
    }, { deep: !0 });
    const H = i(() => typeof a.renderDrag == "function" ? a.renderDrag(t.value) : a.renderDrag === !0);
    return i(() => typeof a.disabledDrag == "function" ? a.disabledDrag(t.value) : a.disabledDrag === !0), (r, k) => {
      const D = z("lkt-button");
      return o(), d("tr", {
        "data-i": r.i,
        "data-draggable": r.isDraggable,
        class: K({ "type-custom-item": f(S), "type-item": f(v) })
      }, [
        r.sortable && r.isDraggable && r.editModeEnabled && H.value ? (o(), d("td", {
          key: 0,
          "data-role": "drag-indicator",
          class: K(G.value),
          "data-i": r.i
        }, null, 10, Kt)) : r.sortable && r.editModeEnabled && H.value ? (o(), d("td", zt)) : y("", !0),
        r.addNavigation && r.editModeEnabled ? (o(), d("td", Gt, [
          U("div", Jt, [
            ie(D, {
              palette: "table-nav",
              disabled: r.i === 0,
              onClick: I
            }, {
              default: F(() => [
                L.value ? (o(), C(_(N.value), {
                  key: 0,
                  direction: "up"
                })) : (o(), d($, { key: 1 }, [
                  k[3] || (k[3] = U("i", { class: "" }, null, -1)),
                  k[4] || (k[4] = ue(" UP "))
                ], 64))
              ]),
              _: 1
            }, 8, ["disabled"]),
            ie(D, {
              palette: "table-nav",
              disabled: r.latestRow,
              onClick: ee
            }, {
              default: F(() => [
                L.value ? (o(), C(_(N.value), {
                  key: 0,
                  direction: "down"
                })) : (o(), d($, { key: 1 }, [
                  k[5] || (k[5] = U("i", { class: "" }, null, -1)),
                  k[6] || (k[6] = ue(" DOWN "))
                ], 64))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : y("", !0),
        r.displayHiddenColumnsIndicator ? (o(), d("td", {
          key: 3,
          onClick: k[0] || (k[0] = (V) => M(V, r.i)),
          "data-role": "show-more",
          class: K(r.hiddenIsVisible ? "state-open" : "")
        }, null, 2)) : y("", !0),
        f(S) && f(p)[`item-${r.i}`] ? (o(), d("td", {
          key: "td" + r.i,
          colspan: r.visibleColumns.length
        }, [
          w(r.$slots, `item-${r.i}`, {
            item: t.value,
            index: r.i
          })
        ], 8, Qt)) : f(v) && f(p).item ? (o(), d("td", {
          key: "td" + r.i,
          colspan: r.visibleColumns.length
        }, [
          w(r.$slots, "item", {
            item: t.value,
            index: r.i
          })
        ], 8, Xt)) : (o(!0), d($, { key: 6 }, j(r.visibleColumns, (V) => (o(), d($, null, [
          f(At)(V, r.emptyColumns, t.value) ? (o(), d("td", {
            key: "td" + r.i,
            "data-column": V.key,
            colspan: f(Me)(V, t.value),
            title: f(se)(V, t.value, r.i, r.visibleColumns),
            class: K(f(at)(V)),
            onClick: k[2] || (k[2] = (le) => l(le))
          }, [
            r.$slots[V.key] && f(Ut)(V, t.value) ? w(r.$slots, V.key, {
              key: 0,
              value: t.value[V.key],
              item: t.value,
              column: V,
              i: r.i
            }) : t.value ? (o(), C(ot, {
              key: 1,
              modelValue: t.value,
              "onUpdate:modelValue": k[1] || (k[1] = (le) => t.value = le),
              column: V,
              columns: r.visibleColumns,
              "edit-mode-enabled": r.editModeEnabled,
              "has-inline-edit-perm": r.hasInlineEditPerm,
              i: r.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : y("", !0)
          ], 10, Yt)) : y("", !0)
        ], 64))), 256)),
        r.canDrop && r.editModeEnabled ? (o(), d("td", Zt, [
          ie(Wt, {
            resource: r.dropResource,
            "resource-data": t.value,
            confirm: r.dropConfirm,
            text: r.dropText,
            icon: r.dropIcon,
            onClick: R
          }, null, 8, ["resource", "resource-data", "confirm", "text", "icon"])
        ])) : y("", !0),
        r.canEdit && r.editModeEnabled ? (o(), d("td", _t, [
          ie(qt, {
            "resource-data": t.value,
            text: r.editText,
            icon: r.editIcon,
            link: T.value,
            onClick: te
          }, null, 8, ["resource-data", "text", "icon", "link"])
        ])) : y("", !0)
      ], 10, jt);
    };
  }
}), el = { "data-role": "hidden-row" }, tl = ["colspan"], ll = ["data-column"], al = ["data-i"], ol = ["data-column", "title"], nl = /* @__PURE__ */ x({
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
  setup(n, { emit: m }) {
    const p = m, u = n, a = h(u.modelValue), t = (c) => p("click", c);
    return P(() => u.modelValue, (c) => a.value = c), P(a, () => p("update:modelValue", a.value)), (c, S) => ve((o(), d("tr", el, [
      U("td", { colspan: c.hiddenColumnsColSpan }, [
        U("table", null, [
          U("tr", null, [
            (o(!0), d($, null, j(c.hiddenColumns, (v) => (o(), d("th", {
              "data-column": v.key
            }, [
              U("div", null, Z(v.label), 1)
            ], 8, ll))), 256))
          ]),
          U("tr", { "data-i": c.i }, [
            (o(!0), d($, null, j(c.hiddenColumns, (v, T) => (o(), d("td", {
              "data-column": v.key,
              title: f(se)(v, a.value, T, c.hiddenColumns),
              onClick: S[1] || (S[1] = (l) => t(l))
            }, [
              c.$slots[v.key] ? w(c.$slots, v.key, {
                key: 0,
                value: a.value[v.key],
                item: a.value,
                column: v,
                i: T
              }) : (o(), C(ot, {
                key: 1,
                column: v,
                columns: c.hiddenColumns,
                modelValue: a.value,
                "onUpdate:modelValue": S[0] || (S[0] = (l) => a.value = l),
                i: T,
                "edit-mode-enabled": c.editModeEnabled,
                "has-inline-edit-perm": c.hasInlineEditPerm
              }, null, 8, ["column", "columns", "modelValue", "i", "edit-mode-enabled", "has-inline-edit-perm"]))
            ], 8, ol))), 256))
          ], 8, al)
        ])
      ], 8, tl)
    ], 512)), [
      [ye, c.hiddenIsVisible]
    ]);
  }
}), xe = /* @__PURE__ */ x({
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
  setup(n, { emit: m }) {
    const p = m, u = n, a = i(() => E.createButtonSlot !== ""), t = i(() => E.createButtonSlot), c = {
      ...u.modalData,
      beforeClose: (v) => {
        "itemCreated" in v && v.itemCreated === !0 && p("append", v.item);
      }
    }, S = () => {
      if (!u.modal) {
        p("click");
        return;
      }
    };
    return (v, T) => {
      const l = z("lkt-button");
      return o(), C(l, {
        palette: "table-create",
        disabled: v.disabled,
        icon: a.value ? "" : v.icon,
        text: a.value ? "" : v.text,
        modal: v.modal,
        "modal-data": c,
        "on-click-to": v.to,
        onClick: S
      }, {
        default: F(() => [
          a.value ? (o(), C(_(t.value), { key: 0 })) : y("", !0)
        ]),
        _: 1
      }, 8, ["disabled", "icon", "text", "modal", "on-click-to"]);
    };
  }
}), ul = ["data-column", "data-sortable", "data-sort", "colspan", "title"], rl = /* @__PURE__ */ x({
  __name: "TableHeader",
  props: {
    column: { default: () => new Re() },
    sortBy: { default: "" },
    sortDirection: { default: "" },
    amountOfColumns: { default: 0 },
    items: { default: () => [] }
  },
  emits: ["click"],
  setup(n, { emit: m }) {
    const p = m, u = n, a = i(() => Nt(u.column, u.amountOfColumns, u.items)), t = i(() => u.column.sortable === !0), c = i(() => t.value && u.sortBy === u.column.key ? u.sortDirection : ""), S = i(() => u.column.label.startsWith("__:") ? be(u.column.label.substring(3)) : u.column.label), v = () => p("click", u.column);
    return (T, l) => (o(), d("th", {
      "data-column": T.column.key,
      "data-sortable": t.value,
      "data-sort": c.value,
      colspan: a.value,
      title: S.value,
      class: K(f(at)(T.column)),
      onClick: v
    }, [
      U("div", null, Z(S.value), 1)
    ], 10, ul));
  }
}), dl = ["id"], il = {
  key: 0,
  class: "lkt-table-page-buttons"
}, sl = { key: 1 }, ml = { class: "switch-edition-mode" }, fl = {
  key: 1,
  class: "lkt-table-page-buttons"
}, pl = {
  key: 2,
  class: "lkt-table-page-filters"
}, cl = ["data-sortable"], vl = { key: 0 }, yl = {
  key: 0,
  "data-role": "drag-indicator"
}, bl = { key: 1 }, kl = { key: 2 }, hl = {
  key: 3,
  class: "lkt-table-col-drop"
}, gl = {
  key: 4,
  class: "lkt-table-col-edit"
}, Cl = ["id"], Dl = ["id"], Bl = ["data-i"], Sl = ["data-i"], Il = ["data-i"], Tl = {
  key: 4,
  class: "lkt-table-empty"
}, Vl = {
  key: 5,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, El = /* @__PURE__ */ x({
  __name: "LktTable",
  props: {
    modelValue: { default: () => [] },
    type: { default: Q.Table },
    columns: { default: () => [] },
    sorter: { type: Function, default: _e },
    draggableChecker: { type: Function, default: (n) => !0 },
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
    rowDisplayType: { type: [Number, Function], default: ne.Auto },
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
  setup(n, { expose: m, emit: p }) {
    const u = p, a = tt(), t = n, c = {}, S = h(typeof t.sorter == "function" ? t.sorter : _e), v = h(Ot(t.columns)), T = h(Be.Asc), l = h(t.modelValue), M = h(c), G = h(null), L = h(t.columns), N = h(t.page), I = h(t.loading), ee = h(!1), R = h(t.perms), te = h(null), H = h(null), r = h({}), k = h(new Ft({ items: l.value }, t.dataStateConfig)), D = h(t.editMode), V = h(0), le = h(null), re = h(!1);
    P(I, (e) => u("update:loading", e)), P(N, (e) => u("page", e));
    const me = h(t.type);
    t.itemMode && me.value === Q.Table && (me.value = Q.Item);
    const nt = (e) => {
      R.value = e;
    }, ut = (e) => {
      Array.isArray(e.data) && (l.value = e.data), I.value = !1, ee.value = !0, k.value.store({ items: l.value }).turnStoredIntoOriginal(), re.value = !1, $e(() => {
        u("read-response", e);
      });
    }, rt = () => $e(() => I.value = !0), dt = () => {
      te.value.doRefresh();
    }, fe = Pt(12), Ie = i(() => {
      if (!t.hideEmptyColumns) return [];
      let e = [];
      return L.value.forEach((s) => {
        let B = s.key, A = !1;
        l.value.forEach((W) => {
          if (typeof W.checkEmpty == "function")
            return W.checkEmpty(W);
          W[B] && (A = !0);
        }), A || e.push(B);
      }), e;
    }), ke = i(() => L.value.filter((e) => !e.hidden)), Te = i(() => L.value.filter((e) => e.hidden)), it = i(() => {
      let e = ke.value.length + 1;
      return t.sortable && ++e, e;
    }), st = i(() => L.value.filter((e) => e.isForRowKey)), Pe = i(() => Te.value.length > 0 && !t.sortable), mt = i(() => L.value.map((e) => e.key)), Fe = i(() => {
      let e = [];
      for (let s in a) mt.value.indexOf(s) !== -1 && e.push(s);
      return e;
    }), Le = i(() => t.hiddenSave || I.value || !t.saveResource ? !1 : D.value && re.value ? !0 : D.value), ft = i(() => ge.value && l.value.length >= t.requiredItemsForTopCreate || t.switchEditionEnabled ? !0 : Le.value || D.value && de.value), pt = i(() => t.saveDisabled || typeof t.saveValidator == "function" && !t.saveValidator(l.value) ? !1 : re.value), ct = i(() => l.value.length), vt = i(() => ({
      items: l.value,
      ...t.saveResourceData
    })), yt = i(() => t.titleTag === "" ? "h2" : t.titleTag), bt = i(() => t.wrapContentTag === "" ? "div" : t.wrapContentTag), Ve = i(() => t.title.startsWith("__:") ? be(t.title.substring(3)) : t.title), kt = i(() => t.saveText.startsWith("__:") ? be(t.saveText.substring(3)) : t.saveText), ht = i(() => t.editModeText.startsWith("__:") ? be(t.editModeText.substring(3)) : t.editModeText), de = i(() => R.value.includes(X.Create)), Ee = i(() => R.value.includes("read")), pe = i(() => R.value.includes(X.Update)), Ne = i(() => R.value.includes(X.Edit)), Ue = i(() => R.value.includes(X.InlineEdit)), gt = i(() => R.value.includes(X.ModalCreate)), Ct = i(() => R.value.includes(X.InlineCreate)), Ae = i(() => R.value.includes(X.InlineCreateEver)), ce = i(() => R.value.includes(X.Drop)), Dt = (e) => {
      let s = e.target;
      if (typeof s.dataset.column > "u")
        do
          s = s.parentNode;
        while (typeof s.dataset.column > "u" && s.tagName !== "TABLE" && s.tagName !== "body");
      if (s.tagName === "TD" && (s = s.parentNode, s = s.dataset.i, typeof s < "u"))
        return l.value[s];
    }, Bt = (e) => l.value[e], St = (e) => {
      var s;
      return (s = G.value) == null ? void 0 : s.querySelector(`[data-i="${e}"]`);
    }, Oe = (e) => M.value["tr_" + e] === !0, He = (e) => {
      e && e.sortable && (l.value = l.value.sort((s, B) => S.value(s, B, e, T.value)), T.value = T.value === Be.Asc ? Be.Desc : Be.Asc, v.value = e.key, u("sort", [v.value, T.value]));
    }, We = (e) => {
      u("click", e);
    }, qe = (e, s) => {
      let B = "tr_" + s;
      M.value[B] = typeof M.value[B] > "u" ? !0 : !M.value[B];
    }, It = (e) => {
      var B, A, W, q;
      let s = parseInt((q = (W = (A = (B = e == null ? void 0 : e.originalEvent) == null ? void 0 : B.toElement) == null ? void 0 : A.closest("tr")) == null ? void 0 : W.dataset) == null ? void 0 : q.i);
      return typeof t.disabledDrag == "function" && t.disabledDrag(l.value[s]) || typeof t.disabledDrag == "boolean" && t.disabledDrag ? !1 : typeof t.checkValidDrag == "function" ? t.checkValidDrag(e) : !0;
    }, je = (e) => typeof t.draggableChecker == "function" ? t.draggableChecker(e) : !0, Ke = () => {
      if (de.value) {
        u("click-create");
        return;
      }
      if (Ae.value)
        u("click-create");
      else {
        if (typeof t.newValueGenerator == "function") {
          let e = t.newValueGenerator();
          if (typeof e == "object" || me.value !== Q.Table) {
            l.value.push(e);
            return;
          }
        }
        l.value.push({});
      }
    }, ze = (e) => {
      l.value.push(e);
    }, Ge = () => {
      I.value = !0;
    }, Je = () => {
      I.value = !1;
    }, Tt = (e, s) => {
      if (u("before-save"), t.saveResource && (I.value = !1, !s.success)) {
        u("error", s.httpStatus);
        return;
      }
      k.value.turnStoredIntoOriginal(), re.value = !1, u("save", s);
    }, Qe = (e, s, B) => {
      if (B >= e.length) {
        let A = B - e.length + 1;
        for (; A--; ) e.push(void 0);
      }
      return e.splice(B, 0, e.splice(s, 1)[0]), e;
    }, Vt = (e) => {
      Qe(l.value, e, e - 1), V.value = Se();
    }, Et = (e) => {
      Qe(l.value, e, e + 1), V.value = Se();
    }, he = (e) => {
      l.value.splice(e, 1), V.value = Se();
    }, wt = () => {
      var e;
      r.value && typeof ((e = r.value) == null ? void 0 : e.destroy) == "function" && (r.value.destroy(), r.value = {});
    }, Xe = () => {
      le.value || (le.value = document.getElementById("lkt-table-body-" + fe)), r.value = new Lt(le.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let s = e.oldIndex, B = e.newIndex;
          l.value.splice(B, 0, l.value.splice(s, 1)[0]), V.value = Se(), u("drag-end", l.value[B]);
        },
        onMove: function(e, s) {
          return It(e);
        }
      });
    }, we = (e, s, B = !1) => {
      let A = [V.value, fe, "row", s];
      return B && A.push("hidden"), st.value.forEach((W) => {
        let q = String(e[W.key]).toLowerCase();
        q.length > 50 && (q = q.substring(0, 50)), q = lt(q, " ", "-"), A.push(q);
      }), A.join("-");
    }, Ye = i(() => typeof t.createEnabledValidator == "function" ? t.createEnabledValidator({ items: l.value }) : !0), ge = i(() => Ae.value || de.value && D.value || Ct.value && D.value || gt.value && D.value), Ce = (e, s) => typeof t.itemDisplayChecker == "function" ? t.itemDisplayChecker(e) : !0;
    Mt(() => {
      t.initialSorting && He(Ht(t.columns, v.value)), k.value.store({ items: l.value }).turnStoredIntoOriginal(), re.value = !1, t.sortable && $e(() => {
        Xe();
      });
    }), P(() => t.sortable, (e) => {
      e ? Xe() : wt();
    }), P(() => t.perms, (e) => R.value = e), P(R, (e) => u("update:perms", e)), P(() => t.editMode, (e) => D.value = e), P(() => t.columns, (e) => L.value = e, { deep: !0 }), P(() => t.modelValue, (e) => l.value = e, { deep: !0 }), P(l, (e) => {
      k.value.increment({ items: e }), re.value = k.value.changed(), u("update:modelValue", e);
    }, { deep: !0 }), m({
      getItemByEvent: Dt,
      getItemByIndex: Bt,
      getRowByIndex: St,
      doRefresh: dt,
      getHtml: () => H.value
    });
    const $t = i(() => typeof E.defaultEmptySlot < "u"), Rt = i(() => E.defaultEmptySlot);
    return (e, s) => {
      const B = z("lkt-button"), A = z("lkt-field"), W = z("lkt-loader"), q = z("lkt-paginator");
      return o(), d("section", {
        ref_key: "element",
        ref: H,
        class: "lkt-table-page",
        id: "lkt-table-page-" + f(fe)
      }, [
        Ve.value || f(a).title ? (o(), d("header", {
          key: 0,
          class: K(e.headerClass)
        }, [
          Ve.value ? (o(), C(_(yt.value), { key: 0 }, {
            default: F(() => [
              e.titleIcon ? (o(), d("i", {
                key: 0,
                class: K(e.titleIcon)
              }, null, 2)) : y("", !0),
              ue(" " + Z(Ve.value), 1)
            ]),
            _: 1
          })) : y("", !0),
          f(a).title ? w(e.$slots, "title", { key: 1 }) : y("", !0)
        ], 2)) : y("", !0),
        (o(), C(_(bt.value), {
          class: K(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: F(() => [
            ft.value ? (o(), d("div", il, [
              ve(ie(B, {
                class: "lkt-table--save-button",
                ref: "saveButton",
                icon: f(E).defaultSaveIcon,
                disabled: !pt.value,
                "confirm-modal": e.saveConfirm,
                "confirm-data": e.confirmData,
                resource: e.saveResource,
                "resource-data": vt.value,
                split: e.splitSave,
                "tooltip-engine": e.saveTooltipEngine,
                onLoading: Ge,
                onLoaded: Je,
                onClick: Tt
              }, {
                split: F(({ doClose: g, doRootClick: b }) => [
                  w(e.$slots, "button-save-split", {
                    doClose: g,
                    doRootClick: b,
                    dataState: k.value,
                    onButtonLoading: Ge,
                    onButtonLoaded: Je
                  })
                ]),
                default: F(() => [
                  f(a)["button-save"] ? w(e.$slots, "button-save", {
                    key: 0,
                    items: l.value,
                    editMode: e.editMode,
                    canUpdate: !e.saveDisabled
                  }) : (o(), d("span", sl, Z(kt.value), 1))
                ]),
                _: 3
              }, 8, ["icon", "disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "split", "tooltip-engine"]), [
                [ye, Le.value]
              ]),
              ge.value && l.value.length >= e.requiredItemsForTopCreate ? (o(), C(xe, {
                key: 0,
                disabled: !Ye.value || e.createDisabled,
                text: e.createText,
                icon: e.createIcon,
                to: e.createRoute,
                modal: e.modal,
                "modal-data": e.modalData,
                onClick: Ke,
                onAppend: ze
              }, null, 8, ["disabled", "text", "icon", "to", "modal", "modal-data"])) : y("", !0),
              U("div", ml, [
                ve(ie(A, {
                  type: "switch",
                  modelValue: D.value,
                  "onUpdate:modelValue": s[0] || (s[0] = (g) => D.value = g),
                  label: ht.value
                }, null, 8, ["modelValue", "label"]), [
                  [ye, e.switchEditionEnabled]
                ])
              ])
            ])) : y("", !0),
            f(a).buttons ? (o(), d("div", fl, [
              w(e.$slots, "buttons")
            ])) : y("", !0),
            ee.value && f(a).filters ? (o(), d("div", pl, [
              w(e.$slots, "filters", {
                items: l.value,
                isLoading: I.value
              })
            ])) : y("", !0),
            I.value ? (o(), C(W, { key: 3 })) : y("", !0),
            ve(U("div", {
              class: "lkt-table",
              "data-sortable": e.sortable
            }, [
              me.value === f(Q).Table ? (o(), d("table", vl, [
                U("thead", null, [
                  U("tr", null, [
                    e.sortable && D.value ? (o(), d("th", yl)) : y("", !0),
                    e.addNavigation && D.value ? (o(), d("th", bl)) : y("", !0),
                    Pe.value ? (o(), d("th", kl)) : y("", !0),
                    (o(!0), d($, null, j(ke.value, (g) => (o(), d($, null, [
                      Ie.value.indexOf(g.key) === -1 ? (o(), C(rl, {
                        key: 0,
                        column: g,
                        "sort-by": v.value,
                        "sort-direction": T.value,
                        "amount-of-columns": e.columns.length,
                        items: l.value,
                        onClick: (b) => He(g)
                      }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : y("", !0)
                    ], 64))), 256)),
                    ce.value && D.value ? (o(), d("th", hl)) : y("", !0),
                    Ne.value && pe.value && D.value ? (o(), d("th", gl)) : y("", !0)
                  ])
                ]),
                U("tbody", {
                  ref_key: "tableBody",
                  ref: G,
                  id: "lkt-table-body-" + f(fe)
                }, [
                  (o(!0), d($, null, j(l.value, (g, b) => ve((o(), C(xt, {
                    modelValue: l.value[b],
                    "onUpdate:modelValue": (O) => l.value[b] = O,
                    key: we(g, b),
                    i: b,
                    "display-hidden-columns-indicator": Pe.value,
                    "is-draggable": je(g),
                    sortable: e.sortable,
                    "visible-columns": ke.value,
                    "empty-columns": Ie.value,
                    "add-navigation": e.addNavigation,
                    "hidden-is-visible": Oe(b),
                    "latest-row": b + 1 === ct.value,
                    "can-drop": ce.value && D.value,
                    "drop-confirm": e.dropConfirm,
                    "drop-resource": e.dropResource,
                    "drop-text": e.dropText,
                    "drop-icon": e.dropIcon,
                    "can-edit": Ne.value && pe.value && D.value,
                    "edit-text": e.editText,
                    "edit-icon": e.editIcon,
                    "edit-link": e.editLink,
                    "edit-mode-enabled": D.value,
                    "has-inline-edit-perm": Ue.value,
                    "row-display-type": e.rowDisplayType,
                    "render-drag": e.renderDrag,
                    "disabled-drag": e.disabledDrag,
                    onClick: We,
                    onShow: qe,
                    onItemUp: Vt,
                    onItemDown: Et,
                    onItemDrop: he
                  }, Ze({ _: 2 }, [
                    f(a)[`item-${b}`] ? {
                      name: `item-${b}`,
                      fn: F((O) => [
                        w(e.$slots, `item-${b}`, Y({
                          [e.slotItemVar || ""]: O.item,
                          index: b
                        }))
                      ]),
                      key: "0"
                    } : f(a).item ? {
                      name: "item",
                      fn: F((O) => [
                        w(e.$slots, "item", Y({
                          [e.slotItemVar || ""]: O.item,
                          index: b
                        }))
                      ]),
                      key: "1"
                    } : void 0,
                    j(Fe.value, (O) => ({
                      name: O,
                      fn: F((ae) => [
                        w(e.$slots, O, Y({
                          [e.slotItemVar || ""]: ae.item,
                          value: ae.value,
                          column: ae.column
                        }))
                      ])
                    }))
                  ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "display-hidden-columns-indicator", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "hidden-is-visible", "latest-row", "can-drop", "drop-confirm", "drop-resource", "drop-text", "drop-icon", "can-edit", "edit-text", "edit-icon", "edit-link", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag"])), [
                    [ye, Ce(l.value[b])]
                  ])), 128)),
                  Te.value.length > 0 ? (o(!0), d($, { key: 0 }, j(l.value, (g, b) => (o(), C(nl, {
                    modelValue: l.value[b],
                    "onUpdate:modelValue": (O) => l.value[b] = O,
                    key: we(g, b, !0),
                    i: b,
                    "hidden-columns": Te.value,
                    "hidden-columns-col-span": it.value,
                    "is-draggable": je(g),
                    sortable: e.sortable,
                    "visible-columns": ke.value,
                    "empty-columns": Ie.value,
                    "hidden-is-visible": Oe(b),
                    "edit-mode-enabled": D.value,
                    "has-inline-edit-perm": Ue.value,
                    onClick: We,
                    onShow: qe
                  }, Ze({ _: 2 }, [
                    j(Fe.value, (O) => ({
                      name: O,
                      fn: F((ae) => [
                        w(e.$slots, O, Y({
                          [e.slotItemVar || ""]: ae.item,
                          value: ae.value,
                          column: ae.column
                        }))
                      ])
                    }))
                  ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "hidden-columns", "hidden-columns-col-span", "is-draggable", "sortable", "visible-columns", "empty-columns", "hidden-is-visible", "edit-mode-enabled", "has-inline-edit-perm"]))), 128)) : y("", !0)
                ], 8, Cl)
              ])) : me.value === f(Q).Item ? (o(), d("div", {
                key: 1,
                ref_key: "tableBody",
                ref: G,
                id: "lkt-table-body-" + f(fe),
                class: K(["lkt-table-items-container", e.itemsContainerClass])
              }, [
                (o(!0), d($, null, j(l.value, (g, b) => (o(), d($, null, [
                  Ce(g) ? (o(), d("div", {
                    class: "lkt-table-item",
                    "data-i": b,
                    key: we(g, b)
                  }, [
                    w(e.$slots, "item", Y({
                      [e.slotItemVar || ""]: g,
                      index: b,
                      editing: D.value,
                      canCreate: de.value,
                      canRead: Ee.value,
                      canUpdate: pe.value,
                      canDrop: ce.value,
                      isLoading: I.value,
                      doDrop: () => he(b)
                    }))
                  ], 8, Bl)) : y("", !0)
                ], 64))), 256))
              ], 10, Dl)) : f(Q).Ul ? (o(), d("ul", {
                key: 2,
                class: K(["lkt-table-items-container", e.itemsContainerClass])
              }, [
                (o(!0), d($, null, j(l.value, (g, b) => (o(), d($, null, [
                  Ce(g) ? (o(), d("li", {
                    key: 0,
                    class: "lkt-table-item",
                    "data-i": b
                  }, [
                    w(e.$slots, "item", Y({
                      [e.slotItemVar || ""]: g,
                      index: b,
                      editing: D.value,
                      canCreate: de.value,
                      canRead: Ee.value,
                      canUpdate: pe.value,
                      canDrop: ce.value,
                      isLoading: I.value,
                      doDrop: () => he(b)
                    }))
                  ], 8, Sl)) : y("", !0)
                ], 64))), 256))
              ], 2)) : f(Q).Ul ? (o(), d("ol", {
                key: 3,
                class: K(["lkt-table-items-container", e.itemsContainerClass])
              }, [
                (o(!0), d($, null, j(l.value, (g, b) => (o(), d($, null, [
                  Ce(g) ? (o(), d("li", {
                    key: 0,
                    class: "lkt-table-item",
                    "data-i": b
                  }, [
                    w(e.$slots, "item", Y({
                      [e.slotItemVar || ""]: g,
                      index: b,
                      editing: D.value,
                      canCreate: de.value,
                      canRead: Ee.value,
                      canUpdate: pe.value,
                      canDrop: ce.value,
                      isLoading: I.value,
                      doDrop: () => he(b)
                    }))
                  ], 8, Il)) : y("", !0)
                ], 64))), 256))
              ], 2)) : y("", !0)
            ], 8, cl), [
              [ye, !I.value && l.value.length > 0]
            ]),
            !I.value && l.value.length === 0 ? (o(), d("div", Tl, [
              f(a).empty ? w(e.$slots, "empty", { key: 0 }) : $t.value ? (o(), C(_(Rt.value), {
                key: 1,
                message: e.noResultsText
              }, null, 8, ["message"])) : e.noResultsText ? (o(), d($, { key: 2 }, [
                ue(Z(e.noResultsText), 1)
              ], 64)) : y("", !0)
            ])) : y("", !0),
            ge.value || f(a).bottomButtons ? (o(), d("div", Vl, [
              ge.value && l.value.length >= e.requiredItemsForBottomCreate ? (o(), C(xe, {
                key: 0,
                disabled: !Ye.value || e.createDisabled,
                text: e.createText,
                icon: e.createIcon,
                to: e.createRoute,
                modal: e.modal,
                "modal-data": e.modalData,
                onClick: Ke,
                onAppend: ze
              }, null, 8, ["disabled", "text", "icon", "to", "modal", "modal-data"])) : y("", !0),
              w(e.$slots, "bottom-buttons")
            ])) : y("", !0),
            e.resource.length > 0 ? (o(), C(q, {
              key: 6,
              ref_key: "paginator",
              ref: te,
              modelValue: N.value,
              "onUpdate:modelValue": s[1] || (s[1] = (g) => N.value = g),
              resource: e.resource,
              filters: e.filters,
              onLoading: rt,
              onPerms: nt,
              onResponse: ut
            }, null, 8, ["modelValue", "resource", "filters"])) : y("", !0)
          ]),
          _: 3
        }, 8, ["class"]))
      ], 8, dl);
    };
  }
}), Ul = {
  install: (n) => {
    n.component("lkt-table") === void 0 && n.component("lkt-table", El);
  }
}, Al = (n) => (E.navButtonSlot = n, !0), Ol = (n) => (E.dropButtonSlot = n, !0), Hl = (n) => (E.createButtonSlot = n, !0), Wl = (n) => {
  E.defaultEmptySlot = n;
}, ql = (n) => {
  E.defaultSaveIcon = n;
};
export {
  zl as Column,
  Nl as createColumn,
  Ul as default,
  Hl as setTableCreateButtonSlot,
  Ol as setTableDropButtonSlot,
  Wl as setTableEmptySlot,
  Al as setTableNavButtonSlot,
  ql as setTableSaveIcon
};
