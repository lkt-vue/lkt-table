import { Component } from "vue";
import { Column, LktObject, TablePermission, ValidTableRowTypeValue } from "lkt-vue-kernel";
type __VLS_Props = {
    modelValue: LktObject;
    isDraggable: boolean;
    sortable: boolean;
    isLoading: boolean;
    addNavigation: boolean;
    latestRow: boolean;
    canDrop: boolean;
    canEdit: boolean;
    canCreate: boolean;
    canRead: boolean;
    editModeEnabled: boolean;
    hasInlineEditPerm: boolean;
    i: number;
    visibleColumns: Column[];
    emptyColumns: string[];
    rowDisplayType: ValidTableRowTypeValue;
    renderDrag?: boolean | Function;
    disabledDrag?: boolean | Function;
    itemContainerClass?: string | Function;
    itemSlotComponent?: string | Function | Component;
    itemSlotData?: LktObject | Function;
    itemSlotEvents?: LktObject | Function;
    permissions?: Array<TablePermission>;
};
declare var __VLS_26: string, __VLS_27: {
    value: any;
    item: LktObject;
    column: Column;
    i: number;
    index: number;
    editing: boolean;
    canCreate: boolean;
    canRead: boolean;
    canUpdate: boolean;
    canDrop: boolean;
    isLoading: boolean;
    doDrop: () => void;
}, __VLS_41: `item-${number}`, __VLS_42: {
    item: LktObject;
    index: number;
    editing: boolean;
    canCreate: boolean;
    canRead: boolean;
    canUpdate: boolean;
    canDrop: boolean;
    isLoading: boolean;
    doDrop: () => void;
}, __VLS_44: {
    item: LktObject;
    index: number;
    editing: boolean;
    canCreate: boolean;
    canRead: boolean;
    canUpdate: boolean;
    canDrop: boolean;
    isLoading: boolean;
    doDrop: () => void;
}, __VLS_47: string, __VLS_48: {
    value: any;
    item: LktObject;
    column: Column;
    i: number;
    index: number;
    editing: boolean;
    canCreate: boolean;
    canRead: boolean;
    canUpdate: boolean;
    canDrop: boolean;
    isLoading: boolean;
    doDrop: () => void;
}, __VLS_58: string, __VLS_59: {
    value: any;
    item: LktObject;
    column: Column;
    i: number;
    index: number;
    editing: boolean;
    canCreate: boolean;
    canRead: boolean;
    canUpdate: boolean;
    canDrop: boolean;
    isLoading: boolean;
    doDrop: () => void;
};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_26>]?: (props: typeof __VLS_27) => any;
} & {
    [K in NonNullable<typeof __VLS_41>]?: (props: typeof __VLS_42) => any;
} & {
    [K in NonNullable<typeof __VLS_47>]?: (props: typeof __VLS_48) => any;
} & {
    [K in NonNullable<typeof __VLS_58>]?: (props: typeof __VLS_59) => any;
} & {
    item?: (props: typeof __VLS_44) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    click: (...args: any[]) => void;
    "item-up": (...args: any[]) => void;
    "item-down": (...args: any[]) => void;
    "item-drop": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onClick?: ((...args: any[]) => any) | undefined;
    "onItem-up"?: ((...args: any[]) => any) | undefined;
    "onItem-down"?: ((...args: any[]) => any) | undefined;
    "onItem-drop"?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: LktObject;
    i: number;
    editModeEnabled: boolean;
    isDraggable: boolean;
    sortable: boolean;
    addNavigation: boolean;
    latestRow: boolean;
    canDrop: boolean;
    canEdit: boolean;
    visibleColumns: Column[];
    emptyColumns: string[];
    rowDisplayType: ValidTableRowTypeValue;
    renderDrag: boolean | Function;
    disabledDrag: boolean | Function;
    itemContainerClass: string | Function;
    permissions: Array<TablePermission>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
