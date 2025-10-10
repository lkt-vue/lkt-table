import { Column as hl } from "lkt-vue-kernel";
import { createColumn as kl } from "lkt-vue-kernel";
declare namespace fl {
    function install(a: any): void;
}
declare function hn(a: any, i: any, o: any, l: any): 0 | 1 | -1;
declare function ml(a: any): boolean;
declare function gl(a: any): void;
declare function pl(a: any): boolean;
export { hl as Column, kl as createColumn, fl as default, hn as defaultTableSorter, ml as setTableCreateButtonSlot, gl as setTableEmptySlot, pl as setTableNavButtonSlot };
