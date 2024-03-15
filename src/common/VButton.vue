<template>
  <button class="button" @click.stop="$emit('click', $event)">
    <slot />
  </button>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.button {
  padding: 8px;
  border-radius: 8px;
  border: 1px solid hsla(160, 100%, 37%, 1);
  background: var(--color-background-soft);
  color: var(--color-text);

  &:hover {
    cursor: pointer;
    background: var(--color-background-mute);
  }
}
</style>
