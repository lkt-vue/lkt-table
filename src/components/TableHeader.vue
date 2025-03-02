<script setup lang="ts">
import {getColumnClasses, getVerticalColSpan} from "../functions/table-functions";
import {Column, extractI18nValue, LktObject, LktSettings, SortDirection} from "lkt-vue-kernel";
import {computed} from "vue";

const emit = defineEmits(['click']);

const props = withDefaults(defineProps<{
    column: Column,
    sortBy: string,
    sortDirection: string,
    amountOfColumns: number,
    items: LktObject[]
}>(), {
    column: () => (new Column()),
    items: () => [],
    isDraggable: true,
    sortBy: '',
    sortDirection: '',
    amountOfColumns: 0
});

const computedColSpan = computed(() => {
        return getVerticalColSpan(props.column, props.amountOfColumns, props.items);
    }),
    computedSortable = computed(() => {
        return props.column.sortable === true;
    }),
    computedSortDirection = computed(() => {
        if (!computedSortable.value) return '';
        if (props.sortBy === props.column.key) return props.sortDirection;
        return '';
    }),
    computedLabel = computed(() => {
        return extractI18nValue(props.column.label);
    }),
    computedSortableIcon = computed(() => {
        if (!computedSortable.value) return '';
        if (props.sortBy === props.column.key) {
            if (props.sortDirection === SortDirection.Asc) return LktSettings.defaultTableSortAscIcon;
            if (props.sortDirection === SortDirection.Desc) return LktSettings.defaultTableSortDescIcon;
            return '';
        }
        return '';
    });

const onClick = () => emit('click', props.column)
</script>

<template>
    <th :data-column="column.key"
        :data-sortable="computedSortable"
        :data-sort="computedSortDirection"
        :colspan="computedColSpan"
        :title="computedLabel"
        :class="getColumnClasses(column)"
        v-on:click="onClick"
    >
        <div>{{ computedLabel }} <i v-if="computedSortableIcon" :class="computedSortableIcon"/> </div>
    </th>
</template>