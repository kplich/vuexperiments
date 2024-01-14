<template>
  <div class="item">
    <img :src="user.picture.medium" alt="profile picture" />
    <div class="info">
      <span class="name">{{ `${user.name.first} ${user.name.last}` }}</span>
      <span>{{ user.location.city }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { User } from "@/infinite-scroll/User";

interface Props {
  user: User;
}

defineProps<Props>();
</script>
<style scoped lang="scss">
.item {
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;

  padding: 1rem;
  background: var(--color-background-mute);
}

.info {
  display: flex;
  flex-flow: column nowrap;

  .name {
    font-size: 1.5rem;
    font-weight: bolder;
  }
}
</style>
