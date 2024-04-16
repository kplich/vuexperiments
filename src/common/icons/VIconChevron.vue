<script setup lang="ts">
import VIcon from "@/common/icons/VIcon.vue";

interface Props {
  direction?: "down" | "left" | "up" | "right";
}

withDefaults(defineProps<Props>(), {
  direction: "down",
});
</script>

<template>
  <VIcon>
    <path
      :style="direction"
      d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"
    />
  </VIcon>
</template>

<style scoped lang="scss">
.down {
  transform: rotate(0);
}

.left {
  transform: rotate(90deg);
}

.up {
  transform: rotate(180deg);
}

.right {
  transform: rotate(270deg);
}
</style>
