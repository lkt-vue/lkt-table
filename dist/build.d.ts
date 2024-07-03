declare class K {
    constructor(t?: string, i?: string);
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
    setIsSortable(t?: boolean): this;
    setIsEditable(t?: boolean): this;
    editable: boolean | undefined;
    setIsHidden(t?: boolean): this;
    setIsLoading(t?: boolean): this;
    setFormatter(t?: undefined): this;
    formatter: any;
    setEmptyChecker(t?: undefined): this;
    checkEmpty: any;
    setColSpan(t?: undefined): this;
    getHref(t: any): any;
    doAction(t: any): any;
    defineAsLink(t: any): this;
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
    defineAsAction(t: any): this;
    action: any;
    defineAsSelect(t: any): this;
    options: any;
    showLoading(): boolean;
    hasToLoadResource(): boolean;
    setIsMultiple(t?: boolean): this;
    setResource(t: any): this;
    setResourceSlot(t: any): this;
    resourceSlot: any;
    setResourceData(t: any): this;
    loadResource(): Promise<this>;
    setEditSlot(t: any): this;
    setValueSlot(t: any): this;
    setMultipleDisplay(t: any): this;
    setMultipleDisplayToList(): this;
    setMultipleDisplayToInline(): this;
    setMultipleDisplayToCount(): this;
    setMultipleDisplayEdition(t: any): this;
    setMultipleDisplayEditionToList(): this;
    setMultipleDisplayEditionToInline(): this;
    setSlotData(t: any): this;
    slotData: any;
    setAutoLoadSelectOptions(t?: boolean, i?: string): this;
    autoLoadSelectOptions: boolean | undefined;
    autoLoadSelectOptionsKey: string | undefined;
    setTagMode(t?: boolean): this;
    tags: boolean | undefined;
    setOptions(t?: any[]): this;
    setTitleSourceColumn(t: any): this;
    extractTitleFromColumn: any;
    useForRowKey(t?: boolean): this;
    isForRowKey: boolean | undefined;
}
declare function Tl(l: any, t: any, i: any, n?: boolean): {
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
    setIsSortable: (t?: boolean) => K;
    setIsEditable: (t?: boolean) => K;
    editable: boolean | undefined;
    setIsHidden: (t?: boolean) => K;
    setIsLoading: (t?: boolean) => K;
    setFormatter: (t?: undefined) => K;
    formatter: any;
    setEmptyChecker: (t?: undefined) => K;
    checkEmpty: any;
    setColSpan: (t?: undefined) => K;
    getHref: (t: any) => any;
    doAction: (t: any) => any;
    defineAsLink: (t: any) => K;
    type: string | undefined;
    link: any;
    defineAsText: () => K;
    defineAsEmail: () => K;
    defineAsTel: () => K;
    defineAsInt: () => K;
    defineAsFloat: () => K;
    defineAsCheck: () => K;
    defineAsSwitch: () => K;
    defineAsFile: () => K;
    defineAsAction: (t: any) => K;
    action: any;
    defineAsSelect: (t: any) => K;
    options: any;
    showLoading: () => boolean;
    hasToLoadResource: () => boolean;
    setIsMultiple: (t?: boolean) => K;
    setResource: (t: any) => K;
    setResourceSlot: (t: any) => K;
    resourceSlot: any;
    setResourceData: (t: any) => K;
    loadResource: () => Promise<K>;
    setEditSlot: (t: any) => K;
    setValueSlot: (t: any) => K;
    setMultipleDisplay: (t: any) => K;
    setMultipleDisplayToList: () => K;
    setMultipleDisplayToInline: () => K;
    setMultipleDisplayToCount: () => K;
    setMultipleDisplayEdition: (t: any) => K;
    setMultipleDisplayEditionToList: () => K;
    setMultipleDisplayEditionToInline: () => K;
    setSlotData: (t: any) => K;
    slotData: any;
    setAutoLoadSelectOptions: (t?: boolean, i?: string) => K;
    autoLoadSelectOptions: boolean | undefined;
    autoLoadSelectOptionsKey: string | undefined;
    setTagMode: (t?: boolean) => K;
    tags: boolean | undefined;
    setOptions: (t?: any[]) => K;
    setTitleSourceColumn: (t: any) => K;
    extractTitleFromColumn: any;
    useForRowKey: (t?: boolean) => K;
    isForRowKey: boolean | undefined;
};
declare function Ll(l: any, t: any, i?: boolean): {
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
    setIsSortable: (t?: boolean) => K;
    setIsEditable: (t?: boolean) => K;
    editable: boolean | undefined;
    setIsHidden: (t?: boolean) => K;
    setIsLoading: (t?: boolean) => K;
    setFormatter: (t?: undefined) => K;
    formatter: any;
    setEmptyChecker: (t?: undefined) => K;
    checkEmpty: any;
    setColSpan: (t?: undefined) => K;
    getHref: (t: any) => any;
    doAction: (t: any) => any;
    defineAsLink: (t: any) => K;
    type: string | undefined;
    link: any;
    defineAsText: () => K;
    defineAsEmail: () => K;
    defineAsTel: () => K;
    defineAsInt: () => K;
    defineAsFloat: () => K;
    defineAsCheck: () => K;
    defineAsSwitch: () => K;
    defineAsFile: () => K;
    defineAsAction: (t: any) => K;
    action: any;
    defineAsSelect: (t: any) => K;
    options: any;
    showLoading: () => boolean;
    hasToLoadResource: () => boolean;
    setIsMultiple: (t?: boolean) => K;
    setResource: (t: any) => K;
    setResourceSlot: (t: any) => K;
    resourceSlot: any;
    setResourceData: (t: any) => K;
    loadResource: () => Promise<K>;
    setEditSlot: (t: any) => K;
    setValueSlot: (t: any) => K;
    setMultipleDisplay: (t: any) => K;
    setMultipleDisplayToList: () => K;
    setMultipleDisplayToInline: () => K;
    setMultipleDisplayToCount: () => K;
    setMultipleDisplayEdition: (t: any) => K;
    setMultipleDisplayEditionToList: () => K;
    setMultipleDisplayEditionToInline: () => K;
    setSlotData: (t: any) => K;
    slotData: any;
    setAutoLoadSelectOptions: (t?: boolean, i?: string) => K;
    autoLoadSelectOptions: boolean | undefined;
    autoLoadSelectOptionsKey: string | undefined;
    setTagMode: (t?: boolean) => K;
    tags: boolean | undefined;
    setOptions: (t?: any[]) => K;
    setTitleSourceColumn: (t: any) => K;
    extractTitleFromColumn: any;
    useForRowKey: (t?: boolean) => K;
    isForRowKey: boolean | undefined;
};
declare function Dl(l: any, t: any, i?: boolean): {
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
    setIsSortable: (t?: boolean) => K;
    setIsEditable: (t?: boolean) => K;
    editable: boolean | undefined;
    setIsHidden: (t?: boolean) => K;
    setIsLoading: (t?: boolean) => K;
    setFormatter: (t?: undefined) => K;
    formatter: any;
    setEmptyChecker: (t?: undefined) => K;
    checkEmpty: any;
    setColSpan: (t?: undefined) => K;
    getHref: (t: any) => any;
    doAction: (t: any) => any;
    defineAsLink: (t: any) => K;
    type: string | undefined;
    link: any;
    defineAsText: () => K;
    defineAsEmail: () => K;
    defineAsTel: () => K;
    defineAsInt: () => K;
    defineAsFloat: () => K;
    defineAsCheck: () => K;
    defineAsSwitch: () => K;
    defineAsFile: () => K;
    defineAsAction: (t: any) => K;
    action: any;
    defineAsSelect: (t: any) => K;
    options: any;
    showLoading: () => boolean;
    hasToLoadResource: () => boolean;
    setIsMultiple: (t?: boolean) => K;
    setResource: (t: any) => K;
    setResourceSlot: (t: any) => K;
    resourceSlot: any;
    setResourceData: (t: any) => K;
    loadResource: () => Promise<K>;
    setEditSlot: (t: any) => K;
    setValueSlot: (t: any) => K;
    setMultipleDisplay: (t: any) => K;
    setMultipleDisplayToList: () => K;
    setMultipleDisplayToInline: () => K;
    setMultipleDisplayToCount: () => K;
    setMultipleDisplayEdition: (t: any) => K;
    setMultipleDisplayEditionToList: () => K;
    setMultipleDisplayEditionToInline: () => K;
    setSlotData: (t: any) => K;
    slotData: any;
    setAutoLoadSelectOptions: (t?: boolean, i?: string) => K;
    autoLoadSelectOptions: boolean | undefined;
    autoLoadSelectOptionsKey: string | undefined;
    setTagMode: (t?: boolean) => K;
    tags: boolean | undefined;
    setOptions: (t?: any[]) => K;
    setTitleSourceColumn: (t: any) => K;
    extractTitleFromColumn: any;
    useForRowKey: (t?: boolean) => K;
    isForRowKey: boolean | undefined;
};
declare function Il(l: any, t: any, i?: boolean): {
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
    setIsSortable: (t?: boolean) => K;
    setIsEditable: (t?: boolean) => K;
    editable: boolean | undefined;
    setIsHidden: (t?: boolean) => K;
    setIsLoading: (t?: boolean) => K;
    setFormatter: (t?: undefined) => K;
    formatter: any;
    setEmptyChecker: (t?: undefined) => K;
    checkEmpty: any;
    setColSpan: (t?: undefined) => K;
    getHref: (t: any) => any;
    doAction: (t: any) => any;
    defineAsLink: (t: any) => K;
    type: string | undefined;
    link: any;
    defineAsText: () => K;
    defineAsEmail: () => K;
    defineAsTel: () => K;
    defineAsInt: () => K;
    defineAsFloat: () => K;
    defineAsCheck: () => K;
    defineAsSwitch: () => K;
    defineAsFile: () => K;
    defineAsAction: (t: any) => K;
    action: any;
    defineAsSelect: (t: any) => K;
    options: any;
    showLoading: () => boolean;
    hasToLoadResource: () => boolean;
    setIsMultiple: (t?: boolean) => K;
    setResource: (t: any) => K;
    setResourceSlot: (t: any) => K;
    resourceSlot: any;
    setResourceData: (t: any) => K;
    loadResource: () => Promise<K>;
    setEditSlot: (t: any) => K;
    setValueSlot: (t: any) => K;
    setMultipleDisplay: (t: any) => K;
    setMultipleDisplayToList: () => K;
    setMultipleDisplayToInline: () => K;
    setMultipleDisplayToCount: () => K;
    setMultipleDisplayEdition: (t: any) => K;
    setMultipleDisplayEditionToList: () => K;
    setMultipleDisplayEditionToInline: () => K;
    setSlotData: (t: any) => K;
    slotData: any;
    setAutoLoadSelectOptions: (t?: boolean, i?: string) => K;
    autoLoadSelectOptions: boolean | undefined;
    autoLoadSelectOptionsKey: string | undefined;
    setTagMode: (t?: boolean) => K;
    tags: boolean | undefined;
    setOptions: (t?: any[]) => K;
    setTitleSourceColumn: (t: any) => K;
    extractTitleFromColumn: any;
    useForRowKey: (t?: boolean) => K;
    isForRowKey: boolean | undefined;
};
declare function $l(l: any, t: any, i?: boolean): {
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
    setIsSortable: (t?: boolean) => K;
    setIsEditable: (t?: boolean) => K;
    editable: boolean | undefined;
    setIsHidden: (t?: boolean) => K;
    setIsLoading: (t?: boolean) => K;
    setFormatter: (t?: undefined) => K;
    formatter: any;
    setEmptyChecker: (t?: undefined) => K;
    checkEmpty: any;
    setColSpan: (t?: undefined) => K;
    getHref: (t: any) => any;
    doAction: (t: any) => any;
    defineAsLink: (t: any) => K;
    type: string | undefined;
    link: any;
    defineAsText: () => K;
    defineAsEmail: () => K;
    defineAsTel: () => K;
    defineAsInt: () => K;
    defineAsFloat: () => K;
    defineAsCheck: () => K;
    defineAsSwitch: () => K;
    defineAsFile: () => K;
    defineAsAction: (t: any) => K;
    action: any;
    defineAsSelect: (t: any) => K;
    options: any;
    showLoading: () => boolean;
    hasToLoadResource: () => boolean;
    setIsMultiple: (t?: boolean) => K;
    setResource: (t: any) => K;
    setResourceSlot: (t: any) => K;
    resourceSlot: any;
    setResourceData: (t: any) => K;
    loadResource: () => Promise<K>;
    setEditSlot: (t: any) => K;
    setValueSlot: (t: any) => K;
    setMultipleDisplay: (t: any) => K;
    setMultipleDisplayToList: () => K;
    setMultipleDisplayToInline: () => K;
    setMultipleDisplayToCount: () => K;
    setMultipleDisplayEdition: (t: any) => K;
    setMultipleDisplayEditionToList: () => K;
    setMultipleDisplayEditionToInline: () => K;
    setSlotData: (t: any) => K;
    slotData: any;
    setAutoLoadSelectOptions: (t?: boolean, i?: string) => K;
    autoLoadSelectOptions: boolean | undefined;
    autoLoadSelectOptionsKey: string | undefined;
    setTagMode: (t?: boolean) => K;
    tags: boolean | undefined;
    setOptions: (t?: any[]) => K;
    setTitleSourceColumn: (t: any) => K;
    extractTitleFromColumn: any;
    useForRowKey: (t?: boolean) => K;
    isForRowKey: boolean | undefined;
};
declare function wl(l: any, t: any, i: any, n?: boolean): {
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
    setIsSortable: (t?: boolean) => K;
    setIsEditable: (t?: boolean) => K;
    editable: boolean | undefined;
    setIsHidden: (t?: boolean) => K;
    setIsLoading: (t?: boolean) => K;
    setFormatter: (t?: undefined) => K;
    formatter: any;
    setEmptyChecker: (t?: undefined) => K;
    checkEmpty: any;
    setColSpan: (t?: undefined) => K;
    getHref: (t: any) => any;
    doAction: (t: any) => any;
    defineAsLink: (t: any) => K;
    type: string | undefined;
    link: any;
    defineAsText: () => K;
    defineAsEmail: () => K;
    defineAsTel: () => K;
    defineAsInt: () => K;
    defineAsFloat: () => K;
    defineAsCheck: () => K;
    defineAsSwitch: () => K;
    defineAsFile: () => K;
    defineAsAction: (t: any) => K;
    action: any;
    defineAsSelect: (t: any) => K;
    options: any;
    showLoading: () => boolean;
    hasToLoadResource: () => boolean;
    setIsMultiple: (t?: boolean) => K;
    setResource: (t: any) => K;
    setResourceSlot: (t: any) => K;
    resourceSlot: any;
    setResourceData: (t: any) => K;
    loadResource: () => Promise<K>;
    setEditSlot: (t: any) => K;
    setValueSlot: (t: any) => K;
    setMultipleDisplay: (t: any) => K;
    setMultipleDisplayToList: () => K;
    setMultipleDisplayToInline: () => K;
    setMultipleDisplayToCount: () => K;
    setMultipleDisplayEdition: (t: any) => K;
    setMultipleDisplayEditionToList: () => K;
    setMultipleDisplayEditionToInline: () => K;
    setSlotData: (t: any) => K;
    slotData: any;
    setAutoLoadSelectOptions: (t?: boolean, i?: string) => K;
    autoLoadSelectOptions: boolean | undefined;
    autoLoadSelectOptionsKey: string | undefined;
    setTagMode: (t?: boolean) => K;
    tags: boolean | undefined;
    setOptions: (t?: any[]) => K;
    setTitleSourceColumn: (t: any) => K;
    extractTitleFromColumn: any;
    useForRowKey: (t?: boolean) => K;
    isForRowKey: boolean | undefined;
};
declare function Rl(l: any, t: any, i: any, n?: boolean): {
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
    setIsSortable: (t?: boolean) => K;
    setIsEditable: (t?: boolean) => K;
    editable: boolean | undefined;
    setIsHidden: (t?: boolean) => K;
    setIsLoading: (t?: boolean) => K;
    setFormatter: (t?: undefined) => K;
    formatter: any;
    setEmptyChecker: (t?: undefined) => K;
    checkEmpty: any;
    setColSpan: (t?: undefined) => K;
    getHref: (t: any) => any;
    doAction: (t: any) => any;
    defineAsLink: (t: any) => K;
    type: string | undefined;
    link: any;
    defineAsText: () => K;
    defineAsEmail: () => K;
    defineAsTel: () => K;
    defineAsInt: () => K;
    defineAsFloat: () => K;
    defineAsCheck: () => K;
    defineAsSwitch: () => K;
    defineAsFile: () => K;
    defineAsAction: (t: any) => K;
    action: any;
    defineAsSelect: (t: any) => K;
    options: any;
    showLoading: () => boolean;
    hasToLoadResource: () => boolean;
    setIsMultiple: (t?: boolean) => K;
    setResource: (t: any) => K;
    setResourceSlot: (t: any) => K;
    resourceSlot: any;
    setResourceData: (t: any) => K;
    loadResource: () => Promise<K>;
    setEditSlot: (t: any) => K;
    setValueSlot: (t: any) => K;
    setMultipleDisplay: (t: any) => K;
    setMultipleDisplayToList: () => K;
    setMultipleDisplayToInline: () => K;
    setMultipleDisplayToCount: () => K;
    setMultipleDisplayEdition: (t: any) => K;
    setMultipleDisplayEditionToList: () => K;
    setMultipleDisplayEditionToInline: () => K;
    setSlotData: (t: any) => K;
    slotData: any;
    setAutoLoadSelectOptions: (t?: boolean, i?: string) => K;
    autoLoadSelectOptions: boolean | undefined;
    autoLoadSelectOptionsKey: string | undefined;
    setTagMode: (t?: boolean) => K;
    tags: boolean | undefined;
    setOptions: (t?: any[]) => K;
    setTitleSourceColumn: (t: any) => K;
    extractTitleFromColumn: any;
    useForRowKey: (t?: boolean) => K;
    isForRowKey: boolean | undefined;
};
declare function Ml(l: any, t: any, i?: boolean): {
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
    setIsSortable: (t?: boolean) => K;
    setIsEditable: (t?: boolean) => K;
    editable: boolean | undefined;
    setIsHidden: (t?: boolean) => K;
    setIsLoading: (t?: boolean) => K;
    setFormatter: (t?: undefined) => K;
    formatter: any;
    setEmptyChecker: (t?: undefined) => K;
    checkEmpty: any;
    setColSpan: (t?: undefined) => K;
    getHref: (t: any) => any;
    doAction: (t: any) => any;
    defineAsLink: (t: any) => K;
    type: string | undefined;
    link: any;
    defineAsText: () => K;
    defineAsEmail: () => K;
    defineAsTel: () => K;
    defineAsInt: () => K;
    defineAsFloat: () => K;
    defineAsCheck: () => K;
    defineAsSwitch: () => K;
    defineAsFile: () => K;
    defineAsAction: (t: any) => K;
    action: any;
    defineAsSelect: (t: any) => K;
    options: any;
    showLoading: () => boolean;
    hasToLoadResource: () => boolean;
    setIsMultiple: (t?: boolean) => K;
    setResource: (t: any) => K;
    setResourceSlot: (t: any) => K;
    resourceSlot: any;
    setResourceData: (t: any) => K;
    loadResource: () => Promise<K>;
    setEditSlot: (t: any) => K;
    setValueSlot: (t: any) => K;
    setMultipleDisplay: (t: any) => K;
    setMultipleDisplayToList: () => K;
    setMultipleDisplayToInline: () => K;
    setMultipleDisplayToCount: () => K;
    setMultipleDisplayEdition: (t: any) => K;
    setMultipleDisplayEditionToList: () => K;
    setMultipleDisplayEditionToInline: () => K;
    setSlotData: (t: any) => K;
    slotData: any;
    setAutoLoadSelectOptions: (t?: boolean, i?: string) => K;
    autoLoadSelectOptions: boolean | undefined;
    autoLoadSelectOptionsKey: string | undefined;
    setTagMode: (t?: boolean) => K;
    tags: boolean | undefined;
    setOptions: (t?: any[]) => K;
    setTitleSourceColumn: (t: any) => K;
    extractTitleFromColumn: any;
    useForRowKey: (t?: boolean) => K;
    isForRowKey: boolean | undefined;
};
declare function El(l: any, t: any, i?: boolean): {
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
    setIsSortable: (t?: boolean) => K;
    setIsEditable: (t?: boolean) => K;
    editable: boolean | undefined;
    setIsHidden: (t?: boolean) => K;
    setIsLoading: (t?: boolean) => K;
    setFormatter: (t?: undefined) => K;
    formatter: any;
    setEmptyChecker: (t?: undefined) => K;
    checkEmpty: any;
    setColSpan: (t?: undefined) => K;
    getHref: (t: any) => any;
    doAction: (t: any) => any;
    defineAsLink: (t: any) => K;
    type: string | undefined;
    link: any;
    defineAsText: () => K;
    defineAsEmail: () => K;
    defineAsTel: () => K;
    defineAsInt: () => K;
    defineAsFloat: () => K;
    defineAsCheck: () => K;
    defineAsSwitch: () => K;
    defineAsFile: () => K;
    defineAsAction: (t: any) => K;
    action: any;
    defineAsSelect: (t: any) => K;
    options: any;
    showLoading: () => boolean;
    hasToLoadResource: () => boolean;
    setIsMultiple: (t?: boolean) => K;
    setResource: (t: any) => K;
    setResourceSlot: (t: any) => K;
    resourceSlot: any;
    setResourceData: (t: any) => K;
    loadResource: () => Promise<K>;
    setEditSlot: (t: any) => K;
    setValueSlot: (t: any) => K;
    setMultipleDisplay: (t: any) => K;
    setMultipleDisplayToList: () => K;
    setMultipleDisplayToInline: () => K;
    setMultipleDisplayToCount: () => K;
    setMultipleDisplayEdition: (t: any) => K;
    setMultipleDisplayEditionToList: () => K;
    setMultipleDisplayEditionToInline: () => K;
    setSlotData: (t: any) => K;
    slotData: any;
    setAutoLoadSelectOptions: (t?: boolean, i?: string) => K;
    autoLoadSelectOptions: boolean | undefined;
    autoLoadSelectOptionsKey: string | undefined;
    setTagMode: (t?: boolean) => K;
    tags: boolean | undefined;
    setOptions: (t?: any[]) => K;
    setTitleSourceColumn: (t: any) => K;
    extractTitleFromColumn: any;
    useForRowKey: (t?: boolean) => K;
    isForRowKey: boolean | undefined;
};
declare function Bl(l: any, t: any, i?: boolean): {
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
    setIsSortable: (t?: boolean) => K;
    setIsEditable: (t?: boolean) => K;
    editable: boolean | undefined;
    setIsHidden: (t?: boolean) => K;
    setIsLoading: (t?: boolean) => K;
    setFormatter: (t?: undefined) => K;
    formatter: any;
    setEmptyChecker: (t?: undefined) => K;
    checkEmpty: any;
    setColSpan: (t?: undefined) => K;
    getHref: (t: any) => any;
    doAction: (t: any) => any;
    defineAsLink: (t: any) => K;
    type: string | undefined;
    link: any;
    defineAsText: () => K;
    defineAsEmail: () => K;
    defineAsTel: () => K;
    defineAsInt: () => K;
    defineAsFloat: () => K;
    defineAsCheck: () => K;
    defineAsSwitch: () => K;
    defineAsFile: () => K;
    defineAsAction: (t: any) => K;
    action: any;
    defineAsSelect: (t: any) => K;
    options: any;
    showLoading: () => boolean;
    hasToLoadResource: () => boolean;
    setIsMultiple: (t?: boolean) => K;
    setResource: (t: any) => K;
    setResourceSlot: (t: any) => K;
    resourceSlot: any;
    setResourceData: (t: any) => K;
    loadResource: () => Promise<K>;
    setEditSlot: (t: any) => K;
    setValueSlot: (t: any) => K;
    setMultipleDisplay: (t: any) => K;
    setMultipleDisplayToList: () => K;
    setMultipleDisplayToInline: () => K;
    setMultipleDisplayToCount: () => K;
    setMultipleDisplayEdition: (t: any) => K;
    setMultipleDisplayEditionToList: () => K;
    setMultipleDisplayEditionToInline: () => K;
    setSlotData: (t: any) => K;
    slotData: any;
    setAutoLoadSelectOptions: (t?: boolean, i?: string) => K;
    autoLoadSelectOptions: boolean | undefined;
    autoLoadSelectOptionsKey: string | undefined;
    setTagMode: (t?: boolean) => K;
    tags: boolean | undefined;
    setOptions: (t?: any[]) => K;
    setTitleSourceColumn: (t: any) => K;
    extractTitleFromColumn: any;
    useForRowKey: (t?: boolean) => K;
    isForRowKey: boolean | undefined;
};
declare namespace Al {
    function install(l: any): void;
}
declare function Nl(l: any): boolean;
declare function Ol(l: any): boolean;
declare function Fl(l: any): boolean;
export { K as LktTableColumn, Tl as createActionColumn, Ll as createCheckColumn, Dl as createColumn, Il as createEmailColumn, $l as createHiddenColumn, wl as createLinkColumn, Rl as createSelectColumn, Ml as createSwitchColumn, El as createTelColumn, Bl as createTextColumn, Al as default, Nl as setTableCreateButtonSlot, Ol as setTableDropButtonSlot, Fl as setTableNavButtonSlot };
