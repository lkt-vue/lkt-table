import { ModalConfig } from "lkt-vue-kernel";
type __VLS_Props = {
    disabled?: boolean;
    text?: string;
    icon?: string;
    to?: string;
    modal?: string;
    modalData?: Partial<ModalConfig>;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (...args: any[]) => void;
    append: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClick?: ((...args: any[]) => any) | undefined;
    onAppend?: ((...args: any[]) => any) | undefined;
}>, {
    to: string;
    disabled: boolean;
    modal: string;
    text: string;
    icon: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
