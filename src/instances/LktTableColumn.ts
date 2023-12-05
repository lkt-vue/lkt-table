import {Option} from "lkt-field-select/dist/types/types/Option";
import {LktObject} from "lkt-ts-interfaces";

export class LktTableColumn {
    key: string
    label: string
    sortable: boolean
    hidden: boolean
    editable: boolean
    formatter?: Function
    checkEmpty?: Function
    colspan?: Function | boolean | number
    type: '' | 'link' | 'text' | 'int' | 'float' | 'check' | 'switch' | 'select'
    link: string | Function
    options: Option[]

    constructor(key: string = '', label: string = '') {
        this.key = key;
        this.label = label;
        this.sortable = true;
        this.hidden = false;
        this.formatter = undefined;
        this.checkEmpty = undefined;
        this.colspan = undefined;
    }

    setIsSortable(status: boolean = true): this {
        this.sortable = status;
        return this;
    }

    setIsEditable(status: boolean = true): this {
        this.editable = status;
        return this;
    }

    setIsHidden(status: boolean = true): this {
        this.hidden = status;
        return this;
    }

    setFormatter(formatter: any = undefined): this {
        this.formatter = formatter;
        return this;
    }

    setEmptyChecker(checker: any = undefined): this {
        this.checkEmpty = checker;
        return this;
    }

    setColSpan(checker: any = undefined): this {
        this.colspan = undefined;
        return this;
    }

    getHref(item: LktObject) {
        if (typeof this.link === 'function') {
            return this.link(item);
        }
        return this.link;
    }

    defineAsLink(href: string | Function) {
        this.type = 'link';
        this.link = href;
        return this;
    }

    defineAsText() {
        this.type = 'text';
        return this;
    }

    defineAsInt() {
        this.type = 'int';
        return this;
    }

    defineAsFloat() {
        this.type = 'float';
        return this;
    }

    defineAsCheck() {
        this.type = 'check';
        return this;
    }

    defineAsSwitch() {
        this.type = 'switch';
        return this;
    }

    defineAsSelect(options: Option[]) {
        this.type = 'select';
        this.options = options;
        return this;
    }
}