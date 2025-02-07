<script lang="ts" setup>
import {defaultTableSorter, getColumnByKey, getDefaultSortColumn} from "../functions/table-functions";
import LktTableRow from "../components/LktTableRow.vue";
import {computed, nextTick, onMounted, ref, useSlots, watch} from "vue";
import {Column, SortDirection} from "lkt-vue-kernel";
import LktHiddenRow from "../components/LktHiddenRow.vue";
import {generateRandomString, replaceAll} from "lkt-string-tools";
import {LktObject} from "lkt-ts-interfaces";
import {DataState} from "lkt-data-state";
import {HTTPResponse} from "lkt-http-client";
import CreateButton from "../components/CreateButton.vue";
import Sortable from 'sortablejs';
import TableHeader from "../components/TableHeader.vue";
import {__} from "lkt-i18n";
import {time} from "lkt-date-tools";
import {Settings} from "../settings/Settings";
import {TypeOfTable} from "../enums/TypeOfTable";
import {ValidPermissionType} from "../types/ValidPermissionType";
import {Permission} from "../enums/Permission";
import {RowDisplayType} from "../enums/RowDisplayType";

const emit = defineEmits([
    'update:modelValue',
    'update:perms',
    'update:loading',
    'sort',
    'click',
    'save',
    'error',
    'before-save',
    'read-response',
    'click-create',
    'page',
    'drag-end',
]);

const slots = useSlots();

const props = withDefaults(defineProps<{
    modelValue: LktObject[]
    type?: TypeOfTable,
    columns: Column[]
    sorter?: Function
    draggableChecker?: Function
    checkValidDrag?: Function
    renderDrag?: boolean|Function
    disabledDrag?: boolean|Function
    sortable?: boolean
    hideEmptyColumns?: boolean
    initialSorting?: boolean
    draggableItemKey?: string
    itemDisplayChecker?: Function
    loading?: boolean


    page?: number
    perms?: ValidPermissionType[]
    resource?: string
    noResultsText?: string
    title?: string
    titleTag?: string
    titleIcon?: string
    headerClass?: string
    wrapContentTag?: string
    wrapContentClass?: string
    itemsContainerClass?: string
    filters?: LktObject[]
    dataStateConfig?: LktObject
    hiddenSave?: boolean
    editMode?: boolean
    saveDisabled?: boolean
    saveValidator?: Function
    saveConfirm?: string
    confirmData?: LktObject
    saveResource?: string
    saveResourceData?: LktObject
    saveTooltipEngine?: string
    splitSave?: boolean
    saveText?: string
    createText?: string
    createIcon?: string
    createRoute?: string
    dropText?: string
    dropIcon?: string
    editText?: string
    editIcon?: string
    editLink?: string
    editModeText?: string
    switchEditionEnabled?: boolean
    createDisabled?: boolean
    dropConfirm?: string
    dropResource?: string
    addNavigation?: boolean
    itemMode?: boolean
    createEnabledValidator?: Function
    newValueGenerator?: Function
    requiredItemsForTopCreate?: number
    requiredItemsForBottomCreate?: number

    slotItemVar?: string
    rowDisplayType?: RowDisplayType|Function
    modal?: string,
    modalData?: LktObject,

}>(), {
    modelValue: () => [],
    type: TypeOfTable.Table,
    columns: () => [],
    sorter: defaultTableSorter,
    draggableChecker: (item: any) => true,
    checkValidDrag: undefined,
    renderDrag: true,
    sortable: false,
    hideEmptyColumns: false,
    initialSorting: false,
    draggableItemKey: 'name',
    loading: false,


    page: 1,
    perms: () => [],
    resource: '',
    noResultsText: Settings.defaultNoResultsMessage,
    title: '',
    titleTag: 'h2',
    titleIcon: '',
    headerClass: '',
    wrapContentTag: 'div',
    wrapContentClass: '',
    itemsContainerClass: '',
    saveTooltipEngine: 'absolute',
    filters: () => [],
    dataStateConfig: () => ({}),
    hiddenSave: false,
    editMode: false,
    saveDisabled: false,
    saveValidator: () => true,
    saveConfirm: '',
    confirmData: () => ({}),
    saveResource: '',
    saveResourceData: () => ({}),
    splitSave: false,
    saveText: 'Save',
    dropText: 'Delete',
    dropIcon: '',
    editText: 'Edit',
    editIcon: '',
    editLink: '',
    createText: 'Add item',
    createIcon: '',
    createRoute: '',
    editModeText: 'Edit mode',
    switchEditionEnabled: false,
    dropConfirm: '',
    dropResource: '',
    addNavigation: false,
    itemMode: false,
    createEnabledValidator: undefined,
    newValueGenerator: undefined,
    requiredItemsForTopCreate: 0,
    requiredItemsForBottomCreate: 0,

    slotItemVar: 'item',
    rowDisplayType: RowDisplayType.Auto,
    modal: ''
});

