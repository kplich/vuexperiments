<template>
  <header id="header">
    <h1>Vuexperiments</h1>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/menus">Menus & selections</RouterLink>
      <RouterLink to="/modals">Modals</RouterLink>
      <RouterLink to="/complex-modals">Complex modals</RouterLink>
      <RouterLink to="/inputs">Inputs</RouterLink>
      <RouterLink to="/drag-and-drop">Drag and drop</RouterLink>
      <RouterLink to="/infinite-scroll">Infinite scroll</RouterLink>
      <RouterLink to="/icons">Icons</RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
header {
  margin-bottom: 2rem;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
