import { LktTableColumn } from "../instances/LktTableColumn";
import { PropType } from "vue/dist/vue";
declare const _default: {
    new (...args: any[]): import("vue/dist/vue").CreateComponentPublicInstance<Readonly<import("vue/dist/vue").ExtractPropTypes<{
        isDraggable: {
            type: BooleanConstructor;
            default: boolean;
        };
        sortable: {
            type: BooleanConstructor;
            default: boolean;
        };
        i: {
            type: NumberConstructor[];
            default: number;
        };
        displayHiddenColumnsIndicator: {
            type: BooleanConstructor;
            default: boolean;
        };
        visibleColumns: {
            type: PropType<LktTableColumn[]>;
            default: () => LktTableColumn[];
        };
        emptyColumns: {
            type: PropType<string[]>;
            default: () => string[];
        };
        hiddenIsVisible: {
            type: BooleanConstructor;
            default: boolean;
        };
        item: {
            type: PropType<any>;
            default: () => {};
        };
    }>> & {
        onClick?: ((...args: any[]) => any) | undefined;
        onEdited?: ((...args: any[]) => any) | undefined;
        onShow?: ((...args: any[]) => any) | undefined;
    }, {}, unknown, {}, {}, import("vue/dist/vue").ComponentOptionsMixin, import("vue/dist/vue").ComponentOptionsMixin, ("show" | "click" | "edited")[], import("vue/dist/vue").VNodeProps & import("vue/dist/vue").AllowedComponentProps & import("vue/dist/vue").ComponentCustomProps & Readonly<import("vue/dist/vue").ExtractPropTypes<{
        isDraggable: {
            type: BooleanConstructor;
            default: boolean;
        };
        sortable: {
            type: BooleanConstructor;
            default: boolean;
        };
        i: {
            type: NumberConstructor[];
            default: number;
        };
        displayHiddenColumnsIndicator: {
            type: BooleanConstructor;
            default: boolean;
        };
        visibleColumns: {
            type: PropType<LktTableColumn[]>;
            default: () => LktTableColumn[];
        };
        emptyColumns: {
            type: PropType<string[]>;
            default: () => string[];
        };
        hiddenIsVisible: {
            type: BooleanConstructor;
            default: boolean;
        };
        item: {
            type: PropType<any>;
            default: () => {};
        };
    }>> & {
        onClick?: ((...args: any[]) => any) | undefined;
        onEdited?: ((...args: any[]) => any) | undefined;
        onShow?: ((...args: any[]) => any) | undefined;
    }, {
        item: any;
        i: number;
        isDraggable: boolean;
        sortable: boolean;
        visibleColumns: LktTableColumn[];
        emptyColumns: string[];
        hiddenIsVisible: boolean;
        displayHiddenColumnsIndicator: boolean;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue/dist/vue").ExtractPropTypes<{
        isDraggable: {
            type: BooleanConstructor;
            default: boolean;
        };
        sortable: {
            type: BooleanConstructor;
            default: boolean;
        };
        i: {
            type: NumberConstructor[];
            default: number;
        };
        displayHiddenColumnsIndicator: {
            type: BooleanConstructor;
            default: boolean;
        };
        visibleColumns: {
            type: PropType<LktTableColumn[]>;
            default: () => LktTableColumn[];
        };
        emptyColumns: {
            type: PropType<string[]>;
            default: () => string[];
        };
        hiddenIsVisible: {
            type: BooleanConstructor;
            default: boolean;
        };
        item: {
            type: PropType<any>;
            default: () => {};
        };
    }>> & {
        onClick?: ((...args: any[]) => any) | undefined;
        onEdited?: ((...args: any[]) => any) | undefined;
        onShow?: ((...args: any[]) => any) | undefined;
    }, {}, {}, {}, {}, {
        item: any;
        i: number;
        isDraggable: boolean;
        sortable: boolean;
        visibleColumns: LktTableColumn[];
        emptyColumns: string[];
        hiddenIsVisible: boolean;
        displayHiddenColumnsIndicator: boolean;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import("vue/dist/vue").ComponentOptionsBase<Readonly<import("vue/dist/vue").ExtractPropTypes<{
    isDraggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    sortable: {
        type: BooleanConstructor;
        default: boolean;
    };
    i: {
        type: NumberConstructor[];
        default: number;
    };
    displayHiddenColumnsIndicator: {
        type: BooleanConstructor;
        default: boolean;
    };
    visibleColumns: {
        type: PropType<LktTableColumn[]>;
        default: () => LktTableColumn[];
    };
    emptyColumns: {
        type: PropType<string[]>;
        default: () => string[];
    };
    hiddenIsVisible: {
        type: BooleanConstructor;
        default: boolean;
    };
    item: {
        type: PropType<any>;
        default: () => {};
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
    onEdited?: ((...args: any[]) => any) | undefined;
    onShow?: ((...args: any[]) => any) | undefined;
}, {}, unknown, {}, {}, import("vue/dist/vue").ComponentOptionsMixin, import("vue/dist/vue").ComponentOptionsMixin, ("show" | "click" | "edited")[], "show" | "click" | "edited", {
    item: any;
    i: number;
    isDraggable: boolean;
    sortable: boolean;
    visibleColumns: LktTableColumn[];
    emptyColumns: string[];
    hiddenIsVisible: boolean;
    displayHiddenColumnsIndicator: boolean;
}, {}, string, {}> & import("vue/dist/vue").VNodeProps & import("vue/dist/vue").AllowedComponentProps & import("vue/dist/vue").ComponentCustomProps & (new () => {
    $slots: Record<string, {
        value: any;
        item: any;
        column: LktTableColumn;
        i: number;
    }>;
});
export default _default;
