import { defineComponent as Z, ref as h, watch as P, computed as i, resolveComponent as j, createBlock as g, createElementBlock as s, unref as v, openBlock as r, normalizeProps as ae, mergeProps as ge, withCtx as R, createTextVNode as oe, toDisplayString as Y, Fragment as M, withModifiers as _e, createCommentVNode as y, resolveDynamicComponent as Q, useSlots as xe, normalizeClass as G, createElementVNode as U, createVNode as ue, renderSlot as $, renderList as z, withDirectives as pe, vShow as ce, mergeDefaults as Rt, onMounted as Mt, nextTick as Ee, createSlots as Ye } from "vue";
import { __ as ve } from "lkt-i18n";
import { Column as we, SortDirection as fe, ColumnType as le, TableRowType as re, TablePermission as X, TableType as me, getDefaultValues as Ft, Table as Pt } from "lkt-vue-kernel";
import { Column as Jl } from "lkt-vue-kernel";
import { replaceAll as et, generateRandomString as Lt } from "lkt-string-tools";
import { DataState as Nt } from "lkt-data-state";
import Ut from "sortablejs";
import { time as Ce } from "lkt-date-tools";
const Al = (o) => new we(o), At = (o, m, p, n) => {
  if (!p) return 0;
  let a = o[p.key], t = m[p.key];
  if (n === fe.Asc) {
    if (a > t) return 1;
    if (t > a) return -1;
  } else {
    if (a > t) return -1;
    if (t > a) return 1;
  }
  return 0;
}, ie = (o, m, p, n = []) => {
  if (o.extractTitleFromColumn) {
    let a = n.find((t) => t.key === o.extractTitleFromColumn);
    if (a)
      return ie(a, m, p, n);
  }
  if (o.formatter && typeof o.formatter == "function") {
    let a = o.formatter(m[o.key], m, o, p);
    return a.startsWith("__:") ? ve(a.substring(3)) : a;
  }
  return m[o.key];
}, Ot = (o, m, p) => {
  if (!o.colspan) return -1;
  let n = m;
  return p.forEach((a) => {
    let t = $e(o, a);
    t > 0 && t < n && (n = t);
  }), n;
}, $e = (o, m) => o.colspan === !1 ? !1 : typeof o.colspan == "function" ? o.colspan(m) : o.colspan, Ht = (o, m) => typeof o.preferSlot > "u" ? !0 : o.preferSlot === !1 ? !1 : typeof o.preferSlot == "function" ? o.preferSlot(m) : !0, Wt = (o, m, p) => {
  if (typeof o != "object" || !o.key || m.indexOf(o.key) > -1) return !1;
  let n = $e(o, p);
  return typeof o.colspan > "u" ? !0 : (typeof o.colspan < "u" && (typeof o.colspan == "function" ? n = parseInt(o.colspan(p)) : n = parseInt(o.colspan)), n > 0);
}, qt = (o = []) => {
  if (o.length > 0) {
    for (let m = 0; m < o.length; ++m)
      if (o[m].sortable) return o[m].key;
  }
  return "";
}, jt = (o, m) => {
  if (o.length > 0) {
    for (let p = 0; p < o.length; ++p)
      if (o[p].key === m) return o[p];
  }
  return null;
}, tt = (o) => o.type ? `is-${o.type}` : "", lt = /* @__PURE__ */ Z({
  __name: "LktTableCell",
  props: {
    modelValue: { default: () => ({}) },
    column: { default: () => new we() },
    columns: { default: () => [] },
    i: { default: 0 },
    editModeEnabled: { type: Boolean, default: !1 },
    hasInlineEditPerm: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: m }) {
    const p = m, n = o, a = h(n.modelValue), t = h(a.value[n.column.key]), c = h(null);
    let S = n.column.type;
    [le.Integer, le.Float].includes(S) && (S = le.Number), P(t, (l) => {
      const F = JSON.parse(JSON.stringify(a.value));
      F[n.column.key] = l, p("update:modelValue", F);
    }), P(() => n.modelValue, (l) => {
      a.value = l, t.value = a.value[n.column.key];
    });
    const f = i(() => ({ ...n.column.slotData, item: a.value })), I = i(() => {
      var l, F, K, L;
      if ((l = n.column.field) != null && l.modalData && typeof ((F = n.column.field) == null ? void 0 : F.modalData) == "object")
        for (let N in n.column.field.modalData)
          if (typeof ((K = n.column.field) == null ? void 0 : K.modalData[N]) == "string" && n.column.field.modalData[N].startsWith("prop:")) {
            let T = n.column.field.modalData[N].substring(5);
            a.value[T];
          } else
            n.column.field.modalData[N];
      return (L = n.column.field) == null ? void 0 : L.modalData;
    });
    return (l, F) => {
      var T, _, w, x;
      const K = j("lkt-anchor"), L = j("lkt-button"), N = j("lkt-field");
      return l.column.type === v(le).Anchor ? (r(), g(K, ae(ge({ key: 0 }, l.column.anchor)), {
        default: R(() => [
          oe(Y(v(ie)(l.column, a.value, l.i)), 1)
        ]),
        _: 1
      }, 16)) : l.column.type === v(le).Button ? (r(), g(L, ge({ key: 1 }, l.column.button, { prop: a.value }), {
        default: R(() => [
          oe(Y(v(ie)(l.column, a.value, l.i)), 1)
        ]),
        _: 1
      }, 16, ["prop"])) : l.column.type === v(le).Field && l.hasInlineEditPerm ? (r(), g(N, ge({ key: 2 }, l.column.field, {
        "read-mode": !l.column.editable || !l.editModeEnabled,
        ref: (H) => c.value = H,
        "slot-data": f.value,
        label: ((T = l.column.field) == null ? void 0 : T.type) === "switch" || ((_ = l.column.field) == null ? void 0 : _.type) === "check" ? l.column.label : "",
        "modal-data": I.value,
        prop: a.value,
        modelValue: t.value,
        "onUpdate:modelValue": F[0] || (F[0] = (H) => t.value = H)
      }), null, 16, ["read-mode", "slot-data", "label", "modal-data", "prop", "modelValue"])) : l.column.type === v(le).Field ? (r(), g(N, ge({ key: 3 }, l.column.field, {
        "read-mode": "",
        ref: (H) => c.value = H,
        "slot-data": f.value,
        label: ((w = l.column.field) == null ? void 0 : w.type) === "switch" || ((x = l.column.field) == null ? void 0 : x.type) === "check" ? l.column.label : "",
        "modal-data": I.value,
        prop: a.value,
        "model-value": t.value
      }), null, 16, ["slot-data", "label", "modal-data", "prop", "model-value"])) : (r(), s(M, { key: 4 }, [
        oe(Y(v(ie)(l.column, a.value, l.i, l.columns)), 1)
      ], 64));
    };
  }
}), J = class J {
};
J.navButtonSlot = "", J.dropButtonSlot = "", J.editButtonSlot = "", J.createButtonSlot = "", J.defaultEmptySlot = void 0, J.defaultSaveIcon = "", J.defaultNoResultsMessage = "No results";
let E = J;
const Kt = /* @__PURE__ */ Z({
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
  setup(o, { emit: m }) {
    const p = m, n = i(() => E.dropButtonSlot !== ""), a = i(() => E.dropButtonSlot);
    return (t, c) => {
      const S = j("lkt-button");
      return r(), g(S, {
        palette: "table-delete",
        icon: n.value ? "" : t.icon,
        text: n.value ? "" : t.text,
        resource: t.resource,
        "resource-data": t.resourceData,
        "confirm-modal": t.confirm,
        disabled: t.disabled,
        onClick: c[0] || (c[0] = _e((f) => p("click"), ["prevent", "stop"]))
      }, {
        default: R(() => [
          n.value ? (r(), g(Q(a.value), { key: 0 })) : y("", !0)
        ]),
        _: 1
      }, 8, ["icon", "text", "resource", "resource-data", "confirm-modal", "disabled"]);
    };
  }
}), zt = /* @__PURE__ */ Z({
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
  setup(o, { emit: m }) {
    const p = m, n = i(() => E.editButtonSlot !== ""), a = i(() => E.editButtonSlot);
    return (t, c) => {
      const S = j("lkt-button");
      return r(), g(S, {
        palette: "table-delete",
        icon: n.value ? "" : t.icon,
        text: n.value ? "" : t.text,
        "on-click-to": t.link,
        "is-anchor": t.link !== "",
        resource: t.resource,
        "resource-data": t.resourceData,
        "confirm-modal": t.confirm,
        disabled: t.disabled,
        onClick: c[0] || (c[0] = _e((f) => p("click"), ["prevent", "stop"]))
      }, {
        default: R(() => [
          n.value ? (r(), g(Q(a.value), { key: 0 })) : y("", !0)
        ]),
        _: 1
      }, 8, ["icon", "text", "on-click-to", "is-anchor", "resource", "resource-data", "confirm-modal", "disabled"]);
    };
  }
}), Gt = ["data-i", "data-draggable"], Jt = ["data-i"], Qt = {
  key: 1,
  "data-role": "invalid-drag-indicator"
}, Xt = {
  key: 2,
  class: "lkt-table-nav-cell"
}, Yt = { class: "lkt-table-nav-container" }, Zt = ["colspan"], _t = ["colspan"], xt = ["data-column", "colspan", "title"], el = {
  key: 7,
  class: "lkt-table-col-drop"
}, tl = {
  key: 8,
  class: "lkt-table-col-edit"
}, ll = /* @__PURE__ */ Z({
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
  setup(o, { emit: m }) {
    const p = xe(), n = m, a = o, t = h(a.modelValue);
    let c = typeof a.rowDisplayType == "function" ? a.rowDisplayType(t.value, a.i) : a.rowDisplayType;
    c || (c = re.Auto);
    const S = [re.Auto, re.PreferCustomItem].includes(c), f = [re.Auto, re.PreferItem].includes(c), I = h(a.editLink);
    for (let u in t.value) I.value = et(I.value, ":" + u, t.value[u]);
    const l = (u) => n("click", u), F = (u, k) => {
      n("show", u, k);
    }, K = i(() => {
      let u = [], k = !1;
      return typeof a.disabledDrag == "function" ? k = a.disabledDrag(t.value) : k = a.disabledDrag === !0, !k && a.sortable && a.isDraggable ? u.push("handle") : k && u.push("disabled"), u.join(" ");
    }), L = i(() => E.navButtonSlot !== ""), N = i(() => E.navButtonSlot), T = () => {
      n("item-up", a.i);
    }, _ = () => {
      n("item-down", a.i);
    }, w = () => {
      n("item-drop", a.i);
    }, x = () => {
    };
    P(() => a.modelValue, (u) => t.value = u), P(t, (u) => {
      n("update:modelValue", u);
    }, { deep: !0 });
    const H = i(() => typeof a.renderDrag == "function" ? a.renderDrag(t.value) : a.renderDrag === !0);
    return i(() => typeof a.disabledDrag == "function" ? a.disabledDrag(t.value) : a.disabledDrag === !0), (u, k) => {
      const C = j("lkt-button");
      return r(), s("tr", {
        "data-i": u.i,
        "data-draggable": u.isDraggable,
        class: G({ "type-custom-item": v(S), "type-item": v(f) })
      }, [
        u.sortable && u.isDraggable && u.editModeEnabled && H.value ? (r(), s("td", {
          key: 0,
          "data-role": "drag-indicator",
          class: G(K.value),
          "data-i": u.i
        }, null, 10, Jt)) : u.sortable && u.editModeEnabled && H.value ? (r(), s("td", Qt)) : y("", !0),
        u.addNavigation && u.editModeEnabled ? (r(), s("td", Xt, [
          U("div", Yt, [
            ue(C, {
              palette: "table-nav",
              disabled: u.i === 0,
              onClick: T
            }, {
              default: R(() => [
                L.value ? (r(), g(Q(N.value), {
                  key: 0,
                  direction: "up"
                })) : (r(), s(M, { key: 1 }, [
                  k[3] || (k[3] = U("i", { class: "" }, null, -1)),
                  k[4] || (k[4] = oe(" UP "))
                ], 64))
              ]),
              _: 1
            }, 8, ["disabled"]),
            ue(C, {
              palette: "table-nav",
              disabled: u.latestRow,
              onClick: _
            }, {
              default: R(() => [
                L.value ? (r(), g(Q(N.value), {
                  key: 0,
                  direction: "down"
                })) : (r(), s(M, { key: 1 }, [
                  k[5] || (k[5] = U("i", { class: "" }, null, -1)),
                  k[6] || (k[6] = oe(" DOWN "))
                ], 64))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])) : y("", !0),
        u.displayHiddenColumnsIndicator ? (r(), s("td", {
          key: 3,
          onClick: k[0] || (k[0] = (V) => F(V, u.i)),
          "data-role": "show-more",
          class: G(u.hiddenIsVisible ? "state-open" : "")
        }, null, 2)) : y("", !0),
        v(S) && v(p)[`item-${u.i}`] ? (r(), s("td", {
          key: "td" + u.i,
          colspan: u.visibleColumns.length
        }, [
          $(u.$slots, `item-${u.i}`, {
            item: t.value,
            index: u.i
          })
        ], 8, Zt)) : v(f) && v(p).item ? (r(), s("td", {
          key: "td" + u.i,
          colspan: u.visibleColumns.length
        }, [
          $(u.$slots, "item", {
            item: t.value,
            index: u.i
          })
        ], 8, _t)) : (r(!0), s(M, { key: 6 }, z(u.visibleColumns, (V) => (r(), s(M, null, [
          v(Wt)(V, u.emptyColumns, t.value) ? (r(), s("td", {
            key: "td" + u.i,
            "data-column": V.key,
            colspan: v($e)(V, t.value),
            title: v(ie)(V, t.value, u.i, u.visibleColumns),
            class: G(v(tt)(V)),
            onClick: k[2] || (k[2] = (ee) => l(ee))
          }, [
            u.$slots[V.key] && v(Ht)(V, t.value) ? $(u.$slots, V.key, {
              key: 0,
              value: t.value[V.key],
              item: t.value,
              column: V,
              i: u.i
            }) : t.value ? (r(), g(lt, {
              key: 1,
              modelValue: t.value,
              "onUpdate:modelValue": k[1] || (k[1] = (ee) => t.value = ee),
              column: V,
              columns: u.visibleColumns,
              "edit-mode-enabled": u.editModeEnabled,
              "has-inline-edit-perm": u.hasInlineEditPerm,
              i: u.i
            }, null, 8, ["modelValue", "column", "columns", "edit-mode-enabled", "has-inline-edit-perm", "i"])) : y("", !0)
          ], 10, xt)) : y("", !0)
        ], 64))), 256)),
        u.canDrop && u.editModeEnabled ? (r(), s("td", el, [
          ue(Kt, {
            resource: u.dropResource,
            "resource-data": t.value,
            confirm: u.dropConfirm,
            text: u.dropText,
            icon: u.dropIcon,
            onClick: w
          }, null, 8, ["resource", "resource-data", "confirm", "text", "icon"])
        ])) : y("", !0),
        u.canEdit && u.editModeEnabled ? (r(), s("td", tl, [
          ue(zt, {
            "resource-data": t.value,
            text: u.editText,
            icon: u.editIcon,
            link: I.value,
            onClick: x
          }, null, 8, ["resource-data", "text", "icon", "link"])
        ])) : y("", !0)
      ], 10, Gt);
    };
  }
}), al = { "data-role": "hidden-row" }, ol = ["colspan"], nl = ["data-column"], rl = ["data-i"], ul = ["data-column", "title"], il = /* @__PURE__ */ Z({
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
    const p = m, n = o, a = h(n.modelValue), t = (c) => p("click", c);
    return P(() => n.modelValue, (c) => a.value = c), P(a, () => p("update:modelValue", a.value)), (c, S) => pe((r(), s("tr", al, [
      U("td", { colspan: c.hiddenColumnsColSpan }, [
        U("table", null, [
          U("tr", null, [
            (r(!0), s(M, null, z(c.hiddenColumns, (f) => (r(), s("th", {
              "data-column": f.key
            }, [
              U("div", null, Y(f.label), 1)
            ], 8, nl))), 256))
          ]),
          U("tr", { "data-i": c.i }, [
            (r(!0), s(M, null, z(c.hiddenColumns, (f, I) => (r(), s("td", {
              "data-column": f.key,
              title: v(ie)(f, a.value, I, c.hiddenColumns),
              onClick: S[1] || (S[1] = (l) => t(l))
            }, [
              c.$slots[f.key] ? $(c.$slots, f.key, {
                key: 0,
                value: a.value[f.key],
                item: a.value,
                column: f,
                i: I
              }) : (r(), g(lt, {
                key: 1,
                column: f,
                columns: c.hiddenColumns,
                modelValue: a.value,
                "onUpdate:modelValue": S[0] || (S[0] = (l) => a.value = l),
                i: I,
                "edit-mode-enabled": c.editModeEnabled,
                "has-inline-edit-perm": c.hasInlineEditPerm
              }, null, 8, ["column", "columns", "modelValue", "i", "edit-mode-enabled", "has-inline-edit-perm"]))
            ], 8, ul))), 256))
          ], 8, rl)
        ])
      ], 8, ol)
    ], 512)), [
      [ce, c.hiddenIsVisible]
    ]);
  }
}), Ze = /* @__PURE__ */ Z({
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
  setup(o, { emit: m }) {
    const p = m, n = o, a = i(() => E.createButtonSlot !== ""), t = i(() => E.createButtonSlot), c = {
      ...n.modalData,
      beforeClose: (f) => {
        "itemCreated" in f && f.itemCreated === !0 && p("append", f.item);
      }
    }, S = () => {
      if (!n.modal) {
        p("click");
        return;
      }
    };
    return (f, I) => {
      const l = j("lkt-button");
      return r(), g(l, {
        palette: "table-create",
        disabled: f.disabled,
        icon: a.value ? "" : f.icon,
        text: a.value ? "" : f.text,
        modal: f.modal,
        "modal-data": c,
        "on-click-to": f.to,
        onClick: S
      }, {
        default: R(() => [
          a.value ? (r(), g(Q(t.value), { key: 0 })) : y("", !0)
        ]),
        _: 1
      }, 8, ["disabled", "icon", "text", "modal", "on-click-to"]);
    };
  }
}), sl = ["data-column", "data-sortable", "data-sort", "colspan", "title"], dl = /* @__PURE__ */ Z({
  __name: "TableHeader",
  props: {
    column: { default: () => new we() },
    sortBy: { default: "" },
    sortDirection: { default: "" },
    amountOfColumns: { default: 0 },
    items: { default: () => [] }
  },
  emits: ["click"],
  setup(o, { emit: m }) {
    const p = m, n = o, a = i(() => Ot(n.column, n.amountOfColumns, n.items)), t = i(() => n.column.sortable === !0), c = i(() => t.value && n.sortBy === n.column.key ? n.sortDirection : ""), S = i(() => n.column.label.startsWith("__:") ? ve(n.column.label.substring(3)) : n.column.label), f = () => p("click", n.column);
    return (I, l) => (r(), s("th", {
      "data-column": I.column.key,
      "data-sortable": t.value,
      "data-sort": c.value,
      colspan: a.value,
      title: S.value,
      class: G(v(tt)(I.column)),
      onClick: f
    }, [
      U("div", null, Y(S.value), 1)
    ], 10, sl));
  }
}), ml = ["id"], pl = {
  key: 0,
  class: "lkt-table-page-buttons"
}, cl = { key: 1 }, fl = { class: "switch-edition-mode" }, vl = {
  key: 1,
  class: "lkt-table-page-buttons"
}, yl = {
  key: 2,
  class: "lkt-table-page-filters"
}, bl = ["data-sortable"], kl = { key: 0 }, hl = {
  key: 0,
  "data-role": "drag-indicator"
}, gl = { key: 1 }, Cl = { key: 2 }, Dl = {
  key: 3,
  class: "lkt-table-col-drop"
}, Bl = {
  key: 4,
  class: "lkt-table-col-edit"
}, Sl = ["id"], Il = ["id"], Tl = ["data-i"], Vl = ["data-i"], El = {
  key: 4,
  class: "lkt-table-empty"
}, wl = {
  key: 5,
  class: "lkt-table-page-buttons lkt-table-page-buttons-bottom"
}, $l = /* @__PURE__ */ Z({
  __name: "LktTable",
  props: /* @__PURE__ */ Rt({
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
    draggableChecker: { type: Function },
    checkValidDrag: { type: Function },
    renderDrag: { type: [Boolean, Function] },
    disabledDrag: { type: [Boolean, Function] },
    draggableItemKey: {},
    header: {},
    title: {},
    titleTag: {},
    titleIcon: {},
    headerClass: {},
    saveButton: {},
    createButton: {},
    dropButton: {},
    wrapContentTag: {},
    wrapContentClass: {},
    itemsContainerClass: {},
    hiddenSave: { type: Boolean },
    saveDisabled: { type: Boolean },
    saveValidator: { type: Function },
    saveConfirm: {},
    confirmData: {},
    saveResource: {},
    saveResourceData: {},
    saveTooltipEngine: {},
    splitSave: { type: Boolean },
    saveText: {},
    createText: {},
    createIcon: {},
    createRoute: {},
    dropText: {},
    dropIcon: {},
    editText: {},
    editIcon: {},
    editLink: {},
    editModeText: {},
    switchEditionEnabled: { type: Boolean },
    createDisabled: { type: Boolean },
    dropConfirm: {},
    dropResource: {},
    addNavigation: { type: Boolean },
    createEnabledValidator: { type: Function },
    newValueGenerator: { type: Function },
    requiredItemsForTopCreate: {},
    requiredItemsForBottomCreate: {},
    slotItemVar: {},
    modal: {},
    modalData: {}
  }, Ft(Pt)),
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
  setup(o, { expose: m, emit: p }) {
    const n = p, a = xe(), t = o, c = {}, S = h(typeof t.sorter == "function" ? t.sorter : At), f = h(qt(t.columns)), I = h(fe.Asc), l = h(t.modelValue), F = h(c), K = h(null), L = h(t.columns), N = h(t.page), T = h(t.loading), _ = h(!1), w = h(t.perms), x = h(null), H = h(null), u = h({}), k = h(new Nt({ items: l.value }, t.dataStateConfig)), C = h(t.editMode), V = h(0), ee = h(null), ne = h(!1);
    P(T, (e) => n("update:loading", e)), P(N, (e) => n("page", e));
    const at = (e) => {
      w.value = e;
    }, ot = (e) => {
      Array.isArray(e.data) && (l.value = e.data), T.value = !1, _.value = !0, k.value.store({ items: l.value }).turnStoredIntoOriginal(), ne.value = !1, Ee(() => {
        n("read-response", e);
      });
    }, nt = () => Ee(() => T.value = !0), rt = () => {
      x.value.doRefresh();
    }, se = Lt(12), De = i(() => {
      if (!t.hideEmptyColumns) return [];
      let e = [];
      return L.value.forEach((d) => {
        let D = d.key, A = !1;
        l.value.forEach((W) => {
          if (typeof W.checkEmpty == "function")
            return W.checkEmpty(W);
          W[D] && (A = !0);
        }), A || e.push(D);
      }), e;
    }), ye = i(() => L.value.filter((e) => !e.hidden)), Be = i(() => L.value.filter((e) => e.hidden)), ut = i(() => {
      let e = ye.value.length + 1;
      return t.sortable && ++e, e;
    }), it = i(() => L.value.filter((e) => e.isForRowKey)), Re = i(() => Be.value.length > 0 && !t.sortable), st = i(() => L.value.map((e) => e.key)), Me = i(() => {
      let e = [];
      for (let d in a) st.value.indexOf(d) !== -1 && e.push(d);
      return e;
    }), Fe = i(() => t.hiddenSave || T.value || !t.saveResource ? !1 : C.value && ne.value ? !0 : C.value), dt = i(() => he.value && l.value.length >= t.requiredItemsForTopCreate || t.switchEditionEnabled ? !0 : Fe.value || C.value && de.value), mt = i(() => t.saveDisabled || typeof t.saveValidator == "function" && !t.saveValidator(l.value) ? !1 : ne.value), pt = i(() => l.value.length), ct = i(() => ({
      items: l.value,
      ...t.saveResourceData
    })), ft = i(() => t.titleTag === "" ? "h2" : t.titleTag), vt = i(() => t.wrapContentTag === "" ? "div" : t.wrapContentTag), Se = i(() => t.title.startsWith("__:") ? ve(t.title.substring(3)) : t.title), yt = i(() => t.saveText.startsWith("__:") ? ve(t.saveText.substring(3)) : t.saveText), bt = i(() => t.editModeText.startsWith("__:") ? ve(t.editModeText.substring(3)) : t.editModeText), de = i(() => w.value.includes(X.Create)), Pe = i(() => w.value.includes("read")), be = i(() => w.value.includes(X.Update)), Le = i(() => w.value.includes(X.Edit)), Ne = i(() => w.value.includes(X.InlineEdit)), kt = i(() => w.value.includes(X.ModalCreate)), ht = i(() => w.value.includes(X.InlineCreate)), Ue = i(() => w.value.includes(X.InlineCreateEver)), ke = i(() => w.value.includes(X.Drop)), gt = (e) => {
      let d = e.target;
      if (typeof d.dataset.column > "u")
        do
          d = d.parentNode;
        while (typeof d.dataset.column > "u" && d.tagName !== "TABLE" && d.tagName !== "body");
      if (d.tagName === "TD" && (d = d.parentNode, d = d.dataset.i, typeof d < "u"))
        return l.value[d];
    }, Ct = (e) => l.value[e], Dt = (e) => {
      var d;
      return (d = K.value) == null ? void 0 : d.querySelector(`[data-i="${e}"]`);
    }, Ae = (e) => F.value["tr_" + e] === !0, Oe = (e) => {
      e && e.sortable && (l.value = l.value.sort((d, D) => S.value(d, D, e, I.value)), I.value = I.value === fe.Asc ? fe.Desc : fe.Asc, f.value = e.key, n("sort", [f.value, I.value]));
    }, He = (e) => {
      n("click", e);
    }, We = (e, d) => {
      let D = "tr_" + d;
      F.value[D] = typeof F.value[D] > "u" ? !0 : !F.value[D];
    }, Bt = (e) => {
      var D, A, W, q;
      let d = parseInt((q = (W = (A = (D = e == null ? void 0 : e.originalEvent) == null ? void 0 : D.toElement) == null ? void 0 : A.closest("tr")) == null ? void 0 : W.dataset) == null ? void 0 : q.i);
      return typeof t.disabledDrag == "function" && t.disabledDrag(l.value[d]) || typeof t.disabledDrag == "boolean" && t.disabledDrag ? !1 : typeof t.checkValidDrag == "function" ? t.checkValidDrag(e) : !0;
    }, qe = (e) => typeof t.draggableChecker == "function" ? t.draggableChecker(e) : !0, je = () => {
      if (de.value) {
        n("click-create");
        return;
      }
      if (Ue.value)
        n("click-create");
      else {
        if (typeof t.newValueGenerator == "function") {
          let e = t.newValueGenerator();
          if (typeof e == "object" || t.type !== me.Table) {
            l.value.push(e);
            return;
          }
        }
        l.value.push({});
      }
    }, Ke = (e) => {
      l.value.push(e);
    }, ze = () => {
      T.value = !0;
    }, Ge = () => {
      T.value = !1;
    }, St = (e, d) => {
      if (n("before-save"), t.saveResource && (T.value = !1, !d.success)) {
        n("error", d.httpStatus);
        return;
      }
      k.value.turnStoredIntoOriginal(), ne.value = !1, n("save", d);
    }, Je = (e, d, D) => {
      if (D >= e.length) {
        let A = D - e.length + 1;
        for (; A--; ) e.push(void 0);
      }
      return e.splice(D, 0, e.splice(d, 1)[0]), e;
    }, It = (e) => {
      Je(l.value, e, e - 1), V.value = Ce();
    }, Tt = (e) => {
      Je(l.value, e, e + 1), V.value = Ce();
    }, Ie = (e) => {
      l.value.splice(e, 1), V.value = Ce();
    }, Vt = () => {
      var e;
      u.value && typeof ((e = u.value) == null ? void 0 : e.destroy) == "function" && (u.value.destroy(), u.value = {});
    }, Qe = () => {
      ee.value || (ee.value = document.getElementById("lkt-table-body-" + se)), u.value = new Ut(ee.value, {
        direction: "vertical",
        handle: ".handle",
        animation: 150,
        onEnd: function(e) {
          let d = e.oldIndex, D = e.newIndex;
          l.value.splice(D, 0, l.value.splice(d, 1)[0]), V.value = Ce(), n("drag-end", l.value[D]);
        },
        onMove: function(e, d) {
          return Bt(e);
        }
      });
    }, Te = (e, d, D = !1) => {
      let A = [V.value, se, "row", d];
      return D && A.push("hidden"), it.value.forEach((W) => {
        let q = String(e[W.key]).toLowerCase();
        q.length > 50 && (q = q.substring(0, 50)), q = et(q, " ", "-"), A.push(q);
      }), A.join("-");
    }, Xe = i(() => typeof t.createEnabledValidator == "function" ? t.createEnabledValidator({ items: l.value }) : !0), he = i(() => Ue.value || de.value && C.value || ht.value && C.value || kt.value && C.value), Et = i(() => [me.Ol, me.Ul].includes(t.type)), Ve = (e, d) => typeof t.itemDisplayChecker == "function" ? t.itemDisplayChecker(e) : !0;
    Mt(() => {
      t.initialSorting && Oe(jt(t.columns, f.value)), k.value.store({ items: l.value }).turnStoredIntoOriginal(), ne.value = !1, t.sortable && Ee(() => {
        Qe();
      });
    }), P(() => t.sortable, (e) => {
      e ? Qe() : Vt();
    }), P(() => t.perms, (e) => w.value = e), P(w, (e) => n("update:perms", e)), P(() => t.editMode, (e) => C.value = e), P(() => t.columns, (e) => L.value = e, { deep: !0 }), P(() => t.modelValue, (e) => l.value = e, { deep: !0 }), P(l, (e) => {
      k.value.increment({ items: e }), ne.value = k.value.changed(), n("update:modelValue", e);
    }, { deep: !0 }), m({
      getItemByEvent: gt,
      getItemByIndex: Ct,
      getRowByIndex: Dt,
      doRefresh: rt,
      getHtml: () => H.value
    });
    const wt = i(() => typeof E.defaultEmptySlot < "u"), $t = i(() => E.defaultEmptySlot);
    return (e, d) => {
      const D = j("lkt-button"), A = j("lkt-field"), W = j("lkt-loader"), q = j("lkt-paginator");
      return r(), s("section", {
        ref_key: "element",
        ref: H,
        class: "lkt-table-page",
        id: "lkt-table-page-" + v(se)
      }, [
        Se.value || v(a).title ? (r(), s("header", {
          key: 0,
          class: G(e.headerClass)
        }, [
          Se.value ? (r(), g(Q(ft.value), { key: 0 }, {
            default: R(() => [
              e.titleIcon ? (r(), s("i", {
                key: 0,
                class: G(e.titleIcon)
              }, null, 2)) : y("", !0),
              oe(" " + Y(Se.value), 1)
            ]),
            _: 1
          })) : y("", !0),
          v(a).title ? $(e.$slots, "title", { key: 1 }) : y("", !0)
        ], 2)) : y("", !0),
        (r(), g(Q(vt.value), {
          class: G(["lkt-table-page-content-wrapper", e.wrapContentClass])
        }, {
          default: R(() => [
            dt.value ? (r(), s("div", pl, [
              pe(ue(D, {
                class: "lkt-table--save-button",
                ref: "saveButton",
                icon: v(E).defaultSaveIcon,
                disabled: !mt.value,
                "confirm-modal": e.saveConfirm,
                "confirm-data": e.confirmData,
                resource: e.saveResource,
                "resource-data": ct.value,
                split: e.splitSave,
                "tooltip-engine": e.saveTooltipEngine,
                onLoading: ze,
                onLoaded: Ge,
                onClick: St
              }, {
                split: R(({ doClose: B, doRootClick: b }) => [
                  $(e.$slots, "button-save-split", {
                    doClose: B,
                    doRootClick: b,
                    dataState: k.value,
                    onButtonLoading: ze,
                    onButtonLoaded: Ge
                  })
                ]),
                default: R(() => [
                  v(a)["button-save"] ? $(e.$slots, "button-save", {
                    key: 0,
                    items: l.value,
                    editMode: e.editMode,
                    canUpdate: !e.saveDisabled
                  }) : (r(), s("span", cl, Y(yt.value), 1))
                ]),
                _: 3
              }, 8, ["icon", "disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "split", "tooltip-engine"]), [
                [ce, Fe.value]
              ]),
              he.value && l.value.length >= e.requiredItemsForTopCreate ? (r(), g(Ze, {
                key: 0,
                disabled: !Xe.value || e.createDisabled,
                text: e.createText,
                icon: e.createIcon,
                to: e.createRoute,
                modal: e.modal,
                "modal-data": e.modalData,
                onClick: je,
                onAppend: Ke
              }, null, 8, ["disabled", "text", "icon", "to", "modal", "modal-data"])) : y("", !0),
              U("div", fl, [
                pe(ue(A, {
                  type: "switch",
                  modelValue: C.value,
                  "onUpdate:modelValue": d[0] || (d[0] = (B) => C.value = B),
                  label: bt.value
                }, null, 8, ["modelValue", "label"]), [
                  [ce, e.switchEditionEnabled]
                ])
              ])
            ])) : y("", !0),
            v(a).buttons ? (r(), s("div", vl, [
              $(e.$slots, "buttons")
            ])) : y("", !0),
            _.value && v(a).filters ? (r(), s("div", yl, [
              $(e.$slots, "filters", {
                items: l.value,
                isLoading: T.value
              })
            ])) : y("", !0),
            T.value ? (r(), g(W, { key: 3 })) : y("", !0),
            pe(U("div", {
              class: "lkt-table",
              "data-sortable": e.sortable
            }, [
              e.type === v(me).Table ? (r(), s("table", kl, [
                U("thead", null, [
                  U("tr", null, [
                    e.sortable && C.value ? (r(), s("th", hl)) : y("", !0),
                    e.addNavigation && C.value ? (r(), s("th", gl)) : y("", !0),
                    Re.value ? (r(), s("th", Cl)) : y("", !0),
                    (r(!0), s(M, null, z(ye.value, (B) => (r(), s(M, null, [
                      De.value.indexOf(B.key) === -1 ? (r(), g(dl, {
                        key: 0,
                        column: B,
                        "sort-by": f.value,
                        "sort-direction": I.value,
                        "amount-of-columns": e.columns.length,
                        items: l.value,
                        onClick: (b) => Oe(B)
                      }, null, 8, ["column", "sort-by", "sort-direction", "amount-of-columns", "items", "onClick"])) : y("", !0)
                    ], 64))), 256)),
                    ke.value && C.value ? (r(), s("th", Dl)) : y("", !0),
                    Le.value && be.value && C.value ? (r(), s("th", Bl)) : y("", !0)
                  ])
                ]),
                U("tbody", {
                  ref_key: "tableBody",
                  ref: K,
                  id: "lkt-table-body-" + v(se)
                }, [
                  (r(!0), s(M, null, z(l.value, (B, b) => pe((r(), g(ll, {
                    modelValue: l.value[b],
                    "onUpdate:modelValue": (O) => l.value[b] = O,
                    key: Te(B, b),
                    i: b,
                    "display-hidden-columns-indicator": Re.value,
                    "is-draggable": qe(B),
                    sortable: e.sortable,
                    "visible-columns": ye.value,
                    "empty-columns": De.value,
                    "add-navigation": e.addNavigation,
                    "hidden-is-visible": Ae(b),
                    "latest-row": b + 1 === pt.value,
                    "can-drop": ke.value && C.value,
                    "drop-confirm": e.dropConfirm,
                    "drop-resource": e.dropResource,
                    "drop-text": e.dropText,
                    "drop-icon": e.dropIcon,
                    "can-edit": Le.value && be.value && C.value,
                    "edit-text": e.editText,
                    "edit-icon": e.editIcon,
                    "edit-link": e.editLink,
                    "edit-mode-enabled": C.value,
                    "has-inline-edit-perm": Ne.value,
                    "row-display-type": e.rowDisplayType,
                    "render-drag": e.renderDrag,
                    "disabled-drag": e.disabledDrag,
                    onClick: He,
                    onShow: We,
                    onItemUp: It,
                    onItemDown: Tt,
                    onItemDrop: Ie
                  }, Ye({ _: 2 }, [
                    v(a)[`item-${b}`] ? {
                      name: `item-${b}`,
                      fn: R((O) => [
                        $(e.$slots, `item-${b}`, ae({
                          [e.slotItemVar || ""]: O.item,
                          index: b
                        }))
                      ]),
                      key: "0"
                    } : v(a).item ? {
                      name: "item",
                      fn: R((O) => [
                        $(e.$slots, "item", ae({
                          [e.slotItemVar || ""]: O.item,
                          index: b
                        }))
                      ]),
                      key: "1"
                    } : void 0,
                    z(Me.value, (O) => ({
                      name: O,
                      fn: R((te) => [
                        $(e.$slots, O, ae({
                          [e.slotItemVar || ""]: te.item,
                          value: te.value,
                          column: te.column
                        }))
                      ])
                    }))
                  ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "display-hidden-columns-indicator", "is-draggable", "sortable", "visible-columns", "empty-columns", "add-navigation", "hidden-is-visible", "latest-row", "can-drop", "drop-confirm", "drop-resource", "drop-text", "drop-icon", "can-edit", "edit-text", "edit-icon", "edit-link", "edit-mode-enabled", "has-inline-edit-perm", "row-display-type", "render-drag", "disabled-drag"])), [
                    [ce, Ve(l.value[b])]
                  ])), 128)),
                  Be.value.length > 0 ? (r(!0), s(M, { key: 0 }, z(l.value, (B, b) => (r(), g(il, {
                    modelValue: l.value[b],
                    "onUpdate:modelValue": (O) => l.value[b] = O,
                    key: Te(B, b, !0),
                    i: b,
                    "hidden-columns": Be.value,
                    "hidden-columns-col-span": ut.value,
                    "is-draggable": qe(B),
                    sortable: e.sortable,
                    "visible-columns": ye.value,
                    "empty-columns": De.value,
                    "hidden-is-visible": Ae(b),
                    "edit-mode-enabled": C.value,
                    "has-inline-edit-perm": Ne.value,
                    onClick: He,
                    onShow: We
                  }, Ye({ _: 2 }, [
                    z(Me.value, (O) => ({
                      name: O,
                      fn: R((te) => [
                        $(e.$slots, O, ae({
                          [e.slotItemVar || ""]: te.item,
                          value: te.value,
                          column: te.column
                        }))
                      ])
                    }))
                  ]), 1032, ["modelValue", "onUpdate:modelValue", "i", "hidden-columns", "hidden-columns-col-span", "is-draggable", "sortable", "visible-columns", "empty-columns", "hidden-is-visible", "edit-mode-enabled", "has-inline-edit-perm"]))), 128)) : y("", !0)
                ], 8, Sl)
              ])) : e.type === v(me).Item ? (r(), s("div", {
                key: 1,
                ref_key: "tableBody",
                ref: K,
                id: "lkt-table-body-" + v(se),
                class: G(["lkt-table-items-container", e.itemsContainerClass])
              }, [
                (r(!0), s(M, null, z(l.value, (B, b) => (r(), s(M, null, [
                  Ve(B) ? (r(), s("div", {
                    class: "lkt-table-item",
                    "data-i": b,
                    key: Te(B, b)
                  }, [
                    $(e.$slots, "item", ae({
                      [e.slotItemVar || ""]: B,
                      index: b,
                      editing: C.value,
                      canCreate: de.value,
                      canRead: Pe.value,
                      canUpdate: be.value,
                      canDrop: ke.value,
                      isLoading: T.value,
                      doDrop: () => Ie(b)
                    }))
                  ], 8, Tl)) : y("", !0)
                ], 64))), 256))
              ], 10, Il)) : Et.value ? (r(), g(Q(e.type), {
                key: 2,
                class: G(["lkt-table-items-container", e.itemsContainerClass])
              }, {
                default: R(() => [
                  (r(!0), s(M, null, z(l.value, (B, b) => (r(), s(M, null, [
                    Ve(B) ? (r(), s("li", {
                      key: 0,
                      class: "lkt-table-item",
                      "data-i": b
                    }, [
                      $(e.$slots, "item", ae({
                        [e.slotItemVar || ""]: B,
                        index: b,
                        editing: C.value,
                        canCreate: de.value,
                        canRead: Pe.value,
                        canUpdate: be.value,
                        canDrop: ke.value,
                        isLoading: T.value,
                        doDrop: () => Ie(b)
                      }))
                    ], 8, Vl)) : y("", !0)
                  ], 64))), 256))
                ]),
                _: 3
              }, 8, ["class"])) : y("", !0)
            ], 8, bl), [
              [ce, !T.value && l.value.length > 0]
            ]),
            !T.value && l.value.length === 0 ? (r(), s("div", El, [
              v(a).empty ? $(e.$slots, "empty", { key: 0 }) : wt.value ? (r(), g(Q($t.value), {
                key: 1,
                message: e.noResultsText
              }, null, 8, ["message"])) : e.noResultsText ? (r(), s(M, { key: 2 }, [
                oe(Y(e.noResultsText), 1)
              ], 64)) : y("", !0)
            ])) : y("", !0),
            he.value || v(a).bottomButtons ? (r(), s("div", wl, [
              he.value && l.value.length >= e.requiredItemsForBottomCreate ? (r(), g(Ze, {
                key: 0,
                disabled: !Xe.value || e.createDisabled,
                text: e.createText,
                icon: e.createIcon,
                to: e.createRoute,
                modal: e.modal,
                "modal-data": e.modalData,
                onClick: je,
                onAppend: Ke
              }, null, 8, ["disabled", "text", "icon", "to", "modal", "modal-data"])) : y("", !0),
              $(e.$slots, "bottom-buttons")
            ])) : y("", !0),
            e.resource.length > 0 ? (r(), g(q, {
              key: 6,
              ref_key: "paginator",
              ref: x,
              modelValue: N.value,
              "onUpdate:modelValue": d[1] || (d[1] = (B) => N.value = B),
              resource: e.resource,
              filters: e.filters,
              onLoading: nt,
              onPerms: at,
              onResponse: ot
            }, null, 8, ["modelValue", "resource", "filters"])) : y("", !0)
          ]),
          _: 3
        }, 8, ["class"]))
      ], 8, ml);
    };
  }
}), Ol = {
  install: (o) => {
    o.component("lkt-table") === void 0 && o.component("lkt-table", $l);
  }
}, Hl = (o) => (E.navButtonSlot = o, !0), Wl = (o) => (E.dropButtonSlot = o, !0), ql = (o) => (E.createButtonSlot = o, !0), jl = (o) => {
  E.defaultEmptySlot = o;
}, Kl = (o) => {
  E.defaultSaveIcon = o;
};
export {
  Jl as Column,
  Al as createColumn,
  Ol as default,
  ql as setTableCreateButtonSlot,
  Wl as setTableDropButtonSlot,
  jl as setTableEmptySlot,
  Hl as setTableNavButtonSlot,
  Kl as setTableSaveIcon
};
