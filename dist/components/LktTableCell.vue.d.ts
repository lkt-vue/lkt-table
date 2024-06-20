import { LktTableColumn } from "../instances/LktTableColumn";
import { LktObject } from "lkt-ts-interfaces";
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue: LktObject;
    column: LktTableColumn;
    columns: LktTableColumn[];
    i: number;
}>, {
    modelValue: () => {};
    column: () => {};
    columns: () => never[];
    i: number;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    edited: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue: LktObject;
    column: LktTableColumn;
    columns: LktTableColumn[];
    i: number;
}>, {
    modelValue: () => {};
    column: () => {};
    columns: () => never[];
    i: number;
}>>> & {
    onEdited?: ((...args: any[]) => any) | undefined;
}, {
    columns: LktTableColumn[];
    i: number;
    column: LktTableColumn;
    modelValue: LktObject;
}, {}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
