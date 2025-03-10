<script setup lang="ts">
import {computed} from "vue";
import {Settings} from "../settings/Settings";
import {ButtonConfig, LktObject, prepareResourceData} from "lkt-vue-kernel";

const emit = defineEmits([
    'click'
]);

const props = withDefaults(defineProps<{
    config: ButtonConfig
    item: LktObject
    disabled?: boolean
}>(), {
    disabled: false,
});

const hasButtonSlot = computed(() => Settings.editButtonSlot !== ''),
    buttonSlot = computed(() => Settings.editButtonSlot);

const computedResourceData = computed(() => {
    return prepareResourceData(props.config.resourceData, props.item);
})
</script>

<template>
    <lkt-button
        palette="table-edit"
        v-bind="props.config"
        :disabled="disabled"
        :resource-data="computedResourceData"
        @click.prevent.stop="emit('click')">
        <template v-if="hasButtonSlot">
            <component :is="buttonSlot"/>
        </template>
    </lkt-button>
</template>