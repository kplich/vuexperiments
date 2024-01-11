import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.inputValue * 2);
  function increment() {
    count.inputValue++;
  }

  return { count, doubleCount, increment };
});
