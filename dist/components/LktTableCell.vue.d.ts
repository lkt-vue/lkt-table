import { Column, LktObject, TableType } from "lkt-vue-kernel";
type __VLS_Props = {
    modelValue: LktObject;
    column: Column;
    columns: Column[];
    i: number;
    editModeEnabled: boolean;
    hasInlineEditPerm: boolean;
    tableType: TableType;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: LktObject;
    column: Column;
    columns: Column[];
    i: number;
    editModeEnabled: boolean;
    hasInlineEditPerm: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
