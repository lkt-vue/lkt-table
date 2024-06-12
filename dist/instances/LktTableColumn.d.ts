import { Option } from "lkt-field-select";
import { LktObject } from "lkt-ts-interfaces";
export declare class LktTableColumn {
    key: string;
    label: string;
    sortable: boolean;
    hidden: boolean;
    editable: boolean;
    formatter?: Function;
    checkEmpty?: Function;
    colspan?: Function | boolean | number;
    type: '' | 'link' | 'text' | 'int' | 'float' | 'check' | 'switch' | 'select' | 'action' | 'email' | 'tel';
    link: string | Function;
    action: Function;
    options: Option[];
    resource: string;
    resourceSlot: string;
    resourceData: LktObject;
    slotData: LktObject;
    isMultiple: boolean;
    isLoading: boolean;
    tags: boolean;
    autoLoadSelectOptions: boolean;
    autoLoadSelectOptionsKey: string;
    resourceLoaded: boolean;
    valueSlot: string;
    editSlot: string;
    multipleDisplay: string;
    multipleDisplayEdition: string;
    constructor(key?: string, label?: string);
    setIsSortable(status?: boolean): this;
    setIsEditable(status?: boolean): this;
    setIsHidden(status?: boolean): this;
    setIsLoading(status?: boolean): this;
    setFormatter(formatter?: any): this;
    setEmptyChecker(checker?: any): this;
    setColSpan(checker?: any): this;
    getHref(item: LktObject): any;
    doAction(item: LktObject): any;
    defineAsLink(href: string | Function): this;
    defineAsText(): this;
    defineAsEmail(): this;
    defineAsTel(): this;
    defineAsInt(): this;
    defineAsFloat(): this;
    defineAsCheck(): this;
    defineAsSwitch(): this;
    defineAsAction(action: Function): this;
    defineAsSelect(options: Option[]): this;
    showLoading(): boolean;
    hasToLoadResource(): boolean;
    setIsMultiple(status?: boolean): this;
    setResource(resource: string): this;
    setResourceSlot(resource: string): this;
    setResourceData(data: LktObject): this;
    loadResource(): Promise<this>;
    setEditSlot(str: string): this;
    setValueSlot(str: string): this;
    setMultipleDisplay(str: string): this;
    setMultipleDisplayToList(): this;
    setMultipleDisplayToInline(): this;
    setMultipleDisplayToCount(): this;
    setMultipleDisplayEdition(str: string): this;
    setMultipleDisplayEditionToList(): this;
    setMultipleDisplayEditionToInline(): this;
    setSlotData(data: LktObject): this;
    setAutoLoadSelectOptions(enabled?: boolean, searchKey?: string): this;
    setTagMode(enabled?: boolean): this;
    setOptions(opts?: Option[]): this;
}
