import { Column as bn } from "lkt-vue-kernel";
import { createColumn as hn } from "lkt-vue-kernel";
declare namespace vn {
    function install(t: any): void;
}
declare function yl(t: any, i: any, o: any, n: any): 0 | 1 | -1;
declare function pn(t: any): boolean;
declare function mn(t: any): void;
declare function fn(t: any): boolean;
export { bn as Column, hn as createColumn, vn as default, yl as defaultTableSorter, pn as setTableCreateButtonSlot, mn as setTableEmptySlot, fn as setTableNavButtonSlot };
