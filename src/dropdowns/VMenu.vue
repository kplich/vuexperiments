<template>
  <VCard
    size="small"
    :class="['menu', { below: viewportIsMobile }]"
    :style="maxHeightStyles"
  >
    <slot />
  </VCard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import VCard from "@/common/VCard.vue";

/**
 * A container for a list of options (MenuItems).
 * It might contain nested submenus - they should be direct children of the MenuItem.
 */

interface Props {
  maxHeight?: string;
}

const props = defineProps<Props>();

// TODO: move to a composable
const viewportIsMobile = computed(
  () => window.matchMedia("(max-width: 600px)").matches,
);

const maxHeightStyles = computed(() => {
  return props.maxHeight
    ? {
        "overflow-y": "auto",
        "overflow-x": "visible",
        maxHeight: props.maxHeight,
      }
    : undefined;
});
</script>

<style scoped lang="scss">
.card.custom {
  padding: var(--menu-padding-half) 0;
}

.menu {
  display: flex;
  flex-flow: column;

  min-width: 100%;
  width: max-content;
  scrollbar-width: thin;

  border-radius: var(--menu-padding);

  background: var(--color-background);
}

.menu-item > * {
  position: absolute;
  display: none;
}

// show menu on hover on non-disabled menu items
.menu-item:hover:not(.disabled) > .menu {
  display: inline-flex;

  align-self: flex-start;
  margin-left: calc(100% - var(--menu-padding));
  margin-top: calc(var(--menu-padding) * -1);

  // submenus don't need to stretch to the parent's width
  min-width: max-content;

  &.below {
    margin-left: 0;
    margin-top: var(--menu-padding);
  }
}
</style>
