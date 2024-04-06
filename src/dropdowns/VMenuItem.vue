<template>
  <li
    class="menu-item"
    @click.stop="bubbleUnlessDisabled"
    :class="{ disabled }"
  >
    <slot />
  </li>
</template>

<script setup lang="ts">
interface Props {
  disabled?: boolean;
}

interface Emits {
  (name: "click", event: MouseEvent): void;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<Emits>();

function bubbleUnlessDisabled(event: MouseEvent) {
  if (!props.disabled) {
    emit("click", event);
  }
}
</script>

<style scoped lang="scss">
.menu-item {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;

  padding: 8px 16px;

  &:not(.disabled) {
    &:hover {
      background: var(--color-background-soft);

      cursor: pointer;
    }

    &:active:not(:has(> .menu)) {
      background: hsla(160, 100%, 37%, 1);
      color: var(--color-text-contrast);
    }
  }

  &.disabled {
    cursor: default;
    color: var(--color-text-soft);
    background: none;
    user-select: none;
  }
}
</style>
