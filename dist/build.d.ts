import { Column as Cn } from "lkt-vue-kernel";
import { createColumn as wn } from "lkt-vue-kernel";
declare namespace pn {
    function install(t: any): void;
}
declare function bn(t: any): boolean;
declare function gn(t: any): boolean;
declare function yn(t: any): void;
declare function mn(t: any): boolean;
declare function hn(t: any): void;
export { Cn as Column, wn as createColumn, pn as default, bn as setTableCreateButtonSlot, gn as setTableDropButtonSlot, yn as setTableEmptySlot, mn as setTableNavButtonSlot, hn as setTableSaveIcon };
