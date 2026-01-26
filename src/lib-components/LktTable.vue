<script lang="ts" setup>
import {Carousel, Navigation, Pagination, Slide} from "vue3-carousel";
import {colPreferSlot, defaultTableSorter, getColumnByKey, getDefaultSortColumn} from "../functions/table-functions";
import LktTableRow from "../components/LktTableRow.vue";
import {computed, nextTick, onMounted, ref, useSlots, watch} from "vue";
import {
    AccordionConfig,
    ButtonConfig,
    ButtonType,
    CalendarConfig,
    CalendarItemConfig,
    ClickEventArgs,
    Column,
    ColumnConfig, DotConfig,
    EmptySlotData,
    ensureButtonConfig,
    extractI18nValue, FormUiConfig,
    getDefaultValues,
    HeaderConfig,
    ItemSlotComponentConfig,
    LktObject,
    LktSettings,
    PaginatorConfig,
    PaginatorType,
    SortDirection,
    Table,
    TableConfig,
    TablePermission,
    TableRowType,
    TableType
} from "lkt-vue-kernel";
import {generateRandomString, replaceAll} from "lkt-string-tools";
import {DataState} from "lkt-data-state";
import {HTTPResponse} from "lkt-http-client";
import CreateButton from "../components/CreateButton.vue";
import Sortable from 'sortablejs';
import TableHeader from "../components/TableHeader.vue";
import {date, findOldestAndNewestDateInObjects, time} from "lkt-date-tools";
import {Settings} from "../settings/Settings";
import LktTableCell from "../components/LktTableCell.vue";

