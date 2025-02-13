<script setup lang="ts">
import {computed} from "vue";
import {Settings} from "../settings/Settings";
import {LktObject, ModalConfig} from "lkt-vue-kernel";

const emit = defineEmits(['click', 'append']);

const props = withDefaults(defineProps<{
    disabled?: boolean
    text?: string
    icon?: string
    to?: string
    modal?: string
    modalData?: Partial<ModalConfig>
}>(), {
    disabled: false,
    text: '',
    icon: '',
    to: '',
    modal: '',
});

const hasCreateButtonSlot = computed(() => Settings.createButtonSlot !== ''),
    createButtonSlot = computed(() => Settings.createButtonSlot);

const calculatedModalData = {
    ...props.modalData,
    beforeClose: (data: LktObject) => {
        // Checks lkt-item-crud as modal flow
        if ('itemCreated' in data && data.itemCreated === true) {
            emit('append', data.item);
        }
    }
};

const onClick = () => {
    if (!props.modal) {
        emit('click');
        return;
    }
}
</script>

<template>
    <lkt-button
        palette="table-create"
        :disabled="disabled"
        :icon="hasCreateButtonSlot ? '' : icon"
        :text="hasCreateButtonSlot ? '' : text"
        :modal="modal"
        :modal-data="calculatedModalData"
        :on-click-to="to"
        @click="onClick">
        <template v-if="hasCreateButtonSlot">
            <component
                :is="createButtonSlot"/>
        </template>
    </lkt-button>
</template>