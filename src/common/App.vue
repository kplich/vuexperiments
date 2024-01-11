<template>
  <AppHeader />
  <RouterView />
  <MyStoreModalContainer />
  <MyTeleportModalContainer />
  <MyComplexTeleportModalContainer />
  <MyComplexStoreModalContainer />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import AppHeader from "./layout/AppHeader.vue";
import MyStoreModalContainer from "@/modals/MyStoreModalContainer.vue";
import MyTeleportModalContainer from "@/modals/MyTeleportModalContainer.vue";
import MyComplexTeleportModalContainer from "@/complex-modals/MyComplexTeleportModalContainer.vue";
import MyComplexStoreModalContainer from "@/complex-modals/MyComplexStoreModalContainer.vue";
</script>

<style scoped></style>
