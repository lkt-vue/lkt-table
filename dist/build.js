import { defineComponent as x, ref as h, watch as F, computed as r, resolveComponent as _, createBlock as S, createElementBlock as s, unref as c, openBlock as u, normalizeProps as oe, mergeProps as Z, withCtx as P, createTextVNode as ne, toDisplayString as ue, Fragment as N, withModifiers as rt, createCommentVNode as f, resolveDynamicComponent as Y, useSlots as dt, normalizeClass as J, createElementVNode as j, createVNode as me, renderSlot as $, renderList as G, withDirectives as be, vShow as ke, mergeDefaults as _t, onMounted as zt, nextTick as Be, createSlots as at } from "vue";
import { __ as st } from "lkt-i18n";
import { SortDirection as ge, Column as pt, ColumnType as ae, TableRowType as se, ensureButtonConfig as ot, LktSettings as nt, extractI18nValue as ut, TablePermission as Q, PaginatorType as Se, TableType as ye, getDefaultValues as Gt, Table as Jt, ButtonType as Le } from "lkt-vue-kernel";
import { Column as na, createColumn as ua } from "lkt-vue-kernel";
import { replaceAll as mt, generateRandomString as Qt } from "lkt-string-tools";
import { DataState as Xt } from "lkt-data-state";
import Yt from "sortablejs";
import { time as pe } from "lkt-date-tools";
const Zt = (o, p, v, n) => {
  if (!v) return 0;
  let a = o[v.key], t = p[v.key];
  if (n === ge.Asc) {
    if (a > t) return 1;
    if (t > a) return -1;
  } else {
    if (a > t) return -1;
    if (t > a) return 1;
  }
  return 0;
}, ve = (o, p, v, n = []) => {
  if (o.extractTitleFromColumn) {
    let a = n.find((t) => t.key === o.extractTitleFromColumn);
    if (a)
      return ve(a, p, v, n);
  }
  if (o.formatter && typeof o.formatter == "function") {
    let a = o.formatter(p[o.key], p, o, v);
    return a.startsWith("__:") ? st(a.substring(3)) : a;
  }
  return p[o.key];
}, xt = (o, p, v) => {
  if (!o.colspan) return -1;
  let n = p;
  return v.forEach((a) => {
    let t = Pe(o, a);
    t > 0 && t < n && (n = t);
  }), n;
}, Pe = (o, p) => o.colspan === !1 ? !1 : typeof o.colspan == "function" ? o.colspan(p) : o.colspan, el = (o, p) => typeof o.preferSlot > "u" ? !0 : o.preferSlot === !1 ? !1 : typeof o.preferSlot == "function" ? o.preferSlot(p) : !0, tl = (o, p, v) => {
  if (typeof o != "object" || !o.key || p.indexOf(o.key) > -1) return !1;
  let n = Pe(o, v);
  return typeof o.colspan > "u" ? !0 : (typeof o.colspan < "u" && (typeof o.colspan == "function" ? n = parseInt(o.colspan(v)) : n = parseInt(o.colspan)), n > 0);
}, ll = (o = []) => {
  if (o.length > 0) {
    for (let p = 0; p < o.length; ++p)
      if (o[p].sortable) return o[p].key;
  }
  return "";
}, al = (o, p) => {
  if (o.length > 0) {
    for (let v = 0; v < o.length; ++v)
      if (o[v].key === p) return o[v];
  }
  return null;
}, vt = (o) => o.type ? `is-${o.type}` : "", ft = /* @__PURE__ */ x({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new pt() },
    columns: { default: () => [] },
    i: { default: 0 },
    editModeEnabled: { type: Boolean, default: !1 },
    hasInlineEditPerm: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: p }) {
    const v = p, n = o, a = h(n.modelValue), t = h(a.value[n.column.key]), m = h(null);
    let D = n.column.type;
    [ae.Integer, ae.Float].includes(D) && (D = ae.Number), F(t, (l) => {
      const T = JSON.parse(JSON.stringify(a.value));
      T[n.column.key] = l, v("update:modelValue", T);
    }), F(() => n.modelValue, (l) => {
      a.value = l, t.value = a.value[n.column.key];
    });
    const k = r(() => ({ ...n.column.slotData, item: a.value })), C = r(() => {
      var l, T, H, O;
      if ((l = n.column.field) != null && l.modalData && typeof ((T = n.column.field) == null ? void 0 : T.modalData) == "object")
        for (let U in n.column.field.modalData)
          if (typeof ((H = n.column.field) == null ? void 0 : H.modalData[U]) == "string" && n.column.field.modalData[U].startsWith("prop:")) {
            let w = n.column.field.modalData[U].substring(5);
            a.value[w];
          } else
            n.column.field.modalData[U];
      return (O = n.column.field) == null ? void 0 : O.modalData;
    });
    return (l, T) => {
      var w, ee, E, te;
      const H = _("lkt-anchor"), O = _("lkt-button"), U = _("lkt-field");
      return l.column.type === c(ae).Anchor ? (u(), S(H, oe(Z({ key: 0 }, l.column.anchor)), {
        default: P(() => [
          ne(ue(c(ve)(l.column, a.value, l.i)), 1)
        ]),
        _: 1
      }, 16)) : l.column.type === c(ae).Button ? (u(), S(O, Z({ key: 1 }, l.column.button, { prop: a.value }), {
        default: P(() => [
          ne(ue(c(ve)(l.column, a.value, l.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : l.column.type === c(ae).Field && l.hasInlineEditPerm ? (u(), S(U, Z({ key: 2 }, l.column.field, {
        "read-mode": !l.column.editable || !l.editModeEnabled,
        ref: (q) => m.value = q,
        "slot-data": k.value,
        label: ((w = l.column.field) == null ? void 0 : w.type) === "switch" || ((ee = l.column.field) == null ? void 0 : ee.type) === "check" ? l.column.label : "",
        "modal-data": C.value,
        prop: a.value,
        modelValue: t.value,
        "onUpdate:modelValue": T[0] || (T[0] = (q) => t.value = q)
      }), null, 16, ["read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : l.column.type === c(ae).Field ? (u(), S(U, Z({ key: 3 }, l.column.field, {
        "read-mode": "",
        ref: (q) => m.value = q,
        "slot-data": k.value,
        label: ((E = l.column.field) == null ? void 0 : E.type) === "switch" || ((te = l.column.field) == null ? void 0 : te.type) === "check" ? l.column.label : "",
        "modal-data": C.value,
        prop: a.value,
        "model-value": t.value
      }), null, 16, ["slot-data", "label", "modal-data", "prop", "model-value"])) : (u(), s(N, { key: 4 }, [
        ne(ue(c(ve)(l.column, a.value, l.i, l.columns)), 1)
      ], 64));
    };
  }
}), X = class X {
};
X.navButtonSlot = "", X.dropButtonSlot = "", X.editButtonSlot = "", X.createButtonSlot = "", X.defaultEmptySlot = void 0, X.defaultSaveIcon = "", X.defaultNoResultsMessage = "No results";
let M = X;
const ol = /* @__PURE__ */ x({
  __name: "DropButton",
  props: {
    config: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(o, { emit: p }) {
    const v = p, n = o, a = r(() => M.dropButtonSlot !== ""), t = r(() => M.dropButtonSlot);
    return (m, D) => {
      var C, l;
      const k = _("lkt-button");
      return u(), S(k, Z({ palette: "table-delete" }, n.config, {
        icon: a.value ? "" : (C = m.config) == null ? void 0 : C.icon,
        text: a.value ? "" : (l = m.config) == null ? void 0 : l.text,
        disabled: m.disabled,
        onClick: D[0] || (D[0] = rt((T) => v("click"), ["prevent", "stop"]))
      }), {
        default: P(() => [
          a.value ? (u(), S(Y(t.value), { key: 0 })) : f("", !0)
        ]),
        _: 1
      }, 16, ["icon", "text", "disabled"]);
    };
  }
}), nl = /* @__PURE__ */ x({
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
    const v = p, n = r(() => M.editButtonSlot !== ""), a = r(() => M.editButtonSlot);
    return (t, m) => {
      const D = _("lkt-button");
      return u(), S(D, {
        palette: "table-delete",
        icon: n.value ? "" : t.icon,
        text: n.value ? "" : t.text,
        "on-click-to": t.link,
        "is-anchor": t.link !== "",
        resource: t.resource,
        "resource-data": t.resourceData,
        "confirm-modal": t.confirm,
        disabled: t.disabled,
        onClick: m[0] || (m[0] = rt((k) => v("click"), ["prevent", "stop"]))
      }, {
        default: P(() => [
          n.value ? (u(), S(Y(a.value), { key: 0 })) : f("", !0)
        ]),
        _: 1
      }, 8, ["icon", "text", "on-click-to", "is-anchor", "resource", "resource-data", "confirm-modal", "disabled"]);
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
}, yl = /* @__PURE__ */ x({
  __name: "LktTableRow",
  props: {
    modelValue: { default: () => ({}) },
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
    editText: { default: "" },
    editIcon: { default: "" },
    editLink: { default: "" },
    rowDisplayType: { type: [Number, Function], default: se.Auto },
    renderDrag: { type: [Boolean, Function], default: !0 },
    disabledDrag: { type: [Boolean, Function], default: !0 }
  },
  emits: ["update:modelValue", "click", "show", "item-up", "item-down", "item-drop"],
  setup(o, { emit: p }) {
    const v = dt(), n = p, a = o, t = h(a.modelValue);
    let m = typeof a.rowDisplayType == "function" ? a.rowDisplayType(t.value, a.i) : a.rowDisplayType;
    m || (m = se.Auto);
    const D = [se.Auto, se.PreferCustomItem].includes(m), k = [se.Auto, se.PreferItem].includes(m), C = h(a.editLink);
    for (let i in t.value) C.value = mt(C.value, ":" + i, t.value[i]);
    const l = (i) => n("click", i), T = (i, b) => {
      n("show", i, b);
    }, H = r(() => {
      let i = [], b = !1;
      return typeof a.disabledDrag == "function" ? b = a.disabledDrag(t.value) : b = De.value === !0, !b && a.sortable && a.isDraggable ? i.push("handle") : b && i.push("disabled"), i.join(" ");
    }), O = r(() => M.navButtonSlot !== ""), U = r(() => M.navButtonSlot), w = () => {
      n("item-up", a.i);
    }, ee = () => {
      n("item-down", a.i);
    }, E = () => {
      n("item-drop", a.i);
    }, te = () => {
    };
    F(() => a.modelValue, (i) => t.value = i), F(t, (i) => {
      n("update:modelValue", i);
    }, { deep: !0 });
    const q = r(() => typeof a.renderDrag == "function" ? a.renderDrag(t.value) : a.renderDrag === !0), De = r(() => typeof a.disabledDrag == "function" ? a.disabledDrag(t.value) : a.disabledDrag === !0);
    return (i, b) => {
      const I = _("lkt-button");
      return u(), s("tr", {
        "data-i": i.i,
        "data-draggable": i.isDraggable,
        class: J({ "type-custom-item": c(D), "type-item": c(k) })
      }, [
        i.sortable && i.isDraggable && i.editModeEnabled && q.value ? (u(), s("td", {
          key: 0,
          "data-role": "drag-indicator",
          class: J(H.value),
          "data-i": i.i
        }, null, 10, il)) : i.sortable && i.editModeEnabled && q.value ? (u(), s("td", rl)) : f("", !0),
        i.addNavigation && i.editModeEnabled ? (u(), s("td", dl, [
          j("div", sl, [
            me(I, {
              palette: "table-nav",
              disabled: i.i === 0,
              onClick: w
            }, {
              default: P(() => [
                O.value ? (u(), S(Y(U.value), {
                  key: 0,
                  direction: "up"
                })) : (u(), s(N, { key: 1 }, [
                  b[3] || (b[3] = j("i", { class: "" }, null, -1)),
                  b[4] || (b[4] = ne(" UP "))
                ], 64))
              ]),
              _: 1
            }, 8, ["disabled"]),
            me(I, {
              palette: "table-nav",
              disabled: i.latestRow,
              onClick: ee
            }, {
              default: P(() => [
                O.value ? (u(), S(Y(U.value), {
                  key: 0,
                  direction: "down"
                })) : (u(), s(N, { key: 1 }, [
                  b[5] || (b[5] = j("i", { class: "" }, null, -1)),
                  b[6] || (b[6] = ne(" DOWN "))
                ], 64))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : f("", !0),
        i.displayHiddenColumnsIndicator ? (u(), s("td", {
          key: 3,
          onClick: b[0] || (b[0] = (V) => T(V, i.i)),
          "data-role": "show-more",
          class: J(i.hiddenIsVisible ? "state-open" : "")
        }, null, 2)) : f("", !0),
        c(D) && c(v)[`item-${i.i}`] ? (u(), s("td", {
          key: "td" + i.i,
          colspan: i.visibleColumns.length
        }, [
          $(i.$slots, `item-${i.i}`, {
            item: t.value,
            index: i.i
          })
        ], 8, pl)) : c(k) && c(v).item ? (u(), s("td", {
          key: "td" + i.i,
          colspan: i.visibleColumns.length
        }, [
          $(i.$slots, "item", {
            item: t.value,
            index: i.i
          })
        ], 8, ml)) : (u(!0), s(N, { key: 6 }, G(i.visibleColumns, (V) => (u(), s(N, null, [
          c(tl)(V, i.emptyColumns, t.value) ? (u(), s("td", {
            key: "td" + i.i,
            "data-column": V.key,
            colspan: c(Pe)(V, t.value),
            title: c(ve)(V, t.value, i.i, i.visibleColumns),
            class: J(c(vt)(V)),
            onClick: b[2] || (b[2] = (le) => l(le))
          }, [
            i.$slots[V.key] && c(el)(V, t.value) ? $(i.$slots, V.key, {
              key: 0,
              value: t.value[V.key],
              item: t.value,
              column: V,
              i: i.i
            }) : t.value ? (u(), S(ft, {
              key: 1,
              modelValue: t.value,
              "onUpdate:modelValue": b[1] || (b[1] = (le) => t.value = le),
              column: V,
              columns: i.visibleColumns,
              "edit-mode-enabled": i.editModeEnabled,
              "has-inline-edit-perm": i.hasInlineEditPerm,
              i: i.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : f("", !0)
          ], 10, vl)) : f("", !0)
        ], 64))), 256)),
        i.canDrop && i.editModeEnabled ? (u(), s("td", fl, [
          me(ol, {
            config: i.dropButton,
            onClick: E
          }, null, 8, ["config"])
        ])) : f("", !0),
        i.canEdit && i.editModeEnabled ? (u(), s("td", cl, [
          me(nl, {
            "resource-data": t.value,
            text: i.editText,
            icon: i.editIcon,
            link: C.value,
            onClick: te
          }, null, 8, ["resource-data", "text", "icon", "link"])
        ])) : f("", !0)
      ], 10, ul);
    };
  }
}), bl = { "data-role": "hidden-row" }, kl = ["colspan"], gl = ["data-column"], hl = ["data-i"], Cl = ["data-column", "title"], Bl = /* @__PURE__ */ x({
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
    const v = p, n = o, a = h(n.modelValue), t = (m) => v("click", m);
    return F(() => n.modelValue, (m) => a.value = m), F(a, () => v("update:modelValue", a.value)), (m, D) => be((u(), s("tr", bl, [
      j("td", { colspan: m.hiddenColumnsColSpan }, [
        j("table", null, [
          j("tr", null, [
            (u(!0), s(N, null, G(m.hiddenColumns, (k) => (u(), s("th", {
              "data-column": k.key
            }, [
              j("div", null, ue(k.label), 1)
            ], 8, gl))), 256))
          ]),
          j("tr", { "data-i": m.i }, [
            (u(!0), s(N, null, G(m.hiddenColumns, (k, C) => (u(), s("td", {
              "data-column": k.key,
              title: c(ve)(k, a.value, C, m.hiddenColumns),
              onClick: D[1] || (D[1] = (l) => t(l))
            }, [
              m.$slots[k.key] ? $(m.$slots, k.key, {
                key: 0,
                value: a.value[k.key],
                item: a.value,
                column: k,
                i: C
              }) : (u(), S(ft, {
                key: 1,
                column: k,
                columns: m.hiddenColumns,
                modelValue: a.value,
                "onUpdate:modelValue": D[0] || (D[0] = (l) => a.value = l),
                i: C,
                "edit-mode-enabled": m.editModeEnabled,
                "has-inline-edit-perm": m.hasInlineEditPerm
              }, null, 8, ["column", "columns", "modelValue", "i", "edit-mode-enabled", "has-inline-edit-perm"]))
            ], 8, Cl))), 256))
          ], 8, hl)
        ])
      ], 8, kl)
    ], 512)), [
      [ke, m.hiddenIsVisible]
    ]);
  }
}), it = /* @__PURE__ */ x({
  __name: "CreateButton",
  props: {
    config: { default: void 0 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["click", "append"],
  setup(o, { emit: p }) {
    var C;
    const v = p, n = o, a = r(() => M.createButtonSlot !== ""), t = r(() => M.createButtonSlot), m = {
      ...(C = n.config) == null ? void 0 : C.modalData,
      beforeClose: (l) => {
        "itemCreated" in l && l.itemCreated === !0 && v("append", l.item);
      }
    }, D = {
      ...n.config
    };
    D.modalData = m;
    const k = () => {
      var l;
      if (!((l = n.config) != null && l.modal)) {
        v("click");
        return;
      }
    };
    return (l, T) => {
      const H = _("lkt-button");
      return u(), S(H, Z(D, {
        disabled: l.disabled,
        onClick: k
      }), {
        default: P(() => [
          a.value ? (u(), S(Y(t.value), { key: 0 })) : f("", !0)
        ]),
        _: 1
      }, 16, ["disabled"]);
    };
  }
}), Sl = ["data-column", "data-sortable", "data-sort", "colspan", "title"], Dl = /* @__PURE__ */ x({
  __name: "TableHeader",
  props: {
    column: { default: () => new pt() },
    sortBy: { default: "" },
    sortDirection: { default: "" },
    amountOfColumns: { default: 0 },
    items: { default: () => [] }
  },
  emits: ["click"],
  setup(o, { emit: p }) {
    const v = p, n = o, a = r(() => xt(n.column, n.amountOfColumns, n.items)), t = r(() => n.column.sortable === !0), m = r(() => t.value && n.sortBy === n.column.key ? n.sortDirection : ""), D = r(() => n.column.label.startsWith("__:") ? st(n.column.label.substring(3)) : n.column.label), k = () => v("click", n.column);
    return (C, l) => (u(), s("th", {
      "data-column": C.column.key,
      "data-sortable": t.value,
      "data-sort": m.value,
      colspan: a.value,
      title: D.value,
      class: J(c(vt)(C.column)),
      onClick: k
    }, [
      j("div", null, ue(D.value), 1)
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
}, Ol = ["id"], Ul = ["id"], Al = ["data-i"], jl = ["data-i"], Hl = {
  key: 3,
  class: "lkt-table-empty"
}, ql = {
  key: 5,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, Kl = /* @__PURE__ */ x({
  __name: "LktTable",
  props: /* @__PURE__ */ _t({
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
    hiddenSave: { type: Boolean },
    wrapContentTag: {},
    wrapContentClass: {},
    itemsContainerClass: {},
    createEnabledValidator: { type: Function },
    editText: {},
    editIcon: {},
    editLink: {},
    addNavigation: { type: Boolean },
    newValueGenerator: { type: Function },
    requiredItemsForTopCreate: {},
    requiredItemsForBottomCreate: {},
    slotItemVar: {}
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
  setup(o, { expose: p, emit: v }) {
    var lt;
    const n = v, a = dt(), t = o, m = {}, D = h(typeof t.sorter == "function" ? t.sorter : Zt), k = h(ll(t.columns)), C = h(ge.Asc), l = h(t.modelValue), T = h(m), H = h(null), O = h(t.columns), U = h((lt = t.paginator) == null ? void 0 : lt.modelValue), w = h(t.loading), ee = h(!1), E = h(t.perms), te = h(null), q = h(null), De = h(null), i = h({}), b = h(new Xt({ items: l.value }, t.dataStateConfig)), I = h(t.editMode), V = h(0), le = h(null), K = h(ot(t.saveButton, nt.defaultSaveButton)), Ne = h(ot(t.createButton, nt.defaultCreateButton)), ie = h(!1);
    F(w, (e) => n("update:loading", e)), F(U, (e) => n("page", e));
    const ct = (e) => {
      E.value = e;
    }, yt = (e) => {
      var d;
      Array.isArray(e.data) && ((!t.paginator || ![Se.LoadMore, Se.Infinite].includes((d = t.paginator) == null ? void 0 : d.type)) && l.value.splice(0, l.value.length), l.value = [...l.value, ...e.data]), w.value = !1, ee.value = !0, b.value.store({ items: l.value }).turnStoredIntoOriginal(), ie.value = !1, Be(() => {
        V.value = pe(), we.value, n("read-response", e);
      });
    }, bt = () => Be(() => w.value = !0), kt = () => {
      te.value.doRefresh();
    }, fe = Qt(12), Ie = r(() => {
      if (!t.hideEmptyColumns) return [];
      let e = [];
      return O.value.forEach((d) => {
        let g = d.key, R = !1;
        l.value.forEach((A) => {
          if (typeof A.checkEmpty == "function")
            return A.checkEmpty(A);
          A[g] && (R = !0);
        }), R || e.push(g);
      }), e;
    }), he = r(() => O.value.filter((e) => !e.hidden)), Ve = r(() => O.value.filter((e) => e.hidden)), gt = r(() => {
      let e = he.value.length + 1;
      return t.sortable && ++e, e;
    }), ht = r(() => O.value.filter((e) => e.isForRowKey)), Fe = r(() => Ve.value.length > 0 && !t.sortable), Ct = r(() => O.value.map((e) => e.key)), Oe = r(() => {
      let e = [];
      for (let d in a) Ct.value.indexOf(d) !== -1 && e.push(d);
      return e;
    }), Ue = r(() => {
      var e;
      return t.hiddenSave || w.value || !((e = K.value) != null && e.resource || K.value.type) ? !1 : I.value && ie.value ? !0 : I.value;
    }), Bt = r(() => Ce.value && l.value.length >= t.requiredItemsForTopCreate || Ke.value ? !0 : Ue.value || I.value && ce.value), we = r(() => {
      var e, d;
      return V.value, typeof ((e = K.value) == null ? void 0 : e.disabled) == "function" ? K.value.disabled({
        value: l.value,
        dataState: b.value
      }) : typeof ((d = K.value) == null ? void 0 : d.disabled) == "boolean" ? K.value.disabled : !ie.value;
    }), St = r(() => l.value.length), Dt = r(() => {
      var e;
      return {
        items: l.value,
        ...(e = K.value) == null ? void 0 : e.resourceData
      };
    }), It = r(() => t.titleTag === "" ? "h2" : t.titleTag), Vt = r(() => t.wrapContentTag === "" ? "div" : t.wrapContentTag), Ee = r(() => ut(t.title)), wt = r(() => ut(t.editModeText)), Te = r(() => {
      var e;
      return (e = t.drag) == null ? void 0 : e.enabled;
    }), ce = r(() => E.value.includes(Q.Create)), Ae = r(() => E.value.includes("read")), re = r(() => E.value.includes(Q.Update)), je = r(() => E.value.includes(Q.Edit)), He = r(() => E.value.includes(Q.InlineEdit)), Et = r(() => E.value.includes(Q.ModalCreate)), Tt = r(() => E.value.includes(Q.InlineCreate)), qe = r(() => E.value.includes(Q.InlineCreateEver)), de = r(() => E.value.includes(Q.Drop)), $t = r(() => E.value.includes(Q.SwitchEditMode)), Ke = r(() => !$t.value || !re.value && !de.value || !re.value && de.value ? !1 : !w.value), Mt = r(() => {
      var e;
      return (typeof ((e = t.paginator) == null ? void 0 : e.type) < "u" && [Se.LoadMore, Se.Infinite].includes(t.paginator.type) || !w.value) && l.value.length > 0;
    }), Rt = (e) => {
      let d = e.target;
      if (typeof d.dataset.column > "u")
        do
          d = d.parentNode;
        while (typeof d.dataset.column > "u" && d.tagName !== "TABLE" && d.tagName !== "body");
      if (d.tagName === "TD" && (d = d.parentNode, d = d.dataset.i, typeof d < "u"))
        return l.value[d];
    }, Lt = (e) => l.value[e], Pt = (e) => {
      var d;
      return (d = H.value) == null ? void 0 : d.querySelector(`[data-i="${e}"]`);
    }, We = (e) => T.value["tr_" + e] === !0, _e = (e) => {
      e && e.sortable && (l.value = l.value.sort((d, g) => D.value(d, g, e, C.value)), C.value = C.value === ge.Asc ? ge.Desc : ge.Asc, k.value = e.key, n("sort", [k.value, C.value]));
    }, ze = (e) => {
      n("click", e);
    }, Ge = (e, d) => {
      let g = "tr_" + d;
      T.value[g] = typeof T.value[g] > "u" ? !0 : !T.value[g];
    }, Nt = (e) => {
      var g, R, A, W, B, y, L, z;
      let d = parseInt((W = (A = (R = (g = e == null ? void 0 : e.originalEvent) == null ? void 0 : g.toElement) == null ? void 0 : R.closest("tr")) == null ? void 0 : A.dataset) == null ? void 0 : W.i);
      return !(typeof ((B = t.drag) == null ? void 0 : B.isValid) == "function" && !((y = t.drag) != null && y.isValid(l.value[d])) || typeof ((L = t.drag) == null ? void 0 : L.isValid) == "boolean" && !((z = t.drag) != null && z.isValid));
    }, Je = (e) => {
      var d, g;
      return typeof ((d = t.drag) == null ? void 0 : d.isDraggable) == "function" ? (g = t.drag) == null ? void 0 : g.isDraggable(e) : !0;
    }, Qe = () => {
      if (ce.value) {
        n("click-create");
        return;
      }
      if (qe.value)
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
    }, Xe = (e) => {
      l.value.push(e);
    }, Ye = () => w.value = !0, Ze = () => w.value = !1, Ft = (e, d) => {
      var g, R, A;
      if (!((g = K.value) != null && g.type && [
        Le.Split,
        Le.SplitEver,
        Le.SplitLazy
      ].includes((R = K.value) == null ? void 0 : R.type))) {
        if (n("before-save"), (A = K.value) != null && A.resource && (w.value = !1, !d.success)) {
          n("error", d.httpStatus);
          return;
        }
        b.value.turnStoredIntoOriginal(), ie.value = !1, n("save", d);
      }
    }, xe = (e, d, g) => {
      if (g >= e.length) {
        let R = g - e.length + 1;
        for (; R--; ) e.push(void 0);
      }
      return e.splice(g, 0, e.splice(d, 1)[0]), e;
    }, Ot = (e) => {
      xe(l.value, e, e - 1), V.value = pe();
    }, Ut = (e) => {
      xe(l.value, e, e + 1), V.value = pe();
    }, $e = (e) => {
      l.value.splice(e, 1), V.value = pe();
    }, At = () => {
      var e;
      i.value && typeof ((e = i.value) == null ? void 0 : e.destroy) == "function" && (i.value.destroy(), i.value = {});
    }, et = () => {
      le.value || (le.value = document.getElementById("lkt-table-body-" + fe)), i.value = new Yt(le.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let d = e.oldIndex, g = e.newIndex;
          l.value.splice(g, 0, l.value.splice(d, 1)[0]), V.value = pe(), n("drag-end", l.value[g]);
        },
        onMove: function(e, d) {
          return Nt(e);
        }
      });
    }, Me = (e, d, g = !1) => {
      let R = [V.value, fe, "row", d];
      return g && R.push("hidden"), ht.value.forEach((A) => {
        let W = String(e[A.key]).toLowerCase();
        W.length > 50 && (W = W.substring(0, 50)), W = mt(W, " ", "-"), R.push(W);
      }), R.join("-");
    }, tt = r(() => typeof t.createEnabledValidator == "function" ? t.createEnabledValidator({ items: l.value }) : !0), Ce = r(() => qe.value || ce.value && I.value || Tt.value && I.value || Et.value && I.value), jt = r(() => [ye.Ol, ye.Ul].includes(t.type)), Re = (e, d) => typeof t.itemDisplayChecker == "function" ? t.itemDisplayChecker(e) : !0;
    zt(() => {
      var e;
      t.initialSorting && _e(al(t.columns, k.value)), b.value.store({ items: l.value }).turnStoredIntoOriginal(), ie.value = !1, (e = t.drag) != null && e.enabled && Be(() => {
        et();
      });
    }), F(() => {
      var e;
      return (e = t.drag) == null ? void 0 : e.enabled;
    }, (e) => {
      e ? et() : At();
    }), F(() => t.perms, (e) => E.value = e), F(E, (e) => n("update:perms", e)), F(() => t.editMode, (e) => I.value = e), F(() => t.columns, (e) => O.value = e, { deep: !0 }), F(() => t.modelValue, (e) => l.value = e, { deep: !0 }), F(l, (e) => {
      b.value.increment({ items: e }), ie.value = b.value.changed(), n("update:modelValue", e);
    }, { deep: !0 }), p({
      getItemByEvent: Rt,
      getItemByIndex: Lt,
      getRowByIndex: Pt,
      doRefresh: kt,
      getHtml: () => q.value,
      turnStoredIntoOriginal: () => {
        b.value.turnStoredIntoOriginal(), Be(() => {
          V.value = pe();
        });
      }
    });
    const Ht = r(() => typeof M.defaultEmptySlot < "u"), qt = r(() => M.defaultEmptySlot), Kt = r(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled ? !1 : typeof t.drag.canRender > "u" ? !0 : t.drag.canRender), Wt = r(() => !t.drag || Object.keys(t.drag).length === 0 || !t.drag.enabled || typeof t.drag.isDisabled > "u" ? !1 : t.drag.isDisabled);
    return (e, d) => {
      const g = _("lkt-button"), R = _("lkt-field"), A = _("lkt-loader"), W = _("lkt-paginator");
      return u(), s("section", {
        ref_key: "element",
        ref: q,
        class: "lkt-table-page",
        id: "lkt-table-page-" + c(fe)
      }, [
        Ee.value || c(a).title ? (u(), s("header", {
          key: 0,
          class: J(e.headerClass)
        }, [
          Ee.value ? (u(), S(Y(It.value), { key: 0 }, {
            default: P(() => [
              e.titleIcon ? (u(), s("i", {
                key: 0,
                class: J(e.titleIcon)
              }, null, 2)) : f("", !0),
              ne(" " + ue(Ee.value), 1)
            ]),
            _: 1
          })) : f("", !0),
          c(a).title ? $(e.$slots, "title", { key: 1 }) : f("", !0)
        ], 2)) : f("", !0),
        (u(), S(Y(Vt.value), {
          class: J(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: P(() => [
            Bt.value ? (u(), s("div", Vl, [
              be(me(g, Z({
                class: "lkt-table--save-button",
                ref_key: "saveButtonRef",
                ref: De
              }, K.value, {
                disabled: we.value,
                "modal-data": Dt.value,
                onLoading: Ye,
                onLoaded: Ze,
                onClick: Ft
              }), {
                split: P(({ doClose: B, doRootClick: y }) => [
                  $(e.$slots, "button-save-split", {
                    doClose: B,
                    doRootClick: y,
                    dataState: b.value,
                    onButtonLoading: Ye,
                    onButtonLoaded: Ze
                  })
                ]),
                default: P(() => [
                  c(a)["button-save"] ? $(e.$slots, "button-save", {
                    key: 0,
                    items: l.value,
                    editMode: e.editMode,
                    canUpdate: !we.value
                  }) : f("", !0)
                ]),
                _: 3
              }, 16, ["disabled", "modal-data"]), [
                [ke, Ue.value]
              ]),
              Ce.value && l.value.length >= e.requiredItemsForTopCreate ? (u(), S(it, {
                key: 0,
                config: Ne.value,
                disabled: !tt.value,
                onClick: Qe,
                onAppend: Xe
              }, null, 8, ["config", "disabled"])) : f("", !0),
              j("div", wl, [
                be(me(R, {
                  type: "switch",
                  modelValue: I.value,
                  "onUpdate:modelValue": d[0] || (d[0] = (B) => I.value = B),
                  label: wt.value
                }, null, 8, ["modelValue", "label"]), [
                  [ke, Ke.value]
                ])
              ])
            ])) : f("", !0),
            c(a).buttons ? (u(), s("div", El, [
              $(e.$slots, "buttons")
            ])) : f("", !0),
            ee.value && c(a).filters ? (u(), s("div", Tl, [
              $(e.$slots, "filters", {
                items: l.value,
                isLoading: w.value
              })
            ])) : f("", !0),
            be(j("div", $l, [
              e.type === c(ye).Table ? (u(), s("table", Ml, [
                j("thead", null, [
                  j("tr", null, [
                    Te.value && I.value ? (u(), s("th", Rl)) : f("", !0),
                    e.addNavigation && I.value ? (u(), s("th", Ll)) : f("", !0),
                    Fe.value ? (u(), s("th", Pl)) : f("", !0),
                    (u(!0), s(N, null, G(he.value, (B) => (u(), s(N, null, [
                      Ie.value.indexOf(B.key) === -1 ? (u(), S(Dl, {
                        key: 0,
                        column: B,
                        "sort-by": k.value,
                        "sort-direction": C.value,
                        "amount-of-columns": e.columns.length,
                        items: l.value,
                        onClick: (y) => _e(B)
                      }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : f("", !0)
                    ], 64))), 256)),
                    de.value && I.value ? (u(), s("th", Nl)) : f("", !0),
                    je.value && re.value && I.value ? (u(), s("th", Fl)) : f("", !0)
                  ])
                ]),
                j("tbody", {
                  ref_key: "tableBody",
                  ref: H,
                  id: "lkt-table-body-" + c(fe)
                }, [
                  (u(!0), s(N, null, G(l.value, (B, y) => be((u(), S(yl, {
                    modelValue: l.value[y],
                    "onUpdate:modelValue": (L) => l.value[y] = L,
                    key: Me(B, y),
                    i: y,
                    "display-hidden-columns-indicator": Fe.value,
                    "is-draggable": Je(B),
                    sortable: Te.value,
                    "visible-columns": he.value,
                    "empty-columns": Ie.value,
                    "add-navigation": e.addNavigation,
                    "hidden-is-visible": We(y),
                    "latest-row": y + 1 === St.value,
                    "can-drop": de.value && I.value,
                    "can-edit": je.value && re.value && I.value,
                    "edit-text": e.editText,
                    "edit-icon": e.editIcon,
                    "edit-link": e.editLink,
                    "edit-mode-enabled": I.value,
                    "has-inline-edit-perm": He.value,
                    "row-display-type": e.rowDisplayType,
                    "render-drag": Kt.value,
                    "disabled-drag": Wt.value,
                    onClick: ze,
                    onShow: Ge,
                    onItemUp: Ot,
                    onItemDown: Ut,
                    onItemDrop: $e
                  }, at({ _: 2 }, [
                    c(a)[`item-${y}`] ? {
                      name: `item-${y}`,
                      fn: P((L) => [
                        $(e.$slots, `item-${y}`, oe({
                          [e.slotItemVar || ""]: L.item,
                          index: y
                        }))
                      ]),
                      key: "0"
                    } : c(a).item ? {
                      name: "item",
                      fn: P((L) => [
                        $(e.$slots, "item", oe({
                          [e.slotItemVar || ""]: L.item,
                          index: y
                        }))
                      ]),
                      key: "1"
                    } : void 0,
                    G(Oe.value, (L) => ({
                      name: L,
                      fn: P((z) => [
                        $(e.$slots, L, oe({
                          [e.slotItemVar || ""]: z.item,
                          value: z.value,
                          column: z.column
                        }))
                      ])
                    }))
                  ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "display-hidden-columns-indicator", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "hidden-is-visible", "latest-row", "can-drop", "can-edit", "edit-text", "edit-icon", "edit-link", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag"])), [
                    [ke, Re(l.value[y])]
                  ])), 128)),
                  Ve.value.length > 0 ? (u(!0), s(N, { key: 0 }, G(l.value, (B, y) => (u(), S(Bl, {
                    modelValue: l.value[y],
                    "onUpdate:modelValue": (L) => l.value[y] = L,
                    key: Me(B, y, !0),
                    i: y,
                    "hidden-columns": Ve.value,
                    "hidden-columns-col-span": gt.value,
                    "is-draggable": Je(B),
                    sortable: Te.value,
                    "visible-columns": he.value,
                    "empty-columns": Ie.value,
                    "hidden-is-visible": We(y),
                    "edit-mode-enabled": I.value,
                    "has-inline-edit-perm": He.value,
                    onClick: ze,
                    onShow: Ge
                  }, at({ _: 2 }, [
                    G(Oe.value, (L) => ({
                      name: L,
                      fn: P((z) => [
                        $(e.$slots, L, oe({
                          [e.slotItemVar || ""]: z.item,
                          value: z.value,
                          column: z.column
                        }))
                      ])
                    }))
                  ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "hidden-columns", "hidden-columns-col-span", "is-draggable", "sortable", "visible-columns", "empty-columns", "hidden-is-visible", "edit-mode-enabled", "has-inline-edit-perm"]))), 128)) : f("", !0)
                ], 8, Ol)
              ])) : e.type === c(ye).Item ? (u(), s("div", {
                key: 1,
                ref_key: "tableBody",
                ref: H,
                id: "lkt-table-body-" + c(fe),
                class: J(["lkt-table-items-container", e.itemsContainerClass])
              }, [
                (u(!0), s(N, null, G(l.value, (B, y) => (u(), s(N, null, [
                  Re(B) ? (u(), s("div", {
                    class: "lkt-table-item",
                    "data-i": y,
                    key: Me(B, y)
                  }, [
                    $(e.$slots, "item", oe({
                      [e.slotItemVar || ""]: B,
                      index: y,
                      editing: I.value,
                      canCreate: ce.value,
                      canRead: Ae.value,
                      canUpdate: re.value,
                      canDrop: de.value,
                      isLoading: w.value,
                      doDrop: () => $e(y)
                    }))
                  ], 8, Al)) : f("", !0)
                ], 64))), 256))
              ], 10, Ul)) : jt.value ? (u(), S(Y(e.type), {
                key: 2,
                class: J(["lkt-table-items-container", e.itemsContainerClass])
              }, {
                default: P(() => [
                  (u(!0), s(N, null, G(l.value, (B, y) => (u(), s(N, null, [
                    Re(B) ? (u(), s("li", {
                      key: 0,
                      class: "lkt-table-item",
                      "data-i": y
                    }, [
                      $(e.$slots, "item", oe({
                        [e.slotItemVar || ""]: B,
                        index: y,
                        editing: I.value,
                        canCreate: ce.value,
                        canRead: Ae.value,
                        canUpdate: re.value,
                        canDrop: de.value,
                        isLoading: w.value,
                        doDrop: () => $e(y)
                      }))
                    ], 8, jl)) : f("", !0)
                  ], 64))), 256))
                ]),
                _: 3
              }, 8, ["class"])) : f("", !0)
            ], 512), [
              [ke, Mt.value]
            ]),
            !w.value && l.value.length === 0 ? (u(), s("div", Hl, [
              c(a).empty ? $(e.$slots, "empty", { key: 0 }) : Ht.value ? (u(), S(Y(qt.value), {
                key: 1,
                message: e.noResultsText
              }, null, 8, ["message"])) : e.noResultsText ? (u(), s(N, { key: 2 }, [
                ne(ue(e.noResultsText), 1)
              ], 64)) : f("", !0)
            ])) : f("", !0),
            w.value ? (u(), S(A, { key: 4 })) : f("", !0),
            Ce.value || c(a).bottomButtons ? (u(), s("div", ql, [
              Ce.value && l.value.length >= e.requiredItemsForBottomCreate ? (u(), S(it, {
                key: 0,
                config: Ne.value,
                disabled: !tt.value,
                onClick: Qe,
                onAppend: Xe
              }, null, 8, ["config", "disabled"])) : f("", !0),
              $(e.$slots, "bottom-buttons")
            ])) : f("", !0),
            e.paginator && Object.keys(e.paginator).length > 0 ? (u(), S(W, Z({
              key: 6,
              ref_key: "paginatorRef",
              ref: te
            }, e.paginator, {
              modelValue: U.value,
              "onUpdate:modelValue": d[1] || (d[1] = (B) => U.value = B),
              onLoading: bt,
              onPerms: ct,
              onResponse: yt
            }), null, 16, ["modelValue"])) : f("", !0)
          ]),
          _: 3
        }, 8, ["class"]))
      ], 8, Il);
    };
  }
}), Yl = {
  install: (o) => {
    o.component("lkt-table") === void 0 && o.component("lkt-table", Kl);
  }
}, Zl = (o) => (M.navButtonSlot = o, !0), xl = (o) => (M.dropButtonSlot = o, !0), ea = (o) => (M.createButtonSlot = o, !0), ta = (o) => {
  M.defaultEmptySlot = o;
}, la = (o) => {
  M.defaultSaveIcon = o;
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
