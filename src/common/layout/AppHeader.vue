<script setup lang="ts"></script>

<template>
  <header id="header">
    <h1>My Vue App</h1>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/dropdowns">Dropdowns</RouterLink>
      <RouterLink to="/modals">Modals</RouterLink>
      <RouterLink to="/complex-modals">Complex modals</RouterLink>
      <RouterLink to="/inputs">Inputs</RouterLink>
      <RouterLink to="/selects">Selects</RouterLink>
      <RouterLink to="/svg">SVG</RouterLink>
      <RouterLink to="/drag-and-drop">Drag and drop</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
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
