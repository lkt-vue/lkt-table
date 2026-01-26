<script lang="ts" setup>
import {
    canRenderColumn,
    colPreferSlot,
    getColumnClasses,
    getColumnDisplayContent,
    getHorizontalColSpan
} from "../functions/table-functions";
import LktTableCell from "./LktTableCell.vue";
import {Component, computed, ref, useSlots, watch} from "vue";
import {Settings} from "../settings/Settings";
import {
    Column,
    ItemSlotComponentConfig,
    LktObject,
    TablePermission,
    TableRowType,
    ValidTableRowTypeValue
} from "lkt-vue-kernel";

const slots = useSlots();
const emit = defineEmits([
    'update:modelValue',
    'click',
    'item-up',
    'item-down',
    'item-drop'
]);

const props = withDefaults(defineProps<{
    modelValue: LktObject
    isDraggable: boolean
    sortable: boolean
    isLoading: boolean
    addNavigation: boolean
    latestRow: boolean
    canDrop: boolean
    canEdit: boolean
    canCreate: boolean
    canRead: boolean
    editModeEnabled: boolean
    hasInlineEditPerm: boolean
    i: number
    visibleColumns: Column[]
    emptyColumns: string[]
    rowDisplayType: ValidTableRowTypeValue
    renderDrag?: boolean | Function
    disabledDrag?: boolean | Function
    itemContainerClass?: string | Function
    itemSlotComponent?: string | Function | Component
    itemSlotData?: LktObject | Function
    itemSlotEvents?: LktObject | Function
    permissions?: Array<TablePermission>
}>(), {
    modelValue: () => ({}),
    isDraggable: true,
    sortable: true,
    addNavigation: false,
    latestRow: false,
    canDrop: false,
    canEdit: false,
    editModeEnabled: false,
    i: 0,
    visibleColumns: () => [],
    emptyColumns: () => [],
    rowDisplayType: TableRowType.Auto,
    renderDrag: true,
    disabledDrag: true,
    itemContainerClass: '',
    permissions: () => [],
});

const Item = ref(props.modelValue);

let calculatedRowDisplayType = typeof props.rowDisplayType === 'function' ? props.rowDisplayType(Item.value, props.i) : props.rowDisplayType;
if (!calculatedRowDisplayType) calculatedRowDisplayType = TableRowType.Auto;

const canCustomItem = [TableRowType.Auto, TableRowType.PreferCustomItem].includes(calculatedRowDisplayType);
const canItem = [TableRowType.Auto, TableRowType.PreferItem].includes(calculatedRowDisplayType);

const onClick = ($event: any) => emit('click', $event),
    classes = computed(() => {
        let r: string[] = [];

        let disabledDrag = typeof props.disabledDrag === 'function'
            ? props.disabledDrag(Item.value)
            : computedDisabledDrag.value === true;

        if (!disabledDrag && props.sortable && props.isDraggable) r.push('handle');
        else if (disabledDrag) r.push('disabled');

        return r.join(' ');
    }),
    hasNavButtonSlot = computed(() => {
        return Settings.navButtonSlot !== '';
    }),
    navButtonSlot = computed(() => {
        return Settings.navButtonSlot;
    }),
    onClickUp = () => {
        emit('item-up', props.i);
    },
    onClickDown = () => {
        emit('item-down', props.i);
    },
    onClickDrop = () => {
        emit('item-drop', props.i);
    };

watch(() => props.modelValue, (v) => Item.value = v);
watch(Item, (v) => {
    emit('update:modelValue', v)
}, {deep: true});

