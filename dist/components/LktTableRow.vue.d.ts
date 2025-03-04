import { canRenderColumn, colPreferSlot, getColumnClasses, getColumnDisplayContent, getHorizontalColSpan } from "../functions/table-functions";
import LktTableCell from "./LktTableCell.vue";
import DropButtonComponent from "./DropButtonComponent.vue";
import EditButtonComponent from "./EditButtonComponent.vue";
import { ButtonConfig, Column, LktObject, ValidTableRowTypeValue } from "lkt-vue-kernel";
declare const slots: Readonly<{
    [name: string]: import("vue").Slot<any> | undefined;
}>;
type __VLS_Props = {
    modelValue: LktObject;
    editButton: ButtonConfig;
    dropButton: ButtonConfig;
    isDraggable: boolean;
    sortable: boolean;
    displayHiddenColumnsIndicator: boolean;
    hiddenIsVisible: boolean;
    addNavigation: boolean;
    latestRow: boolean;
    canDrop: boolean;
    canEdit: boolean;
    editModeEnabled: boolean;
    hasInlineEditPerm: boolean;
    i: number;
    visibleColumns: Column[];
    emptyColumns: string[];
    rowDisplayType: ValidTableRowTypeValue;
    renderDrag?: boolean | Function;
    disabledDrag?: boolean | Function;
};
declare const Item: import("vue").Ref<LktObject, LktObject>;
declare const canCustomItem: boolean;
declare const canItem: boolean;
declare const onClick: ($event: any) => void, onShow: ($event: any, i: any) => void, classes: import("vue").ComputedRef<string>, hasNavButtonSlot: import("vue").ComputedRef<boolean>, navButtonSlot: import("vue").ComputedRef<string | import("vue").Component>, onClickUp: () => void, onClickDown: () => void, onClickDrop: () => void, onClickEdit: () => void;
declare const canRenderDragIndicator: import("vue").ComputedRef<any>;
declare const __VLS_ctx: InstanceType<__VLS_PickNotAny<typeof __VLS_self, new () => {}>>;
declare var __VLS_26: `item-${number}`, __VLS_27: {
    item: LktObject;
    index: number;
}, __VLS_29: {
    item: LktObject;
    index: number;
}, __VLS_32: string, __VLS_33: {
    value: any;
    item: LktObject;
    column: Column;
    i: number;
};
type __VLS_Slots = __VLS_PrettifyGlobal<__VLS_OmitStringIndex<typeof __VLS_ctx.$slots> & {
    [K in NonNullable<typeof __VLS_26>]?: (props: typeof __VLS_27) => any;
} & {
    [K in NonNullable<typeof __VLS_32>]?: (props: typeof __VLS_33) => any;
} & {
    item?: (props: typeof __VLS_29) => any;
}>;
declare const __VLS_self: import("vue").DefineComponent<__VLS_Props, {
    canRenderColumn: typeof canRenderColumn;
    colPreferSlot: typeof colPreferSlot;
    getColumnClasses: typeof getColumnClasses;
    getColumnDisplayContent: typeof getColumnDisplayContent;
    getHorizontalColSpan: typeof getHorizontalColSpan;
    LktTableCell: typeof LktTableCell;
    DropButtonComponent: typeof DropButtonComponent;
    EditButtonComponent: typeof EditButtonComponent;
    slots: typeof slots;
    Item: typeof Item;
    canCustomItem: typeof canCustomItem;
    canItem: typeof canItem;
    onClick: typeof onClick;
    onShow: typeof onShow;
    classes: typeof classes;
    hasNavButtonSlot: typeof hasNavButtonSlot;
    navButtonSlot: typeof navButtonSlot;
    onClickUp: typeof onClickUp;
    onClickDown: typeof onClickDown;
    onClickDrop: typeof onClickDrop;
    onClickEdit: typeof onClickEdit;
    canRenderDragIndicator: typeof canRenderDragIndicator;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    click: (...args: any[]) => void;
    show: (...args: any[]) => void;
    "item-up": (...args: any[]) => void;
    "item-down": (...args: any[]) => void;
    "item-drop": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onClick?: ((...args: any[]) => any) | undefined;
    onShow?: ((...args: any[]) => any) | undefined;
    "onItem-up"?: ((...args: any[]) => any) | undefined;
    "onItem-down"?: ((...args: any[]) => any) | undefined;
    "onItem-drop"?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: LktObject;
    i: number;
    editModeEnabled: boolean;
    isDraggable: boolean;
    sortable: boolean;
    displayHiddenColumnsIndicator: boolean;
    hiddenIsVisible: boolean;
    addNavigation: boolean;
    latestRow: boolean;
    canDrop: boolean;
    canEdit: boolean;
    visibleColumns: Column[];
    emptyColumns: string[];
    rowDisplayType: ValidTableRowTypeValue;
    renderDrag: boolean | Function;
    disabledDrag: boolean | Function;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    click: (...args: any[]) => void;
    show: (...args: any[]) => void;
    "item-up": (...args: any[]) => void;
    "item-down": (...args: any[]) => void;
    "item-drop": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onClick?: ((...args: any[]) => any) | undefined;
    onShow?: ((...args: any[]) => any) | undefined;
    "onItem-up"?: ((...args: any[]) => any) | undefined;
    "onItem-down"?: ((...args: any[]) => any) | undefined;
    "onItem-drop"?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: LktObject;
    i: number;
    editModeEnabled: boolean;
    isDraggable: boolean;
    sortable: boolean;
    displayHiddenColumnsIndicator: boolean;
    hiddenIsVisible: boolean;
    addNavigation: boolean;
    latestRow: boolean;
    canDrop: boolean;
    canEdit: boolean;
    visibleColumns: Column[];
    emptyColumns: string[];
    rowDisplayType: ValidTableRowTypeValue;
    renderDrag: boolean | Function;
    disabledDrag: boolean | Function;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
