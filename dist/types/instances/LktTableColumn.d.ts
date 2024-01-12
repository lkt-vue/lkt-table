import { Option } from "lkt-field-select/dist/types/types/Option";
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
    resourceData: LktObject;
    isMultiple: boolean;
    isLoading: boolean;
    resourceLoaded: boolean;
    valueSlot: string;
    editSlot: string;
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
    setResourceData(data: LktObject): this;
    loadResource(): Promise<this>;
    setEditSlot(str: string): this;
    setValueSlot(str: string): this;
}
