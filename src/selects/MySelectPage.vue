<template>
  <section>
    <select id="simple-select">
      <option>First option</option>
      <option>Second option</option>
      <option>Third option</option>
    </select>
    <VSeparator />
    <MySelect />
  </section>
</template>

<script setup lang="ts">
import MySelect from "@/selects/MySelect.vue";
import VSeparator from "@/common/VSeparator.vue";
</script>
