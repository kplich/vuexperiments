<template>
  <Teleport to=".teleport-modal-container">
    <div class="backdrop" @click="emitClickaway" />
    <div class="modal">
      <h1>
        <slot name="header" />
      </h1>
      <div>
        <slot name="content" />
      </div>
      <div class="footer">
        <slot name="footer" />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Emits {
  (e: "clickaway"): void;
}

const emit = defineEmits<Emits>();

function emitClickaway(click: Event) {
  console.log(click);
  console.log("clickaway triggered");

  click.stopPropagation();
  emit("clickaway");
}
</script>

<style scoped lang="scss">
.backdrop {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 99;

  background: #00000099;
}

.modal {
  z-index: 999;
  padding: 20px;
  border-radius: 20px;

  background: var(--color-background-soft);
  box-shadow: 2px 2px 2px black;

  .footer {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
  }
}
</style>
