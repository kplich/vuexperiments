<template>
  <label v-bind:for="($attrs.id as string)">{{ text }}</label>
</template>

<script setup lang="ts">
interface Props {
  text: string;
}

defineProps<Props>();
</script>

<style scoped></style>
