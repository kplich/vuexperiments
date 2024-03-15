<template>
  <div class="card" :class="[size, { custom }]">
    <slot />
  </div>
</template>

<script setup lang="ts">
type CardSize = "none" | "small" | "medium" | "big";

interface Props {
  size?: CardSize;
  custom?: boolean;
}

withDefaults(defineProps<Props>(), {
  size: "medium",
  custom: true,
});
</script>

<style scoped lang="scss">
.card {
  background: var(--color-background);

  box-sizing: border-box;
  height: fit-content;

  &.small {
    padding: 8px;
    border-radius: 8px;
    box-shadow: 0 1px 2px #00000077;
  }

  &.medium {
    padding: 16px;
    border-radius: 16px;
    box-shadow: 0 1px 4px #00000077;
  }

  &.big {
    padding: 24px;
    border-radius: 24px;
    box-shadow: 0 1px 8px #00000077;
  }
}
</style>
