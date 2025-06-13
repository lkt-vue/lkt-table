<script lang="ts" setup>
import {getColumnDisplayContent} from "../functions/table-functions";
import {computed, ref, watch} from "vue";
import {Column, ColumnType, extractPropValue, FieldConfig, FieldType, LktObject, TableType} from "lkt-vue-kernel";

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
    tableType: TableType
}>(), {
    modelValue: () => ({}),
    column: () => (new Column()),
    columns: () => [],
    i: 0,
    editModeEnabled: false,
    hasInlineEditPerm: false,
});

const item = ref(props.modelValue);

watch(() => props.modelValue, (v) => {
    item.value = v;
});

watch(item, (v) => {
    emit('update:modelValue', v);
})

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

const computedFieldConfig = computed((): FieldConfig => {
    //@ts-ignore
    if (typeof props.column.field === 'string' && props.column.field.startsWith('prop:')) {
        return <FieldConfig>extractPropValue(props.column.field, item.value);
    }
    return <FieldConfig>props.column.field;
})

const computedFieldLabel = computed(() => {
    if (props.column.type === ColumnType.Field) {
        if (!props.column?.field?.label) {
            if (props.column.ensureFieldLabel || [
                FieldType.Switch,
                FieldType.Check,
            ].includes(props.column.field?.type)) {
                return props.column.label;
            }
        }

        return props.column.field?.label;
    }
    return '';
})
</script>

<template>
    <lkt-anchor
        v-if="column.type === ColumnType.Anchor"
        v-bind="column.anchor"
        :prop="item"
    >{{ getColumnDisplayContent(column, item, i) }}</lkt-anchor>
    <lkt-button
        v-else-if="column.type === ColumnType.Button"
        v-bind="column.button"
        :prop="item"
    >{{ getColumnDisplayContent(column, item, i) }}</lkt-button>
    <lkt-field
        v-else-if="column.type === ColumnType.Field"
        v-model="item[column.key]"
        v-bind="<FieldConfig>{
            ...computedFieldConfig,
            readMode: !hasInlineEditPerm || computedFieldConfig.readMode,
            slotData,
            label: computedFieldLabel,
            modalData: computedModalData,
            prop: item
        }"
    />
    <template v-else>
        {{ getColumnDisplayContent(column, item, i, columns) }}
    </template>
</template>