const emit = defineEmits([
    'update:modelValue',
    'update:perms',
    'update:loading',
    'update:editMode',
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

//@ts-nocheck
const props = withDefaults(defineProps<TableConfig>(), getDefaultValues(Table));

const Sorter = ref(typeof props.sorter === 'function' ? props.sorter : defaultTableSorter),
    SortBy = ref(getDefaultSortColumn(props.columns)),
    SortingDirection = ref(SortDirection.Asc),
    Items = ref(props.modelValue),
    tableBody = ref(<HTMLElement | null>null),
    Columns = ref(props.columns),
    accordionsModelValue = ref([]);

const Page = ref(props.paginator?.modelValue),
    isLoading = ref(props.loading),
    firstLoadReady = ref(false),
    permissions = ref(props.perms),
    paginatorRef = ref(null),
    element = ref(null),
    saveButtonRef = ref(null),
    sortableObject = ref({}),
    dataState = ref(<DataState>new DataState({items: Items.value}, props.dataStateConfig)),
    editModeEnabled = ref(props.editMode),
    updateTimeStamp = ref(0),
    sortableContainer = ref(<HTMLElement | null>null),
    activeType = ref(props.type),
    currentSlide = ref(props.carousel?.currentSlide || 0),
    timelineOldestDate = ref(<Date | undefined>undefined),
    timelineNewestDate = ref(<Date | undefined>undefined),
    timelineVisibleDate = ref(<Date | undefined>undefined),
    filtersFormData = ref(<LktObject>{
        ...typeof props.paginator.resourceData === 'object' ? props.paginator.resourceData : {}
    }),
    paginatorResourceData = ref(<LktObject>{
        ...typeof props.paginator.resourceData === 'object' ? props.paginator.resourceData : {}
    })
;

const safeSaveButton = ref(ensureButtonConfig(props.saveButton, LktSettings.defaultSaveButton)),
    safeCreateButton = ref(ensureButtonConfig(props.createButton, LktSettings.defaultCreateButton)),
    safeInlineCreateButton = ref(ensureButtonConfig(props.createButton, LktSettings.defaultInlineCreateButton)),
    safeEditModeButton = ref(ensureButtonConfig(props.editModeButton, LktSettings.defaultEditModeButton)),
    safeGroupButton = ref(ensureButtonConfig(props.groupButton, LktSettings.defaultGroupButton));

watch(() => props.saveButton, (v) => safeSaveButton.value = ensureButtonConfig(props.saveButton, LktSettings.defaultSaveButton));
watch(() => props.createButton, (v) => safeCreateButton.value = ensureButtonConfig(props.createButton, LktSettings.defaultCreateButton));
watch(() => props.editModeButton, (v) => safeEditModeButton.value = ensureButtonConfig(props.editModeButton, LktSettings.defaultEditModeButton));

const dataStateChanged = ref(false);

watch(isLoading, v => emit('update:loading', v));

watch(Page, (v) => emit('page', v));

const onPerms = (r: string[]) => {
        permissions.value = r;
    },
    onPaginatorResponse = (r: HTTPResponse) => {
        if (Array.isArray(r.data)) {
            let rawItems = r.data;
            if (typeof props.events?.parseResults === 'function') {
                rawItems = props.events.parseResults(rawItems);
            }
            Items.value = [...Items.value, ...rawItems];

            if ([PaginatorType.TimelineAsc, PaginatorType.TimelineDesc, PaginatorType.TimelineAscDesc].includes(props.paginator?.type)) {
                const dateRange = findOldestAndNewestDateInObjects(Items.value, props.paginator.dateKey);
                timelineOldestDate.value = dateRange.oldest;
                timelineNewestDate.value = dateRange.newest;
            }
        }
        isLoading.value = false;
        firstLoadReady.value = true;
        dataState.value.store({items: Items.value}).turnStoredIntoOriginal();
        dataStateChanged.value = false;
        nextTick(() => {
            // reRender();
            saveIsDisabled.value; // Force calc call
            emit('read-response', r);
        })
    },
    onLoading = () => nextTick(() => {
        const paginator = props.paginator;
        const typeOfPaginator = paginator?.type;

        let hasToClean = true;

        if (typeOfPaginator) {
            if ([PaginatorType.LoadMore, PaginatorType.Infinite].includes(typeOfPaginator)) hasToClean = false;
            else if ([PaginatorType.TimelineDesc, PaginatorType.TimelineAsc, PaginatorType.TimelineAscDesc].includes(typeOfPaginator) && props.paginator.timeline?.accumulative) {
                hasToClean = false;
            }
        }

        if (hasToClean) {
            Items.value.splice(0, Items.value.length);
        }

        isLoading.value = true
    }),
    doRefresh = () => {
        //@ts-ignore
        paginatorRef.value.doRefresh();
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
    rowKeyColumns = computed(() => {
        return Columns.value.filter((c: Column) => c.isForRowKey);
    }),
    columnKeys = computed((): string[] => {
        return Columns.value.map(c => c.key);

    }),
    colSlots = computed((): string[] => {
        let r: string[] = [];
        for (let k in slots) if (columnKeys.value.indexOf(k) !== -1) r.push(k);
        return r;
    }),
    slides = computed((): LktObject => {
        let r = [];
        for (let k in slots) if (k.indexOf('slide-') !== -1) r.push(k);
        return r;
    }),
    showSaveButton = computed(() => {
        if (props.hiddenSave) return false;
        if (isLoading.value) return false;
        if (!(safeSaveButton.value?.resource || safeSaveButton.value.type)) return false;
        if (editModeEnabled.value && dataStateChanged.value) return true;

        return editModeEnabled.value;
    }),
    showEditionButtons = computed(() => {
        if (computedDisplayCreateButton.value && Items.value.length >= props.requiredItemsForTopCreate) return true;
        if (showSwitchButton.value) return true;
        return showSaveButton.value || (editModeEnabled.value && hasCreatePerm.value);
    }),
    saveIsDisabled = computed(() => {
        updateTimeStamp.value;
        if (typeof safeSaveButton.value?.disabled === 'function') return safeSaveButton.value.disabled({
            value: Items.value,
            dataState: <DataState>dataState.value,
        });
        if (typeof safeSaveButton.value?.disabled === 'boolean') return safeSaveButton.value.disabled;
        return !dataStateChanged.value;
    }),
    amountOfItems = computed(() => {
        return Items.value.length;
    }),
    computedSaveResourceData = computed(() => {
        return {
            items: Items.value,
            ...safeSaveButton.value?.resourceData
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
        return extractI18nValue(props.title);
    }),
    computedDragModeEnabled = computed(() => {
        return props.drag?.enabled;
    }),
    hasCreatePerm = computed(() => permissions.value.includes(TablePermission.Create)),
    hasReadPerm = computed(() => permissions.value.includes('read')),
    hasUpdatePerm = computed(() => permissions.value.includes(TablePermission.Update)),
    hasEditPerm = computed(() => permissions.value.includes(TablePermission.Edit)),
    hasInlineEditPerm = computed(() => permissions.value.includes(TablePermission.InlineEdit)),
    hasModalCreatePerm = computed(() => permissions.value.includes(TablePermission.ModalCreate)),
    hasInlineCreatePerm = computed(() => permissions.value.includes(TablePermission.InlineCreate)),
    hasInlineCreateEverPerm = computed(() => permissions.value.includes(TablePermission.InlineCreateEver)),
    hasDropPerm = computed(() => permissions.value.includes(TablePermission.Drop)),
    canSwitchEditMode = computed(() => permissions.value.includes(TablePermission.SwitchEditMode)),

    showSwitchButton = computed(() => {
        if (!canSwitchEditMode.value) return false;
        if (!hasUpdatePerm.value && !hasDropPerm.value) return false;
        if (!hasUpdatePerm.value && hasDropPerm.value) return false;

        return !isLoading.value;
    }),
    computedShowItems = computed(() => {
        if (typeof props.paginator?.type !== 'undefined') {
            if ([PaginatorType.LoadMore, PaginatorType.Infinite].includes(props.paginator.type)) {
                return Items.value.length > 0;
            }
        }

        return !isLoading.value && Items.value.length > 0;
    }),

    computedAccordionHeaderColumn = computed(() => {
        return Columns.value.find(c => c.isForAccordionHeader);
    }),

    computedCalendarDateColumn = computed(() => {
        return Columns.value.find(c => c.isCalendarDate);
    }),

    computedCalendarGroupColumn = computed(() => {
        return Columns.value.find(c => c.isCalendarGroup);
    })
;

const getCustomSlotName = (item: LktObject, i: number) => {
    if (typeof props.customItemSlotName === 'function') return props.customItemSlotName(item, i);
    return '';
}


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
    reRender = () => {
        updateTimeStamp.value = time();
    },
    getItemByIndex = (index: number) => {
        return Items.value[index];
    },
    getRowByIndex = (index: number) => {
        return tableBody.value?.querySelector(`[data-i="${index}"]`);
    },
    sort = (column: ColumnConfig | null) => {
        if (!column) return;
        if (column.sortable) {
            if (column.key === SortBy.value) {
                SortingDirection.value = SortingDirection.value === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc;
            }
            SortBy.value = column.key;
            Items.value = Items.value.sort((a: any, b: any) => {
                return Sorter.value(a, b, column, SortingDirection.value);
            });
            reRender();
            emit('sort', {
                sortBy: SortBy.value,
                sortDirection: SortingDirection.value,
            });
        }
    },
    onClick = ($event: any) => {
        emit('click', $event);
    },
    validDragChecker = (evt: any) => {
        let targetIndex = parseInt(evt?.originalEvent?.toElement?.closest('tr')?.dataset?.i);
        if (typeof props.drag?.isValid === 'function' && !props.drag?.isValid(Items.value[targetIndex])) return false;
        if (typeof props.drag?.isValid === 'boolean' && !props.drag?.isValid) return false;
        return true;
    },
    isDraggable = (element: any) => {
        if (typeof props.drag?.isDraggable === 'function') return props.drag?.isDraggable(element);
        return true;
    },
    onClickAddItem = () => {
        if (hasCreatePerm.value) {
            emit('click-create');
            return;
        }

        if (hasInlineCreatePerm.value || hasInlineCreateEverPerm.value) {
            if (typeof props.newValueGenerator === 'function') {
                let newValue = props.newValueGenerator();

                if (typeof newValue === 'object' || computedType.value !== TableType.Table) {
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
    onButtonLoading = () => isLoading.value = true,
    onButtonLoaded = () => isLoading.value = false,
    onSave = ($event: PointerEvent, r: HTTPResponse) => {
        if (safeSaveButton.value?.type) {
            if ([
                ButtonType.Split,
                ButtonType.SplitEver,
                ButtonType.SplitLazy,
            ].includes(safeSaveButton.value?.type)) {
                return;
            }
        }

        emit('before-save');
        if (safeSaveButton.value?.resource) {
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
        reRender();
    },
    onItemDown = (i) => {
        moveArrayPosition(Items.value, i, i + 1);
        reRender();
    },
    onItemDrop = (i) => {
        Items.value.splice(i, 1);
        reRender();
    },
    stopSortable = () => {
        //@ts-ignore
        if (sortableObject.value && typeof sortableObject.value?.destroy === 'function') {
            //@ts-ignore
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
                reRender();
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
        if (props.createButton === false) return false;
        return hasInlineCreateEverPerm.value
            || (hasCreatePerm.value && editModeEnabled.value)
            || (hasInlineCreatePerm.value && editModeEnabled.value)
            || (hasModalCreatePerm.value && editModeEnabled.value);
    }),
    computedDisplayInlineCreateButton = computed(() => {
        if (props.createButton === false) return false;
        return hasInlineCreateEverPerm.value
            || (hasInlineCreatePerm.value && editModeEnabled.value)
            || (hasModalCreatePerm.value && editModeEnabled.value);
    }),
    computedIsList = computed(() => {
        return [TableType.Ol, TableType.Ul].includes(computedType.value);
    }),
    canDisplayItem = (item: LktObject, index: number) => {
        if (typeof props.itemDisplayChecker === 'function') return props.itemDisplayChecker(item, index);
        return true;
    },
    getItemContainerClass = (item: LktObject, index: number) => {
        if (typeof props.itemContainerClass === 'function') return props.itemContainerClass(item, index);
        return props.itemContainerClass;
    },
    getItemContainerStyle = (item: LktObject, index: number) => {
        if (typeof props.itemContainerStyle === 'function') return props.itemContainerStyle(item, index);
        return props.itemContainerStyle;
    },
    getAccordionHeaderText = (item: LktObject, index: number) => {
        if (!computedAccordionHeaderColumn.value) return '';

        return item[computedAccordionHeaderColumn.value.key];
    };

const computedItemSlotComponent = computed(() => {
    if (typeof props.itemSlotComponent === 'function') return props.itemSlotComponent();
    return props.itemSlotComponent;
})
const computedItemSlotData = computed(() => {
    if (typeof props.itemSlotData === 'function') return props.itemSlotData();
    return props.itemSlotData;
})

onMounted(() => {
    if (props.initialSorting) {
        sort(getColumnByKey(props.columns, SortBy.value));
    }
    dataState.value.store({items: Items.value}).turnStoredIntoOriginal();
    dataStateChanged.value = false;
    if (props.drag?.enabled) {
        nextTick(() => {
            initSortable();
        })
    }
})

watch(() => props.drag?.enabled, (v) => {
    if (v) {
        initSortable();
    } else {
        stopSortable();
    }
})

watch(() => props.type, (v) => {
    if (props.drag?.enabled) {
        initSortable();
    } else {
        stopSortable();
    }
})

watch(() => props.perms, (v) => permissions.value = v);
watch(permissions, (v) => emit('update:perms', v));
watch(editModeEnabled, (v) => {
    emit('update:editMode', v);
});
watch(() => props.editMode, (v) => editModeEnabled.value = v);
watch(() => props.columns, (v) => Columns.value = v, {deep: true});
watch(() => props.modelValue, (v) => {
    Items.value = v;
}, {deep: true});
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
    doRemoveIndex: (index: number) => {
        if (accordionsModelValue.value[index] === true) accordionsModelValue.value[index] = false;
        Items.value.splice(index, 1);
        reRender();
    },
    getHtml: () => element.value,
    reRender,
    turnStoredIntoOriginal: () => {
        dataState.value.turnStoredIntoOriginal();
        nextTick(() => {
            reRender();
        })
    },
});

const hasEmptySlot = computed(() => {
        return typeof Settings.defaultEmptySlot !== 'undefined';
    }),
    emptySlot = computed(() => {
        return Settings.defaultEmptySlot;
    }),
    computedNoResultsConfig = computed(() => {
        if (typeof props.noResults !== 'object') return undefined;

        let r = <EmptySlotData>{
            ...props.noResults
        }

        if (r.text) r.text = extractI18nValue(r.text);
        return r;
    }),
    computedRenderDrag = computed(() => {
        if (!props.drag || Object.keys(props.drag).length === 0) return false;
        if (!props.drag.enabled) return false;
        if (typeof props.drag.canRender === 'undefined') return true;
        return props.drag.canRender;
    }),
    computedDisabledDrag = computed(() => {
        if (!props.drag || Object.keys(props.drag).length === 0) return false;
        if (!props.drag.enabled) return false;
        if (typeof props.drag.isDisabled === 'undefined') return false;
        return props.drag.isDisabled;
    }),
    displayLktHeader = computed(() => {
        return typeof props.header === 'object'
            && Object.keys(props.header).length > 0;
    }),
    displayFiltersLktForm = computed(() => {
        return typeof props.filtersForm === 'object'
            && Object.keys(props.filtersForm).length > 0;
    }),
    computedType = computed(() => {
        if (!Array.isArray(props.switchableTypes)) return props.type;
        if (props.switchableTypes.length > 0) {
            return activeType.value;
        }
        return props.type;
    });

const availableTypes = computed(() => {
        if (!Array.isArray(props.switchableTypes)) return [];
        if (props.switchableTypes.length > 0) {
            if (!props.switchableTypes.includes(props.type)) {
                return [
                    props.type,
                    ...props.switchableTypes,
                ]
            }
            return props.switchableTypes;
        }
        return [];
    }),
    computedSwitchTypesButtons = computed(() => {
        let r: Array<ButtonConfig> = [];
        availableTypes.value.forEach(type => {
            let data = props.switchableTypesButtons[type];
            r.push(<ButtonConfig>{
                ...data,
                class: [data.class, type === computedType.value ? 'is-current' : ''].join(' '),
                events: {
                    click: (args: ClickEventArgs) => {

                        activeType.value = type;

                        if (typeof props.switchableTypesButtons[type].events?.click === 'function') {
                            props.switchableTypesButtons[type].events.click(args);
                        }

                        if (typeof props.events?.viewChanged === 'function') {
                            props.events.viewChanged(type);
                        }
                    }
                }
            });
        });
        return r;
    }),
    computedHeaderConfig = computed(() => {
        return <HeaderConfig>{
            ...props.header,
            topEndButtons: [
                ...typeof props.header?.topEndButtons === 'undefined' ? [] : props.header?.topEndButtons,
                ...computedSwitchTypesButtons.value,
            ]
        }
    });

const checkUseItemSlot = (item: LktObject, index: number) => {

    if (typeof props.useItemSlot === 'function') return props.useItemSlot({item, index}) === true;

    return props.useItemSlot;
}

const computedCalendarEvents = computed(() => {
    if (computedType.value !== TableType.Calendar || !computedCalendarDateColumn.value || typeof computedCalendarDateColumn.value === 'undefined') return [];

    let r: Array<CalendarItemConfig> = [];
    let rControl: Array<string> = [];

    Items.value.forEach((item: LktObject) => {
        let dateObj = item[computedCalendarDateColumn.value.key];
        let stringDate = date('Y-m-d H:i:s', dateObj);

        let groupValue: string | undefined = undefined;
        if (computedCalendarGroupColumn.value?.key) {
            groupValue = item[computedCalendarGroupColumn.value.key];
        }

        const controlKey = [stringDate, groupValue].join('-');

        let i = -1;
        if (!rControl.includes(controlKey)) {

            let groupConfig:Partial<DotConfig> = {};
            if (groupValue && props.calendarGroups && typeof props.calendarGroups[groupValue] === 'object') {
                groupConfig = props.calendarGroups[groupValue];
            }

            let generatedClassName = `lkt-calendar-group--${groupValue}`;
            if (groupConfig.class) {
                groupConfig.class = [
                    groupConfig.class, generatedClassName
                ].join(' ')
            } else {
                groupConfig.class = generatedClassName;
            }

            i = rControl.length;
            rControl.push(controlKey);
            r.push({
                date: dateObj,
                data: {
                    items: [],
                },
                dot: {
                    ...groupConfig,
                },
            })
        } else {
            i = rControl.findIndex(v => v === controlKey);
        }

        r[i].data.items.push(item);
    })

    return r;
});

const calendarEvents = {
    dayPicked: ((args: {
        pickedDate: Date,
        items: Array<CalendarItemConfig>
    }) => {
        if (typeof props.calendar.events?.dayPicked === 'function') {
            props.calendar.events.dayPicked(args);
        }
    }),
    visibleMonthChanged: ((args: {
        visibleDate: Date
    }) => {
        if (typeof props.calendar.events?.visibleMonthChanged === 'function') {
            props.calendar.events.visibleMonthChanged(args);
        }

        timelineVisibleDate.value = args.visibleDate;
    })
}

let filterFormTimeout = null;
watch(filtersFormData, () => {
    clearTimeout(filterFormTimeout);
    filterFormTimeout = setTimeout(() => {
        paginatorResourceData.value = {
            ...paginatorResourceData.value,
            ...filtersFormData.value,
        }
    }, 400);
}, {deep: true})

const onAccordionToggled = (status, i, item) => {
    if (status && props.accordionList?.limitOpened) {
        accordionsModelValue.value.forEach((val, k) => {
            if (val && k !== i) accordionsModelValue.value[k] = false;
        })
    }
}


</script>

<template>
    <section ref="element" class="lkt-table-page" :id="'lkt-table-page-' + uniqueId">
        <lkt-header v-if="displayLktHeader" v-bind="computedHeaderConfig"/>
        <header v-else-if="computedTitle || slots.title" :class="headerClass">
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
                v-show="showEditionButtons">

                <template v-if="groupButton !== false">
                    <lkt-button
                        ref="groupButton"
                        v-bind="safeGroupButton"
                        class="lkt-item-crud-group-button"
                    >
                        <template #split>

                            <div class="switch-edition-mode">
                                <lkt-button
                                    v-bind="safeEditModeButton"
                                    v-show="showSwitchButton"
                                    v-model:checked="editModeEnabled"/>
                            </div>


                            <template v-if="slots['prev-buttons-ever']" v-show="!isLoading">
                                <slot name="prev-buttons-ever"
                                      :can-update="hasUpdatePerm"
                                      :can-drop="hasDropPerm"
                                      :perms="perms"
                                />
                            </template>

                            <template v-if="slots['prev-buttons']" v-show="isEditing && !isLoading">
                                <slot name="prev-buttons"
                                      :can-update="hasUpdatePerm"
                                      :can-drop="hasDropPerm"
                                      :perms="perms"
                                />
                            </template>

                            <lkt-button
                                class="lkt-table--save-button"
                                ref="saveButtonRef"
                                v-show="showSaveButton"
                                v-bind="<ButtonConfig>{
                                    ...safeSaveButton,
                                    disabled: saveIsDisabled,
                                    resourceData: computedSaveResourceData
                                }"
                                @loading="onButtonLoading"
                                @loaded="onButtonLoaded"
                                @click="onSave">
                                <slot v-if="!!slots['button-save']"
                                      name="button-save"
                                      :items="Items"
                                      :edit-mode="editMode"
                                      :can-update="!saveIsDisabled"/>

                                <template v-slot:split="{doClose, doRootClick}">
                                    <slot name="button-save-split"
                                          :do-close="doClose"
                                          :do-root-click="doRootClick"
                                          :data-state="dataState"
                                          :on-button-loading="onButtonLoading"
                                          :on-button-loaded="onButtonLoaded"
                                    />
                                </template>
                            </lkt-button>

                            <create-button
                                v-if="computedDisplayCreateButton && Items.length >= requiredItemsForTopCreate"
                                :config="safeCreateButton"
                                :disabled="!createEnabled"
                                @click="onClickAddItem"
                                @append="onAppend"
                            />
                        </template>
                    </lkt-button>

                </template>


                <template v-if="slots['prev-buttons-ever']" v-show="!isLoading">
                    <slot name="prev-buttons-ever"
                          :can-update="hasUpdatePerm"
                          :can-drop="hasDropPerm"
                          :perms="perms"
                    />
                </template>

                <template v-if="slots['prev-buttons']" v-show="isEditing && !isLoading">
                    <slot name="prev-buttons"
                          :can-update="hasUpdatePerm"
                          :can-drop="hasDropPerm"
                          :perms="perms"
                    />
                </template>

                <lkt-button
                    class="lkt-table--save-button"
                    ref="saveButtonRef"
                    v-show="showSaveButton"
                    v-bind="<ButtonConfig>{
                        ...safeSaveButton,
                        disabled: saveIsDisabled,
                        resourceData: computedSaveResourceData
                    }"
                    @loading="onButtonLoading"
                    @loaded="onButtonLoaded"
                    @click="onSave">
                    <slot v-if="!!slots['button-save']"
                          name="button-save"
                          :items="Items"
                          :edit-mode="editMode"
                          :can-update="!saveIsDisabled"/>

                    <template v-slot:split="{doClose, doRootClick}">
                        <slot name="button-save-split"
                              :do-close="doClose"
                              :do-root-click="doRootClick"
                              :data-state="dataState"
                              :on-button-loading="onButtonLoading"
                              :on-button-loaded="onButtonLoaded"
                        />
                    </template>
                </lkt-button>

                <create-button
                    v-if="computedDisplayInlineCreateButton && Items.length >= requiredItemsForTopCreate"
                    :config="safeInlineCreateButton"
                    :disabled="!createEnabled"
                    @click="onClickAddItem"
                    @append="onAppend"
                />
                <create-button
                    v-else-if="computedDisplayCreateButton && Items.length >= requiredItemsForTopCreate"
                    :config="safeCreateButton"
                    :disabled="!createEnabled"
                    @click="onClickAddItem"
                    @append="onAppend"
                />

                <div class="switch-edition-mode">
                    <lkt-button
                        v-bind="safeEditModeButton"
                        v-show="showSwitchButton"
                        v-model:checked="editModeEnabled"/>
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

            <lkt-form
                v-if="displayFiltersLktForm"
                v-model="filtersFormData"
                v-model:editing="editModeEnabled"
                v-model:perms="permissions"
                v-bind="<FormUiConfig>{
                    form: filtersForm
                }"
            />

            <div v-show="computedShowItems" class="lkt-table">
                <table v-if="computedType === TableType.Table">
                    <thead v-if="!hideTableHeader">
                    <tr>
                        <th v-if="computedDragModeEnabled && editModeEnabled" data-role="drag-indicator"/>
                        <th v-if="addNavigation && editModeEnabled"/>
                        <template v-for="column in visibleColumns">
                            <table-header
                                v-if="emptyColumns.indexOf(column.key) === -1"
                                :column="column"
                                :sort-by="SortBy"
                                :sort-direction="SortingDirection"
                                :amount-of-columns="columns.length"
                                :items="Items"
                                @click="sort(column)"
                            />
                        </template>
                    </tr>
                    </thead>
                    <tbody
                        ref="tableBody"
                        :id="'lkt-table-body-' + uniqueId"
                        :class="itemsContainerClass"
                    >
                    <lkt-table-row
                        v-for="(item, i) in Items"
                        v-model="Items[i]"
                        v-show="canDisplayItem(Items[i], i)"
                        :key="getRowKey(item, i)"
                        :i="i"
                        :is-draggable="isDraggable(item)"
                        :sortable="computedDragModeEnabled"
                        :visible-columns="visibleColumns"
                        :empty-columns="emptyColumns"
                        :add-navigation="addNavigation"
                        :latest-row="i+1 === amountOfItems"
                        :can-drop="hasDropPerm && editModeEnabled"
                        :can-edit="hasEditPerm && hasUpdatePerm && editModeEnabled"
                        :can-read="hasReadPerm"
                        :can-create="hasCreatePerm"
                        :edit-mode-enabled="editModeEnabled"
                        :has-inline-edit-perm="hasInlineEditPerm"
                        :row-display-type="rowDisplayType"
                        :render-drag="computedRenderDrag"
                        :disabled-drag="computedDisabledDrag"
                        :is-loading="isLoading"
                        :item-container-class="itemContainerClass"
                        :item-slot-component="computedItemSlotComponent"
                        :item-slot-data="computedItemSlotData"
                        :item-slot-events="itemSlotEvents"
                        :permissions="permissions"
                        @click="onClick"
                        @item-up="onItemUp"
                        @item-down="onItemDown"
                        @item-drop="onItemDrop"
                    >
                        <template v-if="slots[`item-${i}`] && checkUseItemSlot(row, i)" v-slot:[`item-${i}`]="row">
                            <slot
                                :name="`item-${i}`"
                                :[slotItemVar]="row.item"
                                v-bind:index="i"
                                v-bind:editing="row.editing"
                                v-bind:can-create="row.canCreate"
                                v-bind:can-read="row.canRead"
                                v-bind:can-update="row.canUpdate"
                                v-bind:can-drop="row.canDrop"
                                v-bind:is-loading="row.isLoading"
                                v-bind:do-drop="row.doDrop"
                            />
                        </template>
                        <template v-else-if="slots.item && checkUseItemSlot(row, i)" #item="row">
                            <slot
                                name="item"
                                :[slotItemVar]="row.item"
                                v-bind:index="i"
                                v-bind:editing="row.editing"
                                v-bind:can-create="row.canCreate"
                                v-bind:can-read="row.canRead"
                                v-bind:can-update="row.canUpdate"
                                v-bind:can-drop="row.canDrop"
                                v-bind:is-loading="row.isLoading"
                                v-bind:do-drop="row.doDrop"
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
                    </tbody>
                </table>

                <div v-else-if="computedType === TableType.Item"
                     ref="tableBody"
                     :id="'lkt-table-body-' + uniqueId"
                     class="lkt-table-items-container"
                     :class="itemsContainerClass">
                    <template
                        v-for="(item, i) in Items" :key="getRowKey(item, i)">
                        <div
                            v-if="!skipTableItemsContainer && canDisplayItem(item, i)"
                            class="lkt-table-item"
                            :class="getItemContainerClass(item, i)"
                            :style="getItemContainerStyle(item, i)"
                            :data-i="i"
                        >
                            <div v-if="sortable && editModeEnabled" class="handle" :data-i="i">
                                <i class="lkt-icn-drag-indicator"/>
                            </div>

                            <template v-if="computedItemSlotComponent">
                                <component
                                    :is="computedItemSlotComponent"
                                    v-bind="<ItemSlotComponentConfig>{
                                        item,
                                        index: i,
                                        editing: editModeEnabled,
                                        perms: permissions,
                                        data: computedItemSlotData,
                                        events: itemSlotEvents
                                    }"
                                />
                            </template>
                            <slot
                                v-else
                                name="item"
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
                        <slot
                            v-else-if="canDisplayItem(item, i)"
                            name="item"
                            :class="getItemContainerClass(item, i)"
                            :data-i="i"

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
                    </template>
                </div>

                <div v-else-if="computedType === TableType.Accordion"
                     ref="tableBody"
                     :id="'lkt-table-body-' + uniqueId"
                     class="lkt-table-items-container"
                     :class="itemsContainerClass">
                    <template
                        v-for="(item, i) in Items">
                        <template
                            v-if="[TableRowType.Auto, TableRowType.PreferCustomItem].includes(rowDisplayType) && slots[getCustomSlotName(item, i)]">
                            <slot
                                :name="getCustomSlotName(item, i)"
                                :item="item"
                                v-bind:index="i"
                                v-bind:editing="editModeEnabled"
                                v-bind:is-loading="isLoading"
                            />
                        </template>
                        <template
                            v-else-if="[TableRowType.Auto, TableRowType.PreferCustomItem].includes(rowDisplayType) && slots[`item-${i}`]">
                            <slot
                                :name="`item-${i}`"
                                :item="item"
                                v-bind:index="i"
                                v-bind:editing="editModeEnabled"
                                v-bind:is-loading="isLoading"
                            />
                        </template>
                        <template v-else>
                            <lkt-accordion
                                v-if="canDisplayItem(item, i)"
                                v-model="accordionsModelValue[i]"
                                class="lkt-table-item"
                                :class="getItemContainerClass(item, i)"
                                :data-i="i"
                                :key="getRowKey(item, i)"
                                v-bind="<AccordionConfig>{
                                    ...accordion,
                                    title: getAccordionHeaderText(item, i),
                                }"
                                @update:modelValue="onAccordionToggled($event, i, item)"
                            >
                                <template #header>
                                    <lkt-table-cell
                                        v-model="Items[i]"
                                        :i="i"
                                        :column="computedAccordionHeaderColumn"
                                        :columns="visibleColumns"
                                        :edit-mode-enabled="editModeEnabled"
                                        :has-inline-edit-perm="hasInlineEditPerm"
                                    />
                                </template>

                                <template v-for="column in visibleColumns">
                                    <template
                                        v-if="column.key !== computedAccordionHeaderColumn?.key && !!$slots[column.key] && colPreferSlot(column, Items[i])">
                                        <slot :name="column.key"
                                              :value="Items[i][column.key]"
                                              :item="Items[i]"
                                              :column="column"
                                              :i="i"
                                        />
                                    </template>
                                    <template v-else>
                                        <lkt-table-cell
                                            v-if="column.key !== computedAccordionHeaderColumn?.key"
                                            v-model="Items[i]"
                                            :i="i"
                                            :column="column"
                                            :columns="visibleColumns"
                                            :edit-mode-enabled="editModeEnabled"
                                            :has-inline-edit-perm="hasInlineEditPerm"
                                        />
                                    </template>
                                </template>
                            </lkt-accordion>
                        </template>
                    </template>
                </div>

                <component :is="computedType" v-else-if="computedIsList" class="lkt-table-items-container"
                           :class="itemsContainerClass">
                    <template
                        v-for="(item, i) in Items" :key="getRowKey(item, i)">
                        <li class="lkt-table-item"
                            :class="getItemContainerClass(item, i)"
                            v-if="canDisplayItem(item, i)"
                            :data-i="i"
                            :style="getItemContainerStyle(item, i)"
                        >
                            <template v-if="computedItemSlotComponent">
                                <component
                                    :is="computedItemSlotComponent"
                                    v-bind="<ItemSlotComponentConfig>{
                                        item,
                                        index: i,
                                        editing: editModeEnabled,
                                        perms: permissions,
                                        data: computedItemSlotData,
                                        events: itemSlotEvents
                                    }"
                                />
                            </template>
                            <slot v-else name="item"
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
                </component>

                <div v-else-if="computedType === TableType.Carousel"
                     ref="tableBody"
                     :id="'lkt-table-body-' + uniqueId"
                     class="lkt-table-items-container"
                     :class="itemsContainerClass">
                    <carousel
                        v-model="currentSlide"
                        v-bind="carousel"
                        :wrap-around="carousel?.infinite === true"
                    >
                        <template v-for="(slide, i) in slides" :key="slide">
                            <slide :index="i">
                                <div class="lkt-carousel-slide">
                                    <slot :name="slide"/>
                                </div>
                            </slide>
                        </template>

                        <template v-for="(item, i) in Items" :key="slide">
                            <slide :index="i">
                                <div class="lkt-carousel-slide">

                                    <template v-if="computedItemSlotComponent">
                                        <component
                                            :is="computedItemSlotComponent"
                                            v-bind="<ItemSlotComponentConfig>{
                                                item,
                                                index: i,
                                                editing: editModeEnabled,
                                                perms: permissions,
                                                data: computedItemSlotData,
                                                events: itemSlotEvents
                                            }"
                                        />
                                    </template>
                                    <slot
                                        v-else
                                        name="item"
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
                            </slide>
                        </template>

                        <template #addons>
                            <Navigation/>
                            <Pagination/>
                        </template>
                    </carousel>
                </div>

                <div v-else-if="computedType === TableType.Calendar"
                     ref="tableBody"
                     :id="'lkt-table-body-' + uniqueId"
                     class="lkt-table-items-container"
                     :class="itemsContainerClass">
                    <lkt-calendar
                        v-bind="<CalendarConfig>{
                            ...calendar,
                            items: computedCalendarEvents,
                            events: calendarEvents,
                        }"
                    />
                </div>
            </div>

            <div class="lkt-table-empty" v-if="!isLoading && Items.length === 0 && (slots.empty || hasEmptySlot || noResultsText)">
                <template v-if="slots.empty">
                    <slot name="empty"/>
                </template>
                <template v-else-if="hasEmptySlot && typeof computedNoResultsConfig === 'object'">
                    <component :is="emptySlot" v-bind="computedNoResultsConfig"/>
                </template>
                <template v-else-if="hasEmptySlot">
                    <component :is="emptySlot" :message="noResultsText"/>
                </template>
                <template v-else-if="noResultsText">
                    {{ noResultsText }}
                </template>
            </div>

            <lkt-loader v-if="isLoading"/>

            <div v-if="computedDisplayCreateButton || slots.bottomButtons"
                 class="lkt-table-page-buttons lkt-table-page-buttons-bottom">
                <create-button
                    v-if="computedDisplayInlineCreateButton && Items.length >= requiredItemsForBottomCreate"
                    :config="safeInlineCreateButton"
                    :disabled="!createEnabled"
                    @click="onClickAddItem"
                    @append="onAppend"
                />
                <create-button
                    v-else-if="computedDisplayCreateButton && Items.length >= requiredItemsForBottomCreate"
                    :config="safeCreateButton"
                    :disabled="!createEnabled"
                    @click="onClickAddItem"
                    @append="onAppend"
                />
                <slot name="bottom-buttons"/>
            </div>

            <lkt-paginator
                ref="paginatorRef"
                v-if="paginator && Object.keys(paginator).length > 0"
                v-bind="<PaginatorConfig>{
                    ...paginator,
                    resourceData: paginatorResourceData,
                    timelineOldestDate,
                    timelineNewestDate,
                    timelineVisibleDate,
                }"
                v-model="Page"
                @loading="onLoading"
                @perms="onPerms"
                @response="onPaginatorResponse"
            />

            <template v-if="slots['web-element-actions']">
                <slot name="web-element-actions"/>
            </template>

        </component>
    </section>
</template>