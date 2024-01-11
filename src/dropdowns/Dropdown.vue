<template>
  <OnClickOutside @trigger="emitClickawayEvent">
    <div class="dropdown">
      <slot />
    </div>
  </OnClickOutside>
</template>
<script lang="ts">
// use normal <script> to declare options
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { OnClickOutside } from "@vueuse/components";

interface Emits {
  (e: "clickaway"): void;
}

const emit = defineEmits<Emits>();

function emitClickawayEvent(event: Event) {
  event.stopPropagation();
  emit("clickaway");
}
</script>

<style scoped>
.dropdown {
  position: absolute;
  width: 100%;
  z-index: 999;
  border-radius: 2px;
  box-shadow: 2px 2px 2px #222222;
  background: var(--color-background-soft);
}
</style>