const hiddenColumnsStack: LktObject = {};

const Sorter = ref(typeof props.sorter === 'function' ? props.sorter : defaultTableSorter),
    SortBy = ref(getDefaultSortColumn(props.columns)),
    SortingDirection = ref(<SortDirection>SortDirection.Asc),
    Items = ref(props.modelValue),
    Hidden = ref(hiddenColumnsStack),
    tableBody = ref(<HTMLElement|null>null),
    Columns = ref(props.columns);

const Page = ref(props.page),
    isLoading = ref(props.loading),
    firstLoadReady = ref(false),
    permissions = ref(props.perms),
    paginator = ref(null),
    element = ref(null),
    sortableObject = ref({}),
    dataState = ref(new DataState({items: Items.value}, props.dataStateConfig)),
    editModeEnabled = ref(props.editMode),
    updateTimeStamp = ref(0),
    sortableContainer = ref(<HTMLElement|null>null)
;

const dataStateChanged = ref(false);

watch(isLoading, v => emit('update:loading', v));

watch(Page, (v) => emit('page', v));

const Type = ref(props.type);
if (props.itemMode && Type.value === TypeOfTable.Table) {
    Type.value = TypeOfTable.Item;
}

const onPerms = (r: string[]) => {
        permissions.value = r;
    },
    onPaginatorResponse = (r: HTTPResponse) => {
        //@ts-ignore
        if (Array.isArray(r.data)) Items.value = r.data;
        isLoading.value = false;
        firstLoadReady.value = true;
        dataState.value.store({items: Items.value}).turnStoredIntoOriginal();
        dataStateChanged.value = false;
        nextTick(() => {
            emit('read-response', r);
        })
    },
    onLoading = () => nextTick(() => isLoading.value = true),
    doRefresh = () => {
        //@ts-ignore
        paginator.value.doRefresh();
    };


const uniqueId = generateRandomString(12);