const canRenderDragIndicator = computed(() => {
        if (typeof props.renderDrag === 'function') return props.renderDrag(Item.value);
        return props.renderDrag === true;
    }),
    computedDisabledDrag = computed(() => {
        if (typeof props.disabledDrag === 'function') return props.disabledDrag(Item.value);
        return props.disabledDrag === true;
    }),
    computedDragIndicatorRole = computed(() => {
        if (classes.value.includes('handle')) return 'drag-indicator';
        return 'invalid-drag-indicator';
    }),
    computedContainerClasses = computed(() => {
        let r: string[] = [];

        if (canCustomItem) r.push('type-custom-item');
        if (canItem) r.push('type-item');

        if (typeof props.itemContainerClass === 'function') r.push(props.itemContainerClass(Item.value, props.i));
        else if (props.itemContainerClass !== '') r.push(props.itemContainerClass);


        return r.join(' ');
    }),
    computedBeforeSlotColumns = computed(() => {
        return props.visibleColumns.filter(c => c.includeBeforeItemSlot);
    }),
    computedAfterSlotColumns = computed(() => {
        return props.visibleColumns.filter(c => c.includeAfterItemSlot);
    });
</script>

<template>
    <tr :data-i="i" :data-draggable="isDraggable" :class="computedContainerClasses">
        <td v-if="sortable && editModeEnabled && canRenderDragIndicator"
            :data-role="computedDragIndicatorRole" :class="classes" :data-i="i">
            <i class="lkt-icn-drag-indicator"/>
        </td>
        <td v-if="addNavigation && editModeEnabled" class="lkt-table-nav-cell">
            <div class="lkt-table-nav-container">
                <lkt-button palette="table-nav" :disabled="i === 0" @click="onClickUp">
                    <template v-if="hasNavButtonSlot">
                        <component
                            :is="navButtonSlot"
                            direction="up"/>
                    </template>
                    <template v-else>
                        <i class="lkt-icn-arrow-top"/>
                    </template>
                </lkt-button>
                <lkt-button palette="table-nav" :disabled="latestRow" @click="onClickDown">
                    <template v-if="hasNavButtonSlot">
                        <component
                            :is="navButtonSlot"
                            direction="down"/>
                    </template>
                    <template v-else>
                        <i class="lkt-icn-arrow-bottom"/>
                    </template>
                </lkt-button>
            </div>
        </td>
        <template v-if="itemSlotComponent || (canCustomItem && slots[`item-${i}`]) || (canItem && slots.item)">

            <template v-for="column in computedBeforeSlotColumns">
                <td v-if="canRenderColumn(column, emptyColumns, Item)"
                    :key="'td' + i"
                    :data-column="column.key"
                    :colspan="getHorizontalColSpan(column,Item)"
                    :title="getColumnDisplayContent (column, Item, i, visibleColumns)"
                    :class="getColumnClasses(column)"
                    @click="onClick($event)"
                >
                    <template v-if="!!$slots[column.key] && colPreferSlot(column, Item)">
                        <slot :name="column.key"
                              :value="Item[column.key]"
                              :item="Item"
                              :column="column"
                              :i="i"
                              v-bind:index="i"
                              v-bind:editing="editModeEnabled"
                              v-bind:can-create="canCreate"
                              v-bind:can-read="canRead"
                              v-bind:can-update="canEdit"
                              v-bind:can-drop="canDrop"
                              v-bind:is-loading="isLoading"
                              v-bind:do-drop="() => onClickDrop()"
                        />
                    </template>
                    <template v-else-if="Item">
                        <lkt-table-cell
                            v-model="Item"
                            :column="column"
                            :columns="visibleColumns"
                            :edit-mode-enabled="editModeEnabled"
                            :has-inline-edit-perm="hasInlineEditPerm"
                            :i="i"
                            @inline-drop="onClickDrop"
                        />
                    </template>
                </td>
            </template>

            <td v-if="itemSlotComponent" :key="'td' + i" :colspan="visibleColumns.length">
                <component
                    :is="itemSlotComponent"
                    v-bind="<ItemSlotComponentConfig>{
                        item: Item,
                        index: i,
                        editing: editModeEnabled,
                        perms: permissions,
                        data: itemSlotData,
                        events: itemSlotEvents
                    }"
                />
            </td>
            <td v-else-if="canCustomItem && slots[`item-${i}`]" :key="'td' + i" :colspan="visibleColumns.length">
                <slot
                    :name="`item-${i}`"
                    :item="Item"
                    v-bind:index="i"
                    v-bind:editing="editModeEnabled"
                    v-bind:can-create="canCreate"
                    v-bind:can-read="canRead"
                    v-bind:can-update="canEdit"
                    v-bind:can-drop="canDrop"
                    v-bind:is-loading="isLoading"
                    v-bind:do-drop="() => onClickDrop()"
                />
            </td>
            <td v-else-if="canItem && slots.item" :key="'td' + i" :colspan="visibleColumns.length">
                <slot
                    name="item"
                    :item="Item"
                    v-bind:index="i"
                    v-bind:editing="editModeEnabled"
                    v-bind:can-create="canCreate"
                    v-bind:can-read="canRead"
                    v-bind:can-update="canEdit"
                    v-bind:can-drop="canDrop"
                    v-bind:is-loading="isLoading"
                    v-bind:do-drop="() => onClickDrop()"
                />
            </td>

            <template v-for="column in computedAfterSlotColumns">
                <td v-if="canRenderColumn(column, emptyColumns, Item)"
                    :key="'td' + i"
                    :data-column="column.key"
                    :colspan="getHorizontalColSpan(column,Item)"
                    :title="getColumnDisplayContent (column, Item, i, visibleColumns)"
                    :class="getColumnClasses(column)"
                    @click="onClick($event)"
                >
                    <template v-if="!!$slots[column.key] && colPreferSlot(column, Item)">
                        <slot :name="column.key"
                              :value="Item[column.key]"
                              :item="Item"
                              :column="column"
                              :i="i"
                              v-bind:index="i"
                              v-bind:editing="editModeEnabled"
                              v-bind:can-create="canCreate"
                              v-bind:can-read="canRead"
                              v-bind:can-update="canEdit"
                              v-bind:can-drop="canDrop"
                              v-bind:is-loading="isLoading"
                              v-bind:do-drop="() => onClickDrop()"
                        />
                    </template>
                    <template v-else-if="Item">
                        <lkt-table-cell
                            v-model="Item"
                            :column="column"
                            :columns="visibleColumns"
                            :edit-mode-enabled="editModeEnabled"
                            :has-inline-edit-perm="hasInlineEditPerm"
                            :i="i"
                            @inline-drop="onClickDrop"
                        />
                    </template>
                </td>
            </template>

        </template>
        <template v-else v-for="column in visibleColumns">
            <td v-if="canRenderColumn(column, emptyColumns, Item)"
                :key="'td' + i"
                :data-column="column.key"
                :colspan="getHorizontalColSpan(column,Item)"
                :title="getColumnDisplayContent (column, Item, i, visibleColumns)"
                :class="getColumnClasses(column)"
                @click="onClick($event)"
            >
                <template v-if="!!$slots[column.key] && colPreferSlot(column, Item)">
                    <slot :name="column.key"
                          :value="Item[column.key]"
                          :item="Item"
                          :column="column"
                          :i="i"
                          v-bind:index="i"
                          v-bind:editing="editModeEnabled"
                          v-bind:can-create="canCreate"
                          v-bind:can-read="canRead"
                          v-bind:can-update="canEdit"
                          v-bind:can-drop="canDrop"
                          v-bind:is-loading="isLoading"
                          v-bind:do-drop="() => onClickDrop()"
                    />
                </template>
                <template v-else-if="Item">
                    <lkt-table-cell
                        v-model="Item"
                        :column="column"
                        :columns="visibleColumns"
                        :edit-mode-enabled="editModeEnabled"
                        :has-inline-edit-perm="hasInlineEditPerm"
                        :i="i"
                        @inline-drop="onClickDrop"
                    />
                </template>
            </td>
        </template>
    </tr>
</template>