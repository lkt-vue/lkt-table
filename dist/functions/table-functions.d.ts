import { Column, ColumnConfig, LktObject } from "lkt-vue-kernel";
/**
 *
 * @param data
 */
export declare const createColumn: (data: ColumnConfig) => Column;
/**
 *
 * @param a
 * @param b
 * @param c
 * @param sortDirection
 * @returns {number}
 */
export declare const defaultTableSorter: (a: any, b: any, c: Column, sortDirection: string) => number;
/**
 *
 * @param column
 * @param item
 * @param i
 * @param columnStack
 * @returns {*}
 */
export declare const getColumnDisplayContent: (column: Column, item: any, i: number, columnStack?: Column[]) => any;
/**
 *
 * @param column
 * @param amountOfColumns
 * @param items
 */
export declare const getVerticalColSpan: (column: Column, amountOfColumns: number, items: Array<LktObject>) => number;
/**
 *
 * @param column
 * @param item
 * @returns {boolean|*}
 */
export declare const getHorizontalColSpan: (column: Column, item: LktObject) => any;
export declare const colPreferSlot: (column: Column, item: LktObject) => any;
/**
 *
 * @param column
 * @param emptyColumns
 * @param item
 * @returns {boolean}
 */
export declare const canRenderColumn: (column: Column, emptyColumns: string[], item: LktObject) => boolean;
export declare const getDefaultSortColumn: (columns?: Column[]) => string;
export declare const getColumnByKey: (columns: Column[], key: string) => Column | null;
export declare const getColumnClasses: (column: Column) => string;
