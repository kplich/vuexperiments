<template>
  <svg
    version="1.1"
    :width="pixelSize"
    :height="pixelSize"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="100%" height="100%" fill="#ff000099" />

    <template v-for="index in 20" :key="index">
      <circle
        v-if="index % 3 === 0"
        class="color-change"
        :cx="circleCoordinates.x + (index - 10) * 10 - 16"
        :cy="circleCoordinates.y + (index - 10) * 10 - 16"
        stroke="black"
        r="32"
      />
    </template>

    <path
      :d="`M ${draggableXPositionRef} ${draggableYPositionRef} H ${
        pixelSize - draggableXPositionRef
      } V ${
        pixelSize - draggableYPositionRef
      } H ${draggableXPositionRef} V ${draggableYPositionRef}`"
      fill="transparent"
      stroke="black"
    />
    <circle
      ref="circle"
      :cx="draggableXPositionRef"
      :cy="draggableYPositionRef"
      r="5"
      fill="red"
      @mousedown="startDragging"
      @mouseout="finishDragging"
      @mouseup="finishDragging"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

interface Props {
  size: "small" | "medium" | "big";
  circleCoordinates: {
    x: number;
    y: number;
  };
}

const props = withDefaults(defineProps<Props>(), {
  size: "small",
  circleCoordinates: () => ({ x: 0, y: 0 }),
});

const pixelSize = computed(() => {
  switch (props.size) {
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

const circle = ref<SVGElement | null>(null);
const draggableXPositionRef = ref(10);
const draggableYPositionRef = ref(10);
const dragOffsetXRef = ref<number | null>(null);
const dragOffsetYRef = ref<number | null>(null);

function move({ offsetX, offsetY }: MouseEvent) {
  draggableXPositionRef.value = offsetX - (dragOffsetXRef?.value ?? 0);
  draggableYPositionRef.value = offsetY - (dragOffsetYRef?.value ?? 0);
}

function startDragging({ offsetX, offsetY }: MouseEvent) {
  dragOffsetXRef.value = offsetX - draggableXPositionRef.value;
  dragOffsetYRef.value = offsetY - draggableYPositionRef.value;
  circle?.value?.addEventListener("mousemove", move);
}

function finishDragging() {
  dragOffsetXRef.value = null;
  dragOffsetYRef.value = null;
  circle?.value?.removeEventListener("mousemove", move);
}
</script>

<style scoped lang="scss">
.color-change {
  animation: colorChange 3s infinite alternate;
}

@keyframes colorChange {
  0% {
    fill: orange;
  }
  100% {
    fill: lightpink;
  }
}
</style>
