import { defineStore } from "pinia";
import { computed, ref } from "vue";

interface State {
  modals: ModalInfo[];
}

interface ModalAction<Req = unknown, Res = void> {
  text: string;
  handler: (request?: Req) => Res;
}

export interface ModalInfo<Req = unknown, Res = void> {
  title: string;
  text?: string;
  cancel?: ModalAction;
  continue?: ModalAction<Req, Res>;
}

export const useComplexModalStore = defineStore("complex-modal", () => {
  const state = ref<State>({
    modals: [],
  });

  const modals = computed(() => state.value.modals);
  const hasModals = computed(() => state.value.modals.length > 0);

  function openModal(modalInfo: ModalInfo) {
    state.value.modals.push(modalInfo);
  }

  function closeModal(modalInfo: ModalInfo) {
    const index = modals.value.indexOf(modalInfo);
    if (index >= 0) {
      state.value.modals.splice(index, 1);
    } else {
      console.warn(`no modal with title ${modalInfo.title} found`);
    }
  }

  return { modals, hasModals, openModal, closeModal };
});
