<script lang="ts" setup>
import {getColumnDisplayContent} from "../functions/table-functions";
import LktTableCell from "./LktTableCell.vue";
import {ref, watch} from "vue";
import {LktObject, Column} from "lkt-vue-kernel";

const emit = defineEmits(['update:modelValue', 'click']);

const props = withDefaults(defineProps<{
    modelValue: LktObject
    isDraggable: boolean
    sortable: boolean
    hiddenIsVisible: boolean
    i: number
    hiddenColumnsColSpan: number
    visibleColumns: Column[]
    hiddenColumns: Column[]
    emptyColumns: string[]
    editModeEnabled: boolean
    hasInlineEditPerm: boolean
}>(), {
    modelValue: () => ({}),
    isDraggable: true,
    sortable: true,
    hiddenIsVisible: false,
    i: 0,
    hiddenColumnsColSpan: 0,
    visibleColumns: () => [],
    hiddenColumns: () => [],
    emptyColumns: () => [],
    editModeEnabled: false,
    hasInlineEditPerm: false,
});

const item = ref(props.modelValue);

const onClick = ($event: any) => emit('click', $event);

watch(() => props.modelValue, (v) => item.value = v);
watch(item, () => emit('update:modelValue', item.value));
</script>

<template>
    <tr v-show="hiddenIsVisible" data-role="hidden-row">
        <td :colspan="hiddenColumnsColSpan">
            <table>
                <tr>
                    <th v-for="column in hiddenColumns" :data-column="column.key">
                        <div>{{ column.label }}</div>
                    </th>
                </tr>
                <tr :data-i="i">
                    <td v-for="(column, i) in hiddenColumns"
                        v-bind:data-column="column.key"
                        v-bind:title="getColumnDisplayContent (column, item, i, hiddenColumns)"
                        v-on:click="onClick($event)">
                        <template v-if="!!$slots[column.key]">
                            <slot v-bind:name="column.key"
                                  v-bind:value="item[column.key]"
                                  v-bind:item="item"
                                  v-bind:column="column"
                                  v-bind:i="i"/>
                        </template>
                        <template v-else>
                            <lkt-table-cell
                                :column="column"
                                :columns="hiddenColumns"
                                v-model="item"
                                :i="i"
                                :edit-mode-enabled="editModeEnabled"
                                :has-inline-edit-perm="hasInlineEditPerm"
                            />
                        </template>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</template>