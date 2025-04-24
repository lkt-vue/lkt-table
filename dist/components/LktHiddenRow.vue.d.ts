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
declare var __VLS_2: string, __VLS_3: {
    value: any;
    item: LktObject;
    column: Column;
    i: number;
};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_2>]?: (props: typeof __VLS_3) => any;
};
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
