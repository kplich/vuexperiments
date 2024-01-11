<template>
  <section>
    <div>This is a dropdown page.</div>
    <div>
      <button @click="toggleDropdown">Click me to open a dropdown.</button>
      <Dropdown v-if="dropdownVisible" @clickaway="hideDropdown">
        <DropdownItem @click="printItem1">item 1</DropdownItem>
        <DropdownItem @click="printItem2">item 2</DropdownItem>
        <DropdownItem @click="toggleNestedDropdown">
          <span>Nested dropdown.</span>
          <Dropdown
            v-if="nestedDropdownVisible"
            @clickaway="hideNestedDropdown"
          >
            <DropdownItem @click="printNestedItem1">nested item 1</DropdownItem>
            <DropdownItem @click="printNestedItem2">nested item 2</DropdownItem>
          </Dropdown>
        </DropdownItem>
      </Dropdown>
    </div>
  </section>
</template>

<script setup lang="ts">
import DropdownItem from "@/dropdowns/DropdownItem.vue";
import { ref } from "vue";
import Dropdown from "@/dropdowns/Dropdown.vue";

const dropdownVisible = ref(false);
const nestedDropdownVisible = ref(false);

function toggleDropdown() {
  dropdownVisible.value = !dropdownVisible.value;
}

function hideDropdown() {
  dropdownVisible.value = false;
}

function toggleNestedDropdown() {
  nestedDropdownVisible.value = !nestedDropdownVisible.value;
}

function hideNestedDropdown() {
  nestedDropdownVisible.value = false;
}

function printItem1() {
  console.log("item1");
  dropdownVisible.value = false;
}

function printItem2() {
  console.log("item2");
  dropdownVisible.value = false;
}

function printNestedItem1() {
  console.log("nested item 1");
  dropdownVisible.value = false;
}

function printNestedItem2() {
  console.log("nested item 2");
  dropdownVisible.value = false;
}
</script>

<style scoped lang="scss"></style>
