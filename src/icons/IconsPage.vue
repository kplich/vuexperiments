<template>
  <main>
    <h2>Icons</h2>
    <p>
      <span>
        Icons come from
        <a href="https://fonts.google.com/icons">Material Symbols</a>.
      </span>
    </p>
    <section>
      <h3>Various sizes:</h3>
      <div class="icon-grid">
        <VIconShoppingCartCheckout tiny />
        <span> tiny </span>
        <VIconShoppingCartCheckout small />
        <span> small </span>
        <VIconShoppingCartCheckout />
        <span> default </span>
        <VIconShoppingCartCheckout big />
        <span> big </span>
        <VIconShoppingCartCheckout bigger />
        <span> bigger </span>
      </div>
    </section>
    <section>
      <h3>Various colors!</h3>
      <div class="icon-grid">
        <VIconAssistantDirection />
        <span>default</span>
        <VIconAssistantDirection success />
        <span>success</span>
        <VIconAssistantDirection info />
        <span>info</span>
        <VIconAssistantDirection error />
        <span>error</span>
      </div>
    </section>
    <section>
      <h3>Icon variants!</h3>
      <div class="icon-grid">
        <VIconDensity density="small" />
        <span>density: small</span>
        <VIconDensity />
        <span>density: medium (default)</span>
        <VIconDensity density="large" />
        <span>density: large</span>
        <VIconDensity :density="selectedDensity.value" />
        <span>
          density:
          <VSelectSingle :options="options" v-model="selectedDensity" />
        </span>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import VIconShoppingCartCheckout from "@/common/icons/VIconShoppingCartCheckout.vue";
import VIconAssistantDirection from "@/common/icons/VIconAssistantDirection.vue";
import VIconDensity from "@/common/icons/VIconDensity.vue";
import { computed, ref } from "vue";
import type { SelectionOption } from "@/common/components/SelectionOption";
import VSelectSingle from "@/common/components/VSelectSingle.vue";

const options = computed<
  SelectionOption<"small" | "medium" | "large" | undefined>[]
>(() => {
  return [
    {
      value: undefined,
      label: "default",
      key: "default",
    },
    {
      value: "small",
      label: "small",
      key: "small",
    },
    {
      value: "medium",
      label: "medium",
      key: "medium",
    },
    {
      value: "large",
      label: "large",
      key: "large",
    },
  ];
});
const selectedDensity = ref(options.value[0]);
</script>

<style scoped lang="scss">
section {
  margin: var(--space-4) 0;

  > h3 {
    margin-bottom: var(--space-2);
  }
}

.icon-grid {
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-auto-flow: column;
  align-items: center;
  justify-items: center;
  gap: var(--space-4);

  width: min-content;
  margin: 0 auto;

  > span {
    align-self: start;
  }
}
</style>
