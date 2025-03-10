<script setup lang="ts">
import {computed} from "vue";
import {Settings} from "../settings/Settings";
import {ButtonConfig, LktObject} from "lkt-vue-kernel";

const emit = defineEmits([
    'click',
    'append'
]);

const props = withDefaults(defineProps<{
    config?: ButtonConfig
    disabled?: boolean
}>(), {
    config: undefined,
    disabled: false,
});

const hasCreateButtonSlot = computed(() => Settings.createButtonSlot !== ''),
    createButtonSlot = computed(() => Settings.createButtonSlot);

const calculatedModalData = {
    ...props.config?.modalData,
    beforeClose: (data: LktObject) => {
        // Checks lkt-item-crud as modal flow
        if ('itemCreated' in data && data.itemCreated === true) {
            emit('append', data.item);
        }
    }
};

const calculatedConfig = {
    ...props.config,
}
calculatedConfig.modalData = calculatedModalData;

const onClick = () => {
    if (!props.config?.modal) {
        emit('click');
        return;
    }
}
</script>

<template>
    <lkt-button
        v-bind="calculatedConfig"
        :disabled="disabled"
        @click="onClick">
        <template v-if="hasCreateButtonSlot">
            <component
                :is="createButtonSlot"/>
        </template>
    </lkt-button>
</template>