const emptyColumns = computed(() => {
        if (!props.hideEmptyColumns) return [];
        let r: string[] = [];
        Columns.value.forEach((column: Column) => {
            let key = column.key;

            let ok = false;
            Items.value.forEach((item: any) => {
                if (typeof item.checkEmpty === 'function') {
                    return item.checkEmpty(item);
                }
                if (item[key]) ok = true;
            });

            if (!ok) r.push(key);
        });
        return r;
    }),
    visibleColumns = computed(() => {
        return Columns.value.filter((c: Column) => !c.hidden);
    }),
    hiddenColumns = computed(() => {
        return Columns.value.filter((c: Column) => c.hidden);
    }),
    hiddenColumnsColSpan = computed(() => {
        let r = visibleColumns.value.length + 1;
        if (props.sortable) ++r;
        return r;
    }),
    rowKeyColumns = computed(() => {
        return Columns.value.filter((c: Column) => c.isForRowKey);
    }),
    displayHiddenColumnsIndicator = computed(() => {
        return hiddenColumns.value.length > 0 && !props.sortable;
    }),
    columnKeys = computed((): string[] => {
        return Columns.value.map(c => c.key);

    }),
    colSlots = computed((): string[] => {
        let r: string[] = [];
        for (let k in slots) if (columnKeys.value.indexOf(k) !== -1) r.push(k);
        return r;
    }),
    showSaveButton = computed(() => {
        if (props.hiddenSave) return false;
        if (isLoading.value) return false;
        if (!props.saveResource) return false;
        if (editModeEnabled.value && dataStateChanged.value) return true;

        return editModeEnabled.value;
    }),
    showEditionButtons = computed(() => {
        if (computedDisplayCreateButton.value && Items.value.length >= props.requiredItemsForTopCreate) return true;
        if (props.switchEditionEnabled) return true;
        return showSaveButton.value || (editModeEnabled.value && hasCreatePerm.value);
    }),
    ableToSave = computed(() => {
        if (props.saveDisabled) return false;
        if (typeof props.saveValidator === 'function' && !props.saveValidator(Items.value)) return false;
        return dataStateChanged.value;
    }),
    amountOfItems = computed(() => {
        return Items.value.length;
    }),
    computedSaveResourceData = computed(() => {
        return {
            items: Items.value,
            ...props.saveResourceData
        }
    }),
    computedTitleTag = computed(() => {
        if (props.titleTag === '') return 'h2';
        return props.titleTag;
    }),
    computedWrapContentTag = computed(() => {
        if (props.wrapContentTag === '') return 'div';
        return props.wrapContentTag;
    }),
    computedTitle = computed(() => {
        if (props.title.startsWith('__:')) {
            return __(props.title.substring(3));
        }
        return props.title;
    }),
    computedSaveText = computed(() => {
        if (props.saveText.startsWith('__:')) {
            return __(props.saveText.substring(3));
        }
        return props.saveText;
    }),
    computedEditModeText = computed(() => {
        if (props.editModeText.startsWith('__:')) {
            return __(props.editModeText.substring(3));
        }
        return props.editModeText;
    }),
    hasCreatePerm = computed(() => permissions.value.includes(Permission.Create)),
    hasReadPerm = computed(() => permissions.value.includes('read')),
    hasUpdatePerm = computed(() => permissions.value.includes(Permission.Update)),
    hasEditPerm = computed(() => permissions.value.includes(Permission.Edit)),
    hasInlineEditPerm = computed(() => permissions.value.includes(Permission.InlineEdit)),
    hasModalCreatePerm = computed(() => permissions.value.includes(Permission.ModalCreate)),
    hasInlineCreatePerm = computed(() => permissions.value.includes(Permission.InlineCreate)),
    hasInlineCreateEverPerm = computed(() => permissions.value.includes(Permission.InlineCreateEver)),
    hasDropPerm = computed(() => permissions.value.includes(Permission.Drop));


