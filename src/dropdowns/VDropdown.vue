<template>
  <div
    class="dropdown"
    :class="[finalHorizontalPosition, finalVerticalPosition]"
  >
    <slot
      name="button"
      :show="showContent"
      :contentVisible="contentVisible"
      :disabled="disabled"
    />
    <div
      v-if="contentVisible"
      class="content"
      ref="content"
      :class="[finalHorizontalPosition, finalVerticalPosition]"
      v-click-outside="hideContent"
    >
      <slot name="content" :hide="hideContent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

/**
 * A component for displaying something (a menu or a component) in a dropdown after clicking a button.
 */

type HorizontalPosition = "left" | "center" | "right";
type VerticalPosition = "above" | "side" | "below";

interface Props {
  horizontalPosition?: HorizontalPosition;
  verticalPosition?: VerticalPosition;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  horizontalPosition: "left",
  verticalPosition: "below",
  disabled: false,
});

const contentVisible = ref(false);
const content = ref<HTMLDivElement | null>(null);

// this is meant to stop an infinite loop of updates
const finalPositionsCalculated = ref(false);
const finalHorizontalPosition = ref<HorizontalPosition>(
  props.horizontalPosition,
);
const finalVerticalPosition = ref<VerticalPosition>(props.verticalPosition);

function onUpdated() {
  if (contentVisible.value) {
    // recalculate the positions of the dropdown when it's being shown
    if (!finalPositionsCalculated.value) {
      finalHorizontalPosition.value =
        getNewHorizontalPosition() ?? props.horizontalPosition;
      finalVerticalPosition.value =
        getNewVerticalPosition() ?? props.verticalPosition;
      finalPositionsCalculated.value = true;
    }
  } else {
    // reset them when it's being hidden
    finalPositionsCalculated.value = false;
    finalHorizontalPosition.value = props.horizontalPosition;
    finalVerticalPosition.value = props.verticalPosition;
  }
}

function getNewHorizontalPosition(): HorizontalPosition | undefined {
  if (content.value === null) {
    return undefined;
  }

  const elementOverflowsToTheLeft =
    content.value.getBoundingClientRect().left < 0;
  const elementOverflowsToTheRight =
    content.value.getBoundingClientRect().right > window.innerWidth;

  if (elementOverflowsToTheLeft && elementOverflowsToTheRight) {
    // don't do anything if the element overflows both to the left and to the right
    return props.horizontalPosition;
  } else if (elementOverflowsToTheLeft) {
    return "right";
  } else if (elementOverflowsToTheRight) {
    return "left";
  } else {
    return props.horizontalPosition;
  }
}

function getNewVerticalPosition(): VerticalPosition | undefined {
  if (content.value === null) {
    return undefined;
  }

  const elementOverflowsToTheTop =
    content.value.getBoundingClientRect().top < 0;
  const elementOverflowsToTheBottom =
    content.value.getBoundingClientRect().bottom > window.innerHeight;

  if (elementOverflowsToTheTop && elementOverflowsToTheBottom) {
    // don't do anything if the element overflows both to the top and to the bottom
    return props.verticalPosition;
  } else if (elementOverflowsToTheTop) {
    return "below";
  } else if (elementOverflowsToTheBottom) {
    return "above";
  } else {
    return props.verticalPosition;
  }
}

function showContent(callback?: (() => void) | (() => Promise<void>)) {
  if (!props.disabled) {
    contentVisible.value = true;
    if (callback && typeof callback === "function") {
      callback();
    }
  }
}

function hideContent(callback?: (() => void) | (() => Promise<void>)) {
  if (contentVisible.value) {
    contentVisible.value = false;
    if (callback && typeof callback === "function") {
      callback();
    }
  }
}
</script>

<style scoped lang="scss">
.dropdown {
  display: inline flex;
  position: relative;

  &.left {
    justify-content: flex-end;
  }

  &.center {
    justify-content: center;
  }

  &.right {
    justify-content: flex-start;
  }

  &.above {
    align-items: flex-end;
  }

  &.side {
    align-items: center;
  }

  &.below {
    align-items: flex-start;
  }
}

.content {
  position: absolute;
  z-index: 2;
  min-width: 100%;

  &.above {
    bottom: 100%;
    margin-bottom: 5px;
  }

  &.side {
    &.left {
      right: 100%;
      margin-right: 5px;
    }

    &.right {
      left: 100%;
      margin-left: 5px;
    }
  }

  &.below {
    top: 100%;
    margin-top: 5px;
  }
}
</style>
