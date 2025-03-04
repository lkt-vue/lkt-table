import { defineComponent as te, ref as h, watch as F, computed as i, resolveComponent as z, createBlock as S, createElementBlock as p, unref as y, openBlock as u, normalizeProps as oe, mergeProps as Q, withCtx as L, createTextVNode as ee, toDisplayString as ue, Fragment as P, withModifiers as rt, createCommentVNode as f, resolveDynamicComponent as Z, useSlots as it, normalizeClass as K, createElementVNode as O, createVNode as pe, renderSlot as T, renderList as J, withDirectives as ge, vShow as ke, mergeDefaults as Wt, onMounted as Gt, nextTick as Be, createSlots as nt } from "vue";
import { __ as Jt } from "lkt-i18n";
import { SortDirection as ne, Column as st, ColumnType as Se, prepareResourceData as dt, TableRowType as de, extractI18nValue as pt, LktSettings as me, ensureButtonConfig as De, TablePermission as X, PaginatorType as Ie, TableType as be, getDefaultValues as Qt, Table as Xt, ButtonType as Ne } from "lkt-vue-kernel";
import { Column as ra, createColumn as ia } from "lkt-vue-kernel";
import { replaceAll as mt, generateRandomString as Yt } from "lkt-string-tools";
import { DataState as Zt } from "lkt-data-state";
import xt from "sortablejs";
import { time as ae } from "lkt-date-tools";
const el = (o, v, c, l) => {
  if (!c) return 0;
  let n = String(o[c.key]).toLowerCase(), t = String(v[c.key]).toLowerCase();
  if (l === ne.Asc) {
    if (n > t) return 1;
    if (t > n) return -1;
  } else {
    if (n > t) return -1;
    if (t > n) return 1;
  }
  return 0;
}, ve = (o, v, c, l = []) => {
  if (o.extractTitleFromColumn) {
    let n = l.find((t) => t.key === o.extractTitleFromColumn);
    if (n)
      return ve(n, v, c, l);
  }
  if (o.formatter && typeof o.formatter == "function") {
    let n = o.formatter(v[o.key], v, o, c);
    return n.startsWith("__:") ? Jt(n.substring(3)) : n;
  }
  return v[o.key];
}, tl = (o, v, c) => {
  if (!o.colspan) return -1;
  let l = v;
  return c.forEach((n) => {
    let t = Fe(o, n);
    t > 0 && t < l && (l = t);
  }), l;
}, Fe = (o, v) => o.colspan === !1 ? !1 : typeof o.colspan == "function" ? o.colspan(v) : o.colspan, ll = (o, v) => typeof o.preferSlot > "u" ? !0 : o.preferSlot === !1 ? !1 : typeof o.preferSlot == "function" ? o.preferSlot(v) : !0, al = (o, v, c) => {
  if (typeof o != "object" || !o.key || v.indexOf(o.key) > -1) return !1;
  let l = Fe(o, c);
  return typeof o.colspan > "u" ? !0 : (typeof o.colspan < "u" && (typeof o.colspan == "function" ? l = parseInt(o.colspan(c)) : l = parseInt(o.colspan)), l > 0);
}, ol = (o = []) => {
  if (o.length > 0) {
    for (let v = 0; v < o.length; ++v)
      if (o[v].sortable) return o[v].key;
  }
  return "";
}, nl = (o, v) => {
  if (o.length > 0) {
    for (let c = 0; c < o.length; ++c)
      if (o[c].key === v) return o[c];
  }
  return null;
}, vt = (o) => o.type ? `is-${o.type}` : "", ft = /* @__PURE__ */ te({
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
    const c = v, l = o, n = h(l.modelValue), t = h(n.value[l.column.key]), b = h(null);
    F(t, (s) => {
      const a = JSON.parse(JSON.stringify(n.value));
      a[l.column.key] = s, c("update:modelValue", a);
    }), F(() => l.modelValue, (s) => {
      n.value = s, t.value = n.value[l.column.key];
    });
    const D = i(() => ({ ...l.column.slotData, item: n.value })), k = i(() => {
      var s, a, U, _;
      if ((s = l.column.field) != null && s.modalData && typeof ((a = l.column.field) == null ? void 0 : a.modalData) == "object")
        for (let w in l.column.field.modalData)
          if (typeof ((U = l.column.field) == null ? void 0 : U.modalData[w]) == "string" && l.column.field.modalData[w].startsWith("prop:")) {
            let H = l.column.field.modalData[w].substring(5);
            n.value[H];
          } else
            l.column.field.modalData[w];
      return (_ = l.column.field) == null ? void 0 : _.modalData;
    });
    return (s, a) => {
      var H, I, le, V;
      const U = z("lkt-anchor"), _ = z("lkt-button"), w = z("lkt-field");
      return s.column.type === y(Se).Anchor ? (u(), S(U, oe(Q({ key: 0 }, s.column.anchor)), {
        default: L(() => [
          ee(ue(y(ve)(s.column, n.value, s.i)), 1)
        ]),
        _: 1
      }, 16)) : s.column.type === y(Se).Button ? (u(), S(_, Q({ key: 1 }, s.column.button, { prop: n.value }), {
        default: L(() => [
          ee(ue(y(ve)(s.column, n.value, s.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : s.column.type === y(Se).Field && s.hasInlineEditPerm ? (u(), S(w, Q({ key: 2 }, s.column.field, {
        "read-mode": !s.column.editable || !s.editModeEnabled,
        ref: (W) => b.value = W,
        "slot-data": D.value,
        label: ((H = s.column.field) == null ? void 0 : H.type) === "switch" || ((I = s.column.field) == null ? void 0 : I.type) === "check" ? s.column.label : "",
        "modal-data": k.value,
        prop: n.value,
        modelValue: t.value,
        "onUpdate:modelValue": a[0] || (a[0] = (W) => t.value = W)
      }), null, 16, ["read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : s.column.type === y(Se).Field ? (u(), S(w, Q({ key: 3 }, s.column.field, {
        "read-mode": "",
        ref: (W) => b.value = W,
        "slot-data": D.value,
        label: ((le = s.column.field) == null ? void 0 : le.type) === "switch" || ((V = s.column.field) == null ? void 0 : V.type) === "check" ? s.column.label : "",
        "modal-data": k.value,
        prop: n.value,
        "model-value": t.value
      }), null, 16, ["slot-data", "label", "modal-data", "prop", "model-value"])) : (u(), p(P, { key: 4 }, [
        ee(ue(y(ve)(s.column, n.value, s.i, s.columns)), 1)
      ], 64));
    };
  }
}), Y = class Y {
};
Y.navButtonSlot = "", Y.dropButtonSlot = "", Y.editButtonSlot = "", Y.createButtonSlot = "", Y.defaultEmptySlot = void 0, Y.defaultSaveIcon = "", Y.defaultNoResultsMessage = "No results";
let $ = Y;
const ul = /* @__PURE__ */ te({
  __name: "DropButtonComponent",
  props: {
    config: {},
    item: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(o, { emit: v }) {
    const c = v, l = o, n = i(() => $.dropButtonSlot !== ""), t = i(() => $.dropButtonSlot), b = i(() => dt(l.config.resourceData, l.item));
    return (D, k) => {
      const s = z("lkt-button");
      return u(), S(s, Q({ palette: "table-delete" }, l.config, {
        disabled: D.disabled,
        "resource-data": b.value,
        onClick: k[0] || (k[0] = rt((a) => c("click", a), ["prevent", "stop"]))
      }), {
        default: L(() => [
          n.value ? (u(), S(Z(t.value), { key: 0 })) : f("", !0)
        ]),
        _: 1
      }, 16, ["disabled", "resource-data"]);
    };
  }
}), rl = /* @__PURE__ */ te({
  __name: "EditButtonComponent",
  props: {
    config: {},
    item: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(o, { emit: v }) {
    const c = v, l = o, n = i(() => $.editButtonSlot !== ""), t = i(() => $.editButtonSlot), b = i(() => dt(l.config.resourceData, l.item));
    return (D, k) => {
      const s = z("lkt-button");
      return u(), S(s, Q({ palette: "table-edit" }, l.config, {
        disabled: D.disabled,
        "resource-data": b.value,
        onClick: k[0] || (k[0] = rt((a) => c("click"), ["prevent", "stop"]))
      }), {
        default: L(() => [
          n.value ? (u(), S(Z(t.value), { key: 0 })) : f("", !0)
        ]),
        _: 1
      }, 16, ["disabled", "resource-data"]);
    };
  }
}), il = ["data-i", "data-draggable"], sl = ["data-i"], dl = {
  key: 1,
  "data-role": "invalid-drag-indicator"
}, pl = {
  key: 2,
  class: "lkt-table-nav-cell"
}, ml = { class: "lkt-table-nav-container" }, vl = ["colspan"], fl = ["colspan"], cl = ["data-column", "colspan", "title"], yl = {
  key: 7,
  class: "lkt-table-col-drop"
}, bl = {
  key: 8,
  class: "lkt-table-col-edit"
}, gl = /* @__PURE__ */ te({
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
    const c = it(), l = v, n = o, t = h(n.modelValue);
    let b = typeof n.rowDisplayType == "function" ? n.rowDisplayType(t.value, n.i) : n.rowDisplayType;
    b || (b = de.Auto);
    const D = [de.Auto, de.PreferCustomItem].includes(b), k = [de.Auto, de.PreferItem].includes(b), s = h((x = n.editButton.anchor) == null ? void 0 : x.to);
    for (let r in t.value) s.value = mt(s.value, ":" + r, t.value[r]);
    const a = (r) => l("click", r), U = (r, m) => {
      l("show", r, m);
    }, _ = i(() => {
      let r = [], m = !1;
      return typeof n.disabledDrag == "function" ? m = n.disabledDrag(t.value) : m = Ve.value === !0, !m && n.sortable && n.isDraggable ? r.push("handle") : m && r.push("disabled"), r.join(" ");
    }), w = i(() => $.navButtonSlot !== ""), H = i(() => $.navButtonSlot), I = () => {
      l("item-up", n.i);
    }, le = () => {
      l("item-down", n.i);
    }, V = () => {
      l("item-drop", n.i);
    }, W = () => {
    };
    F(() => n.modelValue, (r) => t.value = r), F(t, (r) => {
      l("update:modelValue", r);
    }, { deep: !0 });
    const fe = i(() => typeof n.renderDrag == "function" ? n.renderDrag(t.value) : n.renderDrag === !0), Ve = i(() => typeof n.disabledDrag == "function" ? n.disabledDrag(t.value) : n.disabledDrag === !0);
    return (r, m) => {
      const j = z("lkt-button");
      return u(), p("tr", {
        "data-i": r.i,
        "data-draggable": r.isDraggable,
        class: K({ "type-custom-item": y(D), "type-item": y(k) })
      }, [
        r.sortable && r.isDraggable && r.editModeEnabled && fe.value ? (u(), p("td", {
          key: 0,
          "data-role": "drag-indicator",
          class: K(_.value),
          "data-i": r.i
        }, null, 10, sl)) : r.sortable && r.editModeEnabled && fe.value ? (u(), p("td", dl)) : f("", !0),
        r.addNavigation && r.editModeEnabled ? (u(), p("td", pl, [
          O("div", ml, [
            pe(j, {
              palette: "table-nav",
              disabled: r.i === 0,
              onClick: I
            }, {
              default: L(() => [
                w.value ? (u(), S(Z(H.value), {
                  key: 0,
                  direction: "up"
                })) : (u(), p(P, { key: 1 }, [
                  m[3] || (m[3] = O("i", { class: "" }, null, -1)),
                  m[4] || (m[4] = ee(" UP "))
                ], 64))
              ]),
              _: 1
            }, 8, ["disabled"]),
            pe(j, {
              palette: "table-nav",
              disabled: r.latestRow,
              onClick: le
            }, {
              default: L(() => [
                w.value ? (u(), S(Z(H.value), {
                  key: 0,
                  direction: "down"
                })) : (u(), p(P, { key: 1 }, [
                  m[5] || (m[5] = O("i", { class: "" }, null, -1)),
                  m[6] || (m[6] = ee(" DOWN "))
                ], 64))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : f("", !0),
        r.displayHiddenColumnsIndicator ? (u(), p("td", {
          key: 3,
          onClick: m[0] || (m[0] = (E) => U(E, r.i)),
          "data-role": "show-more",
          class: K(r.hiddenIsVisible ? "state-open" : "")
        }, null, 2)) : f("", !0),
        y(D) && y(c)[`item-${r.i}`] ? (u(), p("td", {
          key: "td" + r.i,
          colspan: r.visibleColumns.length
        }, [
          T(r.$slots, `item-${r.i}`, {
            item: t.value,
            index: r.i
          })
        ], 8, vl)) : y(k) && y(c).item ? (u(), p("td", {
          key: "td" + r.i,
          colspan: r.visibleColumns.length
        }, [
          T(r.$slots, "item", {
            item: t.value,
            index: r.i
          })
        ], 8, fl)) : (u(!0), p(P, { key: 6 }, J(r.visibleColumns, (E) => (u(), p(P, null, [
          y(al)(E, r.emptyColumns, t.value) ? (u(), p("td", {
            key: "td" + r.i,
            "data-column": E.key,
            colspan: y(Fe)(E, t.value),
            title: y(ve)(E, t.value, r.i, r.visibleColumns),
            class: K(y(vt)(E)),
            onClick: m[2] || (m[2] = (N) => a(N))
          }, [
            r.$slots[E.key] && y(ll)(E, t.value) ? T(r.$slots, E.key, {
              key: 0,
              value: t.value[E.key],
              item: t.value,
              column: E,
              i: r.i
            }) : t.value ? (u(), S(ft, {
              key: 1,
              modelValue: t.value,
              "onUpdate:modelValue": m[1] || (m[1] = (N) => t.value = N),
              column: E,
              columns: r.visibleColumns,
              "edit-mode-enabled": r.editModeEnabled,
              "has-inline-edit-perm": r.hasInlineEditPerm,
              i: r.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : f("", !0)
          ], 10, cl)) : f("", !0)
        ], 64))), 256)),
        r.canDrop && r.editModeEnabled ? (u(), p("td", yl, [
          pe(ul, {
            config: r.dropButton,
            item: t.value,
            onClick: V
          }, null, 8, ["config", "item"])
        ])) : f("", !0),
        r.canEdit && r.editModeEnabled ? (u(), p("td", bl, [
          pe(rl, {
            config: r.editButton,
            item: t.value,
            onClick: W
          }, null, 8, ["config", "item"])
        ])) : f("", !0)
      ], 10, il);
    };
  }
}), kl = { "data-role": "hidden-row" }, hl = ["colspan"], Cl = ["data-column"], Bl = ["data-i"], Sl = ["data-column", "title"], Dl = /* @__PURE__ */ te({
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
    const c = v, l = o, n = h(l.modelValue), t = (b) => c("click", b);
    return F(() => l.modelValue, (b) => n.value = b), F(n, () => c("update:modelValue", n.value)), (b, D) => ge((u(), p("tr", kl, [
      O("td", { colspan: b.hiddenColumnsColSpan }, [
        O("table", null, [
          O("tr", null, [
            (u(!0), p(P, null, J(b.hiddenColumns, (k) => (u(), p("th", {
              "data-column": k.key
            }, [
              O("div", null, ue(k.label), 1)
            ], 8, Cl))), 256))
          ]),
          O("tr", { "data-i": b.i }, [
            (u(!0), p(P, null, J(b.hiddenColumns, (k, s) => (u(), p("td", {
              "data-column": k.key,
              title: y(ve)(k, n.value, s, b.hiddenColumns),
              onClick: D[1] || (D[1] = (a) => t(a))
            }, [
              b.$slots[k.key] ? T(b.$slots, k.key, {
                key: 0,
                value: n.value[k.key],
                item: n.value,
                column: k,
                i: s
              }) : (u(), S(ft, {
                key: 1,
                column: k,
                columns: b.hiddenColumns,
                modelValue: n.value,
                "onUpdate:modelValue": D[0] || (D[0] = (a) => n.value = a),
                i: s,
                "edit-mode-enabled": b.editModeEnabled,
                "has-inline-edit-perm": b.hasInlineEditPerm
              }, null, 8, ["column", "columns", "modelValue", "i", "edit-mode-enabled", "has-inline-edit-perm"]))
            ], 8, Sl))), 256))
          ], 8, Bl)
        ])
      ], 8, hl)
    ], 512)), [
      [ke, b.hiddenIsVisible]
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
    var s;
    const c = v, l = o, n = i(() => $.createButtonSlot !== ""), t = i(() => $.createButtonSlot), b = {
      ...(s = l.config) == null ? void 0 : s.modalData,
      beforeClose: (a) => {
        "itemCreated" in a && a.itemCreated === !0 && c("append", a.item);
      }
    }, D = {
      ...l.config
    };
    D.modalData = b;
    const k = () => {
      var a;
      if (!((a = l.config) != null && a.modal)) {
        c("click");
        return;
      }
    };
    return (a, U) => {
      const _ = z("lkt-button");
      return u(), S(_, Q(D, {
        disabled: a.disabled,
        onClick: k
      }), {
        default: L(() => [
          n.value ? (u(), S(Z(t.value), { key: 0 })) : f("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), Il = ["data-column", "data-sortable", "data-sort", "colspan", "title"], Vl = /* @__PURE__ */ te({
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
    const c = v, l = o, n = i(() => tl(l.column, l.amountOfColumns, l.items)), t = i(() => l.column.sortable === !0), b = i(() => t.value && l.sortBy === l.column.key ? l.sortDirection : ""), D = i(() => pt(l.column.label)), k = i(() => t.value && l.sortBy === l.column.key ? l.sortDirection === ne.Asc ? me.defaultTableSortAscIcon : l.sortDirection === ne.Desc ? me.defaultTableSortDescIcon : "" : ""), s = () => c("click", l.column);
    return (a, U) => (u(), p("th", {
      "data-column": a.column.key,
      "data-sortable": t.value,
      "data-sort": b.value,
      colspan: n.value,
      title: D.value,
      class: K(y(vt)(a.column)),
      onClick: s
    }, [
      O("div", null, [
        ee(ue(D.value) + " ", 1),
        k.value ? (u(), p("i", {
          key: 0,
          class: K(k.value)
        }, null, 2)) : f("", !0)
      ])
    ], 10, Il));
  }
}), wl = ["id"], El = {
  key: 0,
  class: "lkt-table-page-buttons"
}, Tl = { class: "switch-edition-mode" }, $l = {
  key: 1,
  class: "lkt-table-page-buttons"
}, Rl = {
  key: 2,
  class: "lkt-table-page-filters"
}, Ml = { class: "lkt-table" }, Ll = { key: 0 }, Pl = {
  key: 0,
  "data-role": "drag-indicator"
}, Nl = { key: 1 }, Fl = { key: 2 }, Al = {
  key: 3,
  class: "lkt-table-col-drop"
}, Ol = {
  key: 4,
  class: "lkt-table-col-edit"
}, Ul = ["id"], _l = ["id"], jl = ["data-i"], Hl = ["data-i"], ql = {
  key: 3,
  class: "lkt-table-empty"
}, Kl = {
  key: 5,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, zl = /* @__PURE__ */ te({
  __name: "LktTable",
  props: /* @__PURE__ */ Wt({
    modelValue: {},
    type: {},
    columns: {},
    noResultsText: {},
    hideEmptyColumns: { type: Boolean },
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
    requiredItemsForTopCreate: {},
    requiredItemsForBottomCreate: {},
    addNavigation: { type: Boolean },
    newValueGenerator: { type: Function },
    wrapContentTag: {},
    wrapContentClass: {},
    itemsContainerClass: {},
    createEnabledValidator: { type: Function }
  }, Qt(Xt)),
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
  setup(o, { expose: v, emit: c }) {
    var ot;
    const l = c, n = it(), t = o, b = {}, D = h(typeof t.sorter == "function" ? t.sorter : el), k = h(ol(t.columns)), s = h(ne.Asc), a = h(t.modelValue), U = h(b), _ = h(null), w = h(t.columns), H = h((ot = t.paginator) == null ? void 0 : ot.modelValue), I = h(t.loading), le = h(!1), V = h(t.perms), W = h(null), fe = h(null), Ve = h(null), x = h({}), r = h(new Zt({ items: a.value }, t.dataStateConfig)), m = h(t.editMode), j = h(0), E = h(null), N = h(De(t.saveButton, me.defaultSaveButton)), Ae = h(De(t.createButton, me.defaultCreateButton)), ct = h(De(t.editModeButton, me.defaultEditModeButton)), yt = h(De(t.dropButton, me.defaultDropButton)), re = h(!1);
    F(I, (e) => l("update:loading", e)), F(H, (e) => l("page", e));
    const bt = (e) => {
      V.value = e;
    }, gt = (e) => {
      var d;
      Array.isArray(e.data) && ((!t.paginator || ![Ie.LoadMore, Ie.Infinite].includes((d = t.paginator) == null ? void 0 : d.type)) && a.value.splice(0, a.value.length), a.value = [...a.value, ...e.data]), I.value = !1, le.value = !0, r.value.store({ items: a.value }).turnStoredIntoOriginal(), re.value = !1, Be(() => {
        j.value = ae(), Te.value, l("read-response", e);
      });
    }, kt = () => Be(() => I.value = !0), ht = () => {
      W.value.doRefresh();
    }, ce = Yt(12), we = i(() => {
      if (!t.hideEmptyColumns) return [];
      let e = [];
      return w.value.forEach((d) => {
        let C = d.key, R = !1;
        a.value.forEach((A) => {
          if (typeof A.checkEmpty == "function")
            return A.checkEmpty(A);
          A[C] && (R = !0);
        }), R || e.push(C);
      }), e;
    }), he = i(() => w.value.filter((e) => !e.hidden)), Ee = i(() => w.value.filter((e) => e.hidden)), Ct = i(() => {
      let e = he.value.length + 1;
      return t.sortable && ++e, e;
    }), Bt = i(() => w.value.filter((e) => e.isForRowKey)), Oe = i(() => Ee.value.length > 0 && !t.sortable), St = i(() => w.value.map((e) => e.key)), Ue = i(() => {
      let e = [];
      for (let d in n) St.value.indexOf(d) !== -1 && e.push(d);
      return e;
    }), _e = i(() => {
      var e;
      return t.hiddenSave || I.value || !((e = N.value) != null && e.resource || N.value.type) ? !1 : m.value && re.value ? !0 : m.value;
    }), Dt = i(() => Ce.value && a.value.length >= t.requiredItemsForTopCreate || ze.value ? !0 : _e.value || m.value && ye.value), Te = i(() => {
      var e, d;
      return j.value, typeof ((e = N.value) == null ? void 0 : e.disabled) == "function" ? N.value.disabled({
        value: a.value,
        dataState: r.value
      }) : typeof ((d = N.value) == null ? void 0 : d.disabled) == "boolean" ? N.value.disabled : !re.value;
    }), It = i(() => a.value.length), Vt = i(() => {
      var e;
      return {
        items: a.value,
        ...(e = N.value) == null ? void 0 : e.resourceData
      };
    }), wt = i(() => t.titleTag === "" ? "h2" : t.titleTag), Et = i(() => t.wrapContentTag === "" ? "div" : t.wrapContentTag), $e = i(() => pt(t.title)), Re = i(() => {
      var e;
      return (e = t.drag) == null ? void 0 : e.enabled;
    }), ye = i(() => V.value.includes(X.Create)), je = i(() => V.value.includes("read")), ie = i(() => V.value.includes(X.Update)), He = i(() => V.value.includes(X.Edit)), qe = i(() => V.value.includes(X.InlineEdit)), Tt = i(() => V.value.includes(X.ModalCreate)), $t = i(() => V.value.includes(X.InlineCreate)), Ke = i(() => V.value.includes(X.InlineCreateEver)), se = i(() => V.value.includes(X.Drop)), Rt = i(() => V.value.includes(X.SwitchEditMode)), ze = i(() => !Rt.value || !ie.value && !se.value || !ie.value && se.value ? !1 : !I.value), Mt = i(() => {
      var e;
      return (typeof ((e = t.paginator) == null ? void 0 : e.type) < "u" && [Ie.LoadMore, Ie.Infinite].includes(t.paginator.type) || !I.value) && a.value.length > 0;
    }), Lt = (e) => {
      let d = e.target;
      if (typeof d.dataset.column > "u")
        do
          d = d.parentNode;
        while (typeof d.dataset.column > "u" && d.tagName !== "TABLE" && d.tagName !== "body");
      if (d.tagName === "TD" && (d = d.parentNode, d = d.dataset.i, typeof d < "u"))
        return a.value[d];
    }, Pt = (e) => a.value[e], Nt = (e) => {
      var d;
      return (d = _.value) == null ? void 0 : d.querySelector(`[data-i="${e}"]`);
    }, We = (e) => U.value["tr_" + e] === !0, Ge = (e) => {
      e && e.sortable && (a.value = a.value.sort((d, C) => D.value(d, C, e, s.value)), s.value = s.value === ne.Asc ? ne.Desc : ne.Asc, k.value = e.key, j.value = ae(), l("sort", [k.value, s.value]));
    }, Je = (e) => {
      l("click", e);
    }, Qe = (e, d) => {
      let C = "tr_" + d;
      U.value[C] = typeof U.value[C] > "u" ? !0 : !U.value[C];
    }, Ft = (e) => {
      var C, R, A, q, B, g, M, G;
      let d = parseInt((q = (A = (R = (C = e == null ? void 0 : e.originalEvent) == null ? void 0 : C.toElement) == null ? void 0 : R.closest("tr")) == null ? void 0 : A.dataset) == null ? void 0 : q.i);
      return !(typeof ((B = t.drag) == null ? void 0 : B.isValid) == "function" && !((g = t.drag) != null && g.isValid(a.value[d])) || typeof ((M = t.drag) == null ? void 0 : M.isValid) == "boolean" && !((G = t.drag) != null && G.isValid));
    }, Xe = (e) => {
      var d, C;
      return typeof ((d = t.drag) == null ? void 0 : d.isDraggable) == "function" ? (C = t.drag) == null ? void 0 : C.isDraggable(e) : !0;
    }, Ye = () => {
      if (ye.value) {
        l("click-create");
        return;
      }
      if (Ke.value)
        l("click-create");
      else {
        if (typeof t.newValueGenerator == "function") {
          let e = t.newValueGenerator();
          if (typeof e == "object" || t.type !== be.Table) {
            a.value.push(e);
            return;
          }
        }
        a.value.push({});
      }
    }, Ze = (e) => {
      a.value.push(e);
    }, xe = () => I.value = !0, et = () => I.value = !1, At = (e, d) => {
      var C, R, A;
      if (!((C = N.value) != null && C.type && [
        Ne.Split,
        Ne.SplitEver,
        Ne.SplitLazy
      ].includes((R = N.value) == null ? void 0 : R.type))) {
        if (l("before-save"), (A = N.value) != null && A.resource && (I.value = !1, !d.success)) {
          l("error", d.httpStatus);
          return;
        }
        r.value.turnStoredIntoOriginal(), re.value = !1, l("save", d);
      }
    }, tt = (e, d, C) => {
      if (C >= e.length) {
        let R = C - e.length + 1;
        for (; R--; ) e.push(void 0);
      }
      return e.splice(C, 0, e.splice(d, 1)[0]), e;
    }, Ot = (e) => {
      tt(a.value, e, e - 1), j.value = ae();
    }, Ut = (e) => {
      tt(a.value, e, e + 1), j.value = ae();
    }, Me = (e) => {
      a.value.splice(e, 1), j.value = ae();
    }, _t = () => {
      var e;
      x.value && typeof ((e = x.value) == null ? void 0 : e.destroy) == "function" && (x.value.destroy(), x.value = {});
    }, lt = () => {
      E.value || (E.value = document.getElementById("lkt-table-body-" + ce)), x.value = new xt(E.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let d = e.oldIndex, C = e.newIndex;
          a.value.splice(C, 0, a.value.splice(d, 1)[0]), j.value = ae(), l("drag-end", a.value[C]);
        },
        onMove: function(e, d) {
          return Ft(e);
        }
      });
    }, Le = (e, d, C = !1) => {
      let R = [j.value, ce, "row", d];
      return C && R.push("hidden"), Bt.value.forEach((A) => {
        let q = String(e[A.key]).toLowerCase();
        q.length > 50 && (q = q.substring(0, 50)), q = mt(q, " ", "-"), R.push(q);
      }), R.join("-");
    }, at = i(() => typeof t.createEnabledValidator == "function" ? t.createEnabledValidator({ items: a.value }) : !0), Ce = i(() => Ke.value || ye.value && m.value || $t.value && m.value || Tt.value && m.value), jt = i(() => [be.Ol, be.Ul].includes(t.type)), Pe = (e, d) => typeof t.itemDisplayChecker == "function" ? t.itemDisplayChecker(e) : !0;
    Gt(() => {
      var e;
      t.initialSorting && Ge(nl(t.columns, k.value)), r.value.store({ items: a.value }).turnStoredIntoOriginal(), re.value = !1, (e = t.drag) != null && e.enabled && Be(() => {
        lt();
      });
    }), F(() => {
      var e;
      return (e = t.drag) == null ? void 0 : e.enabled;
    }, (e) => {
      e ? lt() : _t();
    }), F(() => t.perms, (e) => V.value = e), F(V, (e) => l("update:perms", e)), F(() => t.editMode, (e) => m.value = e), F(() => t.columns, (e) => w.value = e, { deep: !0 }), F(() => t.modelValue, (e) => a.value = e, { deep: !0 }), F(a, (e) => {
      r.value.increment({ items: e }), re.value = r.value.changed(), l("update:modelValue", e);
    }, { deep: !0 }), v({
      getItemByEvent: Lt,
      getItemByIndex: Pt,
      getRowByIndex: Nt,
      doRefresh: ht,
      getHtml: () => fe.value,
      turnStoredIntoOriginal: () => {
        r.value.turnStoredIntoOriginal(), Be(() => {
          j.value = ae();
        });
      }
    });
    const Ht = i(() => typeof $.defaultEmptySlot < "u"), qt = i(() => $.defaultEmptySlot), Kt = i(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled ? !1 : typeof t.drag.canRender > "u" ? !0 : t.drag.canRender), zt = i(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled || typeof t.drag.isDisabled > "u" ? !1 : t.drag.isDisabled);
    return (e, d) => {
      const C = z("lkt-button"), R = z("lkt-field"), A = z("lkt-loader"), q = z("lkt-paginator");
      return u(), p("section", {
        ref_key: "element",
        ref: fe,
        class: "lkt-table-page",
        id: "lkt-table-page-" + y(ce)
      }, [
        $e.value || y(n).title ? (u(), p("header", {
          key: 0,
          class: K(e.headerClass)
        }, [
          $e.value ? (u(), S(Z(wt.value), { key: 0 }, {
            default: L(() => [
              e.titleIcon ? (u(), p("i", {
                key: 0,
                class: K(e.titleIcon)
              }, null, 2)) : f("", !0),
              ee(" " + ue($e.value), 1)
            ]),
            _: 1
          })) : f("", !0),
          y(n).title ? T(e.$slots, "title", { key: 1 }) : f("", !0)
        ], 2)) : f("", !0),
        (u(), S(Z(Et.value), {
          class: K(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: L(() => [
            Dt.value ? (u(), p("div", El, [
              ge(pe(C, Q({
                class: "lkt-table--save-button",
                ref_key: "saveButtonRef",
                ref: Ve
              }, N.value, {
                disabled: Te.value,
                "modal-data": Vt.value,
                onLoading: xe,
                onLoaded: et,
                onClick: At
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
                  y(n)["button-save"] ? T(e.$slots, "button-save", {
                    key: 0,
                    items: a.value,
                    editMode: e.editMode,
                    canUpdate: !Te.value
                  }) : f("", !0)
                ]),
                _: 3
              }, 16, ["disabled", "modal-data"]), [
                [ke, _e.value]
              ]),
              Ce.value && a.value.length >= e.requiredItemsForTopCreate ? (u(), S(ut, {
                key: 0,
                config: Ae.value,
                disabled: !at.value,
                onClick: Ye,
                onAppend: Ze
              }, null, 8, ["config", "disabled"])) : f("", !0),
              O("div", Tl, [
                ge(pe(R, Q(ct.value, {
                  modelValue: m.value,
                  "onUpdate:modelValue": d[0] || (d[0] = (B) => m.value = B)
                }), null, 16, ["modelValue"]), [
                  [ke, ze.value]
                ])
              ])
            ])) : f("", !0),
            y(n).buttons ? (u(), p("div", $l, [
              T(e.$slots, "buttons")
            ])) : f("", !0),
            le.value && y(n).filters ? (u(), p("div", Rl, [
              T(e.$slots, "filters", {
                items: a.value,
                isLoading: I.value
              })
            ])) : f("", !0),
            ge(O("div", Ml, [
              e.type === y(be).Table ? (u(), p("table", Ll, [
                O("thead", null, [
                  O("tr", null, [
                    Re.value && m.value ? (u(), p("th", Pl)) : f("", !0),
                    e.addNavigation && m.value ? (u(), p("th", Nl)) : f("", !0),
                    Oe.value ? (u(), p("th", Fl)) : f("", !0),
                    (u(!0), p(P, null, J(he.value, (B) => (u(), p(P, null, [
                      we.value.indexOf(B.key) === -1 ? (u(), S(Vl, {
                        key: 0,
                        column: B,
                        "sort-by": k.value,
                        "sort-direction": s.value,
                        "amount-of-columns": e.columns.length,
                        items: a.value,
                        onClick: (g) => Ge(B)
                      }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : f("", !0)
                    ], 64))), 256)),
                    se.value && m.value ? (u(), p("th", Al)) : f("", !0),
                    He.value && ie.value && m.value ? (u(), p("th", Ol)) : f("", !0)
                  ])
                ]),
                O("tbody", {
                  ref_key: "tableBody",
                  ref: _,
                  id: "lkt-table-body-" + y(ce)
                }, [
                  (u(!0), p(P, null, J(a.value, (B, g) => ge((u(), S(gl, {
                    modelValue: a.value[g],
                    "onUpdate:modelValue": (M) => a.value[g] = M,
                    key: Le(B, g),
                    i: g,
                    "drop-button": yt.value,
                    "edit-button": e.editButton,
                    "display-hidden-columns-indicator": Oe.value,
                    "is-draggable": Xe(B),
                    sortable: Re.value,
                    "visible-columns": he.value,
                    "empty-columns": we.value,
                    "add-navigation": e.addNavigation,
                    "hidden-is-visible": We(g),
                    "latest-row": g + 1 === It.value,
                    "can-drop": se.value && m.value,
                    "can-edit": He.value && ie.value && m.value,
                    "edit-mode-enabled": m.value,
                    "has-inline-edit-perm": qe.value,
                    "row-display-type": e.rowDisplayType,
                    "render-drag": Kt.value,
                    "disabled-drag": zt.value,
                    onClick: Je,
                    onShow: Qe,
                    onItemUp: Ot,
                    onItemDown: Ut,
                    onItemDrop: Me
                  }, nt({ _: 2 }, [
                    y(n)[`item-${g}`] ? {
                      name: `item-${g}`,
                      fn: L((M) => [
                        T(e.$slots, `item-${g}`, oe({
                          [e.slotItemVar || ""]: M.item,
                          index: g
                        }))
                      ]),
                      key: "0"
                    } : y(n).item ? {
                      name: "item",
                      fn: L((M) => [
                        T(e.$slots, "item", oe({
                          [e.slotItemVar || ""]: M.item,
                          index: g
                        }))
                      ]),
                      key: "1"
                    } : void 0,
                    J(Ue.value, (M) => ({
                      name: M,
                      fn: L((G) => [
                        T(e.$slots, M, oe({
                          [e.slotItemVar || ""]: G.item,
                          value: G.value,
                          column: G.column
                        }))
                      ])
                    }))
                  ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "drop-button", "edit-button", "display-hidden-columns-indicator", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "hidden-is-visible", "latest-row", "can-drop", "can-edit", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag"])), [
                    [ke, Pe(a.value[g])]
                  ])), 128)),
                  Ee.value.length > 0 ? (u(!0), p(P, { key: 0 }, J(a.value, (B, g) => (u(), S(Dl, {
                    modelValue: a.value[g],
                    "onUpdate:modelValue": (M) => a.value[g] = M,
                    key: Le(B, g, !0),
                    i: g,
                    "hidden-columns": Ee.value,
                    "hidden-columns-col-span": Ct.value,
                    "is-draggable": Xe(B),
                    sortable: Re.value,
                    "visible-columns": he.value,
                    "empty-columns": we.value,
                    "hidden-is-visible": We(g),
                    "edit-mode-enabled": m.value,
                    "has-inline-edit-perm": qe.value,
                    onClick: Je,
                    onShow: Qe
                  }, nt({ _: 2 }, [
                    J(Ue.value, (M) => ({
                      name: M,
                      fn: L((G) => [
                        T(e.$slots, M, oe({
                          [e.slotItemVar || ""]: G.item,
                          value: G.value,
                          column: G.column
                        }))
                      ])
                    }))
                  ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "hidden-columns", "hidden-columns-col-span", "is-draggable", "sortable", "visible-columns", "empty-columns", "hidden-is-visible", "edit-mode-enabled", "has-inline-edit-perm"]))), 128)) : f("", !0)
                ], 8, Ul)
              ])) : e.type === y(be).Item ? (u(), p("div", {
                key: 1,
                ref_key: "tableBody",
                ref: _,
                id: "lkt-table-body-" + y(ce),
                class: K(["lkt-table-items-container", e.itemsContainerClass])
              }, [
                (u(!0), p(P, null, J(a.value, (B, g) => (u(), p(P, null, [
                  Pe(B) ? (u(), p("div", {
                    class: "lkt-table-item",
                    "data-i": g,
                    key: Le(B, g)
                  }, [
                    T(e.$slots, "item", oe({
                      [e.slotItemVar || ""]: B,
                      index: g,
                      editing: m.value,
                      canCreate: ye.value,
                      canRead: je.value,
                      canUpdate: ie.value,
                      canDrop: se.value,
                      isLoading: I.value,
                      doDrop: () => Me(g)
                    }))
                  ], 8, jl)) : f("", !0)
                ], 64))), 256))
              ], 10, _l)) : jt.value ? (u(), S(Z(e.type), {
                key: 2,
                class: K(["lkt-table-items-container", e.itemsContainerClass])
              }, {
                default: L(() => [
                  (u(!0), p(P, null, J(a.value, (B, g) => (u(), p(P, null, [
                    Pe(B) ? (u(), p("li", {
                      key: 0,
                      class: "lkt-table-item",
                      "data-i": g
                    }, [
                      T(e.$slots, "item", oe({
                        [e.slotItemVar || ""]: B,
                        index: g,
                        editing: m.value,
                        canCreate: ye.value,
                        canRead: je.value,
                        canUpdate: ie.value,
                        canDrop: se.value,
                        isLoading: I.value,
                        doDrop: () => Me(g)
                      }))
                    ], 8, Hl)) : f("", !0)
                  ], 64))), 256))
                ]),
                _: 3
              }, 8, ["class"])) : f("", !0)
            ], 512), [
              [ke, Mt.value]
            ]),
            !I.value && a.value.length === 0 ? (u(), p("div", ql, [
              y(n).empty ? T(e.$slots, "empty", { key: 0 }) : Ht.value ? (u(), S(Z(qt.value), {
                key: 1,
                message: e.noResultsText
              }, null, 8, ["message"])) : e.noResultsText ? (u(), p(P, { key: 2 }, [
                ee(ue(e.noResultsText), 1)
              ], 64)) : f("", !0)
            ])) : f("", !0),
            I.value ? (u(), S(A, { key: 4 })) : f("", !0),
            Ce.value || y(n).bottomButtons ? (u(), p("div", Kl, [
              Ce.value && a.value.length >= e.requiredItemsForBottomCreate ? (u(), S(ut, {
                key: 0,
                config: Ae.value,
                disabled: !at.value,
                onClick: Ye,
                onAppend: Ze
              }, null, 8, ["config", "disabled"])) : f("", !0),
              T(e.$slots, "bottom-buttons")
            ])) : f("", !0),
            e.paginator && Object.keys(e.paginator).length > 0 ? (u(), S(q, Q({
              key: 6,
              ref_key: "paginatorRef",
              ref: W
            }, e.paginator, {
              modelValue: H.value,
              "onUpdate:modelValue": d[1] || (d[1] = (B) => H.value = B),
              onLoading: kt,
              onPerms: bt,
              onResponse: gt
            }), null, 16, ["modelValue"])) : f("", !0)
          ]),
          _: 3
        }, 8, ["class"]))
      ], 8, wl);
    };
  }
}), xl = {
  install: (o) => {
    o.component("lkt-table") === void 0 && o.component("lkt-table", zl);
  }
}, ea = (o) => ($.navButtonSlot = o, !0), ta = (o) => ($.dropButtonSlot = o, !0), la = (o) => ($.createButtonSlot = o, !0), aa = (o) => {
  $.defaultEmptySlot = o;
}, oa = (o) => {
  $.defaultSaveIcon = o;
};
export {
  ra as Column,
  ia as createColumn,
  xl as default,
  la as setTableCreateButtonSlot,
  ta as setTableDropButtonSlot,
  aa as setTableEmptySlot,
  ea as setTableNavButtonSlot,
  oa as setTableSaveIcon
};
