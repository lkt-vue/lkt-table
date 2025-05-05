<script lang="ts" setup>
import {getColumnDisplayContent} from "../functions/table-functions";
import {computed, ref, watch} from "vue";
import {Column, ColumnType, extractPropValue, FieldType, LktObject} from "lkt-vue-kernel";

const emit = defineEmits([
    'update:modelValue'
]);

const props = withDefaults(defineProps<{
    modelValue: LktObject
    column: Column
    columns: Column[]
    i: number
    editModeEnabled: boolean
    hasInlineEditPerm: boolean
}>(), {
    modelValue: () => ({}),
    column: () => (new Column()),
    columns: () => [],
    i: 0,
    editModeEnabled: false,
    hasInlineEditPerm: false,
});

const item = ref(props.modelValue),
    value = ref(item.value[props.column.key]),
    inputElement = ref(null);

watch(value, (v) => {
    const payload = JSON.parse(JSON.stringify(item.value));
    payload[props.column.key] = v;
    emit('update:modelValue', payload);
})

watch(() => props.modelValue, (v) => {
    item.value = v
    value.value = item.value[props.column.key];
});

const slotData = computed(() => {
    return {...props.column.slotData, item: item.value};
})

const computedModalData = computed(() => {
    if (props.column.field?.modalData && typeof props.column.field?.modalData === 'object') {
        let r = {};
        for (let k in props.column.field.modalData) {
            if (typeof props.column.field?.modalData[k] === 'string' && props.column.field.modalData[k].startsWith('prop:')) {
                let prop = props.column.field.modalData[k].substring(5);
                r[k] = item.value[prop];
            } else {
                r[k] = props.column.field.modalData[k];
            }
        }
    }
    return props.column.field?.modalData;
});

const computedFieldConfig = computed(() => {
    if (typeof props.column.field === 'string' && props.column.field.startsWith('prop:')) {
        return extractPropValue(props.column.field, item.value);
    }
    return props.column.field;
})

const computedFieldLabel = computed(() => {
    if (props.column.type === ColumnType.Field) {
        if (!props.column?.field?.label && [
            FieldType.Switch,
            FieldType.Check,
        ].includes(props.column.field?.type)) {
            return props.column.label;
        }

        return props.column.field?.label;
    }
    return '';
})
</script>

<template>
    <template v-if="column.type === ColumnType.Anchor">
        <lkt-anchor
            v-bind="column.anchor"
            :prop="item"
        >{{ getColumnDisplayContent(column, item, i) }}</lkt-anchor>
    </template>
    <template v-else-if="column.type === ColumnType.Button">
        <lkt-button
            v-bind="column.button"
            :prop="item"
        >{{ getColumnDisplayContent(column, item, i) }}</lkt-button>
    </template>
    <template v-else-if="column.type === ColumnType.Field && hasInlineEditPerm">
        <lkt-field
            v-bind="computedFieldConfig"
            :read-mode="!column.editable || !editModeEnabled"
            :ref="(el:any) => inputElement = el"
            :slot-data="slotData"
            :label="computedFieldLabel"
            :modal-data="computedModalData"
            :prop="item"
            v-model="value"/>
    </template>
    <template v-else-if="column.type === ColumnType.Field">
        <lkt-field
            v-bind="computedFieldConfig"
            read-mode
            :ref="(el:any) => inputElement = el"
            :slot-data="slotData"
            :label="computedFieldLabel"
            :modal-data="computedModalData"
            :prop="item"
            :model-value="value"/>
    </template>
    <template v-else>
        {{ getColumnDisplayContent(column, item, i, columns) }}
    </template>
</template>