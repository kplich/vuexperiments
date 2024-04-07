<template>
  <section>
    <h2>Simple selection</h2>
    <VSelectSingle
      :options="options"
      v-model="selectedPlain"
      display-checkmark
    />
    <VSeparator />
    <h2>Selection backed by an input</h2>
    <VSelectSingle
      :options="filteredOptions"
      v-model="selectedWithTextInput"
      @update:modelValue="updateInputState"
    >
      <template v-slot:selected="{ show }">
        <MyTextInput v-model:input-state="inputState" @click="() => show()" />
      </template>
    </VSelectSingle>
    <VSeparator />
    <h2>Multiple selection</h2>
    <VSelectMultiple :options="options" v-model="selectedMultiple">
      <template v-slot:selected="{ show, selected }">
        <VButton @click.stop="show"> Show ({{ selected.length }}) </VButton>
      </template>
    </VSelectMultiple>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import VSeparator from "@/common/VSeparator.vue";
import VSelectSingle from "@/selects/VSelectSingle.vue";
import type { SelectionOption } from "@/selects/SelectionOption";
import MyTextInput from "@/inputs/MyTextInput.vue";
import { useInput } from "@/inputs/InputUtils";
import VSelectMultiple from "@/selects/VSelectMultiple.vue";
import VButton from "@/common/VButton.vue";

const options: SelectionOption<string>[] = [
  {
    value: "first",
    key: "first",
    label: "first",
  },
  {
    value: "second",
    key: "second",
    label: "second",
  },
];

const filteredOptions = computed(() => {
  if (inputState.value.inputValue.trim() === "") {
    return options;
  } else if (inputState.value.inputValue.includes("filter")) {
    return [options[0]];
  } else {
    return [options[1]];
  }
});

const selectedPlain = ref<SelectionOption<string>>(options[0]);
const selectedWithTextInput = ref<SelectionOption<string>>(options[0]);
const selectedMultiple = ref<Array<SelectionOption<string>>>([]);

const inputState = useInput<string>("select-input", selectedPlain.value.value);

function updateInputState(option: SelectionOption<string>) {
  inputState.value.inputValue = option.value;
}
</script>
