<template>
  <section>
    <button @click="openStoreModal">click to show modal from store</button>
    <button @click="openTeleportModal">Click to show teleport modal</button>
    <MyTeleportModal
      @clickaway="closeTeleportModal"
      v-if="teleportModalShouldBeVisible"
    >
      <template #header> Title </template>
      <template #content> Modal text </template>
    </MyTeleportModal>
  </section>
</template>

<script setup lang="ts">
import { useModalStore } from "@/modals/store";
import MyTeleportModal from "@/modals/MyTeleportModal.vue";
import { ref } from "vue";

const { setModalProps } = useModalStore();

const teleportModalShouldBeVisible = ref(false);

function openStoreModal() {
  setModalProps("Title", "Modal text");
}

function openTeleportModal() {
  teleportModalShouldBeVisible.value = true;
}

function closeTeleportModal() {
  teleportModalShouldBeVisible.value = false;
}
</script>

<style scoped></style>
