<template>
  <VDropdown>
    <template v-slot:button="{ show }">
      <MyTextInput :input-state="inputState" @click="show()" />
    </template>
    <template v-slot:content="{ hide }">
      <VMenu>
        <VMenuItem @click="hide(() => selectOption('First'))">
          First option
        </VMenuItem>
        <VMenuItem @click="hide(() => selectOption('Second'))">
          Second option
        </VMenuItem>
        <VMenuItem @click="hide(() => selectOption('Third'))">
          Third option
        </VMenuItem>
      </VMenu>
    </template>
  </VDropdown>
</template>
<script setup lang="ts">
import { useInput } from "@/inputs/InputUtils";
import MyTextInput from "@/inputs/MyTextInput.vue";
import VMenu from "@/dropdowns/VMenu.vue";
import VDropdown from "@/dropdowns/VDropdown.vue";
import VMenuItem from "@/dropdowns/VMenuItem.vue";

const inputState = useInput<string>("select-input", "");

function selectOption(option: string) {
  inputState.value.inputValue = option;
}
</script>

<style lang="scss"></style>
