<template>
  <OnClickOutside class="modal" @trigger="emitClickaway">
    <h1>
      <slot name="header" />
    </h1>
    <div>
      <slot name="content" />
    </div>
    <div class="footer">
      <slot name="footer" />
    </div>
  </OnClickOutside>
</template>

<script setup lang="ts">
import { OnClickOutside } from "@vueuse/components";

interface Emits {
  (e: "clickaway"): void;
}

const emit = defineEmits<Emits>();

function emitClickaway(click: Event) {
  click.stopPropagation();
  emit("clickaway");
}
</script>

<style scoped lang="scss">
.modal {
  z-index: 999;
  padding: 20px;
  border-radius: 20px;

  background: var(--color-background-soft);
  box-shadow: 2px 2px 2px black;

  .footer {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
  }
}
</style>
