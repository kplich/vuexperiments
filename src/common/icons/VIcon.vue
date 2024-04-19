<template>
  <svg
    class="v-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
  >
    <slot />
  </svg>
</template>
<style scoped lang="scss">
svg.v-icon {
  color: var(--color-text);
  fill: var(--color-text);
  stroke: var(--color-text);

  height: 24px;
  width: 24px;

  &[tiny] {
    height: 12px;
    width: 12px;
  }

  &[small] {
    height: 16px;
    width: 16px;
  }

  &[big] {
    height: 32px;
    width: 32px;
  }

  &[bigger] {
    height: 48px;
    width: 48px;
  }

  &[success] {
    color: var(--green);
    fill: var(--green);
    stroke: var(--green);
  }

  &[info] {
    color: var(--light-blue);
    fill: var(--light-blue);
    stroke: var(--light-blue);
  }

  &[error] {
    color: var(--red);
    fill: var(--red);
    stroke: var(--red);
  }
}
</style>
