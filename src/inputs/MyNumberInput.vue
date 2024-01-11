<template>
  <div class="wrapper-main">
    <div class="" :class="['wrapper-intermediate', intermediateWrapperClass]">
      <label ref="labelRef" :for="($attrs.id as string)">
        {{ label }}
      </label>
      <input
        type="number"
        :id="($attrs.id as string)"
        :value="modelValue"
        @input="handleInputChange"
        @focus="validateNewInputValue($event)"
      />
    </div>
    <span
      v-if="showHelperText"
      :class="['helper-text', helperTextPositionClass]"
      :style="additionalHelperTextStyles"
    >
      {{ helperTextContent }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { Validator } from "@/inputs/Validators";

interface Props {
  label: string;
  labelPosition?: "top" | "left";
  helperText?: string;
  helperTextPosition?: "left" | "right";
  modelValue: number;
  validators?: Validator<number>[];
}

interface Emits {
  (e: "update:modelValue", value: number): void;
}

const props = withDefaults(defineProps<Props>(), {
  labelPosition: "top",
  helperTextPosition: "left",
  validators: () => [],
});
const emit = defineEmits<Emits>();
const labelRef = ref<HTMLLabelElement | null>(null);

const validationResult = ref<string | null>(null);

function handleInputChange(event: Event) {
  const newValue = parseFloat((event.target as HTMLInputElement).value);

  emit("update:modelValue", newValue);
  validateNewInputValue(event);
}

function validateNewInputValue(event: Event) {
  const newValue = parseFloat((event.target as HTMLInputElement).value);

  if (props.validators.length > 0) {
    const validationResults = props.validators.map((v) => v(newValue));
    const error = validationResults.find((result) => result !== null);
    if (error) {
      validationResult.value = error;
    } else {
      validationResult.value = null;
    }
  }
}

const showHelperText = computed(() => {
  return (props.helperText && !props.modelValue) || validationResult.value;
});

const helperTextContent = computed(() => {
  if (validationResult.value) {
    return validationResult.value;
  } else {
    return props.helperText;
  }
});

const intermediateWrapperClass = computed(() => {
  return `label-${props.labelPosition}`;
});

const helperTextPositionClass = computed(() => {
  return `helper-${props.helperTextPosition}`;
});

const additionalHelperTextStyles = computed(() => {
  if (props.labelPosition === "top") {
    return {};
  }

  if (!props.helperText || props.helperTextPosition === "right") {
    return {};
  }

  return {
    "padding-left": `${
      (labelRef?.value?.getBoundingClientRect()?.width ?? 0) + 5 * 2
    }px`,
  };
});
</script>

<style scoped lang="scss">
.wrapper-main {
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;

  .wrapper-intermediate {
    display: flex;
    gap: 5px;

    label {
      flex-grow: 1;
      flex-shrink: 0;
    }

    input {
      width: 100%;
      padding: 5px;

      border-radius: 10px;
      border: solid 1px var(--vt-c-black);
      background: var(--color-background-soft);
      color: var(--color-text);
    }
  }

  .validation-result {
    font-size: 12px;
  }

  .helper-text {
    font-size: 12px;
  }
}

.label-left {
  flex-flow: row nowrap;
  align-items: center;
}

.label-top {
  flex-flow: column nowrap;
  align-items: flex-start;
}

.helper-left {
  text-align: start;
}

.helper-right {
  text-align: end;
}
</style>
