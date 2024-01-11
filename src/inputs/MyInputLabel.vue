<template>
  <label v-bind:for="$attrs.id">{{ text }}</label>
</template>

<script setup lang="ts">
interface Props {
  text: string;
}

defineProps<Props>();
</script>

<style scoped></style>
