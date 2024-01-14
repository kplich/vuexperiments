<template>
  <svg class="spinner" viewBox="0 0 100 100">
    <circle class="path" cx="50" cy="50" r="40" fill="none" stroke-width="3" />
  </svg>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.spinner {
  height: 100%;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.path {
  stroke: #333; /* Color of the spinner */
  stroke-linecap: round;
  stroke-dasharray: calc(40 * 2 * 3.14 / 24);
}
</style>
