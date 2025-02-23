import { getColumnDisplayContent } from "../functions/table-functions";
import LktTableCell from "./LktTableCell.vue";
import { LktObject, Column } from "lkt-vue-kernel";
type __VLS_Props = {
    modelValue: LktObject;
    isDraggable: boolean;
    sortable: boolean;
    hiddenIsVisible: boolean;
    i: number;
    hiddenColumnsColSpan: number;
    visibleColumns: Column[];
    hiddenColumns: Column[];
    emptyColumns: string[];
    editModeEnabled: boolean;
    hasInlineEditPerm: boolean;
};
declare const item: import("vue").Ref<LktObject, LktObject>;
declare const onClick: ($event: any) => void;
declare const __VLS_ctx: InstanceType<__VLS_PickNotAny<typeof __VLS_self, new () => {}>>;
declare var __VLS_2: string, __VLS_3: {
    value: any;
    item: LktObject;
    column: Column;
    i: number;
};
type __VLS_Slots = __VLS_PrettifyGlobal<__VLS_OmitStringIndex<typeof __VLS_ctx.$slots> & {
    [K in NonNullable<typeof __VLS_2>]?: (props: typeof __VLS_3) => any;
}>;
declare const __VLS_self: import("vue").DefineComponent<__VLS_Props, {
    getColumnDisplayContent: typeof getColumnDisplayContent;
    LktTableCell: typeof LktTableCell;
    item: typeof item;
    onClick: typeof onClick;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    click: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onClick?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: LktObject;
    i: number;
    editModeEnabled: boolean;
    hasInlineEditPerm: boolean;
    isDraggable: boolean;
    sortable: boolean;
    hiddenIsVisible: boolean;
    visibleColumns: Column[];
    emptyColumns: string[];
    hiddenColumnsColSpan: number;
    hiddenColumns: Column[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    click: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onClick?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: LktObject;
    i: number;
    editModeEnabled: boolean;
    hasInlineEditPerm: boolean;
    isDraggable: boolean;
    sortable: boolean;
    hiddenIsVisible: boolean;
    visibleColumns: Column[];
    emptyColumns: string[];
    hiddenColumnsColSpan: number;
    hiddenColumns: Column[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
