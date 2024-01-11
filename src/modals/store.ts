import { defineStore } from "pinia";
import { ref } from "vue";
import type { ModalProps } from "@/modals/ModalProps";

export const useModalStore = defineStore("modal", () => {
  const modalProps = ref<ModalProps | null>(null);

  function setModalProps(title: string, text: string) {
    modalProps.value = { title, text };
  }

  function clearModalProps() {
    modalProps.value = null;
  }

  return { modalProps, setModalProps, clearModalProps };
});
