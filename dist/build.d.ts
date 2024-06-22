declare class F {
    constructor(e?: string, i?: string);
    key: string;
    label: string;
    sortable: boolean;
    hidden: boolean;
    resource: string;
    resourceData: {};
    isMultiple: boolean;
    isLoading: boolean;
    resourceLoaded: boolean;
    valueSlot: string;
    editSlot: string;
    multipleDisplay: string;
    multipleDisplayEdition: string;
    setIsSortable(e?: boolean): this;
    setIsEditable(e?: boolean): this;
    editable: boolean | undefined;
    setIsHidden(e?: boolean): this;
    setIsLoading(e?: boolean): this;
    setFormatter(e?: undefined): this;
    formatter: any;
    setEmptyChecker(e?: undefined): this;
    checkEmpty: any;
    setColSpan(e?: undefined): this;
    getHref(e: any): any;
    doAction(e: any): any;
    defineAsLink(e: any): this;
    type: string | undefined;
    link: any;
    defineAsText(): this;
    defineAsEmail(): this;
    defineAsTel(): this;
    defineAsInt(): this;
    defineAsFloat(): this;
    defineAsCheck(): this;
    defineAsSwitch(): this;
    defineAsFile(): this;
    defineAsAction(e: any): this;
    action: any;
    defineAsSelect(e: any): this;
    options: any;
    showLoading(): boolean;
    hasToLoadResource(): boolean;
    setIsMultiple(e?: boolean): this;
    setResource(e: any): this;
    setResourceSlot(e: any): this;
    resourceSlot: any;
    setResourceData(e: any): this;
    loadResource(): Promise<this>;
    setEditSlot(e: any): this;
    setValueSlot(e: any): this;
    setMultipleDisplay(e: any): this;
    setMultipleDisplayToList(): this;
    setMultipleDisplayToInline(): this;
    setMultipleDisplayToCount(): this;
    setMultipleDisplayEdition(e: any): this;
    setMultipleDisplayEditionToList(): this;
    setMultipleDisplayEditionToInline(): this;
    setSlotData(e: any): this;
    slotData: any;
    setAutoLoadSelectOptions(e?: boolean, i?: string): this;
    autoLoadSelectOptions: boolean | undefined;
    autoLoadSelectOptionsKey: string | undefined;
    setTagMode(e?: boolean): this;
    tags: boolean | undefined;
    setOptions(e?: any[]): this;
    setTitleSourceColumn(e: any): this;
    extractTitleFromColumn: any;
    useForRowKey(e?: boolean): this;
    isForRowKey: boolean | undefined;
}
declare function zt(l: any, e: any, i: any, r?: boolean): {
    key: string;
    label: string;
    sortable: boolean;
    hidden: boolean;
    resource: string;
    resourceData: {};
    isMultiple: boolean;
    isLoading: boolean;
    resourceLoaded: boolean;
    valueSlot: string;
    editSlot: string;
    multipleDisplay: string;
    multipleDisplayEdition: string;
    setIsSortable: (e?: boolean) => F;
    setIsEditable: (e?: boolean) => F;
    editable: boolean | undefined;
    setIsHidden: (e?: boolean) => F;
    setIsLoading: (e?: boolean) => F;
    setFormatter: (e?: undefined) => F;
    formatter: any;
    setEmptyChecker: (e?: undefined) => F;
    checkEmpty: any;
    setColSpan: (e?: undefined) => F;
    getHref: (e: any) => any;
    doAction: (e: any) => any;
    defineAsLink: (e: any) => F;
    type: string | undefined;
    link: any;
    defineAsText: () => F;
    defineAsEmail: () => F;
    defineAsTel: () => F;
    defineAsInt: () => F;
    defineAsFloat: () => F;
    defineAsCheck: () => F;
    defineAsSwitch: () => F;
    defineAsFile: () => F;
    defineAsAction: (e: any) => F;
    action: any;
    defineAsSelect: (e: any) => F;
    options: any;
    showLoading: () => boolean;
    hasToLoadResource: () => boolean;
    setIsMultiple: (e?: boolean) => F;
    setResource: (e: any) => F;
    setResourceSlot: (e: any) => F;
    resourceSlot: any;
    setResourceData: (e: any) => F;
    loadResource: () => Promise<F>;
    setEditSlot: (e: any) => F;
    setValueSlot: (e: any) => F;
    setMultipleDisplay: (e: any) => F;
    setMultipleDisplayToList: () => F;
    setMultipleDisplayToInline: () => F;
    setMultipleDisplayToCount: () => F;
    setMultipleDisplayEdition: (e: any) => F;
    setMultipleDisplayEditionToList: () => F;
    setMultipleDisplayEditionToInline: () => F;
    setSlotData: (e: any) => F;
    slotData: any;
    setAutoLoadSelectOptions: (e?: boolean, i?: string) => F;
    autoLoadSelectOptions: boolean | undefined;
    autoLoadSelectOptionsKey: string | undefined;
    setTagMode: (e?: boolean) => F;
    tags: boolean | undefined;
    setOptions: (e?: any[]) => F;
    setTitleSourceColumn: (e: any) => F;
    extractTitleFromColumn: any;
    useForRowKey: (e?: boolean) => F;
    isForRowKey: boolean | undefined;
};
declare function Qt(l: any, e: any, i?: boolean): {
    key: string;
    label: string;
    sortable: boolean;
    hidden: boolean;
    resource: string;
    resourceData: {};
    isMultiple: boolean;
    isLoading: boolean;
    resourceLoaded: boolean;
    valueSlot: string;
    editSlot: string;
    multipleDisplay: string;
    multipleDisplayEdition: string;
    setIsSortable: (e?: boolean) => F;
    setIsEditable: (e?: boolean) => F;
    editable: boolean | undefined;
    setIsHidden: (e?: boolean) => F;
    setIsLoading: (e?: boolean) => F;
    setFormatter: (e?: undefined) => F;
    formatter: any;
    setEmptyChecker: (e?: undefined) => F;
    checkEmpty: any;
    setColSpan: (e?: undefined) => F;
    getHref: (e: any) => any;
    doAction: (e: any) => any;
    defineAsLink: (e: any) => F;
    type: string | undefined;
    link: any;
    defineAsText: () => F;
    defineAsEmail: () => F;
    defineAsTel: () => F;
    defineAsInt: () => F;
    defineAsFloat: () => F;
    defineAsCheck: () => F;
    defineAsSwitch: () => F;
    defineAsFile: () => F;
    defineAsAction: (e: any) => F;
    action: any;
    defineAsSelect: (e: any) => F;
    options: any;
    showLoading: () => boolean;
    hasToLoadResource: () => boolean;
    setIsMultiple: (e?: boolean) => F;
    setResource: (e: any) => F;
    setResourceSlot: (e: any) => F;
    resourceSlot: any;
    setResourceData: (e: any) => F;
    loadResource: () => Promise<F>;
    setEditSlot: (e: any) => F;
    setValueSlot: (e: any) => F;
    setMultipleDisplay: (e: any) => F;
    setMultipleDisplayToList: () => F;
    setMultipleDisplayToInline: () => F;
    setMultipleDisplayToCount: () => F;
    setMultipleDisplayEdition: (e: any) => F;
    setMultipleDisplayEditionToList: () => F;
    setMultipleDisplayEditionToInline: () => F;
    setSlotData: (e: any) => F;
    slotData: any;
    setAutoLoadSelectOptions: (e?: boolean, i?: string) => F;
    autoLoadSelectOptions: boolean | undefined;
    autoLoadSelectOptionsKey: string | undefined;
    setTagMode: (e?: boolean) => F;
    tags: boolean | undefined;
    setOptions: (e?: any[]) => F;
    setTitleSourceColumn: (e: any) => F;
    extractTitleFromColumn: any;
    useForRowKey: (e?: boolean) => F;
    isForRowKey: boolean | undefined;
};
declare function Pt(l: any, e: any, i?: boolean): {
    key: string;
    label: string;
    sortable: boolean;
    hidden: boolean;
    resource: string;
    resourceData: {};
    isMultiple: boolean;
    isLoading: boolean;
    resourceLoaded: boolean;
    valueSlot: string;
    editSlot: string;
    multipleDisplay: string;
    multipleDisplayEdition: string;
    setIsSortable: (e?: boolean) => F;
    setIsEditable: (e?: boolean) => F;
    editable: boolean | undefined;
    setIsHidden: (e?: boolean) => F;
    setIsLoading: (e?: boolean) => F;
    setFormatter: (e?: undefined) => F;
    formatter: any;
    setEmptyChecker: (e?: undefined) => F;
    checkEmpty: any;
    setColSpan: (e?: undefined) => F;
    getHref: (e: any) => any;
    doAction: (e: any) => any;
    defineAsLink: (e: any) => F;
    type: string | undefined;
    link: any;
    defineAsText: () => F;
    defineAsEmail: () => F;
    defineAsTel: () => F;
    defineAsInt: () => F;
    defineAsFloat: () => F;
    defineAsCheck: () => F;
    defineAsSwitch: () => F;
    defineAsFile: () => F;
    defineAsAction: (e: any) => F;
    action: any;
    defineAsSelect: (e: any) => F;
    options: any;
    showLoading: () => boolean;
    hasToLoadResource: () => boolean;
    setIsMultiple: (e?: boolean) => F;
    setResource: (e: any) => F;
    setResourceSlot: (e: any) => F;
    resourceSlot: any;
    setResourceData: (e: any) => F;
    loadResource: () => Promise<F>;
    setEditSlot: (e: any) => F;
    setValueSlot: (e: any) => F;
    setMultipleDisplay: (e: any) => F;
    setMultipleDisplayToList: () => F;
    setMultipleDisplayToInline: () => F;
    setMultipleDisplayToCount: () => F;
    setMultipleDisplayEdition: (e: any) => F;
    setMultipleDisplayEditionToList: () => F;
    setMultipleDisplayEditionToInline: () => F;
    setSlotData: (e: any) => F;
    slotData: any;
    setAutoLoadSelectOptions: (e?: boolean, i?: string) => F;
    autoLoadSelectOptions: boolean | undefined;
    autoLoadSelectOptionsKey: string | undefined;
    setTagMode: (e?: boolean) => F;
    tags: boolean | undefined;
    setOptions: (e?: any[]) => F;
    setTitleSourceColumn: (e: any) => F;
    extractTitleFromColumn: any;
    useForRowKey: (e?: boolean) => F;
    isForRowKey: boolean | undefined;
};
declare function Wt(l: any, e: any, i?: boolean): {
    key: string;
    label: string;
    sortable: boolean;
    hidden: boolean;
    resource: string;
    resourceData: {};
    isMultiple: boolean;
    isLoading: boolean;
    resourceLoaded: boolean;
    valueSlot: string;
    editSlot: string;
    multipleDisplay: string;
    multipleDisplayEdition: string;
    setIsSortable: (e?: boolean) => F;
    setIsEditable: (e?: boolean) => F;
    editable: boolean | undefined;
    setIsHidden: (e?: boolean) => F;
    setIsLoading: (e?: boolean) => F;
    setFormatter: (e?: undefined) => F;
    formatter: any;
    setEmptyChecker: (e?: undefined) => F;
    checkEmpty: any;
    setColSpan: (e?: undefined) => F;
    getHref: (e: any) => any;
    doAction: (e: any) => any;
    defineAsLink: (e: any) => F;
    type: string | undefined;
    link: any;
    defineAsText: () => F;
    defineAsEmail: () => F;
    defineAsTel: () => F;
    defineAsInt: () => F;
    defineAsFloat: () => F;
    defineAsCheck: () => F;
    defineAsSwitch: () => F;
    defineAsFile: () => F;
    defineAsAction: (e: any) => F;
    action: any;
    defineAsSelect: (e: any) => F;
    options: any;
    showLoading: () => boolean;
    hasToLoadResource: () => boolean;
    setIsMultiple: (e?: boolean) => F;
    setResource: (e: any) => F;
    setResourceSlot: (e: any) => F;
    resourceSlot: any;
    setResourceData: (e: any) => F;
    loadResource: () => Promise<F>;
    setEditSlot: (e: any) => F;
    setValueSlot: (e: any) => F;
    setMultipleDisplay: (e: any) => F;
    setMultipleDisplayToList: () => F;
    setMultipleDisplayToInline: () => F;
    setMultipleDisplayToCount: () => F;
    setMultipleDisplayEdition: (e: any) => F;
    setMultipleDisplayEditionToList: () => F;
    setMultipleDisplayEditionToInline: () => F;
    setSlotData: (e: any) => F;
    slotData: any;
    setAutoLoadSelectOptions: (e?: boolean, i?: string) => F;
    autoLoadSelectOptions: boolean | undefined;
    autoLoadSelectOptionsKey: string | undefined;
    setTagMode: (e?: boolean) => F;
    tags: boolean | undefined;
    setOptions: (e?: any[]) => F;
    setTitleSourceColumn: (e: any) => F;
    extractTitleFromColumn: any;
    useForRowKey: (e?: boolean) => F;
    isForRowKey: boolean | undefined;
};
declare function Zt(l: any, e: any, i?: boolean): {
    key: string;
    label: string;
    sortable: boolean;
    hidden: boolean;
    resource: string;
    resourceData: {};
    isMultiple: boolean;
    isLoading: boolean;
    resourceLoaded: boolean;
    valueSlot: string;
    editSlot: string;
    multipleDisplay: string;
    multipleDisplayEdition: string;
    setIsSortable: (e?: boolean) => F;
    setIsEditable: (e?: boolean) => F;
    editable: boolean | undefined;
    setIsHidden: (e?: boolean) => F;
    setIsLoading: (e?: boolean) => F;
    setFormatter: (e?: undefined) => F;
    formatter: any;
    setEmptyChecker: (e?: undefined) => F;
    checkEmpty: any;
    setColSpan: (e?: undefined) => F;
    getHref: (e: any) => any;
    doAction: (e: any) => any;
    defineAsLink: (e: any) => F;
    type: string | undefined;
    link: any;
    defineAsText: () => F;
    defineAsEmail: () => F;
    defineAsTel: () => F;
    defineAsInt: () => F;
    defineAsFloat: () => F;
    defineAsCheck: () => F;
    defineAsSwitch: () => F;
    defineAsFile: () => F;
    defineAsAction: (e: any) => F;
    action: any;
    defineAsSelect: (e: any) => F;
    options: any;
    showLoading: () => boolean;
    hasToLoadResource: () => boolean;
    setIsMultiple: (e?: boolean) => F;
    setResource: (e: any) => F;
    setResourceSlot: (e: any) => F;
    resourceSlot: any;
    setResourceData: (e: any) => F;
    loadResource: () => Promise<F>;
    setEditSlot: (e: any) => F;
    setValueSlot: (e: any) => F;
    setMultipleDisplay: (e: any) => F;
    setMultipleDisplayToList: () => F;
    setMultipleDisplayToInline: () => F;
    setMultipleDisplayToCount: () => F;
    setMultipleDisplayEdition: (e: any) => F;
    setMultipleDisplayEditionToList: () => F;
    setMultipleDisplayEditionToInline: () => F;
    setSlotData: (e: any) => F;
    slotData: any;
    setAutoLoadSelectOptions: (e?: boolean, i?: string) => F;
    autoLoadSelectOptions: boolean | undefined;
    autoLoadSelectOptionsKey: string | undefined;
    setTagMode: (e?: boolean) => F;
    tags: boolean | undefined;
    setOptions: (e?: any[]) => F;
    setTitleSourceColumn: (e: any) => F;
    extractTitleFromColumn: any;
    useForRowKey: (e?: boolean) => F;
    isForRowKey: boolean | undefined;
};
declare function _t(l: any, e: any, i: any, r?: boolean): {
    key: string;
    label: string;
    sortable: boolean;
    hidden: boolean;
    resource: string;
    resourceData: {};
    isMultiple: boolean;
    isLoading: boolean;
    resourceLoaded: boolean;
    valueSlot: string;
    editSlot: string;
    multipleDisplay: string;
    multipleDisplayEdition: string;
    setIsSortable: (e?: boolean) => F;
    setIsEditable: (e?: boolean) => F;
    editable: boolean | undefined;
    setIsHidden: (e?: boolean) => F;
    setIsLoading: (e?: boolean) => F;
    setFormatter: (e?: undefined) => F;
    formatter: any;
    setEmptyChecker: (e?: undefined) => F;
    checkEmpty: any;
    setColSpan: (e?: undefined) => F;
    getHref: (e: any) => any;
    doAction: (e: any) => any;
    defineAsLink: (e: any) => F;
    type: string | undefined;
    link: any;
    defineAsText: () => F;
    defineAsEmail: () => F;
    defineAsTel: () => F;
    defineAsInt: () => F;
    defineAsFloat: () => F;
    defineAsCheck: () => F;
    defineAsSwitch: () => F;
    defineAsFile: () => F;
    defineAsAction: (e: any) => F;
    action: any;
    defineAsSelect: (e: any) => F;
    options: any;
    showLoading: () => boolean;
    hasToLoadResource: () => boolean;
    setIsMultiple: (e?: boolean) => F;
    setResource: (e: any) => F;
    setResourceSlot: (e: any) => F;
    resourceSlot: any;
    setResourceData: (e: any) => F;
    loadResource: () => Promise<F>;
    setEditSlot: (e: any) => F;
    setValueSlot: (e: any) => F;
    setMultipleDisplay: (e: any) => F;
    setMultipleDisplayToList: () => F;
    setMultipleDisplayToInline: () => F;
    setMultipleDisplayToCount: () => F;
    setMultipleDisplayEdition: (e: any) => F;
    setMultipleDisplayEditionToList: () => F;
    setMultipleDisplayEditionToInline: () => F;
    setSlotData: (e: any) => F;
    slotData: any;
    setAutoLoadSelectOptions: (e?: boolean, i?: string) => F;
    autoLoadSelectOptions: boolean | undefined;
    autoLoadSelectOptionsKey: string | undefined;
    setTagMode: (e?: boolean) => F;
    tags: boolean | undefined;
    setOptions: (e?: any[]) => F;
    setTitleSourceColumn: (e: any) => F;
    extractTitleFromColumn: any;
    useForRowKey: (e?: boolean) => F;
    isForRowKey: boolean | undefined;
};
declare function Yt(l: any, e: any, i: any, r?: boolean): {
    key: string;
    label: string;
    sortable: boolean;
    hidden: boolean;
    resource: string;
    resourceData: {};
    isMultiple: boolean;
    isLoading: boolean;
    resourceLoaded: boolean;
    valueSlot: string;
    editSlot: string;
    multipleDisplay: string;
    multipleDisplayEdition: string;
    setIsSortable: (e?: boolean) => F;
    setIsEditable: (e?: boolean) => F;
    editable: boolean | undefined;
    setIsHidden: (e?: boolean) => F;
    setIsLoading: (e?: boolean) => F;
    setFormatter: (e?: undefined) => F;
    formatter: any;
    setEmptyChecker: (e?: undefined) => F;
    checkEmpty: any;
    setColSpan: (e?: undefined) => F;
    getHref: (e: any) => any;
    doAction: (e: any) => any;
    defineAsLink: (e: any) => F;
    type: string | undefined;
    link: any;
    defineAsText: () => F;
    defineAsEmail: () => F;
    defineAsTel: () => F;
    defineAsInt: () => F;
    defineAsFloat: () => F;
    defineAsCheck: () => F;
    defineAsSwitch: () => F;
    defineAsFile: () => F;
    defineAsAction: (e: any) => F;
    action: any;
    defineAsSelect: (e: any) => F;
    options: any;
    showLoading: () => boolean;
    hasToLoadResource: () => boolean;
    setIsMultiple: (e?: boolean) => F;
    setResource: (e: any) => F;
    setResourceSlot: (e: any) => F;
    resourceSlot: any;
    setResourceData: (e: any) => F;
    loadResource: () => Promise<F>;
    setEditSlot: (e: any) => F;
    setValueSlot: (e: any) => F;
    setMultipleDisplay: (e: any) => F;
    setMultipleDisplayToList: () => F;
    setMultipleDisplayToInline: () => F;
    setMultipleDisplayToCount: () => F;
    setMultipleDisplayEdition: (e: any) => F;
    setMultipleDisplayEditionToList: () => F;
    setMultipleDisplayEditionToInline: () => F;
    setSlotData: (e: any) => F;
    slotData: any;
    setAutoLoadSelectOptions: (e?: boolean, i?: string) => F;
    autoLoadSelectOptions: boolean | undefined;
    autoLoadSelectOptionsKey: string | undefined;
    setTagMode: (e?: boolean) => F;
    tags: boolean | undefined;
    setOptions: (e?: any[]) => F;
    setTitleSourceColumn: (e: any) => F;
    extractTitleFromColumn: any;
    useForRowKey: (e?: boolean) => F;
    isForRowKey: boolean | undefined;
};
declare function Xt(l: any, e: any, i?: boolean): {
    key: string;
    label: string;
    sortable: boolean;
    hidden: boolean;
    resource: string;
    resourceData: {};
    isMultiple: boolean;
    isLoading: boolean;
    resourceLoaded: boolean;
    valueSlot: string;
    editSlot: string;
    multipleDisplay: string;
    multipleDisplayEdition: string;
    setIsSortable: (e?: boolean) => F;
    setIsEditable: (e?: boolean) => F;
    editable: boolean | undefined;
    setIsHidden: (e?: boolean) => F;
    setIsLoading: (e?: boolean) => F;
    setFormatter: (e?: undefined) => F;
    formatter: any;
    setEmptyChecker: (e?: undefined) => F;
    checkEmpty: any;
    setColSpan: (e?: undefined) => F;
    getHref: (e: any) => any;
    doAction: (e: any) => any;
    defineAsLink: (e: any) => F;
    type: string | undefined;
    link: any;
    defineAsText: () => F;
    defineAsEmail: () => F;
    defineAsTel: () => F;
    defineAsInt: () => F;
    defineAsFloat: () => F;
    defineAsCheck: () => F;
    defineAsSwitch: () => F;
    defineAsFile: () => F;
    defineAsAction: (e: any) => F;
    action: any;
    defineAsSelect: (e: any) => F;
    options: any;
    showLoading: () => boolean;
    hasToLoadResource: () => boolean;
    setIsMultiple: (e?: boolean) => F;
    setResource: (e: any) => F;
    setResourceSlot: (e: any) => F;
    resourceSlot: any;
    setResourceData: (e: any) => F;
    loadResource: () => Promise<F>;
    setEditSlot: (e: any) => F;
    setValueSlot: (e: any) => F;
    setMultipleDisplay: (e: any) => F;
    setMultipleDisplayToList: () => F;
    setMultipleDisplayToInline: () => F;
    setMultipleDisplayToCount: () => F;
    setMultipleDisplayEdition: (e: any) => F;
    setMultipleDisplayEditionToList: () => F;
    setMultipleDisplayEditionToInline: () => F;
    setSlotData: (e: any) => F;
    slotData: any;
    setAutoLoadSelectOptions: (e?: boolean, i?: string) => F;
    autoLoadSelectOptions: boolean | undefined;
    autoLoadSelectOptionsKey: string | undefined;
    setTagMode: (e?: boolean) => F;
    tags: boolean | undefined;
    setOptions: (e?: any[]) => F;
    setTitleSourceColumn: (e: any) => F;
    extractTitleFromColumn: any;
    useForRowKey: (e?: boolean) => F;
    isForRowKey: boolean | undefined;
};
declare function Gt(l: any, e: any, i?: boolean): {
    key: string;
    label: string;
    sortable: boolean;
    hidden: boolean;
    resource: string;
    resourceData: {};
    isMultiple: boolean;
    isLoading: boolean;
    resourceLoaded: boolean;
    valueSlot: string;
    editSlot: string;
    multipleDisplay: string;
    multipleDisplayEdition: string;
    setIsSortable: (e?: boolean) => F;
    setIsEditable: (e?: boolean) => F;
    editable: boolean | undefined;
    setIsHidden: (e?: boolean) => F;
    setIsLoading: (e?: boolean) => F;
    setFormatter: (e?: undefined) => F;
    formatter: any;
    setEmptyChecker: (e?: undefined) => F;
    checkEmpty: any;
    setColSpan: (e?: undefined) => F;
    getHref: (e: any) => any;
    doAction: (e: any) => any;
    defineAsLink: (e: any) => F;
    type: string | undefined;
    link: any;
    defineAsText: () => F;
    defineAsEmail: () => F;
    defineAsTel: () => F;
    defineAsInt: () => F;
    defineAsFloat: () => F;
    defineAsCheck: () => F;
    defineAsSwitch: () => F;
    defineAsFile: () => F;
    defineAsAction: (e: any) => F;
    action: any;
    defineAsSelect: (e: any) => F;
    options: any;
    showLoading: () => boolean;
    hasToLoadResource: () => boolean;
    setIsMultiple: (e?: boolean) => F;
    setResource: (e: any) => F;
    setResourceSlot: (e: any) => F;
    resourceSlot: any;
    setResourceData: (e: any) => F;
    loadResource: () => Promise<F>;
    setEditSlot: (e: any) => F;
    setValueSlot: (e: any) => F;
    setMultipleDisplay: (e: any) => F;
    setMultipleDisplayToList: () => F;
    setMultipleDisplayToInline: () => F;
    setMultipleDisplayToCount: () => F;
    setMultipleDisplayEdition: (e: any) => F;
    setMultipleDisplayEditionToList: () => F;
    setMultipleDisplayEditionToInline: () => F;
    setSlotData: (e: any) => F;
    slotData: any;
    setAutoLoadSelectOptions: (e?: boolean, i?: string) => F;
    autoLoadSelectOptions: boolean | undefined;
    autoLoadSelectOptionsKey: string | undefined;
    setTagMode: (e?: boolean) => F;
    tags: boolean | undefined;
    setOptions: (e?: any[]) => F;
    setTitleSourceColumn: (e: any) => F;
    extractTitleFromColumn: any;
    useForRowKey: (e?: boolean) => F;
    isForRowKey: boolean | undefined;
};
declare function qt(l: any, e: any, i?: boolean): {
    key: string;
    label: string;
    sortable: boolean;
    hidden: boolean;
    resource: string;
    resourceData: {};
    isMultiple: boolean;
    isLoading: boolean;
    resourceLoaded: boolean;
    valueSlot: string;
    editSlot: string;
    multipleDisplay: string;
    multipleDisplayEdition: string;
    setIsSortable: (e?: boolean) => F;
    setIsEditable: (e?: boolean) => F;
    editable: boolean | undefined;
    setIsHidden: (e?: boolean) => F;
    setIsLoading: (e?: boolean) => F;
    setFormatter: (e?: undefined) => F;
    formatter: any;
    setEmptyChecker: (e?: undefined) => F;
    checkEmpty: any;
    setColSpan: (e?: undefined) => F;
    getHref: (e: any) => any;
    doAction: (e: any) => any;
    defineAsLink: (e: any) => F;
    type: string | undefined;
    link: any;
    defineAsText: () => F;
    defineAsEmail: () => F;
    defineAsTel: () => F;
    defineAsInt: () => F;
    defineAsFloat: () => F;
    defineAsCheck: () => F;
    defineAsSwitch: () => F;
    defineAsFile: () => F;
    defineAsAction: (e: any) => F;
    action: any;
    defineAsSelect: (e: any) => F;
    options: any;
    showLoading: () => boolean;
    hasToLoadResource: () => boolean;
    setIsMultiple: (e?: boolean) => F;
    setResource: (e: any) => F;
    setResourceSlot: (e: any) => F;
    resourceSlot: any;
    setResourceData: (e: any) => F;
    loadResource: () => Promise<F>;
    setEditSlot: (e: any) => F;
    setValueSlot: (e: any) => F;
    setMultipleDisplay: (e: any) => F;
    setMultipleDisplayToList: () => F;
    setMultipleDisplayToInline: () => F;
    setMultipleDisplayToCount: () => F;
    setMultipleDisplayEdition: (e: any) => F;
    setMultipleDisplayEditionToList: () => F;
    setMultipleDisplayEditionToInline: () => F;
    setSlotData: (e: any) => F;
    slotData: any;
    setAutoLoadSelectOptions: (e?: boolean, i?: string) => F;
    autoLoadSelectOptions: boolean | undefined;
    autoLoadSelectOptionsKey: string | undefined;
    setTagMode: (e?: boolean) => F;
    tags: boolean | undefined;
    setOptions: (e?: any[]) => F;
    setTitleSourceColumn: (e: any) => F;
    extractTitleFromColumn: any;
    useForRowKey: (e?: boolean) => F;
    isForRowKey: boolean | undefined;
};
declare namespace xt {
    function install(l: any): void;
}
declare function ll(l: any): boolean;
declare function tl(l: any): boolean;
declare function el(l: any): boolean;
export { F as LktTableColumn, zt as createActionColumn, Qt as createCheckColumn, Pt as createColumn, Wt as createEmailColumn, Zt as createHiddenColumn, _t as createLinkColumn, Yt as createSelectColumn, Xt as createSwitchColumn, Gt as createTelColumn, qt as createTextColumn, xt as default, ll as setTableCreateButtonSlot, tl as setTableDropButtonSlot, el as setTableNavButtonSlot };
