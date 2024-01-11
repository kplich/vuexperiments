<template>
  <div ref="container" class="teleport-modal-container" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMutationObserver } from "@vueuse/core";

const container = ref<HTMLDivElement | null>(null);

const mutationObserverConfig = {
  childList: true,
};

function mutationObserverCallback(mutations: MutationRecord[]) {
  for (const mutation of mutations) {
    if (mutation.target.hasChildNodes()) {
      (mutation.target as HTMLElement).classList.add("active");
    } else {
      (mutation.target as HTMLElement).classList.remove("active");
    }
  }
}

useMutationObserver(
  container,
  mutationObserverCallback,
  mutationObserverConfig
);
</script>

<style scoped lang="scss">
.teleport-modal-container {
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

  pointer-events: none;

  &.active {
    background: #00000099;
    pointer-events: initial;
  }
}
</style>
