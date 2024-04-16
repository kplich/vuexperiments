<template>
  <VDropdown :horizontal-position="horizontalPosition" :disabled="disabled">
    <template v-slot:button="{ show, contentVisible }">
      <slot
        name="selected"
        :selected="selected"
        :contentVisible="contentVisible"
        :show="show"
      >
        <div class="selected" :class="{ disabled }" @click.stop="() => show()">
          <Component v-if="selected.icon" :is="selected.icon" />
          <div v-if="!hideLabel" class="label">{{ selected.label }}</div>
          <ChevronIcon
            small
            class="arrow"
            :direction="contentVisible ? 'up' : 'down'"
          />
        </div>
      </slot>
    </template>
    <template v-slot:content="{ hide }">
      <VMenu>
        <VMenuItem
          v-for="opt in options"
          :key="opt.label"
          class="option"
          @click="hide(() => (selected = opt))"
        >
          <RadioIcon
            small
            v-if="displayCheckmark"
            :checked="opt.value === selected.value"
          />
          <Component
            v-else-if="selected.icon"
            :is="opt.icon"
            class="menu-icon"
          />
          <span class="label-dropdown">{{ opt.label }}</span>
        </VMenuItem>
      </VMenu>
    </template>
  </VDropdown>
</template>
<script setup lang="ts" generic="T">
import VDropdown from "@/common/components/VDropdown.vue";
import VMenu from "@/common/components/VMenu.vue";
import VMenuItem from "@/common/components/VMenuItem.vue";
import RadioIcon from "@/common/icons/VIconRadio.vue";
import ChevronIcon from "@/common/icons/VIconChevron.vue";
import type { SelectionOption } from "@/common/components/SelectionOption";

interface Props {
  options: Array<SelectionOption<T>>;
  displayCheckmark?: boolean;
  hideLabel?: boolean;
  horizontalPosition?: "left" | "center" | "right";
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  displayCheckmark: false,
  hideLabel: false,
  disabled: false,
});

const selected = defineModel<SelectionOption<T>>({ required: true });
</script>

<style lang="scss" scoped>
.selected {
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  align-items: center;
  border-radius: 8px;
  border: 1px solid lightgray;
  padding: 8px 12px;
  gap: 8px;

  &:hover {
    background-color: var(--color-background-soft);
    cursor: pointer;
  }

  &.disabled {
    pointer-events: none;
    border: 1px solid lightgray;
    color: lightgray;
  }
}

.option:active {
  .menu-icon {
    color: var(--color-text-contrast);
    fill: var(--color-text-contrast);
    stroke: var(--color-text-contrast);
  }
}

.arrow {
  margin-left: auto;
}

.menu-item {
  padding: 8px 12px;
}
</style>
