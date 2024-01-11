<template>
  <div class="wrapper-main">
    <div class="" :class="['wrapper-intermediate', intermediateWrapperClass]">
      <MyInputLabel v-if="labelText" :text="labelText" v-bind:for="$attrs.id" />
      <input
        v-bind="$attrs"
        :value="inputState.inputValue"
        @input="validateAndEmitInputState"
        @focus="validateAndEmitInputState"
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

<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { Validator } from "@/inputs/Validators";
import type { InputState } from "@/inputs/InputUtils";
import type { ValidationResults } from "@/inputs/ValidationState";
import MyInputLabel from "@/inputs/MyInputLabel.vue";

interface Props {
  labelText?: string;
  labelPosition?: "top" | "left";
  helperText?: string;
  helperTextPosition?: "left" | "right";
  validators?: Validator<string>[];
  inputState: InputState<string>;
}

interface Emits {
  (e: "update:inputState", value: InputState<string>): void;
}

const props = withDefaults(defineProps<Props>(), {
  labelText: "",
  labelPosition: "top",
  helperTextPosition: "left",
  validators: () => [],
});
const emit = defineEmits<Emits>();

const labelRef = ref<HTMLLabelElement | null>(null);

const validationResult = ref<string | null>(null);

function validateAndEmitInputState(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  const validationResults = validateNewValue(value);

  const errors = validationResults.filter((result) => result.message !== null);
  if (errors.length) {
    validationResult.value = errors[0].message;
  } else {
    validationResult.value = null;
  }

  emit("update:inputState", {
    inputValue: value,
    validationResults: validationResults,
  });
}

function validateNewValue(newValue: string): ValidationResults {
  return props.validators.map((validator) => {
    return {
      name: validator.name,
      message: validator(newValue),
    };
  });
}

const showHelperText = computed(() => {
  return (
    (props.helperText && props.inputState.inputValue.length === 0) ||
    validationResult.value
  );
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

  if (!labelRef.value) {
    return {};
  }

  return {
    "padding-left": `${labelRef.value.getBoundingClientRect().width + 5 * 2}px`,
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
