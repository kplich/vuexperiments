<template>
  <AppHeader />
  <div class="router-container">
    <RouterView />
  </div>
  <MyStoreModalContainer />
  <MyTeleportModalContainer />
  <MyComplexTeleportModalContainer />
  <MyComplexStoreModalContainer />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import AppHeader from "./layout/VHeader.vue";
import MyStoreModalContainer from "@/modals/MyStoreModalContainer.vue";
import MyTeleportModalContainer from "@/modals/MyTeleportModalContainer.vue";
import MyComplexTeleportModalContainer from "@/complex-modals/MyComplexTeleportModalContainer.vue";
import MyComplexStoreModalContainer from "@/complex-modals/MyComplexStoreModalContainer.vue";
</script>

<style scoped lang="scss">
.router-container {
  max-width: 768px;
  margin: 0 auto;
}
</style>
