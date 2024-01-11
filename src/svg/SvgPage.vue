<template>
  <div>
    <div>Choose svg size:</div>
    <div>Selected: {{ sizeRef }}</div>
    <select v-model="sizeRef">
      <option :value="'small'">Small</option>
      <option :value="'medium'">Medium</option>
      <option :value="'big'">Big</option>
    </select>
  </div>
  <div>
    <p>Circle x position: {{ circleXPosition }}</p>
    <input type="range" :min="0" :max="pixelSize" v-model.number="circleXPosition" />
  </div>
  <div>
    <p>Circle y position: {{ circleYPosition }}</p>
    <input type="range" :min="0" :max="pixelSize" v-model.number="circleYPosition" />
  </div>
  <FunnySvgComponent
    :size="sizeRef"
    :circle-coordinates="{ x: circleXPosition, y: circleYPosition }"
  />
</template>

<script setup lang="ts">
import FunnySvgComponent from "@/svg/FunnySvgComponent.vue";
import { computed, ref } from "vue";

const sizeRef = ref<"small" | "medium" | "big">("big");

const pixelSize = computed(() => {
  switch (sizeRef.value) {
    case "small": {
      return 128;
    }
    case "medium": {
      return 256;
    }
    case "big": {
      return 512;
    }
    default: {
      throw "unknown size";
    }
  }
});

const circleXPosition = ref(0);
const circleYPosition = ref(0);
</script>

<style scoped lang="scss"></style>
