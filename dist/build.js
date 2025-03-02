import { defineComponent as te, ref as h, watch as A, computed as s, resolveComponent as z, createBlock as S, createElementBlock as p, unref as b, openBlock as u, normalizeProps as oe, mergeProps as Q, withCtx as L, createTextVNode as ee, toDisplayString as ue, Fragment as P, withModifiers as rt, createCommentVNode as c, resolveDynamicComponent as Z, useSlots as it, normalizeClass as K, createElementVNode as U, createVNode as pe, renderSlot as T, renderList as J, withDirectives as be, vShow as ge, mergeDefaults as Kt, onMounted as zt, nextTick as Be, createSlots as nt } from "vue";
import { __ as Wt } from "lkt-i18n";
import { SortDirection as ne, Column as st, ColumnType as Se, TableRowType as de, extractI18nValue as dt, LktSettings as ke, ensureButtonConfig as Pe, TablePermission as X, PaginatorType as De, TableType as ye, getDefaultValues as Gt, Table as Jt, ButtonType as Ne } from "lkt-vue-kernel";
import { Column as na, createColumn as ua } from "lkt-vue-kernel";
import { replaceAll as pt, generateRandomString as Qt } from "lkt-string-tools";
import { DataState as Xt } from "lkt-data-state";
import Yt from "sortablejs";
import { time as ae } from "lkt-date-tools";
const Zt = (o, v, y, n) => {
  if (!y) return 0;
  let l = String(o[y.key]).toLowerCase(), t = String(v[y.key]).toLowerCase();
  if (n === ne.Asc) {
    if (l > t) return 1;
    if (t > l) return -1;
  } else {
    if (l > t) return -1;
    if (t > l) return 1;
  }
  return 0;
}, me = (o, v, y, n = []) => {
  if (o.extractTitleFromColumn) {
    let l = n.find((t) => t.key === o.extractTitleFromColumn);
    if (l)
      return me(l, v, y, n);
  }
  if (o.formatter && typeof o.formatter == "function") {
    let l = o.formatter(v[o.key], v, o, y);
    return l.startsWith("__:") ? Wt(l.substring(3)) : l;
  }
  return v[o.key];
}, xt = (o, v, y) => {
  if (!o.colspan) return -1;
  let n = v;
  return y.forEach((l) => {
    let t = Fe(o, l);
    t > 0 && t < n && (n = t);
  }), n;
}, Fe = (o, v) => o.colspan === !1 ? !1 : typeof o.colspan == "function" ? o.colspan(v) : o.colspan, el = (o, v) => typeof o.preferSlot > "u" ? !0 : o.preferSlot === !1 ? !1 : typeof o.preferSlot == "function" ? o.preferSlot(v) : !0, tl = (o, v, y) => {
  if (typeof o != "object" || !o.key || v.indexOf(o.key) > -1) return !1;
  let n = Fe(o, y);
  return typeof o.colspan > "u" ? !0 : (typeof o.colspan < "u" && (typeof o.colspan == "function" ? n = parseInt(o.colspan(y)) : n = parseInt(o.colspan)), n > 0);
}, ll = (o = []) => {
  if (o.length > 0) {
    for (let v = 0; v < o.length; ++v)
      if (o[v].sortable) return o[v].key;
  }
  return "";
}, al = (o, v) => {
  if (o.length > 0) {
    for (let y = 0; y < o.length; ++y)
      if (o[y].key === v) return o[y];
  }
  return null;
}, mt = (o) => o.type ? `is-${o.type}` : "", vt = /* @__PURE__ */ te({
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
  setup(o, { emit: v }) {
    const y = v, n = o, l = h(n.modelValue), t = h(l.value[n.column.key]), f = h(null);
    A(t, (i) => {
      const a = JSON.parse(JSON.stringify(l.value));
      a[n.column.key] = i, y("update:modelValue", a);
    }), A(() => n.modelValue, (i) => {
      l.value = i, t.value = l.value[n.column.key];
    });
    const D = s(() => ({ ...n.column.slotData, item: l.value })), k = s(() => {
      var i, a, N, j;
      if ((i = n.column.field) != null && i.modalData && typeof ((a = n.column.field) == null ? void 0 : a.modalData) == "object")
        for (let w in n.column.field.modalData)
          if (typeof ((N = n.column.field) == null ? void 0 : N.modalData[w]) == "string" && n.column.field.modalData[w].startsWith("prop:")) {
            let _ = n.column.field.modalData[w].substring(5);
            l.value[_];
          } else
            n.column.field.modalData[w];
      return (j = n.column.field) == null ? void 0 : j.modalData;
    });
    return (i, a) => {
      var _, I, le, V;
      const N = z("lkt-anchor"), j = z("lkt-button"), w = z("lkt-field");
      return i.column.type === b(Se).Anchor ? (u(), S(N, oe(Q({ key: 0 }, i.column.anchor)), {
        default: L(() => [
          ee(ue(b(me)(i.column, l.value, i.i)), 1)
        ]),
        _: 1
      }, 16)) : i.column.type === b(Se).Button ? (u(), S(j, Q({ key: 1 }, i.column.button, { prop: l.value }), {
        default: L(() => [
          ee(ue(b(me)(i.column, l.value, i.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : i.column.type === b(Se).Field && i.hasInlineEditPerm ? (u(), S(w, Q({ key: 2 }, i.column.field, {
        "read-mode": !i.column.editable || !i.editModeEnabled,
        ref: (W) => f.value = W,
        "slot-data": D.value,
        label: ((_ = i.column.field) == null ? void 0 : _.type) === "switch" || ((I = i.column.field) == null ? void 0 : I.type) === "check" ? i.column.label : "",
        "modal-data": k.value,
        prop: l.value,
        modelValue: t.value,
        "onUpdate:modelValue": a[0] || (a[0] = (W) => t.value = W)
      }), null, 16, ["read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : i.column.type === b(Se).Field ? (u(), S(w, Q({ key: 3 }, i.column.field, {
        "read-mode": "",
        ref: (W) => f.value = W,
        "slot-data": D.value,
        label: ((le = i.column.field) == null ? void 0 : le.type) === "switch" || ((V = i.column.field) == null ? void 0 : V.type) === "check" ? i.column.label : "",
        "modal-data": k.value,
        prop: l.value,
        "model-value": t.value
      }), null, 16, ["slot-data", "label", "modal-data", "prop", "model-value"])) : (u(), p(P, { key: 4 }, [
        ee(ue(b(me)(i.column, l.value, i.i, i.columns)), 1)
      ], 64));
    };
  }
}), Y = class Y {
};
Y.navButtonSlot = "", Y.dropButtonSlot = "", Y.editButtonSlot = "", Y.createButtonSlot = "", Y.defaultEmptySlot = void 0, Y.defaultSaveIcon = "", Y.defaultNoResultsMessage = "No results";
let $ = Y;
const ol = /* @__PURE__ */ te({
  __name: "DropButton",
  props: {
    config: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(o, { emit: v }) {
    const y = v, n = o, l = s(() => $.dropButtonSlot !== ""), t = s(() => $.dropButtonSlot);
    return (f, D) => {
      var i, a;
      const k = z("lkt-button");
      return u(), S(k, Q({ palette: "table-delete" }, n.config, {
        icon: l.value ? "" : (i = f.config) == null ? void 0 : i.icon,
        text: l.value ? "" : (a = f.config) == null ? void 0 : a.text,
        disabled: f.disabled,
        onClick: D[0] || (D[0] = rt((N) => y("click"), ["prevent", "stop"]))
      }), {
        default: L(() => [
          l.value ? (u(), S(Z(t.value), { key: 0 })) : c("", !0)
        ]),
        _: 1
      }, 16, ["icon", "text", "disabled"]);
    };
  }
}), nl = /* @__PURE__ */ te({
  __name: "EditButton",
  props: {
    config: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(o, { emit: v }) {
    const y = v, n = o, l = s(() => $.editButtonSlot !== ""), t = s(() => $.editButtonSlot);
    return (f, D) => {
      var i, a;
      const k = z("lkt-button");
      return u(), S(k, Q({ palette: "table-delete" }, n.config, {
        icon: l.value ? "" : (i = f.config) == null ? void 0 : i.icon,
        text: l.value ? "" : (a = f.config) == null ? void 0 : a.text,
        disabled: f.disabled,
        onClick: D[0] || (D[0] = rt((N) => y("click"), ["prevent", "stop"]))
      }), {
        default: L(() => [
          l.value ? (u(), S(Z(t.value), { key: 0 })) : c("", !0)
        ]),
        _: 1
      }, 16, ["icon", "text", "disabled"]);
    };
  }
}), ul = ["data-i", "data-draggable"], rl = ["data-i"], il = {
  key: 1,
  "data-role": "invalid-drag-indicator"
}, sl = {
  key: 2,
  class: "lkt-table-nav-cell"
}, dl = { class: "lkt-table-nav-container" }, pl = ["colspan"], ml = ["colspan"], vl = ["data-column", "colspan", "title"], fl = {
  key: 7,
  class: "lkt-table-col-drop"
}, cl = {
  key: 8,
  class: "lkt-table-col-edit"
}, yl = /* @__PURE__ */ te({
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
    rowDisplayType: { type: [Number, Function], default: de.Auto },
    renderDrag: { type: [Boolean, Function], default: !0 },
    disabledDrag: { type: [Boolean, Function], default: !0 }
  },
  emits: ["update:modelValue", "click", "show", "item-up", "item-down", "item-drop"],
  setup(o, { emit: v }) {
    var x;
    const y = it(), n = v, l = o, t = h(l.modelValue);
    let f = typeof l.rowDisplayType == "function" ? l.rowDisplayType(t.value, l.i) : l.rowDisplayType;
    f || (f = de.Auto);
    const D = [de.Auto, de.PreferCustomItem].includes(f), k = [de.Auto, de.PreferItem].includes(f), i = h((x = l.editButton.anchor) == null ? void 0 : x.to);
    for (let r in t.value) i.value = pt(i.value, ":" + r, t.value[r]);
    const a = (r) => n("click", r), N = (r, m) => {
      n("show", r, m);
    }, j = s(() => {
      let r = [], m = !1;
      return typeof l.disabledDrag == "function" ? m = l.disabledDrag(t.value) : m = Ie.value === !0, !m && l.sortable && l.isDraggable ? r.push("handle") : m && r.push("disabled"), r.join(" ");
    }), w = s(() => $.navButtonSlot !== ""), _ = s(() => $.navButtonSlot), I = () => {
      n("item-up", l.i);
    }, le = () => {
      n("item-down", l.i);
    }, V = () => {
      n("item-drop", l.i);
    }, W = () => {
    };
    A(() => l.modelValue, (r) => t.value = r), A(t, (r) => {
      n("update:modelValue", r);
    }, { deep: !0 });
    const ve = s(() => typeof l.renderDrag == "function" ? l.renderDrag(t.value) : l.renderDrag === !0), Ie = s(() => typeof l.disabledDrag == "function" ? l.disabledDrag(t.value) : l.disabledDrag === !0);
    return (r, m) => {
      const H = z("lkt-button");
      return u(), p("tr", {
        "data-i": r.i,
        "data-draggable": r.isDraggable,
        class: K({ "type-custom-item": b(D), "type-item": b(k) })
      }, [
        r.sortable && r.isDraggable && r.editModeEnabled && ve.value ? (u(), p("td", {
          key: 0,
          "data-role": "drag-indicator",
          class: K(j.value),
          "data-i": r.i
        }, null, 10, rl)) : r.sortable && r.editModeEnabled && ve.value ? (u(), p("td", il)) : c("", !0),
        r.addNavigation && r.editModeEnabled ? (u(), p("td", sl, [
          U("div", dl, [
            pe(H, {
              palette: "table-nav",
              disabled: r.i === 0,
              onClick: I
            }, {
              default: L(() => [
                w.value ? (u(), S(Z(_.value), {
                  key: 0,
                  direction: "up"
                })) : (u(), p(P, { key: 1 }, [
                  m[3] || (m[3] = U("i", { class: "" }, null, -1)),
                  m[4] || (m[4] = ee(" UP "))
                ], 64))
              ]),
              _: 1
            }, 8, ["disabled"]),
            pe(H, {
              palette: "table-nav",
              disabled: r.latestRow,
              onClick: le
            }, {
              default: L(() => [
                w.value ? (u(), S(Z(_.value), {
                  key: 0,
                  direction: "down"
                })) : (u(), p(P, { key: 1 }, [
                  m[5] || (m[5] = U("i", { class: "" }, null, -1)),
                  m[6] || (m[6] = ee(" DOWN "))
                ], 64))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : c("", !0),
        r.displayHiddenColumnsIndicator ? (u(), p("td", {
          key: 3,
          onClick: m[0] || (m[0] = (E) => N(E, r.i)),
          "data-role": "show-more",
          class: K(r.hiddenIsVisible ? "state-open" : "")
        }, null, 2)) : c("", !0),
        b(D) && b(y)[`item-${r.i}`] ? (u(), p("td", {
          key: "td" + r.i,
          colspan: r.visibleColumns.length
        }, [
          T(r.$slots, `item-${r.i}`, {
            item: t.value,
            index: r.i
          })
        ], 8, pl)) : b(k) && b(y).item ? (u(), p("td", {
          key: "td" + r.i,
          colspan: r.visibleColumns.length
        }, [
          T(r.$slots, "item", {
            item: t.value,
            index: r.i
          })
        ], 8, ml)) : (u(!0), p(P, { key: 6 }, J(r.visibleColumns, (E) => (u(), p(P, null, [
          b(tl)(E, r.emptyColumns, t.value) ? (u(), p("td", {
            key: "td" + r.i,
            "data-column": E.key,
            colspan: b(Fe)(E, t.value),
            title: b(me)(E, t.value, r.i, r.visibleColumns),
            class: K(b(mt)(E)),
            onClick: m[2] || (m[2] = (F) => a(F))
          }, [
            r.$slots[E.key] && b(el)(E, t.value) ? T(r.$slots, E.key, {
              key: 0,
              value: t.value[E.key],
              item: t.value,
              column: E,
              i: r.i
            }) : t.value ? (u(), S(vt, {
              key: 1,
              modelValue: t.value,
              "onUpdate:modelValue": m[1] || (m[1] = (F) => t.value = F),
              column: E,
              columns: r.visibleColumns,
              "edit-mode-enabled": r.editModeEnabled,
              "has-inline-edit-perm": r.hasInlineEditPerm,
              i: r.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : c("", !0)
          ], 10, vl)) : c("", !0)
        ], 64))), 256)),
        r.canDrop && r.editModeEnabled ? (u(), p("td", fl, [
          pe(ol, {
            config: r.dropButton,
            onClick: V
          }, null, 8, ["config"])
        ])) : c("", !0),
        r.canEdit && r.editModeEnabled ? (u(), p("td", cl, [
          pe(nl, {
            config: r.editButton,
            onClick: W
          }, null, 8, ["config"])
        ])) : c("", !0)
      ], 10, ul);
    };
  }
}), bl = { "data-role": "hidden-row" }, gl = ["colspan"], kl = ["data-column"], hl = ["data-i"], Cl = ["data-column", "title"], Bl = /* @__PURE__ */ te({
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
  setup(o, { emit: v }) {
    const y = v, n = o, l = h(n.modelValue), t = (f) => y("click", f);
    return A(() => n.modelValue, (f) => l.value = f), A(l, () => y("update:modelValue", l.value)), (f, D) => be((u(), p("tr", bl, [
      U("td", { colspan: f.hiddenColumnsColSpan }, [
        U("table", null, [
          U("tr", null, [
            (u(!0), p(P, null, J(f.hiddenColumns, (k) => (u(), p("th", {
              "data-column": k.key
            }, [
              U("div", null, ue(k.label), 1)
            ], 8, kl))), 256))
          ]),
          U("tr", { "data-i": f.i }, [
            (u(!0), p(P, null, J(f.hiddenColumns, (k, i) => (u(), p("td", {
              "data-column": k.key,
              title: b(me)(k, l.value, i, f.hiddenColumns),
              onClick: D[1] || (D[1] = (a) => t(a))
            }, [
              f.$slots[k.key] ? T(f.$slots, k.key, {
                key: 0,
                value: l.value[k.key],
                item: l.value,
                column: k,
                i
              }) : (u(), S(vt, {
                key: 1,
                column: k,
                columns: f.hiddenColumns,
                modelValue: l.value,
                "onUpdate:modelValue": D[0] || (D[0] = (a) => l.value = a),
                i,
                "edit-mode-enabled": f.editModeEnabled,
                "has-inline-edit-perm": f.hasInlineEditPerm
              }, null, 8, ["column", "columns", "modelValue", "i", "edit-mode-enabled", "has-inline-edit-perm"]))
            ], 8, Cl))), 256))
          ], 8, hl)
        ])
      ], 8, gl)
    ], 512)), [
      [ge, f.hiddenIsVisible]
    ]);
  }
}), ut = /* @__PURE__ */ te({
  __name: "CreateButton",
  props: {
    config: { default: void 0 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["click", "append"],
  setup(o, { emit: v }) {
    var i;
    const y = v, n = o, l = s(() => $.createButtonSlot !== ""), t = s(() => $.createButtonSlot), f = {
      ...(i = n.config) == null ? void 0 : i.modalData,
      beforeClose: (a) => {
        "itemCreated" in a && a.itemCreated === !0 && y("append", a.item);
      }
    }, D = {
      ...n.config
    };
    D.modalData = f;
    const k = () => {
      var a;
      if (!((a = n.config) != null && a.modal)) {
        y("click");
        return;
      }
    };
    return (a, N) => {
      const j = z("lkt-button");
      return u(), S(j, Q(D, {
        disabled: a.disabled,
        onClick: k
      }), {
        default: L(() => [
          l.value ? (u(), S(Z(t.value), { key: 0 })) : c("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), Sl = ["data-column", "data-sortable", "data-sort", "colspan", "title"], Dl = /* @__PURE__ */ te({
  __name: "TableHeader",
  props: {
    column: { default: () => new st() },
    sortBy: { default: "" },
    sortDirection: { default: "" },
    amountOfColumns: { default: 0 },
    items: { default: () => [] }
  },
  emits: ["click"],
  setup(o, { emit: v }) {
    const y = v, n = o, l = s(() => xt(n.column, n.amountOfColumns, n.items)), t = s(() => n.column.sortable === !0), f = s(() => t.value && n.sortBy === n.column.key ? n.sortDirection : ""), D = s(() => dt(n.column.label)), k = s(() => t.value && n.sortBy === n.column.key ? n.sortDirection === ne.Asc ? ke.defaultTableSortAscIcon : n.sortDirection === ne.Desc ? ke.defaultTableSortDescIcon : "" : ""), i = () => y("click", n.column);
    return (a, N) => (u(), p("th", {
      "data-column": a.column.key,
      "data-sortable": t.value,
      "data-sort": f.value,
      colspan: l.value,
      title: D.value,
      class: K(b(mt)(a.column)),
      onClick: i
    }, [
      U("div", null, [
        ee(ue(D.value) + " ", 1),
        k.value ? (u(), p("i", {
          key: 0,
          class: K(k.value)
        }, null, 2)) : c("", !0)
      ])
    ], 10, Sl));
  }
}), Il = ["id"], Vl = {
  key: 0,
  class: "lkt-table-page-buttons"
}, wl = { class: "switch-edition-mode" }, El = {
  key: 1,
  class: "lkt-table-page-buttons"
}, Tl = {
  key: 2,
  class: "lkt-table-page-filters"
}, $l = { class: "lkt-table" }, Ml = { key: 0 }, Rl = {
  key: 0,
  "data-role": "drag-indicator"
}, Ll = { key: 1 }, Pl = { key: 2 }, Nl = {
  key: 3,
  class: "lkt-table-col-drop"
}, Fl = {
  key: 4,
  class: "lkt-table-col-edit"
}, Al = ["id"], Ol = ["id"], Ul = ["data-i"], jl = ["data-i"], Hl = {
  key: 3,
  class: "lkt-table-empty"
}, _l = {
  key: 5,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, ql = /* @__PURE__ */ te({
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
  setup(o, { expose: v, emit: y }) {
    var ot;
    const n = y, l = it(), t = o, f = {}, D = h(typeof t.sorter == "function" ? t.sorter : Zt), k = h(ll(t.columns)), i = h(ne.Asc), a = h(t.modelValue), N = h(f), j = h(null), w = h(t.columns), _ = h((ot = t.paginator) == null ? void 0 : ot.modelValue), I = h(t.loading), le = h(!1), V = h(t.perms), W = h(null), ve = h(null), Ie = h(null), x = h({}), r = h(new Xt({ items: a.value }, t.dataStateConfig)), m = h(t.editMode), H = h(0), E = h(null), F = h(Pe(t.saveButton, ke.defaultSaveButton)), Ae = h(Pe(t.createButton, ke.defaultCreateButton)), ft = h(Pe(t.editModeButton, ke.defaultEditModeButton)), re = h(!1);
    A(I, (e) => n("update:loading", e)), A(_, (e) => n("page", e));
    const ct = (e) => {
      V.value = e;
    }, yt = (e) => {
      var d;
      Array.isArray(e.data) && ((!t.paginator || ![De.LoadMore, De.Infinite].includes((d = t.paginator) == null ? void 0 : d.type)) && a.value.splice(0, a.value.length), a.value = [...a.value, ...e.data]), I.value = !1, le.value = !0, r.value.store({ items: a.value }).turnStoredIntoOriginal(), re.value = !1, Be(() => {
        H.value = ae(), Ee.value, n("read-response", e);
      });
    }, bt = () => Be(() => I.value = !0), gt = () => {
      W.value.doRefresh();
    }, fe = Qt(12), Ve = s(() => {
      if (!t.hideEmptyColumns) return [];
      let e = [];
      return w.value.forEach((d) => {
        let C = d.key, M = !1;
        a.value.forEach((O) => {
          if (typeof O.checkEmpty == "function")
            return O.checkEmpty(O);
          O[C] && (M = !0);
        }), M || e.push(C);
      }), e;
    }), he = s(() => w.value.filter((e) => !e.hidden)), we = s(() => w.value.filter((e) => e.hidden)), kt = s(() => {
      let e = he.value.length + 1;
      return t.sortable && ++e, e;
    }), ht = s(() => w.value.filter((e) => e.isForRowKey)), Oe = s(() => we.value.length > 0 && !t.sortable), Ct = s(() => w.value.map((e) => e.key)), Ue = s(() => {
      let e = [];
      for (let d in l) Ct.value.indexOf(d) !== -1 && e.push(d);
      return e;
    }), je = s(() => {
      var e;
      return t.hiddenSave || I.value || !((e = F.value) != null && e.resource || F.value.type) ? !1 : m.value && re.value ? !0 : m.value;
    }), Bt = s(() => Ce.value && a.value.length >= t.requiredItemsForTopCreate || ze.value ? !0 : je.value || m.value && ce.value), Ee = s(() => {
      var e, d;
      return H.value, typeof ((e = F.value) == null ? void 0 : e.disabled) == "function" ? F.value.disabled({
        value: a.value,
        dataState: r.value
      }) : typeof ((d = F.value) == null ? void 0 : d.disabled) == "boolean" ? F.value.disabled : !re.value;
    }), St = s(() => a.value.length), Dt = s(() => {
      var e;
      return {
        items: a.value,
        ...(e = F.value) == null ? void 0 : e.resourceData
      };
    }), It = s(() => t.titleTag === "" ? "h2" : t.titleTag), Vt = s(() => t.wrapContentTag === "" ? "div" : t.wrapContentTag), Te = s(() => dt(t.title)), $e = s(() => {
      var e;
      return (e = t.drag) == null ? void 0 : e.enabled;
    }), ce = s(() => V.value.includes(X.Create)), He = s(() => V.value.includes("read")), ie = s(() => V.value.includes(X.Update)), _e = s(() => V.value.includes(X.Edit)), qe = s(() => V.value.includes(X.InlineEdit)), wt = s(() => V.value.includes(X.ModalCreate)), Et = s(() => V.value.includes(X.InlineCreate)), Ke = s(() => V.value.includes(X.InlineCreateEver)), se = s(() => V.value.includes(X.Drop)), Tt = s(() => V.value.includes(X.SwitchEditMode)), ze = s(() => !Tt.value || !ie.value && !se.value || !ie.value && se.value ? !1 : !I.value), $t = s(() => {
      var e;
      return (typeof ((e = t.paginator) == null ? void 0 : e.type) < "u" && [De.LoadMore, De.Infinite].includes(t.paginator.type) || !I.value) && a.value.length > 0;
    }), Mt = (e) => {
      let d = e.target;
      if (typeof d.dataset.column > "u")
        do
          d = d.parentNode;
        while (typeof d.dataset.column > "u" && d.tagName !== "TABLE" && d.tagName !== "body");
      if (d.tagName === "TD" && (d = d.parentNode, d = d.dataset.i, typeof d < "u"))
        return a.value[d];
    }, Rt = (e) => a.value[e], Lt = (e) => {
      var d;
      return (d = j.value) == null ? void 0 : d.querySelector(`[data-i="${e}"]`);
    }, We = (e) => N.value["tr_" + e] === !0, Ge = (e) => {
      e && e.sortable && (a.value = a.value.sort((d, C) => D.value(d, C, e, i.value)), i.value = i.value === ne.Asc ? ne.Desc : ne.Asc, k.value = e.key, H.value = ae(), n("sort", [k.value, i.value]));
    }, Je = (e) => {
      n("click", e);
    }, Qe = (e, d) => {
      let C = "tr_" + d;
      N.value[C] = typeof N.value[C] > "u" ? !0 : !N.value[C];
    }, Pt = (e) => {
      var C, M, O, q, B, g, R, G;
      let d = parseInt((q = (O = (M = (C = e == null ? void 0 : e.originalEvent) == null ? void 0 : C.toElement) == null ? void 0 : M.closest("tr")) == null ? void 0 : O.dataset) == null ? void 0 : q.i);
      return !(typeof ((B = t.drag) == null ? void 0 : B.isValid) == "function" && !((g = t.drag) != null && g.isValid(a.value[d])) || typeof ((R = t.drag) == null ? void 0 : R.isValid) == "boolean" && !((G = t.drag) != null && G.isValid));
    }, Xe = (e) => {
      var d, C;
      return typeof ((d = t.drag) == null ? void 0 : d.isDraggable) == "function" ? (C = t.drag) == null ? void 0 : C.isDraggable(e) : !0;
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
            a.value.push(e);
            return;
          }
        }
        a.value.push({});
      }
    }, Ze = (e) => {
      a.value.push(e);
    }, xe = () => I.value = !0, et = () => I.value = !1, Nt = (e, d) => {
      var C, M, O;
      if (!((C = F.value) != null && C.type && [
        Ne.Split,
        Ne.SplitEver,
        Ne.SplitLazy
      ].includes((M = F.value) == null ? void 0 : M.type))) {
        if (n("before-save"), (O = F.value) != null && O.resource && (I.value = !1, !d.success)) {
          n("error", d.httpStatus);
          return;
        }
        r.value.turnStoredIntoOriginal(), re.value = !1, n("save", d);
      }
    }, tt = (e, d, C) => {
      if (C >= e.length) {
        let M = C - e.length + 1;
        for (; M--; ) e.push(void 0);
      }
      return e.splice(C, 0, e.splice(d, 1)[0]), e;
    }, Ft = (e) => {
      tt(a.value, e, e - 1), H.value = ae();
    }, At = (e) => {
      tt(a.value, e, e + 1), H.value = ae();
    }, Me = (e) => {
      a.value.splice(e, 1), H.value = ae();
    }, Ot = () => {
      var e;
      x.value && typeof ((e = x.value) == null ? void 0 : e.destroy) == "function" && (x.value.destroy(), x.value = {});
    }, lt = () => {
      E.value || (E.value = document.getElementById("lkt-table-body-" + fe)), x.value = new Yt(E.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let d = e.oldIndex, C = e.newIndex;
          a.value.splice(C, 0, a.value.splice(d, 1)[0]), H.value = ae(), n("drag-end", a.value[C]);
        },
        onMove: function(e, d) {
          return Pt(e);
        }
      });
    }, Re = (e, d, C = !1) => {
      let M = [H.value, fe, "row", d];
      return C && M.push("hidden"), ht.value.forEach((O) => {
        let q = String(e[O.key]).toLowerCase();
        q.length > 50 && (q = q.substring(0, 50)), q = pt(q, " ", "-"), M.push(q);
      }), M.join("-");
    }, at = s(() => typeof t.createEnabledValidator == "function" ? t.createEnabledValidator({ items: a.value }) : !0), Ce = s(() => Ke.value || ce.value && m.value || Et.value && m.value || wt.value && m.value), Ut = s(() => [ye.Ol, ye.Ul].includes(t.type)), Le = (e, d) => typeof t.itemDisplayChecker == "function" ? t.itemDisplayChecker(e) : !0;
    zt(() => {
      var e;
      t.initialSorting && Ge(al(t.columns, k.value)), r.value.store({ items: a.value }).turnStoredIntoOriginal(), re.value = !1, (e = t.drag) != null && e.enabled && Be(() => {
        lt();
      });
    }), A(() => {
      var e;
      return (e = t.drag) == null ? void 0 : e.enabled;
    }, (e) => {
      e ? lt() : Ot();
    }), A(() => t.perms, (e) => V.value = e), A(V, (e) => n("update:perms", e)), A(() => t.editMode, (e) => m.value = e), A(() => t.columns, (e) => w.value = e, { deep: !0 }), A(() => t.modelValue, (e) => a.value = e, { deep: !0 }), A(a, (e) => {
      r.value.increment({ items: e }), re.value = r.value.changed(), n("update:modelValue", e);
    }, { deep: !0 }), v({
      getItemByEvent: Mt,
      getItemByIndex: Rt,
      getRowByIndex: Lt,
      doRefresh: gt,
      getHtml: () => ve.value,
      turnStoredIntoOriginal: () => {
        r.value.turnStoredIntoOriginal(), Be(() => {
          H.value = ae();
        });
      }
    });
    const jt = s(() => typeof $.defaultEmptySlot < "u"), Ht = s(() => $.defaultEmptySlot), _t = s(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled ? !1 : typeof t.drag.canRender > "u" ? !0 : t.drag.canRender), qt = s(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled || typeof t.drag.isDisabled > "u" ? !1 : t.drag.isDisabled);
    return (e, d) => {
      const C = z("lkt-button"), M = z("lkt-field"), O = z("lkt-loader"), q = z("lkt-paginator");
      return u(), p("section", {
        ref_key: "element",
        ref: ve,
        class: "lkt-table-page",
        id: "lkt-table-page-" + b(fe)
      }, [
        Te.value || b(l).title ? (u(), p("header", {
          key: 0,
          class: K(e.headerClass)
        }, [
          Te.value ? (u(), S(Z(It.value), { key: 0 }, {
            default: L(() => [
              e.titleIcon ? (u(), p("i", {
                key: 0,
                class: K(e.titleIcon)
              }, null, 2)) : c("", !0),
              ee(" " + ue(Te.value), 1)
            ]),
            _: 1
          })) : c("", !0),
          b(l).title ? T(e.$slots, "title", { key: 1 }) : c("", !0)
        ], 2)) : c("", !0),
        (u(), S(Z(Vt.value), {
          class: K(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: L(() => [
            Bt.value ? (u(), p("div", Vl, [
              be(pe(C, Q({
                class: "lkt-table--save-button",
                ref_key: "saveButtonRef",
                ref: Ie
              }, F.value, {
                disabled: Ee.value,
                "modal-data": Dt.value,
                onLoading: xe,
                onLoaded: et,
                onClick: Nt
              }), {
                split: L(({ doClose: B, doRootClick: g }) => [
                  T(e.$slots, "button-save-split", {
                    doClose: B,
                    doRootClick: g,
                    dataState: r.value,
                    onButtonLoading: xe,
                    onButtonLoaded: et
                  })
                ]),
                default: L(() => [
                  b(l)["button-save"] ? T(e.$slots, "button-save", {
                    key: 0,
                    items: a.value,
                    editMode: e.editMode,
                    canUpdate: !Ee.value
                  }) : c("", !0)
                ]),
                _: 3
              }, 16, ["disabled", "modal-data"]), [
                [ge, je.value]
              ]),
              Ce.value && a.value.length >= e.requiredItemsForTopCreate ? (u(), S(ut, {
                key: 0,
                config: Ae.value,
                disabled: !at.value,
                onClick: Ye,
                onAppend: Ze
              }, null, 8, ["config", "disabled"])) : c("", !0),
              U("div", wl, [
                be(pe(M, Q(ft.value, {
                  modelValue: m.value,
                  "onUpdate:modelValue": d[0] || (d[0] = (B) => m.value = B)
                }), null, 16, ["modelValue"]), [
                  [ge, ze.value]
                ])
              ])
            ])) : c("", !0),
            b(l).buttons ? (u(), p("div", El, [
              T(e.$slots, "buttons")
            ])) : c("", !0),
            le.value && b(l).filters ? (u(), p("div", Tl, [
              T(e.$slots, "filters", {
                items: a.value,
                isLoading: I.value
              })
            ])) : c("", !0),
            be(U("div", $l, [
              e.type === b(ye).Table ? (u(), p("table", Ml, [
                U("thead", null, [
                  U("tr", null, [
                    $e.value && m.value ? (u(), p("th", Rl)) : c("", !0),
                    e.addNavigation && m.value ? (u(), p("th", Ll)) : c("", !0),
                    Oe.value ? (u(), p("th", Pl)) : c("", !0),
                    (u(!0), p(P, null, J(he.value, (B) => (u(), p(P, null, [
                      Ve.value.indexOf(B.key) === -1 ? (u(), S(Dl, {
                        key: 0,
                        column: B,
                        "sort-by": k.value,
                        "sort-direction": i.value,
                        "amount-of-columns": e.columns.length,
                        items: a.value,
                        onClick: (g) => Ge(B)
                      }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : c("", !0)
                    ], 64))), 256)),
                    se.value && m.value ? (u(), p("th", Nl)) : c("", !0),
                    _e.value && ie.value && m.value ? (u(), p("th", Fl)) : c("", !0)
                  ])
                ]),
                U("tbody", {
                  ref_key: "tableBody",
                  ref: j,
                  id: "lkt-table-body-" + b(fe)
                }, [
                  (u(!0), p(P, null, J(a.value, (B, g) => be((u(), S(yl, {
                    modelValue: a.value[g],
                    "onUpdate:modelValue": (R) => a.value[g] = R,
                    key: Re(B, g),
                    i: g,
                    "drop-button": e.dropButton,
                    "edit-button": e.editButton,
                    "display-hidden-columns-indicator": Oe.value,
                    "is-draggable": Xe(B),
                    sortable: $e.value,
                    "visible-columns": he.value,
                    "empty-columns": Ve.value,
                    "add-navigation": e.addNavigation,
                    "hidden-is-visible": We(g),
                    "latest-row": g + 1 === St.value,
                    "can-drop": se.value && m.value,
                    "can-edit": _e.value && ie.value && m.value,
                    "edit-mode-enabled": m.value,
                    "has-inline-edit-perm": qe.value,
                    "row-display-type": e.rowDisplayType,
                    "render-drag": _t.value,
                    "disabled-drag": qt.value,
                    onClick: Je,
                    onShow: Qe,
                    onItemUp: Ft,
                    onItemDown: At,
                    onItemDrop: Me
                  }, nt({ _: 2 }, [
                    b(l)[`item-${g}`] ? {
                      name: `item-${g}`,
                      fn: L((R) => [
                        T(e.$slots, `item-${g}`, oe({
                          [e.slotItemVar || ""]: R.item,
                          index: g
                        }))
                      ]),
                      key: "0"
                    } : b(l).item ? {
                      name: "item",
                      fn: L((R) => [
                        T(e.$slots, "item", oe({
                          [e.slotItemVar || ""]: R.item,
                          index: g
                        }))
                      ]),
                      key: "1"
                    } : void 0,
                    J(Ue.value, (R) => ({
                      name: R,
                      fn: L((G) => [
                        T(e.$slots, R, oe({
                          [e.slotItemVar || ""]: G.item,
                          value: G.value,
                          column: G.column
                        }))
                      ])
                    }))
                  ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "drop-button", "edit-button", "display-hidden-columns-indicator", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "hidden-is-visible", "latest-row", "can-drop", "can-edit", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag"])), [
                    [ge, Le(a.value[g])]
                  ])), 128)),
                  we.value.length > 0 ? (u(!0), p(P, { key: 0 }, J(a.value, (B, g) => (u(), S(Bl, {
                    modelValue: a.value[g],
                    "onUpdate:modelValue": (R) => a.value[g] = R,
                    key: Re(B, g, !0),
                    i: g,
                    "hidden-columns": we.value,
                    "hidden-columns-col-span": kt.value,
                    "is-draggable": Xe(B),
                    sortable: $e.value,
                    "visible-columns": he.value,
                    "empty-columns": Ve.value,
                    "hidden-is-visible": We(g),
                    "edit-mode-enabled": m.value,
                    "has-inline-edit-perm": qe.value,
                    onClick: Je,
                    onShow: Qe
                  }, nt({ _: 2 }, [
                    J(Ue.value, (R) => ({
                      name: R,
                      fn: L((G) => [
                        T(e.$slots, R, oe({
                          [e.slotItemVar || ""]: G.item,
                          value: G.value,
                          column: G.column
                        }))
                      ])
                    }))
                  ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "hidden-columns", "hidden-columns-col-span", "is-draggable", "sortable", "visible-columns", "empty-columns", "hidden-is-visible", "edit-mode-enabled", "has-inline-edit-perm"]))), 128)) : c("", !0)
                ], 8, Al)
              ])) : e.type === b(ye).Item ? (u(), p("div", {
                key: 1,
                ref_key: "tableBody",
                ref: j,
                id: "lkt-table-body-" + b(fe),
                class: K(["lkt-table-items-container", e.itemsContainerClass])
              }, [
                (u(!0), p(P, null, J(a.value, (B, g) => (u(), p(P, null, [
                  Le(B) ? (u(), p("div", {
                    class: "lkt-table-item",
                    "data-i": g,
                    key: Re(B, g)
                  }, [
                    T(e.$slots, "item", oe({
                      [e.slotItemVar || ""]: B,
                      index: g,
                      editing: m.value,
                      canCreate: ce.value,
                      canRead: He.value,
                      canUpdate: ie.value,
                      canDrop: se.value,
                      isLoading: I.value,
                      doDrop: () => Me(g)
                    }))
                  ], 8, Ul)) : c("", !0)
                ], 64))), 256))
              ], 10, Ol)) : Ut.value ? (u(), S(Z(e.type), {
                key: 2,
                class: K(["lkt-table-items-container", e.itemsContainerClass])
              }, {
                default: L(() => [
                  (u(!0), p(P, null, J(a.value, (B, g) => (u(), p(P, null, [
                    Le(B) ? (u(), p("li", {
                      key: 0,
                      class: "lkt-table-item",
                      "data-i": g
                    }, [
                      T(e.$slots, "item", oe({
                        [e.slotItemVar || ""]: B,
                        index: g,
                        editing: m.value,
                        canCreate: ce.value,
                        canRead: He.value,
                        canUpdate: ie.value,
                        canDrop: se.value,
                        isLoading: I.value,
                        doDrop: () => Me(g)
                      }))
                    ], 8, jl)) : c("", !0)
                  ], 64))), 256))
                ]),
                _: 3
              }, 8, ["class"])) : c("", !0)
            ], 512), [
              [ge, $t.value]
            ]),
            !I.value && a.value.length === 0 ? (u(), p("div", Hl, [
              b(l).empty ? T(e.$slots, "empty", { key: 0 }) : jt.value ? (u(), S(Z(Ht.value), {
                key: 1,
                message: e.noResultsText
              }, null, 8, ["message"])) : e.noResultsText ? (u(), p(P, { key: 2 }, [
                ee(ue(e.noResultsText), 1)
              ], 64)) : c("", !0)
            ])) : c("", !0),
            I.value ? (u(), S(O, { key: 4 })) : c("", !0),
            Ce.value || b(l).bottomButtons ? (u(), p("div", _l, [
              Ce.value && a.value.length >= e.requiredItemsForBottomCreate ? (u(), S(ut, {
                key: 0,
                config: Ae.value,
                disabled: !at.value,
                onClick: Ye,
                onAppend: Ze
              }, null, 8, ["config", "disabled"])) : c("", !0),
              T(e.$slots, "bottom-buttons")
            ])) : c("", !0),
            e.paginator && Object.keys(e.paginator).length > 0 ? (u(), S(q, Q({
              key: 6,
              ref_key: "paginatorRef",
              ref: W
            }, e.paginator, {
              modelValue: _.value,
              "onUpdate:modelValue": d[1] || (d[1] = (B) => _.value = B),
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
