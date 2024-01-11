<template>
  <MyTextInput :input-state="inputState" @click="options.show" />
  <Dropdown v-if="options.visible" @clickaway="options.hide">
    <DropdownItem @click="() => selectOption('First')">
      First option
    </DropdownItem>
    <DropdownItem @click="() => selectOption('Second')">
      Second option
    </DropdownItem>
    <DropdownItem @click="() => selectOption('Third')">
      Third option
    </DropdownItem>
  </Dropdown>
</template>
<script setup lang="ts">
import { useInput } from "@/inputs/InputUtils";
import MyTextInput from "@/inputs/MyTextInput.vue";
import Dropdown from "@/dropdowns/Dropdown.vue";
import DropdownItem from "@/dropdowns/DropdownItem.vue";
import { useDropdown } from "@/dropdowns/DropdownUtils";

const inputState = useInput<string>("select-input", "");

// isn't recognized really by TS... yet. }:/
// const { optionsVisible, showOptions, hideOptions } = useFancyDropdown("options");
const options = useDropdown();

function selectOption(option: string) {
  inputState.value.inputValue = option;
  options.hide();
}
</script>

<style lang="scss"></style>
