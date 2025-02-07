/* eslint-disable import/prefer-default-export */
import {default as table} from "./lib-components/LktTable.vue";
import {App, Component, Plugin} from "vue";

export {
    createColumn
} from "./functions/table-functions";

export {Column} from "lkt-vue-kernel";

import "./../lkt-table.css"
import {Settings} from "./settings/Settings";

const LktTable: Plugin = {
    install: (app: App) => {
        // Register plugin components
        if (app.component('lkt-table') === undefined) app.component('lkt-table', table);
    },
};

export default LktTable;

export const setTableNavButtonSlot = (component: string|Component) => {
    Settings.navButtonSlot = component;
    return true;
}

export const setTableDropButtonSlot = (component: string|Component) => {
    Settings.dropButtonSlot = component;
    return true;
}

export const setTableCreateButtonSlot = (component: string|Component) => {
    Settings.createButtonSlot = component;
    return true;
}

export const setTableEmptySlot = (component?: string|Component) => {
    Settings.defaultEmptySlot = component;
}

export const setTableSaveIcon = (icon: string) => {
    Settings.defaultSaveIcon = icon;
}