const getItemByEvent = (e: any) => {
        let t = e.target;
        if (typeof t.dataset.column === 'undefined') {
            do {
                t = t.parentNode;
            } while (typeof t.dataset.column === 'undefined' && t.tagName !== 'TABLE' && t.tagName !== 'body');
        }

        if (t.tagName === 'TD') {
            t = t.parentNode;
            t = t.dataset.i;
            if (typeof t !== 'undefined') return Items.value[t];
        }

        return undefined;
    },
    getItemByIndex = (index: number) => {
        return Items.value[index];
    },
    getRowByIndex = (index: number) => {
        return tableBody.value?.querySelector(`[data-i="${index}"]`);
    },
    isVisible = (index: number) => {
        return Hidden.value['tr_' + index] === true;
    },
    sort = (column: Column | null) => {
        if (!column) return;
        if (column.sortable) {
            Items.value = Items.value.sort((a: any, b: any) => {
                return Sorter.value(a, b, column, SortingDirection.value);
            });
            SortingDirection.value = SortingDirection.value === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc;
            SortBy.value = column.key;
            emit('sort', [SortBy.value, SortingDirection.value]);
        }
    },
    onClick = ($event: any) => {
        emit('click', $event);
    },
    show = ($event: any, i: number) => {
        let k = 'tr_' + i;
        Hidden.value[k] = typeof Hidden.value[k] === 'undefined' ? true : !Hidden.value[k];
    },
    validDragChecker = (evt: any) => {
        let targetIndex = parseInt(evt?.originalEvent?.toElement?.closest('tr')?.dataset?.i);
        if (typeof props.disabledDrag === 'function' && props.disabledDrag(Items.value[targetIndex])) return false;
        if (typeof props.disabledDrag === 'boolean' && props.disabledDrag) return false;
        if (typeof props.checkValidDrag === 'function') return props.checkValidDrag(evt);
        return true;
    },
    isDraggable = (element: any) => {
        if (typeof props.draggableChecker === 'function') return props.draggableChecker(element);
        return true;
    },
    onClickAddItem = () => {
        if (hasCreatePerm.value) {
            emit('click-create');
            return;
        }

        if (!hasInlineCreateEverPerm.value) {
            if (typeof props.newValueGenerator === 'function') {
                let newValue = props.newValueGenerator();

                if (typeof newValue === 'object' || Type.value !== TypeOfTable.Table) {
                    Items.value.push(newValue);
                    return;
                }
            }
            Items.value.push({});
        } else {
            emit('click-create');
        }
    },
    onAppend = (data: LktObject) => {
        Items.value.push(data);
    },
    onButtonLoading = () => {
        isLoading.value = true;
    },
    onButtonLoaded = () => {
        isLoading.value = false;
    },
    onSave = ($event: PointerEvent, r: HTTPResponse) => {
        emit('before-save');
        if (props.saveResource) {
            isLoading.value = false;
            if (!r.success) {
                emit('error', r.httpStatus);
                return;
            }
        }
        dataState.value.turnStoredIntoOriginal();
        dataStateChanged.value = false;

        emit('save', r)
    },
    moveArrayPosition = (arr: any[], oldIndex: number, newIndex: number) => {
        if (newIndex >= arr.length) {
            let k = newIndex - arr.length + 1;
            while (k--) arr.push(undefined);
        }
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
        return arr; // for testing
    },
    onItemUp = (i) => {
        moveArrayPosition(Items.value, i, i - 1);
        updateTimeStamp.value = time();
    },
    onItemDown = (i) => {
        moveArrayPosition(Items.value, i, i + 1);
        updateTimeStamp.value = time();
    },
    onItemDrop = (i) => {
        Items.value.splice(i, 1);
        updateTimeStamp.value = time();
    },
    stopSortable = () => {
        if (sortableObject.value) {
            sortableObject.value.destroy();
            sortableObject.value = {};
        }
    },
    initSortable = () => {
        if (!sortableContainer.value) {
            sortableContainer.value = document.getElementById('lkt-table-body-' + uniqueId);
        }

        sortableObject.value = new Sortable(sortableContainer.value, {
            direction: 'vertical',
            handle: '.handle',
            animation: 150,
            onEnd: function (evt: CustomEvent) {
                //@ts-ignore
                let oldIndex = evt.oldIndex;

                //@ts-ignore
                let newIndex = evt.newIndex;
                Items.value.splice(newIndex, 0, Items.value.splice(oldIndex, 1)[0]);
                updateTimeStamp.value = time();
                emit('drag-end', Items.value[newIndex]);
            },
            onMove: function (evt, originalEvent) {
                return validDragChecker(evt);
                // return false; — for cancel
                // return -1; — insert before target
                // return 1; — insert after target
                // return true; — keep default insertion point based on the direction
                // return void; — keep default insertion point based on the direction
            },
        });
    },
    getRowKey = (item: LktObject, index: number, isHidden: boolean = false) => {
        let r = [updateTimeStamp.value, uniqueId, 'row', index];
        if (isHidden) r.push('hidden');

        rowKeyColumns.value.forEach(col => {
            let text = String(item[col.key]).toLowerCase();
            if (text.length > 50) text = text.substring(0, 50);
            text = replaceAll(text, ' ', '-');
            r.push(text);
        });

        return r.join('-');
    },
    createEnabled = computed(() => {
        if (typeof props.createEnabledValidator === 'function') return props.createEnabledValidator({items: Items.value});
        return true;
    }),
    computedDisplayCreateButton = computed(() => {
        return hasInlineCreateEverPerm.value
            || (hasCreatePerm.value && editModeEnabled.value)
            || (hasInlineCreatePerm.value && editModeEnabled.value)
            || (hasModalCreatePerm.value && editModeEnabled.value);
    }),
    canDisplayItem = (item: LktObject, index: number) => {
        if (typeof props.itemDisplayChecker === 'function') return props.itemDisplayChecker(item);
        return true;
    };

