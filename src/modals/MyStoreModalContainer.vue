<template>
  <div v-if="modalProps" class="store-modal-container">
    <MyStoreModal @clickaway="closeModal">
      <template #header>
        {{ modalProps.title }}
      </template>
      <template #content>
        {{ modalProps.text }}
      </template>
    </MyStoreModal>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from "@/modals/store";
import MyStoreModal from "@/modals/MyStoreModal.vue";
import { storeToRefs } from "pinia";

const modalStore = useModalStore();
const { clearModalProps } = modalStore;
const { modalProps } = storeToRefs(modalStore);

function closeModal() {
  clearModalProps();
}
</script>

<style scoped lang="scss">
.store-modal-container {
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

  background: #00000099;
}
</style>
