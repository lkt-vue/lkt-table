<script lang="ts" setup>
import {
    canRenderColumn,
    colPreferSlot, getColumnClasses,
    getColumnDisplayContent,
    getHorizontalColSpan
} from "../functions/table-functions";
import LktTableCell from "./LktTableCell.vue";
import {computed, ref, useSlots, watch} from "vue";
import {LktObject} from "lkt-ts-interfaces";
import {Settings} from "../settings/Settings";
import DropButton from "./DropButton.vue";
import EditButton from "./EditButton.vue";
import {replaceAll} from "lkt-string-tools";
import {RowDisplayType} from "../enums/RowDisplayType";
import {Column} from "lkt-vue-kernel";

const slots = useSlots();
const emit = defineEmits(['update:modelValue', 'click', 'show', 'item-up', 'item-down', 'item-drop']);

const props = withDefaults(defineProps<{
    modelValue: LktObject
    isDraggable: boolean
    sortable: boolean
    displayHiddenColumnsIndicator: boolean
    hiddenIsVisible: boolean
    addNavigation: boolean
    latestRow: boolean
    canDrop: boolean
    canEdit: boolean
    editModeEnabled: boolean
    hasInlineEditPerm: boolean
    i: number
    visibleColumns: Column[]
    emptyColumns: string[]
    dropConfirm: string
    dropText: string
    dropIcon: string
    dropResource: string
    editText: string
    editIcon: string
    editLink: string
    rowDisplayType: RowDisplayType | Function
    renderDrag?: boolean | Function
    disabledDrag?: boolean | Function
}>(), {
    modelValue: () => ({}),
    isDraggable: true,
    sortable: true,
    displayHiddenColumnsIndicator: false,
    hiddenIsVisible: false,
    addNavigation: false,
    latestRow: false,
    canDrop: false,
    canEdit: false,
    editModeEnabled: false,
    i: 0,
    visibleColumns: () => [],
    emptyColumns: () => [],
    dropConfirm: '',
    dropText: '',
    dropIcon: '',
    dropResource: '',
    editText: '',
    editIcon: '',
    editLink: '',
    rowDisplayType: RowDisplayType.Auto,
    renderDrag: true,
    disabledDrag: true,
});

const Item = ref(props.modelValue);

let calculatedRowDisplayType = typeof props.rowDisplayType === 'function' ? props.rowDisplayType(Item.value, props.i) : props.rowDisplayType;
if (!calculatedRowDisplayType) calculatedRowDisplayType = RowDisplayType.Auto;

const canCustomItem = [RowDisplayType.Auto, RowDisplayType.PreferCustomItem].includes(calculatedRowDisplayType);
const canItem = [RowDisplayType.Auto, RowDisplayType.PreferItem].includes(calculatedRowDisplayType);

const parsedEditLink = ref(props.editLink);
for (let k in Item.value) parsedEditLink.value = replaceAll(parsedEditLink.value, ':' + k, Item.value[k]);

const onClick = ($event: any) => emit('click', $event),
    onShow = ($event: any, i: any) => {
        emit('show', $event, i)
    },
    classes = computed(() => {
        let r: string[] = [];

        let disabledDrag = false;
        if (typeof props.disabledDrag === 'function') disabledDrag = props.disabledDrag(Item.value);
        else disabledDrag = props.disabledDrag === true;
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
    },
    onClickEdit = () => {

        // emit('item-drop', props.i);
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
    })
</script>

<template>
    <tr :data-i="i" :data-draggable="isDraggable" :class="{'type-custom-item': canCustomItem, 'type-item': canItem}">
        <td v-if="sortable && isDraggable && editModeEnabled && canRenderDragIndicator"
            data-role="drag-indicator" :class="classes" :data-i="i"/>
        <td v-else-if="sortable && editModeEnabled && canRenderDragIndicator" data-role="invalid-drag-indicator"/>
        <td v-if="addNavigation && editModeEnabled" class="lkt-table-nav-cell">
            <div class="lkt-table-nav-container">
                <lkt-button palette="table-nav" :disabled="i === 0" @click="onClickUp">
                    <template v-if="hasNavButtonSlot">
                        <component
                            :is="navButtonSlot"
                            direction="up"/>
                    </template>
                    <template v-else>
                        <i class=""/> UP
                    </template>
                </lkt-button>
                <lkt-button palette="table-nav" :disabled="latestRow" @click="onClickDown">
                    <template v-if="hasNavButtonSlot">
                        <component
                            :is="navButtonSlot"
                            direction="down"/>
                    </template>
                    <template v-else>
                        <i class=""/> DOWN
                    </template>
                </lkt-button>
            </div>
        </td>
        <td v-if="displayHiddenColumnsIndicator"
            v-on:click="onShow($event, i)" data-role="show-more"
            v-bind:class="hiddenIsVisible ? 'state-open' : ''"/>
        <template v-if="canCustomItem && slots[`item-${i}`]">
            <td :key="'td' + i" :colspan="visibleColumns.length">
                <slot
                    :name="`item-${i}`"
                    :item="Item"
                    v-bind:index="i"/>
            </td>
        </template>
        <template v-else-if="canItem && slots.item">
            <td :key="'td' + i" :colspan="visibleColumns.length">
                <slot
                    name="item"
                    :item="Item"
                    v-bind:index="i"/>
            </td>
        </template>
        <template v-else v-for="column in visibleColumns">
            <td v-if="canRenderColumn(column, emptyColumns, Item)"
                :key="'td' + i"
                :data-column="column.key"
                :colspan="getHorizontalColSpan(column,Item)"
                :title="getColumnDisplayContent (column, Item, i, visibleColumns)"
                :class="getColumnClasses(column)"
                v-on:click="onClick($event)"
            >
                <template v-if="!!$slots[column.key] && colPreferSlot(column, Item)">
                    <slot :name="column.key"
                          :value="Item[column.key]"
                          :item="Item"
                          :column="column"
                          :i="i"/>
                </template>
                <template v-else-if="Item">
                    <lkt-table-cell
                        v-model="Item"
                        :column="column"
                        :columns="visibleColumns"
                        :edit-mode-enabled="editModeEnabled"
                        :has-inline-edit-perm="hasInlineEditPerm"
                        :i="i"/>
                </template>
            </td>
        </template>
        <td v-if="canDrop && editModeEnabled" class="lkt-table-col-drop">
            <drop-button
                :resource="dropResource"
                :resource-data="Item"
                :confirm="dropConfirm"
                :text="dropText"
                :icon="dropIcon"
                @click="onClickDrop"/>
        </td>
        <td v-if="canEdit && editModeEnabled" class="lkt-table-col-edit">
            <edit-button
                :resource-data="Item"
                :text="editText"
                :icon="editIcon"
                :link="parsedEditLink"
                @click="onClickEdit"/>
        </td>
    </tr>
</template>