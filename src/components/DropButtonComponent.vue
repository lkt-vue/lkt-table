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

const hasButtonSlot = computed(() => Settings.dropButtonSlot !== ''),
    buttonSlot = computed(() => Settings.dropButtonSlot);

const computedResourceData = computed(() => {
    return prepareResourceData(props.config.resourceData, props.item);
})
</script>

<template>
    <lkt-button
        palette="table-delete"
        v-bind="props.config"
        :disabled="disabled"
        :resource-data="computedResourceData"
        @click.prevent.stop="emit('click', $event)">
        <template v-if="hasButtonSlot">
            <component :is="buttonSlot"/>
        </template>
    </lkt-button>
</template>