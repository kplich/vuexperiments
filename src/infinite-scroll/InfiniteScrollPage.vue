<template>
  <h1>Infinite Scroll</h1>
  <div class="infinite-scroll-container" @scroll="handleScroll">
    <InfiniteScrollItem
      v-for="user in users"
      :user="user"
      :key="user.picture.thumbnail"
    />
    <div class="spinner-container" v-if="isLoading">
      <AppSpinner />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import AppSpinner from "@/common/AppSpinner.vue";
import InfiniteScrollItem from "@/infinite-scroll/InfiniteScrollItem.vue";
import { getRandomUsers } from "@/infinite-scroll/RandomUserService";
import type { User } from "@/infinite-scroll/User";

const users = ref<User[]>([]);
const isLoading = ref(false);

function loadUsers() {
  isLoading.value = true;
  getRandomUsers()
    .then((us) => {
      us.forEach((u) => users.value.push(u));
    })
    .finally(() => {
      isLoading.value = false;
    });
}

function handleScroll(event: Event) {
  const { scrollHeight, scrollTop, offsetHeight } =
    event.target as HTMLDivElement;

  const atTheBottom = scrollHeight - scrollTop <= offsetHeight;
  console.log("at the bottom?", atTheBottom);
  if (atTheBottom) {
    loadUsers();
  }
}

loadUsers();

window.addEventListener("scroll", loadUsers);
</script>
<style scoped lang="scss">
.infinite-scroll-container {
  height: 500px;
  padding: 1rem;
  border: solid 1px var(--color-border);

  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;

  overflow: auto;
}

.spinner-container {
  height: 104px;
  margin: 0 auto;
  padding: 16px;
}
</style>
