import { ButtonConfig } from "lkt-vue-kernel";
type __VLS_Props = {
    config?: ButtonConfig;
    disabled?: boolean;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (...args: any[]) => void;
    append: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClick?: ((...args: any[]) => any) | undefined;
    onAppend?: ((...args: any[]) => any) | undefined;
}>, {
    disabled: boolean;
    config: ButtonConfig;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
