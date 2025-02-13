<script setup lang="ts">
import {getColumnClasses, getVerticalColSpan} from "../functions/table-functions";
import {Column, LktObject} from "lkt-vue-kernel";
import {computed} from "vue";
import {__} from "lkt-i18n";

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
        if (props.column.label.startsWith('__:')) {
            return __(props.column.label.substring(3));
        }
        return props.column.label;
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
        <div>{{ computedLabel }}</div>
    </th>
</template>