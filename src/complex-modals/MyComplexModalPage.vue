<template>
  <section>
    <button @click="openFirstStoreModal">click to show modal from store</button>
    <button @click="openFirstTeleportModal">
      Click to show complex teleport modal
    </button>
    <MyComplexTeleportModal
      @clickaway="closeFirstTeleportModal"
      v-if="firstTeleportModalShouldBeVisible"
    >
      <template #header> Title </template>
      <template #content>
        Modal text, really long and stretching the modal.
      </template>
      <template #footer>
        <button @click="openSecondTeleportModal">Continue</button>
      </template>
    </MyComplexTeleportModal>
    <MyComplexTeleportModal
      @clickaway="closeSecondTeleportModal"
      v-if="secondTeleportModalShouldBeVisible"
    >
      <template #header> Are you sure?</template>
      <template #footer>
        <button @click="closeSecondTeleportModal">No</button>
        <button @click="finishAction">Yes</button>
      </template>
    </MyComplexTeleportModal>
  </section>
</template>

<script setup lang="ts">
import MyComplexTeleportModal from "@/complex-modals/MyComplexTeleportModal.vue";
import { ref } from "vue";
import type { ModalInfo } from "@/complex-modals/store";
import { useComplexModalStore } from "@/complex-modals/store";

const { openModal, closeModal } = useComplexModalStore();

// TODO: zrobic manualny modal?

const firstTeleportModalShouldBeVisible = ref(false);
const secondTeleportModalShouldBeVisible = ref(false);

const secondModal: ModalInfo = {
  title: "Are you sure?",
  continue: {
    text: "OK",
    handler: () => {
      console.log("doing something");
      closeModal(secondModal);
      closeModal(firstModal);
    },
  },
};

const firstModal: ModalInfo = {
  title: "Title",
  text: "Text",
  cancel: {
    text: "Cancel",
    handler: () => closeModal(firstModal),
  },
  continue: {
    text: "Continue",
    handler: () => openModal(secondModal),
  },
};

function openFirstStoreModal() {
  openModal(firstModal);
}

function openFirstTeleportModal() {
  firstTeleportModalShouldBeVisible.value = true;
}

function closeFirstTeleportModal() {
  firstTeleportModalShouldBeVisible.value = false;
}

function openSecondTeleportModal() {
  secondTeleportModalShouldBeVisible.value = true;
}

function closeSecondTeleportModal() {
  secondTeleportModalShouldBeVisible.value = false;
}

function finishAction() {
  console.log("do something");
  closeSecondTeleportModal();
  closeFirstTeleportModal();
}
</script>

<style scoped></style>
