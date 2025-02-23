import { Column, LktObject } from "lkt-vue-kernel";
type __VLS_Props = {
    column: Column;
    sortBy: string;
    sortDirection: string;
    amountOfColumns: number;
    items: LktObject[];
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClick?: ((...args: any[]) => any) | undefined;
}>, {
    column: Column;
    sortBy: string;
    sortDirection: string;
    amountOfColumns: number;
    items: LktObject[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
