import { Column as Fn } from "lkt-vue-kernel";
import { createColumn as Un } from "lkt-vue-kernel";
declare namespace Rn {
    function install(e: any): void;
}
declare function Nl(e: any, o: any, i: any, n: any): 0 | 1 | -1;
declare function Mn(e: any): boolean;
declare function Nn(e: any): void;
declare function Ln(e: any): boolean;
export { Fn as Column, Un as createColumn, Rn as default, Nl as defaultTableSorter, Mn as setTableCreateButtonSlot, Nn as setTableEmptySlot, Ln as setTableNavButtonSlot };
