<script setup lang="ts">
import VIcon from "@/common/icons/VIcon.vue";

interface Props {
  density?: "small" | "medium" | "large";
}

withDefaults(defineProps<Props>(), {
  density: "medium",
});
</script>

<template>
  <VIcon>
    <path
      v-if="density === 'small'"
      d="M120-80v-80h720v80H120Zm0-240v-80h720v80H120Zm0-240v-80h720v80H120Zm0-240v-80h720v80H120Z"
    />
    <path
      v-else-if="density === 'medium'"
      d="M120-120v-80h720v80H120Zm0-320v-80h720v80H120Zm0-320v-80h720v80H120Z"
    />
    <path
      v-else-if="density === 'large'"
      d="M120-120v-80h720v80H120Zm0-640v-80h720v80H120Z"
    />
  </VIcon>
</template>

<style scoped lang="scss"></style>
