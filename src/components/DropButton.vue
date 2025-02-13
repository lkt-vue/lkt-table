<script setup lang="ts">
import {computed} from "vue";
import {Settings} from "../settings/Settings";
import {LktObject} from "lkt-vue-kernel";

const emit = defineEmits(['click']);

const props = withDefaults(defineProps<{
    disabled?: boolean
    text: string
    icon: string
    confirm: string
    resource: string
    resourceData: LktObject
}>(), {
    disabled: false,
    text: '',
    icon: '',
    confirm: '',
    resource: '',
    resourceData: () => ({}),
});

const hasButtonSlot = computed(() => Settings.dropButtonSlot !== ''),
    buttonSlot = computed(() => Settings.dropButtonSlot);
</script>

<template>
    <lkt-button
        palette="table-delete"
        :icon="hasButtonSlot ? '' : icon"
        :text="hasButtonSlot ? '' : text"
        :resource="resource"
        :resource-data="resourceData"
        :confirm-modal="confirm"
        :disabled="disabled"
        @click.prevent.stop="emit('click')">
        <template v-if="hasButtonSlot">
            <component
                :is="buttonSlot"/>
        </template>
    </lkt-button>
</template>