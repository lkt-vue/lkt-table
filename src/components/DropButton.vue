<script setup lang="ts">
import {computed} from "vue";
import {Settings} from "../settings/Settings";
import {ButtonConfig} from "lkt-vue-kernel";

const emit = defineEmits(['click']);

const props = withDefaults(defineProps<{
    config?: ButtonConfig
    disabled?: boolean
}>(), {
    disabled: false,
});

const hasButtonSlot = computed(() => Settings.dropButtonSlot !== ''),
    buttonSlot = computed(() => Settings.dropButtonSlot);
</script>

<template>
    <lkt-button
        palette="table-delete"
        v-bind="props.config"
        :icon="hasButtonSlot ? '' : config?.icon"
        :text="hasButtonSlot ? '' : config?.text"
        :disabled="disabled"
        @click.prevent.stop="emit('click')">
        <template v-if="hasButtonSlot">
            <component
                :is="buttonSlot"/>
        </template>
    </lkt-button>
</template>