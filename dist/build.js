import { defineComponent as _, ref as g, watch as F, computed as i, resolveComponent as z, createBlock as B, createElementBlock as s, unref as v, openBlock as u, normalizeProps as ae, mergeProps as ie, withCtx as P, createTextVNode as oe, toDisplayString as ne, Fragment as N, withModifiers as rt, createCommentVNode as f, resolveDynamicComponent as Y, useSlots as it, normalizeClass as Q, createElementVNode as j, createVNode as de, renderSlot as w, renderList as J, withDirectives as ve, vShow as ye, mergeDefaults as Ht, onMounted as qt, nextTick as Be, createSlots as lt } from "vue";
import { __ as dt } from "lkt-i18n";
import { Column as Le, SortDirection as be, ColumnType as le, TableRowType as re, ensureButtonConfig as at, LktSettings as ot, extractI18nValue as nt, TablePermission as Z, TableType as ce, getDefaultValues as Kt, Table as Wt, ButtonType as Me } from "lkt-vue-kernel";
import { Column as la } from "lkt-vue-kernel";
import { replaceAll as st, generateRandomString as zt } from "lkt-string-tools";
import { DataState as Gt } from "lkt-data-state";
import Jt from "sortablejs";
import { time as fe } from "lkt-date-tools";
const Jl = (o) => new Le(o), Qt = (o, p, m, a) => {
  if (!m) return 0;
  let n = o[m.key], t = p[m.key];
  if (a === be.Asc) {
    if (n > t) return 1;
    if (t > n) return -1;
  } else {
    if (n > t) return -1;
    if (t > n) return 1;
  }
  return 0;
}, se = (o, p, m, a = []) => {
  if (o.extractTitleFromColumn) {
    let n = a.find((t) => t.key === o.extractTitleFromColumn);
    if (n)
      return se(n, p, m, a);
  }
  if (o.formatter && typeof o.formatter == "function") {
    let n = o.formatter(p[o.key], p, o, m);
    return n.startsWith("__:") ? dt(n.substring(3)) : n;
  }
  return p[o.key];
}, Xt = (o, p, m) => {
  if (!o.colspan) return -1;
  let a = p;
  return m.forEach((n) => {
    let t = Pe(o, n);
    t > 0 && t < a && (a = t);
  }), a;
}, Pe = (o, p) => o.colspan === !1 ? !1 : typeof o.colspan == "function" ? o.colspan(p) : o.colspan, Yt = (o, p) => typeof o.preferSlot > "u" ? !0 : o.preferSlot === !1 ? !1 : typeof o.preferSlot == "function" ? o.preferSlot(p) : !0, Zt = (o, p, m) => {
  if (typeof o != "object" || !o.key || p.indexOf(o.key) > -1) return !1;
  let a = Pe(o, m);
  return typeof o.colspan > "u" ? !0 : (typeof o.colspan < "u" && (typeof o.colspan == "function" ? a = parseInt(o.colspan(m)) : a = parseInt(o.colspan)), a > 0);
}, _t = (o = []) => {
  if (o.length > 0) {
    for (let p = 0; p < o.length; ++p)
      if (o[p].sortable) return o[p].key;
  }
  return "";
}, xt = (o, p) => {
  if (o.length > 0) {
    for (let m = 0; m < o.length; ++m)
      if (o[m].key === p) return o[m];
  }
  return null;
}, pt = (o) => o.type ? `is-${o.type}` : "", mt = /* @__PURE__ */ _({
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
  setup(o, { emit: p }) {
    const m = p, a = o, n = g(a.modelValue), t = g(n.value[a.column.key]), c = g(null);
    let D = a.column.type;
    [le.Integer, le.Float].includes(D) && (D = le.Number), F(t, (l) => {
      const R = JSON.parse(JSON.stringify(n.value));
      R[a.column.key] = l, m("update:modelValue", R);
    }), F(() => a.modelValue, (l) => {
      n.value = l, t.value = n.value[a.column.key];
    });
    const h = i(() => ({ ...a.column.slotData, item: n.value })), S = i(() => {
      var l, R, H, O;
      if ((l = a.column.field) != null && l.modalData && typeof ((R = a.column.field) == null ? void 0 : R.modalData) == "object")
        for (let U in a.column.field.modalData)
          if (typeof ((H = a.column.field) == null ? void 0 : H.modalData[U]) == "string" && a.column.field.modalData[U].startsWith("prop:")) {
            let E = a.column.field.modalData[U].substring(5);
            n.value[E];
          } else
            a.column.field.modalData[U];
      return (O = a.column.field) == null ? void 0 : O.modalData;
    });
    return (l, R) => {
      var E, x, T, ee;
      const H = z("lkt-anchor"), O = z("lkt-button"), U = z("lkt-field");
      return l.column.type === v(le).Anchor ? (u(), B(H, ae(ie({ key: 0 }, l.column.anchor)), {
        default: P(() => [
          oe(ne(v(se)(l.column, n.value, l.i)), 1)
        ]),
        _: 1
      }, 16)) : l.column.type === v(le).Button ? (u(), B(O, ie({ key: 1 }, l.column.button, { prop: n.value }), {
        default: P(() => [
          oe(ne(v(se)(l.column, n.value, l.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : l.column.type === v(le).Field && l.hasInlineEditPerm ? (u(), B(U, ie({ key: 2 }, l.column.field, {
        "read-mode": !l.column.editable || !l.editModeEnabled,
        ref: (q) => c.value = q,
        "slot-data": h.value,
        label: ((E = l.column.field) == null ? void 0 : E.type) === "switch" || ((x = l.column.field) == null ? void 0 : x.type) === "check" ? l.column.label : "",
        "modal-data": S.value,
        prop: n.value,
        modelValue: t.value,
        "onUpdate:modelValue": R[0] || (R[0] = (q) => t.value = q)
      }), null, 16, ["read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : l.column.type === v(le).Field ? (u(), B(U, ie({ key: 3 }, l.column.field, {
        "read-mode": "",
        ref: (q) => c.value = q,
        "slot-data": h.value,
        label: ((T = l.column.field) == null ? void 0 : T.type) === "switch" || ((ee = l.column.field) == null ? void 0 : ee.type) === "check" ? l.column.label : "",
        "modal-data": S.value,
        prop: n.value,
        "model-value": t.value
      }), null, 16, ["slot-data", "label", "modal-data", "prop", "model-value"])) : (u(), s(N, { key: 4 }, [
        oe(ne(v(se)(l.column, n.value, l.i, l.columns)), 1)
      ], 64));
    };
  }
}), X = class X {
};
X.navButtonSlot = "", X.dropButtonSlot = "", X.editButtonSlot = "", X.createButtonSlot = "", X.defaultEmptySlot = void 0, X.defaultSaveIcon = "", X.defaultNoResultsMessage = "No results";
let $ = X;
const el = /* @__PURE__ */ _({
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
  setup(o, { emit: p }) {
    const m = p, a = i(() => $.dropButtonSlot !== ""), n = i(() => $.dropButtonSlot);
    return (t, c) => {
      const D = z("lkt-button");
      return u(), B(D, {
        palette: "table-delete",
        icon: a.value ? "" : t.icon,
        text: a.value ? "" : t.text,
        resource: t.resource,
        "resource-data": t.resourceData,
        "confirm-modal": t.confirm,
        disabled: t.disabled,
        onClick: c[0] || (c[0] = rt((h) => m("click"), ["prevent", "stop"]))
      }, {
        default: P(() => [
          a.value ? (u(), B(Y(n.value), { key: 0 })) : f("", !0)
        ]),
        _: 1
      }, 8, ["icon", "text", "resource", "resource-data", "confirm-modal", "disabled"]);
    };
  }
}), tl = /* @__PURE__ */ _({
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
  setup(o, { emit: p }) {
    const m = p, a = i(() => $.editButtonSlot !== ""), n = i(() => $.editButtonSlot);
    return (t, c) => {
      const D = z("lkt-button");
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
        onClick: c[0] || (c[0] = rt((h) => m("click"), ["prevent", "stop"]))
      }, {
        default: P(() => [
          a.value ? (u(), B(Y(n.value), { key: 0 })) : f("", !0)
        ]),
        _: 1
      }, 8, ["icon", "text", "on-click-to", "is-anchor", "resource", "resource-data", "confirm-modal", "disabled"]);
    };
  }
}), ll = ["data-i", "data-draggable"], al = ["data-i"], ol = {
  key: 1,
  "data-role": "invalid-drag-indicator"
}, nl = {
  key: 2,
  class: "lkt-table-nav-cell"
}, ul = { class: "lkt-table-nav-container" }, rl = ["colspan"], il = ["colspan"], dl = ["data-column", "colspan", "title"], sl = {
  key: 7,
  class: "lkt-table-col-drop"
}, pl = {
  key: 8,
  class: "lkt-table-col-edit"
}, ml = /* @__PURE__ */ _({
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
  setup(o, { emit: p }) {
    const m = it(), a = p, n = o, t = g(n.modelValue);
    let c = typeof n.rowDisplayType == "function" ? n.rowDisplayType(t.value, n.i) : n.rowDisplayType;
    c || (c = re.Auto);
    const D = [re.Auto, re.PreferCustomItem].includes(c), h = [re.Auto, re.PreferItem].includes(c), S = g(n.editLink);
    for (let r in t.value) S.value = st(S.value, ":" + r, t.value[r]);
    const l = (r) => a("click", r), R = (r, b) => {
      a("show", r, b);
    }, H = i(() => {
      let r = [], b = !1;
      return typeof n.disabledDrag == "function" ? b = n.disabledDrag(t.value) : b = De.value === !0, !b && n.sortable && n.isDraggable ? r.push("handle") : b && r.push("disabled"), r.join(" ");
    }), O = i(() => $.navButtonSlot !== ""), U = i(() => $.navButtonSlot), E = () => {
      a("item-up", n.i);
    }, x = () => {
      a("item-down", n.i);
    }, T = () => {
      a("item-drop", n.i);
    }, ee = () => {
    };
    F(() => n.modelValue, (r) => t.value = r), F(t, (r) => {
      a("update:modelValue", r);
    }, { deep: !0 });
    const q = i(() => typeof n.renderDrag == "function" ? n.renderDrag(t.value) : n.renderDrag === !0), De = i(() => typeof n.disabledDrag == "function" ? n.disabledDrag(t.value) : n.disabledDrag === !0);
    return (r, b) => {
      const I = z("lkt-button");
      return u(), s("tr", {
        "data-i": r.i,
        "data-draggable": r.isDraggable,
        class: Q({ "type-custom-item": v(D), "type-item": v(h) })
      }, [
        r.sortable && r.isDraggable && r.editModeEnabled && q.value ? (u(), s("td", {
          key: 0,
          "data-role": "drag-indicator",
          class: Q(H.value),
          "data-i": r.i
        }, null, 10, al)) : r.sortable && r.editModeEnabled && q.value ? (u(), s("td", ol)) : f("", !0),
        r.addNavigation && r.editModeEnabled ? (u(), s("td", nl, [
          j("div", ul, [
            de(I, {
              palette: "table-nav",
              disabled: r.i === 0,
              onClick: E
            }, {
              default: P(() => [
                O.value ? (u(), B(Y(U.value), {
                  key: 0,
                  direction: "up"
                })) : (u(), s(N, { key: 1 }, [
                  b[3] || (b[3] = j("i", { class: "" }, null, -1)),
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
              default: P(() => [
                O.value ? (u(), B(Y(U.value), {
                  key: 0,
                  direction: "down"
                })) : (u(), s(N, { key: 1 }, [
                  b[5] || (b[5] = j("i", { class: "" }, null, -1)),
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
          class: Q(r.hiddenIsVisible ? "state-open" : "")
        }, null, 2)) : f("", !0),
        v(D) && v(m)[`item-${r.i}`] ? (u(), s("td", {
          key: "td" + r.i,
          colspan: r.visibleColumns.length
        }, [
          w(r.$slots, `item-${r.i}`, {
            item: t.value,
            index: r.i
          })
        ], 8, rl)) : v(h) && v(m).item ? (u(), s("td", {
          key: "td" + r.i,
          colspan: r.visibleColumns.length
        }, [
          w(r.$slots, "item", {
            item: t.value,
            index: r.i
          })
        ], 8, il)) : (u(!0), s(N, { key: 6 }, J(r.visibleColumns, (V) => (u(), s(N, null, [
          v(Zt)(V, r.emptyColumns, t.value) ? (u(), s("td", {
            key: "td" + r.i,
            "data-column": V.key,
            colspan: v(Pe)(V, t.value),
            title: v(se)(V, t.value, r.i, r.visibleColumns),
            class: Q(v(pt)(V)),
            onClick: b[2] || (b[2] = (te) => l(te))
          }, [
            r.$slots[V.key] && v(Yt)(V, t.value) ? w(r.$slots, V.key, {
              key: 0,
              value: t.value[V.key],
              item: t.value,
              column: V,
              i: r.i
            }) : t.value ? (u(), B(mt, {
              key: 1,
              modelValue: t.value,
              "onUpdate:modelValue": b[1] || (b[1] = (te) => t.value = te),
              column: V,
              columns: r.visibleColumns,
              "edit-mode-enabled": r.editModeEnabled,
              "has-inline-edit-perm": r.hasInlineEditPerm,
              i: r.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : f("", !0)
          ], 10, dl)) : f("", !0)
        ], 64))), 256)),
        r.canDrop && r.editModeEnabled ? (u(), s("td", sl, [
          de(el, {
            resource: r.dropResource,
            "resource-data": t.value,
            confirm: r.dropConfirm,
            text: r.dropText,
            icon: r.dropIcon,
            onClick: T
          }, null, 8, ["resource", "resource-data", "confirm", "text", "icon"])
        ])) : f("", !0),
        r.canEdit && r.editModeEnabled ? (u(), s("td", pl, [
          de(tl, {
            "resource-data": t.value,
            text: r.editText,
            icon: r.editIcon,
            link: S.value,
            onClick: ee
          }, null, 8, ["resource-data", "text", "icon", "link"])
        ])) : f("", !0)
      ], 10, ll);
    };
  }
}), cl = { "data-role": "hidden-row" }, fl = ["colspan"], vl = ["data-column"], yl = ["data-i"], bl = ["data-column", "title"], kl = /* @__PURE__ */ _({
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
  setup(o, { emit: p }) {
    const m = p, a = o, n = g(a.modelValue), t = (c) => m("click", c);
    return F(() => a.modelValue, (c) => n.value = c), F(n, () => m("update:modelValue", n.value)), (c, D) => ve((u(), s("tr", cl, [
      j("td", { colspan: c.hiddenColumnsColSpan }, [
        j("table", null, [
          j("tr", null, [
            (u(!0), s(N, null, J(c.hiddenColumns, (h) => (u(), s("th", {
              "data-column": h.key
            }, [
              j("div", null, ne(h.label), 1)
            ], 8, vl))), 256))
          ]),
          j("tr", { "data-i": c.i }, [
            (u(!0), s(N, null, J(c.hiddenColumns, (h, S) => (u(), s("td", {
              "data-column": h.key,
              title: v(se)(h, n.value, S, c.hiddenColumns),
              onClick: D[1] || (D[1] = (l) => t(l))
            }, [
              c.$slots[h.key] ? w(c.$slots, h.key, {
                key: 0,
                value: n.value[h.key],
                item: n.value,
                column: h,
                i: S
              }) : (u(), B(mt, {
                key: 1,
                column: h,
                columns: c.hiddenColumns,
                modelValue: n.value,
                "onUpdate:modelValue": D[0] || (D[0] = (l) => n.value = l),
                i: S,
                "edit-mode-enabled": c.editModeEnabled,
                "has-inline-edit-perm": c.hasInlineEditPerm
              }, null, 8, ["column", "columns", "modelValue", "i", "edit-mode-enabled", "has-inline-edit-perm"]))
            ], 8, bl))), 256))
          ], 8, yl)
        ])
      ], 8, fl)
    ], 512)), [
      [ye, c.hiddenIsVisible]
    ]);
  }
}), ut = /* @__PURE__ */ _({
  __name: "CreateButton",
  props: {
    config: { default: void 0 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["click", "append"],
  setup(o, { emit: p }) {
    var S;
    const m = p, a = o, n = i(() => $.createButtonSlot !== ""), t = i(() => $.createButtonSlot), c = {
      ...(S = a.config) == null ? void 0 : S.modalData,
      beforeClose: (l) => {
        "itemCreated" in l && l.itemCreated === !0 && m("append", l.item);
      }
    }, D = {
      ...a.config
    };
    D.modalData = c;
    const h = () => {
      var l;
      if (!((l = a.config) != null && l.modal)) {
        m("click");
        return;
      }
    };
    return (l, R) => {
      const H = z("lkt-button");
      return u(), B(H, ie(D, {
        disabled: l.disabled,
        onClick: h
      }), {
        default: P(() => [
          n.value ? (u(), B(Y(t.value), { key: 0 })) : f("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), gl = ["data-column", "data-sortable", "data-sort", "colspan", "title"], hl = /* @__PURE__ */ _({
  __name: "TableHeader",
  props: {
    column: { default: () => new Le() },
    sortBy: { default: "" },
    sortDirection: { default: "" },
    amountOfColumns: { default: 0 },
    items: { default: () => [] }
  },
  emits: ["click"],
  setup(o, { emit: p }) {
    const m = p, a = o, n = i(() => Xt(a.column, a.amountOfColumns, a.items)), t = i(() => a.column.sortable === !0), c = i(() => t.value && a.sortBy === a.column.key ? a.sortDirection : ""), D = i(() => a.column.label.startsWith("__:") ? dt(a.column.label.substring(3)) : a.column.label), h = () => m("click", a.column);
    return (S, l) => (u(), s("th", {
      "data-column": S.column.key,
      "data-sortable": t.value,
      "data-sort": c.value,
      colspan: n.value,
      title: D.value,
      class: Q(v(pt)(S.column)),
      onClick: h
    }, [
      j("div", null, ne(D.value), 1)
    ], 10, gl));
  }
}), Cl = ["id"], Bl = {
  key: 0,
  class: "lkt-table-page-buttons"
}, Dl = { class: "switch-edition-mode" }, Sl = {
  key: 1,
  class: "lkt-table-page-buttons"
}, Il = {
  key: 2,
  class: "lkt-table-page-filters"
}, Vl = { class: "lkt-table" }, El = { key: 0 }, Tl = {
  key: 0,
  "data-role": "drag-indicator"
}, wl = { key: 1 }, $l = { key: 2 }, Rl = {
  key: 3,
  class: "lkt-table-col-drop"
}, Ml = {
  key: 4,
  class: "lkt-table-col-edit"
}, Ll = ["id"], Pl = ["id"], Nl = ["data-i"], Fl = ["data-i"], Ol = {
  key: 4,
  class: "lkt-table-empty"
}, Ul = {
  key: 5,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, Al = /* @__PURE__ */ _({
  __name: "LktTable",
  props: /* @__PURE__ */ Ht({
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
  }, Kt(Wt)),
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
  setup(o, { expose: p, emit: m }) {
    var tt;
    const a = m, n = it(), t = o, c = {}, D = g(typeof t.sorter == "function" ? t.sorter : Qt), h = g(_t(t.columns)), S = g(be.Asc), l = g(t.modelValue), R = g(c), H = g(null), O = g(t.columns), U = g((tt = t.paginator) == null ? void 0 : tt.modelValue), E = g(t.loading), x = g(!1), T = g(t.perms), ee = g(null), q = g(null), De = g(null), r = g({}), b = g(new Gt({ items: l.value }, t.dataStateConfig)), I = g(t.editMode), V = g(0), te = g(null), K = g(at(t.saveButton, ot.defaultSaveButton)), Ne = g(at(t.createButton, ot.defaultCreateButton)), ue = g(!1);
    F(E, (e) => a("update:loading", e)), F(U, (e) => a("page", e));
    const ct = (e) => {
      T.value = e;
    }, ft = (e) => {
      Array.isArray(e.data) && (l.value = e.data), E.value = !1, x.value = !0, b.value.store({ items: l.value }).turnStoredIntoOriginal(), ue.value = !1, Be(() => {
        Ve.value, a("read-response", e);
      });
    }, vt = () => Be(() => E.value = !0), yt = () => {
      ee.value.doRefresh();
    }, pe = zt(12), Se = i(() => {
      if (!t.hideEmptyColumns) return [];
      let e = [];
      return O.value.forEach((d) => {
        let k = d.key, M = !1;
        l.value.forEach((A) => {
          if (typeof A.checkEmpty == "function")
            return A.checkEmpty(A);
          A[k] && (M = !0);
        }), M || e.push(k);
      }), e;
    }), ke = i(() => O.value.filter((e) => !e.hidden)), Ie = i(() => O.value.filter((e) => e.hidden)), bt = i(() => {
      let e = ke.value.length + 1;
      return t.sortable && ++e, e;
    }), kt = i(() => O.value.filter((e) => e.isForRowKey)), Fe = i(() => Ie.value.length > 0 && !t.sortable), gt = i(() => O.value.map((e) => e.key)), Oe = i(() => {
      let e = [];
      for (let d in n) gt.value.indexOf(d) !== -1 && e.push(d);
      return e;
    }), Ue = i(() => {
      var e;
      return t.hiddenSave || E.value || !((e = K.value) != null && e.resource || K.value.type) ? !1 : I.value && ue.value ? !0 : I.value;
    }), ht = i(() => Ce.value && l.value.length >= t.requiredItemsForTopCreate || t.switchEditionEnabled ? !0 : Ue.value || I.value && me.value), Ve = i(() => {
      var e, d;
      return V.value, typeof ((e = K.value) == null ? void 0 : e.disabled) == "function" ? K.value.disabled({
        value: l.value,
        dataState: b.value
      }) : typeof ((d = K.value) == null ? void 0 : d.disabled) == "boolean" ? K.value.disabled : !ue.value;
    }), Ct = i(() => l.value.length), Bt = i(() => {
      var e;
      return {
        items: l.value,
        ...(e = K.value) == null ? void 0 : e.resourceData
      };
    }), Dt = i(() => t.titleTag === "" ? "h2" : t.titleTag), St = i(() => t.wrapContentTag === "" ? "div" : t.wrapContentTag), Ee = i(() => nt(t.title)), It = i(() => nt(t.editModeText)), Te = i(() => {
      var e;
      return (e = t.drag) == null ? void 0 : e.enabled;
    }), me = i(() => T.value.includes(Z.Create)), Ae = i(() => T.value.includes("read")), ge = i(() => T.value.includes(Z.Update)), je = i(() => T.value.includes(Z.Edit)), He = i(() => T.value.includes(Z.InlineEdit)), Vt = i(() => T.value.includes(Z.ModalCreate)), Et = i(() => T.value.includes(Z.InlineCreate)), qe = i(() => T.value.includes(Z.InlineCreateEver)), he = i(() => T.value.includes(Z.Drop)), Tt = (e) => {
      let d = e.target;
      if (typeof d.dataset.column > "u")
        do
          d = d.parentNode;
        while (typeof d.dataset.column > "u" && d.tagName !== "TABLE" && d.tagName !== "body");
      if (d.tagName === "TD" && (d = d.parentNode, d = d.dataset.i, typeof d < "u"))
        return l.value[d];
    }, wt = (e) => l.value[e], $t = (e) => {
      var d;
      return (d = H.value) == null ? void 0 : d.querySelector(`[data-i="${e}"]`);
    }, Ke = (e) => R.value["tr_" + e] === !0, We = (e) => {
      e && e.sortable && (l.value = l.value.sort((d, k) => D.value(d, k, e, S.value)), S.value = S.value === be.Asc ? be.Desc : be.Asc, h.value = e.key, a("sort", [h.value, S.value]));
    }, ze = (e) => {
      a("click", e);
    }, Ge = (e, d) => {
      let k = "tr_" + d;
      R.value[k] = typeof R.value[k] > "u" ? !0 : !R.value[k];
    }, Rt = (e) => {
      var k, M, A, W, C, y, L, G;
      let d = parseInt((W = (A = (M = (k = e == null ? void 0 : e.originalEvent) == null ? void 0 : k.toElement) == null ? void 0 : M.closest("tr")) == null ? void 0 : A.dataset) == null ? void 0 : W.i);
      return !(typeof ((C = t.drag) == null ? void 0 : C.isValid) == "function" && !((y = t.drag) != null && y.isValid(l.value[d])) || typeof ((L = t.drag) == null ? void 0 : L.isValid) == "boolean" && !((G = t.drag) != null && G.isValid));
    }, Je = (e) => {
      var d, k;
      return typeof ((d = t.drag) == null ? void 0 : d.isDraggable) == "function" ? (k = t.drag) == null ? void 0 : k.isDraggable(e) : !0;
    }, Qe = () => {
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
    }, Xe = (e) => {
      l.value.push(e);
    }, Ye = () => E.value = !0, Ze = () => E.value = !1, Mt = (e, d) => {
      var k, M, A;
      if (!((k = K.value) != null && k.type && [
        Me.Split,
        Me.SplitEver,
        Me.SplitLazy
      ].includes((M = K.value) == null ? void 0 : M.type))) {
        if (a("before-save"), (A = K.value) != null && A.resource && (E.value = !1, !d.success)) {
          a("error", d.httpStatus);
          return;
        }
        b.value.turnStoredIntoOriginal(), ue.value = !1, a("save", d);
      }
    }, _e = (e, d, k) => {
      if (k >= e.length) {
        let M = k - e.length + 1;
        for (; M--; ) e.push(void 0);
      }
      return e.splice(k, 0, e.splice(d, 1)[0]), e;
    }, Lt = (e) => {
      _e(l.value, e, e - 1), V.value = fe();
    }, Pt = (e) => {
      _e(l.value, e, e + 1), V.value = fe();
    }, we = (e) => {
      l.value.splice(e, 1), V.value = fe();
    }, Nt = () => {
      var e;
      r.value && typeof ((e = r.value) == null ? void 0 : e.destroy) == "function" && (r.value.destroy(), r.value = {});
    }, xe = () => {
      te.value || (te.value = document.getElementById("lkt-table-body-" + pe)), r.value = new Jt(te.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let d = e.oldIndex, k = e.newIndex;
          l.value.splice(k, 0, l.value.splice(d, 1)[0]), V.value = fe(), a("drag-end", l.value[k]);
        },
        onMove: function(e, d) {
          return Rt(e);
        }
      });
    }, $e = (e, d, k = !1) => {
      let M = [V.value, pe, "row", d];
      return k && M.push("hidden"), kt.value.forEach((A) => {
        let W = String(e[A.key]).toLowerCase();
        W.length > 50 && (W = W.substring(0, 50)), W = st(W, " ", "-"), M.push(W);
      }), M.join("-");
    }, et = i(() => typeof t.createEnabledValidator == "function" ? t.createEnabledValidator({ items: l.value }) : !0), Ce = i(() => qe.value || me.value && I.value || Et.value && I.value || Vt.value && I.value), Ft = i(() => [ce.Ol, ce.Ul].includes(t.type)), Re = (e, d) => typeof t.itemDisplayChecker == "function" ? t.itemDisplayChecker(e) : !0;
    qt(() => {
      var e;
      t.initialSorting && We(xt(t.columns, h.value)), b.value.store({ items: l.value }).turnStoredIntoOriginal(), ue.value = !1, (e = t.drag) != null && e.enabled && Be(() => {
        xe();
      });
    }), F(() => {
      var e;
      return (e = t.drag) == null ? void 0 : e.enabled;
    }, (e) => {
      e ? xe() : Nt();
    }), F(() => t.perms, (e) => T.value = e), F(T, (e) => a("update:perms", e)), F(() => t.editMode, (e) => I.value = e), F(() => t.columns, (e) => O.value = e, { deep: !0 }), F(() => t.modelValue, (e) => l.value = e, { deep: !0 }), F(l, (e) => {
      b.value.increment({ items: e }), ue.value = b.value.changed(), a("update:modelValue", e);
    }, { deep: !0 }), p({
      getItemByEvent: Tt,
      getItemByIndex: wt,
      getRowByIndex: $t,
      doRefresh: yt,
      getHtml: () => q.value,
      turnStoredIntoOriginal: () => {
        b.value.turnStoredIntoOriginal(), Be(() => {
          V.value = fe();
        });
      }
    });
    const Ot = i(() => typeof $.defaultEmptySlot < "u"), Ut = i(() => $.defaultEmptySlot), At = i(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled ? !1 : typeof t.drag.canRender > "u" ? !0 : t.drag.canRender), jt = i(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled || typeof t.drag.isDisabled > "u" ? !1 : t.drag.isDisabled);
    return (e, d) => {
      const k = z("lkt-button"), M = z("lkt-field"), A = z("lkt-loader"), W = z("lkt-paginator");
      return u(), s("section", {
        ref_key: "element",
        ref: q,
        class: "lkt-table-page",
        id: "lkt-table-page-" + v(pe)
      }, [
        Ee.value || v(n).title ? (u(), s("header", {
          key: 0,
          class: Q(e.headerClass)
        }, [
          Ee.value ? (u(), B(Y(Dt.value), { key: 0 }, {
            default: P(() => [
              e.titleIcon ? (u(), s("i", {
                key: 0,
                class: Q(e.titleIcon)
              }, null, 2)) : f("", !0),
              oe(" " + ne(Ee.value), 1)
            ]),
            _: 1
          })) : f("", !0),
          v(n).title ? w(e.$slots, "title", { key: 1 }) : f("", !0)
        ], 2)) : f("", !0),
        (u(), B(Y(St.value), {
          class: Q(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: P(() => [
            ht.value ? (u(), s("div", Bl, [
              ve(de(k, ie({
                class: "lkt-table--save-button",
                ref_key: "saveButtonRef",
                ref: De
              }, K.value, {
                disabled: Ve.value,
                "modal-data": Bt.value,
                onLoading: Ye,
                onLoaded: Ze,
                onClick: Mt
              }), {
                split: P(({ doClose: C, doRootClick: y }) => [
                  w(e.$slots, "button-save-split", {
                    doClose: C,
                    doRootClick: y,
                    dataState: b.value,
                    onButtonLoading: Ye,
                    onButtonLoaded: Ze
                  })
                ]),
                default: P(() => [
                  v(n)["button-save"] ? w(e.$slots, "button-save", {
                    key: 0,
                    items: l.value,
                    editMode: e.editMode,
                    canUpdate: !Ve.value
                  }) : f("", !0)
                ]),
                _: 3
              }, 16, ["disabled", "modal-data"]), [
                [ye, Ue.value]
              ]),
              Ce.value && l.value.length >= e.requiredItemsForTopCreate ? (u(), B(ut, {
                key: 0,
                config: Ne.value,
                disabled: !et.value || e.createDisabled,
                onClick: Qe,
                onAppend: Xe
              }, null, 8, ["config", "disabled"])) : f("", !0),
              j("div", Dl, [
                ve(de(M, {
                  type: "switch",
                  modelValue: I.value,
                  "onUpdate:modelValue": d[0] || (d[0] = (C) => I.value = C),
                  label: It.value
                }, null, 8, ["modelValue", "label"]), [
                  [ye, e.switchEditionEnabled]
                ])
              ])
            ])) : f("", !0),
            v(n).buttons ? (u(), s("div", Sl, [
              w(e.$slots, "buttons")
            ])) : f("", !0),
            x.value && v(n).filters ? (u(), s("div", Il, [
              w(e.$slots, "filters", {
                items: l.value,
                isLoading: E.value
              })
            ])) : f("", !0),
            E.value ? (u(), B(A, { key: 3 })) : f("", !0),
            ve(j("div", Vl, [
              e.type === v(ce).Table ? (u(), s("table", El, [
                j("thead", null, [
                  j("tr", null, [
                    Te.value && I.value ? (u(), s("th", Tl)) : f("", !0),
                    e.addNavigation && I.value ? (u(), s("th", wl)) : f("", !0),
                    Fe.value ? (u(), s("th", $l)) : f("", !0),
                    (u(!0), s(N, null, J(ke.value, (C) => (u(), s(N, null, [
                      Se.value.indexOf(C.key) === -1 ? (u(), B(hl, {
                        key: 0,
                        column: C,
                        "sort-by": h.value,
                        "sort-direction": S.value,
                        "amount-of-columns": e.columns.length,
                        items: l.value,
                        onClick: (y) => We(C)
                      }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : f("", !0)
                    ], 64))), 256)),
                    he.value && I.value ? (u(), s("th", Rl)) : f("", !0),
                    je.value && ge.value && I.value ? (u(), s("th", Ml)) : f("", !0)
                  ])
                ]),
                j("tbody", {
                  ref_key: "tableBody",
                  ref: H,
                  id: "lkt-table-body-" + v(pe)
                }, [
                  (u(!0), s(N, null, J(l.value, (C, y) => ve((u(), B(ml, {
                    modelValue: l.value[y],
                    "onUpdate:modelValue": (L) => l.value[y] = L,
                    key: $e(C, y),
                    i: y,
                    "display-hidden-columns-indicator": Fe.value,
                    "is-draggable": Je(C),
                    sortable: Te.value,
                    "visible-columns": ke.value,
                    "empty-columns": Se.value,
                    "add-navigation": e.addNavigation,
                    "hidden-is-visible": Ke(y),
                    "latest-row": y + 1 === Ct.value,
                    "can-drop": he.value && I.value,
                    "drop-confirm": e.dropConfirm,
                    "drop-resource": e.dropResource,
                    "drop-text": e.dropText,
                    "drop-icon": e.dropIcon,
                    "can-edit": je.value && ge.value && I.value,
                    "edit-text": e.editText,
                    "edit-icon": e.editIcon,
                    "edit-link": e.editLink,
                    "edit-mode-enabled": I.value,
                    "has-inline-edit-perm": He.value,
                    "row-display-type": e.rowDisplayType,
                    "render-drag": At.value,
                    "disabled-drag": jt.value,
                    onClick: ze,
                    onShow: Ge,
                    onItemUp: Lt,
                    onItemDown: Pt,
                    onItemDrop: we
                  }, lt({ _: 2 }, [
                    v(n)[`item-${y}`] ? {
                      name: `item-${y}`,
                      fn: P((L) => [
                        w(e.$slots, `item-${y}`, ae({
                          [e.slotItemVar || ""]: L.item,
                          index: y
                        }))
                      ]),
                      key: "0"
                    } : v(n).item ? {
                      name: "item",
                      fn: P((L) => [
                        w(e.$slots, "item", ae({
                          [e.slotItemVar || ""]: L.item,
                          index: y
                        }))
                      ]),
                      key: "1"
                    } : void 0,
                    J(Oe.value, (L) => ({
                      name: L,
                      fn: P((G) => [
                        w(e.$slots, L, ae({
                          [e.slotItemVar || ""]: G.item,
                          value: G.value,
                          column: G.column
                        }))
                      ])
                    }))
                  ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "display-hidden-columns-indicator", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "hidden-is-visible", "latest-row", "can-drop", "drop-confirm", "drop-resource", "drop-text", "drop-icon", "can-edit", "edit-text", "edit-icon", "edit-link", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag"])), [
                    [ye, Re(l.value[y])]
                  ])), 128)),
                  Ie.value.length > 0 ? (u(!0), s(N, { key: 0 }, J(l.value, (C, y) => (u(), B(kl, {
                    modelValue: l.value[y],
                    "onUpdate:modelValue": (L) => l.value[y] = L,
                    key: $e(C, y, !0),
                    i: y,
                    "hidden-columns": Ie.value,
                    "hidden-columns-col-span": bt.value,
                    "is-draggable": Je(C),
                    sortable: Te.value,
                    "visible-columns": ke.value,
                    "empty-columns": Se.value,
                    "hidden-is-visible": Ke(y),
                    "edit-mode-enabled": I.value,
                    "has-inline-edit-perm": He.value,
                    onClick: ze,
                    onShow: Ge
                  }, lt({ _: 2 }, [
                    J(Oe.value, (L) => ({
                      name: L,
                      fn: P((G) => [
                        w(e.$slots, L, ae({
                          [e.slotItemVar || ""]: G.item,
                          value: G.value,
                          column: G.column
                        }))
                      ])
                    }))
                  ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "hidden-columns", "hidden-columns-col-span", "is-draggable", "sortable", "visible-columns", "empty-columns", "hidden-is-visible", "edit-mode-enabled", "has-inline-edit-perm"]))), 128)) : f("", !0)
                ], 8, Ll)
              ])) : e.type === v(ce).Item ? (u(), s("div", {
                key: 1,
                ref_key: "tableBody",
                ref: H,
                id: "lkt-table-body-" + v(pe),
                class: Q(["lkt-table-items-container", e.itemsContainerClass])
              }, [
                (u(!0), s(N, null, J(l.value, (C, y) => (u(), s(N, null, [
                  Re(C) ? (u(), s("div", {
                    class: "lkt-table-item",
                    "data-i": y,
                    key: $e(C, y)
                  }, [
                    w(e.$slots, "item", ae({
                      [e.slotItemVar || ""]: C,
                      index: y,
                      editing: I.value,
                      canCreate: me.value,
                      canRead: Ae.value,
                      canUpdate: ge.value,
                      canDrop: he.value,
                      isLoading: E.value,
                      doDrop: () => we(y)
                    }))
                  ], 8, Nl)) : f("", !0)
                ], 64))), 256))
              ], 10, Pl)) : Ft.value ? (u(), B(Y(e.type), {
                key: 2,
                class: Q(["lkt-table-items-container", e.itemsContainerClass])
              }, {
                default: P(() => [
                  (u(!0), s(N, null, J(l.value, (C, y) => (u(), s(N, null, [
                    Re(C) ? (u(), s("li", {
                      key: 0,
                      class: "lkt-table-item",
                      "data-i": y
                    }, [
                      w(e.$slots, "item", ae({
                        [e.slotItemVar || ""]: C,
                        index: y,
                        editing: I.value,
                        canCreate: me.value,
                        canRead: Ae.value,
                        canUpdate: ge.value,
                        canDrop: he.value,
                        isLoading: E.value,
                        doDrop: () => we(y)
                      }))
                    ], 8, Fl)) : f("", !0)
                  ], 64))), 256))
                ]),
                _: 3
              }, 8, ["class"])) : f("", !0)
            ], 512), [
              [ye, !E.value && l.value.length > 0]
            ]),
            !E.value && l.value.length === 0 ? (u(), s("div", Ol, [
              v(n).empty ? w(e.$slots, "empty", { key: 0 }) : Ot.value ? (u(), B(Y(Ut.value), {
                key: 1,
                message: e.noResultsText
              }, null, 8, ["message"])) : e.noResultsText ? (u(), s(N, { key: 2 }, [
                oe(ne(e.noResultsText), 1)
              ], 64)) : f("", !0)
            ])) : f("", !0),
            Ce.value || v(n).bottomButtons ? (u(), s("div", Ul, [
              Ce.value && l.value.length >= e.requiredItemsForBottomCreate ? (u(), B(ut, {
                key: 0,
                config: Ne.value,
                disabled: !et.value || e.createDisabled,
                onClick: Qe,
                onAppend: Xe
              }, null, 8, ["config", "disabled"])) : f("", !0),
              w(e.$slots, "bottom-buttons")
            ])) : f("", !0),
            e.resource.length > 0 ? (u(), B(W, {
              key: 6,
              ref_key: "paginatorRef",
              ref: ee,
              modelValue: U.value,
              "onUpdate:modelValue": d[1] || (d[1] = (C) => U.value = C),
              resource: e.resource,
              filters: e.filters,
              onLoading: vt,
              onPerms: ct,
              onResponse: ft
            }, null, 8, ["modelValue", "resource", "filters"])) : f("", !0)
          ]),
          _: 3
        }, 8, ["class"]))
      ], 8, Cl);
    };
  }
}), Ql = {
  install: (o) => {
    o.component("lkt-table") === void 0 && o.component("lkt-table", Al);
  }
}, Xl = (o) => ($.navButtonSlot = o, !0), Yl = (o) => ($.dropButtonSlot = o, !0), Zl = (o) => ($.createButtonSlot = o, !0), _l = (o) => {
  $.defaultEmptySlot = o;
}, xl = (o) => {
  $.defaultSaveIcon = o;
};
export {
  la as Column,
  Jl as createColumn,
  Ql as default,
  Zl as setTableCreateButtonSlot,
  Yl as setTableDropButtonSlot,
  _l as setTableEmptySlot,
  Xl as setTableNavButtonSlot,
  xl as setTableSaveIcon
};
