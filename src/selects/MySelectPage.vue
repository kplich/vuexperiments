<template>
  <section>
    <select id="simple-select">
      <option>First option</option>
      <option>Second option</option>
      <option>Third option</option>
    </select>
    <div class="separator" />
    <MySelect />
  </section>
</template>

<script setup lang="ts">
import MySelect from "@/selects/MySelect.vue";
</script>

<style scoped lang="scss">
.separator {
  margin: 20px 5px;
  border-top: solid 1px var(--color-background-mute);
}
</style>
