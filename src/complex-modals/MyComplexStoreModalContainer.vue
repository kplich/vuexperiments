<template>
  <div v-if="hasModals" class="complex-store-modal-container">
    <MyComplexStoreModal
      v-for="modal in modals"
      :key="modal.title"
      @clickaway="() => handleClickaway(modal)"
    >
      <template #header>
        {{ modal.title }}
      </template>
      <template #content>
        {{ modal.text }}
      </template>
      <template #footer>
        <button v-if="modal.cancel" @click="modal.cancel.handler">
          {{ modal.cancel.text }}
        </button>
        <button v-if="modal.continue" @click="modal.continue.handler">
          {{ modal.continue.text }}
        </button>
      </template>
    </MyComplexStoreModal>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { ModalInfo } from "@/complex-modals/store";
import { useComplexModalStore } from "@/complex-modals/store";
import MyComplexStoreModal from "@/complex-modals/MyComplexStoreModal.vue";

const complexModalStore = useComplexModalStore();
const { closeModal } = complexModalStore;
const { modals, hasModals } = storeToRefs(complexModalStore);

function handleClickaway(modal: ModalInfo) {
  closeModal(modal);
}

function handleCancel(modal: ModalInfo) {
  if (modal.cancel) {
    modal.cancel.handler();
    closeModal(modal);
  }
}

function handleContinue(modal: ModalInfo) {
  if (modal.continue) {
    modal.continue.handler();
    closeModal(modal);
  }
}
</script>

<style lang="scss">
.complex-store-modal-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 99;

  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;

  & > .modal-wrapper {
    position: absolute;
  }
}
</style>
