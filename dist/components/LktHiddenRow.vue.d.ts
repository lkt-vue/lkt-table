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
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: Partial<Record<string, (_: {
        value: any;
        item: LktObject;
        column: Column;
        i: number;
    }) => any>>;
    refs: {};
    rootEl: HTMLTableRowElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    click: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onClick?: ((...args: any[]) => any) | undefined;
}>, {
    sortable: boolean;
    modelValue: LktObject;
    i: number;
    editModeEnabled: boolean;
    hasInlineEditPerm: boolean;
    isDraggable: boolean;
    hiddenIsVisible: boolean;
    visibleColumns: Column[];
    emptyColumns: string[];
    hiddenColumnsColSpan: number;
    hiddenColumns: Column[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, HTMLTableRowElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
