import { LktObject } from "lkt-vue-kernel";
type __VLS_Props = {
    disabled?: boolean;
    text: string;
    icon: string;
    confirm: string;
    resource: string;
    resourceData: LktObject;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClick?: ((...args: any[]) => any) | undefined;
}>, {
    text: string;
    disabled: boolean;
    confirm: string;
    icon: string;
    resource: string;
    resourceData: LktObject;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
