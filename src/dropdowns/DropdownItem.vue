<template>
  <div class="item">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.item {
  padding: 5px 10px;
}

.item:hover {
  background: var(--color-background-mute);
  cursor: pointer;
}
</style>