onMounted(() => {
    if (props.initialSorting) {
        sort(getColumnByKey(props.columns, SortBy.value));
    }
    dataState.value.store({items: Items.value}).turnStoredIntoOriginal();
    dataStateChanged.value = false;
    if (props.sortable) {
        nextTick(() => {
            initSortable();
        })
    }
})

watch(() => props.sortable, (v) => {
    if (v) {
        initSortable();
    } else {
        stopSortable();
    }
})

watch(() => props.perms, (v) => permissions.value = v);
watch(permissions, (v) => emit('update:perms', v));
watch(() => props.editMode, (v) => editModeEnabled.value = v);
watch(() => props.columns, (v) => Columns.value = v, {deep: true});
watch(() => props.modelValue, (v) => Items.value = v, {deep: true});
watch(Items, (v: any) => {
    dataState.value.increment({items: v});
    dataStateChanged.value = dataState.value.changed();
    emit('update:modelValue', v);
}, {deep: true});

defineExpose({
    getItemByEvent,
    getItemByIndex,
    getRowByIndex,
    doRefresh,
    getHtml: () => element.value,
});

const hasEmptySlot = computed(() => {
        return typeof Settings.defaultEmptySlot !== 'undefined';
    }),
    emptySlot = computed(() => {
        return Settings.defaultEmptySlot;
    });

</script>

