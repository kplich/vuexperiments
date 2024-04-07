<template>
  <VDropdown :horizontal-position="horizontalPosition">
    <template v-slot:button="buttonSlot">
      <slot name="selected" :selected="modelValue" v-bind="buttonSlot" />
    </template>
    <template v-slot:content>
      <VMenu>
        <VMenuItem
          v-for="option in options"
          :key="option.label"
          class="option"
          @click="emitNewValue(option)"
        >
          <input
            type="checkbox"
            :checked="optionIsSelected(option)"
            :value="option.value"
            :id="option.label"
            @input.prevent
          />
          <label :for="option.label" class="label" @click.prevent>
            {{ option.label }}
          </label>
        </VMenuItem>
      </VMenu>
    </template>
  </VDropdown>
</template>
<script setup generic="T" lang="ts">
import type { SelectionOption } from "@/selects/SelectionOption";
import VDropdown from "@/dropdowns/VDropdown.vue";
import VMenu from "@/dropdowns/VMenu.vue";
import VMenuItem from "@/dropdowns/VMenuItem.vue";

const props = withDefaults(
  defineProps<{
    modelValue: Array<SelectionOption<T>>;
    options: Array<SelectionOption<T>>;
    horizontalPosition?: "left" | "center" | "right";
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: Array<SelectionOption<T>>];
}>();

function optionIsSelected(option: SelectionOption<T>) {
  return props.modelValue.some((otherOpt) => otherOpt.value === option.value);
}

function emitNewValue(option: SelectionOption<T>) {
  if (props.modelValue.map((o) => o.value).includes(option.value)) {
    // if the option is already selected, remove it from the selected array
    emit(
      "update:modelValue",
      props.modelValue.filter((o) => o.value !== option.value),
    );
  } else {
    // otherwise, add it to the selected array
    emit("update:modelValue", [...props.modelValue, option]);
  }
}
</script>
<style lang="scss" scoped>
.menu-item {
  padding: 8px 12px;
}

.label {
  display: inline-flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 5px;

  &:hover {
    cursor: pointer;
  }
}
</style>
