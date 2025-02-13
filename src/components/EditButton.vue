<script setup lang="ts">
import {computed} from "vue";
import {Settings} from "../settings/Settings";
import {LktObject} from "lkt-vue-kernel";

const emit = defineEmits(['click']);

const props = withDefaults(defineProps<{
    disabled?: boolean
    text: string
    icon?: string
    confirm?: string
    link?: string
    resource?: string
    resourceData?: LktObject
}>(), {
    disabled: false,
    text: '',
    icon: '',
    link: '',
    confirm: '',
    resource: '',
    resourceData: () => ({}),
});

const hasButtonSlot = computed(() => Settings.editButtonSlot !== ''),
    buttonSlot = computed(() => Settings.editButtonSlot)
</script>

<template>
    <lkt-button
        palette="table-delete"
        :icon="hasButtonSlot ? '' : icon"
        :text="hasButtonSlot ? '' : text"
        :on-click-to="link"
        :is-anchor="link !== ''"
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