<template>
    <section ref="element" class="lkt-table-page" :id="'lkt-table-page-' + uniqueId">
        <header v-if="computedTitle || slots.title" :class="headerClass">
            <component :is="computedTitleTag" v-if="computedTitle">
                <i v-if="titleIcon" :class="titleIcon"/>
                {{ computedTitle }}
            </component>
            <template v-if="slots.title">
                <slot name="title"/>
            </template>
        </header>

        <component
            :is="computedWrapContentTag"
            class="lkt-table-page-content-wrapper"
            :class="wrapContentClass"
        >
            <div
                class="lkt-table-page-buttons"
                v-if="showEditionButtons">
                <lkt-button
                    class="lkt-table--save-button"
                    ref="saveButton"
                    v-show="showSaveButton"
                    :icon="Settings.defaultSaveIcon"
                    :disabled="!ableToSave"
                    :confirm-modal="saveConfirm"
                    :confirm-data="confirmData"
                    :resource="saveResource"
                    :resource-data="computedSaveResourceData"
                    :split="splitSave"
                    :tooltip-engine="saveTooltipEngine"
                    v-on:loading="onButtonLoading"
                    v-on:loaded="onButtonLoaded"
                    v-on:click="onSave">
                    <slot v-if="!!slots['button-save']"
                          name="button-save"
                          :items="Items"
                          :edit-mode="editMode"
                          :can-update="!saveDisabled"></slot>
                    <span v-else>{{ computedSaveText }}</span>

                    <template v-slot:split="{doClose, doRootClick}">
                        <slot name="button-save-split"
                              :do-close="doClose"
                              :do-root-click="doRootClick"
                              :data-state="dataState"
                              :on-button-loading="onButtonLoading"
                              :on-button-loaded="onButtonLoaded" />
                    </template>
                </lkt-button>

                <create-button
                    v-if="computedDisplayCreateButton && Items.length >= requiredItemsForTopCreate"
                    :disabled="!createEnabled || createDisabled"
                    :text="createText"
                    :icon="createIcon"
                    :to="createRoute"
                    :modal="modal"
                    :modal-data="modalData"
                    @click="onClickAddItem"
                    @append="onAppend"
                />

                <div class="switch-edition-mode">
                    <lkt-field
                        type="switch"
                        v-show="switchEditionEnabled"
                        v-model="editModeEnabled"
                        :label="computedEditModeText"/>
                </div>
            </div>

            <div class="lkt-table-page-buttons"
                 v-if="slots.buttons">
                <slot name="buttons"/>
            </div>

            <div class="lkt-table-page-filters"
                 v-if="firstLoadReady && slots.filters">
                <slot name="filters" :items="Items" :is-loading="isLoading"/>
            </div>

            <lkt-loader v-if="isLoading"/>

            <div v-show="!isLoading && Items.length > 0" class="lkt-table" :data-sortable="sortable">
                <table v-if="Type === TypeOfTable.Table">
                    <thead>
                    <tr>
                        <th v-if="sortable && editModeEnabled" data-role="drag-indicator"/>
                        <th v-if="addNavigation && editModeEnabled"/>
                        <th v-if="displayHiddenColumnsIndicator"/>
                        <template v-for="column in visibleColumns">
                            <table-header
                                v-if="emptyColumns.indexOf(column.key) === -1"
                                :column="column"
                                :sort-by="SortBy"
                                :sort-direction="SortingDirection"
                                :amount-of-columns="columns.length"
                                :items="Items"
                                v-on:click="sort(column)"
                            />
                        </template>
                        <th
                            v-if="hasDropPerm && editModeEnabled"
                            class="lkt-table-col-drop"
                        />
                        <th
                            v-if="hasEditPerm && hasUpdatePerm && editModeEnabled"
                            class="lkt-table-col-edit"
                        />
                    </tr>
                    </thead>
                    <tbody
                        ref="tableBody"
                        :id="'lkt-table-body-' + uniqueId"
                    >
                        <lkt-table-row
                            v-for="(item, i) in Items"
                            v-model="Items[i]"
                            v-show="canDisplayItem(Items[i], i)"
                            :key="getRowKey(item, i)"
                            :i="i"
                            :display-hidden-columns-indicator="displayHiddenColumnsIndicator"
                            :is-draggable="isDraggable(item)"
                            :sortable="sortable"
                            :visible-columns="visibleColumns"
                            :empty-columns="emptyColumns"
                            :add-navigation="addNavigation"
                            :hidden-is-visible="isVisible(i)"
                            :latest-row="i+1 === amountOfItems"
                            :can-drop="hasDropPerm && editModeEnabled"
                            :drop-confirm="dropConfirm"
                            :drop-resource="dropResource"
                            :drop-text="dropText"
                            :drop-icon="dropIcon"
                            :can-edit="hasEditPerm && hasUpdatePerm && editModeEnabled"
                            :edit-text="editText"
                            :edit-icon="editIcon"
                            :edit-link="editLink"
                            :edit-mode-enabled="editModeEnabled"
                            :has-inline-edit-perm="hasInlineEditPerm"
                            :row-display-type="rowDisplayType"
                            :render-drag="renderDrag"
                            :disabled-drag="disabledDrag"
                            v-on:click="onClick"
                            v-on:show="show"
                            v-on:item-up="onItemUp"
                            v-on:item-down="onItemDown"
                            v-on:item-drop="onItemDrop"
                        >
                            <template v-if="slots[`item-${i}`]" v-slot:[`item-${i}`]="row">
                                <slot
                                    :name="`item-${i}`"
                                    :[slotItemVar]="row.item"
                                    v-bind:index="i"
                                />
                            </template>
                            <template v-else-if="slots.item" #item="row">
                                <slot
                                    name="item"
                                    :[slotItemVar]="row.item"
                                    v-bind:index="i"
                                />
                            </template>
                            <template
                                v-for="column in colSlots"
                                v-slot:[column]="row">
                                <slot
                                    :name="column"
                                    :[slotItemVar]="row.item"
                                    :value="row.value"
                                    :column="row.column"
                                />
                            </template>
                        </lkt-table-row>
                        <lkt-hidden-row
                            v-if="hiddenColumns.length > 0"
                            v-model="Items[i]"
                            v-for="(item, i) in Items"
                            :key="getRowKey(item, i, true)"
                            :i="i"
                            :hidden-columns="hiddenColumns"
                            :hidden-columns-col-span="hiddenColumnsColSpan"
                            :is-draggable="isDraggable(item)"
                            :sortable="sortable"
                            :visible-columns="visibleColumns"
                            :empty-columns="emptyColumns"
                            :hidden-is-visible="isVisible(i)"
                            v-on:click="onClick"
                            v-on:show="show"
                        >
                            <template
                                v-for="column in colSlots"
                                v-slot:[column]="row">
                                <slot
                                    :name="column"
                                    :[slotItemVar]="row.item"
                                    :value="row.value"
                                    :column="row.column"
                                />
                            </template>
                        </lkt-hidden-row>
                    </tbody>
                </table>

                <div v-else-if="Type === TypeOfTable.Item"
                     ref="tableBody"
                     :id="'lkt-table-body-' + uniqueId"
                     class="lkt-table-items-container"
                     :class="itemsContainerClass">
                    <template
                        v-for="(item, i) in Items">
                        <div
                            class="lkt-table-item"
                            v-if="canDisplayItem(item, i)"
                            :data-i="i"
                            :key="getRowKey(item, i)">
                            <slot name="item"
                                  v-bind:[slotItemVar]="item"
                                  v-bind:index="i"
                                  v-bind:editing="editModeEnabled"
                                  v-bind:can-create="hasCreatePerm"
                                  v-bind:can-read="hasReadPerm"
                                  v-bind:can-update="hasUpdatePerm"
                                  v-bind:can-drop="hasDropPerm"
                                  v-bind:is-loading="isLoading"
                                  v-bind:do-drop="() => onItemDrop(i)"
                            />
                        </div>
                    </template>
                </div>

                <ul v-else-if="TypeOfTable.Ul" class="lkt-table-items-container" :class="itemsContainerClass">
                    <template
                        v-for="(item, i) in Items">
                        <li class="lkt-table-item" v-if="canDisplayItem(item, i)" :data-i="i">
                            <slot name="item"
                                  v-bind:[slotItemVar]="item"
                                  v-bind:index="i"
                                  v-bind:editing="editModeEnabled"
                                  v-bind:can-create="hasCreatePerm"
                                  v-bind:can-read="hasReadPerm"
                                  v-bind:can-update="hasUpdatePerm"
                                  v-bind:can-drop="hasDropPerm"
                                  v-bind:is-loading="isLoading"
                                  v-bind:do-drop="() => onItemDrop(i)"
                            />
                        </li>
                    </template>
                </ul>

                <ol v-else-if="TypeOfTable.Ul" class="lkt-table-items-container" :class="itemsContainerClass">
                    <template
                        v-for="(item, i) in Items">
                        <li class="lkt-table-item" v-if="canDisplayItem(item, i)" :data-i="i">
                            <slot name="item"
                                  v-bind:[slotItemVar]="item"
                                  v-bind:index="i"
                                  v-bind:editing="editModeEnabled"
                                  v-bind:can-create="hasCreatePerm"
                                  v-bind:can-read="hasReadPerm"
                                  v-bind:can-update="hasUpdatePerm"
                                  v-bind:can-drop="hasDropPerm"
                                  v-bind:is-loading="isLoading"
                                  v-bind:do-drop="() => onItemDrop(i)"
                            />
                        </li>
                    </template>
                </ol>
            </div>

            <div class="lkt-table-empty" v-if="!isLoading && Items.length === 0">
                <template v-if="slots.empty">
                    <slot name="empty"/>
                </template>
                <template v-else-if="hasEmptySlot">
                    <component :is="emptySlot" :message="noResultsText"/>
                </template>
                <template v-else-if="noResultsText">
                    {{ noResultsText }}
                </template>
            </div>

            <div v-if="computedDisplayCreateButton || slots.bottomButtons"
                 class="lkt-table-page-buttons lkt-table-page-buttons-bottom">
                <create-button
                    v-if="computedDisplayCreateButton && Items.length >= requiredItemsForBottomCreate"
                    :disabled="!createEnabled || createDisabled"
                    :text="createText"
                    :icon="createIcon"
                    :to="createRoute"
                    :modal="modal"
                    :modal-data="modalData"
                    @click="onClickAddItem"
                    @append="onAppend"
                />
                <slot name="bottom-buttons"/>
            </div>

            <lkt-paginator
                ref="paginator"
                v-if="resource.length > 0"
                v-model="Page"
                :resource="resource"
                :filters="filters"
                v-on:loading="onLoading"
                v-on:perms="onPerms"
                v-on:response="onPaginatorResponse"
            />

        </component>
    </section>
</template>